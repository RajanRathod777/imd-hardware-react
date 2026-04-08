import { Lock, DoorOpen, Package, Wrench } from "lucide-react";

const TrendingProducts = () => {
  const trendingProducts = [
    {
      id: 1,
      name: "Smart Digital Lock",
      category: "Security",
      icon: Lock,
      description:
        "Advanced biometric digital lock with mobile app integration",
    },
    {
      id: 2,
      name: "Stainless Steel Hinges",
      category: "Door Hardware",
      icon: DoorOpen,
      description:
        "Corrosion-resistant heavy-duty hinges for long-lasting performance",
    },
    {
      id: 3,
      name: "Cabinet Handle Set",
      category: "Cabinet Hardware",
      icon: Package,
      description: "Elegant modern handles with easy installation",
    },
    {
      id: 4,
      name: "Glass Fitting Kit",
      category: "Glass Accessories",
      icon: Wrench,
      description: "Complete set for glass door and cabinet installations",
    },
  ];

  return (
    <section className="mb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <h2
            style={{
              fontWeight: "var(--font-bold)",
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-3xl)",
              color: "var(--color-text-primary)",
            }}
          >
            Trending Products
          </h2>
          <button
            className="border-b-2 pb-1 transition-opacity hover:opacity-80"
            style={{
              fontWeight: "var(--font-bold)",
              color: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            }}
          >
            View All Collection
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <div
                key={product.id}
                className="h-full relative flex flex-col content-between justify-between  group p-8 shadow-md hover:shadow-xl transition-all duration-300 rounded-lg border"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                {/* Icon */}
                <div className="flex mb-6">
                  <IconComponent
                    className="w-10 h-10"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>

                {/* Category */}
                <div
                  className="mb-2 uppercase tracking-wider"
                  style={{
                    fontWeight: "var(--font-bold)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {product.category}
                </div>

                {/* Name */}
                <h3
                  className="mb-3"
                  style={{
                    fontWeight: "var(--font-bold)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--text-xl)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "1.625",
                  }}
                >
                  {product.description}
                </p>

                {/* Add to Cart Button */}
                <button
                  className="w-full py-3 text-center transition-colors duration-300 rounded border"
                  style={{
                    fontWeight: "var(--font-semibold)",
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
