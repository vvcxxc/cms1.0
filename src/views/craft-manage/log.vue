<!-- 工艺编排记录 -->
<template>
  <div id="craft-log" :style="{ zoom: zoomValue }">

    <div class="head-title flex">
      <span class="text">工艺管理</span>
    </div>

    <!-- === 表单 ================== -->
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
        <div class="label">关键字</div>
        <div class="content">
          <el-input v-model="form.keyWord" size="small" style="width: 140px; margin: 0 10px 0 0;"
            placeholder="请输入关键字查询"></el-input>
          <el-button type="primary" size="small" @click="query()">查询</el-button>
        </div>
      </div>
    </div>

    <!-- === 表格 ================== -->
    <el-table ref="myTable" class="my-table" :data="tableData" border :height="280" highlight-current-row
      @current-change="optionOrder">
      <el-table-column align="center" label="序号" type="index" width="50" :key="Math.random()"></el-table-column>
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
      <el-table-column align="center" label="下发时间" prop="PushTime" width="160"></el-table-column>
    </el-table>

    <!-- === 分页 ================== -->
    <my-page :pageData="pageData" @req="req"></my-page>

    <div class="head-title flex">
      <span class="text">工艺编排</span>
      <i class="icon" :class="showName ? 'icon-eye' : 'icon-eye-close'" @click="eveFn"></i>
    </div>

    <!-- 详情 -->
    <div class="row flex">

      <div class="item">
        <div class="head">水锅</div>
        <el-table border :data="tableDataWater" :height="rowTableHeight">
          <el-table-column align="center" label="排序" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="原料编号" prop="MaterialNo"></el-table-column>
          <el-table-column v-if="showName" align="center" label="原料名称" prop="MaterialName"></el-table-column>
          <el-table-column align="center" label="占比" prop="RatioDescription" width="100"></el-table-column>
          <el-table-column align="center" label="用量(kg)" prop="Qty" width="100"></el-table-column>
        </el-table>
      </div>

      <div class="item">
        <div class="head">油锅</div>
        <el-table border :data="tableDataOil" :height="rowTableHeight">
          <el-table-column align="center" label="排序" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="原料编号" prop="MaterialNo"></el-table-column>
          <el-table-column v-if="showName" align="center" label="原料名称" prop="MaterialName"></el-table-column>
          <el-table-column align="center" label="占比" prop="RatioDescription" width="100"></el-table-column>
          <el-table-column align="center" label="用量(kg)" prop="Qty" width="100"></el-table-column>
        </el-table>
      </div>

      <div class="item">
        <div class="head">乳化锅</div>
        <el-table border :data="tableDataEmulsify" :height="rowTableHeight">
          <el-table-column align="center" label="排序" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="原料编号" prop="MaterialNo"></el-table-column>
          <el-table-column v-if="showName" align="center" label="原料名称" prop="MaterialName"></el-table-column>
          <el-table-column align="center" label="占比" prop="RatioDescription" width="100"></el-table-column>
          <el-table-column align="center" label="用量(kg)" prop="Qty" width="100"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import MyPage from '@/components/public/Pages.vue';
import { getPowerById } from '@/api/common'
import { queryHistory, getDetails } from '@/api/craft-manage'
import moment from "moment";
export default {
  components: { MyPage },
  data() {
    return {
      zoomValue: 0,
      rowTableHeight: 0,
      userinfo: JSON.parse(sessionStorage.getItem('userInfo1')) || JSON.parse(sessionStorage.getItem('sightseerInfo1')),
      form: {
        startTime: '',
        endTime: '',
        keyWord: '',
        pageSize: 10,
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
      currentRow: null,
      tableData: [],
      tableDataWater: [], // 水锅
      tableDataOil: [], // 油锅
      tableDataEmulsify: [], // 乳化锅
      tableSize: {
        width: 0,
        height: 0,
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
      const DOM = document.getElementById('craft-log')
      const DOMSize = DOM.getBoundingClientRect()
      this.tableSize.width = DOMSize.width
      this.tableSize.height = DOMSize.height
      this.rowTableHeight = (DOMSize.height - 550)
    },
    initData() {
      this.currentRow = null;
      this.tableDataWater = this.tableDataOil = this.tableDataEmulsify = []
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
    query() {
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
      return queryHistory(this.form).then(res => {
        // console.log('查询', JSON.parse(JSON.stringify(res.data.data)));
        if (res.data.code !== 0) {
          // wmsConfirm({ 
          //   text: res.data.msg,
          //   confirmButtonText: '确定',
          //   showCancelButton: false,
          // })
          console.log('错误');
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
        if (list.length) {
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
      this.query();
    },
    // 选择订单
    optionOrder(row) {
      // console.log('选择订单', JSON.parse(JSON.stringify(row)));
      if (!row) {
        console.log('请选择订单', JSON.parse(JSON.stringify(row)));
        return
      }
      this.initData()
      this.currentRow = row;
      getDetails(row.Id).then(res => {
        const list = res.data.data;
        console.log('选择订单-结果', JSON.parse(JSON.stringify(list)));
        const water = list.find(item => item.BoilerGroup === 0);
        const oil = list.find(item => item.BoilerGroup === 1);
        const emulsify = list.find(item => item.BoilerGroup === 2);

        if (water) this.tableDataWater = water.Details
        if (oil) this.tableDataOil = oil.Details
        if (emulsify) this.tableDataEmulsify = emulsify.Details

        console.log(JSON.parse(JSON.stringify({
          // '0水锅': water,
          // '1油锅': oil,
          // '2乳锅': emulsify,
          '0水锅': this.tableDataWater,
          '1油锅': this.tableDataOil,
          '2乳锅': this.tableDataEmulsify,
        })));
      }, err => {
        console.log('失败回调', err);
      })
    },
    async init() {
      this.initContainerSize();
      this.setSize();
      this.form.startTime = moment().add(-7, 'd').format("YYYY-MM-DD") + ' 00:00:00'
      this.form.endTime = moment().format("YYYY-MM-DD") + ' 23:59:59';
      await this.query();
     },
  },
  mounted() {
    this.jurisdiction = this.$store.state.btnPowerData
    this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
    console.log("this.buttonarr", this.buttonarr)
    this.buttonarr.forEach((item) => {
      if (item.RightName == "工艺管理(历史)-展示/隐藏原料名称") {
        this.cxid = item.RightID
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


#craft-log {
  width: 100%;
  height: calc(100% - 120px);
  margin: 90px 0 0 0;
  padding: 20px 20px;
  background-color: #eeeeee;

  // === 头部标题 ==================
  &>.head-title {
    width: 100%;
    height: 40px;
    justify-content: flex-start;

    &::before {
      content: "";
      display: block;
      width: 4px;
      height: 40%;
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

  // === 表单 ==================
  &>.form {
    margin: 0 0 10px 0;
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
        line-height: 40px;
        text-align: center;
        color: white;
        background-color: #37C2FD;
      }
    }
  }

}
</style>
