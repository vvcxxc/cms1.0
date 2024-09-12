//定义全局变量
var Chart1 = null;
var Chart2;
var Charttemple;
var subChardata = new Array();
var secondgraphobj;
var ChartDataSource;
var ChartCalResult;
var ChartDataItem;
var Language;
var option = {
	animation: false
};
function judgeDivisor(m, n) {
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
        }
 function end(max,min,n){
	 let length = 0
	 if(String(max).split('.').length>1){
		 length = String(max).split('.')[1].length
	 }
	 length+=String(n).length
	 if(judgeDivisor(math.format(max-min,{precision: 14}),n)){
				 return Number(Number(math.format(math.format(max-min,{precision: 14})/n),{precision: 14}).toFixed(length))
	 }else{
		  return Number((Number(math.format(math.format(max-min,{precision: 14})/n),{precision: 14})+(1/Math.pow(10,length))).toFixed(length))
	 }
 }
function gerarea(num,type,zf){
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
	         if(Number(math.format((endnum*zf-Number(math.format(endnum/breaknum,{precision: 14}))),{precision: 14}))*splitnum == 0){
				   return Number(math.format((endnum*zf-Number(math.format((endnum/breaknum/10),{precision: 14}))),{precision: 14}))*splitnum
			 }else{
				   return Number(math.format((endnum*zf-Number(math.format(endnum/breaknum,{precision: 14}))),{precision: 14}))*splitnum
			 }
		}else{
			console.log(math.format(endnum/breaknum,{precision: 14}))
			 return Number(math.format((endnum*zf+Number(math.format(endnum/breaknum,{precision: 14}))),{precision: 14}))*splitnum
		}
}
// console.log(gerarea(0.2,'min',-1))

 function colorRgba(sHex) {
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
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
            }
            return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
        } else {
            return sColor
        }
    }
var daiti =  {
  "name": "LineChart4",
  "option": {
    "NumericalPoint": 20,
    "ShowNumericalPoint": true,
    "RangeOpacity": 20.0,
    "ShowRangeFill": true,
    "IsSmooth": true,
    "ShowTootip": true,
    "AxisPointer": {
      "Trigger": "axis",
      "Type": "line",
      "Color": {
        "HtmlColor": "#999999ff"
      }
    },
    "Legend": {
      "Type": "plain",
      "ShowArray": null,
      "ItemHeight": 14,
      "ItemWidth": 14,
      "FontWeight": 400.0,
      "FontFamily": "Source Han Sans CN",
      "Show": true,
      "Position": "RightCenter",
      "Color": {
        "HtmlColor": "#fefefeff"
      },
      "FontSize": 12
    },
    "Title": {
      "Color": {
        "HtmlColor": "#fefefeff"
      },
      "FontSize": 16,
      "Position": "Center",
      "Show": true,
      "Title": "折线图"
    },
    "YAxises": [
      {
        "ShowSeparator": true,
        "Name": null,
        "Unit": null,
        "Min": null,
        "Max": null,
        "Adaptive": true,
        "CustomSegmentation": 0,
        "IsCustomSegmentation": false,
        "Color": {
          "HtmlColor": "#fefefeff"
        },
        "FontColor": {
          "HtmlColor": "#fefefeff"
        },
        "AxisColor": {
          "HtmlColor": "#fefefeff"
        },
        "FontWeight": null,
        "SplitLine": false,
        "FontFamily": "Source Han Sans TC",
        "SplitLineFontWeight": null,
        "SplitLineWidth": 1.0,
        "SplitLineColor": {
          "HtmlColor": "#fefefeff"
        },
        "SplitLineShow": false,
        "FontSize": 14
      },
      {
        "ShowSeparator": true,
        "Name": null,
        "Unit": null,
        "Min": 11.0,
        "Max": 1000.0,
        "Adaptive": false,
        "CustomSegmentation": 51,
        "IsCustomSegmentation": true,
        "Color": {
          "HtmlColor": "#d2d2d27e"
        },
        "FontColor": {
          "HtmlColor": "#d2d2d27e"
        },
        "AxisColor": {
          "HtmlColor": "#d2d2d27e"
        },
        "FontWeight": null,
        "SplitLine": false,
        "FontFamily": "Source Han Sans TC",
        "SplitLineFontWeight": null,
        "SplitLineWidth": 1.0,
        "SplitLineColor": {
          "HtmlColor": "#d2d2d27e"
        },
        "SplitLineShow": false,
        "FontSize": 14
      },
      {
        "ShowSeparator": true,
        "Name": null,
        "Unit": null,
        "Min": 100.0,
        "Max": 1000.0,
        "Adaptive": false,
        "CustomSegmentation": 5,
        "IsCustomSegmentation": false,
        "Color": {
          "HtmlColor": "#d2d2d27e"
        },
        "FontColor": {
          "HtmlColor": "#d2d2d27e"
        },
        "AxisColor": {
          "HtmlColor": "#d2d2d27e"
        },
        "FontWeight": null,
        "SplitLine": false,
        "FontFamily": "Source Han Sans TC",
        "SplitLineFontWeight": null,
        "SplitLineWidth": 1.0,
        "SplitLineColor": {
          "HtmlColor": "#d2d2d27e"
        },
        "SplitLineShow": false,
        "FontSize": 14
      }
    ],
    "Label": {
      "Color": {
        "HtmlColor": "#fefefeff"
      },
      "FontSize": 12,
      "Show": true
    },
    "AuxiliaryLines": [],
    "XAxis": {
      "CustomSegmentation": 0,
      "IsCustomSegmentation": false,
      "Color": {
        "HtmlColor": "#fefefeff"
      },
      "FontColor": {
        "HtmlColor": "#fefefeff"
      },
      "AxisColor": {
        "HtmlColor": "#fefefeff"
      },
      "FontWeight": "400",
      "SplitLine": false,
      "FontFamily": "Source Han Sans TC",
      "SplitLineFontWeight": null,
      "SplitLineWidth": 1.0,
      "SplitLineColor": {
        "HtmlColor": "#999999ff"
      },
      "SplitLineShow": false,
      "FontSize": 14
    },
    "DrawContent": {
      "LeftMargin": 55.0,
      "RightMargin": 200.0,
      "BottomMargin": 55.0,
      "TopMargin": 60.0
    },
    "Toolbox": {
      "FeatureShow": false,
      "FeatureDataZoomYAxisIndex": "none"
    },
    "Variables": [
      {
        "CurrentAxis": {
          "AxisType": "Y",
          "Value": 0
        },
        "Smooth": false,
        "DataType": "Line",
        "EndPoint": "0.5,1",
        "StartPoint": "0.5,0",
        "LinearBrush": {
          "GradientStops": []
        },
        "BrushTypes": 0,
        "Show": true,
        "Unit": null,
        "Color": {
          "HtmlColor": "#4150d8ff"
        },
        "VariableName": "a1",
        "DimensionName": "湿度"
      },
      {
        "CurrentAxis": {
          "AxisType": "Y",
          "Value": 0
        },
        "Smooth": false,
        "DataType": "Line",
        "EndPoint": "0.5,1",
        "StartPoint": "0.5,0",
        "LinearBrush": {
          "GradientStops": []
        },
        "BrushTypes": 0,
        "Show": true,
        "Unit": null,
        "Color": {
          "HtmlColor": "#38b88dff"
        },
        "VariableName": "a2",
        "DimensionName": "温度"
      },
      {
        "CurrentAxis": {
          "AxisType": "Y",
          "Value": 0
        },
        "Smooth": false,
        "DataType": "Line",
        "EndPoint": "0.5,1",
        "StartPoint": "0.5,0",
        "LinearBrush": {
          "GradientStops": []
        },
        "BrushTypes": 0,
        "Show": true,
        "Unit": null,
        "Color": {
          "HtmlColor": "#f6b37fff"
        },
        "VariableName": "a3",
        "DimensionName": "液位"
      }
    ],
    "ShowBackground": true,
    "ThemeType": "Dark",
    "SelectedLinearSchemeIndex": -1,
    "BackgroundColor": {
      "HtmlColor": "#100b2bff"
    },
    "name": "LineChart4",
    "YDataCollection": [
      {
        "name": "湿度",
        "YData": [
          "550",
          "167",
          "197",
          "541",
          "265"
        ]
      },
      {
        "name": "温度",
        "YData": [
          "560",
          "561",
          "236",
          "233",
          "256"
        ]
      },
      {
        "name": "液位",
        "YData": [
          "495",
          "217",
          "299",
          "476",
          "367"
        ]
      }
    ],
    "XData": [
      "2021-08-02",
      "2021-08-03",
      "2021-08-04",
      "2021-08-05",
      "2021-08-06"
    ],
    "Datas": {
      "NumericalPoint": 20,
      "ShowNumericalPoint": true,
      "RangeOpacity": 20.0,
      "ShowRangeFill": true,
      "IsSmooth": true,
      "ShowTootip": true,
      "AxisPointer": {
        "Trigger": "axis",
        "Type": "line",
        "Color": {
          "HtmlColor": "#999999ff"
        }
      },
      "Legend": {
        "Type": "plain",
        "ShowArray": null,
        "ItemHeight": 14,
        "ItemWidth": 14,
        "FontWeight": 400.0,
        "FontFamily": "Source Han Sans CN",
        "Show": true,
        "Position": "RightCenter",
        "Color": {
          "HtmlColor": "#fefefeff"
        },
        "FontSize": 12
      },
      "Title": {
        "Color": {
          "HtmlColor": "#fefefeff"
        },
        "FontSize": 16,
        "Position": "Center",
        "Show": true,
        "Title": "折线图"
      },
      "YAxises": [
        {
          "ShowSeparator": true,
          "Name": null,
          "Unit": null,
          "Min": null,
          "Max": null,
          "Adaptive": true,
          "CustomSegmentation": 0,
          "IsCustomSegmentation": false,
          "Color": {
            "HtmlColor": "#fefefeff"
          },
          "FontColor": {
            "HtmlColor": "#fefefeff"
          },
          "AxisColor": {
            "HtmlColor": "#fefefeff"
          },
          "FontWeight": null,
          "SplitLine": false,
          "FontFamily": "Source Han Sans TC",
          "SplitLineFontWeight": null,
          "SplitLineWidth": 1.0,
          "SplitLineColor": {
            "HtmlColor": "#fefefeff"
          },
          "SplitLineShow": false,
          "FontSize": 14
        },
        {
          "ShowSeparator": true,
          "Name": null,
          "Unit": null,
          "Min": 11.0,
          "Max": 1000.0,
          "Adaptive": false,
          "CustomSegmentation": 5,
          "IsCustomSegmentation": false,
          "Color": {
            "HtmlColor": "#d2d2d27e"
          },
          "FontColor": {
            "HtmlColor": "#d2d2d27e"
          },
          "AxisColor": {
            "HtmlColor": "#d2d2d27e"
          },
          "FontWeight": null,
          "SplitLine": false,
          "FontFamily": "Source Han Sans TC",
          "SplitLineFontWeight": null,
          "SplitLineWidth": 1.0,
          "SplitLineColor": {
            "HtmlColor": "#d2d2d27e"
          },
          "SplitLineShow": false,
          "FontSize": 14
        },
        {
          "ShowSeparator": true,
          "Name": null,
          "Unit": null,
          "Min": 100.0,
          "Max": 1000.0,
          "Adaptive": false,
          "CustomSegmentation": 5,
          "IsCustomSegmentation": false,
          "Color": {
            "HtmlColor": "#d2d2d27e"
          },
          "FontColor": {
            "HtmlColor": "#d2d2d27e"
          },
          "AxisColor": {
            "HtmlColor": "#d2d2d27e"
          },
          "FontWeight": null,
          "SplitLine": false,
          "FontFamily": "Source Han Sans TC",
          "SplitLineFontWeight": null,
          "SplitLineWidth": 1.0,
          "SplitLineColor": {
            "HtmlColor": "#d2d2d27e"
          },
          "SplitLineShow": false,
          "FontSize": 14
        }
      ],
      "Label": {
        "Color": {
          "HtmlColor": "#fefefeff"
        },
        "FontSize": 12,
        "Show": true
      },
      "AuxiliaryLines": [],
      "XAxis": {
        "CustomSegmentation": 0,
        "IsCustomSegmentation": false,
        "Color": {
          "HtmlColor": "#fefefeff"
        },
        "FontColor": {
          "HtmlColor": "#fefefeff"
        },
        "AxisColor": {
          "HtmlColor": "#fefefeff"
        },
        "FontWeight": "400",
        "SplitLine": false,
        "FontFamily": "Source Han Sans TC",
        "SplitLineFontWeight": null,
        "SplitLineWidth": 1.0,
        "SplitLineColor": {
          "HtmlColor": "#999999ff"
        },
        "SplitLineShow": false,
        "FontSize": 14
      },
      "DrawContent": {
        "LeftMargin": 55.0,
        "RightMargin": 200.0,
        "BottomMargin": 55.0,
        "TopMargin": 60.0
      },
      "Toolbox": {
        "FeatureShow": false,
        "FeatureDataZoomYAxisIndex": "none"
      },
      "Variables": [
        {
          "CurrentAxis": {
            "AxisType": "Y",
            "Value": 0
          },
          "Smooth": false,
          "DataType": "Line",
          "EndPoint": "0.5,1",
          "StartPoint": "0.5,0",
          "LinearBrush": {
            "GradientStops": []
          },
          "BrushTypes": 0,
          "Show": true,
          "Unit": null,
          "Color": {
            "HtmlColor": "#4150d8ff"
          },
          "VariableName": "a1",
          "DimensionName": "湿度"
        },
        {
          "CurrentAxis": {
            "AxisType": "Y",
            "Value": 0
          },
          "Smooth": false,
          "DataType": "Line",
          "EndPoint": "0.5,1",
          "StartPoint": "0.5,0",
          "LinearBrush": {
            "GradientStops": []
          },
          "BrushTypes": 0,
          "Show": true,
          "Unit": null,
          "Color": {
            "HtmlColor": "#38b88dff"
          },
          "VariableName": "a2",
          "DimensionName": "温度"
        },
        {
          "CurrentAxis": {
            "AxisType": "Y",
            "Value": 0
          },
          "Smooth": false,
          "DataType": "Line",
          "EndPoint": "0.5,1",
          "StartPoint": "0.5,0",
          "LinearBrush": {
            "GradientStops": []
          },
          "BrushTypes": 0,
          "Show": true,
          "Unit": null,
          "Color": {
            "HtmlColor": "#f6b37fff"
          },
          "VariableName": "a3",
          "DimensionName": "液位"
        }
      ],
      "ShowBackground": true,
      "ThemeType": "Dark",
      "SelectedLinearSchemeIndex": -1,
      "BackgroundColor": {
        "HtmlColor": "#100b2bff"
      },
      "name": "LineChart4",
      "YDataCollection": [
        {
          "name": "湿度",
          "YData": [
            "550",
            "167",
            "197",
            "541",
            "265"
          ]
        },
        {
          "name": "温度",
          "YData": [
            "560",
            "561",
            "236",
            "233",
            "256"
          ]
        },
        {
          "name": "液位",
          "YData": [
            "495",
            "217",
            "299",
            "476",
            "367"
          ]
        }
      ],
      "XData": [
        "2021-08-02",
        "2021-08-03",
        "2021-08-04",
        "2021-08-05",
        "2021-08-06"
      ]
    },
    "IsTime": true
  }
}
var allchartlist = []


var first = true
var firstData

// changeLineChart(JSON.stringify(daiti))
// 修改折线图
function changeLineChart(data1) {
	var isfi = false;

	// var data = data1.option
	console.log('data123',data1)
	console.log(JSON.parse(data1))
	var data
	if(first){
		firstData = JSON.parse(data1).option
		data = firstData
		isfi = true

		first = false
	}else{
		addOrModify(firstData,JSON.parse(data1).option)
		data = firstData
		isfi = false
 
	}

	var ShowTootip = data.ShowTootip
	var TooptipTrigger = data.AxisPointer.Trigger
	var TooptipType = data.AxisPointer.Type
	var TooptipColor = colorRgba(data.AxisPointer.Color.HtmlColor)
	var dataColor = colorRgba(data.Label.Color.HtmlColor)
	console.log('data==>88',data)

	var ItemHeight = data.Legend.ItemHeight
	var ItemWidth = data.Legend.ItemWidth
	var FontWeight = data.Legend.FontWeight
	var FontFamily = data.Legend.FontFamily
	var LengendShow = data.Legend.Show
	var LengenColor = colorRgba(data.Legend.Color.HtmlColor)
	var lengenPosition = data.Legend.Position
	var lengenFontSize = data.Legend.FontSize
	var LengenB
	var lengenT 
	var lengenL
    var LengenR
	var LPtb 
	var LPlr
	var LegendData = []
	var TooColorArr = []
	for(var j=0;j<data.Variables.length;j++){
		LegendData.push(data.Variables[j].DimensionName)
		if(data.Variables[j].Color){
			TooColorArr.push(data.Variables[j].Color.HtmlColor)
		}
		
	}
	
	if(lengenPosition == 'RightCenter'){
		LengenB = null
		lengenT = "center"
		lengenL = null
		LengenR ="right"
		LPtb = 10 
		LPlr = 30
	}
	if(lengenPosition == 'RightTop'){
		LengenB = null
		lengenT = "top"
		lengenL = null
		LengenR = 'left'
		LPtb =30 
		LPlr = 10
	}
	if(lengenPosition == 'RightBottom'){
		LengenB = "bottom"
		lengenT = null
		lengenL = null
		LengenR = 'left'
		LPtb = 10
		LPlr = 10
	}

  /* 添加新增滑块需求 */
  let sliderCheck = document.getElementById(`sliderCheckbox`)
  let sliderInput= document.getElementById(`sliderInput`)
  let sliderData =  document.getElementById(`sliderData`)
  sliderInput.value = data.DataZoom.DataNumber
  if(data.DataZoom?.Show) {
    sliderCheck.checked = true
    // sliderData.style.visibility = 'visible'
  } else {
    sliderCheck.checked = false
    // sliderData.style.visibility = 'hidden'
  }

	var Title = data.Title.Title
	var TitlePosition = data.Title.Position
	var TitleIsChecked = data.Title.Show
	var TitleFontColor = colorRgba(data.Title.Color.HtmlColor)
	var TitleFontSize =  data.Title.FontSize

	var gridLeft = data.DrawContent.LeftMargin
	var gridRight = data.DrawContent.RightMargin
	var gridBottom = data.DrawContent.BottomMargin
	var gridTop = data.DrawContent.TopMargin

	var labelShow = data.Label.Show
	var labelFontSize = data.Label.FontSize

	var toolboxShow = data.Toolbox == null ? false: data.Toolbox.FeatureShow

	var backgroundColor = colorRgba(data.BackgroundColor.HtmlColor)
	//x轴
    var XfontSize = data.XAxis.FontSize
	var Xcolor = colorRgba(data.XAxis.Color.HtmlColor)
	var XfontFamily =data.XAxis.FontFamily
	var XfontWeight =data.XAxis.FontWeight
	var XSplitLine = data.XAxis.SplitLine
	var XSplitLineFontWeight = data.XAxis.XSplitLineFontWeight
	var XSplitLineWidth = data.XAxis.SplitLineWidth
	var XSplitLineColor = colorRgba(data.XAxis.SplitLineColor.HtmlColor)
	var XSplitLineShow = data.XAxis.SplitLineColor.SplitLineShow
	
	var YAxisesArr = []
		//数据
	var seriesDatas = data.YDataCollection
    var Xdata = []
	var seData = []
  var seData1 = []
   if(seriesDatas != undefined){

	   Xdata =data.XData
	   var arr = []
	   for(var v2=0;v2<seriesDatas.length;v2++){
		
		   seriesDatas[v2].YData.forEach((item)=>{
		   				  seData1.push(item)
		   })
		   let value = {
		       data:Object.values(seriesDatas[v2].YData),
		       name:seriesDatas[v2].name
		   }
		   seData.push(value)
	   }
   }
   
	//y轴
	for(var v6=0;v6<data.YAxises.length;v6++){
	     console.log("data",Number(Number(Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length)))/data.YAxises[v6].CustomSegmentation).toFixed(2))
		console.log(seData1)
		let YAxisMax1 =data.YAxises[v6].Max
		let YAxisMin1 = data.YAxises[v6].Min
		let Adaptive = data.YAxises[v6].Adaptive
		let offsetNum 
		if(v6 != 0){
		    offsetNum = (v6 -1) * 50
		}else{
		    offsetNum = 0
		}
			if(data.YAxises[v6].Adaptive||YAxisMax1==null||YAxisMin1==null){
			YAxisMax1 = null
			YAxisMin1 = null
			Adaptive = true
		}else{
			let zf;
			zf = Math.min.apply(null,seData1)>=0?1:-1;
			console.log(Number(YAxisMin1))
			console.log(parseFloat(Math.min.apply(null,seData1)))
			if(Number(YAxisMin1)>parseFloat(Math.min.apply(null,seData1))){
				// YAxisMin1 = Math.ceil(parseFloat(Math.min.apply(null,seData1))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length)))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length))*zf
			YAxisMin1 = gerarea(parseFloat(Math.min.apply(null,seData1)),'min',zf)	
			}
			
			let zf1;
			zf1 = Math.max.apply(null,seData1)>=0?1:-1;
			if(Number(YAxisMax1)<parseFloat(Math.max.apply(null,seData1))){
					// YAxisMax1 = Math.ceil(parseFloat(Math.max.apply(null,seData1))/Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length)))*Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length))*zf1
			YAxisMax1 = gerarea(parseFloat(Math.max.apply(null,seData1)),'max',zf1)	
			}
		
			Adaptive = false
		}
		if(data.YAxises[v6].Adaptive&&data.YAxises[v6].IsCustomSegmentation){
			let zf;
			zf = Math.min.apply(null,seData1)>=0?1:-1;
				// YAxisMin1 = Math.ceil(parseFloat(Math.min.apply(null,seData1))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length)))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length))*zf
			YAxisMin1 = gerarea(parseFloat(Math.min.apply(null,seData1)),'min',zf)
			let zf1;
			zf1 = Math.max.apply(null,seData1)>=0?1:-1;
					// YAxisMax1 = Math.ceil(parseFloat(Math.max.apply(null,seData1))/Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length)))*Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length))*zf1
			YAxisMax1 = gerarea(parseFloat(Math.max.apply(null,seData1)),'max',zf1)		
			Adaptive = false
		}
		// console.log(parseFloat(Math.max.apply(null,seData1)).toString().length)
		var unit = data.YAxises[v6].Unit == null? '':data.YAxises[v6].Unit
		var value2 = {
			type:'value',
			name: data.YAxises[v6].Name,
			offset:offsetNum,
			axisLabel: {
				formatter: "{value} " + unit,
				color: data.YAxises[v6].Color.HtmlColor,
				fontFamily: data.YAxises[v6].FontFamily,
				fontWeight: 400,
				fontSize:data.YAxises[v6].FontSize,
				textStyle: {
				fontWeight: null
				}
			},
			label: {
				textStyle: {
				color: data.YAxises[v6].Color.HtmlColor
				}
			},
			min: YAxisMin1,
			splitNumber:!data.YAxises[v6].IsCustomSegmentation?0:data.YAxises[v6].CustomSegmentation,
			max:YAxisMax1,
			interval:!data.YAxises[v6].IsCustomSegmentation||Adaptive?null:end(Number(YAxisMax1),Number(YAxisMin1),data.YAxises[v6].CustomSegmentation),
			
			nameTextStyle: {
				fontSize: data.YAxises[v6].FontSize,
				color: data.YAxises[v6].Color.HtmlColor
			},
			axisLine: {
				show:true,
				lineStyle: {
				color: data.YAxises[v6].Color.HtmlColor
				}
			},
			splitLine: {
				"lineStyle": {
					  type:'dashed' ,
				     "color":data.ThemeType=="Dark"?"rgba(210,210,210,0.49)":"rgba(210,210,210,0.9)"
				},
				show: data.YAxises[v6].ShowSeparator
			}
		}
		YAxisesArr.push(value2)
	}

	//辅助线
	var AuxiliaryLinesData = data.AuxiliaryLines

	var markLineData = []

   if(AuxiliaryLinesData.length){
	   for(var v1=0;v1<AuxiliaryLinesData.length;v1++){
		   var value1 = {
				   yAxis:AuxiliaryLinesData[v1].Value,
				   Axis: {
				   AxisType: AuxiliaryLinesData[v1].Axis.AxisType,
				   Value: AuxiliaryLinesData[v1].Axis.Value
			   },
				   lineStyle:{
					   type:AuxiliaryLinesData[v1].Type,
					   color:AuxiliaryLinesData[v1].Color.HtmlColor
				   }
		   }
		   markLineData.push(value1)
   }
   }


    console.log(seData1)


		VariablesData = data.Variables
	//样式
	var seriesArr = []
	var indexArr = []

	for(let v=0;v<VariablesData.length;v++){
		var markLineData2 = []
		console.log('aa',VariablesData[v].CurrentAxis)

		if(VariablesData[v].CurrentAxis != null){
			var index1 = indexArr.indexOf(VariablesData[v].CurrentAxis.Value)
		}

		if(index1 == -1){
			for(var v5=0;v5<markLineData.length;v5++){
				if(VariablesData[v].CurrentAxis.Value == markLineData[v5].Axis.Value){
					indexArr.push(VariablesData[v].CurrentAxis.Value)
					markLineData2.push(markLineData[v5])
				}     
			}


		}
		var CurrentAxisValue = VariablesData[v].CurrentAxis==null?null:VariablesData[v].CurrentAxis.Value>(YAxisesArr.length - 1)?null:VariablesData[v].CurrentAxis.Value

		// YAxisesArr


		// console.log('seData555',VariablesData[v].Color.HtmlColor)
		let name11 = []
		 for(let a=0;a<seData.length;a++){
			name11.push(seData[a].name)
		 }
		 let index = name11.indexOf(VariablesData[v].DimensionName)
		 if(index != -1){
			 var data11 = seData[index].data
		 }

	
		var value = {
			"name": VariablesData[v].DimensionName,
			smooth:data.IsSmooth,
			areaStyle:data.ShowRangeFill?{
				  color:{
				                type: 'linear',
				                x: 0,
				                y: 0,
				                x2: 0,
				                y2: 1,
				                colorStops: [{
				                    offset: 0, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0,7),data.RangeOpacity) // 0% 处的颜色
				                }, {
				                    offset: 1, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0,7),0)// 100% 处的颜色
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
				                    offset: 0, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0,7),0) // 0% 处的颜色
				                }, {
				                    offset: 1, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0,7),0)// 100% 处的颜色
				                }],
				                global: false // 缺省为 false
				            }
			},
			symbolSize:data.NumericalPoint,
			showSymbol:data.ShowNumericalPoint,
			"data": data11,
			"type": VariablesData[v].DataType.toLowerCase(),
			
			"label": {
				"fontSize": labelFontSize,
				"show": labelShow,
				"color":dataColor,
			},
			 itemStyle: {
			                    color: VariablesData[v].Color.HtmlColor,
			                    shadowBlur: 50,
			                },
			"lineStyle": {
				"shadowColor":VariablesData[v].Color.HtmlColor,
				width:2,
			     shadowOffsetX: 0,
			    shadowOffsetY: 0,
			    opacity: 1,
			    shadowBlur: 8,
			    type: "solid"
			},
			
			"yAxisIndex": CurrentAxisValue,
				markLine:{
					symbol:'none',
					data:markLineData2
				}
		}
		if(VariablesData[v].DimensionName != null){
			seriesArr.push(value)
		}

	}


	
	


		Chart1 = echarts.init(document.getElementById('main'));
	if (isfi) {
		Chart1.on('legendselectchanged', function (obj) {
			var a = Chart1.getOption();
			console.log(a)
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
						if (seriesData[i].markLine != '' && seriesData[i]?.markLine?.data?.length) {
							show = true
							markLine = seriesData[i].markLine
							s = seriesData[i]
							console.log('dsa', s)
						} else {
							show = false

						}
					} else if (s.markLine==''||s.markLine.data.length == 0 ) {
						let x = seriesData.filter(x => x.name != obj.name && x.yAxisIndex == yIndex && x.markLine != '');
						if (x.length) {
							let m = x[0].markLine;
							s.markLine = m;
							x[0].markLine = '';
							Chart1.setOption(a, true);
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
								Chart1.setOption(a, true);
								console.log('www', markLine)
								return
							}
						}
					}
				}
			}
		})

	}

		var aa = {
		    animation: false,
		    "color":TooColorArr,
		    "tooltip": {
		        "show": ShowTootip,
		        "trigger": TooptipTrigger,
		        "axisPointer": {
		            "type": TooptipType,
		            "lineStyle": {
		                "color": TooptipColor
		            }
		        }
		    },
		    "toolbox": {
		        "show":toolboxShow,
		        "right":15,
		        "top":0,
		        "feature": {
					
		            "dataZoom": {
		                "yAxisIndex": 'none'
		            },
		            "restore": {},
				  
		        }
		    },
		    "yAxis": YAxisesArr,
		    "xAxis": {
		        "data": Xdata,
		        "axisLabel": {
		            "fontWeight": XfontWeight,
		            "fontFamily": XfontFamily,
		            "textStyle": {
		                "fontWeight": XfontWeight,
		            },
		            "fontSize": XfontSize,
		            "color": Xcolor
				},
				"axisLine": {
					show:true,
					"lineStyle": {
						"color": Xcolor
					}
				},
		        "splitLine": {
		            "lineStyle": {
						  type:'dashed' ,
		                  "color":data.ThemeType=="Dark"?"rgba(210,210,210,0.49)":"rgba(210,210,210,0.9)"
		            },
		            "show": XSplitLineShow
		        }
		    },
		    "series": seriesArr,
		    "legend": {
		        "data": LegendData,
		        "icon":"circle",
		        "itemHeight": ItemHeight,
		        "itemWidth": ItemWidth,
		        "textStyle": {
		            "fontWeight": FontWeight,
		            "fontFamily": FontFamily,
		            "color": LengenColor,
		            "fontSize":lengenFontSize
		        },
		        "show": LengendShow,
		        "left": lengenL,
		        "right": LengenR,
		        "top": lengenT,
		        "bottom": LengenB,
		        "padding": [LPtb,LPlr]
		    },
		    "backgroundColor": backgroundColor,
		    "title": {
		        "textStyle": {
		            "color": TitleFontColor,
		            "fontSize": TitleFontSize
		        },
		        "padding":[12,10],
		        "x": TitlePosition.toLowerCase(),
		        "show": TitleIsChecked,
		        "text": Title
		    },
		    "grid": {
		        "left": gridLeft,
		        "right": gridRight,
		        "bottom": gridBottom,
		        "top": gridTop
		    }
		}


    if(data.DataZoom?.Show) {
      aa.dataZoom = [
        {
          show: true,
          type: 'slider',
          realtime: true,
          height: 15,
          bottom: 10,
          // startValue: 0,
          // endValue: data.DataZoom.DataNumber,
          startValue: data.XData.length-data.DataZoom.DataNumber,
          endValue: data.XData.length-1,
          zoomLock: true
        }
      ]
    }
    

		console.log('ss',JSON.stringify(aa))
		Chart1.setOption(aa,true);
  console.log(YAxisesArr)

	//	if(allchartlist.length){
	//	    var option2 =allchartlist[0][0].getOption()
	//	}
    //try{
	//	   Chart1.setOption(aa,true);
	//    allchartlist.push([Chart1])
    //}catch{
    //   //Chart1.setOption(option2,true);
    //}

}

//替换不相同属性
//替换不相同属性
function addOrModify(target, source) {
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			const ele = source[key];
			var modify = false;
			if (target.hasOwnProperty(key)) {
				if (typeof(ele) != "object") {
					target[key] = ele;
					modify = true;
					console.log("modify to ->");
				}
			} else {
				target[key] = {};
			}
			if(Array.isArray(ele)){
			    target[key] = ele;
			}
			else if (typeof(ele) == "object") {
				addOrModify(target[key], source[key]);
			} else if (!modify) {
				target[key] = ele;
			}
		}
	}
}
function colorRgba(sHex,a) {
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
            //  处理六位的颜色值
            var sColorChange = []
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
            }
            return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
        } else {
            return sColor
        }
    }
jsObj.getChartData(function(e) {

})
