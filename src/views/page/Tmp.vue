<template>
  <div>{{ state }}</div>
</template>
<script setup>
import { useAsyncState } from '@vueuse/core'
import { getMenuTree } from '@/api'
const { state, isReady, isLoading } = useAsyncState(getMenuTree)
</script>
<style></style>
