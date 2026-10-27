<script setup lang="ts">
import type {
  TypingLanguage,
  TestMode,
  TimeOption,
  WordOption,
} from "../composables/useTypingEngine";

defineProps<{
  language: TypingLanguage;
  hasPunctuation: boolean;
  mode: TestMode;
  timeLimit: TimeOption;
  wordLimit: WordOption;
}>();

const emit = defineEmits<{
  (e: "update:language", language: TypingLanguage): void;
  (e: "update:hasPunctuation", value: boolean): void;
  (e: "update:mode", mode: TestMode): void;
  (e: "update:timeLimit", limit: TimeOption): void;
  (e: "update:wordLimit", limit: WordOption): void;
}>();
</script>

<template>
  <section
    class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-theme-surface/85 border border-theme-border/40 backdrop-blur-2xl p-1.5 rounded-2xl sm:rounded-full w-fit mx-auto mb-6 shadow-xl shadow-black/20 transition-all select-none"
    aria-label="Typing test configuration controls"
  >
    <!-- Group 1: Language Selector (Lao / English) -->
    <div class="flex items-center gap-1 bg-black/20 p-1 rounded-xl sm:rounded-full border border-white/[0.04]">
      <button
        type="button"
        class="group relative flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full transition-all duration-200 cursor-pointer font-lao"
        :class="
          language === 'lao'
            ? 'bg-theme-accent text-stone-950 font-bold shadow-md shadow-theme-accent/25'
            : 'text-theme-muted hover:text-theme-primary hover:bg-white/[0.06]'
        "
        title="ຝຶກພິມພາສາລາວ (Lao Typing)"
        @mousedown.prevent
        @click="emit('update:language', 'lao')"
      >
        <span class="text-xs transition-transform group-hover:scale-110 pointer-events-none">🇱🇦</span>
        <span class="pointer-events-none">ລາວ</span>
      </button>

      <button
        type="button"
        class="group relative flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full transition-all duration-200 cursor-pointer font-lao"
        :class="
          language === 'english'
            ? 'bg-theme-accent text-stone-950 font-bold shadow-md shadow-theme-accent/25'
            : 'text-theme-muted hover:text-theme-primary hover:bg-white/[0.06]'
        "
        title="ຝຶກພິມພາສາອັງກິດ (English Typing)"
        @mousedown.prevent
        @click="emit('update:language', 'english')"
      >
        <span class="text-xs transition-transform group-hover:scale-110 pointer-events-none">🇬🇧</span>
        <span class="pointer-events-none">ອັງກິດ</span>
      </button>
    </div>

    <!-- Divider -->
    <div class="hidden sm:block w-px h-5 bg-white/10 mx-0.5" />

    <!-- Group 2: Punctuation Toggle -->
    <div class="flex items-center bg-black/20 p-1 rounded-xl sm:rounded-full border border-white/[0.04]">
      <button
        type="button"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full transition-all duration-200 cursor-pointer font-lao"
        :class="
          hasPunctuation
            ? 'bg-theme-accent text-stone-950 font-bold shadow-md shadow-theme-accent/25'
            : 'text-theme-muted hover:text-theme-primary hover:bg-white/[0.06]'
        "
        title="ເປີດ/ປິດ ເຄື່ອງໝາຍພິເສດ (, . + ? ! ຯລຯ)"
        @mousedown.prevent
        @click="emit('update:hasPunctuation', !hasPunctuation)"
      >
        <span class="text-xs font-mono font-black tracking-tighter">@#?</span>
        <span class="pointer-events-none">ເຄື່ອງໝາຍ</span>
      </button>
    </div>

    <!-- Divider -->
    <div class="hidden sm:block w-px h-5 bg-white/10 mx-0.5" />

    <!-- Group 3: Test Mode (Time vs Words) -->
    <div class="flex items-center gap-1 bg-black/20 p-1 rounded-xl sm:rounded-full border border-white/[0.04] font-lao">
      <button
        type="button"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full transition-all duration-200 cursor-pointer"
        :class="
          mode === 'time'
            ? 'bg-theme-accent text-stone-950 font-bold shadow-md shadow-theme-accent/25'
            : 'text-theme-muted hover:text-theme-primary hover:bg-white/[0.06]'
        "
        title="ໂໝດຈັບເວລາ (Time Mode)"
        @mousedown.prevent
        @click="emit('update:mode', 'time')"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span class="pointer-events-none">ເວລາ</span>
      </button>

      <button
        type="button"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full transition-all duration-200 cursor-pointer"
        :class="
          mode === 'words'
            ? 'bg-theme-accent text-stone-950 font-bold shadow-md shadow-theme-accent/25'
            : 'text-theme-muted hover:text-theme-primary hover:bg-white/[0.06]'
        "
        title="ໂໝດຈຳນວນຄຳສັບ (Words Mode)"
        @mousedown.prevent
        @click="emit('update:mode', 'words')"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M4 7V4h16v3" />
          <path d="M9 20h6" />
          <path d="M12 4v16" />
        </svg>
        <span class="pointer-events-none">ຄຳສັບ</span>
      </button>
    </div>

    <!-- Divider -->
    <div class="hidden sm:block w-px h-5 bg-white/10 mx-0.5" />

    <!-- Group 4: Target Thresholds (15s/30s/60s or 10/25/50 words) -->
    <div class="flex items-center gap-1 bg-black/20 p-1 rounded-xl sm:rounded-full border border-white/[0.04]">
      <template v-if="mode === 'time'">
        <button
          v-for="t in [15, 30, 60] as TimeOption[]"
          :key="t"
          type="button"
          class="px-2.5 py-1 text-xs sm:text-sm font-bold font-mono rounded-lg sm:rounded-full transition-all duration-200 cursor-pointer"
          :class="
            timeLimit === t
              ? 'bg-theme-accent text-stone-950 shadow-md shadow-theme-accent/25'
              : 'text-theme-muted hover:text-theme-primary hover:bg-white/[0.06]'
          "
          @mousedown.prevent
          @click="emit('update:timeLimit', t)"
        >
          <span class="pointer-events-none">{{ t }}s</span>
        </button>
      </template>

      <template v-else>
        <button
          v-for="w in [10, 25, 50] as WordOption[]"
          :key="w"
          type="button"
          class="px-2.5 py-1 text-xs sm:text-sm font-bold font-mono rounded-lg sm:rounded-full transition-all duration-200 cursor-pointer"
          :class="
            wordLimit === w
              ? 'bg-theme-accent text-stone-950 shadow-md shadow-theme-accent/25'
              : 'text-theme-muted hover:text-theme-primary hover:bg-white/[0.06]'
          "
          @mousedown.prevent
          @click="emit('update:wordLimit', w)"
        >
          <span class="pointer-events-none">{{ w }}</span>
        </button>
      </template>
    </div>
  </section>
</template>
