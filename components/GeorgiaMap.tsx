"use client";

import { useEffect, useRef, useState } from "react";

const GEORGIA_PATH = "M517.0,494.6L517.4,490.8L516.1,484.9L511.5,480.6L505.0,477.9L493.1,478.9L482.1,476.1L474.2,468.6L472.5,462.9L477.0,458.3L473.6,454.4L459.9,445.2L437.5,422.3L424.7,417.2L419.7,402.9L414.7,399.8L403.9,398.5L392.7,399.9L390.2,401.5L386.8,403.8L377.9,421.7L371.7,427.8L356.4,424.9L343.8,420.7L333.5,418.4L313.6,416.9L290.9,416.6L275.6,429.3L269.0,427.6L257.5,421.4L238.7,416.2L228.8,412.2L257.5,374.4L266.0,352.0L266.3,338.4L266.6,321.3L251.7,285.8L238.9,235.4L225.6,182.9L215.3,167.1L171.8,148.9L161.8,128.3L128.2,101.7L81.5,90.1L72.3,85.2L31.7,51.7L0.0,30.1L6.8,17.1L15.9,3.3L25.7,0.0L54.4,5.4L80.8,11.6L100.0,7.2L123.0,18.0L144.0,30.5L165.0,39.2L206.1,47.5L221.4,58.9L239.3,70.4L309.5,76.2L315.1,74.4L320.3,72.8L343.8,68.6L364.6,69.4L386.6,83.3L400.6,82.5L415.6,80.4L435.0,87.8L450.1,96.1L451.4,104.5L464.7,116.6L503.4,135.2L534.7,145.7L544.5,153.0L568.3,165.2L570.7,169.1L570.2,174.1L563.4,183.2L561.7,191.4L564.9,196.0L574.8,200.5L594.4,201.5L601.5,195.6L616.1,191.5L630.6,184.0L650.0,174.0L676.3,164.9L686.9,164.9L697.0,167.7L704.1,172.7L716.0,191.4L727.8,165.3L730.9,163.4L741.7,168.6L760.8,175.9L774.1,179.7L781.3,185.1L801.5,208.9L834.2,207.7L848.1,211.3L855.5,215.2L858.8,219.9L853.0,243.5L844.9,268.1L845.5,274.1L858.7,283.4L876.5,293.2L886.1,301.1L892.7,308.2L906.8,313.5L923.4,316.9L931.3,317.3L939.5,323.2L961.0,334.4L963.7,337.2L960.1,344.4L951.6,357.4L944.7,364.1L937.2,365.1L929.7,368.1L927.1,375.1L926.7,384.1L928.0,390.6L929.9,393.1L937.6,395.2L945.2,414.1L957.0,423.7L975.5,434.6L992.0,447.1L1000.0,458.5L998.5,466.8L993.1,484.0L979.4,498.3L967.9,502.0L963.9,500.6L956.4,496.2L941.4,485.1L925.0,476.4L912.5,479.2L904.2,482.5L887.9,478.6L868.6,471.0L858.5,463.6L854.1,458.1L857.1,448.3L813.2,430.7L792.1,425.8L782.6,431.1L750.4,457.7L746.5,460.4L722.0,464.0L721.9,466.2L727.5,471.9L726.5,473.6L685.1,474.3L671.4,477.7L634.7,473.3L622.6,475.3L612.3,479.4L587.2,484.2L569.9,489.8L547.7,492.7L524.9,492.9L517.0,494.6Z";

type City = { name: string; x: number; y: number; eta: string; hub?: boolean };

const CITIES: City[] = [
  { name: "თბილისი", x: 72.43, y: 74.2, eta: "30 წუთი", hub: true },
  { name: "რუსთავი", x: 75.01, y: 80.83, eta: "45 წუთი" },
  { name: "გორი", x: 61.7, y: 63.41, eta: "1.5 საათი" },
  { name: "თელავი", x: 82.08, y: 66.03, eta: "1.5 საათი" },
  { name: "ქუთაისი", x: 40.93, y: 52.08, eta: "3 საათი" },
  { name: "ზუგდიდი", x: 28.27, y: 42.45, eta: "4 საათი" },
  { name: "ფოთი", x: 25.3, y: 56.95, eta: "4 საათი" },
  { name: "ბათუმი", x: 24.85, y: 76.97, eta: "5 საათი" },
];

export default function GeorgiaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      <svg viewBox="0 0 1000 502" className="w-full" role="img" aria-label="დაფარვის ზონა — საქართველო">
        <defs>
          <pattern id="dots" width="11" height="11" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.7" fill="#dcc9bb" />
          </pattern>
          <clipPath id="clipGeo">
            <path d={GEORGIA_PATH} />
          </clipPath>
        </defs>

        <path d={GEORGIA_PATH} fill="#f5ece5" />
        <rect width="1000" height="502" fill="url(#dots)" clipPath="url(#clipGeo)" />

        {/* კონტური, რომელიც თავად ეხაზება */}
        <path
          d={GEORGIA_PATH}
          fill="none"
          stroke="#e0cec1"
          strokeWidth="2.5"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: live ? 0 : 1,
            transition: "stroke-dashoffset 2.2s cubic-bezier(0.22,0.68,0.26,1)",
          }}
        />
      </svg>

      {CITIES.map((c, i) => (
        <div
          key={c.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            opacity: live ? undefined : 0,
            animation: live ? `pop-in 0.55s var(--ease-out-soft) ${600 + i * 110}ms forwards` : undefined,
          }}
        >
          <div className="group relative flex flex-col items-center">
            {c.hub && <span className="absolute size-5 rounded-full bg-brand/40 animate-pulse-ring" aria-hidden />}
            <span
              className={
                c.hub
                  ? "relative size-5 rounded-full border-[3px] border-white bg-brand shadow-lg shadow-brand/40"
                  : "relative size-3 rounded-full border-2 border-white bg-ink/70 shadow transition group-hover:scale-125 group-hover:bg-brand"
              }
            />
            <span
              className={
                "mt-1.5 whitespace-nowrap text-[11px] font-semibold transition sm:text-xs " +
                (c.hub ? "text-ink" : "text-ink/55 group-hover:text-ink")
              }
            >
              {c.name}
            </span>
            <span className="pointer-events-none absolute -top-9 z-10 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">
              მისვლა ≈ {c.eta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
