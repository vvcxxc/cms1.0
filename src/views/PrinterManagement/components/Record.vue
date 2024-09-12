<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div class="tapwater">
        <div class="linebox" id="linebox">
            <div class="query-table clearfix">
                <div class="fl">
                    <el-input style="margin-left:5px;width:170px" v-model="filterStr" placeholder="请输入关键词" />
                    <div class="query" @click="req(1)">查询</div>
                </div>

            </div>
            <div class="conter">
                <div class="conter-table">
                    <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="SerialNo" label="序列号" :show-overflow-tooltip="true"></el-table-column>
                        <!-- <el-table-column prop="AssociatedPrinter" label="打印机名称" width="220px"></el-table-column> -->
                        <el-table-column prop="PrinterPosition" label="打印机位置"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="PrintRuleName" label="打印机规则" width="220px"></el-table-column>
                        <el-table-column prop="CreateTime" label="创建时间" width="220px"></el-table-column>
                        <el-table-column prop="Address" label="操作" width="220px">
                            <template slot-scope="scope">
                                <!-- <div class="table-action" @click="rePrint(scope.row)">
                                    重新打印
                                </div> -->
                                <div class="table-action" @click="openEditPrinter(scope.row)">
                                    日志
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="conter-page">
                    <my-page :pageData="pageData" @req="req"></my-page>
                </div>
            </div>
        </div>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></TipsPop>
        <PrintLog v-if="printLogShow" :selectItem="printLogSelectItem" @callback="printLogCallBack" />
    </div>
</template>

<script>
// vue文件中引入echarts工具
import TipsPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/page.vue';
import PrintLog from './PrintLog.vue';

export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
        PrintLog
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,
            filterStr: '',
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            printLogSelectItem: null,
            printLogShow: false,
            dataList: [],
            printRow: null
        };
    },
    created() {

    },
    watch: {


    },

    methods: {
        tipCallBack(str) {
            if (str == 'yes') {

                // this.$axios({
                //     method: 'post',
                //     // url: `/api/PrinterRecords/DelPrintManagement/${this.delItem.Id}`,
                // }).then(res => {
                //     if (res.data.code === 0) {
                //         this.tipText = '打印成功！';
                //         this.isPopShow = true;
                //     } else {
                //         this.tipText = res.data.msg;
                //         this.isPopShow = true;
                //     }
                // })
            }
            this.noCancel = true;
            this.isPopShow = false;
            this.printRow = null;
        },
        rePrint(row) {
            this.printRow = row;
            this.tipText = ` 是否确定重新打印[打印内容]？`
            this.noCancel = false;
            this.isPopShow = true;
        },
        openEditPrinter(item) {
            this.printLogShow = true
            this.printLogSelectItem = item
        },
        printLogCallBack() {
            this.printLogShow = false
        },
        req(_index) {
            this.$axios({
                url: `/api/PrinterRecords/QueryPrintingRecords?PageSize=${this.pageData.PageSize}&PageIndex=${_index}&KeyWord=${this.filterStr}`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.DataList;
                    this.pageData = res.data.data.ParameterList;

                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },

    },
    //渲染后计算宽度
    mounted() {
        this.req(1)
    },
};
</script>

<style lang="scss">
.tapwater {
    .fl .el-input--prefix .el-input__inner {
        padding-left: 25px !important;
    }

    .table input {
        text-indent: 4px;
    }
}
</style>

<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.conter {
    width: 100%;
    height: calc(100% - 60px);


    .conter-table {
        width: 100%;
        height: calc(100% - 50px);

        .table-action {
            float: left;
            margin-left: 15px;
            color: #4270e4;
            cursor: pointer;
        }
    }

    .conter-page {
        width: 100%;
        height: 50%;

    }

}

.fl {
    float: left;
}

.fr {
    float: right;
}

.clearfix::after {
    content: '';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    zoom: 1;
}

.tapwater {
    box-sizing: border-box;
    width: 100%;
    height: 100%;


    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
    }

    .query-table {
        height: 60px;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;

        span {
            margin-left: 5px;
        }

        .tablename {
            height: 40px;
            width: 250px;
        }

        .tabledatetime {
            height: 40px;
            width: 178px;
        }

        .starttime {
            height: 40px;
            width: 210px;
            display: inline-block;
            margin-left: 18px;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }

        .endtime {
            height: 40px;
            width: 210px;
            display: inline-block;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }
    }

    .query,
    .add,
    .getOrder {
        display: inline-block;
        height: 40px;
        width: 118px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }

    .query {
        background-color: #4270e4;
        margin-left: 10px;
    }

    .getOrder {
        background-color: #ffffff;
        color: #4270e4;
        border: 2px solid #4270e4;
        margin-right: 20px;
    }

    .add {
        background-color: #23d052;
        color: #fff;
        margin-right: 20px;
    }

    .container {
        display: inline-block;
        height: 40px;

        .block {
            display: inline-block;
        }
    }

    .separate {
        position: relative;
        left: 7px;
    }
}
</style>
 