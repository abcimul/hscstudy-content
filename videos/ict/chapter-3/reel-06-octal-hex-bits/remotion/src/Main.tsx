import React from "react";
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile} from "remotion";
import {C, F, G, W, FPS, glass, OCT, OCT_BITS, ALL_BITS, HEX_EX, HEX_GROUPS} from "./theme";
import {Background, GrainVignette, NetworkH, Rad, amberText, prog, progIn, win, useT} from "./components/Common";
import {Captions} from "./components/Captions";

const SFX: [string, number][] = [
  ["click", 3.4], ["pop", 4.2], ["chime", 5.3], ["whoosh", 7.45], ["pop", 7.7], ["click", 10.3], ["pop", 14.8], ["click", 16.3], ["click", 18.3], ["click", 20.0],
  ["chime", 21.8], ["whoosh", 24.0], ["pop", 24.4], ["pop", 27.4], ["click", 30.5], ["whoosh", 32.0], ["pop", 32.3], ["click", 35.6], ["chime", 37.3],
];
const bump = Easing.bezier(0.34, 1.56, 0.64, 1);
const pop = (t: number, a: number, d = 0.4) => interpolate(t, [a, a + d], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bump});

const Bit: React.FC<{b: number | string; on?: boolean; s: number; size?: number}> = ({b, on, s, size = 78}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, transform: `scale(${s})`, display: "flex", alignItems: "center", justifyContent: "center",
    background: on ? G.keywordAmber : "transparent", boxShadow: on ? "0 0 26px rgba(245,158,11,.5)" : "inset 0 0 0 3px rgba(169,196,230,.5)",
    fontFamily: F.en, fontWeight: 800, fontSize: size * 0.66, color: on ? C.onAmber : C.navyText}}>{b}</div>
);

const TopBar: React.FC = () => {
  const {t} = useT();
  const o = 1 - progIn(t, 36.8, 37.2);
  const pill = win(t, 0.3, 3.6, 0.4, 0.4);
  return (
    <div style={{position: "absolute", left: 80, top: 236, display: "flex", alignItems: "center", opacity: o}}>
      <NetworkH size={50} />
      <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 34, letterSpacing: ".05em", color: C.white, marginLeft: 12}}>HSC <span style={{color: C.navyText, fontWeight: 600}}>STUDY</span></span>
      <span style={{marginLeft: 24, opacity: pill, transform: `translateX(${(1 - pill) * -20}px)`, fontFamily: F.bn, fontWeight: 700, fontSize: 38, color: C.onAmber, background: C.amber, padding: "6px 26px 4px", borderRadius: 999}}>ICT ট্রিক #৬</span>
    </div>
  );
};

/** Hook: a long binary row -> 3-bit groups -> octal digits (and the loop-back frame) */
const PITCH = 88;
const Hook: React.FC = () => {
  const {t} = useT();
  const vis = 1 - progIn(t, 7.2, 7.6);
  const endIn = prog(t, 40.5, 41.0);
  const x0 = 94;
  const grp = prog(t, 3.4, 4.0);
  const rowO = Math.max(vis, endIn);
  return (
    <>
      <div style={{position: "absolute", left: 80, width: 860, top: 400, textAlign: "center", fontFamily: F.bn, fontWeight: 700, fontSize: 76, color: C.white, opacity: rowO}}>লম্বা বাইনারি</div>
      <div style={{position: "absolute", left: 0, top: 540, width: W, height: 100, opacity: rowO}}>
        {ALL_BITS.split("").map((b, i) => {
          const p = prog(t, i * 0.05, i * 0.05 + 0.3);
          const gi = Math.floor(i / 3);
          const lit = t >= 4.2 + gi * 0.3 && t < 7.4;
          return (
            <div key={i} style={{position: "absolute", left: x0 + i * PITCH, top: 0, width: PITCH - 6, textAlign: "center", fontFamily: F.en, fontWeight: 800, fontSize: 84, lineHeight: "100px",
              color: lit ? C.white : C.navyText, opacity: 0.25 + 0.75 * p, transform: `translateY(${(1 - p) * 20}px)`}}>{b}</div>
          );
        })}
      </div>
      {vis > 0.01 && [0, 1, 2].map((g) => (
        <div key={g} style={{position: "absolute", left: x0 + g * 3 * PITCH + 4, top: 660, width: 3 * PITCH - 20, height: 24, borderBottom: "6px solid rgba(169,196,230,.7)", borderLeft: "6px solid rgba(169,196,230,.7)", borderRight: "6px solid rgba(169,196,230,.7)",
          borderRadius: "0 0 14px 14px", opacity: grp * vis, transform: `scaleX(${grp})`}} />
      ))}
      {vis > 0.01 && OCT.map((d, g) => {
        const p = pop(t, 4.2 + g * 0.3);
        return <div key={g} style={{position: "absolute", left: x0 + g * 3 * PITCH, top: 710, width: 3 * PITCH - 12, textAlign: "center", fontFamily: F.en, fontWeight: 800, fontSize: 110, color: C.white, opacity: p * vis, transform: `scale(${p})`}}>{d}</div>;
      })}
      {vis > 0.01 && (
        <div style={{position: "absolute", left: 0, width: W - 60, top: 900, textAlign: "center", opacity: pop(t, 5.3) * vis, transform: `scale(${0.85 + 0.15 * pop(t, 5.3)})`}}>
          <Rad n="412" base="8" size={170} style={amberText} />
        </div>
      )}
    </>
  );
};

const Header: React.FC = () => {
  const {t} = useT();
  const a = prog(t, 7.6, 8.1) * (1 - progIn(t, 24.0, 24.35));
  const b = prog(t, 24.4, 24.9) * (1 - progIn(t, 31.8, 32.15));
  const st: React.CSSProperties = {position: "absolute", left: 80, width: 860, top: 326, textAlign: "center", fontFamily: F.bn, fontWeight: 700, fontSize: 56, color: C.onNavyMuted};
  return (
    <>
      <div style={{...st, opacity: a, transform: `translateY(${(1 - a) * 30}px)`}}>অক্টাল <span style={{color: C.amberText}}>=</span> <span style={{fontFamily: F.en}}>3</span> বিট</div>
      <div style={{...st, opacity: b, transform: `translateY(${(1 - b) * 30}px)`}}>হেক্স <span style={{color: C.amberText}}>=</span> <span style={{fontFamily: F.en}}>4</span> বিট</div>
    </>
  );
};

const Power: React.FC<{from: number; to: number; base: number; exp: number}> = ({from, to, base, exp}) => {
  const {t} = useT();
  const v = win(t, from, to, 0.4, 0.3);
  if (v <= 0.01) return null;
  return (
    <div style={{position: "absolute", left: 80, width: 860, top: 600, textAlign: "center", opacity: v, transform: `scale(${0.88 + 0.12 * v})`, fontFamily: F.en, fontWeight: 800, fontSize: 190, color: C.white, whiteSpace: "nowrap"}}>
      {base} = <span style={amberText}>2<span style={{fontSize: 100, position: "relative", top: -70}}>{exp}</span></span>
    </div>
  );
};

const SLOT_TOP = 640, SLOT_H = 170;
const Slot: React.FC<{x: number; w: number; label: string; labelT: number; at: number; bit: number | null; shown: boolean}> = ({x, w, label, labelT, at, bit, shown}) => {
  const {t} = useT();
  const p = pop(t, at, 0.4);
  const lp = prog(t, labelT, labelT + 0.3);
  const on = bit === 1 && shown;
  return (
    <>
      <div style={{position: "absolute", left: x, top: SLOT_TOP - 70, width: w, textAlign: "center", fontFamily: F.en, fontWeight: 800, fontSize: 54, color: C.navyText, opacity: lp, transform: `translateY(${(1 - lp) * 14}px)`}}>{label}</div>
      <div style={{position: "absolute", left: x, top: SLOT_TOP, width: w, height: SLOT_H, borderRadius: 26, transform: `scale(${p})`, display: "flex", alignItems: "center", justifyContent: "center",
        background: on ? G.keywordAmber : "rgba(43,83,132,.45)", boxShadow: on ? "0 0 40px rgba(245,158,11,.5)" : "inset 0 0 0 2px rgba(169,196,230,.35)",
        fontFamily: F.en, fontWeight: 800, fontSize: 100, color: on ? C.onAmber : C.navyText}}>{bit !== null && shown ? bit : ""}</div>
    </>
  );
};

const PH = [
  {d: 4, t0: 16.3, bt: [16.9, 17.3, 17.65], res: 18.0},
  {d: 1, t0: 18.3, bt: [18.9, 19.2, 19.5], res: 19.85},
  {d: 2, t0: 20.0, bt: [20.5, 20.8, 21.15], res: 21.45},
];
const Octal: React.FC = () => {
  const {t} = useT();
  const v = win(t, 10.0, 23.9, 0.4, 0.45);
  const slotsV = 1 - prog(t, 22.0, 22.5);
  if (v <= 0.01) return null;
  const phIdx = PH.reduce((a, p, i) => (t >= p.t0 ? i : a), -1);
  const ph = phIdx >= 0 ? PH[phIdx] : null;
  const bits = ph ? OCT_BITS[phIdx].split("").map(Number) : [null, null, null];
  const SW = 230, SP = 270, SX = 135;
  const gap = 24 - 24 * prog(t, 21.7, 22.4);
  const joined = t >= 22.0;
  const total = 9 * 88 + 2 * gap;
  const start = 510 - total / 2;
  const numP = prog(t, 14.6, 15.0) * (1 - prog(t, 22.4, 22.8));
  return (
    <div style={{position: "absolute", inset: 0, opacity: v}}>
      <div style={{position: "absolute", left: 80, width: 860, top: 440, textAlign: "center", fontFamily: F.bn, fontWeight: 700, fontSize: 80, color: C.white, opacity: prog(t, 10.0, 10.5) * (1 - prog(t, 14.4, 14.7)), transform: "none"}}>
        <span style={{fontFamily: F.en}}>1</span> অঙ্ক = <span style={{fontFamily: F.en, ...amberText}}>3</span> বিট
      </div>
      <div style={{position: "absolute", left: 0, width: W - 60, top: 400, textAlign: "center", opacity: numP}}>
        <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 110, color: C.white, whiteSpace: "nowrap"}}>
          (
          {OCT.map((d, i) => {
            const on = ph && ph.d === d && phIdx === i;
            const p = pop(t, 14.8 + i * 0.5, 0.35);
            return <span key={i} style={{display: "inline-block", transform: `scale(${0.8 + 0.2 * p})`, color: on ? C.amberText : C.white, textShadow: on ? "0 0 30px rgba(245,158,11,.7)" : "none"}}>{d}</span>;
          })}
          )<span style={{fontSize: 44, position: "relative", top: 14}}>8</span>
        </span>
      </div>
      <div style={{position: "absolute", inset: 0, opacity: slotsV}}>
        {[4, 2, 1].map((pv, j) => (
          <Slot key={j} x={SX + j * SP} w={SW} label={String(pv)} labelT={12.9 + j * 0.3} at={10.3 + j * 0.3} bit={bits[j] as number | null}
            shown={!!ph && t >= ph.bt[j]} />
        ))}
      </div>
      {/* result row */}
      {PH.map((p, g) => OCT_BITS[g].split("").map((b, j) => {
        const k = g * 3 + j;
        const s = Math.max(0, pop(t, p.res + j * 0.07, 0.3));
        return (
          <div key={`${g}${j}`} style={{position: "absolute", left: start + k * 88 + g * gap, top: 940, opacity: s > 0 ? 1 : 0}}>
            <Bit b={b} on={joined && b === "1"} s={s} size={78} />
          </div>
        );
      }))}
      <div style={{position: "absolute", left: 0, width: W - 60, top: 1050, textAlign: "center", opacity: prog(t, 22.4, 22.9), fontFamily: F.en, fontWeight: 800, fontSize: 56, color: C.white, whiteSpace: "nowrap"}}>
        <Rad n="412" base="8" size={56} color={C.white} /> = <Rad n={ALL_BITS} base="2" size={56} color={C.white} />
      </div>
    </div>
  );
};

const Hex: React.FC = () => {
  const {t} = useT();
  const v = win(t, 27.4, 32.0, 0.4, 0.35);
  if (v <= 0.01) return null;
  const SW = 190, SP = 215, SX = 92;
  const ex = prog(t, 28.4, 28.9);
  return (
    <div style={{position: "absolute", inset: 0, opacity: v}}>
      <div style={{position: "absolute", left: 80, width: 860, top: 440, textAlign: "center", fontFamily: F.bn, fontWeight: 700, fontSize: 80, color: C.white}}>
        <span style={{fontFamily: F.en}}>1</span> অঙ্ক = <span style={{fontFamily: F.en, ...amberText}}>4</span> বিট
      </div>
      {[8, 4, 2, 1].map((pv, j) => (
        <Slot key={j} x={SX + j * SP} w={SW} label={String(pv)} labelT={30.4 + j * 0.3} at={27.5 + j * 0.2} bit={null} shown={false} />
      ))}
      <div style={{position: "absolute", left: 0, width: W - 60, top: 900, textAlign: "center", opacity: ex, transform: `translateY(${(1 - ex) * 20}px)`}}>
        <Rad n={HEX_EX} base="16" size={64} color={C.white} />
        <div style={{display: "flex", justifyContent: "center", gap: 22, marginTop: 14, fontFamily: F.en, fontWeight: 800, fontSize: 64}}>
          {HEX_GROUPS.map((g, i) => <span key={i} style={i % 2 ? {color: C.white} : amberText}>{g}</span>)}
        </div>
      </div>
    </div>
  );
};

const Quiz: React.FC = () => {
  const {t} = useT();
  const v = win(t, 32.25, 36.9, 0.4, 0.3);
  const pill = pop(t, 35.6, 0.45);
  if (v <= 0.01) return null;
  return (
    <>
      <div style={{position: "absolute", left: 80, width: 860, top: 430, height: 330, borderRadius: 28, ...glass, backdropFilter: "blur(8px)", opacity: v, transform: `translateY(${(1 - v) * 24}px)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16}}>
        <Rad n="2D" base="16" size={124} color={C.white} />
        <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 124, color: C.white, whiteSpace: "nowrap", lineHeight: 1}}>= <Rad n="?" base="2" size={124} color={C.white} /></span>
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
  const v = win(t, 37.0, 40.55, 0.3, 0.35);
  if (v <= 0.01) return null;
  const build = prog(t, 37.1, 38.4), glow = prog(t, 38.2, 38.8), pill = pop(t, 38.6, 0.45);
  return (
    <div style={{position: "absolute", left: 0, width: W, top: 380, opacity: v, display: "flex", flexDirection: "column", alignItems: "center"}}>
      <NetworkH size={330} build={build} glow={glow} />
      <div style={{fontFamily: F.en, fontWeight: 800, fontSize: 96, letterSpacing: ".05em", color: C.white, marginTop: 40, opacity: prog(t, 37.9, 38.4)}}>HSC <span style={{color: C.navyText, fontWeight: 600}}>STUDY</span></div>
      <div style={{marginTop: 30, background: C.amber, color: C.onAmber, fontFamily: F.en, fontWeight: 700, fontSize: 54, padding: "10px 46px 8px", borderRadius: 999, transform: `scale(${pill})`}}>hscstudy.com</div>
    </div>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{background: C.deep}}>
    <Background />
    <TopBar />
    <Hook />
    <Header />
    <Power from={7.6} to={9.95} base={8} exp={3} />
    <Octal />
    <Power from={24.4} to={27.35} base={16} exp={4} />
    <Hex />
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
