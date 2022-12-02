<template>
  <div class="MenuActionModal">
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
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item label="path" name="path">
          <a-input v-model:value="formState.path" />
        </a-form-item>
        <a-form-item label="component" name="component">
          <a-input v-model:value="formState.component" />
        </a-form-item>
        <a-form-item label="pid" name="pid">
          <a-input v-model:value="formState.pid" />
        </a-form-item>
        <a-form-item label="name" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { addMenu, editMenu } from '@/api'
import { useActionModal } from '@/utils/composable/useActionModal'
const emit = defineEmits(['onOk'])

const rules = {
  title: [
    {
      required: true,
      message: '请输入菜单标题！',
    },
  ],
  path: [
    {
      required: true,
      message: '请输入菜单路径！',
    },
  ],
  // name: [
  //   {
  //     required: true,
  //     message: '请输入菜单名称！',
  //   },
  // ],
  // component: [
  //   {
  //     required: true,
  //     message: '请输入菜单组件路径！',
  //   },
  // ],
  // birthday: [
  //   {
  //     required: true,
  //     message: '请输入用户名！',
  //   },
  // ],
}

const { formRef, visible, confirmLoading, formState, onCancel, onOk, open } =
  useActionModal(addMenu, editMenu, emit)

defineExpose({
  open,
})
</script>
