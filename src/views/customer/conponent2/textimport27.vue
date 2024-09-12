<!--
 * @Description: 这是输入关键字钮控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-23 19:36:06
 -->
<template>

    <div>
       <div v-for="(item,index) in dataValue" :key="index">
          <div v-if="show" 
            :class="'aa'+item.class" class="textimport27a" 
            @mouseup="upFun(item,$event)" 
            @mousedown="downFun(item,$event)"  
            @dblclick="opendb(item)" 
            @click="inpFun(item)"
            @contextmenu.prevent
            name="textimport"
            :style="'width:' + item.width + 'px; height:' +item.height + 'px; position:absolute; left:' 
            + item.left + 'px; top:' + item.top + 'px; transform:rotate(' + item.rotate + 'deg); opacity:' 
            + item.opacity + '; fontFamily:' + item.fontFamily + '; fontSize:' + item.FontSize + 'px; background:' 
            + item.BorderBrush + '; fontWeight:' + item.Blod +';boxSizing:border-box; padding:'+ item.BorderThickness 
            + 'px;overflow:hidden;white-space:nowrap;boxShadow:' + item.Shadow+';zIndex:'+item.ZIndex">

            <div class="conten" 
            :style="'width:100%;height:100%;background:' + item.Background + ';boxShadow:' 
            + item.Shadow + ';boxSizing:border-box;fontSize:' +item.FontSize + 'px'">

              <input :disabled="item.disabled" :placeholder="item.HitText" v-model="item.value"
               class="textimportInput"  type="text" :cx="item.MatchType"
                 :style="'height:' +(item.height -item.BorderThickness*2)+'px;border:none;width:'
                + (item.width - item.BorderThickness*2)+'px;background:transparent;textAlign:center;color:'
                + item.Foreground + ';fontWeight:' + item.Blod+';text-decoration:'+item.TextDecorations
                +';fontSize:'+item.FontSize + 'px;text-align:left;padding-left:10px;font-family:'+item.family"/>

            </div>
               
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
      textblockData:[],
      dataValue:[],
      show:false,
      commerPopShow1:false,
      ZIndex:''
    };
  },
  props:['dae','dataId'],
    watch:{
      dae:{
        deep:true,
        handler(val){
          console.log('触发监听')
          this.data = val;
          if(val){
            this.init();
          }
        }
      }
    },
  created() {
    this.data = this.dae
      this.Name = 'textimport'
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
     //所有值
     TimeValueFun(){
              var self = this
              let timeData = []
              for(let i=0;i<this.dataValue.length;i++){
                  var value = {
                      name:self.dataValue[i].class,
                      value:self.dataValue[i].value,
                      type:self.dataValue[i].MatchType
                  }
                  timeData.push(value)
              }
                return timeData
        },
          //初始化值
        timeInit(arr){
            for(let i=0;i<this.dataValue.length;i++){
                let index = arr.indexOf(this.dataValue[i].class)
                if(index != -1){
                    this.dataValue[i].value = ''
                }
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
      inpFun(item){

        this.jurisdictionShow(item).then(val => { 
          if(this.CanExcuteShow){
            this.commerPopShow1 = true
            item.disabled = true
          }
        })

      },

        //鼠标按下事件
        downFun(item,e){
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
                  console.log('1111')
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
                      })
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
                        self.$parent.scriptData(Typearr,'','','','','')
                    }
                 })
                }
            }
        },

               //鼠标双击  鼠标双击
     opendb(item){
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
          if(e.which == 1){   //鼠标左键松开
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


    //渐变色+阴影
         colorFun(borderSadow,foregoundArr,borderbrushArr,backgroundArr){
              //阴影
                var Shadow = ''
                var Shadow2
                var InnerShadow
                var OuterShadow
                var foreColor
                var backgroundColor
                var clipText
                var borderColor
                var backColor

                var lagel1
                var lagel2
                var lagel3
                var gradient1
                var gradient2
                var gradient3
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
                     Shadow = OuterShadow
                }else if(OuterShadow.length == 0){
                     Shadow = InnerShadow
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
            var value = {
                Shadow:Shadow,
                InnerShadow:InnerShadow,
                OuterShadow:OuterShadow,
                foreColor:foreColor,
                backgroundColor:backgroundColor,
                clipText:clipText,
                borderColor:borderColor,
                backColor:backColor
            }
            return value
         },

    //赋值
    gitValue(){
        this.dataValue = []
       for(let i=0;i<this.textblockData.length;i++){
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
        var clipText
        var backgroundColor
        //阴影
        var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
        var InnerShadow
        var OuterShadow
        var Shadow

         if(PressButtonList.length != 0 ){
           for(let j=0;j<PressButtonList.length;j++){
             if(PressButtonList[j].ElementName == this.textblockData[i].Name){

               for(let w=0;w<this.data.Data.TextImportList.length;w++){
                 if(this.data.Data.TextImportList[w].ElementName == this.textblockData[i].Name ){

                  //渐变色
                  let colorData = this.colorFun(borderSadow,foregoundArr,borderbrushArr,backgroundArr)
                  Shadow = colorData.Shadow
                  InnerShadow = colorData.InnerShadow
                  OuterShadow = colorData.OuterShadow
                  foreColor = colorData.foreColor
                  backgroundColor = colorData.backgroundColor
                  clipText = colorData.clipText
                  borderColor = colorData.borderColor
                  backColor = colorData.backColor

                   radius = this.textblockData[i].PropertyList.CornerRadius
                   var value = {
                        width:this.textblockData[i].PropertyList.Width,
                        height:this.textblockData[i].PropertyList.Height,
                        rotate:this.textblockData[i].PropertyList.RotateAngle,
                        top:this.textblockData[i].PropertyList.Top,
                        left:this.textblockData[i].PropertyList.Left,
                        opacity:this.textblockData[i].PropertyList.Opacity / 100,
                        class:this.textblockData[i].Name,
                        HitText:this.data.Data.TextImportList[w].HitText,
                        MatchType:this.data.Data.TextImportList[w].MatchType,
                        value:'',
                        disabled:false,
                        Foreground:foreColor,
                        FontSize:this.textblockData[i].PropertyList.FontSize,
                        family:this.textblockData[i].PropertyList.FontFamily,
                        Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                        Background:backColor,
                        BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                        TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                        BorderBrush:borderColor,
                        Shadow:Shadow,

                        ZIndex:this.ZIndex
                   }
                      this.dataValue.push(value)
                 }

               }

                  break;
             }else{
               if(j == PressButtonList.length-1){
                  for(let w=0;w<this.data.Data.TextImportList.length;w++){
                    if(this.data.Data.TextImportList[w].ElementName == this.textblockData[i].Name ){
                      
                       //渐变色
                      let colorData = this.colorFun(borderSadow,foregoundArr,borderbrushArr,backgroundArr)
                      Shadow = colorData.Shadow
                      InnerShadow = colorData.InnerShadow
                      OuterShadow = colorData.OuterShadow
                      foreColor = colorData.foreColor
                      backgroundColor = colorData.backgroundColor
                      clipText = colorData.clipText
                      borderColor = colorData.borderColor
                      backColor = colorData.backColor

                      radius = this.textblockData[i].PropertyList.CornerRadius
                      var value5 = {
                        width:this.textblockData[i].PropertyList.Width,
                        height:this.textblockData[i].PropertyList.Height,
                        rotate:this.textblockData[i].PropertyList.RotateAngle,
                        top:this.textblockData[i].PropertyList.Top,
                        left:this.textblockData[i].PropertyList.Left,
                        opacity:this.textblockData[i].PropertyList.Opacity / 100,
                        class:this.textblockData[i].Name,
                        HitText:this.data.Data.TextImportList[w].HitText,
                        MatchType:this.data.Data.TextImportList[w].MatchType,
                        value:'',
                        disabled:false,
                         FontSize:this.textblockData[i].PropertyList.FontSize,
                        family:this.textblockData[i].PropertyList.FontFamily,
                        Foreground:foreColor,
                        Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                        Background:backColor,
                        BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                        TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                        BorderBrush:borderColor,
                        Shadow:Shadow,

                        ZIndex:this.ZIndex
                      }
                          this.dataValue.push(value5)
                    }
                  }

               }
             }
  
           }
         }else{

                   for(let w=0;w<this.data.Data.TextImportList.length;w++){
                    if(this.data.Data.TextImportList[w].ElementName == this.textblockData[i].Name ){
                      
                       //渐变色
                      let colorData = this.colorFun(borderSadow,foregoundArr,borderbrushArr,backgroundArr)
                      Shadow = colorData.Shadow
                      InnerShadow = colorData.InnerShadow
                      OuterShadow = colorData.OuterShadow
                      foreColor = colorData.foreColor
                      backgroundColor = colorData.backgroundColor
                      clipText = colorData.clipText
                      borderColor = colorData.borderColor
                      backColor = colorData.backColor

                      radius = this.textblockData[i].PropertyList.CornerRadius
                      var value8 = {
                        width:this.textblockData[i].PropertyList.Width,
                        height:this.textblockData[i].PropertyList.Height,
                        rotate:this.textblockData[i].PropertyList.RotateAngle,
                        top:this.textblockData[i].PropertyList.Top,
                        left:this.textblockData[i].PropertyList.Left,
                        opacity:this.textblockData[i].PropertyList.Opacity / 100,
                        class:this.textblockData[i].Name,
                        HitText:this.data.Data.TextImportList[w].HitText,
                        MatchType:this.data.Data.TextImportList[w].MatchType,
                        value:'',
                        disabled:false,
                         FontSize:this.textblockData[i].PropertyList.FontSize,
                        family:this.textblockData[i].PropertyList.FontFamily,
                        Foreground:foreColor,
                        Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                        Background:backColor,
                        BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                        TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                        BorderBrush:borderColor,
                        Shadow:Shadow,

                        ZIndex:this.ZIndex
                      }
                      this.dataValue.push(value8)  
                    }
                   }
         }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.textimport27a{
  display: inline-block;
  user-select:none;
  cursor: pointer;
  box-sizing: border-box;
}
.textimportInput{
  // border:none;
  height:34px;
  text-align: left;
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