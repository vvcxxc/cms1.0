<!-- 工艺管理 -->
<template>
  <div id="craft-manage" :style="{ zoom: zoomValue }">

    <div class="head-title flex">
      <span class="text" @click="testFun()">订单列表</span>
    </div>

    <!-- 操作栏 -->
    <div class="operation-bar flex">
      <!-- 表单 -->
      <div class="form flex">
        <div class="item flex">
          <div class="label">查询时间范围</div>
          <div class="content">
            <el-date-picker v-model="form.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss" prefix-icon="prefix-icon" style="width: 200px;" :clearable="false">
            </el-date-picker>
            <span style="margin: 0 10px;">-</span>
            <el-date-picker v-model="form.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss" prefix-icon="prefix-icon" style="width: 200px;" :clearable="false">
            </el-date-picker>
          </div>
        </div>

        <div class="item flex">
          <div class="label">订单状态</div>
          <div class="content">
            <el-select v-model="form.status" style="width: 90px;" size="medium">
              <el-option v-for="(item, i) in statusList" :key="i" :label="item.Text" :value="item.Value"></el-option>
            </el-select>
          </div>
        </div>

        <div class="item flex">
          <div class="label">关键字</div>
          <div class="content">
            <el-input v-model="form.keyWord" size="small" style="width: 140px; margin: 0 10px 0 0;"
              placeholder="请输入关键字查询"></el-input>
            <el-button type="primary" size="small" @click="getData()">查询</el-button>
          </div>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="btn-box">
        <el-button plain size="small" type="primary" @click="sendOrder()">下发</el-button>
        <el-button plain size="small" type="success" @click="createOrder()">新增</el-button>
        <!-- <el-button plain size="small" type="warning" @click="editOrder()">编辑</el-button> -->
        <el-button plain size="small" type="info" @click="delOrder()">删除</el-button>
      </div>
    </div>

    <!-- === 表格 ================== -->
    <el-table ref="myTable" class="my-table" :data="tableData" border :height="280" highlight-current-row
      @current-change="optionOrder" @selection-change="multipleOptionOrder">
      <el-table-column type="selection" width="55" :key="Math.random()"></el-table-column>
      <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
      <el-table-column align="center" label="订单状态" prop="StatusDescription" width="140"></el-table-column>
      <el-table-column align="center" label="计划号" prop="PlanNo" width="140"></el-table-column>
      <el-table-column align="center" label="订单号" prop="OrderNo" width="140"></el-table-column>
      <el-table-column align="center" label="类型" prop="Type" width="110"></el-table-column>
      <el-table-column align="center" label="配方号" prop="FormulaNo" width="140"></el-table-column>
      <el-table-column align="center" label="工艺路线" prop="BomName">
        <template slot-scope="scope">
          <div class="line-clamp" :title="scope.row.BomName">{{ scope.row.BomName }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="工艺说明" prop="BomDescription">
        <template slot-scope="scope">
          <div class="line-clamp" :title="scope.row.BomDescription">{{ scope.row.BomDescription }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品名称" prop="ProductName" width="110"></el-table-column>
      <el-table-column align="center" label="产品编号" prop="ProductNo" width="110"></el-table-column>
      <el-table-column align="center" label="批次号" prop="BatchNo" width="110"></el-table-column>
      <el-table-column align="center" label="计划开始时间" prop="PlanStartTime" width="160"></el-table-column>
      <el-table-column align="center" label="计划结束时间" prop="PlanEndTime" width="160"></el-table-column>
      <el-table-column align="center" label="记录时间" prop="RecordTime" width="160"></el-table-column>
      <el-table-column align="center" label="编排时间" prop="ArrangeTime" width="160"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editOrder(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- === 分页 ================== -->
    <my-page :pageData="pageData" @req="req"></my-page>

    <div class="head-title flex" style="justify-content: space-between;">
      <div class="flex">
        <span class="text">工艺编排</span>
        <i class="icon" :class="showName ? 'icon-eye' : 'icon-eye-close'" @click="eveFn"></i>
      </div>
      <el-button v-if="this.currentRow && this.currentRow.Status === 0" type="primary" size="small"
        @click="SetOrderStatus">完成编排</el-button>
    </div>

    <!-- 详情 -->
    <div class="row flex">
      <div class="item">
        <div class="head">
          <span>水锅</span>
          <div class="btn-box flex">
            <div class="btn flex btn-del" @click="delMaterial('水锅')">
              <i class="el-icon-delete-solid"></i>
              <span class="text">删除</span>
            </div>
            <div class="btn flex btn-add" @click="addRawMaterial(0)">
              <i class="el-icon-plus"></i>
              <span class="text">添加</span>
            </div>
          </div>
        </div>
        <el-table border :data="waterCauldron.Details" :height="rowTableHeight" highlight-current-row
          @current-change="optionCauldron">
          <el-table-column align="center" label="排序" prop="SortNumber" width="50"></el-table-column>
          <el-table-column align="center" label="原料编号" prop="MaterialNo"></el-table-column>
          <el-table-column v-if="showName" align="center" label="原料名称" prop="MaterialName"></el-table-column>
          <el-table-column align="center" label="占比" prop="RatioDescription" width="100"></el-table-column>
          <el-table-column align="center" label="用量(kg)" prop="Qty" width="100"></el-table-column>
          <el-table-column align="center" prop="name" label="投料排序">
            <template slot-scope="scope">
              <i class="icon-sort-arrow el-icon-top" @click="sort(scope.row, 'top', '水锅')"></i>
              <i class="icon-sort-arrow el-icon-bottom" style="margin: 0 0 0 6px;"
                @click="sort(scope.row, 'bottom', '水锅')"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="item">
        <div class="head">
          <span>油锅</span>
          <div class="btn-box flex">
            <div class="btn flex btn-del" @click="delMaterial('油锅')">
              <i class="el-icon-delete-solid"></i>
              <span class="text">删除</span>
            </div>
            <div class="btn flex btn-add" @click="addRawMaterial(1)">
              <i class="el-icon-plus"></i>
              <span class="text">添加</span>
            </div>
          </div>
        </div>
        <el-table border :data="oilCauldron.Details" :height="rowTableHeight" highlight-current-row
          @current-change="optionCauldron">
          <el-table-column align="center" label="排序" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="原料编号" prop="MaterialNo"></el-table-column>
          <el-table-column v-if="showName" align="center" label="原料名称" prop="MaterialName"></el-table-column>
          <el-table-column align="center" label="占比" prop="RatioDescription" width="100"></el-table-column>
          <el-table-column align="center" label="用量(kg)" prop="Qty" width="100"></el-table-column>
          <el-table-column align="center" prop="name" label="投料排序">
            <template slot-scope="scope">
              <i class="icon-sort-arrow el-icon-top" @click="sort(scope.row, 'top', '油锅')"></i>
              <i class="icon-sort-arrow el-icon-bottom" style="margin: 0 0 0 6px;"
                @click="sort(scope.row, 'bottom', '油锅')"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="item">
        <div class="head">
          <span>乳化锅</span>
          <div class="btn-box flex">
            <div class="btn flex btn-del" @click="delMaterial('乳化锅')">
              <i class="el-icon-delete-solid"></i>
              <span class="text">删除</span>
            </div>
            <div class="btn flex btn-add" @click="addRawMaterial(2)">
              <i class="el-icon-plus"></i>
              <span class="text">添加</span>
            </div>
          </div>
        </div>
        <el-table border :data="emulsifyCauldron.Details" :height="rowTableHeight" highlight-current-row
          @current-change="optionCauldron">
          <el-table-column align="center" label="排序" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="原料编号" prop="MaterialNo"></el-table-column>
          <el-table-column v-if="showName" align="center" label="原料名称" prop="MaterialName"></el-table-column>
          <el-table-column align="center" label="占比" prop="RatioDescription" width="100"></el-table-column>
          <el-table-column align="center" label="用量(kg)" prop="Qty" width="100"></el-table-column>
          <el-table-column align="center" prop="name" label="投料排序">
            <template slot-scope="scope">
              <i class="icon-sort-arrow el-icon-top" @click="sort(scope.row, 'top', '乳化锅')"></i>
              <i class="icon-sort-arrow el-icon-bottom" style="margin: 0 0 0 6px;"
                @click="sort(scope.row, 'bottom', '乳化锅')"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 创建订单 -->
    <create-order :dialogVisible="createOrderConfig.show" :voucherId="createOrderConfig.voucherId"
      @callback="createOrderCallback"></create-order>

    <!-- 添加原料 -->
    <add-raw-material :dialogVisible="addRawMaterialConfig.show" :list="addRawMaterialConfig.list"
      :boilerGroup="addRawMaterialConfig.boilerGroup" @callback="addRawMaterialCallback"></add-raw-material>
  </div>
</template>
<script>
import MyPage from '@/components/public/Pages.vue';
import CreateOrder from './components/create-order.vue';
import AddRawMaterial from './components/add-raw-material.vue';
import { getPowerById } from '@/api/common'
import {
  // 订单
  getStatus, query, getDetails, pushOrder, deleteOrder, completeOrder,
  // 原料
  arrange, removeMaterial, getMaterials
} from '@/api/craft-manage'
import moment from "moment";

export default {
  components: { MyPage, CreateOrder, AddRawMaterial },
  data() {
    return {
      zoomValue: 0,
      rowTableHeight: 0,
      userinfo: JSON.parse(sessionStorage.getItem('userInfo1')) || JSON.parse(sessionStorage.getItem('sightseerInfo1')),
      statusList: [], // 订单状态列表
      form: {
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        status: '', // 是否已下发
        keyWord: '', // 关键字
        pageSize: 50,
        pageIndex: 1,
      },
      pageData: {
        PageSize: 50,
        TotalCount: 0,
        TotalPage: 0,
        PageIndex: 1,
        LastEnabled: false,
        NextEnabled: false
      },
      showName: false,
      currentRow: null, // 当前订单
      selectionOrderList: [], // 选择订单列表
      currentWater: null, // 当前水锅
      currentOil: null, // 当前油锅
      currentEmulsify: null, // 当前乳化锅
      tableData: [],

      waterCauldron: {
        Details: []
      }, // 水锅
      oilCauldron: {
        Details: []
      }, // 油锅
      emulsifyCauldron: {
        Details: []
      }, // 乳化锅
      tableSize: {
        width: 0,
        height: 0,
      },

      // 创建/编辑订单
      createOrderConfig: {
        show: false, // 可见
        voucherId: null,
      },

      addRawMaterialConfig: { // 添加原料
        show: false, // 可见
        boilerGroup: 0, // 0-水锅 1-油锅 2-乳化锅
        list: [], // 原料列表
      },
      xzid: "",
      xzshow: true,
      cxid: "",
      cxshow: true,
      jurisdiction: [],
      buttonarr: []
    };
  },
  methods: {
    findPathByLeafId(id, node, path) {
      if (!path) {
        path = []
      }
      for (let i = 0; i < node.length; i++) {
        var temPath = path.concat();

        if (id == node[i].RightID) {
          temPath.push(node[i])
          return temPath
        }
        if (node[i].Children) {
          var findResult = this.findPathByLeafId(id, node[i].Children, temPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    GetUrlParam(paraName) {
      let url = document.location.toString();
      let arrObj = url.split("?");
      if (arrObj.length > 1) {
        let arrPara = arrObj[1].split("&");
        let arr;
        for (let i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr && arr[0] == paraName) {

            return arr[1]
          }
        }
        return ''
      } else {
        return ''
      }
    },
    eveFn() {
      if (!this.cxshow) {
        this.confirm_Pop2(this, '该账户没有权限！', { tips: '提示', yes: '确定' })
        return
      }
      this.showName = !this.showName;
    },
    // 测试方法
    testFun() {
      this.addRawMaterialConfig.show = false
      this.createOrderConfig.show = false
      this.currentRow = null
    },
    // 初始化容器尺寸
    initContainerSize() {
      this.zoomValue = Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width / 1920).toFixed(2));
      const toolbarH = $('.v-toolbar').height();
      const toolbarZ = $('.v-toolbar')[0].style.zoom;
      const footerH = $('.v-footer').height();
      const footerZ = $('.v-footer')[0].style.zoom;
      const marginTop = toolbarH * toolbarZ + 'px';
      const height = toolbarH * toolbarZ + footerH * footerZ + 'px';
      $('#parameter-config').css({ marginTop, height: `calc(100% - ${height - 30})` });
    },
    setSize() {
      const DOM = document.getElementById('craft-manage')
      const DOMSize = DOM.getBoundingClientRect()
      this.tableSize.width = DOMSize.width
      this.tableSize.height = DOMSize.height
      this.rowTableHeight = (DOMSize.height - 550)
    },
    // 获取订单状态列表
    queryStatus() {
      return getStatus().then(res => {
        const list = res.data.data
        // console.log('订单状态列表', JSON.parse(JSON.stringify(list)));
        if (!list.length) {
          console.log('暂无订单状态列表');
          return
        }
        this.statusList = list
        this.form.status = list[0].Value
      }, err => {
        console.log('失败回调', err);
      })
    },

    // 下发
    sendOrder() {
      // console.log('下发-勾选行', JSON.parse(JSON.stringify(this.selectionOrderList)));
      if (!this.selectionOrderList.length) {
        this.confirm_Pop2(this, '请选择订单', { tips: '提示', yes: '确定' })
        return
      }

      if (this.selectionOrderList.some(item => item.Status === 0)) {
        this.confirm_Pop2(this, '请先编排订单的投料工艺！', { tips: '提示', yes: '确定' })
        return
      }

      // console.log('下发');
      // if (window) return

      const list = this.selectionOrderList.map(item => item.Id)
      pushOrder(list).then(res => {
        // console.log('下发-结果', JSON.parse(JSON.stringify(res.data)));
        if (res.data.code !== 0) {
          this.confirm_Pop2(this, res.data.msg, { tips: '提示', yes: '确定' })
          return
        }
        this.confirm_Pop2(this, '下发成功！', { tips: '提示', yes: '确定' })
        this.getData()
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 订单-创建
    createOrder() {
      if (!this.xzshow) {
        this.confirm_Pop2(this, '该账户没有权限！', { tips: '提示', yes: '确定' })
        return
      }
      this.createOrderConfig.show = true
      this.createOrderConfig.voucherId = null
    },
    // 订单-编辑
    editOrder(row) {
      console.log('选择行.row', JSON.parse(JSON.stringify(row)));
      // console.log('选择行', JSON.parse(JSON.stringify(this.currentRow)));
      if (row) this.currentRow = row
      if (!this.currentRow) {
        this.confirm_Pop2(this, '请选择订单', { tips: '提示', yes: '确定' })
        return
      }
      if (this.currentRow.Status !== 0) {
        this.confirm_Pop2(this, '只能编辑未编排订单', { tips: '提示', yes: '确定' })
        return
      }

      if (!this.currentRow.CanEdit) {
        this.confirm_Pop2(this, '该订单为ERP指定，不可编辑！', { tips: '提示', yes: '确定' })
        return
      }

      this.createOrderConfig.voucherId = this.currentRow.Id
      this.createOrderConfig.show = true
    },
    // 初始化数据
    initData() {
      // this.currentRow = null;
      this.waterCauldron = this.oilCauldron = this.emulsifyCauldron = {
        Details: []
      }
    },
    // 两日期之间的天数
    getNumberOfDays(startDate, endDate) {
      const startTimestamp = Date.parse(new Date(startDate));
      const endTimestamp = Date.parse(new Date(endDate));
      const dateParse = Date.parse(new Date(endTimestamp - startTimestamp));//核心：时间戳相减
      const day = parseInt(dateParse / (1000 * 60 * 60 * 24));
      return day
    },
    // 查询工艺编排记录
    getData() {
      if (new Date(this.form.endTime) - new Date(this.form.startTime) < 0) {
        this.confirm_Pop2(this, '开始时间不能大于结束时间！', { tips: '提示', yes: '确定' })
        return
      }
      if (this.getNumberOfDays(this.form.startTime, this.form.endTime) > 60) {
        this.confirm_Pop2(this, '最大查询跨度60天', { tips: '提示', yes: '确定' })
        return
      }

      this.initData()
      this.tableData = [];
      return query(this.form).then(res => {
        // console.log('查询', JSON.parse(JSON.stringify(res.data.data)));
        if (res.data.code !== 0) {
          this.confirm_Pop2(this, res.data.msg, { tips: '提示', yes: '确定' })
          return
        }
        const list = res.data.data.DataList
        this.tableData = list

        const pageData = res.data.data.ParameterList
        this.pageData.PageSize = pageData.PageSize;
        this.pageData.PageIndex = pageData.PageIndex;
        this.pageData.TotalPage = pageData.TotalPage;
        this.pageData.TotalCount = pageData.TotalCount;

        this.form.pageSize = pageData.PageSize;
        this.form.pageIndex = pageData.PageIndex;
        console.log('表格', JSON.parse(JSON.stringify(this.tableData)));

        if (this.currentRow && list.length) {
          this.$nextTick(() => {
            const rows = list.filter(item => item.Id === this.currentRow.Id)
            if (rows.length) {
              this.$refs.myTable.setCurrentRow(rows[0]);
            } else {
              this.$refs.myTable.setCurrentRow(list[0]);
            }
          })
        } else if (!this.currentRow && list.length) {
          this.$nextTick(() => {
            this.$refs.myTable.setCurrentRow(list[0]);
          })
        }

      }, err => {
        console.log('失败回调', err);
      })
    },
    req(pageIndex) {
      this.pageData.PageIndex = pageIndex;
      this.form.pageIndex = pageIndex;
      this.getData();
    },
    // 选择订单
    optionOrder(row) {
      console.log('选择订单', JSON.parse(JSON.stringify(row)));
      if (!row) {
        console.log('请选择订单', JSON.parse(JSON.stringify(row)));
        return
      }
      this.initData()
      this.currentRow = row;
      getDetails(row.Id).then(res => {
        const list = res.data.data;
        console.log('选择订单-结果', JSON.parse(JSON.stringify(list)));
        if (!list.length) return

        const waterCauldron = list.find(item => item.BoilerGroup === 0);
        const oilCauldron = list.find(item => item.BoilerGroup === 1);
        const emulsifyCauldron = list.find(item => item.BoilerGroup === 2);

        if (waterCauldron) this.waterCauldron = waterCauldron;
        if (oilCauldron) this.oilCauldron = oilCauldron;
        if (emulsifyCauldron) this.emulsifyCauldron = emulsifyCauldron;

        console.log(JSON.parse(JSON.stringify({
          '0水锅': this.waterCauldron,
          '1油锅': this.oilCauldron,
          '2乳锅': this.emulsifyCauldron,
        })));
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 多选订单
    multipleOptionOrder(list) {
      console.log('多选订单', JSON.parse(JSON.stringify(list)));
      this.selectionOrderList = list;
    },
    // 选择锅
    optionCauldron(row) {
      // console.log("选择锅", row);
      if (!row) return
      // console.log('选择锅', JSON.parse(JSON.stringify({
      //   '0行数据': row,
      // })));
      switch (row.BoilerGroupDescription) {
        case '水锅':
          this.currentWater = row;
          break;
        case '油锅':
          this.currentOil = row;
          break;
        case '乳化锅':
          this.currentEmulsify = row;
          break;
        default:
          break;
      }
    },
    // 排序
    sort(row, direction, type) {
      let index = row.SortNumber
      const list = {
        '水锅': this.waterCauldron.Details,
        '油锅': this.oilCauldron.Details,
        '乳化锅': this.emulsifyCauldron.Details,
      }

      console.log('排序', JSON.parse(JSON.stringify({
        '0行数据': row,
        '1方向': direction,
        '2序号': row.SortNumber,
        '3那个锅': type,
        '4锅的数据': list[type],
        '4锅的长度': list[type].length,
      })));

      if (direction === 'top') {
        if (row.SortNumber === 1) {
          console.log('不能再上了');
          return
        }
        index -= 1
      } else if (direction === 'bottom') {
        if (row.SortNumber === list[type].length) {
          console.log('不能再下了');
          return
        }
        index += 1
      }

      arrange({
        Id: row.Id,
        VoucherId: row.VoucherId,
        SortNumber: index,
        IsDesc: direction === 'top' ? true : false
      }).then(res => {
        console.log('排序-结果', JSON.parse(JSON.stringify(res.data)));
        if (res.data.code === 1) {
          this.confirm_Pop2(this, res.data.msg, { tips: '提示', yes: '确定' })
          return
        }
        this.optionOrder(this.currentRow)
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 删除订单
    delOrder() {
      console.log('删除订单', JSON.parse(JSON.stringify({
        '1单选订单': this.currentRow,
        '2勾选订单': this.selectionOrderList,
      })));

      // 清空选择行
      if (this.currentRow) {
        const row = this.currentRow
        if (this.selectionOrderList.some(item => item.Id === row.Id)) {
          this.currentRow = null
        }
      }

      if (!this.selectionOrderList.length) {
        this.confirm_Pop2(this, '请选择订单', { tips: '提示', yes: '确定' })
        return
      }

      const list = this.selectionOrderList.map(item => item.Id);
      this.confirm_Pop3(
        this,
        '是否确认删除选中订单？', res => {
          if (res === 'cancel') return
          deleteOrder(list).then(res => {
            console.log('删除订单-结果', JSON.parse(JSON.stringify(res.data)));
            if (res.data.code === 1) {
              this.confirm_Pop2(this, res.data.msg, { tips: '提示', yes: '确定' })
              return
            }

            // 清空选择行
            if (this.currentRow) {
              const row = this.currentRow
              if (this.selectionOrderList.some(item => item.Id === row.Id)) {
                this.currentRow = null
              }
            }

            this.selectionOrderList = []
            this.getData()
          }, err => {
            console.log('失败回调', err);
          })
        },
        { tips: '提示', yes: '确认', no: '取消' }
      )
    },
    // 创建订单-回调
    createOrderCallback(state) {
      console.log('创建订单-回调', state);
      if (state === 'cancel') {
        this.createOrderConfig.show = false
        return
      }

      this.createOrderConfig.show = false
      this.getData()
    },
    // 保存 订单状态: 未编排 => 已编排
    SetOrderStatus() {
      console.log('保存 订单状态', JSON.parse(JSON.stringify(this.currentRow)));
      completeOrder(this.currentRow.Id).then(res => {
        console.log('设置结果', JSON.parse(JSON.stringify(res.data.data)));
        if (res.data.code !== 0) {
          this.confirm_Pop2(this, res.data.msg, { tips: '提示', yes: '确定' })
          console.log('错误');
          return
        }
        this.getData();
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 删除原料
    delMaterial(key) {
      const current = (key => {
        const obj = {
          '水锅': this.currentWater,
          '油锅': this.currentOil,
          '乳化锅': this.currentEmulsify,
        }
        return obj[key]
      })(key)

      console.log('删除原料', JSON.parse(JSON.stringify({
        '0那个锅': key,
        '1锅的数据': current,
        '2订单': this.currentRow,
      })));

      if (!current) {
        this.confirm_Pop2(this, '请选择原料', { tips: '提示', yes: '确定' })
        return
      }

      const delFun = () => {
        removeMaterial({
          VoucherId: current.VoucherId,
          DetailId: current.Id,
        }).then(res => {
          console.log('排序-结果', JSON.parse(JSON.stringify(res.data)));
          if (res.data.code === 1) {
            this.confirm_Pop2(this, res.data.msg, { tips: '提示', yes: '确定' })
            return
          }
          this.getData()
          // this.optionOrder(this.currentRow)
        }, err => {
          console.log('失败回调', err);
        })
      }

      this.confirm_Pop3(
        this,
        '是否确认删除选中原料？', res => {
          if (res === 'confirm') delFun()
        },
        { tips: '提示', yes: '确认', no: '取消' }
      )
    },
    // 添加原料
    addRawMaterial(type) {
      console.log('添加原料', JSON.parse(JSON.stringify(this.currentRow)));
      if (!this.currentRow) {
        this.confirm_Pop2(this, '请选择订单', { tips: '提示', yes: '确定' })
        return
      }

      getMaterials(this.currentRow.Id).then(res => {
        console.log('获取原料清单', JSON.parse(JSON.stringify(res.data.data)));
        if (res.data.code !== 0) {
          this.confirm_Pop2(this, res.data.msg, { tips: '提示', yes: '确定' })
          console.log('错误');
          return
        }
        this.addRawMaterialConfig.show = true
        this.addRawMaterialConfig.list = res.data.data
        this.addRawMaterialConfig.boilerGroup = type
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 添加原料-回调
    addRawMaterialCallback(state) {
      console.log('添加原料-回调', state);
      if (state === 'cancel') {
        this.addRawMaterialConfig.show = false
        return
      }
      this.optionOrder(this.currentRow)
      this.addRawMaterialConfig.show = false
    },
    async init() {
      this.initContainerSize();
      this.setSize();
      this.form.startTime = moment().add(-7, 'd').format("YYYY-MM-DD") + ' 00:00:00'
      this.form.endTime = moment().format("YYYY-MM-DD") + ' 23:59:59';
      this.form.pageIndex = this.pageData.PageIndex;
      this.form.pageSize = this.pageData.PageSize;
      await this.queryStatus();
      await this.getData();
    },
  },
  mounted() {

    this.jurisdiction = this.$store.state.btnPowerData
    this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
    console.log("this.buttonarr", this.buttonarr)
    this.buttonarr.forEach((item) => {
      if (item.RightName == "工艺管理-展示/隐藏原料名称") {
        this.cxid = item.RightID
      }
      if (item.RightName == "工艺管理-新建(订单)") {
        this.xzid = item.RightID
      }
    })
    var userid = ''
    if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
      userid = JSON.parse(
        sessionStorage.getItem('sightseerInfo1')
      ).SCMSUserID;
    } else {
      userid = JSON.parse(
        sessionStorage.getItem('userInfo1')
      ).SCMSUserID;
    }


    this.$axios({
      method: 'post',
      url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
    }).then(res => {
      this.cxshow = res.data.data

    }).catch((err) => {
      console.log('err', err)
    })
    this.$axios({
      method: 'post',
      url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`,
    }).then(res => {
      this.xzshow = res.data.data

    }).catch((err) => {
      console.log('err', err)
    })

    this.$nextTick(() => {
      this.init();
    })


    // setTimeout(() => {
    //   console.clear();
    //   this.init();
    // }, 2000);
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.line-clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#craft-manage {
  width: 100%;
  height: calc(100% - 120px);
  margin: 90px 0 0 0;
  padding: 20px 20px;
  background-color: #eeeeee;

  // === 头部标题 ==================
  &>.head-title {
    width: 100%;
    height: 40px;
    position: relative;
    justify-content: flex-start;

    &::before {
      content: "";
      display: block;
      width: 4px;
      height: 40%;
      position: absolute;
      left: 0;
      background-color: #507FF1;
    }

    .text {
      margin: 0 10px 0 10px;
      color: #507FF1;
    }

    .icon {
      cursor: pointer;
    }
  }

  // 
  &>.operation-bar {
    margin: 0 0 10px 0;
    justify-content: space-between;

    // 表单
    &>.form {
      justify-content: flex-start !important;
      flex-wrap: wrap;

      &>.item {
        margin: 0 20px 0 0;

        &>.label {
          margin: 0 10px 0 0;
          color: #666666;
        }

        &>.query-btn {
          padding: 0 40px;
          line-height: 34px;
          font-size: 18px;
          text-align: center;
          color: white;
          background-color: #557DE2;
          border: 2px solid #557DE2;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }

  }

  // === 表单 ==================


  // === 分页 ==================
  &>.page-container {
    height: 60px;
  }

  .row {
    width: 100%;
    justify-content: space-between;

    .item {
      width: calc(33.3333% - 10px);
      ;

      .head {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: white;
        background-color: #37C2FD;
        position: relative;

        .btn-box {
          height: 100%;
          position: absolute;
          top: 0;
          right: 10px;

          .btn {
            height: 70%;
            padding: 0 10px;
            margin: 0 0 0 10px;
            cursor: pointer;

            .text {
              margin: 0 0 0 5px;
            }
          }

          .btn-del {
            color: #D9001B;
            background-color: white;
            border: 1px solid #D9001B;
            border-radius: 4px;
          }

          .btn-add {
            color: #70B603;
            background-color: white;
            border: 1px solid #70B603;
            border-radius: 4px;
          }
        }
      }
    }
  }

}
</style>
