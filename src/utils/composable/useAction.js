import { ref } from 'vue'
import { message } from 'ant-design-vue'

export function useAction(pageConfig, loadData) {
  let {
    deleteApi,
    handleDelete = async (record) => {
      let res = await deleteApi(record)
      if (res.success) {
        message.success(res.message)
        loadData()
      }
    },
    handleAdd = (record) => {
      actionModal.value.open({ type: 1, record })
    },
    handleEdit = (record) => {
      actionModal.value.open({ type: 2, record })
    },
    handleOk = () => {
      loadData(true)
    },
  } = pageConfig
  const actionModal = ref(null)

  return {
    handleAdd,
    handleEdit,
    handleOk,
    handleDelete,
    actionModal,
  }
}
