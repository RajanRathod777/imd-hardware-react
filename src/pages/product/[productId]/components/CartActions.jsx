import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useStore } from "../../../../stores/useStore";
import { useState } from "react";

const CartActions = ({ product, inCart }) => {
  const { addToCart, updateCartQuantity, removeFromCart } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    addToCart(product, 1);
    setIsAdding(false);
  };

  if (inCart) {
    return (
      <div
        className="pt-6 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-4">
          <QuantityControls
            product={product}
            inCart={inCart}
            onUpdateQuantity={updateCartQuantity}
          />
          <RemoveButton
            productId={product.product_id}
            onRemove={removeFromCart}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="pt-6 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <AddToCartButton
        product={product}
        onAddToCart={handleAddToCart}
        isAdding={isAdding}
      />
    </div>
  );
};

const QuantityControls = ({ product, inCart, onUpdateQuantity }) => (
  <div
    className="flex items-center gap-1 border rounded-lg p-1"
    style={{
      backgroundColor: "var(--color-surface)",
      borderColor: "var(--color-border-light)",
    }}
  >
    <button
      className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:bg-[var(--color-bg-alt)]"
      style={{ color: "var(--color-text-secondary)" }}
      onClick={(e) => {
        e.preventDefault();
        onUpdateQuantity(product.product_id, inCart.quantity - 1);
      }}
      disabled={inCart.quantity <= 1}
    >
      <Minus size={14} />
    </button>

    <span
      className="min-w-8 text-center"
      style={{
        color: "var(--color-text-primary)",
        fontWeight: "var(--font-bold)",
        fontSize: "var(--text-base)",
      }}
    >
      {inCart.quantity}
    </span>

    <button
      className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:bg-[var(--color-bg-alt)]"
      style={{ color: "var(--color-text-secondary)" }}
      onClick={(e) => {
        e.preventDefault();
        onUpdateQuantity(product.product_id, inCart.quantity + 1);
      }}
      disabled={inCart.quantity >= product.max_quantity}
    >
      <Plus size={14} />
    </button>
  </div>
);

const RemoveButton = ({ productId, onRemove }) => (
  <button
    className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-95"
    style={{
      backgroundColor: "var(--color-danger)",
      color: "var(--color-text-on-primary)",
      fontWeight: "var(--font-semibold)",
      fontSize: "var(--text-sm)",
    }}
    onClick={(e) => {
      e.preventDefault();
      onRemove(productId);
    }}
  >
    <Trash2 size={16} />
    Remove
  </button>
);

const AddToCartButton = ({ product, onAddToCart, isAdding }) => (
  <button
    className={`w-full flex items-center justify-center gap-2 py-3.5 px-8 rounded-lg transition-all duration-300 active:scale-98 ${
      product.max_quantity === 0
        ? "opacity-50 cursor-not-allowed"
        : "hover:opacity-90"
    } ${isAdding ? "opacity-75 cursor-wait" : ""}`}
    style={{
      backgroundColor: "var(--color-text-primary)",
      color: "var(--color-text-on-primary)",
      fontWeight: "var(--font-semibold)",
      fontSize: "var(--text-base)",
    }}
    onClick={onAddToCart}
    disabled={isAdding || product.max_quantity === 0}
  >
    <ShoppingCart size={18} />
    {product.max_quantity === 0 ? "Out of Stock" : "Add to Cart"}
  </button>
);

export default CartActions;
