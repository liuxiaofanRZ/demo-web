<template>
  <div class="login">
    <a-card title="登录" style="width: 400px">
      <a-form
        :model="modelRef"
        :rules="rulesRef"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="账号" name="username">
          <a-input v-model:value="modelRef.username" />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="modelRef.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="modelRef.remember">记住密码</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button :loading="loading" type="primary" html-type="submit">
            登录
          </a-button>
          <router-link style="margin-left: 10px" :to="{ name: 'Register' }"
            >注册</router-link
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { ref,onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
const userStore = useUserStore()
const menuStore = useMenuStore()
const router = useRouter()

onMounted(()=>{
  // 清除路由
  router.$clearRoutes()
})

// 登录表单
const modelRef = ref({
  username: '',
  password: '',
  remember: true,
})
const rulesRef = ref({
  username: [{ required: true, message: '请输入账号！' }],
  password: [{ required: true, message: '请输入密码！' }],
})
const loading = ref(false)
const onFinish = async (values) => {
  loading.value = true
  let res = await userStore.login(values).finally(() => {
    loading.value = false
  })
  if (res.success) {
    message.success(res.message)
    router.push({ name: 'Base' })
  }
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<style lang="less">
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
}
</style>
