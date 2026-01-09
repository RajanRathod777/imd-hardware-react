import React from "react";
import { useParams } from "react-router";
import ProductViewer from "./components/ProductViewer";
import SEO from "../../../components/SEO";
import { generateProductMetadata } from "../../../seo/singleProductSeo";

export default function ProductPage() {
  const { productId } = useParams();
  const [metadata, setMetadata] = React.useState(null);

  React.useEffect(() => {
    generateProductMetadata({ params: { productId } }).then(setMetadata);
  }, [productId]);

  return (
    <>
      {metadata && <SEO metadata={metadata} />}
      <ProductViewer productId={productId} />
    </>
  );
}
