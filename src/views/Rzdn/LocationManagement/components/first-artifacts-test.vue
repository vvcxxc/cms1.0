<template>
  <div class="first-artifacts-test flex">
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
        <el-table-column prop="Type" label="记录类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.Type">
              <el-option
                v-for="(item, i) in types" :key="i"
                :label="item.Item2" :value="item.Item1"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="名称">
          <template slot-scope="scope">
             <el-tooltip effect="dark" :content="scope.row.Name" placement="bottom">
              <el-input v-model="scope.row.Name" placeholder="请输入名称"></el-input>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot-btn flex">
      <el-button @click="submit('cancel')">取消</el-button>
      <el-button type="primary" @click="submit('confirm')">确认</el-button>
    </div>
  </div>
</template>
<script>
import { randomNumber, clearArray, dataIsChange } from '../index';
export default {
  props: {
    locationData: {
      type: Object,
      required: false,
      default: ()=> {
        return null
      }
    },
  },
  data() {
    return {
      oldData: [], // 旧数据用于验证
      tableData: [],
      types: [], // 记录类型
      selection: [], // 表格-复选框选择数据
    };
  },
  methods: {
    // 获取记录类型
    getFristArticleTesting() {
      this.$api.locationManagement.getFristArticleTesting().then(ref => {
        this.types = ref.data.data
        // console.log("记录类型", JSON.parse(JSON.stringify(ref.data.data)));
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 获取列表
    getList() {
      this.$api.locationManagement.getFristArticleTestingReport(this.locationData.WorkStationId).then(ref => {
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
        FristArticleTestingId: Number('-' + randomNumber()),
        Type: null,
        WorkStationId: this.locationData.WorkStationId,
        Name: ""
      })
    },
    // 删除参数信息
    async deleteData() {
      if (!this.selection.length) return
      const results = await new Promise((resolve, reject) => {
        this.confirm_Pop3(this, '是否删除', res => resolve(res))
      });
      if (results === 'cancel') return

      let onlineList = [] // 线上删除数组
      let localList = [] // 本地删除数组
      for (let i = 0, iLen = this.selection.length; i < iLen; i++) {
        const item = this.selection[i]
        if (item.FristArticleTestingId >= 0) {
          onlineList.push(item.FristArticleTestingId)
        } else {
          localList.push(item.FristArticleTestingId)
        }
      }

      this.tableData = clearArray(this.tableData, localList, 'FristArticleTestingId')
      
      if (!onlineList.length) return
      this.$api.locationManagement.delectFristArticleTesting(onlineList).then(ref => {
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
        this.tableData = clearArray(this.tableData, onlineList, 'FristArticleTestingId')
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 表格-复选框
    handleSelectionChange(row) {
      this.selection = row;
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
      if (model === 'cancel') {
        this.validateChanges()
        return
      }

      let msgText = ''
      for (let i = 0, iLen = this.tableData.length; i < iLen; i++) {
        const item = this.tableData[i]
        if (!item.Type) {
          msgText = `序号为${++i}，请选择记录类型`
          break
        }
        if (!item.Name) {
          msgText = `序号为${++i}，请输入名称`
          break
        }
      }
      if (msgText) {
        this.confirm_Pop2(this, msgText)
        return
      }

      this.$api.locationManagement.saveFristArticleTesting(this.tableData).then(ref => {
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
      // console.clear();
      // console.log("locationData", JSON.parse(JSON.stringify(this.locationData)));
      if (!this.locationData) return
      await this.getFristArticleTesting()
      await this.getList()
    }
  },
  watch: {
    "locationData": {
      immediate: true,
      handler: function(){
        this.init()
      }
    }
  },
};
</script>

<style lang='scss' scoped>
@import '../index.scss';

.first-artifacts-test {
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
  }
  .foot-btn {
    width: 100%;
    margin: 20px 0 0 0;
    justify-content: flex-end;
  }
}


</style>