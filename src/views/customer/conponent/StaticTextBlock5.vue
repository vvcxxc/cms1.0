<!--
 * @Description: 这是静态文本页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-05 16:31:13
 -->
<template>
<div>
 <div v-for="(item,index) in dataValue" :key="index">
  <div

    v-if="show" name="statictextblock"  @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
     :class="item.class" class="StaticTextBlock5aa" 
     :style="'display:flex'+'width:' + item.width +'px; height:' + item.height + 'px; fontSize:' +(item.size) 
    + 'px; background:'+ item.Background+'; fontFamily:'+ item.family + ';opacity:' + item.opacity + '; position:absolute; left:' + item.left + 'px; top:' + item.top 
    + 'px;transform:rotate(' + item.rotate + 'deg); zIndex:'+item.ZIndex+'; fontWeight:' 
    +  item.Blod + ';white-space:pre-wrap;text-decoration:' + item.TextDecorations 
    +';overflow-y:scroll;overflow-x: hidden;-ms-overflow-style: none;white-space:pre-wrap;word-break: break-all;color:'+item.Foreground"
  >
  <span :style="'white-space:pre-wrap;width:'+item.width +'px;'+ ';display: flex;justify-content: center; align-items:'
    + item.alignItems+';text-align:'+item.textAlign+';  background:'+item.backgroundColor+';-webkit-background-clip:'
  +item.clipText + ';color:' + item.Foreground " >{{item.text}}</span>
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
      Name:'',
      width:0,
      height:0,
      rotate:0,
      text: "",
      size: 0,
      Background: "",
      Foreground:'',
      family: "",
      opacity:0,
      left:0,
      top:0,
      show:true,
      textblockData:[],
      dataValue:[],
      commerPopShow1:false,
      ZIndex:'',
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
  created(){
    this.data = this.dae
      this.Name = 'statictextblock'
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
        if(dataAll[i].ControlType == this.Name || dataAll[i].ControlType == 'StaticTextBlock'){
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
      //  clearTimeout(this.timeoutID);
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
        // this.timeoutID = window.setTimeout(function() {
          if(e.which == 1){  //鼠标左键按下
              if(EventType.length){
                self.jurisdictionShow(item).then(val => { 
                   if(self.CanExcuteShow){
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
               console.log(this.CanExcuteShow)
               if(this.CanExcuteShow){
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

         var foregoundArr = JSON.parse(this.textblockData[i].PropertyList.Foreground)
         var backgroundArr = JSON.parse(this.textblockData[i].PropertyList.Background)

        //字体颜色渐变
           var clipText
           var backgroundColor
           var foreColor
         if(foregoundArr.ColorType == 'SolidColor'){
             foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1,3)
             clipText = 'none'
             backgroundColor = 'none'
         }else{
           foreColor = 'transparent'
           clipText = 'text'
           backgroundColor = ''
           var lagel2 = foregoundArr.Data.Angel.toFixed(0)
           for(var k=0;k<foregoundArr.Data.GradientStops.length;k++){
              var gradient1 = foregoundArr.Data.GradientStops[k]
              backgroundColor = backgroundColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
           }
              backgroundColor = '-webkit-linear-gradient('+lagel2+'deg'+backgroundColor+')';
         }

         
         //背景色渐变
         var gradientText = ''
         if(backgroundArr.ColorType == 'SolidColor'){
           var backOp = backgroundArr.Data.Color.slice(1,3)
           var backColor = backgroundArr.Data.Color.slice(3)
           gradientText = '#' + backColor + backOp 
         }else{
           var lagel = backgroundArr.Data.Angel.toFixed(0)
           for(var j=0;j<backgroundArr.Data.GradientStops.length;j++){
             var gradient = backgroundArr.Data.GradientStops[j]
              gradientText = gradientText + ',' + gradient.Color + ' ' + (gradient.Offset*100).toFixed(0) + '%'
           }
           gradientText = '-webkit-linear-gradient('+lagel+'deg'+gradientText+')';
         }
         
        var value = {
          width:Number(this.textblockData[i].PropertyList.Width),
          height:this.textblockData[i].PropertyList.Height,
          rotate:this.textblockData[i].PropertyList.RotateAngle,
          top:this.textblockData[i].PropertyList.Top,
          left:Number(this.textblockData[i].PropertyList.Left),
          opacity:this.textblockData[i].PropertyList.Opacity / 100,
          size:this.textblockData[i].PropertyList.FontSize,
          text:this.textblockData[i].PropertyList.Text,
          family:this.textblockData[i].PropertyList.FontFamily,
          Foreground:foreColor,
          Background:gradientText,
          TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
          Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
          clipText:clipText,
          backgroundColor:backgroundColor,
          class:this.textblockData[i].Name,
          textAlign:this.textblockData[i].PropertyList.HorizontalAlignment,
          alignItems:this.textblockData[i].PropertyList.VerticalAlignment=="Top"?
            'end':this.textblockData[i].PropertyList.VerticalAlignment=="Center"?
            "center":this.textblockData[i].PropertyList.VerticalAlignment=="Bottom"?
            "flex-end":'',
          ZIndex:this.ZIndex
        }
        this.dataValue.push(value)
      }
    }

  }
};

</script>

<style lang="scss" scoped>
.StaticTextBlock5aa{
  display: flex;
}
.StaticTextBlock5aa::-webkit-scrollbar { width: 0 !important }
.StaticTextBlock5aa { overflow: -moz-scrollbars-none; }

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
span{
  word-break:normal;  display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;
}
</style>