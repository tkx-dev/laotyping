// app/data/keyboardData.ts
// Comprehensive Lao & English QWERTY keyboard layout definition with touch-typing finger assignments.

export type Finger =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'left-thumb'
  | 'right-thumb'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

export interface KeyDefinition {
  code: string;        // KeyboardEvent.code (e.g. 'KeyA')
  en: string;          // Latin legend (e.g. 'A')
  enShift?: string;    // Latin shifted legend
  lao: string;         // Lao primary character (e.g. 'ັ')
  laoShift?: string;   // Lao shifted character (e.g. 'ັ້')
  finger: Finger;      // Standard touch-typing finger
  width?: number;      // Width multiplier (1 = normal 1u, 1.5 = 1.5u, etc.)
  home?: boolean;      // True if part of the home row resting keys
  bump?: boolean;      // F and J tactile homing bump
  isSpecial?: boolean; // Tab, Caps, Shift, Enter, etc.
  isSpace?: boolean;
}

export const FINGER_NAMES: Record<Finger, { lao: string; en: string }> = {
  'left-pinky': { lao: 'ນິ້ວກ້ອຍຊ້າຍ', en: 'Left Pinky' },
  'left-ring': { lao: 'ນິ້ວນາງຊ້າຍ', en: 'Left Ring' },
  'left-middle': { lao: 'ນິ້ວກາງຊ້າຍ', en: 'Left Middle' },
  'left-index': { lao: 'ນິ້ວຊີ້ຊ້າຍ', en: 'Left Index' },
  'left-thumb': { lao: 'ນິ້ວໂປ້ຊ້າຍ', en: 'Left Thumb' },
  'right-thumb': { lao: 'ນິ້ວໂປ້ຂວາ', en: 'Right Thumb' },
  'right-index': { lao: 'ນິ້ວຊີ້ຂວາ', en: 'Right Index' },
  'right-middle': { lao: 'ນິ້ວກາງຂວາ', en: 'Right Middle' },
  'right-ring': { lao: 'ນິ້ວນາງຂວາ', en: 'Right Ring' },
  'right-pinky': { lao: 'ນິ້ວກ້ອຍຂວາ', en: 'Right Pinky' },
};

export const KEYBOARD_ROWS: KeyDefinition[][] = [
  // Row 1: Number Row
  [
    { code: 'Backquote', en: '`', enShift: '~', lao: '"', laoShift: "'", finger: 'left-pinky' },
    { code: 'Digit1', en: '1', enShift: '!', lao: 'ຢ', laoShift: '1', finger: 'left-pinky' },
    { code: 'Digit2', en: '2', enShift: '@', lao: 'ຟ', laoShift: '2', finger: 'left-ring' },
    { code: 'Digit3', en: '3', enShift: '#', lao: 'ໂ', laoShift: '3', finger: 'left-middle' },
    { code: 'Digit4', en: '4', enShift: '$', lao: 'ຖ', laoShift: '4', finger: 'left-index' },
    { code: 'Digit5', en: '5', enShift: '%', lao: 'ຸ', laoShift: '໌', finger: 'left-index' },
    { code: 'Digit6', en: '6', enShift: '^', lao: 'ູ', laoShift: 'ຼ', finger: 'right-index' },
    { code: 'Digit7', en: '7', enShift: '&', lao: 'ຄ', laoShift: '5', finger: 'right-index' },
    { code: 'Digit8', en: '8', enShift: '*', lao: 'ຕ', laoShift: '6', finger: 'right-middle' },
    { code: 'Digit9', en: '9', enShift: '(', lao: 'ຈ', laoShift: '7', finger: 'right-ring' },
    { code: 'Digit0', en: '0', enShift: ')', lao: 'ຂ', laoShift: '8', finger: 'right-pinky' },
    { code: 'Minus', en: '-', enShift: '_', lao: 'ຊ', laoShift: '9', finger: 'right-pinky' },
    { code: 'Equal', en: '=', enShift: '+', lao: 'ໍ', laoShift: 'ໍ່', finger: 'right-pinky' },
    { code: 'Backspace', en: 'delete', enShift: 'delete', lao: 'delete', laoShift: 'delete', finger: 'right-pinky', width: 1.6, isSpecial: true },
  ],

  // Row 2: QWERTY Row
  [
    { code: 'Tab', en: 'tab', enShift: 'tab', lao: 'tab', laoShift: 'tab', finger: 'left-pinky', width: 1.5, isSpecial: true },
    { code: 'KeyQ', en: 'Q', enShift: 'Q', lao: 'ົ', laoShift: 'ົ້', finger: 'left-pinky' },
    { code: 'KeyW', en: 'W', enShift: 'W', lao: 'ໄ', laoShift: '0', finger: 'left-ring' },
    { code: 'KeyE', en: 'E', enShift: 'E', lao: 'ຳ', laoShift: '*', finger: 'left-middle' },
    { code: 'KeyR', en: 'R', enShift: 'R', lao: 'ພ', laoShift: '_', finger: 'left-index' },
    { code: 'KeyT', en: 'T', enShift: 'T', lao: 'ະ', laoShift: '+', finger: 'left-index' },
    { code: 'KeyY', en: 'Y', enShift: 'Y', lao: 'ິ', laoShift: 'ິ້', finger: 'right-index' },
    { code: 'KeyU', en: 'U', enShift: 'U', lao: 'ີ', laoShift: 'ີ້', finger: 'right-index' },
    { code: 'KeyI', en: 'I', enShift: 'I', lao: 'ຮ', laoShift: 'ຣ', finger: 'right-middle' },
    { code: 'KeyO', en: 'O', enShift: 'O', lao: 'ນ', laoShift: 'ໜ', finger: 'right-ring' },
    { code: 'KeyP', en: 'P', enShift: 'P', lao: 'ຍ', laoShift: 'ຽ', finger: 'right-pinky' },
    { code: 'BracketLeft', en: '[', enShift: '{', lao: 'ບ', laoShift: '-', finger: 'right-pinky' },
    { code: 'BracketRight', en: ']', enShift: '}', lao: 'ລ', laoShift: 'ຫຼ', finger: 'right-pinky' },
    { code: 'Backslash', en: '\\', enShift: '|', lao: '\\', laoShift: '|', finger: 'right-pinky', width: 1.1 },
  ],

  // Row 3: Home Row (ASDF...)
  [
    { code: 'CapsLock', en: 'caps lock', enShift: 'caps lock', lao: 'caps', laoShift: 'caps', finger: 'left-pinky', width: 1.8, isSpecial: true },
    { code: 'KeyA', en: 'A', enShift: 'A', lao: 'ັ', laoShift: 'ັ້', finger: 'left-pinky', home: true },
    { code: 'KeyS', en: 'S', enShift: 'S', lao: 'ຫ', laoShift: ';', finger: 'left-ring', home: true },
    { code: 'KeyD', en: 'D', enShift: 'D', lao: 'ກ', laoShift: '.', finger: 'left-middle', home: true },
    { code: 'KeyF', en: 'F', enShift: 'F', lao: 'ດ', laoShift: ',', finger: 'left-index', home: true, bump: true },
    { code: 'KeyG', en: 'G', enShift: 'G', lao: 'ເ', laoShift: ':', finger: 'left-index' },
    { code: 'KeyH', en: 'H', enShift: 'H', lao: '້', laoShift: '໊', finger: 'right-index' },
    { code: 'KeyJ', en: 'J', enShift: 'J', lao: '່', laoShift: '໋', finger: 'right-index', home: true, bump: true },
    { code: 'KeyK', en: 'K', enShift: 'K', lao: 'າ', laoShift: '!', finger: 'right-middle', home: true },
    { code: 'KeyL', en: 'L', enShift: 'L', lao: 'ສ', laoShift: '?', finger: 'right-ring', home: true },
    { code: 'Semicolon', en: ';', enShift: ':', lao: 'ວ', laoShift: '%', finger: 'right-pinky', home: true },
    { code: 'Quote', en: "'", enShift: '"', lao: 'ງ', laoShift: '=', finger: 'right-pinky' },
    { code: 'Enter', en: 'enter', enShift: 'enter', lao: 'enter', laoShift: 'enter', finger: 'right-pinky', width: 2.1, isSpecial: true },
  ],

  // Row 4: Bottom Row (ZXCV...)
  [
    { code: 'ShiftLeft', en: 'shift', enShift: 'shift', lao: 'shift', laoShift: 'shift', finger: 'left-pinky', width: 2.2, isSpecial: true },
    { code: 'KeyZ', en: 'Z', enShift: 'Z', lao: 'ຜ', laoShift: '₭', finger: 'left-pinky' },
    { code: 'KeyX', en: 'X', enShift: 'X', lao: 'ປ', laoShift: '(', finger: 'left-ring' },
    { code: 'KeyC', en: 'C', enShift: 'C', lao: 'ແ', laoShift: 'ຯ', finger: 'left-middle' },
    { code: 'KeyV', en: 'V', enShift: 'V', lao: 'ອ', laoShift: 'x', finger: 'left-index' },
    { code: 'KeyB', en: 'B', enShift: 'B', lao: 'ຶ', laoShift: 'ຶ້', finger: 'left-index' },
    { code: 'KeyN', en: 'N', enShift: 'N', lao: 'ື', laoShift: 'ື້', finger: 'right-index' },
    { code: 'KeyM', en: 'M', enShift: 'M', lao: 'ທ', laoShift: 'ໆ', finger: 'right-index' },
    { code: 'Comma', en: ',', enShift: '<', lao: 'ມ', laoShift: 'ໝ', finger: 'right-middle' },
    { code: 'Period', en: '.', enShift: '>', lao: 'ໃ', laoShift: '$', finger: 'right-ring' },
    { code: 'Slash', en: '/', enShift: '?', lao: 'ຝ', laoShift: ')', finger: 'right-pinky' },
    { code: 'ShiftRight', en: 'shift', enShift: 'shift', lao: 'shift', laoShift: 'shift', finger: 'right-pinky', width: 2.7, isSpecial: true },
  ],

  // Row 5: Space Row
  [
    { code: 'ControlLeft', en: 'ctrl', lao: 'ctrl', finger: 'left-pinky', width: 1.3, isSpecial: true },
    { code: 'AltLeft', en: 'alt', lao: 'alt', finger: 'left-pinky', width: 1.3, isSpecial: true },
    { code: 'MetaLeft', en: 'cmd', lao: 'cmd', finger: 'left-thumb', width: 1.3, isSpecial: true },
    { code: 'Space', en: '', lao: '', finger: 'right-thumb', width: 6.2, isSpecial: true, isSpace: true },
    { code: 'MetaRight', en: 'cmd', lao: 'cmd', finger: 'right-thumb', width: 1.3, isSpecial: true },
    { code: 'AltRight', en: 'alt', lao: 'alt', finger: 'right-ring', width: 1.3, isSpecial: true },
    { code: 'ControlRight', en: 'ctrl', lao: 'ctrl', finger: 'right-pinky', width: 1.3, isSpecial: true },
  ],
];

export interface CharKeyMatch {
  code: string;
  isShift: boolean;
  finger: Finger;
  shiftFinger?: Finger;
  keyDef: KeyDefinition;
}

// Build fast lookup map from character to key match
const CHAR_TO_KEY = new Map<string, CharKeyMatch>();

// Populate lookup map
for (const row of KEYBOARD_ROWS) {
  for (const key of row) {
    // Space
    if (key.code === 'Space') {
      CHAR_TO_KEY.set(' ', {
        code: 'Space',
        isShift: false,
        finger: 'right-thumb',
        keyDef: key,
      });
      continue;
    }

    // Lao unshifted
    if (key.lao && !key.isSpecial) {
      CHAR_TO_KEY.set(key.lao, {
        code: key.code,
        isShift: false,
        finger: key.finger,
        keyDef: key,
      });
    }

    // Lao shifted
    if (key.laoShift && !key.isSpecial) {
      // If the key is on the right hand, use Left Shift (Left Pinky), else Right Shift (Right Pinky)
      const shiftFinger: Finger = key.finger.startsWith('right') ? 'left-pinky' : 'right-pinky';
      CHAR_TO_KEY.set(key.laoShift, {
        code: key.code,
        isShift: true,
        finger: key.finger,
        shiftFinger,
        keyDef: key,
      });
    }

    // English unshifted
    if (key.en && !key.isSpecial && !CHAR_TO_KEY.has(key.en.toLowerCase())) {
      CHAR_TO_KEY.set(key.en.toLowerCase(), {
        code: key.code,
        isShift: false,
        finger: key.finger,
        keyDef: key,
      });
    }

    // English shifted
    if (key.en && !key.isSpecial && !CHAR_TO_KEY.has(key.en.toUpperCase())) {
      const shiftFinger: Finger = key.finger.startsWith('right') ? 'left-pinky' : 'right-pinky';
      CHAR_TO_KEY.set(key.en.toUpperCase(), {
        code: key.code,
        isShift: true,
        finger: key.finger,
        shiftFinger,
        keyDef: key,
      });
    }
  }
}

// Special mappings and common aliases
CHAR_TO_KEY.set('Backspace', {
  code: 'Backspace',
  isShift: false,
  finger: 'right-pinky',
  keyDef: KEYBOARD_ROWS[0]!.find((k) => k.code === 'Backspace')!,
});

export function findKeyForChar(char: string): CharKeyMatch | null {
  if (!char) return null;
  return CHAR_TO_KEY.get(char) ?? null;
}
