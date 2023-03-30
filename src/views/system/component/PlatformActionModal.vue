<template>
  <div class="PlatformActionModal">
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
        <AFormItem label="平台名称" name="title">
          <AInput v-model:value="formState.title" />
        </AFormItem>
        <AFormItem label="url" name="url">
          <AInput v-model:value="formState.url" />
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>

<script setup>
import { addPlatform, editPlatform } from '@/api'
import { useActionModal } from '@/utils/composable/useActionModal'
const emit = defineEmits(['onOk'])

const rules = {
  title: [
    {
      required: true,
      message: '请输入平台名称！',
    },
  ],
  url: [
    {
      required: true,
      message: '请输入URL！',
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
    addApi: addPlatform,
    editApi: editPlatform,
    onSuccess: () => emit('onOk'),
  })

defineExpose({
  open,
})
</script>
