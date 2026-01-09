import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Loader2,
  Gift,
  Star,
  DollarSign,
  Code,
  Banknote,
  Smartphone,
} from "lucide-react";
import BackButton from "../../../../components/BackButton";
import Loading from "../../../../components/Loading";

const RewardsClaimForm = ({ rewardId: propRewardId }) => {
  const { rewardId: paramRewardId } = useParams();
  const actualRewardId = propRewardId || paramRewardId;
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_SERVER_API_URL;
  const token = Cookies.get("auth_token");

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rewardDetails, setRewardDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [formData, setFormData] = useState({
    upi_id: "",
    account_holder_name: "",
    bank_name: "",
    bank_IFC_code: "",
    account_number: "",
  });

  useEffect(() => {
    if (!actualRewardId || !token) {
      setFetchLoading(false);
      setError("Invalid reward or not logged in");
      return;
    }

    const fetchReward = async () => {
      try {
        setFetchLoading(true);
        const res = await fetch(
          `${apiUrl}/api/v1/reward/get/by/${actualRewardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load reward");

        const data = await res.json();
        if (data.status) {
          setRewardDetails(data.reward);
        } else {
          setError(data.message || "Reward not found");
        }
      } catch (err) {
        setError("Unable to load reward details");
        console.error(err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchReward();
  }, [actualRewardId, token, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      let payment_info = {};
      if (paymentMethod === "UPI") {
        if (!formData.upi_id.trim()) throw new Error("UPI ID is required");
        payment_info = { upi_id: formData.upi_id.trim() };
      } else {
        const required = [
          "account_holder_name",
          "bank_name",
          "bank_IFC_code",
          "account_number",
        ];
        for (const field of required) {
          if (!formData[field].trim())
            throw new Error("All bank details are required");
        }
        payment_info = {
          account_holder_name: formData.account_holder_name.trim(),
          bank_name: formData.bank_name.trim(),
          bank_IFC_code: formData.bank_IFC_code.trim().toUpperCase(),
          account_number: formData.account_number.trim(),
        };
      }

      const res = await fetch(
        `${apiUrl}/api/v1/reward-payment-request/user/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reward_id: parseInt(actualRewardId),
            payment_method: paymentMethod,
            payment_info,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.status)
        throw new Error(data.message || "Claim failed");

      setSuccess("Your reward claim has been submitted successfully!");
      setFormData({
        upi_id: "",
        account_holder_name: "",
        bank_name: "",
        bank_IFC_code: "",
        account_number: "",
      });

      setTimeout(() => navigate("/rewards"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <Loading />;

  if (error && !rewardDetails) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center">
        <AlertCircle
          className="w-12 h-12 mx-auto mb-4"
          style={{ color: "var(--color-danger)" }}
        />
        <h2
          className="mb-2"
          style={{
            fontSize: "var(--text-xl)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-semibold)",
          }}
        >
          Something went wrong
        </h2>
        <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
          {error}
        </p>
        <button
          onClick={() => navigate("/rewards")}
          className="px-6 py-2.5 rounded-lg transition hover:opacity-90"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-on-primary)",
            fontWeight: "var(--font-medium)",
          }}
        >
          Back to Rewards
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <BackButton />
        <h1
          className="mt-4"
          style={{
            fontSize: "var(--text-3xl)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-bold)",
          }}
        >
          Claim Your Reward
        </h1>
      </div>

      {/* Reward Summary Card */}
      {rewardDetails && (
        <div
          className="p-5 rounded-xl border mb-8"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Gift
              className="w-7 h-7"
              style={{ color: "var(--color-primary)" }}
            />
            <h2
              style={{
                fontSize: "var(--text-xl)",
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              {rewardDetails.title}
            </h2>
          </div>

          <p
            className="mb-5"
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-base)",
            }}
          >
            {rewardDetails.description}
          </p>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div
              className="py-3 px-4 rounded-lg"
              style={{ backgroundColor: "var(--color-surface-alt)" }}
            >
              <Code
                className="w-5 h-5 mx-auto mb-1"
                style={{ color: "var(--color-text-muted)" }}
              />
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "var(--text-xs)",
                }}
              >
                Code
              </p>
              <code
                className="font-mono"
                style={{
                  color: "var(--color-primary)",
                  fontWeight: "var(--font-medium)",
                  fontSize: "var(--text-sm)",
                }}
              >
                {rewardDetails.reward_code}
              </code>
            </div>
            <div
              className="py-3 px-4 rounded-lg"
              style={{ backgroundColor: "var(--color-surface-alt)" }}
            >
              <Star
                className="w-5 h-5 mx-auto mb-1"
                style={{ color: "var(--color-secondary)" }}
              />
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "var(--text-xs)",
                }}
              >
                Points
              </p>
              <p
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-semibold)",
                }}
              >
                {rewardDetails.point}
              </p>
            </div>
            <div
              className="py-3 px-4 rounded-lg"
              style={{ backgroundColor: "var(--color-surface-alt)" }}
            >
              <Banknote
                className="w-5 h-5 mx-auto mb-1"
                style={{ color: "var(--color-success)" }}
              />
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "var(--text-xs)",
                }}
              >
                Value
              </p>
              <p
                style={{
                  fontSize: "var(--text-lg)",
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-bold)",
                }}
              >
                ₹{rewardDetails.money}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {success && (
        <div
          className="p-5 rounded-xl border mb-6 flex items-center gap-3"
          style={{
            backgroundColor: "var(--color-success-light)",
            borderColor: "var(--color-success)",
          }}
        >
          <CheckCircle
            className="w-6 h-6 flex-shrink-0"
            style={{ color: "var(--color-success)" }}
          />
          <div>
            <p
              style={{
                color: "var(--color-success)",
                fontWeight: "var(--font-medium)",
              }}
            >
              {success}
            </p>
            <p
              className="mt-1"
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "var(--text-sm)",
              }}
            >
              Redirecting to rewards...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          className="p-5 rounded-xl border mb-6 flex items-center gap-3"
          style={{
            backgroundColor: "var(--color-danger-light)",
            borderColor: "var(--color-danger)",
          }}
        >
          <AlertCircle
            className="w-6 h-6 flex-shrink-0"
            style={{ color: "var(--color-danger)" }}
          />
          <p
            style={{
              color: "var(--color-danger)",
              fontWeight: "var(--font-medium)",
            }}
          >
            {error}
          </p>
        </div>
      )}

      {/* Claim Form */}
      {!success && rewardDetails && (
        <div
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <h3
            className="mb-5"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-semibold)",
            }}
          >
            Payment Details
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method */}
            <div>
              <p
                className="mb-3"
                style={{
                  color: "var(--color-text-secondary)",
                  fontWeight: "var(--font-medium)",
                }}
              >
                Choose payout method
              </p>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <Smartphone
                    className="w-5 h-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span style={{ color: "var(--color-text-primary)" }}>
                    UPI
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="BankTransfer"
                    checked={paymentMethod === "BankTransfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <Banknote
                    className="w-5 h-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span style={{ color: "var(--color-text-primary)" }}>
                    Bank Transfer
                  </span>
                </label>
              </div>
            </div>

            {/* UPI Input */}
            {paymentMethod === "UPI" && (
              <div>
                <label
                  className="block mb-2"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontWeight: "var(--font-medium)",
                  }}
                >
                  UPI ID <span style={{ color: "var(--color-danger)" }}>*</span>
                </label>
                <input
                  type="text"
                  name="upi_id"
                  value={formData.upi_id}
                  onChange={handleInputChange}
                  placeholder="yourname@upi"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border-light)",
                    color: "var(--color-text-primary)",
                    "--tw-ring-color": "var(--color-primary)",
                  }}
                  required
                />
              </div>
            )}

            {/* Bank Details */}
            {paymentMethod === "BankTransfer" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    Account Holder Name{" "}
                    <span style={{ color: "var(--color-danger)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="account_holder_name"
                    value={formData.account_holder_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border-light)",
                      color: "var(--color-text-primary)",
                      "--tw-ring-color": "var(--color-primary)",
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    Bank Name{" "}
                    <span style={{ color: "var(--color-danger)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border-light)",
                      color: "var(--color-text-primary)",
                      "--tw-ring-color": "var(--color-primary)",
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    IFSC Code{" "}
                    <span style={{ color: "var(--color-danger)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="bank_IFC_code"
                    value={formData.bank_IFC_code}
                    onChange={handleInputChange}
                    placeholder="e.g. HDFC0000123"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition uppercase"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border-light)",
                      color: "var(--color-text-primary)",
                      "--tw-ring-color": "var(--color-primary)",
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    Account Number{" "}
                    <span style={{ color: "var(--color-danger)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="account_number"
                    value={formData.account_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border-light)",
                      color: "var(--color-text-primary)",
                      "--tw-ring-color": "var(--color-primary)",
                    }}
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl transition hover:opacity-95 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-on-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Claim ₹{rewardDetails.money} Reward</>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Footer Note */}
      {!success && rewardDetails && (
        <p
          className="text-center mt-6"
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--text-sm)",
          }}
        >
          Your request will be processed within 3-5 business days after
          verification.
        </p>
      )}
    </div>
  );
};

export default RewardsClaimForm;
