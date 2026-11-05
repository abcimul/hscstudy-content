import {Easing} from "remotion";
import {loadFont as loadHind} from "@remotion/google-fonts/HindSiliguri";
import {loadFont as loadOutfit} from "@remotion/google-fonts/Outfit";

loadHind("normal", {weights: ["500", "600", "700"], subsets: ["bengali", "latin"]});
loadOutfit("normal", {weights: ["600", "700", "800"], subsets: ["latin"]});

export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const VO_SECONDS = 41.08;
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
export const octBits = (d: number) => d.toString(2).padStart(3, "0");
export const OCT = [4, 1, 2];
export const OCT_BITS = OCT.map(octBits);               // ["100","001","010"]
export const ALL_BITS = OCT_BITS.join("");              // "100001010"
chk(8 === 2 ** 3 && 16 === 2 ** 4, "8=2^3, 16=2^4");
chk(OCT_BITS.join() === "100,001,010" && ALL_BITS === "100001010", "412 octal groups");
chk(parseInt("412", 8) === parseInt("100001010", 2) && (parseInt("412", 8)).toString(2) === ALL_BITS, "(412)8 = (100001010)2");
chk([4, 2, 1].map((v) => (4 === v ? 1 : 0)).join("") === "100", "digit 4 lights only the 4 place");
export const HEX_EX = "9F23";
export const HEX_GROUPS = HEX_EX.split("").map((c) => parseInt(c, 16).toString(2).padStart(4, "0"));
chk(HEX_GROUPS.join(" ") === "1001 1111 0010 0011", "9F23 groups");
chk(parseInt("9F23", 16) === parseInt("1001111100100011", 2), "(9F23)16 = (1001111100100011)2");
// quiz (not shown): 2D hex = 0010 1101
chk(["2", "D"].map((c) => parseInt(c, 16).toString(2).padStart(4, "0")).join("") === "00101101" && parseInt("2D", 16) === 45 && (45).toString(2) === "101101", "quiz 2D");
