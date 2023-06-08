<template>
  <div class="register">
    <a-card title="注册" style="width: 400px">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="账号" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="确认密码" name="checkPassword">
          <a-input-password v-model:value="formState.checkPassword" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
          <a-button type="primary" html-type="submit">注册</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userRegister } from '@/api/index.js'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const formRef = ref()
const formState = ref({
  username: '',
  password: '',
  checkPassword: '',
  remember: true,
})

const rules = {
  username: [{ required: true, message: '请输入账号！' }],
  password: [
    {
      required: true,
      validator: (_rule, value) => {
        if (!value) {
          return Promise.reject('请输入密码！')
        } else {
          if (formState.value.checkPassword) {
            formRef.value.validateFields(['checkPassword'])
          }
          return Promise.resolve()
        }
      },
    },
  ],
  checkPassword: [
    {
      required: true,
      validator: (_rule, value) => {
        if (!value) {
          return Promise.reject('请输入密码！')
        } else if (value !== formState.value.password) {
          return Promise.reject('两次密码不相同！')
        } else {
          return Promise.resolve()
        }
      },
    },
  ],
}

const onFinish = async (values) => {
  console.log('Success:', values)
  let res = await userRegister(
    Object.assign({ teachers: [{ name: 'lili' }] }, values)
  )
  if (res.success) {
    message.success(res.message)
    setTimeout(router.back, 1000)
  }
  console.log(res)
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<style lang="less">
.register {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
}
</style>
