<template>
    <el-dialog v-if="visible" :title="title" :visible="visible" v-el-drag-dialog @open="open" @close="close" width="480px"
        top="14vh" custom-class="common_dialog">
        <div class="wrap">
            <div>
                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                    <el-form-item label="产品型号" prop="ProductTypeCode">
                        <el-input v-model="form.ProductTypeCode" placeholder="请输入产品型号"></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" prop="ProductTypeName">
                        <el-input v-model="form.ProductTypeName" placeholder="请输入产品名称"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="Remark">
                        <el-input v-model="form.Remark" placeholder="请输入描述"></el-input>
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
            <VariableSelect v-if="isVariableShow" :data="chooseArr" @variableSelectCallBack="variableSelectCallBack" />
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
            default: () => { },
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        pageConfig: {
            type: Object,
            default: () => { },
        },
        config: {
            type: Object,
            default: () => ({
                inputlabelName: '内容名称', //输入框前面显示的名称
                relateName: '已关联报警点', //已关联内容名称
                showRadio: false, //是否显示推送源 radio
                radioList: [], //显示推送源 radio需要配置的radiosList
                btns: [], //按钮 1：关联巡检计划 2：批量选择报警点
                tableColumns: [], //表头渲染数据
            }),
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
                ProductTypeCode: '',
                ProductTypeName: '',
                Remark: '',
                
            },
            rules: {
                ProductTypeCode: [
                    {
                        required: true,
                        message: '请输入产品型号',
                        trigger: 'blur',
                    },
                ],
                ProductTypeName: [
                    {
                        required: true,
                        message: '请输入产品名称',
                        trigger: 'blur',
                    },
                ],
                
            },
            showAlarm: false,
            showRelateTable: false,
            checkedList: [],
            isVariableShow: false,
            chooseArr: null,
        };
    },
    mounted() {
        if (Object.keys(this.dialogFormData).length) {
            let data = {
                ..._.cloneDeep(this.dialogFormData),
             };
            this.form = data;
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
        open() { },
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