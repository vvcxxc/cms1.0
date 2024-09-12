<!--
 * @Description: 这是圓形页面（组件）
 * @Date: 2019-11-13 09:08:24
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-25 16:36:37
 -->
<template>
<div>
    <div v-for="(item,index) in dataValue" :key="index">
    
    <div v-if="show" 
      @dblclick="opendb(item)" 
      @contextmenu.prevent
      @mousedown="downClick(item,$event)" 
      @mouseup="seupClick(item,$event)"
      :class="item.class" class="Ellipse3aa" :style="'width:'+ item.width +'px; height:'+ item.height 
      +'px; borderRadius:' + big + '%; position:absolute; top:' + item.top + 'px; left:' + item.left 
      + 'px; opacity:' + item.opacity + '; transform:rotate('+ item.rotate + 'deg);zIndex:'+item.ZIndex" name="solidellipse">
      <div class="aa" :style="'width:100%;height:100%;position:absolute;top:0;left:0;borderRadius:50%;boxShadow:' 
      + item.Shadow">
    </div>
        <!-- svg构造的圆形渐变色 -->
        <svg class="ellipseSvg" :width="item.width" :height="item.height">
          <defs>
              <linearGradient :id="'grad' +index "
              :x1="item.fx1" :y1="item.fy1"
              :x2="item.fx2" :y2="item.fy2">
                <stop :offset="it.offset" v-for="(it,ind) in item.backColorArr"
                 :key="ind" :style="'stop-color:' + it.color +';'" />
              </linearGradient>
              
              <linearGradient :id="'dashar' + index"
              :x1="item.bx1" :y1="item.by1"
              :x2="item.bx2" :y2="item.by2">
                <stop :offset="ite.offset" v-for="(ite,inde) in item.strokeColorArr"
                 :key="inde" :style="'stop-color:' + ite.color +';'" />
              </linearGradient>
            </defs>
            <ellipse id="myellipse" :cx="(item.width - (item.StrokeThickness * 2) )/2 + Number(item.StrokeThickness)" 
                    :cy="(item.height - item.StrokeThickness * 2 )/2 + Number(item.StrokeThickness)"
                    :rx="(item.width- (item.StrokeThickness))/2" 
                    :ry="(item.height- (item.StrokeThickness))/2"  
                    :fill="'url(#grad' + index + ')'"  
                    :stroke-dasharray="item.soDa"
                    :stroke="'url(#dashar' + index + ')'" 
                    :style="'stroke-width:'+ item.StrokeThickness + 'px;'"/>
        </svg>
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
        big:50,
        show:true,
        textblockData:[],
        dataValue:[],
        commerPopShow1:false,
        ZIndex:'',
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
                this.dataValue = []
                //  setTimeout(()=>{
                  this.init() 
                // },1000)
              }
        }
      }
    },
    created(){
        this.data = this.dae
        this.Name = 'solidellipse'
        if(this.data){
          this.init()
        }
    },

    methods: {
        init(){
              //数据筛选
            var dataAll = this.data.Controls.ControlList
            this.textblockData = []
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
        
          //鼠标松开
     seupClick(item,e){
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
          if(e.which == 1){   //鼠标左键按下
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
          
          }else if(e.which == 3){   //鼠标右键按下
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
     },
     //鼠标双击
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
            });
          }
       },200)
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
              var backColor
              var backColorArr = []
              var strokeColorArr = []
              var bx1
              var bx2
              var by1
              var by2
              var fx1
              var fx2
              var fy1
              var fy2
              //渐变色变量
              var backgroundArr = JSON.parse(this.textblockData[i].PropertyList.Fill)
              var borderbrushArr = JSON.parse(this.textblockData[i].PropertyList.Stroke)
              var lagel1
              var gradient2 
              var lagel2
              var gradient1
              var clipText
              var backgroundColor
                //阴影
              var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
              var InnerShadow
              var OuterShadow
              var Shadow
              
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
                  Shadow = InnerShadow + ',' + OuterShadow
              }else if(InnerShadow.length == 0){
                  Shadow = OuterShadow
              }else if(OuterShadow.length == 0){
                  Shadow = InnerShadow
              }
              
              //背景色渐变
              if(backgroundArr.ColorType == 'SolidColor'){
                backColor = '#' + backgroundArr.Data.Color.slice(3) + backgroundArr.Data.Color.slice(1, 3)
                for(var j=0;j<2;j++){
                  var valueColor = {
                      offset:j*100 + '%',
                      color:backColor
                  }
                  backColorArr.push(valueColor)
                }
                fx1='0'
                fx2='1'
                fy1='0'
                fy2='0'
              }else{
                  var GradientStops = backgroundArr.Data.GradientStops
                  //渐变色角度
                  var Angel = Number(backgroundArr.Data.Angel).toFixed(0)
                  var num
                  if(Angel >=0 && Angel <45){
                      fx1='0'
                      fx2='1'
                      fy1= (Angel / 45).toFixed(2)
                      fy2='0'
                  }else if(Angel >= 45 && Angel < 90){
                      num = Math.abs(90 - Angel)
                      fx1='0'
                      fx2= (num / 45).toFixed(2)
                      fy1='1'
                      fy2='0'
                  }else if(Angel >= 90 && Angel < 125){
                      num = Math.abs(125 - Angel)
                      fx1='1'
                      fx2= (num / 45).toFixed(2)
                      fy1='1'
                      fy2= '0'
                  }else if(Angel >=125 && Angel < 180){
                      num = Math.abs(Angel - 125)
                      fx1= '1'
                      fx2= '0'
                      fy1= '1'
                      fy2= (num / 45).toFixed(2)
                  }else if(Angel >= 180 && Angel < 225){
                      num = Math.abs(Angel - 180)
                      fx1= '1'
                      fx2= '0'
                      fy1= '0'
                      fy2= (num / 45).toFixed(2)
                  }else if(Angel >= 225 && Angel < 270){
                      num = Math.abs(270 - Angel)
                      fx1= (num / 45).toFixed(2)
                      fx2= '0'
                      fy1= '0'
                      fy2= '1'
                  }else if(Angel >=270 && Angel < 315){
                      num = Math.abs(Angel - 315)
                      fx1= (num / 45).toFixed(2)
                      fx2= '1'
                      fy1= '0'
                      fy2= '1'
                  }else if(Angel >=315 && Angel <=360){
                      num = Math.abs(Angel - 360)
                      fx1= '0'
                      fx2= '1'
                      fy1= '0'
                      fy2= (num / 45).toFixed(2)
                  }

                  for(var k=0;k<GradientStops.length;k++){
                    var valueColor2={
                      offset:(GradientStops[k].Offset * 100).toFixed(0) + '%',
                      color:GradientStops[k].Color
                    }
                    backColorArr.push(valueColor2)
                  }
              }
              //边框色渐变
              if(borderbrushArr.ColorType == 'SolidColor'){
                backColor = '#' + borderbrushArr.Data.Color.slice(3) + borderbrushArr.Data.Color.slice(1, 3)
                for(var j1=0;j1<2;j1++){
                  var valueColor3 = {
                      offset:j1*100 + '%',
                      color:backColor
                  }
                  strokeColorArr.push(valueColor3)
                }
                bx1='0'
                bx2='1'
                by1='0'
                by2='0'
              }else{
                      var GradientStops1 = borderbrushArr.Data.GradientStops
                  //渐变色角度
                  var Angel2 = Number(borderbrushArr.Data.Angel).toFixed(0)
                  var num2
                  if(Angel2 >=0 && Angel2 <45){
                      bx1='0'
                      bx2='1'
                      by1= (Angel2 / 45).toFixed(2)
                      by2='0'
                  }else if(Angel2 >= 45 && Angel2 < 90){
                      num2 = Math.abs(90 - Angel2)
                      bx1='0'
                      bx2= (num2 / 45).toFixed(2)
                      by1='1'
                      by2='0'
                  }else if(Angel2 >= 90 && Angel2 < 125){
                      num2 = Math.abs(125 - Angel2)
                      bx1='1'
                      bx2= (num2 / 45).toFixed(2)
                      by1='1'
                      by2= '0'
                  }else if(Angel2 >=125 && Angel2 < 180){
                      num2 = Math.abs(Angel2 - 125)
                      bx1= '1'
                      bx2= '0'
                      by1= '1'
                      by2= (num2 / 45).toFixed(2)
                  }else if(Angel2 >= 180 && Angel2 < 225){
                      num2 = Math.abs(Angel2 - 180)
                      bx1= '1'
                      bx2= '0'
                      by1= '0'
                      by2= (num2 / 45).toFixed(2)
                  }else if(Angel2 >= 225 && Angel2 < 270){
                      num2 = Math.abs(270 - Angel2)
                      bx1= (num2 / 45).toFixed(2)
                      bx2= '0'
                      by1= '0'
                      by2= '1'
                  }else if(Angel2 >=270 && Angel2 < 315){
                      num2 = Math.abs(Angel2 - 315)
                      bx1= (num2 / 45).toFixed(2)
                      bx2= '1'
                      by1= '0'
                      by2= '1'
                  }else if(Angel2 >=315 && Angel2 <=360){
                      num2 = Math.abs(Angel2 - 360)
                      bx1= '0'
                      bx2= '1'
                      by1= '0'
                      by2= (num2 / 45).toFixed(2)
                  }
                      for(var k1=0;k1<GradientStops1.length;k1++){
                        var valueColor4={
                          offset:(GradientStops1[k1].Offset * 100).toFixed(0) + '%',
                          color:GradientStops1[k1].Color
                        }
                        strokeColorArr.push(valueColor4)
                      }
              }
              var value = {
                width:this.textblockData[i].PropertyList.Width,
                height:this.textblockData[i].PropertyList.Height,
                rotate:this.textblockData[i].PropertyList.RotateAngle,
                top:this.textblockData[i].PropertyList.Top,
                left:this.textblockData[i].PropertyList.Left,
                opacity:this.textblockData[i].PropertyList.Opacity / 100,
                StrokeThickness:this.textblockData[i].PropertyList.StrokeThickness,
                soDa: this.textblockData[i].PropertyList.StrokeDashArray.length == 0 ? 'none' : this.textblockData[i].PropertyList.StrokeThickness+' '+this.textblockData[i].PropertyList.StrokeThickness * 5,
                Shadow:Shadow,
                backColorArr:backColorArr,
                strokeColorArr:strokeColorArr,
                bx1:bx1,
                by1:by1,
                bx2:bx2,
                by2:by2,
                fx1:fx1,
                fy1:fy1,
                fx2:fx2,
                fy2:fy2,
                class:this.textblockData[i].Name,
                ZIndex:this.ZIndex
              }
              this.dataValue.push(value)
          }
        }

    }
}
</script>

<style lang="scss" scoped>
.Ellipse3aa{
    display: inline-block
}
.ellipseSvg{
  position: absolute;
  top:0;
  left:0;
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