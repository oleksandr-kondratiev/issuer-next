import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import SWRProvider from "./providers/SwrProvider";
import "./theme-config.css";

interface Props {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <SWRProvider>
            <Theme
              accentColor="indigo"
              radius="large"
              suppressHydrationWarning
              appearance="light"
            >
              <header>
                <NavBar />
              </header>
              <main className="p-6">
                <Container>{children}</Container>
              </main>
            </Theme>
          </SWRProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
