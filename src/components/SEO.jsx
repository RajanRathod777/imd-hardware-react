import { Helmet } from "react-helmet-async";

const SEO = ({ metadata }) => {
  if (!metadata) return null;

  const {
    title,
    description,
    keywords,
    openGraph,
    twitter,
    alternates,
  } = metadata;

  // Helper to resolve absolute URLs if needed, but metadata usually provides them or we use base
  // simplified for this context:
  const canonicalUrl = alternates?.canonical;

  return (
    <Helmet>
      {/* Basic */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonicals */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      {openGraph?.title && (
        <meta property="og:title" content={openGraph.title} />
      )}
      {openGraph?.description && (
        <meta property="og:description" content={openGraph.description} />
      )}
      {openGraph?.url && <meta property="og:url" content={openGraph.url} />}
      {openGraph?.type && <meta property="og:type" content={openGraph.type} />}
      {openGraph?.siteName && (
        <meta property="og:site_name" content={openGraph.siteName} />
      )}
      {openGraph?.images?.map((img, index) => (
        <meta key={index} property="og:image" content={img.url} />
      ))}

      {/* Twitter */}
      {twitter?.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter?.title && <meta name="twitter:title" content={twitter.title} />}
      {twitter?.description && (
        <meta name="twitter:description" content={twitter.description} />
      )}
      {twitter?.creator && (
        <meta name="twitter:creator" content={twitter.creator} />
      )}
      {twitter?.images?.map((img, index) => (
        <meta key={index} name="twitter:image" content={img} />
      ))}
    </Helmet>
  );
};

export default SEO;
