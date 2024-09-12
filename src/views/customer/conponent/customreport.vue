<!--
 * @Description: 这是下拉文本控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-24 15:27:38
 -->
<template>
    <div v-if="show">
        <div
            v-for="(item, key) in cavantable"
            :key="key"
            :id="item.Name"
            :style="
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
            "
        >
            <div
                v-html="item.ParameterReportItemtList.dd.zhtml"
                class="table-box"
            ></div>
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

                        $('#' + this.cavantable[i].Name + 'page')[0].style.top =
                            Number(
                                $(
                                    '#' + this.cavantable[i].Name
                                )[0].style.top.replace('px', '')
                            ) +
                            Number(
                                $(
                                    '#' + this.cavantable[i].Name
                                )[0].style.height.replace('px', '')
                            ) +
                            2 +
                            'px';

                        $(
                            '#' + this.cavantable[i].Name + 'page'
                        )[0].style.left =
                            Number(
                                $(
                                    '#' + this.cavantable[i].Name
                                )[0].style.left.replace('px', '')
                            ) +
                            Number(
                                $(
                                    '#' + this.cavantable[i].Name
                                )[0].style.width.replace('px', '')
                            ) -
                            200 +
                            'px';
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

                        $('#' + this.cavantable[i].Name + 'page')[0].style.top =
                            Number(
                                $(
                                    '#' + this.cavantable[i].Name
                                )[0].style.top.replace('px', '')
                            ) +
                            Number(
                                $(
                                    '#' + this.cavantable[i].Name
                                )[0].style.height.replace('px', '')
                            ) +
                            2 +
                            'px';

                        $(
                            '#' + this.cavantable[i].Name + 'page'
                        )[0].style.left =
                            Number(
                                $(
                                    '#' + this.cavantable[i].Name
                                )[0].style.left.replace('px', '')
                            ) +
                            Number(
                                $(
                                    '#' + this.cavantable[i].Name
                                )[0].style.width.replace('px', '')
                            ) -
                            200 +
                            'px';
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
            console.log('data999', new Date());
            //  this.$emit('percentage1',0)
            var dcnum = 0;
            var dcnum1 = 0;
            //            for (let dc1 = 0; dc1 < this.cavantable.length; dc1++) {
            //                 if (
            //                     this.cavantable[dc1].ParameterReportItemtList.dd
            //                         .dckongjian == it.class
            //                 ) {
            //                if(this.cavantable[dc1].numpage == 0){
            //                 dcnum1+=parseInt($('#'+this.cavantable[dc1].Name).find('td').length)
            //                }else{
            //                dcnum1+=parseInt($('#'+this.cavantable[dc1].Name).find('td').length)+(parseInt(this.cavantable[dc1].ParameterReportItemtList.dd.endpoy)-parseInt(this.cavantable[dc1].ParameterReportItemtList.dd.startpoy))*(parseInt(this.cavantable[dc1].ParameterReportItemtList.dd.endpox)-parseInt(this.cavantable[dc1].ParameterReportItemtList.dd.startpox))*(parseInt(this.cavantable[dc1].numpage)-1)

            //                }

            //                 }
            //   }
            //   if(dcnum1>10000){
            //         this.tipchange = true;
            //         this.tipword = '导出数据不能超过10000!';
            //         this.pdyd3 = true;
            //         this.$store.state.isShow = false;
            //         return;
            //   }
            for (let dc1 = 0; dc1 < this.cavantable.length; dc1++) {
                console.log(JSON.parse(JSON.stringify(this.cavantable)));
                if (
                    this.cavantable[dc1].ParameterReportItemtList.dd
                        .dckongjian == it.class
                ) {
                    dcnum++;
                }
            }

            for (let dc = 0; dc < this.cavantable.length; dc++) {
                if (
                    this.cavantable[dc].ParameterReportItemtList.dd
                        .dckongjian == it.class
                ) {
                    this.footarr = [];
                    this.$store.state.isShow = true;
                    $('.btablecover').hide();
                    this.$emit('percentage1', 0);

                    await this.delay(100);
                    $('.btablecover').show();
                    let word = this.lang.ReportForm_Exporting.replace(
                        '{0}',
                        dc + 1
                    );
                    $('.btableconterword')[0].innerHTML = word;
                    // setTimeout(() => {
                    if (this.cavantable[dc].data.length > 10000) {
                        // this.tipchange = true;
                        // this.tipword = this.lang.ReportForm_ExportDataUpTo10000;
                        this.$emit(
                            'showtip',
                            this.lang.ReportForm_ExportDataUpTo10000
                        );
                        this.pdyd3 = true;
                        this.$store.state.isShow = false;
                        $('.btablecover').hide();
                        return;
                    }

                    var nowdai = JSON.stringify(this.cavantable[dc]);
                    let daiti = this.cavantable[dc].ParameterReportItemtList.dd;

                    if (daiti.kzdirection == '纵向扩展') {
                        let adiv = this.cavantable[dc].daochutable;

                        let a = $(this.cavantable[dc].daochutable)[0].cloneNode(
                            true
                        );
                        let b = $(this.cavantable[dc].daochutable)[0].cloneNode(
                            true
                        );
                        //               for(let a1=0;a1<$(b).find('.heibin').length;a1++){
                        //             if(parseFloat($(b).find('.heibin')[a1].id.split('-')[0])<parseFloat(this.cavantable[dc].ParameterReportItemtList.dd.startpox)&&parseFloat($(b).find('.heibin')[a1].id.split('-')[1])>parseFloat(this.cavantable[dc].ParameterReportItemtList.dd.startpoy)){
                        //    if(parseFloat($(b).find('.heibin')[a1].id.split('-')[0])+parseFloat($($('.heibin')[a1]).attr('colspan'))>parseFloat(this.cavantable[dc].ParameterReportItemtList.dd.startpox)){
                        //                        let c = parseFloat(this.cavantable[dc].ParameterReportItemtList.dd.startpox);
                        //                        $($(b).find('.heibin')[a1]).attr('rowspan',c)
                        //                        for(let a2=0;a2<$($(b).find('.heibin')[a1]).attr('name').split(',').length;a2++){
                        //                            let c1 = $($(b).find('.heibin')[a1]).attr('name').split(',')[a2]
                        //                            if(c1){
                        //                 if(this.cavantable[dc].shi5.includes($('#'+c1)[0].id.split('-')[0])){
                        //                             $($($(b).find('.heibin')[a1]).find('#'+c1)).show()
                        //                          }
                        //                            }

                        //                        }
                        //                     // console.log("sadsadsad",$($(b).find('.heibin')[a1]))

                        //             }
                        //             }

                        //         }
                        if ($('#' + this.cavantable[dc].Name + 'page')[0]) {
                            for (
                                let cc = 0;
                                cc < $(b).find('.dataready').length;
                                cc++
                            ) {
                                $($(b).find('.dataready')[cc])
                                    .find('input')[0]
                                    .setAttribute('value', '');
                                $($(b).find('.dataready')[cc]).find(
                                    'input'
                                )[0].value = '';
                            }

                            for (
                                let ai = 0;
                                ai <
                                this.cavantable[dc].ParameterReportItemtList.dd
                                    .cellparaarray.length;
                                ai++
                            ) {
                                $(b).find(
                                    '#' +
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .cellparaarray[ai].id
                                )[0].innerHTML = $(
                                    '#' + this.cavantable[dc].Name
                                ).find(
                                    '#' +
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .cellparaarray[ai].id
                                )[0].innerHTML;
                            }

                            let div = document.createElement('table');
                            let length = $(a).find('.daochu').length;
                            for (
                                let i1 = 0;
                                i1 < $(a).find('td').length;
                                i1++
                            ) {
                                if (
                                    $(a).find('td')[i1].style.display ==
                                        'none' &&
                                    parseInt(
                                        $($(a).find('td')[i1])
                                            .attr('id')
                                            .split('-')[0]
                                    ) <
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .startpox
                                ) {
                                    $(a).find('td')[i1].style.display = 'block';
                                }
                            }
                            for (let i1 = 0; i1 < length; i1++) {
                                let a1 = 0;
                                div.append($(a).find('.daochu')[a1]);

                                this.$emit(
                                    'percentage1',
                                    parseInt(10 / (length - i1))
                                );

                                await this.delay(i1);
                            }

                            let div1 = $(div)[0].cloneNode(true);

                            for (
                                let i = 0;
                                i < $(div1).find('input').length;
                                i++
                            ) {
                                $(div1).find('input')[i].value = null;
                            }
                            let sumdata1 = daiti.kzsummotype.split(',');
                            let length1 = $($(div).find('tr')[0]).find(
                                'input'
                            ).length;
                            let y1 = $(div).find('input').length;

                            let endlength;
                            var xzdata =
                                Math.ceil(
                                    this.cavantable[dc].data.length /
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .kzresourcedataitemarray.length
                                ) +
                                Number(
                                    this.cavantable[dc].ParameterReportItemtList
                                        .dd.startpoy
                                );
                            if (daiti.kzsummopos !== '分布在前') {
                                endlength =
                                    parseInt(length) +
                                    parseInt(
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    );
                            } else {
                                endlength =
                                    parseInt(length) +
                                    sumdata1.length +
                                    parseInt(
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    );
                            }

                            let shi5 = this.cavantable[dc].shi5;
                            let shi6 = this.cavantable[dc].shi6;
                            let lenght3;
                            for (
                                let cc1 = 1;
                                cc1 < this.cavantable[dc].numpage;
                                cc1++
                            ) {
                                lenght3 = length - 1;
                                for (let cc = 0; cc < length; cc++) {
                                    //         if(cc==1){
                                    //                for (
                                    //     let i = 0;
                                    //     i < $(div1).find('td').length;
                                    //     i++
                                    // ) {
                                    //     if( $(div1).find('td')[i].innerText){
                                    //     //   $(div1).find('td')[i].innerText = '';
                                    //     //   $($(div1).find('td')[i]).removeAttr('class')
                                    //     }

                                    // }
                                    //         }
                                    let div3 = $($(div1).find('tr'))[
                                        lenght3
                                    ].cloneNode(true);
                                    for (
                                        let a22 = 0;
                                        a22 < $(div3).find('.heibin').length;
                                        a22++
                                    ) {
                                        $($(div3).find('.heibin')[a22]).attr(
                                            'rowspan',
                                            1
                                        );
                                        $($(div3).find('.heibin')[a22]).attr(
                                            'colspan',
                                            1
                                        );
                                    }
                                    //         if(cc1>1){

                                    // 	for (let cc11 = 0; cc11 < $(div3).find('td').length; cc11++) {
                                    // 		if(!$($(div3).find('td')[cc11]).hasClass('dataready')&&!$($(div3).find('td')[cc11]).hasClass('datareadyfoot')){
                                    // 			// $(div3).find('td')[cc11].innerHTML = ''
                                    // 			// $($(div3).find('td')[cc11]).removeAttr('style')
                                    // 		// if($($(div3).find('td')[cc11]).hasClass('item')){
                                    // 		// 	$($(div3).find('td')[cc11]).removeAttr('class')
                                    // 		// }

                                    // 		}
                                    // 	}
                                    // }

                                    $($(b).find('#row-' + endlength)[0]).after(
                                        div3
                                    );

                                    lenght3--;
                                }
                                var changeii = [];

                                if (
                                    this.cavantable[dc].numpage > 1 &&
                                    $(
                                        '#' + this.cavantable[dc].Name + 'page'
                                    )[0]
                                ) {
                                    for (
                                        let ii = parseInt(endlength);
                                        ii <
                                        parseInt(endlength) +
                                            parseInt(
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[dc]
                                                                .Name
                                                    ).find('td')[
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    dc
                                                                ].Name
                                                        ).find('td').length - 1
                                                    ]
                                                )
                                                    .attr('id')
                                                    .split('-')[1]
                                            ) -
                                            parseInt(
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[dc]
                                                                .Name
                                                    ).find('.dataready')[
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    dc
                                                                ].Name
                                                        ).find('.dataready')
                                                            .length - 1
                                                    ]
                                                )
                                                    .attr('id')
                                                    .split('-')[1]
                                            );
                                        ii++
                                    ) {
                                        let changeil = [];
                                        for (
                                            let cc11 = 0;
                                            cc11 <
                                            $($(b).find('#row-' + ii)[0]).find(
                                                'td'
                                            ).length;
                                            cc11++
                                        ) {
                                            if (
                                                !$(
                                                    $(
                                                        $(b).find(
                                                            '#row-' + ii
                                                        )[0]
                                                    ).find('td')[cc11]
                                                ).hasClass('dataready') &&
                                                !$(
                                                    $(
                                                        $(b).find(
                                                            '#row-' + ii
                                                        )[0]
                                                    ).find('td')[cc11]
                                                ).hasClass('datareadyfoot')
                                            ) {
                                                if (
                                                    ii <=
                                                    this.cavantable[dc].endpoy +
                                                        this.cavantable[
                                                            dc
                                                        ].ParameterReportItemtList.dd.kzsummotype.split(
                                                            ','
                                                        ).length
                                                ) {
                                                    if (
                                                        $(
                                                            $(
                                                                '#' +
                                                                    this
                                                                        .cavantable[
                                                                        dc
                                                                    ].Name
                                                            ).find(
                                                                '#row-' + ii
                                                            )[0]
                                                        ).find('td')[cc11]
                                                    ) {
                                                        if (
                                                            $(
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                            this
                                                                                .cavantable[
                                                                                dc
                                                                            ]
                                                                                .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                            ii
                                                                    )[0]
                                                                ).find('td')[
                                                                    cc11
                                                                ]
                                                            ).attr('style') ||
                                                            $(
                                                                $(
                                                                    '#' +
                                                                        this
                                                                            .cavantable[
                                                                            dc
                                                                        ].Name
                                                                ).find(
                                                                    '#row-' + ii
                                                                )[0]
                                                            ).find('td')[cc11]
                                                                .innerHTML ||
                                                            $(
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                            this
                                                                                .cavantable[
                                                                                dc
                                                                            ]
                                                                                .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                            ii
                                                                    )[0]
                                                                ).find('td')[
                                                                    cc11
                                                                ]
                                                            ).hasClass(
                                                                'bordertop'
                                                            ) ||
                                                            $(
                                                                $(
                                                                    $(
                                                                        '#' +
                                                                            this
                                                                                .cavantable[
                                                                                dc
                                                                            ]
                                                                                .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                            ii
                                                                    )[0]
                                                                ).find('td')[
                                                                    cc11
                                                                ]
                                                            ).hasClass(
                                                                'borderleft'
                                                            )
                                                        ) {
                                                            changeil.push({
                                                                index: cc11,
                                                                text: $(
                                                                    $(
                                                                        '#' +
                                                                            this
                                                                                .cavantable[
                                                                                dc
                                                                            ]
                                                                                .Name
                                                                    ).find(
                                                                        '#row-' +
                                                                            ii
                                                                    )[0]
                                                                ).find('td')[
                                                                    cc11
                                                                ].innerHTML,
                                                                style: $(
                                                                    $(
                                                                        $(
                                                                            '#' +
                                                                                this
                                                                                    .cavantable[
                                                                                    dc
                                                                                ]
                                                                                    .Name
                                                                        ).find(
                                                                            '#row-' +
                                                                                ii
                                                                        )[0]
                                                                    ).find(
                                                                        'td'
                                                                    )[cc11]
                                                                ).attr('style'),
                                                                classname: $(
                                                                    $(
                                                                        $(
                                                                            '#' +
                                                                                this
                                                                                    .cavantable[
                                                                                    dc
                                                                                ]
                                                                                    .Name
                                                                        ).find(
                                                                            '#row-' +
                                                                                ii
                                                                        )[0]
                                                                    ).find(
                                                                        'td'
                                                                    )[cc11]
                                                                ).attr('class'),
                                                            });
                                                        }
                                                    }

                                                    $(
                                                        $(b).find(
                                                            '#row-' + ii
                                                        )[0]
                                                    ).find('td')[
                                                        cc11
                                                    ].innerHTML = '';
                                                    $(
                                                        $(
                                                            $(b).find(
                                                                '#row-' + ii
                                                            )[0]
                                                        ).find('td')[cc11]
                                                    ).removeAttr('style');
                                                    $(
                                                        $(
                                                            $(b).find(
                                                                '#row-' + ii
                                                            )[0]
                                                        ).find('td')[cc11]
                                                    ).removeAttr('class');
                                                }
                                            }
                                        }
                                        changeii.push(changeil);
                                    }
                                }
                                this.$emit(
                                    'percentage1',
                                    parseInt(
                                        70 /
                                            (this.cavantable[dc].numpage -
                                                cc1) +
                                            10
                                    )
                                );

                                await this.delay(cc1);
                            }

                            // return

                            let shengxiadata =
                                y1 * this.cavantable[dc].numpage -
                                this.cavantable[dc].data.length;

                            for (let i = 0; i < shengxiadata; i++) {
                                this.cavantable[dc].data.push({
                                    value: null,
                                });
                            }

                            let now =
                                parseInt(
                                    this.cavantable[dc].ParameterReportItemtList
                                        .dd.startpoy
                                ) + 1;

                            let nowii = 0;
                            let nowi2 = 0;
                            let sumnum = 0;

                            for (
                                let i2 = 0;
                                i2 <
                                $('#' + this.cavantable[dc].Name).find('tr')
                                    .length;
                                i2++
                            ) {
                                for (
                                    let i3 = 0;
                                    i3 <
                                    $(
                                        $('#' + this.cavantable[dc].Name).find(
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
                                                        this.cavantable[dc].Name
                                                ).find('tr')[i2]
                                            ).find('td')[i3]
                                        ).hasClass('datareadyfoot')
                                    ) {
                                        sumnum = sumnum + 1;
                                        break;
                                    }
                                }
                            }

                            if (daiti.kzsummopos == '分布在前') {
                                now += sumnum;
                            }
                            let length5 =
                                length * this.cavantable[dc].numpage + now;
                            if (daiti.kzsummopos == '分布在后') {
                                length5 =
                                    length * this.cavantable[dc].numpage + now;
                            }
                            let removeid =
                                parseInt(endlength) +
                                parseInt(
                                    $(
                                        $('#' + this.cavantable[dc].Name).find(
                                            'td'
                                        )[
                                            $(
                                                '#' + this.cavantable[dc].Name
                                            ).find('td').length - 1
                                        ]
                                    )
                                        .attr('id')
                                        .split('-')[1]
                                ) -
                                parseInt(
                                    $(
                                        $('#' + this.cavantable[dc].Name).find(
                                            '.dataready'
                                        )[
                                            $(
                                                '#' + this.cavantable[dc].Name
                                            ).find('.dataready').length - 1
                                        ]
                                    )
                                        .attr('id')
                                        .split('-')[1]
                                );
                            let nowcii = 0;
                            if (
                                this.cavantable[dc].numpage > 1 &&
                                $('#' + this.cavantable[dc].Name + 'page')[0]
                            ) {
                                for (let ii = now; ii < length5; ii++) {
                                    if (
                                        this.cavantable[dc].numpage > 1 &&
                                        $(
                                            '#' +
                                                this.cavantable[dc].Name +
                                                'page'
                                        )[0]
                                    ) {
                                        if (ii > endlength) {
                                            for (
                                                let cc11 = 0;
                                                cc11 <
                                                $($(b).find('tr')[ii]).find(
                                                    'td'
                                                ).length;
                                                cc11++
                                            ) {
                                                if (
                                                    !$(
                                                        $(
                                                            $(b).find('tr')[ii]
                                                        ).find('td')[cc11]
                                                    ).hasClass('dataready') &&
                                                    !$(
                                                        $(
                                                            $(b).find('tr')[ii]
                                                        ).find('td')[cc11]
                                                    ).hasClass('datareadyfoot')
                                                ) {
                                                    $($(b).find('tr')[ii]).find(
                                                        'td'
                                                    )[cc11].innerHTML = '';
                                                    $(
                                                        $(
                                                            $(b).find('tr')[ii]
                                                        ).find('td')[cc11]
                                                    ).removeAttr('style');
                                                    $(
                                                        $(
                                                            $(b).find('tr')[ii]
                                                        ).find('td')[cc11]
                                                    ).removeAttr('class');
                                                }
                                            }
                                        }
                                        if (ii > endlength && ii < removeid) {
                                            if (changeii.length > 0) {
                                                //    for(let cc12 = 0; cc12 < changeii.length; cc12++){
                                                for (
                                                    let cc11 = 0;
                                                    cc11 <
                                                    changeii[nowcii].length;
                                                    cc11++
                                                ) {
                                                    if (
                                                        changeii[nowcii][cc11]
                                                            .index >
                                                            parseInt(
                                                                this.cavantable[
                                                                    dc
                                                                ].endpox
                                                            ) ||
                                                        changeii[nowcii][cc11]
                                                            .index <
                                                            parseInt(
                                                                this.cavantable[
                                                                    dc
                                                                ].startpox
                                                            )
                                                    ) {
                                                        $(
                                                            $(b).find('tr')[ii]
                                                        ).find('td')[
                                                            changeii[nowcii][
                                                                cc11
                                                            ].index
                                                        ].innerHTML =
                                                            changeii[nowcii][
                                                                cc11
                                                            ].text;
                                                        $(
                                                            $(
                                                                $(b).find('tr')[
                                                                    ii
                                                                ]
                                                            ).find('td')[
                                                                changeii[
                                                                    nowcii
                                                                ][cc11].index
                                                            ]
                                                        ).attr(
                                                            'class',
                                                            changeii[nowcii][
                                                                cc11
                                                            ].classname
                                                        );
                                                        $(
                                                            $(
                                                                $(b).find('tr')[
                                                                    ii
                                                                ]
                                                            ).find('td')[
                                                                changeii[
                                                                    nowcii
                                                                ][cc11].index
                                                            ]
                                                        ).attr(
                                                            'style',
                                                            changeii[nowcii][
                                                                cc11
                                                            ].style
                                                        );
                                                    }
                                                }
                                                nowcii++;
                                                //    }
                                            }
                                        }
                                    }
                                    //               if(removeid.indexOf( $($($(b).find('tr')[ii]).find('td')[0]).attr('id').split('-')[0])>0){

                                    // 	}
                                    //         }else{
                                    //  removeid.push( $($($(b).find('tr')[ii]).find('td')[0]).attr('id').split('-')[0])
                                    //         }

                                    for (let i2 = 0; i2 < length1; i2++) {
                                        let an = nowi2;

                                        if (
                                            $($(b).find('tr')[ii]).find(
                                                'input'
                                            )[i2].id !== 'undefined'
                                        ) {
                                            let xnumber = '';
                                            let de = '';
                                            var itemformat = null;
                                            for (
                                                let i1 = 0;
                                                i1 < shi5.length;
                                                i1++
                                            ) {
                                                if (shi5[i1].id == i2) {
                                                    xnumber = shi5[i1].xsnumber;
                                                    de = shi5[i1].defauldisplay;
                                                    break;
                                                } else {
                                                    xnumber = '';
                                                    de = '';
                                                }
                                            }
                                            for (
                                                let i1 = 0;
                                                i1 < shi6.length;
                                                i1++
                                            ) {
                                                if (
                                                    shi6[i1].id ==
                                                    parseInt(
                                                        $(
                                                            $(
                                                                $(b).find('tr')[
                                                                    ii
                                                                ]
                                                            ).find('input')[i2]
                                                        )
                                                            .parent()
                                                            .attr('id')
                                                            .split('-')[0]
                                                    ) -
                                                        parseInt(
                                                            this.cavantable[dc]
                                                                .ParameterReportItemtList
                                                                .dd.startpox
                                                        )
                                                ) {
                                                    itemformat =
                                                        shi6[i1].itemformat;
                                                    break;
                                                } else {
                                                    itemformat = null;
                                                }
                                            }
                                            let aaa = '';
                                            if (xnumber !== '') {
                                                if (
                                                    this.getPointNum(
                                                        this.cavantable[dc]
                                                            .data[an].value,
                                                        xnumber
                                                    ) == null ||
                                                    this.getPointNum(
                                                        this.cavantable[dc]
                                                            .data[an].value,
                                                        xnumber
                                                    ) == 'null' ||
                                                    this.getPointNum(
                                                        this.cavantable[dc]
                                                            .data[an].value,
                                                        xnumber
                                                    ) == ''
                                                ) {
                                                    aaa = '';
                                                } else {
                                                    aaa = this.getPointNum(
                                                        this.cavantable[dc]
                                                            .data[an].value,
                                                        xnumber
                                                    );
                                                }
                                                if (aaa == null || aaa == '') {
                                                    if (de !== '') {
                                                        if (
                                                            de == 'null' ||
                                                            de == 'undefine' ||
                                                            de == null ||
                                                            de == undefined
                                                        ) {
                                                            de = '';
                                                        }

                                                        if (xzdata >= ii) {
                                                            $(
                                                                $(b).find('tr')[
                                                                    ii
                                                                ]
                                                            ).find('input')[
                                                                i2
                                                            ].value = de;
                                                            $(
                                                                $(b).find('tr')[
                                                                    ii
                                                                ]
                                                            )
                                                                .find('input')
                                                                [
                                                                    i2
                                                                ].setAttribute(
                                                                    'value',
                                                                    de
                                                                );
                                                        }
                                                    } else {
                                                        $(
                                                            $(b).find('tr')[ii]
                                                        ).find('input')[
                                                            i2
                                                        ].value = aaa;
                                                        $($(b).find('tr')[ii])
                                                            .find('input')
                                                            [i2].setAttribute(
                                                                'value',
                                                                aaa
                                                            );
                                                    }
                                                } else {
                                                    $($(b).find('tr')[ii]).find(
                                                        'input'
                                                    )[i2].value = aaa;
                                                    $($(b).find('tr')[ii])
                                                        .find('input')
                                                        [i2].setAttribute(
                                                            'value',
                                                            aaa
                                                        );
                                                }
                                            } else {
                                                if (
                                                    this.cavantable[dc].data[an]
                                                        .value == null ||
                                                    this.cavantable[dc].data[an]
                                                        .value == 'null' ||
                                                    this.cavantable[dc].data[an]
                                                        .value == ''
                                                ) {
                                                    aaa = '';
                                                } else {
                                                    aaa =
                                                        this.cavantable[dc]
                                                            .data[an].value;
                                                }
                                                if (aaa == null) {
                                                    if (de !== '') {
                                                        if (
                                                            de == 'null' ||
                                                            de == 'undefine' ||
                                                            de == null ||
                                                            de == undefined
                                                        ) {
                                                            de = '';
                                                        }
                                                        $(
                                                            $(b).find('tr')[ii]
                                                        ).find('input')[
                                                            i2
                                                        ].value = de;
                                                        $($(b).find('tr')[ii])
                                                            .find('input')
                                                            [i2].setAttribute(
                                                                'value',
                                                                de
                                                            );
                                                    } else {
                                                        $(
                                                            $(b).find('tr')[ii]
                                                        ).find('input')[
                                                            i2
                                                        ].value = aaa;
                                                        $($(b).find('tr')[ii])
                                                            .find('input')
                                                            [i2].setAttribute(
                                                                'value',
                                                                aaa
                                                            );
                                                    }
                                                } else {
                                                    $($(b).find('tr')[ii]).find(
                                                        'input'
                                                    )[i2].value = aaa;
                                                    $($(b).find('tr')[ii])
                                                        .find('input')
                                                        [i2].setAttribute(
                                                            'value',
                                                            aaa
                                                        );
                                                }
                                            }
                                        } else {
                                            let aaa;
                                            this.cavantable[dc].data.splice(
                                                an,
                                                0,
                                                {
                                                    value: null,
                                                }
                                            );
                                            $($(b).find('tr')[ii]).find(
                                                'input'
                                            )[i2].value =
                                                this.cavantable[dc].data[
                                                    an
                                                ].value;
                                            if (
                                                this.cavantable[dc].data[an]
                                                    .value == null ||
                                                this.cavantable[dc].data[an]
                                                    .value == 'null' ||
                                                this.cavantable[dc].data[an]
                                                    .value == ''
                                            ) {
                                                aaa = '';
                                            } else {
                                                aaa =
                                                    this.cavantable[dc].data[an]
                                                        .value;
                                            }
                                            $($(b).find('tr')[ii])
                                                .find('input')
                                                [i2].setAttribute('value', aaa);
                                        }

                                        if (
                                            $($(b).find('tr')[ii]).find(
                                                'input'
                                            )[i2].value
                                        ) {
                                            if (
                                                !isNaN(
                                                    $($(b).find('tr')[ii]).find(
                                                        'input'
                                                    )[i2].value
                                                )
                                            ) {
                                                let arr = [];
                                                arr.push(
                                                    $($(b).find('tr')[ii]).find(
                                                        'input'
                                                    )[i2].value
                                                );
                                                arr.push(i2);
                                                this.footarr.push(arr);
                                            }

                                            if (itemformat) {
                                                let aaa1 = this.dateFormat(
                                                    itemformat,
                                                    $($(b).find('tr')[ii]).find(
                                                        'input'
                                                    )[i2].value
                                                );
                                                $($(b).find('tr')[ii])
                                                    .find('input')
                                                    [i2].setAttribute(
                                                        'value',
                                                        aaa1
                                                    );
                                                $($(b).find('tr')[ii]).find(
                                                    'input'
                                                )[i2].value = aaa1;
                                            }
                                        }
                                        nowi2++;
                                        this.$emit(
                                            'percentage1',
                                            parseInt(
                                                20 *
                                                    ((ii * length1 + i2) /
                                                        (length5 * length1))
                                            ) + 80
                                        );

                                        await this.delay(i2, 0.5);
                                    }

                                    nowii++;
                                }

                                let wantdao = [];

                                for (
                                    let a2 = 0;
                                    a2 <
                                    $(
                                        $(b).find('.datareadyfoot').parent()[0]
                                    ).find('.datareadyfoot').length;
                                    a2++
                                ) {
                                    if (
                                        $(
                                            $(b)
                                                .find('.datareadyfoot')
                                                .parent()[0]
                                        ).find('.datareadyfoot')[a2]
                                            .innerHTML !== '\\' &&
                                        $(
                                            $(b)
                                                .find('.datareadyfoot')
                                                .parent()[0]
                                        ).find('.datareadyfoot')[a2]
                                            .innerHTML !== ''
                                    ) {
                                        wantdao.push(a2);
                                    }
                                }
                                if (sumdata1.length !== 0) {
                                    let newarry = [];
                                    console.log(this.footarr);
                                    // for (
                                    //     let j = 0;
                                    //     j < this.cavantable[dc].data.length;
                                    //     j++
                                    // ) {
                                    //     for (
                                    //         let j1 = 0;
                                    //         j1 < wantdao.length;
                                    //         j1++
                                    //     ) {
                                    //         if (j % length1 == wantdao[j1]) {
                                    //             let newarry1 = [];
                                    //             newarry1.push(
                                    //                 this.cavantable[dc].data[j]
                                    //                     .value,
                                    //                 wantdao[j1]
                                    //             );
                                    //             newarry.push(newarry1);
                                    //         }
                                    //     }
                                    // }
                                    for (
                                        let ii = 0;
                                        ii < wantdao.length;
                                        ii++
                                    ) {
                                        for (
                                            let i = 0;
                                            i < sumdata1.length;
                                            i++
                                        ) {
                                            if (sumdata1[i] == 'sum') {
                                                console.log('分割线');
                                                let sumdao = 0;

                                                for (
                                                    let i2 = 0;
                                                    i2 < this.footarr.length;
                                                    i2++
                                                ) {
                                                    // console.log(wantdao[ii])
                                                    if (
                                                        this.footarr[i2][1] ==
                                                        wantdao[ii]
                                                    ) {
                                                        // if (
                                                        //     !isNaN(
                                                        //         parseFloat(
                                                        //             this.footarr[
                                                        //                 i2
                                                        //             ][0]
                                                        //         )
                                                        //     )
                                                        // ) {
                                                        // console.log(this.footarr[i2][0])
                                                        let cd = 0;
                                                        //  for(let iia=0;iia<$(b).find('.dataready').length;iia++){
                                                        //        if($($(b).find('.dataready')[iia]).attr('id').split('-')[0] ==  $($(b).find('.datareadyfoot')[wantdao[ii]]).attr('id').split('-')[0]){

                                                        //             cd = $($(b).find('.dataready')[iia]).find('input').val()
                                                        //        }
                                                        //  }
                                                        for (
                                                            let iia = 0;
                                                            iia <
                                                            this.cavantable[dc]
                                                                .shi5.length;
                                                            iia++
                                                        ) {
                                                            if (
                                                                this.cavantable[
                                                                    dc
                                                                ].shi5[iia]
                                                                    .id ==
                                                                wantdao[ii]
                                                            ) {
                                                                cd =
                                                                    this
                                                                        .footarr[
                                                                        i2
                                                                    ][0];
                                                            }
                                                        }
                                                        console.log(
                                                            parseFloat(cd)
                                                        );
                                                        sumdao =
                                                            sumdao +
                                                            parseFloat(cd);

                                                        // }
                                                    }
                                                }
                                                // for (
                                                //     let ii2 = 0;
                                                //     ii2 < shi5.length;
                                                //     ii2++
                                                // ) {
                                                //     if (
                                                //      shi5[ii2].id ==
                                                //        ((wantdao[ii]))
                                                //     ) {
                                                //         sumdao = this.getPointNum(
                                                //             sumdao,
                                                //             shi5[ii2].xsnumber
                                                //         );
                                                //         break;
                                                //     }
                                                // }
                                                if (!sumdao) {
                                                    sumdao = 0;
                                                }
                                                if (
                                                    Number(
                                                        $(
                                                            $(b)
                                                                .find(
                                                                    '.datareadyfoot'
                                                                )
                                                                .parent()[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[wantdao[ii]].innerHTML
                                                    ) +
                                                        '' !==
                                                    NaN + ''
                                                ) {
                                                    $(
                                                        $(b)
                                                            .find(
                                                                '.datareadyfoot'
                                                            )
                                                            .parent()[i]
                                                    ).find('.datareadyfoot')[
                                                        wantdao[ii]
                                                    ].innerHTML = sumdao;
                                                }
                                            }
                                            if (sumdata1[i] == 'mean') {
                                                let sumdao = 0;
                                                let meandao = 0;
                                                for (
                                                    let i2 = 0;
                                                    i2 < this.footarr.length;
                                                    i2++
                                                ) {
                                                    if (
                                                        this.footarr[i2][1] ==
                                                        wantdao[ii]
                                                    ) {
                                                        let cd = 0;
                                                        for (
                                                            let iia = 0;
                                                            iia <
                                                            this.cavantable[dc]
                                                                .shi5.length;
                                                            iia++
                                                        ) {
                                                            if (
                                                                this.cavantable[
                                                                    dc
                                                                ].shi5[iia]
                                                                    .id ==
                                                                wantdao[ii]
                                                            ) {
                                                                cd =
                                                                    this
                                                                        .footarr[
                                                                        i2
                                                                    ][0];
                                                                sumdao =
                                                                    sumdao +
                                                                    parseFloat(
                                                                        cd
                                                                    );
                                                                meandao++;
                                                            }
                                                        }
                                                    }
                                                }
                                                console.log('sumdao', sumdao);
                                                console.log(meandao);
                                                let mean = sumdao / meandao;
                                                console.log('mean', mean);
                                                for (
                                                    let ii2 = 0;
                                                    ii2 < shi5.length;
                                                    ii2++
                                                ) {
                                                    if (
                                                        shi5[ii2].id ==
                                                        wantdao[ii]
                                                    ) {
                                                        mean = this.getPointNum(
                                                            mean,
                                                            shi5[ii2].xsnumber
                                                        );
                                                        break;
                                                    }
                                                }
                                                if (
                                                    isNaN(mean) ||
                                                    mean == null
                                                ) {
                                                    mean = 0;
                                                }
                                                if (
                                                    Number(
                                                        $(
                                                            $(b)
                                                                .find(
                                                                    '.datareadyfoot'
                                                                )
                                                                .parent()[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[wantdao[ii]].innerHTML
                                                    ) +
                                                        '' !==
                                                    NaN + ''
                                                ) {
                                                    $(
                                                        $(b)
                                                            .find(
                                                                '.datareadyfoot'
                                                            )
                                                            .parent()[i]
                                                    ).find('.datareadyfoot')[
                                                        wantdao[ii]
                                                    ].innerHTML = mean;
                                                }
                                            }
                                            if (sumdata1[i] == 'min') {
                                                let min = [];
                                                for (
                                                    let i2 = 0;
                                                    i2 < this.footarr.length;
                                                    i2++
                                                ) {
                                                    if (
                                                        this.footarr[i2][1] ==
                                                        wantdao[ii]
                                                    ) {
                                                        if (
                                                            !isNaN(
                                                                parseFloat(
                                                                    this
                                                                        .footarr[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            )
                                                        ) {
                                                            min.push(
                                                                parseFloat(
                                                                    this
                                                                        .footarr[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            );
                                                        }
                                                    }
                                                }
                                                min.sort(function (a, b) {
                                                    return a - b;
                                                });
                                                if (
                                                    Number(
                                                        $(
                                                            $(b)
                                                                .find(
                                                                    '.datareadyfoot'
                                                                )
                                                                .parent()[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[wantdao[ii]].innerHTML
                                                    ) +
                                                        '' !==
                                                    NaN + ''
                                                ) {
                                                    if (min[0] == 'undefined') {
                                                        $(
                                                            $(b)
                                                                .find(
                                                                    '.datareadyfoot'
                                                                )
                                                                .parent()[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[
                                                            wantdao[ii]
                                                        ].innerHTML = 0;
                                                    } else {
                                                        for (
                                                            let ii2 = 0;
                                                            ii2 < shi5.length;
                                                            ii2++
                                                        ) {
                                                            if (
                                                                shi5[ii2].id ==
                                                                wantdao[ii]
                                                            ) {
                                                                min[0] =
                                                                    this.getPointNum(
                                                                        min[0],
                                                                        shi5[
                                                                            ii2
                                                                        ]
                                                                            .xsnumber
                                                                    );
                                                                break;
                                                            }
                                                        }
                                                        if (!min[0]) {
                                                            min[0] = 0;
                                                        }

                                                        $(
                                                            $(b)
                                                                .find(
                                                                    '.datareadyfoot'
                                                                )
                                                                .parent()[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[
                                                            wantdao[ii]
                                                        ].innerHTML = min[0];
                                                    }
                                                }
                                            }
                                            if (sumdata1[i] == 'max') {
                                                let max = [];
                                                for (
                                                    let i2 = 0;
                                                    i2 < this.footarr.length;
                                                    i2++
                                                ) {
                                                    if (
                                                        this.footarr[i2][1] ==
                                                        wantdao[ii]
                                                    ) {
                                                        if (
                                                            !isNaN(
                                                                parseFloat(
                                                                    this
                                                                        .footarr[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            )
                                                        ) {
                                                            max.push(
                                                                parseFloat(
                                                                    this
                                                                        .footarr[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            );
                                                        }
                                                    }
                                                }
                                                max.sort(function (a, b) {
                                                    return a - b;
                                                });
                                                if (!max[max.length - 1]) {
                                                    max[max.length - 1] = 0;
                                                }
                                                if (
                                                    Number(
                                                        $(
                                                            $(b)
                                                                .find(
                                                                    '.datareadyfoot'
                                                                )
                                                                .parent()[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[wantdao[ii]].innerHTML
                                                    ) +
                                                        '' !==
                                                    NaN + ''
                                                ) {
                                                    if (
                                                        max[max.length - 1] ==
                                                        'undefined'
                                                    ) {
                                                        $(
                                                            $(b)
                                                                .find(
                                                                    '.datareadyfoot'
                                                                )
                                                                .parent()[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[
                                                            wantdao[ii]
                                                        ].innerHTML = 0;
                                                    } else {
                                                        for (
                                                            let ii2 = 0;
                                                            ii2 < shi5.length;
                                                            ii2++
                                                        ) {
                                                            if (
                                                                shi5[ii2].id ==
                                                                wantdao[ii]
                                                            ) {
                                                                max[
                                                                    max.length -
                                                                        1
                                                                ] = this.getPointNum(
                                                                    max[
                                                                        max.length -
                                                                            1
                                                                    ],
                                                                    shi5[ii2]
                                                                        .xsnumber
                                                                );
                                                                break;
                                                            }
                                                        }

                                                        $(
                                                            $(b)
                                                                .find(
                                                                    '.datareadyfoot'
                                                                )
                                                                .parent()[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[
                                                            wantdao[ii]
                                                        ].innerHTML =
                                                            max[max.length - 1];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            this.cavantable[dc] = JSON.parse(nowdai);
                            this.cavantable[dc].daochutable = adiv;
                        } else {
                            this.$emit('percentage1', 100);

                            await this.delay(10);
                        }
                        console.log('data5', new Date());
                        //    let cc1  = $(b).find('td').length
                        //   for(let cc =0;cc<cc1;cc++){
                        //      if(($(b).find('td')[cc])){
                        //      if($($(b).find('td')[cc])[0].style.display == 'none'||$($(b).find('td')[cc]).attr('showtd')){
                        //          $($(b).find('td')[cc]).addClass('delclass')
                        //         //   cc--
                        //       }

                        //       if($($(b).find('td')[cc]).hasClass('item')){
                        //            if(!$(b).find('td')[cc].style.backgroundColor){
                        //                   $($(b).find('td')[cc]).css('background','#F9DEE0')
                        //                }
                        //        if(!$(b).find('td')[cc].style.color){
                        //                  $($(b).find('td')[cc]).css('color','#EF3460')
                        //                }
                        //       }
                        //    if($($(b).find('td')[cc]).attr('colspan')==1){
                        //         $($(b).find('td')[cc]).removeAttr("colspan")
                        //       }
                        //         if($($(b).find('td')[cc]).attr('rowspan')==1){
                        //         $($(b).find('td')[cc]).removeAttr("rowspan")
                        //       }
                        //      }

                        //   }
                        // for(let cc =0;cc<$(b).find('.heibin').length;cc++){
                        // for(let cc1 =0;cc1<$($(b).find('.heibin')[cc]).attr('name').split(',').length;cc1++){
                        // 	if($($(b).find('.heibin')[cc]).attr('name').split(',')[cc1]){
                        // 		$($(b).find('#'+$($(b).find('.heibin')[cc]).attr('name').split(',')[cc1])[0]).remove()

                        // 	}
                        // }
                        // }
                        let name = [];
                        for (
                            let cc = 0;
                            cc < $(b).find('.heibin').length;
                            cc++
                        ) {
                            for (
                                let cc1 = 0;
                                cc1 <
                                $($(b).find('.heibin')[cc])
                                    .attr('name')
                                    .split(',').length;
                                cc1++
                            ) {
                                if (
                                    $($(b).find('.heibin')[cc])
                                        .attr('name')
                                        .split(',')[cc1]
                                ) {
                                    let bb = $(b).find(
                                        '#' +
                                            $($(b).find('.heibin')[cc])
                                                .attr('name')
                                                .split(',')[cc1]
                                    ).length;
                                    for (let cc2 = 0; cc2 < bb; cc2++) {
                                        if (
                                            !name.includes(
                                                $($(b).find('.heibin')[cc])
                                                    .attr('name')
                                                    .split(',')[cc1]
                                            )
                                        ) {
                                            name.push(
                                                $($(b).find('.heibin')[cc])
                                                    .attr('name')
                                                    .split(',')[cc1]
                                            );
                                            $(
                                                $(b).find(
                                                    '#' +
                                                        $(
                                                            $(b).find(
                                                                '.heibin'
                                                            )[cc]
                                                        )
                                                            .attr('name')
                                                            .split(',')[cc1]
                                                )[0]
                                            ).remove();
                                        }
                                    }
                                }
                            }
                        }
                        let width = [];
                        for (let c1 = 0; c1 < $(b).find('col').length; c1++) {
                            let a = {
                                wpx: parseFloat(
                                    $($(b).find('col')[c1]).attr('width')
                                ),
                            };
                            width.push(a);
                        }
                        let height = [];
                        for (let c1 = 0; c1 < $(b).find('tr').length; c1++) {
                            let a = {
                                hpx: parseFloat(
                                    $($(b).find('tr')[c1]).height()
                                ),
                            };
                            height.push(a);
                        }

                        await this.delay(10);
                        this.$emit('percentage1', 100);
                        await this.delay(10);
                        //   $('.report').append(b)
                        //   $('#ParameterReport4').hide()
                        this.$store.state.isShow = false;
                        console.log('data1', new Date());
                        // for(let i23 = 1;i23<10;i23++){
                        //     await this.delay(i23)
                        //      this.$emit('percentage1',80+parseFloat(i23*2))
                        // }

                        $(b)
                            .find('tbody tr td')
                            .css({ 'background-color': '#fff', color: '#000' });

                        import('@/vendor/Export3Excel').then((excel) => {
                            excel.export_table_to_excel(b, width, height);
                            if (dc == dcnum - 1 || dcnum == 1) {
                                this.$store.state.isShow = false;
                                $('.btablecover').hide();
                                console.log(
                                    'data3',
                                    Date.parse(new Date()),
                                    new Date()
                                );
                            }
                        });
                    } else if (daiti.kzdirection == '横向扩展') {
                        let adiv = this.cavantable[dc].daochutable;
                        xzdata = Math.floor(
                            this.cavantable[dc].data.length /
                                this.cavantable[dc].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length -
                                parseFloat(
                                    this.cavantable[dc].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray.startx
                                )
                        );
                        let a = $(this.cavantable[dc].daochutable)[0].cloneNode(
                            true
                        );
                        console.log(
                            'clone',
                            $('#' + this.cavantable[dc].Name).find('table')[0]
                        );
                        let b = $(this.cavantable[dc].daochutable)[0].cloneNode(
                            true
                        );
                        for (
                            let a1 = 0;
                            a1 < $(b).find('.heibin').length;
                            a1++
                        ) {
                            if (
                                parseFloat(
                                    $(b).find('.heibin')[a1].id.split('-')[1]
                                ) <
                                    parseFloat(
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    ) &&
                                parseFloat(
                                    $(b).find('.heibin')[a1].id.split('-')[0]
                                ) >
                                    parseFloat(
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    )
                            ) {
                                if (
                                    parseFloat(
                                        $(b)
                                            .find('.heibin')
                                            [a1].id.split('-')[1]
                                    ) +
                                        parseFloat(
                                            $($('.heibin')[a1]).attr('rowspan')
                                        ) >
                                    parseFloat(
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    )
                                ) {
                                    let c = parseFloat(
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    );
                                    $($(b).find('.heibin')[a1]).attr(
                                        'rowspan',
                                        c
                                    );
                                    for (
                                        let a2 = 0;
                                        a2 <
                                        $($(b).find('.heibin')[a1])
                                            .attr('name')
                                            .split(',').length;
                                        a2++
                                    ) {
                                        let c1 = $($(b).find('.heibin')[a1])
                                            .attr('name')
                                            .split(',')[a2];
                                        if (c1) {
                                            if (
                                                this.cavantable[
                                                    dc
                                                ].shi5.includes(
                                                    $('#' + c1)[0].id.split(
                                                        '-'
                                                    )[1]
                                                )
                                            ) {
                                                $($(b).find('.heibin')[a1])
                                                    .find('#' + c1)
                                                    .show();
                                            }
                                        }
                                    }
                                    console.log(
                                        'sadsadsad',
                                        $($(b).find('.heibin')[a1])
                                    );
                                }
                            }
                        }
                        console.log(this.cavantable[dc]);
                        for (let cc = 0; cc < $(a).find('td').length; cc++) {
                            if (
                                !$($($(a).find('td')[cc])[0]).hasClass(
                                    'datareadyhead'
                                ) &&
                                !$($($(a).find('td')[cc])[0]).hasClass(
                                    'dataready'
                                ) &&
                                !$($($(a).find('td')[cc])[0]).hasClass(
                                    'datareadyfoot'
                                )
                            ) {
                                if (
                                    $($(a).find('td')[cc])[0].style.display ==
                                        'none' ||
                                    $($(a).find('td')[cc]).attr('showtd')
                                ) {
                                    $($(a).find('td')[cc]).remove();
                                    cc--;
                                }
                            }
                            if ($($(a).find('td')[cc]).hasClass('item')) {
                                if (
                                    !$(a).find('td')[cc].style.backgroundColor
                                ) {
                                    $($(a).find('td')[cc]).css(
                                        'background',
                                        '#F9DEE0'
                                    );
                                }
                                if (!$(a).find('td')[cc].style.color) {
                                    $($(a).find('td')[cc]).css(
                                        'color',
                                        '#EF3460'
                                    );
                                }
                            }
                            if ($($(a).find('td')[cc]).attr('colspan') == 1) {
                                $($(a).find('td')[cc]).removeAttr('colspan');
                            }

                            if ($($(a).find('td')[cc]).attr('rowspan') == 1) {
                                $($(a).find('td')[cc]).removeAttr('rowspan');
                            }
                        }
                        for (let cc = 0; cc < $(b).find('td').length; cc++) {
                            if (
                                !$($($(b).find('td')[cc])[0]).hasClass(
                                    'datareadyhead'
                                ) &&
                                !$($($(b).find('td')[cc])[0]).hasClass(
                                    'dataready'
                                ) &&
                                !$($($(b).find('td')[cc])[0]).hasClass(
                                    'datareadyfoot'
                                )
                            ) {
                                if (
                                    $($(b).find('td')[cc])[0].style.display ==
                                        'none' ||
                                    $($(b).find('td')[cc]).attr('showtd')
                                ) {
                                    $($(b).find('td')[cc]).remove();
                                    cc--;
                                }
                            }
                            if ($($(b).find('td')[cc]).hasClass('item')) {
                                if (
                                    !$(b).find('td')[cc].style.backgroundColor
                                ) {
                                    //   $($(b).find('td')[cc]).css('background','#F9DEE0')
                                }
                                if (!$(b).find('td')[cc].style.color) {
                                    //  $($(b).find('td')[cc]).css('color','#EF3460')
                                }
                            }
                            if ($($(b).find('td')[cc]).attr('colspan') == 1) {
                                $($(b).find('td')[cc]).removeAttr('colspan');
                            }

                            if ($($(b).find('td')[cc]).attr('rowspan') == 1) {
                                $($(b).find('td')[cc]).removeAttr('rowspan');
                            }
                        }
                        if (
                            this.cavantable[dc].numpage !== 1 &&
                            $('#' + this.cavantable[dc].Name + 'page')[0]
                        ) {
                            // console.log("sadasddsadsaasd")
                            for (
                                let ai = 0;
                                ai <
                                this.cavantable[dc].ParameterReportItemtList.dd
                                    .cellparaarray.length;
                                ai++
                            ) {
                                $(b).find(
                                    '#' +
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .cellparaarray[ai].id
                                )[0].innerHTML = $(
                                    '#' + this.cavantable[dc].Name
                                ).find(
                                    '#' +
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .cellparaarray[ai].id
                                )[0].innerHTML;
                            }

                            let div = document.createElement('table');
                            let length = $(a).find('.daochu').length;
                            for (let i1 = 0; i1 < length; i1++) {
                                let a1 = 0;
                                div.append($(a).find('.daochu')[a1]);
                            }
                            this.deltable(div);
                            let div1 = $(div)[0].cloneNode(true);
                            let sumdata1 = daiti.kzsummotype.split(',');
                            let length1 = $($(div).find('tr')[0]).find(
                                'input'
                            ).length;
                            let shi5 = this.cavantable[dc].shi5;
                            let shi6 = this.cavantable[dc].shi6;
                            for (
                                let num = 0;
                                num < this.cavantable[dc].numpage - 1;
                                num++
                            ) {
                                for (
                                    let i1 = 0;
                                    i1 <
                                    $($(div1).find('tr')[0]).find('td').length;
                                    i1++
                                ) {
                                    for (
                                        let i2 = 0;
                                        i2 < $(div1).find('tr').length;
                                        i2++
                                    ) {
                                        let c = $(div1)[0].cloneNode(true);
                                        $($(b).find('.daochu')[i2])
                                            .find('.dataready')
                                            [
                                                $(
                                                    $(b).find('.daochu')[i2]
                                                ).find('.dataready').length - 1
                                            ].after(
                                                $($(c).find('tr')[i2]).find(
                                                    'td'
                                                )[i1]
                                            );
                                    }
                                }

                                this.$emit(
                                    'percentage1',
                                    parseInt(
                                        70 /
                                            (this.cavantable[dc].numpage -
                                                1 -
                                                num)
                                    )
                                );

                                await this.delay(num);
                            }
                            let y1 = $(div).find('input').length;
                            let shengxiadata =
                                y1 * this.cavantable[dc].numpage -
                                this.cavantable[dc].data.length;
                            for (let i = 0; i < shengxiadata; i++) {
                                this.cavantable[dc].data.push({
                                    value: null,
                                });
                            }
                            let nowi2 = 0;
                            for (
                                let col = 0;
                                col <
                                $($(b).find('.daochu')[0]).find('.dataready')
                                    .length;
                                col++
                            ) {
                                let row = 0;
                                for (row = 0; row < length; row++) {
                                    let an = nowi2;
                                    if (
                                        $($(b).find('.daochu')[row]).find(
                                            'input'
                                        )[col].id !== 'undefined'
                                    ) {
                                        let xnumber = '';
                                        var de = '';
                                        itemformat = null;

                                        for (
                                            let i1 = 0;
                                            i1 < shi5.length;
                                            i1++
                                        ) {
                                            if (
                                                shi5[i1].id ==
                                                row +
                                                    parseInt(
                                                        this.cavantable[dc]
                                                            .ParameterReportItemtList
                                                            .dd.startpoy
                                                    )
                                            ) {
                                                //     console.log(   $(
                                                //     $(b).find('.daochu')[row]
                                                // ).find('input')[
                                                //     col
                                                // ])
                                                xnumber = shi5[i1].xsnumber;
                                                de = shi5[i1].defauldisplay;
                                                break;
                                            }
                                        }
                                        console.log(shi6);
                                        for (
                                            let i1 = 0;
                                            i1 < shi6.length;
                                            i1++
                                        ) {
                                            if (
                                                shi6[i1].id ==
                                                row +
                                                    parseInt(
                                                        this.cavantable[dc]
                                                            .ParameterReportItemtList
                                                            .dd.startpoy
                                                    )
                                            ) {
                                                itemformat =
                                                    shi6[i1].itemformat;
                                                break;
                                            }
                                        }

                                        if (xnumber !== '') {
                                            var aaa;
                                            if (
                                                !this.getPointNum(
                                                    this.cavantable[dc].data[an]
                                                        .value,
                                                    xnumber
                                                ) ||
                                                this.getPointNum(
                                                    this.cavantable[dc].data[an]
                                                        .value,
                                                    xnumber
                                                ) == 'null'
                                            ) {
                                                aaa = '';
                                            } else {
                                                console.log(
                                                    'asddassaddsaasddsa',
                                                    xnumber
                                                );
                                                console.log(shi5);

                                                aaa = this.getPointNum(
                                                    this.cavantable[dc].data[an]
                                                        .value,
                                                    xnumber
                                                );
                                            }

                                            if (!aaa) {
                                                if (de !== '') {
                                                    if (
                                                        de == 'null' ||
                                                        de == 'undefine' ||
                                                        de == null ||
                                                        de == undefined
                                                    ) {
                                                        de = '';
                                                    }
                                                    if (col <= xzdata) {
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[row]
                                                        ).find('input')[
                                                            col
                                                        ].value = de;
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[row]
                                                        )
                                                            .find('input')
                                                            [col].setAttribute(
                                                                'value',
                                                                de
                                                            );
                                                    }
                                                } else {
                                                    $(
                                                        $(b).find('.daochu')[
                                                            row
                                                        ]
                                                    ).find('input')[
                                                        col
                                                    ].value = 1;
                                                    $($(b).find('.daochu')[row])
                                                        .find('input')
                                                        [col].setAttribute(
                                                            'value',
                                                            1
                                                        );
                                                }
                                            } else {
                                                $(
                                                    $(b).find('.daochu')[row]
                                                ).find('input')[col].value =
                                                    aaa;

                                                $($(b).find('.daochu')[row])
                                                    .find('input')
                                                    [col].setAttribute(
                                                        'value',
                                                        aaa
                                                    );
                                            }
                                        } else {
                                            $($(b).find('.daochu')[row]).find(
                                                'input'
                                            )[col].value =
                                                this.cavantable[dc].data[
                                                    an
                                                ].value;
                                            $($(b).find('.daochu')[row])
                                                .find('input')
                                                [col].setAttribute(
                                                    'value',
                                                    this.cavantable[dc].data[an]
                                                        .value
                                                );
                                        }
                                    } else {
                                        let aaa;
                                        this.cavantable[dc].data.splice(an, 0, {
                                            value: null,
                                        });
                                        if (
                                            this.cavantable[dc].data[an]
                                                .value == null ||
                                            this.cavantable[dc].data[an]
                                                .value == 'null' ||
                                            this.cavantable[dc].data[an]
                                                .value == ''
                                        ) {
                                            aaa = '';
                                        } else {
                                            aaa =
                                                this.cavantable[dc].data[an]
                                                    .value;
                                        }
                                        let de = '';
                                        for (
                                            let i1 = 0;
                                            i1 < shi5.length;
                                            i1++
                                        ) {
                                            if (
                                                shi5[i1].id ==
                                                row + shi5[0].id
                                            ) {
                                                de = shi5[i1].defauldisplay;
                                                break;
                                            } else {
                                                de = '';
                                            }
                                        }
                                        if (aaa == '') {
                                            if (de !== '') {
                                                if (
                                                    de == 'null' ||
                                                    de == 'undefine' ||
                                                    de == null ||
                                                    de == undefined
                                                ) {
                                                    de = '';
                                                }
                                                $(
                                                    $(b).find('.daochu')[row]
                                                ).find('input')[col].value = de;
                                                $($(b).find('.daochu')[row])
                                                    .find('input')
                                                    [col].setAttribute(
                                                        'value',
                                                        de
                                                    );
                                            } else {
                                                $(
                                                    $(b).find('.daochu')[row]
                                                ).find('input')[col].value =
                                                    aaa;
                                                $($(b).find('.daochu')[row])
                                                    .find('input')
                                                    [col].setAttribute(
                                                        'value',
                                                        aaa
                                                    );
                                            }
                                        } else {
                                            $($(b).find('.daochu')[row]).find(
                                                'input'
                                            )[col].value = aaa;
                                            $($(b).find('.daochu')[row])
                                                .find('input')
                                                [col].setAttribute(
                                                    'value',
                                                    aaa
                                                );
                                        }
                                    }
                                    if (
                                        $($(b).find('.daochu')[row]).find(
                                            'input'
                                        )[col].value
                                    ) {
                                        if (itemformat) {
                                            let aaa1 = this.dateFormat(
                                                itemformat,
                                                $(
                                                    $(b).find('.daochu')[row]
                                                ).find('input')[col].value
                                            );
                                            if (aaa1) {
                                                $(
                                                    $(b).find('.daochu')[row]
                                                ).find('input')[col].value =
                                                    aaa1;
                                                $($(b).find('.daochu')[row])
                                                    .find('input')
                                                    [col].setAttribute(
                                                        'value',
                                                        aaa1
                                                    );
                                            }
                                        }
                                    }
                                    length;
                                    nowi2++;
                                    this.$emit(
                                        'percentage1',
                                        parseInt(
                                            30 *
                                                ((col * length + row) /
                                                    ($(
                                                        $(b).find('.daochu')[0]
                                                    ).find('.dataready')
                                                        .length *
                                                        length))
                                        ) + 70
                                    );
                                    await this.delay(col, 0.1);
                                }

                                //  this.$emit('percentage1',(parseInt((25/( $($(b).find('.daochu')[0]).find( '.dataready').length-col))+70)))
                            }

                            if (sumdata1.length !== 0) {
                                for (let i1 = 0; i1 < sumdata1.length; i1++) {
                                    if (sumdata1[i1] == 'sum') {
                                        for (
                                            let i = 0;
                                            i < $(b).find('.daochu').length;
                                            i++
                                        ) {
                                            let sumdao = 0;
                                            for (
                                                let j = 0;
                                                j <
                                                $($(b).find('.daochu')[i]).find(
                                                    'input'
                                                ).length;
                                                j++
                                            ) {
                                                if (
                                                    !isNaN(
                                                        parseFloat(
                                                            $(
                                                                $(b).find(
                                                                    '.daochu'
                                                                )[i]
                                                            ).find('input')[j]
                                                                .value
                                                        )
                                                    ) &&
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('input')[j].value !==
                                                        null
                                                ) {
                                                    sumdao =
                                                        sumdao +
                                                        parseFloat(
                                                            $(
                                                                $(b).find(
                                                                    '.daochu'
                                                                )[i]
                                                            ).find('input')[j]
                                                                .value
                                                        );
                                                }
                                            }
                                            if (!sumdao) {
                                                sumdao = 0;
                                            }
                                            if (
                                                $($(b).find('.daochu')[i]).find(
                                                    '.datareadyfoot'
                                                )[i1].innerHTML !== '' &&
                                                $($(b).find('.daochu')[i]).find(
                                                    '.datareadyfoot'
                                                )[i1].innerHTML !== '\\'
                                            ) {
                                                for (
                                                    let ii2 = 0;
                                                    ii2 < shi5.length;
                                                    ii2++
                                                ) {
                                                    if (
                                                        shi5[ii2].id ==
                                                        i +
                                                            parseInt(
                                                                this.cavantable[
                                                                    dc
                                                                ]
                                                                    .ParameterReportItemtList
                                                                    .dd.startpoy
                                                            )
                                                    ) {
                                                        sumdao =
                                                            this.getPointNum(
                                                                sumdao,
                                                                shi5[ii2]
                                                                    .xsnumber
                                                            );
                                                        break;
                                                    }
                                                }
                                                if (
                                                    Number(
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML
                                                    ) +
                                                        '' !==
                                                    NaN + ''
                                                ) {
                                                    if (!sumdao) {
                                                        sumdao = 0;
                                                    }
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('.datareadyfoot')[
                                                        i1
                                                    ].innerHTML = sumdao;
                                                }
                                            }
                                        }
                                    }
                                    if (sumdata1[i1] == 'mean') {
                                        for (
                                            let i = 0;
                                            i < $(b).find('.daochu').length;
                                            i++
                                        ) {
                                            let sumdao = 0;
                                            let mean = 0;
                                            for (
                                                let j = 0;
                                                j <
                                                $($(b).find('.daochu')[i]).find(
                                                    'input'
                                                ).length;
                                                j++
                                            ) {
                                                if (
                                                    !isNaN(
                                                        parseFloat(
                                                            $(
                                                                $(b).find(
                                                                    '.daochu'
                                                                )[i]
                                                            ).find('input')[j]
                                                                .value
                                                        )
                                                    ) &&
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('input')[j].value !==
                                                        null
                                                ) {
                                                    sumdao =
                                                        sumdao +
                                                        parseFloat(
                                                            $(
                                                                $(b).find(
                                                                    '.daochu'
                                                                )[i]
                                                            ).find('input')[j]
                                                                .value
                                                        );
                                                    mean++;
                                                }
                                            }
                                            let meandata = sumdao / mean;
                                            for (
                                                let ii2 = 0;
                                                ii2 < shi5.length;
                                                ii2++
                                            ) {
                                                if (
                                                    shi5[ii2].id ==
                                                    i +
                                                        parseInt(
                                                            this.cavantable[dc]
                                                                .ParameterReportItemtList
                                                                .dd.startpoy
                                                        )
                                                ) {
                                                    meandata = this.getPointNum(
                                                        meandata,
                                                        shi5[ii2].xsnumber
                                                    );
                                                    break;
                                                }
                                            }
                                            if (
                                                $($(b).find('.daochu')[i]).find(
                                                    '.datareadyfoot'
                                                )[i1].innerHTML !== '' &&
                                                $($(b).find('.daochu')[i]).find(
                                                    '.datareadyfoot'
                                                )[i1].innerHTML !== '\\'
                                            ) {
                                                if (
                                                    isNaN(meandata) ||
                                                    meandata == undefined
                                                ) {
                                                    meandata = 0;
                                                }
                                                if (
                                                    Number(
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML
                                                    ) +
                                                        '' !==
                                                    NaN + ''
                                                ) {
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('.datareadyfoot')[
                                                        i1
                                                    ].innerHTML = meandata;
                                                }
                                            }
                                        }
                                    }
                                    if (sumdata1[i1] == 'max') {
                                        for (
                                            let i = 0;
                                            i < $(b).find('.daochu').length;
                                            i++
                                        ) {
                                            let max = [];
                                            for (
                                                let j = 0;
                                                j <
                                                $($(b).find('.daochu')[i]).find(
                                                    'input'
                                                ).length;
                                                j++
                                            ) {
                                                if (
                                                    !isNaN(
                                                        parseFloat(
                                                            $(
                                                                $(b).find(
                                                                    '.daochu'
                                                                )[i]
                                                            ).find('input')[j]
                                                                .value
                                                        )
                                                    ) &&
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('input')[j].value !==
                                                        null
                                                ) {
                                                    max.push(
                                                        parseFloat(
                                                            $(
                                                                $(b).find(
                                                                    '.daochu'
                                                                )[i]
                                                            ).find('input')[j]
                                                                .value
                                                        )
                                                    );
                                                }
                                                max.sort(function (a, b) {
                                                    return a - b;
                                                });
                                            }
                                            if (
                                                $($(b).find('.daochu')[i]).find(
                                                    '.datareadyfoot'
                                                )[i1].innerHTML !== '' &&
                                                $($(b).find('.daochu')[i]).find(
                                                    '.datareadyfoot'
                                                )[i1].innerHTML !== '\\'
                                            ) {
                                                if (
                                                    Number(
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML
                                                    ) +
                                                        '' !==
                                                    NaN + ''
                                                ) {
                                                    if (
                                                        max[max.length - 1] ==
                                                            'undefined' ||
                                                        max[max.length - 1] ==
                                                            undefined ||
                                                        isNaN(
                                                            max[max.length - 1]
                                                        )
                                                    ) {
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML = 0;
                                                    } else {
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML =
                                                            max[max.length - 1];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (sumdata1[i1] == 'min') {
                                        for (
                                            let i = 0;
                                            i < $(b).find('.daochu').length;
                                            i++
                                        ) {
                                            let max = [];
                                            for (
                                                let j = 0;
                                                j <
                                                $($(b).find('.daochu')[i]).find(
                                                    'input'
                                                ).length;
                                                j++
                                            ) {
                                                if (
                                                    !isNaN(
                                                        parseFloat(
                                                            $(
                                                                $(b).find(
                                                                    '.daochu'
                                                                )[i]
                                                            ).find('input')[j]
                                                                .value
                                                        )
                                                    ) &&
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('input')[j].value !==
                                                        null
                                                ) {
                                                    max.push(
                                                        parseFloat(
                                                            $(
                                                                $(b).find(
                                                                    '.daochu'
                                                                )[i]
                                                            ).find('input')[j]
                                                                .value
                                                        )
                                                    );
                                                }
                                                max.sort(function (a, b) {
                                                    return a - b;
                                                });
                                            }
                                            if (
                                                Number(
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('.datareadyfoot')[i1]
                                                        .innerHTML
                                                ) +
                                                    '' !==
                                                NaN + ''
                                            ) {
                                                if (
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('.datareadyfoot')[i1]
                                                        .innerHTML !== '' &&
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('.datareadyfoot')[i1]
                                                        .innerHTML !== '\\'
                                                ) {
                                                    if (
                                                        max[0] == 'undefined' ||
                                                        max[0] == undefined ||
                                                        isNaN(max[0])
                                                    ) {
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML = 0;
                                                    } else {
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML =
                                                            max[0];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        this.cavantable[dc] = JSON.parse(nowdai);
                        this.cavantable[dc].daochutable = adiv;
                        // for(let cc =0;cc<$(b).find('.heibin').length;cc++){
                        // 		for(let cc1 =0;cc1<$($(b).find('.heibin')[cc]).attr('name').split(',').length;cc1++){
                        // 			if($($(b).find('.heibin')[cc]).attr('name').split(',')[cc1]){
                        // 				let bb = $(b).find('#'+$($(b).find('.heibin')[cc]).attr('name').split(',')[cc1]).length
                        // 				for(let cc2 = 0;cc2<bb;cc2++){
                        // 					$($(b).find('#'+$($(b).find('.heibin')[cc]).attr('name').split(',')[cc1])[0]).remove()
                        // 				}
                        // 			}
                        //             }
                        // 		}

                        await this.delay(10);
                        this.$emit('percentage1', 100);
                        await this.delay(10);
                        console.log('结束2');
                        //    $('.report').append(b);

                        //    $("#"+this.cavantable[dc].Name).hide();
                        //  $("#ParameterReport22").hide();

                        // for(let i23 = 1;i23<10;i23++){
                        //             await this.delay(i23)
                        //              this.$emit('percentage1',80+parseFloat(i23*2))
                        //         }
                        let width1 = [];
                        for (
                            let a = parseFloat(
                                this.cavantable[dc].ParameterReportItemtList.dd
                                    .startpox
                            );
                            a <= this.cavantable[dc].endpox;
                            a++
                        ) {
                            let a1 = {
                                wpx: parseFloat(
                                    $($(b).find('col')[a]).attr('width')
                                ),
                            };
                            width1.push(a1);
                        }
                        let width = [];
                        for (let c1 = 0; c1 < $(b).find('col').length; c1++) {
                            let a = {
                                wpx: parseFloat(
                                    $($(b).find('col')[c1]).attr('width')
                                ),
                            };
                            width.push(a);
                        }
                        //   console.log("width1",width1)
                        //   console.log( this.cavantable[dc])
                        for (
                            let ai = 0;
                            ai < this.cavantable[dc].numpage;
                            ai++
                        ) {
                            width = this.insert(
                                width,
                                width1,
                                parseFloat(
                                    this.cavantable[dc].ParameterReportItemtList
                                        .dd.startpox
                                )
                            );
                        }

                        let height = [];
                        for (let c1 = 0; c1 < $(b).find('tr').length; c1++) {
                            let a = {
                                hpx: parseFloat(
                                    $($(b).find('tr')[c1]).height()
                                ),
                            };
                            height.push(a);
                        }
                        //   console.log("width",width)
                        //   console.log( this.cavantable[dc].numpage)
                        $(b)
                            .find('tbody tr td')
                            .css({ 'background-color': '#fff', color: '#000' });
                        import('@/vendor/Export3Excel.js').then((excel) => {
                            excel.export_table_to_excel(b, width, height);
                            if (dc == dcnum - 1 || dcnum == 1) {
                                this.$store.state.isShow = false;
                                $('.btablecover').hide();
                            }
                            console.log('data', new Date());
                        });
                    }

                    // }, 1000);
                }
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
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.top.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.height.replace('px', '')
                                ) +
                                2 +
                                'px';

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.left =
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.left.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.width.replace('px', '')
                                ) -
                                200 +
                                'px';
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
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.top.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.height.replace('px', '')
                                ) +
                                2 +
                                'px';

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.left =
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.left.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.width.replace('px', '')
                                ) -
                                200 +
                                'px';
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
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.top.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.height.replace('px', '')
                                ) +
                                2 +
                                'px';

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.left =
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.left.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.width.replace('px', '')
                                ) -
                                200 +
                                'px';
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

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.left =
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.left.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.width.replace('px', '')
                                ) -
                                200 +
                                'px';

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.top =
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.top.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.height.replace('px', '')
                                ) +
                                2 +
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

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.left =
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.left.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.width.replace('px', '')
                                ) -
                                200 +
                                'px';

                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.top =
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.top.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.height.replace('px', '')
                                ) +
                                2 +
                                'px';
                        } else {
                            $(
                                '#' + this.cavantable[is].Name + 'page'
                            )[0].style.left =
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.left.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[is].Name
                                    )[0].style.width.replace('px', '')
                                ) -
                                200 +
                                'px';

                            $(
                                '#' + this.cavantable[i].Name + 'page'
                            )[0].style.top =
                                Number(
                                    $(
                                        '#' + this.cavantable[i].Name
                                    )[0].style.top.replace('px', '')
                                ) +
                                Number(
                                    $(
                                        '#' + this.cavantable[i].Name
                                    )[0].style.height.replace('px', '')
                                ) +
                                2 +
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
                            console.log('是123', JSON.parse(res.data.data));

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

<style lang="scss">
</style>

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
.table-box{ height:100%;
    .jexcel-content{
        height:100%;
    }
}
</style>
