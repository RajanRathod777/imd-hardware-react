import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import RootLayout from "./layout";

import RegistrationForm from "./pages/register/RegisterPage";
import LoginForm from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomepPage";
import UpdatePassword from "./pages/updatepassword/UpdatePasswordPage";
import ResetPasswordPage from "./pages/resetpassword/ResetpasswordPage";
import CartProductViewer from "./pages/cart/CartPage";
import ContactPage from "./pages/contact/ContactPage";
import Reward from "./pages/rewards/RewardsPage";
import AboutPage from "./pages/about/AboutPage";
import Checkout from "./pages/checkout/CheckoutPage";
import Products from "./pages/products/ProductsPage";
import ProfileManager from "./pages/profile/ProfilePage";
import ProductPage from "./pages/product/ProductPage";
import RewardClaimPage from "./pages/reward-claim/RewardClaimPage";
import ReviewPage from "./pages/review/ReviewPage";
import PrivacyPolicyPage from "./pages/privacy-policy/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/terms-conditions/TermsConditionsPage";
import ReturnPolicyPage from "./pages/return-policy/ReturnPolicyPage";
import ShippingPolicyPage from "./pages/shipping-policy/ShippingPolicyPage";
import CancellationPolicyPage from "./pages/cancellation-policy/CancellationPolicyPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout>
          <HomePage />
        </RootLayout>
      ),
    },
    {
      path: "/about",
      element: (
        <RootLayout>
          <AboutPage />
        </RootLayout>
      ),
    },
    {
      path: "/products",
      element: (
        <RootLayout>
          <Products />
        </RootLayout>
      ),
    },
    {
      path: "/product/:productId",
      element: (
        <RootLayout>
          <ProductPage />
        </RootLayout>
      ),
    },
    {
      path: "/rewards",
      element: (
        <RootLayout>
          <Reward />
        </RootLayout>
      ),
    },
    {
      path: "/reward-claim/:rewardId",
      element: (
        <RootLayout>
          <RewardClaimPage />
        </RootLayout>
      ),
    },
    {
      path: "/contact",
      element: (
        <RootLayout>
          <ContactPage />
        </RootLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <RootLayout>
          <LoginForm />
        </RootLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <RootLayout>
          <RegistrationForm />
        </RootLayout>
      ),
    },
    {
      path: "/updatepassword",
      element: (
        <RootLayout>
          <UpdatePassword />
        </RootLayout>
      ),
    },
    {
      path: "/resetpassword",
      element: (
        <RootLayout>
          <ResetPasswordPage />
        </RootLayout>
      ),
    },
    {
      path: "/profile",
      element: (
        <RootLayout>
          <ProfileManager />
        </RootLayout>
      ),
    },
    {
      path: "/cart",
      element: (
        <RootLayout>
          <CartProductViewer />
        </RootLayout>
      ),
    },
    {
      path: "/checkout",
      element: (
        <RootLayout>
          <Checkout />
        </RootLayout>
      ),
    },
    {
      path: "/review/:orderId/:productId",
      element: (
        <RootLayout>
          <ReviewPage />
        </RootLayout>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <RootLayout>
          <PrivacyPolicyPage />
        </RootLayout>
      ),
    },
    {
      path: "/terms-conditions",
      element: (
        <RootLayout>
          <TermsConditionsPage />
        </RootLayout>
      ),
    },
    {
      path: "/return-policy",
      element: (
        <RootLayout>
          <ReturnPolicyPage />
        </RootLayout>
      ),
    },
    {
      path: "/shipping-policy",
      element: (
        <RootLayout>
          <ShippingPolicyPage />
        </RootLayout>
      ),
    },
    {
      path: "/cancellation-policy",
      element: (
        <RootLayout>
          <CancellationPolicyPage />
        </RootLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
