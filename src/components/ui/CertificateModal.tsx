"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, Calendar, ShieldCheck, X } from "lucide-react";
import type { Certificate } from "@/types";
import { useEffect } from "react";

function formatDate(dateStr: string | null, language: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

interface CertificateModalProps {
  cert: Certificate;
  language: string;
  onClose: () => void;
}

export default function CertificateModal({ cert, language, onClose }: CertificateModalProps) {
  const isExpired = cert.expiration_date ? new Date(cert.expiration_date) < new Date() : false;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card border border-primary/20 rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/70 transition-all"
        >
          <X size={14} />
        </button>

        {/* Image — full natural size */}
        <div className="w-full bg-muted overflow-hidden">
          {cert.img_url ? (
            <img
              src={cert.img_url}
              alt={cert.title}
              className="w-full h-auto object-contain"
            />
          ) : (
            <div className="w-full h-40 flex items-center justify-center">
              <Award className="w-16 h-16 text-primary/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Issuer + status */}
          <div className="flex items-center justify-between mb-2">
            {cert.issuer && (
              <span className="text-xs text-primary font-medium">{cert.issuer}</span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full border flex items-center gap-1.5
              ${isExpired
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              {isExpired
                ? (language === "fr" ? "Expiré" : "Expired")
                : (language === "fr" ? "Valide" : "Valid")
              }
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground leading-snug mb-3">
            {cert.title}
          </h3>

          {/* Description */}
          {cert.description && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {cert.description}
            </p>
          )}

          {/* Dates */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-6 pt-3 border-t border-white/5">
            {cert.issue_date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{language === "fr" ? "Délivré" : "Issued"} {formatDate(cert.issue_date, language)}</span>
              </div>
            )}
            {cert.expiration_date && (
              <span className={isExpired ? "text-red-400" : "text-muted-foreground"}>
                {language === "fr" ? "Expire" : "Expires"} {formatDate(cert.expiration_date, language)}
              </span>
            )}
          </div>

          {/* CTA button */}
          {cert.certificate_url && (
            <a
              href={cert.certificate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl box-gradient text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              {language === "fr" ? "Voir le certificat" : "View certificate"}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}