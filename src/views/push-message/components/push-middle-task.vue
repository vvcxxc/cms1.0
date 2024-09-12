<template>
  <div class="push-left" >
    <div class="push_header">
      <span class="push_title" >{{lang.PushMessage_PushTask}}</span>
      <div class="btns" >
        <div class="btn_copy" @click="openCopy(powers.copy)" >
          <img src="../../../assets/images/组 9@2x.png" />
        </div>
        <div class="btn_add" @click="addTask(powers.add)" >
          <img src="../../../assets/images/组 11@2x.png" />
        </div>
        <div class="btn_upd" @click="editTask(powers.upd)"  >
          <img src="../../../assets/images/形状 7@2x.png" />
        </div>
        <div class="btn_del" @click="delTask(powers.del)"  >
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
        <el-table-column :label="lang.PushMessage_SerialNumber" show-overflow-tooltip align="center" :width="120">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="Name" show-overflow-tooltip :label="lang.PushMessage_TaskName"></el-table-column>
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
      @changeRadio="changeRadio"
      @getTableData="getTaskData"
      @confirm="confirmTask"
  />
  </div>
</template>

<script>
import { dialogCopy, dialogPushTask } from '@/views/push-message/dialogs/index'
import { getGroup, addTask, delTask, copyTask, updTask, getRelateAlarmPoint, getAlarmPoint, getPlans, getDynamicColumns, getPushOrigin } from '@/api/push-message/index'

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
    },
    powers: {
      type: Object,
      default: () => {}
    },
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
          Type: null
        },
        EntityIds:[]
      },
      taskConfig: {
        inputlabelName: '任务名称',
        relateName: '已关联报警控件',
        showRadio: false,
        radioList: [],// showRadi 为true时需要配置radioList
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
  created() {
    this.taskConfig = {
        inputlabelName: this.lang.PushMessage_TaskName,
        relateName: this.lang.PushMessage_AlreadyAssociatedAlarm,
        showRadio: false,
        radioList: [],// showRadi 为true时需要配置radioList
        btns: [1,3],
        tableColumns: [
          {
            label: this.lang.PushMessage_SerialNumber,
          },
          {
            label: this.lang.PushMessage_VariableName,
            prop: 'TagName',
          },
          {
            label: this.lang.PushMessage_AlarmType,
            prop: 'AlarmType',
          },
          {
            label: this.lang.PushMessage_AlarmText,
            prop: 'AlarmText',
          },
          {
            label: this.lang.PushMessage_AlarmEquipment,
            prop: 'AlarmDevice',
          },
          {
            label: this.lang.PushMessage_AlarmLevel,
            prop: 'AlarmLevel',
          },
        ]
      }
  },
  methods: {
    tableRowClick(row) {
      this.$emit('rowClick', row)
    },
    /* 复制 */
    openCopy(power) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      if (this.currentRow === null) {
        this.message_WARN(this, this.lang.PushMessage_SelectPushTask)
        return
      }
      this.copyForm.TaskId = this.currentRow.Id
      this.copyForm.TargetGroupId = this.currentRow.GroupId
      this.copyForm.TaskName = this.currentRow.Name
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
      this.copyForm = {
        TaskId: null,
        TargetGroupId: null,
        TaskName: '',
      }
      this.copyShow = false
    },
    confirmCopy(data) {
      let $this = this
      copyTask(data).then(res => {
        if (res.data.code === 0) {
          $this.message_OK($this, /* '复制成功' */$this.lang.FormulaManage_HT_FormulaSetting_CreateSuccess)
          $this.$emit('refreshData')
          $this.closeCopy()
        } else {
          $this.message_ERROR($this, res.data.msg)
        }
      })
    },
    /* 推送任务 */
    async addTask(power) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      if (this.parentCurrentRow === null) {
        this.message_WARN(this, this.lang.PushMessage_SelectPushGroup)
        return
      }
      let $this = this
      this.pushData = {
        ScmsMsgPushTask:{
          GroupId: this.parentCurrentRow.Id,
          Name: "",
          Type: null
        },
        EntityIds:[]
      }
      if (this.config.origin === '报警消息推送') {
        // 报警消息推送 Type 为 1
        $this.pushData.ScmsMsgPushTask.Type = 1
        $this.taskTitle = $this.lang.PushMessage_NewPushTask
        $this.taskShow = true
      }
      if (this.config.origin === '代办消息推送') {
        this.taskConfig.showRadio = true,
        this.taskConfig.btns = [2]
        this.taskConfig.tableColumns = []
        await getPushOrigin().then(res => {
          $this.pushData.ScmsMsgPushTask.Type = res.data.data[0].Key
          $this.taskConfig.radioList = res.data.data.map((item) => ({
            label: item.Title,
            value: item.Key
          }))
        })
        getDynamicColumns($this.pushData.ScmsMsgPushTask.Type).then(res => {
          res.data.data.forEach(item => {
            $this.taskConfig.tableColumns.push(({
              label: item.Title,
              prop: item.Path,
              width: item.Width,
            }))
          })
          $this.taskTitle = $this.lang.PushMessage_NewPushTask
          $this.taskShow = true
        })
      }
    },
    editTask (power) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      let $this = this
      if (this.currentRow === null) {
        this.message_WARN(this, this.lang.PushMessage_SelectPushTask)
        return
      }
      if (this.config.origin === '报警消息推送') {
        let ids = []
        this.currentRow.Task2Entities.forEach((item) => {
          ids.push(item.EntityId)
        })
        let postData = {
          EntityIds: ids,
        }
        getAlarmPoint(postData).then(res => {
          $this.taskTableData = res.data.data.AlarmInfo
          $this.pushData.ScmsMsgPushTask.GroupId = $this.currentRow.GroupId
          $this.pushData.ScmsMsgPushTask.Name = $this.currentRow.Name
          $this.pushData.ScmsMsgPushTask.Type = $this.currentRow.Type
          $this.taskTitle = $this.lang.PushMessage_EditPushTask
          $this.taskShow = true
        })
      }
      if (this.config.origin === '代办消息推送') {
        this.taskConfig.showRadio = true,
        this.taskConfig.btns = [2]
        this.taskConfig.tableColumns = []
        getPushOrigin().then(res => {
          $this.taskConfig.radioList = res.data.data.map((item) => ({
            label: item.Title,
            value: item.Key
          }))
        })
        getDynamicColumns(this.currentRow.Type).then(res => {
          res.data.data.forEach(item => {
            $this.taskConfig.tableColumns.push(({
              label: item.Title,
              prop: item.Path,
              width: item.Width,
            }))
          })
        })
        let ids = []
        this.currentRow.Task2Entities.forEach((item) => {
          ids.push(item.EntityId)
        })
        let postData = {
          TaskType: this.currentRow.Type,
          Keyword: "",
          EntityIds: ids
        }
        getPlans(postData).then(res => {
          this.taskTableData = res.data.data
          this.pushData.ScmsMsgPushTask.GroupId = this.currentRow.GroupId
          this.pushData.ScmsMsgPushTask.Name = this.currentRow.Name
          this.pushData.ScmsMsgPushTask.Type = this.currentRow.Type
          this.taskTitle = $this.lang.PushMessage_EditPushTask
          this.taskShow = true
        })
      }
    },
    delTask (power) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      let $this = this
      if (this.currentRow === null) {
        this.message_WARN(this, this.lang.PushMessage_SelectPushTask)
        return
      }
      this.confirm_Pop(this, this.lang.PushMessage_DeletePushTask, function () {
        delTask([$this.currentRow.Id]).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, $this.lang.FormulaManage_HT_DeletedSuccessfully)
            $this.$emit('refreshData')
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.MessageBox_YES, no: this.lang.MessageBox_NO})
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
    changeRadio (val) {
      let $this = this
      let ids = []
      this.currentRow.Task2Entities.forEach((item) => {
        ids.push(item.EntityId)
      })
      let postData = {
        TaskType: val,
        Keyword: "",
        EntityIds: ids
      }
      getPlans(postData).then(res => {
        $this.taskTableData = res.data.data
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
          Type: null
        },
        EntityIds:[]
      },
      this.taskTableData = []
      this.taskShow = false
    },
    confirmTask(data, sendData) {
      let $this = this
      let ids = []
      if (this.config.origin === '报警消息推送') {
        ids = sendData.map(item => item.ID)
      }
      if (this.config.origin === '代办消息推送') {
        ids = sendData.map(item => item.Id)
      }
      if (this.taskTitle === this.lang.PushMessage_NewPushTask) {
        data.EntityIds = ids
        addTask(data).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, $this.lang.ProcessParameterConfigure_HT_AddWorkProject1ViewModel_NewSuccess)
            $this.$emit('refreshData')
            $this.closeTask()
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }
      if (this.taskTitle === this.lang.PushMessage_EditPushTask) {
        let postData = {
          ScmsMsgPushTask: {
            Id: this.currentRow.Id,
            Name: data.ScmsMsgPushTask.Name,
            Type: data.ScmsMsgPushTask.Type,  // 此处Type也可写死 1
          },
          EntityIds: ids
        }
        updTask(postData).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, $this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully)
            $this.$emit('refreshData')
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