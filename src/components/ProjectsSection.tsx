import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AI Workflow Automation Tool",
    description: "A no-code AI orchestration platform supporting DAG-based LLM pipelines with drag-and-drop workflow editor, conditional & memory nodes, retries, state persistence, and observability. Think Zapier + LangChain + Make.com for AI workflows.",
    tags: ["FastAPI", "React Flow", "OpenAI", "Redis", "PostgreSQL", "Celery"],
    color: "from-primary/20 to-accent/20",
    borderColor: "hover:border-primary/40",
  },
  {
    title: "Nebula Dashboard",
    description: "A real-time analytics dashboard with 3D data visualizations and interactive charts.",
    tags: ["React", "Three.js", "D3.js"],
    color: "from-accent/20 to-pink-500/20",
    borderColor: "hover:border-accent/40",
  },
  {
    title: "EcoTrack",
    description: "Sustainability tracking platform with gamification and social features.",
    tags: ["Next.js", "Supabase", "Tailwind"],
    color: "from-emerald-500/20 to-primary/20",
    borderColor: "hover:border-emerald-500/40",
  },
  {
    title: "PixelForge",
    description: "AI-powered image generation tool with a collaborative canvas for teams.",
    tags: ["React", "Python", "WebSocket"],
    color: "from-orange-500/20 to-primary/20",
    borderColor: "hover:border-orange-500/40",
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
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-16">
            Selected <span className="gradient-text">works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm ${project.borderColor} transition-all duration-500 cursor-pointer overflow-hidden`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Project number */}
                <span className="text-sm font-mono text-muted-foreground mb-4 block">
                  0{i + 1}
                </span>

                <h3 className="text-2xl font-bold font-display mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.button
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <Github size={16} /> Source
                  </motion.button>
                </div>
              </div>

              {/* Decorative corner */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500 rounded-tr-lg"
                animate={hoveredIndex === i ? { scale: 1.2 } : { scale: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
