"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Code, Server, Database, Cpu, Package } from "lucide-react";
import { getSkills } from "@/services/skills.service";
import type { Skill } from "@/types";
import SkillCard from "@/components/ui/SkillCard";
import Badge from "@/components/ui/Badge";

function Skills() {
  const { language } = useLanguage();
  const [activeSlug, setActiveSlug] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredSkills = activeSlug
    ? skills.filter((s) => s.category === activeSlug)
    : skills;

 const getPrimaryColor = () => {
  if (typeof window === "undefined") return "#4ade80";
  return getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim() || "#4ade80";
};

const colors = [
  { text: "text-yellow-400", bg: "bg-yellow-400", raw: "#facc15" },
  { text: "text-primary", bg: "bg-primary", raw: getPrimaryColor() },
  { text: "text-purple-400", bg: "bg-purple-400", raw: "#c084fc" },
  { text: "text-orange-400", bg: "bg-orange-400", raw: "#fb923c" },
    { text: "text-blue-400", bg: "bg-blue-400", raw: "#60a5fa" },
    { text: "text-pink-400", bg: "bg-pink-400", raw: "#f472b6" },
  ];

  const categoriesAll = {
    fr: [
      { icon: <Code className="w-4 h-4" />, name: "Tous", slug: "" },
      { icon: <Code className="w-4 h-4" />, name: "Frontend", slug: "frontend" },
      { icon: <Server className="w-4 h-4" />, name: "Backend", slug: "backend" },
      { icon: <Database className="w-4 h-4" />, name: "Base de données", slug: "database" },
      { icon: <Cpu className="w-4 h-4" />, name: "Système/Bas niveau", slug: "system_lowlevel" },
      { icon: <Package className="w-4 h-4" />, name: "Écosystème", slug: "ecosystem" },
    ],
    en: [
      { icon: <Code className="w-4 h-4" />, name: "All", slug: "" },
      { icon: <Code className="w-4 h-4" />, name: "Frontend", slug: "frontend" },
      { icon: <Server className="w-4 h-4" />, name: "Backend", slug: "backend" },
      { icon: <Database className="w-4 h-4" />, name: "Database", slug: "database" },
      { icon: <Cpu className="w-4 h-4" />, name: "System / Low level", slug: "system_lowlevel" },
      { icon: <Package className="w-4 h-4" />, name: "Ecosystem", slug: "ecosystem" },
    ],
  };

  const categories = categoriesAll[language];

  const activeColor = colors[
    categories.findIndex((c) => c.slug === activeSlug)
  ]?.raw ?? colors[0].raw;

  const title =
    language === "fr" ? (
      <><span className="gradient-text">Expertise</span> Technique</>
    ) : (
      <>Technical <span className="gradient-text">Expertise</span></>
    );

  return (
    <section id="skills" className="py-10 relative bg-background/60">
      <div className="container mx-auto px-6 flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-10"
        >
          <Badge className="mb-3">{language === "fr" ? "Compétences" : "Skills"}</Badge>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">{title}</h2>
          <p className="section-subtitle max-w-2xl">
            {language === "fr"
              ? "Voici les outils et technologies avec lesquels je travaille régulièrement pour créer des projets modernes et performants."
              : "Here are the tools and technologies I regularly use to build modern, high-performance projects."}
          </p>
        </motion.div>

        {/* Filter nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-0 justify-between mb-4 bg-black/50 lg:px-2 rounded-2xl border border-white/8 w-full max-w-5xl"
        >
          {categories.map((cat, index) => {
            const color = colors[index % colors.length];
            const isActive = activeSlug === cat.slug;

            return (
              <button
                key={cat.slug}
                onClick={() => setActiveSlug(cat.slug)}
                className={`relative flex items-center gap-2 px-5 py-3 font-medium transition-all duration-300 ${
                  isActive
                    ? `${color.text}`
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.icon}
                {cat.name}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    style={{ boxShadow: `0px -3px 10px ${color.raw}` }}
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${color.bg}`}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Skills box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-black/50 border border-white/8 w-full max-w-5xl rounded-2xl p-4"
        >
          {loading ? (
            <div className="text-muted-foreground text-sm text-center py-10">
              {language === "fr" ? "Chargement..." : "Loading..."}
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="text-muted-foreground text-sm text-center py-10">
              {language === "fr" ? "Aucune compétence trouvée." : "No skills found."}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4"
              >
                {filteredSkills.map((skill, index) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    index={index}
                    color={activeColor}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

      </div>
    </section>
  );
}

export default Skills;