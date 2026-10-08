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
    class="relative bg-theme-card border rounded-2xl p-6 sm:p-10 min-h-[220px] flex flex-col justify-center backdrop-blur-2xl shadow-2xl transition-all outline-none cursor-text"
    :class="
      isFocused
        ? 'border-theme-border shadow-theme-accent/5'
        : 'border-theme-border-subtle'
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
        class="absolute top-3 right-4 sm:top-4 sm:right-6 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-theme-surface/90 border border-theme-accent/40 shadow-lg backdrop-blur-md select-none pointer-events-none"
      >
        <span class="animate-pulse text-xs">🔥</span>
        <span
          class="font-mono text-xs font-black tracking-wider text-theme-accent"
        >
          {{ combo }}
        </span>
        <span
          class="font-mono text-[10px] uppercase font-bold text-theme-muted tracking-tight"
        >
          Streak
        </span>
      </div>
    </Transition>

    <!-- Unfocused Prompt Overlay -->
    <div
      v-if="!isFocused"
      class="absolute inset-0 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs rounded-2xl z-10 cursor-pointer"
    >
      <span class="text-theme-accent font-semibold font-phetsarath text-lg">
        ກົດທີ່ນີ້ ຫຼື ກົດປຸ່ມໃດກໍໄດ້ເພື່ອເລີ່ມພິມ
      </span>
    </div>

    <!-- Words Stream -->
    <div
      ref="wordsDisplayRef"
      :lang="language === 'english' ? 'en' : 'lo'"
      class="flex flex-wrap gap-x-4 gap-y-2 py-1 text-xl sm:text-2xl leading-relaxed select-none max-h-[200px] overflow-hidden"
      :class="
        language === 'english'
          ? 'font-mono font-medium tracking-normal'
          : 'font-phetsarath font-semibold'
      "
    >
      <span
        v-for="(word, wIdx) in words"
        :key="wIdx"
        class="relative inline-block transition-colors rounded-xs"
        :class="{
          'active-word': wIdx === currentWordIndex,
          'text-theme-subtle': wIdx > currentWordIndex,
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
                  : 'text-theme-incorrect'
              "
            >
              {{ c.text }}
            </span>
            <span v-if="historyView(wIdx)!.extra" class="text-theme-incorrect">
              {{ historyView(wIdx)!.extra }}
            </span>
          </template>

          <span v-else class="text-theme-incorrect">{{ word }}</span>
        </template>

        <!-- Currently active word: one <span> per cluster (consonant + its vowel/tone marks) -->
        <template v-else-if="wIdx === currentWordIndex">
          <template v-for="(c, ci) in activeWordView.clusters" :key="ci">
            <!-- Zero-width wrapper so the caret never shifts the text -->
            <span
              v-if="isFocused && ci === caretIndex"
              class="relative inline-block w-0 align-baseline pointer-events-none"
            >
              <span
                class="absolute -left-[1px] top-[-0.9em] w-[2.5px] h-[1.15em] bg-theme-accent rounded-full caret-pulse shadow-[0_0_8px_var(--color-theme-accent)]"
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
                class="absolute left-0 top-0 text-theme-incorrect opacity-90 pointer-events-none"
              >
                {{ c.typedText }}
              </span>
            </span>
          </template>

          <!-- Characters typed beyond the end of the word -->
          <span v-if="activeWordView.extra" class="text-theme-incorrect">
            {{ activeWordView.extra }}
          </span>

          <!-- Caret at the end of the word -->
          <span
            v-if="isFocused && caretIndex === activeWordView.clusters.length"
            class="relative inline-block w-0 align-baseline pointer-events-none"
          >
            <span
              class="absolute -left-[1px] top-[-0.9em] w-[2.5px] h-[1.15em] bg-theme-accent rounded-full caret-pulse shadow-[0_0_8px_var(--color-theme-accent)]"
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
