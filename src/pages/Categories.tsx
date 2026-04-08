import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/products";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catBoys from "@/assets/cat-boys.jpg";
import catGirls from "@/assets/cat-girls.jpg";

const catImages: Record<string, string> = {
  men: catMen,
  women: catWomen,
  boys: catBoys,
  girls: catGirls,
};

const Categories = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Shop by <span className="text-gradient">Category</span>
        </motion.h1>
        <p className="text-center text-muted-foreground mb-12">
          Browse our curated collections
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/products/${cat.id}`}>
                <motion.div
                  whileHover={{ y: -8, rotateY: 5 }}
                  className="group relative overflow-hidden rounded-2xl glass cursor-pointer"
                  style={{ perspective: "1000px" }}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={catImages[cat.id]}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 group-hover:border-primary/40 group-hover:glow-primary" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.description}</p>
                    <span className="text-sm font-medium text-primary mt-2 inline-block">
                      Explore →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Categories;
