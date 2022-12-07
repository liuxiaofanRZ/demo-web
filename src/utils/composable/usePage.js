import { useLoadData } from './useLoadData'
import { onMounted } from 'vue'
import { useAction } from './useAction'

// pageConfig = {
//   deleteApi: 删除接口,
//   listApi: 列表接口,
// 以下为非必填
//   listType: list(无分页) | pageList(分页)，默认是pageList
//   defaultParam: 初始的查询参数对象，默认为{}
//   modifyList: 修改返回列表数据的钩子函数，需要将修改后的数据return
//   noOnMounted: Boolean, 不自动调用onMounted
//   handleDelete
//   handleAdd
//   handleEdit
//   handleOk
// }
export function usePage(pageConfig) {
  const { dataSource, queryParam, loading, total, handlePageChange, loadData } =
    useLoadData(pageConfig)
  const { handleAdd, handleEdit, handleOk, handleDelete, actionModal } =
    useAction(pageConfig, loadData)

  if (!pageConfig.noOnMounted) {
    onMounted(async () => {
      loadData()
    })
  }
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
