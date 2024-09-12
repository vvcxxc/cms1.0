<!--
 * @Description: 这是班组页面（组件）
 * @Date: 2020-08-10 09:10:53
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 11:39:39
-->
<template>
    <div class="QualityInspection">
        <div class="search-container">
            <div class="search-left">
                <div class="label">创建时间</div>
                <el-date-picker
                    v-model="searchData.argStartTime"
                    style="width: 210px;"
                    type="datetime"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <div class="label">-</div>
                <el-date-picker
                    v-model="searchData.argEndTime"
                    style="width: 210px;"
                    type="datetime"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <div class="label">工位名</div>
                <el-select style="width: 100px;" v-model="searchData.sid">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                        v-for="item in workStepList"
                        :key="item.SID"
                        :label="item.StepName"
                        :value="item.SID"
                    ></el-option>
                </el-select>
                <div class="label">班次</div>
                <el-select style="width: 100px;" v-model="searchData.shift">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                        v-for="item in shiftList"
                        :key="item.sId"
                        :label="item.sCategory"
                        :value="item.sId"
                    ></el-option>
                </el-select>
                <div class="label">质管确认</div>
                <el-select style="width: 100px;" v-model="searchData.zg">
                    <el-option label="全部" value=""> </el-option>
                    <el-option label="待确认" :value="0"> </el-option>
                    <el-option label="已确认" :value="1"> </el-option>
                </el-select>
                <div class="label">生产确认</div>
                <el-select style="width: 100px;" v-model="searchData.sc">
                    <el-option label="全部" value=""> </el-option>
                    <el-option label="待确认" :value="0"> </el-option>
                    <el-option label="已确认" :value="1"> </el-option>
                </el-select>
            </div>
            <div class="search-right">
                <div class="btn btn-query" @click="getList">
                    查询
                </div>
                <div class="btn btn-setting" @click="openEtc">
                    模板配置
                </div>
                <div
                    class="btn btn-add"
                    @click="openEngineeringInspection('新增工程检查')"
                >
                    新增
                </div>
                <div
                    class="btn btn-query"
                    @click="openEngineeringInspection('质管确认', curItem)"
                >
                    质管确认
                </div>
                <div
                    class="btn btn-query"
                    @click="openEngineeringInspection('生产确认', curItem)"
                >
                    生产确认
                </div>
            </div>
        </div>
        <div class="view-container flex-column-layout">
            <div class="table-contain full-flex">
                <my-table
                    :data="tableData"
                    :tableHead="tableHead"
                    style="width: 100%"
                    @rowClick="click1"
                >
                    <template #OptionList="{scope}">
                        <div
                            title="编辑"
                            class="opt-btn"
                            @click="
                                openEngineeringInspection('编辑工程检查', scope)
                            "
                        >
                            <img src="../../assets/images/icon_pensoil.png" />
                        </div>
                        <div
                            class="opt-btn"
                            title="查看"
                            @click="
                                openEngineeringInspection('查看工程检查', scope)
                            "
                        >
                            <img src="../../assets/images/check.svg" />
                        </div>
                        <div
                            class="opt-btn"
                            title="导出"
                            @click="exportFn(scope)"
                        >
                            <img src="../../assets/images/export.svg" />
                        </div>
                        <div
                            class="opt-btn"
                            title="删除"
                            @click="delItemFn(scope)"
                        >
                            <img src="../../assets/images/del.svg" />
                        </div>
                    </template>
                    <template #CreateTime="{scope}">
                        {{
                            scope.CreateTime
                                ? scope.CreateTime.replace('T', ' ')
                                : ''
                        }}
                    </template>
                    <template #ModifyTime="{scope}">
                        {{
                            scope.ModifyTime
                                ? scope.ModifyTime.replace('T', ' ')
                                : ''
                        }}
                    </template>
                </my-table>
            </div>
        </div>

        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
        <EngineeringInspectionPop
            v-if="engineeringInspectionShow"
            :title="engineeringInspectionTitle"
            :selectItem="engineeringInspectionSelectItem"
            @callback="engineeringInspectionCallback"
        />
        <EngineeringInspectionTemplateConfigurationPop
            v-if="etcShow"
            @callback="etcCallback"
        />
    </div>
</template>

<script>
import MyTable from '@/components/public/table0Diy.vue';
import TipPop from '../../components/public/tipPop.vue';
import EngineeringInspectionPop from './EngineeringInspectionPop.vue';
import EngineeringInspectionTemplateConfigurationPop from './EngineeringInspectionTemplateConfigurationPop.vue';
import moment from 'moment'; //导入文件

export default {
    name: 'team',
    components: {
        MyTable,
        TipPop,
        EngineeringInspectionPop,
        EngineeringInspectionTemplateConfigurationPop
    },
    data() {
        return {
            shiftList: [],
            workStepList: [],
            etcShow: false,

            isTipShow: false,
            tipText: '',
            noCancel: true,
            engineeringInspectionShow: false,
            engineeringInspectionTitle: '',
            engineeringInspectionSelectItem: null,

            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            searchList: [
                {
                    title: '计划状态：',
                    model: 'planStatus',
                    type: 'select',
                    optionList: [
                        {
                            label: '全部',
                            value: '-1'
                        },
                        {
                            label: '暂停中',
                            value: '1'
                        },
                        {
                            label: '待开工',
                            value: '0'
                        },
                        {
                            label: '已开工',
                            value: '2'
                        }
                    ],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '时间范围：',
                    model: 'argStartTime',
                    type: 'date'
                },
                {
                    title: '-',
                    model: 'argEndTime',
                    type: 'date'
                },
                {
                    model: 'classes',
                    type: 'key'
                }
            ],
            searchData: {
                sid: '',
                argStartTime: '',
                argEndTime: '',
                shift: '',
                zg: '',
                sc: ''
            },
            tableData: [],
            tableHead: {
                OptionList: {
                    name: '操作',
                    width: 220,
                    slot: 'OptionList'
                },
                InspectionNo: '报表编号',
                SectionName: '生产线',
                StepName: '工位名',
                ModifyTime: {
                    name: '日期',
                    slot: 'ModifyTime'
                },
                ShiftName: '班次',
                CreateTime: {
                    name: '创建时间',
                    slot: 'CreateTime'
                },
                DisplayQualityConfirm: '品质确认',
                DisplayProductConfirm: '生产确认'
            },
            curItem: null,
            delItem: null
        };
    },
    props: [],
    watch: {},

    mounted() {
        this.searchData.argStartTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() -
                30 * 24 * 60 * 60 * 1000
        );
        this.searchData.argEndTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
        );
        this.getWorkWorkStepList();
    },

    methods: {
        click1(row) {
            this.curItem = row;
        },
        getShift() {
            this.$axios({
                method: 'get',
                url: `/api/Class/QueryShift?KeyWord=`
            }).then(res => {
                if (res.data.code == 0) {
                    this.shiftList = res.data.data;
                    this.getList();
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        getWorkWorkStepList() {
            this.$axios({
                method: 'post',
                url: '/api/ProcessParameterConfigure/QueryWorkWorkStepList'
            }).then(res => {
                if (res.data.code == 0) {
                    this.workStepList = res.data.data;
                    this.getShift();
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        openEtc() {
            this.etcShow = true;
        },
        etcCallback(r) {
            this.etcShow = false;
            if (r) {
                this.isTipShow = true;
                this.tipText = r;
            }
            this.getList();
        },
        tipCallBack(str) {
            this.noCancel = true;
            this.isTipShow = false;
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `/api/InspectionReport/DeleteInspectionReport?reportId=${this.delItem.ReportId}`
                }).then(res => {
                    if (res.data.code == 0) {
                        this.isTipShow = true;
                        this.tipText = `删除成功！`;
                        this.getList();
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
            }
        },
        delItemFn(row) {
            this.delItem = row;
            this.isTipShow = true;
            this.tipText = '是否确认删除该报表？';
            this.noCancel = false;
        },
        downloadFile(file, fileName) {
            const blob = new Blob([file]);
            // 兼容不同浏览器的URL对象
            const url = window.URL || window.webkitURL;
            // 创建下载链接
            const downloadHref = url.createObjectURL(blob);
            // 创建a标签并为其添加属性
            let downloadLink = document.createElement('a');
            downloadLink.href = downloadHref;
            downloadLink.download = fileName;
            // 触发点击事件执行下载
            downloadLink.click();
            window.URL.revokeObjectURL(url);
        },
        exportFn(row) {
            this.$axios({
                method: 'get',
                url: `/api/InspectionReport/ExportReport?reportId=${row.ReportId}`,
                responseType: 'blob'
            }).then(res => {
                if (res.status === 200) {
                    this.downloadFile(res.data, '品质巡检报表.xls');
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        openEngineeringInspection(t, r) {
            if (t == '生产确认' && r.ProductConfirm) {
                this.isTipShow = true;
                this.tipText = `当前记录已生产确认`;
                return;
            }
            if (t == '质管确认' && r.QualityConfirm) {
                this.isTipShow = true;
                this.tipText = `当前记录已质管确认`;
                return;
            }
            this.engineeringInspectionShow = true;
            this.engineeringInspectionTitle = t;
            this.engineeringInspectionSelectItem = r;
        },
        engineeringInspectionCallback(str) {
            this.engineeringInspectionShow = false;
            this.engineeringInspectionTitle = '';
            this.engineeringInspectionSelectItem = null;
            if (str) {
                this.isTipShow = true;
                this.tipText = str;
            }
            this.getList();
        },
        getList() {
            let {
                argStartTime,
                argEndTime,
                sid,
                shift,
                zg,
                sc
            } = this.searchData;
            console.log(this.searchData);

            let _day = moment(argEndTime).diff(
                moment(argStartTime),
                'day',
                false
            );
            if (_day > 180) {
                this.isTipShow = true;
                this.tipText = `最大时间跨度为180天，请重新选择！`;
                return;
            }
            this.$axios
                .get(
                    `/api/InspectionReport/QueryInspectionReportList?sid=${sid}&startTime=${argStartTime}
                &endTime=${argEndTime}&shift=${shift}&qualityStatus=${
                        zg === '' ? null : zg
                    }&productStatus=${sc === '' ? null : sc}`
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.tableData = [...res.data.data];
                        if (this.tableData.length) {
                            this.curItem = this.tableData[0];
                        }
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.QualityInspection {
    width: 100%;
    height: 100%;
    padding: 100px 10px 40px;
    box-sizing: border-box;
    background: #fff;

    .search-container {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #ddd;
        padding: 0 10px;
        .search-left {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .label {
                margin: 0 10px;
            }
        }
        .search-right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .btn {
            font-weight: bold;
            width: 100px;
            height: 38px;
            line-height: 38px;
            margin-left: 10px;
            border: 2px solid #4270e4;
            background-color: #fff;
            color: #4270e4;
            font-size: var(--fontSize);
            border-radius: 4px;
            text-align: center;
            vertical-align: middle;
            box-sizing: border-box;
            cursor: pointer;

            &.btn-query {
                background-color: #4270e4;
                color: #fff;
            }
            &.btn-setting {
                border-color: #ffa629;
                background-color: #ffa629;
                color: #fff;
            }
            &.btn-add {
                border-color: #46be05;
                color: #46be05;
            }
        }
    }
    .view-container {
        width: 100%;
        height: calc(100% - 60px);
    }
    .echart-view {
        height: 45%;
        margin-bottom: 21px;
    }
    .flex-layout {
        display: flex;
    }
    .flex-column-layout {
        display: flex;
        flex-flow: column;
    }
    .full-flex {
        flex: 1;
    }
    .opt-btn {
        width: 50px;
        height: 28px;
        background-color: #fff;
        border: 1px solid #cccccc;
        border-radius: 14px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
        position: relative;
        img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 20px;
            height: 20px;
        }
    }
}
</style>
