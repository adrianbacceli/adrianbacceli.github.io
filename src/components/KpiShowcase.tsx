import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import "./KpiShowcase.css";

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

type Props = {
  locale: string;
  eyebrow: string;
  heading: string;
  instruction: string;
  closeLabel: string;
  programExecution: string;
  metrics: Metric[];
};

function formatMetric(metric: Metric, locale: string, value = metric.value) {
  return `${metric.prefix ?? ""}${Math.round(value).toLocaleString(locale)}${metric.suffix ?? ""}`;
}

function CountUp({ metric, locale, active, delay = 0 }: { metric: Metric; locale: string; active: boolean; delay?: number }) {
  const [displayValue, setDisplayValue] = useState(active ? metric.value : 0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setDisplayValue(metric.value);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;
    const duration = 950;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = Math.max(0, time - startTime - delay);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(metric.value * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, delay, metric.value, reduceMotion]);

  return <>{formatMetric(metric, locale, displayValue)}</>;
}

function MetricButton({ metric, locale, metricIndex, active, delay, className, onSelect }: { metric: Metric; locale: string; metricIndex: number; active: boolean; delay: number; className?: string; onSelect: () => void }) {
  return (
    <button type="button" data-metric-index={metricIndex} className={className} onClick={onSelect} aria-label={`${formatMetric(metric, locale)} ${metric.label}`}>
      <strong><CountUp metric={metric} locale={locale} active={active} delay={delay} /></strong>
      <span>{metric.label}</span>
    </button>
  );
}

export default function KpiShowcase({ locale, eyebrow, heading, instruction, closeLabel, programExecution, metrics }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);
  const lastSelectedRef = useRef<number | null>(null);
  const activeMetric = selected === null ? null : metrics[selected];

  const openMetric = (index: number) => {
    lastSelectedRef.current = index;
    setSelected(index);
  };

  const closeMetric = useCallback(() => {
    setSelected(null);
    window.setTimeout(() => {
      const index = lastSelectedRef.current;
      if (index !== null) sectionRef.current?.querySelector<HTMLButtonElement>(`[data-metric-index="${index}"]`)?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMetric();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, closeMetric]);

  return (
    <section ref={sectionRef} id="impact" className="kpi-showcase mx-auto max-w-6xl px-6 py-16">
      <header className="kpi-intro">
        <p>{eyebrow}</p>
        <h2>{heading}</h2>
        <span>{instruction}</span>
      </header>

      <div className="proof-stage">
        <AnimatePresence mode="wait" initial={false}>
          {activeMetric ? (
            <motion.article key="detail" className="metric-detail" initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.015 }} transition={{ duration: .22 }}>
              <button ref={closeRef} type="button" className="metric-detail-close" onClick={closeMetric} aria-label={closeLabel}><X /></button>
              <span>{eyebrow}</span>
              <strong>{formatMetric(activeMetric, locale)}</strong>
              <h3>{activeMetric.label}</h3>
              <p>{activeMetric.detail}</p>
            </motion.article>
          ) : (
            <motion.div key="grid" className="editorial-proof" initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.015 }} transition={{ duration: .22 }}>
              <article className="editorial-anchor">
                <span>{programExecution}</span>
                <MetricButton metric={metrics[0]} locale={locale} metricIndex={0} active={inView} delay={0} onSelect={() => openMetric(0)} />
              </article>
              <div className="editorial-support">
                {metrics.slice(1, 3).map((metric, index) => (
                  <MetricButton key={metric.label} metric={metric} locale={locale} metricIndex={index + 1} active={inView} delay={(index + 1) * 70} onSelect={() => openMetric(index + 1)} />
                ))}
              </div>
              <div className="editorial-footer">
                {metrics.slice(3).map((metric, index) => (
                  <MetricButton key={metric.label} metric={metric} locale={locale} metricIndex={index + 3} active={inView} delay={(index + 3) * 70} onSelect={() => openMetric(index + 3)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
