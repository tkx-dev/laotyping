// app/utils/punctuation.ts
// Generator and utilities for special characters and punctuation in Lao and English typing.

import type { TypingLanguage } from "../composables/useTypingEngine";

export const LAO_SPECIAL_TOKENS = [
  "+",
  ",",
  ".",
  "-",
  "=",
  "?",
  "!",
  "₭",
  ":",
  ";",
  "%",
  "*",
  "_",
  "(",
  ")",
  '"',
  "'",
];

export const EN_SPECIAL_TOKENS = [
  "+",
  ",",
  ".",
  "-",
  "=",
  "?",
  "!",
  "$",
  ":",
  ";",
  "%",
  "*",
  "_",
  "&",
  "@",
  "(",
  ")",
  '"',
  "'",
];

// Note: In typing tutor engines, words are delimited by the Space key.
// Therefore, tokens in this list must NEVER contain internal spaces.
export const LAO_SYMBOL_DRILL_ITEMS = [
  "+",
  ",",
  ".",
  "=",
  "-",
  "?",
  "!",
  "₭",
  "ສະບາຍດີ,",
  "ຂອບໃຈ.",
  "ແມ່ນບໍ່?",
  "ດີຫຼາຍ!",
  "1+1",
  "1+2",
  "1+1=2",
  "A+B",
  "+",
  '"ວຽງຈັນ"',
  "(ປະເທດ)",
  '"ລາວ"',
  "'ດີ'",
  "10,000₭",
  "500₭",
  "₭100",
  "ລາຄາ=50₭",
  "10-5",
  "ໄວໆ",
  "ດີໆ",
  "ໝາຍເຫດ:",
  "ວຽກ;",
  "100%",
  "(ໃໝ່)",
  "ກິນ+ນອນ",
  "ຮຽນ+ຂຽນ",
  "+",
  ",",
  ".",
  "?",
  "!",
  "=",
  "-",
  "₭",
  "ຫຼາຍໆ",
  "ງາມໆ",
  "5+5=10",
  "20-4",
  "(2026)",
  "ອັກສອນ:",
  "ໂທລະສັບ;",
  '"ຄອມພິວເຕີ"',
  "50,000₭",
  "100,000₭",
  "2*3",
  "key_id",
  "50%",
  "+",
  ",",
  ".",
];

export const EN_SYMBOL_DRILL_ITEMS = [
  "+",
  ",",
  ".",
  "=",
  "-",
  "?",
  "!",
  "$",
  "hello,",
  "thanks.",
  "really?",
  "great!",
  "1+1",
  "1+2",
  "1+1=2",
  "a+b",
  "+",
  '"code"',
  "(system)",
  '"word"',
  "'key'",
  "$100",
  "$50",
  "100%",
  "value=10",
  "10-5",
  "note:",
  "item;",
  "self-test",
  "(info)",
  "read+write",
  "data+logic",
  "+",
  ",",
  ".",
  "?",
  "!",
  "=",
  "-",
  "$",
  "x=y",
  "20-4",
  "(2026)",
  "result:",
  "status;",
  '"computer"',
  "$500",
  "2*3",
  "user_id",
  "50%",
  "test&run",
  "admin@host",
  "+",
  ",",
  ".",
];

/**
 * Apply realistic punctuation & special characters (like , . + ? ! " ' - = () ₭)
 * to an array of base words.
 * Guaranteed: NO returned token ever contains embedded spaces.
 */
export function applyPunctuation(
  words: string[],
  language: TypingLanguage,
): string[] {
  const result: string[] = [];
  let capitalizeNext = language === "english";

  for (let i = 0; i < words.length; i++) {
    let word = words[i]!;

    if (language === "english" && capitalizeNext && word.length > 0) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      capitalizeNext = false;
    }

    // Every ~8th word: insert or pair with a mathematical operator or special symbol (especially +)
    if (i > 0 && i % 8 === 0) {
      const rand = Math.random();
      if (rand < 0.35) {
        // Standalone operator "+"
        result.push("+");
      } else if (rand < 0.65) {
        // Formula without space: "1+1" or "1+2"
        result.push(Math.random() < 0.5 ? "1+1" : "1+2");
      } else if (rand < 0.85) {
        result.push(language === "lao" ? "50,000₭" : "$50");
      } else {
        result.push("100%");
      }
    }

    // 1 in 8 chance to wrap with quotes or parentheses
    const wrapRand = Math.random();
    if (wrapRand < 0.05) {
      word = `"${word}"`;
    } else if (wrapRand < 0.09) {
      word = `'${word}'`;
    } else if (wrapRand < 0.13) {
      word = `(${word})`;
    } else if (language === "lao" && wrapRand < 0.18) {
      // Lao repetition mark
      word = `${word}ໆ`;
    }

    // Sentence structure: punctuation at the end of word
    const isEndOfStream = i === words.length - 1;
    const clauseLength = 4 + (i % 3); // 4-6 words between punctuation

    if (isEndOfStream || (i > 0 && i % clauseLength === 0)) {
      const pRand = Math.random();
      let punct: string;
      if (pRand < 0.45) {
        punct = ",";
      } else if (pRand < 0.75) {
        punct = ".";
        capitalizeNext = language === "english";
      } else if (pRand < 0.87) {
        punct = "?";
        capitalizeNext = language === "english";
      } else if (pRand < 0.95) {
        punct = "!";
        capitalizeNext = language === "english";
      } else {
        punct = Math.random() < 0.5 ? ":" : ";";
      }

      // Avoid double punctuation if quotes or brackets are at the end
      word = `${word}${punct}`;
    }

    result.push(word);
  }

  // Final guarantee: split on any unexpected whitespace so each item is a single token
  return result
    .flatMap((w) => w.trim().split(/\s+/))
    .filter((w) => w.length > 0);
}

/**
 * Generate a dedicated special character & symbol drill stream.
 * Guaranteed: NO returned token ever contains embedded spaces.
 */
export function getSpecialCharactersDrill(
  count: number,
  language: TypingLanguage,
): string[] {
  const bank =
    language === "english" ? EN_SYMBOL_DRILL_ITEMS : LAO_SYMBOL_DRILL_ITEMS;
  const result: string[] = [];
  const bankLen = bank.length;

  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * bankLen);
    result.push(bank[idx] || "+");
  }

  return result
    .flatMap((w) => w.trim().split(/\s+/))
    .filter((w) => w.length > 0);
}
