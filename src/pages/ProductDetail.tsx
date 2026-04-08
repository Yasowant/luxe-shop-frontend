import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById, getCategoryById } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productId ? getProductById(productId) : null;
  const category = product ? getCategoryById(product.category) : null;
  const { addToCart, wishlist, toggleWishlist } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-xl text-muted-foreground mb-4">Product not found</p>
          <Link to="/categories" className="text-primary hover:underline">Browse products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const liked = wishlist.includes(product.id);

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link>
            {category && (
              <>
                <ChevronRight size={14} />
                <Link to={`/products/${category.id}`} className="hover:text-foreground transition-colors">{category.name}</Link>
              </>
            )}
            <ChevronRight size={14} />
            <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
          </div>

          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="neu-flat rounded-2xl overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div>
                <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
                  {category?.name}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < product.rating ? "fill-accent text-accent" : "text-muted"} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.rating}.0)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                    <span className="gradient-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded-lg">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-3 pt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-2xl py-3.5 font-medium transition-all duration-300"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyNow}
                  className="flex-1 gradient-primary text-primary-foreground rounded-2xl py-3.5 font-medium hover:opacity-90 transition-opacity"
                >
                  Buy Now
                </motion.button>
                <motion.button
                  whileTap={{ scale: 1.3 }}
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 rounded-full glass"
                >
                  <Heart size={20} className={liked ? "fill-destructive text-destructive" : ""} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetail;
