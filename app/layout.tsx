import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adaline Clone - Hero Section",
  description: "Pixel-perfect clone of Adaline.ai hero section with scroll animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


