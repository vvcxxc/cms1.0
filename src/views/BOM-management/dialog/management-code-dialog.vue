<template>
    <el-dialog
        v-if="visible"
        :title="title"
        :visible="visible"
        v-el-drag-dialog
        @open="open"
        @close="close"
        width="400px"
        top="14vh"
        custom-class="common_dialog"
    >
        <div class="wrap blackItem">
            <div>
                <el-form
                    ref="form"
                    :model="form"
                    label-width="120px"
                    :rules="rules"
                >
                    <el-form-item label="产品型号:">
                        {{ currentRowData.ProductTypeCode }}
                    </el-form-item>
                    <el-form-item label="物料编码" prop="MID">
                        <el-select
                            v-model="form.MID"
                            placeholder="请选择"
                            style="width: 100%"
                            @change="checkMid"
                        >
                            <el-option
                                v-for="item in materials"
                                :key="item.Id"
                                :label="item.MaterialName"
                                :value="item.Id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料名称" prop="MaterialName">
                        <el-input
                            v-model="form.MaterialName"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="版本号" prop="Version">
                        <el-input v-model="form.Version" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="Unit">
                        <el-input v-model="form.Unit" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="物料用量" prop="Usage">
                        <el-input v-model="form.Usage"></el-input>
                    </el-form-item>
                    <el-form-item label="工序" prop="WID">
                        <el-select
                            v-model="form.WID"
                            placeholder="请选择"
                            style="width: 100%"
                        >
                            <el-option
                                v-for="item in workSections"
                                :key="item.WID"
                                :label="item.WorkName"
                                :value="item.WID"
                            />
                        </el-select>
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
import api from '@/api/material-management/index.js';
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
            default: () => {},
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
                MID: '',
                Usage: '',
                WID: '',
                Unit: '',
                MaterialName: '',
                Version: '',
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
            },
            materials: [],
            workSections: [],
        };
    },
    mounted() {
        console.log('currentRowData', this.currentRowData);
        this.initList();
        if (Object.keys(this.dialogFormData).length) {
            let data = {
                ..._.cloneDeep(this.dialogFormData),
                ProductTypeID: this.currentRowData.ID,
            };
            this.form = data;
        }
    },
    methods: {
        checkMid() {
            let _obj = this.materials.find((item) => item.Id == this.form.MID);
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
            const materials = await api.getManageList();
            this.materials = _.get(materials, 'data.data', []);
            const workSections = await api.QueryWorkSections();
            this.workSections = _.get(workSections, 'data.data', []);
        },
        open() {},
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