<template>
  <a-card title="注册">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="账号"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
        <a-checkbox v-model:checked="formState.remember"
          >记住密码</a-checkbox
        >
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { userRegister } from '@/api/index.js'
import { message } from 'ant-design-vue';
const formState = ref({
  username: '',
  password: '',
  remember: true,
})
const onFinish = async (values) => {
  console.log('Success:', values)
  let res = await userRegister(Object.assign({teachers:[{name:'lili'}]},values,))
  if(res.success) {
    message.success(res.message)
  }
  console.log(res)
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<style lang="less"></style>
