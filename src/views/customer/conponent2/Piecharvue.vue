<!--
 * @Description: 这是饼图子页面（组件）
 * @Date: 2019-12-13 17:10:06
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-25 16:41:27
 -->
<template>
    <div>
        <div 
        @dblclick="opendb(item)" 
        @contextmenu.prevent 
        @mousedown="downClick(item,$event)" 
        @mouseup="seupClick(item,$event)"
        :class="item.class" :style="'width:' + item.width + 'px; height:' + item.height + 'px; position:absolute; left:'
        + item.left + 'px; top:' + item.top + 'px; transform:rotate(' + item.rotate + 'deg); opacity:' + item.opacity
        + ';zIndex:'+ item.ZIndex" ref="PieChart21">
        </div>
        <div :class="item.class+'Pie'" :style="'width:' + item.width + 'px; height:' + item.height + 'px; position:absolute; left:'
        + item.left + 'px; top:' + item.top + 'px; transform:rotate(' + item.rotate + 'deg); opacity:' + item.opacity+ ';zIndex:'
        + (item.ZIndex -1)" ref="PieChart21Pie">
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
    name:'piech',
    data(){
        return{
            myChart:'',
            myChart2:'',
            optionData:'',
            Lableformatter:'',
            commerPopShow1:false,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:["data",'valueData1','drawLineShow','item','AllData','dataId'],
      watch:{
       data:{
         immediate:true,
         deep:true,
        handler(val){
          this.data = val
          this.seriesData = []
          this.init() 
        }
      },
       valueData1:{
          immediate:true,
          deep:true,
          handler(val){
            for(let i=0;i<val.length;i++){
              if(this.data.name == val[i].name){
                this.valueData = val[i]
              }
          }
            if(val){
              this.dynamicNumber()
            }
        }
      }
    },
     beforeDestroy(){
       if(this.myChart){
          this.$echarts.dispose(this.myChart)
           if(this.myChart2){
            this.$echarts.dispose(this.myChart2)
          }
      }
    },
    methods: {
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
        colorRgba(sHex) {
        // 十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
        /* 16进制颜色转为RGB格式 */
        var sColor = sHex.toLowerCase()
        var alpha = 0.3
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
      PiechartFun(e){
        var newStr=" ";
        var start,end;
        var name_len=e.name.length;
        var max_name=4; 
        var new_row = Math.ceil(name_len / max_name);
        if(name_len>max_name){
            for(var i=0;i<new_row;i++){
              var old='';
              start=i*max_name;  
              end=start+max_name;  
              if(i==new_row-1){  
                old=e.name.substring(start);
              }else{
                old=e.name.substring(start,end)+"\n";    
              }
                newStr+=old; //拼接字符串
            }
        }else{                  
            newStr=e.name; 
        }
        return newStr
      },
    
        init(){
          var $this = this
        //echart属性赋值
        this.optionData = JSON.parse(this.data.option)
        if(this.optionData.Label.ShowOutter == true){
          this.ShowOutter = true
        }else{
          this.ShowOutter = false
        }
        this.Title = this.optionData.Title.Title
        this.TitleFontColor = this.optionData.Title.Color.HtmlColor
        this.TitleFontSize = this.optionData.Title.FontSize
        this.TitlePosition = this.optionData.Title.Position
        this.TitleShow = this.optionData.Title.Show
        this.Unit = this.optionData.PieConfiguration.Unit==null?'':this.optionData.PieConfiguration.Unit
        this.BackGroundColor = this.optionData.BackgroundColor.HtmlColor
        this.PieLabelLineShow = this.optionData.PieLabelLine.Show
        if(this.ShowOutter){
           this.BackGroundColor2 = this.optionData.BackgroundColor.HtmlColor
        }else{
           this.BackGroundColor2 = ''
        }

        this.LabelformatterShow = false
         if(this.optionData.Label.ValueShow == true){ //数值
               this.Lableformatter = (e)=>{
                var newStr = this.PiechartFun(e)
                return  e.value + ' ' + this.Unit
                }  
              this.LabelformatterShow = true
          }
          if(this.optionData.Label.DimensionShow == true){  //维度
               this.Lableformatter = (e)=>{
               var newStr = this.PiechartFun(e)
               if(this.ShowOutter){
                 return newStr + ' ' + this.Unit
               }else{
                return ''
               }
              }  
              this.LabelformatterShow = true
          }
          if(this.optionData.Label.PercentageShow == true){  //百分比
              this.Lableformatter = (e)=>{
                var newStr = this.PiechartFun(e)
                if(this.ShowOutter){
                  return '' + e.percent + '%' + ' ' + this.Unit
                }else{
                  return  + e.percent + '% ' + this.Unit
                }
              }  
              this.LabelformatterShow = true
          }
          if(this.optionData.Label.ValueShow == true && this.optionData.Label.DimensionShow == true){  //数值+维度
               this.Lableformatter = (e)=>{
               var newStr = this.PiechartFun(e)
               if(this.ShowOutter){
                  return newStr +'\n' + e.value + ' ' + this.Unit
               }else{
                  return  e.value + ' ' + this.Unit
               }
              }  
              this.LabelformatterShow = true
          }
          if(this.optionData.Label.ValueShow == true && this.optionData.Label.PercentageShow == true){  //数值+百分比
                this.Lableformatter = (e)=>{
                var newStr = this.PiechartFun(e)
                if(this.ShowOutter){
                  return  e.value + '\n'+ '' + e.percent + '%' + ' ' + this.Unit
                }else{
                  return  e.value + '\n' + e.percent + '%' + ' ' + this.Unit
                }
              }  
              this.LabelformatterShow = true
          }
           if(this.optionData.Label.DimensionShow == true && this.optionData.Label.PercentageShow == true){ //维度+百分比
              this.Lableformatter = (e)=>{
                var newStr = this.PiechartFun(e)
                if(this.ShowOutter){
                  return newStr +'\n'+ '' +  e.percent + '%' + ' ' + this.Unit
                }else{
                  return   e.percent + '%' + ' ' + this.Unit
                }
              }  
              this.LabelformatterShow = true
          }
           if(this.optionData.Label.DimensionShow == true && this.optionData.Label.PercentageShow == true && this.optionData.Label.ValueShow == true){
               this.Lableformatter = (e)=>{
                  var newStr = this.PiechartFun(e)
                  if(this.ShowOutter){
                    return newStr +'\n' + e.value + '\n' + '' + e.percent + '%' + ' ' + this.Unit
                  }else{
                    return e.value + '\n' + '' + e.percent + '%' + ' ' + this.Unit
                  }
              }  
              this.LabelformatterShow = true
          }
         if(this.optionData.Label.DimensionShow == false && this.optionData.Label.PercentageShow == false && this.optionData.Label.ValueShow == false){
              this.Lableformatter = ''
              this.LabelformatterShow = true
          }
        

          this.LabelFontSize = this.optionData.Label.FontSize
          this.TooltipformatterShow = false
         if(this.optionData.Label.ValueShow == true){  //数值
              this.Tooltipformatter = '{c}' 
              this.TooltipformatterShow = true
          }
          if(this.optionData.Label.DimensionShow == true){  //维度
            if(this.ShowOutter){
              this.Tooltipformatter = function (params) {
                        if(params.name){
                            return params.name
                        }
                        }
            }else{
              this.Tooltipformatter = function (params) {
                        if(params.name){
                            return params.name
                        }
                        }
              this.Tooltipformatter2 = ''
            }
              this.TooltipformatterShow = true
          }
          if(this.optionData.Label.PercentageShow == true){  //百分比
              this.Tooltipformatter = '{d}%'
              this.TooltipformatterShow = true
          }
          if(this.optionData.Label.ValueShow == true && this.optionData.Label.DimensionShow == true){  //数值+维度
            if(this.ShowOutter==true){
              this.Tooltipformatter = function (params) {
                     if(params.name){
                         return params.name+':'+params.value
                     }
                     }
            }else{
              this.Tooltipformatter = function (params) {
                     if(params.name){
                         return params.name+':'+params.value
                     }
                     }
              this.Tooltipformatter2 = '{c}'
            }
              this.TooltipformatterShow = true
          }
          if(this.optionData.Label.ValueShow == true && this.optionData.Label.PercentageShow == true){  //数值+百分比
              this.Tooltipformatter = '{c} \n ({d}%)'
              this.TooltipformatterShow = true
          }
           if(this.optionData.Label.DimensionShow == true && this.optionData.Label.PercentageShow == true){  //维度+ 百分比
            if(this.ShowOutter){
              this.Tooltipformatter =  function (params) {
                       if(params.name){
                           return params.name+':'+"("+params.percent+'%)'
                       }
                       }
            }else{
              this.Tooltipformatter =  function (params) {
                       if(params.name){
                           return params.name+':'+"("+params.percent+'%)'
                       }
                       }
              this.Tooltipformatter = '({d}%)'
            }
              this.TooltipformatterShow = true
          }
           if(this.optionData.Label.DimensionShow == true && this.optionData.Label.PercentageShow == true && this.optionData.Label.ValueShow == true){
              if(this.ShowOutter==true){
                this.Tooltipformatter = function (params) {
                        if(params.name){
                            return params.name+':'+params.value+"("+params.percent+'%)'
                        }
                        }
              }else{
                this.Tooltipformatter = function (params) {
                        if(params.name){
                            return params.name+':'+params.value+"("+params.percent+'%)'
                        }
                        }
                this.Tooltipformatter2 = '{c} ({d}%)'
              }
              this.TooltipformatterShow = true
          }
            if(this.optionData.Label.DimensionShow == false){  //在外显示没维度隐藏线
                    if(this.ShowOutter == false){
                        this.PieLabelLineShow = false
                    }
                }
                if(this.optionData.Label.DimensionShow == false && this.optionData.Label.PercentageShow == false && this.optionData.Label.ValueShow == false){ //在内显示没维度隐藏线
                    if(this.ShowOutter == true){
                        this.PieLabelLineShow = false
                    }
                }
            this.ItemHeight = this.optionData.Legend.ItemHeight
            this.ItemWidth = this.optionData.Legend.ItemWidth
            this.FontWeight = this.optionData.Legend.FontWeight
            this.FontFamily = this.optionData.Legend.FontFamily
            this.LengendShow = this.optionData.Legend.Show
            this.LengenColor = this.optionData.Legend.Color.HtmlColor
            this.lengenPosition = this.optionData.Legend.Position
            this.lengenFontSize = this.optionData.Legend.FontSize
            this.LegendData = []
            this.legendColor = []
            this.IsUseVariables2 = this.optionData.IsUseVariables2
            this.VariablesData2
          if(this.IsUseVariables2 == true){
            this.VariablesData2 = this.optionData.Variables2
            }else{
              this.VariablesData2 = this.optionData.Variables
          }
            for(var j=0;j<this.VariablesData2.length;j++){
              this.LegendData.push(this.VariablesData2[j].DimensionName)
              this.legendColor.push(this.VariablesData2[j].Color.HtmlColor)
            }
            if(this.lengenPosition == 'RightCenter'){
                this.LengenB = null
                this.lengenT = "center"
                this.lengenL = null
                this.LengenR ="right"
                this.LPtb = 10 
                this.LPlr = 30
            }
            if(this.lengenPosition == 'TopCenter'){
                this.LengenB = null
                this.lengenT = "top"
                this.lengenL = 'center'
                this.LengenR = null
                    this.LPtb =30 
                this.LPlr = 10
            }
            if(this.lengenPosition == 'BottomCenter'){
                this.LengenB = "bottom"
                this.lengenT = null
                this.lengenL = 'center'
                this.LengenR = null
                this.LPtb = 10
                this.LPlr = 10
            }
          this.PieLabelLine1 = this.optionData.PieLabelLine.Length
          this.PieLabelLine2 = this.optionData.PieLabelLine.Length2
          this.InRadius = this.optionData.PieConfiguration.InRadius
          this.OutRadius = this.optionData.PieConfiguration.OutRadius
          this.OutRadius2 = parseInt(this.optionData.PieConfiguration.OutRadius) + 5 + '%'
          this.VariablesData 
          if(this.IsUseVariables2 == true){
            this.VariablesData = this.optionData.Variables2
            }else{
              this.VariablesData = this.optionData.Variables
          }
          this.seriesArr = []
           this.seriesArr1 = []
          this.seriesArr2 = []
          for(let v=0;v<this.VariablesData.length;v++){
            let colorarr = []
            let colorarr1 = []
             this.VariablesData[v].LinearBrush.GradientStops.forEach((item)=>{
						colorarr.push({
							offset:item.Offset,
							color:item.Color.HtmlColor
						})
            colorarr1.push({
              offset:item.Offset,
            color:this.colorRgba(item.Color.HtmlColor.slice(0,7))
				})
					})
					let itemcolortry
           let itemcolortry1
					if( this.VariablesData[v].BrushTypes){
						itemcolortry =  {
              shadowColor: "rgba(85,85,85,0.2)",
            shadowBlur: 2,
            shadowOffsetX: 2,
            color: {
              type: 'linear',
            x:   this.VariablesData[v].StartPoint.split(',')[0],
            y:   this.VariablesData[v].StartPoint.split(',')[1],
            x2:   this.VariablesData[v].EndPoint.split(',')[0],
            y2:   this.VariablesData[v].EndPoint.split(',')[1],
            colorStops:colorarr,
            global: false // 缺省为 false
						}
            }
            itemcolortry1 =  {
              shadowColor: "rgba(85,85,85,0.2)",
            shadowBlur: 2,
            shadowOffsetX: 2,
            color: {
              type: 'linear',
            x:   this.VariablesData[v].StartPoint.split(',')[0],
            y:   this.VariablesData[v].StartPoint.split(',')[1],
            x2:   this.VariablesData[v].EndPoint.split(',')[0],
            y2:   this.VariablesData[v].EndPoint.split(',')[1],
            colorStops:colorarr1,
            global: false // 缺省为 false
						}
            }
					}else{
						itemcolortry =  {
              shadowColor: "rgba(85,85,85,0.2)",
            shadowBlur: 2,
            shadowOffsetX: 2,
            color:  this.VariablesData[v].Color.HtmlColor
            }
             itemcolortry1 =  {
              shadowColor: "rgba(85,85,85,0.2)",
            shadowBlur: 2,
            shadowOffsetX: 2,
            color:  this.colorRgba(this.VariablesData[v].Color.HtmlColor.slice(0,7))
            }
					}
              var value = {
                 "value": this.VariablesData[v].Value ? this.VariablesData[v].Value: 0,
                // value:90,
                 "name":this.VariablesData[v].DimensionName,
                 "label": {
                   "normal": {
                     "fontSize": this.LabelFontSize,
                     "formatter": this.Lableformatter,
                       color:!this.optionData.Label.ShowOutter?'#000':this.VariablesData[v].BrushTypes?colorarr[colorarr.length-1].color:this.legendColor[v]
                  },
               
                },
                   itemStyle:itemcolortry
              }
              this.seriesArr.push(value)
               var value1 = {
                 "value": $this.VariablesData[v].Value ? $this.VariablesData[v].Value : 0,
                 "name":this.VariablesData[v].DimensionName,
                 "label": {
                   "normal": {
                     show:false,
                     "fontSize": this.LabelFontSize,
                     "formatter": this.Lableformatter
                  }
                },
                  itemStyle:itemcolortry1
              }
              this.seriesArr1.push(value1)
              
              var value2 = {
                "value": this.VariablesData[v].Value ? this.VariablesData[v].Value : 0,
                // value:90,
                name:this.VariablesData[v].DimensionName,
                label:{
                    "normal":{
                        "show": this.optionData.Label.DimensionShow,
                        "textStyle":{
                          "fontSize": this.LabelFontSize,
                            color:this.VariablesData[v].BrushTypes?colorarr[colorarr.length-1].color:this.legendColor[v]
                        }
                    }
                },
                labelLine:{
                  "normal":{
                      width:1,
                      lineStyle:{
                          width:1,
                          color:itemcolortry.color
                      }
                  }
              }
            }
            console.log("this.VariablesData[v].BrushTypes",this.VariablesData[v].BrushTypes)
            console.log(colorarr)
            console.log(this.legendColor[v])
            this.seriesArr2.push(value2)
          }

           this.isInner
           if(this.ShowOutter == true){
                    this.isInner= {
                        normal:''
                    }
            } else{
                this.isInner = {            //饼图图形上的文本标签
                    normal:{
                        show:true,
                        color:'#000',
                        position:'inner', //标签的位置
                        textStyle : {
                            fontWeight : 500 ,
                            fontSize : 16    //文字的字体大小
                        },
                        formatter:this.Tooltipformatter2
                    }
                }
            }
             
          this.$nextTick(()=>{
              if(this.$refs.PieChart21){
                  this.drawLine1();
              }
          }) 
        },
        //刷数
        dynamicNumber(){
          setTimeout(()=>{
            if(this.myChart){
              var Ddata = this.myChart.getOption()
              var Ddata2 = ''
              if(this.myChart2){
                  Ddata2 = this.myChart2.getOption()
              }
              // console.log(JSON.parse(JSON.stringify(Ddata2)))
              //动态数据
             let namearr = []
             for(let b=0;b<Ddata.series[0].data.length;b++){
               namearr.push(Ddata.series[0].data[b].name)
             } 
              if(this.valueData == undefined){
                  return
              }
              // console.log("his.valueData.YDataCollection",this.valueData.YDataCollection)
           
             if(this.valueData.YDataCollection != undefined){
                if(this.valueData.YDataCollection.length ==0){
                      for(let w1=0;w1<Ddata.series[0].data.length;w1++){
                             Ddata.series[0].data[w1].value =  0
                              Ddata2.series[0].data[w1].value =  0
                         }
                 }
               for(let a=0;a<this.valueData.YDataCollection.length;a++){
                 var index = namearr.indexOf(this.valueData.YDataCollection[a].name)
                 Ddata.series[0].data[index].label.formatter = this.valueData.YDataCollection[a].YData[0]==='???'?'???':this.Lableformatter
                  // this.valueData.YDataCollection[a].YData[0] =  this.valueData.YDataCollection[a].YData[0]==='???'?0:this.valueData.YDataCollection[a].YData[0]
                if(index != -1){
                   Ddata.series[0].label = this.isInner
                  //  Ddata.series[0].data[index].label.formatter = this.Lableformatter
                  //  Ddata.series[0].data[index].value = Number(this.valueData.YDataCollection[a].YData[0])
                  Ddata.series[0].data[index].value =this.valueData.YDataCollection[a].YData[0]==='???'?0:this.valueData.YDataCollection[a].YData[0]
                   if(Ddata2.length != 0){
                    //  console.log("adsdasdasdas",Number(this.valueData.YDataCollection[a].YData[0]))
                      // Ddata2.series[0].data[index].value = Number(this.valueData.YDataCollection[a].YData[0])//向内饼图数据
                      Ddata2.series[0].data[index].value =this.valueData.YDataCollection[a].YData[0]==='???'?0:this.valueData.YDataCollection[a].YData[0]
                   }
 
                 }
               } 
             }else{
               for(let w=0;w<Ddata.series[0].data.length;w++){
                 Ddata.series[0].data[w].value =  0
                   Ddata2.series[0].data[w].value =  0
               }
             }
          if( Ddata.series.length>1){
            for (let w = 0; w < Ddata.series[0].data.length; w++) {
              try{
                 Ddata.series[1].data[w].value = JSON.parse(JSON.stringify(Ddata.series[0].data[w].value))
              }catch{
                console.log('Ddata.series[1]不存在')
              }
            }
						
					}
              //历史
              if(this.drawLineShow){
                  this.$nextTick(()=>{
                    if(this.$refs.PieChart21 &&this.myChart ){
                        this.myChart.clear()
                        this.myChart.setOption(Ddata,true)
                        if(this.myChart2.length != 0){
                          this.myChart2.clear()
                          this.myChart2.setOption(Ddata2,true)
                        }
                    }
                  })  
              }
              //正常
              if(this.valueData.YDataCollection != undefined){
                  this.$nextTick(()=>{
                    if(this.$refs.PieChart21){
                        this.myChart.setOption(Ddata,true)
                        if(this.myChart2.length != 0){
                          this.myChart2.setOption(Ddata2,true)
                        }
                    }
                  })  
              }
 
            }
          },100)
        },

        // 绘制图表方法
    drawLine1(){
        // 基于准备好的dom，初始化echarts实例
      this.$nextTick(()=>{
        this.myChart = this.$echarts.init(this.$refs.PieChart21)
        this.myChart.resize()
        this.myChart.clear()
         console.log(this.seriesArr)
         // 绘制图表
         this.myChart.setOption(
           {
             "animation": false,
             "color": this.legendColor,
             "legend": {
               "data": this.LegendData,
               "itemHeight":this.ItemHeight,
               "itemWidth":this.ItemWidth,
                formatter:function(params) {
                 let tip1 = "";
                 let tip = "";
                 let le = params.length  //图例文本的长度
                 if(le > 4){   //几个字换行大于几就可以了
                   let l = Math.ceil(le/4)  //有些不能整除，会有余数，向上取整
                   for(let i = 1;i <= l;i++){ //循环
                     if(i < l){ //最后一段字符不能有\n
                       tip1 += params.slice(i*4-4,i*4)+'\n'; //字符串拼接
                     }else if(i === l){  //最后一段字符不一定够6个
                       tip = tip1 + params.slice((l-1)*4,le) //最后的拼接在最后
                     }
                   }
                   return tip;
                 }else{
                   tip = params  //前面定义了tip为空，这里要重新赋值，不然会替换为空
                   return tip;
                 }
               },
               "textStyle": {
                 "fontWeight": this.FontWeight,
                 "fontFamily": this.FontFamily,
                 "color": this.LengenColor,
                 "fontSize": this.lengenFontSize
               },
               "show": this.LengendShow,
               "left": this.lengenL,
               "right": this.LengenR,
               "top": this.lengenT,
               "bottom": this.LengenB,
               "padding": [this.LPtb,this.LPlr]
             },
             "series": [{
               "type": "pie",
               "radius": [this.InRadius,this.OutRadius],
               "center": ["50%","50%"],
               "itemStyle": {
                 "normal": {
                   "shadowBlur": 18,
                   "shadowColor": "rgba(127,128,128,0.2)",
                   "shadowOffsetX": 0,
                   "shadowOffsetY": 4
                 }
               },
               "selectedMode": "single",
                "data":this.seriesArr,
                label:this.isInner,
               "labelLine": {
                 "show": this.PieLabelLineShow,
                 "length": this.PieLabelLine1,
                 "length2": this.PieLabelLine2
               },
              
             },this.optionData.IsShowCircularBackground?{ "radius": [this.InRadius,(parseFloat(this.OutRadius)+5)+'%'],
              "center": ["50%","50%"],type: 'pie',
               zlevel:-1,
              hoverAnimation:false,
					"labelLine": {
							"show": false,
						},
            data: this.seriesArr1}:{}],
             
             "tooltip": {
               "formatter": this.Tooltipformatter,
               "show":this.TooltipformatterShow
             },
             "backgroundColor": this.BackGroundColor2,
             "title": {
               "textStyle": {
                 "color": this.TitleFontColor,
                 "fontSize": this.TitleFontSize
               },
               padding:[12,10],
               "x": this.TitlePosition.toLowerCase(),
               "show": this.TitleShow,
               "text": this.Title
             }
           }
         );
            

         if(this.ShowOutter == false){
            this.myChart2 = this.$echarts.init(this.$refs.PieChart21Pie)
            this.myChart2.resize()
            this.myChart2.clear()

              this.myChart2.setOption({
                "backgroundColor": this.BackGroundColor,
                legend:{
                  "data": this.LegendData,
                  show:false
                },
                series: [
                  {
                    name: '访问来源',
                    type: 'pie',
                    "radius": [this.InRadius,this.OutRadius2],
                    "center": ["50%","50%"],
                    selectedMode: 'single',
                    color:['transparent'],
                    seriesLayoutBy: 'row',
                 
                    data: this.seriesArr2,
                    "labelLine": {
                      "show": this.PieLabelLineShow,
                      "length": this.PieLabelLine1,
                      "length2": this.PieLabelLine2
                      },
                  }
                ]
              })
              this.myChart.on('legendselectchanged',  (obj)=> {
                var option2 = this.myChart2.getOption()
                option2.legend[0].selected = obj.selected
                this.myChart2.setOption(option2)
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