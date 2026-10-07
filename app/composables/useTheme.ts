import { ref, onMounted } from 'vue'

export type ThemeName = 'coffee' | 'cyber' | 'midnight'

export interface ThemeOption {
  id: ThemeName
  name: string
  labelLao: string
  dotColor: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'coffee', name: 'Coffee & Cream', labelLao: 'ກາເຟ & ຄຣີມ', dotColor: '#eab308' },
  { id: 'cyber', name: 'Cyber Neon', labelLao: 'ໄຊເບີ ນີອອນ', dotColor: '#06b6d4' },
  { id: 'midnight', name: 'Midnight', labelLao: 'ມິດໄນທ໌', dotColor: '#a855f7' }
]

export function useTheme() {
  const currentTheme = ref<ThemeName>('coffee')

  function setTheme(t: ThemeName) {
    currentTheme.value = t
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t)
      localStorage.setItem('laotype-theme', t)
    }
  }

  onMounted(() => {
    const saved = localStorage.getItem('laotype-theme') as ThemeName | null
    if (saved && (saved === 'coffee' || saved === 'cyber' || saved === 'midnight')) {
      setTheme(saved)
    } else {
      setTheme('coffee')
    }
  })

  return {
    currentTheme,
    setTheme,
    THEME_OPTIONS
  }
}
