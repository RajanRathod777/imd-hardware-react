import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Cookies from "js-cookie";

const ContactViewer = () => {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 9484555666",
      description: "Mon to Fri from 9am to 6pm",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@imdhardware.com",
      description: "Send us your query anytime!",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Near Vaikunthdham Temple, Himatnagar Shamlaji Road, NH 48",
      description: "Dist.Sabarkantha. Gujarat-383001 , India",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday: 9:00 - 18:00",
      description: "Saturday: 10:00 - 16:00",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        setSubmitStatus("error");
        setSubmitMessage("Please log in to send a message");
        return;
      }

      const apiUrl = import.meta.env.VITE_SERVER_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/contact/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(data.message || "Message sent successfully!");
        setFormData({ subject: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          data.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 20000);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-primary)",
      }}
    >
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Contact Methods */}
              <div className="space-y-4 mb-8">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border-light)",
                    }}
                  >
                    <div
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{
                        backgroundColor: "var(--color-surface-alt)",
                      }}
                    >
                      <method.icon
                        className="h-6 w-6"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="mb-1"
                        style={{
                          color: "var(--color-text-primary)",
                          fontSize: "var(--text-base)",
                          fontWeight: "var(--font-semibold)",
                        }}
                      >
                        {method.title}
                      </h3>
                      <p
                        className="mb-1"
                        style={{
                          color: "var(--color-text-primary)",
                          fontWeight: "var(--font-medium)",
                        }}
                      >
                        {method.details}
                      </p>
                      <p
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
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
                    color: "var(--color-text-primary)",
                    fontSize: "var(--text-lg)",
                    fontWeight: "var(--font-semibold)",
                  }}
                >
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, label: "Facebook" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Instagram, label: "Instagram" },
                    { icon: Linkedin, label: "LinkedIn" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="p-3 rounded-lg transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundColor: "var(--color-surface-alt)",
                        color: "var(--color-primary)",
                      }}
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div
              className="p-8 rounded-xl border"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border-light)",
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface-alt)" }}
                >
                  <MessageCircle
                    className="h-7 w-7"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <h2
                  style={{
                    fontSize: "var(--text-3xl)",
                    fontWeight: "var(--font-bold)",
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                        fontWeight: "var(--font-medium)",
                      }}
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border-light)",
                        color: "var(--color-text-primary)",
                        "--tw-ring-color": "var(--color-primary)",
                      }}
                      placeholder="What is this regarding?"
                    />
                    <p
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                        marginTop: "0.25rem",
                      }}
                    >
                      {formData.subject.length}/100 characters
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-secondary)",
                        fontWeight: "var(--font-medium)",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border-light)",
                        color: "var(--color-text-primary)",
                        "--tw-ring-color": "var(--color-primary)",
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-secondary)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={1000}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 resize-vertical"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border-light)",
                      color: "var(--color-text-primary)",
                      "--tw-ring-color": "var(--color-primary)",
                    }}
                    placeholder="Please describe your inquiry in detail..."
                  />
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {formData.message.length}/1000 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                    fontWeight: "var(--font-semibold)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-transparent border-t-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>

                <p
                  className="text-center"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  By submitting this form, you agree to our{" "}
                  <a
                    href="#"
                    className="underline hover:opacity-80 transition"
                    style={{ color: "var(--color-primary)" }}
                  >
                    privacy policy
                  </a>
                </p>
              </form>

              {/* Success / Error Messages */}
              {submitStatus === "success" && (
                <div
                  className="mt-8 p-5 rounded-lg border flex items-start gap-4"
                  style={{
                    backgroundColor: "var(--color-success-light)",
                    borderColor: "var(--color-success)",
                  }}
                >
                  <CheckCircle
                    className="h-6 w-6 flex-shrink-0 mt-0.5"
                    style={{ color: "var(--color-success)" }}
                  />
                  <div>
                    <p
                      style={{
                        color: "var(--color-success)",
                        fontWeight: "var(--font-semibold)",
                      }}
                    >
                      Message sent successfully!
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      {submitMessage}
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  className="mt-8 p-5 rounded-lg border flex items-start gap-4"
                  style={{
                    backgroundColor: "var(--color-danger-light)",
                    borderColor: "var(--color-danger)",
                  }}
                >
                  <AlertCircle
                    className="h-6 w-6 flex-shrink-0 mt-0.5"
                    style={{ color: "var(--color-danger)" }}
                  />
                  <div>
                    <p
                      style={{
                        color: "var(--color-danger)",
                        fontWeight: "var(--font-semibold)",
                      }}
                    >
                      Failed to send message
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      {submitMessage}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div
        className="border-t py-12"
        style={{
          backgroundColor: "var(--color-bg-alt)",
          borderColor: "var(--color-border-light)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--font-bold)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Visit Our Store
            </h2>
          </div>

          <div
            className="h-96 rounded-xl overflow-hidden shadow-lg"
            style={{ backgroundColor: "var(--color-surface-alt)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.6375157306334!2d72.969495!3d23.5814588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395db9001f0e723b%3A0x2bf46589444fadb9!2sIMD%20Hardware!5e0!3m2!1sen!2sin!4v1763225466726!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {["Parking", "Accessibility", "Services"].map((title, i) => (
              <div key={i} className="text-center">
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "var(--text-lg)",
                    color: "var(--color-text-primary)",
                    fontWeight: "var(--font-semibold)",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  {title === "Parking" &&
                    "Free parking available in adjacent garage"}
                  {title === "Accessibility" &&
                    "Wheelchair accessible with dedicated assistance"}
                  {title === "Services" &&
                    "Personal shopping & product demonstrations"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactViewer;
