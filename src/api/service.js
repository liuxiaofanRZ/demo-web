import { message } from 'ant-design-vue'
import axios from 'axios'
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
})

http.interceptors.request.use(
  (config) => {
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
http.interceptors.response.use(
  (response) => {
    let data = response.data
    if(data&&data.success) {
      // 这样写不合适，data不总是{success:true,result:{}}这样统一规范的对象。
      // return data.result 
      return data
    } else {
      message.error(data.message)
      return Promise.reject(data.message)
    }
  },
  (err) => {
    if (err.code === 'ECONNABORTED') {
      message.error('请求超时')
    } else if (err.code === 'ERR_NETWORK') {
      message.error('网络错误')
    }
    return Promise.reject(err)
  }
)

export default http
