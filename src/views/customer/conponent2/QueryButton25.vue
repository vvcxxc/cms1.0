<!--
 * @Description: 这是查询按钮页面（组件）
 * @Date: 2020-05-14 16:23:20
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-03 13:43:09
 -->

<template>
<div>
   <div v-for="(item,index) in dataValue" :key="index">
  <div
      v-if="show" name="querybutton"
       @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
       @click="search(item,$event)" v-show="item.QueryShow" :class="item.class" class="querybutton25a" 
      :style="'position:absolute;' + 'left:' + item.left + 'px; top:' + item.top 
      + 'px; boxSizing:border-box; text-align:center; line-height:' + (item.height - item.BorderThickness*2) 
      + 'px; width:'+ item.width + 'px; height:'+ item.height + 'px; borderRadius:' 
      + item.radiusLeft + 'px ' + item.radiusTop + 'px ' + item.radiusRight + 'px ' 
      + item.radiusButton + 'px; fontFamily:'+ item.family + '; fontSize:'+ item.fontSize 
      + 'px; opacity:' + item.opacity + '; background:' + item.BorderBrush + '; transform:rotate(' 
      + item.rotate + 'deg);padding:' + item.BorderThickness + 'px;overflow:hidden;white-space:nowrap;boxShadow:'+item.Shadow +';zIndex:'+item.ZIndex "> 

      <span class="contenText" :style="'position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;line-height:'
      +item.height + 'px;color:'+item.Foreground +';fontWeight:'+item.Blod + ';background:'+item.backgroundColor
      +';-webkit-background-clip:'+item.clipText">{{item.text}}</span>

      <div class="conten" :style="'width:100%;height:100%;background:' + item.Background + ';borderRadius:' 
        + (Number(item.radiusLeft) -1) + 'px ' + (Number(item.radiusTop) -1) + 'px ' + (Number(item.radiusRight) -1) + 'px ' 
        + (Number(item.radiusButton) -1) + 'px;boxShadow:' + item.Shadow2">
       
      </div>

        <div class="pressButton_box"></div>
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

import {cron} from 'vue-cron'

export default {
  
  data() {
    return {
      text: "",
      height: 0,
      width: 0,
      bd: 2,   //未知
      left: 0,
      top: 0,
      fontSize: 0,
      family: "",
      radiusLeft: 0,
      radiusTop: 0,
      radiusRight: 0,
      radiusButton: 0,
      opacity: 0,
      rotate:0,
      BorderBrush: "",
      Background: '',
      Foreground:'',
      show:true,
      textblockData:[],
      dataValue:[],
      commerPopShow1:false,
      ZIndex:'',
       Typearr:'',
      itemData:''
    };
  },
  props:['dae','dataId','PageName'],
    watch:{
      dae:{
        deep:true,
        handler(val){
          this.data = val;
          if(val){
            this.init();
          }
        }
      }
    },
  created() {
    this.data = this.dae
      this.Name = 'querybutton'
    if(this.data){
      this.init()
    }
  },
  methods: {
   
    init(){
        //数据筛选
        this.dataValue = []
        this.textblockData = []
        var dataAll = this.data.Controls.ControlList
        for(var i=0;i<dataAll.length;i++){
          if(dataAll[i].ControlType == this.Name){
            this.textblockData.push(dataAll[i])
            }
        }
        if(this.textblockData.length!=0){
            this.show = true
        }else{
            this.show = false
        }
        //赋值
        if(this.show){
            this.gitValue()
        }

       
      for(let i=0;i<this.dataValue.length;i++){
          this.searchData(this.dataValue[i],1)
      }

    },
    
    //初始化查询
    searchFun(){
      for(let i=0;i<this.dataValue.length;i++){
          
          this.searchData(this.dataValue[i],1)
      }
    },

    //确认
    Jurisdiction(){
      this.commerPopShow1 = false
    },
    //权限配置请求接口
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
                this.$axios({                      
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
       this.itemData = item
       clearTimeout(this.timeoutID);
       var self = this
       var EventScriptList = this.data.Data.EventScriptList
       var EventType = []
       var EventType1 = []
       this.Typearr  = []
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
                      this.Typearr.push(EventType[j].Script)
                    }
                    self.$parent.scriptData(this.Typearr,'','','','','')
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
                             this.Typearr.push(EventType1[j1].Script)
                           }
                         self.$parent.scriptData(this.Typearr,'','','','','')
                        }
                    });
                  }
           }
        },200)
     },
     //鼠标按下
     downClick(item,e){
       this.itemData = item
        // clearTimeout(this.timeoutID);
        var self = this
        var EventScriptList = this.data.Data.EventScriptList
        var EventType = []
        var EventType1 = []
        this.Typearr = []
        for(var i=0;i<EventScriptList.length;i++){
           if(item.class == EventScriptList[i].ElementName 
              && EventScriptList[i].EventType == 'MouseLeftButtonDown'){
              EventType.push(EventScriptList[i])
           }else if(item.class == EventScriptList[i].ElementName 
                    && EventScriptList[i].EventType == 'MouseRightButtonDown'){
                      EventType1.push(EventScriptList[i])
                    }
        }
        // this.timeoutID = window.setTimeout(function() {
          if(e.which == 1){   //鼠标左键按下
              if(EventType.length){
                self.jurisdictionShow(item).then(val => { 
                     if(self.CanExcuteShow){
                        self.commerPopShow1 = true
                        return
                    }else{
                      for(var j=0;j<EventType.length;j++){
                       this.Typearr.push(EventType[j].Script)
                     }
                    self.$parent.scriptData(this.Typearr,'','','','','')
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
                            this.Typearr.push(EventType1[j1].Script)
                        }
                      self.$parent.scriptData(this.Typearr,'','','','','')
                      }
                  });
               }
          }
        // },200)
     },
     //鼠标双击
     opendb(item){
       // clearTimeout(this.timeoutID);
       setTimeout(()=>{
         this.itemData = item
           var EventScriptList = this.data.Data.EventScriptList
           var EventType = []
           this.Typearr = []
           for(var i=0;i<EventScriptList.length;i++){
                if(item.class == EventScriptList[i].ElementName && EventScriptList[i].EventType == 'MouseDoubleClick'){
                    EventType.push(EventScriptList[i])
                }
           }
            if(EventType.length){
              this.jurisdictionShow(item).then(val => { 
                   if(this.CanExcuteShow){
                          this.commerPopShow1 = true
                          return
                    }else{
                      for(var j=0;j<EventType.length;j++){
                          this.Typearr.push(EventType[j].Script)
                        }
                      this.$parent.scriptData(this.Typearr,'','','','','')
                    }
              });
            }
       },200)
     },

     //整合对象
     ChartsTimingArr(data){
            var timevalue = this.$parent.$refs.aaDateTimePicker282.TimeValueFun()
            var comboboxvalue = this.$parent.$refs.aaCombobox299.TimeValueFun()
            var Numbervalue = this.$parent.$refs.NumberScreen30.TimeValueFun()
            var textimportvalue = this.$parent.$refs.aatextimport27a.TimeValueFun()
            //兄弟组件整合对象
            let Controls = []
            if(data.Controls){
              for(let key in data.Controls){        //获取控件名
                  Controls.push(data.Controls[key])
              }
            }
            if(data.FilterControls){
              for(let i=0;i<data.FilterControls.length;i++){
                   Controls.push(data.FilterControls[i])
              }
            }
           
            for(let j=0;j<timevalue.length;j++){      //时间
              let index = Controls.indexOf(timevalue[j].name)
              if(index != -1){
                    let name = timevalue[j].name
                    let val = timevalue[j].value
                    let o = {};
                    let str = "o."+name+"={Value: '"+ val +"'}";
                    eval(str);
                    Object.assign(this.Controls2,o);
              }
            }

            for(let k=0;k<comboboxvalue.length;k++){    //文本下拉
              let index = Controls.indexOf(comboboxvalue[k].name)
              if(index != -1){
                    let name = comboboxvalue[k].name
                    let val = comboboxvalue[k].value
                    let o1 = {};
                    let str = "o1."+name+"={Value: '"+ val +"'}";
                    eval(str);
                    Object.assign(this.Controls2,o1);
              }
            }
            for(let g=0;g<Numbervalue.length;g++){    //筛选
              let index =Controls.indexOf(Numbervalue[g].name)
              if(index != -1){
                let name = Numbervalue[g].name
                let val = Numbervalue[g].value1
                let val1 = Numbervalue[g].value2
                let type = Numbervalue[g].type
                let o2 = {};
                let str = "o2."+name+"={Value1: '"+ val +"',Value2:'"+ val1 +"',Type:'"+ type +"'}";
                eval(str);
                Object.assign(this.Controls2,o2);
              }
            }
            for(let h=0;h<textimportvalue.length;h++){     //文本输入
              let index = Controls.indexOf(textimportvalue[h].name)
              if(index != -1){
                let name = textimportvalue[h].name
                let val = textimportvalue[h].value
                let type = textimportvalue[h].type
                let o3 = {}
                let str = "o3."+name+"={Value: '"+ val +"',Type:'"+type+"'}";
                eval(str);
                Object.assign(this.Controls2,o3);
              }
            }
     },

     searchData(item,it){

         if(this.CanExcuteShow){
            // if(it !=1){
              this.commerPopShow1 = true
            // }
          }else{
     setTimeout(()=>{
      var Numbervalue = this.$parent.$refs.NumberScreen30.TimeValueFun()
         
      console.log("Numbervalue",Numbervalue)
      //    var timevalue = this.$parent.$refs.DateTimePicker282.TimeValueFun()
      //       var comboboxvalue = this.$parent.$refs.Combobox299.TimeValueFun()
      //       // var Numbervalue = this.$parent.$refs.NumberScreen30.TimeValueFun()
      //       var textimportvalue = this.$parent.$refs.textimport27a.TimeValueFun()
      //  console.log('你的',comboboxvalue)
              this.$emit('search',item,Numbervalue,true)
              })
            // if(it != 1){
             
            // }
            //图表
            this.$axios({                      //控件名请求接口
                method: 'get',
                url: `/api/control/GetChartControlNames?viewName=${this.PageName}`,
              viewName:this.PageName
            }) .then(res => {
                      if(res.data.data.length){
                        this.Controls2 = {}
                        let QueryIndexArr = []
                        for(let i=0;i<res.data.data.length;i++){
                          if(res.data.data[i].Controls.Query == item.class){
                              this.ChartsTimingArr(res.data.data[i])
                          }
                        }
                              this.$parent.queryassignmentFun(item.class,this.Controls2)
                      }
            }) 
          }

     },


    //查询
    search(item,it){
    
        this.jurisdictionShow(item).then(val => { 
          if(this.CanExcuteShow){
            if(it !=1){
              this.commerPopShow1 = true
            }
          }else{
            //自定义报表
             this.$parent.scriptData(this.Typearr,'查询按钮',item,'','',it)
          }   
          });
    },


   timingSearch(PageName,chartName){
      return this.$axios({                      //权限配置请求接口
          method: 'get',
          url: `/api/control/GetChartControlNames?viewName=${PageName}`,
         viewName:chartName
      }) .then(res => {
         if(res.data.data.length){
                   this.Controls2 = {}
                  let initArr = []
                  for(let u=0;u<res.data.data.length;u++){
                    if(res.data.data[u].Controls.Query == chartName){
                      this.ChartsTimingArr(res.data.data[u])
                      for(let key in res.data.data[u].Controls){
                        initArr.push(res.data.data[u].Controls[key])
                      }
                        if(res.data.data[u].FilterControls != null){
                          for(let f=0;f<res.data.data[u].FilterControls.length;f++){
                            initArr.push(res.data.data[u].FilterControls[f])
                          }
                        }
                        var a = new Set(initArr)
                        initArr = [...a]
                    }
                  }
                  this.$parent.$refs.DateTimePicker282.timeInit(initArr)
                  this.$parent.$refs.Combobox299.timeInit(initArr)
                  this.$parent.$refs.NumberScreen30.timeInit(initArr)
                  this.$parent.$refs.textimport27a.timeInit(initArr)
                  
                    return this.Controls2
         }
      })
   },


    //赋值
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

         var PressButtonList = this.data.Data.PressButtonList
         var foreOp
         var foreColor
         var backOp
         var backColor
         var borderOp
         var borderColor
         var radius
          //渐变色变量
        var foregoundArr = JSON.parse(this.textblockData[i].PropertyList.Foreground)
        var backgroundArr = JSON.parse(this.textblockData[i].PropertyList.Background)
        var borderbrushArr = JSON.parse(this.textblockData[i].PropertyList.BorderBrush)
        var lagel1
        var gradient2 
        var lagel2
        var gradient1
        var lagel3
        var gradient3
        var clipText
        var backgroundColor
       //待优化
        //阴影
        var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
        var InnerShadow
        var OuterShadow
        var Shadow
        var Shadow2
         if(PressButtonList.length != 0 ){
           for(var j=0;j<PressButtonList.length;j++){
             if(PressButtonList[j].ElementName == this.textblockData[i].Name){
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
                              +  borderSadow.OuterShadow.Color
              }else{
                  OuterShadow = ''
              }
             if(InnerShadow.length && OuterShadow.length){
                      Shadow = OuterShadow
                      Shadow2 = InnerShadow
                    }else if(InnerShadow.length == 0){
                        Shadow = OuterShadow
                        Shadow2 = ''
                    }else if(OuterShadow.length == 0){
                        Shadow = ''
                        Shadow2 = InnerShadow
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
              //背景色渐变
              if(backgroundArr.ColorType == 'SolidColor'){
                  backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                  if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                        borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                    }
              }else{
                      backColor = ''
                      lagel2 = backgroundArr.Data.Angel.toFixed(0)
                  for(var h2=0;h2<backgroundArr.Data.GradientStops.length;h2++){
                      gradient1 = backgroundArr.Data.GradientStops[h2]
                      backColor = backColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                  }
                      backColor = '-webkit-linear-gradient('+lagel2+'deg'+backColor+')';
              }

              
                for(let w=0;w<this.data.Data.QueryButtonList.length;w++){
                      if(this.data.Data.QueryButtonList[w].ElementName == this.textblockData[i].Name){

                        radius = this.textblockData[i].PropertyList.CornerRadius
                        var value = {
                          width:this.textblockData[i].PropertyList.Width,
                          height:this.textblockData[i].PropertyList.Height,
                          rotate:this.textblockData[i].PropertyList.RotateAngle,
                          top:this.textblockData[i].PropertyList.Top,
                          left:this.textblockData[i].PropertyList.Left,
                          opacity:this.textblockData[i].PropertyList.Opacity / 100,
                          text:this.textblockData[i].PropertyList.Content,
                          fontSize:this.textblockData[i].PropertyList.FontSize,
                          family:this.textblockData[i].PropertyList.FontFamily,
                          BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                          Foreground:foreColor,
                          Background:backColor,
                          BorderBrush:borderColor,
                          radiusLeft :radius.split(",")[0],
                          radiusTop :radius.split(",")[1],
                          radiusRight :radius.split(",")[2],
                          radiusButton :radius.split(",")[3],
                          class:this.textblockData[i].Name,
                          ControlType:PressButtonList[j].ControlType,
                          TagID:PressButtonList[j].TagID,
                          TagName:PressButtonList[j].TagName,
                          backgroundColor:backgroundColor,
                          clipText:clipText,
                          Shadow:Shadow,
                          Shadow2:Shadow2,
                          Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                          QueryShow:this.data.Data.QueryButtonList[w].ExecuteType=='2'?false:true,
                          ZIndex:this.ZIndex
                        }
                           this.dataValue.push(value)

                      }
                }

                  break;
             }else{
               if(j == PressButtonList.length-1){
                  //待优化
                  //阴影
                  Shadow = ''
                  if(borderSadow.InnerShadow != undefined){
                      InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                                  + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                                  +  borderSadow.InnerShadow.Color + ' inset'
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
                      Shadow = OuterShadow
                      Shadow2 = InnerShadow
                    }else if(InnerShadow.length == 0){
                        Shadow = OuterShadow
                        Shadow2 = ''
                    }else if(OuterShadow.length == 0){
                        Shadow = ''
                        Shadow2 = InnerShadow
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
                      for(var g1=0;g1<foregoundArr.Data.GradientStops.length;g1++){
                          gradient2 = foregoundArr.Data.GradientStops[g1]
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
                        for(var f1=0;f1<borderbrushArr.Data.GradientStops.length;f1++){
                            gradient3 = borderbrushArr.Data.GradientStops[f1]
                            borderColor = borderColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
                        }
                            borderColor = '-webkit-linear-gradient('+lagel3+'deg'+borderColor+')';
                    }
                  //背景色渐变
                  if(backgroundArr.ColorType == 'SolidColor'){
                      backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                      if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                        borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
                    }
                  }else{
                          backColor = ''
                          lagel2 = backgroundArr.Data.Angel.toFixed(0)
                      for(var h1=0;h1<backgroundArr.Data.GradientStops.length;h1++){
                          gradient1 = backgroundArr.Data.GradientStops[h1]
                          backColor = backColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                      }
                          backColor = '-webkit-linear-gradient('+lagel2+'deg'+backColor+')';
                  }

                  for(let w=0;w<this.data.Data.QueryButtonList.length;w++){
                      if(this.data.Data.QueryButtonList[w].ElementName == this.textblockData[i].Name){

                        radius = this.textblockData[i].PropertyList.CornerRadius
                        var value5 = {
                          width:this.textblockData[i].PropertyList.Width,
                          height:this.textblockData[i].PropertyList.Height,
                          rotate:this.textblockData[i].PropertyList.RotateAngle,
                          top:this.textblockData[i].PropertyList.Top,
                          left:this.textblockData[i].PropertyList.Left,
                          opacity:this.textblockData[i].PropertyList.Opacity / 100,
                          text:this.textblockData[i].PropertyList.Content,
                          fontSize:this.textblockData[i].PropertyList.FontSize,
                          family:this.textblockData[i].PropertyList.FontFamily,
                          BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                          Foreground:foreColor ,
                          Background:backColor,
                          BorderBrush:borderColor,
                          radiusLeft :radius.split(",")[0],
                          radiusTop :radius.split(",")[1],
                          radiusRight :radius.split(",")[2],
                          radiusButton :radius.split(",")[3],
                          class:this.textblockData[i].Name,
                          ControlType:'',
                          TagID:'',
                          TagName:'',
                          backgroundColor:backgroundColor,
                          clipText:clipText,
                          Shadow:Shadow,
                          Shadow2:Shadow2,
                          Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                          QueryShow:this.data.Data.QueryButtonList[w].ExecuteType=='2'?false:true,
                          ZIndex:this.ZIndex
                        }
                            this.dataValue.push(value5)
                      }
                  }
          
               }
             }
  
  
           }
         }else{
               //待优化
                //阴影
                Shadow = ''
                if(borderSadow.InnerShadow != undefined){
                    InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                                + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                                +  borderSadow.InnerShadow.Color + ' inset'
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
                      Shadow = OuterShadow
                      Shadow2 = InnerShadow
                    }else if(InnerShadow.length == 0){
                        Shadow = OuterShadow
                        Shadow2 = ''
                    }else if(OuterShadow.length == 0){
                        Shadow = ''
                        Shadow2 = InnerShadow
                    }
            //边框色渐变
           if(borderbrushArr.ColorType == 'SolidColor'){
               borderColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
           }else{
                     borderColor = ''
                     lagel3 = borderbrushArr.Data.Angel.toFixed(0)
                 for(var f=0;f<borderbrushArr.Data.GradientStops.length;f++){
                   gradient3 = borderbrushArr.Data.GradientStops[f]
                   borderColor = borderColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
               }
                   borderColor = '-webkit-linear-gradient('+lagel3+'deg'+borderColor+')';
           }
          //背景色渐变
          if(backgroundArr.ColorType == 'SolidColor'){
              backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
              if(backgroundArr.Data.Color.slice(3) == 'FFFFFF' && backgroundArr.Data.Color.slice(1, 3) != "FF"){
                  borderColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
              }
          }else{
                  backColor = ''
                  lagel2 = backgroundArr.Data.Angel.toFixed(0)
              for(var h=0;h<backgroundArr.Data.GradientStops.length;h++){
                  gradient1 = backgroundArr.Data.GradientStops[h]
                  backColor = backColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
              }
                  backColor = '-webkit-linear-gradient('+lagel2+'deg'+backColor+')';
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
                        for(var g=0;g<foregoundArr.Data.GradientStops.length;g++){
                            gradient2 = foregoundArr.Data.GradientStops[g]
                            backgroundColor = backgroundColor + ',' + gradient2.Color + ' ' + (gradient2.Offset*100).toFixed(0) + '%'
                        }
                            backgroundColor = '-webkit-linear-gradient('+lagel1+'deg'+backgroundColor+')';
                    }
                  
                  if(this.data.Data.QueryButtonList.length){
                    for(let w=0;w<this.data.Data.QueryButtonList.length;w++){
                      if(this.data.Data.QueryButtonList[w].ElementName == this.textblockData[i].Name){

                          radius = this.textblockData[i].PropertyList.CornerRadius
                          var value8 = {
                            width:this.textblockData[i].PropertyList.Width,
                            height:this.textblockData[i].PropertyList.Height,
                            rotate:this.textblockData[i].PropertyList.RotateAngle,
                            top:this.textblockData[i].PropertyList.Top,
                            left:this.textblockData[i].PropertyList.Left,
                            opacity:this.textblockData[i].PropertyList.Opacity / 100,
                            text:this.textblockData[i].PropertyList.Content,
                            fontSize:this.textblockData[i].PropertyList.FontSize,
                            family:this.textblockData[i].PropertyList.FontFamily,
                            BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                            Foreground:foreColor,
                            Background:backColor,
                            BorderBrush:borderColor,
                            radiusLeft :radius.split(",")[0],
                            radiusTop :radius.split(",")[1],
                            radiusRight :radius.split(",")[2],
                            radiusButton :radius.split(",")[3],
                            class:this.textblockData[i].Name,
                            ControlType:'',
                            TagID:'',
                            TagName:'',
                            backgroundColor:backgroundColor,
                            clipText:clipText,
                            Shadow:Shadow,
                            Shadow2:Shadow2,
                             Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                            QueryShow:this.data.Data.QueryButtonList[w].ExecuteType=='2'?false:true,
                            ZIndex:this.ZIndex
                          }
                              this.dataValue.push(value8)


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
.querybutton25a{
  display: inline-block;
  user-select:none;
  cursor: pointer;
  box-sizing: border-box;
}

.querybutton25a:hover{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;
}

.querybutton25a:hover .conten{
  background-color: #71A2C7ff !important;
  background: #4EBAF3ff !important;
}
.querybutton25a:active{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;

}
.querybutton25a:active .conten{
  background-color: #A7DDFDff !important;
  background: #A7DDFDff !important;
    box-shadow: 4px 4px 20px #3c99c9 inset;
}

.pressButton_box{
  /* display:none; */
  position:absolute;
  top:-2px;
  left:-2px;
  width:calc(100% + 4px);
  height:calc(100% + 4px);
  background:rgba(255,255,255,0);
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
     z-index: 100;
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