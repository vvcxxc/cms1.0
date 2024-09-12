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

//初始化语言类
var ZHObj ={
    chartitle: "设备报警统计",
    templechartitle: "设备报警统计模板",
    subcharttitle: "设备报警类型统计",
    tablecell0:"设备",
    tablecell1:"数量",
    tablecell2:"百分比",
    tablecell3: "累计百分比",
    subtablecell0: "报警类型",
    
    data1: "数据1",
    data2: "数据2",
    data3: "数据3",
}


var JYArray=function(value,num,pl)
{
    this.value = value;
    this.num = num;
    this.pl = pl;
}

var PID;



//section1 c#调用的js方法
var ddddssss = '[{"SericeId":null,"Name":"1","Con":"12","Per":"0.462","SumPer":"0.462","Children":[{"SericeId":null,"Name":"总是报警","Con":"8","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"2","Con":"10","Per":"0.385","SumPer":"0.847","Children":[{"SericeId":null,"Name":"总是报警","Con":"10","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"3","Con":"2","Per":"0.077","SumPer":"0.924","Children":[{"SericeId":null,"Name":"总是报警","Con":"2","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"4","Con":"1","Per":"0.038","SumPer":"0.962","Children":[{"SericeId":null,"Name":"总是报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"其他","Con":"1","Per":"0.038","SumPer":"1","Children":[{"SericeId":null,"Name":"总是报警","Con":"1","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"伺服报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"天天报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"无法报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null},{"SericeId":null,"Name":"从不报警","Con":"0","Per":null,"SumPer":null,"Children":null,"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}],"GongYiAlarm":null,"SheBeiAlarm":null,"XiTongAlarm":null}]';
intgraph(ddddssss);
function intgraph(secondgraphdata)
{
    if (Language == "English")
    {
        secondgraphdata=secondgraphdata.replace(/其他/g, "other");
    }
    console.log(secondgraphdata);
    document.getElementById("main3").style.display = "none";
    //document.getElementById("tabletemple").style.display = "none";
    document.getElementById("main").style.display = "block";
    secondgraphobj = JSON.parse(secondgraphdata);


        Chart1 = echarts.init(document.getElementById('main'));
    
    
    var dataAxis = new Array();
    var databar = new Array();
    var dataline = new Array();
    for (var i = 0; i < secondgraphobj.length; i++) {
        dataAxis.push(secondgraphobj[i].Name);       
        databar.push((parseInt(parseFloat(secondgraphobj[i].Per) * 100)).toFixed(1));
        dataline.push((parseInt(parseFloat(secondgraphobj[i].SumPer) * 100)).toFixed(1));
    }
    var yMax = 100;
    var dataShadow = [];

    for (var i = 0; i < databar.length; i++) {
        dataShadow.push(yMax);
    }

    option = {
        title: {
            text: ZHObj.chartitle,
            textStyle:{
                color:'#0DB9F2',        //颜色
                fontStyle:'normal',     //风格
                fontWeight:'normal',    //粗细
                fontFamily:'Microsoft yahei',   //字体
                fontSize:14,     //大小
                align:'center'   //水平对齐
            },
            left: 'center'
        },
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: false,
                textStyle: {
                    color: '#0DB9F2'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.05)' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ]
                        )
                    }
                },
                data: databar
            },
            {
            type: 'line',
             data: dataline
            }
        ]
    };

    Chart1.setOption(option);
    // Enable data zoom when user click bar.
    var zoomSize = 6;
    Chart1.on('click', function (params) {
        document.getElementById("main1").style.display = "block";
        document.getElementById("main").style.display = "none";
        console.log(params.name);
        for (var j = 0; j < secondgraphobj.length; j++) {
            if (params.name == secondgraphobj[j].Name) {

                //第二张表为空时创建
                subChardata = new Array();
                    var dataAxis1 = new Array();
                    var databar1 = new Array();
                    var dataline1 = new Array();

                    var sum = 0;
                    var sumper1 = 0;
                    for (var jj = 0; jj < secondgraphobj[j].Children.length; jj++)
                    {
                        sum = sum+parseFloat(secondgraphobj[j].Children[jj].Con);
                    }
                    //对子项进行统计
                    for (var i = 0; i < secondgraphobj[j].Children.length; i++) {
                        if (parseFloat(secondgraphobj[j].Children[i].Con) > 0) {
                            dataAxis1.push(secondgraphobj[j].Children[i].Name);
                            var per1 = (parseFloat(secondgraphobj[j].Children[i].Con) / sum) * 100;
                            var sumper1 = sumper1 + per1;
                            databar1.push(per1);
                            dataline1.push(sumper1);
                            subChardata.push([secondgraphobj[j].Children[i].Name, parseFloat(secondgraphobj[j].Children[i].Con), per1.toFixed(1), sumper1.toFixed(1)]);
                        }
                    }
                 
                    var yMax = 100;
                    var dataShadow = [
                    ];

                    for (var i = 0; i < databar.length; i++) {
                        dataShadow.push(yMax);
                    }

                    var option1 = {
                        title: {
                            text: ZHObj.subcharttitle,
                            textStyle: {
                                color: '#0DB9F2',        //颜色
                                fontStyle: 'normal',     //风格
                                fontWeight: 'normal',    //粗细
                                fontFamily: 'Microsoft yahei',   //字体
                                fontSize: 14,     //大小
                                align: 'center'   //水平对齐
                            },
                            left: 'center'
                        },
                        xAxis: {
                            data: dataAxis1,
                            axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: '#0DB9F2'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            z: 10
                        },
                        yAxis: {
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside'
                            }
                        ],
                        series: [
                            { // For shadow
                                type: 'bar',
                                itemStyle: {
                                    normal: { color: 'rgba(0,0,0,0.05)' }
                                },
                                barGap: '-100%',
                                barCategoryGap: '40%',
                                data: dataShadow,
                                animation: false
                            },
                            {
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                { offset: 0, color: '#83bff6' },
                                                { offset: 0.5, color: '#188df0' },
                                                { offset: 1, color: '#188df0' }
                                            ]
                                        )
                                    },
                                    emphasis: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                { offset: 0, color: '#2378f7' },
                                                { offset: 0.7, color: '#2378f7' },
                                                { offset: 1, color: '#83bff6' }
                                            ]
                                        )
                                    }
                                },
                                data: databar1
                            },
                            {
                                type: 'line',
                                data: dataline1
                            }
                        ]
                    }

                    if (Chart2 == null) {
                        //初始化子图
                    Chart2 = echarts.init(document.getElementById('main1'));        
                    Chart2.setOption(option1);
                        //初始化子表
                    document.getElementById("tabledata").style.display = "none";                   
                    initgraphsubchart(subChardata, "subtabledata");
                        //隐藏c#端的控件
                    SendHeadChartValue()
                }
                else
                {
                        Chart2.setOption(option1);
                        //初始化子表
                        document.getElementById("tabledata").style.display = "none";
                        $("#subtabledata").remove();
                        initgraphsubchart(subChardata, "subtabledata");
                        document.getElementById("subtabledata").style.display = "table";
                        document.getElementById("subtabledata").style.width = "1820px";
                        document.getElementById("subtabledata").style.height = "400px";
                        //隐藏c#端的控件
                        SendHeadChartValue();
                }
            }
        }
            
                    
        
        //Chart1.dispatchAction({
        //    type: 'dataZoom',
        //    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        //    endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        //});
    });

    initgraphchart(secondgraphobj, "tabledata");

   
    //var option = tableobj.getOption();
    //option.series[0].data = yarray;
    //tableobj.setOption(option);
}

//初始化上一级
//initgraphchart(secondgraphobj, "tabledata");
function initgraphchart(obj, ids) {
    var arrname = new Array();
    arrname.push(ZHObj.tablecell0);
    for (var i = 0; i < obj.length; i++) {
        var j = i + 1;
        arrname.push(obj[i].Name);
    }


    if (document.getElementById(ids) != null)
    {
        document.body.removeChild(document.getElementById(ids));
    }
   

    var table = document.createElement('table');
    table.id = ids;
    //创建tr,td项
    var tr = document.createElement('tr');
    //创建文档片段
    for (var i = 0; i < arrname.length; i++) {
        var td = document.createElement('th');
        td.innerHTML = arrname[i];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    document.body.appendChild(table);

    //tabel赋样式
    table.style.width = "1820px";
    table.style.height = "400px";
    table.style.border = "1pt solid #000000";
    //for (var i = 0; i < json.length; i++) {
    //    var newRow = table.insertRow();
    //    var newcellname = newRow.insertCell(0);
    //    newcellname.innerHTML = json[i].name;
    //    var newcellname = newRow.insertCell(1);
    //    newcellname.innerHTML = json[i].age;
    //    var newcellname = newRow.insertCell(2);
    //    newcellname.innerHTML = json[i].sal
    //}
    
    //插入第一行
    var newRow = table.insertRow();
    var newcellname = newRow.insertCell(0);
    newcellname.innerHTML = ZHObj.tablecell1;
    newcellname.style.backgroundColor = "#c7d5e8";
    for(var j = 1; j < obj.length+1; j++)
    {
        var newcellname = newRow.insertCell(j);
        newcellname.innerHTML = obj[j-1].Con;
    }
    var newRow = table.insertRow();
    var newcellname = newRow.insertCell(0);
    newcellname.innerHTML = ZHObj.tablecell2;
    newcellname.style.backgroundColor = "#c7d5e8";
    for(var j = 1; j < obj.length+1; j++)
    {
        var newcellname = newRow.insertCell(j);
        newcellname.innerHTML = (parseFloat(obj[j-1].Per)*100).toFixed(1);
    }
    var newRow = table.insertRow();
    var newcellname = newRow.insertCell(0);
    newcellname.innerHTML = ZHObj.tablecell3;
    newcellname.style.backgroundColor = "#c7d5e8";
    for(var j = 1; j < obj.length+1; j++)
    {
        var newcellname = newRow.insertCell(j);
        newcellname.innerHTML = (parseFloat(obj[j - 1].SumPer) * 100).toFixed(1);
    }
}

//初始化子级表哥
function initgraphsubchart(obj, ids) {
    if (document.getElementById("tabledata") != null) {
        document.getElementById("tabledata").style.display == "none";
    }
    var arrname = new Array();
    arrname.push(ZHObj.subtablecell0);
    for (var i = 0; i < obj.length; i++) {
        var j = i + 1;
        arrname.push(obj[i][0]);
    }
    //document.body.removeChild(document.getElementById(ids));
    var table = document.createElement('table');
    table.id = ids;
    //创建tr,td项
    var tr = document.createElement('tr');
    //创建文档片段
    for (var i = 0; i < arrname.length; i++) {
        var td = document.createElement('th');
        td.innerHTML = arrname[i];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    document.body.appendChild(table);

    //tabel赋样式
    table.style.width = "1820px";
    table.style.height = "400px";
    table.style.border = "1pt solid #000000";
    //for (var i = 0; i < json.length; i++) {
    //    var newRow = table.insertRow();
    //    var newcellname = newRow.insertCell(0);
    //    newcellname.innerHTML = json[i].name;
    //    var newcellname = newRow.insertCell(1);
    //    newcellname.innerHTML = json[i].age;
    //    var newcellname = newRow.insertCell(2);
    //    newcellname.innerHTML = json[i].sal
    //}

    //插入第一行
    var newRow = table.insertRow();
    var newcellname = newRow.insertCell(0);
    newcellname.innerHTML = ZHObj.tablecell1;
    newcellname.style.backgroundColor = "#c7d5e8";
    for (var j = 1; j < obj.length + 1; j++) {
        var newcellname = newRow.insertCell(j);
        newcellname.innerHTML = obj[j - 1][1]
    }
    var newRow = table.insertRow();
    var newcellname = newRow.insertCell(0);
    newcellname.innerHTML = ZHObj.tablecell2;
    newcellname.style.backgroundColor = "#c7d5e8";
    for (var j = 1; j < obj.length + 1; j++) {
        var newcellname = newRow.insertCell(j);
        newcellname.innerHTML = parseFloat(obj[j-1][2]);
    }
    var newRow = table.insertRow();
    var newcellname = newRow.insertCell(0);
    newcellname.innerHTML = ZHObj.tablecell3;
    newcellname.style.backgroundColor = "#c7d5e8";
    for (var j = 1; j < obj.length + 1; j++) {
        var newcellname = newRow.insertCell(j);
        newcellname.innerHTML = parseFloat(obj[j - 1][3]);
    }
}

//响应返回按钮
function back()
{  
    document.getElementById("main1").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("subtabledata").style.display = "none";
    document.getElementById("tabledata").style.display = "table";
    document.getElementById("tabledata").style.width = "1820px";
    document.getElementById("tabledata").style.height = "400px";
}






//section2 js调用的c#方法
function SendHeadChartValue() {
    jsObj.sendHeadChartValue();
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
function intchart()
{
    
}


//section5 及时执行代码

//按钮绑定事件
//多语言切换方法
function changeLanguage(lantype) {
    if (lantype == "English") {
        $($($("#tabledata").find("tr")[0]).find("th")[0]).text("Equipment");
        $($($("#tabledata").find("tr")[1]).find("td")[0]).text("Quanty");
        $($($("#tabledata").find("tr")[2]).find("td")[0]).text("Percentage");
        $($($("#tabledata").find("tr")[3]).find("td")[0]).text("Accumulated percentage");

        $($($("#subtabledata").find("tr")[0]).find("th")[0]).text("Alarm type");
        $($($("#subtabledata").find("tr")[1]).find("td")[0]).text("Quanty");
        $($($("#subtabledata").find("tr")[2]).find("td")[0]).text("Percentage");
        $($($("#subtabledata").find("tr")[3]).find("td")[0]).text("Accumulated percentage");


        ZHObj.chartitle = "Equipment alarm statistics"
        ZHObj.subcharttitle = "Equipment alarm type statistics"
        ZHObj.templechartitle = "Pareto Chart of Stator";
        ZHObj.tablecell0 = "Equipment";
        ZHObj.tablecell1 = "Quanty";
        ZHObj.tablecell2 = "Percentage"
        ZHObj.tablecell3 = "Accumulated percentage";
        ZHObj.subtablecell0 = "Alarm type";
        ZHObj.data1 = "data1";
        ZHObj.data2 = "data2";
        ZHObj.data3 = "data3";

        var option = Chart1.getOption();
        option.title[0].text = "Equipment alarm statistics";
        Chart1.setOption(option);
    }
    else {
        $($($("#tabledata").find("tr")[0]).find("th")[0]).text("设备");
        $($($("#tabledata").find("tr")[1]).find("td")[0]).text("数量");
        $($($("#tabledata").find("tr")[2]).find("td")[0]).text("百分比");
        $($($("#tabledata").find("tr")[3]).find("td")[0]).text("累计百分比");

        $($($("#subtabledata").find("tr")[0]).find("th")[0]).text("报警类型");
        $($($("#subtabledata").find("tr")[1]).find("td")[0]).text("数量");
        $($($("#subtabledata").find("tr")[2]).find("td")[0]).text("百分比");
        $($($("#subtabledata").find("tr")[3]).find("td")[0]).text("累计百分比");


        ZHObj.chartitle = "设备报警统计";
        ZHObj.templechartitle = "设备报警统计模板";
        ZHObj.subcharttitle = "设备报警类型统计";
        ZHObj.tablecell0 = "设备";
        ZHObj.tablecell1 = "数量";
        ZHObj.tablecell2 = "百分比";
        ZHObj.tablecell3 = "累计百分比";
        ZHObj.subtablecell0 = "报警类型";
        ZHObj.data1 = "数据1";
        ZHObj.data2 = "数据2";
        ZHObj.data3 = "数据3";


        var option = Chart1.getOption();
        option.title[0].text = "设备报警统计";
        Chart1.setOption(option);

    }


}



//section 6 控制无报警显示
function disorhide()
{

    if(document.getElementById("main").style.display=="block")
    {
        document.getElementById("main").style.display = "none";
    }
    if (document.getElementById("tabledata").style.display == "table"||"block") {
        document.getElementById("tabledata").style.display = "none";
    }

}
export{
    intgraph,
    
}
