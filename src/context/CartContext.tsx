import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

// =============================
// TYPES
// =============================
export interface CartItem {
  productId: string;
  quantity: number;
}

interface AddToCartProduct {
  _id: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: AddToCartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

// =============================
// PROVIDER
// =============================
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("luxe_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("luxe_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // =============================
  // SAVE TO LOCAL STORAGE
  // =============================
  useEffect(() => {
    localStorage.setItem("luxe_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("luxe_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // =============================
  // ADD TO CART
  // =============================
  const addToCart = (product: AddToCartProduct) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product._id);

      if (existing) {
        return prev.map((i) =>
          i.productId === product._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      toast.success("Added to cart");
      return [...prev, { productId: product._id, quantity: 1 }];
    });
  };

  // =============================
  // REMOVE
  // =============================
  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    toast.info("Item removed");
  };

  // =============================
  // UPDATE
  // =============================
  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    );
  };

  // =============================
  // CLEAR
  // =============================
  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  // =============================
  // WISHLIST
  // =============================
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        toast.info("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      }
      toast.success("Added to wishlist ❤️");
      return [...prev, productId];
    });
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// =============================
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
