<template>
    <el-dialog
      :title="title"
      :visible="visible"
      v-el-drag-dialog
      custom-class="common_dialog"
      append-to-body
      @close="close"
      width="460px"
      top="30vh"
    >
      <div class="wrap" >
        <div class="item" >
            <div class="item_label" ><!-- 布尔变量 -->{{lang.ProcessParameterConfigure_UnQualitiedReason_BooleanVariable}}</div>
            <div class="item_value">
                <el-input class="common_input table_header_input" disabled v-model="data.value" ></el-input>
            </div>
            <el-button class="btn_plain_add" @click="openVariable" ><!-- 选择 -->{{lang.ProcessParameterConfigure_UnQualitiedReason_Select}}</el-button>
        </div>
        <div class="reset" >
            <el-checkbox v-model="data.isChecked" label="是否复位" size="large" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="d_footer_cancel" @click="close">{{lang.PushMessage_Cancel}}</el-button>
        <el-button class="d_footer_sure"  @click="confirm">{{lang.PopupCommon_Save}}</el-button>
      </span>
      <select-variable
          :visible="variableShow"
          @close="selectVariableClose"
          @confirm="selectVariableConfirm" 
          appendToBody
          :type="2"
        ></select-variable>
    </el-dialog>
  </template>
  
  <script>
  import selectVariable from './select-variable.vue'
  
  export default {
    name: 'InnerBool',
    components: {
      selectVariable
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
        variableShow: false,
        data: {
          isChecked: false,
          value: ''
        }
      }
    },
    methods: {
      openVariable() {
        this.variableShow = true
      },
      selectVariableClose() {
        this.variableShow = false
      },
      selectVariableConfirm(rowData) {
        this.data.value = rowData.Name
        this.selectVariableClose()
      },
      close () {
        this.data = {
          isChecked: false,
          value: ''
        }
        this.$emit('close')
      },
      confirm () {
        this.$emit('confirm', this.data)
      },
    }
  }
  </script>
  
<style lang='scss' scoped>
::v-deep .table_header_input.el-input .el-input__inner {
    height: 30px;
    color: #000;
}
.btn_plain_add.el-button {
    background: #fff;
    border-color: #4a79ee;
    color: #4a79ee;
    padding: 7px 25px !important;
    margin-left: 10px;
}
.item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.item_label {
    width: 65px;
    color: #000;
}
.item_value {
    width: calc(100% - 65px - 90px);
}

.reset {
    padding-left: 65px;
    display: flex;
    align-items: center
}
::v-deep .reset {
    .el-checkbox__inner{
        background-color: #ffffff !important;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
        top: 9px;
        border: 1px solid green;
    }
    .el-checkbox__inner{
        width: 20px;
        height: 20px;
        background-color: #ffffff;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color: #ffffff;
    }
    
    .el-checkbox__inner::after{
        border: 2px solid green;
        border-top:none;
        height: 12px;
        width: 6px;
        border-left: none;
    }
} 
</style>