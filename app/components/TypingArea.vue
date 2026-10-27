<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import type {
  TypingLanguage,
  WordHistory,
} from "../composables/useTypingEngine";
import { buildClusterView, type CharState } from "../utils/lao";

const props = withDefaults(
  defineProps<{
    words: string[];
    currentWordIndex: number;
    currentInput: string;
    wordHistory: WordHistory[];
    combo?: number;
    language?: TypingLanguage;
    activeWordView: {
      clusters: {
        text: string;
        state: CharState;
        doneText?: string;
        typedText?: string;
      }[];
      extra: string;
    };
  }>(),
  {
    combo: 0,
    language: "lao",
  },
);

const emit = defineEmits<{
  (e: "input", event: Event): void;
  (e: "compositionend", event: CompositionEvent): void;
  (e: "keydown", event: KeyboardEvent): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const wordsDisplayRef = ref<HTMLDivElement | null>(null);
const isFocused = ref(false);

function focusInput() {
  if (inputRef.value) {
    inputRef.value.focus();
    isFocused.value = true;
  }
}

function handleBlur() {
  isFocused.value = false;
}

// Sync input value directly to avoid IME issues
watch(
  () => props.currentInput,
  (v) => {
    if (inputRef.value && inputRef.value.value !== v) {
      inputRef.value.value = v;
    }
  },
);

// Auto scroll word container to follow active word
watch(
  () => props.currentWordIndex,
  () => {
    nextTick(() => {
      if (!wordsDisplayRef.value) return;
      const activeEl = wordsDisplayRef.value.querySelector(
        ".active-word",
      ) as HTMLElement | null;
      if (activeEl) {
        const containerTop = wordsDisplayRef.value.offsetTop;
        const activeTop = activeEl.offsetTop;
        if (activeTop - containerTop > 70) {
          wordsDisplayRef.value.scrollTop = activeTop - containerTop - 35;
        } else {
          wordsDisplayRef.value.scrollTop = 0;
        }
      }
    });
  },
);

function clusterClass(state: CharState) {
  switch (state) {
    case "correct":
      return "text-theme-correct";
    case "wrong":
      return "text-theme-muted"; // keep the correct glyph visible underneath the red overlay
    case "partial":
      return "text-theme-subtle"; // the typed part is drawn on top as an overlay
    default:
      return "text-theme-subtle";
  }
}

// Caret goes before the first untyped cluster (or at the very end)
const caretIndex = computed(() => {
  const { clusters, extra } = props.activeWordView;
  if (extra) return clusters.length;
  const i = clusters.findIndex((c) => c.state === "pending");
  return i === -1 ? clusters.length : i;
});

// View for words that were already submitted but typed incorrectly
function historyView(idx: number) {
  const h = props.wordHistory[idx];
  return h ? buildClusterView(h.target, h.typed) : null;
}

defineExpose({
  focusInput,
  isFocused,
  inputRef,
});
</script>

<template>
  <section
    class="relative bg-theme-card/90 border rounded-3xl p-6 sm:p-10 min-h-[240px] flex flex-col justify-center backdrop-blur-2xl shadow-2xl transition-all duration-300 outline-none cursor-text overflow-hidden"
    :class="
      isFocused
        ? 'border-theme-accent/40 shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_24px_var(--color-theme-accent-glow)]'
        : 'border-theme-border-subtle hover:border-theme-border/50'
    "
    @click="focusInput"
  >
    <!-- Hidden input for mobile & desktop keyboards -->
    <input
      ref="inputRef"
      type="text"
      :lang="language === 'english' ? 'en' : 'lo'"
      class="absolute opacity-0 pointer-events-none left-0 top-0"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      @input="emit('input', $event)"
      @compositionend="emit('compositionend', $event)"
      @keydown="emit('keydown', $event)"
      @focus="isFocused = true"
      @blur="handleBlur"
    />

    <!-- Dynamic Combo Streak Badge -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-75 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div
        v-if="combo && combo >= 5"
        class="absolute top-3 right-4 sm:top-5 sm:right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-surface/95 border border-theme-accent/50 shadow-lg shadow-theme-accent/15 backdrop-blur-md select-none pointer-events-none animate-bounce"
        style="animation-duration: 2s;"
      >
        <span class="text-xs">🔥</span>
        <span class="font-mono text-xs font-black tracking-wider text-theme-accent">
          {{ combo }}
        </span>
        <span class="font-mono text-[10px] uppercase font-bold text-theme-muted tracking-tight">
          Streak
        </span>
      </div>
    </Transition>

    <!-- Unfocused Prompt Overlay with Smooth Glassmorphic Aesthetics -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!isFocused"
        class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs rounded-3xl z-10 cursor-pointer select-none p-4"
        @click.stop="focusInput"
      >
        <div class="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-theme-surface/90 border border-theme-accent/40 shadow-xl shadow-black/40 text-theme-accent transition-transform hover:scale-105">
          <svg class="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10" />
          </svg>
          <span
            class="font-semibold text-sm sm:text-base tracking-wide"
            :class="language === 'english' ? 'font-mono' : 'font-nuanta'"
          >
            {{
              language === "english"
                ? "ກົດທີ່ນີ້ ຫຼື ກົດປຸ່ມໃດກໍໄດ້ເພື່ອເລີ່ມພິມ (Click to focus)"
                : "ກົດທີ່ນີ້ ຫຼື ກົດປຸ່ມໃດກໍໄດ້ເພື່ອເລີ່ມພິມ"
            }}
          </span>
        </div>
      </div>
    </Transition>

    <!-- Words Stream with Diacritic Clearance and High-Legibility Typography -->
    <div
      ref="wordsDisplayRef"
      :lang="language === 'english' ? 'en' : 'lo'"
      class="flex flex-wrap gap-x-4 gap-y-3 py-2 text-xl sm:text-2xl leading-[2.5] sm:leading-[2.6] select-none max-h-[220px] overflow-hidden"
      :class="
        language === 'english'
          ? 'font-mono font-medium tracking-normal'
          : 'font-nuanta font-medium tracking-wide'
      "
    >
      <span
        v-for="(word, wIdx) in words"
        :key="wIdx"
        class="relative inline-block transition-colors duration-150"
        :class="{
          'active-word text-theme-primary': wIdx === currentWordIndex,
          'text-theme-subtle opacity-60': wIdx > currentWordIndex,
        }"
      >
        <!-- Previously completed word -->
        <template v-if="wIdx < currentWordIndex">
          <span v-if="wordHistory[wIdx]?.isCorrect" class="text-theme-correct">
            {{ word }}
          </span>

          <!-- Incorrect word: colour per cluster so the user can see exactly what was wrong -->
          <template v-else-if="historyView(wIdx)">
            <span
              v-for="(c, ci) in historyView(wIdx)!.clusters"
              :key="ci"
              :class="
                c.state === 'correct'
                  ? 'text-theme-correct'
                  : 'text-theme-incorrect underline decoration-theme-incorrect/50 underline-offset-4'
              "
            >
              {{ c.text }}
            </span>
            <span v-if="historyView(wIdx)!.extra" class="text-theme-incorrect">
              {{ historyView(wIdx)!.extra }}
            </span>
          </template>

          <span v-else class="text-theme-incorrect underline decoration-theme-incorrect/50 underline-offset-4">{{ word }}</span>
        </template>

        <!-- Currently active word: one <span> per cluster (consonant + its vowel/tone marks) -->
        <template v-else-if="wIdx === currentWordIndex">
          <template v-for="(c, ci) in activeWordView.clusters" :key="ci">
            <!-- Zero-width wrapper so the caret never shifts the text -->
            <span
              v-if="isFocused && ci === caretIndex"
              class="relative inline-block w-0 h-0 leading-none align-baseline pointer-events-none"
            >
              <span
                class="absolute -left-[1.5px] top-[-0.95em] w-[3px] h-[1.25em] bg-theme-accent rounded-full caret-pulse shadow-[0_0_10px_var(--color-theme-accent)]"
              />
            </span>
            <span class="relative inline-block">
              <!-- Base layer: the whole cluster, drawn once so the font shapes it correctly -->
              <span :class="clusterClass(c.state)">{{ c.text }}</span>
              <!-- Overlay: only the part the user has typed so far (e.g. "ຮ" of "ຮ້") -->
              <span
                v-if="c.doneText && c.state !== 'correct'"
                class="absolute left-0 top-0 z-10 text-theme-correct pointer-events-none"
              >
                {{ c.doneText }}
              </span>
              <!-- Wrong key(s): draw what the user typed in translucent red ON TOP of the correct glyph -->
              <span
                v-if="c.state === 'wrong'"
                class="absolute left-0 top-0 text-theme-incorrect opacity-95 pointer-events-none font-bold"
              >
                {{ c.typedText }}
              </span>
            </span>
          </template>

          <!-- Characters typed beyond the end of the word -->
          <span v-if="activeWordView.extra" class="text-theme-incorrect font-bold bg-theme-incorrect/10 rounded px-0.5">
            {{ activeWordView.extra }}
          </span>

          <!-- Caret at the end of the word -->
          <span
            v-if="isFocused && caretIndex === activeWordView.clusters.length"
            class="relative inline-block w-0 h-0 leading-none align-baseline pointer-events-none"
          >
            <span
              class="absolute -left-[1.5px] top-[-0.95em] w-[3px] h-[1.25em] bg-theme-accent rounded-full caret-pulse shadow-[0_0_10px_var(--color-theme-accent)]"
            />
          </span>
        </template>

        <!-- Upcoming word (rendered as complete, natural text) -->
        <template v-else>
          <span>{{ word }}</span>
        </template>
      </span>
    </div>
  </section>
</template>
