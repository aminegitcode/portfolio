"use client";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { ExternalLink, Github, Layers } from "lucide-react";

const TAG_COLORS = [
  "bg-primary/10 border-primary/20 text-primary",
  "bg-secondary/10 border-secondary/20 text-secondary",
];

interface ProjectCardProps {
  project: Project;
  language: string;
  index: number;
}

export default function ProjectCard({
  project,
  language,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      className="group relative bg-background/40 border border-primary/20 hover:border-primary/40 hover-glow rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
  
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-xs group-hover:brightness-50"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Layers className="w-10 h-10 opacity-30" />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-sm">
          {project.category}
        </span>

        {/* GitHub button — appears centered on hover */}
        {project.github_url && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm backdrop-blur-sm hover:bg-white/20 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            >
              <Github className="w-4 h-4" />
              {language === "fr" ? "Voir le code" : "View code"}
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-semibold text-foreground mb-2">
          {project.title}
        </h3>

        {(project.description || project.description_en) && (
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {language === "fr" ? project.description : project.description_en}
          </p>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-1 rounded-full border ${TAG_COLORS[i % TAG_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              {language === "fr" ? "Code source" : "Source code"}
            </a>
          )}
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:underline transition-colors ml-auto"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {language === "fr" ? "Voir le projet" : "Live demo"}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
