export const profilePageMetadata = {
  title: "My Profile | IMD Hardware",
  description:
    "Manage your account settings, track orders, and view rewards. Complete control over your IMD Hardware account.",
  keywords: "profile, account settings, IMD Hardware, manage account",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://imdhardware.com/profile",
  },
  openGraph: {
    title: "My Profile | IMD Hardware",
    description:
      "Manage your account settings, track orders, and view rewards.",
    url: "https://imdhardware.com/profile",
    type: "website",
    siteName: "IMD Hardware",
  },
  twitter: {
    card: "summary",
    title: "My Profile | IMD Hardware",
    description:
      "Manage your account settings, track orders, and view rewards.",
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
        name: "Profile",
        item: "https://imdhardware.com/profile",
      },
    ],
  },
};
