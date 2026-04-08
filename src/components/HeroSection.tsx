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

  // Smooth parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* 🌌 Background Image (Parallax) */}
      <motion.img
        src={heroBg}
        alt="Hero background"
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🌫️ Soft Gradient Overlay (Apple style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />

      {/* ✨ Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
          relative z-10 
          text-center 
          px-8 py-12 md:px-16 md:py-16 
          max-w-2xl mx-4 
          rounded-[2rem] 
          border border-white/20 
          backdrop-blur-md
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
        }}
      >
        {/* 🌈 Subtle Glow Layer */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/20 blur-2xl opacity-60" />

        {/* Content */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-5"
          >
            Discover Your Style
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-white/80 mb-10"
          >
            Shop premium collections for Men, Women, and Kids with exclusive
            drops every week.
          </motion.p>

          <Link to="/categories">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative 
                px-8 py-4 
                rounded-xl 
                text-lg font-semibold 
                text-white 
                overflow-hidden
                bg-white/10 
                backdrop-blur-md 
                border border-white/20
                hover:bg-white/20
                transition-all
                inline-flex items-center gap-2
              "
            >
              {/* Button glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 opacity-0 hover:opacity-100 transition" />

              <span className="relative z-10 flex items-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
