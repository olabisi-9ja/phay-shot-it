/**
 * Ambient sound — a synthesized, endlessly subtle "room tone" for the archive.
 * Filtered brown noise with a slow-breathing lowpass. No audio assets needed.
 * Never autoplays: the context is created only on the SOUND toggle gesture.
 */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let running = false;

function buildGraph() {
  const AC: typeof AudioContext | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;

  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0;

  // 12s of brown noise, looped
  const len = ctx.sampleRate * 12;
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.2;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 340;
  lowpass.Q.value = 0.4;

  // slow breathing on the filter — like wind changing its mind
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 140;
  lfo.connect(lfoGain).connect(lowpass.frequency);

  src.connect(lowpass).connect(master).connect(ctx.destination);
  src.start();
  lfo.start();
  return ctx;
}

export function toggleAmbience(): boolean {
  if (!ctx && !buildGraph()) return false;
  if (!ctx || !master) return false;
  if (ctx.state === "suspended") void ctx.resume();
  running = !running;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(running ? 0.12 : 0, t + 1.2);
  return running;
}

/** A soft synthesized shutter click — used on lightbox navigation when sound is on. */
export function shutterClick() {
  if (!running || !ctx || !master) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(2400, t);
  osc.frequency.exponentialRampToValueAtTime(320, t + 0.03);
  g.gain.setValueAtTime(0.18, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.09);
}
