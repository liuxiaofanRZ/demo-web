<template>
  <div style="margin-bottom: 10px">平台列表</div>
  <div class="search-box">
    <div style="margin-right: 10px" @keyup.enter="loadData(true)">
      <a-input placeholder="请输入平台名称" v-model:value="queryParam.title" />
    </div>
    <a-button @click="loadData(true)">查询</a-button>
  </div>
  <div class="action-box">
    <a-button style="margin-right: 10px" @click="handleAdd" type="primary">
      新增
    </a-button>
    <a-button @click="handleBatchDelete">批量删除</a-button>
  </div>
  <a-table
    :loading="loading"
    :pagination="{
      pageSize: queryParam.pageSize,
      current: queryParam.pageNo,
      total,
      // showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total) => `共 ${total} 条`,
    }"
    :row-selection="{
      onChange: handleSelectedRowsChange,
      selectedRowKeys: selectedRowKeys,
      preserveSelectedRowKeys: true,
    }"
    rowKey="id"
    :showQuickJumper="true"
    :dataSource="dataSource"
    :columns="columns"
    bordered
    @change="handlePageChange"
  >
    <!-- :scroll="{
      scrollToFirstRowOnChange: true,
      y: '500px',
    }" -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'url'">
        <a-button size="small" type="link" target="_blank" :href="record.url">
          {{ record.url }}
        </a-button>
      </template>
      <template v-else-if="column.dataIndex === 'action'">
        <a-button
          style="margin-right: 10px"
          size="small"
          @click="handleEdit(record)"
          >编辑</a-button
        >
        <a-popconfirm
          title="确定删除这条数据？"
          @confirm="handleDelete(record)"
        >
          <a-button size="small" type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <component
    :is="PlatformActionModal"
    ref="actionModal"
    @onOk="handleOk"
  ></component>
</template>
<script setup>
import { getPlatformList, deletePlatform, deleteBatchPlatform } from '@/api'
import { usePage } from '@/utils/composable/usePage'
import PlatformActionModal from '@/views/system/component/PlatformActionModal.vue'

const columns = [
  {
    title: '平台名称',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: 'url',
    align: 'center',
    dataIndex: 'url',
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'action',
  },
]

const {
  dataSource,
  queryParam,
  loading,
  total,
  handlePageChange,
  loadData,
  actionModal,
  handleAdd,
  handleEdit,
  handleOk,
  handleDelete,
  handleBatchDelete,
  selectedRowKeys,
  handleSelectedRowsChange,
} = usePage({
  listApi: getPlatformList,
  deleteApi: deletePlatform,
  deleteBatchApi: deleteBatchPlatform,
})
</script>

<style>
.search-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.action-box {
  display: flex;
  margin-bottom: 10px;
}
</style>
