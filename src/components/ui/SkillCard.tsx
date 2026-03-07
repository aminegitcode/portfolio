"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import type { Skill } from "@/types";

function SkillCard({
  skill,
  index,
  color = "#4ade80",
}: {
  skill: Skill;
  index: number;
  color?: string;
}) {
  const [hovering, setHovering] = useState(false);
  const radius = 48;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      className="flex flex-col items-center gap-1 pb-2 rounded-2xl border cursor-pointer group transition-all duration-300"
      style={{
        borderColor: hovering ? `${color}30` : "transparent",
        background: hovering ? `${color}08` : "transparent",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative w-24 h-24 lg:w-30 lg:h-30">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 132 132"
          className="rotate-[-90deg]"
        >
          <defs>
            <filter id={`glow-${skill.id}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient
              id={`skillGradient-${skill.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <circle
            cx="66"
            cy="66"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-white/5"
          />

          <motion.circle
            cx="66"
            cy="66"
            r={radius}
            stroke={`url(#skillGradient-${skill.id})`}
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: hovering ? 0 : circumference }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            strokeLinecap="round"
            filter={hovering ? `url(#glow-${skill.id})` : undefined}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center"
            animate={{
              boxShadow: hovering ? `0 0 20px ${color}40` : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            {skill.icon_url ? (
              <motion.img
                src={skill.icon_url}
                alt={skill.name}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                animate={{ scale: hovering ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <Code className="w-7 h-7 lg:w-9 lg:h-9" style={{ color }} />
            )}
          </motion.div>
        </div>
      </div>

      <motion.span
        className="text-sm lg:text-base font-semibold text-center transition-colors duration-300"
        animate={{
          color: hovering ? color : "hsl(215 20% 65%)",
        }}
        transition={{ duration: 0.3 }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
}

export default SkillCard;