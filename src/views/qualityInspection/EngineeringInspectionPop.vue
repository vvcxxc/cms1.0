<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}
                <img
                    :src="require('../../assets/images/no.png')"
                    alt=""
                    @click="handleClick"
                    class="close"
                />
            </div>

            <div class="popContent">
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">日期</div>
                        <el-date-picker
                            v-model="date"
                            style="width: 300px;"
                            type="date"
                            placeholder="请选择"
                            value-format="yyyy-MM-dd"
                            :disabled="title == '查看工程检查'"
                        ></el-date-picker>
                    </div>
                    <div class="content">
                        <div class="contentLable required">班次</div>

                        <el-select
                            style="width: 300px"
                            placeholder="请选择"
                            v-model="shift"
                            :disabled="title == '查看工程检查'"
                        >
                            <el-option
                                v-for="item in shiftList"
                                :key="item.sId"
                                :label="item.sCategory"
                                :value="item.sId"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="content">
                        <div class="contentLable required">生产线</div>
                        <el-select
                            style="width: 300px"
                            placeholder="请选择"
                            v-model="process"
                            :disabled="title == '查看工程检查'"
                        >
                            <el-option
                                v-for="item in processList"
                                :key="item"
                                :label="item"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">检查项名称</div>
                        <el-select
                            style="width: 300px"
                            placeholder="请选择"
                            @change="getTableData"
                            v-model="workSteps"
                            :disabled="title == '查看工程检查'"
                        >
                            <el-option
                                v-for="item in workStepsList"
                                :key="item.Id"
                                :label="item.Name"
                                :value="item.Id"
                            >
                            </el-option>
                        </el-select>
                    </div>

                    <div class="content">
                        <div class="contentLable required">报表编号</div>
                        <el-input
                            v-model="code"
                            style="width: 300px"
                            :disabled="title == '查看工程检查'"
                        />
                    </div>

                    <div class="content"></div>
                </div>

                <div class="table-flex">
                    <div class="table-item">
                        <div class="table-title">
                            <CurrentTitle title="选择检查项目" />
                        </div>
                        <div class="table">
                            <my-table
                                :data="tableData1"
                                :tableHead="tableHead1"
                                style="width: 100%"
                                @rowClick="click1"
                                :noDataText="
                                    !workSteps
                                        ? '选择检查项后自动带出'
                                        : '暂无数据'
                                "
                            >
                            </my-table>
                        </div>
                    </div>
                    <div class="table-item">
                        <div class="table-title">
                            <div class="title">
                                <CurrentTitle title="工程检查" />
                            </div>

                            <div
                                v-if="
                                    title == '新增工程检查' ||
                                        title == '编辑工程检查'
                                "
                                class="btn btn-query"
                                @click="
                                    openEngineeringInspection(
                                        '新增工程检查记录'
                                    )
                                "
                            >
                                新增
                            </div>
                            <div
                                v-if="
                                    title == '新增工程检查' ||
                                        title == '编辑工程检查'
                                "
                                class="btn btn-query"
                                @click="
                                    openEngineeringInspection(
                                        '编辑工程检查记录'
                                    )
                                "
                            >
                                编辑
                            </div>
                            <div
                                v-if="title == '查看工程检查'"
                                class="btn btn-query"
                                @click="sumbitCur"
                            >
                                确认
                            </div>
                        </div>
                        <div class="table">
                            <my-table
                                :data="tableData2"
                                :tableHead="tableHead2"
                                style="width: 100%"
                                @rowClick="click2"
                            >
                                <template #Decide="{scope}">
                                    <el-tooltip
                                        :content="scope.Decide"
                                        placement="top-start"
                                    >
                                        <div
                                            :style="{
                                                color:
                                                    scope.Decide == 'NG'
                                                        ? 'red'
                                                        : 'inherit'
                                            }"
                                        >
                                            {{ scope.Decide }}
                                        </div>
                                    </el-tooltip>
                                </template>
                                <template #CreatTime="{scope}">
                                    <el-tooltip
                                        :content="
                                            scope.CreatTime
                                                ? scope.CreatTime.replace(
                                                      'T',
                                                      ' '
                                                  )
                                                : '-'
                                        "
                                        placement="top-start"
                                    >
                                        <div>
                                            {{
                                                scope.CreatTime
                                                    ? scope.CreatTime.replace(
                                                          'T',
                                                          ' '
                                                      )
                                                    : '-'
                                            }}
                                        </div>
                                    </el-tooltip>
                                </template>
                                <template #ConfirmTime="{scope}">
                                    <el-tooltip
                                        :content="
                                            scope.ConfirmTime
                                                ? scope.ConfirmTime.replace(
                                                      'T',
                                                      ' '
                                                  )
                                                : '-'
                                        "
                                        placement="top-start"
                                    >
                                        <div>
                                            {{
                                                scope.ConfirmTime
                                                    ? scope.ConfirmTime.replace(
                                                          'T',
                                                          ' '
                                                      )
                                                    : '-'
                                            }}
                                        </div>
                                    </el-tooltip>
                                </template>
                                <template #UpdateTime="{scope}">
                                    <el-tooltip
                                        :content="
                                            scope.UpdateTime
                                                ? scope.UpdateTime.replace(
                                                      'T',
                                                      ' '
                                                  )
                                                : '-'
                                        "
                                        placement="top-start"
                                    >
                                        <div>
                                            {{
                                                scope.UpdateTime
                                                    ? scope.UpdateTime.replace(
                                                          'T',
                                                          ' '
                                                      )
                                                    : '-'
                                            }}
                                        </div>
                                    </el-tooltip>
                                </template>
                            </my-table>
                        </div>
                    </div>
                </div>

                <div
                    class="mt"
                    v-if="
                        title == '查看工程检查' ||
                            title == '质管确认' ||
                            title == '生产确认'
                    "
                >
                    <CurrentTitle
                        title="质管确认"
                        v-if="title == '查看工程检查' || title == '质管确认'"
                    />
                    <div
                        class="content1-line"
                        v-if="title == '查看工程检查' || title == '质管确认'"
                    >
                        <div class="content" v-if="title == '查看工程检查'">
                            <div class="contentLable required">质管确认</div>
                            <el-input
                                style="width: 300px"
                                v-model="DisplayQualityConfirm"
                                :disabled="title != '质管确认'"
                            />
                        </div>

                        <div
                            class="content"
                            v-if="
                                title == '查看工程检查' || title == '质管确认'
                            "
                        >
                            <div class="contentLable required">确认人</div>
                            <el-input
                                style="width: 300px"
                                disabled
                                v-model="QualityUserName"
                            />
                        </div>
                    </div>
                    <div class="content1-line" v-if="title == '查看工程检查'">
                        <div class="content">
                            <div class="contentLable required">确认时间</div>
                            <el-input
                                style="width: 300px"
                                disabled
                                v-model="QualityTime"
                            />
                        </div>

                        <div class="content"></div>
                    </div>
                    <div
                        class="content1-line"
                        v-if="title == '查看工程检查' || title == '质管确认'"
                    >
                        <div class="content">
                            <div class="contentLable">备注</div>
                            <el-input
                                type="textarea"
                                style="width: 720px"
                                v-model="QualityRemark"
                                :disabled="title == '查看工程检查'"
                                maxLength="100"
                            />
                        </div>
                    </div>
                    <CurrentTitle
                        title="生产确认"
                        v-if="title == '查看工程检查' || title == '生产确认'"
                    />
                    <div
                        class="content1-line"
                        v-if="title == '查看工程检查' || title == '生产确认'"
                    >
                        <div class="content" v-if="title == '查看工程检查'">
                            <div class="contentLable required">生产确认</div>
                            <el-input
                                style="width: 300px"
                                v-model="DisplayProductConfirm"
                                :disabled="title != '生产确认'"
                            />
                        </div>

                        <div
                            class="content"
                            v-if="
                                title == '查看工程检查' || title == '生产确认'
                            "
                        >
                            <div class="contentLable required">确认人</div>
                            <el-input
                                style="width: 300px"
                                disabled
                                v-model="ProductUserName"
                            />
                        </div>
                    </div>

                    <div class="content1-line" v-if="title == '查看工程检查'">
                        <div class="content">
                            <div class="contentLable required">确认时间</div>
                            <el-input
                                style="width: 300px"
                                disabled
                                v-model="ProductTime"
                            />
                        </div>

                        <div class="content"></div>
                    </div>
                    <div
                        class="content1-line"
                        v-if="title == '查看工程检查' || title == '生产确认'"
                    >
                        <div class="content">
                            <div class="contentLable">备注</div>
                            <el-input
                                type="textarea"
                                style="width: 720px"
                                :disabled="title == '查看工程检查'"
                                v-model="ProductRemark"
                                maxLength="100"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="popBtn" v-if="title == '查看工程检查'">
                <el-button class="btn" @click="handleClick('no')">
                    返回
                </el-button>
            </div>
            <div class="popBtn" v-else>
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button
                    class="btn"
                    @click="handleClick('yes')"
                    style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                "
                >
                    确定
                </el-button>
            </div>
        </div>
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
        <InspectionRecordsPop
            v-if="inspectionShow"
            :title="inspectionTitle"
            :selectItem="curRight"
            :curLeft="curLeft"
            :StepName="StepName"
            @callback="inspectionCallback"
        />
    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
import CurrentTitle from '../../components/public/currentTitle.vue';
import MyTable from '../../components/public/table0Diy.vue';
import InspectionRecordsPop from './InspectionRecordsPop.vue';
import moment from 'moment';

export default {
    props: ['title', 'selectItem'],
    components: {
        MyTable,
        TipPop,
        CurrentTitle,
        InspectionRecordsPop
    },
    data() {
        return {
            reportId: 0,
            isTipShow: false,
            tipText: '',
            noCancel: true,
            inspectionShow: false,
            inspectionTitle: '',
            inspectionSelectItem: null,
            processList: [],
            process: '',
            workStepsList: [],
            workSteps: '',
            date: '',
            code: 'SC-ST-C-000-C/G-06', //新增的默认值
            shiftList: [],
            shift: '',
            tableData1: [],
            tableData2: [],
            tableHead1: {
                ItemName: '管理项目',
                ItemContent: '管理内容',
                ItemVelue: '管理值',
                MeasureMethod: '测量（仪器/方法）',
                MeasureFrequency: '测量频率',
                RecordFrequency: '记录频率'
            },
            tableHead2: {},

            curLeft: null,
            curRight: null,
            StepName: '',
            ProductConfirm: 0,
            QualityConfirm: 0,
            ProductUserName: '',
            QualityUserName: '',
            QualityTime: '',
            ProductTime: '',
            QualityRemark: '',
            ProductRemark: '',
            DisplayProductConfirm: '',
            DisplayQualityConfirm: ''
        };
    },

    mounted() {
        this.getShiftList();
        this.getProcess();
        this.getWorkSteps();
        if (this.title != '新增工程检查') {
            console.log('this.selectItem', this.selectItem);
            this.reportId = this.selectItem.ReportId;
            this.date = moment(this.selectItem.ModifyTime).format('YYYY-MM-DD');
            this.process = this.selectItem.SectionName;
            this.shift = this.selectItem.ShiftId;
            this.workSteps = this.selectItem.SID;
            this.code = this.selectItem.InspectionNo;
            this.ProductConfirm = this.selectItem.ProductConfirm;
            this.QualityConfirm = this.selectItem.QualityConfirm;
            this.ProductUserName = this.selectItem.ProductUserName;
            this.QualityUserName = this.selectItem.QualityUserName;
            this.QualityTime = this.selectItem.QualityTime
                ? this.selectItem.QualityTime.replace('T', ' ')
                : '';
            this.ProductTime = this.selectItem.ProductTime
                ? this.selectItem.ProductTime.replace('T', ' ')
                : '';
            this.QualityRemark = this.selectItem.QualityRemark;
            this.ProductRemark = this.selectItem.ProductRemark;
            this.DisplayProductConfirm = this.selectItem.DisplayProductConfirm;
            this.DisplayQualityConfirm = this.selectItem.DisplayQualityConfirm;
            let userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserName;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserName;
            }

            if (this.title == '生产确认') {
                this.ProductUserName = userid;
            }
            if (this.title == '质管确认') {
                this.QualityUserName = userid;
            }
            this.tableHead2 = {
                Mode: '生产机型',
                Result: '检测结果',
                Decide: {
                    name: '判定',
                    slot: 'Decide'
                },
                Remark: '备注',
                Inspector: '检查人',
                CreatTime: {
                    name: '检查时间',
                    slot: 'CreatTime'
                },
                Confirmor: '确认人',
                ConfirmTime: {
                    name: '确认时间',
                    slot: 'ConfirmTime'
                },
                Modifier: '修改人',
                UpdateTime: {
                    name: '修改时间',
                    slot: 'UpdateTime'
                }
            };
        } else {
            this.date = moment().format('YYYY-MM-DD');
            this.tableHead2 = {
                Mode: '生产机型',
                Result: '检测结果',
                Decide: {
                    name: '判定',
                    slot: 'Decide'
                },
                Remark: '备注',
                Inspector: '检查人',
                CreatTime: {
                    name: '检查时间',
                    slot: 'CreatTime'
                },
                Modifier: '修改人',
                UpdateTime: {
                    name: '修改时间',
                    slot: 'UpdateTime'
                }
            };
        }
    },
    methods: {
        click1(row) {
            this.curLeft = row;
            this.getTableData2();
        },
        click2(row) {
            this.curRight = row;
        },
        getShiftList() {
            this.$axios({
                method: 'get',
                url: `/api/Class/QueryShift?KeyWord=`
            }).then(res => {
                if (res.data.code == 0) {
                    this.shiftList = res.data.data;
                    // if (this.shiftList.length) {
                    //     this.shift = this.shiftList[0].sId;
                    // }
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        getProcess() {
            this.$axios({
                url: `/api/InspectionReport/GetSectionName`,
                method: 'get'
            }).then(res => {
                if (res.data.code == 0) {
                    this.processList = res.data.data;
                    if (this.processList.length) {
                        this.process = this.processList[0];
                    }
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        getWorkSteps() {
            this.$axios({
                url: `/api/InspectionReport/QueryInspectionTemplate?isCreate=${
                    this.title == '新增工程检查' ? true : false
                }&reportId=${
                    this.title == '新增工程检查' ? '' : this.reportId
                }`,
                method: 'get'
            }).then(res => {
                if (res.data.code == 0) {
                    this.workStepsList = res.data.data;
                    // if (this.workStepsList.length) {
                    //     this.workSteps = this.workStepsList[0].Id;
                    // }
                    this.getTableData();
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        getTableData() {
            if (!this.workSteps) return;
            this.curLeft = null;
            this.$axios({
                method: 'get',
                url: `/api/InspectionReport/QueryInspectionTemplate?isCreate=${
                    this.title == '新增工程检查' ? true : false
                }&reportId=${this.title == '新增工程检查' ? '' : this.reportId}`
            }).then(res => {
                if (res.data.code == 0) {
                    let _o = res.data.data.find(i => i.Id == this.workSteps);
                    if (_o) {
                        this.tableData1 = _o.Items || [];
                        this.StepName = _o.Name;
                        if (this.tableData1.length) {
                            this.curLeft = this.tableData1[0];
                            this.getTableData2();
                        }
                    } else {
                        this.tableData1 = [];
                    }
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        getTableData2() {
            console.log('this.reportId', this.reportId);
            if (!this.reportId) {
                this.tableData2 = [];
                return;
            }
            this.$axios({
                method: 'get',
                url: `/api/InspectionReport/QueryInspectionChecks?reportId=${this.reportId}&pid=${this.curLeft.Id}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.tableData2 = res.data.data;
                    if (this.tableData2.length) {
                        this.curRight = this.tableData2[0];
                    }
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        tipCallBack(str) {
            this.isTipShow = false;
            this.noCancel = true;
            this.tipText = '';
            if (str == 'yes') {
                if (!this.tableData2[this.curRight.$index]) {
                    this.isTipShow = true;
                    this.tipText = '请选择工程';
                    return;
                }
                let userid = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserName;
                }
                this.$axios({
                    method: 'post',
                    url: `/api/InspectionReport/EditInspectionCheck`,
                    data: {
                        Id: this.tableData2[this.curRight.$index].Id,
                        ReportId: this.reportId,
                        Pid: this.curLeft.Id,
                        Result: this.tableData2[this.curRight.$index].Result,
                        Mode: this.tableData2[this.curRight.$index].Id,
                        Decide: this.tableData2[this.curRight.$index].Decide,
                        Remark: this.tableData2[this.curRight.$index].Remark,
                        Inspector: this.tableData2[this.curRight.$index].Remark
                            .Inspector,
                        CreatTime: this.tableData2[this.curRight.$index].Remark
                            .CreatTime,
                        UpdateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                        Modifier: userid,
                        ConfirmTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                        Confirmor: userid
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.isTipShow = true;
                        this.tipText = '确认成功！';
                        this.getTableData2();
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
            }
        },
        sumbitCur() {
            this.isTipShow = true;
            this.tipText = '是否确认当前检查记录？';
            this.noCancel = false;
        },
        openEngineeringInspection(t) {
            if (t == '新增工程检查记录') {
                if (!this.curLeft || !this.tableData1.length) {
                    this.isTipShow = true;
                    this.tipText = `请选择检查项目！`;
                    return;
                }
            } else {
                if (!this.curRight || !this.tableData2.length) {
                    this.isTipShow = true;
                    this.tipText = `请选择检查项目！`;
                    return;
                }
                if (this.curRight.ConfirmTime && this.curRight.Confirmor) {
                    this.isTipShow = true;
                    this.tipText = `当前检查记录已确认，不能再编辑`;
                    return;
                }
            }
            this.inspectionShow = true;
            this.inspectionTitle = t;
        },
        inspectionCallback(data) {
            console.log('data', data);
            if (data) {
                let userid = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserName;
                }
                if (this.inspectionTitle == '新增工程检查记录') {
                    this.tableData2.push({
                        ...data,
                        Inspector: userid,
                        CreatTime: moment().format('YYYY-MM-DD HH:mm:ss')
                        //新增不管UpdateTime和Modifier
                    });
                } else {
                    this.tableData2.splice(this.curRight.$index, 1, {
                        ...this.tableData2[this.curRight.$index],
                        Mode: data.Mode,
                        Result: data.Result,
                        Decide: data.Decide,
                        Remark: data.Remark,
                        Modifier: userid,
                        UpdateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                    });
                }
            }
            this.inspectionShow = false;
            this.inspectionTitle = '';
        },
        handleClick(str) {
            if (str == 'yes') {
                let userid = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserName;
                }
                let _shift = this.shiftList.find(_ => _.sId == this.shift);
                if (this.title == '新增工程检查') {
                    this.$axios({
                        method: 'post',
                        url: `/api/InspectionReport/AddInspectionReport`,
                        data: {
                            ReportId: 0,
                            ModifyTime: this.date,
                            createtime: this.date,
                            ShiftId: this.shift,
                            SID: this.workSteps, //检查项
                            SectionName: this.process, //生产线
                            StepName: this.StepName,
                            InspectionNo: this.code,
                            ShiftName: _shift ? _shift.sCategory : ''
                        }
                    }).then(res => {
                        if (res.data.code == 0) {
                            if (!this.curLeft || !this.curLeft.Id) {
                                //下面没数据就不保存下面了
                                this.$emit('callback', '新增成功！');
                                return;
                            }
                            this.$axios({
                                method: 'post',
                                url: `/api/InspectionReport/SaveInspectionCheck`,
                                data: {
                                    ReportId: res.data.data,
                                    Pid: this.curLeft.Id,
                                    Items: this.tableData2.map(i => ({
                                        ...i,
                                        Pid: this.curLeft.Id,
                                        ReportId: res.data.data
                                        // CreatTime: moment().format(
                                        //     'YYYY-MM-DD HH:mm:ss'
                                        // ),
                                        // UpdateTime: moment().format(
                                        //     'YYYY-MM-DD HH:mm:ss'
                                        // ),
                                        // Inspector: userid,
                                        // Modifier: userid
                                    }))
                                }
                            }).then(res => {
                                if (res.data.code == 0) {
                                    this.$emit('callback', '新增成功！');
                                } else {
                                    this.isTipShow = true;
                                    this.tipText = res.data.msg;
                                }
                            });
                        } else {
                            this.isTipShow = true;
                            this.tipText = res.data.msg;
                        }
                    });
                } else {
                    this.$axios({
                        method: 'post',
                        url: `/api/InspectionReport/EditInspectionReport`,
                        data: {
                            ReportId: this.reportId,
                            ModifyTime: this.date,
                            ShiftId: this.shift,
                            SID: this.workSteps, //检查项
                            SectionName: this.process, //生产线
                            StepName: this.StepName,
                            InspectionNo: this.code,
                            ShiftName: _shift ? _shift.sCategory : '',
                            QualityConfirm:
                                this.title == '质管确认'
                                    ? 1
                                    : this.selectItem.QualityConfirm,
                            ProductConfirm:
                                this.title == '生产确认'
                                    ? 1
                                    : this.selectItem.ProductConfirm,
                            QualityUserName:
                                this.title == '质管确认'
                                    ? userid
                                    : this.selectItem.QualityUserName,
                            ProductUserName:
                                this.title == '生产确认'
                                    ? userid
                                    : this.selectItem.ProductUserName,
                            QualityTime:
                                this.title == '质管确认'
                                    ? moment().format('YYYY-MM-DD HH:mm:ss')
                                    : this.selectItem.QualityTime,
                            ProductTime:
                                this.title == '生产确认'
                                    ? moment().format('YYYY-MM-DD HH:mm:ss')
                                    : this.selectItem.ProductTime,

                            QualityRemark:
                                this.title == '质管确认'
                                    ? this.QualityRemark
                                    : undefined,

                            ProductRemark:
                                this.title == '生产确认'
                                    ? this.ProductRemark
                                    : undefined
                        }
                    }).then(res => {
                        if (res.data.code == 0) {
                            if (!this.curLeft || !this.curLeft.Id) {
                                //下面没数据就不保存下面了
                                this.$emit('callback', '修改成功！');
                                return;
                            }
                            this.$axios({
                                method: 'post',
                                url: `/api/InspectionReport/SaveInspectionCheck`,
                                data: {
                                    ReportId: this.reportId,
                                    Pid: this.curLeft.Id,
                                    Items: this.tableData2.map(i => ({
                                        ...i,
                                        Pid: this.curLeft.Id,
                                        ReportId: this.reportId
                                        // CreatTime:
                                        //     i.Id == 0
                                        //         ? moment().format(
                                        //               'YYYY-MM-DD HH:mm:ss'
                                        //           )
                                        //         : i.CreatTime,
                                        // UpdateTime: moment().format(
                                        //     'YYYY-MM-DD HH:mm:ss'
                                        // ),
                                        // Inspector:
                                        //     i.Id == 0 ? userid : i.Inspector,
                                        // Modifier: userid
                                    }))
                                }
                            }).then(res => {
                                if (res.data.code == 0) {
                                    this.$emit('callback', '修改成功！');
                                } else {
                                    this.isTipShow = true;
                                    this.tipText = res.data.msg;
                                }
                            });
                        } else {
                            this.isTipShow = true;
                            this.tipText = res.data.msg;
                        }
                    });
                }
            } else {
                this.$emit('callback');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.zdeditPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 1500px;
        height: auto;
        top: 45%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 100%;
            height: 60px;
            background: rgba(56, 109, 240);
            line-height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            position: relative;

            .close {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 18px;
                right: 20px;
                cursor: pointer;
            }
        }

        .popContent {
            width: 100%;
            height: auto;
            max-height: 650px;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;
            .mt {
                margin-top: 10px;
                width: 840px;
            }
            .content1-line {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .content {
                    display: flex;
                    width: 100%;
                    line-height: 40px;
                    margin: 10px 0;

                    .contentLable,
                    .contentLable2 {
                        width: 110px;
                        text-align: right;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
                    }

                    .contentLable2 {
                        width: 120px;
                    }

                    img {
                        width: 38px;
                        height: 38px;
                        position: absolute;
                        top: 2px;
                        right: 0;
                        cursor: pointer;
                    }

                    .required::before {
                        content: '*';
                        color: #f56c6c;
                        margin-right: 4px;
                    }
                }
            }

            .table-flex {
                display: flex;
                justify-content: space-between;
                height: 400px;
                .table-item {
                    width: calc(50% - 5px);
                    height: 100%;

                    .table-title {
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        .title {
                            width: 100px;
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
                    .table {
                        width: 100%;
                        height: calc(100% - 50px);
                    }
                }
            }
        }

        .popBtn {
            width: 100%;
            height: 60px;
            text-align: center;
            // line-height: 60px;

            .btn {
                width: 100px;
                height: 38px;
                background: rgba(153, 153, 153);
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 20px;
                margin-top: 10px;
                border: 1px solid #999999;
            }
        }
    }
}
</style>
<style lang="scss">
.zdeditPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>
