"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/utils";

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium inline-block",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default Badge;