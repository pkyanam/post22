import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

export const metadata: Metadata = {
  title: "post22 — A guide for people in their twenties who feel stuck",
  description:
    "A curated set of resources and steps to help rebuild direction, skills, and income after college.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <ConvexClientProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
