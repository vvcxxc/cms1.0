//定义全局变量
var ChartDataSource;
var ChartCalResult;
var ChartDataItem;

var JYArray=function(value,num,pl)
{
    this.value = value;
    this.num = num;
    this.pl = pl;
}

var PID;
var Chart1;
var Chart2;

//section1 c#调用的js方法

//获取检测箱基本信息
//var fffgggfff = '{"number":"1","item":{"PrId":"d5eacbd7-0933-4a9d-8485-7421741905a6","PrNumber":"2018-12-03 15:33:25","PrName":"3636","PrMethod":"自动","PrType":"XR","PrSampleNumber":"5","PrUpLimit":"6","PrgoalValue":"1","PrDownLimit":"0","PrRule":"R0","UpdateUser":null,"UpdateTime":null,"PrVariableId":"00000000-0000-0000-0000-000000000000","PrVariableName":"MD324","PrWorkshopId":"780eefe6-d672-4a1d-8faf-3f7689acba15","PrLineId":"f278dcdd-5855-45b3-8dad-666946697b77"}}';
//intpid(fffgggfff);
function intpid(spid)
{
    //alert(spid);
    ChartDataItem = JSON.parse(spid);
}

//获取所有的计算结果
//var rrsssfff = '{"b_samplenumber":"100","b_mean":"0.060","b_max":"3.000","b_min":"0.000","m_means":"0.060","m_rs":"0.200","m_uslx":"0.176","m_lslx":"0.060","m_uslr":"0.200","m_lslr":"0.176","zout_sigma":"0.190788","zin_sigma":"0.018609","zoutzinsigma":"10.252500","zthree_sigma":"1.088680","fthree_sigma":"-0.968680","p_sigma":"0.342893","m_cp":"0.07","m_cpu":"0.13","m_cpl":"0.00","m_cpk":"0.00","p_pp":"2.92","p_ppu":"5.77","p_ppl":"0.06","p_ppk":"0.06","p_ca":"-0.92"}';
//getcpkresult(rrsssfff);
function getcpkresult(xxrr)
{
    //alert(xxrr);
    ChartCalResult = JSON.parse(xxrr);
}

//初始化表头数据
initchartcloum(5);
function initchartcloum(number)
{
    //alert(number)
    number = parseInt(number);
    //初始化列标题
    var arrname = new Array();
    arrname.push("序号");
    arrname.push("抽检时间");
    for (var i = 0; i < number; i++)
    {
        var j = i + 1;
        arrname.push("样本" + j);
    }
    arrname.push("状态");
    arrname.push("平均值");
    arrname.push("极差值");
    arrname.push("标准差");
    arrname.push("最大值");
    arrname.push("最小值");
    arrname.push("录入账户");

    var table = document.createElement('table');
    table.id = "tabledata";
    //创建tr,td项
    var tr = document.createElement('tr');
    //创建文档片段
    for (var i = 0; i < arrname.length; i++) {
        var td = document.createElement('th');
        td.innerHTML = arrname[i];
        if (arrname[i] == "抽检时间" || arrname[i] == "录入账户")
        {
            td.style.display = "none";
        }
        tr.appendChild(td);

    }
    table.appendChild(tr);
    document.body.appendChild(table);

    //tabel赋样式
    table.style.width = "1500px";
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
}

//初始化表格数据
//var sssddsds = '[{ "number": "1", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "2", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "3", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "4", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "5", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "6", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "7", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "8", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "9", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "10", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "11", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "12", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "13", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "14", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "3", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "3", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "1.2", "range": "3", "ste": "0.330289129537908", "max": "3", "min": "0", "user": "" }, { "number": "15", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "16", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "17", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "18", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "19", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "20", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }]';
//initchartandgraph(sssddsds);
function initchartandgraph(cgdata)
{
    var middledataobj = JSON.parse(cgdata);
    var tableId = document.getElementById("tabledata");
    var nn = tableId.rows[0].cells.length;
    //var mm= nn-9;
    var mm= middledataobj[0].datasource.length;

    for (var i = 0; i < middledataobj.length; i++) {
        var newRow = tableId.insertRow();
        var newcellname = newRow.insertCell(0);
        newcellname.innerHTML = middledataobj[i].number;
        var newcellname = newRow.insertCell(1);
        newcellname.innerHTML = middledataobj[i].datetime;
        for (var j = 0; j < mm; j++)
        {
            var newcellname = newRow.insertCell(j+2);
            newcellname.innerHTML = middledataobj[i].datasource[j].value;
        }
        var newcellname = newRow.insertCell(-1);
        newcellname.innerHTML = middledataobj[i].state;
        var newcellname = newRow.insertCell(-1);
        newcellname.innerHTML = middledataobj[i].mean;
        var newcellname = newRow.insertCell(-1);
        newcellname.innerHTML = middledataobj[i].range;
        var newcellname = newRow.insertCell(-1);
        newcellname.innerHTML = middledataobj[i].ste;
        var newcellname = newRow.insertCell(-1);
        newcellname.innerHTML = middledataobj[i].max;
        var newcellname = newRow.insertCell(-1);
        newcellname.innerHTML = middledataobj[i].min;
        var newcellname = newRow.insertCell(-1);
        newcellname.innerHTML = middledataobj[i].user;
    }

    ChartDataSource = middledataobj;

}

//intheadchart1("main1_1");
//intheadchart2("main1_2");
//初始化均值图
function intheadchart1(divid) {
    var Chart1 = echarts.init(document.getElementById(divid))
    var xdata1_1 = new Array();
    for (var i = 1; i < ChartDataSource.length + 1; i++) {
        xdata1_1.push(i);
    }
    var ydata1_1 = new Array();
    for (var i = 0; i < ChartDataSource.length; i++) {
        ydata1_1.push(parseFloat(ChartDataSource[i].mean));
    }
    var USL = parseFloat(ChartDataItem.item.PrUpLimit);
    var LSL = parseFloat(ChartDataItem.item.PrDownLimit);
    var UCL = parseFloat(ChartCalResult.m_uslx);
    var LCL = parseFloat(ChartCalResult.m_lslx);
    option1 = {
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xdata1_1
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            },
            name: '平均值',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
        }],
        series: [{
            name: '检测温度',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
            type: 'line',
            data: ydata1_1,
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
                    },
                    {
                        name: 'UCL',
                        yAxis: UCL,
                    },
                    {
                        name: 'LCL',
                        yAxis: LCL,
                    }
                ]
            }
        }]
    };
    Chart1.setOption(option1);
}

//初始化极差图
function intheadchart2(divid) {
    var Chart2 = echarts.init(document.getElementById(divid))
    var xdata1_1 = new Array();
    for (var i = 1; i < ChartDataSource.length + 1; i++) {
        xdata1_1.push(i);
    }
    var ydata1_1 = new Array();
    for (var i = 0; i < ChartDataSource.length; i++) {
        ydata1_1.push(parseFloat(ChartDataSource[i].range));
    }
    var UCL = parseFloat(ChartCalResult.m_uslr);
    var LCL = parseFloat(ChartCalResult.m_lslr);
    option2 = {
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xdata1_1
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            },
            name: '极差值',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
        }],
        series: [{
            name: '检测温度',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
            type: 'line',
            data: ydata1_1,
            markLine: {
                data: [
                    {
                        type: 'average',
                        name: '平均值'
                    },
                    {
                        name: 'UCL',
                        yAxis: UCL,
                    },
                    {
                        name: 'LCL',
                        yAxis: LCL,
                    }
                ]
            }
        }]
    };
    Chart2.setOption(option2);
}

//初始化CPK分析图

function intheadchart3(divid) {

    myChart = echarts.init(document.getElementById(divid));
    //提取y值
    var yA = new Array();
    for (var i = 0; i < ChartDataSource.length; i++) {
        for (var j = 0; j < ChartDataSource[i].datasource.length; j++) {          
            yA.push(parseFloat(ChartDataSource[i].datasource[j].value));
        }
    }
  //提取样本数及最小样本差
    var arrnumber = parseInt(ChartDataItem.item.PrSampleNumber);
    var mininter = 0;
    var USL = parseFloat(ChartDataItem.item.PrUpLimit);
    var LSL = parseFloat(ChartDataItem.item.PrDownLimit);

    var arr1 = yA.sort();
    var arrcha = new Array();
    for (var j = 0; j < arr1.length - 1; j++)
    {
        var vla = Math.abs(arr1[j] - arr1[j+1]);
        arrcha.push(vla);
    }
    arrcha.sort();
    for (var jj = 0; jj < arrcha.length - 1; jj++) {
        if (arrcha[jj] != 0)
        {
            mininter = arrcha[jj];
        }
    }
 
    //确定横坐标轴上下限
    if ((Math.max(yA) > USL)) {
        var uplimit = Math.max(yA) + mininter;
    }
    else {
        var uplimit = USL + mininter;
    }

    if (Math.min(yA) < LSL) {
        var downlimit = Math.min(yA) - mininter;
    }
    else {
        var downlimit = LSL - mininter;
    }

    //确定横坐标每组宽度
    var det = ((Math.max.apply(null, yA) - Math.min.apply(null, yA)) / arrnumber);

    var X_Y = new Array();
    for (var i = 0; i < arrnumber; i++) {
        X_Y[i] = new Array();
        X_Y[i][0] = Math.min.apply(null, yA) + i * det;
        var lit = Math.min.apply(null, yA) + (i + 1) * det;
        var ss = 0
        for (var j = 0; j < yA.length; j++) {
            if (yA[j] >= X_Y[i][0] && yA[j] < lit) {
                ss = ss + 1;
            }
            if (i == arrnumber - 1 && j == yA.length - 1) {
                ss = ss + 1;
            }
        }
        X_Y[i][1] = ss;
    }



    //正态曲线
    //生成正态点
    var tao = parseFloat(ChartCalResult.p_sigma);
    var tao2 = tao * tao;
    var umean = parseFloat(ChartCalResult.m_means);
    var zhengtaiarray = new Array();
    for (var ii = 0; ii < yA.length; ii++) {
        var values = (1 / (Math.pow(2 * Math.PI, 0.5) * tao)) * Math.pow(Math.E, (-Math.pow((yA[ii] - umean), 2) / (2 * tao2)));
        zhengtaiarray.push(values);
    }

    // See https://github.com/ecomfe/echarts-stat
    //var bins = ecStat.histogram(girth, 'scott');
    var bins = ecStat.histogram(yA, 'scott');

    var interval;
    var min = Infinity;
    var max = -Infinity;


    data = echarts.util.map(X_Y, function (item, index) {
        var x0 = X_Y[index][0];
        var x1 = X_Y[index][0] + det;
        interval = det;
        min = Math.min(min, x0);
        max = Math.max(max, x1);
        return [x0, x1, item[1]];
    });

    function renderItem(params, api) {
        var yValue = api.value(2);
        var start = api.coord([api.value(0), yValue]);
        var size = api.size([api.value(1) - api.value(0), yValue]);
        var style = api.style();

        return {
            type: 'rect',
            shape: {
                x: start[0] + 1,
                y: start[1],
                width: size[0] - 2,
                height: size[1]
            },
            style: style
        };
    }

    option = {
        title: {
            text: 'CPK计算分析图',
            subtext: '温度检测',
            textStyle: {
                fontFamily: "SiYuanHei"
            },
            //sublink: 'https://github.com/ecomfe/echarts-stat',
            left: 'center',
            top: 10
        },
        color: ['rgb(25, 183, 207)'],
        grid: {
            top: 80,
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            min: min - interval,
            max: max + interval,
            interval: interval
        }],
        yAxis: [{
            type: 'value',
        }],
        series: [{
            name: 'height',
            type: 'custom',
            renderItem: renderItem,
            label: {
                normal: {
                    show: true,
                    position: 'insideTop'
                }
            },
            encode: {
                x: [0, 1],
                y: 2,
                tooltip: 2,
                label: 2
            },
            data: data
        },
        {
            name: '检测温度',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
            type: 'line',
            data: zhengtaiarray,
        }
        ]
    };
    myChart.setOption(option);
}

//初始化样本运行图
function intheadchart4(divid) {
    var Chart4 = echarts.init(document.getElementById(divid));
    var xdata1_1 = new Array();
    var ydata1_1 = new Array();
    for(var i=0;i<ChartDataSource.length;i++)
    {
        for(var j=0;j<ChartDataSource[i].datasource.length;j++)
        {
            xdata1_1.push(i + 1);
            ydata1_1.push(parseFloat(ChartDataSource[i].datasource[j].value));
        }
    }
    var USL = parseFloat(ChartDataItem.item.PrUpLimit);
    var LSL = parseFloat(ChartDataItem.item.PrDownLimit);
    option4 = {
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xdata1_1
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            },
            name: '平均值',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
        }],
        series: [{
            name: '检测温度',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
            type: 'line',
            data: ydata1_1,
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
    Chart4.setOption(option4);
}

//初始化均值运行图
function intheadchart5(divid) {
    var Chart5 = echarts.init(document.getElementById(divid));
    var xdata1_1 = new Array();
    for (var i = 1; i < ChartDataSource.length + 1; i++) {
        xdata1_1.push(i);
    }
    var ydata1_1 = new Array();
    for (var i = 0; i < ChartDataSource.length; i++) {
        ydata1_1.push(parseFloat(ChartDataSource[i].mean));
    }
    var USL = parseFloat(ChartDataItem.item.PrUpLimit);
    var LSL = parseFloat(ChartDataItem.item.PrDownLimit);
    var Taget = parseFloat(ChartDataItem.item.PrgoalValue);
    option5 = {
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xdata1_1
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            },
            name: '平均值',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
        }],
        series: [{
            name: '检测温度',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
            type: 'line',
            data: ydata1_1,
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
                    },
                    {
                        name: 'Taget',
                        yAxis: Taget,
                    }
                ]
            }
        }]
    };

    //按样本数增加样本数个数的散点图
    for (var m = 0; m < parseInt(ChartDataItem.item.PrSampleNumber) ; m++)
    {
        var yadata1_1 = new Array();
        for (var mm = 0; mm < ChartDataSource.length ; mm++)
        {
            yadata1_1.push(parseFloat(ChartDataSource[mm].datasource[m].value));
        }
        var obj = {
            name: '样本' + m,
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
            type: 'scatter',
            data: ydata1_1,
        }
        option5.series.push(obj);
    }
    Chart5.setOption(option5);
}

//初始化正态检验图
function intheadchart6(divid) {
    var xdata1_1 = new Array();
    var ydata1_1 = new Array();
    for (var i = 0; i < ChartDataSource.length; i++) {
        for (var j = 0; j < ChartDataSource[i].datasource.length; j++) {
            xdata1_1.push(i + 1);
            ydata1_1.push(parseFloat(ChartDataSource[i].datasource[j].value));
        }
    }
    ydata1_1.sort();
    var newdata = new Array();
    var coun=ydata1_1.length;
    var flag = 1;
    for(var j=0;j<ydata1_1.length-1;j++)
    {
        if (j == ydata1_1.length - 2 && ydata1_1[j + 1] == ydata1_1[j]) {
            var ss = new JYArray(ydata1_1[j], flag+1, ((flag+1) / coun) * 100);
            newdata.push(ss);
            flag = 1;
            break;
        }
        if (j == ydata1_1.length - 2 && ydata1_1[j + 1] != ydata1_1[j]) {
            var ss = new JYArray(ydata1_1[j], flag, (flag / coun) * 100);
            newdata.push(ss);
            var ss = new JYArray(ydata1_1[j+1], 1, (1 / coun) * 100);
            newdata.push(ss);
            flag = 1;
            break;
        }

        if(ydata1_1[j+1]!=ydata1_1[j])
        {
            var ss = new JYArray(ydata1_1[j], flag, (flag / coun) * 100);
            newdata.push(ss);
            flag = 1;
        }
        else
        {
            flag = flag + 1;
        }
        
    }
    //用获得的检验数组初始化图标
    var Chart6 = echarts.init(document.getElementById(divid));

    var xdata1_2 = new Array();
    var ydata1_2 = new Array();
    for (var i = 0; i < newdata.length; i++) {
        xdata1_2.push(newdata[i].value);
        if (i == 0)
        {
            ydata1_2.push(newdata[i].pl);
        }
        else
        {
            ydata1_2.push(newdata[i].pl + newdata[i - 1].pl);
        }      
    }



    option6 = {
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xdata1_2
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            },
            name: '平均值',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
        }],
        series: [{
            name: '检测温度',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
            type: 'scatter',
            data: ydata1_2,
        }]
    };
    //增加拟合曲线,进行一阶线性拟合
    var co = newdata.length;
    var sums2x = 0;
    var sumsx = 0;
    var sumy = 0;
    var sumxy = 0;
    for (var ii = 0; ii < xdata1_2.length; ii++)
    {
        sums2x = sums2x + xdata1_2[ii] * xdata1_2[ii];
        sumsx = sumsx + xdata1_2[ii];
        sumy = sumy + ydata1_2[ii];
        sumxy = xdata1_2[ii]*ydata1_2[ii];
    }
    sumsx2 = sumsx * sumsx
    var DD = co * sums2x - sumsx2

    var mk = (sums2x * sumy - sumsx * sumxy) / DD;
    var mb = (co * sumxy - sumsx * sumy) / DD;

    //计算拟合后的直线的y值
    var ydata1_3 = new Array();
    for (var iii = 0; iii < co; iii++)
    {
        var valuess = mk * xdata1_2[iii] + mb;
        ydata1_3.push(valuess);
    }

    //增加拟合曲线到图表中
    var obj1 = {
        name: '检测温度',
        nameTextStyle: {
            fontFamily: "SiYuanHei"
        },
        type: 'line',
        data: ydata1_3,
    }
    option6.series.push(obj1);
    Chart6.setOption(option6);
}




//section2 js调用的c#方法
function SendHeadChartValue(id, text) {
    jsObj.sendHeadChartValue(PID, id, text);
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
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xarray
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            },
            name: '温度极值',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
        }],
        series: [{
            name: '检测温度',
            nameTextStyle: {
                fontFamily: "SiYuanHei"
            },
            type: 'line',
            data: yarray,
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

//按钮绑定事件
function controlclick()
{
    document.getElementById("main1").style.display = "block";
    document.getElementById("main2").style.display = "none";
    document.getElementById("main3").style.display = "none";
    document.getElementById("main4").style.display = "none";
    document.getElementById("main5").style.display = "none";
    document.getElementById("main6").style.display = "none";
    intheadchart1("main1_1");
    intheadchart2("main1_2");
}

function sampleclick()
{
    document.getElementById("main1").style.display = "none";
    document.getElementById("main2").style.display = "none";
    document.getElementById("main3").style.display = "block";
    document.getElementById("main4").style.display = "none";
    document.getElementById("main5").style.display = "none";
    document.getElementById("main6").style.display = "none";
    intheadchart4("main3");
}

function meanclick() {
    document.getElementById("main1").style.display = "none";
    document.getElementById("main2").style.display = "none";
    document.getElementById("main3").style.display = "none";
    document.getElementById("main4").style.display = "block";
    document.getElementById("main5").style.display = "none";
    document.getElementById("main6").style.display = "none";
    intheadchart5("main4");
}

function gaoshiclick() {
    document.getElementById("main1").style.display = "none";
    document.getElementById("main2").style.display = "none";
    document.getElementById("main3").style.display = "none";
    document.getElementById("main4").style.display = "none";
    document.getElementById("main5").style.display = "block";
    document.getElementById("main6").style.display = "none";
    intheadchart6("main5");
}

function cpkclick() {
    document.getElementById("main1").style.display = "none";
    document.getElementById("main2").style.display = "block";
    document.getElementById("main3").style.display = "none";
    document.getElementById("main4").style.display = "none";
    document.getElementById("main5").style.display = "none";
    document.getElementById("main6").style.display = "none";
    intheadchart3("main2_1");
}

function allchartclick()
{
    document.getElementById("main1").style.display = "none";
    document.getElementById("main2").style.display = "none";
    document.getElementById("main3").style.display = "none";
    document.getElementById("main4").style.display = "none";
    document.getElementById("main5").style.display = "none";
    document.getElementById("main6").style.display = "block";
    intheadchart1("main6_1");
    intheadchart2("main6_2");
    intheadchart3("main6_5");
    intheadchart4("main6_3");
    intheadchart5("main6_4");
}

//曲线拟合算法，采用最小二乘法
function PolyFitForcast() {
    /**
     * <p>
     * 函数功能：最小二乘法曲线拟合
     * </p>
     * <p>
     * 方程:Y = a(0) + a(1) * (X - X1)+ a(2) * (X - X1)^2 + ..... .+ a(m) * (X -
     * X1)^m X1为X的平均数
     * </p>
     * 
     * @param x
     *            实型一维数组,长度为 n. 存放给定 n 个数据点的 X 坐标
     * @param y
     *            实型一维数组,长度为 n.存放给定 n 个数据点的 Y 坐标
     * @param n
     *            变量。给定数据点的个数
     * @param a
     *            实型一维数组，长度为 m.返回 m-1 次拟合多项式的 m 个系数
     * @param m
     *            拟合多项式的项数，即拟合多项式的最高次数为 m-1. 要求 m<=n 且m<=20。若 m>n 或 m>20
     *            ，则本函数自动按 m=min{n,20} 处理.
     *            <p>
     *            Date:2007-12-25 16:21 PM
     *            </p>
     * @author qingbao-gao
     * @return 多项式系数存储数组
     */
    function PolyFit(x, y, n, a, m) {
        var i, j, k;
        var z, p, c, g, q = 0, d1, d2;
        var s = new Array(20);
        var t = new Array(20);
        var b = new Array(20);
        var dt = new Array(3);
        for (i = 0; i <= m - 1; i++) {
            a[i] = 0.0;
        }
        if (m > n) {
            m = n;
        }
        if (m > 20) {
            m = 20;
        }
        z = 0.0;
        for (i = 0; i <= n - 1; i++) {
            z = z + x[i] / (1.0 * n);
        }
        b[0] = 1.0;
        d1 = 1.0 * n;
        p = 0.0;
        c = 0.0;
        for (i = 0; i <= n - 1; i++) {
            p = p + (x[i] - z);
            c = c + y[i];
        }
        c = c / d1;
        p = p / d1;
        a[0] = c * b[0];
        if (m > 1) {
            t[1] = 1.0;
            t[0] = -p;
            d2 = 0.0;
            c = 0.0;
            g = 0.0;
            for (i = 0; i <= n - 1; i++) {
                q = x[i] - z - p;
                d2 = d2 + q * q;
                c = c + y[i] * q;
                g = g + (x[i] - z) * q * q;
            }
            c = c / d2;
            p = g / d2;
            q = d2 / d1;
            d1 = d2;
            a[1] = c * t[1];
            a[0] = c * t[0] + a[0];
        }
        for (j = 2; j <= m - 1; j++) {
            s[j] = t[j - 1];
            s[j - 1] = -p * t[j - 1] + t[j - 2];
            if (j >= 3)
                for (k = j - 2; k >= 1; k--) {
                    s[k] = -p * t[k] + t[k - 1] - q * b[k];
                }
            s[0] = -p * t[0] - q * b[0];
            d2 = 0.0;
            c = 0.0;
            g = 0.0;
            for (i = 0; i <= n - 1; i++) {
                q = s[j];
                for (k = j - 1; k >= 0; k--) {
                    q = q * (x[i] - z) + s[k];
                }
                d2 = d2 + q * q;
                c = c + y[i] * q;
                g = g + (x[i] - z) * q * q;
            }
            c = c / d2;
            p = g / d2;
            q = d2 / d1;
            d1 = d2;
            a[j] = c * s[j];
            t[j] = s[j];
            for (k = j - 1; k >= 0; k--) {
                a[k] = c * s[k] + a[k];
                b[k] = t[k];
                t[k] = s[k];
            }
        }
        dt[0] = 0.0;
        dt[1] = 0.0;
        dt[2] = 0.0;
        for (i = 0; i <= n - 1; i++) {
            q = a[m - 1];
            for (k = m - 2; k >= 0; k--) {
                q = a[k] + q * (x[i] - z);
            }
            p = q - y[i];
            if (Math.abs(p) > dt[2]) {
                dt[2] = Math.abs(p);
            }
            dt[0] = dt[0] + p * p;
            dt[1] = dt[1] + Math.abs(p);
        }
        return a;
    }// end

    /**
     * <p>
     * 对X轴数据节点球平均值
     * </p>
     * 
     * @param x
     *            存储X轴节点的数组
     *            <p>
     *            Date:2007-12-25 20:21 PM
     *            </p>
     * @author qingbao-gao
     * @return 平均值
     */
    function average(x) {
        var ave = 0;
        var sum = 0;
        if (x !== null) {
            for (var i = 0; i < x.length; i++) {
                sum += x[i];
            }
            ave = sum / x.length;
        }
        return ave;
    }

    /**
     * <p>
     * 由X值获得Y值
     * </p>
     * @param x
     *            当前X轴输入值,即为预测的月份
     * @param xx
     *            当前X轴输入值的前X数据点
     * @param a
     *            存储多项式系数的数组
     * @param m
     *            存储多项式的最高次数的数组
     *            <p>
     *            Date:2007-12-25 PM 20:07
     *            </p>
     * @return 对应X轴节点值的Y轴值
     */
    function getY(x, xx, a, m) {
        var y = 0;
        var ave = average(xx);

        var l = 0;
        for (var i = 0; i < m; i++) {
            l = a[0];
            if (i > 0) {
                y += a[i] * Math.pow((x - ave), i);
            }
        }
        return (y + l);
    }

    /**
     * 返回拟合后的点坐标数组
     * @param  {Array} arr 点坐标数组
     * @return {Array}     拟合后的点坐标数组
     */
    this.get = function (arr) {
        var arrX = [], arrY = [];

        for (var i = 0; i < arr.length; i++) {
            arrX.push(arr[i].x);
            arrY.push(arr[i].y);
        }

        var len = arrY.length;
        var m = 3;
        var a = new Array(arrX.length);
        var aa = PolyFit(arrX, arrY, len, a, m);
        var arrRes = [];
        for (var i = 0; i < len; i++) {
            arrRes.push({ x: arrX[i], y: getY(arrX[i], arrX, aa, m) });
        }

        return arrRes;
    };
}

// var arr = [{x: 10, y: 10},{x: 40, y: 90},{x: 70, y: 65},{x: 100, y: 15}];
// // 最小二乘法拟合
// var res = new PolyFitForcast().get(arr);
// var canvas = document.createElement('canvas');
// var ctx2d = canvas.getContext('2d');

// ctx2d.lineWidth = 1;

// ctx2d.strokeStyle = '#000';
// ctx2d.beginPath();
// ctx2d.moveTo(arr[0].x, arr[0].y);
// ctx2d.lineTo(arr[1].x, arr[1].y);
// ctx2d.lineTo(arr[2].x, arr[2].y);
// ctx2d.lineTo(arr[3].x, arr[3].y);
// ctx2d.stroke();

// ctx2d.strokeStyle = '#f00';
// ctx2d.beginPath();
// ctx2d.moveTo(res[0].x, res[0].y);
// ctx2d.lineTo(res[1].x, res[1].y);
// ctx2d.lineTo(res[2].x, res[2].y);
// ctx2d.lineTo(res[3].x, res[3].y);
// ctx2d.stroke();
// document.body.appendChild(canvas);












//var xA = new Array();
//for (var i = 1; i < 81; i++) {
//    xA.push(i);
//}
//option = {   
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
//    }]
//};

//Chart1 = echarts.init(document.getElementById('main1'));
//Chart1.setOption(option);




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
//textStyle: {
//        fontFamily: "SiYuanHei"
//},
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
function initheadchart(headdata) {
    var headdataobj = JSON.parse(headdata);

    if (headdataobj != null) {
        PID = headdataobj.PID
        $("#Process").val(headdataobj.Process);
        $("#MachineNo").val(headdataobj.MachineNo);
        $("#MoldCavityNo").val(headdataobj.ModCavityNo);
        $("#LSL").val(headdataobj.LSL);
        $("#LocationNo").val(headdataobj.LocationNo);
        $("#ControlPlan").val(headdataobj.ControlPlan);
        $("#Characteristic").val(headdataobj.Characteristic);
        $("#LineNo").val(headdataobj.LineNo);
        $("#SampleSize").val(headdataobj.SampleSize);
        $("#USL").val(headdataobj.USL);
        $("#GageNo").val(headdataobj.GageNo);
        $("#MSAResults").val(headdataobj.MSAResults);
    }
}

function initmiddlechart(middledata) {
    var middledataobj = JSON.parse(middledata);
    var tableId = document.getElementById("table2");

    //给列表赋值
    for (var j = 1; j < tableId.rows[0].cells.length; j++) {
        tableId.rows[1].cells[j].innerHTML = middledataobj[j - 1].day;
        tableId.rows[2].cells[j].innerHTML = middledataobj[j - 1].time;
        tableId.rows[3].cells[j].innerHTML = middledataobj[j - 1].val;
        tableId.rows[5].cells[j].innerHTML = middledataobj[j + 39].day;
        tableId.rows[6].cells[j].innerHTML = middledataobj[j + 39].time;
        tableId.rows[7].cells[j].innerHTML = middledataobj[j + 39].val;
    }
    //获取x轴数据：
    var xdata = new Array();
    for (var i = 1; i < 81; i++) {
        xdata.push(i);
    }
    var ydata = new Array();
    for (var m = 0; m < middledataobj.length; m++) {
        ydata.push(middledataobj[m].val);
    }
    var usl = parseFloat($("#USL").val());
    var lsl = parseFloat($("#LSL").val());

    //用数据初始化或者更新图表
    intchart(Chart1, "main", "电流", xdata, ydata, usl, lsl);
}