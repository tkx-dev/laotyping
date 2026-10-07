import { ref, computed } from "vue";

// Singleton reactive state so all components stay in sync
const volume = ref<number>(0.7);
const isMuted = ref<boolean>(false);
const comboPitchEnabled = ref<boolean>(true);
let initialized = false;

// AudioContext & global nodes
let audioCtx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;
let completeAudioBuffer: AudioBuffer | null = null;
let errorAudioBuffer: AudioBuffer | null = null;
let keydownAudioBuffer: AudioBuffer | null = null;
let isLoadingCompleteSound = false;
let isLoadingErrorSound = false;
let isLoadingKeydownSound = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

async function loadKeydownSound(ctx: AudioContext) {
  if (keydownAudioBuffer || isLoadingKeydownSound) return;
  isLoadingKeydownSound = true;
  try {
    const res = await fetch("/sounds/keydown.mp3");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    keydownAudioBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.warn("Could not load /sounds/keydown.mp3:", err);
  } finally {
    isLoadingKeydownSound = false;
  }
}

async function loadCompleteSound(ctx: AudioContext) {
  if (completeAudioBuffer || isLoadingCompleteSound) return;
  isLoadingCompleteSound = true;
  try {
    const res = await fetch("/sounds/complete.mp3");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    completeAudioBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.warn("Could not load /sounds/complete.mp3:", err);
  } finally {
    isLoadingCompleteSound = false;
  }
}

async function loadErrorSound(ctx: AudioContext) {
  if (errorAudioBuffer || isLoadingErrorSound) return;
  isLoadingErrorSound = true;
  try {
    const res = await fetch("/sounds/error.mp3");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    errorAudioBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.warn("Could not load /sounds/error.mp3:", err);
  } finally {
    isLoadingErrorSound = false;
  }
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseBuffer || noiseBuffer.sampleRate !== ctx.sampleRate) {
    const bufferSize = Math.floor(ctx.sampleRate * 0.1); // 100ms noise
    noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuffer;
}

export function useTypingSound() {
  function initSound() {
    if (initialized || typeof window === "undefined") return;
    initialized = true;

    try {
      const savedVol = localStorage.getItem("laotype-sound-volume");
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          volume.value = parsed;
        }
      }

      const savedMute = localStorage.getItem("laotype-sound-muted");
      if (savedMute !== null) {
        isMuted.value = savedMute === "true";
      }

      const savedCombo = localStorage.getItem("laotype-sound-combo");
      if (savedCombo !== null) {
        comboPitchEnabled.value = savedCombo === "true";
      }
    } catch {
      // Ignore storage errors
    }

    // Warm up audio context on first user interaction and preload sound files
    const unlockAudio = () => {
      const ctx = getAudioContext();
      if (ctx) {
        loadKeydownSound(ctx);
        loadCompleteSound(ctx);
        loadErrorSound(ctx);
      }
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
  }

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v));
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("laotype-sound-volume", volume.value.toString());
    }
    if (volume.value > 0 && isMuted.value) {
      isMuted.value = false;
    }
  }

  function toggleMute() {
    isMuted.value = !isMuted.value;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("laotype-sound-muted", isMuted.value.toString());
    }
  }

  function toggleComboPitch() {
    comboPitchEnabled.value = !comboPitchEnabled.value;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        "laotype-sound-combo",
        comboPitchEnabled.value.toString(),
      );
    }
  }

  const effectiveMuted = computed(
    () => isMuted.value || volume.value === 0,
  );

  /**
   * Synthesize Creamy Mechanical Thock key sound
   * Multi-layered physical acoustic model:
   * 1. Tactile stem click transient (crisp initial contact)
   * 2. Keycap stem glide & surface texture noise burst
   * 3. Solid lubed switch bottom-out body thock (rich low-mid resonance)
   * 4. PBT keycap acoustic cavity resonance
   * 5. Dynamic streak excitement overtone
   */
  function synthThock(
    ctx: AudioContext,
    dest: AudioNode,
    isSpace: boolean,
    pitchMult: number,
    combo = 0,
  ) {
    const now = ctx.currentTime;
    // Micro-jitter to simulate natural keycap differences across keyboard
    const jitter = 0.97 + Math.random() * 0.06;
    const effectivePitch = pitchMult * jitter;

    // 1. Tactile stem click transient (cuts through laptop speakers & headphones)
    const clickOsc = ctx.createOscillator();
    clickOsc.type = "sine";
    const clickStartFreq = (isSpace ? 2000 : 2800) * effectivePitch;
    clickOsc.frequency.setValueAtTime(clickStartFreq, now);
    clickOsc.frequency.exponentialRampToValueAtTime(750, now + 0.007);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(isSpace ? 0.38 : 0.45, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

    clickOsc.connect(clickGain);
    clickGain.connect(dest);
    clickOsc.start(now);
    clickOsc.stop(now + 0.01);

    // 2. Keycap stem glide texture noise
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);

    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.setValueAtTime((isSpace ? 1500 : 2200) * effectivePitch, now);
    bpf.Q.setValueAtTime(2.4, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(isSpace ? 0.32 : 0.28, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.016 : 0.012));

    noise.connect(bpf);
    bpf.connect(noiseGain);
    noiseGain.connect(dest);
    noise.start(now);
    noise.stop(now + 0.02);

    // 3. Body thock: solid lubed bottom-out resonance (tuned for rich warmth)
    const thockOsc = ctx.createOscillator();
    thockOsc.type = isSpace ? "triangle" : "sine";

    const thockStartFreq = (isSpace ? 185 : 320) * effectivePitch;
    const thockEndFreq = isSpace ? 85 : 145;

    thockOsc.frequency.setValueAtTime(thockStartFreq, now);
    thockOsc.frequency.exponentialRampToValueAtTime(thockEndFreq, now + (isSpace ? 0.055 : 0.038));

    const lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.setValueAtTime(isSpace ? 520 : 750, now);
    lpf.Q.setValueAtTime(1.8, now);

    const thockGain = ctx.createGain();
    const peak = isSpace ? 0.88 : 0.72;
    thockGain.gain.setValueAtTime(peak, now);
    thockGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.065 : 0.046));

    thockOsc.connect(lpf);
    lpf.connect(thockGain);
    thockGain.connect(dest);
    thockOsc.start(now);
    thockOsc.stop(now + (isSpace ? 0.075 : 0.052));

    // 4. Keycap acoustic cavity resonance
    const cavityOsc = ctx.createOscillator();
    cavityOsc.type = "sine";
    cavityOsc.frequency.setValueAtTime((isSpace ? 460 : 820) * effectivePitch, now);

    const cavityGain = ctx.createGain();
    cavityGain.gain.setValueAtTime(isSpace ? 0.20 : 0.14, now);
    cavityGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.035 : 0.024));

    cavityOsc.connect(cavityGain);
    cavityGain.connect(dest);
    cavityOsc.start(now);
    cavityOsc.stop(now + (isSpace ? 0.04 : 0.03));

    // 5. Dynamic streak excitement (subtle harmonic shimmer on high combo)
    if (combo >= 8) {
      const shineOsc = ctx.createOscillator();
      shineOsc.type = "sine";
      const overtoneFreq = (isSpace ? 920 : 1380) * (1 + Math.min(combo, 40) * 0.005);
      shineOsc.frequency.setValueAtTime(overtoneFreq, now);

      const shineGain = ctx.createGain();
      const shineAmp = Math.min(0.06 + combo * 0.002, 0.16);
      shineGain.gain.setValueAtTime(shineAmp, now);
      shineGain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

      shineOsc.connect(shineGain);
      shineGain.connect(dest);
      shineOsc.start(now);
      shineOsc.stop(now + 0.036);
    }
  }

  /**
   * Play combo milestone celebration chime (every 10, 25, 50 combo streak)
   */
  function playComboMilestone(ctx: AudioContext, combo: number) {
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(volume.value * 0.55, now);
    master.connect(ctx.destination);

    // Uplifting dual chime
    const f1 = 783.99; // G5
    const f2 = 1046.5; // C6

    [f1, f2].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      const startTime = now + idx * 0.04;
      osc.frequency.setValueAtTime(freq, startTime);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, startTime);
      g.gain.linearRampToValueAtTime(0.32, startTime + 0.008);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(g);
      g.connect(master);
      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  }

  /**
   * Play key sound using /sounds/keydown.mp3 (with synth fallback)
   */
  async function playKey(
    isCorrect = true,
    isSpace = false,
    combo = 0,
  ) {
    if (effectiveMuted.value) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (!isCorrect) {
      playErrorKey();
      return;
    }

    if (!keydownAudioBuffer) {
      await loadKeydownSound(ctx);
    }

    // Master gain for this sound instance
    const master = ctx.createGain();
    master.gain.setValueAtTime(volume.value, ctx.currentTime);
    master.connect(ctx.destination);

    // Calculate pitch scaling from combo for extra excitement
    let pitchMult = 1.0;
    if (comboPitchEnabled.value && combo > 0) {
      // Smooth micro-tonal rise capping at +25% around combo 40
      const factor = Math.min(combo, 40);
      pitchMult = 1 + factor * 0.006;
    }

    if (keydownAudioBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = keydownAudioBuffer;

      // Natural micro-jitter across keys + deeper pitch for spacebar
      const jitter = 0.98 + Math.random() * 0.04;
      const rate = (isSpace ? 0.88 : 1.0) * pitchMult * jitter;
      source.playbackRate.setValueAtTime(rate, ctx.currentTime);

      source.connect(master);
      source.start(0);
    } else {
      synthThock(ctx, master, isSpace, pitchMult, combo);
    }

    // Milestone sound excitement at streak milestones
    if (
      comboPitchEnabled.value &&
      (combo === 10 || combo === 25 || combo === 50 || combo === 75 || combo === 100)
    ) {
      playComboMilestone(ctx, combo);
    }
  }

  /**
   * Play error key sound using /sounds/error.mp3 (with synth fallback)
   */
  async function playErrorKey() {
    if (effectiveMuted.value) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (!errorAudioBuffer) {
      await loadErrorSound(ctx);
    }

    if (errorAudioBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = errorAudioBuffer;

      const master = ctx.createGain();
      master.gain.setValueAtTime(volume.value * 0.85, ctx.currentTime);

      source.connect(master);
      master.connect(ctx.destination);
      source.start(0);
      return;
    }

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(volume.value * 0.7, now);
    master.connect(ctx.destination);

    // Dull damped switch bump fallback
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.045);

    const lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.setValueAtTime(260, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(lpf);
    lpf.connect(gain);
    gain.connect(master);

    osc.start(now);
    osc.stop(now + 0.055);
  }

  /**
   * Play backspace sound (tactile switch tap)
   */
  function playBackspace() {
    if (effectiveMuted.value) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(volume.value * 0.65, now);
    master.connect(ctx.destination);

    // Keycap tap noise
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);

    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.setValueAtTime(1600, now);
    bpf.Q.setValueAtTime(2.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    noise.connect(bpf);
    bpf.connect(noiseGain);
    noiseGain.connect(master);

    // Low clack
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.03);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(master);

    noise.start(now);
    noise.stop(now + 0.015);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Play word complete sound (Spacebar thock + rewarding harmonic chime chord)
   */
  function playWordComplete(isCorrect = true, combo = 0) {
    if (effectiveMuted.value) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (!isCorrect) {
      playErrorKey();
      return;
    }

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(volume.value * 0.75, now);
    master.connect(ctx.destination);

    // Play authentic spacebar sound
    if (keydownAudioBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = keydownAudioBuffer;
      source.playbackRate.setValueAtTime(0.88, now);
      source.connect(master);
      source.start(now);
    } else {
      synthThock(ctx, master, true, 1.0, combo);
    }

    // Chime notes: Root (E5) and Octave/Fifth (B5) for a pure, sweet reward
    const chord = [659.25, 987.77];
    const pitchShift = comboPitchEnabled.value
      ? 1 + Math.min(combo, 30) * 0.005
      : 1;

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      const startAt = now + 0.015 + idx * 0.015;
      osc.frequency.setValueAtTime(freq * pitchShift, startAt);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0, startAt);
      gain.gain.linearRampToValueAtTime(0.3, startAt + 0.008);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        startAt + 0.22,
      );

      osc.connect(gain);
      gain.connect(master);

      osc.start(startAt);
      osc.stop(startAt + 0.24);
    });
  }

  /**
   * Play victory finish sound using /sounds/complete.mp3 (with synth fallback)
   */
  async function playFinish() {
    if (effectiveMuted.value) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (!completeAudioBuffer) {
      await loadCompleteSound(ctx);
    }

    if (completeAudioBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = completeAudioBuffer;

      const master = ctx.createGain();
      master.gain.setValueAtTime(volume.value * 0.95, ctx.currentTime);

      source.connect(master);
      master.connect(ctx.destination);
      source.start(0);
      return;
    }

    // Fallback synth in case audio file loading fails
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(volume.value * 0.85, now);
    master.connect(ctx.destination);

    // C5, E5, G5, C6 triumphant chime
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const step = 0.085;

    notes.forEach((freq, i) => {
      const noteTime = now + i * step;

      const osc = ctx.createOscillator();
      osc.type = i === notes.length - 1 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, noteTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0, noteTime);
      gain.gain.linearRampToValueAtTime(0.4, noteTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(master);

      osc.start(noteTime);
      osc.stop(noteTime + 0.38);
    });
  }

  return {
    volume,
    isMuted,
    comboPitchEnabled,
    effectiveMuted,
    initSound,
    setVolume,
    toggleMute,
    toggleComboPitch,
    playKey,
    playErrorKey,
    playBackspace,
    playWordComplete,
    playFinish,
  };
}
