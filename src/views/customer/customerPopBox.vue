<template>
<div class="popconter_box">
    <div class='aabtablecover'>
    <div class='btabletop'>{{lang.ReportForm_ExportProgress}}</div>
    <div class='btableconter'>
      <span>{{lang.ReportForm_Exporting}}</span>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
      <!-- <div class='tablebigpass'>
        <div class="tablesmallpass">
        
          <div class='tablepassword'>30%</div>
        </div>
      </div> -->
    </div>
  </div>
  <div class="popconter2" style="z-index:0">
    <LineVue1 :dataId="dataId" :dae="data"></LineVue1>
      <RectangleVue2 :dataId="dataId" :dae="data"></RectangleVue2>
      <EllipseVue3 :dataId="dataId" :dae="data"></EllipseVue3>
      <StaticImage4     ref="StaticImage4" :dataId="dataId" :name="name" :dae="data"></StaticImage4>
      <StaticTextBlock5 :dataId="dataId" :dae="data"></StaticTextBlock5>
      <CornerButton6 ref="aaCornerButton6" :dataId="dataId" :dae="data"></CornerButton6>
      <PressButton7 ref="PressButton7" :dataId="dataId" :dae="data"></PressButton7>
      <Switch8 ref="aaswitch" :dataId="dataId" :dae="data"></Switch8>
      <TabModuleButton9 :dataId="dataId"  class="TabModuleVButton" :dae="data"></TabModuleButton9>
      <PopupButton10 :dataId="dataId" :ViewName="name" :dae="data" :key="Date.now()"></PopupButton10>
      <TextBox11 :dataId="dataId" :dae="data"></TextBox11>
      <DataTextBlock12 ref="aaDataTextBlock12" :dataId="dataId" :dae="data" ></DataTextBlock12>
      <RWTextBox13  ref="aaRWTextBox13" :dataId="dataId" :dae="data"></RWTextBox13>
      <Alarm14 :dataId="dataId" ref="aaAlarm14" :dae="data"></Alarm14>
      <EllipseLamp15 ref="aaEllipseLamp" :dataId="dataId" :dae="data"></EllipseLamp15>
      <CommonLamp16 ref="aaCommonLamp" :dataId="dataId" :dae="data"></CommonLamp16>
      <DynamicText17 ref="aadynamicyext17" :dataId="dataId" :dae="data"></DynamicText17>
      <Image18 ref="aaDimage2" :dataId="dataId" :name="name" :dae="data"></Image18>
      <PieChart20 :dataId="dataId" :ViewName="name" :dae="data" :contentName="contentName" :chartdata="contentData"></PieChart20>
      <DashBoardChart21 :type="typeName" :dataId="dataId" :ViewName="name" :contentName="contentName" :dae="data" :chartdata="contentData"></DashBoardChart21>
      <LineChart22 :dataId="dataId" :ViewName="name" :dae="data" :contentName="contentName" :chartdata="contentData"></LineChart22>
      <ColumnChart23 :dataId="dataId" :ViewName="name" :dae="data" :contentName="contentName" :chartdata="contentData"></ColumnChart23> 
      <PolylineColumnChart24 :dataId="dataId" :ViewName="name" :dae="data" :contentName="contentName" :chartdata="contentData"></PolylineColumnChart24>
        <!-- 视频控件 -->
      <Video :dataId="dataId" :dae="data" :name='name'></Video>
      <querybutton25 ref="aaquerybutton25" @search='search' :dataId="dataId" :dae="data" :PageName="name"></querybutton25>
      <outputbutton26 @exportdata='exportdata' :dataId="dataId" :dae="data" ></outputbutton26>
      <textimport27a ref="aatextimport27a" :dataId="dataId" :dae="data"></textimport27a>
      <DateTimePicker282 ref="aaDateTimePicker282" :dataId="dataId" :dae="data"></DateTimePicker282>
      <Combobox299 ref="aaCombobox299" :dataId="dataId" :dae="data"></Combobox299>
      <Customreport :dataId="dataId" :dae="data" ref="table" @percentage1='percentage1'></Customreport>
      <NumberScreen30 ref="NumberScreen30" :dataId="dataId" :dae="data"></NumberScreen30>
      <MobileProductsT ref="aamobileProducts" :dataId="dataId" :dae="data"></MobileProductsT>
      <DynamicProducts ref="aaDyn" :dataId="dataId" :dae="data"></DynamicProducts>   
        <!-- 权限失败提示弹窗 -->
      <TipsPop :popText="TipsPopText" v-if="isTipsPop"></TipsPop>
      <FlowPipe :dataId="dataId" :dae="data"></FlowPipe>  
      <Tank :dataId="dataId" :dae="data"></Tank>

      <!-- 矩阵控件 -->
      <MatrixGrid ref="MatrixGrid" :dataId="dataId" :dae="data"/>
      <MatrixGridSet ref="MatrixGridSet" :dataId="dataId" :dae="data"/>
      <Combinecombobox
                    ref="aaCombinecombobox"
                    :dataId="dataId"
                    :dae="data"
                ></Combinecombobox>
      <div v-if="isTipsPop" class="mask_box"></div>
  </div>
</div>
</template>
<script>
import Combinecombobox from  './conponent2/combinecombobox'
import LineVue1 from './conponent2/LineVue1'
import MatrixGrid from './conponent2/MatrixGrid'
import MatrixGridSet from './conponent2/MatrixGridSet'
import RectangleVue2 from './conponent2/RectangleVue2.vue'
import EllipseVue3 from './conponent2/EllipseVue3.vue'
import StaticImage4 from './conponent2/StaticImage4.vue'
import StaticTextBlock5 from './conponent2/StaticTextBlock5.vue'
import CornerButton6 from './conponent2/CornerButton6.vue'
import PressButton7 from './conponent2/PressButton7.vue'
import FlowPipe from './conponent2/FlowPipe.vue'
import Tank from './conponent2/Tank.vue'
import Switch8 from './conponent2/Switch8.vue'
import TabModuleButton9 from './conponent2/TabModuleButton9.vue'
import PopupButton10 from './conponent2/PopupButton10.vue'
import TextBox11 from './conponent2/TextBox11.vue'
import DataTextBlock12 from './conponent2/DataTextBlock12.vue'
import RWTextBox13 from './conponent2/RWTextBox13.vue'
import Alarm14 from './conponent2/Alarm14.vue'
import EllipseLamp15 from './conponent2/EllipseLamp15.vue'
import CommonLamp16 from './conponent2/CommonLamp16.vue'
import DynamicText17 from './conponent2/DynamicText17.vue'
import Image18 from './conponent2/Image18.vue'
import Video from './conponent2/video.vue'
import PieChart20 from './conponent2/PieChart20.vue'
import DashBoardChart21 from './conponent2/DashBoardChart21.vue'
import LineChart22 from './conponent2/LineChart22.vue'
import ColumnChart23 from './conponent2/ColumnChart23.vue'
import PolylineColumnChart24 from './conponent2/PolylineColumnChart24.vue'
import querybutton25 from './conponent2/QueryButton25.vue'
import outputbutton26 from './conponent2/outputbutton26.vue'
import textimport27a from './conponent2/textimport27.vue'
import DateTimePicker282 from './conponent2/DateTimePicker282.vue'
import Combobox299 from './conponent2/Combobox299.vue'
import NumberScreen30 from './conponent2/NumberScreen30.vue'
import Customreport from './conponent2/customreport.vue'
import MobileProductsT from './conponent2/MobileProducts.vue'
import DynamicProducts from './conponent2/DynamicProducts.vue'

import TipsPop from './TipsPop'
import '../../../public/jquery.signalR-2.4.1.js'
export default {  
  components: {   //弹窗页面没有弹窗控件
    LineVue1,
    Combinecombobox,
    MatrixGrid,         //单点矩阵
    MatrixGridSet,      //矩阵设定
    RectangleVue2,
    EllipseVue3,
    StaticImage4,
    StaticTextBlock5,
    CornerButton6,
    PressButton7,
    Switch8,
    TabModuleButton9,
    PopupButton10,      //弹窗按钮控件
    TextBox11,
    DataTextBlock12,
    RWTextBox13,
    Alarm14,
    EllipseLamp15,
    CommonLamp16,
    DynamicText17,
    Image18,
    FlowPipe,  //流动管道
    Tank, //罐体
    PieChart20,
    DashBoardChart21,
    LineChart22,
    ColumnChart23,
    PolylineColumnChart24,
    querybutton25,
    outputbutton26,
    textimport27a,
    DateTimePicker282,
    Combobox299,
    NumberScreen30,
    Customreport,
    MobileProductsT,
    DynamicProducts,
    Video,
    TipsPop     //权限提示弹窗
    },
    props:['popdata'],
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            percentage:0,
          data:'',
          contentData:'',
          contentName:'',
          name:'',
          adata:null,
          nameC:'',
          pathNmae:'',
          loading1:false,
          dataId:'',
          commerPopShow1:false,
          pathName:'1',
          pathName2:'',
          type:'',
          typeName:'',
          isTipsPop:false, //权限提示弹窗
          scriptTime2:'', //脚本定时器
          TipsPopText:"执行下发任务失败",
          scriptItem:null,  //下发脚本要触发的方法值
          scriptType:null,  //那个控件脚本
          pressType:null,   //点动按钮脚本事件
          numTextData:null, //数值显示脚本事件
          it:null           //查询按钮脚本事件
        }
    },
  watch:{
     "$store.state.scriptData":{ //脚本事件
          deep: true,
          handler:function(n, o){
            if(this.$store.state.scriptData == null){
              this.isTipsPop = true
            }else{
              this.scriptFunData(this.$store.state.scriptData)
            }
          }
      },
      '$store.state.staticImagearr':{
            //静态图片数据
            deep:true,
            handler:function(n){
              this.$refs.StaticImage4.axioImg2(this.$store.state.staticImagearr);
            }
        },
    //图表定时触发监听
     "$store.state.setTiemValue": {
      deep: true,
      handler:  function(n, o) {
         this.msgHubFun3(n)
      }
    },
    //流动控件监听
    "$store.state.monitorShow": {
      deep: true,
      handler:  function(n, o) {
          if(n == 'true'){
              if(this.$refs.aaDyn){
                this.$refs.aaDyn.moveFun(this.$store.state.monitorName,n)
                setTimeout(()=>{
                  this.$store.state.monitorShow = 'false'
                },500)
              }
          }
      }
    },
    //图表类型监听
    "$store.state.typeNum": {
      deep: true,
      handler:function(n, o) {
             this.typeName  = n
      }
    },
     //图表动态数值
    "$store.state.contentData": {
      deep: true,
      handler:  function(n, o) {
             this.contentData  = n
      }
    },
     //图表动态数值
    "$store.state.contentName": {
      deep: true,
      handler:function(n, o){
             this.contentName  = n
      }
    },
      //报警消息
    "$store.state.ReceivedAlarms": {
      deep: true,
      handler:function(n, o){
          this.$refs.aaAlarm14.axioImg2(this.$store.state.ReceivedAlarms)
      }
    },
      //图表动态变量
    "$store.state.varChange": {
      deep: true,
      handler:function(n, o){
            
            if(this.$refs.aaDimage2){
              this.$refs.aaDimage2.axioImg2(n)
            }
            if(this.$refs.aadynamicyext17){
              this.$refs.aadynamicyext17.axioImg2(n)
            }
            if(this.$refs.aaCommonLamp){
              this.$refs.aaCommonLamp.axioImg2(n)
            }
            if(this.$refs.aaEllipseLamp){
              this.$refs.aaEllipseLamp.axioImg2(n)
            }
            if(this.$refs.aaswitch){
              this.$refs.aaswitch.axioImg2(n)
            }
            if(this.$refs.aaDataTextBlock12){
              this.$refs.aaDataTextBlock12.axioImg2(n)
            }
            if(this.$refs.aaDataTextBlock12){
              this.$refs.aaDataTextBlock12.axioImg3(n)
            }
            if(this.$refs.aaRWTextBox13){
              this.$refs.aaRWTextBox13.axioImg2(n)
            }
            if(this.$refs.aamobileProducts){
               this.$refs.aamobileProducts.axioImg2(n)
            }
            if(this.$refs.aaDyn){
              this.$refs.aaDyn.axioImg2(n)
            }
            if(this.$refs.MatrixGrid){
              this.$refs.MatrixGrid.axioImg2(data)
            }
            if(this.$refs.MatrixGridSet){
              this.$refs.MatrixGridSet.axioImg2(data)
            }
            if(this.$refs.aaCombinecombobox){
              this.$refs.aaCombinecombobox.axioImg2(data)
            }
      }
    },
    $route(n,o){
          window.$.connection.subchart.server.leaveView(`${this.name}`,localStorage.getItem('currentLang'))
          var self = this
          if(self.pathName == n.path){
                  this.pathName2 = n.path
          }else{
            this.pathName =n.path
            this.pathName2 = ''
            this.dataId = n.query.id
          }
          self.init()
          window.$.connection.subchart.server.joinView(`${self.name}`,localStorage.getItem('currentLang'))
        },
        //监听页面切换
         data(n,o){
          if(this.$store.state.isInit){
               if(o.Data){
                 var EventScriptList = o.Data.EventScriptList
                 var EventType = []
                 var Typearr = []
                 for(var i=0;i<EventScriptList.length;i++){
                       if(EventScriptList[i].EventType == 'ExitView'){
                           EventType.push(EventScriptList[i])
                       }
                 }
                 if(EventType.length){
                     for(var j=0;j<EventType.length;j++){
                         Typearr.push(EventType[j].Script)
                       }
                    //触发离开画面脚本事件
                     this.scriptData(Typearr,'','','','','')
                 }
               }
          }
        }
    },
      destroyed(){
        if(window.msgHub){
          window.$.connection.subchart.server.leaveView(`${this.name}`,localStorage.getItem('currentLang'))
        }
        clearInterval(this.scriptTime2)
        this.$parent.joinVar()
    },
    created(){
      this.data = ''
     this.contentName = this.$store.state.contentName
     this.init()
    },

    mounted(){
      if(this.$route.path.slice(1) != 'onePath'){
          let StrokeColor
          let lage
          let gradient
          //渐变色
          this.$nextTick(()=>{
              var StrokeArr = JSON.parse(this.data.Controls.PropertyList.Background)
              if(StrokeArr.ColorType == 'SolidColor'){
                  StrokeColor = '#' + StrokeArr.Data.Color.slice(3) + StrokeArr.Data.Color.slice(1, 3)
              }else{
                      StrokeColor = ''
                      lage = StrokeArr.Data.Angel.toFixed(0)
                  for(var f2=0;f2<StrokeArr.Data.GradientStops.length;f2++){
                      gradient = StrokeArr.Data.GradientStops[f2]
                      StrokeColor = StrokeColor + ',' + gradient.Color + ' ' + (gradient.Offset*100).toFixed(0) + '%'
                  }
                      StrokeColor = '-webkit-linear-gradient('+lage+'deg'+StrokeColor+')';
              }
              var color = StrokeColor
              var width = this.data.Controls.PropertyList.Width
              var height = this.data.Controls.PropertyList.Height
              document.querySelector('.popconter2').style.background=color
              document.querySelector('.popconter2').style.width=width + 'px'
              document.querySelector('.popconter2').style.height=height + 'px'
              var screenWV = window.screen.width   //分辨率宽度
              document.querySelector('.popconter_box').style.width = screenWV

              if(width < screenWV){
              document.querySelector('.popconter2').style.position='absolute'
              document.querySelector('.popconter2').style.bottom=0
              document.querySelector('.popconter2').style.top=0
              document.querySelector('.popconter2').style.left=0
              document.querySelector('.popconter2').style.right=0
              document.querySelector('.popconter2').style.margin='auto'
            }else{
              document.querySelector('.popconter2').style.position='relative'
              document.querySelector('.popconter2').style.bottom='none'
              document.querySelector('.popconter2').style.top='none'
              document.querySelector('.popconter2').style.left='none'
              document.querySelector('.popconter2').style.right='none'
              document.querySelector('.popconter2').style.margin='none'
            }
          })
  
      }
    },

    methods: {
      percentage1(data){
 this.percentage = data
      },
      tabPop(){
        this.isTipsPop = true
        this.TipsPopText = '弹窗内不允许直接跳转标准模块，请关闭弹窗在对应监控页面进行操作！'
      },
      tabJson(name,id){
        setTimeout(()=>{
         window.$.connection.subchart.server.leaveView(`${this.name}`,localStorage.getItem('currentLang'))
          let name1 = name.slice(1)
          this.dataId = id
          this.init(name1)
          window.$.connection.subchart.server.joinView(`${name1}`,localStorage.getItem('currentLang'))
        },1000)
      },
      // 加入视图
      joinView(name){
          window.$.connection.subchart.server.joinView(`${name}`,localStorage.getItem('currentLang'))
      },
        exportdata(a){
            this.$refs.table.export(a);
        },
         search(a,num){
           setTimeout(()=>{
            this.$refs.table.search(a,num);
           })
             
          },

   //跳转loading
      loding(){
        var left = this
        setTimeout(function(){
          left.loading1 = false
        },2)
      },

    init(name){
      if(name != undefined){
        this.impor(name)
      }else{
        this.pathNmae = this.$route.path.slice(1)
        if(this.pathName2 != this.pathName){
          this.dataId = this.$route.query.id
        }
        this.name = this.pathNmae
        this.nameC = this.pathNmae
        if(this.popdata){ 
          this.impor(this.popdata)
        }else{
          this.impor(this.nameC)
        }
      }
    }, 
    
     impor(name){
      this.name = name
      this.nameC = name
      if(name == 'onePath'){
        return
      }
    //  //本地服务器读取方法
    //  this.$axios({
    //           method: 'get',
    //           url: `/ViewJson/${name}.json`,
    //       }).then(res => {
      this.$axios({
              method: 'post',
              url: `/api/Main/Main_GetViewJson?argViewName=${name}`,
          }).then(res => {
          this.$nextTick(()=>{
            var data =res.data
            this.data = data.data 
            this.ChartTime()
            let StrokeColor1
            let lage1
            let gradient1
            //渐变色
            var StrokeArr1 = JSON.parse(this.data.Controls.PropertyList.Background)
            if(StrokeArr1.ColorType == 'SolidColor'){
                StrokeColor1 = '#' + StrokeArr1.Data.Color.slice(3) + StrokeArr1.Data.Color.slice(1, 3)
            }else{
                    StrokeColor1 = ''
                    lage1 = StrokeArr1.Data.Angel.toFixed(0)
                for(var f5=0;f5<StrokeArr1.Data.GradientStops.length;f5++){
                    gradient1 = StrokeArr1.Data.GradientStops[f5]
                    StrokeColor1 = StrokeColor1 + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                }
                    StrokeColor1 = '-webkit-linear-gradient('+lage1+'deg'+StrokeColor1+')';
            }
            var color = StrokeColor1
            var width = this.data.Controls.PropertyList.Width
            var height = this.data.Controls.PropertyList.Height
            document.querySelector('.popconter2').style.background=color
            document.querySelector('.popconter2').style.width=width + 'px'
            document.querySelector('.popconter2').style.height=height + 'px'
            var screenWV = window.screen.width   //分辨率宽度
            if(width < screenWV){
              document.querySelector('.popconter2').style.position='absolute'
              document.querySelector('.popconter2').style.bottom=0
              document.querySelector('.popconter2').style.top=0
              document.querySelector('.popconter2').style.left=0
              document.querySelector('.popconter2').style.right=0
              document.querySelector('.popconter2').style.margin='auto'
            }else{
                document.querySelector('.popconter2').style.position='relative'
                document.querySelector('.popconter2').style.bottom='none'
                document.querySelector('.popconter2').style.top='none'
                document.querySelector('.popconter2').style.left='none'
                document.querySelector('.popconter2').style.right='none'
                document.querySelector('.popconter2').style.margin='none'
            }
             this.scriptInit()   //脚本加载时
             this.scriptShow()
          })
              
        })
    // ==========================

      //本地调试读取方法
      //  var data = require(`../../ViewJson/${name}`)
      //  this.data = data
      //  let StrokeColor
      //  let lage
      //  let gradient
      //   //渐变色 
      //  this.$nextTick(()=>{
      //       var StrokeArr = JSON.parse(this.data.Controls.PropertyList.Background)
      //       if(StrokeArr.ColorType == 'SolidColor'){
      //           StrokeColor = '#' + StrokeArr.Data.Color.slice(3) + StrokeArr.Data.Color.slice(1, 3)
      //       }else{
      //               StrokeColor = ''
      //               lage = StrokeArr.Data.Angel.toFixed(0)
      //           for(var f2=0;f2<StrokeArr.Data.GradientStops.length;f2++){
      //               gradient = StrokeArr.Data.GradientStops[f2]
      //               StrokeColor = StrokeColor + ',' + gradient.Color + ' ' + (gradient.Offset*100).toFixed(0) + '%'
      //           }
      //               StrokeColor = '-webkit-linear-gradient('+lage+'deg'+StrokeColor+')';
      //       }
      //   //初始化背景颜色、大小
      //     var width = this.data.Controls.PropertyList.Width
      //     var height = this.data.Controls.PropertyList.Height
      //     document.querySelector('.popconter2').style.background= StrokeColor
      //     document.querySelector('.popconter2').style.width=width + 'px'
      //     document.querySelector('.popconter2').style.height=height + 'px'
      //      var screenWV = window.screen.width   //分辨率宽度
      //     if(width < screenWV){
      //         document.querySelector('.popconter2').style.position='absolute'
      //         document.querySelector('.popconter2').style.bottom=0
      //         document.querySelector('.popconter2').style.top=0
      //         document.querySelector('.popconter2').style.left=0
      //         document.querySelector('.popconter2').style.right=0
      //         document.querySelector('.popconter2').style.margin='auto'
      //     }else{
      //         document.querySelector('.popconter2').style.position='relative'
      //         document.querySelector('.popconter2').style.bottom='none'
      //         document.querySelector('.popconter2').style.top='none'
      //         document.querySelector('.popconter2').style.left='none'
      //         document.querySelector('.popconter2').style.right='none'
      //         document.querySelector('.popconter2').style.margin='none'
      //     }
      //     this.scriptInit()   //脚本加载时
      //     this.scriptShow()
      //     this.ChartTime()
      //  })
        //  ================
     },

      //查询赋值
     queryassignmentFun(name,value){
       
        window.$.connection.subchart.server.query(this.name,name,value,localStorage.getItem('currentLang'))
     },
      //图表实时、查询连接
     ChartTime(){
             window.$.connection.subchart.server.joinView(`${this.name}`,localStorage.getItem('currentLang'))
     },
      //图表定时查询方法
      msgHubFun3(content){
        if(self.$refs.aaquerybutton25){
          var option = self.$refs.aaquerybutton25.timingSearch(content.ViewName,content.Data)
          option.then(x=>window.$.connection.subchart.server.query(content.ViewName,content.Data,x,localStorage.getItem('currentLang'))); 
        }
     },
     //关闭权限提示弹窗
     clonePopFun(){
      this.isTipsPop = false
     },

      //画面显示脚本事件
     scriptShow(){
        var EventScriptList = this.data.Data.EventScriptList
         var EventType = []
         var Typearr = []
         for(var i=0;i<EventScriptList.length;i++){
              if(EventScriptList[i].EventType == 'ShowView'){
                  EventType.push(EventScriptList[i])
              }
         }
          if(EventType.length){
            this.scriptTime2 = setInterval(()=>{
              for(var j=0;j<EventType.length;j++){
                  Typearr.push(EventType[j].Script)
                }
              this.scriptData(Typearr,'','','','','')
            },EventType[0].Period)

          }
     },
     //画面加载脚本事件
     scriptInit(){
           var EventScriptList = this.data.Data.EventScriptList
         var EventType = []
         var Typearr = []
         for(var i=0;i<EventScriptList.length;i++){
              if(EventScriptList[i].EventType == 'InitView'){
                  EventType.push(EventScriptList[i])
              }
         }
          if(EventType.length){
              for(var j=0;j<EventType.length;j++){
                  Typearr.push(EventType[j].Script)
                }
              this.scriptData(Typearr,'','','','','')
          }
     },
     
     //整理数据  Typearr脚本参数 type该dom类型 item该dom数据 pressType点动按钮 numTextData数值显示 it查询按钮
     scriptData(Typearr,type,item,pressType,numTextData,it){
          let endarr  = [] //最终参数
       if(Typearr.length==0){
 if(type != undefined){
         this.scriptItem = item
         this.scriptType = type
       }
       if(pressType != undefined){
           this.pressType = pressType
       }
       if(numTextData != undefined){
           this.numTextData = numTextData
       }
       if(it != undefined){
         this.it = it
       }

        var str = Typearr[0]
        var reg = /[G]+([^G]+?)(?=[)]+|$)/g
        var res
        var data = []
        //获取GetProperty下的（）内容，由于有【和转义符号会报错分开筛选
        while((res = reg.exec(str))!=null){
         
          data.push(res[1])
        }
          var ziarr = []
          var arr = []
          var isShow =true
          //该脚本画面属性有下拉，文本输入，时间的下发事件
          if(data.length){
            for(let j=0;j<data.length;j++){
              var reg1 = /etProperty\(/g;
              var reg2 = /\\/g;
              var reg3 = /"/g  
                var vaee
                if(reg1.test(data[j])){
                  vaee = data[j].replace(reg1,'')
                  vaee = vaee.replace(reg2,'')
                  vaee = vaee.replace(reg3,'')
                  ziarr.push(vaee)                   //用正则取出控件名和类型
                }
            }
   
            if(ziarr.length != 0){
              isShow = false
              //将筛选的数据格式化
              var WebPropertyArr = []
              for(let k=0;k<ziarr.length;k++){
                var aab = this.$refs.DateTimePicker282.TimeValueFun()
                var bbb =this.$refs.Combobox299.TimeValueFun()
                var bbb1 =this.$refs.aaCombinecombobox.TimeValueFun()
                var ccb = this.$refs.textimport27a.TimeValueFun()
                var vv = ''
                if(ziarr[k].split(',')[1].trim() =='SelectedValue'){    //下拉框   //根据类型和控件名赋值
                      for(let f=0;f<bbb.length;f++){
                        if(bbb[f].name == ziarr[k].split(',')[0].trim()){
                            vv = bbb[f].value
                            isShow = true
                        }
                      }
                }else if(ziarr[k].split(',')[1].trim() == 'DateTime'){  //时间
                      for(let f=0;f<aab.length;f++){
                        if(aab[f].name == ziarr[k].split(',')[0].trim()){
                            vv = aab[f].value
                            isShow = true
                        }
                      }
                }else if(ziarr[k].split(',')[1].trim() == 'InputText'){  //文本框
                      for(let f=0;f<ccb.length;f++){
                        if(ccb[f].name == ziarr[k].split(',')[0].trim()){
                            vv = ccb[f].value
                            isShow = true
                        }
                      }
                }
                var vvalue = {
                  Control:ziarr[k].split(',')[0],
                  Property:ziarr[k].split(',')[1].trim(),
                  Value:vv
                }
                WebPropertyArr.push(vvalue)
              }
              var val = {              //格式构成
                ScriptContent:str,
                WebProperty:WebPropertyArr
              }
              arr.push(val)
            }else{
              var val1 = {              //格式构成
                ScriptContent:str,
                WebProperty:[]
              }
              arr.push(val1)
            }
          }else{

            var val2 = {              //格式构成
                ScriptContent:str,
                WebProperty:[]
              }
            arr.push(val2)
          }
          //画面属性选了其他控件
            if(!isShow){
               this.isTipsPop = true
               return
          }
          endarr.push(arr[0])
          console.log('脚本事件',arr)
       }else{
      for(let i=0;i<Typearr.length;i++){
 if(type != undefined){
         this.scriptItem = item
         this.scriptType = type
       }
       if(pressType != undefined){
           this.pressType = pressType
       }
       if(numTextData != undefined){
           this.numTextData = numTextData
       }
       if(it != undefined){
         this.it = it
       }

      let str = Typearr[i]
      let reg = /[G]+([^G]+?)(?=[)]+|$)/g
      let res
      let data = []
        //获取GetProperty下的（）内容，由于有【和转义符号会报错分开筛选
        while((res = reg.exec(str))!=null){
         
          data.push(res[1])
        }
        let ziarr = []
        let arr = []
        let isShow =true
          //该脚本画面属性有下拉，文本输入，时间的下发事件
          if(data.length){
            for(let j=0;j<data.length;j++){
            let reg1 = /etProperty\(/g;
            let reg2 = /\\/g;
            let reg3 = /"/g  
              let vaee
                if(reg1.test(data[j])){
                  vaee = data[j].replace(reg1,'')
                  vaee = vaee.replace(reg2,'')
                  vaee = vaee.replace(reg3,'')
                  ziarr.push(vaee)                   //用正则取出控件名和类型
                }
            }
   
            if(ziarr.length != 0){
              isShow = false
              //将筛选的数据格式化
            let WebPropertyArr = []
              for(let k=0;k<ziarr.length;k++){
              let aab = this.$refs.DateTimePicker282.TimeValueFun()
              let bbb =this.$refs.Combobox299.TimeValueFun()
              let ccb = this.$refs.textimport27a.TimeValueFun()
              let vv = ''
                if(ziarr[k].split(',')[1].trim() =='SelectedValue'){    //下拉框   //根据类型和控件名赋值
                      for(let f=0;f<bbb.length;f++){
                        if(bbb[f].name == ziarr[k].split(',')[0].trim()){
                            vv = bbb[f].value
                            isShow = true
                        }
                      }
                }else if(ziarr[k].split(',')[1].trim() == 'DateTime'){  //时间
                      for(let f=0;f<aab.length;f++){
                        if(aab[f].name == ziarr[k].split(',')[0].trim()){
                            vv = aab[f].value
                            isShow = true
                        }
                      }
                }else if(ziarr[k].split(',')[1].trim() == 'InputText'){  //文本框
                      for(let f=0;f<ccb.length;f++){
                        if(ccb[f].name == ziarr[k].split(',')[0].trim()){
                            vv = ccb[f].value
                            isShow = true
                        }
                      }
                }
              let vvalue = {
                  Control:ziarr[k].split(',')[0],
                  Property:ziarr[k].split(',')[1].trim(),
                  Value:vv
                }
                WebPropertyArr.push(vvalue)
              }
            let val = {              //格式构成
                ScriptContent:str,
                WebProperty:WebPropertyArr
              }
              arr.push(val)
            }else{
            let val1 = {              //格式构成
                ScriptContent:str,
                WebProperty:[]
              }
              arr.push(val1)
            }
          }else{

          let val2 = {              //格式构成
                ScriptContent:str,
                WebProperty:[]
              }
            arr.push(val2)
          }
          //画面属性选了其他控件
            if(!isShow){
               this.isTipsPop = true
               return
          }
          endarr.push(arr[0])
          console.log('脚本事件',arr)
      }
       }

        if(endarr.length == 0){
          console.log()
           endarr = [{ScriptContent:undefined,WebProperty:[]}]
         }
      
          // 修改过的
           if(this.$store.state.websocketsShow != null){
                 console.log('脚本事件111111111',endarr)
             window.$.connection.chart.server.ExecuteScript(endarr)
           }
     },

      //  执行脚本事件
    scriptFunData(scriptData){

      if(this.scriptType == '控制按钮'){
          this.$refs.aaCornerButton6.issueFun(this.scriptItem)
       }
       if(this.scriptType == '点动按钮'){
         var pressType
         if(this.pressType == '1'){
           pressType = '1'
         }else if(this.pressType == '2'){
           pressType = '2'
         }
          console.log("进来吧122211")
         this.$refs.PressButton7.pressFun(this.scriptItem,pressType)
       }
       if(this.scriptType == '数值显示'){
         this.$refs.aaDataTextBlock12.dbClickPop(this.numTextData)
       }
      if(this.scriptType == '查询按钮'){
         this.$refs.aaquerybutton25.searchData(this.scriptItem,this.it)
      }

      var value = scriptData
              for(var i=0;i<value.length;i++){
                var name
                var typeName = 1
                var classDom = $(`.${value[i].Control}`)
                if(classDom.length){
                  name = $(`.${value[i].Control}`).attr('name')
                  typeName = 1
                }else{
                  classDom = $(`.aa${value[i].Control}`)
                  if(classDom.length){
                    name = $(`.aa${value[i].Control}`).attr('name')
                    typeName = 0
                  }
                }
              //直线
              if(name == 'line'){
                var Laa = $(`.${value[i].Control}`).find('.box1').css('mask-size')
                var Lbb = Laa.indexOf(',')
                var Lbbb = Laa.slice(0,Lbbb)
                var Lc = Lbbb.split(' ')
                var La1 = Lc[0].slice(0,Lc[0].length-2)
                var La2 = Lc[1].slice(0,Lc[1].length-2)
                if(value[i].Property == 'opacity'){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
                }
                if(value[i].Property == 'IsSolidLine'){
                  La1 = value[i].Value == 'false' ? '8' : '1'
                  $(`.${value[i].Control}`).find('.box1').css('mask-size',`${La1}px ${La2}px, 0px 0px, 0px 0px, 0px 0px`)
                }
                if( value[i].Property == 'StrokeThickness'){
                  La2 = value[i].Value
                  
                  var height = parseFloat($(`.${value[i].Control}`).css('height'))
                  var marginTop = (Number(height)/2) - (Number(value[i].Value) / 2)

                  $(`.${value[i].Control} .box1`).css('marginTop',marginTop)
                   $(`.${value[i].Control}`).find('.box1').css('mask-size',`${La1}px ${La2}px, 0px 0px, 0px 0px, 0px 0px`)
                }
                if(value[i].Property == 'Stroke'){
                   $(`.${value[i].Control}`).find('.box1').css('background',value[i].Value)
                }
                 let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
        if(value[i].Property == 'Move'){
            
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
              }
              //静态文本
              if(name == 'statictextblock'){
                $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
                     if(value[i].Property == 'font-weight'){
                      if(value[i].Value == 'none'){
                        value[i].Value = 400
                      }
                      $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
                    }
                    if(value[i].Property == 'color'){
                        $(`.${value[i].Control} span`).css(value[i].Property,value[i].Value) 
                    }
                    if(value[i].Property == 'Text'){
                      $(`.${value[i].Control}`).text(value[i].Value)
                    }
                    if(value[i].Property == 'border-radius'){
                       $(`.${value[i].Control}`).css(value[i].Property,'0px')
                    }
             let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                       for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
       if(value[i].Property == 'Move'){
             
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
              }
              //矩形
              if(name == 'solidrectangle'){
                var Raa = $(`.${value[i].Control}`).find('.box').css('mask-size')
                var Rbb = Raa.indexOf(',')
                var Rbbb = Raa.slice(0,Rbb)
                var Rc = Rbbb.split(' ')
                var Ra1 = parseInt(Rc[0])
                var Ra2 = parseInt(Rc[1])
                if(value[i].Property == 'opacity'){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
                }
                if(value[i].Property == 'IsSolidLine'){
                  Ra1 = value[i].Value == 'false' ? '8' : '1'
                  $(`.${value[i].Control}`).find('.box').css('mask-size',`${Ra1}px ${Ra2}px, ${Ra2}px ${Ra1}px, ${Ra1}px ${Ra2}px, ${Ra2}px ${Ra1}px`)
                }
                if( value[i].Property == 'StrokeThickness'){
                  Ra2 = value[i].Value
                   $(`.${value[i].Control}`).find('.box').css('mask-size',`${Ra1}px ${Ra2}px, ${Ra2}px ${Ra1}px, ${Ra1}px ${Ra2}px, ${Ra2}px ${Ra1}px`)
                }
                if(value[i].Property == 'Stroke'){
                   $(`.${value[i].Control}`).find('.box').css('background',value[i].Value)
                }
                if(value[i].Property == 'background'){
                    $(`.${value[i].Control}`).find('.conter').css('background',value[i].Value)
                }
                  let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
       for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
    if(value[i].Property == 'Move'){
             
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
              }
              //控制按钮、点动、弹窗、跳转
              if(name == 'cornerbutton' || name == 'pressbutton' || name == 'tabmodulebutton' || name == 'popupbutton'){
                 if(value[i].Property == 'background'){
                    $(`.${value[i].Control}`).find('.conten').css('background',value[i].Value)
                }
                if(value[i].Property == 'text-decoration'){
                  $(`.${value[i].Control}`).css(value[i].Property,'none') 
                }
                if(value[i].Property == 'Text'){
                  $(`.${value[i].Control}`).find('.contenText').text(value[i].Value) 
                }
                if(value[i].Property == 'StrokeThickness'){
                  var lineHeight = parseInt($(`.${value[i].Control}`).css('height'))
                 $(`.${value[i].Control}`).css('padding',value[i].Value) 
                 $(`.${value[i].Control}`).css('line-height',lineHeight - (value[i].Value * 2) + 'px') 
                }
                if(value[i].Property == 'opacity'){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
                }
                 if(value[i].Property == 'font-family'){
                  $(`.${value[i].Control}`).find('.contenText').css(value[i].Property,value[i].Value) 
                }
                 if(value[i].Property == 'font-weight'){
                   if(value[i].Value == 'none'){
                     value[i].Value = 400
                   }
                  $(`.${value[i].Control}`).find('.contenText').css(value[i].Property,value[i].Value) 
                }
                 if(value[i].Property == 'font-size'){
                  $(`.${value[i].Control}`).find('.contenText').css(value[i].Property,value[i].Value) 
                }
                if(value[i].Property == 'color'){
                  $(`.${value[i].Control}`).find('.contenText').css(value[i].Property,value[i].Value) 
                }
                 if(value[i].Property == 'border-radius'){
                  $(`.${value[i].Control}`).find('.conten').css(value[i].Property,value[i].Value) 
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                  if(value[i].Property == 'Stroke'){
                  $(`.${value[i].Control}`).css('background',value[i].Value) 
                }
                  let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                     for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
    if(value[i].Property == 'Move'){
              
                if(movehtml){
                  if(!$(`.${value[i].Control}`).is(':animated')){
                     movehtml=`$('.`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
              }
              //开关
              if(name == 'switch'){
                if(value[i].Property == 'background'){
                  if(typeName == 1){
                    $(`.${value[i].Control}`).find('.switch-text').css('color',value[i].Value) 
                  }else{
                    if($(`.aa${value[i].Control}ipt`)[0].checked){
                      $(`.aa${value[i].Control}`).find('#switch-area').css('background',value[i].Value)
                    }
                  }
                }
                  if(value[i].Property == 'font-family'){  
                    
                   if(typeName == 1){
                     $(`.${value[i].Control}`).find('.switch-text').css('font-family',value[i].Value) 
                   }else{
                     $(`.aa${value[i].Control}`).find('.switch-text').css('font-family',value[i].Value) 
                   }
                }
                 if(value[i].Property == 'font-size'){
                   if(typeName == 1){
                     $(`.${value[i].Control}`).find('.switch-text').css(value[i].Property,value[i].Value) 
                   }else{
                     $(`.aa${value[i].Control}`).find('.switch-text').css(value[i].Property,value[i].Value) 
                   }
                }
                 if(value[i].Property == 'opacity'){
                   if(typeName == 1){
                     $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
                   }else{
                     $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value) 
                   }
                }
                 if(value[i].Property == 'font-weight'){
                   if(value[i].Value == 'none'){
                     value[i].Value = 400
                   }
                  $(`.${value[i].Control}`).find('.switch-text').css(value[i].Property,value[i].Value) 
                }
                if(typeName == 1){
                let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
         for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                      }
                  }
              }
        if(value[i].Property == 'Move'){
             
                if(movehtml){
                  if(!$(`.${value[i].Control}`).is(':animated')){
                     movehtml=`$('.`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
                }else{
                     let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
              for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
          if(value[i].Property == 'Move'){
           
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
                }
              }
              //数值输入、读写框
              if(name == 'datatextbox' || name =="rwtextbox"){
                var Ih
                var Iw
                 if(typeName == 1){
                   Ih = parseInt($(`.${value[i].Control}`).css('height'))
                   Iw = parseInt($(`.${value[i].Control}`).css('width'))
                 }else{
                   Ih = parseInt($(`.aa${value[i].Control}`).css('height'))
                   Iw = parseInt($(`.aa${value[i].Control}`).css('width'))
                 }
               if(value[i].Property == 'opacity'){
                 if(typeName == 1){
                   $(`.${value[i].Control}`).parents('.contenBox').css(value[i].Property,value[i].Value)
                 }else{
                   $(`.aa${value[i].Control}`).parents('.contenBox').css(value[i].Property,value[i].Value)
                 }
               }
               if(value[i].Property == 'background'){
                 if(typeName == 1){
                   $(`.${value[i].Control}`).parents('.conten').css(value[i].Property,value[i].Value)
                 }else{
                   $(`.aa${value[i].Control}`).parents('.conten').css(value[i].Property,value[i].Value)
                 }
              }
              if(value[i].Property == 'font-size'){
                if(typeName == 1){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
                }else{
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
              }
              if(value[i].Property == 'color'){
                if(typeName == 1){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
                }else{
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
              }
              if(value[i].Property == 'font-weight'){
                if(value[i].Value == 'none'){
                  value[i].Value = 400
                }
                if(typeName == 1){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
                }else{
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
              }
              if(value[i].Property == 'font-family'){
                if(typeName == 1){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
                }else{
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
              }
              if(value[i].Property == 'text-decoration'){
                if(typeName == 1){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
                }else{
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
              }
              if(value[i].Property == 'Stroke'){
                if(typeName == 1){
                  $(`.${value[i].Control}`).parents('.contenBox').css('background',value[i].Value)
                }else{
                  $(`.aa${value[i].Control}`).parents('.contenBox').css('background',value[i].Value)
                }
              }
              if(value[i].Property == 'StrokeThickness'){
                if(typeName == 1){
                  $(`.${value[i].Control}`).parents('.contenBox').css('padding',value[i].Value + 'px')
                }else{
                  $(`.aa${value[i].Control}`).parents('.contenBox').css('padding',value[i].Value + 'px')
                }
              }
              if(typeName == 1){
                      let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.${value[i].Control}`).parents('.contenBox')[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.${value[i].Control}`).parents('.contenBox')[0].style.width);
                 let moveleft = parseFloat($(`.${value[i].Control}`).parents('.contenBox')[0].style.left);
                 let movetop = parseFloat($(`.${value[i].Control}`).parents('.contenBox')[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                      for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
        if(value[i].Property == 'Move'){
            
                if(movehtml){
                  if(!$(`.${value[i].Control}`).parents('.contenBox').is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`').parents('.contenBox')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
              }else{
                let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`).parents('.contenBox')[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`).parents('.contenBox')[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`).parents('.contenBox')[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`).parents('.contenBox')[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
         for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
      if(value[i].Property == 'Move'){
              
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`.parents('.contenBox')).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`').parents('.contenBox')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
              }
            }
            //数值显示
            if(name == 'datatextblock'){
               var Th = parseInt($(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1').css('height'))
               if(value[i].Property == 'opacity'){
                 $(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1').css(value[i].Property,value[i].Value)
               }
               if(value[i].Property == 'background'){
                 $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
              }
               if(value[i].Property == 'font-size'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'color'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'font-weight'){
                  if(value[i].Value == 'none'){
                    value[i].Value = 400
                  }
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'font-family'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'text-decoration'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'Stroke'){
                $(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1').css('background',value[i].Value)
              }
              if(value[i].Property == 'StrokeThickness'){
                $(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1').css('padding',value[i].Value + 'px')
                $(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1').css('line-height',Th - (value[i].Value * 2) + 'px')
              }
                  let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1')[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1')[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1')[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1')[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
              for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
  if(value[i].Property == 'Move'){
              
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).parents('.DataTextBlock121aa1').is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`').parents('.DataTextBlock121aa1')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            //圆形
            if(name == 'ellipselamp' || name=='commonlamp'){
              if(value[i].Property == 'opacity'){
                 $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
               }
              
                    let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
         for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                      }
                  }
              }
            if(value[i].Property == 'Move'){
              
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            //矩形
            if(name=='commonlamp'){
               if(value[i].Property == 'border-radius'){
                 $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
               }
                 let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                    for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
     if(value[i].Property == 'Move'){
             
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            //动态文本
            if(name=="dynamictext"){
             if(value[i].Property == 'opacity'){
                 $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
               }
               if(value[i].Property == 'background'){
                 $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
              }
               if(value[i].Property == 'font-size'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'color'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'font-weight'){
                  if(value[i].Value == 'none'){
                    value[i].Value = 400
                  }
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'font-family'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'text-decoration'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                      let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                 for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
                if(value[i].Property == 'Move'){
              
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            //动态图
            if(name == 'image'){
               if(value[i].Property == 'opacity'){
                 $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
               }
            let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                  for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
      if(value[i].Property == 'Move'){
            
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            //查询、导出
            if(name == 'outputbutton' || name == 'querybutton'){
               if(value[i].Property == 'background'){
                    $(`.${value[i].Control}`).find('.conten').css('background',value[i].Value)
                }
                if(value[i].Property == 'text-decoration'){
                  $(`.${value[i].Control}`).css(value[i].Property,'none') 
                }
                if(value[i].Property == 'Text'){
                  $(`.${value[i].Control}`).find('.contenText').text(value[i].Value) 
                }
                if(value[i].Property == 'opacity'){
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
                }
                if(value[i].Property == 'Stroke'){
                  $(`.${value[i].Control}`).css('background',value[i].Value)
                }
              
                 if(value[i].Property == 'font-weight' || value[i].Property == 'font-family' || value[i].Property == 'font-size'
                 || value[i].Property == 'color'){
                   if(value[i].Value == 'none' && value[i].Property == 'font-weight'){
                     value[i].Value = 400
                   }
                  $(`.${value[i].Control}`).find('.contenText').css(value[i].Property,value[i].Value) 
                }


                 if(value[i].Property == 'border-radius'){
                  $(`.${value[i].Control}`).find('.conten').css(value[i].Property,value[i].Value) 
                  $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'StrokeThickness'){
                  $(`.${value[i].Control}`).css('padding',value[i].Value)
                }
                   let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                    for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
   if(value[i].Property == 'Move'){
        
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            if(name == 'solidellipse'){   //圆
               var Sh = parseInt($(`.${value[i].Control}`).css('height'))
               var Sw = parseInt($(`.${value[i].Control}`).css('width'))
              if(value[i].Property == 'background'){
                $(`.${value[i].Control}`).find('#myellipse')[0].style.fill=value[i].Value
              }
              if(value[i].Property == 'Stroke'){
                $(`.${value[i].Control}`).find('#myellipse')[0].style.stroke=value[i].Value
              }
               if(value[i].Property == 'opacity'){
                $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
               }
              if(value[i].Property == 'StrokeThickness'){
                 $(`.${value[i].Control}`).find('#myellipse')[0].style.strokeWidth=value[i].Value
                 $(`.${value[i].Control}`).find('#myellipse')[0].style.cx=(Sw-(value[i].Value*2))/2+Number(value[i].Value)
                 $(`.${value[i].Control}`).find('#myellipse')[0].style.cy=(Sh-(value[i].Value*2))/2+Number(value[i].Value)
                 $(`.${value[i].Control}`).find('#myellipse')[0].style.rx=(Sw-value[i].Value)/2
                 $(`.${value[i].Control}`).find('#myellipse')[0].style.ry=(Sh-value[i].Value)/2
               }
              if(value[i].Property == 'opacity'){
                 $(`.${value[i].Control}`).css(value[i].Property,value[i].Value) 
               }
                if(value[i].Property == 'IsSolidLine'){
                $(`.${value[i].Control}`).find('#myellipse')[0].style.strokeDasharray=value[i].Value=='true'? 'none' : '5 5'
               }
                 let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                    for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
  if(value[i].Property == 'Move'){
              
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            if(name == 'staticimage'){  //静态图片
              if(value[i].Property == 'Source'){
                $(`.${value[i].Control}`).find('.boximg')[0].src =  `/images/${value[i].Value}`
              }
              if(value[i].Property == 'opacity'){
                 $(`.${value[i].Control}`).css(value[i].Property,value[i].Value)
               }
                 let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                     for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                      }
                  }
              }
    if(value[i].Property == 'Move'){
            
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
             if(name == 'Combobox'){  //下拉框样式
              if(value[i].Property == 'background' || value[i].Property == 'color' || value[i].Property == 'font-family'
              || value[i].Property == 'font-weight' || value[i].Property == 'font-size' || value[i].Property == 'text-decoration'){
                  if(value[i].Value == 'none'){
                    value[i].Value = ''
                  }
                 $(`.aa${value[i].Control}`).find('.el-input__inner').css(value[i].Property,value[i].Value)
              }
              if(value[i].Property == 'Stroke'){
                $(`.aa${value[i].Control}`).css('background',value[i].Value)
              }
              if(value[i].Property == 'StrokeThickness'){
                $(`.aa${value[i].Control}`).css('padding',value[i].Value)
              }
              if(value[i].Property == 'opacity'){
                $(`.aa${value[i].Control}`).css('opacity',value[i].Value)
              }
                 let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                 for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
      if(value[i].Property == 'Move'){
         
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            if(name == "DateTimePicker"){  //时间控件样式
              if(value[i].Property == 'background' || value[i].Property == 'color' || value[i].Property == 'font-size' 
              || value[i].Property == 'text-decoration' || value[i].Property == 'font-weight' || value[i].Property == 'font-family'){
                if(value[i].Value == 'none'){
                    value[i].Value = ''
                }
                $(`.aa${value[i].Control}picker`).find('.el-input__inner').css(value[i].Property,value[i].Value)
              }
              if(value[i].Property == 'Stroke'){
                $(`.aa${value[i].Control}`).css('background',value[i].Value)
              }
               if(value[i].Property == 'StrokeThickness'){
                $(`.aa${value[i].Control}`).css('padding',value[i].Value)
              }
              if(value[i].Property == 'opacity'){
                $(`.aa${value[i].Control}`).css('opacity',value[i].Value)
              }
              let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                     for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
 if(value[i].Property == 'Move'){
             
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            if(name == 'textimport'){ //数值输入
               if(value[i].Property == 'background'){
                    $(`.aa${value[i].Control}`).find('.conten').css('background',value[i].Value)
                }
                if(value[i].Property == 'opacity'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value) 
                }
                if(value[i].Property == 'text-decoration' || value[i].Property == 'font-family' 
                || value[i].Property == 'font-weight' || value[i].Property == 'font-size' || value[i].Property == 'color'){
                  if(value[i].Value == 'none'){
                     value[i].Value = 400
                   }
                  $(`.aa${value[i].Control}`).find('.textimportInput').css(value[i].Property,value[i].Value) 
                }
                if(value[i].Property == 'StrokeThickness'){
                  $(`.aa${value[i].Control}`).css('padding',value[i].Value)
                }
                if(value[i].Property == 'Stroke'){
                  $(`.aa${value[i].Control}`).css('background',value[i].Value)
                }
                let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
             for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
   if(value[i].Property == 'Move'){
            
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            if(name == 'NumberScreen'){  //数值筛选
                if(value[i].Property == 'background'){
                  $(`.aa${value[i].Control}`).css('background',value[i].Value)
                  $(`.aa${value[i].Control}`).find('.elSelect').css('background',value[i].Value)
                  $(`.aa${value[i].Control} .el-select-dropdown`).css('background',value[i].Value)
                }   
                if(value[i].Property == 'Stroke'){
                  var borderColor = `linear-gradient(to right,${value[i].Value},${value[i].Value}) 1 10`
                  $(`.aa${value[i].Control}`).find('.elSelect').css('border-image',borderColor)
                  $(`.aa${value[i].Control}`).find('.elInput1').css('border-image',borderColor)
                  $(`.aa${value[i].Control}`).find('.elInput2').css('border-image',borderColor)
                }
                if(value[i].Property == 'StrokeThickness'){
                  $(`.aa${value[i].Control}`).find('.elSelect').css('border-width',value[i].Value)
                  $(`.aa${value[i].Control}`).find('.elInput1').css('border-width',value[i].Value)
                  $(`.aa${value[i].Control}`).find('.elInput2').css('border-width',value[i].Value)
                }
                if(value[i].Property == 'color' || value[i].Property == 'font-size' || value[i].Property == 'font-weight' 
                || value[i].Property == 'font-family' || value[i].Property == 'text-decoration'){
                   if(value[i].Value == 'none'){
                    value[i].Value = ''
                  }
                  if(value[i].Property != 'text-decoration'){
                    $(`.aa${value[i].Control}`).find('input').css(value[i].Property,value[i].Value)
                  }
                  $(`.aa${value[i].Control}`).find('.elInput1').css(value[i].Property,value[i].Value)
                  $(`.aa${value[i].Control}`).find('.elInput2').css(value[i].Property,value[i].Value)
                }
                if(value[i].Property == 'opacity'){
                  $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value) 
                }
                  let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
    if(value[i].Property == 'Move'){
           
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }

            if(name == 'alert'){ //报警控件
              if(value[i].Property == 'opacity' || value[i].Property == 'border-radius'){
                $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value) 
              }
              if(value[i].Property == 'HeaderFontFamily'){
                   $(`.aa${value[i].Control}AlarmTitle`).css('fontFamily',value[i].Value)
              }
              if(value[i].Property == 'HeaderFontSize'){
                // $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_no').css('fontSize',value[i].Value)
                // $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_text').css('fontSize',value[i].Value)

                 let flooH = $(`.aa${value[i].Control}alarm_fool`).height()
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_no').css('width','auto')
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_no').css('fontSize',`${value[i].Value}px`)
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_text').css('fontSize',`${value[i].Value}px`)
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_no').css('lineHeight',`${value[i].Value}px`)
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_text').css('lineHeight',`${value[i].Value}px`)
                $(`.aa${value[i].Control}AlarmTitle`).parents('.alarm_title').css('height',`${value[i].Value}px`)
                $(`.aa${value[i].Control}alarm_conter`).css('height',`calc(100% - 28px - ${value[i].Value}px - ${flooH}px)`)

              }
              if(value[i].Property == 'HeaderForeground'){
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_no').css('color',value[i].Value)
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_text').css('color',value[i].Value)
              }
              if(value[i].Property == 'HeaderIsBlod'){
                let weight
                if(value[i].Value == 'true'){
                  weight = 'bold'
                }else{
                  weight = ''
                }
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_no').css('font-weight',weight)
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_text').css('font-weight',weight)
              }
              if(value[i].Property == 'HeaderTextDecorations'){
                let TextDecorations
                 if(value[i].Value == 'true'){
                  TextDecorations = 'underline'
                }else{
                  TextDecorations = 'none'
                }
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_no').css('text-decoration',TextDecorations)
                $(`.aa${value[i].Control}AlarmTitle`).find('.alarm_title_text').css('text-decoration',TextDecorations)
              }
              if(value[i].Property == 'ItemBackground'){
                  $(`.aa${value[i].Control}`).find('.alarm_conter').css('background',value[i].Value)
              }
               if(value[i].Property == 'color' || value[i].Property == 'font-size' || 
                  value[i].Property == 'font-family' || value[i].Property == 'font-weight' || value[i].Property == 'text-decoration'){
                  if( value[i].Property == 'font-weight'){
                      if(value[i].Value == 'none'){
                          value[i].Value = ''
                      }
                  }
                  if(value[i].Property == 'font-size'){
                      $(`.aa${value[i].Control}`).find('.alarm_fool_num').css('lineHeight',value[i].Value)
                      $(`.aa${value[i].Control}`).find('.alarm_fool_num').css('lineHeight',value[i].Value)
                      var headH =$(`.aa${value[i].Control}AlarmTitle`).height()
                      $(`.aa${value[i].Control}alarm_conter`).css('height',`calc(100% - 28px - ${headH}px - ${value[i].Value})`)
                  }
                   if(value[i].Property != 'color'){
                      $(`.aa${value[i].Control}`).find('.alarm_fool_num').css(value[i].Property,value[i].Value)
                  }

                  $(`.aa${value[i].Control}`).find('.alarm_conter_no').css(value[i].Property,value[i].Value)
                  $(`.aa${value[i].Control}`).find('.alarm_conter_text').css(value[i].Property,value[i].Value)
                  $(`.aa${value[i].Control}`).find('.alarm_fool_text').css(value[i].Property,value[i].Value)
               }
               if(value[i].Property == 'background'){
                 $(`.aa${value[i].Control}`).find('.alarm_box2').css(value[i].Property,value[i].Value)
               }
               if(value[i].Property == 'StrokeThickness'){
                 $(`.aa${value[i].Control}`).css('padding',value[i].Value)
               }  
               if(value[i].Property == 'Stroke'){
                 $(`.aa${value[i].Control}`).css('background',value[i].Value)
               }
              let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
       for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
      if(value[i].Property == 'Move'){
          
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
                        if(name == 'flowpipe'){ //流动控件

               if(value[i].Property == 'background'){
                 $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
               }
                if(value[i].Property == 'opacity'){
                 $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
               }
                 if(value[i].Property == "linestroke"){
                   for(let i1 =0;i1<$(`.${value[i].Control}`).find('.flowline').length;i1++){
                      $($(`.aa${value[i].Control}`).find('.flowline')[i1]).css('background',value[i].Value)
                   }
               }
       let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
             for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                  }
                  }
              }
   if(value[i].Property == 'Move'){
              
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
            if(name == 'tank'){
               if(value[i].Property == 'background'){
                $(`.aa${value[i].Control}`).find('.tankfill').css(value[i].Property,value[i].Value)
               }
                if(value[i].Property == 'opacity'){
                 $(`.aa${value[i].Control}`).css(value[i].Property,value[i].Value)
               }
                 if(value[i].Property == "border-radius"){
                    $(`.aa${value[i].Control}`).find('.tankfill').css(value[i].Property,value[i].Value)
               }
                  if(value[i].Property == "liquidfill"){
                    $(`.aa${value[i].Control}`).find('.liquidfill').css('background',value[i].Value)
               }
             
              let bodytop = parseFloat($('.popconter2')[0].style.height) - parseFloat($(`.aa${value[i].Control}`)[0].style.height);
                 let bodyleft = parseFloat($('.popconter2')[0].style.width) - parseFloat($(`.aa${value[i].Control}`)[0].style.width);
                 let moveleft = parseFloat($(`.aa${value[i].Control}`)[0].style.left);
                 let movetop = parseFloat($(`.aa${value[i].Control}`)[0].style.top);
                 let moveindex = -1
                 let movetime = 0
                 let movetype = 0
                 let movehtml = ``
                for(let j = 0;j<value.length;j++){
                 moveindex++
                  if(value[i].Control==value[j].Control){
                  if(value[j].Property == 'Move'){
                      
                      if(value[j].Value.CoordinateType == 1){
                       movetype = 1;
                       movetop += value[j].Value.Y
                       moveleft += value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                       movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }else if(value[j].Value.CoordinateType == 2){
                       movetype = 2;
                       movetop = value[j].Value.Y
                       moveleft = value[j].Value.X
                       movetime = value[j].Value.Time
                        if(movetop>bodytop){
                         movetop = bodytop
                       }
                        if(moveleft>bodyleft){
                         moveleft = bodyleft
                       }
                        movehtml+=`.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`
                      }
                      }
                  }
              }
   if(value[i].Property == 'Move'){
               
                if(movehtml){
                  if(!$(`.aa${value[i].Control}`).is(':animated')){
                     movehtml=`$('.aa`+value[i].Control+`')`+movehtml
                     eval(movehtml)
                  }
                   
                }
             
               }
            }
          }

    },
    }
}
</script>

<style scoped lang="scss">
.aabtablecover{
  position: fixed;
  z-index: 99999999999;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: none;
  width: 400px;
  height: 170px;
  .btabletop{
    width: 400px;
height: 40px;
background: #386DF0;
color: #fff;
line-height: 40px;
text-align: center;

  }
  .btableconter{
    width: 400px;
height: 130px;
background: #EEEEEE;
box-shadow: 0px 0px 60px 0px rgba(15, 16, 16, 0.16);
  }
  span{
    position: relative;
    font-size: 13px;
    top: 25px;
    left: 50px;
  }
  .tablebigpass{
    position: relative;
    width: 330px;
    height: 15px;
    top: 40px;
    left: 40px;
    background: #CACACA;
    border-radius: 8px;
  }
  .tablesmallpass{
    position: relative;
    width: 0px;
    height: 15px;
    background: #00C297;
    border-radius: 8px;
  }
  .tablepassword{
    position: absolute;
    right: 20px;
    font-size: 13px;
    top: -1px;
  }
}
.popconter2{
  position:relative;
  margin-bottom:30px;
}
.popconter_box{
   position:relative;
   width:100%;
   height:100%;
}
.mask_box{
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        z-index: 999;
    }
    
</style>
