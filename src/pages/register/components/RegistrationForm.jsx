import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Mail,
  Phone,
  User,
  Lock,
  MapPin,
  Home,
  Camera,
  CheckCircle,
  RefreshCw,
  Loader,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { states, cities } from "../../../data/indianStatesCities";

export default function RegistrationPage() {
  const apiUrl = import.meta.env.VITE_SERVER_API_URL;
  const navigate = useNavigate();

  const [stage, setStage] = useState("verify"); // verify | register | done

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneCode: "+91",
    state: "",
    country: "India",
    address: "",
    city: "",
    pincode: "",
    otp: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [token, setToken] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("info");
  const [verified, setVerified] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  // Load all states from local data
  useEffect(() => {
    setStateOptions(states);
  }, []);

  // When state changes, load cities from local data
  useEffect(() => {
    if (!formData.state) {
      setCityOptions([]);
      return;
    }

    const selectedState = states.find((s) => s.name === formData.state);
    if (selectedState) {
      const stateCities = cities[selectedState.isoCode];
      if (Array.isArray(stateCities)) {
        setCityOptions(stateCities);
      } else {
        setCityOptions([]);
      }
    }
  }, [formData.state]);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showMessage("Please select a valid image file", "error");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage("Image size should be less than 5MB", "error");
        return;
      }

      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  // countdown for token validity
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  // resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(
      () => setResendCooldown((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(t);
  }, [resendCooldown]);

  // helper message function
  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 20000);
  };

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate pincode to only allow 6 digits
    if (name === "pincode") {
      // Only allow digits and max 6 characters
      if (value && (!/^\d*$/.test(value) || value.length > 6)) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // send email/phone verification
  const handleVerify = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    showMessage(null);
    try {
      const res = await fetch(`${apiUrl}/api/v1/email-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
        }),
      });
      const data = await res.json();

      if (data.status) {
        setToken(data.token);
        setCountdown(300);
        setResendCooldown(300);
        setVerified(true);
        showMessage(data.message || "OTP sent successfully", "success");
      } else {
        showMessage(data.message || "Verification failed", "error");
      }
    } catch (err) {
      showMessage("Server error. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // resend OTP
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    await handleVerify();
  };

  // final registration
  const handleRegister = async (e) => {
    e && e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }

    if (!token || countdown <= 0) {
      showMessage("Token expired. Please verify again.", "error");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("phone_code", formData.phoneCode.replace("+", ""));
      form.append("phone", formData.phone);
      form.append("state", formData.state);
      form.append("country", formData.country);
      form.append("address", formData.address);
      form.append("city", formData.city);
      form.append("pincode", formData.pincode);
      form.append("otp", formData.otp);
      if (image) form.append("image", image, image.name);

      const res = await fetch(`${apiUrl}/api/v1/registration`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();

      if (data.status) {
        showMessage("Registration successful!", "success");
        Cookies.set("auth_token", data.token, { expires: 7, secure: true });
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        setStage("done");
      } else {
        showMessage(data.message || "Registration failed", "error");
      }
    } catch (err) {
      showMessage("Server error while registering.", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      className="m-2 flex justify-center"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--color-primary)",
      }}
    >
      <div
        className="max-w-md w-full shadow-sm border rounded-lg"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div
          className="p-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: "var(--color-surface-alt)" }}
            >
              <User
                className="h-5 w-5 "
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
                Create Account
              </h1>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Join us in just a few steps
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {verified && (
            <div
              className="mb-4 p-3 border rounded-lg flex items-center justify-between"
              style={{
                backgroundColor: "var(--color-surface-alt)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle
                  className="h-4 w-4"
                  style={{ color: "var(--color-primary)" }}
                />
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Verified
                </span>
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  ({formatTimer(countdown)})
                </span>
              </div>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="disabled:opacity-50 flex items-center gap-1 hover:opacity-80"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-primary)",
                }}
              >
                <RefreshCw className="h-3 w-3" />
                {resendCooldown > 0 ? `${resendCooldown}s` : "Resend"}
              </button>
            </div>
          )}

          <form
            onSubmit={verified ? handleRegister : handleVerify}
            className="space-y-4"
          >
            {/* Contact Info */}
            <div className="space-y-4">
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                <Mail className="h-4 w-4" />
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-medium)",
                  }}
                >
                  Contact Information
                </span>
              </div>

              {/* Email */}
              <div>
                <label
                  className="block mb-1"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
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
                    }}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={verified}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block mb-1"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="relative w-24">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: "var(--color-text-muted)" }}
                    />
                    <input
                      type="text"
                      name="phoneCode"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                        borderColor: "var(--color-border)",
                      }}
                      value={formData.phoneCode}
                      onChange={handleInputChange}
                      disabled={verified}
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    className="flex-1 py-2 px-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-text-primary)",
                      borderColor: "var(--color-border)",
                      "--tw-ring-color": "var(--color-primary)",
                    }}
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={verified}
                  />
                </div>
              </div>

              {!verified && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 text-white rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                  }}
                >
                  {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                  {loading ? "Sending OTP..." : "Send Verification OTP"}
                </button>
              )}
            </div>

            {/* Account + Personal Info */}
            {verified && (
              <>
                {/* Account Details */}
                <div
                  className="space-y-4 pt-4 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    <User className="h-4 w-4" />
                    <span
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-medium)",
                      }}
                    >
                      Account Details
                    </span>
                  </div>

                  <div>
                    <label
                      className="block mb-1"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Username
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                        style={{ color: "var(--color-text-muted)" }}
                      />
                      <input
                        type="text"
                        name="username"
                        className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-200"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text-primary)",
                        }}
                        placeholder="Choose username"
                        value={formData.username}
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
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      OTP Code
                    </label>
                    <input
                      type="text"
                      name="otp"
                      className="w-full py-2 px-2 border rounded-lg transition-all duration-200"
                      style={{
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-1"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="w-full py-2 px-2 border rounded-lg transition-all duration-200"
                      style={{
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-1"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="w-full py-2 px-2 border rounded-lg transition-all duration-200"
                      style={{
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-1"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Profile Image (optional)
                    </label>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mb-4 relative inline-block">
                        <div
                          className="mt-4 w-24 h-24 border overflow-hidden"
                          style={{ borderColor: "var(--color-border)" }}
                        >
                          <img
                            src={imagePreview}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-1 -right-2 p-1 transition-colors"
                          style={{
                            backgroundColor: "var(--color-text-primary)",
                            color: "var(--color-text-on-primary)",
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    {/* File Input */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full py-1 opacity-0 absolute z-10 cursor-pointer"
                        style={{ fontSize: "var(--text-sm)" }}
                        id="profile-image"
                      />
                      <div
                        className="rounded-lg border p-2 text-center transition-colors"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-bg-alt)",
                        }}
                      >
                        <Camera
                          className="h-4 w-4 mx-auto mb-1"
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <span
                          style={{
                            fontSize: "var(--text-sm)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {image ? "Change Image" : "Choose Profile Image"}
                        </span>
                      </div>
                    </div>
                    <p
                      className="mt-1"
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Supported formats: JPG, PNG, JPEG Max size: 5MB
                    </p>
                  </div>
                </div>

                {/* Personal Info */}
                <div
                  className="space-y-4 pt-4 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    <MapPin className="h-4 w-4" />
                    <span
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-medium)",
                      }}
                    >
                      Personal Information
                    </span>
                  </div>

                  <div>
                    <label
                      className="block mb-1"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="w-full py-2.5 px-2 border rounded-lg transition-all duration-200"
                      style={{
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-text-primary)",
                      }}
                      placeholder="Your address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="block mb-1"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="rounded-lg w-full py-2.5 px-2 border"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        <option value="India">India</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block mb-1"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="rounded-lg w-full py-2.5 px-2 border"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text-primary)",
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
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="block mb-1"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        City
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="rounded-lg w-full py-2.5 px-2 border"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        <option value="">Select City</option>
                        {cityOptions.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className="block mb-1"
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        Pincode (6 digits)
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        className="rounded-lg w-full py-2 px-2 border"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text-primary)",
                        }}
                        placeholder="Enter 6-digit pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        maxLength="6"
                        pattern="\d{6}"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 text-white rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 mt-4 hover:opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                  }}
                >
                  {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {loading ? "Registering..." : "Complete Registration"}
                </button>
              </>
            )}
          </form>

          {message && (
            <div
              className="mt-4 p-3 border"
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
          All ready have an account?{" "}
          <Link
            to="/login"
            className="hover:underline"
            style={{
              color: "var(--color-primary)",
              fontWeight: "var(--font-medium)",
            }}
          >
            login
          </Link>
        </div>
      </div>
    </div>
  );
}
