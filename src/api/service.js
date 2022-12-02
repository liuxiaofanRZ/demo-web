import { message } from 'ant-design-vue'
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://127.0.0.1:8081',
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
    return data
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
