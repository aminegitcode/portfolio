"use client";

import { motion } from "framer-motion";
import {
  Code,
  Newspaper,
  Lightbulb,
  Shield,
  TrendingUp,
  Quote,
} from "lucide-react";

import { useProfile } from "@/context/ProfileContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "../ui/Button";
import Card from "../ui/Card";

const AboutSection = () => {
  const { profile, loading } = useProfile();
  const { language } = useLanguage();

  const highlightsAll = {
    fr: [
      {
        icon: Code,
        title: "Code propre",
        description:
          "J'écris un code lisible et maintenable, avec le souci du détail et des bonnes pratiques.",
      },
      {
        icon: Lightbulb,
        title: "Innovation",
        description:
          "Je cherche toujours les solutions les plus modernes et efficaces pour résoudre les problèmes.",
      },
      {
        icon: Shield,
        title: "Sécurité",
        description:
          "Je construis mes projets avec une vision orientée cybersécurité, ma future spécialité.",
      },
      {
        icon: TrendingUp,
        title: "Progression",
        description:
          "En constante évolution, je monte en compétences chaque jour pour atteindre mes ambitions.",
      },
    ],
    en: [
      {
        icon: Code,
        title: "Clean Code",
        description:
          "I write readable and maintainable code, with attention to detail and best practices.",
      },
      {
        icon: Lightbulb,
        title: "Innovation",
        description:
          "I always look for the most modern and efficient solutions to solve problems.",
      },
      {
        icon: Shield,
        title: "Security",
        description:
          "I build my projects with a cybersecurity mindset, my future specialty.",
      },
      {
        icon: TrendingUp,
        title: "Growth",
        description:
          "Constantly evolving, I level up my skills every day to reach my ambitions.",
      },
    ],
  };

  const highlights = highlightsAll[language];

  if (loading) return null;

  return (
    <section
      id="about"
      className="py-10 bg-gradient-to-b from-background/60 to-background/20 relative"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-3 text-3xl lg:text-4xl font-semibold">
            {language === "fr" ? (
              <>
                <span className="text-primary glow-text">À propos</span> de moi
              </>
            ) : (
              <>
                About <span className="text-primary glow-text">me</span>
              </>
            )}
          </h2>
          <p className="section-subtitle max-w-3xl text-sm lg:text-lg mx-auto">
            {language === "fr"
              ? "Développeur web et futur spécialiste en cybersécurité, animé par la volonté de protéger les systèmes numériques et de concevoir des solutions web fiables et sécurisées"
              : "Web developer and future cybersecurity specialist, driven by the ambition to protect digital systems and design secure web solutions."}
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 order-2 lg:order-1"
          >
            <h2 className="font-semibold text-3xl">
              {language === "fr" ? "Mon parcours" : "My journey"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === "fr" ? profile?.bio?.[0] : profile?.bio_en?.[0]}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === "fr" ? profile?.bio?.[1] : profile?.bio_en?.[1]}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === "fr" ? profile?.bio?.[2] : profile?.bio_en?.[2]}
            </p>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-xl" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="w-65 h-65 md:w-70 md:h-70 lg:w-86 lg:h-86 rounded-full border-gradient p-1">
                  <img
                    src={profile?.photo_url ?? ""}
                    alt={profile?.full_name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-2 -right-16 lg:top-1/3 px-4 py-2 glass-card rounded-full text-sm font-medium"
                >
                  <span className="text-primary">+5</span>{" "}
                  {language === "fr"
                    ? "ans d'expérience"
                    : "years of experience"}
                </motion.div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -left-4 bottom-1/4 px-4 py-2 glass-card rounded-full text-sm font-medium"
                >
                  <span className="text-primary">+6</span>
                  {language === "fr" ? " projets" : " projects"}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-primary/5 border border-primary/20 lg:max-w-2xl w-full rounded-2xl p-4 mt-5 lg:mt-2 backdrop-blur-md overflow-hidden"
        >
          <div className="absolute top-2 right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-primary/20 rounded-full blur-lg" />
          <div className="absolute top-3 left-4 text-primary opacity-30">
            <Quote size={25} />
          </div>
          <blockquote className="text-gray-200 italic font-semibold text-sm relative z-10 pl-9">
            {language === "fr"
              ? "\"La sécurité n'est pas une option, c'est une responsabilité.\""
              : '"Security is not an option, it is a responsibility"'}
          </blockquote>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-5 flex flex-col sm:flex-row gap-3"
        >
          <a
             href={profile?.cv_url ? `${profile.cv_url}?download=CV_AMINE_DJABRI.pdf` : "#"}
  target="_blank"
  rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="lg"
              className="flex justify-center items-center gap-3"
            >
              <Newspaper className="w-5 h-5" />
              {language === "fr" ? "Télécharger CV" : "Download CV"}
            </Button>
          </a>

          <a href="#projects" className="sm:w-auto w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full flex justify-center items-center gap-3"
            >
              <Code className="w-5 h-5" />
              {language === "fr" ? "Voir mes projets" : "See my projects"}
            </Button>
          </a>
        </motion.div>

        {/* Bottom items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          {highlights.map((item, index) => (
            <Card key={item.title} index={index}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="text-primary w-5 h-5" />
                </div>
                <h2 className="font-semibold text-foreground">{item.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
