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
          <el-select v-model="formData.qq1" size="medium" style="width:120px">
            <el-option v-for="item in productTypesList" :key="item.Value" :label="item.Name"
              :value="item.Value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="queryData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain size="medium" @click="setRangeShow()">范围设置</el-button>
        </el-form-item>
        <el-form-item class="radio-group">
          <el-radio-group v-model="formData.tabsVal" size="medium" @input="queryData">
            <el-radio-button label="整线"></el-radio-button>
            <el-radio-button label="工序"></el-radio-button>
            <el-radio-button label="工步"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="right">
        <el-button type="warning" plain size="medium" @click="exportPicture()">导出</el-button>
      </div>
    </div>
    <!-- 内容 -->
    <!-- 整线 -->
    <div class="my-page flex content" v-if="formData.tabsVal === '整线'">
      <div class="my-chart">
        <div class="title">产线节拍趋势</div>
        <div id="my-chart1"></div>
      </div>
      <div class="my-form">
        <!-- 信息 -->
        <div class="info">
          <div class="row flex">
            <div class="label">样本上限：</div>
            <div class="value">{{ dataObj.UpperLimit || '-' }}</div>
          </div>
          <div class="row flex">
            <div class="label">样本下限：</div>
            <div class="value">{{ dataObj.LowerLimit || '-' }}</div>
          </div>
          <div class="row flex">
            <div class="label">
              <el-checkbox v-model="maxValSelect"></el-checkbox>
              <span>最大值：</span>
            </div>
            <div class="value">{{ dataObj.MaxValue }}</div>
          </div>
          <div class="row flex">
            <div class="label">
              <el-checkbox v-model="minValSelect"></el-checkbox>
              <span>最小值：</span>
            </div>
            <div class="value">{{ dataObj.MinValue }}</div>
          </div>
          <div class="row flex">
            <div class="label">
              <el-checkbox v-model="averageValSelect"></el-checkbox>
              <span>平均值：</span>
            </div>
            <div class="value">{{ dataObj.AvgValue }}</div>
          </div>
        </div>
        <div class="proportion">
          <div>范围内数据占总样本容量：</div>
          <div class="value">{{ dataObj.Ratio }}</div>
        </div>
      </div>

      <el-dialog width="350px" title="范围设置" :visible.sync="setRangeConfig.show" center :close-on-click-modal="false"
        :close-on-press-escape="false" :before-close="() => { setRangeCallback('cancel') }">
        <div class="dialog-content">
          <el-form>
            <el-form-item label="样本上限：">
              <el-input v-model="popData1.upperLimit" size="medium" />
            </el-form-item>
            <el-form-item label="样本下限：">
              <el-input v-model="popData1.lowerLimit" size="medium" />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <el-button @click="setRangeCallback('cancel')">取消</el-button>
          <el-button type="primary" @click="setRangeCallback('confirm')">确定</el-button>
        </template>
      </el-dialog>
    </div>

    <!-- 工序 -->
    <div class="my-page flex content" v-if="formData.tabsVal === '工序'">
      <div class="my-chart">
        <div class="title">{{ leftTopTitle }}-趋势节拍</div>
        <div id="my-chart2"></div>
        <div class="chart-content">
          <div class="chart-label">
            <div class="label-item">上限值：{{ dataObj.UpperLimit }}</div>
            <div class="label-item">下限值：{{ dataObj.LowerLimit }}</div>
          </div>
          <div class="chart-table">
            <div class="table-item">
              <div class="table-up">工序名称</div>
              <div class="table-down">{{ leftTopTitle }}</div>
            </div>
            <div class="table-item">
              <div class="table-up"> <span>最大值（s）</span>
                <el-checkbox v-model="maxValSelect"></el-checkbox>
              </div>
              <div class="table-down">{{ dataObj.MaxValue }}</div>
            </div>
            <div class="table-item">
              <div class="table-up"><span>最小值（s）</span>
                <el-checkbox v-model="minValSelect"></el-checkbox>
              </div>
              <div class="table-down">{{ dataObj.MinValue }}</div>
            </div>
            <div class="table-item">
              <div class="table-up"><span>平均值（s）</span>
                <el-checkbox v-model="averageValSelect"></el-checkbox>
              </div>
              <div class="table-down">{{ dataObj.AvgValue }}</div>
            </div>
            <div class="table-item">
              <div class="table-up">样本占比</div>
              <div class="table-down">{{ dataObj.Ratio }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-form">
        <!-- 流程 -->
        <div class="process">
          <!-- 工序选择 -->
          <div class="working-procedure">
            <div class="title">工序选择：</div>
            <el-radio-group v-model="formData.qq2" @change="queryData">
              <el-radio v-for="(item, idx) in workProcessesList" :key="item.Value + idx" :label="item.Value">{{ item.Name
              }}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <el-dialog width="500px" title="范围设置" :visible.sync="setRangeConfig.show" center :close-on-click-modal="false"
        :close-on-press-escape="false" :before-close="() => { setRangeCallback('cancel') }">
        <div class="dialog-content2">
          <el-table :data="popData2" v-loading="this.$store.state.isShow" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)" height="100%" border
            :style="{ width: '100%', fontSize: '14px' }"
            :header-cell-style="{ background: '#dcf0f9', color: '#5883e7', 'border-left': '1px solid #a7d0e2', height: '50px', padding: '0' }">
            <template slot="empty">
              <span>暂无数据</span>
            </template>
            <el-table-column prop="Name" label="工序名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="样本上限（s）" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-input v-model="scope.row.upperLimit" size="medium" />
              </template>
            </el-table-column>
            <el-table-column label="样本下限（s）" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-input v-model="scope.row.lowerLimit" size="medium" />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <template #footer>
          <el-button @click="setRangeCallback('cancel')">取消</el-button>
          <el-button type="primary" @click="setRangeCallback('confirm')">确定</el-button>
        </template>
      </el-dialog>
    </div>
    <!-- 工步 -->
    <div class="my-page flex content" v-if="formData.tabsVal === '工步'">
      <div class="my-chart">
        <div class="title">{{ leftTopTitle }}-动作趋势</div>
        <div id="my-chart3"></div>
        <div class="chart-content">
          <div class="chart-label">
            <div class="label-item">上限值：{{ dataObj.UpperLimit }}</div>
            <div class="label-item">下限值：{{ dataObj.LowerLimit }}</div>
          </div>
          <div class="chart-table">
            <div class="table-item">
              <div class="table-up">工序名称</div>
              <div class="table-down">{{ leftTopTitle }}</div>
            </div>
            <div class="table-item">
              <div class="table-up"> <span>最大值（s）</span>
                <el-checkbox v-model="maxValSelect"></el-checkbox>
              </div>
              <div class="table-down">{{ dataObj.MaxValue }}</div>
            </div>
            <div class="table-item">
              <div class="table-up"><span>最小值（s）</span>
                <el-checkbox v-model="minValSelect"></el-checkbox>
              </div>
              <div class="table-down">{{ dataObj.MinValue }}</div>
            </div>
            <div class="table-item">
              <div class="table-up"><span>平均值（s）</span>
                <el-checkbox v-model="averageValSelect"></el-checkbox>
              </div>
              <div class="table-down">{{ dataObj.AvgValue }}</div>
            </div>
            <div class="table-item">
              <div class="table-up">样本占比</div>
              <div class="table-down">{{ dataObj.Ratio }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-form">
        <!-- 流程 -->
        <div class="process">
          <!-- 工序选择 -->
          <div class="working-procedure">
            <div class="title">工序选择：</div>
            <el-select v-model="formData.qq2" size="medium">
              <el-option v-for="(item, idx) in workProcessesList" :key="item.Value + idx" :label="item.Name"
                :value="item.Value"></el-option>
            </el-select>
          </div>

          <!-- 工步选择 -->
          <div class="work-step">
            <div class="title">工步选择：</div>
            <el-radio-group v-model="formData.qq3" @change="queryData">
              <el-radio v-for="(item, idx) in  workStepsList " :key="item.Value + idx" :label="item.Value">{{ item.Name
              }}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <el-dialog width="500px" title="范围设置" :visible.sync="setRangeConfig.show" center :close-on-click-modal="false"
        :close-on-press-escape="false" :before-close="() => { setRangeCallback('cancel') }">
        <div class="dialog-content2">
          <el-table :data="popData3" v-loading="this.$store.state.isShow" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)" height="100%" border
            :style="{ width: '100%', fontSize: '14px' }"
            :header-cell-style="{ background: '#dcf0f9', color: '#5883e7', 'border-left': '1px solid #a7d0e2', height: '50px', padding: '0' }">
            <template slot="empty">
              <span>暂无数据</span>
            </template>
            <el-table-column prop="Name" label="工步名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="样本上限（s）" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-input v-model="scope.row.upperLimit" size="medium" />
              </template>
            </el-table-column>
            <el-table-column label="样本下限（s）" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-input v-model="scope.row.lowerLimit" size="medium" />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <template #footer>
          <el-button @click="setRangeCallback('cancel')">取消</el-button>
          <el-button type="primary" @click="setRangeCallback('confirm')">确定</el-button>
        </template>
      </el-dialog>
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
        tabsVal: '整线',
        upperLimit: '', // 上限
        lowerLimit: '', // 下限
      },
      // 范围设置-配置
      setRangeConfig: {
        show: false,
      },
      productTypesList: [],
      workProcessesList: [],
      workStepsList: [],
      dataObj: {},
      leftTopTitle: '',
      maxValSelect: true,
      minValSelect: true,
      averageValSelect: true,
      popData1: {
        upperLimit: '', // 上限
        lowerLimit: '', // 下限
      },
      popData2: [],
      popData3: [],
      popData: []
    }
  },
  watch: {
    maxValSelect: {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.changeLineShow()
      }
    },
    minValSelect: {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.changeLineShow()
      }
    },
    averageValSelect: {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.changeLineShow()
      }
    },
    'formData.qq1': {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (!newVal) {
          this.workProcessesList = []
          return
        }
        console.log('11')
        this.getWorkProcesses()
      }
    },
    'formData.qq2': {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (!newVal) {
          this.workStepsList = []
          return
        }
        this.getWorkSteps()
      }
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
    getWorkProcesses() {
      this.$axios({
        method: 'get',
        url: `/api/ProduceData/WorkProcesses?productType=${this.formData.qq1}`,
      }).then(res => {
        if (res.data.code == 0) {
          this.workProcessesList = res.data.data;
          if (this.workProcessesList.length) {
            this.workProcessesList = this.workProcessesList.filter(_ => _.Value)
            this.formData.qq2 = this.workProcessesList[0].Value
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
            this.formData.qq3 = this.workStepsList[0].Value
          }
          this.queryData();
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    changeLineShow() {
      let _id = '';
      if (this.formData.tabsVal === '整线') {
        _id = 'my-chart1'
      } else if (this.formData.tabsVal === '工序') {
        _id = 'my-chart2'
      } else if (this.formData.tabsVal === '工步') {
        _id = 'my-chart3'
      }
      var Chart1 = echarts.init(document.getElementById(_id))
      let option1 = Chart1.getOption();
      console.log("option1", option1)
      let obj = {}
      if (this.averageValSelect) {
        obj = {
          data: [{
            type: 'average',
            name: '平均值',
            itemStyle: {
              color: "#797979",
            }
          },]
        }
      }
      option1.series[0].markLine = obj;
      let arr = [];
      if (this.maxValSelect || this.minValSelect) {

        if (this.maxValSelect) {
          arr.push({
            type: 'max',
            name: '最大值'
          })
        }
        if (this.minValSelect) {
          arr.push({
            type: 'min',
            name: '最小值'
          })
        }
      };
      option1.series[0].markPoint.data = arr;
      Chart1.setOption(option1, true);

    },
    queryData() {
      let title = '';
      if (this.formData.tabsVal === '工序') {
        title = '工序：' + this.workProcessesList.find(_ => _.Value == this.formData.qq2).Name
      }
      if (this.formData.tabsVal === '工步') {
        title = '工步：' + this.workStepsList.find(_ => _.Value == this.formData.qq3).Name
      }
      this.leftTopTitle = title;
      let str = title ? title + '<br/>' : '';
      console.log("title66+6", title)
      let option1 = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) { // tip显示的具体内容
            return `${str}<span>产品码：${params[0].name}</span><br/>
            ${params[0].marker}<span>持续时长：${params[0].data}s</span>`;
          },
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            itemStyle: {
              normal: {
                color: "#F29C1B",
                lineStyle: {
                  color: "#F29C1B"
                }
              }
            },
            markLine: {
              data: [],

            },
            markPoint: {
              data: [],
              itemStyle: {
                color: "#797979",
              },
            }
          }
        ]
      };
      let obj = {}
      if (this.averageValSelect) {
        obj = {
          data: [{
            type: 'average',
            name: '平均值',
            itemStyle: {
              color: "#797979",
            },
            label: {
              position: 'end',
              formatter: function (params) {
                return `${params.name}：${params.value}`
              }
            },
          },]
        }
      }
      option1.series[0].markLine = obj;
      let arr = [];
      if (this.maxValSelect || this.minValSelect) {

        if (this.maxValSelect) {
          arr.push({
            type: 'max',
            name: '最大值'
          })
        }
        if (this.minValSelect) {
          arr.push({
            type: 'min',
            name: '最小值'
          })
        }
      };
      option1.series[0].markPoint.data = arr;
      if (this.formData.tabsVal === '整线') {
        this.$axios({
          method: 'get',
          url: `/api/ProduceData/GetActionBeats?request.productType=${this.formData.qq1
            }&request.beginTime=${this.formData.st
            }&request.endTime=${this.formData.ed
            }`,
        }).then(res => {
          if (res.data.code == 0) {
            this.dataObj = res.data.data;
            option1.series[0].itemStyle.normal.lineStyle.color = '#ffc053'
            option1.series[0].itemStyle.normal.color = '#ffc053'
            option1.xAxis.data = res.data.data.Items.map(_ => _.ProductCode)
            option1.series[0].data = res.data.data.Items.map(_ => _.Duration)
            var Chart1 = echarts.init(document.getElementById('my-chart1'))
            Chart1.setOption(option1, true);
          } else {
            this.dataObj = {};
            this.isPopShow = true;
            this.tipText = res.data.msg
          }
        }).catch((err) => {
          console.log('err', err)
        })
      } else if (this.formData.tabsVal === '工序') {

        this.$axios({
          method: 'get',
          url: `/api/ProduceData/GetActionBeats?request.productType=${this.formData.qq1
            }&request.beginTime=${this.formData.st
            }&request.endTime=${this.formData.ed
            }&request.workProcess=${this.formData.qq2}`,
        }).then(res => {
          if (res.data.code == 0) {
            this.dataObj = res.data.data
            option1.series[0].itemStyle.normal.lineStyle.color = '#1fe556'
            option1.series[0].itemStyle.normal.color = '#1fe556'
            option1.xAxis.data = res.data.data.Items.map(_ => _.ProductCode)
            option1.series[0].data = res.data.data.Items.map(_ => _.Duration)
            var Chart1 = echarts.init(document.getElementById('my-chart2'))
            Chart1.setOption(option1);
          } else {
            this.dataObj = {};
            this.isPopShow = true;
            this.tipText = res.data.msg
          }
        }).catch((err) => {
          console.log('err', err)
        })
      } else if (this.formData.tabsVal === '工步') {
        this.$axios({
          method: 'get',
          url: `/api/ProduceData/GetActionBeats?request.productType=${this.formData.qq1
            }&request.beginTime=${this.formData.st
            }&request.endTime=${this.formData.ed
            }&request.workProcess=${this.formData.qq2}&request.workStep=${this.formData.qq3}`,
        }).then(res => {
          if (res.data.code == 0) {
            option1.series[0].itemStyle.normal.lineStyle.color = '#43b9e4'
            option1.series[0].itemStyle.normal.color = '#43b9e4'
            option1.xAxis.data = res.data.data.Items.map(_ => _.ProductCode)
            option1.series[0].data = res.data.data.Items.map(_ => _.Duration)
            this.dataObj = res.data.data
            var Chart1 = echarts.init(document.getElementById('my-chart3'))
            Chart1.setOption(option1);
          } else {
            this.dataObj = {};
            this.isPopShow = true;
            this.tipText = res.data.msg
          }
        }).catch((err) => {
          console.log('err', err)
        })

      }
    },
    // 范围设置-显示
    setRangeShow() {
      this.$axios({
        method: 'get',
        url: `/api/Setting/Get?request.providerName=G&request.providerKey=${this.formData.qq1}&request.namePrefix=SCMS.RangeSetting`,

      }).then(res => {
        if (res.data.code == 0) {
          let Settings = res.data.data.Settings
          this.popData = Settings.length ? JSON.parse(Settings[0].Value) : [];
          console.log('popData', this.popData)
          if (this.formData.tabsVal === '整线') {
            let _obj = this.popData.find(_ => _.RangeType == 0) || {}
            this.popData1 = {
              upperLimit: _obj.UpperLimit,
              lowerLimit: _obj.LowerLimit,
            }
          } else if (this.formData.tabsVal === '工序') {
            let temp = this.workProcessesList.map(_ => ({ Name: _.Name }))
            temp.forEach(item => {
              let _obj = this.popData.find(_ => (_.RangeType == 1 && _.Subject == item.Name)) || {}
              console.log("_obj", _obj)
              item.upperLimit = _obj.UpperLimit;
              item.lowerLimit = _obj.LowerLimit;
            })

            this.popData2 = temp;
          } else if (this.formData.tabsVal === '工步') {
            let temp = this.workStepsList.map(_ => ({ Name: _.Name }))
            temp.forEach(item => {
              let _obj = this.popData.find(_ => (_.RangeType == 2 && _.Subject == item.Name)) || {}
              item.upperLimit = _obj.UpperLimit;
              item.lowerLimit = _obj.LowerLimit;
            })
            this.popData3 = temp;
          }
        } else {
          this.isPopShow = true;
          this.tipText = res.data.msg
        }
      }).catch((err) => {
        console.log('err', err)
      })
      this.setRangeConfig.show = true
    },
    isNumber(val) {
      var re = /^[0-9]+(\.[0-9]?)?$/;
      console.log("val", val, re.test(val))
      return re.test(val);
    },
    // 范围设置-回调
    setRangeCallback(state) {
      if (state == 'confirm') {
        if (this.formData.tabsVal === '整线') {
          let b = this.popData.some(_ => _.RangeType == 0);
          if (b) {
            this.popData.forEach(_ => {
              if (_.RangeType == 0) {
                _.UpperLimit = this.popData1.upperLimit;
                _.LowerLimit = this.popData1.lowerLimit;
              }
            })
          } else {
            this.popData.push(
              {
                RangeType: 0,
                Subject: "整线",
                UpperLimit: this.popData1.upperLimit,
                LowerLimit: this.popData1.lowerLimit
              }
            )
          }
        } else if (this.formData.tabsVal === '工序') {
          this.popData2.forEach(item => {
            let b = this.popData.some(_ => _.RangeType == 1 && _.Subject == item.Name);
            if (b) {
              this.popData.forEach(_ => {
                if (_.RangeType == 1 && _.Subject == item.Name) {
                  _.UpperLimit = item.upperLimit;
                  _.LowerLimit = item.lowerLimit;
                }
              })
            } else {
              this.popData.push(
                {
                  RangeType: 1,
                  Subject: item.Name,
                  UpperLimit: item.upperLimit,
                  LowerLimit: item.lowerLimit
                }
              )
            }
          })
        } else if (this.formData.tabsVal === '工步') {
          this.popData3.forEach(item => {
            let b = this.popData.some(_ => _.RangeType == 2 && _.Subject == item.Name);
            if (b) {
              this.popData.forEach(_ => {
                if (_.RangeType == 2 && _.Subject == item.Name) {
                  _.UpperLimit = item.upperLimit;
                  _.LowerLimit = item.lowerLimit;
                }
              })
            } else {
              this.popData.push(
                {
                  RangeType: 2,
                  Subject: item.Name,
                  UpperLimit: item.upperLimit,
                  LowerLimit: item.lowerLimit
                }
              )
            }
          })
        }
        let bool1 = this.popData.some(_ => {
          let _a = !_.UpperLimit || (_.UpperLimit && this.isNumber(_.UpperLimit));
          let _b = !_.LowerLimit || (_.LowerLimit && this.isNumber(_.LowerLimit))
          console.log(_a, _b)
          return !_a || !_b
        }

        )
        if (bool1) {
          this.isPopShow = true;
          this.tipText = '上下限请输入小数位不超过一位的0或正数!'
          return
        }
        // let bool2 = this.popData.some(_ =>
        //   Number(_.UpperLimit) < Number(_.LowerLimit)
        // )
        // if (bool2) {
        //   this.isPopShow = true;
        //   this.tipText = '上限需要大于下限!'
        //   return
        // }
        this.$axios({
          method: 'post',
          url: '/api/Setting/UpdateRangeSetting',
          data: {
            ProviderName: "G",
            ProviderKey: this.formData.qq1,
            Settings: [
              {
                Name: "SCMS.RangeSetting",
                Value: this.popData
              }
            ]
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.isPopShow = true;
            this.tipText = '修改成功！'
            this.queryData()
          } else {
            this.isPopShow = true;
            this.tipText = res.data.msg
          }
        }).catch((err) => {
          console.log('err', err)
        })
      }
      this.setRangeConfig.show = false
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
    getProductTypes(flash) {
      this.$axios({
        method: 'get',
        url: '/api/ProduceData/GetProductTypes',
      }).then(res => {
        if (res.data.code == 0) {
          this.productTypesList = res.data.data
          if (this.productTypesList.length) {
            this.formData.qq1 = this.productTypesList[0].Value;
          }
          if (flash) {
            this.queryData();
          }
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

  // 信息
  &>.info {
    width: 100%;
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

  &>.proportion {
    padding: 20px 0 0 10px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;

    &>.value {
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
      color: #386DF0;
    }
  }

  &>.process {
    width: 100%;
    height: calc(100% - 295px);
    background-color: #F8F8F8;
    padding: 10px;
    margin: 10px 0 0 0;
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

.dialog-content2 {
  height: 300px;
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

  #my-chart1 {
    width: 100%;
    height: 100%;
  }

  #my-chart2,
  #my-chart3 {
    width: 100%;
    height: calc(100% - 100px);
  }

  .chart-content {
    width: 100%;
    height: 100px;
    background-color: #fff;

    .chart-label {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 16px;
      box-sizing: border-box;

      .label-item {
        margin-right: 50px;
      }
    }

    .chart-table {
      width: 100%;
      height: 70px;
      display: flex;

      .table-item {
        flex: 1;
        border-right: 1px solid #fff;
        box-sizing: border-box;

        .table-up {
          width: 100%;
          height: 50%;
          background-color: #5a6c98;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          box-sizing: border-box;
        }

        .table-down {
          width: 100%;
          height: 50%;
          background-color: #eaedee;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

    }
  }


}
</style>
<style lang="scss" scoped>
@import "../../index.scss";

.my-page {
  width: 100%;
  height: 100%;

  &>.my-chart {
    width: calc(100% - 210px);
    height: 100%;
    margin: 0 10px 0 0;
    position: relative;
    background-color: #F8F8F8;
  }

  >.my-form {
    width: 300px;
    height: 100%;
    padding: 10px;
  }
}
</style>