<!--
 * @description: 质量管理图表界面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater" ref="wrap" >
        <div class="linebox"  :class="[{colortip:$store.state.color=='grey'},{fcolor:$store.state.color=='grey'}]">
            <div class="table clearfix">
                <span class="img" @click="kz" :class="{xz:xz==1}">{{lang.QualityManage_ControlGraphUserControl_ControlCharts}}</span>
                <span class="img" @click="cpkfx" :class="{xz:xz==2}">{{lang.QualityManage_ControlGraphUserControl_CpkAnalysisChart}}</span>
                <span class="img" @click="ybfx" :class="{xz:xz==3}">{{lang.QualityManage_ControlGraphUserControl_SampleAnalysisChart}}</span>
                <span class="img" @click="jzyx" :class="{xz:xz==4}">{{lang.QualityManage_ControlGraphUserControl_MeanRunningDiagram}}</span>
                <div class="fr">
                    <el-button class="fr-btn" type="mini" @click="saveImage1('img', 'cpk')"><span class="sq">{{lang.QualityManage_ControlGraphWindow_ProductionReport}}</span></el-button>
                    <div class="query" @click="cpk"><span class="sq">{{lang.QualityManage_ControlGraphUserControl_Back}}</span></div>
                </div>
            </div>
        
            <div class="wantimg" >
                <div class="sadimg" ref="img1">
            <div class="bc">
              
            <div class="img bol" :style="{width: '100%', height: 'calc(100% - 60px)'}" >
                <oneechart
                    :style="{width: '100%', height: '50%'}"
                    :ChartDataItem="ChartDataItem"
                    :ChartDataSource="ChartDataSource"
                    :ChartCalResult="ChartCalResult"
                    v-if="xz == 1"
                ></oneechart>
                <twoechart
                    :style="{width: '100%', height: '50%'}"
                    :ChartDataItem="ChartDataItem"
                    :ChartDataSource="ChartDataSource"
                    :ChartCalResult="ChartCalResult"
                    v-if="xz == 1"
                ></twoechart>
                <treeechart
                    :style="{width: '50%', height: '100%'}"
                    :ChartDataItem="ChartDataItem"
                    :ChartDataSource="ChartDataSource"
                    :ChartCalResult="ChartCalResult"
                    v-if="xz == 2"
                ></treeechart>
                <fourechart
                    :style="{width: '100%', height: '100%'}"
                    :ChartDataItem="ChartDataItem"
                    :ChartDataSource="ChartDataSource"
                    :ChartCalResult="ChartCalResult"
                    v-if="xz == 3"
                ></fourechart>
                <fiveechart
                    :style="{width: '100%', height: '100%'}"
                    :ChartDataItem="ChartDataItem"
                    :ChartDataSource="ChartDataSource"
                    :ChartCalResult="ChartCalResult"
                    v-if="xz == 4"
                ></fiveechart>
                <div class="numdata" ref="numdata" v-if="xz == 2">
                    <ul>
                        <li>
                            <div class="head">{{$t('CpkMsg.CpkStatistic')}}</div>
                            <p>
                                {{$t('CpkMsg.CpkSampleValue')}}
                                <span>{{numdata.b_samplenumber}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkAverage')}}
                                <span>{{numdata.b_mean}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkMaximum')}}
                                <span>{{numdata.b_max}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkMinimum')}}
                                <span>{{numdata.b_min}}</span>
                            </p>
                        </li>
                        <li>
                            <div class="head">{{$t('CpkMsg.CpkConstant')}}</div>
                            <p>
                                {{$t('CpkMsg.CpkSubgroupSize')}}
                                <span>{{data1.PrSampleNumber}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkLowerSpecificationLimit')}}
                                <span>{{data1.PrDownLimit}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkTargetValue')}}
                                <span>{{data1.PrgoalValue}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkUpperSpecificationLimit')}}
                                <span>{{data1.PrUpLimit}}</span>
                            </p>
                        </li>
                        <li>
                            <div class="head">{{$t('CpkMsg.CpkStationCapacityWithinGroup')}}</div>
                            <p>
                                Cp
                                <span>{{numdata.m_cp}}</span>
                            </p>
                            <p>
                                CPL
                                <span>{{numdata.m_cpl}}</span>
                            </p>
                            <p>
                                CPU
                                <span>{{numdata.m_cpu}}</span>
                            </p>
                            <p>
                                Cpk
                                <span>{{numdata.m_cpk}}</span>
                            </p>
                        </li>
                        <li>
                            <div class="head">{{$t('CpkMsg.CpkStationCapacityEntirety')}}</div>
                            <p>
                                Pp
                                <span>{{numdata.p_pp}}</span>
                            </p>
                            <p>
                                PPL
                                <span>{{numdata.p_ppl}}</span>
                            </p>
                            <p>
                                PPU
                                <span>{{numdata.p_ppu}}</span>
                            </p>
                            <p>
                                Ppk
                                <span>{{numdata.p_ppk}}</span>
                            </p>
                        </li>
                        <li class="ts">
                            <div class="head">{{$t('CpkMsg.CpkCalculated')}}</div>
                            <p>
                                {{$t('CpkMsg.CpkStandardDeviationInterblock')}}
                                <span>{{numdata.zout_sigma}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkStandardDeviationIntraClass')}}
                                <span>{{numdata.zin_sigma}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkStandardDeviationGroup')}}
                                <span>{{numdata.zoutzinsigma}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkStandardDeviationEntirety')}}
                                <span>{{numdata.p_sigma}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkPlus3StandardDeviation')}}
                                <span>{{numdata.zthree_sigma}}</span>
                            </p>
                            <p>
                                {{$t('CpkMsg.CpkMinus3StandardDeviation')}}
                                <span>{{numdata.fthree_sigma}}</span>
                            </p>
                        </li>
                        <li class="shang">
                            <div class="head">{{$t('CpkMsg.CpkMeasuredPerformance')}}</div>
                            <p>
                                PPM &lt; LSL
                                <span>{{numdata.p_ppmlslo}}</span>
                            </p>
                            <p>
                                PPM &gt; USL
                                <span>{{numdata.p_ppmuslo}}</span>
                            </p>
                            <p>
                                PPM Total
                                <span>{{numdata.p_ppmtotalo}}</span>
                            </p>
                        </li>
                        <li  class="shang">
                            <div class="head">{{$t('CpkMsg.CpkExpectedPerformanceWithinGroup')}}</div>
                            <p>
                                PPM &lt; LSL
                                <span>{{numdata.p_ppmlsle}}</span>
                            </p>
                            <p>
                                PPM &gt; USL
                                <span>{{numdata.p_ppmusle}}</span>
                            </p>
                            <p>
                                PPM Total
                                <span>{{numdata.p_ppmtotale}}</span>
                            </p>
                        </li>
                        <li  class="shang">
                            <div class="head">{{$t('CpkMsg.CpkExpectedPerformanceEntirety')}}</div>
                            <p>
                                PPM &lt; LSL
                                <span>{{numdata.p_ppmlslw}}</span>
                            </p>
                            <p>
                                PPM &gt; USL
                                <span>{{numdata.p_ppmuslw}}</span>
                            </p>
                            <p>
                                PPM Total
                                <span>{{numdata.p_ppmtotalw}}</span>
                            </p>
                        </li>
                        <li  class="shang">
                            <div class="head">{{$t('CpkMsg.CpkOtherValues')}}</div>
                            <p>
                                Ca &lt; LSL
                                <span>{{numdata.p_ca}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                </div>
                     </div>

                <div class="tabledata tabledata10" ref="img" v-show="dimg">
                    <el-table
                        :data="data.SampleList"
                        height="100%"
                        width="100%"
                        stripe
                        border
                        ref="multipleTable"
                        @row-click="a123"
                       :header-cell-style="{background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',color:($store.state.color=='grey')?'#000':'#fff','border-left':'1px solid #cccccc',height:'50px',padding:'0'}"
                    >
                        <template slot="empty">
                            <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                        </template>
                        <el-table-column prop="number" :label="$t('CpkMsg.CpkSerialNumber')"></el-table-column>
                        <el-table-column  v-for="(item,index) in data.SampleList[0].datasource" :key='index' :label="$t('CpkMsg.CpkSample')+(index+1)" width="250">
                            <template slot-scope="scope">
           <span >{{scope.row.datasource[index].value}}</span>
          </template>
        
                        </el-table-column>
                        <el-table-column prop="isoutrule" :label="$t('CpkMsg.CpkStatus')" >
                        </el-table-column>
                        <el-table-column prop="mean" :label="$t('CpkMsg.CpkAverage')" ></el-table-column>
                        <el-table-column prop="range" :label="$t('CpkMsg.CpkPoorValue')"></el-table-column>
                        <el-table-column prop="ste" :label="$t('CpkMsg.CpkStandard')"></el-table-column>
                        <el-table-column prop="max" :label="$t('CpkMsg.CpkMaximum')"></el-table-column>
                        <el-table-column prop="min" :label="$t('CpkMsg.CpkMinimum')"></el-table-column>
                    </el-table>
                </div>
                    <div class="tabledata11"  v-show="!dimg">
                    <el-table
                        :data="data.SampleList"
                        height="100%"
                        width="100%"
                        stripe
                        border
                        @row-click="a123"
                       :header-cell-style="{background:($store.state.color=='grey')?'#D9DBDE':'#5a6c98',color:($store.state.color=='grey')?'#000':'#fff','border-left':'1px solid #cccccc',height:'50px',padding:'0'}"
                    >
                        <el-table-column prop="number" :label="$t('CpkMsg.CpkSerialNumber')"></el-table-column>
                        <el-table-column  v-for="(item,index) in data.SampleList[0].datasource" :key='index' :label="$t('CpkMsg.CpkSample')+(index+1)" >
                            <template slot-scope="scope">
           <span >{{scope.row.datasource[index].value}}</span>
          </template>
        
                        </el-table-column>
                        <el-table-column prop="isoutrule" :label="$t('CpkMsg.CpkStatus')" >
                        </el-table-column>
                        <el-table-column prop="mean" :label="$t('CpkMsg.CpkAverage')" ></el-table-column>
                        <el-table-column prop="range" :label="$t('CpkMsg.CpkPoorValue')"></el-table-column>
                        <el-table-column prop="ste" :label="$t('CpkMsg.CpkStandard')"></el-table-column>
                        <el-table-column prop="max" :label="$t('CpkMsg.CpkMaximum')"></el-table-column>
                        <el-table-column prop="min" :label="$t('CpkMsg.CpkMinimum')"></el-table-column>
                    </el-table>
                </div>
       </div>
       </div>
        </div>
     
    </div>
</template>

<script>
// vue文件中引入echarts工具
import html2canvas from 'html2canvas';
import oneechart from './oneechart.vue';
import fourechart from './fourechart';
import twoechart from './twoechart';
import treeechart from './treeechart';
import fiveechart from './fiveechart';
var echarts = require('echarts/lib/echarts');
import ecStat from 'echarts-stat';
require('echarts/lib/chart/line');
// 以下的组件按需引入
require('echarts/lib/component/tooltip'); // tooltip组件
require('echarts/lib/component/title'); //  title组件
require('echarts/lib/component/legend'); // legend组件
export default {
    name: 'tapwater',
    components: {
        oneechart,
        twoechart,
        treeechart,
        fourechart,
        fiveechart
    },
    data() {
        return {
            w:'',
            xz: 1,
            data: '',
            option: {},
            all: '显示选中',
            tipchange1: false,
            tip: 'noData',
            w1: '',
            gth: require('../../assets/images/gth.png'),
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            tablenames: '',
            Meter: '',
            chardata: '',
            a: true,
            b: true,
            c: true,
            d: true,
            couponSelected: '',
            starttime: '',
            endtime: '',
            change: 2,
            tableData: [],
            hasnum: 1,
            sum: 0,
            Number1: '',
            dimg:false,
            tabledata1: '',
            wanttable: [],
            data1: {
                PrSampleNumber: 0,
                PrDownLimit: 0,
                PrgoalValue: 0,
                PrUpLimit: 0
            },
            ChartDataSource: [],
            ChartDataItem: '',
            ChartCalResult: '',
            pmean:0,
            jicha:0,
            numdata: {
                b_max: '0',
                b_mean: '0',
                b_min: '0',
                b_samplenumber: '0',
                fthree_sigma: '0',
                m_cp: '0',
                m_cpk: '0',
                m_cpl: '0',
                m_cpu: '0',
                m_lslr: '0',
                m_lslx: '0',
                m_means: '0',
                m_rs: '0',
                m_uslr: '0',
                m_uslx: '0',
                p_ca: '30',
                p_pp: '0',
                p_ppk: '0',
                p_ppl: '0',
                p_ppu: '0',
                p_sigma: '0',
                zin_sigma: '0',
                zout_sigma: '0',
                zoutzinsigma: '0',
                zthree_sigma: '0'
            },
            wimg1:'',
            wimg2:'',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
        };
    },

    methods: {
        getLangData() {
            this.all = this.lang.QualityManage_HT_SampleChoseUserControlViewModel_DisplaySelected
        },
        a123(a,b){
        console.log(a);
        console.log(b);
        },
        jzyx() {
            this.xz = 4;
        },
        ybfx() {
            this.xz = 3;
        },
        cpkfx() {
            this.xz = 2;
            this.$nextTick(() => {
                if (this.$refs.numdata) {
                    if( this.zoomValue<1){
 this.$refs.numdata.style.zoom =  this.zoomValue
                    }
                   
                }
            })
        },

        dataURLToBlob(dataurl) {
            let arr = dataurl.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        /*保存图片的方法（即按钮点击触发的方法）   
          第一个参数为需要保存的div的id名  
          第二个参数为保存图片的名称 */
        saveImage1(divText, imgText) {
            this.dimg = true
            document.getElementsByClassName("sadimg")[0].style.width = this.data.SampleList[0].datasource.length*250+1700+"px";
            setTimeout(()=>{
  let canvasID = this.$refs.img1;
            let that = this;
            let a = document.createElement('a');
            html2canvas(canvasID).then(canvas => {
                // console.log(a)
                // let b = a.toDataURL("image/png")
                // let b1 = b.indexOf(",")
                // this.w1 = b.slice(b1+1,b.length);
                // console.log(b)
                let dom = document.body.appendChild(canvas);
                dom.style.display = 'none';
                a.style.display = 'none';
                document.body.removeChild(dom);
                let blob = that.dataURLToBlob(dom.toDataURL('image/png'));
                a.setAttribute('href', URL.createObjectURL(blob));
                //这块是保存图片操作  可以设置保存的图片的信息
           
                a.setAttribute('download', imgText + '.png');
                document.body.appendChild(a);
                a.click();
                  document.getElementsByClassName("sadimg")[0].style.width = "100%";
                URL.revokeObjectURL(blob);
                document.body.removeChild(a);
                console.log(blob);
                // this.wimg2 = a.href;
              
                console.log(a.href)
            });
              that.dimg = false
            },10)
          
        },
//     drawAndShareImage(){
//     var canvas = document.createElement("canvas");
//     canvas.width = document.getElementsByClassName("wantimg")[0].style.scrollWidth;
//     canvas.height = document.getElementsByClassName("wantimg")[0].style.scrollHeight;
//     var context = canvas.getContext("2d");

//     context.rect(0 , 0 , canvas.width , canvas.height);
//     context.fillStyle = "#fff";
//     context.fill();

//     var myImage = new Image();
//     myImage.src = this.wimg1;    //背景图片  你自己本地的图片或者在线图片
//     myImage.crossOrigin = 'Anonymous';

//     myImage.onload = function(){
//         context.drawImage(myImage , 0 , 0 , 700 , 700);

//         context.font = "60px Courier New";
//         context.fillText("我是文字",350,450);

//         var myImage2 = new Image();
//         myImage2.src = this.wimg2;   //你自己本地的图片或者在线图片
//         myImage2.crossOrigin = 'Anonymous';
        
//         myImage2.onload = function(){
//             context.drawImage(myImage2 , 175 , 175 , 225 , 225);
//             var base64 = canvas.toDataURL("image/png");  //"image/png" 这里注意一下
//                let a = document.createElement('a');
//                a.setAttribute('href', URL.createObjectURL(base64));
//                 a.setAttribute('download','cpk.png');
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//                 console.log("s",a)
//             // var img = document.getElementById('avatar');

//             // // document.getElementById('avatar').src = base64;
//             // img.setAttribute('src' , base64);
//         }
//     }
// },
         saveImage(divText, imgText) {
            let canvasID = this.$refs.img1;
            let that = this;
            let a = document.createElement('a');
            html2canvas(canvasID).then(canvas => {
                // console.log(a)
                // let b = a.toDataURL("image/png")
                // let b1 = b.indexOf(",")
                // this.w1 = b.slice(b1+1,b.length);
                // console.log(b)
                let dom = document.body.appendChild(canvas);
                dom.style.display = 'none';
                a.style.display = 'none';
                document.body.removeChild(dom);
                let blob = that.dataURLToBlob(dom.toDataURL('image/png').replace("image/png", "image/octet-stream"));
                a.setAttribute('href', URL.createObjectURL(blob));
                //这块是保存图片操作  可以设置保存的图片的信息
           
                a.setAttribute('download', imgText + '.png');
                document.body.appendChild(a);
                // a.click();
                this.wimg1 = a.href;
                URL.revokeObjectURL(blob);
                
                document.body.removeChild(a);
                console.log(blob);
                console.log(a.href)
            });
            this.saveImage1();
            this.$nextTick(()=>{
                this.drawAndShareImage();
            })
        },

        kz() {
            console.log(this.data);
            this.xz = 1;
            // console.log(this.data1);
            // this.$nextTick(function() {
            //     this.intheadchart1();
            //     this.intheadchart2();
            // });
        },

        cpk() {
            // this.$router.go(-1);
            let wantchange3 = JSON.stringify(this.data1);
            this.$router.push({
                path: '/cpk',
                query: { id: wantchange3 }
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
            this.$refs.wrap.style.zoom =  this.zoomValue
            if (this.$refs.numdata) {
                this.$refs.numdata.style.zoom =  this.zoomValue
            }
        })
        this.data = JSON.parse(this.$route.query.id);
        this.data1 = JSON.parse(this.$route.query.id1);
        this.ChartDataItem = this.data1;
        this.ChartCalResult = this.data.CpkCal;
        this.ChartDataSource = this.data.SampleList;
        this.getLangData()
        
        let a = 0;
        let a1 = 0;
        for(a=0;a<this.data.SampleList.length;a++){
            for(a1 = 0;a1<this.data.SampleList[a].datasource.length;a1++){
                if(this.data.SampleList[a].datasource[a1].isoutrule !== ''){
                    this.data.SampleList[a].isoutrule = this.lang.QualityManage_HT_ControlGraphUserControlViewModel_Abnormal
                    break;
                }else{
                    this.data.SampleList[a].isoutrule = this.lang.QualityManage_HT_ControlGraphUserControlViewModel_Normal
                }
            }
        }
        this.numdata = this.data.CpkCal;
        this.xz = 1;
        this.$nextTick(() =>{
//                    this.pmean = 0;
//                 //    var ji = 0
//   for(let i=0;i<this.data.SampleList.length;i++){
//       for(let j=0;j<this.data.SampleList[i].datasource.length;j++){
// this.pmean = this.pmean+Math.pow((parseFloat(this.data.SampleList[i].datasource[j].value)-parseFloat(this.numdata.b_mean)),2)
//       }
//   }
           
    
      
//         this.jicha = this.jicha/parseFloat(this.numdata.b_samplenumber)
//          this.pmean =  this.pmean/(parseFloat(this.numdata.b_samplenumber)-1)
//          this.pmean = Math.sqrt(this.pmean).toFixed(6);
//          this.numdata.zthree_sigma = (this.pmean*3+parseFloat(this.numdata.b_mean)).toFixed(6)
//          this.numdata.fthree_sigma = Math.abs((this.pmean*3-parseFloat(this.numdata.b_mean)).toFixed(6))
//          this.numdata.p_pp =((parseFloat(this.data1.PrUpLimit)-parseFloat(this.data1.PrDownLimit))/6/this.pmean).toFixed(2)
//          this.numdata.p_ppl =((parseFloat(this.numdata.b_mean)-parseFloat(this.data1.PrDownLimit))/3/this.pmean).toFixed(2)
//          this.numdata.p_ppu =((parseFloat(this.data1.PrUpLimit)-parseFloat(this.numdata.b_mean))/3/this.pmean).toFixed(2)
//          if(this.numdata.p_ppu>=this.numdata.p_ppl){
//              this.numdata.p_ppk = this.numdata.p_ppl;
//          }else{
//              this.numdata.p_ppk = this.numdata.p_ppu;
//          }
//           this.ChartCalResult.m_rs = 0
//          if(this.data1.PrSampleNumber == 1){
//              console.log("123",this.data)
//                  for(let i =0;i<this.data.SampleList.length;i++){
//                         if(i<this.data.SampleList.length-1){
                           
//                             this.ChartCalResult.m_rs =  this.ChartCalResult.m_rs+(parseFloat(this.data.SampleList[i+1].datasource[0].value)-parseFloat(this.data.SampleList[i].datasource[0].value))
//                         }
//                  }
//          }else{
//                 for(let i =0;i<this.data.SampleList.length;i++){
                
//                 this.ChartCalResult.m_rs = parseFloat(this.data.SampleList[i].range)+ this.ChartCalResult.m_rs
                 
//             }
//              this.ChartCalResult.m_rs =  this.ChartCalResult.m_rs/this.data.SampleList.length;
//          }
//          if(this.data1.PrSampleNumber == 1||this.data1.PrSampleNumber>10){
//              this.numdata.m_cp = this.numdata.p_pp;
//               this.numdata.m_cpl = this.numdata.p_ppl;
//                this.numdata.m_cpu = this.numdata.p_ppu;
//                 this.numdata.m_cpk = this.numdata.p_ppk;
                
//                 // alert("sad");
               
//          }else{
//             var d2 = [1.13, 1.69, 2.06, 2.33, 2.53, 2.70, 2.85, 2.97, 3.08];
//             // alert("asd1f");
//             for(let i =0;i<this.data.SampleList.length;i++){
                
//                 this.jicha = parseFloat(this.data.SampleList[i].range)+this.jicha
//             }
//             console.log("jv",this.jicha)
//             this.jicha = this.jicha/this.data.SampleList.length;
//             var biaozhucha = this.jicha/d2[this.data1.PrSampleNumber-2]
//             console.log("bb",biaozhucha)
//          this.numdata.m_cp =((parseFloat(this.data1.PrUpLimit)-parseFloat(this.data1.PrDownLimit))/6/biaozhucha).toFixed(2)
//          this.numdata.m_cpl =((parseFloat(this.numdata.b_mean)-parseFloat(this.data1.PrDownLimit))/3/biaozhucha).toFixed(2)
//          this.numdata.m_cpu =((parseFloat(this.data1.PrUpLimit)-parseFloat(this.numdata.b_mean))/3/biaozhucha).toFixed(2)
//             if(this.numdata.m_cpu>=this.numdata.m_cpl){
//              this.numdata.m_cpk = this.numdata.m_cpl;
//          }else{
//              this.numdata.m_cpk = this.numdata.m_cpu;
//          }
//          }
            console.log( document.getElementsByClassName('tabledata')[0].style.width)
           document.getElementsByClassName('tabledata')[0].style.width = this.data.SampleList[0].datasource.length*250+1700+"px";
            document.getElementsByClassName('bc1')[0].style.width = this.data.SampleList[0].datasource.length*250+1700 - 380 + "px";
              console.log( document.getElementsByClassName('tabledata')[0].style.width)
        })
        //   this.kz();
        // this.checked();
    }
};
</script>
<style lang="scss" scoped>
// @import '../../sass/tree.scss';
// @import '~../src/assets/sass/tree.scss';
.time {
    display: inline-block;
}
.sum {
    margin-top: 5px;
    color: #9d9d9d;
}
.fl {
    float: left;
}
.fr {
    float: right;
    .fr-btn {
        width: unset;
        padding: 7px 15px;
    }
}
.clearfix::after {
    content: '';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix {
    zoom: 1;
}
.tapwater {
    position: fixed;
    top: 100px;
    height: calc(100% - 130px);
    padding: 20px;
    width: 100%;
    background-color: #eeeeee;
    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
        overflow: hidden;
    }
    .table {
      
        height: 60px;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;
        .img {
            cursor: pointer;
            font-size: 16px;
            // display: inline-block;
            height: 50px;
            line-height: 50px;
            background-color: #fff;
            text-align: center;
            border: 1px solid #ccc;
            padding:16px 10px;
        }

        .tablename {
            height: 40px;
            width: 250px;
        }
        .tabledatetime {
            height: 40px;
            width: 178px;
        }
        .starttime {
            height: 40px;
            width: 210px;
            display: inline-block;
            margin-left: 18px;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }
        .endtime {
            height: 40px;
            width: 210px;
            display: inline-block;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }
    }
    .query,
    .export {
        display: inline-block;
        height: 40px;
        width: 100px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }
    .query {
        background-color: #4270e4;
        margin-right: 10px;
    }
    .export {
        background-color: #ff6600;
        margin-right: 20px;
    }
    .container {
        display: inline-block;
        height: 40px;
        .block {
            display: inline-block;
        }
    }
    .separate {
        position: relative;
        left: 7px;
    }
}
.tabledata {
    background: #F2F2F2;
    width: calc(100%-20px);
    table {
        width: 100%;
        background-color: #ffffff;
        color: #9d9d9d;
        border-right: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
    }
    .number {
        width: 160px !important;
    }
    .center {
        padding-left: 190px;
    }
    .middle {
        padding: 0 10px;
    }
    .bottomtable {
        border-bottom: 1px solid #cccccc;
    }
}
.tabledata11 {
    background: #F2F2F2;
    width: calc(100%-20px);
    table {
        width: 100%;
        background-color: #ffffff;
        color: #9d9d9d;
        border-right: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
    }
    .number {
        width: 160px !important;
    }
    .center {
        padding-left: 190px;
    }
    .middle {
        padding: 0 10px;
    }
    .bottomtable {
        border-bottom: 1px solid #cccccc;
    }
}
tr {
    height: 40px;
    line-height: 40px;
}
.topline > td {
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
}
select {
    text-indent: 0.5em;
}
.query:hover {
    cursor: pointer;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .tiptop {
        width: 380px;
        height: 40px;
        background-color: #ffbc3d;
        img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
            margin-left: 160px;
        }
        span {
            color: #ffffff;
            position: relative;
            top: -5px;
            margin-left: 7px;
        }
    }
    .tipword {
        width: 100%;
        padding: 30px;
        // text-align: center;
        padding-bottom: 0;
    }
    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }
    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        margin-top: 40px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
        margin-top: 40px;
        margin-left: 25px;
        height: 30px;
        .one {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}
.sji {
    width: 100px !important;
    margin-right: 10px;
}
.line {
    width: 2px;
    height: 38px;
    display: inline-block;
    position: absolute;
    top: 43px;
    background-color: #aaaaaa;
}
.newadd {
    margin-left: 15px;
    background-color: #46be05 !important;
}
.newdel {
    background-color: #999999 !important;
}
.dc {
    background-color: #ffffff !important;
    color: #f6af34 !important;
    border: 2px solid #f6af34 !important;
}
.dr {
    margin-left: 15px;
}
.js {
    background-color: #ffffff !important;
    color: #4abfcd !important;
    border: 2px solid #4abfcd !important;
    margin-left: 15px;
}
.img {
    width: 100%;
    height: calc(100% -60px);
}
.xz {
    background-color: #F2F2F2 !important;
}
.numdata {
    width: 60%;
    padding: 30px;
    height: 50%;
    position: absolute;
  
    top: 0;
   right: 0;
    ul {
        width: 80%;
        position: relative;
        left: 20%;
        li {
            list-style: none;
            margin-right: 20px;
            float: left;
            width: 140px;
            background: #e6e7e7;
            padding: 5px;
            line-height: 30px;
            border: 1px solid #ddd;
            span {
                float: right;
                color: #5fb739;
            }
            p {
                font-size: 12px;
            }
        }
        .head {
            text-align: center;
            font-weight: bold;
        }
    }
}
.img {
    // position: relative;
}
.ts {
    width: 180px !important;
}
.sq{
    font-size: 16px;
}
.shang{
    position: relative;
    top: -40px;
}
.bc{
    width: 100%;
    overflow: hidden;
    height: 380px;
    background: #F2F2F2;
}
.bc1{
    width: 100%;
    overflow: hidden;
    height: 380px;
    position: absolute;
    background: #F2F2F2;
    right: 0;
}
.bol{
    // border: 10px solid #ccc;
    // padding:50px;
    // width: calc(100%  - 100px) !important;
    // height: calc(100%  - 100px) !important;

}
.fcolor {
    color: #000 !important;
    // position: absolute;
    // top: 0;
    // left: 0;
    // margin: auto;
    // width: 100%;
    // display: inline-block;
}
.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
.wantimg{
    overflow: auto;
    position: relative;
    height: calc(100% - 60px);
}
</style>