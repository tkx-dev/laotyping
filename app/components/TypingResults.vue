<script setup lang="ts">
withDefaults(
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
</script>

<template>
  <section
    class="bg-theme-card border border-theme-border/40 rounded-2xl p-6 sm:p-10 backdrop-blur-2xl text-center max-w-xl mx-auto shadow-2xl transition-all"
  >
    <h2
      class="text-xs uppercase tracking-widest text-theme-accent font-bold font-lao mb-6"
    >
      ຜົນການທົດສອບ (Results)
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
      <div
        class="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col gap-1"
      >
        <span
          class="font-mono text-4xl sm:text-5xl font-extrabold text-theme-accent"
        >
          {{ wpm }}
        </span>
        <span
          class="text-xs text-theme-muted uppercase tracking-wider font-semibold font-lao"
        >
          WPM (ຄຳ/ນາທີ)
        </span>
      </div>

      <div
        class="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col gap-1"
      >
        <span
          class="font-mono text-4xl sm:text-5xl font-bold text-theme-primary"
        >
          {{ accuracy }}%
        </span>
        <span
          class="text-xs text-theme-muted uppercase tracking-wider font-semibold font-lao"
        >
          ຄວາມຖືກຕ້ອງ
        </span>
      </div>

      <div
        class="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col gap-1"
      >
        <span
          class="font-mono text-4xl sm:text-5xl font-bold text-theme-primary"
        >
          {{ cpm }}
        </span>
        <span
          class="text-xs text-theme-muted uppercase tracking-wider font-semibold font-lao"
        >
          CPM (ອັກສອນ/ນາທີ)
        </span>
      </div>
    </div>

    <div
      class="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 text-sm text-theme-muted font-mono"
    >
      <div>
        <span class="font-lao">ຄຳທີ່ຖືກ: </span>
        <span class="text-theme-correct font-semibold font-mono">
          {{ correctWordsCount }}
        </span>
      </div>
      <div>
        <span class="font-lao">ຄຳທີ່ຜິດ: </span>
        <span class="text-theme-incorrect font-semibold font-mono">
          {{ incorrectWordsCount }}
        </span>
      </div>
      <div>
        <span class="font-lao">ເວລາ: </span>
        <span class="text-theme-primary font-semibold font-mono">
          {{ elapsedSeconds }}s
        </span>
      </div>
      <div>
        <span class="font-lao">ກົດແປ້ນ: </span>
        <span class="text-theme-primary font-semibold font-mono">
          {{ totalKeystrokes }}
        </span>
      </div>
      <div v-if="maxCombo && maxCombo > 0">
        <span class="font-lao">Streak ສູງສຸດ: </span>
        <span class="text-theme-accent font-semibold font-mono">
          🔥 {{ maxCombo }}
        </span>
      </div>
    </div>

    <button
      class="px-8 py-3 rounded-full bg-theme-accent hover:bg-theme-accent-hover text-stone-900 font-bold font-lao text-base shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
      @click="emit('restart')"
    >
      ລອງໃໝ່ອີກຄັ້ງ (Try Again)
    </button>
  </section>
</template>
