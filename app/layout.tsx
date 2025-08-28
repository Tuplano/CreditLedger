import "./globals.css";
import type { Metadata } from "next";
import { logout } from "@/app/auth/action"; // adjust path if needed
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Supabase Google Auth SSR Starter",
  description: "Next.js + TypeScript + Supabase Auth with Google (SSR)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-gray-900 antialiased">
        <header className="border-b p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">My App</h1>

          {/* Logout Button */}
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
              <ArrowRight size={16} />
            </button>
          </form>
        </header>

        <main className="mx-auto max-w-2xl p-6">{children}</main>
      </body>
    </html>
  );
}
