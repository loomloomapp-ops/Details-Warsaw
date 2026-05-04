import * as React from "react";

type P = { size?: number; color?: string };

export const Icons = {
  ArrowRight: ({ size = 18, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12" /><polyline points="14,6 20,12 14,18" />
    </svg>
  ),
  ChevronDown: ({ size = 20, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  ),
  ChevronRight: ({ size = 16, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,6 15,12 9,18" />
    </svg>
  ),
  Search: ({ size = 16, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  ),
  User: ({ size = 18, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  ),
  Mail: ({ size = 18, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3,7 12,13 21,7" />
    </svg>
  ),
  Phone: ({ size = 18, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.97.33 1.92.63 2.83a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45c.91.3 1.86.51 2.83.63A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  MapPin: ({ size = 18, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s-8-7.58-8-13a8 8 0 1 1 16 0c0 5.42-8 13-8 13Z" /><circle cx="12" cy="9" r="3" />
    </svg>
  ),
  Comment: ({ size = 18, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  ),
  Box: ({ size = 26, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><polyline points="3,8 12,13 21,8" /><line x1="12" y1="13" x2="12" y2="21" />
    </svg>
  ),
  Card: ({ size = 26, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  Truck: ({ size = 26, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h11v11H3zM14 9h4l3 3v5h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="17" cy="19" r="2" />
    </svg>
  ),
  Headset: ({ size = 26, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2" y="14" width="5" height="6" rx="1.5" /><rect x="17" y="14" width="5" height="6" rx="1.5" /><path d="M20 20a4 4 0 0 1-4 4h-2" />
    </svg>
  ),
  Shield: ({ size = 22, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Engine: ({ size = 22, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10h3V7h5v3h3v-2h3v8h-3v-2h-3v3H8v-3H5z" />
    </svg>
  ),
  Battery: ({ size = 22, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="16" height="10" rx="2" /><line x1="21" y1="11" x2="21" y2="15" /><path d="M7 13h3M12 11v4M14 13h3" />
    </svg>
  ),
  Wrench: ({ size = 28, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a5 5 0 0 0-6.8 6.8L3 18l3 3 4.9-4.9a5 5 0 0 0 6.8-6.8L14 12l-2-2 2.7-3.7Z" />
    </svg>
  ),
  Menu: ({ size = 22, color = "currentColor" }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  ),
  Instagram: ({ size = 20 }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  Whatsapp: ({ size = 34, color = "#fff" }: P) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.3 4.66A15.84 15.84 0 0 0 16.04 0C7.27 0 .12 7.13.12 15.9c0 2.8.74 5.54 2.13 7.94L0 32l8.36-2.18a15.93 15.93 0 0 0 7.67 1.95h.01c8.77 0 15.92-7.13 15.92-15.9 0-4.25-1.66-8.24-4.66-11.21Zm-11.27 24.5h-.01a13.2 13.2 0 0 1-6.73-1.84l-.48-.29-4.96 1.3 1.32-4.84-.31-.5a13.18 13.18 0 0 1-2.03-7.06c0-7.3 5.96-13.24 13.27-13.24 3.54 0 6.87 1.38 9.37 3.88a13.16 13.16 0 0 1 3.88 9.37c0 7.3-5.95 13.22-13.32 13.22Zm7.27-9.91c-.4-.2-2.36-1.16-2.72-1.3-.36-.13-.63-.2-.9.2-.26.4-1.03 1.3-1.27 1.56-.23.27-.46.3-.86.1-.4-.2-1.69-.62-3.21-1.98-1.19-1.06-1.99-2.37-2.22-2.77-.23-.4-.02-.61.18-.81.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.69l-.76-.01c-.27 0-.7.1-1.06.5s-1.4 1.36-1.4 3.32 1.43 3.85 1.63 4.12c.2.27 2.81 4.3 6.81 6.03 2.39 1.03 3.32 1.12 4.51.95.73-.1 2.36-.97 2.69-1.9.33-.93.33-1.73.23-1.9-.1-.16-.36-.26-.76-.46Z"
      />
    </svg>
  ),
};

export const Logo = ({ compact = false, onDark = false }: { compact?: boolean; onDark?: boolean }) => {
  const stroke = onDark ? "#fff" : "#447A44";
  const text = onDark ? "#fff" : "#000";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden>
        <polygon points="23,3 41,13 41,33 23,43 5,33 5,13" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
        <polygon points="23,8 36.5,15.5 36.5,30.5 23,38 9.5,30.5 9.5,15.5" fill="none" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" opacity="0.55" />
        <text x="23" y="27.4" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="13" fill={stroke} letterSpacing="0.5">HD</text>
      </svg>
      {!compact && (
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, letterSpacing: 0.5, color: text }}>HYBRID</div>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, letterSpacing: 0.5, color: text }}>DOKTOR</div>
          <div style={{ marginTop: 3, fontFamily: "Manrope", fontWeight: 500, fontSize: 6, letterSpacing: 1.6, color: onDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>TOYOTA HYBRID SPECIALISTS</div>
        </div>
      )}
    </div>
  );
};
