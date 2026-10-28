<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    stars: number; // 0–3
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;
  }>(),
  { size: 'md', animated: false }
);

const sizeClass = {
  sm: 'w-3.5 h-3.5',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
};
</script>

<template>
  <div class="flex items-center gap-0.5" :aria-label="`${stars} out of 3 stars`">
    <svg
      v-for="i in 3"
      :key="i"
      :class="[
        sizeClass[size],
        animated ? 'star-animate' : '',
        i <= stars ? 'text-theme-accent drop-shadow-[0_0_4px_var(--color-theme-accent-glow)]' : 'text-theme-subtle/40',
      ]"
      :style="animated ? `animation-delay: ${(i - 1) * 80}ms` : ''"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  </div>
</template>

<style scoped>
@keyframes starPop {
  0%   { transform: scale(0.5) rotate(-15deg); opacity: 0; }
  60%  { transform: scale(1.25) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.star-animate {
  animation: starPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .star-animate { animation: none; }
}
</style>
