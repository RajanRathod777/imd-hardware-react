import { Play } from "lucide-react";
import { useRef } from "react";

export default function DoorLockAldrop() {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div
      className="w-full min-h-screen py-6 px-4"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-body)",
        color: "var(--color-text-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Product Container */}
        <div
          className="rounded-lg p-4 sm:p-8"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border-light)",
            boxShadow: "0 4px 12px var(--shadow-soft)",
          }}
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Section */}
            <div className="space-y-4">
              <div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Product Video
                </h3>

                {/* Video Container */}
                <div
                  className="w-full aspect-video rounded-lg overflow-hidden relative"
                  style={{
                    backgroundColor: "var(--color-surface-alt)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 2px 8px var(--shadow-soft)",
                  }}
                >
                  {/* Thumbnail */}
                  <img
                    src="/images/APL_Door_Lock_Aldrop/video-thum.jpeg"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    alt="Door Lock Aldrop"
                  />

                  {/* Play Button */}
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" />
                    </div>
                  </button>

                  {/* Video */}
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                    controls
                    poster="/images/APL_Door_Lock_Aldrop/video-thum.jpeg"
                    onPlay={(e) => {
                      e.target.classList.remove("opacity-0");
                      e.target.classList.add("opacity-100");
                      e.target.classList.remove("pointer-events-none");
                    }}
                  >
                    <source
                      src="/videos/Apl_Door_Lock_Aldrop.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Price Badge for Mobile */}
              <div className="lg:hidden">
                <div
                  className="inline-block px-6 py-3 rounded-lg"
                  style={{
                    backgroundColor: "var(--color-primary-soft)",
                    border: "2px solid var(--color-primary-light)",
                  }}
                >
                  <p
                    className="text-xl font-bold"
                    style={{ color: "var(--color-primary-dark)" }}
                  >
                    ₹2,151
                  </p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header with Price for Desktop */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h1
                    className="text-2xl sm:text-3xl font-bold"
                    style={{
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Door Lock Aldrop
                  </h1>
                  <p
                    className="text-base mt-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Premium door lock with slider locking system and branded
                    cylinder mechanism
                  </p>
                </div>

                {/* Price for Desktop */}
                <div className="hidden lg:block">
                  <div
                    className="px-6 py-4 rounded-lg text-center"
                    style={{
                      backgroundColor: "var(--color-primary-soft)",
                      border: "2px solid var(--color-primary-light)",
                    }}
                  >
                    <p
                      className="text-sm mb-1"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Price
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-primary-dark)" }}
                    >
                      ₹2,151
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "High-Quality Steel", desc: "Manufactured using premium steel for maximum durability" },
                  { title: "Inside Handle", desc: "Convenient locking and unlocking from inside" },
                  { title: "Slider System", desc: "Firm grip with reliable daily operation" },
                  { title: "Branded Cylinder", desc: "Smooth key operation with enhanced security" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                      border: "1px solid var(--color-border-light)",
                    }}
                  >
                    <p
                      className="font-semibold mb-2"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {feature.title}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Product Description
                </h3>

                <div className="space-y-4">
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                      borderLeft: "4px solid var(--color-primary)",
                    }}
                  >
                    <p
                      className="leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      The <strong>Door Lock Aldrop</strong> is manufactured
                      using <strong>high-quality steel</strong>, ensuring
                      strength, durability, and long-term performance. Designed
                      for secure locking while maintaining smooth operation.
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                      borderLeft: "4px solid var(--color-primary-light)",
                    }}
                  >
                    <p
                      className="leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Features an <strong>inside handle</strong> for convenient
                      access and a <strong>slider-based locking system</strong>{" "}
                      that provides firm grip and reliable daily usage.
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                      borderLeft: "4px solid var(--color-accent-2)",
                    }}
                  >
                    <p
                      className="leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Fitted with a <strong>branded cylinder lock</strong>{" "}
                      ensuring smooth key operation and enhanced security.
                      Suitable for both residential and commercial doors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-lg font-semibold"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Product Images
              </h3>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {["1", "2", "3", "4"].length} images
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {["1", "2", "3", "4"].map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  <div
                    className="aspect-square rounded-lg overflow-hidden relative"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                      border: "1px solid var(--color-border)",
                      boxShadow: "0 2px 8px var(--shadow-soft)",
                    }}
                  >
                    <img
                      src={`/images/APL_Door_Lock_Aldrop/APL_Door_Lock_Aldrop-${item}.png`}
                      alt={`Door Lock Aldrop View ${item}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(to top, var(--shadow-medium), transparent)",
                      }}
                    />
                  </div>
                  <p
                    className="text-center text-sm mt-2 font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    View {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
