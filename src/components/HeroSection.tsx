import { motion } from "framer-motion";
import { ChevronDown, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center z-10 max-w-4xl">
        {/* AI tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-mono bg-primary/5 inline-flex items-center gap-2">
            <Brain size={14} className="animate-pulse-glow" />
            Building intelligent systems
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="text-foreground">Aman </span>
          <span className="gradient-text-ai text-glow">Verma</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground font-light mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          AI Engineer / <span className="text-primary text-glow-neural">ML & LLM Architect</span>
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Engineering next-gen AI systems — from LLM pipelines and autonomous agents 
          to no-code AI platforms. Turning neural architectures into production-ready products.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
          >
            View AI Projects
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-xl border border-border text-foreground font-semibold hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            Let's Collaborate
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
