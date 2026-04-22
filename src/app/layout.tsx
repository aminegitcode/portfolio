import Navbar from "@/components/sections/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemePicker } from "@/components/ui/ThemePicker";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <ThemePicker />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}