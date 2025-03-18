<style scoped>
button {
  font-weight: bold;
  border: 1px solid #fccfd1;
  border-radius: 10px;
  padding: 12px 20px;
  margin: 8px 0;
  background-color: #fccfd1;
  cursor: pointer;
}
</style>

<template>
  <div>
    <h1>Detail ID : {{ $route.params.id }}</h1>
    <hr />
    <div
      :style="{
        border: '1px solid #fab7b9',
        borderRadius: '10px',
        margin: '20px 0px',
        display: 'flex',
        justifyContent: 'space-between',
      }"
    >
      <div
        :style="{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10x',
          margin: '10px',
        }"
      >
        {{ state.todo.description }}
      </div>
    </div>
  </div>
  <button @click="goHomePage">Go Homepage</button>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { ENDPOINT } = useCounterStore()

// --------------------------- Route ---------------------------

const route = useRoute()

const router = useRouter()

// get id in script => route.params.id

onMounted(() => {
  fetchTodoDetail()
})

const state = reactive<{
  todo: {
    completed: boolean
    created_at: string
    description: string
    id: number
    updated_at: string
  }
}>({
  todo: {
    completed: false,
    created_at: '',
    description: '',
    id: 0,
    updated_at: '',
  },
})

// --------------------------- Function ---------------------------

const fetchTodoDetail = async () => {
  const { data } = await axios.get<{
    data: {
      completed: boolean
      created_at: string
      description: string
      id: number
      updated_at: string
    }
  }>(`${ENDPOINT}/api/todos/${route.params.id}`)

  state.todo = data.data
}

const goHomePage = () => {
  router.push('/')
}
</script>

<style scoped></style>
