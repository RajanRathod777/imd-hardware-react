import UpdatePassword from "./components/UpdatePassword";
import { updatePasswordPageMetadata } from "../../seo/updatePasswordSeo";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={updatePasswordPageMetadata} />
      <UpdatePassword />
    </>
  );
}
