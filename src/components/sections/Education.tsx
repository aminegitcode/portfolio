"use client";

import React, { useEffect, useState } from "react";
import Badge from "../ui/Badge";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getEducation } from "@/services/education.service";
import type { Education } from "@/types";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import EducationCard from "../ui/EducationCard";

function Education() {
  const { language } = useLanguage();
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEducation()
      .then(setEducation)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="education" className="relative bg-gradient-to-b from-background/30 via-primary/5 to-background/30 pt-20 pb-10">
      <div className="px-6 container flex flex-col mx-auto items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center "
        >
          <Badge className="mb-3">
            {language === "fr" ? "Formation" : "Education"}
          </Badge>
          <h2 className="section-title lg:text-5xl">
            {language === "fr" ? (
              <>
                Parcours <span className="gradient-text glow-text">Scolaire</span>
              </>
            ) : (
              <>
                Academic <span className="gradient-text">Journey</span>
              </>
            )}
          </h2>
          <p className="section-subtitle max-w-2xl text-center ">
            {language === "fr"
              ? "Les établissements et formations qui ont construit mes compétences techniques et théoriques."
              : "The institutions and programs that shaped my technical and theoretical foundations."}
          </p>
        </motion.div>

        {/* Timeline */}
        {loading ? (
          <div className="text-muted-foreground text-sm">
            {language === "fr" ? "Chargement..." : "Loading..."}
          </div>
        ) : (
          <div className="relative w-full max-w-3xl xl:max-w-5xl">
            {/* Ligne verticale */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/70 via-primary/30 to-transparent" />

            <div className="flex flex-col  gap-12">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EducationCard
                    edu={edu}
                    language={language}
                    isLast={index === education.length - 1}
                     index={index} 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Education;
