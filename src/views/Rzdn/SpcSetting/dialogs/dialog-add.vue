<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="1100px"
    customClass="common_dialog"
    @open="open"
    @close="close"
    @ok="confirm"
    top="10vh"
  >
    <div class="wrap" >
      <div class="wrap_header">
        <div>检测项目</div>
        <div v-if="title === '新增检测项目'" >
          <el-button class="common_mini_button" style="border-color: #8BD36C; color:#8BD36C" @click="addRow">添加项目</el-button>
          <el-button class="common_mini_button" style="border-color: #A9A9A9; color:#A9A9A9" @click="delRow">删除项目</el-button>
        </div>
      </div>
      <div class="wrap_main" >
        <Table
          :columnList="columnList"
          :tableDataList="tableData"
          isSelection
          thColor="#4270E4"
          thBackColor="#DCF0F9"
          @selectionChange="selectionChange"
        >
          <template #header-SubgroupCapacity="{scope}">
            <div class="slot_header" >
              <i class="slot_tip el-icon-question" @click="tipClick"></i>
              <span>{{scope.column.label}}</span>
            </div>
          </template>
          <template #ParameterName="{scope}">
            <div>
              <el-input class="table_input" v-model="scope.row.ParameterName" ></el-input>
            </div>
          </template>
          <template #VariableName="{scope}">
            <div>
              <el-input class="table_input" disabled v-model="scope.row.VariableName" >
                <template slot="append">
                  <div class="append" @click="openVariablePop(scope.row)">···</div>
                </template>
              </el-input>
            </div>
          </template>
          <template #SubgroupCapacity="{scope}">
            <div>
              <el-input-number :controls="false" :min="0" class="table_input" v-model="scope.row.SubgroupCapacity" ></el-input-number>
            </div>
          </template>
          <template #UpperLimit="{scope}">
            <div>
              <el-input-number :controls="false" :min="0" class="table_input" v-model="scope.row.UpperLimit" ></el-input-number>
            </div>
          </template>
          <template #LowerLimit="{scope}">
            <div>
              <el-input-number :controls="false" :min="0" class="table_input" v-model="scope.row.LowerLimit" ></el-input-number>
            </div>
          </template>
          <template #TargetValue="{scope}">
            <div>
              <el-input-number :controls="false" :min="0" class="table_input" v-model="scope.row.TargetValue" ></el-input-number>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <child-group
      :visible="childGroupShow"
      @close="childGroupClose"
      toBody
    />
    <variable-dialog
      :visible="variableShow"
      @close="variableClose"
      @confirm="variableConfirm"
      toBody
    />
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'
import ChildGroup from './dialog-child-group.vue'
import VariableDialog from './dialog-variable.vue'

export default {
  components: { Dialog, Table, ChildGroup, VariableDialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新增检测项目'
    },
    concatData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columnList: [
        {
          label: '序号',
          prop: 'SerialNumber',
          width: '60px'
        },
        {
          label: '参数名',
          prop: 'ParameterName',
          width: '210px'
        },
        {
          label: '变量名',
          prop: 'VariableName',
          width: '210px',
        },
        {
          label: '子组容量',
          prop: 'SubgroupCapacity',
        },
        {
          label: '上限值',
          prop: 'UpperLimit',
        },
        {
          label: '下限值',
          prop: 'LowerLimit',
        },
        {
          label: '目标值',
          prop: 'TargetValue',
        },
      ],
      tableData: [],
      multipleSelection: [],
      childGroupShow: false,
      variableShow: false,
      currentData: null,
    }
  },
  methods: {
    open() {
      // eslint-disable-next-line no-undef
      this.tableData = structuredClone(this.tableData.concat(this.concatData))
    },
    selectionChange(value) {
      this.multipleSelection = value
    },
    addRow() {
      if (this.tableData.length === 0) {
        this.tableData.push({
          SerialNumber: 1,
          ParameterName: '',
          VariableName: '',
          SubgroupCapacity: '',
          UpperLimit: '',
          LowerLimit: '',
          TargetValue: '',
          Operator: JSON.parse(sessionStorage.getItem('userInfo1')) ? JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserName : 'Guest'
        })
      } else {
        for(var index = 0, len = this.tableData.length; index < len; index++) {
          if(this.tableData[index].ParameterName === '' || this.tableData[index].ParameterName === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】参数名不能为空`)
            return
          }
          if(this.tableData[index].VariableName === '' || this.tableData[index].VariableName === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】变量名不能为空`)
            return
          }
          if(this.tableData[index].SubgroupCapacity === '' || this.tableData[index].SubgroupCapacity === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】子组容量不能为空`)
            return
          }
          if(this.tableData[index].UpperLimit === '' || this.tableData[index].UpperLimit === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】上限值不能为空`)
            return
          }
          if(this.tableData[index].LowerLimit === '' || this.tableData[index].LowerLimit === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】下限值不能为空`)
            return
          }
          if(this.tableData[index].TargetValue === '' || this.tableData[index].TargetValue === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】目标值不能为空`)
            return
          }
        }
        this.tableData.push({
          SerialNumber: this.tableData[this.tableData.length - 1].SerialNumber + 1,
          ParameterName: '',
          VariableName: '',
          SubgroupCapacity: '',
          UpperLimit: '',
          LowerLimit: '',
          TargetValue: '',
          Operator: JSON.parse(sessionStorage.getItem('userInfo1')) ? JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserName : 'Guest'
        })
      }
    },
    delRow() {
      if (this.multipleSelection.length === 0) {
        this.confirm_Pop2(this, '请先勾选数据')
      }
      let ids = this.multipleSelection.map(item => item.SerialNumber)
      this.tableData = this.tableData.filter(f => !ids.includes(f.SerialNumber))
    },
    openVariablePop(data) {
      this.currentData = data
      this.variableShow = true
    },
    variableConfirm(rowData) {
      let index =  this.tableData.findIndex(f => f.SerialNumber === this.currentData.SerialNumber)
      this.tableData[index].VariableName = rowData.VariableName
      this.variableClose()
    },
    variableClose() {
      this.currentData = null
      this.variableShow = false
    },
    tipClick() {
      this.childGroupShow = true
    },
    childGroupClose() {
      this.childGroupShow = false
    },
    close() {
      this.tableData = []
      this.multipleSelection = []
      this.$emit('close')
    },
    confirm() {
      if (this.tableData.length !== 0) {
        for(var index = 0, len = this.tableData.length; index < len; index++) {
          if(this.tableData[index].ParameterName === '' || this.tableData[index].ParameterName === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】参数名不能为空`)
            return
          }
          if(this.tableData[index].VariableName === '' || this.tableData[index].VariableName === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】变量名不能为空`)
            return
          }
          if(this.tableData[index].SubgroupCapacity === '' || this.tableData[index].SubgroupCapacity === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】子组容量不能为空`)
            return
          }
          if(this.tableData[index].UpperLimit === '' || this.tableData[index].UpperLimit === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】上限值不能为空`)
            return
          }
          if(this.tableData[index].LowerLimit === '' || this.tableData[index].LowerLimit === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】下限值不能为空`)
            return
          }
          if(this.tableData[index].TargetValue === '' || this.tableData[index].TargetValue === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].SerialNumber}】目标值不能为空`)
            return
          }
        }
        this.$emit('confirm', this.tableData)
      } else {
        this.confirm_Pop2(this, '无检测项目，无法添加')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 520px;
  background-color: #F3F3F3;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #E4E4E4;
}
.wrap_header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #0080F7;
}
.wrap_main {
  height: calc(100% - 50px);
  width: 100%;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
}
.slot_header {
  display: flex;
  align-items: center;
  .slot_tip {
    margin-right: 5px;
    font-size: 17px;
    cursor: pointer;
  }
}

.append {
  width: 50px;
  height: 32px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #386DF0;
  border-radius: inherit;
}


</style>