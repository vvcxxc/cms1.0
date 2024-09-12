<template>
    <el-dialog
      :title="title"
      :visible="visible"
      v-el-drag-dialog
      custom-class="common_dialog"
      @open="openPop"
      @close="close"
      width="800px"
      top="22vh"
    >
      <div class="wrap" >
        <div class="wrap_header" >
            <div>
                <el-radio v-model="curveData.radioValue" @change="changeRadio" :label="1">{{lang.ProcessParameterConfigure_UnQualitiedReason_Integer}}</el-radio>
                <el-radio v-model="curveData.radioValue" @change="changeRadio" :label="2">{{lang.ProcessParameterConfigure_UnQualitiedReason_Boolean}}</el-radio>
            </div>
            <div>
                <el-button class="common_button_plain_green" @click="addVariable"><!-- 新建 -->{{lang.ProcessParameterConfigure_UnQualitiedReason_New}}</el-button>
                <el-button class="common_button_plain_yellow" @click="updVariable" ><!-- 修改 -->{{lang.ProcessParameterConfigure_UnQualitiedReason_Modify}}</el-button>
                <el-button class="common_button_remove" @click="delVariable"><!-- 删除 -->{{lang.ProcessParameterConfigure_UnQualitiedReason_Delete}}</el-button>
            </div>
        </div>
        <div class="wrap_table" v-if="curveData.radioValue === 1" >
            <div class="wrap_table_header" >
                <span><!-- 整型变量 -->{{lang.ProcessParameterConfigure_UnQualitiedReason_IntegerVariable}}</span>
                <div class="common_input table_header_input" >
                   <el-input disabled v-model="curveData.integer.variable" />
                </div>
                <el-button class="btn_plain_add" @click="chooseVariable"><!-- 选择 -->{{lang.ProcessParameterConfigure_UnQualitiedReason_Select}}</el-button>
            </div>
            <div class="wrap_table_inner" >
                <el-table
                  :data="curveData.integer.integerTableData"
                  @row-click="rowClick"
                  highlight-current-row
                  border
                  height="100%"
                  :header-cell-style="{ background: '#DCF0F9', color: '#4270E4' }"
                >
                <el-table-column type="index" :label="/* 序号 */lang.NewTrendChart_SingleChartUC_No" width="110" />
                <el-table-column prop="idenValue" :label="/* 识别值 */lang.ProcessParameterConfigure_UnQualitiedReason_IdentificationValue" />
                </el-table>
            </div>
        </div>

        <div class="wrap_table" v-if="curveData.radioValue === 2" >
            <div class="wrap_table_inner inner_bool" >
                <el-table
                  :data="curveData.bool.boolTableData"
                  @row-click="rowClick"
                  highlight-current-row
                  border
                  height="100%"
                  :header-cell-style="{ background: '#DCF0F9', color: '#4270E4' }"
                >
                <el-table-column type="index" :label="/* 序号 */lang.NewTrendChart_SingleChartUC_No" width="110" />
                <el-table-column prop="boolValue" :label="/* 布尔变量 */lang.ProcessParameterConfigure_UnQualitiedReason_BooleanVariable" />
                <el-table-column prop="autoResetName" :label="/* 自动复位 */lang.ProcessParameterConfigure_UnQualitiedReason_AutomaticReset" />
                </el-table>
            </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="d_footer_cancel" @click="close">{{lang.PushMessage_Cancel}}</el-button>
        <el-button class="d_footer_sure"  @click="confirm">{{lang.PopupCommon_Save}}</el-button>
      </span>

        <!-- 整型弹窗 -->
        <inner-integer
            :visible="integerShow" ref="integer" :title="integerTitle" @close="innerIntegerClose" @confirm="innerIntegerConfirm" 
        />
        <!-- 布尔型弹窗 -->
        <inner-bool
            :visible="boolShow" ref="bool" :title="boolTitle" @close="innerBoolClose" @confirm="innerBoolConfirm" 
        />
        <!-- 选择变量弹窗 -->
        <select-variable
          :visible="variableShow"
          @close="selectVariableClose"
          @confirm="selectVariableConfirm" 
          appendToBody
          :type="curveData.radioValue"
        ></select-variable>
    </el-dialog>
  </template>
  
  <script>
  import innerInteger from './innerInteger.vue'
  import innerBool from './innerBool.vue'
  import selectVariable from './select-variable.vue'

  export default {
    name: 'ClearCurve',
    components: { innerInteger, innerBool, selectVariable },
    props: {
      title: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      },
      grouId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
        curveData: {
          radioValue: 1,
          integer: {
            variable: '',
            integerTableData: [],
          },
          bool: {
            boolTableData: []
          },
        },
        integerTitle: '',
        boolTitle: '',
        integerShow: false,
        boolShow: false,
        variableShow: false,
        currentRow: null
      }
    },
    methods: {
      openPop() {
        this.getData()
      },
      getData() {
        this.$axios({
          method:'post',
          url:`/api/NewTrendChart/QueryClearCurveSetting?argGroupId=${this.grouId}`,
        }).then(res => {
          this.curveData.radioValue = res.data.data.ClearSettingType
          this.curveData.integer.variable = res.data.data.IntTypeTagName
          this.curveData.integer.integerTableData = res.data.data.IntList.map(item => ({
            id: item.Id,
            gID: item.GID,
            idenValue: item.Value,
            customId: this.getUuid()
          }))
          this.curveData.bool.boolTableData = res.data.data.BoolList.map(item => ({
            Id: item.Id,
            GID: item.GID,
            boolValue: item.TagName,
            autoReset: item.IsReset,
            autoResetName: item.IsReset? '是' : '否',
            customId: this.getUuid()
          }))
        })
      },
      changeRadio() {
        this.currentRow = null
      },
      rowClick(row) {
        this.currentRow = row
      },
      chooseVariable() {
        this.variableShow = true
      },
      addVariable() {
        if(this.curveData.radioValue === 1) {
            // 打开整型弹窗
            this.integerTitle = this.lang.NewTrendChart_ClearCurveSetting_NewIntegerTitle
            this.integerShow = true
        }
        if(this.curveData.radioValue === 2) {
            // 打开布尔型弹窗
            this.boolTitle = this.lang.NewTrendChart_ClearCurveSetting_NewBoolTitle
            this.boolShow = true
        }
      },
      updVariable() {
        if(this.currentRow === null) {
          this.confirm_Pop2(this, '请选择一种曲线设置')
          return
        }
        if(this.curveData.radioValue === 1) {
          this.integerTitle = this.lang.NewTrendChart_ClearCurveSetting_ModifyIntegerTitle
          this.integerShow = true
          this.$refs.integer.value = this.currentRow.idenValue
        }
        if(this.curveData.radioValue === 2) {
          this.boolTitle = this.lang.NewTrendChart_ClearCurveSetting_ModifyBoolTitle
          this.boolShow = true
          this.$refs.bool.data.isChecked = this.currentRow.autoReset
          this.$refs.bool.data.value = this.currentRow.boolValue
        }
      },
      delVariable() {
        if(this.currentRow === null) {
          this.confirm_Pop2(this, '请选择一种曲线设置')
          return
        }
        if(this.curveData.radioValue === 1) {
          this.curveData.integer.integerTableData = this.curveData.integer.integerTableData.filter(f => f.customId !== this.currentRow.customId)
        }
        if(this.curveData.radioValue === 2) { 
          this.curveData.bool.boolTableData = this.curveData.bool.boolTableData.filter(f => f.customId !== this.currentRow.customId)
        }
        this.currentRow = null
      },
      innerIntegerClose() {
        this.integerShow = false
      },
      innerIntegerConfirm(data) {
        if(this.integerTitle === this.lang.NewTrendChart_ClearCurveSetting_NewIntegerTitle) {
          // 新增
          this.curveData.integer.integerTableData.push({
            id: null,
            customId: this.getUuid(),
            idenValue: data
          })
        } else {
          // 修改
          let index = this.curveData.integer.integerTableData.findIndex(f => f.customId === this.currentRow.customId)
          this.curveData.integer.integerTableData[index].idenValue = data
        }
        this.innerIntegerClose()
      },
      innerBoolClose() {
        this.boolShow = false
      },
      innerBoolConfirm(data) {
        if(this.boolTitle === this.lang.NewTrendChart_ClearCurveSetting_NewBoolTitle) {
          // 新增
          this.curveData.bool.boolTableData.push({
            id: null,
            boolValue: data.value,
            customId: this.getUuid(),
            autoReset: data.isChecked,
            autoResetName: data.isChecked ? '是' : '否'
          })
        } else {
          let index = this.curveData.bool.boolTableData.findIndex(f => f.customId === this.currentRow.customId)
          this.curveData.bool.boolTableData[index].boolValue =  data.value,
          this.curveData.bool.boolTableData[index].autoReset = data.isChecked,
          this.curveData.bool.boolTableData[index].autoResetName = data.isChecked ? '是' : '否'
        }
        this.innerBoolClose()
      },
      selectVariableClose() {
        this.variableShow = false
      },
      selectVariableConfirm(rowData) {
        this.curveData.integer.variable = rowData.Name
        this.selectVariableClose()
      },
      close () {
        this.currentRow = null
        this.curveData = {
          radioValue: 1,
          integer: {
            variable: '',
            integerTableData: [],
          },
          bool: {
            boolTableData: []
          },
        }
        this.$emit('close')
      },
      confirm () {
        let postData = {}
        let IntList = this.curveData.integer.integerTableData.map(item => ({
          id: item.id,
          GID: this.grouId,
          Value: item.idenValue
        }))
        let BoolList = this.curveData.bool.boolTableData.map(item => ({ 
          Id: item.Id,
          GID: this.grouId,
          TagName: item.boolValue,
          IsReset: item.autoReset,
        }))
        if(this.curveData.radioValue === 1) {
          // 新增
          postData = {
            GID: this.grouId,
            ClearSettingType: this.curveData.radioValue,
            IntTypeTagName: this.curveData.integer.variable,
            IntList/* : this.curveData.integer.integerTableData */,
            BoolList/* : this.curveData.bool.boolTableData */
          }
          let $this = this
          this.$axios({
            method:'post',
            url:`/api/NewTrendChart/EditClearCurveSetting`,
            data: postData
          }).then(res => {
            if(res.data.code === 0) {
              $this.confirm_Pop2($this, $this.lang.NewTrendChart_ChartSettingViewModel_SaveSuccess)
              $this.$emit('confirm', postData)
            } else {
              $this.confirm_Pop2($this, res.data.msg)
            }
          })
        }
        if(this.curveData.radioValue === 2) {
          // 修改
          postData = {
            GID: this.grouId,
            ClearSettingType: this.curveData.radioValue,
            IntTypeTagName: this.curveData.integer.variable,
            IntList/* : this.curveData.integer.integerTableData */,
            BoolList/* : this.curveData.bool.boolTableData */
          }
          let $this = this
          this.$axios({
            method:'post',
            url:`/api/NewTrendChart/EditClearCurveSetting`,
            data: postData
          }).then(res => {
            if(res.data.code === 0) {
              $this.confirm_Pop2($this, $this.lang.NewTrendChart_ChartSettingViewModel_SaveSuccess)
              $this.$emit('confirm', postData)
            } else {
              $this.confirm_Pop2($this, res.data.msg)
            }
          })
        }
      },
      /* 设置自定义id */
      getUuid(randomLength = 3) {
        return Number(Math.random().toString().substr(2,randomLength) + Date.now()).toString(36)
      }
    }
  }
  </script>
  
  <style lang='scss' scoped>
.btn_plain_add.el-button {
    background: #fff;
    border-color: #4a79ee;
    color: #4a79ee;
    padding: 7px 35px !important;
}
.dialog-footer .el-button{
    padding: 8px 30px !important;
}

.wrap_header .el-button{
    padding: 7px 35px !important;
}
::v-deep .el-dialog__body .el-radio__inner  {
    background-color: #FFF !important;
}

::v-deep .el-dialog__body .el-radio__input.is-checked .el-radio__inner {
    border-color: #409EFF !important;
}
::v-deep .el-dialog__body .el-radio__inner::after {
    background-color: #23B800 !important;
    width: 6px !important;
    height: 6px !important;
}

::v-deep .el-dialog__body .el-radio__label {
    font-size: 16px !important;
    color: #000 !important;
}

.wrap {
    width: 100%;
    height: 380px;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 20px;
}
.wrap_header {
    height: 40px;
    align-items: center;
    justify-content: space-between;
    display: flex;
}

.wrap_table {
    margin-top: 5px;
    height: calc(100% - 40px);
}
.wrap_table_header {
    height: 40px;
    display: flex;
    align-items: center;
}

.table_header_input {
    width: 160px;
    margin: 0 10px;
}
 
::v-deep .table_header_input .el-input .el-input__inner {
    height: 30px;
    color: #000;
    border: 1px solid #d1d1d1;
}

.wrap_table_inner {
    margin-top: 5px;
    height: calc(100% - 40px - 10px);
    border: 1px solid #ccc;
}
.inner_bool {
    height: calc(100% - 5px);
}
</style>