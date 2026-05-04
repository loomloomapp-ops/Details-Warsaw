import Link from "next/link";
import { Icons } from "./Icons";
import { type Locale, t, localeHref } from "@/lib/i18n";

export default function MobileBottomNav({ locale }: { locale: Locale }) {
  return (
    <nav className="hd-mobile-bottom-nav" aria-label="Mobile primary">
      <Link href={localeHref("/catalog", locale)} className="hd-bnb-item hd-bnb-catalog">
        <BoxIcon />
        {t("catalog", locale)}
      </Link>
      <a
        href="https://wa.me/48578923625"
        target="_blank"
        rel="noreferrer noopener"
        className="hd-bnb-item hd-bnb-wa"
      >
        <Icons.Whatsapp size={22} color="#fff" />
        WhatsApp
      </a>
    </nav>
  );
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><polyline points="3,8 12,13 21,8" /><line x1="12" y1="13" x2="12" y2="21" />
    </svg>
  );
}
