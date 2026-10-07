import { ref, computed } from 'vue'
import { getRandomLaoWords } from '../data/words'

export type TestMode = 'time' | 'words'
export type TimeOption = 15 | 30 | 60
export type WordOption = 10 | 25 | 50
export type EngineStatus = 'idle' | 'running' | 'finished'

export interface WordHistory {
  target: string
  typed: string
  isCorrect: boolean
}

export function useTypingEngine() {
  const mode = ref<TestMode>('time')
  const timeLimit = ref<TimeOption>(30)
  const wordLimit = ref<WordOption>(25)

  const status = ref<EngineStatus>('idle')
  const words = ref<string[]>([])
  const currentWordIndex = ref(0)
  const currentInput = ref('')
  const wordHistory = ref<WordHistory[]>([])

  // Statistics
  const totalKeystrokes = ref(0)
  const correctKeystrokes = ref(0)
  const incorrectKeystrokes = ref(0)
  const timer = ref<number | null>(null)
  const timeLeft = ref(30)
  const startTime = ref<number | null>(null)
  const endTime = ref<number | null>(null)

  // Initialize or reset test
  function initTest() {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }

    status.value = 'idle'
    currentWordIndex.value = 0
    currentInput.value = ''
    wordHistory.value = []
    totalKeystrokes.value = 0
    correctKeystrokes.value = 0
    incorrectKeystrokes.value = 0
    startTime.value = null
    endTime.value = null

    if (mode.value === 'time') {
      timeLeft.value = timeLimit.value
      // Generate enough words for the time duration (e.g. 100 words)
      words.value = getRandomLaoWords(120)
    } else {
      words.value = getRandomLaoWords(wordLimit.value)
      timeLeft.value = 0
    }
  }

  // Pre-populate words on initialization (SSR & client)
  initTest()

  function startTimer() {
    if (status.value === 'running') return
    status.value = 'running'
    startTime.value = Date.now()

    if (mode.value === 'time') {
      timer.value = window.setInterval(() => {
        if (timeLeft.value > 1) {
          timeLeft.value--
        } else {
          timeLeft.value = 0
          finishTest()
        }
      }, 1000)
    }
  }

  function finishTest() {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
    endTime.value = Date.now()
    status.value = 'finished'

    // Commit current word if any
    if (currentInput.value.length > 0) {
      const target = words.value[currentWordIndex.value] || ''
      wordHistory.value.push({
        target,
        typed: currentInput.value,
        isCorrect: currentInput.value === target
      })
    }
  }

  const elapsedSeconds = computed(() => {
    if (!startTime.value) return 0
    const end = endTime.value || (status.value === 'running' ? Date.now() : startTime.value)
    return Math.max(1, Math.round((end - startTime.value) / 1000))
  })

  // WPM standard calculation: (Net characters / 5) / (minutes)
  const wpm = computed(() => {
    const elapsedMinutes = elapsedSeconds.value / 60
    if (elapsedMinutes <= 0) return 0

    // Count correct characters in completed words
    let correctChars = 0
    for (const h of wordHistory.value) {
      if (h.isCorrect) {
        // add length of target + 1 for space
        correctChars += h.target.length + 1
      } else {
        // partial match characters
        for (let i = 0; i < Math.min(h.target.length, h.typed.length); i++) {
          if (h.target[i] === h.typed[i]) correctChars++
        }
      }
    }

    // Add current word matching characters
    const currentTarget = words.value[currentWordIndex.value] || ''
    for (let i = 0; i < Math.min(currentTarget.length, currentInput.value.length); i++) {
      if (currentTarget[i] === currentInput.value[i]) {
        correctChars++
      }
    }

    const calculatedWpm = Math.round((correctChars / 5) / elapsedMinutes)
    return isNaN(calculatedWpm) || calculatedWpm < 0 ? 0 : calculatedWpm
  })

  // CPM (Characters Per Minute)
  const cpm = computed(() => {
    const elapsedMinutes = elapsedSeconds.value / 60
    if (elapsedMinutes <= 0) return 0
    return Math.round(wpm.value * 5)
  })

  // Accuracy %
  const accuracy = computed(() => {
    if (totalKeystrokes.value === 0) return 100
    const acc = Math.round((correctKeystrokes.value / totalKeystrokes.value) * 100)
    return Math.max(0, Math.min(100, acc))
  })

  // Handle keystroke input
  function handleInput(e: Event) {
    if (status.value === 'finished') return

    const inputTarget = e.target as HTMLInputElement
    const rawVal = inputTarget.value

    if (status.value === 'idle' && rawVal.length > 0) {
      startTimer()
    }

    // Check if user hit Space
    if (rawVal.endsWith(' ')) {
      const typed = rawVal.trimEnd()
      if (typed.length > 0) {
        const target = words.value[currentWordIndex.value] || ''
        const isCorrect = typed === target

        wordHistory.value.push({
          target,
          typed,
          isCorrect
        })

        currentWordIndex.value++
        currentInput.value = ''
        inputTarget.value = ''

        // Check if finished in words mode
        if (mode.value === 'words' && currentWordIndex.value >= words.value.length) {
          finishTest()
        }
      } else {
        inputTarget.value = ''
      }
      return
    }

    // Current target word
    const targetWord = words.value[currentWordIndex.value] || ''
    const previousLength = currentInput.value.length

    // Check if typed characters exceed targetWord length (e.g. 5th char on a 4-char word)
    if (rawVal.length > targetWord.length) {
      // The current word is completed with the first targetWord.length characters
      const currentWordTyped = rawVal.slice(0, targetWord.length)
      const overflowChars = rawVal.slice(targetWord.length)

      // Count keystrokes for characters up to targetWord.length
      for (let i = previousLength; i < targetWord.length; i++) {
        totalKeystrokes.value++
        if (rawVal[i] === targetWord[i]) {
          correctKeystrokes.value++
        } else {
          incorrectKeystrokes.value++
        }
      }

      // Commit the current word
      wordHistory.value.push({
        target: targetWord,
        typed: currentWordTyped,
        isCorrect: currentWordTyped === targetWord
      })

      currentWordIndex.value++

      // Check if finished in words mode
      if (mode.value === 'words' && currentWordIndex.value >= words.value.length) {
        currentInput.value = ''
        inputTarget.value = ''
        finishTest()
        return
      }

      // The overflow character(s) become the input of the next word
      currentInput.value = overflowChars
      inputTarget.value = overflowChars

      // Count keystroke for the overflow character on the new word
      const nextTargetWord = words.value[currentWordIndex.value] || ''
      for (let i = 0; i < overflowChars.length; i++) {
        totalKeystrokes.value++
        if (overflowChars[i] === nextTargetWord[i]) {
          correctKeystrokes.value++
        } else {
          incorrectKeystrokes.value++
        }
      }
      return
    }

    // Normal typing within the length limit
    const currentLength = rawVal.length
    if (currentLength > previousLength) {
      const addedChar = rawVal[currentLength - 1]
      const expectedChar = targetWord[currentLength - 1]

      totalKeystrokes.value++
      if (addedChar === expectedChar) {
        correctKeystrokes.value++
      } else {
        incorrectKeystrokes.value++
      }
    }

    currentInput.value = rawVal
  }

  // Handle keydown (Backspace to go back and edit previous word)
  function handleKeydown(e: KeyboardEvent) {
    if (status.value === 'finished') return

    if (e.key === 'Backspace') {
      // If current input is empty and we have a previous word to go back to
      if (currentInput.value.length === 0 && currentWordIndex.value > 0) {
        e.preventDefault()
        currentWordIndex.value--
        const prevWord = wordHistory.value.pop()
        currentInput.value = prevWord ? prevWord.typed : ''

        const inputTarget = e.target as HTMLInputElement
        if (inputTarget) {
          inputTarget.value = currentInput.value
        }
      }
    }
  }

  function setMode(newMode: TestMode) {
    mode.value = newMode
    initTest()
  }

  function setTimeLimit(seconds: TimeOption) {
    timeLimit.value = seconds
    mode.value = 'time'
    initTest()
  }

  function setWordLimit(count: WordOption) {
    wordLimit.value = count
    mode.value = 'words'
    initTest()
  }

  return {
    mode,
    timeLimit,
    wordLimit,
    status,
    words,
    currentWordIndex,
    currentInput,
    wordHistory,
    timeLeft,
    elapsedSeconds,
    wpm,
    cpm,
    accuracy,
    totalKeystrokes,
    correctKeystrokes,
    incorrectKeystrokes,
    initTest,
    handleInput,
    handleKeydown,
    setMode,
    setTimeLimit,
    setWordLimit
  }
}
