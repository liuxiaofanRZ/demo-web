<template>
  <div :bordered="false" class="bread-crumb">
    <router-link
      :to="item.path"
      class="bread-crumb-item"
      v-for="item in route.matched"
      :key="item.name"
    >
      {{ item.meta.title }}
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="less">
.bread-crumb {
  margin-bottom: 20px;
}
.bread-crumb-item {
  color: #666;
  &:last-child::after {
    content: "";
  }
  &::after {
    content: '>';
  }
  &:hover {
    text-decoration: underline;
  }
}
</style>
