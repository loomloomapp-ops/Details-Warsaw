"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps a block, fades it in once it scrolls into view.
 * Pass `delay` (ms) to stagger.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Element = Tag as any;
  return (
    <Element
      ref={ref}
      className={`hd-reveal ${visible ? "is-visible" : ""} ${className ?? ""}`.trim()}
      style={style}
    >
      {children}
    </Element>
  );
}
