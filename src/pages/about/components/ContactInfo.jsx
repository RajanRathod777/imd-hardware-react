import { Phone, Mail, MapPin } from "lucide-react";

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 9484555666",
      sub: "Mon–Sat: 9am–6pm IST",
      href: "tel:+919484555666",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@imdhardware.com",
      sub: "We'll reply within 24 hours",
      href: "mailto:contact@imdhardware.com",
    },
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: "Near Vaikunthdham Temple",
      sub: "Himatnagar Shamlaji Road, NH 08, Sabarkantha, Gujarat 383001",
      href: "https://maps.google.com/?q=Near+Vaikunthdham+Temple+Himatnagar+Shamlaji+Road+Sabarkantha+Gujarat",
    },
  ];

  return (
    <section className="py-20 px-4 overflow-hidden">
      <div
        className="max-w-7xl mx-auto rounded-3xl shadow-xl border"
        style={{
          backgroundColor: "var(--color-bg-alt)",
          borderColor: "var(--color-border-light)",
        }}
      >
        {/* Section Header */}
        <div className="text-center mb-16 pt-8">
          <h2
            className="mb-4"
            style={{
              fontSize: "var(--text-4xl)",
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-bold)",
            }}
          >
            Get In Touch
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            const isMiddle = index === 1;

            return (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group block p-10 transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
                style={{
                  borderRight:
                    isMiddle || index === 0
                      ? "1px solid var(--color-border-light)"
                      : "none",
                  borderBottom:
                    index < 2 ? "1px solid var(--color-border-light)" : "none",
                  borderLeft:
                    index === 2 && window.innerWidth < 768 ? "none" : undefined, // mobile fix
                }}
              >
                {/* Hover Background Glow */}
                <div
                  className="absolute inset-0 scale-0 rounded-3xl opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-20"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div
                    className="w-20 h-20 mb-6 rounded-3xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-text-on-primary)",
                    }}
                  >
                    <IconComponent className="w-10 h-10" />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3 transition-colors duration-300 group-hover:text-[var(--color-primary)]"
                    style={{
                      fontSize: "var(--text-xl)",
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-text-primary)",
                      fontWeight: "var(--font-bold)",
                    }}
                  >
                    {method.title}
                  </h3>

                  {/* Main Details */}
                  <p
                    className="mb-2 transition-colors duration-300"
                    style={{
                      fontSize: "var(--text-base)",
                      color: "var(--color-text-primary)",
                      fontWeight: "var(--font-medium)",
                    }}
                  >
                    {method.details}
                  </p>

                  {/* Subtitle */}
                  <p
                    className="transition-colors duration-300"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {method.sub}
                  </p>

                  {/* Hover Arrow Indicator */}
                  <div
                    className="mt-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <svg
                      className="w-6 h-6 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
