"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import type { Skill } from "@/types";

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [hovering, setHovering] = useState(false);
  const radius = 48;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative w-24 h-24 lg:w-28 lg:h-28">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 132 132"
          className="rotate-[-90deg]"
        >
          <circle
            cx="66"
            cy="66"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="66"
            cy="66"
            r={radius}
            stroke="url(#skillGradient)"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: hovering ? 0 : circumference }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142 76% 50%)" />
              <stop offset="100%" stopColor="hsl(142 76% 30%)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-black border border-white/10 group-hover:border-primary/30 flex items-center justify-center transition-all duration-300">
            {skill.icon_url ? (
              <img
                src={skill.icon_url}
                alt={skill.name}
                className="w-9 h-9 lg:w-11 lg:h-11 object-contain"
              />
            ) : (
              <Code className="w-7 h-7 lg:w-9 lg:h-9 text-primary" />
            )}
          </div>
        </div>
      </div>

      <span className="text-sm lg:text-base font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default SkillCard;