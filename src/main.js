import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// antd
import { Modal, message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/modal/style/css'

// import 'ant-design-vue/dist/antd.css'

// 全局样式
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
// app.use(Antd)
// 添加全局antd message方法
message.config({
  duration: 1.5,
  maxCount: 5,
})
app.config.globalProperties.$message = message
app.config.globalProperties.$Modal = Modal
app.use(router)
app.mount('#app')
