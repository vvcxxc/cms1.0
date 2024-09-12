<template>
  <el-dialog
    title="推送复制内容"
    :visible="visible"
    custom-class="common_dialog"
    @close="close"
    width="500px"
    top="24vh"
  >
    <div class="wrap" >
      <el-form :model="formData" label-width="80px" >
        <el-form-item label="推送分组">
          <el-select class="common_select" v-model="formData.TargetGroupId">
             <el-option
              v-for="item in pushList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="任务名称">
          <el-input class="common_input"  v-model="formData.TaskName"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="d_footer_cancel" @click="close">取消</el-button>
      <el-button class="d_footer_sure"  @click="confirm">确定</el-button>
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
      group: '',
      name: ''
    },
    pushList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
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