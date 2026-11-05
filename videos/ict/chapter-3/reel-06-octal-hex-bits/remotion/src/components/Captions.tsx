import React from "react";
import {C, F, W} from "../theme";
import {prog, progIn, useT} from "./Common";

export type Cue = {s: number; e: number; text: string; words?: number[]};

export const CUES: Cue[] = [
  {s: 0.34, e: 3.3, text: "লম্বা বাইনারি সংখ্যা ছোট করার উপায় আছে,"},
  {s: 3.4, e: 5.2, text: "অক্টাল আর হেক্স।"},
  {s: 5.3, e: 7.5, text: "আর রূপান্তর একদম সহজ।"},
  {s: 7.6, e: 9.9, text: "আট মানে দুইয়ের তিন ঘাত।"},
  {s: 10.0, e: 12.3, text: "তাই অক্টালের এক অঙ্ক মানে তিন বিট।"},
  {s: 12.4, e: 13.9, text: "ঘরের মান চার, দুই, এক।", words: [12.4, 12.7, 12.95, 13.25, 13.5]},
  {s: 14.6, e: 16.2, text: "চার এক দুই নাও।"},
  {s: 16.3, e: 18.2, text: "চার হলো এক শূন্য শূন্য।"},
  {s: 18.3, e: 19.9, text: "এক হলো শূন্য শূন্য এক।"},
  {s: 20.0, e: 21.5, text: "দুই হলো শূন্য এক শূন্য।"},
  {s: 21.6, e: 23.9, text: "জোড়া লাগালেই বাইনারি হয়ে গেল।"},
  {s: 24.36, e: 27.3, text: "হেক্সে ষোলো, দুইয়ের চার ঘাত।"},
  {s: 27.4, e: 29.7, text: "তাই এক অঙ্ক মানে চার বিট।"},
  {s: 29.8, e: 32.0, text: "ঘরের মান আট, চার, দুই, এক।", words: [29.8, 30.15, 30.5, 30.8, 31.1, 31.4]},
  {s: 32.3, e: 33.2, text: "এবার তুমি করো।"},
  {s: 33.3, e: 35.5, text: "হেক্স দুই ডি বাইনারিতে কত?"},
  {s: 35.6, e: 36.8, text: "কমেন্টে লেখো।"},
  {s: 36.95, e: 39.0, text: "এমন আরও ট্রিক পেতে ফলো করো।"},
  {s: 39.0, e: 40.95, text: "প্র্যাকটিস করো এইচএসসি স্টাডি ডট কমে।"},
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
