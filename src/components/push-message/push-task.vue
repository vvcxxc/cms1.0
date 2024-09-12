<template>
  <div class="page flex">
    <div class="push-message-title flex">
      <div class="black"></div>
      <div class="title">{{ lang.PushMessage_PushTask }}</div>
    </div>
    <div class="content flex">
      <el-table
        ref="taskTable"
        :data="list"
        :border="true"
        height="250"
        highlight-current-row
        @row-click="tableRowClick"
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        :row-class-name="tableRowClassName"
        tooltip-effect="dark"
      >
        <el-table-column :label="lang.PushMessage_SerialNumber" show-overflow-tooltip align="center" min-width="40">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="Enable" show-overflow-tooltip :label="lang.PushMessage_Operation" align="center">
          <template slot-scope="scope">
            <span class="scope-cover" v-if="!showbjtscz" @click="showtip"></span>
            <el-switch
              v-model="scope.row.Enable"
              :inactive-text="lang.MsgPush_Alarm_Stop"
              :active-text="lang.MsgPush_Alarm_Enable"
              inactive-color="#DCDCDC"
              active-color="#D9E2FA"
              class="my-switch"
              @change="setEnableTask(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="TaskName" :show-overflow-tooltip="true" :label="lang.PushMessage_TaskName"
        >
          <template slot-scope="scope">
            <div class="single-line-text font-2" :style="enableStateColor(scope)">{{ scope.row.TaskName }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    taskList: {
      type: Array,
      default: () => {
        return []
      }
    },
    showbjtscz:{
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      list: []
    };
  },
  methods: {
    showtip(){
      this.$parent.showtip()
    },
    tableRowClick(row, column) {
      if (column) if (column.property === "Enable") return;
      this.$emit("selectTask", row);
    },
    enableStateColor(scope) {
      return scope.row.Enable ? 'color: #333333;' : 'color: #818181;'
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) return 'table-row-highlighted';
      return '';
    },
    setEnableTask(data) {
      this.$api.pushMessage.enableTask({
        taskId: [data.TaskId],
        enable: data.Enable
      }).then(ref => {
        // this.$message.success(ref.data.msg);
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 选中table指定行
    setCurrentRow() {
      if (!this.list.length || !this.$refs.taskTable) return;
      this.$refs.taskTable.setCurrentRow(this.list[0]);
      this.tableRowClick(this.list[0], {});
    },
  },
  watch: {
    "taskList": {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        if (!newVal) return;
        this.list = newVal;
        this.setCurrentRow();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/push-message.scss";
.page {
  font-family: Source Han Sans CN;
  & > .content {
    width: 100%;
    height: calc(100% - 50px);
    padding: 10px;
    background: #ffffff;
    border: 1px solid #e4e4e4;
    flex-direction: column;

    ::v-deep .el-table__header-wrapper .cell {
      white-space: nowrap;
    }
  }
}
</style>