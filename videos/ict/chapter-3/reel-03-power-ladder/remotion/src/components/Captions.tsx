import React from "react";
import {C, F, W} from "../theme";
import {prog, progIn, useT} from "./Common";

export type Cue = {s: number; e: number; text: string; words?: number[]};

export const CUES: Cue[] = [
  {s: 0.36, e: 3.24, text: "ছিয়াত্তরকে বাইনারি করতে বারবার দুই দিয়ে ভাগ?"},
  {s: 4.04, e: 6.3, text: "বইয়ের প্রথম পদ্ধতিতে ভাগই লাগে না।"},
  {s: 6.3, e: 8.22, text: "শুধু এই সিঁড়িটা মনে রাখো।"},
  {s: 9.2, e: 14.2, text: "এক, দুই, চার, আট, ষোলো, বত্রিশ, চৌষট্টি।", words: [9.24, 9.88, 10.66, 11.34, 12.0, 12.8, 13.45]},
  {s: 14.58, e: 17.5, text: "নিয়ম একটাই, সবচেয়ে বড় ধাপ থেকে নামো।"},
  {s: 17.98, e: 20.2, text: "ছিয়াত্তরের ভেতর সবচেয়ে বড় কোন ধাপ ঢোকে?"},
  {s: 20.2, e: 22.7, text: "চৌষট্টি। বাকি থাকে বারো।"},
  {s: 23.2, e: 25.6, text: "বারোর ভেতর আট। বাকি চার।"},
  {s: 25.6, e: 28.6, text: "আর চার নিজেই একটা ধাপ। ব্যস।"},
  {s: 28.6, e: 30.9, text: "এবার চৌষট্টি থেকে এক পর্যন্ত লেখো।"},
  {s: 30.9, e: 33.6, text: "নেওয়া ধাপে এক, বাকিগুলোতে শূন্য।"},
  {s: 34.16, e: 36.4, text: "এক, শূন্য, শূন্য, এক, এক, শূন্য, শূন্য।", words: [34.16, 34.6, 34.9, 35.2, 35.45, 35.75, 36.05]},
  {s: 37.52, e: 39.8, text: "ভাগ ছাড়াই ছিয়াত্তর বাইনারিতে!"},
  {s: 40.4, e: 41.4, text: "এবার তুমি করো।"},
  {s: 41.68, e: 43.1, text: "বাহান্ন বাইনারিতে কত?"},
  {s: 43.38, e: 44.6, text: "কমেন্টে লেখো।"},
  {s: 44.94, e: 46.7, text: "এমন আরও ট্রিক পেতে ফলো করো।"},
  {s: 46.7, e: 48.7, text: "প্র্যাকটিস করো এইচএসসি স্টাডি ডট কমে।"},
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
