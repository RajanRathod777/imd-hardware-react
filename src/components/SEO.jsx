import React from "react";
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
    robots,
    schema,
  } = metadata;

  const canonicalUrl = alternates?.canonical;

  return (
    <Helmet>
      {/* Basic */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {robots && <meta name="robots" content={robots} />}

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
        <React.Fragment key={index}>
          <meta property="og:image" content={img.url} />
          {img.width && (
            <meta property="og:image:width" content={img.width.toString()} />
          )}
          {img.height && (
            <meta property="og:image:height" content={img.height.toString()} />
          )}
          {img.alt && <meta property="og:image:alt" content={img.alt} />}
        </React.Fragment>
      ))}

      {/* Twitter */}
      {twitter?.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter?.site && <meta name="twitter:site" content={twitter.site} />}
      {twitter?.creator && (
        <meta name="twitter:creator" content={twitter.creator} />
      )}
      {twitter?.title && <meta name="twitter:title" content={twitter.title} />}
      {twitter?.description && (
        <meta name="twitter:description" content={twitter.description} />
      )}
      {twitter?.images?.map((img, index) => (
        <meta
          key={index}
          name="twitter:image"
          content={typeof img === "string" ? img : img.url}
        />
      ))}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
