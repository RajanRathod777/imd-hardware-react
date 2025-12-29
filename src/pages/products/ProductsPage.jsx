import { productsPageMetadata } from "../../seo/productsSeo";
import Products from "./components/Products";
import { Suspense } from "react";
import Loading from "../../components/Loading";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={productsPageMetadata} />
      <Suspense fallback={<Loading />}>
        <Products />
      </Suspense>
    </>
  );
}
