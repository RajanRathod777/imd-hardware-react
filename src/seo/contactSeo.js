export const contactPageMetadata = {
  title: "Contact Us | IMD Hardware",
  description:
    "Get in touch with IMD Hardware for inquiries about locks, handles, screws, bolts, and hardware manufacturing services. Fast response guaranteed.",
  keywords:
    "IMD Hardware contact, hardware manufacturer contact, locks supplier contact, hardware exporter contact, customer support",
  alternates: {
    canonical: "https://imdhardware.com/contact",
  },
  openGraph: {
    title: "Contact IMD Hardware",
    description:
      "Reach out for product details, wholesale orders, or hardware manufacturing support. Fast response guaranteed.",
    url: "https://imdhardware.com/contact",
    type: "website",
    siteName: "IMD Hardware",
    images: [
      {
        url: "https://imdhardware.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact IMD Hardware",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IMD Hardware",
    description:
      "Reach out for product details, wholesale orders, or hardware manufacturing support.",
    images: ["https://imdhardware.com/images/logo.jpeg"],
  },
  robots: "index, follow",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://imdhardware.com/contact/#contact",
      mainEntityOfPage: "https://imdhardware.com/contact",
      name: "Contact IMD Hardware",
      description: "Contact information for IMD Hardware.",
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
          name: "Contact",
          item: "https://imdhardware.com/contact",
        },
      ],
    },
  ],
};
