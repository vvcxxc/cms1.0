<template>
    <div style="height: 100%">
        <div class="management">
            <div class="management-header">
                <span class="title" :style="{ fontSize: 20 * a11 + 'px' }"
                    >物料校验规则</span
                >
                <div class="management-btn">
                    <EditButton
                        v-for="item in managementBtnList"
                        :key="item.keyword"
                        :type="item.type"
                        :text="item.label"
                        :color="colorEnum[item.keyword]"
                        @callback="onBtnClick(item)"
                    />
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%; overflow: auto"
                @row-click="handleRowChange"
                stripe
                :height="`calc(100% - ` + a11 * 28 + `px)`"
                :style="{
                    fontSize: a11 * 15 + 'px',
                    width: a11 * 1690 + 'px',
                    height: `calc(100% - ` + a11 * 28 + `px)`
                }"
                highlight-current-row
                :row-style="{ height: 50 * a11 + 'px' }"
                :header-cell-style="{
                    background:
                        $store.state.color == 'grey' ? '#D9DBDE' : '#5a6c98',
                    color: $store.state.color == 'grey' ? '#000' : '#fff',
                    'border-left': '1px solid #cccccc',
                    height: 50 * a11 + 'px',
                    padding: '0'
                }"
            >
                <el-table-column type="index" width="80" label="序号">
                </el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="img">
                            <div
                                class="up"
                                @click.stop="onActionSort(scope.row, 'up')"
                            >
                                <img :src="up" alt />
                            </div>
                            <div
                                class="up"
                                style="transform: rotate(180deg)"
                                @click.stop="onActionSort(scope.row, 'down')"
                            >
                                <img :src="up" alt />
                            </div>
                        </div>
                    </template>
                </el-table-column> -->
                <el-table-column
                    v-for="item in managementHeader"
                    :key="item.prop"
                    :label="item.label"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row[item.prop] }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <TipPop
            v-if="isPopShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        />
        <CodeDialog
            v-if="dialogVisible"
            :appendToBody="true"
            :visible="dialogVisible"
            :title="dialogTitle"
            ref="managementCodeDialogRef"
            :dialogFormData="dialogFormData"
            :rulesTypeList="rulesTypeList"
            @close="dialogVisible = false"
            @confirm="onDialogConfirm"
            :currentRowData="broCompData.currentRowData"
        />
    </div>
</template>

<script>
import EditButton from '@/components/public/editButton.vue';
import CodeDialog from '../dialog/management-code-dialog.vue';
import TipPop from '@/components/public/tipPop.vue';
import api from '@/api/material-management/index.js';
import _ from 'lodash';

const TABLE_FORM = {
    MANGE: 'manage',
    CODE: 'code'
};
const BTN_EMIT = {
    ADD: 'add',
    EDIT: 'edit',
    DEL: 'del'
};
const broComp = `${TABLE_FORM.MANGE}Ref`;

export default {
    name: 'ManagementCode',

    components: { EditButton, CodeDialog, TipPop },

    inject: ['materialParent'],

    computed: {
        dialogTitle: function() {
            const TITLE_ENUM = {
                [BTN_EMIT.ADD]: '添加校验规则',
                [BTN_EMIT.EDIT]: '编辑校验规则'
            };
            return TITLE_ENUM[this.currentBtnEmitType];
        },
        broCompData: function() {
            return this.materialParent.$refs[broComp];
        },
        validateMid: function() {
            return _.isNull(this.currentMid) || _.isUndefined(this.currentMid);
        }
    },

    watch: {
        dialogVisible(val) {
            if (!val) {
                this.dialogFormData = {};
            }
        },
        'broCompData.currentRowData.MId': {
            handler: function(val, oldVal) {
                console.log(val, 'oldVal');
                if (_.isNull(val) || _.isUndefined(val)) {
                    return;
                }

                this.currentMid = val;
                this.initData(val);
            }
        }
    },

    data() {
        return {
            tipText: '是否确认删除该条码校验规则？',
            isPopShow: false,
            noCancel: true, // 弹窗是否带取消按按钮
            managementHeader: [
                { prop: 'RuleName', label: '规则名称' },
                { prop: 'ParityBitStr', label: '校验类型' },
                { prop: 'CheckModeStr', label: '校验方式' }
            ],
            managementBtnList: [
                {
                    label: '添加',
                    keyword: BTN_EMIT.ADD,
                    type: 'success',
                    from: TABLE_FORM.MANGE
                },
                {
                    label: '编辑',
                    keyword: BTN_EMIT.EDIT,
                    type: 'warning',
                    from: TABLE_FORM.MANGE
                },
                {
                    label: '删除',
                    keyword: BTN_EMIT.DEL,
                    type: 'danger',
                    from: TABLE_FORM.MANGE
                }
            ],
            colorEnum: {
                [BTN_EMIT.ADD]: '#80b436',
                [BTN_EMIT.EDIT]: '#e89e42',
                [BTN_EMIT.DEL]: '#c72a29'
            },
            tableData: [],
            dialogVisible: false,
            dialogFormData: {},
            currentBtnEmitType: BTN_EMIT.ADD,
            tableSelect: {},
            currentMid: null,
            rulesTypeList: [],
            up: require('../../../assets/images/icon_up.png'),
            jurisdiction: [],
            buttonarr: [],
            tjid: '',
            bjid: '',
            scid: '',
            tjshow: true,
            bjshow: true,
            scshow: true,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        };
    },

    created() {
        this.initRulesTypeList();
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.67;
        }
        this.getPower();
    },

    mounted() {},

    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log('buttonarr', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '物料管理-添加物料校验规则') {
                    this.tjid = item.RightID;
                } else if (item.RightName == '物料管理-编辑物料校验规则') {
                    this.bjid = item.RightID;
                } else if (item.RightName == '物料管理-删除物料校验规则') {
                    this.scid = item.RightID;
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
        handleRowChange(row) {
            this.tableSelect = row;
        },
        async initData(val) {
            const data = await api.getCodeRuleInfo(val);
            this.tableData = _.get(data, 'data.data', []);
            this.tableSelect = _.head(this.tableData);
            console.log(this.tableData, 'create manage Code init', data);
        },

        async initRulesTypeList() {
            const data = await api.getCodeRuleTypes();
            this.rulesTypeList = _.get(data, 'data.data', []);
        },

        async onActionSort(row, direction) {
            const request =
                direction === 'up' ? api.postUpCodeSort : api.postDownCodeSort;
            const data = await request(row);
            const code = _.get(data, 'data.code');
            const type = code === 0 ? 'success' : 'warning';
            const msg =
                code === 0 ? _.get(data, 'data.data') : _.get(data, 'data.msg');

            // this.$message({
            //     message: msg,
            //     type
            // });
            this.tipText = msg;
            this.isPopShow = true;
            this.initData(this.currentMid);
        },

        async onBtnClick(item) {
            const { from, keyword } = item;
            this.currentBtnEmitType = keyword;

            if (BTN_EMIT.EDIT === keyword) {
                if (!this.bjshow) {
                    this.tipText = this.lang.NoOperationAuthority;
                    this.noCancel = true;
                    this.isPopShow = true;
                    return;
                }
                if (!this.tableSelect) {
                    this.changeTipPopConfig('请选中数据', true);
                    return;
                }
                this.dialogFormData = { ...this.tableSelect };
            } else if (BTN_EMIT.DEL === keyword) {
                if (!this.scshow) {
                    this.tipText = this.lang.NoOperationAuthority;
                    this.noCancel = true;
                    this.isPopShow = true;
                    return;
                }
                if (!this.tableSelect) {
                    this.changeTipPopConfig('请选中数据', true);
                    return;
                }

                this.changeTipPopConfig('是否确认删除该条码校验规则？', false);

                return;
            } else if (BTN_EMIT.ADD === keyword) {
                if (!this.tjshow) {
                    this.tipText = this.lang.NoOperationAuthority;
                    this.noCancel = true;
                    this.isPopShow = true;
                    return;
                }
            }

            this.dialogVisible = true;
            console.log(from, keyword, ' ---=-- - ', item.keyword, item);
        },

        async tipCallBack(str) {
            this.isPopShow = false;
            this.noCancel = true;
            if (str == 'yes') {
                const result = await api.delManageCode(this.tableSelect.Id);
                const resultStatus =
                    result.data.code === 0 ? 'success' : 'warning';
                const message =
                    result.data.code === 0
                        ? _.get(result, 'data.data')
                        : _.get(result, 'data.msg');
                // this.$message({
                //     message: message,
                //     type: resultStatus,
                // });
                this.tipText = message;
                this.isPopShow = true;

                await this.initData(this.currentMid);
            }
        },

        changeTipPopConfig(text, status = true, isPopShow = true) {
            this.tipText = text;
            this.noCancel = status;
            this.isPopShow = isPopShow;
        },

        async onDialogConfirm() {
            const dialogRef = this.$refs.managementCodeDialogRef;
            await dialogRef.validate();
            let formData = this.$refs.managementCodeDialogRef.form;
            formData = {
                ...formData,
                MId: this.currentMid
            };

            let interResult = {};

            if (BTN_EMIT.ADD === this.currentBtnEmitType) {
                interResult = await api.addManageCode(formData);
            } else if (BTN_EMIT.EDIT === this.currentBtnEmitType) {
                interResult = await api.updateManageCode(formData);
            }
            const codeStatus = _.get(interResult, 'data.code') === 0;
            const msg = codeStatus
                ? '保存成功'
                : _.get(interResult, 'data.msg');
            const status = codeStatus ? 'success' : 'warning';

            // this.$message({
            //     message: msg,
            //     type: status,
            // });
            this.tipText = msg;
            this.isPopShow = true;
            if (_.get(interResult, 'data.code') == 0) {
                this.initData(this.currentMid);
                this.dialogVisible = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.alarm-container {
    // width: clac(100% -40px);
    // height: 100%;
    height: 86vh;
    color: #000;
    margin-top: 100px;
    display: flex;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
}

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

.up {
    width: 58px;
    height: 27px;
    background-color: #fff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    margin-left: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        width: 18px;
        height: 20px;
    }
}

td {
    background-color: #d4defb;
}
</style>
