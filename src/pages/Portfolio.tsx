import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ExternalLink, Github, ChevronRight, Filter, ArrowRight, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { projects as fallbackProjects, projectCategories as fallbackCategories } from "../data/projects";
import { getImageUrl } from "../lib/utils";
import { ImageSlider } from "../components/shared/ImageSlider";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const cmsProjects = useQuery(api.cms.listProjects);

  if (cmsProjects === undefined) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#B8860B]" />
      </div>
    );
  }

  const projects = cmsProjects.map((p: any) => ({ ...p, id: p._id }));

  const projectCategories = ["All", ...new Set(cmsProjects.map((p: any) => p.category))];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p: any) => p.category === activeCategory);

  const selectedProjectData = selectedProject
    ? projects.find((p: any) => p.id === selectedProject)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-4">
              <Sparkles className="h-3 w-3" />
              Our Work
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Our{" "}
            <span className="text-gradient">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            A selection of our best work across AI, web, mobile, and SaaS.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project: any, i: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  layout
                >
                  <button
                    onClick={() => setSelectedProject(project.id)}
                    className="group w-full text-left"
                  >
                    <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-300">
                      <div className="relative overflow-hidden bg-black/5">
                        <ImageSlider
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <span className="text-white text-sm font-medium flex items-center gap-1">
                            View Details <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.technologies.slice(0, 4).map((tech: string) => (
                            <span
                              key={tech}
                              className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-white/10 shadow-2xl"
            >
              <div className="relative overflow-hidden bg-black/10">
                <ImageSlider
                  src={selectedProjectData.image}
                  alt={selectedProjectData.title}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <p className="text-xl font-bold text-white">{selectedProjectData.title}</p>
                  <span className="text-xs text-white/70">{selectedProjectData.category} • {selectedProjectData.year}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-8">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {selectedProjectData.longDescription}
                </p>

                {/* Results */}
                {selectedProjectData.results && selectedProjectData.results.filter((r: string) => r && r.trim() !== "").length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3">Key Results</h4>
                    <ul className="space-y-2">
                      {selectedProjectData.results.filter((r: string) => r && r.trim() !== "").map((result: string) => (
                        <li key={result} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {selectedProjectData.technologies && selectedProjectData.technologies.filter((t: string) => t && t.trim() !== "").length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.technologies.filter((t: string) => t && t.trim() !== "").map((tech: string) => (
                        <span key={tech} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {selectedProjectData.liveUrl && (
                    <a
                      href={selectedProjectData.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {selectedProjectData.githubUrl && (
                    <a
                      href={selectedProjectData.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/5 transition-all"
                    >
                      <Github className="h-4 w-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 p-10 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want Results Like These?
            </h2>
            <p className="text-muted-foreground mb-8 text-sm max-w-xl mx-auto">
              Let's create something amazing together. Your next success story starts here.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
