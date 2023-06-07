import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userLogin } from '@/api'
import router from '@/router'
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
  const logout = async () => {
    router.push('Login')
  }

  return { userinfo, login, logout }
})
