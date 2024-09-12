//定义全局变量
var Chart1;
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
var allchartlist = [];
/* 新增需求 滑块模式 */
var sliderData = {
    // [LineChart2]: {
    //     show: false,
    //     startValue: 0,
    //     count: 0,
    // }
}
function sum(arr, i) {
    let num = 0
    for (let a = 0; a < arr.length; a++) {
        if (arr[a].data[i]) {
            if (Number(arr[a].data[i]) !== NaN) {
                num += Number(arr[a].data[i])
            }

        }
    }
    return num
}
function gerarea(num, type, zf) {
    num = Math.abs(num)
    if (num == 0) {
        return 0
    }
    let splitnum = 1;
    let daitnum = String(num)
    if (daitnum.split('.')[0].length > 1) {
        let nownum = String(daitnum.split('.')[0]).length
        for (let i = 0; i <= nownum; i++) {
            splitnum = splitnum * 10
        }
    }
    num = num / splitnum

    let numlength = String(num)
    let endnum = '';
    let breaknum = '';
    let splitnum1 = 0
    for (let i = 0; i < numlength.length; i++) {
        endnum += numlength[i]

        if (numlength[i] !== '.') {
            if (Number(numlength[i]) > 0) {
                splitnum1 = Math.pow(10, (i))
                breaknum = Number(numlength[i])
                endnum = Number(endnum)
                break
            }
        }
    }
    if (type == 'min') {
        if (Number(math.format((endnum * zf - Number(math.format(endnum / breaknum, { precision: 14 }))), { precision: 14 })) * splitnum == 0) {
            return Number(math.format((endnum * zf - Number(math.format((endnum / breaknum / 10), { precision: 14 }))), { precision: 14 })) * splitnum
        } else {
            return Number(math.format((endnum * zf - Number(math.format(endnum / breaknum, { precision: 14 }))), { precision: 14 })) * splitnum
        }
    } else {

        return Number(math.format((endnum * zf + Number(math.format(endnum / breaknum, { precision: 14 }))), { precision: 14 })) * splitnum
    }
}
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
function end(max, min, n) {
    let length = 0
    if (String(max).split('.').length > 1) {
        length = String(max).split('.')[1].length
    }
    length += String(n).length
    if (judgeDivisor(math.format(max - min, { precision: 14 }), n)) {
        return Number(Number(math.format(math.format(max - min, { precision: 14 }) / n), { precision: 14 }).toFixed(length))
    } else {
        return Number((Number(math.format(math.format(max - min, { precision: 14 }) / n), { precision: 14 }) + (1 / Math.pow(10, length))).toFixed(length))
    }
}

function colorRgba(sHex, a) {
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
            alpha = (parseInt('0x' + sColor.slice(7, 9)) / 255).toFixed(2)
        }
        if (a) {
            alpha = a / 100
        }
        //  处理六位的颜色值
        var sColorChange = []
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        if (a === 0) {
            alpha = 0
        }
        return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
    } else {
        return sColor
    }
}
//替换不相同属性
function addOrModify(target, source) {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const ele = source[key];
            var modify = false;
            if (target.hasOwnProperty(key)) {
                if (typeof (ele) != "object") {
                    target[key] = ele;
                    modify = true;
                }
            } else {
                target[key] = {};
            }
            if (Array.isArray(ele)) {
                target[key] = ele;
            }
            else if (typeof (ele) == "object") {
                if (target[key]) {
                    addOrModify(target[key], source[key]);
                }

            } else if (!modify) {
                target[key] = ele;
            }
        }
    }
}

var DashBoardChartShow = true
var DashBoardChartData
var PieChartShow = true
var PieChartDatga
var LineChartShow = true
var LineChartData
var BarChartShow = true
var BarChartData
var LineBarChartShow = true
var LineBarChartData
var ZIndexsShow = true
var datas;
function auth(data) {
    for (let i = 0; i < allchartlist.length; i++) {
        var index = data.indexOf(allchartlist[i][1])
        if (index != -1) {
            var optionli = allchartlist[i][0].getOption();
            optionli.tooltip[0].show = false
            for (let j = 0; j < optionli.series.length; j++) {
                optionli.series[j].silent = true
            }
            if (optionli.legend != undefined && optionli.legend.length != 0 && optionli.legend[0].selectedMode != undefined) {
                optionli.legend[0].selectedMode = false
            }
            allchartlist[i][0].setOption(optionli, true);
        }
    }
}
//饼图内容显示方法
function PieLabelConter(e) {
    var newStr = " ";
    var start, end;
    var name_len = e.name.length;    　　　　　　　　　　　　   //每个内容名称的长度
    var max_name = 4;    　　　　　　　　　　　　　　　　　　//每行最多显示的字数
    var new_row = Math.ceil(name_len / max_name); 　　　　// 最多能显示几行，向上取整比如2.1就是3行
    if (name_len > max_name) { 　　　　　　　　　　　　　　  //如果长度大于每行最多显示的字数
        for (var i = 0; i < new_row; i++) { 　　　　　　　　　　　   //循环次数就是行数
            var old = '';    　　　　　　　　　　　　　　　　    //每次截取的字符
            start = i * max_name;    　　　　　　　　　　     //截取的起点
            end = start + max_name;    　　　　　　　　　  //截取的终点
            if (i == new_row - 1) {    　　　　　　　　　　　　   //最后一行就不换行了
                old = e.name.substring(start);
            } else {
                old = e.name.substring(start, end) + "\n";
            }
            newStr += old; //拼接字符串
        }
    } else {                                          //如果小于每行最多显示的字数就返回原来的字符串
        newStr = e.name;
    }
    return newStr
}
//饼图内容显示
function PieLabelFun(DimensionShow, PercentageShow, ValueShow, ShowOutter, Unit) {
    var Lableformatter
    if (ValueShow == true) {//数值
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            return e.value + ' ' + Unit
        }
        LabelformatterShow = true
    }
    if (DimensionShow == true) {//维度
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return newStr + ' ' + Unit
            } else {
                return ''
            }
        }
        LabelformatterShow = true
    }
    if (PercentageShow == true) {//百分比
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return '' + e.percent + '%' + ' ' + Unit
            } else {
                return + e.percent + '% ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (ValueShow == true && DimensionShow == true) {//数值+维度
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return newStr + '\n' + e.value + ' ' + Unit
            } else {
                return e.value + ' ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (ValueShow == true && PercentageShow == true) {//数值+百分比
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return e.value + '\n' + '' + e.percent + '%' + ' ' + Unit
            } else {
                return e.value + '\n' + e.percent + '%' + ' ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (DimensionShow == true && PercentageShow == true) {//维度+百分比
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return newStr + '\n' + '' + e.percent + '%' + ' ' + Unit
            } else {
                return e.percent + '%' + ' ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (DimensionShow == true && PercentageShow == true && ValueShow == true) {
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return newStr + '\n' + e.value + '\n' + '' + e.percent + '%' + ' ' + Unit
            } else {
                return e.value + '\n' + '' + e.percent + '%' + ' ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (DimensionShow == false && PercentageShow == false && ValueShow == false) {
        Lableformatter = ''
        LabelformatterShow = true
    }
    return Lableformatter
}
jsObj.getChartData(function (e) {

})//定义全局变量
var Chart1;
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
var allchartlist = [];
function gerarea(num, type, zf) {
    num = Math.abs(num)
    if (num == 0) {
        return 0
    }
    let splitnum = 1;
    let daitnum = String(num)
    if (daitnum.split('.')[0].length > 1) {
        let nownum = String(daitnum.split('.')[0]).length
        for (let i = 0; i <= nownum; i++) {
            splitnum = splitnum * 10
        }
    }
    num = num / splitnum

    let numlength = String(num)
    let endnum = '';
    let breaknum = '';
    let splitnum1 = 0
    for (let i = 0; i < numlength.length; i++) {
        endnum += numlength[i]

        if (numlength[i] !== '.') {
            if (Number(numlength[i]) > 0) {
                splitnum1 = Math.pow(10, (i))
                breaknum = Number(numlength[i])
                endnum = Number(endnum)
                break
            }
        }
    }
    if (type == 'min') {
        if (Number(math.format((endnum * zf - Number(math.format(endnum / breaknum, { precision: 14 }))), { precision: 14 })) * splitnum == 0) {
            return Number(math.format((endnum * zf - Number(math.format((endnum / breaknum / 10), { precision: 14 }))), { precision: 14 })) * splitnum
        } else {
            return Number(math.format((endnum * zf - Number(math.format(endnum / breaknum, { precision: 14 }))), { precision: 14 })) * splitnum
        }
    } else {

        return Number(math.format((endnum * zf + Number(math.format(endnum / breaknum, { precision: 14 }))), { precision: 14 })) * splitnum
    }
}
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
function end(max, min, n) {
    let length = 0
    if (String(max).split('.').length > 1) {
        length = String(max).split('.')[1].length
    }
    length += String(n).length
    if (judgeDivisor(math.format(max - min, { precision: 14 }), n)) {
        return Number(Number(math.format(math.format(max - min, { precision: 14 }) / n), { precision: 14 }).toFixed(length))
    } else {
        return Number((Number(math.format(math.format(max - min, { precision: 14 }) / n), { precision: 14 }) + (1 / Math.pow(10, length))).toFixed(length))
    }
}

function colorRgba(sHex, a) {
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
            alpha = (parseInt('0x' + sColor.slice(7, 9)) / 255).toFixed(2)
        }
        if (a) {
            alpha = a / 100
        }
        //  处理六位的颜色值
        var sColorChange = []
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        if (a === 0) {
            alpha = 0
        }
        return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
    } else {
        return sColor
    }
}
//替换不相同属性
function addOrModify(target, source) {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const ele = source[key];
            var modify = false;
            if (target.hasOwnProperty(key)) {
                if (typeof (ele) != "object") {
                    target[key] = ele;
                    modify = true;
                }
            } else {
                target[key] = {};
            }
            if (Array.isArray(ele)) {
                target[key] = ele;
            }
            else if (typeof (ele) == "object") {
                if (target[key]) {
                    addOrModify(target[key], source[key]);
                }

            } else if (!modify) {
                target[key] = ele;
            }
        }
    }
}

var DashBoardChartShow = true
var DashBoardChartData
var PieChartShow = true
var PieChartDatga
var LineChartShow = true
var LineChartData
var BarChartShow = true
var BarChartData
var LineBarChartShow = true
var LineBarChartData
var ZIndexsShow = true
var datas;
function auth(data) {
    for (let i = 0; i < allchartlist.length; i++) {
        var index = data.indexOf(allchartlist[i][1])
        if (index != -1) {
            var optionli = allchartlist[i][0].getOption();
            optionli.tooltip[0].show = false
            for (let j = 0; j < optionli.series.length; j++) {
                optionli.series[j].silent = true
            }
            if (optionli.legend != undefined && optionli.legend.length != 0 && optionli.legend[0].selectedMode != undefined) {
                optionli.legend[0].selectedMode = false
            }
            allchartlist[i][0].setOption(optionli, true);
        }
    }
}
//饼图内容显示方法
function PieLabelConter(e) {
    var newStr = " ";
    var start, end;
    var name_len = e.name.length;    　　　　　　　　　　　　   //每个内容名称的长度
    var max_name = 4;    　　　　　　　　　　　　　　　　　　//每行最多显示的字数
    var new_row = Math.ceil(name_len / max_name); 　　　　// 最多能显示几行，向上取整比如2.1就是3行
    if (name_len > max_name) { 　　　　　　　　　　　　　　  //如果长度大于每行最多显示的字数
        for (var i = 0; i < new_row; i++) { 　　　　　　　　　　　   //循环次数就是行数
            var old = '';    　　　　　　　　　　　　　　　　    //每次截取的字符
            start = i * max_name;    　　　　　　　　　　     //截取的起点
            end = start + max_name;    　　　　　　　　　  //截取的终点
            if (i == new_row - 1) {    　　　　　　　　　　　　   //最后一行就不换行了
                old = e.name.substring(start);
            } else {
                old = e.name.substring(start, end) + "\n";
            }
            newStr += old; //拼接字符串
        }
    } else {                                          //如果小于每行最多显示的字数就返回原来的字符串
        newStr = e.name;
    }
    return newStr
}
//饼图内容显示
function PieLabelFun(DimensionShow, PercentageShow, ValueShow, ShowOutter, Unit) {
    var Lableformatter
    if (ValueShow == true) {//数值
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            return e.value + ' ' + Unit
        }
        LabelformatterShow = true
    }
    if (DimensionShow == true) {//维度
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return newStr + ' ' + Unit
            } else {
                return ''
            }
        }
        LabelformatterShow = true
    }
    if (PercentageShow == true) {//百分比
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return '' + e.percent + '%' + ' ' + Unit
            } else {
                return + e.percent + '% ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (ValueShow == true && DimensionShow == true) {//数值+维度
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return newStr + '\n' + e.value + ' ' + Unit
            } else {
                return e.value + ' ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (ValueShow == true && PercentageShow == true) {//数值+百分比
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return e.value + '\n' + '' + e.percent + '%' + ' ' + Unit
            } else {
                return e.value + '\n' + e.percent + '%' + ' ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (DimensionShow == true && PercentageShow == true) {//维度+百分比
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return newStr + '\n' + '' + e.percent + '%' + ' ' + Unit
            } else {
                return e.percent + '%' + ' ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (DimensionShow == true && PercentageShow == true && ValueShow == true) {
        Lableformatter = function (e) {
            var ee = e
            var newStr = PieLabelConter(ee)
            if (ShowOutter == true) {
                return newStr + '\n' + e.value + '\n' + '' + e.percent + '%' + ' ' + Unit
            } else {
                return e.value + '\n' + '' + e.percent + '%' + ' ' + Unit
            }
        }
        LabelformatterShow = true
    }
    if (DimensionShow == false && PercentageShow == false && ValueShow == false) {
        Lableformatter = ''
        LabelformatterShow = true
    }
    return Lableformatter
}
function testall(mmmnnn) {
    var changedata = JSON.parse(mmmnnn);
    datas = changedata;
    // 初始化饼图
    if (changedata.hasOwnProperty('PieChart')) {
        if (changedata.PieChart.length !== 0) {
            for (let i = 0; i < changedata.PieChart.length; i++) {
                var bardiv = document.createElement("div");
                bardiv.id = changedata.PieChart[i].name;
                bardiv.style.height = changedata.PieChart[i].height + 'px';
                bardiv.style.width = changedata.PieChart[i].width + 'px';
                bardiv.style.position = "absolute";
                bardiv.style.top = changedata.PieChart[i].y + 'px';
                bardiv.style.left = changedata.PieChart[i].x + 'px';
                document.body.appendChild(bardiv);
                var bardiv2 = document.createElement("div");
                bardiv2.id = changedata.PieChart[i].name + 'pie';
                bardiv2.style.height = changedata.PieChart[i].height + 'px';
                bardiv2.style.width = changedata.PieChart[i].width + 'px';
                bardiv2.style.position = "absolute";
                bardiv2.style.top = changedata.PieChart[i].y + 'px';
                bardiv2.style.left = changedata.PieChart[i].x + 'px';
                document.body.appendChild(bardiv2);
                var data
                PieChartDatga = changedata.PieChart[i].option
                data = PieChartDatga
                PieChartShow = false
                var ShowOutter
                if (data.Label.ShowOutter == true) {
                    ShowOutter = true
                } else {
                    ShowOutter = false
                }
                var Title = data.Title.Title
                var TitleFontColor = data.Title.Color.HtmlColor
                var TitleFontSize = data.Title.FontSize
                var TitlePosition = data.Title.Position
                var TitleShow = data.Title.Show
                var BackGroundColor = data.BackgroundColor.HtmlColor
                var BackGroundColor2
                var PieLabelLineShow = data.PieLabelLine.Show
                if (ShowOutter) {
                    BackGroundColor2 = data.BackgroundColor.HtmlColor
                } else {
                    BackGroundColor2 = ''
                }
                var Unit = data.PieConfiguration.Unit == null ? '' : data.PieConfiguration.Unit
                var LabelformatterShow = false
                var Lableformatter
                Lableformatter = PieLabelFun(data.Label.DimensionShow, data.Label.PercentageShow, data.Label.ValueShow, ShowOutter, Unit)
                var LabelFontSize = data.Label.FontSize
                var TooltipformatterShow = false
                var Tooltipformatter
                if (data.PieTooltip.ValueShow == true) {   //数值
                    Tooltipformatter = '{c}'
                    TooltipformatterShow = true
                    Tooltipformatter2 = '{c}'
                }
                if (data.PieTooltip.DimensionShow == true) {  //维度
                    if (ShowOutter == true) {
                        Tooltipformatter = function (params) {
                            if (params.name) {
                                return params.name
                            }
                        }
                    } else {
                        Tooltipformatter = function (params) {
                            if (params.name) {
                                return params.name
                            }
                        }
                        Tooltipformatter2 = ''
                    }
                    TooltipformatterShow = true
                }
                if (data.PieTooltip.PercentageShow == true) {  //百分比
                    Tooltipformatter = '{d}%'
                    TooltipformatterShow = true
                    Tooltipformatter2 = '{d}%'
                }
                if (data.PieTooltip.ValueShow == true && data.PieTooltip.DimensionShow == true) {  //数值+维度
                    if (ShowOutter == true) {
                        Tooltipformatter = function (params) {
                            if (params.name) {
                                return params.name + ':' + params.value
                            }
                        }
                    } else {
                        Tooltipformatter = function (params) {
                            if (params.name) {
                                return params.name + ':' + params.value
                            }
                        }
                        Tooltipformatter2 = '{c}'
                    }
                    TooltipformatterShow = true
                }
                if (data.PieTooltip.ValueShow == true && data.PieTooltip.PercentageShow == true) {  //数值+百分比
                    Tooltipformatter = '{c} \n ({d}%)'
                    TooltipformatterShow = true
                    Tooltipformatter2 = '{c} \n ({d}%)'
                }
                if (data.PieTooltip.DimensionShow == true && data.PieTooltip.PercentageShow == true) {  //维度+ 百分比
                    if (ShowOutter == true) {
                        Tooltipformatter = function (params) {
                            if (params.name) {
                                return params.name + ':' + "(" + params.percent + '%)'
                            }
                        }
                    } else {
                        Tooltipformatter = function (params) {
                            if (params.name) {
                                return params.name + ':' + "(" + params.percent + '%)'
                            }
                        }
                        Tooltipformatter2 = '{d}%'
                    }
                    TooltipformatterShow = true
                }
                if (data.PieTooltip.DimensionShow == true && data.PieTooltip.PercentageShow == true && data.PieTooltip.ValueShow == true) {
                    if (ShowOutter == true) {
                        Tooltipformatter = function (params) {
                            if (params.name) {
                                return params.name + ':' + params.value + "(" + params.percent + '%)'
                            }
                        }
                    } else {
                        Tooltipformatter = function (params) {
                            if (params.name) {
                                return params.name + ':' + params.value + "(" + params.percent + '%)'
                            }
                        }
                        Tooltipformatter2 = '{c} ({d}%)'
                    }
                    TooltipformatterShow = true
                }
                if (data.Label.DimensionShow == false) {  //在外显示没维度隐藏线
                    if (ShowOutter == false) {
                        PieLabelLineShow = false
                    }
                }
                if (data.Label.DimensionShow == false && data.Label.PercentageShow == false && data.Label.ValueShow == false) { //在内显示没维度隐藏线
                    if (ShowOutter == true) {
                        PieLabelLineShow = false
                    }
                }
                var ItemHeight = data.Legend.ItemHeight
                var ItemWidth = data.Legend.ItemWidth
                var FontWeight = data.Legend.FontWeight
                var FontFamily = data.Legend.FontFamily
                var LengendShow = data.Legend.Show
                var LengenColor = data.Legend.Color.HtmlColor
                var lengenPosition = data.Legend.Position
                var lengenFontSize = data.Legend.FontSize
                var LengenB
                var lengenT
                var lengenL
                var LengenR
                var LPtb
                var LPlr
                var IsUseVariables2 = data.IsUseVariables2
                var VariablesData2
                if (IsUseVariables2 == true) {
                    VariablesData2 = data.Variables2
                } else {
                    VariablesData2 = data.Variables
                }
                var LegendData = []
                var legendColor = []
                for (var j = 0; j < VariablesData2.length; j++) {
                    LegendData.push(VariablesData2[j].DimensionName)
                    if (VariablesData2[j].Color) {
                        legendColor.push(VariablesData2[j].Color.HtmlColor)
                    }

                }
                if (lengenPosition == 'RightCenter') {
                    LengenB = null
                    lengenT = "center"
                    lengenL = null
                    LengenR = "right"
                    LPtb = 10
                    LPlr = 30
                }
                if (lengenPosition == 'TopCenter') {
                    LengenB = null
                    lengenT = "top"
                    lengenL = 'center'
                    LengenR = null
                    LPtb = 30
                    LPlr = 10
                }
                if (lengenPosition == 'BottomCenter') {
                    LengenB = "bottom"
                    lengenT = null
                    lengenL = 'center'
                    LengenR = null
                    LPtb = 10
                    LPlr = 10
                }
                var PieLabelLine1 = data.PieLabelLine.Length
                var PieLabelLine2 = data.PieLabelLine.Length2
                var InRadius = data.PieConfiguration.InRadius
                var OutRadius = data.PieConfiguration.OutRadius
                var OutRadius2 = parseInt(data.PieConfiguration.OutRadius) + 5 + '%'
                var VariablesData
                if (IsUseVariables2 == true) {
                    VariablesData = data.Variables2
                } else {
                    VariablesData = data.Variables
                }
                var seriesArr = []
                var seriesArr1 = []
                var seriesArr2 = []
                for (let v = 0; v < VariablesData.length; v++) {
                    let colorarr = []
                    let colorarr1 = []
                    VariablesData[v].LinearBrush.GradientStops.forEach((item) => {
                        colorarr.push({
                            offset: item.Offset,
                            color: item.Color.HtmlColor
                        })
                        colorarr1.push({
                            offset: item.Offset,
                            color: colorRgba(item.Color.HtmlColor.slice(0, 7))
                        })
                    })
                    let itemcolortry
                    let itemcolortry1
                    if (VariablesData[v].BrushTypes) {
                        itemcolortry = {
                            shadowColor: "rgba(85,85,85,0.2)",
                            shadowBlur: 2,
                            shadowOffsetX: 2,
                            color: {
                                type: 'linear',
                                x: VariablesData[v].StartPoint.split(',')[0],
                                y: VariablesData[v].StartPoint.split(',')[1],
                                x2: VariablesData[v].EndPoint.split(',')[0],
                                y2: VariablesData[v].EndPoint.split(',')[1],
                                colorStops: colorarr,
                                global: false // 缺省为 false
                            }
                        }
                        itemcolortry1 = {
                            shadowColor: "rgba(85,85,85,0.2)",
                            shadowBlur: 2,
                            shadowOffsetX: 2,
                            color: {
                                type: 'linear',
                                x: VariablesData[v].StartPoint.split(',')[0],
                                y: VariablesData[v].StartPoint.split(',')[1],
                                x2: VariablesData[v].EndPoint.split(',')[0],
                                y2: VariablesData[v].EndPoint.split(',')[1],
                                colorStops: colorarr1,
                                global: false // 缺省为 false
                            }
                        }
                    } else {
                        itemcolortry = {
                            shadowColor: "rgba(85,85,85,0.2)",
                            shadowBlur: 2,
                            shadowOffsetX: 2,
                            color: VariablesData[v].Color.HtmlColor
                        }
                        itemcolortry1 = {
                            shadowColor: "rgba(85,85,85,0.2)",
                            shadowBlur: 2,
                            shadowOffsetX: 2,
                            color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7))
                        }
                    }
                    var value = {
                        "value": VariablesData[v].Value,
                        "name": VariablesData[v].DimensionName,
                        "label": {
                            "normal": {
                                "fontSize": LabelFontSize,
                                "formatter": Lableformatter,
                                "formatter1": Lableformatter,
                                color: !data.Label.ShowOutter ? '#000' : VariablesData[v].BrushTypes ? colorarr[colorarr.length - 1].color : legendColor[v]
                            }
                        },
                        itemStyle: itemcolortry,
                    }

                    seriesArr.push(value)
                    var value1 = {
                        "value": VariablesData[v].Value,
                        "name": VariablesData[v].DimensionName,
                        "label": {
                            "normal": {
                                show: false,
                                "fontSize": LabelFontSize,
                                "formatter": Lableformatter,
                                "formatter1": Lableformatter
                            }
                        },
                        itemStyle: itemcolortry1,
                    }
                    seriesArr1.push(value1)

                    var value2 = {
                        "value": VariablesData[v].Value,
                        name: VariablesData[v].DimensionName,
                        label: {
                            "normal": {
                                "show": data.Label.DimensionShow,
                                "textStyle": {
                                    "fontSize": LabelFontSize,
                                    color: VariablesData[v].BrushTypes ? colorarr[colorarr.length - 1].color : legendColor[v]
                                }
                            }
                        },
                        labelLine: {
                            "normal": {
                                width: 1,
                                lineStyle: {
                                    width: 1,
                                    color: itemcolortry.color
                                }
                            }
                        }
                    }
                    seriesArr2.push(value2)

                }
                var isInner
                if (ShowOutter == true) {
                    isInner = {
                        normal: ''
                    }
                } else {
                    isInner = {            //饼图图形上的文本标签
                        normal: {
                            show: true,
                            color: '#000',
                            position: 'inner', //标签的位置
                            textStyle: {
                                fontWeight: 500,
                                fontSize: 16    //文字的字体大小
                            },
                            formatter: Tooltipformatter2
                        }
                    }
                }

                var PieChartOption = {
                    "animation": false,
                    "name": changedata.PieChart[i].name,
                    "color": legendColor,
                    "backgroundColor": BackGroundColor2,
                    "legend": {
                        "data": LegendData,
                        "itemHeight": ItemHeight,
                        "itemWidth": ItemWidth,
                        formatter: function (params) {
                            let tip1 = "";
                            let tip = "";
                            let le = params.length  //图例文本的长度
                            if (le > 4) {   //几个字换行大于几就可以了
                                let l = Math.ceil(le / 4)  //有些不能整除，会有余数，向上取整
                                for (let i = 1; i <= l; i++) { //循环
                                    if (i < l) { //最后一段字符不能有\n
                                        tip1 += params.slice(i * 4 - 4, i * 4) + '\n'; //字符串拼接
                                    } else if (i === l) {  //最后一段字符不一定够6个
                                        tip = tip1 + params.slice((l - 1) * 4, le) //最后的拼接在最后
                                    }
                                }
                                return tip;
                            } else {
                                tip = params  //前面定义了tip为空，这里要重新赋值，不然会替换为空
                                return tip;
                            }
                        },
                        "textStyle": {
                            "fontWeight": FontWeight,
                            "fontFamily": FontFamily,
                            "color": LengenColor,
                            "fontSize": lengenFontSize
                        },
                        "show": LengendShow,
                        "left": lengenL,
                        "right": LengenR,
                        "top": lengenT,
                        "bottom": LengenB,
                        "padding": [LPtb, LPlr]
                    },
                    "series": [{
                        "type": "pie",
                        "radius": [InRadius, OutRadius],
                        "center": ["50%", "50%"],
                        "itemStyle": {
                            "normal": {
                                "shadowBlur": 18,
                                "shadowColor": "rgba(127,128,128,0.2)",
                                "shadowOffsetX": 0,
                                "shadowOffsetY": 4
                            }
                        },
                        "selectedMode": "single",
                        "data": seriesArr,
                        label: isInner,
                        "labelLine": {
                            "show": PieLabelLineShow,
                            "length": PieLabelLine1,
                            "length2": PieLabelLine2
                        },
                    }, data.IsShowCircularBackground ? {
                        "radius": [InRadius, (parseFloat(OutRadius) + 5) + '%'],
                        "center": ["50%", "50%"], type: 'pie',
                        zlevel: -1,
                        hoverAnimation: false,
                        "labelLine": {
                            "show": false,
                        },
                        data: seriesArr1
                    } : {}],
                    "tooltip": {
                        "formatter": Tooltipformatter,
                        "show": TooltipformatterShow
                    },
                    "title": {
                        "textStyle": {
                            "color": TitleFontColor,
                            "fontSize": TitleFontSize
                        },
                        "padding": [12, 10],
                        "x": TitlePosition.toLowerCase(),
                        "show": TitleShow,
                        "text": Title
                    }
                }

                // if(ShowOutter == false){

                var PieChartOption2 = {
                    "animation": false,
                    "backgroundColor": BackGroundColor,
                    legend: {
                        "data": LegendData,
                        show: false
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            "radius": [InRadius, OutRadius2],
                            "center": ["50%", "50%"],
                            selectedMode: 'single',
                            color: ['transparent'],
                            seriesLayoutBy: 'row',
                            "labelLine": {
                                "length": 50,
                            },
                            data: seriesArr2,
                            "labelLine": {
                                "show": PieLabelLineShow,
                                "length": PieLabelLine1,
                                "length2": PieLabelLine2
                            },
                        }
                    ]
                }
                Chart1 = echarts.init(bardiv);

                Chart1.setOption(PieChartOption, false);

                Chart2 = echarts.init(bardiv2);

                Chart2.setOption(PieChartOption2, false);

                var bardiv2Name = changedata.PieChart[i].name + 'pie'
                allchartlist.push([Chart2, bardiv2Name]);
                // }

                allchartlist.push([Chart1, changedata.PieChart[i].name, data.Label.DimensionShow, data.Label.PercentageShow, data.Label.ValueShow, ShowOutter, Unit]);
                const piecs = Chart1
                Chart1.on('legendselectchanged', function (obj) {
                    var pieOption = piecs.getOption()
                    var listName = pieOption.name + 'pie'
                    for (let f1 = 0; f1 < allchartlist.length; f1++) {
                        if (listName == allchartlist[f1][1]) {
                            var option2 = allchartlist[f1][0].getOption()
                            option2.legend[0].selected = obj.selected
                            allchartlist[f1][0].setOption(option2, true)
                        }
                    }
                })

            }
        }
    }
    //初始化仪表盘
    if (changedata.hasOwnProperty('DashBoardChart')) {
        if (changedata.DashBoardChart.length !== 0) {
            for (let i = 0; i < changedata.DashBoardChart.length; i++) {
                option = { animation: false, };
                var bardiv = document.createElement("div");
                bardiv.id = changedata.DashBoardChart[i].name;
                bardiv.style.height = changedata.DashBoardChart[i].height + 'px';
                bardiv.style.width = changedata.DashBoardChart[i].width + 'px';
                bardiv.style.position = "absolute";
                bardiv.style.top = changedata.DashBoardChart[i].y + 'px';
                bardiv.style.left = changedata.DashBoardChart[i].x + 'px';
                document.body.appendChild(bardiv);
                let bl = 1;
                if (bardiv.style.height > bardiv.style.width) {
                    bl = 170 / changedata.DashBoardChart[i].width
                } else {
                    bl = 170 / changedata.DashBoardChart[i].height
                }
                var data
                DashBoardChartData = changedata.DashBoardChart[i].option
                data = DashBoardChartData
                if (data.IsRing) {
                    DashBoardChartShow = false
                    let dataarr = []
                    let colorarr2 = []
                    if (data.ColorType1 !== "Multicolor" && data.ColorType1 !== "GradientMulticolor") {
                        data.Variable.Range1.NormalLinearColor.GradientStops.forEach((item) => {
                            colorarr2.push({
                                offset: item.Offset,
                                color: item.Color.HtmlColor
                            })
                        })
                        let minfixed = 0
                        let maxfixed = 100
                        let obj = {
                            value: Number(data.Variable.Value) < Number(data.Variable.Range1.Min) ? minfixed.toFixed(data.Variable.ValueDigit) : Number(data.Variable.Value) > Number(data.Variable.Range1.Max) ? maxfixed.toFixed(data.Variable.ValueDigit) : (((Number(data.Variable.Value) - Number(data.Variable.Range1.Min)) / Number(data.Variable.Range1.Max)) * 100).toFixed(data.Variable.ValueDigit),
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, colorarr2)
                                }
                            },
                        }
                        dataarr.push(obj)
                    } else {
                        let color = ''
                        if (Number(data.Variable.Value) >= (Number(data.Variable.Range1.Max) * ((data.Variable.Range1.NormalScale + data.Variable.Range1.ExcessScale) / 100))) {
                            color = data.Variable.Range1.WarnColor.HtmlColor
                        } else if (Number(data.Variable.Value) >= (Number(data.Variable.Range1.Max) * ((data.Variable.Range1.NormalScale) / 100))) {
                            color = data.Variable.Range1.ExcessColor.HtmlColor
                        } else {
                            color = data.Variable.Range1.NormalColor.HtmlColor
                        }
                        data.Variable.Range1.NormalLinearColor.GradientStops.forEach((item) => {
                            colorarr2.push({
                                offset: item.Offset,
                                color: color
                            })
                        })
                        let minfixed = 0
                        let maxfixed = 100
                        let obj = {
                            value: Number(data.Variable.Value) < Number(data.Variable.Range1.Min) ? minfixed.toFixed(data.Variable.ValueDigit) : Number(data.Datas) > Number(data.Variable.Range1.Max) ? maxfixed.toFixed(data.Variable.ValueDigit) : (((Number(data.Datas) - Number(data.Variable.Range1.Min)) / Number(data.Variable.Range1.Max)) * 100).toFixed(data.Variable.ValueDigit),
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, colorarr2)
                                }
                            },
                        }
                        dataarr.push(obj)
                    }

                    let minfixed = 0
                    let maxfixed = 100
                    let option = {
                        fixed: data.Variable.ValueDigit,
                        SeriesShowDetailMode: data.Variable.Tooltip1.SeriesShowDetailMode,
                        Range: data.Variable.Range1,
                        IsRing: data.IsRing,
                        ColorType: data.ColorType1,
                        backgroundColor: data.BackgroundColor1.HtmlColor,
                        title: [{
                            text: data.Variable.DimensionName,
                            textStyle: {
                                color: data.Variable.Color.HtmlColor,
                                fontSize: data.Variable.Show ? data.Variable.FontSize : 12,
                                opacity: data.Variable.Show ? 1 : 0,
                                fontWeight: 'normal',
                            },
                            Unit: data.Variable.Unit,
                            subtext: data.Variable.Tooltip1.SeriesShowDetailMode === 1 ? (Number(data.Variable.Value) < Number(data.Variable.Range1.Min) ? minfixed.toFixed(data.Variable.ValueDigit) : (((Number(data.Variable.Value) - Number(data.Variable.Range1.Min)) / (Number(data.Variable.Range1.Max) - Number(data.Variable.Range1.Min))) * 100).toFixed(data.Variable.ValueDigit)) + data.Variable.Unit : Number(data.Variable.Value).toFixed(data.Variable.ValueDigit) + data.Variable.Unit,

                            subtextStyle: {
                                "fontSize": data.Variable.Tooltip1.SeriesDetailFontSize,
                                opacity: data.Variable.Tooltip1.SeriesDetailShow ? 1 : 0,
                                color: !data.DetailColor1 ? data.DetailColor1 : data.DetailColor1.HtmlColor,
                            },
                            left: 'center',
                            top: data.Variable.Show ? ((Number(data.PositionOffset1) - (10 * bl)) + '%') : ((Number(data.PositionOffset1) - (20 * bl)) + '%'),

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
                            center: ['50%', data.PositionOffset1 + '%'],
                            radius: data.DiscRadius1 + '%' //图形大小
                        },
                        angleAxis: {
                            show: false,
                            startAngle: -90,
                        },
                        series: [

                            {
                                type: 'bar',
                                data: dataarr,
                                coordinateSystem: 'polar',
                                roundCap: true,
                                barWidth: data.LineWith1,
                                barGap: '-100%', // 两环重叠
                                z: 2,
                            }, { // 灰色环
                                type: 'bar',
                                data: [{
                                    value: 100,
                                    itemStyle: {
                                        color: data.ThemeType == 'Light' ? '#EBEAEA' : '#3C3851',
                                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                                        shadowBlur: 5,
                                        shadowOffsetY: 2
                                    }
                                }],
                                coordinateSystem: 'polar',
                                roundCap: true,
                                barWidth: data.LineWith1,
                                barGap: '-100%', // 两环重叠
                                z: 1
                            }, data.ShowRingBackground1 ? { // 灰色环
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
                                barWidth: data.RingWith1,
                                barGap: '-100%', // 两环重叠
                                z: 0
                            } : {}

                        ]

                    }
                    Chart1 = echarts.init(bardiv);

                    Chart1.setOption(option, true);

                    allchartlist.push([Chart1, changedata.DashBoardChart[i].name]);

                } else {
                    DashBoardChartShow = false


                    var Title = data.Title.Title
                    var TitleFontColor = data.Title.Color.HtmlColor
                    var TitleFontSize = data.Title.FontSize
                    var TitlePosition = data.Title.Position
                    var TitleShow = data.Title.Show
                    var backgroundColor2 = data.BackgroundColor.HtmlColor
                    var ToolTipm
                    var formatterShow = false
                    if (data.Label.ValueShow == true) {
                        ToolTipm = '{b}'
                        formatterShow = true
                    }
                    if (data.Label.DimensionShow == true) {
                        ToolTipm = '{c}'
                        formatterShow = true
                    }
                    if (data.Label.ValueShow == true && data.Label.DimensionShow == true) {
                        ToolTipm = '{b}: {c}'
                        formatterShow = true
                    }
                    var AxisLabelFontSize = data.Variable.Tooltip.AxisLabelFontSize
                    var SeriesDetailFontSize = data.Variable.Tooltip.SeriesDetailFontSize
                    var DimensionName = data.Variable.DimensionName
                    var Max = data.Variable.Range.Max
                    var Min = data.Variable.Range.Min
                    var SplitNumber = data.Variable.Range.SplitSegments
                    var AreaColorOne = data.Variable.Range.NormalScale
                    var AreaColorTwo = data.Variable.Range.WarnScale
                    var SeriesDetailShow = data.Variable.Tooltip.SeriesDetailShow
                    var AxisLabelShow = data.Variable.Tooltip.AxisLabelShow
                    var Dashvalue = Number(data.Variable.Value).toFixed(data.Variable.ValueDigit)
                    let colorarr
                    if (data.ColorType == "Multicolor") {

                        colorarr = [[AreaColorOne / 100, data.Variable.Range.NormalColor.HtmlColor], [(100 - AreaColorTwo) / 100, data.Variable.Range.ExcessColor.HtmlColor], [1, data.Variable.Range.WarnColor.HtmlColor]]
                    } else if (data.ColorType == "GradientMulticolor") {
                        if (data.ThemeType == 'Light') {
                            colorarr = [[1, '#45476B']]
                        } else {
                            colorarr = [[1, 'rgba(229,234,247,0.4)']]
                        }
                    } else {
                        if (data.ThemeType == 'Light') {
                            colorarr = [[1, '#534F66']]
                        } else {
                            colorarr = [[1, 'rgba(229,234,247,0.4)']]
                        }
                    }
                    let colorarr2 = []

                    let itemcolortry
                    if (data.ColorType !== "Multicolor" && data.ColorType !== "GradientMulticolor") {
                        data.Variable.Range.NormalLinearColor.GradientStops.forEach((item) => {
                            colorarr2.push({
                                offset: item.Offset,
                                color: item.Color.HtmlColor
                            })
                        })
                        itemcolortry = {
                            color: {
                                type: 'linear',
                                x: data.Variable.Range.NormalLinearStartPoint.split(',')[0],
                                y: data.Variable.Range.NormalLinearStartPoint.split(',')[1],
                                x2: data.Variable.Range.NormalLinearEndPoint.split(',')[0],
                                y2: data.Variable.Range.NormalLinearEndPoint.split(',')[1],
                                colorStops: colorarr2,
                                global: false // 缺省为 false
                            }
                        }
                    } else if (data.ColorType !== "GradientMulticolor") {
                        itemcolortry = {
                            color: data.Variable.Color.HtmlColor
                        }
                    } else {
                        let color = ''
                        if (Dashvalue >= (Max * ((AreaColorOne + data.Variable.Range.ExcessScale) / 100))) {
                            color = data.Variable.Range.WarnColor.HtmlColor
                        } else if (Dashvalue >= (Max * ((AreaColorOne) / 100))) {
                            color = data.Variable.Range.ExcessColor.HtmlColor
                        } else {
                            color = data.Variable.Range.NormalColor.HtmlColor
                        }
                        // [[AreaColorOne / 100,data.Variable.Range.NormalColor.HtmlColor],[(100 - AreaColorTwo) / 100 ,data.Variable.Range.ExcessColor.HtmlColor],[1, data.Variable.Range.WarnColor.HtmlColor]]
                        data.Variable.Range.NormalLinearColor.GradientStops.forEach((item) => {
                            colorarr2.push({
                                offset: item.Offset,
                                color: color
                            })
                        })

                        itemcolortry = {
                            color: {
                                type: 'linear',
                                x: data.Variable.Range.NormalLinearStartPoint.split(',')[0],
                                y: data.Variable.Range.NormalLinearStartPoint.split(',')[1],
                                x2: data.Variable.Range.NormalLinearEndPoint.split(',')[0],
                                y2: data.Variable.Range.NormalLinearEndPoint.split(',')[1],
                                colorStops: colorarr2,
                                global: false // 缺省为 false
                            }
                        }
                    }
                    var Dashvalue2
                    if (Dashvalue == 0) {
                        Dashvalue2 = 0
                    } else {
                        Dashvalue2 = (Dashvalue - Min) > (Max - Min) ? (Max - Min) : (Dashvalue - Min)
                    }
                    var Unit = data.Variable.Unit
                    var AxisSplitNumber = data.Variable.Range.Scale
                    var titleColor = data.Variable.Color.HtmlColor
                    let newvalue = data.Variable.Tooltip.SeriesShowDetailMode === 1 ? Number(data.Variable.Value) < Number(data.Variable.Range.Min) ? 0 : ((Number(data.Variable.Value) - Number(data.Variable.Range.Min)) / (Number(data.Variable.Range.Max) - Number(data.Variable.Range.Min))) * 100 : Number(data.Variable.Value)

                    var DashBoardChartOption = {
                        Unit: Unit,
                        SeriesShowDetailMode: data.Variable.Tooltip.SeriesShowDetailMode,
                        fixed: data.Variable.ValueDigit,
                        Range: data.Variable.Range,
                        IsRing: data.IsRing,
                        ColorType: data.ColorType,
                        title: {
                            text: Title,
                            left: TitlePosition.toLowerCase(),
                            show: TitleShow,
                            textStyle:
                            {
                                fontFamily: '宋体',
                                color: TitleFontColor,
                                fontSize: TitleFontSize,
                            },
                            padding: [12, 10]
                        },
                        backgroundColor: backgroundColor2,
                        animation: false,
                        tooltip: {
                            formatter: ToolTipm,
                            show: formatterShow
                        },
                        series: [
                            {
                                name: '业务指标',
                                type: 'gauge',
                                radius: data.DiscRadius + '%',
                                center: ['50%', data.PositionOffset + '%'],
                                min: Min,
                                max: Max,
                                progress: {
                                    show: data.ColorType == "Multicolor" ? false : true,
                                    width: data.LineWith,
                                    itemStyle: itemcolortry
                                },
                                pointer: {              // 仪表盘指针。
                                    show: data.PointShow,
                                    length: "60%",
                                    width: Number(data.RingSize) * 0.2
                                },
                                title: {   //改变颜色
                                    offsetCenter: ['0', '-30%'],
                                    textStyle: {
                                        color: titleColor,
                                        "fontSize": 20
                                    }
                                },
                                axisLabel: {
                                    show: (AxisLabelShow && Number(SplitNumber) !== 0) ? true : false,
                                    color: data.Variable.Range.ScaleColor.HtmlColor,
                                    distance: 25,
                                    formatter: function (v) {
                                        if (!Number(SplitNumber)) {
                                            return v
                                        } else {
                                            if (((Number(Max) - Number(Min)) / Number(SplitNumber)).toString().split(".").length > 1) {
                                                if (((Number(Max) - Number(Min)) / Number(SplitNumber)).toString().split(".")[1].length > 2) {
                                                    return v.toFixed(2)
                                                } else {
                                                    return v
                                                }
                                            } else {
                                                return v
                                            }

                                        }
                                    },
                                    fontSize: AxisLabelFontSize
                                }, //刻度标签。
                                splitNumber: Number(SplitNumber),
                                axisTick: {
                                    "distance": 0,
                                    length: data.Variable.Range.ScaleLength,
                                    splitNumber: Number(AxisSplitNumber),
                                    "lineStyle": {
                                        color: '#45476B',
                                        width: data.Variable.Range.ScaleWidth
                                    },
                                    "show": data.Variable.Range.ScaleShow
                                },
                                anchor: {
                                    show: data.PointShow,
                                    showAbove: true,
                                    size: data.RingSize,
                                    itemStyle: {
                                        borderWidth: 6,
                                        borderColor: data.PointColor ? data.PointColor.HtmlColor : '#000'
                                    }
                                },
                                splitLine: {           // 分隔线
                                    length: data.Variable.Range.SplitSegmentsLength,        // 属性length控制线长
                                    show: data.Variable.Range.SplitSegmentsShow,
                                    "distance": 0,
                                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                        color: '#45476B',
                                        width: data.Variable.Range.SplitSegmentsWidth
                                    },
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: colorarr,
                                        width: data.LineWith,
                                        shadowColor: '#000', //默认透明
                                        shadowBlur: 0,
                                    }
                                }, //仪表盘轴线
                                itemStyle: {            // 仪表盘指针样式。
                                    color: "auto",
                                },
                                "z": 7,
                                detail: {
                                    show: SeriesDetailShow,
                                    offsetCenter: ["0", "30%"],
                                    color: !data.DetailColor ? data.DetailColor : data.DetailColor.HtmlColor,
                                    formatter: newvalue.toFixed(data.Variable.ValueDigit) + Unit,
                                    textStyle: {
                                        "fontSize": SeriesDetailFontSize,
                                    }
                                },
                                data: [{ value: Dashvalue, name: data.Variable.Show ? DimensionName : '', itemStyle: { color: data.PointColor ? data.PointColor.HtmlColor : '#000' } }],
                                title: {
                                    offsetCenter: [0, "-30%"],
                                    color: titleColor,
                                    fontSize: data.Variable.FontSize
                                }

                            }
                        ]
                    }
                    if (data.ShowRingBackground) DashBoardChartOption.series.push({
                        "axisLabel": {
                            "show": false,
                        },
                        "splitNumber": 0,
                        type: 'gauge',
                        "splitLine": {
                            show: false,
                        },
                        "splitNumber": 0,
                        radius: DashBoardChartOption.series[0].radius,
                        center: DashBoardChartOption.series[0].center,
                        axisLine: {
                            lineStyle: {
                                width: -1 * Number(data.RingWith),
                                color: [
                                    [1, 'rgba(72,118,245,0.15)']
                                ]
                            }
                        },
                        datail: {
                            show: false
                        }
                    })
                    Chart1 = echarts.init(bardiv);

                    Chart1.setOption(DashBoardChartOption, true);

                    allchartlist.push([Chart1, changedata.DashBoardChart[i].name]);
                }
            }
        }
    }

    //初始化折线图
    if (changedata.hasOwnProperty('LineChart')) {
        if (changedata.LineChart.length !== 0) {
            for (let i = 0; i < changedata.LineChart.length; i++) {
                var bardiv = document.createElement("div");
                let _div = bardiv
                // bardiv.id = changedata.LineChart[i].name;
                bardiv.style.height = changedata.LineChart[i].height + 'px';
                bardiv.style.width = changedata.LineChart[i].width + 'px';
                bardiv.style.position = "absolute";
                bardiv.style.top = changedata.LineChart[i].y + 'px';
                bardiv.style.left = changedata.LineChart[i].x + 'px';
                document.body.appendChild(bardiv);
                let chartDiv = document.createElement("div");
                chartDiv.style.height = changedata.LineChart[i].height + 'px';
                chartDiv.style.width = changedata.LineChart[i].width + 'px';
                chartDiv.id = changedata.LineChart[i].name;
                bardiv.appendChild(chartDiv)

                var data
                LineChartData = changedata.LineChart[i].option
                data = LineChartData
                LineChartShow = false
                /* 新增需求，添加滑块 */
                var sliderDiv = `<div style="position:absolute;right:80px;top: 5px;font-size:12px;color:#606266;display: flex;align-items: center;width:165px; z-index: 99">
                    <div style="min-width: 105px; display: flex; align-items: center;" >
                        <span title="点击重置滑块" style="width: 20px;height: 20px;margin-right: 3px;background: url('./imgs/reset.png');background-size: 100% 100%;cursor:pointer;"  onclick="resetSlider(event, '${changedata.LineChart[i].name}')" ></span>
                        <input type="checkbox" id="${changedata.LineChart[i].name}SCheckbox" onchange="changeCheckbox(event, '${changedata.LineChart[i].name}', '${changedata.LineChart[i].id}')" value="SCheckbox" ></input>
                        <label for="SCheckbox" style="margin-right: 5px;">滑块模式</label>
                    </div>
                    <div style="width: 60px;display: flex;align-items: center;" id="${changedata.LineChart[i].name}Data">
                       
                    <input style="width:30px; text-align:center" min="1" id="${changedata.LineChart[i].name}SInput" 
                        onkeydown="keydownInput(event, ${changedata.LineChart[i].name}SInput)" onblur="blurInput(event, '${changedata.LineChart[i].name}', '${changedata.LineChart[i].id}')" ></input>
                        <span title="图表显示的数据条数" style="width: 20px;height: 20px;margin-left: 3px;background: url('./imgs/prompt.png');background-size: 100% 100%;" ></span>
                    </div>
                </div>`
                bardiv.insertAdjacentHTML('afterbegin', sliderDiv)

                data.a
                var lenIndex //最后一个显示图例
                var lenDataArr = [] //最后一个图例数据
                var lenXData

                var ShowTootip = data.ShowTootip
                var TooptipTrigger = data.AxisPointer.Trigger
                var TooptipType = data.AxisPointer.Type
                var TooptipColor = data.AxisPointer.Color.HtmlColor
                var ItemHeight = data.Legend.ItemHeight
                var ItemWidth = data.Legend.ItemWidth
                var FontWeight = data.Legend.FontWeight
                var FontFamily = data.Legend.FontFamily
                var LengendShow = data.Legend.Show
                var LengenColor = data.Legend.Color.HtmlColor
                var lengenPosition = data.Legend.Position
                var lengenFontSize = data.Legend.FontSize
                var dataColor = data.Label.Color.HtmlColor
                var LengenB
                var lengenT
                var lengenL
                var LengenR
                var LPtb
                var LPlr
                var LegendData = []
                var TooColorArr = []
                for (var j = 0; j < data.Variables.length; j++) {
                    LegendData.push(data.Variables[j].DimensionName)
                    if (data.Variables[j].Color) {
                        TooColorArr.push(data.Variables[j].Color.HtmlColor)
                    }

                }
                if (lengenPosition == 'RightCenter') {
                    LengenB = null
                    lengenT = "center"
                    lengenL = null
                    LengenR = "right"
                    LPtb = 10
                    LPlr = 30
                }
                if (lengenPosition == 'RightTop') {
                    LengenB = null
                    lengenT = "top"
                    lengenL = null
                    LengenR = 'left'
                    LPtb = 30
                    LPlr = 10
                }
                if (lengenPosition == 'RightBottom') {
                    LengenB = "bottom"
                    lengenT = null
                    lengenL = null
                    LengenR = 'left'
                    LPtb = 10
                    LPlr = 10
                }
                /* 新增需求 -滑块模式 */
                // 给各自chart的sliderdata 赋初始值
                if (!data.DataZoom) {
                    data.DataZoom = {
                        Show: false,
                        DataNumber: 5
                    }
                }
                sliderData[changedata.LineChart[i].name] = {}
                sliderData[changedata.LineChart[i].name].show = data.DataZoom.Show /* true */
                sliderData[changedata.LineChart[i].name].count = data.DataZoom.DataNumber /* 5 */
                sliderData[changedata.LineChart[i].name].startValue = 0
                sliderData[changedata.LineChart[i].name].isFirst = true
                sliderData[changedata.LineChart[i].name].nowStartTime = '';
                let sliderCheck = document.getElementById(`${changedata.LineChart[i].name}SCheckbox`)
                let sliderInput = document.getElementById(`${changedata.LineChart[i].name}SInput`)
                sliderCheck.checked = sliderData[changedata.LineChart[i].name].show
                sliderInput.value = sliderData[changedata.LineChart[i].name].count
                if (sliderCheck.checked) {
                    // document.getElementById(`${changedata.LineChart[i].name}Data`).style.visibility = 'visible'
                    sliderInput.disabled = false
                } else {
                    // document.getElementById(`${changedata.LineChart[i].name}Data`).style.visibility = 'hidden'
                    sliderInput.disabled = true
                }
                /* **** */

                var Title = data.Title.Title
                var TitlePosition = data.Title.Position
                var TitleIsChecked = data.Title.Show
                var TitleFontColor = data.Title.Color.HtmlColor
                var TitleFontSize = data.Title.FontSize
                var gridLeft = data.DrawContent.LeftMargin
                var gridRight = data.DrawContent.RightMargin
                var gridBottom = data.DrawContent.BottomMargin
                var gridTop = data.DrawContent.TopMargin
                var labelShow = data.Label.Show
                var labelFontSize = data.Label.FontSize
                var backgroundColor = data.BackgroundColor.HtmlColor
                var toolboxShow = data.Toolbox == null ? false : data.Toolbox.FeatureShow
                //x轴
                var XfontSize = data.XAxis.FontSize
                var Xcolor = data.XAxis.Color.HtmlColor
                var XfontFamily = data.XAxis.FontFamily
                var XfontWeight = data.XAxis.FontWeight
                var XSplitLine = data.XAxis.SplitLine
                var XSplitLineFontWeight = data.XAxis.XSplitLineFontWeight
                var XSplitLineWidth = data.XAxis.SplitLineWidth
                var XSplitLineColor = data.XAxis.SplitLineColor.HtmlColor
                var XSplitLineShow = data.XAxis.SplitLineColor.SplitLineShow
                var YAxisesArr = []
                //y轴
                for (var v6 = 0; v6 < data.YAxises.length; v6++) {
                    var YAxises = data.YAxises[v6]
                    let YAxisMax1 = YAxises.Max
                    let YAxisMin1 = YAxises.Min
                    let offsetNum
                    if (v6 != 0) {
                        offsetNum = (v6 - 1) * 50
                    } else {
                        offsetNum = 0
                    }
                    if (YAxises.Adaptive == true) {
                        YAxisMax1 = null
                        YAxisMin1 = null
                    }
                    var unit22 = YAxises.Unit == null ? '' : YAxises.Unit
                    var value2 = {
                        YAxisMax1: YAxises.Max,
                        YAxisMin1: YAxises.Min,
                        Adaptive: YAxises.Adaptive,
                        "name": YAxises.Name,
                        offset: offsetNum,
                        splitNumber: !YAxises.IsCustomSegmentation ? 0 : YAxises.CustomSegmentation,
                        "axisLabel": {
                            "formatter": "{value} " + unit22,
                            "color": YAxises.Color.HtmlColor,
                            "fontFamily": YAxises.FontFamily,
                            "fontWeight": 400,
                            "fontSize": YAxises.FontSize,
                            "textStyle": {
                                "fontWeight": null
                            }
                        },
                        "label": {
                            "textStyle": {
                                "color": YAxises.Color.HtmlColor
                            }
                        },
                        "min": YAxisMin1,
                        "max": YAxisMax1,
                        "nameTextStyle": {
                            "fontSize": YAxises.FontSize,
                            "color": YAxises.Color.HtmlColor
                        },
                        "axisLine": {
                            "show": true,
                            "lineStyle": {
                                "color": YAxises.Color.HtmlColor
                            }
                        },
                        "splitLine": {
                            "lineStyle": {
                                type: 'dashed',
                                "color": data.ThemeType == "Dark" ? "rgba(210,210,210,0.49)" : "rgba(210,210,210,0.9)"
                            },
                            "show": YAxises.ShowSeparator
                        }
                    }
                    YAxisesArr.push(value2)



                }

                //辅助线
                var AuxiliaryLinesData = data.AuxiliaryLines
                var markLineData = []
                if (AuxiliaryLinesData.length) {
                    for (var v1 = 0; v1 < AuxiliaryLinesData.length; v1++) {
                        var value1 = {
                            yAxis: AuxiliaryLinesData[v1].Value,
                            Axis: {
                                AxisType: AuxiliaryLinesData[v1].Axis.AxisType,
                                Value: AuxiliaryLinesData[v1].Axis.Value
                            },
                            lineStyle: {
                                type: AuxiliaryLinesData[v1].Type,
                                color: AuxiliaryLinesData[v1].Color.HtmlColor
                            }
                        }
                        markLineData.push(value1)
                    }
                }

                var Xdata = []
                var seData = []
                VariablesData = data.Variables
                //样式
                var seriesArr = []
                var indexArr = []
                for (let v = 0; v < VariablesData.length; v++) {
                    var markLineData2 = []
                    var index = indexArr.indexOf(VariablesData[v].CurrentAxis.Value)
                    if (index == -1) {
                        for (var v5 = 0; v5 < markLineData.length; v5++) {
                            if (VariablesData[v].CurrentAxis.Value == markLineData[v5].Axis.Value) {
                                indexArr.push(VariablesData[v].CurrentAxis.Value)
                                markLineData2.push(markLineData[v5])
                            }
                        }
                    }

                    var value = {
                        "name": VariablesData[v].DimensionName,
                        "data": [],
                        smooth: data.IsSmooth,
                        areaStyle: data.ShowRangeFill ? {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7), data.RangeOpacity) // 0% 处的颜色
                                }, {
                                    offset: 1, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7), 0)// 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        } : {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7), 0) // 0% 处的颜色
                                }, {
                                    offset: 1, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7), 0)// 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbolSize: data.NumericalPoint,
                        showSymbol: data.ShowNumericalPoint,
                        "type": VariablesData[v].DataType.toLowerCase(),
                        "label": {
                            "fontSize": labelFontSize,
                            "show": labelShow,
                            "color": dataColor
                        },
                        "lineStyle": {
                            "color": VariablesData[v].Color.HtmlColor,
                            "width": 3,
                            "shadowBlur": 25,
                            "shadowOffsetY": 10,
                            "shadowColor": "rgba(0, 0, 0, 0.2)"
                        },
                        "yAxisIndex": VariablesData[v].CurrentAxis.Value,
                        markLine: {
                            symbol: 'none',
                            data: markLineData2
                        }
                    }
                    seriesArr.push(value)
                }
                var linechartOption = {
                    animation: false,
                    "color": TooColorArr,
                    "tooltip": {
                        "show": ShowTootip,
                        "trigger": TooptipTrigger,
                        "axisPointer": {
                            "type": TooptipType,
                            "lineStyle": {
                                "color": TooptipColor
                            }
                        },
                        formatter: function (params) {
                            var div = document.createElement('div');
                            var children = [];
                            var title = '';
                            for (let i = 0; i < params.length; i++) {
                                const element = params[i];
                                if (element.data !== null && element.data !== undefined) {//0也需要显示
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
                            if (children.length === 0) {
                                return null;
                            }
                            return div.innerHTML;
                        }
                    },
                    "toolbox": {
                        "show": toolboxShow,
                        "feature": {

                            "dataZoom": {
                                "yAxisIndex": 'none'
                            },
                            // "restore": {},
                            // myTool1: {
                            //     show: true,
                            //     title: "还原",
                            //     icon:
                            //         "path://M512 981.333333c-209.866667 0-396.693333-126.026667-466.293333-314.08a35.52 35.52 0 0 1 23.626666-44.426666 38.613333 38.613333 0 0 1 48 20.693333c58.666667 158.933333 217.013333 265.493333 394.666667 265.6s336-106.666667 394.666667-266.133333a37.6 37.6 0 0 1 28.853333-23.626667 38.986667 38.986667 0 0 1 35.786667 11.946667 34.773333 34.773333 0 0 1 7.146666 35.36c-69.386667 188.373333-256.48 314.666667-466.453333 314.666666z m431.36-574.08a37.92 37.92 0 0 1-35.946667-24.266666C849.386667 222.56 690.613333 114.88 512 114.72S174.72 222.346667 116.746667 382.773333A38.72 38.72 0 0 1 69.333333 403.733333a35.786667 35.786667 0 0 1-24.106666-44.373333C113.333333 169.866667 301.013333 42.666667 512 42.666667s398.666667 127.306667 467.146667 316.96a34.56 34.56 0 0 1-4.906667 32.64 38.933333 38.933333 0 0 1-30.88 14.986666z",
                            //     onclick: () => {
                            //         let _chart = echarts.init(_div);
                            //         let option = _chart.getOption()
                            //         _chart.setOption(option, true);
                            //     },
                            // },
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
                            "lineStyle": {
                                "color": Xcolor
                            }
                        },
                        "splitLine": {
                            "lineStyle": {
                                "color": {
                                    "HtmlColor": XSplitLineColor
                                }
                            },
                            "show": XSplitLineShow
                        }
                    },
                    "series": seriesArr,
                    "legend": {
                        "data": LegendData,
                        "icon": "circle",
                        "itemHeight": ItemHeight,
                        "itemWidth": ItemWidth,
                        "textStyle": {
                            "fontWeight": FontWeight,
                            "fontFamily": FontFamily,
                            "color": LengenColor,
                            "fontSize": lengenFontSize
                        },
                        "show": LengendShow,
                        "left": lengenL,
                        "right": LengenR,
                        "top": lengenT,
                        "bottom": LengenB,
                        "padding": [LPtb, LPlr]
                    },
                    "backgroundColor": backgroundColor,
                    "title": {
                        "textStyle": {
                            "color": TitleFontColor,
                            "fontSize": TitleFontSize
                        },
                        "padding": [12, 10],
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
                Chart1 = echarts.init(document.getElementById(changedata.LineChart[i].name) /* chartDiv */);
                // const cha2 = Chart1



                ((Chart) => {
                    Chart.on('legendselectchanged', function (obj) {
                        var a = Chart.getOption();


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
                                    } else {
                                        show = false

                                    }
                                } else if (s.markLine.length == 0 || s.markLine == '' || s.markLine.data.length == 0) {
                                    let x = seriesData.filter(x => x.name != obj.name && x.yAxisIndex == yIndex && x.markLine != '');
                                    if (x.length) {
                                        let m = x[0].markLine;
                                        s.markLine = m;
                                        x[0].markLine = '';
                                        Chart.setOption(a, true);
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
                                            Chart.setOption(a, true);
                                            return
                                        }
                                    }
                                }
                            }
                        }

                        let trueArr = []
                        let falseArr = []
                        for (let item in obj.selected) {
                            if (obj.selected[item] == true) {
                                trueArr.push(item)
                            } else {
                                falseArr.push(item)
                            }
                        }

                        if (trueArr.length == 1) {
                            for (let f = 0; f < a.series.length; f++) {
                                if (a.series[f].name == trueArr[0]) {
                                    lenIndex = f
                                    lenDataArr = a.series[f].data
                                    lenXData = a.xAxis[0].data
                                }
                            }

                            var lenDArr = []
                            var lenXArr = []
                            for (let h = 0; h < a.series[lenIndex].data.length; h++) {

                                if (a.series[lenIndex].data[h] != null) {
                                    lenDArr.push(a.series[lenIndex].data[h])
                                    lenXArr.push(a.xAxis[0].data[h])
                                }
                            }
                            a.series[lenIndex].data = lenDArr
                            a.xAxis[0].data = lenXArr

                            Chart.setOption(a, true);
                        } else {
                            if (lenDataArr.length != 0) {
                                a.series[lenIndex].data = lenDataArr
                                a.xAxis[0].data = lenXData
                                Chart.setOption(a, true);
                            }
                        }


                    })
                    Chart.on('datazoom', function (params) {
                        let startValue = Chart.getModel().option.dataZoom[1].startValue // x轴开始值
                        console.log("datazoom_", Chart.getModel().option.dataZoom)
                        console.log("datazoom_startValue", startValue)
                        let endValue = Chart.getModel().option.dataZoom[1].endValue // x轴结束值
                        sliderData[changedata.LineChart[i].name].startValue = startValue
                        let sInput = document.getElementById(`${changedata.LineChart[i].name}SInput`)
                        sInput.value = endValue - startValue + 1
                        sliderData[changedata.LineChart[i].name].count = endValue - startValue + 1
                        jsObj.setParam(changedata.LineChart[i].id, { DataZoom_Show: sliderData[changedata.LineChart[i].name].show, DataZoom_DataNumber: sliderData[changedata.LineChart[i].name].count });
                        sliderData[changedata.LineChart[i].name].nowStartTime = Chart.getModel().option.xAxis[0].data[startValue]
                        sliderData[changedata.LineChart[i].name].isFirst = false
                    })
                    // Chart.on('restore', function (params) {
                    //     sliderData[changedata.LineChart[i].name].isFirst = true
                    // })
                })(Chart1)

                linechartOption.dataZoom = [
                    {
                        show: sliderData[changedata.LineChart[i].name].show,
                        type: 'slider',
                        realtime: true,
                        height: 15,
                        bottom: 10,
                    }
                ]

                if (sliderData[changedata.LineChart[i].name].show) {
                    linechartOption.dataZoom[0].startValue = linechartOption.xAxis.data[sliderData[changedata.LineChart[i].name].startValue]
                    linechartOption.dataZoom[0].endValue = linechartOption.xAxis.data[sliderData[changedata.LineChart[i].name].startValue + sliderData[changedata.LineChart[i].name].count - 1]
                }
                Chart1.setOption(linechartOption, true);
                jsObj.setParam(changedata.LineChart[i].id, { DataZoom_Show: sliderData[changedata.LineChart[i].name].show, DataZoom_DataNumber: sliderData[changedata.LineChart[i].name].count });
                allchartlist.push([Chart1, changedata.LineChart[i].name, changedata.LineChart[i].option.IsOrigin]);
            }
        }
    }

    //初始化柱状图
    if (changedata.hasOwnProperty('BarChart')) {
        if (changedata.BarChart.length !== 0) {
            for (let i = 0; i < changedata.BarChart.length; i++) {
                var bardiv = document.createElement("div");
                bardiv.id = changedata.BarChart[i].name;
                bardiv.style.height = changedata.BarChart[i].height + 'px';
                bardiv.style.width = changedata.BarChart[i].width + 'px';
                bardiv.style.position = "absolute";
                bardiv.style.top = changedata.BarChart[i].y + 'px';
                bardiv.style.left = changedata.BarChart[i].x + 'px';
                document.body.appendChild(bardiv);
                var data
                BarChartData = changedata.BarChart[i].option
                data = BarChartData
                BarChartShow = false
                var IsTime = data.IsTime
                var IsOrigin = data.IsOrigin
                var IsDuidie = data.IsDuidie
                var Title = data.Title.Title
                var TitlePosition = data.Title.Position
                var TitleIsChecked = data.Title.Show
                var TitleFontColor = data.Title.Color.HtmlColor
                var TitleFontSize = data.Title.FontSize
                var ItemHeight = data.Legend.ItemHeight
                var ItemWidth = data.Legend.ItemWidth
                var FontWeight = data.Legend.FontWeight
                var FontFamily = data.Legend.FontFamily
                var LengendShow = data.Legend.Show
                var LengenColor = data.Legend.Color.HtmlColor
                var lengenPosition = data.Legend.Position
                var lengenFontSize = data.Legend.FontSize
                var LengenB = null
                var lengenT = "center"
                var lengenL = null
                var LengenR = "right"
                var LPtb = 10
                var LPlr = 30
                var IsTime = data.IsTime
                var TooColorArr = []
                var LegendData = []
                for (var j = 0; j < data.Variables.length; j++) {
                    LegendData.push(data.Variables[j].DimensionName)
                    if (data.Variables[j].Color) {
                        TooColorArr.push(data.Variables[j].Color.HtmlColor)
                    }

                }
                if (lengenPosition == 'RightCenter') {
                    LengenB = null
                    lengenT = "center"
                    lengenL = null
                    LengenR = "right"
                    LPtb = 10
                    LPlr = 30
                }
                if (lengenPosition == 'RightTop') {
                    LengenB = null
                    lengenT = "top"
                    lengenL = null
                    LengenR = 'left'
                    LPtb = 30
                    LPlr = 10
                }
                if (lengenPosition == 'RightBottom') {
                    LengenB = "bottom"
                    lengenT = null
                    lengenL = null
                    LengenR = 'left'
                    LPtb = 10
                    LPlr = 10
                }
                var gridLeft = data.DrawContent.LeftMargin
                var gridRight = data.DrawContent.RightMargin
                var gridBottom = data.DrawContent.BottomMargin
                var gridTop = data.DrawContent.TopMargin
                var labelShow = data.Label.Show
                var labelFontSize = data.Label.FontSize
                var labelColor = data.Label.Color.HtmlColor
                backgroundColor = data.BackgroundColor.HtmlColor
                //x
                var XfontSize = data.XAxis.FontSize
                var Xcolor = data.XAxis.Color.HtmlColor
                var XfontFamily = data.XAxis.FontFamily
                var XfontWeight = data.XAxis.FontWeight
                var XSplitLine = data.XAxis.SplitLine
                var XSplitLineFontWeight = data.XAxis.XSplitLineFontWeight
                var XSplitLineWidth = data.XAxis.SplitLineWidth
                var XSplitLineColor = data.XAxis.SplitLineColor.HtmlColor
                var XSplitLineShow = data.XAxis.SplitLineColor.SplitLineShow
                //y
                var Yname = data.AxisChartYAxis.Name
                var Adaptive = data.AxisChartYAxis.Adaptive
                var YAxisMax = data.AxisChartYAxis.Max
                var YAxisMin = data.AxisChartYAxis.Min
                if (Adaptive == true) {
                    YAxisMax = null
                    YAxisMin = null
                }
                var YsplitLine = data.AxisChartYAxis.SplitLineShow
                var YfontSize = data.AxisChartYAxis.FontSize
                var Ycolor = data.AxisChartYAxis.Color.HtmlColor
                var Unit = data.AxisChartYAxis.Unit == null ? '' : data.AxisChartYAxis.Unit
                var SplitLineFontWeight = data.AxisChartYAxis.SplitLineFontWeight
                var SplitLineWidth = data.AxisChartYAxis.SplitLineWidth
                var SplitLineColor = data.AxisChartYAxis.SplitLineColor.HtmlColor
                var YFontFamily = data.AxisChartYAxis.FontFamily
                var ShowSeparator = data.AxisChartYAxis.ShowSeparator
                var Xdata = []
                var seData = []
                var VariablesData = data.Variables
                //柱形图样式
                var seriesArr = []
                var seData1 = []
                var stackarr = []
                IsDuidie = !IsTime ? IsOrigin ? 1 : 1 : IsDuidie
                for (let v = 0; v < VariablesData.length; v++) {
                    let colorarr = []
                    VariablesData[v].LinearBrush.GradientStops.forEach((item) => {
                        colorarr.push({
                            offset: item.Offset,
                            color: item.Color.HtmlColor
                        })
                    })
                    let itemcolortry
                    if (VariablesData[v].BrushTypes) {
                        itemcolortry = {
                            shadowColor: "rgba(85,85,85,0.2)",
                            shadowBlur: 2,

                            shadowOffsetX: 2,
                            color: {
                                type: 'linear',
                                x: VariablesData[v].StartPoint.split(',')[0],
                                y: VariablesData[v].StartPoint.split(',')[1],
                                x2: VariablesData[v].EndPoint.split(',')[0],
                                y2: VariablesData[v].EndPoint.split(',')[1],
                                colorStops: colorarr,
                                global: false // 缺省为 false
                            }
                        }
                    } else {
                        itemcolortry = {
                            shadowColor: "rgba(85,85,85,0.2)",
                            shadowBlur: 2,
                            shadowOffsetX: 2,
                            color: VariablesData[v].Color.HtmlColor
                        }
                    }
                    var value2 = {
                        name: VariablesData[v].DimensionName,
                        data: seData[v],
                        barMaxWidth: 25.0,
                        stack: IsDuidie,
                        showBackground: data.ShowBackground,
                        type: VariablesData[v].DataType.toLowerCase(),
                        itemStyle: itemcolortry,
                        label: {
                            color: labelColor,
                            fontSize: labelFontSize,
                            show: labelShow
                        },
                        lineStyle: {
                            color: VariablesData[v].Color.HtmlColor,
                            width: 4
                        },
                        markLine: ''
                    }
                    seriesArr.push(value2)
                }
                //辅助线
                var AuxiliaryLinesData = data.AuxiliaryLines
                var markLineData = {
                    symbol: 'none',
                    data: []
                }
                if (AuxiliaryLinesData.length) {
                    for (var v1 = 0; v1 < AuxiliaryLinesData.length; v1++) {
                        var value1 = {
                            yAxis: AuxiliaryLinesData[v1].Value,
                            lineStyle: {
                                type: AuxiliaryLinesData[v1].Type,
                                color: AuxiliaryLinesData[v1].Color.HtmlColor
                            }
                        }
                        markLineData.data.push(value1)
                    }
                }
                seriesArr[0].markLine = markLineData
                var BarChartOption = {
                    color: TooColorArr,
                    animation: false,
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
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
                                    txt.innerText = seriesName + ": " + element.data;
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
                    },
                    xAxis: {
                        data: Xdata,
                        axisLabel: {
                            fontWeight: XfontWeight,
                            fontFamily: XfontFamily,
                            textStyle: {
                                fontWeight: XfontWeight,
                            },
                            fontSize: XfontSize,
                            color: Xcolor
                        },
                        splitLine: {
                            lineStyle: {
                                color: {
                                    HtmlColor: XSplitLineColor
                                }
                            },
                            show: XSplitLineShow
                        },
                        "axisLine": {
                            show: true,
                            "lineStyle": {
                                "color": Xcolor
                            }
                        },
                    },
                    series: seriesArr,
                    legend: {
                        data: LegendData,
                        itemHeight: ItemHeight,
                        itemWidth: ItemWidth,
                        textStyle: {
                            fontWeight: FontWeight,
                            fontFamily: FontFamily,
                            color: LengenColor,
                            fontSize: lengenFontSize
                        },
                        show: LengendShow,
                        left: lengenL,
                        right: LengenR,
                        top: lengenT,
                        bottom: LengenB,
                        padding: [LPtb, LPlr]
                    },
                    yAxis: {
                        name: Yname,
                        IsTime: IsTime,
                        IsOrigin: IsOrigin,
                        IsDuidie: IsDuidie,
                        Adaptive: Adaptive,
                        splitNumber: !data.AxisChartYAxis.IsCustomSegmentation ? 0 : data.AxisChartYAxis.CustomSegmentation,
                        axisLabel: {
                            formatter: "{value} " + Unit,
                            color: Ycolor,
                            fontFamily: YFontFamily,
                            fontWeight: 400,
                            fontSize: YfontSize,
                            textStyle: {
                                fontWeight: 400
                            }
                        },
                        label: {
                            show: true,
                            textStyle: {
                                color: Ycolor
                            }
                        },
                        min: YAxisMin,
                        max: YAxisMax,
                        YAxisMax1: data.AxisChartYAxis.Max,
                        YAxisMin1: data.AxisChartYAxis.Min,
                        nameTextStyle: {
                            fontSize: YfontSize,
                            color: Ycolor
                        },
                        axisLine: {
                            "show": true,
                            lineStyle: {
                                color: Ycolor
                            }
                        },
                        splitLine: {
                            show: ShowSeparator,
                            "lineStyle": {
                                type: 'dashed',
                                "color": data.ThemeType == "Dark" ? "rgba(210,210,210,0.49)" : "rgba(210,210,210,0.9)"
                            },
                            color: SplitLineColor
                        }
                    },
                    backgroundColor: backgroundColor,
                    title: {
                        textStyle: {
                            color: TitleFontColor,
                            fontSize: TitleFontSize
                        },
                        padding: [12, 10],
                        x: TitlePosition.toLowerCase(),
                        show: TitleIsChecked,
                        text: Title
                    },

                    grid: {
                        left: gridLeft,
                        right: gridRight,
                        bottom: gridBottom,
                        top: gridTop
                    }
                }

                Chart1 = echarts.init(bardiv);

                Chart1.setOption(BarChartOption, true);

                const chr3 = Chart1
                Chart1.on('legendselectchanged', function (obj) {
                    var a = chr3.getOption();

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

                                } else {
                                    show = false

                                }
                            } else if (s.markLine == '' || s.markLine.data.length == 0) {
                                let x = seriesData.filter(x => x.name != obj.name && x.yAxisIndex == yIndex && x.markLine != '');
                                if (x.length) {
                                    let m = x[0].markLine;
                                    s.markLine = m;
                                    x[0].markLine = '';
                                    chr3.setOption(a, true);
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
                                        chr3.setOption(a, true);

                                        return
                                    }
                                }
                            }
                        }
                    }
                })
                allchartlist.push([Chart1, changedata.BarChart[i].name, changedata.BarChart[i].option.IsOrigin]);
            }
        }
    }

    //初始化折线柱状图
    if (changedata.hasOwnProperty('LineBarChart')) {

        if (changedata.LineBarChart.length !== 0) {
            for (let i = 0; i < changedata.LineBarChart.length; i++) {
                var bardiv = document.createElement("div");
                bardiv.id = changedata.LineBarChart[i].name;
                bardiv.style.height = changedata.LineBarChart[i].height + 'px';
                bardiv.style.width = changedata.LineBarChart[i].width + 'px';
                bardiv.style.position = "absolute";
                bardiv.style.top = changedata.LineBarChart[i].y + 'px';
                bardiv.style.left = changedata.LineBarChart[i].x + 'px';
                document.body.appendChild(bardiv);
                var data
                LineBarChartData = changedata.LineBarChart[i].option
                data = LineBarChartData
                LineBarChartShow = false

                var ItemHeight = data.Legend.ItemHeight
                var IsTime = data.IsTime
                var IsOrigin = data.IsOrigin
                var IsDuidie = data.IsDuidie
                var ItemWidth = data.Legend.ItemWidth
                var FontWeight = data.Legend.FontWeight
                var FontFamily = data.Legend.FontFamily
                var LengendShow = data.Legend.Show
                var LengenColor = data.Legend.Color.HtmlColor
                var lengenPosition = data.Legend.Position
                var lengenFontSize = data.Legend.FontSize
                var LengenB
                var lengenT
                var lengenL
                var LengenR
                var LPtb
                var LPlr
                var IsTime = data.IsTime
                var bartype = []
                if (data.AxisPointer != undefined) {
                    var AxisPointerType = data.AxisPointer.Type
                    var AxisPointerTrigger = data.AxisPointer.Trigger
                    var AxisPointerColor = data.AxisPointer.Color.HtmlColor
                }
                var LegendData = []
                var TooColorArr = []
                for (var j = 0; j < data.Variables.length; j++) {
                    if (data.Variables[j].DataType == 'Line') {
                        LegendData.push({
                            name: data.Variables[j].DimensionName,
                            icon: 'circle'
                        })
                    } else {
                        LegendData.push({
                            name: data.Variables[j].DimensionName,
                            icon: 'roundRect'
                        })
                    }
                    TooColorArr.push(data.Variables[j].Color.HtmlColor)
                }
                if (data.Variables !== undefined) {
                    data.Variables.forEach((item) => {
                        if (item.DataType == 'Bar') {
                            bartype.push(item.DimensionName)
                        }
                    })
                }
                if (lengenPosition == 'RightCenter') {
                    LengenB = null
                    lengenT = "center"
                    lengenL = null
                    LengenR = "right"
                    LPtb = 10
                    LPlr = 30
                }
                if (lengenPosition == 'RightTop') {
                    LengenB = null
                    lengenT = "top"
                    lengenL = null
                    LengenR = 'left'
                    LPtb = 30
                    LPlr = 10
                }
                if (lengenPosition == 'RightBottom') {
                    LengenB = "bottom"
                    lengenT = null
                    lengenL = null
                    LengenR = 'left'
                    LPtb = 10
                    LPlr = 10
                }
                var Title = data.Title.Title
                var TitlePosition = data.Title.Position
                var TitleIsChecked = data.Title.Show
                var TitleFontColor = colorRgba(data.Title.Color.HtmlColor)
                var TitleFontSize = data.Title.FontSize
                var gridLeft = data.DrawContent.LeftMargin
                var gridRight = data.DrawContent.RightMargin
                var gridBottom = data.DrawContent.BottomMargin
                var gridTop = data.DrawContent.TopMargin
                var labelShow = data.LineLabel.Show
                var labelFontSize = data.LineLabel.FontSize
                var BarLabelShow = data.BarLabel.Show
                var BarLabelFontSize = data.BarLabel.FontSize
                var BarLabelColor = colorRgba(data.BarLabel.Color.HtmlColor)
                var LineLabelColor = ''
                if (data.LineLabel) {
                    if (data.LineLabel.Color) {
                        LineLabelColor = colorRgba(data.LineLabel.Color.HtmlColor)
                    }
                }
                var backgroundColor = colorRgba(data.BackgroundColor.HtmlColor)
                var gridLeft = data.DrawContent.LeftMargin
                var gridRight = data.DrawContent.RightMargin
                var gridBottom = data.DrawContent.BottomMargin
                var gridTop = data.DrawContent.TopMargin
                //x轴
                var XfontSize = data.XAxis.FontSize
                var Xcolor = colorRgba(data.XAxis.Color.HtmlColor)
                var XfontFamily = data.XAxis.FontFamily
                var XfontWeight = data.XAxis.FontWeight
                var XSplitLine = data.XAxis.SplitLine
                var XSplitLineFontWeight = data.XAxis.XSplitLineFontWeight
                var XSplitLineWidth = data.XAxis.SplitLineWidth
                var XSplitLineColor = colorRgba(data.XAxis.SplitLineColor.HtmlColor)
                var XSplitLineShow = data.XAxis.SplitLineColor.SplitLineShow
                //y轴
                var Yname1 = data.AxisChartYAxiss[0].Name
                var Adaptive1 = data.AxisChartYAxiss[0].Adaptive
                var YAxisMax1 = data.AxisChartYAxiss[0].Max
                var YAxisMin1 = data.AxisChartYAxiss[0].Min
                var Unit1 = data.AxisChartYAxiss[0].Unit == null ? '' : data.AxisChartYAxiss[0].Unit
                if (Adaptive1 == true) {
                    YAxisMax1 = null
                    YAxisMin1 = null
                }
                var YsplitLine1 = data.AxisChartYAxiss[0].SplitLineShow
                var YfontSize1 = data.AxisChartYAxiss[0].FontSize
                var Ycolor1 = colorRgba(data.AxisChartYAxiss[0].Color.HtmlColor)
                var SplitLineFontWeight1 = data.AxisChartYAxiss[0].SplitLineFontWeight
                var SplitLineWidth1 = data.AxisChartYAxiss[0].SplitLineWidth
                var SplitLineColor1 = colorRgba(data.AxisChartYAxiss[0].SplitLineColor.HtmlColor)
                var YFontFamily1 = data.AxisChartYAxiss[0].FontFamily
                var ShowSeparator1 = data.AxisChartYAxiss[0].ShowSeparator
                var Yname2 = data.AxisChartYAxiss[1].Name
                var Adaptive2 = data.AxisChartYAxiss[1].Adaptive
                var YAxisMax2 = data.AxisChartYAxiss[1].Max
                var YAxisMin2 = data.AxisChartYAxiss[1].Min
                var Unit2 = data.AxisChartYAxiss[1].Unit == null ? '' : data.AxisChartYAxiss[1].Unit
                if (Adaptive2 == true) {
                    YAxisMax2 = null
                    YAxisMin2 = null
                }
                var YsplitLine2 = data.AxisChartYAxiss[1].SplitLineShow
                var YfontSize2 = data.AxisChartYAxiss[1].FontSize
                var Ycolor2 = colorRgba(data.AxisChartYAxiss[1].Color.HtmlColor)
                var SplitLineFontWeight2 = data.AxisChartYAxiss[1].SplitLineFontWeight
                var SplitLineWidth2 = data.AxisChartYAxiss[1].SplitLineWidth
                var SplitLineColor2 = colorRgba(data.AxisChartYAxiss[1].SplitLineColor.HtmlColor)
                var YFontFamily2 = data.AxisChartYAxiss[1].FontFamily
                var ShowSeparator2 = data.AxisChartYAxiss[1].ShowSeparator
                //辅助线
                var AuxiliaryLinesData = data.AuxiliaryLines
                var markLineData1 = {
                    symbol: 'none',
                    data: []
                }
                var markLineData2 = {
                    symbol: 'none',
                    data: []
                }

                if (AuxiliaryLinesData.length) {
                    for (var v1 = 0; v1 < AuxiliaryLinesData.length; v1++) {
                        if (AuxiliaryLinesData[v1].Axis.Value == 0) {
                            var value1 = {
                                yAxis: AuxiliaryLinesData[v1].Value,
                                lineStyle: {
                                    type: AuxiliaryLinesData[v1].Type,
                                    color: AuxiliaryLinesData[v1].Color.HtmlColor
                                }
                            }
                            markLineData1.data.push(value1)
                        } else {
                            var value2 = {
                                yAxis: AuxiliaryLinesData[v1].Value,
                                lineStyle: {
                                    type: AuxiliaryLinesData[v1].Type,
                                    color: AuxiliaryLinesData[v1].Color.HtmlColor
                                }
                            }
                            markLineData2.data.push(value2)
                        }
                    }
                }
                var Xdata = []
                var seData = []
                VariablesData = data.Variables
                seriesArr = []

                for (let v = 0; v < VariablesData.length; v++) {
                    let colorarr = []
                    let Sybolshow = VariablesData[v].DataType == 'Line' ? 'null' : 'none'

                    let v_IsDuidie = VariablesData[v].DataType.toLowerCase() !== 'bar' ? '' : !IsTime ? IsOrigin ? '' : 1 : IsDuidie ? 1 : ''
                    VariablesData[v].LinearBrush.GradientStops.forEach((item) => {
                        colorarr.push({
                            offset: item.Offset,
                            color: item.Color.HtmlColor
                        })
                    })


                    let itemcolortry
                    if (VariablesData[v].BrushTypes && VariablesData[v].DataType.toLowerCase() == 'bar') {
                        itemcolortry = {
                            shadowColor: "rgba(85,85,85,0.2)",
                            shadowBlur: 2,
                            width: 3,
                            shadowOffsetX: 2,
                            color: {
                                type: 'linear',
                                x: VariablesData[v].StartPoint.split(',')[0],
                                y: VariablesData[v].StartPoint.split(',')[1],
                                x2: VariablesData[v].EndPoint.split(',')[0],
                                y2: VariablesData[v].EndPoint.split(',')[1],
                                colorStops: colorarr,
                                global: false // 缺省为 false
                            }
                        }
                    } else {

                        itemcolortry = {
                            shadowColor: "rgba(85,85,85,0.2)",
                            shadowBlur: 2,
                            shadowOffsetX: 2,
                            width: 2,
                            color: VariablesData[v].Color.HtmlColor,
                            shadowBlur: 50,
                        }
                    }
                    var DateType = VariablesData[v].DataType == 'Line' ? null : 'none'
                    var stacka = VariablesData[v].DataType == 'Line' ? null : IsTime

                    var value = {
                        symbolSize: data.NumericalPoint,
                        showSymbol: data.ShowNumericalPoint,
                        smooth: data.IsSmooth,
                        showBackground: data.ShowBackground,
                        areaStyle: data.ShowRangeFill ? {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7), data.RangeOpacity) // 0% 处的颜色
                                }, {
                                    offset: 1, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7), 0)// 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        } : {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7), 0) // 0% 处的颜色
                                }, {
                                    offset: 1, color: colorRgba(VariablesData[v].Color.HtmlColor.slice(0, 7), 0)// 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        "name": VariablesData[v].DimensionName,
                        "data": [],
                        "type": VariablesData[v].DataType.toLowerCase(),
                        stack: v_IsDuidie,
                        "barMaxWidth": 25.0,
                        "label": {
                            "fontSize": VariablesData[v].DataType == 'Line' ? labelFontSize : BarLabelFontSize,
                            "show": VariablesData[v].DataType == 'Line' ? labelShow : BarLabelShow,
                            "color": VariablesData[v].DataType == 'Line' ? LineLabelColor : BarLabelColor
                        },

                        "lineStyle": {
                            "shadowColor": VariablesData[v].Color.HtmlColor,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            opacity: 1,
                            "width": 2,
                            shadowBlur: 8,
                            type: "solid"
                        },
                        "itemStyle": itemcolortry,
                        "yAxisIndex": VariablesData[v].DataType == 'Line' ? '1' : '0',
                        "markLine": ''
                    }
                    seriesArr.push(value)
                }

                //判断辅助线
                var indexarr = []
                var index0 = []
                if (AuxiliaryLinesData.length) {
                    var indexArr22 = []
                    for (var v2 = 0; v2 < seriesArr.length; v2++) {
                        if (seriesArr[v2].yAxisIndex == 0) {
                            var index11 = indexArr22.indexOf(seriesArr[v2].yAxisIndex)
                            if (index11 == -1) {
                                indexArr22.push(seriesArr[v2].yAxisIndex)
                                seriesArr[v2].markLine = markLineData1
                            }
                        } else if (seriesArr[v2].yAxisIndex == 1) {
                            var index22 = indexArr22.indexOf(seriesArr[v2].yAxisIndex)
                            if (index22 == -1) {
                                indexArr22.push(seriesArr[v2].yAxisIndex)
                                seriesArr[v2].markLine = markLineData2
                            }
                        }
                    }
                }


                var LineBarChartOption = {
                    "color": TooColorArr,
                    "animation": false,
                    IsDuidie: IsDuidie,
                    IsOrigin: IsOrigin,
                    bartype: bartype,
                    "tooltip": {
                        "trigger": AxisPointerTrigger,
                        "axisPointer": {
                            "type": AxisPointerType,
                            "color": AxisPointerColor
                        },
                        formatter: function (params) {
                            var div = document.createElement('div');
                            var children = [];
                            var title = '';
                            for (let i = 0; i < params.length; i++) {
                                const element = params[i];
                                if (element.data !== null && element.data !== undefined) {//0也需要显示
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
                            if (children.length === 0) {
                                return null;
                            }
                            return div.innerHTML;
                        }
                    },
                    "xAxis": {
                        "data": Xdata,
                        "axisLabel": {
                            "fontWeight": XSplitLineFontWeight,
                            "fontFamily": XfontFamily,
                            "textStyle": {
                                "fontWeight": XSplitLineFontWeight
                            },
                            "fontSize": XfontSize,
                            "color": Xcolor
                        },
                        "axisLine": {
                            "lineStyle": {
                                "color": Xcolor
                            }
                        },
                        "splitLine": {
                            "lineStyle": {
                                "color": {
                                    "HtmlColor": XSplitLineColor
                                }
                            },
                            "show": XSplitLineShow
                        }
                    },
                    "series": seriesArr,
                    "legend": {
                        "data": LegendData,
                        "itemHeight": ItemHeight,
                        "itemWidth": ItemWidth,
                        "textStyle": {
                            "fontWeight": FontWeight,
                            "fontFamily": FontFamily,
                            "color": LengenColor,
                            "fontSize": lengenFontSize
                        },
                        "show": LengendShow,
                        "left": lengenL,
                        "right": LengenR,
                        "top": lengenT,
                        "bottom": LengenB,
                        "padding": [LPtb, LPlr]
                    },
                    "yAxis": [
                        {
                            splitNumber: !data.AxisChartYAxiss[0].IsCustomSegmentation ? 0 : data.AxisChartYAxiss[0].CustomSegmentation,
                            "name": Yname1,
                            Adaptive1: JSON.parse(JSON.stringify(data.AxisChartYAxiss[0].Adaptive)),
                            YAxisMax1: data.AxisChartYAxiss[0].Max,
                            YAxisMin1: data.AxisChartYAxiss[0].Min,
                            "axisLabel": {
                                "formatter": "{value} " + Unit1,
                                "color": Ycolor1,
                                "fontFamily": "Source Han Sans TC",
                                "fontWeight": 400,
                                "fontSize": YfontSize1,
                                "textStyle": {
                                    "fontWeight": null
                                }
                            },
                            "label": {
                                "textStyle": {
                                    "color": Ycolor1
                                }
                            },
                            "min": YAxisMin1,
                            "max": YAxisMax1,
                            "nameTextStyle": {
                                "fontSize": YfontSize1,
                                "color": Ycolor1
                            },
                            "axisLine": {
                                "show": true,
                                "lineStyle": {
                                    "color": Ycolor1
                                }
                            },
                            "splitLine": {
                                "lineStyle": {
                                    type: 'dashed',
                                    "color": data.ThemeType == "Dark" ? "rgba(210,210,210,0.49)" : "rgba(210,210,210,0.9)"
                                },
                                "show": ShowSeparator1
                            }
                        },
                        {
                            splitNumber: !data.AxisChartYAxiss[1].IsCustomSegmentation ? 0 : data.AxisChartYAxiss[1].CustomSegmentation,
                            Adaptive1: JSON.parse(JSON.stringify(data.AxisChartYAxiss[1].Adaptive)),
                            YAxisMax1: data.AxisChartYAxiss[1].Max,
                            YAxisMin1: data.AxisChartYAxiss[1].Min,
                            "name": Yname2,
                            "axisLabel": {
                                "formatter": "{value} " + Unit2,
                                "color": Ycolor2,
                                "fontFamily": YFontFamily2,
                                "fontWeight": 400,
                                "fontSize": YfontSize2,
                                "textStyle": {
                                    "fontWeight": null
                                }
                            },
                            "label": {
                                "textStyle": {
                                    "color": Ycolor2,
                                }
                            },
                            "min": YAxisMin2,
                            "max": YAxisMax2,
                            "nameTextStyle": {
                                "fontSize": YfontSize2,
                                "color": Ycolor2,
                            },
                            "axisLine": {
                                "show": true,
                                "lineStyle": {
                                    "color": Ycolor2,
                                }
                            },
                            "splitLine": {
                                "lineStyle": {
                                    type: 'dashed',
                                    "color": data.ThemeType == "Dark" ? "rgba(210,210,210,0.49)" : "rgba(210,210,210,0.9)"
                                },
                                "show": ShowSeparator2
                            }
                        }
                    ],
                    "backgroundColor": backgroundColor,
                    "title": {
                        "textStyle": {
                            "color": TitleFontColor,
                            "fontSize": TitleFontSize
                        },
                        "padding": [12, 10],
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
                Chart1 = echarts.init(bardiv);
                const cs = Chart1
                Chart1.on('legendselectchanged', function (obj) {
                    var a = cs.getOption();
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
                                } else {
                                    show = false
                                }
                            } else if (s.markLine == '' || s.markLine.data.length == 0) {
                                let x = seriesData.filter(x => x.name != obj.name && x.yAxisIndex == yIndex && x.markLine != '');
                                if (x.length) {
                                    let m = x[0].markLine;
                                    s.markLine = m;
                                    x[0].markLine = '';
                                    cs.setOption(a, true);
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
                                        cs.setOption(a, true);

                                        return
                                    }
                                }
                            }
                        }
                    }
                })


                Chart1.setOption(LineBarChartOption, true);

                allchartlist.push([Chart1, changedata.LineBarChart[i].name, changedata.LineBarChart[i].option.IsOrigin]);
            }
        }
    }


    //层级
    if (ZIndexsShow) {

        for (item in changedata.ZIndexs) {
            var dom = document.getElementById(`${item}`)
            if (dom) {
                dom.style.zIndex = changedata.ZIndexs[item]
            }
            var dom2 = document.getElementById(`${item}pie`)
            if (dom2) {
                dom2.style.zIndex = changedata.ZIndexs[item] - 1
            }
        }
        ZIndexsShow = false
    }
    // 初始化散点图图
    // if(changedata.hasOwnProperty('ScatterChart')){
    // 	if(changedata.ScatterChart.length!==0){
    // 		for(let i=0;i<changedata.ScatterChart.length;i++){
    // 			option = {
    // 				animation: false
    // 			};
    // 			var bardiv = document.createElement("div");
    // 			bardiv.id = changedata.ScatterChart[i].name;
    // 			bardiv.style.height = changedata.ScatterChart[i].height+'px';
    // 		    bardiv.style.width = changedata.ScatterChart[i].width+'px';
    // 			bardiv.style.position = "absolute";
    // 			bardiv.style.top = changedata.ScatterChart[i].y+'px';
    // 			bardiv.style.left = changedata.ScatterChart[i].x+'px';
    // 			document.body.appendChild(bardiv);
    // 			addOrModify(option, changedata.ScatterChart[i].option);
    // 			Chart1 = echarts.init(bardiv);
    // 			Chart1.setOption(option,true);
    // 			allchartlist.push([Chart1,changedata.ScatterChart[i].name]);
    // 		}
    // 	}
    // }
}

var lineSliderTImes = 0
//图表数据更新
function changeallchart(data) {
    var changedata = JSON.parse(data);
    //仪表盘数据更新
    if (changedata.hasOwnProperty('DashBoardChart')) {
        for (let j = 0; j < changedata.DashBoardChart.length; j++) {
            for (var i = 0; i < allchartlist.length; i++) {
                if (allchartlist[i][1] == changedata.DashBoardChart[j].name) {
                    var optionli2 = allchartlist[i][0].getOption();
                    var dataarr = []
                    var colorarr2 = []
                    if (optionli2.IsRing) {
                        let minfixed = 0;
                        let maxfixed = 100;
                        optionli2.title[0].subtext = optionli2.SeriesShowDetailMode === 1 ? (Number(changedata.DashBoardChart[j].data) < Number(optionli2.Range.Min) ? minfixed.toFixed(optionli2.fixed) : (((Number(changedata.DashBoardChart[j].data) - Number(optionli2.Range.Min)) / (Number(optionli2.Range.Max) - Number(optionli2.Range.Min))) * 100).toFixed(optionli2.fixed)) + optionli2.title[0].Unit : Number(changedata.DashBoardChart[j].data).toFixed(optionli2.fixed) + optionli2.title[0].Unit


                        optionli2.series[0].data[0].value = Number(changedata.DashBoardChart[j].data) < Number(optionli2.Range.Min) ? minfixed.toFixed(optionli2.fixed) : Number(changedata.DashBoardChart[j].data) > Number(optionli2.Range.Max) ? maxfixed.toFixed(optionli2.fixed) : (((Number(changedata.DashBoardChart[j].data) - Number(optionli2.Range.Min)) / (Number(optionli2.Range.Max) - Number(optionli2.Range.Min))) * 100).toFixed(optionli2.fixed)
                        if (changedata.DashBoardChart[j].data == '???') {
                            optionli2.title[0].subtext = changedata.DashBoardChart[j].data + optionli2.title[0].Unit
                            optionli2.series[0].data[0].value = 0
                        }
                        let color = ''

                        if (optionli2.ColorType == 'GradientMulticolor') {
                            if (changedata.DashBoardChart[j].data >= (Number(optionli2.Range.Max) * ((Number(optionli2.Range.NormalScale) + optionli2.Range.ExcessScale) / 100))) {
                                color = optionli2.Range.WarnColor.HtmlColor
                            } else if (changedata.DashBoardChart[j].data >= (Number(optionli2.Range.Max) * ((Number(optionli2.Range.NormalScale)) / 100))) {
                                color = optionli2.Range.ExcessColor.HtmlColor
                            } else {
                                color = optionli2.Range.NormalColor.HtmlColor
                            }
                            optionli2.Range.NormalLinearColor.GradientStops.forEach((item) => {
                                colorarr2.push({
                                    offset: item.Offset,
                                    color: color
                                })
                            })
                            let obj = {
                                value: Number(changedata.DashBoardChart[j].data) < Number(optionli2.Range.Min) ? minfixed.toFixed(optionli2.fixed) : Number(changedata.DashBoardChart[j].data) > Number(optionli2.Range.Max) ? maxfixed.toFixed(optionli2.fixed) : (((Number(changedata.DashBoardChart[j].data) - Number(optionli2.Range.Min)) / (Number(optionli2.Range.Max) - Number(optionli2.Range.Min))) * 100).toFixed(optionli2.fixed),
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, colorarr2)
                                    }
                                },
                            }
                            dataarr.push(obj)
                        }


                        if (dataarr.length > 0) {
                            optionli2.series[0].data = dataarr
                            // optionli2.series[0].progress.itemStyle.colorStops.forEach((item)=>{
                            // 	item.color = color
                            // })
                        }

                        allchartlist[i][0].setOption(optionli2, true);
                    } else {

                        let minfixed = 0;
                        let maxfixed = 100;
                        optionli2.series[0].data[0].value = Number(changedata.DashBoardChart[j].data).toFixed(optionli2.fixed);
                        optionli2.series[0].detail.formatter = optionli2.SeriesShowDetailMode === 1 ? (Number(changedata.DashBoardChart[j].data) < Number(optionli2.Range.Min) ? minfixed.toFixed(optionli2.fixed) : (((Number(changedata.DashBoardChart[j].data) - Number(optionli2.Range.Min)) / (Number(optionli2.Range.Max) - Number(optionli2.Range.Min))) * 100).toFixed(optionli2.fixed)) : Number(changedata.DashBoardChart[j].data).toFixed(optionli2.fixed);
                        optionli2.series[0].detail.formatter = optionli2.series[0].detail.formatter + optionli2.Unit

                        if (changedata.DashBoardChart[j].data == '???') {
                            optionli2.series[0].detail.formatter = changedata.DashBoardChart[j].data + optionli2.Unit;
                            optionli2.series[0].data[0].value = 0
                        }
                        var AngleValue
                        if (changedata.DashBoardChart[j].data == 0) {
                            AngleValue = 0
                        } else {
                            if ((changedata.DashBoardChart[j].data - optionli2.series[0].min) > (optionli2.series[0].max - optionli2.series[0].min)) {
                                AngleValue = (optionli2.series[0].max - optionli2.series[0].min)
                            } else {
                                AngleValue = (changedata.DashBoardChart[j].data - optionli2.series[0].min)
                            }
                            if (changedata.DashBoardChart[j].data < optionli2.series[0].min) {
                                AngleValue = optionli2.series[0].min
                            }
                        }
                        let color = ''
                        if (optionli2.ColorType == 'GradientMulticolor') {
                            if (changedata.DashBoardChart[j].data >= (Number(optionli2.Range.Max) * ((Number(optionli2.Range.NormalScale) + optionli2.Range.ExcessScale) / 100))) {
                                color = optionli2.Range.WarnColor.HtmlColor
                            } else if (changedata.DashBoardChart[j].data >= (Number(optionli2.Range.Max) * ((Number(optionli2.Range.NormalScale)) / 100))) {
                                color = optionli2.Range.ExcessColor.HtmlColor
                            } else {
                                color = optionli2.Range.NormalColor.HtmlColor
                            }
                        }
                        if (color) {
                            let colorarr2 = []
                            optionli2.Range.NormalLinearColor.GradientStops.forEach((item) => {
                                colorarr2.push({
                                    offset: item.Offset,
                                    color: color
                                })
                            })
                            let itemcolortry = {
                                color: {
                                    type: 'linear',
                                    x: optionli2.Range.NormalLinearStartPoint.split(',')[0],
                                    y: optionli2.Range.NormalLinearStartPoint.split(',')[1],
                                    x2: optionli2.Range.NormalLinearEndPoint.split(',')[0],
                                    y2: optionli2.Range.NormalLinearEndPoint.split(',')[1],
                                    colorStops: colorarr2,
                                    global: false // 缺省为 false
                                }
                            }
                            optionli2.series[0].progress.itemStyle = itemcolortry
                        }
                        allchartlist[i][0].clear()
                        allchartlist[i][0].setOption(optionli2, true);
                    }

                }
            }
        }
    }
    //折线柱状图数据更新
    if (changedata.hasOwnProperty('LineBarChart')) {
        for (let j = 0; j < changedata.LineBarChart.length; j++) {
            let seData1 = []
            let seData = []
            let stackarr = []
            let bararr = []
            let bartype = []

            changedata.LineBarChart[j].YDataCollection.forEach((item) => {
                seData1 = [...seData1, ...item.YData]
            })


            for (var i = 0; i < allchartlist.length; i++) {
                if (allchartlist[i][1] == changedata.LineBarChart[j].name) {

                    if (allchartlist[i][2] == true) {
                        var isOrigin = true;
                    } else {
                        var isOrigin = false;
                    }
                    var optionli2 = allchartlist[i][0].getOption();
                    changedata.LineBarChart[j].YDataCollection.forEach((item) => {
                        let value22 = {
                            data: Object.values(item.YData),
                            name: item.name
                        }
                        if (optionli2.bartype.includes(item.name)) {
                            bararr.push(value22)
                        }
                    })
                    if (bararr.length > 0) {
                        for (let i = 0; i < bararr[0].data.length; i++) {
                            stackarr.push(sum(bararr, i))
                        }
                    }
                    if (optionli2.IsDuidie) {
                        seData1 = [...stackarr, ...seData1]
                    }
                    if (isOrigin) {
                        let obj = {};
                        optionli2.series = optionli2.series.reduce((cur, next) => {
                            obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
                            return cur;
                        }, [])
                    }
                    if (changedata.LineBarChart[j].hasOwnProperty("XData")) {
                        if (isOrigin) {//原始值
                            var sers = changedata.LineBarChart[j].YDataCollection.map(x => x.name);
                            optionli2.xAxis[0].data = sers;
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
                                        if (isOrigin) {
                                            if (changedata.LineBarChart[j].XData.length) {
                                                txt.innerText = changedata.LineBarChart[j].XData[element.seriesIndex % changedata.LineBarChart[j].XData.length] + ": " + element.data;
                                            }
                                        } else {
                                            txt.innerText = changedata.LineBarChart[j].XData[i] + ": " + element.data;
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
                            optionli2.tooltip[0].formatter = formatterFun
                        } else {

                            optionli2.xAxis[0].data = changedata.LineBarChart[j].XData;
                        }
                    }
                    if (changedata.LineBarChart[j].hasOwnProperty("MarkLine")) {
                        var MarkLineArr11 = []
                        var MarkLineArr22 = []
                        for (let o1 = 0; o1 < changedata.LineBarChart[j].MarkLine.length; o1++) {
                            if (changedata.LineBarChart[j].MarkLine[o1].axis == 0) {
                                MarkLineArr11.push(changedata.LineBarChart[j].MarkLine[o1].yAxis)
                            } else {
                                MarkLineArr22.push(changedata.LineBarChart[j].MarkLine[o1].yAxis)
                            }
                        }

                        for (let o = 0; o < optionli2.series.length; o++) {
                            if (optionli2.series[o].yAxisIndex == 0) {
                                if (optionli2.series[o].markLine.data != undefined) {
                                    for (var o3 = 0; o3 < optionli2.series[o].markLine.data.length; o3++) {
                                        if (optionli2.series[o].markLine.length != 0 && MarkLineArr11[o3] != undefined) {
                                            if (optionli2.series[o].markLine.length != 0 && MarkLineArr11[o3] != undefined) {

                                                optionli2.series[o].markLine.data[o3].yAxis = MarkLineArr11[o3]
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (optionli2.series[o].markLine.data != undefined) {
                                    for (var o4 = 0; o4 < optionli2.series[o].markLine.data.length; o4++) {
                                        if (MarkLineArr22[o4] != undefined) {
                                            if (optionli2.series[o].markLine.length != 0 && MarkLineArr22[o4] != undefined) {

                                                optionli2.series[o].markLine.data[o4].yAxis = MarkLineArr22[o4]
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                    let namearr = []
                    for (let b = 0; b < optionli2.series.length; b++) {
                        namearr.push(optionli2.series[b].name)
                        if (!changedata.IncFlush) {
                            optionli2.series[b].data = []
                        }
                    }
                    if (changedata.LineBarChart[j].YDataCollection.length) {
                        for (let a = 0; a < changedata.LineBarChart[j].YDataCollection.length; a++) {
                            var index = namearr.indexOf(changedata.LineBarChart[j].YDataCollection[a].name)
                            if (index != -1) {
                                optionli2.series[index].data = changedata.LineBarChart[j].YDataCollection[a].YData;
                            }
                        }
                        if (isOrigin) {
                            var slength = optionli2.series[0].data.length;
                            var elength = optionli2.series.length;
                            for (let i = 1; i < slength; i++) {
                                for (let j = 0; j < elength; j++) {
                                    optionli2.series.push(optionli2.series[j]);
                                }
                            }
                            function dealWithData2(data) {
                                let c = [];
                                let d = {};
                                data.forEach(element => {
                                    if (!d[element.name]) {
                                        let value = JSON.parse(JSON.stringify(element))
                                        c.push({
                                            name: element.name,
                                            allData: [value]
                                        });
                                        d[element.name] = value;
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
                            }
                            var d = dealWithData2(optionli2.series)
                            d.forEach(item => {
                                item.allData.forEach((item2, index) => {
                                    item2.stack = index + 1
                                    if ((index + 1) == item.allData.length) {
                                        item2.stack = 0
                                    }
                                })
                            })
                            for (let i = 0; i < d.length; i++) {
                                for (let j = 0; j < d[i].allData.length; j++) {
                                    for (let k = 0; k < d[i].allData[j].data.length; k++) {
                                        d[i].allData[j].data[k] = d[i].allData[j].data[j]
                                    }
                                }
                            }
                            for (let i = 0; i < d.length; i++) {
                                for (let j = 0; j < d[i].allData.length; j++) {
                                    for (let k = 0; k < i; k++) {
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
                            wantdata.forEach((item) => {
                                item.data = item.data.slice(0, changedata.LineBarChart[j].YDataCollection.length)
                            })
                            optionli2.series = wantdata;
                        }
                    } else {
                        for (let w = 0; w < optionli2.series.length; w++) {
                            optionli2.series[w].data = []
                        }
                    }
                    if (optionli2.IsOrigin) {
                        if (optionli2.series[0].data.length == 1) {
                            optionli2.series.forEach((item) => {
                                item.stack = 1
                            })
                        } else {
                            item.stack = ''
                        }

                    }
                    // if(optionli2.title[0].text == '折线柱形图3'){
                    // 	alert("asd")
                    // 	debugger
                    // 	}
                    if (seData1.length > 0) {
                        optionli2.yAxis.forEach((item) => {
                            let Adaptive1 = item.Adaptive1
                            let YAxisMax1 = item.YAxisMax1
                            let YAxisMin1 = item.YAxisMin1
                            if (item.Adaptive1 || YAxisMax1 == null || YAxisMin1 == null) {
                                YAxisMax1 = null
                                YAxisMin1 = null
                                Adaptive1 = true
                            } else {
                                let zf;
                                zf = Math.min.apply(null, seData1) >= 0 ? 1 : -1;


                                if (Number(YAxisMin1) > parseFloat(Math.min.apply(null, seData1))) {
                                    YAxisMin1 = gerarea(parseFloat(Math.min.apply(null, seData1)), 'min', zf)
                                    // YAxisMin1 = Math.ceil(parseFloat(Math.min.apply(null,seData1))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length)))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length))*zf
                                }

                                let zf1;
                                zf1 = Math.max.apply(null, seData1) >= 0 ? 1 : -1;
                                if (Number(YAxisMax1) < parseFloat(Math.max.apply(null, seData1))) {
                                    YAxisMax1 = gerarea(parseFloat(Math.max.apply(null, seData1)), 'max', zf1)
                                    // YAxisMax1 = Math.ceil(parseFloat(Math.max.apply(null,seData1))/Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length)))*Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length))*zf1
                                }

                                Adaptive1 = false
                            }
                            if (item.Adaptive1 && item.splitNumber) {
                                let zf;
                                zf = Math.min.apply(null, seData1) >= 0 ? 1 : -1;
                                YAxisMin1 = gerarea(parseFloat(Math.min.apply(null, seData1)), 'min', zf)
                                // YAxisMin1 = Math.ceil(parseFloat(Math.min.apply(null,seData1))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length)))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length))*zf
                                let zf1;
                                zf1 = Math.max.apply(null, seData1) >= 0 ? 1 : -1;
                                YAxisMax1 = gerarea(parseFloat(Math.max.apply(null, seData1)), 'max', zf1)
                                // YAxisMax1 = Math.ceil(parseFloat(Math.max.apply(null,seData1))/Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length)))*Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length))*zf1

                                Adaptive1 = false
                            }
                            item.min = YAxisMin1
                            item.max = YAxisMax1
                            item.interval = !item.splitNumber || Adaptive1 ? null : end(Number(YAxisMax1), Number(YAxisMin1), item.splitNumber)
                        })
                    }
                    // if(Math.max.apply(null,seData1)>0){
                    // 	optionli2.yAxis.forEach((item)=>{
                    // 		item.max = !item.splitNumber?(item.max):Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))
                    // 		item.interval =!item.splitNumber?null:Number(Number(Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))/item.splitNumber).toFixed(2))



                    // 	})
                    // }

                    allchartlist[i][0].setOption(optionli2, true);
                }
            }
        }
    }
    //折线图数据更新
    if (changedata.hasOwnProperty('LineChart')) {
        for (let j = 0; j < changedata.LineChart.length; j++) {
            let seData1 = []
            let seData2 = []
            for (var i = 0; i < allchartlist.length; i++) {
                if (allchartlist[i][1] == changedata.LineChart[j].name) {
                    let nowoption = allchartlist[i][0].getOption();
                    nowoption.series.forEach((item1) => {
                        changedata.LineChart[j].YDataCollection.forEach((item) => {
                            if (item.name == item1.name) {
                                item.yAxisIndex = item1.yAxisIndex
                            }
                        })
                        changedata.LineChart[j].YDataCollection.forEach((item) => {
                            seData1 = [...seData1, ...item.YData]
                        })
                    })
                }
            }
            changedata.LineChart[j].YDataCollection.forEach((item) => {
                if (seData1.length == 0) {
                    let data = {
                        name: item.yAxisIndex,
                        data: item.YData
                    }
                    seData1.push(data)
                } else {
                    seData1.forEach((item1) => {
                        if (item1) {
                            if (item1.name == item.yAxisIndex) {
                                item1.data = [...item1.data, ...item.YData]
                            } else {
                                seData2 = [];
                                let data = {
                                    name: item.yAxisIndex,
                                    data: item.YData
                                }
                                seData2.push(data)
                            }
                        }
                    })
                    seData1 = [...seData1, ...seData2]

                }

            })
            for (var i = 0; i < allchartlist.length; i++) {
                if (allchartlist[i][1] == changedata.LineChart[j].name) {
                    if (allchartlist[i][2] == true) {
                        var isOrigin = true;
                    } else {
                        var isOrigin = false;
                    }
                    var optionli2 = allchartlist[i][0].getOption();
                    if (isOrigin) {
                        let obj = {};
                        optionli2.series = optionli2.series.reduce((cur, next) => {
                            obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
                            return cur;
                        }, [])
                    }
                    if (changedata.LineChart[j].hasOwnProperty("XData")) {
                        if (isOrigin) {//原始值
                            var sers = changedata.LineChart[j].YDataCollection.map(x => x.name);
                            optionli2.xAxis[0].data = sers;
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
                                        if (isOrigin) {
                                            txt.innerText = changedata.LineChart[j].XData[element.seriesIndex % changedata.LineChart[j].XData.length] + ": " + element.data;
                                        } else {

                                            txt.innerText = changedata.LineChart[j].XData[i] + ": " + element.data;
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
                            optionli2.tooltip[0].formatter = formatterFun
                        } else {
                            optionli2.xAxis[0].data = changedata.LineChart[j].XData;
                        }
                    }
                    if (changedata.LineChart[j].hasOwnProperty("MarkLine")) {
                        var axiosArr = []
                        for (let o6 = 0; o6 < changedata.LineChart[j].MarkLine.length; o6++) {
                            axiosArr.push(changedata.LineChart[j].MarkLine[o6].axis)
                            var a = new Set(axiosArr)
                            axiosArr = [...a]
                        }
                        var index55 = []
                        for (let o7 = 0; o7 < axiosArr.length; o7++) {
                            for (let o5 = 0; o5 < optionli2.series.length; o5++) {
                                var index99 = index55.indexOf(axiosArr[o7])
                                if (index99 == -1) {
                                    if (optionli2.series[o5].yAxisIndex == axiosArr[o7]) {
                                        index55.push(axiosArr[o7])
                                        var arr = []
                                        for (var o8 = 0; o8 < changedata.LineChart[j].MarkLine.length; o8++) {
                                            if (changedata.LineChart[j].MarkLine[o8].axis == axiosArr[o7]) {
                                                arr.push(changedata.LineChart[j].MarkLine[o8].yAxis)
                                            }
                                        }
                                        if (arr.length) {
                                            for (var o9 = 0; o9 < arr.length; o9++) {
                                                if (optionli2.series[o5].markLine.length != 0 && arr[o9] != undefined) {
                                                    optionli2.series[o5].markLine.data[o9].yAxis = arr[o9]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let namearr = []
                    for (let b = 0; b < optionli2.series.length; b++) {
                        namearr.push(optionli2.series[b].name)
                        if (!changedata.IncFlush) {
                            optionli2.series[b].data = []
                        }
                    }
                    if (changedata.LineChart[j].YDataCollection.length) {
                        for (let a = 0; a < changedata.LineChart[j].YDataCollection.length; a++) {
                            var index = namearr.indexOf(changedata.LineChart[j].YDataCollection[a].name)
                            if (index != -1) {
                                optionli2.series[index].data = changedata.LineChart[j].YDataCollection[a].YData;
                            }
                        }
                        if (isOrigin) {
                            var slength = optionli2.series[0].data.length;
                            var elength = optionli2.series.length;
                            for (let i = 1; i < slength; i++) {
                                for (let j = 0; j < elength; j++) {
                                    optionli2.series.push(optionli2.series[j]);
                                }
                            }
                            function dealWithData2(data) {
                                let c = [];
                                let d = {};
                                data.forEach(element => {
                                    if (!d[element.name]) {
                                        let value = JSON.parse(JSON.stringify(element))
                                        c.push({
                                            name: element.name,
                                            allData: [value]
                                        });
                                        d[element.name] = value;
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
                            }
                            var d = dealWithData2(optionli2.series)
                            d.forEach(item => {
                                item.allData.forEach((item2, index) => {
                                    item2.stack = index + 1
                                    if ((index + 1) == item.allData.length) {
                                        item2.stack = 0
                                    }
                                })
                            })
                            for (let i = 0; i < d.length; i++) {
                                for (let j = 0; j < d[i].allData.length; j++) {
                                    for (let k = 0; k < d[i].allData[j].data.length; k++) {
                                        d[i].allData[j].data[k] = d[i].allData[j].data[j]
                                    }
                                }
                            }
                            for (let i = 0; i < d.length; i++) {
                                for (let j = 0; j < d[i].allData.length; j++) {
                                    for (let k = 0; k < i; k++) {
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
                            wantdata.forEach((item) => {
                                item.data = item.data.slice(0, changedata.LineChart[j].YDataCollection.length)
                            })
                            optionli2.series = wantdata;
                        }
                    } else {
                        for (let w = 0; w < optionli2.series.length; w++) {
                            optionli2.series[w].data = []
                        }
                    }
                    //折线图数据 选择图例筛选数据
                    var lenIndex //最后一个显示图例
                    var lenDataArr = [] //最后一个图例数据
                    var lenXData
                    let trueArr = []
                    let falseArr = []
                    var opselected = optionli2.legend[0].selected
                    var opselectedData = optionli2.legend[0].data
                    var seletdArr = []
                    if (opselected) {
                        for (let i in opselected) {
                            seletdArr.push(i)
                        }
                    } else {
                        seletdArr = []
                    }
                    if (opselectedData.length != seletdArr.length) {
                        if (seletdArr.length != 0) {
                            let arr = []
                            for (let i = 0; i < opselectedData.length; i++) {
                                let index = seletdArr.indexOf(opselectedData[i])
                                if (index == -1) {
                                    arr.push(opselectedData[i])
                                }
                            }
                            let value2 = optionli2.legend[0].selected
                            for (let j = 0; j < arr.length; j++) {
                                let o = {};
                                var str = `o["${arr[j]}"]=true`
                                eval(str);
                                Object.assign(value2, o);
                            }
                            opselected = value2
                        } else {
                            let value2 = {}
                            for (let i = 0; i < opselectedData.length; i++) {
                                let o = {};
                                let str = `o["${opselectedData[i]}"]=true`

                                eval(str);
                                Object.assign(value2, o);
                            }
                            opselected = value2
                        }
                    }

                    for (let item in opselected) {
                        if (opselected[item] == true) {
                            trueArr.push(item)
                        } else {
                            falseArr.push(item)
                        }
                    }
                    if (trueArr.length == 1) {
                        for (let f = 0; f < optionli2.series.length; f++) {
                            if (optionli2.series[f].name == trueArr[0]) {
                                lenIndex = f
                                lenDataArr = optionli2.series[f].data
                                lenXData = optionli2.xAxis[0].data
                            }
                        }
                        var lenDArr = []
                        var lenXArr = []
                        for (let h = 0; h < optionli2.series[lenIndex].data.length; h++) {
                            if (optionli2.series[lenIndex].data[h] != null) {
                                lenDArr.push(optionli2.series[lenIndex].data[h])
                                lenXArr.push(optionli2.xAxis[0].data[h])
                            }
                        }
                        optionli2.series[lenIndex].data = lenDArr
                        optionli2.xAxis[0].data = lenXArr
                    }
                    else {
                        if (lenDataArr.length != 0) {
                            optionli2.series[lenIndex].data = lenDataArr
                            optionli2.xAxis[0].data = lenXData
                        }
                    }
                    if (seData1.length > 0) {
                        optionli2.yAxis.forEach((item, key) => {
                            let Adaptive = item.Adaptive
                            let YAxisMax1 = item.YAxisMax1
                            let YAxisMin1 = item.YAxisMin1
                            let data = []
                            seData1.forEach((item) => {
                                if (item) {
                                    if (item.name == key) {
                                        data = item.data
                                    }
                                }

                            })
                            if (item.Adaptive || YAxisMax1 == null || YAxisMin1 == null) {
                                YAxisMax1 = null
                                YAxisMin1 = null
                                Adaptive = true
                            } else {
                                let zf;
                                zf = Math.min.apply(null, data) >= 0 ? 1 : -1;


                                if (Number(YAxisMin1) > parseFloat(Math.min.apply(null, data))) {
                                    YAxisMin1 = gerarea(parseFloat(Math.min.apply(null, data)), 'min', zf)
                                    // YAxisMin1 = Math.ceil(parseFloat(Math.min.apply(null,data))/Math.pow(10,(parseFloat(Math.min.apply(null,data)).toString().length)))/Math.pow(10,(parseFloat(Math.min.apply(null,data)).toString().length))*zf
                                }

                                let zf1;
                                zf1 = Math.max.apply(null, data) >= 0 ? 1 : -1;
                                if (Number(YAxisMax1) < parseFloat(Math.max.apply(null, data))) {
                                    YAxisMax1 = gerarea(parseFloat(Math.max.apply(null, data)), 'max', zf1)
                                    // YAxisMax1 = Math.ceil(parseFloat(Math.max.apply(null,data))/Math.pow(10,(parseFloat(Math.max.apply(null,data)).toString().length)))*Math.pow(10,(parseFloat(Math.max.apply(null,data)).toString().length))*zf1
                                }

                                Adaptive = false
                            }
                            if (item.Adaptive && item.splitNumber) {
                                let zf;
                                zf = Math.min.apply(null, data) >= 0 ? 1 : -1;
                                YAxisMin1 = gerarea(parseFloat(Math.min.apply(null, data)), 'min', zf)
                                // YAxisMin1 = Math.ceil(parseFloat(Math.min.apply(null,data))/Math.pow(10,(parseFloat(Math.min.apply(null,data)).toString().length)))/Math.pow(10,(parseFloat(Math.min.apply(null,data)).toString().length))*zf
                                let zf1;
                                zf1 = Math.max.apply(null, data) >= 0 ? 1 : -1;
                                YAxisMax1 = gerarea(parseFloat(Math.max.apply(null, data)), 'max', zf1)
                                // YAxisMax1 = Math.ceil(parseFloat(Math.max.apply(null,data))/Math.pow(10,(parseFloat(Math.max.apply(null,data)).toString().length)))*Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length))*zf1

                                Adaptive = false
                            }
                            item.max = YAxisMax1
                            item.min = YAxisMin1
                            item.interval = !item.splitNumber || Adaptive ? null : end(Number(YAxisMax1), Number(YAxisMin1), item.splitNumber)
                        })
                    }
                    // if(Math.max.apply(null,data)>0){
                    //            optionli2.yAxis.forEach((item)=>{
                    // 	item.max = !item.splitNumber?(item.max):Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))
                    // 	item.interval =!item.splitNumber?null:Number(Number(Number(Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length)))/item.splitNumber).toFixed(2))
                    // })
                    // }
                    // allchartlist[i][0].clear()
                    allchartlist[i][0].setOption(optionli2);
                }
            }

            if (sliderData[changedata.LineChart[j].name].show) {
                let chart = echarts.init(document.getElementById(changedata.LineChart[j].name))
                let chartOption = chart.getOption()
                // console.log("chartOption.dataZoom8888",chartOption.dataZoom[0].startValue)
                if (chartOption.xAxis[0].data.length < sliderData[changedata.LineChart[j].name].count) {
                    sliderData[changedata.LineChart[j].name].count = chartOption.xAxis[0].data.length;
                    document.getElementById(`${changedata.LineChart[j].name}SInput`).value = chartOption.xAxis[0].data.length
                }
                if ((!chartOption.dataZoom[0].startValue && chartOption.xAxis[0].data.length > sliderData[changedata.LineChart[j].name].count)) {
                    sliderData[changedata.LineChart[j].name].isFirst = true
                }
                if (chartOption.xAxis[0].data.findIndex(_ => _ == sliderData[changedata.LineChart[j].name].nowStartTime) == -1) {
                    sliderData[changedata.LineChart[j].name].isFirst = true
                }
                if ((sliderData[changedata.LineChart[j].name].isFirst && chartOption.xAxis[0].data.length)) {
                    let dataZoom = [
                        {
                            show: true,
                            type: 'slider',
                            realtime: true,
                            height: 15,
                            bottom: 10,
                            startValue: chartOption.xAxis[0].data.length - sliderData[changedata.LineChart[j].name].count > 0 ?
                                chartOption.xAxis[0].data.length - sliderData[changedata.LineChart[j].name].count : 0,
                            endValue: chartOption.xAxis[0].data.length - 1,
                        }
                    ]
                    sliderData[changedata.LineChart[j].name].startValue = dataZoom[0].startValue
                    sliderData[changedata.LineChart[j].name].nowStartTime = chartOption.xAxis[0].data[dataZoom[0].startValue]
                    chartOption.dataZoom = dataZoom
                } else {
                    let startValue = chartOption.xAxis[0].data.findIndex(_ => _ == sliderData[changedata.LineChart[j].name].nowStartTime)
                    console.log('findIndex', startValue)
                    sliderData[changedata.LineChart[j].name].startValue = startValue
                    let dataZoom = [
                        {
                            show: true,
                            type: 'slider',
                            realtime: true,
                            height: 15,
                            bottom: 10,
                            startValue: sliderData[changedata.LineChart[j].name].startValue
                                ? changedata.LineChart[j].XData[Number(sliderData[changedata.LineChart[j].name].startValue)]
                                : changedata.LineChart[j].XData[0],
                            endValue: sliderData[changedata.LineChart[j].name].startValue ?
                                changedata.LineChart[j].XData[Number(sliderData[changedata.LineChart[j].name].startValue + sliderData[changedata.LineChart[j].name].count) - 1]
                                : changedata.LineChart[j].XData[Number(sliderData[changedata.LineChart[j].name].count) - 1],
                        }
                    ]
                    dataZoom[0].endValue === undefined ? dataZoom[0].endValue = changedata.LineChart[j].XData[changedata.LineChart[j].XData.length - 1] : dataZoom[0].endValue
                    chartOption.dataZoom = dataZoom
                }
                jsObj.setParam(changedata.LineChart[j].id, { DataZoom_Show: sliderData[changedata.LineChart[j].name].show, DataZoom_DataNumber: sliderData[changedata.LineChart[j].name].count });
                chart.setOption(chartOption)

                // lineSliderTImes++
            }
        }
    }
    //柱状图数据更新
    if (changedata.hasOwnProperty('BarChart')) {
        for (let j = 0; j < changedata.BarChart.length; j++) {
            let seData1 = []
            let stackarr = []
            let seData = []
            changedata.BarChart[j].YDataCollection.forEach((item) => {
                seData1 = [...seData1, ...item.YData]
                let value = {
                    data: Object.values(item.YData),
                    name: item.name
                }
                seData.push(value)
            })
            if (seData.length > 0) {
                for (let i = 0; i < seData[0].data.length; i++) {
                    stackarr.push(sum(seData, i))
                }
            }
            for (var i = 0; i < allchartlist.length; i++) {
                if (allchartlist[i][1] == changedata.BarChart[j].name) {
                    if (allchartlist[i][2] == true) {
                        var isOrigin = true;
                    } else {
                        var isOrigin = false;
                    }
                    var optionli2 = allchartlist[i][0].getOption();
                    if (isOrigin) {
                        let obj = {};
                        optionli2.series = optionli2.series.reduce((cur, next) => {
                            obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
                            return cur;
                        }, [])
                    }
                    if (changedata.BarChart[j].hasOwnProperty("XData")) {
                        if (isOrigin) {//原始值
                            var sers = changedata.BarChart[j].YDataCollection.map(x => x.name);
                            optionli2.xAxis[0].data = sers;

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
                                        if (isOrigin) {
                                            txt.innerText = changedata.BarChart[j].XData[element.seriesIndex % changedata.BarChart[j].XData.length] + ": " + element.data;
                                        } else {

                                            txt.innerText = changedata.BarChart[j].XData[i] + ": " + element.data;
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
                            optionli2.tooltip[0].formatter = formatterFun
                        } else {
                            optionli2.xAxis[0].data = changedata.BarChart[j].XData;
                        }
                    }
                    if (changedata.BarChart[j].hasOwnProperty("MarkLine")) {
                        for (var s = 0; s < changedata.BarChart[j].MarkLine.length; s++) {
                            if (optionli2.series[0].markLine.length != 0 && changedata.BarChart[j].MarkLine[s].yAxis != undefined) {

                                optionli2.series[0].markLine.data[s].yAxis = changedata.BarChart[j].MarkLine[s].yAxis
                            }
                        }
                    }
                    let namearr = []
                    for (let b = 0; b < optionli2.series.length; b++) {
                        namearr.push(optionli2.series[b].name)
                        if (!changedata.IncFlush) {
                            optionli2.series[b].data = []
                        }
                    }
                    if (changedata.BarChart[j].YDataCollection.length) {
                        {
                            for (let a = 0; a < changedata.BarChart[j].YDataCollection.length; a++) {
                                var index = namearr.indexOf(changedata.BarChart[j].YDataCollection[a].name)
                                if (index != -1) {
                                    optionli2.series[index].data = changedata.BarChart[j].YDataCollection[a].YData;
                                }

                            }
                        }
                        if (isOrigin) {
                            var slength = optionli2.series[0].data.length;
                            var elength = optionli2.series.length;
                            for (let i = 1; i < slength; i++) {
                                for (let j = 0; j < elength; j++) {
                                    optionli2.series.push(optionli2.series[j]);
                                }
                            }
                            function dealWithData2(data) {
                                let c = [];
                                let d = {};
                                data.forEach(element => {
                                    if (!d[element.name]) {
                                        let value = JSON.parse(JSON.stringify(element))
                                        c.push({
                                            name: element.name,
                                            allData: [value]
                                        });
                                        d[element.name] = value;
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
                            }
                            var d = dealWithData2(optionli2.series)
                            d.forEach(item => {
                                item.allData.forEach((item2, index) => {
                                    item2.stack = index + 1
                                    if ((index + 1) == item.allData.length) {
                                        item2.stack = 0
                                    }
                                })
                            })
                            for (let i = 0; i < d.length; i++) {
                                for (let j = 0; j < d[i].allData.length; j++) {
                                    for (let k = 0; k < d[i].allData[j].data.length; k++) {
                                        d[i].allData[j].data[k] = d[i].allData[j].data[j]
                                    }
                                }
                            }
                            for (let i = 0; i < d.length; i++) {
                                for (let j = 0; j < d[i].allData.length; j++) {
                                    for (let k = 0; k < i; k++) {
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
                            wantdata.forEach((item) => {
                                item.data = item.data.slice(0, changedata.BarChart[j].YDataCollection.length)
                            })
                            optionli2.series = wantdata;
                        }
                    } else {
                        for (let w = 0; w < optionli2.series.length; w++) {
                            optionli2.series[w].data = []
                        }
                    }

                    if (optionli2.yAxis[0].IsOrigin) {
                        if (optionli2.series[0].data.length == 1) {
                            optionli2.series.forEach((item) => {
                                item.stack = 1
                            })
                        } else {
                            optionli2.series.forEach((item) => {
                                item.stack = ''
                            })
                        }

                    }

                    // if(optionli2.title[0].text == "柱形图2"){
                    // 	alert("asd")
                    // 	debugger
                    // }

                    if (optionli2.yAxis[0].IsDuidie) {
                        seData1 = [...stackarr, ...seData1]
                    }
                    if (seData1.length > 0) {
                        // debugger

                        let YAxisMax1 = optionli2.yAxis[0].YAxisMax1
                        let YAxisMin1 = optionli2.yAxis[0].YAxisMin1
                        let Adaptive = optionli2.yAxis[0].Adaptive
                        if (optionli2.yAxis[0].Adaptive || YAxisMax1 == null || YAxisMin1 == null) {
                            YAxisMax1 = null
                            YAxisMin1 = null
                            Adaptive = true
                        } else {
                            let zf;
                            zf = Math.min.apply(null, seData1) >= 0 ? 1 : -1;
                            if (Number(YAxisMin1) > parseFloat(Math.min.apply(null, seData1))) {
                                YAxisMin1 = gerarea(parseFloat(Math.min.apply(null, seData1)), 'min', zf)
                                // YAxisMin1 = Math.ceil(parseFloat(Math.min.apply(null,seData1))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length)))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length))*zf
                            }

                            let zf1;
                            zf1 = Math.max.apply(null, seData1) >= 0 ? 1 : -1;
                            if (Number(YAxisMax1) < parseFloat(Math.max.apply(null, seData1))) {
                                YAxisMax1 = gerarea(parseFloat(Math.max.apply(null, seData1)), 'max', zf1)
                                // YAxisMax1 = Math.ceil(parseFloat(Math.max.apply(null,seData1))/Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length)))*Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length))*zf1
                            }

                            Adaptive = false
                        }
                        if (optionli2.yAxis[0].Adaptive && optionli2.yAxis[0].splitNumber) {
                            let zf;
                            zf = Math.min.apply(null, seData1) >= 0 ? 1 : -1;
                            YAxisMin1 = gerarea(parseFloat(Math.min.apply(null, seData1)), 'min', zf)
                            // YAxisMin1 = Math.ceil(parseFloat(Math.min.apply(null,seData1))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length)))/Math.pow(10,(parseFloat(Math.min.apply(null,seData1)).toString().length))*zf
                            let zf1;
                            zf1 = Math.max.apply(null, seData1) >= 0 ? 1 : -1;
                            YAxisMax1 = gerarea(parseFloat(Math.max.apply(null, seData1)), 'max', zf1)
                            // YAxisMax1 = Math.ceil(parseFloat(Math.max.apply(null,seData1))/Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length)))*Math.pow(10,(parseFloat(Math.max.apply(null,seData1)).toString().length))*zf1

                            Adaptive = false
                        }
                        optionli2.yAxis[0].max = YAxisMax1
                        optionli2.yAxis[0].min = YAxisMin1
                        optionli2.yAxis[0].interval = !optionli2.yAxis[0].splitNumber || Adaptive ? null : end(Number(YAxisMax1), Number(YAxisMin1), optionli2.yAxis[0].splitNumber)
                    }
                    // if(Math.max.apply(null,seData1)>0){
                    // optionli2.yAxis.forEach((item)=>{
                    // 	item.max = !item.splitNumber?(item.max):Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))
                    // 	item.interval =!item.splitNumber?null:Number(Number(Math.ceil(Math.max.apply(null,seData1)/Math.pow(10,(Math.max.apply(null,seData1).toString().length)))*Math.pow(10,(Math.max.apply(null,seData1).toString().length))/item.splitNumber).toFixed(2))
                    // })
                    // }
                    allchartlist[i][0].clear()
                    allchartlist[i][0].setOption(optionli2, true);
                }
            }
        }
    }
    //饼图数据更新
    if (changedata.hasOwnProperty('PieChart')) {
        for (let j = 0; j < changedata.PieChart.length; j++) {
            for (var i = 0; i < allchartlist.length; i++) {
                if (allchartlist[i][1] == changedata.PieChart[j].name) {
                    var optionli = allchartlist[i][0].getOption();
                    //向内饼图数据
                    var optionli2 = ''
                    for (let f = 0; f < allchartlist.length; f++) {
                        var listName = allchartlist[i][1] + 'pie'

                        if (listName == allchartlist[f][1]) {
                            optionli2 = allchartlist[f][0].getOption();
                        }
                    }

                    var Lableformatter

                    Lableformatter = PieLabelFun(allchartlist[i][2], allchartlist[i][3], allchartlist[i][4], allchartlist[i][5], allchartlist[i][6])
                    if (changedata.PieChart[j].hasOwnProperty('YDataCollection')) {
                        let series = [];
                        let Key = 0;
                        let data = []
                        let namearr = []
                        for (let b = 0; b < optionli.series[0].data.length; b++) {
                            namearr.push(optionli.series[0].data[b].name)
                        }
                        if (changedata.PieChart[j].YDataCollection.length) {
                            for (let a = 0; a < changedata.PieChart[j].YDataCollection.length; a++) {
                                var index = namearr.indexOf(changedata.PieChart[j].YDataCollection[a].name)
                                optionli.series[0].data[index].label.formatter = changedata.PieChart[j].YDataCollection[a].YData[0] === '???' ? '???' : Lableformatter
                                if (changedata.PieChart[j].YDataCollection[a].YData[0] === '???') {
                                    changedata.PieChart[j].YDataCollection[a].YData[0] = 0
                                }
                                if (index != -1) {

                                    optionli.series[0].data[index].value = changedata.PieChart[j].YDataCollection[a].YData[0]
                                    if (optionli2.length != 0) {
                                        optionli2.series[0].data[index].value = changedata.PieChart[j].YDataCollection[a].YData[0]//向内饼图数据
                                    }
                                }
                            }
                        } else {

                            for (let w = 0; w < optionli.series[0].data.length; w++) {
                                optionli.series[0].data[w].value = 0
                                optionli2.series[0].data[w].value = 0//向内饼图数据
                            }
                        }
                    }
                    if (optionli.series.length > 1) {

                        for (let w = 0; w < optionli.series[0].data.length; w++) {
                            optionli.series[1].data[w].value = JSON.parse(JSON.stringify(optionli.series[0].data[w].value))
                        }

                    }
                    allchartlist[i][0].clear()
                    allchartlist[i][0].setOption(optionli, false);
                    //向内饼图数据
                    //向内饼图数据
                    for (let f1 = 0; f1 < allchartlist.length; f1++) {
                        var listName = allchartlist[i][1] + 'pie'
                        if (listName == allchartlist[f1][1]) {
                            allchartlist[f1][0].clear()
                            allchartlist[f1][0].setOption(optionli2, false);
                        }
                    }
                }
            }
        }
    }
}
jsObj.getChartData(function (e) {

})

/* 新增需求滑块 */
function changeCheckbox(e, name, id) {
    let sInput = document.getElementById(`${name}SInput`)
    sliderData[name].show = e.target.checked
    let chart = echarts.init(document.getElementById(name))
    let options = chart.getOption();
    sInput.value = sliderData[name].count
    if (sliderData[name].show) {
        let _st = options.xAxis[0].data.length - sliderData[name].count > 0 ?
            options.xAxis[0].data.length - sliderData[name].count : 0
        let _ed = options.xAxis[0].data.length - 1
        chart.setOption({
            dataZoom: [
                {
                    show: true,
                    type: 'slider',
                    realtime: true,
                    height: 15,
                    bottom: 10,
                    startValue: _st,
                    endValue: _ed,
                }
            ]
        })
        // dataCount.style.visibility = 'visible'
        sInput.disabled = false
    } else {
        chart.setOption({
            dataZoom: [
                {
                    show: false,
                    type: 'slider',
                    realtime: true,
                    height: 15,
                    bottom: 10,
                    startValue: options.xAxis[0].data[0],
                    endValue: options.xAxis[0].data[options.xAxis[0].data.length - 1],
                }
            ]
        })
        // dataCount.style.visibility = 'hidden'
        sInput.disabled = true
    }
    jsObj.setParam(/* name */ id, { DataZoom_Show: sliderData[name].show, DataZoom_DataNumber: sliderData[name].count });
}


function keydownInput(e, ele) {
    if (e.keyCode === 13) {
        ele.blur()
    }
}

function resetSlider(e, name) {
    sliderData[name].isFirst = true
    if (sliderData[name].show) {
        let chart = echarts.init(document.getElementById(name))
        let options = chart.getOption();
        let _st = options.xAxis[0].data.length - sliderData[name].count > 0 ?
            options.xAxis[0].data.length - sliderData[name].count : 0
        let _ed = options.xAxis[0].data.length - 1
        chart.setOption({
            dataZoom: [
                {
                    show: true,
                    type: 'slider',
                    realtime: true,
                    height: 15,
                    bottom: 10,
                    startValue: _st,
                    endValue: _ed,
                }
            ]
        })
        // dataCount.style.visibility = 'visible'
        sInput.disabled = false
    }

}

function blurInput(e, name, id) {
    let value = Number(e.target.value)
    if (value <= 0) {
        sliderData[name].count = value = 1
        // e.target.value = 1
    } else {
        sliderData[name].count = value
    }
    let chart = echarts.init(document.getElementById(name))
    let options = chart.getOption();
    e.target.value = sliderData[name].count
    if (sliderData[name].count > options.xAxis[0].data.length) {
        sliderData[name].count = options.xAxis[0].data.length
        e.target.value = sliderData[name].count
    }
    let _st = options.xAxis[0].data.length - sliderData[name].count > 0 ?
        options.xAxis[0].data.length - sliderData[name].count : 0
    let _ed = options.xAxis[0].data.length - 1

    chart.setOption({
        ...options,
        dataZoom: [
            {
                show: sliderData[name].show,
                type: 'slider',
                realtime: true,
                height: 15,
                bottom: 10,
                startValue: _st,
                endValue: _ed,
            }
        ]
    },true)
    sliderData[name].isFirst = true
    jsObj.setParam(/* name */ id, { DataZoom_Show: sliderData[name].show, DataZoom_DataNumber: sliderData[name].count });

}

setInterval(() => protectedObj.hit(), 1000);