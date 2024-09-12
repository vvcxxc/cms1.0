<!--
 * @Description: 这是动态文本页面（组件）
 * @Date: 2019-11-18 15:12:08
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-18 09:23:09
 -->
<template>
<div>
  <div v-for="(item,index) in dataValue" :key="index">
  <div
    v-if="show"
    @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
     name="dynamictext" :ref="item.class" :class="'aa'+item.class" class="DynamicText171a" :style="'width:' 
    + item.width +'px; height:' + item.height + 'px; fontSize:' + item.size 
    + 'px; backgroundColor:' + borC +'; fontFamily:'+ item.family + ';display: flex;justify-content: center; align-items: center;opacity:' 
    + item.opacity + '; position:absolute; left:' + item.left + 'px; top:' + item.top 
    + 'px; transform:rotate(' + item.rotate + 'deg);overflow:hidden;white-space:pre; text-decoration:' 
    + item.TextDecorations + ';color:' + item.Foreground + '; textAlign:center;zIndex:'+item.ZIndex+';'
    + 'border-radius:'+ borPx + 'px;border:' + borderPx + 'px solid ' + item.BorderBrush + ';fontWeight:'+item.Blod"
  >{{text}}</div>
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
      Name:'',
      width:0,
      height:0,
      rotate:0,
      text: "动态文本",
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
      cla:[],
      Starr:'',
      borPx:10,
      borderPx:1,
      borC:'#DDDDDD',
      commerPopShow1:false,
      ZIndex:'',
      resData:[],  //初始化请求变量值
      varArr:[],   //变量名
    };
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
            this.init();
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
      this.init();
    }
  },
  methods: {
    init(){
      this.data = this.dae
      this.Name = 'dynamictext'
       //数据筛选
      this.textblockData = []
      var dataAll = this.data.Controls.ControlList
      this.cla = []
      for(var i=0;i<dataAll.length;i++){
       if(dataAll[i].ControlType == this.Name){
          this.textblockData.push(dataAll[i])
          this.cla.push(dataAll[i].Name)
        }
      }
      this.Sarr = []
      this.resTagName = []
      this.TextAnimationListData = []
      for(let k=0;k<this.data.Data.TextAnimationList.length;k++){
         var nameNull =  this.data.Data.TextAnimationList[k].TagName
         var ElementNameNull = this.data.Data.TextAnimationList[k].ElementName
         var index =  this.cla.indexOf(ElementNameNull)
          if(index != -1 && nameNull != null){
              this.Sarr.push(this.data.Data.TextAnimationList[k].ElementName)
              var value = {
                "TagName":this.data.Data.TextAnimationList[k].TagName,
                "NO":this.data.Data.TextAnimationList[k].NO
              }
              this.resTagName.push(value)
              this.TextAnimationListData.push(this.data.Data.TextAnimationList[k])
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
           }else if(e.which == 3){ //鼠标右键松开
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

    //赋值
    gitValue(){
      this.dataValue =[]
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
          var foreOp = this.textblockData[i].PropertyList.Foreground.slice(1,3)
          var foreColor = this.textblockData[i].PropertyList.Foreground.slice(3)
          var borderOp = this.textblockData[i].PropertyList.BorderBrush.slice(1,3)
          var borderColor = this.textblockData[i].PropertyList.BorderBrush.slice(3)
          var value = {
          width:this.textblockData[i].PropertyList.Width,
          height:this.textblockData[i].PropertyList.Height,
          rotate:this.textblockData[i].PropertyList.RotateAngle,
          top:this.textblockData[i].PropertyList.Top,
          left:this.textblockData[i].PropertyList.Left,
          opacity:this.textblockData[i].PropertyList.Opacity / 100,
          Foreground:'#' + foreColor + foreOp,
          BorderBrush:'#' + borderColor + borderOp,
          family:this.textblockData[i].PropertyList.borderOp,
          size:this.textblockData[i].PropertyList.FontSize,
          class:this.textblockData[i].Name,
          TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
          Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
          ZIndex:this.ZIndex
        }
        this.dataValue.push(value)
      }
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
        let AxiosData = this.data.Data.TextAnimationList
        for (var i = 0; i < AxiosData.length; i++) { 
          var dd2 =  this.Starr.indexOf(AxiosData[i].ElementName)
          if(dd2 != -1){
              if(AxiosData[i].TagName != null){
              var arra = {
                StrokeType:AxiosData[i].StrokeType,
                Text: AxiosData[i].Text,
                BorderColor: AxiosData[i].BorderColor,
                BackgroundColor: AxiosData[i].BackgroundColor,
                ForegroundColor: AxiosData[i].ForegroundColor,
                Condition: AxiosData[i].Condition,
                Compare: AxiosData[i].Compare,
                TagName: AxiosData[i].TagName,
                ElementName: AxiosData[i].ElementName,
                NO:AxiosData[i].NO,
              }
              this.Arr.push(arra)
            }else if(AxiosData[i].TagName == null && dd2!= -1){
                var arraa = {
                StrokeType: AxiosData[i].StrokeType,
                Text: AxiosData[i].Text,
                BorderColor: AxiosData[i].BorderColor,
                BackgroundColor: AxiosData[i].BackgroundColor,
                ForegroundColor: AxiosData[i].ForegroundColor,
                Condition: AxiosData[i].Condition,
                Compare: AxiosData[i].Compare,
                TagName: AxiosData[i].TagName,
                ElementName: AxiosData[i].ElementName,
              }
                  this.nullArr.push(arraa)
            }
          }
        }
        this.Arr =  this.Arr.sort(this.compare('NO'))
      },
      //动态文本赋值、样式
      DynamicTextFun(aa,type,index,data){
          document.querySelector(aa).style.borderColor = data[index].BorderColor
          document.querySelector(aa).innerHTML = data[index].Text
          document.querySelector(aa).style.color = data[index].ForegroundColor
          document.querySelector(aa).style.background = data[index].BackgroundColor
            if(type==1){
              document.querySelector(aa).style.borderRadius = '10px'
            }else if(type == 2){
              document.querySelector(aa).style.borderRadius = '4px'
            }else if(type==3){
              document.querySelector(aa).style.borderRadius = '0px'
            }else if(type==4){
              document.querySelector(aa).style.border = '0px solid red'
            }
      },
      //条件判断方法
      judgeFun(data){
              var TextAnimationListData = this.TextAnimationListData
              var nullArrtype
              var aa
              this.ElementNameHas = ['1']
              //   //请求数据为空
              if(data.length==0){
                $('.DynamicText171a').css('borderRadius','10px')
                $('.DynamicText171a').css('borderColor','#707070')
                $('.DynamicText171a').css('innerHTML','动态文本')
                $('.DynamicText171a').css('color','#707070')
                $('.DynamicText171a').css('background','#DDDDDD')
                  for(let f=0;f<this.Starr.length;f++){
                    aa = '.aa' + this.Starr[f]
                    nullArrtype = this.nullArr[f].StrokeType
                    this.DynamicTextFun(aa,nullArrtype,f,this.nullArr)
                  }
              }else{
                for(let i=0;i<data.length;i++){
                  if(data[i].Value != null){
                      var result
                      var resValue
                      var Runsymbol
                      var ArrValue
                      var resValueNumber = data[i].Value
                      resValue = data[i].Value.toLowerCase()
                      ArrValue = TextAnimationListData[i].Compare.toLowerCase()
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
                        var type =TextAnimationListData[i].StrokeType
                        aa = '.aa' + cla
                        this.DynamicTextFun(aa,type,i,TextAnimationListData)
                    }else{
                      for(var j=0;j<this.nullArr.length;j++){
                        if(cla == this.nullArr[j].ElementName){
                            aa = '.aa' + cla
                            nullArrtype = this.nullArr[j].StrokeType
                            this.DynamicTextFun(aa,nullArrtype,j,this.nullArr)
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
                            nullArrtype = this.nullArr[q].StrokeType
                            this.DynamicTextFun(aa,nullArrtype,q,this.nullArr)
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
          this.arr = []
          for(var j=0;j<this.Arr.length;j++){
            this.arr.push(this.Arr[j].TagName)
          }
          if(this.resTagName.length != 0){
            //  请求接口
            this.$axios({
                method: 'post',
                url: '/api/Base/PostRediusTest',
                data: this.resTagName
            }).then(res => {
              this.resData.push(res.data.data)
              this.judgeFun(res.data.data)
            }).catch(function(error) {
                    console.log('err',error);
            });
          }
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
  }
};
</script>
<style lang="scss" scoped>
.DynamicText171a{
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