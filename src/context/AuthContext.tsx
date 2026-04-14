import { getMe } from "@/services/authService";
import { AuthContextType, User } from "@/types/auth";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Load user ONLY if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) return; // 🔥 FIX: prevent 401

      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.error("Auth failed", err);
        setUser(null);

        // cleanup
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isAdmin, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
