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
    class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-theme-surface/80 border border-theme-border-subtle backdrop-blur-xl px-3 sm:px-4 py-1.5 rounded-2xl sm:rounded-full w-fit mx-auto mb-8 shadow-xl transition-all"
    aria-label="Typing options"
  >
    <!-- Language selector -->
    <div class="flex items-center gap-1">
      <button
        type="button"
        class="flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer font-lao select-none"
        :class="
          language === 'lao'
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        title="ຝຶກພິມພາສາລາວ"
        @mousedown.prevent
        @click="emit('update:language', 'lao')"
      >
        <span class="text-xs pointer-events-none">🇱🇦</span>
        <span class="pointer-events-none">ລາວ</span>
      </button>

      <button
        type="button"
        class="flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer font-lao select-none"
        :class="
          language === 'english'
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        title="ຝຶກພິມພາສາອັງກິດ"
        @mousedown.prevent
        @click="emit('update:language', 'english')"
      >
        <span class="text-xs pointer-events-none">🇬🇧</span>
        <span class="pointer-events-none">ອັງກິດ</span>
      </button>
    </div>

    <div class="w-px h-4 bg-white/10" />

    <!-- Punctuation & Special Characters Toggle -->
    <div class="flex items-center gap-1">
      <button
        type="button"
        class="flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer font-lao select-none"
        :class="
          hasPunctuation
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md ring-1 ring-theme-accent/50'
            : 'text-theme-muted hover:text-theme-primary hover:bg-white/5'
        "
        title="ເປີດ/ປິດ ເຄື່ອງໝາຍພິເສດ (, . + ? ! ຯລຯ)"
        @mousedown.prevent
        @click="emit('update:hasPunctuation', !hasPunctuation)"
      >
        <span class="text-xs font-mono font-black">,&.+</span>
        <span class="pointer-events-none">ເຄື່ອງໝາຍ</span>
      </button>
    </div>

    <div class="w-px h-4 bg-white/10" />

    <!-- Mode selector -->
    <div class="flex items-center gap-1 font-lao">
      <button
        type="button"
        class="px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer select-none"
        :class="
          mode === 'time'
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        title="ໂໝດຈັບເວລາ"
        @mousedown.prevent
        @click="emit('update:mode', 'time')"
      >
        <span class="pointer-events-none">ເວລາ (Time)</span>
      </button>
      <button
        type="button"
        class="px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer select-none"
        :class="
          mode === 'words'
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        title="ໂໝດຈຳນວນຄຳສັບ"
        @mousedown.prevent
        @click="emit('update:mode', 'words')"
      >
        <span class="pointer-events-none">ຄຳສັບ (Words)</span>
      </button>
    </div>

    <div class="w-px h-4 bg-white/10" />

    <!-- Sub options: Time limits or Word count -->
    <div v-if="mode === 'time'" class="flex items-center gap-1">
      <button
        v-for="t in [15, 30, 60] as TimeOption[]"
        :key="t"
        type="button"
        class="px-2.5 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer select-none"
        :class="
          timeLimit === t
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        @mousedown.prevent
        @click="emit('update:timeLimit', t)"
      >
        <span class="pointer-events-none">{{ t }}s</span>
      </button>
    </div>

    <div v-else class="flex items-center gap-1">
      <button
        v-for="w in [10, 25, 50] as WordOption[]"
        :key="w"
        type="button"
        class="px-2.5 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer select-none"
        :class="
          wordLimit === w
            ? 'bg-theme-accent text-stone-900 font-bold shadow-md'
            : 'text-theme-muted hover:text-theme-primary'
        "
        @mousedown.prevent
        @click="emit('update:wordLimit', w)"
      >
        <span class="pointer-events-none">{{ w }}</span>
      </button>
    </div>
  </section>
</template>
