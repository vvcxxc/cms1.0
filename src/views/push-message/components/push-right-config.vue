<template>
  <div class="push-left" >
    <div class="push_header">
      <span class="push_title" >推送配置</span>
      <div class="btns" >
        <div class="btn_add" @click="openConfig" >
          <img src="../../../assets/images/组 11@2x.png" />
        </div>
        <div class="btn_upd" @click="updConfig" >
          <img src="../../../assets/images/形状 7@2x.png" />
        </div>
        <div class="btn_del" @click="delConfig">
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
        <el-table-column label="序号" show-overflow-tooltip align="center" min-width="40">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="IsLive" show-overflow-tooltip label="操作" align="center">
           <template slot-scope="scope">
             <div class="slot_switch" >
              <el-switch
                v-model="scope.row.IsLive"
                inactive-text="暂停"
                active-text="启用"
                inactive-color="#DCDCDC"
                active-color="#D9E2FA"
                class="my-switch"
                @change="changeSwitch(scope.row, $event)"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ConditionType" show-overflow-tooltip label="推送条件" width="200" >
          <template slot-scope="scope">
            <span>{{scope.row.ConditionType | filterCondition}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="DisplayPushMode" show-overflow-tooltip label="推送方式" align="center"></el-table-column>
        <el-table-column prop="DisplayPushList" show-overflow-tooltip label="推送名单" align="center"></el-table-column>
        <el-table-column prop="DisplayRemindType" show-overflow-tooltip label="推送提醒" align="center" width="160">
          <template slot-scope="scope">
            <span>{{scope.row.DisplayRemindType}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dialog-push-config :visible="showConfig" :formData="formData" :config="pushConfig" :pushInfoData="pushInfoData" :title="title" @close="closeConfig" @confirm="confirmConfig" />
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
          Title: "",
          Text: "",
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
  methods: {
    tableRowClick(row, column) {
      this.$emit('rowClick', row)
    },
    openConfig() {
      let $this = this
      if (this.config.origin === '报警消息推送') {
        this.formData = {
          ScmsMsgPushConfig:{
            TaskId: this.parentCurrentRow.Id,
            ConditionType: null,
            PushConditionConfig:{
              Cycle: 5,
              Action: 1,
              Timeout: 30,
              Unit: "M"
            },
            Title: "测试Title",
            Text: "测试Text",
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
        getPushInfoConfig(this.parentCurrentRow.Type).then(res => {
          $this.pushInfoData = res.data.data
        })
      }
      if (this.config.origin === '代办消息推送') {
        this.pushConfig.select.deliverys = [
          {
              label: '待办提醒时',
              value: 0
            },
            {
              label: '待办确认时',
              value: 1
            },
            {
              label: '待办处理完成时',
              value: 2
            },
            {
              label: '代办超时未确认',
              value: 3
            },
            {
              label: '代办超时未处理',
              value: 4
            },
        ]
        this.pushConfig.select.triggers = [
            {
              label: '提醒',
              value: 0
            },
            {
              label: '计划执行时间',
              value: 1
            },
        ]
      }
      this.title = '新增推送配置'
      this.showConfig = true
    },
    updConfig () {
      let $this = this
      console.log(this.currentRow)
      if (this.currentRow === null) {
        this.message_WARN(this, '请先选择配置')
        return
      }
      let UserIds = []
      this.currentRow.ScmsMsgPushConfig2Users.forEach(item => {
        UserIds.push(item.UserId)
      })
      this.formData =  {
        ScmsMsgPushConfig:{
          Id: this.currentRow.Id,
          ConditionType: this.currentRow.ConditionType,
          PushConditionConfig: {
            Cycle: this.currentRow.PushConditionConfig !== null ? this.currentRow.PushConditionConfig.Cycle : 5,
            Action: this.currentRow.PushConditionConfig !== null ? this.currentRow.PushConditionConfig.Action : null,
            Timeout: this.currentRow.PushConditionConfig !== null ? this.currentRow.PushConditionConfig.Timeout : 5,
            Unit: this.currentRow.PushConditionConfig !== null ? this.currentRow.PushConditionConfig.Unit : 'H'
          },
          Title: this.currentRow.Title,
          TextMessageConfigs: this.currentRow.TextMessageConfigs,
          Text: this.currentRow.Text,
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
      this.title = '编辑推送配置'
      this.showConfig = true
    },
    delConfig () {
      let $this = this
      if (this.currentRow === null) {
        this.message_WARN(this, '请先选择配置')
        return
      }
      this.confirm_Pop(this, '是否确认删除选中配置？', function () {
        delConfig([$this.currentRow.Id]).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, '删除成功')
            $this.$emit('refreshData')
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      })
    },
    changeSwitch (row, value) {
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
          Title:"",
          Text:"",
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
      if (this.title === '新增推送配置') {
        addConfig(data).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, '新增成功')
            $this.closeConfig()
            $this.$emit('refreshData')
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }
      if (this.title === '编辑推送配置') {
          updConfig(data).then(res => {
            if (res.data.code === 0) {
            $this.message_OK($this, '修改成功')
            $this.closeConfig()
            $this.$emit('refreshData')
            } else {
              $this.message_ERROR($this, res.data.msg)
            }
          })
      }
      this.closeConfig()
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
</style>