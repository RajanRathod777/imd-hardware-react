import ContactPage from "./components/ContactViewer";
import { contactPageMetadata } from "../../seo/contactSeo";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={contactPageMetadata} />
      <ContactPage />
    </>
  );
}
