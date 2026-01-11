import React from "react";
import {
  Truck,
  Clock,
  CreditCard,
  PackageCheck,
  AlertTriangle,
} from "lucide-react";

const ShippingPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const policySections = [
    {
      icon: Clock,
      title: "Shipping Processing Time",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "1.625" }}>
            All orders are processed within <strong>1-2 business days</strong>{" "}
            (Monday–Friday).
          </p>
          <p style={{ lineHeight: "1.625" }}>
            Orders placed on weekends or public holidays will begin processing
            on the next business day. During peak periods or high order volumes,
            slight delays may occur — we appreciate your understanding.
          </p>
        </>
      ),
    },
    {
      icon: Truck,
      title: "Shipping Rates & Delivery Estimates",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            Shipping charges are calculated based on weight, dimensions, and
            delivery location, and will be clearly displayed at checkout.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Standard Shipping:</strong> 3–5 business days
            </li>
            <li>
              <strong>Express Shipping:</strong> 1–2 business days (available on
              select pin codes)
            </li>
          </ul>
          <p style={{ lineHeight: "1.625", color: "var(--color-text-muted)" }}>
            * Delivery timelines are estimates. Occasional delays due to
            weather, logistics partners, or unforeseen circumstances may occur.
          </p>
        </>
      ),
    },
    {
      icon: PackageCheck,
      title: "Shipment Confirmation & Order Tracking",
      content: (
        <p style={{ lineHeight: "1.625" }}>
          Once your order ships, you’ll receive a{" "}
          <strong>Shipment Confirmation email</strong> containing your tracking
          number(s). The tracking link becomes active within{" "}
          <strong>24 hours</strong> of dispatch. You can track your package
          directly from your account dashboard as well.
        </p>
      ),
    },
    {
      icon: CreditCard,
      title: "Customs, Duties and Taxes",
      content: (
        <p style={{ lineHeight: "1.625" }}>
          IMD Hardware is not responsible for any customs duties, import taxes,
          or additional fees applied by your country. All such charges are the
          sole responsibility of the customer and must be paid upon delivery or
          as required by local authorities.
        </p>
      ),
    },
    {
      icon: AlertTriangle,
      title: "Damages & Lost Shipments",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            IMD Hardware carefully packs every order, but we are not liable for
            damage or loss that occurs during transit.
          </p>
          <p style={{ lineHeight: "1.625" }}>
            If your package arrives damaged:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Take clear photos of the damaged packaging and items</li>
            <li>Contact the shipping carrier immediately to file a claim</li>
            <li>
              Retain all original packaging materials until the claim is
              resolved
            </li>
          </ul>
          <p className="mt-4" style={{ lineHeight: "1.625" }}>
            We’re happy to assist you in coordinating with the carrier whenever
            possible.
          </p>
        </>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="mb-4"
            style={{
              fontSize: "var(--text-4xl)",
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-bold)",
            }}
          >
            Shipping Policy
          </h1>
          <div
            className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
            }}
          >
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-12">
          {policySections.map(({ icon: Icon, title, content }, index) => (
            <section
              key={index}
              className="p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border-light)",
              }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                  }}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h2
                    className="mb-5"
                    style={{
                      fontSize: "var(--text-2xl)",
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-text-primary)",
                      fontWeight: "var(--font-bold)",
                    }}
                  >
                    {index + 1}. {title}
                  </h2>
                  <div
                    className="space-y-4"
                    style={{
                      fontSize: "var(--text-base)",
                      color: "var(--color-text-secondary)",
                      lineHeight: "1.625",
                    }}
                  >
                    {content}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            border: "1px dashed var(--color-border-light)",
          }}
        >
          <p
            className="mb-4"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-medium)",
            }}
          >
            Need help with your shipment?
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Contact our support team at{" "}
            <a
              href="mailto:imd@imdhardware.com"
              className="hover:underline transition"
              style={{
                color: "var(--color-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              imd@imdhardware.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+919484555666"
              className="hover:underline transition"
              style={{
                color: "var(--color-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              +91 9484555666
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
