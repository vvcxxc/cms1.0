<!--
 * @Description: 这是显示数值控件页面（组件）
 * @Date: 2019-11-13 09:49:38
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-07 14:48:37
 ***** TODO: 建议重构
 -->
<template>
<div class="DataTextBlockaa12aa">
  <div v-for="(item,index) in dataValue" :key="index">
      <div class="DataTextBlock121aa1"  v-if="show"   
      @dblclick="open(index,item.class,item)"
      @contextmenu.prevent
      @mousedown="downClick(item,$event)" 
      @mouseup="seupClick(item,$event)"
      :style="'width:' + item.width + 'px; height:' + item.height + 'px; position:absolute; left:' 
      + item.left + 'px; top:' + item.top + 'px; transform:rotate(' + item.rotate + 'deg); opacity:' + item.opacity 
      + '; fontFamily:' + item.fontFamily + '; fontSize:' + item.FontSize + 'px; background:' + item.BorderBrush
      + ';textAlign:center; lineHeight:' + (item.height - item.BorderThickness * 2) 
      + 'px;zIndex:'+item.ZIndex+';boxSizing:border-box;padding:'+ item.BorderThickness 
      + 'px;overflow:hidden;white-space:nowrap;boxShadow:'+item.Shadow">
            <div :class="'aa'+item.class" name="datatextblock" class="aaDataTextBlock121aa" 
            :style="'color:'+ item.Foreground +';width:100%;height:100%;background:' 
            + item.Background +';boxShadow:'+item.Shadow+';fontWeight:' + item.Blod 
            + ';text-decoration:' + item.TextDecorations +';'">
              {{item.text}}</div>
      </div>
    </div>

   <!-- 天 -->
  <div class="showWindow">
      <div class="show_head">
        <span>{{windowText}}</span>
        <div @click="openBox()" class="box el-icon-close"></div>
      </div>
      <div class="show_date">
        <span @click="showdata('one')" class="show_one">1天</span>
        <span @click="showdata('three')" class="show_three">3天</span>
        <span @click="showdata('seven')" class="show_seven">7天</span>
      </div>
      <div class="show_screen">
        <span @click="leftArrow" class="left el-icon-arrow-left"></span>
        <div class="block_one">
          <el-date-picker
            v-model="time2"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <span class="middle el-icon-minus"></span>
        <div class="block_two">
          <el-date-picker
            v-model="time1"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <span @click="rightArrow" class="right el-icon-arrow-right"></span>
        <div @click="dateBottom" class="botton">
          <span>查询</span>
        </div>
      </div>
      <div class="echarts_box">
        <div class="echarts" ref="Pop"></div>
      </div>
      
  </div>

      <!-- 月 -->
    <div class="showWindow2">
      <div class="show_head">
        <span>{{windowText}}</span>
        <div @click="openBox()" class="box el-icon-close"> </div>
      </div>
      <div class="show_date">
         <span @click="showdata2('h')" class="show_h">小时</span>
         <span @click="showdata2('d')" class="show_d">日</span>
         <span @click="showdata2('w')" class="show_w">周</span>
         <span @click="showdata2('m')" class="show_m">月</span>
         <span @click="showdata2('s')" class="show_s">季</span>
         <span @click="showdata2('y')" class="show_y">年</span>
      </div>
      <div class="show_screen">
        <span @click = "leftArrow1" class="left el-icon-arrow-left"></span>
        <div class="block_one">
          <el-date-picker
            v-model="time3"
            :type="Ddata"
            :placeholder="Dtime">
          </el-date-picker>
        </div>
        <span class="middle el-icon-minus"></span>
        <div class="block_two">
          <el-date-picker
            v-model="time1"
            :type="Ddata"
            :placeholder="Dtime">
          </el-date-picker>
        </div>
        <span @click = "rightArrow1" class="right el-icon-arrow-right"></span>
        <div @click="yBottom" class="botton">
          <span>查询</span>
        </div>
      </div>
      <div class="echarts_box">
        <div class="echarts" ref="Pop2"></div>
      </div>
    </div>

    <!-- 权限弹窗 -->
    <div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
          <div v-if="commerPopShow1" class="commerPop_outPop">
            <div class="commerPop_outHead">
                <i class="warning el-icon-warning"></i>
                <span class="text">提示</span>
            </div>
            <div class="commerPop_conter">该账户无操作权限</div>
            <div class="commerPop_btn">
                <div class="commerPop_yes" @click="Jurisdiction()" style="width:310px;margin-left:25px">确定</div>
            </div>
            </div>
    </div>

</div>
</template>

<script>

export default {
    data() {
        return {
          text:'数值显示',  //未知
          show:true,
          value3:'2019-11-21 12:00:00',
          windowShow:false,
          time2:'',
          time3:'',
          windowText:'标题',
          type:'',
          Dtime:'选择日期',
          Ddata:'datetime',
          textblockData:[],
          dataValue:[],
          index:0,
          cla:[],
          timeData:[],
          textBbockArr:[],
          textColorArr:[],
          typeIndex:'',
          time1:'',
          digit:[],
          textClass:'',
          dayType:1,
          yType:1,
          funch:'',
          myChart:'',
          myChart2:'',
          tagTypeName:'',
          commerPopShow1:false,
          timeoutID:'',
          ZIndex:'',
          resData3:[],
          resData:[],  //初始化请求变量值
          varArr:[],   //变量名
          arr3:[],
          lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:['dae','dataId'],
    watch:{
      dae:{
        deep:true,
        handler(val){
            this.msgHub2 = window.$.connection.redisMonitor
            if(this.msgHub2){
              this.msgHub2.server.removeVariables(this.varArr)
            }
              this.data = val;
              if(val){
                  this.init() 
              }
        }
      },
       time1(n,o){
         if(typeof(n) == 'object'){
              this.time1 = this.getTime(this.time1)
         }
      },
      time3(n,o){
          if(typeof(n) == 'object'){
              this.time3 = this.getTime(this.time3)
         }
      }
    },
      beforeDestroy(){
        this.msgHub2 = window.$.connection.redisMonitor
        if(this.msgHub2){
          this.msgHub2.server.removeVariables(this.varArr)
        }
      },
    mounted(){
       if(this.dae){
        this.init()
      }
    },
    methods: {
      getPointNum(num, n) {
			 if(isNaN(num)||num===null){
		     return null
	         }else{
             
		     return Number(num).toFixed(n)
             }
		  },
            //页面初始化
      init(){
        this.dataValue = []
        this.data = this.dae
        this.Name = 'datatextblock'
        var  textBox = document.querySelectorAll('.aaDataTextBlock121aa')
        for(var d=0;d<textBox.length;d++){
          textBox[d].innerHTML = "数值显示"
        }
        this.timeS(24)
        //数据筛选
        this.textblockData = []
        this.cla = []
        var dataAll = this.data.Controls.ControlList
        for(var i=0;i<dataAll.length;i++){
            if(dataAll[i].ControlType == this.Name){
              this.textblockData.push(dataAll[i])
              this.cla.push(dataAll[i].Name)
            }
        }
        this.Sarr = []
        for(var k=0;k<this.data.Data.DataStatusTextColorEffectAnimationList.length;k++){
            var nameNull =  this.data.Data.DataStatusTextColorEffectAnimationList[k].TagName
            if(nameNull != null){
              this.Sarr.push(this.data.Data.DataStatusTextColorEffectAnimationList[k].ElementName)
            }
        }
        var a = new Set(this.Sarr)
        this.Starr = [...a]
        if(this.textblockData.length!=0){
              this.show = true
        }else{
              this.show = false
        }
        //赋值
        if(this.show){
              this.gitValue()
              this.ti(24)
              this.ti2(24)
              this.axio();
              this.axioColor()
              this.JoinVarFun()
        }
      },

    //确认
    Jurisdiction(){
        this.commerPopShow1 = false
    },
    //权限按钮请求
    jurisdictionShow(item){
          return new Promise((resolve, reject) => {
            var userinfoID
              if(JSON.parse(sessionStorage.getItem('userInfo1')) == null){
                  userinfoID = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
              }else{
                  userinfoID = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
              }
              var argChildMenuID = this.dataId
              var elementName = item.class
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
     seupClick(item,e){
       clearTimeout(this.timeoutID);
       var self = this
       var EventScriptList = this.data.Data.EventScriptList
       var EventType = []
       var EventType1 = []
       var Typearr  = []
       for(var i=0;i<EventScriptList.length;i++){
           if(item.class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseLeftButtonUp'){
              EventType.push(EventScriptList[i])
           }else if(item.class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseRightButtonUp'){
             EventType1.push(EventScriptList[i])
           }
       }

        this.timeoutID = window.setTimeout(function() {
          if(e.which == 1){  //鼠标左键松开
              if(EventType.length){
               self.jurisdictionShow(item).then(val => { 
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
           }else if(e.which == 3){  //鼠标右键松开
                  if(EventType1.length){
                     self.jurisdictionShow(item).then(val => { 
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
     downClick(item,e){
        var self = this
        var EventScriptList = this.data.Data.EventScriptList
        var EventType = []
        var EventType1 = []
        var Typearr = []
        for(var i=0;i<EventScriptList.length;i++){
           if(item.class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseLeftButtonDown'){
              EventType.push(EventScriptList[i])
           }else if(item.class == EventScriptList[i].ElementName 
                    && EventScriptList[i].EventType == 'MouseRightButtonDown'){
                      EventType1.push(EventScriptList[i])
                    }
        }
          if(e.which == 1){  //鼠标左键按下
              if(EventType.length){
                self.jurisdictionShow(item).then(val => { 
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
                 self.jurisdictionShow(item).then(val => { 
                       if(self.CanExcuteShow){
                        self.commerPopShow1 = true
                        return
                      }else{
                        for(var j1=0;j1<EventType1.length;j1++){
                            Typearr.push(EventType1[j1].Script)
                        }
                      self.$parent.scriptData(Typearr,'','','','','','')
                      }
                  });
               }
          }
     },
    //天数/加时间
    rightArrow(){
      if(this.dayType==1){
        this.stateti2(24,0)
        this.endti2(24,1,3)  
      }
        if(this.dayType==3){
        this.stateti2(72,0)
        this.endti2(72,1,3)
      }
        if(this.dayType==7){
        this.stateti2(168,0)
        this.endti2(168,1,3)
      }
    },
    //减时间//天数
    leftArrow(){
      if(this.dayType==1){
        this.stateti2(24,1)
        this.endti2(24,1,1)
      }
        if(this.dayType==3){
        this.stateti2(72,1)
        this.endti2(72,1,1)
      }
        if(this.dayType==7){
        this.stateti2(168,1)
        this.endti2(168,1,1)
      }
    },
    //减时间 //年数
    leftArrow1(){
      if(this.yType==1){
        this.stateti2(24,1)
        this.endti2(24,1,0)
      }
        if(this.yType==7){
        this.stateti2(168,1)
        this.endti2(168,1,0)
      }
        if(this.yType==365){
        this.stateti2(8760,1)
        this.endti2(8760,1,0)
      }
      if(this.yType==28){
        this.stateti2(672,1)
        this.endti2(672,1,0)
      }
        if(this.yType==333){
        this.stateti2(26280,1)
        this.endti2(26280,1,0)
      }
    },
    rightArrow1(){
        //年数
      if(this.yType==1){
        this.stateti2(24,0)
        this.endti2(24,0,0)
      }
        if(this.yType==7){
        this.stateti2(168,0)
        this.endti2(168,0,0)
      }
        if(this.yType==365){
        this.stateti2(8760,0)
        this.endti2(8760,0,0)
      }
      if(this.yType==28){
        this.stateti2(672,0)
        this.endti2(672,0,0)
      }
        if(this.yType==333){
        this.stateti2(26280,0)
        this.endti2(26280,0,0)
      }
    },
    //年查询
      yBottom(){
          this.dataData = []
          this.timeData = []
          this.myChart2 = this.$echarts.init(this.$refs.Pop2)
          this.Line(this.myChart2)
        this.axioDline(this.funch)
    },
    //天查询
    dateBottom(){
        this.dataData = []
        this.timeData = []
        this.myChart = this.$echarts.init(this.$refs.Pop)
        this.Line(this.myChart)
      this.axioline()
    },
 //绘图
   Line(d){
      d.setOption({
      title: {
        text: '',
        left: 'center',
        show:true,
        textStyle:{
              color: "#000000",
              fontSize: "14",
              fontFamily: "SiYuanHei"
          }
        },
        tooltip: {
            trigger: 'axis',  
            "axisPointer": {  
              type: 'line',  
              lineStyle: {     
                      color: '#666' 
              }                   
            }             
        },
        legend: {
            orient: 'vertical',
            x:'right',
            y:'center',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
            }
        },
        xAxis: {
            type: 'category',
            name: '',
            axisLabel:{
            formatter:'{value}',
            fontSize:'12',
            color:'#000'
          },
            data:  this.timeData.length == 0 ? [''] : this.timeData,
        },
        grid: {
            left: '5%',
            right: '10%',
            bottom: '0',
            top:'10%',
            containLabel: true
        },
        yAxis: {
            type: 'value',  
            name: '',
            splitLine: { show: true },
            axisLabel:{
            formatter:'{value}',
            fontSize:'14',
          }
        },
        series: [{
                name: '',
                type: 'line',
                data: this.dataData,
                "yAxisIndex": 0,
                "label": {
                  "fontSize": 6,
                  "show": false,
                   normal: {
                      show: true,
                      position: 'top'
                  }
                },
                "lineStyle": {
                  "color": "#EE4000",
                  "width": 3,
                  "shadowBlur": 25,
                  "shadowOffsetY": 10,
                  "shadowColor": "rgba(0, 0, 0, 0.2)"
                },
                "itemStyle": {
                  "normal": {
                    "label": {
                      "show": false
                    }
                  }
                }
            }
        ]});
   },
    //结束时间格式化
    endTime2(num,text){
            var myDate = new Date(Date.parse(this.time2))
            var year = myDate.getFullYear(); //获取当前年
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month  //获取当前月
            var date = myDate.getDate();
            var da = date >9 ? date : '0' + date  //获取当前日
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var time1 = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
            this.time2 = time1   //报错      
    },
   
   //结束时间格式化
    stateti2(num,text){
           var myDate
            if(text == 1){
                myDate = new Date(Date.parse(this.time2))
                myDate.setTime(myDate.getTime()-(num*60*60*1000) + (num*60*60*1000));
            }else{
               myDate = new Date(Date.parse(this.time1))
                myDate.setTime(myDate.getTime()+num*60*60*1000);
            }
            var year = myDate.getFullYear();  //获取当前年
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month //获取当前月
            var date = myDate.getDate();
            var da = date >9 ? date : '0' + date   //获取当前日
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var time1 = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
            this.time1 = time1   //报错   
    },
    //开始时间
     endti2(num,text,type){
            var myDate
            if(type == 1){
              myDate = new Date(Date.parse(this.time2))
            }else if(type==0){
              myDate = new Date(Date.parse(this.time3))
            }else if(type == 3){
              myDate = new Date(Date.parse(this.time1))
            }
            if(text == 1){
                myDate.setTime(myDate.getTime()-num*60*60*1000);
            }else{
                myDate.setTime(myDate.getTime()+num*60*60*1000);
            }
            var year = myDate.getFullYear();  //获取当前年
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month  //获取当前月
            var date = myDate.getDate();
            var da = date >9 ? date : '0' + date  //获取当前日
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var time2 = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
            if(type == 1){
              this.time2 = time2  //报错
            }else if(type == 0){
              this.time3 = time2
            }else if(type == 3){
                this.time2 = time2
            }
    },
    //时间格式化
        getTime(dt){
            var year = dt.getFullYear();        //获取当前月
            var month = dt.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = dt.getDate();
            var da = date >9 ? date : '0' + date
            var h = dt.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = dt.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = dt.getSeconds();
            var se = s > 9 ? s : '0' + s
            var str = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se         //获取当前时间
            return str;
        },
      //弹窗时间显示
      timeS(num){
          var myDate = new Date();  //获取当前年
          var year = myDate.getFullYear();  //获取当前月
          var month = myDate.getMonth() + 1;
          var mothe = month > 9 ? month : '0' + month  //获取当前日
          var date = myDate.getDate();
          var da = date >9 ? date : '0' + date
          var h = myDate.getHours(); //获取当前小时数(0-23)
          var he = h > 9 ? h : '0' + h
          var m = myDate.getMinutes(); //获取当前分钟数(0-59)
          var me = m > 9 ? m : '0' + m
          var s = myDate.getSeconds();
          var se = s > 9 ? s : '0' + s
          if(num==24){
              this.time1 =year + '-' + mothe + '-' + da + ' ' +  h +':' + me+ ':' + se
          }else{
            this.time1 = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se
          }
     },
     //弹窗时间显示
    ti(num){
          var myDate = new Date();
          myDate.setTime(myDate.getTime()-num*60*60*1000);
          var year = myDate.getFullYear();   //获取当前年
          var month = myDate.getMonth() + 1;
          var mothe = month > 9 ? month : '0' + month  //获取当前月
          var date = myDate.getDate();
          var da = date >9 ? date : '0' + date  //获取当前日
          var h = myDate.getHours(); //获取当前小时数(0-23)
          var he = h > 9 ? h : '0' + h
          var m = myDate.getMinutes(); //获取当前分钟数(0-59)
          var me = m > 9 ? m : '0' + m
          var s = myDate.getSeconds();
          var se = s > 9 ? s : '0' + s
          this.time2 = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se
    },
     //弹窗时间显示
      ti2(num){
          var myDate = new Date();
          myDate.setTime(myDate.getTime()-num*60*60*1000);
          var year = myDate.getFullYear();  //获取当前年
          var month = myDate.getMonth() + 1;
          var mothe = month > 9 ? month : '0' + month   //获取当前月
          var date = myDate.getDate();
          var da = date >9 ? date : '0' + date  //获取当前日
          var h = myDate.getHours(); //获取当前小时数(0-23)
          var he = h > 9 ? h : '0' + h
          var m = myDate.getMinutes(); //获取当前分钟数(0-59)
          var me = m > 9 ? m : '0' + m
          var s = myDate.getSeconds();
          var se = s > 9 ? s : '0' + s
          if(num == 24){
          this.time3 = year + '-' + mothe + '-' + da + ' ' + h +':00:00'
          }else{
            this.time3 = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se
          }
    },
    //时间戳转时间
    timestampToTime(timestamp) {
      var date1 = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var year = date1.getFullYear();
        var month = date1.getMonth() + 1;
        var mothe = date1 > 9 ? month : '0' + month
          var date = date1.getDate();
          var da = date >9 ? date : '0' + date
          var h = date1.getHours(); //获取当前小时数(0-23)
          var he = h > 9 ? h : '0' + h
          var m = date1.getMinutes(); //获取当前分钟数(0-59)
          var me = m > 9 ? m : '0' + m
          var s = date1.getSeconds();
          var se = s > 9 ? s : '0' + s
         return  year + '/' + mothe + '/' + da + ' ' + he + ':' + me + ':' +se
    },
  //TODO:选项卡方法用elemnt的优化
     showdata(num){
        var d = document.querySelector('.show_one')
        var s = document.querySelector('.show_seven')
        var t = document.querySelector('.show_three')
        if(num == 'one'){
          this.dataData = []
          this.timeData = []
          this.Line(this.myChart)
          this.dayType = 1
          d.style.background = '#fff'
          s.style.background = "#eee"
          t.style.background = "#eee"
          t.style.borderBottom = '1px solid #D5D5D5'
          d.style.borderBottom = '0px'
          s.style.borderBottom = '1px solid #D5D5D5'
          this.ti(24)
          this.timeS(24)
          this.axioline()
          this.myChart = this.$echarts.init(this.$refs.Pop)
          this.Line(this.myChart)
        }else if(num == 'three'){
          this.dataData = []
          this.timeData = []
          this.Line(this.myChart)
          this.dayType = 3
          d.style.background = '#eee'
          s.style.background = "#eee"
          t.style.background = "#fff"
          t.style.borderBottom = '0px'
          d.style.borderBottom = '1px solid #D5D5D5'
          s.style.borderBottom = '1px solid #D5D5D5'
          this.ti(72)
          this.timeS(24)
          this.axioline()
          this.myChart = this.$echarts.init(this.$refs.Pop)
          this.Line(this.myChart)
        }else if(num == 'seven'){
          this.dataData = []
          this.timeData = []
          this.Line(this.myChart)
          this.dayType = 7
          d.style.background = '#eee'
          s.style.background = "#fff"
          t.style.background = "#eee"
          t.style.borderBottom = '1px solid #D5D5D5'
          d.style.borderBottom = '1px solid #D5D5D5'
          s.style.borderBottom = '0px'
          this.ti(168)
          this.timeS(24)
          this.axioline()
          this.myChart = this.$echarts.init(this.$refs.Pop)
          this.Line(this.myChart)
        }
    },
 //TODO:选项卡方法用elemnt的优化
    showdata2(num){
       var h = document.querySelector('.show_h')
       var d = document.querySelector('.show_d')
       var s = document.querySelector('.show_s')
       var m = document.querySelector('.show_m')
       var y = document.querySelector('.show_y')
       var w = document.querySelector('.show_w')
      if(num == 'h'){
        this.dataData = []
        this.timeData = []
        this.Line(this.myChart2)
        h.style.background = "#fff"
        h.style.borderBottom = '0px'
        d.style.background = "#eee"
        d.style.borderBottom = "1px solid #D5D5D5"
        s.style.background = "#eee"
        s.style.borderBottom = "1px solid #D5D5D5"
        w.style.background = "#eee"
        w.style.borderBottom = "1px solid #D5D5D5"
        y.style.background = "#eee"
        y.style.borderBottom = "1px solid #D5D5D5"
        m.style.background = "#eee"
        m.style.borderBottom = "1px solid #D5D5D5"
        this.Ddata = 'datetime'
        this.Dtime = '选择日期时间'
        this.yType = 1
        this.ti2(24)
        this.timeS(24)
        this.funch = 'HMI_GetArchivedHourData'
        this.time1 = this.time1
        this.time3 = this.time3
        this.axioDline(this.funch)
        this.myChart2 = this.$echarts.init(this.$refs.Pop2)
        this.Line(this.myChart2)
      }else if(num == 'm'){
        this.dataData = []
        this.timeData = []
        this.Line(this.myChart2)
        h.style.background = "#eee"
        h.style.borderBottom = "1px solid #D5D5D5"
        d.style.background = "#eee"
        d.style.borderBottom = "1px solid #D5D5D5"
        s.style.background = "#eee"
        s.style.borderBottom = "1px solid #D5D5D5"
        w.style.background = "#eee"
        w.style.borderBottom = "1px solid #D5D5D5"
        y.style.background = "#eee"
        y.style.borderBottom = "1px solid #D5D5D5"
        m.style.background = "#fff"
        m.style.borderBottom = "0px"
        this.Ddata = 'month'
        this.Dtime = '选择日期'
        this.yType = 365
        this.ti2(8760)
        this.timeS(24)
        this.funch = 'HMI_GetArchivedMonthData'
        this.time1 = this.time1.slice(0,7)
        this.time3 = this.time3.slice(0,7)
        this.axioDline(this.funch)
        this.myChart2 = this.$echarts.init(this.$refs.Pop2)
        this.Line(this.myChart2)
      }else if(num == 'd'){
        this.dataData = []
        this.timeData = []
        this.Line(this.myChart2)
        h.style.background = "#eee"
        h.style.borderBottom = "1px solid #D5D5D5"
        d.style.background = "#fff"
        d.style.borderBottom = "0px"
        s.style.background = "#eee"
        s.style.borderBottom = "1px solid #D5D5D5"
        w.style.background = "#eee"
        w.style.borderBottom = "1px solid #D5D5D5"
        y.style.background = "#eee"
        y.style.borderBottom = "1px solid #D5D5D5"
        m.style.background = "#eee"
        m.style.borderBottom = "1px solid #D5D5D5"
        this.Ddata = 'date'
        this.Dtime = '选择月'
        this.funch = 'HMI_GetArchivedDayData'
        this.yType = 7
        this.ti2(168)
        this.timeS(24)
        this.time1 = this.time1.slice(0,10)
        this.time3 = this.time3.slice(0,10)
        this.axioDline(this.funch)
        this.myChart2 = this.$echarts.init(this.$refs.Pop2)
        this.Line(this.myChart2)
      }else if(num == "s"){
        this.dataData = []
        this.timeData = []
        this.Line(this.myChart2)
        h.style.background = "#eee"
        h.style.borderBottom = "1px solid #D5D5D5"
        d.style.background = "#eee"
        d.style.borderBottom = "1px solid #D5D5D5"
        s.style.background = "#fff"
        s.style.borderBottom = "0px"
        w.style.background = "#eee"
        w.style.borderBottom = "1px solid #D5D5D5"
        y.style.background = "#eee"
        y.style.borderBottom = "1px solid #D5D5D5"
        m.style.background = "#eee"
        m.style.borderBottom = "1px solid #D5D5D5"
        this.Ddata = 'month'
        this.Dtime = '选择月'
        this.yType = 365
        this.ti2(8760)
        this.timeS(24)
        this.funch = 'HMI_GetArchivedQuarterData'
        this.time1 = this.time1.slice(0,7)
        this.time3 = this.time3.slice(0,7)
        this.axioDline(this.funch)
        this.myChart2 = this.$echarts.init(this.$refs.Pop2)
        this.Line(this.myChart2)
      }else if(num == 'y'){
        this.dataData = []
        this.timeData = []
        this.Line(this.myChart2)
        h.style.background = "#eee"
        h.style.borderBottom = "1px solid #D5D5D5"
        d.style.background = "#eee"
        d.style.borderBottom = "1px solid #D5D5D5"
        s.style.background = "#eee"
        s.style.borderBottom = "1px solid #D5D5D5"
        w.style.background = "#eee"
        w.style.borderBottom = "1px solid #D5D5D5"
        y.style.background = "#fff"
        y.style.borderBottom = "0px"
        m.style.background = "#eee"
        m.style.borderBottom = "1px solid #D5D5D5"
        this.Ddata = 'year'
        this.Dtime = '选择年'
        this.yType = 333
        this.ti2(26280)
        this.timeS(24)
        this.funch = 'HMI_GetArchivedYearData'
        this.time1 = this.time1.slice(0,4) + '-01-01'
        this.time3 = this.time3.slice(0,4)+ '-01-01'
        this.axioDline(this.funch)
        this.myChart2 = this.$echarts.init(this.$refs.Pop2)
        this.Line(this.myChart2)
      }else if (num == 'w'){
        this.dataData = []
        this.timeData = []
        this.Line(this.myChart2)
        h.style.background = "#eee"
        h.style.borderBottom = "1px solid #D5D5D5"
        d.style.background = "#eee"
        d.style.borderBottom = "1px solid #D5D5D5"
        s.style.background = "#eee"
        s.style.borderBottom = "1px solid #D5D5D5"
        w.style.background = "#fff"
        w.style.borderBottom = "0px"
        y.style.background = "#eee"
        y.style.borderBottom = "1px solid #D5D5D5"
        m.style.background = "#eee"
        m.style.borderBottom = "1px solid #D5D5D5"
        this.Ddata = 'date'
        this.Dtime = '选择日期'
        this.yType = 28
        this.ti2(672)
        this.timeS(24)
        this.funch = 'HMI_GetArchivedWeekData'
        this.time1 = this.time1.slice(0,10)
        this.time3 = this.time3.slice(0,10)
        this.axioDline(this.funch)
        this.myChart2 = this.$echarts.init(this.$refs.Pop2)
        this.Line(this.myChart2)
      }
    },
    //排序
     compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
      },
    //加入变量   主页面也有加入变量
    JoinVarFun(){
      this.arrFun1()
      let arr  = []
      arr = new Set(this.arr)
      arr = [...arr]
      this.varArr = arr
      this.msgHub2 = window.$.connection.redisMonitor
      if(this.msgHub2){
        this.msgHub2.server.addVariables(arr)
      }  
    },
   //数值颜色变量
   arrFun1(){
        this.data = this.dae 
        this.colorArr = []
        var AnimationList = this.data.Data.DataStatusTextColorEffectAnimationList
        for(var i=0;i<AnimationList.length;i++){
            var a = this.cla.indexOf(AnimationList[i].ElementName)
              if(a != -1){
                var arra = {
                  Color: AnimationList[i].Color,
                  Condition: AnimationList[i].Condition,
                  Compare: AnimationList[i].Compare,
                  TagName: AnimationList[i].TagName,
                  ElementName: AnimationList[i].ElementName,
                  NO:AnimationList[i].NO
                }
                this.colorArr.push(arra)
              }     
          this.arr = []
          this.colorArr = this.colorArr.sort(this.compare('NO'))
          for(var d=0;d<this.colorArr.length;d++){
            this.arr.push(this.colorArr[d].TagName)
          }
        }
   },
    //条件判断方法
    judgeFun1(data){
       var ColorAnimationList = this.colorArr
             var aa
             this.ElementNameHas = ['1']   
             if(data.length == 0){
               return
             }else{
               for(let i=0;i<data.length;i++){
                 if(data[i].Value != null){
                    var result
                    var resValue
                    var Runsymbol
                    var ArrValue
                     var resValueNumber = data[i].Value
                    resValue = data[i].Value.toLowerCase()
                    ArrValue = ColorAnimationList[i].Compare.toLowerCase()
                    Runsymbol = ColorAnimationList[i].Condition
                     if(resValue == 'TRUE' || resValue == 'True' || resValue == 'true'){
                          resValue = 1
                      }else if(resValue == 'FALSE' || resValue =='False' || resValue =='false'){
                          resValue = 0
                      }else if(isNaN(resValueNumber)&&!isNaN(Date.parse(resValueNumber))){
                            resValue = data[i].Value
                      }else if(typeof(Number(resValueNumber)) == 'number'&&Number(resValueNumber)){
                        resValue = Number(data[i].Value)
                      }else{
                        resValue = data[i].Value
                      }
                      if(ArrValue == 'TRUE' || ArrValue == 'True' || ArrValue == 'true' ){
                          ArrValue =  1
                      }else if(ArrValue == 'FALSE' || ArrValue =='False' || ArrValue =='false'){
                        ArrValue =  0
                      }
                      else if(isNaN(resValueNumber)&&!isNaN(Date.parse(resValueNumber))){
                            ArrValue =  ColorAnimationList[i].Compare
                      }else if(typeof(Number(resValueNumber)) == 'number'&&Number(resValueNumber)){
                        ArrValue = Number( ColorAnimationList[i].Compare)
                      }else{
                        ArrValue =  ColorAnimationList[i].Compare
                      }
                      if(Runsymbol == '=='){
                        result = resValue == ArrValue ? true :false 
                      }else if(Runsymbol == '>'){
                        result = resValue > ArrValue ? true :false 
                      }else if(Runsymbol == '<'){
                        result = resValue < ArrValue ? true :false 
                      }else if(Runsymbol == '<='){
                        result = resValue <= ArrValue ? true :false 
                      }else if(Runsymbol == ">="){
                        result = resValue >= ArrValue ? true :false 
                      }else if(Runsymbol == '!='){
                        result = resValue != ArrValue ? true :false 
                      }
                      var continue1 = false
                      var dd = this.ElementNameHas.indexOf(ColorAnimationList[i].ElementName)
                      if(dd != -1){
                        continue;
                      }
                     var cla = ColorAnimationList[i].ElementName
                    
                     if(result){
                        this.ElementNameHas.push(ColorAnimationList[i].ElementName)
                        aa = '.aa' + cla
                         for(let e=0;e<this.data.Data.DataAnimationList.length;e++){
                        
                              if(this.data.Data.DataAnimationList[e].ElementName == ColorAnimationList[i].ElementName){
                                var HasColor = this.data.Data.DataAnimationList[e].HasColorEffect
                              }
                        }
                        if(HasColor){
                          document.querySelector(aa).style.color =  ColorAnimationList[i].Color
                        }
                  }else{
                      aa = '.aa' + cla
                       for(let e=0;e<this.data.Data.DataAnimationList.length;e++){
                              if(this.data.Data.DataAnimationList[e].ElementName == ColorAnimationList[i].ElementName){
                                var HasColor1 = this.data.Data.DataAnimationList[e].HasColorEffect
                              }
                        }
                        if(HasColor1){
                          for(var f=0;f<this.textblockData.length;f++){
                            if(this.textblockData[f].Name == cla){
                                 var color = JSON.parse(this.textblockData[f].PropertyList.Foreground) 
                              document.querySelector(aa).style.color = '#' + color.Data.Color.slice(3) + color.Data.Color.slice(1,3)
                            }
                          }
                        }
                  }
                 }else{
                      var cla1 = ColorAnimationList[i].ElementName
                        aa = '.aa' + cla1
                         for(var d=0;d<this.textblockData.length;d++){
                            if(this.textblockData[d].Name == cla){
                                var color1 =  this.textblockData[d].PropertyList.Foreground
                              document.querySelector(aa).style.color = '#' + color1.slice(3) + color1.slice(1,3)
                            }
                          }
                 }
               }
             }
    },

  // 数值颜色
  axioColor(){
    this.resData = []
    this.arrFun1()
     //请求接口
        this.$axios({
              method: 'post',
              url: '/api/Base/PostRediusTest',
              data: this.arr
        }).then(res => {
          this.resData.push(res.data.data)
          this.judgeFun1(res.data.data)
        })
        .catch(function(error) {
            console.log('err',error);
        });
  },
   //websocket触发该方法
      axioImg2(resArr){
          //防止多次触发
          if(this.arr){
            let index = this.arr.indexOf(resArr.name)
            let resShow = false
            if(index != -1){
              for(let i=0;i<this.resData[0].length;i++){
                if(this.resData[0][i].Name == this.arr[index]){
                  resShow = this.resData[0][i].Value.toString() == resArr.value.toString()?false:true
                }
              }
            }
            if(!resShow){
              return
            }
          }
          //改变值执行方法
          if(this.resData.length){
            for(let z=0;z<this.resData[0].length;z++){
              if(resArr.name == this.resData[0][z].Name){
                this.resData[0][z].Value = resArr.value
              }
            }
            this.judgeFun1(this.resData[0]) 
          }
      },
 //数值变量
  arrFun2(arr){
        this.data = this.dae
        var DataAnima = this.data.Data.DataAnimationList
        this.digit = []
        this.textBbockArr = []
        this.textBType = []
        for(var i=0;i<this.data.Data.DataAnimationList.length;i++){
          var a = this.cla.indexOf(this.data.Data.DataAnimationList[i].ElementName)
           if(a != -1){
               arr.push(this.data.Data.DataAnimationList[i].TagName)
               this.digit.push(this.data.Data.DataAnimationList[i].DecimalCount)
               this.textBbockArr.push(this.data.Data.DataAnimationList[i].ElementName)
               this.textBType.push(this.data.Data.DataAnimationList[i].TagDataType)
           }     
        }
        return arr
  },
   //条件判断方法
  judgeFun3(data){
      if(data == []){
        var  textBox = document.querySelectorAll('.aaDataTextBlock121aa')
        for(var d=0;d<textBox.length;d++){
          textBox[d].innerHTML = "???"
        }
      }
      if(data.length){
        for(var i=0;i<this.textBbockArr.length;i++){
            if(data[i].Value != null){
              var Dom = '.aa' + this.textBbockArr[i]
              if(this.digit[i] != null && this.digit[i].length != 0){
              var fix = Number(this.digit[i])
              var num = data[i].Value
              Number(num).toFixed(fix)
                    document.querySelector(Dom).innerHTML =   this.getPointNum(Number(num),fix)
              }else{
                  var num1 = data[i].Value
                  var value = /Date/
                  var valueShow = value.test(num1)
                    if(valueShow){
                        var index = num1.search("-")
                        var value2 = num1.slice(6,index-3)
                        var time = this.timestampToTime(value2)
                        if(this.textBType[i] == this.lang['日期时间']){
                          document.querySelector(Dom).innerHTML = this.$moment(time).format('YYYY/MM/DD hh:mm:ss')
                        }else if(this.textBType[i] == this.lang['日期']){
                            document.querySelector(Dom).innerHTML =this.$moment(time).format('YYYY/MM/DD')
                        }else if(this.textBType[i] == this.lang['时间']){
                            document.querySelector(Dom).innerHTML = this.$moment(time).format('hh:mm:ss')
                          }else{
                            document.querySelector(Dom).innerHTML = time
                          }
                    }else{
                      document.querySelector(Dom).innerHTML = data[i].Value
                    }
              }
            }else{
              var Dom2 = '.aa' + this.textBbockArr[i]
              document.querySelector(Dom2).innerHTML = "???"
            }
        }
      }
  },
  //数值请求
      axio(){
        this.arr3 = []
        this.resData3 = []
        this.arr3 = this.arrFun2(this.arr3)
        //请求接口
        this.$axios({
            method:"post",
            url:"/api/Base/PostRediusTest?varNameString=" + name,
            data:this.arr3
        }).then((res)=>{
          this.resData3.push(res.data.data)
          this.judgeFun3(res.data.data)
        }).catch(function (error) {
            console.log('err',error);
        })
      },
      //websocket触发该方法
      axioImg3(resArr){
        //防止多次触发
        if(this.arr3){
          let index = this.arr3.indexOf(resArr.name)
          let resShow = false
          if(index != -1){
            for(let i=0;i<this.resData3[0].length;i++){
              if(this.resData3[0][i].Name == this.arr3[index]){
                resShow = this.resData3[0][i].Value.toString() == resArr.value.toString()?false:true
              }
            }
          }
          if(!resShow){
            return
          }
        }
        //改变值执行方法
        if(this.resData3.length){
          for(let z=0;z<this.resData3[0].length;z++){
            if(resArr.name == this.resData3[0][z].Name){
              this.resData3[0][z].Value = resArr.value
            }
          }
          this.judgeFun3(this.resData3[0]) 
        }
      },

 //标题请求
      axiotitle(){
        this.data = this.dae
        for(var i=0;i<this.data.Data.DataAnimationList.length;i++){
           if(this.data.Data.DataAnimationList[i].ElementName == this.textClass ){
              var name = this.data.Data.DataAnimationList[i].TagName
              var TagName = this.data.Data.DataAnimationList[i].TagName
              var TagNameType = TagName.slice(TagName.length-3)
              this.$axios({
              method:"post",
              url:"/api/HMI/HMI_GstVariableName?argVariableName=" + name,
              data:{
                argVariableName:name
              }
              }).then((res)=>{
                this.tagTypeName = res.data.data

                 this.$axios({
                  method:"post",
                  url:"/api/HMI/HMI_GstCurveTitle?argVariableName=" + this.tagTypeName,
                  data:{
                    argVariableName:this.tagTypeName
                  }
              }).then((res)=>{
                  this.windowText = res.data.data
                    if(this.type == 1){
                        if(TagNameType == 'Day'){
                              this.showdata2('d')
                        }else if(TagNameType == 'our'){
                              this.showdata2('h')
                        }else if(TagNameType == 'eek'){
                              this.showdata2('w')
                        }else if(TagNameType == 'nth'){
                              this.showdata2('m')
                        }else if(TagNameType == 'ear'){
                              this.showdata2('y')
                        }else if(TagNameType == 'ter'){
                              this.showdata2('s')
                        }
                      }
                }).catch(function (error) {
                      console.log('err',error);
                  })
            }).catch(function (error) {
                  console.log('err',error);
              })
           }
        }
      },

    //天曲线请求
     axioline(){
        this.data = this.dae
         for(var i=0;i<this.data.Data.DataAnimationList.length;i++){
           if(this.data.Data.DataAnimationList[i].ElementName == this.textClass ){
              var name = this.data.Data.DataAnimationList[i].TagName
               this.$axios({
                  method:"post",
                  url:"/api/HMI/HMI_GstVariableName?argVariableName=" + name,
                  data:{
                    argVariableName:name
                  }
              }).then((res)=>{
                this.tagTypeName = res.data.data
                var aaa =typeof(this.time2)
                if(aaa == 'object'){
                  this.endTime2(0,this.time2)
                }
                var stime = this.time2
                var etime = this.time1
                this.$axios({
                    method:"post",
                    url:"/api/HMI/HMI_GstHistoryData?argStartTime="+ stime + "&argEndTime="+ etime + "&argVariableName=" + this.tagTypeName,
                    data:{
                      argStartTime:stime,
                      argEndTime:etime,
                      argVariableName:this.tagTypeName
                    }
                }).then((res)=>{
                    this.dataData = res.data.data.data[0].data
                    this.timeData = res.data.data.time.data
                    this.myChart = this.$echarts.init(this.$refs.Pop)
                      this.Line(this.myChart)
                }).catch(function (error) {
                    console.log('err',error);
                })
              }).catch(function (error) {
                    console.log('err',error);
              })
           }
         }
     },

      //日月的曲线请求
      axioDline(func){
        this.data = this.dae
        for(var i=0;i<this.data.Data.DataAnimationList.length;i++){
           if(this.data.Data.DataAnimationList[i].ElementName == this.textClass ){
              var name = this.data.Data.DataAnimationList[i].TagName
               this.$axios({
                  method:"post",
                  url:"/api/HMI/HMI_GstVariableName?argVariableName=" + name,
                  data:{
                    argVariableName:name
                  }
              }).then((res)=>{
                this.tagTypeName = res.data.data
                var st = this.time1
                var et = this.time3
                this.$axios({
                    method:"post",
                    url:"/api/HMI/" + func + "?argStartTime="+ et + "&argEndTime="+ st + "&argVariableName=" + this.tagTypeName,
                    data:{
                      argStartTime:et,
                      argEndTime:st,
                      argVariableName:this.tagTypeName
                    }
                }).then((res)=>{
                    if(Object.values(res.data.data) != []){
                          this.dataData = []
                          this.timeData = []
                          this.timeData=Object.keys(res.data.data)
                          this.dataData=Object.values(res.data.data)
                          this.myChart2 = this.$echarts.init(this.$refs.Pop2)
                          this.Line(this.myChart2)
                    }else{
                      this.dataData = []
                      this.timeData = []
                      this.timeData=Object.keys(res.data.data)
                      this.dataData=Object.values(res.data.data)
                        this.myChart2 = this.$echarts.init(this.$refs.Pop2)
                        this.Line(this.myChart2)
                    }
                }).catch(function (error) {
                        console.log('err',error);
                })
              }).catch(function (error) {
                  console.log('err',error);
              })
           }
        }
      },
         //赋值
        gitValue(){
         this.dataValue = []
         for(let i=0;i<this.textblockData.length;i++){
            var ZIndexs = this.data.Data.ZIndexs  //加层级zIndex
            if(ZIndexs){
              for(let item1 in ZIndexs){
                if(this.textblockData[i].Name == item1){
                  this.ZIndex = ZIndexs[item1]
                  break
                }
              }
            }else{
              this.ZIndex = ''
            }
            var foreOp 
            var foreColor
            var backOp
            var backColor
            var borderColor
            //渐变色变量
            var foregoundArr = JSON.parse(this.textblockData[i].PropertyList.Foreground)
            var backgroundArr = JSON.parse(this.textblockData[i].PropertyList.Background)
            var borderbrushArr = JSON.parse(this.textblockData[i].PropertyList.BorderBrush)
            var lagel
            var gradient
            var lagel1
            var gradient1
            var lagel2
            var gradient2
            var clipText
            var backgroundColor
            //阴影
            var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
            var InnerShadow
            var OuterShadow
            var Shadow
             //待优化
             //阴影
            Shadow = ''
            if(borderSadow.InnerShadow != undefined){
                InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                            + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                            + borderSadow.InnerShadow.Color + ' inset'
            }else{
                InnerShadow = ''
            }
            if(borderSadow.OuterShadow != undefined){
                OuterShadow = borderSadow.OuterShadow.OffsetX + 'px ' +  borderSadow.OuterShadow.OffsetY 
                            + 'px ' +  borderSadow.OuterShadow.BlurRadius.toFixed(0) + 'px ' 
                            + borderSadow.OuterShadow.Color
            }else{
                OuterShadow = ''
            }
              if(InnerShadow.length && OuterShadow.length){
                Shadow = InnerShadow + ',' + OuterShadow
            }else if(InnerShadow.length == 0){
                Shadow = OuterShadow
            }else if(OuterShadow.length == 0){
                Shadow = InnerShadow
            }
              //边框色渐变
               if(borderbrushArr.ColorType == 'SolidColor'){
                   borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
               }else{
                       borderColor = ''
                       lagel1 = borderbrushArr.Data.Angel.toFixed(0)
                   for(var f1=0;f1<borderbrushArr.Data.GradientStops.length;f1++){
                       gradient1 = borderbrushArr.Data.GradientStops[f1]
                       borderColor = borderColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                   }
                       borderColor = '-webkit-linear-gradient('+lagel1+'deg'+borderColor+')';
               }
             //背景色渐变
            if(backgroundArr.ColorType == 'SolidColor'){
                backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                 if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                    borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                }
            }else{
                    backColor = ''
                    lagel = backgroundArr.Data.Angel.toFixed(0)
                for(var h1=0;h1<backgroundArr.Data.GradientStops.length;h1++){
                    gradient = backgroundArr.Data.GradientStops[h1]
                    backColor = backColor + ',' + gradient.Color + ' ' + (gradient.Offset*100).toFixed(0) + '%'
                }
                    backColor = '-webkit-linear-gradient('+lagel+'deg'+backColor+')';
            }
                //字体颜色渐变
                if(foregoundArr.ColorType == 'SolidColor'){
                        foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
                        clipText = 'none'
                        backgroundColor = 'none'
                }else{
                        foreColor = '#000'
                        clipText = 'text'
                        backgroundColor = ''
                        lagel2 = foregoundArr.Data.Angel.toFixed(0)
                    for(var g=0;g<foregoundArr.Data.GradientStops.length;g++){
                        gradient2 = foregoundArr.Data.GradientStops[g]
                        backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                    }
                        backgroundColor = '-webkit-linear-gradient('+lagel2+'deg'+backgroundColor+')';
                }
                  if(this.textblockData[i].PropertyList.BorderThickness == '0'){
                  borderColor = 'transparent'
                }
                var value = {
                  width:this.textblockData[i].PropertyList.Width,
                  height:this.textblockData[i].PropertyList.Height,
                  rotate:this.textblockData[i].PropertyList.RotateAngle,
                  top:this.textblockData[i].PropertyList.Top,
                  left:this.textblockData[i].PropertyList.Left,
                  opacity:this.textblockData[i].PropertyList.Opacity / 100,
                  family:this.textblockData[i].PropertyList.FontFamily,
                  Foreground: foreColor,
                  Background:backColor,
                  FontSize:this.textblockData[i].PropertyList.FontSize,
                  class:this.textblockData[i].Name,
                  BorderBrush:borderColor,
                  BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                  Shadow:Shadow,
                  Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                  TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                  ZIndex:this.ZIndex,
                  text:this.Sarr.includes(this.textblockData[i].Name)?'Loading...':'数值显示'
                }
                this.dataValue.unshift(value)
          }
        },

        // 双击出现弹窗方法
        dbClickPop(dateArr){
              if(dateArr.IsDoubleClickShowLine){
                     //下发事件
                    var name = dateArr.TagName
                      this.$axios({
                    method:"post",
                    url:"/api/HMI/HMI_GstVariableName?argVariableName=" + name,
                    data:{
                      argVariableName:name
                    }
                    }).then((res)=>{
                        this.tagTypeName = res.data.data
                        this.$axios({
                          method:"post",
                          url:"/api/HMI/HMI_GstCurveWindowType?argVariableName=" + name,
                          data:{
                            argVariableName:name
                          }
                          }).then((res)=>{
                            this.type = res.data.data
                            if(res.data.data == 2) {
                              this.dataData = []
                              this.timeData = []
                              this.axiotitle()
                              this.axioline()
                              var window = document.querySelector('.showWindow')
                              window.style.display='block'
                              this.myChart = this.$echarts.init(this.$refs.Pop)
                              this.Line(this.myChart)
                            }else {
                              this.dataData = []
                              this.timeData = []
                              if(this.funch==''){
                                this.ti2(24)
                                this.timeS(24)
                                this.funch = 'HMI_GetArchivedHourData'
                              }
                              this.axiotitle()
                              this.axioDline(this.funch)
                              var window2 = document.querySelector('.showWindow2')
                              window2.style.display='block'
                              this.myChart2 = this.$echarts.init(this.$refs.Pop2)
                              this.Line(this.myChart2)
                            }
                          }).catch(function (error) {
                        })
                    }).catch(function (error) {
                      console.log('err',error)
                    })
                  }
        },

        //天数点击
      open(index,cl,item){
      setTimeout(()=>{
        this.textClass = cl
        this.index = this.cla.indexOf(cl)
        this.data = this.dae
        var EventScriptList = this.data.Data.EventScriptList
        var EventType = []
        var Typearr = []
        if(this.data.Data.DataAnimationList.length == 0){
            this.jurisdictionShow(item).then(val => { 
                  if(this.CanExcuteShow){
                     this.commerPopShow1 = true
                      return
                  }else{
                      //脚本事件
                      for(var i2=0;i2<EventScriptList.length;i2++){
                            if(item.class == EventScriptList[i2].ElementName && EventScriptList[i2].EventType == 'MouseDoubleClick'){
                                EventType.push(EventScriptList[i2])
                            }
                      }
                        if(EventType.length){
                                  for(var j2=0;j2<EventType.length;j2++){
                                      Typearr.push(EventType[j2].Script)
                                    }
                                  this.$parent.scriptData(Typearr,'','','','','')
                        }
                  }
            })
        }
         for(let i=0;i<this.data.Data.DataAnimationList.length;i++){
             if(this.data.Data.DataAnimationList[i].ElementName == this.textClass ){
               this.jurisdictionShow(item).then(val => { 
                 if(this.CanExcuteShow){
                    this.commerPopShow1 = true
                     return
                 }else{
                   //脚本事件
                   for(var i2=0;i2<EventScriptList.length;i2++){
                         if(item.class == EventScriptList[i2].ElementName && EventScriptList[i2].EventType == 'MouseDoubleClick'){
                             EventType.push(EventScriptList[i2])
                         }
                   }
                     if(EventType.length){
                               for(var j2=0;j2<EventType.length;j2++){
                                   Typearr.push(EventType[j2].Script)
                                 }
                               this.$parent.scriptData(Typearr,'数值显示',item,'',this.data.Data.DataAnimationList[i],'')
                     }else{
                        this.dbClickPop(this.data.Data.DataAnimationList[i])
                     }

                // if(this.data.Data.DataAnimationList[i].IsDoubleClickShowLine){
                //      //下发事件
                //     var name = this.data.Data.DataAnimationList[i].TagName
                //       this.$axios({
                //     method:"post",
                //     url:"/api/HMI/HMI_GstVariableName?argVariableName=" + name,
                //     data:{
                //       argVariableName:name
                //     }
                //     }).then((res)=>{
                //         this.tagTypeName = res.data.data
                //         this.$axios({
                //           method:"post",
                //           url:"/api/HMI/HMI_GstCurveWindowType?argVariableName=" + name,
                //           data:{
                //             argVariableName:name
                //           }
                //           }).then((res)=>{
                //             this.type = res.data.data
                //             if(res.data.data == 2) {
                //               this.dataData = []
                //               this.timeData = []
                //               this.axiotitle()
                //               this.axioline()
                //               var window = document.querySelector('.showWindow')
                //               window.style.display='block'
                //               this.myChart = this.$echarts.init(this.$refs.Pop)
                //               this.Line(this.myChart)
                //             }else {
                //               this.dataData = []
                //               this.timeData = []
                //               if(this.funch==''){
                //                 this.ti2(24)
                //                 this.timeS(24)
                //                 this.funch = 'HMI_GetArchivedHourData'
                //               }
                //               this.axiotitle()
                //               this.axioDline(this.funch)
                //               var window2 = document.querySelector('.showWindow2')
                //               window2.style.display='block'
                //               this.myChart2 = this.$echarts.init(this.$refs.Pop2)
                //               this.Line(this.myChart2)
                //             }
                //           }).catch(function (error) {
                //         })
                //     }).catch(function (error) {
                //       console.log('err',error)
                //     })
                //   }

                }  
              })
          }else{
            //脚本事件
              for(var i3=0;i3<EventScriptList.length;i3++){
                    if(item.class == EventScriptList[i3].ElementName && EventScriptList[i3].EventType == 'MouseDoubleClick'){
                        EventType.push(EventScriptList[i3])
                    }
              }
              if(EventType.length){
                this.jurisdictionShow(item).then(val => { 
                    if(this.CanExcuteShow){
                            this.commerPopShow1 = true
                            return
                      }else{
                        for(var j3=0;j3<EventType.length;j3++){
                            Typearr.push(EventType[j3].Script)
                          }
                        this.$parent.scriptData(Typearr,'','','','','')
                      }
                });
              }
          }
         }
      },200)
    },
    // 日月点击
     openBox(){
        if(this.type == 2){
          var window = document.querySelector('.showWindow')
          window.style.display='none'
        }else{
          var window2 = document.querySelector('.showWindow2')
          window2.style.display='none'
        }
    },
    }
}
</script>
<style lang="scss">
.DataTextBlockaa12aa{
  .el-date-editor.el-input{
    height: 42px !important;
    border:1px solid #e2e2e2
  }
}
</style>
<style lang="scss" scoped>
.aaDataTextBlock121aa{
  display: inline-block;
    user-select:none;
    cursor: pointer;
    box-sizing: border-box;
}
.DataTextBlock121aa1:hover{
  background-color: #BEE6FD !important;
  background: #BEE6FD !important;
}
 .showWindow2,
 .showWindow{
  position: absolute;
  top:200px;
  left:0;
  right:0;
  // bottom:0;
  margin:auto;
  z-index:2147483647;
  width:840px;
  height:600px;
  background-color:#fff; 
  box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.6);
  display: none;
  .show_head {
    width:100%;
    height:45px;
    background:#386DF0;
    text-align: center;
    line-height: 45px;
    color:#fff;
    font-size: 14px;
    .box{
      position: absolute;
      top: 12px;
      right:10px;
      font-size:24px;
    }
  }
  .show_date{
    width:100%;
    height:45px;
    overflow: hidden;
    background: #eee;
    .show_one{
      float: left;
      width:17%;
      height:45px;
      background:#fff;
      text-align: center;
      line-height: 45px;
      cursor: pointer;
    }
    .show_three{
      float: left;
      width:17%;
      height:45px;
      background:#EEEEEE;
      text-align: center;
      line-height: 45px;
      border-left: 1px solid #D5D5D5;
      border-right: 1px solid #D5D5D5;
      border-bottom: 1px solid #D5D5D5;
      cursor: pointer;
    }
    .show_seven{
      float: left;
      width:17%;
      height:45px;
      background:#EEEEEE;
      text-align: center;
      line-height: 45px;
      border-bottom: 1px solid #D5D5D5;
      border-right: 1px solid #D5D5D5;
      cursor: pointer;
    }
    .show_h{
      float: left;
      width:17%;
      height:45px;
      background:#fff;
      text-align: center;
      line-height: 45px;
      border-right: 1px solid #D5D5D5;
      cursor: pointer;
    }
    .show_d{
      float: left;
      width:14%;
      height:45px;
      background:#EEEEEE;
      text-align: center;
      line-height: 45px;
      border-bottom: 1px solid #D5D5D5;
      border-right: 1px solid #D5D5D5;
      cursor: pointer;
    }
    .show_w{
      float: left;
      width:14%;
      height:45px;
      background:#EEEEEE;
      text-align: center;
      line-height: 45px;
      border-bottom: 1px solid #D5D5D5;
      border-right: 1px solid #D5D5D5;
      cursor: pointer;
    }
    .show_m{
      float: left;
      width:14%;
      height:45px;
      background:#EEEEEE;
      text-align: center;
      line-height: 45px;
      border-bottom: 1px solid #D5D5D5;
      border-right: 1px solid #D5D5D5;
      cursor: pointer;
    }
    .show_s{
      float: left;
      width:14%;
      height:45px;
      background:#EEEEEE;
      text-align: center;
      line-height: 45px;
      border-bottom: 1px solid #D5D5D5;
      border-right: 1px solid #D5D5D5;
      cursor: pointer;
    }
    .show_y{
      float: left;
      width:14%;
      height:45px;
      background:#EEEEEE;
      text-align: center;
      line-height: 45px;
      border-bottom: 1px solid #D5D5D5;
      border-right: 1px solid #D5D5D5;
      cursor: pointer;
    }
  }
  .show_screen{
    width:100%;
    height:45px;
    overflow: hidden;
    margin-top:15px;
    .block_two{
      float: left;
    }
    .block_one{
      float: left;
      margin:0 15px;
    }
    .left{
      display: inline-block;
      float: left;
      position: relative;
      padding:8px 5px;
      background:#F3F3F3;
      left:0;
      font-size: 24px;
      margin-left:45px;
      color:#608BF3;
    }
    .middle{
      display: inline-block;
      float: left;
      position: relative;
      padding:8px 5px;
      background:#F3F3F3;
      left: 0;
      color:#608BF3;
      font-size:24px;
      margin-right:15px;
    }
    .right{
      display: inline-block;
      float: left;
      position: relative;
      padding:8px 5px;
      background:#F3F3F3;
      left:0;
      font-size: 24px;
      margin-left:15px;
      color:#608BF3;
    }

    .botton{
      float: left;
      border-radius: 2px;
      text-align: center;
      height:40px;
      width:100px;
      line-height: 40px;
      margin-left:20px;
      color:#fff;
      background:#4270E4;
    }
  }
   .echarts_box{
     width:97%;
     height:410px;
     border:1px solid #CCCCCC;
     position: relative;
     margin:0 auto;
     margin-top:30px;
  .echarts{
    position: absolute;
    width:100%;
    height:400px;
    margin: 0 auto;
  }
   }
}
 .commerPop_outPop{
     width:360px;
     height:190px;
     box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.1);
     position: absolute;
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
</style>
