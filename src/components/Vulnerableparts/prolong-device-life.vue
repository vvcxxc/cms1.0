<template>
  <div class="prolong-device-life flex">
    <div class="content">
      <!-- 头部 -->
      <div class="head flex">
        <div>延长器件寿命</div>
        <img :src="iconNo" class="cancel" @click.stop="submitForm('cancel')" />
      </div>

      <!-- 表单 -->
      <el-form :model="formData" :rules="rules" ref="myForm" label-width="100px" >
        <el-form-item label="延长时间" prop="argTime">
          <div class="flex">
            <el-input v-model="formData.argTime"></el-input>
            <el-select v-model="formData.argTimeUnit" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="argRemarks">
          <textarea v-model="formData.argRemarks" cols="30" rows="10" placeholder="对备注的说明备注"></textarea>
        </el-form-item>
      </el-form>

      <!-- 底部按钮 -->
      <div class="footer flex">
        <div class="btn btn-cancel" @click="submitForm('cancel')">取消</div>
        <div class="btn btn-confirm" @click="submitForm('confirm')">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editData: {
      type: Object,
      required: false,
      default: ()=> {
        return null
      }
    },
  },
  data() {
    return {
      iconNo: require('@/assets/images/no.png'),
      formData: {
        argPID: '',
        argTime: '',
        argTimeUnit: '',
        argRemarks: '',
        argEnableTime: '',
        argLoginUserName: '',
      },
      rules: {
        argTime: [{ required: true, message: '请输入延长时间', trigger: 'blur' }],
        argTimeUnit: [{ required: true, message: '请选择单位', trigger: 'change' }],
        argRemarks: [{ required: true, message: '请输入备注', trigger: 'blur' }],
      },
      options: [],
    }
  },
  methods: {
    // 提交表单
    submitForm(model) {
      if (model === 'cancel') {
        this.$emit("callback", 'cancel');
        return
      }
      this.$refs.myForm.validate((valid) => {
        if (!valid) return
        // 奇葩接口必须这样写才能调用
        this.$axios.post(
          `/api/VulnerablePartManage/VulnerablePartManage_Extend?argPID=${this.formData.argPID}&argTime=${this.formData.argTime}&argTimeUnit=${this.formData.argTimeUnit}&argEnableTime=${this.formData.argEnableTime}&argRemarks=${this.formData.argEnableTime}&argLoginUserName=${this.formData.argLoginUserName}`
        ).then(ref => {
          console.log('延长器件寿命-结果', ref);
          // if (ref.data.code === 1) {
          //   this.$message({
          //     message: ref.data.msg,
          //     type: 'warning'
          //   });
          //   return
          // }
          this.$emit("callback", 'success');
        }, err => {
          console.log('失败回调', err);
          this.$message({
            message: err,
            type: 'warning'
          });
        })
      });
    },
    // 设置下拉项
    setOptions() {
      if (this.editData.TimerType === '使用次数') {
        this.options = [
          { value: 5, label: '次' },
        ]
      } else {
        this.options = [
          { value: 1, label: '小时' },
          { value: 2, label: '天' },
          { value: 3, label: '月' },
          { value: 4, label: '年' },
        ]
      }
    },
    init() {
      if (!this.editData) return
      this.formData.argPID = this.editData.ID
      this.formData.argEnableTime = this.editData.EnableTime
      this.formData.argLoginUserName = this.editData.Executor
      this.setOptions()
    }
  },
  watch: {
    "editData": {
      immediate: true,
      handler: function(){
        this.init()
      }
    }
  },
};
</script>

<style lang='scss' scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.el-form {
  padding: 40px 80px 0 80px;
}
.prolong-device-life {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  & > .content {
    width: 600px;
    height: 450px;
    background: #EEEEEE;
    box-shadow: 0px 0px 8px black;
    & > .head {
      text-align: center;
      line-height: 60px;
      font-size: 18px;
      background-color: #386df0;
      position: relative;
      color: #ffffff;
      .cancel {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 20px;
        cursor: pointer;
      }
    }

    textarea {
      width: 100%;
      border: 1px solid #e0e0e0;
      padding: 5px;
    }


    & > .footer {
      justify-content: flex-end;
      padding: 0 80px 0 0;
      .btn {
        width: 100px;
        height: 36px;
        margin: 0 0 0 20px;
        line-height: 34px;
        text-align: center;
        color: #ffffff;
        border-radius: 3px;
        cursor: pointer;
      }
      .btn-cancel {
        background-color: #999999;
      }
      .btn-confirm {
        background-color: #386df0;
      }
    }
  }
}
</style>