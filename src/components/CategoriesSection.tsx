import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catBoys from "@/assets/cat-boys.jpg";
import catGirls from "@/assets/cat-girls.jpg";

const categories = [
  { id: "men", name: "Men", image: catMen },
  { id: "women", name: "Women", image: catWomen },
  { id: "boys", name: "Boys", image: catBoys },
  { id: "girls", name: "Girls", image: catGirls },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Shop by <span className="text-gradient">Category</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link key={cat.id} to={`/products/${cat.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, rotateY: 5 }}
              className="group relative overflow-hidden rounded-2xl glass cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(245_58%_51%/0.3)]" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">Explore →</p>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
