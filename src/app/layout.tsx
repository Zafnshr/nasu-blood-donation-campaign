import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
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

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: {
    template: "%s · حملة NASU للتبرع بالدم",
    default: "حملة NASU للتبرع بالدم · NASU Blood Drive",
  },
  description:
    "اكشف خرافات التبرع بالدم، تعرّف على مكوّنات دمك وفصيلتك، وأنشئ بطاقة المتبرع التفاعلية الخاصة بك.",
};

export const viewport: Viewport = {
  themeColor: "#c41e3a",
  width: "device-width",
  initialScale: 1,
};

const PREFS_INIT_SCRIPT = `(function(){try{var r=localStorage.getItem("nasu-blood-prefs-v1");var p=r?JSON.parse(r):{};var d=document.documentElement;var dark=p.theme==="dark";var loc=p.locale==="en"?"en":"ar";d.classList.toggle("dark",dark);d.lang=loc;d.dir=loc==="ar"?"rtl":"ltr";}catch(e){document.documentElement.lang="ar";document.documentElement.dir="rtl";}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${jakarta.variable} ${ibmArabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFS_INIT_SCRIPT }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-cream text-ink antialiased transition-colors duration-200 dark:bg-[#121011] dark:text-[#f5f2f0]"
      >
        <Providers>
          <SiteHeader />
          <main className="mx-auto max-w-5xl px-4 pb-8 pt-4 sm:px-6 sm:pb-10 lg:px-8">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
