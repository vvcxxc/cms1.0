<template>
    <Dialog
        v-model="$props.visible"
        width="440px"
        top="18vh"
        :title="`${'不合格原因配置'}`"
        :show-close="false"
        :append-to-body="true"
        class="ReasonConfigurationEdit-el-dialog"
        @close="submit('close')"
        @confirm="submit('confirm')"
    >
        <div class="ReasonConfiguration-content">
            <div class="search-content">
                <div class="search-btn" @click="addItem">
                    <img src="../images/icon_add.png" />
                    添加
                </div>
                <div class="search-btn" @click="delItem">
                    <img src="../images/icon_del.png" />
                    删除
                </div>
            </div>
            <div class="ReasonConfiguration-list">
                <el-table
                    size="small"
                    ref="table1"
                    :data="dataList"
                    class="x_table drag-table1"
                    height="100%"
                    style="width: 100%"
                    border
                    :header-cell-style="{
                        background: '#DCF0F9',
                        color: '#4270E4',
                        borderRight: '1px solid #8B98B8'
                    }"
                    :empty-text="'暂无数据'"
                    row-key="id"
                    @select="selectFn1"
                    @select-all="selectFn1"
                    @row-click="rowClickFn"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column width="40">
                        <template #default="scope">
                            <span v-if="scope.row.Id === '由作业者判断'">
                            </span>
                            <img
                                v-else
                                src="../images/icon_move.png"
                                class="btn-move"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="60"
                        type="selection"
                        :selectable="(r, i) => i !== 0"
                    >
                    </el-table-column>
                    <el-table-column prop="Name" :label="'不合格原因'">
                        <template #default="scope">
                            <span v-if="scope.row.Id === '由作业者判断'">
                                {{ scope.row.Name }}
                            </span>
                            <el-input
                                v-else
                                size="small"
                                v-model="scope.row.Name"
                                :ref="el => !scope.row.Name && el.focus()"
                            />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </Dialog>
</template>

<script>
import {
    ref,
    defineComponent,
    reactive,
    watch,
    nextTick
} from '@vue/composition-api';
import { Message } from 'element-ui';
import Sortable from 'sortablejs';
import { UnqualifiedApi } from '../api/index';
import Dialog from '@/views/pages/components/BaseDialog/index.vue';

export default defineComponent({
    name: 'ReasonConfigurationPop',
    props: {
        visible: Boolean
    },
    components: {
        Dialog
    },
    setup(props, { emit }) {
        const dataObj = reactive({
            list: [],
            sortable: [],
            nowIndex: 1,
            curIdx: 0
        });

        const dataList = ref([{ Name: '由作业者判断', Id: '由作业者判断' }]);
        const GetAllReasonAsyncFn = () => {
            UnqualifiedApi.GetAllReasonAsync().then(({ data }) => {
                dataList.value = [
                    { Name: '由作业者判断', Id: '由作业者判断' },
                    ...data.data
                ]
                    .map(item => ({
                        ...item,
                        checked: false
                    }))
                    .sort((a, b) => (a.Sort || 0) - (b.Sort || 0));
            });
        };
        const addItem = () => {
            dataObj.nowIndex += 1;
            const target = {
                Name: '',
                Id: new Date().getTime() + dataObj.nowIndex,
                checked: true
            };
            dataList.value.push(target);
            table1.value.doLayout();
        };
        const delItem = () => {
            dataList.value = dataList.value.filter(
                item => item.Id === '由作业者判断' || !item.check
            );
        };
        //第一步选择
        const selectFn1 = arr => {
            dataList.value.forEach(_ => {
                if (arr.some(item => item.Id == _.Id)) {
                    _.check = true;
                } else {
                    _.check = false;
                }
            });
        };

        const table1 = ref();
        const rowClickFn = row => {
            dataObj.curIdx = row.index;
            nextTick(() => {
                if (dataList.value.length) {
                    dataList.value.forEach(item => {
                        if (item.check) {
                            setTimeout(() => {
                                table1.value.toggleRowSelection(item, true);
                            });
                        } else {
                            setTimeout(() => {
                                table1.value.toggleRowSelection(item, false);
                            });
                        }
                    });
                }
            });
        };
        const tableRowClassName = ({ row, rowIndex }) => {
            row.index = rowIndex;
            if (rowIndex !== 0) {
                return 'able';
            }
        };

        const initSortable = className => {
            // 获取表格row的父节点
            const tables = document.querySelector(
                '.' +
                    className +
                    ' .el-table__body-wrapper .el-table__body tbody'
            );
            // 创建拖拽实例
            Sortable.create(tables, {
                animation: 150, //动画
                disabled: false, // 拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
                handle: '.btn-move', //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
                // filter: '.disabled', //指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
                draggable: '.able',
                dragClass: 'dragClass', //设置拖拽样式类名
                ghostClass: 'ghostClass', //设置拖拽停靠样式类名
                chosenClass: 'chosenClass', //设置选中样式类名
                // 结束拖动事件
                onEnd: ({ newIndex, oldIndex }) => {
                    const temp = dataList.value;
                    const currRow = temp.splice(oldIndex, 1)[0];
                    temp.splice(newIndex, 0, currRow);

                    dataList.value = [];
                    nextTick(() => {
                        dataList.value = JSON.parse(JSON.stringify(temp));
                    });
                }
            });
        };

        watch(
            () => props.visible,
            val => {
                if (!val) {
                    return;
                }
                GetAllReasonAsyncFn();

                nextTick(() => initSortable('drag-table1'));
            },
            {
                deep: true
            }
        );

        const submit = state => {
            if (state == 'confirm') {
                if (dataList.value.some(e => e.Name === '')) {
                    Message.error('不良原因不能为空');
                    return;
                }
                UnqualifiedApi.SubmitReasonAsync(
                    dataList.value.filter(e => {
                        return e.Id !== '由作业者判断';
                    })
                )
                    .then(res => {
                        Message.success('保存成功！');
                        emit('callback', state);
                    })
                    .catch(err => {
                        Message.error('保存失败！');
                    });
            } else {
                emit('callback', state);
            }
        };

        return {
            dataObj,
            dataList,
            submit,
            table1,
            rowClickFn,
            tableRowClassName,
            initSortable,
            addItem,
            delItem,
            selectFn1
        };
    }
});
</script>

<style lang="scss" scoped>
.ReasonConfigurationEdit-el-dialog {
    .ReasonConfiguration-content {
        padding: 0 30px;
        box-sizing: border-box;

        .search-content {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 6px;

            .search-btn {
                width: 68px;
                height: 34px;
                background: #ffffff;
                border-radius: 4px;
                border: 1px solid #ebebeb;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 10px;
                cursor: pointer;

                img {
                    width: 18px;
                    height: 18px;
                    margin-right: 8px;
                }
            }

            .search-btn:active {
                box-shadow: 0px 2px 0px 1px rgba(0, 0, 0, 0.16);
            }
        }

        .ReasonConfiguration-list {
            width: 100%;
            height: 250px;
            overflow: auto;
        }
    }
    .btn-move {
        margin: 0 auto;
        display: block;
    }
}
</style>
