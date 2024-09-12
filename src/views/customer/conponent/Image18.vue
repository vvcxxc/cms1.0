<!--
 * @Description: 这是动态圖片页面（组件）
 * @Date: 2019-11-18 15:28:36
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-18 11:48:46
 -->
<template>
  <div>
   <div v-for="(item,index) in dataValue" :key="index">
  <div v-if="show" 
   @dblclick="opendb(item)" 
   @contextmenu.prevent 
   @mousedown="downClick(item,$event)" 
   @mouseup="seupClick(item,$event)"
      name="image" :class="item.class" class="Image18e" :style="'width:'+ item.width + 'px; height:' + item.height 
      + 'px; opacity:' + item.opacity + '; position:absolute; left:' + item.left  + 'px; top:' 
      + item.top + 'px; transform:rotate(' + item.rotate + 'deg);zIndex:'+item.ZIndex" >
        <img :id="item.class" :src="item.source" :style="'height:' + item.H " :class="{cimg:bl==1}">
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
        show:true,
        dataValue:[],
        textblockData:[],
        cla:[],
        commerPopShow1:false,
        ZIndex:'',
        resData:[],  //初始化请求变量值
        varArr:[],   //变量名
         bl:'',
        lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    };
  },
  props:['dae','name','dataId'],
      watch:{
         screen(val){
    this.bl = JSON.parse(JSON.stringify(val))
       if(window.screen.width==1920&&window.screen.height==1080){
          this.bl = 2
        }
          //  console.log("val",val)
      },
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
      if(this.$store.state.websocketsShow != null){
        this.msgHub2 = window.$.connection.redisMonitor
        if(this.msgHub2){
          this.msgHub2.server.removeVariables(this.varArr)
        }
      }
    },
  mounted(){
    this.data = this.dae
     let screen = JSON.parse(sessionStorage.getItem('screen'))
        if(!screen){
         this.bl = 2;
        }else if(screen == 'one'){
        this.bl = 1
        }else if(screen == 'two'){
        this.bl = 2
        }else if(screen == 'three'){
        this.bl = 3
        }else if(screen == 'four'){
        this.bl = 4
        }
        if(window.screen.width==1920&&window.screen.height==1080){
          this.bl = 2
        }
    if(this.data){
      this.init()
    }
  },
  computed:{
    screen(){
      return this.$store.state.screentype
    }
 },
  methods: {
    init(){
       //数据筛选
       this.data = this.dae
       this.Name = 'image'
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
       //根据控件名拿样式值
      for(var k=0;k<this.data.Data.ImageAnimationList.length;k++){
          var name = this.data.Data.ImageAnimationList[k].ElementName.slice(0,5).toLowerCase()
          var nameNull =  this.data.Data.ImageAnimationList[k].TagName
          var ElementNameNull = this.data.Data.ImageAnimationList[k].ElementName
          var index =  this.cla.indexOf(ElementNameNull)  
          if(index != -1 && nameNull != null){
            this.Sarr.push(this.data.Data.ImageAnimationList[k].ElementName)
            var value = {
              "TagName":this.data.Data.ImageAnimationList[k].TagName,
              "NO":this.data.Data.ImageAnimationList[k].NO
            }
            this.resTagName.push(value)
            this.TextAnimationListData.push(this.data.Data.ImageAnimationList[k])
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
       if(this.textblockData.length!=0){
                this.show = true
            }else{
                this.show = false
            }
      //赋值
      if(this.show){
        this.gitValue()
        this.axioImg()
      }
      //加入变量
      this.JoinVarFun()
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
        //升序
        compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        //加入变量   主页面也有加入变量
        JoinVarFun(){
          if(this.$store.state.websocketsShow != null){
            let arr  = []
            arr = new Set(this.resTagName)
            arr = [...arr]
            this.varArr = arr
            this.msgHub2 = window.$.connection.redisMonitor
            if(this.msgHub2){
              this.msgHub2.server.addVariables(arr)
            }  
          }
        },

      //筛选变量组方法
      arrFun(){
          this.data = this.dae
          this.nullArr = []
          this.Arr = []
           let ImageList = this.data.Data.ImageAnimationList
           for(var j=0;j<ImageList.length; j++){   
              var dd2 =  this.Starr.indexOf(ImageList[j].ElementName)
              if(dd2 != -1){
                if(ImageList[j].TagName != null){
                       var arra = {
                      ImageName: ImageList[j].ImageName,
                      Condition: ImageList[j].Condition,
                      Compare: ImageList[j].Compare,
                      TagName: ImageList[j].TagName,
                      ElementName: ImageList[j].ElementName,
                      NO:ImageList[j].NO,
                    }
                    this.Arr.push(arra)
                }else{
                   var arraa = {
                      ImageName: ImageList[j].ImageName,
                      Condition: ImageList[j].Condition,
                      Compare: ImageList[j].Compare,
                      TagName: ImageList[j].TagName,
                      ElementName: ImageList[j].ElementName,
                    }
                       this.nullArr.push(arraa)
                }   
              }
            }
            this.Arr =  this.Arr.sort(this.compare('NO'))
      },
      //条件判断方法
      judgeFun(data){
        // console.log('data==>',data)
        var TextAnimationListData = this.TextAnimationListData
        var aa
        this.ElementNameHas = ['1']
        if(data.length==0){
          for(let f=0;f<this.Starr.length;f++){
            aa = '#' + this.Starr[f]
            document.querySelector(aa).src=`/ViewImage/${this.name}/${this.nullArr[f].ImageName}`
            // document.querySelector(aa).src=require(`../../../ViewImage/${this.name}/${this.nullArr[f].ImageName}`)
          }
        }else{
          //将请求回的值和json文件条件判断
          for(let i=0;i<data.length;i++){
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
                        aa = '#' + cla
                        document.querySelector(aa).src=`/ViewImage/${this.name}/${TextAnimationListData[i].ImageName}`
                        // document.querySelector(aa).src=require(`../../../ViewImage/${this.name}/${TextAnimationListData[i].ImageName}`)
                    }else{

                        for(var j=0;j<this.nullArr.length;j++){
                            if(cla == this.nullArr[j].ElementName){
                                  aa = '#' + cla
                                   if(this.nullArr[j].ImageName == 'DynamicPicture.png'){
                                      document.querySelector(aa).src= require(`../../../assets/images/DynamicPicture.png`)
                                    }else{
                                     document.querySelector(aa).src= `/ViewImage/${this.name}/${this.nullArr[j].ImageName}`
                                      // document.querySelector(aa).src= require(`../../../ViewImage/${this.name}/${this.nullArr[j].ImageName}`)
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
                            aa = '#' + cla1
                            if(this.nullArr[j].ImageName == 'DynamicPicture.png'){
                              document.querySelector(aa).src= require(`../../../assets/images/DynamicPicture.png`)
                            }else{
                             document.querySelector(aa).src= `/ViewImage/${this.name}/${this.nullArr[j].ImageName}`
                              // document.querySelector(aa).src= require(`../../../ViewImage/${this.name}/${this.nullArr[j].ImageName}`)
                            }
                          }
                      }
                }
          }
        }
      },

    //初始化请求，websocket初始不给值自己查询一遍
    axioImg(){
          this.resData = []
          this.arrFun()
          this.arr = []
          if(this.resTagName.length != 0){
            //  请求接口
              this.$axios({
                  method: 'post',
                  url: '/api/Base/PostRediusTest',
                  data: this.resTagName
              }).then(res => {
                this.resData.push(res.data.data)
                this.judgeFun(res.data.data)
              })
              .catch(function(error) {
                  console.log('ERR',error);
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
    //赋值
    gitValue(){
        this.dataValue =[]
       for(let item of this.textblockData){
           //加层级zIndex
          var ZIndexs = this.data.Data.ZIndexs
          if(ZIndexs){
            for(let ite in ZIndexs){
              if(item.Name == ite){
                this.ZIndex = ZIndexs[ite]
                break
              }
            }
          }else{
              this.ZIndex = ''
          }
         var j 
         var jc
         var sourceSrc
         if(item.PropertyList.Source != null){
            j = item.PropertyList.Source.slice(0,item.PropertyList.Source.length-3)
            jc = item.PropertyList.Source.slice(item.PropertyList.Source.length-3,item.PropertyList.Source.length)
            sourceSrc = jc == 'JPG' ? `/ViewImage/${this.name}/${j}jpg` : `/ViewImage/${this.name}/${item.PropertyList.Source}`
            // sourceSrc = jc == 'JPG' ? require(`../../../ViewImage/${this.name}/${j}jpg`) : require(`../../../ViewImage/${this.name}/${item.PropertyList.Source}`)
         }else{
            sourceSrc = require(`../../../assets/images/DynamicPicture.png`)
         }
        this.dataValue.push({
          width:item.PropertyList.Width,
          height:item.PropertyList.Height,
          rotate:item.PropertyList.RotateAngle,
          top:item.PropertyList.Top,
          left:item.PropertyList.Left,
          opacity:item.PropertyList.Opacity / 100,
          class:item.Name,
          source: sourceSrc,
          W:Number(item.PropertyList.Width)<Number(item.Height) ? '100%' : '',
          H:Number(item.PropertyList.Height)<Number(item.Width) ? '100%' : '',
          ZIndex:this.ZIndex
        })  
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Image18e{
   display: inline-block;
   position: relative;
    img{
       position: absolute;
      top:0;
      left:0;
      right:0;
      bottom: 0;
      width:auto;
      object-fit: contain;
      max-height:100%;
      max-width:100%;
      margin: auto;
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
.cimg{
  object-fit: contain !important;
}
</style>
