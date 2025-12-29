import RegistrationForm from "./components/RegistrationForm";
import { registerPageMetadata } from "../../seo/registerSeo";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={registerPageMetadata} />
      <RegistrationForm />
    </>
  );
}
