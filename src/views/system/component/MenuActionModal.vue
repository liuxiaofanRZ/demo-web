<template>
  <AModal
    class="MenuActionModal"
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
      <AFormItem label="标题" name="title">
        <AInput v-model:value="formState.title" />
      </AFormItem>
      <AFormItem label="path" name="path">
        <AInput v-model:value="formState.path" />
      </AFormItem>
      <AFormItem label="排序" name="order">
        <AInputNumber
          step="10"
          style="width: 100%"
          v-model:value="formState.order"
          placeholder="请输入排序"
        />
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
        <AInput
          v-model:value="formState.component"
          placeholder="不填时默认设置为RouterView"
        />
        <div class="mx-0 break-all text-neutral-500">
          <div>1. 例：/system/page/menu.vue</div>
          <div>
            2. 前缀路径为 /src/views，即 /src/views/system/page/menu.vue
          </div>
          <div>
            3. vue 文件必须放置到名为 page 的目录下，见 addRoutes.js文件
          </div>
        </div>
      </AFormItem>

      <AFormItem label="外部路由" name="isExternal">
        <ASwitch v-model:checked="formState.isExternal" />
      </AFormItem>
      <AFormItem label="新页面" name="isNewPage">
        <ASwitch v-model:checked="formState.isNewPage" />
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
  path: [
    {
      required: true,
      message: '请输入菜单路径！',
    },
  ],
  order: [
    {
      required: true,
      message: '请输入排序！',
    },
  ],
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
  reset,
} = useActionModal({
  addApi: addMenu,
  editApi: editMenu,
  onSuccess: () => emit('onOk'),
  defaultFormState: { order: 11 },
})
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
