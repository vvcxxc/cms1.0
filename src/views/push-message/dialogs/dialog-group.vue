<template>
  <el-dialog
    :title="title"
    :visible="visible"
    custom-class="common_dialog"
    @close="close"
    width="500px"
    top="24vh"
  >
    <div class="wrap" >
      <el-form :model="formData" label-width="80px" >
        <el-form-item label="分组名称">
          <el-input class="common_input" v-model="formData.Name"></el-input>
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
  name: 'dialogGroup',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {}
    }
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
      this.$emit('confirm', this.formData, this.title)
    },
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  margin-top: 30px;
}
</style>