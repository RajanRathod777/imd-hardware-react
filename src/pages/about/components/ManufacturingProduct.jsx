import { ZoomIn } from "lucide-react";

const ManufacturingProduct = () => {
  // Update these paths when images are properly hosted
  const productImages = [
    "/images/manufacturing-product/WhatsApp Image 2025-12-12 at 12.27.27 PM.jpeg",
    "/images/manufacturing-product/WhatsApp Image 2025-12-12 at 12.30.32 PM.jpeg",
    "/images/manufacturing-product/WhatsApp Image 2025-12-12 at 12.39.54 PM.jpeg",
    "/images/manufacturing-product/WhatsApp Image 2025-12-13 at 11.56.51 AM.jpeg",
    "/images/manufacturing-product/WhatsApp Image 2025-12-13 at 11.56.52 AM.jpeg",
    "/images/manufacturing-product/WhatsApp Image 2025-12-13 at 11.57.58 AM.jpeg",
    "/images/manufacturing-product/WhatsApp Image 2025-12-13 at 12.02.11 PM.jpeg",
    "/images/manufacturing-product/WhatsApp Image 2025-12-13 at 12.07.07 PM.jpeg",
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
            Future Manufacturing Products
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
            These images showcase the innovative hardware solutions we're
            developing for the future. Precision-engineered, durable, and
            designed to meet the evolving needs of professionals and homeowners
            alike.
          </p>
        </div>

        {/* Product Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productImages.map((src, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              {/* Image */}
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={src}
                  alt={`Future Manufacturing Product ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                <div className="flex items-center gap-2 text-white">
                  <ZoomIn className="w-6 h-6" />
                  <span
                    className="uppercase tracking-wide"
                    style={{
                      fontSize: "var(--text-sm)",
                      letterSpacing: "var(--tracking-wide)",
                      fontWeight: "var(--font-semibold)",
                    }}
                  >
                    View Detail
                  </span>
                </div>
              </div>

              {/* Optional: Product Label (can be added later when titles are available) */}
              {/* <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-[var(--color-text-on-primary)] px-4 py-2 rounded-full font-semibold text-sm">
                Coming Soon
              </div> */}
            </div>
          ))}
        </div>

        {/* Optional Future Note */}
        <div className="mt-16 text-center">
          <p
            className="italic"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-muted)",
            }}
          >
            These products are currently in development. Stay tuned for launch
            updates!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingProduct;
