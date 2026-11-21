import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: {
    template: "%s · NASU Blood Drive",
    default: "NASU Blood Donation Campaign",
  },
  description:
    "Bust blood donation myths, discover how your blood works, and create your own interactive donor card.",
};

export const viewport: Viewport = {
  themeColor: "#e11d48",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <Providers>
          <SiteHeader />
          <main className="mx-auto max-w-3xl px-4 pb-8 pt-4 sm:pb-10">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
