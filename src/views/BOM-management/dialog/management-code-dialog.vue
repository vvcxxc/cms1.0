<template>
    <el-dialog v-if="visible" :title="title" :visible="visible" v-el-drag-dialog @open="open" @close="close" width="400px"
        top="14vh" custom-class="common_dialog">
        <div class="wrap blackItem">

            <div>
                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                    <el-form-item label="产品型号:">
                        {{ currentRowData.ProductTypeCode }}
                    </el-form-item>
                    <el-form-item label="物料编号" prop="MID">
                        <el-select v-model="form.MID" placeholder="请选择" style="width: 100%" @change="checkMid">
                            <el-option v-for="item in materials" :key="item.MId" :label="item.MaterialCode"
                                :value="item.MId" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料名称" prop="MaterialName">
                        <el-input v-model="form.MaterialName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="规格型号" prop="Version">
                        <el-input v-model="form.Version" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="Unit">
                        <el-input v-model="form.Unit" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用量" prop="Usage">
                        <el-input v-model="form.Usage"></el-input>
                    </el-form-item>
                    <el-form-item label="工序" prop="WID">
                        <el-select v-model="form.WID" placeholder="请选择" style="width: 100%">
                            <el-option v-for="item in workSections" :key="item.WID" :label="item.WorkName"
                                :value="item.WID" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="扫码顺序标识" prop="Sequence">
                        <el-input v-model="form.Sequence"></el-input>
                    </el-form-item>
                    <el-form-item label="写入变量" prop="WriteVariables">
                        <el-input v-model="form.WriteVariables" disabled></el-input>
                        <div class="unit" @click="handleChoose('WriteVariables')">…</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button class="d_footer_cancel" @click="close">{{
                lang.PopupCommon_Cancel
            }}</el-button>
            <el-button class="d_footer_sure" @click="confirm">{{
                lang.PopupCommon_Save
            }}</el-button>
        </span>
        <variable-select v-if="isVariableShow" :data="chooseArr" @variableSelectCallBack="variableSelectCallBack" />
    </el-dialog>
</template>
  
<script>
import _ from 'lodash';
import api from '@/api/material-management/index.js';
import VariableSelect from '../../../components/public/variableSelect.vue';

export default {
    name: 'ManagementCodeDialog',
    props: {
        title: {
            type: String,
            default: '',
        },
        currentRow: {
            type: Object,
            default: () => ({}),
        },
        visible: {
            type: Boolean,
            default: false,
        },
        formData: {
            type: Object,
            default: () => { },
        },
        dialogFormData: {
            type: Object,
            default: () => ({}),
        },
        currentRowData: {
            type: Object,
            default: () => ({}),
        },

    },
    components: {
        VariableSelect,
    },
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            form: {
                MID: '',
                Usage: '',
                WID: '',
                Unit: '',
                MaterialName: '',
                Version: ''
            },
            rules: {
                MID: [
                    {
                        required: true,
                        message: '请选择物料编号',
                        trigger: 'blur',
                    },
                ],
                Usage: [
                    {
                        required: true,
                        message: '请输入物料用量',
                        trigger: 'blur',
                    },
                ],
                WID: [
                    {
                        required: true,
                        message: '请选择工序',
                        trigger: 'blur',
                    },
                ],
                Sequence: [
                    {
                        required: true,
                        message: '请输入扫码顺序标识',
                        trigger: 'blur',
                    },
                ],
                WriteVariables: [
                    {
                        required: true,
                        message: '请选择写入变量',
                        trigger: 'blur',
                    },
                ],
            },
            materials: [],
            workSections: [],
            isVariableShow: false, // 选择变量弹窗
            chooseArr: [], // 变量类型
            chooseText: '',
        };
    },
    mounted() {
        console.log("currentRowData", this.currentRowData)
        this.initList()
        if (Object.keys(this.dialogFormData).length) {
            let data = {
                ..._.cloneDeep(this.dialogFormData),
                ProductTypeID: this.currentRowData.ID
            };
            this.form = data;

        }
    },
    methods: {
        // 选择变量
        handleChoose(val) {
            const obj = {
                // CarNoTagName: 'int',
                // IsReachTagName: 'bool',
                // InputTunnelTagName: 'int',
                // UpdateCompleteTagName: 'bool',
                // IsLeisureTagName: 'bool',
                // OutputTunnelTagName: 'int',
            };
            if (obj[val] == 'int') {
                this.chooseArr = [
                    '有符号8位整型',
                    '无符号8位整型',
                    '有符号16位整型',
                    '无符号16位整型',
                    '有符号32位整型',
                    '无符号32位整型',
                    '有符号64位整型',
                    '无符号64位整型',
                    '日期时间'
                ];
            } else {
                this.chooseArr = ['不限',
                    '二进制变量',
                    '字符串',
                    '有符号8位整型',
                    '无符号8位整型',
                    '有符号16位整型',
                    '无符号16位整型',
                    '有符号32位整型',
                    '无符号32位整型',
                    '有符号64位整型',
                    '无符号64位整型',
                    '日期时间'
                ];
            }
            this.chooseText = val;
            this.isVariableShow = true;
        },
        // 弹窗回调
        variableSelectCallBack(str, val) {
            this.isVariableShow = false;
            if (str == 'yes') {
                this.form[this.chooseText] = val.Name;
            }
        },
        checkMid() {
            let _obj = this.materials.find(item => item.MId == this.form.MID)
            if (_obj) {
                this.form.Unit = _obj.Unit;
                this.form.MaterialName = _obj.MaterialName;
                this.form.Version = _obj.Version;
            } else {
                this.form.Unit = '';
                this.form.MaterialName = '';
                this.form.Version = '';
            }
        },
        async initList() {
            const materials = await api.QueryMaterials();
            this.materials = _.get(materials, 'data.data', []);
            const workSections = await api.QueryWorkSections();
            this.workSections = _.get(workSections, 'data.data', []);
        },
        open() { },
        close() {
            this.$emit('close');
        },

        async confirm() {
            this.$emit('confirm');
        },

        async validate() {
            return await this.$refs['form'].validate();
        },

        clearValidate() {
            this.$refs['form'].resetFields();
        },
    },
};
</script>
<style lang='scss' >
.blackItem .el-form-item__label {
    color: #000;
}
</style>
<style lang='scss' scoped>
.wrap {
    .wrap_item {
        display: flex;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        padding-left: 10px;
        height: 50px;

        &::before {
            content: '';
            position: absolute;
            width: 3px;
            height: 20px;
            left: 0;
            background: #508beb;
        }

        .wrap_item_label {
            width: 90px;
        }

        .wrap_item_content {
            width: 360px;
        }

        .wrap_item_origin {
            padding-left: 10px;
            width: 100%;
        }
    }

    .unit {
        width: 36px;
        height: 24px;
        border-radius: 4px;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translate(0, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #386df0;
        background: #e4eafb;
        cursor: pointer;
    }
}

.wrap_main {
    border: 1px solid #d6d6d6;
    height: 430px;
    padding: 0 15px;
    box-sizing: border-box;
    background: #e6e6e6;
}

.wrap_main_header {
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .main_header_title {
        color: #386df0;
    }
}

.wrap_main_content {
    width: 100%;
    height: calc(100% - 46px - 20px);
}
</style>