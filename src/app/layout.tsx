import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perminus Karanja | Full-Stack Developer",
  description: "Portfolio of Perminus Karanja, a full-stack web developer specializing in Flask, Next.js, and Squarespace.",
  keywords: ["web developer", "full-stack", "portfolio", "Flask", "Next.js", "Squarespace", "Python", "JavaScript"],
  authors: [{ name: "Perminus Karanja", url: "https://github.com/permoK" }],
  creator: "Perminus Karanja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
