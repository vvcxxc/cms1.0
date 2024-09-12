<template>
  <Dialog
    :title="title"
    :visible="visible"
    width="500px"
    toBody
    customClass="common_dialog"
    @close="close"
    @ok="confirm"
    top="28vh"
  >
    <div class="wrap" >
      <Form
        ref="ruleForm"
        labelWidth="60px"
        :rules="rules"
        :formData="formData"
        :formItem="formItem"
      />
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Form from '@/newComponents/Form.vue'
import { Login_GstLoginIsSuccess } from '@/api/rzdn/common.js'

export default {
  components: { Dialog, Form },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '权限验证'
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      formData: {
        name: '',
        password: '',
      },
      formItem: [
        {
          type: 'input',
          label: '账号',
          prop: 'name'
        },
        {
          type: 'input',
          label: '密码',
          showPassword: true,
          prop: 'password'
        }
      ]
    }
  },
  methods: {
    confirm() {
      let $this = this
      this.$refs.ruleForm.$refs.form.validate((vaild) => {
        if (vaild) {
          Login_GstLoginIsSuccess($this.formData.name, $this.formData.password).then(res => {
            if (res.data.code === 0) {
              $this.message_Success($this, '验证成功！')
              $this.$emit('confirm')
            } else {
              $this.confirm_Pop2($this, res.data.msg)
            }
          })
        }
      })
    },
    close() {
      this.formData = {
        name: '',
        password: '',
      }
      this.$refs.ruleForm.$refs.form.clearValidate()
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 110px;
}

</style>