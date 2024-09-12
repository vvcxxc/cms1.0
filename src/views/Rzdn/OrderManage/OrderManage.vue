<template>
  <div class="page">
    <header ref="search">
      <search-form :formData="searchFormData" :config="formConfig" @searchData="searchData" @btnClick="btnClick" />
    </header>
    <main :style="{ height: wrapHeight }">
      <Table :tableDataList="tableData" :columnList="columnList" isSelection ref="table"
        @selectionChange="selectionChange">
        <template #index="{ scope }">
          <div>
            {{ (scope.$index + 1) + (pageData.PageIndex - 1) * pageData.PageSize }}
          </div>
        </template>
        <template #Operation="{ scope }">
          <div>
            <el-button size="mini" class="slot_btn_view" :disabled="[1, 2].includes(scope.row.Status) ? false : true"
              @click="viewRow(scope.row)">查看</el-button>
            <el-button size="mini" class="slot_btn_upd" :disabled="scope.row.Status === 3 ? false : true"
              @click="updRow(scope.row)">修改</el-button>
          </div>
        </template>
        <template #Tolerance="{ scope }">
          <div>
            {{ `${scope.row.ToleranceValue}` }}
          </div>
        </template>

        <template #Status="{ scope }">
          <div v-if="scope.row.Status === 1" style="color: #D9001B">{{ scope.row.Status | orderManageStatus }}</div>
          <div v-else-if="scope.row.Status === 2" style="color: #F5B037">{{ scope.row.Status | orderManageStatus }}
          </div>
          <div v-else>{{ scope.row.Status | orderManageStatus }}</div>
        </template>
      </Table>
    </main>
    <footer>
      <Page :pageData="pageData" @changePage="changePage" />
    </footer>
    <!-- 弹窗 -->
    <start-dialog title="确认弹窗" :formData="startFormData" :visible="startShow" @close="startClose"
      @confirm="startConfirm" />

    <add-dialog :title="addTitle" :visible="addShow" :formData="addFormData" @close="addClose" @confirm="addConfirm"
      @productConfirm="productConfirm" @repiceConfirm="repiceConfirm" />

    <view-dialog :title="viewTitle" :visible="viewShow" :currentRow="viewCurrentRow" @close="viewClose" />
  </div>
</template>

<script>
import moment from 'moment'
import SearchForm from '@/newComponents/Search-form.vue'
import Table from '@/newComponents/Table.vue'
import Page from '@/newComponents/Page.vue'
import StartDialog from './dialogs/dialog-start.vue'
import AddDialog from './dialogs/dialog-add.vue'
import ViewDialog from './dialogs/dialog-view.vue'
import { GetOrders, StartData, ConfirmStart, PauseData, FinishData, DeleteData, GetOrder, AddOrder, UpdateOrder } from '@/api/rzdn/orderManage.js'
import { getRightTree, getPowerById } from '@/api/rzdn/common.js'
import { findPathByLeafId, getUrlParam } from '@/util/index.js'

export default {
  components: { SearchForm, Table, Page, StartDialog, AddDialog, ViewDialog },
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
            type: 'select',
            prop: 'QueryType',
            options: [
              {
                value: 1,
                label: '创建时间'
              },
              {
                value: 2,
                label: '计划开工时间'
              },
              {
                value: 3,
                label: '计划完成时间'
              }
            ]
          },
          {
            type: 'date-time-range2',
            prop: 'timeRange'
          },
          {
            type: 'btn',
            name: '查询'
          }
        ],
        buttons: [
          {
            styles: {
              color: '#46BE05',
              borderColor: '#46BE05',
              backgroundColor: '#fff'
            },
            btnName: '开始',
          },
          {
            styles: {
              color: '#FDA100',
              borderColor: '#FDA100',
              backgroundColor: '#fff'
            },
            btnName: '暂停',
          },
          {
            styles: {
              color: '#D9001B',
              borderColor: '#D9001B',
              backgroundColor: '#fff'
            },
            btnName: '结束',
          },
          {
            styles: {
              color: '#FDA100',
              borderColor: '#FDA100',
              backgroundColor: '#fff'
            },
            btnName: '新增',
          },
          {
            styles: {
              color: '#ffffff',
              borderColor: '#999999',
              backgroundColor: '#999999'
            },
            btnName: '删除',
          },
        ]
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
          width: '120px',
          fixed: true,
        },
        // {
        //   label: '产品名称',
        //   prop: 'ProductName',
        //   width: '180px',
        //   fixed: true,
        // },
        {
          label: '操作',
          prop: 'Operation',
          width: '160px',
          fixed: true,
        },
        {
          label: '产品型号',
          width: '180px',
          prop: 'Model',
        },
        {
          label: '线缆类型',
          prop: 'CableType',
        },
        {
          label: '接头类型',
          prop: 'JointType',
        },
        {
          label: '公差',
          prop: 'Tolerance',
        },
        {
          label: '状态',
          prop: 'Status',
        },
        {
          label: '配方编号',
          prop: 'FormularId',
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
          width: '160px',
          sortable: true,
        },
        {
          label: '计划完工时间',
          prop: 'EndDateTime',
          width: '160px',
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
      multipleSelection: [],
      /* footer */
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50
      },
      /* 弹窗 */
      startShow: false,
      startFormData: {
        operator: '',
        operatorId: '',
        classess: '',
        orderId: '',
        productName: '',
        length: '',
        planCount: '',
        productType: ''
      },
      addShow: false,
      addFormData: {
        orderId: '',
        productName: '',
        productType: '',
        CableType: '',
        JointType: '',
        /* 产品型号参数 */
        model: '',
        k1: "",
        k2: "",
        c: "",
        length: "",
        toleranceType: '',
        toleranceValue: '',
        EndOfCableLength: '',
        /* 配方管理 */
        formularId: '',
        ID: null,
        /* 剩余弹窗数据 */
        planStartTime: /* moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00' */ '',
        planEndTime: /* moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59' */ '',
        planCount: 0,
      },
      addTitle: '',
      viewShow: false,
      viewTitle: '',
      viewCurrentRow: null,
      InproductionCount: 0,
      // 权限
      powerBtn: {
        orderIds: {
          deleteId: null,
          startId: null,
          addId: null,
          pauseId: null,
          searchId: null,
          endId: null,
          delete: false,
          start: false,
          add: false,
          pause: false,
          search: false,
          end: false,
        },
      },
    }
  },
  created() {
    // 获取权限
    this.getPower()
  },
  watch: {
    "$store.state.msgboxShow": function (val) {
      if (!val) {
        this.$msgbox.close()
      }
    }
  },
  mounted() {
    this.getData()
    window.onresize = () => {
      this.changeTableHeight()
    }
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
          deleteId: btnObj['订单管理-删除'].RightID,
          startId: btnObj['订单管理-开始'].RightID,
          addId: btnObj['订单管理-新增'].RightID,
          pauseId: btnObj['订单管理-暂停'].RightID,
          searchId: btnObj['订单管理-查询'].RightID,
          endId: btnObj['订单管理-结束'].RightID,
        }

        let userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
          userid = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
        } else {
          userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        /* 获取按钮权限 */
        $this.getPowerBtn(userid, $this.powerBtn.orderIds.deleteId, 'orderIds', 'delete')
        $this.getPowerBtn(userid, $this.powerBtn.orderIds.startId, 'orderIds', 'start')
        $this.getPowerBtn(userid, $this.powerBtn.orderIds.addId, 'orderIds', 'add')
        $this.getPowerBtn(userid, $this.powerBtn.orderIds.pauseId, 'orderIds', 'pause')
        $this.getPowerBtn(userid, $this.powerBtn.orderIds.searchId, 'orderIds', 'search')
        $this.getPowerBtn(userid, $this.powerBtn.orderIds.endId, 'orderIds', 'end')
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
          IsHistory: false
        }
      }
      GetOrders(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.InproductionCount = res.data.Data.InproductionCount
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
    viewClose() {
      this.viewTitle = ''
      this.viewCurrentRow = null
      this.viewShow = false
    },
    updRow(rowData) {
      let $this = this
      GetOrder(rowData.OrderId).then(res => {
        if (res.data.IsSuccess) {
          $this.addFormData = {
            orderId: res.data.Data.OrderId,
            oldOrderId: res.data.Data.OrderId,
            _ID: res.data.Data.ID,
            productName: res.data.Data.ProductName,
            productType: `${res.data.Data.Model}-${res.data.Data.K1}${res.data.Data.K2}${res.data.Data.C}-${res.data.Data.Length ? 'L' : ''}${res.data.Data.Length}`,
            CableType: res.data.Data.CableType,
            JointType: res.data.Data.JointType,
            /* 产品型号参数 */
            model: res.data.Data.Model,
            k1: res.data.Data.K1,
            k2: res.data.Data.K2,
            c: res.data.Data.C,
            length: res.data.Data.Length,
            toleranceType: res.data.Data.Tolerance,
            toleranceValue: res.data.Data.ToleranceValue,
            EndOfCableLength: res.data.Data.EndOfCableLength,
            /* 配方管理 */
            formularId: res.data.Data.FormularNo,
            ID: res.data.Data.FormularId,
            /* 剩余弹窗数据 */
            planStartTime: res.data.Data.StartDateTime,
            planEndTime: res.data.Data.EndDateTime,
            planCount: res.data.Data.PlanQuantity,
          },
          $this.addTitle = '修改'
          $this.addShow = true
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })

    },
    selectionChange(value) {
      this.multipleSelection = value
    },
    btnClick(item) {
      let $this = this
      if (item.btnName === '开始') {
        if (!this.powerBtn.orderIds.start) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.multipleSelection.length === 0) {
          this.confirm_Pop2(this, '请先勾选数据')
          return
        }
        if (this.InproductionCount >= 1) {
          this.confirm_Pop2(this, '已存在生产中的订单，无法开始订单')
          return
        }
        if (this.multipleSelection.length > 1) {
          this.confirm_Pop2(this, '只能选择一条数据进行开始操作')
          return
        }
        this.startOrder()
      }
      if (item.btnName === '暂停') {
        if (!this.powerBtn.orderIds.pause) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.multipleSelection.length === 0) {
          this.confirm_Pop2(this, '请先勾选数据')
          return
        }
        //  2:暂停 3: 待生产
        let arr = [2, 3]
        let flag = this.multipleSelection.some(f => arr.includes(f.Status))
        if (flag) {
          this.confirm_Pop2(this, '存在待生产、暂停的订单，不可暂停订单')
          return
        }
        this.confirm_Pop(this, '是否确认暂停？', function () {
          $this.pauseOrder()
        })
      }
      if (item.btnName === '结束') {
        if (!this.powerBtn.orderIds.end) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.multipleSelection.length === 0) {
          this.confirm_Pop2(this, '请先勾选数据')
          return
        }
        // 3: 待生产
        let arr = [3]
        let flag = this.multipleSelection.some(f => arr.includes(f.Status))
        if (flag) {
          this.confirm_Pop2(this, '存在待生产的订单，不可结束订单')
          return
        }
        this.confirm_Pop(this, '是否确认结束？', function () {
          $this.endOrder()
        })
      }
      if (item.btnName === '新增') {
        if (!this.powerBtn.orderIds.add) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        this.addOrder()
      }
      if (item.btnName === '删除') {
        if (!this.powerBtn.orderIds.delete) {
          this.confirm_Pop2(this, '该账户无操作权限！')
          return
        }
        if (this.multipleSelection.length === 0) {
          this.confirm_Pop2(this, '请先勾选数据')
          return
        }
        // 1: 生产中 2:暂停
        let arr = [1, 2]
        let flag = this.multipleSelection.some(f => arr.includes(f.Status))
        if (flag) {
          this.confirm_Pop2(this, '存在生产中、暂停的订单，不可删除订单')
          return
        }
        this.confirm_Pop(this, '是否确认删除？', function () {
          $this.deleteOrder()
        })
      }
    },
    /* 开始弹窗 */
    startOrder() {
      let $this = this
      StartData(this.multipleSelection[0].OrderId).then(res => {
        if (res.data.IsSuccess) {
          let operator = ''
          if (res.data.Data.Operator) {
            operator = res.data.Data.Operator
          } else {
            operator = JSON.parse(sessionStorage.getItem('userInfo1')) ? JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserName : JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserName
          }
          let operatorId = ''
          if (res.data.Data.OperatorId) {
            operatorId = res.dara.Data.operatorId
          } else {
            operatorId = JSON.parse(sessionStorage.getItem('userInfo1')) ? JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID : JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID
          }
          $this.startFormData = {
            operator,
            classess: res.data.Data.Shift,
            orderId: res.data.Data.OrderId,
            productName: res.data.Data.ProductName,
            length: res.data.Data.Length,
            planCount: res.data.Data.PlanQuantity,
            productType: res.data.Data.ProductModel,
            operatorId
          }
          $this.startShow = true
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    startClose() {
      this.startFormData = {
        operator: '',
        operatorId: '',
        classess: '',
        orderId: '',
        productName: '',
        length: '',
        planCount: '',
        productType: ''
      }
      this.startShow = false
    },
    startConfirm(data) {
      let $this = this
      let postData = {
        OrderId: data.orderId,
        Shift: data.classess,
        Operator: data.operator,
        OperatorId: data.operatorId
      }
      ConfirmStart(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.getData()
          $this.startClose()
          $this.message_Success($this, '开始成功')
          if (res.data.Msg !== '') {
            $this.confirm_Pop4($this, res.data.Msg)
            $this.$store.commit('setMsgboxShow', true)
          }
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    pauseOrder() {
      let $this = this
      PauseData(this.multipleSelection[0].OrderId).then(res => {
        if (res.data.IsSuccess) {
          $this.message_Success($this, '暂停成功')
          $this.getData()
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    endOrder() {
      let $this = this
      let postData = this.multipleSelection.map(item => item.OrderId)
      FinishData(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.message_Success($this, '结束成功')
          $this.getData()
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    addOrder() {
      this.addTitle = '新增'
      this.addShow = true
    },
    addConfirm() {
      console.log("this.addFormData",this.addFormData);
      let $this = this
      let postData = {
        ID: this.addFormData._ID,
        OrderId: this.addFormData.orderId,
        oldOrderId: this.addFormData.oldOrderId,
        ProductName: this.addFormData.productName,
        Model: this.addFormData.model,
        K1: this.addFormData.k1,
        K2: this.addFormData.k2,
        C: this.addFormData.c,
        Length: this.addFormData.length,
        Tolerance: this.addFormData.toleranceType,
        ToleranceValue: this.addFormData.toleranceValue,
        EndOfCableLength: this.addFormData.EndOfCableLength,
        FormularId: this.addFormData.ID,
        FormularName: this.addFormData.formularId,
        PlanQuantity: this.addFormData.planCount,
        StartDateTime: this.addFormData.planStartTime,
        EndDateTime: this.addFormData.planEndTime,
        CableType: this.addFormData.CableType,
        JointType: this.addFormData.JointType
      }
      // 添加
      if (this.addTitle === '新增') {
        AddOrder(postData).then(res => {
          if (res.data.IsSuccess) {
            $this.message_Success($this, '添加成功')
            $this.getData()
            $this.addClose()
          } else {
            $this.confirm_Pop2($this, res.data.Msg)
          }
        })
      }
      if (this.addTitle === '修改') {
        UpdateOrder( this.addFormData._ID,postData).then(res => {
          if (res.data.IsSuccess) {
            $this.message_Success($this, '修改成功')
            $this.getData()
            $this.addClose()
          } else {
            $this.confirm_Pop2($this, res.data.Msg)
          }
        })
      }

    },
    productConfirm(formData) {
      this.addFormData.productType = formData.productType
      this.addFormData.model = formData.model
      this.addFormData.k1 = formData.k1
      this.addFormData.k2 = formData.k2
      this.addFormData.c = formData.c
      this.addFormData.length = formData.length
      this.addFormData.toleranceType = formData.toleranceType
      this.addFormData.toleranceValue = formData.toleranceValue
      this.addFormData.EndOfCableLength = formData.EndOfCableLength
      // this.addFormData.CableType = formData.CableType
      // this.addFormData.JointType = formData.JointType
    },
    repiceConfirm(val) {
      this.addFormData.formularId = val.FormularNo
      this.addFormData.ID = val.ID
    },
    addClose() {
      this.addTitle = ''
      this.addFormData = {
        orderId: '',
        productName: '',
        productType: '',
        CableType: '',
        JointType: '',
        /* 产品型号参数 */
        model: '',
        k1: "",
        k2: "",
        c: "",
        length: "",
        toleranceType: '',
        toleranceValue: '',
        EndOfCableLength: '',
        /* 配方管理 */
        formularId: '',
        ID: null,
        /* 剩余弹窗数据 */
        planStartTime: /* moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00' */ '',
        planEndTime: /* moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59' */ '',
        planCount: 0,
      }
      this.addShow = false
    },
    deleteOrder() {
      let $this = this
      let postData = this.multipleSelection.map(item => item.OrderId)
      DeleteData(postData).then(res => {
        if (res.data.IsSuccess) {
          $this.message_Success($this, '删除成功')
          $this.getData()
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
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