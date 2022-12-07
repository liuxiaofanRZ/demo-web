<template>
  <div>菜单列表</div>
  <div class="search-head">
    <a-button
      style="margin-right: 10px"
      @click="handleAdd({ pid: '0' })"
      type="primary"
    >
      新增
    </a-button>
    <div style="margin-right: 10px" @keyup.enter="loadData(true)">
      <a-input placeholder="请输入姓名" v-model:value="queryParam.pid" />
    </div>
    <a-button @click="loadData(true)">查询</a-button>
  </div>
  <a-table
    :loading="loading"
    :pagination="false"
    :showQuickJumper="true"
    :dataSource="dataSource"
    :columns="columns"
    bordered
    @change="handlePageChange"
    :expandedRowKeys="expandedRowKeys"
    @expandedRowsChange="expandedRowsChange"
    
    
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
  <menu-action-modal ref="actionModal" @onOk="handleOk"></menu-action-modal>
</template>
<script setup>
import { getMenuListByPid, deleteMenu, getMenuTree } from '@/api'
import { usePage } from '@/utils/composable/usePage'
import MenuActionModal from '@/views/system/component/MenuActionModal.vue'
import { ref } from 'vue'

const columns = [
  {
    title: '标题',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '路径',
    align: 'center',
    dataIndex: 'path',
  },
  {
    title: '组件路径',
    align: 'center',
    dataIndex: 'component',
  },
  {
    title: 'name',
    align: 'center',
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
} = usePage({
  // defaultParam: { pid: 0 },
  // listApi: getMenuListByPid,
  listApi: getMenuTree,
  deleteApi: deleteMenu,
  listType: 'list',
})
</script>

<style>
.search-head {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
