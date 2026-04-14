import api from "@/lib/axios";
import { Product } from "@/types/product";

// =============================
// ✅ CREATE PRODUCT (ADMIN)
// =============================
export const createProduct = async (data: FormData) => {
  const res = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const getProductsByCategory = async (category: string) => {
  const res = await api.get(`/products?category=${category}`);
  return res.data;
};
