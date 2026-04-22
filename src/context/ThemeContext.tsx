"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const PRESETS = [
  { label: "Teal / Green",  primary: "185 76% 50%", secondary: "160 85% 60%" },
  { label: "Purple / Pink", primary: "270 76% 60%", secondary: "330 85% 65%" },
  { label: "Blue / Cyan",   primary: "220 76% 55%", secondary: "190 85% 55%" },
  { label: "Orange / Red",  primary: "25 90% 55%",  secondary: "0 85% 60%"   },
  { label: "Rose / Violet", primary: "340 80% 58%", secondary: "280 75% 60%" },
];

type Preset = (typeof PRESETS)[0];

type ThemeContextType = {
  primary: string;
  secondary: string;
  applyPreset: (preset: Preset) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  primary: "185 76% 50%",
  secondary: "160 85% 60%",
  applyPreset: () => {},
});

const applyColors = (primary: string, secondary: string) => {
  const hue = primary.split(" ")[0];
  document.documentElement.style.setProperty("--color-primary", `hsl(${primary})`);
  document.documentElement.style.setProperty("--color-secondary", `hsl(${secondary})`);
  document.documentElement.style.setProperty("--color-background", `hsl(${hue} 60% 3%)`);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [primary, setPrimary] = useState("185 76% 50%");
  const [secondary, setSecondary] = useState("160 85% 60%");

  useEffect(() => {
    const p = localStorage.getItem("color-primary");
    const s = localStorage.getItem("color-secondary");
    if (p) setPrimary(p);
    if (s) setSecondary(s);
  }, []);

  useEffect(() => {
    applyColors(primary, secondary);
  }, [primary, secondary]);

  const applyPreset = (preset: Preset) => {
    setPrimary(preset.primary);
    setSecondary(preset.secondary);
    localStorage.setItem("color-primary", preset.primary);
    localStorage.setItem("color-secondary", preset.secondary);
  };

  return (
    <ThemeContext.Provider value={{ primary, secondary, applyPreset }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);