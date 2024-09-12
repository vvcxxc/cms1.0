<!-- 动作分布 -->
<template>
  <div class="action-beat-trend">
    <!-- 头部 -->
    <div class="my-head flex">
      <el-form :inline="true" :model="formData">
        <el-form-item label="时间范围：">
          <el-date-picker v-model="formData.st" type="datetime" placeholder="开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="-">
          <el-date-picker v-model="formData.ed" type="datetime" placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-select v-model="formData.qq1" size="medium" style="width:120px" @change="getWorkProcesses(true)">
            <el-option v-for="item in productTypesList" :key="item.Value" :label="item.Name"
              :value="item.Value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工序">
          <el-select v-model="formData.qq2" size="medium" style="width:120px" @change="getWorkSteps(true)">
            <el-option v-for="item in workProcessesList" :key="item.Value" :label="item.Name"
              :value="item.Value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工步">
          <el-select v-model="formData.qq3" size="medium" style="width:120px">
            <el-option v-for="item in workStepsList" :key="item.Value" :label="item.Name" :value="item.Value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="getActionDistributions()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="right">
        <el-button type="warning" plain size="medium" @click="exportPicture()">导出</el-button>
      </div>
    </div>

    <div class="content flex">
      <div class="my-chart">
        <div class="title">{{ chartTitle }}-动作分布</div>
        <div id="my-chart"></div>
      </div>
      <div class="my-form">

        <div class="item">
          <div class="row flex">
            <div class="label">样本上限：</div>
            <div class="value">{{ dataObj.UpperLimit || '-' }}</div>
          </div>
          <div class="row flex">
            <div class="label">样本下限：</div>
            <div class="value">{{ dataObj.LowerLimit || '-' }}</div>
          </div>
          <div class="row flex">
            <div class="label">中心值：</div>
            <div class="value">{{ dataObj.Center }}</div>
          </div>
          <div class="row flex">
            <div class="label">σ标准差：</div>
            <div class="value">{{ dataObj.Std }}</div>
          </div>
        </div>

        <div class="item">
          <div class="row flex">
            <div class="label">分组数：</div>
            <div class="value">{{ dataObj.GroupCount }}</div>
          </div>
          <div class="row flex">
            <div class="label">组距：</div>
            <div class="value">{{ dataObj.GroupWidth }}</div>
          </div>
          <div class="row flex">
            <div class="label">最大值：</div>
            <div class="value">{{ dataObj.Max }}</div>
          </div>
          <div class="row flex">
            <div class="label">最小值：</div>
            <div class="value">{{ dataObj.Min }}</div>
          </div>
          <div class="row flex">
            <div class="label">μ均值：</div>
            <div class="value">{{ dataObj.Avg }}</div>
          </div>
        </div>

      </div>
    </div>
    <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
  </div>
</template>
<script>
import html2canvas from 'html2canvas';
import TipPop from '../../../../components/public/tipPop.vue';

export default {
  components: { TipPop },
  data() {
    return {
      isPopShow: false, // 是否显示弹窗
      tipText: '', // 弹窗提示语
      noCancel: true, // 弹窗是否带取消按按钮
      formData: {
        st: '',
        ed: '',
        qq1: '',
        qq2: '',
        qq3: '',
      },
      productTypesList: [],
      workProcessesList: [],
      workStepsList: [],
      dataObj: {},
      chartTitle: ''
    }
  },
  methods: {
    tipCallBack(str) {
      this.noCancel = true;
      if (str == 'yes') {
        this.isPopShow = false;
      } else {
        this.isPopShow = false;
      }
    },
    // 导出图片
    exportPicture() {
      const DOM = document.getElementsByClassName('my-chart')[0];
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
        if (res.data.code == 0) {
          this.productTypesList = res.data.data
          if (this.productTypesList.length) {
            this.formData.qq1 = this.productTypesList[0].Value;
            this.getWorkProcesses()
          }
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
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
        if (res.data.code == 0) {
          this.workProcessesList = res.data.data.filter(_ => _.Value != '');
          if (this.workProcessesList.length) {
            this.formData.qq2 = this.workProcessesList[0].Value
          }
          this.getWorkSteps(b)
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    getWorkSteps(b) {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetWorkSteps?workProcess=${this.formData.qq2}`,
      }).then(res => {
        if (res.data.code == 0) {
          this.workStepsList = res.data.data;
          if (this.workStepsList.length) {
            this.formData.qq3 = this.workStepsList[0].Value
          }
          //头顶的查询条件改变不触发查询，点击了按钮再查
          if (b) {
            return
          }
          this.getActionDistributions()
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    getActionDistributions(flash) {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetActionDistributions?request.beginTime=${this.formData.st}&request.endTime=${this.formData.ed}&request.productType=${this.formData.qq1}&request.workProcess=${this.formData.qq2}&request.workStep=${this.formData.qq3}`,
      }).then(res => {
        if (res.data.code == 0) {
          this.chartTitle = this.workStepsList.length && this.formData.qq3 ? this.workStepsList.find(_ => _.Value == this.formData.qq3).Name : '';
          this.dataObj = res.data.data;
          let _items = this.dataObj.Item2 || [];
          let Chart1 = this.$echarts.init(document.getElementById('my-chart'));
          const xData = this.dataObj.Items.map(_ => _.Duration);
          const barData = this.dataObj.Item2.map(_ => _.Duration);
          let option = {
            grid: {
              left: '3%', right: '4%', bottom: '3%',
              containLabel: true,
            },
            tooltip: {
              trigger: 'axis',
              formatter: (val) => {
                let _Range = _items.find(_ => _.Duration == val[0].axisValue).Range;
                let str = '区间：' + _Range + '<br/>';
                val.forEach(item => {
                  str = str + item.marker + item.seriesName + '：' + item.data + '<br/>'
                });
                return str;
              },
            },
            xAxis: [
              {
                data: barData,
                show: false,
              },
              {
                data: xData,
                position: 'bottom',
                boundaryGap: false,
                axisPointer: {
                  show: false,
                },
                nameTextStyle: {
                  color: '#999',
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  interval: 0,
                  color: '#999999',
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#F1F1F1',
                  },
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                splitLine: {
                  show: false
                },
              },
              {
                type: 'value',
                splitLine: {
                  show: false
                },
              }
            ],
            series: [
              {
                name: '频数',
                type: 'bar',
                data: _items.map(_ => _.Frequency),
                barCategoryGap: '0%',
                itemStyle: {
                  color: '#6bbffa',
                },
                xAxisIndex: 0,
              },

              {
                name: '概率',
                type: 'line',
                yAxisIndex: 1,
                data: _items.map(_ => _.Probability),
                itemStyle: {
                  color: '#a7e7b9'
                },
                lineStyle: {
                  color: '#a7e7b9'
                },
                xAxisIndex: 0,
              },
            ],
          };
          Chart1.setOption(option);
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },

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
    this.getProductTypes()
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

    // margin-bottom: 0;
    .el-form-item__label {
      color: #6C6D6D;
    }

    .el-form-item__content {
      display: inline-block;
    }
  }

  .radio-group {
    .el-form-item__content {
      line-height: 36px;
    }
  }
}

.action-beat-trend {
  width: 100%;
  height: 100%;

  &>.my-head {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    justify-content: space-between;
    background-color: #DDDDDD;

    ::v-deep .el-form {
      .el-form-item {
        margin-bottom: 0;
      }
    }

  }

  &>.content {
    width: 100%;
    height: calc(100% - 60px);
    padding: 20px;

    &>.my-chart {
      width: calc(100% - 260px);
      height: 100%;
      margin: 0 10px 0 0;
      position: relative;
      background-color: #F8F8F8;
    }

    >.my-form {
      width: 250px;
      height: 100%;
      padding: 10px;
    }
  }
}
</style>
<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.my-chart {
  width: 100%;
  height: 100%;
  position: relative;

  &>.title {
    width: 40%;
    height: 36px;
    padding: 0 0 0 20px;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 36px;
    font-size: 16px;
    font-weight: 400;
    color: #4270E4;
    background-color: #EEF3FF;
  }

  #my-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

::v-deep .el-radio-group {
  .el-radio {
    line-height: 30px;
    display: block;
  }
}

.my-form {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #E4E4E4;

  &>.item {
    width: 100%;
    margin: 0 0 10px 0;
    padding: 0 10px;
    background-color: #F8F8F8;

    &>.row {
      width: 100%;
      line-height: 40px;
      justify-content: flex-start;

      .label {
        .el-checkbox {
          line-height: 40px;
          margin: 0 5px 0 0;
        }
      }
    }
  }
}
</style>
