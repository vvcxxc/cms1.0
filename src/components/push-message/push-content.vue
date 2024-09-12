<template>
  <div class="page flex">
    <div class="push-message-title flex">
      <div class="black"></div>
      <div class="title">{{lang.PushMessage_PushContent}}</div>
    </div>
    <div class="content flex">
      <el-table
        ref="contentTable"
        :data="list"
        :border="true"
        height="250"
        highlight-current-row
        @row-click="tableRowClick"
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column :label="lang.PushMessage_SerialNumber" align="center" show-overflow-tooltip min-width="40">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="operation" :label="lang.PushMessage_Operation" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span class="scope-cover" v-if="!showbjtsck" @click="showtip"></span>
            <span @click="tableCheck(scope)" class="table-check">{{ lang.PushMessage_Check }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ConfigName" show-overflow-tooltip :label="lang.PushMessage_ContenName">
          <template slot-scope="scope">
            <div class="single-line-text font-2" :title="scope.row.ConfigName">{{ scope.row.ConfigName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="alert" show-overflow-tooltip :label="lang.PushMessage_PushRemind">
          <template slot="header">
            <div class="alert-th flex">
              <div style="white-space: nowrap;text-overflow: unset;">{{lang.PushMessage_PushRemind}}</div>
              <div class="push-message-popover">
                <img class="btn" :src="iconPrompt" />
                <div class="dialog flex">
                  <div class="arrow"></div>
                  <div class="content english-word-wrap">{{lang.PushMessage_WeakRemindDescription}}</div>
                </div>
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <div class="font-2">{{renderPushRemind(scope.row)}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 推送内容及渠道 -->
    <el-dialog
      :title="lang.PushMessage_PushContentOrChannel"
      width="60%"
      class="push-content-details-dialog flex"
      :visible.sync="pushContentDetails.dialog"
      :before-close="handleClose"
    >
      <push-content-details v-if="pushContentDetails.dialog" :contentData="pushContentDetails.contentData"></push-content-details>
    </el-dialog>
  </div>
</template>
<script>
import pushContentDetails from '@/components/push-message/push-content-details.vue';
export default {
  components: { pushContentDetails },
  props: {
    contentList: {
      type: Array,
      default: () => {
        return null
      }
    },
    showbjtsck: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      iconPrompt: require('@/assets/images/prompt.png'),
      pushContentDetails: {
        dialog: false,
        contentData: null
      },
      list: []
    }
  },
  methods: {
    showtip(){
      this.$parent.showtip()
    },
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
    arraySort(array, index) {//排序
      var arr = JSON.parse(JSON.stringify(array));
      function SortFun(prop) {
        return function (obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
          }
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0
          }
        }
      }
      return arr.sort(SortFun(index))
    },
    handleClose() {
      this.pushContentDetails.dialog = false
    },
    tableCheck(scope) {
      this.pushContentDetails.contentData = scope.row
      this.pushContentDetails.dialog = true;
    },
    renderPushRemind(row) {
      if (row.RemindType === 2) return this.lang.PushMessage_WeakRemind;
      return this.lang.PushMessage_StrongRemind + '(' + this.minuteTohour(row.RemindTime) + ')';
    },
    // 当某一行被点击时会触发该事件
    tableRowClick(row, column, event) {
      if (column) if (column.property === 'operation') return;
      this.$emit("selectContent", row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) return 'table-row-highlighted';
      return '';
    },
    // 选中table指定行
    setCurrentRow() {
      if (!this.list.length || !this.$refs.contentTable) return;
      this.$refs.contentTable.setCurrentRow(this.list[0]);
      this.tableRowClick(this.list[0], {});
    },
  },
  watch: {
    'contentList': {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        if (!newVal) return;
        newVal = this.arraySort(newVal, 'Rank')
        // console.log("contentList", JSON.parse(JSON.stringify(newVal)));
        this.list = newVal;
        this.setCurrentRow()
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";

.push-content-details-dialog {
  margin: 0;
}
.push-content-details-dialog ::v-deep .el-dialog {
  // height: 80%;
  height: 820px;
  margin: 0 !important;
  // margin-top: 0;
  .el-dialog__body {
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: auto;
    background: #EFEFEF;
  }
}

.page {
  & > .content {
    width: 100%;
    height: calc(100% - 50px);
    padding: 10px;
    background: #ffffff;
    border: 1px solid #e4e4e4;
    flex-direction: column;

    .table-check {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #4270e4;
      line-height: 17px;
      cursor: pointer;
    }
    .table-check:hover {
      text-decoration: underline;
    }
  }
}

.alert-th {
  justify-content: flex-start;
  overflow: initial;
  line-height: inherit;
  div {
    line-height: inherit;
    margin: 0;
    padding: 0;
  }
  .push-message-popover {
    // height: 30px;
    margin: 0 0 0 4px;
  }
}
::v-deep .el-table, ::v-deep .el-table__header-wrapper, ::v-deep .cell {
  overflow: initial;
  white-space: nowrap !important;
}
::v-deep .el-table th {
  overflow: initial;
}

::v-deep .el-table th div {
  white-space: break-spaces;
}
</style>