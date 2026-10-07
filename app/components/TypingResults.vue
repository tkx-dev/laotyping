<script setup lang="ts">
defineProps<{
  wpm: number;
  accuracy: number;
  cpm: number;
  correctWordsCount: number;
  incorrectWordsCount: number;
  elapsedSeconds: number;
  totalKeystrokes: number;
}>();

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
          class="text-xs text-theme-muted uppercase tracking-wider font-semibold"
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
          class="text-xs text-theme-muted uppercase tracking-wider font-semibold"
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
          class="text-xs text-theme-muted uppercase tracking-wider font-semibold"
        >
          CPM (ອັກສອນ/ນາທີ)
        </span>
      </div>
    </div>

    <div
      class="flex justify-center gap-6 mb-8 text-sm text-theme-muted font-mono"
    >
      <div>
        <span>ຄຳທີ່ຖືກ: </span>
        <span class="text-theme-correct font-semibold">
          {{ correctWordsCount }}
        </span>
      </div>
      <div>
        <span>ຄຳທີ່ຜິດ: </span>
        <span class="text-theme-incorrect font-semibold">
          {{ incorrectWordsCount }}
        </span>
      </div>
      <div>
        <span>ເວລາ: </span>
        <span class="text-theme-primary font-semibold">
          {{ elapsedSeconds }}s
        </span>
      </div>
      <div>
        <span>ກົດແປ້ນ: </span>
        <span class="text-theme-primary font-semibold">
          {{ totalKeystrokes }}
        </span>
      </div>
    </div>

    <button
      class="px-8 py-3 rounded-full bg-theme-accent hover:bg-theme-accent-hover text-stone-900 font-lao font-bold text-base shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
      @click="emit('restart')"
    >
      ລອງໃໝ່ອີກຄັ້ງ (Try Again)
    </button>
  </section>
</template>
