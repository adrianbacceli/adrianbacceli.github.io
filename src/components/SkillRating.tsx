import { useRef } from "react";
import { useInView, motion } from "framer-motion";

type Level = 0 | 1 | 2 | 3;

const LEVEL_LABEL: Record<Level, string> = {
  0: "Basic",
  1: "Practical Knowledge",
  2: "Professional Experience",
  3: "Certified",
};

export default function SkillRating({
  label,
  level,
}: {
  label: string;
  level: Level;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex items-center justify-between gap-4">
      <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-200">
        {label}
      </span>

      {/* 0–3 meter */}
      <div className="flex items-center gap-2" aria-label={`${label}: ${LEVEL_LABEL[level]}`}>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={
              isInView
                ? { opacity: i <= level ? 1 : 0.25, scale: 1 }
                : { opacity: 0.2, scale: 0.9 }
            }
            transition={{ delay: i * 0.05, duration: 0.2 }}
            className={[
              "h-3.5 w-3.5 rounded-full border",
              i <= level
                ? "border-transparent bg-neutral-900 dark:bg-white"
                : "border-neutral-300 dark:border-neutral-600 bg-transparent",
            ].join(" ")}
            title={i as Level === level ? LEVEL_LABEL[level] : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function SkillLegend() {
  const items: Array<{ level: 3 | 2 | 1 | 0; text: string }> = [
    { level: 3, text: "Certified" },
    { level: 2, text: "Professional Experience" },
    { level: 1, text: "Practical Knowledge" },
    { level: 0, text: "Basic" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
      {items.map(({ level, text }) => (
        <div key={level} className="flex items-center gap-1.5">
          <span
            className={[
              "h-3 w-3 rounded-full border",
              level >= 1
                ? "border-transparent bg-neutral-900 dark:bg-white"
                : "border-neutral-300 dark:border-neutral-600 bg-transparent",
            ].join(" ")}
          />
          <span>{`${level} — ${text}`}</span>
        </div>
      ))}
    </div>
  );
}