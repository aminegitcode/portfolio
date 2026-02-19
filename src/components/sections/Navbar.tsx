'use client'

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "À propos" },
    { href: "#skills", label: "Compétences" },
    { href: "#education", label: "Formation" },
    { href: "#experience", label: "Expériences" },
    { href: "#projects", label: "Projets" },
    { href: "#certificates", label: "Certificats" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#"
            className="font-display font-bold text-xl gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            Amine DJABRI
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
       
          </div>

          {/* Mobile Menu Button */}
        
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;