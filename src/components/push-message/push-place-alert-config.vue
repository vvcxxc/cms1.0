<template>
  <div class="page flex">
    
    <div class="place">
      <div class="push-content-details-title">{{lang.PushMessage_PushChannel}}</div>
      <el-table
        :data="contentData.ChannelTypeDecription"
        :border="true"
        height="250"
        :header-cell-style="{ background: '#DCF0F9', color: '#333333' }"
      >
        <el-table-column prop="DecriptionName" :label="lang.PushMessage_PushChannel" show-overflow-tooltip  align="center"></el-table-column>
        <el-table-column prop="IsChecked" show-overflow-tooltip :label="lang.PushMessage_Validity">
          <template slot-scope="scope">
            <!-- <el-checkbox v-model="scope.row.IsChecked">{{scope.row.DecriptionName}}</el-checkbox> -->
            <el-checkbox v-model="scope.row.IsChecked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <div class="mask-layer"></div>
    </div>

    <div class="alert">
      <div class="title flex">
          <div class="push-content-details-title">{{lang.PushMessage_PushRemind}}</div>
          <div class="push-message-popover">
            <img class="btn" :src="iconPrompt" />
            <div class="dialog flex">
              <div class="arrow"></div>
              <div class="content english-word-wrap">{{lang.PushMessage_WeakRemindDescription}}</div>
            </div>
          </div>
      </div>
      <el-table
        :data="alertConfig.list"
        :border="true"
        :header-cell-style="{ background: '#DCF0F9', color: '#333333' }"
      >
        <el-table-column show-overflow-tooltip prop="name" :label="lang.PushMessage_PushRemind"></el-table-column>
        <el-table-column show-overflow-tooltip prop="select" :label="lang.PushMessage_Validity" align="center">
          <template slot-scope="scope">
            <el-radio v-model="contentData.RemindType" :label="scope.row.type">{{""}}</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <!-- 强提醒配置 -->
      <div class="alert-strong-config" v-if="contentData.RemindType === 1">
        <div class="line flex">
          <div class="push-content-details-title">{{lang.PushMessage_StrongRemindCycle}}：</div>
          <div class="flex">
            <el-input v-model="alertConfig.hour" class="" placeholder=""></el-input>
            <span>{{lang.PushMessage_Hours}}</span>
            <el-input v-model="alertConfig.minute" class="" placeholder=""></el-input>
            <span>{{lang.PushMessage_Minutes}}</span>
          </div>
        </div>
        <div class="line flex">
          <div class="push-content-details-title">{{lang.PushMessage_StrongRemindMax}}：</div>
          <div class="flex" style="margin: 0 0 0 10px;">
            <div>
              <!-- <el-radio v-model="alertConfig.type" label="custom" style="margin: 0;">{{''}}</el-radio> -->
              <el-input v-model="alertConfig.RemindMaxLimit" class="" placeholder="" style="margin-left: 0;"></el-input>
              <span>{{lang.PushMessage_Count}}</span>
            </div>
            <!-- <el-radio v-model="alertConfig.type" label="unlimited" class="no-limit">{{lang.PushMessage_Unlimited}}</el-radio> -->
          </div>
        </div>
      </div>
      <div class="mask-layer"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    contentData: {
      type: Object,
      default: () => {
        return null
      }
    },
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      iconPrompt: require('@/assets/images/prompt.png'),
      alertConfig: {
        hour: '',
        minute: '',
        value: '',
        type: 'unlimited',
        list: [
          {
            name: '弱提醒',
            type: 2
          },
          {
            name: '强提醒',
            type: 1
          }
        ]
      },
    }
  },
  methods: {
    // 分钟转小时
    minuteTohour(str) {
      if (str !== "0" && str !== "" && str !== null) {
        return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() :
          (Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (str % 60).toString());
      }
      else {
        return '00:00';
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) return 'table-row-highlighted';
      return '';
    },
    init() {
      this.alertConfig.list[0].name = this.lang.PushMessage_WeakRemind
      this.alertConfig.list[1].name = this.lang.PushMessage_StrongRemind
    }
  },
  created() {
    this.init()
  },
  watch: {
    "contentData": {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        // console.log("详情-渠道", JSON.parse(JSON.stringify(newVal)));
        if(!newVal) return;
        var time = this.minuteTohour(newVal.RemindTime).split(":");
        this.alertConfig.hour = time[0];
        this.alertConfig.minute = time[1];
        this.alertConfig.type = newVal.RemindMaxLimit >= 0 ? 'custom' : 'unlimited';
        this.alertConfig.RemindMaxLimit = newVal.RemindMaxLimit >= 0 ? newVal.RemindMaxLimit : '';
        // console.log("详情-渠道.alertConfig", JSON.parse(JSON.stringify(this.alertConfig)));
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
::v-deep .el-table--border td {
  border-right: 1px solid #EBEEF5;
}
.push-content-details-title {
  line-height: 40px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #525252;
}
.mask-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.page {
  padding: 20px 0 0 0;
  align-items: flex-start !important;
  .place {
    width: 40%;
    padding: 0 20px 0 0;
    position: relative;
  }
  .alert {
    width: 60%;
    position: relative;
    & > .title {
      justify-content: flex-start;
    }
    & > .mask-layer {
      height: calc(100% - 40px);
      margin: 40px 0 0 0;
    }
  }
}
// 强提醒配置
.alert-strong-config {
  .el-input {
    width: 80px;
    margin: 0 10px;
    ::v-deep .el-input__inner {
      padding: 0 0 0 10px;
      line-height: 40px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #333333;
      background: #E5E5E5;
      border: 1px solid #DCDCDC;
    }
  }

  .line {
    margin: 10px 0 0 0;
    justify-content: flex-start;
  }
  .no-limit {
    ::v-deep .el-radio__input {
      margin: 0 0 0 20px;
    }
  }
}
::v-deep .el-radio__inner {
  background: #F4F4F4 !important;
}
</style>