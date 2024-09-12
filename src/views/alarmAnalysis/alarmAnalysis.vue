<!--
 * @description: 报警统计页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater" :style="{zoom:(a1-0.1)}" v-loading="this.$store.state.isShow">
        <div class="linebox" :class="{colordiv:$store.state.color=='grey'}" >
            <div class="table clearfix" >
                <div class="fll">
                    <span v-show="ri == 1"  >{{lang.AlarmStatistics_AlarmStatisticsUserControl_StartTime}}</span>
                    <div class="container">
                        <div class="block" >
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value1"
                                type="datetime"
                                 @focus="sx"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                              :style="[{height:40*a1<40?40:40*1+'px'},{fontSize:16*1+'px'},{width:250*1+'px'}]"
                            ></el-date-picker>
                        </div>
                        <span v-show="ri == 1"  >{{lang.AlarmStatistics_AlarmStatisticsUserControl_EndTime}}</span>
                        <div class="block" >
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value2"
                                type="datetime"
                                @focus="sx"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="[{height:40*a1<40?40:40*1+'px'},{fontSize:16*1+'px'},{width:250*1+'px'}]"
                            ></el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="query W1" @click="tablename" v-show="ri == 1" :id="cxid" :style="[{lineHeight:36*1<36?36+'px':36*1+'px'},{height:40*1<40?40:40*1+'px'},{fontSize:16*1+'px'},{width:120*1+'px'}]">{{lang.AlarmStatistics_AlarmStatisticsUserControl_Query}}</div>
                <div class="fr">
                    <div class="export" @click="saveImage('img', lang.AlarmAnalysis)" :id="dcid" :style="[{lineHeight:40*1<40?40+'px':40*1+'px'},{height:40*1<40?40:40*1+'px'},{fontSize:16*1+'px'},{width:120*1+'px'}]">{{lang.AlarmStatistics_AlarmStatisticsUserControl_Export}}</div>
                 
                    <div class="query" @click="back"   v-show="ri == 2" :style="[{lineHeight:36*1<36?36+'px':36*1+'px'},{height:40*1<40?40:40*1+'px'},{fontSize:16*1+'px'},{width:120*1+'px'}]">{{lang.AlarmStatistics_AlarmStatisticsUserControl_Back}}</div>
            
                </div>
            </div>
            <!-- <div id="myChart" ref="myChart" :style="{width: '100%', height: '36%'}"></div> -->
            <div
                class="tabledata"
                id="w"
                :style="{width: '100%', height: `calc(100% - ${a2})`}"
                v-if="ddddssss.length!==0"
                ref="img"
            >
            <div class='mainbox'  style="width:100%;height:500px;position:relative">
             <div id="main3" style="height:500px;display:block;position:absolute"  :style="{width: 100/(a1-0.1)+'%', height: '340px',zoom:1/(a1-0.1),transform:'scale('+(a1-0.1)+')'}" ></div>
                <div id="main" style="height:500px;display:none;position:absolute" :style="{width: 100/(a1-0.1)+'%', height: '340px',zoom:1/(a1-0.1),transform:'scale('+(a1-0.1)+')'}" ></div>
                <div id="main1" style="height:500px;display:none;position:absolute" :style="{width: 100/(a1-0.1)+'%', height: '340px',zoom:1/(a1-0.1),transform:'scale('+(a1-0.1)+')'}" ></div>
            </div>
               
            </div>
        </div>
        <div class="tip" ref="kongtiao3" v-if="tipchange1">
            <div
                class="tiptop"
            >
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{w}}</div>
                <div class="tipdetermine" @click="tip2">{{lang.MessageBox_Confrim}}</div>
            </div>
        </div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts');
import html2canvas from 'html2canvas';
require('echarts/lib/chart/line');
// 以下的组件按需引入
require('echarts/lib/component/tooltip'); // tooltip组件
require('echarts/lib/component/title'); //  title组件
require('echarts/lib/component/legend'); // legend组件
export default {
    name: 'tapwater',
    data() {
        return {
              jurisdiction:[],
            buttonarr:[],
            cxid:"",
            dcid:'',
            cxshow:true,
            dcshow:true,
            aaa: 1,
            Chart1: '',
            Chart2: '',
            Charttemple: '',
            subChardata: [],
            secondgraphobj: '',
            ChartDataSource: '',
            ChartCalResult: '',
            ChartDataItem: '',
            Language: '',
            ZHObj: {
                chartitle: '设备报警统计',
                templechartitle: '设备报警统计模板',
                subcharttitle: '设备报警类型统计',
                tablecell0: '设备',
                tablecell1: '数量',
                tablecell2: '百分比',
                tablecell3: '累计百分比',
                subtablecell0: '报警类型',

                data1: '数据1',
                data2: '数据2',
                data3: '数据3'
            },
            PID: '',
            ddddssss:
                '[{"SericeId":null,"Name":"1","Con":"12","Per":"0.462","SumPer":"0.462","Children":[{"SericeId":null,"Name":"总是报警","Con":"8","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"2","Con":"10","Per":"0.385","SumPer":"0.847","Children":[{"SericeId":null,"Name":"总是报警","Con":"10","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"3","Con":"2","Per":"0.077","SumPer":"0.924","Children":[{"SericeId":null,"Name":"总是报警","Con":"2","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"4","Con":"1","Per":"0.038","SumPer":"0.962","Children":[{"SericeId":null,"Name":"总是报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"其他","Con":"1","Per":"0.038","SumPer":"1","Children":[{"SericeId":null,"Name":"总是报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}]',
            tipchange1: false,
            tip: 'noData',
            w: '',
            gth: require('../../assets/images/gth.png'),
            option: {},
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            value3:
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                (new Date().getDate() > 10
                    ? new Date().getDate()
                    : '0' + new Date().getDate()),
            value4:
                new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                (new Date().getDate() > 10
                    ? new Date().getDate()
                    : '0' + new Date().getDate()),
            value5:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value6:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value7:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            value8:
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            tablenames: '',
            Meter: '',
            chardata: '',
            ri: 1,
            couponList: [
                {
                    time: 1,
                    id: new Date(new Date().toLocaleDateString()),
                    id1: new Date(
                        new Date(new Date().toLocaleDateString()).getTime() +
                            24 * 60 * 60 * 1000 -
                            1
                    ),
                    name: '日期'
                },
                {
                    time: 2,
                    id:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1) +
                        '-' +
                        new Date().getDate(),
                    id1:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1) +
                        '-' +
                        new Date().getDate(),
                    name: '日报表'
                },
                {
                    time: 3,
                    id:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    id1:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    name: '月报表'
                },
                {
                    time: 4,
                    id:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    id1:
                        new Date().getFullYear() +
                        '-' +
                        (new Date().getMonth() + 1),
                    name: '年报表'
                }
            ],
            couponSelected: '',
            starttime: '',
            endtime: '',
            change: 2,
            tableData: [],
            try:1,
            hasnum: 1,
            a1:1,
            a2:1,
            sum: 0,
            data11: [],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        this.getLangData()
        //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
        this.couponSelected = this.couponList[0].name;
              this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
          this.buttonarr.forEach((item)=>{
         if(item.RightName == "查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "导出按钮"){
          this.dcid = item.RightID
         }
     })
          var userid = ''
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserID;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserID;
            }
             this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
              }).then(res => {
                  this.cxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                 this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
              }).then(res => {
                  this.dcshow = res.data.data
                 
              }).catch((err)=>{
                  console.log('err',err)
              })
    },
      computed:{
        VpowerData() {
                    return this.$store.state.btnPowerData;
        },
    },
      mounted() {
          this.a1 = Number(parseFloat(window.screen.width/1920).toFixed(2))
    if(this.a1 <1){
        this.a1  = 1
    }
    this.a2 =   this.a1*60<60?82+'px':  this.a1*60+22+'px'
        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
        // this.drawLine();
       
        if(this.cxshow){
           
            this.tablename();
        }
     
        
        // this.intgraph(this.ddddssss);
    },
    watch: {
        value1(val) {
            console.log(val);
        },
         VpowerData(val){
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
          this.buttonarr.forEach((item)=>{
         if(item.RightName == "查询按钮"){
          this.cxid = item.RightID
         }else if(item.RightName == "导出按钮"){
          this.dcid = item.RightID
         }
     })
       var userid = ''
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserID;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserID;
            }
             this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
              }).then(res => {
                  this.cxshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
                 this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
              }).then(res => {
                  this.dcshow = res.data.data
                 
              }).catch((err)=>{
                  console.log('err',err)
              })
         }
    },
    methods: {
        getLangData() {
            this.ZHObj = {
                chartitle: this.lang.AlarmStatistics_chartitle,
                templechartitle: this.lang.AlarmStatistics_templechartitle,
                subcharttitle: this.lang.AlarmStatistics_subcharttitle,
                tablecell0: this.lang.AlarmStatistics_tablecell0,
                tablecell1: this.lang.AlarmStatistics_tablecell1,
                tablecell2: this.lang.AlarmStatistics_tablecell2,
                tablecell3: this.lang.AlarmStatistics_tablecell3,
                subtablecell0: this.lang.AlarmStatistics_subtablecell0,
                data1: this.lang.AlarmStatistics_data1,
                data2: this.lang.AlarmStatistics_data2,
                data3: this.lang.AlarmStatistics_data3
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
          findPathByLeafId(id,node,path){
        if(!path){
             path = []
         }
        for(let i=0;i<node.length;i++){
          var temPath = path.concat();
        
          if(id == node[i].RightID){
                temPath.push(node[i])
           return temPath
          }
          if(node[i].Children){
           var findResult = this.findPathByLeafId(id,node[i].Children,temPath)
           if(findResult){
           return findResult
           }
          }
        }
        },
          GetUrlParam(paraName) {
        let url = document.location.toString();
        let arrObj = url.split("?");
        if (arrObj.length > 1) {
            let arrPara = arrObj[1].split("&");
            let arr;
           for(let i=0;i<arrPara.length;i++){
            arr = arrPara[i].split("=");
            if(arr&&arr[0] == paraName){
              
               return arr[1]
            }
           }
           return ''
        }else {
            return ''
        }
          },
        back() {
            document.getElementById('main1').style.display = 'none';
            document.getElementById('main').style.display = 'block';
            document.getElementById('subtabledata').style.display = 'none';
            document.getElementById('tabledata').style.display = 'table';
            document.getElementById('tabledata').style.width = '100%';
            document.getElementById('tabledata').style.height = '300px';
            this.ri = 1;
        },
        tip2() {
            if(this.w == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect){
              this.value1=new Date(new Date().toLocaleDateString());
            this.value2=new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
                      );
                        this.value1 = this.GMTToStr(this.value1);
        this.value2 = this.GMTToStr(this.value2);
            }
            this.tipchange1 = false;
        },
    
        exportTable() {
            //     let o = document.getElementById('tabledata').style.display;
            //     if (o !== 'none') {
            //         //已经是隐藏状态
            //         let mytable = document.getElementById('tabledata');
            //         console.log(mytable);
            //         this.data11 = [];
            //         for (let i = 0, rows = mytable.rows.length; i < rows; i++) {
            //             for (
            //                 let j = 0, cells = mytable.rows[i].cells.length;
            //                 j < cells;
            //                 j++
            //             ) {
            //                 if (!this.data11[i]) {
            //                       this.data11[i] = new Array();
            //                 }
            //                   this.data11[i][j] = mytable.rows[i].cells[j].innerHTML;
            //             }
            //         }
            //     } else {
            //         let mytable = document.getElementById('subtabledata');
            //         console.log(mytable);
            //         this.data11 = [];
            //         for (let i = 0, rows = mytable.rows.length; i < rows; i++) {
            //             for (
            //                 let j = 0, cells = mytable.rows[i].cells.length;
            //                 j < cells;
            //                 j++
            //             ) {
            //                 if (!this.data11[i]) {
            //                       this.data11[i] = new Array();
            //                 }
            //                   this.data11[i][j] = mytable.rows[i].cells[j].innerHTML;
            //             }
            //         }
            //     }
            //   console.log(this.data11)
            //   let av = 0;
            //   let av1 = 0;
            //   let av2 = 0;
            //   let ab = [];
            //   let ab1 = [];
            //   for(av in this.data11){
            //       ab.push(this.data11[av][0])
            //   }
            //   for(av1 in this.data11){
            //       for (av2= 0;av2 <this.data11[0].length-1;av2++){
            //           let ccc = av2+1
            //           console.log(ccc)
            //            ab1.push(this.data11[av1][ccc])
            //       }
            //   }
            //   console.log(ab)
            //   console.log(ab1)
            // require.ensure([], () => {
            //     const {
            //         export_json_to_excel
            //     } = require('../../vendor/Export2Excel');
            //     const tHeader = [
            //         '序号',
            //         '时间',
            //         '仪表名称',
            //         '瞬时流量',
            //         '累积流量'
            //     ];
            //     const filterVal = [
            //         'Number',
            //         'Time',
            //         'DeviceName',
            //         'InstantFlow',
            //         'CumulationFlow'
            //     ];
            //     let pushdata = [
            //         {
            //             Number: '',
            //             Time: '合计',
            //             DeviceName: '',
            //             InstantFlow: ' ',
            //             CumulationFlow: this.chardata.cumulationSum
            //         },
            //         {
            //             Number: '',
            //             Time: '最大',
            //             DeviceName: '',
            //             InstantFlow: this.chardata.instantMax,
            //             CumulationFlow: this.chardata.cumulationMax
            //         },
            //         {
            //             Number: '',
            //             Time: '最小',
            //             DeviceName: '',
            //             InstantFlow: this.chardata.instantMin,
            //             CumulationFlow: this.chardata.cumulationMin
            //         }
            //     ];
            //     let trydata = [];
            //     for (let i in this.tableData) {
            //         trydata.push(this.tableData[i]);
            //     }
            //     for (let j in pushdata) {
            //         trydata.push(pushdata[j]);
            //     }
            //     const list = trydata;
            //     const data = this.formatJson(filterVal, list);
            //     export_json_to_excel(tHeader, data, '自来水');
            // });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
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
        changetime() {
            this.tablename();
        },
        GMTToStr(time) {
            let date = new Date(time);
            let m = date.getMonth() + 1,
                mm = '-' + (m < 10 ? '0' + m : m);
            let d = date.getDate(),
                dd = '-' + (d < 10 ? '0' + d : d);
            let h = date.getHours(),
                hh = h < 10 ? '0' + h : h;
            let i = date.getMinutes(),
                ii = i < 10 ? '0' + i : i;
            let s = date.getSeconds(),
                ss = s < 10 ? '0' + s : s;
            return (
                date.getFullYear() + mm + dd + ' ' + hh + ':' + ii + ':' + ss
            );
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption(this.option);
        },
        somethingdata() {
            this.$axios({
                method: 'post',
                url: `/api/TapWaterTrendCurve/TapWaterTrendCurve_GstData?argDevice=${this.Meter.replace(
                    '#',
                    '%23'
                )}&argRange=${this.couponSelected}&argStartTime=${
                    this.starttime
                }&argEndTime=${this.endtime}`
            })
                .then(res => {
                   
                  
                    this.try = 2;
                    this.option.xAxis.data = res.data.data.xAxis;
                    this.option.series[0].data = res.data.data.instantData;
                    this.option.series[1].data = res.data.data.cumulationData;
                    res.data.data.instantSum =
                        Math.round(res.data.data.instantSum * 100) / 100;
                    this.chardata = res.data.data;
                    this.tableData = res.data.data.tables;
                    this.sum = this.tableData[this.tableData.length - 1].Number;
                    let myChart = echarts.init(this.$refs['myChart']);
                    myChart.setOption(this.option, true);
                })
                .catch(function(error) {
                    this.hasnum = 2;
                    console.log(error);
                });
        },
        
        tablename() {
          var timeRegex = "^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-" +
          "(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})" +
          "(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\\s+" +
          "([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$"
             var Regex = new RegExp(timeRegex)
              console.log(this.value1)
             console.log(Regex.test("2020-10-14 00:00:00"))
            if(!this.cxshow){
             this.tipchange1 = true;
             setTimeout(()=>{
                 $('.tip').css({

          left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
          top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
      })
        this.move('tip','tiptop') 
             })
            this.w1 = true
            this.tipword = ''
            this.w = this.lang.NoOperationAuthority;
            return
            }
               if(!Regex.test(this.value1)||!Regex.test(this.value2)){
                  this.tipchange1 = true;
                        setTimeout(()=>{
                 $('.tip').css({

          left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
          top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
      })
        this.move('tip','tiptop') 
             })
            this.w1 = true
            this.tipword = ''
            this.w = this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
            return
            }
          
            //请求接口
            this.$axios({
                method: 'post',
                url: `/api/AlarmStatistics/SearchAlarm?StartTime=${this.value1}&EndTime=${this.value2}`
            })
                .then(res => {
                  console.log("res",res)
                    this.try = 2;
                    if (res.data.code == 0) {

                        if(res.data.data.length === 0){
                            this.tipchange1 = true;
                            setTimeout(()=>{
                                $('.tip').css({
                             
                                    left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
                                    top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
                                })
                                this.move('tip','tiptop') 
                            })
                            this.w = this.lang.AlarmStatistics_HT_NoAlarmRecord;
                            // this.w = res.data.msg
                            return
                        }
                        this.tablenames = res.data.data;

                        if (this.Meter == '') {
                            this.Meter = this.tablenames[0];
                        }
                        if (this.couponSelected == '日期') {
                            if (this.change !== 1) {
                                this.value1 = this.GMTToStr(this.value1);
                                this.value2 = this.GMTToStr(this.value2);
                                this.change = 1;
                            }
                            this.starttime = this.value1;
                            this.endtime = this.value2;
                        } else if (this.couponSelected == '日报表') {
                            this.starttime = this.value3;
                            this.endtime = this.value4;
                        } else if (this.couponSelected == '月报表') {
                            this.starttime = this.value5;
                            this.endtime = this.value6;
                        } else if (this.couponSelected == '年报表') {
                            this.starttime = this.value7.substring(0, 4);
                            this.endtime = this.value8.substring(0, 4);
                        }
                        if (this.couponSelected == '日期') {
                            if (
                                new Date(this.starttime).getTime() >
                                new Date(this.endtime).getTime()
                            ) {
                                this.tipchange1 = true;
                                setTimeout(()=>{
                                    $('.tip').css({
                                   
                                        left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
                                        top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
                                    })
                                    this.move('tip','tiptop') 
                                })
                                this.w = this.lang.AlarmRecord_HT_TheQueryDate;
                            }
                        } else if (this.couponSelected == '日报表') {
                            if (
                                new Date(this.starttime).getTime() >
                                new Date(this.endtime).getTime()
                            ) {
                                this.tipchange1 = true;
                                      setTimeout(()=>{
                 $('.tip').css({
       
          left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
          top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
      })
        this.move('tip','tiptop') 
             })
                                this.w = this.lang.AlarmRecord_HT_TheQueryDate;
                            }
                        } else if (this.couponSelected == '月报表') {
                            if (
                                new Date(this.starttime).getTime() >
                                new Date(this.endtime).getTime()
                            ) {
                                this.tipchange1 = true;
                                      setTimeout(()=>{
                 $('.tip').css({
   
          left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
          top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
      })
        this.move('tip','tiptop') 
             })
                                this.w =  this.lang.AlarmRecord_HT_TheQueryDate;
                            }
                        } else if (this.couponSelected == '年报表') {
                            if (
                                new Date(this.starttime).getTime() >
                                new Date(this.endtime).getTime()
                            ) {
                                this.tipchange1 = true;
                                      setTimeout(()=>{
                 $('.tip').css({
    
          left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
          top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
      })
        this.move('tip','tiptop') 
             })
                                this.w =this.lang.AlarmRecord_HT_TheQueryDate;
                            }
                        }
            
                        this.ddddssss = res.data.data;
                        this.$nextTick(function() {
                            this.intgraph(this.ddddssss);
                        });
                    } else {
                 
                        this.tipchange1 = true;
                              setTimeout(()=>{
                 $('.tip').css({
    
          left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
          top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
      })
        this.move('tip','tiptop') 
             })
                        // this.w =  this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
                        this.w = res.data.msg
                    }
                })
                .catch(function(error) {
              
                    this.tipchange1 = true;
                          setTimeout(()=>{
                 $('.tip').css({
        
          left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
          top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
      })
        this.move('tip','tiptop') 
             })
                    // this.w = this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
                    this.w = res.data.msg
                });
        },
                       sx(){
            let that = this
            setTimeout(()=>{
for(let i=0;i<$('.el-picker-panel').length;i++){
                $('.el-picker-panel')[i].style.zoom = that.a1
            }
            })
              
        },
        saveImage(divText, imgText) {
               if(!this.dcshow){
             this.tipchange1 = true;
                   setTimeout(()=>{
                 $('.tip').css({
     
          left:`calc(50% - ${($('.tip').width()/2)*this.a1}px)`,
          top:`calc(50% - ${($('.tip').height()/2)*this.a1}px)`
      })
        this.move('tip','tiptop') 
             })
            this.w1 = true
            this.tipword = ''
            // this.w = this.lang.NoOperationAuthority;
            this.w = res.data.msg
            return
            }
            let canvasID = this.$refs[divText];
            let that = this;
            let a = document.createElement('a');
            html2canvas(canvasID).then(canvas => {
                let dom = document.body.appendChild(canvas);
                dom.style.display = 'none';
                a.style.display = 'none';
                document.body.removeChild(dom);
                let blob = that.dataURLToBlob(dom.toDataURL('image/jpg'));
                a.setAttribute('href', URL.createObjectURL(blob));
                //这块是保存图片操作  可以设置保存的图片的信息
                a.setAttribute('download', imgText + '.jpg');
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(blob);
                document.body.removeChild(a);
            });
        },
        initgraphsubchart(obj, ids) {
       
            if (document.getElementById('tabledata') != null) {
                document.getElementById('tabledata').style.display == 'none';
            }
            if (document.getElementById('tablebox') !== null) {
           
                 document.getElementById('tablebox').parentNode.removeChild(document.getElementById('tablebox'))
                
            }
            let arrname = new Array();
            arrname.push(this.ZHObj.subtablecell0);
            for (let i = 0; i < obj.length; i++) {
                let j = i + 1;
                arrname.push(obj[i][0]);
            }
        
            let table = document.createElement('table');
            table.id = ids;
            table.classList.add('tableclass');
            let thead = document.createElement('thead');
            //创建tr,td项
            let tr = document.createElement('tr');
            //创建文档片段
            for (let i = 0; i < arrname.length; i++) {
                let td = document.createElement('th');
                td.innerHTML = arrname[i];
                tr.appendChild(td);
            }
            
            thead.appendChild(tr);
            table.appendChild(thead);
            let div = document.createElement('div');
            div.id = 'tablebox';
            div.appendChild(table);
            document.getElementsByClassName('tabledata')[0].appendChild(div);
      
            //   div.appendChild(document.getElementsByClassName('tabledata')[0]);
            //tabel赋样式
            table.style.width = '100%';
            table.style.border = '1px solid #000000';
            // table.style.height = '300px';
            // table.style.border = '1pt solid #000000';
            //for (let i = 0; i < json.length; i++) {
            //    let newRow = table.insertRow();
            //    let newcellname = newRow.insertCell(0);
            //    newcellname.innerHTML = json[i].name;
            //    let newcellname = newRow.insertCell(1);
            //    newcellname.innerHTML = json[i].age;
            //    let newcellname = newRow.insertCell(2);
            //    newcellname.innerHTML = json[i].sal
            //}

            //插入第一行
            let tbody = document.createElement('tbody');
            let newRow = tbody.insertRow();
            let newcellname = newRow.insertCell(0);
            newcellname.innerHTML = this.ZHObj.tablecell1;
            newcellname.style.backgroundColor = '#c7d5e8';
            console.log(obj)
            for (let j = 1; j < obj.length + 1; j++) {
                let newcellname = newRow.insertCell(j);
                newcellname.innerHTML = obj[j - 1][1];
            }
            table.appendChild(tbody);
            newRow = tbody.insertRow();
            newcellname = newRow.insertCell(0);
            newcellname.innerHTML = this.ZHObj.tablecell2;
            newcellname.style.backgroundColor = '#c7d5e8';
            for (let j = 1; j < obj.length + 1; j++) {
                let newcellname = newRow.insertCell(j);
                newcellname.innerHTML = parseFloat(obj[j - 1][2]);
            }
            table.appendChild(tbody);
            newRow = tbody.insertRow();
            newcellname = newRow.insertCell(0);
            newcellname.innerHTML = this.ZHObj.tablecell3;
            newcellname.style.backgroundColor = '#c7d5e8';
            for (let j = 1; j < obj.length + 1; j++) {
                let newcellname = newRow.insertCell(j);
                newcellname.innerHTML = parseFloat(obj[j - 1][3]);
            }
            table.appendChild(tbody);
        },

        initgraphchart(obj, ids) {
        
            let arrname = new Array();
            arrname.push(this.ZHObj.tablecell0);
            for (let i = 0; i < obj.length; i++) {
                let j = i + 1;
                arrname.push(obj[i].Name);
            }

            // if (document.getElementById(ids) != null) {
            //     document.body.removeChild(document.getElementById(ids));
            // }

            let table = document.createElement('table');
            table.id = ids;
            //创建tr,td项
            let tr = document.createElement('tr');
            //创建文档片段
            for (let i = 0; i < arrname.length; i++) {
                let td = document.createElement('th');
                td.innerHTML = arrname[i];
                tr.appendChild(td);
            }
            table.appendChild(tr);
            document.getElementsByClassName('tabledata')[0].appendChild(table);

            //tabel赋样式
            table.style.width = '100%';
            table.style.height = '300px';
            table.style.border = '1px solid #000000';

            //插入第一行
            let newRow = table.insertRow();
            let newcellname = newRow.insertCell(0);
            newcellname.innerHTML = this.ZHObj.tablecell1;
         
            newcellname.style.backgroundColor = '#c7d5e8';
            for (let j = 1; j < obj.length + 1; j++) {
                let newcellname = newRow.insertCell(j);
                newcellname.innerHTML = obj[j - 1].Con;
            }
            newRow = table.insertRow();
            newcellname = newRow.insertCell(0);
            newcellname.innerHTML = this.ZHObj.tablecell2;
            newcellname.style.backgroundColor = '#c7d5e8';
            for (let j = 1; j < obj.length + 1; j++) {
                let newcellname = newRow.insertCell(j);
                newcellname.innerHTML = (
                    parseFloat(obj[j - 1].Per) * 100
                ).toFixed(1);
            }
            newRow = table.insertRow();
            newcellname = newRow.insertCell(0);
            newcellname.innerHTML = this.ZHObj.tablecell3;
            newcellname.style.backgroundColor = '#c7d5e8';
            for (let j = 1; j < obj.length + 1; j++) {
                let newcellname = newRow.insertCell(j);
                newcellname.innerHTML = (
                    parseFloat(obj[j - 1].SumPer) * 100
                ).toFixed(1);
            }
          
        },
        intgraph(secondgraphdata) {
            if(document.getElementById('tabledata')!==null){
                document.getElementById('tabledata').parentNode.removeChild(document.getElementById('tabledata'))
            }
            if (this.Language == 'English') {
                secondgraphdata = secondgraphdata.replace(/其他/g, 'other');
            }
            document.getElementById('main3').style.display = 'none';
            //document.getElementById("tabletemple").style.display = "none";
            document.getElementById('main').style.display = 'block';

            this.secondgraphobj = secondgraphdata;
            this.Chart1 = this.$echarts.init(document.getElementById('main'));
      
            let dataAxis = new Array();
            let databar = new Array();
            let dataline = new Array();
            for (let i = 0; i < this.secondgraphobj.length; i++) {
                dataAxis.push(this.secondgraphobj[i].Name);
                databar.push(
                    parseInt(
                        parseFloat(this.secondgraphobj[i].Per) * 100
                    ).toFixed(1)
                );
                dataline.push(
                    parseInt(
                        parseFloat(this.secondgraphobj[i].SumPer) * 100
                    ).toFixed(1)
                );
            }
            let yMax = 100;
            let dataShadow = [];

            for (let i = 0; i < databar.length; i++) {
                dataShadow.push(yMax);
            }

            this.option = {
                color: ['#E60012'],
                title: {
                    text: this.ZHObj.chartitle,
                    textStyle: {
                        color: '#0DB9F2', //颜色
                        fontStyle: 'normal', //风格
                        fontWeight: 'normal', //粗细
                        fontFamily: 'Microsoft yahei', //字体
                        fontSize: 14, //大小
                        align: 'center' //水平对齐
                    },
                    left: 'center'
                },
                xAxis: {
                    data: dataAxis,
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            color: '#0DB9F2'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    {
                        // For shadow
                        type: 'bar',
                        itemStyle: {
                            normal: { color: 'rgba(0,0,0,0.05)' }
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        showBackground: true,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: '#83bff6' },
                                        { offset: 0.5, color: '#188df0' },
                                        { offset: 1, color: '#188df0' }
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: '#2378f7' },
                                        { offset: 0.7, color: '#2378f7' },
                                        { offset: 1, color: '#83bff6' }
                                    ]
                                )
                            }
                        },
                        data: databar
                    },
                    {
                        type: 'line',
                        data: dataline
                    }
                ]
            };

            this.Chart1.setOption(this.option);
            // // Enable data zoom when user click bar.
            let zoomSize = 6;
            this.Chart1.on('click', params => {
               
                this.ri = 2;
                document.getElementById('main1').style.display = 'block';
                document.getElementById('main').style.display = 'none';
                for (let j = 0; j < this.secondgraphobj.length; j++) {
                    if (params.name == this.secondgraphobj[j].Name) {
                        //第二张表为空时创建
                        this.subChardata = new Array();
                        let dataAxis1 = new Array();
                        let databar1 = new Array();
                        let dataline1 = new Array();

                        let sum = 0;
                        let sumper1 = 0;
                        for (
                            let jj = 0;
                            jj < this.secondgraphobj[j].Children.length;
                            jj++
                        ) {
                            sum =
                                sum +
                                parseFloat(
                                    this.secondgraphobj[j].Children[jj].Con
                                );
                        }
                          
                        //对子项进行统计
                        for (
                            let i = 0;
                            i < this.secondgraphobj[j].Children.length;
                            i++
                        ) {
                            if (
                                parseFloat(
                                    this.secondgraphobj[j].Children[i].Con
                                ) > 0
                            ) {
                                 
                                dataAxis1.push(this.secondgraphobj[j].Children[i].Name);
                                let per1 = (parseFloat( this.secondgraphobj[j].Children[i].Con ) / sum) * 100;
                                sumper1 = sumper1 + per1;
                                databar1.push(per1);
                                dataline1.push(sumper1);
                                  console.log("this.secondgraphobj",this.secondgraphobj[j].Children[i].Con)
                                  console.log("per1",per1)
                                  console.log("sum",sum)
                                  console.log("sumper1",sumper1)
                                this.subChardata.push([
                                    this.secondgraphobj[j].Children[i].Name,
                                    parseFloat(
                                        this.secondgraphobj[j].Children[i].Con
                                    ),
                                    per1.toFixed(1),
                                    sumper1.toFixed(1)
                                ]);
                            }
                        }

                        let yMax = 100;
                        let dataShadow = [];

                        for (let i = 0; i < databar.length; i++) {
                            dataShadow.push(yMax);
                        }

                        let option1 = {
                            color: ['#E60012'],
                            title: {
                                text: this.ZHObj.subcharttitle,
                                textStyle: {
                                    color: '#0DB9F2', //颜色
                                    fontStyle: 'normal', //风格
                                    fontWeight: 'normal', //粗细
                                    fontFamily: 'Microsoft yahei', //字体
                                    fontSize: 14, //大小
                                    align: 'center' //水平对齐
                                },
                                left: 'center'
                            },
                            xAxis: {
                                data: dataAxis1,
                                axisLabel: {
                                    inside: false,
                                    textStyle: {
                                        color: '#0DB9F2'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                },
                                z: 10
                            },
                            yAxis: {
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            dataZoom: [
                                {
                                    type: 'inside'
                                }
                            ],
                            series: [
                                {
                                    // For shadow
                                    type: 'bar',
                                    itemStyle: {
                                        normal: { color: 'rgba(0,0,0,0.05)' }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    data: dataShadow,
                                    animation: false
                                },
                                {
                                    type: 'bar',
                                    showBackground: true,
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [
                                                    {
                                                        offset: 0,
                                                        color: '#83bff6'
                                                    },
                                                    {
                                                        offset: 0.5,
                                                        color: '#188df0'
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#188df0'
                                                    }
                                                ]
                                            )
                                        },
                                        emphasis: {
                                            color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [
                                                    {
                                                        offset: 0,
                                                        color: '#2378f7'
                                                    },
                                                    {
                                                        offset: 0.7,
                                                        color: '#2378f7'
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#83bff6'
                                                    }
                                                ]
                                            )
                                        }
                                    },
                                    data: databar1
                                },
                                {
                                    type: 'line',
                                    data: dataline1
                                }
                            ]
                        };
                       console.log(" this.subChardata", this.subChardata)
                        if (!this.Chart2) {
                            //初始化子图
                            // alert("s")
                            this.Chart2 = this.$echarts.init(
                                document.getElementById('main1')
                            );
                            this.Chart2.setOption(option1);
                            //初始化子表
                            document.getElementById('tabledata').style.display =
                                'none';
                            this.initgraphsubchart(
                                this.subChardata,
                                'subtabledata'
                            );
                              document.getElementById(
                                'subtabledata'
                            ).style.display = 'table';
                            document.getElementById(
                                'subtabledata'
                            ).style.width = '100%';
                            document.getElementById(
                                'subtabledata'
                            ).style.height = '300px';
                            //隐藏c#端的控件
                        } else {
                            
                            this.Chart2.setOption(option1);
                            //初始化子表
                            document.getElementById('tabledata').style.display =
                                'none';
                            document.getElementById('subtabledata').remove();
                            this.initgraphsubchart(
                                this.subChardata,
                                'subtabledata'
                            );
                            document.getElementById(
                                'subtabledata'
                            ).style.display = 'table';
                            document.getElementById(
                                'subtabledata'
                            ).style.width = '100%';
                            document.getElementById(
                                'subtabledata'
                            ).style.height = '300px';
                        }
                    }
                }

                //Chart1.dispatchAction({
                //    type: 'dataZoom',
                //    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                //    endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                //});
            });

            this.initgraphchart(this.secondgraphobj, 'tabledata');

            //let option = tableobj.getOption();
            //option.series[0].data = yarray;
            //tableobj.setOption(option);
        }
    },

  
};
</script>
<style lang="scss" scoped>
.tabledata{
    overflow-y: auto;
    overflow-x:hidden;
}
.sum {
    margin-top: 5px;
    color: #9d9d9d;
}
.fll {
    float: left;
}
.fr {
    float: right;
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
        margin: 12px 20px 10px 20px;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;
        span {
            margin-left: 18px;
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
        text-align: center;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }
    .query {
           background-color: #ffffff;
        border: 2px solid #4270e4;
        color: #4270e4;
              margin-right: 20px;
    }
    .export {
        color: #fd9e00;
        background-color: #ffffff;
        border: 2px solid #fd9e00;
          margin-right: 10px;

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
    padding: 10px;
    width: calc(100% - 20px);
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
        overflow-y:auto;
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
input,
textarea,
select,
a:focus {
    outline: none;
}

.headtable {
    color: #000000;
    font-size: 16pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
}
.headtable_td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    border: 0.5pt solid #000000;
}

.headtable_ba {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    border: 0.5pt solid #000000;
    background: #f2f2f2;
}

.headtableinput {
    border: none;
    background-color: #f2f2f2;
    height: 30px;
    width: 50px;
}

.middletablefirst {
    color: #000000;
    font-size: 10pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    border: 0.5pt solid #000000;
}
.middletablesecond {
    color: #000000;
    font-size: 9pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    border: 0.5pt solid #000000;
    background: #f2f2f2;
}

#table2 td {
    color: #000000;
    font-size: 9pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
}

#rule span {
    font-size: 8pt;
}

#table3 td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    width: 100px;
}

#table4 td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    width: 100px;
    height: 50px;
}

#tabledata {
    font-size: 14pt;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
    text-align: center;
}

#tabledata th {
    background-color: #dcf0f9 !important;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}
.W1 {
    margin-left: 10px;
}
#tabledata td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}
#subtabledata {
    font-size: 14pt;
    color: #333333;
    border-width: 1px;
    border-color: #000;
    border-style: solid;
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
}

#subtabledata th {
    //  background:#dcf0f9 url('cell-blue.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}
#subtabledata td {
    //  background:#ffffff url('cell-grey.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

#tabletemple {
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}

#tabletemple th {
    //  background:#dcf0f9 url('cell-blue.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
}
#tabletemple td {
    //  background:#ffffff url('cell-grey.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
}
.colordiv {
    background-color: #d9dbde;
}
table {
}
td {
    white-space: nowrap !important ;
    overflow: auto !important ;
}
#main,#main1,#main3{
     transform-origin:0%;
          position:absolute;
          top:0px;
          bottom:0;
          left:0;
          margin:auto;
}
</style>t