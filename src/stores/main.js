import { ref } from 'vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const EnumDeviceType = {
  desktop: 'DESKTOP',
  mobile: 'MOBILE',
}
export const useMainStore = defineStore('main', () => {
  const collapsed = ref(false) // 侧边栏收缩状态
  const deviceType = ref(EnumDeviceType.desktop) // 响应式布局状态
  const setCollapsed = (value) => {
    collapsed.value = value
  }
  const setDeviceType = (value) => {
    deviceType.value = value
  }

  const isDesktop = computed(() => deviceType.value === EnumDeviceType.desktop)
  const isMobile = computed(() => deviceType.value === EnumDeviceType.mobile)

  return { collapsed, setCollapsed, setDeviceType, isDesktop, isMobile }
})
