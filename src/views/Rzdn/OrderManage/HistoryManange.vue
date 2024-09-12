<template>
  <div class="page" >
    <header ref="search">
      <search-form :formData="searchFormData" :config="formConfig"  @searchData="searchData" />
    </header>
    <main :style="{ height: wrapHeight }">
      <Table :tableDataList="tableData" :columnList="columnList" isSelection :ref="'table'">
        <template #index="{scope}">
          <div>
            {{(scope.$index + 1) +  (pageData.PageIndex - 1) * pageData.PageSize}}
          </div>
        </template>

        <template #Operation="{scope}">
          <div>
            <el-button size="mini" class="slot_btn_view" @click="viewRow(scope.row)">查看</el-button>
          </div>
        </template>

        <template #ActualQuantity="{scope}">
          <div>
            <span :style="scope.row.ActualQuantity === scope.row.PlanQuantity ? '' : 'color: red'" >{{scope.row.ActualQuantity}}</span>
          </div>
        </template>
      </Table>
    </main>
    <footer>
      <Page :pageData="pageData" @changePage="changePage" />
    </footer>

    <!-- 弹窗 -->
    <view-dialog
     :title="viewTitle"
     :visible="viewShow"
     :currentRow="viewCurrentRow"
     @close="closeView"
    />
  </div>
</template>

<script>
import moment from 'moment'
import SearchForm from '@/newComponents/Search-form.vue'
import Table from '@/newComponents/Table.vue'
import Page from '@/newComponents/Page.vue'
import ViewDialog from './dialogs/dialog-view-history.vue'
import { GetOrders } from '@/api/rzdn/orderManage.js'
import { getRightTree, getPowerById } from '@/api/rzdn/common.js'
import { findPathByLeafId, getUrlParam } from '@/util/index.js'

export default {
  components: { SearchForm, Table, Page, ViewDialog },
  data() {
    return {
      wrapHeight: 'calc(100% - 60px - 60px)',
      /* searchform */
      searchFormData: {
        orderId: '',
        QueryType: 1,
        timeRange: [moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00', moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'],
      },
      formConfig: {
        form: [
          {
            type: 'input',
            name: '订单号：',
            prop: 'orderId'
          },
          {
            type: 'date-time-range2',
            name: '完成时间：',
            prop: 'timeRange'
          },
          {
            type: 'btn',
            name: '查询'
          }
        ],
      },
      /* table */
      columnList: [
        {
          label: '序号',
          prop: 'index',
          fixed: true,
        },
        {
          label: '订单号',
          prop: 'OrderId',
          width: '110px',
          fixed: true,
        },
        {
          label: '产品名称',
          prop: 'ProductName',
          fixed: true,
        },
        {
          label: '操作',
          prop: 'Operation',
          width: '120px',
          fixed: true,
        },
        {
          label: '产品型号',
          width: '180px',
          prop: 'Model',
        },
        {
          label: '公差',
          prop: 'Tolerance',
        },
        {
          label: '配方编号',
          prop: 'FormularId',
        },
        // {
        //   label: '物料编号',
        //   prop: 'FormularId',
        // },
        {
          label: '实际数量',
          prop: 'ActualQuantity',
        },
        {
          label: '计划数量',
          prop: 'PlanQuantity',
        },
        {
          label: '创建时间',
          width: '160px',
          prop: 'CreateDateTime',
          sortable: true,
        },
        {
          label: '计划开工时间',
          prop: 'StartDateTime',
          width: '180px',
        },
        {
          label: '计划完工时间',
          prop: 'EndDateTime',
          width: '180px',
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
      ],
      tableData: [],
      /* footer */
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50
      },
      viewShow: false,
      viewTitle: '',
      viewCurrentRow: null,
      // 权限
      powerBtn: {
        orderIds: {
          search: false,
        },
      },
    }
  },
   mounted() {
    this.getData()
    window.onresize = () => {
      this.changeTableHeight()
    }
  },
  created() {
    // 获取权限
    this.getPower()
  },
  methods: {
    // 权限
    getPower() {
      let $this = this
      getRightTree().then(res => {
        let powers = res.data.data
        let btnObj = {}
        let buttonarr = findPathByLeafId(getUrlParam('id'), powers)[0].Children
        buttonarr.forEach((item) => {
          btnObj[item.RightDesc] = item
        });
        $this.powerBtn.orderIds = {
          searchId: btnObj['历史订单-查询'].RightID,
        }

        let userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
          userid = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
        } else {
          userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        /* 获取按钮权限 */
        $this.getPowerBtn(userid, $this.powerBtn.orderIds.searchId, 'orderIds', 'search')
      })
    },
    getPowerBtn(userid, btnId, prop, innerProp) {
      let $this = this
      getPowerById(userid, btnId).then(res => {
        $this.powerBtn[prop][innerProp] = res.data.data
      })
    },
    searchData() {
      if (!this.powerBtn.orderIds.search) {
        this.confirm_Pop2(this, '该账户无操作权限！')
        return
      }
      this.pageData.PageIndex = 1
      this.getData()
    },
    getData() {
      let $this = this
      let postData = {
        PageNum: this.pageData.PageIndex,
        PageSize: this.pageData.PageSize,
        Payload: {
          OrderId: this.searchFormData.orderId,
          QueryType: this.searchFormData.QueryType,
          StartDateTime: this.searchFormData.timeRange[0],
          EndDateTime: this.searchFormData.timeRange[1],
          IsHistory: true
        }
      }
      GetOrders(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.pageData.TotalCount = res.data.Data.Total
          $this.tableData = res.data.Data.Result
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    changePage(pageIndex) {
      this.pageData.PageIndex = pageIndex
      this.getData()
    },
    viewRow(rowData) {
      this.viewCurrentRow = rowData
      this.viewTitle = `${rowData.OrderId}订单`
      this.viewShow = true
    },
    closeView() {
      this.viewCurrentRow = null
      this.viewShow = false
    },
    changeTableHeight() {
      let $this = this
      this.$nextTick(() => {
          $this.wrapHeight = `calc(100% - ${this.$refs.search.clientHeight + 60}px)`
      })
    },
  }
}
</script>

<style lang='scss' scoped>
@import './index.scss';
.page {
  width: 100%;
  height: 100%;
}
main {
  width: 100%;
  height: calc(100% - 60px - 60px);
}
header {
  width: 100%;
  line-height: 59px;
  padding: 0 10px;
  background-color: #DFDCDD;
  box-sizing: border-box;
}
footer {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
}
</style>