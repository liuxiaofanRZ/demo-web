<script setup>
import { onMounted, reactive, ref } from 'vue';

let state = reactive({
  count: 3,
  list: [2, 3, 4]
})
function plus() {
  state.list = state.list.map(item => item + 10)
  state.count++
}
</script>

<template>
  <main>
    {{state.count}}
    <div v-for="item in state.list" :key="item">{{item}}</div>
    <button @click="plus">plus</button>
  </main>
</template>
