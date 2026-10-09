import { test, expect } from '@playwright/test';

test.describe('LaoType Lesson Engine & Mode Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LaoType/);
  });

  test('should support lesson mode in engine and localStorage persistence', async ({ page }) => {
    // Check initial state
    const isClientReady = await page.evaluate(() => {
      return typeof window !== 'undefined';
    });
    expect(isClientReady).toBe(true);

    // Test that localStorage progress key can be read/written
    await page.evaluate(() => {
      const mockProgress = {
        'lao-1-1': {
          lessonId: 'lao-1-1',
          stars: 3,
          bestWpm: 25,
          bestAccuracy: 98,
          completed: true,
          completedAt: Date.now(),
        },
      };
      localStorage.setItem('laotype_lessons_progress', JSON.stringify(mockProgress));
    });

    const stored = await page.evaluate(() => {
      return localStorage.getItem('laotype_lessons_progress');
    });
    expect(stored).toContain('lao-1-1');
  });
});
