<template>
  <el-dialog
      :title="title"
      :visible="visible"
      :appendToBody="appendToBody"
      v-el-drag-dialog
      custom-class="common_dialog"
      @open="openPop"
      @close="cancelVariable"
      width="1120px"
      top="10vh"
  >
    <div class="variable_wrap" >
      <div class="variable_header" >
        <div class="header_left" >
          <div class="select_item" >
            <div class="item_label" style="min-width: 50px" >{{lang.FormulaManage_AddProject_DeviceName}}</div>
            <div class="" >
              <el-select class="variable_select" @change="changeDevice" v-model="searchData.device" size="small" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose" >
                <el-option
                  v-for="item in deviceList"
                  :key="item.DeviceName"
                  :label="item.DeviceName"
                  :value="item.DeviceName"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="select_item" >
            <div class="item_label" style="min-width: 50px" >{{lang.FormulaManage_AddProject_VariableGroup}}</div>
            <div>
              <el-select class="variable_select" @change="changeGroup" v-model="searchData.group" size="small" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose" >
                <el-option
                  v-for="item in groupList"
                  :key="item.GroupName"
                  :label="item.GroupName"
                  :value="item.GroupName"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="select_item" >
            <div class="item_label" style="min-width: 60px" >{{lang.FormulaManage_AddProject_VariableType}}</div>
            <div>
              <el-select class="variable_select" @change="changeDataType" v-model="searchData.dataType" size="small" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose" >
                <el-option
                  v-for="item in dataTypeList"
                  :key="item.Value"
                  :label="item.Text"
                  :value="item.Value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="header_right">
          <div class="right_input" >
            <el-input :placeholder="lang.AlarmRecord_FaultAddAndModify_KeyWord" v-model="searchData.keyWord" size="small"></el-input>
          </div>
          <el-button class="btn_plain_add" @click="getTableData">{{lang.AlarmRecord_FaultRetrieva_Select}}</el-button>
        </div>
      </div>
      <div class="variable_table" >
        <el-table class="custom-table" 
          @row-click="tableRowClick"
          highlight-current-row
          :cell-style="{borderColor:'#E4E7ED'}"
          :header-cell-style="{ background: '#E1EDFA', color: '769de7' }"
          :data="tableData"
          border
          height="100%"
          header-cell-class-name="dialogHeaderCellClass"
        >
          <template slot="empty">
            <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
          </template>
          <el-table-column prop="Device" :label="lang.FormulaManage_AddProject_DataGrid_DeviceName" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="DateType" :label="lang.FormulaManage_AddProject_DataGrid_VariableType" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="Name" :label="lang.FormulaManage_AddProject_DataGrid_Name" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="Descript" :label="lang.FormulaManage_AddProject_DataGrid_Describe" :width="180*a11" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="Address" :label="lang.FormulaManage_AddProject_DataGrid_VariableAddress" :width="280*a11" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </div>
      <div class="variable_footer" >
        <my-page 
          :pageData="pageData"
          @changePage="changePage"
        ></my-page>
      </div>
    </div>
    <template #footer>
      <span class="d_footer">
        <el-button class="d_common_btn d_footer_cancel" @click="cancelVariable">{{lang.AlarmRecord_FaultAddAndModify_Cancel}}</el-button>
        <el-button class="d_common_btn d_footer_sure" @click="confirmVariable" >{{lang.AlarmRecord_FaultAddAndModify_Confirm}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import myPage from './Page.vue'

export default {
  name: 'SelectVariable',
  components: { myPage },
  props: {
      title: {
        type: String,
        default: '选择变量'
      },
      appendToBody: {
        type: Boolean,
        default: false
      },
      visible: {
        type: Boolean,
        default: false
      },
      // 1整型 2布尔型
      type: {
        type: Number,
        default: 1
      }
    },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      searchData: {
        device: '不限',
        group: '不限',
        dataType: '不限',
        keyWord: ''
      },
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50,
      },
      tableData: [],
      deviceList: [],
      groupList: [],
      dataTypeList: [],
      currentRow: null,
    }
  },
  methods: {
    openPop() {
      if(this.type === 1) {
        let postArr = ["有符号8位整型", "无符号8位整型", "有符号16位整型", "无符号16位整型", "有符号32位整型", "无符号32位整型", "有符号64位整型", "无符号64位整型"]
        this.getDropData(postArr)
      }
      if (this.type === 2) {
        let postArr = ["不限", "二进制变量"]
        this.getDropData(postArr)
      }
    },
    changeDevice() {
      this.searchData.group = '不限'
      this.searchData.dataType = '不限'
      this.getTableData()
    },
    changeGroup() {
      this.searchData.dataType = '不限'
      this.getTableData()
    },
    changeDataType() {
      let postData = {
        argDevice: this.searchData.device,
        argGroup: this.searchData.group,
        argDataType: [this.searchData.dataType],
        argKeyWord: this.searchData.keyWord,
        argPageSize: this.pageData.PageSize,
        argPageIndex: this.pageData.PageIndex
      }
      let $this = this
      this.$axios({
          method:'post',
          url:`/api/ProcessParameterConfigure/GstVariableList`,
          data: postData
      }).then(res => {
        $this.tableData = res.data.data.DataList
        $this.pageData.PageIndex = res.data.data.ParameterList.PageIndex
        $this.pageData.TotalCount = res.data.data.ParameterList.TotalCount
        $this.pageData.PageSize = res.data.data.ParameterList.PageSize
      })
    },
    tableRowClick(row) {
      this.currentRow = row
    },
    // handleSizeChange(val) {
    //   pageData.value.currentPage = val
    // },
    // handleCurrentChange(val) {
    //   pageData.value.currentPage = val
    // },
    // 分页回调
    changePage(index) {
      // console.log("分页回调", index);
      this.pageData.PageIndex = index
      this.form.argPageIndex = index
      this.getList()
    },
    cancelVariable() {
      this.currentRow = null
      this.searchData = {
        device: '不限',
        group: '不限',
        dataType: '不限',
        keyWord: ''
      }
      this.$emit('close')
    },
    confirmVariable() {
      this.$emit('confirm', this.currentRow)
    },
    getTableData() {
      let arr = this.dataTypeList.filter(f => f.Value !== '不限').map(item => item.Value)
      let postData = {
        argDevice: this.searchData.device,
        argGroup: this.searchData.group,
        argDataType: arr,
        argKeyWord: this.searchData.keyWord,
        argPageSize: this.pageData.PageSize,
        argPageIndex: this.pageData.PageIndex
      }
      let $this = this
      this.$axios({
          method:'post',
          url:`/api/ProcessParameterConfigure/GstVariableList`,
          data: postData
      }).then(res => {
        $this.tableData = res.data.data.DataList
        $this.pageData.PageIndex = res.data.data.ParameterList.PageIndex
        $this.pageData.TotalCount = res.data.data.ParameterList.TotalCount
        $this.pageData.PageSize = res.data.data.ParameterList.PageSize
      })
    },
    getDropData(arr) {
      let $this = this
      this.$axios({
        method:"post",
        url:"/api/ProcessParameterConfigure/GstCondition",
        data: arr
      }).then((res)=>{
        $this.deviceList =  res.data.data
        $this.groupList =  this.deviceList.filter(f => f.DeviceName === this.searchData.device)[0].Groups
        $this.dataTypeList = this.groupList.filter(f => f.GroupName === this.searchData.group)[0].DataTypes
        $this.getTableData()
      }).catch(function (error) {
        // console.log(error);
      })
    }
  },
}
</script>

<style lang='scss' scoped>
// ::v-deep .variable_select .el-input__inner {
  // height: 30px;
  // border: 1px solid red;
// }
.d_common_btn.el-button {
  padding: 10px 26px;
}
.btn_plain_add.el-button {
    background: #fff;
    border-color: #4a79ee;
    color: #4a79ee;
    padding: 7px 20px !important;
    margin-left: 10px;
}
.variable_wrap {
  height: 520px;
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
}

.variable_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 12px;
}

.variable_table {
  height: calc(100% - 42px - 50px);
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 20px 15px 15px 15px;
}

.variable_footer {
  height: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header_left {
  width: 60%;
  display: flex;
}

.header_right {
  width: 220px;
  display: flex;
  align-items: center;
}
.right_input {
  width: 130px;
}

.select_item {
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 200px;
}
// .select_item .item_label{
//   min-width: 70px;
// }

.select_item + .select_item {
  margin-left: 20px;
}

.variable_footer {
  height: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
</style>