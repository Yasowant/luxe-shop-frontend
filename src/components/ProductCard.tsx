import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart, type Product } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const liked = wishlist.includes(product.id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="neu-flat rounded-2xl bg-card overflow-hidden group transition-shadow duration-300 hover:glow-primary"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={640}
            height={640}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.originalPrice && (
            <span className="absolute top-3 left-3 gradient-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </Link>

      <motion.button
        whileTap={{ scale: 1.3 }}
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 p-2 rounded-full glass z-10"
      >
        <Heart
          size={18}
          className={`transition-colors duration-200 ${liked ? "fill-destructive text-destructive" : ""}`}
        />
      </motion.button>

      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm truncate hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < product.rating ? "fill-accent text-accent" : "text-muted"}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating}.0)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all duration-300 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
