import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function Stat({
  value,
  label,
  suffix,
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1000; // ms
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Number(start.toFixed(2)));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="text-3xl font-bold text-neutral-900 dark:text-white">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-neutral-500">{label}</span>
    </div>
  );
}