import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { getMe, loginUser } from "@/services/authService";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ 1. Login
      const data = await loginUser({ email, password });

      // ✅ 2. Store tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // ✅ 3. Fetch real user from backend
      const me = await getMe();

      // ✅ 4. Update context (NO reload needed)
      setUser(me.user);

      // ✅ 5. Redirect
      navigate(me.user.role === "admin" ? "/dashboard" : "/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 gradient-hero">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gradient">Welcome Back</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Sign in to your account
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-xl px-4 py-2"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-2.5 focus-within:glow-primary focus-within:ring-1 focus-within:ring-primary/30 transition-shadow">
                <Mail size={16} className="text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password</label>
              <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-2.5 focus-within:glow-primary focus-within:ring-1 focus-within:ring-primary/30 transition-shadow">
                <Lock size={16} className="text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="text-muted-foreground"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot?
              </a>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-primary text-primary-foreground py-3 rounded-2xl font-semibold transition-opacity hover:opacity-90"
            >
              Sign In
            </motion.button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Demo: <strong>admin@luxe.com / admin123</strong> (admin) or{" "}
              <strong>user@luxe.com / user123</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
