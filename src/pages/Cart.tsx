import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            Shopping <span className="text-gradient">Cart</span>
          </motion.h1>
          <p className="text-muted-foreground mb-8">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 space-y-4"
            >
              <ShoppingBag size={64} className="mx-auto text-muted-foreground/30" />
              <p className="text-lg text-muted-foreground">Your cart is empty</p>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="neu-flat rounded-2xl bg-card p-4 flex gap-4"
                  >
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-xl object-cover shrink-0"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-semibold truncate hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">${item.product.price} each</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-2 bg-secondary rounded-xl">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
                <button
                  onClick={clearCart}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear cart
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6 h-fit sticky top-24 space-y-4"
              >
                <h2 className="text-lg font-bold">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success("Checkout coming soon!")}
                  className="w-full gradient-primary text-primary-foreground rounded-2xl py-3.5 font-medium hover:opacity-90 transition-opacity"
                >
                  Checkout
                </motion.button>
                <Link
                  to="/categories"
                  className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
