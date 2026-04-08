import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 🌌 Parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* 🌄 Background */}
      <motion.img
        src={heroBg}
        alt="Hero background"
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 🚀 Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-10 items-center">
        {/* ✨ LEFT TEXT */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          {/* 🔥 Animated Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {["Elevate", "Your", "Style"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-block mr-3"
              >
                <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-pulse">
                  {word}
                </span>
              </motion.span>
            ))}
          </motion.h1>

          {/* ✨ Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 mt-6 text-lg max-w-md leading-relaxed"
          >
            Discover fashion that speaks confidence. Curated collections
            designed for modern lifestyle.
          </motion.p>

          {/* 🚀 CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <Link to="/categories">
              <button className="group px-6 py-3 bg-white text-black rounded-full flex items-center gap-2 hover:gap-4 transition-all shadow-lg hover:shadow-xl">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 🎯 RIGHT SIDE (optional future image/model) */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
};

export default HeroSection;
