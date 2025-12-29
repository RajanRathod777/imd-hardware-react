import CartProductViewer from "./components/CartProductViewer";
import { metadata as cartPageMetadata } from "../../seo/cartSeo";
import SEO from "../../components/SEO";


export default function Page() {
  return (
    <>
      <SEO metadata={cartPageMetadata} />
      <CartProductViewer />
    </>

  );
}
