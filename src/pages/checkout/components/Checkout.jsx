import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useStore } from "../../../stores/useStore";
import {
    Shield,
    Truck,
    CreditCard,
    MapPin,
    User,
    Phone,
    Home,
    Mail,
    Loader,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { states, cities } from "../../../data/indianStatesCities";

const Checkout = () => {
    const token = Cookies.get("auth_token");
    const navigate = useNavigate();
    const { cart, checkedOrder, signOrder, clearCart, signAmount } = useStore();
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone_code: "+91",
        phone: "",
        shipping_address: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        notes: "",
        payment_method: "ONLINE",
    });

    const [error, setError] = useState("");
    const [totals, setTotals] = useState({
        subtotal: 0,
        gst: 0,
        discount: 0,
        finalAmount: 0,
    });

    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setStateOptions(states);
    }, []);

    useEffect(() => {
        if (!form.state) {
            setCityOptions([]);
            return;
        }
        const selectedState = states.find((s) => s.name === form.state);
        if (selectedState && cities[selectedState.isoCode]) {
            setCityOptions(cities[selectedState.isoCode]);
        } else {
            setCityOptions([]);
        }
    }, [form.state]);

    useEffect(() => {
        if (checkedOrder) {
            const subtotal = checkedOrder.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
            );
            const gst = checkedOrder.items.reduce(
                (sum, item) => sum + item.gst_amount,
                0,
            );
            const discount = checkedOrder.items.reduce(
                (sum, item) => sum + (item.discount || 0),
                0,
            );
            setTotals({
                subtotal: parseFloat(subtotal.toFixed(2)),
                gst: parseFloat(gst.toFixed(2)),
                discount: parseFloat(discount.toFixed(2)),
                finalAmount: parseFloat(checkedOrder.final_amount.toFixed(2)),
            });
        }
    }, [checkedOrder]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "pincode") {
            if (value && (!/^\d*$/.test(value) || value.length > 6)) return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handlePlaceOrder = async () => {
        const required = [
            "name",
            "email",
            "phone",
            "shipping_address",
            "city",
            "state",
            "pincode",
        ];

        const missing = required.filter((f) => !form[f]?.trim());
        if (missing.length > 0) {
            setError(`Please complete: ${missing.join(", ")}`);
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(form.email)) {
            setError("Invalid email address");
            return;
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(form.phone)) {
            setError("Invalid Indian phone number");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const orderPayload = {
                name: form.name,
                email: form.email,
                phone_code: form.phone_code,
                phone: form.phone,
                shipping_address: form.shipping_address,
                billing_address: form.shipping_address,
                city: form.city,
                state: form.state,
                country: form.country,
                pincode: form.pincode,
                notes: form.notes || "",
                shipping_method: "standard",
                payment_method: "ONLINE",
                order: signOrder,
            };

            // ---- CREATE RAZORPAY ORDER ----
            const resRazorpay = await fetch(
                `${apiUrl}/api/v1/payment/razorpay`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ signAmount }),
                },
            );

            const dataRazorpay = await resRazorpay.json();
            if (!dataRazorpay.status) {
                throw new Error(
                    dataRazorpay.message || "Payment initiation failed",
                );
            }

            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
            if (!razorpayKey) throw new Error("Razorpay configuration missing");

            // ---- LOAD SDK ----
            if (!window.Razorpay) {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                document.body.appendChild(script);

                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = () =>
                        reject(new Error("Failed to load Razorpay SDK"));
                });
            }

            const options = {
                key: razorpayKey,
                amount: dataRazorpay.order.amount,
                currency: dataRazorpay.order.currency,
                name: "IMD Hardware",
                description: "Secure Hardware Purchase",
                order_id: dataRazorpay.order.id,

                handler: async (response) => {
                    try {
                        // ---- MERGE PAYMENT DATA ----
                        const confirmPayload = {
                            ...orderPayload,
                            payment_gateway_data: response, // object directly
                        };

                        const resConfirm = await fetch(
                            `${apiUrl}/api/v1/order/confirm`,
                            {
                                method: "POST",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(confirmPayload),
                            },
                        );

                        const confirmData = await resConfirm.json();

                        if (confirmData?.status) {
                            clearCart();
                            setLoading(false);
                            navigate("/order-success", {
                                state: { orderId: confirmData.order_id },
                            });
                        } else {
                            setError(
                                confirmData?.message ||
                                    "Order confirmation failed",
                            );
                            setLoading(false);
                        }
                    } catch (err) {
                        console.error(err);
                        setError(
                            "Payment succeeded but order failed. Contact support with payment ID.",
                        );
                        setLoading(false);
                    }
                },

                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone_code + form.phone,
                },

                modal: {
                    ondismiss: () => setLoading(false),
                },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", (response) => {
                setError(
                    `Payment failed: ${
                        response.error.description || "Unknown error"
                    }`,
                );
                setLoading(false);
            });

            rzp.open();
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    if (!checkedOrder || cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <AlertCircle
                        className="w-20 h-20 mx-auto mb-6 opacity-50"
                        style={{ color: "var(--color-text-muted)" }}
                    />
                    <h2
                        className="mb-4"
                        style={{
                            color: "var(--color-text-primary)",
                            fontWeight: "var(--font-bold)",
                            fontSize: "var(--text-2xl)",
                        }}
                    >
                        Unable to Proceed
                    </h2>
                    <p
                        style={{
                            color: "var(--color-text-secondary)",
                            fontSize: "var(--text-sm)",
                        }}
                    >
                        Your cart is empty or order details are missing.
                    </p>
                    <button
                        onClick={() => navigate("/cart")}
                        className="mt-6 px-8 py-3 rounded-xl transition-all hover:scale-105"
                        style={{
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-text-on-primary)",
                            fontWeight: "var(--font-semibold)",
                        }}
                    >
                        Return to Cart
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen p-2 "
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            <div className="max-w-7xl mx-auto">
                {error && (
                    <div
                        className="max-w-4xl mx-auto mb-8 p-5 rounded-lg flex items-start gap-4"
                        style={{
                            backgroundColor: "var(--color-danger-light)",
                            border: "1px solid var(--color-danger)",
                        }}
                    >
                        <AlertCircle
                            className="w-6 h-6 flex-shrink-0"
                            style={{ color: "var(--color-danger)" }}
                        />
                        <p
                            style={{
                                color: "var(--color-danger)",
                                fontSize: "var(--text-sm)",
                            }}
                        >
                            {error}
                        </p>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-5">
                    {/* Shipping Form */}
                    <div className="lg:col-span-2">
                        <div
                            className="rounded-lg overflow-hidden"
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
                                    className="flex items-center gap-3"
                                    style={{
                                        fontWeight: "var(--font-bold)",
                                        fontSize: "var(--text-xl)",
                                    }}
                                >
                                    <MapPin className="w-6 h-6" />
                                    Shipping Information
                                </h2>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Personal Info */}
                                <div className="space-y-5">
                                    <div className="flex items-center gap-3">
                                        <User
                                            className="w-5 h-5"
                                            style={{
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontWeight:
                                                    "var(--font-semibold)",
                                                fontSize: "var(--text-base)",
                                            }}
                                        >
                                            Personal Details
                                        </span>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label
                                                className="block mb-2"
                                                style={{
                                                    color: "var(--color-text-secondary)",
                                                    fontSize: "var(--text-sm)",
                                                }}
                                            >
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                                                    style={{
                                                        color: "var(--color-text-muted)",
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                                                    style={{
                                                        borderColor:
                                                            "var(--color-border-light)",
                                                        "--tw-ring-color":
                                                            "var(--color-primary)",
                                                        backgroundColor:
                                                            "var(--color-surface)",
                                                    }}
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                className="block mb-2"
                                                style={{
                                                    color: "var(--color-text-secondary)",
                                                    fontSize: "var(--text-sm)",
                                                }}
                                            >
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <Mail
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                                                    style={{
                                                        color: "var(--color-text-muted)",
                                                    }}
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                                                    style={{
                                                        borderColor:
                                                            "var(--color-border-light)",
                                                        "--tw-ring-color":
                                                            "var(--color-primary)",
                                                        backgroundColor:
                                                            "var(--color-surface)",
                                                    }}
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            className="block mb-2"
                                            style={{
                                                color: "var(--color-text-secondary)",
                                                fontSize: "var(--text-sm)",
                                            }}
                                        >
                                            Phone Number *
                                        </label>
                                        <div className="flex gap-3">
                                            <div className="relative w-28">
                                                <Phone
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                                                    style={{
                                                        color: "var(--color-text-muted)",
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    name="phone_code"
                                                    value={form.phone_code}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-3 py-3 rounded-xl border"
                                                    style={{
                                                        borderColor:
                                                            "var(--color-border-light)",
                                                        backgroundColor:
                                                            "var(--color-surface)",
                                                    }}
                                                />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                                                style={{
                                                    borderColor:
                                                        "var(--color-border-light)",
                                                    "--tw-ring-color":
                                                        "var(--color-primary)",
                                                    backgroundColor:
                                                        "var(--color-surface)",
                                                }}
                                                placeholder="9876543210"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Info */}
                                <div
                                    className="space-y-5 pt-6 border-t"
                                    style={{
                                        borderColor:
                                            "var(--color-border-light)",
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Home
                                            className="w-5 h-5"
                                            style={{
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontWeight:
                                                    "var(--font-semibold)",
                                                fontSize: "var(--text-base)",
                                            }}
                                        >
                                            Delivery Address
                                        </span>
                                    </div>

                                    <div>
                                        <label
                                            className="block mb-2"
                                            style={{
                                                color: "var(--color-text-secondary)",
                                                fontSize: "var(--text-sm)",
                                            }}
                                        >
                                            Street Address *
                                        </label>
                                        <div className="relative">
                                            <Home
                                                className="absolute left-4 top-4 w-5 h-5"
                                                style={{
                                                    color: "var(--color-text-muted)",
                                                }}
                                            />
                                            <textarea
                                                name="shipping_address"
                                                value={form.shipping_address}
                                                onChange={handleChange}
                                                required
                                                rows="3"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none"
                                                style={{
                                                    borderColor:
                                                        "var(--color-border-light)",
                                                    "--tw-ring-color":
                                                        "var(--color-primary)",
                                                    backgroundColor:
                                                        "var(--color-surface)",
                                                }}
                                                placeholder="House no., street, landmark..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label
                                                className="block mb-2"
                                                style={{
                                                    color: "var(--color-text-secondary)",
                                                    fontSize: "var(--text-sm)",
                                                }}
                                            >
                                                State *
                                            </label>
                                            <select
                                                name="state"
                                                value={form.state}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                                                style={{
                                                    borderColor:
                                                        "var(--color-border-light)",
                                                    "--tw-ring-color":
                                                        "var(--color-primary)",
                                                    backgroundColor:
                                                        "var(--color-surface)",
                                                }}
                                            >
                                                <option value="">
                                                    Select State
                                                </option>
                                                {stateOptions.map((s) => (
                                                    <option
                                                        key={s.isoCode}
                                                        value={s.name}
                                                    >
                                                        {s.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                className="block mb-2"
                                                style={{
                                                    color: "var(--color-text-secondary)",
                                                    fontSize: "var(--text-sm)",
                                                }}
                                            >
                                                City *
                                            </label>
                                            <select
                                                name="city"
                                                value={form.city}
                                                onChange={handleChange}
                                                required
                                                disabled={!form.state}
                                                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                                                style={{
                                                    borderColor:
                                                        "var(--color-border-light)",
                                                    "--tw-ring-color":
                                                        "var(--color-primary)",
                                                    backgroundColor:
                                                        "var(--color-surface)",
                                                }}
                                            >
                                                <option value="">
                                                    {form.state
                                                        ? "Select City"
                                                        : "Select State First"}
                                                </option>
                                                {cityOptions.map((c) => (
                                                    <option
                                                        key={c.name}
                                                        value={c.name}
                                                    >
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            className="block mb-2"
                                            style={{
                                                color: "var(--color-text-secondary)",
                                                fontSize: "var(--text-sm)",
                                            }}
                                        >
                                            Pincode *
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={form.pincode}
                                            onChange={handleChange}
                                            required
                                            maxLength="6"
                                            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                                            style={{
                                                borderColor:
                                                    "var(--color-border-light)",
                                                "--tw-ring-color":
                                                    "var(--color-primary)",
                                                backgroundColor:
                                                    "var(--color-surface)",
                                            }}
                                            placeholder="380001"
                                        />
                                    </div>
                                </div>

                                {/* Notes */}
                                <div
                                    className="pt-6 border-t"
                                    style={{
                                        borderColor:
                                            "var(--color-border-light)",
                                    }}
                                >
                                    <label
                                        className="block mb-2"
                                        style={{
                                            color: "var(--color-text-secondary)",
                                            fontSize: "var(--text-sm)",
                                        }}
                                    >
                                        Order Notes (Optional)
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={form.notes}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none"
                                        style={{
                                            borderColor:
                                                "var(--color-border-light)",
                                            "--tw-ring-color":
                                                "var(--color-primary)",
                                            backgroundColor:
                                                "var(--color-surface)",
                                        }}
                                        placeholder="Delivery instructions, preferred time, etc."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary - Unified Style for Mobile & Desktop */}
                    <div className="lg:col-span-1">
                        <div
                            className="sticky top-6 rounded-lg overflow-hidden"
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

                            <div className="p-3 space-y-4">
                                {/* Unified Item List - Same Style on All Screens */}
                                <div className="space-y-3">
                                    {checkedOrder.items.map((item) => (
                                        <div
                                            key={item.product_id}
                                            className="flex gap-5 p-3 rounded-lg"
                                            style={{
                                                backgroundColor:
                                                    "var(--color-bg-alt)",
                                            }}
                                        >
                                            <img
                                                src={`${apiUrl}/image/product/${item.images[0]}`}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-md"
                                            />
                                            <div className="flex-1">
                                                <h4
                                                    className="mb-2 line-clamp-2"
                                                    style={{
                                                        fontSize:
                                                            "var(--text-base)",
                                                        color: "var(--color-text-primary)",
                                                        fontWeight:
                                                            "var(--font-bold)",
                                                    }}
                                                >
                                                    {item.name}
                                                </h4>
                                                <div
                                                    className="grid grid-cols-2 gap-3"
                                                    style={{
                                                        fontSize:
                                                            "var(--text-sm)",
                                                    }}
                                                >
                                                    <div>
                                                        <span
                                                            style={{
                                                                color: "var(--color-text-muted)",
                                                            }}
                                                        >
                                                            Qty:
                                                        </span>
                                                        <span
                                                            className="ml-2"
                                                            style={{
                                                                fontWeight:
                                                                    "var(--font-semibold)",
                                                            }}
                                                        >
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span
                                                            style={{
                                                                color: "var(--color-text-muted)",
                                                            }}
                                                        >
                                                            Price:
                                                        </span>
                                                        <span
                                                            className="ml-2"
                                                            style={{
                                                                fontWeight:
                                                                    "var(--font-semibold)",
                                                            }}
                                                        >
                                                            ₹
                                                            {item.price.toFixed(
                                                                2,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span
                                                            style={{
                                                                color: "var(--color-text-muted)",
                                                            }}
                                                        >
                                                            GST:
                                                        </span>
                                                        <span
                                                            className="ml-2"
                                                            style={{
                                                                fontWeight:
                                                                    "var(--font-semibold)",
                                                            }}
                                                        >
                                                            {item.gst_rate}%
                                                        </span>
                                                    </div>
                                                    {item.is_discount &&
                                                        item.discount > 0 && (
                                                            <div
                                                                style={{
                                                                    color: "var(--color-success)",
                                                                }}
                                                            >
                                                                <span>
                                                                    Discount:
                                                                </span>
                                                                <span
                                                                    className="ml-2"
                                                                    style={{
                                                                        fontWeight:
                                                                            "var(--font-bold)",
                                                                    }}
                                                                >
                                                                    -₹
                                                                    {item.discount.toFixed(
                                                                        2,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )}
                                                </div>
                                                <div
                                                    className="mt-4 pt-3 border-t flex justify-between items-center"
                                                    style={{
                                                        borderColor:
                                                            "var(--color-border-light)",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: "var(--color-text-muted)",
                                                            fontSize:
                                                                "var(--text-sm)",
                                                        }}
                                                    >
                                                        Total:
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: "var(--color-primary)",
                                                            fontWeight:
                                                                "var(--font-bold)",
                                                            fontSize:
                                                                "var(--text-lg)",
                                                        }}
                                                    >
                                                        ₹{item.total.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div
                                    className="space-y-3 pt-6 border-t-2 border-dashed"
                                    style={{
                                        borderColor:
                                            "var(--color-border-light)",
                                    }}
                                >
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>
                                            ₹{totals.subtotal.toFixed(2)}
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
                                        <span>₹{totals.gst.toFixed(2)}</span>
                                    </div>
                                    {totals.discount > 0 && (
                                        <div
                                            className="flex justify-between"
                                            style={{
                                                color: "var(--color-success)",
                                                fontWeight: "var(--font-bold)",
                                                fontSize: "var(--text-lg)",
                                            }}
                                        >
                                            <span>Discount</span>
                                            <span>
                                                -₹{totals.discount.toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        className="pt-4 border-t-2 border-dashed flex justify-between items-baseline"
                                        style={{
                                            borderColor: "var(--color-primary)",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: "var(--font-bold)",
                                                fontSize: "var(--text-xl)",
                                            }}
                                        >
                                            Total Payable
                                        </span>
                                        <span
                                            style={{
                                                color: "var(--color-primary)",
                                                fontWeight: "var(--font-black)",
                                                fontSize: "var(--text-3xl)",
                                            }}
                                        >
                                            ₹{totals.finalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex flex-col gap-3 text-center pt-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Shield
                                            className="w-5 h-5"
                                            style={{
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: "var(--text-sm)",
                                            }}
                                        >
                                            256-bit SSL Encrypted
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Truck
                                            className="w-5 h-5"
                                            style={{
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: "var(--text-sm)",
                                            }}
                                        >
                                            Free Shipping Available
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <CreditCard
                                            className="w-5 h-5"
                                            style={{
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: "var(--text-sm)",
                                            }}
                                        >
                                            Easy Returns & Refunds
                                        </span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                    className="w-full py-5 rounded-lg hover:scale-101 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    style={{
                                        backgroundColor: "var(--color-primary)",
                                        color: "var(--color-text-on-primary)",
                                        fontWeight: "var(--font-bold)",
                                        fontSize: "var(--text-xl)",
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <Loader className="w-6 h-6 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-6 h-6" />
                                            Place Order → ₹
                                            {totals.finalAmount.toFixed(2)}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
