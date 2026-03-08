"use client";
import { motion } from "framer-motion";
import { CircleUser, Pin, } from "lucide-react";
import type { Comment } from "@/types";


function timeAgo(dateStr: string, language: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return language === "fr" ? "À l'instant" : "Just now";
  if (diff < 3600) {
    const m = Math.floor(diff / 60);
    return language === "fr" ? `${m}min` : `${m}m ago`;
  }
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return language === "fr" ? `${h}h` : `${h}h ago`;
  }
  const d = Math.floor(diff / 86400);
  return language === "fr" ? `${d}j` : `${d}d ago`;
}

interface CommentCardProps {
  comment: Comment;
  language: string;
  index: number;
}

export default function CommentCard({ comment, language, index }: CommentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex gap-3 px-4 py-2 mx-1 rounded-xl border transition-all duration-300 backdrop-blur-sm
        ${comment.is_pinned
          ? "bg-primary/7 border-primary/20"
          : " bg-white/10 border-white/6 hover:bg-white/5 hover:border-white/10 hover:scale-101"
        }`}
    >
      {/* Avatar — initiale */}
      <div className="w-9 h-9 rounded-full bg-primary/8 flex items-center justify-center  text-sm font-bold text-primary">
        <CircleUser strokeWidth={1} size={20}/>
      </div>



      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm  text-foreground">{comment.name}</span>
            {comment.is_pinned && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center gap-1">
                <Pin className="w-2.5 h-2.5" />
                {language === "fr" ? "Épinglé" : "Pinned"}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {timeAgo(comment.created_at, language)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{comment.message}</p>
      </div>
    </motion.div>
  );
}