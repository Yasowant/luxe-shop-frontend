import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const mismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mismatch) return;
    setError("");
    const result = register(name, email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Registration failed");
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
            <h1 className="text-3xl font-bold text-gradient">Create Account</h1>
            <p className="text-muted-foreground text-sm mt-1">Join LUXE today</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-xl px-4 py-2">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name</label>
              <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-2.5 focus-within:glow-primary focus-within:ring-1 focus-within:ring-primary/30 transition-shadow">
                <User size={16} className="text-muted-foreground" />
                <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent text-sm outline-none" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-2.5 focus-within:glow-primary focus-within:ring-1 focus-within:ring-primary/30 transition-shadow">
                <Mail size={16} className="text-muted-foreground" />
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent text-sm outline-none" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password</label>
              <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-2.5 focus-within:glow-primary focus-within:ring-1 focus-within:ring-primary/30 transition-shadow">
                <Lock size={16} className="text-muted-foreground" />
                <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent text-sm outline-none" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-muted-foreground">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className={`flex items-center gap-2 rounded-2xl bg-secondary/50 px-3 py-2.5 transition-shadow ${mismatch ? "ring-1 ring-destructive/50" : "focus-within:glow-primary focus-within:ring-1 focus-within:ring-primary/30"}`}>
                <Lock size={16} className="text-muted-foreground" />
                <input type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full bg-transparent text-sm outline-none" required />
              </div>
              <AnimatePresence>
                {mismatch && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive">
                    Passwords do not match
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={mismatch}
              className="w-full gradient-primary text-primary-foreground py-3 rounded-2xl font-semibold transition-opacity hover:opacity-90 glow-primary disabled:opacity-50"
            >
              Create Account
            </motion.button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
          </p>
        </motion.form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
