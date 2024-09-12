<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="1400px"
    customClass="common_dialog alarm_dialog"
    @open="open"
    @close="close"
    top="14vh"
  >
    <div class="wrap" >
      <div class="wrap_header">
        <span>用户权限：</span>
        <span class="header_dot" :class="isPass ? 'green_dot': 'red_dot'"></span>
        <span class="header_label" @click="openVerifyPop">验证</span>
        <div class="btns">
          <el-button class="common_button common_button_add" @click="open">刷新</el-button>
        </div>
      </div>
      <div class="wrap_main" >
        <Table
          :columnList="columnList"
          :tableDataList="tableData"
          thColor="#4270E4"
          thBackColor="#DCF0F9"
        >
          <template #index="{ scope }">
            <div>{{ scope.$index + 1 }}</div>
          </template>
          <template #Reason="{ scope }">
            <div>
              <el-select class="table_select" size="mini" v-model="scope.row.Reason" @change="handelChange($event, scope.$index, scope.row)" >
                <el-option
                  v-for="(item, index) in dropOptions"
                  :key="index"
                  :label="item.Reason"
                  :value="item.Reason">
                </el-option>
              </el-select>
            </div>
          </template>
          <template #Handle="{ scope }">
            <div>
              <el-input class="table_input" disabled v-model="scope.row.Handle" ></el-input>
            </div>
          </template>
          <template #Remarks="{ scope }">
            <div>
              <el-input class="table_input" v-model="scope.row.Remarks" ></el-input>
            </div>
          </template>
          <template #operation="{ scope }">
            <div>
              <el-button class="common_mini_button footer_btn_confirm" :disabled="!isPass" @click="singleConfirm(scope.row)">确认</el-button>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <inner-verify
      :visible="innerVerifyShow"
      @close="innerVerifyClose"
      @confirm="innerVerifyConfirm"
    />
    <template #common-footer >
      <el-button class="common_button common_button_remove footer_btn" @click="close">取消</el-button>
      <el-button class="common_button footer_btn footer_btn_confirm" :disabled="!isPass" @click="allConfirm">全部确认</el-button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'
import InnerVerify from './dialog-inner-verify.vue'
import { GetAlarmRecord, ConfirmAlarm, GetWarnInfo } from '@/api/rzdn/spcAnaly.js'
import { ResetPopUp } from '@/api/rzdn/spcAnaly.js'

export default {
  components: { Dialog, Table, InnerVerify },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '报警确认'
    },
  },
  data() {
    return {
      isPass: false,
      columnList: [
        {
          label: '序号',
          prop: 'index',
          width: '60px'
        },
        {
          label: '报警时间',
          prop: 'CreateTime',
          width: '160px'
        },
        {
          label: '报警站位',
          prop: 'ParameterName',
        },
        {
          label: '图表类型',
          prop: 'ChartType',
        },
        {
          label: '错误类型',
          prop: 'ErrorType',
        },
        {
          label: '点数',
          prop: 'Spot',
        },
        {
          label: '原因',
          prop: 'Reason',
          width: '170px'
        },
        {
          label: '处理方法',
          prop: 'Handle',
          width: '170px'
        },
        {
          label: '备注',
          prop: 'Remarks',
          width: '170px'
        },
        {
          label: '操作',
          prop: 'operation',
        },
      ],
      tableData: [],
      innerVerifyShow: false,
      dropOptions: [],
    }
  },
  methods: {
    open() {
      this.getData()
      this.getDropData()
    },
    handelChange(value, index, data) {
      this.dropOptions.forEach(item => {
        if (item.Reason === value){
          this.tableData[index].Handle = item.Method
        }
      })
    },
    getData() {
       let postData = {
        IsHandle: false
      }
      let $this = this
      GetAlarmRecord(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.tableData = res.data.Data.map(item => ({
            ...item,
            Operator: JSON.parse(sessionStorage.getItem('userInfo1')) ? JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserName : 'Guest'
          }))
        } else {
          $this.tableData = []
          // $this.confirm_Pop2($this, res.data.Msg)
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    getDropData() {
      let $this = this
      GetWarnInfo().then(res => {
        if (res.data.IsSuccess) {
          $this.dropOptions = res.data.Data
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    openVerifyPop() {
      this.innerVerifyShow = true
    },
    innerVerifyConfirm() {
      this.innerVerifyShow = false
      this.isPass = true
    },
    innerVerifyClose() {
      this.innerVerifyShow = false
    },
    close() {
      this.isPass = false
      let $this = this
      ResetPopUp().then((res) => {
        if (!res.data.IsSuccess) {
          $this.message_ERROR(res.data.msg)
        }
      })
      this.$emit('close')
    },
    singleConfirm(rowData) {
      let $this = this
      let postData = [{
        Sequence: rowData.Sequence,
        Id: rowData.Id,
        Reason: rowData.Reason,
        Handle: rowData.Handle,
        Remarks: rowData.Remarks,
        Operator: rowData.Operator
      }]
      this.confirm_Pop(this, '是否报警确认？', function() {
        ConfirmAlarm(postData).then(res => {
          if (res.data.IsSuccess) {
            $this.getData()
          } else {
            $this.confirm_Pop2($this, res.data.Msg)
          }
        })
      })
    },
    allConfirm() {
      let $this = this
      let postData = this.tableData.map(item => ({
        Sequence: item.Sequence,
        Id: item.Id,
        Reason: item.Reason,
        Handle: item.Handle,
        Remarks: item.Remarks,
        Operator: item.Operator
      }))
      ConfirmAlarm(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.getData()
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
::v-deep .alarm_dialog.el-dialog .el-dialog__header {
  background: #F59A23;
}
::v-deep .alarm_dialog .dialog-footer .ok {
  background: #F59A23;
}
.wrap {
  height: 520px;
}
.wrap_header {
  height: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}
.btns {
  position: absolute;
  right: 0px;
}
.header_dot {
  width: 23px;
  height: 23px;
  border-radius: 50%;
}
.red_dot {
  background-color: #FF0000;
}
.green_dot {
  background-color: #70B603;
}
.wrap_main {
  height: calc(100% - 25px - 10px);
  width: 100%;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
}
.header_label {
  background: #70B603;
  color: #fff;
  border-radius: 6px;
  margin-left: 15px;
  padding: 0 20px;
  cursor: pointer;
}
.footer_btn_confirm {
  background: #F3E3AD;
  border-color: #F3E3AD;
  color: #F59A23;
}
.footer_btn_confirm.el-button.is-disabled, .footer_btn_confirm.el-button.is-disabled:focus, .footer_btn_confirm.el-button.is-disabled:hover {
  color: #C0C4CC;
  cursor: not-allowed;
  background-image: none;
  background-color: #FFF;
  border-color: #EBEEF5;
}
.footer_btn {
  padding: 10px 35px !important;
}
</style>