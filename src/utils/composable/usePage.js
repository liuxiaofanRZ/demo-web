import { useLoadData } from './useLoadData'
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'

// pageConfig = { 
//   listType: list | pageList, 
//   deleteApi: 删除接口, 
//   listApi: 列表接口, 
//   defaultParam: 初始的查询参数对象，默认为{}
// }
export function usePage(pageConfig) {
  const { deleteApi } = pageConfig

  const actionModal = ref(null)
  const { dataSource, queryParam, loading, total, handlePageChange, loadData } =
    useLoadData(pageConfig)

  function handleAdd() {
    actionModal.value.open({ type: 1 })
  }
  function handleEdit(record) {
    actionModal.value.open({ type: 2, record })
  }
  function handleOk() {
    loadData(true)
  }
  async function handleDelete(record) {
    let res = await deleteApi(record)
    if (res.success) {
      message.success(res.message)
      loadData()
    }
  }
  onMounted(async () => {
    loadData()
  })
  return {
    dataSource,
    queryParam,
    loading,
    total,
    handlePageChange,
    loadData,
    //
    actionModal,
    handleAdd,
    handleEdit,
    handleOk,
    handleDelete,
  }
}
