"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

const EASE = [0.2, 0.8, 0.2, 1] as const;

/**
 * Typewriter headline: characters appear left to right with a caret, once.
 * It starts when the text scrolls into view (straight away for the hero).
 * The full text always occupies its space, so nothing shifts while it types.
 */
export function Typewriter({
  text,
  className = "",
  delay = 0,
  speed = 70,
  markChars = 0,
}: {
  text: string;
  className?: string;
  /** ms to wait after coming into view before the first character */
  delay?: number;
  /** ms per character */
  speed?: number;
  /** how many leading characters use the dim "mark" colour (e.g. a prompt sign) */
  markChars?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const chars = Array.from(text);
  const [count, setCount] = useState(0);
  const [caret, setCaret] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    let hide: ReturnType<typeof setTimeout> | undefined;
    const total = Array.from(text).length;
    const start = setTimeout(() => {
      setCaret(true);
      let n = 0;
      interval = setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= total) {
          clearInterval(interval);
          hide = setTimeout(() => setCaret(false), 900);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
      clearTimeout(hide);
    };
  }, [inView, reduce, text, delay, speed]);

  const shown = reduce ? chars.length : count;

  return (
    <span ref={ref} aria-hidden className={className}>
      {chars.map((ch, i) => (
        <Fragment key={i}>
          {caret && i === shown && <Caret />}
          <span
            className={i < markChars ? "text-mark" : undefined}
            style={i < shown ? undefined : { visibility: "hidden" }}
          >
            {ch}
          </span>
        </Fragment>
      ))}
      {caret && shown >= chars.length && <Caret />}
    </span>
  );
}

function Caret() {
  return (
    <span className="relative inline-block w-0">
      <span className="caret absolute bottom-0 left-[0.05em] h-[0.82em] w-[0.07em] bg-accent" />
    </span>
  );
}

/** Fades and lifts its children in once, on page load (hero only). */
export function Enter({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Section heading: the index number, the title typed out left to right, then
 * a rule that draws across. Plays once when scrolled to.
 */
export function SectionTitle({
  index,
  title,
  lead,
}: {
  index: string;
  title: string;
  lead: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.header
      className="mb-12 md:mb-16"
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      <p className="font-mono text-sm text-accent">
        <span className="text-mark">/</span> {index}
      </p>
      <h2
        aria-label={title}
        className="mt-3 font-mono text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight"
      >
        <Typewriter text={title} className="text-gradient block pb-[0.1em]" />
      </h2>
      <motion.span
        aria-hidden
        className="mt-6 block h-px origin-left bg-gradient-to-r from-accent via-glow to-transparent"
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
      />
      <p className="mt-6 max-w-xl text-lg text-muted">{lead}</p>
    </motion.header>
  );
}

/** Glass card whose border lights up under the pointer. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className={`card ${className}`} onPointerMove={onMove}>
      {children}
    </div>
  );
}
