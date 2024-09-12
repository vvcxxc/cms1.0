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
            <my-search :searchList="searchList" :searchData="searchData" @setParams="setParams" @editFn="editFn"
                @backFn="backFn" @delFn="delFn"></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" @handleRowChange1="handleRowChange1"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="PageData" @req="req"></my-page>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
        <MaEdot v-if="editShow" :data="SelectRow" @handleClick="handleClick" />
    </div>
</template>

<script>
import MySearch from '../../components/public/search019.vue';
import MyTable from '../../components/public/table09.vue';
import MyPage from '../../components/public/Pages.vue';
import TipPop from '../../components/public/tipPop.vue';
import MaEdot from './maEdot.vue';

export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        TipPop,
        MaEdot,
    },
    data() {
        return {

            isTipShow: false,
            tipText: '',
            noCancel: true,
            isdel: false,
            isCre: false,
            isBac: false,
            a11: 1,
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
                    title: '订单状态：',
                    model: 'Status',
                    type: 'select',
                    optionList: [],
                    value: 'Value',
                    label: 'Text'
                },
                {
                    title: '生产锅组：',
                    model: 'BoilerGroup',
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
                Status: '',
                BoilerGroup: ''
            },
            tableHead: {
                Number: '序号',
                StatusDescription: '订单状态',
                BoilerGroup: '生产锅组',
                BatchNo: '批次号',
                OrderNo: '订单号',
                Type: '类型',
                FormulaNo: '配方号',
                BomName: '工艺路线',
                BomDescription: '工艺说明'
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
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            editShow: false,
            SelectRow: null,
            BoilerGroup: '',
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
                `/api/BoilerVoucher/GetStatus`,
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
        this.$axios
            .get(
                `/api/BoilerVoucher/GetBoilerGroup`,
            )
            .then(res => {
                if (res.data.code == 0) {
                    let temp = res.data.data;
                    temp.unshift({ Value: '', Text: '全部' })
                    this.searchList[3].optionList = temp;
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
        handleRowChange1(row) {
            this.SelectRow = { ...row }
        },
        editFn() {
            if (!this.SelectRow) {
                this.isTipShow = true;
                this.tipText = `请选择投料项！`
                return;
            }
            if (this.SelectRow.Status != 0) {
                this.isTipShow = true;
                this.tipText = `请选择未投料订单！`
                return;
            }
            this.editShow = true;
        },
        backFn() {
            if (!this.SelectRow) {
                this.isTipShow = true;
                this.tipText = `请选择投料项！`
                return;
            }
            this.isTipShow = true;
            this.tipText = `是否撤回选中项？`
            this.noCancel = false;
            this.isBac = true;
         },
        delFn() {
            if (!this.SelectRow) {
                this.isTipShow = true;
                this.tipText = `请选择删除项！`
                return;
            } else if (this.SelectRow.Status != 0) {
                this.isTipShow = true;
                this.tipText = `只允许删除未投料订单，请重新选择！`
                return;
            } else if (this.SelectRow.IsExists) {
                this.isTipShow = true;
                this.tipText = `该订单已完成备料，不可删除！`
                return;
            }
            this.isTipShow = true;
            this.tipText = `是否删除选中项？`
            this.noCancel = false;
            this.isdel = true;
        },
        handleClick(str, data, arr) {
            if (str == 'yes') {
                if (!data.BoilerGroup) {
                    this.tipText = '请选择生产锅组！';
                    this.isTipShow = true;
                    return
                }
                this.$axios({
                    method: 'post',
                    url: `/api/BoilerVoucher/ToFeeding/${data.OrderId}?boilerGroup=${data.BoilerGroup}`,
                })
                    .then(res => {
                        if (res.data.code == 0 && res.data.data) {
                            //res.data.data为true
                            let guo = arr.find(_ => _.Value == data.BoilerGroup).Text;
                            this.BoilerGroup = data.BoilerGroup;
                            this.isTipShow = true;
                            this.tipText = `${guo}存在未开始扫码投料的订单，是否切换并开始新订单？`
                            this.noCancel = false;
                            this.isCre = true;
                        } else if (res.data.code == 0 && !res.data.data) {
                            this.isTipShow = true;
                            this.tipText = '开始投料成功';
                            this.editShow = false;
                            this.req(1)
                        } else {
                            this.isTipShow = true;
                            this.tipText = res.data.msg;
                        }
                    })

            } else {
                this.editShow = false;
            }
        },
        tipCallBack(str) {
            if (str == 'yes') {
                if (this.isdel) {
                    this.$axios
                        .delete(
                            `/api/BoilerVoucher/Delete/${this.SelectRow.Id}`,
                        )
                        .then(res => {
                            console.log('res', res.data);
                            if (res.data.code == 0) {
                                this.isTipShow = true;
                                this.tipText = '删除成功！';
                                this.req(1)
                            } else {
                                this.isTipShow = true;
                                this.tipText = res.data.msg;
                            }
                        })
                } else if (this.isCre) {
                    this.$axios({
                        method: 'post',
                        url: `/api/BoilerVoucher/UpdateOldBoilerVoucher/${this.SelectRow.Id}?boilerGroup=${this.BoilerGroup}`,
                        data: {
                            ...this.SelectRow,
                            BoilerGroup: this.BoilerGroup
                        }
                    })
                        .then(res => {
                            console.log('res', res.data);
                            if (res.data.code == 0) {
                                this.isTipShow = true;
                                this.tipText = '开始投料成功';
                                this.editShow = false;
                                this.req(1)
                            } else {
                                this.isTipShow = true;
                                this.tipText = res.data.msg;
                            }
                        })
                } else if (this.isBac) {
                    this.$axios({
                        method: 'delete',
                        url: `/api/BoilerVoucher/ResetBoilerVoucher/${this.SelectRow.Id}`,
                    })
                        .then(res => {
                            if (res.data.code == 0) {
                                this.isTipShow = true;
                                this.tipText = '投料撤回成功';
                                this.req(1)
                            } else {
                                this.isTipShow = true;
                                this.tipText = res.data.msg;
                            }
                        })
                }
                this.SelectRow = null
            }
            this.isdel = false;
            this.isCre = false;
            this.isBac = false;
            this.noCancel = true;
            this.isTipShow = false;
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
            if (!a) {
                this.isTipShow = true;
                this.tipText = this.lang.NoOperationAuthority;
                return;
            }
            this.searchData = params;
            if (
                new Date(params.argStartTime).getTime() >
                new Date(params.argEndTime).getTime()
            ) {
                this.isTipShow = true;
                this.tipText = this.lang.AlarmRecord_HT_TheQueryDate;
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
                    `/api/BoilerVoucher/Query?&startTime=${params.argStartTime}&endTime=${params.argEndTime}&state=${params.Status}&boilerGroup=${params.BoilerGroup}&keyWord=${params.argKeyword}&pageIndex=${params.argPageIndex}&pageSize=${params.argPageSize}`,
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
                        this.SelectRow = null;
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
