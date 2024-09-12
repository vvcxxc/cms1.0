<!--
 * @Description: 这是静态流动产品页面（组件）
 * @Date: 2019-11-12 17:40:04
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-05 19:41:17
 -->
<template>
<div>
  <div v-for="(item,index) in dataValue" :key="index">

    <div v-if="show" name="solidrectangle" :class="item.class" 
    @dblclick="opendb(item)" @contextmenu.prevent 
    @mousedown="downClick(item,$event)" 
    @mouseup="seupClick(item,$event)"
     class="MobileProducts" :style="'width:' + item.width + 'px; height:' 
    + item.height + 'px; position:absolute; top:' + item.top+ 'px; left:' + item.left 
    + 'px; transform:rotate(' + item.rotate +'deg); opacity:' + item.opacity + ';zIndex:'
    + item.ZIndex + ';boxShadow:' + item.Shadow + ';box-sizing:border-box' + `;border: ${item.showBorder ? `${item.StrokeThickness}px solid ${item.borderStyle}` : ''}` ">
       <div class="box" :style="'position:absolute;zIndex:'+(item.ZIndex+2)+';width:' + item.width + 'px;height:' 
       + item.height+'px;boxSizeng:border-box;-webkit-mask-repeat: repeat-x, repeat-y, repeat-x, repeat-y;'
       + '-webkit-mask-position: 0 0, 0 0, 0 100%, 100% 0;zIndex:'+(item.ZIndex+1)+';-webkit-mask-image: linear-gradient'
       + '(to right, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px), linear-gradient(to bottom, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px),'
       + 'linear-gradient(to right, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px), linear-gradient(to bottom, #000 ' + item.StrokeThickness +'px, transparent ' + item.StrokeThickness +'px);'
       + '-webkit-mask-size: '+item.soDa+'px ' + item.StrokeThickness +'px,'+ item.StrokeThickness+'px '
       + item.soDa+'px,'+item.soDa+'px '+ item.StrokeThickness+'px,'+item.StrokeThickness+'px '+item.soDa+'px;'
       + 'background:'+item.Stroke + ';boxShadow:' + item.Shadow" >
       </div>
       <div class="conter" :style="'width:'+ (item.width-item.StrokeThickness * 2) + 'px;zIndex:'+(item.ZIndex+1)+';height:' 
       + (item.height-item.StrokeThickness * 2) + 'px;position:absolute;left:0;top:0;zIndex:'+(item.ZIndex+2)+';margin-top:' 
       +item.StrokeThickness +'px;margin-left:' + item.StrokeThickness + 'px;background:'+item.Fill +
       ';paddingTop:' + item.StartPointY + 'px;paddingLeft:' + item.StartPointX + 'px;overflow:hidden'">
          <!-- 流动控件 -->
          <div style="width:100000px;">
            <div  style="overflow:hidden" v-for="(it,ind) in item.ProductFlowList" :key="ind">
                <div  @mouseenter="seenter(i,item,$event)"  @mouseleave="seleave(i,item,$event)" :style="'width:' + i.模拟宽度.Value + 'px;height:' + i.模拟高度.Value + 'px;background:' 
                  + i.ProductColor + ';color:' +i.FontColor + ';fontSize:' + i.FontSize + 'px;float:left;margin:' 
                  + i.RowPadding + 'px ' + i.ColuPadding + 'px;text-align:conter;overflow:hidden;white-space:nowrap;' " v-for="(i,inde) in it" :key="inde">
                  <div v-for="(ii,indd) in i.Arr" :key="indd">{{ii.Name}}:{{ii.Value}}</div>
                </div>
            </div>
          </div>
         <!-- 流动控件 -->
       </div>
    </div>

      <div class="suspensionShow2" style="position:absolute;top:0;left:0;z-index:999">
        <div class="sjx" v-show="item.suspensionShow" style="position:absolute;top:0;left:0"></div>
                <div v-show="item.suspensionShow" :style="'background:#727272'+ ';color:#fff' + ';fontSize:12px;float:left;padding:10px;border-radius:4px;text-align:conter;overflow:hidden;white-space:nowrap;' " >
                  <div v-for="(ii,indd) in Product22.Arr" :key="indd">{{ii.Name}}:{{ii.Value}}</div>
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
           Product22:[],
           suspensionShow:true,
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
              this.msgHub2 = window.$.connection.redisMonitor
              if(this.msgHub2){
                this.msgHub2.server.removeVariables(this.varArr)
              }
              if(val){
                this.init();
              }
        }
      },
    },
    mounted(){
      this.data = this.dae
      this.Name = 'productflow'
      if(this.data){
       this.init()
      }
    },
      beforeDestroy(){
        this.msgHub2 = window.$.connection.redisMonitor
        if(this.msgHub2){
          this.msgHub2.server.removeVariables(this.varArr)
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
        this.AxiosFlowList()
        this.JoinVarFun()
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
                 })
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
                     })
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
             })
           }
        },200)
     },
     //鼠标悬浮内容
     seenter(i,item,e){
          item.suspensionShow = true
          this.Product22 = i
          var top =$(e.path[0])[0].offsetTop
          var left = $(e.path[0])[0].offsetLeft
          var w = i.模拟宽度.Value
          var H = i.模拟高度.Value
          var leftNum
          if(isNaN(Number(w))){
            leftNum = left + 10 + 40
          }else{
            leftNum = left + Number(w) + 10
          }
          var Sumwidth = $(e.path[0]).parents('.MobileProducts')[0]
          var ww = parseInt(Sumwidth.style.left)
          var hh = parseInt(Sumwidth.style.top)
          $('.suspensionShow2').css('top',top + hh)
          if(leftNum >= Sumwidth.offsetWidth){
              $('.suspensionShow2').css('left',Sumwidth.offsetWidth + ww)
          }else{
             if(isNaN(Number(w))){
               $('.suspensionShow2').css('left',left + 40 + 10 + ww)
             }else{
               $('.suspensionShow2').css('left',left + Number(w) + 10 + ww)
             }
          }
     },
     seleave(i,item,e){
       item.suspensionShow = false
     },
     //加入变量   主页面也有加入变量
      JoinVarFun(){
        this.arrFun()
        let arr  = []
        arr = new Set(this.VariableArr)
        arr = [...arr]
        this.varArr = arr
        this.msgHub2 = window.$.connection.redisMonitor
        if(this.msgHub2){
          this.msgHub2.server.addVariables(arr)
        }  
      },
     
     //筛选变量组方法
      arrFun(){
         var dataProductFlowList = this.data.Data.ProductFlowList
         this.VariableArr = []
         for(let k=0;k<dataProductFlowList.length;k++){
           var FlowList = dataProductFlowList[k].CorrelationInfos
           for(let k1=0;k1<FlowList.length;k1++){
             if(FlowList[k1].Info.VariableName != ''){
               this.VariableArr.push(FlowList[k1].Info.VariableName)
             }
           }
         }
          this.VariableArr = new Set(this.VariableArr)
          this.VariableArr = [...this.VariableArr]
      },
      //条件判断方法
      judgeFun(data){
        if(this.dataValue.length){
            for(let k=0;k<this.dataValue.length;k++){
              let ProductFlowList = this.dataValue[k].ProductFlowList
              if(ProductFlowList.length){
                for(let k1=0;k1<ProductFlowList.length;k1++){
                  let Arrayl = ProductFlowList[k1]
                  if(Arrayl.length){
                    for(let k2=0;k2<Arrayl.length;k2++){
                      let arr = Arrayl[k2].Arr
                      let index2 = this.VariableArr.indexOf(Arrayl[k2].模拟高度.Name)
                      let index3 = this.VariableArr.indexOf(Arrayl[k2].模拟宽度.Name)
                      if(index2 != -1){
                         var resH = data[index2].Value == null?0:data[index2].Value
                         this.dataValue[k].ProductFlowList[k1][k2].模拟高度.Value = 
                         (Arrayl[k2].Target/Arrayl[k2].Source*resH) 
                      }
                      if(index3 != -1){
                         var resW = data[index3].Value == null?0:data[index3].Value
                         this.dataValue[k].ProductFlowList[k1][k2].模拟宽度.Value = 
                         (Arrayl[k2].Target/Arrayl[k2].Source*resW) 
                      }
                       for(let k3=0;k3<arr.length;k3++){
                         let index = this.VariableArr.indexOf(arr[k3].VariableName)
                         if(index != -1){
                          this.dataValue[k].ProductFlowList[k1][k2].Arr[k3].Value = 
                          data[index].Value == null?'':(data[index].Value)
                         }
                       }
                    }
                  }
                }
              }
            }
          }
      },
     //实时请求更改盒子大小
     AxiosFlowList(){
          this.resData = []
          this.arrFun()
             //请求接口
          this.$axios({
              method: 'post',
              url: '/api/Base/PostRediusTest',
              data: this.VariableArr
          }).then(res => {
            this.resData.push(res.data.data)
            this.judgeFun(res.data.data)
          }) .catch(function(error) {
            console.log('err',error);
          });
     },
      //websocket触发该方法
      axioImg2(resArr){
        //防止多次触发
        if(this.VariableArr){
          let index = this.VariableArr.indexOf(resArr.name)
          let resShow = false
          if(index != -1){
            for(let i=0;i<this.resData[0].length;i++){
              if(this.resData[0][i].Name == this.VariableArr[index]){
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
          var fillOp
          var fillColor
          var strokeOp
          var strokeColor
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
            //渐变色变量
                var FilldArr = JSON.parse(this.textblockData[i].PropertyList.Fill)
                 var StrokeArr = JSON.parse(this.textblockData[i].PropertyList.Stroke)
                 var lagel2
                 var gradient1
                 var lagel3
                var gradient3
                var borderSadow = JSON.parse(this.textblockData[i].PropertyList.Shadow)
                var InnerShadow
                var OuterShadow
                var Shadow
                //待优化方法 背景色，边框色，阴影方法
                //阴影
                Shadow = ''
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
                }else if(OuterShadow.length == 0){
                    Shadow = InnerShadow
                }
                  //边框色渐变
                  let showBorder = false
                  let borderStyle = ''
                  if(StrokeArr.ColorType == 'SolidColor'){
                      strokeColor = '#' + StrokeArr.Data.Color.slice(3) + StrokeArr.Data.Color.slice(1, 3)
                  }else{
                          strokeColor = ''
                          lagel3 = StrokeArr.Data.Angel.toFixed(0)
                      for(var f2=0;f2<StrokeArr.Data.GradientStops.length;f2++){
                          gradient3 = StrokeArr.Data.GradientStops[f2]
                          strokeColor = strokeColor + ',' + gradient3.Color + ' ' + (gradient3.Offset*100).toFixed(0) + '%'
                      }
                          strokeColor = '-webkit-linear-gradient('+lagel3+'deg'+strokeColor+')';
                  }
                //背景色渐变
                if(FilldArr.ColorType == 'SolidColor'){
                    fillColor = '#' + FilldArr.Data.Color.slice(3) + FilldArr.Data.Color.slice(1, 3)
                     if(FilldArr.Data.Color.slice(3) == 'FFFFFF' && FilldArr.Data.Color.slice(1, 3) != "FF"){
                        strokeColor = '#FFFFFF' + FilldArr.Data.Color.slice(1, 3)
                        showBorder = true
                        borderStyle = `#${StrokeArr.Data.Color.slice(3)}`
                    }
                }else{
                        fillColor = ''
                        lagel2 = FilldArr.Data.Angel.toFixed(0)
                    for(var h2=0;h2<FilldArr.Data.GradientStops.length;h2++){
                        gradient1 = FilldArr.Data.GradientStops[h2]
                        fillColor = fillColor + ',' + gradient1.Color + ' ' + (gradient1.Offset*100).toFixed(0) + '%'
                    }
                        fillColor = '-webkit-linear-gradient('+lagel2+'deg'+fillColor+')';
                }
               
               //流动控件
                var dataProductFlowList = this.data.Data.ProductFlowList
                if(dataProductFlowList.length){
                  for(let k=0;k<dataProductFlowList.length;k++){
                      //流动控件开始
                      if(dataProductFlowList[k].ElementName == this.textblockData[i].Name){
                       if(!dataProductFlowList[k].IsDynamic){
                         var CorrelationInfos = dataProductFlowList[k].CorrelationInfos
                         var ProductIdArr = []
                         for(let k1 =0 ; k1 <CorrelationInfos.length;k1++){
                             ProductIdArr.push(CorrelationInfos[k1].ProductId)
                         }
                         ProductIdArr = new Set(ProductIdArr)
                         ProductIdArr = [...ProductIdArr]
                         var ProductIdArr3 = []
                         for(let k2=0;k2<ProductIdArr.length;k2++){
                             var ProductIdArr4 = {}
                             var ProductIdArr2 = []
                             let o3 = []
                             for(var k3=0;k3<CorrelationInfos.length;k3++){
                                 if(ProductIdArr[k2] == CorrelationInfos[k3].ProductId){
                                     let name = CorrelationInfos[k3].Info.Remarks
                                     let name1 = CorrelationInfos[k3].Info.VariableName
                                     let name2 = CorrelationInfos[k3].Info.PromptText
                                     let value = ''
                                     let o4 = {}
                                     if(name == '模拟宽度'){
                                       value = dataProductFlowList[k].SizeInfo.SimulationWidth.Default.Value
                                         let str = "o4."+name+"={Name: '"+ name1 +"',Value:'"+value+"'}";
                                       eval(str);
                                       Object.assign(ProductIdArr4,o4);
                                     }else if(name == '模拟高度'){
                                       value = dataProductFlowList[k].SizeInfo.SimulationHeight.Default.Value
                                         let str = "o4."+name+"={Name: '"+ name1 +"',Value:'"+value+"'}";
                                         eval(str);
                                         Object.assign(ProductIdArr4,o4);
                                     }else{
                                       var va = {
                                         'Name':name2,
                                         'VariableName':name1,
                                         'Value':value
                                       }
                                       o3.push(va);
                                     }
                                     ProductIdArr4.FontColor = dataProductFlowList[k].FontColor.HtmlColor
                                     ProductIdArr4.ProductColor = dataProductFlowList[k].ProductColor.HtmlColor
                                     ProductIdArr4.StartPointX = dataProductFlowList[k].StartPoint.X.Value
                                     ProductIdArr4.StartPointY = dataProductFlowList[k].StartPoint.Y.Value
                                     ProductIdArr4.ColuPadding = dataProductFlowList[k].Interval.ColumnInterval.Value
                                     ProductIdArr4.RowPadding = dataProductFlowList[k].Interval.RowInterval.Value
                                     ProductIdArr4.DefaultH = dataProductFlowList[k].SizeInfo.SimulationHeight.Default.Value
                                     ProductIdArr4.DefaultH = dataProductFlowList[k].SizeInfo.SimulationWidth.Default.Value
                                     ProductIdArr4.ProductId = CorrelationInfos[k3].ProductId
                                     ProductIdArr4.FontSize = dataProductFlowList[k].FontSize
                                     ProductIdArr4.Arr = []
                                     ProductIdArr4.Source = dataProductFlowList[k].Scale.Source.Value.Value
                                     ProductIdArr4.Target = dataProductFlowList[k].Scale.Target.Value.Value
                                 }
                             }
                                ProductIdArr4.Arr = o3
                                ProductIdArr3.push(ProductIdArr4)
                            }
                            var column = dataProductFlowList[k].Layout.Column.Value
                            var columnNum = 0
                            let ProductIdArr5 = []
                            for(let k4=0;k4<ProductIdArr3.length/column;k4++){
                              ProductIdArr5.push(ProductIdArr3.slice(columnNum,columnNum+column))
                              columnNum = columnNum + column
                            }
                              //流动控件结束
                            var value = {
                                width:this.textblockData[i].PropertyList.Width,
                                height:this.textblockData[i].PropertyList.Height,
                                rotate:this.textblockData[i].PropertyList.RotateAngle,
                                top:this.textblockData[i].PropertyList.Top,
                                left:this.textblockData[i].PropertyList.Left,
                                opacity:this.textblockData[i].PropertyList.Opacity / 100,
                                Fill:fillColor,
                                Stroke:strokeColor,
                                StrokeThickness:Number(this.textblockData[i].PropertyList.StrokeThickness) ,
                                soDa: this.textblockData[i].PropertyList.StrokeDashArray.length == 0 ? 1 : this.textblockData[i].PropertyList.StrokeThickness * 5,
                                ZIndex:this.ZIndex,
                                Shadow:Shadow,
                                class:this.textblockData[i].Name,
                                ProductFlowList:ProductIdArr5,
                                StartPointY:dataProductFlowList[k].StartPoint.Y.Value,
                                StartPointX:dataProductFlowList[k].StartPoint.X.Value,
                                suspensionShow:false,
                                showBorder,
                                borderStyle
                            }
                            this.dataValue.push(value)
                          }
                      }
                  }
                }else{
                  var value1 = {
                              width:this.textblockData[i].PropertyList.Width,
                              height:this.textblockData[i].PropertyList.Height,
                              rotate:this.textblockData[i].PropertyList.RotateAngle,
                              top:this.textblockData[i].PropertyList.Top,
                              left:this.textblockData[i].PropertyList.Left,
                              opacity:this.textblockData[i].PropertyList.Opacity / 100,
                              Fill:fillColor,
                              Stroke:strokeColor,
                              StrokeThickness:Number(this.textblockData[i].PropertyList.StrokeThickness) ,
                              soDa: this.textblockData[i].PropertyList.StrokeDashArray.length == 0 ? 1 : this.textblockData[i].PropertyList.StrokeThickness * 5,
                              ZIndex:this.ZIndex,
                              Shadow:Shadow,
                              class:this.textblockData[i].Name,
                              suspensionShow:false
                          }
                          this.dataValue.push(value1)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.MobileProducts{
  display: inline-block;
  box-sizing:border-box;
}
.conter{
  box-sizing: border-box;
}
.sjx{
     width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 10px solid #727272;
    border-bottom: 10px solid transparent;
    margin-left:-6px;
    margin-top:6px;
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