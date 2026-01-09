export const homePageMetadata = {
  title: "IMD Hardware | Hardware Manufacturer & Supplier",
  description:
    "IMD Hardware is a leading hardware manufacturer and supplier specializing in locks, door handles, screws, bolts, basket stoppers, and high-quality hardware products.",
  keywords:
    "IMD Hardware, hardware manufacturer, hardware supplier, locks manufacturer, door handles, screws, bolts, basket stopper, hardware exporter",
  alternates: {
    canonical: "https://imdhardware.com",
  },
  openGraph: {
    title: "IMD Hardware – Premium Hardware Manufacturer & Supplier",
    description:
      "Manufacturer of locks, door handles, screws, bolts, and premium hardware products. Trusted hardware supplier and exporter.",
    url: "https://imdhardware.com",
    siteName: "IMD Hardware",
    images: [
      {
        url: "https://imdhardware.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "IMD Hardware – Premium Hardware Manufacturer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMD Hardware | Hardware Manufacturer & Supplier",
    description:
      "Top-quality locks, handles, screws, bolts, and hardware components manufactured by IMD Hardware.",
    creator: "@imdhardware",
    images: ["https://imdhardware.com/images/logo.jpeg"],
  },
  robots: "index, follow",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://imdhardware.com/#organization",
      name: "IMD Hardware",
      url: "https://imdhardware.com",
      logo: "https://imdhardware.com/images/logo.jpeg",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-6355953543",
        contactType: "customer service",
        areaServed: "IN",
      },
      sameAs: [
        "https://facebook.com/imdhardware",
        "https://instagram.com/imdhardware",
        "https://linkedin.com/company/imdhardware",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://imdhardware.com/#website",
      name: "IMD Hardware",
      url: "https://imdhardware.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://imdhardware.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};
