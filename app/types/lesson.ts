// app/types/lesson.ts
// Type definitions for the Touch-Typing Lesson curriculum & progress tracking.

import type { TypingLanguage } from '../composables/useTypingEngine';

export interface Lesson {
  id: string;                     // e.g., 'lao-1-1'
  language: TypingLanguage;       // 'lao' | 'english'
  level: number;                  // 1 to 6
  levelTitle: string;             // e.g., 'Level 1: แถวแป้นเหย้า (Home Row)'
  title: string;                  // e.g., 'ດ ແລະ ່ (F & J)'
  description: string;            // Touch-typing instruction
  focusKeys: string[];            // Keys taught in this lesson (e.g. ['ດ', '່'])
  words: string[];                // Sequence of practice words/tokens
  targetAccuracy?: number;        // Default 90%
  minWpm?: number;                // Default 10 WPM
}

export interface LessonLevel {
  level: number;
  title: {
    lao: string;
    en: string;
  };
  description: {
    lao: string;
    en: string;
  };
  lessons: Lesson[];
}

export interface LessonProgress {
  lessonId: string;
  stars: number;                  // 0 to 3 stars
  bestWpm: number;
  bestAccuracy: number;
  completed: boolean;
  completedAt?: number;           // Timestamp
}

export type AllLessonsProgress = Record<string, LessonProgress>;
