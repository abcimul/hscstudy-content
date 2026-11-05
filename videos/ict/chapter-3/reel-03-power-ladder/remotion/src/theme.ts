import {Easing} from "remotion";
import {loadFont as loadHind} from "@remotion/google-fonts/HindSiliguri";
import {loadFont as loadOutfit} from "@remotion/google-fonts/Outfit";

loadHind("normal", {weights: ["500", "600", "700"], subsets: ["bengali", "latin"]});
loadOutfit("normal", {weights: ["600", "700", "800"], subsets: ["latin"]});

export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const VO_SECONDS = 48.84;
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

// Ladder geometry (derived once, used by every scene)
export const STEP_VALUES = [1, 2, 4, 8, 16, 32, 64];
export const STEP_W = 112;
export const STEP_PITCH = 124;
export const STEP_BASE = 1130;
export const stepH = (i: number) => 90 + 58 * i;
export const stepX = (i: number) => 80 + i * STEP_PITCH; // left edge
export const stepCx = (i: number) => stepX(i) + STEP_W / 2;
export const cellX = (i: number) => 80 + (6 - i) * STEP_PITCH; // value 2^i in reading order 64..1
export const CELL_TOP = 600;
export const CELL_H = 130;
export const BIT_Y = 830;

// Verified numbers (assert at module load: fails the render if wrong)
const bits = "1001100";
const chk = (c: boolean, m: string) => { if (!c) throw new Error("Assertion failed: " + m); };
chk(parseInt(bits, 2) === 76, "1001100 = 76");
chk(76 - 64 === 12 && 12 - 8 === 4 && 4 - 4 === 0, "ladder steps");
chk(64 + 8 + 4 === 76, "64+8+4");
chk((76).toString(2) === bits, "toString(2)");
chk([6, 3, 2].map((i) => 2 ** i).join() === "64,8,4", "used steps");
chk(STEP_VALUES.every((v, i) => v === 2 ** i), "ladder values");
chk((52).toString(2) === "110100" && 32 + 16 + 4 === 52, "quiz (not shown)");
chk(stepCx(6) + STEP_W / 2 <= SAFE.right, "ladder inside right safe zone");
export const BITS = bits.split("").map(Number); // reading order 64..1
