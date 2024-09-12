<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div  v-loading="loading"  ref="head"  class="tapwater" :style="{zoom:zoomValue}">
        <div class="linebox" id="linebox">
            <div class="table clearfix" >
                <div class="fl">
                    <span>{{lang.ProcessParameterConfigure_ProcessParameterReportUserControl_QueryTimeRange}}</span>
                    <div class="container">
                        <div class="block">
                            <span class="demonstration"></span>
                        
                            <el-date-picker
                                @change="stateTime"
                                @focus="getZoom()"
                                v-model="value1"
                                 :disabled="selectVale== lang.ProcessParameterReport_HT_AccurateMatching"
                                type="datetime"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                        <i class="separate">-</i>
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                                @change="entTime"
                                @focus="getZoom()"
                                v-model="value2"
                              :disabled="selectVale== lang.ProcessParameterReport_HT_AccurateMatching"
                                type="datetime"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{width:'220px'}"
                            ></el-date-picker>
                        </div>
                    </div>
                    <el-select style="margin-left:5px;width:170px" v-model="selectVale"  @focus="getZoom()" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <input type="text"  v-model="codeText" :placeholder="lang.ProcessParameterConfigure_ProcessParameterReportUserControl_InputCode" class="txt">
                    <div class="query" @click="changetime()">{{lang.FormulaManage_AddProject_Select}}</div>
                </div>
                <div class="fr">
                    <div class="export" @click="exportTable()">{{lang.ProcessParameterConfigure_ProcessParameterReportUserControl_Export}}</div>
                </div>
            </div>
            <div id="conter" class="conter">
                <div :style="{width: '100%', height: '340px',position: 'relative',marginBottom:'15px'}">  <div id="myChart" ref="myChart" :style="{width: 100/zoomValue+'%', height: '340px',zoom:1/zoomValue,transform:'scale('+zoomValue+')'}" ></div></div>
              
                <div class="tabledata" :style="{width: '100%', height: '470px'}">
                    <div class="someLeft">
                        <div @click="someLeftFun(item,index,$event)" v-for="(item,index) in Leftarr" :key="index"  class="try">{{item.name}}</div>
                    </div>
                    <div class="sometable" @scroll="menu()">
                        <div class="manytable">
                        <table class="table1" cellspacing="0">
                            <thead class="thead1">
                                    <tr class="tbody5" style="position:sticky;top:0px" >
                                      <th class="tbody5_th" style="font-size:16px;background:#b7dee8;height:60px;position: sticky;top:0;" colspan="5">{{lang.ProcessParameterReport_HT_Information}}</th>
                                    </tr>
                                <tbody class="tbody1">
                                    <div style="position:sticky;top:60px;background:#b7dee8;">
                                    <tr class="tbody2" style="font-size:16px;background:#b7dee8;height:42px !important;position: sticky;top:62px;line-height:63px">
                                        <td class="tbody2Bt" rowspan="2" style="font-size:16px;width:140px !important;height:32px;position: sticky;top:62px;background:#b7dee8;min-width:200px !important;">{{lang.ProcessParameterReport_HT_SerialNumber}}</td>
                                        <td class="tbody2Bt" rowspan="2" style="font-size:16px;width:180px !important;height:32px;position: sticky;top:62px;background:#b7dee8;min-width:160px !important;">{{lang.ProcessParameterReport_HT_Date}}</td>
                                        <td class="tbody2Bt" rowspan="2" style="font-size:16px;width:180px !important;height:32px;position: sticky;top:62px;background:#b7dee8;min-width:200px !important;">{{lang.ProcessParameterReport_HT_ProductID}}</td>
                                        <td class="tbody2Bt" rowspan="2" style="font-size:16px;width:180px !important;height:32px;position: sticky;top:62px;background:#b7dee8;min-width:200px !important;">{{lang.ProcessParameterReport_HT_IsProductQualified}}</td>
                                        <td class="tbody2Bt" rowspan="2" style="font-size:16px;width:300px !important;height:32px;position: sticky;top:62px;background:#b7dee8;min-width:700px !important;">{{lang.ProcessParameterReport_HT_ReasonForFailure}}</td>
                                    </tr>
                                      <tr style="background:#b7dee8;height:22px !important;position: sticky;top:92px;"></tr>
                                    <tr class="tbody4" style="background:#b7dee8;height:30px;position:sticky;top:133px;line-height:24px">
                                        <td class="tbody4Bt tbody4Bt1" style = "background:#b7dee8;position:sticky;top:133px;height:30px;">//</td>
                                        <td class="tbody4Bt" style = "background:#b7dee8;position:sticky;top:133px;height:30px;">//</td>
                                        <td class="tbody4Bt" style = "background:#b7dee8;position:sticky;top:133px;height:30px;">//</td>
                                        <td class="tbody4Bt" style = "background:#b7dee8;position:sticky;top:133px;height:30px;">//</td>
                                        <td class="tbody4Bt" style = "background:#b7dee8;position:sticky;top:133px;height:30px;">//</td>
                                    </tr>
                                    </div>
                                   <div>
                                    <tr class="reporData" v-for="(item,index) in ReportData" :key="index" style = "height:30px;width:100%;line-height:30px">
                                        <td width="200px">{{item.Number}}</td>
                                        <td width="180px">{{item.Date}}</td>
                                        <td width="200px">{{item.ProductID}}</td>
                                        <td width="200px" :class="item.IsQualified==true ? 'color1' : 'color2'">{{item.IsQualified ==true? lang.ProcessParameterReport_HT_Yes: lang.ProcessParameterReport_HT_No}}</td>
                                        <td width="700px" :class="item.IsQualified==true ? 'color1' : 'color2'">{{item.Reason==null ? lang.ProcessParameterReport_HT_Null : item.Reason}}</td>
                                    </tr>
                                   </div>
                                </tbody>
                             </thead>
                        </table>
                        <table class="table2" cellspacing="0">
                            <thead class="thead2">
                                <tr style="position:sticky;top:0px">
                                <th class="table2_tbdoy2" style="font-size:16px;border-left:1px solid #000;background:#c4d79b;height:62px;position: sticky;top:0;" :colspan="Projectsdata.length+1">
                                    {{Text}}
                                </th>
                                </tr>
                                <tbody >
                                    <div style="position:sticky;top:62px">
                                    <tr class="tbody2" style = "font-size:16px;background:#c4d79b;height:32px !important;position: sticky;top:62px;">
                                        <td class="tbody2_td" rowspan="2" style="font-size:16px;width:250px !important;height:32px;background:#c4d79b;position: sticky;top:62px;line-height:32px"><span style="position:absolute;top:17px;left:96px">{{lang.ProcessParameterReport_HT_RecordingTime}}</span></td>
                                        <td class="tbody2_td" style="font-size:16px;line-height:24px"  rowspan="1" :colspan="item.num" v-for="(item,index) in SIDsArr" :key="index" >{{item.name}}</td>
                                    </tr>
                                     <tr style="background:#c4d79b;height:30px !important">
                                        <td @click="proNameFun(item,index)" class="proName" :style="'width:'+DomArr1[index] + 'px'" v-for="(item,index) in Projectsdata" :key="index" width="140px">{{item.ProjectName}}</td>
                                    </tr>
                                    <tr style="background:#c4d79b;height:30px;position: sticky;top:127px;">
                                        <td class="tbody4Bt" style = "background:#c4d79b;position: sticky;top:127px;height:30px;line-height:24px">//</td>
                                        <td class="tbody4Bt" v-for="(item,index) in Projectsdata" :key="index" style = "background:#c4d79b;position: sticky;top:127px;height:30px;line-height:24px">{{item.Unit}}</td>
                                    </tr>
                                    </div>
                                  <div>
                                    <tr class="reporData" v-for="(item,index) in ReportDataLeftArr" :key="index" style = "height:'30px';line-height:30px;">
                                        <td style = "width:250px;border-left:1px solid #000 !important">{{item.time}}</td>
                                        <!-- <td style = "min-width:140px" :style="'width:'+DomArr1[ind] + 'px'" class="repopNumDom"  v-for="(i,ind) in item.Arrdata" :class="[i.value>=i.lower && i.value<=i.upper ? 'color1' : 'color2','repopNumDom' + ind]" :key="ind">{{i.value}}</td> -->
                                        <td style = "min-width:140px" :style="'width:'+DomArr1[ind] + 'px'" class="repopNumDom"  v-for="(i,ind) in item.Arrdata" :class="[i.red == false ? 'color1' : 'color2','repopNumDom' + ind]" :key="ind">{{i.value}}</td>
                                    </tr>
                                  </div>
                                </tbody>
                            </thead>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 导出弹窗 -->
        <exportTasble v-if="isExport"></exportTasble>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop :popText="TipsPopText" v-if="isTipsPop"></TipsPop>
        <div v-if="isTipsPop ||isExport" class="mask_box"></div>
    </div>
</template>

<script>
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts')
import html2canvas from "html2canvas"
import TipsPop from '../../customer/TipsPop'
import exportTasble from './exportTablePop'

let myChart
export default {
    name: 'tapwater',
    components:{
        TipsPop,
        exportTasble
    },
    data() {
        return {
            value1: new Date(new Date().toLocaleDateString()),
            value2: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 - 1
            ),
            tablenames: '',
            Meter: '',
            chardata: '',
            couponSelected: '',
            starttime: '',
            endtime: '',
            change: 2,
            tableData: [],
            hasnum: 1,
            timevalue2:'',
            timevalue1:'',
            oldTimeValue1:'',
            oldTimeValue2:"",
            WID:'', 
            Leftarr:[],
            codeText:'',//产品码
            Projectsdata:[],//项目名
            ReportData:[],
            ReportDataLeft:[],
            ReportDataLeftArr:[],
            pidArr:[],
            UpperArr:[],
            LowerArr:[],
            ProductIDArr:[],
            WIDShow:false,
            ItemArr:[],
            Text:'',
            SIDsArr:[],
            scroll:'',
            scrollShow:true,
            loading:false,
            powerDataAll:[],
            queryId:'',
            exportId:'',
            TipsPopText:'该用户没有操作权限',
            isTipsPop:false,
            isExport:false,
            exportCodeText:'',
            selectOptions:[{
                value: '模糊匹配',
                label: '模糊匹配'
            },{
                value: '精准匹配',
                label: '精准匹配'
            }],
            selectVale:'模糊匹配',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0
        };
    },
    created(){
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.9 ? 0.9 : Number(parseFloat(window.screen.width/1920).toFixed(2))

        })
        this.getLangData()
        this.getDate1()
        this.allConfigure()
        this.powerBtn()
        //重新改变图表大小
         $(window).bind("resize",
            function () {
                myChart.resize()
            }
        );
    },
    watch:{
        VpowerData(val){  //监听按钮权限
            this.powerBtn()
        }
    },
    computed:{
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    methods: {
       getLangData() {
           this.selectOptions = [
               {
                    value: this.lang.ProcessParameterReport_HT_FuzzyMatching,
                    label: this.lang.ProcessParameterReport_HT_FuzzyMatching,
                },{
                    value: this.lang.ProcessParameterReport_HT_AccurateMatching,
                    label: this.lang.ProcessParameterReport_HT_AccurateMatching
                }
            ]
            this.selectVale = this.lang.ProcessParameterReport_HT_FuzzyMatching
       },
        //关闭弹窗提示
        clonePopFun() {
            this.isTipsPop = false
        },
        // 筛选按钮数据
        powerBtn() {
            var powerData = this.$store.state.btnPowerData
            var btnList = [] // 按钮数据列表
            var btnObj = {} // 按钮对象是为了能根据key快速查询对应的按钮数据
            // 获取按钮权限ID
            for (let i = 0, iLen = powerData.length; i < iLen; i++) {
                const Children = powerData[i].Children;
                for (let n = 0, nLen = Children.length; n < nLen; n++) {
                    const item = Children[n];
                    if (item.RightID === this.$route.query.id) {
                        btnList = item.Children;
                        break
                    }
                }
                if (btnList.length) break;
            }
            btnList.forEach((item) => {
                btnObj[item.RightDesc] = item
            });

            this.exportId = btnObj['参数报表-导出按钮'].RightID
            this.queryId = btnObj['参数报表-查询按钮'].RightID
        },
        // 该用户是否有权限
        isPower(id) {
            if (!id) {
                this.$message.warning('ID不能为空');
                return;
            }
            return new Promise((resolve, reject) => {
                var userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
                var sightseerInfo1 = JSON.parse(sessionStorage.getItem('sightseerInfo1'));
                var argUserID = (userinfo != null) ? argUserID = userinfo.SCMSUserID : argUserID = sightseerInfo1.SCMSUserID
                this.$axios({ // 权限配置请求接口
                    method: 'post',
                    url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${argUserID}&argRightID=${id}`,
                }).then(res => {
                    resolve(res.data.data)
                },err => {
                    console.log('该用户是否有权限-报错', err)
                })
            })
        },
          //懒加载
          menu() {
            var hei = document.querySelector('.sometable').scrollHeight
            var ltop = document.querySelector('.sometable').scrollTop
            var chei = document.querySelector('.sometable').clientHeight
             if (hei - ltop == chei) {        //条件触发
                     if (this.scrollShow) {
                           this.scrollNum = this.scrollNum + 1
                           if(this.aa == 'false'){    //防止重复点击
                               return
                           }
                          this.pidArr = []
                          this.ProductIDArr = []
                          this.UpperArr = []
                          this.LowerArr = []
                          this.ReportDataLeftArr = []
                          var NumLen 
                            if(this.scrollNum * 100 > this.resDataArr.length){
                                    NumLen = this.resDataArr.length
                                    this.aa = 'false'
                                    console.log('结束了')
                            }else{
                                NumLen = this.scrollNum * 100
                            }
                             for(var i=((this.scrollNum-1) * 100);i< NumLen;i++){
                              var value ={                              //格式展示的数据
                                  Number:this.resDataArr[i].Number,
                                  Date:this.resDataArr[i].Date,
                                  ProductID:this.resDataArr[i].ProductID,
                                  IsQualified:this.resDataArr[i].IsQualified,
                                  Reason:this.resDataArr[i].Reason,
                                  RecordTime:this.resDataArr[i].RecordTime,
                                 ProjectDatas:this.resDataArr[i].ProjectDatas,
                              }
                              var value8 = {                          //格式展示的数据
                                  ProjectDatas:this.resDataArr[i].ProjectDatas,
                                  ProductID:this.resDataArr[i].ProductID
                              }
                              this.ReportDataLeft.push(value8)
                              this.ReportData.push(value)
                          }

                            for(var j=0;j<this.ReportDataLeft.length;j++){
                            var arr = []                              //添加最大值最小值和当前值
                            for(var k=0;k<this.ReportDataLeft[j].ProjectDatas.length;k++){
                                    var value5 ={
                                        value:this.ReportDataLeft[j].ProjectDatas[k].Value,
                                        upper:this.leftarr1[k].Upper,
                                        lower:this.leftarr1[k].Lower,
                                        red:this.ReportDataLeft[j].ProjectDatas[k].Red,
                                    }
                                arr.push(value5)
                            }                       //时间和工位数据展示
                                var value3 ={
                                    Arrdata:arr,
                                    time:this.resDataArr[j].RecordTime
                                }
                                this.ReportDataLeftArr.push(value3)
                                 for(var o=0;o<arr.length;o++){         //自适应盒子长度
                                      if(arr[o].value != null ){
                                          var num = arr[o].value.length * 18
                                          var numsize3 = 0
                                        for(let i=0;i<arr[o].value.length;i++){
                                            var gz3 = /^[A-Za-z0-9]+$/
                                            var show3 = gz3.test(arr[o].value[i])
                                            if(show3){
                                                numsize3= numsize3 + 9
                                            }else{
                                                numsize3 = numsize3 + 18
                                            }
                                        }
                                        num = numsize3

                                        if(num > 140){
                                            if(num > this.DomArr1[o]){
                                                this.DomArr1[o] = num
                                            }
                                        }
                                      }
                           }
                        }
                          this.scrollShow = true
                     }
             }
        },
        //计算宽度
        initWidth1(){
    
            setTimeout(function(){
                document.querySelector('.manytable').style.width = 100000 + 'px'
                var t1W =document.querySelector('.table1').offsetWidth
                var t2W =document.querySelector('.table2').offsetWidth
                document.querySelector('.manytable').style.width = t1W + t2W  + 'px'
            },300)
        },
        //点击工位
        proNameFun(item,index){
             this.pidArr = []
             this.ItemArr = item
             this.proName = item.ProjectName
             this.pid = item.PID
             $('.proNameBorColor').remove()      //激活当前工位
             $(document.querySelectorAll('.proName')[index]).append('<div class="proNameBorColor" style="position:absolute;left:0;top:0;width:100%;height:29px;border:1px solid blue;box-sizing:border-box;z-index:999"></div>')
            if(this.WIDShow){
                this.pidArr = []
                this.ProductIDArr = []
                this.UpperArr = []
                this.LowerArr = []
               if(this.ReportDataLeft1.length){
                   
                   for(var j=0;j<this.ReportDataLeft1.length;j++){
                             var arr = []                         //整理图表数据
                             for(var k=0;k<this.ReportDataLeft1[j].ProjectDatas.length;k++){
                                  if(this.ReportDataLeft1[j].ProjectDatas[k].PID == this.pid){
                                      if(this.ReportDataLeft1[j].ProjectDatas[k].Value != null){
                                          this.pidArr.push(this.ReportDataLeft1[j].ProjectDatas[k].Value)
                                      }
                                          this.ProductIDArr.push(this.ReportDataLeft1[j].ProductID)
                                          this.UpperArr.push(this.leftarr1[k].Upper) 
                                          this.LowerArr.push(this.leftarr1[k].Lower) 
                                  }
                                  var value5 ={
                                     value:this.ReportDataLeft1[j].ProjectDatas[k].Value,
                                     upper:this.leftarr1[k].Upper,
                                     lower:this.leftarr1[k].Lower
                                  }
                              arr.push(value5)
                             }
                         }
                       this.drawLine()
               }else{
                   this.UpperArr.push(item.Upper)
                   this.LowerArr.push(item.Lower)
               }

            }else{
                this.UpperArr = []
                this.LowerArr = []
                this.UpperArr.push(item.Upper)
                this.LowerArr.push(item.Lower)
                this.drawLine()
            }
        },

        //点击参数报表组
        someLeftFun(item,indexx,e){
            var tryDom = document.querySelectorAll('.try')
            for(let f=0;f<tryDom.length;f++){
                tryDom[f].classList.remove('tryActive')
                tryDom[f].style.background = '#fff'
            }
            e.path[0].classList.add('tryActive')
            var domColor = $( e.path[0]).css('border-color')
            $( e.path[0]).css('background',domColor)

            this.loading = true
            this.Sid= []
            this.Sids = []
            this.sidNum = []
            this.sidName=[]
            this.sidName1=[]
            this.SIDsArr = []
            this.Projectsdata = []
            this.ReportDataLeftArr = []
            this.pidArr = []
            this.UpperArr = []
            this.LowerArr = []
            this.ProductIDArr=[]
            this.ItemArr = item.Projects[0]
            this.Text = item.name
            this.WIDShow = true
            this.WID = item.wid
            this.scrollShow = true
            this.scrollNum = 1
            this.numLength = 0
            this.DomArr1 = []
            document.querySelector('.sometable').scrollTop = 0
            this.aa = 'true'             //以上为重置
            this.QueryReportData()       //请求数据
            for(var i=0;i<item.Projects.length;i++){
                var value = {
                    PID:item.Projects[i].PID,       //格式表格数据展示
                    ProjectName:item.Projects[i].ProjectName,
                    Upper:item.Projects[i].Upper,
                    Lower:item.Projects[i].Lower,
                    Unit:item.Projects[i].Unit
                }
                this.Projectsdata.push(value) 
            }
            console.log('item',item)
             for(var s=0;s<this.Projectsdata.length;s++){
                let num1 = this.Projectsdata[s].ProjectName.length * 18
                //中文为false
                let numsize = 0
                for(let i=0;i<this.Projectsdata[s].ProjectName.length;i++){
                    let gz = /^[A-Za-z0-9]+$/
                    let show = gz.test(this.Projectsdata[s].ProjectName[i])
                    if(show){
                        numsize = numsize + 9
                    }else{
                        numsize = numsize + 18
                    }
                }
                num1 = numsize
                if(num1 > 140){                //自适应盒子长度
                    this.DomArr1.push(num1)
                }else{
                    this.DomArr1.push(140)
                }
            }
            for(let s1=0;s1<this.Projectsdata.length;s1++){
                let num1 = this.Projectsdata[s1].Unit.length * 18
                let numsize2 = 0
                for(let i=0;i<this.Projectsdata[s1].Unit.length;i++){
                    let gz2 = /^[A-Za-z0-9]+$/
                    let show2 = gz2.test(this.Projectsdata[s1].Unit[i])
                    if(show2){
                        numsize2= numsize2 + 10
                    }else{
                        numsize2 = numsize2 + 20
                    }
                }
                num1 = numsize2     
                if(num1 > 140){  //自适应盒子长度
                    if(num1 > this.DomArr1[s1]){
                        this.DomArr1[s1] = num1
                    }
                }
            }

            this.pid = item.Projects[0].PID
            this.proName = item.Projects[0].ProjectName
            $('.proNameBorColor').remove()                    //激活第一个工位
             $(document.querySelectorAll('.proName')[0]).append('<div class="proNameBorColor" style="position:absolute;left:0;top:0;width:100%;height:29px;border:1px solid blue;box-sizing:border-box;z-index:999"></div>')
            document.querySelector('.table2').style.width=''
            window.setTimeout(() => {                            //自适应表格宽度
                 document.querySelector('.manytable').style.width = 100000 + 'px'
                var t1W =document.querySelector('.table1').offsetWidth
                var t2W =document.querySelector('.table2').offsetWidth
                document.querySelector('.manytable').style.width = t1W + t2W  + 'px'
            },300)
 
              var projestArr = this.Leftarr[indexx].Projects
              this.Sids =this.Leftarr[indexx].SIDs                //整理工位数据
                     for(var k=0;k<projestArr.length;k++){
                        this.Sid.push(projestArr[k].SID)
                     }
                    var obj = {}; 
                    for(var y= 0, l = this.Sid.length; y< l; y++){ 
                        var item1 = this.Sid[y]; 
                        obj[item1] = (obj[item1] +1 ) || 1; 
                    } 
                    for(let i in obj ){  
                        var valueId = {
                            name: i,
                            num: obj[i]
                        }
                       this.sidNum.push(valueId)
                       this.sidName.push(i)
                    }
                    var nameArr = []
                    for(let a=0;a<projestArr.length;a++){
                        for(let b=0;b<this.sidName.length;b++){
                            if(projestArr[a].SID == this.sidName[b]){
                                var index = nameArr.indexOf(projestArr[a].StepName)
                                if (index == -1) {
                                    var valueID = {
                                        name: projestArr[a].StepName,
                                        id: projestArr[a].SID
                                    }
                                  nameArr.push(projestArr[a].StepName)
                                  this.sidName1.push(valueID)
                                }
                            }
                        }
                    }
                     for(let c=0;c<this.sidName1.length;c++){
                         for (let h = -0; h < this.sidNum.length; h++) {
                              if (this.sidNum[h].name == this.sidName1[c].id) {
                                  var value6 = {
                                      name:this.sidName1[c].name,
                                      num:this.sidNum[h].num
                                  }
                                this.SIDsArr.push(value6)
                              }
                         }
                     }
                      for(var s1=0;s1<this.SIDsArr.length;s1++){
                            var num2 = this.SIDsArr[s1].name.length * 18
                             var numsize1 = 0
                            for(let i=0;i<this.SIDsArr[s1].name.length;i++){
                                var gz1 = /^[A-Za-z0-9]+$/
                                var show1 = gz1.test(this.SIDsArr[s1].name[i])
                                if(show1){
                                    numsize1= numsize1 + 9
                                }else{
                                    numsize1 = numsize1 + 18
                                }
                            }
                            num2 = numsize1
                            if(num2 > this.DomArr1[s1]){                //自适应盒子长度
                                this.DomArr1[s1] = num2
                            }
                        }
                        this.initWidth1()
        },

        //查询所有报表的所有配置
        allConfigure(){
            this.$axios({
                  method: 'post',
                  url: '/api/ProcessParameterReport/QueryWorkSections',
              }).then(res => {
                  this.Sid= []
                  this.Sids = []
                  this.sidNum = []
                  this.sidName=[]
                  this.sidName1=[]
                  this.SIDsArr = []
                  this.Leftarr=[]
                  this.UpperArr = []
                  this.LowerArr = []
                   for(var i=0;i<res.data.data.length;i++){
                       var value ={
                           wid:res.data.data[i].WID,
                           name:res.data.data[i].WorkName,
                           Projects:res.data.data[i].Projects,
                           SIDs:res.data.data[i].SIDs,
                       } 
                    this.Leftarr.push(value)
                   }
                    var projestArr = res.data.data[0].Projects
                    this.Sids = res.data.data[0].SIDs
                     for(var k=0;k<projestArr.length;k++){
                        this.Sid.push(projestArr[k].SID)
                     }
                    var obj = {}; 
                    for(var y= 0, l = this.Sid.length; y< l; y++){ 
                        var item = this.Sid[y]; 
                        obj[item] = (obj[item] +1 ) || 1; 
                    } 

                    for(let i in obj ){  
                       this.sidNum.push(obj[i])
                       this.sidName.push(i)
                    }
                    for(var a=0;a<projestArr.length;a++){
                        for(var b=0;b<this.sidName.length;b++){
                            if(projestArr[a].SID == this.sidName[b]){
                                this.sidName1.push(projestArr[a].StepName)
                            }
                        }
                    }
                        this.sidName1 = new Set(this.sidName1)
                        this.sidName1 = [...this.sidName1]
                     for(var c=0;c<this.sidName1.length;c++){
                         var value6 = {
                             name:this.sidName1[c],
                             num:this.sidNum[c]
                         }
                       this.SIDsArr.push(value6)
                     }
                       
                     this.WID =  this.Leftarr[0].wid
                     this.Text = this.Leftarr[0].name

                     for(var j=0;j<res.data.data[0].Projects.length;j++){
                        var value1 = {
                            PID:res.data.data[0].Projects[j].PID,
                            ProjectName:res.data.data[0].Projects[j].ProjectName,
                            Upper:res.data.data[0].Projects[j].Upper,
                            Lower:res.data.data[0].Projects[j].Lower,
                            Unit:res.data.data[0].Projects[j].Unit,
                        }
                        this.Projectsdata.push(value1) 

                        this.DomArr1 = []
                         for(var s=0;s<this.Projectsdata.length;s++){
                            let num1 = this.Projectsdata[s].ProjectName.length * 18
                             let numsize2 = 0
                            for(let i=0;i<this.Projectsdata[s].ProjectName.length;i++){
                                let gz2 = /^[A-Za-z0-9]+$/
                                let show2 = gz2.test(this.Projectsdata[s].ProjectName[i])
                                if(show2){
                                    numsize2= numsize2 + 9
                                }else{
                                    numsize2 = numsize2 + 18
                                }
                            }
                            num1 = numsize2
                            if(num1 > 140){                //自适应盒子长度
                                this.DomArr1.push(num1)
                            }else{
                                this.DomArr1.push(140)
                            }
                        }
                         for(let s1=0;s1<this.Projectsdata.length;s1++){
                            let num1 = this.Projectsdata[s1].Unit.length * 18
                            let numsize2 = 0
                        
                            for(let i=0;i<this.Projectsdata[s1].Unit.length;i++){
                                let gz2 = /^[A-Za-z0-9]+$/
                                let show2 = gz2.test(this.Projectsdata[s1].Unit[i])
                                if(show2){
                                    numsize2= numsize2 + 9
                                }else{
                                    numsize2 = numsize2 + 18
                                }
                            }
                            num1 = numsize2     
                            if(num1 > 140){  //自适应盒子长度
                                if(num1 > this.DomArr1[s1]){
                                    this.DomArr1[s1] = num1
                                }
                            }
                        }

                        console.log('eee22',this.DomArr1,this.Projectsdata)
                    }
                    this.pid = this.Projectsdata[0].PID
                    this.proName = this.Projectsdata[0].ProjectName
                    this.ItemArr = this.Projectsdata[0]
                    this.UpperArr.push(this.Projectsdata[0].Upper)
                    this.LowerArr.push(this.Projectsdata[0].Lower)
                    var leftWidth = $('.someLeft').width()
                    var aW = document.body.clientWidth
                    $('.sometable').css('width', `${(((aW - (leftWidth)) / aW)*100) - (4*this.zoomValue)}%`)
                    this.drawLine();
                    this.initWidth1()
                    
                    this.$nextTick(()=>{
                        $($('.try')[0]).addClass('tryActive')    //激活当前工序高亮
                        $($('.try')[0]).css('background','#808080')
                    })

               }).catch(err => {
                  console.log('提醒err',err)
              });

        },

           //查询默认激活高亮颜色
        defaultColor(){
            let Domindex
            for(let j=0;j<$('.try').length;j++){
                if('try tryActive' == $($('.try')[j]).attr('class')){
                    Domindex = j
                }
            }
            var domColor = $($('.try')[Domindex]).css('border-color')
            $($('.try')[Domindex]).css('background',domColor)
        },

        //查询报表数据
        QueryReportData(text){
            console.log('查询',this.selectVale)
             console.log('this.DomArr1',this.DomArr1)
             var $this = this
            var accurate 
            //1是模糊 2是精准
            if(this.selectVale == this.lang.ProcessParameterReport_HT_FuzzyMatching){
                accurate = 1
            }else{
                accurate = 2
            }
             this.$axios({
                  method: 'post',
                  url: `/api/ProcessParameterReport/QueryReportData?wid=${this.WID}&startTime=${this.timevalue1}&endTime=${this.timevalue2}&code=${this.codeText}&accurate=${accurate}`,
                  wid:this.WID,
                  startTime:this.timevalue1,
                  endTime:this.timevalue2,
                  code:this.codeText,
              }).then(res => {
                  console.log('res==>',res,this.DomArr1)
                 
                  
                  if(this.codeText != '' && this.selectVale != this.lang.ProcessParameterReport_HT_FuzzyMatching){   //查询产品码改颜色
                       var tryDom = $('.try')
                      if(res.data.data.color){
                        if(res.data.data.color.length == tryDom.length){
                            for(let i=0;i<res.data.data.color.length;i++){
                                if(res.data.data.color[i] == 0){
                                    $(tryDom[i]).css('borderColor','#808080')
                                    $(tryDom[i]).css('color','#808080')
                                }else if(res.data.data.color[i] == 1){
                                    $(tryDom[i]).css('borderColor','#7ABD7A')
                                    $(tryDom[i]).css('color','#7ABD7A')
                                }else if(res.data.data.color[i] == 2){
                                    $(tryDom[i]).css('borderColor','#F96363')
                                    $(tryDom[i]).css('color','#F96363')
                                }
                                this.defaultColor()
                            }

                        }else{   //不是查询产品码恢复默认颜色
                            $('.try').css('borderColor','#808080')
                            $('.try').css('color','#808080')
                            this.defaultColor()
                        }
                    }
                  }else{
                        $('.try').css('borderColor','#808080')
                        $('.try').css('color','#808080')
                        this.defaultColor()
                  }
                  console.log('res报表数据',res)

                   this.ReportData = []
                   this.ReportDataLeft = []
                   this.ProductIDArr = []
                   this.pidArr=[]
                   this.ReportDataLeftArr = []
                   this.LowerArr = []
                   this.UpperArr = []
                   this.ReportDataLeft1 = []
                   this.ReportData1 = []
                   this.resDataArr = []
                   this.resDataArr = res.data.data.data
                   if(res.data.data.data.length!=0){
                       for(var w=0;w<this.Leftarr.length;w++){
                           if(this.WID == this.Leftarr[w].wid){
                               this.leftarr1 = this.Leftarr[w].Projects
                           }
                       }
                       console.log('this.DomArr1',this.DomArr1)
                      if(res.data.data.data.length > 100){
                          for(var i=0;i<100;i++){
                              var value ={
                                  Number:res.data.data.data[i].Number,
                                  Date:res.data.data.data[i].Date,
                                  ProductID:res.data.data.data[i].ProductID,
                                  IsQualified:res.data.data.data[i].IsQualified,
                                  Reason:res.data.data.data[i].Reason,
                                  RecordTime:res.data.data.data[i].RecordTime,
                                 ProjectDatas:res.data.data.data[i].ProjectDatas,
                              }
                              var value8 = {
                                 ProjectDatas:res.data.data.data[i].ProjectDatas,
                                  ProductID:res.data.data.data[i].ProductID
                              }
                              this.ReportDataLeft.push(value8)
                              this.ReportData.push(value)
                          }
                           for(var j=0;j<this.ReportDataLeft.length;j++){
                           var arr = []
                           for(var k=0;k<this.ReportDataLeft[j].ProjectDatas.length;k++){
                                var value5 ={
                                   value:this.ReportDataLeft[j].ProjectDatas[k].Value,
                                   upper:this.leftarr1[k].Upper,
                                   lower:this.leftarr1[k].Lower,
                                   red:this.ReportDataLeft[j].ProjectDatas[k].Red,
                                }
                            arr.push(value5)
                           }
                            var value3 ={
                                Arrdata:arr,
                                   time:res.data.data.data[j].RecordTime
                               }
                            this.ReportDataLeftArr.push(value3)
                            
                               for(var o=0;o<arr.length;o++){
                                   if(arr[o].value != null ){
                                          var num = arr[o].value.length * 18
                                            var numsize2 = 0
                                        for(let i=0;i<arr[o].value.length;i++){
                                            var gz2 = /^[A-Za-z0-9]+$/
                                            var show2 = gz2.test(arr[o].value[i])
                                            if(show2){
                                                numsize2= numsize2 + 9
                                            }else{
                                                numsize2 = numsize2 + 18
                                            }
                                        }
                                        num = numsize2
                                     
                                        if(num > 140){
                                            if(num > this.DomArr1[o]){
                                                this.DomArr1[o] = num
                                            }
                                        }
                                   }
                               }
                            }
                      }else{
                           for(var f=0;f<res.data.data.data.length;f++){
                              var value1 ={
                                  Number:res.data.data.data[f].Number,
                                  Date:res.data.data.data[f].Date,
                                  ProductID:res.data.data.data[f].ProductID,
                                  IsQualified:res.data.data.data[f].IsQualified,
                                  Reason:res.data.data.data[f].Reason,
                                  RecordTime:res.data.data.data[f].RecordTime,
                                  ProjectDatas:res.data.data.data[f].ProjectDatas,
                              }
                              var value9 = {
                                  ProjectDatas:res.data.data.data[f].ProjectDatas,
                                  ProductID:res.data.data.data[f].ProductID
                              }
                              this.ReportDataLeft.push(value9)
                              this.ReportData.push(value1)
                          }

                          for(var r=0;r<$this.ReportDataLeft.length;r++){
                           var arr1 = []
                           for(var e=0;e<$this.ReportDataLeft[r].ProjectDatas.length;e++){
                                var value6 ={
                                   value:$this.ReportDataLeft[r].ProjectDatas[e].Value,
                                   upper:$this.leftarr1[e].Upper,
                                   lower:$this.leftarr1[e].Lower,
                                   red:$this.ReportDataLeft[r].ProjectDatas[e].Red
                                }
                                arr1.push(value6)
                           }
                            var value7 ={
                                   Arrdata:arr1,
                                   time:res.data.data.data[r].RecordTime
                               }
                          
                             for(var u=0;u<arr1.length;u++){
                                  if(arr1[u].value != null ){
                                      var num1 = arr1[u].value.length * 18
                                        var numsize3 = 0
                                        console.log('arr1[u].value.length',arr1[u].value,arr1[u].value.length)
                                        for(let i=0;i< arr1[u].value.length;i++){
                                            var gz3 = /^[A-Za-z0-9]+$/
                                            var show3 = gz3.test( arr1[u].value[i])
                                            if(show3){
                                                numsize3= numsize3 + 9
                                            }else{
                                                numsize3 = numsize3 + 18
                                            }
                                        }
                                        num1 = numsize3
                                       if(num1 > 140){
                                           if(num1 > this.DomArr1[u]){
                                               this.DomArr1[u] = num1
                                           }
                                       }
                                  }
                           }
                           console.log('this.DomArr1[u]',this.DomArr1)
                           this.ReportDataLeftArr.push(value7)
                       }
                      }
                   }else{
                          this.UpperArr.push(this.ItemArr.Upper)
                          this.LowerArr.push(this.ItemArr.Lower)
                          this.drawLine()
                   }
                     for(var e1=0;e1<res.data.data.data.length;e1++){
                           var value4 ={
                                  Number:res.data.data.data[e1].Number,
                                  Date:res.data.data.data[e1].Date,
                                  ProductID:res.data.data.data[e1].ProductID,
                                  IsQualified:res.data.data.data[e1].IsQualified,
                                  Reason:res.data.data.data[e1].Reason,
                                  RecordTime:res.data.data.data[e1].RecordTime,
                                 ProjectDatas:res.data.data.data[e1].ProjectDatas,
                              }
                                var value81 = {
                                 ProjectDatas:res.data.data.data[e1].ProjectDatas,
                                  ProductID:res.data.data.data[e1].ProductID
                              }
                              this.ReportDataLeft1.push(value81)
                              this.ReportData1.push(value4)
                       }
                       for(var w1=0;w1<this.ReportDataLeft1.length;w1++){
                           for(var q=0;q<this.ReportDataLeft1[w1].ProjectDatas.length;q++){
                                if(this.ReportDataLeft1[w1].ProjectDatas[q].PID == this.pid){
                                    if(this.ReportDataLeft1[w1].ProjectDatas[q].Value != null){
                                        this.pidArr.push(this.ReportDataLeft1[w1].ProjectDatas[q].Value)
                                        this.ProductIDArr.push(this.ReportDataLeft1[w1].ProductID)
                                        this.UpperArr.push(this.leftarr1[q].Upper) 
                                        this.LowerArr.push(this.leftarr1[q].Lower) 
                                    }
                                }
                           } 
                       }
                       console.log('this.UpperArr',this.UpperArr,this.LowerArr)
                        this.drawLine()
                        this.initWidth1()         
                        this.loading = false
               }).catch(err => {
                  console.log('提醒err参数报表',err)
              });
        },

       //初始化时间
        getDate1(){
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
            this.timevalue1 = year + '/' + mothe + '/' + da + ' ' + '00:00:00'       //获取当前时间
            this.timevalue2 = year + '.' + mothe + '.' + da + ' '  + '23:59:59'
            this.oldTimeValue1 = year + '/' + mothe + '/' + da + ' ' + '00:00:00'       //获取当前时间
            this.oldTimeValue2 = year + '/' + mothe + '/' + da + ' ' + '23:59:59'       //获取当前时间
       },
        getZoom() {
            this.$nextTick(() => {
                let dates = [...document.querySelectorAll('.el-picker-panel.el-date-picker')]
                dates.forEach(item => {
                    item.style.zoom = this.zoomValue
                })
                let drops = [...document.querySelectorAll('.el-select-dropdown.el-popper')]
                drops.forEach(item => {
                    item.style.zoom = this.zoomValue
                })
            })
            
        },
      //改数据格式
      stateTime(){
           this.timevalue1 = this.value1.replace(/-/g, "/")
            var sTime = this.$moment(this.timevalue1).format('YYYY-MM-DD HH:mm:ss')
            var eTime = this.$moment(this.timevalue2).format('YYYY-MM-DD HH:mm:ss')
            var diffs = this.$moment(eTime).diff(this.$moment(sTime), 'seconds')
            if(diffs<0){
                 this.timevalue1 = this.$moment(this.oldTimeValue1).format('YYYY-MM-DD HH:mm:ss')
                 this.value1 = this.$moment(this.oldTimeValue1).format('YYYY-MM-DD HH:mm:ss')
                this.isTipsPop = true
                this.TipsPopText = this.lang.ProcessParameterReport_HT_TimeCompare
            }else if(diffs == 0){
                this.timevalue1 = this.oldTimeValue1
                this.timevalue2 = this.oldTimeValue2
                this.value1 = this.$moment(this.oldTimeValue1).format('YYYY-MM-DD HH:mm:ss')
                this.isTipsPop = true
                this.TipsPopText = '开始时间不能等于结束时间'
               
            }else{
                    this.oldTimeValue1 = sTime
            }

      },
      entTime(){
          this.timevalue2 = this.value2.replace(/-/g, ".")
            var sTime = this.$moment(this.timevalue1).format('YYYY-MM-DD HH:mm:ss')
            var eTime = this.$moment(this.timevalue2).format('YYYY-MM-DD HH:mm:ss')
            console.log(sTime)
            console.log(eTime)
            var diffs = this.$moment(eTime).diff(this.$moment(sTime), 'seconds')
            console.log(diffs)
            if(diffs<0){
                this.timevalue2 = this.$moment(this.oldTimeValue2).format('YYYY-MM-DD HH:mm:ss')
                this.value2 = this.$moment(this.oldTimeValue2).format('YYYY-MM-DD HH:mm:ss')
                this.isTipsPop = true
                this.TipsPopText = this.lang.ProcessParameterReport_HT_TimeCompare
            }else if(diffs == 0){
                this.timevalue2 = this.oldTimeValue2
                this.value2 = this.$moment(this.oldTimeValue2).format('YYYY-MM-DD HH:mm:ss')
                this.isTipsPop = true
                this.TipsPopText = '开始时间不能等于结束时间'
               
            }else{
                this.oldTimeValue2 = eTime
            }

      },
       //查询
        changetime() {
            this.isPower(this.queryId).then((val) => { 
               if(val){
                   this.exportCodeText = this.codeText
                   this.loading = true
                   this.scrollShow = true
                   this.scrollNum = 1
                   this.numLength = 0
                   this.aa = 'true'
                   document.querySelector('.sometable').scrollTop = 0
                   this.WIDShow = true
                   if(this.codeText != ''){
                       this.QueryReportData('产品码')
                   }else{
                       this.QueryReportData()
                   }
               }else{
                  this.isTipsPop = true
               }
            })
        },
        //导出xlsx
        exportXlsxFun(){
            this.isExport = false
            var accurate
             //1是模糊 2是精准
            if(this.selectVale == this.lang.ProcessParameterReport_HT_FuzzyMatching){
                accurate = 1
            }else{
                accurate = 2
            }
             window.open(
                   `/api/ProcessParameterReport/Export?wid=${this.WID}&startTime=${this.timevalue1}&endTime=${this.timevalue2}&code=${this.exportCodeText}&accurate=${accurate}&argLanguage=${localStorage.getItem('currentLang')}`
                );
        },
        //导出图片
        exportPngFun(){
            this.loading = true
            html2canvas(document.getElementById('linebox')).then(canvas => {
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
                    this.loading = false
                } else {
                    const a = document.createElement('a')// 这里就按照chrome等新版浏览器来处理
                    a.href = this.imgmap
                    a.setAttribute('download', 'chart-download')
                    a.click()
                    this.loading = false
                }
                this.isExport = false
            });
        },
        //关闭弹窗
        exportClose(){
            this.isExport = false
        },
        //开启导出弹窗
        exportTable() {
            this.isPower(this.exportId).then((val) => { 
                if(val){
                    this.isExport = true
                  
                }else{
                    this.isTipsPop = true
                }
            })

        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
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
        // 基于准备好的dom，初始化echarts实例
        drawLine() {
            myChart = echarts.init(document.getElementById('myChart'));// 绘制图表
            myChart.clear()
            myChart.setOption({
                 title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [this.lang.CruxParameterConfigure_CruxParameterConfigureUserControl_DataGrid_Upper, this.proName, this.lang.CruxParameterConfigure_CruxParameterConfigureUserControl_DataGrid_Lower],
                    icon: 'line'
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: this.ProductIDArr,
                    axisLine: { show: true }, //轴线不显示
                },
                yAxis: {
                    type: 'value',
                    min: 'dataMin',
                    max: 'dataMax',
                },
                series: [
                    {
                        symbol: "none",
                        name: this.lang.CruxParameterConfigure_CruxParameterConfigureUserControl_DataGrid_Upper,
                        type: 'line',
                          animation:false ,
                        data: this.UpperArr,
                         itemStyle : { 
                            normal : { 
                                lineStyle:{ 
                                    color:'red', //改变折线颜色
                                    width:1,
                                } 
                            } 
                        },
                    },
                    {
                        symbol: "none",
                        name: this.proName,
                        type: 'line',
                        data: this.pidArr,
                          animation:false ,
                        color: 'green',
                          itemStyle : { 
                            normal : { 
                                lineStyle:{ 
                                    color:'green', //改变折线颜色
                                    width:1,
                                } 
                            } 
                        },
                    },
                       {
                           symbol: "none",
                        name: this.lang.ProcessParameterConfigure_ProcessParameterReportUserControl_Lower,
                        type: 'line',
                        data: this.LowerArr,
                        animation:false ,
                        itemStyle : { 
                            normal : { 
                                lineStyle:{ 
                                    color:'blue', //改变折线颜色
                                    width:1,
                                } 
                            } 
                        },
                    },
                   
                ]
            });
        },
    },
    //渲染后计算宽度
    mounted() {
        this.DomArr = []
        window.setTimeout(() => {
            $(document.querySelectorAll('.proName')[0]).append('<div class="proNameBorColor" style="position:absolute;left:0;top:0;width:100%;height:29px;border:1px solid blue;box-sizing:border-box;z-index:999"></div>')
            this.initWidth1()
        },300)
    },
};
</script>

<style lang="scss">
.tapwater{
    .fl .el-input--prefix .el-input__inner{
        padding-left:25px !important;
    }
    .table input{
        text-indent:4px;
    }
}
</style>

<style lang="scss" scoped>
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
.conter{
    width:100%;
}
.border1{
    border:1px solid blue;
}
.border2{
    border:1px solid #000;
}
.color2{
    color:red
}
.color1{
    color:#000;
}
.fl {
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
    height: 95%;
    padding: 20px;
    width: 100%;
    min-width:1280px;
    overflow: auto;
    background-color: #eeeeee;
    .linebox {
        height: 950px;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
        overflow: auto;
    }
    .table {
        height: 60px;
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
        height: 40px;
        width: 118px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }
    .query {
        background-color: #4270e4;
        margin-left: 10px;
    }
    .export {
        background-color: #ffffff;
        color: #4270e4;
        border: 2px solid #4270e4;
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
    padding:0 2%;
    width: calc(100% - 20px);
    position: relative;
    overflow: hidden;
    .someLeft{
         float: left;
         min-width:13%;
         height:470px;
         overflow: auto;
        .try {
            padding:5px 10px;
            color: #808080;
            text-align: left;
            line-height: 30px;
            margin-top:10px;
            width:85%;
            max-width:197px;
            margin-left:15%;
            cursor: pointer;
            border-radius:10px;
            border:1px solid #808080;
            position: relative;
        }
       
        .try::before{
            content: '';
            position: absolute;
            top: 10px;
            left: -20px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background:rgba(66, 112, 228, 1);
            display: none;
        }
    }
    .someLeft .try:active:before{
        display: block;
    }
    .someLeft .tryActive{
        color:#fff !important;
    }
    .sometable {
        float: left;
        width:86%;
        height: 100%;
        border: 1px solid #000;
        margin-left: 10px;
        overflow: auto;
        position: relative;
    }
    .manytable{
        height: 100%;
        width: 10000px;
    }
    table{
        height: 372px;
        float: left;
        td{
            border: 0.5px solid  #000;
            text-align: center;
        }
        th{
            text-align: center;
        }
    }
}
.txt{
    // width: 300px;
    max-width: 120px;
    text-indent: 1em;
    margin-left: 10px;
    height: 40px;
}
 .tbody5_th{
    border-bottom:none !important;
        border-top:none !important;
        border-left:none !important;
        border-right:none !important;
  }
  .tbody2Bt {
          border-right: none !important;
          border-bottom: none !important;
          font-weight: 400;
      }
    .tbody2Bt:first-of-type {
        border-left: none !important;
    }
    .tbody4Bt {
          border-right: none !important;
      }
      .tbody4Bt:nth-of-type(1) {
          border-left: none !important;
      }
      .reporData td {
          border-right: none !important;
          border-top: none !important;
          font-weight: 400;
      }
    .reporData td:nth-of-type(1) {
        border-left: none !important;
    }
    .proName22 {
          border-right: none !important;
          border-bottom: none !important;
      }
      .tbody4Bt2 {
          border-right: none !important;
      }
      .bodyTitle {
          border-bottom: none !important;
          border-top: none !important;
          border-right: none !important;
      }
      .tbody2_Bt5{
          border-bottom:none !important;
          border-right:none !important;
      }
      .tbody2_td{
          border-right:none !important;
          border-bottom:none !important;
      }
      .tbody2_td:last-of-type(){
          border-right:1px solid #000 !important;
      }
      .table2 .tbody4Bt:nth-of-type(1){
         border-left:1px solid #000 !important;
      }
      .proName{
          border-right:none !important;
          border-bottom:none !important;
          position: relative;
      }
      .table2_tbdoy2{
          border-right:none !important;
          border-top:none !important;
          border-bottom:none !important;
      }
      #myChart{
          transform-origin:0%;
          position:absolute;
          top:0px;
          bottom:0;
          left:0;
          margin:auto;
      }
</style>
