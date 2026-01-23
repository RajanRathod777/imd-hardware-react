import React from "react";
import {
  XCircle,
  RefreshCw,
  Clock,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { cancellationPolicyMetadata } from "../../seo/cancellationPolicySeo";

const CancellationPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const policySections = [
    {
      icon: XCircle,
      title: "Order Cancellations",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            You can cancel your order <strong>free of charge</strong> at any
            time <strong>before it has been shipped</strong>.
          </p>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            To request a cancellation, please contact us immediately through one
            of the following channels:
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:contact@imdhardware.com"
                className="hover:underline transition"
                style={{
                  color: "var(--color-primary)",
                  fontWeight: "var(--font-semibold)",
                }}
              >
                contact@imdhardware.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
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
            </li>
          </ul>
          <p style={{ lineHeight: "var(--leading-relaxed)" }}>
            Once your order has been dispatched, cancellation is no longer
            possible. In that case, you may return the product upon receipt as
            per our{" "}
            <a
              href="/return-policy"
              className="hover:underline transition"
              style={{
                color: "var(--color-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              Return & Refund Policy
            </a>
            .
          </p>
        </>
      ),
    },
    {
      icon: RefreshCw,
      title: "Refund Processing",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            Upon successful cancellation, we will process a{" "}
            <strong>full refund</strong> to your original payment method{" "}
            <strong>immediately</strong>.
          </p>
          <p style={{ lineHeight: "var(--leading-relaxed)" }}>
            The refund will typically reflect in your account within{" "}
            <strong>5–7 business days</strong>, depending on your bank, card
            issuer, or payment provider.
          </p>
        </>
      ),
    },
    {
      icon: Clock,
      title: "Late or Missing Refunds",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            If you haven’t received your refund within the expected timeframe,
            please:
          </p>
          <ol className="list-decimal pl-6 space-y-3 mb-6">
            <li>
              Check your bank account, credit card statement, or payment wallet
              again.
            </li>
            <li>
              Contact your credit card company or payment provider — it may take
              some time for the refund to be posted.
            </li>
            <li>Reach out to your bank for further clarification.</li>
          </ol>
          <p style={{ lineHeight: "var(--leading-relaxed)" }}>
            Still no refund? We’re here to help. Please email us at{" "}
            <a
              href="mailto:contact@imdhardware.com"
              className="hover:underline transition"
              style={{
                color: "var(--color-primary)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              contact@imdhardware.com
            </a>
            .
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
        <Helmet>
          <title>{cancellationPolicyMetadata.title}</title>
          <meta
            name="description"
            content={cancellationPolicyMetadata.description}
          />
          <meta name="keywords" content={cancellationPolicyMetadata.keywords} />
          <link
            rel="canonical"
            href={cancellationPolicyMetadata.alternates.canonical}
          />
        </Helmet>
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
            Cancellation & Refund Policy
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

        {/* Closing CTA */}
        <div
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            border: "1px dashed var(--color-border-light)",
          }}
        >
          <div className="flex justify-center mb-4">
            <CheckCircle
              className="w-12 h-12"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <p
            className="mb-2"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-medium)",
            }}
          >
            Thank you for shopping with IMD Hardware
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            We value your trust and are committed to providing a smooth,
            hassle-free experience. If you have any questions, our team is
            always ready to assist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
