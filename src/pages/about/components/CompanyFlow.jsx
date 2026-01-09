import { Package, Shield, Wrench, Mail, Truck, Phone } from "lucide-react";

const CompanyFlow = () => {
  const companyFlow = [
    {
      step: 1,
      title: "Product Sourcing",
      description:
        "Direct partnerships with leading manufacturers to ensure premium quality and reliability.",
      icon: Package,
    },
    {
      step: 2,
      title: "Quality Check",
      description:
        "Every product undergoes rigorous multi-stage testing and quality assurance.",
      icon: Shield,
    },
    {
      step: 3,
      title: "Inventory Management",
      description:
        "Advanced systems for optimal stock levels and real-time availability.",
      icon: Wrench,
    },
    {
      step: 4,
      title: "Customer Order",
      description:
        "Seamless and secure online ordering with instant confirmation.",
      icon: Mail,
    },
    {
      step: 5,
      title: "Fast Shipping",
      description:
        "Quick packing and reliable delivery partners for on-time arrival.",
      icon: Truck,
    },
    {
      step: 6,
      title: "After-Sales Support",
      description:
        "Dedicated team available for guidance, queries, and ongoing assistance.",
      icon: Phone,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="mb-4"
            style={{
              fontSize: "var(--text-4xl)",
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-bold)",
            }}
          >
            Our End-to-End Process
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </div>

        {/* Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companyFlow.map((step, index) => {
            const IconComponent = step.icon;
            const isLastInRow =
              (index + 1) % 3 === 0 || index === companyFlow.length - 1;

            return (
              <div key={step.step} className="relative group">
                {/* Connecting Arrow (hidden on mobile & last in row) */}
                {!isLastInRow && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-8 w-16 h-0.5 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    />
                  </div>
                )}

                {/* Step Card */}
                <div
                  className="relative p-8 rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border-light)",
                  }}
                >
                  {/* Large Step Number Watermark */}
                  <div
                    className="absolute -top-4 -right-4 leading-none select-none pointer-events-none"
                    style={{
                      fontSize: "10rem",
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-primary)",
                      opacity: 0.07,
                      fontWeight: "var(--font-black)",
                    }}
                  >
                    {step.step}
                  </div>

                  {/* Icon + Title */}
                  <div className="relative z-10 flex items-center mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-text-on-primary)",
                      }}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <span
                        className="block uppercase tracking-wide opacity-70 mb-1"
                        style={{
                          fontSize: "var(--text-xs)",
                          color: "var(--color-primary)",
                          letterSpacing: "var(--tracking-wide)",
                          fontWeight: "var(--font-medium)",
                        }}
                      >
                        Step {step.step}
                      </span>
                      <h3
                        style={{
                          fontSize: "var(--text-xl)",
                          fontFamily: "var(--font-heading)",
                          color: "var(--color-text-primary)",
                          fontWeight: "var(--font-bold)",
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="relative z-10"
                    style={{
                      fontSize: "var(--text-base)",
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Mobile Flow Indicator */}
        <div className="flex justify-center mt-12 lg:hidden">
          <div className="flex items-center gap-4">
            {companyFlow.map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full transition-colors"
                style={{
                  backgroundColor:
                    i < companyFlow.length - 1
                      ? "var(--color-primary)"
                      : "var(--color-text-muted)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyFlow;
