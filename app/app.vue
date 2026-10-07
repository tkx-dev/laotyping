<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
import { useTypingEngine, type TimeOption, type WordOption } from './composables/useTypingEngine'
import { useTheme } from './composables/useTheme'

// SEO and Meta
useHead({
  title: 'LaoType - ເວັບໄຊຝຶກພິມດີດພາສາລາວ (Lao Typing Test)',
  meta: [
    { name: 'description', content: 'ເວັບໄຊທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວອອນລາຍ ວັດຄວາມໄວ WPM ແລະ ຄວາມຖືກຕ້ອງ (Lao Typing Speed Test)' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&display=swap' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' }
  ]
})

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
  correctKeystrokes,
  incorrectKeystrokes,
  initTest,
  handleInput,
  setMode,
  setTimeLimit,
  setWordLimit
} = useTypingEngine()

const { currentTheme, setTheme, THEME_OPTIONS } = useTheme()

const inputRef = ref<HTMLInputElement | null>(null)
const wordsDisplayRef = ref<HTMLDivElement | null>(null)
const isFocused = ref(false)

function focusInput() {
  if (inputRef.value) {
    inputRef.value.focus()
    isFocused.value = true
  }
}

function handleBlur() {
  isFocused.value = false
}

function handleGlobalKeydown(e: KeyboardEvent) {
  // Tab key to restart
  if (e.key === 'Tab') {
    e.preventDefault()
    restart()
    return
  }

  // Auto focus input when user starts typing anywhere on the page
  if (status.value !== 'finished' && document.activeElement !== inputRef.value) {
    if ((e.key.length === 1 || e.key === 'Backspace') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      focusInput()
    }
  }
}

function restart() {
  initTest()
  nextTick(() => {
    focusInput()
  })
}

// Auto scroll word container to follow active word
watch(currentWordIndex, () => {
  nextTick(() => {
    if (!wordsDisplayRef.value) return
    const activeEl = wordsDisplayRef.value.querySelector('.active-word') as HTMLElement | null
    if (activeEl) {
      const containerTop = wordsDisplayRef.value.offsetTop
      const activeTop = activeEl.offsetTop
      if (activeTop - containerTop > 70) {
        wordsDisplayRef.value.scrollTop = activeTop - containerTop - 35
      } else {
        wordsDisplayRef.value.scrollTop = 0
      }
    }
  })
})

onMounted(() => {
  initTest()
  nextTick(() => {
    focusInput()
  })
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

// Statistics computation for finished state
const correctWordsCount = computed(() => wordHistory.value.filter(w => w.isCorrect).length)
const incorrectWordsCount = computed(() => wordHistory.value.filter(w => !w.isCorrect).length)
</script>

<template>
  <div class="min-h-screen bg-theme-bg text-theme-primary font-sans transition-colors duration-300 flex flex-col justify-between p-4 sm:p-8 max-w-5xl mx-auto w-full">
    <!-- Header -->
    <header class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <!-- Logo Group -->
      <div class="flex items-center gap-3 cursor-pointer select-none group" @click="restart">
        <div class="w-11 h-11 rounded-xl bg-theme-accent text-stone-900 font-bold font-lao text-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
          ລ
        </div>
        <div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-theme-primary">
            LaoType
          </h1>
          <p class="text-xs font-lao text-theme-muted font-medium">
            ຝຶກພິມດີດພາສາລາວ
          </p>
        </div>
      </div>

      <!-- Right Header: Theme Switcher & Live Stats -->
      <div class="flex flex-wrap items-center gap-3 sm:gap-5">
        <!-- Theme Switcher Pills -->
        <div class="flex items-center gap-1.5 bg-theme-surface/70 border border-theme-border-subtle px-2.5 py-1.5 rounded-full backdrop-blur-md">
          <button
            v-for="t in THEME_OPTIONS"
            :key="t.id"
            class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all"
            :class="currentTheme === t.id ? 'bg-white/10 text-theme-primary font-bold shadow-xs' : 'text-theme-muted hover:text-theme-primary'"
            :title="t.name"
            @click="setTheme(t.id)"
          >
            <span
              class="w-2.5 h-2.5 rounded-full"
              :style="{ backgroundColor: t.dotColor }"
            />
            <span class="hidden md:inline">{{ t.name }}</span>
          </button>
        </div>

        <!-- Live Stats Counters -->
        <div class="flex items-center gap-2">
          <div class="flex items-baseline gap-1 bg-theme-surface/70 border border-theme-border-subtle px-3 py-1.5 rounded-full font-mono backdrop-blur-md">
            <span class="text-[10px] text-theme-muted uppercase font-bold tracking-wider">WPM</span>
            <span class="text-base font-bold text-theme-accent">{{ wpm }}</span>
          </div>
          <div class="flex items-baseline gap-1 bg-theme-surface/70 border border-theme-border-subtle px-3 py-1.5 rounded-full font-mono backdrop-blur-md">
            <span class="text-[10px] text-theme-muted uppercase font-bold tracking-wider">ACC</span>
            <span class="text-base font-bold text-theme-accent">{{ accuracy }}%</span>
          </div>
          <div v-if="mode === 'time'" class="flex items-baseline gap-1 bg-theme-surface/70 border border-theme-border-subtle px-3 py-1.5 rounded-full font-mono backdrop-blur-md">
            <span class="text-[10px] text-theme-muted uppercase font-bold tracking-wider">TIME</span>
            <span class="text-base font-bold" :class="timeLeft <= 5 ? 'text-red-400' : 'text-theme-accent'">
              {{ timeLeft }}s
            </span>
          </div>
          <div v-else class="flex items-baseline gap-1 bg-theme-surface/70 border border-theme-border-subtle px-3 py-1.5 rounded-full font-mono backdrop-blur-md">
            <span class="text-[10px] text-theme-muted uppercase font-bold tracking-wider">WORD</span>
            <span class="text-base font-bold text-theme-accent">
              {{ currentWordIndex }}/{{ wordLimit }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="my-auto">
      <!-- Controls Bar (Modes & Options) -->
      <section v-if="status !== 'finished'" class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-theme-surface/80 border border-theme-border-subtle backdrop-blur-xl px-4 py-1.5 rounded-full w-fit mx-auto mb-8 shadow-xl" aria-label="Typing options">
        <!-- Mode selector -->
        <div class="flex items-center gap-1">
          <button
            class="px-3 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer"
            :class="mode === 'time' ? 'bg-theme-accent text-stone-900 font-bold shadow-md' : 'text-theme-muted hover:text-theme-primary'"
            @click="setMode('time')"
          >
            ເວລາ (Time)
          </button>
          <button
            class="px-3 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer"
            :class="mode === 'words' ? 'bg-theme-accent text-stone-900 font-bold shadow-md' : 'text-theme-muted hover:text-theme-primary'"
            @click="setMode('words')"
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
            :class="timeLimit === t ? 'bg-theme-accent text-stone-900 font-bold shadow-md' : 'text-theme-muted hover:text-theme-primary'"
            @click="setTimeLimit(t)"
          >
            {{ t }}s
          </button>
        </div>

        <div v-else class="flex items-center gap-1">
          <button
            v-for="w in [10, 25, 50] as WordOption[]"
            :key="w"
            class="px-2.5 py-1 text-xs sm:text-sm font-semibold font-mono rounded-full transition-all cursor-pointer"
            :class="wordLimit === w ? 'bg-theme-accent text-stone-900 font-bold shadow-md' : 'text-theme-muted hover:text-theme-primary'"
            @click="setWordLimit(w)"
          >
            {{ w }}
          </button>
        </div>
      </section>

      <!-- Active Typing Area -->
      <section
        v-if="status !== 'finished'"
        class="relative bg-theme-card border rounded-2xl p-6 sm:p-10 min-h-[220px] flex flex-col justify-center backdrop-blur-2xl shadow-2xl transition-all outline-none cursor-text"
        :class="isFocused ? 'border-theme-border shadow-theme-accent/5' : 'border-theme-border-subtle'"
        @click="focusInput"
      >
        <!-- Hidden input for mobile & desktop keyboards -->
        <input
          ref="inputRef"
          type="text"
          class="absolute opacity-0 pointer-events-none left-0 top-0"
          :value="currentInput"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          @input="handleInput"
          @focus="isFocused = true"
          @blur="handleBlur"
        />

        <!-- Unfocused Prompt Overlay -->
        <div
          v-if="!isFocused"
          class="absolute inset-0 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs rounded-2xl z-10 cursor-pointer"
        >
          <span class="text-theme-accent font-semibold font-lao text-lg">
            ກົດທີ່ນີ້ ຫຼື ກົດປຸ່ມໃດກໍໄດ້ເພື່ອເລີ່ມພິມ
          </span>
        </div>

        <!-- Words Stream -->
        <div ref="wordsDisplayRef" class="flex flex-wrap gap-x-5 gap-y-3 font-lao text-2xl sm:text-3xl leading-relaxed select-none max-h-[200px] overflow-hidden">
          <span
            v-for="(word, wIdx) in words"
            :key="wIdx"
            class="relative inline-flex transition-colors rounded-sm"
            :class="{
              'active-word text-theme-muted': wIdx === currentWordIndex,
              'text-theme-subtle': wIdx > currentWordIndex
            }"
          >
            <!-- Previously completed word -->
            <template v-if="wIdx < currentWordIndex">
              <span
                v-for="(c, cIdx) in Array.from(word)"
                :key="cIdx"
                :class="wordHistory[wIdx]?.isCorrect ? 'text-theme-correct' : 'text-theme-incorrect underline decoration-theme-incorrect/50'"
              >
                {{ c }}
              </span>
            </template>

            <!-- Currently active word -->
            <template v-else-if="wIdx === currentWordIndex">
              <span
                v-for="(targetChar, charIdx) in Array.from(word)"
                :key="charIdx"
                class="relative transition-colors"
                :class="{
                  'text-theme-correct': charIdx < currentInput.length && currentInput[charIdx] === targetChar,
                  'text-theme-incorrect bg-red-500/20 rounded-xs': charIdx < currentInput.length && currentInput[charIdx] !== targetChar
                }"
              >
                <!-- Render animated caret -->
                <span
                  v-if="charIdx === currentInput.length && isFocused"
                  class="absolute w-[2.5px] h-[1.3em] bg-theme-accent rounded-full caret-pulse -left-[1px] top-[0.1em] pointer-events-none"
                />
                {{ targetChar }}
              </span>

              <!-- Extra characters typed past word length -->
              <span
                v-for="(extraChar, extraIdx) in Array.from(currentInput.slice(word.length))"
                :key="'extra-' + extraIdx"
                class="text-theme-extra opacity-90 underline decoration-wavy"
              >
                {{ extraChar }}
              </span>

              <!-- Caret at the end of word if extra characters -->
              <span
                v-if="currentInput.length >= word.length && isFocused"
                class="absolute w-[2.5px] h-[1.3em] bg-theme-accent rounded-full caret-pulse -right-[2px] top-[0.1em] pointer-events-none"
              />
            </template>

            <!-- Upcoming word -->
            <template v-else>
              <span
                v-for="(c, cIdx) in Array.from(word)"
                :key="cIdx"
              >
                {{ c }}
              </span>
            </template>
          </span>
        </div>
      </section>

      <!-- Action buttons -->
      <div v-if="status !== 'finished'" class="flex justify-center items-center gap-3 mt-6">
        <button
          class="flex items-center gap-2 px-5 py-2 rounded-full bg-theme-surface/70 hover:bg-theme-surface border border-theme-border-subtle hover:border-theme-border text-theme-muted hover:text-theme-primary text-sm font-medium transition-all hover:-translate-y-0.5 cursor-pointer shadow-md"
          @click="restart"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          <span class="font-lao">ເລີ່ມໃໝ່</span>
          <span class="font-mono text-[11px] bg-white/10 px-1.5 py-0.5 rounded text-theme-muted">Tab</span>
        </button>
      </div>

      <!-- Results View -->
      <section v-if="status === 'finished'" class="bg-theme-card border border-theme-border/40 rounded-2xl p-6 sm:p-10 backdrop-blur-2xl text-center max-w-xl mx-auto shadow-2xl transition-all">
        <h2 class="text-xs uppercase tracking-widest text-theme-accent font-bold font-lao mb-6">
          ຜົນການທົດສອບ (Results)
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div class="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col gap-1">
            <span class="font-mono text-4xl sm:text-5xl font-extrabold text-theme-accent">{{ wpm }}</span>
            <span class="text-xs text-theme-muted uppercase tracking-wider font-semibold">WPM (ຄຳ/ນາທີ)</span>
          </div>

          <div class="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col gap-1">
            <span class="font-mono text-4xl sm:text-5xl font-bold text-theme-primary">{{ accuracy }}%</span>
            <span class="text-xs text-theme-muted uppercase tracking-wider font-semibold">ຄວາມຖືກຕ້ອງ</span>
          </div>

          <div class="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col gap-1">
            <span class="font-mono text-4xl sm:text-5xl font-bold text-theme-primary">{{ cpm }}</span>
            <span class="text-xs text-theme-muted uppercase tracking-wider font-semibold">CPM (ອັກສອນ/ນາທີ)</span>
          </div>
        </div>

        <div class="flex justify-center gap-6 mb-8 text-sm text-theme-muted font-mono">
          <div>
            <span>ຄຳທີ່ຖືກ: </span>
            <span class="text-theme-correct font-semibold">{{ correctWordsCount }}</span>
          </div>
          <div>
            <span>ຄຳທີ່ຜິດ: </span>
            <span class="text-theme-incorrect font-semibold">{{ incorrectWordsCount }}</span>
          </div>
          <div>
            <span>ເວລາ: </span>
            <span class="text-theme-primary font-semibold">{{ elapsedSeconds }}s</span>
          </div>
          <div>
            <span>ກົດແປ້ນ: </span>
            <span class="text-theme-primary font-semibold">{{ totalKeystrokes }}</span>
          </div>
        </div>

        <button
          class="px-8 py-3 rounded-full bg-theme-accent hover:bg-theme-accent-hover text-stone-900 font-lao font-bold text-base shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
          @click="restart"
        >
          ລອງໃໝ່ອີກຄັ້ງ (Try Again)
        </button>
      </section>
    </main>

    <!-- Footer -->
    <footer class="text-center text-theme-muted text-xs font-lao mt-8">
      <p>
        LaoType — ລະບົບຝຶກພິມພາສາລາວອອນລາຍ • ຮອງຮັບແປ້ນພິມພາສາລາວມາດຕະຖານ
      </p>
    </footer>
  </div>
</template>
