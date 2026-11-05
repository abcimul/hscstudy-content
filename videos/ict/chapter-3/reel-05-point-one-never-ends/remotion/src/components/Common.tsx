import React from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {C, G, F, W, H, ease, easeIn, SPRING} from "../theme";

/** time in seconds */
export const useT = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return {t: f / fps, f, fps};
};
/** eased 0..1 progress between seconds a..b */
export const prog = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
export const progIn = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeIn});
/** spring starting at second t0 */
export const useSpring = (t0: number, cfg = SPRING.pop) => {
  const {f, fps} = useT();
  return spring({frame: f - Math.round(t0 * fps), fps, config: cfg});
};
/** visibility window with fast exit: 1 between in and out */
export const win = (t: number, a: number, b: number, inD = 0.5, outD = 0.3) =>
  prog(t, a, a + inD) * (1 - progIn(t, b - outD, b));

export const Background: React.FC = () => {
  const {t} = useT();
  const d1 = Math.sin(t * 0.35) * 40, d2 = Math.cos(t * 0.28) * 50;
  return (
    <AbsoluteFill style={{background: G.bgNavyRadial}}>
      <div style={{position: "absolute", width: 900, height: 900, left: -300 + d1, top: 250 + d2, background: G.glowBlue, filter: "blur(36px)"}} />
      <div style={{position: "absolute", width: 900, height: 900, left: 200 - d1, top: 900 - d2, background: G.glowAmber, filter: "blur(36px)", opacity: 0.8}} />
      <div style={{
        position: "absolute", inset: 0, backgroundSize: "44px 44px",
        backgroundPosition: `${t * 4}px ${t * 6}px`,
        backgroundImage: "linear-gradient(rgba(169,196,230,.085) 1px,transparent 1px),linear-gradient(90deg,rgba(169,196,230,.085) 1px,transparent 1px)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,#000 35%,transparent 100%)",
      }} />
    </AbsoluteFill>
  );
};

export const GrainVignette: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: "none"}}>
    <svg width={W} height={H} style={{position: "absolute", opacity: 0.07, mixBlendMode: "overlay"}}>
      <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width={W} height={H} filter="url(#g)" />
    </svg>
    <AbsoluteFill style={{background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 55%, rgba(11,18,32,.55) 100%)"}} />
  </AbsoluteFill>
);

export const NetworkH: React.FC<{size: number; build?: number; glow?: number}> = ({size, build = 1, glow = 0}) => {
  const nodes: [number, number][] = [[14, 10], [14, 32], [14, 54], [50, 10], [50, 32], [50, 54]];
  const lineP = Math.max(0, Math.min(1, (build - 0.35) / 0.4));
  const amberP = Math.max(0, Math.min(1, (build - 0.75) / 0.25));
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{overflow: "visible"}}>
      <circle cx="32" cy="32" r={22 * glow} fill="rgba(245,158,11,.35)" style={{filter: "blur(6px)"}} />
      <path d="M14 10V54M50 10V54M14 32H50" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - lineP} />
      {nodes.map(([x, y], i) => {
        const p = Math.max(0, Math.min(1, build * 2.2 - i * 0.18));
        return <circle key={i} cx={x} cy={y} r={6.5 * p} fill="#fff" />;
      })}
      <circle cx="32" cy="32" r={7.5 * amberP} fill={C.amber} />
    </svg>
  );
};

/** (76)₁₀ style notation with a lowered base */
export const Rad: React.FC<{n: string; base: string; size: number; color?: string; style?: React.CSSProperties}> = ({n, base, size, color, style}) => (
  <span style={{fontFamily: F.en, fontWeight: 800, fontSize: size, lineHeight: 1, color, whiteSpace: "nowrap", ...style}}>
    ({n})<span style={{fontSize: size * 0.4, position: "relative", top: size * 0.12, marginLeft: 2}}>{base}</span>
  </span>
);

export const amberText: React.CSSProperties = {
  background: G.keywordAmber, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
  filter: "drop-shadow(0 12px 28px rgba(245,158,11,.40))",
};
