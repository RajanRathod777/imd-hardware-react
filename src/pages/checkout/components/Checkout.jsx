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
  RefreshCw,
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
        0
      );
      const gst = checkedOrder.items.reduce(
        (sum, item) => sum + item.gst_amount,
        0
      );
      const discount = checkedOrder.items.reduce(
        (sum, item) => sum + (item.discount || 0),
        0
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
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("billing_address", form.shipping_address);
      formData.append("shipping_method", "standard");
      formData.append("payment_method", "ONLINE");
      if (signOrder) formData.append("order", signOrder);

      const resRazorpay = await fetch(`${apiUrl}/api/v1/payment/razorpay`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signAmount }),
      });

      const dataRazorpay = await resRazorpay.json();
      if (!dataRazorpay.status)
        throw new Error(dataRazorpay.message || "Payment initiation failed");

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) throw new Error("Razorpay configuration missing");

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
            formData.append("payment_gateway_data", JSON.stringify(response));

            const resConfirm = await fetch(`${apiUrl}/api/v1/order/confirm`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            });

            const confirmData = await resConfirm.json();
            if (confirmData?.status) {
              clearCart();
              navigate("/order-success", {
                state: { orderId: confirmData.order_id },
              });
            } else {
              setError(confirmData?.message || "Order confirmation failed");
            }
          } catch (err) {
            setError(
              "Payment succeeded but order failed. Contact support with payment ID."
            );
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone_code + form.phone,
        },
        theme: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue("--color-primary")
            .trim(),
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setError(
          `Payment failed: ${response.error.description || "Unknown error"}`
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
            className="max-w-4xl mx-auto mb-8 p-5 rounded-2xl flex items-start gap-4"
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
              className="rounded-2xl shadow-xl overflow-hidden"
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
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span
                      style={{
                        fontWeight: "var(--font-semibold)",
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
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                          style={{
                            borderColor: "var(--color-border-light)",
                            "--tw-ring-color": "var(--color-primary)",
                            backgroundColor: "var(--color-surface)",
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
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                          style={{
                            borderColor: "var(--color-border-light)",
                            "--tw-ring-color": "var(--color-primary)",
                            backgroundColor: "var(--color-surface)",
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
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <input
                          type="text"
                          name="phone_code"
                          value={form.phone_code}
                          onChange={handleChange}
                          className="w-full pl-12 pr-3 py-3 rounded-xl border"
                          style={{
                            borderColor: "var(--color-border-light)",
                            backgroundColor: "var(--color-surface)",
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
                          borderColor: "var(--color-border-light)",
                          "--tw-ring-color": "var(--color-primary)",
                          backgroundColor: "var(--color-surface)",
                        }}
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Info */}
                <div
                  className="space-y-5 pt-6 border-t"
                  style={{ borderColor: "var(--color-border-light)" }}
                >
                  <div className="flex items-center gap-3">
                    <Home
                      className="w-5 h-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span
                      style={{
                        fontWeight: "var(--font-semibold)",
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
                        style={{ color: "var(--color-text-muted)" }}
                      />
                      <textarea
                        name="shipping_address"
                        value={form.shipping_address}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none"
                        style={{
                          borderColor: "var(--color-border-light)",
                          "--tw-ring-color": "var(--color-primary)",
                          backgroundColor: "var(--color-surface)",
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
                          borderColor: "var(--color-border-light)",
                          "--tw-ring-color": "var(--color-primary)",
                          backgroundColor: "var(--color-surface)",
                        }}
                      >
                        <option value="">Select State</option>
                        {stateOptions.map((s) => (
                          <option key={s.isoCode} value={s.name}>
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
                          borderColor: "var(--color-border-light)",
                          "--tw-ring-color": "var(--color-primary)",
                          backgroundColor: "var(--color-surface)",
                        }}
                      >
                        <option value="">
                          {form.state ? "Select City" : "Select State First"}
                        </option>
                        {cityOptions.map((c) => (
                          <option key={c.name} value={c.name}>
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
                        borderColor: "var(--color-border-light)",
                        "--tw-ring-color": "var(--color-primary)",
                        backgroundColor: "var(--color-surface)",
                      }}
                      placeholder="380001"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div
                  className="pt-6 border-t"
                  style={{ borderColor: "var(--color-border-light)" }}
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
                      borderColor: "var(--color-border-light)",
                      "--tw-ring-color": "var(--color-primary)",
                      backgroundColor: "var(--color-surface)",
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

              <div className="p-3 space-y-4">
                {/* Unified Item List - Same Style on All Screens */}
                <div className="space-y-3">
                  {checkedOrder.items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex gap-5 p-3 rounded-2xl"
                      style={{ backgroundColor: "var(--color-bg-alt)" }}
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
                            fontSize: "var(--text-base)",
                            color: "var(--color-text-primary)",
                            fontWeight: "var(--font-bold)",
                          }}
                        >
                          {item.name}
                        </h4>
                        <div
                          className="grid grid-cols-2 gap-3"
                          style={{ fontSize: "var(--text-sm)" }}
                        >
                          <div>
                            <span style={{ color: "var(--color-text-muted)" }}>
                              Qty:
                            </span>
                            <span
                              className="ml-2"
                              style={{ fontWeight: "var(--font-semibold)" }}
                            >
                              {item.quantity}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: "var(--color-text-muted)" }}>
                              Price:
                            </span>
                            <span
                              className="ml-2"
                              style={{ fontWeight: "var(--font-semibold)" }}
                            >
                              ₹{item.price.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: "var(--color-text-muted)" }}>
                              GST:
                            </span>
                            <span
                              className="ml-2"
                              style={{ fontWeight: "var(--font-semibold)" }}
                            >
                              {item.gst_rate}%
                            </span>
                          </div>
                          {item.is_discount && item.discount > 0 && (
                            <div style={{ color: "var(--color-success)" }}>
                              <span>Discount:</span>
                              <span
                                className="ml-2"
                                style={{ fontWeight: "var(--font-bold)" }}
                              >
                                -₹{item.discount.toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div
                          className="mt-4 pt-3 border-t flex justify-between items-center"
                          style={{ borderColor: "var(--color-border-light)" }}
                        >
                          <span
                            style={{
                              color: "var(--color-text-muted)",
                              fontSize: "var(--text-sm)",
                            }}
                          >
                            Total:
                          </span>
                          <span
                            style={{
                              color: "var(--color-primary)",
                              fontWeight: "var(--font-bold)",
                              fontSize: "var(--text-lg)",
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
                  style={{ borderColor: "var(--color-border-light)" }}
                >
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totals.subtotal.toFixed(2)}</span>
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
                      <span>-₹{totals.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div
                    className="pt-4 border-t-2 border-dashed flex justify-between items-baseline"
                    style={{ borderColor: "var(--color-primary)" }}
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
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span style={{ fontSize: "var(--text-sm)" }}>
                      256-bit SSL Encrypted
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Truck
                      className="w-5 h-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span style={{ fontSize: "var(--text-sm)" }}>
                      Free Shipping Available
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard
                      className="w-5 h-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <span style={{ fontSize: "var(--text-sm)" }}>
                      Easy Returns & Refunds
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                    fontWeight: "var(--font-bold)",
                    fontSize: "var(--text-xl)",
                  }}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Place Order → ₹{totals.finalAmount.toFixed(2)}
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

// import { useState, useEffect } from "react";
// import { useRazorpay } from "react-razorpay";
// import Cookies from "js-cookie";
// import { useStore } from "../../../stores/useStore";
// import {
//   Shield,
//   Truck,
//   CreditCard,
//   MapPin,
//   User,
//   Phone,
//   Home,
//   Mail,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router";
// import { states, cities } from "../../../data/indianStatesCities";

// const Checkout = () => {
//   const token = Cookies.get("auth_token");
//   const navigate = useNavigate();
//   const { cart, checkedOrder, signOrder, clearCart, signAmount } = useStore();
//   const apiUrl = import.meta.env.VITE_SERVER_API_URL;

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone_code: "+91",
//     phone: "",
//     shipping_address: "",
//     city: "",
//     state: "",
//     country: "India",
//     pincode: "",
//     shipping_method: "standard",
//     paymentMethod: "ONLINE",
//     notes: "",
//   });

//   const [error, setError] = useState("");
//   const [totals, setTotals] = useState({
//     subtotal: 0,
//     gst: 0,
//     discount: 0,
//     finalAmount: 0,
//   });

//   const [stateOptions, setStateOptions] = useState([]);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load all states once (lazy load country-state-city)
//   // Load all states from local data
//   useEffect(() => {
//     setStateOptions(states);
//   }, []);

//   // When state changes, load cities from local data
//   useEffect(() => {
//     if (!form.state) {
//       setCityOptions([]);
//       return;
//     }

//     const selectedState = states.find((s) => s.name === form.state);
//     if (selectedState) {
//       const stateCities = cities[selectedState.isoCode];
//       if (Array.isArray(stateCities)) {
//         setCityOptions(stateCities);
//       } else {
//         setCityOptions([]);
//       }
//     }
//   }, [form.state]);

//   // Calculate totals from checkedOrder
//   useEffect(() => {
//     if (checkedOrder) {
//       const subtotal = checkedOrder.items.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       );
//       const gst = checkedOrder.items.reduce(
//         (sum, item) => sum + item.gst_amount,
//         0
//       );
//       const discount = checkedOrder.items.reduce(
//         (sum, item) => sum + (item.discount || 0),
//         0
//       );
//       setTotals({
//         subtotal: parseFloat(subtotal.toFixed(2)),
//         gst: parseFloat(gst.toFixed(2)),
//         discount: parseFloat(discount.toFixed(2)),
//         finalAmount: parseFloat(checkedOrder.final_amount.toFixed(2)),
//       });
//     }
//   }, [checkedOrder]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Validate pincode to only allow 6 digits
//     if (name === "pincode") {
//       // Only allow digits and max 6 characters
//       if (value && (!/^\d*$/.test(value) || value.length > 6)) {
//         return;
//       }
//     }

//     setForm((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   const {
//     error: razorpayError,
//     isLoading: isRazorpayLoading,
//     Razorpay,
//   } = useRazorpay();

//   useEffect(() => {
//     if (razorpayError) {
//       console.error("Razorpay SDK failed to load:", razorpayError);
//       setError(
//         "Payment gateway failed to load. Please check your internet connection or disable ad-blockers and refresh the page."
//       );
//     }
//   }, [razorpayError]);

//   const handlePlaceOrder = async () => {
//     const requiredFields = [
//       "name",
//       "email",
//       "phone_code",
//       "phone",
//       "shipping_address",
//       "city",
//       "state",
//       "country",
//       "pincode",
//     ];
//     const missingFields = requiredFields.filter(
//       (field) => !form[field]?.trim()
//     );
//     if (missingFields.length > 0) {
//       setError(`Please fill in: ${missingFields.join(", ")}`);
//       return;
//     }

//     // Validate email format
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     if (!emailRegex.test(form.email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     // Validate phone number (Indian format)
//     const phoneRegex = /^[6-9]\d{9}$/;
//     if (!phoneRegex.test(form.phone.replace(/\D/g, ""))) {
//       setError("Please enter a valid Indian phone number");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Create FormData for order submission
//       const formData = new FormData();

//       // Append all form fields
//       formData.append("name", form.name);
//       formData.append("email", form.email);
//       formData.append("phone_code", form.phone_code);
//       formData.append("phone", form.phone);
//       formData.append("country", form.country);
//       formData.append("state", form.state);
//       formData.append("city", form.city);
//       formData.append("pincode", form.pincode);
//       formData.append("address", form.shipping_address);
//       formData.append("shipping_address", form.shipping_address);
//       formData.append("billing_address", form.shipping_address);
//       formData.append("shipping_method", form.shipping_method);
//       formData.append("notes", form.notes);
//       formData.append("payment_method", form.paymentMethod);

//       if (signOrder) {
//         formData.append("order", signOrder);
//       } else {
//         throw new Error("Order data is missing");
//       }

//       if (form.paymentMethod === "ONLINE") {
//         const resRazorpay = await fetch(`${apiUrl}/api/v1/payment/razorpay`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ signAmount }),
//         });
//         const dataRazorpay = await resRazorpay.json();

//         if (!dataRazorpay.status) {
//           throw new Error(dataRazorpay.message || "Failed to initiate payment");
//         }

//         // // Confirm order
//         // const resConfirm = await fetch(`${apiUrl}/api/v1/order/confirm`, {
//         //   method: "POST",
//         //   headers: {
//         //     Authorization: `Bearer ${token}`,
//         //   },
//         //   body: formData, // FormData automatically sets Content-Type to multipart/form-data
//         // });

//         // const dataConfirm = await resConfirm.json();

//         // if (dataConfirm?.status) {
//         //   // alert("Order placed successfully!");
//         //   clearCart();
//         //   router.push("/dashboard/orders");
//         // } else {
//         //   setError(dataConfirm?.message || "Failed to confirm order");
//         // }

//         const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
//         if (!razorpayKey) {
//           throw new Error(
//             "Razorpay Key ID is missing. Please check your environment variables."
//           );
//         }

//         const options = {
//           key: razorpayKey,
//           amount: dataRazorpay.order.amount,
//           currency: dataRazorpay.order.currency,
//           name: "IMD Hardware",
//           description: "Order Payment",
//           order_id: dataRazorpay.order.id,
//           handler: async (response) => {
//             try {
//               // Add Razorpay payment details to formData
//               formData.append("payment_gateway_data", response);

//               // Confirm order
//               const resConfirm = await fetch(`${apiUrl}/api/v1/order/confirm`, {
//                 method: "POST",
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//                 body: formData, // FormData automatically sets Content-Type to multipart/form-data
//               });

//               const dataConfirm = await resConfirm.json();

//               if (dataConfirm?.status) {
//                 // alert("Order placed successfully!");
//                 clearCart();
//                 navigate("/dashboard/orders");
//               } else {
//                 setError(dataConfirm?.message || "Failed to confirm order");
//               }
//             } catch (confirmError) {
//               console.error("Order confirmation error:", confirmError);
//               setError(
//                 "Payment successful but failed to confirm order. Please contact support."
//               );
//             }
//           },
//           prefill: {
//             name: form.name,
//             email: form.email,
//             contact: form.phone,
//           },
//           theme: {
//             color: "#F37254",
//           },
//         };

//         if (!Razorpay) {
//           throw new Error("Razorpay SDK not loaded. Please refresh the page.");
//         }

//         const razorpayInstance = new Razorpay(options);
//         razorpayInstance.on("payment.failed", function (response) {
//           console.error("Payment failed:", response.error);
//           setError(`Payment failed: ${response.error.description}`);
//         });
//         razorpayInstance.open();
//       } else {
//         // Handle COD or other methods if needed
//         // For now just error or implement similar logic for COD
//         setError("Only Online payment is currently supported in this flow.");
//       }
//     } catch (err) {
//       console.error("Order creation error:", err);
//       setError(err.message || "Something went wrong while placing your order.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!checkedOrder || cart.length === 0) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center text-lg"
//         style={{ color: "var(--color-text-muted)" }}
//       >
//         Your cart is empty or order details are missing. Please add items and
//         verify your order.
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen py-10"
//       style={{ backgroundColor: "var(--color-bg)" }}
//     >
//       <div className="max-w-6xl mx-auto px-4 lg:grid lg:grid-cols-12 gap-8">
//         {/* Shipping Form */}
//         <div
//           className="lg:col-span-8 shadow-sm border p-4 sm:p-6 space-y-6 rounded-lg"
//           style={{
//             backgroundColor: "var(--color-surface)",
//             borderColor: "var(--color-border)",
//           }}
//         >
//           <h2
//             className="text-2xl font-bold mb-4"
//             style={{
//               color: "var(--color-text-primary)",
//               fontFamily: "var(--font-heading)",
//             }}
//           >
//             Shipping Details
//           </h2>
//           {error && (
//             <p
//               className="text-sm border p-2 rounded-lg"
//               style={{
//                 color: "var(--color-text-primary)",
//                 backgroundColor: "var(--color-bg-alt)",
//                 borderColor: "var(--color-border)",
//               }}
//             >
//               {error}
//             </p>
//           )}

//           {/* Personal Information */}
//           <div className="space-y-4">
//             <div
//               className="flex items-center gap-2"
//               style={{ color: "var(--color-text-primary)" }}
//             >
//               <User className="h-4 w-4" />
//               <span className="text-sm font-medium">Personal Information</span>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label
//                   className="block text-sm mb-1"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
//                     style={{ color: "var(--color-text-muted)" }}
//                   />
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name || "janak"}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 transition-all duration-200"
//                     style={{
//                       borderColor: "var(--color-border)",
//                       "--tw-ring-color": "var(--color-primary)",
//                     }}
//                     placeholder="Your full name"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   className="block text-sm mb-1"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
//                     style={{ color: "var(--color-text-muted)" }}
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email || "cicaral862@datoinf.com"}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 transition-all duration-200"
//                     style={{
//                       borderColor: "var(--color-border)",
//                       "--tw-ring-color": "var(--color-primary)",
//                     }}
//                     placeholder="your@email.com"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label
//                 className="block text-sm mb-1"
//                 style={{ color: "var(--color-text-secondary)" }}
//               >
//                 Phone Number
//               </label>
//               <div className="flex gap-2">
//                 <div className="relative w-24">
//                   <Phone
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
//                     style={{ color: "var(--color-text-muted)" }}
//                   />
//                   <input
//                     type="text"
//                     name="phone_code"
//                     value={form.phone_code}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3 py-2 border rounded-lg"
//                     style={{ borderColor: "var(--color-border)" }}
//                     required
//                   />
//                 </div>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={form.phone || "9876543210"}
//                   onChange={handleChange}
//                   className="flex-1 py-2 px-3 border rounded-lg focus:ring-2 transition-all duration-200"
//                   style={{
//                     borderColor: "var(--color-border)",
//                     "--tw-ring-color": "var(--color-primary)",
//                   }}
//                   placeholder="Phone number"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Address Information */}
//           <div
//             className="space-y-4 pt-4 border-t"
//             style={{ borderColor: "var(--color-border)" }}
//           >
//             <div
//               className="flex items-center gap-2"
//               style={{ color: "var(--color-text-primary)" }}
//             >
//               <MapPin className="h-4 w-4" />
//               <span className="text-sm font-medium">Address Information</span>
//             </div>

//             <div>
//               <label
//                 className="block text-sm mb-1"
//                 style={{ color: "var(--color-text-secondary)" }}
//               >
//                 Shipping Address
//               </label>
//               <div className="relative">
//                 <Home
//                   className="absolute left-3 top-3 h-4 w-4"
//                   style={{ color: "var(--color-text-muted)" }}
//                 />
//                 <textarea
//                   name="shipping_address"
//                   value={form.shipping_address || "221B Baker Street, London"}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 transition-all duration-200"
//                   style={{
//                     borderColor: "var(--color-border)",
//                     "--tw-ring-color": "var(--color-primary)",
//                   }}
//                   rows="3"
//                   placeholder="Your complete shipping address"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label
//                   className="block text-sm mb-1"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   Country
//                 </label>
//                 <select
//                   name="country"
//                   value={form.country}
//                   onChange={handleChange}
//                   className="w-full py-2 px-3 border rounded-lg focus:ring-2 transition-all duration-200"
//                   style={{
//                     borderColor: "var(--color-border)",
//                     "--tw-ring-color": "var(--color-primary)",
//                   }}
//                 >
//                   <option value="India">India</option>
//                 </select>
//               </div>

//               <div>
//                 <label
//                   className="block text-sm mb-1"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   State
//                 </label>
//                 <select
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   className="w-full py-2 px-3 border rounded-lg focus:ring-2 transition-all duration-200"
//                   style={{
//                     borderColor: "var(--color-border)",
//                     "--tw-ring-color": "var(--color-primary)",
//                   }}
//                   required
//                 >
//                   <option value="">Select State</option>
//                   {stateOptions.map((s) => (
//                     <option key={s.isoCode} value={s.name}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label
//                   className="block text-sm mb-1"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   City
//                 </label>
//                 <select
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   className="w-full py-2 px-3 border rounded-lg focus:ring-2 transition-all duration-200"
//                   style={{
//                     borderColor: "var(--color-border)",
//                     "--tw-ring-color": "var(--color-primary)",
//                   }}
//                   required
//                 >
//                   <option value="">Select City</option>
//                   {cityOptions.map((c) => (
//                     <option key={c.name} value={c.name}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label
//                   className="block text-sm mb-1"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   Pincode (6 digits)
//                 </label>
//                 <input
//                   type="number"
//                   name="pincode"
//                   value={form.pincode}
//                   onChange={handleChange}
//                   maxLength="6"
//                   pattern="\d{6}"
//                   className="w-full py-2 px-3 border rounded-lg focus:ring-2 transition-all duration-200"
//                   style={{
//                     borderColor: "var(--color-border)",
//                     "--tw-ring-color": "var(--color-primary)",
//                   }}
//                   placeholder="Enter 6-digit pincode"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Shipping & Payment */}
//           <div
//             className="space-y-4 pt-4 border-t"
//             style={{ borderColor: "var(--color-border)" }}
//           >
//             <div>
//               <label
//                 className="block text-sm font-medium mb-2"
//                 style={{ color: "var(--color-text-secondary)" }}
//               >
//                 Order Notes (Optional)
//               </label>
//               <textarea
//                 name="notes"
//                 value={form.notes}
//                 onChange={handleChange}
//                 className="w-full py-2 px-3 border rounded-lg focus:ring-2 transition-all duration-200"
//                 style={{
//                   borderColor: "var(--color-border)",
//                   "--tw-ring-color": "var(--color-primary)",
//                 }}
//                 rows="3"
//                 placeholder="e.g., Please deliver between 10AM - 6PM, special instructions, etc."
//               />
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-4 mt-8 lg:mt-0">
//           <div
//             className="shadow-sm border p-4 sm:p-6 space-y-4 sticky top-4 rounded-lg"
//             style={{
//               backgroundColor: "var(--color-surface)",
//               borderColor: "var(--color-border)",
//             }}
//           >
//             <h2
//               className="text-xl font-semibold mb-3"
//               style={{ color: "var(--color-text-primary)" }}
//             >
//               Order Summary
//             </h2>
//             <div className="space-y-4">
//               {/* Items Table - Desktop */}
//               <table
//                 className="hidden md:table w-full text-sm"
//                 style={{ color: "var(--color-text-secondary)" }}
//               >
//                 <thead>
//                   <tr
//                     className="border-b"
//                     style={{ borderColor: "var(--color-border)" }}
//                   >
//                     <th className="text-left py-2">Image</th>
//                     <th className="text-left py-2">Item</th>
//                     <th className="text-right py-2">Qty</th>
//                     <th className="text-right py-2">Price</th>
//                     <th className="text-right py-2">Discount</th>
//                     <th className="text-right py-2">GST %</th>
//                     <th className="text-right py-2">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {checkedOrder.items.map((item) => (
//                     <tr
//                       key={item.product_id}
//                       className="border-b"
//                       style={{ borderColor: "var(--color-border-light)" }}
//                     >
//                       {/* Product Image */}
//                       <td>
//                         <img
//                           src={`${apiUrl}/image/product/${item.images[0]}`}
//                           alt={item.name}
//                           className="p-2 w-15 aspect-[1/1] object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       </td>

//                       {/* Product Name */}
//                       <td className="py-2">{item.name}</td>

//                       {/* Quantity */}
//                       <td className="text-right py-2">{item.quantity}</td>

//                       {/* Price */}
//                       <td className="text-right py-2">
//                         ₹{item.price.toFixed(2)}
//                       </td>

//                       {/* Discount */}
//                       <td className="text-right py-2">
//                         {item.is_discount ? (
//                           item.discount && item.discount > 0 ? (
//                             <span
//                               style={{ color: "var(--color-text-primary)" }}
//                             >
//                               -₹{item.discount.toFixed(2)}
//                               {item.discount_percent
//                                 ? ` (${item.discount_percent.toFixed(0)}%)`
//                                 : ""}
//                             </span>
//                           ) : (
//                             "₹0.00"
//                           )
//                         ) : (
//                           <span style={{ color: "var(--color-text-primary)" }}>
//                             Not Eligible
//                           </span>
//                         )}
//                       </td>

//                       {/* GST */}
//                       <td className="text-right py-2">
//                         {item.gst_rate}% (₹{item.gst_amount.toFixed(2)})
//                       </td>

//                       {/* Total */}
//                       <td className="text-right py-2">
//                         ₹{item.total.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Items List - Mobile */}
//               <ul className="md:hidden space-y-3">
//                 {checkedOrder.items.map((item) => (
//                   <li
//                     key={item.product_id}
//                     className="border rounded-lg p-3"
//                     style={{
//                       borderColor: "var(--color-border)",
//                       backgroundColor: "var(--color-bg-alt)",
//                     }}
//                   >
//                     <div className="flex gap-3">
//                       <img
//                         src={`${apiUrl}/image/product/${item.images[0]}`}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h4
//                           className="font-medium text-sm line-clamp-2 mb-2"
//                           style={{ color: "var(--color-text-primary)" }}
//                         >
//                           {item.name}
//                         </h4>
//                         <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
//                           <div style={{ color: "var(--color-text-muted)" }}>
//                             Qty:{" "}
//                             <span
//                               style={{ color: "var(--color-text-primary)" }}
//                               className="font-medium"
//                             >
//                               {item.quantity}
//                             </span>
//                           </div>
//                           <div style={{ color: "var(--color-text-muted)" }}>
//                             Price:{" "}
//                             <span
//                               style={{ color: "var(--color-text-primary)" }}
//                               className="font-medium"
//                             >
//                               ₹{item.price.toFixed(2)}
//                             </span>
//                           </div>
//                           <div style={{ color: "var(--color-text-muted)" }}>
//                             GST:{" "}
//                             <span
//                               style={{ color: "var(--color-text-primary)" }}
//                               className="font-medium"
//                             >
//                               {item.gst_rate}%
//                             </span>
//                           </div>
//                           {item.is_discount && item.discount > 0 && (
//                             <div style={{ color: "#059669" }}>
//                               Discount:{" "}
//                               <span className="font-medium">
//                                 -₹{item.discount.toFixed(2)}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                         <div
//                           className="mt-2 pt-2 border-t flex justify-between items-center"
//                           style={{ borderColor: "var(--color-border)" }}
//                         >
//                           <span
//                             className="text-xs"
//                             style={{ color: "var(--color-text-muted)" }}
//                           >
//                             Total:
//                           </span>
//                           <span
//                             className="font-bold"
//                             style={{ color: "var(--color-primary)" }}
//                           >
//                             ₹{item.total.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>

//               {/* Totals Table */}
//               <table
//                 className="w-full text-sm"
//                 style={{ color: "var(--color-text-secondary)" }}
//               >
//                 <tbody>
//                   <tr>
//                     <td className="py-1">Subtotal</td>
//                     <td className="text-right py-1">
//                       ₹{totals.subtotal.toFixed(2)}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="py-1">GST Included</td>
//                     <td className="text-right py-1">
//                       ₹{totals.gst.toFixed(2)}
//                     </td>
//                   </tr>

//                   {checkedOrder.discount_type && (
//                     <>
//                       <tr>
//                         <td className="py-1">Discount Type</td>
//                         <td className="text-right py-1 capitalize">
//                           {checkedOrder.discount_type}
//                         </td>
//                       </tr>

//                       {checkedOrder.coupon_code && (
//                         <tr>
//                           <td className="py-1">Coupon Code</td>
//                           <td className="text-right py-1 capitalize">
//                             {checkedOrder.coupon_code}
//                           </td>
//                         </tr>
//                       )}

//                       <tr>
//                         <td
//                           className="py-1"
//                           style={{ color: "var(--color-text-primary)" }}
//                         >
//                           Total Discount
//                         </td>
//                         <td
//                           className="text-right py-1"
//                           style={{ color: "var(--color-text-primary)" }}
//                         >
//                           -₹
//                           {checkedOrder.discount_value}
//                         </td>
//                       </tr>
//                     </>
//                   )}
//                   <tr
//                     className="border-t font-bold"
//                     style={{
//                       borderColor: "var(--color-border)",
//                       color: "var(--color-text-primary)",
//                     }}
//                   >
//                     <td className="py-2">Final Amount</td>
//                     <td className="text-right py-2">
//                       ₹{totals.finalAmount.toFixed(2)}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div
//               className="pt-4 border-t text-sm"
//               style={{
//                 borderColor: "var(--color-border)",
//                 color: "var(--color-text-muted)",
//               }}
//             >
//               <div className="flex items-center justify-center gap-4">
//                 <div className="flex items-center gap-1">
//                   <Shield size={14} /> Secure Payment
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Truck size={14} /> Fast Delivery
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <CreditCard size={14} /> Easy Refunds
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={handlePlaceOrder}
//               className="w-full py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg shadow-sm mt-4 flex items-center justify-center gap-2"
//               style={{
//                 backgroundColor: "var(--color-primary)",
//                 color: "var(--color-text-on-primary)",
//               }}
//             >
//               {loading ? (
//                 <>
//                   <div
//                     className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent"
//                     style={{ borderColor: "var(--color-text-on-primary)" }}
//                   ></div>
//                   Processing...
//                 </>
//               ) : (
//                 `Place Order - ₹${totals.finalAmount.toFixed(2)}`
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
