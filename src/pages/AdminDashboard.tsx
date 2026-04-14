import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import {
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  BarChart3,
  Settings,
  LogOut,
  // User,
  Search,
  Filter,
  Eye,
  Truck,
  User as UserIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { products as initialProducts, categories } from "@/data/products";
import { mockOrders as initialOrders, orderStatusColors } from "@/data/orders";
// import type { Product } from "@/context/CartContext";
import type { Order } from "@/data/orders";
import { getAllUsers, updateUserRole } from "@/services/authService";
import type { User } from "@/types/auth";
import { createProduct, getAllProducts } from "@/services/productService";
import { Product } from "@/types/product";

const barData = [
  { name: "Mon", sales: 40 },
  { name: "Tue", sales: 65 },
  { name: "Wed", sales: 50 },
  { name: "Thu", sales: 80 },
  { name: "Fri", sales: 70 },
  { name: "Sat", sales: 90 },
  { name: "Sun", sales: 55 },
];
const lineData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    orders: 5,
    joined: "2026-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    orders: 12,
    joined: "2026-02-20",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "user",
    orders: 3,
    joined: "2026-03-10",
  },
  {
    id: "4",
    name: "Admin",
    email: "admin@luxe.com",
    role: "admin",
    orders: 0,
    joined: "2025-12-01",
  },
];

type Tab = "overview" | "products" | "orders" | "users" | "settings";

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  // const [productList, setProductList] = useState<Product[]>([
  //   ...initialProducts,
  // ]);

  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProductList(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "men",
    description: "",
    discountPrice: "",
    stock: "",
    images: [] as File[],
    isActive: true,
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!user || !isAdmin) return;

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, [user, isAdmin]);

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      const res = await updateUserRole(userId, role);

      // ✅ update UI instantly
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: res.user.role } : u)),
      );
    } catch (err) {
      console.error("Role update failed", err);
    }
  };
  // Search & filter state
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([...initialOrders]);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const filteredProducts = useMemo(() => {
    return productList.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(productSearch.toLowerCase());
      const matchesCategory =
        productCategoryFilter === "all" || p.category === productCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [productList, productSearch, productCategoryFilter]);

  const getCroppedImg = async () => {
    const image = new Image();
    image.src = cropImage!;

    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const { width, height, x, y } = croppedAreaPixels;

    canvas.width = width;
    canvas.height = height;

    ctx?.drawImage(image, x, y, width, height, 0, 0, width, height);

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        resolve(
          new File([blob], "cropped.jpg", {
            type: "image/jpeg",
          }),
        );
      }, "image/jpeg");
    });
  };
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.userName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.userEmail.toLowerCase().includes(orderSearch.toLowerCase());
      const matchesStatus =
        orderStatusFilter === "all" || o.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  if (!user || !isAdmin) {
    navigate("/login");
    return null;
  }

  const stats = [
    {
      label: "Products",
      value: productList.length,
      icon: Package,
      color: "text-primary",
    },
    {
      label: "Users",
      value: mockUsers.length,
      icon: Users,
      color: "text-accent",
    },
    {
      label: "Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-primary",
    },
    {
      label: "Revenue",
      value: orders.reduce((s, o) => s + o.total, 0),
      icon: DollarSign,
      color: "text-accent",
      prefix: "$",
    },
  ];

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: Truck },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleDeleteProduct = (id: string) =>
    setProductList((prev) => prev.filter((p) => p._id !== id));

  const handleUpdateProduct = (updated: Product) => {
    setProductList((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p)),
    );
    setEditingProduct(null);
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();

      // ✅ text fields
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("discountPrice", newProduct.discountPrice || "0");
      formData.append("stock", newProduct.stock || "0");
      formData.append("category", newProduct.category);
      formData.append("isActive", String(newProduct.isActive));

      // ✅ images (multiple)
      if (newProduct.images) {
        for (let i = 0; i < newProduct.images.length; i++) {
          formData.append("images", newProduct.images[i]);
        }
      }

      // ✅ API call
      const res = await createProduct(formData);

      // ✅ update UI (your backend returns product directly)
      setProductList((prev) => [...prev, res]);

      // ✅ reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        category: "men",
        images: null,
        isActive: true,
      });

      setShowAddModal(false);
    } catch (err) {
      console.error("Create product failed", err);
    }
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: Order["status"],
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const event = {
          status: newStatus,
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          description: `Status updated to ${newStatus}`,
        };
        return { ...o, status: newStatus, timeline: [...o.timeline, event] };
      }),
    );
    if (viewingOrder?.id === orderId) {
      setViewingOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Admin <span className="text-gradient">Dashboard</span>
          </motion.h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <UserIcon size={14} /> {user.name}
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-sm text-destructive hover:underline flex items-center gap-1"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.id
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5"
                >
                  <s.icon size={24} className={`${s.color} mb-3`} />
                  <div className="text-2xl font-bold">
                    {s.prefix}
                    {s.value.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Weekly Sales</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}>
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Bar
                      dataKey="sales"
                      fill="hsl(var(--primary))"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={lineData}>
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--accent))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products */}
        {tab === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">
                Manage Products ({filteredProducts.length})
              </h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 bg-secondary/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Product
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Category
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Rating
                      </th>
                      <th className="text-right p-4 font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-8 text-center text-muted-foreground"
                        >
                          No products found
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr
                          key={p._id}
                          className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={p.images?.[0] || "/placeholder.png"}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span className="font-medium">{p.name}</span>
                          </td>
                          <td className="p-4 capitalize">{p.category}</td>
                          <td className="p-4">${p.price}</td>
                          <td className="p-4">{"⭐".repeat(p.rating)}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p._id)}
                                className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders */}
        {tab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-semibold mb-6">
              All Orders ({filteredOrders.length})
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by order ID, name, or email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 bg-secondary/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                >
                  <option value="all">All Statuses</option>
                  {[
                    "Processing",
                    "Confirmed",
                    "Shipped",
                    "Out for Delivery",
                    "Delivered",
                    "Cancelled",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Order ID
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Customer
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Total
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-right p-4 font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-8 text-center text-muted-foreground"
                        >
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => (
                        <tr
                          key={o.id}
                          className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="p-4 font-medium">{o.id}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{o.userName}</p>
                              <p className="text-xs text-muted-foreground">
                                {o.userEmail}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {o.date}
                          </td>
                          <td className="p-4 font-semibold">${o.total}</td>
                          <td className="p-4">
                            <select
                              value={o.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(
                                  o.id,
                                  e.target.value as Order["status"],
                                )
                              }
                              className={`text-xs px-2 py-1 rounded-full font-medium border-none outline-none cursor-pointer ${orderStatusColors[o.status]}`}
                            >
                              {[
                                "Processing",
                                "Confirmed",
                                "Shipped",
                                "Out for Delivery",
                                "Delivered",
                                "Cancelled",
                              ].map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setViewingOrder(o)}
                              className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                            >
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users */}
        {tab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-semibold mb-6">
              All Users ({users.length})
            </h2>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        User
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Email
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Role
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Orders
                      </th>
                      <th className="text-left p-4 font-medium text-muted-foreground">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                            {u.name.charAt(0)}
                          </div>
                          <span className="font-medium">{u.name}</span>
                        </td>
                        <td className="p-4 text-muted-foreground">{u.email}</td>
                        <td className="p-4">
                          <select
                            value={u.role}
                            onChange={(e) =>
                              handleRoleChange(u._id, e.target.value)
                            }
                            className="text-xs px-2 py-1 rounded-full bg-secondary outline-none cursor-pointer"
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </select>
                        </td>
                        {/* <td className="p-4">{u.orders}</td> */}
                        {/* <td className="p-4 text-muted-foreground">
                          {u.joined}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings */}
        {tab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl"
          >
            <h2 className="text-xl font-semibold mb-6">Admin Settings</h2>
            <div className="glass rounded-2xl p-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Store Name
                </label>
                <input
                  defaultValue="LUXE"
                  className="w-full mt-1 bg-secondary/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Admin Email
                </label>
                <input
                  defaultValue={user.email}
                  className="w-full mt-1 bg-secondary/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Currency
                </label>
                <select
                  defaultValue="USD"
                  className="w-full mt-1 bg-secondary/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <button className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                <Save size={16} /> Save Settings
              </button>
            </div>
          </motion.div>
        )}

        {/* Add Product Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="glass rounded-2xl p-6 w-full max-w-md"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Add New Product</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-1 rounded-lg hover:bg-secondary"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <input
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm"
                  />

                  {/* Description */}
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm h-20"
                  />

                  {/* Price */}
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm"
                  />

                  {/* Discount */}
                  <input
                    type="number"
                    placeholder="Discount Price"
                    value={newProduct.discountPrice}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        discountPrice: e.target.value,
                      })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm"
                  />

                  {/* Stock */}
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm"
                  />

                  {/* Image Upload */}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);

                      const previews = files.map((file) =>
                        URL.createObjectURL(file),
                      );
                      setPreviewImages((prev) => [...prev, ...previews]);

                      setNewProduct((prev) => ({
                        ...prev,
                        images: [...prev.images, ...files],
                      }));

                      if (files[0]) {
                        setCropImage(URL.createObjectURL(files[0]));
                      }
                    }}
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm"
                  />

                  {/* Preview */}
                  <div className="flex gap-2 flex-wrap">
                    {previewImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>

                  {/* Cropper */}
                  {cropImage && (
                    <>
                      <div className="relative w-full h-60 bg-black">
                        <Cropper
                          image={cropImage}
                          crop={crop}
                          zoom={zoom}
                          aspect={1}
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          onCropComplete={(_, pixels) =>
                            setCroppedAreaPixels(pixels)
                          }
                        />
                      </div>

                      <button
                        className="w-full bg-primary text-white py-2 rounded-lg"
                        onClick={async () => {
                          const cropped = await getCroppedImg();

                          setNewProduct((prev) => ({
                            ...prev,
                            images: [...prev.images, cropped],
                          }));

                          setCropImage(null);
                        }}
                      >
                        Crop & Add Image
                      </button>
                    </>
                  )}

                  {/* Category */}
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {/* Active */}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newProduct.isActive}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          isActive: e.target.checked,
                        })
                      }
                    />
                    Active Product
                  </label>

                  {/* Submit */}
                  <button
                    onClick={handleAddProduct}
                    disabled={!newProduct.name || !newProduct.price}
                    className="w-full gradient-primary text-primary-foreground py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Product
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Product Modal */}
        <AnimatePresence>
          {editingProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="glass rounded-2xl p-6 w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Edit Product</h3>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="p-1 rounded-lg hover:bg-secondary"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <textarea
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none h-24"
                  />
                  <button
                    onClick={() => handleUpdateProduct(editingProduct)}
                    className="w-full gradient-primary text-primary-foreground py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Order Modal */}
        <AnimatePresence>
          {viewingOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="glass rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">{viewingOrder.id}</h3>
                  <button
                    onClick={() => setViewingOrder(null)}
                    className="p-1 rounded-lg hover:bg-secondary"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Customer</span>
                    <span className="font-medium">
                      {viewingOrder.userName} ({viewingOrder.userEmail})
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span>{viewingOrder.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Address</span>
                    <span className="text-right max-w-[200px]">
                      {viewingOrder.shippingAddress}
                    </span>
                  </div>
                  <div className="border-t border-border/50 pt-4">
                    <p className="text-sm font-medium mb-2">Items</p>
                    {viewingOrder.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm py-1"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>${item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t border-border/50 mt-2 pt-2 flex justify-between font-bold text-sm">
                      <span>Total</span>
                      <span>${viewingOrder.total}</span>
                    </div>
                  </div>
                  <div className="border-t border-border/50 pt-4">
                    <p className="text-sm font-medium mb-3">Timeline</p>
                    {viewingOrder.timeline.map((e, i) => (
                      <div key={i} className="flex gap-3 mb-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${i === viewingOrder.timeline.length - 1 ? "gradient-primary" : "bg-muted-foreground/30"}`}
                          />
                          {i < viewingOrder.timeline.length - 1 && (
                            <div className="w-px h-8 bg-border" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{e.status}</p>
                          <p className="text-xs text-muted-foreground">
                            {e.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
