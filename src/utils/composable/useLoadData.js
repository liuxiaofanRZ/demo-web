import { ref } from 'vue'

export function useLoadData(pageConfig) {
  const { listType = 'pageList' } = pageConfig
  switch (listType) {
    case 'pageList':
      return usePageList(pageConfig)
    case 'list':
      return useList(pageConfig)
    default:
      return null
  }
}

// 普通列表
function useList(pageConfig) {
  const { listApi, defaultParam = {} } = pageConfig
  const dataSource = ref([])
  const queryParam = ref(defaultParam)
  const loading = ref(false)

  async function loadData() {
    loading.value = true
    let res = await listApi(queryParam.value).finally(() => {
      loading.value = false
    })
    let result = res.result
    console.log(res)
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
        pageNo: 1,
        pageSize: 10,
        ...queryParam.value,
      }
    }
    loading.value = true
    let res = await listApi(queryParam.value).finally(() => {
      loading.value = false
    })
    let result = res.result
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
