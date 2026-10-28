<script setup lang="ts">
import type { LessonLevel } from '../../types/lesson';

const props = defineProps<{
  level: LessonLevel;
  completedCount: number;
  totalStars: number;
  maxStars: number;
  language: 'lao' | 'english';
  isUnlocked: boolean;
}>();

const emit = defineEmits<{
  (e: 'lessonClick', lessonId: string): void;
}>();

const { getLessonStars, getLessonProgress, isLessonUnlocked } = useLessonProgress();

const totalCount = computed(() => props.level.lessons.length);
const isFullyCompleted = computed(() => props.completedCount === totalCount.value);

const levelTitle = computed(() =>
  props.language === 'lao' ? props.level.title.lao : props.level.title.en
);
const levelDesc = computed(() =>
  props.language === 'lao' ? props.level.description.lao : props.level.description.en
);

function getLessonStatus(lessonId: string, idx: number): 'locked' | 'available' | 'completed' {
  const prog = getLessonProgress(lessonId);
  if (prog?.completed) return 'completed';
  if (isLessonUnlocked(lessonId, props.language as any)) return 'available';
  return 'locked';
}
</script>

<template>
  <section class="level-card" :aria-label="levelTitle">
    <!-- Level Header -->
    <div
      class="flex items-center gap-4 mb-4 p-4 rounded-2xl border transition-colors duration-300"
      :class="
        isUnlocked
          ? 'bg-theme-surface/60 border-theme-border/50 backdrop-blur-md'
          : 'bg-theme-surface/20 border-theme-border-subtle/30 opacity-60'
      "
    >
      <!-- Level Badge -->
      <div
        class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono transition-all duration-300"
        :class="
          isFullyCompleted
            ? 'bg-theme-accent text-theme-bg shadow-[0_0_16px_var(--color-theme-accent-glow)]'
            : isUnlocked
            ? 'bg-theme-accent/15 text-theme-accent border border-theme-accent/30'
            : 'bg-theme-subtle/10 text-theme-subtle border border-theme-subtle/20'
        "
      >
        <span v-if="isFullyCompleted" aria-hidden="true">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </span>
        <span v-else>{{ level.level }}</span>
      </div>

      <!-- Title + progress info -->
      <div class="flex-1 min-w-0">
        <h2 class="text-base font-bold font-lao text-theme-primary leading-tight truncate">
          {{ levelTitle }}
        </h2>
        <p class="text-xs text-theme-muted font-lao mt-0.5 line-clamp-1">
          {{ levelDesc }}
        </p>

        <!-- Progress row -->
        <div class="flex items-center gap-3 mt-2">
          <LessonProgressBar
            :current="completedCount"
            :total="totalCount"
            class="flex-1"
          />
          <span class="text-xs font-mono text-theme-muted whitespace-nowrap">
            {{ completedCount }}/{{ totalCount }}
          </span>
          <LessonStarRating :stars="Math.floor(totalStars / Math.max(totalCount, 1))" size="sm" />
        </div>
      </div>

      <!-- Total stars badge -->
      <div class="flex-shrink-0 text-right hidden sm:block">
        <div class="text-xs text-theme-muted font-mono">ດາວ</div>
        <div class="text-lg font-bold text-theme-accent font-mono leading-none">
          {{ totalStars }}<span class="text-theme-subtle text-sm">/{{ maxStars }}</span>
        </div>
      </div>
    </div>

    <!-- Lessons Grid -->
    <div
      v-if="isUnlocked"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      <LessonCard
        v-for="(lesson, idx) in level.lessons"
        :key="lesson.id"
        :lesson="lesson"
        :status="getLessonStatus(lesson.id, idx)"
        :stars="getLessonStars(lesson.id)"
        :best-wpm="getLessonProgress(lesson.id)?.bestWpm"
        :index="idx"
        class="lesson-card-enter"
        @click="emit('lessonClick', $event)"
      />
    </div>

    <!-- Locked Level Placeholder -->
    <div
      v-else
      class="flex items-center justify-center gap-3 py-8 rounded-2xl border border-dashed border-theme-subtle/20 text-theme-subtle"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1a5 5 0 00-5 5v2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2h-2V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H9V6a3 3 0 013-3z" />
      </svg>
      <span class="text-sm font-lao">ຕ້ອງຜ່ານຂັ້ນກ່ອນໜ້ານີ້ກ່ອນ</span>
    </div>
  </section>
</template>
