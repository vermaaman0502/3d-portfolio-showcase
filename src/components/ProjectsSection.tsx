import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Brain, Bot, Zap, Eye, Workflow } from "lucide-react";

const projects = [
  {
    title: "AI Workflow Automation Tool",
    subtitle: "No-Code LLM Platform",
    description: "A no-code AI orchestration platform supporting DAG-based LLM pipelines with drag-and-drop workflow editor, conditional & memory nodes, retries, state persistence, and full observability. Think Zapier + LangChain + Make.com for AI.",
    tags: ["FastAPI", "React Flow", "OpenAI", "Redis", "Celery", "PostgreSQL"],
    icon: Workflow,
    color: "from-primary/20 to-accent/20",
    borderColor: "hover:border-primary/40",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(200,100%,55%,0.1)]",
  },
  {
    title: "Autonomous Agent Framework",
    subtitle: "Multi-Agent Orchestration",
    description: "A framework for building autonomous AI agents with tool-use, memory, planning, and self-reflection. Supports multi-agent collaboration with shared context and conflict resolution.",
    tags: ["Python", "LangGraph", "OpenAI", "ChromaDB", "WebSocket"],
    icon: Bot,
    color: "from-accent/20 to-pink-500/20",
    borderColor: "hover:border-accent/40",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(265,85%,65%,0.1)]",
  },
  {
    title: "Real-Time AI Analytics Engine",
    subtitle: "Streaming ML Pipeline",
    description: "A real-time ML inference engine processing streaming data with anomaly detection, predictive analytics, and auto-scaling model serving. Built for sub-100ms latency at scale.",
    tags: ["Kafka", "PyTorch", "FastAPI", "Kubernetes", "Grafana"],
    icon: Zap,
    color: "from-emerald-500/20 to-primary/20",
    borderColor: "hover:border-emerald-500/40",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(170,80%,45%,0.1)]",
  },
  {
    title: "Intelligent Document Processor",
    subtitle: "RAG + Vision AI",
    description: "An AI-powered document understanding system using RAG, OCR, and vision models. Extracts structured data from unstructured documents with 95%+ accuracy across formats.",
    tags: ["LangChain", "GPT-4V", "Pinecone", "React", "Tesseract"],
    icon: Eye,
    color: "from-sky-500/20 to-primary/20",
    borderColor: "hover:border-sky-500/40",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(200,80%,50%,0.1)]",
  },
  {
    title: "LLM Fine-Tuning Platform",
    subtitle: "Custom Model Training",
    description: "End-to-end platform for fine-tuning LLMs on custom datasets with RLHF, LoRA adapters, automated evaluation, and one-click deployment to production endpoints.",
    tags: ["Hugging Face", "PyTorch", "PEFT", "Weights & Biases", "vLLM"],
    icon: Brain,
    color: "from-violet-500/20 to-accent/20",
    borderColor: "hover:border-violet-500/40",
    glowColor: "group-hover:shadow-[0_0_30px_hsl(265,70%,55%,0.1)]",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative min-h-screen py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-mono text-sm mb-3">02 — Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            AI <span className="gradient-text-ai">Systems</span> I've Built
          </h2>
          <p className="text-muted-foreground mb-16 max-w-2xl">
            From LLM orchestration to autonomous agents — production-grade AI infrastructure.
          </p>
        </motion.div>

        {/* Featured project — full width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={`group relative p-8 md:p-10 rounded-2xl border border-border bg-card/30 backdrop-blur-sm ${projects[0].borderColor} ${projects[0].glowColor} transition-all duration-500 cursor-pointer overflow-hidden mb-6`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${projects[0].color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                <projects[0].icon size={20} />
              </div>
              <div>
                <span className="text-xs font-mono text-muted-foreground block">{projects[0].subtitle}</span>
                <span className="text-xs font-mono text-primary">★ Featured Project</span>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
              {projects[0].title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-3xl">{projects[0].description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {projects[0].tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <motion.button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" whileHover={{ x: 4 }}>
                <ExternalLink size={16} /> Live Demo
              </motion.button>
              <motion.button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" whileHover={{ x: 4 }}>
                <Github size={16} /> Source
              </motion.button>
            </div>
          </div>
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500 rounded-tr-lg"
            animate={hoveredIndex === 0 ? { scale: 1.2 } : { scale: 1 }}
          />
        </motion.div>

        {/* Other projects — grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.slice(1).map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                onMouseEnter={() => setHoveredIndex(i + 1)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm ${project.borderColor} ${project.glowColor} transition-all duration-500 cursor-pointer overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{project.subtitle}</span>
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" whileHover={{ x: 4 }}>
                      <ExternalLink size={16} /> Demo
                    </motion.button>
                    <motion.button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" whileHover={{ x: 4 }}>
                      <Github size={16} /> Source
                    </motion.button>
                  </div>
                </div>
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500 rounded-tr-lg"
                  animate={hoveredIndex === i + 1 ? { scale: 1.2 } : { scale: 1 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
