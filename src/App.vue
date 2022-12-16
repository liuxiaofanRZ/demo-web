<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const componentSize = ref('middle')
</script>

<template>
  <AConfigProvider :component-size="componentSize" :locale="zhCN">
    <RouterView />
  </AConfigProvider>
</template>
