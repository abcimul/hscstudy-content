import React from "react";
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile} from "remotion";
import {C, F, G, W, FPS, glass, ROWS, CYCLE, CYCLE_BITS} from "./theme";
import {Background, GrainVignette, NetworkH, Rad, amberText, prog, progIn, win, useT} from "./components/Common";
import {Captions} from "./components/Captions";

const SFX: [string, number][] = [
  ["whoosh", 6.4], ["pop", 6.72], ["whoosh", 7.9], ["pop", 8.1], ["click", 12.9], ["click", 15.5], ["click", 17.3], ["click", 19.6], ["click", 21.9],
  ["chime", 24.5], ["whoosh", 27.3], ["click", 27.9], ["click", 28.7], ["click", 29.5], ["pop", 30.9], ["whoosh", 33.45], ["pop", 33.7],
  ["whoosh", 35.7], ["pop", 36.0], ["click", 39.5], ["chime", 41.6],
];
const bump = Easing.bezier(0.34, 1.56, 0.64, 1);
const pop = (t: number, a: number, d = 0.4) => interpolate(t, [a, a + d], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bump});
const fmt = (n: number) => (n / 10).toFixed(1);

const Arrow: React.FC<{x: number; y1: number; y2: number; p: number}> = ({x, y1, y2, p}) => {
  const up = y2 < y1; const h = 26 * Math.min(1, p * 3); const yEnd = y1 + (y2 - y1) * p;
  return (
    <svg width={W} height={1300} style={{position: "absolute", left: 0, top: 0, pointerEvents: "none", opacity: Math.min(1, p * 4)}}>
      <line x1={x} y1={y1} x2={x} y2={yEnd - (up ? -4 : 4)} stroke={C.amberText} strokeWidth={10} strokeLinecap="round" />
      <path d={`M${x - h} ${yEnd + (up ? h : -h)} L${x} ${yEnd} L${x + h} ${yEnd + (up ? h : -h)}`} stroke={C.amberText} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};

const Bit: React.FC<{b: number; s: number; size?: number}> = ({b, s, size = 80}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, transform: `scale(${s})`, display: "flex", alignItems: "center", justifyContent: "center",
    background: b ? C.white : "transparent", boxShadow: b ? "0 8px 24px rgba(0,0,0,.3)" : "inset 0 0 0 3px rgba(169,196,230,.5)",
    fontFamily: F.en, fontWeight: 800, fontSize: size * 0.68, color: b ? C.brand : C.navyText}}>{b}</div>
);

const TopBar: React.FC = () => {
  const {t} = useT();
  const o = 1 - progIn(t, 40.8, 41.2);
  const pill = win(t, 0.3, 3.6, 0.4, 0.4);
  return (
    <div style={{position: "absolute", left: 80, top: 236, display: "flex", alignItems: "center", opacity: o}}>
      <NetworkH size={50} />
      <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 34, letterSpacing: ".05em", color: C.white, marginLeft: 12}}>HSC <span style={{color: C.navyText, fontWeight: 600}}>STUDY</span></span>
      <span style={{marginLeft: 24, opacity: pill, transform: `translateX(${(1 - pill) * -20}px)`, fontFamily: F.bn, fontWeight: 700, fontSize: 38, color: C.onAmber, background: C.amber, padding: "6px 26px 4px", borderRadius: 999}}>ICT ট্রিক #৫</span>
    </div>
  );
};

/** 0.1 = ? with an endless stream of binary digits (hook, and the loop-back frame) */
const Hook: React.FC = () => {
  const {t} = useT();
  const vis = (1 - progIn(t, 6.3, 6.7));
  const endIn = prog(t, 44.7, 45.2);
  const o = Math.max(vis, endIn);
  const stream = "0.0 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 ";
  const unit = 700; // px per repeat (approx), scrolls left
  const off = (t * 110) % unit;
  const wiggle = 1 + Math.sin(t * 2.2) * 0.012;
  const dots = prog(t, 3.64, 4.2);
  return (
    <div style={{position: "absolute", inset: 0, opacity: o}}>
      <div style={{position: "absolute", left: 0, width: W, top: 360, textAlign: "center", transform: `scale(${wiggle})`}}>
        <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 300, lineHeight: 1, ...amberText}}>0.1</span>
      </div>
      <div style={{position: "absolute", left: 0, width: W, top: 700, textAlign: "center", fontFamily: F.en, fontWeight: 800, fontSize: 120, color: C.white}}>
        = <Rad n="?" base="2" size={120} color={C.white} />
      </div>
      {t < 44 || t > 44.6 ? (
        <div style={{position: "absolute", left: 80, width: 860, top: 930, height: 110, overflow: "hidden", opacity: 0.35 + 0.65 * (1 - endIn * 0) * (t < 3.64 ? 1 : 1),
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)"}}>
          <div style={{position: "absolute", top: 0, left: -off, whiteSpace: "pre", fontFamily: F.en, fontWeight: 700, fontSize: 76, color: dots > 0.3 ? C.amberText : C.navyText, letterSpacing: 4, transition: "none"}}>{stream.repeat(3)}</div>
        </div>
      ) : null}
    </div>
  );
};

const Statement: React.FC = () => {
  const {t} = useT();
  const a = win(t, 6.72, 7.95, 0.35, 0.3);
  const big = win(t, 8.06, 12.5, 0.45, 0.35);
  const head = prog(t, 12.4, 12.9) * (1 - progIn(t, 27.2, 27.6));
  const bob = Math.sin(t * 3) * 6;
  return (
    <>
      {a > 0.01 && (
        <div style={{position: "absolute", left: 80, width: 860, top: 640, textAlign: "center", opacity: a, transform: `scale(${0.9 + 0.1 * a})`, fontFamily: F.bn, fontWeight: 700, fontSize: 140, color: C.white}}>
          নিয়ম <span style={amberText}>একটাই</span>
        </div>
      )}
      {big > 0.01 && (
        <div style={{position: "absolute", left: 80, width: 860, top: 560, textAlign: "center", opacity: big, transform: `scale(${0.9 + 0.1 * big})`, fontFamily: F.bn, fontWeight: 700, fontSize: 112, lineHeight: 1.4, color: C.white}}>
          <div>ভগ্নাংশ <span style={{fontFamily: F.en}}>× 2</span></div>
          <div>পূর্ণ অংশ <span style={{...amberText, display: "inline-block", transform: `translateY(${bob}px)`}}>↓</span></div>
        </div>
      )}
      <div style={{position: "absolute", left: 80, width: 860, top: 326, textAlign: "center", opacity: head, transform: `translateY(${(1 - head) * 30}px)`, fontFamily: F.bn, fontWeight: 700, fontSize: 56, color: C.onNavyMuted}}>
        ভগ্নাংশ <span style={{fontFamily: F.en}}>× 2</span> · পূর্ণ অংশ <span style={{color: C.amberText}}>↓</span>
      </div>
    </>
  );
};

const ROW0 = 450, PITCH = 112, TX = 170, CHIPX = 730;
const RT = [{row: 12.9, eq: 14.2, chip: 14.9}, {row: 15.4, eq: 16.0, chip: 16.7}, {row: 17.2, eq: 17.7, chip: 18.3}, {row: 19.58, eq: 20.0, chip: 20.9}, {row: 21.82, eq: 22.2, chip: 23.0}];
const Rows: React.FC = () => {
  const {t} = useT();
  const g = prog(t, 12.7, 13.0) * (1 - progIn(t, 27.2, 27.6));
  if (g <= 0.01) return null;
  const arrow = prog(t, 10.2, 12.2) ;
  const r6 = prog(t, 24.12, 24.55);
  const loopP = prog(t, 24.5, 25.4);
  const found = t >= 24.9;
  const y2 = ROW0 + PITCH * 1 + 56, y6 = ROW0 + PITCH * 5 + 56;
  const pulse = found ? 0.6 + 0.4 * Math.sin((t - 24.9) * 8) : 0;
  return (
    <div style={{position: "absolute", inset: 0, opacity: g}}>
      {ROWS.slice(0, 5).map(([f, d, ip, nf], i) => {
        const T = RT[i];
        const p = prog(t, T.row, T.row + 0.35), eq = prog(t, T.eq, T.eq + 0.3);
        const taken = t >= T.chip;
        const amberIn = i === 1 && found;
        return (
          <div key={i}>
            <div style={{position: "absolute", left: TX, top: ROW0 + PITCH * i, height: 100, display: "flex", alignItems: "center", fontFamily: F.en, fontWeight: 700, fontSize: 62, color: C.white, whiteSpace: "pre", opacity: p, transform: `translateX(${(1 - p) * -30}px)`}}>
              <span style={{color: amberIn ? C.amberText : C.white, textShadow: amberIn ? `0 0 ${24 * pulse}px rgba(245,158,11,.8)` : "none"}}>{fmt(f)}</span>{" × 2 = "}
              <span style={{opacity: eq, display: "inline-block", transform: `translateY(${(1 - eq) * 14}px)`}}>
                <span style={{color: taken ? C.amberText : C.white}}>{ip}</span>.{nf}
              </span>
            </div>
            <div style={{position: "absolute", left: CHIPX, top: ROW0 + PITCH * i + 6, opacity: taken ? 1 : 0}}><Bit b={ip} s={Math.max(0, pop(t, T.chip))} /></div>
          </div>
        );
      })}
      {/* the repeat */}
      <div style={{position: "absolute", left: TX, top: ROW0 + PITCH * 5, height: 100, display: "flex", alignItems: "center", fontFamily: F.en, fontWeight: 700, fontSize: 62, color: C.white, whiteSpace: "pre", opacity: r6, transform: `translateX(${(1 - r6) * -30}px)`}}>
        <span style={{...amberText}}>0.2</span>{" × 2 = …"}
      </div>
      <svg width={W} height={1300} style={{position: "absolute", left: 0, top: 0, pointerEvents: "none"}}>
        <path d={`M ${TX - 10} ${y6} C ${TX - 110} ${y6}, ${TX - 110} ${y2}, ${TX - 12} ${y2}`} fill="none" stroke={C.amberText} strokeWidth={8} strokeLinecap="round"
          pathLength={1} strokeDasharray={1} strokeDashoffset={1 - loopP} opacity={loopP > 0 ? 1 : 0} />
        <path d={`M ${TX - 34} ${y2 - 20} L ${TX - 10} ${y2} L ${TX - 34} ${y2 + 20}`} fill="none" stroke={C.amberText} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={loopP > 0.95 ? 1 : 0} />
      </svg>
      <Arrow x={880} y1={ROW0 + 20} y2={ROW0 + PITCH * 4.6} p={arrow} />
    </div>
  );
};

const Ring: React.FC = () => {
  const {t} = useT();
  const v = win(t, 27.4, 33.5, 0.4, 0.3);
  if (v <= 0.01) return null;
  const CX = 540, CY = 900, R = 150;
  const ang = (k: number) => (-90 + k * 90) * Math.PI / 180;
  const orbit = ((t - 27.6) / 2.4) % 1;
  const dotA = -90 + 360 * Math.max(0, orbit);
  const dx = CX + R * Math.cos(dotA * Math.PI / 180), dy = CY + R * Math.sin(dotA * Math.PI / 180);
  const active = Math.floor((((dotA + 90) % 360) + 360) % 360 / 90 + 0.5) % 4;
  return (
    <div style={{position: "absolute", inset: 0, opacity: v}}>
      <svg width={W} height={1300} style={{position: "absolute", left: 0, top: 0}}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(169,196,230,.45)" strokeWidth={5} strokeDasharray="14 12" />
        <circle cx={dx} cy={dy} r={14} fill={C.amberText} style={{filter: "drop-shadow(0 0 12px rgba(245,158,11,.9))"}} />
      </svg>
      {CYCLE.map((n, k) => {
        const x = CX + R * Math.cos(ang(k)), y = CY + R * Math.sin(ang(k));
        const on = k === active;
        const out = 82; // chip distance
        return (
          <React.Fragment key={k}>
            <div style={{position: "absolute", left: x - 62, top: y - 36, width: 124, height: 72, borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center",
              background: on ? C.amber : "rgba(30,58,95,.95)", boxShadow: on ? "0 0 30px rgba(245,158,11,.6)" : "inset 0 0 0 2px rgba(169,196,230,.45)",
              fontFamily: F.en, fontWeight: 800, fontSize: 44, color: on ? C.onAmber : C.white}}>{fmt(n)}</div>
            <div style={{position: "absolute", left: x + Math.cos(ang(k)) * (out + 38) * (k % 2 ? 1.7 : 0) - 26 + (k % 2 ? 0 : 0), top: y + Math.sin(ang(k)) * out * (k % 2 ? 0 : 1) - 26 - (k % 2 ? 0 : 0), opacity: 0.95}}>
              <Bit b={CYCLE_BITS[k]} s={1} size={52} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Binary: React.FC = () => {
  const {t} = useT();
  const v = win(t, 27.4, 33.55, 0.4, 0.3);
  if (v <= 0.01) return null;
  const parts = [{s: "0.0", at: 27.5, amber: false}, {s: "0011", at: 27.9, amber: true}, {s: "0011", at: 28.7, amber: true}, {s: "0011", at: 29.5, amber: true}, {s: "…", at: 30.9, amber: false}];
  return (
    <>
      <div style={{position: "absolute", left: 0, width: W - 60, top: 400, textAlign: "center", opacity: v}}>
        <Rad n="0.1" base="10" size={80} color={C.white} />
      </div>
      <div style={{position: "absolute", left: 60, width: 880, top: 520, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 18, opacity: v, fontFamily: F.en, fontWeight: 800, fontSize: 84, whiteSpace: "nowrap"}}>
        <span style={{color: C.white}}>=</span>
        {parts.map((p, i) => {
          const s = Math.max(0, pop(t, p.at, 0.4));
          return <span key={i} style={{display: "inline-block", transform: `scale(${s}) translateY(${(1 - s) * 20}px)`, opacity: Math.min(1, s * 2), ...(p.amber ? amberText : {color: C.white})}}>{p.s}</span>;
        })}
        <span style={{fontSize: 36, color: C.white, opacity: pop(t, 30.9)}}>2</span>
      </div>
    </>
  );
};

const NotAll: React.FC = () => {
  const {t} = useT();
  const v = win(t, 33.6, 35.6, 0.4, 0.3);
  if (v <= 0.01) return null;
  return (
    <div style={{position: "absolute", left: 80, width: 860, top: 700, height: 280, borderRadius: 28, ...glass, backdropFilter: "blur(8px)", opacity: v, transform: `scale(${0.94 + 0.06 * v})`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10}}>
      <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 88, ...amberText}}>0.0 0011 0011…</span>
      <span style={{fontFamily: F.bn, fontWeight: 700, fontSize: 64, color: C.white}}>সব ভগ্নাংশ শেষ হয় না</span>
    </div>
  );
};

const Quiz: React.FC = () => {
  const {t} = useT();
  const v = win(t, 35.85, 40.9, 0.4, 0.3);
  const pill = pop(t, 39.4, 0.45);
  if (v <= 0.01) return null;
  return (
    <>
      <div style={{position: "absolute", left: 80, width: 860, top: 430, height: 330, borderRadius: 28, ...glass, backdropFilter: "blur(8px)", opacity: v, transform: `translateY(${(1 - v) * 24}px)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16}}>
        <Rad n="0.625" base="10" size={118} color={C.white} />
        <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 118, color: C.white, whiteSpace: "nowrap", lineHeight: 1}}>= <Rad n="?" base="2" size={118} color={C.white} /></span>
      </div>
      {pill > 0.01 && (
        <div style={{position: "absolute", left: 0, width: W - 60, top: 900, display: "flex", justifyContent: "center", opacity: v, transform: `scale(${pill})`}}>
          <div style={{background: C.amber, color: C.onAmber, fontFamily: F.bn, fontWeight: 700, fontSize: 60, padding: "12px 46px 8px", borderRadius: 999, boxShadow: "0 0 50px rgba(245,158,11,.45)"}}>কমেন্টে লেখো</div>
        </div>
      )}
    </>
  );
};

const EndCard: React.FC = () => {
  const {t} = useT();
  const v = win(t, 41.0, 44.7, 0.3, 0.4);
  if (v <= 0.01) return null;
  const build = prog(t, 41.1, 42.4), glow = prog(t, 42.2, 42.8), pill = pop(t, 42.6, 0.45);
  return (
    <div style={{position: "absolute", left: 0, width: W, top: 380, opacity: v, display: "flex", flexDirection: "column", alignItems: "center"}}>
      <NetworkH size={330} build={build} glow={glow} />
      <div style={{fontFamily: F.en, fontWeight: 800, fontSize: 96, letterSpacing: ".05em", color: C.white, marginTop: 40, opacity: prog(t, 41.9, 42.4)}}>HSC <span style={{color: C.navyText, fontWeight: 600}}>STUDY</span></div>
      <div style={{marginTop: 30, background: C.amber, color: C.onAmber, fontFamily: F.en, fontWeight: 700, fontSize: 54, padding: "10px 46px 8px", borderRadius: 999, transform: `scale(${pill})`}}>hscstudy.com</div>
    </div>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{background: C.deep}}>
    <Background />
    <TopBar />
    <Hook />
    <Statement />
    <Rows />
    <Binary />
    <Ring />
    <NotAll />
    <Quiz />
    <EndCard />
    <Captions />
    <GrainVignette />
    <Audio src={staticFile("voiceover.wav")} />
    {SFX.map(([n, s], i) => (
      <Sequence key={i} from={Math.round(s * FPS)}><Audio src={staticFile(`sfx/${n}.wav`)} volume={0.25} /></Sequence>
    ))}
  </AbsoluteFill>
);
