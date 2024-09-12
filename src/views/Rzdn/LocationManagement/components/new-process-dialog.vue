<template>
  <Dialog
    :visible="visible"
    width="840px"
    customClass="common_dialog location_dialog"
    showFlex
    toBody
    top="22vh"
    :title="title"
    @open="open"
    @close="close"
    @ok="confirm"
  >
    <div class="container" >
      <div class="btns">
        <el-button class="common_button" style="padding: 8px 35px;background: #ffffff; border-color: #386DF0; color: #386DF0" @click="openVariable">切换信号</el-button>
        <el-button class="common_button" style="padding: 8px 35px;background: #ffffff; border-color: #46BE05; color: #46BE05" @click="addRow">新增</el-button>
        <el-button class="common_button" style="padding: 8px 35px;background: #999999; border-color: #999999; color: #ffffff" @click="delRow">删除</el-button>
      </div>
      <div class="table" >
        <Table
          isSelection
          ref="process"
          :columnList="columnList"
          :tableDataList="tableData"
          @selectionChange="selectionChange"
        >
          <template #sort="{ scope }">
            <div class="sort-icon" @click="moveUp(scope, scope.$index)" >
              <img src="../../../../assets/images/sort.png"/>
            </div>
          </template>

          <template #index="{ scope }">
            {{ scope.$index + 1 }}
          </template>

          <template #TootipText="{ scope }">
            <el-input class="common_input" v-model="scope.row.TootipText"></el-input>
          </template>

        </Table>
      </div>
    </div>
    <!-- 选择变量 -->
    <select-variable2
      :state="selectVariableConfig.state"
      :list="selectVariableConfig.list"
      @callback="selectVariableCallback"
    ></select-variable2>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'
import SelectVariable2 from '@/newComponents/select-variable2.vue';

export default {
  components: { Dialog, Table, SelectVariable2 },
  props: {
    title: {
      type: String,
      default: ''
    },
    switchingSignal: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      columnList: [
        {
          label: '排序',
          prop: 'sort',
          width: '70px',
        },
        {
          label: '序号',
          prop: 'index',
          width: '60px',
        },
        {
          label: '过程提示内容',
          prop: 'TootipText',
        },
      ],
      tableData: [],
      multipleSelection: [],
      sign: '',
      selectVariableConfig: {
        state: 'hide',
        list: [],
      }
    }
  },
  methods: {
    open() {
      this.sign = this.switchingSignal
      this.selectVariableConfig.list = [{Name: this.sign }]
    },
    selectionChange(selection) {
      this.multipleSelection = selection
    },
    addRow() {
      if (this.tableData.length === 0) {
        this.tableData.push({
          ID: 0,
          myId: 0,
          TootipText: '',
        })
      } else {
        this.tableData.push({
          ID: 0,
          myId: this.tableData[this.tableData.length - 1].myId + 1,
          TootipText: '',
        })
      }
    },
    delRow() {
      if (this.multipleSelection.length === 0) {
        this.confirm_Pop2(this, '最少选择一条数据进行删除')
        return
      }
      let ids = this.multipleSelection.map(item => item.myId)
      this.tableData = this.tableData.filter(f => !ids.includes(f.myId))
    },
    moveUp(data, index) {
      if (index === 0) {
        this.confirm_Pop2(this, '第一条数据，无法进行上移操作')
        return
      }
      let temp = this.tableData[index]
      this.tableData[index] = this.tableData[index - 1]
      this.tableData[index - 1] = temp
      this.tableData = [...this.tableData]
    },
    openVariable() {
      this.selectVariableConfig.state = 'show'
    },
    // 选择变量-回调
    selectVariableCallback(state, list) {
      if (state === 'confirm' && list.length) {
        this.sign = list[0].Name
        this.selectVariableConfig.list = [{Name: list[0].Name}]
      }
      this.selectVariableConfig.state = 'hide'
    },
    close() {
      // this.multipleSelection = []
      // this.tableData = []
      // this.selectVariableConfig.list = []
      this.$emit('close')
    },
    confirm() {
      if (this.sign === '') {
        this.confirm_Pop2(this, '切换信号为空， 请选择切换信号')
        return
      }
      if (this.tableData.length === 0) {
        this.confirm_Pop2(this, '请添加过程提示信息')
        return
      }
      for(let index = 0, len = this.tableData.length; index < len; index++) {
        if(this.tableData[index].TootipText === '' || this.tableData[index].TootipText === undefined) {
          this.confirm_Pop2(this, `序号【${index + 1}】过程提示内容不能为空`)
          return
        }
      }
      // 此处有个接口调用
      this.$emit('confirm', this.sign, this.tabldeData)
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 400px;
  overflow: auto;
}
.btns {
  height: 40px;
}
.table {
  height: calc(100% - 40px);
}
.sort-icon {
  cursor: pointer;
  display: flex;
  justify-content: center;
}
</style>