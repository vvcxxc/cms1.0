<!--
 * @Description: 这是月视图页面（组件）
 * @Date: 2020-11-19 09:15:40
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 14:29:57
-->
<template>
    <div class="MonthlyView">
        <div class="mon_head" ref="head">
            <div class="mon_yearText left" ref="head1" >{{newYYYY}} {{lang.HMI_HT_LineChartWindowViewModel_Year}} {{newDD}} {{lang.HMI_HT_LineChartWindowViewModel_Month}}</div>
            <div @click="beforFun()" ref="head2" class="left iconBox1">
                <i class="el-icon-arrow-left mon_icon1"></i>
            </div>
            <div @click="nextFun()" ref="head3" class="left iconBox">
                <i class="el-icon-arrow-right mon_icon"></i>
            </div>
            <div class="mon_text left mbz">{{lang.ScheduleManage_Team}}</div>
            <div class="mon_input left mbzt">
                <el-select @change="banzuFun()" @focus="getZoom()" v-model="banzu" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                    <el-option
                    v-for="item in teamArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
           
            <div class="mon_text left mbc">{{lang.ScheduleManage_Shift}}</div>
            <div class="mon_input left mbct">
                <el-select @change="banciFun()" @focus="getZoom()" v-model="banci" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                    <el-option
                    v-for="item in FrequencyArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="mon_middle" ref="middle" >
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
                    <div :style="it.type=='no'?'color:#BBB':'color:#333'" class="xinqi1_left left">{{it.value}}</div>
                    <div class="xinqi1_right left">
                            <div v-for="(ite,inde) in item.arr!=null?item.arr[ind]:''"  :key="inde" class="right_row">
                                <div v-if="(2>=inde)" 
                                :style="'background:'+ite.sColorHex" class="right_icon left">{{ite.value}}</div>
                                <div v-if="(2>=inde)"  class="right_text left">{{ite.name}}</div>
                            </div>
                            <div class="hoverSize" v-if="item.numArr!=null?Number(item.numArr[ind])>3?true:false:false">
                                还有{{item.numArr!=null?(Number(item.numArr[ind]) - 3):''}}项...
                            
                            <div class="tis" :style="'position:absolute;top:'+(index==4?'-168px':'-51px')">
                                 <div v-for="(ite,inde) in item.arr!=null?item.arr[ind]:''"  :key="inde" class="right_row">
                                    <div :style="'background:'+ite.sColorHex" class="right_icon left">{{ite.value}}</div>
                                    <div class="right_text left">{{ite.name}}</div>
                                </div>
                              </div>
                            </div>
                    </div>
                </div>
               
            </div>
        </div>
        <div class="mon_fool">
            <div class="explain left">{{lang.ScheduleManage_ShiftDescription}}</div>
            <div v-for="(item,index) in setData" :key="index" :style="'background:'+item.color" class="morn_text left">{{item.name}}</div>
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
            newYYYDD:null,//年月
            newYYYY:null,//年
            newDD:null,//月
            newTime:'',//当前选中的时间
            weekArr:null,//一个月的周数
            monthData:null,//月数据
            noeColor:null, //第一个班颜色
            twoColor:null, //第二个班颜色
            threeColor:null,//第三个班颜色
            FourColor:null,
            FiveColor:null,
            sixColor:null,
            FrequencyArr:null,//班次数据
            teamArr:null,//班组数据
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
        }
    },
    created(){
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
            this.$refs.head.style.height =  60 * this.zoomValue + 'px'
            this.$refs.head.style.lineHeight =  60 * this.zoomValue + 'px'
            this.$refs.middle.style.height = 86 * this.zoomValue + '%'
            this.$refs.middle.style.zoom = this.zoomValue
            this.$refs.head1.style.zoom = this.zoomValue
            this.$refs.head2.style.zoom = this.zoomValue
            this.$refs.head3.style.zoom = this.zoomValue
        })
        this.getLangData()
        var newTime = moment().format()
        this.initTime(newTime,this.banzu,this.banci)
        this.teamAxios()
    },
    methods:{
        getLangData () {
            this.banzu = this.lang.ScheduleManage_SelectAll
            this.banci = this.lang.ScheduleManage_SelectAll
        },
        getZoom() {
            var $this = this
            this.$nextTick(() => {
                let drops = [...document.querySelectorAll('.el-select-dropdown.el-popper')]
                drops.forEach(item => {  
                    // item.style.zoom = $this.zoomValue

                })
            })
        },
        //上个月
        beforFun(){
            var beforTime = moment(this.newTime).add(-1, 'M').format() //上个月
            this.initTime(beforTime,this.banzu,this.banci)
        },
        //下个月
        nextFun(){
            var nextTime = moment(this.newTime).add(1, 'M').format() //上个月
             this.initTime(nextTime,this.banzu,this.banci)
        },
        //班组选择
        banzuFun(){
           this.initTime(this.newTime,this.banzu,this.banci)
        },
        //班次选择
        banciFun(){
            this.initTime(this.newTime,this.banzu,this.banci)
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
                        value:this.lang.ScheduleManage_SelectAll,
                        label:this.lang.ScheduleManage_SelectAll,
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
        }
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
.iconBox{
    margin-right:  0 !important;
}
.mbct{
    position: absolute;
    right: 0;
}
.mbc{
    position: absolute;
    right: 200px;
}
.mbzt{
    position: absolute;
    right: 220px;
}
.mbz{
    position: absolute;
    right: 410px;
}
.MonthlyView{
    width: 98% !important;
}
@import "../../../assets/style/ScheduleMange/MonthlyView"
</style>