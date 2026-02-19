import Navbar from "@/components/sections/Navbar";
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="" >
        <nav>
          <Navbar/>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
