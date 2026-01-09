import { Hammer, Wrench, Shield, Trophy } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Background */}
      <div
        className="relative py-32 md:py-40 text-center"
        style={{
          background: "var(--gradient-primary)",
          color: "var(--color-text-on-primary)",
        }}
      >
        {/* Subtle Overlay Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, var(--color-primary-dark) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, var(--color-primary-light) 0%, transparent 50%)`,
          }}
        />

        {/* Floating Icons Decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Hammer
            className="absolute top-10 left-10 w-24 h-24 opacity-20 animate-pulse"
            style={{ animationDelay: "0s" }}
          />
          <Wrench
            className="absolute bottom-20 right-20 w-32 h-32 opacity-15 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <Shield
            className="absolute top-1/3 right-1/4 w-20 h-20 opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <Trophy
            className="absolute bottom-1/4 left-1/3 w-28 h-28 opacity-15 animate-pulse"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1
            className="mb-8 tracking-tight"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-5xl)",
              fontWeight: "var(--font-bold)",
              lineHeight: "1.25",
            }}
            // Responsive override for larger screens
            // Using inline media query via style for consistency
          >
            <span
              className="hidden md:inline"
              style={{ fontSize: "var(--text-6xl)" }}
            >
              Building the Future
            </span>
            <span className="md:hidden">Building the Future</span>
          </h1>

          <p
            className="mx-auto max-w-3xl opacity-95"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xl)",
              lineHeight: "1.625",
            }}
          >
            <span
              className="hidden md:inline"
              style={{ fontSize: "var(--text-2xl)" }}
            >
              Premium hardware solutions trusted by professionals and
              visionaries for over 15 years.
            </span>
            <span className="md:hidden">
              Premium hardware solutions trusted by professionals and
              visionaries for over 15 years.
            </span>
          </p>

          {/* Optional subtle call-to-action or tagline accent */}
          <div className="mt-12">
            <p
              className="uppercase tracking-wider opacity-80"
              style={{
                letterSpacing: "var(--tracking-wide)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              Quality • Durability • Innovation
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave/Fade Transition (optional elegance) */}
      <div
        className="relative h-16 -mt-1"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
          style={{ fill: "var(--color-primary)" }}
        >
          <path
            d="M0,0 C280,80 720,120 1440,40 L1440,120 L0,120 Z"
            opacity="0.15"
          />
        </svg>
      </div>
    </section>
  );
}
