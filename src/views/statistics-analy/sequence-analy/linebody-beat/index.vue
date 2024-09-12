<!-- 线体节拍 -->
<template>
  <div class="realtime-sequence">
    <!-- 头部 -->
    <div class="my-head flex">
      <el-form :inline="true" :model="formData">
        <el-form-item label="产品型号：">
          <el-select v-model="formData.qq1" size="medium" style="width:120px" @change="getWorkProcesses">
            <el-option v-for="item in productTypesList" :key="item.Value" :label="item.Name"
              :value="item.Value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围：">
          <el-date-picker v-model="formData.st" type="datetime" placeholder="开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="-">
          <el-date-picker v-model="formData.ed" type="datetime" placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
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
          <el-button type="primary" size="medium" @click="getLineBeats()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="right">
        <el-button type="warning" plain size="medium" @click="exportTable()">导出表格</el-button>
        <el-button type="warning" plain size="medium" @click="exportPicture()">导出图片</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <MyTable ref="myTable" id="my-table" class="my-table" :dataObj="dataObj" :rengongShow="rengongShow"
      @changeRengongShow="changeRengongShow" :dT="`${formData.st}~${formData.ed}`" title="线体平均节拍" :totalTime="`线体节拍：${dataObj.TotalDuration|| ''}s`"/>
    <ExTable ref="myTable" id="ex-table" class="ex-table" :dataObj="dataObj" :rengongShow="rengongShow"
      :pT="productTypesList.find(_ => _.Value == formData.qq1)?productTypesList.find(_ => _.Value == formData.qq1).Name:''" :dT="`${formData.st}~${formData.ed}`" :wP="wP" title="线体平均节拍" :totalTime="`线体节拍：${dataObj.TotalDuration || ''}s`" />
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
        st: '',
        ed: '',
        qq3: [],
      },
      productTypesList: [],
      workProcessesList: [],
      dataObj: {},
      rengongShow: true,
      wP: ''
    }
  },
  methods: {
    changeRengongShow(a) {
      this.rengongShow = a;
    },
    exportTable() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/ExportLineBeats?request.productType=${this.formData.qq1
          }&request.beginTime=${this.formData.st
          }&request.endTime=${this.formData.ed
          }&request.workProcesses=${this.formData.qq3.join(',')}`,
        responseType: 'blob',
      }).then(res => {
        this.downloadFile(res.data, '线体节拍.xlsx')
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
          this.getWorkProcesses()
        }
      }).catch((err) => {
        console.log('err', err)
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
        this.getLineBeats()
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
    getLineBeats() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetLineBeats?request.productType=${this.formData.qq1
          }&request.beginTime=${this.formData.st
          }&request.endTime=${this.formData.ed
          }&request.workProcesses=${this.formData.qq3.join(',')}`,
      }).then(res => {
        this.dataObj = res.data.data || {}
        this.dataObj.ProcessDurations = this.dataObj.ProcessBeats
      }).catch((err) => {
        console.log('err', err)
      })
    },
    init() {
      this.getProductTypes()
    }
  },
  mounted() {
    let st = this.$getDate(
      new Date(new Date().toLocaleDateString()).getTime() -
      6 * 24 * 60 * 60 * 1000
    );
    let ed = this.$getDate(
      new Date(new Date().toLocaleDateString()).getTime() +
      24 * 60 * 60 * 1000 -
      1
    );
    Object.assign(this.formData, {
      st,
      ed
    });


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
}
</style>
