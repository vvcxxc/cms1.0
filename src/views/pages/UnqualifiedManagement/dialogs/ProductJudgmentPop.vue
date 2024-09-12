<!-- 修改色系 -->
<template>
    <Dialog
        v-model="$props.visible"
        width="1240px"
        top="5vh"
        :title="'产品判定'"
        :show-close="false"
        :append-to-body="true"
        class="ProductJudgmentEdit-el-dialog"
        @close="submit('close')"
        @confirm="submit('confirm')"
        @open="open"
    >
        <div class="title-label">
            {{ '基础信息' }} <el-divider></el-divider>
        </div>
        <el-form
            ref="form"
            :model="dataObj"
            inline
            label-width="120px"
            :rules="rules"
            :disabled="disabled"
        >
            <el-form-item label="产品ID:" prop="SerialNumber">
                <input
                    class="el-input__inner"
                    style="width: 312px"
                    v-model="dataObj.SerialNumber"
                    @keyup.enter="init(true)"
                />
            </el-form-item>
            <el-form-item label="产品型号:" prop="ProductModel">
                <el-input
                    style="width: 312px"
                    :value="dataObj.ProductModel || '-'"
                    disabled
                />
            </el-form-item>
            <el-form-item label="工单号:" prop="OrderCode">
                <el-input
                    style="width: 312px"
                    :value="dataObj.OrderCode || '-'"
                    disabled
                />
            </el-form-item>
            <el-form-item label="判定人员:" prop="JudgmentPersonnel">
                <el-input
                    style="width: 312px"
                    :value="dataObj.JudgmentPersonnel || '-'"
                    disabled
                />
            </el-form-item>
            <div class="form-noData" v-if="dataObj.noData">
                <img src="../images/icon_nodata.png" />
                {{ '暂无数据' }}
            </div>
            <template v-else>
                <div class="title-label">
                    {{ '产品生产参数' }} <el-divider></el-divider>
                </div>
                <div class="form-card">
                    <div>
                        <div class="left-title">
                            <div
                                style="display: flex;align-items: center;column-gap: 6px"
                            >
                                <el-tooltip
                                    effect="dark"
                                    :content="
                                        '展示该产品在加工过的工序，不良工序以红色标记'
                                    "
                                >
                                    <img src="../images/icon_exclamation.png" />
                                </el-tooltip>
                                <span> {{ '工序' }} </span>
                            </div>
                        </div>
                        <div class="process-list">
                            <div
                                class="process-item"
                                :class="{ 'cur-item': dataObj.curIdx == idx }"
                                v-for="(item, idx) in SectionDtos"
                                :key="item.id"
                                @click="dataObj.curIdx = idx"
                            >
                                <div
                                    class="item-left"
                                    :class="{
                                        noQualified: item.IsQualified === false
                                    }"
                                    :title="item.SectionName"
                                >
                                    {{ item.SectionName }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-table
                        :data="
                            SectionDtos[dataObj.curIdx]
                                ? [
                                      {
                                          Key: '记录时间',
                                          Value:
                                              SectionDtos[dataObj.curIdx]
                                                  .RecordTime
                                      },
                                      ...SectionDtos[dataObj.curIdx]
                                          .ParameterDtos
                                  ]
                                : []
                        "
                        height="100%"
                        style="width: 100%"
                        :key="dataObj.curIdx"
                        border
                        :header-cell-style="{
                            background: '#DCF0F9',
                            color: '#4270E4',
                            borderRight: '1px solid #CCC'
                        }"
                        :empty-text="'暂无数据'"
                    >
                        <el-table-column
                            width="55"
                            type="index"
                            :label="'序号'"
                        >
                        </el-table-column>
                        <el-table-column :label="'参数名称'">
                            <template #default="{row}">
                                {{ row.Key || row.ParameterName }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="'参数值'">
                            <template #default="{row}">
                                <template v-if="row.Key == '记录时间'">
                                    <span v-if="!row.Value" style="color: gray">
                                        以判定时间提交
                                    </span>
                                    <span v-else>
                                        {{
                                            dayjs(row.Value).format(
                                                'YYYY-MM-DD HH:mm:ss'
                                            )
                                        }}
                                    </span>
                                </template>
                                <el-input
                                    v-else-if="
                                        [1].includes(dataObj.JudgmentType)
                                    "
                                    :class="{ red: row.IsQualified === false }"
                                    v-model.number="row.NewValue"
                                    size="mini"
                                ></el-input>
                                <span
                                    v-else
                                    :class="{ red: row.IsQualified === false }"
                                >
                                    {{ row.Value }}</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column width="85" :label="'参数上限'">
                            <template #default="{row}">
                                {{ row.Upper !== '' ? row.Upper : '-' }}
                            </template>
                        </el-table-column>
                        <el-table-column width="85" :label="'参数下限'">
                            <template #default="{row}">
                                {{ row.Lower !== '' ? row.Lower : '-' }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="title-label">
                    {{ '不合格品处理' }} <el-divider></el-divider>
                </div>
                <el-form-item label="判定结果:" prop="JudgmentType">
                    <el-select
                        style="width: 312px"
                        v-model="dataObj.JudgmentType"
                        @change="changeJudgmentType"
                    >
                        <el-option
                            v-for="item in JudgmentTypeList"
                            :key="item.JudgmentTypeId"
                            :label="item.JudgmentType"
                            :value="item.JudgmentTypeId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="是否合格:"
                    prop="IsQualified"
                    v-if="[1, 2].includes(dataObj.JudgmentType)"
                >
                    <el-select
                        style="width: 312px"
                        v-model="IsQualified"
                        :disabled="true"
                        :teleported="false"
                    >
                        <el-option :label="'OK'" :value="true"></el-option>
                        <el-option :label="'NG'" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="不合格原因:"
                    prop="UnqualifiedReason"
                    v-if="[0, 2].includes(dataObj.JudgmentType)"
                >
                    <el-select
                        style="width: 312px"
                        v-model="dataObj.UnqualifiedReason"
                        :teleported="false"
                    >
                        <el-option
                            v-for="item in ReasonList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="返修工序"
                    prop="JudgmentSections"
                    v-if="[0].includes(dataObj.JudgmentType)"
                >
                    <el-select
                        @change="changeSection"
                        style="width: 700px"
                        v-model="dataObj.JudgmentSections"
                        multiple
                        :teleported="false"
                    >
                        <el-option label="全选" value=""></el-option>
                        <el-option
                            v-for="item in SectionDtos"
                            :key="item.SectionId"
                            :label="item.SectionName"
                            :value="item.SectionId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理说明:" prop="Remarks">
                    <el-input
                        style="width: 760px"
                        v-model="dataObj.Remarks"
                        type="textarea"
                        :rows="4"
                    />
                </el-form-item>
            </template>
        </el-form>
    </Dialog>
</template>

<script>
import {
    ref,
    watch,
    defineComponent,
    reactive,
    computed
} from '@vue/composition-api';
import { Message } from 'element-ui';
import dayjs from 'dayjs';

import {
    UnqualifiedApi,
    MaterialApi,
    SystemSettingApi,
    UserManageApi
} from '../api/index';
import { cloneDeep } from 'lodash';
import Dialog from '@/views/pages/components/BaseDialog/index.vue';
import editButton from '@/views/pages/components/edit-button/index.vue';
import _ from 'lodash';

export default defineComponent({
    name: 'ProductJudgmentPop',
    props: {
        visible: Boolean,
        selectItem: Object
    },
    components: {
        editButton,
        Dialog
    },
    emits: ['callback'],
    setup(props, { emit }) {
        const dataObj = reactive({
            ProductId: '',
            SerialNumber: '',
            ProductModel: '',
            OrderCode: '',
            IsQualified: '',
            JudgmentType: '',
            UnqualifiedReason: '',
            JudgmentPersonnel: '',
            curIdx: 0,
            noData: true,
            isSupplement: false, //补充
            /**返修工序,多选*/
            JudgmentSections: [],
            Remarks: '',
            nowIdx: 0
        });
        const changeSection = arr => {
            if (_.last(arr) === '') {
                dataObj.JudgmentSections = SectionDtos.value.map(
                    item => item.SectionId
                );
            } else {
                dataObj.JudgmentSections = arr.filter(item => item);
            }
        };
        const IsQualified = computed(() =>
            dataObj.IsQualified === '——'
                ? '——'
                : dataObj.IsQualified
                ? 'OK'
                : 'NG'
        );
        const open = async () => {
            form.value && form.value.resetFields();
            if (props.selectItem) {
                console.log('props.selectItem', props.selectItem);
                dataObj.SerialNumber = props.selectItem.SerialNumber;
                dataObj.ProductId = props.selectItem.ProductId;
                dataObj.ProductModel = props.selectItem.ProductModel;
                dataObj.OrderCode = props.selectItem.OrderCode;
                dataObj.JudgmentPersonnel = props.selectItem.JudgmentPersonnel;
                dataObj.UnqualifiedReason = props.selectItem.UnqualifiedReason;
                const userInfo = JSON.parse(
                    sessionStorage.getItem('userInfo1') ||
                        sessionStorage.getItem('sightseerInfo1')
                );
                if (userInfo.SCMSUserName) {
                    dataObj.JudgmentPersonnel = userInfo.SCMSUserName;
                }

                dataObj.JudgmentSections = [];
                await init();

                const {
                    data: { data: roleList }
                } = await UserManageApi.UserManage_GstRole();
                const roleMap = roleList.reduce((t, c) => {
                    const { SCMSRoleID, SCMSRoleName } = c;
                    t[SCMSRoleID] = {
                        SCMSRoleID,
                        SCMSRoleName,
                        Users: []
                    };
                    return t;
                }, {});
            }
        };
        const rules = ref({
            JudgmentType: {
                required: true,
                message: '请选择判定结果'
            },
            UnqualifiedReason: {
                required: true,
                message: '请输入不合格原因'
            },
            IsQualified: {
                required: true,
                message: '请选择是否合格'
            },
            JudgmentSections: {
                required: true,
                message: '请选择返修工序'
            }
        });
        const form = ref(null);
        const changeJudgmentType = data => {
            dataObj.IsQualified = { 0: '——', 1: true, 2: false }[Number(data)];
        };
        const SectionDtos = ref([]);
        const SIDList = ref([]);
        const GetRecordBySerialNumberAsync = async (prompt = false) => {
            try {
                const {
                    data: { data }
                } = await UnqualifiedApi.GetRecordBySerialNumberAsync({
                    SerialNumber: dataObj.SerialNumber
                });
                dataObj.OrderCode = data.OrderCode;
                dataObj.ProductModel = data.ProductModel;
                dataObj.UnqualifiedReason = data.UnqualifiedReason;

                SectionDtos.value = data.SectionDtos.filter(
                    e => e.IsProduce
                ).map(e => ({
                    ...e,
                    ParameterDtos: e.ParameterDtos.map(se => ({
                        ...se,
                        NewValue: se.Value
                    }))
                }));
                SIDList.value = data.SIDList;
                dataObj.noData = false;
                dataObj.curIdx = 0;
                for (let i = 0; i < SectionDtos.value.length; i++) {
                    const e = SectionDtos.value[i];
                    if (e.IsQualified === false) {
                        dataObj.curIdx = i;
                        return;
                    }
                }
            } catch (error) {
                prompt && Message.warning('产品ID不存在');
                dataObj.noData = true;
            }
        };
        const JudgmentTypeList = ref([]);
        const GetJudgmentTypeAsyncFn = () => {
            return UnqualifiedApi.GetJudgmentTypeAsync().then(({ data }) => {
                if (data) {
                    JudgmentTypeList.value = data.data || [];
                }
            });
        };

        const ReasonList = ref([]);
        const GetReasonFn = () => {
            return UnqualifiedApi.GetAllReasonAsync(SIDList.value).then(res => {
                ReasonList.value = [
                    ...(res.data ? res.data.data : []).map(e => ({
                        name: e,
                        id: e
                    }))
                ];
            });
        };
        const submit = state => {
            if (state == 'confirm') {
                form.value.validate().then(async valid => {
                    if (dataObj.ProductModel && valid) {
                        const userInfo = JSON.parse(
                            sessionStorage.getItem('userInfo1') ||
                                sessionStorage.getItem('sightseerInfo1')
                        );
                        if (userInfo.SCMSUserName) {
                            dataObj.JudgmentPersonnel = userInfo.SCMSUserName;
                        }
                        UnqualifiedApi.CreateJudgmentAsync({
                            ...dataObj,
                            UnqualifiedReason:
                                dataObj.JudgmentType !== 1
                                    ? dataObj.UnqualifiedReason
                                    : '',
                            JudgmentDetails: SectionDtos.value.reduce(
                                (t, c) => {
                                    (c.ParameterDtos || []).forEach(e => {
                                        if (e.Value !== e.NewValue)
                                            t.push({
                                                PID: e.ParameterId,
                                                SectionId: c.SectionId,
                                                SectionName: c.SectionName,
                                                ParameterKey: e.ParameterId,
                                                ParameterName: e.ParameterName,
                                                OldValue: e.Value,
                                                NewValue: e.NewValue
                                            });
                                    });
                                    return t;
                                },
                                []
                            ),
                            JudgmentSections: SectionDtos.value.filter(e => {
                                return dataObj.JudgmentSections.length
                                    ? dataObj.JudgmentSections.includes(
                                          e.SectionId
                                      )
                                    : e.IsQualified === false;
                            })
                        }).then(res => {
                            if (res.data.code === 0) {
                                Message.success('判定成功');
                                emit('callback', state);
                            }
                        });
                    }
                });
            } else {
                emit('callback', state);
            }
        };
        const init = async prompt => {
            await GetRecordBySerialNumberAsync(prompt);
            if (dataObj.ProductModel) {
                await GetJudgmentTypeAsyncFn();
                await GetReasonFn();
            } else {
                dataObj.noData = true;
            }
            changeJudgmentType(dataObj.JudgmentType);
        };

        const disabled = ref(false);
        return {
            dayjs,
            cloneDeep,
            changeSection,
            open,
            dataObj,
            rules,
            form,
            submit,
            changeJudgmentType,
            JudgmentTypeList,
            ReasonList,
            init,
            SectionDtos,
            disabled,
            IsQualified
        };
    }
});
</script>

<style lang="scss" scoped>
.red {
    color: red;
}
.ProductJudgmentEdit-el-dialog {
    .title-label {
        width: 100%;
        height: 18px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        margin-bottom: 10px;

        font-size: 16px;
        padding-left: 10px;
        color: #386df0;
        border-left: 3px solid #386df0;
        column-gap: 10px;
    }

    .form-noData {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #8b9ca4;

        img {
            width: 27px;
            height: 27px;
            margin-bottom: 10px;
        }
    }
    .form-card {
        width: 100%;
        height: 282px;
        background: #f4f4f4;
        border-radius: 1px;
        border: 1px solid #e0e0e0;
        padding: 22px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        column-gap: 10px;
        .left-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px 0 12px;
            height: 32px;
            background: #e8e8e8;
            border-radius: 4px 4px 0 0;
            color: #666666;

            img {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }
        }
        .process-list {
            width: 200px;
            height: 200px;
            overflow-y: auto;
            background: #f9f9f9;
            .process-item {
                width: 100%;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 13px 0 10px;

                .item-left {
                    position: relative;
                    padding-left: 16px;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    cursor: pointer;
                }

                .item-left::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    background: #ffffff;
                    border: 1px solid #707070;
                    border-radius: 3px;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translate(0, -50%);
                }

                .noQualified {
                    color: #f97171;
                }

                .noQualified::before {
                    border: 1px solid #f97171;
                }

                img {
                    width: 14px;
                    height: 16px;
                    cursor: pointer;
                    display: none;
                }
            }

            .cur-item {
                background: #dce3f0;
            }

            .process-item:hover {
                img {
                    display: block;
                }
            }
        }
    }
}
</style>
