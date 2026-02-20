import Navbar from "@/components/sections/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="" >
        <LanguageProvider>
          <Navbar />
          <main className="">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
