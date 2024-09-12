<!-- 实时时序 -->
<template>
  <div class="realtime-sequence">
    <!-- 头部 -->
    <div class="my-head flex">
      <el-form :inline="true" :model="formData">
        <el-form-item label="产品型号：">
          <el-select v-model="formData.qq1" size="medium" style="width:120px" @change="getProduceCodes">
            <el-option v-for="item in productTypesList" :key="item.Value" :label="item.Name"
              :value="item.Value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 在制产品改变选项好像是不影响工序名称的 -->
        <el-form-item label="在制产品：">
          <el-select v-model="formData.qq2" style="width:150px">
            <el-option v-for="item in produceCodesList" :key="item" :label="item" :value="item"></el-option>
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
        <el-form-item>
          <el-button type="primary" size="medium" @click="getRealTimeSequences()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="right">
        <el-button type="warning" plain size="medium" @click="exportTable()">导出表格</el-button>
        <el-button type="warning" plain size="medium" @click="exportPicture()">导出图片</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <MyTable ref="myTable" id="my-table" class="my-table" :dataObj="dataObj" :rengongShow="rengongShow"
      @changeRengongShow="changeRengongShow" :totalTime="`总时长：${dataObj.TotalDuration || ''}s`" />
    <ExTable ref="myTable" id="ex-table" class="ex-table" :dataObj="dataObj" :rengongShow="rengongShow"
      :pT="productTypesList.find(_ => _.Value == formData.qq1) ? productTypesList.find(_ => _.Value == formData.qq1).Name : ''"
      :pC="formData.qq2" :wP="wP" :totalTime="`总时长：${dataObj.TotalDuration || ''}s`" title="在制产品实时时序分析" />
  </div>
</template>
<script>
import MyTable from '../components/my-table.vue'
import ExTable from '../components/export-table.vue'
import html2canvas from 'html2canvas';
import _ from 'lodash';
export default {
  components: { MyTable, ExTable },
  data() {
    return {
      formData: {
        qq1: '',
        qq2: '',
        qq3: [],
      },
      productTypesList: [],
      produceCodesList: [],
      workProcessesList: [],
      dataObj: {},
      rengongShow: true,
      wP: '全部',

    }
  },
  methods: {
    changeRengongShow(a) {
      this.rengongShow = a;
    },
    exportTable() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/ExportRealTimeSequences?request.productType=${this.formData.qq1}&request.productCode=${this.formData.qq2
          }&request.workProcesses=${this.formData.qq3.join(',')}`,
        responseType: 'blob',
      }).then(res => {
        this.downloadFile(res.data, '实时时序.xlsx')
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
    getProductTypes() {
      this.$axios({
        method: 'get',
        url: '/api/ProduceData/GetProductTypes',
      }).then(res => {
        this.productTypesList = res.data.data
        if (this.productTypesList.length) {
          this.formData.qq1 = this.productTypesList[0].Value;

          this.getProduceCodes()
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    getProduceCodes() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetProductCodes?productType=${this.formData.qq1}`,
      }).then(res => {
        this.produceCodesList = res.data.data
        if (this.produceCodesList.length) {
          // this.formData.qq2 = this.produceCodesList[0]

          this.$axios({
            method: 'get',
            url: `/api/ProduceData/GetOnLineProductCode?productType=${this.formData.qq1}`,
          }).then(res => {
            if (res.data.code == 0) {
              this.formData.qq2 = res.data.data
            }
          })

        }
        this.getWorkProcesses()
      })
    },
    getWorkProcesses() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/WorkProcesses?productType=${this.formData.qq1}`,
      }).then(res => {
        this.workProcessesList = res.data.data;
        if (this.workProcessesList.length) {
          this.formData.qq3 = ['']//全部s
        }
        this.getRealTimeSequences()
      }).catch((err) => {
        console.log('err', err)
      })
    },
    changeQQ3(value) {
      if (_.last(value) === '') {
        this.formData.qq3 = [''];
      } else {
        this.formData.qq3 = value.filter((item) => item);
      }
      let str = '';
      this.formData.qq3.forEach(item => {
        str = str + this.workProcessesList.find(_ => _.Value == item).Name + ';'
      })
      this.wP = str
    },
    getRealTimeSequences() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetRealTimeSequences?request.productType=${this.formData.qq1
          }&request.productCode=${this.formData.qq2
          }&request.workProcesses=${this.formData.qq3.join(',')}`,
      }).then(res => {
        this.dataObj = res.data.data || {}
      }).catch((err) => {
        console.log('err', err)
      })
    },
    init() {
      this.getProductTypes()
    }
  },
  mounted() {
    this.init()
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

  &>.ex-table {
    width: fit-content;
    height: fit-content;
  }
}
</style>
<style lang="scss">
.realtime-sequence {
  .el-select {
    .el-select__tags {
      // 解决多个tag卡片溢出隐藏问题
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      .el-tag {
        // 注意这个inline-block 对卡片溢出隐藏很重要
        display: inline-block;

        // 解决单个tag文字过长溢出隐藏问题
        .el-select__tags-text {
          display: inline-block;
          max-width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .el-icon-close {
          top: -6px;
          right: -4px;
        }
      }
    }
  }
}
</style>