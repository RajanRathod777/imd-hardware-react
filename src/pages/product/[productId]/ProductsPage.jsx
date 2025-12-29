import React from "react";
import { useParams } from "react-router";
import ProductViewer from "./components/ProductViwer";
import SEO from "../../../components/SEO";
import { generateProductMetadata } from "../../../seo/singleProductSeo";

export default function ProductPage() {
  const { productId } = useParams();
  const metadata = generateProductMetadata({ params: { productId } });
  
  return (
    <>
      <SEO metadata={metadata} />
      <ProductViewer productId={productId} />
    </>
  );
}
