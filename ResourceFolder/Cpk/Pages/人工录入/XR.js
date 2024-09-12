//定义全局变量
var PID;
var Chart1;
var Chart2;
var Chart3;
var myChart;
var ProjectName;
// 保存initheadchart添加的两个参数
var ProductId
var ProcessId

//存储中间数ID
var IDarray = new Array();
var CalculationMode;

var Drule = function () {
    this.r1 =0;
    this.r2 = 0;
    this.r3 = 0;
    this.r4 = 0;
    this.r5 = 0;
}

//初始化中间表读数类
var MiddleChartDataItem = function (){
    this.id=null;
    this.day=null;
    this.hourminute=null;
    this.record1=null;
    this.record2=null;
    this.record3=null;
    this.record4=null;
    this.record5=null;
    this.factfilder=null;
    this.review=null;
    this.time=null;
}


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
        //$("#LineNo").val(headdataobj.LineNo);
        $("#SampleSize").val(headdataobj.SampleSize);
        $("#USL").val(headdataobj.USL);
        $("#GageNo").val(headdataobj.GageNo);
        $("#MSAResults").val(headdataobj.MSAResults);
        $("#PartsNo").val(headdataobj.PartsNo);
        $("#ControlTime").val(headdataobj.ControlTime);
        $("#SampleFulent").val(headdataobj.SampleFulent);
        ProductId = headdataobj.ProductId
        ProcessId = headdataobj.ProcessId
    }
}

//var ssdd = '[{ "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "1", "val": "0", "rr": "0", "datetime": "2018-12-14T13:15:13.8146", "day": "12/14", "time": "13:15", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "2", "val": "0", "rr": "0", "datetime": "2018-12-14T13:15:52.5386", "day": "12/14", "time": "13:15", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "3", "val": "0", "rr": "0", "datetime": "2018-12-14T13:16:12.2906", "day": "12/14", "time": "13:16", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "4", "val": "0", "rr": "0", "datetime": "2018-12-14T13:16:26.6856", "day": "12/14", "time": "13:16", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "5", "val": "0", "rr": "0", "datetime": "2018-12-14T13:16:30.4076", "day": "12/14", "time": "13:16", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "6", "val": "0", "rr": "0", "datetime": "2018-12-17T09:33:57.3968007", "day": "12/17", "time": "9:33", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "7", "val": "0", "rr": null, "datetime": "2018-12-17T09:34:53.4368007", "day": "12/17", "time": "9:34", "isoutrule": null }]';
//initmiddlechart(ssdd);

//var gggggg = '[{ "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": "1", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-17T15:30:00", "day": "12/17", "time": "15:30", "children": [{ "val": "1", "isoutrule": "" }, { "val": "2", "isoutrule": "" }, { "val": "2", "isoutrule": "" }, { "val": "2", "isoutrule": "" }, { "val": "3", "isoutrule": "" }], "factfilder": "g", "reviewfilder": "s" }, { "id": "4fe46b95-dceb-432b-a35a-42cc983cf0f6", "num": "2", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-17T15:50:00", "day": "12/17", "time": "15:50", "children": [{ "val": "3", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "h" }, { "id": "c0c7e5bf-ca7c-4313-aa3f-5ab5c90586bb", "num": "3", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:30:00", "day": "12/16", "time": "15:30", "children": [{ "val": "1", "isoutrule": "" }, { "val": "2", "isoutrule": "" }, { "val": "3", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "f", "reviewfilder": "g" }, { "id": "d61c7664-fabd-4b15-93d7-3e8d4477a62d", "num": "4", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-18T02:35:00", "day": "12/18", "time": "2:35", "children": [{ "val": "8", "isoutrule": "" }, { "val": "8", "isoutrule": "" }, { "val": "8", "isoutrule": "" }, { "val": "9", "isoutrule": "" }, { "val": "9", "isoutrule": "" }], "factfilder": "f", "reviewfilder": "k" }, { "id": "f13fea33-dc67-4571-ae06-fe450c477400", "num": "5", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-17T18:30:00", "day": "12/17", "time": "18:30", "children": [{ "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }, { "val": "8", "isoutrule": "" }], "factfilder": "k", "reviewfilder": "l" }, { "id": "fe5ce3de-4a05-485c-8fe6-5cd49c013f4d", "num": "6", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-18T02:15:00", "day": "12/18", "time": "2:15", "children": [{ "val": "7", "isoutrule": "" }, { "val": "7", "isoutrule": "" }, { "val": "8", "isoutrule": "" }, { "val": "8", "isoutrule": "" }, { "val": "9", "isoutrule": "" }], "factfilder": "l", "reviewfilder": "t" }]'
//var gggggg = '[{ "id": "a036a897-2be1-410b-85ba-1c68a4efabdc", "num": "1", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:30:00", "day": "12/16", "time": "15:30", "children": [{ "val": "3", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "d", "reviewfilder": "e" }, { "id": "3d985cda-111b-45ca-86f3-8b2dcac8dbb3", "num": "2", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:30:00", "day": "12/16", "time": "15:30", "children": [{ "val": "3", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "d", "reviewfilder": "e" }, { "id": "cb268eb8-747d-40fa-bff1-67de42381404", "num": "3", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:45:00", "day": "12/16", "time": "15:45", "children": [{ "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "y", "reviewfilder": "h" }, { "id": "537ee2f9-1658-4f15-8b68-11414d5bdcff", "num": "4", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:45:00", "day": "12/16", "time": "15:45", "children": [{ "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "y", "reviewfilder": "h" }, { "id": "a2e39b77-1b18-4ead-a3a1-0b478468dbc8", "num": "5", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:55:00", "day": "12/16", "time": "15:55", "children": [{ "val": "6", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "8", "isoutrule": "" }, { "val": "6", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "l" }, { "id": "8f79ed50-fcc6-4c12-a2f9-b97930819825", "num": "6", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:55:00", "day": "12/16", "time": "15:55", "children": [{ "val": "6", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "8", "isoutrule": "" }, { "val": "6", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "l" }, { "id": "140a5cef-c19a-4300-a87c-20aa7bfbb40f", "num": "7", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-17T02:20:00", "day": "12/17", "time": "2:20", "children": [{ "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "k" }, { "id": "5bdf0dbf-7c5e-4f8d-91d6-337547d61c67", "num": "8", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-17T02:20:00", "day": "12/17", "time": "2:20", "children": [{ "val": "5", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "k" }, { "id": "a9c4ee50-3f81-464b-a34f-2ddeb494c64f", "num": "9", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-18T02:30:00", "day": "12/18", "time": "2:30", "children": [{ "val": "5", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "k", "reviewfilder": "l" }, { "id": "dd4b7503-cde4-4b5a-8068-b69b6463ccd7", "num": "10", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-18T02:30:00", "day": "12/18", "time": "2:30", "children": [{ "val": "5", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "k", "reviewfilder": "l" }, { "id": "37de771f-4e55-4198-b351-2740f71e132d", "num": "11", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-19T12:00:00", "day": "12/19", "time": "12:0", "children": [{ "val": "3", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "4", "reviewfilder": "9" }, { "id": "27a48fa6-225c-457c-b5c7-146da80fecbe", "num": "12", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-19T13:00:00", "day": "12/19", "time": "13:0", "children": [{ "val": "1", "isoutrule": "" }, { "val": "2", "isoutrule": "" }, { "val": "3", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "4", "reviewfilder": "5" }]'
//var gggggg = '[{ "id": "a036a897-2be1-410b-85ba-1c68a4efabdc", "num": "1", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:30:00", "day": "12/16", "time": "15:30", "children": [{ "val": "3", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "d", "reviewfilder": "e" }, { "id": "3d985cda-111b-45ca-86f3-8b2dcac8dbb3", "num": "2", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:30:00", "day": "12/16", "time": "15:30", "children": [{ "val": "3", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "d", "reviewfilder": "e" }, { "id": "cb268eb8-747d-40fa-bff1-67de42381404", "num": "3", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:45:00", "day": "12/16", "time": "15:45", "children": [{ "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "y", "reviewfilder": "h" }, { "id": "537ee2f9-1658-4f15-8b68-11414d5bdcff", "num": "4", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:45:00", "day": "12/16", "time": "15:45", "children": [{ "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "y", "reviewfilder": "h" }, { "id": "a2e39b77-1b18-4ead-a3a1-0b478468dbc8", "num": "5", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:55:00", "day": "12/16", "time": "15:55", "children": [{ "val": "6", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "8", "isoutrule": "" }, { "val": "6", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "l" }, { "id": "8f79ed50-fcc6-4c12-a2f9-b97930819825", "num": "6", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-16T15:55:00", "day": "12/16", "time": "15:55", "children": [{ "val": "6", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "8", "isoutrule": "" }, { "val": "6", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "l" }, { "id": "140a5cef-c19a-4300-a87c-20aa7bfbb40f", "num": "7", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-17T02:20:00", "day": "12/17", "time": "2:20", "children": [{ "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "k" }, { "id": "5bdf0dbf-7c5e-4f8d-91d6-337547d61c67", "num": "8", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-17T02:20:00", "day": "12/17", "time": "2:20", "children": [{ "val": "5", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "j", "reviewfilder": "k" }, { "id": "a9c4ee50-3f81-464b-a34f-2ddeb494c64f", "num": "9", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-18T02:30:00", "day": "12/18", "time": "2:30", "children": [{ "val": "5", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "k", "reviewfilder": "l" }, { "id": "dd4b7503-cde4-4b5a-8068-b69b6463ccd7", "num": "10", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-18T02:30:00", "day": "12/18", "time": "2:30", "children": [{ "val": "5", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "6", "isoutrule": "" }, { "val": "7", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "k", "reviewfilder": "l" }, { "id": "37de771f-4e55-4198-b351-2740f71e132d", "num": "11", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-19T12:00:00", "day": "12/19", "time": "12:0", "children": [{ "val": "3", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "5", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "7", "isoutrule": "" }], "factfilder": "4", "reviewfilder": "9" }, { "id": "27a48fa6-225c-457c-b5c7-146da80fecbe", "num": "12", "rr": null, "val": null, "isoutrule": null, "datetime": "2018-12-19T13:00:00", "day": "12/19", "time": "13:0", "children": [{ "val": "1", "isoutrule": "" }, { "val": "2", "isoutrule": "" }, { "val": "3", "isoutrule": "" }, { "val": "4", "isoutrule": "" }, { "val": "5", "isoutrule": "" }], "factfilder": "4", "reviewfilder": "5" }]'
//var gggggg = '[{"id":"47cce430-bf55-4400-80fa-e7c546a2d4d2","num":"1","rr":null,"val":null,"isoutrule":null,"datetime":"2019-11-01T12:00:00","day":"01/11","time":"12:00","children":[{"val":"2","isoutrule":""},{"val":"2","isoutrule":""},{"val":"2","isoutrule":""},{"val":"2","isoutrule":""},{"val":"2","isoutrule":""}],"factfilder":"2","reviewfilder":"2"},{"id":"153aeec3-f490-46d5-ac2b-95ab15b6dd74","num":"2","rr":null,"val":null,"isoutrule":null,"datetime":"2019-11-01T15:00:00","day":"01/11","time":"15:00","children":[{"val":"5","isoutrule":""},{"val":"22","isoutrule":""},{"val":"2","isoutrule":""},{"val":"2","isoutrule":""},{"val":"2","isoutrule":""}],"factfilder":"2","reviewfilder":"2"},{"id":"aa8c84bd-ad38-4736-8b93-03ca62ddaa47","num":"3","rr":null,"val":null,"isoutrule":null,"datetime":"2019-11-11T12:00:00","day":"11/11","time":"12:00","children":[{"val":"54","isoutrule":""},{"val":"544","isoutrule":""},{"val":"4","isoutrule":""},{"val":"5","isoutrule":""},{"val":"12","isoutrule":""}],"factfilder":"2202","reviewfilder":"22"},{"id":"08a7d56f-1cfa-40da-9974-741930df4e88","num":"4","rr":null,"val":null,"isoutrule":null,"datetime":"2019-11-11T12:00:00","day":"11/11","time":"12:00","children":[{"val":"54","isoutrule":""},{"val":"544","isoutrule":""},{"val":"4","isoutrule":""},{"val":"5","isoutrule":""},{"val":"12","isoutrule":""}],"factfilder":"2202","reviewfilder":"22"}]'
//initmiddlechart(gggggg);
function initmiddlechart(middledata) {
    IDarray.length = 0;
    var middledataobj = JSON.parse(middledata);
    var tableId = document.getElementById("table2");
   
    //清空数据
    for (var j = 1; j < 31; j++) {
        for (var i = 1; i < 36; i++)
        {
            if(i!=24||i!=12)
            {
                tableId.rows[i].cells[j].innerHTML = "";
            }
        }     
    }
    //给列表赋值
    var coum;
    if (middledataobj.length >= 30) {
        coum = 31;
    }
    else {
        coum = middledataobj.length + 1;
    }
    for (var j = 1; j < coum; j++) {
        IDarray.push(middledataobj[j - 1].id);
        tableId.rows[1].cells[j].innerHTML = middledataobj[j - 1].day;
        tableId.rows[2].cells[j].innerHTML = middledataobj[j - 1].time;
        tableId.rows[3].cells[j].innerHTML = middledataobj[j - 1].children[0].val;
        tableId.rows[4].cells[j].innerHTML = middledataobj[j - 1].children[1].val;
        tableId.rows[5].cells[j].innerHTML = middledataobj[j - 1].children[2].val;
        tableId.rows[6].cells[j].innerHTML = middledataobj[j - 1].children[3].val;
        tableId.rows[7].cells[j].innerHTML = middledataobj[j - 1].children[4].val;
        tableId.rows[10].cells[j].innerHTML = middledataobj[j - 1].factfilder;
        tableId.rows[11].cells[j].innerHTML = middledataobj[j - 1].reviewfilder;
        if ((j + 29) < middledataobj.length) {
            IDarray.push(middledataobj[j + 29].id);
            tableId.rows[13].cells[j].innerHTML = middledataobj[j + 29].day;
            tableId.rows[14].cells[j].innerHTML = middledataobj[j + 29].time;
            tableId.rows[15].cells[j].innerHTML = middledataobj[j + 29].children[0].val;
            tableId.rows[16].cells[j].innerHTML = middledataobj[j + 29].children[1].val;
            tableId.rows[17].cells[j].innerHTML = middledataobj[j + 29].children[2].val;
            tableId.rows[18].cells[j].innerHTML = middledataobj[j + 29].children[3].val;
            tableId.rows[19].cells[j].innerHTML = middledataobj[j + 29].children[4].val;
            tableId.rows[22].cells[j].innerHTML = middledataobj[j + 29].factfilder;
            tableId.rows[23].cells[j].innerHTML = middledataobj[j + 29].reviewfilder;
        }
        if ((j + 59) < middledataobj.length) {
            IDarray.push(middledataobj[j + 59].id);
            tableId.rows[25].cells[j].innerHTML = middledataobj[j + 59].day;
            tableId.rows[26].cells[j].innerHTML = middledataobj[j + 59].time;
            tableId.rows[27].cells[j].innerHTML = middledataobj[j + 59].children[0].val;
            tableId.rows[28].cells[j].innerHTML = middledataobj[j + 59].children[1].val;
            tableId.rows[29].cells[j].innerHTML = middledataobj[j + 59].children[2].val;
            tableId.rows[30].cells[j].innerHTML = middledataobj[j + 59].children[3].val;
            tableId.rows[31].cells[j].innerHTML = middledataobj[j + 59].children[4].val;
            tableId.rows[32].cells[j].innerHTML = middledataobj[j + 59].factfilder;
            tableId.rows[33].cells[j].innerHTML = middledataobj[j + 59].reviewfilder;
        }
    }


    calmean("array1");
    calmean("array2");
    calmean("array3");
}
 
function intpid(spid)
{    
    PID = spid;
}

function intmode(mode) {
	CalculationMode = mode;
	if (CalculationMode == "1") {
		$("#LSL").attr("disabled", false);
		$("#USL").attr("disabled", false);
	}
	if (CalculationMode == "2") {
		$("#LSL").val("");
		$("#USL").attr("disabled", false);
		$("#LSL").attr("disabled", true);
		//SendHeadChartValue("LSL", "");
	}
	if (CalculationMode == "3") {
		$("#USL").val("");
		$("#USL").attr("disabled", true);
		$("#LSL").attr("disabled", false);
		//SendHeadChartValue("USL", "");
	}
}

function getxrcpk(xxrrcpk)
{
    var xmean = xxrrcpk.split("_")[0];
    var rr = xxrrcpk.split("_")[1];
    var cp = xxrrcpk.split("_")[2];
    var cpk = xxrrcpk.split("_")[3];
    var ruclr = xxrrcpk.split("_")[4];
    var rlclr = xxrrcpk.split("_")[5];
    var luclr = xxrrcpk.split("_")[6];
    var llclr = xxrrcpk.split("_")[7];
    var sigma = xxrrcpk.split("_")[8];
    var max = xxrrcpk.split("_")[9];
    var min = xxrrcpk.split("_")[10];
    var nn = xxrrcpk.split("_")[11];

    //中表数据
    document.getElementById("xx").innerHTML = xmean;
    document.getElementById("rr").innerHTML = rr;
    document.getElementById("cp").innerHTML = cp;
    document.getElementById("cpk").innerHTML = cpk;
   
    //事件表数据
    document.getElementById("LX").innerHTML = xmean;
    document.getElementById("LR").innerHTML = rr;
    document.getElementById("ULCX").innerHTML = luclr;
    document.getElementById("ULCR").innerHTML = ruclr;
    document.getElementById("LLCX").innerHTML = llclr;
    document.getElementById("LLCR").innerHTML = rlclr;

    //下端表格数据
    document.getElementById("XN").innerHTML = nn;
    document.getElementById("XMean").innerHTML = xmean;
    document.getElementById("XMax").innerHTML = max;
    document.getElementById("XMin").innerHTML = min;
    document.getElementById("XRange").innerHTML = rr;
    document.getElementById("XStDev").innerHTML = sigma;
    document.getElementById("XCPK").innerHTML = cpk;

    

}

function getgrapcpk(xxrrcpk1)
{
    //柱状图周围数据
    var slsl = xxrrcpk1.split("_")[0];
    var susl = xxrrcpk1.split("_")[1];
    var xmean = xxrrcpk1.split("_")[2];
    var nn = xxrrcpk1.split("_")[3];
    var sigma = xxrrcpk1.split("_")[4];
    var sigma1 = xxrrcpk1.split("_")[5];
    var cp = xxrrcpk1.split("_")[6];
    var cpl = xxrrcpk1.split("_")[7];
    var cpu = xxrrcpk1.split("_")[8];
    var cpk = xxrrcpk1.split("_")[9];
    var oppmusl = xxrrcpk1.split("_")[10];
    var oppmlsl = xxrrcpk1.split("_")[11];
    var oppmtotal = xxrrcpk1.split("_")[12];
    var eppmusl = xxrrcpk1.split("_")[13];
    var eppmlsl = xxrrcpk1.split("_")[14];
    var eppmtotal = xxrrcpk1.split("_")[15];
    var wppmusl = xxrrcpk1.split("_")[16];
    var wppmlsl = xxrrcpk1.split("_")[17];
    var wppmtotal = xxrrcpk1.split("_")[18];
    document.getElementById("Clsl").innerHTML = slsl;
    document.getElementById("Cusl").innerHTML = susl;
    document.getElementById("Cmean").innerHTML = xmean;
    document.getElementById("Csamplenumber").innerHTML = nn;
    document.getElementById("CStDevWith").innerHTML = sigma;
    document.getElementById("CStDevOverall").innerHTML = sigma1;
    document.getElementById("Ccp").innerHTML = cp;
    document.getElementById("Ccpl").innerHTML = cpl;
    document.getElementById("Ccpu").innerHTML = cpu;
    document.getElementById("Ccpk").innerHTML = cpk;
    document.getElementById("COppmusl").innerHTML = oppmusl;
    document.getElementById("COppmlsl").innerHTML = oppmlsl;
    document.getElementById("COppmtotal").innerHTML = oppmtotal;
    //document.getElementById("CEppmusl").innerHTML = eppmusl;
    //document.getElementById("CEppmlsl").innerHTML = eppmlsl;
    //document.getElementById("CEppmtotal").innerHTML = eppmtotal;
    document.getElementById("CEppmusl").innerHTML = (parseFloat(eppmusl) * 10000000).toFixed(1);
    document.getElementById("CEppmlsl").innerHTML = (parseFloat(eppmlsl) * 10000000).toFixed(1);
    document.getElementById("CEppmtotal").innerHTML = (parseFloat(eppmtotal) * 10000000).toFixed(1);
    //document.getElementById("CWppmusl").innerHTML = wppmusl;
    //document.getElementById("CWppmlsl").innerHTML = wppmlsl;
    //document.getElementById("CWppmtotal").innerHTML = wppmtotal;
    document.getElementById("CWppmusl").innerHTML = (parseFloat(eppmusl) * 10000000).toFixed(1);
    document.getElementById("CWppmlsl").innerHTML = (parseFloat(eppmlsl) * 10000000).toFixed(1);
    document.getElementById("CWppmtotal").innerHTML = (parseFloat(eppmtotal) * 10000000).toFixed(1);
}

function getrule()
{
    var rule = new Drule();
    var check1 = document.getElementById("check1").checked;
    var check2 = document.getElementById("check2").checked;
    var check3 = document.getElementById("check3").checked;
    var check4 = document.getElementById("check4").checked;
    var check5 = document.getElementById("check5").checked;
    if (check1)
    {
        rule.r1 = 1;
    }
    else
    {
        rule.r1 = 0;
    }
    if (check2) {
        rule.r2 = 1;
    }
    else {
        rule.r2 = 0;
    }
    if (check3) {
        rule.r3 = 1;
    }
    else {
        rule.r3 = 0;
    }
    if (check4) {
        rule.r4 = 1;
    }
    else {
        rule.r4 = 0;
    }
    if (check5) {
        rule.r5 = 1;
    }
    else {
        rule.r5 = 0;
    }
    return rule;
}

function getmiddledata() {
    //alert(IDarray.length);
    var tableId = document.getElementById("table2");
    var list = new Array();
    for(var ii=1;ii<31;ii++)
    {
        if(!isNaN(parseFloat(tableId.rows[8].cells[ii].innerHTML)))
        {
            var data = new MiddleChartDataItem();
            if((ii-1)<IDarray.length)
            {
                data.id=IDarray[ii-1];
            }
            else
            {
                data.id==null;
            }
            
            if(tableId.rows[1].cells[ii].innerHTML!="")
            {
                data.day = tableId.rows[1].cells[ii].innerHTML;
            }
            if(tableId.rows[2].cells[ii].innerHTML!="")
            {
                data.hourminute = tableId.rows[2].cells[ii].innerHTML;
            }
            if(tableId.rows[3].cells[ii].innerHTML!="")
            {
                data.record1 = tableId.rows[3].cells[ii].innerHTML;
            }
            if(tableId.rows[4].cells[ii].innerHTML!="")
            {
                data.record2 = tableId.rows[4].cells[ii].innerHTML
            }
            if(tableId.rows[5].cells[ii].innerHTML!="")
            {
                data.record3 = tableId.rows[5].cells[ii].innerHTML
            }
            if(tableId.rows[6].cells[ii].innerHTML!="")
            {
                data.record4 = tableId.rows[6].cells[ii].innerHTML
            }
            if(tableId.rows[7].cells[ii].innerHTML!="")
            {
                data.record5 = tableId.rows[7].cells[ii].innerHTML
            }
            if(tableId.rows[10].cells[ii].innerHTML!="")
            {
                data.factfilder = tableId.rows[10].cells[ii].innerHTML
            }
            if(tableId.rows[11].cells[ii].innerHTML!="")
            {
                data.review = tableId.rows[11].cells[ii].innerHTML
            }
            list.push(data);
        }
    }

    for (var ii = 31; ii < 61; ii++) {
        if (!isNaN(parseFloat(tableId.rows[20].cells[ii-30].innerHTML))) {
            var data = new MiddleChartDataItem();
            if ((ii - 1) < IDarray.length) {
                data.id = IDarray[ii - 1];
            }
            else {
                data.id == null;
            }

            if (tableId.rows[13].cells[ii-30].innerHTML != "") {
                data.day = tableId.rows[1].cells[ii-30].innerHTML;
            }
            if (tableId.rows[14].cells[ii-30].innerHTML != "") {
                data.hourminute = tableId.rows[2].cells[ii-30].innerHTML;
            }
            if (tableId.rows[15].cells[ii-30].innerHTML != "") {
                data.record1 = tableId.rows[3].cells[ii-30].innerHTML;
            }
            if (tableId.rows[16].cells[ii-30].innerHTML != "") {
                data.record2 = tableId.rows[4].cells[ii-30].innerHTML
            }
            if (tableId.rows[17].cells[ii-30].innerHTML != "") {
                data.record3 = tableId.rows[5].cells[ii-30].innerHTML
            }
            if (tableId.rows[18].cells[ii-30].innerHTML != "") {
                data.record4 = tableId.rows[6].cells[ii-30].innerHTML
            }
            if (tableId.rows[19].cells[ii-30].innerHTML != "") {
                data.record5 = tableId.rows[7].cells[ii-30].innerHTML
            }
            if (tableId.rows[22].cells[ii-30].innerHTML != "") {
                data.factfilder = tableId.rows[10].cells[ii-30].innerHTML
            }
            if (tableId.rows[23].cells[ii-30].innerHTML != "") {
                data.review = tableId.rows[11].cells[ii-30].innerHTML
            }
            list.push(data);
        }
    }

    for (var ii = 61; ii < 91; ii++) {
        if (!isNaN(parseFloat(tableId.rows[32].cells[ii-60].innerHTML))) {
            var data = new MiddleChartDataItem();
            if ((ii - 1) < IDarray.length) {
                data.id = IDarray[ii - 1];
            }
            else {
                data.id == null;
            }

            if (tableId.rows[25].cells[ii - 60].innerHTML != "") {
                data.day = tableId.rows[1].cells[ii - 60].innerHTML;
            }
            if (tableId.rows[26].cells[ii - 60].innerHTML != "") {
                data.hourminute = tableId.rows[2].cells[ii - 60].innerHTML;
            }
            if (tableId.rows[27].cells[ii - 60].innerHTML != "") {
                data.record1 = tableId.rows[3].cells[ii - 60].innerHTML;
            }
            if (tableId.rows[28].cells[ii - 60].innerHTML != "") {
                data.record2 = tableId.rows[4].cells[ii - 60].innerHTML
            }
            if (tableId.rows[29].cells[ii - 60].innerHTML != "") {
                data.record3 = tableId.rows[5].cells[ii - 60].innerHTML
            }
            if (tableId.rows[30].cells[ii - 60].innerHTML != "") {
                data.record4 = tableId.rows[6].cells[ii - 60].innerHTML
            }
            if (tableId.rows[31].cells[ii - 60].innerHTML != "") {
                data.record5 = tableId.rows[7].cells[ii - 60].innerHTML
            }
            if (tableId.rows[34].cells[ii - 60].innerHTML != "") {
                data.factfilder = tableId.rows[10].cells[ii - 60].innerHTML
            }
            if (tableId.rows[35].cells[ii - 60].innerHTML != "") {
                data.review = tableId.rows[11].cells[ii - 60].innerHTML
            }
            list.push(data);
        }
       
    }

    return list;
}

function intbackground() {
    var tableId = document.getElementById("table2");
    for (var ii = 1; ii < 31; ii++) {
        for (var jj = 3; jj < 8; jj++) {         
            tableId.rows[jj].cells[ii].style.backgroundColor = "white";    
        }
        for (var jj = 15; jj < 20; jj++) {
            tableId.rows[jj].cells[ii].style.backgroundColor = "white";
        }
        for (var jj = 27; jj < 32; jj++) {
            tableId.rows[jj].cells[ii].style.backgroundColor = "white";
        }
    }
}

//inittwochart("项目1");
function inittwochart(pname)
{
    var tableId = document.getElementById("table2");
    var xxzarray = new Array();
    for (var i = 1; i < 91; i++) {
        xxzarray.push(i);
    }
    var yyzarray = new Array();
    var yyrarray = new Array();

    for(var ii=1;ii<31;ii++){
        if(!isNaN(parseFloat(tableId.rows[8].cells[ii].innerHTML))){
            yyzarray.push(parseFloat(tableId.rows[8].cells[ii].innerHTML));
            yyrarray.push(parseFloat(tableId.rows[9].cells[ii].innerHTML));
        }
    }

    for (var ii = 31; ii < 61; ii++) {
        if (!isNaN(parseFloat(tableId.rows[20].cells[ii-30].innerHTML))) {
            yyzarray.push(parseFloat(tableId.rows[20].cells[ii].innerHTML));
            yyrarray.push(parseFloat(tableId.rows[21].cells[ii].innerHTML));
        }
    }
        
  

    for (var ii = 61; ii < 91; ii++) {
        if (!isNaN(parseFloat(tableId.rows[32].cells[ii-60].innerHTML))) {
            yyzarray.push(parseFloat(tableId.rows[32].cells[ii].innerHTML));
            yyrarray.push(parseFloat(tableId.rows[33].cells[ii].innerHTML));
        }
    }
    var pname1 = "Average 均值";
    var pname2 = "Range 极值";
    intchart(Chart1, "main", pname1, xxzarray, yyzarray, USL, LSL)
    intchart(Chart2, "main1", pname2, xxzarray, yyrarray, USL, LSL)
}


//initcpkchart("64.05,224.900030422876");
function initcpkchart(meansandsigmas)
{
    
    //var means = 5.2;
    //var sigmas = 1.027;
    var means = meansandsigmas.split(",")[0];
    var sigmas = meansandsigmas.split(",")[1];
    //先按假数据模拟生成正态曲线
    //var xarrayx=new Array();
    //for (var i = 0; i < 10; i++)
    //{
    //    xarrayx.push(i);
    //}

    //var yarrayy = new Array();
    //if (sigmas != 0)
    //{
    //    for (var j = 0; j < 10; j++)
    //    {
    //        var esd = (1 / sigmas / (Math.pow((2 * Math.PI), 0.5))) * Math.pow(Math.E, -Math.pow((xarrayx[j] - means), 2) / 2 / Math.pow(sigmas, 2));
    //        yarrayy.push(esd);
    //    }
    //}
    //else
    //{
    //    for (var j = 0; j < 10; j++)
    //    {
    //        var esd = (1 / sigmas / (Math.pow((2 * Math.PI), 0.5))) * Math.pow(Math.E, -Math.pow((xarrayx[j] - means), 2) / 2);
    //        yarrayy.push(esd);
    //    }
    //}

    //var dataxy = new Array()
    //{
    //    for (var j = 0; j < 10; j++)
    //    {
    //        dataxy.push([xarrayx[j], yarrayy[j]*100]);
    //    }
    //}
    if (myChart == null)
    {
        myChart = echarts.init(document.getElementById('chart'));
    } 
    //获取数据
    var CPKY = new Array();
    var tableId = document.getElementById("table2");
    for (var ii = 1; ii < 31; ii++) {
        if (!isNaN(parseFloat(tableId.rows[3].cells[ii].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[3].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[4].cells[ii].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[4].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[5].cells[ii].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[5].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[6].cells[ii].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[6].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[7].cells[ii].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[7].cells[ii].innerHTML));
        }
    }

    for (var ii = 31; ii < 61; ii++) {
        if (!isNaN(parseFloat(tableId.rows[15].cells[ii - 30].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[15].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[16].cells[ii - 30].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[16].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[17].cells[ii - 30].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[17].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[18].cells[ii - 30].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[18].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[19].cells[ii - 30].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[19].cells[ii].innerHTML));
        }
    }

    for (var ii = 61; ii < 91; ii++) {
        if (!isNaN(parseFloat(tableId.rows[31].cells[ii - 60].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[31].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[30].cells[ii - 60].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[30].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[29].cells[ii - 60].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[29].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[28].cells[ii - 60].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[28].cells[ii].innerHTML));
        }
        if (!isNaN(parseFloat(tableId.rows[27].cells[ii - 60].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[27].cells[ii].innerHTML));
        }
    }


    var mmaaxx = Math.max.apply(null, CPKY)

    ////全为0则清掉图表
    //if (mmaaxx == 0)
    //{
    //    if (myChart == null) {
    //        myChart.clear();
    //    }
    //    return;
    //}

    //全为一样的数值则清掉图表
    if (mmaaxx === Math.min.apply(null, CPKY))
    {
        if (myChart !== null) {
            myChart.clear();
        }
        return;
    }




    
    //确定间距
    var sdf = Math.floor(Math.pow(CPKY.length, 0.5));
    var arrnumber = sdf;
    //var arrnumber = 5;
    var det = ((Math.max.apply(null, CPKY) - Math.min.apply(null, CPKY)) / arrnumber);
    var mininter = 2;
    var USL = parseFloat(document.getElementById("USL").innerHTML) || 9;
    var LSL = parseFloat(document.getElementById("LSL").innerHTML) || 1;

    var xarrayx = new Array();
    
   
    //确定横坐标每组宽度
    var X_Y = new Array();
    for (var i = 0; i < arrnumber; i++) {
        X_Y[i] = new Array();
        X_Y[i][0] = Math.min.apply(null, CPKY) + i * det;
        var lit = Math.min.apply(null, CPKY) + (i + 1) * det;
        var ss = 0
        for (var j = 0; j < CPKY.length; j++) {
            if (i !== arrnumber - 1)
            {
                if (CPKY[j] >= X_Y[i][0] && CPKY[j] < lit) {
                    ss = ss + 1;
                }
            }
            else if (i == arrnumber - 1)
            {
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
            text: 'Process Capability Weight',
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
            smooth:0.5,
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

//var sdfas = '[{ "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "4", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "4", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "5", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "6", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "3", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "4", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "5", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "6", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "5", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "6", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "6", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "6", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "8", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "4", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "5", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "5", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "6", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "4", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "5", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "6", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "6", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }]'
//var sdfas = '[{ "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "4", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "1d15780b-c36f-4fb8-a740-77cbd018e9fd", "num": null, "rr": null, "val": "4", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }]'
//var sdfas = '[{ "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "3", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "3", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "8", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "8", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "6", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "3", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "7", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "1", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "2", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "3", "isoutrule": "1", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "4", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }, { "id": "00000000-0000-0000-0000-000000000000", "num": null, "rr": null, "val": "5", "isoutrule": "", "datetime": "0001-01-01T00:00:00", "day": null, "time": null, "children": null, "factfilder": null, "reviewfilder": null }]'
//initpanyi(sdfas);
function initpanyi(sdfas1)
{
    var middledataobj = JSON.parse(sdfas1);

    var tableId = document.getElementById("table2");
    //判断样本个数

    var number = 0;
    for (var m = 3; m < 8; m++)
    {
        if (!isNaN(parseFloat(tableId.rows[m].cells[2].innerHTML))) {
            number = number + 1
        }
    }
    var flag = 0;



    for (var ii = 1; ii < 31; ii++) {
        for (var jj = 3; jj < number+3; jj++)
        {
            if (!isNaN(parseFloat(tableId.rows[jj].cells[ii].innerHTML))) {               
                if (middledataobj[flag].isoutrule) {
                    tableId.rows[jj].cells[ii].style.backgroundColor = "red";
                }
                flag = flag + 1;
            }
        }
    }

    for (var ii = 31; ii < 61; ii++) {
        for (var jj = 15; jj < number + 15; jj++) {
            if (!isNaN(parseFloat(tableId.rows[jj].cells[ii-29].innerHTML))) {
                if (middledataobj[flag].isoutrule) {
                    tableId.rows[jj].cells[ii - 29].style.backgroundColor = "red";
                }
                flag = flag + 1;
            }
        }
    }

    for (var ii = 61; ii < 91; ii++) {
        for (var jj = 27; jj < number + 27; jj++) {
            if (!isNaN(parseFloat(tableId.rows[jj].cells[ii-59].innerHTML))) {
                if (middledataobj[flag].isoutrule) {
                    tableId.rows[jj].cells[ii-59].style.backgroundColor = "red";
                }
                flag = flag + 1;
            }
        }
    }
   
}

function clearmiddlechart() {
    //清空数据
    for (var j = 1; j < 31; j++) {
        for (var i = 1; i < 36; i++) {
            if (i != 24 || i != 12) {
                tableId.rows[i].cells[j].innerHTML = "";
            }
        }
    }
   
    //中表数据
    document.getElementById("xx").innerHTML = "";
    document.getElementById("rr").innerHTML = "";
    document.getElementById("cp").innerHTML = "";
    document.getElementById("cpk").innerHTML = "";

    //事件表数据
    document.getElementById("LX").innerHTML = "";
    document.getElementById("LR").innerHTML = "";
    document.getElementById("ULCX").innerHTML = "";
    document.getElementById("ULCR").innerHTML = "";
    document.getElementById("LLCX").innerHTML = "";
    document.getElementById("LLCR").innerHTML = "";

    //下端表格数据
    document.getElementById("XN").innerHTML = "";
    document.getElementById("XMean").innerHTML = "";
    document.getElementById("XMax").innerHTML = "";
    document.getElementById("XMin").innerHTML = "";
    document.getElementById("XRange").innerHTML = "";
    document.getElementById("XStDev").innerHTML = "";
    document.getElementById("XCPK").innerHTML = "";

    //表周围的数据显示
    document.getElementById("Clsl").innerHTML = "";
    document.getElementById("Cusl").innerHTML = "";
    document.getElementById("Cmean").innerHTML = "";
    document.getElementById("Csamplenumber").innerHTML = "";
    document.getElementById("CStDevWith").innerHTML = "";
    document.getElementById("CStDevOverall").innerHTML = "";
    document.getElementById("Ccp").innerHTML = "";
    document.getElementById("Ccpl").innerHTML = "";
    document.getElementById("Ccpu").innerHTML = "";
    document.getElementById("Ccpk").innerHTML = "";

    //清空图的数据
    if (Chart1 !== null) {
        Chart1.clear();
    }
    if (Chart2 !== null) {
        Chart2.clear();
    }
    if (myChart !== null) {
        myChart.clear();
    }
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
            var res = inputyanzheng(inputtext, inputid);
            if (res)
			{
                SendHeadChartValue(inputid, inputtext)
            }
            else
            {
                $(this).val("");
            }
           
        }
    });

    //处理文本框失去焦点的事件
    headtableinput.blur(function () {
        
        //if (PID == null) {
        //    alert("请选择项目再录入数据");
        //    return;
        //}
        var inputtext = $(this).val();
        var inputid = $(this).attr('id');
        var res = inputyanzheng(inputtext, inputid);
        if (res) {
            SendHeadChartValue(inputid, inputtext)
        }
        else {
            $(this).val("");
        }
    })
}

function BangMiddleEvent() {
    var headtableinput = $("#table2 td");

    //绑定响应回车事件
    headtableinput.keyup(function (event) {
        //获取当前按下键盘的键值
        var keycode = event.which;
        //处理回车的情况
        if (keycode == 13) {
           var inputtext = $(this).text();
            //判断输入是否是正确格式，验证不通过
           var res= inputyanzheng(inputtext, $(this).parent().attr("name"));

            //判断其位置
           if (res)
           {
               
               console.log($(this).parent().attr("name"));
               calmean($(this).parent().attr("name"));
           }
           else
           {
               $(this).html("");
           }
            
        }
    });

    //处理文本框失去焦点的事件
    headtableinput.blur(function () {
       
        //if (PID == null) {
        //    alert("请选择项目再录入数据");
        //    true;
        //}
        var inputtext = $(this).text();
        $(this).parent();
        var res = inputyanzheng(inputtext, $(this).parent().attr("name"));
        if (res) {
           
            console.log($(this).parent().attr("name"));
            calmean($(this).parent().attr("name"));
        }
        else
        {
            $(this).html("");
        }
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
        //   {
        //       text: title,
        //       left: "center",
        //       //backgroundColor: "#e8e8e8",
        //       textStyle: {
        //           fonySize: 16,
        //           color: "#333333",
        //       }
        //   },
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
            name: title
        }],
        series: [{
            name: title,
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
BangHeadEvent();
BangMiddleEvent();


//点击左侧菜单蓝时初始化图表的头
var xA = new Array();
for (var i = 1; i < 91; i++) {
    xA.push(i);
}
optionmb1 = {
    //title:
    //       {
    //           text: "Process Means 过程参数均值 ",
    //           left: "center",
    //           //backgroundColor: "#e8e8e8",
    //           textStyle: {
    //               fonySize: 16,
    //               color: "#333333",
    //           }
    //       },
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
        data: xA
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        },
        name: 'Means 均值'
    }],
    series: [{
        name: 'Means 均值',
        type: 'line',
    }]
};
optionmb2 = {
    //title:
    //       {
    //           text: "Process Ranges 过程参数极值",
    //           left: "center",
    //           //backgroundColor: "#e8e8e8",
    //           textStyle: {
    //               fonySize: 16,
    //               color: "#333333",
    //           }
    //       },
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
        data: xA
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        },
        name: 'Ranges 极值'
    }],
    series: [{
        name: 'Ranges 极值',
        type: 'line',
    }]
};
optionmb3 = {
    title: {
        text: 'Process Capability Weight',
        //sublink: 'https://github.com/ecomfe/echarts-stat',
        left: 'center',
        top: 10
    },
    color: ['rgb(25, 183, 207)'],
    grid: {
        x: 35,
        y: 55,
        x2: 35,
        y2: 50,
        borderWidth: 1
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        },
    }],
    series: [{
        name: '检测温度',
        type: 'line',
    }]
};
Chart1 = echarts.init(document.getElementById('main'));
Chart1.setOption(optionmb1);
Chart2 = echarts.init(document.getElementById('main1'));
Chart2.setOption(optionmb2);
myChart = echarts.init(document.getElementById('chart'));
myChart.setOption(optionmb3)

//section 6 页面内部方法
function calmean(name)
{
    if(name=="array1"){
        //计算第一排
        var tableId = document.getElementById("table2");
        for (var j = 1; j < 31; j++) {
            var result = NaN;
            var recoarray = new Array();
            var flag = 0;
            for (var i = 3; i < 8; i++)
            {
                if(!isNaN(parseFloat(tableId.rows[i].cells[j].innerHTML)))
                {
                    if (isNaN(result))
                    {
                        result = parseFloat(parseFloat(tableId.rows[i].cells[j].innerHTML).toFixed(2));
                        flag = flag + 1;
                    }
                    else
                    {
                        result = result + parseFloat(parseFloat(tableId.rows[i].cells[j].innerHTML).toFixed(2));
                        flag = flag + 1;
                    }
                    recoarray.push(parseFloat(tableId.rows[i].cells[j].innerHTML));
                }
            }
            if (!isNaN(result))
            {
                tableId.rows[8].cells[j].innerHTML = (result / flag).toFixed(2);
            }

            if(recoarray.length>1)
            {
                var maxN = Math.max.apply(null, recoarray);
                var minN = Math.min.apply(null, recoarray);
                tableId.rows[9].cells[j].innerHTML = (maxN - minN).toFixed(2);
            }
            if(recoarray.length==1)
            {
                tableId.rows[9].cells[j].innerHTML = recoarray[0];
            }

            if(flag==0)
            {
                tableId.rows[9].cells[j].innerHTML = "";
                tableId.rows[8].cells[j].innerHTML = "";
            }

        }
    }
    if(name == "array2") {
        //计算第二排
        var tableId = document.getElementById("table2");
        for (var j = 1; j < 31; j++) {
            var result = NaN;
            var recoarray = new Array();
            var flag = 0;
            for (var i = 15; i < 19; i++) {
                if (!isNaN(parseFloat(tableId.rows[i].cells[j].innerHTML))) {
                    if (isNaN(result)) {
                        result = parseFloat(parseFloat(tableId.rows[i].cells[j].innerHTML).toFixed(2));
                        flag = flag + 1;
                    }
                    else {
                        result = result + parseFloat(parseFloat(tableId.rows[i].cells[j].innerHTML).toFixed(2));
                        flag = flag + 1;
                    }
                    recoarray.push(parseFloat(tableId.rows[i].cells[j].innerHTML));
                }
            }
            if (!isNaN(result)) {
                tableId.rows[20].cells[j].innerHTML = (result / flag).toFixed(2);
            }

            if (recoarray.length > 1) {
                var maxN = Math.max.apply(null, recoarray);
                var minN = Math.min.apply(null, recoarray);
                tableId.rows[21].cells[j].innerHTML = (maxN - minN).toFixed(2);
            }
            if (recoarray.length == 1) {
                tableId.rows[21].cells[j].innerHTML = recoarray[0];
            }
            if (flag == 0) {
                tableId.rows[20].cells[j].innerHTML = "";
                tableId.rows[21].cells[j].innerHTML = "";
            }
        }
    }
    if(name == "array3") {
        //计算第一排
        var tableId = document.getElementById("table2");
        for (var j = 1; j < 31; j++) {
            var result = NaN;
            var recoarray = new Array();
            var flag = 0;
            for (var i = 27; i < 31; i++) {
                if (!isNaN(parseFloat(tableId.rows[i].cells[j].innerHTML))) {
                    if (isNaN(result)) {
                        result = parseFloat(parseFloat(tableId.rows[i].cells[j].innerHTML).toFixed(2));
                        flag = flag + 1;
                    }
                    else {
                        result = result + parseFloat(parseFloat(tableId.rows[i].cells[j].innerHTML).toFixed(2));
                        flag = flag + 1;
                    }
                    recoarray.push(parseFloat(tableId.rows[i].cells[j].innerHTML));
                }
            }
            if (!isNaN(result)) {
                tableId.rows[32].cells[j].innerHTML = (result / flag).toFixed(2);
            }

            if (recoarray.length > 1) {
                var maxN = Math.max.apply(null, recoarray);
                var minN = Math.min.apply(null, recoarray);
                tableId.rows[33].cells[j].innerHTML = (maxN - minN).toFixed(2);
            }
            if (recoarray.length == 1) {
                tableId.rows[33].cells[j].innerHTML = recoarray[0];
            }

            if (flag == 0) {
                tableId.rows[32].cells[j].innerHTML = "";
                tableId.rows[33].cells[j].innerHTML = "";
            }
        }
    }
}

//导出功能
function daochu()
{
    html2canvas(document.getElementById("log"), {
        onrendered: function (canvas) {
            var imgURL = canvas.toDataURL("image/png");
            $('#myIMG').attr("src", imgURL);
            $('#b').on('click', function () {
                $('#down_qr').attr('download', imgURL);
                $('#down_qr').attr('href', imgURL);
                document.getElementById('down_qr').click();
            });
        }
    });
}


function getbasebianma()
{
    var canvas = document.createElement("canvas")
    canvas.width = 560    // 最终图片宽度280px的2倍，以px为单位
    canvas.height = 630   // 最终图片高度315px的2倍，以px为单位
    let opts = {
        canvas: canvas,                       // 将自定义canvas作为配置项
        useCORS: true,                        // 允许图片跨域
        height: 2620  // 修复截图不完整问题
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


function daochu3()
{
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height + 200;
        ctx.drawImage(img, 0, 0);
        document.getElementById('canvasImg').src = canvas.toDataURL("image/jpeg", 1);
    }
    img.src = 'http://img.hb.aicdn.com/38d8f519b3f464a80d85ed9632fed904ed0181f41d632-ZHrigO_fw658';
}







//输入异常判断
function inputyanzheng(inputvalue,type)
{
    if (inputvalue == "")
    {
        return false;
    }
    //判断日期
    if(type=="data1")
    {
        //日期的正则表达式
        //var reg = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/;
        var reg = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])$/;
        var regExp = new RegExp(reg);
        if (!regExp.test(inputvalue)) {
            jsObj.showMessageBox("日期格式不正确，正确格式为：日/月 如：01/01");
            return false;
        }
        else
        {
            return true;
        }        
    }
    if(type=="time1")
    {
        //时间的正则表达式
        var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d$/;
        var regExp = new RegExp(reg);
        if (!regExp.test(inputvalue)) {
            jsObj.showMessageBox("时间格式不正确，正确格式为：小时/分钟 如：12:00");
            return false;
        }
        else {
            return true;
        }
    }

    if (type == "array1" || type == "array2" || type == "array1" || type=="LSL"|| type=="USL") {
        //时间的正则表达式
        var reg = /^\d+(\.\d+)?$/;
        var regExp = new RegExp(reg);
        if (!regExp.test(inputvalue)) {
            jsObj.showMessageBox("请输入数字");
            return false;
        }
        else {
            return true;
        }
    }

    if(type=="people1")
    {
        return true;
    }

    return true;
}


//清空图表的问题
function clearchartgraph() {
    //清空中间表格数据
    var tableId = document.getElementById("table2");
    for (var j = 1; j < 31; j++) {
        for (var i = 1; i < 36; i++) {
            if (i != 24 || i != 12) {
                tableId.rows[i].cells[j].innerHTML = "";
            }
        }
    }

    //清除计算数据
    //中表数据
    document.getElementById("xx").innerHTML = "";
    document.getElementById("rr").innerHTML = "";
    document.getElementById("cp").innerHTML = "";
    document.getElementById("cpk").innerHTML = "";

    //事件表数据
    document.getElementById("LX").innerHTML = "";
    document.getElementById("LR").innerHTML = "";
    document.getElementById("ULCX").innerHTML = "";
    document.getElementById("ULCR").innerHTML = "";
    document.getElementById("LLCX").innerHTML = "";
    document.getElementById("LLCR").innerHTML = "";

    //下端表格数据
    document.getElementById("XN").innerHTML = "";
    document.getElementById("XMean").innerHTML = "";
    document.getElementById("XMax").innerHTML = "";
    document.getElementById("XMin").innerHTML = "";
    document.getElementById("XRange").innerHTML = "";
    document.getElementById("XStDev").innerHTML = "";
    document.getElementById("XCPK").innerHTML = "";

    //下端图表数据
    document.getElementById("Clsl").innerHTML = "";
    document.getElementById("Cusl").innerHTML = "";
    document.getElementById("Cmean").innerHTML = "";
    document.getElementById("Csamplenumber").innerHTML = "";
    document.getElementById("CStDevWith").innerHTML = "";
    document.getElementById("CStDevOverall").innerHTML = "";
    document.getElementById("Ccp").innerHTML = "";
    document.getElementById("Ccpl").innerHTML = "";
    document.getElementById("Ccpu").innerHTML = "";
    document.getElementById("Ccpk").innerHTML = "";


    //清空两张曲线图
    Chart1.dispose();
    Chart2.dispose();
    Chart1 = echarts.init(document.getElementById('main'));
    Chart1.setOption(optionmb1);
    Chart2 = echarts.init(document.getElementById('main1'));
    Chart2.setOption(optionmb2);


    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart'));
    myChart.setOption(optionmb3);
     
    

}






//c#按钮调用该js方法OpenChart
function OpenChart(id) {
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










////获取x轴数据：
//var xdata = new Array();
//for (var i = 1; i < 81; i++) {
//    xdata.push(i);
//}
//var ydata = new Array();
//for (var m = 0; m < middledataobj.length; m++) {
//    ydata.push(middledataobj[m].val);
//}
//var usl = parseFloat($("#USL").val());
//var lsl = parseFloat($("#LSL").val());

////用数据初始化或者更新图表
//intchart(Chart1, "main", "电流", xdata, ydata, usl, lsl);
////获取数据初始化极差表
//var xdata2 = new Array();
//for (var i = 1; i < 80; i++) {
//    xdata2.push(i);
//}
//var ydata2 = new Array();
//for (var m = 0; m < middledataobj.length - 1; m++) {
//    ydata2.push(middledataobj[m].rr);
//}
//var uslr = parseFloat(document.getElementById("ULCR").innerHTML);
//var lslr = parseFloat(document.getElementById("LLCR").innerHTML);
//alert(uslr);
//intchart(Chart2, "main1", "电流", xdata2, ydata2, uslr, lslr);

////给违反判异规则的点改变背景色
//for (var j = 1; j < tableId.rows[0].cells.length; j++) {
//    if (middledataobj[j - 1].isoutrule) {
//        tableId.rows[3].cells[j].style.backgroundColor = "red";
//    }
//    if (middledataobj[j + 39].isoutrule) {
//        tableId.rows[7].cells[j].style.backgroundColor = "red";
//    }
//}