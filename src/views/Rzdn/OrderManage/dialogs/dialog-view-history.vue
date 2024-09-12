<template>
  <Dialog
    :visible="visible"
    width="920px"
    customClass="common_dialog"
    :footer="false"
    :title="title"
    @open="open"
    @close="close"
  >
    <div class="container" >
      <div class="header">
        <el-button class="common_button printBtn" @click="printTag">标签打印</el-button>
      </div>
      <div class="main" >
        <Table
          isSelection
          :tableDataList="tableData"
          :columnList="columnList"
          thColor="#4270E4"
          thBackColor="#DCF0F9"
          @selectionChange="selectionChange"
        >
          <template #Passed="{ scope }" >
            <div :style="scope.row.Passed ? '' : 'color: red'" >{{ scope.row.Passed | orderManageResult }}</div>
          </template>
          <template #Operation="{ scope }" >
            <el-button size="mini" @click="openDetail(scope)">详情</el-button>
          </template>
        </Table>
      </div>
      <div class="footer" >
        <Page :pageData="pageData" @changePage="changePage" />
      </div>
    </div>

    <detail-dialog
      :title="title + '详情'"
      :visible="detailShow"
      :itemDatas="detailData"
      @close="closeDetail"
    />
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'
import Page from '@/newComponents/Page.vue'
import { GetWorkStationRecords, Detail } from '@/api/rzdn/orderManage.js'
import { StartPrinting } from '@/api/rzdn/common.js'
import DetailDialog from './dialog-detail.vue'

export default {
  components: { Dialog, DetailDialog, Table, Page },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    currentRow: {
      type: Object,
      default: () => []
    },
  },
  data() {
    return {
      columnList: [
        {
          label: '产品编号',
          prop: 'ProductId',
          width: '130px'
        },
        {
          label: '生产时间',
          prop: 'ProductionDateTime',
          sortable: true,
        },
        {
          label: '班次',
          prop: 'Shift',
        },
        {
          label: '操作员',
          prop: 'Operator',
        },
        {
          label: '检测结果',
          prop: 'Passed',
        },
        {
          label: '操作',
          prop: 'Operation',
        }
      ],
      tableData: [],
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50
      },
      multipleSelection: [],
      detailShow: false,
      detailData: []
    }
  },
  methods: {
    open() {
      this.getData()
    },
    changePage(pageIndex) {
      this.pageData.PageIndex = pageIndex
      this.getData()
    },
    getData() {
      let $this = this
      let postData = {
        PageNum: this.pageData.PageIndex,
        PageSize: this.pageData.PageSize,
        Payload: {
          OrderId: this.currentRow.OrderId,
          OrderBy: ''
        }
      }
      GetWorkStationRecords(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.pageData.TotalCount = res.data.Data.Total
          $this.tableData = res.data.Data.Result
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    selectionChange(data) {
      this.multipleSelection = data
    },
    printTag() {
      if (this.multipleSelection.length === 0) {
        this.confirm_Pop2(this, '请先勾选要打印的数据')
        return
      }
      let postData =  this.multipleSelection.map(item => ({
        ProductionName: this.currentRow.ProductName,
        ProductionType: /* item.OrderId */ item.ProductNo,
        SerialNumber: item.SerialNumber,
        IsQualified: item.Passed
      }))
      let $this = this
      StartPrinting(1, postData).then(res => {
        if (res.data.code === 0) {
          $this.message_Success($this, '打印成功')
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    close() {
      this.tableData = []
      this.multipleSelection = []
      this.pageData = {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50
      }
      this.$emit('close')
    },
    /* 详情弹窗 */
    openDetail(data) {
      let $this = this
      Detail(data.row.ProductId).then(res => {
        if (res.data.IsSuccess) {
          $this.detailData = res.data.Data
          $this.detailShow = true
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    closeDetail() {
      this.detailShow = false
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