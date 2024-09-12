<!--
 * @Description: 这是月视图导出页面（组件）
 * @Date: 2020-11-19 09:15:40
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 14:16:49
  //该页面只有显示效果和一个操作导出，其他操作的代码没有用到
-->
<template>
    <div class="MonthlyView">
        <div class="head" style="height:40px;color:#fff;font-size:20px;line-height:40px;text-align:center;width:100%;background:#386DF0">
            {{lang.ScheduleManage_Preview_Month_View}}
             <div @click.stop="can()" class="headImg"></div>
        </div>
        <div style="overflow: hidden;height:93%;" id="pdfDom">
            <div class="mon_head">
                <div class="mon_yearText left">{{lang.ScheduleManage_Schedule}}（{{newDD}}{{lang.HMI_HT_LineChartWindowViewModel_Month}}）</div>
                <div style="display:none" @click="beforFun()" class="left iconBox1">
                    <i class="el-icon-arrow-left mon_icon1"></i>
                </div>
                <div  style="display:none" @click="nextFun()" class="left iconBox">
                    <i class="el-icon-arrow-right mon_icon"></i>
                </div>
                <!-- 该页面为pdf导出关闭筛选功能-->
                <div  style="display:none" class="mon_text left">{{lang.ScheduleManage_Team}}</div>
                <div  style="display:none" class="mon_input left">
                    <el-select @change="banzuFun()" v-model="banzu" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option
                        v-for="item in teamArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- 该页面为pdf导出关闭筛选功能-->
                <div  style="display:none" class="mon_text left">{{lang.ScheduleManage_Shift}}</div>
                <div  style="display:none" class="mon_input left">
                    <el-select @change="banciFun()" v-model="banci" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option
                        v-for="item in FrequencyArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="mon_middle">
                <div class="mon_xinqi">
                    <div class="kon left"></div>
                    <div class="xinqi1 left">{{lang.ScheduleManage_MondayLong}}</div>
                    <div class="xinqi1 left">{{lang.ScheduleManage_TuesdayLong}}</div>
                    <div class="xinqi1 left">{{lang.ScheduleManage_WednesdayLong}}</div>
                    <div class="xinqi1 left">{{lang.ScheduleManage_ThursdayLong}}</div>
                    <div class="xinqi1 left">{{lang.ScheduleManage_FridayLong}}</div>
                    <div class="xinqi1 left">{{lang.ScheduleManage_SaturdayLong}}</div>
                    <div class="xinqi1 left">{{lang.ScheduleManage_SundayLong}}</div>
                </div>
                <div class="mon_zhou" v-for="(item,index) in weekArr" :key="index">
                    <div class="kon left"><p>{{lang.DataGrid_Reaction_The}}</p><p>{{item.week}}</p><p>{{lang.HMI_HT_LineChartWindowViewModel_Week}}</p></div>
                    <div class="xinqi1 left" v-for ="(it,ind) in item.weekTime" :key="ind">
                        <div :style="it.type=='no'?'color:#BBB':'color:#333' " class="xinqi1_left left">{{it.value}}</div>
                        <div class="xinqi1_right left">
                                <div v-for="(ite,inde) in item.arr!=null?item.arr[ind]:''" :key="inde" class="right_row">
                                    <div v-if="(2>=inde)" :style="'background:'+ite.sColorHex" class="right_icon left">{{ite.value}}</div>
                                    <div v-if="(2>=inde)" class="right_text left">{{ite.name}}</div>
                                </div>
                                <div class="hoverSize" v-if="item.numArr!=null?Number(item.numArr[ind])>3?true:false:false">
                                 还有{{item.numArr!=null?(Number(item.numArr[ind]) - 3):''}}项...
                                </div>
                                
                        </div>
                    </div>
                </div>
            </div>
            <div class="exportBtn" v-if="exportShow" @click="exportFun()">{{lang.SCMSConsoleWebApiMySql_ExportPDF}}</div>
            <div class="mon_fool">
                <div class="explain left">{{lang.ScheduleManage_ShiftDescription}}</div>
                <div v-for="(item,index) in setData" :key="index" :style="'background:'+item.color" class="morn_text left">{{item.name}}</div>
            </div>

        </div>
    </div>
</template>
<script>
import moment from 'moment'//导入文件
export default {
    props:['setData'],
    data(){
        return{
            banzu:'全选', //班组选择项
            banci:'全选',//班次选择项
            num:[1,2,3,4,5],
            newYYYDD:null,//年月
            newYYYY:null,//年
            newDD:null,//月
            newTime:'',//当前选中的时间
            weekArr:null,//一个月的周数
            monthData:null,//月数据
            FrequencyArr:null,//班次数据
            teamArr:null,//班组数据
            exportShow:true,//导出按钮
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    methods:{
        getLangData() {
            this.banzu = this.lang.ScheduleManage_SelectAll
            this.banci = this.lang.ScheduleManage_SelectAll
        },
        //导出pdf
        exportFun(){
             this.exportShow = false
             setTimeout(()=>{
                 this.getPdf('pdfDom', this.lang.ScheduleManage_Month_View)
                 this.$parent.Pshow(this.lang.AlarmRecord_HT_AlarmPointManageUC_ExportSuccess,'1')
             },100)
        },
        //默认展示全部数据
        initPdfTime(data){
            this.initTime(data, this.lang.ScheduleManage_SelectAll, this.lang.ScheduleManage_SelectAll)
        },
        //初始化月视图数据 data=>时间，text=>班组,text=>班次
        initTime(data,text,text1){
            this.newYYYY = moment(data).format('YYYY')
            this.newDD = moment(data).format('MM')
            this.newYYYDD = moment(data).format('YYYY-MM')
            var newtime = this.newYYYDD + '-01'
            this.newTime =moment(newtime).format()  //当前月
            this.weekArr = []
            var nextYear = moment(newtime).add(-1, 'y').format("YYYY")  //上一年
            for(let i=0;i<5;i++){
                var nextWeek = moment(newtime).add(i, 'w').format("WW") //下一周
                var nextTime = moment(newtime).add(i, 'w').format() //下一周的日期
                var endyyyy = moment(nextYear).endOf('year').format("YYYY-MM-DD")//上一年的最后一天
                var endww =  moment(endyyyy).format("WW")                      //上一年共多少周
                var weekEndTime
                if(endww == nextWeek && this.newDD=='01'){  //如果是上一年的最后一周，年改为上一年（跨年一月份会遇到）
                    weekEndTime =moment().day("Monday").year(nextYear).week(nextWeek).format("YYYY/MM/DD");  //周数结束时间
                }else{
                    weekEndTime =moment().day("Monday").year(this.newYYYY).week(nextWeek).format("YYYY/MM/DD");  //周数结束时间
                }
                var weekOfday = moment(weekEndTime).format('E');  //判断是周的第几天
                weekEndTime  = moment(weekEndTime).add(weekOfday - 7,'days').format("YYYY/MM/DD")
                var weekStartTime =  weekStartTime = moment(weekEndTime).add(-6,'days').format("YYYY/MM/DD")
 
                var weekTimeDay2 = []
                 for(let i=6;i>=0;i--){
                    var item = moment(weekEndTime).subtract(i,'days').format("DD")
                    var mon = moment(weekEndTime).subtract(i,'days').format("MM")
                    var value2 = {                            //月的每一日
                        type:mon == this.newDD ? 'yes':'no',
                        value:item,
                    }
                    weekTimeDay2.push(value2)
                }
                var value = {                     //每个周的开始、结束时间 渲染月视图时间
                    week:nextWeek,
                    weekStart:weekStartTime,
                    weekEnd:weekEndTime,
                    weekTime: weekTimeDay2,
                }
                this.weekArr.push(value)
            }
            this.monthData = []
             for(let j=0;j<this.weekArr.length;j++){
                this.weekAxios(this.weekArr[j].weekStart,this.weekArr[j].weekEnd).then((val)=>{
                    this.FrequencyArr = []
                    var value ={
                        value: this.lang.ScheduleManage_SelectAll,
                        label: this.lang.ScheduleManage_SelectAll,
                    }
                    this.FrequencyArr.push(value)
                    for(let f=0;f<val.scmsShiftsSource.length;f++){          //初始化班次数据的颜色

                        if(val.scmsShiftsSource[f].sName != this.lang.ScheduleManage_RestTxt){       //初始化班次数据
                            var value1 = {
                                value:val.scmsShiftsSource[f].sName,
                                label:val.scmsShiftsSource[f].sName,
                            }
                            this.FrequencyArr.push(value1)
                        }
                    }
                    var weekdata = []
                    weekdata = val.scheduleShowModels
                    if(text != this.lang.ScheduleManage_SelectAll){
                        if(weekdata.length){
                            for(let i=0;i<weekdata.length;i++){
                                if(weekdata[i].ClassName != text){
                                    weekdata.splice(i,1)
                                    i --
                                }
                            }
                        }
                    }
                    //整理周组数据格式
                    for(let k=0;k<weekdata.length;k++){  
                        var data = []
                        for(let it in weekdata[k]){
                            if(it == 'ClassId'){
                                weekdata[k].ClassId = weekdata[k][it]
                            }else if(it == 'ClassName'){
                                weekdata[k].ClassName = weekdata[k][it]
                            }else{
                                if(it == 'MonShift'){                //把周一至周五整合到一个数组
                                    weekdata[k][it].type = 'MonShift' 
                                }else if(it == 'WedShift'){
                                    weekdata[k][it].type = 'WedShift'
                                }else if(it == 'TuesShift'){
                                    weekdata[k][it].type = 'TuesShift'
                                }else if(it == 'FriShift'){
                                    weekdata[k][it].type = 'FriShift'
                                }else if(it == 'SatShift'){
                                    weekdata[k][it].type = 'SatShift'
                                }else if(it == 'SunShift'){
                                    weekdata[k][it].type = 'SunShift'
                                }else if(it == 'ThurShift'){
                                    weekdata[k][it].type = 'ThurShift'
                                }
                                if(weekdata[k][it].sColorHex.length >7){
                                    weekdata[k][it].sColorHex = '#' + weekdata[k][it].sColorHex.slice(3) + weekdata[k][it].sColorHex.slice(1,3)
                                }
                                data.push(weekdata[k][it])
                            }
                        }
                        var weekText = []
                       
                        for(let j=0;j<data.length;j++){
                            var value4 = {
                                sBaseId:data[j].sBaseId,
                                sColorHex:data[j].sColorHex,
                                sName:data[j].sName,
                            }
                            weekText.push(value4)
                        }
                        weekdata[k].arr = weekText
                    }
                    
                    //遍历一周组的数据
                    if(weekdata.length){
                         var weektextArr = []
                        for(let j=0;j<7;j++){
                            var weekvalue = []
                            var show = false
                            for(let i=0;i<weekdata.length;i++){
                                if(weekdata[i].arr[j].sName != this.lang.ScheduleManage_RestTxt){ 
                                    show = true
                                    var value3 = {
                                        name:weekdata[i].ClassName,
                                        value:weekdata[i].arr[j].sName,
                                        sColorHex:weekdata[i].arr[j].sColorHex,
                                        sBaseId:weekdata[i].arr[j].sBaseId,
                                    }
                                    weekvalue.push(value3)
                                }
                            }
                            if(text1 != this.lang.ScheduleManage_SelectAll){
                                if(weekvalue.length){
                                    for(let i=0;i<weekvalue.length;i++){
                                        if(weekvalue[i].value != text1){
                                            weekvalue.splice(i,1)
                                            i --
                                        }
                                    }
                                }
                            }
                          
                            if(show){
                                weektextArr.push(weekvalue)
                            }else{
                                weektextArr.push([])
                            }
                        }
                        this.weekArr[j].arr = weektextArr
                         var numArr = []
                         for(let i=0;i<this.weekArr[j].arr.length;i++){
                             numArr.push(this.weekArr[j].arr[i].length)
                         }
                         this.weekArr[j].numArr = numArr
                    }else{
                        this.weekArr[j].arr = [[],[],[],[],[],[],[]]
                        var numArr2 = []
                        for(let i=0;i<this.weekArr[j].arr.length;i++){
                              numArr2.push(this.weekArr[j].arr[i].length)
                         }
                         this.weekArr[j].numArr = numArr2
                    }
                })
            }
        },
        //周的班次请求
        weekAxios(weekStart,weekEnd){
            return new Promise((resolve, reject) => {
                var firstTime = weekStart
                var lastTime = weekEnd
                this.$axios({
                    method:"get",
                    url:`/api/class/GetClass?firstTime=${firstTime}&lastTime=${lastTime}`,
                    firstTime:firstTime,
                    lastTime:lastTime
                }).then((res)=>{
                    resolve(res.data.data)
                }).catch(function(err){
                    console.log('err',err)
                })
            })
        },
        //班组数据
        teamAxios(){
             this.$axios({
                  method:"get",
                  url:`/api/class/query?key=`,
                }).then((res)=>{
                    this.teamArr = []
                    var value1 = {
                        value: this.lang.ScheduleManage_SelectAll,
                        label: this.lang.ScheduleManage_SelectAll,
                    }
                    this.teamArr.push(value1)
                    for(let i=0;i<res.data.data.length;i++){
                        var value = {
                            value:res.data.data[i].sName,
                            label:res.data.data[i].sName,
                        }
                        this.teamArr.push(value)
                    }
                }).catch((err)=>{
                    console.log('err',err)
                })
        },
         //关闭弹窗
        can(){
            this.$parent.cancelFun()
        }
        
    },
    created () {
        this.getLangData()
    }
    
}
</script>
<style lang="scss">
.MonthlyView{
    .el-input--suffix .el-input__inner{
        width:150px !important;
        height: 30px !important;
    }
}
</style>
<style lang="scss" scoped>
@import "../../../assets/style/ScheduleMange/MonthlyView";
.MonthlyView{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 15;
    width: 1710px;
    height: 860px;
    box-shadow:-7px 7px 50px 0px rgba(51,51,51,0.5);
    .mon_yearText{
        margin-left:46%;
        color:#000 !important;
        font-size: 20px !important;
    }
    .mon_middle{
        height: 81% !important;
    }
    .headImg{
        position: absolute;
        right: 12px;
        top: 7px;
        width:24px;
        height: 24px;
        background: url('../../../assets/images/no.png');
        background-size:cover ;
        cursor: pointer;
    }
    .exportBtn{
        position:absolute;
        bottom: 12px;
        right: 40px;
        width:100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        user-select: none;
        cursor: pointer;
        background: #386DF0;
        color:#fff;
        border-radius: 4px;
    }
    .hoverSize{
        position:absolute;
        left:0;
        bottom:-6px;
        font-size:12px;
        color:#777;
        cursor:pointer;
        user-select:none;
    }
}

</style>