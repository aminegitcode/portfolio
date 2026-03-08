"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/Badge";
import { useLanguage } from "@/context/LanguageContext";
import { getProjects } from "@/services/projects.service";
import type { Project } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../ui/ProjectCard";

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  all:                       { fr: "Tous",                     en: "All"                     },
  web:                       { fr: "Web",                      en: "Web"                     },
  "artificial intelligence": { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
  cybersecurity:             { fr: "Cybersécurité",            en: "Cybersecurity"           },
  desktop:                   { fr: "Desktop",                  en: "Desktop"                 },
};

const TAG_COLORS = [
  { bg: "bg-primary",     text: "text-primary"     },
  { bg: "bg-secondary",   text: "text-secondary"   },

];

function Projects() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = Object.keys(CATEGORY_LABELS);

  const getCategoryLabel = (slug: string) => {
    const entry = CATEGORY_LABELS[slug];
    if (entry) return language === "fr" ? entry.fr : entry.en;
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category.toLowerCase().trim() === activeCategory.toLowerCase().trim());

  return (
    <section id="projects" className="bg-background">
      <div className="px-10 lg:px-20 container mx-auto flex flex-col items-center pt-20 pb-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="items-center flex-col flex text-center"
        >
          <Badge className="mb-5">
            {language === "fr" ? "Projets" : "Projects"}
          </Badge>
          <h2 className="section-title lg:text-5xl">
            {language === "fr" ? (
              <>Projets <span className="gradient-text">Récents</span></>
            ) : (
              <>Featured <span className="gradient-text">Projects</span></>
            )}
          </h2>
          <p className="section-subtitle text-center max-w-2xl">
            {language === "fr"
              ? "Des projets nés d'une curiosité sincère et construits avec une obsession pour les détails qui font la différence."
              : "Projects born from genuine curiosity and built with an obsession for the details that make the difference."}
          </p>
        </motion.div>

        {/* Filter nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-0 justify-center lg:justify-between mb-10 bg-black/50 px-2 rounded-2xl border border-white/8"
        >
          {categories.map((cat, i) => {
            const color = TAG_COLORS[i % TAG_COLORS.length];
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative text-sm px-5 py-3 font-medium transition-all duration-300
                  ${isActive ? color.text : "text-muted-foreground hover:text-foreground"}`}
              >
                {getCategoryLabel(cat)}
                {isActive && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${color.bg}`}
                    style={{ boxShadow: `0px -3px 10px var(--color-primary)` }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="text-muted-foreground text-sm">
            {language === "fr" ? "Chargement..." : "Loading..."}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            {language === "fr" ? "Aucun projet trouvé." : "No projects found."}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  language={language}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

export default Projects;