import fs from "fs";
const SR = 44100;
const write = (name, f, dur) => {
  const n = Math.floor(SR * dur); const b = Buffer.alloc(44 + n * 2);
  b.write("RIFF", 0); b.writeUInt32LE(36 + n * 2, 4); b.write("WAVEfmt ", 8); b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28);
  b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write("data", 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) { const v = Math.max(-1, Math.min(1, f(i / SR, i))); b.writeInt16LE(Math.round(v * 30000), 44 + i * 2); }
  fs.writeFileSync(`public/sfx/${name}.wav`, b);
};
let seed = 1; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
write("pop", (t) => Math.sin(2 * Math.PI * (200 + 500 * Math.exp(-t * 40)) * t) * Math.exp(-t * 28) * 0.9, 0.25);
write("click", (t) => (rnd() * Math.exp(-t * 300) * 0.5 + Math.sin(2 * Math.PI * 1500 * t) * Math.exp(-t * 90) * 0.6), 0.15);
let lp = 0;
write("whoosh", (t) => { const e = Math.sin(Math.PI * Math.min(1, t / 0.4)) ** 2; const a = 0.05 + 0.4 * e; lp += a * (rnd() - lp); return lp * 3 * e; }, 0.4);
write("chime", (t) => (Math.sin(2 * Math.PI * 880 * t) + 0.6 * Math.sin(2 * Math.PI * 1318.5 * t) + 0.3 * Math.sin(2 * Math.PI * 1760 * t)) * Math.exp(-t * 4.5) * 0.4, 1.2);
write("thump", (t) => Math.sin(2 * Math.PI * (55 + 80 * Math.exp(-t * 30)) * t) * Math.exp(-t * 12) * 0.9, 0.4);
