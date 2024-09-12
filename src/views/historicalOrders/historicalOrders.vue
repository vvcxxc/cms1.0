<!--
 * @Description: 设备台帐操作记录界面
 * @Date: 2019-11-25 19:15:22
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 21:24:17
 -->
<template>
    <div class="historicalOrders">
        <div class="loadcover" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)"
            v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container" :style="{
            height: 60 * a11 + 'px',
        }">
            <my-search :searchList="searchList" :searchData="searchData" @setParams="setParams"></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="PageData" @req="req"></my-page>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

    </div>
</template>

<script>
import MySearch from '../../components/public/search10.vue';
import MyTable from '../../components/public/table08.vue';
import MyPage from '../../components/public/Pages.vue';
import TipPop from '../../components/public/tipPop.vue';

export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        TipPop,
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            a11: 1,
            w: '',
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '查询时间范围：',
                    model: 'argStartTime',
                    type: 'time'
                },
                {
                    title: '-',
                    model: 'argEndTime',
                    type: 'time'
                },
                {
                    title: '生产锅组：',
                    model: 'boilerGroup',
                    type: 'select',
                    optionList: [],
                    value: 'Value',
                    label: 'Text'
                },
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {
                argStartTime: '2017-03-18',
                argEndTime: '2020-03-18',
                argKeyword: '',
                boilerGroup: ''
            },
            tableHead: {
                Number: '序号',
                LastModificationTime: '完成时间',
                BoilerGroup: '生产锅组',
                PlanNo: '计划号',
                OrderNo: '订单号',
                Type: '类型',
                FormulaNo: '配方号',
                BomName: '工艺路线',
                BomDescription: '工艺说明',
                ProductName: '产品名称',
                ProductNo: '产品编号',
                BatchNo: '批次号',
                PushTime: '下发时间',
                FeedTime: '投料时间',
            },
            data: [],
            PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    created() {
        let argStartTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() - 7 * 24 * 60 * 60 * 1000
        );
        let argEndTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1
        );
        Object.assign(this.searchData, {
            argStartTime,
            argEndTime
        });
        this.$axios
            .get(
                `/api/BoilerVoucher/GetBoilerGroup`,
            )
            .then(res => {
                if (res.data.code == 0) {
                    let temp = res.data.data;
                    temp.unshift({ Value: '', Text: '全部' })
                    this.searchList[2].optionList = temp;
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })
        this.req(1);
    },
    mounted() {
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.8;
        }
    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = ($(`.${name}`).width()) / 2 + 'px'
            let top = ($(`.${name}`).height()) / 2 + 'px'
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function (e) {

                console.log(e.target.className.toLocaleLowerCase());
                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center')
                    window.event.stopPropagation();
                    var x = 0;
                    var y = 0;
                    var l = 0;
                    var t = 0;
                    var isDown = false;
                    x = window.event.clientX;
                    y = window.event.clientY;
                    //获取左部和顶部的偏移量
                    l = $(`.${name}`)[0].offsetLeft;
                    t = $(`.${name}`)[0].offsetTop;
                    //开关打开
                    isDown = true;
                    var pdmove = false;


                    //设置样式
                    $('body')[0].style.cursor = 'move';

                    $('body')[0].addEventListener('mousemove', function (e) {
                        pdmove = true;
                        if (isDown == false) {
                            return;
                        }
                        //获取x和y
                        var nx = window.event.clientX;
                        var ny = window.event.clientY;

                        //计算移动后的左偏移量和顶部的偏移量
                        var nl = nx - (x - l);
                        var nt = ny - (y - t);
                        console.log(nx)
                        console.log(x)
                        console.log(l)
                        $(`.${name}`)[0].style.left = nl + 'px';
                        $(`.${name}`)[0].style.top = nt + 'px';
                    });
                    $('body')[0].addEventListener('mouseup', function (e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
        },
        getDays(beginTime, endTime) {
            beginTime = new Date(beginTime);
            endTime = new Date(endTime);
            let dateDiff = endTime.getTime() - beginTime.getTime()
            //相差天数
            let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000))
            //相差小时数
            let leave1 = dateDiff % (24 * 3600 * 1000)
            let hours = Math.floor(leave1 / (3600 * 1000))
            //相差分钟数
            let leave2 = leave1 % (3600 * 1000)
            let minutes = Math.floor(leave2 / (60 * 1000))
            //秒数
            let leave3 = leave2 % (60 * 1000)
            let seconds = Math.round(leave3 / 1000)
            //计算两个日期之间相差的天数、分钟数、秒数
            console.log('相差天数' + dayDiff);
            console.log('相差小时数' + hours);
            console.log('相差分钟数' + minutes);
            console.log('相差秒数' + seconds);
            return dayDiff;
        },
        setParams(params, a) {
            this.searchData = params;
            if (
                new Date(params.argStartTime).getTime() >
                new Date(params.argEndTime).getTime()
            ) {
                this.isTipShow = true;
                this.tipText = this.lang.AlarmRecord_HT_TheQueryDate;
                return
            }
            this.req(1)
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    this.isTipShow = true;
                    this.tipText = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.PageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.PageData.TotalPage
                        ) {
                            this.isTipShow = true;
                            this.tipText = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            return;
                        }
                    }
                }
            }
            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.PageData.PageSize
            });
            this.$axios
                .get(
                    `/api/BoilerVoucher/QueryHistory?startTime=${params.argStartTime}&endTime=${params.argEndTime}&boilerGroup=${params.boilerGroup}&keyWord=${params.argKeyword}&pageIndex=${params.argPageIndex}&pageSize=${params.argPageSize}&isCompleted=true&state=1`,
                )
                .then(res => {
                    console.log('res', res.data);
                    if (res.data.code == 0) {
                        let i = 0;
                        for (i in res.data.data.DataList) {
                            res.data.data.DataList[i].Number = ++i;
                        }
                        this.data = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
                .catch(err => {
                    this.isTipShow = true;
                    this.tipText = this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
                    this.data = '';
                    this.PageData = {
                        PageSize: 50,
                        TotalCount: 0,
                        TotalPage: 0,
                        PageIndex: 1,
                        LastEnabled: false,
                        NextEnabled: false
                    };
                    this.$store.state.isShow = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.historicalOrders {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    .search-container {
        height: 60px;
    }

    .table-container {
        flex: 1;
        overflow: hidden;
    }

    .page-container {
        height: 60px;
    }
}

.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 39999990;
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
        padding: 30px;
        // text-align: center;
        padding-bottom: 0;
    }

    .tipcontanin {
        height: calc(100% - 40px);
    }

    .w {
        width: 100%;
        height: 75%;
        padding: 12px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }

    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
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

.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}

.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}

.fcolor {
    color: #000 !important;
}

.colordiv {
    background-color: #d9dbde !important;
}

.colortip {
    background-color: #efeff0 !important;
}
</style>
