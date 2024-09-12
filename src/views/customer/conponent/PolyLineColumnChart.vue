<!--
 * @Description: 这是折线柱形页面（组件）
 * @Date: 2019-12-16 14:17:01
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-25 20:06:58
 -->
<template>
<div>
    <div ref="PolylineColumnChart24" @dblclick="opendb(item)" @contextmenu.prevent 
    @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
     :style="'width:' + item.width + 'px; height:' + item.height 
        + 'px; position:absolute; left:' + item.left + 'px; top:' + item.top + 'px;zIndex:0; transform:rotate(' 
        + item.rotate + 'deg); opacity:' + item.opacity+';zIndex:'+item.ZIndex">24</div>

</div>
</template>

<script>
// let myChart
export default {
    name:'PolyLineClumnC',
    data(){
        return{
          myChart:'',
          valueData:[],
          commerPopShow1:false,
          bartype:[]
        }
    },
    props:["data",'valueData1','drawLineShow','item','dataId','AllData'],
    watch:{
       data:{
         immediate:true,
         deep:true,
         handler(val){
              this.data = val
              this.seriesArr = []
              this.Xdata = []
              this.init() 
            
        }
      },
       valueData1:{
         immediate:true,
        handler(val){
         for(let i=0;i<val.length;i++){
            if(this.data.name == val[i].name){
               this.valueData = val[i]
            }
         }
          this.dynamicNumber()
        }
      },

    },
    destroyed(){
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
sum(arr,i){
	   let num = 0
	   for(let a=0;a<arr.length;a++){
		   if(arr[a].data[i]){
			   if(Number(arr[a].data[i])!==NaN){
				   num+=Number(arr[a].data[i])
			   }
			   
		   }
	   }
    },
      //确认
        Jurisdiction(){
             this.commerPopShow1 = false
        },
                Jurisdiction(){
             this.commerPopShow1 = false
        },
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
                    self.commerPopShow1 = true
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
                          self.commerPopShow1 = true
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
     //鼠标按下
     downClick(item,e){
        // clearTimeout(this.timeoutID);
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
        // this.timeoutID = window.setTimeout(function() {
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
                    self.$parent.$parent.scriptData(Typearr,'','','','','')
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
                      self.$parent.$parent.scriptData(Typearr,'','','','','')
                      }
                  });
               }
          }
        // },200)
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
                         this.commerPopShow1 = true
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
      
            //echarts折线柱形图属性值
            this.optionData = JSON.parse(this.data.option)
            console.log("this.optionData",this.optionData)
            this.ItemHeight = this.optionData.Legend.ItemHeight
            this.ItemWidth = this.optionData.Legend.ItemWidth
            this.FontWeight = this.optionData.Legend.FontWeight
            this.FontFamily = this.optionData.Legend.FontFamily
            this.LengendShow = this.optionData.Legend.Show
            this.LengenColor = this.colorRgba(this.optionData.Legend.Color.HtmlColor)
            this.lengenPosition = this.optionData.Legend.Position
            this.lengenFontSize = this.optionData.Legend.FontSize
            this.LegendData = []
            this.TooColorArr = []
            this.variableArr = []
            this.IsTime = this.optionData.IsTime
            this.bartype = []
            for(var j=0;j<this.optionData.Variables.length;j++){
              if(this.optionData.Variables[j].DataType=='Line'){
               this.LegendData.push({
                 name:this.optionData.Variables[j].DimensionName,
                 icon:'circle'
			})
		}else{
      this.LegendData.push({
      name:this.optionData.Variables[j].DimensionName,
    icon:'roundRect'
			})
		}
              this.TooColorArr.push(this.colorRgba(this.optionData.Variables[j].Color.HtmlColor))
              this.variableArr.push(this.optionData.Variables[j].VariableName)
              if(this.optionData.Variables[j].DataType=='Bar'||this.optionData.Variables[j].DataType=='bar'){
                           this.bartype.push(this.optionData.Variables[j].DimensionName)
                }
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
               this.TitleFontColor = this.colorRgba(this.optionData.Title.Color.HtmlColor)
               this.TitleFontSize =  this.optionData.Title.FontSize
               this.gridLeft = this.optionData.DrawContent.LeftMargin
               this.gridRight = this.optionData.DrawContent.RightMargin
               this.gridBottom = this.optionData.DrawContent.BottomMargin
               this.gridTop = this.optionData.DrawContent.TopMargin
               this.labelShow = this.optionData.LineLabel.Show
               this.labelFontSize = this.optionData.LineLabel.FontSize
               this.BarLabelShow = this.optionData.BarLabel.Show
               this.BarLabelFontSize = this.optionData.BarLabel.FontSize
               this.BarLabelColor = this.colorRgba(this.optionData.BarLabel.Color.HtmlColor)
                if(this.optionData.LineLabel.Color != null){
                    this.LineLabelColor = this.colorRgba(this.optionData.LineLabel.Color.HtmlColor)
                }else{
                  this.LineLabelColor = ''
                }
               this.backgroundColor = this.colorRgba(this.optionData.BackgroundColor.HtmlColor)
               this.gridLeft = this.optionData.DrawContent.LeftMargin
               this.gridRight = this.optionData.DrawContent.RightMargin
               this.gridBottom = this.optionData.DrawContent.BottomMargin
               this.gridTop = this.optionData.DrawContent.TopMargin
              //x轴
              this.XfontSize = this.optionData.XAxis.FontSize
              this.Xcolor = this.colorRgba(this.optionData.XAxis.Color.HtmlColor)
              this.XfontFamily =this.optionData.XAxis.FontFamily
              this.XfontWeight =this.optionData.XAxis.FontWeight
              this.XSplitLine = this.optionData.XAxis.SplitLine
              this.XSplitLineFontWeight = this.optionData.XAxis.XSplitLineFontWeight
              this.XSplitLineWidth = this.optionData.XAxis.SplitLineWidth
              this.XSplitLineColor = this.colorRgba(this.optionData.XAxis.SplitLineColor.HtmlColor)
              this.XSplitLineShow = this.optionData.XAxis.SplitLineColor.SplitLineShow
              //y轴
               this.Yname1 = this.optionData.AxisChartYAxiss[0].Name
                this.Adaptive1 = this.optionData.AxisChartYAxiss[0].Adaptive
                this.YAxisMax1 = this.optionData.AxisChartYAxiss[0].Max
                this.YAxisMin1 = this.optionData.AxisChartYAxiss[0].Min
                this.Unit1 = this.optionData.AxisChartYAxiss[0].Unit == null ? '' : this.optionData.AxisChartYAxiss[0].Unit
                if(this.Adaptive1 == true){
                    this.YAxisMax1 = null
                    this.YAxisMin1 = null
                }
                this.YsplitLine1 = this.optionData.AxisChartYAxiss[0].SplitLineShow
                this.YfontSize1 = this.optionData.AxisChartYAxiss[0].FontSize
                this.Ycolor1 = this.colorRgba(this.optionData.AxisChartYAxiss[0].Color.HtmlColor)
                this.SplitLineFontWeight1 = this.optionData.AxisChartYAxiss[0].SplitLineFontWeight
                this.SplitLineWidth1 = this.optionData.AxisChartYAxiss[0].SplitLineWidth
                this.SplitLineColor1 = this.colorRgba(this.optionData.AxisChartYAxiss[0].SplitLineColor.HtmlColor)
                this.YFontFamily1 =  this.optionData.AxisChartYAxiss[0].FontFamily
                this.ShowSeparator1 = this.optionData.AxisChartYAxiss[0].ShowSeparator
                this.Yname2 = this.optionData.AxisChartYAxiss[1].Name
                this.Adaptive2 = this.optionData.AxisChartYAxiss[1].Adaptive
                this.YAxisMax2 = this.optionData.AxisChartYAxiss[1].Max
                this.YAxisMin2 = this.optionData.AxisChartYAxiss[1].Min
                this.Unit2 = this.optionData.AxisChartYAxiss[1].Unit == null ? '' : this.optionData.AxisChartYAxiss[1].Unit
                if(this.Adaptive2 == true){
                    this.YAxisMax2 = null
                    this.YAxisMin2 = null
                }
                this.YsplitLine2 = this.optionData.AxisChartYAxiss[1].SplitLineShow
                this.YfontSize2 = this.optionData.AxisChartYAxiss[1].FontSize
                this.Ycolor2 = this.colorRgba(this.optionData.AxisChartYAxiss[1].Color.HtmlColor)
                this.SplitLineFontWeight2 = this.optionData.AxisChartYAxiss[1].SplitLineFontWeight
                this.SplitLineWidth2 = this.optionData.AxisChartYAxiss[1].SplitLineWidth
                this.SplitLineColor2 = this.colorRgba(this.optionData.AxisChartYAxiss[1].SplitLineColor.HtmlColor)
                this.YFontFamily2 =  this.optionData.AxisChartYAxiss[1].FontFamily
                this.ShowSeparator2 = this.optionData.AxisChartYAxiss[1].ShowSeparator
                this.IsOrigin = this.optionData.IsOrigin
                this.IsDuidie = this.optionData.IsOrigin
                //辅助线
                this.AuxiliaryLinesData = this.optionData.AuxiliaryLines
                this.markLineData1= {
                  symbol:'none',
                    data:[]
                }
                this.markLineData2= {
                  symbol:'none',
                    data:[]
                }
                if(this.AuxiliaryLinesData.length){
                  for(var v1=0;v1<this.AuxiliaryLinesData.length;v1++){
                      if(this.AuxiliaryLinesData[v1].Axis.Value == 0){
                          var value1 = {
                              yAxis:this.AuxiliaryLinesData[v1].Value,
                              Type: this.AuxiliaryLinesData[v1].Type,
                              TargetVariableName: this.AuxiliaryLinesData[v1].TargetVariableName,
                              ValueMethod: this.AuxiliaryLinesData[v1].ValueMethod,
                              lineStyle:{
                                  type:this.AuxiliaryLinesData[v1].Type,
                                  color:this.colorRgba(this.AuxiliaryLinesData[v1].Color.HtmlColor)
                              }
                          }
                          this.markLineData1.data.push(value1)
                      }else{
                          var value2 = {
                              yAxis:this.AuxiliaryLinesData[v1].Value,
                              Type: this.AuxiliaryLinesData[v1].Type,
                              TargetVariableName: this.AuxiliaryLinesData[v1].TargetVariableName,
                              ValueMethod: this.AuxiliaryLinesData[v1].ValueMethod,
                              lineStyle:{
                                  type:this.AuxiliaryLinesData[v1].Type,
                                  color:this.colorRgba(this.AuxiliaryLinesData[v1].Color.HtmlColor)
                              }
                          }
                          this.markLineData2.data.push(value2)
                      }
                  }  
                }
                 
                //折线图数据
                this.seriesDatas = this.optionData.Datas
                this.Xdata = []
                this.seData = []
                if(this.seriesDatas != undefined){
                    // this.Xdata =this.seriesDatas.XData
                    //折线柱形图默认数据置空
                    this.Xdata  = []
                    var arr = []
                    for(var v9=0;v9<this.seriesDatas.YDataCollection.length;v9++){
                      let value22 = {
                          data:Object.values(this.seriesDatas.YDataCollection[v9].YData),
                          name:this.seriesDatas.YDataCollection[v9].name
                      }
                      this.seData.push(value22)
                    }
                  }
                  
                  this.VariablesData = this.optionData.Variables
                  this.seriesArr = []
                 for(let v=0;v<this.VariablesData.length;v++){

                   let symbol = this.VariablesData[v].DataType=='Line' ? '':'none'
                   let  v_IsDuidie = this.VariablesData[v].DataType.toLowerCase()!=='bar'?'':!this.IsTime?this.IsOrigin?'':1:this.IsDuidie?1:''
                   let fontSize11 = this.VariablesData[v].DataType=='Line'? this.labelFontSize:this.BarLabelFontSize
                   let show11 = this.VariablesData[v].DataType=='Line'?  this.labelShow : this.BarLabelShow
                   let color11
                   if(this.LineLabelColor == ''){
                     color11 = this.VariablesData[v].DataType=='Line'? this.VariablesData[v].Color.HtmlColor:this.BarLabelColor.slice(0,7)
                   }else{
                     color11 = this.VariablesData[v].DataType=='Line'? this.LineLabelColor:this.BarLabelColor
                   }
                  //  let yAxisIndex11 = this.VariablesData[v].DataType=='Line'? '1' : '0'
                  let yAxisIndex11 = this.VariablesData[v].CurrentAxis==null?'': this.VariablesData[v].CurrentAxis.Value
                  let name11 = []
                  for(let a=0;a<this.seData.length;a++){
                    name11.push(this.seData[a].name)
                  }
                  let index = name11.indexOf(this.VariablesData[v].DimensionName)
                  if(index != -1){
                    // var data11 = this.seData[index].data  //折线柱形图默认数据置空
                     var data11 = []
                  }
                           let colorarr = []
                  this.VariablesData[v].LinearBrush.GradientStops.forEach((item)=>{
						colorarr.push({
							offset:item.Offset,
							color:item.Color.HtmlColor
						})
					})
          let itemcolortry
          if(this.VariablesData[v].BrushTypes&& this.VariablesData[v].DataType.toLowerCase()=='bar'){
              itemcolortry =  {
              shadowColor: "rgba(85,85,85,0.2)",
            shadowBlur: 2,
            width: 2,
            shadowOffsetX: 2,
            color: {
              type: 'linear',
            x:  this.VariablesData[v].StartPoint.split(',')[0],
            y:  this.VariablesData[v].StartPoint.split(',')[1],
            x2:  this.VariablesData[v].EndPoint.split(',')[0],
            y2:  this.VariablesData[v].EndPoint.split(',')[1],
            colorStops:colorarr,
            global: false // 缺省为 false
						}
            }
					}else{
						
						itemcolortry =  { 
					shadowColor: "rgba(85,85,85,0.2)",
					shadowOffsetX: 2,
					width: 2,
					color:this.VariablesData[v].Color.HtmlColor,
          shadowBlur: 50,
					}
					}
                   var value = {
                     symbolSize:this.optionData.NumericalPoint,
                      showSymbol:this.optionData.ShowNumericalPoint,
                      smooth:this.optionData.IsSmooth,
                        showBackground:this.optionData.ShowBackground,
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
                      "name": this.VariablesData[v].DimensionName,
                      "data":data11,
                      "type": this.VariablesData[v].DataType.toLowerCase(),
                      "barMaxWidth": 25.0,
                       stack:v_IsDuidie,
                      "label": {
                        "fontSize": fontSize11,
                        "show": show11,
                        "color":color11
                      },
                      "lineStyle": {
                        shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      opacity: 1,
                      shadowBlur: 8,
                      type: "solid",
                      "shadowColor": this.VariablesData[v].Color.HtmlColor,
                      "width": 2
                      },
            "itemStyle":itemcolortry,
            "yAxisIndex":yAxisIndex11,
            "markLine": ''
                   }

                  this.seriesArr.push(value)
                
                 }
               
                //判断辅助线
              this.indexarr = []
              this.index0 = []
               
               if(this.AuxiliaryLinesData.length){

                 for(var v2=0;v2<this.seriesArr.length;v2++){
                     if(this.seriesArr[v2].yAxisIndex == 0){
                             this.index0.push(0)
                     }else if(this.seriesArr[v2].yAxisIndex == 1){
                             this.index0.push(1)
                     }
                 }
                 var ind1 = this.index0.indexOf(0)
                 var ind2 = this.index0.indexOf(1)
                 if(this.markLineData1.data.length && ind1 != -1){
                    this.seriesArr[ind1].markLine = this.markLineData1
                  }
                  if(this.markLineData2.data.length && ind2 != -1){
                    this.seriesArr[ind2].markLine = this.markLineData2
                  }

               }

                 this.$nextTick(()=>{
                    if(this.$refs.PolylineColumnChart24){
                        this.drawLine();
                    }
                }) 



         this.$nextTick(()=>{
                    if(this.$refs.PolylineColumnChart24){
                        this.drawLine();
                    }
             })  
        },
         //原始数据格式
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
          //  console.log('Ddata.series',Ddata.series)
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
                var index = namearr.indexOf(this.valueData.YDataCollection[a].name)
                if(index != -1){
                  Ddata.series[index].data = this.valueData.YDataCollection[a].YData;
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
                            console.log("itme2",JSON.parse(JSON.stringify(item2)))
                              wantdata.push(item2);
                          })
                      })
                      wantdata.forEach((item)=>{
                         item.data = item.data.slice(0,this.valueData.YDataCollection.length)
                      })
                      console.log(wantdata)
                      // console.log(Ddata)
                      Ddata.series = wantdata;
                          console.log("Ddata",Ddata)
                  }
            }else{
              for(let w=0;w<Ddata.series.length;w++){
                Ddata.series[w].data = []
              }
            }
  
             //动态x轴数据
                if(this.valueData.XData != undefined){
                       Ddata.xAxis.data = this.valueData.XData
                       Ddata.xAxis[0].data = this.valueData.XData
                      if(this.IsOrigin){
                         var sers = this.valueData.YDataCollection.map(x => x.name);
                               Ddata.xAxis.data = sers;
                               Ddata.xAxis[0].data = sers;
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
                                              
                                                if (that.valueData.XData.length) {
                                                      txt.innerText = that.valueData.XData[element.seriesIndex%that.valueData.XData.length] + ": " + element.data;
                                                }
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
  
                // 动态辅助线
                      if (this.valueData.hasOwnProperty("MarkLine")) {
                        var MarkLineArr11 = []
                        var MarkLineArr22 = []
                        for (let o1 = 0; o1 < this.valueData.MarkLine.length; o1++) {
                            if (this.valueData.MarkLine[o1].axis == 0) {
                                MarkLineArr11.push(this.valueData.MarkLine[o1].yAxis)
                            } else {
                                MarkLineArr22.push(this.valueData.MarkLine[o1].yAxis)
                            }
                        }
                        for (let o = 0; o < Ddata.series.length; o++) {
                            if (Ddata.series[o].yAxisIndex == 0) {
                                if (Ddata.series[o].markLine.data != undefined) {
                                    for (var o3 = 0; o3 < Ddata.series[o].markLine.data.length; o3++) {
                                        if (Ddata.series[o].markLine.length != 0 && MarkLineArr11[o3] != undefined) {
                                            if (Ddata.series[o].markLine.length != 0 && MarkLineArr11[o3] != undefined) {

                                                Ddata.series[o].markLine.data[o3].yAxis = MarkLineArr11[o3]
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (Ddata.series[o].markLine.data != undefined) {
                                    for (var o4 = 0; o4 < Ddata.series[o].markLine.data.length; o4++) {
                                        if (MarkLineArr22[o4] != undefined) {
                                            if (Ddata.series[o].markLine.length != 0 && MarkLineArr22[o4] != undefined) {

                                                Ddata.series[o].markLine.data[o4].yAxis = MarkLineArr22[o4]
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                // if(this.valueData.YDataCollection != undefined){
                //     for(let f=0;f<Ddata.series.length;f++){
                //            if(Ddata.series[f].markLine.data != undefined){
                //                var variableData = Ddata.series[f].markLine.data
                //                if(variableData){
                //                  for(let q=0;q<variableData.length;q++){
                //                      if(variableData[q].Type == "FromVariable"){
                //                         var index11 = this.variableArr.indexOf(variableData[q].TargetVariableName)
                //                         var vbArr = Ddata.series[index11].data
                //                         var vBvalue = ''
                //                         if(variableData[q].ValueMethod == 'Max'){
                //                             vBvalue = Math.max.apply(Math,vbArr);
                //                         }else if(variableData[q].ValueMethod == 'Min'){
                //                             vBvalue = Math.min.apply(Math,vbArr);
                //                         }else if(variableData[q].ValueMethod == 'Avg'){
                //                             var sum=0;
                //                             for(var i = 0; i < vbArr.length; i++){
                //                                 sum += Number(vbArr[i]);
                //                             }
                //                             vBvalue  = sum / vbArr.length;
                //                         }
                //                         Ddata.series[f].markLine.data[q].yAxis = vBvalue
                //                     }
                //                  }
                //                }
                //            }
                //     }
                // }
                if(Ddata.hasOwnProperty('markLine')){
                  delete Ddata.markLine
                }
                   let seData1  = []
                   let seData = []
			             let stackarr = []
			             let bararr = []
			             let bartype = []
			Ddata.series.forEach((item)=>{
				seData1 = [...seData1,...item.data]
			})
        this.valueData.YDataCollection.forEach((item) => {
                        let value22 = {
                            data:Object.values(item.YData),
                            name:item.name
                        }
                        if(this.bartype.includes(item.name)){
                            bararr.push(value22)
                        }
                    })
                    if(bararr.length>0){
                        for(let i=0;i<bararr[0].data.length;i++){
                               stackarr.push(this.sum(bararr,i))
                              } 
                      }
					if(Ddata.IsDuidie){
							 seData1 = [...stackarr,...seData1]
					}
          		if(Ddata.IsOrigin){
						if(Ddata.series[0].data.length==1){
							Ddata.series.forEach((item)=>{
								item.stack = 1
							})
						}else{
              	Ddata.series.forEach((item)=>{
									item.stack = ''
							})
					
						}
						
					}
 if(seData1.length>1){
      
        Ddata.yAxis.forEach((item)=>{
            let Adaptive1 = item.Adaptive1
            let YAxisMax1 = item.YAxisMax1
            let YAxisMin1 = item.YAxisMin1
            if(item.Adaptive1||YAxisMax1 == null||YAxisMin1 == null){
              YAxisMax1 = null
              YAxisMin1 = null
              Adaptive1 = true
            }else{
              let zf;
              zf = Math.min.apply(null,seData1)>=0?1:-1;
              if(Number(YAxisMin1)>parseFloat(Math.min.apply(null,seData1))){
                YAxisMin1 = this.getarea(parseFloat(Math.min.apply(null,seData1)),'min',zf)
              }
              let zf1;
              zf1 = Math.max.apply(null,seData1)>=0?1:-1;
              if(Number(YAxisMax1)<parseFloat(Math.max.apply(null,seData1))){
              YAxisMax1 = this.getarea(parseFloat(Math.max.apply(null,seData1)),'max',zf1)
              }
              Adaptive1 = false
            }
            if(item.Adaptive1&&item.splitNumber){
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
      console.log(seData1)
      console.log("data",JSON.stringify(Ddata))
      // if(Math.max.apply(null,seData1)>0){
      //     Ddata.yAxis.forEach((item)=>{
			// 			item.max = !item.splitNumber?(item.max):Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))
			// 			item.interval =!item.splitNumber?null:Number(Number(Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))/item.splitNumber).toFixed(2))
      //       console.log('max',item.max)
      //       console.log("interval",item.interval)
      //       console.log( Ddata.yAxis)
			// 		})
      
      // }
                //历史
                 if(this.$store.state.typeNum == '1'){
                    this.$nextTick(()=>{
                      if(this.$refs.PolylineColumnChart24){
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
               if(this.$refs.PolylineColumnChart24){
                   if(Ddata.hasOwnProperty('markLine')){
			delete Ddata.markLine
		}
                  this.myChart.setOption(Ddata)
               }
             })  
           }
         }

       },100)

     },

    
    // 绘制图表方法
    drawLine(){
       this.$nextTick(()=>{
         // 基于准备好的dom，初始化echarts实例
         this.myChart = this.$echarts.init(this.$refs.PolylineColumnChart24)
         this.myChart.resize()
         var aa =   {
             "color":this.TooColorArr,
             "animation": false,
             IsDuidie:this.IsDuidie,
					   IsOrigin:this.IsOrigin,
             bartype:this.bartype,
             "tooltip":{
               "trigger": 'axis',
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
             "xAxis": {
               "data": this.Xdata,
               "axisLabel": {
                 "fontWeight": this.XSplitLineFontWeight,
                 "fontFamily": this.XfontFamily,
                 "textStyle": {
                   "fontWeight": this.XSplitLineFontWeight
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
               "data":this.LegendData,
               "itemHeight": this.ItemHeight,
               "itemWidth": this.ItemWidth,
               "textStyle": {
                 "fontWeight": this.FontWeight,
                 "fontFamily":this.FontFamily,
                 "color":this.LengenColor,
                 "fontSize": this.lengenFontSize
               },
               "show": this.LengendShow,
               "left": this.lengenL,
               "right": this.LengenR,
               "top": this.lengenT,
               "bottom": this.LengenB,
               "padding": [this.LPtb,this.LPlr]
             },
             "yAxis": [
               {
                 "name": this.Yname1,
                  splitNumber:!this.optionData.AxisChartYAxiss[0].IsCustomSegmentation?0:this.optionData.AxisChartYAxiss[0].CustomSegmentation,
                 "axisLabel": {
                   "formatter": "{value} " + this.Unit1,
                   "color":this.Ycolor1,
                   "fontFamily": "Source Han Sans TC",
                   "fontWeight": 400,
                   "fontSize": (this.YfontSize1-2),
                   "textStyle": {
                     "fontWeight": null
                   }
                 },
                 "label": {
                   "textStyle": {
                     "color": this.Ycolor1
                   }
                 },
                 "min": this.YAxisMin1,
                 "max": this.YAxisMax1,
                 YAxisMax1:this.optionData.AxisChartYAxiss[0].Max,
                 YAxisMin1:this.optionData.AxisChartYAxiss[0].Min,
                 Adaptive1:this.optionData.AxisChartYAxiss[0].Adaptive,
                 "nameTextStyle": {
                   "fontSize": this.YfontSize1,
                   "color": this.Ycolor1
                 },
                 "axisLine": {
                   show:true,
                   "lineStyle": {
                     "color": this.Ycolor1
                   }
                 },
                 "splitLine": {
                   "lineStyle": {
                     type:'dashed' ,
                      "color":this.optionData.ThemeType=="Dark"?"rgba(210,210,210,0.49)":"rgba(210,210,210,0.9)"
                     },
                   "show": this.ShowSeparator1
                 }
               },
               {
                 "name": this.Yname2,
                  splitNumber:!this.optionData.AxisChartYAxiss[1].IsCustomSegmentation?0:this.optionData.AxisChartYAxiss[1].CustomSegmentation,
                 "axisLabel": {
                   "formatter": "{value} " + this.Unit2,
                   "color": this.Ycolor2,
                   "fontFamily": this.YFontFamily2,
                   "fontWeight": 400,
                   "fontSize": this.YfontSize2,
                   "textStyle": {
                     "fontWeight": null
                   }
                 },
                 "label": {
                   "textStyle": {
                     "color": this.Ycolor2,
                   }
                 },
                 "min": this.YAxisMin2,
                 "max": this.YAxisMax2,
                  YAxisMax1:this.optionData.AxisChartYAxiss[1].Max,
                 YAxisMin1:this.optionData.AxisChartYAxiss[1].Min,
                 Adaptive1:this.optionData.AxisChartYAxiss[1].Adaptive,
                 "nameTextStyle": {
                   "fontSize":this.YfontSize2,
                   "color": this.Ycolor2,
                 },
                 "axisLine": {
                    show:true,
                   "lineStyle": {
                     "color": this.Ycolor2,
                   }
                 },
                 "splitLine": {
                   "lineStyle": {
                     type:'dashed' ,
                     "color":this.optionData.ThemeType=="Dark"?"rgba(210,210,210,0.49)":"rgba(210,210,210,0.8)"
                     },
                   "show": this.ShowSeparator2
                 }
               }
             ],
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
         // 绘制图表
         this.myChart.setOption(aa);

         if(this.myChart){
          this.myChart.on('legendselectchanged', (obj) => {
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
                   } else if (s.markLine == '' || s.markLine.data.length == 0 ) {
                     let x = seriesData.filter(x => x.name != obj.name && x.yAxisIndex == yIndex && x.markLine != '');
                     if (x.length) {
                       let m = x[0].markLine;
                       s.markLine = m;
                       x[0].markLine = '';
                        if(a.hasOwnProperty('markLine')){
			delete a.markLine
		}
                       this.myChart.setOption(a,true);
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
                         this.myChart.setOption(a,true);
                         return
                       }
                     }
                   }
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

