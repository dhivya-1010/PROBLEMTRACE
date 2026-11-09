import type { Metadata } from "next";
import "./tailwind.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROBLEMTRACE - Every Problem Has a History. Every Solution Leaves Evidence.",
  description: "A constraint-driven scientific research and verifiable solution lineage social workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
