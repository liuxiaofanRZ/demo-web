import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// mock
import '../mock'
// 全局样式
import './assets/main.css'
// antd
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(createPinia())
app.use(Antd)
 // 添加全局antd message方法
message.config({
  duration: 1.5,
  maxCount: 5,
})
app.config.globalProperties.$message = message
app.use(router)
app.mount('#app')
