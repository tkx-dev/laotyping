<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
  }>(),
  {
    title: "ຢືນຢັນການເລີ່ມໃໝ່",
    message:
      "ທ່ານຕ້ອງການປ່ຽນຊຸດຂໍ້ຄວາມ ແລະ ເລີ່ມຕົ້ນໃໝ່ແທ້ບໍ່? ຄວາມຄືບໜ້າໃນປະຈຸບັນຈະບໍ່ຖືກບັນທຶກ.",
    confirmText: "ຢືນຢັນ (ເລີ່ມໃໝ່)",
    cancelText: "ຍົກເລີກ",
  },
);

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

function handleKeydown(e: KeyboardEvent) {
  if (!props.isOpen) return;

  if (e.key === "Escape") {
    e.preventDefault();
    e.stopPropagation();
    emit("cancel");
  } else if (e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
    emit("confirm");
  } else if (e.key === "Tab") {
    // Prevent Tab from triggering another restart or navigating away unexpectedly
    e.preventDefault();
    e.stopPropagation();
  }
}

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      window.addEventListener("keydown", handleKeydown, true);
    } else {
      window.removeEventListener("keydown", handleKeydown, true);
    }
  },
);

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown, true);
});
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      @click.self="emit('cancel')"
    >
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-2"
      >
        <div
          v-if="isOpen"
          class="bg-theme-surface border border-theme-border/60 rounded-2xl shadow-2xl p-6 sm:p-7 max-w-md w-full relative overflow-hidden backdrop-blur-xl animate-in"
        >
          <!-- Warning Accent Top Line -->
          <div
            class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-theme-accent to-amber-400"
          />

          <!-- Header / Icon & Title -->
          <div class="flex items-start gap-4 mb-4">
            <div
              class="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 shadow-inner"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
                />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <div>
              <h3
                class="text-lg font-bold font-lao text-theme-primary leading-tight"
              >
                {{ title }}
              </h3>
              <p class="text-xs font-mono text-amber-400/90 font-medium mt-0.5">
                Notice / ແຈ້ງເຕືອນ
              </p>
            </div>
          </div>

          <!-- Message Body -->
          <div class="mb-6">
            <p class="text-sm font-lao text-theme-muted leading-relaxed">
              {{ message }}
            </p>

            <!-- Keyboard shortcut hint -->
            <div
              class="mt-3 flex items-center gap-2 text-xs text-theme-muted/80 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 font-mono"
            >
              <span class="inline-flex items-center gap-1">
                <kbd
                  class="px-1.5 py-0.5 bg-white/10 rounded text-[11px] font-bold text-theme-primary"
                  >Enter</kbd
                >
                <span>ຢືນຢັນ</span>
              </span>
              <span class="text-white/20">•</span>
              <span class="inline-flex items-center gap-1">
                <kbd
                  class="px-1.5 py-0.5 bg-white/10 rounded text-[11px] font-bold text-theme-primary"
                  >Esc</kbd
                >
                <span>ຍົກເລີກ</span>
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-3 font-lao">
            <button
              type="button"
              class="px-4 py-2 rounded-xl text-sm font-medium text-theme-muted hover:text-theme-primary hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
              @click="emit('cancel')"
            >
              {{ cancelText }}
            </button>
            <button
              type="button"
              class="px-5 py-2 rounded-xl text-sm font-bold bg-theme-accent hover:bg-theme-accent-hover text-stone-900 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              @click="emit('confirm')"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
