import {Easing} from "remotion";
import {loadFont as loadHind} from "@remotion/google-fonts/HindSiliguri";
import {loadFont as loadOutfit} from "@remotion/google-fonts/Outfit";

loadHind("normal", {weights: ["500", "600", "700"], subsets: ["bengali", "latin"]});
loadOutfit("normal", {weights: ["600", "700", "800"], subsets: ["latin"]});

export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const VO_SECONDS = 45.24;
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


// ---- Verified numbers (assert at module load) ----
const chk = (c: boolean, m: string) => { if (!c) throw new Error("Assertion failed: " + m); };
/** fraction in tenths-style integer arithmetic: f / 10 */
export const mulRows = (tenths: number, n: number) => {
  const r: [number, number, number, number][] = []; let f = tenths;
  for (let i = 0; i < n; i++) { const d = f * 2; r.push([f, d, d >= 10 ? 1 : 0, d % 10]); f = d % 10; }
  return r;
};
export const ROWS = mulRows(1, 6); // 0.1 .. then the repeat of 0.2
chk(ROWS.map((r) => r[2]).join("") === "000110", "0.1 bits 000110");
chk(ROWS.map((r) => r[0]).join() === "1,2,4,8,6,2", "fractions 0.1,0.2,0.4,0.8,0.6,0.2");
chk(ROWS[5][0] === ROWS[1][0], "0.2 comes back");
chk(ROWS.map((r) => r[1]).slice(0, 5).join() === "2,4,8,16,12", "0.2,0.4,0.8,1.6,1.2");
chk(mulRows(1, 20).map((r) => r[2]).join("") === "00011001100110011001", "0.1 = 0.0 0011 0011 ...");
chk(Math.abs(parseInt("00011001100110011001", 2) / 2 ** 20 - 0.1) < 1e-6, "approx 0.1");
// quiz (not shown): 0.625 = 0.101 (terminates)
const q: number[] = []; let f = 625; while (f > 0) { const d = f * 2; q.push(d >= 1000 ? 1 : 0); f = d % 1000; }
chk(q.join("") === "101" && 0.5 + 0.125 === 0.625, "quiz 0.625 = 0.101");
export const CYCLE = [2, 4, 8, 6]; // ring nodes (tenths)
export const CYCLE_BITS = [0, 0, 1, 1];
