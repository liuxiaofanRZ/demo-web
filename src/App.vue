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
  <a-config-provider :component-size="componentSize" :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>
