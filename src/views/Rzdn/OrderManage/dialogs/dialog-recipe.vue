<template>
  <Dialog
    :visible="visible"
    width="920px"
    customClass="common_dialog"
    toBody
    :title="title"
    top="10vh"
    @open="open"
    @close="close"
    @ok="confirm"
  >
    <div class="container" >
      <div class="header">
        <search-form :formData="formData" :config="formConfig" @searchData="searchData" />
      </div>
      <div class="main" >
        <Table
          :tableDataList="tableData"
          :columnList="columnList"
          ref="repiceTable"
          thColor="#4270E4"
          thBackColor="#DCF0F9"
          @currentChange="currentChange"
        >
          <template #index="{scope}">
            <div>
              {{(scope.$index + 1) +  (pageData.PageIndex - 1) * pageData.PageSize}}
            </div>
          </template>
        </Table>
      </div>
      <div class="footer" >
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
import { GetFormularInfo } from '@/api/rzdn/orderManage.js'

export default {
  components: { Dialog, SearchForm, Table, Page },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    formularId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      currentRow: null,
      formConfig: {
        form: [
          {
            type: 'input',
            prop: 'Keyword'
          },
          {
            type: 'btn',
            name: '查询'
          }
        ]
      },
      formData: {
        Keyword: ''
      },
      columnList: [
        {
          label: '序号',
          prop: 'index',
        },
        {
          label: '配方编号',
          prop: 'FormularNo',
        },
        {
          label: '配方名称',
          prop: 'FormularName',
        }
      ],
      tableData: [],
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50
      },
    }
  },
  methods: {
    open() {
      this.getData()
    },
    currentChange(val) {
      this.currentRow = val
    },
    searchData(formData) {
      this.getData()
    },
    getData() {
      let $this = this
      let postData = {
        PageNum: this.pageData.PageIndex,
        PageSize: this.pageData.PageSize,
        Payload: {
          FormularName: this.formData.Keyword
        },
      }
      GetFormularInfo(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.pageData.TotalCount = res.data.Data.Total
          $this.tableData = res.data.Data.Result
          let index =  $this.tableData.findIndex(f => f.FormularNo === $this.formularId)
          if (index !== -1) {
            $this.setCurrentRow($this.tableData[index])
          }
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    setCurrentRow(rowData) {
      let $this = this
      this.$nextTick(() => {
        $this.$refs.repiceTable.$refs.table.setCurrentRow(rowData)
      })
    },
    changePage(pageIndex) {
      this.pageData.PageIndex = pageIndex
      this.getData()
    },
    close() {
      this.formData = {
        Keyword: ''
      }
      this.tableData = []
      this.currentRow = null
      this.$emit('close')
    },
    confirm() {
      if (this.currentRow === null) {
        this.confirm_Pop2(this, '请选择配方')
        return
      }
      this.$emit('confirm', this.currentRow)
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 620px;
}
.header {
  height: 50px;
  display: flex;
  align-items: center;
}
.main {
  height: calc(100% - 50px - 50px);
  border: 1px solid #E8E8E8;
}
.printBtn {
  border-color: #46BE05;
  color: #46BE05;
}
.delBtn {
  color: #fff;
  border-color: #999999;
  background: #999999;
}
.footer {
  height: 50px;
  display: flex;
  align-items: center;
}
</style>