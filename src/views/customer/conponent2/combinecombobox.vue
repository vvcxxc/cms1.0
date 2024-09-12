<!--
 * @Description: 这是下拉文本控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-22 13:14:13
 -->
<template>
    <div>
       <div class="DateTimePicker29a" v-for="(item,index) in dataValue" :key="index">
         <div 
            :class="'aa'+item.class"
            @mouseup="upFun(item,$event)" 
            @mousedown="downFun(item,$event)"  
            @dblclick="opendb(item)" 
            @contextmenu.prevent
            name="combinecombobox"
            :style="'position:absolute; left:' + item.left + 'px; top:' + item.top 
            + 'px; boxSizing:border-box; text-align:center;line-height:' + (item.height - item.BorderThickness*2 )
            + 'px; width:'+ item.width + 'px; height:'+ item.height + 'px;opacity:' 
            + item.opacity + ';overflow:hidden;zIndex:'+item.ZIndex+';padding:'+item.BorderThickness
            +'px;background:'+item.BorderBrush+';transform:rotate(' + item.rotate + 'deg);boxShadow:'+item.Shadow"
            >
             <el-select 
              @focus="selectClick($event,item)"
              v-model="item.value" clearable :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
              v-if="show" @click.native="clickTextFun(item)" @change="tagAxios(item)"
              :style="'width:100%;height:100%;'">
                <el-option
                :style="'width:100%;height:100%;'"
                v-for="it in item.options"
                :key="it.value"
                :label="it.label"
                :value="it.value">
                </el-option>
            </el-select>
         </div>
       </div>
        <!-- 权限弹窗 -->
       <div v-show="commerPopShow1" style="width:100%;height:100%;position:fixed;z-index:2147483647">
          <div v-if="commerPopShow1" class="commerPop_outPop">
            <div class="commerPop_outHead">
                <i class="warning el-icon-warning"></i>
                <span class="text">提示</span>
            </div>
            <div class="commerPop_conter">{{tipword}}</div>
            <div class="commerPop_btn">
                <div class="commerPop_yes" @click="Jurisdiction()" style="width:310px;margin-left:25px">确定</div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name:'xiala',
  data() {
    return {
      tipword:'该账户无操作权限',
      textblockData:[],
      dataValue:[],
      show:false,
      value3:'',
      commerPopShow1:false,
      ZIndex:'',
      resTagName:[],
      varArr:[],
      dom:null,
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
  created() {
    this.data = this.dae
      this.Name = 'combinecombobox'
      if(this.data){
        this.init()
      }
  },
  methods: {
     axioImg2(res){
    if(res.name.includes('@')){
      return
    }
    console.log("res11111111",res)
    var ss = JSON.parse(sessionStorage.getItem('variable'));
    let type = ''
    let arr = []
    let delarr = []
    for(let i=0;i<this.dataValue.length;i++){
        if(res.name == this.dataValue[i].variable){
        this.dataValue[i].options1.forEach((item)=>{
          if(!item.HasNotOutput){
          ss.forEach((item1)=>{
            if(res.name==item1.TagName){
                type = item1.TagType
                if(type ==  this.lang['二进制变量']){
                if(item.Data=='True'&&item.Data=='true'){
                  item.Data = 1
                }
                if(res.value=='False'&&res.value=='false'){
                  res.value = 0
                }
                }
            }
          })
             if(isNaN(item.Data)){
             arr.push(item.Data)
        }else{
          if(item.Data){
              arr.push(Number(item.Data).toString())
          }
        }
      
          }

        })
      }
      console.log(this.dataValue[i].variable)
    }
    console.log(arr)
    for(let i=0;i<this.dataValue.length;i++){
      if(!this.dataValue[i].HasNotOutput){
      if(res.name == this.dataValue[i].variable){
          let aaa = Number(res.value).toString()
        if(isNaN(res.value)){
          aaa = res.value
        }
        console.log("asdsad",aaa,arr)
        console.log(!arr.includes(aaa))
    if(!arr.includes(aaa)&&type !== this.lang['时间'] && type !== this.lang['日期'] && type !== this.lang['日期时间']){
          this.dataValue[i].options1.forEach((item)=>{
            if(item.IsDefault){
               this.dataValue[i].value = item.Name
            }
          })
        }else{
      this.dataValue[i].options1.forEach((item,key)=>{
          
          ss.forEach((item1)=>{
            if(res.name==item1.TagName){
                type = item1.TagType
               if(type == this.lang['时间'] || type == this.lang['日期'] || type == this.lang['日期时间']){
                this.$axios({
                                  method:'get',
                                  url:`/api/Base/GetDatetimeIsEqual?datetime1=${item.Data}&datetime2=${res.value}`,
                  }).then((res)=>{
                    
                    if(res.data.data == true){
                      delarr = []
                      delarr.push({
                        value:item.Name,
                        default:true
                      })
                    }else{
                  if(delarr.length<1){
                 this.dataValue[i].options1.forEach((item2)=>{
            if(item.IsDefault){
              delarr.push({
                        value:item2.Name,
                        default:false
                      })
            }
          })
                  }
  
     
                    }
                if(key == this.dataValue[i].options1.length-1){
                    
                  if(delarr.length>1){
                    this.dataValue[i].options1.forEach((item)=>{
            if(item.IsDefault){
               this.dataValue[i].value = item.Name
            }
          })
                  }else if(delarr.length==1){
                         this.dataValue[i].value = delarr[0].value

                  }
                  }
                  })
                }else{
                  
                  if(Number(item.Data)==Number(res.value)){
                    if(!item.IsDefault){
                      this.dataValue[i].value = item.Name
                       console.log("123213213123213",item.Name)
                    }
                 
                   }
                }
            }
          })
    
        })
        console.log("sss",this.dataValue[i])
        }

      }
    }
      }

    },
        //数值请求
      axio(){
          let arr = []
         this.dataValue.forEach((item)=>{
           arr.push(item.variable)
         })
             var ss = JSON.parse(sessionStorage.getItem('variable'));
        //请求接口
        this.$axios({
          method:"post",
          url:"/api/Base/PostRediusTest?varNameString=" + name,
          data:arr
        }).then((res)=>{
        console.log("123123")
          res.data.data.forEach((item)=>{
            this.dataValue.forEach((item1)=>{
              if(item1.variable == item.Name){
                item1.options.forEach((item2)=>{
                    ss.forEach((item3)=>{
            if(item.Name==item3.TagName){
               let type = item3.TagType
               console.log("asdsadsa",type)
              if(type == this.lang['时间'] || type == this.lang['日期'] || type == this.lang['日期时间']){
              this.$axios({
                                  method:'get',
                                  url:`/api/Base/GetDatetimeIsEqual?datetime1=${item2.Data}&datetime2=${item.Value}`,
                  }).then((res)=>{
                    if(res.data.data = true){
                          item1.value = item2.Name

                    }
                    console.log("res111",res)
                  })
              }else{
                let aaa = Number(item.Value).toString()
                let bbb = Number(item2.Data).toString()
                if(isNaN(item.Value)){
                aaa = item.Value
                }
                if(isNaN(item2.Data)){
                bbb = item2.Data
                }
                // console.log("sadsadsadsadsadsadsadasd",aaa)
                // console.log(item2.Data)
                  if(aaa == bbb){
                
                  item1.value = item2.Name
                  }
              }
            }
              })
                })
              }
            })
          })
        }).catch(function (error) {
                console.log('err',error);
        })
      },
        //   修改
      tagAxios(item){
        if(!item.HasNotOutput){
 this.jurisdictionShow(item).then(val => { 
           if(this.CanExcuteShow){
                    // this.commerPopShow1 = true
                      this.commerPopShow1 = true
                     this.tipword = this.lang.NoOperationAuthority
                    return
              }else{
                  let arr = [{ Name:item.variable,Value:item.value}]
                  item.options.forEach((item1)=>{
                      if(item.value == item1.Name){
                          arr[0].Value = item1.Data
                      }
                  })
                  console.log({ Name:item.variable,Value:item.value})
                   this.$axios({  method:'post',
                                  url:`/api/base/CheckTags`,
                                  data:arr
                             }).then((res1)=>{
                             if(res1.data.code === 0){
                                   this.$axios({
                  method: 'post',
                  url: '/api/Base/PostIOServiceTest',
                  data:arr
              }).then(res => {
                  if(res.data.code!==0){
                        this.commerPopShow1 = true
                    this.tipword = res.data.msg
                  }
                    console.log('执行下发按下',res)
              })
                             }else{
                                   this.commerPopShow1 = true
                               this.tipword = res1.data.msg
                             }      
                             })
              }
      })
        }
     
      },
    init(){
        //数据筛选
        this.textblockData = []
        var dataAll = this.data.Controls.ControlList

       //根据控件名筛选
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
            this.axio()
        }
    },
     //确认
    Jurisdiction(){
      this.commerPopShow1 = false
      this.tipword='该账户无操作权限';
    },
    //权限接口请求
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
      //下拉文本选择
      clickTextFun(item){
          this.jurisdictionShow(item).then(val => { 
          if(this.CanExcuteShow){
            this.commerPopShow1 = true
           document.querySelector('.el-popper[x-placement^=bottom]').style.display='none'
          }else{
             document.querySelector('.el-popper[x-placement^=bottom]').style.display='block'
          }
          })
      },
      //初始化值
      timeInit(arr){
            for(let i=0;i<this.dataValue.length;i++){
                let index = arr.indexOf(this.dataValue[i].class)
                if(index != -1){
                   for(let o=0;o<this.data.Data.ComboBoxList.length;o++){
                      if(this.data.Data.ComboBoxList[o].ElementName == this.dataValue[i].class){
                        this.dataValue[i].value = this.data.Data.ComboBoxList[o].DefaultShowText
                      }
                   } 
                }
            }
        },
        //所有值
        TimeValueFun(){
              var self = this
              let timeData = []
              for(let i=0;i<this.dataValue.length;i++){
                  var value = {
                      name:self.dataValue[i].class,
                      value:self.dataValue[i].value
                  }
                  timeData.push(value)
              }
                return timeData
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
            if(e.which == 1){      //鼠标左键按下
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
     //鼠标双击事件
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
             })          
           }
        },200)
     },

  upFun(item,e){ //鼠标抬起
    //脚本事件
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
    //有脚本事件样式  聚焦下拉框重新改变背景颜色
  selectClick(e,item){
   

    var dd = $(`.aa${item.class} .el-select-dropdown`)
    setTimeout(()=>{

      var background = e.path[0].style.background
      var color = e.path[0].style.color
      var size = e.path[0].style.fontSize
      var fontWeight = e.path[0].style.fontWeight

        if(dd.length){
          setTimeout(()=>{
            this.dom = dd
            this.dom[0].style.background = background
            let domli = this.dom.find('li')
            for(let i=0;i<domli.length;i++){
              domli[i].style.color = color
              domli[i].style.fontSize = size
              domli[i].style.fontWeight = fontWeight
            }
          },200)

        }else{
          this.dom[0].style.background = background
          let domli = this.dom.find('li')
            for(let i=0;i<domli.length;i++){
              domli[i].style.color = color
              domli[i].style.fontSize = size
              domli[i].style.fontWeight = fontWeight
            }
          console.log('eeee2',this.dom)
        }
    },500)
  
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
    JoinVarFun(){
    console.log("1111111111111111",this.resTagName,this.$store.state.websocketsShow)
    if(this.$store.state.websocketsShow != null){
         console.log("1111111111111111",this.resTagName)
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

         if(PressButtonList.length != 0 ){
           for(var j=0;j<PressButtonList.length;j++){
             if(PressButtonList[j].ElementName == this.textblockData[i].Name){

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
               var value = {
                    width:this.textblockData[i].PropertyList.Width,
                    height:this.textblockData[i].PropertyList.Height,
                    rotate:this.textblockData[i].PropertyList.RotateAngle,
                    top:this.textblockData[i].PropertyList.Top,
                    left:this.textblockData[i].PropertyList.Left,
                    opacity:this.textblockData[i].PropertyList.Opacity / 100,
                    class:this.textblockData[i].Name,
                    HasNotOutput:this.textblockData[i].HasNotOutput,
                    Background:backColor,
                    Foreground:foreColor,
                    family:this.textblockData[i].PropertyList.FontFamily,
                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                    BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                    BorderBrush:borderColor,
                    Shadow:Shadow,
                    size:this.textblockData[i].PropertyList.FontSize,
                    value:'',
                    options1:'',                  
                    options:'',
                    ComId:'',
                    ComNmame:'',
                    ZIndex:this.ZIndex
               }
                  this.dataValue.push(value)

                  this.$nextTick(()=>{
                        var dom = document.querySelector(`.aa${this.textblockData[i].Name}`)
                        let dom2 = document.querySelector(`.aa${this.textblockData[i].Name} .el-select-dropdown`)
                        dom2.style.background = colorData.backColor
                        let dom3 = $(`.aa${this.textblockData[i].Name} .el-select-dropdown li`)
                        var fomtFamilyVlaue =  this.textblockData[i].PropertyList.FontFamily
                        for(let i=0;i<dom3.length;i++){
                          dom3[i].style.color = colorData.foreColor
                          dom3[i].querySelector('span').style.fontFamily = fomtFamilyVlaue
                        }
                        let BorderThickness = this.textblockData[i].PropertyList.BorderThickness
                        dom.querySelector(`.el-input__inner`).style.background=colorData.backColor
                        dom.querySelector(`.el-input__inner`).style.color=colorData.foreColor
                        
                        dom.querySelector(`.el-input__inner`).style.fontFamily = this.textblockData[i].PropertyList.FontFamily

                        dom.querySelector(`.el-input__inner`).style.fontSize = this.textblockData[i].PropertyList.FontSize + 'px'
                        dom.querySelector(`.el-input__inner`).style.fontWeight=this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : ''
                        // dom.querySelector(`.el-input__inner`).style.boxShadow=colorData.Shadow
                        dom.querySelector(`.el-input__inner`).style.textAlign='left'
                        dom.querySelector(`.el-input__inner`).style.width='100%'
                        dom.querySelector(`.el-input__inner`).style.height='100%'
                        dom.querySelector(`.el-input__inner`).style.borderRadius='0%'
                        dom.querySelector(`.el-input--suffix .el-input__suffix`).style.setProperty('line-height', `${BorderThickness}px`, 'important');
                        dom.querySelector(`.el-input--suffix`).style.setProperty('line-height', `${BorderThickness}px`, 'important');
                  },300)

          
                  break;
             }else{
               if(j == PressButtonList.length-1){

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
                     size:this.textblockData[i].PropertyList.FontSize,
                    Background:backColor,
                    Foreground:foreColor,
                    family:this.textblockData[i].PropertyList.FontFamily,
                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                    BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                    BorderBrush:borderColor,
                    Shadow:Shadow,
                     HasNotOutput:this.textblockData[i].HasNotOutput,
                    value:'',
                    options:'',
                    options1:'',
                    ComId:'',
                    ComNmame:'',
                    ZIndex:this.ZIndex
                  }
                    this.dataValue.push(value5)

                  this.$nextTick(()=>{
                        var dom = document.querySelector(`.aa${this.textblockData[i].Name}`)
                        let dom2 = document.querySelector(`.aa${this.textblockData[i].Name} .el-select-dropdown`)
                        dom2.style.background = colorData.backColor
                        let dom3 = $(`.aa${this.textblockData[i].Name} .el-select-dropdown li`)
                        var fomtFamilyVlaue =  this.textblockData[i].PropertyList.FontFamily
                        for(let i=0;i<dom3.length;i++){
                          dom3[i].style.color = colorData.foreColor
                          dom3[i].querySelector('span').style.fontFamily = fomtFamilyVlaue
                        }
                        let BorderThickness = this.textblockData[i].PropertyList.BorderThickness
                        dom.querySelector(`.el-input__inner`).style.background=colorData.backColor
                        dom.querySelector(`.el-input__inner`).style.color=colorData.foreColor
                        
                        dom.querySelector(`.el-input__inner`).style.fontFamily = this.textblockData[i].PropertyList.FontFamily

                         dom.querySelector(`.el-input__inner`).style.fontSize = this.textblockData[i].PropertyList.FontSize + 'px'
                        dom.querySelector(`.el-input__inner`).style.fontWeight=this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : ''
                        // dom.querySelector(`.el-input__inner`).style.boxShadow=colorData.Shadow
                        dom.querySelector(`.el-input__inner`).style.textAlign='left'
                        dom.querySelector(`.el-input__inner`).style.width='100%'
                        dom.querySelector(`.el-input__inner`).style.height='100%'
                        dom.querySelector(`.el-input__inner`).style.borderRadius='0%'
                        dom.querySelector(`.el-input--suffix .el-input__suffix`).style.setProperty('line-height', `${BorderThickness}px`, 'important');
                        dom.querySelector(`.el-input--suffix`).style.setProperty('line-height', `${BorderThickness}px`, 'important');
                  },300)
                      

               }
             }
           }
         }else{
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
                   HasNotOutput:this.textblockData[i].HasNotOutput,
                    Background:backColor,
                    Foreground:foreColor,
                    family:this.textblockData[i].PropertyList.FontFamily,
                    Blod:this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : '',
                    BorderThickness:this.textblockData[i].PropertyList.BorderThickness,
                    TextDecorations:this.textblockData[i].PropertyList.TextDecorations == 'False' ? 'none' : 'underline',
                    BorderBrush:borderColor,
                    Shadow:Shadow,
                    size:this.textblockData[i].PropertyList.FontSize,

                    value:'',
                    options:'',
                    options1:'',
                    ComId:'',
                    ComNmame:'',
                    ZIndex:this.ZIndex
                  }
                  this.dataValue.push(value8)

                  this.$nextTick(()=>{
                        var dom = document.querySelector(`.aa${this.textblockData[i].Name}`)
                        let dom2 = document.querySelector(`.aa${this.textblockData[i].Name} .el-select-dropdown`)
                        dom2.style.background = colorData.backColor
                         let dom3 = $(`.aa${this.textblockData[i].Name} .el-select-dropdown li`)
                         var fomtFamilyVlaue =  this.textblockData[i].PropertyList.FontFamily
                        for(let i=0;i<dom3.length;i++){
                          dom3[i].style.color = colorData.foreColor
                          dom3[i].querySelector('span').style.fontFamily = fomtFamilyVlaue
                        }
                        let BorderThickness = this.textblockData[i].PropertyList.BorderThickness
                        dom.querySelector(`.el-input__inner`).style.background=colorData.backColor
                        dom.querySelector(`.el-input__inner`).style.color=colorData.foreColor

                        dom.querySelector(`.el-input__inner`).style.fontFamily = this.textblockData[i].PropertyList.FontFamily

                        dom.querySelector(`.el-input__inner`).style.fontSize = this.textblockData[i].PropertyList.FontSize + 'px'
                        dom.querySelector(`.el-input__inner`).style.fontWeight=this.textblockData[i].PropertyList.Blod == 'True' ? 'bold' : ''
                        // dom.querySelector(`.el-input__inner`).style.boxShadow=colorData.Shadow
                        dom.querySelector(`.el-input__inner`).style.textAlign='left'
                        dom.querySelector(`.el-input__inner`).style.width='100%'
                        dom.querySelector(`.el-input__inner`).style.height='100%'
                        dom.querySelector(`.el-input__inner`).style.borderRadius='0%'
                        dom.querySelector(`.el-input--suffix .el-input__suffix`).style.setProperty('line-height', `${BorderThickness}px`, 'important');
                        dom.querySelector(`.el-input--suffix`).style.setProperty('line-height', `${BorderThickness}px`, 'important');
                  },300)
                      
         }
      }
    //  修改

       for(let o=0;o<this.data.Data.CombineComboBoxList.length;o++){
         for(let o1=0;o1<this.dataValue.length;o1++){
              // this.dataValue[o1].options = []
           if(this.data.Data.CombineComboBoxList[o].ElementName == this.dataValue[o1].class){
           this.data.Data.CombineComboBoxList[o].SoucesItems.forEach((item)=>{
               item.value = item.Name
           
               if(item.IsDefault){
                   this.dataValue[o1].value=  item.Name
               }
              //    if(!item.IsDefault){
              //  this.dataValue[o1].options.push(item)
              //  }
           })
              this.resTagName.push(this.data.Data.CombineComboBoxList[o].TagName)
              this.dataValue[o1].HasNotOutput = this.data.Data.CombineComboBoxList[o].HasNotOutput
                this.dataValue[o1].variable = this.data.Data.CombineComboBoxList[o].TagName
                this.dataValue[o1].options1 =  this.data.Data.CombineComboBoxList[o].SoucesItems
                this.dataValue[o1].options = this.data.Data.CombineComboBoxList[o].SoucesItems.filter(ele => !ele.IsDefault)
           //    let ComId
            //    let ComNmame
            //    console.log("asasdda",this.data.Data.CombineComboBoxList[o])

        //    this.$axios({                      //下拉文本值
        //        method: 'get',
        //        url: `/api/control/GetDataColumn?setId=${ComId}&columnName=${ComNmame}`,
        //        setId:ComId,
        //        columnName:ComNmame,
        //    }) .then(res => {
        //          let optionsArr = []
        //           var value55
        //            if(ComNmame == '时间单位'){
        //              console.log('什么都不做')
        //             }else if(ComNmame == '班次'){
        //               value55 = {
        //                 value:'全部'
        //               }
        //               optionsArr.push(value55)
                     
        //             }else if(ComNmame == '配方'){
        //               value55 = {
        //                 value:'全部'
        //               }
        //               optionsArr.push(value55)

        //             }else{
        //               value55 = {
        //                 value:'全部'
        //               }
        //               optionsArr.push(value55)
                     
        //             }
        //           if(res.data.data.length){
        //             for(let o2=0;o2<res.data.data.length;o2++){
        //               let value66 = {
        //                 value:res.data.data[o2],
        //               }
        //               optionsArr.push(value66)
        //             }
        //           }
        //           this.dataValue[o1].value=  this.data.Data.ComboBoxList[o].DefaultShowText
        //           this.dataValue[o1].options =optionsArr
        //           this.dataValue[o1].ComId =  ComId
        //           this.dataValue[o1].ComNmame = ComNmame
        //           this.$parent.searchFun()
        //    }).catch(()=>{
        //      this.dataValue[o1].value=this.data.Data.ComboBoxList[o].DefaultShowText
        //      this.dataValue[o1].options = [{value:this.data.Data.ComboBoxList[o].DefaultShowText}]
        //    })
           }
         }      
            }
             this.JoinVarFun()
    }
  }
};
</script>

<style lang="scss">
.DateTimePicker29a{
    .el-icon-arrow-up:before {
        content: "\e78f";
    }
   .el-input__icon{
      height:100%;
      border-radius:0px;
      line-height:none !important;
    }
    .el-input{
      height:100%;
      
    }
    .el-icon-arrow-up,.el-select__caret{
      line-height:1px !important;
    }
    .el-icon-circle-close{
      display: none !important;
    }
    .el-icon-arrow-up{
      display: block !important;
    }
}

</style>

<style lang="scss" scoped>
.DateTimePicker29a{
  display: inline-block;
  user-select:none;
  cursor: pointer;
  box-sizing: border-box;
}
.textimportInput{
  height:34px;
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
