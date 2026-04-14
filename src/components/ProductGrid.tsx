import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/services/productService";
import type { Product } from "@/types/product";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Trending <span className="text-gradient">Products</span>
        </motion.h2>

        <p className="text-center text-muted-foreground mb-12">
          Handpicked styles just for you
        </p>

        {/* ✅ Loading */}
        {loading ? (
          <p className="text-center text-muted-foreground">
            Loading products...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p, i) => (
              <motion.div
                key={p._id} // ✅ FIXED
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
