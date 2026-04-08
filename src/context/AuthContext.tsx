import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users - in production, use Lovable Cloud / Supabase
const DEMO_USERS: (User & { password: string })[] = [
  { email: "admin@luxe.com", password: "admin123", name: "Admin", role: "admin" },
  { email: "user@luxe.com", password: "user123", name: "User", role: "user" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("luxe_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string) => {
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("luxe_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const register = (name: string, email: string, password: string) => {
    if (DEMO_USERS.some((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }
    const newUser: User = { email, name, role: "user" };
    DEMO_USERS.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem("luxe_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("luxe_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
