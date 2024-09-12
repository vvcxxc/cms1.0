<template>
  <div class="location-management flex">
    <!-- 头部 -->
    <div class="head flex">
      <div class="left flex">
        <div class="title flex">
          <div class="block"></div>
          <span>工位管理</span>
        </div>
        <div class="basicbtn" @click="needPower('工位管理-新建工位', () => {createLocation('create')})">新建工位</div>
        <div class="basicbtn-orange" @click="needPower('工位管理-修改', () => {createLocation('edit')})">修改</div>
        <div class="basicbtn-gray-fill" @click="needPower('工位管理-删除', delLocation)">删除</div>
      </div>
      <div class="right">
        <div class="basicbtn-blue" @click="needPower('工位管理-弹窗管理', () => {popupWindowManagementShow('show')})">弹窗管理</div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-table 
        ref="myTable"
        :data="tableData" 
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        :row-class-name="({ row, rowIndex })=> rowIndex % 2 ? 'table-row-highlighted' : ''"
        highlight-current-row
        :border="true"
        style="width: 100%"
        :max-height="$parent.tableMaxHeight"
        @current-change="handleCurrentChange"
      >
        <el-table-column label="操作" align="center" width="50">
          <template slot-scope="scope">
            <i class="sort-btn warning el-icon-top" @click="rowSort(scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column label="序号" align="center" width="50">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="WorkStationName" label="工位名称"></el-table-column>
        <el-table-column prop="OKSignal" label="完工信号"></el-table-column>
        <el-table-column prop="Type" label="工位类型">
          <template slot-scope="scope">
            <span v-if="scope.row.Type === 1">生产工位</span>
            <span v-if="scope.row.Type === 2">成品工位</span>
            <span v-if="scope.row.Type === 3">检测工位</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新建/修改工位 -->
    <el-dialog
      :title="locationDialog.model === 'create' ? '新建工位' : '修改工位'"
      width="400px"
      class="flex"
      :visible.sync="locationDialog.show"
      :before-close="() => {locationDialog.show = false}"
      append-to-body
      :close-on-click-modal="false"
      @close="closeLocationDialog"
    >
      <create-location
        ref="createLocationDOM"
        :editData="editData"
        @callback="createLocationCallback"
      ></create-location>
    </el-dialog>


    <!-- 弹窗管理 -->
    <el-dialog
      title="弹窗管理"
      width="600px"
      class="flex"
      :visible.sync="popupWindowManagementDialog.show"
      :before-close="popupWindowManagementClose"
      append-to-body
      :close-on-click-modal="false"
    >
      <popup-window-management 
        ref="popupWindowManagementDOM"
        v-if="popupWindowManagementDialog.contentShow"
        @callback="popupWindowManagementShow('hide')"
      ></popup-window-management>
    </el-dialog>
  </div>
</template>
<script>
import CreateLocation from './create-location.vue'
import PopupWindowManagement from './popup-window-management.vue'
import userMixins from "@/mixins/userMixins";
export default {
  components: {CreateLocation, PopupWindowManagement},
  mixins: [userMixins],
  data() {
    return {
      tableData: [],
      locationDialog: {
        model: 'create', // create edit
        show: false,
      },
      popupWindowManagementDialog: {
        show: false,
        contentShow: false,
      },
      currentRow: null,
      editData: null,
    };
  },
  methods: {
    // 获取工位列表
    getLocationReport() {
      this.$api.locationManagement.getLocationReportNoId().then(ref => {
        const list = ref.data.data
        // console.log("工位列表", JSON.parse(JSON.stringify(list)));
        this.tableData = list
        this.currentRow = null
        if (list.length) this.$refs.myTable.setCurrentRow(list[0]);
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 工位排序
    rowSort(row) {
      this.$api.locationManagement.sortLocation(row.WorkStationId).then(ref => {
        this.getLocationReport()
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 新建/修改工位
    createLocation(model) {
      this.locationDialog.model = model
      if (model === "edit") {
        if (!this.currentRow) {
          this.$message({
            message: '请选择一行',
            type: 'warning'
          });
          return
        }
        this.editData = {
          WorkStationId: this.currentRow.WorkStationId,
          WorkStationName: this.currentRow.WorkStationName,
          OKSignal: this.currentRow.OKSignal,
          Type: this.currentRow.Type,
          StatusSignal: this.currentRow.StatusSignal,
          SwitchingSignal: this.currentRow.SwitchingSignal,
          SCMSUserID: this.currentRow.SCMSUserID,
          SCMSUserIDArray: this.currentRow.SCMSUserIDArray,
          SCMSUserName: this.currentRow.SCMSUserName
        }
      } else {
        this.editData = null
      }
      this.locationDialog.show = true
      this.$nextTick(() => {
        if (this.$refs.createLocationDOM) this.$refs.createLocationDOM.init()
      })
    },
    // 新建/修改工位回调
    createLocationCallback(data){
      this.$refs.createLocationDOM.deviceTimes = 0
      this.$refs.createLocationDOM.processTimes = 0
      this.locationDialog.show = false
      if (data === 'success') this.getLocationReport()
    },
    // 弹窗管理-显示/隐藏
    popupWindowManagementShow(state){
      switch (state) {
        case 'show':
          this.popupWindowManagementDialog.show = true
          this.popupWindowManagementDialog.contentShow = true
          break;
        case 'hide':
          this.popupWindowManagementDialog.show = false
          setTimeout(() => {
            this.popupWindowManagementDialog.contentShow = false
          }, 500);
          break;
        default:
          break;
      }
    },
    // 弹窗管理-关闭
    popupWindowManagementClose() {
      this.$refs.popupWindowManagementDOM.validateChanges()
    },
    
    // 删除工位
    async delLocation() {
      if (!this.currentRow) return
      const results = await new Promise((resolve, reject) => {
        this.confirm_Pop3(this, '是否删除', res => resolve(res))
      });
      if (results === 'cancel') return
      this.$api.locationManagement.deleteLocation(this.currentRow.WorkStationId).then(ref => {
        this.$message({
          message: ref.data.data,
          type: 'success'
        });
        this.getLocationReport()
      }, err => {
        console.log('失败回调', err);
      })
    },
    handleCurrentChange(data) {
      // console.log('选择行', data);
      this.currentRow = data
      this.$emit('current-change', data)
    },
    init() {
      this.getLocationReport()
    },
    closeLocationDialog() {
      this.$refs.createLocationDOM.cancelForm()
    }
  },
  mounted() {
    this.init()
  },
};
</script>

<style lang='scss' scoped>
@import "../index.scss";
.location-management {
  width: 50%;
  height: 100%;
  padding: 0 10px 0 0;
  flex-direction : column !important;
  & > .head {
    width: 100%;
    height: 50px;
    padding: 0 0 10px 0;
    justify-content: space-between;

    .basicbtn, .basicbtn-orange, .basicbtn-gray-fill {
      margin: 0 0 0 10px;
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
  .table {
    width: 100%;
    height: calc(100% - 50px);
    .sort-btn {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #4270e4;
      }
    }
  }
}
</style>