// compose.js — renders an original romantic piece (piano + music box + pad)
// with a music-box "Happy Birthday" interlude. Output: raw stereo float32 PCM.
// Usage: node compose.js out.f32
'use strict';
const fs = require('fs');

const SR = 44100;
const BPM = 72;
const BEAT = 60 / BPM;
const rand = (a, b) => a + Math.random() * (b - a);
const hum = () => rand(-0.006, 0.006);

/* ---------- pitch helpers ---------- */
const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
function m(name) {
  const r = /^([A-G])(#|b)?(-?\d)$/.exec(name);
  if (!r) throw new Error('bad note ' + name);
  return 12 * (+r[3] + 1) + PC[r[1]] + (r[2] === '#' ? 1 : r[2] === 'b' ? -1 : 0);
}
const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

/* ---------- harmony (key of F major) ---------- */
const CH = {
  F:       { bass: 'F2',  up: ['C3', 'F3', 'A3', 'C4'],  pad: ['A3', 'C4', 'F4'] },
  'C/E':   { bass: 'E2',  up: ['C3', 'E3', 'G3', 'C4'],  pad: ['G3', 'C4', 'E4'] },
  Dm:      { bass: 'D2',  up: ['A2', 'D3', 'F3', 'A3'],  pad: ['F3', 'A3', 'D4'] },
  Am:      { bass: 'A2',  up: ['C3', 'E3', 'A3', 'C4'],  pad: ['A3', 'C4', 'E4'] },
  Bb:      { bass: 'Bb2', up: ['D3', 'F3', 'Bb3', 'D4'], pad: ['Bb3', 'D4', 'F4'] },
  'F/A':   { bass: 'A2',  up: ['C3', 'F3', 'A3', 'C4'],  pad: ['A3', 'C4', 'F4'] },
  Gm7:     { bass: 'G2',  up: ['D3', 'F3', 'Bb3', 'D4'], pad: ['F3', 'Bb3', 'D4'] },
  Gm:      { bass: 'G2',  up: ['D3', 'G3', 'Bb3', 'D4'], pad: ['G3', 'Bb3', 'D4'] },
  C7:      { bass: 'C3',  up: ['E3', 'G3', 'Bb3', 'C4'], pad: ['G3', 'Bb3', 'E4'] },
  C:       { bass: 'C3',  up: ['E3', 'G3', 'C4', 'E4'],  pad: ['G3', 'C4', 'E4'] },
  Csus4:   { bass: 'C3',  up: ['F3', 'G3', 'C4', 'F4'],  pad: ['G3', 'C4', 'F4'] },
  F7:      { bass: 'F2',  up: ['C3', 'Eb3', 'F3', 'A3'], pad: ['A3', 'C4', 'Eb4'] },
  Bbadd9:  { bass: 'Bb2', up: ['F3', 'Bb3', 'C4', 'D4'], pad: ['Bb3', 'C4', 'D4', 'F4'] },
};

/* ---------- the score ---------- */
const S = [];
const bar = (beats, chord, mel = '', o = {}) => S.push({ beats, chord, mel, ...o });

// Intro — rolling piano + pad
bar(4, 'F', '', { arp: .26 });
bar(4, 'Dm', '', { arp: .26 });
bar(4, 'Bb', '', { arp: .27 });
bar(4, [['Csus4', 2], ['C', 2]], '', { arp: .28 });

// Theme A — music box
const Ach = ['F', 'C/E', 'Dm', 'Am', 'Bb', 'F/A', 'Gm7', 'C7'];
['C5:1.5 A4:0.5 F5:1.5 E5:0.5', 'D5:1 C5:1 G4:2', 'A4:1.5 Bb4:0.5 C5:1 D5:1', 'E5:3 C5:1',
 'D5:1.5 C5:0.5 Bb4:1 D5:1', 'C5:1.5 A4:0.5 F4:1 A4:1', 'D5:1.5 C5:0.5 Bb4:1 G4:1', 'G4:1 A4:0.5 Bb4:0.5 C5:2']
  .forEach((mel, i) => bar(4, Ach[i], mel, { lead: 'box', arp: .30 }));

// Theme A' — piano melody, music box sparkle an octave up
const A2 = ['C5:1.5 A4:0.5 F5:1.5 E5:0.5', 'D5:1 C5:1 G4:2', 'A4:1.5 Bb4:0.5 C5:1 F5:1', 'E5:2 D5:1 C5:1',
            'D5:1.5 E5:0.5 F5:1 D5:1', 'C5:1.5 A4:0.5 C5:1 F5:1', 'D5:1.5 C5:0.5 Bb4:0.5 A4:0.5 G4:1', 'A4:4'];
const A2ch = ['F', 'C/E', 'Dm', 'Am', 'Bb', 'F/A', [['Gm7', 2], ['C7', 2]], 'F'];
A2.forEach((mel, i) => bar(4, A2ch[i], mel, { lead: 'both', arp: .32 }));

// B — rising, more emotional
const Bch = ['Dm', 'Bb', 'F', 'C', 'Dm', 'Bb', 'Gm', [['Csus4', 2], ['C', 2]]];
['A4:1 D5:1 F5:2', 'F5:1.5 D5:0.5 Bb4:2', 'A4:1 C5:1 F5:1 A5:1', 'G5:3 E5:1',
 'F5:1.5 E5:0.5 D5:1 F5:1', 'D5:1.5 C5:0.5 Bb4:1 D5:1', 'D5:1.5 C5:0.5 Bb4:1 G4:1', 'F5:2 E5:2']
  .forEach((mel, i) => bar(4, Bch[i], mel, { lead: 'both', arp: .36 }));

// A breath, with the "Happy Birthday" pickup
bar(4, 'C7', 'r:3 C5:0.75 C5:0.25', { lead: 'box', bassOnly: true, padVol: .05 });

// Happy Birthday (public domain melody) — music box, 3/4
const HBch = ['F', 'C7', 'C7', 'F', 'F7', 'Bb', [['F', 2], ['C7', 1]], 'F'];
const HBst = [1, 1, 1, 1, 1, 1.04, 1.12, 1.28];
['D5:1 C5:1 F5:1', 'E5:2 C5:0.75 C5:0.25', 'D5:1 C5:1 G5:1', 'F5:2 C5:0.75 C5:0.25',
 'C6:1 A5:1 F5:1', 'E5:1 D5:1 Bb5:0.75 Bb5:0.25', 'A5:1 F5:1 G5:1', 'F5:3']
  .forEach((mel, i) => bar(3, HBch[i], mel, { lead: 'box', arp: .22, padVol: .052, stretch: HBst[i], boxVel: .66 }));

bar(4, [['Bb', 2], ['C7', 2]], '', { arp: .28 });

// Final A — full, resolving up to F
const AF = [...A2.slice(0, 6), 'D5:1.5 C5:0.5 Bb4:1 E5:1', 'F5:4'];
const AFst = [1, 1, 1, 1, 1, 1, 1.12, 1.3];
AF.forEach((mel, i) => bar(4, A2ch[i], mel, { lead: 'both', arp: .34, stretch: AFst[i] }));

// Outro
bar(4, 'Bbadd9', '', { arp: .25, stretch: 1.3 });
bar(4, 'F', 'F5:1 A5:1 C6:1 F6:1', { lead: 'box', roll: true, stretch: 1.45, boxVel: .45 });

/* ---------- score → events ---------- */
const events = [];
let t = 0.4;
for (const b of S) {
  const bl = BEAT * (b.stretch || 1);
  const segs = Array.isArray(b.chord) ? b.chord : [[b.chord, b.beats]];
  let st = t;
  for (const [name, beats] of segs) {
    const c = CH[name];
    const segDur = beats * bl;
    events.push({ type: 'pad', notes: c.pad.map(m), t: st, dur: segDur, vol: b.padVol ?? .045 });
    if (b.roll) {
      ['F2', 'C3', 'F3', 'A3', 'C4', 'F4'].forEach((n, i) =>
        events.push({ type: 'piano', midi: m(n), t: st + i * .075, dur: 7, vel: .44 - i * .025 }));
    } else {
      events.push({ type: 'piano', midi: m(c.bass), t: st + hum(), dur: segDur + .3, vel: .46 });
      if (!b.bassOnly) {
        const seq = [0, 1, 2, 3, 2, 1, 0];
        const count = Math.round(beats * 2) - 1;
        for (let k = 0; k < count; k++) {
          const nt = st + (k + 1) * bl / 2;
          events.push({ type: 'piano', midi: m(c.up[seq[k % seq.length]]), t: nt + hum(),
                        dur: st + segDur - nt + .35, vel: b.arp * rand(.88, 1.12) });
        }
      }
    }
    st += segDur;
  }
  if (b.mel) {
    let mt = t, sum = 0;
    for (const tok of b.mel.trim().split(/\s+/)) {
      const [nm, d] = tok.split(':');
      const beats = parseFloat(d);
      sum += beats;
      const dur = beats * bl;
      if (nm !== 'r') {
        const mm = m(nm);
        if (b.lead === 'box') {
          events.push({ type: 'box', midi: mm, t: mt + hum(), vel: b.boxVel ?? .62 });
        } else {
          events.push({ type: 'piano', midi: mm, t: mt + hum(), dur: dur * .95 + .2, vel: .58, pan: .05 });
          events.push({ type: 'box', midi: mm + 12, t: mt + hum(), vel: .24 });
        }
      }
      mt += dur;
    }
    if (Math.abs(sum - b.beats) > 1e-9) throw new Error(`bar melody has ${sum} beats, expected ${b.beats}: ${b.mel}`);
  }
  t += b.beats * bl;
}
const musicEnd = t;
const total = Math.ceil((musicEnd + 7.5) * SR);
const L = new Float32Array(total), R = new Float32Array(total);

/* ---------- instruments ---------- */
const panGains = (pan, g) => [Math.cos((pan + 1) * Math.PI / 4) * g, Math.sin((pan + 1) * Math.PI / 4) * g];

function piano(midi, t0, dur, vel, pan) {
  if (pan === undefined) pan = Math.max(-.6, Math.min(.6, (midi - 62) / 40));
  const f = freq(midi);
  const start = Math.max(0, Math.round(t0 * SR));
  const relTau = .16;
  const n = Math.min(Math.round((dur + 1.0) * SR), total - start);
  if (n <= 0) return;
  const buf = new Float32Array(n);
  const nMax = Math.max(3, Math.min(11, Math.floor(7500 / f)));
  const parts = [];
  let norm = 0;
  for (let k = 1; k <= nMax; k++) {
    const fk = k * f * Math.sqrt(1 + .00035 * k * k);
    let amp = Math.pow(k, -1.1) * (.25 + Math.abs(Math.sin(Math.PI * k * .13)))  // hammer position
            * Math.exp(-(k - 1) * (.6 - .38 * vel));                                // softer = darker
    const d = (.55 + f / 520) * (1 + .3 * (k - 1));
    parts.push({ fk, amp, d });
    norm += amp * amp;
  }
  norm = 1 / Math.sqrt(norm);
  for (const p of parts) {
    const copies = p.fk < 1200 ? [[1, .62], [1.00065, .38]] : [[1, 1]];  // two strings → gentle chorus
    for (const [det, share] of copies) {
      const w = 2 * Math.PI * p.fk * det / SR, ph = Math.random() * 6.283;
      const k1 = Math.exp(-p.d / SR), k2 = Math.exp(-p.d * .16 / SR);
      let e1 = .6 * p.amp * norm * share, e2 = .4 * p.amp * norm * share;
      for (let i = 0; i < n; i++) {
        buf[i] += (e1 + e2) * Math.sin(ph + w * i);
        e1 *= k1; e2 *= k2;
        if (e1 + e2 < 1e-5) break;
      }
    }
  }
  // soft felt "thump"
  let lp = 0;
  const thumpN = Math.min(n, Math.round(.012 * SR));
  for (let i = 0; i < thumpN; i++) {
    lp += (Math.random() * 2 - 1 - lp) * .08;
    buf[i] += lp * .25 * Math.exp(-i / (.003 * SR));
  }
  const [gl, gr] = panGains(pan, vel);
  const atk = Math.round(.003 * SR), off = Math.round(dur * SR), relK = Math.exp(-1 / (relTau * SR));
  let env = 1;
  for (let i = 0; i < n; i++) {
    let a = i < atk ? i / atk : 1;
    if (i > off) env *= relK;
    const s = buf[i] * a * env;
    L[start + i] += s * gl;
    R[start + i] += s * gr;
  }
}

function box(midi, t0, vel, pan = .15) {
  const f = freq(midi);
  const start = Math.max(0, Math.round(t0 * SR));
  const sc = Math.pow(f / 523, .4);
  const n = Math.min(Math.round(Math.min(6, Math.log(1500) / (1.25 * sc)) * SR), total - start);
  const parts = [[1, 1, 1.25], [2, .22, 3], [3, .06, 5], [4.2, .07, 8], [5.4, .035, 12], [8.9, .02, 30]];
  const [gl, gr] = panGains(pan, vel * .55);
  const atk = Math.round(.0012 * SR);
  for (const [ratio, amp, dec] of parts) {
    const fk = f * ratio;
    if (fk > 15000) continue;
    const w = 2 * Math.PI * fk / SR, ph = Math.random() * 6.283;
    const k = Math.exp(-dec * sc / SR);
    let e = amp;
    for (let i = 0; i < n; i++) {
      const a = i < atk ? i / atk : 1;
      const s = e * a * Math.sin(ph + w * i);
      L[start + i] += s * gl;
      R[start + i] += s * gr;
      e *= k;
      if (e < 1e-5) break;
    }
  }
}

function pad(notes, t0, dur, vol) {
  const start = Math.max(0, Math.round(t0 * SR));
  const atk = .9, rel = 1.6;
  const n = Math.min(Math.round((dur + rel) * SR), total - start);
  const voices = [[-6, -.7], [0, 0], [6, .7]];
  for (const midi of notes) {
    for (const [cents, pan] of voices) {
      const f = freq(midi) * Math.pow(2, cents / 1200);
      const w = 2 * Math.PI * f / SR, ph = Math.random() * 6.283, lph = Math.random() * 6.283;
      const [gl, gr] = panGains(pan, vol);
      const relK = Math.exp(-1 / (rel / 4 * SR));
      const offS = Math.round(dur * SR), atkS = atk * SR;
      let env = 1;
      for (let i = 0; i < n; i++) {
        let a = i < atkS ? Math.pow(Math.sin(Math.PI / 2 * i / atkS), 2) : 1;
        if (i > offS) env *= relK;
        const x = ph + w * i;
        const trem = 1 + .12 * Math.sin(lph + 2 * Math.PI * .3 * i / SR);
        const s = (Math.sin(x) + .18 * Math.sin(2 * x)) * a * env * trem;
        L[start + i] += s * gl;
        R[start + i] += s * gr;
      }
    }
  }
}

/* ---------- render ---------- */
const t0 = Date.now();
for (const e of events) {
  if (e.type === 'piano') piano(e.midi, e.t, e.dur, e.vel, e.pan);
  else if (e.type === 'box') box(e.midi, e.t, e.vel);
  else pad(e.notes, e.t, e.dur, e.vol);
}

/* ---------- Freeverb ---------- */
function freeverb(inL, inR, room = .86, damp = .35) {
  const fb = room * .28 + .7, d1 = damp * .4, d2 = 1 - d1;
  const comb = (len) => ({ b: new Float32Array(len), i: 0, s: 0 });
  const ap = (len) => ({ b: new Float32Array(len), i: 0 });
  const CT = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617], AT = [556, 441, 341, 225], SP = 23;
  const cl = CT.map((x) => comb(x)), cr = CT.map((x) => comb(x + SP));
  const al = AT.map((x) => ap(x)), ar = AT.map((x) => ap(x + SP));
  const pre = Math.round(.022 * SR);
  const outL = new Float32Array(inL.length), outR = new Float32Array(inL.length);
  const runComb = (c, x) => { const y = c.b[c.i]; c.s = y * d2 + c.s * d1; c.b[c.i] = x + c.s * fb; if (++c.i >= c.b.length) c.i = 0; return y; };
  const runAp = (a, x) => { const bo = a.b[a.i]; const y = -x + bo; a.b[a.i] = x + bo * .5; if (++a.i >= a.b.length) a.i = 0; return y; };
  for (let i = 0; i < inL.length; i++) {
    const j = i - pre;
    const x = j >= 0 ? (inL[j] + inR[j]) * .015 : 0;
    let yl = 0, yr = 0;
    for (let k = 0; k < 8; k++) { yl += runComb(cl[k], x); yr += runComb(cr[k], x); }
    for (let k = 0; k < 4; k++) { yl = runAp(al[k], yl); yr = runAp(ar[k], yr); }
    outL[i] = yl; outR[i] = yr;
  }
  return [outL, outR];
}
const rms = (a) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * a[i]; return Math.sqrt(s / a.length); };
const [rvL, rvR] = freeverb(L, R);
const wetGain = .5 * (rms(L) + rms(R)) / (rms(rvL) + rms(rvR));

/* ---------- master ---------- */
const out = new Float32Array(total * 2);
let hpL = 0, hpR = 0, pxL = 0, pxR = 0, peak = 0;
const hpA = Math.exp(-2 * Math.PI * 35 / SR);
for (let i = 0; i < total; i++) {
  let l = L[i] * .9 + rvL[i] * wetGain, r = R[i] * .9 + rvR[i] * wetGain;
  // 35 Hz high-pass
  const nl = hpA * (hpL + l - pxL), nr = hpA * (hpR + r - pxR);
  pxL = l; pxR = r; hpL = nl; hpR = nr;
  out[2 * i] = nl; out[2 * i + 1] = nr;
  peak = Math.max(peak, Math.abs(nl), Math.abs(nr));
}
const fadeIn = Math.round(.6 * SR), fadeOut = Math.round(4 * SR);
for (let i = 0; i < total; i++) {
  let g = .89 / peak;
  if (i < fadeIn) g *= i / fadeIn;
  if (i > total - fadeOut) g *= Math.pow((total - i) / fadeOut, 2);
  out[2 * i] = Math.tanh(out[2 * i] * g * 1.05) / Math.tanh(1.05);
  out[2 * i + 1] = Math.tanh(out[2 * i + 1] * g * 1.05) / Math.tanh(1.05);
}

fs.writeFileSync(process.argv[2] || 'out.f32', Buffer.from(out.buffer));
console.log(`events: ${events.length}, length: ${(total / SR).toFixed(1)}s, rendered in ${((Date.now() - t0) / 1000).toFixed(1)}s, wetGain ${wetGain.toFixed(2)}`);
