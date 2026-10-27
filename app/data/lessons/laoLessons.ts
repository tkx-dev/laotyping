// app/data/lessons/laoLessons.ts
// Comprehensive Lao Touch-Typing Curriculum from Absolute Basic to Advanced.

import type { LessonLevel } from '../../types/lesson';

export const LAO_LESSON_LEVELS: LessonLevel[] = [
  // ==========================================
  // LEVEL 1: ແຖວຫຼັກ (HOME ROW)
  // ==========================================
  {
    level: 1,
    title: {
      lao: 'ຂັ້ນ 1: ແຖວຫຼັກ (Home Row)',
      en: 'Level 1: Home Row Basics',
    },
    description: {
      lao: 'ຝຶກວາງນິ້ວມືໃສ່ແປ້ນຫຼັກ ເລີ່ມຈາກຕຸ່ມນູນ ດ ແລະ ່ ໂດຍບໍ່ຕ້ອງແນມແປ້ນພິມ',
      en: 'Learn the home row resting keys starting from index homing bumps ດ and ່.',
    },
    lessons: [
      {
        id: 'lao-1-1',
        language: 'lao',
        level: 1,
        levelTitle: 'ຂັ້ນ 1: ແຖວຫຼັກ (Home Row)',
        title: 'ນິ້ວຊີ້ຊ້າຍ ແລະ ຂວາ (ດ, ່)',
        description: 'ວາງນິ້ວຊີ້ຊ້າຍໃສ່ປຸ່ມ ດ (F) ແລະ ນິ້ວຊີ້ຂວາໃສ່ປຸ່ມ ່ (J) ສັງເກດຕຸ່ມນູນເທິງແປ້ນ',
        focusKeys: ['ດ', '່'],
        words: ['ດ', '່', 'ດດ', '່່', 'ດ່', '່ດ', 'ດດ່', '່່ດ', 'ດ່ດ', '່ດ່', 'ດ', '່', 'ດ່', '່ດ'],
        targetAccuracy: 90,
        minWpm: 10,
      },
      {
        id: 'lao-1-2',
        language: 'lao',
        level: 1,
        levelTitle: 'ຂັ້ນ 1: ແຖວຫຼັກ (Home Row)',
        title: 'ນິ້ວກາງ ແລະ ນິ້ວນາງ (ກ, າ)',
        description: 'ໃຊ້ນິ້ວກາງຊ້າຍກົດ ກ (D) ແລະ ນິ້ວກາງຂວາກົດ າ (K)',
        focusKeys: ['ກ', 'າ', 'ດ', '່'],
        words: ['ກ', 'າ', 'ກກ', 'າາ', 'ກາ', 'ດາ', 'ກ່', 'ດກ', 'ກາດ', 'ດາກ', 'ກ່ກ', 'າດາ', 'ກາດາ'],
        targetAccuracy: 90,
        minWpm: 12,
      },
      {
        id: 'lao-1-3',
        language: 'lao',
        level: 1,
        levelTitle: 'ຂັ້ນ 1: ແຖວຫຼັກ (Home Row)',
        title: 'ນິ້ວນາງ ແລະ ນິ້ວກ້ອຍ (ຫ, ສ)',
        description: 'ໃຊ້ນິ້ວນາງຊ້າຍກົດ ຫ (S) ແລະ ນິ້ວນາງຂວາກົດ ສ (L)',
        focusKeys: ['ຫ', 'ສ'],
        words: ['ຫ', 'ສ', 'ຫຫ', 'ສສ', 'ຫາ', 'ສາ', 'ຫກ', 'ສດ', 'ຫາດ', 'ສາກ', 'ຫສ', 'ສຫ', 'ສາກາ'],
        targetAccuracy: 90,
        minWpm: 12,
      },
      {
        id: 'lao-1-4',
        language: 'lao',
        level: 1,
        levelTitle: 'ຂັ້ນ 1: ແຖວຫຼັກ (Home Row)',
        title: 'ແປ້ນແຄມແຖວ (ັ, ວ, ງ)',
        description: 'ໃຊ້ນິ້ວກ້ອຍຊ້າຍກົດ ັ (A) ແລະ ນິ້ວກ້ອຍຂວາກົດ ວ (;), ງ (\')',
        focusKeys: ['ັ', 'ວ', 'ງ'],
        words: ['ັ', 'ວ', 'ງ', 'ວາ', 'ງາ', 'ຫວັງ', 'ວາງ', 'ດັ່ງ', 'ສັງ', 'ວັດ', 'ດັງ', 'ກວາງ', 'ງວາດ'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-1-5',
        language: 'lao',
        level: 1,
        levelTitle: 'ຂັ້ນ 1: ແຖວຫຼັກ (Home Row)',
        title: 'ແປ້ນເອື້ອມກາງ (ເ, ້)',
        description: 'ເອື້ອມນິ້ວຊີ້ຊ້າຍກົດ ເ (G) ແລະ ເອື້ອມນິ້ວຊີ້ຂວາກົດ ້ (H) ແລ້ວດຶງນິ້ວກັບມາແປ້ນຫຼັກສະເໝີ',
        focusKeys: ['ເ', '້'],
        words: ['ເ', '້', 'ເກ', 'ເດ', 'ດ້', 'ກ້', 'ໄດ້', 'ເດ່', 'ເກົ້າ', 'ເຫດ', 'ເຂົ້າ', 'ເສັ້ນ', 'ເງົາ'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-1-6',
        language: 'lao',
        level: 1,
        levelTitle: 'ຂັ້ນ 1: ແຖວຫຼັກ (Home Row)',
        title: 'ລວມຄຳສັບແຖວຫຼັກ (Home Row Words)',
        description: 'ທົດສອບຄວາມຄ່ອງແຄ້ວດ້ວຍການພິມຄຳສັບແທ້ທີ່ປະກອບຈາກແຖວຫຼັກທັງໝົດ',
        focusKeys: ['ດ', '່', 'ກ', 'າ', 'ຫ', 'ສ', 'ັ', 'ວ', 'ງ', 'ເ', '້'],
        words: ['ກາ', 'ດາ', 'ຫາ', 'ສາ', 'ວາ', 'ງາ', 'ເກ', 'ເດ', 'ໄດ້', 'ຫວັງ', 'ວາງ', 'ດັ່ງ', 'ເຫດ', 'ກວ້າງ', 'ເສັ້ນ'],
        targetAccuracy: 92,
        minWpm: 18,
      },
    ],
  },

  // ==========================================
  // LEVEL 2: ແຖວເທິງ (TOP ROW)
  // ==========================================
  {
    level: 2,
    title: {
      lao: 'ຂັ້ນ 2: ແຖວເທິງ (Top Row)',
      en: 'Level 2: Top Row Reach',
    },
    description: {
      lao: 'ຝຶກເອື້ອມນິ້ວຂຶ້ນແຖວເທິງ ແລ້ວດຶງນິ້ວກັບມາພັກຢູ່ແຖວຫຼັກສະເໝີ',
      en: 'Master upward reaches to the top row while maintaining home row discipline.',
    },
    lessons: [
      {
        id: 'lao-2-1',
        language: 'lao',
        level: 2,
        levelTitle: 'ຂັ້ນ 2: ແຖວເທິງ (Top Row)',
        title: 'ນິ້ວຊີ້ເອື້ອມເທິງ (ພ, ະ, ິ, ີ)',
        description: 'ນິ້ວຊີ້ຊ້າຍກົດ ພ, ະ (R, T) ແລະ ນິ້ວຊີ້ຂວາກົດ ິ, ີ (Y, U)',
        focusKeys: ['ພ', 'ະ', 'ິ', 'ີ'],
        words: ['ພ', 'ະ', 'ິ', 'ີ', 'ພະ', 'ພິ', 'ດີ', 'ພີ', 'ພິກ', 'ດີດ', 'ພະດາ', 'ສີ', 'ກິດ', 'ພິມ', 'ພິສູດ'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-2-2',
        language: 'lao',
        level: 2,
        levelTitle: 'ຂັ້ນ 2: ແຖວເທິງ (Top Row)',
        title: 'ນິ້ວກາງ ແລະ ນິ້ວນາງເທິງ (ຳ, ຮ, ນ)',
        description: 'ນິ້ວກາງຊ້າຍກົດ ຳ (E), ນິ້ວກາງຂວາກົດ ຮ (I), ນິ້ວນາງຂວາກົດ ນ (O)',
        focusKeys: ['ຳ', 'ຮ', 'ນ'],
        words: ['ຳ', 'ຮ', 'ນ', 'ຮຳ', 'ນຳ', 'ຮຽນ', 'ຮັກ', 'ນາງ', 'ນອນ', 'ດຳ', 'ຮອດ', 'ນັກ', 'ນ້ຳ', 'ຮອດນີ້'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-2-3',
        language: 'lao',
        level: 2,
        levelTitle: 'ຂັ້ນ 2: ແຖວເທິງ (Top Row)',
        title: 'ນິ້ວກ້ອຍ ແລະ ປຸ່ມຂວາສູດ (ົ, ໄ, ຍ, ບ, ລ)',
        description: 'ນິ້ວກ້ອຍຊ້າຍ ົ, ໄ (Q, W) ແລະ ນິ້ວກ້ອຍຂວາ ຍ, ບ, ລ (P, [, ])',
        focusKeys: ['ົ', 'ໄ', 'ຍ', 'ບ', 'ລ'],
        words: ['ົ', 'ໄ', 'ຍ', 'ບ', 'ລ', 'ໄປ', 'ຍັງ', 'ບ້ານ', 'ລົດ', 'ໄວ', 'ຍາວ', 'ບອກ', 'ລົມ', 'ລູກ', 'ໃບ', 'ໄລ່'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-2-4',
        language: 'lao',
        level: 2,
        levelTitle: 'ຂັ້ນ 2: ແຖວເທິງ (Top Row)',
        title: 'ປະສົມແຖວຫຼັກ ແລະ ແຖວເທິງ',
        description: 'ຝຶກພິມຄຳສັບທີ່ຕ້ອງສະຫຼັບລະຫວ່າງແຖວຫຼັກ ແລະ ແຖວເທິງຢ່າງຄ່ອງແຄ້ວ',
        focusKeys: ['ພ', 'ະ', 'ິ', 'ີ', 'ຳ', 'ຮ', 'ນ', 'ົ', 'ໄ', 'ຍ', 'ບ', 'ລ'],
        words: ['ໄປ', 'ມາ', 'ຮຽນ', 'ດີ', 'ມີ', 'ນ້ຳ', 'ບ້ານ', 'ຮັກ', 'ໄວ', 'ລົມ', 'ນັກຮຽນ', 'ດີຫຼາຍ', 'ພິມໄວ', 'ໄປຮຽນ'],
        targetAccuracy: 92,
        minWpm: 18,
      },
    ],
  },

  // ==========================================
  // LEVEL 3: ແຖວລຸ່ມ (BOTTOM ROW)
  // ==========================================
  {
    level: 3,
    title: {
      lao: 'ຂັ້ນ 3: ແຖວລຸ່ມ (Bottom Row)',
      en: 'Level 3: Bottom Row Reach',
    },
    description: {
      lao: 'ຝຶກເອື້ອມນິ້ວລົງແຖວລຸ່ມເພື່ອພິມພະຍັນຊະນະ ແລະ ສະຫຼະດ້ານລຸ່ມ',
      en: 'Learn downward reaches to the bottom row with quick return.',
    },
    lessons: [
      {
        id: 'lao-3-1',
        language: 'lao',
        level: 3,
        levelTitle: 'ຂັ້ນ 3: ແຖວລຸ່ມ (Bottom Row)',
        title: 'ນິ້ວຊີ້ເອື້ອມລຸ່ມ (ອ, ຶ, ື, ທ)',
        description: 'ນິ້ວຊີ້ຊ້າຍ ອ, ຶ (V, B) ແລະ ນິ້ວຊີ້ຂວາ ື, ທ (N, M)',
        focusKeys: ['ອ', 'ຶ', 'ື', 'ທ'],
        words: ['ອ', 'ຶ', 'ື', 'ທ', 'ອື', 'ອຶ', 'ທຶນ', 'ມື', 'ອື່ນ', 'ທຸກ', 'ມື້', 'ທຳ', 'ຖືກ', 'ອ່ານ', 'ມື້ນີ້'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-3-2',
        language: 'lao',
        level: 3,
        levelTitle: 'ຂັ້ນ 3: ແຖວລຸ່ມ (Bottom Row)',
        title: 'ນິ້ວກາງ, ນາງ, ກ້ອຍລຸ່ມ (ແ, ປ, ຜ, ມ, ໃ, ຝ)',
        description: 'ນິ້ວກາງ-ນາງ-ກ້ອຍຊ້າຍ ແ, ປ, ຜ (C, X, Z) ແລະ ຂວາ ມ, ໃ, ຝ (,, ., /)',
        focusKeys: ['ແ', 'ປ', 'ຜ', 'ມ', 'ໃ', 'ຝ'],
        words: ['ແ', 'ປ', 'ຜ', 'ມ', 'ໃ', 'ຝ', 'ແມ່', 'ໄປ', 'ໃສ', 'ຜ່ານ', 'ຝົນ', 'ໃໝ່', 'ມີ', 'ແປ', 'ແກ້', 'ແຟນ'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-3-3',
        language: 'lao',
        level: 3,
        levelTitle: 'ຂັ້ນ 3: ແຖວລຸ່ມ (Bottom Row)',
        title: 'ປະສົມ 3 ແຖວຫຼັກ (Home + Top + Bottom)',
        description: 'ລວມການພິມທຸກແຖວຫຼັກເຂົ້າກັນເປັນຄຳສັບທົ່ວໄປໃນຊີວິດປະຈຳວັນ',
        focusKeys: ['ອ', 'ຶ', 'ື', 'ທ', 'ແ', 'ປ', 'ຜ', 'ມ', 'ໃ', 'ຝ'],
        words: ['ສະບາຍດີ', 'ຂອບໃຈ', 'ແມ່', 'ບ້ານ', 'ຮຽນ', 'ອ່ານ', 'ຂຽນ', 'ຄວາມດີ', 'ໃຈດີ', 'ມ່ວນຊື່ນ', 'ພັດທະນາ'],
        targetAccuracy: 92,
        minWpm: 20,
      },
    ],
  },

  // ==========================================
  // LEVEL 4: ແຖວຕົວເລກ (NUMBER ROW)
  // ==========================================
  {
    level: 4,
    title: {
      lao: 'ຂັ້ນ 4: ແຖວເທິງສຸດ (Number Row)',
      en: 'Level 4: Number Row & Upper Characters',
    },
    description: {
      lao: 'ຝຶກພິມພະຍັນຊະນະ ແລະ ສະຫຼະແຖວເທິງສຸດເຊັ່ນ ຢ, ຟ, ໂ, ຖ, ຸ, ູ, ຄ, ຕ, ຈ, ຂ, ຊ, ໍ',
      en: 'Master top-most number row characters crucial in the Lao layout.',
    },
    lessons: [
      {
        id: 'lao-4-1',
        language: 'lao',
        level: 4,
        levelTitle: 'ຂັ້ນ 4: ແຖວເທິງສຸດ (Number Row)',
        title: 'ແຖວເທິງສຸດຝັ່ງຊ້າຍ (ຢ, ຟ, ໂ, ຖ, ຸ)',
        description: 'ເອື້ອມມືຊ້າຍກົດ ຢ, ຟ, ໂ, ຖ, ຸ (1, 2, 3, 4, 5)',
        focusKeys: ['ຢ', 'ຟ', 'ໂ', 'ຖ', 'ຸ'],
        words: ['ຢ', 'ຟ', 'ໂ', 'ຖ', 'ຸ', 'ຢາກ', 'ຟ້າ', 'ໂຮງ', 'ຖາມ', 'ທຸກ', 'ຢືນ', 'ຟັງ', 'ໂລກ', 'ຖະໜົນ', 'ຢຸດ'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-4-2',
        language: 'lao',
        level: 4,
        levelTitle: 'ຂັ້ນ 4: ແຖວເທິງສຸດ (Number Row)',
        title: 'ແຖວເທິງສຸດຝັ່ງຂວາ (ູ, ຄ, ຕ, ຈ, ຂ, ຊ, ໍ)',
        description: 'ເອື້ອມມືຂວາກົດ ູ, ຄ, ຕ, ຈ, ຂ, ຊ, ໍ (6, 7, 8, 9, 0, -, =)',
        focusKeys: ['ູ', 'ຄ', 'ຕ', 'ຈ', 'ຂ', 'ຊ', 'ໍ'],
        words: ['ູ', 'ຄ', 'ຕ', 'ຈ', 'ຂ', 'ຊ', 'ໍ', 'ຄົນ', 'ຕາ', 'ຈິດ', 'ຂ້ອຍ', 'ຊື່', 'ບໍ່', 'ຄື', 'ຕົວ', 'ຈຸດ', 'ຂໍ'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-4-3',
        language: 'lao',
        level: 4,
        levelTitle: 'ຂັ້ນ 4: ແຖວເທິງສຸດ (Number Row)',
        title: 'ປະສົມຄຳສັບແຖວເທິງສຸດ',
        description: 'ຝຶກພິມຄຳສັບທີ່ໃຊ້ພະຍັນຊະນະ ແລະ ສະຫຼະແຖວເທິງສຸດຢ່າງຖືກຕ້ອງ',
        focusKeys: ['ຢ', 'ຟ', 'ໂ', 'ຖ', 'ຸ', 'ູ', 'ຄ', 'ຕ', 'ຈ', 'ຂ', 'ຊ', 'ໍ'],
        words: ['ຂ້ອຍ', 'ເຈົ້າ', 'ຄົນລາວ', 'ໂຮງຮຽນ', 'ຟັງ', 'ຢາກ', 'ຖາມ', 'ບໍ່ເປັນຫຍັງ', 'ຊອກຫາ', 'ຄິດຮອດ', 'ຕອບ'],
        targetAccuracy: 92,
        minWpm: 20,
      },
    ],
  },

  // ==========================================
  // LEVEL 5: ປຸ່ມ SHIFT & ຕົວອັກສອນພິເສດ
  // ==========================================
  {
    level: 5,
    title: {
      lao: 'ຂັ້ນ 5: ປຸ່ມ Shift & ຕົວອັກສອນພິເສດ',
      en: 'Level 5: Shift Keys & Special Glyphs',
    },
    description: {
      lao: 'ຝຶກໃຊ້ນິ້ວກ້ອຍກົດ Shift ກົງກັນຂ້າມ ເພື່ອພິມວັນນະຍຸດ, ອັກສອນປະສົມ ແລະ ເຄື່ອງໝາຍ',
      en: 'Master opposite-hand Shift technique for ligatures and tone marks.',
    },
    lessons: [
      {
        id: 'lao-5-1',
        language: 'lao',
        level: 5,
        levelTitle: 'ຂັ້ນ 5: ປຸ່ມ Shift & ຕົວອັກສອນພິເສດ',
        title: 'ວັນນະຍຸດ ແລະ ສະຫຼະຊ້ອນ (Shift)',
        description: 'ຝຶກພິມ ໊, ໋, ໍ່, ົ້, ິ້, ີ້, ຶ້, ື້ ໂດຍໃຊ້ Shift',
        focusKeys: ['໊', '໋', 'ໍ່', 'ົ້', 'ິ້', 'ີ້', 'ຶ້', 'ື້'],
        words: ['ໂຕະ໊', 'ປ໋ອງ', 'ບໍ່', 'ຕົ້ນ', 'ຫຼິ້ນ', 'ນີ້', 'ຂຶ້ນ', 'ຊື້', 'ມື້ນີ້', 'ນ້ຳດື່ມ', 'ໝາກກ້ຽງ', 'ຕັ້ງໃຈ'],
        targetAccuracy: 90,
        minWpm: 15,
      },
      {
        id: 'lao-5-2',
        language: 'lao',
        level: 5,
        levelTitle: 'ຂັ້ນ 5: ປຸ່ມ Shift & ຕົວອັກສອນພິເສດ',
        title: 'ອັກສອນປະສົມ (ໜ, ໝ, ຼ, ຫຼ, ຽ)',
        description: 'ຝຶກພິມອັກສອນປະສົມທີ່ພົບເລື້ອຍໃນພາສາລາວ',
        focusKeys: ['ໜ', 'ໝ', 'ຼ', 'ຫຼ', 'ຽ'],
        words: ['ໜ້າ', 'ໝາ', 'ຫຼາຍ', 'ຮຽນ', 'ໜໍ່ໄມ້', 'ໝາກໄມ້', 'ຫຼານ', 'ປ່ຽນ', 'ໜັງສື', 'ໝູ່ເພື່ອນ', 'ຫຼວງພະບາງ'],
        targetAccuracy: 92,
        minWpm: 18,
      },
      {
        id: 'lao-5-3',
        language: 'lao',
        level: 5,
        levelTitle: 'ຂັ້ນ 5: ປຸ່ມ Shift & ຕົວອັກສອນພິເສດ',
        title: 'ຕົວເລກ ແລະ ເຄື່ອງໝາຍພິເສດ',
        description: 'ຝຶກພິມຕົວເລກ, ເຄື່ອງໝາຍກີບ ₭, ?, !, %, +, =',
        focusKeys: ['₭', '?', '!', '%', '+', '='],
        words: ['1+1=2', '50,000₭', '100%', 'ແມ່ນບໍ່?', 'ດີຫຼາຍ!', 'ລາຄາ=10₭', '2026', 'ເບີ1', '100₭', '2+2=4'],
        targetAccuracy: 92,
        minWpm: 18,
      },
    ],
  },

  // ==========================================
  // LEVEL 6: ປະໂຫຍກ ແລະ ບົດຄວາມ (ADVANCED MASTERY)
  // ==========================================
  {
    level: 6,
    title: {
      lao: 'ຂັ້ນ 6: ປະໂຫຍກ ແລະ ບົດຄວາມຈິງ',
      en: 'Level 6: Sentences & Fluent Mastery',
    },
    description: {
      lao: 'ພິມປະໂຫຍກຍາວ ແລະ ບົດຄວາມຕໍ່ເນື່ອງເພື່ອວັດແທກຄວາມໄວ ແລະ ຄວາມຖືກຕ້ອງລະດັບສູງ',
      en: 'Complete real sentences and paragraphs for advanced touch-typing fluency.',
    },
    lessons: [
      {
        id: 'lao-6-1',
        language: 'lao',
        level: 6,
        levelTitle: 'ຂັ້ນ 6: ປະໂຫຍກ ແລະ ບົດຄວາມຈິງ',
        title: 'ຄຳຊ້ຳ ແລະ ສຳນວນພາສາລາວ (ໆ, ຯລຯ)',
        description: 'ຝຶກພິມໄມ້ຊ້ຳ ໆ ແລະ ສຳນວນຄຳເວົ້າທົ່ວໄປ',
        focusKeys: ['ໆ'],
        words: ['ໄວໆ', 'ດີໆ', 'ຫຼາຍໆ', 'ງາມໆ', 'ຊ້າໆ', 'ໄປມາໆ', 'ຮັກແພງ', 'ສາມັກຄີ', 'ພັດທະນາ', 'ຈະເລີນຮຸ່ງເຮືອງ'],
        targetAccuracy: 94,
        minWpm: 22,
      },
      {
        id: 'lao-6-2',
        language: 'lao',
        level: 6,
        levelTitle: 'ຂັ້ນ 6: ປະໂຫຍກ ແລະ ບົດຄວາມຈິງ',
        title: 'ປະໂຫຍກສັ້ນໃນຊີວິດປະຈຳວັນ',
        description: 'ຝຶກພິມປະໂຫຍກສື່ສານທີ່ໃຊ້ແທ້ໃນຊີວິດປະຈຳວັນ',
        focusKeys: [],
        words: ['ສະບາຍດີຕອນເຊົ້າ', 'ຂອບໃຈຫຼາຍໆເດີ', 'ມື້ນີ້ອາກາດດີຫຼາຍ', 'ຂ້ອຍມັກຮຽນພິມດີດ', 'ພາສາລາວງາມແທ້', 'ຍິນດີທີ່ໄດ້ຮູ້ຈັກ'],
        targetAccuracy: 95,
        minWpm: 25,
      },
      {
        id: 'lao-6-3',
        language: 'lao',
        level: 6,
        levelTitle: 'ຂັ້ນ 6: ປະໂຫຍກ ແລະ ບົດຄວາມຈິງ',
        title: 'ບົດຄວາມຍາວ ແລະ ຄວາມໄວສູງ',
        description: 'ທົດສອບຄວາມໄວສູງສຸດດ້ວຍຂໍ້ຄວາມຕໍ່ເນື່ອງລະດັບມືອາຊີບ',
        focusKeys: [],
        words: [
          'ການຝຶກພິມດີດພາສາລາວຢ່າງຖືກຕ້ອງ',
          'ຊ່ວຍເພີ່ມຄວາມໄວແລະຄວາມຖືກຕ້ອງ',
          'ເຮັດໃຫ້ການເຮັດວຽກມີປະສິດທິພາບສູງຂຶ້ນ',
          'ແລະຮັກສາສຸຂະພາບມືໃນໄລຍະຍາວ'
        ],
        targetAccuracy: 96,
        minWpm: 30,
      },
    ],
  },
];
