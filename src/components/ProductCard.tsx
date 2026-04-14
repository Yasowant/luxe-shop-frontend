import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, wishlist, toggleWishlist, items } = useCart();

  // ✅ use _id (not id)
  const liked = wishlist.includes(product._id);

  const isInCart = items.some((items) => {
    return items.productId === product._id;
  });

  // ✅ discount calculation
  const discountPercent =
    product.discountPrice && product.discountPrice > product.price
      ? Math.round(
          ((product.discountPrice - product.price) / product.discountPrice) *
            100,
        )
      : 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="neu-flat rounded-2xl bg-card overflow-hidden group transition-shadow duration-300 hover:glow-primary"
    >
      {/* Product Link */}
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images?.[0] || "/placeholder.png"} // ✅ FIXED
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 gradient-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">
              -{discountPercent}%
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      <motion.button
        whileTap={{ scale: 1.3 }}
        onClick={() => toggleWishlist(product._id)} // ✅ FIXED
        className="absolute top-3 right-3 p-2 rounded-full glass z-10"
      >
        <Heart
          size={18}
          className={`transition-colors duration-200 ${
            liked ? "fill-destructive text-destructive" : ""
          }`}
        />
      </motion.button>

      {/* Content */}
      <div className="p-4 space-y-2">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-sm truncate hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < product.rating ? "fill-accent text-accent" : "text-muted"
              }
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold">₹{product.price}</span>

          {product.discountPrice && product.discountPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.discountPrice}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          whileTap={{ scale: isInCart ? 1 : 0.95 }}
          onClick={() => {
            if (!isInCart) addToCart(product);
          }}
          disabled={isInCart}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all duration-300 
    ${
      isInCart
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
    }`}
        >
          <ShoppingCart size={16} />
          {isInCart ? "Go to Cart" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
