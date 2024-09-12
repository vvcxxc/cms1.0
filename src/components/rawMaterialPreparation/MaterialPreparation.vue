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
        <ZdEdit v-if="isxdEditShow" :title="xdTitle" :data="printrow" @xdEditPopCallBack="xdEditPopCallBack" />
        <CkEdit v-if="isckEditShow" :title="xdTitle" :data="printrow" @ckEditPopCallBack="ckEditPopCallBack" />


        <div class="print1" id="print-content">
            <div class="print-line">备料详情</div>
            <div class="print-left">订单信息</div>
            <div class="print-line">
                <div>订单号</div>
                <div>{{ printrow.Voucher.OrderNo }}</div>
                <div>计划号</div>
                <div>{{ printrow.Voucher.PlanNo }}</div>
                <!-- <div>类型</div>
                <div>{{ printrow.Voucher.Type }}</div> -->
            </div>
            <div class="print-line">
                <div>类型</div>
                <div>{{ printrow.Voucher.Type }}</div>
                <div>产品名称</div>
                <div>{{ printrow.Voucher.ProductName }}</div>
            </div>
            <div class="print-line">
                <!-- <div>产品名称</div>
                <div>{{ printrow.Voucher.ProductName }}</div> -->
                <div>产品编号</div>
                <div>{{ printrow.Voucher.ProductNo }}</div>
                <div>生产批次</div>
                <div>{{ printrow.Voucher.BatchNo }}</div>
            </div>
            <div v-for="item in printrow.GroupedDetails" :key="item.BoilerGroup">
                <div class="print-left">{{ item.GroupDescription }}配料清单</div>
                <div class="print-line">
                    <div>序号</div>
                    <div>原料编号</div>
                    <div>重量</div>
                </div>
                <div class="print-line" v-for="(item2, idx2) in item.Details" :key="item2.Id">
                    <div>{{ Number(idx2) + 1 }}</div>
                    <div>{{ item2.MaterialNo }}</div>
                    <div>{{ item2.NeedWeight }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import MySearch from '../public/search017.vue';
import MyTable from '../public/table013.vue';
import MyPage from '../public/Pages.vue';
import TipPop from '../public/tipPop.vue';
import ZdEdit from './zdEdit.vue';
import CkEdit from './ckEdit.vue';
import html2Canvas from 'html2canvas';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        TipPop,
        ZdEdit,
        CkEdit
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {
                argKeyword: ''
            },
            tableHead: {
                OrderNo: '订单号',
                PlanNo: '计划号',
                Type: '类型',
                ProductName: '产品名称',
                ProductNo: '产品编号',
                BatchNo: '生产批次',
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
            xdTitle: '新建',
            isxdEditShow: false,
            isckEditShow: false,
            printrow: {
                Voucher: {},
                GroupedDetails: []
            },
        };
    },

    mounted() {
        this.req(1);
    },
    methods: {
        handleEdit(type, row) {
            if (type == '打印') {
                this.doPrint(row.Id)
                return
            }
            // if (type == '打印') {
            //     this.$axios
            //         .get(
            //             `/api/PreparationVoucher/Print/${row.Id}`
            //         )
            //         .then(res => {
            //             if (res.data.code != 0) {
            //                 this.tipText = res.data.msg;
            //                 this.isTipShow = true;
            //             }
            //         })
            // } else {
            this.$axios({
                method: 'get',
                url: `/api/PreparationVoucher/Get/${row.Id}`,
            }).then((res) => {
                if (res.data.code == 0) {
                    this.printrow.Voucher = res.data.data.Voucher || {};
                    this.printrow.GroupedDetails = res.data.data.GroupedDetails || [];
                    setTimeout(() => {
                        if (type == '查看') {
                            this.xdTitle = '备料清单查看';
                            this.isckEditShow = true;
                        } else if (type == '备料') {
                            this.xdTitle = '原料备料';
                            this.isxdEditShow = true;
                        }
                        // else if (type == '打印') {
                        //     this.doPrint(row.Id)
                        // }
                    });
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
            // }

        },
        xdEditPopCallBack(str, val, msg) {
            if (str === 'yes') {
                if (!val.Voucher.Weigher) {
                    this.tipText = `称量人不能为空！`;
                    this.isTipShow = true;
                    return;
                }
                if (val.Voucher.Weigher.length > 10) {
                    this.tipText = `称量人限制10个字,请检查！`;
                    this.isTipShow = true;
                    return;
                }
                this.$axios({
                    method: 'post',
                    url: `/api/PreparationVoucher/Complete/${this.printrow.Voucher.Id}`,
                    data: {
                        Id: val.Voucher.Id,
                        Weigher: val.Voucher.Weigher,
                        Details: val.GroupedDetails.reduce((cur, next) => cur.concat(next.Details), [])
                    },
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.tipText = `备料成功`;
                        this.isTipShow = true;
                        this.isxdEditShow = false;
                        this.req(1);
                    } else {
                        this.tipText = res.data.msg;
                        this.isTipShow = true;
                    }
                });
            } else {
                this.isxdEditShow = false;
                if (msg) {
                    this.tipText = msg;
                    this.isTipShow = true;
                }
            }
        },
        ckEditPopCallBack() {
            this.isckEditShow = false;
        },
        tipCallBack(str) {
            if (str == 'yes') {

                // this.$axios({
                //     method: 'delete',
                //     url: `/api/Product/Delete/${this.selectRow.Id}`,
                // }).then((res) => {
                //     this.isTipShow = true;
                //     this.noCancel = true;
                //     if (res.data.code == 0) {
                //         this.tipText = '删除成功';
                //         this.selectRow = null;
                //         this.req(1);
                //     } else {
                //         this.tipText = res.data.msg;
                //     }
                // });
                this.isTipShow = false;
            } else {
                this.isTipShow = false;
            }
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
                    `/api/PreparationVoucher/Query?keyWord=${this.searchData.argKeyword}&pageIndex=${pageIndex}&pageSize=${this.pageData.PageSize}&isCompleted=false`
                    // `/api/PreparationVoucher/Query?isCompleted=true`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    } else {
                        this.tipText = res.data.msg;
                        this.isTipShow = true;
                    }
                })
                .catch(err => { });
        },
        doPrint(id) {
            this.$axios({
                method: 'post',
                url: `http://localhost:8809/PrintData?id=${id}&printType=1`,
            })

            // let dom = document.getElementById('print-content');
            // html2Canvas(dom).then(function (canvas) {
            //     let pageDataHtml = canvas.toDataURL('image/jpeg');
            //     const printWindow = window.open('page.html');
            //     printWindow.document.write(
            //         '<img src="' + pageDataHtml + '" />'
            //     );
            //     setTimeout(() => {
            //         printWindow.print();
            //         printWindow.close();
            //     });

            //     //浏览器有点大病，printWindow点击取消时没问题，点击标签栏x的时候判断不出页面回来了，导致本页面获取不了焦点
            //     //新开一个页面再关掉让他明白我回来了
            //     printWindow.onbeforeunload = () => {
            //         const win = window.open('data:')
            //         win.close()
            //     }
            // });
        },
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

.print1 {
    width: 700px;
    height: auto;
    position: fixed;
    left: 0;
    top: 0;
    transform: translate(-100%, 0);
    background-color: #ffffff;
    border: 1px solid #000;
    border-bottom: none;
    box-sizing: border-box;
    font-size: larger;
    text-shadow: 0.15pt 0px 0px black,
        0.25pt 0px 0px black,
        0.35pt 0px 0px black,
        -0.25pt 0px 0px black,
        0px 0.25pt 0px black,
        0px -0.25pt 0px black;

    .print-line {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 100%;
        border-bottom: 2px solid #000;

        div {
            height: 100%;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 2px solid #000;
        }

        div:last-child {
            border-right: none;
        }
    }

    .print-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 15px;
        box-sizing: border-box;
        height: 50px;
        width: 100%;
        border-bottom: 2px solid #000;
    }



}
</style>
