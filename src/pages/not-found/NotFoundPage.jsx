import React, { useEffect } from "react";
import { Link } from "react-router";
import { AlertTriangle, Home, Wrench } from "lucide-react";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Page Not Found - IMD Hardware";

    // Add noindex meta tag to prevent search engines from indexing 404 pages
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
      document.title = "IMD Hardware";
    };
  }, []);

  return (
    <div
      className="min-h-100% flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Main Content */}
      <div className="max-w-3xl">
        {/* 404 Number */}
        <h1
          className="mb-4 tracking-tighter leading-none"
          style={{
            fontSize: "clamp(4rem, 15vw, 14rem)",
            fontFamily: "var(--font-heading)",
            color: "var(--color-primary)",
            fontWeight: "var(--font-black)",
          }}
        >
          404
        </h1>

        {/* Icon */}
        <div className="mx-auto mb-4 w-18 h-18 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
          <AlertTriangle
            className="w-10 h-10"
            style={{ color: "var(--color-primary)" }}
          />
        </div>

        {/* Title */}
        <h2
          className="mb-4"
          style={{
            fontSize: "var(--text-4xl)",
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-bold)",
          }}
        >
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p
          className="mb-5 leading-relaxed max-w-lg mx-auto"
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-text-secondary)",
          }}
        >
          The page you're looking for might have been removed, renamed, or is
          temporarily unavailable. Don't worry — we're here to help you get back
          on track.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-on-primary)",
              fontWeight: "var(--font-bold)",
              fontSize: "var(--text-lg)",
            }}
          >
            <Home className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            Back to Homepage
          </Link>

          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
              backgroundColor: "transparent",
              fontWeight: "var(--font-bold)",
              fontSize: "var(--text-lg)",
            }}
          >
            <Wrench className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
            Browse Products
          </Link>
        </div>

        {/* Fun Accent */}
        <p
          className="mt-12 italic opacity-70"
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-muted)",
          }}
        >
          Need help finding something? Try searching or contact us!
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
