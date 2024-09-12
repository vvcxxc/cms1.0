<!-- 产品码 -->
<template>
  <div class="product-code">

    <div class="action-bar flex">
      <el-tooltip class="item" effect="dark" content="添加后支持同一产品类型的产品对比展示" placement="bottom-start">
        <img class="icon icon-question" :src="imgs.question">
      </el-tooltip>
      <div>产品码:</div>
      <div class="list flex">
        <div class="item" v-for="(item, i) in myList" :key="i">
          <img class="close icon icon-no" :src="imgs.no" @click="delData(i)" v-if="myList.length > 1">
          <span>{{ item }}</span>
        </div>
      </div>
      <img class="icon icon-add" :src="imgs.icon_add2" @click="showDialog">
    </div>

    <el-dialog title="产品码添加" :visible.sync="dialogShow" center :close-on-click-modal="false"
      :close-on-press-escape="false" :before-close="() => { onSubmit('cancel') }">
      <div class="dialog-content">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="产品型号">
            <el-select v-model="formData.qq1" size="medium" style="width:120px">
              <el-option v-for="item in productTypesList" :key="item.Value" :label="item.Name"
                :value="item.Value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-for="(item, i) in formData.qq2" :key="i" :label="'产品码' + serialNumber(i)">
            <div class="flex">
              <el-select v-model="item.value" filterable>
                <el-option v-for="item in productCodesList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <img class="icon icon-add" :src="imgs.icon_add2" @click="addData()">
              <img v-if="formData.qq2.length > 1" class="icon icon-del" :src="imgs.icon_del2"
                @click="() => { formData.qq2.splice(i, 1) }">
            </div>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <!-- <el-button @click="onSubmit('cancel')">取消</el-button> -->
        <el-button type="primary" @click="onSubmit('confirm')">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    qq: {
      required: true,
    },
    productTypesList: {
      required: true,
    },
  },
  data() {
    return {
      imgs: {
        icon_add2: require("@/assets/images/icon_add2.png"),
        icon_del2: require("@/assets/images/icon_del2.png"),
        question: require("@/assets/images/question.png"),
        no: require("@/assets/images/no.png"),
      },
      dialogShow: false,
      formData: {
        qq1: '',
        qq2: [{ value: '' },],
      },
      productCodesList: [],
      isFirst: true,
    };
  },
  watch: {
    qq: {
      immediate: true,
      handler: function (newVal, oldVal) {
        console.log('this.formData.qq1', this.formData.qq1)
        this.formData.qq1 = newVal;
      }
    },
    'formData.qq1': {
      immediate: true,
      handler: function (newVal, oldVal) {
        console.log('newVal', newVal, oldVal)
        if (oldVal && newVal != oldVal) {
          this.formData.qq2 = [{ value: '' }];
        }
        if (!newVal) {
          this.productCodesList = []
          return
        }
        this.getProductCodes()
      }
    }
  },
  computed: {
    myList() {
      if (!this.formData.qq2.length) {
        return [];
      }
      return this.formData.qq2.filter(_ => _.value).map(_ => _.value)
    }
  },
  methods: {
    getProductCodes() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetProductCodes?productType=${this.formData.qq1}`,
      }).then(res => {
        this.productCodesList = res.data.data;
        this.formData.qq2 = [{ value: res.data.data[0] }]
        // if (this.isFirst) {
        this.isFirst = false;
        this.formData.qq2.filter(_ => _.value).map(_ => _.value)
        this.$emit('callback', 'confirm', this.formData.qq1, this.myList, true)
        // }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    showDialog() {
      this.dialogShow = true
    },
    serialNumber(i) {
      let index = i
      index += 1
      return index
    },
    addData() {
      if (this.formData.qq2.length === 5) {
        this.$message.error('产品码个数上限为5，请注意！');
        return
      }
      this.formData.qq2.push({ value: '' })
    },
    delData(i) {
      this.formData.qq2.splice(i, 1)
    },
    onSubmit(state) {
      if (state === 'cancel') {
        this.dialogShow = false
        this.$emit('callback', state)
        return
      }
      this.dialogShow = false
      this.$emit('callback', state, this.formData.qq1, this.myList)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/statistics-analy/index.scss";

::v-deep .el-dialog {
  width: 500px;
  height: 500px;
}

.product-code {
  .icon {
    width: 26px;
    padding: 4px;
    border-radius: 4px;
    margin: 0 0 0 10px;
    cursor: pointer;

    &:hover {
      background-color: #CCCCCC;
    }
  }

  .action-bar {
    .list {
      .item {
        position: relative;
        margin: 0 0 0 10px;
        padding: 0 10px;
        text-align: center;
        line-height: 30px;
        background-color: #F0F0F0;
        border-radius: 4px;

        .close {
          width: 16px;
          position: absolute;
          top: -8px;
          right: -6px;
          color: white;
          background-color: #9F9F9F;
          border-radius: 100%;
          cursor: pointer;
        }
      }
    }

    .icon-add {
      background-color: white;

      &:hover {
        background-color: #CCCCCC;
      }
    }
  }

  .dialog-content {
    .icon {
      border: 1px solid #CCCCCC;
    }
  }
}

::v-deep .el-form {
  .el-form-item {
    margin-bottom: 20px !important;

    .el-form-item__label {
      color: #6C6D6D;
    }
  }
}

::v-deep .el-select {
  width: 100% !important;
}
</style>
