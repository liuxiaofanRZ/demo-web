<template>
  <div class="PlatformActionModal">
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
        <a-form-item label="平台名称" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item label="url" name="url">
          <a-input v-model:value="formState.url" />
        </a-form-item>
      </a-form>
    </a-modal>
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
  useActionModal(addPlatform, editPlatform, emit)

defineExpose({
  open,
})
</script>
