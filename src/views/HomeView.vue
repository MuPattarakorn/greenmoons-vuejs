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
button.secondary {
  background-color: #fde7e8;
  border: 1px solid #fde7e8;
}
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
}
.detail {
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 0px 10px;
  align-items: center;
}
</style>

// ---------------------------------------------------------------------------------

<template>
  <div>
    <h1>TO-DO LIST</h1>

    <AutoComponent
      text="Hello Mu, Just do it :)"
      :clickme="
        () => {
          console.log('object')
        }
      "
    />

    <hr />

    <!-- Do example here -->

    <div :style="{ display: 'flex', gap: '10px', paddingTop: '10px' }">
      <input type="text" v-model="inputValue" placeholder="Add a task..." />

      <button @click="createTodoList">create</button>
    </div>

    <div
      v-for="(item, index) in state.todo"
      :key="index"
      :style="{
        border: '1px solid #fab7b9',
        borderRadius: '10px',
        padding: '10px',
        margin: '10px 0',
        display: 'flex',
        justifyContent: 'space-between',
      }"
    >
      <div class="detail" v-if="selectedData.id !== item.id">
        {{ index + 1 }}. {{ item.description }}
      </div>

      <div class="detail" v-else :style="{ paddingRight: '50px' }">
        {{ index + 1 }}.
        <input class="input-text" type="text" v-model="selectedData.description" />
        <button class="secondary" @click="updateTodoList(item.id)">Save</button>
        <button class="secondary" @click="onClose">Cancel</button>
      </div>

      <div
        :style="{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
        }"
      >
        <button @click="goDetail(item.id)">Detail</button>
        <button @click="onEditData(item)">Edit</button>
        <button @click="deleteTodoList(item.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AutoComponent from '@/components/AutoComponent.vue'
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// ---------------------------------------------------------------------------------

onMounted(() => {
  fetchTodoList()
})

// --------------------------- State management Pinia ---------------------------

const { ENDPOINT } = useCounterStore()

// --------------------------- Router ---------------------------

const router = useRouter()

// --------------------------- Type ---------------------------

type TTodoData = {
  completed: boolean
  created_at: string
  description: string
  id: number
  updated_at: string
}

type TTodoResponse = {
  data: Array<TTodoData>
  success: boolean
}

type TTodoDeleteResponse = {
  data: number
  success: boolean
}

// --------------------------- State ---------------------------

const inputValue = ref('')
const isLoading = ref(false)
const selectedData = ref<TTodoData>({} as TTodoData)

// use isLoading.value = true

const state = reactive<{
  todo: Array<TTodoData>
}>({
  todo: [],
})
// use state.todo = []

// --------------------------- Function ---------------------------

const onEditData = (data: TTodoData) => {
  selectedData.value = { ...data }
}

const onClose = () => {
  selectedData.value = { ...({} as TTodoData) }
}

// --------------------------- Api ---------------------------

const fetchTodoList = async () => {
  isLoading.value = true

  const { data } = await axios.get<TTodoResponse>(`${ENDPOINT}/api/todos`)
  state.todo = data.data

  isLoading.value = false
}

const goDetail = (id: number) => {
  router.push(`/about/${id}`)
}

const createTodoList = async () => {
  const payload = {
    description: inputValue.value,
  }

  await axios.post(`${ENDPOINT}/api/todos`, payload)
  inputValue.value = ''
  fetchTodoList()
}

const deleteTodoList = async (id: number) => {
  const { data } = await axios.delete<TTodoDeleteResponse>(`${ENDPOINT}/api/todos/${id}`)

  state.todo = state.todo.filter((item) => item.id !== data.data)
}

const updateTodoList = async (id: number) => {
  const payload = {
    description: selectedData.value.description,
    completed: true,
  }

  await axios.put(`${ENDPOINT}/api/todos/${id}`, payload)
  onClose()
  fetchTodoList()
}
</script>

<style scoped></style>
