<!--
 * @Description: 这是点动按钮控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-29 16:05:02
 -->
<template>
<div>
   <div v-for="(item,index) in dataValue" :key="index">
  <div
      v-if="show" name="pressbutton" :class="item.class" class="PressButton7a" @mouseup.stop="upFun(item,$event)" 
      @mousedown.stop="downFun(item,$event)"  @dblclick="opendb(item)" @contextmenu.prevent
      :style="'position:absolute;' + 'left:' + item.left + 'px; top:' + item.top 
      + 'px; boxSizing:border-box; text-align:center; line-height:' + (item.height - item.BorderThickness*2) 
      + 'px; width:'+ item.width + 'px; height:'+ item.height + 'px; borderRadius:' 
      + item.radiusLeft + 'px ' + item.radiusTop + 'px ' + item.radiusRight + 'px ' 
      + item.radiusButton + 'px; fontFamily:'+ item.family + '; fontSize:'+ item.fontSize 
      + 'px; opacity:' + item.opacity + '; background:' + item.BorderBrush + '; transform:rotate(' 
      + item.rotate + 'deg);padding:' + item.BorderThickness + 'px;overflow:hidden;white-space:nowrap;boxShadow:'+item.Shadow + ';zIndex:'+ item.ZIndex"> 

      <span class="contenText" :style="'position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;line-height:'
      +item.height + 'px;color:'+item.Foreground + ';fontWeight:'+item.Blod">{{item.text}}</span>

      <div class="conten" :style="'width:100%;height:100%;background:' + item.Background + ';borderRadius:' 
        + (Number(item.radiusLeft) -1) + 'px ' + (Number(item.radiusTop) -1) + 'px ' + (Number(item.radiusRight) -1) + 'px ' 
        + (Number(item.radiusButton) -1) + 'px;boxShadow:'+item.Shadow2">
        
      </div>

        <div class="pressButton_box"></div>
  </div>

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
  </div>
</template>

<script>

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
      CanExcuteShow:false,
      ZIndex:'',
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    };
  },
  props:['dae','dataId'],
    watch:{
      dae:{
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
      this.Name = 'pressbutton'
      if(this.data){
        this.init()
      }
    
  },
  methods: {
    init(){
        //数据筛选
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
    },
    //确认
    Jurisdiction(){
      this.commerPopShow1 = false
    },

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

         //鼠标双击
     opendb(item){
        // clearTimeout(this.timeoutID);
        setTimeout(()=>{
          var EventScriptList = this.data.Data.EventScriptList
          var EventType = []
          var Typearr = []
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
                         Typearr.push(EventType[j].Script)
                       }
                    this.$parent.scriptData(Typearr,'','','','','')
                 }
             })          
           }
        },200)
     },

  //鼠标按下事件
  downFun(item,e){

    //脚本事件
    // clearTimeout(this.timeoutID);
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
                        // self.$parent.scriptFun(Typearr,item)
                        }
                    });

                  }

                  //下发事件
              // e.path[0].style.background='rgba(255,255,255,0.7)'
              self.jurisdictionShow(item).then(val => { 
                console.log("11111111111111")
                self.$parent.scriptData(Typearr,'点动按钮',item,'1','','')
              })

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
                          self.$parent.scriptData(Typearr,'','','','','')
                          }
                      });
                  }
              }
            // },200)

    
  },
  
  //鼠标抬起
  upFun(item,e){
    //脚本事件
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
                   self.$parent.scriptData(Typearr,'点动按钮',item,'2','','')
                  }
              });
              }else{
                console.log("进来吧")
                self.pressFun(item,'2')
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
            //执行下发事件
              setTimeout(function(){
                // e.path[0].style.background='rgba(255,255,255,0)'
              },200)

        },600)

  },

    //点动下发事件
  pressFun(item,type){
      console.log('这里很奇怪')
     if(item.ControlType != ''){
      if(!this.CanExcuteShow){
        //0为false 1为true 
        //1  按发1 松发0    2 按发0 松发1
      var valueShow
      var arr = []

      var ss = JSON.parse(sessionStorage.getItem('variable'))
      var variableName
      for(let o=0;o<ss.length;o++){
          if(item.TagName == ss[o].TagName){
            variableName = ss[o].TagType
          }
      }

      if(item.ControlType == 1){
        if(type == '1'){
           if(variableName == this.lang['二进制变量'] || variableName == this.lang['文本变量8位字符集'] || variableName == this.lang['文本变量16位字符集']  
          || variableName == this.lang['时间'] || variableName == this.lang['日期'] || variableName == this.lang['日期时间'] || variableName == this.lang['字符串']){
            valueShow = true
          }else{
            valueShow = 1
          }

        }else if(type == '2'){
          if(variableName == this.lang['二进制变量'] || variableName == this.lang['文本变量8位字符集'] || variableName == this.lang['文本变量16位字符集']  
          || variableName == this.lang['时间'] || variableName == this.lang['日期'] || variableName == this.lang['日期时间'] || variableName == this.lang['字符串']){
            valueShow = false
          }else{
            valueShow = 0
          }
          
        }
      }else if(item.ControlType == 2){
        if(type == '1'){
          if(variableName == this.lang['二进制变量'] || variableName == this.lang['文本变量8位字符集'] || variableName == this.lang['文本变量16位字符集']  
          || variableName == this.lang['时间'] || variableName == this.lang['日期'] || variableName == this.lang['日期时间'] || variableName == this.lang['字符串']){
            valueShow = false
          }else{
            valueShow = 0
          }
          
        }else if(type == '2'){
          if(variableName == this.lang['二进制变量'] || variableName == this.lang['文本变量8位字符集'] || variableName == this.lang['文本变量16位字符集']  
          || variableName == this.lang['时间'] || variableName == this.lang['日期'] || variableName == this.lang['日期时间'] || variableName == this.lang['字符串']){
            valueShow = true
          }else{
            valueShow = 1
          }
           
        }
      }
      var value = {
        "Name":item.TagName,
        "Value":valueShow
      }
      arr.push(value)
         //请求接口
                           //请求接口
                            this.$axios({
                                  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                                  if(res1.data.code === 0){
                                this.commerPopShow = false
                                //  this.commerPopShow1value =  '该账户无操作权限'
                        this.$axios({
                  method: 'post',
                  url: '/api/Base/PostIOServiceTest',
                  data:arr
              }).then(res => {
                console.log('执行下发按下',res)
              }).catch(function(error) {
                    // console.log(error);
                });
                                  }else{
                       console.log("res1",res1)
                               this.commerPopShow1 = true   
                               this.commerPopShow1value = res1.data.msg
                                  }
                               
                              })
      }else{
        this.commerPopShow1 = true
      }
    }
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
                              +  borderSadow.InnerShadow.Color + ' inset'
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
                        backColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
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
                ZIndex:this.ZIndex
               }
                  this.dataValue.push(value)
                  break;
             }else{
               if(j == PressButtonList.length-1){

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
                        backColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
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
                    ZIndex:this.ZIndex
                  }
                      this.dataValue.push(value5)
               }
             }
  
  
           }
         }else{


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
                  backColor = '#FFFFFF' + backgroundArr.Data.Color.slice(1, 3)
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
                    ZIndex:this.ZIndex
                  }
                      this.dataValue.push(value8)
         }
       

         
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.PressButton7a{
  display: inline-block;
  user-select:none;
  cursor: pointer;
  box-sizing: border-box;
  position:relative;
  .conten:active {
    box-shadow: 4px 4px 20px #3c99c9 inset !important;
  }
  .contenText:active {
    box-shadow: 4px 4px 20px #3c99c9 inset !important;
  }
}

.PressButton7a:hover{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;
}

.PressButton7a:hover .conten{
  background-color: #71A2C7ff !important;
  background: #4EBAF3ff !important;
}


.pressButton_box{
  /* display:none; */
  position:absolute;
  top:-2px;
  left:-2px;
  width:calc(100% + 4px);
  height:calc(100% + 4px);
  background:rgba(255,255,255,0);
  &:active {
    box-shadow: 4px 4px 20px #3c99c9 inset !important;;
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