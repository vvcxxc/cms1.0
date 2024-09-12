<template>
  <div class="push-content-details">
    <div class="body">
      <!-- 内容名称 -->
      <div class="content-name flex">
        <div class="title push-content-details-title">{{lang.PushMessage_ContenName}}</div>
        <div class="val push-content-details-input">{{contentData.ConfigName}}</div>
      </div>

      <!-- 推送内容 -->
      <div class="push-content">
        <div class="push-message-title flex">
          <div class="black"></div>
          <div class="title">{{lang.PushMessage_PushContent}}</div>
        </div>
        <div class="content flex">

          <!-- 已关联报警点 -->
          <div class="associated-alarm">
            <div class="content-title">{{lang.PushMessage_AlreadyAssociatedAlarm}}</div>
            <el-table
              :data="alarmList"
              :border="true"
              height="220"
              :header-cell-style="{ background: '#DCF0F9', color: '#333333' }"
              :row-class-name="tableRowClassName"
            >
              <el-table-column :label="lang.PushMessage_SerialNumber" align="center">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column prop="TagName" show-overflow-tooltip :label="lang.PushMessage_VariableName" align="center"></el-table-column>
              <el-table-column prop="AlarmType" show-overflow-tooltip :label="lang.PushMessage_AlarmType" align="center"></el-table-column>
              <el-table-column prop="AlarmText" show-overflow-tooltip :label="lang.PushMessage_AlarmText" align="center"></el-table-column>
              <el-table-column prop="AlarmDevice" show-overflow-tooltip :label="lang.PushMessage_AlarmEquipment" align="center"></el-table-column>
              <el-table-column prop="AlarmLevel" show-overflow-tooltip :label="lang.PushMessage_AlarmLevel" align="center"></el-table-column>
            </el-table>
          </div>

          <!-- 推送消息格式 -->
          <div class="push-msg-format">
            <div class="content-title">{{lang.PushMessage_PushMsgFormat}}</div>
            <div class="content flex">
              <div class="title flex">
                <div class="push-content-details-title">{{lang.PushMessage_Title}}：</div>
                <div class="push-content-details-input single-line-text" :title="pushMsgFormatJsonToText(contentData.Title)" v-html="pushMsgFormatJsonToHtml(contentData.Title)"></div>
              </div>
              <div class="body flex">
                <div class="push-content-details-title">{{lang.PushMessage_MainText}}：</div>
                <div class="push-content-details-input" v-html="pushMsgFormatJsonToHtml(contentData.Text)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 渠道与提醒 -->
      <push-place-alert-config :contentData="contentData"></push-place-alert-config>
    </div>

    <!-- <div class="foot flex">
      <el-button type="info">取消</el-button>
      <el-button type="primary">确认</el-button>
    </div> -->
  </div>
</template>
<script>
import PushPlaceAlertConfig from '@/components/push-message/push-place-alert-config.vue';
export default {
  components: { PushPlaceAlertConfig },
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
      alarmList: [],
    }
  },
  methods: {
    pushMsgFormatJsonToText(str) {
      let html = [];
      JSON.parse(str).forEach((item) => {
        if (item.Text) html.push(item.Text);
      });
      return html.join("");
    },
    pushMsgFormatJsonToHtml(str) {
      let html = [];
      JSON.parse(str).forEach((item) => {
        if (!item.Text) return;
        let className = item.type === 1 ? 'text' : 'label';
        html.push(`<div class="${className}">${item.Text}</div>`);
        if (item.type === 1) if (item.Text.indexOf("\r\n\r\n") >= 0) html.push(`<br><br>`);
      });
      return html.join("");
    },
    getAlarmList() {
      this.$api.pushMessage.getAlarmList({
        configId: this.contentData.ConfigId,
      }).then(ref => {
        this.alarmList = ref.data.data;
        // console.log("报警点列表", JSON.parse(JSON.stringify(this.alarmList)));
      }, err => {
        console.log('失败回调', err);
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) return 'table-row-highlighted';
      return '';
    },
  },
  watch: {
    "contentData": {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        // console.log("详情", JSON.parse(JSON.stringify(newVal)));
        if(!newVal) return;
        this.getAlarmList();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
::v-deep .el-table th.gutter {
  background: rgb(220, 240, 249);
}
::v-deep .el-table--border td {
  border-right: 1px solid #E4E4E4;
}

.push-content-details {
  height: 100%;
  .push-content-details-title {
    line-height: 40px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #525252;
  }
  .push-content-details-input {
    padding: 0 0 0 10px;
    line-height: 40px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #333333;
    background: #E5E5E5;
    border: 2px solid #DCDCDC;
    ::v-deep .label {
      font-family: Source Han Sans CN;
      font-size: 14px;
      font-weight: bold;
      color: #FFA34A;
      display: inline-block;
    }
    ::v-deep .text {
      font-family: Source Han Sans CN;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
      display: inline-block;
    }
  }

  .body {
    height: 100%;
    // height: calc(100% - 70px);
    overflow-y: auto;
    // 内容名称
    .content-name {
      margin: 0 0 10px 0;
      justify-content: flex-start;
      .title {
        margin: 0 10px 0 0;
      }
      .val {
        min-width: 330px;
        height: 40px;
      }
    }

    // 推送内容
    .push-content {
      & > .content {
        width: 100%;
        height: 300px;
        padding: 20px;
        background: #F3F3F3;
        border: 1px solid #DDDDDD;
        .content-title {
          margin: 0 0 10px 0;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #386DF0;
        }

        // 已关联报警点
        .associated-alarm {
          width: 55%;
          height: 100%
          // background: olive;
        }
        
        // 推送消息格式
        .push-msg-format {
          width: 45%;
          height: 100%;
          padding: 0 0 0 20px;
          .content {
            width: 100%;
            height: 100%;
            flex-direction : column;
            .title {
              width: 100%;
              margin: 0 0 10px 0;
              .push-content-details-title {
                white-space: nowrap;
              }
              .push-content-details-input {
                width: 100%;
              }
            }
            .body {
              width: 100%;
              height: calc(100% - 52px);
              align-items: flex-start;
              .push-content-details-title {
                white-space: nowrap;
              }
              .push-content-details-input {
                width: 100%;
                height: calc(100% - 42px);
                overflow-y: auto;
                line-height: inherit;
              }
            }
          }
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: 70px;
    padding: 30px 0 0 0;
    justify-content: flex-end;
  }
}
</style>