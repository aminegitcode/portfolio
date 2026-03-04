"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Code, Server, Database, Cpu, Package } from "lucide-react";

function Skills() {
  const { language } = useLanguage();
  const [activeSlug, setActiveSlug] = useState("");

  const colors = [
    { text: "text-primary", bg: "bg-primary", raw: "#4ade80" },
    { text: "text-blue-400", bg: "bg-blue-400", raw: "#60a5fa" },
    { text: "text-purple-400", bg: "bg-purple-400", raw: "#c084fc" },
    { text: "text-orange-400", bg: "bg-orange-400", raw: "#fb923c" },
    { text: "text-pink-400", bg: "bg-pink-400", raw: "#f472b6" },
    { text: "text-yellow-400", bg: "bg-yellow-400", raw: "#facc15" },
  ];

  const categoriesAll = {
    fr: [
      { icon: <Code className="w-4 h-4" />, name: "Tous", slug: "" },
      {
        icon: <Code className="w-4 h-4" />,
        name: "Frontend",
        slug: "frontend",
      },
      {
        icon: <Server className="w-4 h-4" />,
        name: "Backend",
        slug: "backend",
      },
      {
        icon: <Database className="w-4 h-4" />,
        name: "Base de données",
        slug: "database",
      },
      { icon: <Cpu className="w-4 h-4" />, name: "Système", slug: "system" },
      {
        icon: <Package className="w-4 h-4" />,
        name: "Écosystème",
        slug: "ecosystem",
      },
    ],
    en: [
      { icon: <Code className="w-4 h-4" />, name: "All", slug: "" },
      {
        icon: <Code className="w-4 h-4" />,
        name: "Frontend",
        slug: "frontend",
      },
      {
        icon: <Server className="w-4 h-4" />,
        name: "Backend",
        slug: "backend",
      },
      {
        icon: <Database className="w-4 h-4" />,
        name: "Database",
        slug: "database",
      },
      { icon: <Cpu className="w-4 h-4" />, name: "System", slug: "system" },
      {
        icon: <Package className="w-4 h-4" />,
        name: "Ecosystem",
        slug: "ecosystem",
      },
    ],
  };

  const categories = categoriesAll[language];

  const title =
    language === "fr" ? (
      <>
        <span className="gradient-text">Expertise</span> Technique
      </>
    ) : (
      <>
        Technical <span className="gradient-text">Expertise</span>
      </>
    );

  return (
    <section id="skills" className="py-10 relative bg-background">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-10"
        >
          <div className="px-4 py-2 rounded-full mb-4 bg-primary/10 border border-primary/20 text-primary text-sm">
            {language === "fr" ? "Compétences" : "Skills"}
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">{title}</h2>
          <p className="section-subtitle max-w-2xl">
            {language === "fr"
              ? "Voici les outils et technologies avec lesquels je travaille régulièrement pour créer des projets modernes et performants."
              : "Here are the tools and technologies I regularly use to build modern, high-performance projects."}
          </p>
        </motion.div>

      </div>
    </section>
  ); 
}

export default Skills;
