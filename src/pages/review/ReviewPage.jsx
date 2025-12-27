import React from "react";
import { useParams } from "react-router";
import ReviewManagement from "./[orderId]/[productId]/components/ReviewManagement";

export default function ReviewPage() {
  const { orderId, productId } = useParams();
  return <ReviewManagement orderId={orderId} productId={productId} />;
}
