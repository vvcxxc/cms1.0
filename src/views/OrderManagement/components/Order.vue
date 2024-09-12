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
                        <el-date-picker
                            v-model="starttime"
                            type="datetime"
                            placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :style="{ width: '180px' }"
                        ></el-date-picker>
                        <i class="separate">-</i>
                        <span class="demonstration"></span>
                        <el-date-picker
                            v-model="endtime"
                            type="datetime"
                            placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :style="{ width: '180px' }"
                        ></el-date-picker>
                    </div>

                    <span>产品型号</span>
                    <el-select
                        style="margin-left:5px;width:100px"
                        placeholder="请选择"
                        v-model="type"
                    >
                        <el-option
                            label="不限"
                            value="00000000-0000-0000-0000-000000000000"
                        ></el-option>
                        <el-option
                            v-for="item in typeList"
                            :key="item.FID"
                            :label="item.ProductTypeCode"
                            :value="item.FID"
                        >
                        </el-option>
                    </el-select>
                    <span>订单状态</span>
                    <el-select
                        style="margin-left:5px;width:100px"
                        placeholder="请选择"
                        v-model="status"
                    >
                        <el-option
                            v-for="item in statusList"
                            :key="item.OrderStatusId"
                            :label="item.OrderStatusName"
                            :value="item.OrderStatusId"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                        style="margin-left:5px;width:150px"
                        placeholder="请输入关键词"
                        v-model="inputFilter"
                    />
                    <div class="query" @click="req(1)">查询</div>
                </div>
                <div class="fr">
                    <div class="getOrder" @click="prodModeSetting">
                        生产模式
                    </div>
                    <div class="getOrder" @click="exportFn">导出</div>
                    <div class="getOrder" @click="exportTemplateFn">
                        导出模板
                    </div>
                    <el-upload
                        action="#"
                        accept=".xlsx"
                        :show-file-list="false"
                        :http-request="uploadExcel"
                    >
                        <div class="getOrder" @click="handleUpload">导入</div>
                    </el-upload>

                    <div class="add" @click="openEditOrder('添加')">添加</div>
                </div>
            </div>
            <div class="conter">
                <div class="conter-table">
                    <el-table
                        highlight-current-row
                        :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{
                            background: '#5a6c98',
                            color: '#fff'
                        }"
                        :data="dataList"
                        border
                        height="100%"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            type="index"
                            label="序号"
                            width="60px"
                        ></el-table-column>
                        <el-table-column label="操作" width="250px">
                            <template slot-scope="scope">
                                <div
                                    class="table-action"
                                    @click="issueOrEndOrder(scope.row, '开始')"
                                    v-show="scope.row.OrderStatus == '待下发'"
                                >
                                    开始
                                </div>
                                <div
                                    class="table-action"
                                    @click="issueOrEndOrder(scope.row, '完结')"
                                    v-show="scope.row.OrderStatus == '生产中'"
                                >
                                    完结
                                </div>
                                <div
                                    class="table-action"
                                    @click="openEditOrder('编辑', scope.row)"
                                    v-show="scope.row.OrderStatus != '生产中'"
                                >
                                    <img
                                        src="../../../assets/images/edit.png"
                                        alt
                                    />
                                </div>
                                <div
                                    class="table-action"
                                    @click="delOrder(scope.row)"
                                    v-show="scope.row.OrderStatus != '生产中'"
                                >
                                    <img
                                        src="../../../assets/images/del.svg"
                                        alt
                                    />
                                </div>
                                <!-- <div class="table-action" @click="openEditOrder('查看', scope.row)">
                                    <img src="../../../assets/images/check.png" alt />
                                </div> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="180px"
                            label="订单号"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">{{
                                scope.row.Data.OrderNumber
                            }}</template></el-table-column
                        >
                        <el-table-column
                            width="80px"
                            prop="OrderStatus"
                            label="订单状态"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <div
                                    :style="{
                                        color:
                                            scope.row.OrderStatus == '生产中'
                                                ? '#4CAF50'
                                                : scope.row.OrderStatus ==
                                                  '待下发'
                                                ? '#f44336'
                                                : '#606266'
                                    }"
                                >
                                    {{ scope.row.OrderStatus }}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            width="100px"
                            prop="ProductTypeCode"
                            label="产品型号"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="ProductTypeFormulaCode"
                            label="物料编码"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            label="计划数量"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">{{
                                scope.row.Data.PlanNumber
                            }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="OutputNumber"
                            label="产量"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">{{
                                scope.row.Data.OutputNumber
                            }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="UnOkNumber"
                            label="未完成数"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="OkNumber"
                            label="合格数"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">{{
                                scope.row.Data.OkNumber
                            }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="NgNumber"
                            label="不合格数"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">{{
                                scope.row.Data.NgNumber
                            }}</template>
                        </el-table-column>
                        <el-table-column
                            width="150px"
                            prop="OrderTimeStr"
                            label="下单日期"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            width="150px"
                            prop="DeliveryDateStr"
                            label="交货日期"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="Address"
                            label="备注"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">{{
                                scope.row.Data.Remarks
                            }}</template>
                        </el-table-column>
                        <el-table-column
                            width="150px"
                            prop="Address"
                            label="开始时间"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">{{
                                scope.row.Data.OrderStartTime
                            }}</template>
                        </el-table-column>
                        <el-table-column
                            width="150px"
                            prop="Address"
                            label="创建时间"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">{{
                                scope.row.Data.CreateTime
                            }}</template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="conter-page">
                    <my-page :pageData="pageData" @req="req"></my-page>
                </div>
            </div>
        </div>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop
            v-if="isPopShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></TipsPop>

        <EditOrder
            v-if="EditOrderShow"
            :title="EditOrderTitle"
            :selectItem="EditOrderSelectItem"
            @callback="EditOrderCallBack"
        />
        <EditSetting
            v-if="prodModeSettingShow"
            @callback="prodModeSettingCallBack"
        />
    </div>
</template>

<script>
// vue文件中引入echarts工具
import TipsPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/page.vue';
import EditOrder from './EditOrder.vue';
import EditSetting from './EditSetting.vue';

export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
        EditOrder,
        EditSetting
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,

            starttime: new Date(
                new Date(new Date().toLocaleDateString()) -
                    30 * 24 * 60 * 60 * 1000
            ),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            inputFilter: '',
            statusList: [],
            status: '',
            typeList: [],
            type: '00000000-0000-0000-0000-000000000000',

            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            EditOrderShow: false,
            EditOrderTitle: '',
            EditOrderSelectItem: null,
            prodModeSettingShow: false,
            dataList: [],
            curItem: null,
            delItem: null,
            editType: '',
            editItem: null,
            jurisdiction: [],
            buttonarr: [],
            xfid: '',
            jsid: '',
            scmsid: '',
            dcid: '',
            drid: '',
            xzid: '',
            bjid: '',
            scid: '',
            dcmbid: '',

            xfshow: true,
            jsshow: true,
            scmsshow: true,
            dcshow: true,
            drshow: true,
            xzshow: true,
            bjshow: true,
            scshow: true,
            dcmbshow: true,
            reqTimer: 0
        };
    },
    destroyed() {
        clearTimeout(this.reqTimer);
    },
    beforeDestroy() {
        clearTimeout(this.reqTimer);
    },
    watch: {
        '$store.state.btnPowerData': {
            //脚本事件
            deep: true,
            handler: function(n, o) {
                this.getPower();
            }
        }
    },
    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log(this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '订单管理-下发订单') {
                    this.xfid = item.RightID;
                } else if (item.RightName == '订单管理-结束订单') {
                    this.jsid = item.RightID;
                } else if (item.RightName == '订单管理-生产模式') {
                    this.scmsid = item.RightID;
                } else if (item.RightName == '订单管理-导出订单') {
                    this.dcid = item.RightID;
                } else if (item.RightName == '订单管理-导入订单') {
                    this.drid = item.RightID;
                } else if (item.RightName == '订单管理-新增订单') {
                    this.xzid = item.RightID;
                } else if (item.RightName == '订单管理-编辑订单') {
                    this.bjid = item.RightID;
                } else if (item.RightName == '订单管理-删除订单') {
                    this.scid = item.RightID;
                } else if (item.RightName == '订单管理-导出订单模板') {
                    this.dcmbid = item.RightID;
                }
            });
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xfid}`
            })
                .then(res => {
                    this.xfshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jsid}`
            })
                .then(res => {
                    this.jsshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scmsid}`
            })
                .then(res => {
                    this.scmsshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`
            })
                .then(res => {
                    this.dcshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`
            })
                .then(res => {
                    this.drshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`
            })
                .then(res => {
                    this.xzshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`
            })
                .then(res => {
                    this.bjshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`
            })
                .then(res => {
                    this.scshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcmbid}`
            })
                .then(res => {
                    this.dcmbshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });

            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                this.longinnum = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                this.longinnum = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
        },
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = [];
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i]);
                    return temPath;
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(
                        id,
                        node[i].Children,
                        temPath
                    );
                    if (findResult) {
                        return findResult;
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split('?');
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split('&');
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split('=');
                    if (arr && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return '';
            } else {
                return '';
            }
        },
        tipCallBack(str) {
            if (str == 'yes') {
                if (this.editType == '删除') {
                    let operatorName = '';
                    if (
                        !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                        JSON.parse(sessionStorage.getItem('userInfo1')) == null
                    ) {
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
                        url: `/api/Order/DeleteOrder?orderNumber=${this.delItem.Data.OrderNumber}&operatorName=${operatorName}`
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.req(1);
                            this.tipText = '删除成功！';
                            this.isPopShow = true;
                        } else {
                            this.tipText = res.data.msg;
                            this.isPopShow = true;
                        }
                    });
                }
                if (this.editType == '开始') {
                    this.issueOrder(this.editItem);
                }
                if (this.editType == '完结') {
                    this.endOrder(this.editItem);
                }
            }
            this.noCancel = true;
            this.isPopShow = false;
            this.delItem = null;
            this.editItem = null;
            this.editType = '';
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
        GetOrderStatus() {
            this.$axios({
                url: `/api/Order/GetOrderStatusList`,
                method: 'post'
            }).then(res => {
                if (res.data.code == 0) {
                    this.statusList = res.data.data;
                    if (this.statusList && this.statusList.length) {
                        this.status = this.statusList[0].OrderStatusId;
                    } else {
                        this.status = '';
                    }
                    this.GetProductType();
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        GetProductType() {
            this.$axios({
                url: `/api/Order/GetFormulaProductTypeList`,
                method: 'get'
            }).then(res => {
                if (res.data.code == 0) {
                    this.typeList = res.data.data;
                    // if (this.typeList && this.typeList.length) {
                    //     this.type = this.typeList[0].FID
                    // } else {
                    //     this.type = '';
                    // }
                    this.req(1);
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        exportOrder() {
            this.$axios({
                url: `/api/Order/ExportProjectOrderInfoList?StartTime=${this.getDate(
                    this.starttime
                )}&EndTime=${this.getDate(this.endtime)}&FID=${
                    this.type
                }&orderTypeId=${this.status}&KeyWord=${this.inputFilter}`,
                method: 'get',
                responseType: 'blob'
            }).then(res => {
                if (res.status === 200) {
                    this.downloadFile(res.data, '订单管理.xlsx');
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        uploadFile(file) {
            let $this = this;
            let formData = new FormData();
            formData.append('file', file.file);
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
            });
        },
        issueOrEndOrder(item, type) {
            if (!this.xfshow && type == '开始') {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }

            if (!this.jsshow && type == '完结') {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }

            this.editItem = item;
            this.editType = type;
            this.isPopShow = true;
            this.tipText = `是否确认${type}选中订单`;
            this.noCancel = false;
        },
        issueOrder(item) {
            if (!this.xfshow) {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
            let operatorName = '';
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                operatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                operatorName = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserName;
            }
            this.$axios({
                method: 'post',
                url: `/api/Order/IssueOrder?orderNumber=${item.Data.OrderNumber}&operatorName=${operatorName}`
            }).then(res => {
                if (res.data.code === 0) {
                    this.req(1);
                    this.tipText = '开始成功！';
                    this.isPopShow = true;
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        endOrder(item) {
            if (!this.jsshow) {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
            let operatorName = '';
            if (
                !JSON.parse(sessionStorage.getItem('userInfo1')) ||
                JSON.parse(sessionStorage.getItem('userInfo1')) == null
            ) {
                operatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                operatorName = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserName;
            }
            this.$axios({
                method: 'post',
                url: `/api/Order/EndOrder?orderNumber=${item.Data.OrderNumber}&operatorName=${operatorName}`
            }).then(res => {
                if (res.data.code === 0) {
                    this.req(1);
                    this.tipText = '完结成功！';
                    this.isPopShow = true;
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        delOrder(item) {
            if (!this.scshow) {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
            this.tipText = '是否确认删除' + item.Data.OrderNumber + '?';
            this.isPopShow = true;
            this.noCancel = false;
            this.delItem = item;
            this.editType = '删除';
        },
        exportFn() {
            if (!this.dcshow) {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
            this.$axios({
                url: `/api/Order/ExportProjectOrderInfoList?StartTime=${this.getDate(
                    this.starttime
                )}&EndTime=${this.getDate(this.endtime)}&FID=${
                    this.type
                }&OrderStatus=${this.status}&KeyWord=${this.inputFilter}`,
                method: 'post',
                responseType: 'blob'
            }).then(res => {
                if (res.status === 200) {
                    this.downloadFile(
                        res.data,
                        `订单管理${new Date().getTime()}.xlsx`
                    );
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        exportTemplateFn() {
            if (!this.dcmbshow) {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
            this.$axios({
                url: `/api/Order/ExportProjectOrderTemplate`,
                method: 'post',
                responseType: 'blob'
            }).then(res => {
                if (res.status === 200) {
                    this.downloadFile(
                        res.data,
                        `订单模板${new Date().getTime()}.xlsx`
                    );
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        uploadExcel(file) {
            let _name = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                _name = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserName;
            } else {
                _name = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserName;
            }
            let formData = new FormData();
            formData.append('file', file.file);
            this.$axios({
                method: 'post',
                url: `/api/Order/ImportOrder?loginUserName=${_name}`,
                data: formData
            }).then(res => {
                if (res.data.code == 0) {
                    this.isPopShow = true;
                    this.tipText = '导入成功！';
                    this.req(1);
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        handleUpload(e) {
            if (!this.drshow) {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                e.stopPropagation();
                return;
            }
        },
        prodModeSetting() {
            if (!this.scmsshow) {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
            this.prodModeSettingShow = true;
        },
        prodModeSettingCallBack(str) {
            if (str) {
                this.tipText = str;
                this.isPopShow = true;
            }
            this.prodModeSettingShow = false;
            this.req(1);
        },
        openEditOrder(type, item) {
            if (!this.xzshow && type == '添加') {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
            if (!this.bjshow && type == '编辑') {
                this.isPopShow = true;
                this.tipText = '该用户没有权限!';
                return;
            }
            this.EditOrderShow = true;
            this.EditOrderTitle = type;
            this.EditOrderSelectItem = item;
        },
        EditOrderCallBack(str) {
            if (str) {
                this.tipText = str;
                this.isPopShow = true;
            }
            this.EditOrderShow = false;
            this.req(1);
        },
        req(_index) {
            clearTimeout(this.reqTimer);
            this.$axios({
                url: `/api/Order/GetProjectOrderInfoList?StartTime=${this.getDate(
                    this.starttime
                )}&EndTime=${this.getDate(this.endtime)}&PageSize=${
                    this.pageData.PageSize
                }&PageIndex=${_index}&FID=${this.type}&OrderStatus=${
                    this.status
                }&KeyWord=${this.inputFilter}&QueryHistory=${false}`,
                method: 'get'
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.dataList = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                        if (this.dataList && this.dataList.length) {
                            this.curItem = this.dataList[0];
                        } else {
                            this.curItem = null;
                        }
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
                    }
                    this.reqTimer = setTimeout(() => {
                        this.req(this.pageData.PageIndex);
                    }, 60000);
                })
                .catch(() => {
                    this.reqTimer = setTimeout(() => {
                        this.req(this.pageData.PageIndex);
                    }, 60000);
                });
        }
    },
    //渲染后计算宽度
    mounted() {
        this.getPower();
        this.GetOrderStatus();
    }
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
            color: #2cbdbd;

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
        width: 90px;
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
