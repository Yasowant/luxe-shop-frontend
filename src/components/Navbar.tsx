import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { logoutUser } from "@/services/authService";

const Navbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { totalItems, wishlist } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // ✅ call backend
    } catch (err) {
      console.error("Logout error", err);
    }

    logout(); // ✅ clear local state
    navigate("/");
  };

  const links = [
    { label: "Home", to: "/" },
    { label: "Categories", to: "/categories" },
    ...(user && !isAdmin ? [{ label: "Profile", to: "/profile" }] : []),
    ...(isAdmin ? [{ label: "Dashboard", to: "/dashboard" }] : []),
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link
          to={isAdmin ? "/dashboard" : "/"}
          className="text-xl font-bold text-gradient shrink-0"
        >
          LUXE
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
          <div
            className={`flex items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-2 flex-1 transition-shadow duration-300 ${searchFocused ? "glow-primary ring-1 ring-primary/30" : ""}`}
          >
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/categories"
            className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium bg-secondary/50 px-3 py-1.5 rounded-2xl">
                <User size={14} />
                {user.name}
                {isAdmin && (
                  <span className="text-xs gradient-primary text-primary-foreground px-1.5 py-0.5 rounded-md ml-1">
                    Admin
                  </span>
                )}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
              >
                <LogOut size={18} />
              </motion.button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex gradient-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-2xl hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          )}

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-2">
                <Search size={16} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-sm font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/cart"
                className="text-sm font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                Cart ({totalItems})
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="text-sm font-medium py-2 text-destructive text-left"
                >
                  Logout ({user.name})
                </button>
              ) : (
                <Link
                  to="/login"
                  className="gradient-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-2xl text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
