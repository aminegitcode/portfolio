"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

const AnimatedText = () => {
  const [index, setIndex] = useState(0);
  const phrases = ["web develpoer", "test2", "test3"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 md:h-12 overflow-hidden relative">
      {phrases.map((phrase, i) => (
        <div
          key={phrase}
          className={`absolute w-full text-muted-foreground  transition-all duration-500 ease-in-out ${
            index === i
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-8"
          }`}
          style={{
            position: "absolute",
            top: 0,
          }}
        >
          {phrase}
        </div>
      ))}
    </div>
  );
};
const Hero = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <section className="min-h-screen   flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}

      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-110 h-110 bg-primary/12 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-primary text-sm font-medium">
              👋{" "}
              {language === "fr"
                ? "Bienvenue sur mon portfolio"
                : "Welcome to my portfolio"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold font-display mb-2"
          >
            {language === "fr" ? "Je suis" : "I'm "}{" "}
            <span className="gradient-text">Amine DJABRI</span>
          </motion.h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-3xl mb-5"
          >
            <AnimatedText />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {language === "fr"
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nost libero ipsum vero in optio dignissimos assumenda enim"
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nost libero ipsum vero in optio dignissimos assumenda enim"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-5"
          >
            <a href="#contact">
              <Button
                size="lg"
                className="glow-box flex items-center justify-between "
              >
                <Mail className="mr-2 h-5 w-5" />

                {language === "fr" ? "Me contacter" : "Contact me"}
              </Button>
            </a>
            <a href="#projects">
              <Button variant="outline" size="lg" className="">
                {language === "fr" ? "Voir mes projets" : "See my work"}
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-6 mb-5"
          >
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className=" absolute  left-1/2 -translate-x-1/2"
        >
          <a href="#about">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="h-6 w-6 mb-1 hover:cursor-pointer text-primary" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
