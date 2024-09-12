<!--
 * @Description: 这是直线页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-25 16:38:30
 -->
<template>
<div>
<div v-for="(item,index) in dataValue" :key="index">

<div v-if="show" name="line" :class="item.class" @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
       class="line" :style="'transform-origin:0% 50%;width:' + item.width + 'px; height:' 
     + item.height + 'px; position:absolute; left:' + item.left + 'px; top:' 
     + item.top + 'px; opacity:'+ item.opacity + ';transform:rotate('+ item.rotate + 'deg);zIndex:'+item.ZIndex">
     
    <div class="box1" :style="'width:'+item.width + 'px;height:'+item.height+'px;boxSizing:border-box;'
     + '-webkit-mask-image: linear-gradient(to right, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px), linear-gradient'
     + '(to bottom, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px),  linear-gradient(to right, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px),'
     + 'linear-gradient(to bottom, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px);'
     + '-webkit-mask-repeat: repeat-x, repeat-y, repeat-x, repeat-y;'
     + '-webkit-mask-size: '+item.soDa+'px '+item.StrokeThickness+'px, 0px 0px, 0px 0px, 0px 0px;'
     + '-webkit-mask-position: 0 0, 0 0, 0 100%, 100% 0;'
     + 'background:'+item.Stroke + ';margin-top:'+item.marginTop + 'px'">
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
</div>
</template>
<script>
export default {
    data() {
        return {
            show:true,
            textblockData:[],
            dataValue:[],
            data:null,
            timeoutID:'',
            commerPopShow1:false,
            CanExcuteShow:false,
            ZIndex:'',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    props:['dae','dataId'],

    watch:{
      dae:{  //切换对象监听
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
      this.Name = 'line'
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
      this.dataValue=[]
      for(var i=0;i<this.textblockData.length;i++){
        //渐变色变量
        var StrokeArr = JSON.parse(this.textblockData[i].PropertyList.Stroke)
        var StrokeColor
        var lage
        var gradient

        //边框色渐变
        if(StrokeArr.ColorType == 'SolidColor'){
            StrokeColor = '#' + StrokeArr.Data.Color.slice(3) + StrokeArr.Data.Color.slice(1, 3)
        }else{
                StrokeColor = ''
                lage = StrokeArr.Data.Angel.toFixed(0)
            for(var f2=0;f2<StrokeArr.Data.GradientStops.length;f2++){
                gradient = StrokeArr.Data.GradientStops[f2]
                StrokeColor = StrokeColor + ',' + gradient.Color + ' ' + (gradient.Offset*100).toFixed(0) + '%'
            }
                StrokeColor = '-webkit-linear-gradient('+lage+'deg'+StrokeColor+')';
        }
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

        var value = {
          width:this.textblockData[i].PropertyList.Width,
          height:this.textblockData[i].PropertyList.Height,
          rotate:this.textblockData[i].PropertyList.RotateAngle,
          top:Number(this.textblockData[i].PropertyList.Top),
          left:this.textblockData[i].PropertyList.Left,
          opacity:this.textblockData[i].PropertyList.Opacity / 100,
          soDa: this.textblockData[i].PropertyList.StrokeDashArray.length == 0 ? '1' : this.textblockData[i].PropertyList.StrokeThickness * 5,
          StrokeThickness:this.textblockData[i].PropertyList.StrokeThickness,
          marginTop:Number(this.textblockData[i].PropertyList.Height/2)-(Number(this.textblockData[i].PropertyList.StrokeThickness)/2),
          Stroke:StrokeColor,
          class:this.textblockData[i].Name,
          ZIndex:this.ZIndex
        }
        this.dataValue.push(value)
      }
    }
    }
};
</script>

<style lang="scss" scoped>
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