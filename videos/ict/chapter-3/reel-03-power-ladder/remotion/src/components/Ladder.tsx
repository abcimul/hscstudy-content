import React from "react";
import {C, F, G, STEP_VALUES, STEP_W, STEP_BASE, stepH, stepX, cellX, CELL_TOP, CELL_H, BIT_Y, BITS, SPRING} from "../theme";
import {prog, progIn, useSpring, useT} from "./Common";

const RISE = [9.24, 9.88, 10.66, 11.34, 12.0, 12.8, 13.45];
const LAND: Record<number, number> = {6: 20.7, 3: 24.1, 2: 26.5};
const MORPH = [29.3, 30.4] as const;
const lerp = (a: number, b: number, m: number) => a + (b - a) * m;

const Step: React.FC<{i: number; outV: number}> = ({i, outV}) => {
  const {t} = useT();
  const en = Math.max(0, useSpring(RISE[i], SPRING.pop));
  const m = prog(t, MORPH[0] + (6 - i) * 0.04, MORPH[1] + (6 - i) * 0.04);
  const reset = prog(t, 40.0, 40.5);
  const hl = (LAND[i] ? prog(t, LAND[i], LAND[i] + 0.35) : 0) * (1 - reset);
  const hint = i === 6 ? prog(t, 14.7, 15.1) * (1 - prog(t, 17.4, 17.8)) * (0.6 + 0.4 * Math.sin(t * 6)) : 0;
  const h0 = stepH(i) * en;
  const x = lerp(stepX(i), cellX(i), m);
  const h = lerp(h0, CELL_H, m);
  const top = lerp(STEP_BASE - h0, CELL_TOP, m);
  if (en <= 0.001) return null;
  const used = hl > 0.5;
  const fs = STEP_VALUES[i] >= 16 ? 44 : 50;
  return (
    <div style={{position: "absolute", left: x, top, width: STEP_W, height: Math.max(h, 0), opacity: outV,
      borderRadius: 18, overflow: "hidden",
      background: hl > 0.01 ? `linear-gradient(180deg, ${C.amberLight}, ${C.amberText} 35%, ${C.amber})` : "rgba(43,83,132,.55)",
      boxShadow: hl > 0.01 ? `0 0 ${40 * hl}px rgba(245,158,11,${0.5 * hl})` : `inset 0 0 0 2px rgba(169,196,230,${0.35 + hint * 0.5})${hint ? `, 0 0 ${30 * hint}px rgba(245,158,11,.5)` : ""}`}}>
      <div style={{position: "absolute", left: 0, right: 0, top: lerp(16, (CELL_H - fs) / 2 - 4, m), textAlign: "center",
        fontFamily: F.en, fontWeight: 800, fontSize: fs, color: used ? C.onAmber : C.white}}>{STEP_VALUES[i]}</div>
    </div>
  );
};

const Bit: React.FC<{i: number; outV: number}> = ({i, outV}) => {
  const {t} = useT();
  const j = 6 - i;
  const bit = BITS[j];
  const tIn = 31.5 + j * 0.25;
  const s = Math.max(0, useSpring(tIn, SPRING.pop));
  const rm = prog(t, 40.0, 40.35);
  const qs = Math.max(0, useSpring(40.5 + j * 0.08, SPRING.soft));
  const cx = cellX(i) + STEP_W / 2;
  return (
    <>
      {s > 0.01 && (
        <div style={{position: "absolute", left: cx - 50, top: BIT_Y - 50, width: 100, height: 100, borderRadius: 50, opacity: outV * (1 - rm),
          transform: `scale(${s})`, display: "flex", alignItems: "center", justifyContent: "center",
          background: bit ? C.white : "transparent",
          boxShadow: bit ? "0 8px 24px rgba(0,0,0,.3)" : "inset 0 0 0 3px rgba(169,196,230,.5)",
          fontFamily: F.en, fontWeight: 800, fontSize: 64, color: bit ? C.brand : C.navyText}}>{bit}</div>
      )}
      {qs > 0.01 && (
        <div style={{position: "absolute", left: cx - 50, top: BIT_Y - 50, width: 100, height: 100, borderRadius: 50, opacity: outV,
          transform: `scale(${qs})`, boxShadow: "inset 0 0 0 3px rgba(169,196,230,.45)", border: "0px"}} />
      )}
    </>
  );
};

export const Ladder: React.FC = () => {
  const {t} = useT();
  const outV = 1 - progIn(t, 44.55, 44.95);
  const base = prog(t, 8.3, 9.1) * (1 - prog(t, 29.3, 29.8));
  return (
    <>
      <div style={{position: "absolute", left: 80, top: STEP_BASE + 10, width: 860 * base, height: 4, borderRadius: 2, background: "rgba(169,196,230,.45)"}} />
      {STEP_VALUES.map((_, i) => <Step key={i} i={i} outV={outV} />)}
      {STEP_VALUES.map((_, i) => <Bit key={"b" + i} i={i} outV={outV} />)}
    </>
  );
};

/** the ball that carries the remainder down the ladder */
const HOPS = [
  {t0: 20.2, t1: 20.9, x: 6, y: 6},
  {t0: 23.6, t1: 24.3, x: 3, y: 3},
  {t0: 26.0, t1: 26.7, x: 2, y: 2},
];
export const Ball: React.FC = () => {
  const {t} = useT();
  const spawn = Math.max(0, useSpring(17.98, SPRING.pop));
  const gone = prog(t, 28.0, 28.5);
  if (spawn < 0.01 || gone >= 1) return null;
  let x = 540, y = 600, hopY = 0;
  HOPS.forEach((h) => {
    const p = prog(t, h.t0, h.t1);
    if (t >= h.t0) {
      const tx = 80 + h.x * 124 + STEP_W / 2, ty = STEP_BASE - stepH(h.y) - 75;
      x = x + (tx - x) * p; y = y + (ty - y) * p;
      hopY = -Math.sin(Math.PI * p) * 130;
    }
  });
  const val = t < 21.3 ? "76" : t < 24.8 ? "12" : t < 27.5 ? "4" : "0";
  const bob = Math.sin(t * 5) * 5;
  return (
    <div style={{position: "absolute", left: x - 56, top: y - 56 + hopY + bob, width: 112, height: 112, borderRadius: 56,
      opacity: 1 - gone, transform: `scale(${spawn * (1 - 0.2 * gone)})`, display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(circle at 35% 30%, #fff, #D3DCE8 70%)", boxShadow: "0 18px 36px rgba(0,0,0,.4)",
      fontFamily: F.en, fontWeight: 800, fontSize: val.length > 1 ? 54 : 62, color: C.brand}}>{val}</div>
  );
};
