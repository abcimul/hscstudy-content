import React from "react";
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile} from "remotion";
import {C, F, G, W, FPS, glass, INT_ROWS, FRAC_ROWS} from "./theme";
import {Background, GrainVignette, NetworkH, Rad, amberText, prog, progIn, win, useT} from "./components/Common";
import {Captions} from "./components/Captions";

const SFX: [string, number][] = [
  ["whoosh", 2.85], ["pop", 3.0], ["whoosh", 5.4], ["click", 5.9], ["whoosh", 7.7], ["pop", 10.95], ["click", 14.3], ["chime", 15.7],
  ["whoosh", 17.5], ["click", 19.6], ["click", 23.2], ["click", 25.6], ["whoosh", 27.2], ["pop", 27.5], ["chime", 29.3],
  ["whoosh", 32.3], ["pop", 32.6], ["click", 36.0], ["chime", 37.9],
];
const bump = Easing.bezier(0.34, 1.56, 0.64, 1);
const pop = (t: number, a: number, d = 0.4) => interpolate(t, [a, a + d], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bump});

const Arrow: React.FC<{x: number; y1: number; y2: number; p: number; color?: string; w?: number}> = ({x, y1, y2, p, color = C.amberText, w = 10}) => {
  // draws from y1 to y2 (either direction) with a head at y2
  const up = y2 < y1; const len = Math.abs(y2 - y1);
  const h = 26 * Math.min(1, p * 3);
  const yEnd = y1 + (y2 - y1) * p;
  return (
    <svg width={W} height={1300} style={{position: "absolute", left: 0, top: 0, pointerEvents: "none", opacity: Math.min(1, p * 4)}}>
      <line x1={x} y1={y1} x2={x} y2={yEnd - (up ? -4 : 4)} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path d={`M${x - h} ${yEnd + (up ? h : -h)} L${x} ${yEnd} L${x + h} ${yEnd + (up ? h : -h)}`} stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};

const TopBar: React.FC = () => {
  const {t} = useT();
  const o = 1 - progIn(t, 37.4, 37.8);
  const pill = win(t, 0.3, 3.6, 0.4, 0.4);
  return (
    <div style={{position: "absolute", left: 80, top: 236, display: "flex", alignItems: "center", opacity: o}}>
      <NetworkH size={50} />
      <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 34, letterSpacing: ".05em", color: C.white, marginLeft: 12}}>HSC <span style={{color: C.navyText, fontWeight: 600}}>STUDY</span></span>
      <span style={{marginLeft: 24, opacity: pill, transform: `translateX(${(1 - pill) * -20}px)`, fontFamily: F.bn, fontWeight: 700, fontSize: 38, color: C.onAmber, background: C.amber, padding: "6px 26px 4px", borderRadius: 999}}>ICT ট্রিক #৪</span>
    </div>
  );
};

/** Hook title -> big mnemonic -> small header (persistent) */
const Titles: React.FC = () => {
  const {t} = useT();
  const hook = (1 - progIn(t, 2.7, 3.1)) + prog(t, 40.45, 40.95);
  const big = win(t, 2.94, 5.6, 0.45, 0.35);
  const head = prog(t, 5.5, 6.0) * (1 - progIn(t, 31.8, 32.2));
  const wob = Math.sin(t * 3) * 6;
  return (
    <>
      <div style={{position: "absolute", left: 80, width: 860, top: 320, textAlign: "center", opacity: Math.min(1, hook), fontFamily: F.bn, fontWeight: 700, fontSize: 92, lineHeight: 1.3, color: C.white}}>
        ভাগশেষ <span style={amberText}>↑</span> না <span style={amberText}>↓</span> ?
      </div>
      {big > 0.01 && (
        <div style={{position: "absolute", left: 80, width: 860, top: 560, textAlign: "center", opacity: big, transform: `scale(${0.9 + 0.1 * big})`, fontFamily: F.bn, fontWeight: 700, fontSize: 126, lineHeight: 1.35, color: C.white}}>
          <div>ভাগে <span style={{...amberText, display: "inline-block", transform: `translateY(${-wob}px)`}}>↑</span> উঠো</div>
          <div>গুণে <span style={{...amberText, display: "inline-block", transform: `translateY(${wob}px)`}}>↓</span> নামো</div>
        </div>
      )}
      <div style={{position: "absolute", left: 80, width: 860, top: 326, textAlign: "center", opacity: head, transform: `translateY(${(1 - head) * 30}px)`, fontFamily: F.bn, fontWeight: 700, fontSize: 56, color: C.onNavyMuted}}>
        ভাগে <span style={{color: C.amberText}}>↑</span> উঠো · গুণে <span style={{color: C.amberText}}>↓</span> নামো
      </div>
    </>
  );
};

const ROW0 = 470, PITCH = 92;
const RT = [10.95, 11.3, 11.65, 12.0, 12.35];
const CHIP_T = [14.3, 14.6, 14.9, 15.2, 15.5]; // bits read bottom -> top: remainder index 4..0

const DivTable: React.FC = () => {
  const {t} = useT();
  const hookPhase = t < 4;
  const g = hookPhase ? 1 - progIn(t, 2.7, 3.1) : prog(t, 5.7, 6.0) * (1 - progIn(t, 16.0, 16.5));
  if (g <= 0.01) return null;
  const arrowUp = prog(t, 7.7, 9.3);
  const wig = hookPhase ? Math.sin(t * 5) : 0;
  return (
    <div style={{position: "absolute", inset: 0, opacity: g}}>
      {[...INT_ROWS, [0, 0, -1] as [number, number, number]].map(([d, n, r], i) => {
        const p = hookPhase ? prog(t, i * 0.12, 0.35 + i * 0.12) : prog(t, 5.9 + i * 0.4, 6.25 + i * 0.4);
        const last = i === INT_ROWS.length;
        const idx = i; // remainder index top->bottom
        const k = 4 - idx; // reading position
        const lit = !hookPhase && r >= 0 && t >= CHIP_T[k];
        const say = !hookPhase && r >= 0 ? pop(t, RT[idx], 0.35) : 0;
        const pulse = !hookPhase && r >= 0 && t >= RT[idx] && t < RT[idx] + 0.5 ? 1 + 0.25 * Math.sin(Math.PI * (t - RT[idx]) / 0.5) : 1;
        return (
          <div key={i} style={{position: "absolute", left: 0, top: ROW0 + PITCH * i, width: W, height: PITCH, opacity: 0.3 + 0.7 * p, transform: `translateX(${(1 - p) * -30}px)`, fontFamily: F.en, fontWeight: 700, fontSize: 64, color: C.white}}>
            {!last && <span style={{position: "absolute", left: 200, width: 100, textAlign: "right", top: 10, color: C.navyText}}>{d}</span>}
            <span style={{position: "absolute", left: 320, width: 220, textAlign: "center", top: 10, height: PITCH - 10, lineHeight: "72px",
              borderLeft: last ? "none" : "4px solid rgba(169,196,230,.6)", borderBottom: last ? "none" : "4px solid rgba(169,196,230,.6)"}}>{n}</span>
            {!last && <span style={{position: "absolute", left: 570, width: 100, textAlign: "center", top: 10, transform: `scale(${pulse})`, ...(lit || say > 0.5 && t < 16 ? {color: C.amberText} : {color: hookPhase ? C.navyText : C.white})}}>{r}</span>}
          </div>
        );
      })}
      {hookPhase ? (
        <>
          <div style={{position: "absolute", left: 770, top: ROW0 + 40, fontFamily: F.en, fontWeight: 800, fontSize: 96, color: wig > 0 ? C.amberText : C.navyText, transform: `translateY(${-wig * 14}px)`}}>↑</div>
          <div style={{position: "absolute", left: 770, top: ROW0 + 270, fontFamily: F.en, fontWeight: 800, fontSize: 96, color: wig < 0 ? C.amberText : C.navyText, transform: `translateY(${-wig * 14}px)`}}>↓</div>
        </>
      ) : (
        <Arrow x={760} y1={ROW0 + PITCH * 4.6} y2={ROW0 + PITCH * 0.5} p={arrowUp} />
      )}
    </div>
  );
};

const Bit: React.FC<{b: number; s: number; size?: number}> = ({b, s, size = 74}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, transform: `scale(${s})`, display: "flex", alignItems: "center", justifyContent: "center",
    background: b ? C.white : "transparent", boxShadow: b ? "0 8px 24px rgba(0,0,0,.3)" : "inset 0 0 0 3px rgba(169,196,230,.5)",
    fontFamily: F.en, fontWeight: 800, fontSize: size * 0.68, color: b ? C.brand : C.navyText}}>{b}</div>
);

const IntRow: React.FC = () => {
  const {t} = useT();
  const v = prog(t, 14.2, 14.5) * (1 - progIn(t, 26.9, 27.3));
  if (v <= 0.01) return null;
  const bits = INT_ROWS.map((r) => r[2]).reverse(); // 1,1,0,0,1
  const lab = prog(t, 15.6, 16.0);
  return (
    <div style={{position: "absolute", left: 0, width: W - 40, top: 1050, height: 96, display: "flex", justifyContent: "center", alignItems: "center", opacity: v, gap: 14}}>
      <span style={{opacity: lab}}><Rad n="25" base="10" size={58} color={C.white} /></span>
      <span style={{opacity: lab, fontFamily: F.en, fontWeight: 800, fontSize: 58, color: C.white}}>= (</span>
      {bits.map((b, k) => <Bit key={k} b={b} s={Math.max(0, pop(t, CHIP_T[k]))} />)}
      <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 58, color: C.white, opacity: lab}}>)<span style={{fontSize: 24, position: "relative", top: 8}}>2</span></span>
    </div>
  );
};

const fmt = (n: number) => (n / 100).toString();
const FracTable: React.FC = () => {
  const {t} = useT();
  const g = prog(t, 16.9, 17.3) * (1 - progIn(t, 26.9, 27.3));
  if (g <= 0.01) return null;
  const ARR = prog(t, 17.5, 19.2);
  const TIMES = [{row: 19.4, eq: 21.5, chip: 23.2}, {row: 24.2, eq: 25.4, chip: 25.6}];
  return (
    <div style={{position: "absolute", inset: 0, opacity: g}}>
      {FRAC_ROWS.map(([f, d, ip, nf], i) => {
        const T = TIMES[i];
        const p = prog(t, T.row, T.row + 0.4);
        const eq = prog(t, T.eq, T.eq + 0.35);
        const top = 500 + i * 190;
        const dd = fmt(d); const [wi, wf] = dd.includes(".") ? dd.split(".") : [dd, "0"];
        return (
          <div key={i}>
            <div style={{position: "absolute", left: 100, top, height: 100, display: "flex", alignItems: "center", fontFamily: F.en, fontWeight: 700, fontSize: 70, color: C.white, whiteSpace: "pre", opacity: p, transform: `translateX(${(1 - p) * -30}px)`}}>
              {fmt(f)}{" × 2 = "}
              <span style={{opacity: eq, display: "inline-block", transform: `translateY(${(1 - eq) * 16}px)`}}>
                <span style={{color: t >= T.chip ? C.amberText : C.white}}>{wi}</span>.{wf}
              </span>
            </div>
            <div style={{position: "absolute", left: 700, top: top + 2, opacity: t >= T.chip ? 1 : 0}}><Bit b={ip} s={Math.max(0, pop(t, T.chip))} size={96} /></div>
          </div>
        );
      })}
      <Arrow x={870} y1={530} y2={770} p={ARR} />
      <div style={{position: "absolute", left: 100, top: 860, fontFamily: F.bn, fontWeight: 600, fontSize: 50, color: C.onNavyMuted, opacity: prog(t, 25.9, 26.3) * 0.95}}>ভগ্নাংশ 0 হয়ে গেছে, তাই থামো</div>
    </div>
  );
};

const Payoff: React.FC = () => {
  const {t} = useT();
  const a = win(t, 27.48, 32.4, 0.4, 0.35);
  const big = pop(t, 29.2, 0.5);
  const dot = pop(t, 30.6, 0.35);
  const slide = prog(t, 29.2, 30.4);
  const glow = 0.7 + 0.3 * Math.sin(t * 3);
  if (a <= 0.01) return null;
  const Part = (c: string, dx: number) => <span style={{display: "inline-block", transform: `translateX(${(1 - slide) * dx}px)`, ...amberText}}>{c}</span>;
  const Dot = <span style={{display: "inline-block", opacity: dot, transform: `scale(${dot})`, ...amberText}}>.</span>;
  return (
    <>
      <div style={{position: "absolute", left: 0, width: W - 60, top: 470, textAlign: "center", opacity: a, transform: `translateY(${(1 - a) * 20}px)`}}>
        <Rad n="25.75" base="10" size={92} color={C.white} />
      </div>
      <div style={{position: "absolute", left: 0, width: W - 60, top: 660, textAlign: "center", opacity: a * big, transform: `scale(${0.8 + 0.2 * big})`}}>
        <div style={{position: "absolute", left: 120, top: -60, width: 700, height: 360, background: G.glowAmber, filter: "blur(30px)", opacity: glow}} />
        <span style={{position: "relative", fontFamily: F.en, fontWeight: 800, fontSize: 132, whiteSpace: "nowrap"}}>
          <span style={amberText}>(</span>{Part("11001", -70)}{Dot}{Part("11", 70)}<span style={amberText}>)</span><span style={{fontSize: 52, position: "relative", top: 16, ...amberText}}>2</span>
        </span>
      </div>
    </>
  );
};

const Quiz: React.FC = () => {
  const {t} = useT();
  const v = win(t, 32.55, 37.4, 0.4, 0.3);
  const pill = pop(t, 36.0, 0.45);
  if (v <= 0.01) return null;
  return (
    <>
      <div style={{position: "absolute", left: 80, width: 860, top: 430, height: 330, borderRadius: 28, ...glass, backdropFilter: "blur(8px)", opacity: v, transform: `translateY(${(1 - v) * 24}px)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16}}>
        <Rad n="6.5" base="10" size={124} color={C.white} />
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
  const v = win(t, 37.6, 40.55, 0.3, 0.35);
  if (v <= 0.01) return null;
  const build = prog(t, 37.7, 39.0);
  const glow = prog(t, 38.8, 39.4);
  const pill = pop(t, 39.2, 0.45);
  return (
    <div style={{position: "absolute", left: 0, width: W, top: 380, opacity: v, display: "flex", flexDirection: "column", alignItems: "center"}}>
      <NetworkH size={330} build={build} glow={glow} />
      <div style={{fontFamily: F.en, fontWeight: 800, fontSize: 96, letterSpacing: ".05em", color: C.white, marginTop: 40, opacity: prog(t, 38.5, 39.0)}}>HSC <span style={{color: C.navyText, fontWeight: 600}}>STUDY</span></div>
      <div style={{marginTop: 30, background: C.amber, color: C.onAmber, fontFamily: F.en, fontWeight: 700, fontSize: 54, padding: "10px 46px 8px", borderRadius: 999, transform: `scale(${pill})`}}>hscstudy.com</div>
    </div>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{background: C.deep}}>
    <Background />
    <TopBar />
    <Titles />
    <DivTable />
    <IntRow />
    <FracTable />
    <Payoff />
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
