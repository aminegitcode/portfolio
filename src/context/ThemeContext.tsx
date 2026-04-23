"use client";
import { createContext, useContext, useState, useEffect } from "react";

export type Preset = {
  label: string;
  primary: string;
  secondary: string;
};

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