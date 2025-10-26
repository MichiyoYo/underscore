import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Underscore - AI Soundtrack for Your Books",
  description: "Creates a soundtrack for your books using AI",
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
