import {
  Lock,
  DoorOpen,
  Package,
  Wrench,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const TrendingProducts = () => {
  const trendingProducts = [
    {
      id: 1,
      name: "Smart Digital Lock",
      category: "Security",
      icon: Lock,
      description:
        "Advanced biometric lock with fingerprint, PIN, and mobile app control for ultimate security.",
      link: "/products/smart-digital-lock",
    },
    {
      id: 2,
      name: "Stainless Steel Hinges",
      category: "Door Hardware",
      icon: DoorOpen,
      description:
        "Heavy-duty, corrosion-resistant hinges built for smooth operation and lifelong durability.",
      link: "/products/stainless-steel-hinges",
    },
    {
      id: 3,
      name: "Modern Cabinet Handle Set",
      category: "Cabinet Hardware",
      icon: Package,
      description:
        "Sleek ergonomic handles in premium finishes — easy to install, built to impress.",
      link: "/products/cabinet-handle-set",
    },
    {
      id: 4,
      name: "Premium Glass Fitting Kit",
      category: "Glass Accessories",
      icon: Wrench,
      description:
        "Complete professional-grade kit for secure and elegant glass door and partition installations.",
      link: "/products/glass-fitting-kit",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
          <div>
            <h2
              className="mb-4"
              style={{
                fontSize: "var(--text-4xl)",
                fontFamily: "var(--font-heading)",
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-bold)",
              }}
            >
              Trending Products
            </h2>
            <div
              className="w-24 h-1 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-3 uppercase tracking-wide transition-all duration-300 hover:gap-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-primary)",
              fontWeight: "var(--font-bold)",
            }}
          >
            View All Collection
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {trendingProducts.map((product) => {
            const IconComponent = product.icon;

            return (
              <Link
                to={product.link}
                key={product.id}
                className="group block bg-[var(--color-surface)] rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4"
                style={{ borderColor: "var(--color-border-light)" }}
              >
                {/* Subtle hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />

                <div className="relative p-10">
                  {/* Icon */}
                  <div className="mb-8">
                    <div
                      className="p-5 rounded-3xl inline-block shadow-lg transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: "var(--color-surface-alt)",
                      }}
                    >
                      <IconComponent
                        className="w-12 h-12"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <span
                    className="block mb-3 uppercase tracking-wider"
                    style={{
                      fontSize: "var(--text-xs)",
                      letterSpacing: "var(--tracking-wide)",
                      color: "var(--color-primary)",
                      fontWeight: "var(--font-bold)",
                    }}
                  >
                    {product.category}
                  </span>

                  {/* Name */}
                  <h3
                    className="mb-4 transition-colors duration-300 group-hover:text-[var(--color-primary)]"
                    style={{
                      fontSize: "var(--text-xl)",
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-text-primary)",
                      fontWeight: "var(--font-bold)",
                    }}
                  >
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "var(--text-base)",
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {product.description}
                  </p>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <span
                      className="uppercase tracking-wide transition-colors duration-300 group-hover:text-[var(--color-primary)]"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-muted)",
                        fontWeight: "var(--font-bold)",
                      }}
                    >
                      Learn More
                    </span>
                    <div className="p-3 rounded-full transition-all duration-300 group-hover:bg-[var(--color-primary)]">
                      <ShoppingCart
                        className="w-6 h-6 transition-colors duration-300 group-hover:text-[var(--color-text-on-primary)]"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
