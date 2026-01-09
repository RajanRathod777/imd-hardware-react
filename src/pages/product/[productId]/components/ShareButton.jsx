import { useState, useRef, useEffect } from "react";
import {
  Share2,
  X,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Link,
  Check,
  Mail,
  MessageSquare,
} from "lucide-react";

const ShareButton = ({ product }) => {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowSharePopup(false);
      }
    };

    if (showSharePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSharePopup]);

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = product?.title || "Check out this product";
    const text = `Check out ${title}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}&quote=${encodeURIComponent(title)}`,
          "_blank",
          "width=600,height=400"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(text)}`,
          "_blank",
          "width=600,height=400"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank",
          "width=600,height=400"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${text} - ${url}`)}`,
          "_blank"
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(
            title
          )}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
          "_blank"
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setLinkCopied(true);
          setTimeout(() => setLinkCopied(false), 3000);
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          setLinkCopied(true);
          setTimeout(() => setLinkCopied(false), 3000);
        }
        break;
    }
    setShowSharePopup(false);
  };

  const sharePlatforms = [
    {
      platform: "facebook",
      icon: Facebook,
      label: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      platform: "twitter",
      icon: Twitter,
      label: "Twitter",
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      platform: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      platform: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      platform: "telegram",
      icon: MessageSquare,
      label: "Telegram",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      platform: "email",
      icon: Mail,
      label: "Email",
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  return (
    <div className="relative" ref={popupRef}>
      {/* Share Button */}
      <button
        className="backdrop-blur-sm p-3 rounded-full shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105 group"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border-light)",
        }}
        onClick={() => setShowSharePopup(!showSharePopup)}
        aria-label="Share product"
      >
        <Share2
          size={16}
          className="transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
        />
      </button>

      {/* Share Popup */}
      {showSharePopup && (
        <div
          className="absolute right-0 top-14 rounded-xl shadow-2xl border p-6 min-w-64 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between mb-4 pb-3 border-b"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <div>
              <h3
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-semibold)",
                }}
              >
                Share this product
              </h3>
              <p
                className="mt-1"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Spread the word with friends
              </p>
            </div>
            <button
              onClick={() => setShowSharePopup(false)}
              className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-100"
              aria-label="Close share menu"
            >
              <X size={14} style={{ color: "var(--color-text-muted)" }} />
            </button>
          </div>

          {/* Share Platforms Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {sharePlatforms.map(({ platform, icon: Icon, label, color }) => (
              <SharePlatformButton
                key={platform}
                platform={platform}
                icon={Icon}
                label={label}
                color={color}
                onShare={handleShare}
              />
            ))}
          </div>

          {/* Copy Link Section */}
          <div
            className="pt-3 border-t"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Link size={12} style={{ color: "var(--color-text-muted)" }} />
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                  fontWeight: "var(--font-medium)",
                }}
              >
                Copy product link
              </span>
            </div>

            <div className="flex gap-2">
              <div
                className="flex-1 border rounded-lg px-3 py-2"
                style={{
                  backgroundColor: "var(--color-bg-alt)",
                  borderColor: "var(--color-border)",
                }}
              >
                <p
                  className="truncate"
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {window.location.hostname}
                </p>
              </div>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border transition-all duration-200"
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-medium)",
                  ...(linkCopied
                    ? {
                        backgroundColor: "var(--color-success-light)",
                        borderColor: "var(--color-success-light)",
                        color: "var(--color-success)",
                      }
                    : {
                        backgroundColor: "var(--color-text-primary)",
                        borderColor: "var(--color-text-primary)",
                        color: "var(--color-text-on-primary)",
                      }),
                }}
              >
                {linkCopied ? (
                  <>
                    <Check
                      size={14}
                      style={{ color: "var(--color-success)" }}
                    />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Link size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SharePlatformButton = ({
  platform,
  icon: Icon,
  label,
  color,
  onShare,
}) => (
  <button
    onClick={() => onShare(platform)}
    className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 group hover:bg-gray-50"
    aria-label={`Share on ${label}`}
  >
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${color} shadow-sm group-hover:shadow-md`}
    >
      <Icon size={16} className="text-white" />
    </div>
    <span
      className=""
      style={{
        fontSize: "var(--text-xs)",
        color: "var(--color-text-secondary)",
        fontWeight: "var(--font-medium)",
      }}
    >
      {label}
    </span>
  </button>
);

export default ShareButton;
