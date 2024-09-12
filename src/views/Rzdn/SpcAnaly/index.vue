<template>
  <div class="page">
    <div class="container">
      <header>
        <div class="header_left" >
          <div class="left_model" >
            <i class="header_left_icon el-icon-question" @click="openDiffPop"></i>
            <span class="header_left_subtitle" >判异规则选择</span>
            <div class="item_ul" >
              <!-- <div class="item_li"
                v-for="(item, index) in items"
                :key="index"
                :class="{current_item: currentItems.includes(item.value)}"
                @click="changeItem(item.value)"
              >
                {{item.label}} -->
              <el-button class="item_li"
                v-for="(item, index) in items"
                :key="index"
                :class="{current_item: currentItems.includes(item.value)}"
                @click="changeItem(item.value)"
                :disabled="!currentMain"
              >
                {{item.label}}
              </el-button>
            </div>
            <div class="item_limit" >
              <div class="item_limit_title" >上限值</div>
              <div class="item_limit_input" >
                <el-input-number class="common_input" :controls="false" :disabled="!currentMain" v-model="infoData.Usl" @focus="handleFocus" @blur="changeLimit"></el-input-number>
              </div>
            </div>
            <div class="item_limit" >
              <div class="item_limit_title" >下限值</div>
              <div class="item_limit_input" >
                <el-input-number class="common_input" :controls="false" :disabled="!currentMain"  v-model="infoData.Lsl" @focus="handleFocus" @blur="changeLimit"></el-input-number>
              </div>
            </div>
          </div>
        </div>
        <div>
          <template v-if="infoData.IsRealTime">
            <el-button class="common_button spc_btn_confirm spc_btn" @click="confirmAlarm">报警确认</el-button>
            <el-button class="common_button common_button_search spc_btn" @click="alarmSetting">报警设置</el-button>
            <el-button class="common_button common_button_search spc_btn" @click="alarmRecord">报警记录</el-button>
          </template>
          <el-button class="common_button common_button_search spc_btn" :disabled="!currentMain" @click="exportReport">导出报告</el-button>
        </div>
      </header>
      <main>
        <div class="main_left" >
          <div v-for="(item, index) in mianLeftItems" :key="index" class="main_item" :class="{ current_main: currentMain === item.value}" @click="changeMain(item.value)">
            <span>{{item.label}}</span>
          </div>
        </div>
        <div class="main_right" >
          <div class="chart_wrap">
            <div class="chart_wrap_header">
              <div class="wrap_header_left" >
                <div class="chart_choose">
                  <!-- <div :style="currentChoose === 1 ? 'background: #00BFBF' : ''" @click="changeChoose(1)">X-R管制图</div>
                  <div :style="currentChoose === 2 ? 'background: #00BFBF' : ''" @click="changeChoose(2)">正态分布图</div> -->
                  <el-button class="choose_btn" :class="{ 'current_choose_btn' : currentChoose === 1 }" :disabled="!currentMain" @click="changeChoose(1)">X-R管制图</el-button>
                  <el-button class="choose_btn" :class="{ 'current_choose_btn' : currentChoose === 2 }" :disabled="!currentMain" @click="changeChoose(2)">正态分布图</el-button>
                </div>
                <div>
                  <el-button class="common_mini_button" :disabled="!currentMain" style="background: #008080; border-color: #008080; color: #fff" @click="openSamplePop" >样本数据</el-button>
                </div>
                <div class="header_search" v-show="!infoData.IsRealTime" >
                  <search-form :formData="searchFormData" :config="formConfig" @searchData="searchData" />
                </div>
              </div>
              <div class="wrap_header_right" >
                <div>
                    <el-switch
                      v-model="infoData.IsRealTime"
                      class="main_switch"
                      :width="120"
                      :active-text="switchText"
                      :disabled="!currentMain"
                      active-color="#0080F7"
                      inactive-color="#00BFBF"
                      @change="switchChange"
                    ></el-switch>
                </div>
              </div>
            </div>
            <div class="chart_wrap_main" >
              <div class="xr_chart" id="lineChart" v-show="currentChoose === 1">
                <div class="line" style="margin-bottom: 15px" >
                  <div class="line-title" id="linetitle1" >X <br/>管<br/>制<br/>图<br/></div>
                  <div class="line-chart" id="lineChart1" width="100%" height="100%" ></div>
                  <div class="line-tips" id="lineTip1">
                    <div>
                      <img :src="require('@/assets/images/失控点.png')" class="img_icon"  alt="">
                      <span>失控点</span>
                    </div>
                    <div>
                      <img :src="require('@/assets/images/点.png')" class="img_icon"  alt="">
                      <span>点</span>
                    </div>
                    <div>
                      <img :src="require('@/assets/images/中心线.png')" class="img_icon"  alt="">
                      <span>中心线</span>
                    </div>
                    <div>
                      <img :src="require('@/assets/images/USL.png')" class="img_icon"  alt="">
                      <span>USL</span>
                    </div>
                    <div>
                      <img :src="require('@/assets/images/LSL.png')" class="img_icon"  alt="">
                      <span>LSL</span>
                    </div>
                  </div>
                </div>
                <div  class="line" >
                  <div class="line-title" id="linetitle2" >R <br/>管<br/>制<br/>图<br/></div>
                  <div class="line-chart" id="lineChart2" width="100%" height="100%" ></div>
                  <div class="line-tips" id="lineTip2">
                    <div>
                      <img :src="require('@/assets/images/失控点.png')" class="img_icon"  alt="">
                      <span>失控点</span>
                    </div>
                    <div>
                      <img :src="require('@/assets/images/点.png')" class="img_icon"  alt="">
                      <span>点</span>
                    </div>
                    <div>
                      <img :src="require('@/assets/images/中心线.png')" class="img_icon"  alt="">
                      <span>中心线</span>
                    </div>
                    <div>
                      <img :src="require('@/assets/images/USL.png')" class="img_icon"  alt="">
                      <span>USL</span>
                    </div>
                    <div>
                      <img :src="require('@/assets/images/LSL.png')" class="img_icon"  alt="">
                      <span>LSL</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bar-chart" id="barChart" v-show="currentChoose === 2">
                <div class="bar" id="barChart" width="100%" height="100%"></div>
              </div>
            </div>
          </div>
          <div class="data_wrap">
            <div class="data_first">
              <div class="first_item">
                <div class="item_label" >均值</div>
                <div class="item_input" >
                  <el-input-number class="common_input" disabled :controls="false" v-model="infoData.Average" />
                </div>
              </div>
              <div class="first_item">
                <div class="item_label" >sigma</div>
                <div class="item_input" >
                  <el-input-number class="common_input" disabled :controls="false" v-model="infoData.Sigma" />
                </div>
              </div>
              <div class="first_item">
                <div class="item_label" >Cp</div>
                <div class="item_input" >
                  <el-input-number class="common_input" disabled :controls="false" v-model="infoData.Cp" />
                </div>
              </div>
              <div class="first_item">
                <div class="item_label" >Cpk</div>
                <div class="item_input" >
                  <el-input-number class="common_input" disabled :controls="false" v-model="infoData.Cpk" />
                </div>
              </div>
              <div class="first_item">
                <div class="item_label" >ppm</div>
                <div class="item_input" >
                  <el-input-number class="common_input" disabled :controls="false" v-model="infoData.Ppm" />
                </div>
              </div>

            </div>
            <div class="data_second" v-if="currentChoose === 1">
              <div class="data_item_title" >X管制图报错详情点表</div>
              <div class="data_item_wrap">
                <Table :columnList="xColumnList" :tableDataList="infoData.XErrors" >

                </Table>
              </div>
            </div>
            <div class="data_third" v-if="currentChoose === 1">
              <div class="data_item_title" >R管制图报错详情点表</div>
              <div class="data_item_wrap">
                <Table :columnList="rColumnList" :tableDataList="infoData.RErrors" >

                </Table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
    <diff-dialog
      :visible="diffShow"
      @close="diffClose"
    />
    <alarm-confirm
      :visible="alarmConfirmShow"
      @close="alarmConfirmClose"
    />
    <alarm-setting
      :visible="alarmSettingShow"
      @confirm="alarmSettingConfirm"
      @close="alarmSettingClose"
    />
    <alarm-record
      :visible="alarmRecordShow"
      @close="alarmRecordClose"
    />
    <sample-dialog
      :infoData="infoData"
      :timeRange="searchFormData.timeRange"
      :visible="sampleShow"
      @close="sampleClose"
    />
  </div>
</template>

<script>
import moment from 'moment'
import SearchForm from '@/newComponents/Search-form.vue'
import Table from '@/newComponents/Table.vue'
import DiffDialog from './dialogs/dialog-diff.vue'
import AlarmConfirm from './dialogs/dialog-alarm-confirm.vue'
import AlarmSetting from './dialogs/dialog-alarm-setting'
import AlarmRecord from './dialogs/dialog-alarm-record'
import SampleDialog from './dialogs/dialog-sample'
import html2canvas from "html2canvas"
import { GetSPCConfig } from '@/api/rzdn/spcSetting.js'
import { SPCAnalysis, EditSPCConfigLimit, SetWarnInfo, ExportSPCReport } from '@/api/rzdn/spcAnaly.js'
import { getRightTree, getPowerById } from '@/api/rzdn/common.js'
import { findPathByLeafId, getUrlParam } from '@/util/index.js'


export default {
  name: 'SPCAnaly',
  components: { Table, SearchForm, DiffDialog, AlarmConfirm, AlarmSetting, AlarmRecord, SampleDialog },
  data() {
    return {
      items:[
        {
          label: '模式1',
          value: 1
        },
        {
          label: '模式2',
          value: 2
        },
        {
          label: '模式3',
          value: 3
        },
        {
          label: '模式4',
          value: 4
        },
        {
          label: '模式5',
          value: 5
        },
        {
          label: '模式6',
          value: 6
        },
        {
          label: '模式7',
          value: 7
        },
        {
          label: '模式8',
          value: 8
        },
      ],
      currentItems: [],
      mianLeftItems: [],
      /* main 主体部分 */
      currentMain: null,
      currentChoose: 1,
      searchFormData: {
        timeRange: [moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00', moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'],
      },
      formConfig: {
        form: [
          {
            type: 'date-time-range2',
            prop: 'timeRange'
          },
          {
            type: 'btn',
            name: '查询'
          }
        ]
      },
      // IsRealTime: true,
      switchText: '实时',
      xColumnList: [
        {
          label: '错误类型',
          prop: 'ErrorType',
        },
        {
          label: '起始点',
          prop: 'Start',
        },
        {
          label: '点个数',
          prop: 'Number',
        },
      ],
      rColumnList: [
        {
          label: '错误类型',
          prop: 'ErrorType',
        },
        {
          label: '起始点',
          prop: 'Start',
        },
        {
          label: '点个数',
          prop: 'Number',
        },
      ],
      /* 弹窗 */
      diffShow: false,
      alarmConfirmShow: false,
      alarmSettingShow: false,
      alarmRecordShow: false,
      sampleShow: false,
      /* 数据 */
      infoData: {
        Average: null,
        Sigma: null,
        Cp: null,
        Cpk: null,
        Ppm: null,
        Usl: null,
        Lsl: null,
        XDatas: [],
        BarDatas: [],
        SPCConfigId: "",
        StartDateTime: "",
        EndDateTime: "",
        AbnormalModes: [],
        IsRealTime: true,
        RErrors: null,
        RPoints: null,
        XErrors: null,
        XPoints: null,
        LineData1: {
          xData: [],  //x轴数据
          markLineData: [],    //4条标线数据
          lineData: {
            name: "",
            data: [],
            info: []
          }
        },
        LineData2: {
          xData: [],  //x轴数据
          markLineData: [],    //4条标线数据
          lineData: {
            name: "",
            data: [],
            info: []
          }
        },
        LineDatas: []
      },
      timer: null,
      // 权限
      powerBtn: {
        spcDatas: {
          export: false,
          alarmConfirm: false,
          alarmRecord: false,
          alarmSetting: false,
          search: false,
          sample: false,
        },
      },
    }
  },
  mounted() {
    if (this.$route.query.SPCConfigId) {
      this.currentMain = this.$route.query.SPCConfigId
      this.changeMain(this.currentMain)
    }
    this.getSPCSettingData()
    this.renderChart(this.currentChoose)
    window.addEventListener("resize", () => {
        let lineChart1 = this.$echarts.getInstanceByDom(document.getElementById('lineChart1'))
        if (lineChart1 === undefined) {
          lineChart1 = this.$echarts.init(document.getElementById('lineChart1'))
        }
        let lineChart2 = this.$echarts.getInstanceByDom(document.getElementById('lineChart2'))
        if (lineChart2 === undefined) {
          lineChart2 = this.$echarts.init(document.getElementById('lineChart2'))
        }
        let barChart = this.$echarts.getInstanceByDom(document.getElementById('barChart'))
        if (barChart === undefined) {
          barChart = this.$echarts.init(document.getElementById('barChart'))
        }
        lineChart1.resize()
        lineChart2.resize()
        barChart.resize()
    })
  },
  created() {
    // 获取权限
    this.getPower()
  },
  methods: {
    // 权限
    getPower() {
      let $this = this
      getRightTree().then(res => {
        let powers = res.data.data
        let btnObj = {}
        let buttonarr = findPathByLeafId(getUrlParam('id'), powers)[0].Children
        buttonarr.forEach((item) => {
          btnObj[item.RightDesc] = item
        });
        $this.powerBtn.spcDatas = {
          exportId: btnObj['SPC分析-导出报告'].RightID,
          alarmConfirmId: btnObj['SPC分析-报警确认'].RightID,
          alarmRecordId: btnObj['SPC分析-报警记录'].RightID,
          alarmSettingId: btnObj['SPC分析-报警设置'].RightID,
          searchId: btnObj['SPC分析-查询'].RightID,
          sampleId: btnObj['SPC分析-样本数据'].RightID,
        }

        let userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
          userid = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
        } else {
          userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        /* 获取按钮权限 */
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.exportId, 'spcDatas', 'export')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.alarmConfirmId, 'spcDatas', 'alarmConfirm')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.alarmRecordId, 'spcDatas', 'alarmRecord')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.alarmSettingId, 'spcDatas', 'alarmSetting')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.searchId, 'spcDatas', 'search')
        $this.getPowerBtn(userid, $this.powerBtn.spcDatas.sampleId, 'spcDatas', 'sample')
      })
    },
    getPowerBtn(userid, btnId, prop, innerProp) {
      let $this = this
      getPowerById(userid, btnId).then(res => {
        $this.powerBtn[prop][innerProp] = res.data.data
      })
    },
    handleFocus() {
      clearInterval(this.timer)
    },
    changeLimit() {
      let $this = this
      EditSPCConfigLimit(this.currentMain, this.infoData.Usl, this.infoData.Lsl).then(res => {
        if (res.data.IsSuccess) {
          $this.message_Success($this, '修改成功')
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
        $this.getSPCData(this.currentMain)
      })
    },
    getSPCSettingData() {
      let postData = {
        PageNum: 1,
        PageSize: 9999,
        Payload: {
          KeyWord: ''
        }
      }
      let $this = this
      GetSPCConfig(postData).then(res => {
        if (res.data.IsSuccess) {
          this.mianLeftItems = res.data.Data.Result.map(item => ({
            label: item.ParameterName,
            value: item.SPCConfigId
          }))
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    exportReport() {
      if (!this.powerBtn.spcDatas.export) {
        this.confirm_Pop2(this, '该账户无操作权限！')
        return
      }
      let eleId = ''
      if (this.currentChoose === 1) {
        eleId = document.getElementById('lineChart')
      } else {
        eleId = document.getElementById('barChart')
      }
      let $this = this
      html2canvas(eleId).then(canvas => {
        let imgmap = canvas.toDataURL("image/png")
        let formData = new FormData()
        let blob = this.dataURLtoFile(imgmap, 'image/jpeg')
        let fileOfBlob = new File([blob], new Date()+'.jpg')
        formData.append('file', fileOfBlob)
        if ($this.infoData.IsRealTime) { // 实时导出
          ExportSPCReport($this.infoData.SPCConfigId, $this.infoData.IsRealTime, '0001-01-01', '0001-01-01', formData).then(res => {
            if (res.status === 200) {
              $this.downloadFile(res.data, `样本数据.xlsx`)
            } else {
              $this.confirm_Pop2($this, res.data.Msg)
            }
          })
        } else {  // 历史导出
          ExportSPCReport($this.infoData.SPCConfigId, $this.infoData.IsRealTime, $this.searchFormData.timeRange[0], this.searchFormData.timeRange[1], formData).then(res => {
            if (res.status === 200) {
              $this.downloadFile(res.data, `样本数据.xlsx`)
            } else {
              $this.confirm_Pop2($this, res.data.Msg)
            }
          })
        }
    });
    },
    dataURLtoFile(dataURI, type) {
      let binary = atob(dataURI.split(',')[1]);
      let array = [];
      for(let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type:type });
    },
    confirmAlarm() {
      if (!this.powerBtn.spcDatas.alarmConfirm) {
        this.confirm_Pop2(this, '该账户无操作权限！')
        return
      }
      clearInterval(this.timer)
      this.alarmConfirmShow = true
    },
    alarmConfirmClose() {
      if (this.currentMain !== null) {
        this.getSPCData(this.currentMain)
      }
      this.alarmConfirmShow = false
    },
    alarmSetting() {
      if (!this.powerBtn.spcDatas.alarmSetting) {
        this.confirm_Pop2(this, '该账户无操作权限！')
        return
      }
      this.alarmSettingShow = true
    },
    alarmSettingConfirm(data) {
      let $this = this
      SetWarnInfo(data).then(res => {
        if (res.data.IsSuccess) {
          $this.message_Success($this, '设置成功')
          $this.alarmSettingClose()
        } else {
          $this.confirm_Pop2($this, res.data.Msg)
        }
      })
    },
    alarmSettingClose() {
      this.alarmSettingShow = false
    },
    alarmRecord() {
      if (!this.powerBtn.spcDatas.alarmRecord) {
        this.confirm_Pop2(this, '该账户无操作权限！')
        return
      }
      this.alarmRecordShow = true
    },
    alarmRecordClose() {
      this.alarmRecordShow = false
    },
    openSamplePop() {
      if (!this.powerBtn.spcDatas.sample) {
        this.confirm_Pop2(this, '该账户无操作！')
        return
      }
      this.sampleShow = true
    },
    sampleClose() {
      this.sampleShow = false
    },
    openDiffPop() {
      this.diffShow = true
    },
    diffClose() {
      this.diffShow = false
    },
    renderXRCharts(lineData1, lineData2) {
      // 基于准备好的dom，初始化echarts实例
      let lineChart1 = this.$echarts.getInstanceByDom(document.getElementById('lineChart1'))
      if (lineChart1 === undefined) {
         lineChart1 = this.$echarts.init(document.getElementById('lineChart1'))
      }
      let lineChart2 = this.$echarts.getInstanceByDom(document.getElementById('lineChart2'))
      if (lineChart2 === undefined) {
         lineChart2 = this.$echarts.init(document.getElementById('lineChart2'))
      }
      let markLineData1 = [] // 渲染x管制图 标线以及标线颜色
      lineData1.markLineData.forEach(item => {
        if (item.name === 'LSL') {
          markLineData1.push({
            yAxis: item.value,
            lineStyle:{
              type:"dashed",
              width: 2,
              color:"#9E2D2D"
            }
          })
        }
        if (item.name === '中心线') {
          markLineData1.push({
            yAxis: item.value,
            lineStyle:{
              type:"dashed",
              width: 2,
              color:"#95F204"
            }
          })
        }
        if (item.name === 'USL') {
          markLineData1.push({
            yAxis: item.value,
            lineStyle:{
              type:"dashed",
              width: 2,
              color:"#E0BBBB"
            }
          })
        }
      })

      let markLineData2 = [] // 渲染R管制图 标线以及标线颜色
      lineData2.markLineData.forEach(item => {
        if (item.name === 'LSL') {
          markLineData2.push({
            yAxis: item.value,
            lineStyle:{
              type:"dashed",
              width: 2,
              color:"#9E2D2D"
            }
          })
        }
        if (item.name === '中心线') {
          markLineData2.push({
            yAxis: item.value,
            lineStyle:{
              type:"dashed",
              width: 2,
              color:"#95F204"
            }
          })
        }
        if (item.name === 'USL') {
          markLineData2.push({
            yAxis: item.value,
            lineStyle:{
              type:"dashed",
              width: 2,
              color:"#E0BBBB"
            }
          })
        }
      })
      let seriesData1 = lineData1.lineData.info.map(item => (
        item.data
      ))
      let seriesData2 = lineData2.lineData.info.map(item => (
        item.data
      ))
      // 指定图表的配置项和数据
      var option1 = {
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {
                show: true,
                onclick: () => {
                }
            },
          }
        },
        tooltip: {
          formatter: function (params) {
            if (params.componentType === 'series') {
              if ([0, 1, 2].includes(params.dataIndex)) {
                return ''
              }
              if (params.value > 100 &&  params.value < 250) {
                return `${params.value}`
              } else {
                return `${params.value}`
              }
            }
            if (params.componentType === 'markLine') {
              if (params.borderColor === '#9E2D2D') {
                return `LSL：${params.value}`
              }
              if (params.borderColor === '#95F204') {
                return `中心线：${params.value}`
              }
              if (params.borderColor === '#E0BBBB') {
                return `USL：${params.value}`
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: lineData1.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: seriesData1,
            type: 'line',
            name: lineData1.lineData.name,
            symbolSize: 10,
            symbol: 'circle',
            itemStyle : {
              color:function(params){
                let maxVal = 0
                let minVal = 0
                lineData1.markLineData.forEach(item => {
                  if (item.name === 'LSL') {
                    minVal = item.value
                  }
                  if (item.name === 'USL') {
                    maxVal = item.value
                  }
                })
                if (lineData1.lineData.info[params.dataIndex].state) {
                  return "#D9001B";
                }
                return "#5C7BD9";
              }
            },
            label: {
              show: true,
              position: 'top'
            },
            markLine: {
              symbol:"none",    //去掉标线最后面的箭头
              data: markLineData1,
            }
          }
        ],
        grid: {
          left: '70px',
          right: '70px',
        }
      }

      var option2 = {
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: { show: true },
          }
        },
        tooltip: {
          formatter: function (params) {
            if (params.componentType === 'series') {
              if ([0, 1, 2].includes(params.dataIndex)) {
                return ''
              }
              if (params.value > 100 &&  params.value < 250) {
                return `${params.value}`
              } else {
                return `${params.value}`
              }
            }
            if (params.componentType === 'markLine') {
              if (params.borderColor === '#9E2D2D') {
                return `LSL：${params.value}`
              }
              if (params.borderColor === '#95F204') {
                return `中心线：${params.value}`
              }
              if (params.borderColor === '#E0BBBB') {
                return `USL：${params.value}`
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: lineData2.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: seriesData2,
            type: 'line',
            name: lineData2.lineData.name,
            symbolSize: 10,
            symbol: 'circle',
            itemStyle : {
              color:function(params){
                let maxVal = 0
                let minVal = 0
                lineData2.markLineData.forEach(item => {
                  if (item.name === 'LSL') {
                    minVal = item.value
                  }
                  if (item.name === 'USL') {
                    maxVal = item.value
                  }
                })
                if (lineData2.lineData.info[params.dataIndex].state) {
                  return "#D9001B";
                }
                return "#5C7BD9";
              }
            },
            label: {
              show: true,
              position: 'top'
            },
            markLine: {
              symbol:"none",    //去掉标线最后面的箭头
              data:  markLineData2
            }
          }
        ],
        grid: {
          left: '70px',
          right: '70px',
        }
      }

      // 使用刚指定的配置项和数据显示图表。
      lineChart1.setOption(option1, true);
      lineChart2.setOption(option2, true);
      lineChart1.resize()
      lineChart2.resize()
    },
    renderBarChart(chartData) {
      let barChart = this.$echarts.getInstanceByDom(document.getElementById('barChart'))
      if (barChart === undefined) {
         barChart = this.$echarts.init(document.getElementById('barChart'))
      }
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        color: '#5C8CDA',
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {
              show: true,
              onclick: () => {
              }
            },
          }
        },
        xAxis: [
          {
            type: 'category',
            data: chartData.xData,
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
          }
        ],
        series: [
          {
            type: 'bar',
            data: chartData.barData
          },
          {
            type: 'line',
            yAxisIndex: 1,
            data: chartData.lineData,
            itemStyle: {
              color: '#3FC1D5'
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      barChart.setOption(option, true);
      barChart.resize()
    },
    switchChange(val) {
      if (val) {
        this.switchText = '实时'
        this.getSPCData(this.currentMain)
      } else {
        this.switchText = '历史'
        clearInterval(this.timer)
      }
    },
    changeItem(value) {
      let index = this.currentItems.findIndex(f => f === value)
      if (index === -1) {
        this.currentItems.push(value)
      } else {
        this.currentItems.splice(index, 1)
      }
    },
    changeMain(value) {
      this.currentMain = value
      // clearInterval(this.timer)
      this.getSPCData(value)
    },
    getSPCData(id) {
      let postData = {}
      clearInterval(this.timer)
      if (this.infoData.IsRealTime) {
        postData = {
          SPCConfigId: id,
          IsXR: this.currentChoose === 1 ? true : false,
          IsRealTime: this.infoData.IsRealTime,
          AbnormalModes: this.currentItems
        }
        this.getSPCAnalysisData(postData)
        this.timer = setInterval(() => {
          postData = {
            SPCConfigId: id,
            IsXR: this.currentChoose === 1 ? true : false,
            IsRealTime: this.infoData.IsRealTime,
            AbnormalModes: this.currentItems
          }
          this.getSPCAnalysisData(postData)
        }, 1000)
      } else {
        // clearInterval(this.timer)
        postData = {
          SPCConfigId: id,
          IsXR: this.currentChoose === 1 ? true : false,
          IsRealTime: this.infoData.IsRealTime,
          StartDateTime: this.searchFormData.timeRange[0],
          EndDateTime: this.searchFormData.timeRange[1],
          AbnormalModes: this.currentItems
        }
        this.getSPCAnalysisData(postData)
      }
    },
    getSPCAnalysisData(postData) {
      let $this = this
      SPCAnalysis(postData).then(res => {
        if (res.data.IsSuccess) {
          /* 造图表数据 */
          $this.infoData.Average = res.data.Data.Average
          $this.infoData.Sigma = res.data.Data.Sigma
          $this.infoData.Cp = res.data.Data.Cp
          $this.infoData.Cpk = res.data.Data.Cpk
          $this.infoData.Ppm = res.data.Data.Ppm
          $this.infoData.Usl = res.data.Data.Usl
          $this.infoData.Lsl = res.data.Data.Lsl
          $this.infoData.XDatas = res.data.Data.XDatas
          $this.infoData.BarDatas = res.data.Data.BarDatas
          $this.infoData.SPCConfigId = res.data.Data.SPCConfigId
          $this.infoData.StartDateTime = res.data.Data.StartDateTime
          $this.infoData.EndDateTime = res.data.Data.EndDateTime
          $this.infoData.AbnormalModes = res.data.Data.AbnormalModes
          $this.infoData.RErrors = res.data.Data.RErrors ? res.data.Data.RErrors : null
          $this.infoData.RPoints = res.data.Data.RPoints ? res.data.Data.RPoints : null
          $this.infoData.XErrors = res.data.Data.XErrors ? res.data.Data.XErrors : null
          $this.infoData.XPoints = res.data.Data.XPoints ? res.data.Data.XPoints : null
          $this.infoData.LineDatas = res.data.Data.LineDatas ? res.data.Data.LineDatas : []
          if (res.data.Data.LineData1) {
            $this.infoData.LineData1 = res.data.Data.LineData1
          }
          if (res.data.Data.LineData2) {
            $this.infoData.LineData2 = res.data.Data.LineData2
          }
          if (res.data.Data.IsPopUp) {
            clearInterval(this.timer)
            $this.alarmConfirmShow = true
          }
        } else {
          $this.clearChartInfoData()
          $this.confirm_Pop2($this, res.data.Msg)
        }
        $this.renderChart($this.currentChoose)
      })
    },
    clearChartInfoData() {
      this.infoData.LineData1 = {
        xData: [],  //x轴数据
        markLineData: [],    //4条标线数据
        lineData: {
          name: "",
          data: [],
          info: []
        }
      }
      this.infoData.LineData2 = {
        xData: [],  //x轴数据
        markLineData: [],    //4条标线数据
        lineData: {
          name: "",
          data: [],
          info: []
        }
      }
      this.infoData.BarDatas = []
      this.infoData.XDatas = []
      this.infoData.LineDatas = []
    },
    renderChart(value) {
      let $this = this
      if (value === 1) {
        this.$nextTick(() => {
          // if ($this.infoData.LineData1) {
          $this.renderXRCharts($this.infoData.LineData1, $this.infoData.LineData2)
          // }
        })
      }
      if (value === 2) {
        this.$nextTick(() => {
          // if ($this.infoData.BarDatas) {
            let postData = {
              xData: $this.infoData.XDatas,
              barData: $this.infoData.BarDatas,
              lineData: $this.infoData.LineDatas
            }
            $this.renderBarChart(postData)
          // }
        })
      }
    },
    changeChoose(value) {
      this.currentChoose = value
      // clearInterval(this.timer)
      this.getSPCData(this.currentMain)
    },
    searchData() {
      if (!this.powerBtn.spcDatas.search) {
        this.confirm_Pop2(this, '该账户无操作权限！')
        return
      }
      // clearInterval(this.timer)
      this.getSPCData(this.currentMain)
    },
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-input-number {
  line-height: 34px;
  .el-input__inner {
    text-align: left;
  }
}
::v-deep .el-input {
  .el-input__inner {
    height: 34px;
  }
}
::v-deep .main_switch.el-switch {
  .el-switch__core {
    height: 30px;
    border-radius: 16px;
    &:after {
      top: 1px;
      width: 26px;
      height: 26px;
    }
  }
  &.is-checked .el-switch__core::after {
    margin-left: -28px;
  }
  .el-switch__label--right{
    position:absolute;
    color: #fff;
    right: 17px;
    &.is-active {
      left: 10px;
    }
  }
}
::v-deep .header_search{
  .el-range-editor.el-input__inner {
        height: 34px;
        .el-range__icon {
            line-height: 28px;
        }
        .el-range-separator {
            line-height: 26px;
        }
    }
  .common_button.el-button {
        padding: 7px 35px;
    }
 }

::v-deep .spc_btn.el-button{
  padding: 10px 12px;
  &.is-disabled {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #FFF;
    border-color: #EBEEF5;
  }
}

.spc_btn_confirm.el-button {
    color: #fff;
    border-color: #F59A23;
    background: #F59A23;
}
.page {
  width: 100%;
  height: 100%;
  margin-top: calc(40px + 50px);
  height: calc(100% - 40px - 50px - 30px);
  box-sizing: border-box;
  overflow: auto;
  background: #EEEEEE;
  padding: 10px 20px 10px 20px;
  .container {
    width: 100%;
    height: 100%;
    border: 2px solid #E7E7E7;
    background: #fff;
    box-sizing: border-box;
    padding: 10px 20px 20px 20px;
  }
}

header {
  width: 100%;
  height: 60px;
  background: #DDDDDD;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  .header_left {
    max-width: 75%;
    display: flex;
    overflow: auto;
  }
}

.left_model {
  display: flex;
  align-items: center;
  .header_left_icon {
    width: 22px;
    height: 22px;
    font-size: 16px;
    text-align: center;
    line-height: 22px;
    margin-right: 5px;
    background: #5A6C98;
    display: inline-block;
    color: #fff;
    cursor: pointer;
  }
  .header_left_subtitle {
    margin-right: 20px;
  }
}

.item_li.el-button {
  border-radius: 0;
  border: unset;
  +.item_li.el-button  {
    margin-left: 0px;
    border-left: 1px solid #DDDDDD;
  }
  &:hover {
    // color: #
  }
}
.item_ul {
  height: 35px;
  display: flex;
  .item_li {
    width: 75px;
    display: flex;
    align-items: center;
  }
}
// .item_ul {
//   height: 35px;
//   text-align: center;
//   display: flex;
//   margin-right: 20px;
//   .item_li {
//     width: 75px;
//     cursor: pointer;
//     background: #fff;
//     display: flex;
//     align-items: center;
//     border-right: 1px solid #DDDDDD;
//     &:hover {
//       background: #BEE6FD;
//     }
//   }
// }
.current_item{
  color: #000;
  background: #5A6D98 !important;
  &:hover {
    background: #BEE6FD !important;
  }
}

.current_main {
  background: #8DC6FA;
}

.item_limit {
  width: 190px;
  display: flex;
  align-items: center;
  .item_limit_title {
    width: 60px;
    text-align: center;
  }
  .item_limit_input {
    width: calc(100% - 60px);
  }
}

main {
  width: 100%;
  height: calc(100% - 60px - 10px);
  display: flex;
}
.main_left {
  width: 270px;
  margin-right: 20px;
  border: 1px solid #E7E7E7;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 20px 40px 10px 40px;
}
.main_item {
  width: 100%;
  min-height: 42px;
  margin-bottom: 30px;
  text-align: center;
  border: 1px solid #0080F7;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.main_right {
  width: calc(100% - 270px - 20px);
  background: #E4E4E4;
  display: flex;
}
.chart_wrap {
  width: calc(100% - 360px);
  padding: 20px;
}

.data_wrap {
  width: 360px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.data_first {
  min-height: 34%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  // padding: 0 10px;
}
.data_second {
  height: 33%;
}
.data_item_title {
  height: 50px;
  line-height: 50px;
}
.data_item_wrap {
  height: calc(100% - 50px);
  overflow: auto;
}
.data_third {
  height: 33%;
}
.first_item {
  // width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  .item_label {
    width: 70px;
    text-align: left;
  }
  .item_input {
    width: calc(100% - 70px);
  }
  &+.first_item {
    margin-top: 10px;
  }
}
.chart_wrap_header {
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .wrap_header_left {
    display: flex;
    align-items: center;
    >div + div {
      margin-left: 10px;
    }
  }
}

.chart_wrap_main {
  width: 100%;
  height: calc(100% - 50px - 10px);
}
.xr_chart {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // background: #E4E4E4;
}
.line {
  flex: 1;
  display: flex;
  // overflow: auto;
  overflow: hidden;
}
.line-title {
  width: 90px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
}
.line-tips {
  width: 120px;
  height: 100%;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 14px;
}
.line-tips>div {
  height: 40px;
  display: flex;
  align-items: center;
}
.line-tips>div:first-child {
  margin-top: 40px;
}
.line-chart {
  width: calc(100% - 90px - 120px);
  height: 100%;
  background-color: #FEFEFE;
}
.bar-chart {
  width: 100%;
  height: 100%;
  background-color: #F2F2F2;
}
.bar {
  width: 100%;
  height: 100%;
}

.img_icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.chart_choose {
  // width: 200px;
  // display: flex;
  .el-button {
    border-radius: 0;
    padding: 5px 10px;
    border: 1px solid #707070;
    &:hover {
      background: #BEE6FD;
      color: #606266;
    }
    &.is-disabled {
      color: #C0C4CC;
      cursor: not-allowed;
      background-image: none;
      background-color: #FFF;
    }
  }
  .el-button + .el-button {
    margin-left: 0px;
  }
}

.current_choose_btn.el-button {
  color: #606266;
  background: #00BFBF;
}

</style>