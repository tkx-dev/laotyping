// app/data/lessons/englishLessons.ts
// Comprehensive English Touch-Typing Curriculum from Absolute Basic to Advanced.

import type { LessonLevel } from '../../types/lesson';

export const ENGLISH_LESSON_LEVELS: LessonLevel[] = [
  // ==========================================
  // LEVEL 1: HOME ROW BASICS
  // ==========================================
  {
    level: 1,
    title: {
      lao: 'ຂັ້ນ 1: ແຖວຫຼັກພາສາອັງກິດ (Home Row)',
      en: 'Level 1: Home Row Basics',
    },
    description: {
      lao: 'ເລີ່ມຕົ້ນດ້ວຍແປ້ນ F ແລະ J ທີ່ມີຕຸ່ມນູນ ຮຽນຮູ້ການວາງນິ້ວມືແຖວຫຼັກ',
      en: 'Master home row resting keys starting from index homing bumps F and J.',
    },
    lessons: [
      {
        id: 'en-1-1',
        language: 'english',
        level: 1,
        levelTitle: 'Level 1: Home Row Basics',
        title: 'Index Fingers (F & J)',
        description: 'Rest left index on F and right index on J. Feel the tactile bumps.',
        focusKeys: ['f', 'j'],
        words: ['f', 'j', 'ff', 'jj', 'fj', 'jf', 'ffj', 'jjf', 'fjf', 'jfj', 'f', 'j', 'fj', 'jf'],
        targetAccuracy: 90,
        minWpm: 12,
      },
      {
        id: 'en-1-2',
        language: 'english',
        level: 1,
        levelTitle: 'Level 1: Home Row Basics',
        title: 'Middle Fingers (D & K)',
        description: 'Use left middle finger for D and right middle finger for K.',
        focusKeys: ['d', 'k', 'f', 'j'],
        words: ['d', 'k', 'dd', 'kk', 'dk', 'kd', 'df', 'jk', 'dkj', 'kdf', 'fdd', 'jkk'],
        targetAccuracy: 90,
        minWpm: 14,
      },
      {
        id: 'en-1-3',
        language: 'english',
        level: 1,
        levelTitle: 'Level 1: Home Row Basics',
        title: 'Ring Fingers (S & L)',
        description: 'Use left ring finger for S and right ring finger for L.',
        focusKeys: ['s', 'l'],
        words: ['s', 'l', 'ss', 'll', 'sl', 'ls', 'as', 'lk', 'sld', 'kls', 'floss', 'skid'],
        targetAccuracy: 90,
        minWpm: 14,
      },
      {
        id: 'en-1-4',
        language: 'english',
        level: 1,
        levelTitle: 'Level 1: Home Row Basics',
        title: 'Pinky Fingers (A & ;)',
        description: 'Use left pinky finger for A and right pinky finger for semicolon.',
        focusKeys: ['a', ';'],
        words: ['a', 'all', 'ask', 'fall', 'flask', 'salad', 'glad', 'flak', 'alas', 'dads'],
        targetAccuracy: 90,
        minWpm: 16,
      },
      {
        id: 'en-1-5',
        language: 'english',
        level: 1,
        levelTitle: 'Level 1: Home Row Basics',
        title: 'Center Keys (G & H)',
        description: 'Reach left index to G and right index to H, then always return.',
        focusKeys: ['g', 'h'],
        words: ['g', 'h', 'had', 'has', 'half', 'hall', 'glad', 'flag', 'dash', 'flash', 'glass'],
        targetAccuracy: 90,
        minWpm: 18,
      },
      {
        id: 'en-1-6',
        language: 'english',
        level: 1,
        levelTitle: 'Level 1: Home Row Basics',
        title: 'Home Row Words Review',
        description: 'Practice fluent typing of complete words made entirely of home row keys.',
        focusKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        words: ['all', 'ask', 'dash', 'fall', 'flag', 'flash', 'glad', 'glass', 'had', 'half', 'hall', 'salad'],
        targetAccuracy: 92,
        minWpm: 20,
      },
    ],
  },

  // ==========================================
  // LEVEL 2: TOP ROW REACH
  // ==========================================
  {
    level: 2,
    title: {
      lao: 'ຂັ້ນ 2: ແຖວເທິງພາສາອັງກິດ (Top Row)',
      en: 'Level 2: Top Row Reach',
    },
    description: {
      lao: 'ຝຶກເອື້ອມນິ້ວຂຶ້ນແຖວເທິງ QWERTYUIOP',
      en: 'Master upward reaches to the top row keys.',
    },
    lessons: [
      {
        id: 'en-2-1',
        language: 'english',
        level: 2,
        levelTitle: 'Level 2: Top Row Reach',
        title: 'Index Reaches (R, T, Y, U)',
        description: 'Reach left index up to R & T, right index up to Y & U.',
        focusKeys: ['r', 't', 'y', 'u'],
        words: ['try', 'rust', 'turn', 'true', 'yard', 'hurt', 'duty', 'just', 'fury', 'jury'],
        targetAccuracy: 90,
        minWpm: 18,
      },
      {
        id: 'en-2-2',
        language: 'english',
        level: 2,
        levelTitle: 'Level 2: Top Row Reach',
        title: 'Middle & Ring Reaches (E, I, W, O)',
        description: 'Reach middle fingers to E & I, ring fingers to W & O.',
        focusKeys: ['e', 'i', 'w', 'o'],
        words: ['we', 'work', 'word', 'wide', 'like', 'life', 'wire', 'more', 'time', 'flow', 'slow'],
        targetAccuracy: 90,
        minWpm: 18,
      },
      {
        id: 'en-2-3',
        language: 'english',
        level: 2,
        levelTitle: 'Level 2: Top Row Reach',
        title: 'Pinky Reaches (Q & P)',
        description: 'Reach left pinky to Q and right pinky to P.',
        focusKeys: ['q', 'p'],
        words: ['quit', 'quick', 'play', 'part', 'page', 'post', 'pure', 'quiz', 'pass', 'pipe'],
        targetAccuracy: 90,
        minWpm: 18,
      },
      {
        id: 'en-2-4',
        language: 'english',
        level: 2,
        levelTitle: 'Level 2: Top Row Reach',
        title: 'Top & Home Row Combination',
        description: 'Combine home row and top row keys smoothly.',
        focusKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        words: ['water', 'people', 'write', 'great', 'their', 'there', 'where', 'world', 'power', 'thought'],
        targetAccuracy: 92,
        minWpm: 22,
      },
    ],
  },

  // ==========================================
  // LEVEL 3: BOTTOM ROW REACH
  // ==========================================
  {
    level: 3,
    title: {
      lao: 'ຂັ້ນ 3: ແຖວລຸ່ມພາສາອັງກິດ (Bottom Row)',
      en: 'Level 3: Bottom Row Reach',
    },
    description: {
      lao: 'ຝຶກເອື້ອມນິ້ວລົງແຖວລຸ່ມ ZXCVBNM',
      en: 'Learn downward finger movement to the bottom row.',
    },
    lessons: [
      {
        id: 'en-3-1',
        language: 'english',
        level: 3,
        levelTitle: 'Level 3: Bottom Row Reach',
        title: 'Index Down Reaches (V, B, N, M)',
        description: 'Reach index fingers down to V, B, N, and M.',
        focusKeys: ['v', 'b', 'n', 'm'],
        words: ['man', 'name', 'burn', 'verb', 'move', 'many', 'view', 'brave', 'brain', 'never'],
        targetAccuracy: 90,
        minWpm: 18,
      },
      {
        id: 'en-3-2',
        language: 'english',
        level: 3,
        levelTitle: 'Level 3: Bottom Row Reach',
        title: 'Middle, Ring & Pinky (C, X, Z, ,, .)',
        description: 'Use middle, ring, and pinky fingers for C, X, Z, comma, and period.',
        focusKeys: ['c', 'x', 'z', ',', '.'],
        words: ['call', 'city', 'next', 'zero', 'zone', 'size', 'box', 'tax', 'cold', 'come'],
        targetAccuracy: 90,
        minWpm: 18,
      },
      {
        id: 'en-3-3',
        language: 'english',
        level: 3,
        levelTitle: 'Level 3: Bottom Row Reach',
        title: 'Three Rows Full Integration',
        description: 'Practice fluent words spanning all three letter rows.',
        focusKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        words: ['become', 'change', 'expect', 'family', 'modern', 'number', 'system', 'public', 'simple'],
        targetAccuracy: 92,
        minWpm: 22,
      },
    ],
  },

  // ==========================================
  // LEVEL 4: NUMBER ROW
  // ==========================================
  {
    level: 4,
    title: {
      lao: 'ຂັ້ນ 4: ແຖວຕົວເລກ (Number Row)',
      en: 'Level 4: Numbers & Top Row',
    },
    description: {
      lao: 'ຝຶກພິມຕົວເລກ 1-0 ໂດຍບໍ່ຕ້ອງກົ້ມເບິ່ງແປ້ນ',
      en: 'Learn number keys without looking down.',
    },
    lessons: [
      {
        id: 'en-4-1',
        language: 'english',
        level: 4,
        levelTitle: 'Level 4: Numbers & Top Row',
        title: 'Left Hand Numbers (1, 2, 3, 4, 5)',
        description: 'Reach up from left hand to numbers 1 through 5.',
        focusKeys: ['1', '2', '3', '4', '5'],
        words: ['1', '2', '3', '4', '5', '12', '34', '51', '123', '451', '321', '543'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'en-4-2',
        language: 'english',
        level: 4,
        levelTitle: 'Level 4: Numbers & Top Row',
        title: 'Right Hand Numbers (6, 7, 8, 9, 0)',
        description: 'Reach up from right hand to numbers 6 through 0.',
        focusKeys: ['6', '7', '8', '9', '0'],
        words: ['6', '7', '8', '9', '0', '67', '89', '90', '678', '906', '2026', '100', '500'],
        targetAccuracy: 90,
        minWpm: 15,
      },
    ],
  },

  // ==========================================
  // LEVEL 5: SHIFT & CAPITALIZATION
  // ==========================================
  {
    level: 5,
    title: {
      lao: 'ຂັ້ນ 5: ປຸ່ມ Shift ແລະ ຕົວພິມໃຫຍ່',
      en: 'Level 5: Shift & Capitalization',
    },
    description: {
      lao: 'ຝຶກກົດ Shift ມືກົງກັນຂ້າມເພື່ອພິມຕົວໃຫຍ່ ແລະ ເຄື່ອງໝາຍ',
      en: 'Master opposite-hand Shift keying for capital letters and punctuation.',
    },
    lessons: [
      {
        id: 'en-5-1',
        language: 'english',
        level: 5,
        levelTitle: 'Level 5: Shift & Capitalization',
        title: 'Capital Letters',
        description: 'Use right Shift for left hand letters, and left Shift for right hand letters.',
        focusKeys: [],
        words: ['London', 'Paris', 'Vientiane', 'Tokyo', 'Monday', 'Friday', 'English', 'LaoType'],
        targetAccuracy: 92,
        minWpm: 20,
      },
      {
        id: 'en-5-2',
        language: 'english',
        level: 5,
        levelTitle: 'Level 5: Shift & Capitalization',
        title: 'Punctuation & Symbols',
        description: 'Type question marks, exclamation points, quotes, and operators.',
        focusKeys: ['?', '!', '"', "'", '$', '%', '+', '='],
        words: ['Hello,', 'world!', 'Is', 'it', 'ready?', '"Yes!"', '$50', '100%', '1+1=2'],
        targetAccuracy: 92,
        minWpm: 20,
      },
    ],
  },

  // ==========================================
  // LEVEL 6: ADVANCED FLUENCY & SENTENCES
  // ==========================================
  {
    level: 6,
    title: {
      lao: 'ຂັ້ນ 6: ປະໂຫຍກ ແລະ ບົດຄວາມ',
      en: 'Level 6: Sentences & Mastery',
    },
    description: {
      lao: 'ຝຶກພິມປະໂຫຍກ ແລະ ຂໍ້ຄວາມເຕັມຮູບແບບເພື່ອວັດແທກ WPM ສູງສຸດ',
      en: 'Type complete natural sentences and paragraphs at high speed.',
    },
    lessons: [
      {
        id: 'en-6-1',
        language: 'english',
        level: 6,
        levelTitle: 'Level 6: Sentences & Mastery',
        title: 'Everyday Sentences',
        description: 'Type practical everyday sentences with correct capitalization and punctuation.',
        focusKeys: [],
        words: [
          'The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.',
          'Practice', 'makes', 'perfect', 'every', 'single', 'day.'
        ],
        targetAccuracy: 95,
        minWpm: 30,
      },
      {
        id: 'en-6-2',
        language: 'english',
        level: 6,
        levelTitle: 'Level 6: Sentences & Mastery',
        title: 'Paragraph Speed Mastery',
        description: 'Test your highest touch-typing endurance and speed on continuous text.',
        focusKeys: [],
        words: [
          'Touch', 'typing', 'allows', 'you', 'to', 'focus', 'on', 'your', 'ideas',
          'without', 'thinking', 'about', 'your', 'fingers.',
          'Speed', 'and', 'accuracy', 'come', 'naturally', 'with', 'consistency.'
        ],
        targetAccuracy: 96,
        minWpm: 35,
      },
    ],
  },
];
