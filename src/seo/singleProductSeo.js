export async function generateProductMetadata({ params }) {
  const { productId } = params;
  return {
    title: `Product Details | IMD Hardware`,
    description: `View detailed information about this hardware product from IMD Hardware. Premium quality hardware components.`,
    keywords:
      "hardware product, IMD Hardware, locks, door handles, screws, bolts, product details",
    alternates: {
      canonical: `https://imdhardware.com/product/${productId}`,
    },
    openGraph: {
      title: `Product Details | IMD Hardware`,
      description: `Quality hardware product from IMD Hardware. Premium manufacturing and materials.`,
      url: `https://imdhardware.com/product/${productId}`,
      type: "website",
      siteName: "IMD Hardware",
      images: [
        {
          url: "https://imdhardware.com/images/logo.jpeg",
          width: 1200,
          height: 630,
          alt: "Product Details | IMD Hardware",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Product Details | IMD Hardware`,
      description: `View detailed information about this premium hardware product from IMD Hardware.`,
      images: ["https://imdhardware.com/images/logo.jpeg"],
    },
  };
}
