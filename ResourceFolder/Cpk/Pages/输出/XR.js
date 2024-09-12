//定义全局变量
var PID;
var Chart1;
var Chart2;
var Chart3;
var CalculationMode;
// 保存initheadchart添加的两个参数
var ProductId
var ProcessId

var Drule = function () {
    this.r1 =0;
    this.r2 = 0;
    this.r3 = 0;
    this.r4 = 0;
    this.r5 = 0;
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
        $("#LineNo").val(headdataobj.LineNo);
        $("#SampleSize").val(headdataobj.SampleSize);
        $("#USL").val(headdataobj.USL);
        $("#GageNo").val(headdataobj.GageNo);
        $("#MSAResults").val(headdataobj.MSAResults);   
        ProductId = headdataobj.ProductId
        ProcessId = headdataobj.ProcessId                  
    }
}

//var ssdd = '[{ "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "1", "val": "0", "rr": "0", "datetime": "2018-12-14T13:15:13.8146", "day": "12/14", "time": "13:15", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "2", "val": "0", "rr": "0", "datetime": "2018-12-14T13:15:52.5386", "day": "12/14", "time": "13:15", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "3", "val": "0", "rr": "0", "datetime": "2018-12-14T13:16:12.2906", "day": "12/14", "time": "13:16", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "4", "val": "0", "rr": "0", "datetime": "2018-12-14T13:16:26.6856", "day": "12/14", "time": "13:16", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "5", "val": "0", "rr": "0", "datetime": "2018-12-14T13:16:30.4076", "day": "12/14", "time": "13:16", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "6", "val": "0", "rr": "0", "datetime": "2018-12-17T09:33:57.3968007", "day": "12/17", "time": "9:33", "isoutrule": null }, { "id": "7c3526cc-5a46-41a3-978f-734a40c8ebe7", "num": "7", "val": "0", "rr": null, "datetime": "2018-12-17T09:34:53.4368007", "day": "12/17", "time": "9:34", "isoutrule": null }]';
//var ssdd = '[{ "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "1", "val": "151.13", "rr": "0.591000000000008", "datetime": "2018-12-24T20:44:19.5888517", "day": "12/24", "time": "20:44", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "2", "val": "150.539", "rr": "1.27900000000002", "datetime": "2018-12-25T09:59:08.9514719", "day": "12/25", "time": "9:59", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "3", "val": "151.818", "rr": "0.160000000000025", "datetime": "2018-12-25T09:59:26.899754", "day": "12/25", "time": "9:59", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "4", "val": "151.658", "rr": "1.51899999999998", "datetime": "2018-12-25T09:59:45.7136113", "day": "12/25", "time": "9:59", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "5", "val": "150.139", "rr": "1.679", "datetime": "2018-12-25T10:00:05.1654618", "day": "12/25", "time": "10:0", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "6", "val": "151.818", "rr": "1.07900000000001", "datetime": "2018-12-25T10:10:03.5937669", "day": "12/25", "time": "10:10", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "7", "val": "150.739", "rr": "0.574999999999989", "datetime": "2018-12-25T10:10:20.5570143", "day": "12/25", "time": "10:10", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "8", "val": "151.314", "rr": "0.574999999999989", "datetime": "2018-12-25T10:10:38.6384721", "day": "12/25", "time": "10:10", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "9", "val": "150.739", "rr": "0.200000000000017", "datetime": "2018-12-25T10:31:02.7064273", "day": "12/25", "time": "10:31", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "10", "val": "150.539", "rr": "0.398000000000025", "datetime": "2018-12-25T10:31:19.5082949", "day": "12/25", "time": "10:31", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "11", "val": "150.937", "rr": "0.192999999999984", "datetime": "2018-12-25T10:31:37.9559848", "day": "12/25", "time": "10:31", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "12", "val": "151.13", "rr": "0.183999999999997", "datetime": "2018-12-25T10:31:56.2314623", "day": "12/25", "time": "10:31", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "13", "val": "151.314", "rr": "0.574999999999989", "datetime": "2018-12-25T10:32:14.3801402", "day": "12/25", "time": "10:32", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "14", "val": "150.739", "rr": "0.599999999999994", "datetime": "2018-12-25T10:32:32.6446443", "day": "12/25", "time": "10:32", "isoutrule": null }, { "id": "01ab2edb-33d6-44e8-a236-b4fc8c21d568", "num": "15", "val": "150.139", "rr": null, "datetime": "2018-12-25T10:32:50.8834756", "day": "12/25", "time": "10:32", "isoutrule": null }]'
//var ssdd ='[{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"1","val":"3753.","rr":"235.713","datetime":"2019-06-11T11:40:17.3502534","day":"6/11","time":"11:40","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"2","val":"3517.","rr":"799.299","datetime":"2019-06-11T11:40:35.7033031","day":"6/11","time":"11:40","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"3","val":"4316.","rr":"1385.923","datetime":"2019-06-11T11:40:55.5964409","day":"6/11","time":"11:40","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"4","val":"2930.","rr":"83.2980000000002","datetime":"2019-06-11T11:41:15.6595885","day":"6/11","time":"11:41","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"5","val":"2847.","rr":"444.843","datetime":"2019-06-11T11:41:33.9266333","day":"6/11","time":"11:41","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"6","val":"3292.","rr":"661.061","datetime":"2019-06-11T11:41:52.698707","day":"6/11","time":"11:41","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"7","val":"2631.","rr":"1229.963","datetime":"2019-06-11T11:42:11.3837757","day":"6/11","time":"11:42","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"8","val":"3861.","rr":"1139.577","datetime":"2019-06-11T11:42:29.3608039","day":"6/11","time":"11:42","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"9","val":"2721.","rr":"1385.924","datetime":"2019-06-11T11:42:47.2078247","day":"6/11","time":"11:42","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"10","val":"4107.","rr":"2128.509","datetime":"2019-06-11T11:43:05.3068599","day":"6/11","time":"11:43","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"11","val":"1979.","rr":"428.892","datetime":"2019-06-11T11:43:23.5699045","day":"6/11","time":"11:43","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"12","val":"2408.","rr":"49.6240000000003","datetime":"2019-06-11T11:43:41.6329377","day":"6/11","time":"11:43","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"13","val":"2457.","rr":"863.1","datetime":"2019-06-11T11:43:59.874981","day":"6/11","time":"11:43","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"14","val":"3320.","rr":"391.674","datetime":"2019-06-11T11:44:18.2590326","day":"6/11","time":"11:44","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"15","val":"3712.","rr":"1136.032","datetime":"2019-06-11T11:44:36.3210656","day":"6/11","time":"11:44","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"16","val":"4848.","rr":"228.625","datetime":"2019-06-11T11:44:55.4601603","day":"6/11","time":"11:44","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"17","val":"4619.","rr":"716.001","datetime":"2019-06-11T11:45:13.9302168","day":"6/11","time":"11:45","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"18","val":"3903.","rr":"978.298","datetime":"2019-06-11T11:45:31.9972501","day":"6/11","time":"11:45","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"19","val":"2925.","rr":"513.961","datetime":"2019-06-11T11:45:49.8512713","day":"6/11","time":"11:45","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"20","val":"3439.","rr":"1515.299","datetime":"2019-06-11T11:46:08.3313283","day":"6/11","time":"11:46","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"21","val":"4954.","rr":"1554.289","datetime":"2019-06-11T11:46:27.9994533","day":"6/11","time":"11:46","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"22","val":"3400.","rr":"26.5839999999998","datetime":"2019-06-11T11:46:45.4684525","day":"6/11","time":"11:46","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"23","val":"3427.","rr":"69.1190000000001","datetime":"2019-06-11T11:47:04.045515","day":"6/11","time":"11:47","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"24","val":"3496.","rr":"347.367","datetime":"2019-06-11T11:47:22.2135542","day":"6/11","time":"11:47","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"25","val":"3148.","rr":"63.8020000000001","datetime":"2019-06-11T11:47:40.6796104","day":"6/11","time":"11:47","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"26","val":"3212.","rr":"519.278","datetime":"2019-06-11T11:48:01.5718053","day":"6/11","time":"11:48","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"27","val":"2693.","rr":"2275.608","datetime":"2019-06-11T11:48:20.0948648","day":"6/11","time":"11:48","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"28","val":"4968.","rr":"2022.172","datetime":"2019-06-11T11:48:37.9748875","day":"6/11","time":"11:48","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"29","val":"2946.","rr":"350.912","datetime":"2019-06-12T15:07:20.9077201","day":"6/12","time":"15:7","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"30","val":"3297.","rr":"1428.458","datetime":"2019-06-12T15:07:39.5869576","day":"6/12","time":"15:7","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"31","val":"4726.","rr":"1378.835","datetime":"2019-06-12T15:08:18.6494262","day":"6/12","time":"15:8","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"32","val":"3347.","rr":"971.209","datetime":"2019-06-12T15:08:36.16086","day":"6/12","time":"15:8","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"33","val":"2376.","rr":"40.7629999999999","datetime":"2019-06-12T15:08:54.6316933","day":"6/12","time":"15:8","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"34","val":"2335.","rr":"1781.142","datetime":"2019-06-12T15:09:14.1785276","day":"6/12","time":"15:9","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"35","val":"4116.","rr":"1635.815","datetime":"2019-06-12T15:09:31.6661584","day":"6/12","time":"15:9","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"36","val":"2480.","rr":"462.565","datetime":"2019-06-12T15:10:08.6934247","day":"6/12","time":"15:10","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"37","val":"2943.","rr":"154.189","datetime":"2019-06-12T15:10:27.085857","day":"6/12","time":"15:10","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"38","val":"3097.","rr":"480.288","datetime":"2019-06-12T15:10:45.6030896","day":"6/12","time":"15:10","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"39","val":"3577.","rr":"350.911","datetime":"2019-06-12T15:11:03.0681242","day":"6/12","time":"15:11","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"40","val":"3928.","rr":"1396.557","datetime":"2019-06-12T15:11:21.6165567","day":"6/12","time":"15:11","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"41","val":"2532.","rr":"627.388","datetime":"2019-06-12T15:11:40.1337893","day":"6/12","time":"15:11","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"42","val":"3159.","rr":"83.297","datetime":"2019-06-12T15:11:58.760222","day":"6/12","time":"15:11","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"43","val":"3076.","rr":"856.012","datetime":"2019-06-12T15:12:17.1684569","day":"6/12","time":"15:12","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"44","val":"2220.","rr":"2332.321","datetime":"2019-06-12T15:12:53.3137204","day":"6/12","time":"15:12","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"45","val":"4552.","rr":"1984.954","datetime":"2019-06-12T15:13:11.6973548","day":"6/12","time":"15:13","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"46","val":"2567.","rr":"1660.627","datetime":"2019-06-12T15:13:30.2129881","day":"6/12","time":"15:13","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"47","val":"4228.","rr":"2043.439","datetime":"2019-06-12T15:13:50.7894242","day":"6/12","time":"15:13","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"48","val":"2184.","rr":"202.04","datetime":"2019-06-12T15:14:09.3534568","day":"6/12","time":"15:14","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"49","val":"1982.","rr":"1853.804","datetime":"2019-06-12T15:14:27.9080924","day":"6/12","time":"15:14","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"50","val":"3836.","rr":"1612.774","datetime":"2019-06-12T15:14:45.4269231","day":"6/12","time":"15:14","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"51","val":"2223.","rr":"249.891","datetime":"2019-06-12T15:15:03.9753557","day":"6/12","time":"15:15","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"52","val":"2473.","rr":"1871.528","datetime":"2019-06-12T15:15:40.0426191","day":"6/12","time":"15:15","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"53","val":"4345.","rr":"54.9400000000005","datetime":"2019-06-12T15:15:57.4210496","day":"6/12","time":"15:15","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"54","val":"4290.","rr":"2401.44","datetime":"2019-06-12T15:16:35.5163165","day":"6/12","time":"15:16","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"55","val":"1888.","rr":"402.307","datetime":"2019-06-12T15:16:53.9399489","day":"6/12","time":"15:16","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"56","val":"2291.","rr":"692.962","datetime":"2019-06-12T15:17:12.4727814","day":"6/12","time":"15:17","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"57","val":"2984.","rr":"200.268","datetime":"2019-06-12T15:17:33.0648176","day":"6/12","time":"15:17","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"58","val":"2783.","rr":"19.4950000000003","datetime":"2019-06-12T15:17:52.6116519","day":"6/12","time":"15:17","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"59","val":"2803.","rr":"457.249","datetime":"2019-06-12T15:18:10.0992826","day":"6/12","time":"15:18","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"60","val":"3260.","rr":"83.2979999999998","datetime":"2019-06-12T15:18:28.5953892","day":"6/12","time":"15:18","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"61","val":"3177.","rr":"40.7620000000002","datetime":"2019-06-12T15:18:46.1410109","day":"6/12","time":"15:18","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"62","val":"3136.","rr":"476.743","datetime":"2019-06-12T15:19:05.678862","day":"6/12","time":"15:19","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"63","val":"3613.","rr":"590.169","datetime":"2019-06-12T15:19:23.2444929","day":"6/12","time":"15:19","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"64","val":"3023.","rr":"613.209","datetime":"2019-06-12T15:19:42.8547274","day":"6/12","time":"15:19","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"65","val":"3636.","rr":"3.54500000000007","datetime":"2019-06-12T15:20:01.43436","day":"6/12","time":"15:20","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"66","val":"3639.","rr":"116.971","datetime":"2019-06-12T15:20:18.9907921","day":"6/12","time":"15:20","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"67","val":"3522.","rr":"685.872","datetime":"2019-06-12T15:20:37.5280257","day":"6/12","time":"15:20","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"68","val":"2836.","rr":"264.07","datetime":"2019-06-12T15:20:56.0920583","day":"6/12","time":"15:20","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"69","val":"2572.","rr":"2319.914","datetime":"2019-06-12T15:21:14.5020908","day":"6/12","time":"15:21","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"70","val":"4892.","rr":"1240.596","datetime":"2019-06-12T15:21:32.8955231","day":"6/12","time":"15:21","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"71","val":"3652.","rr":"46.0799999999999","datetime":"2019-06-12T15:21:51.2843561","day":"6/12","time":"15:21","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"72","val":"3698.","rr":"478.516","datetime":"2019-06-12T15:22:09.7089885","day":"6/12","time":"15:22","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"73","val":"3219.","rr":"1389.468","datetime":"2019-06-12T15:22:28.1170208","day":"6/12","time":"15:22","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"74","val":"4609.","rr":"721.318","datetime":"2019-06-12T15:22:47.5440552","day":"6/12","time":"15:22","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"75","val":"3887.","rr":"1029.695","datetime":"2019-06-12T15:23:05.9540877","day":"6/12","time":"15:23","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"76","val":"2858.","rr":"347.367","datetime":"2019-06-12T15:23:25.3917218","day":"6/12","time":"15:23","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"77","val":"3205.","rr":"797.526","datetime":"2019-06-12T15:23:42.751953","day":"6/12","time":"15:23","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"78","val":"2408.","rr":"653.972","datetime":"2019-06-12T15:24:04.2019907","day":"6/12","time":"15:24","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"79","val":"3061.","rr":"280.021","datetime":"2019-06-12T15:28:11.2810267","day":"6/12","time":"15:28","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"80","val":"2781.","rr":"2084.202","datetime":"2019-06-12T15:28:27.8170558","day":"6/12","time":"15:28","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"81","val":"4866.","rr":"2208.262","datetime":"2019-06-12T15:28:48.3672922","day":"6/12","time":"15:28","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"82","val":"2657.","rr":"189.634","datetime":"2019-06-12T15:29:07.9609266","day":"6/12","time":"15:29","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"83","val":"2847.","rr":"111.654","datetime":"2019-06-12T15:29:25.5129575","day":"6/12","time":"15:29","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"84","val":"2959.","rr":"561.813","datetime":"2019-06-12T15:29:44.8936706","day":"6/12","time":"15:29","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"85","val":"3521.","rr":"698.278","datetime":"2019-06-12T15:30:02.2791145","day":"6/12","time":"15:30","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"86","val":"4219.","rr":"370.407","datetime":"2019-06-12T15:38:53.8928523","day":"6/12","time":"15:38","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"87","val":"4589.","rr":"1639.359","datetime":"2019-06-12T15:39:11.5852835","day":"6/12","time":"15:39","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"88","val":"2950.","rr":"47.8510000000001","datetime":"2019-06-12T15:39:29.980716","day":"6/12","time":"15:39","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"89","val":"2998.","rr":"124.059","datetime":"2019-06-12T15:40:55.3212672","day":"6/12","time":"15:40","isoutrule":null},{"id":"bbb47045-ef5f-420b-a7cd-7195f23abfea","num":"90","val":"2874.","rr":null,"datetime":"2019-06-12T16:04:12.5582426","day":"6/12","time":"16:4","isoutrule":null}]'
//initmiddlechart(ssdd);
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
    else {
        coum = middledataobj.length + 1;
    }
    for (var j = 1; j < coum; j++) {
        tableId.rows[1].cells[j].innerHTML = middledataobj[j - 1].day;
        tableId.rows[2].cells[j].innerHTML = middledataobj[j - 1].time;
        if (middledataobj[j - 1].val.split(".").length > 1) {
            tableId.rows[3].cells[j].innerHTML = parseFloat(middledataobj[j - 1].val);
        }
        else {
            tableId.rows[3].cells[j].innerHTML = parseFloat(middledataobj[j - 1].val);
        }

        if ((j + 29) < middledataobj.length) {
            tableId.rows[5].cells[j].innerHTML = middledataobj[j + 29].day;
            tableId.rows[6].cells[j].innerHTML = middledataobj[j + 29].time;
            if (middledataobj[j + 29].val.split(".").length > 1) {
                tableId.rows[7].cells[j].innerHTML = parseFloat(middledataobj[j + 29].val);
            }
            else {
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
    for (var i = 1; i < 91; i++) {
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
    intchart(Chart1, "main", "Average 均值", xdata, ydata, usl, lsl);
    //获取数据初始化极差表
    var xdata2 = new Array();
    for (var i = 1; i < 90; i++) {
        xdata2.push(i);
    }
    var ydata2 = new Array();
    for (var m = 0; m < middledataobj.length-1; m++) {
        ydata2.push(middledataobj[m].rr);
    }
    var uslr = parseFloat(document.getElementById("ULCR").innerHTML);
    var lslr = parseFloat(document.getElementById("LLCR").innerHTML);
   
    intchart(Chart2, "main1", "Range 极值", xdata2, ydata2, uslr, lslr);

    //给违反判异规则的点改变背景色
    for (var j = 1; j < tableId.rows[0].cells.length; j++) {
        if ((j - 1) < middledataobj.length)
        {
            if (middledataobj[j - 1].isoutrule) {
                tableId.rows[3].cells[j].style.backgroundColor = "red";
            }
        }
        if ((j + 29) < middledataobj.length)
        {
            if (middledataobj[j + 29].isoutrule) {
                tableId.rows[7].cells[j].style.backgroundColor = "red";
            }
        }
        if ((j + 59) < middledataobj.length)
        {
            if (middledataobj[j + 59].isoutrule) {
                tableId.rows[11].cells[j].style.backgroundColor = "red";
            }
        }
        
    }
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
		$("#LSL").attr("disabled",true);
	}
	if (CalculationMode == "3") {
		$("#USL").val("");
		$("#USL").attr("disabled", true);
		$("#LSL").attr("disabled", false);
	}
}

function getxr(xxrr)
{  
    var xx = xxrr.split("_")[0];
    var rr = xxrr.split("_")[1];
    document.getElementById("xx").innerHTML = xx;
    document.getElementById("rr").innerHTML = rr;
}

//var fgffsfsfs = "61.744_0.018_3.329_3.066_0.054_0_61.798_61.69_0.006_61.791_61.715_90";
//getxrcpk(fgffsfsfs);

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

//var sssslllllll = "61.68_61.799_61.744_90_0.006_0.006_3.329_3.592_3.066_3.066";
//getgrapcpk(sssslllllll);


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

function intbackground() {
    var tableId = document.getElementById("table2");
    for (var j = 1; j < tableId.rows[0].cells.length; j++) {
        tableId.rows[3].cells[j].style.backgroundColor = "white";
        tableId.rows[7].cells[j].style.backgroundColor = "white";
        tableId.rows[11].cells[j].style.backgroundColor = "white";
    }
}

//initcpkchart("3307.47,275.01");
function initcpkchart(meansandsigmas) {

    var means = meansandsigmas.split(",")[0];
    var sigmas = meansandsigmas.split(",")[1];
   
    myChart = echarts.init(document.getElementById('chart'));
    //获取数据
    var CPKY = new Array();
    var tableId = document.getElementById("table2");
    for (var ii = 1; ii < 31; ii++) {
        if (!isNaN(parseFloat(tableId.rows[3].cells[ii].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[3].cells[ii].innerHTML));
        }
    }

    for (var ii = 31; ii < 61; ii++) {
        if (!isNaN(parseFloat(tableId.rows[7].cells[ii - 30].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[7].cells[ii-30].innerHTML));
        }
    }

    for (var ii = 61; ii < 91; ii++) {
        if (!isNaN(parseFloat(tableId.rows[11].cells[ii - 60].innerHTML))) {
            CPKY.push(parseFloat(tableId.rows[11].cells[ii-60].innerHTML));
        }
    }

    //全为一样的数值则清掉图表
    if (Math.max.apply(null, CPKY) === Math.min.apply(null, CPKY)) {
        if (myChart !== null) {
            myChart.clear();
        }
        return;
    }

    //确定间距
    var sdf = Math.floor(Math.pow(CPKY.length, 0.5));
    var arrnumber = sdf;
    var det = ((Math.max.apply(null, CPKY) - Math.min.apply(null, CPKY)) / arrnumber);
    var mininter = 2;
    var USL = parseFloat(document.getElementById("USL").innerHTML) || 61.8;
    var LSL = parseFloat(document.getElementById("LSL").innerHTML) || 61.68;

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
        //var downlimit = LSL - det;
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
        //var uplimit = USL + det;
        var uplimit = Math.max.apply(null, CPKY) + det;
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
    //var flagsss = 0;
    //if (minxx > parseFloat(LSL))
    //{
    //    var minxx = parseFloat((parseFloat(parseFloat(LSL).toFixed(3)) - intervalxx).toFixed(3));
    //    flagsss = 1;
    //}
    //if (maxxx < parseFloat(USL)) {
    //    var maxxx = parseFloat((parseFloat(parseFloat(USL).toFixed(3)) + intervalxx).toFixed(3));
    //    flagsss = 1;
    //}
    //if(flagsss==1)
    //{
    //    var intervalxx = parseFloat(((maxxx - minxx) / 9).toFixed(3));
    //}
   


    option = {
        title: {
            text: 'Process Capability Weight',
            //subtext: '温度检测',
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
            //interval: 10
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
            itemStyle:{
                color: "#b6a2de"
            },
            data: data
        },
        {
            name: 'height1',
            type: 'line',
            yAxisIndex: 1,
            smooth: 0.5,
            lineStyle:{
                color: "#2ec7c9"
            },
            data: dataxy
        }
        ]
    };

    myChart.setOption(option);
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
    if (Chart1 != null) {
        Chart1.clear();
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

    //获取最大值和最小值
    var limax = Math.max.apply(null, yarray);
    var limin = Math.min.apply(null, yarray)

    var liqujian = limax - limin;

    //确定Y轴上限下限
    var yuplimit = (limax + liqujian * 0.1).toFixed(2);
    var ydownlimit = (limin - liqujian * 0.1).toFixed(2);

    option = {
        calculable: true,
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
            max: yuplimit,
            min:ydownlimit,
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

var xA = new Array();
for (var i = 1; i < 91; i++) {
    xA.push(i);
}
option = {
    //title:
    //       {
    //           text: "温度均值",
    //           left: "center",
    //           //backgroundColor: "#e8e8e8",
    //           textStyle: {
    //               fonySize: 16,
    //               color: "#333333",
    //           }
    //       },
    grid: {
        x: 45,
        y: 55,
        x2: 35,
        y2: 50,
        borderWidth: 1
    },
    calculable: true,
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
        name: 'Average 均值'
    }],
    series: [{
        name: 'Average 均值',
        type: 'line',
    }]
};
option1 = {
    //title:
    //       {
    //           text: "温度极值",
    //           left: "center",
    //           //backgroundColor: "#e8e8e8",
    //           textStyle: {
    //               fonySize: 16,
    //               color: "#333333",
    //           }
    //       },
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
        name: 'Range 极值'
    }],
    series: [{
        name: 'Range 极值',
        type: 'line',
    }]
};
Chart1 = echarts.init(document.getElementById('main'));
Chart1.setOption(option);
Chart2 = echarts.init(document.getElementById('main1'));
Chart2.setOption(option1);


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


//循环确定坐标轴位置
function remiuse(a, b,e) {
    if(a>b)
    {
        a = a - e;
        remiuse(a, b, e);
    }
    else
    {
        return a;
    }

}

function readd(a, b, e) {
    if (a < b) {
        a = a + e;
        remiuse(a, b, e);
    }
    else {
        return a;
    }

}


//导出的方法
function getbasebianma() {
    var canvas = document.createElement("canvas")
    canvas.width = 560    // 最终图片宽度280px的2倍，以px为单位
    canvas.height = 630   // 最终图片高度315px的2倍，以px为单位
    let opts = {
        canvas: canvas,                       // 将自定义canvas作为配置项
        useCORS: true,                        // 允许图片跨域
        height: 1920  // 修复截图不完整问题
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
//            formatter: '{value}'
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
