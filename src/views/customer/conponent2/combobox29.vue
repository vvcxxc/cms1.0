<!--
 * @Description: 这是下拉文本控件页面（组件）
 * @Date: 2019-11-18 15:00:18
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-15 11:23:24
 -->
<template>
    <div v-if="show">
        <div
            v-for="(item,key) in cavantable"
            :key="key"
            :id="item.Name"
            :style="'position:absolute;' + 'left:' + item.PropertyList.Left + 'px; top:' + item.PropertyList.Top  + 'px; width:'+ item.PropertyList.Width + 'px; height:'+ item.PropertyList.Height + 'px;'+'RotateAngle:'+item.PropertyList.RotateAngle+'Opacity:'+item.PropertyList.Opacity"
        >
            <div v-html="item.ParameterReportItemtList.dd.zhtml"></div>
        </div>
        <div class="tip12" ref="kongtiao2" v-if="tipchange" :class="{yd:pdyd3}">
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
        </div>
    </div>
</template>

<script>
import FileSaver from 'file-save';
import XLSX from 'xlsx';
export default {
    data() {
        return {
            tipword:'',
            textblockData: [],
            dataValue: [],
            show: false,
            one: 1,
            html: '',
            yh: 1,
            json: '',
            jsondata: '',
            shi5: [],
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
            cavantable: [],
            value3: ''
        };
    },
    props: ['dae'],
    watch: {
        dae: {
            handler(val) {
                this.Name = 'parameterreport';
                this.data = val;
                for (let c = 0; c < this.cavantable.length; c++) {
                    $('#' + this.cavantable[c].Name + 'page').remove();
                }
                if(val){
                    this.init();
                }
            }
        }
    },
    mounted() {
        this.data = this.dae;
        this.Name = 'parameterreport';
        this.init();
    },
    methods: {
        tip1() {
            this.tipchange = false;
        },
        dealWithData2(data) {
            let c = [];
            let d = {};
            data.forEach(element => {
                if (!d[element.timewd]) {
                    c.push({
                        timewd: element.timewd,
                        allData: [element]
                    });
                    d[element.timewd] = element;
                } else {
                    c.forEach(ele => {
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
            data.forEach(element => {
                if (!d[element.banciwd]) {
                    c.push({
                        banciwd: element.banciwd,
                        allData: [element]
                    });
                    d[element.banciwd] = element;
                } else {
                    c.forEach(ele => {
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
            data.forEach(element => {
                if (!d[element.resourcedataid]) {
                    c.push({
                        resourcedataid: element.resourcedataid,
                        allData: [element]
                    });
                    d[element.resourcedataid] = element;
                } else {
                    c.forEach(ele => {
                        if (ele.resourcedataid == element.resourcedataid) {
                            ele.allData.push(element);
                        }
                    });
                }
            });
            return c;
        },
        init() {
            //数据筛选
            this.textblockData = [];
            var dataAll = this.data.Controls.ControlList;
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

                let sumdata = this.cavantable[
                    i
                ].ParameterReportItemtList.dd.kzsummotype.split(',');
                if (
                    this.cavantable[i].ParameterReportItemtList.dd
                        .kzdirection == '纵向扩展'
                ) {
                    this.cavantable[i].shi2 = [];
                    this.cavantable[i].shi3 = [];
                    this.cavantable[i].shi5 = [];
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
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                iid2++
                            ) {
                                if (
                                    $('#' + this.cavantable[i].Name).find(
                                        '.datareadyhead'
                                    )[iid].id ==
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[iid2].id
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
                        ].ParameterReportItemtList.dd.kzresourcedataitemarray = dataarry;
                        for (
                            let j = 0;
                            j <
                            this.cavantable[i].ParameterReportItemtList.dd
                                .kzresourcedataitemarray.length;
                            j++
                        ) {
                            let shi2 = this.cavantable[
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
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata ==
                                    '序号' ||
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata ==
                                    '班次' ||
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata ==
                                    '归档时间'
                            ) {
                                let shi3 = this.cavantable[
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
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata !==
                                    '序号' &&
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata !==
                                    '班次' &&
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata !==
                                    '归档时间'
                            ) {
                                let shi5 = this.cavantable[
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
                                            .kzresourcedataitemarray[j].xsnumber
                                    ),
                                    defauldisplay: this.cavantable[i]
                                        .ParameterReportItemtList.dd
                                        .kzresourcedataitemarray[j]
                                        .defauldisplay
                                };
                                this.cavantable[i].shi5.push(a);
                            }
                        }
                    }

                    if (sumdata[0] !== '') {
                        var xnum = 0;
                        for (
                            let i2 = 0;
                            i2 <
                            $('#' + this.cavantable[i].Name).find('tr').length;
                            i2++
                        ) {
                            for (
                                let i3 = 0;
                                i3 <
                                $(
                                    $('#' + this.cavantable[i].Name).find('tr')[
                                        i2
                                    ]
                                ).find('td').length;
                                i3++
                            ) {
                                if (
                                    $(
                                        $(
                                            $(
                                                '#' + this.cavantable[i].Name
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
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .startpoy
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
                            $('#' + this.cavantable[i].Name).find('tr').length;
                            i2++
                        ) {
                            for (
                                let i3 = 0;
                                i3 <
                                $(
                                    $('#' + this.cavantable[i].Name).find('tr')[
                                        i2
                                    ]
                                ).find('td').length;
                                i3++
                            ) {
                                if (
                                    $(
                                        $(
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find('tr')[i2]
                                        ).find('td')[i3]
                                    ).hasClass('dataready')
                                ) {
                                    xnum1 = xnum1 + 1;
                                    break;
                                }
                            }
                        }
                        this.cavantable[i].endpoy =xnum1
                          
            
                        this.cavantable[i].nowy =
                            parseInt(
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .startpoy
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
                            let shi2 = this.cavantable[
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
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata ==
                                    '序号' ||
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata ==
                                    '班次' ||
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata ==
                                    '归档时间'
                            ) {
                                let shi3 = this.cavantable[
                                    i
                                ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                    j
                                ].id.split('-');
                                this.cavantable[i].shi3.push(parseInt(shi3[1]));
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
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata !==
                                    '序号' &&
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata !==
                                    '班次' &&
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray[j].itemdata !==
                                    '归档时间'
                            ) {
                                let shi5 = this.cavantable[
                                    i
                                ].ParameterReportItemtList.dd.kzresourcedataitemarray[
                                    j
                                ].id.split('-');
                                let a = {
                                    id: parseInt(shi5[1]),
                                    xsnumber: parseInt(
                                        this.cavantable[i]
                                            .ParameterReportItemtList.dd
                                            .kzresourcedataitemarray[j].xsnumber
                                    ),
                                    defauldisplay: this.cavantable[i]
                                        .ParameterReportItemtList.dd
                                        .kzresourcedataitemarray[j]
                                        .defauldisplay
                                };
                                this.cavantable[i].shi5.push(a);
                            }
                        }
                    }
                    // let sumdata = this.cavantable[i].ParameterReportItemtList.dd.split(",")
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
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.startpoy
                                ]
                            ).find('td').length;
                            i3++
                        ) {
                            if (
                                $(
                                    $(
                                        $('#' + this.cavantable[i].Name).find(
                                            'tr'
                                        )[
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
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.startpox
                                ) +
                                1 +
                                sumdata.length;
                        } else {
                            this.cavantable[i].nowx =
                                parseInt(
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.startpox
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
                        this.cavantable[i].nowdata = JSON.parse(adata).splice(
                            0,
                            this.cavantable[i].nowlength
                        );
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
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.startpoy
                                ]
                            ).find('td').length;
                            i3++
                        ) {
                            if (
                                $(
                                    $(
                                        $('#' + this.cavantable[i].Name).find(
                                            'tr'
                                        )[
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
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .startpox
                            ) + 1;
                        this.cavantable[i].nowlength =
                            this.cavantable[i].endpox *
                            this.cavantable[i].shi2.length;
                        this.cavantable[i].numpage = Math.ceil(
                            this.cavantable[i].data.length /
                                this.cavantable[i].nowlength
                        );
                        let adata = JSON.stringify(this.cavantable[i].data);
                        this.cavantable[i].nowdata = JSON.parse(adata).splice(
                            0,
                            this.cavantable[i].nowlength
                        );
                    }
                }

                if (this.cavantable[i].data.length !== 0) {
                    this.cavantable[i].page =
                        `<div class="page2" style="position:absolute" id="` +
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

            this.setbodydata(1);
        },

        getPointNum(num, n) {
            if (num == null) {
                let str = null;
                return str;
            } else {
                let str = String(num);
                if (str.indexOf('.') > -1) {
                    let index = str.indexOf('.');
                    let str1 = str.substring(0, index + n + 1);
                    str1 = Number(str1);
                    return str1;
                } else {
                    return str;
                }
            }
        },
        //    导出
        export(it) {
        
            for (let dc = 0; dc < this.cavantable.length; dc++) {
                if (
                    this.cavantable[dc].ParameterReportItemtList.dd
                        .dckongjian == it.class
                ) {
                       
                    this.$store.state.isShow = true;
                    setTimeout(() => {
                        if (this.cavantable[dc].data.length >= 10000) {
                            this.tipchange = true;
                            this.tipword =  this.lang.ReportForm_ExportDataUpTo10000;
                            this.pdyd3 = true;
                            return;
                        }

                        var nowdai = JSON.stringify(this.cavantable[dc]);
                        let daiti = this.cavantable[dc].ParameterReportItemtList
                            .dd;
                        if (daiti.kzdirection == '纵向扩展') {
                            let adiv = this.cavantable[dc].daochutable;
                            let a = $(
                                this.cavantable[dc].daochutable
                            )[0].cloneNode(true);
                            let b = $(
                                this.cavantable[dc].daochutable
                            )[0].cloneNode(true);
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

                            let div1 = $(div)[0].cloneNode(true);

                            for (
                                let i = 0;
                                i < $(div1).find('input').length;
                                i++
                            ) {
                                $(div1).find('input')[i].value = null;
                            }
                            let sumdata1 = daiti.kzsummotype.split(',');
                            let length1 = $($(div).find('tr')[0]).find('input')
                                .length;
                            let y1 = $(div).find('input').length;

                            let endlength;

                            if (daiti.kzsummopos !== '分布在前') {
                                endlength =
                                    parseInt(
                                        this.cavantable[dc]
                                            .ParameterReportItemtList.dd
                                            .startpoy
                                    ) + 1;
                            } else {
                                endlength = parseInt(length) + sumdata1.length;
                            }

                            let shi5 = this.cavantable[dc].shi5;
                            let lenght3;
                            for (
                                let cc1 = 1;
                                cc1 < this.cavantable[dc].numpage;
                                cc1++
                            ) {
                                lenght3 = length - 1;
                                for (let cc = 0; cc < length; cc++) {
                                    let div3 = $($(div1).find('tr'))[
                                        lenght3
                                    ].cloneNode(true);
                                    $($(b).find('#row-' + 9)[0]).after(div3);
                                    lenght3--;
                                }
                            }
                            let shengxiadata =
                                y1 * this.cavantable[dc].numpage -
                                this.cavantable[dc].data.length;
                            for (let i = 0; i < shengxiadata; i++) {
                                this.cavantable[dc].data.push({
                                    value: null
                                });
                            }

                            let now = this.cavantable[dc].nowy;
                            let length5 =
                                length * this.cavantable[dc].numpage + now;
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

                            if (daiti.kzsummopos == '分布在后') {
                                length5 -= sumnum;
                            }

                            if (this.cavantable[dc].numpage > 1) {
                                for (let ii = now; ii < length5; ii++) {
                                    for (let i2 = 0; i2 < length1; i2++) {
                                        let an = nowi2;

                                        if (
                                            $($(b).find('tr')[ii]).find(
                                                'input'
                                            )[i2].id !== 'undefined'
                                        ) {
                                            let xnumber = '';
                                            let de = '';
                                            for (
                                                let i1 = 0;
                                                i1 < shi5.length;
                                                i1++
                                            ) {
                                                if (shi5[i1].id == ((i2+shi5[0].id)-1)) {
                                                    xnumber = shi5[i1].xsnumber;
                                                    de = shi5[i1].defauldisplay;
                                                    break;
                                                } else {
                                                    xnumber = '';
                                                    de = '';
                                                }
                                            }
                                            let aaa;
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
                                                    ) == 'null'||
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
                                                if (aaa == null||aaa == '') {
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
                                                        $($(b).find('tr')[ii]).find('input')[i2].setAttribute(
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
                                                            .find('input')[i2].setAttribute(
                                                                'value',
                                                                aaa
                                                            );
                                                    }
                                                } else {
                                                    $($(b).find('tr')[ii]).find(
                                                        'input'
                                                    )[i2].value = aaa;
                                                    $($(b).find('tr')[ii])
                                                        .find('input')[i2].setAttribute(
                                                            'value',
                                                            aaa
                                                        );
                                                }
                                            } else {
                                                if (
                                                    this.cavantable[dc].data[an]
                                                        .value == null ||
                                                    
                                                        this.cavantable[dc]
                                                            .data[an].value
                                                     =='null'||
                                                    this.cavantable[dc].data[an].value == ''
                                                ) {
                                                    aaa = '';
                                                } else {
                                                    aaa = this.cavantable[dc]
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
                                                            .find('input')[i2].setAttribute(
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
                                                            .find('input')[i2].setAttribute(
                                                                'value',
                                                                aaa
                                                            );
                                                    }
                                                } else {
                                                    $($(b).find('tr')[ii]).find(
                                                        'input'
                                                    )[i2].value = aaa;
                                                    $($(b).find('tr')[ii])
                                                        .find('input')[i2].setAttribute(
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
                                                    value: null
                                                }
                                            );
                                            $($(b).find('tr')[ii]).find(
                                                'input'
                                            )[i2].value = this.cavantable[
                                                dc
                                            ].data[an].value;
                                            if (
                                                this.cavantable[dc].data[an]
                                                    .value == null ||
                                                this.cavantable[dc].data[an]
                                                    .value == 'null'|| this.cavantable[dc].data[an]
                                                    .value == ''
                                            ) {
                                                aaa = '';
                                            } else {
                                                aaa = this.cavantable[dc].data[
                                                    an
                                                ].value;
                                            }
                                            $($(b).find('tr')[ii])
                                                .find('input')[i2].setAttribute('value', aaa);
                                        }

                                        nowi2++;
                                    }

                                    nowii++;
                                }

                                let wantdao = [];

                                for (
                                    let a2 = 0;
                                    a2 <
                                    $(
                                        $(b)
                                            .find('.datareadyfoot')
                                            .parent()[0]
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
                                    for (
                                        let j = 0;
                                        j < this.cavantable[dc].data.length;
                                        j++
                                    ) {
                                        for (
                                            let j1 = 0;
                                            j1 < wantdao.length;
                                            j1++
                                        ) {
                                            if (j % length1 == wantdao[j1]) {
                                                let newarry1 = [];
                                                newarry1.push(
                                                    this.cavantable[dc].data[j]
                                                        .value,
                                                    wantdao[j1]
                                                );
                                                newarry.push(newarry1);
                                            }
                                        }
                                    }
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
                                            
                                                let sumdao = 0;
                                              
                                                for (
                                                    let i2 = 0;
                                                    i2 < newarry.length;
                                                    i2++
                                                ) {
                                                    if (
                                                        newarry[i2][1] ==
                                                        wantdao[ii]
                                                    ) {
                                                        if (
                                                            !isNaN(
                                                                parseFloat(
                                                                    newarry[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            )
                                                        ) {
                                                            let cd = 0
                                                           for(let iia=0;iia<this.cavantable[dc].shi5.length;iia++){
                                                               if(this.cavantable[dc].shi5[iia].id ==  wantdao[ii]){
                                                                    cd = this.getPointNum( newarry[i2][0],this.cavantable[dc].shi5[iia].xsnumber)
                                                               }
                                                           }
                                                            sumdao =
                                                                sumdao +
                                                                parseFloat(
                                                                  cd
                                                                );
                                                             
                                                        }
                                                    }
                                                }
                                                for (
                                                    let ii2 = 0;
                                                    ii2 < shi5.length;
                                                    ii2++
                                                ) {
                                                    if (
                                                        shi5[ii2].id ==
                                                        ((wantdao[ii]+shi5[0].id)-1)
                                                    ) {
                                                        sumdao = this.getPointNum(
                                                            sumdao,
                                                            shi5[ii2].xsnumber
                                                        );
                                                        break;
                                                    }
                                                }
                                                $(
                                                    $(b)
                                                        .find('.datareadyfoot')
                                                        .parent()[i]
                                                ).find('.datareadyfoot')[
                                                    wantdao[ii]
                                                ].innerHTML = sumdao;
                                            }
                                            if (sumdata1[i] == 'mean') {
                                                let sumdao = 0;
                                                let meandao = 0;
                                                for (
                                                    let i2 = 0;
                                                    i2 < newarry.length;
                                                    i2++
                                                ) {
                                                    if (
                                                        newarry[i2][1] ==
                                                        wantdao[ii]
                                                    ) {
                                                        if (
                                                            !isNaN(
                                                                parseFloat(
                                                                    newarry[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            )
                                                        ) {
                                                               let cd = 0
                                                           for(let iia=0;iia<this.cavantable[dc].shi5.length;iia++){
                                                               if(this.cavantable[dc].shi5[iia].id ==  wantdao[ii]){
                                                                    cd = this.getPointNum( newarry[i2][0],this.cavantable[dc].shi5[iia].xsnumber)
                                                               }
                                                           }
                                                         
                                                            sumdao =
                                                                sumdao +
                                                                parseFloat(
                                                                   cd
                                                                );
                                                            meandao++;
                                                        }
                                                    }
                                                }
                                                let mean = sumdao / meandao;
                                                for (
                                                    let ii2 = 0;
                                                    ii2 < shi5.length;
                                                    ii2++
                                                ) {
                                                    if (
                                                        shi5[ii2].id ==
                                                       ((wantdao[ii]+shi5[0].id)-1)
                                                    ) {
                                                        mean = this.getPointNum(
                                                            mean,
                                                            shi5[ii2].xsnumber
                                                        );
                                                        break;
                                                    }
                                                }
                                                if(isNaN(mean)){
                                                    mean = '';
                                                }
                                                $(
                                                    $(b)
                                                        .find('.datareadyfoot')
                                                        .parent()[i]
                                                ).find('.datareadyfoot')[
                                                    wantdao[ii]
                                                ].innerHTML = mean;
                                            }
                                            if (sumdata1[i] == 'min') {
                                                let min = [];
                                                for (
                                                    let i2 = 0;
                                                    i2 < newarry.length;
                                                    i2++
                                                ) {
                                                    if (
                                                        newarry[i2][1] ==
                                                        wantdao[ii]
                                                    ) {
                                                        if (
                                                            !isNaN(
                                                                parseFloat(
                                                                    newarry[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            )
                                                        ) {
                                                            min.push(
                                                                parseFloat(
                                                                    newarry[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            );
                                                        }
                                                    }
                                                }
                                                min.sort(function(a, b) {
                                                    return a - b;
                                                });
                                                if (min[0] == 'undefined') {
                                                    $(
                                                        $(b)
                                                            .find(
                                                                '.datareadyfoot'
                                                            )
                                                            .parent()[i]
                                                    ).find('.datareadyfoot')[
                                                        wantdao[ii]
                                                    ].innerHTML = null;
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
                                                            min[0] = this.getPointNum(
                                                                min[0],
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
                                                    ).find('.datareadyfoot')[
                                                        wantdao[ii]
                                                    ].innerHTML = min[0];
                                                }
                                            }
                                            if (sumdata1[i] == 'max') {
                                                let max = [];
                                                for (
                                                    let i2 = 0;
                                                    i2 < newarry.length;
                                                    i2++
                                                ) {
                                                    if (
                                                        newarry[i2][1] ==
                                                        wantdao[ii]
                                                    ) {
                                                        if (
                                                            !isNaN(
                                                                parseFloat(
                                                                    newarry[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            )
                                                        ) {
                                                            max.push(
                                                                parseFloat(
                                                                    newarry[
                                                                        i2
                                                                    ][0]
                                                                )
                                                            );
                                                        }
                                                    }
                                                }
                                                max.sort(function(a, b) {
                                                    return a - b;
                                                });
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
                                                    ).find('.datareadyfoot')[
                                                        wantdao[ii]
                                                    ].innerHTML = null;
                                                } else {
                                                    for (
                                                        let ii2 = 0;
                                                        ii2 < shi5.length;
                                                        ii2++
                                                    ) {
                                                        if (
                                                            shi5[ii2].id ==
                                                               ((wantdao[ii]+shi5[0].id)-1)
                                                        ) {
                                                            max[
                                                                max.length - 1
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
                                                    ).find('.datareadyfoot')[
                                                        wantdao[ii]
                                                    ].innerHTML =
                                                        max[max.length - 1];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            this.cavantable[dc] = JSON.parse(nowdai);
                            this.cavantable[dc].daochutable = adiv;
                            import('@/vendor/Export2Excel').then(excel => {
                                excel.export_table_to_excel(b);
                            });
                        } else {
                            let adiv = this.cavantable[dc].daochutable;
                            let a = $(
                                this.cavantable[dc].daochutable
                            )[0].cloneNode(true);
                            let b = $(
                                this.cavantable[dc].daochutable
                            )[0].cloneNode(true);
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
                            let length1 = $($(div).find('tr')[0]).find('input')
                                .length;
                            let shi5 = this.cavantable[dc].shi5;
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
                                            .find('.dataready')[
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
                            }
                            let y1 = $(div).find('input').length;
                            let shengxiadata =
                                y1 * this.cavantable[dc].numpage -
                                this.cavantable[dc].data.length;
                            for (let i = 0; i < shengxiadata; i++) {
                                this.cavantable[dc].data.push({
                                    value: null
                                });
                            }
                            if (this.cavantable[dc].numpage !== 1) {

                                let nowi2 = 0;
                                for (
                                    let col = 0;
                                    col <
                                    $($(b).find('.daochu')[0]).find(
                                        '.dataready'
                                    ).length;
                                    col++
                                ) {
                                    for (let row = 0; row < length; row++) {
                                        let an = nowi2;
                                     
                                        if (
                                            $($(b).find('.daochu')[row]).find(
                                                'input'
                                            )[col].id !== 'undefined'
                                        ) {
                                            let xnumber = '';
                                            var de = '';
                                            for (
                                                let i1 = 0;
                                                i1 < shi5.length;
                                                i1++
                                            ) {
                                                if (shi5[i1].id == ((row+shi5[0].id)-1)) {
                                                    xnumber = shi5[i1].xsnumber;
                                                    de = shi5[i1].defauldisplay;
                                                    break;
                                                } else {
                                                    xnumber = '';
                                                    de = '';
                                                }
                                            }
                                     
                                          
                                            if (xnumber !== '') {
                                                var aaa;
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
                                                    ) == 'null'
                                                ) {
                                                    aaa = '';
                                                } else {
                                                    aaa = this.getPointNum(
                                                        this.cavantable[dc]
                                                            .data[an].value,
                                                        xnumber
                                                    );
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
                                                            .find('input')[col].setAttribute(
                                                                'value',
                                                                de
                                                            );
                                                    } else {
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[row]
                                                        ).find('input')[
                                                            col
                                                        ].value = aaa;
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[row]
                                                        )
                                                            .find('input')[col].setAttribute(
                                                                'value',
                                                                aaa
                                                            );
                                                    }
                                                } else {
                                                    $(
                                                        $(b).find('.daochu')[
                                                            row
                                                        ]
                                                    ).find('input')[
                                                        col
                                                    ].value = aaa;
                                                   
                                                    $($(b).find('.daochu')[row])
                                                        .find('input')[col].setAttribute(
                                                            'value',
                                                            aaa
                                                        );
                                                }
                                            } else {
                                                $(
                                                    $(b).find('.daochu')[row]
                                                ).find('input')[
                                                    col
                                                ].value = this.cavantable[
                                                    dc
                                                ].data[an].value;
                                                $($(b).find('.daochu')[row])
                                                    .find('input')[col].setAttribute(
                                                        'value',
                                                        this.cavantable[dc]
                                                            .data[an].value
                                                    );
                                            }
                                        } else {
                                            let aaa;
                                            this.cavantable[dc].data.splice(
                                                an,
                                                0,
                                                {
                                                    value: null
                                                }
                                            );
                                            if (
                                                this.cavantable[dc].data[an]
                                                    .value == null ||
                                                this.cavantable[dc].data[an]
                                                    .value == 'null'||this.cavantable[dc].data[an]
                                                    .value == ''
                                            ) {
                                                aaa = '';
                                            } else {
                                                aaa = this.cavantable[dc].data[
                                                    an
                                                ].value;
                                            }
                                            let de = '';
                                            for (
                                                let i1 = 0;
                                                i1 < shi5.length;
                                                i1++
                                            ) {
                                                if (shi5[i1].id == (row+shi5[0].id)) {
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
                                                        $(b).find('.daochu')[
                                                            row
                                                        ]
                                                    ).find('input')[
                                                        col
                                                    ].value = de;
                                                    $($(b).find('.daochu')[row])
                                                        .find('input')[col].setAttribute(
                                                            'value',
                                                            de
                                                        );
                                                } else {
                                                    $(
                                                        $(b).find('.daochu')[
                                                            row
                                                        ]
                                                    ).find('input')[
                                                        col
                                                    ].value = aaa;
                                                    $($(b).find('.daochu')[row])
                                                        .find('input')[col].setAttribute(
                                                            'value',
                                                            aaa
                                                        );
                                                }
                                            } else {
                                                $(
                                                    $(b).find('.daochu')[row]
                                                ).find('input')[
                                                    col
                                                ].value = aaa;
                                                $($(b).find('.daochu')[row])
                                                    .find('input')[col].setAttribute(
                                                        'value',
                                                        aaa
                                                    );
                                            }
                                        }
                                        nowi2++;
                                    }
                                }

                                if (sumdata1.length !== 0) {
                                    for (
                                        let i1 = 0;
                                        i1 < sumdata1.length;
                                        i1++
                                    ) {
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
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('input').length;
                                                    j++
                                                ) {
                                                    if (
                                                        !isNaN(
                                                            parseFloat(
                                                                $(
                                                                    $(b).find(
                                                                        '.daochu'
                                                                    )[i]
                                                                ).find('input')[
                                                                    j
                                                                ].value
                                                            )
                                                        ) &&
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find('input')[j]
                                                            .value !== null
                                                    ) {
                                                        sumdao =
                                                            sumdao +
                                                            parseFloat(
                                                                $(
                                                                    $(b).find(
                                                                        '.daochu'
                                                                    )[i]
                                                                ).find('input')[
                                                                    j
                                                                ].value
                                                            );
                                                         
                                                    }
                                                }
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
                                                           for (
                                                    let ii2 = 0;
                                                    ii2 < shi5.length;
                                                    ii2++
                                                ) {
                                                    if (shi5[ii2].id == ((i+shi5[0].id)-1)) {
                                                        sumdao = this.getPointNum(
                                                            sumdao,
                                                            shi5[ii2].xsnumber
                                                        );
                                                        break;
                                                    }
                                                }
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('.datareadyfoot')[
                                                        i1
                                                    ].innerHTML = sumdao;
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
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('input').length;
                                                    j++
                                                ) {
                                                    if (
                                                        !isNaN(
                                                            parseFloat(
                                                                $(
                                                                    $(b).find(
                                                                        '.daochu'
                                                                    )[i]
                                                                ).find('input')[
                                                                    j
                                                                ].value
                                                            )
                                                        ) &&
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find('input')[j]
                                                            .value !== null
                                                    ) {
                                                       
                                                        sumdao =
                                                            sumdao +
                                                            parseFloat(
                                                                $(
                                                                    $(b).find(
                                                                        '.daochu'
                                                                    )[i]
                                                                ).find('input')[
                                                                    j
                                                                ].value
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
                                                    if (shi5[ii2].id == ((i+shi5[0].id)-1)) {
                                                        meandata = this.getPointNum(
                                                            meandata,
                                                            shi5[ii2].xsnumber
                                                        );
                                                        break;
                                                    }
                                                }
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
                                                    if(isNaN(meandata)){
                                                        meandata = '';
                                                    }
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('.datareadyfoot')[
                                                        i1
                                                    ].innerHTML = meandata;
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
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('input').length;
                                                    j++
                                                ) {
                                                    if (
                                                        !isNaN(
                                                            parseFloat(
                                                                $(
                                                                    $(b).find(
                                                                        '.daochu'
                                                                    )[i]
                                                                ).find('input')[
                                                                    j
                                                                ].value
                                                            )
                                                        ) &&
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find('input')[j]
                                                            .value !== null
                                                    ) {
                                                        max.push(
                                                            parseFloat(
                                                                $(
                                                                    $(b).find(
                                                                        '.daochu'
                                                                    )[i]
                                                                ).find('input')[
                                                                    j
                                                                ].value
                                                            )
                                                        );
                                                    }
                                                    max.sort(function(a, b) {
                                                        return a - b;
                                                    });
                                                }
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
                                                        max[max.length - 1] ==
                                                        'undefined'
                                                    ) {
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML = null;
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
                                                    $(
                                                        $(b).find('.daochu')[i]
                                                    ).find('input').length;
                                                    j++
                                                ) {
                                                    if (
                                                        !isNaN(
                                                            parseFloat(
                                                                $(
                                                                    $(b).find(
                                                                        '.daochu'
                                                                    )[i]
                                                                ).find('input')[
                                                                    j
                                                                ].value
                                                            )
                                                        ) &&
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find('input')[j]
                                                            .value !== null
                                                    ) {
                                                        max.push(
                                                            parseFloat(
                                                                $(
                                                                    $(b).find(
                                                                        '.daochu'
                                                                    )[i]
                                                                ).find('input')[
                                                                    j
                                                                ].value
                                                            )
                                                        );
                                                    }
                                                    max.sort(function(a, b) {
                                                        return a - b;
                                                    });
                                                }
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
                                                    if (max[0] == 'undefined') {
                                                        $(
                                                            $(b).find(
                                                                '.daochu'
                                                            )[i]
                                                        ).find(
                                                            '.datareadyfoot'
                                                        )[i1].innerHTML = null;
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
                            this.cavantable[dc] = JSON.parse(nowdai);
                            this.cavantable[dc].daochutable = adiv;
                        //    $('body').append(b);
                        //    $("#"+this.cavantable[dc].Name).hide();
                            import('@/vendor/Export2Excel').then(excel => {
                                excel.export_table_to_excel(b);
                            });
                        }
                        this.$store.state.isShow = false;
                    }, 1000);
                }
            }
        },
        //搜索
        search(a) {
       
            var wantnum;
            var end = {};
            for (let i = 0; i < this.cavantable.length; i++) {
                if (
                    this.cavantable[i].ParameterReportItemtList.dd.cfkongjian ==
                    a.class
                ) {
                    let wantdata = this.cavantable[i].ParameterReportItemtList
                        .dd;
                    wantnum = this.cavantable[i].ParameterReportItemtList.dd
                        .cellparaarray;
                    this.cavantable[i].sju = this.cavantable[
                        i
                    ].ParameterReportItemtList.dd.cellparaarray.filter(item => {
                        if (item.itemtype == '辅助项') {
                            return item;
                        }
                    });
                    wantnum = wantnum.filter(item => {
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
                       
                        if(end.starttime!==null){
                            if(new Date( end.starttime).getTime()>new Date(end.endtime).getTime()){
                               this.tipchange = true;
                            this.tipword = '开始时间不能大于结束时间!';
                            this.pdyd3 = true;
                            return;
                            }
                        }
                
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
                                      if(end.argwaibuparalist[j].starttime!==null){
                            if(new Date(end.argwaibuparalist[j].starttime).getTime()>new Date(end.argwaibuparalist[j].endtime).getTime()){
                               this.tipchange = true;
                            this.tipword = '开始时间不能大于结束时间!';
                            this.pdyd3 = true;
                            return;
                            }
                        }
                            } else if (
                                end.argwaibuparalist[j].kjtype == '文本'
                            ) {
                                  if($($('.' + end.argwaibuparalist[j].kjtext)[0]).find('input')[0].placeholder == '精确'){
                                    //   alert("s1")
                                 end.argwaibuparalist[j].matchtype = '精确匹配'
                            }else if($($('.' + end.argwaibuparalist[j].kjtext)[0]).find('input')[0].placeholder == '模糊'){
                                // alert('s')
                                      end.argwaibuparalist[j].matchtype = '模糊匹配'
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
                    }

                    let onenum = wantnum.filter(item => {
                        if (item.resource == '历史归档') {
                            return item;
                        }
                    });
                    let twonum = wantnum.filter(item => {
                        if (item.resource == '统计归档') {
                            return item;
                        }
                    });
                    let threenum = wantnum.filter(item => {
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
                            data: one
                        }).then(res => {
                              console.log('历史', res);
                         if (res.data.data == '无数据'||res.data.data=="[]") {
                            console.log('无数据');
                                   for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                                if(one.cellparalist[a2].defauldisplay!==null){
                                       $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML=this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                }else{
                                   $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = ''
                                }
                            }
                        } else {
                            let a = JSON.parse(res.data.data);
                            let ydata = [];
                       
                            for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                    
                                for (let a1 = 0; a1 < a.length; a1++) {
                                    
                                    if (one.cellparalist[a2].itemdata == a[a1].name &&one.cellparalist[a2].sumtype == a[a1].sumtype
                                    ) {
                                        console.log(one.cellparalist[a2])
                                        if (a[a1].value == null) {
                                        
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        } else {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                          
                                            )[0].innerHTML = this.getPointNum(
                                                a[a1].value,
                                              parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        }
                                    }  else if (
                                        one.cellparalist[a2].itemdata ==
                                        a[a1].name
                                    ) {
                                        // console.log("|asd",ydata)
                                   
                                        if (
                                            ydata.indexOf(
                                                one.cellparalist[a2].id
                                            ) > -1
                                        ) {
                                                console.log("222",ydata)
                                              console.log("ss2",  one.cellparalist[a2].id)
                                        } else {
                                            
                        
                                            if (a[a1].value == null) {
                                                $(
                                                    '#' +
                                                        this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                        one.cellparalist[a2].id
                                                )[0].innerHTML = this.getPointNum(
                                                    one.cellparalist[a2]
                                                        .defauldisplay,
                                                    parseInt(one.cellparalist[a2].xsnumber)
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
                                                      parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                           
                                            }
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
                            this.$axios({
                                method: 'post',
                                url: `/api/ParameterReport/SearchItemData`,
                                data: one
                            }).then(res => {
                                 console.log('历史', res);
                       if (res.data.data == '无数据'||res.data.data=="[]") {
                            console.log('无数据');
                                   for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                                if(one.cellparalist[a2].defauldisplay!==null){
                                       $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML=this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                }else{
                                   $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = ''
                                }
                            }
                        } else {
                            let a = JSON.parse(res.data.data);
                            let ydata = [];
                            for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                    
                                for (let a1 = 0; a1 < a.length; a1++) {
                                    
                                    if (one.cellparalist[a2].itemdata == a[a1].name &&one.cellparalist[a2].sumtype == a[a1].sumtype
                                    ) {
                                        if (a[a1].value == null) {
                                        
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        } else {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                          
                                            )[0].innerHTML = this.getPointNum(
                                                a[a1].value,
                                              parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        }
                                    }  else if (
                                        one.cellparalist[a2].itemdata ==
                                        a[a1].name
                                    ) {
                                        if (
                                            ydata.indexOf(
                                                one.cellparalist[a2].id
                                            ) > -1
                                        ) {
                                            console.log("ss")
                                        } else {
                                            if (a[a1].value == null) {
                                                $(
                                                    '#' +
                                                        this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                        one.cellparalist[a2].id
                                                )[0].innerHTML = this.getPointNum(
                                                    one.cellparalist[a2]
                                                        .defauldisplay,
                                                    parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                                ydata.push(
                                                    one.cellparalist[a2].id
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
                                                      parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                                ydata.push(
                                                    one.cellparalist[a2].id
                                                );
                                            }
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

                            this.$axios({
                                method: 'post',
                                url: `/api/ParameterReport/SearchItemData`,
                                data: one
                            }).then(res => {
                              
                            //   console.log(JSON.parse(res.data.data))
                                      console.log('历史', res);
                        if (res.data.data == '无数据'||res.data.data=="[]") {
                        
                            console.log('无数据');
                                   for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                                if(one.cellparalist[a2].defauldisplay!==null){
                                       $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML=this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                }else{
                                   $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = ''
                                }
                            }
                        } else {
                            let a = JSON.parse(res.data.data);
                            let ydata = [];
                            for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                    
                                for (let a1 = 0; a1 < a.length; a1++) {
                                    
                                    if (one.cellparalist[a2].itemdata == a[a1].name &&one.cellparalist[a2].sumtype == a[a1].sumtype
                                    ) {
                                        if (a[a1].value == null) {
                                        
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        } else {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                          
                                            )[0].innerHTML = this.getPointNum(
                                                a[a1].value,
                                              parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        }
                                    }  
                                    else if (
                                        one.cellparalist[a2].itemdata ==
                                        a[a1].name
                                    ) {
                                        if (
                                            ydata.indexOf(
                                                one.cellparalist[a2].id
                                            ) > -1
                                        ) {
                                            console.log("ss")
                                        } else {
                                            if (a[a1].value == null) {
                                                $(
                                                    '#' +
                                                        this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                        one.cellparalist[a2].id
                                                )[0].innerHTML = this.getPointNum(
                                                    one.cellparalist[a2]
                                                        .defauldisplay,
                                                    parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                                ydata.push(
                                                    one.cellparalist[a2].id
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
                                                      parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                                ydata.push(
                                                    one.cellparalist[a2].id
                                                );
                                            }
                                        }
                                    }
                                       
                                }
                            }
                        }
                            });
                        }
                    }
                  
                    this.$axios({
                        method: 'post',
                        url: `/api/ParameterReport/SearchExtensionData`,
                        data: end
                    })
                        .then(res => {
                         
                            console.log('22', res);
                           console.log("das",end)
                        
                           var a2 = [];
                             if (res.data.data !== '无数据') {
                               a2 = JSON.parse(res.data.data);
                                  var wantdata = JSON.stringify(a2);
                           }

                            if (
                                res.data.data == '无数据' ||
                                a2.length <= this.cavantable[i].nowlength||res.data.data =='[]'
                            ) {
                                //   alert("sad")
                                if (res.data.data == '无数据' || a2 == []) {
                                      
                                    this.cavantable[i].data = [];
                                    this.cavantable[i].nowdata = [];
                                    $(
                                        '#' + this.cavantable[i].Name + 'page'
                                    ).remove();
                                } else {
                                    this.cavantable[i].data = a2;
                                    this.cavantable[i].nowdata = a2;
                                    $(
                                        '#' + this.cavantable[i].Name + 'page'
                                    ).remove();
                                }
                            } else {
                                $(
                                    '#' + this.cavantable[i].Name + 'page'
                                ).remove();
                                if (this.cavantable[i].data.length == 0) {
                                    let a1 =
                                        `<div class="page2" style="position:absolute" id="` +
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
                                    $('#' + this.cavantable[i].Name)
                                        .parent()
                                        .append(a1);
                                    this.cavantable[i].data = a2;
                                    var numd = this.cavantable[i].nowlength;
                                    this.cavantable[i].nowdata = JSON.parse(
                                        wantdata
                                    ).splice(0, numd);
                                    $(
                                        '#' + this.cavantable[i].Name + 'page'
                                    ).find('.numinp')[0].value = 1;
                                    $(
                                        '#' + this.cavantable[i].Name + 'page'
                                    ).find('.end')[0].innerHTML = Math.ceil(
                                        JSON.parse(wantdata).length / numd
                                    );
                                    this.cavantable[i].numpage = Math.ceil(
                                        JSON.parse(wantdata).length / numd
                                    );
                                } else {
                                    this.cavantable[i].data = a2;
                                    let numd = this.cavantable[i].nowlength;
                                    this.cavantable[i].nowdata = JSON.parse(
                                        wantdata
                                    ).splice(0, numd);
                                    if (
                                        a2.length <=
                                        this.cavantable[i].nowlength
                                    ) {
                                        $(
                                            '#' +
                                                this.cavantable[i].Name +
                                                'page'
                                        ).find('.numinp')[0].value = 1;
                                        $(
                                            '#' +
                                                this.cavantable[i].Name +
                                                'page'
                                        ).find('.end')[0].innerHTML = Math.ceil(
                                            JSON.parse(wantdata).length / numd
                                        );
                                        this.cavantable[i].numpage = Math.ceil(
                                            JSON.parse(wantdata).length / numd
                                        );
                                    } else {
                                        if (
                                            this.cavantable[i].page == undefined
                                        ) {
                                            let a1 =
                                                `<div class="page2" style="position:absolute" id="` +
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
                                            $('#' + this.cavantable[i].Name)
                                                .parent()
                                                .append(a1);
                                            let numd = this.cavantable[i]
                                                .nowlength;
                                            $('#' + this.cavantable[i].Name)
                                                .parent()
                                                .append(
                                                    this.cavantable[i].page
                                                );
                                            this.cavantable[
                                                i
                                            ].numpage = Math.ceil(
                                                JSON.parse(wantdata).length /
                                                    numd
                                            );

                                            $(
                                                '#' +
                                                    this.cavantable[i].Name +
                                                    'page'
                                            ).find(
                                                '.end'
                                            )[0].innerHTML = Math.ceil(
                                                JSON.parse(wantdata).length /
                                                    numd
                                            );
                                        } else {
                                            let numd = this.cavantable[i]
                                                .nowlength;
                                            $('#' + this.cavantable[i].Name)
                                                .parent()
                                                .append(
                                                    this.cavantable[i].page
                                                );
                                            this.cavantable[
                                                i
                                            ].numpage = Math.ceil(
                                                JSON.parse(wantdata).length /
                                                    numd
                                            );

                                            $(
                                                '#' +
                                                    this.cavantable[i].Name +
                                                    'page'
                                            ).find(
                                                '.end'
                                            )[0].innerHTML = Math.ceil(
                                                JSON.parse(wantdata).length /
                                                    numd
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
                        .then(re1 => {
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
                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + this.cavantable[i].sju[ac].id
                                        )[0].innerHTML = this.getDate();
                                    }
                                    if (
                                        this.cavantable[i].sju[ac].itemdata ==
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
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' +
                                                    this.cavantable[i].sju[ac]
                                                        .id
                                            )[0].innerHTML = JSON.parse(
                                                sessionStorage.getItem(
                                                    'sightseerInfo1'
                                                )
                                            ).SCMSUserName;
                                        } else {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' +
                                                    this.cavantable[i].sju[ac]
                                                        .id
                                            )[0].innerHTML = JSON.parse(
                                                sessionStorage.getItem(
                                                    'userInfo1'
                                                )
                                            ).SCMSUserName;
                                        }
                                    }
                                }
                            });
                        })
                        .then(() => {
                            let b = $('#' + this.cavantable[i].Name).find(
                                'input'
                            ).length;
                            

                            for (let ip = 0; ip < b; ip++) {
                                $(
                                    $('#' + this.cavantable[i].Name).find(
                                        'input'
                                    )[0]
                                ).remove();
                              
                                
                            }
                         
                            console.log(this.cavantable)
                           
                            // alert(this.cavantable.length);
                            // alert(i)
                            // alert(this.cavantable.length - 1 == i)
                            if (this.cavantable.length - 1 == i){
                        
                               this.setbodydata(1);
                         
                            } 
                           
                        });
                }
            }
        },

        setbodydata(a) {
          
            var pdclone = a;
            this.reg = new RegExp('^[0-9]*$');
            console.log("sss",this.cavantable)
            for (let is = 0; is < this.cavantable.length; is++) {
                //    alert('sad')
               
                
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
                                console.log($('#' + this.cavantable[is].Name).find(
                                        `#row-` + this.snum
                                    )[0])
                                $($('#' + this.cavantable[is].Name).find(
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
                                        modifyname: null
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
                                            modifyname: null
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
                                    inp.id = this.cavantable[is].nowdata[
                                        this.an
                                    ].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    let xsnumber = '';
                                    let de = '';
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5.id ==
                                            this.ead
                                        ) {
                                            xsnumber = this.cavantable[is].shi5
                                                .xsnumber;
                                            de = this.cavantable[is].shi5
                                                .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null|| this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
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
                                                .value == null||this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                            } else {
                                                inp.value = this.cavantable[
                                                    is
                                                ].nowdata[this.an].value;
                                            }
                                        } else {
                                            inp.value = this.cavantable[
                                                is
                                            ].nowdata[this.an].value;
                                        }
                                    }
                                    inp.classList.add('inp');
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
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
                                            .find('.dataready')[this.ead].classList.remove(
                                                'after'
                                            );
                                    }
                                } else {
                                    let inp = document.createElement('input');
                                    //        if(typeof($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')).attr('valign') !== "undefined"){

                                    //         if($($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') !== 'top'&&$($($('#' +this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') == 'bottom'){
                                    //         inp.style.height =
                                    //     $(
                                    //         $(
                                    //             '#' +
                                    //                 this.cavantable[is].Name
                                    //         ).find(`#row-` + this.enum)[0]
                                    //     ).find('.dataready')[this.ead]
                                    //         .clientHeight + 'px';
                                    //     }
                                    // }else{
                                    //               inp.style.height =
                                    //     $(
                                    //         $(
                                    //             '#' +
                                    //                 this.cavantable[is].Name
                                    //         ).find(`#row-` + this.enum)[0]
                                    //     ).find('.dataready')[this.ead]
                                    //         .clientHeight + 'px';
                                    // }
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
                                    inp.id = this.cavantable[is].nowdata[
                                        this.an
                                    ].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    let xsnumber = '';
                                    let de = '';

                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5[i1].id ==
                                            this.ead
                                        ) {
                                            xsnumber = this.cavantable[is].shi5[
                                                i1
                                            ].xsnumber;
                                            de = this.cavantable[is].shi5[i1]
                                                .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }

                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null||   this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
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
                                                .value == null||this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                            } else {
                                                inp.value = this.cavantable[
                                                    is
                                                ].nowdata[this.an].value;
                                            }
                                        } else {
                                            inp.value = this.cavantable[
                                                is
                                            ].nowdata[this.an].value;
                                        }
                                    }
                                    inp.classList.add('inp');
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
                                    let div = document.createElement('div');
                                    div.classList.add('tip');
                                    div.setAttribute(
                                        'id',
                                        'r' +
                                            $(
                                                $(
                                                    '#' +
                                                        this.cavantable[is].Name
                                                ).find(`#row-` + this.enum)[0]
                                            ).find('.dataready')[this.ead].id
                                    );

                                    let p1 = document.createElement('p');
                                    p1.innerHTML =
                                        '修改人:' +
                                        this.cavantable[is].nowdata[this.an]
                                            .modifyname;
                                    let p2 = document.createElement('p');
                                    p2.innerHTML =
                                        '修改时间:' +
                                        this.cavantable[is].nowdata[this.an]
                                            .modifytime;
                                    div.appendChild(p1);
                                    div.appendChild(p2);
                                }
                                this.ead++;
                            }
                            this.enum++;
                        }
                       
                    } else if (
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzsummopos == '分布在后'
                    ) {
                        
                        let sumdata = this.cavantable[
                            is
                        ].ParameterReportItemtList.dd.kzsummotype.split(',');
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
                                        modifyname: null
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
                                            modifyname: null
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
                                    // if(typeof($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')).attr('valign') !== "undefined"){
                                    //                                        if($($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') !== 'top'&&$($($('#' +this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') == 'bottom'){
                                    //         inp.style.height =
                                    //     $(
                                    //         $(
                                    //             '#' +
                                    //                 this.cavantable[is].Name
                                    //         ).find(`#row-` + this.enum)[0]
                                    //     ).find('.dataready')[this.ead]
                                    //         .clientHeight + 'px';
                                    //     }
                                    // }else{
                                    //               inp.style.height =
                                    //     $(
                                    //         $(
                                    //             '#' +
                                    //                 this.cavantable[is].Name
                                    //         ).find(`#row-` + this.enum)[0]
                                    //     ).find('.dataready')[this.ead]
                                    //         .clientHeight + 'px';
                                    // }
                                    
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
                                    inp.id = this.cavantable[is].nowdata[
                                        this.an
                                    ].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                           
                                    let xsnumber = '';
                                    let de = '';
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5.id ==
                                            this.ead
                                        ) {
                                            xsnumber = this.cavantable[is].shi5
                                                .xsnumber;
                                            de = this.cavantable[is].shi5
                                                .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    
                                    console.log(de)
                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null|| this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                                // alert('sad')
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
                                                .value == null||this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                            } else {
                                                inp.value = this.cavantable[
                                                    is
                                                ].nowdata[this.an].value;
                                            }
                                        } else {
                                            inp.value = this.cavantable[
                                                is
                                            ].nowdata[this.an].value;
                                        }
                                    }
                                    inp.classList.add('inp');
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
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
                                            .find('.dataready')[this.ead].classList.remove(
                                                'after'
                                            );
                                    }
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
                                } else {
                                    let inp = document.createElement('input');
                                    //    if(typeof($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')).attr('valign') !== "undefined"){
                                    //                                            if($($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') !== 'top'&&$($($('#' +this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') == 'bottom'){
                                    //             inp.style.height =
                                    //         $(
                                    //             $(
                                    //                 '#' +
                                    //                     this.cavantable[is].Name
                                    //             ).find(`#row-` + this.enum)[0]
                                    //         ).find('.dataready')[this.ead]
                                    //             .clientHeight + 'px';
                                    //         }
                                    //     }else{
                                    //                   inp.style.height =
                                    //         $(
                                    //             $(
                                    //                 '#' +
                                    //                     this.cavantable[is].Name
                                    //             ).find(`#row-` + this.enum)[0]
                                    //         ).find('.dataready')[this.ead]
                                    //             .clientHeight + 'px';
                                    //     }

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
                                    inp.id = this.cavantable[is].nowdata[
                                        this.an
                                    ].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    let xsnumber = '';
                                    let de = '';
                                  
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5[i1].id ==
                                            this.ead
                                        ) {
                                            xsnumber = this.cavantable[is].shi5[
                                                i1
                                            ].xsnumber;
                                            de = this.cavantable[is].shi5[i1]
                                                .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    console.log("de",de);
                                    console.log(this.cavantable[is].shi5)
                                    if (xsnumber !== '') {
                                        // alert("sad")
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null|| this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
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
                                                .value == null||this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                            } else {
                                                inp.value = this.cavantable[
                                                    is
                                                ].nowdata[this.an].value;
                                            }
                                        } else {
                                            inp.value = this.cavantable[
                                                is
                                            ].nowdata[this.an].value;
                                        }
                                    }
                                    inp.classList.add('inp');
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
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
                      
                        for (let k = 0; k < sumnum; k++) {
                            if (sumdata[k] == 'sum') {
                               
                                for (let j = 0; j < endw; j++) {
                                    let heji = 0;
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
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

                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` +
                                                    parseInt(k + endh + nowsum)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            '\\';
                                    } else {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function(item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        if (result == true) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
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
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value
                                            ) {
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
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = null;
                                            } else {
                                                if (heji == undefined) {
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
                                                    ].innerHTML = null;
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
                                                            heji = this.getPointNum(
                                                                heji,
                                                                this.cavantable[
                                                                    is
                                                                ].shi5[ss]
                                                                    .xsnumber
                                                            );
                                                        }
                                                    }

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
                                                    ].innerHTML = heji;
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
                                        ).find('.datareadyfoot')[
                                            j
                                        ].innerHTML = null;
                                    }
                                }
                            } else if (sumdata[k] == 'min') {
                                for (let j = 0; j < endw; j++) {
                                    let heji = 0;
                                    let min = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
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

                                    min.sort(function(a, b) {
                                        return a - b;
                                    });
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                       
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` +
                                                    parseInt(k + endh + nowsum)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            '\\';
                                    } else {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function(item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        if (result == true) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
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
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value
                                            ) {
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
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = null;
                                            } else {
                                                if (min[0] == undefined) {
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
                                                    ].innerHTML = 0;
                                                } else {
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
                                                    ].innerHTML = min[0];
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
                                        ).find('.datareadyfoot')[
                                            j
                                        ].innerHTML = null;
                                    }
                                }
                            } else if (sumdata[k] == 'mean') {
                                for (let j = 0; j < endw; j++) {
                                    let heji = 0;
                                    let length = 0;
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
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
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` +
                                                    parseInt(k + endh + nowsum)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            '\\';
                                    } else {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function(item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        if (result == true) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
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
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value
                                            ) {
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
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = null;
                                            } else {
                                                if (heji == undefined) {
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
                                                    ].innerHTML = null;
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
                                                            mean = this.getPointNum(
                                                                mean,
                                                                this.cavantable[
                                                                    is
                                                                ].shi5[ss]
                                                                    .xsnumber
                                                            );
                                                        }
                                                    }
                                                    if (isNaN(mean)) {
                                                        mean = 0;
                                                    }
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
                                                    ].innerHTML = mean;
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
                                        ).find('.datareadyfoot')[
                                            j
                                        ].innerHTML = null;
                                    }
                                }
                            } else if (sumdata[k] == 'max') {
                                for (let j = 0; j < endw; j++) {
                                    let heji = 0;
                                    let min = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
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
                                    min.sort(function(a, b) {
                                        return a - b;
                                    });
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` +
                                                    parseInt(k + endh + nowsum)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            '\\';
                                    } else {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function(item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        if (result == true) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value
                                                ) &&
                                                this.cavantable[is].shi5[
                                                   aindex
                                                ].defauldisplay !==
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value
                                            ) {
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
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = null;
                                            } else {
                                                if (
                                                    min[min.length - 1] ==
                                                    undefined
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
                                                    ].innerHTML = 0;
                                                } else {
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
                                                    ].innerHTML =
                                                        min[min.length - 1];
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
                                        ).find('.datareadyfoot')[
                                            j
                                        ].innerHTML = null;
                                    }
                                }
                            }
                        }
                    } else if (
                        this.cavantable[is].ParameterReportItemtList.dd
                            .kzsummopos == '分布在前'
                    ) {
                        let sumdata = this.cavantable[
                            is
                        ].ParameterReportItemtList.dd.kzsummotype.split(',');
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
                                        modifyname: null
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
                                            modifyname: null
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
                                    // if(typeof($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')).attr('valign') !== "undefined"){
                                    //                                        if($($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') !== 'top'&&$($($('#' +this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') == 'bottom'){
                                    //         inp.style.height =
                                    //     $(
                                    //         $(
                                    //             '#' +
                                    //                 this.cavantable[is].Name
                                    //         ).find(`#row-` + this.enum)[0]
                                    //     ).find('.dataready')[this.ead]
                                    //         .clientHeight + 'px';
                                    //     }
                                    // }else{
                                    //               inp.style.height =
                                    //     $(
                                    //         $(
                                    //             '#' +
                                    //                 this.cavantable[is].Name
                                    //         ).find(`#row-` + this.enum)[0]
                                    //     ).find('.dataready')[this.ead]
                                    //         .clientHeight + 'px';
                                    // }
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
                                    inp.id = this.cavantable[is].nowdata[
                                        this.an
                                    ].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }

                                    let xsnumber = '';
                                    let de = '';
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5.id ==
                                            this.ead
                                        ) {
                                            xsnumber = this.cavantable[is].shi5
                                                .xsnumber;
                                            de = this.cavantable[is].shi5
                                                .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null|| this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
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
                                                .value == null|| this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                            } else {
                                                inp.value = this.cavantable[
                                                    is
                                                ].nowdata[this.an].value;
                                            }
                                        } else {
                                            inp.value = this.cavantable[
                                                is
                                            ].nowdata[this.an].value;
                                        }
                                    }
                                    inp.classList.add('inp');

                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
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
                                            .find('.dataready')[this.ead].classList.remove(
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

                                    //    if(typeof($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')).attr('valign') !== "undefined"){
                                    //                                            if($($($('#' +  this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') !== 'top'&&$($($('#' +this.cavantable[is].Name).find(`#row-` + this.enum)[0]).find('.dataready')[this.ead]).attr('valign') == 'bottom'){
                                    //             inp.style.height =
                                    //         $(
                                    //             $(
                                    //                 '#' +
                                    //                     this.cavantable[is].Name
                                    //             ).find(`#row-` + this.enum)[0]
                                    //         ).find('.dataready')[this.ead]
                                    //             .clientHeight + 'px';
                                    //         }
                                    //     }else{
                                    //                   inp.style.height =
                                    //         $(
                                    //             $(
                                    //                 '#' +
                                    //                     this.cavantable[is].Name
                                    //             ).find(`#row-` + this.enum)[0]
                                    //         ).find('.dataready')[this.ead]
                                    //             .clientHeight + 'px';
                                    //     }
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
                                    inp.id = this.cavantable[is].nowdata[
                                        this.an
                                    ].id;
                                    if (this.checked == 1) {
                                        inp.readOnly = true;
                                    } else {
                                        inp.readOnly = false;
                                    }
                                    let xsnumber = '';
                                    let de = '';

                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5[i1].id ==
                                            this.ead
                                        ) {
                                            xsnumber = this.cavantable[is].shi5[
                                                i1
                                            ].xsnumber;
                                            de = this.cavantable[is].shi5[i1]
                                                .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }
                             
                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null|| this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
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
                                                .value == null||  this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                            } else {
                                                inp.value = this.cavantable[
                                                    is
                                                ].nowdata[this.an].value;
                                            }
                                        } else {
                                            inp.value = this.cavantable[
                                                is
                                            ].nowdata[this.an].value;
                                        }
                                    }

                                    inp.classList.add('inp');

                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            `#row-` + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
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
                        for (let k = 0; k < sumdata.length; k++) {
                            if (sumdata[k] == 'sum') {
                                 
                                for (let j = 0; j < endw; j++) {
                                    let heji = 0;
                                    let length = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
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

                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                      
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` + parseInt(k + alength)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            '\\';
                                    } else {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function(item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        if (result == true) {
                                            console.log('1===?', this.cavantable[is].shi5[aindex].defauldisplay)
                                            console.log( '2===?',$(
                                                                $(
                                                                    '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ].Name
                                                                ).find(
                                                                    `#row-` +
                                                                        nowsum
                                                                )[0]
                                                            ).find('.inp')[j]
                                                                .value)
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value) &&
                                                        this.cavantable[is]
                                                            .shi5[aindex]
                                                            .defauldisplay !==
                                                            $(
                                                                $(
                                                                    '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ].Name
                                                                ).find(
                                                                    `#row-` +
                                                                        nowsum
                                                                )[0]
                                                            ).find('.inp')[j]
                                                                .value
                                                
                                            ) {
                                           
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[is]
                                                                .Name
                                                    ).find(
                                                        `#row-` +
                                                            parseInt(
                                                                k + alength
                                                            )
                                                    )[0]
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = null;
                                            } else {
                                                if (heji == undefined) {
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
                                                    ].innerHTML = null;
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
                                                            heji = this.getPointNum(
                                                                heji,
                                                                this.cavantable[
                                                                    is
                                                                ].shi5[ss]
                                                                    .xsnumber
                                                            );
                                                        }
                                                    }
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
                                                    ].innerHTML = heji;
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
                                        ).find('.datareadyfoot')[
                                            j
                                        ].innerHTML = null;
                                    }
                                }
                            } else if (sumdata[k] == 'min') {
                                for (let j = 0; j < endw; j++) {
                                    let heji = 0;
                                    let min = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
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
                                    min.sort(function(a, b) {
                                        return a - b;
                                    });
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` + parseInt(k + alength)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            '\\';
                                    } else {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function(item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        if (result == true) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value) &&
                                                        this.cavantable[is]
                                                            .shi5[aindex]
                                                            .defauldisplay !==
                                                            $(
                                                                $(
                                                                    '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ].Name
                                                                ).find(
                                                                    `#row-` +
                                                                        nowsum
                                                                )[0]
                                                            ).find('.inp')[j]
                                                                .value
                                                
                                            ) {
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[is]
                                                                .Name
                                                    ).find(
                                                        `#row-` +
                                                            parseInt(
                                                                k + alength
                                                            )
                                                    )[0]
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = null;
                                            } else {
                                                if (min[0] == undefined) {
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
                                                    ].innerHTML = 0;
                                                } else {
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
                                                    ].innerHTML = min[0];
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
                                        ).find('.datareadyfoot')[
                                            j
                                        ].innerHTML = null;
                                    }
                                }
                            } else if (sumdata[k] == 'mean') {
                                for (let j = 0; j < endw; j++) {
                                    let heji = 0;
                                    let length = 0;
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
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
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` + parseInt(k + alength)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            '\\';
                                    } else {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function(item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        if (result == true) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value) &&
                                                        this.cavantable[is]
                                                            .shi5[aindex]
                                                            .defauldisplay !==
                                                            $(
                                                                $(
                                                                    '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ].Name
                                                                ).find(
                                                                    `#row-` +
                                                                        nowsum
                                                                )[0]
                                                            ).find('.inp')[j]
                                                                .value
                                                
                                            ) {
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[is]
                                                                .Name
                                                    ).find(
                                                        `#row-` +
                                                            parseInt(
                                                                k + alength
                                                            )
                                                    )[0]
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = null;
                                            } else {
                                                if (heji == undefined) {
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
                                                    ].innerHTML = null;
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
                                                            mean = this.getPointNum(
                                                                mean,
                                                                this.cavantable[
                                                                    is
                                                                ].shi5[ss]
                                                                    .xsnumber
                                                            );
                                                        }
                                                    }
                                                    if (isNaN(mean)) {
                                                        mean = 0;
                                                    }
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
                                                    ].innerHTML = mean;
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
                                        ).find('.datareadyfoot')[
                                            j
                                        ].innerHTML = null;
                                    }
                                }
                            } else if (sumdata[k] == 'max') {
                                for (let j = 0; j < endw; j++) {
                                    let heji = 0;
                                    let min = [];
                                    for (
                                        let i = nowsum;
                                        i < parseInt(nowsum + endh);
                                        i++
                                    ) {
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
                                    min.sort(function(a, b) {
                                        return a - b;
                                    });
                                    if (
                                        this.cavantable[is].shi3.indexOf(j) > -1
                                    ) {
                                        $(
                                            $(
                                                '#' + this.cavantable[is].Name
                                            ).find(
                                                `#row-` + parseInt(k + alength)
                                            )[0]
                                        ).find('.datareadyfoot')[j].innerHTML =
                                            '\\';
                                    } else {
                                        let aindex;
                                        let result = this.cavantable[
                                            is
                                        ].shi5.some(function(item, index) {
                                            if (item.id == j) {
                                                aindex = index;
                                                return true;
                                            }
                                        });
                                        if (result == true) {
                                            if (
                                                isNaN(
                                                    $(
                                                        $(
                                                            '#' +
                                                                this.cavantable[
                                                                    is
                                                                ].Name
                                                        ).find(
                                                            `#row-` + nowsum
                                                        )[0]
                                                    ).find('.inp')[j].value) &&
                                                        this.cavantable[is]
                                                            .shi5[aindex]
                                                            .defauldisplay !==
                                                            $(
                                                                $(
                                                                    '#' +
                                                                        this
                                                                            .cavantable[
                                                                            is
                                                                        ].Name
                                                                ).find(
                                                                    `#row-` +
                                                                        nowsum
                                                                )[0]
                                                            ).find('.inp')[j]
                                                                .value
                                                
                                            ) {
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[is]
                                                                .Name
                                                    ).find(
                                                        `#row-` +
                                                            parseInt(
                                                                k + alength
                                                            )
                                                    )[0]
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = null;
                                            } else {
                                                if (
                                                    min[min.length - 1] ==
                                                    undefined
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
                                                    ].innerHTML = 0;
                                                } else {
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
                                                    ].innerHTML =
                                                        min[min.length - 1];
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
                                        modify: '辅助项'
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
                                                value: null
                                            }
                                        );
                                    }
                                    let xsnumber = '';
                                    let de = '';
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5[i1].id ==
                                            this.enum
                                        ) {
                                            xsnumber = this.cavantable[is].shi5[i1].xsnumber;
                                            de = this.cavantable[is].shi5[i1]
                                                .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }

                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null|| this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
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
                                                .value == null||  this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                            } else {
                                                inp.value = this.cavantable[
                                                    is
                                                ].nowdata[this.an].value;
                                            }
                                        } else {
                                            inp.value = this.cavantable[
                                                is
                                            ].nowdata[this.an].value;
                                        }
                                    }
                                    // if(typeof($($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready').attr('valign'))!=='undefined'){
                                    //        if($($($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready')[this.ead]).attr('valign')!=='top'||$($($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready')[this.ead]).attr('valign')!=='bottom'){
                                    //            inp.style.height = $($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready')[this.ead].clientHeight
                                    //        }
                                    // }else{
                                    //       inp.style.height = $($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready')[this.ead].clientHeight
                                    // }
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
                                    inp.id = this.cavantable[is].nowdata[
                                        this.an
                                    ].id;
                                    inp.classList.add('inp');
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
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
                                                value: null
                                            }
                                        );
                                    }
                                    let xsnumber = '';
                                    let de = '';
                                    for (
                                        let i1 = 0;
                                        i1 < this.cavantable[is].shi5.length;
                                        i1++
                                    ) {
                                        if (
                                            this.cavantable[is].shi5.id ==
                                            this.enum
                                        ) {
                                            xsnumber = this.cavantable[is].shi5
                                                .xsnumber;
                                            de = this.cavantable[is].shi5[i1]
                                                .defauldisplay;
                                            break;
                                        } else {
                                            xsnumber = '';
                                            de = '';
                                        }
                                    }

                                    if (xsnumber !== '') {
                                        if (
                                            this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == null||this.getPointNum(
                                                this.cavantable[is].nowdata[
                                                    this.an
                                                ].value,
                                                xsnumber
                                            ) == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
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
                                                .value == null||    this.cavantable[is].nowdata[this.an]
                                                .value == ''
                                        ) {
                                            if (de !== '') {
                                                inp.value = de;
                                            } else {
                                                inp.value = this.cavantable[
                                                    is
                                                ].nowdata[this.an].value;
                                            }
                                        } else {
                                            inp.value = this.cavantable[
                                                is
                                            ].nowdata[this.an].value;
                                        }
                                    }
                                    // if(typeof($($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready').attr('valign'))!=='undefined'){
                                    //        if($($($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready')[this.ead]).attr('valign')!=='top'||$($($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready')[this.ead]).attr('valign')!=='bottom'){
                                    //            inp.style.height = $($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready')[this.ead].clientHeight
                                    //        }
                                    // }else{
                                    //       inp.style.height = $($('#'+this.cavantable[is].Name).find('#row-'+this.enum)[0]).find('.dataready')[this.ead].clientHeight
                                    // }
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
                                    inp.id = this.cavantable[is].nowdata[
                                        this.an
                                    ].id;
                                    inp.classList.add('inp');
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + this.enum
                                        )[0]
                                    )
                                        .find('.dataready')[this.ead].appendChild(inp);
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
                            let sumdata = this.cavantable[
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
                                        let sum = 0;

                                        for (let vx = 0; vx < this.colw; vx++) {
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
                                               
                                                
                                                sum =
                                                       parseFloat( sum) +
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
                                                    console.log(sum)
                                            }
                                            if (
                                                this.cavantable[
                                                    is
                                                ].shi3.indexOf(vy) > -1
                                            ) {
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[is]
                                                                .Name
                                                    ).find('#row-' + vy)[0]
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = '\\';
                                            } else {
                                                let aindex;
                                                let result = this.cavantable[
                                                    is
                                                ].shi5.some(function(
                                                    item,
                                                    index
                                                ) {
                                                    if (item.id == vy) {
                                                        aindex = index;
                                                        return true;
                                                    }
                                                });
                                                if (result == true) {
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
                                                            ).find('.inp')[0]
                                                                .value
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
                                                                sum = this.getPointNum(
                                                                    sum,
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].shi5[ii]
                                                                        .xsnumber
                                                                );
                                                            }
                                                        }
                                                        if (isNaN(sum)) {
                                                            sum = 0;
                                                        }
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
                                                        )[j].innerHTML = sum;
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
                                if (sumdata[j] == 'mean') {
                                    for (
                                        let vy = parseInt(
                                            this.cavantable[is].nowy
                                        );
                                        vy <
                                        this.colh +
                                            parseInt(this.cavantable[is].nowy);
                                        vy++
                                    ) {
                                        let sum = 0;

                                        var length = 0;
                                        for (let vx = 0; vx < this.colw; vx++) {
                                          
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
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[is]
                                                                .Name
                                                    ).find('#row-' + vy)[0]
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = '\\';
                                            } else {
                                                let aindex;
                                                let result = this.cavantable[
                                                    is
                                                ].shi5.some(function(
                                                    item,
                                                    index
                                                ) {
                                                    if (item.id == vy) {
                                                        aindex = index;
                                                        return true;
                                                    }
                                                });
                                                if (result == true) {
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
                                                            ).find('.inp')[0]
                                                                .value
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
                                                                mean = this.getPointNum(
                                                                    mean,
                                                                    this
                                                                        .cavantable[
                                                                        is
                                                                    ].shi5[ii]
                                                                        .xsnumber
                                                                );
                                                            }
                                                        }
                                                        if (isNaN(mean)) {
                                                            mean = 0;
                                                        }
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
                                                        )[j].innerHTML = mean;
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
                                        let min = [];

                                        for (let vx = 0; vx < this.colw; vx++) {
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
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[is]
                                                                .Name
                                                    ).find('#row-' + vy)[0]
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = '\\';
                                            } else {
                                                let aindex;
                                                let result = this.cavantable[
                                                    is
                                                ].shi5.some(function(
                                                    item,
                                                    index
                                                ) {
                                                    if (item.id == vy) {
                                                        aindex = index;
                                                        return true;
                                                    }
                                                });
                                                if (result == true) {
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
                                                            ).find('.inp')[0]
                                                                .value
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
                                                    } else {
                                                        min.sort(function(
                                                            a,
                                                            b
                                                        ) {
                                                            return a - b;
                                                        });
                                                        let mindata = min[0];
                                                        if (
                                                            mindata == undefined
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
                                                            )[j].innerHTML = 0;
                                                        } else {
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
                                                            )[
                                                                j
                                                            ].innerHTML = mindata;
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
                                        let min = [];

                                        for (let vx = 0; vx < this.colw; vx++) {
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
                                                $(
                                                    $(
                                                        '#' +
                                                            this.cavantable[is]
                                                                .Name
                                                    ).find('#row-' + vy)[0]
                                                ).find('.datareadyfoot')[
                                                    j
                                                ].innerHTML = '\\';
                                            } else {
                                                let aindex;
                                                let result = this.cavantable[
                                                    is
                                                ].shi5.some(function(
                                                    item,
                                                    index
                                                ) {
                                                    if (item.id == vy) {
                                                        aindex = index;
                                                        return true;
                                                    }
                                                });
                                                if (result == true) {
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
                                                            ).find('.inp')[0]
                                                                .value
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
                                                    } else {
                                                        min.sort(function(
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
                                                            )[j].innerHTML = 0;
                                                        } else {
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
                                                            )[
                                                                j
                                                            ].innerHTML = mindata;
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
                            }
                        }
                    }
                }
              if(pdclone == 1){
                 this.cavantable[is].daochutable = $(
                    '#' + this.cavantable[is].Name
                )
                    .find('table')[0]
                    .cloneNode(true);
              }
               
                    if(this.cavantable[is].numpage>1){
                        var endheight = 0;
                for (
                    let h = 0;
                    h <
                    this.cavantable[is].ParameterReportItemtList.dd.startpoy;
                    h++
                ) {
                    endheight += parseFloat(
                        $(
                            $('#' + this.cavantable[is].Name).find('#row-' + h)
                        )[0].clientHeight
                    );
                }
                endheight += 1;

                var endheight2 = 0;
                for (
                    let h = 0;
                    h <
                    this.cavantable[is].ParameterReportItemtList.dd.startpoy;
                    h++
                ) {
                    endheight2 += parseFloat(
                        $(
                            $('#' + this.cavantable[is].Name).find('#row-' + h)
                        )[0].clientHeight
                    );
                }
                endheight2 += 1;
                var aaa = this.cavantable[
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
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpox
                            );
                            j1++
                        ) {
                            endwidth =
                                endwidth +
                                $('#' + this.cavantable[is].Name).find('td')[j1]
                                    .clientWidth;
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList.dd
                                                    .startpoy
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + nownum
                                        )
                                    )[0].clientHeight
                                );

                            nownum++;
                        }
                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.top =
                            endheight +
                            parseFloat(this.cavantable[is].PropertyList.Top) +
                            'px';
                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.left =
                            endwidth -
                            $('#' + this.cavantable[is].Name + 'page')[0]
                                .clientWidth +
                            parseFloat(this.cavantable[is].PropertyList.Left) +
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
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpox
                            );
                            j1++
                        ) {
                            endwidth =
                                endwidth +
                                $('#' + this.cavantable[is].Name).find('td')[j1]
                                    .clientWidth;
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList.dd
                                                    .startpoy
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
                            jj < this.cavantable[is].endpoy + bbb;
                            jj++
                        ) {
                            endheight =
                                endheight +
                                parseInt(
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + nownum
                                        )
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
                            parseFloat(this.cavantable[is].PropertyList.Top) +
                            'px';
                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.left =
                            endwidth -
                            $('#' + this.cavantable[is].Name + 'page')[0]
                                .clientWidth +
                            parseFloat(this.cavantable[is].PropertyList.Left) +
                            'px';
                    } else {
                        let nownum = parseInt(
                            this.cavantable[is].ParameterReportItemtList.dd
                                .startpoy
                        );
                        for (
                            let jj = 0;
                            jj < parseInt(this.cavantable[is].endpoy);
                            jj++
                        ) {
                            endheight =
                                endheight +
                                parseInt(
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + nownum
                                        )
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
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpox
                            );
                            j1++
                        ) {
                            endwidth =
                                endwidth +
                                $('#' + this.cavantable[is].Name).find('td')[j1]
                                    .clientWidth;
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList.dd
                                                    .startpoy
                                        )
                                    ).find('.datareadyhead')[jj].clientWidth
                                );
                        }
                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.top =
                            endheight +
                            parseFloat(this.cavantable[is].PropertyList.Top) +
                            1 +
                            'px';
                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.left =
                            endwidth -
                            $('#' + this.cavantable[is].Name + 'page')[0]
                                .clientWidth +
                            parseFloat(this.cavantable[is].PropertyList.Left) +
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
                                        .find('.datareadyfoot')[ii].clientWidth
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList.dd
                                                    .startpoy
                                        )
                                    ).find('.dataready')[jj].clientWidth
                                );
                        }
                        let sumnum = 0;
                        for (
                            let i3 = 0;
                            i3 <
                            $(
                                $('#' + this.cavantable[is].Name).find('tr')[
                                    this.cavantable[is].ParameterReportItemtList
                                        .dd.startpoy
                                ]
                            ).find('td').length;
                            i3++
                        ) {
                            if (
                                $(
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            'tr'
                                        )[
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList.dd
                                                    .startpoy
                                        )
                                    ).find('.datareadyfoot')[jj].clientWidth
                                );
                        }
                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.left =
                            endwidth2 -
                            $('#' + this.cavantable[is].Name + 'page')[0]
                                .clientWidth +
                            parseFloat(this.cavantable[is].PropertyList.Left) +
                            'px';
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + nownum
                                        )
                                    )[0].clientHeight
                                );

                            nownum++;
                        }

                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.top =
                            endheight2 +
                            parseFloat(this.cavantable[is].PropertyList.Top) +
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList.dd
                                                    .startpoy
                                        )
                                    ).find('.dataready')[jj].clientWidth
                                );
                        }
                        let sumnum = 0;
                        for (
                            let i3 = 0;
                            i3 <
                            $(
                                $('#' + this.cavantable[is].Name).find('tr')[
                                    this.cavantable[is].ParameterReportItemtList
                                        .dd.startpoy
                                ]
                            ).find('td').length;
                            i3++
                        ) {
                            if (
                                $(
                                    $(
                                        $('#' + this.cavantable[is].Name).find(
                                            'tr'
                                        )[
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList.dd
                                                    .startpoy
                                        )
                                    ).find('.datareadyfoot')[jj].clientWidth
                                );
                        }
                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.left =
                            endwidth2 -
                            $('#' + this.cavantable[is].Name + 'page')[0]
                                .clientWidth +
                            parseFloat(this.cavantable[is].PropertyList.Left) +
                            'px';
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + nownum
                                        )
                                    )[0].clientHeight
                                );

                            nownum++;
                        }

                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.top =
                            endheight2 +
                            parseFloat(this.cavantable[is].PropertyList.Top) +
                            'px';
                    } else {
                        var endwidth2 = 0;
                        for (
                            let j1 = 0;
                            j1 <
                            parseInt(
                                this.cavantable[is].ParameterReportItemtList.dd
                                    .startpox
                            );
                            j1++
                        ) {
                            endwidth2 =
                                endwidth2 +
                                $('#' + this.cavantable[is].Name).find('td')[j1]
                                    .clientWidth;
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' +
                                                this.cavantable[is]
                                                    .ParameterReportItemtList.dd
                                                    .startpoy
                                        )
                                    ).find('.dataready')[jj].clientWidth
                                );
                        }

                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.left =
                            endwidth2 -
                            $('#' + this.cavantable[is].Name + 'page')[0]
                                .clientWidth +
                            parseFloat(this.cavantable[is].PropertyList.Left) +
                            'px';
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
                                        $('#' + this.cavantable[is].Name).find(
                                            '#row-' + nownum
                                        )
                                    )[0].clientHeight
                                );

                            nownum++;
                        }

                        $(
                            '#' + this.cavantable[is].Name + 'page'
                        )[0].style.top =
                            endheight2 +
                            parseFloat(this.cavantable[is].PropertyList.Top) +
                            'px';
                    }
                }
              
                let that = this;
                $('#' + this.cavantable[is].Name + 'page').find(
                    '.last'
                )[0].onclick = function() {
                    let reg1 = new RegExp('page', 'g');
                    let wantid = $(this)
                        .parent()
                        .parent()[0]
                        .id.replace(reg1, '');
                    for (let i = 0; i < that.cavantable.length; i++) {
                        if (that.cavantable[i].Name == wantid) {
                            if (
                                $(
                                    '#' +
                                        $(this)
                                            .parent()
                                            .parent()[0].id
                                ).find('.numinp')[0].value <
                                    that.cavantable[i].numpage &&
                                !isNaN(
                                    $(
                                        '#' +
                                            $(this)
                                                .parent()
                                                .parent()[0].id
                                    ).find('.numinp')[0].value
                                )
                            ) {
                                if (
                                    $(
                                        '#' +
                                            $(this)
                                                .parent()
                                                .parent()[0].id
                                    ).find('.numinp')[0].value >= 1
                                ) {
                                    let a = JSON.stringify(
                                        that.cavantable[i].data
                                    );
                                    let f = JSON.parse(a);
                                    $(
                                        '#' +
                                            $(this)
                                                .parent()
                                                .parent()[0].id
                                    ).find('.numinp')[0].value++;
                                    let b =
                                        $(
                                            '#' +
                                                $(this)
                                                    .parent()
                                                    .parent()[0].id
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
                )[0].onclick = function() {
                    let reg1 = new RegExp('page', 'g');
                    let wantid = $(this)
                        .parent()
                        .parent()[0]
                        .id.replace(reg1, '');
                    for (let i = 0; i < that.cavantable.length; i++) {
                        if (that.cavantable[i].Name == wantid) {
                            if (
                                $(
                                    '#' +
                                        $(this)
                                            .parent()
                                            .parent()[0].id
                                ).find('.numinp')[0].value > 1 &&
                                !isNaN(
                                    $(
                                        '#' +
                                            $(this)
                                                .parent()
                                                .parent()[0].id
                                    ).find('.numinp')[0].value
                                )
                            ) {
                                if (
                                    $(
                                        '#' +
                                            $(this)
                                                .parent()
                                                .parent()[0].id
                                    ).find('.numinp')[0].value >= 1
                                ) {
                                    let a = JSON.stringify(
                                        that.cavantable[i].data
                                    );
                                    let f = JSON.parse(a);
                                    $(
                                        '#' +
                                            $(this)
                                                .parent()
                                                .parent()[0].id
                                    ).find('.numinp')[0].value--;
                                    let b =
                                        $(
                                            '#' +
                                                $(this)
                                                    .parent()
                                                    .parent()[0].id
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
                )[0].onclick = function() {
                    let reg1 = new RegExp('page', 'g');
                    let wantid = $(this)
                        .parent()
                        .parent()[0]
                        .id.replace(reg1, '');
                    for (let i = 0; i < that.cavantable.length; i++) {
                        if (that.cavantable[i].Name == wantid) {
                            let a = JSON.stringify(that.cavantable[i].data);
                            let f = JSON.parse(a);
                            $(
                                '#' +
                                    $(this)
                                        .parent()
                                        .parent()[0].id
                            ).find('.numinp')[0].value = 1;
                            let b =
                                $(
                                    '#' +
                                        $(this)
                                            .parent()
                                            .parent()[0].id
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
                )[0].onclick = function() {
                    let reg1 = new RegExp('page', 'g');
                    let wantid = $(this)
                        .parent()
                        .parent()[0]
                        .id.replace(reg1, '');
                    for (let i = 0; i < that.cavantable.length; i++) {
                        if (that.cavantable[i].Name == wantid) {
                            let a = JSON.stringify(that.cavantable[i].data);
                            let f = JSON.parse(a);
                            $(
                                '#' +
                                    $(this)
                                        .parent()
                                        .parent()[0].id
                            ).find('.numinp')[0].value =
                                that.cavantable[i].numpage;
                            let b =
                                $(
                                    '#' +
                                        $(this)
                                            .parent()
                                            .parent()[0].id
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
                )[0].onblur = function() {
                    let reg1 = new RegExp('page', 'g');
                    let wantid = $(this)
                        .parent()
                        .parent()
                        .parent()[0]
                        .id.replace(reg1, '');
                    for (let i = 0; i < that.cavantable.length; i++) {
                        if (that.cavantable[i].Name == wantid) {
                            if (
                                1 <=
                                parseInt(
                                    $(
                                        '#' + that.cavantable[i].Name + 'page'
                                    ).find('.numinp')[0].value
                                ) <=
                                that.cavantable[i].numpage
                            ) {
                                let a = JSON.stringify(that.cavantable[i].data);
                                let f = JSON.parse(a);
                                let b =
                                    $(
                                        '#' +
                                            $(this)
                                                .parent()
                                                .parent()[0].id
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
                document.onkeydown = function(e) {
                    var theEvent = window.event || e;
                    var code =
                        theEvent.keyCode || theEvent.which || theEvent.charCode;
                    if (code == 13) {
                        for (let i = 0; i < that.cavantable.length; i++) {
                            if (
                                1 <=
                                    parseInt(
                                        $(
                                            '#' +
                                                that.cavantable[i].Name +
                                                'page'
                                        ).find('.numinp')[0].value
                                    ) &&
                                parseInt(
                                    $(
                                        '#' + that.cavantable[i].Name + 'page'
                                    ).find('.numinp')[0].value
                                ) <= that.cavantable[i].numpage &&
                                !isNaN(
                                    parseInt(
                                        $(
                                            '#' +
                                                that.cavantable[i].Name +
                                                'page'
                                        ).find('.numinp')[0].value
                                    )
                                )
                            ) {
                                let a = JSON.stringify(that.cavantable[i].data);
                                let f = JSON.parse(a);
                                let b =
                                    $(
                                        '#' + that.cavantable[i].Name + 'page'
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
                    }else{
  if (this.cavantable[is].numpage <= 1) {
                    $('#' + this.cavantable[is].Name + 'page').hide();
                }

                    }
                
                 this.cavantable[is].nowdata = JSON.parse(daitidata);
                console.log("来说",this.cavantable[is])
            }
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
        //赋值
        gitValue() {
       
            this.cavantable = this.textblockData;
            console.log("ssssss",this.textblockData)
            var data = this.dae;

          

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
                            data.Data.ParameterReportItemtList[
                                j
                            ].dd = JSON.parse(
                                data.Data.ParameterReportItemtList[j].dd
                            );
                        }

                        this.cavantable[a].ParameterReportItemtList =
                            data.Data.ParameterReportItemtList[j];
                    }
                }
            }

            var wantnum;
            var end = {};

            for (let i = 0; i < this.cavantable.length; i++) {
                
                console.log(this.cavantable);
                console.log(this.cavantable[i].ParameterReportItemtList.dd.cellparaarray)
                let aid = []
                for(let i3=0;i3<this.cavantable[i].ParameterReportItemtList.dd.kzresourcedataitemarray.length;i3++){
                    if(this.cavantable[i].ParameterReportItemtList.dd.kzresourcedataitemarray[i3].itemdata!==null){
                      aid.push(this.cavantable[i].ParameterReportItemtList.dd.kzresourcedataitemarray[i3])
                    }
                }
                this.cavantable[i].ParameterReportItemtList.dd.kzresourcedataitemarray = aid;
                   console.log("21323123",this.cavantable[i].ParameterReportItemtList.dd.kopngjianarray)
                   let cv  = JSON.stringify(this.cavantable[i].ParameterReportItemtList.dd)
                let wantdata = JSON.parse(cv);

                wantnum = this.cavantable[i].ParameterReportItemtList.dd
                    .cellparaarray;
                this.cavantable[i].sju = this.cavantable[
                    i
                ].ParameterReportItemtList.dd.cellparaarray.filter(item => {
                    if (item.itemtype == '辅助项') {
                        return item;
                    }
                });
                wantnum = wantnum.filter(item => {
                    if (item.itemtype !== '辅助项') {
                        return item;
                    }
                });
               setTimeout(()=>{
                    end = {};
                end.kzresource = wantdata.kzresource;
                end.kzresourceid = wantdata.kzresourceid;
                end.kztimewd = wantdata.kztimewd;
                end.kzbanciwd = wantdata.kzbanciwd;

                end.kzresourcedataitemarray = wantdata.kzresourcedataitemarray;
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
                                //    alert( end.argwaibuparalist[j].starttime);
                                console.log("时间",$($('.' + end.argwaibuparalist[j].kjstart)[0]).find('input').val())
                        } else if (end.argwaibuparalist[j].kjtype == '文本') {
                            if($($('.' + end.argwaibuparalist[j].kjtext)[0]).hasClass('精确匹配')){
                                 end.argwaibuparalist[j].matchtype = '精确匹配'
                            }else  if($($('.' + end.argwaibuparalist[j].kjtext)[0]).hasClass=="模糊匹配"){
                                      end.argwaibuparalist[j].matchtype = '模糊匹配'
                            }
                            // end.argwaibuparalist[j].wenbentext = 'guest';
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
                }else{
                        end.starttime = $($('.' + wantdata.startkongjian)[0])
                    .find('input')
                    .val();
                    
                end.endtime = $($('.' + wantdata.endkongjian)[0])
                    .find('input')
                    .val();
                }
                let onenum = wantnum.filter(item => {
                    if (item.resource == '历史归档') {
                        return item;
                    }
                });
                let twonum = wantnum.filter(item => {
                    if (item.resource == '统计归档') {
                        return item;
                    }
                });
                let threenum = wantnum.filter(item => {
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
                    console.log('历史', one);
                    this.$axios({
                        method: 'post',
                        url: `/api/ParameterReport/SearchItemData`,
                        data: one
                    }).then(res => {
                        console.log('历史', res);
                         if (res.data.data == '无数据'||res.data.data=="[]") {
                            console.log('无数据');
                                   for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                                if(one.cellparalist[a2].defauldisplay!==null){
                                       $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML=this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                }else{
                                   $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = ''
                                }
                            }
                        } else {
                            let a = JSON.parse(res.data.data);
                            let ydata = [];
                       
                            for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                    
                                for (let a1 = 0; a1 < a.length; a1++) {
                                    
                                    if (one.cellparalist[a2].itemdata == a[a1].name &&one.cellparalist[a2].sumtype == a[a1].sumtype
                                    ) {
                                        console.log(one.cellparalist[a2])
                                        if (a[a1].value == null) {
                                        
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        } else {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                          
                                            )[0].innerHTML = this.getPointNum(
                                                a[a1].value,
                                              parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        }
                                    }  else if (
                                        one.cellparalist[a2].itemdata ==
                                        a[a1].name
                                    ) {
                                        // console.log("|asd",ydata)
                                   
                                        if (
                                            ydata.indexOf(
                                                one.cellparalist[a2].id
                                            ) > -1
                                        ) {
                                                console.log("222",ydata)
                                              console.log("ss2",  one.cellparalist[a2].id)
                                        } else {
                                            
                        
                                            if (a[a1].value == null) {
                                                $(
                                                    '#' +
                                                        this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                        one.cellparalist[a1].id
                                                )[0].innerHTML = this.getPointNum(
                                                    one.cellparalist[a2]
                                                        .defauldisplay,
                                                    parseInt(one.cellparalist[a2].xsnumber)
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
                                                      parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                           
                                            }
                                        }
                                    }
                                       
                                }
                            }
                        }
                    });
                }
                console.log('统计', twonum);
                if (twonum.length !== 0) {
                    let acc = this.dealWithData(twonum);
                    console.log('统计2', acc);
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
                    console.log('统计1', wantarr);
                    for (let cc = 0; cc < wantarr.length; cc++) {
                        let one = {};

                        one.starttime = $($('.' + wantdata.startkongjian)[0])
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
                            data: one
                        }).then(res => {
                           console.log('历史', res);
                          if (res.data.data == '无数据'||res.data.data=="[]") {
                            console.log('无数据');
                                   for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                                if(one.cellparalist[a2].defauldisplay!==null){
                                       $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML=this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                }else{
                                   $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = ''
                                }
                            }
                        } else {
                            let a = JSON.parse(res.data.data);
                            let ydata = [];
                            for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                    
                                for (let a1 = 0; a1 < a.length; a1++) {
                                    
                                    if (one.cellparalist[a2].itemdata == a[a1].name &&one.cellparalist[a2].sumtype == a[a1].sumtype
                                    ) {
                                        if (a[a1].value == null) {
                                        
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        } else {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                          
                                            )[0].innerHTML = this.getPointNum(
                                                a[a1].value,
                                              parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        }
                                    }  else if (
                                        one.cellparalist[a2].itemdata ==
                                        a[a1].name
                                    ) {
                                        if (
                                            ydata.indexOf(
                                                one.cellparalist[a2].id
                                            ) > -1
                                        ) {
                                            console.log("ss")
                                        } else {
                                            if (a[a1].value == null) {
                                                $(
                                                    '#' +
                                                        this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                        one.cellparalist[a1].id
                                                )[0].innerHTML = this.getPointNum(
                                                    one.cellparalist[a2]
                                                        .defauldisplay,
                                                    parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                                ydata.push(
                                                    one.cellparalist[a2].id
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
                                                      parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                                ydata.push(
                                                    one.cellparalist[a2].id
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        });
                    }
                }
                if (threenum.length !== 0) {
                    console.log('ssssssssssss', threenum);
                    let wantarr = [];
                    for (
                        let i3 = 0;
                        i3 < this.dealWithData3(threenum).length;
                        i3++
                    ) {
                        wantarr.push(this.dealWithData3(threenum)[i3].allData);
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
                            data: one
                        }).then(res => {
                              console.log('历史', one);
                            //   console.log(JSON.parse(res.data.data))
                         if (res.data.data == '无数据'||res.data.data=="[]") {

                            console.log('无数据');
                             for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                                if(one.cellparalist[a2].defauldisplay!==null){
                                       $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML=this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                }else{
                                   $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = ''
                                }
                            }
                        } else {
                            let a = JSON.parse(res.data.data);
                            let ydata = [];
                            for (
                                let a2 = 0;
                                a2 < one.cellparalist.length;
                                a2++
                            ) {
                    
                                for (let a1 = 0; a1 < a.length; a1++) {
                                    
                                    if (one.cellparalist[a2].itemdata == a[a1].name &&one.cellparalist[a2].sumtype == a[a1].sumtype
                                    ) {
                                        if (a[a1].value == null) {
                                        
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                            )[0].innerHTML = this.getPointNum(
                                                one.cellparalist[a2]
                                                    .defauldisplay,
                                                  parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        } else {
                                            $(
                                                '#' + this.cavantable[i].Name
                                            ).find(
                                                '#' + one.cellparalist[a2].id
                                          
                                            )[0].innerHTML = this.getPointNum(
                                                a[a1].value,
                                              parseInt(one.cellparalist[a2].xsnumber)
                                            );
                                            ydata.push(one.cellparalist[a2].id);
                                        }
                                    }  else if (
                                        one.cellparalist[a2].itemdata ==
                                        a[a1].name
                                    ) {
                                        if (
                                            ydata.indexOf(
                                                one.cellparalist[a2].id
                                            ) > -1
                                        ) {
                                            console.log("ss")
                                        } else {
                                            if (a[a1].value == null) {
                                                $(
                                                    '#' +
                                                        this.cavantable[i].Name
                                                ).find(
                                                    '#' +
                                                        one.cellparalist[a1].id
                                                )[0].innerHTML = this.getPointNum(
                                                    one.cellparalist[a2]
                                                        .defauldisplay,
                                                    parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                                ydata.push(
                                                    one.cellparalist[a2].id
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
                                                      parseInt(one.cellparalist[a2].xsnumber)
                                                );
                                                ydata.push(
                                                    one.cellparalist[a2].id
                                                );
                                            }
                                        }
                                    }
                                    
                                }
                            }
                        }
                        });
                    }
                }
                  if(end.argwaibuparalist.length==0){
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
                    data: end
                })
                    .then(res => {
                        // alert("sad")
                        console.log( $($('.' + wantdata.startkongjian)[0])
                    .find('input'));
                  

                    console.log( $($('.' + wantdata.startkongjian)[0])
                    .find('input').val())
                        console.log(JSON.stringify(end))
                        // alert("ss")
                        console.log('是123', res);
                        
                     if (res.data.data == '无数据'||res.data.data=="[]") {

                            this.cavantable[i].data = [];
                            let ndata = [];
                            for (
                                let i3 = 0;
                                i3 <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                i3++
                            ) {
                                if (
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[i3]
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
                                 console.log('sda',a)
                            this.cavantable[i].data = a;
                            let ndata = [];
                            for (
                                let i3 = 0;
                                i3 <
                                this.cavantable[i].ParameterReportItemtList.dd
                                    .kzresourcedataitemarray.length;
                                i3++
                            ) {
                                if (
                                    this.cavantable[i].ParameterReportItemtList
                                        .dd.kzresourcedataitemarray[i3]
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
                    .then(re1 => {
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
                                    $('#' + this.cavantable[i].Name).find(
                                        '#' + this.cavantable[i].sju[ac].id
                                    )[0].innerHTML = this.getDate();
                                } else if (
                                    this.cavantable[i].sju[ac].itemdata ==
                                    '查询账号'
                                ) {
                                    if (
                                        !JSON.parse(
                                            sessionStorage.getItem('userInfo1')
                                        )
                                    ) {
                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + this.cavantable[i].sju[ac].id
                                        )[0].innerHTML = JSON.parse(
                                            sessionStorage.getItem(
                                                'sightseerInfo1'
                                            )
                                        ).SCMSUserName;
                                    } else {
                                        $('#' + this.cavantable[i].Name).find(
                                            '#' + this.cavantable[i].sju[ac].id
                                        )[0].innerHTML = JSON.parse(
                                            sessionStorage.getItem('userInfo1')
                                        ).SCMSUserName;
                                    }
                                }
                            }

                            this.$nextTick(() => {
                                this.initMainChart();
                            });
                        });
                    });
               })
            }
            }
    }
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
input {
    font-size: 12px;
    border: none;
    height: 30px !important;
    text-align: center;
    outline-style: none;
    white-space: nowrap;
    overflow: hidden;
    word-break: keep-all;
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
