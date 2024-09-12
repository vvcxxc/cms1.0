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
        <el-button class="common_button" style="padding: 8px 35px;background: #ffffff; border-color: #386DF0; color: #386DF0" @click="openVariable">状态信号</el-button>
        <el-button class="common_button" style="padding: 8px 35px;background: #ffffff; border-color: #46BE05; color: #46BE05" @click="addRow">新增</el-button>
        <el-button class="common_button" style="padding: 8px 35px;background: #999999; border-color: #999999; color: #ffffff" @click="delRow">删除</el-button>
      </div>
      <div class="table" >
        <Table
          isSelection
          :columnList="columnList"
          :tableDataList="tableData"
          @selectionChange="selectionChange"
        >
          <template #index="{ scope }">
            {{scope.$index + 1}}
          </template>
          <template #OKNumber="{ scope }">
            <el-input-number class="common_input" :controls="false" v-model="scope.row.OKNumber" ></el-input-number>
          </template>

          <template #TootipText="{ scope }">
            <el-input class="common_input" v-model="scope.row.TootipText"></el-input>
          </template>

          <template #TextColor="{ scope }">
            <el-select class="common_select" v-model="scope.row.TextColor" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import { GetColorType } from '@/api/rzdn/new-location-management.js'
import { cloneDeep } from 'lodash'

export default {
  components: { Dialog, Table, SelectVariable2 },
  props: {
    title: {
      type: String,
      default: ''
    },
    statusSignal: {
      type: String,
      default: '',
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
          label: '序号',
          prop: 'index',
          width: '60px',
        },
        {
          label: '数值',
          prop: 'OKNumber',
          width: '140px',
        },
        {
          label: '状态文本',
          prop: 'TootipText',
        },
        {
          label: '文本颜色',
          prop: 'TextColor',
          width: '160px',
        },
      ],
      tableData: [],
      options: [],
      sign: '',
      multipleSelection: [],
      selectVariableConfig: {
        state: 'hide',
        list: [],
      }
    }
  },
  methods: {
    open() {
      this.cacheTableData = cloneDeep(this.tableData)
      console.log(this.cacheTableData === this.tableData);
      this.sign = this.statusSignal
      this.selectVariableConfig.list = [{Name: this.sign }]
      this.getDropOptions()
    },
    getDropOptions() {
      let $this = this
      GetColorType().then(res => {
        if (res.data.code === 0) {
          $this.options = res.data.data.map(item => ({
            value: item.Item1,
            label: item.Item2
          }))
        } else {
          $this.confirm_Pop2($this, res.data.msg)
        }
      })
    },
    selectionChange(selection) {
      this.multipleSelection = selection
    },
    addRow() {
      if (this.tableData.length === 0) {
        this.tableData.push({
          ID: 0,
          myId: 0,
          OKNumber: 0,
          TootipText: '',
          TextColor: this.options[0].value
        })
      } else {
        this.tableData.push({
          ID: 0,
          myId: this.tableData[this.tableData.length - 1].myId + 1,
          OKNumber: 0,
          TootipText: '',
          TextColor: this.options[0].value
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
      this.tableData = cloneDeep(this.cacheTableData)
      this.$emit('close')
    },
    confirm() {
      if (this.sign === '') {
        this.confirm_Pop2(this, '状态信号为空， 请选择状态信号')
        return
      }
      if (this.tableData.length === 0) {
        this.confirm_Pop2(this, '请添加设备状态信息')
        return
      }
      for(let index = 0, len = this.tableData.length; index < len; index++) {
        let currentRow = this.tableData[index]
        if(currentRow.OKNumber === '' || currentRow.OKNumber === undefined) {
          this.confirm_Pop2(this, `序号【${index + 1}】数值不能为空`)
          return
        }
        if(currentRow.TootipText === '' || currentRow.TootipText === undefined) {
          this.confirm_Pop2(this, `序号【${index + 1}】提示文本不能为空`)
          return
        }
        let hasRepeat = this.tableData.filter(row => row.OKNumber === currentRow.OKNumber).length > 1
        if (hasRepeat) {
          return this.confirm_Pop2(this, `不能设置与序号【${index + 1}】相同的数值`)
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
</style>