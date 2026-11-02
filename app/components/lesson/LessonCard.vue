<script setup lang="ts">
import type { Lesson } from '../../types/lesson';

const props = defineProps<{
  lesson: Lesson;
  status: 'locked' | 'available' | 'completed';
  stars: number;        // 0–3
  bestWpm?: number;
  index: number;        // for stagger animation delay
}>();

const emit = defineEmits<{
  (e: 'click', lessonId: string): void;
}>();

function handleClick() {
  if (props.status !== 'locked') {
    emit('click', props.lesson.id);
  }
}
</script>

<template>
  <button
    type="button"
    class="lesson-card group relative w-full text-left rounded-2xl border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent"
    :class="{
      // Locked
      'bg-theme-surface/30 border-theme-border-subtle/30 cursor-not-allowed opacity-50 grayscale': status === 'locked',
      // Available
      'bg-theme-surface/70 border-theme-border/60 cursor-pointer hover:border-theme-accent hover:shadow-[0_0_20px_var(--color-theme-accent-glow)] hover:-translate-y-0.5 active:scale-[0.98]': status === 'available',
      // Completed
      'bg-theme-surface/80 border-theme-accent/50 cursor-pointer shadow-[0_0_12px_var(--color-theme-accent-glow)] hover:shadow-[0_0_24px_var(--color-theme-accent-glow)] hover:-translate-y-0.5 active:scale-[0.98]': status === 'completed',
    }"
    :style="{ animationDelay: `${index * 60}ms` }"
    :disabled="status === 'locked'"
    :aria-disabled="status === 'locked'"
    :aria-label="`${lesson.title}${status === 'locked' ? ' — ລ໊ອກ' : status === 'completed' ? ` — ສຳເລັດ ${stars} ດາວ` : ''}`"
    @click="handleClick"
  >
    <div class="p-4 flex flex-col gap-2">
      <!-- Top row: lesson number + stars or lock icon -->
      <div class="flex items-start justify-between gap-2">
        <!-- Lesson number badge -->
        <span
          class="text-xs font-bold font-mono px-2 py-0.5 rounded-full transition-colors duration-300"
          :class="{
            'bg-theme-subtle/20 text-theme-subtle': status === 'locked',
            'bg-theme-accent/15 text-theme-accent': status === 'available',
            'bg-theme-accent/25 text-theme-accent': status === 'completed',
          }"
        >
          {{ lesson.id.split('-').slice(-2).join('-') }}
        </span>

        <!-- Stars (completed) or Lock icon (locked) -->
        <div class="flex-shrink-0">
          <LessonStarRating v-if="status === 'completed'" :stars="stars" size="sm" />
          <svg
            v-else-if="status === 'locked'"
            class="w-4 h-4 text-theme-subtle/50"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 1a5 5 0 00-5 5v2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2h-2V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H9V6a3 3 0 013-3zm0 9a2 2 0 110 4 2 2 0 010-4z" />
          </svg>
        </div>
      </div>

      <!-- Lesson title -->
      <h3
        class="text-sm font-semibold font-lao leading-snug transition-colors duration-200"
        :class="{
          'text-theme-subtle': status === 'locked',
          'text-theme-primary group-hover:text-theme-accent': status === 'available',
          'text-theme-primary': status === 'completed',
        }"
      >
        {{ lesson.title }}
      </h3>

      <!-- Focus keys chips -->
      <div class="flex flex-wrap gap-1 mt-auto">
        <span
          v-for="key in lesson.focusKeys.slice(0, 5)"
          :key="key"
          class="font-lao font-bold text-[11px] px-1.5 py-0.5 rounded-md border transition-colors duration-300"
          :class="{
            'border-theme-subtle/20 text-theme-subtle bg-theme-subtle/10': status === 'locked',
            'border-theme-accent/30 text-theme-accent bg-theme-accent/10': status !== 'locked',
          }"
        >
          {{ key }}
        </span>
        <span
          v-if="lesson.focusKeys.length > 5"
          class="text-[11px] text-theme-muted px-1"
        >
          +{{ lesson.focusKeys.length - 5 }}
        </span>
      </div>

      <!-- Best WPM badge (completed only) -->
      <div
        v-if="status === 'completed' && bestWpm"
        class="mt-1 flex items-center gap-1 text-[11px] font-mono text-theme-muted"
      >
        <svg class="w-3 h-3 text-theme-accent/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        <span><strong class="text-theme-accent">{{ bestWpm }}</strong> WPM</span>
      </div>
    </div>

    <!-- Bottom accent line for completed -->
    <div
      v-if="status === 'completed'"
      class="absolute bottom-0 inset-x-0 h-0.5 rounded-b-2xl bg-theme-accent/60 transition-all duration-300 group-hover:opacity-100 opacity-70"
    />
  </button>
</template>
