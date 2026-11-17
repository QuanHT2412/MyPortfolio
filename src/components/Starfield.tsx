"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0.25..1: nearer stars are bigger, faster and shift more with the pointer
  r: number;
  phase: number;
  speed: number;
  color: string;
};

const COLORS = ["250,250,250", "250,250,250", "250,250,250", "255,255,255", "161,161,170"];

/**
 * Full-screen particle field behind the page. One 2D canvas, capped DPR,
 * paused while the tab is hidden, and drawn once (no loop) under reduced motion.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;
    let last = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(190, Math.round((w * h) / 8500));
      stars = Array.from({ length: count }, () => {
        const z = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.4 + z * 1.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const draw = (t: number) => {
      const dt = Math.min(50, t - last) / 1000;
      last = t;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduce) {
          s.y -= s.z * 9 * dt;
          s.x += s.z * 2.5 * dt;
          if (s.y < -4) s.y = h + 4;
          if (s.x > w + 4) s.x = -4;
        }
        const twinkle = 0.45 + 0.55 * Math.sin(s.phase + (t / 1000) * s.speed);
        const px = s.x - pointer.x * s.z * 26;
        const py = s.y - pointer.y * s.z * 26;
        ctx.fillStyle = `rgba(${s.color},${(0.25 + 0.6 * twinkle) * s.z})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / w - 0.5;
      pointer.ty = e.clientY / h - 0.5;
    };
    const onResize = () => {
      build();
      if (reduce) draw(0);
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };

    build();
    if (reduce) draw(0);
    else raf = requestAnimationFrame(draw);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* soft accent glow, top-right and bottom-left */}
      <div
        className="absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full opacity-40"
        style={{ background: "radial-gradient(closest-side, rgb(161 161 170 / 0.35), transparent)" }}
      />
      <div
        className="absolute -bottom-60 -left-40 h-[38rem] w-[38rem] rounded-full opacity-30"
        style={{ background: "radial-gradient(closest-side, rgb(113 113 122 / 0.4), transparent)" }}
      />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
