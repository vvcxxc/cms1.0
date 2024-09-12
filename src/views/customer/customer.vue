<!--
 * @Description: 这是二次开发主页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-09 15:25:36
 -->
<!-- 90vh 78px-->
<!-- 版本号   1.3.6.4-->
<template>
    <div
        @scroll="scroll()"
        class="customerPage"
        style="position:relative;overflow:auto;margin-bottom:0px;margin-top:100px;"
        :style="[{ height: nowoverflow }, { width: newoverflow },{marginTop:heardertop}]"
    >
        <div class="btablecover">
            <div class="btabletop">{{lang.ReportForm_ExportProgress}}</div>
            <div class="btableconter">
                <span class="btableconterword">{{lang.ReportForm_Exporting}}</span>
                <el-progress
                    :text-inside="true"
                    :stroke-width="26"
                    :percentage="percentage"
                ></el-progress>
                <!-- <div class='tablebigpass'>
        <div class="tablesmallpass">
        
          <div class='tablepassword'>30%</div>
        </div>
      </div> -->
            </div>
        </div>
        <!-- <div class = 'scalediv1' v-if='this.$store.state.screentype == 1||this.$store.state.screentype == 3||this.$store.state.screentype == 2||this.$store.state.screentype == 4'>
  <div  v-loading="this.$store.state.isShow" class="big_box report">
    <LineVue1 :dataId="dataId" :dae="data" :key="1+componentKey"></LineVue1>
    <RectangleVue2 :dataId="dataId" :dae="data" :key="2+componentKey"></RectangleVue2>
    <EllipseVue3 :dataId="dataId" :dae="data" :key="3+componentKey"></EllipseVue3>
    <StaticImage4 :dataId="dataId" :name="name" :dae="data" :key="4+componentKey"></StaticImage4>
    <StaticTextBlock5 :dataId="dataId" :dae="data" :key="5+componentKey"></StaticTextBlock5>
    <CornerButton6 ref="CornerButton6" :dataId="dataId" :dae="data" :key="6+componentKey"></CornerButton6>
    <PressButton7 ref="PressButton7" :dataId="dataId" :dae="data" :key="7+componentKey"></PressButton7>
    <Switch8 ref="Switch8a" :dataId="dataId" :dae="data" :key="8+componentKey"></Switch8>
    <TabModuleButton9 :dataId="dataId" class="TabModuleVButton" :dae="data" :key="9+componentKey" ></TabModuleButton9>
    <PopupButton10 :dataId="dataId" :ViewName="name" :dae="data" :key="10+componentKey"></PopupButton10>
    <TextBox11 :dataId="dataId" :dae="data" :key="11+componentKey"></TextBox11>
    <DataTextBlock12 ref="DataTextBlock12" :dataId="dataId" :dae="data" :key="12+componentKey"></DataTextBlock12>
    <RWTextBox13 ref="RWTextBox13" :dataId="dataId" :dae="data" :key="13+componentKey"></RWTextBox13>
    <Alarm14 :dataId="dataId" ref="Alarm14" :dae="data" :key="14+componentKey"></Alarm14>
    <EllipseLamp15 ref="EllipseLamp" :dataId="dataId" :dae="data" :key="15+componentKey"></EllipseLamp15>
    <CommonLamp16 ref="CommonLamp" :dataId="dataId" :dae="data" :key="16+componentKey"></CommonLamp16>
    <DynamicText17 ref="dynamicyext17" :dataId="dataId" :dae="data" :key="17+componentKey"></DynamicText17>
    <Image18 ref="Dimage" :dataId="dataId" :name="name" :dae="data" :key="18+componentKey"></Image18>
    <PieChart20 :dataId="dataId" :dae="data" :ViewName="name" :contentName="contentName" :chartdata="contentData" :key="20+componentKey"></PieChart20>
    <DashBoardChart21 :type="type" :dataId="dataId" :ViewName="name" :contentName="contentName" :dae="data" :chartdata="contentData" :key="21+componentKey"></DashBoardChart21>
    <LineChart22 :dataId="dataId" :dae="data" :ViewName="name" :contentName="contentName" :chartdata="contentData" :key="22+componentKey"></LineChart22>
    <ColumnChart23 :dataId="dataId" :dae="data" :ViewName="name" :contentName="contentName" :chartdata="contentData" :key="23+componentKey"></ColumnChart23> 
    <PolylineColumnChart24 :dataId="dataId" :ViewName="name" :contentName="contentName" :dae="data" :chartdata="contentData" :key="24+componentKey"></PolylineColumnChart24> -->
        <!-- 筛选控件 -->
        <!-- <querybutton25 ref="querybutton25" :dataId="dataId" :dae="data" :PageName="name" @search='search' :key="25+componentKey"></querybutton25>
    <outputbutton26 :dataId="dataId" :dae="data" @exportdata='exportdata' :key="26+componentKey"></outputbutton26>
    <textimport27a ref="textimport27a" :dataId="dataId" :dae="data" :key="27+componentKey"></textimport27a>
    <DateTimePicker282 ref="DateTimePicker282" :dataId="dataId" :dae="data" :key="28+componentKey"></DateTimePicker282>
    <Combobox299 ref="Combobox299" :dataId="dataId" :dae="data" :key="29+componentKey"></Combobox299>
    <Customreport :dataId="dataId" :dae="data" ref="table" @percentage1='percentage1'></Customreport>
    <NumberScreen30 ref="NumberScreen30" :dataId="dataId" :dae="data" :key="30+componentKey"></NumberScreen30> -->
        <!-- 视频控件 -->
        <!-- <Video ref="Video" :dataId="dataId" :dae="data" :name='name'></Video>
    <MobileProducts ref="mobileProducts"  :dataId="dataId" :dae="data" :key="31+componentKey"></MobileProducts>
    <DynamicProducts ref="Dyn1" :dataId="dataId" :dae="data" :key="32+componentKey"></DynamicProducts>
   <FlowPipe ref='FlowPipe' :dataId="dataId" :dae="data" :key="33+componentKey"></FlowPipe>   -->
        <!-- 权限失败提示弹窗 -->
        <!-- <TipsPop :popText="TipsPopText" v-if="isTipsPop"></TipsPop>
    <Tank ref='Tank' :dataId="dataId" :dae="data" :key="34+componentKey"></Tank> -->

        <!-- 矩阵控件 -->
        <!-- <MatrixGrid ref="MatrixGrid" :dataId="dataId" :dae="data" :key="35+componentKey"/>
    <MatrixGridSet ref="MatrixGridSet" :dataId="dataId" :dae="data" :key="36+componentKey"/>
  
    <div v-if="isTipsPop" class="mask_box"></div>
  

</div>

</div> -->
      <div class="tip" v-if="tipchange" :style="{zoom: zoomValue}">
            <div
                class="tiphead"
                style="position:absolute;width: 380px;height: 40px;"
            ></div>
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword">{{tipword}}</div>
                <div class="delclass" v-if="deltrue">
                    <div class="one" @click="shownotip">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="issueFun">{{lang.MessageBox_YES}}</div>
                </div>
                <div class="tipdetermine" v-else @click="shownotip" >{{lang.PopupCommon_Sure}}</div>
            </div>
        </div>
         <div class="cover1111" v-if="tipchange" @mouseup.stop="upFun()"></div>
         <div v-loading="true" class="loadbox"   v-if="this.$store.state.isShow" @mouseup.stop="upFun()"> </div>
        <div class="scalediv1">
            <div class="big_box report"  >
                <LineVue1
                    :dataId="dataId"
                    :dae="data"
                    :key="1 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></LineVue1>
                <RectangleVue2
                    :dataId="dataId"
                    :dae="data"
                    :key="2 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></RectangleVue2>
                <EllipseVue3
                    :dataId="dataId"
                    :dae="data"
                    :key="3 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></EllipseVue3>
                <StaticImage4
                    ref="StaticImage4"
                    :dataId="dataId"
                    :name="name"
                    :dae="data"
                    :key="4 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></StaticImage4>
                <StaticTextBlock5
                    :dataId="dataId"
                    :dae="data"
                    :key="5 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></StaticTextBlock5>
                <CornerButton6
                    ref="CornerButton6"
                    :dataId="dataId"
                    :dae="data"
                    :key="6 + componentKey"
                    @showtip="showtip" @shownotip="shownotip" @showIssueTip="showIssueTip"
                ></CornerButton6>
                <PressButton7
                    ref="PressButton7"
                    :dataId="dataId"
                    :dae="data"
                    :key="7 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></PressButton7>
                <Switch8
                    ref="Switch8a"
                    :dataId="dataId"
                    :dae="data"
                    :key="8 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></Switch8>
                <TabModuleButton9
                    :dataId="dataId"
                    class="TabModuleVButton"
                    :dae="data"
                    :key="9 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></TabModuleButton9>
                <PopupButton10
                    :dataId="dataId"
                    :ViewName="name"
                    :dae="data"
                    :key="10 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></PopupButton10>
                <TextBox11
                    :dataId="dataId"
                    :dae="data"
                    :key="11 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></TextBox11>
                <DataTextBlock12
                    ref="DataTextBlock12"
                    :dataId="dataId"
                    :dae="data"
                    :key="12 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></DataTextBlock12>
                <RWTextBox13
                    ref="RWTextBox13"
                    :dataId="dataId"
                    :dae="data"
                    :key="13 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></RWTextBox13>
                <Alarm14
                    :dataId="dataId"
                    ref="Alarm14"
                    :dae="data"
                    :key="14 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></Alarm14>
                <EllipseLamp15
                    ref="EllipseLamp"
                    :dataId="dataId"
                    :dae="data"
                    :key="15 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></EllipseLamp15>
                <CommonLamp16
                    ref="CommonLamp"
                    :dataId="dataId"
                    :dae="data"
                    :key="16 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></CommonLamp16>
                <DynamicText17
                    ref="dynamicyext17"
                    :dataId="dataId"
                    :dae="data"
                    :key="17 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></DynamicText17>
                <Image18
                    ref="Dimage"
                    :dataId="dataId"
                    :name="name"
                    :dae="data"
                    :key="18 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></Image18>
                <PieChart20
                    :dataId="dataId"
                    :dae="data"
                    :ViewName="name"
                    :contentName="contentName"
                    :chartdata="contentData"
                    :key="20 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></PieChart20>
                <DashBoardChart21
                    :type="type"
                    :dataId="dataId"
                    :ViewName="name"
                    :contentName="contentName"
                    :dae="data"
                    :chartdata="contentData"
                    :key="21 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></DashBoardChart21>
                <LineChart22
                    :dataId="dataId"
                    :dae="data"
                    :ViewName="name"
                    :contentName="contentName"
                    :chartdata="contentData"
                    :key="22 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></LineChart22>
                <ColumnChart23
                    :dataId="dataId"
                    :dae="data"
                    :ViewName="name"
                    :contentName="contentName"
                    :chartdata="contentData"
                    :key="23 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></ColumnChart23>
                <PolylineColumnChart24
                    :dataId="dataId"
                    :ViewName="name"
                    :contentName="contentName"
                    :dae="data"
                    :chartdata="contentData"
                    :key="24 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></PolylineColumnChart24>
                <!-- 筛选控件 -->
                <querybutton25
                    ref="querybutton25"
                    :dataId="dataId"
                    :dae="data"
                    :PageName="name"
                    @search="search"
                    :key="25 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></querybutton25>
                <outputbutton26
                    :dataId="dataId"
                    :dae="data"
                    @exportdata="exportdata"
                    :key="26 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></outputbutton26>
                <textimport27a
                    ref="textimport27a"
                    :dataId="dataId"
                    :dae="data"
                    :key="27 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></textimport27a>
                <DateTimePicker282
                    ref="DateTimePicker282"
                    :dataId="dataId"
                    :dae="data"
                    :key="28 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></DateTimePicker282>
                <Combobox299
                    ref="Combobox299"
                    :dataId="dataId"
                    :dae="data"
                    :key="29 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></Combobox299>
                <Customreport
                    :dataId="dataId"
                    :dae="data"
                    ref="table"
                    @percentage1="percentage1"
                    @showtip="showtip" @shownotip="shownotip"
                ></Customreport>
                <NumberScreen30
                    ref="NumberScreen30"
                    :dataId="dataId"
                    :dae="data"
                    :key="30 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></NumberScreen30>
                <!-- 视频控件 -->
                <Video
                    ref="Video"
                    :dataId="dataId"
                    :dae="data"
                    :name="name"
                    @showtip="showtip" @shownotip="shownotip"
                ></Video>
                <MobileProducts
                    ref="mobileProducts"
                    :dataId="dataId"
                    :dae="data"
                    :key="31 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></MobileProducts>
                <DynamicProducts
                    ref="Dyn1"
                    :dataId="dataId"
                    :dae="data"
                    :key="32 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></DynamicProducts>
                <FlowPipe
                    ref="FlowPipe"
                    :dataId="dataId"
                    :dae="data"
                    :key="33 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></FlowPipe>
                <!-- 权限失败提示弹窗 -->
                <TipsPop :popText="TipsPopText" v-if="isTipsPop"></TipsPop>
                <Tank
                    @showtip="showtip" @shownotip="shownotip"
                    ref="Tank"
                    :dataId="dataId"
                    :dae="data"
                    :key="34 + componentKey"
                ></Tank>
                <MatrixGrid @showtip="showtip" @shownotip="shownotip" ref="MatrixGrid" :dataId="dataId" :dae="data" :key="35+componentKey"/>
                <MatrixGridSet @showtip="showtip" @shownotip="shownotip" ref="MatrixGridSet" :dataId="dataId" :dae="data" :key="36+componentKey"/>
                <Camera
                    :dataId="dataId"
                    :name="name"
                    :dae="data"
                    :key="35 + componentKey"
                ></Camera>
                <Combinecombobox
                    ref="Combinecombobox"
                    :dataId="dataId"
                    :dae="data"
                    :key="37 + componentKey"
                    @showtip="showtip" @shownotip="shownotip"
                ></Combinecombobox>
                <div v-if="isTipsPop" class="mask_box"></div>
            </div>
        </div>
    </div>
</template>

<script>
import LineVue1 from './conponent/LineVue1';
import MatrixGrid from './conponent/MatrixGrid.vue';
import MatrixGridSet from './conponent/MatrixGridSet.vue';
import RectangleVue2 from './conponent/RectangleVue2.vue';
import EllipseVue3 from './conponent/EllipseVue3.vue';
import StaticImage4 from './conponent/StaticImage4.vue';
import Camera from './conponent/Camera.vue';
import StaticTextBlock5 from './conponent/StaticTextBlock5.vue';
import CornerButton6 from './conponent/CornerButton6.vue';
import PressButton7 from './conponent/PressButton7.vue';
import Switch8 from './conponent/Switch8.vue';
import TabModuleButton9 from './conponent/TabModuleButton9.vue';
import PopupButton10 from './conponent/PopupButton10.vue';
import TextBox11 from './conponent/TextBox11.vue';
import DataTextBlock12 from './conponent/DataTextBlock12.vue';
import RWTextBox13 from './conponent/RWTextBox13.vue';
import Alarm14 from './conponent/Alarm14.vue';
import EllipseLamp15 from './conponent/EllipseLamp15.vue';
import CommonLamp16 from './conponent/CommonLamp16.vue';
import DynamicText17 from './conponent/DynamicText17.vue';
import Image18 from './conponent/Image18.vue';
import PieChart20 from './conponent/PieChart20.vue';
import DashBoardChart21 from './conponent/DashBoardChart21.vue';
import LineChart22 from './conponent/LineChart22.vue';
import Video from './conponent/video.vue';
import ColumnChart23 from './conponent/ColumnChart23.vue';
import PolylineColumnChart24 from './conponent/PolylineColumnChart24.vue';
import querybutton25 from './conponent/QueryButton25.vue';
import outputbutton26 from './conponent/outputbutton26.vue';
import textimport27a from './conponent/textimport27.vue';
import DateTimePicker282 from './conponent/DateTimePicker282.vue';
import Combinecombobox from './conponent/combinecombobox.vue';
import Combobox299 from './conponent/Combobox299.vue';
import NumberScreen30 from './conponent/NumberScreen30.vue';
import Customreport from './conponent/customreport.vue';
import MobileProducts from './conponent/MobileProducts.vue';
import DynamicProducts from './conponent/DynamicProducts.vue';
import FlowPipe from './conponent/FlowPipe.vue';
import Tank from './conponent/Tank.vue';
import TipsPop from './TipsPop';
import screenfull from 'screenfull';
export default {
    name: 'customer',
    components: {
        Combinecombobox,//下拉框下发控件
        LineVue1, //执行控件
        MatrixGrid, //单点矩阵
        MatrixGridSet, //矩阵设定
        RectangleVue2, //矩形控件
        EllipseVue3, //圆形控件
        StaticImage4, //静态控件
        StaticTextBlock5, //静态文本控件
        CornerButton6, //控制按钮控件
        PressButton7, //点动按钮控件
        Switch8, //开关按钮控件
        TabModuleButton9, //跳转按钮控件
        PopupButton10, //弹窗按钮控件
        TextBox11, //数值输入控件
        DataTextBlock12, //数值显示控件
        RWTextBox13, //读写框控件
        Alarm14, //报警控件
        EllipseLamp15, //圆形转态灯控件
        CommonLamp16, //矩形转态灯控件
        DynamicText17, //动态文本控件
        Image18, //动态图片控件
        Customreport,
        PieChart20, //饼图控件
        DashBoardChart21, //仪表盘控件
        LineChart22, //折线图控件
        ColumnChart23, //柱形图控件
        PolylineColumnChart24, //折线柱形图控件
        querybutton25, //查询控件
        outputbutton26, //导出控件
        textimport27a, //输入关键字控件
        DateTimePicker282, //时间控件
        Combobox299, //下拉文本控件
        NumberScreen30, //数值筛选
        Video,
        MobileProducts, //静态产品线
        DynamicProducts, //动态产品线
        TipsPop, //权限提示弹窗
        FlowPipe, //流动管道
        Tank, //罐体
        Camera, // 摄像头
    },
    props: ['popdata'],
    data() {
        return {
            zoomValue: 0,
            gth: require('../../assets/images/gth.png'),
            tipchange:false,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            fdsx:true,
            heardertop:90,
            percentage: 0,
            data: '',
            componentKey1: 1,
            originalData: '',
            contentData: '', //图表数据
            contentName: '', //当前图表视图名
            name: '',
            adata: null,
            nameC: '',
            pathNmae: '',
            loading1: false,
            dataId: '',
            dataId2: '',
            commerPopShow1: false,
            pathName: '1',
            pathName2: '',
            type: '',
            isTipsPop: false, //权限提示弹窗
            TipsPopText: '执行下发任务失败',
            isWindow: true, //是否首次进入二次开发
            JsonData: '', //获取的json文件
            isMinW: true, //最小宽度是否继续换算
            timer: '',
            ss: 'ee',
            scriptTime: '', //脚本定时器
            componentKey: 1, //构建新的key重新渲染组件
            scriptItem: null, //下发脚本要触发的方法值
            scriptType: null, //那个控件脚本
            pressType: null, //点动按钮脚本事件
            numTextData: null, //数值显示脚本事件
            it: null, //查询按钮脚本事件
            pageHeight: '',
            pageHTime: '',
            nowoverflow: 'calc(100% - 110px)',
            newoverflow: 'calc(100%)',
            tipword:'',
            deltrue :false,
            issueFun_url:'',
            issueFun_commonIDarr:{}
        };
    },
    computed: {
        listData() {
            //监听路由改变
            return this.$store.state.routename;
        },
        screen() {
            return this.$store.state.screentype;
        }
    },
    watch: {
        screen(val) {
            
              if($('header')[0].style.zoom){
             
                if(parseFloat(($('header')[0].style.zoom))>1){
 this.heardertop = $('header').height()*parseFloat($('header')[0].style.zoom)+'px'
                }
               
            }
            setTimeout(() => {
                if (this.$store.state.screentype == 1) {
                    setTimeout(() => {
                        let w =
                            window.screen.width /
                            parseFloat($('.big_box').attr('width'));
                            
                       
                       if(parseFloat($('.v-toolbar')[0].style.zoom)>1){
                                 var a =
                            $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) +
                            $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                        }else{
                           var a =
                            $('.v-toolbar').height()  +
                            10 +
                            $('.v-footer').height() ;
                        }
                        let h =
                            (window.screen.height - a) /
                            parseFloat($('.big_box').attr('height'));
                        $('.report').css({
                            transform: `scale(${w},${h})`,
                            margin: '0px'
                        });
                        $('.scalediv1').css({
                            height: window.screen.height - a + 'px',
                            width: window.screen.width + 'px'
                        });
                    });
                } else if (this.$store.state.screentype == 2) {
                    setTimeout(() => {
                        $('.report').css({
                            transform: `scale(1,1)`
                        });
                    });
                    $('.scalediv1').css({
                        height: 'auto',
                        width: parseFloat($('.big_box').attr('width'))
                    });
                } else if (this.$store.state.screentype == 3) {
                    
                    let width = window.screen.width;
                    console.log(this.JsonData)
                     let w1 = width / parseFloat($('.big_box').attr('width'));
                     let w2 = window.screen.width
                     console.log(parseFloat(
                            JSON.parse(JSON.stringify(this.JsonData)).Controls
                                .PropertyList.Height
                        )*w1)
                    if (
                        parseFloat(
                            JSON.parse(JSON.stringify(this.JsonData)).Controls
                                .PropertyList.Height
                        )*w1 >
                        window.screen.height - 130
                    ) {
                        w2 -= 17;
                    }
                    let w = width / parseFloat($('.big_box').attr('width'));
                     let w3 = w2 / parseFloat($('.big_box').attr('width'));
                    $('.report').css({
                        transform: `scale(${w},${w3})`,
                        margin: '0px'
                    });
                    $('.scalediv1').css({
                        height: parseFloat($('.big_box').attr('height'))*w3+'px',
                        width: width + 'px'
                    });
                    console.log(parseFloat($('.big_box').attr('height'))*w)
                         if (JSON.parse(JSON.stringify(this.JsonData)).Controls.PropertyList.Width*parseFloat(w) > window.screen.width&&this.$store.state.screentype!==1) {
                   if(this.$store.state.screentype==4||this.$store.state.screentype==3){
 this.newoverflow = `calc(100% + 20px)`
                   }
                   }
                } else if (this.$store.state.screentype == 4) {
                      if(parseFloat($('.v-toolbar')[0].style.zoom)>1){
                                var a =
                            $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) +
                            $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                        }else{
                          var a =
                            $('.v-toolbar').height()  +
                            10 +
                            $('.v-footer').height() ;
                        }
                    let height = window.screen.height - a;
                    if (
                        parseFloat(
                            JSON.parse(JSON.stringify(this.JsonData)).Controls
                                .PropertyList.Width
                        ) > window.screen.width
                    ) {
                        height -= 17;
                    }
                    let h = height / parseFloat($('.big_box').attr('height'));
                    $('.report').css({
                        transform: `scale(${h},${h})`
                    });
                    $('.scalediv1').css({
                        height: height + 'px',
                        width: parseFloat($('.big_box').attr('width'))*h + 'px'
                    });
                }
                this.newoverflow =  'calc(100%)'
                   
                if (JSON.parse(JSON.stringify(this.JsonData)).Controls.PropertyList.Width > window.screen.width&&this.$store.state.screentype!==1) {
                   if(this.$store.state.screentype==4||this.$store.state.screentype == 3){
                    if(parseFloat($('.v-toolbar')[0].style.zoom)>1){
                                var a =
                            $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) +
                            $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                        }else{
                          var a =
                            $('.v-toolbar').height()  +
                            10 +
                            $('.v-footer').height() ;
                        }
                    this.nowoverflow = `calc(100% - ${a}px)`;
                    this.newoverflow = `calc(100% + 20px)`
                   }
                 if(parseFloat($('.v-toolbar')[0].style.zoom)>1){
                                var a =
                            $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) +
                            $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                        }else{
                          var a =
                            $('.v-toolbar').height()  +
                            10 +
                            $('.v-footer').height() ;
                        }

                    this.nowoverflow = `calc(100% - ${a}px)`;
                } else {
                      console.log(this.JsonData)
                    
                       if(parseFloat($('.v-toolbar')[0].style.zoom)>1){
                                var a =
                            $('.v-toolbar').height()*parseFloat($('.v-toolbar')[0].style.zoom) +
                            $('.v-footer').height()*parseFloat($('.v-toolbar')[0].style.zoom)
                        }else{
                          var a =
                            $('.v-toolbar').height() -10 +
                            $('.v-footer').height() ;
                        }
                    this.nowoverflow = `calc(100% - ${a}px)`;
                    if($('.customerPage')[0].style.boxSizing== 'border-box'){
                          $('.customerPage')[0].style.boxSizing='content-box'
                    }else{
                        $('.customerPage')[0].style.boxSizing='border-box'
                    }
                    
                }
            }, 300);
        },
        pageHeight(n, o) {
            //监听浏览器 改变可视页面大小使滚动条展示
            // document.querySelector('.customerPage').style.width = '99.9vw'
            // setTimeout(()=>{
            //  document.querySelector('.customerPage').style.width = '100vw'
            // },100)
        },
        '$store.state.scriptData': {
            //脚本事件
            deep: true,
            handler: function(n, o) {
                if (this.$store.state.scriptData == null) {
                    this.isTipsPop = true;
                } else {
                    console.log('走这里了');
                    this.scriptFunData(this.$store.state.scriptData);
                }
            }
        },
        '$store.state.contentData': {
            //监听图表
            deep: true,
            handler: function(n, o) {
                this.type = this.$store.state.typeNum;
                console.log( '7789',this.$store.state.contentName , this.name);
                console.log( 'this.$store.state.contentData',this.$store.state.contentData);
                if (this.$store.state.contentName == this.name) {
                    this.contentData = this.$store.state.contentData;
                    this.contentName = this.$store.state.contentName;
                } else {
                    this.contentData = [];
                }
            }
        },
        '$store.state.varChange': {
            //监听变量
            deep: true,
            handler: function(n, o) {
                var data = this.$store.state.varChange;
                console.log('=-----', this.$refs);
                if(this.$refs.Combinecombobox){
                      this.$refs.Combinecombobox.axioImg2(data);
                }
                if (this.$refs.Dimage) {
                    this.$refs.Dimage.axioImg2(data);
                }
                if (this.$refs.dynamicyext17) {
                    this.$refs.dynamicyext17.axioImg2(data);
                }
                if (this.$refs.CommonLamp) {
                    this.$refs.CommonLamp.axioImg2(data);
                }
                if (this.$refs.EllipseLamp) {
                    this.$refs.EllipseLamp.axioImg2(data);
                }
                if (this.$refs.Switch8a) {
                    this.$refs.Switch8a.axioImg2(data);
                }
                if (this.$refs.DataTextBlock12) {
                    this.$refs.DataTextBlock12.axioImg2(data);
                }
                if (this.$refs.DataTextBlock12) {
                    this.$refs.DataTextBlock12.axioImg3(data);
                }
                if (this.$refs.RWTextBox13) {
                    this.$refs.RWTextBox13.axioImg2(data);
                }
                if (this.$refs.mobileProducts) {
                    this.$refs.mobileProducts.axioImg2(data);
                }
                if (this.$refs.Dyn1) {
                    this.$refs.Dyn1.axioImg2(data);
                }
                if (this.$refs.FlowPipe) {
                    this.$refs.FlowPipe.axioImg2(data);
                }
                if (this.$refs.Tank) {
                    this.$refs.Tank.axioImg2(data);
                }
            
               
                if (this.$refs.MatrixGridSet) {
                    
                    this.$refs.MatrixGridSet.axioImg2(data);
                }
                    if (this.$refs.MatrixGrid) {
                    
                    this.$refs.MatrixGrid.axioImg2(data);
                }
            }
        },
        '$store.state.setTiemValue': {
            //监听筛选控件查询值
            deep: true,
            handler: function(n, o) {
                console.log("22222")
                this.$refs.table.search('默认查询');
                var option = this.$refs.querybutton25.timingSearch(
                    this.$store.state.setTiemValue.ViewName,
                    this.$store.state.setTiemValue.Data
                );
                option.then(x =>
                    window.$.connection.subchart.server.query(
                        this.$store.state.setTiemValue.ViewName,
                        this.$store.state.setTiemValue.Data,
                        x,
                        localStorage.getItem('currentLang')
                    )
                );
            }
        },
        '$store.state.staticImagearr':{
            //静态图片数据
            deep:true,
            handler:function(n){
              this.$refs.StaticImage4.axioImg2(this.$store.state.staticImagearr);
            }
        },
        '$store.state.ReceivedAlarms': {
            //监听报警控件信息
            deep: true,
            handler: function(n, o) {
                this.$refs.Alarm14.axioImg2(this.$store.state.ReceivedAlarms);
            }
        },
        '$store.state.websocketsShow': {
            //是否开始连接websockets
            deep: true,
            handler: function(n, o) {
                if (this.$store.state.websocketsShow != null) {
                    window.$.connection.subchart.server.joinView(
                        `${this.name}`,
                        localStorage.getItem('currentLang')
                    );
                }
                if (this.$refs.querybutton25) {
                    console.log("sadasdsadsad")
                    this.$refs.querybutton25.searchFun();
                }
                if (this.$store.state.websocketsShow != null) {
                    this.scriptInit();
                }
                //初始化加入变量监听
                if (this.$refs.Dyn1) {
                    this.$refs.Dyn1.ChartTime();
                }
                if (this.$refs.Dimage) {
                    this.$refs.Dimage.JoinVarFun();
                }
                if (this.$refs.Combinecombobox) {
                    this.$refs.Combinecombobox.JoinVarFun();
                }
                
                if (this.$refs.dynamicyext17) {
                    this.$refs.dynamicyext17.JoinVarFun();
                }
                if (this.$refs.CommonLamp) {
                    this.$refs.CommonLamp.JoinVarFun();
                }
                if (this.$refs.EllipseLamp) {
                    this.$refs.EllipseLamp.JoinVarFun();
                }
                if (this.$refs.switch) {
                    this.$refs.switch.JoinVarFun();
                }
                if (this.$refs.DataTextBlock12) {
                    this.$refs.DataTextBlock12.JoinVarFun();
                }
                if (this.$refs.RWTextBox13) {
                    this.$refs.RWTextBox13.JoinVarFun();
                }
                if (this.$refs.mobileProducts) {
                    this.$refs.mobileProducts.JoinVarFun();
                }
                if (this.$refs.Dyn1) {
                    this.$refs.Dyn1.JoinVarFun();
                }
                if (this.$refs.Alarm14) {
                    this.$refs.Alarm14.JoinVarFun();
                }
                if (this.$refs.FlowPipe) {
                    this.$refs.FlowPipe.JoinVarFun();
                }
                if (this.$refs.Tank) {
                    this.$refs.Tank.JoinVarFun();
                }
                if (this.$refs.Tank) {
                    this.$refs.Tank.JoinVarFun();
                }
                 if (this.$refs.MatrixGridSet) {
                    this.$refs.MatrixGridSet.JoinVarFun();
                }
                if (this.$refs.MatrixGrid) {
                    this.$refs.MatrixGrid.JoinVarFun();
                }
               
            }
        },
        listData(n, o) {
            // debugger
            //监听路由发生改变
            clearInterval(this.scriptTime);
            if (this.$store.state.websocketsShow != null) {
                if (window.$.connection.chart) {
                         if(window.$.connection.chart.connection.state == 1){
                        //调用服务器端方法 离开视图
                        // try{
                            window.$.connection.subchart.server.leaveView(
                                `${this.name}`,
                                localStorage.getItem('currentLang')
                            ); //停止
                        // } catch {

                        // }
                    }
                }
            }
            var self = this;
            this.dataId = n.query.id; //重新获取页面id值
            self.init();
            if (this.$store.state.websocketsShow != null) {
                if (window.$.connection.chart) {
                    //调用服务器端方法 加入视图
                    window.$.connection.subchart.server.joinView(
                        `${self.name}`,
                        localStorage.getItem('currentLang')
                    );
                }
            }
        },
        //页面切换监听
        data(n, o) {
            if (this.$store.state.isInit) {
                this.componentKey = this.componentKey + 1;
                //判断是否有离开画面脚本事件
                var EventScriptList = '';
                if (o.Data) {
                    if (o.Data.EventScriptList != undefined) {
                        EventScriptList = o.Data.EventScriptList;
                    }
                }
                var EventType = [];
                var Typearr = [];
                if (EventScriptList.length) {
                    for (var i = 0; i < EventScriptList.length; i++) {
                        if (EventScriptList[i].EventType == 'ExitView') {
                            EventType.push(EventScriptList[i]);
                        }
                    }
                    if (EventType.length) {
                        //离开画面脚本事件
                        for (var j = 0; j < EventType.length; j++) {
                            Typearr.push(EventType[j].Script);
                        }
                        this.scriptData(Typearr, '', '', '', '', '');
                    }
                }
            }
        }
    },

    destroyed() {
        if (window.$.connection.chart) {
            //调用服务器端方法 离开视图
            window.$.connection.subchart.server.leaveView(`${this.name}`,localStorage.getItem('currentLang'));
        }
        clearInterval(this.scriptTime);
        clearInterval(this.pageHTime);
    },
    created() {
         this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
        console.log('screentype', this.$store.state.screentype);
        this.init();
    },

    mounted() {
                let screen = JSON.parse(sessionStorage.getItem('screen'));
            if (!screen) {
                this.$store.state.screentype = 1;
            } else if (screen == 'one') {
                this.$store.state.screentype = 1;
            } else if (screen == 'two') {
                this.$store.state.screentype = 2;
            } else if (screen == 'three') {
                this.$store.state.screentype = 3;
            } else if (screen == 'four') {
                this.$store.state.screentype = 4;
            }
        console.log('触发1111');
        clearInterval(this.timer);
        //监听页面窗口改变页面自适应 在直线控件1触发（LineVue1）
        var _this = this;
        var endtime = 0;
        document.onkeydown = function(e) {
            if (e.keyCode == 13) {
                endtime++;
                if (endtime == 2) {
                    _this.clickFullscreen();
                }
            }
            setTimeout(() => {
                endtime = 0;
            }, 600);
        };

        // this.pageHTime = setInterval(() => {
        //     //实时刷新浏览器可视页面大小
        //     try {
        //         var aa = document.querySelector('.customerPage').clientHeight;
        //         this.pageHeight = aa;
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }, 1000);
window.addEventListener('scroll', this.scroll,true);
    },
    methods: {
        upFun(){
            // console.log('触发了')
        this.$refs.PressButton7.upclick()
        }, 
        showtip(a){
         this.tipchange = true;
         this.tipword = a;
        },
        showIssueTip(a,issueFun_url,issueFun_commonIDarr){
         this.tipchange = true;
         this.tipword = a;
         this.deltrue=true;
         this.issueFun_url=issueFun_url;
         this.issueFun_commonIDarr=issueFun_commonIDarr;
        },
        shownotip(){
        this.tipchange = false
        this.deltrue=false
        },
        issueFun(){
             this.$axios({
                method:'post',
                url:this.issueFun_url,
                data:this.issueFun_commonIDarr
            }).then((res1)=>{
                if(res1.data.code === 0){
                    this.shownotip()
                    this.$axios({                  
                        method: 'post',
                        url: '/api/Base/PostIOServiceTest',
                        data:this.issueFun_commonIDarr
                    }).then(res => {
                        console.log('res',res)
                        if(res.data.code != 0){
                            this.showtip(res.data.msg)
                        }
                    })
                }else{
                    this.showtip(res1.data.msg)
                }
            })

        },
        scroll(e){

            if(e){
                           if (e.srcElement.scrollTop + e.srcElement.clientHeight == e.srcElement.scrollHeight ) {
                            if($('.customerPage')[0]){
 if($('.customerPage')[0].style.boxSizing== 'border-box'){
               console.log($('.customerPage')[0].style.boxSizing,"sadas")
                          $('.customerPage')[0].style.boxSizing='content-box'
                    }else{
                        $('.customerPage')[0].style.boxSizing='border-box'
                        console.log($('.customerPage')[0].style.boxSizing,'saddsadsa')
                    }
           }
            }
            }



        },
        percentage1(data) {
            this.percentage = data;
        },
        searchFun() {
        
            //触发查询控件 查询方法
            if (this.$refs.querybutton25) {
                this.$refs.querybutton25.searchFun();
            }
        },
        clickFullscreen() {
            if (!screenfull.isEnabled) {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning'
                });
                return false;
            }
            screenfull.toggle();
        },

        search(a, num, i1) {
            //组件25查询事件
            console.log("2222112")
            
            this.$refs.table.search(a, num, i1);
        },
        exportdata(a, num) {
            //组件26导出事件
            this.$refs.table.export(a, num);
        },

        //跳转loading
        loding() {
            var left = this;
            setTimeout(function() {
                left.loading1 = false;
            }, 2);
        },

        //初始化页面
        init() {
            // this.pathNmae = this.$route.path.slice(1);
           console.log("asddsasasasasasasasasasasasasasasa")
            this.pathNmae = this.$route.query.title;
            if(!this.pathNmae){
                this.pathNmae = this.$route.params.pathMatch
            }
            if (this.pathName2 != this.pathName) {
                this.dataId = this.$route.query.id;
            }
            
            this.name = this.pathNmae;
            this.nameC = this.pathNmae;
            //  初始化/跳转页面获取名称
            if (this.popdata) {
                this.impor(this.popdata);
            } else {
                this.impor(this.nameC);
            }
            //关闭弹窗控件样式
            this.$nextTick(() => {
                if (document.querySelector('.popbox')) {
                    document.querySelector('.popbox').style.display = 'none';
                }
            });
        },
        //二次开发画布大小和背景渐变色  *type代表是正常画布还是小画布
        canvasSizeFun(type, heightType) {
            let StrokeColor;
            let lage;
            let gradient;
            //渐变色
            var StrokeArr = JSON.parse(
                this.data.Controls.PropertyList.Background
            );
            if (StrokeArr.ColorType == 'SolidColor') {
                StrokeColor =
                    '#' +
                    StrokeArr.Data.Color.slice(3) +
                    StrokeArr.Data.Color.slice(1, 3);
            } else {
                StrokeColor = '';
                lage = StrokeArr.Data.Angel.toFixed(0);
                for (
                    var f2 = 0;
                    f2 < StrokeArr.Data.GradientStops.length;
                    f2++
                ) {
                    gradient = StrokeArr.Data.GradientStops[f2];
                    StrokeColor =
                        StrokeColor +
                        ',' +
                        gradient.Color +
                        ' ' +
                        (gradient.Offset * 100).toFixed(0) +
                        '%';
                }
                StrokeColor =
                    '-webkit-linear-gradient(' +
                    lage +
                    'deg' +
                    StrokeColor +
                    ')';
            }
            var width = this.data.Controls.PropertyList.Width;
            var height = this.data.Controls.PropertyList.Height;
            //         if(this.$store.state.screentype==3){
            //           width = window.screen.width
            //         }
            // if(this.$store.state.screentype==4||this.$store.state.screentype==3){
            //   height-=3
            // }
            // if(parseFloat(JSON.parse(JSON.stringify(this.JsonData)).Controls.PropertyList.Height)>(window.screen.height-120)&&this.$store.state.screentype !== 1){
            //           width-=17
            //         }
            document.querySelector('.big_box').style.background = StrokeColor;
            document.querySelector('.big_box').style.width = width + 'px';
            $('.big_box').attr('width', width);
            // document.querySelector('.big_box')[0].attr('width',width)
            document.querySelector('.big_box').style.height = height + 'px';
            $('.big_box').attr('height', height);
            //  document.querySelector('.big_box')[0].attr('height',height)
            if (type == 'Big') {
                document.querySelector('.big_box').style.position = 'relative';
                // document.querySelector('.big_box').style.marginTop='1vh'
                document.querySelector('.big_box').style.bottom = 'none';
                document.querySelector('.big_box').style.top = 'none';
                document.querySelector('.big_box').style.left = 'none';
                document.querySelector('.big_box').style.right = 'none';
                document.querySelector('.big_box').style.margin = 'none';
            } else {
                if (heightType == 'Big') {
                    document.querySelector('.big_box').style.left = 0;
                    document.querySelector('.big_box').style.right = 0;
                    // document.querySelector('.big_box').style.position='absolute'
                    // document.querySelector('.big_box').style.margin='0 auto'
                    $('.big_box').attr('margin', '0 auto');
                    // document.querySelector('.big_box').style.marginTop='1vh'
                } else {
                    //  document.querySelector('.big_box').style.position='absolute'
                    document.querySelector('.big_box').style.bottom = 0;
                    document.querySelector('.big_box').style.top = 0;
                    document.querySelector('.big_box').style.left = 0;
                    document.querySelector('.big_box').style.right = 0;
                    // document.querySelector('.big_box').style.margin='auto'
                    $('.big_box').attr('margin', 'auto');
                    // document.querySelector('.big_box').style.marginTop='1vh'
                }
            }
        },
        //计算data值自适应
        dataFun(text) {
            var originalData = JSON.parse(JSON.stringify(this.JsonData)); //克隆不改原对象
            console.log('originalData', originalData);
            var widthWV;
            var heightWH;
            // 浏览器显示宽度
            if (this.isWindow) {
                // 首次浏览器显示宽度
                widthWV = document.body.clientWidth > 800 ? document.body.clientWidth : 800;
                heightWH = this.$store.state.pageleft = widthWV;
            } else {
                widthWV = document.body.clientWidth + 17 > 800 ? document.body.clientWidth + 17 : 800;
                this.$store.state.pageleft = widthWV;
            }

            if (widthWV > 800) {
                // 首次小于1280执行之后小于1280不执行
                this.isMinW = true;
            }
            if (text != '跳转') {
                if (!this.isMinW) {
                    return;
                }
            }
            if (widthWV == 800) {
                this.isMinW = false;
            }
            var screenWV = window.screen.width; //分辨率宽度
            var screenHv = window.screen.height;
            var bl;
            var hbl;
            var windowType;
            var hieghtType;
            //画布高度比例
            //画布宽度比例
            if (
                Number(originalData.Controls.PropertyList.Width) < Number(screenWV)
            ) {
                //小画布
                windowType = 'Small';
                if (Number(originalData.Controls.PropertyList.Width) > 980) {
                    hieghtType = 'Big';
                } else {
                    hieghtType = 'Small';
                }
                var Xbl = Number(originalData.Controls.PropertyList.Width) / Number(screenWV);
                bl = (originalData.Controls.PropertyList.Width * (widthWV / originalData.Controls.PropertyList.Width)) / Number(screenWV);
                this.$store.state.WindowWB = bl;
                //========
                // if(this.$store.state.screentype == 3){
                //   originalData.Controls.PropertyList.Width = originalData.Controls.PropertyList.Width * bl
                // }
                //==========
            } else {
                // 正常画布
                windowType = 'Big';
                hieghtType = 'Big';
                // let width1
                // if(widthWV>window.screen.width&&this.$store.state.screentype!==1){
                //   width1 = widthWV-17
                // }else{
                //   width1 = widthWV
                // }
                bl = widthWV / originalData.Controls.PropertyList.Width; //比例
                this.$store.state.WindowWB = bl;
                //============
                //  if(this.$store.state.screentype == 3){
                //    originalData.Controls.PropertyList.Width =  originalData.Controls.PropertyList.Width * bl  //画布宽度
                //  }
                //==============
            }
            // if(this.$store.state.screentype == 4){

            //     hbl = (Number(screenHv)-128) / Number( originalData.Controls.PropertyList.Height)
            // }else{

            //   hbl = Number(screenHv) / Number(originalData.Controls.PropertyList.Height)
            // }

            //============
            //  if(this.$store.state.screentype == 4){
            //   originalData.Controls.PropertyList.Height = originalData.Controls.PropertyList.Height * hbl
            //  }

            //==============
            //=====================
            // originalData.Controls.PropertyList.Height = originalData.Controls.PropertyList.Height * bl
            //  this.$message({
            //    duration:0,
            //    message:'screenWV'+ screenWV+"bl"+bl+"画布"+ originalData.Controls.PropertyList.Width+"widthWV"+widthWV+"屏幕分辨率高度"+screenHv
            //  });
            //=================

            this.isWindow = false; //首次之后为false
            const setData = originalData.Controls.ControlList;

            //==============
            //    if(this.$store.state.screentype == 3){
            //   for(let i=0;i<setData.length;i++){
            //     //控件圆角自适应
            //     if(setData[i].PropertyList.CornerRadius){
            //       var CornerRadius = setData[i].PropertyList.CornerRadius.split(',')
            //       for(let i=0;i<CornerRadius.length;i++){
            //         CornerRadius[i] = CornerRadius[i] * bl
            //       }
            //       CornerRadius = CornerRadius.join(',')
            //       setData[i].PropertyList.CornerRadius = CornerRadius
            //     }
            //     //控件border自适应
            //     if(setData[i].PropertyList.StrokeDashArray){
            //       setData[i].PropertyList.StrokeDashArray = Math.ceil(setData[i].PropertyList.StrokeDashArray * bl)
            //     }
            //     if(setData[i].PropertyList.StrokeThickness){
            //       setData[i].PropertyList.StrokeThickness = Math.ceil(setData[i].PropertyList.StrokeThickness * bl)
            //     }
            //     if(setData[i].PropertyList.BorderThickness){
            //       setData[i].PropertyList.BorderThickness = Math.ceil(setData[i].PropertyList.BorderThickness * bl)
            //     }
            //     //控件阴影自适应
            //     if(setData[i].PropertyList.Shadow){
            //       var Shadow = JSON.parse(setData[i].PropertyList.Shadow)
            //       if(Shadow.InnerShadow){
            //           Shadow.InnerShadow.OffsetX = Shadow.InnerShadow.OffsetX * bl
            //           if(this.$store.state.screentype == 3){
            //            Shadow.InnerShadow.OffsetY = Shadow.InnerShadow.OffsetY * bl
            //           }

            //       }
            //       if(Shadow.OuterShadow){
            //         Shadow.OuterShadow.OffsetX = Shadow.OuterShadow.OffsetX * bl
            //             if(this.$store.state.screentype == 3){

            //               Shadow.OuterShadow.OffsetY = Shadow.OuterShadow.OffsetY * bl
            //             }
            //       }
            //       setData[i].PropertyList.Shadow = JSON.stringify(Shadow)
            //     }

            //     if(setData[i].PropertyList.TankTextFontSize){
            //       setData[i].PropertyList.TankTextFontSize =  setData[i].PropertyList.TankTextFontSize*bl
            //     }
            //      if(setData[i].PropertyList.TankWall){
            //       setData[i].PropertyList.TankWall =  setData[i].PropertyList.TankWall*bl
            //     }
            //    if(setData[i].PropertyList.FontSize){
            //       setData[i].PropertyList.FontSize =  setData[i].PropertyList.FontSize*bl
            //     }
            //     console.log('setData[i]',setData[i].ControlType)

            //      //控件高度宽度left自适应
            //          if(this.$store.state.screentype == 3){

            //            setData[i].PropertyList.Height = setData[i].PropertyList.Height * bl
            //          }
            //     setData[i].PropertyList.Left = setData[i].PropertyList.Left * bl
            //     if(this.$store.state.screentype == 3){

            //       setData[i].PropertyList.Top = setData[i].PropertyList.Top * bl
            //     }
            //     if(setData[i].Name=='StaticImage2'){
            //           console.log("ssssssssssssss",bl)
            //    console.log(setData[i])
            //     }
            //     setData[i].PropertyList.Width = setData[i].PropertyList.Width *bl
            //  if( setData[i].PropertyList.Width == 1937){
            //    console.log("ssssssssssssss")
            //    console.log(setData[i])
            //  }
            //   }
            //   console.log("originalData",bl)
            //   console.log(screenWV)
            //    }

            //=============
            //==============
            //  if(this.$store.state.screentype == 4){
            //    console.log()
            // for(let i=0;i<setData.length;i++){
            //   //控件圆角自适应
            //   if(setData[i].PropertyList.CornerRadius){
            //     let CornerRadius = setData[i].PropertyList.CornerRadius.split(',')
            //     for(let i=0;i<CornerRadius.length;i++){
            //       CornerRadius[i] = CornerRadius[i] * hbl
            //     }
            //     CornerRadius = CornerRadius.join(',')
            //     setData[i].PropertyList.CornerRadius = CornerRadius
            //   }
            //   //控件border自适应
            //   if(setData[i].PropertyList.StrokeDashArray){
            //     setData[i].PropertyList.StrokeDashArray = Math.ceil(setData[i].PropertyList.StrokeDashArray * hbl)
            //   }
            //   if(setData[i].PropertyList.StrokeThickness){
            //     setData[i].PropertyList.StrokeThickness = Math.ceil(setData[i].PropertyList.StrokeThickness * hbl)
            //   }
            //   if(setData[i].PropertyList.BorderThickness){
            //     setData[i].PropertyList.BorderThickness = Math.ceil(setData[i].PropertyList.BorderThickness * hbl)
            //   }
            //   //控件阴影自适应
            //   if(setData[i].PropertyList.Shadow){
            //     let Shadow = JSON.parse(setData[i].PropertyList.Shadow)
            //     if(Shadow.InnerShadow){
            //       if(this.$store.state.screentype == 4){

            //         Shadow.InnerShadow.OffsetX = Shadow.InnerShadow.OffsetX * hbl
            //       }
            //         Shadow.InnerShadow.OffsetY = Shadow.InnerShadow.OffsetY * hbl
            //     }
            //     if(Shadow.OuterShadow){
            //         if(this.$store.state.screentype == 4){

            //           Shadow.OuterShadow.OffsetX = Shadow.OuterShadow.OffsetX * hbl
            //         }
            //       Shadow.OuterShadow.OffsetY = Shadow.OuterShadow.OffsetY * hbl
            //     }
            //     setData[i].PropertyList.Shadow = JSON.stringify(Shadow)
            //   }

            //   if(setData[i].PropertyList.TankTextFontSize){
            //     setData[i].PropertyList.TankTextFontSize =  setData[i].PropertyList.TankTextFontSize*hbl
            //   }
            //    if(setData[i].PropertyList.TankWall){
            //     setData[i].PropertyList.TankWall =  setData[i].PropertyList.TankWall*hbl
            //   }
            //  if(setData[i].PropertyList.FontSize){
            //     setData[i].PropertyList.FontSize =  setData[i].PropertyList.FontSize*hbl
            //   }
            //   console.log('setData[i]',setData[i].ControlType)

            //    //控件高度宽度left自适应
            //   setData[i].PropertyList.Height = setData[i].PropertyList.Height * hbl
            //     if(this.$store.state.screentype == 4){

            //       setData[i].PropertyList.Left = setData[i].PropertyList.Left * hbl
            //     }
            //   setData[i].PropertyList.Top = setData[i].PropertyList.Top * hbl
            //   if(this.$store.state.screentype == 4){

            //     setData[i].PropertyList.Width = setData[i].PropertyList.Width *hbl
            //   }

            // }
            // console.log("originalData",originalData)
            // console.log(screenWV)
            //  }

            //=============
            this.data = originalData; //比例换算后赋值
            this.canvasSizeFun(windowType, hieghtType); //初始化画布样式
        },
        //跟换JSON源
        impor(name) {
            console.log("xxxxxxxxxxx")
            this.$store.state.isInit = true; //分辨率
            this.$store.state.report = true; //
            this.name = name;
            this.nameC = name;
            // debugger
            if (name == 'onePath') {
                //默认页面
                this.JsonData  = {
                    "Controls": {
                        "Name": "MainCanvas",
                        "ControlType": "canvas",
                        "PropertyList": {
                            "Width": "1920",
                            "Height": "952",
                            "Background": "{\"ColorType\":\"SolidColor\",\"Data\":{\"Color\":\"#FFFFFFFF\"}}"
                        },
                        "ControlList": []
                    },
                    "Data": {
                        "PieChartItemList": [],
                        "DashBoardChartItemList": [],
                        "LineChartItemList": [],
                        "BarChartItemList": [],
                        "LineBarChartItemList": [],
                        "ScatterPlotChartItemList": [],
                        "InputDataList": [],
                        "RWDataList": [],
                        "CommonButtonGroupList": [],
                        "CommonButtonList": [],
                        "PressButtonList": [],
                        "TabModuleButtonParaList": [],
                        "TabModuleButtonList": [],
                        "PopupButtonList": [],
                        "SwitchList": [],
                        "StatusAnimationList": [],
                        "TextAnimationList": [],
                        "ImageAnimationList": [],
                        "ElementList": [
                            {
                                "EleName": "MainCanvas",
                                "EleType": "Canvas"
                            }
                        ],
                        "EventScriptList": [],
                        "ParameterReportItemtList": [],
                        "TDDesignerItemList": [],
                        "AlarmGroupItemList": [],
                        "AlarmTagItemList": [],
                        "ComboBoxList": [],
                        "AssociateDateTimePickerList": [],
                        "OutputButtonList": [],
                        "TextImportList": [],
                        "PrintingButtonList": [],
                        "QueryButtonList": [],
                        "AssociateNumericalEntityList": [],
                        "ProductFlowList": [],
                        "FlowPipeAnimationList": [],
                        "TankAnimationList": [],
                        "MatrixGridAnimationList": [],
                        "MatrixGridSetAnimationList": [],
                        "KeyboardControlList": [],
                        "ZIndexs": {},
                        "DataAnimationList": [],
                        "DataStatusTextColorEffectAnimationList": []
                    }
                }
                // $('.big_box').empty()
                this.$nextTick(() => {
                    this.dataFun('跳转');
                    if (this.$store.state.websocketsShow != null) {
                        this.scriptInit(); //脚本加载时
                    }
                    this.scriptShow();
                });
                // return;
            } else {
                
                console.log("name",name)
                // 本地服务器读取方法
                this.$axios({
                    method: 'post',
                    url: `/api/Main/Main_GetViewJson?argViewName=${encodeURIComponent(name)}`
                }).then(res => {
                    console.log("界面",res.data)
                    var data = res.data;
                    this.JsonData = data.data;
                    console.log(' this.JsonData ', this.JsonData);
                    //渐变色
                    this.$nextTick(() => {
                        this.dataFun('跳转');
                        if (this.$store.state.websocketsShow != null) {
                            this.scriptInit(); //脚本加载时
                        }
                        this.scriptShow();
                    });
                }).then(() => {
                    if($('header')[0].style.zoom){
                        if(parseFloat(($('header')[0].style.zoom))>1){
                            this.heardertop = $('header').height()*parseFloat($('header')[0].style.zoom)+'px'
                        }
                    }
                    // setTimeout(()=>{
                    this.newoverflow =  'calc(100%)'
                    if (this.$store.state.screentype == 1) {
                        setTimeout(() => {
                            let w = window.screen.width / parseFloat($('.big_box').attr('width'));
                            if (parseFloat($('.v-toolbar')[0].style.zoom)>1) {
                                var a = $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) + $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                            } else {
                                var a = $('.v-toolbar').height()  + 10 + $('.v-footer').height() ;
                            }
                            let h = (window.screen.height - a) / parseFloat($('.big_box').attr('height'));
                            $('.report').css({
                                transform: `scale(${w},${h})`,
                                margin: '0px'
                            });
                            $('.scalediv1').css({
                                height: window.screen.height - a + 'px',
                                width: window.screen.width + 'px'
                            });
                        });
                    } else if (this.$store.state.screentype == 2) {
                        setTimeout(() => {
                            $('.report').css({
                                transform: `scale(1,1)`
                            });
                        });
                        $('.scalediv1').css({
                            height: 'auto',
                            width: parseFloat($('.big_box').attr('width'))
                        });
                    } else if (this.$store.state.screentype == 3) {
                        setTimeout(() => {
                            console.log(this.JsonData)
                            let width = window.screen.width;
                            let w2 = window.screen.width
                            console.log(parseFloat(JSON.parse(JSON.stringify(this.JsonData)).Controls)*w1)
                            if (
                                parseFloat(JSON.parse(JSON.stringify(this.JsonData)).Controls.PropertyList.Height)*w1 >
                                window.screen.height - 130
                            ) {
                                w2 -= 17;
                            }
                            let w = width / parseFloat($('.big_box').attr('width'));
                            let w3 = w2 / parseFloat($('.big_box').attr('width'));
                            // if (
                            //     parseFloat(
                            //         JSON.parse(JSON.stringify(this.JsonData))
                            //             .Controls.PropertyList.Height
                            //     ) >
                            //     window.screen.height - 120
                            // ) {
                            //     width -= 17;
                            // }
                            console.log($('.report'));
                            // let w =
                            //     width / parseFloat($('.big_box').attr('width'));
                            $('.report').css({transform: `scale(${w},${w3})`});
                            $('.scalediv1').css({
                                height: parseFloat($('.big_box').attr('height'))*w3+'px',
                                width: width + 'px'
                            });
                            if (parseFloat($('.v-toolbar')[0].style.zoom)>1) {
                                if (
                                    JSON.parse(JSON.stringify(this.JsonData)).Controls.PropertyList.Width*parseFloat(w) >= 
                                    window.screen.width&&this.$store.state.screentype!==1
                                ) {
                                    if(this.$store.state.screentype==4||this.$store.state.screentype==3){
                                        this.newoverflow = `calc(100% + 20px)`
                                    }
                                }
                            }
                        });
                    } else if (this.$store.state.screentype == 4) {
                        if (parseFloat($('.v-toolbar')[0].style.zoom)>1) {
                            var a = $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) + $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                        } else {
                            var a = $('.v-toolbar').height() + 10 + $('.v-footer').height() ;
                        }
                        let height = window.screen.height - a;
                        if (parseFloat(JSON.parse(JSON.stringify(this.JsonData)).Controls.PropertyList.Width) > window.screen.width) {
                            height -= 17;
                        }
                        let h = height / parseFloat($('.big_box').attr('height'));
                        setTimeout(() => {
                            $('.report').css({transform: `scale(${h},${h})`});
                        });
                        $('.scalediv1').css({
                            height: height + 'px',
                            width: parseFloat($('.big_box').attr('width'))*h + 'px'
                        });
                    }
                    console.log(this.JsonData)
                    if (JSON.parse(JSON.stringify(this.JsonData)).Controls.PropertyList.Width > window.screen.width&&this.$store.state.screentype!==1) {
                        if (this.$store.state.screentype == 4 || this.$store.state.screentype== 3) {
                            if(parseFloat($('.v-toolbar')[0].style.zoom) > 1) {
                                var a = $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) + $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                            }else{
                                var a = $('.v-toolbar').height()  + 10 + $('.v-footer').height();
                            }
                            this.nowoverflow = `calc(100% - ${a}px)`;
                            this.newoverflow = `calc(100% + 20px)`
                        }
                        if(parseFloat($('.v-toolbar')[0].style.zoom) > 1) {
                            var a = $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) + $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                        } else {
                            var a = $('.v-toolbar').height()  + 10 + $('.v-footer').height() ;
                        }
                        this.nowoverflow = `calc(100% - ${a}px)`;
                    } else {
                            if(parseFloat($('.v-toolbar')[0].style.zoom)>1){
                                        var a =
                                    $('.v-toolbar').height()* parseFloat($('.v-toolbar')[0].style.zoom) +
                                    $('.v-footer').height() * parseFloat($('.v-toolbar')[0].style.zoom)
                                }else{
                                var a =
                                    $('.v-toolbar').height()  -
                                    10 +
                                    $('.v-footer').height() ;
                                }
                            this.nowoverflow = `calc(100% - ${a}px)`;
                    }
                });
            }
            // })
            //  ===========================
            //  本地调试读取方法
            // this.originalData = require(`../../ViewJson/${name}`)
            // this.$nextTick(()=>{
            //   // console.log('进来渲染')
            //       this.JsonData =  this.originalData
            //       this.dataFun('跳转')
            //       if(this.$store.state.websocketsShow != null){
            //         this.scriptInit()   //脚本加载时
            //       }
            //       this.scriptShow()
            // })
            // =================
        },
        //查询赋值
        queryassignmentFun(name, value) {
            
            setTimeout(() => {
              console.log(this.name)
              console.log( name,
                    value)
                    console.log(localStorage.getItem('currentLang'))
                window.$.connection.subchart.server.query(
                    this.name,
                    name,
                    value,
                    localStorage.getItem('currentLang')
                );
            }, 300);
        },
        //关闭弹窗加入当前页面的变量
        pageVar() {
            this.$nextTick(() => {
                if (this.$refs.Dyn1) {
                    this.$refs.Dyn1.ChartTime();
                }
                if (this.$refs.Dimage) {
                    // this.$refs.Dimage.JoinVarFun();
                }
                if (this.$refs.dynamicyext17) {
                    this.$refs.dynamicyext17.JoinVarFun();
                }
                if (this.$refs.CommonLamp) {
                    this.$refs.CommonLamp.JoinVarFun();
                }
                if (this.$refs.EllipseLamp) {
                    this.$refs.EllipseLamp.JoinVarFun();
                }
                if (this.$refs.Switch8a) {
                    this.$refs.Switch8a.JoinVarFun();
                }
                if (this.$refs.DataTextBlock12) {
                    this.$refs.DataTextBlock12.JoinVarFun();
                }
                if (this.$refs.RWTextBox13) {
                    this.$refs.RWTextBox13.JoinVarFun();
                }
                if (this.$refs.mobileProducts) {
                    this.$refs.mobileProducts.JoinVarFun();
                }
                if (this.$refs.Dyn1) {
                    this.$refs.Dyn1.JoinVarFun();
                }
                if (this.$refs.Alarm14) {
                    this.$refs.Alarm14.JoinVarFun();
                }
                  if (this.$refs.MatrixGridSet) {
                    this.$refs.MatrixGridSet.JoinVarFun();
                }
                if (this.$refs.MatrixGrid) {
                    this.$refs.MatrixGrid.JoinVarFun();
                }
              
            });
        },

        //关闭权限提示弹窗
        clonePopFun() {
            this.isTipsPop = false;
        },
        //画面显示脚本事件
        scriptShow() {
            if (this.data.Data.EventScriptList) {
                var EventScriptList = this.data.Data.EventScriptList;
                var EventType = [];
                var Typearr = [];
                for (var i = 0; i < EventScriptList.length; i++) {
                    if (EventScriptList[i].EventType == 'ShowView') {
                        EventType.push(EventScriptList[i]);
                    }
                }
                if (EventType.length) {
                    this.scriptTime = setInterval(() => {
                        for (var j = 0; j < EventType.length; j++) {
                            Typearr.push(EventType[j].Script);
                        }
                        this.scriptData(Typearr, '', '', '', '', '');
                    }, EventType[0].Period);
                }
            }
        },
        //画面加载脚本事件
        scriptInit() {
            if (this.data.Data) {
                if (this.data.Data.EventScriptList != undefined) {
                    var EventScriptList = this.data.Data.EventScriptList;
                    var EventType = [];
                    var Typearr = [];
                    for (var i = 0; i < EventScriptList.length; i++) {
                        if (EventScriptList[i].EventType == 'InitView') {
                            EventType.push(EventScriptList[i]);
                        }
                    }
                    if (EventType.length) {
                        for (var j = 0; j < EventType.length; j++) {
                            Typearr.push(EventType[j].Script);
                        }
                        this.scriptData(Typearr, '', '', '', '', '');
                    }
                }
            }
        },

        //整理数据  Typearr脚本参数 type该dom类型 item该dom数据 pressType点动按钮 numTextData数值显示 it查询按钮
        scriptData(Typearr, type, item, pressType, numTextData, it) {
            let endarr = []; //最终参数
            if (Typearr.length == 0) {
                if (type != undefined) {
                    this.scriptItem = item;
                    this.scriptType = type;
                }
                if (pressType != undefined) {
                    this.pressType = pressType;
                }
                if (numTextData != undefined) {
                    this.numTextData = numTextData;
                }
                if (it != undefined) {
                    this.it = it;
                }

                var str = Typearr[0];
                var reg = /[G]+([^G]+?)(?=[)]+|$)/g;
                var res;
                var data = [];
                //获取GetProperty下的（）内容，由于有【和转义符号会报错分开筛选
                while ((res = reg.exec(str)) != null) {
                    data.push(res[1]);
                }
                var ziarr = [];
                var arr = [];
                var isShow = true;
                //该脚本画面属性有下拉，文本输入，时间的下发事件
                if (data.length) {
                    for (let j = 0; j < data.length; j++) {
                        var reg1 = /etProperty\(/g;
                        var reg2 = /\\/g;
                        var reg3 = /"/g;
                        var vaee;
                        if (reg1.test(data[j])) {
                            vaee = data[j].replace(reg1, '');
                            vaee = vaee.replace(reg2, '');
                            vaee = vaee.replace(reg3, '');
                            ziarr.push(vaee); //用正则取出控件名和类型
                        }
                    }

                    if (ziarr.length != 0) {
                        isShow = false;
                        //将筛选的数据格式化
                        var WebPropertyArr = [];
                        for (let k = 0; k < ziarr.length; k++) {
                            var aab = this.$refs.DateTimePicker282.TimeValueFun();
                            var bbb = this.$refs.Combobox299.TimeValueFun();
                            var bbb1 = this.$refs.Combinecombobox.TimeValueFun();
                            
                            var ccb = this.$refs.textimport27a.TimeValueFun();
                            var vv = '';
                            if (
                                ziarr[k].split(',')[1].trim() == 'SelectedValue'
                            ) {
                                // 修改
                                //下拉框   //根据类型和控件名赋值
                                for (let f = 0; f < bbb.length; f++) {
                                    if (
                                        bbb[f].name ==
                                        ziarr[k].split(',')[0].trim()
                                    ) {
                                        vv = bbb[f].value;
                                        isShow = true;
                                    }
                                }
                                for (let f = 0; f < bbb1.length; f++) {
                                    if (
                                        bbb1[f].name ==
                                        ziarr[k].split(',')[0].trim()
                                    ) {
                                        vv = bbb1[f].value;
                                        isShow = true;
                                    }
                                }
                            } else if (
                                ziarr[k].split(',')[1].trim() == 'DateTime'
                            ) {
                                //时间
                                for (let f = 0; f < aab.length; f++) {
                                    if (
                                        aab[f].name ==
                                        ziarr[k].split(',')[0].trim()
                                    ) {
                                        vv = aab[f].value;
                                        isShow = true;
                                    }
                                }
                            } else if (
                                ziarr[k].split(',')[1].trim() == 'InputText'
                            ) {
                                //文本框
                                for (let f = 0; f < ccb.length; f++) {
                                    if (
                                        ccb[f].name ==
                                        ziarr[k].split(',')[0].trim()
                                    ) {
                                        vv = ccb[f].value;
                                        isShow = true;
                                    }
                                }
                            }
                            var vvalue = {
                                Control: ziarr[k].split(',')[0],
                                Property: ziarr[k].split(',')[1].trim(),
                                Value: vv
                            };
                            WebPropertyArr.push(vvalue);
                        }
                        var val = {
                            //格式构成
                            ScriptContent: str,
                            WebProperty: WebPropertyArr
                        };
                        arr.push(val);
                    } else {
                        var val1 = {
                            //格式构成
                            ScriptContent: str,
                            WebProperty: []
                        };
                        arr.push(val1);
                    }
                } else {
                    var val2 = {
                        //格式构成
                        ScriptContent: str,
                        WebProperty: []
                    };
                    arr.push(val2);
                }
                //画面属性选了其他控件
                if (!isShow) {
                    this.isTipsPop = true;
                    return;
                }
                endarr.push(arr[0]);
                console.log('脚本事件', arr);
            } else {
                for (let i = 0; i < Typearr.length; i++) {
                    if (type != undefined) {
                        this.scriptItem = item;
                        this.scriptType = type;
                    }
                    if (pressType != undefined) {
                        this.pressType = pressType;
                    }
                    if (numTextData != undefined) {
                        this.numTextData = numTextData;
                    }
                    if (it != undefined) {
                        this.it = it;
                    }

                    let str = Typearr[i];
                    let reg = /[G]+([^G]+?)(?=[)]+|$)/g;
                    let res;
                    let data = [];
                    //获取GetProperty下的（）内容，由于有【和转义符号会报错分开筛选
                    while ((res = reg.exec(str)) != null) {
                        data.push(res[1]);
                    }
                    let ziarr = [];
                   var arr = [];
                    let isShow = true;
                    //该脚本画面属性有下拉，文本输入，时间的下发事件
                    if (data.length) {
                        for (let j = 0; j < data.length; j++) {
                            let reg1 = /etProperty\(/g;
                            let reg2 = /\\/g;
                            let reg3 = /"/g;
                            let vaee;
                            if (reg1.test(data[j])) {
                                vaee = data[j].replace(reg1, '');
                                vaee = vaee.replace(reg2, '');
                                vaee = vaee.replace(reg3, '');
                                ziarr.push(vaee); //用正则取出控件名和类型
                            }
                        }

                        if (ziarr.length != 0) {
                            isShow = false;
                            //将筛选的数据格式化
                            let WebPropertyArr = [];
                            for (let k = 0; k < ziarr.length; k++) {
                               var aab = this.$refs.DateTimePicker282.TimeValueFun();
                                let bbb = this.$refs.Combobox299.TimeValueFun();
                                let bbb1 = this.$refs.Combinecombobox.TimeValueFun();
                                let ccb = this.$refs.textimport27a.TimeValueFun();
                                let vv = '';
                                if (
                                    ziarr[k].split(',')[1].trim() ==
                                    'SelectedValue'
                                ) {
                                    //下拉框   //根据类型和控件名赋值
                                    for (let f = 0; f < bbb.length; f++) {
                                        if (
                                            bbb[f].name ==
                                            ziarr[k].split(',')[0].trim()
                                        ) {
                                            vv = bbb[f].value;
                                            isShow = true;
                                        }
                                    }
                                        for (let f = 0; f < bbb1.length; f++) {
                                        if (
                                            bbb1[f].name ==
                                            ziarr[k].split(',')[0].trim()
                                        ) {
                                            vv = bbb1[f].value;
                                            isShow = true;
                                        }
                                    }
                                } else if (
                                    ziarr[k].split(',')[1].trim() == 'DateTime'
                                ) {
                                    //时间
                                    for (let f = 0; f < aab.length; f++) {
                                        if (
                                            aab[f].name ==
                                            ziarr[k].split(',')[0].trim()
                                        ) {
                                            vv = aab[f].value;
                                            isShow = true;
                                        }
                                    }
                                } else if (
                                    ziarr[k].split(',')[1].trim() == 'InputText'
                                ) {
                                    //文本框
                                    for (let f = 0; f < ccb.length; f++) {
                                        if (
                                            ccb[f].name ==
                                            ziarr[k].split(',')[0].trim()
                                        ) {
                                            vv = ccb[f].value;
                                            isShow = true;
                                        }
                                    }
                                }
                                let vvalue = {
                                    Control: ziarr[k].split(',')[0],
                                    Property: ziarr[k].split(',')[1].trim(),
                                    Value: vv
                                };
                                WebPropertyArr.push(vvalue);
                            }
                            let val = {
                                //格式构成
                                ScriptContent: str,
                                WebProperty: WebPropertyArr
                            };
                            arr.push(val);
                        } else {
                            let val1 = {
                                //格式构成
                                ScriptContent: str,
                                WebProperty: []
                            };
                            arr.push(val1);
                        }
                    } else {
                        let val2 = {
                            //格式构成
                            ScriptContent: str,
                            WebProperty: []
                        };
                        arr.push(val2);
                    }
                    //画面属性选了其他控件
                    if (!isShow) {
                        this.isTipsPop = true;
                        return;
                    }
                    endarr.push(arr[0]);
                    console.log('脚本事件', arr);
                }
            }

            if (endarr.length == 0) {
                console.log();
                endarr = [{ ScriptContent: undefined, WebProperty: [] }];
            }
        
            // 修改过的
            if (this.$store.state.websocketsShow != null) {
                    console.log('脚本事件', endarr);
                window.$.connection.chart.server.ExecuteScript(endarr);
            }
        },
        //  执行脚本事件
        scriptFunData(scriptData) {
            console.log('dsadsadasfas', scriptData);
            if (this.scriptType == '控制按钮') {
                this.$refs.CornerButton6.issueFun(this.scriptItem);
            }
            if (this.scriptType == '点动按钮') {
                var pressType;
                if (this.pressType == '1') {
                    pressType = '1';
                } else if (this.pressType == '2') {
                    pressType = '2';
                }
                this.$refs.PressButton7.pressFun(this.scriptItem, pressType);
            }
            if (this.scriptType == '数值显示') {
                this.$refs.DataTextBlock12.dbClickPop(this.numTextData);
            }
            if (this.scriptType == '查询按钮') {
                this.$refs.querybutton25.searchData(this.scriptItem, this.it);
            }
            var value = scriptData;
            for (let i = 0; i < value.length; i++) {
                var name = $(`.${value[i].Control}`).attr('name');

                if (name == 'line') {
                    //直线
                    var Laa = $(`.${value[i].Control}`)
                        .find('.box1')
                        .css('mask-size');
                    var Lbb = Laa.indexOf(',');
                    var Lbbb = Laa.slice(0, Lbb);
                    var Lc = Lbbb.split(' ');
                    var La1 = Lc[0].slice(0, Lc[0].length - 2);
                    var La2 = Lc[1].slice(0, Lc[1].length - 2);
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'IsSolidLine') {
                        La1 = value[i].Value == 'false' ? '8' : '1';
                        $(`.${value[i].Control}`)
                            .find('.box1')
                            .css(
                                'mask-size',
                                `${La1}px ${La2}px, 0px 0px, 0px 0px, 0px 0px`
                            );
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        La2 = value[i].Value;

                        var height = parseFloat(
                            $(`.${value[i].Control}`).css('height')
                        );
                        var marginTop =
                            Number(height) / 2 - Number(value[i].Value) / 2;

                        $(`.${value[i].Control} .box1`).css(
                            'marginTop',
                            marginTop
                        );
                        $(`.${value[i].Control}`)
                            .find('.box1')
                            .css(
                                'mask-size',
                                `${La1}px ${La2}px, 0px 0px, 0px 0px, 0px 0px`
                            );
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`)
                            .find('.box1')
                            .css('background', value[i].Value);
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'statictextblock') {
                    //静态文本

                    $(`.${value[i].Control}`).css(
                        value[i].Property,
                        value[i].Value
                    );
                    if (value[i].Property == 'font-weight') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'color') {
                        $(`.${value[i].Control} span`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'Text') {
                        $(`.${value[i].Control}`).text(value[i].Value);
                    }
                    if (value[i].Property == 'border-radius') {
                        $(`.${value[i].Control}`).css(value[i].Property, '0px');
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'solidrectangle') {
                    //矩形
                    var Raa = $(`.${value[i].Control}`)
                        .find('.box')
                        .css('mask-size');
                    var Rbb = Raa.indexOf(',');
                    var Rbbb = Raa.slice(0, Rbb);
                    var Rc = Rbbb.split(' ');
                    var Ra1 = parseInt(Rc[0]);
                    var Ra2 = parseInt(Rc[1]);

                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'IsSolidLine') {
                        Ra1 = value[i].Value == 'false' ? '8' : '1';
                        $(`.${value[i].Control}`)
                            .find('.box')
                            .css(
                                'mask-size',
                                `${Ra1}px ${Ra2}px, ${Ra2}px ${Ra1}px, ${Ra1}px ${Ra2}px, ${Ra2}px ${Ra1}px`
                            );
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        Ra2 = value[i].Value;
                        $(`.${value[i].Control}`)
                            .find('.box')
                            .css(
                                'mask-size',
                                `${Ra1}px ${Ra2}px, ${Ra2}px ${Ra1}px, ${Ra1}px ${Ra2}px, ${Ra2}px ${Ra1}px`
                            );
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`)
                            .find('.box')
                            .css('background', value[i].Value);
                    }
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`)
                            .find('.conter')
                            .css('background', value[i].Value);
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[i].Control == value[j].Control) {
                                    if (value[j].Value.CoordinateType == 1) {
                                        movetype = 1;
                                        movetop += value[j].Value.Y;
                                        moveleft += value[j].Value.X;
                                        movetime = value[j].Value.Time;

                                        if (movetop > bodytop) {
                                            movetop = bodytop;
                                        }
                                        if (moveleft > bodyleft) {
                                            moveleft = bodyleft;
                                        }
                                        movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                    } else if (
                                        value[j].Value.CoordinateType == 2
                                    ) {
                                        movetype = 2;
                                        movetop = value[j].Value.Y;
                                        moveleft = value[j].Value.X;
                                        movetime = value[j].Value.Time;
                                        if (movetop > bodytop) {
                                            movetop = bodytop;
                                        }
                                        if (moveleft > bodyleft) {
                                            moveleft = bodyleft;
                                        }
                                        movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                    }
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (
                    name == 'cornerbutton' ||
                    name == 'pressbutton' ||
                    name == 'tabmodulebutton' ||
                    name == 'popupbutton'
                ) {
                    if (value[i].Property == 'background') {
                        //控制按钮、点动、弹窗、跳转
                        $(`.${value[i].Control}`)
                            .find('.conten')
                            .css('background', value[i].Value);
                    }
                    if (value[i].Property == 'text-decoration') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            'none'
                        );
                    }
                    if (value[i].Property == 'Text') {
                        $(`.${value[i].Control}`)
                            .find('.contenText')
                            .text(value[i].Value);
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        var lineHeight = parseInt(
                            $(`.${value[i].Control}`).css('height')
                        );
                        $(`.${value[i].Control}`).css(
                            'padding',
                            value[i].Value
                        );
                        $(`.${value[i].Control}`).css(
                            'line-height',
                            lineHeight - value[i].Value * 2 + 'px'
                        );
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-family') {
                        $(`.${value[i].Control}`)
                            .find('.contenText')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'font-weight') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`)
                            .find('.contenText')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'font-size') {
                        $(`.${value[i].Control}`)
                            .find('.contenText')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'color') {
                        $(`.${value[i].Control}`)
                            .find('.contenText')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'border-radius') {
                        $(`.${value[i].Control}`)
                            .find('.conten')
                            .css(value[i].Property, value[i].Value);
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`).css(
                            'background',
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'switch') {
                    //开关
                    if (value[i].Property == 'background') {
                        //开关不改字体颜色和背景颜色
                        if ($(`.${value[i].Control}ipt`)[0].checked) {
                            $(`.${value[i].Control}`)
                                .find('#switch-area')
                                .css('background', value[i].Value);
                        }
                    }
                    if (value[i].Property == 'font-family') {
                        $(`.${value[i].Control}`)
                            .find('.switch-text')
                            .css('font-family', value[i].Value);
                    }
                    if (value[i].Property == 'font-size') {
                        $(`.${value[i].Control}`)
                            .find('.switch-text')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-weight') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`)
                            .find('.switch-text')
                            .css(value[i].Property, value[i].Value);
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name === 'matrixgridset' || name === 'matrixgrid') {
                    //单点矩阵、矩阵设定
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'background') {
                        for (
                            let j = 0;
                            j <
                            $(`.${value[i].Control}`).find('.matrixgrid-cell')
                                .length;
                            j++
                        ) {
                            if (
                                !$(`.${value[i].Control}`)
                                    .find('.matrixgrid-cell:eq(' + j + ')')
                                    .attr('data-change')
                            ) {
                                $(`.${value[i].Control}`)
                                    .find('.matrixgrid-cell:eq(' + j + ')')
                                    .css(value[i].Property, value[i].Value);
                            }
                        }
                    }
                    if (value[i].Property == 'font-family') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`)
                            .find('.matrixgrid-set')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'font-size') {
                        $(`.${value[i].Control}`)
                            .find('.matrixgrid-set')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'color') {
                        $(`.${value[i].Control}`)
                            .find('.matrixgrid-set input')
                            .css('-webkit-text-fill-color', value[i].Value);
                    }
                    if (value[i].Property == 'font-weight') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`)
                            .find('.matrixgrid-set')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'text-decoration') {
                        $(`.${value[i].Control}`)
                            .find('.matrixgrid-set')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`).css(
                            'background',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`).css(
                            'padding',
                            value[i].Value + 'px'
                        );
                    }
                    if (value[i].Property == 'IsEnabled') {
                        let flag = value[i].Value === "true" ? false : true
                        $(`.${value[i].Control}`).find('.matrixgrid-set input').attr('disabled', flag);
                        $(`.${value[i].Control}`).find('.matrixgrid-set .add, .matrixgrid-set .subtract').attr('disabled', flag);
                    }

                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'datatextbox' || name == 'rwtextbox') {
                    //数值输入、读写框
                    var Ih = parseInt($(`.${value[i].Control}`).css('height'));
                    var Iw = parseInt($(`.${value[i].Control}`).css('width'));
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`)
                            .parents('.contenBox')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`)
                            .parents('.conten')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'font-size') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'color') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-weight') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-family') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'text-decoration') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`)
                            .parents('.contenBox')
                            .css('background', value[i].Value);
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`)
                            .parents('.contenBox')
                            .css('padding', value[i].Value + 'px');
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat(
                            $(`.${value[i].Control}`).parents('.contenBox')[0]
                                .style.height
                        );
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat(
                            $(`.${value[i].Control}`).parents('.contenBox')[0]
                                .style.width
                        );
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`).parents('.contenBox')[0].style
                            .left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`).parents('.contenBox')[0].style
                            .top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    //  console.log(bodytop, bodyleft, movetop, moveleft)
                    //  console.log($('.report')[0])
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            console.log(
                                'sadasdasd',
                                $(`.${value[i].Control}`).parents(
                                    '.contenBox'
                                )[0]
                            );
                            if (
                                !$(`.${value[i].Control}`)
                                    .parents('.contenBox')
                                    .is(':animated')
                            ) {
                                movehtml =
                                    `$('.` +
                                    value[i].Control +
                                    `').parents('.contenBox')` +
                                    movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'datatextblock') {
                    //数值显示
                    var Th = parseInt(
                        $(`.${value[i].Control}`)
                            .parents('.DataTextBlock121aa1')
                            .css('height')
                    );
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`)
                            .parents('.DataTextBlock121aa1')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-size') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'color') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-weight') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-family') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'text-decoration') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`)
                            .parents('.DataTextBlock121aa1')
                            .css('background', value[i].Value);
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`)
                            .parents('.DataTextBlock121aa1')
                            .css('padding', value[i].Value + 'px');
                        $(`.${value[i].Control}`)
                            .parents('.DataTextBlock121aa1')
                            .css('line-height', Th - value[i].Value * 2 + 'px');
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat(
                            $(`.${value[i].Control}`).parents(
                                '.DataTextBlock121aa1'
                            )[0].style.height
                        );
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat(
                            $(`.${value[i].Control}`).parents(
                                '.DataTextBlock121aa1'
                            )[0].style.width
                        );
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`).parents(
                            '.DataTextBlock121aa1'
                        )[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`).parents(
                            '.DataTextBlock121aa1'
                        )[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (
                                !$(`.${value[i].Control}`)
                                    .parents('.DataTextBlock121aa1')
                                    .is(':animated')
                            ) {
                                movehtml =
                                    `$('.` +
                                    value[i].Control +
                                    `').parents('.DataTextBlock121aa1')` +
                                    movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'ellipselamp' || name == 'commonlamp') {
                    //圆形

                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;

                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'commonlamp') {
                    //矩形
                    if (value[i].Property == 'border-radius') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'dynamictext') {
                    //动态文本
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-size') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'color') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-weight') {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'font-family') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'text-decoration') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'image') {
                    //动态图
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'outputbutton' || name == 'querybutton') {
                    //查询、导出
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`)
                            .find('.conten')
                            .css('background', value[i].Value);
                    }
                    if (value[i].Property == 'text-decoration') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            'none'
                        );
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }

                    if (value[i].Property == 'Text') {
                        $(`.${value[i].Control}`)
                            .find('.contenText')
                            .text(value[i].Value);
                    }

                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`).css(
                            'background',
                            value[i].Value
                        );
                    }
                    if (
                        value[i].Property == 'font-weight' ||
                        value[i].Property == 'font-family' ||
                        value[i].Property == 'font-size' ||
                        value[i].Property == 'color'
                    ) {
                        if (
                            value[i].Value == 'none' &&
                            value[i].Property == 'font-weight'
                        ) {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`)
                            .find('.contenText')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'border-radius') {
                        $(`.${value[i].Control}`)
                            .find('.conten')
                            .css(value[i].Property, value[i].Value);
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`).css(
                            'padding',
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'solidellipse') {
                    //圆
                    var Sh = parseInt($(`.${value[i].Control}`).css('height'));
                    var Sw = parseInt($(`.${value[i].Control}`).css('width'));
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`).find(
                            '#myellipse'
                        )[0].style.fill = value[i].Value;
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`).find(
                            '#myellipse'
                        )[0].style.stroke = value[i].Value;
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`).find(
                            '#myellipse'
                        )[0].style.strokeWidth = value[i].Value;
                        $(`.${value[i].Control}`).find(
                            '#myellipse'
                        )[0].style.cx =
                            (Sw - value[i].Value * 2) / 2 +
                            Number(value[i].Value);
                        $(`.${value[i].Control}`).find(
                            '#myellipse'
                        )[0].style.cy =
                            (Sh - value[i].Value * 2) / 2 +
                            Number(value[i].Value);
                        $(`.${value[i].Control}`).find(
                            '#myellipse'
                        )[0].style.rx = (Sw - value[i].Value) / 2;
                        $(`.${value[i].Control}`).find(
                            '#myellipse'
                        )[0].style.ry = (Sh - value[i].Value) / 2;
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'IsSolidLine') {
                        $(`.${value[i].Control}`).find(
                            '#myellipse'
                        )[0].style.strokeDasharray =
                            value[i].Value == 'true' ? 'none' : '5 5';
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'staticimage') {
                    //静态图片
                    if (value[i].Property == 'Source') {
                        $(`.${value[i].Control}`).find(
                            '.boximg'
                        )[0].src = `/images/${value[i].Value}`;
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'Combobox') {
                    //下拉框样式
                    if (
                        value[i].Property == 'background' ||
                        value[i].Property == 'color' ||
                        value[i].Property == 'font-family' ||
                        value[i].Property == 'font-weight' ||
                        value[i].Property == 'font-size' ||
                        value[i].Property == 'text-decoration'
                    ) {
                        if (value[i].Value == 'none') {
                            value[i].Value = '';
                        }
                        $(`.${value[i].Control}`)
                            .find('.el-input__inner')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`).css(
                            'background',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`).css(
                            'padding',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            'opacity',
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'DateTimePicker') {
                    //时间控件样式
                    if (
                        value[i].Property == 'background' ||
                        value[i].Property == 'color' ||
                        value[i].Property == 'font-size' ||
                        value[i].Property == 'text-decoration' ||
                        value[i].Property == 'font-weight' ||
                        value[i].Property == 'font-family'
                    ) {
                        if (value[i].Value == 'none') {
                            value[i].Value = '';
                        }
                        $(`.${value[i].Control}picker`)
                            .find('.el-input__inner')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`).css(
                            'background',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`).css(
                            'padding',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            'opacity',
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }

                if (name == 'textimport') {
                    //数值输入
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`)
                            .find('.conten')
                            .css('background', value[i].Value);
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (
                        value[i].Property == 'text-decoration' ||
                        value[i].Property == 'font-family' ||
                        value[i].Property == 'font-weight' ||
                        value[i].Property == 'font-size' ||
                        value[i].Property == 'color'
                    ) {
                        if (value[i].Value == 'none') {
                            value[i].Value = 400;
                        }
                        $(`.${value[i].Control}`)
                            .find('.textimportInput')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`).css(
                            'padding',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`).css(
                            'background',
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'NumberScreen') {
                    //数值筛选
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`).css(
                            'background',
                            value[i].Value
                        );
                        $(`.${value[i].Control}`)
                            .find('.elSelect')
                            .css('background', value[i].Value);
                        $(`.${value[i].Control} .el-select-dropdown`).css(
                            'background',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'Stroke') {
                        var borderColor = `linear-gradient(to right,${value[i].Value},${value[i].Value}) 1 10`;
                        $(`.${value[i].Control}`)
                            .find('.elSelect')
                            .css('border-image', borderColor);
                        $(`.${value[i].Control}`)
                            .find('.elInput1')
                            .css('border-image', borderColor);
                        $(`.${value[i].Control}`)
                            .find('.elInput2')
                            .css('border-image', borderColor);
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`)
                            .find('.elSelect')
                            .css('border-width', value[i].Value);
                        $(`.${value[i].Control}`)
                            .find('.elInput1')
                            .css('border-width', value[i].Value);
                        $(`.${value[i].Control}`)
                            .find('.elInput2')
                            .css('border-width', value[i].Value);
                    }
                    if (
                        value[i].Property == 'color' ||
                        value[i].Property == 'font-size' ||
                        value[i].Property == 'font-weight' ||
                        value[i].Property == 'font-family' ||
                        value[i].Property == 'text-decoration'
                    ) {
                        if (value[i].Value == 'none') {
                            value[i].Value = '';
                        }
                        if (value[i].Property != 'text-decoration') {
                            $(`.${value[i].Control}`)
                                .find('input')
                                .css(value[i].Property, value[i].Value);
                        }
                        $(`.${value[i].Control}`)
                            .find('.elInput1')
                            .css(value[i].Property, value[i].Value);
                        $(`.${value[i].Control}`)
                            .find('.elInput2')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'mediaplayer') {
                    //视频控件
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'Source') {
                        $(`.${value[i].Control}`).find(
                            'video'
                        )[0].src = `/images/${value[i].Value}`;
                        setTimeout(() => {
                            this.$refs.Video.videoFun(
                                value[i].Control,
                                `/images/${value[i].Value}`
                            );
                        }, 500);
                    }
                    console.log(
                        $(`.${value[i].Control}`).parents('.divvideo')[0]
                    );
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat(
                            $(`.${value[i].Control}`).parents('.divvideo')[0]
                                .style.height
                        );
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat(
                            $(`.${value[i].Control}`).parents('.divvideo')[0]
                                .style.width
                        );
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`).parents('.divvideo')[0].style
                            .left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`).parents('.divvideo')[0].style
                            .top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (
                                !$(`.${value[i].Control}`)
                                    .parents('.divvideo')
                                    .is(':animated')
                            ) {
                                movehtml =
                                    `$('.` +
                                    value[i].Control +
                                    `').parents('.divvideo')` +
                                    movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }

                if (name == 'alert') {
                    //报警控件
                    if (
                        value[i].Property == 'opacity' ||
                        value[i].Property == 'border-radius'
                    ) {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'HeaderFontFamily') {
                        $(`.${value[i].Control}AlarmTitle`).css(
                            'fontFamily',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'HeaderFontSize') {
                        let flooH = $(
                            `.${value[i].Control}alarm_fool`
                        ).height();
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_no')
                            .css('width', 'auto');
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_no')
                            .css('fontSize', `${value[i].Value}px`);
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_text')
                            .css('fontSize', `${value[i].Value}px`);
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_no')
                            .css('lineHeight', `${value[i].Value}px`);
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_text')
                            .css('lineHeight', `${value[i].Value}px`);
                        $(`.${value[i].Control}AlarmTitle`)
                            .parents('.alarm_title')
                            .css('height', `${value[i].Value}px`);
                        $(`.${value[i].Control}alarm_conter`).css(
                            'height',
                            `calc(100% - 28px - ${value[i].Value}px - ${flooH}px)`
                        );
                    }
                    if (value[i].Property == 'HeaderForeground') {
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_no')
                            .css('color', value[i].Value);
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_text')
                            .css('color', value[i].Value);
                    }
                    if (value[i].Property == 'HeaderIsBlod') {
                        let weight;
                        if (value[i].Value == 'true') {
                            weight = 'bold';
                        } else {
                            weight = '';
                        }
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_no')
                            .css('font-weight', weight);
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_text')
                            .css('font-weight', weight);
                    }
                    if (value[i].Property == 'HeaderTextDecorations') {
                        let TextDecorations;
                        if (value[i].Value == 'true') {
                            TextDecorations = 'underline';
                        } else {
                            TextDecorations = 'none';
                        }
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_no')
                            .css('text-decoration', TextDecorations);
                        $(`.${value[i].Control}AlarmTitle`)
                            .find('.alarm_title_text')
                            .css('text-decoration', TextDecorations);
                    }
                    if (value[i].Property == 'ItemBackground') {
                        $(`.${value[i].Control}`)
                            .find('.alarm_conter')
                            .css('background', value[i].Value);
                    }
                    if (
                        value[i].Property == 'color' ||
                        value[i].Property == 'font-size' ||
                        value[i].Property == 'font-family' ||
                        value[i].Property == 'font-weight' ||
                        value[i].Property == 'text-decoration'
                    ) {
                        if (value[i].Property == 'font-weight') {
                            if (value[i].Value == 'none') {
                                value[i].Value = '';
                            }
                        }
                        if (value[i].Property == 'font-size') {
                            $(`.${value[i].Control}`)
                                .find('.alarm_fool_num')
                                .css('lineHeight', value[i].Value);
                            $(`.${value[i].Control}`)
                                .find('.alarm_fool_num')
                                .css('lineHeight', value[i].Value);
                            var headH = $(
                                `.${value[i].Control}AlarmTitle`
                            ).height();
                            $(`.${value[i].Control}alarm_conter`).css(
                                'height',
                                `calc(100% - 28px - ${headH}px - ${value[i].Value})`
                            );
                        }
                        if (value[i].Property != 'color') {
                            $(`.${value[i].Control}`)
                                .find('.alarm_fool_num')
                                .css(value[i].Property, value[i].Value);
                        }
                        $(`.${value[i].Control}`)
                            .find('.alarm_conter_no')
                            .css(value[i].Property, value[i].Value);
                        $(`.${value[i].Control}`)
                            .find('.alarm_conter_text')
                            .css(value[i].Property, value[i].Value);
                        $(`.${value[i].Control}`)
                            .find('.alarm_fool_text')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`)
                            .find('.alarm_box2')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'StrokeThickness') {
                        $(`.${value[i].Control}`).css(
                            'padding',
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'Stroke') {
                        $(`.${value[i].Control}`).css(
                            'background',
                            value[i].Value
                        );
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'flowpipe') {
                    //流动控件

                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'linestroke') {
                        for (
                            let i1 = 0;
                            i1 <
                            $(`.${value[i].Control}`).find('.flowline').length;
                            i1++
                        ) {
                            $(
                                $(`.${value[i].Control}`).find('.flowline')[i1]
                            ).css('background', value[i].Value);
                        }
                    }
                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }
                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
                if (name == 'tank') {
                    console.log(value);
                    if (value[i].Property == 'background') {
                        $(`.${value[i].Control}`)
                            .find('.tankfill')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'opacity') {
                        $(`.${value[i].Control}`).css(
                            value[i].Property,
                            value[i].Value
                        );
                    }
                    if (value[i].Property == 'border-radius') {
                        $(`.${value[i].Control}`)
                            .find('.tankfill')
                            .css(value[i].Property, value[i].Value);
                    }
                    if (value[i].Property == 'liquidfill') {
                        $(`.${value[i].Control}`)
                            .find('.liquidfill')
                            .css('background', value[i].Value);
                    }

                    let bodytop =
                        parseFloat($('.report')[0].style.height) -
                        parseFloat($(`.${value[i].Control}`)[0].style.height);
                    let bodyleft =
                        parseFloat($('.report')[0].style.width) -
                        parseFloat($(`.${value[i].Control}`)[0].style.width);
                    let moveleft = parseFloat(
                        $(`.${value[i].Control}`)[0].style.left
                    );
                    let movetop = parseFloat(
                        $(`.${value[i].Control}`)[0].style.top
                    );
                    let moveindex = -1;
                    let movetime = 0;
                    let movetype = 0;
                    let movehtml = ``;
                    for (let j = 0; j < value.length; j++) {
                        moveindex++;
                        if (value[i].Control == value[j].Control) {
                            if (value[j].Property == 'Move') {
                                if (value[j].Value.CoordinateType == 1) {
                                    movetype = 1;
                                    movetop += value[j].Value.Y;
                                    moveleft += value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                } else if (value[j].Value.CoordinateType == 2) {
                                    movetype = 2;
                                    movetop = value[j].Value.Y;
                                    moveleft = value[j].Value.X;
                                    movetime = value[j].Value.Time;
                                    if (movetop > bodytop) {
                                        movetop = bodytop;
                                    }
                                    if (moveleft > bodyleft) {
                                        moveleft = bodyleft;
                                    }
                                    movehtml += `.animate({"left":"${moveleft}px","top":"${movetop}px"},${movetime})`;
                                }
                            }
                        }
                    }

                    if (value[i].Property == 'Move') {
                        if (movehtml) {
                            if (!$(`.${value[i].Control}`).is(':animated')) {
                                movehtml =
                                    `$('.` + value[i].Control + `')` + movehtml;
                                eval(movehtml);
                            }
                        }
                    }
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.big_box {
    position: relative;
    width: 1920px;
    margin-top: 25px;
    height: 100%;
    z-index: 0;
}
.report {
    margin-top: 0px !important;
    height: calc(100% - 95px);
    width: 100%;
    -webkit-transform-origin: top left;
    overflow: hidden;
    position: relative;
}
.search {
    width: 100%;
    height: 60px;
}
.box1 {
    width: 100%;
    overflow: auto;
    height: calc(100% - 60px);
}
.jexcel_label {
    display: none;
}
.btablecover {
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
    .btabletop {
        width: 400px;
        height: 40px;
        background: #386df0;
        color: #fff;
        line-height: 40px;
        text-align: center;
    }
    .btableconter {
        width: 400px;
        height: 130px;
        background: #eeeeee;
        box-shadow: 0px 0px 60px 0px rgba(15, 16, 16, 0.16);
    }
    span {
        position: relative;
        font-size: 13px;
        top: 25px;
        left: 50px;
    }
    .tablebigpass {
        position: relative;
        width: 330px;
        height: 15px;
        top: 40px;
        left: 40px;
        background: #cacaca;
        border-radius: 8px;
    }
    .tablesmallpass {
        position: relative;
        width: 0px;
        height: 15px;
        // top: 40px;
        // left: 40px;
        background: #00c297;
        border-radius: 8px;
    }
    .tablepassword {
        position: absolute;
        right: 20px;
        font-size: 13px;
        top: -1px;
        // color:#fff;
    }
}
.scalediv1 {
    overflow: hidden;
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
}
.customerPage{
    box-sizing: content-box;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30999999;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
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
    .tipcontanin{
        height: 110px;
    }
    .tipword {
        // width:calc(100% - 0px);
        // text-align: center;
        padding: 20px;
        justify-content: center;
        align-items: center;
        display: flex;
        word-break: break-all;
        height: 70px;
        min-height:70px ;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        text-align: center;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
        position: absolute;
        bottom: 20px;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
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
.cover1111 {
    width: 100%;
    height: 100%;
    z-index: 9999999;
    position: fixed;
    top: 0;
    left: 0;
}
.loadbox{
      width: 100%;
    height: 100%;
    z-index: 99999999;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
