<template>
  <a-card :bordered="false">
    <div class="text-3xl text-red-500">菜单列表</div>
    <div class="search-box flex justify-end mb-3">
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
      :scroll="{ x: 1000 }"
    >
      <!-- :scroll="{
      scrollToFirstRowOnChange: true,
      y: '500px',
    }" -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a @click="handleEdit(record)"> 编辑 </a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a>
              更多
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleAdd({ pid: record.id })">添加子路由 </a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm
                    title="确定删除这条数据？"
                    @confirm="handleDelete(record)"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </template>
    </a-table></a-card
  >
  <menu-action-modal ref="actionModal" @onOk="handleOk"></menu-action-modal>
</template>
<script setup>
import { deleteBatchMenu, deleteMenu, getMenuTree } from '@/api'
import { usePage } from '@/utils/composable/usePage'
import MenuActionModal from '@/views/system/component/MenuActionModal.vue'
import { ref } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'

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
    title: '排序',
    dataIndex: 'order',
  },
  {
    title: '操作',
    align: 'center',
    width:150,
    fixed: 'right',
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
