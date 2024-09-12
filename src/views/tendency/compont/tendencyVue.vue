<!--
 * @Description: 这是单窗口页面（组件）
 * @Date: 2019-11-19 13:57:44
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-09 13:57:42
 * TODO:重构
 -->
<template>
<div v-loading="loading1" class="conterbox container" :class="{blackBlueBg: $store.state.color === 'blackBlue'}">
       <div class="tip" :class="{blackBlueBg: $store.state.color === 'blackBlue'}" ref="kongtiao2" v-show="tipchange" :style="{width: 380*zoom+'px',height:220*zoom+'px'}">
            <div
                class="tiphead"
                style="position:absolute;width: 380px;height: 40px;"
            ></div>
            <div
                class="tiptop"
                :style="{zoom}"
            >
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin" :style="{zoom}">
                <div class="tipword"><span>{{tipword}}</span></div>
                <div class="tipdetermine" @click="tip1">{{lang.MessageBox_Confrim}}</div>
            </div>
        </div>
    <div class="conter_left"  id="mymap" ref="mymap" :style="{fontSize: 16*zoom+'px'}">
        <div v-if="timeShow" class="QXtitle" style="position:absolute;left:50%;top:15px;z-index:99">{{text}}</div>
        <div v-if="!timeShow" class="QXtitle" style="position:absolute;left:38%;top:15px;z-index:99">{{text}} 查询时间{{Sstime1}}{{Eetime1}}</div>
        <div :style="{background: color2,minHeight:'400px', height: 400+'px',width:'100%',zoom:zoom1,position: 'relative'}"><div :style="{width: 100/zoom1+'%', height: '400px',zoom:1/zoom1,transform:'scale('+zoom1+')'}" class="left_top"  ref="tendency" id='qscxchartone'></div></div>
        <div class="left_bottom">
            <div class="bottom_top" :style="{zoom:zoom1}" v-show='!RealShow'>
                <el-tooltip class="item"  popper-class="atooltip" effect="dark" :content="lang.NewTrendChart_SingleChartUC_QueryForward1Hour" placement="top-start">
                <div @mouseenter="atooltip" @click="arrowl('yl')" class="i_left el-icon-d-arrow-left"></div>
                </el-tooltip>
                 <el-tooltip class="item" popper-class="atooltip" effect="dark" :content="lang.NewTrendChart_SingleChartUC_QueryForward1Min" placement="top-start">
                <div @mouseenter="atooltip" @click="arrowl('dl')"  class="i_left2 el-icon-arrow-left"></div>
                 </el-tooltip>
                <div v-if="RealShow" class="text">{{lang.NewTrendChart_SingleChartUCViewModel_RealTimeData}}</div>
                <div v-if="!RealShow" style="font-size:14px" class="text">{{Sstime1}}   {{lang.NewTrendChart_SingleChartUCViewModel_To}}   {{Eetime1}}</div>
                  <el-tooltip class="item" popper-class="atooltip" effect="dark" :content="lang.NewTrendChart_SingleChartUC_QueryBack1Hour" placement="top-start">
                <div @mouseenter="atooltip" @click="arrow('yh')" class="i_right el-icon-d-arrow-right"></div>
                </el-tooltip>
                <el-tooltip class="item" popper-class="atooltip" effect="dark" :content="lang.NewTrendChart_SingleChartUC_QueryBack1Min" placement="top-start">
                <div @mouseenter="atooltip" @click="arrow('dh')" class="i_right2 el-icon-arrow-right"></div>
                 </el-tooltip>
            </div>
            <div class="bottom_top" :style="{zoom:zoom1}" v-show='RealShow'>
                <div @click="arrowl('yl')" class="i_left el-icon-d-arrow-left"></div>
                <div @click="arrowl('dl')"  class="i_left2 el-icon-arrow-left"></div>
                <div v-if="RealShow" class="text">{{lang.NewTrendChart_SingleChartUCViewModel_RealTimeData}}</div>
                <div v-if="!RealShow" style="font-size:14px" class="text">{{Sstime1}}   {{lang.NewTrendChart_SingleChartUCViewModel_To}}   {{Eetime1}}</div>
                <div @click="arrow('yh')" class="i_right el-icon-d-arrow-right"></div>
                <div @click="arrow('dh')" class="i_right2 el-icon-arrow-right"></div>
            </div>
            <div class="bottom_fool test" :style="{background:'#fff !important'}" ref="table">
                 <el-table
                    :porp="Newtime"
                    border
                     :row-style="{ height: 50 * zoom1 + 'px',fontSize: 14*zoom1+'px' }"
                    :style="{ width: '100%',fontSize: 14*zoom1+'px'}"
                    height="100%"
                    class="conterFool_middle"
                    ref="multipleTable"
                    :data="curveArr"
                    prop=Newtime
                    tooltip-effect="dark"
                     :header-cell-style="{
                    background:($store.state.color=='grey')?'#D9DBDE':($store.state.color==='blackBlue' ? '#18254E' : '#5a6c98'),
                    color:($store.state.color=='grey')?'#000':'#fff',
                    'border-left': $store.state.color==='blackBlue' ? '1px solid #304171' : '1px solid #cccccc',
                    height:50*zoom1+'px',
                    fontSize: 14*zoom1+'px',
                    padding:'0'}">
                    <template slot="empty">
                        <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                    </template>
                    <el-table-column
                        :label="lang.NewTrendChart_SingleChartUC_No"
                        prop="Number"
                        :width="80*zoom1">
                    </el-table-column>
                    <el-table-column
                        prop="DisplayName"
                        :label="lang.NewTrendChart_SingleChartUC_Name"
                        :width="150*zoom1">
                        <template slot-scope="scope">
                        <input ref="inpcheck" @click="inpClick(scope.$index)" class="inpcheck" :style="'border:1px solid'+ scope.row.Stroke +';color:' + scope.row.Stroke 
                        + ';position:relative;'+'zoom:'+zoom1" checked="checked" type="checkbox">
                        <span style="margin-left: 10px">{{scope.row.DisplayName}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                        :label="lang.NewTrendChart_SingleChartUC_Description"
                        prop="Description"
                        :width="200*zoom1">
                    </el-table-column>
                    <el-table-column
                        :label="lang.NewTrendChart_SingleChartUC_Unit"
                        prop="Unit"
                        :width="150*zoom1">
                    </el-table-column>
                    <el-table-column
                        :label="lang.NewTrendChart_SingleChartUC_Max"
                        v-if="MaxShow"
                        prop="MaxValue"
                        :width="150*zoom1">
                    </el-table-column>
                    <el-table-column
                        :label="lang.NewTrendChart_SingleChartUC_Min"
                        prop="MinValue"
                        v-if="MinShow"
                        :width="150*zoom1">
                    </el-table-column>
                    <el-table-column
                        :label="lang.NewTrendChart_SingleChartUC_Average"
                        prop="numP"
                        v-if="MeanShow"
                        :width="180*zoom1">
                    </el-table-column>
                    <el-table-column
                        :label="lang.NewTrendChart_SingleChartUC_Type"
                        prop="Type"
                        :width="150*zoom1">
                    </el-table-column>
                
                    <el-table-column
                     :min-width="180*zoom1"
                   
                    :render-header="renderHeader">
                        <template  slot-scope="scope">
                            <span :style="'color:' + scope.row.Stroke + '!important;'" style="margin-left: 10px">{{scope.row.Newtext}}</span>
                        </template>
                    </el-table-column>
                </el-table>       
            </div>
        </div>
    </div>
    <div class="conter_right" :style="{zoom:zoom1}">
        <div class="right_head">
            <div @click="tenPop" class="text">{{lang.NewTrendChart_SingleChartUC_ChooseSeries}}</div>
        </div>
        <div class="right_conter">
            <div class="conter_top">
                <div class="top_head">
                    <div class="curve">{{lang.NewTrendChart_SingleChartUC_SeriesGroup}}</div>
                    <div class="operate">{{lang.NewTrendChart_SingleChartUC_Operate}}</div>
                </div>
                <div class="top_middle">
                 <div @click="curveName(index,1,undefind,undefind,undefind,undefind,'表格点击')" class="top_conter" :class="{'current-row': activeRow === index}" v-for="(item,index) in curveID" :key="index">
                  <div class="curvename">{{item.Name}}</div>
                  <div class="curvei">
                      <div @click.stop="edit(item)" class="edit_box">
                        <i class="i_edit"></i>
                      </div>
                      <div @click.stop="delet(item,index)" class="delete_box">
                        <i class="i_delete"></i>
                      </div>
                  </div>
                </div>
                </div>
            </div>
            <div class="conter_fool">
                 <div @click="outImg()" class="fool_out">{{lang.NewTrendChart_SingleChartUC_Export}}</div>
                 <div @click="print()" class="fool_out">{{lang.NewTrendChart_SingleChartUC_Print}}</div>
            </div>
        </div>
    </div>
    <!-- 删除提示弹窗 -->
    <div v-if="deleteShow" class="deletePop" :style="{zoom:zoom1}">
        <div class="title">
            <span class="title_i el-icon-warning"></span>
            <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
        </div>
        <div class="delete_text">{{deleteText}}</div>
        <div v-if="deleteConfigShow" class="delete_btn">
            <div @click="deleteBtn('n')" class="no">{{lang.MessageBox_NO}}</div>
            <div @click="deleteBtn('y')" class="yes">{{lang.MessageBox_YES}}</div>
        </div>
        <div v-if="!deleteConfigShow" class="delete_btn">
            <div @click="deleteBtn('n')" class="deleteConfig">{{lang.MessageBox_Confrim}}</div>
        </div>
    </div>
    <!-- 编辑弹窗 -->
    <tenPop :Name="Namedata" :data="GIDdata" :type="PopType" class="tenpop" v-if="tenPopShow" :style="{width: 1300*zoom+'px',height: 855*zoom+'px'}"></tenPop>
    <!-- <div ref="print" style="width: 720px;height: 500px;position:fixed;top:100px;left:0;">
        <img :src="imgmap" style="width:100%;height:auto"/>
    </div> -->
</div>
</template>

<script>
import html2canvas from "html2canvas"
import tenPop from './tendenConterPop.vue'

  export default {
  name: 'tendencyVue',
  components:{
    tenPop
  },
  props:['curveID','timeShow','Sstime',"Eetime","qeShow","Showtext","WindowClick"],
  data () {
    return {
     gth: require('../../../assets/images/gth.png'),
     tipword:'',
     tipchange:false,
     value3:'',
     curvearrValue:[],
     curveArr:[],
     realArr:[],
     curveLine:[],
     curveLineName:[],
     curveLineColor:[],
     curveLineType:[],
     curveLineValue:[],
     LocalStorage:[],
     curveLineData:[],
     activeRow: 0,
     lineData:[],
     Stime:[],
     serDate:[],
     historyTime:[],
     historyValue:true,
     curveWidth:2,
     curveSyb:null,
     Showindex:0,
     index:undefined,
     text:'',
     RealShow:true,
     CurveNameShow:true,
     lineshow:true,
     time2:false,
     timer:true,
     inpClickShow:true,
     Newtime:'2020-01-01 12:12:12',
     NewText:'',
     NumS:0,
     historyShow:false,
     tenPopShow:false,
     deleteShow:false,
     PopType:'',
     deleteGID:'',//删除id
     deleteText:'是否删除曲线组？',//删除弹窗文本
     deleteConfigShow:true ,//删除弹窗按钮
     GIDdata:'',//曲线组ID
     splitLineShow:true,//网格线
     color2:'',
     MaxShow:true,
     MinShow:true,
     MeanShow:true,
     Namedata:'',
     PopdataArr:[],//查询数组
     PopdataArr1:[],//查询数组
     PopdataShow:false,
     Eetime1:'',//结束时间
     Sstime1:'',//结束时间
     loading1:false,
     myChart:'',
     formatterValue:'{value}',
     zoom:1,
      zoom1:1,
     lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    }
  },
    computed:{
        theme(){
            return this.$store.state.color === 'blackBlue'
        },
    },
  watch:{
    theme(val){
        let newOpt = this.myChart.getOption()
        if(val){
            newOpt.tooltip[0].backgroundColor = '#4B5166'
            newOpt.tooltip[0].borderColor = '#4B5166'
            newOpt.tooltip[0].textStyle.color = '#fff'
        }else{
            newOpt.tooltip[0].backgroundColor = '#fff'
            newOpt.tooltip[0].borderColor = '#333'
            newOpt.tooltip[0].textStyle.color = '#000'
        }
        this.myChart.setOption(newOpt)
    },
      //查询监听
     qeShow(n,o){
         this.axiosHistory()
         this.historyValue = true
         this.loading1 = true
     } ,
   
    //页面初始调用接口
    curveID(n,o){
        this.$nextTick(function(){
            this.curveName(0,1)
        })
    },
    //时间
    Sstime(n,o){
        this.Sstime1 = n
    },
    //比例
    Showtext(n,o){
        // debugger
     if(this.RealShow){
         if(n == 1){
            this.NumS =0 
             clearInterval(this.time2);
             clearInterval(this.timer);
             this.curvearrValue = []
             this.Stime = []
             if(this.curveID.length !=0){
                 this.time2 = window.setInterval(() => {
                 this.getDate()
                },1000)
             }
             this.Showindex = 1
             this.formatterValue = '{value}%'
             this.curveLineValue = []
             this.LocalStorage = []
             this.drawLine(1);
             this.curveName(this.index,1)
         }
         if( n == 0){
             this.NumS =0 
             clearInterval(this.time2);
             clearInterval(this.timer);
             this.curvearrValue = []
             this.Stime = []
             if(this.curveID.length !=0){
                 this.time2 = window.setInterval(() => {
                 this.getDate()
                },1000)
             }
             this.Showindex = 0
              this.formatterValue = '{value}'
             this.curveLineValue = []
             this.LocalStorage = []
             this.drawLine(1);
             this.curveName(this.index,1)
            
         }
     }
     
    },
   //历史实时的监听
      timeShow(n,o){
           if(n){
               this.NumS =0 
               this.RealShow = true
               this.curveLineValue = []
               this.LocalStorage = []
               this.Stime = []
               this.curveLineValue = []
               var ind = this.index
                clearInterval(this.time2);
               clearInterval(this.timer);
               if(this.curveID.length != 0){
                   this.time2 = window.setInterval(() => {
                       this.getDate()
                   },1000)
               }
                if(this.PopdataShow){
                    // 历史
                   this.curveName(ind,0,this.PopdataArr,1,this.PopdataArr1)
                }else{
                    // 实时
                    this.curveName(ind,1)
                }
               this.historyShow = false
           }else{
               this.RealShow = false
               clearInterval(this.time2);
               clearInterval(this.timer);
           }
      },
      CurveNameShow(n,o){
          this.curvearrValue = []
      },
        curveArr(n,o){
            console.log('ss')
        }
  },
 
  created(){
    this.Eetime1 = this.Eetime
    this.Sstime1 = this.Sstime
    this.getLangData()
       if(this.timeShow){
             this.axiosSet()
    } 
  },
    directives: {
            drag: function(el) {
                let dragBox = el; //获取当前元素
                dragBox.onmousedown = e => {
                    //算出鼠标相对元素的位置
                    let disX = e.clientX;
                    let disY = e.clientY - dragBox.offsetTop;
                    document.onmousemove = e => {
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - disX;
                        let top = e.clientY - disY;
                        //移动当前元素
                        dragBox.style.left = left + "px";
                        dragBox.style.top = top + "px";
                    };
                    document.onmouseup = e => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        },
  mounted(){
    this.zoom1 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
     this.zoom = 1
     let that = this
     $('body')[0].addEventListener("mousemove",function(){
         that.atooltip()
     })
    setTimeout(()=>{
        console.log("asdasdsa",$('.conterbox').find('.el-input'))
        $('.conterbox').find('.el-input').css('zoom',this.zoom1)
        $(".el-button--primary,.el-input__inner").css({height: 40*this.zoom+'px',fontSize: 14*this.zoom+'px'})
        $(".el-input__icon").css({lineHeight: 40*this.zoom+'px'})
        $(".el-select-dropdown__item,.el-table").css({fontSize: 14*this.zoom+'px'})
        $(".el-table tr").css({height: 40*this.zoom+'px',fontSize: 14*this.zoom+'px'})
       that.sx()
       this.atooltip()
    })
    var fool = document.querySelectorAll('.fool_conter')
    for(var i=0;i<fool.length;i++){
        if( i % 2 == 0){
            fool[i].style.background = '#fff'
        }
    }
        console.log("asdasdasdsadasdasd11111111")
       
    //图表自适应大小
    this.$nextTick(()=>{
        let that = this;
          window.onresize = ()=> {
              if(document.getElementById('qscxchart1')){
              let chart1 = that.$echarts.init(document.getElementById('qscxchart1'))
                chart1.resize()
              }
                 if(document.getElementById('qscxchart2')){
              let chart1 = that.$echarts.init(document.getElementById('qscxchart2'))
                chart1.resize()
              }
                 if(document.getElementById('qscxchart3')){
              let chart1 = that.$echarts.init(document.getElementById('qscxchart3'))
                chart1.resize()
              }
                 if(document.getElementById('qscxchart4')){
              let chart1 = that.$echarts.init(document.getElementById('qscxchart4'))
                chart1.resize()
              }
                 if(document.getElementById('qscxcharttwo')){
              let chart1 = that.$echarts.init(document.getElementById('qscxcharttwo'))
                chart1.resize()
              }
                 if(document.getElementById('qscxcharttree')){
              let chart1 = that.$echarts.init(document.getElementById('qscxcharttree'))
                chart1.resize()
              }
        // let chart2 = this.$echarts(document.getElementById('qscxchart2'))
        // let chart3 = this.$echarts(document.getElementById('qscxchart3'))
        // let chart4 = this.$echarts(document.getElementById('qscxchart4'))
        // let chart5 = this.$echarts(document.getElementById('qscxcharttwo'))
        // let chart6 = this.$echarts(document.getElementById('qscxcharttree'))
            //   console.log("asdasdasdsadasdasd")
              if(this.myChart){
                  this.myChart.resize()
              }
            //   if(chart1){
            //     
            //   }
            //    if(chart2){
            //       chart2.resize()
            //   }
            //    if(chart3){
            //       chart3.resize()
            //   }
            //    if(chart4){
            //       chart4.resize()
            //   }
            //      if(chart5){
            //       chart5.resize()
            //   }
            //      if(chart6){
            //       chart6.resize()
            //   }
          }
    })
  },
  beforeDestroy(){
       clearInterval(this.time2);
      clearInterval(this.timer);
    },

  destroyed(){
      clearInterval(this.time2);
      clearInterval(this.timer);
  },

  methods: {
      tip1(){
 this.tipchange = false;
  this.loading1 = false
      },
                                        sx(){
                                            
                                        
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.zoom1
            }
            for(let i=0;i<$('.el-select-dropdown').length;i++){
                $('.el-select-dropdown')[i].style.zoom = that.zoom1
            }
            })
              
        },
        atooltip(){
           let that = this
            setTimeout(()=>{
for(let i=0;i<$('.atooltip').length;i++){
                $('.atooltip')[i].style.zoom = that.zoom1
            }
            })
        },
      getLangData() {
          this.deleteText = this.lang.NewTrendChart_SingleChartUCViewModel_WhetherDeleteGroup
      },
      loginShow(){
            this.loading1 = true
      },
     //切换肤色
      rowClass({ row, rowIndex}) {
       return `background:${this.$store.state.color=='grey'?'#D9DBDE !important':''};color:${this.$store.state.color=='grey'?'#000':'#FFF'};
        border-left:'1px solid #cccccc';height:'50*${this.zoom1}px';font-size: '14*${this.zoom1}px';padding:'0'`
     
    },
    echartsResize(){
        if(this.myChart){
            this.myChart.resize()
        }
    },
    //表头时间
    renderHeader (h, { column, $index }) {
     return (
        <el-date-picker
            key={this.$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'}
            popper-class={this.$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'}
            size="mini"
            class="timeLast"
            v-model={this.Newtime}
            type="datetime"
              click={this.sx()}
            onFocus={this.sx}
            disabled={this.RealShow}
            change={this.aaa()}
             blur={this.sx()}
            placeholder="选择日期时间">
        </el-date-picker>
     )
    },

    //表头时间改变
   aaa(){
       this.sx()
       if(this.Newtime.length != 19){
           var year = this.Newtime.getFullYear();        //获取当前月
           var month = this.Newtime.getMonth() + 1;
           var mothe = month > 9 ? month : '0' + month            //获取当前日
           var date = this.Newtime.getDate();
           var da = date >9 ? date : '0' + date
           var h = this.Newtime.getHours(); //获取当前小时数(0-23)
           var he = h > 9 ? h : '0' + h
           var m = this.Newtime.getMinutes(); //获取当前分钟数(0-59)
           var me = m > 9 ? m : '0' + m
           var s = this.Newtime.getSeconds();
           var se = s > 9 ? s : '0' + s
           var str = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se 
           var serDateArr
            if(this.serDate.length !=0){
                serDateArr = JSON.parse(this.serDate)
            }else{
                serDateArr = this.serDate1
            }
            var data3={
                IsProportion:this.Showindex,
                StartTime:this.Sstime,
                EndTime:this.Eetime,
                Series:serDateArr
            }
             this.$axios({
              method:"post",
              url:"/api/NewTrendChart/QuerySerieHistoryPoints",
              data:data3
              }).then((res)=>{
                  if(res.data.code!==0){
                      this.tipword = res.data.msg;
                            setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            return
                  }
                  var data = res.data.data[0].Points
                  for(var i =0 ; i < data.length ; i ++){
                      this.curveArr[i].Newtext = data[i].Value
                  }
              })
       }
   },
    move(name, namehead) {
          //  $(`.${name}`).addClass('center')
           let left = ($(`.${name}`).width())/2+'px'
           let top = ($(`.${name}`).height())/2+'px'
             $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
           $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
                
                console.log(e.target.className.toLocaleLowerCase());
                console.log(namehead)
                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center')
                    window.event.stopPropagation();
                    var x = 0;
                    var y = 0;
                    var l = 0;
                    var t = 0;
                    var isDown = false;
                    x = window.event.clientX;
                    y = window.event.clientY;
                    //获取左部和顶部的偏移量
                    l = $(`.${name}`)[0].offsetLeft;
                    t = $(`.${name}`)[0].offsetTop;
                    //开关打开
                    isDown = true;
                    var pdmove = false;

                     
                    //设置样式
                    $('body')[0].style.cursor = 'move';

                    $('body')[0].addEventListener('mousemove', function(e) {
                        pdmove = true;
                        if (isDown == false) {
                            return;
                        }
                        //获取x和y
                        var nx = window.event.clientX;
                        var ny = window.event.clientY;

                        //计算移动后的左偏移量和顶部的偏移量
                        var nl = nx - (x - l);
                        var nt = ny - (y - t);
                        console.log(nx)
                        console.log(x)
                        console.log(l)
                        $(`.${name}`)[0].style.left = nl + 'px';
                        $(`.${name}`)[0].style.top = nt + 'px';
                    });
                    $('body')[0].addEventListener('mouseup', function(e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
        },
        getColor(color){
            return /^\#/.test(color) && color.length !== 9 ? color : '#' + color.slice(3)
        },
    //请求曲线图表设置
     axiosSet(){
          this.$axios({
          method:"post",
          url:"/api/NewTrendChart/QueryChartSetting",
          }).then((res)=>{
            this.color2 = this.getColor(res.data.data.ChartBackground)
            this.color3 = this.getColor(res.data.data.CursorColor)
            this.color4 = this.getColor(res.data.data.LineColor)
            this.color5 = this.getColor(res.data.data.XForeground)
            this.color6 = this.getColor(res.data.data.YForeground)
            this.value2 = res.data.data.XFontFamily
            this.value3 = res.data.data.YFontFamily
            this.value5 = res.data.data.XFontSize
            this.value6 = res.data.data.YFontSize
            this.XFontIsB = res.data.data.XFontIsB
            this.YFontIsB = res.data.data.YFontIsB
            this.MaxShow = res.data.data.Max
            this.MinShow = res.data.data.Min
            this.MeanShow = res.data.data.Mean
        }).catch(function (error) {
                console.log(error);
        })
     },
    //曲线弹窗
    tenPop(){
        this.$parent.isPower('','选择曲线').then(val=>{
               if(val){
                    this.PopType = 't'
                    this.tenPopShow = true
               }else{
                    this.$parent.openPopFun()
               }
        })
       
    },
    off(){
      this.tenPopShow = false
    },
    //弹出删除弹框
    delet(item,index){
        this.$parent.isPower('','删除').then(val=>{
            if(val){
                let de = document.querySelectorAll('.top_conter')
                this.deleteIndex = index
                this.deleteGID = item.GID
                this.deleteConfigShow = true
                this.deleteShow = true
                this.deleteText = this.lang.NewTrendChart_SingleChartUCViewModel_WhetherDeleteGroup
            }else{
                this.$parent.openPopFun()
            }
        })

    },
    //删除弹框确认与否
    deleteBtn(text){
        if(text == 'y'){
        let de = document.querySelectorAll('.top_conter')
        this.$axios({
        method:"post",
        url:"/api/NewTrendChart/DelSeriesGroup?argSeriesGroupId=" + this.deleteGID + "",
        argSeriesGroupId:this.deleteGID
        }).then((res)=>{
            if(res.data.code == 0){
               this.deleteConfigShow = false
                this.curveID.splice(this.deleteIndex,1)
              this.deleteShow = true
              this.deleteText = this.lang.NewTrendChart_SingleChartUCViewModel_RemoveSuccess
              if(this.curveID == 0){
                  clearInterval(this.time2);
                  clearInterval(this.timer);
                  this.curveArr = []
              }
            }
    }).catch(function (error) {
            console.log(error);
        })

        }
         this.deleteShow = false
    },
    //修改
    edit(item){
        this.$parent.isPower('','编辑').then(val=>{
            if(val){
                this.PopType = 'x'
                this.tenPopShow = true
                this.GIDdata=item.GID
                if(item){
                    this.Namedata = item.OriginName
                }
            }else{
                this.$parent.openPopFun()
            }
        })

    },
      //开始时间
    stateti2(num,text){
        var myDate = new Date(Date.parse(this.Sstime1))
        if(text == 1){

            myDate.setTime(myDate.getTime()-num*60*60*1000);
        }else{
            myDate.setTime(myDate.getTime()+num*60*60*1000);
        }
        var year = myDate.getFullYear(); //获取当前年
        var month = myDate.getMonth() + 1;
        var mothe = month > 9 ? month : '0' + month  //获取当前月
        var date = myDate.getDate();    //获取当前日
        var da = date >9 ? date : '0' + date
        var h = myDate.getHours(); //获取当前小时数(0-23)
        var he = h > 9 ? h : '0' + h
        var m = myDate.getMinutes(); //获取当前分钟数(0-59)
        var me = m > 9 ? m : '0' + m
        var s = myDate.getSeconds();
        var se = s > 9 ? s : '0' + s
        var time4 = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se
        this.Sstime1 = time4    //报错      
    },
    //结束时间
    endti2(num,text){
           var myDate = new Date(Date.parse(this.Eetime1))
            if(text == 1){
                myDate.setTime(myDate.getTime()-num*60*60*1000);
            }else{
                myDate.setTime(myDate.getTime()+num*60*60*1000);
            }
            var year = myDate.getFullYear();  //获取当前年
            var month = myDate.getMonth() + 1;   //获取当前月
            var mothe = month > 9 ? month : '0' + month
            var date = myDate.getDate();   //获取当前日
            var da = date >9 ? date : '0' + date
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
           var time3 = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se
           this.Eetime1 = time3
    },
  
    //历史查询
      arrowl(text){
         if(!this.RealShow){
             if(text == 'yl'){
                this.stateti2(1,1)
                this.endti2(1,1)
                this.axiosHistory()
                this.historyValue = true
                this.$parent.SetTime2(this.Sstime1,this.Eetime1)
               
             }else{
                this.stateti2(1/60,1)
                this.endti2(1/60,1)
                this.axiosHistory()
                this.historyValue = true
                this.$parent.SetTime2(this.Sstime1,this.Eetime1)
             }
         }
      },
      //历史查询
      arrow(text){
          if(!this.RealShow){
              if(text == 'yh'){
                this.stateti2(1,0)
                this.endti2(1,0)
                this.axiosHistory()
                this.historyValue = true
                 this.$parent.SetTime2(this.Sstime1,this.Eetime1)
             }else{
                this.stateti2(1/60,0)
                this.endti2(1/60,1)
                this.axiosHistory()
                this.historyValue = true
                 this.$parent.SetTime2(this.Sstime1,this.Eetime1)
             }
          }
      },
      //图片导出
      outImg(){
           
          this.$parent.isPower('','导出').then(val=>{
             if(val){
                //   document.querySelector('.QXtitle').style.display='block'
                  setTimeout(()=>{
                      this.createPicture()
                  },100)
                //   setTimeout(()=>{
                //       document.querySelector('.QXtitle').style.display='none'
                //   },200)
             }else{
                      this.$parent.openPopFun()
               
             }
          })
      },
      //导出
      createPicture() {
          var cloneDom = $('#mymap')
            html2canvas(cloneDom[0]).then(canvas => {
                this.imgmap = canvas.toDataURL()
                document.execCommand
                if (window.navigator.msSaveOrOpenBlob) {
                    var bstr = atob(this.imgmap.split(',')[1])
                    var n = bstr.length
                    var u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    var blob = new Blob([u8arr])
                    window.navigator.msSaveOrOpenBlob(blob, '曲线' + '.' + 'png')
                
                } else {
                    // 这里就按照chrome等新版浏览器来处理
                    const a = document.createElement('a')
                    a.href = this.imgmap
                    a.setAttribute('download', '曲线')
                    a.click()
                }
			});
		},
        //打印
        print(){
            this.$print(this.$refs.mymap)
        },

        //请求曲线历史值
        axiosHistory(text){
             var inde 
             if(this.ShowtextTo){
                inde = this.ShowtextTo
             }else{
                inde = 0
             }
            var serDateArr
            if(this.serDate.length !=0){
                serDateArr = JSON.parse(this.serDate)
            }else{
                serDateArr = this.serDate1
            }
            var data3={
                IsProportion:this.Showindex,
                StartTime:this.Sstime,
                EndTime:this.Eetime,
                Series:serDateArr
            }
                //历史查询
            this.$axios({
                method:"post",
                url:"/api/NewTrendChart/QuerySerieHistoryPoints",
                data:data3
            }).then((res)=>{
                       if(res.data.code!==0){
                      this.tipword = res.data.msg;
                            setTimeout(() => {
             this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            return
                  }
                this.loading1 = false
                if(res.data.data.length == 0){
                    for(var k2=0;k2<this.curveLineValue.length;k2++){
                        this.curveLineValue[k2].data = []
                    }
                    this.Stime = []
                    this.historyTime = []
                    this.drawLine(0);
                    
                }

                for(var i=0;i<res.data.data.length;i++){
                    if(this.historyValue){
                        for(var k=0;k<this.curveLineValue.length;k++){
                            this.curveLineValue[k].data = []
                        }
                        this.Stime = []
                        this.historyTime = []
                    }
                    this.historyTime.push(res.data.data[i].Time)
                    this.Stime = this.historyTime
                    for(var j=0 ; j < this.curveLineValue.length; j++){
                        this.curveLineValue[j].data.push(res.data.data[i].Points[j].Value)
                        this.historyValue = false
                    }
                    console.log(this.curveLineValue)
                }
                this.$nextTick(function(){
                    this.drawLine(0);
                   
                })
            }).catch(function (error) {
                console.log(error);
            })
        },
      
        //请求实时值
          axiosReal(data,index,iis){
              
              if(this.indexTime != -1){
                console.log('indexTime',this.indexTime)
            }else{
               var serData = JSON.stringify(data)
               var serData1 = data
                 var inde 
                if(this.ShowtextTo){
                         inde = this.ShowtextTo
                }else{
                     inde = 0
                }
                this.serDate = serData
                var data2 = {
                   isProportion:this.Showindex,
                   series:serData1
                }
                this.$axios({
                    method:"post",
                    url:"/api/NewTrendChart/QuerySerieCurrentPoints",
                    data:data2
                }).then((res)=>{
                   for(var i=0;i<res.data.data.length;i++){
                       if(this.lineshow){
                           this.lineData.push(res.data.data[i].Value)
                           var cruveV ={
                               name:this.curveLineType[i].name,
                               type:this.curveLineType[i].type,
                               data:[],
                               symbol: 'none',
                               barMaxWidth: 25.0,
                                // showBackground: true,
                                itemStyle:{
                                    normal:{
                                        shadowColor: "rgba(85,85,85,0.3)",
                                        shadowBlur: 2,
                                        shadowOffsetX: 2,
                                        color:this.curveLineColor[i],
                                    }
                                },
                               lineStyle: {
                                   normal: {
                                       shadowColor: "rgba(0, 0, 0, 0.3)",
                                       shadowBlur: 20,
                                       shadowOffsetY: 10,
                                       width: this.curveWidth,
                                       color:this.curveLineColor[i],
                                       height:this.curveLineType[i].type == 'bar' ? '1' : '0'
                                   }
                               },
                            //    areaStyle: {
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: this.curveLineColor[i] + '50'
                            //         }, {
                            //             offset: 1,
                            //             color: this.curveLineColor[i] + '00'
                            //         }])
                            //     }
                           }
                           
                            var cruveL1 ={
                               name:this.curveLineType[i].name,
                               type:this.curveLineType[i].type,
                               data:[],
                               barMaxWidth: 25.0,
                               symbol: 'none',
                                // showBackground: true,
                                itemStyle:{
                                    normal:{
                                        shadowColor: "rgba(85,85,85,0.3)",
                                        shadowBlur: 2,
                                        shadowOffsetX: 2,
                                        color:this.curveLineColor[i],
                                        }
                                },
                               lineStyle: {
                                   normal: {
                                       shadowColor: "rgba(0, 0, 0, 0.3)",
                                       shadowBlur: 20,
                                       shadowOffsetY: 10,
                                       width: this.curveWidth,
                                       color:this.curveLineColor[i],
                                       height:this.curveLineType[i].type == 'bar' ? '1' : '0',
                                   }
                               },
                            //    areaStyle: {
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: this.curveLineColor[i] + '50'
                            //         }, {
                            //             offset: 1,
                            //             color: this.curveLineColor[i] + '00'
                            //         }])
                            //     }
                           }
                            this.curveLineValue.push(cruveV)
                            this.LocalStorage.push(cruveL1)
                            this.lineData = []
                              
                            if(i==res.data.data.length-1){
                                this.lineshow = false
                            }
                             
                       }
                   }
                     //表格平均值
                   for(var j=0;j<this.curveLineValue.length;j++){
                     if(iis == undefined){  
                         this.curveLineValue[j].data.push(res.data.data[j].Value)
                         this.NewText = res.data.data[j].Value
                         this.curveArr[j].Newtext = res.data.data[j].Value
                         var sum =0
                         var pnum = this.curveLineValue[j].data
                         for(var w=0;w<pnum.length;w++){
                               sum=sum+pnum[w]
                        }
                       this.curveArr[j].numP =(sum / this.curveLineValue[j].data.length).toString().length > 5 ? (sum / this.curveLineValue[j].data.length).toFixed(4) : (sum / this.curveLineValue[j].data.length)
                          if(this.curveLineValue[j].data.length>=30){
                              this.curveLineValue[j].data.shift(1)
                          }
                     } 
                   }
                   
                    this.drawLine(0)
               }).catch(function(error) {
                    console.log('err',error);
                });
            }
        },

     timeaxiosAA(data,ind,data1){
               this.drawLine(1);
                // console.log("时间11111111111")
               this.axiosReal(data,ind)
                   this.time2 = window.setInterval(() => {
                         this.getDate()
                     },1000)
               this.timer = window.setInterval(() => {
                   this.axiosReal(data,ind)
                    },1000)
                    var typename
                    var lineType
                    this.curveArr = []
                    this.curveLineType = []
                    this.curveLineColor = []
                    for(var i=0;i<data.length;i++){
                          if(data[i].Type == 1){
                            typename = this.lang.NewTrendChart_CommonClass_Line
                            lineType = 'line'
                        }else if (data[i].Type == 2){
                            typename = this.lang.NewTrendChart_CommonClass_Column
                            lineType = 'bar'
                        }else{
                            typename = this.lang.NewTrendChart_CommonClass_Consult
                            lineType = 'line'

                        }
                        this.curveLineColor.push(data1[i].Stroke)
                        var curveValue = {
                              Number:data[i].Number,
                              Unit:data1[i].Unit,
                              MaxValue:data[i].MaxValue,
                              MinValue:data[i].MinValue,
                              Type:typename,
                              type:data[i].Type,
                              Description:data1[i].Description,
                              Stroke:data1[i].Stroke,
                              DisplayName: data[i].DisplayName,
                              Name:data[i].Name,
                              Newtext:'',
                              nump:'',
                              num:0
                          }
                            var Line = {
                              name:data[i].DisplayName,
                              type:lineType
                           }
                          this.curveLineType.push(Line)
                          this.curveArr.push(curveValue)
                    }
        },
    //请求所有曲线值
         axiosAll(index,text,iis){
             this.curveLineType=[]
             this.curveArr=[]
             this.realArr=[]
             this.curveLineColor = []
             if(this.curveID.length){
                 var data = this.curveID[index].GID
             }
            this.$axios({
            method:"post",
            url:"/api/NewTrendChart/QuerySeries?gid=" + data,
            gid:data
            }).then((res)=>{
                for(var i=0;i<res.data.data.length;i++){
                    this.curveLineName.push(res.data.data[i].Name)
                    this.curveLineColor.push(res.data.data[i].Stroke)
                    var lineType
                    var typename
                    if(res.data.data[i].Type == 1){
                        typename = this.lang.NewTrendChart_CommonClass_Line
                        lineType = 'line'
                    }else if (res.data.data[i].Type == 2){
                        typename = this.lang.NewTrendChart_CommonClass_Column
                        lineType = 'bar'
                    }else{
                         typename = this.lang.NewTrendChart_CommonClass_Consult
                          lineType = 'line'

                    }
                    var curveValue = {
                        Number:res.data.data[i].Number,
                        Unit:res.data.data[i].Unit,
                        MaxValue:res.data.data[i].MaxValue,
                        MinValue:res.data.data[i].MinValue,
                        Type:typename,
                        type:res.data.data[i].Type,
                        Description:res.data.data[i].Description,
                        Stroke:res.data.data[i].Stroke,
                        DisplayName: res.data.data[i].DisplayName,
                        Name:res.data.data[i].Name,
                        Newtext:'',
                        nump:'',
                        num:0
                    }
                    var realValue = {
                        SID:res.data.data[i].SID,
                        Number:res.data.data[i].Number,
                        TagName:res.data.data[i].TagName,
                        Digit:res.data.data[i].Digit,
                        MaxValue:res.data.data[i].MaxValue,
                        MinValue:res.data.data[i].MinValue,
                        Type:res.data.data[i].Type,

                    }
                     var Line = {
                        name:res.data.data[i].DisplayName,
                        type:lineType
                    }
                  
                     this.curveLineType.push(Line)
                     this.curveArr.push(curveValue)
                     this.realArr.push(realValue)
                }
               if(text == 1){
                //    console.log('realArr==>',this.realArr)
                   this.axiosReal(this.realArr,1)
               }else{
                  
                     clearInterval(this.timer);
                     clearInterval(this.time2);
                    if(this.realArr.length){
                        this.time2 = window.setInterval(() => {
                            this.getDate()
                        },1000)
                    }
                    this.timer = window.setInterval(() => {
                        // console.log('realArr==>',this.realArr)
                        this.axiosReal(this.realArr,1)
                    },1000)
               }
            }).catch(function (error) {
                    console.log(error);
                })
        },

      
   //点击曲线组
    curveName(index,indkk,data,ind,data1,text,txt){
        
        console.log('单窗口开始',index,indkk,data,ind,data1,text)
        if(index==undefined){
            index = 0
        }
        if(txt == '表格点击'){
   if(this.index == index){
            return
        }
        }
     
          //默认
        if(this.curveID.length==0 && text != 1){
            this.formatterShow = true
          this.curveLineValue =  [
            {
            data: [1, 2, 3, 1, 2],
            type: 'line',
            itemStyle: {
            normal: {
            lineStyle:{color:'#F95858'}
            }
            }
        },
            {
            data: [2, 3, 4, 2, 3],
            type: 'line',
            itemStyle: {
                normal: {
                lineStyle:{color:'#5C5FFB'}
                }
            }
            
        },
        {
            data: [3, 4, 5, 3, 4],
            type: 'line',
            itemStyle: {
            normal: {
            lineStyle:{color:'#43A145'}
            }
            }
        },
    
        ]

        this.Stime = ['', '', '', '', '']
        this.curveLineColor = ['red','blue','green']
        
        this.$nextTick(function(){
           this.drawLine(0);
        })
     }else{

         this.formatterShow = false
     }
     //
        if(this.timeShow){
                this.NumS =0 
                if(text != 1){
                    if(this.curveID.length){
                        this.text = this.curveID[index].Name
                    }
                }
                this.CurveNameShow = !this.CurveNameShow
                this.lineshow=true
                this.inpClickShow = true
                clearInterval(this.timer);
                clearInterval(this.time2);
                this.index = index
                this.curveLineValue = []
                this.LocalStorage = []
                this.curveLineColor = []
                this.Stime = []
                this.drawLine(1);
                console.log('indkk',indkk)
                if(indkk==0){ 
                    this.PopdataArr = data
                    this.PopdataArr1 = data1
                    this.PopdataShow = true
                  this.timeaxiosAA(data,ind,data1)
                }else{
                     this.PopdataShow = false
                    this.axiosAll(index,0)
                }
                this.activeRow = index
        }else{
                this.NumS =0 
                if(this.curveID[index]){
                    this.text = this.curveID[index].Name
                }
                this.CurveNameShow = !this.CurveNameShow
                this.lineshow=true
                this.inpClickShow = true
                this.curveLineValue = []
                this.LocalStorage = []
                this.Stime = []
                clearInterval(this.timer);
                this.drawLine(1);
                this.index = index
                 console.log('indkk2',indkk)
                if(indkk==0){
                  this.timeaxiosAA(data,ind,data1)
                }else{
                this.axiosAll(index,1)
                }
               
                this.activeRow = index
            }
      },
        inpClick(index){
            if(!$('.inpcheck')[index].checked){
                this.curveLineValue[index].lineStyle.normal.width = 0
                this.curveLineValue[index].symbol = 'none'
                this.curveLineValue[index].type = 'line'
                this.curveLineValue[index].areaStyle = undefined
                this.inpClickShow = !this.inpClickShow
            }else{
                var indd = this.curveLineValue[index].lineStyle.normal.height
                this.curveLineValue[index].lineStyle.normal.width = 2
                this.curveLineValue[index].symbol = 'none'
                this.curveLineValue[index].type = indd == '1' ? 'bar' : 'line'
                // this.curveLineValue[index].areaStyle = {
                //                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //                         offset: 0,
                //                         color: this.curveLineColor[index] + '50'
                //                     }, {
                //                         offset: 1,
                //                         color: this.curveLineColor[index] + '00'
                //                     }])
                //                 }
                this.inpClickShow = !this.inpClickShow
            }
            //切换图例的选中状态。
            this.myChart.dispatchAction({
                type: 'legendToggleSelect',
                name: this.curveLineValue[index].name
            })
        },
          //初始化时间
        getDate2(){
            var myDate =new Date(); //获取当前年
            var year = myDate.getFullYear();        //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = myDate.getDate();
            var da = date >9 ? date : '0' + date
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var now = he + ':' + me + ':' +se         //获取当前时间
            this.Stime.push(now)
            this.Eetime1 = now
            // this.$nextTick(function(){  
            //     // this.drawLine(0);
            // })
       },

         //初始化时间
        getDate(){
            // console.log("时间")
            var myDate =new Date(); //获取当前年
            var year = myDate.getFullYear();        //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = myDate.getDate();
            var da = date >9 ? date : '0' + date
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var now =he + ':' + me + ':' +se   
             var now1 =year +' ' + mothe + ' ' + da + ' ' +  he + ':' + me + ':' +se          //获取当前时间
             this.indexTime = this.Stime.indexOf(now)
             if(this.indexTime != -1){
                console.log('a')
             }else{
                 this.Stime.push(now)
                 this.Newtime = now1
                 if(this.Stime.length>=30){
                     this.Stime.shift(1)
                 }
             }
       },
    
    // 绘制图表方法
    drawLine(text){
        
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(this.$refs.tendency)
           let formatter = "{value}"
         
        if(this.$store.state.Showtext == 1){
           formatter = "{value}%"
        }else{
            formatter = "{value}"
         
        }
        if(text == 1){
            this.myChart.clear()
        }
        let toolbox = {}
        if(!this.$store.state.showTime){
         toolbox = {
                feature: {
                   	dataZoom: {
						yAxisIndex: 'none',
                        title:{
                            zoom:this.lang.NewTrendChart_Actions_Zoom,
                            back:this.lang.NewTrendChart_Actions_ZoomReset
                        }
					},
					restore: {
                        title:this.lang.NewTrendChart_Actions_Reset
                    },
                }
            }
        }
        // 绘制图表
        this.myChart.setOption({
            title: {
                text: '',
                left: 'center',
                show:true,
                textStyle:
                {
                    color: "#000000",
                    fontSize: "14",
                    fontFamily: "SiYuanHei"
                }
            },
            tooltip: {
                trigger: 'axis',  
                confine: true,
                formatter:this.formatterShow == true ? '{b0}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5087f0;"></span>曲线1:{c0}<br/><span style ="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#7eebfa;"></span>曲线2:{c1}<br/><span style ="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#faeb74;"></span>曲线3:{c2}<br/>' : '',
                "axisPointer": {
					"lineStyle": {
						"color": this.color3
					}
				},
                borderColor: this.$store.state.color === 'blackBlue' ? '#4B5166' : '#333',
                backgroundColor: this.$store.state.color === 'blackBlue' ? '#4B5166' : '#fff',
                textStyle:{
                    color: this.$store.state.color === 'blackBlue' ? '#fff' : '#000'
                }
           },
            legend: {
                top: '-100%'
            },
            color:this.curveLineColor,
            toolbox: toolbox,
            xAxis: {
                type: 'category',
                name: '',
                axisLine: {
                    lineStyle: {
                        color: this.color5,
                        width: 1, //这里是为了突出显示加上的  
                    }
                },
                axisLabel:{
                    formatter:'{value}',
                    textStyle: {
                        fontSize:this.value5,
                        fontFamily:this.value2,
                        fontWeight:this.XFontIsB == true ? 'bold' : ''
                    }
                },
                data:this.Stime.length==0?[''] :this.Stime
            },
            grid: {
                left: '4%',
                right: '9%',
                bottom: 15,
                top:'15%',
                containLabel: true
            },
            yAxis: [{
                type: 'value',   //position  offset
                name: '',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: this.color6,
                        width: 1, //这里是为了突出显示加上的  
                    }
                },
                splitLine: { 
                    show: true ,
                    
                    lineStyle:{
                         type:'dashed' ,
                        color:this.color4
                    }
                },
                axisLabel:{
                //  formatter:'{value}%',
                formatter:formatter,
                textStyle: {
                        fontSize:this.value6,
                        fontFamily:this.value3,
                        fontWeight:this.YFontIsB == true ? 'bold' : ''
                    }
                }
            }],
            series:this.curveLineValue
        },true);
        console.log("this.curveLineValue",this.curveLineValue)
        this.$store.state.oksh = false
    }
  }
}

</script>
<style lang="scss">
.conterbox{
     .el-popper[x-placement^=bottom]{
        max-height:300px;
        overflow: auto
    }
    .timeLast{
        .el-input__inner{
            height:30px;
        }
    }
    .el-input__inner{
        border-radius: 0;
    }
    .bottom_fool{
        .el-table th>.cell{
            line-height: 16px;
        }
          .conterbox .timeLast .el-input__inner{
            height:38px !important;
        }
     
        .el-table__header-wrapper{
            background: #5A6C98;
        }
        .el-table th{
            background: #5A6C98;
        }
        .el-table thead{
            background: #5A6C98;
            color:#fff;
            height:50px;
        }
    }
    .el-table td, .el-table th.is-leaf{
        border-left:0.5px solid #fff;
    }
    .el-table th>.cell:first-child{
        text-overflow: unset;
    }

    .el-table th, .el-table tr{
         height:50px;
    }
   .el-table td, .el-table th{
       padding:0;
   }
//    EAEDEE
   .el-table__row:nth-of-type(odd){
        background: #fff !important;
   }
    .el-table__row:nth-of-type(even){
      background: #EAEDEE;
   }
    .el-table--scrollable-y .el-table__body-wrapper{
        height:197px;
        
    }
    .inpcheck[type=checkbox] {
        top:0px;
        left:0;
        width:24px;
        height:22px;  
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        z-index: 11;
        position: relative;
        outline: none;
        -webkit-appearance: none;
        border:1px solid #B0B0B0;
        border-radius: 4px;
    }
    .inpcheck[type=checkbox]:after {
        position: absolute;
        width:24px;
        height: 24px;
        top: -1px;
        left:-1px;
        content: " ";
        display: inline-block;
        visibility: visible;
        text-align: center;
        line-height: 24px;
        }
        .inpcheck[type=checkbox]:checked:after {
            content: "✓";
            font-size: 14px;
            border:none;
            font-weight:bold;
        }
        .bottom_fool{
            .el-date-editor.el-input{
                width:80% !important;
            }
        }

    &.blackBlueBg{
        .left_bottom{
            .el-table{
                th{
                    background-color: #18254E;
                }
            }
        }
        .el-table__row:nth-of-type(odd){
            background-color: #0E1732!important;

            td{
                border-color: transparent;
            }
        }
        .el-table__row:nth-of-type(even){
            background-color: #121C3A!important;

            td{
                border-color: transparent;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.colortip{
    background-color: #EFEFF0 !important;
}
.QXtitle{
    display: none;
}
.conterbox{
    width:100%;
    height:calc(100% - 30px);
    overflow: hidden;

    &.blackBlueBg{
        .deletePop{
            background: #2A3E76;
            color: #fff;
        }
        .conter_left{
            border-color: #38415A;
            background-color: transparent;

            .left_bottom{
                background: #081027;

                .bottom_top{
                    background-color: #1E2743;
                    border-color: #38415A;
                    color: #9AA3BE;

                    .i_left,.i_left2,.i_right,.i_right2{
                        background-color: #54689E;
                    }
                }
            }
        }
        .conter_right{
            border-color: #38415A;

            .right_head{
                background-color: transparent;

                .text{
                    color: #386DF0;
                    border-color: #386DF0;
                    background-color: transparent;
                }
            }

            .right_conter{
                border-color: #2A3058;
                background-color: #0E1732;

                .conter_top{
                    border-color: transparent;

                    .top_head{
                        background-color: #18254E;

                        .curve{
                            border-color: #304171;
                        }
                    }
                    .top_middle{
                        .top_conter{
                            border-bottom-color: transparent;

                            &.current-row{
                                background-color: #273E7E!important;

                                .curvename{
                                    border-right: 1px solid #000;
                                }
                            }

                            &:nth-child(even){
                                background-color: #121C3A;
                            }
                            &:nth-child(odd){
                                background-color: #0E1732;
                            }

                            .curvename{
                                color: #9AA3BE;
                            }
                        }
                    }

                    .edit_box,.delete_box{
                        background-color: transparent;
                        border-color: #5C6A95;
                    }
                }
                .fool_out{
                    background-color: #46BE05;
                }
            }
        }
    }

    .tenpop{
        position: absolute;
        top:80px;
        left:0;
        right:0;
        margin: 0 auto;
        z-index: 999;
    }
    .edit_box{
        display: inline-block;
        // width:60px;
        width:43%;
        height:30px;
        border-radius: 30px;
        border:1px solid #E6E6E7;
        background: #fff;
         line-height: 30px;
         text-align: center;
          margin-top:5px;
          margin-left:5px;
    }
    .delete_box{
        display: inline-block;
        // width:60px;
        width:43%;
        height:30px;
        border-radius: 30px;
        border:1px solid #E6E6E7;
        background: #fff;
        line-height: 30px;
        text-align: center;
        margin-top:5px;
        margin-left:5px;
    }

    .deletePop{
        position: absolute;
        left:0;
        right:0;
        bottom:0;
        top:0;
        margin: auto;
        width:385px;
        height:205px;
        background: #fff;

        .title{
            width:100%;
            height:40px;
            background: #FFBC3D;
            text-align: center;
            line-height: 40px;
            color:#fff;

            .title_i{
                color: #fff;
                margin-right:5px;
            }
        }

        .delete_text{
            width:100%;
            height:120px;
            text-align: center;
            line-height: 130px;
        }

        .delete_btn{
            width:100%;
            height:45px;

            .no{
                float: left;
                width:160px;
                height:30px;
                background: #E0E0E0;
                color:#737373;
                text-align: center;
                 line-height: 30px;
                 margin-left:33px;
                 margin-right:5px;
                 cursor: pointer;
            }

            .yes{
                float: left;
                 width:160px;
                height:30px;
                background: #F3E3AD;
                color:#EBA241;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
            }

            .deleteConfig{
                width:315px;
                height:30px;
                background: #F3E3AD;
                color:#EBA241;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
                margin-left:35px;
            }
        }

    }

    .conter_left{
        float: left;
        width:82%;
        height: 100%;
        border: 1px solid #d5d5d5;
        display: flex;
        flex-flow: column;
        // height:825px;
        background: #fff;
        position: relative;
    
        .left_top{
            width:100%;
            height:400px;
            // margin:10px auto;
        }
        .left_bottom{
            width:100%;
            flex: 1;
            display: flex;
            flex-flow: column;
            .bottom_top{
                width:100%;
                height:60px;
                background:#fff;
                overflow:hidden;
                text-align: center;
                line-height: 60px;
                position: relative;
                background: #86B1E7;
                margin:0px 0 15px; 

                .text{
                    position: absolute;
                    font-size:20px;
                    width:70%;
                    top:0;
                    left:0;
                    right:0;
                    bottom:0;
                    margin: auto;
                }
                
                .i_left2,
                .i_left{
                    display: inline-block;
                    padding:8px;
                    height:35px;
                    width:53px;
                    position: absolute;
                    background: #7298C9;
                    left:0;
                    top:0;
                    bottom:0;
                    margin:15px 0 0;
                    font-size:20px;
                    margin-left: 15px;
                    color:#fff;
                }

                .i_left2{
                    left:70px;
                }
                 
                 .i_right2,
                .i_right{
                    display: inline-block;
                    padding:8px;
                    height:35px;
                    width:53px;
                    position: absolute;
                    right:0;
                    top:0;
                    bottom:0;
                    margin:15px 0 0;
                    font-size:20px;
                    margin-right: 15px;
                    color:#fff;
                    background: #7298C9;
                }
                 .i_right2{
                     right:70px;
                 }
            }
            .bottom_fool{
                width:98%;
                flex: 1;
                height: calc(100% - 10px);
                margin:auto;
                background: #fff;
                
                .fool{
                    width:100%;
                    height:100%;
                    overflow: auto;

                    .fool_top{
                        width:100%;
                        height:40px;
                        overflow: hidden;
                        color:#fff;
                        position: sticky;
                        top:0;

                        .fool_li{
                            float: left;
                        }

                        .name{
                            width:18%;
                            height:40px;
                             padding-left:8px;
                            line-height: 40px;
                            // font-size: 13px;
                            background: #5A6D98;
                        }
                        .id{
                         width:5%;
                         height:40px;
                          padding-left:8px;
                         line-height: 40px;
                         background: #5A6D98;
                        }
                        .de{
                            width:22%;
                            height:40px;
                           padding-left:8px;
                            line-height: 40px;
                            background: #5A6D98;

                        }
                        .dw{
                            width:8%;
                            height:40px;
                            padding-left:8px;
                            line-height: 40px;
                            background: #5A6D98;

                        }
                        .type{
                            width:8%;
                            height:40px;
                            padding-left:8px;
                            line-height: 40px;
                            background: #5A6D98;

                        }
                        .mean{
                            width:8%;
                            height:40px;
                            padding-left:8px;
                            line-height: 40px;
                            background: #5A6D98;

                        }
                        .max{
                            width:8%;
                            height:40px;
                             padding-left:8px;
                            line-height: 40px;
                            background: #5A6D98;

                        }
                        .min{
                            width:8%;
                            height:40px;
                            padding-left:8px;
                            line-height: 40px;
                            background: #5A6D98;

                        }
                        .time{
                            width:15%;
                            height:40px;
                             padding-left:8px;
                            line-height: 40px;
                            background: #5A6D98;

                            .timeLast{
                                width:175px;
                                height:30px;
                            }
                        }
                    }

                    .fool_conter{
                        width:100%;
                        height:40px;
                        overflow: hidden;
                        background:#E8EEEE;
                         border-bottom:1px solid #D2D4D4;

                        .fool_li{
                            float: left;
                        }

                        .name1{
                            width:18%;
                            height:40px;
                            padding-left:15px;
                            line-height: 40px;
                           
                            .name1text{
                                display: inline-block;
                                width:82%;
                                height:100%;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                                 font-size: 13px;
                                 margin-left:10px;
                            }

                            .inpcheck{
                                float: left;
                            }
                        }
                        .id1{
                         width:5%;
                         height:40px;
                          padding-left:15px;
                         line-height: 40px;
                        }
                        .de1{
                            width:22%;
                            height:40px;
                             padding-left:15px;
                            line-height: 40px;
                        }
                        .dw1{
                            width:8%;
                            height:40px;
                             padding-left:15px;
                            line-height: 40px;

                        }
                        .type1{
                            width:8%;
                            height:40px;
                            padding-left:15px;
                            line-height: 40px;
                        }
                        .mean1{
                            width:8%;
                            height:40px;
                            padding-left:15px;
                            line-height: 40px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                        }
                        .max1{
                            width:8%;
                            height:40px;
                             padding-left:15px;
                            line-height: 40px;;
                        }
                        .min1{
                            width:8%;
                            height:40px;
                             padding-left:15px;
                            line-height: 40px;
                        }
                        .time1{
                            width:13%;
                            height:40px;
                           text-align: center;
                            line-height: 40px;
                        }
                    }
                }

            }
        }
    }

    .conter_right{
        float: right;
        display: flex;
        flex-flow: column;
        width:calc(18% - 10px);
        height:100%;
        border:1px solid #d5d5d5;
        .right_head{
            position: relative;
            width:100%;
            height:70px;
            background:#DDDDDD;
            margin: auto;
            font-size: 14px;
            color:#295BEB;
            .text{
                position: absolute;
                cursor: pointer;
                width:90%;
                height:40px;
                font-weight: bold;
                text-align: center;
                line-height: 40px;
                background: #fff;
                top: 0;
                left:0;
                right:0;
                bottom:0;
                margin: auto;
                border:2px solid #295BEB;
            }
        }
        
        .right_conter{
            width:95%;
            flex:1;
            display: flex;
            flex-flow: column;
            background: #fff;
            margin:0 auto;
            padding-top:10px;
            .conter_top{
                width:100%;
                flex: 1;
                margin:0 auto;
                overflow: auto;
                border:1px solid #E9E9E9;

                .top_head{
                   overflow: hidden;
                   width:100%;
                   height:40px;
                   background: #5B6C98;
                   color:#fff;

                    .curve{
                      float:left;
                      width:50%;
                      height:40px;
                      padding-left:15px;
                      line-height: 40px;
                      border-right:1px solid #fff;
                    }
                    
                    .operate{
                      float:left;
                      width:50%;
                      height:40px;
                      padding-left:15px;
                      line-height: 40px;
                    }
                }

                .top_middle{
                  width:100%;
                  height:90%;

                .top_conter{
                    &.current-row{
                        background-color: #D4DEFB!important;

                        .curvename{
                            border-right: 1px solid #fff;
                        }
                    }
                }
                .top_conter:nth-child(1){
                    //   background: #D4DEFB;
                  }
                  .top_conter:nth-child(2n){
                      background: #EAEDEE
                  }
                 .top_conter{
                   overflow: hidden;
                   width:100%;
                   height:40px;
                   color:#000;
                   margin-bottom:1px;
                   background: #fff;
                   border-bottom:1px solid #D8D8D8;

                   .curvename{
                      float:left;
                      width:50%;
                      height:40px;
                      line-height: 40px;
                      padding-left:15px;
                      font-size: 12px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                   }

                   .curvei{
                        float:left;
                      width:50%;
                      height:40px;
                      line-height: 40px;

                      .i_edit{
                          display: inline-block;
                          cursor: pointer;
                          width:42%;
                          height:22px;
                          text-align: center;
                          line-height: 28px;
                          background: #fff;
                          color:#4ABFCD;
                          font-size: 20px;
                          background: url('../../../assets/images/icon_pensoil.png');
                          background-size: 100% 100%;
                           margin-top:3px;
                      }

                     .i_delete{
                          display: inline-block;
                          cursor: pointer;
                          width:42%;
                          height:22px;
                          text-align: center;
                          line-height: 28px;
                          background: #fff;
                          font-size: 20px;
                          color:#4ABFCD;
                           background: url('../../../assets/images/icon_dell.png');
                           background-size: 100% 100%;
                           margin-top:3px;
                     } 
                   }
                 }
                }

            }

            .conter_fool{
                width:95%;
                height:160px;
                margin:15px auto 0;
                
                .fool_out{
                    width:100%;
                    height:40px;
                    text-align: center;
                    line-height: 40px;
                    background: #48BD0E;
                    color:#fff;
                    border-radius: 4px;
                    margin-bottom:15px;
                    cursor: pointer;
                }
                
                .fool_join{
                    width:100%;
                    height:40px;
                    text-align: center;
                    line-height: 40px;
                    background: #48BD0E;
                    color:#fff;
                    border-radius: 5%;
                }
            }
        }
    }
}
#qscxchartone{
    position:absolute !important;
    top:0;
    bottom:0;
    margin:auto;
    transform-origin:0;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30999999;
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
    .tipcontanin {
        height: calc(100% - 40px);
    }
    .tipword {
        width: 100%;
        height: 75%;
        padding: 0 20px;
        display: flex;
        // text-align: center;
        justify-content: center;
        align-items: center;
    }
    .tipdetermine {
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 13px;
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
</style>
