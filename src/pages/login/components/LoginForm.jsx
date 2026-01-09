import { useState } from "react";
import Cookies from "js-cookie";
import { Mail, Lock, User, Loader, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function LoginForm() {
  const apiUrl = import.meta.env.VITE_SERVER_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("info");

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 6000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    showMessage(null);

    try {
      const res = await fetch(`${apiUrl}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status) {
        showMessage("Login successful!", "success");
        console.log("Login complete data = ", data);

        Cookies.set("auth_token", data.token, { expires: 7, secure: true });
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      } else {
        showMessage(data.message || "Login failed", "error");
      }
    } catch (err) {
      showMessage("Server error. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-2 flex  justify-center"
      style={{
        fontFamily: "var(--font-primary)",
      }}
    >
      <div
        className="max-w-md w-full shadow-sm border rounded-lg"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        {/* Header */}
        <div
          className="p-6 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: "var(--color-primary-soft)" }}
            >
              <User
                className="h-5 w-5"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "var(--text-xl)",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "var(--font-semibold)",
                }}
              >
                Login
              </h1>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Welcome back to your account
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className="block mb-1"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-primary)",
                }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text-primary)",
                    borderColor: "var(--color-border)",
                    "--tw-ring-color": "var(--color-primary)",
                    "--tw-border-opacity": "1",
                  }}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                className="block mb-1"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-primary)",
                }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  type="password"
                  name="password"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text-primary)",
                    borderColor: "var(--color-border)",
                    "--tw-ring-color": "var(--color-primary)",
                  }}
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="text-right">
              <Link
                to="/resetpassword"
                className="hover:underline"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-primary)",
                }}
              >
                Reset Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-on-primary)",
              }}
            >
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Login"}
            </button>
          </form>

          {message && (
            <div
              className="mt-4 p-3 flex items-center gap-2 border rounded-lg"
              style={{
                fontSize: "var(--text-sm)",
                backgroundColor:
                  messageType === "success"
                    ? "var(--color-success-light)"
                    : "var(--color-danger-light)",
                borderColor:
                  messageType === "success"
                    ? "var(--color-success)"
                    : "var(--color-danger)",
                color:
                  messageType === "success"
                    ? "var(--color-success)"
                    : "var(--color-danger)",
              }}
            >
              {messageType === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <div
                  className="h-4 w-4 border flex items-center justify-center"
                  style={{ borderColor: "currentColor" }}
                >
                  <span style={{ fontSize: "var(--text-xs)" }}>!</span>
                </div>
              )}
              {message}
            </div>
          )}
        </div>

        <div
          className="p-4 border-t text-center"
          style={{
            fontSize: "var(--text-xs)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="hover:underline"
            style={{
              color: "var(--color-primary)",
              fontWeight: "var(--font-medium)",
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
