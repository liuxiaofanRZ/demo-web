<template>
  <div class="UserActionModal">
    <a-modal
      v-model:visible="visible"
      :confirmLoading="confirmLoading"
      title="新增"
      @ok="onOk"
      @cancel="onCancel"
    >
      <a-form
        :model="formState"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        :rules="rules"
        ref="formRef"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="出生日期" name="birthday">
          <a-input v-model:value="formState.birthday" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { addUser, editUser } from '@/api'
import { useActionModal } from '@/utils/composable/useActionModal'
const emit = defineEmits(['onOk'])

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名！',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码！',
    },
  ],
  // birthday: [
  //   {
  //     required: true,
  //     message: '请输入用户名！',
  //   },
  // ],
}

const { formRef, visible, confirmLoading, formState, onCancel, onOk, open } =
  useActionModal(addUser, editUser, emit)

defineExpose({
  open,
})
</script>
