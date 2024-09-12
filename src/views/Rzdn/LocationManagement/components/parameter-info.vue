<template>
  <div class="parameter-info flex">
    <!-- 头部 -->
    <div class="head flex">
      <div class="left flex">
        <div class="title flex">
          <div class="block"></div>
          <span>参数信息</span>
        </div>
        <div class="basicbtn" @click="needPower('参数信息-批量编辑参数', batchCreateData)">批量编辑参数</div>
      </div>
      <div class="right">
        <div class="basicbtn-blue" @click="needPower('参数信息-首件测试', () => {firstArtifactsTestShow('show')})">首件测试</div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-table 
        :data="tableData" 
        :header-cell-style="{ background: '#5A6C98', color: '#FFFFFF' }"
        :row-class-name="({ row, rowIndex })=> rowIndex % 2 ? 'table-row-highlighted' : ''"
        :border="true"
        :max-height="$parent.tableMaxHeight"
        style="width: 100%;"
      >
        <el-table-column label="序号" align="center" width="50">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="ParameterName" label="参数名称"></el-table-column>
        <el-table-column prop="type" label="字段类型">
          <template slot-scope="scope">{{getFieldTypeText(scope.row)}}</template>
        </el-table-column>
        <el-table-column prop="VariableName" label="变量名称">
          <template slot-scope="scope">{{ getVariableNameText(scope.row) }}</template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 参数信息 -->
    <el-dialog
      title="参数信息"
      width="823px"
      class="parameter-dialog flex"
      :visible.sync="parameterDialog.show"
      :before-close="() => {parameterInfoCallback()}"
      append-to-body
      :close-on-click-modal="false"
    >
      <parameter-info-config 
        v-if="parameterDialog.contentShow" 
        :locationData="locationData" 
        @callback="parameterInfoCallback"
      ></parameter-info-config>
    </el-dialog>

    <!-- 首件测试 -->
    <el-dialog
      title="首件测试"
      width="600px"
      class="flex"
      :visible.sync="firstArtifactsTestDialog.show"
      :before-close="firstArtifactsTestClose"
      :close-on-click-modal="false"
    >
      <first-artifacts-test
        v-if="firstArtifactsTestDialog.contentShow"
        ref="firstArtifactsTestDOM"
        :locationData="locationData" 
        @callback="firstArtifactsTestShow('hide')"
      ></first-artifacts-test>
    </el-dialog>
  </div>
</template>
<script>
import { getOrderField, getOrderFieldsText, GetMaterialType } from '../index';
import ParameterInfoConfig from './parameter-info-config.vue';
import FirstArtifactsTest from './first-artifacts-test.vue';
import userMixins from "@/mixins/userMixins";
export default {
  components: {ParameterInfoConfig, FirstArtifactsTest},
  mixins: [userMixins],
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
      tableData: [],
      orderFieldList: [],
      parameterTypes: [],
      parameterDialog: {
        model: 'create', // create edit
        show: false,
        contentShow: false,
        form: {
          cutting: '',
          number: '',
          type: '',
        },
        rules: {
          cutting: [
            { required: true, message: '请输入工位名称', trigger: 'blur' },
          ],
          number: [
            { required: true, message: '请选择完工信号', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择工位类型', trigger: 'change' }
          ],
        },
      },
      
      firstArtifactsTestDialog: {
        show: false,
        contentShow: false,
      },
    };
  },
  methods: {
    // 获取参数列表
    async getLocationReport() {
      let materialTypeList = await GetMaterialType('');
      this.$api.locationManagement.getParameterReport(this.locationData.WorkStationId).then(ref => {
        const list = ref.data.data
        this.tableData = list.map(item => {
          if (item.Type == 3) {
            let materialType = materialTypeList.find(
                (_2) => item.VariableName == _2.ID
            );
            if (materialType) {
              item.VariableName = materialType.Name;
              item.VariableId = materialType.ID;
            }
          }
          return item
        });
        // console.log("参数列表", JSON.parse(JSON.stringify(list)));
      }, err => {
        console.log('失败回调', err);
      })
    },
    // 设置参数类型选择项
    setTypeOption() {
      this.$api.locationManagement.getParameterType(this.locationData.Type).then(ref => {
        const list = ref.data.data
        if (Object.prototype.toString.call(list) !== '[object Array]') {
          this.$message.error(list);
          return
        }
        this.parameterTypes = list
        // console.log("参数类型", JSON.parse(JSON.stringify(list)));
      }, err => {
        this.$message.error(err);
      })
    },
    // 获取字段类型文本
    getFieldTypeText(row) {
      let text = ''
      for (let i = 0, iLen = this.parameterTypes.length; i < iLen; i++) {
        const item = this.parameterTypes[i]
        if (row.Type === item.Item1) {
          text = item.Item2
          break
        }
      }
      return text
    },
    // 获取变量名称文本
    getVariableNameText(row) {
      return getOrderFieldsText(row, this.orderFieldList)
    },
    // 批量创建
    batchCreateData() {
      this.parameterDialog.show = true
      this.parameterDialog.contentShow = true
    },
    // 首件测试-显示/隐藏
    firstArtifactsTestShow(state){
      switch (state) {
        case 'show':
          this.firstArtifactsTestDialog.show = true
          this.firstArtifactsTestDialog.contentShow = true
          break;
        case 'hide':
          this.firstArtifactsTestDialog.show = false
          setTimeout(() => {
            this.firstArtifactsTestDialog.contentShow = false
          }, 500);
          break;
        default:
          break;
      }
    },
    // 首件测试-关闭
    firstArtifactsTestClose() {
      this.$refs.firstArtifactsTestDOM.validateChanges()
    },

    // 参数信息回调
    parameterInfoCallback(data) {
      // console.log(data);
      // if (data === 'success') this.getLocationReport()
      this.getLocationReport()
      this.parameterDialog.show = false
      setTimeout(() => {
        this.parameterDialog.contentShow = false
      }, 500);
    },
    async init() {
      if (!this.locationData) return
      await this.setTypeOption()
      this.orderFieldList = await getOrderField()
      await this.getLocationReport()
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
@import "../index.scss";
.parameter-info {
  width: 50%;
  height: 100%;
  padding: 0 0 0 10px;
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
    .el-table {
      overflow-y: auto;
    }
    .sort-btn {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #4270e4;
      }
    }
  }

  .parameter-dialog {
    .select-variable {
      width: 70px;
      height: 40px;
      padding: 0;
      line-height: 40px;
      border-radius: 0;
    }
    .myForm-foot {
      justify-content: flex-end;
      .el-button {
        width: 100px;
      }
    }
  }
  .parameter-dialog ::v-deep .el-input {
    border-radius: 0 !important
  }
  .parameter-dialog ::v-deep .el-input__inner {
    border-radius: 0 !important
  }
}
</style>
<style>
  .parameter-dialog {
      overflow: unset ;
  }
  </style>