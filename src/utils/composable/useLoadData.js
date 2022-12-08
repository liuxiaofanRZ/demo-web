import { ref } from 'vue'

export function useLoadData(pageConfig) {
  const { listType = 'pageList' } = pageConfig
  let returnData = {}
  switch (listType) {
    case 'pageList':
      returnData = usePageList(pageConfig)
      break
    case 'list':
      returnData = useList(pageConfig)
      break
    default:
      break
  }
  const selectedRowKeys = ref([])
  const selectedRows = ref([])

  const handleSelectedRowsChange = (rowKeys, rows) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
    selectedRowKeys.value = rowKeys
    selectedRows.value = rows
  }
  return {
    ...returnData,
    handleSelectedRowsChange,
    selectedRowKeys,
    selectedRows,
  }
}

// 普通列表
function useList(pageConfig) {
  const { listApi, defaultParam = {}, modifyList } = pageConfig
  const dataSource = ref([])
  const queryParam = ref(defaultParam)
  const loading = ref(false)

  async function loadData() {
    loading.value = true
    let res = await listApi(queryParam.value).finally(() => {
      loading.value = false
    })
    let result = res.result
    if (typeof modifyList === 'function') {
      result = modifyList(result)
    }
    dataSource.value = result
  }
  return {
    loading,
    dataSource,
    queryParam,
    loadData,
  }
}
// 分页列表
function usePageList(pageConfig) {
  const { listApi, defaultParam = {} } = pageConfig
  const dataSource = ref([])
  const queryParam = ref({
    pageNo: 1,
    pageSize: 10,
    ...defaultParam,
  })
  const total = ref(0)
  const loading = ref(false)

  async function loadData(isRefresh) {
    if (isRefresh) {
      queryParam.value = {
        ...queryParam.value,
        pageNo: 1,
        pageSize: 10,
      }
    }
    loading.value = true
    let res = await listApi(queryParam.value).finally(() => {
      loading.value = false
    })
    let result = res.result
    if (typeof modifyList === 'function') {
      result = modifyList(result)
    }
    dataSource.value = result.records
    total.value = result.total

    queryParam.value = {
      ...queryParam.value,
      pageNo: result.current,
      pageSize: result.size,
    }
  }

  function handlePageChange({ current, pageSize }) {
    queryParam.value = {
      ...queryParam.value,
      pageNo: current,
      pageSize: pageSize,
    }
    loadData()
  }

  return {
    dataSource,
    queryParam,
    loading,
    loadData,
    total,
    handlePageChange,
  }
}
