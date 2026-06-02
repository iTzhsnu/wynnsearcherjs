import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WynnSearcher for Web (1.0)",
  description: "WynnSearcher port to web (1.0)",
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
