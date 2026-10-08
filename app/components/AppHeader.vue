<script setup lang="ts">
import type { TestMode } from "../composables/useTypingEngine";
import type { ThemeName, ThemeOption } from "../composables/useTheme";

defineProps<{
  currentTheme: ThemeName;
  themeOptions: ThemeOption[];
  wpm: number;
  accuracy: number;
  mode: TestMode;
  timeLeft: number;
  currentWordIndex: number;
  wordLimit: number;
}>();

const emit = defineEmits<{
  (e: "restart"): void;
  (e: "selectTheme", theme: ThemeName): void;
}>();
</script>

<template>
  <header
    class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
  >
    <!-- Logo Group -->
    <div
      class="flex items-center gap-3 cursor-pointer select-none group"
      @click="emit('restart')"
    >
      <div
        class="relative w-11 h-11 rounded-xl bg-theme-surface border border-theme-border/80 flex items-center justify-center shadow-lg transition-all group-hover:scale-105 group-hover:border-theme-accent group-hover:shadow-[0_0_16px_var(--color-theme-accent-glow)] overflow-hidden"
      >
        <!-- Tactile Keycap Dish -->
        <div class="absolute inset-1 rounded-lg bg-white/[0.05] border border-white/10" />
        <span class="relative font-bold font-lao text-2xl text-theme-accent">
          ລ
        </span>
        <span class="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-theme-accent/80" />
      </div>
      <div>
        <h1
          class="text-xl sm:text-2xl font-bold tracking-tight text-theme-primary"
        >
          LaoType
        </h1>
        <p class="text-xs font-lao text-theme-muted font-medium">
          ເວັບໄຊຝຶກພິມດີດພາສາລາວ
        </p>
      </div>
    </div>

    <!-- Right Header: Theme Switcher & Live Stats -->
    <div class="flex flex-wrap items-center gap-3 sm:gap-5">
      <!-- Theme Switcher Pills -->
      <div
        class="flex items-center gap-1.5 bg-theme-surface/70 border border-theme-border-subtle px-2.5 py-1.5 rounded-full backdrop-blur-md"
      >
        <button
          v-for="t in themeOptions"
          :key="t.id"
          type="button"
          class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none"
          :class="
            currentTheme === t.id
              ? 'bg-white/10 text-theme-primary font-bold shadow-xs'
              : 'text-theme-muted hover:text-theme-primary'
          "
          :title="t.name"
          @mousedown.prevent
          @click="emit('selectTheme', t.id)"
        >
          <span
            class="w-2.5 h-2.5 rounded-full pointer-events-none"
            :style="{ backgroundColor: t.dotColor }"
          />
          <span class="hidden md:inline pointer-events-none">{{ t.name }}</span>
        </button>
      </div>

      <!-- Sound Settings -->
      <SoundSettings />

      <!-- Live Stats Counters -->
      <div class="flex items-center gap-2">
        <div
          class="flex items-baseline gap-1 bg-theme-surface/70 border border-theme-border-subtle px-3 py-1.5 rounded-full font-mono backdrop-blur-md"
        >
          <span
            class="text-[10px] text-theme-muted uppercase font-bold tracking-wider"
            >WPM</span
          >
          <span class="text-base font-bold text-theme-accent">{{ wpm }}</span>
        </div>
        <div
          class="flex items-baseline gap-1 bg-theme-surface/70 border border-theme-border-subtle px-3 py-1.5 rounded-full font-mono backdrop-blur-md"
        >
          <span
            class="text-[10px] text-theme-muted uppercase font-bold tracking-wider"
            >ACC</span
          >
          <span class="text-base font-bold text-theme-accent"
            >{{ accuracy }}%</span
          >
        </div>
        <div
          v-if="mode === 'time'"
          class="flex items-baseline gap-1 bg-theme-surface/70 border border-theme-border-subtle px-3 py-1.5 rounded-full font-mono backdrop-blur-md"
        >
          <span
            class="text-[10px] text-theme-muted uppercase font-bold tracking-wider"
            >TIME</span
          >
          <span
            class="text-base font-bold"
            :class="timeLeft <= 5 ? 'text-red-400' : 'text-theme-accent'"
          >
            {{ timeLeft }}s
          </span>
        </div>
        <div
          v-else
          class="flex items-baseline gap-1 bg-theme-surface/70 border border-theme-border-subtle px-3 py-1.5 rounded-full font-mono backdrop-blur-md"
        >
          <span
            class="text-[10px] text-theme-muted uppercase font-bold tracking-wider"
            >WORD</span
          >
          <span class="text-base font-bold text-theme-accent">
            {{ currentWordIndex }}/{{ wordLimit }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>
