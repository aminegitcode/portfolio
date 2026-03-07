
import { MapPin, Calendar, ExternalLink, GraduationCap } from "lucide-react";
import type { Education } from "@/types";


const PERIOD_COLORS = [
    "bg-primary/10 border-primary/20 text-primary",
    "bg-purple-400/10 border-purple-400/20 text-purple-400",
    "bg-orange-400/10 border-orange-400/20 text-orange-400",
    "bg-yellow-400/10 border-yellow-400/20 text-yellow-400",
    "bg-pink-400/10 border-pink-400/20 text-pink-400",
    "bg-secondary/10 border-secondary/20 text-secondary",
  "bg-blue-400/10 border-blue-400/20 text-blue-400",
];interface EducationCardProps {
  edu: Education;
  language: string;
  isLast: boolean;
  index: number; 
}

export default function EducationCard({ edu, language, isLast, index }: EducationCardProps) {
  if (!edu) return null;

  const periodColor = PERIOD_COLORS[index % PERIOD_COLORS.length];

  return (
    <div className="relative pl-10 transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute left-0 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-[0_0_8px] shadow-primary/50" />

      <div className="bg-background/40 border border-primary/20 hover:border-primary/40 hover-glow  rounded-2xl p-6 transition-all duration-300 hover:bg-background/20 w-full">
        <div className="flex items-start gap-4">

          {edu.logo_url ? (
            <img src={edu.logo_url} alt={edu.school_name} className="w-13 h-13 rounded-lg object-contain" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary">
              <GraduationCap />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {language === "fr" ? edu.degree : edu.degree_an}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  {edu.school_url ? (
                    <a href={edu.school_url} target="_blank" rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                      {language === "fr" ? edu.school_name : edu.school_name_an}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-primary text-sm font-medium">
                      {language === "fr" ? edu.school_name : edu.school_name_an}
                    </span>
                  )}
                </div>
              </div>

              {/* Period badge — couleur selon l'index de la card */}
              <span className={`text-xs px-4 py-3 rounded-xl border flex items-center gap-1.5 ${periodColor}`}>
                <Calendar className="w-3 h-3" />
                {language === "fr" ? edu.period : edu.period_en}
              </span>
            </div>

      
            <div className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
              <MapPin className="w-3 h-3" />
              <span>{edu.location}</span>
            </div>

            {(edu.description || edu.description_en) && (
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {language === "fr" ? edu.description : edu.description_en}
              </p>
            )}

            {/* Tags — couleur différente par tag */}
            {edu.tags && edu.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {edu.tags.map((tag, i) => (
                  <span key={tag} className={`text-xs px-3 text-primary py-2 rounded-full border border-primary/30 bg-primary/6 `}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}