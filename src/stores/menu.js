import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMenuTree } from '@/api'

export const useMenuStore = defineStore('menu', () => {
    const menuData = ref([])
    
    const getMenu = async () =>{
      let res = await getMenuTree()
      menuData.value = res.result
    }
    

  return { menuData, getMenu }
})
