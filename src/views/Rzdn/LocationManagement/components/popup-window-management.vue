<template>
  <div class="popup-window-management flex">
    <!-- 头部 -->
    <div class="head flex">
      <div class="basicbtn" @click="createData()">新增</div>
      <div class="basicbtn-gray-fill" @click="deleteData()">删除</div>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-table
        ref="myTable"
        :data="tableData"
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        :row-class-name="({ row, rowIndex }) =>rowIndex % 2 ? 'table-row-highlighted' : ''"
        :border="true"
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" align="center" width="50">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="Tootip" label="提示文本">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.Tootip" placement="bottom">
              <el-input v-model="scope.row.Tootip" placeholder="请输入提示文本"></el-input>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="Single" label="触发信号" width="200px">
          <template slot-scope="scope">
            <div class="variable flex">
              <span>{{ scope.row.Single }}</span>
              <div class="basicbtn-blue" @click="selectParameter(scope.$index, scope.row)">选择</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot-btn flex">
      <el-button @click="submit('cancel')">取消</el-button>
      <el-button type="primary" @click="submit('confirm')">确认</el-button>
    </div>

    <!-- 选择变量 -->
    <el-dialog
      title="选择变量"
      width="1100px"
      class="select-variable-dialog flex"
      :visible.sync="selectVariableDialog.show"
      :before-close="() => {this.selectVariableShow('hide')}"
      append-to-body
    >
      <select-variable 
        v-if="selectVariableDialog.contentShow" 
        :list="selectVariableDialog.list" 
        @callback="selectVariableCallback"
      ></select-variable>
    </el-dialog>
  </div>
</template>
<script>
import SelectVariable from '@/newComponents/select-variable.vue';
import { randomNumber, clearArray, dataIsChange } from '../index';
export default {
  components: { SelectVariable },
  data() {
    return {
      oldData: [], // 旧数据用于验证
      tableData: [],
      selectVariableDialog: {
        show: false,
        contentShow: false,
        list: []
      },
      currentIndex: null, // 表格-选择当前行下班
      selection: [], // 表格-复选框选择数据
      rules: {
        Tootip: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
        Type: [{ required: true, message: '请选择参数类型', trigger: 'change' }],
      },
    };
  },
  methods: {
    // 获取列表
    getList() {
      this.$api.locationManagement.getPopupManagement().then(ref => {
        const list = ref.data.data
        this.oldData = JSON.parse(JSON.stringify(list))
        this.tableData = list
        // console.log("获取列表", JSON.parse(JSON.stringify(list)));
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 新建
    createData() {
      this.tableData.push({
        ID: Number('-' + randomNumber()),
        Tootip: '',
        Single: ''
      })
    },
    // 删除参数信息
    async deleteData() {
      // console.clear();
      // console.log('删除', JSON.parse(JSON.stringify(this.selection)));
      if (!this.selection.length) return
      const results = await new Promise((resolve, reject) => {
        this.confirm_Pop3(this, '是否删除', res => resolve(res))
      });
      if (results === 'cancel') return

      let onlineList = [] // 线上删除数组
      let localList = [] // 本地删除数组
      for (let i = 0, iLen = this.selection.length; i < iLen; i++) {
        const item = this.selection[i]
        if (item.ID >= 0) {
          onlineList.push(item.ID)
        } else {
          localList.push(item.ID)
        }
      }

      this.tableData = clearArray(this.tableData, localList, 'ID')
      
      if (!onlineList.length) return
      this.$api.locationManagement.deletePopupManagement(onlineList).then(ref => {
        if (!ref.data.data) {
          this.$message({
            message: ref.data.msg,
            type: 'error'
          });
          return
        }
        this.$message({
          message: ref.data.data,
          type: 'success'
        });
        this.tableData = clearArray(this.tableData, onlineList, 'ID')
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 表格-复选框
    handleSelectionChange(row) {
      this.selection = row;
    },
    // 选择参数
    selectParameter(index, row) {
      // console.clear();
      // console.log(index, JSON.parse(JSON.stringify(row)));
      this.currentIndex = index
      this.selectVariableDialog.list = [{Name: row.Single}]
      this.selectVariableShow('show')
    },
    // 选择变量-显示/隐藏
    selectVariableShow(state){
      switch (state) {
        case 'show':
          this.selectVariableDialog.show = true
          this.selectVariableDialog.contentShow = true
          break;
        case 'hide':
          this.selectVariableDialog.show = false
          setTimeout(() => {
            this.selectVariableDialog.contentShow = false
          }, 500);
          break;
        default:
          break;
      }
    },
    // 选择变量回调
    selectVariableCallback(data){
      // console.log('选择变量回调', data);
      if (data === 'cancel') {
        this.selectVariableShow('hide')
        return
      }
      if (!data || !data.length) return
      this.tableData[this.currentIndex].Single = data[0].Name
      this.selectVariableShow('hide')
    },
    // 验证改动
    validateChanges() {
      // 确认弹窗
      const confirm = async () => {
        const results = await new Promise((resolve, reject) => {
          this.confirm_Pop3(this, '当前数据已修改是否保存', res => resolve(res))
        });
        switch (results) {
          case 'confirm':
            this.submit(results)
            break;
          case 'cancel':
            this.$emit('callback', null)
            break;
          default:
            break;
        }
      }
      if (dataIsChange(this.oldData, this.tableData)) {
        confirm()
      } else {
        this.$emit('callback', null)
      }
    },
    // 提交
    submit(model) {
      // console.clear();
      // console.log("提交", JSON.parse(JSON.stringify(this.tableData)));
      if (model === 'cancel' || !this.tableData.length) {
        this.validateChanges()
        return
      }

      let msgText = ''
      for (let i = 0, iLen = this.tableData.length; i < iLen; i++) {
        const item = this.tableData[i]
        let index = i
        const indexText = `序号为${++index}，`
        if (!item.Tootip) {
          msgText = `${indexText}请输入提示文本`
          break
        }
        if (!item.Single) {
          msgText = `${indexText}请选择触发信号`
          break
        }
      }
      if (msgText) {
        this.confirm_Pop2(this, msgText)
        return
      }
      this.$api.locationManagement.savePopupManagement(this.tableData).then(ref => {
        if (!ref.data.data) {
          this.$message({
            message: ref.data.msg,
            type: 'error'
          });
          return
        }
        this.$message({
          message: ref.data.data,
          type: 'success'
        });
        this.$emit('callback', 'success')
      }, err => {
        this.$message.error(err);
      })
    },
    async init() {
      await this.getList()
    }
  },
  mounted() {
    this.init()
  },
};
</script>

<style lang='scss' scoped>
@import '../index.scss';

.popup-window-management {
  width: 100%;
  height: 100%;
  flex-direction: column !important;
  ::v-deep .is-error {
    border-color: #f56c6c;
  }

  & > .head {
    width: 100%;
    height: 50px;
    padding: 0 0 10px 0;
    justify-content: flex-start;
    .basicbtn,
    .basicbtn-orange,
    .basicbtn-gray-fill {
        margin: 0 10px 0 0;
    }
    & > .left {
      height: 100%;
      & > .title {
          height: 100%;
          color: #4270e4;
          .block {
              width: 4px;
              height: 60%;
              margin: 0 4px 0 0;
              background: #4270e4;
          }
      }
    }
  }
  & > .table {
    width: 100%;
    // height: 100%;
    height: 500px;
    max-height: 500px;
    overflow-y: auto;
    .el-table {
      overflow-y: auto;
    }
    .variable {
      width: 100%;
      height: 100%;
      justify-content: space-between;
    }
  }
  .foot-btn {
    width: 100%;
    margin: 20px 0 0 0;
    justify-content: flex-end;
  }
}


</style>