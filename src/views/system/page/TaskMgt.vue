<template>
  <ACard :bordered="false">
    <AForm :model="formState" ref="formRef">
      <ARow :gutter="20">
        <ACol :xs="24" :sm="8">
          <AFormItem
            label="任务名称"
            name="title"
            :rules="[{ required: true, message: '请输入任务名称!' }]"
          >
            <AInput v-model:value="formState.title" />
          </AFormItem>
        </ACol>
        <ACol :xs="24" :sm="16">
          <AFormItem label="详情" name="desc">
            <AInput v-model:value="formState.desc" />
          </AFormItem>
        </ACol>
      </ARow>

      <AFormItem>
        <AButton type="primary" @click="submitForm(1)">Submit</AButton>
      </AFormItem>
    </AForm>
  </ACard>
  <ACard title="列表" :bordered="false" style="margin-top: 20px">
    <ATable
      :columns="columns"
      :dataSource="dataSource"
      @change="handlePageChange"
      :pagination="{
        pageSize: queryParam.pageSize,
        current: queryParam.pageNo,
        total,
        // showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`,
      }"
      rowKey="id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <!-- <AButton
            style="margin-right: 10px"
            size="small"
            @click="handleEdit(record)"
          >
            编辑
          </AButton>
          <AButton
            style="margin-right: 10px"
            size="small"
            @click="handleAdd({ pid: record.id })"
          >
            添加子路由
          </AButton> -->
          <APopconfirm
            title="确定删除这条数据？"
            @confirm="handleDelete(record)"
          >
            <AButton size="small" type="danger">删除</AButton>
          </APopconfirm>
        </template>
      </template>
    </ATable>
  </ACard>
</template>

<script setup>
import {
  getSysTaskList,
  addSysTask,
  editSysTask,
  deleteSysTask,
  deleteBatchSysTask,
} from '@/api'
import { usePage } from '@/utils/composable/usePage'
import { useActionModal } from '@/utils/composable/useActionModal'
const {
  dataSource,
  loadData,
  total,
  queryParam,
  handlePageChange,
  handleDelete,
  handleBatchDelete,
} = usePage({
  listApi: getSysTaskList,
  deleteApi: deleteSysTask,
  deleteBatchApi: deleteBatchSysTask,
})
const columns = [
  {
    title: '任务名称',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '任务描述',
    align: 'center',
    dataIndex: 'desc',
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'action',
  },
]
const { formRef, confirmLoading, formState, submitForm,reset } = useActionModal({
  addApi: addSysTask,
  editApi: editSysTask,
  onSuccess: () => {
    loadData()
    reset()
  },
})
</script>
<style lang="scss"></style>
