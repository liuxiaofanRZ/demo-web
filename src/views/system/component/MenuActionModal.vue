<template>
  <a-modal
    class="MenuActionModal"
    v-model:visible="visible"
    :confirmLoading="confirmLoading"
    title="新增"
    @ok="onOk"
    @cancel="onCancel"
    destroyOnClose
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
      <a-form-item label="pid" name="pid">
        <a-input v-model:value="formState.pid" />
      </a-form-item>
      <a-form-item label="父级菜单" name="pid">
        <a-tree-select
          :treeDefaultExpandedKeys="['0']"
          v-model:value="formState.pid"
          style="width: 100%"
          placeholder="请选择父级菜单"
          :tree-data="treeData"
          :fieldNames="{ label: 'title', value: 'id' }"
          :tree-line="{ showLeafIcon: false }"
        >
        </a-tree-select>
      </a-form-item>
      <a-form-item label="component" name="component">
        <a-input v-model:value="formState.component" />
      </a-form-item>

      <a-form-item label="name" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
    </a-form>
  </a-modal>
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
