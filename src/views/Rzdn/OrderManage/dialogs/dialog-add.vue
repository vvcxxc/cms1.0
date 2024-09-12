<template>
  <Dialog :visible="visible" width="780px" customClass="common_dialog" :title="title" @open="open" @close="close"
    @ok="confirm">

    <div class="container">
      <Form labelWidth="120px" :formData="formData" :formItem="formItem" @clearProdType="clearProdType">
        <template #productType="{ scope }">
          <div @click="productSelect(scope)" class="append">选择</div>
        </template>
        <template #formularId="{ scope }">
          <div @click="repiceSelect(scope)" class="append">选择</div>
        </template>
      </Form>
    </div>
    <!-- 产品型号 -->
    <product-dialog title="产品型号" :productShowType="productShowType" :visible="productShow" :formData="productFormData"
      @selectChange="changeShowValue" @inputBlur="changeShowValue" @close="productClose" @confirm="productConfirm" />
    <!-- 配方管理 -->
    <recipe-dialog title="配方管理" :visible="recipeShow" :formularId="formData.formularId" @close="repiceClose"
      @confirm="repiceConfirm" />
  </Dialog>
</template>

<script>
import Form from '@/newComponents/Form.vue'
import Dialog from '@/newComponents/Dialog.vue'
import productDialog from './dialog-product.vue'
import recipeDialog from './dialog-recipe.vue'
import { GetProductModelInfo } from '@/api/rzdn/orderManage.js'

export default {
  components: { Form, Dialog, productDialog, recipeDialog },
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
  },
  data() {
    return {
      productFormData: {
        productType: '',
        model: '',
        k1: "",
        k2: "",
        c: "",
        length: "",
        toleranceType: '',
        toleranceValue: '',
        EndOfCableLength: '',
      },
      formItem: [
        {
          label: '订单号',
          prop: 'orderId',
          span: 12,
          type: 'input'
        },
        {
          label: '配方',
          prop: 'formularId',
          disabled: true,
          slotName: 'append',
          span: 12,
          type: 'input'
        },
        // 添加的字段
        {
          label: '线缆类型',
          prop: 'CableType',
          span: 12,
          type: 'select',
          options: []
        },
        {
          label: '产品型号',
          prop: 'productType',
          disabled: true,
          slotName: 'append',
          span: 12,
          type: 'input'
        },

        {
          label: '接头类型',
          prop: 'JointType',
          span: 12,
          type: 'select',
          options: []
        },
        {
          label: '计划数量',
          prop: 'planCount',
          span: 12,
          type: 'input'
        },
        {
          label: '计划开工时间',
          prop: 'planStartTime',
          defaultTime: '00:00:00',
          span: 12,
          type: 'date-time'
        },
        {
          label: '计划完工时间',
          prop: 'planEndTime',
          defaultTime: '23:59:59',
          span: 12,
          type: 'date-time'
        },

      ],
      /* 弹窗 */
      productShow: false,
      productShowType: '',
      recipeShow: false,

    }
  },
  methods: {
    open() {
      this.productFormData.productType = this.formData.productType
      this.getDropData()
    },
    getDropData() {
      let $this = this
      GetProductModelInfo().then(res => {
        if (res.data.IsSuccess) {
          // 型号下拉
          // $this.formItem[1].options = res.data.Data.ProductName.map(item => ({
          //   label: item,
          //   value: item
          // }))
          // 线缆类型
          $this.formItem[2].options = res.data.Data.CableType.map(item => ({
            label: item.Name,
            value: item.Name
          }))
          // 接头类型
          $this.formItem[4].options = res.data.Data.JointType.map(item => ({
            label: item.Name,
            value: item.Name
          }))
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    productSelect(data) {
      if (!this.formData.CableType) {
        this.confirm_Pop2(this, '请选择线缆类型')
        return
      }
      this.productFormData = {
        productType: this.formData.productType,
        model: this.formData.model,
        k1: this.formData.k1,
        k2: this.formData.k2,
        c: this.formData.c,
        length: this.formData.length,
        toleranceType: this.formData.toleranceType ? this.formData.toleranceType : '',
        toleranceValue: this.formData.toleranceValue,
        EndOfCableLength: this.formData.EndOfCableLength ? this.formData.EndOfCableLength : '',
      }
      this.productShowType = this.formData.CableType;
      this.productShow = true
    },
    clearProdType() {
      this.productFormData = {
        productType: '',
        model: '',
        k1: '',
        k2: '',
        c: '',
        length: '',
        toleranceType: '',
        toleranceValue: '',
        EndOfCableLength: '',
      };
      this.formData.productType = "";
      this.formData.model = "";
      this.formData.k1 = "";
      this.formData.k2 = "";
      this.formData.c = "";
      this.formData.toleranceValue = "";
      this.formData.length = "";
      this.formData.EndOfCableLength = "";

    },
    repiceSelect(data) {
      this.recipeShow = true
    },
    productConfirm(formData) {
      this.$emit('productConfirm', formData)
      this.productShow = false
    },
    /* 产品型号弹窗 */
    productClose() {
      this.productFormData = {
        productType: '',
        model: '',
        k1: "",
        k2: "",
        c: "",
        length: "",
        toleranceType: '',
        toleranceValue: '',
        EndOfCableLength: '',
      },
        this.productShow = false
    },
    changeShowValue(value, data) {
      this.productFormData.productType = `${this.productFormData.model}-${this.productFormData.k1}${this.productFormData.k2}${this.productFormData.c}-${this.productFormData.length ? 'L' : ''}${this.productFormData.length}`
    },
    /* 配方弹窗 */
    repiceClose() {
      this.recipeShow = false
    },
    repiceConfirm(rowData) {
      this.recipeShow = false
      this.$emit('repiceConfirm', rowData)
    },
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 260px;
}

.append {
  width: 55px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #386DF0;
  border-radius: inherit;
}
</style>