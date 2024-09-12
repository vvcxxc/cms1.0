<!--
 * @Description: 这是流动管道（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-07 11:32:12
 -->
<template>
<div>
  <div v-for="(item,index) in dataValue" :key="index">

    <div v-if="show" name="flowpipe"  
      @contextmenu.prevent  @mousedown="downClick(item,$event)"     @mouseup="seupClick(item,$event)"  :class="item.class" :style="'width:' + item.width + 'px; height:' 
    + item.height + 'px; position:absolute; top:' + item.top+ 'px; left:' + item.left 
    + 'px; transform:rotate(' + item.rotate +'deg); opacity:' + item.opacity + ';zIndex:'
    + item.ZIndex + ';background:'+item.Fill+';boxShadow:' + item.Shadow "  @dblclick="opendb(item,$event)"  >
      <div class="flowpipediv" :class="{fz:item.fz}">
          <div class="flowline"   v-for="(item1,index1) in item.intervalarr" :key="index1" :style="'background:'+item.lineColor+';left:'+item1+'px'">
                
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
           CanExcuteShow:false,
           resTagName:[],
           FlowPipeAnimationList:{},
           lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:['dae','dataId'],
     watch:{
      dae:{
        deep:true,
        handler(val){
          this.data = val;
          console.log("data111111111",val)
          if(val){
            this.init();
          }
        }
      }
    },
    mounted(){
      this.data = this.dae
    
      this.Name = 'flowpipe'
      if(this.data){
       this.init()
      }
    },
    methods: {
           JoinVarFun(){
            console.log("ffff",this.dataValue)
      },
      axioImg2(resArr){
          let resArr1 = JSON.parse(JSON.stringify(resArr))
         if(resArr1.value == '???'){
             return
         }
        //   this.axio()
        
              this.dataValue.forEach((item)=>{
          this.data.Data.FlowPipeAnimationList.forEach((item1)=>{
                if(item.class == item1.ElementName){
 
                   item.isflow = false
                             if(item1.SpeedTagName == resArr1.name){
                                let resdata = JSON.parse(JSON.stringify(resArr1.value))
                                let resfz = JSON.parse(JSON.stringify(item.fz))
                                             if(resdata === 'True'||resdata === 'true'){
            resdata = '2'
        }
        resdata = String(parseInt(resdata))
         
      if(parseFloat(resdata)<-3){
          resdata = 400
            resfz = true
      }else if(parseFloat(resdata)>3){
           resdata = 400
            resfz = false
       }else if(resdata == '3'){
            resdata = 400
            resfz = false
        }else if(resdata == '2'){
            resdata = 1000
            resfz = false
        }else if(resdata == '1'){
            resdata = 2000
            resfz = false
        }else if(resdata == '0'||resdata == 'NaN'){
            resdata = 99999999999999999999
            resfz = false
        }else if(resdata == '-1'){
            resdata = 2000
            resfz = true
        }else if(resdata == '-2'){
            resdata = 1000
            resfz = true
        }else if(resdata == '-3'){
            resdata = 400
            resfz = true
        }
      
        if(resfz == item.fz){
             if(resdata == item.FlowSpeed){
                
                 item.isflow = false
             }else{
                 item.isflow = true
                 item.FlowSpeed =  resArr1.value
                  item.FlowSpeed1 =  resArr1.value
                    
                                 clearInterval(item.time)
                                 delete(item.time)
             }
        }else{
              item.isflow = true
              item.FlowSpeed =  resArr1.value
               item.FlowSpeed1 =  resArr1.value
                 
                                 clearInterval(item.time)
                                 delete(item.time)
        }
                              
                             
                        
                        }
                        if(item1.LineTagName == resArr1.name){
                               if(resArr.name == 'Y2'){
        
        }
                            if((item.intervalarr.length>0&&resArr1.value=='False')){
                               item.isflow = true
                                  item.intervalarr = []
                                     item.lineshow = resArr1.value
                                     clearInterval(item.time)
                                  delete(item.time)
                            }else{
                              if((item.intervalarr.length>0&&resArr1.value==0)){
                                item.isflow = true
                                  item.intervalarr = []
                                     item.lineshow = resArr1.value
                                     clearInterval(item.time)
                                  delete(item.time)
                            }else{
                                if((item.intervalarr.length>0&&resArr1.value=='0')){
                                item.isflow = true
                                  item.intervalarr = []
                                     item.lineshow = resArr1.value
                                     clearInterval(item.time)
                                  delete(item.time)
                            }else{
                              if((item.intervalarr.length>0&&resArr1.value=='false')){
                                item.isflow = true
                                  item.intervalarr = []
                                     item.lineshow = resArr1.value
                                     clearInterval(item.time)
                                  delete(item.time)
                            }else{
                            if((item.intervalarr.length==0&&(resArr1.value!=='false'||resArr1.value!=='0'||resArr1.value!==0||resArr1.value!=='False'))){
                                item.isflow = true
                                  item.intervalarr = []
                                     item.lineshow = resArr1.value
                                      clearInterval(item.time)
                                  delete(item.time)
                            }else{
                                
                            //  item.isflow = false
                            }
                            }
                            }
                            }
                            }
                              
                           
                            
                             
                         
                        }
                             
                            if( item1.SpeedTagName == '0'||item1.SpeedTagName =='False'|| item1.SpeedTagName =='false'){
                                if(item.isflow){
   clearInterval(item.time)
                                item.intervalarr = []
                                }
                             
                                 for(let i=0;i<item1.FlowPipeLineAnimationList.length;i++){
                                     let showCompare = JSON.parse(JSON.stringify(item1.FlowPipeLineAnimationList[i].Compare))
                                     if(showCompare=='True'||showCompare=='true'){
                                         showCompare = "1"
                                     }else if(showCompare=='False'||showCompare == 'false'){
                                          showCompare = "0"
                                     }
                                       let showCompare1 = JSON.parse(JSON.stringify(resArr1.value))
                                     if(showCompare1=='True'||showCompare1=='true'){
                                         showCompare1 = "1"
                                     }else if(showCompare1=='False'||showCompare1 == 'false'){
                                          showCompare1 = "0"
                                     }
                                     if(showCompare == showCompare1){
                                                     let one = item1.FlowPipeLineAnimationList[i].Color.slice(1,3)
                                let two = item1.FlowPipeLineAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                
                                 if(item1.FlowPipeLineAnimationList[i].Color.length >=8){
                               item.lineColor = two+one
                                }else{
                                 item.lineColor = item1.FlowPipeLineAnimationList[i].Color
                                }
                                         
                                     }else{
                                         item.lineColor = JSON.parse(JSON.stringify(item.lineColor2))
                                     }
                                 }
                            }else{
                                
                                           if(item.isflow){
                                item.intervalarr = []
                                }

                                 for(let i=0;i<item1.FlowPipeLineAnimationList.length;i++){
                                       if(item1.LineTagName == resArr1.name){
                                           let showCompare = JSON.parse(JSON.stringify(item1.FlowPipeLineAnimationList[i].Compare))
                                       if(showCompare=='True'||showCompare=='true'){
                                         showCompare = "1"
                                     }else if(showCompare=='False'||showCompare == 'false'){
                                          showCompare = "0"
                                     }
                                       let showCompare1 = JSON.parse(JSON.stringify(resArr1.value))
                                     if(showCompare1=='True'||showCompare1=='true'){
                                         showCompare1 = "1"
                                     }else if(showCompare1=='False'||showCompare1 == 'false'){
                                          showCompare1 = "0"
                                     }
                            if(showCompare == showCompare1){
                                                     let one = item1.FlowPipeLineAnimationList[i].Color.slice(1,3)
                                let two = item1.FlowPipeLineAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                
                                 if(item1.FlowPipeLineAnimationList[i].Color.length >=8){
                               item.lineColor = two+one
                                }else{
                                 item.lineColor = item1.FlowPipeLineAnimationList[i].Color
                                }
                                         break
                                     }else{
                                          item.lineColor = JSON.parse(JSON.stringify( item.lineColor2))
                                     }
                                       }
                                    
                                 
                                 }
                                            if(item.isflow){
                                   let intervalarr = []
        for(let i1=0;i1<Math.ceil(item.width/48)+2;i1++){
            intervalarr.push((i1-1)*48)
        }
        item.intervalarr = intervalarr
                                }
  
                            }
                         if(item.isflow){
            if(item.lineshow=='0'||item.lineshow=='false'||item.lineshow=='False'){
                                item.intervalarr = []
                                clearInterval(item.time)
                            
                        }
                         }
                
                             

                }

          })

        })
             this.dataValue.forEach((item,index)=>{
                 if(item.isflow){
                 if(!item.hasOwnProperty('time')){
                       if(item.FlowSpeed1){
               item.FlowSpeed = JSON.parse(JSON.stringify(item.FlowSpeed1))
          }
                     console.log(item)
                  if(item.FlowSpeed === 'True'||item.FlowSpeed === 'true'){
            item.FlowSpeed = '2'
        }
        item.FlowSpeed = String(parseInt(item.FlowSpeed))
         
      if(parseFloat(item.FlowSpeed)<-3){
          item.FlowSpeed = 400
            item.fz = true
      }else if(parseFloat(item.FlowSpeed)>3){
           item.FlowSpeed = 400
            item.fz = false
       }else if(item.FlowSpeed == '3'){
            item.FlowSpeed = 400
            item.fz = false
        }else if(item.FlowSpeed == '2'){
            item.FlowSpeed = 1000
            item.fz = false
        }else if(item.FlowSpeed == '1'){
            item.FlowSpeed = 2000
            item.fz = false
        }else if(item.FlowSpeed == '0'||item.FlowSpeed == 'NaN'){
            item.FlowSpeed = 99999999999999999999
            item.fz = false
        }else if(item.FlowSpeed == '-1'){
            item.FlowSpeed = 2000
            item.fz = true
        }else if(item.FlowSpeed == '-2'){
            item.FlowSpeed = 1000
            item.fz = true
        }else if(item.FlowSpeed == '-3'){
            item.FlowSpeed = 400
            item.fz = true
        }
            if(parseInt(item.FlowSpeed) !== 99999999999999999999&&parseInt(item.FlowSpeed)!==100000000000000000000){
                  item.FlowSpeed = parseFloat(item.FlowSpeed)
                              
                  item.time = setInterval(()=>{
                  
                    let i = []
                     item.intervalarr.forEach((item1,index1)=>{
                        item1+=6
                        i.push(item1)
                     })
                    let i2 = []
                     i.forEach((item2,index2)=>{
                   if(item2>(parseInt(item.width)+26)){
                              item2 = (i[this.getMinIndex(i)]-48)
                              i2.push(item2)
                         }else{
                             i2.push(item2)
                         }
                     })
                  
                    item.intervalarr = i2
       },item.FlowSpeed)
       
            }else{
            
                  clearInterval(item.time)
            }
                 }
                 }


       })

       
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
        console.log("EventType",EventType)
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
     this.resTagName = []
      this.dataValue.forEach((item)=>{
         
          this.data.Data.FlowPipeAnimationList.forEach((item1)=>{
             if(item.class == item1.ElementName){
                 if(item1.LineTagName){
                     this.resTagName.push(item1.LineTagName)
                 }
                  if(item1.SpeedTagName){
                     this.resTagName.push(item1.SpeedTagName)
                 }
             }
          })
      })
      this.axio()
     },
         //初始化请求，websocket初始不给值自己查询一遍
    axio(){
     this.$axios({
              method: 'post',
              url: '/api/Base/PostRediusTest',
              data: this.resTagName
          }).then(res => {
              console.log("res11",res)
let res1 = res.data.data.filter(item=>item.Value !== '???')
             
                this.dataValue.forEach((item)=>{
                    if(item.class == 'FlowPipe23'){
                         console.log(JSON.parse(JSON.stringify(item)))
                    }
          this.data.Data.FlowPipeAnimationList.forEach((item1)=>{
                if(item.class == item1.ElementName){
                 if(!isNaN(JSON.parse(JSON.stringify(item1.SpeedTagName)))){
                  item.FlowSpeed1 = JSON.parse(JSON.stringify(item1.SpeedTagName))
                 }
                 console.log(JSON.parse(JSON.stringify(item1.SpeedTagName)))
                 item.lineshow = item1.LineTagName
                   if(item1.LineTagName == '0'||item1.LineTagName=='False'||item1.LineTagName=='false'){
                       clearInterval(item.time)
                        item.intervalarr = []
                  }else{
                    
                       clearInterval(item.time)
                        item.intervalarr = []
                          let intervalarr = []
        for(let i1=0;i1<Math.ceil(item.width/48)+2;i1++){
            intervalarr.push((i1-1)*48)
        }
        item.intervalarr = intervalarr
  
                  if(item.FlowSpeed == 'True'||item.FlowSpeed=='true'){
            item.FlowSpeed = '2'
        }else if(parseFloat(item.FlowSpeed) >3){
            item.FlowSpeed = '3'
        }else if(parseFloat(item.FlowSpeed) < -3){
            item.FlowSpeed  = '-3'
        }
        if(item.FlowSpeed == 'True'||item.FlowSpeed === 'true'){
            item.FlowSpeed = '2'
        }
        console.log("item",item)
        console.log(  this.dataValue)
        item.FlowSpeed = String(parseInt(item.FlowSpeed))

        if(item.FlowSpeed == '3'){
            item.FlowSpeed = 400
            item.fz = false
        }else if(item.FlowSpeed == '2'){
            item.FlowSpeed = 1000
            item.fz = false
        }else if(item.FlowSpeed == '1'){
            item.FlowSpeed = 2000
            item.fz = false
        }else if(item.FlowSpeed == '0'||item.FlowSpeed == 'NaN'){
            item.FlowSpeed = 99999999999999999999
            item.fz = false
        }else if(item.FlowSpeed == '-1'){
            item.FlowSpeed = 2000
            item.fz = true
        }else if(item.FlowSpeed == '-2'){
            item.FlowSpeed = 1000
            item.fz = true
        }else if(item.FlowSpeed == '-3'){
            item.FlowSpeed = 400
            item.fz = true
        }
                  }
                }
                })
            })
              if(res1.length!==0){
           this.dataValue.forEach((item)=>{
          this.data.Data.FlowPipeAnimationList.forEach((item1)=>{
                if(item.class == item1.ElementName){
                  
                     res1.forEach((item2)=>{
                           if(item1.SpeedTagName == item2.Name){
                                item.FlowSpeed =  item2.Value
                                 item.FlowSpeed1 =  item2.Value
                        }
                        if(item1.LineTagName == item2.Name){
                         item.lineshow = item2.Value
                            if(  item2.Value== '0'||  item2.Value=='False'||  item2.Value=='false'){
                                clearInterval(item.time)
                                item.intervalarr = []
                                 for(let i=0;i<item1.FlowPipeLineAnimationList.length;i++){
                                        if(item1.LineTagName == item2.Name){
                                             let showCompare = JSON.parse(JSON.stringify(item1.FlowPipeLineAnimationList[i].Compare))
                                     if(showCompare=='True'||showCompare=='true'){
                                         showCompare = "1"
                                     }else if(showCompare=='False'||showCompare == 'false'){
                                          showCompare = "0"
                                     }
                                      let showCompare1 = JSON.parse(JSON.stringify(item2.Value))
                                     if(showCompare1=='True'||showCompare1=='true'){
                                         showCompare1 = "1"
                                     }else if(showCompare1=='False'||showCompare1 == 'false'){
                                          showCompare1 = "0"
                                     }
                                 if(showCompare == showCompare1){
                                       let one = item1.FlowPipeLineAnimationList[i].Color.slice(1,3)
                                let two = item1.FlowPipeLineAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                
                                 if(item1.FlowPipeLineAnimationList[i].Color.length >=8){
                               item.lineColor = two+one
                                }else{
                                 item.lineColor = item1.FlowPipeLineAnimationList[i].Color
                                }
                                       
                                         break
                                     }else{
                                          item.lineColor = JSON.parse(JSON.stringify( item.lineColor2))
                                     }
                                        }
                                 
                                 }
                            }else{
                                 clearInterval(item.time)
                                item.intervalarr = []
                                 for(let i=0;i<item1.FlowPipeLineAnimationList.length;i++){
                                             if(item1.LineTagName == item2.Name){
                                                     let showCompare = JSON.parse(JSON.stringify(item1.FlowPipeLineAnimationList[i].Compare))
                                     if(showCompare=='True'||showCompare=='true'){
                                         showCompare = "1"
                                     }else if(showCompare=='False'||showCompare == 'false'){
                                          showCompare = "0"
                                     }
                                      let showCompare1 = JSON.parse(JSON.stringify(item2.Value))
                                     if(showCompare1=='True'||showCompare1=='true'){
                                         showCompare1 = "1"
                                     }else if(showCompare1=='False'||showCompare1 == 'false'){
                                          showCompare1 = "0"
                                     }
                                 if(showCompare == showCompare1){
                                           let one = item1.FlowPipeLineAnimationList[i].Color.slice(1,3)
                                let two = item1.FlowPipeLineAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                
                                 if(item1.FlowPipeLineAnimationList[i].Color.length >=8){
                               item.lineColor = two+one
                                }else{
                                 item.lineColor = item1.FlowPipeLineAnimationList[i].Color
                                }
                                         break
                                     }else{
                                          item.lineColor = JSON.parse(JSON.stringify( item.lineColor2))
                                     }
                                        }
                                 }
                                 
                                     let intervalarr = []
        for(let i1=0;i1<Math.ceil(item.width/48)+2;i1++){
            intervalarr.push((i1-1)*48)
        }
         item.intervalarr = intervalarr
        if(item.FlowSpeed == 'True'||item.FlowSpeed === 'true'){
            item.FlowSpeed = '2'
        }
        
        item.FlowSpeed = String(parseInt(item.FlowSpeed))
                  if(item.FlowSpeed == 'True'||item.FlowSpeed === 'true'){
            item.FlowSpeed = '2'
        }else if(parseFloat(item.FlowSpeed) >3){
            item.FlowSpeed = '3'
        }else if(parseFloat(item.FlowSpeed) < -3){
            item.FlowSpeed  = '-3'
        }
        if(item.FlowSpeed == '3'){
            item.FlowSpeed = 400
            item.fz = false
            item.check = true
            
        }else if(item.FlowSpeed == '2'){
            item.FlowSpeed = 1000
            item.fz = false
        }else if(item.FlowSpeed == '1'){
            item.FlowSpeed = 2000
            item.fz = false
             item.check = true
        }else if(item.FlowSpeed == '0'||item.FlowSpeed == 'NaN'){
            item.FlowSpeed = 99999999999999999999
            item.fz = false
             item.check = true
        }else if(item.FlowSpeed == '-1'){
            item.FlowSpeed = 2000
            item.fz = true
             item.check = true
        }else if(item.FlowSpeed == '-2'){
            item.FlowSpeed = 1000
            item.fz = true
             item.check = true
        }else if(item.FlowSpeed == '-3'){
            item.FlowSpeed = 400
            item.fz = true
             item.check = true
        }
                            }
                        }
                          if(item1.LineTagName == item2.name){
                            if( item2.Value== '0'||  item2.Value=='False'||  item2.Value=='false'){
                                item.intervalarr = []
                                clearInterval(item.time)
                            }
                        }
                     })
                    
                  
                }
          })
        })
              }
      
          }).then(()=>{
              
      this.dataValue.forEach((item,index)=>{
          if(item.FlowSpeed1){
               item.FlowSpeed = JSON.parse(JSON.stringify(item.FlowSpeed1))
          }
       if(item.check){
    if(item.FlowSpeed === 'True'||item.FlowSpeed === 'true'){
            item.FlowSpeed = '2'
        }else if(parseFloat(item.FlowSpeed) >3){
            item.FlowSpeed = '3'
        }else if(parseFloat(item.FlowSpeed) < -3){
            item.FlowSpeed  = '-3'
        }
       }
          
        item.FlowSpeed = String(parseInt(item.FlowSpeed))
          console.log(item.FlowSpeed == '3')
        if(item.FlowSpeed == '3'){
            item.FlowSpeed = 400
            item.fz = false
        }else if(item.FlowSpeed == '2'){
            item.FlowSpeed = 1000
            item.fz = false
        }else if(item.FlowSpeed == '1'){
            item.FlowSpeed = 2000
            item.fz = false
        }else if(item.FlowSpeed == '0'||item.FlowSpeed == 'NaN'){
            item.FlowSpeed = 99999999999999999999
            item.fz = false
        }else if(item.FlowSpeed == '-1'){
            item.FlowSpeed = 2000
            item.fz = true
        }else if(item.FlowSpeed == '-2'){
            item.FlowSpeed = 1000
            item.fz = true
        }else if(item.FlowSpeed == '-3'){
            item.FlowSpeed = 400
            item.fz = true
        }else{
            console.log(item)
        }
         if(parseInt(item.FlowSpeed) !== 99999999999999999999&&parseInt(item.FlowSpeed)!==100000000000000000000){
             console.log(item.class)
             console.log(item.FlowSpeed)
             console.log(parseInt(item.FlowSpeed) !== 100000000000000000000)
        item.time = setInterval(()=>{
                      if(item.FlowSpeed == 99999999999999999999||item.FlowSpeed==100000000000000000000){
                          clearInterval( item.time)
                          return
                      }
                    let i = []
                     item.intervalarr.forEach((item1,index1)=>{
                        item1+=6
                        i.push(item1)
                     })
                    let i2 = []
                     i.forEach((item2,index2)=>{
                   if(item2>(parseInt(item.width)+26)){
                              item2 = (i[this.getMinIndex(i)]-48)
                              i2.push(item2)
                         }else{
                             i2.push(item2)
                         }
                     })
                    item.intervalarr = i2
       },item.FlowSpeed)
         }
          
        
       })
       console.log("data",this.dataValue)
          })
     
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
         getMinIndex(arr) {
    var min = arr[0];
    //声明了个变量 保存下标值
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
            index = i;
        }
    }
    return index;
},
changevalue(){

},
        //赋值
        gitValue(){
            
          this.dataValue = []
          var fillOp
          var fillColor
          var lineColor
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
                 var LineStroke = JSON.parse(this.textblockData[i].PropertyList.LineStroke)
                //  var StrokeArr = JSON.parse(this.textblockData[i].PropertyList.Stroke)
                 var lagel2
                 var gradient1
                 var lagel3
                var gradient3
                var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
                var InnerShadow
                var OuterShadow
                var Shadow
                var FlowSpeed = 0
                var fz = false
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
                if(LineStroke.ColorType == 'SolidColor'){
                    lineColor = '#' + LineStroke.Data.Color.slice(3) + LineStroke.Data.Color.slice(1, 3)
                  
                }else{
                        lineColor = ''
                        lagel2 = LineStroke.Data.Angel.toFixed(0)
                    for(var h3=0;h3<LineStroke.Data.GradientStops.length;h3++){
                        gradient1 = LineStroke.Data.GradientStops[h3]
                        lineColor = lineColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                    }
                        lineColor = '-webkit-linear-gradient('+lagel2+'deg'+lineColor+')';
                }
                   
        let intervalarr = []
        
        for(let i1=0;i1<Math.ceil(this.textblockData[i].PropertyList.Width/48)+2;i1++){
            intervalarr.push((i1-1)*48)
        }
        if(this.textblockData[i].PropertyList.FlowSpeed === 'True'||this.textblockData[i].PropertyList.FlowSpeed === 'true'){
            this.textblockData[i].PropertyList.FlowSpeed = '2'
        }
        this.textblockData[i].PropertyList.FlowSpeed = String(parseInt(this.textblockData[i].PropertyList.FlowSpeed))

        if(this.textblockData[i].PropertyList.FlowSpeed === '3'){
            FlowSpeed = 400
            fz = false
        }else if(this.textblockData[i].PropertyList.FlowSpeed === '2'){
            FlowSpeed = 1000
            fz = false
        }else if(this.textblockData[i].PropertyList.FlowSpeed === '1'){
            FlowSpeed = 2000
            fz = false
        }else if(this.textblockData[i].PropertyList.FlowSpeed === '0'||this.textblockData[i].PropertyList.FlowSpeed === 'NaN'){
            FlowSpeed = 99999999999999999999
            fz = false
        }else if(this.textblockData[i].PropertyList.FlowSpeed === '-1'){
            FlowSpeed = 2000
            fz = true
        }else if(this.textblockData[i].PropertyList.FlowSpeed === '-2'){
            FlowSpeed = 1000
            fz = true
        }else if(this.textblockData[i].PropertyList.FlowSpeed === '-3'){
            FlowSpeed = 400
            fz = true
        }
        var value = {
          FlowSpeed1:this.textblockData[i].PropertyList.FlowSpeed,
          width:this.textblockData[i].PropertyList.Width,
          height:this.textblockData[i].PropertyList.Height,
          rotate:this.textblockData[i].PropertyList.RotateAngle,
          top:this.textblockData[i].PropertyList.Top,
          left:this.textblockData[i].PropertyList.Left,
          opacity:this.textblockData[i].PropertyList.Opacity / 100,
          Fill:fillColor,
          lineColor:lineColor,
          ZIndex:this.ZIndex,
          Shadow:Shadow,
          intervalarr: intervalarr,
          class:this.textblockData[i].Name,
          FlowSpeed:FlowSpeed,
          lineColor2:lineColor,
          fz:fz
        }
        this.dataValue.push(value)
      }
      console.log("再看",JSON.parse(JSON.stringify( this.dataValue)))
                this.dataValue.forEach((item,index)=>{
                  item.time = setInterval(()=>{
                      if(item.FlowSpeed == 99999999999999999999){
                          clearInterval( item.time)
                          return
                      }
                    let i = []
                     item.intervalarr.forEach((item1,index1)=>{
                        item1+=6
                        i.push(item1)
                     })
                    let i2 = []
                     i.forEach((item2,index2)=>{
                   if(item2>(parseInt(item.width)+26)){
                              item2 = (i[this.getMinIndex(i)]-48)
                              i2.push(item2)
                         }else{
                             i2.push(item2)
                         }
                     })
                    item.intervalarr = i2
       },item.FlowSpeed)
        
       })
       
     

     
        }

    }
}
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
.flowpipediv{
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.flowline{
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 26px;
    height: 3px;
}
.fz{
    transform: rotate(180deg);
}
</style>