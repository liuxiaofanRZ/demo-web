<template>
  <div class="AccountActionModal">
    <AModal
      v-model:visible="visible"
      :confirmLoading="confirmLoading"
      title="新增"
      @ok="onOk"
      @cancel="onCancel"
    >
      <AForm
        @keyup.enter="onOk"
        :model="formState"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        :rules="rules"
        ref="formRef"
      >
        <AFormItem label="账号" name="username">
          <AInput placeholder="请输入账号" v-model:value="formState.username" />
        </AFormItem>
        <AFormItem label="密码" name="password">
          <AInput placeholder="请输入密码" v-model:value="formState.password" />
        </AFormItem>
        <AFormItem label="平台" name="platformId">
          <!-- <a-input v-model:value="formState.platformId" /> -->
          <ASelect
            placeholder="请选择平台"
            v-model:value="formState.platformId"
            :fieldNames="{ label: 'title', value: 'id' }"
            :options="platformList"
          ></ASelect>
        </AFormItem>
        <AFormItem label="描述" name="description">
          <AInput
            placeholder="请输入描述"
            v-model:value="formState.description"
          />
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>

<script setup>
import { addAccount, editAccount, getPlatformListAll } from '@/api'
import { useActionModal } from '@/utils/composable/useActionModal'
import { ref } from 'vue'
const emit = defineEmits(['onOk'])

const rules = {
  username: [
    {
      required: true,
      message: '请输入账号！',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码！',
    },
  ],
  platformId: [
    {
      required: true,
      message: '请选择平台！',
    },
  ],
  description: [
    {
      required: true,
      message: '请输入描述！',
    },
  ],
}

const {
  formRef,
  visible,
  confirmLoading,
  formState,
  onCancel,
  onOk,
  open: _open,
} = useActionModal({
  addApi: addAccount,
  editApi: editAccount,
  onSuccess: () => emit('onOk'),
})
const platformList = ref([])
defineExpose({
  open: async (record) => {
    let res = await getPlatformListAll()
    if (res.success) {
      platformList.value = res.result
    }
    _open(record)
  },
})
</script>
