<!-- 历史时序 -->
<template>
  <div class="realtime-sequence">
    <!-- 头部 -->
    <div class="my-head flex">
      <div class="left flex">
        <el-form :inline="true" :model="formData">
          <el-form-item label="产品型号：">
            <el-select v-model="formData.qq1" size="medium" style="width:120px" @change="getWorkProcesses"
              :appendToBody="false">
              <el-option v-for="item in productTypesList" :key="item.Value" :label="item.Name"
                :value="item.Value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工序名称：">
            <el-tooltip effect="dark"
              :content="workProcessesList.filter(_ => formData.qq3.some(_2 => _2 == _.Value)).map(_ => _.Name).join(';')"
              placement="top">
              <el-select v-model="formData.qq3" style="width:150px" :multiple="true" @change="changeQQ3">
                <el-option v-for="(item, idx) in workProcessesList" :key="item.Value + idx" :label="item.Name"
                  :value="item.Value"></el-option>
              </el-select>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="工步名称：">
            <el-tooltip effect="dark"
              :content="workStepsList.filter(_ => formData.qq4.some(_2 => _2 == _.Value)).map(_ => _.Name).join(';')"
              placement="top">
              <el-select v-model="formData.qq4" style="width:150px" :multiple="true" @change="changeQQ4"
                :disabled="formData.qq3.some(_ => _ == '') || formData.qq3.length > 1">
                <el-option v-for="(item, idx) in  workStepsList " :key="item.Value + idx" :label="item.Name"
                  :value="item.Value"></el-option>
              </el-select>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getHistoryTimeSequences()">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 产品码添加 -->
        <product-code @callback="productCodeCallback" :qq="formData.qq1" :productTypesList="productTypesList"/>
      </div>
      <div class="right">
        <el-button type="warning" plain size="medium" @click="exportTable()">导出表格</el-button>
        <el-button type="warning" plain size="medium" @click="exportPicture()">导出图片</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <MyTable ref="myTable" id="my-table" class="my-table" :dataObj="dataObj" :auxiliaryWire="true"
      :rengongShow="rengongShow" @changeRengongShow="changeRengongShow" />
    <ExTable ref="myTable" id="ex-table" class="ex-table" :dataObj="dataObj" :rengongShow="rengongShow"
      :pT="productTypesList.find(_ => _.Value == formData.qq1) ? productTypesList.find(_ => _.Value == formData.qq1).Name : ''"
      :pC="formData.qq5.join(',')" :wP="wP" title="产品历史时序分析" />
    <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
  </div>
</template>
<script>
import MyTable from '../components/my-table.vue'
import ExTable from '../components/export-table.vue'
import ProductCode from './components/product-code.vue'
import html2canvas from 'html2canvas';
import TipPop from '../../../../components/public/tipPop.vue';
export default {
  components: { MyTable, ExTable, ProductCode, TipPop },
  data() {
    return {
      isPopShow: false, // 是否显示弹窗
      tipText: '', // 弹窗提示语
      noCancel: true, // 弹窗是否带取消按按钮
      formData: {
        qq1: '',
        qq3: [],
        qq4: [],
        qq5: [],
      },
      productTypesList: [],
      workProcessesList: [],
      workStepsList: [],
      dataObj: null,
      rengongShow: true,
      // 产品码添加-配置
      productCodeConfig: {
        show: false,
      },
      wP: '',
    }
  },
  watch: {
    'formData.qq1': {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal != oldVal) {
          this.formData.qq4 = [''];
          this.formData.qq4 = [''];
          // this.formData.qq5 = [];
        }
      }
    },
  },
  methods: {
    tipCallBack(str) {
      if (str == 'yes') {
        this.isPopShow = false;
      } else {
        this.isPopShow = false;
      }
    },
    changeRengongShow(a) {
      this.rengongShow = a;
    },
    productCodeCallback(data, type, list, b) {
      if (data === 'confirm') {
        console.log(type, this.formData.qq1);
        if (type != this.formData.qq1 || b) {
          this.formData.qq1 = type;
          this.formData.qq5 = list;
          this.getWorkProcesses(Boolean(b))
        } else {
          this.formData.qq5 = list;
        }
      }
    },
    exportTable() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/ExportHistoryTimeSequences?request.productType=${this.formData.qq1
          }&request.productCodes=${this.formData.qq5.join(',')
          }&request.workProcesses=${this.formData.qq3.join(',')}&request.workSteps=${this.formData.qq4.join(',')}`,
        responseType: 'blob',
      }).then(res => {
        this.downloadFile(res.data, '历史时序.xlsx')
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 导出图片
    exportPicture() {
      const DOM = document.getElementById('ex-table');
      html2canvas(DOM).then(function (canvas) {
        const src = canvas.toDataURL('image/png');
        const a = document.createElement('a')
        a.download = name
        a.href = src;
        a.click();
        a.remove();
      });
    },
    getProductTypes(b) {
      this.$axios({
        method: 'get',
        url: '/api/ProduceData/GetProductTypes',
      }).then(res => {
        this.productTypesList = res.data.data
        if (this.productTypesList.length) {
          this.formData.qq1 = this.productTypesList[0].Value;
          if (!b) {
            //第一次由productCodeCallback发起
            this.getWorkProcesses()
          }
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    getWorkProcesses(b) {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/WorkProcesses?productType=${this.formData.qq1}`,
      }).then(res => {
        this.workProcessesList = res.data.data;
        if (this.workProcessesList.length) {
          this.formData.qq3 = ['']//全部s
        }
        this.getWorkSteps(b)
      }).catch((err) => {
        console.log('err', err)
      })
    },
    getWorkSteps(b) {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetWorkSteps?workProcess=${this.formData.qq3.join(',')}`,
      }).then(res => {
        this.workStepsList = res.data.data;
        this.workStepsList.unshift({ Name: "全部", Value: "" })
        if (this.workStepsList.length) {
          this.formData.qq4 = ['']//全部s
        }
        if (b) {
          this.getHistoryTimeSequences()
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    changeQQ3(arr) {
      if (_.last(arr) === '') {
        this.formData.qq3 = [''];
      } else {
        this.formData.qq3 = arr.filter((item) => item);
      }
      if (this.formData.qq3.some(_ => _ == '') || this.formData.qq3.length > 1) {
        this.formData.qq4 = ['']
      }
      let str = '';
      this.formData.qq3.forEach(item => {
        str = str + this.workProcessesList.find(_ => _.Value == item).Name + ';'
      })
      this.wP = str
      this.getWorkSteps()
    },
    changeQQ4(arr) {
      if (_.last(arr) === '') {
        this.formData.qq4 = [''];
      } else {
        this.formData.qq4 = arr.filter((item) => item);
      }
    },
    getHistoryTimeSequences() {
      if (!this.formData.qq5 || !this.formData.qq5.length) {
        this.tipText = '请选择产品码';
        this.isPopShow = true;
        return;
      }
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetHistoryTimeSequences?request.productType=${this.formData.qq1
          }&request.productCodes=${this.formData.qq5.join(',')
          }&request.workProcesses=${this.formData.qq3.join(',')}&request.workSteps=${this.formData.qq4.join(',')}`,
      }).then(res => {
        this.dataObj = res.data.data || {}
      }).catch((err) => {
        console.log('err', err)
      })
    },
  },
  mounted() {
    this.getProductTypes(true)
  },
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

::v-deep .el-form {
  .el-form-item {
    margin-bottom: 0;

    .el-form-item__label {
      color: #6C6D6D;
    }
  }
}

.realtime-sequence {
  width: 100%;
  height: 100%;

  &>.my-head {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    justify-content: space-between;
    background-color: #DDDDDD;
  }

  &>.my-table {
    width: 100%;
    height: calc(100% - 60px);
    // background-color: green;
  }
}
</style>
