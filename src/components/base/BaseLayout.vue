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
.base-header {
  z-index: 20;
  height: 60px;
  box-shadow: 0 1px 2px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.1));
  position: relative;
}
.base-container {
  height: calc(100vh - 60px);
  display: flex;
}
.base-side {
  overflow-y: auto;
  height: 100%;
  width: 220px;
  z-index: 10;
  // border-right: 1px solid #c0c6cc;
}
.base-content {
  padding: 20px 20px 20px;
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
</style>
