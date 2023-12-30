import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import "./theme-config.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="ruby" radius="large" suppressHydrationWarning>
          <header>
            <NavBar />
          </header>
          <main className="p-6">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
