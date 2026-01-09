import AboutMain from "./components/AboutMain";
import SEO from "../../components/SEO";
import { metadata as aboutMetadata } from "../../seo/aboutSeo";

export default function Page() {
  return (
    <>
      <SEO metadata={aboutMetadata} />
      <AboutMain />
    </>
  );
}
