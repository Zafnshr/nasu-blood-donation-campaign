import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NASU Blood Donation Campaign",
  description: "Project environment ready for planning & development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
