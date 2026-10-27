<script setup lang="ts">
const emit = defineEmits<{
  (e: "restart"): void;
}>();
</script>

<template>
  <div class="flex justify-center items-center gap-3 mt-6">
    <button
      type="button"
      class="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-theme-surface/80 hover:bg-theme-surface border border-theme-border/40 hover:border-theme-accent/60 text-theme-muted hover:text-theme-primary text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-theme-accent/10 active:translate-y-0 cursor-pointer select-none"
      title="ເລີ່ມຕົ້ນທົດສອບໃໝ່ (Shortcut: Tab)"
      @mousedown.prevent
      @click="emit('restart')"
    >
      <svg
        class="w-4 h-4 text-theme-muted group-hover:text-theme-accent transition-transform duration-300 group-hover:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </svg>
      <span class="font-lao font-semibold">ເລີ່ມໃໝ່</span>
      <span
        class="font-mono text-[11px] font-bold bg-white/10 group-hover:bg-theme-accent/20 group-hover:text-theme-accent px-2 py-0.5 rounded-md text-theme-muted border border-white/5 transition-colors"
      >
        Tab
      </span>
    </button>
  </div>
</template>
