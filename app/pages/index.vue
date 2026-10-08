<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useTypingEngine } from "../composables/useTypingEngine";
import { useTheme } from "../composables/useTheme";

// SEO and Meta (System UI is in Lao)
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
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.ico" }],
});

const {
  language,
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
  combo,
  maxCombo,
  activeWordView,
  nextExpectedCharInfo,
  initTest,
  handleInput,
  handleCompositionEnd,
  handleKeydown,
  setLanguage,
  setMode,
  setTimeLimit,
  setWordLimit,
} = useTypingEngine();

const { currentTheme, setTheme, THEME_OPTIONS } = useTheme();

const showRestartConfirm = ref(false);

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

function requestRestart() {
  if (status.value === "finished") {
    restart();
  } else {
    showRestartConfirm.value = true;
  }
}

function handleConfirmRestart() {
  showRestartConfirm.value = false;
  restart();
}

function handleCancelRestart() {
  showRestartConfirm.value = false;
  nextTick(() => {
    focusInput();
  });
}

function handleUpdateLanguage(newLang: Parameters<typeof setLanguage>[0]) {
  setLanguage(newLang);
  nextTick(() => {
    focusInput();
  });
}

function handleUpdateMode(newMode: Parameters<typeof setMode>[0]) {
  setMode(newMode);
  nextTick(() => {
    focusInput();
  });
}

function handleUpdateTimeLimit(limit: Parameters<typeof setTimeLimit>[0]) {
  setTimeLimit(limit);
  nextTick(() => {
    focusInput();
  });
}

function handleUpdateWordLimit(limit: Parameters<typeof setWordLimit>[0]) {
  setWordLimit(limit);
  nextTick(() => {
    focusInput();
  });
}

function handleGlobalKeydown(e: KeyboardEvent) {
  // If confirm popup is open, ignore global key shortcuts
  if (showRestartConfirm.value) return;

  // Tab key to request restart with confirmation
  if (e.key === "Tab") {
    e.preventDefault();
    requestRestart();
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
  if (words.value.length === 0) {
    initTest();
  }
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
      @restart="requestRestart"
      @select-theme="setTheme"
    />

    <!-- Main Content -->
    <main class="my-auto">
      <template v-if="status !== 'finished'">
        <!-- Controls Bar (Typing Language, Modes & Options) -->
        <TypingControls
          :language="language"
          :mode="mode"
          :time-limit="timeLimit"
          :word-limit="wordLimit"
          @update:language="handleUpdateLanguage"
          @update:mode="handleUpdateMode"
          @update:time-limit="handleUpdateTimeLimit"
          @update:word-limit="handleUpdateWordLimit"
        />

        <!-- Active Typing Area -->
        <TypingArea
          ref="typingAreaRef"
          :words="words"
          :current-word-index="currentWordIndex"
          :current-input="currentInput"
          :word-history="wordHistory"
          :combo="combo"
          :language="language"
          :active-word-view="activeWordView"
          @input="handleInput"
          @compositionend="handleCompositionEnd"
          @keydown="handleKeydown"
        />

        <!-- Visual Keyboard -->
        <ClientOnly>
          <VisualKeyboard
            :next-char="nextExpectedCharInfo?.char"
            :target-char="nextExpectedCharInfo?.targetChar"
            :is-error="nextExpectedCharInfo?.isError"
            :is-space="nextExpectedCharInfo?.isSpace"
            :language="language"
          />
        </ClientOnly>

        <!-- Action buttons -->
        <RestartButton @restart="requestRestart" />
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
        :max-combo="maxCombo"
        @restart="restart"
      />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Restart Confirmation Modal (Lao UI) -->
    <CommonConfirmDialog
      :is-open="showRestartConfirm"
      title="ຢືນຢັນການເລີ່ມໃໝ່"
      message="ທ່ານຕ້ອງການປ່ຽນຊຸດຂໍ້ຄວາມ ແລະ ເລີ່ມຕົ້ນໃໝ່ແທ້ບໍ່? ຄວາມຄືບໜ້າໃນປະຈຸບັນຈະບໍ່ຖືກບັນທຶກ."
      confirm-text="ຢືນຢັນ (ເລີ່ມໃໝ່)"
      cancel-text="ຍົກເລີກ"
      @confirm="handleConfirmRestart"
      @cancel="handleCancelRestart"
    />
  </div>
</template>
