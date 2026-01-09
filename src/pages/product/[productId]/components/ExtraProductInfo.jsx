import { Loader2, Sparkles, FileText } from "lucide-react";

const ExtraProductInfo = ({ extraDetails, loading }) => {
  if (loading) {
    return (
      <div
        className="flex items-center justify-center gap-3 p-8 rounded-2xl border shadow-sm"
        style={{
          color: "var(--color-text-muted)",
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border-light)",
        }}
      >
        <Loader2
          size={16}
          className="animate-spin"
          style={{ color: "var(--color-text-muted)" }}
        />
        <span
          style={{
            color: "var(--color-text-secondary)",
            fontWeight: "var(--font-medium)",
            fontSize: "var(--text-sm)",
          }}
        >
          Loading product details...
        </span>
      </div>
    );
  }

  if (!extraDetails) return null;

  return (
    <div className="space-y-6">
      {/* Short Description */}
      {extraDetails.short_description && (
        <div
          className="rounded-lg p-6 border transition-all duration-300"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-bg-alt)]">
              <Sparkles size={16} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <h3
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-bold)",
                }}
              >
                Product Highlights
              </h3>
              <p
                style={{
                  color: "var(--color-primary)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-medium)",
                }}
              >
                Key features & benefits
              </p>
            </div>
          </div>
          <div
            className="rounded-lg p-4 border"
            style={{
              color: "var(--color-text-secondary)",
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-border-light)",
              lineHeight: "var(--leading-relaxed)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-normal)",
            }}
            dangerouslySetInnerHTML={{
              __html: extraDetails.short_description,
            }}
          ></div>
        </div>
      )}

      {/* Full Description */}
      {extraDetails.description && (
        <div
          className="rounded-lg p-6 border transition-all duration-300"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-bg-alt)]">
              <FileText
                size={16}
                style={{ color: "var(--color-text-secondary)" }}
              />
            </div>
            <div>
              <h3
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-bold)",
                }}
              >
                Detailed Description
              </h3>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-medium)",
                }}
              >
                Complete product information
              </p>
            </div>
          </div>
          <div
            className="prose max-w-none rounded-lg p-4 border"
            style={{
              color: "var(--color-text-secondary)",
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-border-light)",
              lineHeight: "var(--leading-relaxed)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-normal)",
            }}
            dangerouslySetInnerHTML={{
              __html: extraDetails.description,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ExtraProductInfo;
