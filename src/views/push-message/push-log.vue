<template>
  <div class="page flex">
    <!-- 查询 -->
    <div class="query flex">
      <div class="item">
        <span class="title">{{ lang.MsgPush_Log_MsgType }}</span>
        <el-select v-model="form.taskType" :placeholder="lang.PushMessage_PleaseSelect">
          <el-option
            v-for="item in options.taskType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="title">{{ lang.PushMessage_PushChannel }}</span>
        <el-select style="min-width: 170px" v-model="form.channlType" :placeholder="lang.PushMessage_PleaseSelect">
          <el-option
            v-for="item in options.channlType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="title">{{ lang.MsgPush_Log_PushStatus }}</span>
        <el-select v-model="form.pushStatus" :placeholder="lang.PushMessage_PleaseSelect">
          <el-option
            v-for="item in options.pushStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <span class="title">{{ lang.MsgPush_Log_TimeRange }}</span>
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          prefix-icon="prefix-icon"
          :clearable="false"
          :placeholder="lang.NewTrendChart_NewTrendChartUserControl_StartTime">
        </el-date-picker>
        <span class="title">-</span>
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          prefix-icon="prefix-icon"
          :clearable="false"
          :placeholder="lang.NewTrendChart_NewTrendChartUserControl_EndTime">
        </el-date-picker>
      </div>
      <div class="item flex">
        <el-input
          v-model="form.key"
          :placeholder="lang.MsgPush_Log_KeyWord"
          style="width: 180px;margin: 0 10px 0 0;"
        ></el-input>
        <el-button type="primary" @click="query('id')">{{ lang.PushMessage_Query }}</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <el-table
      :data="list"
      :border="true"
      height="250"
      :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
      :row-class-name="tableRowClassName"
      tooltip-effect="dark"
    >
      <el-table-column :label="lang.PushMessage_SerialNumber" align="center">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="TaskTypeStr" :label="lang.MsgPush_Log_MsgType"></el-table-column>
      <el-table-column prop="TaskName" :label="lang.PushMessage_TaskName"></el-table-column>
      <el-table-column prop="ConfigName" :label="lang.PushMessage_ContenName"></el-table-column>
      <el-table-column prop="PushChannelStr" :label="lang.PushMessage_PushChannel"></el-table-column>
      <el-table-column prop="PushTime" :label="lang.MsgPush_Log_PushTime">
        <template slot-scope="scope">{{scope.row.PushTime.replace('T', ' ')}}</template>
      </el-table-column>
      <el-table-column prop="Status" :label="lang.MsgPush_Log_PushStatus"></el-table-column>
      <el-table-column prop="Mark" :label="lang.MsgPush_Log_Remark" :show-overflow-tooltip="true"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <my-page :pageData="pageData" @req="req"></my-page>
      <!-- <el-pagination layout="prev, pager, next" :total="50"></el-pagination> -->
    </div>
      <TipsPop :popText="TipsPopText" v-show="isTipsPop"></TipsPop>
       <div v-if="isTipsPop" class="mask_box"></div>
  </div>
</template>
<script>
import MyPage from '@/components/public/Pages.vue';
import TipsPop from '../customer/TipsPop.vue'
export default {
  components: { MyPage,TipsPop },
  data() {
    return {
      isTipsPop:false,
      TipsPopText:'该用户没有操作权限',
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      list: [],
      buttonid:{},
      options: {
        taskType: [
          {
            value: '0',
            label: '不限'
          },
          {
            value: '1',
            label: '报警类型'
          }
        ],
        channlType: [
          {
            value: '0',
            label: '不限'
          },
          {
            value: '1',
            label: 'APP消息推送'
          }
        ],
        pushStatus: [
          {
            value: '0',
            label: '不限'
          },
          {
            value: '1',
            label: '全部成功'
          },
          {
            value: '2',
            label: '包含失败'
          },
          {
            value: '3',
            label: '全部失败'
          },
        ]
      },
      form: {
        taskType: '0',
        channlType: '0',
        pushStatus: '0',
        startTime: this.toDay('startTime'),
        endTime: this.toDay('endTime'),
        key: ''
      },
      pageData: {
        PageSize: 50,
        TotalCount: 0,
        TotalPage: 0,
        PageIndex: 1,
        LastEnabled: false,
        NextEnabled: false
      },
    };
  },
  methods: {
    // 获取今天 state: 'startTime'开始时间  'endTime'结束时间
    toDay(state) {
      var y = new Date().getFullYear();
      var m = new Date().getMonth() + 1;
      var d = new Date().getDate();
      var time = state === 'startTime' ? '00:00:00' : '23:59:59';
      // 补零
      m = (m < 10) ? "0" + m : m
      d = (d < 10) ? "0" + d : d;
      return `${y}-${m}-${d} ${time}`
    },
    //关闭弹窗提示
    clonePopFun() {
      this.isTipsPop = false
    },
    query(id) {
      let _query = () => {
        if (new Date(this.form.endTime) - new Date(this.form.startTime) < 0 ) {
          this.$message.warning('结束时间不能比开始时间早');
          return;
        }
        let data = {
          taskType: this.form.taskType,
          channlType: this.form.channlType,
          pushStatus: this.form.pushStatus,
          key: this.form.key,
          startTime: this.form.startTime, // 测试数据
          endTime: this.form.endTime, // 测试数据
          pageIndex: this.pageData.PageIndex,
          pageSize:  this.pageData.PageSize
        }
        this.$api.pushMessage.getPushLog(data).then(ref => {
          // console.log("列表-后台", JSON.parse(JSON.stringify(ref)));
          this.list = ref.data.data.DataList
          this.pageData.PageIndex = ref.data.data.ParameterList.PageIndex;
          this.pageData.TotalCount = ref.data.data.ParameterList.TotalCount;
          this.pageData.TotalPage = ref.data.data.ParameterList.TotalPage;
          // console.log("列表", JSON.parse(JSON.stringify(this.list)));
        }, err => {
          console.log('失败回调', err);
        })
      }
      if (!id) {
        _query()
        return;
      }
      this.isPower(this.buttonid.tsrzcxid).then( val => {
        if (!val) {
          this.isTipsPop = true;
          return;
        }
        _query();
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) return 'table-row-highlighted';
      return '';
    },
    req(pageIndex) {
      // console.log(pageIndex);
      this.pageData.PageIndex = pageIndex;
      this.query();
    },
    translation() {
      this.TipsPopText = this.lang.NoOperationAuthority
      this.options.taskType[0].label = this.lang['不限'] || ''
      this.options.taskType[1].label = this.lang.AlarmStatistics_subtablecell0 || ''

      this.options.channlType[0].label = this.lang['不限'] || ''
      this.options.channlType[1].label = this.lang.PushMessage_PushApp

      this.options.pushStatus[0].label = this.lang['不限'] || ''
      this.options.pushStatus[1].label = this.lang.MsgPush_Log_AllSuccessful
      this.options.pushStatus[2].label = this.lang.MsgPush_Log_ContainFailure
      this.options.pushStatus[3].label = this.lang.MsgPush_Log_AllFailed
    },
    async init() {
      this.translation();
      await this.powerBtn()
      this.query();
    },
    // 筛选按钮数据
    powerBtn() {
      var powerData = this.$store.state.btnPowerData
      var btnList = [] // 按钮数据列表
      var btnObj = {} // 按钮对象是为了能根据key快速查询对应的按钮数据
      // 获取按钮权限ID
      for (let i = 0, iLen = powerData.length; i < iLen; i++) {
          const Children = powerData[i].Children;
          for (let n = 0, nLen = Children.length; n < nLen; n++) {
              const item = Children[n];
              if (item.RightDesc === '消息推送') {
                  btnList = item.Children;
                  break
              }
          }
          if (btnList.length) break;
      }
      btnList.forEach((item) => {
          btnObj[item.RightDesc] = item
      });
      this.buttonid = {
        bjtsczid:btnObj['报警信息-推送任务操作按钮'].RightID,
        bjtsckid:btnObj['报警信息-推送内容查看按钮'].RightID,
        bjcxid:btnObj['报警信息-查询按钮'].RightID,
        bjpzcz:btnObj['报警信息-账户配置操作按钮'].RightID,
        bjpzid:btnObj['报警信息-配置按钮'].RightID,
        tsrzcxid:btnObj['推送日志-查询按钮'].RightID
      }
      this.isPower(this.buttonid.bjtsczid).then((val)=>{
        this.showbjtscz = val
      })
      this.isPower(this.buttonid.bjpzcz).then((val)=>{
        this.showbjpz = val
      })
      this.isPower(this.buttonid.bjtsckid).then((val)=>{
        this.showbjtsck = val
      })
    },
    // 该用户是否有权限
    isPower(id) {
      return new Promise((resolve, reject) => {
        var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
        var sightseerInfo1 = JSON.parse(sessionStorage.getItem('sightseerInfo1'));
        var argUserID = (userinfo != null) ? argUserID = userinfo.SCMSUserID : argUserID = sightseerInfo1.SCMSUserID
        this.$axios({ // 权限配置请求接口
          method: 'post',
          url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${argUserID}&argRightID=${id}`,
        }).then(res => {
          resolve(res.data.data)
        },err => {
          console.log('该用户是否有权限-报错', err)
        })
      })
    }
  },
  created() {
    this.init()
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
.el-select {
  width: 140px;
  height: 38px;
}
.page {
  width: 100%;
  height: 100%;
  flex-direction: column !important;
  // 查询
  .query {
    width: 100%;
    padding: 10px 0 0 10px;
    justify-content: flex-start;
    flex-wrap: wrap;
    background: #dddddd;

    ::v-deep .el-input__inner {
      padding-left: 10px;
    }
    ::v-deep .el-input__prefix {
      left: initial;
      right: 5px;
      position: absolute;
      float: right;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    ::v-deep .prefix-icon {
      width: 20px;
      height: 20px;
      display: block;
      background-image: url("~@/assets/images/rili.png");
      background-size:100% 100%;
      background-repeat:no-repeat;
    }
    .item {
      margin: 0 20px 10px 0;
      .title {
        margin: 0 10px 0 10px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #6c6d6d;
        line-height: 20px;
      }
    }
  }

  // 分页
  .pagination {
    width: 100%;
  }
}
</style>