<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    wpm: number;
    accuracy: number;
    cpm: number;
    correctWordsCount: number;
    incorrectWordsCount: number;
    elapsedSeconds: number;
    totalKeystrokes: number;
    maxCombo?: number;
  }>(),
  {
    maxCombo: 0,
  },
);

const emit = defineEmits<{
  (e: "restart"): void;
}>();

const copied = ref(false);

const rank = computed(() => {
  if (props.wpm >= 60 && props.accuracy >= 95) {
    return {
      title: "ຜູ້ຊ່ຽວຊານ (Master)",
      icon: "🏆",
      color: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    };
  }
  if (props.wpm >= 40 && props.accuracy >= 90) {
    return {
      title: "ຄ່ອງແຄ້ວ (Pro)",
      icon: "⚡",
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    };
  }
  if (props.wpm >= 25) {
    return {
      title: "ປານກາງ (Intermediate)",
      icon: "📈",
      color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    };
  }
  return {
    title: "ມືໃໝ່ (Beginner)",
    icon: "🌱",
    color: "text-violet-400 bg-violet-400/10 border-violet-400/30",
  };
});

function copyResult() {
  const text = `🇱🇦 LaoType Results:\n🚀 WPM: ${props.wpm}\n🎯 Accuracy: ${props.accuracy}%\n⚡ CPM: ${props.cpm}\n🔥 Max Streak: ${props.maxCombo}\n⏱️ Time: ${props.elapsedSeconds}s\nທົດສອບຄວາມໄວພິມພາສາລາວໄດ້ທີ່ LaoType!`;
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2500);
  });
}
</script>

<template>
  <section
    class="relative bg-theme-card/95 border border-theme-border/50 rounded-3xl p-6 sm:p-12 backdrop-blur-2xl text-center max-w-2xl mx-auto shadow-2xl shadow-black/40 transition-all overflow-hidden"
  >
    <!-- Background Ambient Glow -->
    <div
      class="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-theme-accent/15 blur-3xl rounded-full pointer-events-none"
    />

    <!-- Rank Badge -->
    <div class="relative z-10 flex items-center justify-center gap-2 mb-4">
      <span
        class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold font-lao select-none shadow-xs"
        :class="rank.color"
      >
        <span>{{ rank.icon }}</span>
        <span>{{ rank.title }}</span>
      </span>
    </div>

    <h2
      class="relative z-10 text-xs uppercase tracking-widest text-theme-muted font-bold font-lao mb-8"
    >
      ຜົນການທົດສອບຄວາມໄວ (Test Summary)
    </h2>

    <!-- Hero Stat Grid -->
    <div class="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <!-- WPM Hero Card -->
      <div
        class="relative bg-theme-surface/70 border border-theme-accent/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-1 shadow-lg shadow-theme-accent/5 group hover:border-theme-accent/60 transition-all"
      >
        <span
          class="font-mono text-5xl sm:text-6xl font-black text-theme-accent tracking-tight group-hover:scale-105 transition-transform"
        >
          {{ wpm }}
        </span>
        <span
          class="text-xs text-theme-muted uppercase tracking-wider font-bold font-lao mt-1"
        >
          WPM (ຄຳ/ນາທີ)
        </span>
      </div>

      <!-- Accuracy Hero Card -->
      <div
        class="relative bg-theme-surface/70 border border-white/[0.08] rounded-2xl p-5 flex flex-col items-center justify-center gap-1 shadow-lg group hover:border-white/20 transition-all"
      >
        <span
          class="font-mono text-5xl sm:text-6xl font-black text-theme-primary tracking-tight group-hover:scale-105 transition-transform"
        >
          {{ accuracy }}%
        </span>
        <span
          class="text-xs text-theme-muted uppercase tracking-wider font-bold font-lao mt-1"
        >
          ຄວາມຖືກຕ້ອງ (Accuracy)
        </span>
      </div>

      <!-- CPM Hero Card -->
      <div
        class="relative bg-theme-surface/70 border border-white/[0.08] rounded-2xl p-5 flex flex-col items-center justify-center gap-1 shadow-lg group hover:border-white/20 transition-all"
      >
        <span
          class="font-mono text-5xl sm:text-6xl font-black text-theme-primary tracking-tight group-hover:scale-105 transition-transform"
        >
          {{ cpm }}
        </span>
        <span
          class="text-xs text-theme-muted uppercase tracking-wider font-bold font-lao mt-1"
        >
          CPM (ອັກສອນ/ນາທີ)
        </span>
      </div>
    </div>

    <!-- Secondary Stat Breakdown Chips -->
    <div
      class="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-xs sm:text-sm font-mono"
    >
      <div
        class="bg-black/20 border border-white/[0.05] rounded-xl p-3 flex flex-col items-center gap-0.5"
      >
        <span class="text-[11px] font-lao text-theme-muted">ຄຳທີ່ຖືກ</span>
        <span class="text-theme-correct font-black text-base">{{
          correctWordsCount
        }}</span>
      </div>

      <div
        class="bg-black/20 border border-white/[0.05] rounded-xl p-3 flex flex-col items-center gap-0.5"
      >
        <span class="text-[11px] font-lao text-theme-muted">ຄຳທີ່ຜິດ</span>
        <span class="text-theme-incorrect font-black text-base">{{
          incorrectWordsCount
        }}</span>
      </div>

      <div
        class="bg-black/20 border border-white/[0.05] rounded-xl p-3 flex flex-col items-center gap-0.5"
      >
        <span class="text-[11px] font-lao text-theme-muted">ເວລາທີ່ໃຊ້</span>
        <span class="text-theme-primary font-black text-base"
          >{{ elapsedSeconds }}s</span
        >
      </div>

      <div
        class="bg-black/20 border border-white/[0.05] rounded-xl p-3 flex flex-col items-center gap-0.5"
      >
        <span class="text-[11px] font-lao text-theme-muted">Streak ສູງສຸດ</span>
        <span class="text-theme-accent font-black text-base"
          >🔥 {{ maxCombo }}</span
        >
      </div>
    </div>

    <!-- Action Buttons Group -->
    <div
      class="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3"
    >
      <button
        type="button"
        class="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-theme-accent hover:bg-theme-accent-hover text-stone-950 font-bold font-lao text-base shadow-xl shadow-theme-accent/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        @click="emit('restart')"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M8 16H3v5" />
        </svg>
        <span>ລອງໃໝ່ອີກຄັ້ງ (Try Again)</span>
        <span
          class="font-mono text-xs bg-stone-950/20 px-1.5 py-0.5 rounded font-black"
          >Tab</span
        >
      </button>

      <button
        type="button"
        class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-theme-surface hover:bg-white/10 border border-theme-border/60 text-theme-primary font-semibold font-lao text-sm transition-all hover:-translate-y-0.5 cursor-pointer shadow-md"
        @click="copyResult"
      >
        <svg
          v-if="!copied"
          class="w-4 h-4 text-theme-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg
          v-else
          class="w-4 h-4 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{{
          copied ? "ຄັດລອກຜົນແລ້ວ! (Copied)" : "ຄັດລອກຜົນ (Copy)"
        }}</span>
      </button>
    </div>
  </section>
</template>
