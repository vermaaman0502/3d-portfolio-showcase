import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cpu, Workflow } from "lucide-react";

const highlights = [
  { icon: Brain, label: "LLM Engineering", desc: "Designing and deploying large language model pipelines at scale" },
  { icon: Workflow, label: "AI Orchestration", desc: "Building DAG-based workflows for complex multi-agent systems" },
  { icon: Cpu, label: "MLOps & Infra", desc: "End-to-end ML infrastructure with observability and auto-scaling" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative min-h-screen flex items-center py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-mono text-sm mb-3">01 — About</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-12">
            Engineering <span className="gradient-text-ai">intelligence</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm an AI engineer passionate about building intelligent systems that solve
              real-world problems. I specialize in LLM pipelines, autonomous agents, and
              no-code AI platforms — bridging the gap between cutting-edge research and production.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From fine-tuning foundation models to architecting multi-agent orchestration 
              systems, I focus on making AI accessible, reliable, and scalable. I believe
              the best AI products are built at the intersection of great engineering and 
              deep domain understanding.
            </p>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { num: "15+", label: "AI Projects" },
                { num: "5+", label: "LLM Pipelines" },
                { num: "10M+", label: "Tokens Processed" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-primary text-glow-neural">{stat.num}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 hover:box-glow-neural transition-all duration-300 group"
                whileHover={{ x: 8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
