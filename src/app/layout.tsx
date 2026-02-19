import Navbar from "@/components/sections/Navbar";
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="" >
        
          <Navbar/>
        <main className="pt-40">
          {children}
        </main>
      </body>
    </html>
  );
}
