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
            <div class="item_label" ><!-- 识别值 -->{{lang.ProcessParameterConfigure_UnQualitiedReason_IdentificationValue}}</div>
            <div class="item_value">
                <el-input class="common_input" v-model="value" ></el-input>
            </div>
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
        value: '',
      }
    },
    methods: {
      close () {
        this.value = ''
        this.$emit('close')
      },
      confirm () {
        if(this.value == '') {
          this.confirm_Pop2(this, /* '请输入整型识别值!' */this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_PEIntegerIdentification)
          return
        }
        this.$emit('confirm', this.value)
      },
    }
  }
  </script>
  
<style lang='scss' scoped>
.item {
    display: flex;
    align-items: center;
}
.item_label {
    width: 60px;
}
.item_value {
    width: calc(100% - 60px);
}
</style>