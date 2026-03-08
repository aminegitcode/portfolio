"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/Badge";
import { useLanguage } from "@/context/LanguageContext";
import { getCertificates } from "@/services/certificates.service";
import type { Certificate } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import CertificateCard from "../ui/CertificateCard";
import CertificateModal from "../ui/CertificateModal";

function Certificates() {
  const { language } = useLanguage();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    getCertificates()
      .then(setCertificates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" className="bg-background">
      <div className="px-10 lg:px-20 container mx-auto flex flex-col items-center pt-20 pb-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="items-center flex-col flex text-center mb-16"
        >
          <Badge className="mb-5">
            {language === "fr" ? "Certifications" : "Certificates"}
          </Badge>
          <h2 className="section-title lg:text-5xl">
            {language === "fr" ? (
              <>Mes <span className="gradient-text">Certifications</span></>
            ) : (
              <>My <span className="gradient-text">Certificates</span></>
            )}
          </h2>
          <p className="section-subtitle text-center max-w-2xl">
            {language === "fr"
              ? "Des certifications qui valident mes compétences et témoignent de mon engagement dans l'apprentissage continu."
              : "Certifications that validate my skills and reflect my commitment to continuous learning."}
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="text-muted-foreground text-sm">
            {language === "fr" ? "Chargement..." : "Loading..."}
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            {language === "fr" ? "Aucun certificat trouvé." : "No certificates found."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {certificates.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                language={language}
                index={index}
                onClick={() => setSelected(cert)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CertificateModal
            cert={selected}
            language={language}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Certificates;