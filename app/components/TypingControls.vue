<script setup lang="ts">
import type {
  TestMode,
  TimeOption,
  WordOption,
} from "../composables/useTypingEngine";

defineProps<{
  mode: TestMode;
  timeLimit: TimeOption;
  wordLimit: WordOption;
}>();

const emit = defineEmits<{
  (e: "update:mode", mode: TestMode): void;
  (e: "update:timeLimit", limit: TimeOption): void;
  (e: "update:wordLimit", limit: WordOption): void;
}>();
</script>

<template>
  <section
    class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-theme-surface/80 border border-theme-border-subtle backdrop-blur-xl px-4 py-1.5 rounded-full w-fit mx-auto mb-8 shadow-xl"
    aria-label="Typing options"
  >
    <!-- Mode selector -->
    <div class="flex items-center gap-1">
      <button
        class="px-3 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer"
        :class="
          mode === 'time'
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        @click="emit('update:mode', 'time')"
      >
        ເວລາ (Time)
      </button>
      <button
        class="px-3 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer"
        :class="
          mode === 'words'
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        @click="emit('update:mode', 'words')"
      >
        ຄຳສັບ (Words)
      </button>
    </div>

    <div class="w-px h-4 bg-white/10" />

    <!-- Sub options -->
    <div v-if="mode === 'time'" class="flex items-center gap-1">
      <button
        v-for="t in [15, 30, 60] as TimeOption[]"
        :key="t"
        class="px-2.5 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer"
        :class="
          timeLimit === t
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        @click="emit('update:timeLimit', t)"
      >
        {{ t }}s
      </button>
    </div>

    <div v-else class="flex items-center gap-1">
      <button
        v-for="w in [10, 25, 50] as WordOption[]"
        :key="w"
        class="px-2.5 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer"
        :class="
          wordLimit === w
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        @click="emit('update:wordLimit', w)"
      >
        {{ w }}
      </button>
    </div>
  </section>
</template>
