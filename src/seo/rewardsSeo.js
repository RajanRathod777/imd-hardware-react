export const rewardsPageMetadata = {
  title: "Rewards Program | IMD Hardware",
  description:
    "Scan QR codes on IMD Hardware products to earn reward points. Redeem points for discounts, cashback, or free hardware products. Join our loyalty program.",
  keywords:
    "IMD Hardware rewards, loyalty program, reward points, hardware discounts, QR code rewards, customer rewards",
  alternates: {
    canonical: "https://imdhardware.com/rewards",
  },
  openGraph: {
    title: "IMD Hardware Rewards Program",
    description:
      "Earn points by scanning QR codes on products. Redeem for exclusive benefits and discounts.",
    url: "https://imdhardware.com/rewards",
    type: "website",
    siteName: "IMD Hardware",
    images: [
      {
        url: "https://imdhardware.com/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "IMD Hardware Rewards Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rewards Program | IMD Hardware",
    description:
      "Scan QR codes to earn points. Redeem for discounts and free products.",
    images: ["https://imdhardware.com/images/logo.jpeg"],
  },
  robots: "index, follow",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://imdhardware.com/rewards/#rewards",
      mainEntityOfPage: "https://imdhardware.com/rewards",
      name: "IMD Hardware Rewards Program",
      description: "Information about IMD Hardware loyalty program.",
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
          name: "Rewards",
          item: "https://imdhardware.com/rewards",
        },
      ],
    },
  ],
};
