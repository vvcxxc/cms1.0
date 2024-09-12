<template>
  <Dialog :visible="visible" width="780px" toBody customClass="common_dialog" :title="title" @open="open" @close="close"
    @ok="confirm">

    <div class="container">
      <Form labelWidth="110px" :formData="formData" :formItem="formItem" :rules="rules" ref="ruleForm"
        @selectChange="selectChange" @inputBlur="inputBlur">
        <!-- <template #toleranceValue="{ scope, data }" >
          <div class="diffPrepend">
            <el-select class="common_select" v-model="data.toleranceType" placeholder="请选择">
              <el-option
                v-for="item in scope.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template> -->
      </Form>
    </div>
  </Dialog>
</template>

<script>
import Form from '@/newComponents/Form.vue'
import Dialog from '@/newComponents/Dialog.vue'
import { GetProductModelInfo } from '@/api/rzdn/orderManage.js'

export default {
  components: { Form, Dialog },
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
      default: () => { }
    },
    productShowType: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      formItem: [],
      rules: {
        model: [
          { required: true, message: '请输入型号', trigger: 'blur' }
        ],
        k1: [
          { required: true, message: '请选择K配1', trigger: 'change' }
        ],
        k2: [
          { required: true, message: '请选择K配2', trigger: 'change' }
        ],
        c: [
          { required: true, message: '请选择C配', trigger: 'change' }
        ],
        length: [
          { required: true, message: '请输入长度', trigger: 'blur' }
        ],
        toleranceValue: [
          { required: true, message: '请输入公差', trigger: 'blur' }
        ],
        EndOfCableLength: [
          { required: true, message: '请输入线缆末端长度', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    open() {
      this.getDropData()
    },
    getDropData() {
      let $this = this;
      this.formItem = [];
      GetProductModelInfo().then(res => {
        if (res.data.IsSuccess) {
          if ($this.productShowType == '相线') {
            this.formItem = [
              {
                label: '显示框',
                prop: 'productType',
                span: 24,
                disabled: true,
                type: 'input'
              },
              {
                label: '型号',
                prop: 'model',
                span: 12,
                type: 'select',
                options: res.data.Data.Model.map(item => ({
                  label: item,
                  value: item
                }))
              },
              {
                label: '请选择K配1',
                prop: 'k1',
                span: 12,
                type: 'select',
                options: res.data.Data.K1.map(item => ({
                  label: item,
                  value: item
                }))
              },
              {
                label: '请选择K配2',
                prop: 'k2',
                span: 12,
                type: 'select',
                options: res.data.Data.K2.map(item => ({
                  label: item,
                  value: item
                }))
              },
              {
                label: '请选择C配',
                prop: 'c',
                span: 12,
                type: 'select',
                options: res.data.Data.C.map(item => ({
                  label: item,
                  value: item
                }))
              },
              {
                label: '长度',
                prop: 'length',
                span: 12,
                type: 'input',
              },
              {
                label: '公差mm',
                prop: 'toleranceValue',
                // slotName: 'prepend',
                // options: res.data.Data.Tolerance.map(item => ({
                //   label: item,
                //   value: item
                // }))
                span: 12,
                type: 'input',
              },
              {
                label: '线缆末端长度',
                prop: 'EndOfCableLength',
                span: 12,
                type: 'input',
              },
            ];


          } else {
            this.formItem = [
              {
                label: '显示框',
                prop: 'productType',
                span: 24,
                disabled: true,
                type: 'input'
              },
              {
                label: '型号',
                prop: 'model',
                span: 12,
                type: 'select',
                options: res.data.Data.Model.map(item => ({
                  label: item,
                  value: item
                }))
              },
              {
                label: '长度',
                prop: 'length',
                span: 12,
                type: 'input',
              },
              {
                label: '公差mm',
                prop: 'toleranceValue',
                // slotName: 'prepend',
                // options: res.data.Data.Tolerance.map(item => ({
                //   label: item,
                //   value: item
                // }))
                span: 12,
                type: 'input',
              },
              {
                label: '线缆末端长度',
                prop: 'EndOfCableLength',
                span: 12,
                type: 'input',
              }
            ];

          }

        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    inputBlur(value, data) {
      this.$emit('selectChange', value, data)
    },
    selectChange(value, data) {
      this.$emit('selectChange', value, data)
    },
    close() {
      this.$refs.ruleForm.$refs.form.resetFields()
      this.$emit('close')
    },
    isPositiveInteger(s) {
      //是否为正整数
      var re = /^[0-9]+$/;
      return re.test(s);
    },
    confirm() {

      let $this = this
      if (!this.isPositiveInteger($this.formData.length)) {
        this.confirm_Pop2(this, '长度请输入正整数')
        return
      }
      if (!this.isPositiveInteger($this.formData.toleranceValue)) {
        this.confirm_Pop2(this, '公差请输入正整数')
        return
      }
      if (!this.isPositiveInteger($this.formData.EndOfCableLength)) {
        this.confirm_Pop2(this, '线缆末端长度请输入正整数')
        return
      }
      this.$refs.ruleForm.$refs.form.validate((vaild) => {
        if (vaild) {
          $this.$emit('confirm', $this.formData)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 300px;
}

.diffPrepend {
  width: 110px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
</style>