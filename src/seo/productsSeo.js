export const productsPageMetadata = {
  title: "Hardware Products | IMD Hardware",
  description:
    "Browse our extensive collection of hardware products including locks, door handles, screws, bolts, basket stoppers, and premium hardware accessories. Quality products from a trusted manufacturer.",
  keywords:
    "hardware products, locks, door handles, screws, bolts, basket stopper, hardware catalog, IMD Hardware products",
  alternates: {
    canonical: "https://imdhardware.com/products",
  },
  openGraph: {
    title: "Hardware Products Catalog | IMD Hardware",
    description:
      "Explore our complete range of locks, handles, screws, bolts, and hardware components. Manufactured with precision and quality.",
    url: "https://imdhardware.com/products",
    type: "website",
    siteName: "IMD Hardware",
    images: [
      {
        url: "https://imdhardware.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Hardware Products Catalog | IMD Hardware",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardware Products | IMD Hardware",
    description:
      "Browse our extensive collection of locks, handles, screws, bolts, and premium hardware products.",
    images: ["https://imdhardware.com/images/logo.jpeg"],
  },
  robots: "index, follow",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://imdhardware.com/products/#collection",
      mainEntityOfPage: "https://imdhardware.com/products",
      name: "Hardware Products Catalog",
      description:
        "Expesive collection of hardware products manufactured by IMD Hardware.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://imdhardware.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: "https://imdhardware.com/products",
        },
      ],
    },
  ],
};
