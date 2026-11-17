import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const display = JetBrains_Mono({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hoàng Thiện Quân | Backend Developer (C#, ASP.NET Core)",
  description:
    "Portfolio of Hoàng Thiện Quân, a backend developer working in C#, ASP.NET Core and SQL. Skills, projects, experience and contact details.",
  openGraph: {
    title: "Hoàng Thiện Quân | Backend Developer",
    description:
      "Backend developer working in C#, ASP.NET Core and SQL. Skills, projects and contact details.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
