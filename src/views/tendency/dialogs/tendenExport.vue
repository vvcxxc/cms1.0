<template>
    <el-dialog
      :title="title"
      :visible="visible"
      v-el-drag-dialog
      custom-class="common_dialog"
      append-to-body
      @close="close"
      width="460px"
      top="28vh"
    >
      <div class="wrap" >
        <div class="item" >
          <el-radio v-model="radioValue" :label="1">导出为PNG</el-radio>
          <el-radio v-model="radioValue" :label="2">导出为Excel</el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="d_footer_cancel" @click="close">{{lang.PushMessage_Cancel}}</el-button>
        <el-button class="d_footer_sure"  @click="confirm">{{lang.PopupCommon_Save}}</el-button>
      </span>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: 'InnerInteger',
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
        radioValue: 1
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      confirm () {
        this.$emit('confirm', this.radioValue)
      },
    }
  }
  </script>
  
<style lang='scss' scoped>
.item {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
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
</style>