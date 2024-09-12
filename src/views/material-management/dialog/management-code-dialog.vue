<template>
    <el-dialog v-if="visible" :title="title" :visible="visible" v-el-drag-dialog @open="open" @close="close" width="400px"
        top="14vh" custom-class="common_dialog">
        <div class="wrap blackItem">
            <div>
                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                    <el-form-item label="物料编号:">
                        {{ currentRowData.MaterialCode }}
                    </el-form-item>
                    <el-form-item label="物料校验段" prop="BarcodeCheckItem">
                        <el-input v-model="form.BarcodeCheckItem"></el-input>
                    </el-form-item>
                    <el-form-item label="校验起始位数" prop="BeginIndex">
                        <el-input v-model="form.BeginIndex"></el-input>
                    </el-form-item>
                    <el-form-item label="校验段长度" prop="CodeLength">
                        <el-input v-model="form.CodeLength"></el-input>
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
    </el-dialog>
</template>
  
<script>
import _ from 'lodash';

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
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            form: {
                BarcodeCheckItem: '',
                BeginIndex: '',
                CodeLength: '',
            },
            rules: {
                BarcodeCheckItem: [
                    {
                        required: true,
                        message: '请输入物料校验段',
                        trigger: 'blur',
                    },
                ],
                BeginIndex: [
                    {
                        required: true,
                        message: '请输入校验起始位数',
                        trigger: 'blur',
                    },
                ],
                CodeLength: [
                    {
                        required: true,
                        message: '请输入校验段长度',
                        trigger: 'blur',
                    },
                ],
            },
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