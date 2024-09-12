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
                        <span class="demonstration"></span>
                        <el-date-picker v-model="starttime" type="datetime" placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '180px' }"></el-date-picker>
                        <i class="separate">-</i>
                        <span class="demonstration"></span>
                        <el-date-picker v-model="endtime" type="datetime" placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: '180px' }"></el-date-picker>
                    </div>

                    <span>产品型号</span>
                    <el-select style="margin-left:5px;width:120px" placeholder="请选择" v-model="type">
                        <el-option v-for="item in typeList" :key="item.FID" :label="item.ProductTypeCode" :value="item.FID">
                        </el-option>
                    </el-select>
                    <span>工单类型</span>
                    <el-select style="margin-left:5px;width:120px" placeholder="请选择" v-model="status">
                        <el-option v-for="item in statusList" :key="item.OrderTypeId" :label="item.OrderTypeName"
                            :value="item.OrderTypeId">
                        </el-option>
                    </el-select>
                    <el-input style="margin-left:5px;width:170px" placeholder="请输入关键词" v-model="inputFilter" />
                    <div class="query" @click="req(1)">查询</div>
                </div>
                <div class="fr">
                    <div class="getOrder" @click="exportOrder">导出</div>
                    <!--   <el-upload action="#" :show-file-list="false" :http-request="uploadFile">
                        <div class="getOrder">导入</div>
                    </el-upload> -->
                    <div class="add" @click="openEditOrder('添加')">添加</div>
                </div>
            </div>
            <div class="conter">
                <div class="conter-table">
                    <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="100%"
                        @select="selectFn">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="selection" width="60px"></el-table-column>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column label="操作" width="250px">
                            <template slot-scope="scope">
                                <div class="table-action" @click="issueOrder(scope.row)"
                                    v-show="scope.row.OrderStatus == '待下发'">
                                    下发
                                </div>
                                <div class="table-action" @click="openEditOrder('编辑', scope.row)">
                                    <img src="../../../assets/images/edit.png" alt />
                                </div>
                                <div class="table-action" @click="delOrder(scope.row)">
                                    <img src="../../../assets/images/del.svg" alt />
                                </div>
                                <div class="table-action" @click="openEditOrder('查看', scope.row)">
                                    <img src="../../../assets/images/check.png" alt />
                                </div>
                            </template>

                        </el-table-column>
                        <el-table-column width="150px" label="工单号" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.OrderNumber }}</template></el-table-column>
                        <el-table-column width="100px" prop="OrderSourceName" label="工单来源"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column width="100px" prop="OrderTypeName" label="工单类型"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column width="100px" prop="ProductTypeCode" label="产品型号"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column width="150px" prop="SectionName" label="加工工序"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column width="80px" label="工单数量" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.PlanNumber }}</template>
                        </el-table-column>
                        <el-table-column width="180px" prop="Address" label="计划开始时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.StartTime }}</template>
                        </el-table-column>
                        <el-table-column width="180px" label="计划结束时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.EndTime }}</template>
                        </el-table-column>
                        <el-table-column width="180px" prop="Address" label="备注" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.Remarks }}</template>
                        </el-table-column>
                        <el-table-column width="180px" prop="Address" label="下发时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.UpdateTime }}</template>
                        </el-table-column>
                        <el-table-column width="180px" prop="Address" label="创建时间" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.CreateTime }}</template>
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

        <EditOrder v-if="EditOrderShow" :title="EditOrderTitle" :selectItem="EditOrderSelectItem"
            @callback="EditOrderCallBack" />
    </div>
</template>

<script>
// vue文件中引入echarts工具
import TipsPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/page.vue';
import EditOrder from './EditOrder.vue';
export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
        EditOrder
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,

            starttime: new Date(new Date().toLocaleDateString()),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 - 1
            ),
            inputFilter: '',
            statusList: [],
            status: '',
            typeList: [],
            type: '',

            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            EditOrderShow: false,
            EditOrderTitle: '',
            EditOrderSelectItem: null,

            dataList: [],
            curItem: null,
            delItem: null,
            selectList: [],
        };
    },
    created() {

    },
    watch: {


    },

    methods: {
        selectFn(arr) {
            this.selectList = arr;
        },
        tipCallBack(str) {
            if (str == 'yes') {
                let operatorName = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1')) || (JSON.parse(sessionStorage.getItem('userInfo1')) == null)) {
                    operatorName = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    operatorName = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserName;
                }
                this.$axios({
                    method: 'post',
                    url: `/api/ProjectOrder/DeleteOrder?orderNumber=${this.delItem.Data.OrderNumber}&operatorName=${operatorName}`,
                }).then(res => {
                    if (res.data.code === 0) {
                        this.req(1);
                        this.tipText = '删除成功！';
                        this.isPopShow = true;
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
                    }
                })
            }
            this.noCancel = true;
            this.isPopShow = false;
            this.delItem = null;
        },
        getDate(val) {
            if (val) {
                let date = new Date(val);
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                let hour = date.getHours();
                hour = hour < 10 ? `0${hour}` : hour;
                let minute = date.getMinutes();
                minute = minute < 10 ? `0${minute}` : minute;
                let second = date.getSeconds();
                second = second < 10 ? `0${second}` : second;
                let str = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
                return str;
            }
            return '';
        },
        GetOrderStatus(isFirst) {
            this.$axios({
                url: `/api/ProjectOrder/GetOrderTypeList`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.statusList = res.data.data
                    if (this.statusList && this.statusList.length) {
                        this.status = this.statusList[0].OrderTypeId
                    } else {
                        this.status = '';
                    }
                    this.GetProductType(isFirst)
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        GetProductType(isFirst) {
            this.$axios({
                url: `/api/ProjectOrder/GetProductTypeList`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.typeList = res.data.data
                    if (this.typeList && this.typeList.length) {
                        this.type = this.typeList[0].FID
                    } else {
                        this.type = '';
                    }
                    if (isFirst) {
                        this.req(1)
                    }

                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        exportOrder() {
            if (!this.selectList.length) {
                this.tipText = '请勾选需要导出的工单！';
                this.isPopShow = true;
                return
            }
            console.log(this.selectList)
            this.$axios({
                url: `/api/ProjectOrder/ExportProjectOrderInfoList?orderNumbers=${this.selectList.map(_ => _.Data.OrderNumber).join(',')}`,
                method: 'post',
                responseType: 'blob',
            }).then(res => {
                if (res.status === 200) {
                    this.downloadFile(res.data, '工单管理.xlsx')
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            })
        },
        uploadFile(file) {
            let $this = this
            let formData = new FormData()
            formData.append('file', file.file)
            this.$axios({
                method: 'post',
                // url: `/api/FormulaManage/ImportFormulas`,
                data: formData
            }).then(res => {
                if (res.data.code === 0) {
                    this.req(1);
                    this.tipText = '导入成功！';
                    this.isPopShow = true;
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            })
        },
        issueOrder(item) {
            let operatorName = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1')) || (JSON.parse(sessionStorage.getItem('userInfo1')) == null)) {
                operatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                operatorName = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
            this.$axios({
                method: 'post',
                url: `/api/ProjectOrder/IssueOrder?orderNumber=${item.Data.OrderNumber}&operatorName=${operatorName}`,
            }).then(res => {
                if (res.data.code === 0) {
                    this.req(1);
                    this.tipText = '下发成功！';
                    this.isPopShow = true;
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            })
        },
        delOrder(item) {
            this.tipText = '是否确认删除' + item.Data.OrderNumber + '?';
            this.isPopShow = true;
            this.noCancel = false;
            this.delItem = item
        },
        openEditOrder(type, item) {
            this.EditOrderShow = true
            this.EditOrderTitle = type
            this.EditOrderSelectItem = item
        },
        EditOrderCallBack(str) {
            this.EditOrderShow = false
            if (str) {
                this.tipText = str;
                this.isPopShow = true;
                this.req(1)
            }
        },
        req(_index) {
            this.$axios({
                url: `/api/ProjectOrder/GetProjectOrderInfoList?StartTime=${this.getDate(this.starttime)}&EndTime=${this.getDate(this.endtime)}&PageSize=${this.pageData.PageSize}&PageIndex=${_index}&FID=${this.type}&orderTypeId=${this.status}&KeyWord=${this.inputFilter}`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.DataList;
                    this.pageData = res.data.data.ParameterList;
                    if (this.dataList && this.dataList.length) {
                        this.curItem = this.dataList[0]
                    } else {
                        this.curItem = null;
                    }
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },


    },
    //渲染后计算宽度
    mounted() {
        this.GetOrderStatus(true)
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
            width: 50px;
            float: left;
            height: 25px;
            border-radius: 13px;
            background-color: #fff;
            border: 1px solid #cccccc;
            margin-left: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2CBDBD;

            img {

                height: 18px;

            }
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
    height: 100%;
    float: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
        margin-left: 10px;
    }

    .add {
        background-color: #23d052;
        color: #fff;
        margin: 0 10px;
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
 