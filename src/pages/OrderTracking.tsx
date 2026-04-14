import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  Truck,
  MapPin,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { mockOrders, orderStatusColors } from "@/data/orders";

const statusIcons: Record<string, React.ElementType> = {
  "Order Placed": Package,
  Confirmed: CheckCircle2,
  Shipped: Truck,
  "Out for Delivery": MapPin,
  Delivered: CheckCircle2,
};

const OrderTracking = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link to="/profile" className="text-primary hover:underline">
            Back to Profile
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allStatuses = [
    "Order Placed",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];
  const currentIdx = allStatuses.findIndex(
    (s) =>
      s === order.status ||
      (order.status === "Processing" && s === "Order Placed"),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{order.id}</h1>
              <p className="text-sm text-muted-foreground">
                Placed on {order.date}
              </p>
            </div>
            <span
              className={`text-xs px-3 py-1.5 rounded-full font-medium ${orderStatusColors[order.status]}`}
            >
              {order.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              {allStatuses.map((s, i) => {
                const Icon = statusIcons[s] || Clock;
                const isActive = i <= currentIdx;
                return (
                  <div key={s} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isActive
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <span
                      className={`text-[10px] mt-1 text-center hidden sm:block ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="relative h-1 bg-secondary rounded-full mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(currentIdx / (allStatuses.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute h-full gradient-primary rounded-full"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="glass rounded-2xl p-6 mb-6">
            <h3 className="font-semibold mb-4">Tracking Timeline</h3>
            <div className="space-y-0">
              {order.timeline.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${i === order.timeline.length - 1 ? "gradient-primary" : "bg-muted-foreground/30"}`}
                    />
                    {i < order.timeline.length - 1 && (
                      <div className="w-px h-12 bg-border" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-sm">{event.status}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="glass rounded-2xl p-6 mb-6">
            <h3 className="font-semibold mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"
                >
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border/50 mt-4 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>

          {/* Shipping */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress}
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderTracking;
