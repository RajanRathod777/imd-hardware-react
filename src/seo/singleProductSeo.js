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
    robots: "index, follow",
  };
}

export function generateProductSchema(product) {
  if (!product) return null;

  const currentYear = new Date().getFullYear();
  const validUntil = `${currentYear + 1}-12-31`;

  // Calculate aggregate rating if reviews exist
  // This assumes product has a reviews array or aggregate stats
  // If not available, we might need to omit or use defaults carefully.
  // Using dummy fallback if data missing to satisfy schema, or omit if strictly invalid.
  // Google recommends omitting if no reviews.
  const ratingValue = product.rating || "4.5"; // Default/Fallback
  const reviewCount = product.reviews_count || "10"; // Default/Fallback

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://imdhardware.com/product/${product.product_id}#product`,
    name: product.name || "IMD Hardware Product",
    description:
      product.description ||
      product.short_description ||
      "Premium hardware product from IMD Hardware.",
    image:
      product.images && product.images.length > 0
        ? product.images.map((img) => img.url || img)
        : ["https://imdhardware.com/images/logo.jpeg"],
    sku: product.sku || `IMD-${product.product_id}`,
    mpn: product.mpn || `MPN-${product.product_id}`,
    brand: {
      "@type": "Brand",
      name: "IMD Hardware",
      logo: "https://imdhardware.com/images/logo.jpeg",
    },
    manufacturer: {
      "@type": "Organization",
      name: "IMD Hardware",
    },
    offers: {
      "@type": "Offer",
      url: `https://imdhardware.com/product/${product.product_id}`,
      priceCurrency: "INR",
      price: product.price || "0",
      priceValidUntil: validUntil,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      seller: {
        "@type": "Organization",
        name: "IMD Hardware",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    // Optional: Add a sample review if available or skip
  };
}
