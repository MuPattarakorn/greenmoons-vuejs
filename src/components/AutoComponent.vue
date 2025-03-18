<template>
  <div :style="{ paddingBottom: '20px' }">
    <h1>Auto components : {{ text }}</h1>

    <button @click="clickme" :style="{ marginTop: '10px' }">click me</button>
  </div>
</template>

<script setup lang="ts">
type Props = {
  text: string
  clickme: () => void
}

const { text, clickme } = defineProps<Props>()

// defineProps(['text', 'clickme'])

// const props = defineProps<Props>()
// props.text
</script>

<style scoped></style>
