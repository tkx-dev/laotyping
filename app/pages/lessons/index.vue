<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getLessonLevels, getAllLessons } from '../../data/lessons';
import type { TypingLanguage } from '../../composables/useTypingEngine';

// ── SEO ──────────────────────────────────────────────────────────────────────
const config = useRuntimeConfig();
const siteUrl = (config.public?.siteUrl as string) || 'https://typing.nungdees.xyz';

useServerSeoMeta({
  title: 'ບົດຮຽນ — LaoType | ຮຽນພິມດີດພາສາລາວ Step-by-Step',
  ogTitle: 'ບົດຮຽນ — LaoType | Lao Typing Lessons',
  description:
    'ຮຽນຮູ້ການພິມດີດພາສາລາວ ແລະ ພາສາອັງກິດດ້ວຍ curriculum ແບບ step-by-step ຈາກ Home Row ຈົນຮອດຂັ້ນ Advanced ຟຣີ',
  ogDescription:
    'ຮຽນພິມດີດພາສາລາວດ້ວຍ 6 ຂັ້ນ ຕັ້ງແຕ່ Home Row ຈົນຮອດ Advanced ລະບົບດາວ ແລະ ຕິດຕາມຄວາມຄືບໜ້າ',
  ogType: 'website',
  ogUrl: `${siteUrl}/lessons`,
  ogImage: `${siteUrl}/og-image.jpg`,
  ogLocale: 'lo_LA',
  twitterCard: 'summary_large_image',
});

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/lessons` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'ຫຼັກສູດການພິມດີດພາສາລາວ — LaoType',
        description: 'ຮຽນຮູ້ການພິມດີດພາສາລາວ Step-by-Step ຈາກ Home Row ຈົນຮອດ Advanced',
        provider: { '@type': 'Organization', name: 'LaoType', url: siteUrl },
        inLanguage: ['lo', 'en'],
        isAccessibleForFree: true,
        url: `${siteUrl}/lessons`,
      }),
    },
  ],
});

// ── State ──────────────────────────────────────────────────────────────────
const selectedLanguage = ref<TypingLanguage>('lao');
const { currentTheme, setTheme, THEME_OPTIONS } = useTheme();
const { getLessonProgress, getLessonStars, isLessonCompleted, isLessonUnlocked } = useLessonProgress();

const levels = computed(() => getLessonLevels(selectedLanguage.value));
const allLessons = computed(() => getAllLessons(selectedLanguage.value));

// ── Aggregate stats ────────────────────────────────────────────────────────
const totalCompleted = computed(() =>
  allLessons.value.filter((l) => isLessonCompleted(l.id)).length
);
const totalStarsEarned = computed(() =>
  allLessons.value.reduce((sum, l) => sum + getLessonStars(l.id), 0)
);
const totalMaxStars = computed(() => allLessons.value.length * 3);
const overallPct = computed(() =>
  allLessons.value.length > 0
    ? Math.round((totalCompleted.value / allLessons.value.length) * 100)
    : 0
);

// Per-level helpers
function getLevelCompletedCount(levelNum: number) {
  const lvl = levels.value.find((l) => l.level === levelNum);
  if (!lvl) return 0;
  return lvl.lessons.filter((l) => isLessonCompleted(l.id)).length;
}

function getLevelTotalStars(levelNum: number) {
  const lvl = levels.value.find((l) => l.level === levelNum);
  if (!lvl) return 0;
  return lvl.lessons.reduce((sum, l) => sum + getLessonStars(l.id), 0);
}

function isLevelUnlocked(levelNum: number): boolean {
  if (levelNum === 1) return true;
  const prevLevel = levels.value.find((l) => l.level === levelNum - 1);
  if (!prevLevel) return false;
  // Level unlocks when at least one lesson in prev level is completed
  return prevLevel.lessons.some((l) => isLessonCompleted(l.id));
}

// ── Navigation ─────────────────────────────────────────────────────────────
function handleLessonClick(lessonId: string) {
  navigateTo(`/lessons/${lessonId}`);
}

// Language pills
const langOptions = [
  { id: 'lao' as TypingLanguage, label: 'ລາວ', sublabel: 'Lao' },
  { id: 'english' as TypingLanguage, label: 'ອັງກິດ', sublabel: 'English' },
];
</script>

<template>
  <div
    class="min-h-screen bg-theme-bg text-theme-primary font-sans transition-colors duration-300"
    :data-theme="currentTheme"
  >
    <!-- ── Top Navigation Bar ─────────────────────────────────────────── -->
    <header class="sticky top-0 z-30 backdrop-blur-xl border-b border-theme-border-subtle/40 bg-theme-bg/80">
      <div class="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <!-- Logo + back -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 group select-none"
          aria-label="ກັບໄປໜ້າຫຼັກ LaoType"
        >
          <div class="relative w-9 h-9 rounded-xl bg-theme-surface border border-theme-border/80 flex items-center justify-center shadow-md transition-all group-hover:scale-105 group-hover:border-theme-accent group-hover:shadow-[0_0_12px_var(--color-theme-accent-glow)]">
            <div class="absolute inset-1 rounded-lg bg-white/[0.04] border border-white/10" />
            <span class="relative font-bold font-lao text-xl text-theme-accent">ລ</span>
          </div>
          <div class="hidden sm:block">
            <span class="text-sm font-bold text-theme-primary tracking-tight">LaoType</span>
            <p class="text-[10px] text-theme-muted font-lao">ກັບໄປໜ້າຫຼັກ</p>
          </div>
        </NuxtLink>

        <!-- Page title -->
        <h1 class="text-base sm:text-lg font-bold font-lao text-theme-primary tracking-tight">
          ບົດຮຽນ
        </h1>

        <!-- Theme switcher -->
        <div class="flex items-center gap-1.5 bg-theme-surface/70 border border-theme-border-subtle px-2.5 py-1.5 rounded-full backdrop-blur-md">
          <button
            v-for="t in THEME_OPTIONS"
            :key="t.id"
            type="button"
            class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none"
            :class="
              currentTheme === t.id
                ? 'bg-white/10 text-theme-primary font-bold'
                : 'text-theme-muted hover:text-theme-primary'
            "
            :title="t.name"
            @click="setTheme(t.id)"
          >
            <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: t.dotColor }" />
            <span class="hidden md:inline">{{ t.name }}</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-8 pb-16">
      <!-- ── Hero Stats Banner ─────────────────────────────────────────── -->
      <section
        class="mt-8 mb-8 rounded-3xl border border-theme-accent/30 bg-theme-surface/50 backdrop-blur-md p-6 shadow-[0_0_40px_var(--color-theme-accent-glow)/20]"
        aria-label="ສະຫລຸບຄວາມຄືບໜ້າ"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <!-- Overall progress ring (CSS only) -->
          <div class="flex-shrink-0 relative w-20 h-20 mx-auto sm:mx-0">
            <svg class="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
              <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" class="text-theme-subtle/20" stroke-width="6" />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="currentColor"
                class="text-theme-accent transition-all duration-1000"
                stroke-width="6"
                stroke-linecap="round"
                :stroke-dasharray="`${2 * Math.PI * 34}`"
                :stroke-dashoffset="`${2 * Math.PI * 34 * (1 - overallPct / 100)}`"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center flex-col">
              <span class="text-lg font-bold text-theme-accent font-mono leading-none">{{ overallPct }}%</span>
            </div>
          </div>

          <!-- Stats grid -->
          <div class="flex-1 grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-theme-accent font-mono">{{ totalCompleted }}</div>
              <div class="text-xs text-theme-muted font-lao mt-0.5">ບົດຮຽນ<br class="sm:hidden"/>ສຳເລັດ</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-theme-accent font-mono">{{ allLessons.length }}</div>
              <div class="text-xs text-theme-muted font-lao mt-0.5">ທັງໝົດ</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-theme-accent font-mono flex items-center justify-center gap-1">
                {{ totalStarsEarned }}
                <svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div class="text-xs text-theme-muted font-lao mt-0.5">ດາວ / {{ totalMaxStars }}</div>
            </div>
          </div>

          <!-- Language switcher -->
          <div class="flex-shrink-0 flex gap-2 justify-center sm:justify-end">
            <button
              v-for="lang in langOptions"
              :key="lang.id"
              type="button"
              class="px-4 py-2 rounded-xl text-sm font-bold font-lao transition-all duration-200 cursor-pointer select-none border"
              :class="
                selectedLanguage === lang.id
                  ? 'bg-theme-accent text-theme-bg border-theme-accent shadow-[0_0_12px_var(--color-theme-accent-glow)]'
                  : 'bg-theme-surface/50 text-theme-muted border-theme-border/40 hover:text-theme-primary hover:border-theme-accent/50'
              "
              @click="selectedLanguage = lang.id"
            >
              {{ lang.label }}
            </button>
          </div>
        </div>
      </section>

      <!-- ── Level Cards ───────────────────────────────────────────────── -->
      <div class="flex flex-col gap-8">
        <LessonLevelCard
          v-for="level in levels"
          :key="`${selectedLanguage}-${level.level}`"
          :level="level"
          :completed-count="getLevelCompletedCount(level.level)"
          :total-stars="getLevelTotalStars(level.level)"
          :max-stars="level.lessons.length * 3"
          :language="selectedLanguage"
          :is-unlocked="isLevelUnlocked(level.level)"
          class="level-enter"
          @lesson-click="handleLessonClick"
        />
      </div>

      <!-- ── Empty / All Done state ────────────────────────────────────── -->
      <div
        v-if="overallPct === 100"
        class="mt-12 text-center py-16 rounded-3xl border border-theme-accent/40 bg-theme-surface/30"
      >
        <div class="text-5xl mb-4">
          <svg class="w-16 h-16 mx-auto text-theme-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold font-lao text-theme-accent mb-2">ສຳເລັດທັງໝົດແລ້ວ!</h2>
        <p class="text-theme-muted font-lao">ທ່ານຜ່ານທຸກບົດຮຽນແລ້ວ ລອງທົດສອບຄວາມໄວໃນໜ້າຫຼັກ</p>
        <NuxtLink
          to="/"
          class="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-theme-accent text-theme-bg font-bold font-lao transition-all hover:shadow-[0_0_20px_var(--color-theme-accent-glow)] hover:scale-105"
        >
          ໄປໜ້າທົດສອບ
        </NuxtLink>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
/* Stagger entrance animation for level cards */
@keyframes levelSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.level-enter {
  animation: levelSlideIn 0.45s cubic-bezier(0.34, 1.2, 0.64, 1) both;
}

.level-enter:nth-child(1) { animation-delay: 0ms; }
.level-enter:nth-child(2) { animation-delay: 80ms; }
.level-enter:nth-child(3) { animation-delay: 160ms; }
.level-enter:nth-child(4) { animation-delay: 240ms; }
.level-enter:nth-child(5) { animation-delay: 320ms; }
.level-enter:nth-child(6) { animation-delay: 400ms; }

@media (prefers-reduced-motion: reduce) {
  .level-enter { animation: none; }
}
</style>
