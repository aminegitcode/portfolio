"use client";
import { motion } from "framer-motion";
import { Award, Calendar, ShieldCheck } from "lucide-react";
import type { Certificate } from "@/types";

function formatDate(dateStr: string | null, language: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString(
    language === "fr" ? "fr-FR" : "en-US",
    {
      month: "short",
      year: "numeric",
    },
  );
}
const TAG_COLORS = [
  "bg-primary/10 border-primary/20 text-primary",
  "bg-secondary/10 border-secondary/20 text-secondary",
];

interface CertificateCardProps {
  cert: Certificate;
  language: string;
  index: number;
  onClick: () => void;
}

export default function CertificateCard({
  cert,
  language,
  index,
  onClick,
}: CertificateCardProps) {
  const isExpired = cert.expiration_date
    ? new Date(cert.expiration_date) < new Date()
    : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={onClick}
      className="group relative bg-background/40 border border-primary/20 hover:border-primary/40 hover-glow rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-muted">
        {cert.img_url ? (
          <img
            src={cert.img_url}
            alt={cert.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-50"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Award className="w-12 h-12 text-primary/30" />
          </div>
        )}

        {/* View overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs backdrop-blur-sm translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {language === "fr" ? "Voir les détails" : "View details"}
          </span>
        </div>

        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full border backdrop-blur-sm flex items-center gap-1.5
          ${
            isExpired
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          }`}
        >
          <ShieldCheck className="w-3 h-3" />
          {isExpired
            ? language === "fr"
              ? "Expiré"
              : "Expired"
            : language === "fr"
              ? "Valide"
              : "Valid"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {cert.issuer && (
          <span className="text-xs text-primary font-medium mb-1">
            {cert.issuer}
          </span>
        )}
        <h3 className="text-sm font-semibold text-foreground leading-snug mb-3 flex-1">
          {language === "fr" ? cert.title : cert.title_en}
        </h3>
        {cert.tags && cert.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
            {cert.tags.slice(0, 3).map((tag, i) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-1 rounded-full border ${TAG_COLORS[i % TAG_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}
            {cert.tags.length > 3 && (
              <span className="text-xs px-2.5 py-1 rounded-full border border-secondary/20 bg-secondary/10 text-secondary">
                more...
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-white/5 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(cert.issue_date, language)}</span>
        </div>
      </div>
    </motion.div>
  );
}
