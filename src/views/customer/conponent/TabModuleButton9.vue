<!--
 * @Description: 这是切换页面（组件）
 * @Date: 2019-11-18 15:02:03
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-25 16:48:25
 -->
<template>
<div>
<div v-for="(item,index) in dataValue" :key="index">
  <div
      v-if="show" @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)" 
      name="tabmodulebutton" @click="Tab(item)" :class="item.class" class="TabModuleButton90aa" 
      :style="'position:absolute;' + 'left:' + item.left + 'px; top:' + item.top 
      + 'px;' + item.BorderBrush + '; text-align:center; line-height:' + (item.height - item.BorderThickness*2) 
      + 'px; width:'+ item.width + 'px; height:'+ item.height + 'px; borderRadius:' + item.radiusLeft + 'px ' 
      + item.radiusTop + 'px ' + item.radiusRight + 'px ' + item.radiusButton + 'px; fontFamily:'+ item.family 
      + '; fontSize:'+ item.fontSize + 'px; opacity:' + item.opacity + '; transform:rotate(' + item.rotate 
      + 'deg); cursor:pointer;zIndex:2; background:' + item.BorderBrush + ';boxSizing:border-box;padding:'
      + item.BorderThickness + 'px;overflow:hidden;white-space:nowrap;boxShadow:'+item.Shadow +';zIndex:'+item.ZIndex">

      <span class="contenText" :style="'position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;line-height:'
      +item.height + 'px;color:'+item.Foreground + ';fontWeight:'+item.Blod + ';background:'
      +item.backgroundColor+';-webkit-background-clip:'+item.clipText">{{item.text}}</span>
      
      <div class="conten" :style="'width:100%;height:100%;background:' + item.Background 
      + ';borderRadius:' + (Number(item.radiusLeft) -1) + 'px ' + (Number(item.radiusTop) -1) + 'px ' 
      + (Number(item.radiusRight) -1) + 'px ' + (Number(item.radiusButton) -1) + 'px;boxShadow:'+item.Shadow2">
      </div>
    
    </div>
  
  <!-- 弹窗提示 -->
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
      text: "",
      height: 0,
      width: 0,
      bd: 1,   //未知
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
      loading:false,
      cancelTokenFn: null,
      commerPopShow1:false,
      ZIndex:'',
      Typearr:'',
      item:'',
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    };
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
  created() {
    
    this.data = this.dae
      this.Name = 'tabmodulebutton'
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
    // 提示弹窗确认
    Jurisdiction(){
       this.$parent.loding()
      // this.commerPopShow1 = false
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
          if(e.which == 1){
              if(EventType.length){
               self.jurisdictionShow(item).then(val => { 
                  if(self.CanExcuteShow){
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
           }else if(e.which == 3){
                  
                  if(EventType1.length){
                     self.jurisdictionShow(item).then(val => { 
                         if(self.CanExcuteShow){
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
          if(e.which == 1){   //鼠标左键按下
              if(EventType.length){
                self.jurisdictionShow(item).then(val => { 
                     if(self.CanExcuteShow){
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
        })
     },


    Tab(item){
      debugger
          this.jurisdictionShow(item).then(val => { 
              if(!this.CanExcuteShow){
                const _this = this
                const CancelToken = this.$axios.CancelToken;
                this.cancelTokenFn && this.cancelTokenFn();
                this.cancelTokenFn = null;
                var tabname = this.data.Data.TabModuleButtonList
                if(tabname.length == 0){
                  this.$parent.loding()
                  return
                }
                for(let i=0;i<tabname.length;i++){
                  if(item.class == tabname[i].ElementName){
                    var arr = tabname[i].SCMSChildMenuID
                    var arrId = tabname[i].SCMSChildMenuKey
                        this.$axios({
                            method: 'post',
                            url: '/api/HMI/HMI_GstViewId?argChildMenuID=' + arr+'&argChildMenuKey=' + arrId,
                              cancelToken: new CancelToken(function executor(c) {
                              _this.cancelTokenFn = c
                          }),
                            argChildMenuID: arr,
                            argChildMenuKey:arrId,
                        }).then(res => {
                          var menuArr = JSON.parse(sessionStorage.getItem('MenuInfo'))
                            for(var u=0;u<menuArr.length;u++){
                            
                              if(menuArr[u].id == res.data.data){
                                  this.$parent.loding()
                                  this.$router.push({path:menuArr[u].to,query: {id:menuArr[u].id}});
                              }
                              if(menuArr[u].children != null){
                                for(var y=0;y<menuArr[u].children.length;y++){
                                  if(menuArr[u].children[y].id == res.data.data){
                                    this.$parent.loding()
                                    this.$router.push({path:menuArr[u].children[y].to,query: {id:menuArr[u].children[y].id}})
                                  }
                                }
                              }
                              
                            }
                        }).catch(function(error) {
                          });
                  }else{
                    var left = this
                    setTimeout(function(){
                      left.$parent.loding()
                    },300)

                  }
                }

              }else{
                this.$parent.loding()
                 this.$emit('showtip',this.lang.NoOperationAuthority) 
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

        var foreOp
        var foreColor
        var backOp
        var backColor
        var borerOp
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
                        + borderSadow.InnerShadow.Color  + ' inset'
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
          clipText:clipText,
          backgroundColor:backgroundColor,
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
.TabModuleButton90aa{
  display: block;
}
.TabModuleButton90aa:hover{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;
}

.TabModuleButton90aa:hover .conten{
  background-color: #71A2C7ff !important;
  background: #4EBAF3ff !important;
}
.TabModuleButton90aa:active{
  background-color: #71A2C7ff !important;
  background: #71A2C7ff !important;

}
.TabModuleButton90aa:active .conten{
  background-color: #A7DDFDff !important;
  background: #A7DDFDff !important;
    box-shadow: 4px 4px 20px #3c99c9 inset;
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
