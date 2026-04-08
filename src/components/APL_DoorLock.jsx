import { Play, X } from "lucide-react";
import { useRef, useState } from "react";

export default function DoorLockAldrop() {
  const videoRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const openImageModal = (imageIndex) => {
    setSelectedImage(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev < 3 ? prev + 1 : 0));
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : 3));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isModalOpen) return;

    if (e.key === "Escape") {
      closeImageModal();
    } else if (e.key === "ArrowRight") {
      handleNextImage();
    } else if (e.key === "ArrowLeft") {
      handlePrevImage();
    }
  };

  // Add keyboard event listener
  useState(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const images = ["1", "2", "3", "4"];

  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "var(--font-body)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeImageModal}
        >
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-60 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-60"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-60"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-60 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Image Container */}
          <div
            className="relative w-full max-w-4xl h-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/images/APL_Door_Lock_Aldrop/APL_Door_Lock_Aldrop-${images[selectedImage]}.png`}
              alt={`Door Lock Aldrop View ${selectedImage + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="mx-auto">
        {/* Main Product Container */}
        <div
          className="rounded-lg p-3 sm:p-8"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border-light)",
            boxShadow: "0 4px 12px var(--shadow-soft)",
          }}
        >
          {/* Top Section */}
          <div className="grid grid-cols-1  gap-8">
            {/* Video Section */}
            <div className="space-y-4 max-w-4xl mx-auto">
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
                  className="aspect-video rounded-md overflow-hidden relative"
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
                    aria-label="Play video"
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
                    muted
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
                    style={{
                      color: "var(--color-primary-dark)",
                    }}
                  >
                    ₹ 2,199
                  </p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header with Price for Desktop */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h2
                    className="text-2xl sm:text-3xl font-bold"
                    style={{
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Door Lock Aldrop
                  </h2>
                  <p
                    className="text-base mt-2"
                    style={{
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Premium door lock with a slider locking system and an
                    innovative cylinder lock mechanism
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
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Price
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: "var(--color-primary-dark)",
                      }}
                    >
                      ₹ 2,199
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "High-Quality Steel",
                    desc: "Manufactured using premium steel for maximum durability",
                  },
                  {
                    title: "Inside Lock",
                    desc: "Convenient locking and unlocking from inside",
                  },
                  {
                    title: "Slider System",
                    desc: "Firm grip with reliable daily operation",
                  },
                  {
                    title: "Innovative Cylinder",
                    desc: "Smooth key operation with enhanced security",
                  },
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
                      style={{
                        color: "var(--color-primary)",
                      }}
                    >
                      {feature.title}
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
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
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
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
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Features an <strong>inside Lock</strong> for convenient
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
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Fitted with a{" "}
                      <strong>new innovative cylinder lock</strong> ensuring
                      smooth key operation and enhanced security. Suitable for
                      both residential and commercial doors.
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-bg-alt)",
                      borderLeft: "4px solid var(--color-accent-1)",
                    }}
                  >
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Built with a{" "}
                      <strong>high-efficiency internal mechanism</strong>, the
                      Door Lock Aldrop delivers consistently smooth performance
                      with minimal wear. Engineered for a{" "}
                      <strong>long operational life</strong>, it maintains
                      reliable locking strength even after years of frequent
                      use.
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
                      style={{
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Door Lock Aldrop is manufactured using all high-quality
                      premium metals.
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
                {images.length} images
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((item, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => openImageModal(index)}
                >
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
                      alt={`Door Lock Aldrop image ${index + 1}`}
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
                    {/* Zoom overlay icon */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-6 h-6 text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="text-center text-sm mt-2 font-medium"
                    style={{
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    image {index + 1}
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
