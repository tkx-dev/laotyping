<script setup lang="ts">
const emit = defineEmits<{
  (e: "restart"): void;
}>();
</script>

<template>
  <div class="flex justify-center items-center gap-3 mt-6">
    <button
      type="button"
      class="flex items-center gap-2 px-5 py-2 rounded-full bg-theme-surface/70 hover:bg-theme-surface border border-theme-border-subtle hover:border-theme-border text-theme-muted hover:text-theme-primary text-sm font-medium transition-all hover:-translate-y-0.5 cursor-pointer shadow-md select-none"
      @mousedown.prevent
      @click="emit('restart')"
    >
      <svg
        width="15"
        height="15"
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
      <span class="font-lao">ເລີ່ມໃໝ່</span>
      <span
        class="font-mono text-[11px] bg-white/10 px-1.5 py-0.5 rounded text-theme-muted"
      >
        Tab
      </span>
    </button>
  </div>
</template>
