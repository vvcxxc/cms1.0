<!-- 历史计划 -->
<template>
    <div class="page-full">
        <div class="page-contain">
            <div class="search-container">
                <my-search
                    :searchList="searchList"
                    :searchData="searchData"
                    @setParams="setParams"
                >
                    <template #btnGroup>
                        <button class="btn btn-info" @click="delPlan">
                            {{ lang.RoleManage_Delete }}
                        </button>
                    </template>
                    <template #default>
                        <button class="btn" @click="exportPlan">
                            {{
                                lang.QualityManage_SampleChoseUserControl_Export
                            }}
                        </button>
                    </template>
                </my-search>
            </div>
            <div class="view-container flex-column-layout">
                <div class="table-contain full-flex">
                    <my-table
                        :data="tableData"
                        :showSelection="true"
                        :tableHead="tableHead"
                        @func="getdata"
                        @func1="getdata1"
                        style="width: 100%"
                    >
                        <template #OptionList="{scope}">
                            <button
                                class="btn opt-btn edit"
                                @click="modifyPlan(scope)"
                            ></button>
                        </template>
                    </my-table>
                </div>
                <div class="paeg-contain">
                    <div class="pager-contain">
                        <my-page :pageData="pageData" @req="req" />
                    </div>
                </div>
            </div>
        </div>
        <cms-dialog
            :tipchange="tipchange"
            :tipword="tipword"
            @confirm="confirmDialog"
            @cancel="closeDialog"
            :showBtnGroup="showBtnGroup"
        />

        <cms-message-box
            v-if="verifyUser"
            title="验证"
            width="500px"
            @close="verifyUser = false"
            @confirm="verifyConfirm"
        >
            <div class="page-table">
                <div class="online">
                    <div class="online-item">
                        <div class="item-label">账号</div>
                        <div class="item-value">
                            <el-input v-model="editPlan.Num" />
                        </div>
                    </div>
                </div>
                <div class="online">
                    <div class="online-item">
                        <div class="item-label">密码</div>
                        <div class="item-value">
                            <el-input v-model="editPlan.Num" />
                        </div>
                    </div>
                </div>
            </div>
        </cms-message-box>

        <cms-message-box
            v-if="showMsg"
            width="765px"
            title="编辑生产计划"
            @close="showMsg = false"
            @confirm="confirmMsg"
        >
            <div class="page-table">
                <div class="online">
                    <div class="online-item">
                        <div class="item-label">计划编号</div>
                        <div class="item-value">
                            <el-input v-model="editPlan.No" disabled />
                        </div>
                    </div>
                    <div class="online-item">
                        <div class="item-label">机型</div>
                        <div class="item-value">
                            <el-input v-model="editPlan.ProductName" disabled />
                        </div>
                    </div>
                </div>
                <div class="online">
                    <div class="online-item">
                        <div class="item-label">图号</div>
                        <div class="item-value">
                            <el-input v-model="editPlan.DrawingNo" disabled />
                        </div>
                    </div>
                    <div class="online-item">
                        <div class="item-label">计划数量</div>
                        <div class="item-value">
                            <el-input
                                v-model="editPlan.PlanNumber"
                                @input="
                                    verifyNumber($event, editPlan, 'PlanNumber')
                                "
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div class="online">
                    <div class="online-item">
                        <div class="item-label">计划开始日期</div>
                        <div class="item-value">
                            <el-date-picker
                                v-model="editPlan.PlanStartDate"
                                type="date"
                                @focus="getZoom()"
                                prefix-icon="auto"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                            >
                            </el-date-picker>
                            <img :src="rili" alt class="inpimg1" />
                        </div>
                    </div>
                    <div class="online-item">
                        <div class="item-label">计划结束日期</div>
                        <div class="item-value">
                            <el-date-picker
                                v-model="editPlan.DeliveryDate"
                                type="date"
                                @focus="getZoom()"
                                value-format="yyyy-MM-dd"
                                prefix-icon="auto"
                                placeholder="选择日期"
                            >
                            </el-date-picker>
                            <img :src="rili" alt class="inpimg1" />
                        </div>
                    </div>
                </div>
                <div
                    class="online"
                    v-if="isEdit && editPlan.ShowActualStartTime"
                >
                    <div class="online-item">
                        <div class="item-label">开工时间</div>
                        <div class="item-value">
                            <el-date-picker
                                v-model="editPlan.ActualStartTime"
                                type="datetime"
                                @focus="getZoom()"
                                prefix-icon="auto"
                                placeholder="选择日期"
                            >
                            </el-date-picker>
                            <img :src="rili" alt class="inpimg1" />
                        </div>
                    </div>
                    <div class="online-item"></div>
                </div>
            </div>
        </cms-message-box>
    </div>
</template>
<script>
import MySearch from '@/components/public/searchDiy.vue';
import MyTable from '@/components/public/table0Diy.vue';
import MyPage from '@/components/public/Pages.vue';
import CmsDialog from '@/components/public/cmsDialog.vue';
import CmsMessageBox from './cmsMessageBox.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        CmsDialog,
        CmsMessageBox
    },
    data() {
        return {
            rili: require('@/assets/images/rili.png'),
            tipchange: false,
            tipword: '',
            showBtnGroup: false,
            action: {
                type: '',
                row: {}
            },
            searchList: [
                {
                    title: '时间范围：',
                    model: 'argStartTime',
                    type: 'date'
                },
                {
                    title: '-',
                    model: 'argEndTime',
                    type: 'date'
                },
                {
                    model: 'classes',
                    type: 'key'
                }
            ],
            searchData: {
                argStartTime: '',
                argEndTime: '',
                classes: ''
            },
            tableData: [],
            tableHead: {
                OptionList: {
                    name: '操作',
                    slot: 'OptionList'
                },
                No: '计划编号',
                DrawingNo: '图号',
                ProductName: '产品名称',
                PlanNumber: '计划数量',
                FeedingQuantity: '投料数',
                OKQuantity: '合格数',
                FinishNumber: '已完工',
                DeliveryDate: '交货日期',
                PlanStartDate: '计划开始',
                ActualStartTime: {
                    name: '下发时间',
                    width: 250
                }
            },
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
            showMsg: false,
            editPlan: {
                Id: '',
                No: '',
                DrawingNo: '',
                PlanNumber: '',
                ProductName: '',
                DeliveryDate: '',
                PlanStartDate: '',
                Operator: '',
                ActualStartTime: '',
                ShowActualStartTime: false
            },
            // 用户验证
            verifyUser: false,
            selected: [],
            actionEvent: {
                delete: () => {
                    this.$axios
                        .delete('/api/ProductionManage/DeletePlans', {
                            data: {
                                Operator: this.getOperator('SCMSUserName'),
                                Ids: [...this.selected]
                            }
                        })
                        .then(res => {
                            this.tipword =
                                res.data.code === 0
                                    ? res.data.data
                                    : res.data.msg;
                            this.tipchange = true;
                            this.getList();
                        });
                }
            },
            jurisdiction: [],
            buttonarr: [],
            scid: '',
            xgid: '',
            scshow: true,
            xgshow: true
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
    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;

            this.buttonarr.forEach(item => {
                if (item.RightName == '历史计划-删除计划') {
                    this.scid = item.RightID;
                } else if (item.RightName == '历史计划-修改计划') {
                    this.xgid = item.RightID;
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`
            })
                .then(res => {
                    this.xgshow = res.data.data;
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
        getOperator(key) {
            // 获取当前信息
            let user = JSON.parse(sessionStorage.getItem('userInfo1'));
            return (user && user[key]) || 'Guest';
        },
        getList(index = null) {
            let { argStartTime, argEndTime, classes } = this.searchData;
            let { PageSize, PageIndex } = this.pageData;
            this.$axios
                .get(
                    encodeURI(`/api/ProductionManage/GetHistoryPlans?start=${argStartTime}
                &end=${argEndTime}&keyword=${classes}&pageSize=${PageSize}&pageIndex=${index ||
                        PageIndex}`)
                )
                .then(res => {
                    let { code, data } = res.data;
                    if (code === 0) {
                        this.tableData = [...data.DataList];
                        console.log(data.DataList);
                        this.pageData = data.ParameterList;
                    }
                });
        },
        setParams(params) {
            console.log('查询', params);
            // 开始时间大于结束时间
            if (
                new Date(params.argStartTime + ' 00:00:00').getTime() >
                new Date(params.argEndTime + ' 00:00:00').getTime()
            ) {
                this.tipchange = true;
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate;
                return;
            }
            this.getList();
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    this.tipword = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    this.tipchange = true;
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
                            this.tipchange = true;
                        }
                        this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                        return;
                    }
                }
            }
            this.getList(pageIndex);
        },
        getdata(data, data1) {
            this.selected = [];
            data1.forEach(item => {
                this.selected.push(item.Id);
            });
        },
        getdata1(data, data1) {
            this.selected = [];
            data1.forEach(item => {
                this.selected.push(item.Id);
            });
        },
        getTime(time = 0) {
            return this.$getDate(
                new Date(new Date().toLocaleDateString()).getTime() + time
            );
        },
        confirmDialog() {
            // 时间格式不正确
            if (
                this.tipword ==
                this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect
            ) {
                this.tipchange = false;
                this.searchData.argStartTime = this.getTime();
                this.searchData.argEndTime = this.getTime(
                    24 * 60 * 60 * 1000 - 1
                );
                return;
            }
            this.action.type !== '' ? this.actionEvent[this.action.type]() : '';
            this.closeDialog();
        },
        closeDialog() {
            this.tipchange = false;
            this.tipword = '';
            this.action.type = '';
            this.showBtnGroup = false;
        },
        modifyPlan(row) {
            if (!this.xgshow) {
                this.tipchange = true;
                this.tipword = '该用户没有操作权限';
                return;
            }
            // this.verifyUser = true;
            console.log(row);
            this.$axios
                .get('/api/ProductionManage/GetPlanById?id=' + row.Id)
                .then(res => {
                    let data = res.data.data;
                    this.isEdit = true;
                    this.showMsg = true;
                    this.editPlan = {
                        Id: data.Id,
                        No: data.No,
                        DrawingNo: data.DrawingNo,
                        PlanNumber: data.PlanNumber,
                        ProductName: data.ProductName,
                        DeliveryDate: data.DeliveryDate,
                        PlanStartDate: data.PlanStartDate,
                        Operator: this.getOperator('SCMSUserName'),
                        ActualStartTime: data.ActualStartTime,
                        ShowActualStartTime: data.ShowActualStartTime
                    };
                });
        },
        confirmMsg() {
            this.$axios
                .post('/api/ProductionManage/ModifyPlan', this.editPlan)
                .then(res => {
                    if (res.data.code === 0) {
                        this.getList();
                        this.showMsg = false;
                        this.tipchange = true;
                        this.tipword = res.data.data;
                    } else {
                        this.tipchange = true;
                        this.tipword = res.data.msg;
                    }
                });
        },
        // 验证提交
        verifyConfirm() {
            this.verifyUser = false;
            // 验证成功
            this.showMsg = true;
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        json2excel(tableJson, filenames, autowidth, bookTypes) {
            let that = this;
            //这个是引用插件
            import('@/vendor/Export2Excel').then(excel => {
                let tHeader = [];
                let dataArr = [];
                let sheetnames = [];
                for (let i in tableJson) {
                    tHeader.push(tableJson[i].tHeader);
                    dataArr.push(
                        that.formatJson(
                            tableJson[i].filterVal,
                            tableJson[i].tableDatas
                        )
                    );
                    sheetnames.push(tableJson[i].sheetName);
                }
                excel.export_json_to_excel({
                    header: tHeader,
                    data: dataArr,
                    sheetname: sheetnames,
                    filename: filenames,
                    autoWidth: autowidth,
                    bookType: bookTypes
                });
            });
        },
        delPlan() {
            if (!this.scshow) {
                this.tipchange = true;
                this.tipword = '该用户没有操作权限';
                return;
            }
            this.tipchange = true;
            if (this.selected.length === 0) {
                this.tipword = '请选择要删除的计划';
                return;
            }
            this.tipword = '是否删除选中的计划';
            this.action.type = 'delete';
            this.showBtnGroup = true;
        },
        exportPlan() {
            let { argStartTime, argEndTime, classes } = this.searchData;
            this.$axios
                .post(
                    encodeURI(
                        `/api/ProductionManage/ExportHistoryPlans?start=${argStartTime}&end=${argEndTime}&keyword=${classes}`
                    )
                )
                .then(res => {
                    if (res.data.code === 0) {
                        let tHeader = [
                            '序号',
                            '计划编号',
                            '计划状态',
                            '图号',
                            '产品名称',
                            '计划数量',
                            '投料数量',
                            '合格数',
                            '已完工',
                            '交货日期',
                            '计划开始',
                            '开工时间'
                        ];
                        let filterVal = [
                            'Number',
                            'No',
                            'StatusDisplay',
                            'DrawingNo',
                            'ProductName',
                            'PlanNumber',
                            'FeedingQuantity',
                            'OKQuantity',
                            'FinishNumber',
                            'DeliveryDate',
                            'PlanStartDate',
                            'ActualStartTime'
                        ];
                        let tableDatas = [...res.data.data];
                        let excelDatas = [
                            {
                                tHeader: tHeader,
                                filterVal: filterVal,
                                sheetName: 'Sheet1',
                                tableDatas: tableDatas
                            },
                            {
                                tHeader: tHeader,
                                filterVal: filterVal,
                                sheetName: 'Sheet2',
                                tableDatas: []
                            }
                        ];
                        this.json2excel(excelDatas, '历史计划', true, 'xlsx');
                    } else {
                        this.tipchange = true;
                        this.tipword = res.data.msg;
                    }
                });
        },
        mGetDate(year, month) {
            let d = new Date(year, month, 0);
            return d.getDate();
        }
    },
    created() {
        let date = new Date();
        let argStartTime =
            date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + '01';
        let argEndTime =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            this.mGetDate(date.getFullYear(), date.getMonth() + 1);
        Object.assign(this.searchData, {
            argStartTime,
            argEndTime
        });
    },
    mounted() {
        this.getPower();
        this.getList();
    }
};
</script>
<style lang="scss" scoped>
.page-full {
    height: 100%;
    overflow: hidden;
    color: #000;
    background-color: #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    .page-contain {
        background: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
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
}
.pane {
    height: 100%;
    background: rgba(255, 255, 255, 0.39);
    border: 1px solid #e5e6e6;

    &:last-child {
        margin-bottom: 0;
    }
}
.opt-btn {
    position: relative;
    background: #fff;
    border-radius: 4px;
    border: 2px solid #ccc;
    width: 60px;
    height: 30px;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;

    &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &.Issued {
        &::after {
            background: url(~@/assets/images/icon_xiafa_nor.png) no-repeat;
            background-size: 100%;
        }
    }

    &.undo {
        &::after {
            background: url(~@/assets/images/icon_revoke_nor.png) no-repeat;
            background-size: 100%;
        }
        &:disabled {
            &::after {
                background: url(~@/assets/images/icon_revoke_dis.png) no-repeat;
                background-size: 100%;
            }
        }
    }

    &.pause {
        &::after {
            background: url(~@/assets/images/icon_pause_nor.png) no-repeat;
            background-size: 100%;
        }
        &:disabled {
            &::after {
                background: url(~@/assets/images/icon_pause_dis.png) no-repeat;
                background-size: 100%;
            }
        }
    }
    &.stop {
        &::after {
            background: url(~@/assets/images/icon_stop_nor.png) no-repeat;
            background-size: 100%;
        }
        &:disabled {
            &::after {
                background: url(~@/assets/images/icon_stop_dis.png) no-repeat;
                background-size: 100%;
            }
        }
    }
    &.edit {
        &::after {
            background: url(~@/assets/images/icon_pensoil.png) no-repeat;
            background-size: 100%;
        }
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
}
.inpimg1 {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 8px;
    top: 8px;
}
</style>
