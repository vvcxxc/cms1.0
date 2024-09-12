<template>
  <div class="push-left" >
    <div class="push_header">
      <span class="push_title" >{{lang.MsgPush_Alarm_Config}}</span>
      <div class="btns" >
        <div class="btn_add" @click="openConfig(powers.add)" >
          <img src="../../../assets/images/组 11@2x.png" />
        </div>
        <div class="btn_upd" @click="updConfig(powers.upd)" >
          <img src="../../../assets/images/形状 7@2x.png" />
        </div>
        <div class="btn_del" @click="delConfig(powers.del)" >
          <img src="../../../assets/images/icon_dell.png" />
        </div>
      </div>
    </div>
    <div class="push_main">
      <el-table
        ref="table"
        :data="tableData"
        class="common_table"
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
        <el-table-column prop="IsLive" show-overflow-tooltip :label="lang.PushMessage_Operation" align="center">
           <template slot-scope="scope">
             <div class="slot_switch" >
              <el-switch
                v-model="scope.row.IsLive"
                :inactive-text="lang.MsgPush_Alarm_Stop"
                :active-text="lang.MsgPush_Alarm_Enable"
                inactive-color="#DCDCDC"
                active-color="#D9E2FA"
                class="my-switch"
                @change="changeSwitch(scope.row, scope.$index, powers.handle, $event)"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ConditionType" show-overflow-tooltip :label="lang.PushMessage_PushCondition" width="200" >
          <template slot-scope="scope">
            <span>{{scope.row.ConditionType | filterCondition(lang)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="DisplayPushMode" show-overflow-tooltip :label="lang.PushMessage_PushMode" align="center"></el-table-column>
        <el-table-column prop="DisplayPushList" show-overflow-tooltip :label="lang.PushMessage_PushList" align="center"></el-table-column>
        <el-table-column prop="DisplayRemindType" show-overflow-tooltip :label="lang.PushMessage_PushRemind" align="center" width="160">
          <template slot-scope="scope">
            <span>{{scope.row.DisplayRemindType}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dialog-push-config
      :visible="showConfig"
      :formData="formData"
      :config="pushConfig"
      :pushInfoData="pushInfoData"
      :title="title"
      @close="closeConfig"
      @confirm="confirmConfig"
      @confirmRelateTable="confirmRelateTable"
    />
  </div>
</template>

<script>
import { dialogPushConfig } from '@/views/push-message/dialogs/index'
import { delConfig, switchConfigPush, addConfig, updConfig, getPushInfoConfig } from '@/api/push-message/index'

export default {
  name: 'PushLeftGroup',
  components: { dialogPushConfig },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      dafault: () => {}
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
      showConfig: false,
      title: '',
      pushConfig: {
        origin: this.config.origin, // 推送源，判断从那个页面跳转过来
        select: {
          deliverys: [
            {
              label: '报警触发时',
              value: 1
            },
            {
              label: '报警确认时',
              value: 2
            },
            {
              label: '报警恢复时',
              value: 3
            },
            {
              label: '报警超时未确认',
              value: 4
            },
            {
              label: '报警超时未恢复',
              value: 5
            },
          ],
          triggers: [
            {
              label: '触发',
              value: 1
            },
            {
              label: '确认',
              value: 2
            },
          ]
        }
      },
      pushInfoData: [],
      formData: {
        ScmsMsgPushConfig:{
          Id: "",
          TaskId: "",
          ConditionType: null,
          PushConditionConfig:{
            Cycle: 5,
            Action: 1,
            Timeout: 30,
            Unit: "M"
          },
          // Title: "",
          // Text: "",
          TitleMessageConfigs: [],
          TextMessageConfigs: [],
          ReminderType: 1,
          PushReminderConfig:{
            Cycle: 5,
            Action: 1,
            Unit: "M",
            UpperLimit: 3
          },
          IsAPP: true,
        },
        ShowUsers: '',
        UserIds:[]
      },
    }
  },
  created() {
    this.pushConfig = {
        origin: this.config.origin, // 推送源，判断从那个页面跳转过来
        select: {
          deliverys: [
            {
              label: this.lang.PushMessage_WhenTriggered,
              value: 1
            },
            {
              label: this.lang.PushMessage_WhenConfirmed,
              value: 2
            },
            {
              label: this.lang.PushMessage_WhenRecovered,
              value: 3
            },
            {
              label: this.lang.PushMessage_WhenTimeoutNotConfirmed,
              value: 4
            },
            {
              label: this.lang.PushMessage_WhenTimeoutNotRecovered,
              value: 5
            },
          ],
          triggers: [
            {
              label: this.lang.PushMessage_Trigger,
              value: 1
            },
            {
              label: this.lang.PushMessage_Confirm,
              value: 2
            },
          ]
        }
      }
  },
  methods: {
    tableRowClick(row, column) {
      this.$emit('rowClick', row)
    },
    openConfig(power) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      if (this.parentCurrentRow === null) {
        this.message_WARN(this, this.lang.PushMessage_SelectPushTask)
        return
      }
      let $this = this
      if (this.config.origin === '报警消息推送') {
        this.formData = {
          ScmsMsgPushConfig:{
            TaskId: this.parentCurrentRow.Id,
            ConditionType: 1,
            PushConditionConfig:{
              Cycle: 5,
              Action: 1,
              Timeout: 30,
              Unit: "M"
            },
            // Title: "",
            // Text: "",
            TitleMessageConfigs: [],
            TextMessageConfigs: [],
            ReminderType: 1,
            PushReminderConfig:{
              Cycle: 5,
              Action: 1,
              Unit: "M",
              UpperLimit: 3
            },
            IsAPP: true,
          },
          ShowUsers: '',
          UserIds:[]
        }
      }
      if (this.config.origin === '代办消息推送') {
        this.formData = {
          ScmsMsgPushConfig:{
            TaskId: this.parentCurrentRow.Id,
            ConditionType: 101,
            PushConditionConfig:{
              Cycle: 5,
              Action: 2,
              Timeout: 30,
              Unit: "M"
            },
            // Title: "",
            // Text: "",
            TitleMessageConfigs: [],
            TextMessageConfigs: [],
            ReminderType: 1,
            PushReminderConfig:{
              Cycle: 5,
              Action: 1,
              Unit: "M",
              UpperLimit: 3
            },
            IsAPP: true,
          },
          ShowUsers: '',
          UserIds:[]
        }
        this.pushConfig.select.deliverys = [
          {
              label: this.lang.PushMessage_WhenReminding,
              value: 101
            },
            // {
            //   label: '待办确认时',
            //   value: 2
            // },
            {
              label: this.lang.PushMessage_WhenDone,
              value: 102
            },
            // {
            //   label: '待办超时未确认',
            //   value: 4
            // },
            {
              label: this.lang.PushMessage_WhenTimeoutNotDeal,
              value: 103
            },
        ]
        this.pushConfig.select.triggers = [
            {
              label: this.lang.PushMessage_Reminding,
              value: 1
            },
            {
              label: this.lang.PushMessage_PlanFinishTime,
              value: 2
            },
        ]
      }
      getPushInfoConfig(this.parentCurrentRow.Type).then(res => {
        $this.pushInfoData = res.data.data
      })
      this.title = this.lang.PushMessage_NewPushConfig
      this.showConfig = true
    },
    updConfig (power) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      let $this = this
      console.log(this.currentRow)
      if (this.currentRow === null) {
        this.message_WARN(this, this.lang.PushMessage_SelectPushConfig)
        return
      }
      let UserIds = []
      this.currentRow.ScmsMsgPushConfig2Users.forEach(item => {
        UserIds.push(item.UserId)
      })
      let action = 0
      if (this.config.origin === '报警消息推送') {
        action = 1
      } else if (this.config.origin === '代办消息推送') {
        action = 2
        this.pushConfig.select.deliverys = [
          {
              label: this.lang.PushMessage_WhenReminding,
              value: 101
            },
            // {
            //   label: '待办确认时',
            //   value: 2
            // },
            {
              label: this.lang.PushMessage_WhenDone,
              value: 102
            },
            // {
            //   label: '待办超时未确认',
            //   value: 4
            // },
            {
              label: this.lang.PushMessage_WhenTimeoutNotDeal,
              value: 103
            },
        ]
        this.pushConfig.select.triggers = [
            {
              label: this.lang.PushMessage_Reminding,
              value: 1
            },
            {
              label: this.lang.PushMessage_PlanFinishTime,
              value: 2
            },
        ]
      }
      this.formData =  {
        ScmsMsgPushConfig:{
          Id: this.currentRow.Id,
          ConditionType: this.currentRow.ConditionType,
          PushConditionConfig: {
            Cycle: this.currentRow.PushConditionConfig !== null ? this.currentRow.PushConditionConfig.Cycle : 5,
            Action: this.currentRow.PushConditionConfig !== null ? this.currentRow.PushConditionConfig.Action : action,
            Timeout: this.currentRow.PushConditionConfig !== null ? this.currentRow.PushConditionConfig.Timeout : 5,
            Unit: this.currentRow.PushConditionConfig !== null ? this.currentRow.PushConditionConfig.Unit : 'H'
          },
          // Title: this.currentRow.Title,
          TextMessageConfigs: this.currentRow.TextMessageConfigs,
          // Text: this.currentRow.Text,
          TitleMessageConfigs: this.currentRow.TitleMessageConfigs,
          ReminderType: this.currentRow.ReminderType,
          PushReminderConfig:{
            Cycle: this.currentRow.PushReminderConfig !== null ? this.currentRow.PushReminderConfig.Cycle : 5,
            Action: this.currentRow.PushReminderConfig !== null ? this.currentRow.PushReminderConfig.Action : 1,
            Unit: this.currentRow.PushReminderConfig !== null ? this.currentRow.PushReminderConfig.Unit : 'M',
            UpperLimit: this.currentRow.PushReminderConfig !== null ? this.currentRow.PushReminderConfig.UpperLimit : 3,
          },
          IsAPP: this.currentRow.IsAPP
        },
        ShowUsers: this.currentRow.DisplayPushList,
        UserIds,
      }
      getPushInfoConfig(this.parentCurrentRow.Type).then(res => {
        $this.pushInfoData = res.data.data
      })
      this.title = this.lang.PushMessage_EditPushConfig
      this.showConfig = true
    },
    delConfig (power) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      let $this = this
      if (this.currentRow === null) {
        this.message_WARN(this, this.lang.PushMessage_SelectPushConfig)
        return
      }
      this.confirm_Pop(this, this.lang.PushMessage_DeletePushConfig/* this.lang.PushMessage_DeletePfushConfig */, function () {
        delConfig([$this.currentRow.Id]).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, $this.lang.FormulaManage_HT_DeletedSuccessfully)
            $this.$emit('refreshData')
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.MessageBox_YES, no: this.lang.MessageBox_NO})
    },
    changeSwitch (row, index, power, value) {
      if (!power) {
        this.$emit('noChangeSwitch', index, !value)
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      let $this = this
      let postData = {
        EntityId: row.Id,
        IsLive: value
      }
      switchConfigPush(postData).then(res => {
        // $this.message_OK($this, '操作成功')
        // $this.$emit('refreshData')
      })
    },
    closeConfig() {
      this.title = ''
      this.formData = {
        ScmsMsgPushConfig:{
          Id:"",
          TaskId: "",
          ConditionType: null,
          PushConditionConfig:{
            Cycle: 5,
            Action: 1,
            Timeout: 30,
            Unit: "M"
          },
          // Title:"",
          // Text:"",
          TitleMessageConfigs: [],
          TextMessageConfigs: [],
          ReminderType: 1,
          PushReminderConfig:{
            Cycle: 5,
            Action: 1,
            Unit: "M",
            UpperLimit: 3
          },
          IsAPP: true,
        },
        ShowUsers: '',
        UserIds:[]
      }
      this.pushInfoData = []
      this.showConfig = false
    },
    confirmConfig (data) {
      let $this = this
      if (this.title === this.lang.PushMessage_NewPushConfig) {
        addConfig(data).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, $this.lang.ProcessParameterConfigure_HT_AddWorkProject1ViewModel_NewSuccess)
            $this.closeConfig()
            $this.$emit('refreshData')
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }
      if (this.title === this.lang.PushMessage_EditPushConfig) {
          updConfig(data).then(res => {
            if (res.data.code === 0) {
            $this.message_OK($this, $this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully)
            $this.closeConfig()
            $this.$emit('refreshData')
            } else {
              $this.message_ERROR($this, res.data.msg)
            }
          })
      }
    },
    confirmRelateTable (data) {
      this.formData.UserIds = []
      this.formData.ShowUsers = ''
      data.forEach((item, index) => {
        this.formData.UserIds.push(item.UserID)
        this.formData.ShowUsers += `${item.UserName}`
        if (index !== data.length - 1) {
          this.formData.ShowUsers +=` | `
        }
      })
    },
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
</style>