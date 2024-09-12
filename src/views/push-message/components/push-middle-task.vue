<template>
  <div class="push-left" >
    <div class="push_header">
      <span class="push_title" >推送任务</span>
      <div class="btns" >
        <div class="btn_copy" @click="openCopy" >
          <img src="../../../assets/images/组 9@2x.png" />
        </div>
        <div class="btn_add" @click="addTask" >
          <img src="../../../assets/images/组 11@2x.png" />
        </div>
        <div class="btn_upd" @click="editTask" >
          <img src="../../../assets/images/形状 7@2x.png" />
        </div>
        <div class="btn_del" @click="delTask">
          <img src="../../../assets/images/icon_dell.png" />
        </div>
      </div>
    </div>
    <div class="push_main">
      <el-table
        ref="table"
        class="common_table"
        :data="tableData"
        :border="true"
        height="100%"
        highlight-current-row
        @row-click="tableRowClick"
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        tooltip-effect="dark"
      >
        <el-table-column label="序号" show-overflow-tooltip align="center" min-width="40">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="Name" show-overflow-tooltip label="任务名称" align="center"></el-table-column>
      </el-table>
    </div>
    <dialog-copy :visible="copyShow" :formData="copyForm" :pushList="pushList" @close="closeCopy" @confirm="confirmCopy" />
    <dialog-push-task
      :visible="taskShow"
      :formData="pushData"
      :tableData="taskTableData"
      :title="taskTitle"
      :config="taskConfig"
      :pageConfig="config"
      @close="closeTask"
      @changeTaleData="changeTaskData"
      @getTableData="getTaskData"
      @confirm="confirmTask"
  />
  </div>
</template>

<script>
import { dialogCopy, dialogPushTask } from '@/views/push-message/dialogs/index'
import { getGroup, addTask, delTask, copyTask, updTask, getRelateAlarmPoint, getAlarmPoint, getPlans, getDynamicColumns } from '@/api/push-message/index'

export default {
  name: 'PushLeftGroup',
  components: { dialogCopy, dialogPushTask },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => {}
    },
    formData: { /* 用来获取复制弹窗 推送分组下拉框内容 */
      type: Object,
      default: () => {}
    },
    parentCurrentRow: {
      type: Object,
      default: () => {}
    },
    currentRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      copyShow: false,
      taskShow: false,
      taskTitle: '',
      taskTableData: [],
      copyForm: {
        TaskId: null,
        TargetGroupId: null,
        TaskName: '',
      },
      pushList: [],
      pushData: {
        ScmsMsgPushTask:{
          GroupId: '',
          Name: "",
          Type: 1
        },
        EntityIds:[]
      },
      taskConfig: {
        inputlabelName: '任务名称',
        relateName: '已关联报警控件',
        showRadio: false,
        btns: [1,3],
        tableColumns: [
          {
            label: '序号',
          },
          {
            label: '变量名',
            prop: 'TagName',
          },
          {
            label: '报警类别',
            prop: 'AlarmType',
          },
          {
            label: '报警文本',
            prop: 'AlarmText',
          },
          {
            label: '报警设备',
            prop: 'AlarmDevice',
          },
          {
            label: '报警级别',
            prop: 'AlarmLevel',
          },
        ]
      }
    }
  },
  methods: {
    tableRowClick(row) {
      this.$emit('rowClick', row)
    },
    /* 复制 */
    openCopy() {
      if (this.currentRow === null) {
        this.message_WARN(this, '请先选择任务')
        return
      }
      this.copyForm.TaskId = this.currentRow.Id
      this.copyForm.TargetGroupId = this.currentRow.GroupId
      let postData = {
        GroupType: this.formData.GroupType,
        SearchType: this.formData.SearchType,
        Keyword: this.formData.Keyword
      }
      getGroup(postData).then(res => {
        this.pushList = res.data.data
        this.copyShow = true
      })
    },
    closeCopy() {
      this.copyShow = false
    },
    confirmCopy(data) {
      let $this = this
      copyTask(data).then(res => {
        if (res.data.code === 0) {
          $this.message_OK($this, '复制成功')
          $this.$emit('refreshData')
          $this.closeCopy()
        } else {
          $this.message_ERROR($this, res.data.msg)
        }
      })
    },
    /* 推送任务 */
    addTask() {
      let $this = this
      this.pushData = {
        ScmsMsgPushTask:{
          GroupId: this.parentCurrentRow.Id,
          Name: "",
          Type: 100
        },
        EntityIds:[]
      }
      if (this.config.origin === '代办消息推送') {
        this.taskConfig.showRadio = true,
        this.taskConfig.btns = [2]
        $this.taskConfig.tableColumns = []
        getDynamicColumns(this.currentRow.Type).then(res => {
          res.data.data.forEach(item => {
            $this.taskConfig.tableColumns.push(({
              label: item.Title,
              prop: item.Path,
              width: item.Width,
            }))
          })
          $this.taskTitle = "新增推送任务"
          $this.taskShow = true
        })
      }
    },
    editTask () {
      let $this = this
      if (this.currentRow === null) {
        this.message_WARN(this, '请先选择任务')
        return
      }
      if (this.config.origin === '报警消息推送') {
        getRelateAlarmPoint({EntityId: this.currentRow.Id}).then(res => {
          this.taskTableData = res.data.data
          this.pushData.ScmsMsgPushTask.GroupId = this.currentRow.GroupId
          this.pushData.ScmsMsgPushTask.Name = this.currentRow.Name
          this.pushData.ScmsMsgPushTask.Type = this.currentRow.Type
          this.taskTitle = "编辑推送任务"
          this.taskShow = true
        })
      }
      if (this.config.origin === '代办消息推送') {
        this.taskConfig.showRadio = true,
        this.taskConfig.btns = [2]
        this.taskConfig.tableColumns = []
        let postData = {
          TaskType: this.currentRow.Type,
          Keyword: "",
          EntityIds: [this.currentRow.Id]
        }
        getDynamicColumns(this.currentRow.Type).then(res => {
          res.data.data.forEach(item => {
            $this.taskConfig.tableColumns.push(({
              label: item.Title,
              prop: item.Path,
              width: item.Width,
            }))
          })
        })
        getPlans(postData).then(res => {
          this.taskTableData = res.data.data
          this.pushData.ScmsMsgPushTask.GroupId = this.currentRow.GroupId
          this.pushData.ScmsMsgPushTask.Name = this.currentRow.Name
          this.pushData.ScmsMsgPushTask.Type = this.currentRow.Type
          this.taskTitle = "编辑推送任务"
          this.taskShow = true
        })
      }
    },
    delTask () {
      let $this = this
      if (this.currentRow === null) {
        this.message_WARN(this, '请先选择任务')
        return
      }
      this.confirm_Pop(this, '是否确认删除选中任务？', function () {
        delTask([$this.currentRow.Id]).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, '删除成功')
            $this.$emit('refreshData')
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      })
    },
    getTaskData (ids) {
      let $this = this
      let postData = {
        EntityIds: ids,
      }
      getAlarmPoint(postData).then(res => {
        $this.taskTableData = res.data.data.AlarmInfo
      })
    },
    changeTaskData (data) {
      this.taskTableData = data
    },
    closeTask() {
      this.pushData = {
        ScmsMsgPushTask:{
          GroupId: '',
          Name: "",
          Type: 1
        },
        EntityIds:[]
      },
      this.taskTableData = []
      this.taskShow = false
    },
    confirmTask(data, sendData) {
      let $this = this
      let ids = sendData.map(item => item.ID)
      if (this.taskTitle === '新增推送任务') {
        data.EntityIds = ids
        addTask(data).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, '新增成功')
            $this.$emit('refreshData')
            $this.closeTask()
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }
      if (this.taskTitle === '编辑推送任务') {
        let postData = {
          ScmsMsgPushTask: {
            Id: this.currentRow.Id,
            Name: data.ScmsMsgPushTask.Name
          },
          EntityIds: ids
        }
        updTask(postData).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, '修改成功')
            $this.closeTask()
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }

    },
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
</style>