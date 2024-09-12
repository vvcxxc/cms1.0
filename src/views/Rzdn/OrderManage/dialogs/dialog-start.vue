<template>
  <Dialog
    :visible="visible"
    width="640px"
    customClass="common_dialog"
    :title="title"
    @close="close"
    @ok="confirm"
  >
    <div class="container" >
      <Form
        :formData="formData"
        :formItem="formItem"
      />
    </div>
  </Dialog>
</template>

<script>
import Form from '@/newComponents/Form.vue'
import Dialog from '@/newComponents/Dialog.vue'

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
      default: () => {}
    },
  },
  data() {
    return {
      formItem: [
        {
          label: '产品型号',
          prop: 'productType',
          disabled: true,
          type: 'input'
        },
        {
          label: '操作员',
          prop: 'operator',
          span: 12,
          disabled: true,
          type: 'input'
        },
        {
          label: '班次',
          prop: 'classess',
          disabled: true,
          span: 12,
          type: 'input'
        },
        {
          label: '订单号',
          prop: 'orderId',
          disabled: true,
          span: 12,
          type: 'input'
        },
        // {
        //   label: '产品名称',
        //   prop: 'productName',
        //   disabled: true,
        //   span: 12,
        //   type: 'input'
        // },
        {
          label: '长度',
          prop: 'length',
          disabled: true,
          span: 12,
          type: 'input'
        },
        {
          label: '计划数量',
          prop: 'planCount',
          disabled: true,
          span: 12,
          type: 'input'
        },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm', this.formData)
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 260px;
  overflow: auto;
  // border: 1px solid #DDDDDD;
}
</style>