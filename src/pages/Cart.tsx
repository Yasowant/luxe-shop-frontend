import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import { toast } from "sonner";
import { CartItem, CartProduct } from "@/types/cart";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems } =
    useCart();

  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const navigate = useNavigate();
  // ✅ FETCH PRODUCT DETAILS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const results = await Promise.allSettled(
          items.map(async (item: CartItem) => {
            try {
              if (!item.productId) return null;

              const product = await getProductById(item.productId);

              return {
                _id: product._id,
                name: product.name,
                price: product.price,
                images: product.images,
                quantity: item.quantity,
              };
            } catch (err) {
              console.error("Product fetch failed:", item.productId);
              return null;
            }
          }),
        );

        const validProducts = results
          .map((r) => (r.status === "fulfilled" ? r.value : null))
          .filter(Boolean) as CartProduct[];

        setCartProducts(validProducts);
      } catch (err) {
        console.error("Cart load failed", err);
      }
    };

    if (items.length > 0) loadProducts();
    else setCartProducts([]);
  }, [items]);

  // ✅ TOTAL PRICE
  const totalPrice = cartProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  useEffect(() => {
    if (cartProducts.length === 0 && items.length === 0) {
      navigate("/");
    }
  }, [cartProducts, items]);

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

          <p className="text-muted-foreground mb-8">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>

          {cartProducts.length === 0 ? (
            <motion.div className="text-center py-20 space-y-4">
              <ShoppingBag
                size={64}
                className="mx-auto text-muted-foreground/30"
              />
              <p className="text-lg text-muted-foreground">
                Your cart is empty
              </p>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 gradient-primary px-6 py-3 rounded-2xl"
              >
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-4">
                {cartProducts.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="neu-flat rounded-2xl bg-card p-4 flex gap-4"
                  >
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link to={`/product/${item._id}`}>
                        <h3 className="font-semibold hover:text-primary">
                          {item.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground">
                        ₹{item.price}
                      </p>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-2 bg-secondary rounded-xl">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) {
                                removeFromCart(item._id);
                                toast.info("Item removed");

                                // 👉 if last item → go home
                                if (cartProducts.length === 1) {
                                  navigate("/");
                                }
                              } else {
                                updateQuantity(item._id, item.quantity - 1);
                              }
                            }}
                            className="p-2"
                          >
                            <Minus size={14} />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="p-2"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="text-right">
                      <span className="font-bold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </motion.div>
                ))}

                <button onClick={clearCart} className="text-sm text-red-500">
                  Clear cart
                </button>
              </div>

              {/* RIGHT */}
              <div className="glass rounded-2xl p-6 h-fit sticky top-24 space-y-4">
                <h2 className="text-lg font-bold">Order Summary</h2>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>

                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success("Checkout coming soon!")}
                  className="w-full gradient-primary rounded-2xl py-3 text-white"
                >
                  Checkout
                </motion.button>

                <Link
                  to="/categories"
                  className="flex justify-center gap-1 text-sm"
                >
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
