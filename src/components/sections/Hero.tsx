"use client";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

import type { Profile } from "@/types";

const AnimatedText = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <div className="h-10 md:h-12 overflow-hidden relative">
      {phrases.map((phrase, i) => (
        <div
          key={phrase}
          className={`absolute w-full text-muted-foreground transition-all duration-500 ease-in-out ${
            index === i ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
          style={{ position: "absolute", top: 0 }}
        >
          {phrase}
        </div>
      ))}
    </div>
  );
};
type HeroProps = { profile: Profile };
const Hero = ({ profile }: HeroProps) => {

  const { language } = useLanguage();



  const phrases = language === "fr"
    ? profile?.hero_texts ?? []
    : profile?.hero_texts_en ?? [];

  return (
    <section className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-8" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 md:left-1/4 h-70 w-70 md:w-100 md:h-100 bg-primary/8 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1 md:right-1/4 w-50 h-50 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >

          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="mb-5"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-primary text-sm font-medium">
              👋{" "}
              {language === "fr" ? "Bienvenue sur mon portfolio" : "Welcome to my portfolio"}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2"
          >
            {language === "fr" ? "Je suis " : "I'm "}
            <span className="gradient-text">{profile?.full_name}</span>
          </motion.h1>

          {/* Animated texts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-xl md:text-3xl mb-5"
          >
            <AnimatedText phrases={phrases} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-md md:text-xl text-muted-foreground   max-w-3xl mx-auto mb-7"
          >
            {language === "fr" ? profile?.subtitle : profile?.subtitle_en}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-5"
          >
            <a href="#contact">
              <Button size="lg" className="glow-box flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                {language === "fr" ? "Me contacter" : "Contact me"}
              </Button>
            </a>
            <a href="#projects">
              <Button variant="outline" size="lg">
                {language === "fr" ? "Voir mes projets" : "See my work"}
              </Button>
            </a>
          </motion.div>

          {/* social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-6 mb-5"
          >
            <a href={profile?.github_url ?? "#"} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href={profile?.linkedin_url ?? "#"} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href={`mailto:${profile?.email}`}
              className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>

        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute left-1/2 -translate-x-1/2 "
        >
          <a href="#about">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowDown className="h-6 w-6 mb-1 hover:cursor-pointer  text-primary" />
            </motion.div>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;