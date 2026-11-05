import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile} from "remotion";
import {C, F, G, W, FPS, glass} from "./theme";
import {Background, GrainVignette, NetworkH, Rad, amberText, prog, progIn, useSpring, useT, win} from "./components/Common";
import {Captions} from "./components/Captions";
import {Ladder, Ball} from "./components/Ladder";

const SFX: [string, number][] = [
  ["whoosh", 3.85], ["pop", 4.3], ["pop", 9.24], ["whoosh", 14.5], ["pop", 17.98], ["click", 20.8], ["click", 24.2], ["click", 26.6],
  ["whoosh", 29.3], ["click", 31.5], ["chime", 34.2], ["pop", 37.6], ["whoosh", 40.0], ["pop", 40.6], ["click", 43.4], ["chime", 45.4],
];

const TopBar: React.FC = () => {
  const {t} = useT();
  const o = 1 - progIn(t, 44.5, 44.9);
  const pill = win(t, 0.3, 3.6, 0.4, 0.4);
  return (
    <div style={{position: "absolute", left: 80, top: 236, display: "flex", alignItems: "center", opacity: o}}>
      <NetworkH size={50} />
      <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 34, letterSpacing: ".05em", color: C.white, marginLeft: 12}}>
        HSC <span style={{color: C.navyText, fontWeight: 600}}>STUDY</span>
      </span>
      <span style={{marginLeft: 24, opacity: pill, transform: `translateX(${(1 - pill) * -20}px)`, fontFamily: F.bn, fontWeight: 700, fontSize: 38,
        color: C.onAmber, background: C.amber, padding: "6px 26px 4px", borderRadius: 999}}>ICT ট্রিক #৩</span>
    </div>
  );
};

/** (76)10 : big in the hook, small header afterwards, gone while the ball carries it */
const Num76: React.FC = () => {
  const {t} = useT();
  const m = prog(t, 3.9, 4.8);
  const endIn = prog(t, 48.1, 48.7);
  const big = 1 - m;
  const hold = (1 - progIn(t, 14.2, 14.5)) * m;
  const breathe = 1 + Math.sin(t * 2.2) * 0.012;
  const y = 560 + (400 - 560) * m;
  const size = 250 + (112 - 250) * m;
  return (
    <>
      <div style={{position: "absolute", left: 0, width: W, top: y - size * 0.6, textAlign: "center", transform: `scale(${breathe})`, opacity: Math.max(big, endIn * (1 - m * 0))}}>
        <Rad n="76" base="10" size={size} style={amberText} />
      </div>
      <div style={{position: "absolute", left: 0, width: W, top: y - size * 0.6, textAlign: "center", opacity: hold}}>
        <Rad n="76" base="10" size={size} color={C.white} />
      </div>
    </>
  );
};

const DIV_ROWS: [string, string, string][] = [["2", "76", "0"], ["2", "38", "0"], ["2", "19", "1"], ["2", "9", "1"], ["2", "4", "0"], ["2", "2", "0"], ["", "1", "1"]];
const HookTable: React.FC = () => {
  const {t} = useT();
  const out = progIn(t, 3.7, 4.1);
  const cross = prog(t, 2.2, 3.0);
  if (t > 4.2) return null;
  return (
    <div style={{position: "absolute", left: 0, width: W, top: 740, opacity: 1 - out, transform: `translateY(${out * 40}px)`}}>
      {DIV_ROWS.map(([d, n, r], i) => {
        const p = prog(t, 0.0 + i * 0.12, 0.35 + i * 0.12);
        return (
          <div key={i} style={{display: "flex", justifyContent: "center", alignItems: "center", height: 62, opacity: 0.35 + 0.65 * p, transform: `translateX(${(1 - p) * -30}px)`,
            fontFamily: F.en, fontWeight: 700, fontSize: 48, color: C.white}}>
            <span style={{width: 70, textAlign: "right", color: C.navyText}}>{d}</span>
            <span style={{width: 150, textAlign: "center", borderLeft: d ? "4px solid rgba(169,196,230,.6)" : "4px solid transparent", borderBottom: d ? "4px solid rgba(169,196,230,.6)" : "none", lineHeight: "54px"}}>{n}</span>
            <span style={{width: 100, textAlign: "left", paddingLeft: 24, color: C.navyText, fontSize: 40}}>{r}</span>
          </div>
        );
      })}
      <svg width={W} height={460} style={{position: "absolute", left: 0, top: -10}}>
        <line x1={250} y1={30} x2={830} y2={440} stroke={C.hot} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - cross} />
        <line x1={830} y1={30} x2={250} y2={440} stroke={C.hot} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 2.6, 3.3)} />
      </svg>
    </div>
  );
};

const NoDivision: React.FC = () => {
  const {t} = useT();
  const a = prog(t, 4.3, 4.9), b = prog(t, 6.6, 7.2);
  const out = progIn(t, 8.4, 8.8);
  if (t < 4.2 || t > 9) return null;
  return (
    <div style={{position: "absolute", left: 80, width: 860, top: 720, textAlign: "center", opacity: 1 - out, transform: `translateY(${out * 30}px)`}}>
      <div style={{fontFamily: F.bn, fontWeight: 700, fontSize: 130, lineHeight: 1.3, color: C.white, opacity: a, transform: `translateY(${(1 - a) * 40}px) scale(${0.9 + 0.1 * a})`}}>
        <span style={{position: "relative"}}>ভাগ<span style={{position: "absolute", left: -8, right: -8, top: "52%", height: 10, background: C.hot, borderRadius: 5, transform: `scaleX(${prog(t, 4.9, 5.4)})`, transformOrigin: "left"}} /></span>{" "}
        <span style={amberText}>লাগে না</span>
      </div>
      <div style={{fontFamily: F.bn, fontWeight: 600, fontSize: 66, color: C.onNavyMuted, marginTop: 24, opacity: b, transform: `translateY(${(1 - b) * 30}px)`}}>শুধু একটা সিঁড়ি</div>
    </div>
  );
};

const Rule: React.FC = () => {
  const {t} = useT();
  const v = win(t, 14.58, 17.7, 0.5, 0.3);
  if (v <= 0.01) return null;
  const bob = Math.sin(t * 6) * 10;
  return (
    <>
      <div style={{position: "absolute", left: 80, width: 700, top: 330, opacity: v, transform: `translateY(${(1 - v) * 40}px)`,
        fontFamily: F.bn, fontWeight: 700, fontSize: 80, lineHeight: 1.3, color: C.white}}>
        সবচেয়ে <span style={amberText}>বড় ধাপ</span><br />থেকে নামো
      </div>
      <svg width={80} height={110} viewBox="0 0 80 110" style={{position: "absolute", left: 880 - 40 + 56 - 56, top: 470 + bob, opacity: v}}>
        <path d="M40 8V86M14 62L40 90L66 62" stroke={C.amberText} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </>
  );
};

const EQS: {t: number; parts: [string, boolean?][]}[] = [
  {t: 17.98, parts: [["76"]]},
  {t: 20.5, parts: [["76 − 64"]]},
  {t: 21.35, parts: [["76 − 64 = "], ["12", true]]},
  {t: 23.3, parts: [["12 − 8"]]},
  {t: 24.8, parts: [["12 − 8 = "], ["4", true]]},
  {t: 26.2, parts: [["4 − 4"]]},
  {t: 27.5, parts: [["4 − 4 = "], ["0", true]]},
];
const EqPanel: React.FC = () => {
  const {t} = useT();
  const v = win(t, 17.98, 29.0, 0.4, 0.4);
  if (v <= 0.01) return null;
  let idx = 0;
  EQS.forEach((e, i) => { if (t >= e.t) idx = i; });
  const e = EQS[idx];
  const k = prog(t, e.t, e.t + 0.3);
  return (
    <div style={{position: "absolute", left: 80, width: 860, top: 340, height: 170, borderRadius: 28, ...glass, backdropFilter: "blur(8px)", opacity: v,
      transform: `scale(${0.96 + 0.04 * v})`, display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={{fontFamily: F.en, fontWeight: 800, fontSize: 92, color: C.white, opacity: k, transform: `translateY(${(1 - k) * 24}px)`, whiteSpace: "pre"}}>
        {e.parts.map(([s, hi], i) => <span key={i} style={hi ? amberText : undefined}>{s}</span>)}
      </div>
    </div>
  );
};

const Payoff: React.FC = () => {
  const {t} = useT();
  const sum = win(t, 34.16, 40.0, 0.4, 0.35);
  const big = useSpring(34.16);
  const bigOut = 1 - progIn(t, 39.7, 40.1);
  const chk = useSpring(37.52);
  const glow = 0.7 + 0.3 * Math.sin(t * 3);
  return (
    <>
      <div style={{position: "absolute", left: 80, width: 860, top: 350, height: 150, borderRadius: 28, ...glass, opacity: sum, display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${(1 - sum) * 20}px)`}}>
        <span style={{fontFamily: F.en, fontWeight: 700, fontSize: 64, color: C.white, whiteSpace: "nowrap"}}>
          <Rad n="76" base="10" size={64} color={C.white} /> = 64 + 8 + 4
        </span>
      </div>
      {big > 0.01 && t < 40.2 && (
        <div style={{position: "absolute", left: 0, width: W - 60, top: 960, textAlign: "center", opacity: bigOut, transform: `scale(${Math.max(0, big)})`}}>
          <div style={{position: "absolute", left: 140, top: -80, width: 620, height: 340, background: G.glowAmber, filter: "blur(30px)", opacity: glow}} />
          <Rad n="1001100" base="2" size={128} style={{...amberText, position: "relative"}} />
        </div>
      )}
      {chk > 0.01 && t < 40.2 && (
        <div style={{position: "absolute", left: 0, width: W - 60, top: 1105, display: "flex", justifyContent: "center", opacity: bigOut, transform: `scale(${Math.max(0, chk)})`}}>
          <div style={{display: "flex", alignItems: "center", gap: 16, padding: "10px 34px 8px 16px", borderRadius: 999, ...glass}}>
            <svg width={52} height={52} viewBox="0 0 52 52"><circle cx="26" cy="26" r="26" fill={C.go} /><path d="M14 27L23 36L39 17" stroke="#fff" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
            <span style={{fontFamily: F.bn, fontWeight: 700, fontSize: 46, color: C.white, lineHeight: 1.4}}>ভাগ ছাড়াই</span>
          </div>
        </div>
      )}
    </>
  );
};

const Quiz: React.FC = () => {
  const {t} = useT();
  const v = win(t, 40.3, 44.9, 0.4, 0.35);
  const pill = useSpring(43.38, {damping: 12, stiffness: 160, mass: 0.7});
  if (v <= 0.01) return null;
  return (
    <>
      <div style={{position: "absolute", left: 80, width: 860, top: 340, height: 170, borderRadius: 28, ...glass, opacity: v, display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${(1 - v) * 24}px)`}}>
        <span style={{fontFamily: F.en, fontWeight: 800, fontSize: 84, color: C.white, whiteSpace: "nowrap"}}>
          <Rad n="52" base="10" size={84} color={C.white} /> = <Rad n="?" base="2" size={84} color={C.white} />
        </span>
      </div>
      {pill > 0.01 && (
        <div style={{position: "absolute", left: 0, width: W - 60, top: 990, display: "flex", justifyContent: "center", opacity: v, transform: `scale(${Math.max(0, pill)})`}}>
          <div style={{background: C.amber, color: C.onAmber, fontFamily: F.bn, fontWeight: 700, fontSize: 58, padding: "12px 44px 8px", borderRadius: 999, boxShadow: "0 0 50px rgba(245,158,11,.45)"}}>কমেন্টে লেখো</div>
        </div>
      )}
    </>
  );
};

const EndCard: React.FC = () => {
  const {t} = useT();
  const v = win(t, 44.95, 48.0, 0.3, 0.4);
  const pill = useSpring(46.5, {damping: 14, stiffness: 140, mass: 0.7});
  if (v <= 0.01) return null;
  const build = prog(t, 45.0, 46.3);
  const glow = prog(t, 46.0, 46.6);
  return (
    <div style={{position: "absolute", left: 0, width: W, top: 380, opacity: v, display: "flex", flexDirection: "column", alignItems: "center"}}>
      <NetworkH size={330} build={build} glow={glow} />
      <div style={{fontFamily: F.en, fontWeight: 800, fontSize: 96, letterSpacing: ".05em", color: C.white, marginTop: 40, opacity: prog(t, 45.8, 46.3)}}>
        HSC <span style={{color: C.navyText, fontWeight: 600}}>STUDY</span>
      </div>
      <div style={{marginTop: 30, background: C.amber, color: C.onAmber, fontFamily: F.en, fontWeight: 700, fontSize: 54, padding: "10px 46px 8px", borderRadius: 999, transform: `scale(${Math.max(0, pill)})`}}>hscstudy.com</div>
    </div>
  );
};

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{background: C.deep}}>
      <Background />
      <TopBar />
      <HookTable />
      <Num76 />
      <NoDivision />
      <Ladder />
      <Rule />
      <EqPanel />
      <Ball />
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
};
