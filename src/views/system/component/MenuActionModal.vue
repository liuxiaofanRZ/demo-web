<template>
  <AModal
    class="MenuActionModal"
    v-model:visible="visible"
    :confirmLoading="confirmLoading"
    title="新增"
    @ok="onOk"
    @cancel="onCancel"
    destroyOnClose
  >
    <AForm
      :model="formState"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
      :rules="rules"
      ref="formRef"
    >
      <AFormItem label="标题" name="title">
        <AInput v-model:value="formState.title" />
      </AFormItem>
      <AFormItem label="path" name="path">
        <AInput v-model:value="formState.path" />
      </AFormItem>
      <AFormItem label="pid" name="pid">
        <AInput disabled v-model:value="formState.pid" />
      </AFormItem>
      <AFormItem label="父级菜单" name="pid">
        <ATreeSelect
          :treeDefaultExpandedKeys="['0']"
          v-model:value="formState.pid"
          style="width: 100%"
          placeholder="请选择父级菜单"
          :tree-data="treeData"
          :fieldNames="{ label: 'title', value: 'id' }"
          :tree-line="{ showLeafIcon: false }"
        >
        </ATreeSelect>
      </AFormItem>
      <AFormItem label="component" name="component">
        <AInput v-model:value="formState.component" />
      </AFormItem>

      <AFormItem label="name" name="name">
        <AInput v-model:value="formState.name" />
      </AFormItem>
      <AFormItem label="外部路由" name="isExternal">
        <ASwitch v-model:checked="formState.isExternal" />
      </AFormItem>
    </AForm>
  </AModal>
</template>

<script setup>
import { addMenu, editMenu, getMenuTree } from '@/api'
import { useActionModal } from '@/utils/composable/useActionModal'
import { ref } from 'vue'
const emit = defineEmits(['onOk'])

const rules = {
  title: [
    {
      required: true,
      message: '请输入菜单标题！',
    },
  ],
  // path: [
  //   {
  //     required: true,
  //     message: '请输入菜单路径！',
  //   },
  // ],
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

const {
  formRef,
  visible,
  confirmLoading,
  formState,
  onCancel,
  onOk,
  open: _open,
} = useActionModal(addMenu, editMenu, emit)

const treeData = ref([])
defineExpose({
  open: async (record) => {
    let res = await getMenuTree()
    treeData.value = [
      {
        id: '0',
        title: '无',
        isLeaf: false,
        children: res.result,
      },
    ]
    _open(record)
  },
})
</script>
