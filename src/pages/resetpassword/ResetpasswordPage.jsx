import ResetPasswordPage from "./components/ResetPasswordPage";
import { resetPasswordPageMetadata } from "../../seo/resetPasswordSeo";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={resetPasswordPageMetadata} />
      <ResetPasswordPage />
    </>
  );
}
