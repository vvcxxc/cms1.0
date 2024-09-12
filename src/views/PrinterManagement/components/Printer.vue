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

                    <span>创建时间</span>
                    <div class="container">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker v-model="starttime" type="datetime" placeholder="请选择"
                                value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '220px' }"></el-date-picker>
                        </div>
                        <i class="separate">-</i>
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker v-model="endtime" type="datetime" placeholder="请选择"
                                value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '220px' }"></el-date-picker>
                        </div>
                    </div>
                    <span>订单状态</span>
                    <el-select style="margin-left:5px;width:120px" placeholder="请选择">
                        <!-- <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option> -->
                    </el-select>
                    <span>产品型号</span>
                    <el-select style="margin-left:5px;width:120px" placeholder="请选择">
                        <!-- <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option> -->
                    </el-select>
                    <el-input style="margin-left:5px;width:170px" placeholder="请输入关键词" />
                    <div class="query">查询</div>
                </div>
                <div class="fr">
                    <div class="add" @click="openEditPrinter('新增')">添加</div>
                </div>
            </div>
            <div class="conter">
                <div class="conter-table">
                    <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="[1, 2]" border height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="Address" label="打印机名称"></el-table-column>
                        <el-table-column prop="Address" label="打印规则"></el-table-column>
                        <el-table-column prop="Address" label="打印信号"></el-table-column>
                        <el-table-column prop="Address" label="打印模板路径"></el-table-column>
                        <el-table-column prop="Address" label="操作">
                            <template slot-scope="scope">
                                <div class="table-action" @click="openEditPrinter('编辑', scope.row)">
                                    编辑
                                </div>
                                <div class="table-action">
                                    删除
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
        <TipsPop :popText="TipsPopText" v-if="isTipsPop"></TipsPop>
        <EditPrinter v-if="EditPrinterShow" :title="EditPrinterTitle" :selectItem="EditPrinterSelectItem"
            @callback="EditPrinterCallBack" />
    </div>
</template>

<script>
// vue文件中引入echarts工具
import TipsPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/page.vue';
import EditPrinter from './EditPrinter.vue';
export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
        EditPrinter
    },
    data() {
        return {
            starttime: new Date(new Date().toLocaleDateString()),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 - 1
            ),
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            EditPrinterShow: false,
            EditPrinterTitle: '',
            EditPrinterSelectItem: null,

        };
    },
    created() {

    },
    watch: {


    },

    methods: {
        openEditPrinter(type, item) {
            this.EditPrinterShow = true
            this.EditPrinterTitle = type
            this.EditPrinterSelectItem = item
        },
        EditPrinterCallBack() {
            this.EditPrinterShow = false
        },
        req(index) {

        },


    },
    //渲染后计算宽度
    mounted() {

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
            margin-left: 18px;
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
 