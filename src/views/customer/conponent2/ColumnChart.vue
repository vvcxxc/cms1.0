<!--
 * @Description: 这是柱形图子组件页面（组件）
 * @Date: 2019-12-16 13:18:06
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-25 20:10:19
 -->
 <template>
    <div>
        <div ref="ColumnChart23" @dblclick="opendb(item)" @contextmenu.prevent 
        @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
        :style="'width:' + item.width + 'px; height:' + item.height + 'px; position:absolute; left:' 
          + item.left + 'px;zIndex:0; top:' + item.top + 'px; transform:rotate(' + item.rotate + 'deg); opacity:' + item.opacity+';zIndex:'+item.ZIndex"
        >23</div>
        
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
//myChart不放data里渲染
// let myChart
export default {
    name:'Columnchart',
    data(){
        return{
            timerValue23:'',
            timerDate23:'',
            myChart:'',
            aa:true,
            commerPopShow1:false,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            IsOrigin:'',
            IsDuidie:'',
            rightYAxis: {},
        }
    },
    props:["data",'valueData1','drawLineShow','AllData','item','dataId'],
    watch:{
       data:{
         immediate:true,
         deep:true,
         handler(val){
                 clearInterval(this.timerValue23);
                 clearInterval(this.timerDate23);
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
      }
    },
    destroyed(){
      clearInterval(this.timerValue23);
      clearInterval(this.timerDate23);
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
	   return num
       },
         //确认
        Jurisdiction(){
            //  this.commerPopShow1 = false
            this.$emit('shownotip')
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
                        self.$emit('showtip',self.lang.NoOperationAuthority)
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
            //echarts图表属性赋值
           this.optionData = JSON.parse(this.data.option)
           this.Title = this.optionData.Title.Title
           this.TitlePosition = this.optionData.Title.Position
           this.TitleIsChecked = this.optionData.Title.Show
           this.TitleFontColor = this.colorRgba(this.optionData.Title.Color.HtmlColor)
           this.TitleFontSize =  this.optionData.Title.FontSize
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
            this.gridLeft = this.optionData.DrawContent.LeftMargin
            this.gridRight = this.optionData.DrawContent.RightMargin
            this.gridBottom = this.optionData.DrawContent.BottomMargin
            this.gridTop = this.optionData.DrawContent.TopMargin
            this.labelShow = this.optionData.Label.Show
            this.labelFontSize = this.optionData.Label.FontSize
            this.labelColor = this.colorRgba(this.optionData.Label.Color.HtmlColor)
            this.backgroundColor = this.colorRgba(this.optionData.BackgroundColor.HtmlColor)
            //x
            this.XfontSize = this.optionData.XAxis.FontSize
            this.Xcolor = this.colorRgba(this.optionData.XAxis.Color.HtmlColor)
            this.XfontFamily =this.optionData.XAxis.FontFamily
            this.XfontWeight =this.optionData.XAxis.FontWeight
            this.XSplitLine = this.optionData.XAxis.SplitLine
            this.XSplitLineFontWeight = this.optionData.XAxis.XSplitLineFontWeight
            this.XSplitLineWidth = this.optionData.XAxis.SplitLineWidth
            this.XSplitLineColor = this.colorRgba(this.optionData.XAxis.SplitLineColor.HtmlColor)
            this.XSplitLineShow = this.optionData.XAxis.SplitLineColor.SplitLineShow
            //y
            this.Yname = this.optionData.AxisChartYAxis.Name
            this.Adaptive = this.optionData.AxisChartYAxis.Adaptive
            this.YAxisMax = this.optionData.AxisChartYAxis.Max
            this.YAxisMin = this.optionData.AxisChartYAxis.Min
            if(this.Adaptive == true){
                this.YAxisMax = null
                this.YAxisMin = null
            }
            this.YsplitLine = this.optionData.AxisChartYAxis.SplitLineShow
            this.YfontSize = this.optionData.AxisChartYAxis.FontSize
            this.Ycolor = this.colorRgba(this.optionData.AxisChartYAxis.Color.HtmlColor)
            this.Unit = this.optionData.AxisChartYAxis.Unit == null ? '' : this.optionData.AxisChartYAxis.Unit
            this.SplitLineFontWeight = this.optionData.AxisChartYAxis.SplitLineFontWeight
            this.SplitLineWidth = this.optionData.AxisChartYAxis.SplitLineWidth
            this.SplitLineColor = this.colorRgba(this.optionData.AxisChartYAxis.SplitLineColor.HtmlColor)
            this.YFontFamily =  this.optionData.AxisChartYAxis.FontFamily
            this.ShowSeparator = this.optionData.AxisChartYAxis.ShowSeparator
            /* 右侧y轴 */
            if (!!this.optionData.rightYAxis && this.optionData.rightYAxis.Show) {
                this.rightYAxis.Yname = this.optionData.rightYAxis.Name
                this.rightYAxis.Adaptive = this.optionData.rightYAxis.Adaptive
                this.rightYAxis.YAxisMax = this.optionData.rightYAxis.Max
                this.rightYAxis.YAxisMin = this.optionData.rightYAxis.Min
                this.rightYAxis.YAxisMax1 = this.optionData.rightYAxis.Max
                this.rightYAxis.YAxisMin1 = this.optionData.rightYAxis.Min
                this.rightYAxis.YsplitLine = this.optionData.rightYAxis.SplitLineShow
                this.rightYAxis.YfontSize = this.optionData.rightYAxis.FontSize
                this.rightYAxis.IsCustomSegmentation = this.optionData.rightYAxis.IsCustomSegmentation
                this.rightYAxis.CustomSegmentation = this.optionData.rightYAxis.CustomSegmentation
                this.rightYAxis.Ycolor = this.colorRgba(this.optionData.rightYAxis.Color.HtmlColor)
                this.rightYAxis.Unit = this.optionData.rightYAxis.Unit == null ? '' : this.optionData.rightYAxis.Unit
                this.rightYAxis.SplitLineFontWeight = this.optionData.rightYAxis.SplitLineFontWeight
                this.rightYAxis.SplitLineWidth = this.optionData.rightYAxis.SplitLineWidth
                this.rightYAxis.SplitLineColor = this.colorRgba(this.optionData.rightYAxis.SplitLineColor.HtmlColor)
                this.rightYAxis.YFontFamily =  this.optionData.rightYAxis.FontFamily
                this.rightYAxis.ShowSeparator = this.optionData.rightYAxis.ShowSeparator
            }
            this.IsOrigin =this.optionData.IsOrigin
            this.IsDuidie = this.optionData.IsDuidie
            let chartstack = !this.IsTime?this.IsOrigin?1:1:this.IsDuidie?1:''
             //折线图数据
            this.seriesDatas = this.optionData.Datas
            this.Xdata = []
            this.seData = []
            if(this.seriesDatas != undefined){
                // 柱形图默认数据置空
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
            //折线图样式
            this.seriesArr = []
            for(var v=0;v<this.VariablesData.length;v++){
                let colorarr = []
					this.VariablesData[v].LinearBrush.GradientStops.forEach((item)=>{
						colorarr.push({
							offset:item.Offset,
							color:item.Color.HtmlColor
						})
					})
                    let itemcolortry
                         if(this.VariablesData[v].BrushTypes){
                             itemcolortry =  {
                          shadowColor: "rgba(85,85,85,0.2)",
                      shadowBlur: 2,
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
                      shadowBlur: 2,
                      shadowOffsetX: 2,
                      color: this.VariablesData[v].Color.HtmlColor
                      }
                  }
                let name11 = []
                for(let a=0;a<this.seData.length;a++){
                    name11.push(this.seData[a].name)
                }
                let index = name11.indexOf(this.VariablesData[v].DimensionName)
                if(index != -1){
                     var data11 = []
                } 
               var value = {
                    name:this.VariablesData[v].DimensionName,
                    // 添加组内柱子间的间距
                    barGap: this.VariablesData[v].BarGap + '%',
                    // barCategoryGap:'20%', // 添加柱子间距 注: 设置barWidth后barCategoryGap不生效
                    data:data11,
                    barMaxWidth: 25.0,
                    showBackground:this.optionData.ShowBackground,
                    stack:chartstack,
                    type: this.VariablesData[v].DataType.toLowerCase(),
                    itemStyle: itemcolortry,
                    lineStyle: {
                        color: this.VariablesData[v].Color.HtmlColor,
                        width: 4
                    },
                        label: {
                        color: this.labelColor,
                        fontSize: this.labelFontSize,
                        show: this.labelShow
                    },
                    markLine:''
               }
               this.seriesArr.push(value)
            }
            //辅助线
            this.AuxiliaryLinesData = this.optionData.AuxiliaryLines
            this.markLineData= {
                symbol:'none',
                data:[]
            }
           if(this.AuxiliaryLinesData.length){
               for(var v1=0;v1<this.AuxiliaryLinesData.length;v1++){
                   var value1 = {
                        yAxis:this.AuxiliaryLinesData[v1].Value,
                        Type: this.AuxiliaryLinesData[v1].Type,
                        TargetVariableName: this.AuxiliaryLinesData[v1].TargetVariableName,
                        ValueMethod: this.AuxiliaryLinesData[v1].ValueMethod,
                        lineStyle:{
                            type:this.AuxiliaryLinesData[v1].Type,
                            color:this.AuxiliaryLinesData[v1].Color.HtmlColor
                        }
                   }
                   this.markLineData.data.push(value1)
               }
               this.seriesArr[0].markLine = this.markLineData
           }
             this.$nextTick(()=>{
                    if(this.$refs.ColumnChart23){
                        this.drawLine();
                    }
             })  
        },

        //原始值数据结构
        dealWithData2(data) {
            let c = [];
            let d = {};
            data.forEach(element => {
                var enamel = element.name
                if (!d[enamel]) {
                        let value = JSON.parse(JSON.stringify(element))
                        c.push({
                            name: element.name,
                            allData: [value]
                        });
                        d[enamel] = value;
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
                        var index = namearr.indexOf(this.valueData.YDataCollection[a].name)
                        if(index != -1){
                            Ddata.series[index].data =this.valueData.YDataCollection[a].YData;
                            this.aa = false
                        }
                    }
                 
                       //原始值
                         if (this.IsOrigin) {   
                                    var slength = Ddata.series[0].data.length;
                                    var elength = Ddata.series.length;
                                    for (let i = 1; i < slength; i++) {
                                        for (let j = 0; j < elength; j++) {
                                            Ddata.series.push(Ddata.series[j])
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
                     if(this.valueData.XData != undefined && this.valueData.XData.length){
                         Ddata.xAxis[0].data = this.valueData.XData
                         Ddata.xAxis.data = this.valueData.XData
                         //原始值
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
                     //动态辅助线
                    if(this.valueData.YDataCollection != undefined){
                        var variableData = Ddata.series[0].markLine.data
                        if(variableData){
                            for(let q=0;q<variableData.length;q++){
                                if(variableData[q].Type == "FromVariable"){
                                    var index11 = this.variableArr.indexOf(variableData[q].TargetVariableName)
                                    var vbArr = Ddata.series[index11].data
                                    var vBvalue = ''
                                    if(variableData[q].ValueMethod == 'Max'){
                                        vBvalue = Math.max.apply(Math,vbArr);
                                    }else if(variableData[q].ValueMethod == 'Min'){
                                         vBvalue = Math.min.apply(Math,vbArr);
                                    }else if(variableData[q].ValueMethod == 'Avg'){
                                        var sum=0;
                                        for(var i = 0; i < vbArr.length; i++){
                                            sum += Number(vbArr[i]);
                                        }
                                        vBvalue  = sum / vbArr.length;
                                    }
                                    Ddata.series[0].markLine.data[q].yAxis = vBvalue
                                }
                            }
                        }
                    }
                     if (Ddata.IsOrigin) {
                        if (Ddata.series[0].data.length == 1) {
                            Ddata.series.forEach(item => {
                                item.stack = 1;
                            });
                        } else {
                            Ddata.series.forEach(item => {
                                item.stack = '';
                            });
                        }
                    }
                    let seData1  = []
                    let stackarr = []
			        let seData = []
			        Ddata.series.forEach((item)=>{
				seData1 = [...seData1,...item.data]
             
			})
            this.valueData.YDataCollection.forEach((item)=>{
	         let value = {
			    data:Object.values(item.YData),
				name:item.name
			}
            seData.push(value)
            })
            if(seData.length>0){
          	  for(let i=0;i<seData[0].data.length;i++){
          	  	   stackarr.push(this.sum(seData,i))
          	  	  }
          }
          
          if(Ddata.IsDuidie){
				seData1 = [...stackarr,...seData1]
			}
            if(seData1.length>0){
               let YAxisMax1 =Ddata.yAxis[0].YAxisMax1
               let YAxisMin1 = Ddata.yAxis[0].YAxisMin1
               let Adaptive = Ddata.yAxis[0].Adaptive
               if(Ddata.yAxis[0].Adaptive||YAxisMax1==null||YAxisMin1==null){
                   YAxisMax1 = null
                   YAxisMin1 = null
                   Adaptive = true
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
                   Adaptive = false
               }
               if(Ddata.yAxis[0].Adaptive&&Ddata.yAxis[0].splitNumber){
                  let zf;
                   zf = Math.min.apply(null,seData1)>=0?1:-1;
                  YAxisMin1 = this.getarea(parseFloat(Math.min.apply(null,seData1)),'min',zf)
                let zf1;
                   zf1 = Math.max.apply(null,seData1)>=0?1:-1;
                   YAxisMax1 = this.getarea(parseFloat(Math.max.apply(null,seData1)),'max',zf1)
              Adaptive = false
              }
              Ddata.yAxis[0].max = YAxisMax1
              Ddata.yAxis[0].min = YAxisMin1
              Ddata.yAxis[0].interval = !Ddata.yAxis[0].splitNumber||Adaptive?null:this.end(Number(YAxisMax1),Number(YAxisMin1),Ddata.yAxis[0].splitNumber)
            }
            //  if(Math.max.apply(null,seData1)>0){
            // Ddata.yAxis.forEach((item)=>{
			// 			item.max = !item.splitNumber?(item.max):Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))
			// 			item.interval =!item.splitNumber?null:Number(Number(Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))/item.splitNumber).toFixed(2))
			// 		})
            //  }

                    //查询历史时间清空画布
                    if(this.$store.state.typeNum == '1'){
                         this.$nextTick(()=>{
                            if(this.$refs.ColumnChart23){
                                console.log('清空画布')
                                setTimeout(()=>{
                                    this.myChart.clear()
                                    this.myChart.setOption(Ddata,true)
                                },200)
                            }
                            })
                    }
                    //正常渲染
                    if(this.valueData.XData != undefined && this.valueData.YDataCollection != undefined){
                        this.$nextTick(()=>{
                        if(this.$refs.ColumnChart23){
                                this.myChart.setOption(Ddata)
                        }
                        })  
                    }
                }
            },100)
        },
        //调用图表渲染
        InitDrawLine(){
            this.$nextTick(()=>{
            if(this.$refs.ColumnChart23){
                this.drawLine();
            }
            })  
        },
          colorRgba(sHex) {
        // 十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
        /* 16进制颜色转为RGB格式 */
        var sColor = sHex.toLowerCase()
        var alpha = 1 
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
        // 绘制图表方法
        drawLine(){
            this.$nextTick(()=>{
                // 基于准备好的dom，初始化echarts实例
                this.myChart = this.$echarts.init(this.$refs.ColumnChart23)
                this.myChart.resize()
                var aa =  {
                        color:this.TooColorArr,
                        IsDuidie:this.IsDuidie,
                        IsOrigin:this.IsOrigin,
                        animation: false,
                        tooltip:{
                            trigger: 'axis',
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
                        xAxis: {
                            data: this.Xdata,
                            axisLabel: {
                                fontWeight: this.XfontWeight,
                                fontFamily:this.XfontFamily,
                                textStyle: {
                                fontWeight: this.XfontWeight,
                                },
                                fontSize: (this.XfontSize-2),
                                color: this.Xcolor
                            },
                            axisLine: {
                                show:true,
                                lineStyle: {
                                    color: this.Xcolor
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                color: {
                                    HtmlColor: this.XSplitLineColor
                                }
                                },
                                show: this.XSplitLineShow
                            }
                        },
                        series:this.seriesArr,
                        legend: {
                            data:this.LegendData,
                            itemHeight: this.ItemHeight,
                            itemWidth: this.ItemWidth,
                            textStyle: {
                                fontWeight: this.FontWeight,
                                fontFamily: this.FontFamily,
                                color: this.LengenColor,
                                fontSize: this.lengenFontSize
                            },
                            show: this.LengendShow,
                            left: this.lengenL,
                            right: this.LengenR,
                            top: this.lengenT,
                            bottom: this.LengenB,
                            padding: [this.LPtb,this.LPlr]
                        },
    
                        yAxis: [
                            {
                                name: this.Yname,
                                splitNumber:!this.optionData.AxisChartYAxis.IsCustomSegmentation?0:this.optionData.AxisChartYAxis.CustomSegmentation,
                                axisLabel: {
                                    formatter: "{value} " + this.Unit,
                                    color: this.Ycolor,
                                    fontFamily: this.YFontFamily,
                                    fontWeight: 400,
                                    fontSize: (this.YfontSize-2),
                                    textStyle: {
                                        fontWeight: 400
                                    }
                                },
                                label: {
                                    textStyle: {
                                        color: this.Ycolor
                                    }
                                },
                                min: this.YAxisMin,
                                max: this.YAxisMax,
                                Adaptive:this.optionData.AxisChartYAxis.Adaptive,
                                YAxisMax1:this.optionData.AxisChartYAxis.Max,
                                YAxisMin1:this.optionData.AxisChartYAxis.Min,
                                nameTextStyle: {
                                    fontSize: (this.YfontSize-2),
                                    color:this.Ycolor
                                },
                                axisLine: {
                                    show:true,
                                    lineStyle: {
                                        color: this.Ycolor
                                    }
                                },
                                splitLine: {
                                    show: this.ShowSeparator,
                                    "lineStyle": {
                                            type:'dashed' ,
                                            "color":this.optionData.ThemeType=="Dark"?"rgba(210,210,210,0.49)":"rgba(210,210,210,0.9)"
                                            },
                                    color:this.SplitLineColor
                                }
                            }
                        ],
                        backgroundColor: this.backgroundColor,
                        title: {
                            textStyle: {
                                color: this.TitleFontColor,
                                fontSize: this.TitleFontSize
                            },
                             padding:[12,10],
                            x: this.TitlePosition.toLowerCase(),
                            show: this.TitleIsChecked,
                            text: this.Title
                        },
                       
                        grid: {
                            left: this.gridLeft,
                            right: this.gridRight,
                            bottom: this.gridBottom,
                            top: this.gridTop
                        }
                    }
                    if (!!this.optionData.rightYAxis && this.optionData.rightYAxis.Show) {
                        aa.yAxis.push(
                            {
                                name: this.rightYAxis.Yname,
                                splitNumber:!this.rightYAxis.IsCustomSegmentation?0:this.rightYAxis.CustomSegmentation,
                                axisLabel: {
                                    formatter: "{value} " + this.rightYAxis.Unit,
                                    color: this.rightYAxis.Ycolor,
                                    fontFamily: this.rightYAxis.YFontFamily,
                                    fontWeight: 400,
                                    fontSize: (this.rightYAxis.YfontSize-2),
                                    textStyle: {
                                        fontWeight: 400
                                    }
                                },
                                label: {
                                    textStyle: {
                                        color: this.rightYAxis.Ycolor
                                    }
                                },
                                min: this.rightYAxis.YAxisMin,
                                max: this.rightYAxis.YAxisMax,
                                Adaptive:this.rightYAxis.Adaptive,
                                YAxisMax1:this.rightYAxis.YAxisMax1,
                                YAxisMin1:this.rightYAxis.YAxisMin1,
                                nameTextStyle: {
                                    fontSize: (this.rightYAxis.YfontSize-2),
                                    color:this.rightYAxis.Ycolor
                                },
                                axisLine: {
                                    show:true,
                                    lineStyle: {
                                        color: this.rightYAxis.Ycolor
                                    }
                                },
                                splitLine: {
                                    show: this.rightYAxis.howSeparator,
                                    "lineStyle": {
                                            type:'dashed' ,
                                            "color":this.optionData.ThemeType=="Dark"?"rgba(210,210,210,0.49)":"rgba(210,210,210,0.9)"
                                            },
                                    color:this.rightYAxis.SplitLineColor
                                }
                            }
                        )
                    }
                // 绘制图表
                this.myChart.setOption(aa);
                   if(this.myChart){
                //图例点击
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
                        this.myChart.setOption(a);
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
                          this.myChart.setOption(a);
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