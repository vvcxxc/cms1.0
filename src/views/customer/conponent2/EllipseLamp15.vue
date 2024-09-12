<!--
 * @Description: 这是状态灯页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-18 09:27:09
 -->
<template>
<div>
    <div v-for="(item,index) in dataValue" :key="index">
      <div 
      v-if="show" 
      @dblclick="opendb(item)" 
      @contextmenu.prevent 
      @mousedown="downClick(item,$event)" 
      @mouseup="seupClick(item,$event)"
      name="ellipselamp" :class="'aa'+item.class" class="EllipseLamp15a" 
      :style="'width:'+ item.width +'px; height:'+ item.height +'px; border:1px solid #fff; backgroundColor:' + item.Fill 
      + '; position:absolute; left:' + item.left + 'px; top:' + item.top + 'px; transform:rotate(' 
      + item.rotate + 'deg); opacity:' + item.opacity+ '; borderRadius:' + radius + '%; transform:rotate(' 
      + item.rotate + 'deg);zIndex:'+item.ZIndex+'; boxShadow:'+item.Shadow ">
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
          radius:50,
          show:true,
          Arr:[],
          textblockData:[],
          dataValue:[],
          Starr:[],
          cla:[],
          timerShow:true,
          commerPopShow1:false,
          ZIndex:'',
          resData:[],  //初始化请求变量值
          varArr:[],   //变量名
        }
    },
    props:['dae','dataId'],
    watch:{
      dae:{
        deep:true,
        handler(val){
              
              this.data = val;
              if(val){
                this.msgHub2 = window.$.connection.redisMonitor
                if(this.msgHub2){
                  this.msgHub2.server.removeVariables(this.varArr)
                }

                 this.dataValue = []
                  this.init() 
              } 
        }
      }
    },
    beforeDestroy(){
      this.msgHub2 = window.$.connection.redisMonitor
      if(this.msgHub2){
        this.msgHub2.server.removeVariables(this.varArr)
      }
    },
    created(){
      
    },
    mounted(){
      if(this.dae){
        this.init()
      }
    },
    methods: {
      init(){
            this.dataValue = []
            this.data = this.dae
            this.Name = 'ellipselamp'
                //数据筛选
            var dataAll = this.data.Controls.ControlList
            this.cla = []
            this.textblockData = []
            for(var i=0;i<dataAll.length;i++){
              if(dataAll[i].ControlType == this.Name){
                this.textblockData.push(dataAll[i])
                this.cla.push(dataAll[i].Name)
              }
            }
            this.Sarr = []
            this.resTagName = []
            this.TextAnimationListData = []
            for(var k=0;k<this.data.Data.StatusAnimationList.length;k++){
              var nameNull =  this.data.Data.StatusAnimationList[k].TagName
              var ElementNameNull = this.data.Data.StatusAnimationList[k].ElementName
              var index =  this.cla.indexOf(ElementNameNull)  
              for(var e=0;e<this.textblockData.length;e++){
                  if(index != -1 && nameNull != null){
                    this.Sarr.push(this.data.Data.StatusAnimationList[k].ElementName)
                    var value = {
                      "TagName":this.data.Data.StatusAnimationList[k].TagName,
                      "NO":this.data.Data.StatusAnimationList[k].NO
                    }
                    this.resTagName.push(value)
                    this.TextAnimationListData.push(this.data.Data.StatusAnimationList[k])
                  }
              }
            }

            this.TextAnimationListData =  this.TextAnimationListData.sort(this.compare('NO'))
            this.resTagName =  this.resTagName.sort(this.compare('NO'))
            let resTagNameArr = JSON.parse(JSON.stringify(this.resTagName))
            this.resTagName = []
            for(let s=0;s<resTagNameArr.length;s++){
              this.resTagName.push(resTagNameArr[s].TagName)
            }
            
            var a = new Set(this.Sarr)
            this.Starr = [...a]
            if(this.textblockData.length != 0){
              this.show = true
            }else{
              this.show = false
            }
            //赋值
            if(this.show){
              this.gitValue()
            }
            this.axio()
            this.JoinVarFun()  //加入变量
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
        let arr  = []
        arr = new Set(this.resTagName)
        arr = [...arr]
        this.varArr = arr
        this.msgHub2 = window.$.connection.redisMonitor
        if(this.msgHub2){
          this.msgHub2.server.addVariables(arr)
        }  
      },
      //筛选变量组方法
      arrFun(){
        this.data = this.dae
        this.nullArr = []
        this.Arr = []
        let AxiosData = this.data.Data.StatusAnimationList
        for (var i = 0; i < AxiosData.length; i++) {  //从json文件将条件值取出
          var dd2 =  this.Starr.indexOf(AxiosData[i].ElementName)
          if(dd2 != -1){
            if(AxiosData[i].TagName != null){
                var arra = {
                  Color: AxiosData[i].Color,
                  Condition: AxiosData[i].Condition,
                  Compare: AxiosData[i].Compare,
                  TagName: AxiosData[i].TagName,
                  ElementName: AxiosData[i].ElementName,
                  NO:AxiosData[i].NO,
                  IsTwinkle:AxiosData[i].IsTwinkle,
                }
                this.Arr.push(arra)
              }else if(AxiosData[i].TagName == null && dd2!= -1){
                var arraa = {
                  Color: AxiosData[i].Color,
                  Condition: AxiosData[i].Condition,
                  Compare: AxiosData[i].Compare,
                  TagName: AxiosData[i].TagName,
                  ElementName: AxiosData[i].ElementName,
                  IsTwinkle:AxiosData[i].IsTwinkle,
                }
                  this.nullArr.push(arraa)
              }
          }
        }
        this.Arr =  this.Arr.sort(this.compare('NO'))
        this.arr = []
        for(var j=0;j<this.Arr.length;j++){
          this.arr.push(this.Arr[j].TagName)
        }
      },
      //条件判断方法
      judgeFun(data){
        var TextAnimationListData = this.TextAnimationListData
        var nullArrtype
        var aa
        this.ElementNameHas = ['1']
        if(data.length==0){
            for(let f=0;f<this.Starr.length;f++){
              aa = '.aa' + this.Starr[f]
              document.querySelector(aa).style.background = this.nullArr[f].Color
            }
        }else{
          for(let i=0;i<data.length;i++){   //将请求回的值和json文件条件判断
              if(data[i].Value != null){
                  var result
                  var resValue
                  var Runsymbol
                  var ArrValue
                  var resValueNumber = data[i].Value
                  resValue = data[i].Value.toLowerCase()
                  ArrValue = TextAnimationListData[i].Compare == null ?  TextAnimationListData[i].Compare : TextAnimationListData[i].Compare.toLowerCase()
                  Runsymbol = TextAnimationListData[i].Condition
                  if(resValue == 'TRUE' || resValue == 'True' || resValue == 'true'){
                      resValue = 1
                  }else if(resValue == 'FALSE' || resValue =='False' || resValue =='false'){
                      resValue = 0
                  }else if(isNaN(resValueNumber)&&!isNaN(Date.parse(resValueNumber))){
                        resValue = data[i].Value
                  }else if(typeof(Number(resValueNumber)) == 'number'){
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
                          ArrValue =  TextAnimationListData[i].Compare
                    }else if(typeof(Number(resValueNumber)) == 'number'){
                      ArrValue = Number( TextAnimationListData[i].Compare)
                    }else{
                      ArrValue =  TextAnimationListData[i].Compare
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
                    var dd = this.ElementNameHas.indexOf(TextAnimationListData[i].ElementName)
                    if(dd != -1){
                      continue;
                    }
                    var cla = TextAnimationListData[i].ElementName
                    if(result){
                      this.ElementNameHas.push(TextAnimationListData[i].ElementName)
                      aa = '.aa' + cla
                      //改变颜色
                      document.querySelector(aa).style.background =  TextAnimationListData[i].Color
                      //是否闪烁
                      if(TextAnimationListData[i].IsTwinkle){
                          document.querySelector(aa).classList.add('ElipAnimation')
                      }else{
                        document.querySelector(aa).classList.remove('ElipAnimation')
                      }
                    }else{
                      for(var j=0;j<this.nullArr.length;j++){
                          if(cla == this.nullArr[j].ElementName){
                              aa = '.aa' + cla
                              document.querySelector(aa).style.background = this.nullArr[j].Color
                                //是否闪烁
                              if(this.nullArr[j].IsTwinkle){
                                  document.querySelector(aa).classList.add('ElipAnimation')
                              }else{
                                document.querySelector(aa).classList.remove('ElipAnimation')
                              }
                          }
                      }
                    }
              }else{
                var dd1 = this.ElementNameHas.indexOf(TextAnimationListData[i].ElementName)
                if(dd1 != -1){
                      continue;
                }
                for(let q=0;q<this.nullArr.length;q++){
                  if(TextAnimationListData[i].ElementName == this.nullArr[q].ElementName){
                      var cla1 = TextAnimationListData[i].ElementName
                      aa = '.aa' + cla1
                      document.querySelector(aa).style.background = this.nullArr[q].Color
                        //是否闪烁
                      if(this.nullArr[q].IsTwinkle){
                          document.querySelector(aa).classList.add('ElipAnimation')
                      }else{
                        document.querySelector(aa).classList.remove('ElipAnimation')
                      }
                  }
                }
              }
          }
        }
      },
      //初始化请求，websocket初始不给值自己查询一遍
      axio(){
          this.resData = []
          this.arrFun()
            //请求接口
          this.$axios({
              method: 'post',
              url: '/api/Base/PostRediusTest',
              data: this.resTagName
          }).then(res => {
              this.resData.push(res.data.data)
              this.judgeFun(res.data.data)
          }).catch(function(error) {
              console.log('err',error)
          });
      },
       //websocket触发该方法
      axioImg2(resArr){
          //防止多次触发
          if(this.resTagName){
            let index = this.resTagName.indexOf(resArr.name)
            let resShow = false
            if(index != -1){
              for(let i=0;i<this.resData[0].length;i++){
                if(this.resData[0][i].Name == this.resTagName[index]){
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
            this.judgeFun(this.resData[0]) 
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
        var fillOp = this.textblockData[i].PropertyList.Fill.slice(1,3)
        var fillColor = this.textblockData[i].PropertyList.Fill.slice(3)
        var strokeOp = this.textblockData[i].PropertyList.Stroke.slice(1,3)
        var strokeColor = this.textblockData[i].PropertyList.Stroke.slice(3)
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
                        +  borderSadow.InnerShadow.Color+ ' inset'
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
        var value = {
          width:this.textblockData[i].PropertyList.Width,
          height:this.textblockData[i].PropertyList.Height,
          rotate:this.textblockData[i].PropertyList.RotateAngle,
          top:this.textblockData[i].PropertyList.Top,
          left:this.textblockData[i].PropertyList.Left,
          opacity:this.textblockData[i].PropertyList.Opacity / 100,
          Fill:'#' + fillColor + fillOp,
          Stroke:'#' + strokeColor + strokeOp,
          StrokeThickness:this.textblockData[i].PropertyList.StrokeThickness,
          class:this.textblockData[i].Name,
          Shadow:Shadow,
          ZIndex:this.ZIndex
        }
        this.dataValue.push(value)
      }
    }
    }
}
</script>
<style lang="scss" scoped>
.EllipseLamp15a{
  display:inline-block;
}
.ElipAnimation{
  animation:mymove 1s infinite;
}
@keyframes mymove
{
    0%   {opacity: 0}
    25%  {opacity: 1;}
    50%  {opacity: 1;}
    75%  {opacity: 1;}
    100% {opacity: 0;}
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
