<!--
 * @Description: 这是折线图子页面（组件）
 * @Date: 2019-12-16 10:43:29
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-26 10:49:59
 -->
<template>
<div>
    <div ref="LineChart22" @dblclick="opendb(item)" @contextmenu.prevent 
     @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
     :style="'width:' + item.width + 'px; height:' + item.height + 'px; position:absolute; left:' 
     + item.left + 'px; top:' + item.top +'px;zIndex:0; opacity:' + item.opacity + '; transform:rotate(' 
     + item.rotate + 'deg);zIndex:'+item.ZIndex">22 </div>

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
</template>

<script>
//  let myChart
export default {
    name:'linechart',
    data(){
        return{
          timer22:"",
          timer22t:'',
          myChart:'',
          restore:true,
          commerPopShow1:false,
          lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:["data",'item','valueData1','drawLineShow','dataId','AllData'],
    watch:{
       data:{
        deep:true,
        immediate:true,
         handler(val){
            this.data = val
            this.serieArr = []
            this.Xdata = []
            this.init() 
         }
      },
         valueData1:{
         deep:true,
         immediate:true,
         handler(val){
              for(let i=0;i<val.length;i++){
                    if(this.data.name == val[i].name){
                    this.valueData = val[i]
                    console.log(" this.valueData", this.valueData)
                    }
                }
            this.dynamicNumber()
         }
      },
    },
     destroyed(){
      clearInterval(this.timer22);
      clearInterval(this.timer22t);
     if(this.myChart){
          this.$echarts.dispose(this.myChart)
      }
    },
     beforeDestroy(){
        if(this.myChart){
          this.$echarts.dispose(this.myChart)
        }
    },
    methods:{

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
       var EventScriptList = this.AllData.Data.EventScriptList
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
                    // self.commerPopShow1 = true
                    self.$emit('showtip',self.lang.NoOperationAuthority)
                    return
                  }else{
                    for(var j=0;j<EventType.length;j++){
                      Typearr.push(EventType[j].Script)
                    }
                     self.$parent.$parent.scriptData(Typearr,'','','','','')
                  }
              });
              }
           }else if(e.which == 3){ //鼠标右键松开
                  if(EventType1.length){
                     self.jurisdictionShow(item).then(val => { 
                         if(self.CanExcuteShow){
                        //   self.commerPopShow1 = true
                        self.$emit('showtip',self.lang.NoOperationAuthority)
                          return
                        }else{
                          for(var j1=0;j1<EventType1.length;j1++){
                             Typearr.push(EventType1[j1].Script)
                           }
                         self.$parent.$parent.scriptData(Typearr,'','','','','')
                        }
                    });
                  }
           }
        },200)
     },
    //  计算自定义区间
    judgeDivisor(m, n){
            var num = {};
            var i = 0;
            var x = parseInt(m / n);
            m = m % n;
            var result = "";
            while (m != 0 && !(m in num)) {
                num[m] = i++;
                result += parseInt(m * 10 / n);
                m = m * 10 % n;
            }
            return m == 0;
    },
   end(max,min,n){
	 let length = 0
	 if(String(max).split('.').length>1){
		 length = String(max).split('.')[1].length
	 }
	 length+=String(n).length
	 if(this.judgeDivisor(this.$math.format(max-min,{precision: 14}),n)){
		 return Number(Number(this.$math.format(this.$math.format(max-min,{precision: 14})/n),{precision: 14}).toFixed(length))
	 }else{
		  return Number((Number(this.$math.format(this.$math.format(max-min,{precision: 14})/n),{precision: 14})+(1/Math.pow(10,length))).toFixed(length))
	 }
   },
   getarea(num,type,zf){
        
	num  = Math.abs(num)
	if(num == 0){
		return 0
	}
	let splitnum = 1;
	let daitnum = String(num)
	if(daitnum.split('.')[0].length>1){
		let nownum = String(daitnum.split('.')[0]).length
        for(let i=0;i<=nownum;i++){
			splitnum = splitnum*10
		}
	}
	num = num/splitnum
	console.log(daitnum.split('.'))
    let numlength = String(num)
	let endnum='';
	let breaknum='';
	let splitnum1 = 0
	for(let i=0;i<numlength.length;i++){
		endnum+=numlength[i]
			
		if(numlength[i]!=='.'){
			if(Number(numlength[i])>0){	
				splitnum1 = Math.pow(10,(i))
				breaknum = Number(numlength[i])
				endnum = Number(endnum)
				break
			}
		}
	}
if(type=='min'){
	         if(Number(this.$math.format((endnum*zf-Number(this.$math.format(endnum/breaknum,{precision: 14}))),{precision: 14}))*splitnum == 0){
				   return Number(this.$math.format((endnum*zf-Number(this.$math.format((endnum/breaknum/10),{precision: 14}))),{precision: 14}))*splitnum
			 }else{
				   return Number(this.$math.format((endnum*zf-Number(this.$math.format(endnum/breaknum,{precision: 14}))),{precision: 14}))*splitnum
			 }
		}else{
			 return Number(this.$math.format((endnum*zf+Number(this.$math.format(endnum/breaknum,{precision: 14}))),{precision: 14}))*splitnum
		}
    },
     //鼠标按下
     downClick(item,e){
        var self = this
        var EventScriptList = this.AllData.Data.EventScriptList
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
                        // self.commerPopShow1 = true
                        self.$emit('showtip',self.lang.NoOperationAuthority)
                        return
                    }else{
                      for(var j=0;j<EventType.length;j++){
                       Typearr.push(EventType[j].Script)
                     }
                     self.$parent.$parent.scriptData(Typearr,'','','','','')
                    }
                });

              }
          
          }else if(e.which == 3){  //鼠标右键按下
               if(EventType1.length){
                 self.jurisdictionShow(item).then(val => { 
                       if(self.CanExcuteShow){
                        // self.commerPopShow1 = true
                        self.$emit('showtip',self.lang.NoOperationAuthority)
                        return
                      }else{
                        for(var j1=0;j1<EventType1.length;j1++){
                            Typearr.push(EventType1[j1].Script)
                        }
                     self.$parent.$parent.scriptData(Typearr,'','','','','')
                      }
                  });
               }
          }
     },
     //鼠标双击
     opendb(item){
        // clearTimeout(this.timeoutID);
        setTimeout(()=>{
          var EventScriptList = this.AllData.Data.EventScriptList
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
                        //  this.commerPopShow1 = true
                        this.$emit('showtip',this.lang.NoOperationAuthority)
                         return
                   }else{
                     for(var j=0;j<EventType.length;j++){
                         Typearr.push(EventType[j].Script)
                       }
                     this.$parent.$parent.scriptData(Typearr,'','','','','')
                   }
             });
           }
        },200)
     },
        echartsResize(){
            if(this.myChart){
                this.myChart.resize()
            }
        },
          init(){
              //echarts图表属性
              this.optionData = JSON.parse(this.data.option)
              console.log(" this.optionData", this.optionData)
              this.ShowTootip = this.optionData.ShowTootip
              this.TooptipTrigger = this.optionData.AxisPointer.Trigger
              this.TooptipType = this.optionData.AxisPointer.Type
              this.TooptipColor = this.optionData.AxisPointer.Color.HtmlColor
               this.ItemHeight = this.optionData.Legend.ItemHeight
               this.ItemWidth = this.optionData.Legend.ItemWidth
               this.FontWeight = this.optionData.Legend.FontWeight
               this.FontFamily = this.optionData.Legend.FontFamily
               this.LengendShow = this.optionData.Legend.Show
               this.LengenColor = this.optionData.Legend.Color.HtmlColor
               this.lengenPosition = this.optionData.Legend.Position
               this.lengenFontSize = this.optionData.Legend.FontSize
               this.LegendData = []
               this.TooColorArr = []
               this.variableArr = []
               this.dataColor = this.optionData.Label.Color.HtmlColor

               for(var j=0;j<this.optionData.Variables.length;j++){
                  this.LegendData.push(this.optionData.Variables[j].DimensionName)
                  this.TooColorArr.push(this.optionData.Variables[j].Color.HtmlColor)
                  this.variableArr.push(this.optionData.Variables[j].VariableName)
               }
             
                if(this.lengenPosition == 'RightCenter'){
                    this.LengenB = null
                    this.lengenT = "center"
                    this.lengenL = null
                    this.LengenR ="right"
                    this.LPtb = 10 
                    this.LPlr = 30
                }
                if(this.lengenPosition == 'RightTop'){
                    this.LengenB = null
                    this.lengenT = "top"
                    this.lengenL = null
                    this.LengenR = "left"
                        this.LPtb =30 
                    this.LPlr = 10
                }
                if(this.lengenPosition == 'RightBottom'){
                    this.LengenB = "bottom"
                    this.lengenT = null
                    this.lengenL = null
                    this.LengenR = "left"
                    this.LPtb = 10
                    this.LPlr = 10
                }

               this.Title = this.optionData.Title.Title
               this.TitlePosition = this.optionData.Title.Position
               this.TitleIsChecked = this.optionData.Title.Show
               this.TitleFontColor = this.optionData.Title.Color.HtmlColor
               this.TitleFontSize =  this.optionData.Title.FontSize

               this.gridLeft = this.optionData.DrawContent.LeftMargin
               this.gridRight = this.optionData.DrawContent.RightMargin
               this.gridBottom = this.optionData.DrawContent.BottomMargin
               this.gridTop = this.optionData.DrawContent.TopMargin

               this.labelShow = this.optionData.Label.Show
               this.labelFontSize = this.optionData.Label.FontSize

               this.toolboxShow = this.optionData.Toolbox == null ? false: this.optionData.Toolbox.FeatureShow

                this.backgroundColor = this.optionData.BackgroundColor.HtmlColor
               //x轴
                this.XfontSize = this.optionData.XAxis.FontSize
                this.Xcolor =this.optionData.XAxis.Color.HtmlColor
                this.XfontFamily =this.optionData.XAxis.FontFamily
                this.XfontWeight =this.optionData.XAxis.FontWeight
                this.XSplitLine = this.optionData.XAxis.SplitLine
                this.XSplitLineFontWeight = this.optionData.XAxis.XSplitLineFontWeight
                this.XSplitLineWidth = this.optionData.XAxis.SplitLineWidth
                this.XSplitLineColor = this.optionData.XAxis.SplitLineColor.HtmlColor
                this.XSplitLineShow = this.optionData.XAxis.SplitLineColor.SplitLineShow
                this.IsOrigin = this.optionData.IsOrigin
               
                this.YAxisesArr = []
                //y轴
                
                for(var v6=0;v6<this.optionData.YAxises.length;v6++){
                    var YAxises = this.optionData.YAxises[v6]
                    let YAxisMax1 =YAxises.Max
                    let YAxisMin1 = YAxises.Min
                    let offsetNum 
                     if(YAxises.Adaptive == true){
                        YAxisMax1 = null
                        YAxisMin1 = null
                    }
                    if(v6 != 0){
                     offsetNum = (v6 -1) * 50
                    }else{
                      offsetNum = 0
                    }
                    var unit =  YAxises.Unit == null? '': YAxises.Unit
                   var value2 = {
                       offset:offsetNum,
                        "name": YAxises.Name,
                        YAxisMax1:YAxises.Max,
                        YAxisMin1:YAxises.Min,
                        Adaptive:YAxises.Adaptive,
                        "axisLabel": {
                            "formatter": "{value} " + unit,
                            "color": YAxises.Color.HtmlColor,
                            "fontFamily": YAxises.FontFamily,
                            "fontWeight": 400,
                            "fontSize":(YAxises.FontSize-2),
                            "textStyle": {
                            "fontWeight": null
                            }
                        },
                        "label": {
                            "textStyle": {
                            "color": YAxises.Color.HtmlColor
                            }
                        },
                         splitNumber:!this.optionData.YAxises[v6].IsCustomSegmentation?0:this.optionData.YAxises[v6].CustomSegmentation,
                        "min": YAxisMin1,
                        "max": YAxisMax1,
                        "nameTextStyle": {
                            "fontSize": YAxises.FontSize,
                            "color": YAxises.Color.HtmlColor
                        },
                        "axisLine": {
                            show:true,
                            "lineStyle": {
                            "color": YAxises.Color.HtmlColor
                            }
                        },
                        "splitLine": {
                              "lineStyle": {
                              type:'dashed' ,
                                "color":this.optionData.ThemeType=="Dark"?"rgba(210,210,210,0.49)":"rgba(210,210,210,0.9)"
                              },
                            "show": YAxises.ShowSeparator
                        }
                   }
                   this.YAxisesArr.push(value2)
                }
           

            //辅助线
            this.AuxiliaryLinesData = this.optionData.AuxiliaryLines
           
            this.markLineData = []

              for(var v1=0;v1<this.AuxiliaryLinesData.length;v1++){
                    var value1 = {
                         yAxis:this.AuxiliaryLinesData[v1].Value,
                         Type: this.AuxiliaryLinesData[v1].Type,
                         TargetVariableName: this.AuxiliaryLinesData[v1].TargetVariableName,
                         ValueMethod: this.AuxiliaryLinesData[v1].ValueMethod,
                         Axis: {
                          AxisType: this.AuxiliaryLinesData[v1].Axis.AxisType,
                          Value: this.AuxiliaryLinesData[v1].Axis.Value
                        },
                         lineStyle:{
                             type:this.AuxiliaryLinesData[v1].Type,
                             color:this.AuxiliaryLinesData[v1].Color.HtmlColor
                         }
                    }
                    this.markLineData.push(value1)
            }
         


        
               //数据
            this.seriesDatas = this.optionData.Datas
            this.Xdata = []
            this.seData = []
              
               if(this.seriesDatas != undefined){
                    // this.Xdata =this.seriesDatas.XData
                    // 折线图默认数据置空
                    this.Xdata = []

                    var arr = []
                    for(var v2=0;v2<this.seriesDatas.YDataCollection.length;v2++){
                        let value = {
                            data:Object.values(this.seriesDatas.YDataCollection[v2].YData),
                            name:this.seriesDatas.YDataCollection[v2].name
                        }
                        this.seData.push(value)
                    }
                }


              this.VariablesData = this.optionData.Variables
            //样式
            this.seriesArr = []
            this.indexArr = []
            for(let v=0;v<this.VariablesData.length;v++){
                
                this.markLineData2 = []

                if(this.VariablesData[v].CurrentAxis != null){
                    var index1 = this.indexArr.indexOf(this.VariablesData[v].CurrentAxis.Value)
                }

		if(index1 == -1){
			for(var v5=0;v5<this.markLineData.length;v5++){
            
				if(this.VariablesData[v].CurrentAxis.Value == this.markLineData[v5].Axis.Value){
					this.indexArr.push(this.VariablesData[v].CurrentAxis.Value)
					this.markLineData2.push(this.markLineData[v5])
				}     
			}
		}
		var CurrentAxisValue = this.VariablesData[v].CurrentAxis==null?null:this.VariablesData[v].CurrentAxis.Value>(this.YAxisesArr.length - 1)?null:this.VariablesData[v].CurrentAxis.Value
	
		let name11 = []
		for(let a=0;a<this.seData.length;a++){
			name11.push(this.seData[a].name)
		}
		let index = name11.indexOf(this.VariablesData[v].DimensionName)
		if(index != -1){
            // var data11 = this.seData[index].data  折线图默认数据置空
            var data11 = []
		}

               var value = {
                    "name": this.VariablesData[v].DimensionName,
                    "data": data11,
                    smooth:this.optionData.IsSmooth,
                    areaStyle:this.optionData.ShowRangeFill?{
                        color:{
                        type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: this.colorRgba(this.VariablesData[v].Color.HtmlColor.slice(0,7),this.optionData.RangeOpacity) // 0% 处的颜色
                    }, {
                        offset: 1, color: this.colorRgba(this.VariablesData[v].Color.HtmlColor.slice(0,7),0)// 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                    }    
                    }:{
                        color:{
                        type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: this.colorRgba(this.VariablesData[v].Color.HtmlColor.slice(0,7),0) // 0% 处的颜色
                    }, {
                        offset: 1, color: this.colorRgba(this.VariablesData[v].Color.HtmlColor.slice(0,7),0)// 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                    }
                    },
                    symbolSize:this.optionData.NumericalPoint,
                    showSymbol:this.optionData.ShowNumericalPoint,
                    "type": this.VariablesData[v].DataType.toLowerCase(),
                    "sampling": 'average',
                    "label": {
                        "fontSize": this.labelFontSize,
                        "show": this.labelShow,
                        "color":this.dataColor
                    },
                    itemStyle: {
                        "color":this.VariablesData[v].Color.HtmlColor,
                    shadowBlur: 500,
                    },
                            "lineStyle": {
                        "color":this.VariablesData[v].Color.HtmlColor,
                        "width": 3,
                        "shadowBlur": 25,
                            "shadowOffsetY": 10,
                            "shadowColor": "rgba(0, 0, 0, 0.2)"
                    },
                   
                    "yAxisIndex": this.VariablesData[v].CurrentAxis.Value,
                     markLine:{
                         symbol:'none',
                         data:this.markLineData2
                     }
               }
               if(this.VariablesData[v].DimensionName != null){

                   this.seriesArr.push(value)
               }
            }
            
             this.$nextTick(()=>{
                    if(this.$refs.LineChart22){
                        this.drawLine();
                    }
             })  

           

        },
        colorRgba(sHex,a) {
        // 十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
        /* 16进制颜色转为RGB格式 */
        var sColor = sHex.toLowerCase()
        var alpha = 0
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4 || sColor.length === 5) {
                var sColorNew = '#'
                for (var i = 1; i < sColor.length; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                }
                sColor = sColorNew
            }
            // 如果有透明度再执行
            if (sColor.length === 9) {
                alpha = (parseInt('0x' + sColor.slice(7, 9))/255).toFixed(2)
            }
			if(a){
				alpha = a/100
			}
            if(a===0){
				alpha = 0
			}
            //  处理六位的颜色值
            var sColorChange = []
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
            }
            return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
        } else {
            return sColor
        }
    },
        //原始值数据结构
        dealWithData2(data) {
            let c = [];
            let d = {};
            data.forEach(element => {
                if (!d[element.name]) {
                    let value = JSON.parse(JSON.stringify(element))
                    c.push({
                        name: element.name,
                        allData: [value]
                    });
                    d[element.name] = value;
                } else {
                    c.forEach(ele => {
                        if (ele.name == element.name) {
                            let value = JSON.parse(JSON.stringify(element))
                            ele.allData.push(value);
                        }
                    });
                }
            })
            return c
        },
        //刷数
        dynamicNumber(){
            setTimeout(()=>{
                if(this.myChart){
                    var Ddata = this.myChart.getOption()
                    //动态y轴数据
                    if(this.IsOrigin){
                        let obj = {};
                        Ddata.series = Ddata.series.reduce((cur,next) => {
                            obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
                            return cur;
                        },[])
                    }
                      let namearr = []
                      
                    for(let b=0;b<Ddata.series.length;b++){
                        namearr.push(Ddata.series[b].name)
                    } 
                    if(this.valueData == undefined){
                        return
                    }
                     if(this.valueData.YDataCollection != undefined){
                          if(this.valueData.YDataCollection.length ==0){
                             for(let w1=0;w1<Ddata.series.length;w1++){
                                    Ddata.series[w1].data = []
                                }
                        }
                       for(let a=0;a<this.valueData.YDataCollection.length;a++){
                           console.log(this.valueData.YDataCollection[a].name)
                         var index = namearr.indexOf(this.valueData.YDataCollection[a].name)
                         if(index != -1){
                           Ddata.series[index].data =this.valueData.YDataCollection[a].YData;
                         }
                       }
        
                    if (this.IsOrigin) {
                        var slength = Ddata.series[0].data.length;
                        var elength = Ddata.series.length;
                        for (let i = 1; i < slength; i++) {
                            for (let j = 0; j < elength; j++) {
                                Ddata.series.push(Ddata.series[j]);
                            }
                        }
                        var d = this.dealWithData2(Ddata.series)
                        d.forEach(item => {
                            item.allData.forEach((item2, index) => {
                                item2.stack = index + 1
                                if((index +1) ==item.allData.length){
                                    item2.stack = 0
                                }
                            })
                        })
                        for(let i=0;i<d.length;i++){
                            for(let j =0;j<d[i].allData.length;j++){
                                for(let k=0;k<d[i].allData[j].data.length;k++){
                                    d[i].allData[j].data[k] =d[i].allData[j].data[j]
                                }
                            
                            }
                        }
                        for (let i = 0; i < d.length; i++) {
                            for (let j = 0; j < d[i].allData.length; j++) {
                                for(let k=0;k<i;k++){
                                    d[i].allData[j].data.unshift(null)
                                }
                                for (let k = 0; k < d[i].allData[j].data.length; k++) {
                                    if (i !== k) {
                                        d[i].allData[j].data[k] = null
                                    }
                                }
        
                            }
                        }
                        var wantdata = [];
                        d.forEach(item => {
                            item.allData.forEach(item2 => {
                                wantdata.push(item2);
                            })
                        })
                           wantdata.forEach((item)=>{
                         item.data = item.data.slice(0,this.valueData.YDataCollection.length)
                      })
                        Ddata.series = wantdata;
                    }
                }else{
                    for(let w=0;w<Ddata.series.length;w++){
                        Ddata.series[w].data = []
                    }
                }
        
                  //动态x轴数据
                     if(this.valueData.XData != undefined){
                          Ddata.xAxis[0].data = this.valueData.XData
                           Ddata.xAxis.data = this.valueData.XData
                         if(this.IsOrigin){
                             var sers = this.valueData.YDataCollection.map(x => x.name);
                             Ddata.xAxis[0].data = sers;
                             Ddata.xAxis.data = sers;
                             var that = this
                             var formatterFun = function (params) {
                                var div = document.createElement('div');
                                var children = [];
                                var title = '';
                                for (let i = 0; i < params.length; i++) {
                                    const element = params[i];
                                    if (element.data !== null && element.data !== undefined) {//0也需要显示
                                        var block = document.createElement('div');
                                        block.innerHTML = element.marker;
                                        var txt = document.createElement('span');
                                        var seriesName = element.seriesName;
                                        if (that.IsOrigin) {
                                            txt.innerText = that.valueData.XData[element.seriesIndex%that.valueData.XData.length] + ": " + element.data;
                                        }else{

                                            txt.innerText = that.valueData.XData[i] + ": " + element.data;
                                        }
                                        block.append(txt);
                                        children.push(block);
                                        title = element.name;
                                    }
                                }
                                var titleBlock = document.createElement('div');
                                titleBlock.innerText = title;
                                div.append(titleBlock);
                                children.forEach(ele => {
                                    div.append(ele);
                                });
                                if (children.length === 0) {
                                    return null;
                                }
                                return div.innerHTML;
                            }
                            Ddata.tooltip[0].formatter = formatterFun

                         }
                     }
                    console.log("this.valueData1111",this.valueData)
                       //动态辅助线
                    if (this.valueData.hasOwnProperty("MarkLine")) {
                        var axiosArr = []
                        for (let o6 = 0; o6 < this.valueData.MarkLine.length; o6++) {
                            axiosArr.push(this.valueData.MarkLine[o6].axis)
                            var a = new Set(axiosArr)
                            axiosArr = [...a]
                        }
                        var index55 = []
                        for (let o7 = 0; o7 < axiosArr.length; o7++) {
                            for (let o5 = 0; o5 < Ddata.series.length; o5++) {
                                var index99 = index55.indexOf(axiosArr[o7])
                                if (index99 == -1) {
                                    if (Ddata.series[o5].yAxisIndex == axiosArr[o7]) {
                                        index55.push(axiosArr[o7])
                                        var arr = []
                                        for (var o8 = 0; o8 < this.valueData.MarkLine.length; o8++) {
                                            if (this.valueData.MarkLine[o8].axis == axiosArr[o7]) {
                                                arr.push(this.valueData.MarkLine[o8].yAxis)
                                            }
                                        }
                                        if (arr.length) {
                                            for (var o9 = 0; o9 < arr.length; o9++) {
                                                if (Ddata.series[o5].markLine.length != 0 && arr[o9] != undefined) {
                                                    Ddata.series[o5].markLine.data[o9].yAxis = arr[o9]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                
                    //   if(this.valueData.YDataCollection != undefined){
                    //       for(let f=0;f<Ddata.series.length;f++){
                    //              if(Ddata.series[f].markLine.length != 0 && Ddata.series[f].markLine.data.length){
                    //                  var variableData = Ddata.series[f].markLine.data
                    //                  if(variableData){
                    //                      for(let q=0;q<variableData.length;q++){
                    //                          if(variableData[q].Type == "FromVariable"){
                    //                             var index11 = this.variableArr.indexOf(variableData[q].TargetVariableName)
                    //                                 if(index11 != -1){
                    //                                     var vbArr = Ddata.series[index11].data
                    //                                     var vBvalue = ''
                    //                                     if(variableData[q].ValueMethod == 'Max'){
                    //                                         vBvalue = Math.max.apply(Math,vbArr);
                    //                                     }else if(variableData[q].ValueMethod == 'Min'){
                    //                                         vBvalue = Math.min.apply(Math,vbArr);
                    //                                     }else if(variableData[q].ValueMethod == 'Avg'){
                    //                                         var sum=0;
                    //                                         for(var i = 0; i < vbArr.length; i++){
                    //                                             sum += Number(vbArr[i]);
                    //                                         }
                    //                                         vBvalue  = sum / vbArr.length;
                    //                                     }
                    //                                     Ddata.series[f].markLine.data[q].yAxis = vBvalue
                    //                                 }
                    //                         }
                    //                      }
                    //                  }
                    //              }
                    //       }
                    //   }

                      //折线图数据 选择图例筛选数据
                    var lenIndex //最后一个显示图例
                    var lenDataArr = [] //最后一个图例数据
                    var lenXData
                    let trueArr = []
                    let falseArr = []
                    var opselected = Ddata.legend[0].selected
                    var opselectedData = Ddata.legend[0].data
                    var seletdArr = []
                    if(opselected){
                        for(let i in opselected){
                         seletdArr.push(i)
                        }
                    }else{
                        seletdArr = []
                    }
                    if(opselectedData.length != seletdArr.length){
                        if(seletdArr.length != 0){
                           let arr = []
                           for(let i=0;i<opselectedData.length;i++){
                               let index = seletdArr.indexOf(opselectedData[i])
                               if(index == -1){
                                arr.push(opselectedData[i])
                               }
                           }
                           let value2 = Ddata.legend[0].selected
                           for(let j=0;j<arr.length;j++){
                                let o = {};
                             
                                let str1 = `o["${arr[j]}"]=true`
                                eval(str1);
                                Object.assign(value2,o);
                           }
                           opselected = value2
                        }else{
                            let value3 = {}
                            for(let f=0;f<opselectedData.length;f++){
                                let oo = {};
                                //   console.log('arr',opselectedData)
                                let str = `oo["${opselectedData[f]}"]=true`;
                        
                                eval(str);
                                Object.assign(value3,oo);
                            }
                            opselected = value3
                        }
                    }
                        // console.log('seletdArr44 相等',opselected)
                    for(let item in opselected){
                            if(opselected[item] == true){
                                trueArr.push(item)
                            }else{
                                falseArr.push(item)
                            }
                    }
                    if(trueArr.length == 1){
                        for(let f=0;f<Ddata.series.length;f++){
                            if(Ddata.series[f].name == trueArr[0]){
                                lenIndex = f
                                lenDataArr = Ddata.series[f].data
                                lenXData = Ddata.xAxis[0].data
                            }
                        }
                        var lenDArr = []
                        var lenXArr = []
                        for(let h=0;h<Ddata.series[lenIndex].data.length;h++){
                            if(Ddata.series[lenIndex].data[h] != null){
                                lenDArr.push(Ddata.series[lenIndex].data[h])
                                lenXArr.push(Ddata.xAxis[0].data[h])
                            }
                        }
                        Ddata.series[lenIndex].data = lenDArr
                        Ddata.xAxis[0].data = lenXArr
                    }
                    else{
                        if(lenDataArr.length != 0){
                            Ddata.series[lenIndex].data = lenDataArr
                            Ddata.xAxis[0].data = lenXData
                        }
                    }
  let seData1  = []
			Ddata.series.forEach((item)=>{
				seData1 = [...seData1,...item.data]
			})
           
            if(seData1.length>0){
                
                Ddata.yAxis.forEach((item)=>{
                    console.log(item)
                    console.log( item.YAxisMax1)
                    let Adaptive1 = item.Adaptive
                    let YAxisMax1 = item.YAxisMax1
                    let YAxisMin1 = item.YAxisMin1
                    console.log(YAxisMax1)
                    if(item.Adaptive||YAxisMax1==null||YAxisMin1==null){
                        YAxisMax1 = null
                        YAxisMin1 = null
                        Adaptive1 = true
                    }else{
                        let zf;
                        zf = Math.min.apply(null,seData1)>=0?1:-1;
                        if(Number(YAxisMin1)>parseFloat(Math.min.apply(null,seData1))){
                            console.log()
                            YAxisMin1 = this.getarea(parseFloat(Math.min.apply(null,seData1)),'min',zf) 
                        }
                        let zf1;
                        zf1 = Math.max.apply(null,seData1)>=0?1:-1;
                        if(Number(YAxisMax1)<parseFloat(Math.max.apply(null,seData1))){
                            YAxisMax1 =  this.getarea(parseFloat(Math.max.apply(null,seData1)),'max',zf1) 
                        }
                        Adaptive1 = false
                    }
                    if(item.Adaptive&&item.splitNumber){
                          let zf;
                        zf = Math.min.apply(null,seData1)>=0?1:-1;
                        YAxisMin1 = this.getarea(parseFloat(Math.min.apply(null,seData1)),'min',zf) 
                        let zf1;
                        zf1 = Math.max.apply(null,seData1)>=0?1:-1;
                        YAxisMax1 = this.getarea(parseFloat(Math.max.apply(null,seData1)),'max',zf1) 
                        Adaptive1 = false
                    }
                    item.min = YAxisMin1
                    item.max = YAxisMax1
                    item.interval =!item.splitNumber||Adaptive1?null:this.end(Number(YAxisMax1),Number(YAxisMin1),item.splitNumber)
                })
            }
            //  if(Math.max.apply(null,seData1)>0){
            // Ddata.yAxis.forEach((item)=>{
			// 			item.max = !item.splitNumber?(item.max):Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))
			// 			item.interval =!item.splitNumber?null:Number(Number(Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))/item.splitNumber).toFixed(2))
			// 		})
            //  }
            //  console.log(seData1)
            //  console.log("data",JSON.stringify(Ddata))
                       //历史
                    if(this.$store.state.typeNum == '1'){
                        this.$nextTick(()=>{
                        if(this.$refs.LineChart22){
                            setTimeout(()=>{
                                this.myChart.clear()
                                if(Ddata.hasOwnProperty('markLine')){
			delete Ddata.markLine
		}
                                this.myChart.setOption(Ddata,true)
                            },200)
                        }
                        })
                    }

                    //正常
                    if(this.valueData.XData != undefined && this.valueData.YDataCollection != undefined){
                        this.$nextTick(()=>{
                        if(this.$refs.LineChart22){
                               if(Ddata.hasOwnProperty('markLine')){
			delete Ddata.markLine
		}
        console.log("asdasdsa",JSON.stringify(Ddata))
                            this.myChart.setOption(Ddata)
                        }
                        })  
                    }
                }

            },100)
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            this.$nextTick(()=>{
                this.myChart = this.$echarts.init(this.$refs.LineChart22);
                this.myChart.resize()

                var aa = {
                    "color":this.TooColorArr,
                    "animation": false,
                    "tooltip": {
                        "show": this.ShowTootip,
                        "trigger": this.TooptipTrigger,
                        "axisPointer": {
                        "type": this.TooptipType,
                        "lineStyle": {
                            "color": this.TooptipColor
                        }
                        },
                        formatter:function (params) {
                            var div = document.createElement('div');
                            var children = [];
                            var title = '';
                            for (let i = 0; i < params.length; i++) {
                                const element = params[i];
                                if (element.data!==null&&element.data!==undefined) {//0也需要显示
                                    var block = document.createElement('div');
                                    block.innerHTML = element.marker;
                                    var txt = document.createElement('span');
                                    txt.innerText = element.seriesName + ": " + element.data;
                                    block.append(txt);
                                    children.push(block);
                                    title = element.name;
                                }
                            }
                            var titleBlock = document.createElement('div');
                            titleBlock.innerText = title;
                            div.append(titleBlock);
                            children.forEach(ele => {
                                div.append(ele);
                            });
                            if (children.length===0) {
                                return null;
                            }
                            return div.innerHTML;
                        }
                    },
                    "toolbox": {
                        "show":this.toolboxShow,
                        "feature": {
                            "dataZoom": {
                                "yAxisIndex": 'none'
                            },
                            "restore": {},
                    }
                    },
                    "yAxis": this.YAxisesArr,
                    "xAxis": {
                        "data": this.Xdata,
                        "axisLabel": {
                        "fontWeight": this.XfontWeight,
                        "fontFamily": this.XfontFamily,
                        "textStyle": {
                            "fontWeight": this.XfontWeight,
                        },
                        "fontSize": (this.XfontSize-2),
                        "color": this.Xcolor
                        },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: this.Xcolor
                            }
                        },
                        "splitLine": {
                        "lineStyle": {
                            "color": {
                            "HtmlColor": this.XSplitLineColor
                            }
                        },
                        "show": this.XSplitLineShow
                        }
                    },
                    "series": this.seriesArr,
                    "legend": {
                        "data": this.LegendData,
                        "icon":"circle",
                        "itemHeight": this.ItemHeight,
                        "itemWidth": this.ItemWidth,
                        "textStyle": {
                        "fontWeight": this.FontWeight,
                        "fontFamily": this.FontFamily,
                        "color": this.LengenColor,
                        "fontSize":this.lengenFontSize
                        },
                        "show": this.LengendShow,
                        "left": this.lengenL,
                        "right": this.LengenR,
                        "top": this.lengenT,
                        "bottom": this.LengenB,
                        "padding": [this.LPtb,this.LPlr]
                    },
                    "backgroundColor": this.backgroundColor,
                    "title": {
                        "textStyle": {
                        "color": this.TitleFontColor,
                        "fontSize": this.TitleFontSize
                        },
                        padding:[12,10],
                        "x": this.TitlePosition.toLowerCase(),
                        "show": this.TitleIsChecked,
                        "text": this.Title
                    },
                    "grid": {
                        "left": this.gridLeft,
                        "right": this.gridRight,
                        "bottom": this.gridBottom,
                        "top": this.gridTop
                    }
                }
   if(aa.hasOwnProperty('markLine')){
			delete aa.markLine
		}
               this.myChart.setOption(aa);
                var lenIndex //最后一个显示图例
                var lenDataArr = [] //最后一个图例数据
                var lenXData

               if(this.myChart){
                 this.myChart.on('legendselectchanged', (obj)=> {
                 var a = this.myChart.getOption();
                 var seriesData = a.series
                 var yIndex
                 var markLine
                 var show
                 var s1
                 var s2
                 var s
                 for (let i = 0; i < seriesData.length; i++) {
                   if (seriesData[i].name == obj.name) {
                     yIndex = seriesData[i].yAxisIndex
                     s = seriesData[i]
                     if (!obj.selected[obj.name]) {
                       if (seriesData[i].markLine != '' && seriesData[i].length != 0&&seriesData[i].markLine.length != 0 &&seriesData[i].markLine.length!=0?seriesData[i].markLine.data.length!=0:null) {
                         show = true
                         markLine = seriesData[i].markLine
                         s = seriesData[i]
                       } else {
                         show = false
   
                       }
                     } else if (s.markLine == '' || s.markLine.data.length == 0) {
                       let x = seriesData.filter(x => x.name != obj.name && x.yAxisIndex == yIndex && x.markLine != '');
                       if (x.length) {
                         let m = x[0].markLine;
                         s.markLine = m;
                         x[0].markLine = '';
                          if(a.hasOwnProperty('markLine')){
			delete a.markLine
		}
                         this.myChart.setOption(a, true);
                       }
                     }
                   }
                 }
   
                 for (let i = 0; i < seriesData.length; i++) {
                   if (seriesData[i].name != obj.name) {
                     if (!obj.selected.hasOwnProperty(seriesData[i].name) ||
                       obj.selected[seriesData[i].name]) {
   
                       if (show) {
                         var isShow = seriesData[i].yAxisIndex == yIndex
                         if (isShow) {
                           seriesData[i].markLine = markLine
                           s.markLine = []
                               if(a.hasOwnProperty('markLine')){
			delete a.markLine
		}
                           this.myChart.setOption(a, true);
                           return
                         }
                       }
                     }
                   }
                 }
                   //图例改变 更改数据格式
                    let trueArr = []
                    let falseArr = []
                    for(let item in obj.selected){
                            if(obj.selected[item] == true){
                                trueArr.push(item)
                            }else{
                                falseArr.push(item)
                            }
                    }
                    if(trueArr.length == 1){
                        for(let f=0;f<a.series.length;f++){
                            if(a.series[f].name == trueArr[0]){
                                lenIndex = f
                                lenDataArr = a.series[f].data
                                lenXData = a.xAxis[0].data
                            }
                        }
                        var lenDArr = []
                        var lenXArr = []
                        for(let h=0;h<a.series[lenIndex].data.length;h++){
                           
                            if(a.series[lenIndex].data[h] != null){
                                lenDArr.push(a.series[lenIndex].data[h])
                                lenXArr.push(a.xAxis[0].data[h])
                            }
                        }
                        a.series[lenIndex].data = lenDArr
                        a.xAxis[0].data = lenXArr
                            if(a.hasOwnProperty('markLine')){
			delete a.markLine
		}
                        this.myChart.setOption(a, true);
                    }else{
                        if(lenDataArr.length != 0){
                            a.series[lenIndex].data = lenDataArr
                            a.xAxis[0].data = lenXData
                                if(a.hasOwnProperty('markLine')){
			delete a.markLine
		}
                            this.myChart.setOption(a, true);
                        }
                    }
                  

                 
               })
             }
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

</style>