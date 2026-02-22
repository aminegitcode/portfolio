import Navbar from "@/components/sections/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProfileProvider } from "@/context/ProfileContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <LanguageProvider>
          <ProfileProvider>
            <Navbar />
            <main>{children}</main>
          </ProfileProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
