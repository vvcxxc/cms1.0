<template>
  <div class="order-fields">
    <el-table 
      class="table"
      ref="myTable"
      :data="tableData" 
      :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
      :row-class-name="({ row, rowIndex })=> rowIndex % 2 ? 'table-row-highlighted' : ''"
      :border="true"
      height="400"
      style="width: 100%;height: 400px;"
      @select="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" align="center" width="50">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="Item2" label="字段"></el-table-column>
    </el-table>
    <div class="foot-btn flex">
      <el-button @click="submit('cancel')">取消</el-button>
      <el-button type="primary" @click="submit('confirm')">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      selection: null,
    };
  },
  methods: {
    // 获取订单字段
    getOrderField() {
      this.$api.locationManagement.getOrderField().then(ref => {
        const list = ref.data.data
        // console.log("订单字段", JSON.parse(JSON.stringify(list)));
        this.tableData = list
      }, err => {
        this.$message.error(err);
      })
    },
    // 订单字段-复选框
    handleSelectionChange(row, item) {
      this.$refs.myTable.clearSelection(); // 清空选择
      this.selection = item;
      this.$refs.myTable.toggleRowSelection(item); // 选择指定行
    },
    // 提交订单字段
    submit(model) {
      // console.log(model, this.selection);
      if (model === 'cancel') {
        this.$emit('callback', 'cancel')
        return
      }
      this.$emit('callback', this.selection)
    },
    init() {
      this.getOrderField()
    }
  },
  mounted() {
    this.init()
  },
};
</script>

<style lang='scss' scoped>
@import "../index.scss";
.order-fields {
  width: 100%;
  height: 100%;
  & > .table {
    width: 100%;
    height: 100%;
    max-height: 500px;
    overflow-y: auto;
    .variable {
      width: 100%;
      height: 100%;
      justify-content: space-between;
    }
  }
  & > .page-container {
    margin: 20px 0 0 0;
  }
  & > .foot-btn {
    width: 100%;
    margin: 20px 0 0 0;
    justify-content: flex-end;
  }
}
::v-deep .el-table__header-wrapper .el-checkbox {
  display: none;
}


</style>