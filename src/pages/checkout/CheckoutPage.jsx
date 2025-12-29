import Checkout from "./components/Checkout";
import { checkoutPageMetadata } from "../../seo/checkoutSeo";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={checkoutPageMetadata} />
      <Checkout />
    </>
  );
}
