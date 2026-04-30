"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wrapper for site headers (desktop + mobile).
 * - Sticks to top
 * - Hides when user scrolls down (after some threshold)
 * - Reappears the moment user scrolls up
 * - Adds soft shadow once scrolled past hero
 */
export default function HeaderWrap({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        const past = y > 60;

        // Hide on scroll down past 120px, show on scroll up
        if (past && delta > 4) setHidden(true);
        else if (delta < -2) setHidden(false);

        setScrolled(y > 8);
        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="hd-header-wrap"
      data-hidden={hidden ? "true" : "false"}
      data-scrolled={scrolled ? "true" : "false"}
    >
      {children}
    </div>
  );
}
