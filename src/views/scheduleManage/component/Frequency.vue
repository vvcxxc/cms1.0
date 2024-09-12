<!--
 * @Description: 这是周班次页面（组件）
 * @Date: 2020-11-19 09:15:19
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-02 09:22:11
-->
<template>
    <div class="Frequency_box">
        <div class="frequency_head" ref="head" >
            <div @click="leftDownFun()" class="head_left left">
                <i class="el-icon-arrow-left head_icon"></i>
            </div>
            <div class="head_week left" @click="weekClick($event,item)" v-for="(item,index) in timeArr" :key="index">
                <div :class="index==2?'weekActive':''" class="week_text">{{item.week}}{{lang.HMI_HT_LineChartWindowViewModel_Week}}</div>
                <div :class="index==2?'weekActive':''" class="week_time">{{item.startTime}}-{{item.endTime}}</div>
            </div>
            <div @click="rightDownFun()" class="head_right left">
                <i class="el-icon-arrow-right head_icon"></i>
            </div>
        </div>
        <div class="frequency_middle">
            <div class="middle_head">
                <div class="middle_head_kon left"></div>
                <div class="middle_head_text left">
                    <div class="head_text1">
                        <div class="head_textValue left" v-for="(ite,ind) in weekTimeDay" :key="ind">{{ite}}</div>
                    </div>
                    <div class="head_text2">
                        <div class="head_textValue left">{{lang.ScheduleManage_MondayLong}}</div>
                        <div class="head_textValue left">{{lang.ScheduleManage_TuesdayLong}}</div>
                        <div class="head_textValue left">{{lang.ScheduleManage_WednesdayLong}}</div>
                        <div class="head_textValue left">{{lang.ScheduleManage_ThursdayLong}}</div>
                        <div class="head_textValue left">{{lang.ScheduleManage_FridayLong}}</div>
                        <div class="head_textValue left">{{lang.ScheduleManage_SaturdayLong}}</div>
                        <div class="head_textValue left">{{lang.ScheduleManage_SundayLong}}</div>
                    </div>
                </div>
            </div>
            <div class="middle_conter">
                <div class="middle_conterBox">
                    <div class="conterBox_left left">
                        <div v-for="(i,d) in weekData" :key="d" class="left_row">
                            <div class="left_text">{{i.ClassName}}</div>
                        </div>
                    </div>
                    <div class="conterBox_right left">
                        <div class="right_row" v-for="(it,ind) in weekData" :key="ind">
                            <div class="right_input left" @click="rightRow($event,int,it,ind)" v-for="(int,inde) in it.arr" :key="inde">
                                {{inde}}
                                    <div :style="'background:'+int.sColorHex" class="right_input_line"></div>
                                    <div :style="'background:'+int.sColorHex" class="right_input_bg">{{it.sBaseId}}</div>
                                    <div :style="'color:'+ weekColor+';font-size:'+weekFontSize+'px'" class="right_input_value">{{int.sName}}</div>
                                    <div :style="'color:'+weekColor + ';font-size:'+weekFontSize+'px'" name="false" class="right_input_xia">
                                        <div :style="'borderColor:'+int.sColorHex"
                                         @click.stop="xiaBox($event,item,int,ind,it)" v-for="(item,index) in weekText" :key="index" class="xia_box">{{item.sName}}</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'//导入文件
export default {
    data(){
        return{
            weekData:[], //当前周的数据
            weekText:[], //当前周的下拉选择数据
            weekColor:null, //当前周的字体颜色
            weekFontSize:null,//当前周的字体大小
            restColor:null, //休息颜色
            replaceData:{},//替换班组值
            timeArr:[],//当前五周
            weekTime:null,//当前选中周的时间(上俩周或下周的点)
            newWeekTime:null,//当前点击选中的周
            weekTimeDay:[],//当前选中周的天arr
            weekTimeDay2:[],//当前选中周的天arr
            operateValue:false,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0
        }
    },
    created(){
        this.$nextTick(() => {
            this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
            this.$refs.head.style.zoom = this.zoomValue
        })
        //初始化当前五周
        var newTime = moment().format()
        this.FiveWeek(newTime)
    },
    methods:{
        //重新请求
        againInit(){
            this.FiveWeek(this.weekTime)
        },
        //父组件引用周需知道当前选中的是第几周
        newTimeFun(){
            return this.newWeekTime
        },
        //将字体颜色大小，班次颜色赋予弹窗
        colorSize(data){
            this.$parent.colorSize(data)
        },
        //点击icon 上一周
        leftDownFun(){
            var beforWeek = moment(this.weekTime).add(-2, 'w').format()
            this.FiveWeek(beforWeek)
        },
        //点击icon 下一周
        rightDownFun(){
             var nextWeek = moment(this.weekTime).add(2, 'w').format() //下下一周
             this.FiveWeek(nextWeek)
        },
        //请求班组  判断该班组是否存在
        teamAxions(){
             return new Promise((resolve, reject) => {
                 var teamArr = []
                 this.$axios({
                 method:"get",
                 url:`/api/class/query?key=`,
                 }).then((res)=>{
                     for(let i=0;i<res.data.data.length;i++){
                         teamArr.push(res.data.data[i].sId)
                     }
                     resolve(teamArr)
                 })

             })
        },
        //计算第几周第几年
        weekFun(dataTime,num){
            var beforWeek2 = moment(dataTime).add(num, 'w').format("WW") //周
            var beforWeek2Year = moment(dataTime).add(num, 'w').format("YYYY") //年
            var beforWeek2MM =  moment(dataTime).add(num, 'w').format("MM") //月
            var value = {}
            if(beforWeek2MM == '01'){            //跨年
                let nextYear =  moment(beforWeek2Year).add(-1, 'y').format("YYYY")
                let endyyyy = moment(nextYear).endOf('year').format("YYYY-MM-DD")
                let endww =  moment(endyyyy).format("WW")
                if(endww == beforWeek2){
                    return value = {
                        year:nextYear,
                        week:beforWeek2
                    }
                }else{
                    return value = {
                        year:beforWeek2Year,
                        week:beforWeek2
                    }
                }
            }else{
                return value = {
                    year:beforWeek2Year,
                    week:beforWeek2
                }
            }
        },
        //初始化当前5周并请求数据
        FiveWeek(dataTime){
            this.removeDomFun('color')
            this.weekTime = dataTime
            this.timeArr = []
            var value = {}
            value = this.weekFun(dataTime,-2)
            this.timeArr.push(value)
            value = this.weekFun(dataTime,-1)
            this.timeArr.push(value)
            value = this.weekFun(dataTime,0)
            this.timeArr.push(value)
            value = this.weekFun(dataTime,1)
            this.timeArr.push(value)
             value = this.weekFun(dataTime,2)
            this.timeArr.push(value)
            for(let i=0;i<this.timeArr.length;i++){
                var weekEndTime =moment().day("Monday").year(this.timeArr[i].year).week(this.timeArr[i].week).format("YYYY/MM/DD");  //周数结束时间
                var weekOfday = moment(weekEndTime).format('E');  //判断是周的第几天
                weekEndTime  = moment(weekEndTime).add(7-weekOfday,'days').format("YYYY/MM/DD") 
                var weekStartTime = moment(weekEndTime).subtract(6,'days').format("YYYY/MM/DD")            //周数开始时间
                this.timeArr[i].startTime = weekStartTime
                this.timeArr[i].endTime = weekEndTime
            }
            this.weekInit(this.timeArr[2].startTime,this.timeArr[2].endTime)
        },
        //初始化当前班组数据
        weekInit(firstTime,lastTime){
            this.newWeekTime = {
                lastTime:lastTime,
                firstTime:firstTime
            }
            this.operateValue
            var newTimeWeek = moment().format("ww")
            var newTimeYYYY = moment().format("YYYY")
            var clickTimeWeek = moment(lastTime).format("ww")
            var clickTimeYYYY = moment(lastTime).format("YYYY")
            if(Number(clickTimeYYYY) > Number(newTimeYYYY)){
                this.operateValue = false
            }else if(Number(clickTimeYYYY) == Number(newTimeYYYY)){
                if(Number(clickTimeWeek) >= Number(newTimeWeek)){
                     this.operateValue = false
                }else{
                    this.operateValue = true
                }
            }else if(Number(clickTimeYYYY) < Number(newTimeYYYY)){
                this.operateValue = true
            }
            this.weekTimeDay = []
            this.weekTimeDay2 = []
            for(let i=6;i>=0;i--){
                var time = moment(lastTime).subtract(i,'days').format("MM/DD")
                var item = moment(lastTime).subtract(i,'days').format("YYYY-MM-DD")
                this.weekTimeDay.push(time)
                this.weekTimeDay2.push(item)
            }
            var showCss
            if(Number(clickTimeYYYY) == Number(newTimeYYYY) && Number(clickTimeYYYY) == Number(newTimeYYYY)){
                showCss = true
            }else{
                showCss = false
            }
          
            this.$axios({
                method:"get",
                url:`/api/class/GetClass?firstTime=${firstTime}&lastTime=${lastTime}`,
                firstTime:firstTime,
                lastTime:lastTime
            }).then((res)=>{
                this.teamAxions().then(val=>{
                    console.log('fontSize',res.data.data)
                    //初始化数据，字体颜色大小
                    this.weekData = res.data.data.scheduleShowModels
                    this.weekText = res.data.data.scmsShiftsSource
                    for(let f=0;f<this.weekText.length;f++){
                        if(this.weekText[f].sColorHex.length >7){
                            this.weekText[f].sColorHex =  '#' + this.weekText[f].sColorHex.slice(3) + this.weekText[f].sColorHex.slice(1,3)
                        }else{
                            this.weekText[f].sColorHex = this.weekText[f].sColorHex
                        }
                        
                    }
                    if(res.data.data.fontColor.length >7){
                        this.weekColor = '#' + res.data.data.fontColor.slice(3) + res.data.data.fontColor.slice(1,3)
                    }else{
                        this.weekColor =  res.data.data.fontColor
                    }
                    this.weekFontSize = res.data.data.fontSize
                    var sArr = []
                    for(let j=0;j<this.weekText.length;j++){          //初始化下拉数据的颜色
                        var vlaue4 = {
                            id:this.weekText[j].sBaseId,
                            name:this.weekText[j].sName,
                            color:this.weekText[j].sColorHex,
                            textColor: this.weekColor,
                            fontSize:this.weekFontSize
                        }
                        if(this.weekText[j].sName != this.lang.ScheduleManage_RestTxt){
                            sArr.push(vlaue4)
                        }
                    }
                    this.colorSize(sArr)
                    //整理周组数据格式
                    for(let i=0;i<this.weekData.length;i++){  
                        var index = val.indexOf(this.weekData[i].ClassId)
                        var data = []
                        for(let it in this.weekData[i]){
                            if(it == 'ClassId'){
                                this.weekData[i].ClassId = this.weekData[i][it]
                            }else if(it == 'ClassName'){
                                this.weekData[i].ClassName = this.weekData[i][it]
                            }else{
                                if(it == 'MonShift'){
                                    this.weekData[i][it].type = 'MonShift' 
                                }else if(it == 'WedShift'){
                                    this.weekData[i][it].type = 'WedShift'
                                }else if(it == 'TuesShift'){
                                    this.weekData[i][it].type = 'TuesShift'
                                }else if(it == 'FriShift'){
                                    this.weekData[i][it].type = 'FriShift'
                                }else if(it == 'SatShift'){
                                    this.weekData[i][it].type = 'SatShift'
                                }else if(it == 'SunShift'){
                                    this.weekData[i][it].type = 'SunShift'
                                }else if(it == 'ThurShift'){
                                    this.weekData[i][it].type = 'ThurShift'
                                }
                                if(this.weekData[i][it].sColorHex.length >7){
                                    this.weekData[i][it].sColorHex = '#' + this.weekData[i][it].sColorHex.slice(3) + this.weekData[i][it].sColorHex.slice(1,3)
                                }else{
                                    this.weekData[i][it].sColorHex = this.weekData[i][it].sColorHex
                                }
                                data.push(this.weekData[i][it])
                            }
                        }
                        if(showCss){
                            if(index == -1){
                                this.weekData[i].type = false
                            }else{
                                this.weekData[i].type = true
                            }
                        }else{
                            this.weekData[i].type = true
                        }
                        this.weekData[i].arr = data
                    }
                })
               
            
            }).catch(function(err){
                console.log('err',err)
            })

        },
        //头部周点击
        weekClick(e,item){
            this.removeDomFun('noColor')
            //选择计划高亮        --样式
            var className = e.path[0].getAttribute('class')
            if(className == 'head_week left'){
                e.path[0].querySelector('.week_text').classList.add('weekActive')
                e.path[0].querySelector('.week_time').classList.add('weekActive')
            }else if(className == 'week_text'){
                e.path[0].classList.add('weekActive')
                e.path[0].parentNode.querySelector('.week_time').classList.add('weekActive')
            }else{
                e.path[0].classList.add('weekActive')
                e.path[0].parentNode.querySelector('.week_text').classList.add('weekActive')
            }
            this.weekInit(item.startTime,item.endTime)

        },
        //点击星期块
        rightRow(e,item,it,ind){


            if(this.operateValue){   //大于当前年或当前周的不执行(之前)
               this.$parent.Pshow(this.lang.SCMSConsoleWebApiMySql_PastShiftsCannotEdited,'1')
                return
            }
            if(!it.type){
                this.$parent.Pshow(this.lang.SCMSConsoleWebApiMySql_DeleteTeamCannotEdited,'1')
                return
            }
            //默认去除下拉框
            var allDom = document.querySelectorAll('.right_input_xia')
            var name = e.path[1].querySelector('.right_input_xia').getAttribute('name')
            if(allDom){
                for(let i=0;i<allDom.length;i++){

                    allDom[i].style.top='0px'
                    allDom[i].style.display='none'
                    allDom[i].style.opacity='0'

                    allDom[i].classList.remove("right_input_xia2")
                    allDom[i].setAttribute('name','false')
                }
            }

            //判断当前周的天是否大于当前天
            var newTimeWeek = moment().format("ww")
            var newTimeYear = moment().format("YYYY")
            var acitveTimeWeek = moment(this.newWeekTime.lastTime).format("ww")
            var acitveTimeYear = moment(this.newWeekTime.lastTime).format("YYYY")
            if(Number(newTimeYear) == Number(acitveTimeYear)){
                if(Number(newTimeWeek) == Number(acitveTimeWeek)){
                    var MM
                    var DD
                    if(item.type == 'MonShift'){
                        MM = this.weekTimeDay[0].slice(0,2)
                        DD = this.weekTimeDay[0].slice(3,5)
                    }else if(item.type == 'TuesShift'){
                        MM = this.weekTimeDay[1].slice(0,2)
                        DD = this.weekTimeDay[1].slice(3,5)
                    }else if(item.type == 'WedShift'){
                        MM = this.weekTimeDay[2].slice(0,2)
                        DD = this.weekTimeDay[2].slice(3,5)
                    }else if(item.type == 'ThurShift'){
                        MM = this.weekTimeDay[3].slice(0,2)
                        DD = this.weekTimeDay[3].slice(3,5)
                    }else if(item.type == 'FriShift'){
                        MM = this.weekTimeDay[4].slice(0,2)
                        DD = this.weekTimeDay[4].slice(3,5)
                    }else if(item.type == 'SatShift'){
                        MM = this.weekTimeDay[5].slice(0,2)
                        DD = this.weekTimeDay[5].slice(3,5)
                    }else if(item.type == 'SunShift'){
                        MM = this.weekTimeDay[6].slice(0,2)
                        DD = this.weekTimeDay[6].slice(3,5)
                    }
                    var newMM = moment().format("MM")
                    var newDD = moment().format("DD")
                    if(Number(MM) < Number(newMM)){
                        this.$parent.Pshow(this.lang.SCMSConsoleWebApiMySql_PastShiftsCannotEdited,'1')
                        return
                    }else if(Number(DD) < Number(newDD)){
                        this.$parent.Pshow(this.lang.SCMSConsoleWebApiMySql_PastShiftsCannotEdited,'1')
                        return
                    }
                }
            }
            //激活下拉框
             var conterBoxDom = $('.conterBox_right').height()
             if(conterBoxDom < 608){
                 conterBoxDom = 608
             }
             var thisDom = $(e.path[0]).height()
             
             e.path[1].querySelector('.right_input_xia').setAttribute('name',name)
             var xiaDom =  $(e.path[1].querySelector('.right_input_xia'))
                if(name == 'false'){

                    e.path[1].querySelector('.right_input_xia').classList.add("right_input_xia2")
                    e.path[1].querySelector('.right_input_xia').setAttribute('name','true')
                    xiaDom.css('display','block')
                     
                    this.$parent.FrequencyMask(true)
                    let leng = ((ind+1) * thisDom) + (it.arr.length * 40)
                    if(conterBoxDom < leng){
                        xiaDom.animate({top:'0px',opacity:'0',zIndex:'9'},'fast');
                        xiaDom.animate({top:`-${it.arr.length * 40}px`,opacity:'1',zIndex:'12'},'fast');
                    }else{
                        xiaDom.animate({top:'0px',opacity:'0',zIndex:'9'},'fast');
                        xiaDom.animate({top:`${thisDom}px`,opacity:'1',zIndex:'12'},'fast');
                    }
                }else{
                    xiaDom.css('display','block')
                    e.path[1].querySelector('.right_input_xia').classList.remove("right_input_xia2")
                    e.path[1].querySelector('.right_input_xia').setAttribute('name','false')
                    
                    e.path[1].querySelector('.right_input_xia').style.top='0px'
                    e.path[1].querySelector('.right_input_xia').style.display='none'
                    e.path[1].querySelector('.right_input_xia').style.opacity='0'

                    this.$parent.FrequencyMask(false)
                    let leng = ((ind+1) * thisDom) + (it.arr.length * 40)
                    if(conterBoxDom < leng){
                        xiaDom.animate({top:`0px`,opacity:'0',zIndex:'9'},'fast');
                        xiaDom.animate({top:`-${it.arr.length * 40}px`,zIndex:'12'},'fast');
                    }else{
                        xiaDom.animate({top:'0px',opacity:'0',zIndex:'9'},'fast');
                        xiaDom.animate({top:`${thisDom}px`,opacity:'1',zIndex:'12'},'fast');
                    }

                   
                }

        },
        //清除下拉框
        rightInputDom(){
            var allDom = document.querySelectorAll('.right_input_xia')
            if(allDom){
                for(let i=0;i<allDom.length;i++){
                    allDom[i].classList.remove("right_input_xia2")
                    allDom[i].setAttribute('name','false')

                    allDom[i].style.top='0px'
                    allDom[i].style.display='none'
                    allDom[i].style.opacity='0'
                }
            }
        }, 
        //默认清除高亮 
        removeDomFun(text){
            var textdom = document.querySelectorAll('.week_text')
            var timedom = document.querySelectorAll('.week_time')
            for(let i=0;i<textdom.length;i++){
                if(text == 'color'){
                    if(i != 2){
                        textdom[i].classList.remove('weekActive')
                        timedom[i].classList.remove('weekActive')
                    }else{
                        textdom[i].classList.add('weekActive')
                        timedom[i].classList.add('weekActive')
                    }
                }else{
                    textdom[i].classList.remove('weekActive')
                    timedom[i].classList.remove('weekActive')
                }
            }
        },
        //选择下拉框
        xiaBox(e,item,ite,ind,it){
            e.path[2].querySelector('.right_input_xia').classList.remove("right_input_xia2")
            e.path[2].querySelector('.right_input_xia').setAttribute('name','false')

            e.path[2].querySelector('.right_input_xia').style.top='0px'
            e.path[2].querySelector('.right_input_xia').style.display='none'
            e.path[2].querySelector('.right_input_xia').style.opacity='0'

            this.$parent.FrequencyMask(false)
            //判断是否已经存在
            var MonShift = []
            var TuesShift = []
            var WedShift = []
            var ThurShift = []
            var FriShift = []
            var SatShift = []
            var SunShift = []
            for(let i=0;i<this.weekData.length;i++){
                var data = this.weekData[i].arr
                for(let j=0;j<data.length;j++){
                    if(data[j].type == 'MonShift'){
                        MonShift.push(data[j].sName)
                    }else if(data[j].type == 'TuesShift'){
                        TuesShift.push(data[j].sName)
                    }else if(data[j].type == 'WedShift'){
                        WedShift.push(data[j].sName)
                    }else if(data[j].type == 'ThurShift'){
                        ThurShift.push(data[j].sName)
                    }else if(data[j].type == 'FriShift'){
                        FriShift.push(data[j].sName)
                    }else if(data[j].type == 'SatShift'){
                        SatShift.push(data[j].sName)
                    }else if(data[j].type == 'SunShift'){
                        SunShift.push(data[j].sName)
                    }
                }
            }
                var endData
                if(ite.type == 'MonShift'){
                    index = MonShift.indexOf(item.sName)
                    endData = this.weekTimeDay2[0]
                }else if(ite.type == 'TuesShift'){
                    index = TuesShift.indexOf(item.sName)
                    endData = this.weekTimeDay2[1]
                }else if(ite.type == 'WedShift'){
                     index = WedShift.indexOf(item.sName)
                     endData = this.weekTimeDay2[2]
                }else if(ite.type == 'ThurShift'){
                    index = ThurShift.indexOf(item.sName)
                    endData = this.weekTimeDay2[3]
                }else if(ite.type == 'FriShift'){
                    index = FriShift.indexOf(item.sName)
                    endData = this.weekTimeDay2[4]
                }else if(ite.type == 'SatShift'){
                    index = SatShift.indexOf(item.sName)
                    endData = this.weekTimeDay2[5]
                }else if(ite.type == 'SunShift'){
                    index = SunShift.indexOf(item.sName)
                    endData = this.weekTimeDay2[6]
                }
            //替换数据
            if(item.sName != this.lang.ScheduleManage_RestTxt){
                var index
                if(index == -1){
                    ite.sColorHex = item.sColorHex
                    ite.sName = item.sName
                     let value = {
                        ClassId:it.ClassId,
                        editDate:endData,
                        ShiftId:item.sBaseId,
                    }
                    this.replaceAxios(value)
                }else{
                    //index代表原有的坐标，ind代表要改的坐标 type代表是星期几
                    this.replaceData.index = index
                    this.replaceData.ind = ind
                    this.replaceData.type = ite.type
                    this.replaceData.sBaseId = item.sBaseId
                    this.replaceData.sColorHex = item.sColorHex
                    this.replaceData.sName = item.sName
                    this.replaceData.ClassId = it.ClassId
                    this.replaceData.ClassName = it.ClassName
                    this.replaceData.endTime = endData
                    this.$parent.Pshow(this.lang.ScheduleManage_Shift_Existed,"2",'班次替换')
                }
            }else{
                ite.sColorHex = item.sColorHex
                ite.sName = item.sName
                let value = {
                    ClassId:it.ClassId,
                    editDate:endData,
                    ShiftId:item.sBaseId,
                }
                 this.replaceAxios(value)
            }
        },
        //相同班次替换方法
        replaceFun(){
             for(let i=0;i<this.weekData.length;i++){
                if(i ==  this.replaceData.index){  //把原有的替换为休息
                    var ClassId
                    var type
                    for(let j=0;j<this.weekData[i].arr.length;j++){
                        if(this.weekData[i].arr[j].type ==  this.replaceData.type){
                            this.weekData[i].arr[j].sBaseId = '0'
                            this.weekData[i].arr[j].sColorHex = '#000'
                            this.weekData[i].arr[j].sName = this.lang.ScheduleManage_RestTxt
                            ClassId = this.weekData[i].ClassId
                            type = this.weekData[i].arr[j].type
                        }
                    } 
                    let value = {
                        ClassId:ClassId,
                        editDate:this.replaceData.endTime,
                        ShiftId:'0',
                    }
                    this.replaceAxios(value)
                }
                if(i ==  this.replaceData.ind){  //修改项
                    for(let j=0;j<this.weekData[i].arr.length;j++){
                        if(this.weekData[i].arr[j].type == this.replaceData.type){
                            this.weekData[i].arr[j].sBaseId =  this.replaceData.sBaseId
                            this.weekData[i].arr[j].sColorHex =  this.replaceData.sColorHex
                            this.weekData[i].arr[j].sName = this.replaceData.sName
                        }
                    }
                    let value = {
                        ClassId:this.replaceData.ClassId,
                        editDate:this.replaceData.endTime,
                        ShiftId:this.replaceData.sBaseId,
                    }
                    this.replaceAxios(value)
                }
            }
            this.$parent.cancelFun()
        },
        //班次替换成功接口
        replaceAxios(data){
             this.$axios({
                method:"post",
                url:`/api/class/UpdateClass`,
                data:data,
            }).then((res)=>{
                
            }).catch((err)=>{
                console.log('err',err)
            })
        }
    }
    
}
</script>
<style lang="scss">
.Frequency_box{
    .frequency_middle{
     
        .el-select{
            width:100%;
        }
        .el-input--suffix .el-input__inner{
            border-radius: 0px;
            height: 155px !important;
            width:100% !important;
            text-align: center !important;
        }
        .el-input__suffix-inner{
            display: none;
        }
    }

}
</style>
<style lang="scss" scoped>
@import "../../../assets/style/ScheduleMange/Frequency"
</style>
