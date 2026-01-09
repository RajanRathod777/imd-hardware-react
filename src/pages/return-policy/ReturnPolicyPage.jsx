import React from "react";
import { Package, RefreshCw, Shield, Mail } from "lucide-react";

const ReturnPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const policySections = [
    {
      icon: Package,
      title: "Returns",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            We offer a <strong>30-day return policy</strong> — you have 30 days
            from the date of delivery to request a return.
          </p>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            To be eligible, the item must be:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Unused and in the same condition as received</li>
            <li>In original packaging with all tags attached</li>
            <li>Accompanied by the original receipt or proof of purchase</li>
          </ul>
          <p style={{ lineHeight: "var(--leading-relaxed)" }}>
            To initiate a return, please email us at{" "}
            <a
              href="mailto:imd@imdhardware.com"
              className="hover:underline transition"
              style={{
                color: "var(--color-primary)",
                fontWeight: "var(--font-medium)",
              }}
            >
              imd@imdhardware.com
            </a>
            . Once approved, we'll provide a return shipping label and clear
            instructions.
            <br />
            <strong className="text-[var(--color-danger)]">
              Note: Items sent without prior approval will not be accepted.
            </strong>
          </p>
        </>
      ),
    },
    {
      icon: Shield,
      title: "Damages and Issues",
      content: (
        <p style={{ lineHeight: "var(--leading-relaxed)" }}>
          Please inspect your order immediately upon arrival. If you receive a
          defective, damaged, or incorrect item, contact us{" "}
          <strong>within 48 hours</strong> of delivery so we can resolve it
          quickly — whether through replacement or full refund.
        </p>
      ),
    },
    {
      icon: RefreshCw,
      title: "Exchanges",
      content: (
        <p style={{ lineHeight: "var(--leading-relaxed)" }}>
          We currently do not offer direct exchanges. The fastest solution is to
          return your original item for a refund and place a new order for the
          desired product. This ensures you secure the correct item without
          delay.
        </p>
      ),
    },
    {
      icon: Mail,
      title: "Refunds",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            Once we receive and inspect your returned item, we’ll notify you via
            email about the approval status.
          </p>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            If approved, the refund will be processed to your original payment
            method <strong>within 3-7 business days</strong>.
          </p>
          <p style={{ lineHeight: "var(--leading-relaxed)" }}>
            Please note: Processing time by your bank or card issuer may add a
            few extra days before the refund appears in your account.
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
            Return & Refund Policy
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

        {/* Policy Sections with Icons */}
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
                      lineHeight: "var(--leading-relaxed)",
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
            Questions about returns or refunds?
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            We're here to help. Reach out to us at{" "}
            <a
              href="mailto:imd@imdhardware.com"
              className="hover:underline transition"
              style={{
                color: "var(--color-primary)",
                fontWeight: "var(--font-semibold)",
                fontSize: "var(--text-base)",
              }}
            >
              imd@imdhardware.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+919427893121"
              className="hover:underline transition"
              style={{
                color: "var(--color-primary)",
                fontWeight: "var(--font-semibold)",
                fontSize: "var(--text-base)",
              }}
            >
              +91 9427893121
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
