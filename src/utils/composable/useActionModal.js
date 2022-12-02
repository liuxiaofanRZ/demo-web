import { message } from 'ant-design-vue'
import { ref } from 'vue'

export function useActionModal(addApi, editApi, emit) {
  const actionOption = ref({}) // open 参数
  const formRef = ref(null)
  const visible = ref(false)
  const confirmLoading = ref(false)
  let formState = ref({})

  function onCancel() {
    formRef.value.clearValidate()
  }
  async function onOk() {
    let values = await formRef.value.validate().catch(() => null)
    if (!values) return
    confirmLoading.value = true
    let requestMethod
    if (actionOption.value.type === 1) {
      requestMethod = addApi
    } else if (actionOption.value.type === 2) {
      requestMethod = editApi
    } else if (actionOption.value.type === 3) {
    }
    if (!requestMethod) return
    let res = await requestMethod(formState.value).finally(() => {
      confirmLoading.value = false
    })
    if (res.success) {
      visible.value = false
      message.success(res.message)
      emit('onOk')
    } else {
      message.error(res.message)
    }
  }
  // opt.type 1新增,2编辑,3详情
  function open(opt) {
    actionOption.value = opt
    formState.value = Object.assign({}, actionOption.value.record)
    visible.value = true
  }

  return {
    actionOption,
    formRef,
    visible,
    confirmLoading,
    formState,
    onCancel,
    onOk,
    open,
  }
}
