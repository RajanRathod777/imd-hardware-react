import {
  Truck,
  Shield,
  Headphones,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const trustBadges = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On orders above ₹999",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      desc: "30-Day Return Policy",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Always here to help",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "100% Secure Transactions",
    },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About Us" },
    { to: "/rewards", label: "Rewards" },
    { to: "/contact", label: "Contact Us" },
  ];

  const policies = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-conditions", label: "Terms of Service" },
    { to: "/return-policy", label: "Return Policy" },
    { to: "/shipping-policy", label: "Shipping Policy" },
    { to: "/cancellation-policy", label: "Cancellation Policy" },
  ];

  const socialIcons = [Facebook, Twitter, Instagram, Linkedin];

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-body)",
        borderColor: "var(--color-border-light)",
      }}
    >
      {/* Trust Badges Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-300 hover:shadow-md"
                style={{
                  backgroundColor: "var(--color-surface-alt)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                <Icon
                  className="w-10 h-10 mb-4"
                  style={{ color: "var(--color-primary)" }}
                />
                <h3
                  className="mb-2"
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
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        className="py-12 px-4 border-t"
        style={{ borderColor: "var(--color-border-light)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3
              className="mb-3"
              style={{
                fontSize: "var(--text-2xl)",
                fontFamily: "var(--font-heading)",
                color: "var(--color-primary)",
                fontWeight: "var(--font-bold)",
              }}
            >
              IMD Hardware
            </h3>
            <p
              className="mb-6"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              Your Trusted Hardware Partner
            </p>
            <p
              className="mb-8"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                lineHeight: "1.625",
              }}
            >
              Providing high-quality hardware solutions with fast delivery and
              excellent customer service across Gujarat since 2010.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Follow us on social media ${i}`}
                  className="p-3 rounded-lg border transition-all duration-300 hover:scale-110 hover:shadow-md"
                  style={{
                    backgroundColor: "var(--color-surface-alt)",
                    borderColor: "var(--color-border-light)",
                    color: "var(--color-primary)",
                  }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map(({ to, label }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    end
                    className="block hover:opacity-80 transition-colors duration-200"
                    style={({ isActive }) => ({
                      fontSize: "var(--text-sm)",
                      color: isActive
                        ? "var(--color-primary)"
                        : "var(--color-text-secondary)",
                      fontWeight: isActive ? "var(--font-medium)" : "normal",
                    })}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              Policies
            </h4>
            <ul className="space-y-4">
              {policies.map(({ to, label }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className="block hover:opacity-80 transition-colors duration-200"
                    style={({ isActive }) => ({
                      fontSize: "var(--text-sm)",
                      color: isActive
                        ? "var(--color-primary)"
                        : "var(--color-text-secondary)",
                      fontWeight: isActive ? "var(--font-medium)" : "normal",
                    })}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              Contact Us
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: "var(--color-primary)" }}
                />
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "1.6",
                  }}
                >
                  Near Vaikunthdham Temple,
                  <br />
                  Himatnagar Shamlaji Road, NH 08,
                  <br />
                  Sabarkantha, Gujarat - 383001, India
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Phone
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "var(--color-primary)" }}
                />
                <a
                  href="tel:+919427893121"
                  className="hover:underline transition"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  +91 9427893121
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "var(--color-primary)" }}
                />
                <a
                  href="mailto:contact@imdhardware.com"
                  className="hover:underline transition"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  contact@imdhardware.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="py-6 px-4 border-t"
        style={{ borderColor: "var(--color-border-light)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="w-4 h-4"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              © {currentYear} IMD Hardware. All rights reserved.
            </p>
          </div>

          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            GSTIN: 24BPYPR7738J1ZU
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
