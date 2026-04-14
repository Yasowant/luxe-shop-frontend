import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/services/productService";
import type { Product } from "@/types/product";
import { ChevronRight } from "lucide-react";

const ProductsListing = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(categoryId);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/categories">Categories</Link>
            <ChevronRight size={14} />
            <span className="text-foreground capitalize">{categoryId}</span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 capitalize"
          >
            {categoryId} Products
          </motion.h1>

          <p className="text-muted-foreground mb-12">
            {products.length} product
            {products.length !== 1 ? "s" : ""} found
          </p>

          {/* Loading */}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No products found in this category.
              </p>
              <Link
                to="/categories"
                className="text-primary hover:underline mt-4 inline-block"
              >
                Browse all categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p, i) => (
                <motion.div
                  key={p._id} // ✅ FIXED
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsListing;
