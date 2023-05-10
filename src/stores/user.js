import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userLogin } from '@/api'
export const useUserStore = defineStore('login', () => {
  const userinfo = ref(null)

  const login = async (params) => {
    let res = await userLogin(params).catch((err) => err)
    if (res.success) {
      userinfo.value = res.result
    } else {
      userinfo.value = null
    }
    return res
  }

  return { userinfo, login }
})
