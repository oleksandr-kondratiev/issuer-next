import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
