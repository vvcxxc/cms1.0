<!--
 * @Description: 这是报警控件页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 09:27:27
 -->
 
      
                  
<template>
   <div class="alarmBox">
    <div v-for="(item,index) in dataValue" :key="index">
        <div
        v-if="show"
         @dblclick="opendb(item.Class)" 
         @contextmenu.prevent
         @mousedown="downClick(item.Class,$event)" 
         @mouseup="seupClick(item.Class,$event)"
         name="alert"
         :class="item.Class" class="alarm"
         :style="'z-index:'+item.ZIndex+';position:absolute;left:'+item.left+'px;top:'+item.top+'px;width:'+item.width
         +'px;height:'+item.height+'px;borderRadius:'+item.radiusTop+'px '+item.radiusRight
         +'px '+item.radiusButton+'px '+item.radiusLeft+'px;'+'opacity:'+item.opacity+';transform:rotate('
         +item.rotate+'deg);padding:'+item.WraperBorderThickness+'px;overflow:hidden;white-space:nowrap;background:'+item.BorderBrush">
           
            <div class="alarm_box2" 
            :style="'width:100%;height:100%;borderRadius:'+item.radiusTop+'px '+item.radiusRight+'px '
            +item.radiusButton+'px '+item.radiusLeft+'px;padding:14px;box-sizing:border-box;background:'+item.Background">
                <div class="alarm_title clearfix"  :style="'margin-bottom:14px;position:relative;height:'+ item.HeaderFontSize
                +'px;overflow:hidden'">
                    <div :class="item.Class+'AlarmTitle'" style="position:absolute;left:0px">

                        <div :class="routerName+item.Class+'alarm_title_no'" class="alarm_title_no left" 
                        :style="'padding-right:17px;padding-left:6px;color:#000;font-size:'+item.HeaderFontSize
                        +'px;line-height:'+item.HeaderFontSize+'px;color:'+item.headforeColor+';background:'
                        +item.headbackgroundColor+';-webkit-background-clip:'+item.headclipText+';fontWeight:'
                        +item.HeaderBlod+';text-decoration:'+item.HeaderTextDecorations+';font-family:'+item.HeaderFontFamily"><!-- {{$t('AlarmMsg.langNo')}} -->{{lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber}}</div>

                        <div class="alarm_title_text left" 
                        :style="'font-size:'+item.HeaderFontSize+'px;line-height:'+item.HeaderFontSize+'px;color:'
                        +item.headforeColor+';background:'+item.headbackgroundColor+';-webkit-background-clip:'
                        +item.headclipText+';fontWeight:'+item.HeaderBlod+';text-decoration:'
                        +item.HeaderTextDecorations+';font-family:'+item.HeaderFontFamily"><!-- {{$t('AlarmMsg.langAlarmInfo')}} -->{{lang.AlarmRecord_Time_DataGrid_Information}}</div>

                        
                    </div>
                </div>

                <div :class="item.Class+'alarm_conter'" class="alarm_conter"
                   :style="'width:100%;height:calc(100% - 28px - '+item.HeaderFontSize+'px - '+item.FontSize+'px);'
                   +'overflow-x:hidden;position: relative;background:'+item.Background">
                    <div :class="item.Class+'alarm_conter_rowBox'" class="alarm_conter_rowBox" 
                        style="position:absolute;top:0;left:0;min-width:100%">
                       
                        <div v-if="item.resdata.length==0" :style="'width:100%;text-align:center;background:'+item.itembackColor+';font-size:'+item.FontSize
                        +';font-family:'+item.FontFamily+';fontWeight:'+item.Blod+';color:'+item.Foreground+';-webkit-background-clip:'
                        +item.clipText+';vertical-align: middle;line-height:'+item.FontSize+'px;padding-top:11px;padding-bottom:11px;display:inline-block;text-decoration:'
                        +item.TextDecorations"><!-- {{$t('AlarmMsg.langNoAlarm')}} -->{{lang.AlarmRecord_NoAlarmInformation}}</div>
                          <!-- active21 默认不激活-->
                        <div @click="alarmRowFun(item,$event)" v-for="(it,inde) in item.resdata" 
                        :key="inde" :class="[item.Class+'alarm_conter_row',inde==0?'active21':'']"
                         class="alarm_conter_row" name="alarm_conter_row" :style="'background:'+item.itembackColor+';border-bottom:1px solid;border-color:#090D2C;display:flex'">
                            <!-- active21 默认不激活-->
                             <div class="alarm_conter_no" :class="[routerName+item.Class+'alarm_conter_no',inde==0?'active21':'']" name="no"
                            :style="'font-size:'+item.FontSize+'px;padding-left:18px;padding-right:18px;font-family:'+item.FontFamily
                            +';background:'+item.backgroundColor+';color:'+item.Foreground+';-webkit-background-clip:'+item.clipText
                            +';float:left;vertical-align: middle;fontWeight:'+item.Blod + ';line-height:'+item.FontSize
                            +'px;padding-top:11px;padding-bottom:11px;border-right:1px solid #090D2C;margin-right:18px;display:inline-block;text-decoration:'+item.TextDecorations">{{it.NO}}</div>
                            <!-- active21 默认不激活-->
                            <div class="alarm_conter_text"  :class="inde==0?'active21':''" name="info"
                            :style="'font-size:'+item.FontSize+'px;background:'+item.backgroundColor+';font-family:'+item.FontFamily
                            +';fontWeight:'+item.Blod+';color:'+item.Foreground+';-webkit-background-clip:'+item.clipText
                            +';vertical-align: middle;line-height:'+item.FontSize+'px;padding-top:11px;padding-bottom:11px;display:inline-block;text-decoration:'+item.TextDecorations">{{it.Info}}</div>

                        </div>
                        
                    </div>
                </div>

                <div class="alarm_fool clearfix" :class="item.Class+'alarm_fool'" style="margin-top:14px">
                    <div @mousedown="leftDownFun(item)" @mouseup="leftUpFun(item)" :class="item.Class+'alarm_fool_left'" class="alarm_fool_left left"></div>
                    <div  @mousedown="rightDownFun(item)" @mouseup="rightUpFun(item)" :class="item.Class+'alarm_fool_right'" class="alarm_fool_right left"></div>
                    <div v-if="item.IsAlarmAmountVisibility.length==0?true:item.IsAlarmAmountVisibility" class="alarm_fool_num right" 
                    :style="'font-size:'+item.FontSize+'px;line-height:'+item.FontSize
                    +'px;color:rgba(252, 210, 62, 1);text-decoration:'+item.TextDecorations+';font-family:'+item.FontFamily">{{item.resdata.length}}</div>

                    <div v-if="item.IsAlarmAmountVisibility.length==0?true:item.IsAlarmAmountVisibility" class="alarm_fool_text right" 
                   :style="'font-size:'+item.FontSize+'px;line-height:'+item.FontSize
                    +'px;color:'+item.Foreground+';background:'+item.backgroundColor
                    +';-webkit-background-clip:'+item.clipText+';fontWeight:'+item.HeaderBlod+';text-decoration:'
                    +item.TextDecorations+';font-family:'+item.FontFamily"><!-- {{$t('AlarmMsg.langCurrentAlarmAmonut')}} -->{{lang.AlarmRecord_CurrentNumberOfAlarms}}</div>
                </div>
            </div>
  
        </div>
    </div>

     <!-- 权限弹窗 -->
    <div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
            <div v-if="commerPopShow1" class="commerPop_outPop">
            <div class="commerPop_outHead">
                <i class="warning el-icon-warning"></i>
                <span class="text">{{lang.RoleManage_HT_Tips}}</span>
            </div>
            <div class="commerPop_conter">{{lang.NoOperationAuthority}}</div>
            <div class="commerPop_btn">
                <div class="commerPop_yes" @click="Jurisdiction()" style="width:310px;margin-left:25px">{{lang.PopupCommon_Sure}}</div>
            </div>
            </div>
    </div>
    </div>
</template>
<script>
export default {
    name:'Alarm',
    data() {
        return {
         show:true,
         textblockData:[],
         dataValue:[],
         aa:[],
         cla:[],
         alarmID:'',
         policeIndex:[],
         policeId:[],
         cancelTokenFn: null,
         Class:'',
         ZIndex:'',
         commerPopShow1:false,
         time1:null,
         time2:null,
         routerName:'',
         lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:['dae','dataId'],
    watch:{
      dae:{
        deep:true,
        handler(val){
                this.data = val;
                if(val){
                    setTimeout(()=>{
                        this.init() 
                    },1000)
                }
        }
      }
    },
    created(){
        if(this.dae){
            this.init()
        }
    },
    
     beforeDestroy(){
         if(this.$store.state.websocketsShow != null){
            if(window.$.connection.redisMonitor){
                  let arr = []
                  for(let i=0;i<this.dataValue.length;i++){
                      arr.push(this.dataValue[i].Class)
                  }
                window.$.connection.redisMonitor.server.UnRegistDeviceMessageRemind(arr)
            }
         }
    },
    methods: {
         //确认
        Jurisdiction(){
             this.commerPopShow1 = false
        },
        //权限配置请求接口
        jurisdictionShow(Class){
          return new Promise((resolve, reject) => {
            var userinfoID
              if(JSON.parse(sessionStorage.getItem('userInfo1')) == null){
                  userinfoID = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
              }else{
                  userinfoID = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
              }
              var argChildMenuID = this.dataId
              var elementName = Class
                this.$axios({                      //权限配置请求接口
                    method: 'post',
                    url: `/api/UserManage/UserManage_CanExcuteAuthorityControl?argUserID=${userinfoID}&argChildMenuID=${argChildMenuID}&argElementName=${elementName}`,
                    argUserID:userinfoID,
                    argChildMenuID:argChildMenuID,
                    argElementName:elementName,
                }) .then(res => {
                  if( res.data.data.CanExcute == 0){
                        this.CanExcuteShow=true
                        resolve('成功了')
                  }else{
                      this.CanExcuteShow=false
                      resolve('成功了')
                  }
            })
       })
        },
        //鼠标松开
     seupClick(Class,e){
       clearTimeout(this.timeoutID);
       var self = this
       var EventScriptList = this.data.Data.EventScriptList
       var EventType = []
       var EventType1 = []
       var Typearr  = []
       for(var i=0;i<EventScriptList.length;i++){
           if(Class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseLeftButtonUp'){
              EventType.push(EventScriptList[i])
           }else if(Class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseRightButtonUp'){
             EventType1.push(EventScriptList[i])
           }
       }
        this.timeoutID = window.setTimeout(function() {
          if(e.which == 1){  //鼠标左键松开
              if(EventType.length){
               self.jurisdictionShow(Class).then(val => { 
                  if(self.CanExcuteShow){
                    self.commerPopShow1 = true
                    return
                  }else{
                    for(var j=0;j<EventType.length;j++){
                      Typearr.push(EventType[j].Script)
                    }
                    self.$parent.scriptData(Typearr,'','','','','')
                  }
              });
              }
           }else if(e.which == 3){ //鼠标右键松开
                  if(EventType1.length){
                     self.jurisdictionShow(Class).then(val => { 
                         if(self.CanExcuteShow){
                          self.commerPopShow1 = true
                          return
                        }else{
                          for(var j1=0;j1<EventType1.length;j1++){
                             Typearr.push(EventType1[j1].Script)
                           }
                        self.$parent.scriptData(Typearr,'','','','','')
                        }
                    });
                  }
           }
        },200)
     },
     //鼠标按下
     downClick(Class,e){
        var self = this
        var EventScriptList = this.data.Data.EventScriptList
        var EventType = []
        var EventType1 = []
        var Typearr = []
        for(var i=0;i<EventScriptList.length;i++){
           if(Class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseLeftButtonDown'){
              EventType.push(EventScriptList[i])
           }else if(Class == EventScriptList[i].ElementName 
                    && EventScriptList[i].EventType == 'MouseRightButtonDown'){
                      EventType1.push(EventScriptList[i])
                    }
        }
          if(e.which == 1){  //鼠标左键按下
              if(EventType.length){
                self.jurisdictionShow(Class).then(val => { 
                     if(self.CanExcuteShow){
                        self.commerPopShow1 = true
                        return
                    }else{
                      for(var j=0;j<EventType.length;j++){
                       Typearr.push(EventType[j].Script)
                     }
                    self.$parent.scriptData(Typearr,'','','','','')
                    }
                });
              }
          }else if(e.which == 3){  //鼠标右键按下
               if(EventType1.length){
                 self.jurisdictionShow(Class).then(val => { 
                       if(self.CanExcuteShow){
                        self.commerPopShow1 = true
                        return
                      }else{
                        for(var j1=0;j1<EventType1.length;j1++){
                            Typearr.push(EventType1[j1].Script)
                        }
                    self.$parent.scriptData(Typearr,'','','','','')
                      }
                  });
               }
          }
     },
     //鼠标双击
     opendb(Class){
        setTimeout(()=>{
          var EventScriptList = this.data.Data.EventScriptList
          var EventType = []
          var Typearr = []
          for(var i=0;i<EventScriptList.length;i++){
               if(Class == EventScriptList[i].ElementName && EventScriptList[i].EventType == 'MouseDoubleClick'){
                   EventType.push(EventScriptList[i])
               }
          }
           if(EventType.length){
             this.jurisdictionShow(Class).then(val => { 
                  if(this.CanExcuteShow){
                         this.commerPopShow1 = true
                         return
                   }else{
                     for(var j=0;j<EventType.length;j++){
                         Typearr.push(EventType[j].Script)
                       }
                    this.$parent.scriptData(Typearr,'','','','','')
                   }
             });
           }
        },200)
     },
     //整理参数数据
     arrFun(){
         var data =this.dae
        var A = data.Data.AlarmGroupItemList
        for(let i=0;i<this.dataValue.length;i++){
            for(let d=0;d<A.length;d++){
                if(this.dataValue[i].Class == A[d].ElementName){
                    this.dataValue[i].alar = A[d].AlarmFormat
                    this.dataValue[i].IsOrderByAsc =  A[d].IsOrderByAsc
                    this.dataValue[i].IsAlarmAmountVisibility = A[d].IsAlarmAmountVisibility
                    this.dataValue[i].IsAlarmDataGridHeadersVisibility = A[d].IsAlarmDataGridHeadersVisibility
                    this.dataValue[i].GroupID =  A[d].GroupID
                    this.dataValue[i].axiosShow = true
                    break;
                }else{
                    this.dataValue[i].axiosShow = false
                }
            }
        }
        for(let f=0;f<this.dataValue.length;f++){
            this.dataValue[f].arr = []
            for(var j=0;j<data.Data.AlarmTagItemList.length;j++){
                if(data.Data.AlarmTagItemList[j].GroupID == this.dataValue[f].GroupID){
                this.dataValue[f].arr.push(data.Data.AlarmTagItemList[j].TagName)
                }
            }
        }
    },
    //加入报警控件变量
     JoinVarFun(){
         if(this.$store.state.websocketsShow != null){
             this.arrFun()
              this.msgHub2 = window.$.connection.redisMonitor
                if(this.msgHub2){
                    for(let i=0;i<this.dataValue.length;i++){
                            var o = {};
                            let value = {
                                AlarmFormat:this.dataValue[i].alar,
                                Variables:this.dataValue[i].arr,
                                Lang: localStorage.getItem('currentLang')
                            }
                            var str = `o.${this.dataValue[i].Class}=""`
                            eval(str);
                            for(let it in o){
                                o[it] = value
                            }
                        window.$.connection.redisMonitor.server.RegistDeviceMessageRemind(o)
                    }
                }  
         }
     }, 
        init(){
            this.data = this.dae
            this.routerName = this.$route.path.slice(1)
            this.Name = 'alarmusercontrol'
              //数据筛选
              this.textblockData = []
            var dataAll = this.data.Controls.ControlList
             //根据控件名筛选
            for(var i=0;i<dataAll.length;i++){
                if(dataAll[i].ControlType == this.Name){
                    this.textblockData.push(dataAll[i])
                }
            }
            if(this.textblockData.length>0){
                    this.show = true
                }else{
                    this.show = false
                }
                //赋值
                if(this.show){
                    this.dataValue = []
                    this.gitValue()
                    this.arrFun()
                    if(this.$store.state.websocketsShow != null){
                        setTimeout(()=>{
                          this.JoinVarFun()
                        //    console.log('加入报警点')
                        },500)
                    }
                    if(this.data.Data.AlarmGroupItemList.length!=0){
                        this.axioss()
                    }
                }
        },
        //点击选择事件
        alarmRowFun(item,e){
            var rowdom = document.querySelectorAll(`.${item.Class}alarm_conter_row`)
            for(let j=0;j<rowdom.length;j++){
                rowdom[j].classList.remove('active1')
                rowdom[j].querySelector(`.alarm_conter_text`).classList.remove('active2')
                rowdom[j].querySelector(`.alarm_conter_no`).classList.remove('active2')
            }
            var name = $(e.path[0]).attr('name')
               if(name == 'alarm_conter_row'){
                   $(e.path[0]).addClass('active1')
                   $(e.path[0]).find(`.alarm_conter_text`).addClass('active2')
                   $(e.path[0]).find(`.alarm_conter_no`).addClass('active2')
               }else{
                   $(e.path[0]).parent(`.${item.Class}alarm_conter_row`).addClass('active1')
                   $(e.path[0]).parent(`.${item.Class}alarm_conter_row`).find(`.alarm_conter_text`).addClass('active2')
                   $(e.path[0]).parent(`.${item.Class}alarm_conter_row`).find(`.alarm_conter_no`).addClass('active2')
               }
        },
        //右按下
        rightDownFun(item){
            this.time1 = setInterval(()=>{
                var dom = document.querySelector(`.${item.Class}alarm_conter_rowBox`).offsetWidth
                var dom1 = document.querySelector(`.${item.Class}alarm_conter`).offsetWidth
                var left = parseInt(document.querySelector(`.${item.Class}alarm_conter_rowBox`).style.left)
                var num = dom1 - dom
                if(left>num){
                    document.querySelector(`.${item.Class}alarm_conter_rowBox`).style.setProperty('left',`${left - 1}px`,'important')
                    document.querySelector(`.${item.Class}AlarmTitle`).style.setProperty('left',`${left - 1}px`,'important')
                }
            },10)
        },
        //右松开
        rightUpFun(item){
            clearInterval(this.time1)
        },
        //左按下
        leftDownFun(item){
            this.time2 = setInterval(()=>{
                var left = parseInt(document.querySelector(`.${item.Class}alarm_conter_rowBox`).style.left)
                if(left != 0 ){
                    document.querySelector(`.${item.Class}alarm_conter_rowBox`).style.setProperty('left',`${left + 1}px`,'important')
                    document.querySelector(`.${item.Class}AlarmTitle`).style.setProperty('left',`${left + 1}px`,'important')
                }
            },10)
        },
        //左松开
        leftUpFun(item){
             clearInterval(this.time2)
        },
        //websockets调用
        axioImg2(data){
               for(let i in data.name){
                   for(let j=0;j<this.dataValue.length;j++){
                       if(i == this.dataValue[j].Class){
                           this.datafun(data.name[i],j,this.dataValue[j].Class,this.dataValue[j])
                       }
                   }
               }
        },
         //初始化请求接口  websockets初始不请求
        axioss(data){
           for(let k=0;k<this.dataValue.length;k++){
               var vv = {
                   AlarmFormat:this.dataValue[k].alar,
                   Variables:this.dataValue[k].arr,
               }
                // 请求接口
                this.$axios({
                    method: 'post',
                    url: '/api/HMI/HMI_GstAlarms',
                    data:vv
                }).then(res => {
                    this.datafun(res.data.data,k,this.dataValue[k].Class,this.dataValue[k])
                })
           }
        },
         //升序
         compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
            },
            //降序
             compare1(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            }
            },
         //格式数据
        datafun(resData,index,className,item){
                        this.dataValue[index].resdata = []
                        this.timeArr = []
                        this.dataArr = []
                         for(var i=0;i<resData.length;i++){
                            var time = this.$moment(resData[i].DateTime).valueOf()
                             var resda= {
                               NO:resData[i].NO,
                               Info:resData[i].Info,
                               ID:resData[i].ID,
                               DateTime:time
                             }
                             this.timeArr.push(resda)
                         }
                       if(!item.IsOrderByAsc){
                        this.dataArr = this.timeArr.sort(this.compare1('DateTime'))
                       }else{
                           this.dataArr = this.timeArr.sort(this.compare('DateTime'))
                       }

                      for(var j=0;j<this.dataArr.length;j++){
                             let date = new Date(parseInt(this.dataArr[j].DateTime) * 1000) // 时间戳为10位需乘1000，为13位则不用
                            let Y = date.getFullYear() // 年
                            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
                            let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日
                            let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
                            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
                            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒
                            var datime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s // yyyy-mm-dd hh:mm:ss
                             var resda1 = {
                               NO:j+1,
                               Info:this.dataArr[j].Info,
                               ID:this.dataArr[j].ID,
                               DateTime:datime
                             }
                             this.dataValue[index].resdata.push(resda1)
                      }
           
                        this.dataValue[index].num = this.dataValue[index].resdata.length
                         //横向箭头是否出现
                         var alarm_conter = document.querySelector(`.${className}alarm_conter`).offsetWidth
                         var alarm_conter_rowBox =document.querySelector(`.${className}alarm_conter_rowBox`).offsetWidth
                         var res = alarm_conter_rowBox > alarm_conter
                         if(res == true){
                             document.querySelector(`.${className}alarm_fool_left`).style.display = 'block'
                             document.querySelector(`.${className}alarm_fool_right`).style.display = 'block'
                         }else{
                             document.querySelector(`.${className}alarm_fool_left`).style.display = 'none'
                             document.querySelector(`.${className}alarm_fool_right`).style.display = 'none'
                         }

                        
                         //排序字段dom宽度变为一致
                         var noDom = document.querySelectorAll(`.${this.routerName}${className}alarm_conter_no`)
                         var noDomLength = 0
                         for(let k=0;k<noDom.length;k++){
                              noDom[k].style.width='auto'
                             var kLength = noDom[k].offsetWidth
                             if(kLength > noDomLength){
                                 noDomLength = kLength
                             }
                         }
                         var titleDom = document.querySelector(`.${this.routerName}${className}alarm_title_no`)
                        
                         if(titleDom.offsetWidth > noDomLength){
                             noDomLength = titleDom.offsetWidth - 8
                         }else{
                             titleDom.style.width = noDomLength+8 + 'px'
                         }
                         for(let f=0;f<noDom.length;f++){
                             noDom[f].style.width = noDomLength+'px'
                         }

                        var headH = document.querySelector(`.${className}AlarmTitle`).offsetHeight
                        var flooH = document.querySelector(`.${className}alarm_fool`).offsetHeight
                        
                        document.querySelector(`.${className}alarm_conter`).style.height = `calc(100% - 28px - ${headH}px - ${flooH}px)`

                        // if(item.IsAlarmDataGridHeadersVisibility == false && res==false && item.IsAlarmAmountVisibility == false){
                        //     document.querySelector(`.${className}alarm_conter`).style.height = `calc(100%)`
                        // }else if(item.IsAlarmDataGridHeadersVisibility == false && res==true && item.IsAlarmAmountVisibility == false){
                        //     document.querySelector(`.${className}alarm_conter`).style.height = `calc(100% - 28px - ${headH}px - ${flooH}px)`
                        // }else if(item.IsAlarmDataGridHeadersVisibility == false && res==true && item.IsAlarmAmountVisibility == true){
                        //     document.querySelector(`.${className}alarm_conter`).style.height = `calc(100% - 28px - ${headH}px - ${flooH}px)`
                        // }else if(item.IsAlarmDataGridHeadersVisibility == false && res==false && item.IsAlarmAmountVisibility == true){
                        //     document.querySelector(`.${className}alarm_conter`).style.height = `calc(100% - 28px - ${headH}px - ${flooH}px)`
                        // }

        },
        //渐变色+阴影
         colorFun(foregoundArr,borderbrushArr,backgroundArr,HeaderForeground,ItemBackground){
              
                var foreColor
                var backgroundColor
                var clipText
                var headforeColor
                var headbackgroundColor
                var headclipText
                var borderColor
                var backColor
                var itembackColor
                var lagel1
                var lagel2
                var lagel3
                var gradient1
                var gradient2
                var gradient3
            // 头部字体颜色
             if(HeaderForeground.ColorType == 'SolidColor'){
                    headforeColor = '#' + HeaderForeground.Data.Color.slice(3) + HeaderForeground.Data.Color.slice(1, 3);
                    headclipText = 'none'
                    headbackgroundColor = 'none'
            }else{
                    headforeColor = 'transparent'
                    headclipText = 'text'
                    headbackgroundColor = ''
                    lagel1 = HeaderForeground.Data.Angel.toFixed(0)
                for(let g2=0;g2<HeaderForeground.Data.GradientStops.length;g2++){
                    gradient2 = HeaderForeground.Data.GradientStops[g2]
                    headbackgroundColor = headbackgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                }
                    headbackgroundColor = '-webkit-linear-gradient('+lagel1+'deg'+headbackgroundColor+')';
            }


            //字体颜色渐变
            if(foregoundArr.ColorType == 'SolidColor'){
                    foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
                    clipText = 'none'
                    backgroundColor = 'none'
            }else{
                    foreColor = 'transparent'
                    clipText = 'text'
                    backgroundColor = ''
                    lagel1 = foregoundArr.Data.Angel.toFixed(0)
                for(var g2=0;g2<foregoundArr.Data.GradientStops.length;g2++){
                    gradient2 = foregoundArr.Data.GradientStops[g2]
                    backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                }
                    backgroundColor = '-webkit-linear-gradient('+lagel1+'deg'+backgroundColor+')';
            }
            
            //边框色渐变
            if(borderbrushArr.ColorType == 'SolidColor'){
                borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
            }else{
                    borderColor = ''
                    lagel3 = borderbrushArr.Data.Angel.toFixed(0)
                for(var f2=0;f2<borderbrushArr.Data.GradientStops.length;f2++){
                    gradient3 = borderbrushArr.Data.GradientStops[f2]
                    borderColor = borderColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
                }
                    borderColor = '-webkit-linear-gradient('+lagel3+'deg'+borderColor+')';
            }
            
            //内容背景色
            if(ItemBackground.ColorType == 'SolidColor'){
                itembackColor = '#' + ItemBackground.Data.Color.slice(3) + ItemBackground.Data.Color.slice(1, 3)
                  
            }else{
                    itembackColor = ''
                    lagel2 = ItemBackground.Data.Angel.toFixed(0)
                for(let h2=0;h2<ItemBackground.Data.GradientStops.length;h2++){
                    gradient1 = ItemBackground.Data.GradientStops[h2]
                    itembackColor = itembackColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                }
                    itembackColor = '-webkit-linear-gradient('+lagel2+'deg'+itembackColor+')';
            }
                

            //背景色渐变
            if(backgroundArr.ColorType == 'SolidColor'){
                backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                  
            }else{
                    backColor = ''
                    lagel2 = backgroundArr.Data.Angel.toFixed(0)
                for(var h2=0;h2<backgroundArr.Data.GradientStops.length;h2++){
                    gradient1 = backgroundArr.Data.GradientStops[h2]
                    backColor = backColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                }
                    backColor = '-webkit-linear-gradient('+lagel2+'deg'+backColor+')';
            }
            var value = {
                foreColor:foreColor,
                backgroundColor:backgroundColor,
                clipText:clipText,
                headforeColor:headforeColor,
                headclipText:headclipText,
                headbackgroundColor:headbackgroundColor,
                borderColor:borderColor,
                backColor:backColor,
                itembackColor:itembackColor
            }
            return value
         },



        //样式赋值
        gitValue(){
            this.dataValue = []
            for(var i=0;i<this.textblockData.length;i++){
                //加层级zIndex
                var ZIndexs = this.data.Data.ZIndexs
                if(ZIndexs){
                    for(let item in ZIndexs){
                        if(this.textblockData[i].Name == item){
                            this.ZIndex = ZIndexs[item]
                            break
                        }
                    }
                }else{
                    this.ZIndex = ''
                }
                var foreColor
                var borderColor
                var backColor
                var clipText
                var backgroundColor
                var headforeColor
                var headclipText
                var headbackgroundColor
                var itembackColor
                //渐变色变量
                var foregoundArr = JSON.parse(this.textblockData[i].PropertyList.Foreground)
                var borderbrushArr = JSON.parse(this.textblockData[i].PropertyList.WraperBorderBrush)
                var backgroundArr = JSON.parse(this.textblockData[i].PropertyList.WraperBackground)
                var HeaderForeground = JSON.parse(this.textblockData[i].PropertyList.HeaderForeground)
                var ItemBackground = JSON.parse(this.textblockData[i].PropertyList.ItemBackground)
                //渐变色
                let colorData = this.colorFun(foregoundArr,borderbrushArr,backgroundArr,HeaderForeground,ItemBackground)
                foreColor = colorData.foreColor
                backgroundColor = colorData.backgroundColor
                clipText = colorData.clipText
                headforeColor = colorData.headforeColor
                headclipText = colorData.headclipText
                headbackgroundColor = colorData.headbackgroundColor
                borderColor = colorData.borderColor
                backColor = colorData.backColor
                itembackColor = colorData.itembackColor
                var radius = this.textblockData[i].PropertyList.OutWraperCornerRadius
                var value = {
                    width:this.textblockData[i].PropertyList.Width,
                    height:this.textblockData[i].PropertyList.Height,
                    rotate:this.textblockData[i].PropertyList.RotateAngle,
                    top:this.textblockData[i].PropertyList.Top,
                    left:this.textblockData[i].PropertyList.Left,
                    opacity:this.textblockData[i].PropertyList.Opacity / 100,
                    Class:this.textblockData[i].Name,
                    HeaderBlod:this.textblockData[i].PropertyList.HeaderBlod == 'True' ? 'bold' : '',
                    WraperBorderThickness:this.textblockData[i].PropertyList.WraperBorderThickness,
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations== 'False' ? 'none' : 'underline',
                    HeaderTextDecorations:this.textblockData[i].PropertyList.HeaderTextDecorations == 'False' ? 'none' : 'underline',
                    radiusLeft :radius.split(",")[0],
                    radiusTop :radius.split(",")[1],
                    radiusRight :radius.split(",")[2],
                    radiusButton :radius.split(",")[3],
                    HeaderFontFamily:this.textblockData[i].PropertyList.HeaderFontFamily,
                    HeaderFontSize:this.textblockData[i].PropertyList.HeaderFontSize,
                    FontSize:this.textblockData[i].PropertyList.FontSize,
                    FontFamily:this.textblockData[i].PropertyList.FontFamily,
                    Blod:this.textblockData[i].PropertyList.Blod== 'True' ? 'bold' : '',
                    BorderBrush:borderColor,
                    Background:backColor,
                    headForeground:borderColor,
                    itembackColor:itembackColor,
                    headforeColor:headforeColor,
                    headbackgroundColor:headbackgroundColor,
                    headclipText:headclipText,
                    clipText:clipText,
                    Foreground:foreColor,
                    backgroundColor:backgroundColor,
                    ZIndex:this.ZIndex,
                    resdata:[],
                    num:'',
                    IsAlarmAmountVisibility:''
                }
                this.dataValue.push(value);
            }
        }

    },
}
</script>
<style lang="scss" scoped>
.alarmBox{
    .alarm{
        /*修改滚动条样式*/
        div::-webkit-scrollbar{
            width:6px;
            height:5px;
            /**/
        }
        div::-webkit-scrollbar-track{
            background:transparent;
            border-radius:2px;
        }
        div::-webkit-scrollbar-thumb{
            background: #5C6175;
            border-radius:10px;
        }
        div::-webkit-scrollbar-thumb:hover{
            background: #5C6175;
        }
        div::-webkit-scrollbar-corner{
            background: #179a16;
        }
        .right{
            float:right
        }
        .left{
            float: left;
        }
        .clearfix:after{
            content: "";
            display: block;
            height: 0;
            clear:both;
            visibility: hidden;
        }
        .clearfix{
            zoom: 1;
        }
        .alarm_conter_row{
        padding-right:20px;
        // padding-top:11px;
        // padding-bottom:12px;
        border-bottom:1px;
        
        width:100%;
        user-select: none;
        // overflow: hidden;
    }
    .alarm_conter_row:hover{
        background:  rgba(25, 114, 250, 1) !important;
    }
    .active1{
        background: rgba(25, 114, 250, 1) !important;
    }
        .alarm_fool_left{
            width:16px;
            height:16px;
            background: url('../../../assets/images/Left@2x.png');
            background-size: cover;
            cursor: pointer;
            margin-right:7px;
        }
        .alarm_fool_right{
            width:16px;
            height:16px;
            background: url('../../../assets/images/right@2x.png');
            background-size: cover;
            cursor: pointer;
    }
    .active2{
        background: #fff !important;
        color: transparent !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
    }

    }
    .commerPop_outPop{
            width:360px;
            height:190px;
            box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.1);
            position: fixed;
            left:0;
            right:0;
            top:260px;
            margin:auto;
            z-index: 99;
            background: #fff;
        .commerPop_btn{
            overflow: hidden;
            margin-top:10px;
            .commerPop_confirm{
                width:305px;
                height:30px;
                line-height: 30px;
                background: #F3E3AD;
                color:#ECAA4E;
                margin-left:30px;
                text-align: center;
                cursor: pointer;
            }
            .commerPop_no{
                width:155px;
                height:30px;
                float: left;
                background: #E0E0E0;
                color:#8E8E8E;
                text-align: center;
                line-height: 30px;
                margin-left:22px;
                cursor: pointer;
            }
            .commerPop_yes{
                width:155px;
                height:30px;
                float: left;
                background: #F3E3AD;
                color:#ECAA4E;
                margin-left:5px;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
            }
        }
        .commerPop_conter{
            font-size:16px;
            width:100%;
            height:100px;
            text-align: center;
            line-height: 100px;
        }

        .commerPop_outHead{
            width:100%;
            height:30px;
            background: #FFBC3D;
            text-align: center;
            line-height: 30px;

            .warning{
            color:#fff;
            margin-right:5px;
            }
            .text{
            font-size: 16px;
            color:#fff;
            }
        }
    }
}
</style>

