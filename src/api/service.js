import router from '@/router'
import { useUserStore } from '@/stores/user'
import { Modal, message } from 'ant-design-vue'
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
})

http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.userinfo?.token) {
      config.headers.token = userStore.userinfo?.token
    }

    // 为get请求增加时间参数，防止缓存
    if (config.method.toLowerCase() === 'get') {
      config.params = Object.assign(
        {
          _t: Date.parse(new Date()) / 1000,
        },
        config.params
      )
    }
    return config
  },
  (err) => {
    return err
  }
)

let isLoggingOut = false
http.interceptors.response.use(
  (response) => {
    // 接口调用成功
    let data = response.data
    if (data) {
      if (data.success) {
        // 接口调用成功，业务请求成功
        return data
      } else {
        // 接口调用成功，业务请求失败
        if (data.code === 401) {
          // 401
          if (isLoggingOut) {
            // 正在登出中
          } else {
            isLoggingOut = true
            Modal.error({
              keyboard: false,
              title: '提示',
              content: data.message,
              onOk: () => {
                isLoggingOut = false
                router.push({ name: 'Login' })
              },
            })
          }
          return Promise.reject(data)
        } else {
          message.error(data.message)
          return Promise.reject(data)
        }
      }
    } else {
      return Promise.reject(response)
    }
  },
  (err) => {
    if (err.code === 'ECONNABORTED') {
      message.error('请求超时')
    } else if (err.code === 'ERR_NETWORK') {
      message.error('网络错误')
    } else {
      console.log('其他错误')
    }
    return Promise.reject(err)
  }
)

export default http
