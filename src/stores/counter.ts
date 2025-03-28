import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const ENDPOINT = 'https://todo-api-606352320440.asia-southeast1.run.app' as const

  return { count, doubleCount, increment, ENDPOINT }
})
