<template>
  <div class="my-create">
    <el-dialog
      title="创建"
      :visible.sync="dialogShow"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="()=>{onSubmit('cancel')}"
    >
      <div class="dialog-content">
        内容
      </div>
      <template #footer>
        <el-button @click="onSubmit('cancel')">取消</el-button>
        <el-button type="primary"  @click="onSubmit('confirm')">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  data() {
    return {
      dialogShow: false,
    };
  },
  watch: {
    "dialogVisible": {
      handler: function(val) {
        console.log('dialogVisible.改变');
        if (val) this.init();
      }
    }
  },
  methods: {
    onSubmit(state) {
      console.log('onSubmit');
      if (state === 'cancel') {
        this.dialogShow = false
        this.$emit('callback', state)
        return
      }

      this.dialogShow = false
      this.$emit('callback', state)
    },
    init() {
      this.dialogShow = true
      console.log('初始化');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../index.scss";

::v-deep .el-dialog {
  width: 80%;
  height: 80%;
}

.my-create {
  // ::v-deep .el-dialog {
  //   .el-dialog__header {
  //     background-color: #3F81FF;
  //     .el-dialog__title {
  //       color: white;
  //     }
  //   }
  // }
}

</style>
