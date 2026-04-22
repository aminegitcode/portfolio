"use client";
import { useTheme, PRESETS } from "@/context/ThemeContext";
import { Palette, X } from "lucide-react";
import { useState } from "react";

export const ThemePicker = () => {
  const { applyPreset, primary, secondary } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="glass-card rounded-2xl p-4 mb-3 flex flex-col gap-2 w-56">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Theme
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {PRESETS.map((preset) => {
            const isActive =
              preset.primary === primary && preset.secondary === secondary;
            return (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary/10 border border-primary/30 text-foreground"
                    : "hover:bg-muted/50 text-muted-foreground border border-transparent"
                }`}
              >
                <span className="flex gap-1 flex-shrink-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/10"
                    style={{ background: `hsl(${preset.primary})` }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/10"
                    style={{ background: `hsl(${preset.secondary})` }}
                  />
                </span>
                {preset.label}
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full box-gradient flex items-center justify-center shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
      >
        <Palette className="w-5 h-5 text-primary-foreground" />
      </button>
    </div>
  );
};