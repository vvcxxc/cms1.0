<!--
 * @Description: 这是下拉文本控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-24 15:27:38
 -->
<template>
    <div v-if="show">
        <div v-for="(item, key) in cavantable" :key="key" :id="item.Name" :style="
            'position:absolute;' +
            'left:' +
            item.PropertyList.Left +
            'px; top:' +
            item.PropertyList.Top +
            'px; width:' +
            item.PropertyList.Width +
            'px; height:' +
            item.PropertyList.Height +
            'px;' +
            'RotateAngle:' +
            item.PropertyList.RotateAngle +
            'Opacity:' +
            item.PropertyList.Opacity +
            ';zIndex:' +
            item.PropertyList.ZIndex
        ">
        <div v-html="item.ParameterReportItemtList.dd.zhtml" class="table-box"></div>
    </div>
    <!-- <div class="tip12" ref="kongtiao2" v-if="tipchange" :class="{yd:pdyd3}">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse2($event)"
                @mouseup="mouseUpHandleelse2($event)"
            >
                <img :src="gth" alt />
                                                                    <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
                                                                </div>
                                                                <div class="tipcontanin">
                                                                    <div class="tipword">{{tipword}}</div>
                                                                    <div class="tipdetermine" @click="tip1">{{lang.MessageBox_Confrim}}</div>
                                                                </div>
                                                            </div> -->
    </div>
</template>

<script>
import FileSaver from 'file-save';
import moment from 'moment';
import XLSX from 'xlsx';
export default {
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            tipword: '',
            textblockData: [],
            dataValue: [],
            show: false,
            one: 1,
            html: '',
            yh: 1,
            json: '',
            jsondata: '',
            shi5: [],
            shi6: [],
            data: '',
            data1: '',
            pdyd3: true,
            numdata: '',
            colw: '',
            colh: '',
            roww: '',
            rowh: '',
            endw: '',
            changedata: '',
            enddata: [],
            snum: '',
            enum: '',
            tipchange: false,
            gth: require('../../../assets/images/gth.png'),
            sad: '',
            ead: '',
            checked: 1,
            an: '',
            num: 1,
            rwoshidata: [],
            rwoshidata1: [],
            nextimg: require('../../../assets/images/right_.png'),
            previmg: require('../../../assets/images/552cc14536532.png'),
            sumdata: [],
            s6: '',
            datanum: '',
            reg: '',
            dataId: '',
            name: '',
            pathName: '',
            nameC: '',
            data2: '',
            footarr: [],
            Name: 'parameterreport',
            cavantable: [],
            value3: '',
        };
    },
    props: ['dae'],
    watch: {
        dae: {
            handler(val) {
                this.Name = 'parameterreport';
                this.data = val;
                this.init();
                if (this.$store.state.isInit) {
                    let i = $('.page2').length;
                    for (let c = 0; c < i; c++) {
                        $($('.page2')[0]).remove();
                    }
                    //  this.first();
                }
                //  this.pageleft()
            },
        },
    },

    created() {
        if (this.data) {
            this.init();
        }
    },
    mounted() {
        // this.first();
    },
    methods: {
        insert(arrfirst, arrlast, index) {
            //将数组arrlast插入数组arrfirst中，index是想要插入的位置
            if (index < 0) {
                index = 0;
            } else if (index > arrfirst.length) {
                index = arrfirst.length;
            }
            var arr = [];
            for (var i = 0; i < index; i++) {
                arr.push(arrfirst[i]);
            }
            for (var i = 0; i < arrlast.length; i++) {
                arr.push(arrlast[i]);
            }
            for (var i = index; i < arrfirst.length; i++) {
                arr.push(arrfirst[i]);
            }
            return arr;
        },
        pageleft() {
            for (let i = 0; i < this.cavantable.length; i++) {
                var end = this.cavantable[i].ParameterReportItemtList.dd;
                if (('#' + this.cavantable[i].Name + 'page')[0]) {
                    if (end.kzdirection == '横向扩展') {
                        var endy = 0;
                        var endx = 0;
                        var left = 0;
                        var top = 0;
                        var startx = $(
                            $('#' + this.cavantable[i].Name).find(
                                '.datareadyhead'
                            )[0]
                        )
                            .attr('id')
                            .split('-')[1];
                        var starty = $(
                            $('#' + this.cavantable[i].Name).find(
                                '.datareadyhead'
                            )[0]
                        )
                            .attr('id')
                            .split('-')[0];
                        if (
                            end.kzsummopos == '分布在后' &&
                            $('#' + this.cavantable[i].Name).find(
                                '.datareadyfoot'
                            ).length > 0
                        ) {
                            endy = $(
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyhead'
                                )[
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyhead'
                                ).length - 1
                                ]
                            )
                                .attr('id')
                                .split('-')[1];
                            endx = $(
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyfoot'
                                )[
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyfoot'
                                ).length - 1
                                ]
                            )
                                .attr('id')
                                .split('-')[0];
                        } else {
                            endy = $(
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyhead'
                                )[
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyhead'
                                ).length - 1
                                ]
                            )
                                .attr('id')
                                .split('-')[1];
                            endx = $(
                                $('#' + this.cavantable[i].Name).find(
                                    '.dataready'
                                )[
                                $('#' + this.cavantable[i].Name).find(
                                    '.dataready'
                                ).length - 1
                                ]
                            )
                                .attr('id')
                                .split('-')[0];
                        }
                        for (let i1 = 0; i1 <= endx; i1++) {
                            left =
                                left +
                                parseFloat(
                                    $(
                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + i1 + '-' + startx
                                        )[0]
                                    ).width()
                                );
                            if (
                                $(
                                    $('#' + this.cavantable[i].Name).find(
                                        '#' + i1 + '-' + startx
                                    )[0]
                                ).hasClass('borderleft')
                            ) {
                                left += 1;
                            }
                        }
                        for (let i1 = 0; i1 <= endy; i1++) {
                            top =
                                top +
                                parseFloat(
                                    $(
                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + starty + '-' + i
                                        )[0]
                                    ).height()
                                );
                            if (
                                $(
                                    $('#' + this.cavantable[i].Name).find(
                                        '#' + starty + '-' + i
                                    )[0]
                                ).hasClass('bordertop')
                            ) {
                                top += 1;
                            }
                        }
                        left =
                            parseInt(
                                $('#' + this.cavantable[i].Name)[0].style.left
                            ) + left;
                        top =
                            parseInt(
                                $('#' + this.cavantable[i].Name)[0].style.top
                            ) +
                            top +
                            1;
                        if (left <= 0) {
                            $(
                                '#' + this.cavantable[i].Name + 'page'
                            )[0].style.left = 0 + 'px';
                        } else {
                            $(
                                '#' + this.cavantable[i].Name + 'page'
                            )[0].style.left = left + 'px';
                        }

                        $('#' + this.cavantable[i].Name + 'page')[0].style.top =
                            top + 'px';
                    } else if (end.kzdirection == '纵向扩展') {
                        endy = 0;
                        endx = 0;
                        left = 0;
                        top = 0;
                        startx = $(
                            $('#' + this.cavantable[i].Name).find(
                                '.datareadyhead'
                            )[0]
                        )
                            .attr('id')
                            .split('-')[1];
                        starty = $(
                            $('#' + this.cavantable[i].Name).find(
                                '.datareadyhead'
                            )[0]
                        )
                            .attr('id')
                            .split('-')[0];
                        //   alert("s")

                        if (
                            end.kzsummopos == '分布在后' &&
                            $('#' + this.cavantable[i].Name).find(
                                '.datareadyfoot'
                            ).length > 0
                        ) {
                            endy = $(
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyfoot'
                                )[
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyfoot'
                                ).length - 1
                                ]
                            )
                                .attr('id')
                                .split('-')[1];
                            endx = $(
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyfoot'
                                )[
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyfoot'
                                ).length - 1
                                ]
                            )
                                .attr('id')
                                .split('-')[0];
                        } else {
                            endy = $(
                                $('#' + this.cavantable[i].Name).find(
                                    '.dataready'
                                )[
                                $('#' + this.cavantable[i].Name).find(
                                    '.dataready'
                                ).length - 1
                                ]
                            )
                                .attr('id')
                                .split('-')[1];
                            endx = $(
                                $('#' + this.cavantable[i].Name).find(
                                    '.dataready'
                                )[
                                $('#' + this.cavantable[i].Name).find(
                                    '.dataready'
                                ).length - 1
                                ]
                            )
                                .attr('id')
                                .split('-')[0];
                        }
                        for (let i1 = 0; i1 <= endx; i1++) {
                            left =
                                left +
                                parseFloat(
                                    $(
                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + i1 + '-' + startx
                                        )[0]
                                    ).width()
                                );
                            if (
                                $(
                                    $('#' + this.cavantable[i].Name).find(
                                        '#' + i1 + '-' + startx
                                    )[0]
                                ).hasClass('borderleft')
                            ) {
                                left += 1;
                            }
                        }
                        for (let i1 = 0; i1 <= endy; i1++) {
                            top =
                                top +
                                parseFloat(
                                    $(
                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + starty + '-' + i
                                        )[0]
                                    ).height()
                                );
                            if (
                                $(
                                    $('#' + this.cavantable[i].Name).find(
                                        '#' + starty + '-' + i
                                    )[0]
                                ).hasClass('bordertop')
                            ) {
                                top += 1;
                            }
                        }

                        left =
                            parseInt(
                                $('#' + this.cavantable[i].Name)[0].style.left
                            ) +
                            left -
                            190;
                        top =
                            parseInt(
                                $('#' + this.cavantable[i].Name)[0].style.top
                            ) +
                            top +
                            1;
                        if (left <= 0) {
                            $(
                                '#' + this.cavantable[i].Name + 'page'
                            )[0].style.left = 0 + 'px';
                        } else {
                            $(
                                '#' + this.cavantable[i].Name + 'page'
                            )[0].style.left = left + 'px';
                        }

                        $('#' + this.cavantable[i].Name + 'page')[0].style.top =
                            top + 'px';
                    }
                }
            }
        },
        tip1() {
            // this.tipchange = false;
            this.$emit('shownotip');
        },
        dealWithData2(data) {
            let c = [];
            let d = {};
            data.forEach((element) => {
                if (!d[element.timewd]) {
                    c.push({
                        timewd: element.timewd,
                        allData: [element],
                    });
                    d[element.timewd] = element;
                } else {
                    c.forEach((ele) => {
                        if (ele.timewd == element.timewd) {
                            ele.allData.push(element);
                        }
                    });
                }
            });
            return c;
        },

        dealWithData(data) {
            let c = [];
            let d = {};
            data.forEach((element) => {
                if (!d[element.banciwd]) {
                    c.push({
                        banciwd: element.banciwd,
                        allData: [element],
                    });
                    d[element.banciwd] = element;
                } else {
                    c.forEach((ele) => {
                        if (ele.banciwd == element.banciwd) {
                            ele.allData.push(element);
                        }
                    });
                }
            });
            return c;
        },
        dealWithData3(data) {
            let c = [];
            let d = {};
            data.forEach((element) => {
                if (!d[element.resourcedataid]) {
                    c.push({
                        resourcedataid: element.resourcedataid,
                        allData: [element],
                    });
                    d[element.resourcedataid] = element;
                } else {
                    c.forEach((ele) => {
                        if (ele.resourcedataid == element.resourcedataid) {
                            ele.allData.push(element);
                        }
                    });
                }
            });
            return c;
        },
        dateFormat(fmt, date) {
            if (fmt) {
                fmt = fmt.replace('dd', 'DD');
                fmt = fmt.replace('yyyy', 'YYYY');
                return moment(date).format(fmt);
            } else {
                return date;
            }

            // if(fmt){
            // let ret;
            // const opt = {
            // 	"y+": date.getFullYear().toString(), // 年
            // 	"M+": (date.getMonth() + 1).toString(), // 月
            // 	"d+": date.getDate().toString(), // 日
            // 	"H+": date.getHours().toString(), // 时
            // 	"m+": date.getMinutes().toString(), // 分
            // 	"s+": date.getSeconds().toString() // 秒
            // 	// 有其他格式化字符需求可以继续添加，必须转化成字符串
            // };
            // for (let k in opt) {
            // 	ret = new RegExp("(" + k + ")").exec(fmt);
            // 	if (ret) {
            // 		fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            // 	}
            // }
            // return fmt
            // }else{
            // return ''
            // }
        },
        init() {
            //数据筛选
            this.textblockData = [];
            let daiti = JSON.stringify(this.data.Controls.ControlList);
            var dataAll = JSON.parse(daiti);
            for (var i = 0; i < dataAll.length; i++) {
                if (dataAll[i].ControlType == this.Name) {
                    this.textblockData.push(dataAll[i]);
                }
            }

            if (this.textblockData.length != 0) {
                this.show = true;
            } else {
                this.show = false;
            }
            //赋值

            if (this.show) {
                this.gitValue();
            }
        },
        deltable(div) {
            var z = $(div).find('td').length;
            let a = 0;
            for (let i2 = 0; i2 < z; i2++) {
                if (!$($(div).find('td')[a]).hasClass('del')) {
                    $($($(div).find('td')[a])).remove();
                } else {
                    $($(div).find('td')[a]).find('input')[0].value = null;
                    a++;
                }
            }
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseMoveHandleelse2(event) {
            this.pdyd3 = false;
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        initMainChart() {
            for (let i = 0; i < this.cavantable.length; i++) {
                if (!this.cavantable[i].data) {
                    this.cavantable[i].data = [];
                }
                if (this.cavantable[i].data) {
                    let dellength = $('#' + this.cavantable[i].Name).find(
                        '.jexcel_label'
                    ).length;
                    for (let i2 = 0; i2 < dellength; i2++) {
                        $('#' + this.cavantable[i].Name)
                            .find('.jexcel_label')[0]
                            .parentNode.removeChild(
                                $('#' + this.cavantable[i].Name).find(
                                    '.jexcel_label'
                                )[0]
                            );
                    }

                    let sumdata =
                        this.cavantable[
                            i
                        ].ParameterReportItemtList.dd.kzsummotype.split(',');
                    if (
                        this.cavantable[i].ParameterReportItemtList.dd
                            .kzdirection == '纵向扩展'
                    ) {
                        this.cavantable[i].shi2 = [];
                        this.cavantable[i].shi3 = [];
                        this.cavantable[i].shi5 = [];
                        this.cavantable[i].shi6 = [];
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray !== []
                        ) {
                            let dataarry = [];
                            for (
                                let iid = 0;
                                iid <
                                $('#' + this.cavantable[i].Name).find(
                                    '.datareadyhead'
                                ).length;
                                iid++
                            ) {
                                for (
                                    let iid2 = 0;
                                    iid2 <
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray.length;
                                    iid2++
                                ) {
                                    if (
                                        $('#' + this.cavantable[i].Name).find(
                                            '.datareadyhead'
                                        )[iid].id ==
                                        this.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .kzresourcedataitemarray[iid2].id
                                    ) {
                                        dataarry.push(
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[iid2]
                                        );
                                    }
                                }
                            }
                            this.cavantable[
                                i
                            ].ParameterReportItemtList.dd.kzresourcedataitemarray =
                                dataarry;
                            for (
                                let j = 0;
                                j <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                j++
                            ) {
                                let shi2 =
                                    this.cavantable[
                                        i
                                    ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                        j
                                    ].id.split('-');
                                this.cavantable[i].shi2.push(
                                    parseInt(shi2[0]) -
                                    parseInt(
                                        this.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .startpox
                                    )
                                );
                            }
                        }
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray !== []
                        ) {
                            for (
                                let j = 0;
                                j <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                j++
                            ) {
                                if (
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata == '序号' ||
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata == '班次' ||
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata == '归档时间'
                                ) {
                                    let shi3 =
                                        this.cavantable[
                                            i
                                        ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                            j
                                        ].id.split('-');
                                    this.cavantable[i].shi3.push(
                                        parseInt(shi3[0]) -
                                        parseInt(
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .startpox
                                        )
                                    );
                                }
                            }
                        }
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray !== []
                        ) {
                            for (
                                let j = 0;
                                j <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                j++
                            ) {
                                if (
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata !== '序号' &&
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata !== '班次' &&
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata !== '归档时间'
                                ) {
                                    let shi5 =
                                        this.cavantable[
                                            i
                                        ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                            j
                                        ].id.split('-');
                                    let a = {
                                        id:
                                            parseInt(shi5[0]) -
                                            parseInt(
                                                this.cavantable[i]
                                                    .ParameterReportItemtList.dd
                                                    .startpox
                                            ),
                                        xsnumber: parseInt(
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[j]
                                                .xsnumber
                                        ),
                                        defauldisplay:
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[j]
                                                .defauldisplay,
                                    };
                                    this.cavantable[i].shi5.push(a);
                                }
                            }
                        }
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray !== []
                        ) {
                            for (
                                let j = 0;
                                j <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                j++
                            ) {
                                if (
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata == '归档时间'
                                ) {
                                    let shi5 =
                                        this.cavantable[
                                            i
                                        ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                            j
                                        ].id.split('-');
                                    let a = {
                                        id:
                                            parseInt(shi5[0]) -
                                            parseInt(
                                                this.cavantable[i]
                                                    .ParameterReportItemtList.dd
                                                    .startpox
                                            ),
                                        itemformat:
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[j]
                                                .itemformat,
                                    };
                                    this.cavantable[i].shi6.push(a);
                                }
                            }
                        }
                        if (sumdata[0] !== '') {
                            var xnum = 0;
                            for (
                                let i2 = 0;
                                i2 <
                                $('#' + this.cavantable[i].Name).find('tr')
                                    .length;
                                i2++
                            ) {
                                for (
                                    let i3 = 0;
                                    i3 <
                                    $(
                                        $('#' + this.cavantable[i].Name).find(
                                            'tr'
                                        )[i2]
                                    ).find('td').length;
                                    i3++
                                ) {
                                    if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[i].Name
                                                ).find('tr')[i2]
                                            ).find('td')[i3]
                                        ).hasClass('dataready')
                                    ) {
                                        xnum = xnum + 1;
                                        break;
                                    }
                                }
                            }
                            this.cavantable[i].endpoy = xnum;
                            this.cavantable[i].nowy =
                                parseInt(
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.startpoy
                                ) +
                                1 +
                                sumdata.length;
                            this.cavantable[i].endpox = $(
                                '#' + this.cavantable[i].Name
                            ).find('.datareadyhead').length;
                        } else {
                            var xnum1 = 0;
                            for (
                                let i2 = 0;
                                i2 <
                                $('#' + this.cavantable[i].Name).find('tr')
                                    .length;
                                i2++
                            ) {
                                for (
                                    let i3 = 0;
                                    i3 <
                                    $(
                                        $('#' + this.cavantable[i].Name).find(
                                            'tr'
                                        )[i2]
                                    ).find('td').length;
                                    i3++
                                ) {
                                    if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[i].Name
                                                ).find('tr')[i2]
                                            ).find('td')[i3]
                                        ).hasClass('dataready')
                                    ) {
                                        xnum1 = xnum1 + 1;
                                        break;
                                    }
                                }
                            }
                            this.cavantable[i].endpoy = xnum1;

                            this.cavantable[i].nowy =
                                parseInt(
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.startpoy
                                ) + 1;
                            this.cavantable[i].endpox = $(
                                '#' + this.cavantable[i].Name
                            ).find('.datareadyhead').length;
                        }
                        this.cavantable[i].nowlength =
                            this.cavantable[i].endpoy *
                            this.cavantable[i].shi2.length;

                        let ddd = parseInt(this.cavantable[i].data.length);
                        this.cavantable[i].numpage = Math.ceil(
                            ddd / this.cavantable[i].nowlength
                        );
                        let adata = JSON.stringify(this.cavantable[i].data);
                        this.cavantable[i].nowdata = JSON.parse(adata).splice(
                            0,
                            this.cavantable[i].nowlength
                        );
                    } else if (
                        this.cavantable[i].ParameterReportItemtList.dd
                            .kzdirection == '横向扩展'
                    ) {
                        this.cavantable[i].shi2 = [];
                        this.cavantable[i].shi3 = [];
                        this.cavantable[i].shi5 = [];
                        this.cavantable[i].shi6 = [];
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray !== []
                        ) {
                            for (
                                let j = 0;
                                j <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                j++
                            ) {
                                let shi2 =
                                    this.cavantable[
                                        i
                                    ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                        j
                                    ].id.split('-');
                                this.cavantable[i].shi2.push(parseInt(shi2[1]));
                            }
                        }
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray !== []
                        ) {
                            for (
                                let j = 0;
                                j <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                j++
                            ) {
                                if (
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata == '序号' ||
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata == '班次' ||
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata == '归档时间'
                                ) {
                                    let shi3 =
                                        this.cavantable[
                                            i
                                        ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                            j
                                        ].id.split('-');
                                    this.cavantable[i].shi3.push(
                                        parseInt(shi3[1])
                                    );
                                }
                            }
                        }
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray !== []
                        ) {
                            for (
                                let j = 0;
                                j <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                j++
                            ) {
                                if (
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata !== '序号' &&
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata !== '班次' &&
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata !== '归档时间'
                                ) {
                                    let shi5 =
                                        this.cavantable[
                                            i
                                        ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                            j
                                        ].id.split('-');
                                    let a = {
                                        id: parseInt(shi5[1]),
                                        xsnumber: parseInt(
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[j]
                                                .xsnumber
                                        ),
                                        defauldisplay:
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[j]
                                                .defauldisplay,
                                    };
                                    this.cavantable[i].shi5.push(a);
                                }
                            }
                        }
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray !== []
                        ) {
                            for (
                                let j = 0;
                                j <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                j++
                            ) {
                                if (
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[j]
                                        .itemdata == '归档时间'
                                ) {
                                    let shi5 =
                                        this.cavantable[
                                            i
                                        ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                            j
                                        ].id.split('-');
                                    let a = {
                                        id: parseInt(shi5[1]),
                                        itemformat:
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[j]
                                                .itemformat,
                                    };
                                    this.cavantable[i].shi6.push(a);
                                }
                            }
                        }
                        if (sumdata[0] !== '') {
                            this.cavantable[i].endpoy = $(
                                '#' + this.cavantable[i].Name
                            ).find('.datareadyhead').length;
                            let xnum = 0;
                            for (
                                let i3 = 0;
                                i3 <
                                $(
                                    $('#' + this.cavantable[i].Name).find('tr')[
                                    this.cavantable[i]
                                        .ParameterReportItemtList.dd
                                        .startpoy
                                    ]
                                ).find('td').length;
                                i3++
                            ) {
                                if (
                                    $(
                                        $(
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find('tr')[
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .startpoy
                                            ]
                                        ).find('td')[i3]
                                    ).hasClass('dataready')
                                ) {
                                    xnum = xnum + 1;
                                }
                            }
                            this.cavantable[i].endpox = xnum;
                            this.cavantable[i].nowy = parseInt(
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .startpoy
                            );
                            if (
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzsummopos == '分布在前'
                            ) {
                                this.cavantable[i].nowx =
                                    parseInt(
                                        this.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .startpox
                                    ) +
                                    1 +
                                    sumdata.length;
                            } else {
                                this.cavantable[i].nowx =
                                    parseInt(
                                        this.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .startpox
                                    ) + 1;
                            }
                            this.cavantable[i].nowlength =
                                this.cavantable[i].endpox *
                                this.cavantable[i].shi2.length;
                            this.cavantable[i].numpage = Math.ceil(
                                this.cavantable[i].data.length /
                                this.cavantable[i].nowlength
                            );
                            let adata = JSON.stringify(this.cavantable[i].data);
                            this.cavantable[i].nowdata = JSON.parse(
                                adata
                            ).splice(0, this.cavantable[i].nowlength);
                        } else {
                            this.cavantable[i].endpoy = $(
                                '#' + this.cavantable[i].Name
                            ).find('.datareadyhead').length;
                            let xnum = 0;
                            for (
                                let i3 = 0;
                                i3 <
                                $(
                                    $('#' + this.cavantable[i].Name).find('tr')[
                                    this.cavantable[i]
                                        .ParameterReportItemtList.dd
                                        .startpoy
                                    ]
                                ).find('td').length;
                                i3++
                            ) {
                                if (
                                    $(
                                        $(
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find('tr')[
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .startpoy
                                            ]
                                        ).find('td')[i3]
                                    ).hasClass('dataready')
                                ) {
                                    xnum = xnum + 1;
                                }
                            }
                            this.cavantable[i].endpox = xnum;
                            this.cavantable[i].nowy = parseInt(
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .startpoy
                            );

                            this.cavantable[i].nowx =
                                parseInt(
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.startpox
                                ) + 1;
                            this.cavantable[i].nowlength =
                                this.cavantable[i].endpox *
                                this.cavantable[i].shi2.length;
                            this.cavantable[i].numpage = Math.ceil(
                                this.cavantable[i].data.length /
                                this.cavantable[i].nowlength
                            );
                            let adata = JSON.stringify(this.cavantable[i].data);
                            this.cavantable[i].nowdata = JSON.parse(
                                adata
                            ).splice(0, this.cavantable[i].nowlength);
                        }
                    }
                    if (this.cavantable[i].data) {
                        if (this.cavantable[i].numpage > 1) {
                            this.cavantable[i].page =
                                `<div class="page2" style="position:absolute;z-index:${this.cavantable[i].PropertyList.ZIndex}" id="` +
                                this.cavantable[i].Name +
                                `page">
		    <div class="page1" id="id">
			<div class="start">1</div>
			     <div class="next"><img src=${this.previmg} ></div>
				 <div class="jump">
					 <input type="text" class="numinp" value="1">
				 </div>
				 <div class="last"><img src=${this.nextimg} ></div>
				 <div class="end">${this.cavantable[i].numpage}</div>
				</div>
                </div>`;
                            $('#' + this.cavantable[i].Name + 'page').remove();
                            $('#' + this.cavantable[i].Name)
                                .parent()
                                .append(this.cavantable[i].page);
                        }
                    }
                }
            }
            this.setbodydata(1);
        },

        getPointNum(num, n) {
            if (num == null || num == undefined || num === '') {
                let str = null;
                return str;
            } else {
                let str = Number(num);
                if (isNaN(str) && n == 0) {
                    return num;
                } else {
                    return str.toFixed(n);
                }
            }
        },
        delay(index, i) {
            return new Promise((resolve) => {
                if (!i) {
                    setTimeout(resolve, index * 0.1);
                } else {
                    setTimeout(resolve, index * 0.001);
                }
            });
        },
        //    导出
        async export(it) {

            let _obj = this.cavantable.find(_ => _.ParameterReportItemtList.dd.dckongjian == it.class)
            if (_obj) {
                let _data = _obj.ParameterReportItemtList.dd
                console.log("_", _obj)

                let starttime = $($('.' + _data.startkongjian)[0])
                    .find('input')
                    .val();
                let endtime = $($('.' + _data.endkongjian)[0])
                    .find('input')
                    .val()
                console.log("_2", starttime)
                let data = {
                    // ..._data,
                    argwaibuparalist: _data.kopngjianarray,
                    kzbanciwd: _data.kzbanciwd,
                    kzresource: _data.kzresource,
                    kzresourcedataitemarray: _data.kzresourcedataitemarray,
                    kzresourceid: _data.kzresourceid,
                    kztimewd: _data.kztimewd,
                    starttime,
                    endtime
                }
                this.$axios({
                    method: 'post',
                    url: `/api/ParameterReport/Export`,
                    data: data,
                    responseType: 'blob',
                })
                    .then((res) => {
                        this.downloadFile(res.data, `自定义报表${'' + new Date().getFullYear() + Number(new Date().getMonth() + 1) + new Date().getDate() + new Date().getTime()
                            }.xlsx`)
                    })
            }

        },
        //搜索
        async search(a, Numbervalue, i1) {
            //  debugger
            console.log('sssssssssssssssssssssssssssssss');
            this.$store.state.report = false;
            var wantnum;
            var end = {};
            for (let ic = 0; ic < this.cavantable.length; ic++) {
                let pdstate = false;
                // this.$store.state.isShow  = true
                let searchdata = [];

                if (
                    this.cavantable[ic].ParameterReportItemtList.dd
                        .startkongjian
                ) {
                    searchdata.push(
                        this.cavantable[ic].ParameterReportItemtList.dd
                            .startkongjian
                    );
                }
                if (
                    this.cavantable[ic].ParameterReportItemtList.dd.timekongjian
                ) {
                    searchdata.push(
                        this.cavantable[ic].ParameterReportItemtList.dd
                            .timekongjian
                    );
                }
                if (
                    this.cavantable[ic].ParameterReportItemtList.dd
                        .wenbenkongjian
                ) {
                    searchdata.push(
                        this.cavantable[ic].ParameterReportItemtList.dd
                            .wenbenkongjian
                    );
                }
                if (
                    this.cavantable[ic].ParameterReportItemtList.dd
                        .xialakongjian
                ) {
                    searchdata.push(
                        this.cavantable[ic].ParameterReportItemtList.dd
                            .xialakongjian
                    );
                }
                if (
                    this.cavantable[ic].ParameterReportItemtList.dd.endkongjian
                ) {
                    searchdata.push(
                        this.cavantable[ic].ParameterReportItemtList.dd
                            .endkongjian
                    );
                }
                this.cavantable[
                    ic
                ].ParameterReportItemtList.dd.kopngjianarray.forEach((item) => {
                    if (item.kjnum) {
                        searchdata.push(item.kjnum);
                    }
                    if (item.kjstart) {
                        searchdata.push(item.kjstart);
                    }
                    if (item.kjend) {
                        searchdata.push(item.kjend);
                    }
                    if (item.kjtext) {
                        searchdata.push(item.kjtext);
                    }
                });

                if (a == '默认查询') {
                    this.$parent.$refs.DateTimePicker282.timeInit(searchdata);
                    this.$parent.$refs.Combobox299.timeInit(searchdata);
                    this.$parent.$refs.NumberScreen30.timeInit(searchdata);
                    this.$parent.$refs.textimport27a.timeInit(searchdata);
                }

                if (
                    this.cavantable[ic].ParameterReportItemtList.dd
                        .cfkongjian == a.class ||
                    a == '默认查询'
                ) {
                    //  alert('111')
                    let wantdata =
                        this.cavantable[ic].ParameterReportItemtList.dd;
                    wantnum =
                        this.cavantable[ic].ParameterReportItemtList.dd
                            .cellparaarray;
                    this.cavantable[ic].sju = this.cavantable[
                        ic
                    ].ParameterReportItemtList.dd.cellparaarray.filter(
                        (item) => {
                            if (item.itemtype == '辅助项') {
                                return item;
                            }
                        }
                    );
                    wantnum = wantnum.filter((item) => {
                        if (item.itemtype !== '辅助项') {
                            return item;
                        }
                    });
                    if (
                        this.cavantable[ic].ParameterReportItemtList.dd
                            .kzresourcedataitemarray !== []
                    ) {
                        let dataarry = [];
                        for (
                            let iid = 0;
                            iid <
                            $('#' + this.cavantable[ic].Name).find(
                                '.datareadyhead'
                            ).length;
                            iid++
                        ) {
                            for (
                                let iid2 = 0;
                                iid2 <
                                this.cavantable[ic].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                iid2++
                            ) {
                                if (
                                    $('#' + this.cavantable[ic].Name).find(
                                        '.datareadyhead'
                                    )[iid].id ==
                                    this.cavantable[ic].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[iid2].id
                                ) {
                                    dataarry.push(
                                        this.cavantable[ic]
                                            .ParameterReportItemtList.dd
                                            .kzresourcedataitemarray[iid2]
                                    );
                                }
                            }
                        }
                        this.cavantable[
                            ic
                        ].ParameterReportItemtList.dd.kzresourcedataitemarray =
                            dataarry;
                    }
                    end = {};
                    end.kzresource = wantdata.kzresource;
                    end.kzresourceid = wantdata.kzresourceid;
                    end.kztimewd = wantdata.kztimewd;
                    end.kzbanciwd = wantdata.kzbanciwd;
                    end.kzresourcedataitemarray =
                        wantdata.kzresourcedataitemarray;
                    end.starttime = $($('.' + wantdata.startkongjian)[0])
                        .find('input')
                        .val();
                    end.endtime = $($('.' + wantdata.endkongjian)[0])
                        .find('input')
                        .val();
                    end.argwaibuparalist = wantdata.kopngjianarray;
                    if (end.argwaibuparalist.length !== 0) {
                        for (let j = 0; j < end.argwaibuparalist.length; j++) {
                            if (end.argwaibuparalist[j].kjtype == '时间') {
                                end.argwaibuparalist[j].starttime = $(
                                    $('.' + end.argwaibuparalist[j].kjstart)[0]
                                )
                                    .find('input')
                                    .val();
                                end.argwaibuparalist[j].endtime = $(
                                    $('.' + end.argwaibuparalist[j].kjend)[0]
                                )
                                    .find('input')
                                    .val();
                            } else if (
                                end.argwaibuparalist[j].kjtype == '文本'
                            ) {
                                if (
                                    $(
                                        $(
                                            $(
                                                '.' +
                                                end.argwaibuparalist[j]
                                                    .kjtext
                                            )[0]
                                        ).find('input')[0]
                                    ).attr('cx') == '精确匹配'
                                ) {
                                    end.argwaibuparalist[j].matchtype =
                                        '精确匹配';
                                } else if (
                                    $(
                                        $(
                                            $(
                                                '.' +
                                                end.argwaibuparalist[j]
                                                    .kjtext
                                            )[0]
                                        ).find('input')[0]
                                    ).attr('cx') == '模糊匹配'
                                ) {
                                    end.argwaibuparalist[j].matchtype =
                                        '模糊匹配';
                                }
                                end.argwaibuparalist[j].wenbentext = $(
                                    $('.' + end.argwaibuparalist[j].kjtext)[0]
                                )
                                    .find('input')
                                    .val();
                            } else if (
                                end.argwaibuparalist[j].kjtype == '数值'
                            ) {
                                for (
                                    let i1 = 0;
                                    i1 < Numbervalue.length;
                                    i1++
                                ) {
                                    if (
                                        end.argwaibuparalist[j].kjnum ==
                                        Numbervalue[i1].name
                                    ) {
                                        end.argwaibuparalist[j].value1 = Number(
                                            Numbervalue[i1].value1
                                        );
                                        end.argwaibuparalist[j].value2 = Number(
                                            Numbervalue[i1].value2
                                        );
                                        end.argwaibuparalist[j].itemshuzhitype =
                                            Numbervalue[i1].type;
                                    }
                                }
                                // end.argwaibuparalist[j].endtime = $(
                                //     $('.' + end.argwaibuparalist[j].kjend)[0]
                                // )
                                //     .find('input')
                                //     .val();
                            }
                            end.argwaibuparalist[j].waibuitemtype =
                                end.argwaibuparalist[j].kjtype;
                            end.argwaibuparalist[j].shuzhitext =
                                end.argwaibuparalist[j].kjnum;
                            end.argwaibuparalist[j].itemtimekey =
                                end.argwaibuparalist[j].kjitem;
                            end.argwaibuparalist[j].itemwenbenkey =
                                end.argwaibuparalist[j].kjitem;
                            end.argwaibuparalist[j].itemshuzhikey =
                                end.argwaibuparalist[j].kjitem;
                        }
                    }

                    let onenum = wantnum.filter((item) => {
                        if (item.resource == '历史归档') {
                            return item;
                        }
                    });
                    let twonum = wantnum.filter((item) => {
                        if (item.resource == '统计归档') {
                            return item;
                        }
                    });
                    let threenum = wantnum.filter((item) => {
                        if (item.resource == '外部数据源') {
                            return item;
                        }
                    });
                    if (onenum.length !== 0) {
                        let one = {};
                        one.starttime = $($('.' + wantdata.startkongjian)[0])
                            .find('input')
                            .val();
                        one.endtime = $($('.' + wantdata.endkongjian)[0])
                            .find('input')
                            .val();
                        one.cellresource = '历史归档';
                        one.paradata = end;
                        one.cellparalist = onenum;

                        // alert('历史')

                        await this.$axios({
                            method: 'post',
                            url: `/api/ParameterReport/SearchItemData`,
                            data: one,
                        }).then((res) => {
                            console.log('历史', res);
                            if (
                                res.data.data == '无数据' ||
                                res.data.data == '[]'
                            ) {
                                console.log('无数据');
                                for (
                                    let a2 = 0;
                                    a2 < one.cellparalist.length;
                                    a2++
                                ) {
                                    if (
                                        one.cellparalist[a2].defauldisplay !==
                                        null
                                    ) {
                                        $('#' + this.cavantable[ic].Name).find(
                                            '#' + one.cellparalist[a2].id
                                        )[0].innerHTML = this.getPointNum(
                                            one.cellparalist[a2].defauldisplay,
                                            parseInt(
                                                one.cellparalist[a2].xsnumber
                                            )
                                        );
                                    }
                                }
                            } else {
                                let a = JSON.parse(res.data.data);

                                for (
                                    let a2 = 0;
                                    a2 < one.cellparalist.length;
                                    a2++
                                ) {
                                    for (let a1 = 0; a1 < a.length; a1++) {
                                        if (
                                            one.cellparalist[a2].itemdata ==
                                            a[a1].name &&
                                            one.cellparalist[a2].sumtype ==
                                            a[a1].sumtype &&
                                            one.cellparalist[a2].itemdata
                                        ) {
                                            if (a[a1].value == null) {
                                                $(
                                                    '#' +
                                                    this.cavantable[ic].Name
                                                ).find(
                                                    '#' +
                                                    one.cellparalist[a2].id
                                                )[0].innerHTML = this.getPointNum(
                                                    one.cellparalist[a2]
                                                        .defauldisplay,
                                                    parseInt(
                                                        one.cellparalist[a2]
                                                            .xsnumber
                                                    )
                                                );
                                            } else {
                                                $(
                                                    '#' +
                                                    this.cavantable[ic].Name
                                                ).find(
                                                    '#' +
                                                    one.cellparalist[a2].id
                                                )[0].innerHTML = this.getPointNum(
                                                    a[a1].value,
                                                    parseInt(
                                                        one.cellparalist[a2]
                                                            .xsnumber
                                                    )
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                    if (twonum.length !== 0) {
                        twonum.push(twonum[0]);
                        let acc = this.dealWithData(twonum);
                        let wantarr = [];
                        let nn = [];
                        for (let i3 = 0; i3 < acc.length; i3++) {
                            nn.push(this.dealWithData2(acc[i3].allData));
                        }
                        for (let i31 = 0; i31 < nn.length; i31++) {
                            for (let i32 = 0; i32 < nn[i31].length; i32++) {
                                wantarr.push(nn[i31][i32].allData);
                            }
                        }

                        for (let cc = 0; cc < wantarr.length; cc++) {
                            let one = {};
                            one.starttime = $(
                                $('.' + wantdata.startkongjian)[0]
                            )
                                .find('input')
                                .val();
                            one.endtime = $($('.' + wantdata.endkongjian)[0])
                                .find('input')
                                .val();
                            one.cellresource = '统计归档';
                            one.paradata = end;
                            one.cellparalist = wantarr[cc];
                            await this.$axios({
                                method: 'post',
                                url: `/api/ParameterReport/SearchItemData`,
                                data: one,
                            }).then((res) => {
                                console.log('历史', res);
                                if (
                                    res.data.data == '无数据' ||
                                    res.data.data == '[]'
                                ) {
                                    console.log('无数据');
                                    for (
                                        let a2 = 0;
                                        a2 < one.cellparalist.length;
                                        a2++
                                    ) {
                                        if (
                                            one.cellparalist[a2]
                                                .defauldisplay !== null
                                        ) {
                                            $(
                                                '#' + this.cavantable[ic].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                parseInt(
                                                    one.cellparalist[a2]
                                                        .xsnumber
                                                )
                                            );
                                        }
                                    }
                                } else {
                                    let a = JSON.parse(res.data.data);

                                    for (
                                        let a2 = 0;
                                        a2 < one.cellparalist.length;
                                        a2++
                                    ) {
                                        for (let a1 = 0; a1 < a.length; a1++) {
                                            if (
                                                one.cellparalist[a2].itemdata ==
                                                a[a1].name &&
                                                one.cellparalist[a2].sumtype ==
                                                a[a1].sumtype &&
                                                one.cellparalist[a2].itemdata
                                            ) {
                                                if (a[a1].value == null) {
                                                    $(
                                                        '#' +
                                                        this.cavantable[ic]
                                                            .Name
                                                    ).find(
                                                        '#' +
                                                        one.cellparalist[a2]
                                                            .id
                                                    )[0].innerHTML = this.getPointNum(
                                                        one.cellparalist[a2]
                                                            .defauldisplay,
                                                        parseInt(
                                                            one.cellparalist[a2]
                                                                .xsnumber
                                                        )
                                                    );
                                                } else {
                                                    $(
                                                        '#' +
                                                        this.cavantable[ic]
                                                            .Name
                                                    ).find(
                                                        '#' +
                                                        one.cellparalist[a2]
                                                            .id
                                                    )[0].innerHTML = this.getPointNum(
                                                        a[a1].value,
                                                        parseInt(
                                                            one.cellparalist[a2]
                                                                .xsnumber
                                                        )
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }

                    if (
                        threenum.length !== 0 ||
                        end.kzresource == '外部数据源'
                    ) {
                        let wantarr = [];
                        for (
                            let i3 = 0;
                            i3 < this.dealWithData3(threenum).length;
                            i3++
                        ) {
                            wantarr.push(
                                this.dealWithData3(threenum)[i3].allData
                            );
                        }

                        for (let cc = 0; cc < wantarr.length; cc++) {
                            let one = {};
                            one.starttime = $(
                                $('.' + wantdata.startkongjian)[0]
                            )
                                .find('input')
                                .val();
                            one.endtime = $($('.' + wantdata.endkongjian)[0])
                                .find('input')
                                .val();
                            one.cellresource = '外部数据源';
                            one.cellparalist = wantarr[cc];
                            one.waibuparalist = end.argwaibuparalist;

                            await this.$axios({
                                method: 'post',
                                url: `/api/ParameterReport/SearchItemData`,
                                data: one,
                            }).then((res) => {
                                if (
                                    res.data.data == '无数据' ||
                                    res.data.data == '[]'
                                ) {
                                    console.log('无数据');
                                    for (
                                        let a2 = 0;
                                        a2 < one.cellparalist.length;
                                        a2++
                                    ) {
                                        if (
                                            one.cellparalist[a2]
                                                .defauldisplay !== null
                                        ) {
                                            $(
                                                '#' + this.cavantable[ic].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                parseInt(
                                                    one.cellparalist[a2]
                                                        .xsnumber
                                                )
                                            );
                                        }
                                    }
                                } else {
                                    let a = JSON.parse(res.data.data);

                                    for (
                                        let a2 = 0;
                                        a2 < one.cellparalist.length;
                                        a2++
                                    ) {
                                        for (let a1 = 0; a1 < a.length; a1++) {
                                            if (
                                                one.cellparalist[a2].itemdata ==
                                                a[a1].name &&
                                                one.cellparalist[a2].sumtype ==
                                                a[a1].sumtype
                                            ) {
                                                if (a[a1].value == null) {
                                                    $(
                                                        '#' +
                                                        this.cavantable[ic]
                                                            .Name
                                                    ).find(
                                                        '#' +
                                                        one.cellparalist[a2]
                                                            .id
                                                    )[0].innerHTML = this.getPointNum(
                                                        one.cellparalist[a2]
                                                            .defauldisplay,
                                                        parseInt(
                                                            one.cellparalist[a2]
                                                                .xsnumber
                                                        )
                                                    );
                                                } else {
                                                    $(
                                                        '#' +
                                                        this.cavantable[ic]
                                                            .Name
                                                    ).find(
                                                        '#' +
                                                        one.cellparalist[a2]
                                                            .id
                                                    )[0].innerHTML = this.getPointNum(
                                                        a[a1].value,
                                                        parseInt(
                                                            one.cellparalist[a2]
                                                                .xsnumber
                                                        )
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                    var that = this;
                    await this.$axios({
                        method: 'post',
                        url: `/api/ParameterReport/SearchExtensionData`,
                        data: end,
                    })
                        .then((res) => {
                            console.log('res', JSON.parse(res.data.data));
                            var a2 = [];
                            if (res.data.data !== '无数据') {
                                a2 = JSON.parse(res.data.data);
                                var wantdata = JSON.stringify(a2);
                            }

                            if (
                                res.data.data == '无数据' ||
                                a2.length <= this.cavantable[ic].nowlength ||
                                res.data.data == '[]'
                            ) {
                                if (res.data.data == '无数据' || a2 == []) {
                                    this.cavantable[ic].data = [];
                                    this.cavantable[ic].nowdata = [];
                                    $(
                                        '#' + this.cavantable[ic].Name + 'page'
                                    ).remove();
                                } else {
                                    this.cavantable[ic].data = a2;
                                    this.cavantable[ic].nowdata = a2;
                                    $(
                                        '#' + this.cavantable[ic].Name + 'page'
                                    ).remove();
                                }
                            } else {
                                console.log(this.cavantable);
                                // $(
                                //     '#' + this.cavantable[ic].Name + 'page'
                                // ).remove();
                                if (this.cavantable[ic].data.length == 0) {
                                    if (
                                        $(
                                            '#' +
                                            this.cavantable[ic].Name +
                                            'page'
                                        ).length == 0
                                    ) {
                                        console.log('sadsasaddsa1');

                                        let a1 =
                                            `<div class="page2" style="position:absolute;z-index:${this.cavantable[ic].PropertyList.ZIndex}" id="` +
                                            this.cavantable[ic].Name +
                                            `page">
		    <div class="page1" id="id">
			<div class="start">1</div>
			     <div class="next"><img src=${this.previmg} ></div>
				 <div class="jump">
					 <input type="text" class="numinp" value="1">
				 </div>
				 <div class="last"><img src=${this.nextimg} ></div>
				 <div class="end">${this.cavantable[ic].numpage}</div>
				</div>
                </div>`;

                                        $('#' + this.cavantable[ic].Name)
                                            .parent()
                                            .append(a1);
                                    }
                                    //   console.log("sadsasaddsa122")
                                    var numd = this.cavantable[ic].nowlength;
                                    this.cavantable[ic].data = a2;

                                    this.cavantable[ic].nowdata = JSON.parse(
                                        wantdata
                                    ).splice(0, numd);
                                    $(
                                        '#' + this.cavantable[ic].Name + 'page'
                                    ).find('.numinp')[0].value = 1;
                                    $(
                                        '#' + this.cavantable[ic].Name + 'page'
                                    ).find('.end')[0].innerHTML = Math.ceil(
                                        JSON.parse(wantdata).length / numd
                                    );
                                    this.cavantable[ic].numpage = Math.ceil(
                                        JSON.parse(wantdata).length / numd
                                    );
                                    //   console.log("sadsasaddsa1555555")
                                } else {
                                    //   console.log("333213")
                                    this.cavantable[ic].data = a2;
                                    let numd = this.cavantable[ic].nowlength;
                                    this.cavantable[ic].nowdata = JSON.parse(
                                        wantdata
                                    ).splice(0, numd);
                                    if (
                                        a2.length <=
                                        this.cavantable[ic].nowlength
                                    ) {
                                        //  console.log("sadsasaddsa1555555fff")
                                        $(
                                            '#' +
                                            this.cavantable[ic].Name +
                                            'page'
                                        ).find('.numinp')[0].value = 1;
                                        $(
                                            '#' +
                                            this.cavantable[ic].Name +
                                            'page'
                                        ).find('.end')[0].innerHTML = Math.ceil(
                                            JSON.parse(wantdata).length / numd
                                        );
                                        this.cavantable[ic].numpage = Math.ceil(
                                            JSON.parse(wantdata).length / numd
                                        );
                                    } else {
                                        //   console.log("sadsasaddsa1555555fff1")
                                        if (
                                            this.cavantable[ic].page ==
                                            undefined
                                        ) {
                                            //  console.log("sadsasaddsa1555555fff1222")
                                            if (
                                                $(
                                                    '#' +
                                                    this.cavantable[ic]
                                                        .Name +
                                                    'page'
                                                ).length == 0
                                            ) {
                                                //    console.log("sadsasaddsa1555555fff122233333333333")
                                                let a1 =
                                                    `<div class="page2"  style="position:absolute;z-index:${this.cavantable[ic].PropertyList.ZIndex}" id="` +
                                                    this.cavantable[ic].Name +
                                                    `page">
    <div class="page1" id="id">
    <div class="start">1</div>
         <div class="next"><img src=${this.previmg} ></div>
         <div class="jump">
             <input type="text" class="numinp" value="1">
         </div>
         <div class="last"><img src=${this.nextimg} ></div>
         <div class="end">${this.cavantable[ic].numpage}</div>
        </div>
        </div>`;
                                                $(
                                                    '#' +
                                                    this.cavantable[ic].Name
                                                )
                                                    .parent()
                                                    .append(a1);
                                                $(
                                                    '#' +
                                                    this.cavantable[ic].Name
                                                )
                                                    .parent()
                                                    .append(
                                                        this.cavantable[ic].page
                                                    );
                                            }
                                            let numd =
                                                this.cavantable[ic].nowlength;

                                            this.cavantable[ic].numpage =
                                                Math.ceil(
                                                    JSON.parse(wantdata)
                                                        .length / numd
                                                );
                                            $(
                                                '#' +
                                                this.cavantable[ic].Name +
                                                'page'
                                            ).find('.numinp')[0].value = 1;
                                            $(
                                                '#' +
                                                this.cavantable[ic].Name +
                                                'page'
                                            ).find('.end')[0].innerHTML =
                                                Math.ceil(
                                                    JSON.parse(wantdata)
                                                        .length / numd
                                                );
                                        } else {
                                            if (
                                                $(
                                                    '#' +
                                                    this.cavantable[ic]
                                                        .Name +
                                                    'page'
                                                ).length == 0
                                            ) {
                                                $(
                                                    '#' +
                                                    this.cavantable[ic].Name
                                                )
                                                    .parent()
                                                    .append(
                                                        this.cavantable[ic].page
                                                    );
                                            }
                                            let numd =
                                                this.cavantable[ic].nowlength;

                                            this.cavantable[ic].numpage =
                                                Math.ceil(
                                                    JSON.parse(wantdata)
                                                        .length / numd
                                                );
                                            $(
                                                '#' +
                                                this.cavantable[ic].Name +
                                                'page'
                                            ).find('.end')[0].innerHTML =
                                                Math.ceil(
                                                    JSON.parse(wantdata)
                                                        .length / numd
                                                );
                                        }
                                    }
                                }
                            }
                            // if(res.data.data == '无数据'){
                            //    this.cavantable[i].data = [];
                            //      this.cavantable[i].nowdata = [];
                            //    $("#"+(this.cavantable[i].Name+"page")).hide();
                            //    $("#"+this.cavantable[i].Name).hide();
                            //
                            // }else{

                            //      var a = JSON.parse(res.data.data);
                            //      var wantdata = JSON.stringify(a);
                            //
                            //      if(a.length<=this.cavantable[i].nowdata.length){
                            //            $("#"+(this.cavantable[i].Name+"page")).hide();
                            //            $("#"+this.cavantable[i].Name).show();
                            //            this.cavantable[i].data = a;
                            //            this.cavantable[i].nowdata = a;
                            //      }else{

                            //        $("#"+(this.cavantable[i].Name+"page")).show();
                            //        $("#"+this.cavantable[i].Name).show();
                            //            let numd = this.cavantable[i].nowdata.length;
                            //            this.cavantable[i].nowdata = JSON.parse(wantdata).splice(0, numd);
                            //            $("#" + this.cavantable[i].Name + "page").find(".numinp")[0].value = 1;
                            //
                            // $("#" + this.cavantable[i].Name + "page").find(".end")[0].innerHTML = Math.ceil(JSON.parse(wantdata).length / numd);
                            // this.cavantable[i].numpage = Math.ceil(JSON.parse(wantdata).length / numd);

                            //      }

                            // }
                        })
                        .then((re1) => {
                            this.$nextTick(() => {
                                for (
                                    let ac = 0;
                                    ac < this.cavantable[ic].sju.length;
                                    ac++
                                ) {
                                    if (
                                        this.cavantable[ic].sju[ac].itemdata ==
                                        '查询时间'
                                    ) {
                                        if (
                                            this.cavantable[ic].sju[ac]
                                                .itemformat
                                        ) {
                                            this.cavantable[ic].sju[
                                                ac
                                            ].itemformat = this.cavantable[
                                                ic
                                            ].sju[ac].itemformat.replace(
                                                'dd',
                                                'DD'
                                            );
                                            this.cavantable[ic].sju[
                                                ac
                                            ].itemformat = this.cavantable[
                                                ic
                                            ].sju[ac].itemformat.replace(
                                                'yyyy',
                                                'YYYY'
                                            );
                                        }

                                        $('#' + this.cavantable[ic].Name).find(
                                            '#' + this.cavantable[ic].sju[ac].id
                                        )[0].innerHTML = moment().format(
                                            this.cavantable[ic].sju[ac]
                                                .itemformat
                                        );
                                        console.log(
                                            '时间',
                                            this.cavantable[ic].sju[ac]
                                                .itemformat
                                        );
                                    }
                                    if (
                                        this.cavantable[ic].sju[ac].itemdata ==
                                        '查询账号'
                                    ) {
                                        if (
                                            !JSON.parse(
                                                sessionStorage.getItem(
                                                    'userInfo1'
                                                )
                                            )
                                        ) {
                                            $(
                                                '#' + this.cavantable[ic].Name
                                            ).find(
                                                '#' +
                                                this.cavantable[ic].sju[ac]
                                                    .id
                                            )[0].innerHTML = JSON.parse(
                                                sessionStorage.getItem(
                                                    'sightseerInfo1'
                                                )
                                            ).SCMSUserAccount;
                                        } else {
                                            $(
                                                '#' + this.cavantable[ic].Name
                                            ).find(
                                                '#' +
                                                this.cavantable[ic].sju[ac]
                                                    .id
                                            )[0].innerHTML = JSON.parse(
                                                sessionStorage.getItem(
                                                    'userInfo1'
                                                )
                                            ).SCMSUserAccount;
                                        }
                                    }
                                }
                            });
                        })
                        .then(() => {
                            let b = $('#' + this.cavantable[ic].Name).find(
                                'input'
                            ).length;

                            for (let ip = 0; ip < b; ip++) {
                                $(
                                    $('#' + this.cavantable[ic].Name).find(
                                        'input'
                                    )[0]
                                ).remove();
                            }
                            let pdwi = true;
                            if (ic == this.cavantable.length - 1 && i1) {
                                pdwi = false;
                            }
                            for (
                                let is = 0;
                                is < this.cavantable.length;
                                is++
                            ) {
                                if (
                                    this.cavantable[is].numpage > 1 &&
                                    $(
                                        '#' + this.cavantable[is].Name + 'page'
                                    )[0]
                                ) {
                                    if (
                                        !parseFloat(
                                            $(
                                                '#' +
                                                this.cavantable[is].Name +
                                                'page'
                                            )[0].style.top
                                        )
                                    ) {
                                        $(
                                            '#' +
                                            this.cavantable[is].Name +
                                            'page'
                                        ).hide();
                                    }
                                }
                            }
                            setTimeout(() => {
                                this.setbodydata(1, pdwi);
                            });

                            // if(pdstate )
                            // }
                        });
                }
            }
        },

        setbodydata(a, b) {
            console.log('我问问', this.cavantable);

            setTimeout(() => {
                if (!b && b !== undefined) {
                    this.$store.state.isShow = false;
                }
            });
            console.log('nbbb', b);
            var pdclone = a;
            this.reg = new RegExp('^[0-9]*$');
            for (let is = 0; is < this.cavantable.length; is++) {
                if (this.cavantable[is])
                    var daitidata = JSON.stringify(this.cavantable[is].nowdata);
                if (
                    this.cavantable[is].ParameterReportItemtList.dd
                        .kzdirection == '纵向扩展'
                ) {
                    if (
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzsummopos == '无'
                    ) {
                        this.snum = this.cavantable[is].nowy;
                        this.enum = this.cavantable[is].nowy;
                        this.roww = this.cavantable[is].endpox;
                        this.rowh = this.cavantable[is].endpoy;
                        this.sad = 0;
                        this.ead = 0;
                        for (let i = 0; i < this.rowh; i++) {
                            this.sad = 0;

                            for (let j = 0; j < this.roww; j++) {
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        `#row-` + this.snum
                                    )[0]
                                ).find('.dataready')[this.sad].innerHTML = '';
                                this.sad++;
                            }
                            $(
                                $('#' + this.cavantable[is].Name).find(
                                    `#row-` + this.snum
                                )[0]
                            ).addClass('daochu');
                            this.snum++;
                        }
                        for (let i = 0; i < this.rowh; i++) {
                            this.ead = 0;
                            for (let j = 0; j < this.roww; j++) {
                                this.an = i * this.roww + j;
                                if (
                                    parseInt(this.an) >=
                                    this.cavantable[is].nowdata.length
                                ) {
                                    this.cavantable[is].nowdata.push({
                                        value: null,
                                        modify: '可修改',
                                        modifyname: null,
                                    });
                                }
                                if (
                                    this.cavantable[is].shi2.indexOf(
                                        this.ead
                                    ) <= -1
                                ) {
                                    this.cavantable[is].nowdata.splice(
                                        this.an,
                                        0,
                                        {
                                            value: null,
                                            modifyname: null,
                                        }
                                    );
                                }
                                if (
                                    this.cavantable[is].nowdata[this.an]
                                        .value == 'null'
                                ) {
                                    this.cavantable[is].nowdata[this.an].value =
                                        '';
                                }

                                if (
                                    this.cavantable[is].nowdata[this.an]
                                        .modifyname !== null
                                ) {
                                    let inp = document.createElement('input');
                                    if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'bottom'
                                    ) {
                                        if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'bottom'
                                        ) {
                                            inp.style.bottom =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        }
                                    } else if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'top'
                                    ) {
                                        inp.style.top =
                                            -(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                                    .clientHeight / 2
                                            ) + 'px';
                                    }
                                    let ss = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].id;
                                    inp.style.width =
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        ).find('.dataready')[this.ead]
                                            .clientWidth + 'px';
                                    inp.style.textDecoration = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.textDecoration;
                                    inp.style.fontFamily = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontFamily;
                                    inp.style.backgroundColor = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.backgroundColor;
                                    inp.style.textAlign = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].align;
                                    inp.style.color = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].style.color;
                                    inp.style.fontSize = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontSize;
                                    inp.style.fontStyle = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontStyle;
                                    inp.style.fontWeight = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontWeight;
                                    inp.id =
                                        this.cavantable[is].nowdata[this.an].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    let xsnumber = '';
                                    let de = '';
                                    let itemformat = null;
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5.id ==
                                            this.ead
                                        ) {
                                            xsnumber =
                                                this.cavantable[is].shi5
                                                    .xsnumber;
                                            de =
                                                this.cavantable[is].shi5
                                                    .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi6.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi6.id ==
                                            this.ead
                                        ) {
                                            itemformat =
                                                this.cavantable[is].shi6
                                                    .itemformat;
                                            break;
                                        } else {
                                            itemformat = null;
                                        }
                                    }
                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null ||
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                //                      if($(
                                                //         $('#' + this.cavantable[is].Name).find(
                                                //             `#row-` + this.enum
                                                //         )[0]
                                                //     )
                                                //         .find('input')[0]){
                                                //             if($(
                                                //         $('#' + this.cavantable[is].Name).find(
                                                //             `#row-` + this.enum
                                                //         )[0]
                                                //     )
                                                //         .find('input')[0].value){
                                                //   inp.value = de;
                                                //         }

                                                //                 }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value = this.getPointNum(
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value,
                                                    xsnumber
                                                );
                                            }
                                        } else {
                                            inp.value = this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            );
                                        }
                                    } else {
                                        if (
                                            this.cavantable[is].nowdata[this.an]
                                                .value == null ||
                                            this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                //                     if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //          if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                //                 inp.value = de;
                                                //             }

                                                //             }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value;
                                            }
                                        } else {
                                            inp.value =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value;
                                        }
                                    }
                                    if (inp.value) {
                                        if (itemformat) {
                                            inp.value = this.dateFormat(
                                                itemformat,
                                                inp.value
                                            );
                                        }
                                    }
                                    inp.classList.add('inp');
                                    if (inp.id !== 'undefined') {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    } else {
                                        //     if($(
                                        //     $('#' + this.cavantable[is].Name).find(
                                        //         `#row-` + this.enum
                                        //     )[0]
                                        // )
                                        //     .find('input')[0].id == "null"&&$(
                                        //     $('#' + this.cavantable[is].Name).find(
                                        //         `#row-` + this.enum
                                        //     )[0]
                                        // )
                                        //     .find('input')[0]){
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);

                                        // }
                                    }
                                    let re = /\bafter\b/;
                                    if (
                                        re.test(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                                .className
                                        )
                                    ) {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].classList.remove(
                                            'after'
                                        );
                                    }
                                } else {
                                    let inp = document.createElement('input');
                                    if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'bottom'
                                    ) {
                                        if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'bottom'
                                        ) {
                                            inp.style.bottom =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        }
                                    } else if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'top'
                                    ) {
                                        inp.style.top =
                                            -(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                                    .clientHeight / 2
                                            ) + 'px';
                                    }
                                    let ss = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].id;
                                    inp.style.textDecoration = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.textDecoration;

                                    inp.style.fontFamily = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontFamily;
                                    inp.style.width =
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        ).find('.dataready')[this.ead]
                                            .clientWidth + 'px';
                                    inp.style.backgroundColor = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.backgroundColor;
                                    inp.style.textAlign = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].align;
                                    inp.style.color = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].style.color;
                                    inp.style.fontSize = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontSize;
                                    inp.style.fontStyle = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontStyle;
                                    inp.style.fontWeight = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontWeight;
                                    inp.id =
                                        this.cavantable[is].nowdata[this.an].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }

                                    let xsnumber = '';
                                    let de = '';
                                    let itemformat = null;
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5[i1].id ==
                                            this.ead
                                        ) {
                                            xsnumber =
                                                this.cavantable[is].shi5[i1]
                                                    .xsnumber;
                                            de =
                                                this.cavantable[is].shi5[i1]
                                                    .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi6.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi6[i1].id ==
                                            this.ead
                                        ) {
                                            itemformat =
                                                this.cavantable[is].shi6[i1]
                                                    .itemformat;
                                            break;
                                        } else {
                                            itemformat = null;
                                        }
                                    }

                                    if (xsnumber !== '') {
                                        if (
                                            !this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            )
                                        ) {
                                            if (de !== '') {
                                                //    禅道16476
                                                //                    if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //         if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                //              inp.value = de;
                                                //         }

                                                //             }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value = this.getPointNum(
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value,
                                                    xsnumber
                                                );
                                            }
                                        } else {
                                            inp.value = this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            );
                                        }
                                    } else {
                                        if (
                                            this.cavantable[is].nowdata[this.an]
                                                .value == null ||
                                            this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                //                 if($($(
                                                //         $('#' + this.cavantable[is].Name).find(
                                                //             `#row-` + this.enum
                                                //         )[0]
                                                //     )
                                                //         .find('input')[0])){
                                                //    if($(
                                                //         $('#' + this.cavantable[is].Name).find(
                                                //             `#row-` + this.enum
                                                //         )[0]
                                                //     )
                                                //         .find('input')[0].value){
                                                //                     inp.value = de;
                                                //                 }
                                                //                 }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value;
                                            }
                                        } else {
                                            inp.value =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value;
                                        }
                                    }
                                    if (inp.value) {
                                        if (itemformat) {
                                            inp.value = this.dateFormat(
                                                itemformat,
                                                inp.value
                                            );
                                        }
                                    }
                                    inp.classList.add('inp');
                                    if (inp.id !== 'undefined') {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    } else {
                                        //     if($(
                                        //     $('#' + this.cavantable[is].Name).find(
                                        //         `#row-` + this.enum
                                        //     )[0]
                                        // )
                                        //     .find('input')[0].id == "null"&&$(
                                        //     $('#' + this.cavantable[is].Name).find(
                                        //         `#row-` + this.enum
                                        //     )[0]
                                        // )
                                        //     .find('input')[0]){
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);

                                        // }
                                    }
                                }
                                this.ead++;
                            }
                            this.enum++;
                        }
                    } else if (
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzsummopos == '分布在后'
                    ) {
                        let sumdata =
                            this.cavantable[
                                is
                            ].ParameterReportItemtList.dd.kzsummotype.split(
                                ','
                            );
                        this.snum = this.cavantable[is].nowy - sumdata.length;
                        this.enum = this.cavantable[is].nowy - sumdata.length;
                        this.roww = this.cavantable[is].endpox;
                        this.rowh = this.cavantable[is].endpoy;
                        this.sad = 0;
                        this.ead = 0;

                        for (let i = 0; i < this.rowh; i++) {
                            this.sad = 0;
                            for (let j = 0; j < this.roww; j++) {
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        `#row-` + this.snum
                                    )[0]
                                ).find('.dataready')[this.sad].innerHTML = '';
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        `#row-` + this.snum
                                    )[0]
                                ).addClass('daochu');
                                this.sad++;
                            }
                            this.snum++;
                        }

                        for (let i = 0; i < this.rowh; i++) {
                            this.ead = 0;
                            for (let j = 0; j < this.roww; j++) {
                                this.an = i * this.roww + j;
                                if (
                                    parseInt(this.an) >=
                                    this.cavantable[is].nowdata.length
                                ) {
                                    this.cavantable[is].nowdata.push({
                                        value: null,
                                        modify: '可修改',
                                        modifyname: null,
                                    });
                                }
                                if (
                                    this.cavantable[is].shi2.indexOf(
                                        this.ead
                                    ) <= -1
                                ) {
                                    this.cavantable[is].nowdata.splice(
                                        this.an,
                                        0,
                                        {
                                            value: null,
                                            modifyname: null,
                                        }
                                    );
                                }

                                if (
                                    this.cavantable[is].nowdata[this.an]
                                        .value == 'null'
                                ) {
                                    this.cavantable[is].nowdata[this.an].value =
                                        '';
                                }
                                //  console.log("ssssssssssssssssssssssssss11111")
                                if (
                                    this.cavantable[is].nowdata[this.an]
                                        .modifyname !== null
                                ) {
                                    // console.log("ssssssssssssssssssssssssss11111")
                                    let inp = document.createElement('input');
                                    if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'bottom'
                                    ) {
                                        if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'bottom'
                                        ) {
                                            inp.style.bottom =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        }
                                    } else if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'top'
                                    ) {
                                        inp.style.top =
                                            -(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                                    .clientHeight / 2
                                            ) + 'px';
                                    }

                                    let ss = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].id;
                                    inp.style.width =
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        ).find('.dataready')[this.ead]
                                            .clientWidth + 'px';
                                    inp.style.backgroundColor = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.backgroundColor;
                                    inp.style.textDecoration = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.textDecoration;
                                    inp.style.fontFamily = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontFamily;
                                    inp.style.textAlign = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].align;
                                    inp.style.color = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].style.color;
                                    inp.style.fontSize = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontSize;
                                    inp.style.fontStyle = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontStyle;
                                    inp.style.fontWeight = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontWeight;
                                    inp.id =
                                        this.cavantable[is].nowdata[this.an].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }

                                    let xsnumber = '';
                                    let de = '';
                                    let itemformat = null;
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5.id ==
                                            this.ead
                                        ) {
                                            xsnumber =
                                                this.cavantable[is].shi5
                                                    .xsnumber;
                                            de =
                                                this.cavantable[is].shi5
                                                    .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi6.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi6.id ==
                                            this.ead
                                        ) {
                                            itemformat =
                                                this.cavantable[is].shi6
                                                    .itemformat;
                                            break;
                                        } else {
                                            itemformat = null;
                                        }
                                    }

                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null ||
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                //                     if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //             if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                //            inp.value = de;
                                                //         }

                                                //             }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value = this.getPointNum(
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value,
                                                    xsnumber
                                                );
                                            }
                                        } else {
                                            inp.value = this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            );
                                        }
                                    } else {
                                        if (
                                            this.cavantable[is].nowdata[this.an]
                                                .value == null ||
                                            this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                                //                     if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //         if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                //             inp.value = de;
                                                //         }

                                                //             }
                                            } else {
                                                inp.value =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value;
                                            }
                                        } else {
                                            inp.value =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value;
                                        }
                                    }
                                    if (inp.value) {
                                        if (itemformat) {
                                            inp.value = this.dateFormat(
                                                itemformat,
                                                inp.value
                                            );
                                        }
                                    }
                                    inp.classList.add('inp');
                                    if (inp.id !== 'undefined') {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    } else {
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('input')[0].id == 'null' &&
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('input')[0]
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            )
                                                .find('.dataready')
                                            [this.ead].appendChild(inp);
                                        }
                                    }

                                    let re = /\bafter\b/;
                                    if (
                                        re.test(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                                .className
                                        )
                                    ) {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].classList.remove(
                                            'after'
                                        );
                                    }
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')
                                    [this.ead].appendChild(inp);
                                } else {
                                    // console.log("ssssssssssssssssssssssssss11111")
                                    let inp = document.createElement('input');

                                    if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'bottom'
                                    ) {
                                        if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'bottom'
                                        ) {
                                            console.log(
                                                $(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                    this.ead
                                                    ]
                                                )
                                            );
                                            console.log(
                                                $(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                    this.ead
                                                    ]
                                                ).attr('valign')
                                            );
                                            inp.style.bottom =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        }
                                    } else if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'top'
                                    ) {
                                        inp.style.top =
                                            -(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                                    .clientHeight / 2
                                            ) + 'px';
                                    }

                                    let ss = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].id;
                                    inp.style.width =
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        ).find('.dataready')[this.ead]
                                            .clientWidth + 'px';
                                    inp.style.backgroundColor = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.backgroundColor;
                                    inp.style.textAlign = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].align;
                                    inp.style.color = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].style.color;
                                    inp.style.fontSize = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontSize;
                                    inp.style.fontStyle = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontStyle;
                                    inp.style.fontWeight = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontWeight;
                                    inp.style.textDecoration = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.textDecoration;
                                    inp.style.fontFamily = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontFamily;
                                    inp.id =
                                        this.cavantable[is].nowdata[this.an].id;

                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    let xsnumber = '';
                                    let de = '';
                                    let itemformat = null;

                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5[i1].id ==
                                            this.ead
                                        ) {
                                            xsnumber =
                                                this.cavantable[is].shi5[i1]
                                                    .xsnumber;
                                            de =
                                                this.cavantable[is].shi5[i1]
                                                    .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi6.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi6[i1].id ==
                                            this.ead
                                        ) {
                                            itemformat =
                                                this.cavantable[is].shi6[i1]
                                                    .itemformat;
                                            break;
                                        } else {
                                            itemformat = '';
                                        }
                                    }

                                    if (!de) {
                                    }
                                    //   console.log("ssssssssssssssssssss22")
                                    if (xsnumber !== '') {
                                        // console.log("ssssssssssssssssssss221")
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null ||
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            //  console.log("ssssssssssssssssssss221")
                                            if (de !== '') {
                                                //              console.log('ssssssssssssssssssss221',$(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // ))
                                                //             console.log('ssssssssssssssssssss221',$(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // ).find('input')[0])
                                                //             if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //         if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }

                                                // }

                                                //     }
                                            } else {
                                                inp.value = this.getPointNum(
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value,
                                                    xsnumber
                                                );
                                            }
                                        } else {
                                            inp.value = this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            );
                                        }
                                    } else {
                                        //    console.log("ssssssssssssssssssss2213")
                                        if (
                                            this.cavantable[is].nowdata[this.an]
                                                .value == null ||
                                            this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                //                      if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //         if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                //        inp.value = de;
                                                //         }

                                                //             }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value;
                                                inp.id =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].id;
                                            }
                                        } else {
                                            inp.value =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value;
                                            inp.id =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].id;
                                        }
                                    }

                                    if (inp.value) {
                                        if (itemformat) {
                                            inp.value = this.dateFormat(
                                                itemformat,
                                                inp.value
                                            );
                                        }
                                    }
                                    // console.log(    $(
                                    //     $('#' + this.cavantable[is].Name).find(
                                    //         `#row-` + this.enum
                                    //     )[0]
                                    // )
                                    //     .find('.dataready')[this.ead])
                                    inp.classList.add('inp');
                                    // if(inp.id!=="undefined"){
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')
                                    [this.ead].appendChild(inp);
                                    // }else{
                                    //     if($(
                                    //     $('#' + this.cavantable[is].Name).find(
                                    //         `#row-` + this.enum
                                    //     )[0]
                                    // )
                                    //     .find('input')[0].id == "null"&&$(
                                    //     $('#' + this.cavantable[is].Name).find(
                                    //         `#row-` + this.enum
                                    //     )[0]
                                    // )
                                    //     .find('input')[0]){
                                    //              $(
                                    //     $('#' + this.cavantable[is].Name).find(
                                    //         `#row-` + this.enum
                                    //     )[0]
                                    // )
                                    //     .find('.dataready')[this.ead].appendChild(inp);

                                    //     }
                                    // }
                                }
                                this.ead++;
                            }
                            this.enum++;
                        }

                        let nowsum =
                            parseInt(
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpoy
                            ) + 1;
                        let endw = this.cavantable[is].endpox;
                        let endh = this.cavantable[is].endpoy;
                        var sumnum = 0;
                        for (
                            let i2 = 0;
                            i2 <
                            $('#' + this.cavantable[is].Name).find('tr').length;
                            i2++
                        ) {
                            for (
                                let i3 = 0;
                                i3 <
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        'tr'
                                    )[i2]
                                ).find('td').length;
                                i3++
                            ) {
                                if (
                                    $(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('tr')[i2]
                                        ).find('td')[i3]
                                    ).hasClass('datareadyfoot')
                                ) {
                                    sumnum = sumnum + 1;
                                    break;
                                }
                            }
                        }
                        console.log('1111111111');
                        for (let k = 0; k < sumnum; k++) {
                            if (sumdata[k] == 'sum') {
                                for (let j = 0; j < endw; j++) {
                                    let aindex;
                                    let result = this.cavantable[is].shi5.some(
                                        function (item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        }
                                    );
                                    let pdz = false;
                                    let heji = 0;
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
                                        if (aindex !== undefined) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[aindex]
                                                    .defauldisplay !==
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[
                                                            is
                                                        ].Name
                                                    ).find(`#row-` + i)[0]
                                                ).find('.inp')[j].value
                                            ) {
                                                pdz = true;
                                            }
                                        }

                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + i)[0]
                                            ).find('.inp')[j].id ==
                                            'undefind' ||
                                            isNaN(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            )
                                        ) {
                                            // console.log('纵向分布在前');
                                        } else {
                                            heji =
                                                heji +
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                );
                                        }
                                    }
                                    if (!heji) {
                                        heji = 0;
                                    }
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(
                                                        k + endh + nowsum
                                                    )
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = '\\';
                                        }
                                    } else {
                                        if (result == true) {
                                            if (pdz) {
                                                if (
                                                    j !== 0 &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpox
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpox
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                k +
                                                                endh +
                                                                nowsum
                                                            )
                                                        )[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (heji == undefined) {
                                                    if (
                                                        j !== 0 &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = null;
                                                    }
                                                } else {
                                                    for (
                                                        let ss = 0;
                                                        ss <
                                                        this.cavantable[is].shi5
                                                            .length;
                                                        ss++
                                                    ) {
                                                        if (
                                                            this.cavantable[is]
                                                                .shi5[ss].id ==
                                                            j
                                                        ) {
                                                            heji =
                                                                this.getPointNum(
                                                                    heji,
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].shi5[ss]
                                                                        .xsnumber
                                                                );
                                                        }
                                                    }
                                                    if (!heji) {
                                                        heji = 0;
                                                    }
                                                    if (j !== 0) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = heji;
                                                    }
                                                    if (
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) ==
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = heji;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        this.cavantable[is].shi2.indexOf(j) > -1
                                    ) {
                                        // console.log('纵向分布在后');
                                    } else {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` +
                                                parseInt(k + endh + nowsum)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            null;
                                    }
                                }
                            } else if (sumdata[k] == 'min') {
                                for (let j = 0; j < endw; j++) {
                                    let aindex;
                                    let result = this.cavantable[is].shi5.some(
                                        function (item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        }
                                    );
                                    let pdz = false;
                                    let heji = 0;
                                    let min = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
                                        if (aindex !== undefined) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[aindex]
                                                    .defauldisplay !==
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[
                                                            is
                                                        ].Name
                                                    ).find(`#row-` + i)[0]
                                                ).find('.inp')[j].value
                                            ) {
                                                pdz = true;
                                            }
                                        }

                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + i)[0]
                                            ).find('.inp')[j].id ==
                                            'undefind' ||
                                            isNaN(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            )
                                        ) {
                                            // console.log('纵向分布在前');
                                        } else {
                                            min.push(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            );
                                        }
                                    }

                                    min.sort(function (a, b) {
                                        return a - b;
                                    });
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(
                                                        k + endh + nowsum
                                                    )
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = '\\';
                                        }
                                    } else {
                                        if (result == true) {
                                            if (pdz) {
                                                if (
                                                    j !== 0 &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpox
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpox
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                k +
                                                                endh +
                                                                nowsum
                                                            )
                                                        )[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (min[0] == undefined) {
                                                    if (
                                                        j !== 0 &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = 0;
                                                    }
                                                } else {
                                                    if (j !== 0) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = min[0];
                                                    }
                                                    if (
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) ==
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = min[0];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        this.cavantable[is].shi2.indexOf(j) > -1
                                    ) {
                                        // console.log('纵向分布在后');
                                    } else {
                                        if (
                                            !$(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` +
                                                        parseInt(
                                                            k +
                                                            endh +
                                                            nowsum
                                                        )
                                                    )[0]
                                                ).find('.datareadyfoot')[j]
                                                    .innerHTML
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(
                                                        k + endh + nowsum
                                                    )
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = null;
                                        }
                                    }
                                }
                            } else if (sumdata[k] == 'mean') {
                                for (let j = 0; j < endw; j++) {
                                    let aindex;
                                    let result = this.cavantable[is].shi5.some(
                                        function (item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        }
                                    );
                                    let pdz = false;
                                    let heji = 0;
                                    let length = 0;
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
                                        if (aindex !== undefined) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[aindex]
                                                    .defauldisplay !==
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[
                                                            is
                                                        ].Name
                                                    ).find(`#row-` + i)[0]
                                                ).find('.inp')[j].value
                                            ) {
                                                pdz = true;
                                            }
                                        }
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + i)[0]
                                            ).find('.inp')[j].id ==
                                            'undefind' ||
                                            isNaN(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            )
                                        ) {
                                            // console.log('纵向分布在前');
                                        } else {
                                            length++;
                                            heji =
                                                heji +
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                );
                                        }
                                    }

                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(
                                                        k + endh + nowsum
                                                    )
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = '\\';
                                        }
                                    } else {
                                        if (result == true) {
                                            if (pdz) {
                                                if (
                                                    j !== 0 &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpox
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpox
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                k +
                                                                endh +
                                                                nowsum
                                                            )
                                                        )[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (heji == undefined) {
                                                    if (
                                                        j !== 0 &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = null;
                                                    }
                                                } else {
                                                    let mean = heji / length;
                                                    for (
                                                        let ss = 0;
                                                        ss <
                                                        this.cavantable[is].shi5
                                                            .length;
                                                        ss++
                                                    ) {
                                                        if (
                                                            this.cavantable[is]
                                                                .shi5[ss].id ==
                                                            j
                                                        ) {
                                                            mean =
                                                                this.getPointNum(
                                                                    mean,
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].shi5[ss]
                                                                        .xsnumber
                                                                );
                                                        }
                                                    }
                                                    if (
                                                        isNaN(mean) ||
                                                        mean == null
                                                    ) {
                                                        mean = 0;
                                                    }
                                                    if (j !== 0) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = mean;
                                                    }
                                                    if (
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox ==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].endpox
                                                            )
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = mean;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        this.cavantable[is].shi2.indexOf(j) > -1
                                    ) {
                                        // console.log('纵向分布在后');
                                    } else {
                                        if (
                                            !$(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` +
                                                        parseInt(
                                                            k +
                                                            endh +
                                                            nowsum
                                                        )
                                                    )[0]
                                                ).find('.datareadyfoot')[j]
                                                    .innerHTML
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(
                                                        k + endh + nowsum
                                                    )
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = null;
                                        }
                                    }
                                }
                            } else if (sumdata[k] == 'max') {
                                for (let j = 0; j < endw; j++) {
                                    let aindex;
                                    let result = this.cavantable[is].shi5.some(
                                        function (item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        }
                                    );
                                    let pdz = false;
                                    let heji = 0;
                                    let min = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
                                        if (aindex !== undefined) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[aindex]
                                                    .defauldisplay !==
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[
                                                            is
                                                        ].Name
                                                    ).find(`#row-` + i)[0]
                                                ).find('.inp')[j].value
                                            ) {
                                                pdz = true;
                                            }
                                        }
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + i)[0]
                                            ).find('.inp')[j].id ==
                                            'undefind' ||
                                            isNaN(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            )
                                        ) {
                                            // console.log('纵向分布在前');
                                        } else {
                                            min.push(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            );
                                        }
                                    }
                                    min.sort(function (a, b) {
                                        return a - b;
                                    });
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(
                                                        k + endh + nowsum
                                                    )
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = '\\';
                                        }
                                    } else {
                                        if (result == true) {
                                            if (pdz) {
                                                if (
                                                    j !== 0 &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpox
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpox
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                k +
                                                                endh +
                                                                nowsum
                                                            )
                                                        )[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (
                                                    min[min.length - 1] ==
                                                    undefined
                                                ) {
                                                    if (
                                                        j !== 0 &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = 0;
                                                    }
                                                } else {
                                                    if (j !== 0) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML =
                                                            min[min.length - 1];
                                                    }
                                                    if (
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) ==
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    endh +
                                                                    nowsum
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML =
                                                            min[min.length - 1];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        this.cavantable[is].shi2.indexOf(j) > -1
                                    ) {
                                        // console.log('纵向分布在后');
                                    } else {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(
                                                        k + endh + nowsum
                                                    )
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = null;
                                        }
                                    }
                                }
                            }
                        }
                    } else if (
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzsummopos == '分布在前'
                    ) {
                        console.log('sssssssssssssssssssssssssssss');
                        let sumdata =
                            this.cavantable[
                                is
                            ].ParameterReportItemtList.dd.kzsummotype.split(
                                ','
                            );
                        this.snum = this.cavantable[is].nowy;
                        this.enum = this.cavantable[is].nowy;
                        this.roww = this.cavantable[is].endpox;
                        this.rowh = this.cavantable[is].endpoy;
                        this.sad = 0;
                        this.ead = 0;

                        for (let i = 0; i < this.rowh; i++) {
                            this.sad = 0;

                            for (let j = 0; j < this.roww; j++) {
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        `#row-` + this.snum
                                    )[0]
                                ).find('.dataready')[this.sad].innerHTML = '';
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        `#row-` + this.snum
                                    )[0]
                                ).addClass('daochu');
                                this.sad++;
                            }
                            this.snum++;
                        }
                        for (let i = 0; i < this.rowh; i++) {
                            this.ead = 0;
                            for (let j = 0; j < this.roww; j++) {
                                this.an = i * this.roww + j;
                                if (
                                    parseInt(this.an) >=
                                    this.cavantable[is].nowdata.length
                                ) {
                                    this.cavantable[is].nowdata.push({
                                        value: null,
                                        modify: '可修改',
                                        modifyname: null,
                                    });
                                }
                                if (
                                    this.cavantable[is].shi2.indexOf(
                                        this.ead
                                    ) <= -1
                                ) {
                                    this.cavantable[is].nowdata.splice(
                                        this.an,
                                        0,
                                        {
                                            value: null,
                                            modifyname: null,
                                        }
                                    );
                                }
                                if (
                                    this.cavantable[is].nowdata[this.an]
                                        .value == 'null'
                                ) {
                                    this.cavantable[is].nowdata[this.an].value =
                                        '';
                                }
                                if (
                                    this.cavantable[is].nowdata[this.an]
                                        .modifyname !== null
                                ) {
                                    let inp = document.createElement('input');
                                    if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'bottom'
                                    ) {
                                        if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'bottom'
                                        ) {
                                            inp.style.bottom =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        }
                                    } else if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'top'
                                    ) {
                                        inp.style.top =
                                            -(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                                    .clientHeight / 2
                                            ) + 'px';
                                    }
                                    let ss = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].id;
                                    inp.style.width =
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        ).find('.dataready')[this.ead]
                                            .clientWidth + 'px';
                                    inp.style.backgroundColor = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.backgroundColor;
                                    inp.style.textDecoration = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.textDecoration;
                                    inp.style.fontFamily = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontFamily;
                                    inp.style.textAlign = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].align;
                                    inp.style.color = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].style.color;
                                    inp.style.fontSize = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontSize;
                                    inp.style.fontStyle = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontStyle;
                                    inp.style.fontWeight = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontWeight;
                                    inp.id =
                                        this.cavantable[is].nowdata[this.an].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }

                                    let xsnumber = '';
                                    let de = '';
                                    let itemformat = null;
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5.id ==
                                            this.ead
                                        ) {
                                            xsnumber =
                                                this.cavantable[is].shi5
                                                    .xsnumber;
                                            de =
                                                this.cavantable[is].shi5
                                                    .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi6.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi6.id ==
                                            this.ead
                                        ) {
                                            itemformat =
                                                this.cavantable[is].shi6
                                                    .itemformat;
                                            break;
                                        } else {
                                            itemformat = '';
                                        }
                                    }
                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null ||
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                //                     if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //              if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                //         inp.value = de;
                                                //     }

                                                //             }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value = this.getPointNum(
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value,
                                                    xsnumber
                                                );
                                            }
                                        } else {
                                            inp.value = this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            );
                                        }
                                    } else {
                                        if (
                                            this.cavantable[is].nowdata[this.an]
                                                .value == null ||
                                            this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                //                    if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //         if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                //      inp.value = de;
                                                //     }

                                                //             }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value;
                                            }
                                        } else {
                                            inp.value =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value;
                                        }
                                    }
                                    if (inp.value) {
                                        if (itemformat) {
                                            inp.value = this.dateFormat(
                                                itemformat,
                                                inp.value
                                            );
                                        }
                                    }
                                    inp.classList.add('inp');
                                    if (inp.id !== 'undefined') {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    } else {
                                        //     if($(
                                        //     $('#' + this.cavantable[is].Name).find(
                                        //         `#row-` + this.enum
                                        //     )[0]
                                        // )
                                        //     .find('input')[0].id == "null"&&$(
                                        //     $('#' + this.cavantable[is].Name).find(
                                        //         `#row-` + this.enum
                                        //     )[0]
                                        // )

                                        //     .find('input')[0]){
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);

                                        // }
                                    }

                                    let re = /\bafter\b/;
                                    if (
                                        re.test(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                                .className
                                        )
                                    ) {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].classList.remove(
                                            'after'
                                        );
                                    }
                                } else {
                                    if (
                                        this.cavantable[is].nowdata[this.an] ==
                                        'null'
                                    ) {
                                        this.cavantable[is].nowdata[this.an] =
                                            '';
                                    }
                                    let inp = document.createElement('input');

                                    if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'bottom'
                                    ) {
                                        if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'bottom'
                                        ) {
                                            inp.style.bottom =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        }
                                    } else if (
                                        $(
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead]
                                        ).attr('valign') == 'top'
                                    ) {
                                        inp.style.top =
                                            -(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        `#row-` + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                                    .clientHeight / 2
                                            ) + 'px';
                                    }
                                    let ss = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].id;
                                    inp.style.width =
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        ).find('.dataready')[this.ead]
                                            .clientWidth + 'px';
                                    inp.style.backgroundColor = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.backgroundColor;
                                    inp.style.textDecoration = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.textDecoration;
                                    inp.style.fontFamily = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontFamily;
                                    inp.style.textAlign = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].align;
                                    inp.style.color = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].style.color;
                                    inp.style.fontSize = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontSize;
                                    inp.style.fontStyle = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontStyle;
                                    inp.style.fontWeight = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontWeight;
                                    inp.id =
                                        this.cavantable[is].nowdata[this.an].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    let xsnumber = '';
                                    let de = '';
                                    let itemformat = null;
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5[i1].id ==
                                            this.ead
                                        ) {
                                            xsnumber =
                                                this.cavantable[is].shi5[i1]
                                                    .xsnumber;
                                            de =
                                                this.cavantable[is].shi5[i1]
                                                    .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi6.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi6[i1].id ==
                                            this.ead
                                        ) {
                                            itemformat =
                                                this.cavantable[is].shi6[i1]
                                                    .itemformat;
                                            break;
                                        } else {
                                            itemformat = null;
                                        }
                                    }

                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null ||
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                //                   if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0]){
                                                //          if($(
                                                //     $('#' + this.cavantable[is].Name).find(
                                                //         `#row-` + this.enum
                                                //     )[0]
                                                // )
                                                //     .find('input')[0].value){
                                                //      inp.value = de;
                                                //     }

                                                //             }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value = this.getPointNum(
                                                    de,
                                                    xsnumber
                                                );
                                            }
                                        } else {
                                            inp.value = this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            );
                                        }
                                    } else {
                                        if (
                                            this.cavantable[is].nowdata[this.an]
                                                .value == null ||
                                            this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                //                         if($(
                                                //         $('#' + this.cavantable[is].Name).find(
                                                //             `#row-` + this.enum
                                                //         )[0]
                                                //     )
                                                //         .find('input')[0]){
                                                //             if($(
                                                //         $('#' + this.cavantable[is].Name).find(
                                                //             `#row-` + this.enum
                                                //         )[0]
                                                //     )
                                                //         .find('input')[0].value){
                                                // inp.value = de;
                                                //             }

                                                //                 }
                                                if (inp.id == 'null') {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value;
                                            }
                                        } else {
                                            inp.value =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value;
                                        }
                                    }
                                    if (inp.value) {
                                        if (itemformat) {
                                            inp.value = this.dateFormat(
                                                itemformat,
                                                inp.value
                                            );
                                        }
                                    }
                                    inp.classList.add('inp');
                                    if (inp.id !== 'undefined') {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    } else {
                                        //     if($(
                                        //     $('#' + this.cavantable[is].Name).find(
                                        //         `#row-` + this.enum
                                        //     )[0]
                                        // )
                                        //     .find('input')[0].id == "null"&&$(
                                        //     $('#' + this.cavantable[is].Name).find(
                                        //         `#row-` + this.enum
                                        //     )[0]
                                        // )
                                        //     .find('input')[0]){
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(`#row-` + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);

                                        // }
                                    }
                                }
                                this.ead++;
                            }
                            this.enum++;
                        }
                        let nowsum = this.cavantable[is].nowy;
                        let endw = this.cavantable[is].endpox;
                        let endh = this.cavantable[is].endpoy;
                        var alength;
                        if (
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在前'
                        ) {
                            alength =
                                parseFloat(
                                    this.cavantable[is].ParameterReportItemtList
                                        .dd.startpoy
                                ) + 1;
                        } else {
                            alength = 1 + this.cavantable[is].endpoy;
                        }
                        console.log('2222');
                        for (let k = 0; k < sumdata.length; k++) {
                            if (sumdata[k] == 'sum') {
                                for (let j = 0; j < endw; j++) {
                                    let aindex;
                                    let pdz = false;
                                    let result = this.cavantable[is].shi5.some(
                                        function (item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        }
                                    );
                                    let heji = 0;
                                    let length = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
                                        if (aindex !== undefined) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[aindex]
                                                    .defauldisplay !==
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[
                                                            is
                                                        ].Name
                                                    ).find(`#row-` + i)[0]
                                                ).find('.inp')[j].value
                                            ) {
                                                pdz = true;
                                            }
                                        }
                                        length++;
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + i)[0]
                                            ).find('.inp')[j].id ==
                                            'undefind' ||
                                            isNaN(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            )
                                        ) {
                                            // console.log('纵向分布在前');
                                        } else {
                                            heji =
                                                heji +
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                );
                                        }
                                    }

                                    if (!heji) {
                                        heji = 0;
                                    }
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(k + alength)
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = '\\';
                                        }
                                    } else {
                                        if (result == true) {
                                            if (!heji) {
                                                heji = 0;
                                            }
                                            if (pdz) {
                                                if (
                                                    j !== 0 &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpox
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpox
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                k + alength
                                                            )
                                                        )[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (heji == undefined) {
                                                    if (
                                                        j !== 0 &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = 0;
                                                    }
                                                } else {
                                                    for (
                                                        let ss = 0;
                                                        ss <
                                                        this.cavantable[is].shi5
                                                            .length;
                                                        ss++
                                                    ) {
                                                        if (
                                                            this.cavantable[is]
                                                                .shi5[ss].id ==
                                                            j
                                                        ) {
                                                            heji =
                                                                this.getPointNum(
                                                                    heji,
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].shi5[ss]
                                                                        .xsnumber
                                                                );
                                                        }
                                                    }
                                                    if (!heji) {
                                                        heji = 0;
                                                    }
                                                    if (j !== 0) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = heji;
                                                    }
                                                    if (
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) ==
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = heji;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        this.cavantable[is].shi2.indexOf(j) > -1
                                    ) {
                                        // console.log('纵向分布在后');
                                    } else {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(k + alength)
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = null;
                                        }
                                    }
                                }
                            } else if (sumdata[k] == 'min') {
                                for (let j = 0; j < endw; j++) {
                                    let aindex;
                                    let pdz = false;
                                    let result = this.cavantable[is].shi5.some(
                                        function (item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        }
                                    );
                                    let heji = 0;
                                    let min = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
                                        if (aindex !== undefined) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[aindex]
                                                    .defauldisplay !==
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[
                                                            is
                                                        ].Name
                                                    ).find(`#row-` + i)[0]
                                                ).find('.inp')[j].value
                                            ) {
                                                pdz = true;
                                            }
                                        }
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + i)[0]
                                            ).find('.inp')[j].id ==
                                            'undefind' ||
                                            isNaN(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            )
                                        ) {
                                            // console.log('纵向分布在前');
                                        } else {
                                            min.push(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            );
                                        }
                                    }
                                    min.sort(function (a, b) {
                                        return a - b;
                                    });
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(k + alength)
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = '\\';
                                        }
                                    } else {
                                        if (result == true) {
                                            if (pdz) {
                                                if (
                                                    j !== 0 &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpox
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpox
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                k + alength
                                                            )
                                                        )[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (min[0] == undefined) {
                                                    if (
                                                        j !== 0 &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = 0;
                                                    }
                                                } else {
                                                    if (j !== 0) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = min[0];
                                                    }
                                                    if (
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) ==
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = min[0];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        this.cavantable[is].shi2.indexOf(j) > -1
                                    ) {
                                        // console.log('纵向分布在后');
                                    } else {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(k + alength)
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = null;
                                        }
                                    }
                                }
                            } else if (sumdata[k] == 'mean') {
                                for (let j = 0; j < endw; j++) {
                                    let aindex;
                                    let pdz = false;
                                    let result = this.cavantable[is].shi5.some(
                                        function (item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        }
                                    );
                                    let heji = 0;
                                    let length = 0;
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
                                        if (aindex !== undefined) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[aindex]
                                                    .defauldisplay !==
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[
                                                            is
                                                        ].Name
                                                    ).find(`#row-` + i)[0]
                                                ).find('.inp')[j].value
                                            ) {
                                                pdz = true;
                                            }
                                        }
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + i)[0]
                                            ).find('.inp')[j].id ==
                                            'undefind' ||
                                            isNaN(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            )
                                        ) {
                                            // console.log('纵向分布在前');
                                        } else {
                                            length++;
                                            heji =
                                                heji +
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                );
                                        }
                                    }

                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(k + alength)
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = '\\';
                                        }
                                    } else {
                                        if (result == true) {
                                            if (pdz) {
                                                if (
                                                    j !== 0 &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpox
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpox
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                k + alength
                                                            )
                                                        )[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (heji == undefined) {
                                                    if (
                                                        j !== 0 &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = null;
                                                    }
                                                } else {
                                                    let mean = heji / length;
                                                    for (
                                                        let ss = 0;
                                                        ss <
                                                        this.cavantable[is].shi5
                                                            .length;
                                                        ss++
                                                    ) {
                                                        if (
                                                            this.cavantable[is]
                                                                .shi5[ss].id ==
                                                            j
                                                        ) {
                                                            mean =
                                                                this.getPointNum(
                                                                    mean,
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].shi5[ss]
                                                                        .xsnumber
                                                                );
                                                        }
                                                    }
                                                    if (
                                                        isNaN(mean) ||
                                                        mean == null
                                                    ) {
                                                        mean = 0;
                                                    }
                                                    if (j !== 0) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = mean;
                                                    }
                                                    if (
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) ==
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = mean;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        this.cavantable[is].shi2.indexOf(j) > -1
                                    ) {
                                        // console.log('纵向分布在后');
                                    } else {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(k + alength)
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = null;
                                        }
                                    }
                                }
                            } else if (sumdata[k] == 'max') {
                                for (let j = 0; j < endw; j++) {
                                    let aindex;
                                    let pdz = false;
                                    let result = this.cavantable[is].shi5.some(
                                        function (item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        }
                                    );
                                    let heji = 0;
                                    let min = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
                                        if (aindex !== undefined) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[aindex]
                                                    .defauldisplay !==
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[
                                                            is
                                                        ].Name
                                                    ).find(`#row-` + i)[0]
                                                ).find('.inp')[j].value
                                            ) {
                                                pdz = true;
                                            }
                                        }
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(`#row-` + i)[0]
                                            ).find('.inp')[j].id ==
                                            'undefind' ||
                                            isNaN(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            )
                                        ) {
                                            // console.log('纵向分布在前');
                                        } else {
                                            min.push(
                                                parseFloat(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(`#row-` + i)[0]
                                                    ).find('.inp')[j].value
                                                )
                                            );
                                        }
                                    }
                                    min.sort(function (a, b) {
                                        return a - b;
                                    });
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        if (
                                            j !== 0 &&
                                            parseFloat(
                                                this.cavantable[is].startpox
                                            ) !==
                                            parseFloat(
                                                this.cavantable[is].endpox
                                            )
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    `#row-` +
                                                    parseInt(k + alength)
                                                )[0]
                                            ).find('.datareadyfoot')[
                                                j
                                            ].innerHTML = '\\';
                                        }
                                    } else {
                                        if (result == true) {
                                            if (pdz) {
                                                if (
                                                    j !== 0 &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpox
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpox
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                k + alength
                                                            )
                                                        )[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (
                                                    min[min.length - 1] ==
                                                    undefined
                                                ) {
                                                    if (
                                                        j !== 0 &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpox
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = 0;
                                                    }
                                                } else {
                                                    if (j !== 0) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML =
                                                            min[min.length - 1];
                                                    }
                                                    if (
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpox
                                                        ) ==
                                                        parseFloat(
                                                            this.cavantable[is]
                                                        ).endpoy
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                `#row-` +
                                                                parseInt(
                                                                    k +
                                                                    alength
                                                                )
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML =
                                                            min[min.length - 1];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        this.cavantable[is].shi2.indexOf(j) > -1
                                    ) {
                                        // console.log('纵向分布在后');
                                    } else {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` + parseInt(k + alength)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            null;
                                    }
                                }
                            }
                        }
                    }
                } else if (
                    this.cavantable[is].ParameterReportItemtList.dd
                        .kzdirection == '横向扩展'
                ) {
                    if (
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzsummopos == '无' ||
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzsummopos == '分布在后' ||
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzsummopos == '分布在前'
                    ) {
                        if (
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在后' ||
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在前'
                        ) {
                            this.clow = this.cavantable[is].endpox;
                        } else {
                            this.clow = this.cavantable[is].endpox;
                        }
                        this.colh = this.cavantable[is].endpoy;
                        this.sad = 0;
                        this.ead = 0;

                        for (let i = 0; i < this.clow; i++) {
                            this.snum = parseInt(this.cavantable[is].nowy);
                            for (let j = 0; j < this.colh; j++) {
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        `#row-` + this.snum
                                    )[0]
                                ).find('.dataready')[this.sad].innerHTML = '';
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        `#row-` + this.snum
                                    )[0]
                                ).addClass('daochu');

                                $(
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.snum
                                        )[0]
                                    ).find('.dataready')[this.sad]
                                ).addClass('del');
                                this.snum++;
                            }

                            this.sad++;
                        }

                        for (let i = 0; i < this.cavantable[is].endpox; i++) {
                            this.enum = parseInt(this.cavantable[is].nowy);
                            for (let j = 0; j < this.colh; j++) {
                                this.an = i * this.colh + j;
                                if (
                                    parseInt(this.an) >=
                                    this.cavantable[is].nowdata.length
                                ) {
                                    this.cavantable[is].nowdata.push({
                                        value: null,
                                        modify: '辅助项',
                                    });
                                }
                                if (
                                    this.cavantable[is].nowdata[this.an]
                                        .value == 'null'
                                ) {
                                    this.cavantable[is].nowdata[this.an].value =
                                        '';
                                }
                                if (
                                    this.cavantable[is].nowdata[this.an]
                                        .modifyname == null
                                ) {
                                    let inp = document.createElement('input');

                                    if (
                                        this.cavantable[is].shi2.indexOf(
                                            this.enum
                                        ) > -1
                                    ) {
                                        // console.log('横向行数', this.enum);
                                    } else {
                                        this.cavantable[is].nowdata.splice(
                                            this.an,
                                            0,
                                            {
                                                value: null,
                                            }
                                        );
                                    }

                                    let xsnumber = '';
                                    let de = '';
                                    let itemformat = null;
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5[i1].id ==
                                            this.enum
                                        ) {
                                            xsnumber =
                                                this.cavantable[is].shi5[i1]
                                                    .xsnumber;
                                            de =
                                                this.cavantable[is].shi5[i1]
                                                    .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi6.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi6[i1].id ==
                                            this.enum
                                        ) {
                                            itemformat =
                                                this.cavantable[is].shi6[i1]
                                                    .itemformat;
                                            break;
                                        } else {
                                            itemformat = null;
                                        }
                                    }

                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null ||
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                if (
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].nowy
                                                            )
                                                        )[0]
                                                    ).find('input')[this.ead]
                                                        .value
                                                ) {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value = this.getPointNum(
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value,
                                                    xsnumber
                                                );
                                            }
                                        } else {
                                            inp.value = this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            );
                                        }
                                    } else {
                                        if (
                                            this.cavantable[is].nowdata[this.an]
                                                .value == null ||
                                            this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                if (
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].nowy
                                                            )
                                                        )[0]
                                                    ).find('input')[this.ead]
                                                        .value
                                                ) {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value;
                                            }
                                        } else {
                                            inp.value =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value;
                                        }
                                    }
                                    if (inp.value) {
                                        if (itemformat) {
                                            inp.value = this.dateFormat(
                                                itemformat,
                                                inp.value
                                            );
                                        }
                                    }
                                    if (
                                        typeof $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        )
                                            .find('.dataready')
                                            .attr('valign') !== 'undefined'
                                    ) {
                                        if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        '#row-' + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'bottom'
                                        ) {
                                            inp.style.bottom =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            '#row-' + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        } else if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        '#row-' + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'top'
                                        ) {
                                            inp.style.top =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            '#row-' + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        }
                                    }
                                    inp.style.width =
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        ).find('.dataready')[this.ead]
                                            .clientWidth + 'px';
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].width =
                                        inp.style.width;
                                    inp.style.backgroundColor = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.backgroundColor;
                                    inp.style.textDecoration = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.textDecoration;
                                    inp.style.fontFamily = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontFamily;
                                    inp.style.textAlign = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].align;
                                    inp.style.fontSize = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontSize;
                                    inp.style.color = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].style.color;
                                    inp.style.fontWeight = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontWeight;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    inp.id =
                                        this.cavantable[is].nowdata[this.an].id;
                                    inp.classList.add('inp');
                                    if (inp.id !== 'undefined') {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    } else {
                                        // if($($('#' + this.cavantable[is].Name).find( '#row-'+parseInt(this.cavantable[is].nowy))[0]).find('input')[this.ead].id == 'null'&&$($('#' + this.cavantable[is].Name).find( '#row-'+parseInt(this.cavantable[is].nowy))[0]).find('input')[this.ead]){
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    }
                                    if (
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        ).find('input')[0].id == 'null'
                                    ) {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    }
                                    // }
                                } else {
                                    let inp = document.createElement('input');
                                    if (
                                        this.cavantable[is].shi2.indexOf(
                                            this.enum
                                        ) > -1
                                    ) {
                                        // console.log('横向行数', this.enum);
                                    } else {
                                        this.cavantable[is].nowdata.splice(
                                            this.an,
                                            0,
                                            {
                                                value: null,
                                            }
                                        );
                                    }
                                    let xsnumber = '';
                                    let de = '';
                                    let itemformat = null;
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5.id ==
                                            this.enum
                                        ) {
                                            xsnumber =
                                                this.cavantable[is].shi5
                                                    .xsnumber;
                                            de =
                                                this.cavantable[is].shi5[i1]
                                                    .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi6.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi6.id ==
                                            this.enum
                                        ) {
                                            itemformat =
                                                this.cavantable[is].shi6
                                                    .itemformat;
                                            break;
                                        } else {
                                            itemformat = '';
                                        }
                                    }
                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null ||
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                if (
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].nowy
                                                            )
                                                        )[0]
                                                    ).find('input')[this.ead]
                                                        .value
                                                ) {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value = this.getPointNum(
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value,
                                                    xsnumber
                                                );
                                            }
                                        } else {
                                            inp.value = this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            );
                                        }
                                    } else {
                                        if (
                                            this.cavantable[is].nowdata[this.an]
                                                .value == null ||
                                            this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                if (
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            `#row-` +
                                                            parseInt(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].nowy
                                                            )
                                                        )[0]
                                                    ).find('input')[this.ead]
                                                        .value
                                                ) {
                                                    inp.value = de;
                                                }
                                            } else {
                                                inp.value =
                                                    this.cavantable[is].nowdata[
                                                        this.an
                                                    ].value;
                                            }
                                        } else {
                                            inp.value =
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value;
                                        }
                                    }
                                    if (inp.value) {
                                        if (itemformat) {
                                            inp.value = this.dateFormat(
                                                itemformat,
                                                inp.value
                                            );
                                        }
                                    }
                                    if (
                                        typeof $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        )
                                            .find('.dataready')
                                            .attr('valign') !== 'undefined'
                                    ) {
                                        if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        '#row-' + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'bottom'
                                        ) {
                                            inp.style.bottom =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            '#row-' + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        } else if (
                                            $(
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find(
                                                        '#row-' + this.enum
                                                    )[0]
                                                ).find('.dataready')[this.ead]
                                            ).attr('valign') == 'top'
                                        ) {
                                            inp.style.top =
                                                -(
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            '#row-' + this.enum
                                                        )[0]
                                                    ).find('.dataready')[
                                                        this.ead
                                                    ].clientHeight / 2
                                                ) + 'px';
                                        }
                                    }
                                    inp.style.width =
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        ).find('.dataready')[this.ead]
                                            .clientWidth + 'px';
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].width =
                                        inp.style.width;
                                    inp.style.backgroundColor = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.backgroundColor;
                                    inp.style.textDecoration = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.textDecoration;
                                    inp.style.fontFamily = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontFamily;
                                    inp.style.textAlign = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].align;
                                    inp.style.fontSize = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontSize;
                                    inp.style.color = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[this.ead].style.color;
                                    inp.style.fontWeight = $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    ).find('.dataready')[
                                        this.ead
                                    ].style.fontWeight;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    inp.id =
                                        this.cavantable[is].nowdata[this.an].id;
                                    inp.classList.add('inp');

                                    if (inp.id !== 'undefined') {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + this.enum)[0]
                                        )
                                            .find('.dataready')
                                        [this.ead].appendChild(inp);
                                    } else {
                                        // console.log($($('#' + this.cavantable[is].Name).find( '#row-'+parseInt(this.cavantable[is].nowy))[0]).find('input')[this.ead])
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    '#row-' +
                                                    parseInt(
                                                        this.cavantable[is]
                                                            .nowy
                                                    )
                                                )[0]
                                            ).find('input')[this.ead].id ==
                                            'null' &&
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find(
                                                    '#row-' +
                                                    parseInt(
                                                        this.cavantable[is]
                                                            .nowy
                                                    )
                                                )[0]
                                            ).find('input')[this.ead]
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find('#row-' + this.enum)[0]
                                            )
                                                .find('.dataready')
                                            [this.ead].appendChild(inp);
                                        }
                                        if (
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find('#row-' + this.enum)[0]
                                            ).find('input')[0].id == 'null'
                                        ) {
                                            $(
                                                $(
                                                    '#' +
                                                    this.cavantable[is].Name
                                                ).find('#row-' + this.enum)[0]
                                            )
                                                .find('.dataready')
                                            [this.ead].appendChild(inp);
                                        }
                                    }
                                }
                                this.enum++;
                            }
                            this.ead++;
                        }
                        if (
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在后' ||
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在前'
                        ) {
                            let sumdata =
                                this.cavantable[
                                    is
                                ].ParameterReportItemtList.dd.kzsummotype.split(
                                    ','
                                );
                            this.colw = this.cavantable[is].endpox;
                            let sumnum = $(
                                $('#' + this.cavantable[is].Name).find('tr')[
                                this.cavantable[is].ParameterReportItemtList
                                    .dd.startpoy
                                ]
                            ).find('.datareadyfoot').length;
                            console.log('3333333');
                            for (let j = 0; j < sumnum; j++) {
                                if (sumdata[j] == 'sum') {
                                    for (
                                        let vy = parseInt(
                                            this.cavantable[is].nowy
                                        );
                                        vy <
                                        this.colh +
                                        parseInt(this.cavantable[is].nowy);
                                        vy++
                                    ) {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function (item, index) {
                                            if (item.id == vy) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        let pdz = false;
                                        let sum = 0;

                                        for (let vx = 0; vx < this.colw; vx++) {
                                            if (aindex !== undefined) {
                                                if (
                                                    isNaN(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    ) &&
                                                    this.cavantable[is].shi5[
                                                        aindex
                                                    ].defauldisplay !==
                                                    $(
                                                        $(
                                                            '#' +
                                                            this
                                                                .cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            '#row-' + vy
                                                        )[0]
                                                    ).find('.inp')[vx].value
                                                ) {
                                                    pdz = true;
                                                }
                                            }
                                            if (
                                                !isNaN(
                                                    parseFloat(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    )
                                                ) &&
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find('#row-' + vy)[0]
                                                ).find('.inp')[vx].id !==
                                                'undefined'
                                            ) {
                                                //    console.log("sum",sum)
                                                //    console.log(   parseFloat(
                                                //             $(
                                                //                 $(
                                                //                     '#' +
                                                //                         this
                                                //                             .cavantable[
                                                //                             is
                                                //                         ].Name
                                                //                 ).find(
                                                //                     '#row-' + vy
                                                //                 )[0]
                                                //             ).find('.inp')[vx].value
                                                //         ))
                                                //         console.log(0.1+0.2)
                                                //         console.log(this.$math.format(this.$math.add(0.1,0.2)))
                                                console.log(this.$math);
                                                sum = this.$math.add(
                                                    this.$math.bignumber(sum),
                                                    this.$math.bignumber(
                                                        parseFloat(
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find('.inp')[vx]
                                                                .value
                                                        )
                                                    )
                                                );
                                            }
                                            if (
                                                this.cavantable[
                                                    is
                                                ].shi3.indexOf(vy) > -1
                                            ) {
                                                if (
                                                    vy !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .nowy
                                                    ) &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpoy
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpoy
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find('#row-' + vy)[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (result == true) {
                                                    // 判断时间日期是汇总项为空
                                                    if (pdz) {
                                                        if (
                                                            vy !==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].nowy
                                                            ) &&
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].startpoy
                                                            ) !==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].endpoy
                                                            )
                                                        ) {
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find(
                                                                '.datareadyfoot'
                                                            )[j].innerHTML =
                                                                '\\';
                                                        }
                                                    } else {
                                                        for (
                                                            let ii = 0;
                                                            ii <
                                                            this.cavantable[is]
                                                                .shi5.length;
                                                            ii++
                                                        ) {
                                                            if (
                                                                this.cavantable[
                                                                    is
                                                                ].shi5[ii].id ==
                                                                vy
                                                            ) {
                                                                sum =
                                                                    this.getPointNum(
                                                                        sum,
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ].shi5[
                                                                            ii
                                                                        ]
                                                                            .xsnumber
                                                                    );
                                                            }
                                                        }
                                                        if (
                                                            isNaN(sum) ||
                                                            sum == null
                                                        ) {
                                                            sum = 0;
                                                        }
                                                        if (
                                                            vy !==
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].nowy
                                                            )
                                                        ) {
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find(
                                                                '.datareadyfoot'
                                                            )[j].innerHTML =
                                                                sum;
                                                        }
                                                        if (
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].startpoy
                                                            ) ==
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].endpoy
                                                            )
                                                        ) {
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find(
                                                                '.datareadyfoot'
                                                            )[j].innerHTML =
                                                                sum;
                                                        }
                                                    }
                                                }

                                                if (
                                                    this.cavantable[
                                                        is
                                                    ].shi2.indexOf(vy) > -1
                                                ) {
                                                    // console.log('横向分布在后');
                                                } else {
                                                    if (
                                                        vy !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].nowy
                                                        ) &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpoy
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpoy
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = null;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (sumdata[j] == 'mean') {
                                    // console.log("sadsadsadasd")
                                    for (
                                        let vy = parseInt(
                                            this.cavantable[is].nowy
                                        );
                                        vy <
                                        this.colh +
                                        parseInt(this.cavantable[is].nowy);
                                        vy++
                                    ) {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function (item, index) {
                                            if (item.id == vy) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        let pdz = false;
                                        let sum = 0;

                                        var length = 0;
                                        for (let vx = 0; vx < this.colw; vx++) {
                                            if (aindex !== undefined) {
                                                if (
                                                    isNaN(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    ) &&
                                                    this.cavantable[is].shi5[
                                                        aindex
                                                    ].defauldisplay !==
                                                    $(
                                                        $(
                                                            '#' +
                                                            this
                                                                .cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            '#row-' + vy
                                                        )[0]
                                                    ).find('.inp')[vx].value
                                                ) {
                                                    pdz = true;
                                                }
                                            }
                                            if (
                                                !isNaN(
                                                    parseFloat(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    )
                                                ) &&
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find('#row-' + vy)[0]
                                                ).find('.inp')[vx].id !==
                                                'undefined'
                                            ) {
                                                length++;
                                                sum =
                                                    sum +
                                                    parseFloat(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    );
                                            }
                                            if (
                                                this.cavantable[
                                                    is
                                                ].shi3.indexOf(vy) > -1
                                            ) {
                                                if (
                                                    vy !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .nowy
                                                    ) &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpoy
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpoy
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find('#row-' + vy)[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (result == true) {
                                                    if (pdz) {
                                                        if (
                                                            vy !==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].nowy
                                                            ) &&
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].startpoy
                                                            ) !==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].endpoy
                                                            )
                                                        ) {
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find(
                                                                '.datareadyfoot'
                                                            )[j].innerHTML =
                                                                '\\';
                                                        }
                                                    } else {
                                                        let mean =
                                                            parseFloat(sum) /
                                                            length;
                                                        for (
                                                            let ii = 0;
                                                            ii <
                                                            this.cavantable[is]
                                                                .shi5.length;
                                                            ii++
                                                        ) {
                                                            if (
                                                                this.cavantable[
                                                                    is
                                                                ].shi5[ii].id ==
                                                                vy
                                                            ) {
                                                                mean =
                                                                    this.getPointNum(
                                                                        mean,
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ].shi5[
                                                                            ii
                                                                        ]
                                                                            .xsnumber
                                                                    );
                                                            }
                                                        }
                                                        if (
                                                            isNaN(mean) ||
                                                            mean == null
                                                        ) {
                                                            mean = 0;
                                                        }
                                                        if (
                                                            vy !==
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].nowy
                                                            )
                                                        ) {
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find(
                                                                '.datareadyfoot'
                                                            )[j].innerHTML =
                                                                mean;
                                                        }
                                                        if (
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].startpoy
                                                            ) ==
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].endpoy
                                                            )
                                                        ) {
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find(
                                                                '.datareadyfoot'
                                                            )[j].innerHTML =
                                                                mean;
                                                        }
                                                    }
                                                }

                                                if (
                                                    this.cavantable[
                                                        is
                                                    ].shi2.indexOf(vy) > -1
                                                ) {
                                                    // console.log('横向分布在后');
                                                } else {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find('#row-' + vy)[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = null;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (sumdata[j] == 'min') {
                                    for (
                                        let vy = parseInt(
                                            this.cavantable[is].nowy
                                        );
                                        vy <
                                        this.colh +
                                        parseInt(this.cavantable[is].nowy);
                                        vy++
                                    ) {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function (item, index) {
                                            if (item.id == vy) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        let pdz = false;
                                        let min = [];

                                        for (let vx = 0; vx < this.colw; vx++) {
                                            if (aindex !== undefined) {
                                                if (
                                                    isNaN(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    ) &&
                                                    this.cavantable[is].shi5[
                                                        aindex
                                                    ].defauldisplay !==
                                                    $(
                                                        $(
                                                            '#' +
                                                            this
                                                                .cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            '#row-' + vy
                                                        )[0]
                                                    ).find('.inp')[vx].value
                                                ) {
                                                    pdz = true;
                                                }
                                            }
                                            if (
                                                !isNaN(
                                                    parseFloat(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    )
                                                ) &&
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find('#row-' + vy)[0]
                                                ).find('.inp')[vx].id !==
                                                'undefined'
                                            ) {
                                                min.push(
                                                    parseFloat(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    )
                                                );
                                            }
                                            if (
                                                this.cavantable[
                                                    is
                                                ].shi3.indexOf(vy) > -1
                                            ) {
                                                if (
                                                    vy !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .nowy
                                                    ) &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpoy
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpoy
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find('#row-' + vy)[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                if (result == true) {
                                                    if (pdz) {
                                                        if (
                                                            vy !==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].nowy
                                                            ) &&
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].startpoy
                                                            ) !==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].endpoy
                                                            )
                                                        ) {
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find(
                                                                '.datareadyfoot'
                                                            )[j].innerHTML =
                                                                '\\';
                                                        }
                                                    } else {
                                                        min.sort(function (
                                                            a,
                                                            b
                                                        ) {
                                                            return a - b;
                                                        });
                                                        let mindata = min[0];
                                                        if (
                                                            mindata == undefined
                                                        ) {
                                                            if (
                                                                vy !==
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].nowy
                                                                ) &&
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].startpoy
                                                                ) !==
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].endpoy
                                                                )
                                                            ) {
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ]
                                                                            .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                        vy
                                                                    )[0]
                                                                ).find(
                                                                    '.datareadyfoot'
                                                                )[
                                                                    j
                                                                ].innerHTML = 0;
                                                            }
                                                        } else {
                                                            if (
                                                                vy !==
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].nowy
                                                                )
                                                            ) {
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ]
                                                                            .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                        vy
                                                                    )[0]
                                                                ).find(
                                                                    '.datareadyfoot'
                                                                )[j].innerHTML =
                                                                    mindata;
                                                            }
                                                            if (
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].startpoy
                                                                ) ==
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].endpoy
                                                                )
                                                            ) {
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ]
                                                                            .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                        vy
                                                                    )[0]
                                                                ).find(
                                                                    '.datareadyfoot'
                                                                )[j].innerHTML =
                                                                    mindata;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (
                                                    this.cavantable[
                                                        is
                                                    ].shi2.indexOf(vy) > -1
                                                ) {
                                                    // console.log('横向分布在后');
                                                } else {
                                                    if (
                                                        vy !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].nowy
                                                        ) &&
                                                        parseFloat(
                                                            this.cavantable[is]
                                                                .startpoy
                                                        ) !==
                                                        parseFloat(
                                                            this.cavantable[
                                                                is
                                                            ].endpoy
                                                        )
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = null;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (sumdata[j] == 'max') {
                                    for (
                                        let vy = parseInt(
                                            this.cavantable[is].nowy
                                        );
                                        vy <
                                        this.colh +
                                        parseInt(this.cavantable[is].nowy);
                                        vy++
                                    ) {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function (item, index) {
                                            if (item.id == vy) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        let pdz = false;
                                        let min = [];

                                        for (let vx = 0; vx < this.colw; vx++) {
                                            if (aindex !== undefined) {
                                                if (
                                                    isNaN(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    ) &&
                                                    this.cavantable[is].shi5[
                                                        aindex
                                                    ].defauldisplay !==
                                                    $(
                                                        $(
                                                            '#' +
                                                            this
                                                                .cavantable[
                                                                is
                                                            ].Name
                                                        ).find(
                                                            '#row-' + vy
                                                        )[0]
                                                    ).find('.inp')[vx].value
                                                ) {
                                                    pdz = true;
                                                }
                                            }
                                            if (
                                                !isNaN(
                                                    parseFloat(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    )
                                                ) &&
                                                $(
                                                    $(
                                                        '#' +
                                                        this.cavantable[is]
                                                            .Name
                                                    ).find('#row-' + vy)[0]
                                                ).find('.inp')[vx].id !==
                                                'undefined'
                                            ) {
                                                min.push(
                                                    parseFloat(
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find('.inp')[vx].value
                                                    )
                                                );
                                            }
                                            if (
                                                this.cavantable[
                                                    is
                                                ].shi3.indexOf(vy) > -1
                                            ) {
                                                if (
                                                    vy !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .nowy
                                                    ) &&
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .startpoy
                                                    ) !==
                                                    parseFloat(
                                                        this.cavantable[is]
                                                            .endpoy
                                                    )
                                                ) {
                                                    $(
                                                        $(
                                                            '#' +
                                                            this.cavantable[
                                                                is
                                                            ].Name
                                                        ).find('#row-' + vy)[0]
                                                    ).find('.datareadyfoot')[
                                                        j
                                                    ].innerHTML = '\\';
                                                }
                                            } else {
                                                let aindex;
                                                let result = this.cavantable[
                                                    is
                                                ].shi5.some(function (
                                                    item,
                                                    index
                                                ) {
                                                    if (item.id == vy) {
                                                        aindex = index;
                                                        return true;
                                                    }
                                                });
                                                if (result == true) {
                                                    if (pdz) {
                                                        if (
                                                            vy !==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].nowy
                                                            ) &&
                                                            parseFloat(
                                                                this.cavantable[
                                                                    is
                                                                ].startpoy
                                                            ) !==
                                                            parseFloat(
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].endpoy
                                                            )
                                                        ) {
                                                            $(
                                                                $(
                                                                    '#' +
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].Name
                                                                ).find(
                                                                    '#row-' + vy
                                                                )[0]
                                                            ).find(
                                                                '.datareadyfoot'
                                                            )[j].innerHTML =
                                                                '\\';
                                                        }
                                                    } else {
                                                        min.sort(function (
                                                            a,
                                                            b
                                                        ) {
                                                            return a - b;
                                                        });
                                                        let mindata =
                                                            min[min.length - 1];
                                                        if (
                                                            mindata == undefined
                                                        ) {
                                                            if (
                                                                vy !==
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].nowy
                                                                ) &&
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].startpoy
                                                                ) !==
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].endpoy
                                                                )
                                                            ) {
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ]
                                                                            .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                        vy
                                                                    )[0]
                                                                ).find(
                                                                    '.datareadyfoot'
                                                                )[
                                                                    j
                                                                ].innerHTML = 0;
                                                            }
                                                        } else {
                                                            if (
                                                                vy !==
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].nowy
                                                                )
                                                            ) {
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ]
                                                                            .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                        vy
                                                                    )[0]
                                                                ).find(
                                                                    '.datareadyfoot'
                                                                )[j].innerHTML =
                                                                    mindata;
                                                            }
                                                            if (
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].startpoy
                                                                ) ==
                                                                parseFloat(
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].endpoy
                                                                )
                                                            ) {
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ]
                                                                            .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                        vy
                                                                    )[0]
                                                                ).find(
                                                                    '.datareadyfoot'
                                                                )[j].innerHTML =
                                                                    mindata;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (
                                                    this.cavantable[
                                                        is
                                                    ].shi2.indexOf(vy) > -1
                                                ) {
                                                    // console.log('横向分布在后');
                                                } else {
                                                    // console.log("asddddd",$(
                                                    //     $(
                                                    //         '#' +
                                                    //             this.cavantable[
                                                    //                 is
                                                    //             ].Name
                                                    //     ).find('#row-' + vy)[0]
                                                    // ).find('.datareadyfoot')[
                                                    //     j
                                                    // ])
                                                    // console.log((  $(
                                                    //     $(
                                                    //         '#' +
                                                    //             this.cavantable[
                                                    //                 is
                                                    //             ].Name
                                                    //     ).find('#row-' + vy)[0]
                                                    // ).find('.datareadyfoot')[
                                                    //     j
                                                    // ]).text())
                                                    if (
                                                        !$(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML
                                                    ) {
                                                        $(
                                                            $(
                                                                '#' +
                                                                this
                                                                    .cavantable[
                                                                    is
                                                                ].Name
                                                            ).find(
                                                                '#row-' + vy
                                                            )[0]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[j].innerHTML = null;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (pdclone == 1) {
                    this.cavantable[is].daochutable = $(
                        '#' + this.cavantable[is].Name
                    )
                        .find('table')[0]
                        .cloneNode(true);
                }

                if (
                    this.cavantable[is].numpage > 1 &&
                    $('#' + this.cavantable[is].Name + 'page')[0]
                ) {
                    $('#' + this.cavantable[is].Name + 'page').show();
                    var endheight = 0;
                    for (
                        let h = 0;
                        h <
                        this.cavantable[is].ParameterReportItemtList.dd
                            .startpoy;
                        h++
                    ) {
                        endheight += parseFloat(
                            $(
                                $('#' + this.cavantable[is].Name).find(
                                    '#row-' + h
                                )
                            )[0].clientHeight
                        );
                    }
                    endheight += 1;

                    var endheight2 = 0;
                    for (
                        let h = 0;
                        h <
                        this.cavantable[is].ParameterReportItemtList.dd
                            .startpoy;
                        h++
                    ) {
                        endheight2 += parseFloat(
                            $(
                                $('#' + this.cavantable[is].Name).find(
                                    '#row-' + h
                                )
                            )[0].clientHeight
                        );
                    }
                    endheight2 += 1;
                    var aaa =
                        this.cavantable[
                            is
                        ].ParameterReportItemtList.dd.kzsummotype.split(',');
                    var bbb;
                    if (aaa[0] == '') {
                        bbb = 1;
                    } else {
                        bbb = aaa.length + 1;
                    }

                    if (
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzdirection == '纵向扩展'
                    ) {
                        if (
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在后'
                        ) {
                            let endwidth = 0;
                            for (
                                let j1 = 0;
                                j1 <
                                parseInt(
                                    this.cavantable[is].ParameterReportItemtList
                                        .dd.startpox
                                );
                                j1++
                            ) {
                                endwidth =
                                    endwidth +
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            'tr'
                                        )[
                                        this.cavantable[is]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                        ]
                                    ).find('td')[j1].clientWidth;
                            }
                            for (
                                let jj = 0;
                                jj <
                                $('#' + this.cavantable[is].Name).find(
                                    '.datareadyhead'
                                ).length;
                                jj++
                            ) {
                                endwidth =
                                    endwidth +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList
                                                    .dd.startpoy
                                            )
                                        ).find('.datareadyhead')[jj].clientWidth
                                    );
                            }
                            let nownum = parseInt(
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpoy
                            );

                            for (
                                let jj = 0;
                                jj < this.cavantable[is].endpoy + sumnum + 1;
                                jj++
                            ) {
                                endheight =
                                    endheight +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + nownum)
                                        )[0].clientHeight
                                    );

                                nownum++;
                            }
                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.top =
                                endheight +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Top
                                ) +
                                'px';
                            if (
                                endwidth -
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].clientWidth +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Left
                                ) <=
                                0
                            ) {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left = 0 + 'px';
                            } else {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left =
                                    endwidth -
                                    $(
                                        '#' + this.cavantable[is].Name + 'page'
                                    )[0].clientWidth +
                                    parseFloat(
                                        this.cavantable[is].PropertyList.Left
                                    ) +
                                    'px';
                            }
                        } else if (
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在前'
                        ) {
                            let endwidth = 0;
                            for (
                                let j1 = 0;
                                j1 <
                                parseInt(
                                    this.cavantable[is].ParameterReportItemtList
                                        .dd.startpox
                                );
                                j1++
                            ) {
                                endwidth =
                                    endwidth +
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            'tr'
                                        )[
                                        this.cavantable[is]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                        ]
                                    ).find('td')[j1].clientWidth;
                            }

                            for (
                                let jj = 0;
                                jj <
                                $('#' + this.cavantable[is].Name).find(
                                    '.datareadyhead'
                                ).length;
                                jj++
                            ) {
                                endwidth =
                                    endwidth +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList
                                                    .dd.startpoy
                                            )
                                        ).find('.datareadyhead')[jj].clientWidth
                                    );
                            }
                            let nownum = 0;

                            for (
                                let jj = 0;
                                jj < this.cavantable[is].endpoy + bbb;
                                jj++
                            ) {
                                endheight =
                                    endheight +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + nownum)
                                        )[0].clientHeight
                                    );

                                nownum++;
                            }
                            // if(this.cavantable[is].yh == 1){
                            //     endheight += 2*this.cavantable[is].endpoy;
                            //   this.cavantable[is].yh = 2;
                            // }

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.top =
                                endheight +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Top
                                ) +
                                'px';
                            if (
                                endwidth -
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].clientWidth +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Left
                                ) <=
                                0
                            ) {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left = 0 + 'px';
                            } else {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left =
                                    endwidth -
                                    $(
                                        '#' + this.cavantable[is].Name + 'page'
                                    )[0].clientWidth +
                                    parseFloat(
                                        this.cavantable[is].PropertyList.Left
                                    ) +
                                    'px';
                            }
                        } else {
                            let nownum = 0;
                            for (
                                let jj = 0;
                                jj < parseInt(this.cavantable[is].endpoy) + bbb;
                                jj++
                            ) {
                                endheight =
                                    endheight +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + nownum)
                                        )[0].clientHeight
                                    );

                                nownum++;
                            }
                            //   if(this.cavantable[is].yh == 1){
                            //     endheight += 2*this.cavantable[is].endpoy;
                            //   this.cavantable[is].yh = 2;
                            // }
                            var endwidth = 0;
                            for (
                                let j1 = 0;
                                j1 <
                                parseInt(
                                    this.cavantable[is].ParameterReportItemtList
                                        .dd.startpox
                                );
                                j1++
                            ) {
                                endwidth =
                                    endwidth +
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            'tr'
                                        )[
                                        this.cavantable[is]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                        ]
                                    ).find('td')[j1].clientWidth;
                            }

                            for (
                                let jj = 0;
                                jj <
                                $('#' + this.cavantable[is].Name).find(
                                    '.datareadyhead'
                                ).length;
                                jj++
                            ) {
                                endwidth =
                                    endwidth +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList
                                                    .dd.startpoy
                                            )
                                        ).find('.datareadyhead')[jj].clientWidth
                                    );
                            }
                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.top =
                                endheight +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Top
                                ) +
                                1 +
                                'px';
                            if (
                                endwidth -
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].clientWidth +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Left
                                ) <=
                                0
                            ) {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left = 0 + 'px';
                            } else {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left =
                                    endwidth -
                                    $(
                                        '#' + this.cavantable[is].Name + 'page'
                                    )[0].clientWidth +
                                    parseFloat(
                                        this.cavantable[is].PropertyList.Left
                                    ) +
                                    'px';
                            }
                        }
                    } else {
                        for (
                            let ii = 0;
                            ii <
                            $('#' + this.cavantable[is].Name)
                                .find('.datareadyhead')
                                .eq(0)
                                .parent()
                                .find('.dataready').length;
                            ii++
                        ) {
                            endwidth2 =
                                endwidth2 +
                                parseInt(
                                    $('#' + this.cavantable[is].Name)
                                        .find('.datareadyhead')
                                        .eq(0)
                                        .parent()
                                        .find('.dataready')[ii].clientWidth
                                );
                        }

                        for (
                            let ii = 0;
                            ii <
                            $('#' + this.cavantable[is].Name)
                                .find('.datareadyhead')
                                .eq(0)
                                .parent()
                                .find('.datareadyhead').length;
                            ii++
                        ) {
                            endwidth2 =
                                endwidth2 +
                                parseInt(
                                    $('#' + this.cavantable[is].Name)
                                        .find('.datareadyhead')
                                        .eq(0)
                                        .parent()
                                        .find('.datareadyhead')[ii].clientWidth
                                );
                        }

                        if (aaa[0] !== '') {
                            for (let ii = 0; ii < bbb - 1; ii++) {
                                endwidth2 =
                                    endwidth2 +
                                    parseInt(
                                        $('#' + this.cavantable[is].Name)
                                            .find('.datareadyhead')
                                            .eq(0)
                                            .parent()
                                            .find('.datareadyfoot')[ii]
                                            .clientWidth
                                    );
                            }
                        }
                        if (
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在后'
                        ) {
                            endwidth2 = 0;

                            endwidth2 =
                                endwidth2 +
                                parseInt(
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                            this.cavantable[is]
                                                .ParameterReportItemtList.dd
                                                .startpoy
                                        )
                                    ).find('.datareadyhead')[0].clientWidth
                                );
                            for (
                                let jj = 0;
                                jj < this.cavantable[is].endpox;
                                jj++
                            ) {
                                endwidth2 =
                                    endwidth2 +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList
                                                    .dd.startpoy
                                            )
                                        ).find('.dataready')[jj].clientWidth
                                    );
                            }
                            let sumnum = 0;
                            for (
                                let i3 = 0;
                                i3 <
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        'tr'
                                    )[
                                    this.cavantable[is]
                                        .ParameterReportItemtList.dd
                                        .startpoy
                                    ]
                                ).find('td').length;
                                i3++
                            ) {
                                if (
                                    $(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('tr')[
                                            this.cavantable[is]
                                                .ParameterReportItemtList.dd
                                                .startpoy
                                            ]
                                        ).find('td')[i3]
                                    ).hasClass('datareadyfoot')
                                ) {
                                    sumnum = sumnum + 1;
                                }
                            }

                            for (let jj = 0; jj < sumnum; jj++) {
                                endwidth2 =
                                    endwidth2 +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList
                                                    .dd.startpoy
                                            )
                                        ).find('.datareadyfoot')[jj].clientWidth
                                    );
                            }
                            if (
                                endwidth2 -
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].clientWidth +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Left
                                ) <=
                                0
                            ) {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left = 0 + 'px';
                            } else {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left =
                                    endwidth2 -
                                    $(
                                        '#' + this.cavantable[is].Name + 'page'
                                    )[0].clientWidth +
                                    parseFloat(
                                        this.cavantable[is].PropertyList.Left
                                    ) +
                                    'px';
                            }

                            let nownum = parseInt(
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpoy
                            );
                            // if(this.cavantable[is].yh == 1){
                            //     endheight += 3*this.cavantable[is].endpoy;
                            //   this.cavantable[is].yh = 2;
                            // }
                            for (
                                let jj = 0;
                                jj < this.cavantable[is].endpoy;
                                jj++
                            ) {
                                endheight2 =
                                    endheight2 +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + nownum)
                                        )[0].clientHeight
                                    );

                                nownum++;
                            }

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.top =
                                endheight2 +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Top
                                ) +
                                'px';
                        } else if (
                            this.cavantable[is].ParameterReportItemtList.dd
                                .kzsummopos == '分布在前'
                        ) {
                            endwidth2 = 0;

                            endwidth2 =
                                endwidth2 +
                                parseInt(
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                            this.cavantable[is]
                                                .ParameterReportItemtList.dd
                                                .startpoy
                                        )
                                    ).find('.datareadyhead')[0].clientWidth
                                );
                            for (
                                let jj = 0;
                                jj < this.cavantable[is].endpox;
                                jj++
                            ) {
                                endwidth2 =
                                    endwidth2 +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList
                                                    .dd.startpoy
                                            )
                                        ).find('.dataready')[jj].clientWidth
                                    );
                            }
                            let sumnum = 0;
                            for (
                                let i3 = 0;
                                i3 <
                                $(
                                    $('#' + this.cavantable[is].Name).find(
                                        'tr'
                                    )[
                                    this.cavantable[is]
                                        .ParameterReportItemtList.dd
                                        .startpoy
                                    ]
                                ).find('td').length;
                                i3++
                            ) {
                                if (
                                    $(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('tr')[
                                            this.cavantable[is]
                                                .ParameterReportItemtList.dd
                                                .startpoy
                                            ]
                                        ).find('td')[i3]
                                    ).hasClass('datareadyfoot')
                                ) {
                                    sumnum = sumnum + 1;
                                }
                            }

                            for (let jj = 0; jj < sumnum; jj++) {
                                endwidth2 =
                                    endwidth2 +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList
                                                    .dd.startpoy
                                            )
                                        ).find('.datareadyfoot')[jj].clientWidth
                                    );
                            }
                            if (
                                endwidth2 -
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].clientWidth +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Left
                                ) <=
                                0
                            ) {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left = 0 + 'px';
                            } else {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.left =
                                    endwidth2 -
                                    $(
                                        '#' + this.cavantable[is].Name + 'page'
                                    )[0].clientWidth +
                                    parseFloat(
                                        this.cavantable[is].PropertyList.Left
                                    ) +
                                    'px';
                            }

                            let nownum = parseInt(
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpoy
                            );
                            // if(this.cavantable[is].yh == 1){
                            //     endheight += 3*this.cavantable[is].endpoy;
                            //   this.cavantable[is].yh = 2;
                            // }
                            for (
                                let jj = 0;
                                jj < this.cavantable[is].endpoy;
                                jj++
                            ) {
                                endheight2 =
                                    endheight2 +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + nownum)
                                        )[0].clientHeight
                                    );

                                nownum++;
                            }
                            if ($('#' + this.cavantable[is].Name + 'page')[0]) {
                                $(
                                    '#' + this.cavantable[is].Name + 'page'
                                )[0].style.top =
                                    endheight2 +
                                    parseFloat(
                                        this.cavantable[is].PropertyList.Top
                                    ) +
                                    'px';
                            }
                        } else {
                            var endwidth2 = 0;
                            for (
                                let j1 = 0;
                                j1 <
                                parseInt(
                                    this.cavantable[is].ParameterReportItemtList
                                        .dd.startpox
                                );
                                j1++
                            ) {
                                endwidth2 =
                                    endwidth2 +
                                    $('#' + this.cavantable[is].Name).find(
                                        'td'
                                    )[j1].clientWidth;
                            }

                            endwidth2 =
                                endwidth2 +
                                parseInt(
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                            this.cavantable[is]
                                                .ParameterReportItemtList.dd
                                                .startpoy
                                        )
                                    ).find('.datareadyhead')[0].clientWidth
                                );
                            for (
                                let jj = 0;
                                jj < this.cavantable[is].endpox;
                                jj++
                            ) {
                                endwidth2 =
                                    endwidth2 +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList
                                                    .dd.startpoy
                                            )
                                        ).find('.dataready')[jj].clientWidth
                                    );
                            }
                            if ($('#' + this.cavantable[is].Name + 'page')[0]) {
                                if (
                                    endwidth2 -
                                    $(
                                        '#' +
                                        this.cavantable[is].Name +
                                        'page'
                                    )[0].clientWidth +
                                    parseFloat(
                                        this.cavantable[is].PropertyList
                                            .Left
                                    ) <=
                                    0
                                ) {
                                    $(
                                        '#' + this.cavantable[is].Name + 'page'
                                    )[0].style.left = 0 + 'px';
                                } else {
                                    $(
                                        '#' + this.cavantable[is].Name + 'page'
                                    )[0].style.left =
                                        endwidth2 -
                                        $(
                                            '#' +
                                            this.cavantable[is].Name +
                                            'page'
                                        )[0].clientWidth +
                                        parseFloat(
                                            this.cavantable[is].PropertyList
                                                .Left
                                        ) +
                                        'px';
                                }
                            }

                            let nownum = parseInt(
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpoy
                            );
                            for (
                                let jj = 0;
                                jj < this.cavantable[is].endpoy;
                                jj++
                            ) {
                                endheight2 =
                                    endheight2 +
                                    parseInt(
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find('#row-' + nownum)
                                        )[0].clientHeight
                                    );

                                nownum++;
                            }

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.top =
                                endheight2 +
                                parseFloat(
                                    this.cavantable[is].PropertyList.Top
                                ) +
                                'px';
                        }
                    }
                    for (let i = 0; i < this.cavantable.length; i++) {
                        var z = 0;
                        if (
                            parseInt(
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .startpoy
                            )
                        ) {
                            z = parseInt(
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .startpoy
                            );
                        } else {
                            z = 1;
                        }
                        let endxlength =
                            $(
                                $('#' + this.cavantable[i].Name).find('tr')[
                                z + 1
                                ]
                            ).find('td').length - 1;
                        let endylength =
                            $('#' + this.cavantable[i].Name).find('tr').length -
                            1;
                        var cp = [];
                        var sc =
                            this.cavantable[i].ParameterReportItemtList.dd
                                .cellparaarray.length;
                        for (let i1 = 0; i1 < sc; i1++) {
                            var c =
                                this.cavantable[
                                    i
                                ].ParameterReportItemtList.dd.cellparaarray[
                                    i1
                                ].id.split('-');
                            if (c[0] <= endxlength && c[1] <= endylength) {
                                cp.push(
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.cellparaarray[i1]
                                );
                            }
                        }
                        this.cavantable[
                            i
                        ].ParameterReportItemtList.dd.cellparaarray = cp;
                    }

                    let that = this;
                    $('#' + this.cavantable[is].Name + 'page').find(
                        '.last'
                    )[0].onclick = function () {
                        that.$store.state.report = false;
                        let reg1 = new RegExp('page', 'g');
                        let wantid = $(this)
                            .parent()
                            .parent()[0]
                            .id.replace(reg1, '');
                        for (let i = 0; i < that.cavantable.length; i++) {
                            if (that.cavantable[i].Name == wantid) {
                                if (
                                    $(
                                        '#' + $(this).parent().parent()[0].id
                                    ).find('.numinp')[0].value <
                                    that.cavantable[i].numpage &&
                                    !isNaN(
                                        $(
                                            '#' +
                                            $(this).parent().parent()[0].id
                                        ).find('.numinp')[0].value
                                    )
                                ) {
                                    if (
                                        $(
                                            '#' +
                                            $(this).parent().parent()[0].id
                                        ).find('.numinp')[0].value >= 1
                                    ) {
                                        let a = JSON.stringify(
                                            that.cavantable[i].data
                                        );
                                        let f = JSON.parse(a);
                                        $(
                                            '#' +
                                            $(this).parent().parent()[0].id
                                        ).find('.numinp')[0].value++;
                                        let b =
                                            $(
                                                '#' +
                                                $(this).parent().parent()[0]
                                                    .id
                                            ).find('.numinp')[0].value - 1;
                                        that.cavantable[i].nowdata = f.splice(
                                            b * that.cavantable[is].nowlength,
                                            that.cavantable[is].nowlength
                                        );
                                        that.setbodydata(2);
                                        // record();
                                        break;
                                    }
                                }
                            }
                        }
                    };
                    $('#' + this.cavantable[is].Name + 'page').find(
                        '.next'
                    )[0].onclick = function () {
                        that.$store.state.report = false;
                        let reg1 = new RegExp('page', 'g');
                        let wantid = $(this)
                            .parent()
                            .parent()[0]
                            .id.replace(reg1, '');
                        for (let i = 0; i < that.cavantable.length; i++) {
                            if (that.cavantable[i].Name == wantid) {
                                if (
                                    $(
                                        '#' + $(this).parent().parent()[0].id
                                    ).find('.numinp')[0].value > 1 &&
                                    !isNaN(
                                        $(
                                            '#' +
                                            $(this).parent().parent()[0].id
                                        ).find('.numinp')[0].value
                                    )
                                ) {
                                    if (
                                        $(
                                            '#' +
                                            $(this).parent().parent()[0].id
                                        ).find('.numinp')[0].value >= 1
                                    ) {
                                        let a = JSON.stringify(
                                            that.cavantable[i].data
                                        );
                                        let f = JSON.parse(a);
                                        $(
                                            '#' +
                                            $(this).parent().parent()[0].id
                                        ).find('.numinp')[0].value--;
                                        let b =
                                            $(
                                                '#' +
                                                $(this).parent().parent()[0]
                                                    .id
                                            ).find('.numinp')[0].value - 1;
                                        that.cavantable[i].nowdata = f.splice(
                                            b * that.cavantable[is].nowlength,
                                            that.cavantable[is].nowlength
                                        );
                                        that.setbodydata(2);
                                        // record();
                                        break;
                                    }
                                }
                            }
                        }
                    };
                    $('#' + this.cavantable[is].Name + 'page').find(
                        '.start'
                    )[0].onclick = function () {
                        that.$store.state.report = false;
                        let reg1 = new RegExp('page', 'g');
                        let wantid = $(this)
                            .parent()
                            .parent()[0]
                            .id.replace(reg1, '');
                        for (let i = 0; i < that.cavantable.length; i++) {
                            if (that.cavantable[i].Name == wantid) {
                                let a = JSON.stringify(that.cavantable[i].data);
                                let f = JSON.parse(a);
                                $('#' + $(this).parent().parent()[0].id).find(
                                    '.numinp'
                                )[0].value = 1;
                                let b =
                                    $(
                                        '#' + $(this).parent().parent()[0].id
                                    ).find('.numinp')[0].value - 1;
                                that.cavantable[i].nowdata = f.splice(
                                    b * that.cavantable[is].nowlength,
                                    that.cavantable[is].nowlength
                                );
                                that.setbodydata(2);
                                break;
                            }
                        }
                    };
                    $('#' + this.cavantable[is].Name + 'page').find(
                        '.end'
                    )[0].onclick = function () {
                        that.$store.state.report = false;
                        let reg1 = new RegExp('page', 'g');
                        let wantid = $(this)
                            .parent()
                            .parent()[0]
                            .id.replace(reg1, '');
                        for (let i = 0; i < that.cavantable.length; i++) {
                            if (that.cavantable[i].Name == wantid) {
                                let a = JSON.stringify(that.cavantable[i].data);
                                let f = JSON.parse(a);
                                $('#' + $(this).parent().parent()[0].id).find(
                                    '.numinp'
                                )[0].value = that.cavantable[i].numpage;
                                let b =
                                    $(
                                        '#' + $(this).parent().parent()[0].id
                                    ).find('.numinp')[0].value - 1;
                                that.cavantable[i].nowdata = f.splice(
                                    b * that.cavantable[is].nowlength,
                                    that.cavantable[is].nowlength
                                );
                                that.setbodydata(2);
                                break;
                            }
                        }
                    };
                    $('#' + this.cavantable[is].Name + 'page').find(
                        '.numinp'
                    )[0].onblur = function () {
                        let reg1 = new RegExp('page', 'g');
                        let wantid = $(this)
                            .parent()
                            .parent()
                            .parent()[0]
                            .id.replace(reg1, '');
                        console.log(wantid);
                        for (let i = 0; i < that.cavantable.length; i++) {
                            if (that.cavantable[i].Name == wantid) {
                                console.log('sadsaddsadas');
                                if (
                                    1 <=
                                    parseInt(
                                        $(
                                            '#' +
                                            that.cavantable[i].Name +
                                            'page'
                                        ).find('.numinp')[0].value
                                    ) <=
                                    that.cavantable[i].numpage
                                ) {
                                    console.log('sadsaddsadas');
                                    let a = JSON.stringify(
                                        that.cavantable[i].data
                                    );
                                    let f = JSON.parse(a);
                                    let b =
                                        $(
                                            '#' +
                                            that.cavantable[i].Name +
                                            'page'
                                        ).find('.numinp')[0].value - 1;

                                    that.cavantable[i].nowdata = f.splice(
                                        b * that.cavantable[is].nowlength,
                                        that.cavantable[is].nowlength
                                    );
                                    that.setbodydata(2);
                                    break;
                                }
                            }
                        }
                    };
                    document.onkeydown = function (e, event) {
                        var theEvent = window.event || e;
                        var code =
                            theEvent.keyCode ||
                            theEvent.which ||
                            theEvent.charCode;
                        if (code == 13) {
                            let wantid = '';
                            for (let i1 = 0; i1 < e.path.length; i1++) {
                                if ($(e.path[i1]).attr('class') == 'page2') {
                                    wantid = $(e.path[i1]).attr('id');
                                }
                            }
                            console.log(wantid);
                            for (let i = 0; i < that.cavantable.length; i++) {
                                if (
                                    that.cavantable[i].Name + 'page' ==
                                    wantid
                                ) {
                                    if (
                                        1 <=
                                        parseInt(
                                            $(
                                                '#' +
                                                that.cavantable[i]
                                                    .Name +
                                                'page'
                                            ).find('.numinp')[0].value
                                        ) &&
                                        parseInt(
                                            $(
                                                '#' +
                                                that.cavantable[i].Name +
                                                'page'
                                            ).find('.numinp')[0].value
                                        ) <= that.cavantable[i].numpage &&
                                        !isNaN(
                                            parseInt(
                                                $(
                                                    '#' +
                                                    that.cavantable[i]
                                                        .Name +
                                                    'page'
                                                ).find('.numinp')[0].value
                                            )
                                        )
                                    ) {
                                        console.log('asasdsaddsa111111');
                                        let a = JSON.stringify(
                                            that.cavantable[i].data
                                        );
                                        let f = JSON.parse(a);
                                        let b =
                                            $(
                                                '#' +
                                                that.cavantable[i].Name +
                                                'page'
                                            ).find('.numinp')[0].value - 1;

                                        that.cavantable[i].nowdata = f.splice(
                                            b * that.cavantable[is].nowlength,
                                            that.cavantable[is].nowlength
                                        );
                                        console.log(
                                            'asdasd11',
                                            that.cavantable[i]
                                        );
                                        that.setbodydata(2);
                                        break;
                                    }
                                }
                            }
                        }
                    };
                } else {
                    if (this.cavantable[is].numpage <= 1) {
                        $('#' + this.cavantable[is].Name + 'page').hide();
                    }
                }

                this.cavantable[is].nowdata = JSON.parse(daitidata);
                var that = this;
                $(
                    $('#' + this.cavantable[is].Name).find('.datareadyhead')
                ).click(function () {
                    that.$store.state.report = false;
                    let a = $(
                        '#' +
                        $(this)
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .parent()[0].id
                    ).find('.nowinput').length;
                    var tablename1 = $(this)
                        .parent()
                        .parent()
                        .parent()
                        .parent()
                        .parent()
                        .parent()[0].id;
                    for (let i1 = 0; i1 < a; i1++) {
                        $(
                            $(
                                '#' +
                                $(this)
                                    .parent()
                                    .parent()
                                    .parent()
                                    .parent()
                                    .parent()
                                    .parent()[0].id
                            ).find('.nowinput')[0]
                        ).removeClass('nowinput');
                    }
                    var kz;
                    for (let i = 0; i < that.cavantable.length; i++) {
                        if (that.cavantable[i].Name == tablename1) {
                            kz =
                                that.cavantable[i].ParameterReportItemtList.dd
                                    .kzdirection;
                        }
                    }
                    if (kz == '纵向扩展') {
                        for (
                            let i = 0;
                            i <
                            $($(this).parent()[0]).find('.datareadyhead')
                                .length;
                            i++
                        ) {
                            $(
                                $($(this).parent()[0]).find('.datareadyhead')[i]
                            ).addClass('nowinput');
                        }
                    } else if (kz == '横向扩展') {
                        for (
                            let i = 0;
                            i <
                            $($(this).parent().parent()[0]).find(
                                '.datareadyhead'
                            ).length;
                            i++
                        ) {
                            $(
                                $($(this).parent().parent()[0]).find(
                                    '.datareadyhead'
                                )[i]
                            ).addClass('nowinput');
                        }
                    }

                    var row;
                    var col;
                    var row1;
                    var col1;
                    for (let i = 0; i < that.cavantable.length; i++) {
                        if (tablename1 == that.cavantable[i].Name) {
                            row1 =
                                parseInt(
                                    that.cavantable[i].ParameterReportItemtList
                                        .dd.startpoy
                                ) - 1;
                            col1 =
                                parseInt(
                                    that.cavantable[i].ParameterReportItemtList
                                        .dd.startpox
                                ) - 1;
                            col =
                                parseInt($(this).parent()[0].id.split('-')[0]) -
                                parseInt(
                                    that.cavantable[i].ParameterReportItemtList
                                        .dd.startpox
                                ) +
                                1;
                            row =
                                parseInt($(this).parent()[0].id.split('-')[1]) -
                                parseInt(
                                    that.cavantable[i].ParameterReportItemtList
                                        .dd.startpoy
                                ) +
                                1;
                        }
                    }
                    var EventScriptList = that.data.Data.EventScriptList;
                    var EventType = [];
                    var Typearr = [];
                    for (var i1 = 0; i1 < EventScriptList.length; i1++) {
                        if (
                            tablename1 == EventScriptList[i1].ElementName &&
                            EventScriptList[i1].EventType ==
                            'MouseLeftButtonDown'
                        ) {
                            EventType.push(EventScriptList[i1]);
                        }
                    }
                    if (EventType.length) {
                        for (var j = 0; j < EventType.length; j++) {
                            Typearr.push(EventType[j].Script);
                        }
                    }
                    var endtable = [];
                    var T = that.scriptFun(Typearr);
                    for (let a2 = 0; a2 < Typearr.length; a2++) {
                        let o1 = {};
                        let o2 = [];
                        o1.ScriptContent = Typearr[a2];
                        for (let a3 = 0; a3 < T[a2].length; a3++) {
                            let o3 = {};
                            if (T[a2][a3] == 'etSelectCellReportName(') {
                                o3.Controls = 'Report';
                                o3.Property = 'GetSelectCellReportName';
                                o3.Value = tablename1;
                                o2.push(o3);
                            } else if (T[a2][a3] == 'etSelectCellRow(') {
                                o3.Controls = 'Report';
                                o3.Property = 'GetSelectCellRow';
                                o3.Value = row;
                                o2.push(o3);
                            } else if (T[a2][a3] == 'etSelectCellColumn(') {
                                o3.Controls = 'Report';
                                o3.Property = 'GetSelectCellColumn';
                                o3.Value = col;
                                o2.push(o3);
                            } else if (T[a2][a3] == 'etSelectCellValue(') {
                                o3.Controls = 'Report';
                                o3.Property = 'GetSelectCellColumn';
                                o3.Value = $(this).val();
                                o2.push(o3);
                            } else if (T[a2][a3].indexOf('etCell(') > -1) {
                                let t1 = T[a2][a3].split(',');
                                let t2 =
                                    parseInt(
                                        parseInt(
                                            t1[1]
                                                .replace('"', '')
                                                .replace('"', '')
                                        )
                                    ) + col1;
                                let t3 =
                                    parseInt(
                                        parseInt(
                                            t1[2]
                                                .replace('"', '')
                                                .replace('"', '')
                                        )
                                    ) + row1;
                                o3.Controls = tablename1;
                                o3.Property =
                                    'GetCell:' +
                                    t1[1].replace('"', '').replace('"', '') +
                                    ',' +
                                    t1[2].replace('"', '').replace('"', '');
                                if (t3 >= row1 + 1 && t2 >= col1 + 1) {
                                    if (
                                        $(
                                            $('#' + tablename1).find(
                                                '#' + t3 + '-' + t2
                                            )[0]
                                        ).find('input')[0]
                                    ) {
                                        o3.Value = $(
                                            $(
                                                $('#' + tablename1).find(
                                                    '#' + t3 + '-' + t2
                                                )[0]
                                            ).find('input')[0]
                                        ).val();
                                    } else if (
                                        $(
                                            $('#' + tablename1).find(
                                                '#' + t3 + '-' + t2
                                            )[0]
                                        ).hasClass('datareadyhead')
                                    ) {
                                        o3.Value = $(
                                            $('#' + tablename1).find(
                                                '#' + t3 + '-' + t2
                                            )[0]
                                        ).text();
                                    }
                                }
                                o2.push(o3);
                            }
                        }
                        o1.WebProperty = o2;
                        endtable.push(o1);
                    }
                    that.$axios({
                        method: 'post',
                        url: '/api/HMI/HMI_ExecuteScript',
                        data: endtable,
                    }).then((res) => {
                        if (res.data.code == 0 && res.data.data) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].Property == 'Refresh') {
                                    for (
                                        let j = 0;
                                        j < that.cavantable.length;
                                        j++
                                    ) {
                                        if (
                                            that.cavantable[j].Name ==
                                            res.data.data[i].Control
                                        )
                                            var a5 = {
                                                class: that.cavantable[j]
                                                    .ParameterReportItemtList.dd
                                                    .cfkongjian,
                                            };
                                        let a = $('#' + tablename1).find(
                                            '.nowinput'
                                        ).length;

                                        for (let i1 = 0; i1 < a; i1++) {
                                            $(
                                                $('#' + tablename1).find(
                                                    '.nowinput'
                                                )[0]
                                            ).removeClass('nowinput');
                                        }
                                        that.search(a5);
                                    }
                                }
                            }
                        }
                    });
                });
                $($('#' + this.cavantable[is].Name).find('input')).click(
                    function () {
                        that.$store.state.report = false;
                        let a = $(
                            '#' +
                            $(this)
                                .parent()
                                .parent()
                                .parent()
                                .parent()
                                .parent()
                                .parent()
                                .parent()[0].id
                        ).find('.nowinput').length;
                        var tablename1 = $(this)
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .parent()
                            .parent()[0].id;
                        for (let i1 = 0; i1 < a; i1++) {
                            $(
                                $(
                                    '#' +
                                    $(this)
                                        .parent()
                                        .parent()
                                        .parent()
                                        .parent()
                                        .parent()
                                        .parent()
                                        .parent()[0].id
                                ).find('.nowinput')[0]
                            ).removeClass('nowinput');
                        }
                        var kz;
                        for (let i = 0; i < that.cavantable.length; i++) {
                            if (that.cavantable[i].Name == tablename1) {
                                kz =
                                    that.cavantable[i].ParameterReportItemtList
                                        .dd.kzdirection;
                            }
                        }
                        if (kz == '纵向扩展') {
                            for (
                                let i = 0;
                                i <
                                $($(this).parent().parent()[0]).find('input')
                                    .length;
                                i++
                            ) {
                                $(
                                    $($(this).parent().parent()[0]).find(
                                        'input'
                                    )[i]
                                ).addClass('nowinput');
                            }
                        } else if (kz == '横向扩展') {
                            var id = parseInt(
                                $($(this).parent()[0]).attr('id').split('-')[0]
                            );

                            for (
                                let i = 0;
                                i <
                                $($('#' + tablename1)[0]).find('.dataready')
                                    .length;
                                i++
                            ) {
                                if (
                                    parseInt(
                                        $(
                                            $($('#' + tablename1)[0]).find(
                                                '.dataready'
                                            )[i]
                                        )
                                            .attr('id')
                                            .split('-')[0]
                                    ) == id
                                ) {
                                    $(
                                        $(
                                            $($('#' + tablename1)[0]).find(
                                                '.dataready'
                                            )[i]
                                        ).find('input')[0]
                                    ).addClass('nowinput');
                                    $(
                                        $($('#' + tablename1)[0]).find(
                                            '.dataready'
                                        )[i]
                                    ).addClass('nowinput');
                                }
                            }
                        }

                        var row;
                        var col;
                        var row1;
                        var col1;
                        for (let i = 0; i < that.cavantable.length; i++) {
                            if (tablename1 == that.cavantable[i].Name) {
                                row1 =
                                    parseInt(
                                        that.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    ) - 1;
                                col1 =
                                    parseInt(
                                        that.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .startpox
                                    ) - 1;
                                col =
                                    parseInt(
                                        $(this).parent()[0].id.split('-')[0]
                                    ) -
                                    parseInt(
                                        that.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .startpox
                                    ) +
                                    1;
                                row =
                                    parseInt(
                                        $(this).parent()[0].id.split('-')[1]
                                    ) -
                                    parseInt(
                                        that.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    ) +
                                    1;
                            }
                        }

                        var EventScriptList = that.data.Data.EventScriptList;
                        var EventType = [];
                        var Typearr = [];
                        for (var i1 = 0; i1 < EventScriptList.length; i1++) {
                            if (
                                tablename1 == EventScriptList[i1].ElementName &&
                                EventScriptList[i1].EventType ==
                                'MouseLeftButtonDown'
                            ) {
                                EventType.push(EventScriptList[i1]);
                            }
                        }
                        if (EventType.length) {
                            for (var j = 0; j < EventType.length; j++) {
                                Typearr.push(EventType[j].Script);
                            }
                        }
                        var endtable = [];
                        var T = that.scriptFun(Typearr);
                        for (let a2 = 0; a2 < Typearr.length; a2++) {
                            let o1 = {};
                            let o2 = [];
                            o1.ScriptContent = Typearr[a2];
                            for (let a3 = 0; a3 < T[a2].length; a3++) {
                                let o3 = {};
                                if (T[a2][a3] == 'etSelectCellReportName(') {
                                    o3.Controls = 'Report';
                                    o3.Property = 'GetSelectCellReportName';
                                    o3.Value = tablename1;
                                    o2.push(o3);
                                } else if (T[a2][a3] == 'etSelectCellRow(') {
                                    o3.Controls = 'Report';
                                    o3.Property = 'GetSelectCellRow';
                                    o3.Value = row;
                                    o2.push(o3);
                                } else if (T[a2][a3] == 'etSelectCellColumn(') {
                                    o3.Controls = 'Report';
                                    o3.Property = 'GetSelectCellColumn';
                                    o3.Value = col;
                                    o2.push(o3);
                                } else if (T[a2][a3] == 'etSelectCellValue(') {
                                    o3.Controls = 'Report';
                                    o3.Property = 'GetSelectCellColumn';
                                    o3.Value = $(this).val();
                                    o2.push(o3);
                                } else if (T[a2][a3].indexOf('etCell(') > -1) {
                                    let t1 = T[a2][a3].split(',');
                                    let t2 =
                                        parseInt(
                                            parseInt(
                                                t1[1]
                                                    .replace('"', '')
                                                    .replace('"', '')
                                            )
                                        ) + col1;
                                    let t3 =
                                        parseInt(
                                            parseInt(
                                                t1[2]
                                                    .replace('"', '')
                                                    .replace('"', '')
                                            )
                                        ) + row1;
                                    o3.Controls = tablename1;
                                    o3.Property =
                                        'GetCell:' +
                                        t1[1]
                                            .replace('"', '')
                                            .replace('"', '') +
                                        ',' +
                                        t1[2].replace('"', '').replace('"', '');
                                    if (t3 >= row1 + 1 && t2 >= col1 + 1) {
                                        if (
                                            $(
                                                $('#' + tablename1).find(
                                                    '#' + t3 + '-' + t2
                                                )[0]
                                            ).find('input')[0]
                                        ) {
                                            o3.Value = $(
                                                $(
                                                    $('#' + tablename1).find(
                                                        '#' + t3 + '-' + t2
                                                    )[0]
                                                ).find('input')[0]
                                            ).val();
                                        } else if (
                                            $(
                                                $('#' + tablename1).find(
                                                    '#' + t3 + '-' + t2
                                                )[0]
                                            ).hasClass('datareadyhead')
                                        ) {
                                            o3.Value = $(
                                                $('#' + tablename1).find(
                                                    '#' + t3 + '-' + t2
                                                )[0]
                                            ).text();
                                        }
                                    }
                                    o2.push(o3);
                                }
                            }
                            o1.WebProperty = o2;
                            endtable.push(o1);
                        }
                        that.$axios({
                            method: 'post',
                            url: '/api/HMI/HMI_ExecuteScript',
                            data: endtable,
                        }).then((res) => {
                            if (res.data.code == 0 && res.data.data) {
                                for (let i = 0; i < res.data.data.length; i++) {
                                    if (
                                        res.data.data[i].Property == 'Refresh'
                                    ) {
                                        for (
                                            let j = 0;
                                            j < that.cavantable.length;
                                            j++
                                        ) {
                                            if (
                                                that.cavantable[j].Name ==
                                                res.data.data[i].Control
                                            )
                                                var a5 = {
                                                    class: that.cavantable[j]
                                                        .ParameterReportItemtList
                                                        .dd.cfkongjian,
                                                };

                                            that.search(a5);
                                        }
                                    }
                                }
                            }
                        });
                    }
                );
            }
        },
        // 脚本转化
        scriptFun(Typearr) {
            var T = [];
            for (let o = 0; o < Typearr.length; o++) {
                var str = Typearr[o];
                var reg = /[G]+([^G]+?)(?=[)]+|$)/g;
                var res;
                var data = [];
                //获取GetProperty下的（）内容，由于有【和转义符号会报错分开筛选
                while ((res = reg.exec(str)) != null) {
                    data.push(res[1]);
                }
                var ziarr = [];
                var isShow = true;
                //该脚本画面属性有下拉，文本输入，时间的下发事件
                if (data.length) {
                    for (let j = 0; j < data.length; j++) {
                        var reg1 = /GetSelectCellReportName\(/g;
                        var reg2 = /\\/g;
                        var reg3 = /"\)/g;
                        var vaee;
                        vaee = data[j].replace(reg1, '');
                        vaee = vaee.replace(reg2, '');
                        vaee = vaee.replace(reg3, '');
                        ziarr.push(vaee); //用正则取出控件名和类型
                    }
                }
                T.push(ziarr);
            }

            return T;
        },
        getDate() {
            var myDate = new Date();
            //获取当前年
            var year = myDate.getFullYear();
            //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month;
            //获取当前日
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date;
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h;
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m;
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s;
            // "2019-07-15 10:00:00"
            //获取当前时间
            var now =
                year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se;
            return now;
        },
        first() {
            var wantnum;
            var end = {};
            setTimeout(() => {
                for (let i = 0; i < this.cavantable.length; i++) {
                    var z = 0;
                    if (
                        parseInt(
                            this.cavantable[i].ParameterReportItemtList.dd
                                .startpoy
                        )
                    ) {
                        z = parseInt(
                            this.cavantable[i].ParameterReportItemtList.dd
                                .startpoy
                        );
                    } else {
                        z = 1;
                    }
                    let endxlength =
                        $(
                            $('#' + this.cavantable[i].Name).find('tr')[z + 1]
                        ).find('td').length - 1;
                    let endylength =
                        $('#' + this.cavantable[i].Name).find('tr').length - 1;
                    var cp = [];
                    var sc =
                        this.cavantable[i].ParameterReportItemtList.dd
                            .cellparaarray.length;
                    for (let i1 = 0; i1 < sc; i1++) {
                        var c =
                            this.cavantable[
                                i
                            ].ParameterReportItemtList.dd.cellparaarray[
                                i1
                            ].id.split('-');
                        if (c[0] <= endxlength && c[1] <= endylength) {
                            cp.push(
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .cellparaarray[i1]
                            );
                        }
                    }
                    this.cavantable[
                        i
                    ].ParameterReportItemtList.dd.cellparaarray = cp;
                }
                for (let i = 0; i < this.cavantable.length; i++) {
                    let aid = [];
                    for (
                        let i3 = 0;
                        i3 <
                        this.cavantable[i].ParameterReportItemtList.dd
                            .kzresourcedataitemarray.length;
                        i3++
                    ) {
                        if (
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray[i3].itemdata !== null
                        ) {
                            aid.push(
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[i3]
                            );
                        }
                    }
                    this.cavantable[
                        i
                    ].ParameterReportItemtList.dd.kzresourcedataitemarray = aid;

                    let cv = JSON.stringify(
                        this.cavantable[i].ParameterReportItemtList.dd
                    );
                    let wantdata = JSON.parse(cv);

                    wantnum =
                        this.cavantable[i].ParameterReportItemtList.dd
                            .cellparaarray;
                    this.cavantable[i].sju = this.cavantable[
                        i
                    ].ParameterReportItemtList.dd.cellparaarray.filter(
                        (item) => {
                            if (item.itemtype == '辅助项') {
                                return item;
                            }
                        }
                    );
                    wantnum = wantnum.filter((item) => {
                        if (item.itemtype !== '辅助项') {
                            return item;
                        }
                    });

                    end = {};
                    end.kzresource = wantdata.kzresource;
                    end.kzresourceid = wantdata.kzresourceid;
                    end.kztimewd = wantdata.kztimewd;
                    end.kzbanciwd = wantdata.kzbanciwd;

                    end.kzresourcedataitemarray =
                        wantdata.kzresourcedataitemarray;
                    end.starttime = $($('.' + wantdata.startkongjian)[0])
                        .find('input')
                        .val();

                    end.endtime = $($('.' + wantdata.endkongjian)[0])
                        .find('input')
                        .val();
                    end.argwaibuparalist = wantdata.kopngjianarray;

                    if (end.argwaibuparalist.length !== 0) {
                        for (let j = 0; j < end.argwaibuparalist.length; j++) {
                            if (end.argwaibuparalist[j].kjtype == '时间') {
                                end.argwaibuparalist[j].starttime = $(
                                    $('.' + end.argwaibuparalist[j].kjstart)[0]
                                )
                                    .find('input')
                                    .val();

                                end.argwaibuparalist[j].endtime = $(
                                    $('.' + end.argwaibuparalist[j].kjend)[0]
                                )
                                    .find('input')
                                    .val();
                            } else if (
                                end.argwaibuparalist[j].kjtype == '文本'
                            ) {
                                if (
                                    $(
                                        $(
                                            '.' + end.argwaibuparalist[j].kjtext
                                        )[0]
                                    ).hasClass('精确匹配')
                                ) {
                                    end.argwaibuparalist[j].matchtype =
                                        '精确匹配';
                                } else if (
                                    $(
                                        $(
                                            '.' + end.argwaibuparalist[j].kjtext
                                        )[0]
                                    ).hasClass == '模糊匹配'
                                ) {
                                    end.argwaibuparalist[j].matchtype =
                                        '模糊匹配';
                                }
                                end.argwaibuparalist[j].wenbentext = $(
                                    $('.' + end.argwaibuparalist[j].kjtext)[0]
                                )
                                    .find('input')
                                    .val();
                            }
                            end.argwaibuparalist[j].waibuitemtype =
                                end.argwaibuparalist[j].kjtype;
                            end.argwaibuparalist[j].shuzhitext =
                                end.argwaibuparalist[j].kjnum;
                            end.argwaibuparalist[j].itemtimekey =
                                end.argwaibuparalist[j].kjitem;
                            end.argwaibuparalist[j].itemwenbenkey =
                                end.argwaibuparalist[j].kjitem;
                            end.argwaibuparalist[j].itemshuzhikey =
                                end.argwaibuparalist[j].kjitem;
                        }
                    } else {
                        end.starttime = $($('.' + wantdata.startkongjian)[0])
                            .find('input')
                            .val();

                        end.endtime = $($('.' + wantdata.endkongjian)[0])
                            .find('input')
                            .val();
                    }
                    let onenum = wantnum.filter((item) => {
                        if (item.resource == '历史归档') {
                            return item;
                        }
                    });
                    let twonum = wantnum.filter((item) => {
                        if (item.resource == '统计归档') {
                            return item;
                        }
                    });
                    let threenum = wantnum.filter((item) => {
                        if (item.resource == '外部数据源') {
                            return item;
                        }
                    });

                    if (onenum.length !== 0) {
                        let one = {};
                        one.starttime = $($('.' + wantdata.startkongjian)[0])
                            .find('input')
                            .val();
                        one.endtime = $($('.' + wantdata.endkongjian)[0])
                            .find('input')
                            .val();
                        one.cellresource = '历史归档';
                        one.paradata = end;
                        one.cellparalist = onenum;

                        this.$axios({
                            method: 'post',
                            url: `/api/ParameterReport/SearchItemData`,
                            data: one,
                        }).then((res) => {
                            if (
                                res.data.data == '无数据' ||
                                res.data.data == '[]'
                            ) {
                                for (
                                    let a2 = 0;
                                    a2 < one.cellparalist.length;
                                    a2++
                                ) {
                                    if (
                                        one.cellparalist[a2].defauldisplay !==
                                        null
                                    ) {
                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + one.cellparalist[a2].id
                                        )[0].innerHTML = this.getPointNum(
                                            one.cellparalist[a2].defauldisplay,
                                            parseInt(
                                                one.cellparalist[a2].xsnumber
                                            )
                                        );
                                    }
                                }
                            } else {
                                let a = JSON.parse(res.data.data);
                                for (
                                    let a2 = 0;
                                    a2 < one.cellparalist.length;
                                    a2++
                                ) {
                                    for (let a1 = 0; a1 < a.length; a1++) {
                                        if (
                                            one.cellparalist[a2].itemdata ==
                                            a[a1].name &&
                                            one.cellparalist[a2].sumtype ==
                                            a[a1].sumtype &&
                                            one.cellparalist[a2].itemdata
                                        ) {
                                            if (!a[a1].value) {
                                                $(
                                                    '#' +
                                                    this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                    one.cellparalist[a2].id
                                                )[0].innerHTML = this.getPointNum(
                                                    one.cellparalist[a2]
                                                        .defauldisplay,
                                                    parseInt(
                                                        one.cellparalist[a2]
                                                            .xsnumber
                                                    )
                                                );
                                            } else {
                                                $(
                                                    '#' +
                                                    this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                    one.cellparalist[a2].id
                                                )[0].innerHTML = this.getPointNum(
                                                    a[a1].value,
                                                    parseInt(
                                                        one.cellparalist[a2]
                                                            .xsnumber
                                                    )
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }

                    if (twonum.length !== 0) {
                        let acc = this.dealWithData(twonum);
                        let wantarr = [];
                        let nn = [];
                        for (let i3 = 0; i3 < acc.length; i3++) {
                            nn.push(this.dealWithData2(acc[i3].allData));
                        }
                        for (let i31 = 0; i31 < nn.length; i31++) {
                            for (let i32 = 0; i32 < nn[i31].length; i32++) {
                                wantarr.push(nn[i31][i32].allData);
                            }
                        }
                        for (let cc = 0; cc < wantarr.length; cc++) {
                            let one = {};

                            one.starttime = $(
                                $('.' + wantdata.startkongjian)[0]
                            )
                                .find('input')
                                .val();
                            one.endtime = $($('.' + wantdata.endkongjian)[0])
                                .find('input')
                                .val();
                            one.cellresource = '统计归档';
                            one.paradata = end;
                            one.cellparalist = wantarr[cc];
                            console.log('统计', one);
                            this.$axios({
                                method: 'post',
                                url: `/api/ParameterReport/SearchItemData`,
                                data: one,
                            }).then((res) => {
                                if (
                                    res.data.data == '无数据' ||
                                    res.data.data == '[]'
                                ) {
                                    console.log('无数据');
                                    for (
                                        let a2 = 0;
                                        a2 < one.cellparalist.length;
                                        a2++
                                    ) {
                                        if (
                                            one.cellparalist[a2]
                                                .defauldisplay !== null
                                        ) {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                parseInt(
                                                    one.cellparalist[a2]
                                                        .xsnumber
                                                )
                                            );
                                        }
                                    }
                                } else {
                                    let a = JSON.parse(res.data.data);

                                    for (
                                        let a2 = 0;
                                        a2 < one.cellparalist.length;
                                        a2++
                                    ) {
                                        for (let a1 = 0; a1 < a.length; a1++) {
                                            if (
                                                one.cellparalist[a2].itemdata ==
                                                a[a1].name &&
                                                one.cellparalist[a2].sumtype ==
                                                a[a1].sumtype &&
                                                one.cellparalist[a2].itemdata
                                            ) {
                                                if (a[a1].value == null) {
                                                    $(
                                                        '#' +
                                                        this.cavantable[i]
                                                            .Name
                                                    ).find(
                                                        '#' +
                                                        one.cellparalist[a2]
                                                            .id
                                                    )[0].innerHTML = this.getPointNum(
                                                        one.cellparalist[a2]
                                                            .defauldisplay,
                                                        parseInt(
                                                            one.cellparalist[a2]
                                                                .xsnumber
                                                        )
                                                    );
                                                } else {
                                                    $(
                                                        '#' +
                                                        this.cavantable[i]
                                                            .Name
                                                    ).find(
                                                        '#' +
                                                        one.cellparalist[a2]
                                                            .id
                                                    )[0].innerHTML = this.getPointNum(
                                                        a[a1].value,
                                                        parseInt(
                                                            one.cellparalist[a2]
                                                                .xsnumber
                                                        )
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                    if (threenum.length !== 0) {
                        let wantarr = [];
                        for (
                            let i3 = 0;
                            i3 < this.dealWithData3(threenum).length;
                            i3++
                        ) {
                            wantarr.push(
                                this.dealWithData3(threenum)[i3].allData
                            );
                        }
                        for (let cc = 0; cc < wantarr.length; cc++) {
                            let one = {};
                            one.cellresource = '外部数据源';
                            one.cellparalist = wantarr[cc];
                            one.waibuparalist = end.argwaibuparalist;
                            console.log('外部', one);
                            this.$axios({
                                method: 'post',
                                url: `/api/ParameterReport/SearchItemData`,
                                data: one,
                            }).then((res) => {
                                console.log('外部', res);
                                //   console.log(JSON.parse(res.data.data))
                                if (
                                    res.data.data == '无数据' ||
                                    res.data.data == '[]'
                                ) {
                                    console.log('无数据');
                                    for (
                                        let a2 = 0;
                                        a2 < one.cellparalist.length;
                                        a2++
                                    ) {
                                        if (
                                            one.cellparalist[a2]
                                                .defauldisplay !== null
                                        ) {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                parseInt(
                                                    one.cellparalist[a2]
                                                        .xsnumber
                                                )
                                            );
                                        }
                                    }
                                } else {
                                    let a = JSON.parse(res.data.data);
                                    console.log('外部数据', a);
                                    for (
                                        let a2 = 0;
                                        a2 < one.cellparalist.length;
                                        a2++
                                    ) {
                                        for (let a1 = 0; a1 < a.length; a1++) {
                                            if (
                                                one.cellparalist[a2].itemdata ==
                                                a[a1].name &&
                                                one.cellparalist[a2].sumtype ==
                                                a[a1].sumtype &&
                                                one.cellparalist[a2].itemdata
                                            ) {
                                                if (a[a1].value == null) {
                                                    $(
                                                        '#' +
                                                        this.cavantable[i]
                                                            .Name
                                                    ).find(
                                                        '#' +
                                                        one.cellparalist[a2]
                                                            .id
                                                    )[0].innerHTML = this.getPointNum(
                                                        one.cellparalist[a2]
                                                            .defauldisplay,
                                                        parseInt(
                                                            one.cellparalist[a2]
                                                                .xsnumber
                                                        )
                                                    );
                                                } else {
                                                    $(
                                                        '#' +
                                                        this.cavantable[i]
                                                            .Name
                                                    ).find(
                                                        '#' +
                                                        one.cellparalist[a2]
                                                            .id
                                                    )[0].innerHTML = this.getPointNum(
                                                        a[a1].value,
                                                        parseInt(
                                                            one.cellparalist[a2]
                                                                .xsnumber
                                                        )
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                    if (end.argwaibuparalist.length == 0) {
                        end.starttime = $($('.' + wantdata.startkongjian)[0])
                            .find('input')
                            .val();

                        end.endtime = $($('.' + wantdata.endkongjian)[0])
                            .find('input')
                            .val();
                    }
                    this.$axios({
                        method: 'post',
                        url: `/api/ParameterReport/SearchExtensionData`,
                        data: end,
                    })
                        .then((res) => {
                            console.log('是123', res.data.data);

                            if (
                                res.data.data == '无数据' ||
                                res.data.data == '[]'
                            ) {
                                this.cavantable[i].data = [];
                                let ndata = [];
                                for (
                                    let i3 = 0;
                                    i3 <
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray.length;
                                    i3++
                                ) {
                                    if (
                                        this.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .kzresourcedataitemarray[i3]
                                            .itemdata !== null
                                    ) {
                                        ndata.push(
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[i3]
                                        );
                                    }
                                }
                                //  this.cavantable[i].nowdata = [];
                            } else {
                                //        $("#"+(this.cavantable[i].Name+"page")).show();
                                //    $("#"+this.cavantable[i].Name).show();

                                let a = JSON.parse(res.data.data);

                                this.cavantable[i].data = a;
                                let ndata = [];
                                for (
                                    let i3 = 0;
                                    i3 <
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray.length;
                                    i3++
                                ) {
                                    if (
                                        this.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .kzresourcedataitemarray[i3]
                                            .itemdata !== null
                                    ) {
                                        ndata.push(
                                            this.cavantable[i]
                                                .ParameterReportItemtList.dd
                                                .kzresourcedataitemarray[i3]
                                        );
                                    }
                                }
                            }
                        })
                        .then((re1) => {
                            this.$nextTick(() => {
                                for (
                                    let ac = 0;
                                    ac < this.cavantable[i].sju.length;
                                    ac++
                                ) {
                                    if (
                                        this.cavantable[i].sju[ac].itemdata ==
                                        '查询时间'
                                    ) {
                                        if (
                                            this.cavantable[i].sju[ac]
                                                .itemformat
                                        ) {
                                            this.cavantable[i].sju[
                                                ac
                                            ].itemformat = this.cavantable[
                                                i
                                            ].sju[ac].itemformat.replace(
                                                'dd',
                                                'DD'
                                            );
                                            this.cavantable[i].sju[
                                                ac
                                            ].itemformat = this.cavantable[
                                                i
                                            ].sju[ac].itemformat.replace(
                                                'yyyy',
                                                'YYYY'
                                            );
                                        }

                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + this.cavantable[i].sju[ac].id
                                        )[0].innerHTML = moment().format(
                                            this.cavantable[i].sju[ac]
                                                .itemformat
                                        );
                                        console.log(
                                            '时间',
                                            this.cavantable[i].sju[ac]
                                                .itemformat
                                        );
                                    } else if (
                                        this.cavantable[i].sju[ac].itemdata ==
                                        '查询账号'
                                    ) {
                                        if (
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' +
                                                this.cavantable[i].sju[ac]
                                                    .id
                                            )[0] !== undefined
                                        ) {
                                            if (
                                                !JSON.parse(
                                                    sessionStorage.getItem(
                                                        'userInfo1'
                                                    )
                                                )
                                            ) {
                                                $(
                                                    '#' +
                                                    this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                    this.cavantable[i].sju[
                                                        ac
                                                    ].id
                                                )[0].innerHTML = JSON.parse(
                                                    sessionStorage.getItem(
                                                        'sightseerInfo1'
                                                    )
                                                ).SCMSUserAccount;
                                            } else {
                                                $(
                                                    '#' +
                                                    this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                    this.cavantable[i].sju[
                                                        ac
                                                    ].id
                                                )[0].innerHTML = JSON.parse(
                                                    sessionStorage.getItem(
                                                        'userInfo1'
                                                    )
                                                ).SCMSUserAccount;
                                            }
                                        }
                                    }
                                }

                                this.initMainChart();
                            });
                        });
                }
            }, 100);
            // var that = this
            //  setImmediate(()=>{
            //       this.$nextTick(() => {
            //                     that.initMainChart();
            //                 });
            //  },500)
        },
        //赋值
        gitValue() {
            this.cavantable = this.textblockData;

            console.log('sss', this.cavantable);

            //加层级
            for (let j = 0; j < this.textblockData.length; j++) {
                var ZIndexs = this.data.Data.ZIndexs;
                if (ZIndexs) {
                    for (let item in ZIndexs) {
                        if (this.textblockData[j].Name == item) {
                            this.textblockData[j].PropertyList.ZIndex =
                                ZIndexs[item];
                            break;
                        }
                    }
                } else {
                    this.textblockData[j].PropertyList.ZIndex = '';
                }
            }
            var data = JSON.parse(JSON.stringify(this.dae));

            for (
                let j = 0;
                j < data.Data.ParameterReportItemtList.length;
                j++
            ) {
                for (let a = 0; a < this.cavantable.length; a++) {
                    if (
                        this.cavantable[a].Name ==
                        data.Data.ParameterReportItemtList[j].ElementName
                    ) {
                        if (
                            typeof data.Data.ParameterReportItemtList[j].dd ==
                            'string'
                        ) {
                            data.Data.ParameterReportItemtList[j].dd =
                                JSON.parse(
                                    data.Data.ParameterReportItemtList[j].dd
                                );
                        }

                        this.cavantable[a].ParameterReportItemtList =
                            data.Data.ParameterReportItemtList[j];
                    }
                }
            }

            let daiarr = [];
            this.cavantable.forEach((item, index) => {
                let pd = item.ParameterReportItemtList;
                if (pd) {
                    daiarr.push(item);
                }
            });
            this.cavantable = daiarr;
            this.cavantable.forEach((item) => {
                if (!item.ParameterReportItemtList.dd.kzsummotype) {
                    item.ParameterReportItemtList.dd.kzsummopos = '无';
                }
            });

            setTimeout(() => {
                this.first();
            });
        },
    },
};
</script>

<style lang="scss"></style>

<style lang="scss" scoped>
.DateTimePicker28a {
    display: inline-block;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
}

.textimportInput {
    // border:none;
    height: 34px;
}

td {
    position: relative !important;
}

input {
    font-size: 12px;
    border: none;
    height: 30px !important;
    text-align: center;
    outline-style: none;
    white-space: nowrap;
    overflow: hidden;
    word-break: keep-all;
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-overflow: ellipsis;
    text-align: center;
}

.tip12 {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 100;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;

    .tiptop {
        width: 380px;
        height: 40px;
        background-color: #ffbc3d;

        img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
            margin-left: 160px;
        }

        span {
            color: #ffffff;
            position: relative;
            top: -5px;
            margin-left: 7px;
        }
    }

    .tipword {
        width: 100%;
        text-align: center;
        margin-top: 50px;
    }

    .tipdetermine {
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 20px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
        margin-top: 40px;
        margin-left: 25px;
        height: 30px;

        .one {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }

        .two {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}

.yd {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
</style>
<style lang="scss">
.table-box {
    height: 100%;

    .jexcel-content {
        height: 100%;
        overflow: hidden;
    }
}
</style>
