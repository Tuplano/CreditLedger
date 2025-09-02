// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/headerr";
import Footer from "@/components/footerr";

export const metadata: Metadata = {
  title: "Supabase Google Auth SSR Starter",
  description: "Next.js + TypeScript + Supabase Auth with Google (SSR)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-gray-900 antialiased">
        <Header />
        <main className="w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
