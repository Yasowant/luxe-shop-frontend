import api from "@/lib/axios";

// =============================
// 🛒 TYPES
// =============================
export interface CartItemPayload {
  productId: string;
  quantity?: number;
}

// =============================
// 🛒 GET CART
// =============================
export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data;
};

// =============================
// ➕ ADD TO CART (FIXED)
// =============================
export const addToCart = async (product: { _id: string }) => {
  const res = await api.post("/cart/add", {
    productId: product._id,
    quantity: 1,
  });

  return res.data;
};

// =============================
// 🔄 UPDATE CART ITEM
// =============================
export const updateCartItem = async (productId: string, quantity: number) => {
  const res = await api.put("/cart/update", {
    productId,
    quantity,
  });

  return res.data;
};

// =============================
// ❌ REMOVE ITEM
// =============================
export const removeCartItem = async (productId: string) => {
  const res = await api.delete(`/cart/remove/${productId}`);
  return res.data;
};

// =============================
// 🧹 CLEAR CART
// =============================
export const clearCart = async () => {
  const res = await api.delete("/cart/clear");
  return res.data;
};
