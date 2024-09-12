<!--
 * @Description: 这是矩形填充（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-07 11:32:12
 -->
<template>
<div :key="tkey">
  <div v-for="(item,index) in dataValue" :key="index">

    <div v-if="show" name="tank" :class="item.class" :style="'width:' + item.width + 'px; height:' 
    + item.height + 'px; position:absolute; top:' + item.top+ 'px; left:' + item.left 
    + 'px; transform:rotate(' + item.rotate +'deg); opacity:' + item.opacity + ';zIndex:'
    + item.ZIndex + ';boxShadow:' + item.Shadow "   @mousedown="downClick(item,$event)"  @dblclick="opendb(item)" @mouseup="seupClick(item,$event)"  @contextmenu.prevent>
     <div :style="'background:'+item.Fill+';width:'+item.width+'px;height:'+item.cTankWall+'px;border-radius: 100%;'">
        
     </div>
      <div :style="'background:'+item.Fill+';width:'+item.width+'px;height:'+(item.height-item.cTankWall)+'px;position:relative;top: '+-item.cTankWall/2+'px;'">
            <div class="tankfill" :style="'background:'+item.tankcolor+';width:'+(item.width-(item.TankWall*2))+'px;height:'+(item.height-(item.cTankWall*2))+'px;position:relative;top:'+item.cTankWall/2+'px;left:'+item.TankWall+'px;border-radius:'+item.CornerRadius+'px;overflow:hidden'">
            
                <div v-if="item.showtext" :style="'position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;text-align:center;color:'+item.TankTextForeground+';font-size:'+item.TankTextFontSize+'px;z-index:1;line-height:'+(item.height-(item.cTankWall*2))+'px'">{{item.TankText}}</div>
                <div v-if="item.TankOrientation == 'Right'" :style="'height:'+(item.height-(item.cTankWall*2))+'px;width:'+item.TankLiquidHeight+'px;background:'+item.LiquidFill+';position:absolute;left:0px'" class="liquidfill">  
                    <div v-for="(item1,index1) in item.line" :key="index1" :style="'border-right:2px dashed '+item1.color+';width:0px;height:'+(item.height-(item.cTankWall*2))+'px;z-index:1;position:absolute;left:'+item1.linetop+'px'">
                        
                </div> 
                </div>
                  <div v-if="item.TankOrientation == 'Left'" :style="'height:'+(item.height-(item.cTankWall*2))+'px;width:'+item.TankLiquidHeight+'px;background:'+item.LiquidFill+';position:absolute;right:0px'"  class="liquidfill">
                   <div v-for="(item1,index1) in item.line" :key="index1" :style="'border-right:2px dashed '+item1.color+';width:0px;height:'+(item.height-(item.cTankWall*2))+'px;position:absolute;z-index:1;right:'+item1.linetop+'px'">
                        
                </div> 
                </div>
                 <div v-if="item.TankOrientation == 'Up'" :style="'height:'+item.TankLiquidHeight+'px;width:'+(item.width-(item.TankWall*2))+'px;background:'+item.LiquidFill+';position:absolute;bottom:0px'"  class="liquidfill">
                  <div v-for="(item1,index1) in item.line" :key="index1" :style="'border-top:2px dashed '+item1.color+';height:0px;width:'+(item.width-(item.TankWall*2))+'px;position:absolute;z-index:1;bottom:'+item1.linetop+'px'">
                        
                </div> 
                </div>
                 <div v-if="item.TankOrientation == 'Down'" :style="'height:'+item.TankLiquidHeight+'px;width:'+(item.width-(item.TankWall*2))+'px;background:'+item.LiquidFill+';position:absolute;top:0px'"  class="liquidfill">
                  <div v-for="(item1,index1) in item.line" :key="index1" :style="'border-top:2px dashed '+item1.color+';height:0px;width:'+(item.width-(item.TankWall*2))+'px;position:absolute;z-index:1;top:'+item1.linetop+'px'">
                        
                </div> 
                </div>
            </div>
      </div>
    <div :style="'background:'+item.Fill+';width:'+item.width+'px;height:'+ item.cTankWall+'px;border-radius: 100%;position:relative;top:'+-item.cTankWall+'px;'">
      
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
           resTagName:[],
           timeoutID:'',
           commerPopShow1:false,
           ZIndex:'',
           CanExcuteShow:false,
           tkey:1,
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
    
      this.Name = 'tank'
      if(this.data){
       this.init()
      }
    },
    methods: {
      getPointNum(num, n) {
			 if(isNaN(num)||num===null){
		     return null
	         }else{
          
		     return Number(num).toFixed(n)
             }
		  },
                 JoinVarFun(){
            console.log("ffff",this.dataValue)
      },
               //websocket触发该方法
      axioImg2(resArr1){
         if(resArr1.value=='???'){
          return
        }
        let resArr = JSON.parse(JSON.stringify(resArr1))
             if(resArr.value == 'true'){
          resArr.value = 1
        }else if(resArr.value == 'false'){
          resArr.value = 0
        }else if(resArr.value == 'False'){
           resArr.value = 0
        }else if(resArr.value == 'True'){
        resArr.value = 1
        }

     this.dataValue.forEach((item)=>{
                 
                       if(item.MinName == resArr.name){
                       
                  item.Min = parseFloat(resArr.value)
               
                  }
                   if(item.MaxName == resArr.name){
 
                  item.Max = parseFloat(resArr.value)
               
                  }
             
                  if(resArr.name == item.FillTagName){
                      if(Number(resArr.value)+'' !==NaN+''){
                       if(item.TankText){
                  item.TankText = this.getPointNum(parseFloat(resArr.value),item.DecimalCount)+item.Unit
                     for(let i=0;i<item.TankFillAnimationList.length;i++){
                         if(item.TankFillAnimationList[i].NO!==0){
                        
                    if(item.TankFillAnimationList[i].Condition == "=="){
                           
                             if(parseFloat(resArr.value) == parseFloat(item.TankFillAnimationList[i].Compare)){
                                   
                                
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                
                                 if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == ">"){
                             if(parseFloat(resArr.value) > parseFloat(item.TankFillAnimationList[i].Compare)){
                             
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                 if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                               
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == "<"){
                              
                             if(parseFloat(resArr.value) < parseFloat(item.TankFillAnimationList[i].Compare)){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == "<="){
                             if(parseFloat(resArr.value) <= parseFloat(item.TankFillAnimationList[i].Compare)){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                  if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == ">="){
                            
                             if(parseFloat(resArr.value) >= parseFloat(item.TankFillAnimationList[i].Compare)){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                 if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == "!="){
                               
                             if(parseFloat(resArr.value) != parseFloat(item.TankFillAnimationList[i].Compare)){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                  if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else{
                               item.LiquidFill =  item.LiquidFill1
                         }
                         }
                   
                        
                     }
                      }
                      }
                   
                      item.Fillvalue = parseFloat(resArr.value)
                  }
               
                    if((parseFloat(item.Fillvalue)>parseFloat(item.Min))){
                           if(item.class == 'Tank61'){
                    console.log(item)
                  }
                        item.TankLiquidHeight=(parseFloat(item.TankLiquidHeight1)/(parseFloat(item.Max)-parseFloat(item.Min)))*(parseFloat(item.Fillvalue)-parseFloat(item.Min))
                        }else{
                            if(item.Fillvalue){
                          item.TankLiquidHeight = 0
                            }
                            
                        }
                 if(parseFloat(item.Min)>=parseFloat(item.Max)||item.TankLiquidHeight==Infinity){
                
                      item.TankLiquidHeight = 0
        
                     
                  }
                      if(item.Fillvalue){
                    if(item.Unit == '%'){
               item.TankText =this.getPointNum(((parseFloat(item.TankLiquidHeight)/parseFloat(item.TankLiquidHeight1))*100),item.DecimalCount)+item.Unit
             
                    }else{
                 item.TankText = this.getPointNum(parseFloat(item.Fillvalue),item.DecimalCount)+item.Unit
                    }
                
                }
                   
                 
              
                  item.line.forEach((item2)=>{
                    
                    if(!item2.show){
                        item2.text = item2.TagName 
                     }else{
                       
                         if(item2.TagName == resArr.name){
                             item2.text =resArr.value
                         }
                     }  
                   
                     if(item2.text){
                  
                        
             if(Number(item.TankLiquidHeight)+''==NaN+''){
                
                            item2.linetop = 0
                        }else{
                         
                            item2.linetop = (parseFloat(item.TankLiquidHeight1)/(parseFloat(item.Max)-parseFloat(item.Min)))*(parseFloat(item2.text)-parseFloat(item.Min))
                  
                          if(item2.linetop == Infinity){
                               item2.linetop = 0
                           }
                            if(item2.linetop<0){
                                  item2.linetop = 0
                                }
                             if(item2.linetop>parseFloat(item.TankLiquidHeight1)){
                               item2.linetop = parseFloat(item.TankLiquidHeight1)
                           } 
                       }
                       if(Number(item2.text)+''!==NaN+''){
                       item2.isshow = true
                     }else{
                         item2.isshow = false
                     }
                    
                     }else{
                          item2.isshow = true
                          if(!item2.text){
                              item2.linetop = 0
                          }else{
                                item2.linetop = (parseFloat(item.TankLiquidHeight1)/(item.Max-item.Min))*(parseFloat(item2.text)-parseFloat(item.Min))
                             if(item2.linetop<0){
                                  item2.linetop = 0
                                }
                          }
                          if(item2.linetop<0){
                                  item2.linetop = 0
                                }
                     }
                    
                  })
                  item.CornerRadius = parseFloat($(`.`+item.class).find('.tankfill').css('border-radius'))
                    item.tankcolor = $(`.`+item.class).find('.tankfill').css('background')
                      item.opacity = $(`.`+item.class).css('opacity')      
                   item.top = parseFloat($(`.`+item.class).css('top'))    
                   item.left = parseFloat($(`.`+item.class).css('left'))                                   
          
               })
               
              this.tkey = this.tkey + 1
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
          this.data.Data.TankAnimationList.forEach((item1)=>{
             if(item.class == item1.ElementName){
                 if(item1.FillTagName){
                     this.resTagName.push(item1.FillTagName)
                 }
                  if(item1.TagNameMin){
                     this.resTagName.push(item1.TagNameMin)
                 }
                  if(item1.TagNameMax){
                     this.resTagName.push(item1.TagNameMax)
                 }
                 item1.TankAuxiliaryLineList.forEach((item2)=>{
                      if(item2.TagName){
                     this.resTagName.push(item2.TagName)
                 }
                 })
                  
             }
          })
      })
      this.axio()
     },
    //  第一次调用
     axio(){
     this.$axios({
              method: 'post',
              url: '/api/Base/PostRediusTest',
              data: this.resTagName
          }).then(res => {
              let res1 = res.data.data.filter(item=>item.Value !== '???')
                 res1.forEach((item)=>{
              if(item.Value == 'true'){
          item.Value = 1
        }else if(item.Value == 'false'){
          item.Value = 0
        }else if(item.Value == 'False'){
           item.Value  = 0
        }else if(item.Value  == 'True'){
        item.Value  = 1
        }
          })
      
      

              this.dataValue.forEach((item)=>{
                   item.line = []
                   let lineindex = []
                  this.data.Data.TankAnimationList.forEach((item1)=>{
                      if(item.class == item1.ElementName){
                              if(item1.TextStyle == 1||item1.TextStyle == 2){
                                item.showtext = true
                                  if(item.Fillvalue){
                                     if(item1.FillTagDataType){
                                 item.TankText = item.Fillvalue+item1.Unit
                                  }else{
                                 item.TankText = parseFloat(item.Fillvalue).toFixed(item1.DecimalCount)+item1.Unit
                                  }
                                  }else{
                                       item.TankText= ''
                                  }  
                              }else{
                                 item.showtext = false
                                  item.TankText = ''
                              }
                              item.Unit = item1.Unit
                              item.TankFillAnimationList = item1.TankFillAnimationList
                                item.DecimalCount = item1.DecimalCount
                                item.TankTextFontSize = item1.FontSize
                                let one = item1.FontColor.slice(1,3)
                                let two = item1.FontColor.split("")
                                two.splice(1,2)
                                two = two.join("")
                                item.TankTextForeground = two+one
                              
                                if(Number(item1.TagNameMin)+'' !==NaN+'' ){
                                item.MinName = parseFloat(item1.TagNameMin);
                                }else{
                                  item.MinName = item1.TagNameMin;
                                  }
                                    if(Number(item1.FillTagName)+'' !==NaN+'' ){
                                item.Fillvalue = parseFloat(item1.FillTagName);
                                }
                              if(Number(item1.TagNameMax)+'' !==NaN+'' ){
                                item.MaxName = parseFloat(item1.TagNameMax);
                                }else{
                                item.MaxName = item1.TagNameMax;
                                }
                                item.FillTagName = item1.FillTagName
                                item.TankFillAnimationList = item1.TankFillAnimationList
                                item1.TankAuxiliaryLineList.forEach((item2)=>{
                                  if(lineindex.indexOf(item2.TagDataType)<=-1){
                                       let one = item2.Color.slice(1,3)
                                       let two = item2.Color.split("")
                                       two.splice(1,2)
                                       two = two.join("")
                                      lineindex.push(item2.NO)
                                      let value = {
                                          TagName:item2.TagName,
                                          color:item2.Color.length>7?two+one:item2.Color,
                                          show:item2.TagDataType
                                      }
                                      item.line.push(value)
                                  }
                                })
                                //  if(Number(item1.FillTagName)+''!==NaN+''){
                                //      item.text = item1.FillTagName + item1.Unit
                                //  }else{
                                //     item.text = '0'+item1.Unit
                                //  }
                      }
                     
                  })
              })
            
               this.dataValue.forEach((item)=>{
                 if(item.class == 'Tank59'||item.class == 'Tank2'){
                   console.log(item)
                 }
              res1.forEach((item1)=>{
                       if(item.MinName == item1.Name){
            
                  item.Min = parseFloat(item1.Value)
                
                  }
                   if(item.MaxName == item1.Name){
            
                  item.Max = parseFloat(item1.Value)
              
                  }
                
                   if(Number(item.MaxName)+'' !==NaN+'' ){
                        item.Max = parseFloat(item.MaxName);
                      }
                  if(Number(item.MinName)+'' !==NaN+'' ){
                        item.Min = parseFloat(item.MinName);
                      }
                  if(item1.Name == item.FillTagName){
                      if(Number(item1.Value)+'' !==NaN+''){
                       if(item.TankText){
               
                     for(let i=0;i<item.TankFillAnimationList.length;i++){
                         if(item.TankFillAnimationList[i].NO!==0){
    if(item.TankFillAnimationList[i].Condition == "=="){
                             if(item1.Value == item.TankFillAnimationList[i].Compare){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                 if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == ">"){
                
                             if(parseFloat(item1.Value) > parseFloat(item.TankFillAnimationList[i].Compare)){
                            
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                 if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == "<"){
                             if(parseFloat(item1.Value) < parseFloat(item.TankFillAnimationList[i].Compare)){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                               if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == "<="){
                             if(parseFloat(item1.Value) <= parseFloat(item.TankFillAnimationList[i].Compare)){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                 if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == ">="){
                             if(parseFloat(item1.Value) >= parseFloat(item.TankFillAnimationList[i].Compare)){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                 if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else if(item.TankFillAnimationList[i].Condition == "!="){
                             if(parseFloat(item1.Value) != parseFloat(item.TankFillAnimationList[i].Compare)){
                                let one = item.TankFillAnimationList[i].Color.slice(1,3)
                                let two = item.TankFillAnimationList[i].Color.split("")
                                two.splice(1,2)
                                two = two.join("")
                                  if(item.TankFillAnimationList[i].Color.length >=8){
                               item.LiquidFill = two+one
                                }else{
                                 item.LiquidFill = item.TankFillAnimationList[i].Color
                                }
                                break;
                             }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }else{
                               item.LiquidFill = item.LiquidFill1
                         }
                         }
                     
                     }
                      }
                      }
                      item.Fillvalue = item1.Value
                    //      if(item.Unit){
                    
                    //       item.TankLiquidHeight =(parseFloat(item.TankLiquidHeight1)/(item.Max-item.Min))*(parseFloat(item.Value)-item.Min)
                    //   }else{
                        // if((parseFloat(item.Value)>item.Min)){
                        //     item.TankLiquidHeight=(parseFloat(item.TankLiquidHeight1)/(item.Max-item.Min))*(parseFloat(item.Value))
                        // }else{
                        //      item.TankLiquidHeight = 0
                        // }
                            
                    //   }
                      
                  }
                 if((parseFloat(item.Fillvalue)>parseFloat(item.Min))){
                        item.TankLiquidHeight=(parseFloat(item.TankLiquidHeight1)/(parseFloat(item.Max)-parseFloat(item.Min)))*(parseFloat(item.Fillvalue)-parseFloat(item.Min))
                        }else{
                            if(item.Fillvalue){
                         item.TankLiquidHeight = 0
                            }
                            
                        }
                    if(parseFloat(item.Min)>=parseFloat(item.Max)||item.TankLiquidHeight==Infinity){
                
                      item.TankLiquidHeight = 0
        
                     
                  }
                      if(item.Fillvalue){
                    if(item.Unit == '%'){
              item.TankText = this.getPointNum(((parseFloat(item.TankLiquidHeight)/parseFloat(item.TankLiquidHeight1))*100),item.DecimalCount)+item.Unit
             
                    }else{
               item.TankText = this.getPointNum(parseFloat(item.Fillvalue),item.DecimalCount)+item.Unit
                    }
                
                }
               
                  item.line.forEach((item2)=>{
                 
                    if(!item2.show){
                        item2.text = item2.TagName 
                     }else{
                     
                         if(item2.TagName == item1.Name){
                             item2.text = item1.Value
                         }
                     }   
                     if(item2.text){
             if(!item.TankLiquidHeight){
                            item2.linetop = 0
                        }else{
                            item2.linetop = (parseFloat(item.TankLiquidHeight1)/(item.Max-item.Min))*(parseFloat(item2.text)-parseFloat(item.Min))
                           if(item2.linetop == Infinity){
                               item2.linetop = 0
                           }
                              if(item2.linetop<0){
                                  item2.linetop = 0
                                }
                        //    if(item2.linetop>parseFloat(item.TankLiquidHeight1)){
                        //        item2.linetop = parseFloat(item.TankLiquidHeight1)
                        //    } 
                       }
                       if(Number(item2.text)+''!==NaN+''){
                       item2.isshow = true
                     }else{
                         item2.isshow = false
                     }
                     }else{
                          item2.isshow = true
                          if(!item2.text){
                              item2.linetop = 0
                          }else{
                                item2.linetop = (parseFloat(item.TankLiquidHeight1)/(item.Max-item.Min))*(parseFloat(item2.text)-parseFloat(item.Min))
                                if(item2.linetop<0){
                                  item2.linetop = 0
                                }
                          }
                          if(item2.linetop<0){
                                  item2.linetop = 0
                                }
                     }
                    
                  })
                
               })
               })
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
        //赋值
        gitValue(){
          this.dataValue = []
          var fillOp
          var fillColor
          var liqcolor
          var tankcolor
          var strokeOp
          var textcolor
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
                 var FilldArr = JSON.parse(this.textblockData[i].PropertyList.TankWallFill)
                 var tankArr = JSON.parse(this.textblockData[i].PropertyList.Fill)
                 var LiquidFill = JSON.parse(this.textblockData[i].PropertyList.LiquidFill)
                 var TankTextForeground = JSON.parse(this.textblockData[i].PropertyList.TankTextForeground)
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
                    for(var h4=0;h4<FilldArr.Data.GradientStops.length;h4++){
                        gradient1 = FilldArr.Data.GradientStops[h4]
                        fillColor = fillColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                    }
                        fillColor = '-webkit-linear-gradient('+lagel2+'deg'+fillColor+')';
                }
                
                           if(TankTextForeground.ColorType == 'SolidColor'){
                    textcolor = '#' + TankTextForeground.Data.Color.slice(3) + TankTextForeground.Data.Color.slice(1, 3)
                  
                }else{
                        textcolor = ''
                        lagel2 = TankTextForeground.Data.Angel.toFixed(0)
                    for(var h5=0;h5<TankTextForeground.Data.GradientStops.length;h5++){
                        gradient1 = TankTextForeground.Data.GradientStops[h5]
                        textcolor = textcolor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                    }
                        textcolor = '-webkit-linear-gradient('+lagel2+'deg'+textcolor+')';
                }
                      if(LiquidFill.ColorType == 'SolidColor'){
                    liqcolor = '#' + LiquidFill.Data.Color.slice(3) + LiquidFill.Data.Color.slice(1, 3)
                  
                }else{
                        liqcolor = ''
                        lagel2 = LiquidFill.Data.Angel.toFixed(0)
                    for(var h2=0;h2<LiquidFill.Data.GradientStops.length;h2++){
                        gradient1 = LiquidFill.Data.GradientStops[h2]
                        liqcolor = liqcolor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                    }
                        liqcolor = '-webkit-linear-gradient('+lagel2+'deg'+liqcolor+')';
                }
                 if(tankArr.ColorType == 'SolidColor'){
                    tankcolor = '#' + tankArr.Data.Color.slice(3) + tankArr.Data.Color.slice(1, 3)
                  
                }else{
                        tankcolor = ''
                        lagel2 = tankArr.Data.Angel.toFixed(0)
                    for(var h3=0;h3<tankArr.Data.GradientStops.length;h3++){
                        gradient1 = tankArr.Data.GradientStops[h3]
                        tankcolor = tankcolor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                    }
                        tankcolor = '-webkit-linear-gradient('+lagel2+'deg'+tankcolor+')';
                }
               this.textblockData[i].PropertyList.TankWall = parseFloat(this.textblockData[i].PropertyList.TankWall)>0?parseFloat(this.textblockData[i].PropertyList.TankWall):0   
        var value = {
          width:this.textblockData[i].PropertyList.Width,
          height:this.textblockData[i].PropertyList.Height,
          rotate:this.textblockData[i].PropertyList.RotateAngle,
          top:this.textblockData[i].PropertyList.Top,
          left:this.textblockData[i].PropertyList.Left,
          opacity:this.textblockData[i].PropertyList.Opacity / 100,
          Fill:fillColor,
          LiquidFill1:liqcolor,
          tankcolor:tankcolor,
          ZIndex:this.ZIndex,
          Shadow:Shadow,
          DecimalCount:0,
          FillTagName:'',
          Fillvalue:'',
          Unit:'',
          TankFillAnimationList:[],
          TankTextForeground:textcolor,
          TankTextFontSize:this.textblockData[i].PropertyList.TankTextFontSize,
          TankText:this.textblockData[i].PropertyList.TankText,
          CornerRadius:this.textblockData[i].PropertyList.CornerRadius.split(',')[0],
          LiquidFill:liqcolor,
          TankOrientation:this.textblockData[i].PropertyList.TankOrientation,
          Max:this.textblockData[i].PropertyList.TankLiquidMax,
          Min:this.textblockData[i].PropertyList.TankLiquidMin,
          TankLiquidHeight1:this.textblockData[i].PropertyList.TankLiquidHeight,
          TankLiquidHeight:(parseFloat(this.textblockData[i].PropertyList.TankLiquidHeight)/(parseInt(this.textblockData[i].PropertyList.TankLiquidMax)-parseInt(this.textblockData[i].PropertyList.TankLiquidMin)))*parseInt(this.textblockData[i].PropertyList.Width),
          class:this.textblockData[i].Name,
          TankWall:this.textblockData[i].PropertyList.TankWall,
          line:[],
          cTankWall:this.textblockData[i].PropertyList.TankWall*0.75+this.textblockData[i].PropertyList.TankWall
        }
        if(this.textblockData[i].PropertyList.TankOrientation=="Up"||this.textblockData[i].PropertyList.TankOrientation=="Down"){
            value.TankLiquidHeight1 =  (value.height-(value.cTankWall*2))
        }else{
             value.TankLiquidHeight1 = value.width-(value.TankWall*2)
           
        }
        
        this.dataValue.push(value)
      }
    
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



</style>