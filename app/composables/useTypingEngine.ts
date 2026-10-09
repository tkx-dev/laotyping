import { ref, computed, onMounted } from "vue";
import { getRandomLaoWords } from "../data/words";
import { getRandomEnglishWords } from "../data/englishWords";
import { applyPunctuation, getSpecialCharactersDrill } from "../utils/punctuation";
import {
  normalizeLao,
  toCps,
  commonPrefixLen,
  buildClusterView,
} from "../utils/lao";
import { useTypingSound } from "./useTypingSound";

export type TypingLanguage = "lao" | "english";
export type TestMode = "time" | "words" | "symbols";
export type TimeOption = 15 | 30 | 60;
export type WordOption = 10 | 25 | 50;
export type EngineStatus = "idle" | "running" | "finished";

export interface WordHistory {
  target: string;
  typed: string;
  isCorrect: boolean;
}

export interface NextExpectedCharInfo {
  char: string;
  targetChar: string;
  isError: boolean;
  isSpace: boolean;
}

const MAX_EXTRA_CHARS = 8; // how many chars past the end of a word the user may type
const TICK_MS = 200;

export function useTypingEngine() {
  const langCookie = useCookie<TypingLanguage>("laotype_language", {
    default: () => "lao",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  const language = useState<TypingLanguage>("typing_engine_language", () => {
    if (langCookie.value === "lao" || langCookie.value === "english") {
      return langCookie.value;
    }
    return "lao";
  });

  const puncCookie = useCookie<boolean>("laotype_punctuation", {
    default: () => false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  const hasPunctuation = useState<boolean>("typing_engine_punctuation", () => {
    return Boolean(puncCookie.value);
  });

  const mode = ref<TestMode>("time");
  const timeLimit = ref<TimeOption>(30);
  const wordLimit = ref<WordOption>(25);

  // Restore language and punctuation preferences safely in onMounted to prevent SSR hydration mismatches
  onMounted(() => {
    try {
      const savedLang = localStorage.getItem("laotype_language") as TypingLanguage | null;
      if (
        savedLang &&
        (savedLang === "lao" || savedLang === "english") &&
        savedLang !== language.value
      ) {
        setLanguage(savedLang);
      } else if (
        savedLang &&
        (savedLang === "lao" || savedLang === "english") &&
        langCookie.value !== savedLang
      ) {
        langCookie.value = savedLang;
      }

      const savedPunc = localStorage.getItem("laotype_punctuation");
      if (savedPunc !== null) {
        const boolVal = savedPunc === "true";
        if (hasPunctuation.value !== boolVal) {
          hasPunctuation.value = boolVal;
        }
      }
    } catch {}
  });

  const status = ref<EngineStatus>("idle");
  const words = useState<string[]>("typing_engine_words", () => []);
  const currentWordIndex = ref(0);
  const currentInput = ref(""); // always stored in normalized form
  const wordHistory = ref<WordHistory[]>([]);

  // Statistics
  const totalKeystrokes = ref(0);
  const correctKeystrokes = ref(0);
  const incorrectKeystrokes = ref(0);
  const combo = ref(0);
  const maxCombo = ref(0);
  const timer = ref<number | null>(null);

  const {
    playKey,
    playErrorKey,
    playBackspace,
    playWordComplete,
    playFinish,
  } = useTypingSound();
  const timeLeft = ref(30);
  const startTime = ref<number | null>(null);
  const endTime = ref<number | null>(null);
  const now = ref(Date.now()); // reactive clock so WPM updates live

  const currentTarget = () => words.value[currentWordIndex.value] ?? "";

  function generateWords(n: number) {
    let result: string[];
    if (mode.value === "symbols") {
      result = getSpecialCharactersDrill(n, language.value);
    } else {
      const baseWords =
        language.value === "english"
          ? getRandomEnglishWords(n).filter((w) => w.length > 0)
          : getRandomLaoWords(n)
              .map(normalizeLao)
              .filter((w) => w.length > 0);

      result = hasPunctuation.value
        ? applyPunctuation(baseWords, language.value)
        : baseWords;
    }

    // Safety guarantee: in a typing test, Space delimits words.
    // No token in words must EVER contain internal whitespace.
    return result
      .flatMap((w) => w.trim().split(/\s+/))
      .filter((w) => w.length > 0);
  }

  function ensureWords() {
    if (
      mode.value === "time" &&
      words.value.length - currentWordIndex.value < 30
    ) {
      words.value.push(...generateWords(60));
    }
  }

  function initTest() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }

    status.value = "idle";
    currentWordIndex.value = 0;
    currentInput.value = "";
    wordHistory.value = [];
    totalKeystrokes.value = 0;
    correctKeystrokes.value = 0;
    incorrectKeystrokes.value = 0;
    combo.value = 0;
    maxCombo.value = 0;
    startTime.value = null;
    endTime.value = null;

    if (mode.value === "time") {
      timeLeft.value = timeLimit.value;
      words.value = generateWords(120);
    } else {
      words.value = generateWords(wordLimit.value);
      timeLeft.value = 0;
    }
  }

  if (words.value.length === 0) {
    initTest();
  }

  function tick() {
    if (status.value !== "running" || startTime.value === null) return;
    now.value = Date.now();
    if (mode.value === "time") {

      // Derive from the real clock instead of decrementing (setInterval drifts / gets throttled)
      const remaining = timeLimit.value * 1000 - (now.value - startTime.value);
      timeLeft.value = Math.max(0, Math.ceil(remaining / 1000));
      if (remaining <= 0) finishTest();
    }
  }

  function startTimer() {
    if (status.value !== "idle") return;
    status.value = "running";
    startTime.value = Date.now();
    now.value = startTime.value;
    timer.value = window.setInterval(tick, TICK_MS);
  }

  function finishTest() {
    if (status.value === "finished") return;
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
    const end = Date.now();
    endTime.value =
      mode.value === "time" && startTime.value !== null
        ? Math.min(end, startTime.value + timeLimit.value * 1000)
        : end;
    status.value = "finished";
    playFinish();

    // Commit the word being typed (if any)
    if (currentInput.value.length > 0) {
      const target = currentTarget();
      wordHistory.value.push({
        target,
        typed: currentInput.value,
        isCorrect: currentInput.value === target,
      });
    }
  }

  const elapsedMs = computed(() => {
    if (startTime.value === null) return 0;
    const end =
      endTime.value ??
      (status.value === "running" ? now.value : startTime.value);
    return Math.max(0, end - startTime.value);
  });
  const elapsedSeconds = computed(() => Math.round(elapsedMs.value / 1000));

  // Correct characters (code points, NOT UTF-16 units): fully-correct words (+1 for space)
  // plus the correct prefix of the word currently being typed.
  const correctChars = computed(() => {
    let n = 0;
    for (const h of wordHistory.value) {
      if (h.isCorrect) n += toCps(h.target).length + 1;
    }
    if (status.value === "running") {
      n += commonPrefixLen(toCps(currentTarget()), toCps(currentInput.value));
    }
    return n;
  });

  const minutes = computed(() => Math.max(elapsedMs.value, 1000) / 60000);

  const wpm = computed(() => {
    if (elapsedMs.value === 0) return 0;
    return Math.round(correctChars.value / 5 / minutes.value);
  });

  const cpm = computed(() => {
    if (elapsedMs.value === 0) return 0;
    return Math.round(correctChars.value / minutes.value);
  });

  const accuracy = computed(() => {
    if (totalKeystrokes.value === 0) return 100;
    const acc = Math.round(
      (correctKeystrokes.value / totalKeystrokes.value) * 100,
    );
    return Math.max(0, Math.min(100, acc));
  });

  // Per-cluster view of the active word, for rendering
  const activeWordView = computed(() =>
    buildClusterView(currentTarget(), currentInput.value),
  );

  // Next expected character for visual keyboard & hand guidance
  const nextExpectedCharInfo = computed<NextExpectedCharInfo | null>(() => {
    if (status.value === "finished") return null;
    const target = currentTarget();
    if (!target) return null;
    const targetCps = toCps(target);
    const inputCps = toCps(currentInput.value);
    const p = commonPrefixLen(targetCps, inputCps);

    // If there are extra/wrong characters typed, prompt Backspace
    if (inputCps.length > p) {
      return {
        char: "Backspace",
        targetChar: targetCps[p] ?? " ",
        isError: true,
        isSpace: false,
      };
    }

    // If whole word is typed correctly, prompt Space to advance
    if (p === targetCps.length) {
      return {
        char: " ",
        targetChar: " ",
        isError: false,
        isSpace: true,
      };
    }

    // Next character in current target word
    const nextCh = targetCps[p];
    if (!nextCh) return null;

    return {
      char: nextCh,
      targetChar: nextCh,
      isError: false,
      isSpace: false,
    };
  });

  /**
   * Count keystrokes by DIFFING previous vs new normalized input
   * (works for paste, IME, tone/vowel typed in either order, fast typing...).
   * `rawDelta` = number of code points the user actually added this event.
   */
  function countKeystrokes(
    prev: string,
    next: string,
    rawDelta: number,
    target: string,
  ) {
    if (rawDelta <= 0) return;
    const prevCps = toCps(prev);
    const nextCps = toCps(next);
    const targetCps = toCps(target);
    const p = commonPrefixLen(prevCps, nextCps);
    const added = nextCps.slice(p);
    if (added.length === 0) return; // e.g. an invisible char that normalization removed

    const allMatch = added.every((c, k) => c === targetCps[p + k]);
    totalKeystrokes.value += rawDelta;
    if (allMatch) {
      correctKeystrokes.value += rawDelta;
      combo.value += rawDelta;
      if (combo.value > maxCombo.value) maxCombo.value = combo.value;
      playKey(true, false, combo.value);
    } else {
      incorrectKeystrokes.value += rawDelta;
      combo.value = 0;
      playErrorKey();
    }
  }

  function processValue(el: HTMLInputElement) {
    if (status.value === "finished") {
      el.value = "";
      return;
    }

    const [head = "", ...rest] = el.value.split(/[ \u00A0]/);
    const hasSpace = rest.length > 0;
    const target = currentTarget();
    const prev = currentInput.value;

    // Normalize + cap length (no more auto-commit on overflow: only Space ends a word)
    let cps =
      language.value === "english"
        ? toCps(head.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'"))
        : toCps(normalizeLao(head));
    const maxLen = toCps(target).length + MAX_EXTRA_CHARS;
    if (cps.length > maxLen) cps = cps.slice(0, maxLen);
    const next = cps.join("");

    if (next.length > 0 && status.value === "idle") startTimer();

    countKeystrokes(
      prev,
      next,
      toCps(head).length - toCps(prev).length,
      target,
    );

    if (!hasSpace) {
      const rawDelta = toCps(head).length - toCps(prev).length;
      if (rawDelta < 0) {
        playBackspace();
      }
      if (el.value !== next) el.value = next;
      currentInput.value = next;
      return;
    }

    // Space pressed -> commit the word
    el.value = "";
    currentInput.value = "";
    if (next.length === 0) return; // ignore leading / repeated spaces

    const isCorrect = next === target;
    totalKeystrokes.value++;
    if (isCorrect) {
      correctKeystrokes.value++;
      combo.value += 2; // bonus combo streak for completing word
      if (combo.value > maxCombo.value) maxCombo.value = combo.value;
      playWordComplete(true, combo.value);
    } else {
      incorrectKeystrokes.value++;
      combo.value = 0;
      playWordComplete(false, 0);
    }

    wordHistory.value.push({ target, typed: next, isCorrect });
    currentWordIndex.value++;
    ensureWords();

    if (
      (mode.value === "words" || mode.value === "symbols") &&
      currentWordIndex.value >= words.value.length
    ) {
      finishTest();
    }
  }

  function handleInput(e: Event) {
    // While an IME / predictive keyboard is composing, the value is unstable:
    // wait for compositionend instead.
    if ((e as InputEvent).isComposing) return;
    processValue(e.target as HTMLInputElement);
  }

  function handleCompositionEnd(e: CompositionEvent) {
    processValue(e.target as HTMLInputElement);
  }

  // Backspace on an empty input -> go back and edit the previous word
  function handleKeydown(e: KeyboardEvent) {
    if (status.value === "finished" || e.isComposing) return;

    if (e.key === "Backspace") {
      if (
        currentInput.value.length === 0 &&
        currentWordIndex.value > 0 &&
        wordHistory.value.length > 0
      ) {
        e.preventDefault();
        currentWordIndex.value--;
        const prevWord = wordHistory.value.pop();
        currentInput.value = prevWord ? prevWord.typed : "";

        const el = e.target as HTMLInputElement;
        if (el) el.value = currentInput.value;
        playBackspace();
      }
    }
  }

  function setPunctuation(val: boolean) {
    if (hasPunctuation.value === val) return;
    hasPunctuation.value = val;
    puncCookie.value = val;
    if (import.meta.client) {
      try {
        localStorage.setItem("laotype_punctuation", String(val));
      } catch {}
    }
    initTest();
  }

  function setLanguage(newLanguage: TypingLanguage) {
    if (language.value === newLanguage) return;
    language.value = newLanguage;
    langCookie.value = newLanguage;
    if (import.meta.client) {
      try {
        localStorage.setItem("laotype_language", newLanguage);
      } catch {}
    }
    initTest();
  }

  function setMode(newMode: TestMode) {
    mode.value = newMode;
    initTest();
  }

  function setTimeLimit(seconds: TimeOption) {
    timeLimit.value = seconds;
    mode.value = "time";
    initTest();
  }

  function setWordLimit(count: WordOption) {
    wordLimit.value = count;
    if (mode.value !== "symbols") {
      mode.value = "words";
    }
    initTest();
  }

  return {
    language,
    hasPunctuation,
    mode,
    timeLimit,
    wordLimit,
    status,
    words,
    currentWordIndex,
    currentInput,
    wordHistory,
    timeLeft,
    elapsedSeconds,
    wpm,
    cpm,
    accuracy,
    totalKeystrokes,
    correctKeystrokes,
    incorrectKeystrokes,
    combo,
    maxCombo,
    activeWordView, // NEW: [{ text, state }] per cluster + extra chars
    nextExpectedCharInfo, // Next character and finger guide
    initTest,
    handleInput,
    handleCompositionEnd, // NEW: bind to @compositionend
    handleKeydown,
    setPunctuation,
    setLanguage,
    setMode,
    setTimeLimit,
    setWordLimit,
  };
}
