<template>
  <div>菜单列表</div>
  <div class="search-box">
    <div style="margin-right: 10px" @keyup.enter="loadData(true)">
      <a-input placeholder="请输入姓名" v-model:value="queryParam.pid" />
    </div>
    <a-button @click="loadData(true)">查询</a-button>
  </div>
  <div class="action-box">
    <a-button
      style="margin-right: 10px"
      @click="handleAdd({ pid: '0' })"
      type="primary"
    >
      新增
    </a-button>
    <a-button @click="handleBatchDelete">批量删除</a-button>
  </div>
  <a-table
    :loading="loading"
    :pagination="false"
    :showQuickJumper="true"
    :dataSource="dataSource"
    :columns="columns"
    @change="handlePageChange"
    :expandedRowKeys="expandedRowKeys"
    @expandedRowsChange="expandedRowsChange"
    :row-selection="{
      onChange: handleSelectedRowsChange,
      selectedRowKeys: selectedRowKeys,
      preserveSelectedRowKeys: true,
    }"
    rowKey="id"
  >
    <!-- :scroll="{
      scrollToFirstRowOnChange: true,
      y: '500px',
    }" -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-button
          style="margin-right: 10px"
          size="small"
          @click="handleEdit(record)"
        >
          编辑
        </a-button>
        <a-button
          style="margin-right: 10px"
          size="small"
          @click="handleAdd({ pid: record.id })"
          >添加子路由</a-button
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
  <menu-action-modal ref="actionModal" @onOk="handleOk"></menu-action-modal>
</template>
<script setup>
import {
  getMenuListByPid,
  deleteMenu,
  getMenuTree,
  deleteBatchMenu,
} from '@/api'
import { usePage } from '@/utils/composable/usePage'
import MenuActionModal from '@/views/system/component/MenuActionModal.vue'
import { reactive, ref } from 'vue'

const columns = [
  {
    title: '标题',
    // align: 'center',
    dataIndex: 'title',
  },
  {
    title: '路径',
    dataIndex: 'path',
  },
  {
    title: '组件路径',
    dataIndex: 'component',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'action',
  },
]
const expandedRowKeys = ref([])
function expandedRowsChange(expandedRows) {
  expandedRowKeys.value = expandedRows
}

const {
  dataSource,
  queryParam,
  loading,
  handlePageChange,
  loadData,
  actionModal,
  handleAdd,
  handleEdit,
  handleOk,
  handleDelete,
  selectedRowKeys,
  handleBatchDelete,
  handleSelectedRowsChange,
} = usePage({
  // defaultParam: { pid: 0 },
  // listApi: getMenuListByPid,
  listApi: getMenuTree,
  deleteApi: deleteMenu,
  deleteBatchApi: deleteBatchMenu,
  listType: 'list',
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
