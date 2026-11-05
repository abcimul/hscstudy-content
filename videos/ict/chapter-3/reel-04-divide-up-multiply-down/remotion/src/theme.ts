import {Easing} from "remotion";
import {loadFont as loadHind} from "@remotion/google-fonts/HindSiliguri";
import {loadFont as loadOutfit} from "@remotion/google-fonts/Outfit";

loadHind("normal", {weights: ["500", "600", "700"], subsets: ["bengali", "latin"]});
loadOutfit("normal", {weights: ["600", "700", "800"], subsets: ["latin"]});

export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const VO_SECONDS = 41.04;
export const DURATION = Math.ceil(VO_SECONDS * FPS);

export const C = {
  brand: "#1E3A5F", brandStrong: "#152B47", deep: "#0B1220", brandLift: "#2B5384",
  navyText: "#A9C4E6", onNavyMuted: "#D3DCE8", white: "#FFFFFF",
  amber: "#F59E0B", amberText: "#FBBF24", amberLight: "#FDE68A", onAmber: "#3B2506",
  go: "#15803D", hot: "#DC2626",
};
export const G = {
  bgNavyRadial: "radial-gradient(ellipse 75% 70% at 50% 45%, #2B5384 0%, #1E3A5F 45%, #0B1220 100%)",
  glowBlue: "radial-gradient(circle, rgba(169,196,230,.22), transparent 65%)",
  glowAmber: "radial-gradient(circle, rgba(245,158,11,.30), transparent 62%)",
  keywordAmber: "linear-gradient(180deg, #FDE68A 0%, #FBBF24 35%, #F59E0B 100%)",
};
export const F = {
  bn: '"Hind Siliguri", sans-serif',
  en: '"Outfit", sans-serif',
};
export const glass = {
  background: "rgba(43,83,132,.35)",
  boxShadow: "inset 0 0 0 1px rgba(169,196,230,.25)",
};
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0.3);
export const SPRING = {pop: {damping: 13, stiffness: 150, mass: 0.7}, soft: {damping: 20, stiffness: 120, mass: 0.8}};

// Safe zones (Reels): top 220, bottom 420, right 140
export const SAFE = {top: 240, bottom: H - 420, left: 80, right: W - 140};


// ---- Verified numbers (assert at module load: a wrong number fails the render) ----
const chk = (c: boolean, m: string) => { if (!c) throw new Error("Assertion failed: " + m); };
export const intRows = (n: number) => { const r: [number, number, number][] = []; let q = n; while (q > 0) { r.push([2, q, q % 2]); q = Math.floor(q / 2); } return r; };
export const fracRows = (hundredths: number) => { // fraction given as integer / 100 ; returns [f, doubled, intPart, newFrac]
  const r: [number, number, number, number][] = []; let f = hundredths;
  while (f > 0 && r.length < 8) { const d = f * 2; r.push([f, d, d >= 100 ? 1 : 0, d % 100]); f = d % 100; }
  return r;
};
const I = intRows(25), Fr = fracRows(75);
chk(I.map((r) => r[2]).reverse().join("") === "11001" && parseInt("11001", 2) === 25, "25 = 11001");
chk(I.map((r) => r[1]).join() === "25,12,6,3,1", "division column");
chk(I.map((r) => r[2]).join("") === "10011", "remainders top to bottom");
chk(Fr.map((r) => r[2]).join("") === "11" && Fr[0][1] === 150 && Fr[1][1] === 100, "0.75 -> .11");
chk(parseInt("11001", 2) + 0.5 + 0.25 === 25.75, "11001.11 = 25.75");
chk(intRows(6).map((r) => r[2]).reverse().join("") === "110" && fracRows(50)[0][2] === 1 && fracRows(50)[0][3] === 0, "quiz 6.5 = 110.1 (not shown)");
export const INT_ROWS = I, FRAC_ROWS = Fr;
