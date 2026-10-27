// utils/lao.ts
// Helpers for comparing / rendering Lao text safely.

// Combining marks: ັ ິ ີ ຶ ື ຸ ູ ຺ ົ ຼ  + tone marks ່ ້ ໊ ໋ + ໌ ໍ
const MARK = "\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD";
const MARK_RUN = new RegExp(`[${MARK}]{2,}`, "g");
// One "cluster" = one base char (consonant, leading vowel, າ, ຳ ...) + all combining marks after it
const CLUSTER = new RegExp(`[^${MARK}][${MARK}]*`, "gu");

function markRank(ch: string): number {
  const c = ch.codePointAt(0)!;
  if (c === 0x0ebc) return 1; // ຼ
  if (c >= 0x0ec8 && c <= 0x0ecb) return 3; // tone marks
  if (c === 0x0ecc || c === 0x0ecd) return 4; // ໌ ໍ
  return 2; // vowel signs
}

/**
 * Convert any equivalent way of typing a Lao string into ONE canonical form.
 * Apply to BOTH the target words and the user's input before comparing.
 */
export function normalizeLao(s: string): string {
  return (
    s
      .normalize("NFC")
      // smart quotes normalization (iOS / macOS smart quotes to ASCII)
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2018\u2019]/g, "'")
      // invisible chars (zero-width space etc.) that sneak in from word lists / copy-paste
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      // ໍ + າ  ->  ຳ
      .replace(/\u0ECD\u0EB2/g, "\u0EB3")
      // ຫ + ນ -> ໜ , ຫ + ມ -> ໝ
      .replace(/\u0EAB\u0E99/g, "\u0EDC")
      .replace(/\u0EAB\u0EA1/g, "\u0EDD")
      // sort runs of combining marks: ຼ -> vowel -> tone -> ໌/ໍ
      // (so "ກ + ່ + ິ" and "ກ + ິ + ່" become identical)
      .replace(MARK_RUN, (run) =>
        Array.from(run)
          .sort((a, b) => markRank(a) - markRank(b))
          .join(""),
      )
  );
}

/** Split into code points (safe for any Unicode, unlike str.length / str[i]). */
export const toCps = (s: string): string[] => Array.from(s);

/** Split into visual clusters (consonant + its vowel/tone marks stay together). */
export const splitClusters = (s: string): string[] => s.match(CLUSTER) ?? [];

export function commonPrefixLen(a: string[], b: string[]): number {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a[i] === b[i]) i++;
  return i;
}

export type CharState = "correct" | "wrong" | "pending" | "partial";

/** One single character (code point) of the target word + whether the user typed it right. */
export interface CharView {
  text: string;
  state: "correct" | "wrong" | "pending";
}

export interface ClusterView {
  text: string;
  /** Summary of the cluster (used for caret placement). */
  state: CharState;
  /** Typed-and-correct part of a partially typed cluster (drawn as an overlay), e.g. "ຮ" of "ຮ້". */
  doneText: string;
  /** Exactly what the user typed over this cluster (used to draw wrong characters on top). */
  typedText: string;
  /** Per-character states (informational: browsers can't colour glyphs inside one cluster separately). */
  chars: CharView[];
}

/**
 * Build a view of the target word versus what the user typed.
 * - `clusters` keep base + marks together (caret is only ever placed BETWEEN clusters)
 * - each cluster has `chars`, a per-code-point state for highlighting
 */
export function buildClusterView(target: string, input: string) {
  const inputCps = toCps(input);
  const targetLen = toCps(target).length;
  let offset = 0;

  const clusters: ClusterView[] = splitClusters(target).map((text) => {
    const cps = toCps(text);

    const chars: CharView[] = cps.map((cp, k) => {
      const typed = inputCps[offset + k];
      const state =
        typed === undefined ? "pending" : typed === cp ? "correct" : "wrong";
      return { text: cp, state };
    });
    const typedText = inputCps.slice(offset, offset + cps.length).join("");
    offset += cps.length;

    const typedCount = chars.filter((c) => c.state !== "pending").length;
    let state: CharState;
    if (typedCount === 0) state = "pending";
    else if (chars.some((c) => c.state === "wrong")) state = "wrong";
    else if (typedCount === chars.length) state = "correct";
    else state = "partial";

    // Correct characters from the start of the cluster up to the first wrong/untyped one
    const firstNotCorrect = chars.findIndex((c) => c.state !== "correct");
    const doneText =
      firstNotCorrect === -1
        ? text
        : chars
            .slice(0, firstNotCorrect)
            .map((c) => c.text)
            .join("");

    return { text, state, chars, doneText, typedText };
  });

  return { clusters, extra: inputCps.slice(targetLen).join("") };
}
