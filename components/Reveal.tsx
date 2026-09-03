"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
};

/** სქროლზე გამოჩენა — fade + ამოწევა, ერთჯერადად. */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // თუ ელემენტი უკვე ეკრანზეა (გვერდის ჩატვირთვისას), დაუყოვნებლივ ვაჩვენოთ
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
