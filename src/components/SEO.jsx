import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ metadata }) => {
  // Robust defaults for AEO/GEO and general SEO
  const defaultTitle = "IMD Hardware | Premium Door Locks & Hardware Solutions";
  const defaultDescription =
    "IMD Hardware offers a complete range of high-quality door locking systems and hardware accessories including main door locks, room locks, smart digital locks, mortise locks, designer handles, aldrops, and security fittings. Built for strength, elegance, and reliability, our hardware solutions are ideal for residential and commercial use, ensuring protection with modern aesthetics.";
  const defaultKeywords =
    "door locks, main door lock, mortise lock, cylinder lock, digital door lock, smart lock, security locks, luxury door handles, door handle set, aldrops, architectural hardware, hardware accessories, premium locks, home hardware, office hardware, commercial door hardware, stainless steel handles, modern door locks, IMD hardware locks";
  const siteUrl = "https://imdhardware.com";
  const defaultImage = "https://imdhardware.com/images/logo.jpeg";

  if (!metadata) return null;

  const {
    title,
    description,
    keywords,
    openGraph,
    twitter,
    alternates,
    robots,
    schema,
  } = metadata;

  const canonicalUrl = alternates?.canonical || siteUrl;

  // Combine provided keywords with requested keywords for better AEO/SEO
  const combinedKeywords = keywords
    ? `${keywords}, ${defaultKeywords}`
    : defaultKeywords;

  return (
    <Helmet>
      {/* Basic Optimization */}
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={combinedKeywords} />
      <meta
        name="robots"
        content={
          robots ||
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      {/* Canonicals */}
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph (Social SEO / GEO) */}
      <meta
        property="og:title"
        content={openGraph?.title || title || defaultTitle}
      />
      <meta
        property="og:description"
        content={openGraph?.description || description || defaultDescription}
      />
      <meta property="og:url" content={openGraph?.url || canonicalUrl} />
      <meta property="og:type" content={openGraph?.type || "website"} />
      <meta
        property="og:site_name"
        content={openGraph?.siteName || "IMD Hardware"}
      />
      {/* OG Images - Ensure at least one image exists for AI/Sharing */}
      {openGraph?.images && openGraph.images.length > 0 ? (
        openGraph.images.map((img, index) => (
          <React.Fragment key={index}>
            <meta property="og:image" content={img.url} />
            {img.width && (
              <meta property="og:image:width" content={img.width.toString()} />
            )}
            {img.height && (
              <meta
                property="og:image:height"
                content={img.height.toString()}
              />
            )}
            {img.alt && <meta property="og:image:alt" content={img.alt} />}
          </React.Fragment>
        ))
      ) : (
        <meta property="og:image" content={defaultImage} />
      )}
      {/* Twitter Optimization (GEO/AEO) */}
      <meta
        name="twitter:card"
        content={twitter?.card || "summary_large_image"}
      />
      <meta name="twitter:site" content={twitter?.site || "@imdhardware"} />
      <meta
        name="twitter:title"
        content={twitter?.title || title || defaultTitle}
      />
      <meta
        name="twitter:description"
        content={twitter?.description || description || defaultDescription}
      />
      <meta
        name="twitter:image"
        content={twitter?.images?.[0] || defaultImage}
      />
      {/* AI/LLM Optimization (AEO/GEO specific tags) */}
      <meta name="ai-content-type" content="product-information" />
      <meta name="rating" content="General" />
      {/* JSON-LD Schema (Critical for AEO/GEO) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
      {/* Default Organization Schema if none provided */}
      {!schema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "IMD Hardware",
            url: siteUrl,
            logo: defaultImage,
            description: defaultDescription,
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
