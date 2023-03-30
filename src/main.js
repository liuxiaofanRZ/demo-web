import "./main.css" // 首先引入taiwind样式，以防覆盖其他库，如antdv的样式
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// antd
import  { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'
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
app.use(router)
app.mount('#app')
