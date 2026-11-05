import React from "react";
import {C, F, W} from "../theme";
import {prog, progIn, useT} from "./Common";

export type Cue = {s: number; e: number; text: string; words?: number[]};

export const CUES: Cue[] = [
  {s: 0.34, e: 2.5, text: "ভাগশেষ উপর থেকে পড়বে, না নিচ থেকে?"},
  {s: 2.94, e: 5.4, text: "মনে রাখো, ভাগে উঠো, গুণে নামো।"},
  {s: 5.6, e: 7.6, text: "পূর্ণ অংশে দুই দিয়ে ভাগ,"},
  {s: 7.6, e: 9.5, text: "ভাগশেষ নিচ থেকে উপরে।"},
  {s: 9.56, e: 13.0, text: "পঁচিশের ভাগশেষ এক, শূন্য, শূন্য, এক, এক।", words: [9.56, 10.2, 10.95, 11.3, 11.65, 12.0, 12.35]},
  {s: 13.3, e: 16.0, text: "নিচ থেকে উঠলে, এক এক শূন্য শূন্য এক।", words: [13.3, 13.55, 13.85, 14.3, 14.6, 14.9, 15.2, 15.5]},
  {s: 16.6, e: 19.3, text: "ভগ্নাংশে দুই দিয়ে গুণ, পূর্ণ অংশ উপর থেকে নিচে।"},
  {s: 19.4, e: 21.5, text: "পয়েন্ট সাত পাঁচ গুণ দুই,"},
  {s: 21.5, e: 23.1, text: "এক পয়েন্ট পাঁচ,"},
  {s: 23.2, e: 24.2, text: "নিলাম এক।"},
  {s: 24.2, e: 25.5, text: "পয়েন্ট পাঁচ গুণ দুই,"},
  {s: 25.5, e: 27.0, text: "এক, আবার এক।"},
  {s: 27.48, e: 29.1, text: "পঁচিশ পয়েন্ট সাত পাঁচ,"},
  {s: 29.2, e: 32.0, text: "বাইনারিতে এক এক শূন্য শূন্য এক পয়েন্ট এক এক!"},
  {s: 32.58, e: 33.6, text: "এবার তুমি করো।"},
  {s: 33.7, e: 35.9, text: "ছয় পয়েন্ট পাঁচ বাইনারিতে কত?"},
  {s: 36.0, e: 37.4, text: "কমেন্টে লেখো।"},
  {s: 37.6, e: 39.2, text: "এমন আরও ট্রিক পেতে ফলো করো।"},
  {s: 39.2, e: 40.95, text: "প্র্যাকটিস করো এইচএসসি স্টাডি ডট কমে।"},
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
