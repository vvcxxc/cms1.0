<template>
  <div class="page flex">
    <div class="push-message-title flex">
      <div class="black"></div>
      <div class="title">{{ lang.PushMessage_AccountConfig }}</div>
    </div>
    <div class="content flex">
      <el-table
        :data="list"
        :border="true"
        height="250"
        @row-click="tableRowClick"
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column :label="lang.PushMessage_SerialNumber" show-overflow-tooltip align="center" min-width="40">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="operation" show-overflow-tooltip :label="lang.PushMessage_Operation" align="center">
          <template slot-scope="scope">
            <span class="scope-cover" v-if="!showbjpz" @click="showtip"></span>
            <el-switch
              v-model="scope.row.Enable"
              :inactive-text="lang.MsgPush_Alarm_Stop"
              :active-text="lang.MsgPush_Alarm_Enable"
              inactive-color="#DCDCDC"
              active-color="#D9E2FA"
              class="my-switch"
              @change="setEnable(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="ChannelType" show-overflow-tooltip :label="lang.PushMessage_PushChannel">
          <template slot-scope="scope">
            <div class="font-2">{{renderPushTypeText(scope.row)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="UserList" show-overflow-tooltip :label="lang.PushMessage_Account">
          <template slot-scope="scope">
            <div class="single-line-text font-2" :title="scope.row.UserList" :style="enableStateColor(scope)">{{ scope.row.UserList }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    accountList: {
      type: Array,
      default: () => {
        return null
      }
    },
    showbjpz: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      pushAccountConfig: {
        dialog: false
      },
      list: []
    }
  },
  methods: {
    showtip(){
      this.$parent.showtip()
    },
    // 渲染推送类型
    renderPushTypeText(row) {
      var currentLang = localStorage.getItem('currentLang')
      var text = {
        1: {
          Main_Language_ZH: 'APP消息推送',
          Main_Language_EN: 'APP News push',
        }
      }

      var obj = text[row.ChannelType]
      return obj ? obj[currentLang] : '';
    },
    // 当某一行被点击时会触发该事件
    tableRowClick(row, column, event) {
      console.log("选择账户");
      // if (column.property === 'operation') return;
      // this.$emit("selectContent", row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) return 'table-row-highlighted';
      return '';
    },
    setEnable(row) {
      this.$api.pushMessage.setUserConfigEnable({
        configId: row.ConfigId,
        enable: row.Enable,
        channelType: 1
      }).then(ref => {
        // this.$message.success(ref.data.msg);
      }, err => {
        console.log('失败回调', err);
      })
    },
    enableStateColor(scope) {
      return scope.row.Enable ? 'color: #333333;' : 'color: #818181;'
    },
  },
  watch: {
    'accountList': {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        // console.log("accountList", JSON.parse(JSON.stringify(newVal)));
        if (!newVal) return;
        this.list = newVal;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
.page {
  & > .content {
    width: 100%;
    height: calc(100% - 50px);
    padding: 10px;
    background: #ffffff;
    border: 1px solid #e4e4e4;
    flex-direction : column;

    .table-check {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #4270E4;
      line-height: 17px;
      cursor: pointer;
    }
    .table-check:hover {
      text-decoration: underline;
    }

    ::v-deep .el-table__header-wrapper .cell {
      white-space: nowrap;
    }
  }
}
</style>