import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WynnSearcher for Web (W.I.P)",
  description: "WynnSearcher port to web (w.i.p)",
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
