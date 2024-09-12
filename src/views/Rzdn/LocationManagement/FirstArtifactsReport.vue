<template>
  <div class="location-management flex" :style="{zoom:zoomValue}">
    <!-- 左侧工位选项卡 -->
    <div class="tabs" v-if="location.list.length">
      <div 
        v-for="(item, i) in location.list"
        :key="i"
        class="itme flex" 
        :class="item.WorkStationId === location.current.WorkStationId ? 'select-itme' : ''" 
        @click="selectLocation(item)"
      >
        {{item.WorkStationName}}
      </div>
    </div>
    <div class="no-tabs flex" v-else>
      <div>暂无工位</div>
    </div>

    <!-- 内容 -->
    <div class="container" v-if="Object.keys(location.current).length">

      <!-- 头部表单 -->
      <div id="head-form" class="flex">
        <!-- 搜索 -->
        <div class="search flex">
          <div class="item flex">
            <el-select v-model="form.SearchFieldId"
              style="margin: 0 10px 0 0 ; width: 140px;"
              size="medium"
            >
              <el-option
                v-for="item in searchType"
                :key="item.ID"
                :label="item.Name"
                :value="item.ID">
              </el-option>
            </el-select>
            <el-input
              v-model="form.Keyword"
              style="width: 180px"
            ></el-input>
          </div>
          <div class="item flex">
            <span class="title">记录时间：</span>
            <el-date-picker
              v-model="form.StartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              prefix-icon="prefix-icon"
              :clearable="false">
            </el-date-picker>
            <span class="title" style="margin: 0 10px;">-</span>
            <el-date-picker
              v-model="form.EndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              prefix-icon="prefix-icon"
              :clearable="false">
            </el-date-picker>
          </div>
          <div class="item flex">
            <el-button type="primary" style="width: 100px;" @click="needPower('首件报表-查询按钮', query)">查询</el-button>
          </div>
        </div>
        
        <!-- 数据 -->
        <div class="data flex">
          <div class="item flex">
            <div class="text">总数：</div>
            <div class="number">{{ qualifiedInfo.TotalNum }}</div>
          </div>
          <div class="item flex">
            <div class="text">合格数：</div>
            <div class="number">{{ qualifiedInfo.QualifiedRate }}</div>
          </div>
          <div class="item flex unqualified">
            <div class="text">不合格数：</div>
            <div class="number">{{ qualifiedInfo.UnqualifiedNum }}</div>
          </div>
          <div class="item flex">
            <div class="text">合格率：</div>
            <div class="number">{{ qualifiedInfo.QualifiedRate }}</div>
          </div>
          <el-button type="primary" style="width: 100px;" @click="needPower('首件报表-首件结果', () => {firstArtifactsResultsShow('show')})">首件结果</el-button>
        </div>
      </div>
      
      <!-- 列表 -->
      <el-table
        ref="myTable"
        :data="list"
        :stripe="true" 
        :max-height="tableSize.maxHeight"
        class="my-table"
        tooltip-effect="dark" 
        border
        highlight-current-row 
        @current-change="currentChange"
      >
        <el-table-column
          v-for="(item, i) in columnList" :key="i" 
          show-overflow-tooltip 
          :prop="item.prop"
          :label="item.label" 
        >
          <template slot-scope="scope">
            <span :class="isQualified(item, scope) ? '' : 'color-red'">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination" >
        <Page :pageData="pageData" @changePage="changePage"/>
      </div>

    </div>
    <div v-else class="no-location flex">
      <span>请选择工位</span>
    </div>

    <!-- 首件结果录入 -->
    <el-dialog
      title="首件结果录入"
      width="400px"
      class="flex"
      :visible.sync="firstArtifactsResultsDialog.show"
      :before-close="() => {firstArtifactsResultsShow('hide')}"
      append-to-body
    >
      <first-artifacts-results
        v-if="firstArtifactsResultsDialog.contentShow"
        ref="firstArtifactsResultsDOM"
        :stationId="form.StationId"
        :editData="currentRow"
        @callback="firstArtifactsResultsCallback"
      ></first-artifacts-results>
    </el-dialog>
  </div>
</template>
<script>
import FirstArtifactsResults from './components/first-artifacts-results.vue'
import Page from '@/newComponents/Page.vue'
import { toDay } from './index';
import userMixins from "@/mixins/userMixins";
import { getUserInfo } from '@/util/user';
export default {
  components: {FirstArtifactsResults, Page},
  mixins: [userMixins],
  data() {
    return {
      zoomValue: 0,
      tableSize: {
        height: 0,
        maxHeight: 'auto'
      },
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      
      // 工位
      location: {
        current: {},
        list: []
      },
      
      searchType: [],

      form: {
        StationId: '', // 工位id
        SearchFieldId: '', // 字段
        Keyword: '', // 关键词
        StartTime: '',
        EndTime: '',
        Page: 0
      },
      
      qualifiedInfo: { // 合格信息
        QualifiedNum: "", // 合格数
        QualifiedRate: "", // 合格率
        TotalNum: "", // 总数
        UnqualifiedNum: "" // 不合格数
      },

      columnList: [],
      list: [],
      listHistory: [],

      pageData: {
        PageSize: 50,
        TotalCount: 0,
        TotalPage: 0,
        PageIndex: 1,
        LastEnabled: false,
        NextEnabled: false
      },

      currentRow: null,

      firstArtifactsResultsDialog: {
        model: 'create', // create edit
        show: false,
        contentShow: false,
      },
    };
  },
  methods: {
    // 是否合格
    isQualified(item, row) {
      const rowHistory = this.listHistory[row.$index]
      const _Item = rowHistory[item.prop]
      if (!_Item) return true
      if (_Item.IsQualified === false) return false
      return true
    },
    // 初始化容器尺寸
    initContainerSize() {
      this.zoomValue = Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width / 1920).toFixed(2))
      var toolbarH = $('.v-toolbar').height();
      var toolbarZ = $('.v-toolbar')[0].style.zoom;
      var footerH = $('.v-footer').height();
      var footerZ = $('.v-footer')[0].style.zoom;
      var marginTop = toolbarH * toolbarZ + 'px';
      let height = toolbarH * toolbarZ + footerH * footerZ + 'px';
      $('.location-management').css({marginTop, height:`calc(100% - ${height})`});
    },
    // 设置表格高度
    setTableHeight() {
      this.tableSize.maxHeight = this.$refs.myTable.$el.offsetHeight
      this.$refs.myTable.doLayout()
      setTimeout(() => {
        this.$refs.myTable.doLayout()
      }, 1000);
    },

    // 获取工位列表
    getLocationReport() {
      let userInfo = getUserInfo()
      if (!userInfo) {
        this.confirm_Pop2(this, '缺少用户数据')
        return
      }
      this.$api.locationManagement.getLocationReport(userInfo.SCMSUserID).then(ref => {
        const list = ref.data.data
        // console.log("工位列表", JSON.parse(JSON.stringify(list)));
        this.location.list = list
        this.currentRow = null
        if (list.length) this.selectLocation(list[0])
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 获取列数据
    getColumnInfos() {
      return this.$api.locationManagement.getFirstArticleReportColumnInfos(this.location.current.WorkStationId).then(ref => {
        // console.log("列数据", JSON.parse(JSON.stringify(ref.data.data)));
        this.columnList = []
        ref.data.data.forEach((item) => {
          this.columnList.push({ label: item.Name, prop: item.ID })
        });
        return ref.data.data
      }, err => {
        console.log('失败回调', err);
        return []
      })
    },
    // 选择工位
    async selectLocation(item) {
      this.location.current = item
      this.form = {
        StationId: '', // 工位id
        SearchFieldId: '', // 字段
        Keyword: '', // 关键词
        // StartTime: '2020-08-23 00:00:00',
        StartTime: toDay('StartTime'), // 开始时间
        EndTime: toDay('EndTime'), // 结束时间
        Page: 0
      }
      await this.getSearchFields()
      this.getColumnInfos()
      await this.query()
    },
    // 获取搜索字段
    getSearchFields() {
      return this.$api.locationManagement.getFirstArticleReportSearchFields(this.location.current.WorkStationId).then(ref => {
        const list = ref.data.data
        // console.log("工位搜索字段", JSON.parse(JSON.stringify(list)));
        this.searchType = list
        if (list.length) this.form.SearchFieldId = list[0].ID
        return list
      }, err => {
        console.log('失败回调', err);
      })
    },
    query() {
      // console.clear();
      if (!this.location.current) return
      // console.log("工位数据", JSON.parse(JSON.stringify(this.location.current)));
      if (new Date(this.form.EndTime) - new Date(this.form.StartTime) < 0 ) {
        this.$message.warning('结束时间不能比开始时间早');
        return;
      }

      this.form.StationId = this.location.current.WorkStationId
      // console.log("查询", JSON.parse(JSON.stringify(this.form)));

      // this.list = []
      this.listHistory = []
      this.$api.locationManagement.getFirstArticleReportLocation(this.form).then(ref => {
        // console.log('query', JSON.parse(JSON.stringify(ref.data.data)));
        const data = ref.data.data
        this.qualifiedInfo = data.QualifiedInfo
        this.list = data.Datas
        this.listHistory = JSON.parse(JSON.stringify(data.Datas))
        this.pageData.PageSize = data.PageInfo.PageSize
        this.pageData.PageIndex = data.PageInfo.Page
        this.pageData.TotalCount = data.PageInfo.Total
        // console.log("表格数据", JSON.parse(JSON.stringify(data.Datas)));
        this.$nextTick(() => {
          this.setTableHeight()
        })
        if (!data.Datas.length) {
          return this.tableSize.maxHeight = 'auto'
        }

        for (let i = 0, iLen = this.list.length; i < iLen; i++) {
          const item = this.list[i]
          for (const key in item) {
            const value = item[key]
            if (['Sequence', 'TableId', 'RecordTime'].includes(key)) continue
            item[key] = value.Value
          }
        }
        if (this.currentRow) {
          // console.log("query.currentRow", JSON.parse(JSON.stringify(this.currentRow)));
          let index = 0
          for (let i = 0, iLen = data.Datas.length; i < iLen; i++) {
            const item = data.Datas[i]
            if (item.TableId === this.currentRow.TableId) {
              index = i
              break
            }
          }
          this.$refs.myTable.setCurrentRow(data.Datas[index]);
        } else {
          this.$refs.myTable.setCurrentRow(data.Datas[0]);
        }

      }, err => {
        console.log('失败回调', err);
      })
    },
    changePage(index, state) {
      this.form.Page = index
      this.query()
    },

    // 选择行
    currentChange(currentRow) {
      this.currentRow = currentRow
    },

    // 首件结果录入-显示/隐藏
    firstArtifactsResultsShow(state) {
      switch (state) {
        case 'show':
          this.firstArtifactsResultsDialog.show = true
          this.firstArtifactsResultsDialog.contentShow = true
          break;
        case 'hide':
          this.firstArtifactsResultsDialog.show = false
          setTimeout(() => {
            this.firstArtifactsResultsDialog.contentShow = false
          }, 500);
          break;
        default:
          break;
      }
    },
    firstArtifactsResultsCallback(data) {
      if (data === 'cancel') {
        this.firstArtifactsResultsShow('hide')
        return
      }
      this.firstArtifactsResultsShow('hide')
      this.query()
    },

    init() {
      this.form.StartTime = toDay('StartTime')
      this.form.EndTime = toDay('EndTime')
      this.initContainerSize()
      this.getLocationReport()
    }
  },
  mounted() {
    this.init()
    window.onresize = () => {
      clearTimeout(this._setTableHeightTimer)
      this._setTableHeightTimer = setTimeout(() => {
        this.setTableHeight()
      }, 300)
    }
  },
};
</script>

<style lang='scss' scoped>
@import "./index.scss";
.location-management {
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background: #EEEEEE;
  
  .color-red {
    color: red;
  }

  .tabs {
    width: 120px;
    min-width: 120px;
    height: 100%;
    padding: 0 10px 0 0;
    .itme {
      width: 100%;
      height: 40px;
      margin: 0 0 10px 0;
      line-height: 40px;
      text-align: center;
      background: white;
      border-radius: 6px;
      cursor: pointer;
    }
    .itme:hover, .select-itme {
      color: #EEEEEE;
      background: #4270E4;
    }
  }

  .container {
    width: calc(100% - 120px);
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    & > #head-form {
      justify-content: space-between;
      flex-wrap:wrap;
      
      // 搜索
      & > .search {
        margin: 0 0 10px 0;
        justify-content: flex-start;
        .item {
          margin: 0 10px 0 0;
          .title {
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #6c6d6d;
            line-height: 20px;
          }
        }
      }
      
      // 数据
      & > .data {
        margin: 0 0 10px 0;
        & > .item {
            margin: 0 20px 0 0;
            line-height: 40px;
            text-align: center;
          .text {
            height: 40px;
          }
          .number {
            height: 40px;
            padding: 0 20px;
            font-weight: bold;
            background: white;
            border: 1px solid black;
          }
        }
        .unqualified {
            .number {
              color: red;
            }
          }
      }
    }

    .my-table {
      flex: 1;

      ::v-deep {
        th {
          background: rgb(90, 108, 152);
          color: rgb(255, 255, 255);
          background: rgb(90, 108, 152);
          border-left: 1px solid rgb(204, 204, 204);
        }
        .el-table__body-wrapper {
          height: inherit;
        }
        .has-gutter {
          .el-table__cell {
            height: 50px;
            padding: 0px;
            font-size: 14px;
            color: rgb(255, 255, 255);
            background: rgb(90, 108, 152);
            border-left: 1px solid rgb(204, 204, 204);
          }
        }
      }
    }

    // 分页
    & > .pagination {
      width: 100%;
      padding: 20px 0 0 0;
    }
  }
  .no-tabs {
    width: 120px;
    min-width: 120px;
    height: 100%;
    margin: 0 10px 0 0;
    background: white;
  }
  .no-location {
    width: 100%;
    height: 100%;
    background: white;
  }
}
</style>