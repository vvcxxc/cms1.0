//定义全局变量
var PID;
var Chart1;
var Chart2;
var Chart3;

// 保存initheadchart添加的两个参数
var ProductId
var ProcessId

//section1 c#调用的js方法
function initheadchart(headdata)
{
    var headdataobj = JSON.parse(headdata);

    if(headdataobj!=null)
    {
        //PID = headdataobj.PID
        $("#Process").val(headdataobj.Process);
        $("#MachineNo").val(headdataobj.MachineNo);
        $("#MoldCavityNo").val(headdataobj.MoldCavityNo);
        $("#LSL").val(headdataobj.LSL);
        $("#LocationNo").val(headdataobj.LocationNo);
        $("#ControlPlan").val(headdataobj.ControlPlan);
        $("#Characteristic").val(headdataobj.Characteristic);
        $("#LineNo").val(headdataobj.LineNo);
        $("#SampleSize").val(headdataobj.SampleSize);
        $("#USL").val(headdataobj.USL);
        $("#GageNo").val(headdataobj.GageNo);
        $("#MSAResults").val(headdataobj.MSAResults);  
        ProductId = headdataobj.ProductId
        ProcessId = headdataobj.ProcessId                
    }
}

//var ddss = '[{ "id": "78ce4a8b-61ae-4ebf-873c-01dddc5a9770", "num": "1", "val": "0", "datetime": "2018-12-14T13:15:13.8146", "day": "12/14", "time": "13:15" }, { "id": "78ce4a8b-61ae-4ebf-873c-01dddc5a9770", "num": "2", "val": "0.02", "datetime": "2018-12-14T13:15:52.5386", "day": "12/14", "time": "13:15" }, { "id": "78ce4a8b-61ae-4ebf-873c-01dddc5a9770", "num": "3", "val": "0.12", "datetime": "2018-12-14T13:16:12.2906", "day": "12/14", "time": "13:16" }, { "id": "78ce4a8b-61ae-4ebf-873c-01dddc5a9770", "num": "4", "val": "0.18", "datetime": "2018-12-14T13:16:26.6856", "day": "12/14", "time": "13:16" }, { "id": "78ce4a8b-61ae-4ebf-873c-01dddc5a9770", "num": "5", "val": "1.05", "datetime": "2018-12-14T13:16:30.4076", "day": "12/14", "time": "13:16" }, { "id": "78ce4a8b-61ae-4ebf-873c-01dddc5a9770", "num": "6", "val": "0", "datetime": "2018-12-17T09:33:57.3968007", "day": "12/17", "time": "9:33" }, { "id": "78ce4a8b-61ae-4ebf-873c-01dddc5a9770", "num": "7", "val": "2.55", "datetime": "2018-12-17T09:34:53.4368007", "day": "12/17", "time": "9:34" }]';
//initmiddlechart(ddss);
function initmiddlechart(middledata) {
    var middledataobj = JSON.parse(middledata);
    var tableId = document.getElementById("table2");
   
    //清空数据
    for (var j = 1; j < 31; j++) {
        tableId.rows[1].cells[j].innerHTML = "";
        tableId.rows[2].cells[j].innerHTML = "";
        tableId.rows[3].cells[j].innerHTML = "";
        tableId.rows[5].cells[j].innerHTML = "";
        tableId.rows[6].cells[j].innerHTML = "";
        tableId.rows[7].cells[j].innerHTML = "";
        tableId.rows[9].cells[j].innerHTML = "";
        tableId.rows[10].cells[j].innerHTML = "";
        tableId.rows[11].cells[j].innerHTML = "";   
    }


    //给列表赋值
    var coum;
    if (middledataobj.length >= 30) {
        coum = 31;
    }
    else
    {
        coum = middledataobj.length+1;
    }
    for (var j = 1; j < coum; j++) {
        tableId.rows[1].cells[j].innerHTML = middledataobj[j-1].day;
        tableId.rows[2].cells[j].innerHTML = middledataobj[j - 1].time;
        if (middledataobj[j - 1].val.split(".").length > 1)
        {
            tableId.rows[3].cells[j].innerHTML = parseFloat(middledataobj[j - 1].val);
        }
        else
        {
            tableId.rows[3].cells[j].innerHTML = parseFloat(middledataobj[j - 1].val);
        }
        
        if ((j + 29) < middledataobj.length) {
            tableId.rows[5].cells[j].innerHTML = middledataobj[j + 29].day;
            tableId.rows[6].cells[j].innerHTML = middledataobj[j + 29].time;
            if (middledataobj[j + 29].val.split(".").length > 1) {
                tableId.rows[7].cells[j].innerHTML = parseFloat(middledataobj[j + 29].val);
            }
            else
            {
                tableId.rows[7].cells[j].innerHTML = middledataobj[j + 29].val;
            }
            
        }
        if ((j + 59) < middledataobj.length) {
            tableId.rows[9].cells[j].innerHTML = middledataobj[j + 59].day;
            tableId.rows[10].cells[j].innerHTML = middledataobj[j + 59].time;
            if (middledataobj[j + 59].val.split(".").length > 1) {
                tableId.rows[11].cells[j].innerHTML = parseFloat(middledataobj[j + 59].val);
            }
            else {
                tableId.rows[11].cells[j].innerHTML = middledataobj[j + 59].val;
            }

        }
    }
  

    //获取x轴数据：
    var xdata = new Array();
    for (var i = 1; i < 81; i++) {
        xdata.push(i);
    }
    var ydata = new Array();
    for (var m = 0; m < middledataobj.length; m++)
    {
        ydata.push(middledataobj[m].val);
    }
    var usl=parseFloat($("#USL").val());
    var lsl = parseFloat($("#LSL").val());

    //用数据初始化或者更新图表
    intchart(Chart1, "main", "电流", xdata, ydata, usl, lsl);
}
 
function intpid(spid)
{
   
    PID = spid;
    
 
}


function getxr(xxrr)
{  
    var xx = xxrr.split("_")[0];
    var rr = xxrr.split("_")[1];
    document.getElementById("xx").innerHTML = xx;
    document.getElementById("rr").innerHTML = rr;
}

function clearmiddlechart() {
    var tableId = document.getElementById("table2");
    for (var j = 1; j < 31; j++) {
        tableId.rows[1].cells[j].innerHTML = "";
        tableId.rows[2].cells[j].innerHTML = "";
        tableId.rows[3].cells[j].innerHTML = "";
        tableId.rows[5].cells[j].innerHTML = "";
        tableId.rows[6].cells[j].innerHTML = "";
        tableId.rows[7].cells[j].innerHTML = "";
        tableId.rows[9].cells[j].innerHTML = "";
        tableId.rows[10].cells[j].innerHTML = "";
        tableId.rows[11].cells[j].innerHTML = "";
    }
    if (Chart1 != null)
    {
        Chart1.clear();
    }

    document.getElementById("xx").innerHTML = "";
    document.getElementById("rr").innerHTML = "";
   
}

//section2 js调用的c#方法
function SendHeadChartValue(id, text) {
   
    jsObj.sendHeadChartValue(ProductId, ProcessId, PID, id, text);
}

//section3 document 加载时需要绑定的时间
function BangHeadEvent()
{
    var headtableinput=$("#table input");

    //绑定响应回车事件
    headtableinput.keyup(function (event) {
        //获取当前按下键盘的键值
        var keycode = event.which;
        //处理回车的情况
        if (keycode == 13) {                       
            var inputtext = $(this).val();
            var inputid = $(this).attr('id');
            SendHeadChartValue(inputid,inputtext)
        }
    });

    //处理文本框失去焦点的事件
    headtableinput.blur(function () {                
        var inputtext = $(this).val();
        var inputid = $(this).attr('id');
        SendHeadChartValue(inputid,inputtext)
    })
}

//section4初始化echart方法
function intchart(tableobj,tableid,title,xarray,yarray,USL,LSL)
{
    if (tableobj == null)
    {
        tableobj = echarts.init(document.getElementById(tableid));
    }
    option = {
        //title:
        //    {
        //        text: "温度曲线",
        //        left: "center",
        //        textStyle: {
        //            fonySize: 16,
        //            color:"#333333",
        //            backgroundColor: "#e8e8e8"
        //    }
        //    },
        grid: {
            x: 35,
            y: 55,
            x2: 35,
            y2: 50,
            borderWidth: 1
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    //yAxisIndex: 'none'
                },
                restore: {},
            }
        },
        dataZoom: [{        
            type: 'inside'
        }],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
            },
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xarray
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            name: 'Data 数值'
        }],
        series: [{
            name: 'Data 数值',
            type: 'line',
            data: yarray,
            //data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
            markLine: {
                data: [
                    {
                        type: 'average',
                        name: '平均值'
                    },
                    {
                        name: 'USL',
                        yAxis: USL,
                    },
                    {
                        name: 'LSL',
                        yAxis: LSL,
                    }
                ]
            }
        }]
    };
    tableobj.setOption(option);
    //var option = tableobj.getOption();
    //option.series[0].data = yarray;
    //tableobj.setOption(option);
}

//section5 及时执行代码
BangHeadEvent();

var xA = new Array();
for (var i = 1; i < 81; i++) {
    xA.push(i);
}
option = {
    //title:
    //        {
    //            text: "温度曲线",
    //            left: "center",
    //            //backgroundColor: "#e8e8e8",
    //            textStyle: {
    //                fonySize: 16,
    //                color: "#333333",                   
    //            }
    //        },
    grid: {
        x: 45,
        y: 55,
        x2: 35,
        y2: 50,
        borderWidth: 1
    },
    toolbox: {
        left: 'center',
        feature: {
            dataZoom: {
                //yAxisIndex: 'none'
            },
            restore: {},
        }
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: xA
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        },
        name: 'Data 数值'
    }],
    series: [{
        name: 'Data 数值',
        type: 'line',
    }]
};

Chart1 = echarts.init(document.getElementById('main'));
Chart1.setOption(option);


//c#按钮调用该js方法OpenChart
function OpenChart(id) {
    alert("DDDD");
    alert(id);
    alert("sss");
    alert(id[0]);
    alert("ddd");
    alert(id[0].val);
    //getData();
    alert(jsObj.name);
    //sayChart();
}
function getData() {
    //js 通过c#注册对象调用c#方法getChartData 有返回值
    //jsObj.getChartData('temp').then(data=> {
    //    alert(data[0]);
    //});
    jsObj.getChartData(function (e) {
        alert(e);
        alert(e.num);
    })
}



////动态设置列表
//$(document).ready(function () {
//    trEdit();
//});

////编辑函数
//function trEdit() {
//    var numTd = $("tbody td");
//    //绑定单击事件
//    numTd.click(function () {
//        var tdObj = $(this);
//        if (tdObj.children("input").length > 0) {
//            return false;
//        }
//        var text = tdObj.html();
//        tdObj.html("");
//        var inputObj = $("<input type='text'>").css({ "border": "0", "width": "100%", "height": "35px", "font-size": "12px", "text-align": "center" })
//            .width(tdObj.width())
//            .height(tdObj.height())
//            .css("background-color", tdObj.css("background-color"))
//            .val(text).appendTo(tdObj);

//        //是文本框插入之后就被选中
//        inputObj.trigger("focus").trigger("select");
//        inputObj.click(function () {
//            return false;
//        });

//        //处理文本框上回车和esc按键的操作
//        inputObj.keyup(function (event) {
//            //获取当前按下键盘的键值
//            var keycode = event.which;
//            //处理回车的情况
//            if (keycode == 13) {
//                var inputtext = $(this).val();
//                tdObj.html(inputtext);
//                $(this).remove();
//            }
//            //处理esc的情况
//            if (keycode == 27) {
//                tdObj.html(text);
//                $(this).remove();
//            }
//        });

//        //处理文本框失去焦点的事件
//        inputObj.blur(function () {
//            var inputtext = $(this).val();
//            tdObj.html(inputtext);
//            $(this).remove();
//        })


//    });


//    //绑定失去焦点的事件
//    numTd.blur(function () {
//        var tdObj = $(this);
//        if (tdObj.children("input").length > 0) {
//            var inputtext = tdObj.children[0].val();
//            tdObj.html(inputtext);
//            tdObj.children.remove();
//        }
//    })
//}

//option = {
//    title: {
//        text: 'X-R控制图',
//        subtext: '温度检测',
//        left: "center"
//    },
//    tooltip: {
//        trigger: 'axis'
//    },
//    legend: {
//        data: ['USL', 'LSL']
//    },
//    toolbox: {
//        show: true,
//        feature: {
//            mark: {
//                show: true
//            },
//            dataView: {
//                show: true,
//                readOnly: false
//            },
//            magicType: {
//                show: true,
//                type: ['line', 'bar']
//            },
//            restore: {
//                show: true
//            },
//            saveAsImage: {
//                show: true
//            }
//        }
//    },
//    calculable: true,
//    xAxis: [{
//        type: 'category',
//        boundaryGap: false,
//        data: xA
//    }],
//    yAxis: [{
//        type: 'value',
//        axisLabel: {
//            formatter: '{value} °C'
//        },
//        name: '温度极值'
//    }],
//    series: [{
//        name: '检测温度',
//        type: 'line',
//        data: yA,
//        markPoint: {
//            data: [{
//                type: 'max',
//                name: '最大值'
//            },
//            {
//                type: 'min',
//                name: '最小值'
//            }]
//        },
//        markLine: {
//            //itemStyle: {
//            //    normal: {
//            //        lineStyle: { type: 'solid', color: '#000' },
//            //        label: { show: true, position: 'right' }
//            //    }
//            //},
//            data: [
//                {
//                    type: 'average',
//                    name: '平均值'
//                },
//                {
//                    name: 'USL',
//                    yAxis: USL,
//                    label: {
//                        normal: {
//                            formatter: 'USL=' + USL           // 这儿设置安全基线
//                        }
//                    },

//                },
//            {
//                name: 'LSL',
//                yAxis: LSL,
//                label: {
//                    normal: {
//                        formatter: 'LSL=' + LSL           // 这儿设置安全基线
//                    }
//                },
//            },
//            {
//                name: 'UCLR',
//                yAxis: UCLR,
//                label: {
//                    normal: {
//                        formatter: 'UCLR=' + UCLR           // 这儿设置安全基线
//                    }
//                },
//            },
//            {
//                name: 'LCLR',
//                yAxis: LCLR,
//                label: {
//                    normal: {
//                        formatter: 'LCLR=' + LCLR           // 这儿设置安全基线
//                    }
//                },
//            }
//            ]
//        }
//    }]
//};

//var yA = [0.85, 0.86, 0.87, 0.75, 0.79,
//         0.87, 0.96, 0.77, 0.87, 0.85,
//         0.86, 0.83, 0.82, 0.81, 0.89,
//          0.77, 0.86, 0.71, 0.84, 0.85,
//         0.87, 0.84, 0.82, 0.71, 0.99]

//var UCLR = 0.9;
//var LCLR = 0.7;

//var USL = 0.95;
//var LSL = 0.6;
//Chart2 = echarts.init(document.getElementById('chart'));
//Chart2.setOption(option);
//Chart3 = echarts.init(document.getElementById('main1'));
//Chart3.setOption(option);


//initmiddlechart('[{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"1","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"2","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"3","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"4","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"5","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"6","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"7","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"8","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"9","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"10","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"11","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"12","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"13","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"14","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"15","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"16","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"17","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"18","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"19","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"20","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"21","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"22","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"23","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"24","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"25","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"26","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"27","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"28","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"29","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"30","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"31","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"32","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"33","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"34","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"35","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"36","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"37","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"38","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"39","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"40","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"41","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"42","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"43","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"44","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"45","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"46","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"47","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"48","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"49","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"50","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"51","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"52","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"53","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"54","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"55","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"56","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"57","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"58","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"59","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"60","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"61","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"62","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"63","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"64","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"65","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"66","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"67","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"68","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"69","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"70","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"71","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"72","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"73","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"74","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"75","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"76","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"77","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"78","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"79","val":"0","datetime":"2018-11-27T15:48:58.6978427","day":"11/27","time":"15:48"},{"id":"6e97759a-74da-4cc8-91e0-6753e0e91f52","num":"80","val":"0","datetime":"2018-11-27T15:54:50.4604992","day":"11/27","time":"15:54"}]');
