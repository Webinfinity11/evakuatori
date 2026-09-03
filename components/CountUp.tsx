"use client";

import { useEffect, useRef, useState } from "react";

type Props = { to: number; suffix?: string; duration?: number; className?: string };

/** ციფრი, რომელიც ეკრანზე გამოჩენისას ნულიდან ითვლის. */
export default function CountUp({ to, suffix = "", duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      io.disconnect();

      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / duration, 1);
        // easeOutCubic
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref} className={className}>{n}{suffix}</span>;
}
