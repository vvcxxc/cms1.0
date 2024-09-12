<template>
    <div ref="menuRef" class="SpcConfig">
        <div class="head-wrap">
            <div class="left">
                <el-form :model="searchForm" label-position="right" inline>
                    <el-form-item>
                        <el-input
                            :placeholder="$$t(`请输入关键字`)"
                            v-model="searchForm.filter"
                            class="innerWidth"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button class="search-btn" @click="handleSearch">{{
                            $$t(`查询`)
                        }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="right">
                <el-button class="add-btn" @click="actionConfig.type = 1">
                    {{ $$t(`新增`) }}
                </el-button>
                <el-button class="change-btn" @click="Edit">
                    {{ $$t(`修改`) }}
                </el-button>
                <el-button class="change-btn" @click="UpdateRecoverFn">
                    {{ $$t(`恢复修改`) }}
                </el-button>
                <el-button class="history-btn" @click="SetCheckVisible = true">
                    {{ $$t(`修改记录`) }}
                </el-button>
                <el-button class="delete-btn" @click="Delete">
                    {{ $$t(`删除`) }}
                </el-button>
                <el-button class="preview-btn" @click="Export">
                    {{ $$t(`导出`) }}
                </el-button>
                <el-button class="preview-btn" @click="toPage">
                    {{ $$t(`SPC分析`) }}
                </el-button>
            </div>
        </div>
        <Table
            :data="dataSource"
            selection
            @selection-change="handleSelectionChange"
            highlight-selection-row
        >
            <el-table-column type="index" width="80" :label="$$t(`序号`)" />
            <el-table-column prop="ParameterName" :label="$$t(`参数名`)" />
            <el-table-column prop="VariableName" :label="$$t(`变量名`)" />
            <el-table-column prop="SubgroupCapacity">
                <template #header>
                    <span @click="handleHelp">
                        {{ $$t(`子组容量`) }} <i class="el-icon-question"></i>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="UpperLimit" :label="$$t(`上限值`)" />
            <el-table-column prop="LowerLimit" :label="$$t(`下限值`)" />
            <el-table-column prop="TargetValue" :label="$$t(`目标值`)" />
        </Table>
        <my-page
            style="height: 60px"
            :pageData="searchForm"
            @req="req"
        ></my-page>
        <SubGroupDialog v-model="visible" />
        <SetCheckDialog
            v-model="actionConfig"
            @handleHelp="handleHelp"
            @close="actionConfig.type = 0"
            @confirm="getPagedListData"
        ></SetCheckDialog>
        <SPCHistoryDialog v-model="SetCheckVisible" />
    </div>
</template>
<script>
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    getCurrentInstance
} from '@vue/composition-api';
import { useMenuHeight } from '../hooks/use-menu-height';
import LeftNav from '../../../components/leftNav/LeftNav.vue';
import Table from '../components/Table/index.vue';
import SubGroupDialog from './components/SubGroupDialog.vue';
import SetCheckDialog from './components/SetCheckDialog.vue';
import SPCHistoryDialog from './components/SPCHistoryDialog.vue';
import MyPage from '@/components/public/Paging.vue';
import _ from 'lodash';
import { SPCConfigApi } from './api';
import { Message } from 'element-ui';
export default defineComponent({
    name: 'SpcConfig',
    components: {
        LeftNav,
        Table,
        SubGroupDialog,
        SetCheckDialog,
        SPCHistoryDialog,
        MyPage
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const { menuRef } = useMenuHeight();

        const visible = ref(false);
        const SetCheckVisible = ref(false);

        const getPagedListData = async () => {
            const res = await SPCConfigApi.getPagedList(searchForm);
            dataSource.value = res.data.data.DataList || [];
            for (let key in res.data.data.ParameterList) {
                searchForm[key] = res.data.data.ParameterList[key];
            }
        };

        const handleSearch = () => {
            searchForm.PageIndex = 1;
            getPagedListData();
        };

        const dataSource = ref([]);
        const searchForm = reactive({
            filter: '',
            pageSize: 50,
            TotalCount: 0,
            TotalPage: 0,
            PageIndex: 1,
            LastEnabled: false,
            NextEnabled: false
        });
        const ParameterList = ref({
            PageSize: 50,
            TotalCount: 0,
            TotalPage: 0,
            PageIndex: 1,
            LastEnabled: false,
            NextEnabled: false
        });
        const req = (pageIndex, s) => {
            if (!_.isNumber(pageIndex)) {
                return;
            }
            searchForm.PageIndex = pageIndex;
            getPagedListData();
        };

        const handleHelp = () => {
            visible.value = true;
        };

        const toPage = () => {
            proxy.$router.push({
                path: '/SPCAnalysis',
                query: { workSectionId: searchForm.workSectionId }
            });
        };

        onMounted(() => {
            handleSearch();
        });

        const actionConfig = reactive({
            type: 0,
            data: []
        });
        const selection = ref([]);
        const handleSelectionChange = v => {
            selection.value = v;
        };
        const Edit = () => {
            if (selection.value.length === 0) {
                Message.warning($$t(`请至少选择一项进行修改！`));
                return;
            }
            actionConfig.type = 2;
            actionConfig.data = _.cloneDeep(selection.value);
        };
        const UpdateRecoverFn = async () => {
            if (selection.value.length === 0) {
                Message.warning($$t(`请至少选择一项进行恢复修改！`));
                return;
            }
            const res = await SPCConfigApi.UpdateRecover(selection.value);
            getPagedListData();
            if (res.data.code === 0) {
                Message.success(res.data.data);
            }
        };
        const Delete = async () => {
            if (selection.value.length === 0) {
                Message.warning($$t(`请至少选择一项进行删除！`));
                return;
            }
            const res = await SPCConfigApi.DeleteMany(
                selection.value.map(e => e.Id)
            );
            getPagedListData();
            if (res.data.code === 0) {
                Message.success($$t(`删除成功`));
            }
        };
        const Export = async () => {
            const res = await SPCConfigApi.Export();
            proxy.downloadFile(res.data, `${$$t(`SPC配置`)}.xlsx`);
        };

        return {
            ParameterList,
            req,
            menuRef,
            dataSource,
            searchForm,
            visible,
            SetCheckVisible,
            actionConfig,
            handleHelp,
            toPage,
            handleSearch,
            getPagedListData,
            handleSelectionChange,
            Edit,
            UpdateRecoverFn,
            Delete,
            Export
        };
    }
});
</script>
<style lang="scss" scoped>
.SpcConfig {
    width: 100%;
    background-color: #e9eeef;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    .head-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* height: 60px; */
        padding: 11px;
        /* padding-left: 0px; */
        background: #dddddd;
        margin-bottom: 10px;
        ::v-deep {
            .el-form-item {
                margin-bottom: 0;
            }
            .el-form-item__label {
                font-size: 14px;
            }
            .el-button {
                width: 100px;
            }
        }
        .innerWidth {
            width: 150px;
        }
        .search-btn {
            background: #386df0;
            color: #fff;
        }
        .preview-btn {
            color: #386df0;
            border-color: #386df0;
        }
        .add-btn {
            color: #46be05;
            border-color: #46be05;
        }
        .history-btn {
            color: #138e89;
            border-color: #138e89;
        }
        .change-btn {
            color: #fdae22;
            border-color: #fdae22;
        }
        .delete-btn {
            border-color: #df5151;
            color: #df5151;
        }
        .left {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        .right {
            margin-left: 20px;
            /* width: 300px; */
            flex-shrink: 0;
        }
    }
    .el-icon-question {
        font-size: 16px;
        margin-left: 5px;
        cursor: pointer;
    }
}
</style>
