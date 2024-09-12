<template>
  <div class="push-left" >
    <div class="push_header">
      <span class="push_title" >{{lang.PushMessage_PushGroup}}</span>
      <div class="btns" >
        <div class="btn_add" @click="openGroup(powers.add)" >
          <img src="../../../assets/images/组 11@2x.png" />
        </div>
        <div class="btn_upd" @click="editGroup(powers.upd)" >
          <img src="../../../assets/images/形状 7@2x.png" />
        </div>
        <div class="btn_del" @click="delGroup(powers.del)" >
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
        <el-table-column prop="Name" :show-overflow-tooltip="true" :label="lang.PushMessage_GroupName" ></el-table-column>
      </el-table>
    </div>

    <!-- 弹窗 -->
    <dialog-group :visible="groupShow" :title="groupTitle" :formData="formData" @close="closeGroup" @confirm="confirmGroup" />
  </div>
</template>

<script>
import { dialogGroup } from '@/views/push-message/dialogs/index'
import { addGroup, delGroup, updGroup, switchGroupPush } from '@/api/push-message/index'

export default {
  name: 'PushLeftGroup',
  components: { dialogGroup },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    currentRow: {
      type: Object,
      default: () => {}
    },
    config: {
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
      groupShow: false,
      groupTitle: '',
      formData: {
        CreateTime: "",
        Id: "",
        IsLive: null,
        Name: "",
        Sequence: null,
        Type: null,
      },
    }
  },
  methods: {
    tableRowClick(row) {
      this.$emit('rowClick', row)
    },
    openGroup(power = true) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      this.groupTitle = /* '新增推送分组' */this.lang.PushMessage_NewPushGroup
      this.groupShow = true
      this.formData = {
        CreateTime: "",
        Id: "",
        IsLive: null,
        Name: "",
        Sequence: null,
        Type: null,
      }
    },
    editGroup(power = true) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      if (this.currentRow === null) {
        this.message_WARN(this, /* '请先选择分组' */this.lang.PushMessage_SelectPushGroup)
        return
      }
      this.groupTitle = /* '编辑推送分组' */this.lang.PushMessage_EditPushGroup
      this.formData = {
        CreateTime: this.currentRow.CreateTime,
        Id: this.currentRow.Id,
        IsLive: this.currentRow.IsLive,
        Name: this.currentRow.Name,
        Sequence: this.currentRow.Sequence,
        Type: this.currentRow.Type,
      }
      this.groupShow = true
    },
    delGroup (power = true) {
      if (!power) {
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        return
      }
      if (this.currentRow === null) {
        this.message_WARN(this, this.lang.PushMessage_SelectPushGroup)
        return
      }
      let $this = this
      this.confirm_Pop(this, this.lang.PushMessage_DeletePushGroup, function () {
        delGroup([$this.currentRow.Id]).then(res => {
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
        this.confirm_Pop2(this, this.lang.NoOperationAuthority, {tips: this.lang.HT_MessageBoxCaption_Tips, yes: this.lang.PushMessage_Confirm })
        this.$emit('noChangeSwitch', index, !value)
        return
      }
      let $this = this
      let postData = {
        EntityId: row.Id,
        IsLive: value
      }
      switchGroupPush(postData).then(res => {
        // $this.message_OK($this, '操作成功')
        // $this.$emit('refreshData')
      })
    },
    closeGroup () {
      this.groupTitle = ''
      this.groupShow = false
      this.formData = {
        CreateTime: "",
        Id: "",
        IsLive: null,
        Name: "",
        Sequence: null,
        Type: null,
      }
    },
    confirmGroup (data, title) {
      let $this = this
      /* 新增 */
      if (title === this.lang.PushMessage_NewPushGroup) {
        let postData = {
          Name: data.Name,
        }
        if (this.config.origin === '报警消息推送') {
          postData.Type = 1
        }
        if (this.config.origin === '代办消息推送') {
          postData.Type = 2
        }
        addGroup(postData).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, $this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_NewSuccess)
            $this.$emit('refreshData')
            $this.closeGroup()
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }
      /* 编辑 */
      if (title === /* '编辑推送分组' */this.lang.PushMessage_EditPushGroup) {
        let postData = {
          Id: data.Id,
          Name: data.Name,
          IsLive: data.IsLive
        }
        updGroup(postData).then(res => {
          if (res.data.code === 0) {
            $this.message_OK($this, $this.lang.ProcessParameterConfigure_HT_ModifyWorkProject1ViewModel_SuccessfullyModified)
            $this.$emit('refreshData')
            $this.closeGroup()
          } else {
            $this.message_ERROR($this, res.data.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
</style>