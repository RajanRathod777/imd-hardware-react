import React from "react";
import { Helmet } from "react-helmet-async";
import { termsConditionsMetadata } from "../../seo/termsConditionsSeo";
import {
  FileText,
  Scale,
  Shield,
  Package,
  Truck,
  CreditCard,
  Mail,
} from "lucide-react";

const TermsConditionsPage = () => {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sections = [
    {
      icon: FileText,
      title: "Introduction",
      content: (
        <p style={{ lineHeight: "var(--leading-relaxed)" }}>
          Welcome to <strong>IMD Hardware</strong>. These Terms and Conditions
          govern your use of our website and the purchase of products from us.
          By accessing or placing an order on imdhardware.com, you agree to be
          bound by these terms. If you do not agree, please do not use our
          services.
        </p>
      ),
    },
    {
      icon: Scale,
      title: "Use of Website",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            You are granted a limited, non-exclusive right to use this website
            for personal, non-commercial purposes.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              You must be at least 18 years old or have legal guardian consent
              to place orders.
            </li>
            <li>
              You agree not to misuse the website, interfere with its
              functionality, or attempt unauthorized access.
            </li>
            <li>
              We reserve the right to refuse service or terminate accounts at
              our discretion.
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: Package,
      title: "Products & Orders",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            All product descriptions, images, and pricing are subject to change
            without prior notice. We strive for accuracy but are not liable for
            typographical errors.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              Placing an order constitutes an offer to purchase. We accept by
              shipping the product.
            </li>
            <li>
              Stock availability is not guaranteed until order confirmation.
            </li>
            <li>Prices include applicable taxes unless otherwise stated.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      content: (
        <p style={{ lineHeight: "var(--leading-relaxed)" }}>
          Shipping terms, delivery timelines, and costs are detailed in our{" "}
          <a
            href="/shipping-policy"
            className="hover:underline transition"
            style={{
              color: "var(--color-primary)",
              fontWeight: "var(--font-semibold)",
            }}
          >
            Shipping Policy
          </a>
          . Risk of loss passes to you upon delivery. We are not responsible for
          delays caused by third-party couriers.
        </p>
      ),
    },
    {
      icon: Shield,
      title: "Returns, Refunds & Cancellations",
      content: (
        <p style={{ lineHeight: "var(--leading-relaxed)" }}>
          Returns, refunds, and order cancellations are governed by our{" "}
          <a
            href="/return-policy"
            className="hover:underline transition"
            style={{
              color: "var(--color-primary)",
              fontWeight: "var(--font-semibold)",
            }}
          >
            Return & Refund Policy
          </a>{" "}
          and{" "}
          <a
            href="/cancellation-policy"
            className="hover:underline transition"
            style={{
              color: "var(--color-primary)",
              fontWeight: "var(--font-semibold)",
            }}
          >
            Cancellation Policy
          </a>
          .
        </p>
      ),
    },
    {
      icon: CreditCard,
      title: "Payments",
      content: (
        <p style={{ lineHeight: "var(--leading-relaxed)" }}>
          We accept secure payments via approved gateways. You warrant that you
          are authorized to use the payment method provided. All transactions
          are processed in Indian Rupees (INR).
        </p>
      ),
    },
    {
      icon: Mail,
      title: "Contact & Governing Law",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            These Terms are governed by the laws of India. Any disputes shall be
            subject to the exclusive jurisdiction of courts in Sabarkantha,
            Gujarat.
          </p>
          <p style={{ lineHeight: "var(--leading-relaxed)" }}>
            For questions about these Terms, please contact us at{" "}
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
          <title>{termsConditionsMetadata.title}</title>
          <meta
            name="description"
            content={termsConditionsMetadata.description}
          />
          <meta name="keywords" content={termsConditionsMetadata.keywords} />
          <link
            rel="canonical"
            href={termsConditionsMetadata.alternates.canonical}
          />
          <meta name="robots" content={termsConditionsMetadata.robots} />
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
            Terms & Conditions
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

        {/* Sections */}
        <div className="space-y-12">
          {sections.map(({ icon: Icon, title, content }, index) => (
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

        {/* Closing Note */}
        <div
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            border: "1px dashed var(--color-border-light)",
          }}
        >
          <p
            className=""
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-medium)",
            }}
          >
            Thank you for trusting IMD Hardware
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            We are committed to providing quality products and excellent service
            while maintaining transparency and fairness in all our dealings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
