<script setup lang="ts">
const props = defineProps<{
  current: number;
  total: number;
  label?: string;
}>();

const pct = computed(() =>
  props.total > 0 ? Math.round((props.current / props.total) * 100) : 0
);
</script>

<template>
  <div class="w-full" :aria-label="label ?? `${current} of ${total} completed`">
    <div class="relative h-1.5 rounded-full bg-theme-subtle/20 overflow-hidden">
      <div
        class="absolute inset-y-0 left-0 rounded-full bg-theme-accent transition-all duration-700 ease-out"
        :style="{ width: `${pct}%` }"
        role="progressbar"
        :aria-valuenow="current"
        :aria-valuemin="0"
        :aria-valuemax="total"
      />
      <!-- Shimmer overlay on active progress -->
      <div
        v-if="pct > 0 && pct < 100"
        class="absolute inset-y-0 left-0 rounded-full opacity-40"
        :style="{ width: `${pct}%`, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 1.8s infinite' }"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  div[style*="shimmer"] { animation: none; }
}
</style>
