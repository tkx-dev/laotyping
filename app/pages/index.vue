<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useTypingEngine } from "../composables/useTypingEngine";
import { useTheme } from "../composables/useTheme";

const config = useRuntimeConfig();
const siteUrl =
  (config.public?.siteUrl as string) || "https://typing.nungdees.xyz";
const googleSiteVerification =
  (config.public?.googleSiteVerification as string) || "";

// SEO and Meta (System UI is in Lao)
useServerSeoMeta({
  title: "LaoType - ເວັບໄຊຝຶກພິມດີດພາສາລາວ (Lao Typing Test)",
  ogTitle: "LaoType - ເວັບໄຊຝຶກພິມດີດພາສາລາວ (Lao Typing Test)",
  description:
    "LaoType ເປັນເວັບໄຊທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວອອນລາຍ ວັດຄວາມໄວ WPM ແລະ ຄວາມຖືກຕ້ອງ (Lao Typing Speed Test)",
  ogDescription:
    "LaoType ເປັນເວັບໄຊທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວອອນລາຍ ວັດຄວາມໄວ WPM ແລະ ຄວາມຖືກຕ້ອງ (Lao Typing Speed Test)",
  ogType: "website",
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/og-image.jpg`,
  ogImageAlt: "LaoType - Lao Typing Speed Test Banner",
  ogLocale: "lo_LA",
  twitterCard: "summary_large_image",
  twitterTitle: "LaoType - ເວັບໄຊຝຶກພິມດີດພາສາລາວ",
  twitterDescription:
    "ທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວ ແລະ ພາສາອັງກິດອອນລາຍຟຣີ ວັດແທກ WPM ດ້ວຍແປ້ນພິມຈຳລອງ",
  twitterImage: `${siteUrl}/og-image.jpg`,
  googleSiteVerification: googleSiteVerification || undefined,
});

useHead({
  link: [
    { rel: "canonical", href: siteUrl },
    { rel: "alternate", hreflang: "lo", href: siteUrl },
    { rel: "alternate", hreflang: "en", href: siteUrl },
    { rel: "alternate", hreflang: "x-default", href: siteUrl },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.ico" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "LaoType",
          alternateName: "Lao Typing Speed Test",
          url: siteUrl,
          applicationCategory: "EducationalApplication",
          operatingSystem: "All",
          browserRequirements: "Requires HTML5 and JavaScript",
          description:
            "ເວັບໄຊທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວອອນລາຍຟຣີ ວັດແທກຄວາມໄວ WPM ແລະ ຄວາມຖືກຕ້ອງ ຮອງຮັບແປ້ນພິມລາວມາດຕະຖານ",
          inLanguage: ["lo", "en"],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "ທົດສອບຄວາມໄວການພິມດີດພາສາລາວ (WPM/CPM)",
            "ຄຳນວນຄວາມຖືກຕ້ອງ (Accuracy) ແບບ Real-time",
            "ຮອງຮັບທັງໂໝດເວລາ (Time) ແລະ ໂໝດຈຳນວນຄຳ (Words)",
            "ແປ້ນພິມຈຳລອງພາສາລາວ (Virtual Lao Keyboard Layout)",
            "ບົດຮຽນຝຶກພິມ ແລະ ລະບົບສຽງຕອບສະໜອງ (Sound Effects)",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "LaoType",
          url: siteUrl,
          inLanguage: ["lo", "en"],
          description:
            "ເວັບໄຊຝຶກພິມດີດພາສາລາວອອນລາຍ (Lao Typing Practice & Speed Test)",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "LaoType ແມ່ນຫຍັງ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "LaoType ເປັນເວັບໄຊຝຶກພິມດີດ ແລະ ທົດສອບຄວາມໄວການພິມພາສາລາວ ແລະ ພາສາອັງກິດອອນລາຍຟຣີ ຄ້າຍຄືກັບ Monkeytype ແຕ່ຖືກອອກແບບມາສະເພາະສຳລັບພາສາລາວ.",
              },
            },
            {
              "@type": "Question",
              name: "WPM ແມ່ນຫຍັງ ແລະ ວັດແທກຄວາມໄວແນວໃດ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "WPM (Words Per Minute) ແມ່ນຈຳນວນຄຳທີ່ພິມໄດ້ຕໍ່ນາທີ ໂດຍຄິດໄລ່ຈາກຈຳນວນຕົວອັກສອນທີ່ພິມຖືກຕ້ອງຫານດ້ວຍ 5 ແລ້ວຫານດ້ວຍເວລາທີ່ໃຊ້ເປັນນາທີ.",
              },
            },
            {
              "@type": "Question",
              name: "ຮອງຮັບແປ້ນພິມພາສາລາວແບບໃດແດ່?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ຮອງຮັບແປ້ນພິມພາສາລາວມາດຕະຖານ (Lao Standard Keyboard Layout) ທີ່ໃຊ້ທົ່ວໄປໃນ Windows, macOS, iOS ແລະ Android.",
              },
            },
          ],
        },
      ]),
    },
  ],
});

const {
  language,
  hasPunctuation,
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
  setPunctuation,
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

function handleUpdatePunctuation(val: boolean) {
  setPunctuation(val);
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
      :word-limit="mode === 'lesson' ? words.length : wordLimit"
      @restart="requestRestart"
      @select-theme="setTheme"
    />

    <!-- Main Content -->
    <main class="my-auto">
      <template v-if="status !== 'finished'">
        <!-- Controls Bar (Typing Language, Modes & Options) -->
        <div
          class="transition-all duration-300"
          :class="
            status === 'running'
              ? 'opacity-30 hover:opacity-100'
              : 'opacity-100'
          "
        >
          <TypingControls
            :language="language"
            :has-punctuation="hasPunctuation"
            :mode="mode"
            :time-limit="timeLimit"
            :word-limit="wordLimit"
            @update:language="handleUpdateLanguage"
            @update:has-punctuation="handleUpdatePunctuation"
            @update:mode="handleUpdateMode"
            @update:time-limit="handleUpdateTimeLimit"
            @update:word-limit="handleUpdateWordLimit"
          />
        </div>

        <!-- Live Status Floating HUD (Visible during active test) -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="status === 'running'"
            class="flex items-center justify-between px-3 py-1 mb-2 font-mono text-sm max-w-2xl mx-auto w-full select-none"
          >
            <div class="flex items-center gap-2 text-theme-accent font-bold">
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-accent opacity-75"
                />
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-theme-accent"
                />
              </span>
              <span v-if="mode === 'time'">{{ timeLeft }}s</span>
              <span v-else
                >{{ currentWordIndex }} /
                {{ mode === "lesson" ? words.length : wordLimit }}</span
              >
            </div>

            <div
              class="flex items-center gap-4 text-xs font-semibold text-theme-muted"
            >
              <span
                >WPM
                <strong class="text-theme-primary font-bold text-sm">{{
                  wpm
                }}</strong></span
              >
              <span
                >ACC
                <strong class="text-theme-primary font-bold text-sm"
                  >{{ accuracy }}%</strong
                ></span
              >
            </div>
          </div>
        </Transition>

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

    <!-- SEO Content Section -->
    <SeoContent />

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
