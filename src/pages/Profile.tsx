import { motion } from "framer-motion";
import {
  User,
  Package,
  HeadphonesIcon,
  Settings,
  LogOut,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { updateProfile } from "@/services/authService";

const Profile = () => {
  const { user, logout, setUser } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // ✅ FIX: sync user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  if (!user) {
    navigate("/login");
    return null;
  }

  // ✅ FIX: update handler
  const handelUpdate = async () => {
    try {
      const res = await updateProfile(formData);
      setUser(res.user);
      setIsEditing(false); // ✅ close edit mode
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          My <span className="text-gradient">Profile</span>
        </motion.h1>

        {/* Profile Card */}
        <motion.div className="glass rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-3 py-2 rounded-lg bg-secondary mb-2 w-full"
                />
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="px-3 py-2 rounded-lg bg-secondary w-full"
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <div className="flex flex-col md:flex-row gap-2 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> {user.email}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* ✅ FIX: button logic */}
          {isEditing ? (
            <button
              onClick={handelUpdate}
              className="gradient-primary text-primary-foreground px-5 py-2 rounded-xl text-sm"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="gradient-primary text-primary-foreground px-5 py-2 rounded-xl text-sm"
            >
              Edit Profile
            </button>
          )}
        </motion.div>

        {/* rest of your code SAME (no change) */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Package, label: "Orders" },
            { icon: HeadphonesIcon, label: "Support Tickets", value: "0" },
            { icon: MapPin, label: "Your Addresses" },
            {
              icon: Settings,
              label: "Cart Items",
              value: items.length.toString(),
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-5 text-center"
            >
              <stat.icon className="mx-auto mb-2 text-primary" size={24} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Settings size={20} /> Account Settings
          </h3>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive"
          >
            <LogOut size={18} /> Logout
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
