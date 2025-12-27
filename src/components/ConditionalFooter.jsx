"use client";

import { useLocation } from "react-router";
import Footer from "./Footer";

const ConditionalFooter = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Pages where footer should be hidden
  const hideFooterPages = [
    "/login",
    "/register",
    "/profile",
    "/checkout",
    "/cart",
    "/updatepassword",
    "/resetpassword",
  ];

  // Check if current page should hide footer
  const shouldHideFooter = hideFooterPages.includes(pathname);

  // Don't render footer on specified pages
  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
};

export default ConditionalFooter;
