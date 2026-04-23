"use client";
import { useTheme } from "@/context/ThemeContext";
import { Palette, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SAT = { p: 76, s: 85 };
const LIT = { p: 50, s: 60 };

function buildGradient(type: "p" | "s") {
  const steps = 12;
  const colors = [];
  for (let i = 0; i <= steps; i++) {
    const h = Math.round((i / steps) * 360);
    colors.push(`hsl(${h} ${type === "p" ? SAT.p : SAT.s}% ${type === "p" ? LIT.p : LIT.s}%)`);
  }
  return `linear-gradient(to right, ${colors.join(", ")})`;
}

function hslFromState(type: "p" | "s", hue: number) {
  return `${hue} ${type === "p" ? SAT.p : SAT.s}% ${type === "p" ? LIT.p : LIT.s}%`;
}

type SliderProps = {
  type: "p" | "s";
  hue: number;
  onChange: (hue: number) => void;
};

const ColorSlider = ({ type, hue, onChange }: SliderProps) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getPct = () => hue / 360;

  const handleMove = (clientX: number) => {
    if (!stripRef.current) return;
    const rect = stripRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    onChange(Math.round((x / rect.width) * 360));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) handleMove(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const color = `hsl(${hslFromState(type, hue)})`;

  return (
    <div>
      <div
        ref={stripRef}
        onMouseDown={handleMouseDown}
        className="w-full h-7 rounded-lg cursor-crosshair relative border border-white/8 select-none"
        style={{ background: buildGradient(type) }}
      >
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white top-1/2 pointer-events-none"
          style={{
            left: `${getPct() * 100}%`,
            transform: "translate(-50%, -50%)",
            background: color,
            boxShadow: "0 0 0 2px rgba(0,0,0,0.4)",
          }}
        />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div
          className="w-7 h-7 rounded-lg border border-white/10 flex-shrink-0"
          style={{ background: color }}
        />
        <span className="text-[11px] text-muted-foreground font-mono">
          hsl({hslFromState(type, hue)})
        </span>
      </div>
    </div>
  );
};

export const ThemePicker = () => {
  const { primary, secondary, applyPreset } = useTheme();
  const [open, setOpen] = useState(false);

  const [primaryHue, setPrimaryHue] = useState(() =>
    parseInt(primary.split(" ")[0])
  );
  const [secondaryHue, setSecondaryHue] = useState(() =>
    parseInt(secondary.split(" ")[0])
  );

  useEffect(() => {
    setPrimaryHue(parseInt(primary.split(" ")[0]));
  }, [primary]);

  useEffect(() => {
    setSecondaryHue(parseInt(secondary.split(" ")[0]));
  }, [secondary]);

  const handleApply = () => {
    applyPreset({
      label: "Custom",
      primary: hslFromState("p", primaryHue),
      secondary: hslFromState("s", secondaryHue),
    });
    setOpen(false);
  };

  const pColor = `hsl(${hslFromState("p", primaryHue)})`;
  const sColor = `hsl(${hslFromState("s", secondaryHue)})`;
  const gradientStyle = `linear-gradient(120deg, ${pColor} 30%, ${sColor} 100%)`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="glass-card rounded-2xl p-5 mb-3 flex flex-col gap-4 w-64">

          {/* Header */}
          <div className="flex items-center justify-between">
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

          {/* Primary */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium mb-2">
              Primary
            </p>
            <ColorSlider type="p" hue={primaryHue} onChange={setPrimaryHue} />
          </div>

          <div className="h-px bg-border/30" />

          {/* Secondary */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium mb-2">
              Secondary
            </p>
            <ColorSlider type="s" hue={secondaryHue} onChange={setSecondaryHue} />
          </div>

          <div className="h-px bg-border/30" />

          {/* Preview */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium mb-2">
              Preview
            </p>
            <div className="flex gap-2">
              <div
                className="flex-1 h-8 rounded-lg border border-white/8"
                style={{ background: gradientStyle }}
              />
              <div
                className="px-3 h-8 rounded-lg flex items-center text-sm font-bold border border-white/8"
                style={{
                  backgroundImage: gradientStyle,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Aa
              </div>
            </div>
          </div>

          {/* Apply */}
          <button
            onClick={handleApply}
            className="w-full py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              background: gradientStyle,
              color: "hsl(222 47% 6%)",
            }}
          >
            Apply
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
        style={{ background: gradientStyle }}
      >
        <Palette className="w-5 h-5" style={{ color: "hsl(222 47% 6%)" }} />
      </button>
    </div>
  );
};