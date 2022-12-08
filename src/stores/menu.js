import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMenuTree } from '@/api'

export const useMenuStore = defineStore('menu', () => {
    const menuList = ref([])
    
    const getMenu = async () =>{
      let res = await getMenuTree()
      menuList.value = res.result
    }
    

  return { menuList, getMenu }
})
