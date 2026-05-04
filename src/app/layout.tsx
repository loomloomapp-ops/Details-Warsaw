import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import MobileBottomNav from "@/components/site/MobileBottomNav";
import { WhatsappFab } from "@/components/site/Blocks";
import { getLocale } from "@/lib/locale-server";

export const metadata: Metadata = {
  title: "Hybrid Doktor — Toyota hybrid parts",
  description: "Hybrid Doktor — Toyota hybrid parts",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  return (
    <html lang={locale === "ua" ? "uk" : locale === "pl" ? "pl" : "ru"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <WhatsappFab />
        <MobileBottomNav locale={locale} />
      </body>
    </html>
  );
}
