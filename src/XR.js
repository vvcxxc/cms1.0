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

var meansz;
var mrsz;
//section1 c#调用的js方法

//获取检测箱基本信息
//var fffgggfff = '{"number":"1","item":{"PrId":"8b446978-1862-44d0-9473-a485caad60e1","PrNumber":"20190108104516","PrName":"2","PrMethod":"手动","PrType":"XR","PrSampleNumber":"5","PrUpLimit":"54","PrgoalValue":"52","PrDownLimit":"50","PrRule":"R0","UpdateUser":null,"UpdateTime":null,"PrVariableId":"00000000-0000-0000-0000-000000000000","PrVariableName":"Modbus147","PrWorkshopId":null,"PrLineId":"83748f2e-e9f0-4a23-af45-3dfd2d5d67dc"}}';
//intpid(fffgggfff);
function intpid(spid)
{
    ChartDataItem = JSON.parse(spid);
    //第二张框
    document.getElementById("Clsl").innerHTML = ChartDataItem.item.PrDownLimit;
    document.getElementById("Cusl").innerHTML = ChartDataItem.item.PrUpLimit;
    document.getElementById("Cgoal").innerHTML = ChartDataItem.item.PrgoalValue;
    document.getElementById("SubSampleNumber").innerHTML = ChartDataItem.item.PrSampleNumber;
}

//获取所有的计算结果
//var rrsssfff = '{"b_samplenumber":"50","b_mean":"52.248","b_max":"54.100","b_min":"51.900","m_means":"52.248","m_rs":"1.080","m_uslx":"52.874","m_lslx":"51.622","m_uslr":"2.279","m_lslr":"9999.000","zout_sigma":"0.437831","zin_sigma":"0.131518","zoutzinsigma":"3.329065","zthree_sigma":"54.148500","fthree_sigma":"50.347500","p_sigma":"0.633500","m_cp":"0.24","m_cpu":"0.21","m_cpl":"0.27","m_cpk":"0.21","p_pp":"1.05","p_ppu":"0.92","p_ppl":"1.18","p_ppk":"0.92","p_ca":"26.25"}';
//getcpkresult(rrsssfff);
function getcpkresult(xxrr)
{
    ChartCalResult = JSON.parse(xxrr);
    //第一张框
    document.getElementById("Cmean").innerHTML = ChartCalResult.b_mean;
    document.getElementById("Csamplenumber").innerHTML = ChartCalResult.b_samplenumber;
    document.getElementById("XMax").innerHTML = ChartCalResult.b_max;
    document.getElementById("XMin").innerHTML = ChartCalResult.b_min;
   //第三张框
    document.getElementById("CStDevWith").innerHTML = ChartCalResult.zin_sigma;
    document.getElementById("CStDevOverall").innerHTML = ChartCalResult.zout_sigma;
    document.getElementById("OverallWith").innerHTML = ChartCalResult.zoutzinsigma;
    document.getElementById("StDevAll").innerHTML = ChartCalResult.p_sigma;
    document.getElementById("StDevAllP3").innerHTML = ChartCalResult.zthree_sigma;
    document.getElementById("StDevAllF3").innerHTML = ChartCalResult.fthree_sigma;
    //第四张框
    document.getElementById("Ccp").innerHTML = ChartCalResult.m_cp;
    document.getElementById("Ccpl").innerHTML = ChartCalResult.m_cpl;
    document.getElementById("Ccpu").innerHTML = ChartCalResult.m_cpu;
    document.getElementById("Ccpk").innerHTML = ChartCalResult.m_cpk;

    //第五张框
    document.getElementById("Pcp").innerHTML = ChartCalResult.p_pp;
    document.getElementById("Pcpl").innerHTML = ChartCalResult.p_ppl;
    document.getElementById("Pcpu").innerHTML = ChartCalResult.p_ppu;
    document.getElementById("Pcpk").innerHTML = ChartCalResult.p_ppk;
   
    //第六张框
    document.getElementById("CCa").innerHTML = ChartCalResult.p_ca;
    meansz = parseFloat(ChartCalResult.m_means);
    mrsz =parseFloat(ChartCalResult.m_rs)
}

//初始化表头数据
//initchartcloum(5);
function initchartcloum(number)
{
   
    //判断表头是否存在避免二次初始化
    var tansf = document.getElementById("tabledata");
    if (tansf !== null)
    {
        //$("body").remove(tansf);
        document.body.removeChild(tansf);
    }
    //alert(number)
    number = parseInt(number);
    //初始化列标题
    var arrname = new Array();
    //arrname.push("序号");
    //arrname.push("抽检时间");
    arrname.push("order number");
    arrname.push("Sampling time");
    for (var i = 0; i < number; i++)
    {
        var j = i + 1;
        arrname.push("Sample" + j);
    }
    //arrname.push("状态");
    //arrname.push("平均值");
    //arrname.push("极差值");
    //arrname.push("标准差");
    //arrname.push("最大值");
    //arrname.push("最小值");
    //arrname.push("录入账户");
    arrname.push("Status");
    arrname.push("Mean");
    arrname.push("Range");
    arrname.push("SD");
    arrname.push("Max");
    arrname.push("Min");
    arrname.push("Entry account");

    var table = document.createElement('table');
    table.id = "tabledata";
    //创建tr,td项
    var tr = document.createElement('tr');
    //创建文档片段
    for (var i = 0; i < arrname.length; i++) {
        var td = document.createElement('th');
        td.innerHTML = arrname[i];
        //if (arrname[i] == "抽检时间" || arrname[i] == "录入账户") {
        //    td.style.display = "none";
        //}
        if (arrname[i] == "Sampling time" || arrname[i] == "Entry account") {
            td.style.display = "none";
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
    document.body.appendChild(table);

    //tabel赋样式
    table.style.width = "1800px";
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
//var sssddsds = '[{"number":"1","datetime":"","datasource":[{"value":"51.2","time":"2019-01-08 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.3","time":"2019-01-09 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.2","time":"2019-01-10 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"53.1","time":"2019-01-11 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.3","time":"2019-01-12 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"52.020","range":"1.900","ste":"0.224","max":"53.100","min":"51.200","user":""},{"number":"2","datetime":"","datasource":[{"value":"51.4","time":"2019-01-13 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.1","time":"2019-01-14 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.6","time":"2019-01-15 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.4","time":"2019-01-16 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.3","time":"2019-01-17 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"52.160","range":"1.200","ste":"0.132","max":"52.600","min":"51.400","user":""},{"number":"3","datetime":"","datasource":[{"value":"53.3","time":"2019-01-18 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.2","time":"2019-01-19 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.4","time":"2019-01-20 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.4","time":"2019-01-21 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.3","time":"2019-01-22 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"52.520","range":"1.100","ste":"0.127","max":"53.300","min":"52.200","user":""},{"number":"4","datetime":"","datasource":[{"value":"52.3","time":"2019-01-23 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.3","time":"2019-01-24 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.6","time":"2019-01-25 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.6","time":"2019-01-26 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.6","time":"2019-01-27 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"51.880","range":"0.700","ste":"0.110","max":"52.300","min":"51.600","user":""},{"number":"5","datetime":"","datasource":[{"value":"52.2","time":"2019-01-28 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.2","time":"2019-01-29 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.2","time":"2019-01-30 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.2","time":"2019-01-31 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"53.1","time":"2019-02-01 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"52.380","range":"0.900","ste":"0.115","max":"53.100","min":"52.200","user":""},{"number":"6","datetime":"","datasource":[{"value":"53.2","time":"2019-02-02 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"53.2","time":"2019-02-03 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"54.1","time":"2019-02-04 15:00:00","rule":null,"isoutrule":"R0","linshipanduan":false},{"value":"52.3","time":"2019-02-05 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.4","time":"2019-02-06 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"异常","mean":"53.040","range":"1.800","ste":"0.209","max":"54.100","min":"52.300","user":""},{"number":"7","datetime":"","datasource":[{"value":"52.6","time":"2019-02-07 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.7","time":"2019-02-08 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.8","time":"2019-02-09 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.8","time":"2019-02-10 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.9","time":"2019-02-11 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"52.760","range":"0.300","ste":"0.033","max":"52.900","min":"52.600","user":""},{"number":"8","datetime":"","datasource":[{"value":"53","time":"2019-02-12 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"53.1","time":"2019-02-13 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.8","time":"2019-02-14 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.8","time":"2019-02-15 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.9","time":"2019-02-16 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"52.320","range":"1.300","ste":"0.191","max":"53.100","min":"51.800","user":""},{"number":"9","datetime":"","datasource":[{"value":"51.9","time":"2019-02-17 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.2","time":"2019-02-18 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.3","time":"2019-02-19 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.4","time":"2019-02-20 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.4","time":"2019-02-21 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"51.440","range":"0.700","ste":"0.077","max":"51.900","min":"51.200","user":""},{"number":"10","datetime":"","datasource":[{"value":"51.4","time":"2019-02-22 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.3","time":"2019-02-23 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.1","time":"2019-02-24 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"51.9","time":"2019-02-25 15:00:00","rule":null,"isoutrule":"","linshipanduan":false},{"value":"52.1","time":"2019-02-26 15:00:00","rule":null,"isoutrule":"","linshipanduan":false}],"state":"正常","mean":"51.960","range":"0.900","ste":"0.098","max":"52.300","min":"51.400","user":""}]';
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
        //var newcellname = newRow.insertCell(1);
        //newcellname.innerHTML = middledataobj[i].datetime;
        for (var j = 0; j < mm; j++)
        {
            var newcellname = newRow.insertCell(j+1);
            newcellname.innerHTML = middledataobj[i].datasource[j].value;
        }
        var newcellname = newRow.insertCell(-1);
        newcellname.innerHTML = middledataobj[i].state;
        if (newcellname.innerHTML == "正常")
        {
            newcellname.innerHTML = "Normal";
        }
        else
        {
            newcellname.innerHTML = "Abnormal";
        }
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
        //var newcellname = newRow.insertCell(-1);
        //newcellname.innerHTML = middledataobj[i].user;
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

    var minyy = Math.min.apply(null, ydata1_1);
    var maxyy = Math.max.apply(null, ydata1_1);

    if (parseFloat(LSL) < minyy)
    {
        minyy = parseFloat(LSL)
    }
    if (parseFloat(USL) > maxyy) {
        maxyy = parseFloat(USL)
    }


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
                formatter: '{value}'
            },
            //name: '平均值',
            name: 'Mean',
            nameTextStyle: {
                fontSize: 16,
                fontFamily: "SiYuanHei"
            },
            min: minyy,
            max: maxyy,
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

    var minyy = Math.min.apply(null, ydata1_1);
    var maxyy = Math.max.apply(null, ydata1_1);

    if (parseFloat(LCL) < minyy) {
        minyy = parseFloat(LCL)
    }
    if (parseFloat(UCL) > maxyy) {
        maxyy = parseFloat(UCL)
    }

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
                formatter: '{value}'
            },
            //name: '极差值',
            name: 'Range',
            nameTextStyle: {
                fontSize: 16,
                fontFamily: "SiYuanHei"
            },
            min: minyy,
            max: maxyy
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
//document.getElementById("main2").style.display = "block";
//intheadchart3("main2");
function intheadchart3(divid) {
    var means = meansz;
    var sigmas = mrsz;
    myChart = echarts.init(document.getElementById(divid));
    //提取y值
    var CPKY = new Array();
    for (var i = 0; i < ChartDataSource.length; i++) {
        for (var j = 0; j < ChartDataSource[i].datasource.length; j++) {          
            CPKY.push(parseFloat(ChartDataSource[i].datasource[j].value));
        }
    }
  //提取样本数及最小样本差
    var mmaaxx = Math.max.apply(null, CPKY)
    //确定间距
    var sdf = Math.floor(Math.pow(CPKY.length, 0.5));
    var arrnumber = sdf;
    //var arrnumber = 5;
    var det = ((Math.max.apply(null, CPKY) - Math.min.apply(null, CPKY)) / arrnumber);
    var mininter = 2;
    var USL =9;
    var LSL =1;

    var xarrayx = new Array();


    //确定横坐标每组宽度
    var X_Y = new Array();
    for (var i = 0; i < arrnumber; i++) {
        X_Y[i] = new Array();
        X_Y[i][0] = Math.min.apply(null, CPKY) + i * det;
        var lit = Math.min.apply(null, CPKY) + (i + 1) * det;
        var ss = 0
        for (var j = 0; j < CPKY.length; j++) {
            if (i !== arrnumber - 1) {
                if (CPKY[j] >= X_Y[i][0] && CPKY[j] < lit) {
                    ss = ss + 1;
                }
            }
            else if (i == arrnumber - 1) {
                if (CPKY[j] >= X_Y[i][0] && CPKY[j] <= lit) {
                    ss = ss + 1;
                }
            }
            //if (i == arrnumber - 1 && j == CPKY.length - 1) {
            //    ss = ss + 1;
            //}
        }
        X_Y[i][1] = ss;
    }


    //确定横坐标轴上下限
    if (Math.min.apply(null, CPKY) < LSL) {
        var downlimit = Math.min.apply(null, CPKY) - det;
        xarrayx.push(downlimit);
    }
    else {
        var downlimit = Math.min.apply(null, CPKY) - det;
        xarrayx.push(downlimit);
    }

    for (var i = 0; i < X_Y.length; i++) {
        xarrayx.push(X_Y[i][0]);
    }

    if ((Math.max.apply(null, CPKY) > USL)) {
        var uplimit = Math.max.apply(null, CPKY) + det;
        xarrayx.push(uplimit);
    }
    else {
        var uplimit = USL + det;
        xarrayx.push(uplimit);
    }

    var yarrayy = new Array();
    if (sigmas != 0) {
        for (var j = 0; j < xarrayx.length; j++) {
            var esd = (1 / sigmas / (Math.pow((2 * Math.PI), 0.5))) * Math.pow(Math.E, -Math.pow((xarrayx[j] - means), 2) / 2 / Math.pow(sigmas, 2));
            yarrayy.push(esd);
        }
    }
    else {
        for (var j = 0; j < xarrayx.length; j++) {
            var esd = (1 / sigmas / (Math.pow((2 * Math.PI), 0.5))) * Math.pow(Math.E, -Math.pow((xarrayx[j] - means), 2) / 2);
            yarrayy.push(esd);
        }
    }

    var dataxy = new Array()
    {
        for (var j = 0; j < xarrayx.length; j++) {
            dataxy.push([xarrayx[j], yarrayy[j] * 100]);
        }
    }


    // See https://github.com/ecomfe/echarts-stat
    //var bins = ecStat.histogram(girth, 'scott');
    var bins = ecStat.histogram(CPKY, 'scott');

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


    var minxx = parseFloat((min - interval).toFixed(3));
    var maxxx = parseFloat((max + interval).toFixed(3));
    var intervalxx = parseFloat(interval.toFixed(3));
    option = {
        title: {
            //text: '过程能力评估',
            text: 'Process Capability Assessment',
            textStyle:{
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
            //min: min - interval,
            //max: max + interval,
            //interval: interval
            min: minxx,
            max: maxxx,
            interval: intervalxx
        }
        ],
        yAxis: [{
            type: 'value',
            //min: 0,
            //max: 100,
        },
        {
            type: 'value',
            //min: 0,
            //max: 100,
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
            itemStyle:{
                color:"#5c8cda"
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
            name: 'height1',
            type: 'line',
            yAxisIndex: 1,
            smooth: 0.5,
            data: dataxy
        },
        {
            name: 'USL',
            type: 'line',
            markLine: {
                name: 'USL',
                data: [[
                    { coord: [USL, 0] },
                    { coord: [USL, mmaaxx] }//如何获取grid上侧最大值，目前是写死的
                ]]
            }
        },
        {
            name: 'USL',
            type: 'line',
            markLine: {
                name: 'LSL',
                data: [[
                    { coord: [LSL, 0] },
                    { coord: [LSL, mmaaxx] }//如何获取grid上侧最大值，目前是写死的
                ]]
            }
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

    var minyy = Math.min.apply(null, ydata1_1);
    var maxyy = Math.max.apply(null, ydata1_1);

    if (parseFloat(LSL) < minyy) {
        minyy = parseFloat(LSL)
    }
    if (parseFloat(USL) > maxyy) {
        maxyy = parseFloat(USL)
    }

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
                formatter: '{value}',
            },
            nameTextStyle:{
                fontSize: 16,
                fontFamily: "SiYuanHei"
            },
            //name: '样本值',
            name: 'Sample',
            min: minyy,
            max: maxyy
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

    var minyy = Math.min.apply(null, ydata1_1);
    var maxyy = Math.max.apply(null, ydata1_1);

    if (parseFloat(LSL) < minyy) {
        minyy = parseFloat(LSL)
    }
    if (parseFloat(USL) > maxyy) {
        maxyy = parseFloat(USL)
    }

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
                formatter: '{value}'
            },
            //name: '平均值',
            name: 'Mean',
            nameTextStyle: {
                fontSize: 16,
                fontFamily: "SiYuanHei"
            },
            min: minyy,
            max: maxyy
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
            ydata1_2.push(newdata[i].pl + ydata1_2[i - 1]);
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
                formatter: '{value} %'
            },
            name: '累计频率',
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
    ////增加拟合曲线,进行一阶线性拟合
    //var co = newdata.length;
    //var sums2x = 0;
    //var sumsx = 0;
    //var sumy = 0;
    //var sumxy = 0;
    //for (var ii = 0; ii < xdata1_2.length; ii++)
    //{
    //    sums2x = sums2x + xdata1_2[ii] * xdata1_2[ii];
    //    sumsx = sumsx + xdata1_2[ii];
    //    sumy = sumy + ydata1_2[ii];
    //    sumxy = xdata1_2[ii]*ydata1_2[ii];
    //}
    //sumsx2 = sumsx * sumsx
    //var DD = co * sums2x - sumsx2

    //var mk = (sums2x * sumy - sumsx * sumxy) / DD;
    //var mb = (co * sumxy - sumsx * sumy) / DD;

    ////计算拟合后的直线的y值
    //var ydata1_3 = new Array();
    //for (var iii = 0; iii < co; iii++)
    //{
    //    var valuess = mk * xdata1_2[iii] + mb;
    //    ydata1_3.push(valuess);
    //}
    var ssddss = PolyFitForcast(xdata1_2, ydata1_2);
    var xdata1_3 = new Array();
    var ydata1_3 = new Array();
        for (var i = 0; i < ssddss.length; i++) {
            xdata1_3.push(ssddss[i].x);
            ydata1_3.push(ssddss[i].y);
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
                formatter: '{value}'
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
function PolyFitForcast(xdata1_2, ydata1_2) {
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
    //this.get = function (arr) {
    //    var arrX = [], arrY = [];

    //    for (var i = 0; i < arr.length; i++) {
    //        arrX.push(arr[i].x);
    //        arrY.push(arr[i].y);
    //    }

    //    var len = arrY.length;
    //    var m = 1;
    //    var a = new Array(arrX.length);
    //    var aa = PolyFit(arrX, arrY, len, a, m);
    //    var arrRes = [];
    //    for (var i = 0; i < len; i++) {
    //        arrRes.push({ x: arrX[i], y: getY(arrX[i], arrX, aa, m) });
    //    }

    //    return arrRes;
    //};

    
        var arrX = [], arrY = [];

        for (var i = 0; i < xdata1_2.length; i++) {
            arrX.push(xdata1_2[i]);
            arrY.push(ydata1_2[i]);
        }

        var len = arrY.length;
        var m = 1;
        var a = new Array(arrX.length);
        var aa = PolyFit(arrX, arrY, len, a, m);
        var arrRes = [];
        for (var i = 0; i < len; i++) {
            arrRes.push({ x: arrX[i], y: getY(arrX[i], arrX, aa, m) });
        }

        return arrRes;
    
}

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


//导出方法
function getbasebianma() {
    var canvas = document.createElement("canvas")
    canvas.width = 560    // 最终图片宽度280px的2倍，以px为单位
    canvas.height = 630   // 最终图片高度315px的2倍，以px为单位
    var sds = $(document).height();
    console.log(sds);
    let opts = {
        canvas: canvas,                       // 将自定义canvas作为配置项
        useCORS: true,                        // 允许图片跨域
        height: sds  // 修复截图不完整问题
    }
    html2canvas($("#bodyid")[0], opts).then((canvas) => {
        /* 此处的base64ImgSrc就是得到的img的base64字符串，直接在页面上显示即可 */
        //document.getElementById('myIMG').src = canvas.toDataURL("image/jpeg", 1);
        var base64ImgSrc = canvas.toDataURL("image/png");
        console.info(base64ImgSrc);
        //$('#myIMG').attr("src", base64ImgSrc);
        //$('#down_qr').attr('download', base64ImgSrc);
        //$('#down_qr').attr('href', base64ImgSrc);
        //document.getElementById('down_qr').click();
        jsObj.sendBaseValue(base64ImgSrc);
    });
}



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


//alert("fsfs");
//alert(jsObj);
//jsObj.initfirstresult();
//alert("sdss");




//initchartcloum(5);
//var sssddsds = '[{ "number": "1", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0.5", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0.8", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "2", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "1.2", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "3", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "4", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "5", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "6", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "7", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "8", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "1.8", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "9", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "10", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "11", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "12", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "13", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "14", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "3", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "3", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "1.2", "range": "3", "ste": "0.330289129537908", "max": "3", "min": "0", "user": "" }, { "number": "15", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "16", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "17", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "18", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "19", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }, { "number": "20", "datetime": "", "datasource": [{ "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:54:50", "rule": null, "isoutrule": "", "linshipanduan": false }, { "value": "0", "time": "2018-11-27 15:48:58", "rule": null, "isoutrule": "", "linshipanduan": false }], "state": "正常", "mean": "0", "range": "0", "ste": "0", "max": "0", "min": "0", "user": "" }]';
//initchartandgraph(sssddsds);