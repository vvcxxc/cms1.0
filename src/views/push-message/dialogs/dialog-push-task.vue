<template>
  <el-dialog
    :title="title"
    :visible="visible"
    v-el-drag-dialog
    custom-class="common_dialog"
    @open="open"
    @close="close"
    width="800px"
    top="14vh"
  >
    <div class="wrap" >
      <div class="wrap_item" >
        <div class="wrap_item_label">{{config.inputlabelName}}</div>
        <div class="wrap_item_content" >
          <el-input class="common_input" v-model="formData.ScmsMsgPushTask.Name" />
        </div>
      </div>

      <div class="wrap_item" >
        <div class="wrap_item_label">{{lang.PushMessage_PushSource}}</div>
        <div class="wrap_item_origin" v-if="config.showRadio">
          <el-radio-group class="common_radio_group" v-model="formData.ScmsMsgPushTask.Type" @change="changeRadio">
            <!-- <el-radio :label="100">代办巡检</el-radio>
            <el-radio :label="101">代办保养</el-radio>
            <el-radio :label="102">代办维修</el-radio> -->
            <el-radio v-for="item in config.radioList" :key="item.value" :label="item.value" >{{item.label}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="wrap_main" >
        <div class="wrap_main_header" >
          <div>
            <span class="main_header_title" >{{config.relateName}}</span>
          </div>
          <div>
            <template v-for="(item, index) in config.btns" >
              <el-button :key="index" class="common_button_plain_green" v-if="item === 1" @click="relateAlarm">{{lang.PushMessage_LinkAlarmControl}}</el-button>
              <el-button :key="index" class="common_button_plain_green" v-if="item === 2" @click="relatePolling">{{lang.PushMessage_AssociatePlan}}</el-button>
              <el-button :key="index" class="common_button_plain_yellow" v-if="item=== 3" @click="choiceAlarmPoint">{{lang.PushMessage_BatchSelectAlarmPoints}}</el-button>
            </template>
          </div>
        </div>
        <div class="wrap_main_content" >
           <el-table
            ref="table"
            class="common_table"
            :data="tableData"
            :border="true"
            height="100%"
            highlight-current-row
            :header-cell-style="{ background: '#DCF0F9', color: '#4976E5' }"
            tooltip-effect="dark"
          >
            <el-table-column v-for="(item, index) in config.tableColumns" :key="index" :prop="item.prop" show-overflow-tooltip :label="item.label" :width="item.width" align="center">
                <template slot-scope="scope" >
                  <span v-if="item.label === lang.PushMessage_SerialNumber">{{scope.$index + 1}}</span>
                  <span v-else >{{scope.row[item.prop]}}</span>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="d_footer_cancel" @click="close">{{lang.PopupCommon_Cancel}}</el-button>
      <el-button class="d_footer_sure"  @click="confirm">{{lang.PopupCommon_Save}}</el-button>
    </span>
    <dialog-relate-table
      :appendToBody="true"
      ref="relateDialog"
      :visible="showRelateTable"
      :config="tableConfig"
      @addToReceiveData="addToReceiveData"
      @removeReceiveData="removeReceiveData"
      @searchData="searchRelateData"
      @close="closeRelateTable"
      @confirm="confirmRelateTable"
    />
    <dialog-alarm-point :appendToBody="true" :checkedList="checkedList" :visible="showAlarm" @close="closeAlarm" @confirm="confirmAlarm" />
  </el-dialog>
</template>

<script>
import dialogRelateTable from './dialog-relate-table'
import dialogAlarmPoint from './dialog-alarm-point'
import { getAlarmTypeList, getAlarmGroupList } from '@/api/common.js'
import { getAlarmPoint, getPlans } from '@/api/push-message/index'

export default {
  name: 'dialogPushTask',
  components: { dialogRelateTable, dialogAlarmPoint },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    },
    pageConfig: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => ({
        inputlabelName: '内容名称',  //输入框前面显示的名称
        relateName: '已关联报警点', //已关联内容名称
        showRadio: false, //是否显示推送源 radio
        radioList: [], //显示推送源 radio需要配置的radiosList
        btns: [],  //按钮 1：关联巡检计划 2：批量选择报警点
        tableColumns: [], //表头渲染数据
      })
    },
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      tableConfig: {
        title: '推送选择报警点',
        subTitle: '已选报警组',
        formConfig: {
          form: [
            {
              type: 'select',
              inputWidth: '150px',
              prop: 'ArrayId',
              name: '报警组：',
              options: []
            },
            {
              type: 'select',
              inputWidth: '150px',
              prop: 'AlarmType',
              name: '报警类别：',
              options: []
            },
            {
              type: 'select',
              inputWidth: '150px',
              prop: 'DataType',
              name: '数据类型：',
              options: []
            },
            {
              type: 'input',
              width: '215px',
              prop: 'keyword',
            },
            {
              type: 'btn_plain',
              name: '查询',
            }
          ],
        },
        formData: {
          ArrayId: null,
          AlarmType: null,
          DataType: null,
          Keyword: '',
        },
        sendData: [],
        receiveData: [],
        tableColumns: [
          {
            label: '报警组',
            prop: 'AlarmArray',
          },
          {
            label: '变量名',
            prop: 'TagName',
          },
          {
            label: '数据类型',
            prop: 'DataType',
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
      },
      showAlarm: false,
      showRelateTable: false,
      checkedList: [],
    }
  },
  methods: {
    open () {
      this.tableConfig = {
        title: this.lang.PushMessage_BatchSelectAlarmPoints,
        subTitle: this.lang.PushMessage_AlreadyAssociatedAlarm,
        formConfig: {
          form: [
            {
              type: 'select',
              inputWidth: '150px',
              prop: 'ArrayId',
              name: this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmGroup2,
              options: []
            },
            {
              type: 'select',
              inputWidth: '150px',
              prop: 'AlarmType',
              name: this.lang.AlarmRecord_HT_AlarmPointManageUC_AlarmCategory2,
              options: []
            },
            {
              type: 'select',
              inputWidth: '150px',
              prop: 'DataType',
              name: this.lang.FormulaManage_AddProject_VariableType,
              options: []
            },
            {
              type: 'input',
              width: '215px',
              prop: 'keyword',
            },
            {
              type: 'btn_plain',
              name: this.lang.PushMessage_Query,
            }
          ],
        },
        formData: {
          ArrayId: null,
          AlarmType: null,
          DataType: null,
          Keyword: '',
        },
        sendData: [],
        receiveData: [],
        tableColumns: [
          {
            label: this.lang.AlarmRecord_Time_DataGrid_Group,
            prop: 'AlarmArray',
          },
          {
            label: this.lang.PushMessage_VariableName,
            prop: 'TagName',
          },
          {
            label: this.lang.FormulaManage_AddProject_DataGrid_VariableType,
            prop: 'DataType',
          },
          {
            label: this.lang.AlarmRecord_Time_DataGrid_Type,
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
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm', this.formData, this.tableData)
    },
    relateAlarm () {
      this.checkedList = []
      this.tableData.forEach(item => {
        this.checkedList.push(item.ID)
      })
      this.showAlarm = true
    },
    changeRadio(val) {
      this.$emit('changeRadio', val)
    },
    relatePolling () {
      this.tableConfig = {
        title: this.lang.PushMessage_AssociatePlan,
        subTitle: this.lang.PushMessage_AssociatedPlan,
        formConfig: {
          form: [
            // {
            //   type: 'select-tree',
            //   width: '280px',
            //   labelWidth: '80px',
            //   prop: 'TaskType',
            //   name: '设备类型：',
            //   options: []
            // },
            {
              type: 'input',
              width: '250px',
              prop: 'Keyword',
            },
            {
              type: 'btn_plain',
              name: this.lang.PushMessage_Query,
            }
          ],
        },
        formData: {
          TaskType: this.formData.ScmsMsgPushTask.Type,
          Keyword: "",
          EntityIds: null
        },
        sendData: [],
        receiveData: [],
        tableColumns: this.config.tableColumns
      },
      this.tableConfig.receiveData = JSON.parse(JSON.stringify(this.tableData))
      this.showRelateTable = true
    },
    choiceAlarmPoint() {
      this.tableConfig.receiveData = JSON.parse(JSON.stringify(this.tableData))
      this.getAlarmGroup()
      this.getAlarmType()
      this.getDataType()
      this.showRelateTable = true
    },
    getAlarmGroup() {
      let $this = this
      $this.tableConfig.formConfig.form[0].options = []
      getAlarmGroupList().then(res => {
        $this.tableConfig.formConfig.form[0].options = res.data.data.map((item) => ({
          label: item.aArrayName,
          value: item.aArrayId
        }))
        $this.tableConfig.formConfig.form[0].options.unshift({ label: this.lang.LogManage_HT_Unlimited, value: null })
      })
    },
    getAlarmType() {
      let $this = this
      $this.tableConfig.formConfig.form[1].options = []
      getAlarmTypeList().then(res => {
        $this.tableConfig.formConfig.form[1].options = res.data.data.map((item) => ({
          label: item.Text,
          value: item.Value
        }))
        $this.tableConfig.formConfig.form[1].options.unshift({ label: this.lang.LogManage_HT_Unlimited, value: null })
      })
    },
    getDataType() {
      let $this = this
      $this.tableConfig.formConfig.form[2].options = []
      let postData = {
        AlarmType: null,
        DataType: null,
        EntityId: null,
        Keyword: "",
      }
      getAlarmPoint(postData).then(res => {
        $this.tableConfig.formConfig.form[2].options = res.data.data.DataTypes.map((item) => ({
          label: item.Title,
          value: item.Key
        }))
        $this.tableConfig.formConfig.form[2].options.unshift({ label: this.lang.LogManage_HT_Unlimited, value: null })
      })
    },
    /* 批量选择报警点弹窗 */
    addToReceiveData (multipleSelection) {
      if (this.tableConfig.receiveData.length === 0) {
        this.tableConfig.receiveData = this.tableConfig.receiveData.concat(multipleSelection)
      } else {
        if (this.pageConfig.origin === '报警消息推送') {
          multipleSelection.forEach(item => {
            let index = this.tableConfig.receiveData.findIndex(f => f.ID === item.ID)
            if (index === -1) { // 不存在，添加
              this.tableConfig.receiveData.push(item)
            }
          })
        }

        if (this.pageConfig.origin === '代办消息推送') {
           multipleSelection.forEach(item => {
            let index = this.tableConfig.receiveData.findIndex(f => f.Id === item.Id)
            if (index === -1) { // 不存在，添加
              this.tableConfig.receiveData.push(item)
            }
          })
        }

      }
    },
    removeReceiveData (multipleSelection) {
      if (this.pageConfig.origin === '报警消息推送') {
        multipleSelection.forEach(item => {
          let index = this.tableConfig.receiveData.findIndex(f => f.ID === item.ID)
          this.tableConfig.receiveData.splice(index, 1)
        })
      }
      if (this.pageConfig.origin === '代办消息推送') {
        multipleSelection.forEach(item => {
          let index = this.tableConfig.receiveData.findIndex(f => f.Id === item.Id)
          this.tableConfig.receiveData.splice(index, 1)
        })
      }
    },
    searchRelateData (searchData) {
      let $this = this
      if (this.pageConfig.origin === '报警消息推送') {
        getAlarmPoint(searchData).then(res => {
          $this.tableConfig.sendData = res.data.data.AlarmInfo
        })
      }
      if (this.pageConfig.origin === '代办消息推送') {
        getPlans(searchData).then(res => {
          $this.tableConfig.sendData = res.data.data
        })
      }
    },
    closeRelateTable() {
      this.tableConfig.receiveData = []
      this.tableConfig.formData = {
          EntityId: null,
          AlarmType: null,
          DataType: null,
          Keyword: '',
        }
      this.showRelateTable = false
    },
    confirmRelateTable (data) {
      this.$emit('changeTaleData', data)
      this.closeRelateTable()
    },
    /* 关联报警控件弹窗 */
    closeAlarm() {
      this.showAlarm = false
    },
    confirmAlarm(checkedIds) {
      this.$emit('getTableData', checkedIds)
      this.closeAlarm()
    },
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  .wrap_item {
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    padding-left: 10px;
    height: 50px;
    &::before {
      content: "";
      position: absolute;
      width: 3px;
      height: 20px;
      left: 0;
      background: #508BEB;
    }
    .wrap_item_label {
      width: 90px;
    }
    .wrap_item_content {
      width: 360px;
    }
    .wrap_item_origin {
      padding-left: 10px;
      width: 100%;
    }
  }
}
.wrap_main {
  border: 1px solid #D6D6D6;
  height: 430px;
  padding: 0 15px;
  box-sizing: border-box;
  background: #E6E6E6;
}
.wrap_main_header {
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .main_header_title {
    color:#386DF0;
  }
}
.wrap_main_content {
  width: 100%;
  height: calc(100% - 46px - 20px);
}
</style>