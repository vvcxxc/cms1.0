<!--
 * @Description: 这是矩形页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-07 11:32:12
 -->
<template>
<div>
  <div v-for="(item,index) in dataValue" :key="index">

    <div v-if="show" name="solidrectangle" :class="item.class" @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
     class="recta2" :style="'width:' + item.width + 'px; height:' 
    + item.height + 'px; position:absolute; top:' + item.top+ 'px; left:' + item.left 
    + 'px; transform:rotate(' + item.rotate +'deg); opacity:' + item.opacity + ';zIndex:'
    + item.ZIndex">
       <div class="box" :style="'position:absolute;zIndex:'+(item.ZIndex+2)+';width:' + item.width + 'px;height:' 
       + item.height+'px;boxSizeng:border-box;-webkit-mask-repeat: repeat-x, repeat-y, repeat-x, repeat-y;'
       + '-webkit-mask-position: 0 0, 0 0, 0 100%, 100% 0;-webkit-mask-image: linear-gradient'
       + '(to right, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px), linear-gradient(to bottom, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px),'
       + 'linear-gradient(to right, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px), linear-gradient(to bottom, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px);'
       + '-webkit-mask-size: '+item.soDa+'px ' + item.StrokeThickness +'px,'+ item.StrokeThickness+'px '
       + item.soDa+'px,'+item.soDa+'px '+ item.StrokeThickness+'px,'+item.StrokeThickness+'px '+item.soDa+'px;'
       + 'background:'+item.Stroke" >
       </div>
       <div class="conter" :style="'width:'+ (item.width-item.StrokeThickness * 2) + 'px;zIndex:'+(item.ZIndex+1)+';height:' 
       + (item.height-item.StrokeThickness * 2) + 'px;position:absolute;left:0;top:0;margin-top:' 
       +item.StrokeThickness +'px;margin-left:' + item.StrokeThickness + 'px;background:'+item.Fill + ';boxShadow:' + item.Shadow ">
       </div>
    </div>
     
     <!-- 权限弹窗 -->
     <!-- <div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
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
     </div> -->
</div>
</div>
</template>

<script>

export default {
    data() {
        return {
           show:true,
           textblockData:[],
           dataValue:[],
           timeoutID:'',
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
            this.init();
          }
        }
      }
    },
    mounted(){
      this.data = this.dae
      this.Name = 'solidrectangle'
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
            //  this.commerPopShow1 = false
            this.$emit('shownotip')
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

          if(e.which == 1){    //鼠标左键松开
              if(EventType.length){
                 self.jurisdictionShow(item).then(val => { 
                      if(self.CanExcuteShow){
                            // self.commerPopShow1 = true
                            self.$emit('showtip',self.lang.NoOperationAuthority)
                            return
                        }else{
                          for(var j=0;j<EventType.length;j++){
                            Typearr.push(EventType[j].Script)
                          }
                          self.$parent.scriptData(Typearr,'','','','','')
                        }
                 })

              }
           }else if(e.which == 3){  //鼠标右键松开
                  if(EventType1.length){
                     self.jurisdictionShow(item).then(val => { 
                        if(self.CanExcuteShow){
                            // self.commerPopShow1 = true
                            self.$emit('showtip',self.lang.NoOperationAuthority)
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
        // },200)
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
                            // self.commerPopShow1 = true
                            self.$emit('showtip',self.lang.NoOperationAuthority)
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
                        // self.commerPopShow1 = true
                        self.$emit('showtip',self.lang.NoOperationAuthority)
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
                        // this.commerPopShow1 = true
                        this.$emit('showtip',this.lang.NoOperationAuthority)
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


        //赋值
        gitValue(){
          this.dataValue = []
          var fillOp
          var fillColor
          var strokeOp
          var strokeColor
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
           
            //渐变色变量
                 var FilldArr = JSON.parse(this.textblockData[i].PropertyList.Fill)
                 var StrokeArr = JSON.parse(this.textblockData[i].PropertyList.Stroke)
                 var lagel2
                 var gradient1
                 var lagel3
                var gradient3
                var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
                var InnerShadow
                var OuterShadow
                var Shadow
                //阴影
                Shadow = ''
                if(borderSadow.InnerShadow != undefined){
                    InnerShadow = borderSadow.InnerShadow.OffsetX + 'px ' +  borderSadow.InnerShadow.OffsetY 
                                + 'px ' +  borderSadow.InnerShadow.BlurRadius.toFixed(0) + 'px ' 
                                + borderSadow.InnerShadow.Color+ ' inset'
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
                  if(StrokeArr.ColorType == 'SolidColor'){
                      strokeColor = '#' + StrokeArr.Data.Color.slice(3) + StrokeArr.Data.Color.slice(1, 3)
                  }else{
                          strokeColor = ''
                          lagel3 = StrokeArr.Data.Angel.toFixed(0)
                      for(var f2=0;f2<StrokeArr.Data.GradientStops.length;f2++){
                          gradient3 = StrokeArr.Data.GradientStops[f2]
                          strokeColor = strokeColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
                      }
                          strokeColor = '-webkit-linear-gradient('+lagel3+'deg'+strokeColor+')';
                  }
                //背景色渐变
                if(FilldArr.ColorType == 'SolidColor'){
                    fillColor = '#' + FilldArr.Data.Color.slice(3) + FilldArr.Data.Color.slice(1, 3)
                  
                }else{
                        fillColor = ''
                        lagel2 = FilldArr.Data.Angel.toFixed(0)
                    for(var h2=0;h2<FilldArr.Data.GradientStops.length;h2++){
                        gradient1 = FilldArr.Data.GradientStops[h2]
                        fillColor = fillColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                    }
                        fillColor = '-webkit-linear-gradient('+lagel2+'deg'+fillColor+')';
                }
        var value = {
          width:this.textblockData[i].PropertyList.Width,
          height:this.textblockData[i].PropertyList.Height,
          rotate:this.textblockData[i].PropertyList.RotateAngle,
          top:this.textblockData[i].PropertyList.Top,
          left:this.textblockData[i].PropertyList.Left,
          opacity:this.textblockData[i].PropertyList.Opacity / 100,
          Fill:fillColor,
          Stroke:strokeColor,
          StrokeThickness:Number(this.textblockData[i].PropertyList.StrokeThickness) ,
          soDa: this.textblockData[i].PropertyList.StrokeDashArray.length == 0 ? 1 : this.textblockData[i].PropertyList.StrokeThickness * 5,
          ZIndex:this.ZIndex,
          Shadow:Shadow,
          class:this.textblockData[i].Name
        }
        this.dataValue.push(value)
      }
        }

    }
}
</script>

<style lang="scss" scoped>
.recta2{
  display: inline-block;
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