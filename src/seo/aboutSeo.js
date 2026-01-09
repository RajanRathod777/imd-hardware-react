export const metadata = {
  title: "About IMD Hardware | Leading Hardware Manufacturer & Supplier",
  description:
    "IMD Hardware is a leading manufacturer of locks, door handles, screws, bolts, and premium hardware accessories. Quality hardware solutions since 1995.",
  keywords:
    "IMD Hardware, hardware manufacturer, locks manufacturer, door handles, screws, bolts, hardware supplier, industrial hardware, construction hardware",
  alternates: {
    canonical: "https://imdhardware.com/about",
  },
  openGraph: {
    title: "About IMD Hardware - Premium Hardware Manufacturer",
    description:
      "Learn about IMD Hardware's journey as India's trusted hardware manufacturer and exporter of quality locks, handles, and hardware accessories.",
    url: "https://imdhardware.com/about",
    type: "website",
    siteName: "IMD Hardware",
    images: [
      {
        url: "https://imdhardware.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "IMD Hardware - Leading Hardware Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About IMD Hardware - Premium Hardware Manufacturer",
    description:
      "Learn about IMD Hardware's journey as India's trusted hardware manufacturer and exporter.",
    images: ["https://imdhardware.com/images/logo.jpeg"],
    creator: "@imdhardware",
  },
  robots: "index, follow",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://imdhardware.com/about/#about",
      mainEntityOfPage: "https://imdhardware.com/about",
      name: "About IMD Hardware",
      description: "Information about IMD Hardware manufacturer and supplier.",
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
          name: "About",
          item: "https://imdhardware.com/about",
        },
      ],
    },
  ],
};
