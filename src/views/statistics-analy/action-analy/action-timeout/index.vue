<!-- 动作节拍趋势 -->
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
          <el-select v-model="formData.qq1" size="medium" style="width:120px" @change="getWorkProcesses">
            <el-option v-for="item in productTypesList" :key="item.Value" :label="item.Name"
              :value="item.Value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="getWorkProcesses">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="right">
        <el-button type="warning" plain size="medium" @click="exportPicture()">导出</el-button>
      </div>
    </div>

    <div class="content flex">
      <div class="my-chart">
        <div class="title">{{ workProcessesList.find(_ => _.Value ==
          formData.qq2).Name == '全部' ? '整线' : workProcessesList.find(_ => _.Value == formData.qq2).Name }}-超时分析</div>
        <div id="my-chart"></div>
      </div>
      <div class="my-form">
        <div class="content">
          <!-- 工序选择 -->
          <div class="working-procedure">
            <div class="title">工序选择：</div>
            <el-select v-model="formData.qq2" size="medium" style="width:120px" @change="getWorkSteps">
              <el-option v-for="item in workProcessesList" :key="item.Value" :label="item.Name"
                :value="item.Value"></el-option>
            </el-select>
          </div>

          <!-- 工步选择 -->
          <div class="work-step">
            <div class="title">工步选择：</div>
            <el-checkbox-group v-model="formData.qq3" @change="getActionOversteps">
              <el-checkbox v-for="item in workStepsList" :key="item.Value" :label="item.Value">{{ item.Name
              }}</el-checkbox>
            </el-checkbox-group>
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
        qq3: [],
      },
      productTypesList: [],
      workProcessesList: [],
      workStepsList: [],
      dataObj: [],
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
          } else {
            this.formData.qq1 = '';
          }
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
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
        if (res.data.code == 0) {
          this.workProcessesList = res.data.data;
          if (this.workProcessesList.length) {
            this.formData.qq2 = this.workProcessesList[0].Value
          } else {
            this.formData.qq2 = ''
          }
          this.getWorkSteps()
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    getWorkSteps() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetWorkSteps?workProcess=${this.formData.qq2}`,
      }).then(res => {
        if (res.data.code == 0) {
          this.workStepsList = res.data.data;
          if (this.workStepsList.length) {
            this.formData.qq3 = this.workStepsList.map(_ => _.Value)
          } else {
            this.formData.qq3 = []
          }
          this.getActionOversteps()
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    getActionOversteps() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/GetActionOversteps?request.beginTime=${this.formData.st}&request.endTime=${this.formData.ed
          }&request.productType=${this.formData.qq1}&request.workProcess=${this.formData.qq2}&request.workSteps=${this.formData.qq3.join(',')}`,
      }).then(res => {
        if (res.data.code == 0) {
          this.dataObj = res.data.data;
          let Chart1 = this.$echarts.init(document.getElementById('my-chart'));
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              },
              formatter: (val) => {
                console.log("val", val)
                let str = '工步：' + val[0].axisValue + '<br/>';
                str += val[0].marker + val[0].seriesName + '：' + val[0].data + 's' + '<br/>';
                str += val[1].marker + val[1].seriesName + '：' + val[1].data + '次' + '<br/>';
                return str;
              },
            },
            legend: {
              show: true,
              data: ['超时时长', '超时次数'],
              right: 15,
              top: 15,
            },
            xAxis: [
              {
                type: 'category',
                data: this.dataObj.map(_ => _.Action),
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
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
                name: '超时时长',
                type: 'bar',
                data: this.dataObj.map(_ => _.OverTime),
                itemStyle: {
                  color: '#557fec'
                }
              },
              {
                name: '超时次数',
                type: 'line',
                yAxisIndex: 1,
                data: this.dataObj.map(_ => _.OverCount),
                itemStyle: {
                  color: '#ffad4c'
                },
                lineStyle: {
                  color: '#ffad4c'
                }
              }
            ]
          }
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
      width: calc(100% - 210px);
      height: 100%;
      margin: 0 10px 0 0;
      position: relative;
      background-color: #F8F8F8;
    }

    >.my-form {
      width: 200px;
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

  .content {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #F8F8F8;
    overflow-x: hidden;
    overflow-y: auto;

    // 工序选择
    .working-procedure {
      width: 100%;
      padding: 0 0 20px 0;
    }

    // 工步选择
    .work-step {
      width: 100%;
    }
  }
}
</style>
