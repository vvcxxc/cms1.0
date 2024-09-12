<template>
<div>
  <el-dialog
    title="关联设备"
    width="1100px"
    :visible.sync="dialogVisible"
    :before-close="() => {submit('cancel')}"
    append-to-body
  >
    <div class="association-device">
    
      <!-- 头部 -->
      <div class="header">
        <div class="item">
          <span>设备类型：</span>
          <el-select class="select" v-model="form.DevicePath" placeholder="请选择">
            <el-option
              v-for="(item, i) in options" :key="i"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <el-input class="select" v-model="form.argKeyWord" placeholder="请输入关键字"></el-input>
        </div>
        <el-button class="btn search" @click="getList()">查询</el-button>
      </div>

      <!-- 表格 -->
      <el-table
        ref="myTable"
        :data="tableData"
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        tooltip-effect="dark"
        height="400px"
        :border="true"
        highlight-current-row
        @current-change="selectTableRow"
      >
        <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
        <el-table-column prop="DeviceNo" label="设备编号"></el-table-column>
        <el-table-column prop="DevicePath" label="设备类型"></el-table-column>
        <el-table-column prop="DeviceModel" label="设备型号"></el-table-column>
      </el-table>

      <!-- 底部按钮 -->
      <div class="foot-btn flex">
        <el-button @click="submit('cancel')">取消</el-button>
        <el-button type="primary" @click="submit('confirm')">确认</el-button>
      </div>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  props: {
    editData: {
      type: Object,
      required: false,
      default: ()=> {
        return null
      }
    },
    state: {
      type: String,
      required: false,
      default: ''
    },
  },
  data() {
    return {
      dialogVisible: false,
      options: [],
      form: {
        DevicePath: "",
        argKeyWord: "",
      },
      tableData: [],
      currentRow: null
    };
  },
  methods: {
    // 获取变量列表
    getList() {
      return this.$api.agency.gstEquipmentAccount().then(ref => {
        this.tableData = ref.data.data
        // console.log("变量列表", JSON.parse(JSON.stringify(this.tableData)));
        // console.log('editData', JSON.parse(JSON.stringify(this.editData)));
        if (this.editData && this.editData.DeviceName) {
          this.$nextTick(() => {
            this.setSelection()
          })
        }
      }, err => {
        console.log('失败回调', err);
      })
    },

    // 设置表格已选行
    setSelection() {
      for (let i = 0, iLen = this.tableData.length; i < iLen; i++) {
        const item = this.tableData[i]
        if (item.DeviceName === this.editData.DeviceName) {
          this.$refs.myTable.setCurrentRow(item)
          break
        }
      }
    },
    selectTableRow(currentRow) {
      this.currentRow = currentRow
    },
    submit(type) {
      // console.log(type, this.currentRow);
      switch (type) {
        case 'cancel':
          this.$emit("callback", 'cancel');
          break;
        case 'confirm':
          this.$emit("callback", 'confirm', this.currentRow);
          break;
        default:
          this.$emit("callback", 'cancel');
          break;
      }
    },
    async init() {
      await this.getList()
      this.dialogVisible = true
    },
  },
  watch: {
    "state": {
      handler: function(state) {
        const fun = {
          show: ()=>{
            this.init()
          },
          hide: ()=>{
            this.dialogVisible = false
          },
        }
        if (state && fun[state]) fun[state]()
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.el-button {
  min-width: 100px;
}

::v-deep .el-dialog {
    box-shadow: 0px 0px 8px black;
    .el-dialog__header {
      height: 50px;
      padding: 0;
      line-height: 50px;
      text-align: center;
      background: #386DF0;
      .el-dialog__title {
        color: #FFFFFF;
      }
      .el-dialog__close {
        margin: -8px -11px 0 0;
        font-size: 30px;
        color: white;
      }
    }
  }

.association-device {
  padding: 10px 20px;
  background: #e6e6e6;
  border: 1px solid #dcdcdc;

  


  & > .header {
    .item {
      padding: 10px;
      display: inline-block;
    }
    .search {
      height: 40px;
      padding: 0;
      width: 100px;
      color: #4270e4;
      border: 2px solid #4270e4;
    }

  }

  & > .page-container {
    margin: 10px 0 0 0;
  }
  & > .foot-btn {
    margin: 10px 0 0 0;
    justify-content: flex-end;
  }
}
</style>