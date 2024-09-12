<template>
    <div style="height: 100%">
        <div class="management">
            <div class="management-header">
                <span class="title" :style="{ fontSize: 20 * a11 + 'px' }">产品型号</span>
                <div class="management-btn">
                    <EditButton v-for="item in managementBtnList" :key="item.keyword" :type="item.type" :text="item.label"
                        :color="colorEnum[item.keyword]" @callback="onBtnClick(item)" />
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%; overflow: auto" highlight-current-row ref="singleTable"
                @row-click="onRowClick" stripe :height="`calc(100% - ` + a11 * 28 + `px)`" :style="{
                    fontSize: a11 * 15 + 'px',
                    width: a11 * 1690 + 'px',
                    height: `calc(100% - ` + a11 * 28 + `px)`,
                }" :row-style="{ height: 50 * a11 + 'px' }" :header-cell-style="{
    background:
        $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
    color: $store.state.color == 'grey' ? '#000' : '#fff',
    'border-left': '1px solid #cccccc',
    height: 50 * a11 + 'px',
    padding: '0',
}">
                <el-table-column type="index" width="80" label='序号'> </el-table-column>
                <el-table-column v-for="item in managementHeader" :key="item.prop" :label="item.label">
                    <template slot-scope="scope">
                        <span>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
        <ManagementDialog v-if="dialogVisible" :appendToBody="true" :visible="dialogVisible" :title="dialogTitle"
            ref="managementDialogRef" :dialogFormData="dialogFormData" @close="dialogVisible = false"
            @confirm="onDialogConfirm" />
    </div>
</template>

<script>
import EditButton from '@/components/public/editButton.vue';
import ManagementDialog from '../dialog/management-dialog.vue';
import api from '@/api/material-management/index.js';
import TipPop from '@/components/public/tipPop.vue'
import _ from 'lodash';

const TABLE_FORM = {
    MANGE: 'manage',
    CODE: 'code',
};
const BTN_EMIT = {
    ADD: 'add',
    EDIT: 'edit',
    DEL: 'del',
};
export default {
    name: 'Management',

    components: { EditButton, ManagementDialog, TipPop },

    inject: ['materialParent'],

    computed: {
        dialogTitle: function () {
            const TITLE_ENUM = {
                [BTN_EMIT.ADD]: '添加产品型号',
                [BTN_EMIT.EDIT]: '编辑产品型号',
            };
            return TITLE_ENUM[this.currentBtnEmitType];
        },
    },

    watch: {
        dialogVisible(val) {
            if (!val) {
                this.dialogFormData = {};
            }
        },
    },

    data() {
        return {
            isPopShow: false,
            noCancel: true, // 弹窗是否带取消按按钮
            managementHeader: [
                { prop: 'ProductTypeCode', label: '产品型号' },
                { prop: 'ProductTypeName', label: '产品名称' },
                { prop: 'MaterialCode', label: '物料编码' },
            ],
            managementBtnList: [
                // {
                //     label: '添加',
                //     keyword: BTN_EMIT.ADD,
                //     type: 'success',
                //     from: TABLE_FORM.MANGE,
                // },
                // {
                //     label: '编辑',
                //     keyword: BTN_EMIT.EDIT,
                //     type: 'warning',
                //     from: TABLE_FORM.MANGE,
                // },
                // {
                //     label: '删除',
                //     keyword: BTN_EMIT.DEL,
                //     type: 'danger',
                //     from: TABLE_FORM.MANGE,
                // },
            ],
            colorEnum: {
                [BTN_EMIT.ADD]: '#80b436',
                [BTN_EMIT.EDIT]: '#e89e42',
                [BTN_EMIT.DEL]: '#c72a29',
            },
            tableData: [],
            dialogVisible: false,
            dialogFormData: {},
            currentBtnEmitType: BTN_EMIT.ADD,
            currentRowData: null,
            jurisdiction: [],
            buttonarr: [],
            tjid: '',
            bjid: '',
            scid: '',
            tjshow: true,
            bjshow: true,
            scshow: true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    created() {
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.67;
        }
        this.initData();
        this.getPower();
    },

    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log('buttonarr', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '物料BOM管理-产品型号添加按钮') {
                    this.tjid = item.RightID;
                } else if (item.RightName == '物料BOM管理-产品型号编辑按钮') {
                    this.bjid = item.RightID;
                } else if (item.RightName == '物料BOM管理-产品型号删除按钮') {
                    this.scid = item.RightID;
                }
            });
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjid}`
            })
                .then(res => {
                    this.tjshow = res.data.data;
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
        async initData() {
            const data = await api.getProdList();
            this.tableData = _.get(data, 'data.data', []);

            this.$refs.singleTable.setCurrentRow(this.tableData[0]);
            this.currentRowData = _.head(this.tableData);
        },



        onRowClick(val) {
            this.currentRowData = val;
        },

        async onBtnClick(item) {
            const { from, keyword } = item;
            this.currentBtnEmitType = keyword;

            if (BTN_EMIT.EDIT === keyword) {
                if (!this.bjshow) {
                    this.tipText = this.lang.NoOperationAuthority;
                    this.noCancel = true
                    this.isPopShow = true;
                    return
                }
                if (!this.currentRowData) {
                    this.changeTipPopConfig('请选中数据', true)
                    return;
                }
                this.dialogFormData = { ...this.currentRowData };
            } else if (BTN_EMIT.DEL === keyword) {
                if (!this.scshow) {
                    this.tipText = this.lang.NoOperationAuthority;
                    this.noCancel = true
                    this.isPopShow = true;
                    return
                }
                if (!this.currentRowData) {
                    this.changeTipPopConfig('请先选择对应产品型号！')
                    return;
                } else {
                    this.changeTipPopConfig(`是否确认删除型号[${this.currentRowData.ProductTypeCode}]`, false)
                    this.isPopShow = true
                    return
                }
            } else if (BTN_EMIT.ADD === keyword) {
                if (!this.tjshow) {
                    this.tipText = this.lang.NoOperationAuthority;
                    this.noCancel = true
                    this.isPopShow = true;
                    return
                }
            }

            this.dialogVisible = true;
        },

        async tipCallBack(str) {
            this.isPopShow = false;
            this.noCancel = true;
            if (str == 'yes') {
                const result = await api.DelProductType(this.currentRowData.ID);
                // const resultStatus = result.data.code === 0 ? 'success' : 'warning'
                const message = result.data.code === 0 ? _.get(result, 'data.data') : _.get(result, 'data.msg')
                // this.$message({
                //     message: message,
                //     type: resultStatus,
                // });
                this.tipText = message;
                this.isPopShow = true;

                await this.initData();
            }
        },

        changeTipPopConfig(text, status = true, isPopShow = true) {
            this.tipText = text
            this.noCancel = status
            this.isPopShow = isPopShow
        },

        async onDialogConfirm() {
            const dialogRef = this.$refs.managementDialogRef;
            await dialogRef.validate();

            let formData = this.$refs.managementDialogRef.form;
            formData = {
                ...formData,
            };

            let interResult = {};

            if (BTN_EMIT.ADD === this.currentBtnEmitType) {
                interResult = await api.AddOrEditProductType(formData);
            } else if (BTN_EMIT.EDIT === this.currentBtnEmitType) {
                interResult = await api.AddOrEditProductType(formData);
            }

            const status =
                _.get(interResult, 'data.code') === 0 ? 'success' : 'warning';
            const msg = _.get(interResult, 'data.code') === 0 ? '保存成功' : _.get(interResult, 'data.msg')
            // this.$message({
            //     message: msg,
            //     type: status,
            // });
            this.tipText = msg;
            this.isPopShow = true;
            if (_.get(interResult, 'data.code') == 0) {
                this.initData();
                this.dialogVisible = false;
            }

        },
    },
};
</script>

<style lang="scss" scoped>
.title {
    color: #386df0;
    font-size: 15px;
    font-weight: 600;
    border-left: 3px solid #386df0;
    padding-left: 5px;
}

.management {
    height: 100%;

    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
}

td {
    background-color: #d4defb;
}
</style>
