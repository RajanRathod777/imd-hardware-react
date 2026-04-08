import React from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreInitializer from "./components/StoreInitializer";
import ConditionalFooter from "./components/ConditionalFooter";

export default function RootLayout({ children }) {


  return (
    <div className="w-full antialiased">
      <StoreInitializer />
      <Navbar />
      {children}
      <ConditionalFooter />
    </div>
  );
}
