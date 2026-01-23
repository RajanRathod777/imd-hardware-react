import React from "react";
import { Helmet } from "react-helmet-async";
import { privacyPolicyMetadata } from "../../seo/privacyPolicySeo";
import { Shield, User, Mail, CreditCard, Lock, Phone } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const policySections = [
    {
      icon: Shield,
      title: "Introduction",
      content: (
        <p style={{ lineHeight: "var(--leading-relaxed)" }}>
          Welcome to <strong>IMD Hardware</strong> ("we," "our," or "us"). We
          deeply respect your privacy and are fully committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, store, and safeguard your data when you visit our website or make
          a purchase — regardless of your location. It also outlines your
          privacy rights and the legal protections available to you.
        </p>
      ),
    },
    {
      icon: User,
      title: "Data We Collect",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            We collect only the information necessary to provide you with the
            best possible service. The personal data we may collect includes:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Identity Data:</strong> First name, last name, username,
              or similar identifiers
            </li>
            <li>
              <strong>Contact Data:</strong> Billing/delivery address, email
              address, and phone numbers
            </li>
            <li>
              <strong>Transaction Data:</strong> Details of payments and
              products/services purchased
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, login data, browser
              type/version, time zone, operating system, and device information
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              website, products, and services
            </li>
          </ul>
          <p className="mt-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            We do <strong>not</strong> collect sensitive personal data (e.g.,
            racial/ethnic origin, political opinions, health, or religious
            beliefs).
          </p>
        </>
      ),
    },
    {
      icon: CreditCard,
      title: "How We Use Your Data",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            We use your personal data only when permitted by law. Most commonly,
            we process your data for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>To fulfill and manage your orders and contracts</li>
            <li>
              To communicate with you about orders, products, and services
            </li>
            <li>To improve our website, products, and customer experience</li>
            <li>To comply with legal obligations</li>
            <li>
              For legitimate business interests (e.g., fraud prevention and
              security)
            </li>
          </ul>
          <p className="mt-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            We will always balance our legitimate interests against your rights
            and freedoms.
          </p>
        </>
      ),
    },
    {
      icon: Lock,
      title: "Data Security",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            We implement robust technical and organizational security measures
            to protect your data from unauthorized access, loss, alteration, or
            disclosure.
          </p>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            Access to your personal information is strictly limited to
            employees, contractors, and third parties who need it for legitimate
            business purposes. All such parties are bound by confidentiality
            obligations.
          </p>
          <p style={{ lineHeight: "var(--leading-relaxed)" }}>
            We regularly review and update our security practices to maintain
            the highest standards of data protection.
          </p>
        </>
      ),
    },
    {
      icon: Mail,
      title: "Your Rights",
      content: (
        <>
          <p className="mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            You have important rights over your personal data, including:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>The right to access your personal data</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
          </ul>
          <p className="mt-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
            To exercise any of these rights, please contact us using the details
            below.
          </p>
        </>
      ),
    },
    {
      icon: Phone,
      title: "Contact Us",
      content: (
        <p style={{ lineHeight: "var(--leading-relaxed)" }}>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please reach out to us at:
          <br />
          <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:imd@imdhardware.com"
            className="hover:underline transition"
            style={{
              color: "var(--color-primary)",
              fontWeight: "var(--font-semibold)",
            }}
          >
            imd@imdhardware.com
          </a>
          <br />
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
        </p>
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
          <title>{privacyPolicyMetadata.title}</title>
          <meta
            name="description"
            content={privacyPolicyMetadata.description}
          />
          <meta name="keywords" content={privacyPolicyMetadata.keywords} />
          <link
            rel="canonical"
            href={privacyPolicyMetadata.alternates.canonical}
          />
          <meta name="robots" content={privacyPolicyMetadata.robots} />
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
            Privacy Policy
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

        {/* Final Note */}
        <div
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            border: "1px dashed var(--color-border-light)",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-medium)",
            }}
          >
            Your privacy matters to us.
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            We are committed to transparency and responsible data handling at
            every step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
