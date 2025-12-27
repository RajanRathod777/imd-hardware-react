import React from "react";
import { useParams } from "react-router";
import ProductViewer from "./[productId]/components/ProductViwer";

export default function ProductPage() {
  const { productId } = useParams();
  return <ProductViewer productId={productId} />;
}
