import ProfileManager from "./components/ProfileManager";
import { profilePageMetadata } from "../../seo/profileSeo";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={profilePageMetadata} />
      <ProfileManager />
    </>
  );
}
