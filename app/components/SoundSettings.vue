<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTypingSound } from "../composables/useTypingSound";

const {
  volume,
  isMuted,
  comboPitchEnabled,
  effectiveMuted,
  initSound,
  setVolume,
  toggleMute,
  toggleComboPitch,
} = useTypingSound();

const isOpen = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);

function toggleOpen() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    initSound();
  }
}

function handleVolumeChange(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value);
  setVolume(val);
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isOpen.value) {
    isOpen.value = false;
  }
}

onMounted(() => {
  initSound();
  window.addEventListener("click", handleClickOutside);
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div ref="containerRef" class="relative">
    <!-- Sound Pill Button in Header -->
    <button
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md shadow-xs select-none"
      :class="
        effectiveMuted
          ? 'bg-theme-surface/50 border-theme-border-subtle text-theme-muted hover:text-theme-primary'
          : 'bg-theme-surface/80 border-theme-border text-theme-primary hover:border-theme-accent/50 shadow-theme-accent/5'
      "
      :title="effectiveMuted ? 'ເປີດສຽງ (Sound Off)' : 'ປັບແຕ່ງສຽງ (Sound On)'"
      @click.stop="toggleOpen"
    >
      <!-- Speaker Icon -->
      <svg
        v-if="!effectiveMuted"
        class="w-3.5 h-3.5 text-theme-accent shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
      <svg
        v-else
        class="w-3.5 h-3.5 text-theme-muted shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="22" y1="9" x2="16" y2="15" />
        <line x1="16" y1="9" x2="22" y2="15" />
      </svg>

      <!-- Label -->
      <span class="hidden sm:inline font-mono text-[11px]">
        {{ effectiveMuted ? "MUTE" : "SOUND" }}
      </span>

      <!-- Dropdown Chevron -->
      <svg
        class="w-3 h-3 text-theme-muted transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <!-- Sound Popover Modal / Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-theme-surface/95 border border-theme-border/60 backdrop-blur-xl rounded-2xl shadow-2xl p-4 z-50 text-theme-primary font-sans text-xs"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div class="flex items-center gap-2">
            <span class="text-base">🔊</span>
            <div>
              <div class="font-bold text-sm text-theme-primary">ສຽງພິມ (Typing Sound)</div>
              <div class="text-[10px] text-theme-muted font-lao">Mechanical Keyboard</div>
            </div>
          </div>
          <button
            class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition-colors cursor-pointer"
            :class="
              effectiveMuted
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : 'bg-theme-accent/20 text-theme-accent border border-theme-accent/40'
            "
            @click="toggleMute"
          >
            {{ effectiveMuted ? "MUTED" : "ON" }}
          </button>
        </div>

        <!-- Volume Slider -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-1 text-[11px] text-theme-muted">
            <span class="font-lao">ລະດັບສຽງ (Volume)</span>
            <span class="font-mono text-theme-accent font-semibold">
              {{ Math.round(volume * 100) }}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            :value="volume"
            class="w-full accent-theme-accent cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
            @input="handleVolumeChange"
          />
        </div>

        <!-- Excitement Feature Toggle: Dynamic Combo Pitch -->
        <div
          class="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 cursor-pointer hover:bg-white/[0.05] transition-all"
          @click="toggleComboPitch"
        >
          <div class="flex items-center gap-2">
            <span class="text-sm">⚡</span>
            <div>
              <div class="text-[11px] font-bold text-theme-primary leading-tight">
                Combo Excitement Mode
              </div>
              <div class="text-[9px] text-theme-muted font-lao">
                ປ່ຽນສຽງໄລ່ໂນ໊ດຕາມ Streak
              </div>
            </div>
          </div>
          <div
            class="w-7 h-4 rounded-full transition-colors relative p-0.5 shrink-0"
            :class="comboPitchEnabled ? 'bg-theme-accent' : 'bg-white/20'"
          >
            <div
              class="w-3 h-3 rounded-full bg-stone-900 transition-transform"
              :class="comboPitchEnabled ? 'translate-x-3' : 'translate-x-0'"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
