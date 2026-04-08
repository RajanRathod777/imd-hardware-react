const AboutContent = () => {
  return (
    <div
      className="max-w-4xl mx-auto py-16 px-4"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="space-y-24">
        {/* Hero Header */}
        <div className="text-center">
          <h1
            className="mb-6"
            style={{
              fontSize: "var(--text-4xl)",
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
              fontWeight: "var(--font-bold)",
            }}
          >
            About Our Hardware Solutions
          </h1>

          <div
            className="w-20 h-1 mx-auto mb-8 rounded-md"
            style={{ backgroundColor: "var(--color-primary)" }}
          />

          <p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: "var(--text-xl)",
              color: "var(--color-text-muted)",
              lineHeight: "1.625",
            }}
          >
            Your trusted partner for premium hardware tools and accessories that
            stand the test of time. We believe in quality, durability, and
            innovation.
          </p>
        </div>

        <MissionStatement />
        <HardwareImportance />
        <SelectionGuide />
        <ProductCategories />
        <WhyChooseUs />
      </div>
    </div>
  );
};

const MissionStatement = () => (
  <section
    className="p-10 md:p-14 rounded-md border-l-8 relative overflow-hidden"
    style={{
      backgroundColor: "var(--color-bg-alt)",
      borderLeftColor: "var(--color-primary)",
    }}
  >
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div
        className="absolute -top-10 -right-10 w-64 h-64 rounded-md"
        style={{ backgroundColor: "var(--color-primary)" }}
      />
    </div>

    <h2
      className="relative mb-6"
      style={{
        fontSize: "var(--text-3xl)",
        fontFamily: "var(--font-heading)",
        color: "var(--color-text-primary)",
        fontWeight: "var(--font-bold)",
      }}
    >
      Our Commitment to Excellence
    </h2>
    <p
      className="relative"
      style={{
        fontSize: "var(--text-lg)",
        color: "var(--color-text-muted)",
        lineHeight: "1.625",
      }}
    >
      We are dedicated to providing our customers with the highest quality
      hardware products at the most competitive prices. Our experienced team is
      committed to building lasting relationships through exceptional service
      and expert guidance.
    </p>
  </section>
);

const HardwareImportance = () => (
  <section className="space-y-8">
    <h2
      style={{
        fontSize: "var(--text-3xl)",
        fontFamily: "var(--font-heading)",
        color: "var(--color-text-primary)",
        fontWeight: "var(--font-bold)",
      }}
    >
      Essential Hardware for Modern Living
    </h2>

    <div
      className="space-y-6"
      style={{
        fontSize: "var(--text-lg)",
        color: "var(--color-text-muted)",
        lineHeight: "1.625",
      }}
    >
      <p>
        Hardware tools form the foundation of every construction and repair
        project. From basic household tools to specialized equipment, these
        instruments are indispensable.
      </p>
      <p>
        The right hardware tools ensure precision, efficiency, and safety in
        every task — whether you're a professional contractor or a dedicated DIY
        enthusiast.
      </p>
    </div>
  </section>
);

const SelectionGuide = () => {
  const tips = [
    "Material Quality: Opt for stainless steel or corrosion-resistant materials for longevity",
    "Safety Features: Prioritize tools with built-in safety mechanisms and non-slip grips",
    "Ergonomic Design: Choose comfortable, user-friendly tools to reduce fatigue",
    "Long-term Durability: Invest in robust construction that withstands heavy use",
    "Value Proposition: Balance cost with long-term benefits and warranty coverage",
  ];

  return (
    <section
      className="p-10 rounded-md border"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <h2
        className="mb-8"
        style={{
          fontSize: "var(--text-3xl)",
          fontFamily: "var(--font-heading)",
          color: "var(--color-text-primary)",
          fontWeight: "var(--font-bold)",
        }}
      >
        Choosing the Right Hardware
      </h2>

      <ul className="space-y-6">
        {tips.map((tip, index) => {
          const [title, description] = tip.split(": ");
          return (
            <li key={index} className="flex items-start gap-5">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-text-on-primary)",
                  fontWeight: "var(--font-bold)",
                }}
              >
                {index + 1}
              </div>
              <div>
                <strong
                  style={{
                    color: "var(--color-text-primary)",
                    fontWeight: "var(--font-semibold)",
                  }}
                >
                  {title}:
                </strong>
                <span
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  {" "}
                  {description}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const ProductCategories = () => {
  const categories = [
    {
      title: "Security & Lock Systems",
      description:
        "Protect your property with our extensive range of advanced security solutions and reliable locks.",
    },
    {
      title: "Door Hardware Collection",
      description:
        "Enhance functionality and aesthetics with our complete selection of premium door hardware.",
    },
    {
      title: "Cabinet & Storage Solutions",
      description:
        "Transform your storage spaces with high-quality hinges, pulls, and organizational hardware.",
    },
    {
      title: "Glass Fittings & Accessories",
      description:
        "Add elegance and modern sophistication with our specialized glass hardware and fittings.",
    },
  ];

  return (
    <section className="text-center">
      <h2
        className="mb-12"
        style={{
          fontSize: "var(--text-3xl)",
          fontFamily: "var(--font-heading)",
          color: "var(--color-text-primary)",
          fontWeight: "var(--font-bold)",
        }}
      >
        Comprehensive Hardware Categories
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="p-8 rounded-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border-light)",
            }}
          >
            <div className="flex items-center mb-4">
              <div
                className="w-1 h-8 mr-4 rounded-md"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <h3
                style={{
                  fontSize: "var(--text-xl)",
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-semibold)",
                }}
              >
                {category.title}
              </h3>
            </div>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "var(--text-base)",
              }}
            >
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    "Premium Quality Products",
    "Expert Technical Support",
    "Competitive Pricing",
    "Fast & Reliable Delivery",
  ];

  return (
    <section
      className="py-16 px-10 text-center rounded-md"
      style={{ backgroundColor: "var(--color-bg-alt)" }}
    >
      <h2
        className="mb-12"
        style={{
          fontSize: "var(--text-3xl)",
          fontFamily: "var(--font-heading)",
          color: "var(--color-text-primary)",
          fontWeight: "var(--font-bold)",
        }}
      >
        Why Choose IMD Hardware?
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {reasons.map((reason, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-16 h-16 mb-5 rounded-md flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-on-primary)",
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--font-bold)",
              }}
            >
              ✓
            </div>
            <p
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-medium)",
              }}
            >
              {reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutContent;
