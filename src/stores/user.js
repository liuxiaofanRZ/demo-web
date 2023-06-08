import { defineStore } from 'pinia'
import { userLogin } from '@/api'
import { StorageSerializers, useStorage } from '@vueuse/core'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const userinfo = useStorage('pinia_user_userinfo', null, undefined, {
    serializer: StorageSerializers.object,
  })
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
    userinfo.value = null
    router.push('Login')
  }

  return { userinfo, login, logout }
})
