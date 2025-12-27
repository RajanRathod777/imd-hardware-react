import React from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreInitializer from "./components/StoreInitializer";
import ConditionalFooter from "./components/ConditionalFooter";
import { schemaData } from "./seo/schemaDataSeo";

export default function RootLayout({ children }) {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full antialiased">
      <StoreInitializer />
      <Navbar />
      {children}
      <ConditionalFooter />
    </div>
  );
}
