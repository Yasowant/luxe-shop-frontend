import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/services/productService";
import type { Product } from "@/types/product";

const ProductDetail = () => {
  const { id } = useParams(); // ✅ route param
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  console.log(product, "Product data");

  const { addToCart, wishlist, toggleWishlist } = useCart();

  // ✅ fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-xl text-muted-foreground mb-4">
            Product not found
          </p>
          <Link to="/" className="text-primary hover:underline">
            Browse products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ wishlist fix
  const liked = wishlist.includes(product._id);

  // ✅ discount calculation
  const discountPercent =
    product.discountPrice && product.discountPrice > product.price
      ? Math.round(
          ((product.discountPrice - product.price) / product.discountPrice) *
            100,
        )
      : 0;

  const handleBuyNow = async () => {
    if (!product) return;

    await addToCart(product); // ✅ correct
    navigate("/cart");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>{product.category}</span>
            <ChevronRight size={14} />
            <span className="text-foreground truncate max-w-[200px]">
              {product.name}
            </span>
          </div>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-muted-foreground mb-6"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="neu-flat rounded-2xl overflow-hidden"
            >
              <img
                src={product.images?.[0] || "/placeholder.png"} // ✅ FIXED
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div>
                <p className="text-sm text-primary uppercase mb-2">
                  {product.category}
                </p>

                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < product.rating
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }
                    />
                  ))}
                  <span className="text-sm text-muted-foreground">
                    ({product.rating})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">₹{product.price}</span>

                {product.discountPrice &&
                  product.discountPrice > product.price && (
                    <>
                      <span className="line-through text-muted-foreground">
                        ₹{product.discountPrice}
                      </span>
                      <span className="gradient-primary text-primary-foreground text-sm px-2 py-1 rounded">
                        -{discountPercent}%
                      </span>
                    </>
                  )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground">{product.description}</p>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-primary hover:text-white rounded-2xl py-3"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyNow}
                  className="flex-1 gradient-primary text-white rounded-2xl py-3"
                >
                  Buy Now
                </motion.button>

                <motion.button
                  whileTap={{ scale: 1.3 }}
                  onClick={() => toggleWishlist(product._id)} // ✅ FIXED
                  className="p-3 rounded-full glass"
                >
                  <Heart
                    size={20}
                    className={liked ? "fill-destructive text-destructive" : ""}
                  />
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
