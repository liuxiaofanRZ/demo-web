import { message } from 'ant-design-vue'
import { ref, nextTick } from 'vue'

export function useActionModal({ addApi, editApi, onSuccess, defaultFormState }) {
  const actionOption = ref({}) // open 参数
  const formRef = ref(null)
  const visible = ref(false)
  const confirmLoading = ref(false)
  let formState = ref({})

  function onCancel() {
    formRef.value.clearValidate()
  }

  async function submitForm(type) {
    let values = await formRef.value.validate().catch(() => null)
    if (!values) return
    let requestMethod
    if (type === 1) {
      requestMethod = addApi
    } else if (type === 2) {
      requestMethod = editApi
    } else if (type === 3) {
    }
    if (!requestMethod) return
    confirmLoading.value = true
    let res = await requestMethod(formState.value).finally(() => {
      confirmLoading.value = false
    })
    if (res.success) {
      visible.value = false
      message.success(res.message)
      onSuccess && onSuccess()
    } else {
      message.error(res.message)
    }
  }
  async function onOk() {
    submitForm(actionOption.value.type)
  }
  function reset() {
    formState.value = Object.assign(
      {},
      defaultFormState,
      actionOption.value.record
    )
  }
  // opt.type 1新增,2编辑,3详情
  function open(opt) {
    actionOption.value = opt
    reset()
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
    submitForm,
    reset,
  }
}
