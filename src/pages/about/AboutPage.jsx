import AboutPage from "./components/AboutPage";
import SEO from "../../components/SEO";
import { metadata as aboutMetadata } from "../../seo/aboutSeo";

export default function Page() {
  return (
    <>
      <SEO metadata={aboutMetadata} />
      <AboutPage />
    </>
  );
}
