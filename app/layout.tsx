import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

export const metadata: Metadata = {
  title: "post22 — A guide for people in their twenties who feel stuck",
  description:
    "A curated set of resources and steps to help rebuild direction, skills, and income after college.",
};

// Blocking script: applies .dark before first paint to avoid flash
const themeScript = `
  try {
    const t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className="min-h-screen flex flex-col">
          <ThemeProvider>
            <ConvexClientProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
