<!--
 * @Description: 这是仪表盘子组件页面（组件）
 * @Date: 2019-12-16 09:39:03
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-25 16:30:19
 -->
<template>
    <div>
        <div ref="my" @dblclick="opendb(item)" @contextmenu.prevent @mousedown="downClick(item,$event)" @mouseup="seupClick(item,$event)"
        :style="'width:' + item.width + 'px; height:' + item.height + 'px; position:absolute; left:' 
          + item.left + 'px; top:' + item.top + 'px; transform:rotate(' + item.rotate + 'deg); opacity:' 
          + item.opacity + ';zIndex:'+item.ZIndex">200</div>
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
    name:'dash',
    data(){
        return{
          dataarr:[],
          timer21:'',
          myChart:'',
          commerPopShow1:false,
          colorarr:'',
          itemcolortry:'',
          lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:["data",'valueData1','drawLineShow','type',"item",'dataId','AllData'],
     watch:{
       data:{
         immediate:true,
         deep:true,
        handler(val){
             
                  clearInterval(this.timer21);
                   this.data = val
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
        clearInterval(this.timer21);
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


        init(){
            //echarts图表属性赋值
            this.optionData = JSON.parse(this.data.option)
            // this.seleteColor1 = this.optionData.SelectedColorScheme[0].HtmlColor
            // this.seleteColor2 = this.optionData.SelectedColorScheme[1].HtmlColor
            // this.seleteColor3 = this.optionData.SelectedColorScheme[2].HtmlColor
           if(this.optionData.IsRing){
                this.$nextTick(()=>{
                    if(this.$refs.my){
                        this.drawLine1();
                    }
             })  
          if(this.drawLineShow){
             this.$nextTick(()=>{
            if(this.$refs.my){
                this.myChart.clear()
                this.drawLine1();
            }
            })   
          }
         if(this.valueData != undefined && this.valueData.data != undefined){
            this.$nextTick(()=>{
            if(this.$refs.my){
                this.drawLine1();
            }
            })  
         }
          if(this.type == '1'){
              if(this.valueData != undefined && this.valueData.data == null){
                this.$nextTick(()=>{
                if(this.$refs.my){
                    this.drawLine1();
                }
                })  
             }
          }
           }else{
            this.Title = this.optionData.Title.Title
            this.TitleFontColor = this.optionData.Title.Color.HtmlColor
            this.TitleFontSize = this.optionData.Title.FontSize
            this.TitlePosition = this.optionData.Title.Position
            this.TitleShow = this.optionData.Title.Show
            this.BackGroundColor = this.optionData.BackgroundColor.HtmlColor
            this.formatterShow = false
            if(this.optionData.Label.ValueShow == true){
                this.ToolTipm = '{b}' 
                this.formatterShow = true
            }
            if(this.optionData.Label.DimensionShow == true){
               this.ToolTipm = '{c}'
               this.formatterShow = true
            }
            if(this.optionData.Label.ValueShow == true && this.optionData.Label.DimensionShow == true){
                this.ToolTipm = '{b}: {c}'
                this.formatterShow = true
            }
            this.AxisLabelFontSize = this.optionData.Variable.Tooltip.AxisLabelFontSize
            this.SeriesDetailFontSize = this.optionData.Variable.Tooltip.SeriesDetailFontSize
            
            this.DimensionName = this.optionData.Variable.DimensionName
            this.Max = this.optionData.Variable.Range.Max
            this.Min = this.optionData.Variable.Range.Min
            this.SplitNumber = this.optionData.Variable.Range.SplitSegments
            this.AreaColorOne = this.optionData.Variable.Range.NormalScale
            this.AreaColorTwo = this.optionData.Variable.Range.WarnScale
            this.SeriesDetailShow = this.optionData.Variable.Tooltip.SeriesDetailShow
            this.AxisLabelShow = this.optionData.Variable.Tooltip.AxisLabelShow
            this.Value = Number(this.optionData.Variable.Value)
            if(this.Value == 0){
                this.Value2 = 0
            }else{
                this.Value2 =  (this.Value - this.Min)>(this.Max - this.Min)? (this.Max - this.Min) : (this.Value - this.Min)
            }
            this.Unit = this.optionData.Variable.Unit
            this.AxisSplitNumber = this.optionData.Variable.Range.Scale
            this.titleColor = this.optionData.Variable.Color.HtmlColor
                   
                         if(this.optionData.ColorType == "Multicolor"){
					this.colorarr = [[this.AreaColorOne / 100, this.optionData.Variable.Range.NormalColor.HtmlColor],[(100 - this.AreaColorTwo) / 100 , this.optionData.Variable.Range.ExcessColor.HtmlColor],[1,this.optionData.Variable.Range.WarnColor.HtmlColor]]
				}else if(this.optionData.ColorType == 'GradientMulticolor'){
                     if( this.optionData.ThemeType=='Light'){
                         this.colorarr = [[1,'#45476B']]
                         }else{
                             this.colorarr = [[1,'rgba(229,234,247,0.4)']]
                         }
						
				}else{
                     if( this.optionData.ThemeType=='Light'){
                         this.colorarr = [[1,'#534F66']]
                         }else{
                             this.colorarr = [[1,'rgba(229,234,247,0.4)']]
                         } 
                }
                let colorarr2 = []
							if(this.optionData.ColorType !== "Multicolor"&&this.optionData.ColorType !== 'GradientMulticolor'){
					this.optionData.Variable.Range.NormalLinearColor.GradientStops.forEach((item)=>{
						colorarr2.push({
							offset:item.Offset,
							color:item.Color.HtmlColor
						})
					})
					this.itemcolortry =  {
						color: {
                            type: 'linear',
                            x:  this.optionData.Variable.Range.NormalLinearStartPoint.split(',')[0],
                            y:  this.optionData.Variable.Range.NormalLinearStartPoint.split(',')[1],
                            x2:  this.optionData.Variable.Range.NormalLinearEndPoint.split(',')[0],
                            y2:  this.optionData.Variable.Range.NormalLinearEndPoint.split(',')[1],
                            colorStops:colorarr2,
                            global: false // 缺省为 false
					}
                    }
				}else if(this.optionData.ColorType !== 'GradientMulticolor'){
					this.itemcolortry =  {
                        color: this.optionData.Variable.Color.HtmlColor
                        }
				}else{
                    let color = ''
                    if(this.Value>=(this.Max*((this.AreaColorOne+this.optionData.Variable.Range.ExcessScale)/100))){
						color = this.optionData.Variable.Range.WarnColor.HtmlColor
					}else if(this.Value>=(this.Max*((this.AreaColorOne)/100))){
						color = this.optionData.Variable.Range.ExcessColor.HtmlColor
					}else{
						color = this.optionData.Variable.Range.NormalColor.HtmlColor
					}
                   		this.optionData.Variable.Range.NormalLinearColor.GradientStops.forEach((item)=>{
						colorarr2.push({
							offset:item.Offset,
							color:item.Color.HtmlColor
						})
					})
					this.itemcolortry =  {
						color: {
                            type: 'linear',
                            x:  this.optionData.Variable.Range.NormalLinearStartPoint.split(',')[0],
                            y:  this.optionData.Variable.Range.NormalLinearStartPoint.split(',')[1],
                            x2:  this.optionData.Variable.Range.NormalLinearEndPoint.split(',')[0],
                            y2:  this.optionData.Variable.Range.NormalLinearEndPoint.split(',')[1],
                            colorStops:colorarr2,
                            global: false // 缺省为 false
					}
                    }
                }
             this.$nextTick(()=>{
                    if(this.$refs.my){
                        this.drawLine1();
                    }
             })  
          if(this.drawLineShow){
             this.$nextTick(()=>{
            if(this.$refs.my){
                this.myChart.clear()
                this.drawLine1();
            }
            })   
          }
         if(this.valueData != undefined && this.valueData.data != undefined){
            this.$nextTick(()=>{
            if(this.$refs.my){
                this.drawLine1();
            }
            })  
         }
          if(this.type == '1'){
              if(this.valueData != undefined && this.valueData.data == null){
                this.$nextTick(()=>{
                if(this.$refs.my){
                    this.drawLine1();
                }
                })  
             }
          }
           }

        },

        //调用图表渲染
        InitDrawLine(){
            this.$nextTick(()=>{
            if(this.$refs.ColumnChart23){
                this.drawLine1();
            }
            })  
        },
          //刷数
        dynamicNumber(){
            setTimeout(()=>{
                if(this.myChart){
                    var Ddata = this.myChart.getOption()
                    var dataarr = []
				           	var colorarr2  = []
                  	if(Ddata.IsRing){
                     //动态数据
                      if(this.valueData == undefined){
                        return
                    }
            if(this.valueData != undefined && this.valueData.data != undefined){
           let minfixed = 0
            let maxfixed = 100
             Ddata.title[0].subtext = Ddata.SeriesShowDetailMode===1?(Number(this.valueData.data)<Number(Ddata.Range.Min)?minfixed.toFixed(Ddata.fixed):(((Number(this.valueData.data)-Number(Ddata.Range.Min))/(Number(Ddata.Range.Max)-Number(Ddata.Range.Min)))*100).toFixed(Ddata.fixed))+ Ddata.Unit:Number(this.valueData.data).toFixed(Ddata.fixed)+ Ddata.Unit
						Ddata.series[0].data[0].value = Number(this.valueData.data)<Number(Ddata.Range.Min)?0:Number(this.valueData.data)>Number(Ddata.Range.Max)?100:((Number(this.valueData.data)-Number(Ddata.Range.Min))/(Number(Ddata.Range.Max)-Number(Ddata.Range.Min)))*100
						if(this.valueData.data=='???'){
             Ddata.title[0].subtext  = this.valueData.data+ Ddata.Unit
             Ddata.series[0].data[0].value = 0
          }
          let color = ''
						if(Ddata.ColorType == 'GradientMulticolor'){
							if(Number(this.valueData.data)>=(Number(Ddata.Range.Max)*((Number(Ddata.Range.NormalScale)+Ddata.Range.ExcessScale)/100))){
								color = Ddata.Range.WarnColor.HtmlColor
							}else if(Number(this.valueData.data)>=(Number(Ddata.Range.Max)*((Number(Ddata.Range.NormalScale))/100))){
								color = Ddata.Range.ExcessColor.HtmlColor
							}else{
								color = Ddata.Range.NormalColor.HtmlColor
							}
							Ddata.Range.NormalLinearColor.GradientStops.forEach((item)=>{
								colorarr2.push({
									offset:item.Offset,
									color:color
								})
							})
							let obj = {
								value: Number(this.valueData.data)<Number(Ddata.Range.Min)?0:Number(this.valueData.data)>Number(Ddata.Range.Max)?100:((Number(this.valueData.data)-Number(Ddata.Range.Min))/Number(Ddata.Range.Max))*100,
							  itemStyle: {
								normal: {
								  color: new echarts.graphic.LinearGradient(1, 0, 0, 0,colorarr2)
								}
							  },
							}
							dataarr.push(obj)
						}
						
						
						if(dataarr.length>0){
							Ddata.series[0].data = dataarr
						}
                     }

                                  
                        if(this.drawLineShow){
                           this.$nextTick(()=>{
                           if(this.$refs.my){
                               this.myChart.clear()
                               this.myChart.setOption(Ddata)
                           }
                           })   
                       }
                       if(this.valueData != undefined && this.valueData.data != undefined){
                           this.$nextTick(()=>{
                           if(this.$refs.my){
                           
                                this.myChart.setOption(Ddata)
                           }
                           })  
                       }
                       if(this.type == '1'){
                           if(this.valueData != undefined && this.valueData.data == null){
                               this.$nextTick(()=>{
                               if(this.$refs.my){
                                    this.myChart.setOption(Ddata)
                               }
                               })  
                           }
                       }
                    }else{
                             let minfixed = 0
                    let maxfixed = 100
                                     //动态数据
                      if(this.valueData == undefined){
                        return
                    }
                       if(this.valueData != undefined && this.valueData.data != undefined){
                           Ddata.series[0].data[0].value = this.valueData.data
                              Ddata.series[0].detail.formatter = Ddata.SeriesShowDetailMode===1?(Number( this.valueData.data)<Number(Ddata.Range.Min)?minfixed.toFixed(Ddata.fixed)+Ddata.Unit:(((Number( this.valueData.data)-Number(Ddata.Range.Min))/(Number(Ddata.Range.Max)-Number(Ddata.Range.Min)))*100).toFixed(Ddata.fixed))+Ddata.Unit:Number( this.valueData.data).toFixed(Ddata.fixed)+Ddata.Unit;
                              if(this.valueData.data=='???'){
             Ddata.series[0].detail.formatter  = this.valueData.data+ Ddata.Unit
            Ddata.series[0].data[0].value = 0
          }
                         var valueDataA
                           if(Number(this.valueData.data) == 0){
                              valueDataA = 0
                           }else{
                              valueDataA = (Number(this.valueData.data) - this.Min)>= (Ddata.series[0].max - this.Min)?(Ddata.series[0].max - this.Min):(Number(this.valueData.data) - this.Min)
                           }
                           if(Number(this.valueData.data) < this.Min){
                               valueDataA = this.Min
                           }
                      
                       }else{
                            Ddata.series[0].data[0].value = 0
                       }
                                     let color = ''
                       if(Ddata.ColorType == 'GradientMulticolor'){
                        if(Ddata.series[0].data[0].value>=(Number(Ddata.Range.Max)*((Number(Ddata.Range.NormalScale)+Ddata.Range.ExcessScale)/100))){
							color = Ddata.Range.WarnColor.HtmlColor
						}else if(Ddata.series[0].data[0].value>=(Number(Ddata.Range.Max)*((Number(Ddata.Range.NormalScale))/100))){
							color = Ddata.Range.ExcessColor.HtmlColor
						}else{
							color = Ddata.Range.NormalColor.HtmlColor
						}
                       }
                           if(color){
                            let colorarr2 = []
							Ddata.Range.NormalLinearColor.GradientStops.forEach((item)=>{
								colorarr2.push({
                                    offset:item.Offset,
                                    color:color
                                })
							})
                            let itemcolortry = {
						        color: {
						            type: 'linear',
						            x: Ddata.Range.NormalLinearStartPoint.split(',')[0],
						            y: Ddata.Range.NormalLinearStartPoint.split(',')[1],
						            x2: Ddata.Range.NormalLinearEndPoint.split(',')[0],
						            y2: Ddata.Range.NormalLinearEndPoint.split(',')[1],
						            colorStops: colorarr2,
						            global: false // 缺省为 false
						        }
						    }
                            Ddata.series[0].progress.itemStyle = itemcolortry
					}
                        if(this.drawLineShow){
                           this.$nextTick(()=>{
                           if(this.$refs.my){
                               this.myChart.clear()
                               this.myChart.setOption(Ddata)
                           }
                           })   
                       }
                       if(this.valueData != undefined && this.valueData.data != undefined){
                           this.$nextTick(()=>{
                           if(this.$refs.my){
                           
                                this.myChart.setOption(Ddata)
                           }
                           })  
                       }
                       if(this.type == '1'){
                           if(this.valueData != undefined && this.valueData.data == null){
                               this.$nextTick(()=>{
                               if(this.$refs.my){
                                    this.myChart.setOption(Ddata)
                               }
                               })  
                           }
                       }
                    }

                }
            },100)
        },
    // 绘制图表方法
    drawLine1(){
        if(this.optionData.IsRing){
           // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(this.$refs.my)
        let that = this
        // 绘制图表
        this.myChart.resize()
       	this.dataarr = []
		let colorarr2 = []
		if(this.optionData.ColorType1 !== "Multicolor"&&this.optionData.ColorType1 !== "GradientMulticolor"){
			this.optionData.Variable.Range1.NormalLinearColor.GradientStops.forEach((item)=>{
				colorarr2.push({
					offset:item.Offset,
					color:item.Color.HtmlColor
				})
			})
			let obj = {
				value: Number(this.optionData.Variable.Value)<Number(this.optionData.Variable.Range1.Min)?0:Number(this.optionData.Variable.Value)>Number(this.optionData.Variable.Range1.Max)?100:((Number(this.optionData.Variable.Value)-Number(this.optionData.Variable.Range1.Min))/(Number(this.optionData.Variable.Range1.Max)-Number(this.optionData.Variable.Range1.Min)))*100,
		      itemStyle: {
		        normal: {
		          color: new echarts.graphic.LinearGradient(1, 0, 0, 0,colorarr2)
		        }
		      },
		    }
		  this.dataarr.push(obj)
		}else{
			let color = ''
			if(Number(this.optionData.Variable.Value)>=(Number(this.optionData.Variable.Range1.Max)*((this.optionData.Variable.Range1.NormalScale+this.optionData.Variable.Range1.ExcessScale)/100))){
				color = this.optionData.Variable.Range1.WarnColor.HtmlColor
			}else if(Number(this.optionData.Variable.Value)>=(Number(this.optionData.Variable.Range1.Max)*((this.optionData.Variable.Range1.NormalScale)/100))){
				color = this.optionData.Variable.Range1.ExcessColor.HtmlColor
			}else{
				color = this.optionData.Variable.Range1.NormalColor.HtmlColor
			}
			this.optionData.Variable.Range1.NormalLinearColor.GradientStops.forEach((item)=>{
							colorarr2.push({
								offset:item.Offset,
								color:color
							})
						})
						let obj = 	{
						value: Number(this.optionData.Variable.Value)<Number(this.optionData.Variable.Range1.Min)?0:Number(this.optionData.Variable.Value)>Number(this.optionData.Variable.Range1.Max)?100:((Number(this.optionData.Variable.Value)-Number(this.optionData.Variable.Range1.Min))/(Number(this.optionData.Variable.Range1.Max)-Number(this.optionData.Variable.Range1.Min)))*100,
						  itemStyle: {
							normal: {
							  color: new echarts.graphic.LinearGradient(1, 0, 0, 0,colorarr2)
							}
						  },
						}
			this.dataarr.push(obj)
		}
        let bl = 1;
    if(this.item.width>this.item.height){
       bl = 170/this.item.height
    }else{
      bl = 170/this.item.width
    }
    let minfixed = 0;
    let maxfixed = 100;
  			let option =  {
            fixed:this.optionData.Variable.ValueDigit,
            SeriesShowDetailMode:this.optionData.Variable.Tooltip1.SeriesShowDetailMode,
						Range:this.optionData.Variable.Range1,
						IsRing:this.optionData.IsRing,
            Unit:this.optionData.Variable.Unit,					
            ColorType:this.optionData.ColorType1,
						backgroundColor:this.optionData.BackgroundColor1.HtmlColor,
					    title: [{
					    text: this.optionData.Variable.DimensionName,
					    textStyle: {
					      color: this.optionData.Variable.Color.HtmlColor,
					      fontSize: this.optionData.Variable.Show?this.optionData.Variable.FontSize:12,
                opacity:this.optionData.Variable.Show?1:0,
					      fontWeight:'normal',
					    },
					    Unit:this.optionData.Variable.Unit,
			  subtext:  this.optionData.Variable.Tooltip1.SeriesShowDetailMode===1?(Number(this.optionData.Variable.Value)<Number(this.optionData.Variable.Range1.Min)?minfixed.toFixed(this.optionData.Variable.ValueDigit):(((Number(this.optionData.Variable.Value)-Number(this.optionData.Variable.Range1.Min))/(Number(this.optionData.Variable.Range1.Max)-Number(this.optionData.Variable.Range1.Min)))*100).toFixed(this.optionData.Variable.ValueDigit))+ this.optionData.Variable.Unit:Number(this.optionData.Variable.Value).toFixed(this.optionData.Variable.ValueDigit)+this.optionData.Variable.Unit,
						
           subtextStyle: {
					     "fontSize":  this.optionData.Variable.Tooltip1.SeriesDetailFontSize,
					      opacity:this.optionData.Variable.Tooltip1.SeriesDetailShow?1:0,
						  color: !this.optionData.DetailColor1?this.optionData.DetailColor1:this.optionData.DetailColor1.HtmlColor,
					    },
					   left:'center',
					    top:this.optionData.Variable.Show?((Number(this.optionData.PositionOffset1)-(10*bl))+'%'):((Number(this.optionData.PositionOffset1)-(20*bl))+'%'),
					   
					  }],
					  angleAxis: {
					    max: 100, // 满分
					    clockwise: false, // 逆时针
					    // 隐藏刻度线
					    axisLine: {
					      show: false
					    },
					    axisTick: {
					      show: false
					    },
					    axisLabel: {
					      show: false
					    },
					    splitLine: {
					      show: false
					    }
					  },
					  radiusAxis: {
					    type: 'category',
					    // 隐藏刻度线
					    axisLine: {
					      show: false
					    },
					    axisTick: {
					      show: false
					    },
					    axisLabel: {
					      show: false
					    },
					    splitLine: {
					      show: false
					    }
					  },
					  polar: {
					    center: ['50%', this.optionData.PositionOffset1+'%'],
					    radius: this.optionData.DiscRadius1+'%' //图形大小
					  },
					  angleAxis:{
					    show:false,
					    startAngle:-90,
					  },
					  series: [
					    {
					    type: 'bar',
					    data: this.dataarr,
					    coordinateSystem: 'polar',
					    roundCap: true,
					    barWidth:this.optionData.LineWith1,
					    barGap: '-100%', // 两环重叠
					    z: 2,
					  },{ // 灰色环
					    type: 'bar',
					    data: [{
					      value: 100,
					      itemStyle: {
					        color: this.optionData.ThemeType=='Light'?'#EBEAEA':'#3C3851',
					        shadowColor: 'rgba(0, 0, 0, 0.2)',
					        shadowBlur: 5,
					        shadowOffsetY: 2
					      }
					    }],
					    coordinateSystem: 'polar',
					    roundCap: true,
					    barWidth: this.optionData.LineWith1,
					    barGap: '-100%', // 两环重叠
					    z: 1
					  },this.optionData.ShowRingBackground1?{ // 灰色环
					    type: 'bar',
					    data: [{
					      value: 100,
					      itemStyle: {
					        color: 'rgba(72,118,245,0.15)',
					        shadowColor: 'rgba(0, 0, 0, 0.2)',
					        shadowBlur: 5,
					        shadowOffsetY: 2
					      }
					    }],
					    coordinateSystem: 'polar',
					    roundCap: true,
					    barWidth: this.optionData.RingWith1,
					    barGap: '-100%', // 两环重叠
					    z: 0
					  }:{}
					
					]
					  
					}
            this.myChart.setOption(option,true)
        }else{
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(this.$refs.my)
        let that = this
        // 绘制图表
        this.myChart.resize()
        var newvalue = this.optionData.Variable.Tooltip.SeriesShowDetailMode===1?Number(this.optionData.Variable.Value)<Number(this.optionData.Variable.Range.Min)?0:Number(this.optionData.Variable.Value)>Number(this.optionData.Variable.Range.Max)?100:((Number(this.optionData.Variable.Value)-Number(this.optionData.Variable.Range.Min))/(Number(this.optionData.Variable.Range.Max)-Number(this.optionData.Variable.Range.Min)))*100:Number(this.optionData.Variable.Value)
        this.myChart.setOption(
            {
          SeriesShowDetailMode:this.optionData.Variable.Tooltip.SeriesShowDetailMode,
          fixed:this.optionData.Variable.ValueDigit,
          Range:this.optionData.Variable.Range,
          ColorType:this.optionData.ColorType,
           Unit:this.optionData.Variable.Unit,
         "animation": true,
          title:{
            text: this.Title,
            left: this.TitlePosition.toLowerCase(),
            show:this.TitleShow,
            textStyle:
                {
                     fontFamily:'宋体',
                    color: this.TitleFontColor,
                    fontSize: this.TitleFontSize,
                },
            padding:[12,10]
        },
        backgroundColor: this.BackGroundColor,
        tooltip: {
            formatter: this.ToolTipm,
            show:this.formatterShow,
        },
        
        series: [
           {
                name: '业务指标',
                type: 'gauge',
                  radius: this.optionData.DiscRadius+'%',
                center: ['50%', this.optionData.PositionOffset+'%'],
                min: this.Min,
                max: this.Max,
                 progress:{
                    show:this.optionData.ColorType == "Multicolor"?false:true,
                     width:this.optionData.LineWith,
                    itemStyle:this.itemcolortry
                    },
                pointer: {              // 仪表盘指针。
                   show: this.optionData.PointShow,          
                    length: "60%",         
                       width: Number(this.optionData.RingSize)*0.2,       
                },
                title:{
                    offsetCenter:['0','-30%'],
                    textStyle:{
                        color:this.titleColor,
                        "fontSize": 20
                    }
                },
                axisLabel:{
                 show:this.AxisLabelShow,
                 color: this.optionData.Variable.Range.ScaleColor.HtmlColor,
                 distance: 25,
                	formatter:function(v){
						if(!Number(that.SplitNumber)){
							 return v
						}else{
							if(((Number(that.Max)-Number(that.Min))/Number(that.SplitNumber)).toString().split(".").length>1){
							if(((Number(that.Max)-Number(that.Min))/Number(that.SplitNumber)).toString().split(".")[1].length>2){
								return v.toFixed(2)
							}else{
								return v
							}	
							}else{
								return v
							}
						
						}
					},
                 fontSize:this.AxisLabelFontSize
                },
                splitNumber:Number(this.SplitNumber),
                axisTick: {             // 刻度(线)样式。
                    show: (this.AxisLabelShow&&Number(this.SplitNumber)!==0)?true:false,          // 是否显示刻度(线),默认 true。
                    "distance": 0,
                    	"lineStyle": {
					"color": "#45476B",
                width:this.optionData.Variable.Range.ScaleWidth
			},
         show:this.optionData.Variable.Range.ScaleShow,
                     splitNumber: Number(this.AxisSplitNumber),
                },
             anchor: {
                    show: this.optionData.PointShow,
                showAbove: true,
                size: this.optionData.RingSize,
                itemStyle: {
                    borderWidth: 6,
                    borderColor:this.optionData.PointColor.HtmlColor
                }
                },
                     splitLine: {           // 分隔线
					length: this.optionData.Variable.Range.SplitSegmentsLength,         // 属性length控制线长
                     show:this.optionData.Variable.Range.SplitSegmentsShow,
                     "distance": 0,
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: '#45476B',
                        width:this.optionData.Variable.Range.SplitSegmentsWidth
					}
                },
                axisLine: {   
                    show: true,            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                       color:this.colorarr,
                              width:this.optionData.LineWith,
                        shadowColor : '#000', //默认透明
                        shadowBlur: 0,
                    }
                }, 
                itemStyle: {            // 仪表盘指针样式。
					color: "auto",         
                },
                "z":7,
                detail: {
                     color: !this.optionData.DetailColor?this.optionData.DetailColor:this.optionData.DetailColor.HtmlColor,
                    show:this.SeriesDetailShow,
                    offsetCenter:["0", "30%"],
                      formatter: Number(newvalue).toFixed(this.optionData.Variable.ValueDigit) + this.Unit,
                      textStyle:{
                        "fontSize": this.SeriesDetailFontSize,
                     }
                },
                 data: [{ value:Number(this.optionData.Variable.Value).toFixed(this.optionData.Variable.ValueDigit), name:this.optionData.Variable.Show?this.DimensionName:'',itemStyle:{color:this.optionData.PointColor.HtmlColor} }],
                 title:{
                    offsetCenter: [0,"-30%"],
                       color:this.titleColor,
                    fontSize:this.optionData.Variable.FontSize  
                 }
            },this.optionData.ShowRingBackground?{
                "axisLabel": {show:false},
                "splitNumber": 0,
                type: 'gauge',
               radius: this.optionData.DiscRadius+'%',
                center: ['50%', this.optionData.PositionOffset+'%'],
                datail:{show:false},
                axisLine:{
                    lineStyle:{
                 width:-1*Number(this.optionData.RingWith),
                        color: [
                            [1, 'rgba(72,118,245,0.15)']
                        ]
                    }
                },
                "splitLine": {
                    show:false,
                }
            }:{}

        ]
        }
      
        );
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

</style>