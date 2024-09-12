<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="800px"
    customClass="common_dialog"
    @open="open"
    @close="close"
    @ok="confirm"
    top="14vh"
  >
    <div class="wrap" >
      <div class="wrap_header" >
        <el-button class="common_button setting_header_btn common_button_search" @click="addRow">新增</el-button>
        <el-button class="common_button setting_header_btn common_button_remove" @click="delRow">删除</el-button>
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
          <template #Reason="{ scope }">
            <div>
              <el-input class="table_input" v-model="scope.row.Reason" ></el-input>
            </div>
          </template>
          <template #Method="{ scope }">
            <div>
              <el-input  class="table_input" v-model="scope.row.Method"></el-input>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'
import { GetWarnInfo } from '@/api/rzdn/spcAnaly.js'

export default {
  components: { Dialog, Table },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '报警设置'
    },
  },
  data() {
    return {
      columnList: [
        {
          label: '报警产生原因',
          prop: 'Reason'
        },
        {
          label: '解决方法',
          prop: 'Method'
        }
      ],
      tableData: [],
      multipleSelection: [],
    }
  },
  methods: {
    open() {
      this.getData()
    },
    getData() {
      let $this = this
      GetWarnInfo().then(res => {
        if (res.data.IsSuccess) {
          $this.tableData = res.data.Data.map((item, index) => ({
            ...item,
            index: index + 1
          }))
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    selectionChange(value) {
      this.multipleSelection = value
    },
    addRow() {
      if (this.tableData.length === 0) {
        this.tableData.push({
          index: 1,
          Reason: '',
          Method: ''
        })
      } else {
        for(var index = 0, len = this.tableData.length; index < len; index++) {
          if(this.tableData[index].Reason === '' || this.tableData[index].Reason === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].index}】报警产生原因不能为空`)
            return
          }
          if(this.tableData[index].Method === '' || this.tableData[index].Method === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].index}】解决方法不能为空`)
            return
          }
        }
        this.tableData.push({
          index: this.tableData[this.tableData.length - 1].index + 1,
          Reason: '',
          Method: ''
        })
      }
    },
    delRow() {
      let ids = this.multipleSelection.map(item => item.index)
      this.tableData = this.tableData.filter(f => !ids.includes(f.index))
    },
    confirm() {
      if (this.tableData.length !== 0) {
        for(var index = 0, len = this.tableData.length; index < len; index++) {
          if(this.tableData[index].Reason === '' || this.tableData[index].Reason === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].index}】报警产生原因不能为空`)
            return
          }
          if(this.tableData[index].Method === '' || this.tableData[index].Method === undefined) {
            this.confirm_Pop2(this, `序号【${this.tableData[index].index}】解决方法不能为空`)
            return
          }
        }
      }
      this.$emit('confirm', this.tableData)
    },
    close() {
      this.tableData = []
      this.multipleSelection = []
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 520px;
}
.wrap_header {
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.wrap_main {
  height: calc(100% - 50px);
  width: 100%;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
}
.setting_header_btn {
  padding: 10px 35px !important;
}
</style>