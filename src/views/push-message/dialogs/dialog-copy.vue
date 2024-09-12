<template>
  <el-dialog
    :title="lang.PushMessage_CopyPushTask"
    :visible="visible"
    v-el-drag-dialog
    custom-class="common_dialog"
    @close="close"
    width="500px"
    top="24vh"
  >
    <div class="wrap" >
      <el-form :model="formData" label-width="90px" >
        <el-form-item :label="lang.PushMessage_PushGroup">
          <el-select class="common_select" v-model="formData.TargetGroupId">
             <el-option
              v-for="item in pushList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item :label="lang.PushMessage_TaskName">
          <el-input class="common_input"  v-model="formData.TaskName"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="d_footer_cancel" @click="close">{{lang.PushMessage_Cancel}}</el-button>
      <el-button class="d_footer_sure"  @click="confirm">{{lang.PopupCommon_Sure}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'dialogCopy',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {}
    },
    pushList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm', this.formData)
    },
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  margin-top: 30px;
}
</style>