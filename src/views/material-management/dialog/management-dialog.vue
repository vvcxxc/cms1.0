<template>
    <el-dialog
        v-if="visible"
        :title="title"
        :visible="visible"
        v-el-drag-dialog
        @open="open"
        @close="close"
        width="480px"
        top="14vh"
        custom-class="common_dialog"
    >
        <div class="wrap">
            <div>
                <el-form
                    ref="form"
                    :model="form"
                    label-width="120px"
                    :rules="rules"
                >
                    <el-form-item label="物料编号" prop="MaterialCode">
                        <el-input
                            v-model="form.MaterialCode"
                            :disabled="isEdit"
                            placeholder="请输入物料编号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="物料名称" prop="MaterialName">
                        <el-input
                            v-model="form.MaterialName"
                            placeholder="请输入物料名称"
                            :maxlength="15"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="版本号" prop="Version">
                        <el-input
                            v-model="form.Version"
                            placeholder="请输入版本号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="Unit">
                        <el-input
                            v-model="form.Unit"
                            placeholder="请输入单位"
                        ></el-input>
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
        <el-dialog title="选择变量" :visible.sync="isVariableShow" width="50%">
            <VariableSelect
                v-if="isVariableShow"
                :data="chooseArr"
                @variableSelectCallBack="variableSelectCallBack"
            />
        </el-dialog>
    </el-dialog>
</template>
  
<script>
import _ from 'lodash';
import VariableSelect from '../dialog/variable-select.vue';
const BTN_EMIT = {
    ADD: 'add',
    EDIT: 'edit',
    DEL: 'del',
};

export default {
    name: 'ManagementDialog',
    components: { VariableSelect },

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
            default: () => {},
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        pageConfig: {
            type: Object,
            default: () => {},
        },
        dialogFormData: {
            type: Object,
            default: () => ({}),
        },
        deviceList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            form: {
                MaterialName: '',
                MaterialCode: '',
                Version: '',
                Unit: '',
            },
            rules: {
                MaterialCode: [
                    {
                        required: true,
                        message: '请输入物料编号',
                        trigger: 'blur',
                    },
                ],
                MaterialName: [
                    {
                        required: true,
                        message: '请输入物料名称',
                        trigger: 'blur',
                    },
                ],
                Version: [
                    {
                        required: true,
                        message: '请输入版本号',
                        trigger: 'blur',
                    },
                ],
                Unit: [
                    {
                        required: true,
                        message: '请输入单位',
                        trigger: 'blur',
                    },
                ],
            },
            showAlarm: false,
            showRelateTable: false,
            checkedList: [],
            isVariableShow: false,
            chooseArr: null,
            isEdit: false,
        };
    },
    mounted() {
        if (Object.keys(this.dialogFormData).length) {
            let data = {
                ..._.cloneDeep(this.dialogFormData),
            };
            this.form = data;
            this.isEdit = true;
        }
    },

    methods: {
        async validate() {
            return await this.$refs['form'].validate();
        },

        clearValidate() {
            this.$refs['form'].resetFields();
        },

        onSelectVariable(item) {
            this.isVariableShow = true;
            this.currentProp = item;
        },

        // 弹窗回调
        variableSelectCallBack(str, val) {
            this.isVariableShow = false;
            this.form[this.currentProp] = val.Name;
        },
        open() {},
        close() {
            this.$emit('close');
        },

        async confirm() {
            this.$emit('confirm');
        },
    },
};
</script>
  
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