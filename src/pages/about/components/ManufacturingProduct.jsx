const ManufacturingProduct = () => {
  // Placeholder array of images. Ideally, these should be dynamically fetched or passed as props.
  // For now, we assume images are named 1.jpg, 2.jpg, etc. in the public/manufacturing-product folder.
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
    <section className="mb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Manufacturing Products
          </h2>
          <p
            className="text-lg max-w-4xl mx-auto"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-body)",
            }}
          >
            Tthese product images represent the types of products the company
            aims to develop in the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productImages.map((src, index) => (
            <div
              key={index}
              className="group shadow-md border overflow-hidden hover:shadow-xl transition-all duration-300 bg-white rounded-lg"
              style={{
                borderColor: "var(--color-border-light)",
              }}
            >
              <div className="relative h-64 w-full bg-gray-100 flex items-center justify-center">
                <img
                  src={src}
                  alt={`Manufacturing Product ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturingProduct;
