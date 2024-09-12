<!--
 * @Description: 这是弹窗页面（组件）
 * @Date: 2019-11-18 15:03:59
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-25 16:42:48
 -->
<template>
  <div>
    <div v-for="(item,index) in dataValue" :key="index">
      <div
          v-if="show" :class="item.class" @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
          name="popupbutton" @click="popbox(item)"  class="PopupButton10a" :style="'position:absolute;' 
          + 'left:' + item.left + 'px; top:' + item.top + 'px; text-align:center; line-height:'
          + (item.height - item.BorderThickness * 2) + 'px; width:'+ item.width + 'px; height:'
          + item.height + 'px; borderRadius:' + item.radiusLeft + 'px ' + item.radiusTop + 'px ' 
          + item.radiusRight + 'px ' + item.radiusButton + 'px; fontFamily:'+ item.family + '; fontSize:'
          + item.fontSize + 'px; opacity:' + item.opacity + ';boxSizing:border-box;padding:' 
          +item.BorderThickness + 'px;background:' + item.BorderBrush + '; transform:rotate(' 
          + item.rotate + 'deg);overflow:hidden;white-space:nowrap;boxShadow:'+item.Shadow+';zIndex:'+item.ZIndex">

          <span class="contenText" :style="'position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;line-height:'
          +item.height +'px;color:'+item.Foreground + ';fontWeight:'+item.Blod + ';background:'
          +item.backgroundColor+';-webkit-background-clip:'+item.clipText">{{item.text}}</span>
          <div class="conten" :style="'width:100%;height:100%;background:' + item.Background + ';borderRadius:' 
                + (Number(item.radiusLeft) -1) + 'px ' + (Number(item.radiusTop) -1) + 'px ' 
                + (Number(item.radiusRight) -1) + 'px ' + (Number(item.radiusButton) -1) + 'px;boxShadow：'+item.Shadow2">
          </div>
      </div>
       <!-- 权限弹窗 -->
      <!-- <div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:99">
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
         <div class="Pop10" v-if="isShow">
            <div  style="position:absolute;left:0;top:0;right:0;bottom:0;z-index:99999;"></div>
            <div  v-drager v-for="(item,index) in PopList22" :key="index" :class="'popbox' +item.ElementName" 
              class="popbox" :style="'width:' + (item.viewWidth) + 'px; height:' 
              + item.viewHeight + 'px; position:absolute; left:' + item.viewpositionX + 'px; top:'
              +item.viewpositionY + 'px;background:#fff;zIndex:9999999' ">
            <div id="Pop_Title" class="title">
              <span class="title_text">{{item.viewtitle}}</span>
              <i @click="popshowFun(item)" class="titleIc el-icon-close"></i>
            </div>
            <div class="popconter">
              <bb ref="chid" :popdata="popdata" v-if="popShow"  class="aa"></bb>
            </div>
        </div>
      </div>

  </div>
</template>

<script>

import bb from '../customerPopBox'
export default {
  name:'Customervue',
  components:{
    bb
  },
  props:['dae','dataId','ViewName'],
  data() {
    return {
      show:true,
      textblockData:[],
      dataValue:[],
      PopList:[],
      PopList22:[],
      isShow: false,
      popdata:'',
      popShow:false,
      commerPopShow1:false,
      ZIndex:'',
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    };
  },
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
    if(this.dae){
      this.init()
    }
  },
  destroyed(){
    this.$nextTick(()=>{
      if( document.querySelector('.popbox')){
        document.querySelector('.popbox').style.display = 'none'
      }
    })
      this.popShow =false
  },
  directives: {
            drag: function(el) {
                let dragBox = el; //获取当前元素
                dragBox.onmousedown = e => {
                  let box = el
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - dragBox.offsetLeft;
                    let disY = e.clientY - dragBox.offsetTop;
                    document.onmousemove = e => {
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - (Number(disX));
                        let top = e.clientY - (Number(disY)) ;
                        //移动当前元素
                        box.style.left = left + "px";
                        box.style.top = top + "px";
                    };
                    document.onmouseup = e => {
                          document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        },
  methods: {
    init(){
        this.popShow = false
        this.data = this.dae
        this.Name = 'popupbutton'
        //数据筛选
        this.textblockData = []
        var dataAll = this.data.Controls.ControlList
        for(var i=0;i<dataAll.length;i++){
          if(dataAll[i].ControlType == this.Name){
            this.textblockData.push(dataAll[i])
            }
        }
    //弹窗数据格式化
      var Poplist = this.data.Data.PopupButtonList
      this.PopList = []
      for(var j=0;j<Poplist.length;j++){
        var Popvalue = {
          ElementName:Poplist[j].ElementName,
          viewtitle:Poplist[j].viewtitle,
          viewWidth:Poplist[j].viewWidth,
          viewHeight:Poplist[j].viewHeight,
          viewName:Poplist[j].viewName.slice(0,name.length-5),
          viewpositionX:Poplist[j].viewpositionX,
          viewpositionY:Poplist[j].viewpositionY,
        }
        console.log("vvvv222222",Popvalue)
        this.PopList.push(Popvalue)
      }
      if(this.textblockData.length != 0){
          this.show = true
      }else{
          this.show = false
      }
      //赋值
      if(this.show){
        this.gitValue()
      }
    },
    Jurisdiction(){
      // this.commerPopShow1 = false
      this.$emit('shownotip')
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
                    // self.commerPopShow1 = true
                    self.$emit('showtip',self.lang.NoOperationAuthority)
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
                          // self.commerPopShow1 = true
                          self.$emit('showtip',self.lang.NoOperationAuthority)
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
          if(e.which == 1){  //鼠标左键按下
              if(EventType.length){
                self.jurisdictionShow(item).then(val => { 
                     if(self.CanExcuteShow){
                        // self.commerPopShow1 = true
                        self.$emit('showtip',self.lang.NoOperationAuthority)
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
                        // self.commerPopShow1 = true
                        self.$emit('showtip',self.lang.NoOperationAuthority)
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
     },
     //鼠标双击
     opendb(item){
        setTimeout(()=>{
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
                        //  this.commerPopShow1 = true
                        this.$emit('showtip',this.lang.NoOperationAuthority)
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

    //弹窗按钮
    popbox(item){
      
                 for(let i=0;i<this.PopList.length;i++){
                   var dom = item.class
                   if(this.PopList[i].ElementName == dom){
                      this.jurisdictionShow(item).then(val => { 
                            if(!this.CanExcuteShow){
                              this.PopList22 = []
                              var poplist = JSON.stringify(this.PopList[i])
                              this.PopList22.push(JSON.parse(poplist))
                              this.popdata = this.PopList[i].viewName
                              this.popShow = true
                              console.log(this.dataValue)
                              console.log(this.PopList22)
                              this.isShow = true
                              this.$nextTick(()=>{
                                document.querySelector('.popbox').style.display = 'block'
                              })
                            }else{
                                // this.commerPopShow1 = true
                                this.$emit('showtip',this.lang.NoOperationAuthority)
                            }
                          })
                     }
                   }
    },
    //关闭
    popshowFun(item){
      if(window.$.connection.subchart.server != undefined){
        window.$.connection.subchart.server.leaveView(`${this.popdata}`,localStorage.getItem('currentLang'))
      }
      var dom = item.ElementName
      this.PopList22 = []
      this.isShow = false
      document.querySelector(`.popbox${dom}`).style.display = 'none'
      this.popShow = false
    },
    joinVar(){
        this.$parent.pageVar()
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

        var foreOp 
        var foreColor 
        var backOp
        var backColor 
        var borderOp
        var borderColor
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

        let radius = this.textblockData[i].PropertyList.CornerRadius
        var value = {
          width:this.textblockData[i].PropertyList.Width,
          height:this.textblockData[i].PropertyList.Height,
          rotate:this.textblockData[i].PropertyList.RotateAngle,
          top:this.textblockData[i].PropertyList.Top,
          left:this.textblockData[i].PropertyList.Left,
          opacity:this.textblockData[i].PropertyList.Opacity / 100,
          text:this.textblockData[i].PropertyList.Content,
          fontSize:this.textblockData[i].PropertyList.FontSize,
          BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
          family:this.textblockData[i].FontFamily,
          Foreground:foreColor,
          Background:backColor,
          BorderBrush:borderColor,
          radiusLeft :radius.split(",")[0],
          radiusTop :radius.split(",")[1],
          radiusRight :radius.split(",")[2],
          radiusButton :radius.split(",")[3],
          class:this.textblockData[i].Name,
          backgroundColor:backgroundColor,
          clipText:clipText,
          Shadow:Shadow,
          Shadow2:Shadow2,
          Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
          ZIndex:this.ZIndex
        }
        this.dataValue.push(value)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.PopupButton10a{
  display: inline-block;
  cursor: pointer;
}
.PopupButton10a:hover{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;
}

.PopupButton10a:hover .conten{
  background-color: #71A2C7ff !important;
  background: #4EBAF3ff !important;
}
.PopupButton10a:active{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;

}
.PopupButton10a:active .conten{
  background-color: #A7DDFDff !important;
  background: #A7DDFDff !important;
    box-shadow: 4px 4px 20px #3c99c9 inset;
}

.Pop10{
  position: absolute;
  left: 0;
  top: -100px;
  bottom:0;
  right: 0;

  .popbox{
    border:1px solid #ccc;
    box-sizing: content-box;
    .title{
      position: relative;
      width:calc(100% - 1px);
      height:60px;
      background: #386DF0;
      .title_text{
        display: inline-block;
        text-align: center;
        line-height: 60px;
        width:100%;
        height:60px;
        color:#fff;
        font-size:24px;
      }
      .titleIc{
        position: absolute;
        top:10px;
        right:10px;
        font-size: 40px;
        color:#fff;
      }
    }
    .popconter{
      position: relative;
      width:100%;
      height:calc(100% - 60px);
      background:#fff;
      overflow: auto;
      .aa{
        position: absolute;
        left: 0;
        top:0;
      }
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