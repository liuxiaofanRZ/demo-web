import { ref } from 'vue'
import { message } from 'ant-design-vue'

export function useAction(pageConfig, tableConfig) {
  let { loadData, selectedRowKeys } = tableConfig
  let {
    deleteApi,
    deleteBatchApi,
    handleAdd = (record) => {
      actionModal.value.open({ type: 1, record })
    },
    handleEdit = (record) => {
      actionModal.value.open({ type: 2, record })
    },
    handleOk = () => {
      loadData(true)
    },
    handleDelete = async (record) => {
      let res = await deleteApi(record)
      if (res.success) {
        message.success(res.message)
        loadData()
      }
    },
    handleBatchDelete = async () => {
      if (selectedRowKeys.value.length <= 0) {
        return message.warning('请选择至少一条数据')
      }
      let res = await deleteBatchApi({ ids: selectedRowKeys.value })
      if (res.success) {
        message.success(res.message)
        selectedRowKeys.value = []
        loadData(true)
      }
    },
  } = pageConfig
  const actionModal = ref(null)

  return {
    handleAdd,
    handleEdit,
    handleOk,
    handleDelete,
    handleBatchDelete,
    actionModal,
  }
}
