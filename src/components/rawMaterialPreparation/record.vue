<!--
 * @Description: 设备台帐操作记录界面
 * @Date: 2019-11-25 19:15:22
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 21:24:17
 -->
<template>
    <div class="public-table">
        <div class="loadcover" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)"
            v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute; width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container">
            <my-search :searchList="searchList" :searchData="searchData" @setParams="setParams" ref="time"></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" ref="child" @handleEdit="handleEdit"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>

        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
        <RdEdit v-if="isckEditShow" title='备料记录' :data="printrow" @ckEditPopCallBack="ckEditPopCallBack" />

    </div>
</template>

<script>
import MySearch from '../public/search016.vue';
import MyTable from '../public/table014.vue';
import MyPage from '../public/Pages.vue';
import TipPop from '../public/tipPop.vue';
import RdEdit from './rdEdit.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        TipPop,
        RdEdit
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '时间范围：',
                    model: 'argStartTime',
                    type: 'time'
                },
                {
                    title: '-',
                    model: 'argEndTime',
                    type: 'time'
                },
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {
                argStartTime: '2017-03-18',
                argEndTime: '2020-03-18',
                argKeyword: ''
            },
            tableHead: {
                OrderNo: '订单号',
                PlanNo: '计划号',
                Type: '类型',
                ProductName: '产品名称',
                ProductNo: '产品编号',
                Weigher: '称量人',
                BatchNo: '生产批次',
                CompletedTime: '备料完成时间'
            },
            data: [],
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            isckEditShow: false,
            printrow: {
                Voucher: {},
                GroupedDetails: []
            },
        };
    },

    mounted() {
        let argStartTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
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
        this.req(1);
    },
    methods: {
        ckEditPopCallBack() {
            this.isckEditShow = false;
        },
        tipCallBack(str) {
            if (str == 'yes') {
                this.isTipShow = false;
            } else {
                this.isTipShow = false;
            }
        },
        handleEdit(row) {

            this.$axios({
                method: 'get',
                url: `/api/PreparationVoucher/Get/${row.Id}`,
            }).then((res) => {
                if (res.data.code == 0) {
                    this.printrow.Voucher = res.data.data.Voucher || {};
                    this.printrow.GroupedDetails = res.data.data.GroupedDetails || [];
                    setTimeout(() => {
                        this.isckEditShow = true;
                    });
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        setParams(params, a) {
            // if (!a) {
            //     this.isTipShow = true;
            //     this.noCancel = true;
            //     this.tipText = '该账号没有权限！';

            //     return;
            // }
            this.searchData = params;
            this.req(1);
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
                        pageIndex !== this.pageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.pageData.TotalPage
                        ) {

                            this.isTipShow = true;
                            this.tipText = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            return;
                        }
                    }
                }
            }
            this.$axios
                .get(
                    `/api/PreparationVoucher/Query?startTime=${this.searchData.argStartTime}&endTime=${this.searchData.argEndTime}&keyWord=${this.searchData.argKeyword}&pageIndex=${pageIndex}&pageSize=${this.pageData.PageSize}&isCompleted=true`
                    // `/api/PreparationVoucher/Query`
                )
                .then(res => {

                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                        this.isTipShow = true;
                     }
                })
                .catch(err => { });
        }
    }
};
</script>

<style lang="scss" scoped>
.public-table {
    display: flex;
    flex-direction: column;
    height: 100%;

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
