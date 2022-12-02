<template>
  <BaseHeader />
  <div class="base-container">
    <BaseSide />
    <BaseContent />
  </div>
</template>

<script setup>
import BaseHeader from './BaseHeader.vue'
import BaseSide from './BaseSide.vue'
import BaseContent from './BaseContent.vue'
</script>

<style lang="less">
@import "../base.less";
</style>