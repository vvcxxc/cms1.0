<!--
这一版放弃的，新版是隔壁的select-variable2.vue
调用例子：
<select-variable 
  :list="[{Name: '$Date'}]" 
  :multiSelect="true"
  @callback="selectVariableCallback"
></select-variable>

// 选择变量回调
selectVariableCallback(data){
  console.log(data);
},

字段解释：
list: 已选数据
multiSelect: 是否多选
callback: 回调
-->
<template>
  <div class="select-variable">
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
      <el-button class="btn search" @click="getList()">查询</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      ref="myTable"
      :data="tableData"
      :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
      :row-class-name="({ row, rowIndex })=> rowIndex % 2 ? 'table-row-highlighted' : ''"
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

    <!-- 分页 -->
    <my-page 
      :pageData="pageData"
      @changePage="changePage"
    ></my-page>

    <!-- 底部按钮 -->
    <div class="foot-btn flex">
      <el-button @click="submit('cancel')">取消</el-button>
      <el-button type="primary" @click="submit('confirm')">确认</el-button>
    </div>
  </div>
</template>
<script>
import MyPage from '@/newComponents/Page.vue';
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
        return [
          {
            Name: ''
          }
        ]
      }
    },
  },
  data() {
    return {
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
      console.log(type, this.variableList);
      switch (type) {
        case 'cancel':
          this.$emit("callback", 'cancel');
          break;
        case 'confirm':
          this.$emit("callback", this.variableList);
          break;
        default:
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
      // console.clear()
      await this.getCondition()
      await this.getList()
    }
  },
  created() {
    setTimeout(() => {
      this.init()
    }, 1000);
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

::v-deep .table-row-highlighted {
  background: #eaedee;
}
// 隐藏全选按钮
::v-deep .el-table__header-wrapper .hidden-check-all .el-checkbox {
  display: none;
}

.el-button {
  min-width: 100px;
}

.select-variable {
  padding: 10px 20px;
  background: #e6e6e6;
  border: 1px solid #dcdcdc;
  & > .header {
    .item {
      padding: 10px;
      display: inline-block;
    }
    .search {
      height: 30px;
      padding: 0;
      width: 100px;
      color: #4270e4;
      border: 2px solid #4270e4;
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

  & > .page-container {
    margin: 10px 0 0 0;
  }
  & > .foot-btn {
    margin: 10px 0 0 0;
    justify-content: flex-end;
  }
}
</style>