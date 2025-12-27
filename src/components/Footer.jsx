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

const activeClass = "text-[var(--color-primary)]";
const inactiveClass =
  "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ✅ Trust Badges */}
      <div className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
          {[
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
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="rounded-lg flex flex-col items-center justify-center p-6 border"
              style={{ borderColor: "var(--color-border-light)" }}
            >
              <Icon className="w-8 h-8 mb-3 text-[var(--color-primary)]" />
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-sm text-center text-[var(--color-text-secondary)]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Main Footer */}
      <div className="m-1 px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-2">IMD Hardware</h3>
            <p className="text-sm opacity-60">Your Trusted Hardware Partner</p>
            <p className="text-sm mt-4 text-[var(--color-text-secondary)]">
              Providing high-quality hardware solutions with fast delivery and
              excellent customer service across Gujarat since 2010.
            </p>

            <div className="flex gap-3 mt-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg border hover:shadow-md transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/about", label: "About Us" },
                { to: "/rewards", label: "Rewards" },
                { to: "/contact", label: "Contact Us" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    end
                    className={({ isActive }) =>
                      `text-sm ${isActive ? activeClass : inactiveClass}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Policies</h4>
            <ul className="space-y-3">
              {[
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms-conditions", label: "Terms of Service" },
                { to: "/return-policy", label: "Return Policy" },
                { to: "/shipping-policy", label: "Shipping Policy" },
                { to: "/cancellation-policy", label: "Cancellation Policy" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `text-sm ${isActive ? activeClass : inactiveClass}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
            <h4 className="text-lg font-semibold mb-6 text-[var(--color-text-primary)]">
              Contact Us
            </h4>

            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
              <p>
                Near Vaikunthdham Temple, Himatnagar Shamlaji Road, Sabarkantha,
                Gujarat - 383001
              </p>
            </div>

            <div className="flex gap-3">
              <Phone className="w-4 h-4 text-[var(--color-primary)]" />
              <a href="tel:+919427893121" className="hover:underline">
                +91 9427893121
              </a>
            </div>

            <div className="flex gap-3">
              <Mail className="w-4 h-4 text-[var(--color-primary)]" />
              <a href="mailto:imd@imdhardware.com" className="hover:underline">
                imd@imdhardware.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} IMD Hardware. All rights reserved.
          </p>
        </div>

        <span className="text-xs text-[var(--color-text-secondary)]">
          GSTIN: 24BPYPR7738J1ZU
        </span>
      </div>
    </footer>
  );
};

export default Footer;
