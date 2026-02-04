import { useEffect, useState } from "react";
import { useStore } from "../../../stores/useStore";
import Cookies from "js-cookie";
import {
    Trash2,
    Plus,
    Minus,
    Tag,
    X,
    ShoppingCart,
    Shield,
    Truck,
    RefreshCw,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router";

const CartProductViewer = () => {
    const navigate = useNavigate();
    const token = Cookies.get("auth_token");
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;

    const {
        cart,
        updateCartQuantity,
        removeFromCart,
        couponCode,
        coupon,
        addCouponCode,
        addCoupon,
        clearCoupon,
        addCheckedOrder,
        addSignOrder,
        addSignAmount,
    } = useStore();

    const [loading, setLoading] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [checkoutError, setCheckoutError] = useState("");

    const [totals, setTotals] = useState({
        baseSubtotal: 0,
        taxableSubtotal: 0,
        totalGst: 0,
        totalDiscount: 0,
        itemTotalWithGst: 0,
        finalAmount: 0,
    });

    const hasDiscountEligibleProducts = cart.some((p) => p.is_discount);

    // Apply Coupon
    const applyCoupon = async () => {
        if (!couponCode?.trim()) {
            setCouponError("Please enter a coupon code");
            return;
        }
        if (!hasDiscountEligibleProducts) {
            setCouponError("No items in your cart are eligible for discounts");
            return;
        }

        setLoading(true);
        setCouponError("");
        try {
            const res = await fetch(
                `${apiUrl}/api/v1/coupon/get/${couponCode.trim()}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const data = await res.json();

            if (data?.status && data?.coupon) {
                addCoupon(data.coupon);
            } else {
                setCouponError(
                    data?.message || "Invalid or expired coupon code",
                );
            }
        } catch (err) {
            console.error("Coupon error:", err);
            setCouponError("Failed to apply coupon. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const removeCoupon = () => {
        clearCoupon();
        setCouponError("");
    };

    const handleCheckout = async () => {
        if (cart.length === 0) {
            setCheckoutError("Your cart is empty");
            return;
        }

        setLoading(true);
        setCheckoutError("");

        try {
            const response = await fetch(`${apiUrl}/api/v1/order/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                    })),
                    coupon_code: coupon ? coupon.code : null,
                }),
            });

            const data = await response.json();

            if (data?.status && data?.orderChecked && data?.signOrder) {
                addCheckedOrder(data.orderChecked);
                addSignOrder(data.signOrder);
                addSignAmount(data.signAmount);
                navigate("/checkout");
            } else {
                setCheckoutError(
                    data?.message || "Unable to proceed to checkout",
                );
            }
        } catch (err) {
            console.error(err);
            setCheckoutError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Calculation Logic (matches backend exactly)
    useEffect(() => {
        let baseSubtotal = 0;
        let taxableSubtotal = 0;
        let totalGst = 0;
        let itemWiseDiscounts = 0;

        cart.forEach((product) => {
            const price = parseFloat(product.price);
            const gstRate = parseFloat(product.gst || 0);
            const qty = product.quantity;

            const itemBase = price * qty;
            baseSubtotal += itemBase;

            let itemDiscount = 0;
            if (
                coupon &&
                coupon.discount_type === "percentage" &&
                product.is_discount
            ) {
                itemDiscount = parseFloat(
                    ((itemBase * coupon.discount_value) / 100).toFixed(2),
                );
                itemWiseDiscounts += itemDiscount;
            }

            const taxable = itemBase - itemDiscount;
            taxableSubtotal += taxable;

            const gst = parseFloat(((taxable * gstRate) / 100).toFixed(2));
            totalGst += gst;
        });

        let totalDiscount =
            coupon?.discount_type === "flat"
                ? parseFloat(coupon.discount_value || 0)
                : itemWiseDiscounts;

        if (coupon?.max_discount && totalDiscount > coupon.max_discount) {
            totalDiscount = coupon.max_discount;
        }

        if (
            coupon?.min_order_amount &&
            baseSubtotal < coupon.min_order_amount
        ) {
            setCouponError(
                `Minimum order of ₹${coupon.min_order_amount} required for this coupon`,
            );
            clearCoupon();
            return;
        }

        const itemTotalWithGst = parseFloat(
            (baseSubtotal + totalGst).toFixed(2),
        );
        const finalAmount =
            coupon?.discount_type === "flat"
                ? parseFloat((itemTotalWithGst - totalDiscount).toFixed(2))
                : parseFloat(
                      (taxableSubtotal + totalGst - totalDiscount).toFixed(2),
                  );

        setTotals({
            baseSubtotal: parseFloat(baseSubtotal.toFixed(2)),
            taxableSubtotal: parseFloat(taxableSubtotal.toFixed(2)),
            totalGst: parseFloat(totalGst.toFixed(2)),
            totalDiscount: parseFloat(totalDiscount.toFixed(2)),
            itemTotalWithGst,
            finalAmount,
        });
    }, [cart, coupon]);

    // Empty Cart State
    if (cart.length === 0) {
        return (
            <div
                className="min-h-full flex items-center justify-center py-20 px-4"
                style={{ backgroundColor: "var(--color-bg)" }}
            >
                <div className="text-center max-w-md">
                    <ShoppingCart
                        className="w-32 h-32 mx-auto mb-8 opacity-30"
                        style={{ color: "var(--color-text-muted)" }}
                    />
                    <h2
                        className="mb-4"
                        style={{
                            fontSize: "var(--text-4xl)",
                            fontFamily: "var(--font-heading)",
                            color: "var(--color-text-primary)",
                            fontWeight: "var(--font-bold)",
                        }}
                    >
                        Your cart is empty
                    </h2>
                    <p
                        className="mb-10"
                        style={{
                            fontSize: "var(--text-lg)",
                            color: "var(--color-text-secondary)",
                        }}
                    >
                        Looks like you haven't added anything yet. Let's find
                        some great hardware!
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-text-on-primary)",
                            fontWeight: "var(--font-bold)",
                            fontSize: "var(--text-lg)",
                        }}
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen py-12 px-4"
            style={{
                backgroundColor: "var(--color-bg)",
                fontFamily: "var(--font-body)",
            }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1
                        className="mb-3"
                        style={{
                            fontSize: "var(--text-4xl)",
                            fontFamily: "var(--font-heading)",
                            color: "var(--color-text-primary)",
                            fontWeight: "var(--font-bold)",
                        }}
                    >
                        Your Shopping Cart
                    </h1>
                    <p style={{ color: "var(--color-text-secondary)" }}>
                        {cart.length} {cart.length === 1 ? "item" : "items"} in
                        your cart
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div
                            className="rounded-2xl overflow-hidden shadow-xl"
                            style={{
                                backgroundColor: "var(--color-surface)",
                                border: "1px solid var(--color-border-light)",
                            }}
                        >
                            <div
                                className="px-8 py-5"
                                style={{
                                    backgroundColor: "var(--color-bg-alt)",
                                    borderBottom:
                                        "1px solid var(--color-border-light)",
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize: "var(--text-xl)",
                                        color: "var(--color-text-primary)",
                                        fontWeight: "var(--font-bold)",
                                    }}
                                >
                                    Cart Items
                                </h2>
                            </div>

                            <div
                                className="divide-y"
                                style={{
                                    divideColor: "var(--color-border-light)",
                                }}
                            >
                                {cart.map((product) => (
                                    <div
                                        key={product.product_id}
                                        className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-[var(--color-bg-alt)] transition-colors duration-200"
                                    >
                                        <img
                                            src={`${apiUrl}/image/product/${product.images[0]}`}
                                            alt={product.title}
                                            className="w-28 h-28 object-cover rounded-xl shadow-md flex-shrink-0"
                                        />

                                        <div className="flex-1">
                                            <h3
                                                className="mb-2 line-clamp-2"
                                                style={{
                                                    fontSize: "var(--text-lg)",
                                                    color: "var(--color-text-primary)",
                                                    fontWeight:
                                                        "var(--font-bold)",
                                                }}
                                            >
                                                {product.title}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-4 mb-3">
                                                <span
                                                    style={{
                                                        color: "var(--color-primary)",
                                                        fontSize:
                                                            "var(--text-2xl)",
                                                        fontWeight:
                                                            "var(--font-bold)",
                                                    }}
                                                >
                                                    ₹
                                                    {parseFloat(
                                                        product.price,
                                                    ).toFixed(2)}
                                                </span>
                                                {product.gst > 0 && (
                                                    <span
                                                        style={{
                                                            color: "var(--color-text-muted)",
                                                            fontSize:
                                                                "var(--text-sm)",
                                                        }}
                                                    >
                                                        Includes {product.gst}%
                                                        GST
                                                    </span>
                                                )}
                                                {!product.is_discount && (
                                                    <span
                                                        className="px-3 py-1 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                "var(--color-surface-alt)",
                                                            color: "var(--color-text-muted)",
                                                            fontSize:
                                                                "var(--text-xs)",
                                                            fontWeight:
                                                                "var(--font-medium)",
                                                        }}
                                                    >
                                                        No discount
                                                    </span>
                                                )}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center border rounded-xl overflow-hidden">
                                                    <button
                                                        onClick={() =>
                                                            updateCartQuantity(
                                                                product.product_id,
                                                                product.quantity -
                                                                    1,
                                                            )
                                                        }
                                                        className="p-3 hover:bg-[var(--color-surface-alt)] transition-colors"
                                                        style={{
                                                            borderRight:
                                                                "1px solid var(--color-border-light)",
                                                        }}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span
                                                        className="px-6 py-3"
                                                        style={{
                                                            fontWeight:
                                                                "var(--font-bold)",
                                                            fontSize:
                                                                "var(--text-base)",
                                                        }}
                                                    >
                                                        {product.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateCartQuantity(
                                                                product.product_id,
                                                                product.quantity +
                                                                    1,
                                                            )
                                                        }
                                                        className="p-3 hover:bg-[var(--color-surface-alt)] transition-colors"
                                                        style={{
                                                            borderLeft:
                                                                "1px solid var(--color-border-light)",
                                                        }}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <span
                                                    style={{
                                                        color: "var(--color-text-primary)",
                                                        fontWeight:
                                                            "var(--font-bold)",
                                                    }}
                                                >
                                                    ₹
                                                    {(
                                                        product.price *
                                                        product.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(
                                                    product.product_id,
                                                )
                                            }
                                            className="self-start p-2 rounded-lg hover:bg-[var(--color-danger-light)] transition-colors"
                                            style={{
                                                color: "var(--color-danger)",
                                            }}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div
                            className="sticky top-6 rounded-2xl shadow-2xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--color-surface)",
                                border: "1px solid var(--color-border-light)",
                            }}
                        >
                            <div
                                className="px-8 py-6"
                                style={{
                                    background: "var(--gradient-primary)",
                                    color: "var(--color-text-on-primary)",
                                }}
                            >
                                <h2
                                    style={{
                                        fontWeight: "var(--font-bold)",
                                        fontSize: "var(--text-xl)",
                                    }}
                                >
                                    Order Summary
                                </h2>
                            </div>

                            <div className="p-8 space-y-6">
                                {/* Coupon Section */}
                                {!coupon ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Tag
                                                className="w-5 h-5"
                                                style={{
                                                    color: "var(--color-primary)",
                                                }}
                                            />
                                            <span
                                                style={{
                                                    fontWeight:
                                                        "var(--font-semibold)",
                                                }}
                                            >
                                                Apply Coupon
                                            </span>
                                        </div>

                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                value={couponCode || ""}
                                                onChange={(e) =>
                                                    addCouponCode(
                                                        e.target.value.toUpperCase(),
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    applyCoupon()
                                                }
                                                placeholder="COUPON CODE"
                                                disabled={
                                                    loading ||
                                                    !hasDiscountEligibleProducts
                                                }
                                                className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                                                style={{
                                                    backgroundColor:
                                                        "var(--color-surface)",
                                                    borderColor:
                                                        "var(--color-border-light)",
                                                    fontSize: "var(--text-sm)",
                                                }}
                                            />
                                            <button
                                                onClick={applyCoupon}
                                                disabled={
                                                    loading ||
                                                    !hasDiscountEligibleProducts
                                                }
                                                className="px-6 py-3 rounded-xl transition-all hover:scale-105"
                                                style={{
                                                    backgroundColor:
                                                        "var(--color-primary)",
                                                    color: "var(--color-text-on-primary)",
                                                    fontWeight:
                                                        "var(--font-bold)",
                                                    fontSize:
                                                        "var(--text-base)",
                                                }}
                                            >
                                                {loading ? (
                                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    "Apply"
                                                )}
                                            </button>
                                        </div>

                                        {!hasDiscountEligibleProducts && (
                                            <p
                                                className="text-center"
                                                style={{
                                                    color: "var(--color-text-muted)",
                                                    fontSize: "var(--text-sm)",
                                                }}
                                            >
                                                No discount-eligible items
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        className="p-5 rounded-2xl flex items-center justify-between"
                                        style={{
                                            backgroundColor:
                                                "var(--color-success-light)",
                                            border: "1px solid var(--color-success)",
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <CheckCircle
                                                className="w-6 h-6"
                                                style={{
                                                    color: "var(--color-success)",
                                                }}
                                            />
                                            <div>
                                                <span
                                                    style={{
                                                        color: "var(--color-success)",
                                                        fontWeight:
                                                            "var(--font-bold)",
                                                    }}
                                                >
                                                    {coupon.code}
                                                </span>
                                                <p
                                                    style={{
                                                        fontSize:
                                                            "var(--text-sm)",
                                                    }}
                                                >
                                                    {coupon.discount_type ===
                                                    "percentage"
                                                        ? `${coupon.discount_value}% off`
                                                        : `₹${coupon.discount_value} off`}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={removeCoupon}
                                            className="p-1 hover:opacity-70"
                                        >
                                            <X
                                                className="w-5 h-5"
                                                style={{
                                                    color: "var(--color-success)",
                                                }}
                                            />
                                        </button>
                                    </div>
                                )}

                                {/* Error Messages */}
                                {(couponError || checkoutError) && (
                                    <div
                                        className="p-5 rounded-2xl flex items-start gap-3"
                                        style={{
                                            backgroundColor:
                                                "var(--color-danger-light)",
                                            border: "1px solid var(--color-danger)",
                                        }}
                                    >
                                        <AlertCircle
                                            className="w-6 h-6 flex-shrink-0"
                                            style={{
                                                color: "var(--color-danger)",
                                            }}
                                        />
                                        <p
                                            className=""
                                            style={{
                                                color: "var(--color-danger)",
                                                fontSize: "var(--text-sm)",
                                            }}
                                        >
                                            {couponError || checkoutError}
                                        </p>
                                    </div>
                                )}

                                {/* Price Breakdown */}
                                <div
                                    className="space-y-4 pt-6 border-t-2 border-dashed"
                                    style={{
                                        borderColor:
                                            "var(--color-border-light)",
                                    }}
                                >
                                    <div className="flex justify-between">
                                        <span>Subtotal (incl. GST)</span>
                                        <span
                                            style={{
                                                fontWeight:
                                                    "var(--font-semibold)",
                                            }}
                                        >
                                            ₹
                                            {totals.itemTotalWithGst.toFixed(2)}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between"
                                        style={{
                                            color: "var(--color-text-muted)",
                                            fontSize: "var(--text-sm)",
                                        }}
                                    >
                                        <span>GST Included</span>
                                        <span>
                                            ₹{totals.totalGst.toFixed(2)}
                                        </span>
                                    </div>
                                    {totals.totalDiscount > 0 && (
                                        <div
                                            className="flex justify-between"
                                            style={{
                                                color: "var(--color-success)",
                                                fontSize: "var(--text-lg)",
                                                fontWeight: "var(--font-bold)",
                                            }}
                                        >
                                            <span>Discount</span>
                                            <span>
                                                -₹
                                                {totals.totalDiscount.toFixed(
                                                    2,
                                                )}
                                            </span>
                                        </div>
                                    )}

                                    <div
                                        className="pt-6 border-t-2 border-dashed flex justify-between items-baseline"
                                        style={{
                                            borderColor: "var(--color-primary)",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "var(--text-xl)",
                                                fontWeight: "var(--font-bold)",
                                            }}
                                        >
                                            Total Amount
                                        </span>
                                        <span
                                            className=""
                                            style={{
                                                color: "var(--color-primary)",
                                                fontSize: "var(--text-3xl)",
                                                fontWeight: "var(--font-black)",
                                            }}
                                        >
                                            ₹{totals.finalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="w-full py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-60"
                                    style={{
                                        backgroundColor: "var(--color-primary)",
                                        color: "var(--color-text-on-primary)",
                                        fontSize: "var(--text-xl)",
                                        fontWeight: "var(--font-bold)",
                                    }}
                                >
                                    {loading ? (
                                        <RefreshCw className="w-7 h-7 animate-spin mx-auto" />
                                    ) : (
                                        `Proceed to Checkout →`
                                    )}
                                </button>

                                <button
                                    onClick={() => navigate("/products")}
                                    className="w-full py-4 rounded-xl border-2 transition-all hover:bg-[var(--color-surface-alt)]"
                                    style={{
                                        borderColor: "var(--color-primary)",
                                        color: "var(--color-primary)",
                                        fontWeight: "var(--font-semibold)",
                                    }}
                                >
                                    Continue Shopping
                                </button>

                                {/* Trust Badges */}
                                <div
                                    className="pt-6 border-t flex flex-col gap-4 text-center"
                                    style={{
                                        borderColor:
                                            "var(--color-border-light)",
                                        color: "var(--color-text-muted)",
                                    }}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Shield
                                            className="w-5 h-5"
                                            style={{
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                        <span>100% Secure Payment</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Truck
                                            className="w-5 h-5"
                                            style={{
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                        <span>
                                            Free Shipping on orders above ₹999
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductViewer;
