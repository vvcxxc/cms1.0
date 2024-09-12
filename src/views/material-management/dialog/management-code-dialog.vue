<template>
    <el-dialog v-if="visible" :title="title" :visible="visible" v-el-drag-dialog @open="open" @close="close" width="400px"
        top="14vh" custom-class="common_dialog">
        <div class="wrap blackItem">
            <div>
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="物料编号:">
                        {{ currentRowData.MaterialCode }}
                    </el-form-item>
                    <el-form-item label="规则名称" prop="RuleName">
                        <el-input v-model="form.RuleName"></el-input>
                    </el-form-item>
                    <el-form-item label="校验类型" prop="ParityBit">
                        <el-select v-model="form.ParityBit">
                            <el-option label="总长度检验" :value="1"> </el-option>
                            <el-option label="截取片段内容校验" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="总长度" prop="TotalLength" v-if="form.ParityBit == 1">
                        <el-input v-model="form.TotalLength"></el-input>
                    </el-form-item>
                    <el-form-item label="校验起始位数" prop="BeginIndex" v-if="form.ParityBit == 2">
                        <el-input v-model="form.BeginIndex"></el-input>
                    </el-form-item>
                    <el-form-item label="校验段长度" prop="CodeLength" v-if="form.ParityBit == 2">
                        <el-input v-model="form.CodeLength"></el-input>
                    </el-form-item>
                    <el-form-item label="校验方式" prop="CheckMode" v-if="form.ParityBit == 2">
                        <el-select v-model="form.CheckMode">
                            <el-option label="绝对匹配" :value="1"> </el-option>
                            <el-option label="唯一性校验" :value="2"></el-option>
                            <el-option label="符合正则表达式" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="匹配内容" prop="MatchingContent" v-if="form.ParityBit == 2 && form.CheckMode == 1">
                        <el-input v-model="form.MatchingContent"></el-input>
                    </el-form-item>
                    <el-form-item label="正则表达式" prop="RegularExpression" v-if="form.ParityBit == 2 && form.CheckMode == 3">
                        <el-input v-model="form.RegularExpression"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button class="d_footer_cancel" @click="close">
                取消
            </el-button>
            <el-button class="d_footer_sure" @click="confirm">
                确定
            </el-button>
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
                Id: 0,
                RuleName: "",
                ParityBit: 1,
                BeginIndex:"",
                CodeLength:"",
                CheckMode: 1,
                MatchingContent: "",
                TotalLength:"",
                RegularExpression: "",
                OrderNumber: "",
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