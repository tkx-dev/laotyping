// app/data/lessons/index.ts
// Entry point and lookup helpers for typing lessons.

import type { Lesson, LessonLevel } from '../../types/lesson';
import type { TypingLanguage } from '../../composables/useTypingEngine';
import { LAO_LESSON_LEVELS } from './laoLessons';
import { ENGLISH_LESSON_LEVELS } from './englishLessons';

export { LAO_LESSON_LEVELS } from './laoLessons';
export { ENGLISH_LESSON_LEVELS } from './englishLessons';

/**
 * Get all lesson levels for a given language.
 */
export function getLessonLevels(language: TypingLanguage): LessonLevel[] {
  return language === 'english' ? ENGLISH_LESSON_LEVELS : LAO_LESSON_LEVELS;
}

/**
 * Get a flat list of all lessons for a language.
 */
export function getAllLessons(language: TypingLanguage): Lesson[] {
  const levels = getLessonLevels(language);
  return levels.flatMap((lvl) => lvl.lessons);
}

/**
 * Find a specific lesson by ID across all languages.
 */
export function findLessonById(lessonId: string): Lesson | undefined {
  const allLao = getAllLessons('lao');
  const allEn = getAllLessons('english');
  return allLao.find((l) => l.id === lessonId) || allEn.find((l) => l.id === lessonId);
}

/**
 * Find the next lesson in sequence following currentId.
 */
export function getNextLesson(currentId: string): Lesson | undefined {
  const current = findLessonById(currentId);
  if (!current) return undefined;

  const lessons = getAllLessons(current.language);
  const currentIndex = lessons.findIndex((l) => l.id === currentId);
  if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
    return lessons[currentIndex + 1];
  }

  return undefined;
}
