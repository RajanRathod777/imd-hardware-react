import { DoorOpen, Package, Shield, Clock, ArrowRight } from "lucide-react";

const ProductAssemblies = () => {
  const productAssemblies = [
    {
      id: 1,
      title: "Complete Door Lock System",
      description:
        "Everything needed for a secure and stylish door installation.",
      components: [
        "Mortise Lock Body",
        "Premium Handle Set",
        "Reinforced Strike Plate",
        "Duplicate Keys",
      ],
      icon: DoorOpen,
      time: "15–20 mins",
    },
    {
      id: 2,
      title: "Cabinet Hardware Kit",
      description:
        "Upgrade your cabinets with smooth functionality and modern design.",
      components: [
        "Soft-Close Hinges",
        "Ergonomic Handles",
        "Heavy-Duty Drawer Slides",
        "Mounting Screws",
      ],
      icon: Package,
      time: "10–15 mins",
    },
    {
      id: 3,
      title: "Security System Bundle",
      description:
        "Maximum protection with professional-grade locking solutions.",
      components: [
        "Main Cylinder Lock",
        "High-Security Deadbolt",
        "Tamper-Proof Bolts",
        "Installation Tool Kit",
      ],
      icon: Shield,
      time: "25–30 mins",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="mb-6"
            style={{
              fontSize: "var(--text-4xl)",
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-bold)",
            }}
          >
            Ready-to-Install Product Assemblies
          </h2>
          <div
            className="w-24 h-1 mx-auto mb-8 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          <p
            className="mx-auto max-w-3xl"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-body)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            Our complete hardware kits include everything you need for quick,
            professional installation — saving you time and ensuring perfect
            results every time.
          </p>
        </div>

        {/* Assembly Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {productAssemblies.map((assembly) => {
            const IconComponent = assembly.icon;

            return (
              <div
                key={assembly.id}
                className=" group relative bg-[var(--color-surface)] rounded-md border overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1"
                style={{ borderColor: "var(--color-border-light)" }}
              >
                {/* Subtle hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-md"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />

                <div className="relative p-10 h-full  flex flex-col content-between justify-between">
                  {/* Icon */}
                  <div className="flex justify-center mb-8">
                    <div
                      className="p-6 rounded-md transition-all duration-500 group-hover:scale-105"
                      style={{
                        backgroundColor: "var(--color-surface-alt)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <IconComponent className="w-12 h-12 transition-colors duration-300 group-hover:text-[var(--color-primary)]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="text-center mb-8">
                    <h3
                      className="mb-3"
                      style={{
                        fontSize: "var(--text-2xl)",
                        fontFamily: "var(--font-heading)",
                        color: "var(--color-text-primary)",
                        fontWeight: "var(--font-bold)",
                      }}
                    >
                      {assembly.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "var(--text-base)",
                        color: "var(--color-text-secondary)",
                        lineHeight: "var(--leading-relaxed)",
                      }}
                    >
                      {assembly.description}
                    </p>
                  </div>

                  {/* Components List */}
                  <div className="mb-8">
                    <h4
                      className="mb-5 pb-3 border-b uppercase tracking-wider"
                      style={{
                        fontSize: "var(--text-xs)",
                        borderColor: "var(--color-border-light)",
                        color: "var(--color-text-muted)",
                        letterSpacing: "var(--tracking-wide)",
                        fontWeight: "var(--font-bold)",
                      }}
                    >
                      Kit Includes
                    </h4>
                    <ul className="space-y-4">
                      {assembly.components.map((component, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-4"
                          style={{
                            fontSize: "var(--text-sm)",
                            color: "var(--color-text-primary)",
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          />
                          <span>{component}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div
                    className="pt-6 border-t flex items-center justify-between"
                    style={{ borderColor: "var(--color-border-light)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock
                        className="w-5 h-5"
                        style={{ color: "var(--color-primary)" }}
                      />
                      <span
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-muted)",
                          fontWeight: "var(--font-medium)",
                        }}
                      >
                        Est. Install: {assembly.time}
                      </span>
                    </div>

                    <button
                      className="group/btn inline-flex items-center gap-2 uppercase tracking-wide transition-all duration-300 hover:gap-3"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-primary)",
                        fontWeight: "var(--font-bold)",
                      }}
                    >
                      View Guide
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductAssemblies;
