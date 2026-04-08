import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getCategoryById, products as allProducts } from "@/data/products";
import { ChevronRight } from "lucide-react";

const ProductsListing = () => {
  const { categoryId } = useParams();
  const category = categoryId ? getCategoryById(categoryId) : null;
  const items = categoryId ? getProductsByCategory(categoryId) : allProducts;

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link>
            {category && (
              <>
                <ChevronRight size={14} />
                <span className="text-foreground">{category.name}</span>
              </>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {category ? category.name : "All Products"}
          </motion.h1>
          <p className="text-muted-foreground mb-12">
            {items.length} product{items.length !== 1 ? "s" : ""} found
          </p>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products found in this category.</p>
              <Link to="/categories" className="text-primary hover:underline mt-4 inline-block">
                Browse all categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((p, i) => (
                <motion.div
                  key={p.id}
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
