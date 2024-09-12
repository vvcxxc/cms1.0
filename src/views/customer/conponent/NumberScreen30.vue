<!--
 * @Description: 这是数值筛选控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-05 18:40:24
 -->
<template>
    <div>
       <Keycom :showkey='showkey' :keyclass='keyclass' :keytext='keytext' @getnum='getnum' @closeshow='closeshow'></Keycom>
      <div class="NumberScreen30a" v-for="(item,index) in dataValue" :key="index">
        <div v-if="show" 
            :class="item.class"  
            @mouseup="upFun(item,$event)" 
            @mousedown="downFun(item,$event)"  
            @dblclick="opendb(item)" 
            @click="numserr(item)"
            @contextmenu.prevent
            name="NumberScreen"
            :style="'position:absolute; left:' 
            + item.left + 'px; top:' + item.top + 'px; boxSizing:border-box; text-align:center;px; width:'
            + item.width + 'px; height:'+ item.height + 'px;'+ ';opacity:' + item.opacity 
            + ';overflow:hidden;zIndex:'+item.ZIndex+';background:'+item.Background + ';transform:rotate(' + item.rotate + 'deg);boxShadow:'+item.Shadow">

                <el-select class="elSelect" @focus="selectClick($event,item)" @change="selectFun(item)" :disabled="item.disabled" 
                :style="'float:left;width:'+(90)+'px;height:' + (item.height) 
                + 'px;background:'+ item.Background + ';border:'+item.BorderThickness
                +'px solid #000;box-sizing:border-box;border-image:'+item.BorderBrush
                +';boxShadow:'+item.Shadow"
                v-model="item.value" placeholder="">
                  <el-option
                    :style="'width:'+(90)+'px;height:' + (item.height) + 'px;'"
                    v-for="it in item.options"
                    :key="it.value"
                    :label="it.label"
                    :value="it.value">
                  </el-option>
                </el-select>


        <div :style="'float:left;width:'+(16)+'px;height:'+item.height + 'px;'"></div>

        <input :disabled="item.disabled" class="elInput1"
        v-model="item.input" placeholder="请输入数值"  @mousedown="downClick(item,$event,'input')" 
        :style="'float:left;width:' + (Number(item.width)-(107) - item.Inpwidth ) 
        + 'px;height:' + item.height + 'px;padding-left:10px;text-align:left;border:'+item.BorderThickness
        +'px solid #000;border-image:'+item.BorderBrush+';font-weight:'+item.Blod+';text-decoration:'
        +item.TextDecorations+';color:'+item.Foreground+';font-size:'+item.size+'px;font-family:'+item.family" />
        

        <div v-if="item.show" @keyup.enter="keyFun1(item)" :style="'background:transparent;float:left;width:'+16
        +'px;height:'+item.height + 'px;box-sizing: border-box;position:relative'">
          <i class="line" :style="'width:8px;height:2px'"></i></div>

         <input :disabled="item.disabled" class="elInput2"  @mousedown="downClick(item,$event,'input1')" 
         v-if="item.show" @keyup.enter="keyFun2(item)" 
         :style="'float:left;width:'+(85) +'px;height:' + item.height + 'px;padding-left:10px;text-align:left;border:'
         +item.BorderThickness+'px solid #000;border-image:'+item.BorderBrush + ';font-weight:'+item.Blod
         +';text-decoration:'+item.TextDecorations+';color:'+item.Foreground+';font-size:'+item.size+'px;font-family:'+item.family"
          v-model="item.input1" placeholder="请输入数值"/>

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
import Keycom from './Keycom.vue'
export default {
     components: {
    Keycom,  //数字键盘
   },
  data() {
    return {
      showkey:false,
      keyclass:'',
      keytext:'',
      textblockData:[],
      dataValue:[],
      show:false,
      value3:'',
      commerPopShow1:false,
      ZIndex:'',
      dom:null,
      type:'input',
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
  mounted(){
    this.data = this.dae
    this.Name = 'associatenumerical'
    if(this.data){
      this.init()
    }
  },
  methods: {
      //鼠标按下
     downClick(item,e,type){
       this.keyclass = item.class
       this.type = type
       console.log(this.data.Data.KeyboardControlList)
       this.data.Data.KeyboardControlList.forEach((item1)=>{
          if(item1.ElementName == item.class){
            if(item1.IsPopupKeyboard){
             this.showkey = true;
             if(this.type == 'input'){
              this.keytext = item.input
             }else{
              this.keytext = item.input1
             }
         
            }
       
          }
       })
       },
           getnum(value,keyclass){
     this.dataValue.forEach((item)=>{
       if(item.class == keyclass){
        if(this.type == 'input'){
          item.input = value
        }else{
          item.input1 = value
        }
       }
     })
    },
            // 关闭键盘
      closeshow(){
         this.showkey = false
      },
    init(){
        //数据筛选
        this.textblockData = []
        var dataAll = this.data.Controls.ControlList
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
    keyFun1(item){
        console.log('item11',item)
    },
    keyFun2(item){
        this.TimeValueFun()
    },
    //下拉选择
    numserr(item){
      this.jurisdictionShow(item).then(val => { 
          if(this.CanExcuteShow){
            this.commerPopShow1 = true
            item.disabled = true
          }
        })

    },
    //所有值
     TimeValueFun(){
              var self = this
              let timeData = []
              for(let i=0;i<this.dataValue.length;i++){
                 let ValueRelu = self.dataValue[i].value=='=='? 'Equal':self.dataValue[i].value=='!='
                        ?'NotEqual':self.dataValue[i].value=='>'?'MoreThen':self.dataValue[i].value=='<'?'LessThen'
                        :self.dataValue[i].value=='>='?'MoreOrEqualThen':self.dataValue[i].value=='<='?
                        'LessOrEqualThen':self.dataValue[i].value=='区间'?'Section':self.dataValue[i].value=='不为空'?'NotEmpty':
                        self.dataValue[i].value=='为空'?'Empty':''
                  var value = {
                      name:self.dataValue[i].class,
                      value1:self.dataValue[i].input,
                      value2:self.dataValue[i].input1,
                      type:ValueRelu
                  }
                  timeData.push(value)
              }
                return timeData
        },
        //初始化值
      timeInit(arr){
          for(let i=0;i<this.dataValue.length;i++){
              let index = arr.indexOf(this.dataValue[i].class)
              if(index != -1){
                 this.dataValue[i].input = ''
                 this.dataValue[i].input1 = ''
                 this.dataValue[i].value = ''
                 this.dataValue[i].show = false
                 this.dataValue[i].Inpwidth = 0
              }
          }
      },
    //有脚本事件样式  聚焦下拉框重新改变背景颜色
    selectClick(e,item){
       var background = $(e.path[0]).parents('.elSelect')[0].style.background
       var color = e.path[0].style.color
       var size = e.path[0].style.fontSize
       var fontWeight = e.path[0].style.fontWeight
       var dd = $(`.${item.class} .el-select-dropdown`)

       if(dd.length){
         this.dom = dd
         dd[0].style.background = background
         let domli = dd.find('li')
         for(let i=0;i<domli.length;i++){
           domli[i].style.color = color
           domli[i].style.fontSize = size
           domli[i].style.fontWeight = fontWeight
         }
       }else{
         this.dom[0].style.background = background
         let domli = this.dom.find('li')
         for(let i=0;i<domli.length;i++){
           domli[i].style.color = color
           domli[i].style.fontSize = size
           domli[i].style.fontWeight = fontWeight
         }
       }
    },
    //有脚本事件样式   区间切换
    selectFun(item){
       if(item.value == '区间'){
         item.show =true
         item.Inpwidth = 85+15
         setTimeout(()=>{
           var domShow = document.querySelector(`.${item.class}`)
           if(domShow.length){
             var dom = document.querySelector(`.${item.class} .elInput1`).style.borderImage
             var width = document.querySelector(`.${item.class} .elInput1`).style.borderWidth
             var color = document.querySelector(`.${item.class} .elInput1`).style.color
             var size  = document.querySelector(`.${item.class} .elInput1`).style.fontSize
             var textDecoration  = document.querySelector(`.${item.class} .elInput1`).style.textDecoration
             var fontWeight  = document.querySelector(`.${item.class} .elInput1`).style.fontWeight
             document.querySelector(`.${item.class} .elInput2`).style.borderImage = dom
             document.querySelector(`.${item.class} .elInput2`).style.borderWidth = width
             document.querySelector(`.${item.class} .elInput2`).style.fontSize = size
             document.querySelector(`.${item.class} .elInput2`).style.fontWeight = fontWeight
             document.querySelector(`.${item.class} .elInput2`).style.color = color
             document.querySelector(`.${item.class} .elInput2`).style.textDecoration = textDecoration
           }
         },200)

       }else{
         item.show =false
         item.Inpwidth = 0
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
              //鼠标按下事件
        downFun(item,e){
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
                                self.commerPopShow1 = true
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
                        self.commerPopShow1 = true
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
      
     opendb(item){     //鼠标双击
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
             })          
           }
        },200)
     },

  upFun(item,e){
    //脚本事件   //鼠标抬起
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

  
   //渐变色+阴影
    colorFun(borderSadow,foregoundArr,borderbrushArr,backgroundArr){
        //阴影
          var Shadow = ''
          var Shadow2
          var InnerShadow
          var OuterShadow
          var foreColor
          var backgroundColor
          var clipText
          var borderColor
          var backColor

          var lagel1
          var lagel2
          var lagel3
          var gradient1
          var gradient2
          var gradient3
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
                Shadow = InnerShadow + ',' + OuterShadow
          }else if(InnerShadow.length == 0){
              Shadow = OuterShadow
                Shadow = OuterShadow
          }else if(OuterShadow.length == 0){
                Shadow = InnerShadow
          }

      //字体颜色渐变
      if(foregoundArr.ColorType == 'SolidColor'){
              foreColor = '#' + foregoundArr.Data.Color.slice(3) + foregoundArr.Data.Color.slice(1, 3);
              clipText = 'none'
              backgroundColor = 'none'
               
      }else{
              // foreColor = 'transparent'
              foreColor='#000000'
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
              borderColor = `linear-gradient(to right,${borderColor},${borderColor}) 1 10`
          }else{
                  borderColor = ''
                  lagel3 = borderbrushArr.Data.Angel.toFixed(0)
                  var borColor1
                  var borColor2
              for(var f2=0;f2<borderbrushArr.Data.GradientStops.length;f2++){
                  gradient3 = borderbrushArr.Data.GradientStops[f2]
                  borderColor = borderColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
                  borColor1 = borderbrushArr.Data.GradientStops[0].Color
                  borColor2 = borderbrushArr.Data.GradientStops[1].Color
              }
                  borderColor = `linear-gradient(to right,${borColor1},${borColor2}) 1 10`

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
      var value = {
          Shadow:Shadow,
          InnerShadow:InnerShadow,
          OuterShadow:OuterShadow,
          foreColor:foreColor,
          backgroundColor:backgroundColor,
          clipText:clipText,
          borderColor:borderColor,
          backColor:backColor
      }
      return value
    },


    //赋值
    gitValue(){
        this.dataValue = []
       for(let i=0;i<this.textblockData.length;i++){
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

         var PressButtonList = this.data.Data.PressButtonList
         var foreOp
         var foreColor
         var backOp
         var backColor
         var borderOp
         var borderColor
         var radius

          //渐变色变量
          var foregoundArr = JSON.parse(this.textblockData[i].PropertyList.Foreground)
          var backgroundArr = JSON.parse(this.textblockData[i].PropertyList.Background)
          var borderbrushArr = JSON.parse(this.textblockData[i].PropertyList.BorderBrush)
          var clipText
          var backgroundColor
          //阴影
          var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
          var InnerShadow
          var OuterShadow
          var Shadow

         //有变量的和没变量组合
         if(PressButtonList.length != 0 ){
           for(let j=0;j<PressButtonList.length;j++){
             if(PressButtonList[j].ElementName == this.textblockData[i].Name){   //有变量
                let assListAData = this.data.Data.AssociateNumericalEntityList
                  let optionsArr = []                   //转换文本赋值
                  for(let f=0;f<assListAData.length;f++){
                    if(assListAData[f].ElementName == this.textblockData[i].Name){
                      for(let f1=0;f1<assListAData[f].SelectableComparerTypes.length;f1++){
                        let SelectableComparerTypes =  assListAData[f].SelectableComparerTypes[f1]
                        let ValueRelu = SelectableComparerTypes=='Equal'? '==':SelectableComparerTypes=='NotEqual'
                        ?'!=':SelectableComparerTypes=='MoreThen'?'>':SelectableComparerTypes=='LessThen'?'<'
                        :SelectableComparerTypes=='MoreOrEqualThen'?'>=':SelectableComparerTypes=='LessOrEqualThen'?
                        '<=':SelectableComparerTypes=='Section'?'区间':SelectableComparerTypes=='NotEmpty'?'不为空':
                        SelectableComparerTypes=='Empty'?'为空':''
                        let value = {
                          value:ValueRelu,
                          label:ValueRelu
                        }
                        optionsArr.push(value)
                      }
                    }
                  }

                    //渐变色
                let colorData = this.colorFun(borderSadow,foregoundArr,borderbrushArr,backgroundArr)
                Shadow = colorData.Shadow
                InnerShadow = colorData.InnerShadow
                OuterShadow = colorData.OuterShadow
                foreColor = colorData.foreColor
                backgroundColor = colorData.backgroundColor
                clipText = colorData.clipText
                borderColor = colorData.borderColor
                backColor = colorData.backColor

               radius = this.textblockData[i].PropertyList.CornerRadius
               var value = {                            //初始化样式赋值
                    width:this.textblockData[i].PropertyList.Width,
                    height:this.textblockData[i].PropertyList.Height,
                    rotate:this.textblockData[i].PropertyList.RotateAngle,
                    top:this.textblockData[i].PropertyList.Top,
                    left:this.textblockData[i].PropertyList.Left,
                    opacity:this.textblockData[i].PropertyList.Opacity / 100,
                    class:this.textblockData[i].Name,
                    show:false,
                    Inpwidth:0,
                    value:'',
                    input:'',
                    input1:'',
                    options:optionsArr,
                    disabled:false,
                    
                    Background:backColor,
                    Foreground:foreColor,
                    family:this.textblockData[i].PropertyList.FontFamily,
                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                    BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                    BorderBrush:borderColor,
                    Shadow:Shadow,
                    size:this.textblockData[i].PropertyList.FontSize,
                    ZIndex:this.ZIndex
               }
                  this.dataValue.push(value)

                   //下拉框改变样式
                   setTimeout(()=>{
                      let dom = document.querySelector(`.${this.textblockData[i].Name} input`)
                      let dom2 = document.querySelector(`.${this.textblockData[i].Name} .el-select-dropdown`)
                      dom2.style.background = colorData.backColor
                      let dom3 = $(`.${this.textblockData[i].Name} .el-select-dropdown li`)
                      for(let f=0;f<dom3.length;f++){
                        dom3[f].style.color = colorData.foreColor
                        dom3[f].style.fontSize = this.textblockData[i].PropertyList.FontSize+'px'
                        dom3[f].style.fontFamily = this.textblockData[i].PropertyList.FontFamily
                      }
                      let blod = this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : ''
                      dom.style.color = colorData.foreColor
                      dom.style.fontFamily = this.textblockData[i].PropertyList.FontFamily
                      dom.style.fontWeight = blod
                      dom.style.fontSize = this.textblockData[i].PropertyList.FontSize+'px'
                      dom.style.padding = '0px'
                      dom.style.paddingLeft = '10px'
                      dom.style.textAlign = 'left'
                   })

                  break;
             }else{
               if(j == PressButtonList.length-1){        //没有变量

                  let assListAData = this.data.Data.AssociateNumericalEntityList
                  let optionsArr = []
                  for(let f=0;f<assListAData.length;f++){
                    if(assListAData[f].ElementName == this.textblockData[i].Name){
                      for(let f1=0;f1<assListAData[f].SelectableComparerTypes.length;f1++){
                        let SelectableComparerTypes =  assListAData[f].SelectableComparerTypes[f1]
                        let ValueRelu = SelectableComparerTypes=='Equal'? '==':SelectableComparerTypes=='NotEqual'
                        ?'!=':SelectableComparerTypes=='MoreThen'?'>':SelectableComparerTypes=='LessThen'?'<'
                        :SelectableComparerTypes=='MoreOrEqualThen'?'>=':SelectableComparerTypes=='LessOrEqualThen'?
                        '<=':SelectableComparerTypes=='Section'?'区间':SelectableComparerTypes=='NotEmpty'?'不为空':
                        SelectableComparerTypes=='Empty'?'为空':''
                        let value = {
                          value:ValueRelu,
                          label:ValueRelu
                        }
                        optionsArr.push(value)
                      }
                    }
                  }

                   //渐变色
                  let colorData = this.colorFun(borderSadow,foregoundArr,borderbrushArr,backgroundArr)
                  Shadow = colorData.Shadow
                  InnerShadow = colorData.InnerShadow
                  OuterShadow = colorData.OuterShadow
                  foreColor = colorData.foreColor
                  backgroundColor = colorData.backgroundColor
                  clipText = colorData.clipText
                  borderColor = colorData.borderColor
                  backColor = colorData.backColor

                  radius = this.textblockData[i].PropertyList.CornerRadius
                  var value5 = {
                    width:this.textblockData[i].PropertyList.Width,
                    height:this.textblockData[i].PropertyList.Height,
                    rotate:this.textblockData[i].PropertyList.RotateAngle,
                    top:this.textblockData[i].PropertyList.Top,
                    left:this.textblockData[i].PropertyList.Left,
                    opacity:this.textblockData[i].PropertyList.Opacity / 100,
                    class:this.textblockData[i].Name,
                    show:false,
                    Inpwidth:0,
                    value:'',
                    input:'',
                    input1:'',
                    options:optionsArr,
                    disabled:false,

                    Background:backColor,
                    Foreground:foreColor,
                    family:this.textblockData[i].PropertyList.FontFamily,
                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                    BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                    BorderBrush:borderColor,
                    Shadow:Shadow,
                    size:this.textblockData[i].PropertyList.FontSize,
                    ZIndex:this.ZIndex
                  }
                      this.dataValue.push(value5)

                       //下拉框改变样式
                   setTimeout(()=>{
                      let dom = document.querySelector(`.${this.textblockData[i].Name} input`)
                      let dom2 = document.querySelector(`.${this.textblockData[i].Name} .el-select-dropdown`)
                      dom2.style.background = colorData.backColor
                      let dom3 = $(`.${this.textblockData[i].Name} .el-select-dropdown li`)
                      for(let f=0;f<dom3.length;f++){
                        dom3[f].style.color = colorData.foreColor
                        dom3[f].style.fontSize = this.textblockData[i].PropertyList.FontSize+'px'
                        dom3[f].style.fontFamily = this.textblockData[i].PropertyList.FontFamily
                      }
                      let blod = this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : ''
                      dom.style.color = colorData.foreColor
                      dom.style.fontFamily = this.textblockData[i].PropertyList.FontFamily
                      dom.style.fontWeight = blod
                       dom.style.fontSize = this.textblockData[i].PropertyList.FontSize+'px'
                      dom.style.padding = '0px'
                      dom.style.paddingLeft = '10px'
                      dom.style.textAlign = 'left'
                   })

               }
             }
  
           }
         }else{   //没有有变量的组合
           let assListAData = this.data.Data.AssociateNumericalEntityList
           let optionsArr = []
           for(let f=0;f<assListAData.length;f++){
             if(assListAData[f].ElementName == this.textblockData[i].Name){
               for(let f1=0;f1<assListAData[f].SelectableComparerTypes.length;f1++){
                 let SelectableComparerTypes =  assListAData[f].SelectableComparerTypes[f1]
                 let ValueRelu = SelectableComparerTypes=='Equal'? '==':SelectableComparerTypes=='NotEqual'
                 ?'!=':SelectableComparerTypes=='MoreThen'?'>':SelectableComparerTypes=='LessThen'?'<'
                 :SelectableComparerTypes=='MoreOrEqualThen'?'>=':SelectableComparerTypes=='LessOrEqualThen'?
                 '<=':SelectableComparerTypes=='Section'?'区间':SelectableComparerTypes=='NotEmpty'?'不为空':
                 SelectableComparerTypes=='Empty'?'为空':''
                 let value = {
                   value:ValueRelu,
                   label:ValueRelu
                 }
                 optionsArr.push(value)
               }
             }
           }

                  //渐变色
                  let colorData = this.colorFun(borderSadow,foregoundArr,borderbrushArr,backgroundArr)
                
                  Shadow = colorData.Shadow
                  InnerShadow = colorData.InnerShadow
                  OuterShadow = colorData.OuterShadow
                  foreColor = colorData.foreColor
                  backgroundColor = colorData.backgroundColor
                  clipText = colorData.clipText
                  borderColor = colorData.borderColor
                  backColor = colorData.backColor

                  radius = this.textblockData[i].PropertyList.CornerRadius
                  var value8 = {
                    width:this.textblockData[i].PropertyList.Width,
                    height:this.textblockData[i].PropertyList.Height,
                    rotate:this.textblockData[i].PropertyList.RotateAngle,
                    top:this.textblockData[i].PropertyList.Top,
                    left:this.textblockData[i].PropertyList.Left,
                    opacity:this.textblockData[i].PropertyList.Opacity / 100,
                    class:this.textblockData[i].Name,
                    show:false,
                    Inpwidth:0,
                    value:'',
                    input:'',
                    input1:'',
                    options:optionsArr,
                    disabled:false,
                    Background:backColor,
                    Foreground:foreColor,
                    family:this.textblockData[i].PropertyList.FontFamily,
                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                    BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                    BorderBrush:borderColor,
                    Shadow:Shadow,
                    size:this.textblockData[i].PropertyList.FontSize,

                    ZIndex:this.ZIndex
                  }
                  this.dataValue.push(value8)

                   //下拉框改变样式
                   setTimeout(()=>{
                      let dom = document.querySelector(`.${this.textblockData[i].Name} input`)
                      let dom2 = document.querySelector(`.${this.textblockData[i].Name} .el-select-dropdown`)
                      dom2.style.background = colorData.backColor
                      let dom3 = $(`.${this.textblockData[i].Name} .el-select-dropdown li`)
                      for(let f=0;f<dom3.length;f++){
                        dom3[f].style.color = colorData.foreColor
                        dom3[f].style.fontSize = this.textblockData[i].PropertyList.FontSize+'px'
                        dom3[f].style.fontFamily = this.textblockData[i].PropertyList.FontFamily
                      }
                      let blod = this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : ''
                      dom.style.color = colorData.foreColor
                      dom.style.fontFamily = this.textblockData[i].PropertyList.FontFamily
                      dom.style.fontWeight = blod
                      dom.style.fontSize = this.textblockData[i].PropertyList.FontSize+'px'
                      dom.style.padding = '0px'
                      dom.style.paddingLeft = '10px'
                      dom.style.textAlign = 'left'
                   })
         }
      }        
    }
  }
};
</script>

<style lang="scss">
  .el-select-dropdown__item{
    height:34px !important;
  }
.NumberScreen30a{
  .el-select{
    background: transparent;
  }
  input{
    position: relative !important;
    background: transparent;
  }
  .report input{
    position:relative !important;
  }
    .el-icon-arrow-up:before {
        content: "\e78f";
    }
  .el-input__icon{
    line-height: calc(100% - -18px);
  }
  .el-input{
    height:100% !important;
  }
  .el-input__inner{
    border-radius:0px !important;
    height:100% !important;
  }
   .el-icon-arrow-up,.el-select__caret{
        line-height:1px !important;
      }
}
</style>


<style lang="scss" scoped>
.NumberScreen30a{
  display: inline-block;
  user-select:none;
  cursor: pointer;
  box-sizing: border-box;
}
.textimportInput{
  height:34px;
}
.line{
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  display:inline-block;
  height:1px;
  background:#000;
  content:'';
  margin:auto;
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