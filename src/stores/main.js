import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export const EnumDeviceType = {
  desktop: 'DESKTOP',
  mobile: 'MOBILE',
}
export const useMainStore = defineStore('main', () => {
  const collapsed = useStorage('pinia_main_collapsed', false) // 侧边栏收缩状态
  const deviceType = useStorage('pinia_main_deviceType', EnumDeviceType.desktop) // 响应式布局状态
  const setCollapsed = (value) => {
    collapsed.value = value
  }
  const setDeviceType = (value) => {
    deviceType.value = value
  }

  const isDesktop = computed(() => deviceType.value === EnumDeviceType.desktop)
  const isMobile = computed(() => deviceType.value === EnumDeviceType.mobile)

  return {
    collapsed,
    deviceType,
    setCollapsed,
    setDeviceType,
    isDesktop,
    isMobile,
  }
})
