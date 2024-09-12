<template>
    <BaseDialog
        :title="lang.SpcConfig_SubgroupCapacityWindow_SubGroupCapacitySetting"
        v-model="visible"
        width="900px"
        :show-close="false"
    >
        <div style="color: #386df0;margin-bottom: 10px;">{{lang.SpcConfig_SubgroupCapacityWindow_SubGroupToolTips}}</div>
        <el-table
            :data="tableData"
            ref="tableRef"
            border
            style="width: 100%; 
            border: 2px solid #E4E4E4;"
            :header-cell-style="{color:'#4270E4'}"
        >
            <el-table-column prop="Number" width="120" :label="lang.SpcConfig_SpcRecord_SerialNumber" />
            <el-table-column prop="Name" :label="lang.SpcConfig_EditingWindow_SubGroupCapacity"> </el-table-column>
            <el-table-column prop="Type" :label="lang.SpcConfig_SubgroupCapacityWindow_ControlChartType"> </el-table-column>
        </el-table>
        <template #footer>
            <div class="footer">
                <el-button class="confirm" @click="handleClose">{{lang.SPCAnalysis_DiscriminantRuleWindow_Close}}</el-button>
            </div>
        </template>
    </BaseDialog>
</template>
<script>
import { defineComponent, ref, reactive, computed, onMounted } from '@vue/composition-api';
import BaseDialog from '../../dialog/BaseDialog.vue';
import {getSubgroupCapacity} from '../api'
export default defineComponent({
    name: 'SubGroupDialog',
    components: {
        BaseDialog
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    emits: ['confirm'],
    setup(props, { emit }) {

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
        const tableData = ref();

        const getSubgroupCapacityData = async ()=> {
            const res = await getSubgroupCapacity()
            tableData.value = res.data.data
        }

        const lang = ref({})

        onMounted(()=> {
            getSubgroupCapacityData()
            lang.value =  JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        })

        return {
            visible,
            handleClose,
            tableData,
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
    align-items: center;
    margin-top: 20px;

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
