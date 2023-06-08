import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMenuTree } from '@/api'

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref([])

  const getMenu = async () => {
    let res = await getMenuTree()
    menuList.value = res.result
  }
  const setMenuList = (list = []) => {
    menuList.value = list
  }

  return { menuList, getMenu, setMenuList }
})
