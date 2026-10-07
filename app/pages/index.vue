<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useTypingEngine } from "../composables/useTypingEngine";
import { useTheme } from "../composables/useTheme";

// SEO and Meta
useHead({
  title: "LaoType - ເວັບໄຊຝຶກພິມດີດພາສາລາວ (Lao Typing Test)",
  meta: [
    {
      name: "description",
      content:
        "ເວັບໄຊທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວອອນລາຍ ວັດຄວາມໄວ WPM ແລະ ຄວາມຖືກຕ້ອງ (Lao Typing Speed Test)",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&display=swap",
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.ico" },
  ],
});

const {
  mode,
  timeLimit,
  wordLimit,
  status,
  words,
  currentWordIndex,
  currentInput,
  wordHistory,
  timeLeft,
  elapsedSeconds,
  wpm,
  cpm,
  accuracy,
  totalKeystrokes,
  activeWordView,
  initTest,
  handleInput,
  handleCompositionEnd,
  handleKeydown,
  setMode,
  setTimeLimit,
  setWordLimit,
} = useTypingEngine();

const { currentTheme, setTheme, THEME_OPTIONS } = useTheme();

const typingAreaRef = ref<{
  focusInput: () => void;
  isFocused: boolean;
  inputRef: HTMLInputElement | null;
} | null>(null);

function focusInput() {
  typingAreaRef.value?.focusInput();
}

function restart() {
  initTest();
  nextTick(() => {
    focusInput();
  });
}

function handleGlobalKeydown(e: KeyboardEvent) {
  // Tab key to restart
  if (e.key === "Tab") {
    e.preventDefault();
    restart();
    return;
  }

  if (e.isComposing) return;

  // Auto focus input when user starts typing anywhere on the page
  const inputEl = typingAreaRef.value?.inputRef;
  if (status.value !== "finished" && document.activeElement !== inputEl) {
    if (
      (e.key.length === 1 || e.key === "Backspace") &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      focusInput();
      if (e.key === "Backspace") {
        handleKeydown(e);
      }
    }
  }
}

onMounted(() => {
  initTest();
  nextTick(() => {
    focusInput();
  });
  window.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
});

// Statistics computation for finished state
const correctWordsCount = computed(
  () => wordHistory.value.filter((w) => w.isCorrect).length,
);
const incorrectWordsCount = computed(
  () => wordHistory.value.filter((w) => !w.isCorrect).length,
);
</script>

<template>
  <div
    class="min-h-screen bg-theme-bg text-theme-primary font-sans transition-colors duration-300 flex flex-col justify-between p-4 sm:p-8 max-w-5xl mx-auto w-full"
  >
    <!-- Header -->
    <AppHeader
      :current-theme="currentTheme"
      :theme-options="THEME_OPTIONS"
      :wpm="wpm"
      :accuracy="accuracy"
      :mode="mode"
      :time-left="timeLeft"
      :current-word-index="currentWordIndex"
      :word-limit="wordLimit"
      @restart="restart"
      @select-theme="setTheme"
    />

    <!-- Main Content -->
    <main class="my-auto">
      <template v-if="status !== 'finished'">
        <!-- Controls Bar (Modes & Options) -->
        <TypingControls
          :mode="mode"
          :time-limit="timeLimit"
          :word-limit="wordLimit"
          @update:mode="setMode"
          @update:time-limit="setTimeLimit"
          @update:word-limit="setWordLimit"
        />

        <!-- Active Typing Area -->
        <TypingArea
          ref="typingAreaRef"
          :words="words"
          :current-word-index="currentWordIndex"
          :current-input="currentInput"
          :word-history="wordHistory"
          :active-word-view="activeWordView"
          @input="handleInput"
          @compositionend="handleCompositionEnd"
          @keydown="handleKeydown"
        />

        <!-- Action buttons -->
        <RestartButton @restart="restart" />
      </template>

      <!-- Results View -->
      <TypingResults
        v-else
        :wpm="wpm"
        :accuracy="accuracy"
        :cpm="cpm"
        :correct-words-count="correctWordsCount"
        :incorrect-words-count="incorrectWordsCount"
        :elapsed-seconds="elapsedSeconds"
        :total-keystrokes="totalKeystrokes"
        @restart="restart"
      />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
