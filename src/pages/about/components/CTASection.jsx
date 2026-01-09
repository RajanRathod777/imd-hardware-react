import { Link } from "react-router";
import { ShoppingCart, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Primary Background with Gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-primary)" }}
      />

      {/* Subtle Decorative Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--color-primary-light)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--color-primary-dark)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h2
          className="mb-8 tracking-tight"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-5xl)",
            color: "var(--color-text-on-primary)",
            fontWeight: "var(--font-black)",
            lineHeight: "1.25",
          }}
        >
          <span className="md:hidden">Ready to Start Your Project?</span>
          <span
            className="hidden md:inline"
            style={{ fontSize: "var(--text-6xl)" }}
          >
            Ready to Start Your Project?
          </span>
        </h2>

        {/* Subheadline */}
        <p
          className="mx-auto mb-12 max-w-3xl opacity-95"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xl)",
            color: "var(--color-text-on-primary)",
            lineHeight: "var(--leading-relaxed)",
          }}
        >
          Join thousands of satisfied customers who trust IMD Hardware for
          premium quality, reliable delivery, and exceptional service.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Primary Button - Browse Catalog */}
          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{
              backgroundColor: "var(--color-surface)",
              color: "var(--color-primary)",
              fontWeight: "var(--font-bold)",
              fontSize: "var(--text-lg)",
            }}
          >
            <ShoppingCart className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            Browse Catalog
          </Link>

          {/* Secondary Button - Contact Sales */}
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border-4 transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{
              borderColor: "var(--color-text-on-primary)",
              color: "var(--color-text-on-primary)",
              fontWeight: "var(--font-bold)",
              fontSize: "var(--text-lg)",
            }}
          >
            <Phone className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
            Contact Sales
          </Link>
        </div>

        {/* Trust Accent */}
        <p
          className="mt-12 uppercase tracking-wider opacity-80"
          style={{
            fontSize: "var(--text-sm)",
            letterSpacing: "var(--tracking-wide)",
            color: "var(--color-text-on-primary)",
            fontWeight: "var(--font-semibold)",
          }}
        >
          Trusted by Professionals Across Gujarat Since 2010
        </p>
      </div>
    </section>
  );
};

export default CTASection;
