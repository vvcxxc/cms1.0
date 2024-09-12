<!--
再次重写一版，之前写的调用不友好
调用例子：
<select-variable2
  :state="selectVariableConfig.state"
  :list="selectVariableConfig.list"
  :multiSelect="true"
  @callback="selectVariableCallback"
></select-variable2>

// 选择变量-显示
selectVariableShow() {
  this.selectVariableConfig.state = 'show'
},
// 选择变量-回调
selectVariableCallback(state, list) {
  if (state === 'confirm' && list.length) {
    this.selectVariableConfig.list = [{Name: list[0].Name}]
  }
  this.selectVariableConfig.state = 'hide'
},

字段解释：
list: 已选数据
multiSelect: 是否多选
callback: 回调
-->
<template>
<div>
  <el-dialog
    title="选择变量"
    width="1100px"
    class="select-variable-dialog flex"
    :visible.sync="dialogVisible"
    :before-close="() => {submit('cancel')}"
    append-to-body
  >
    <div class="select-variable-content">
    
      <!-- 头部 -->
      <div class="header">
        <div class="item">
          <span>设备：</span>
          <el-select class="select" v-model="form.argDevice" placeholder="请选择" @change="(item)=>{changeSelect('device', item)}">
            <el-option
              v-for="(item, i) in options.device" :key="i"
              :label="item.label"
              :value="item.value"
              
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>组名：</span>
          <el-select class="select" v-model="form.argGroup" placeholder="请选择" @change="(item)=>{changeSelect('group', item)}">
            <el-option
              v-for="item in options.group"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>数据类型：</span>
          <el-select class="select" v-model="form.argDataType" placeholder="请选择">
            <el-option
              v-for="item in options.dataTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <el-input class="select" v-model="form.argKeyWord"></el-input>
        </div>
        <!-- <div></div> -->
        <el-button class="btn search" @click="getList()">查询</el-button>
      </div>

      <!-- 表格 -->
      <!-- :row-class-name="({ row, rowIndex })=> rowIndex % 2 ? 'table-row-highlighted' : ''" -->
      <div class="my-table">
        <el-table
          ref="myTable"
          :data="tableData"
          :header-cell-style="{ background: '#E1EDFA', color: '#7697E5' }"
          
          tooltip-effect="dark"
          height="400px"
          :border="true"
          @select="selectTableRow"
        >
          <el-table-column type="selection" width="50" align="center"
          :class-name="multiSelect ? '' : 'hidden-check-all'"
          ></el-table-column>
          <el-table-column prop="Device" label="设备名"></el-table-column>
          <el-table-column prop="DateType" label="数据类型"></el-table-column>
          <el-table-column prop="Name" label="变量名"></el-table-column>
          <el-table-column prop="Descript" label="描述"></el-table-column>
          <el-table-column prop="Address" label="变量地址"></el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <my-page 
        :pageData="pageData"
        @changePage="changePage"
      ></my-page>
      
    </div>
    <!-- 底部按钮 -->
      <div class="foot-btn flex">
        <div class="btn cancel" @click="submit('cancel')">取消</div>
        <div class="btn confirm" @click="submit('confirm')">确认</div>
        <!-- <el-button @click="submit('cancel')">取消</el-button>
        <el-button type="primary" @click="submit('confirm')">确认</el-button> -->
      </div>
  </el-dialog>
</div>
</template>
<script>
import MyPage from '@/components/public/Page001.vue';
export default {
  components: { MyPage },
  props: {
    multiSelect: {
      type: Boolean,
      required: false,
      default: false
    },
    list: {
      type: Array,
      required: false,
      default: ()=> {
        return []
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
      options: {
        device: [], // 设备
        group: [], // 组
        dataTypes: [], // 数据类型
      },
      form: {
        argDevice: "",
        argGroup: "",
        argDataType: "",
        argKeyWord: "",
        argPageSize: 50,
        argPageIndex: 1
      },
      tableData: [],
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50,
      },
      variableCondition: [], // 变量条件
      variableList: []
    };
  },
  methods: {
    // 获取变量条件
    getCondition() {
      return this.$api.scms.getCondition().then(ref => {
        if (!ref.data.data.length) {
          console.log('暂无变量条件');
          return
        }
        this.variableCondition = ref.data.data
        // console.log("变量条件", JSON.parse(JSON.stringify(ref.data.data)));
        this.setDevice()
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 获取变量列表
    getList() {
      // console.log("下拉项", JSON.parse(JSON.stringify(this.options)));
      // console.log("搜索数据", JSON.parse(JSON.stringify(this.form)));
      let argDataType = []
      if (this.form.argDataType === '不限') {
        argDataType = this.form.argDataType
      } else {
        argDataType = [this.form.argDataType]
      }
      return this.$api.scms.getVariableList({...this.form, argDataType}).then(ref => {
        this.tableData = ref.data.data.DataList
        this.pageData = ref.data.data.ParameterList
        // console.log("变量列表", JSON.parse(JSON.stringify(this.tableData)));
        // console.log("分页", JSON.parse(JSON.stringify(this.pageData)));
        setTimeout(() => {
          this.setSelection()
        }, 500);
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 设置设备
    setDevice() {
      // console.log('设备', JSON.parse(JSON.stringify(this.variableCondition)));
      for (let i = 0, iLen = this.variableCondition.length; i < iLen; i++) {
        const item = this.variableCondition[i]
        this.options.device.push({ 
          label: item.DisplayDeviceName, 
          value: item.DeviceName
        })
      }
      if (this.variableCondition.length) this.form.argDevice = this.variableCondition[0].DeviceName
      this.setGroup()
    },
    // 设置组
    setGroup() {
      let group = []
      this.options.group = []
      this.options.dataTypes = []
      this.form.argGroup = ''
      this.form.argDataType = ''
      for (let i = 0, iLen = this.variableCondition.length; i < iLen; i++) {
        const item = this.variableCondition[i]
        if (item.DeviceName === this.form.argDevice) {
          group = item.Groups
          break
        }
      }
      for (let i = 0, iLen = group.length; i < iLen; i++) {
        const item = group[i]
        this.options.group.push({ 
          label: item.GroupName, 
          value: item.GroupName
        })
      }

      // console.log('组', JSON.parse(JSON.stringify(group)));
      if (group.length) this.form.argGroup = group[0].GroupName
      this.setDataType()
    },
    // 设置数据类型
    setDataType() {
      let group = []
      let dataTypes = []
      this.options.dataTypes = []
      this.form.argDataType = ''
      for (let i = 0, iLen = this.variableCondition.length; i < iLen; i++) {
        const item = this.variableCondition[i]
        if (item.DeviceName === this.form.argDevice) {
          group = item.Groups
          break
        }
      }

      for (let i = 0, iLen = group.length; i < iLen; i++) {
        const item = group[i]
        if (item.GroupName === this.form.argGroup) {
          dataTypes = item.DataTypes
          break
        }
      }

      for (let i = 0, iLen = dataTypes.length; i < iLen; i++) {
        const item = dataTypes[i]
        this.options.dataTypes.push({ 
          label: item.Text, 
          value: item.Value
        })
      }

      // console.log('数据类型', JSON.parse(JSON.stringify(dataTypes)));
      if (dataTypes.length) this.form.argDataType = dataTypes[0].Value
    },
    changeSelect(type, item) {
      // console.log(type, item);
      switch (type) {
        case 'device':
          this.setGroup()
          break;
        case 'group':
          this.setDataType()
          break;
        default:
          break;
      }
    },
    // 设置表格已选行
    setSelection() {
      for (let i = 0, iLen = this.list.length; i < iLen; i++) {
        const item = this.list[i]
        for (let n = 0, nLen = this.tableData.length; n < nLen; n++) {
          const element = this.tableData[n]
          if (item.Name === element.Name) {
            this.$refs.myTable.toggleRowSelection(element); // 选择指定行
            break
          }
        }
      }
    },

    selectTableRow(list, row) {
      // 多选
      if (this.multiSelect) {
        this.variableList = list
        return
      }
      // 单选
      this.$refs.myTable.clearSelection(); // 清空选择
      this.$refs.myTable.toggleRowSelection(row); // 选择指定行
      this.variableList = [row]
    },
    submit(type) {
      // console.log(type, this.variableList);
      switch (type) {
        case 'cancel':
          this.$emit("callback", 'cancel');
          break;
        case 'confirm':
          this.$emit("callback", 'confirm', this.variableList);
          break;
        default:
          this.$emit("callback", 'cancel');
          break;
      }
    },
    // 分页回调
    changePage(index) {
      // console.log("分页回调", index);
      this.pageData.PageIndex = index
      this.form.argPageIndex = index
      this.getList()
    },
    async init() {
      this.variableList = []
      await this.getCondition()
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

::v-deep .el-dialog {
  .el-dialog__header {
    padding: 20px 20px;
    text-align: center;
    background-color: #386DF0;
    .el-dialog__title {
      color: white;
    }
    .el-dialog__headerbtn {
      .el-dialog__close {
        font-size: 30px;
        color: white;
      }
    }
  }
  .el-dialog__body {
    padding: 30px 0 0 0;
    background-color: #EEEEEE;
  }
}

::v-deep .el-table {
  // .table-row-highlighted {
  //   background: #eaedee;
  // }
  .el-table__header-wrapper {
    .el-table__cell {
      border-right: 1px solid #D0D2D4;
      // color: #7697E5;
      // background-color: #E1EDFA;
    }
  }
  .el-table__body-wrapper {
    .el-table__cell {
      border-right: 0;
    }
  }
}

// 隐藏全选按钮
::v-deep .el-table__header-wrapper .hidden-check-all .el-checkbox {
  display: none;
}

.el-button {
  min-width: 100px;
}

.select-variable-content {
  margin: 0 50px 30px 50px;
  padding: 10px;
  background-color: #F4F4F4;
  border: 1px solid #CDCDCD;
  & > .header {
    .item {
      padding: 10px;
      display: inline-block;
    }
    .search {
      height: 30px;
      padding: 0;
      width: 100px;
      color: #6C8FE8;
      border: 2px solid #6C8FE8;
    }
    .select {
      width: 150px;
      ::v-deep .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
      ::v-deep .el-input__icon {
        line-height: 30px;
      }
    }
  }

  & > .my-table {
    padding: 10px;
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
  }

  & > .page-container {
    margin: 10px 0 0 0;
  }
}
.foot-btn {
  padding: 0 50px 10px 50px;
  justify-content: flex-end;
  .btn {
    width: 100px;
    height: 34px;
    margin: 0 0 0 20px;
    line-height: 34px;
    text-align: center;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  .cancel {
    background-color: #999999;
  }
  .confirm {
    background-color: #386DF0;
  }
}
</style>