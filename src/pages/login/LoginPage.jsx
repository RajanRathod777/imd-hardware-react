
import LoginForm from "./components/LoginForm";
import { loginPageMetadata } from "../../seo/loginSeo";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <>
      <SEO metadata={loginPageMetadata} />
      <LoginForm />
    </>
  );
}
