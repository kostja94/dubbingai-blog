import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dubbing AI Blog",
  description: "Voice changer guides, soundboard ideas and streaming playbooks from Dubbing AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
