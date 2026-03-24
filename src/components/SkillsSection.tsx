import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "AI / ML",
    skills: [
      { name: "LLM Engineering (GPT, Claude)", level: 95 },
      { name: "LangChain / LangGraph", level: 90 },
      { name: "PyTorch / Transformers", level: 85 },
      { name: "RAG & Vector Databases", level: 92 },
    ],
  },
  {
    title: "Backend & Infra",
    skills: [
      { name: "FastAPI / Python", level: 92 },
      { name: "PostgreSQL / Redis", level: 88 },
      { name: "Docker / Kubernetes", level: 80 },
      { name: "Celery / Kafka", level: 78 },
    ],
  },
  {
    title: "Frontend & Tools",
    skills: [
      { name: "React / TypeScript", level: 90 },
      { name: "React Flow / Three.js", level: 82 },
      { name: "Git / CI/CD", level: 88 },
      { name: "MLflow / W&B", level: 75 },
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative min-h-screen py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-mono text-sm mb-3">03 — Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-16">
            My <span className="gradient-text-ai">toolkit</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + catIdx * 0.2, duration: 0.6 }}
              className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border hover:border-primary/20 hover:box-glow-neural transition-all duration-300"
            >
              <h3 className="text-lg font-bold font-display text-primary mb-6">{category.title}</h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          delay: 0.5 + catIdx * 0.2 + skillIdx * 0.1,
                          duration: 1,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech tags */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {["OpenAI", "LangChain", "PyTorch", "Hugging Face", "RAG", "ChromaDB", "Pinecone", "FastAPI", "Redis", "Celery", "React", "Kubernetes"].map(
            (tech, i) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full text-sm border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.1 + i * 0.05 }}
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
