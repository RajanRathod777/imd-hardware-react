import CartActions from "./CartActions";
import {
  Star,
  Check,
  Loader2,
  Shield,
  Truck,
  RotateCcw,
  Ruler,
  Component,
  Palette,
  Box,
  Info,
} from "lucide-react";
import { useStore } from "../../../../stores/useStore";

const ProductInfo = ({ product, extraDetails, loading }) => {
  const { cart } = useStore();
  const inCart = cart.find((p) => p.product_id === product.product_id);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "" : ""}
        style={
          index < rating
            ? {
                fill: "var(--color-secondary)",
                color: "var(--color-secondary)",
              }
            : { color: "var(--color-border-strong)" }
        }
      />
    ));
  };

  return (
    <div className="space-y-8">
      <ProductHeader
        product={product}
        inCart={inCart}
        renderStars={renderStars}
      />

      <TrustBadges />

      <ProductDetailsGrid product={product} extraDetails={extraDetails} />

      <CartActions product={product} inCart={inCart} />
    </div>
  );
};

const ProductHeader = ({ product, inCart, renderStars }) => (
  <div className="space-y-4">
    {/* Category and Status Badges */}
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className="px-3 py-1 rounded-lg border"
        style={{
          fontSize: "var(--text-xs)",
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text-secondary)",
          fontWeight: "var(--font-semibold)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
        }}
      >
        {product.category_name}
      </span>
      {inCart && (
        <span
          className="flex items-center gap-1 px-3 py-1 rounded-lg border"
          style={{
            fontSize: "var(--text-xs)",
            backgroundColor: "var(--color-success-light)",
            color: "var(--color-success)",
            borderColor: "rgba(40, 167, 69, 0.2)",
            fontWeight: "var(--font-semibold)",
          }}
        >
          <Check size={12} />
          In Cart
        </span>
      )}
    </div>

    {/* Title and Name */}
    <div className="space-y-1">
      <h1
        className="leading-tight"
        style={{
          fontSize: "var(--text-3xl)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-heading)",
          fontWeight: "var(--font-bold)",
        }}
      >
        {product.title}
      </h1>
      <p
        style={{
          fontSize: "var(--text-base)",
          color: "var(--color-text-muted)",
          fontWeight: "var(--font-medium)",
        }}
      >
        {product.name}
      </p>
    </div>

    {/* Rating and Emoji */}
    <div className="flex items-center gap-4">
      <div
        className="flex items-center gap-2 border rounded-lg px-3 py-1.5"
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex items-center gap-1">
          {renderStars(product.star_rating || 0)}
        </div>
        <span
          className="ml-1"
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-text-secondary)",
            fontWeight: "var(--font-semibold)",
          }}
        >
          {product.star_rating || 0} Rating
        </span>
      </div>
      <span style={{ fontSize: "var(--text-xl)" }}>{product.emoji}</span>
    </div>

    {/* Price and Stock */}
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <span
          style={{
            fontSize: "var(--text-3xl)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-bold)",
          }}
        >
          ${product.price}
        </span>
        {product.original_price && product.original_price > product.price && (
          <span
            className="line-through"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-light)",
            }}
          >
            ${product.original_price}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor:
              product.max_quantity > 10
                ? "var(--color-success)"
                : product.max_quantity > 0
                ? "var(--color-warning)"
                : "var(--color-danger)",
          }}
        ></div>
        <span
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            fontWeight: "var(--font-medium)",
          }}
        >
          {product.max_quantity > 10
            ? `In Stock (${product.max_quantity} available)`
            : product.max_quantity > 0
            ? `Low Stock (${product.max_quantity} left)`
            : "Out of Stock"}
        </span>
      </div>
    </div>
  </div>
);

const TrustBadges = () => (
  <div
    className="flex items-center justify-between py-6 border-y"
    style={{ borderColor: "var(--color-border-light)" }}
  >
    <div
      className="flex items-center gap-2"
      style={{
        fontSize: "var(--text-xs)",
        color: "var(--color-text-secondary)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        fontWeight: "var(--font-medium)",
      }}
    >
      <Truck size={14} style={{ color: "var(--color-text-light)" }} />
      <span>Free Shipping</span>
    </div>
    <div
      className="flex items-center gap-2"
      style={{
        fontSize: "var(--text-xs)",
        color: "var(--color-text-secondary)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        fontWeight: "var(--font-medium)",
      }}
    >
      <Shield size={14} style={{ color: "var(--color-text-light)" }} />
      <span>2-Year Warranty</span>
    </div>
    <div
      className="flex items-center gap-2"
      style={{
        fontSize: "var(--text-xs)",
        color: "var(--color-text-secondary)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        fontWeight: "var(--font-medium)",
      }}
    >
      <RotateCcw size={14} style={{ color: "var(--color-text-light)" }} />
      <span>30-Day Returns</span>
    </div>
  </div>
);

const ProductDetailsGrid = ({ product, extraDetails }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-1 h-4 bg-[var(--color-primary)] rounded-full"></div>
      <h3
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
          fontWeight: "var(--font-bold)",
        }}
      >
        Specifications
      </h3>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <DetailItem label="Size" value={product.size} icon={Ruler} />
      <DetailItem label="Material" value={product.material} icon={Component} />
      <DetailItem
        label="Color"
        value={extraDetails?.color || product.color}
        icon={Palette}
      />
      <DetailItem
        label="Available Stock"
        value={`${product.max_quantity} units`}
        icon={Box}
      />
    </div>
  </div>
);

const DetailItem = ({ label, value, icon: Icon }) => (
  <div
    className="flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:border-[var(--color-border-strong)]"
    style={{
      backgroundColor: "var(--color-surface)",
      borderColor: "var(--color-border-light)",
    }}
  >
    <div className="p-1.5 rounded-md bg-[var(--color-bg-alt)]">
      <Icon size={12} style={{ color: "var(--color-text-secondary)" }} />
    </div>
    <div className="flex flex-col">
      <span
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--color-text-light)",
          fontWeight: "var(--font-medium)",
        }}
      >
        {label}
      </span>
      <p
        className="truncate max-w-[120px]"
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--color-text-primary)",
          fontWeight: "var(--font-semibold)",
        }}
      >
        {value}
      </p>
    </div>
  </div>
);

export default ProductInfo;
