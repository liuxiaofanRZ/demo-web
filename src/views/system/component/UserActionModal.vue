<template>
  <div class="UserActionModal">
    <AModal
      v-model:visible="visible"
      :confirmLoading="confirmLoading"
      title="新增"
      @ok="onOk"
      @cancel="onCancel"
    >
      <AForm
        :model="formState"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        :rules="rules"
        ref="formRef"
      >
        <AFormItem label="用户名" name="username">
          <AInput v-model:value="formState.username" />
        </AFormItem>
        <AFormItem label="密码" name="password">
          <AInput v-model:value="formState.password" />
        </AFormItem>
        <AFormItem label="出生日期" name="birthday">
          <AInput v-model:value="formState.birthday" />
        </AFormItem>
      </AForm>
    </AModal>
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
  useActionModal({
    addApi: addUser,
    editApi: editUser,
    onSuccess: () => emit('onOk'),
  })

defineExpose({
  open,
})
</script>
