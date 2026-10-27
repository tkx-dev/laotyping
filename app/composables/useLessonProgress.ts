// app/composables/useLessonProgress.ts
// Handles persistence and calculations for lesson completion, star ratings, and unlock states.

import { ref } from 'vue';
import type { AllLessonsProgress, Lesson, LessonProgress } from '../types/lesson';
import type { TypingLanguage } from './useTypingEngine';
import { getAllLessons } from '../data/lessons';

const STORAGE_KEY = 'laotype_lessons_progress';

export function useLessonProgress() {
  const progress = ref<AllLessonsProgress>({});

  // Initialize from localStorage on client side
  if (import.meta.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        progress.value = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load lesson progress:', e);
    }
  }

  function saveProgress() {
    if (!import.meta.client) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value));
    } catch (e) {
      console.error('Failed to save lesson progress:', e);
    }
  }

  function getLessonProgress(lessonId: string): LessonProgress | undefined {
    return progress.value[lessonId];
  }

  function isLessonCompleted(lessonId: string): boolean {
    return Boolean(progress.value[lessonId]?.completed);
  }

  function getLessonStars(lessonId: string): number {
    return progress.value[lessonId]?.stars ?? 0;
  }

  /**
   * Determine if a lesson is unlocked.
   * Rule: The very first lesson of each language is always unlocked.
   * Subsequent lessons are unlocked if the preceding lesson has been completed (>= 1 star).
   */
  function isLessonUnlocked(lessonId: string, language: TypingLanguage): boolean {
    const lessons = getAllLessons(language);
    const index = lessons.findIndex((l) => l.id === lessonId);
    if (index === 0) return true; // First lesson is always unlocked
    if (index === -1) return false; // Lesson not found

    const prevLesson = lessons[index - 1];
    if (!prevLesson) return false;

    return isLessonCompleted(prevLesson.id);
  }

  /**
   * Calculate 1-3 stars based on target accuracy and min WPM:
   * - 1 Star: Meets base criteria (e.g. Accuracy >= 90% and WPM >= minWpm)
   * - 2 Stars: High mastery (Accuracy >= 95% and WPM >= minWpm + 5)
   * - 3 Stars: Flawless (Accuracy >= 98% and WPM >= minWpm + 10)
   */
  function calculateStars(lesson: Lesson, wpm: number, accuracy: number): number {
    const targetAcc = lesson.targetAccuracy ?? 90;
    const minWpm = lesson.minWpm ?? 10;

    if (accuracy < targetAcc || wpm < minWpm) {
      return 0; // Failed
    }

    if (accuracy >= 98 && wpm >= minWpm + 10) {
      return 3;
    }
    if (accuracy >= 95 && wpm >= minWpm + 5) {
      return 2;
    }
    return 1;
  }

  /**
   * Record lesson test result.
   */
  function recordResult(lesson: Lesson, wpm: number, accuracy: number) {
    const stars = calculateStars(lesson, wpm, accuracy);
    const existing = progress.value[lesson.id];

    const currentBestStars = existing?.stars ?? 0;
    const currentBestWpm = existing?.bestWpm ?? 0;
    const currentBestAcc = existing?.bestAccuracy ?? 0;

    const newStars = Math.max(currentBestStars, stars);
    const newBestWpm = Math.max(currentBestWpm, wpm);
    const newBestAcc = Math.max(currentBestAcc, accuracy);
    const isCompleted = newStars > 0;

    progress.value[lesson.id] = {
      lessonId: lesson.id,
      stars: newStars,
      bestWpm: newBestWpm,
      bestAccuracy: newBestAcc,
      completed: isCompleted,
      completedAt: Date.now(),
    };

    saveProgress();

    return {
      stars,
      earnedStars: newStars,
      isCompleted,
    };
  }

  return {
    progress,
    getLessonProgress,
    isLessonCompleted,
    getLessonStars,
    isLessonUnlocked,
    calculateStars,
    recordResult,
  };
}
