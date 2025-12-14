import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import Relogio from "@/components/Relogio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio React & Next.js",
  description: "Projeto desenvolvido com Next.js",
};

const currentYear = new Date().getFullYear();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col`}
      >
        <header className="w-full bg-white dark:bg-gray-800 shadow-md py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              React & Next.js
            </h1>
            <nav className="flex flex-wrap justify-center gap-6 text-lg">
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Intro
              </Link>
              <Link href="/sobre" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sobre
              </Link>
              <Link href="/caracteristicas" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Características
              </Link>
              <Link href="/tecnologias" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Tecnologias
              </Link>
              <Link href="/projetos" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Projetos
              </Link>
              <Link href="/contador" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contador
              </Link>
              <Link href="/input" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Input
              </Link>
              <Link href="/loja" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Loja
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 min-h-[70vh]">
            {children}
          </div>
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>DIW © {currentYear} Todos os direitos reservados.</p>
            <Relogio />
          </div>
        </footer>
      </body>
    </html>
  );
}