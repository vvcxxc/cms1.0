<template>
    <BaseDialog
        :title="lang.QualityManage_RuleChoseWindow_RuleOfDiscrimination"
        v-model="visible"
        width="900px"
        :show-close="false"
    >
        <el-table
            :data="ruleList"
            ref="tableRef"
            border
            style="width: 100%; 
            border: 2px solid #E4E4E4;"
            :header-cell-style="{color:'#4270E4'}"
        >
            <el-table-column prop="Number" width="120" :label="lang.QualityManage_RuleChoseWindow_DataGrid_RuleNumber" />
            <el-table-column prop="Name" :label="lang.SPCAnalysis_DiscriminantRuleWindow_CurrentRule"> </el-table-column>
            <el-table-column prop="Type" :label="lang.SPCAnalysis_DiscriminantRuleWindow_RuleBasic"> </el-table-column>
        </el-table>
        <template #footer>
            <div class="footer">
                <span style="color: #386df0;">{{lang.SPCAnalysis_DiscriminantRuleWindow_AlarmCondition}}</span>
                <el-button class="confirm" @click="handleClose">{{lang.SPCAnalysis_WarnRecordWindow_Close}}</el-button>
            </div>
        </template>
    </BaseDialog>
</template>
<script>
import { defineComponent, ref, reactive, computed,onMounted } from '@vue/composition-api';
import BaseDialog from '../../dialog/BaseDialog.vue';
export default defineComponent({
    name: 'SubGroupDialog',
    components: {
        BaseDialog
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        ruleList: {
            type: Array,
            default: ()=>[]
        }
    },
    emits: ['confirm'],
    setup(props, { emit }) {
        const formRef = ref(null);
        const rules = ref({});
        const formData = ref({
            codeStyle: '',
            region: '',
            name: ''
        });

        const visible = computed({
            get() {
                return props.value;
            },
            set(val) {
                emit('input', val);
            }
        });


        const handleClose = () => {
            visible.value = false
            emit('close');
        };
        const tableRef = ref(null);


        const lang = ref({})        
        onMounted(() => {

            lang.value =  JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        });

        return {
            rules,
            visible,
            formData,
            handleClose,
            tableRef,
            lang
        };
    }
});
</script>
<style lang="scss" scoped>
::v-deep {
    thead {
        th {
            background: #dcf0f9;
        }
        .el-table-column--selection {
            .cell {
                display: none;
            }
        }
    }
}
.footer {
    display: flex;
        margin-top: 20px;
    align-items: center;
    .confirm {
        margin-left: auto;
        width: 100px;
        height: 38px;
        background: #386df0;
        border-radius: 4px 4px 4px 4px;
        border: none;
        color: #fff;
    }
}
</style>
