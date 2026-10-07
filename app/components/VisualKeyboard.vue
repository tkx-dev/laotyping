<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  KEYBOARD_ROWS,
  findKeyForChar,
  FINGER_NAMES,
  type KeyDefinition,
  type Finger,
} from "../data/keyboardData";

const props = withDefaults(
  defineProps<{
    nextChar?: string | null;
    targetChar?: string | null;
    isError?: boolean;
    isSpace?: boolean;
  }>(),
  {
    nextChar: null,
    targetChar: null,
    isError: false,
    isSpace: false,
  },
);

// Settings state
const legendMode = ref<"both" | "lao" | "en">("lao");
const showSettingsMenu = ref(false);

// Physical keys currently pressed by user
const pressedKeyCodes = ref<Set<string>>(new Set());

// Determine the active target key match
const currentMatch = computed(() => {
  if (props.isError) {
    return findKeyForChar("Backspace");
  }
  if (props.isSpace) {
    return findKeyForChar(" ");
  }
  if (!props.nextChar) return null;
  return findKeyForChar(props.nextChar);
});

// Active key code and finger
const activeKeyCode = computed(() => currentMatch.value?.code ?? null);
const isShiftRequired = computed(() => currentMatch.value?.isShift ?? false);
const activeFinger = computed<Finger | null>(
  () => currentMatch.value?.finger ?? null,
);
const shiftFinger = computed<Finger | null>(() => {
  if (!isShiftRequired.value) return null;
  return currentMatch.value?.shiftFinger ?? "left-pinky";
});

// Which shift key to light up
const activeShiftCode = computed(() => {
  if (!isShiftRequired.value) return null;
  return shiftFinger.value === "left-pinky" ? "ShiftLeft" : "ShiftRight";
});

// Guide message
const guideMessage = computed(() => {
  if (props.isError) {
    return {
      action: "ກົດ Backspace ເພື່ອລຶບ",
      finger: FINGER_NAMES["right-pinky"].lao,
      enFinger: FINGER_NAMES["right-pinky"].en,
      isWarning: true,
    };
  }
  if (props.isSpace) {
    return {
      action: "ກົດຍະຫວ່າງ (Space)",
      finger: FINGER_NAMES["right-thumb"].lao,
      enFinger: FINGER_NAMES["right-thumb"].en,
      isWarning: false,
    };
  }
  if (!activeFinger.value) {
    return null;
  }

  const fingerInfo = FINGER_NAMES[activeFinger.value];
  if (isShiftRequired.value) {
    const sInfo = shiftFinger.value ? FINGER_NAMES[shiftFinger.value] : null;
    return {
      action: `ກົດ Shift (${sInfo?.lao}) + ປຸ່ມ ${currentMatch.value?.keyDef.laoShift || currentMatch.value?.keyDef.lao}`,
      finger: `${fingerInfo.lao} (ພ້ອມ Shift)`,
      enFinger: `${fingerInfo.en} with Shift`,
      isWarning: false,
    };
  }

  return {
    action: `ກົດປຸ່ມ: ${currentMatch.value?.keyDef.lao || currentMatch.value?.keyDef.en}`,
    finger: fingerInfo.lao,
    enFinger: fingerInfo.en,
    isWarning: false,
  };
});

function handlePhysicalKeyDown(e: KeyboardEvent) {
  // Ignore shortcut key combinations (e.g. Cmd+R, Ctrl+R) to avoid stuck keys
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  pressedKeyCodes.value.add(e.code);
}

function handlePhysicalKeyUp(e: KeyboardEvent) {
  pressedKeyCodes.value.delete(e.code);
  // macOS Chrome suppresses keyup events while Command is held; clear on modifier release
  if (e.key === "Meta" || e.key === "Control" || e.key === "Alt") {
    pressedKeyCodes.value.clear();
  }
}

function handleWindowBlur() {
  pressedKeyCodes.value.clear();
}

function handleWindowFocus() {
  pressedKeyCodes.value.clear();
}

onMounted(() => {
  window.addEventListener("keydown", handlePhysicalKeyDown);
  window.addEventListener("keyup", handlePhysicalKeyUp);
  window.addEventListener("blur", handleWindowBlur);
  window.addEventListener("focus", handleWindowFocus);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handlePhysicalKeyDown);
  window.removeEventListener("keyup", handlePhysicalKeyUp);
  window.removeEventListener("blur", handleWindowBlur);
  window.removeEventListener("focus", handleWindowFocus);
});

function isKeyActive(key: KeyDefinition): boolean {
  return key.code === activeKeyCode.value;
}

function isKeyShiftActive(key: KeyDefinition): boolean {
  return isShiftRequired.value && key.code === activeShiftCode.value;
}

function isKeyPressed(key: KeyDefinition): boolean {
  return pressedKeyCodes.value.has(key.code);
}
</script>

<template>
  <div class="relative w-full max-w-4xl mx-auto mt-6 select-none font-sans">
    <!-- Top Bar: Settings & Live Finger Hint -->
    <div class="flex items-center justify-between mb-2 px-2 text-xs sm:text-sm">
      <!-- Live Finger Guidance Badge -->
      <div class="flex items-center gap-2">
        <template v-if="guideMessage">
          <div
            class="flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md transition-all shadow-sm"
            :class="
              guideMessage.isWarning
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                : 'bg-theme-surface/80 border-theme-border-subtle text-theme-primary'
            "
          >
            <span
              class="w-2 h-2 rounded-full animate-ping"
              :class="guideMessage.isWarning ? 'bg-rose-400' : 'bg-sky-400'"
            />
            <span class="font-medium font-phetsarath"
              >{{ guideMessage.action }}:</span
            >
            <span class="font-bold font-phetsarath text-theme-accent">
              {{ guideMessage.finger }}
            </span>
            <span class="text-xs text-theme-muted hidden md:inline">
              ({{ guideMessage.enFinger }})
            </span>
          </div>
        </template>
        <template v-else>
          <div class="text-xs text-theme-muted font-phetsarath">
            ເລີ່ມພິມເພື່ອເບິ່ງຄຳແນະນຳນິ້ວມື
          </div>
        </template>
      </div>

      <!-- Settings Dropdown Trigger (as in typing.com screenshot) -->
      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-surface/80 hover:bg-theme-surface border border-theme-border-subtle text-theme-muted hover:text-theme-primary transition-all text-xs font-mono cursor-pointer shadow-sm"
          @click="showSettingsMenu = !showSettingsMenu"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Keyboard Settings</span>
        </button>

        <!-- Settings Popup Menu -->
        <div
          v-if="showSettingsMenu"
          class="absolute right-0 top-full mt-2 w-56 bg-theme-surface/95 border border-theme-border rounded-xl shadow-2xl p-3 z-50 backdrop-blur-xl flex flex-col gap-3 font-sans text-xs"
        >
          <!-- Legend Mode -->
          <div class="flex flex-col gap-1.5">
            <span class="font-phetsarath text-theme-muted"
              >ຮູບແບບຕົວອັກສອນ (Legend):</span
            >
            <div class="grid grid-cols-3 gap-1 bg-stone-900/60 p-1 rounded-lg">
              <button
                type="button"
                class="py-1 rounded text-center font-phetsarath transition-all cursor-pointer"
                :class="
                  legendMode === 'lao'
                    ? 'bg-theme-accent text-stone-900 font-bold'
                    : 'text-theme-muted hover:text-theme-primary'
                "
                @click="legendMode = 'lao'"
              >
                ລາວ
              </button>
              <button
                type="button"
                class="py-1 rounded text-center font-phetsarath transition-all cursor-pointer"
                :class="
                  legendMode === 'en'
                    ? 'bg-theme-accent text-stone-900 font-bold'
                    : 'text-theme-muted hover:text-theme-primary'
                "
                @click="legendMode = 'en'"
              >
                English
              </button>
              <button
                type="button"
                class="py-1 rounded text-center font-phetsarath transition-all cursor-pointer"
                :class="
                  legendMode === 'both'
                    ? 'bg-theme-accent text-stone-900 font-bold'
                    : 'text-theme-muted hover:text-theme-primary'
                "
                @click="legendMode = 'both'"
              >
                ລາວ+EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN KEYBOARD CASING -->
    <div
      class="relative bg-stone-900/90 dark:bg-stone-900/90 border border-theme-border-subtle rounded-2xl p-2 sm:p-3 shadow-2xl backdrop-blur-2xl transition-all"
    >
      <!-- KEY ROWS CONTAINER -->
      <div class="flex flex-col gap-1 sm:gap-1.5 w-full">
        <div
          v-for="(row, rIdx) in KEYBOARD_ROWS"
          :key="rIdx"
          class="flex items-center gap-1 sm:gap-1.5 w-full"
        >
          <div
            v-for="key in row"
            :key="key.code"
            :data-key="key.code"
            class="relative flex flex-col justify-between items-center rounded-md sm:rounded-lg transition-all duration-100 select-none shadow-xs border"
            :class="[
              // Active target key highlight (as seen in typing.com: vibrant solid blue!)
              isKeyActive(key)
                ? 'bg-sky-500! text-white! border-sky-300 ring-2 ring-sky-400/80 shadow-lg shadow-sky-500/50 scale-[1.03] z-10'
                : isKeyShiftActive(key)
                  ? 'bg-amber-500! text-stone-900! border-amber-300 ring-2 ring-amber-400/80 shadow-md scale-[1.02] z-10'
                  : isKeyPressed(key)
                    ? 'bg-stone-700 border-white/20 scale-[0.97]'
                    : 'bg-stone-800/80 hover:bg-stone-800 border-white/8 text-stone-200',
              // Heights and layout
              'h-11 sm:h-13 md:h-14 pt-2 pb-1.5 px-2 sm:pt-2.5 sm:pb-2 sm:px-2.5',
            ]"
            :style="{
              flexGrow: key.width ?? 1,
              flexBasis: `${(key.width ?? 1) * 36}px`,
            }"
          >
            <!-- Keycap Legends -->
            <!-- Top Row: Shifted characters or Secondary -->
            <div
              class="w-full flex items-center justify-between px-0.5 pt-0.5 leading-none transition-colors"
            >
              <!-- Shifted Lao or EN -->
              <span
                v-if="
                  legendMode !== 'en' &&
                  key.laoShift &&
                  key.laoShift !== key.lao
                "
                class="font-phetsarath font-bold text-xs sm:text-sm tracking-normal transition-colors"
                :class="
                  isKeyActive(key)
                    ? 'text-white'
                    : isKeyShiftActive(key)
                      ? 'text-stone-950 font-bold'
                      : 'text-theme-accent opacity-90'
                "
              >
                {{ key.laoShift }}
              </span>
              <span
                v-else-if="
                  legendMode === 'en' && key.enShift && key.enShift !== key.en
                "
                class="font-mono text-xs sm:text-sm font-semibold transition-colors"
                :class="
                  isKeyActive(key)
                    ? 'text-white'
                    : isKeyShiftActive(key)
                      ? 'text-stone-950'
                      : 'text-stone-400 opacity-90'
                "
              >
                {{ key.enShift }}
              </span>
              <span v-else />

              <!-- English Letter Legend (QWERTY key) in top-right corner -->
              <span
                v-if="legendMode !== 'lao' && key.en && !key.isSpecial"
                class="text-[10px] sm:text-xs font-bold font-mono uppercase tracking-tight transition-colors"
                :class="
                  isKeyActive(key)
                    ? 'text-white/90'
                    : isKeyShiftActive(key)
                      ? 'text-stone-950/80'
                      : 'text-stone-400/80'
                "
              >
                {{ key.en }}
              </span>
            </div>

            <!-- Center: Primary Character (Prominent Lao glyph or special label) -->
            <div
              class="flex items-center justify-center my-auto leading-none transition-transform"
              :class="[
                key.isSpecial
                  ? 'text-[10px] sm:text-xs font-mono tracking-tight uppercase'
                  : 'text-sm sm:text-lg md:text-xl font-bold font-phetsarath',
                isKeyActive(key)
                  ? 'text-white drop-shadow-md scale-105'
                  : 'text-stone-100',
              ]"
            >
              <template v-if="key.isSpecial">
                {{ key.en }}
              </template>
              <template v-else-if="legendMode === 'en'">
                {{ key.en }}
              </template>
              <template v-else>
                {{ key.lao }}
              </template>
            </div>

            <!-- Tactile homing bumps on F and J (Home row index fingers) -->
            <div
              v-if="key.bump"
              class="w-3 sm:w-4 h-0.5 rounded-full"
              :class="isKeyActive(key) ? 'bg-white/80' : 'bg-stone-500/80'"
            />
            <div v-else class="h-0.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keycap subtle 3D lighting */
[data-key] {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
</style>
