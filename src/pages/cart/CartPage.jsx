import CartProductViewer from "./components/CartProductViewer";
import { cartPageMetadata } from "../../seo/cartSeo";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={cartPageMetadata} />
      <CartProductViewer />
    </>
  );
}
