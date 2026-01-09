export const cartPageMetadata = {
  title: "Shopping Cart | IMD Hardware",
  description:
    "Review your selected hardware products and proceed to checkout. Secure payment and fast delivery.",
  keywords: "shopping cart, IMD Hardware, hardware products, checkout",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://imdhardware.com/cart",
  },
  openGraph: {
    title: "Shopping Cart | IMD Hardware",
    description:
      "Review your selected hardware products and proceed to checkout.",
    url: "https://imdhardware.com/cart",
    type: "website",
    siteName: "IMD Hardware",
  },
  twitter: {
    card: "summary",
    title: "Shopping Cart | IMD Hardware",
    description:
      "Review your selected hardware products and proceed to checkout.",
  },
  schema: {
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
        name: "Cart",
        item: "https://imdhardware.com/cart",
      },
    ],
  },
};
