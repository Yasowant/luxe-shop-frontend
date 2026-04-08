import { motion } from "framer-motion";
import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  { label: "Total Products", value: 1248, icon: Package, color: "text-primary" },
  { label: "Orders", value: 856, icon: ShoppingBag, color: "text-accent" },
  { label: "Revenue", value: 48520, icon: DollarSign, color: "text-primary", prefix: "$" },
  { label: "Growth", value: 24, icon: TrendingUp, color: "text-accent", suffix: "%" },
];

const barData = [
  { name: "Mon", sales: 40 }, { name: "Tue", sales: 65 }, { name: "Wed", sales: 50 },
  { name: "Thu", sales: 80 }, { name: "Fri", sales: 70 }, { name: "Sat", sales: 90 }, { name: "Sun", sales: 55 },
];

const lineData = [
  { name: "Jan", revenue: 4000 }, { name: "Feb", revenue: 3000 }, { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 }, { name: "May", revenue: 6000 }, { name: "Jun", revenue: 5500 },
];

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const inc = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const DashboardPreview = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Dashboard <span className="text-gradient">Overview</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <s.icon size={24} className={`${s.color} mb-3`} />
              <div className="text-2xl font-bold animate-count-up">
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4">Weekly Sales</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))" }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
