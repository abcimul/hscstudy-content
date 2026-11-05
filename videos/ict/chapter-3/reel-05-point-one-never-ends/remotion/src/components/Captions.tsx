import React from "react";
import {C, F, W} from "../theme";
import {prog, progIn, useT} from "./Common";

export type Cue = {s: number; e: number; text: string; words?: number[]};

export const CUES: Cue[] = [
  {s: 0.38, e: 3.1, text: "দশমিকে পয়েন্ট এক কত সহজ।"},
  {s: 3.64, e: 6.0, text: "বাইনারিতে লিখতে গেলে কিন্তু শেষই হয় না!"},
  {s: 6.72, e: 7.6, text: "নিয়ম একটাই।"},
  {s: 8.06, e: 10.0, text: "ভগ্নাংশকে দুই দিয়ে গুণ করো,"},
  {s: 10.0, e: 12.4, text: "পূর্ণ অংশ উপর থেকে নিচে লেখো।"},
  {s: 12.9, e: 14.1, text: "পয়েন্ট এক গুণ দুই,"},
  {s: 14.1, e: 15.3, text: "পয়েন্ট দুই, শূন্য।"},
  {s: 15.5, e: 17.1, text: "পয়েন্ট চার, শূন্য।"},
  {s: 17.3, e: 19.0, text: "পয়েন্ট আট, শূন্য।"},
  {s: 19.58, e: 21.3, text: "এক পয়েন্ট ছয়, এক।"},
  {s: 21.82, e: 23.5, text: "এক পয়েন্ট দুই, এক।"},
  {s: 24.12, e: 25.2, text: "আবার পয়েন্ট দুই!"},
  {s: 25.62, e: 27.5, text: "সেটা তো আগেই এসেছিল।"},
  {s: 27.5, e: 30.6, text: "তাই শূন্য শূন্য এক এক ঘুরতেই থাকে।"},
  {s: 30.7, e: 31.7, text: "শেষ হয় না।"},
  {s: 31.7, e: 33.6, text: "কয়েক ঘর লিখে তিন ডট দাও।"},
  {s: 33.6, e: 35.3, text: "সব ভগ্নাংশ শেষ হয় না।"},
  {s: 35.9, e: 36.9, text: "এবার তুমি করো।"},
  {s: 36.9, e: 39.3, text: "পয়েন্ট ছয় দুই পাঁচ বাইনারিতে কত?"},
  {s: 39.4, e: 40.8, text: "কমেন্টে লেখো।"},
  {s: 40.95, e: 43.0, text: "এমন আরও ট্রিক পেতে ফলো করো।"},
  {s: 43.0, e: 45.1, text: "প্র্যাকটিস করো এইচএসসি স্টাডি ডট কমে।"},
];

export const Captions: React.FC = () => {
  const {t} = useT();
  const cue = CUES.find((c, i) => t >= c.s - 0.04 && t < c.e + 0.25 && !(CUES[i + 1] && t >= CUES[i + 1].s - 0.04));
  if (!cue) return null;
  const words = cue.text.split(/\s+/);
  const total = words.reduce((a, w) => a + w.length + 1, 0);
  const dur = cue.e - cue.s;
  let acc = 0;
  const starts = cue.words ?? words.map((w) => { const s = cue.s + (acc / total) * dur; acc += w.length + 1; return s; });
  let active = 0;
  starts.forEach((s, i) => { if (t >= s - 0.02) active = i; });
  const inP = prog(t, cue.s - 0.04, cue.s + 0.2);
  const outP = progIn(t, cue.e, cue.e + 0.25);
  return (
    <div style={{position: "absolute", left: 80, width: 860, top: 1210, display: "flex", justifyContent: "center",
      opacity: inP * (1 - outP), transform: `translateY(${(1 - inP) * 24 + outP * -8}px) scale(${0.97 + 0.03 * inP})`}}>
      <div style={{background: "rgba(11,18,32,.55)", boxShadow: "inset 0 0 0 1px rgba(169,196,230,.22)", borderRadius: 28, padding: "20px 34px 14px",
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 18px", maxWidth: 860}}>
        {words.map((w, i) => (
          <span key={i} style={{fontFamily: F.bn, fontWeight: 700, fontSize: 60, lineHeight: 1.4, letterSpacing: 0,
            color: i === active ? C.amberText : C.white}}>{w}</span>
        ))}
      </div>
    </div>
  );
};
