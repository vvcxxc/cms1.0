<!-- 配置组别 -->
<template>
  <el-dialog
    title="配置组别"
    width="400px"
    center
    class="config-group"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    :before-close="handleClose"
  >
    <div class="config-group-content">
      <div class="operation-bar flex">
        <div class="btn flex" @click="()=>{ tableData.push({ name: '' }) }">
          <i class="el-icon-plus"></i>
          <span class="text">添加</span>
        </div>
      </div>

      <el-table
        :data="tableData"
        border
        :height="280"
      >
        <el-table-column align="center" label="序号"  type="index" width="50"></el-table-column>
        <el-table-column align="center" label="生产组别" prop="StatusDescription">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" prop="PlanNo" width="80">
          <template slot-scope="scope">
            <div class="del-btn" @click="()=>{ tableData.splice(scope.$index, 1) }">删除</div>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="onSubmit('confirm')">确认</el-button>
      <el-button size="mini" @click="onSubmit('cancel')">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    groupList: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      dialogShow: false,
      tableData: [],
    };
  },
  watch: {
    "dialogVisible": {
      handler: function(val) {
        this.dialogShow = val
        if (val) this.init();
      }
    },
  },
  methods: {
    handleClose() {
      this.$emit('callback', 'cancel')
    },
    // 数组是否有重复元素
    arraysHaveDuplicate(arr, key) {
      let newArr = []
      for (const item of arr) {
        const value = item[key]
        if (newArr.includes(value)) return true
        newArr.push(value)
      }
      return false;
    },
    onSubmit(state) { // state: confirm-确定 cancel-取消
      // console.log(JSON.parse(JSON.stringify({
      //   '0表格数据': this.tableData,
      //   '1state': state,
      // })));

      if (state === 'cancel') {
        this.$emit('callback', state)
        return
      }

      if (!this.tableData.length) {
        this.confirm_Pop2(this, '请添加生产组别', {tips: '提示', yes: '确定' })
        return false
      }

      if (!this.tableData.every(item => {
        if (!item.name) return false
        return true
      })) {
        this.confirm_Pop2(this, '生产组别不能为空', {tips: '提示', yes: '确定' })
        return
      }

      if (this.arraysHaveDuplicate(this.tableData, 'name')) {
        this.confirm_Pop2(this, '生产组别不能重名', {tips: '提示', yes: '确定' })
        return
      }

      const list = this.tableData.map(item => item.name)
      this.$emit('callback', state, list)
    },
    async init() {
      this.tableData = this.groupList.map(item => {
        return { name: item }
      })
      // console.log('配置组别-初始化', JSON.parse(JSON.stringify({
      //   '0groupList': this.groupList,
      //   '1tableData': this.tableData,
      // })));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

.config-group {
  .config-group-content {
    padding: 10px 0 0 0;
    .operation-bar {
      margin: 0 0 10px 0;
      justify-content: flex-end;
      .btn {
        color: #70B603;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
        .text {
          line-height: 14px;
        }
      }
    }

    .del-btn {
      color: #027DB4;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .dialog-footer {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
