<!--
 * @Description: 这是班组页面（组件）
 * @Date: 2020-08-10 09:10:53
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 11:39:39
-->
<template>
    <div class="Team_box">
        <div class="page-contain">
            <div class="search-container">
                <div class="search-left">
                    <el-input
                        v-model="KeyWord"
                        placeholder="请输入班次编码/班次类别查询"
                        style="width: 230px;"
                    ></el-input>
                    <div class="btn btn-query" @click="getList">
                        查询
                    </div>
                </div>
                <div class="search-right">
                    <div class="btn" @click="openShiftPop('新增班次')">
                        新增
                    </div>
                    <div class="btn btn-success" @click="exportTable()">
                        导出
                    </div>
                </div>
            </div>
            <div class="view-container flex-column-layout">
                <div class="table-contain full-flex">
                    <my-table
                        :data="tableData"
                        :tableHead="tableHead"
                        style="width: 100%"
                    >
                        <template #OptionList="{scope}">
                            <div
                                class="opt-btn"
                                @click="openShiftPop('编辑班次', scope)"
                            >
                                编辑
                            </div>
                            <div class="opt-btn" @click="delShift(scope)">
                                删除
                            </div>
                        </template>

                        <template #DeliveryDate="{scope}">
                            {{
                                calculateHours(
                                    scope.sType,
                                    scope.sStartTime,
                                    scope.sEndTime
                                )
                            }}
                        </template>
                        <template #sType="{scope}">
                            {{ scope.sType == 0 ? '当天' : '跨天' }}
                        </template>
                        <template #sStartTime="{scope}">
                            {{ formatFn(scope.sStartTime) }}
                        </template>
                        <template #sEndTime="{scope}">
                            {{ formatFn(scope.sEndTime) }}
                        </template>
                    </my-table>
                </div>
            </div>
        </div>
        <EditShiftPop
            v-if="shiftPopShow"
            :title="shiftPopTitle"
            :selectItem="shiftPopSelectItem"
            @callback="shiftPopCallback"
        />
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>

<script>
import moment from 'moment';
import MyTable from '@/components/public/table0Diy.vue';
import EditShiftPop from './component/EditShiftPop.vue';
import TipPop from '../../components/public/tipPop.vue';

export default {
    name: 'team',
    components: {
        MyTable,
        EditShiftPop,
        TipPop
    },
    data() {
        return {
            delItem: '',
            isTipShow: false,
            tipText: '',
            noCancel: true,
            shiftPopShow: false,
            shiftPopTitle: '',
            shiftPopSelectItem: null,

            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],

            KeyWord: '',
            tableData: [],
            tableHead: {
                OptionList: {
                    name: '操作',
                    width: 120,
                    slot: 'OptionList'
                },
                sCode: '班次编码',

                sCategory: '班次类别',
                sType: {
                    name: '类型',
                    slot: 'sType'
                },
                sStartTime: '班次开始时间',
                sEndTime: '班次结束时间',
                DeliveryDate: {
                    name: '工时(h)',
                    slot: 'DeliveryDate'
                },
                sRemark: '备注',
                sStaff: '更新人',
                sRefreshTime: '更新时间'
            },
            jurisdiction: [],
            buttonarr: [],
            dcid: '',
            xzid: '',
            bjid: '',
            scid: '',
            dcshow: true,
            xzshow: true,
            bjshow: true,
            scshow: true
        };
    },
    watch: {
        VpowerData(val) {
            this.getPower();
        }
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    mounted() {
        this.getPower();
        this.getList();
    },

    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log(' this.buttonarr', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '班次管理-添加按钮') {
                    this.xzid = item.RightID;
                } else if (item.RightName == '班次管理-编辑按钮') {
                    this.bjid = item.RightID;
                } else if (item.RightName == '班次管理-删除按钮') {
                    this.scid = item.RightID;
                } else if (item.RightName == '班次管理-导出按钮') {
                    this.dcid = item.RightID;
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

        formatFn(str) {
            console.log('str', str);
            return moment(str).format('HH:mm');
        },
        downloadFile(file, fileName) {
            const blob = new Blob([file]);
            // 兼容不同浏览器的URL对象
            const url = window.URL || window.webkitURL;
            // 创建下载链接
            const downloadHref = url.createObjectURL(blob);
            // 创建a标签并为其添加属性
            let downloadLink = document.createElement('a');
            downloadLink.href = downloadHref;
            downloadLink.download = fileName;
            // 触发点击事件执行下载
            downloadLink.click();
            window.URL.revokeObjectURL(url);
        },
        exportTable() {
            if (!this.dcshow) {
                this.isTipShow = true;
                this.tipText = this.lang.NoOperationAuthority;
                return;
            }
            this.$axios({
                method: 'get',
                url: `/api/Class/ExportShift`,
                responseType: 'blob'
            }).then(res => {
                if (res.status === 200) {
                    this.downloadFile(res.data, '班次管理.xls');
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        calculateHours(sType, sStartTime, sEndTime) {
            if (!sStartTime || !sEndTime) {
                return '-';
            }
            let d;
            let stList = sStartTime.split(':');
            let etList = sEndTime.split(':');
            if (sType == 0) {
                let stMin = stList[0] * 60 + stList[1] * 1;
                let etMin = etList[0] * 60 + stList[1] * 1;
                d = (etMin - stMin) / 60;
            } else {
                let stMin = stList[0] * 60 + stList[1] * 1;
                let etMin = etList[0] * 60 + stList[1] * 1 + 24 * 60;
                d = (etMin - stMin) / 60;
            }

            return d.toFixed(1) + 'h';
        },
        tipCallBack(str) {
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `/api/Class/DeleteShift/${this.delItem}`
                }).then(res => {
                    if (res.data.code == 0) {
                        this.isTipShow = true;
                        this.tipText = '删除成功！';
                        this.delItem = '';
                        this.getList();
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
            }

            this.noCancel = true;
            this.isTipShow = false;
        },
        openShiftPop(t, r) {
            console.log(r);
            if (t == '编辑班次') {
                if (!this.bjshow) {
                    this.isTipShow = true;
                    this.tipText = this.lang.NoOperationAuthority;
                    return;
                }
                this.$axios
                    .post(`/api/Class/CheckShift?shiftId=${r.sId}`)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.shiftPopShow = true;
                            this.shiftPopTitle = t;
                            this.shiftPopSelectItem = r;
                        } else {
                            this.isTipShow = true;
                            this.tipText = '当前班次正在排班中，不能编辑！';
                        }
                    });
            } else {
                if (!this.xzshow) {
                    this.isTipShow = true;
                    this.tipText = this.lang.NoOperationAuthority;
                    return;
                }
                this.shiftPopShow = true;
                this.shiftPopTitle = t;
                this.shiftPopSelectItem = r;
            }
        },
        shiftPopCallback(r) {
            if (r) {
                this.isTipShow = true;
                this.tipText = r;
            }
            this.shiftPopShow = false;
            this.shiftPopTitle = '';
            this.shiftPopSelectItem = null;
            this.getList();
        },
        delShift(item) {
            if (!this.scshow) {
                this.isTipShow = true;
                this.tipText = this.lang.NoOperationAuthority;
                return;
            }
            this.isTipShow = true;
            this.tipText = '确认删除当前班次？';
            this.delItem = item.sId;
            this.noCancel = false;
        },
        getList() {
            this.$axios
                .get(`/api/Class/QueryShift?KeyWord=${this.KeyWord}`)
                .then(res => {
                    if (res.data.code === 0) {
                        this.tableData = res.data.data;
                    }
                });
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.Team_box {
    width: 100%;
    height: 100%;

    .page-contain {
        background: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        .search-container {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #ddd;
            padding: 0 10px;
            .search-left {
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }
            .search-right {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            .btn {
                font-weight: bold;
                width: 100px;
                height: 38px;
                line-height: 38px;
                margin-left: 10px;
                border: 2px solid #4270e4;
                background-color: #fff;
                color: #4270e4;
                font-size: var(--fontSize);
                border-radius: 4px;
                text-align: center;
                vertical-align: middle;
                box-sizing: border-box;
                cursor: pointer;

                &.btn-query {
                    background-color: #4270e4;
                    color: #fff;
                }
                &.btn-success {
                    border-color: #46be05;
                    color: #46be05;
                }
            }
        }
        .view-container {
            flex: 1;
        }
        .echart-view {
            height: 45%;
            margin-bottom: 21px;
        }
        .flex-layout {
            display: flex;
        }
        .flex-column-layout {
            display: flex;
            flex-flow: column;
        }
        .full-flex {
            flex: 1;
        }
        .opt-btn {
            color: #4270e4;
            cursor: pointer;
            display: inline-block;
            margin-right: 20px;
        }
    }
}
</style>
