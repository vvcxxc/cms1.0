<template>
    <el-dialog v-if="visible" :title="title" :visible="visible" v-el-drag-dialog @open="open" @close="close" width="480px"
        top="14vh" custom-class="common_dialog">
        <div class="wrap">
            <div>
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="物料编号" prop="MaterialCode">
                        <el-input v-model="form.MaterialCode" placeholder="请输入物料编号"></el-input>
                    </el-form-item>
                    <el-form-item label="物料名称" prop="MaterialName">
                        <el-input v-model="form.MaterialName" placeholder="请输入物料名称" :maxlength="15"></el-input>
                    </el-form-item>

                    <el-form-item label="规格型号" prop="Version">
                        <el-input v-model="form.Version" placeholder="请输入规格型号"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="Unit">
                        <el-input v-model="form.Unit" placeholder="请输入单位"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="读取变量" prop="ReadTagName">
                        <div style="display: inline-flex; width: 300px">
                            <el-input disabled v-model="form.ReadTagName"></el-input>
                            <el-button type="primary" @click="onSelectVariable('ReadTagName')">
                                选择
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="物料码变量" prop="MaterialCodeTagName">
                        <div style="display: inline-flex; width: 300px">
                            <el-input disabled v-model="form.MaterialCodeTagName"></el-input>
                            <el-button type="primary" @click="onSelectVariable('MaterialCodeTagName')">
                                选择
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="校验结果信号" prop="CheckResultTagName">
                        <div style="display: inline-flex; width: 300px">
                            <el-input disabled v-model="form.CheckResultTagName"></el-input>
                            <el-button type="primary" @click="onSelectVariable('CheckResultTagName')">
                                选择
                            </el-button>
                        </div>
                    </el-form-item> -->

                    <!-- <el-form-item label="规格型号" prop="SkuCode">
                        <el-input v-model="form.SkuCode"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="用料设备" prop="Equipment">
                        <el-select
                            v-model="form.Equipment"
                            placeholder="请选择"
                            multiple
                            style="width: 100%"
                        >
                            <el-option
                                v-for="item in deviceList"
                                :key="item.EquipmentName"
                                :label="item.EquipmentName"
                                :value="item.EquipmentName"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input
                            type="textarea"
                            v-model="form.Remark"
                        ></el-input>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button class="d_footer_cancel" @click="close">取消</el-button>
            <el-button class="d_footer_sure" @click="confirm">确定</el-button>
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
                MaterialName: '',
                MaterialCode: '',
                Version: '',
                Unit: '',
                // ReadTagName: '',
                // MaterialCodeTagName: '',
                // CheckResultTagName: '',
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