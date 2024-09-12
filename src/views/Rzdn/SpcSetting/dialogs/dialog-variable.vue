<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="1100px"
    customClass="common_dialog"
    @open="open"
    @close="close"
    @ok="confirm"
    :toBody="toBody"
    top="14vh"
  >
    <div class="wrap" >
      <div class="wrap_header">
        <search-form :formData="searchFormData" :config="formConfig" @searchData="searchData" @btnClick="btnClick" />
      </div>
      <div class="wrap_main" >
        <Table
          :columnList="columnList"
          :tableDataList="tableData"
          thColor="#4270E4"
          thBackColor="#DCF0F9"
          @currentChange="currentChange"
        >
        </Table>
      </div>
      <div class="wrap_footer" >
        <Page :pageData="pageData" @changePage="changePage" />
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import SearchForm from '@/newComponents/Search-form.vue'
import Table from '@/newComponents/Table.vue'
import Page from '@/newComponents/Page.vue'
import { GstCondition, GetVariable } from '@/api/rzdn/common.js'

export default {
  components: { Dialog, SearchForm, Table, Page },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择变量'
    },
    toBody: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      searchFormData: {
        dataType: '不限',
        keyword: ''
      },
      formConfig: {
        form: [
          {
            type: 'select',
            name: '数据类型：',
            prop: 'dataType',
            options: []
          },
          {
            type: 'input',
            prop: 'keyword',
          },
          {
            type: 'btn_plain',
            name: '查询',
          }
        ]
      },
      columnList: [
        {
          label: '设备名',
          prop: 'DeviceName',
          width: '210px'
        },
        {
          label: '数据类型',
          prop: 'DataType',
          width: '210px'
        },
        {
          label: '变量名',
          prop: 'VariableName',
        },
        {
          label: '描述',
          prop: 'Description',
        },
        {
          label: '变量地址',
          prop: 'Address',
        }
      ],
      tableData: [],
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50
      },
      childGroupShow: false,
      variableShow: false,
      currentRow: null,
    }
  },
  methods: {
    open() {
      this.getData()
      this.getDropData()
    },
    getData() {
      let postData = {
        PageNum: this.pageData.PageIndex,
        PageSize: this.pageData.PageSize,
        Payload: {
          DataType: this.searchFormData.DataType,
          KeyWord: this.searchFormData.keyword
        }
      }
      let $this = this
      GetVariable(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.tableData = res.data.Data.Result
          $this.pageData.TotalCount =  res.data.Data.Total
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    searchData() {
      this.pageData.PageIndex = 1
      this.getData()
    },
    btnClick (item) {

    },
    currentChange(row) {
      this.currentRow = row
    },
    getDropData() {
      let $this = this
      GstCondition().then(res => {
        $this.formConfig.form[0].options = res.data.data[0].Groups[0].DataTypes.map(item => ({
          label: item.Text,
          value: item.Value
        }))
      })
    },
    changePage(pageIndex) {
      this.pageData.PageIndex = pageIndex
      this.getData()
    },
    openVariablePop() {
      this.variableShow = true
    },
    tipClick() {
      this.childGroupShow = true
    },
    childGroupClose() {
      this.childGroupShow = false
    },
    confirm() {
      this.$emit('confirm', this.currentRow)
    },
    close() {
      this.currentRow = null
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input {
  .el-input__inner {
    height: 34px;
  }
}
.wrap {
  height: 520px;
  background-color: #F3F3F3;
  box-sizing: border-box;
  padding: 5px 20px 5px 20px;
  border: 1px solid #E4E4E4;
}
.wrap_header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrap_main {
  height: calc(100% - 50px - 50px);
  width: 100%;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
}
.wrap_footer {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
}

</style>