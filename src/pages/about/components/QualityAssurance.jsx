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
      link: "/products",
    },
    {
      id: 2,
      name: "Stainless Steel Hinges",
      category: "Door Hardware",
      icon: DoorOpen,
      description:
        "Heavy-duty, corrosion-resistant hinges built for smooth operation and lifelong durability.",
      link: "/products",
    },
    {
      id: 3,
      name: "Modern Cabinet Handle Set",
      category: "Cabinet Hardware",
      icon: Package,
      description:
        "Sleek ergonomic handles in premium finishes — easy to install, built to impress.",
      link: "/products",
    },
    {
      id: 4,
      name: "Premium Glass Fitting Kit",
      category: "Glass Accessories",
      icon: Wrench,
      description:
        "Complete professional-grade kit for secure and elegant glass door and partition installations.",
      link: "/products",
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
              className="w-24 h-1 rounded-md"
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
                className="h-full bg-[var(--color-surface)] rounded-md border border-[var(--color-border-light)] overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1"
              >
                <div className="h-full relative flex flex-col content-between justify-between  p-10 flex flex-col content-between justify-between h-full">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className="p-5 rounded-md inline-block shadow-sm bg-[var(--color-surface-alt)] transition-transform duration-500 group-hover:scale-105">
                      <IconComponent className="w-12 h-12 text-[var(--color-primary)]" />
                    </div>
                  </div>

                  {/* Category */}
                  <span className="block mb-3 text-xs uppercase tracking-wider font-bold text-[var(--color-primary)]">
                    {product.category}
                  </span>

                  {/* Name */}
                  <h3 className="mb-4 text-xl font-bold font-[var(--font-heading)] text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 text-base text-[var(--color-text-secondary)] leading-relaxed font-[var(--font-body)]">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-wide font-bold text-[var(--color-text-muted)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                      Learn More
                    </span>

                    <div className="p-3 rounded-md transition-transform duration-300 group-hover:scale-110">
                      <ShoppingCart className="w-6 h-6 text-[var(--color-primary)]" />
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
