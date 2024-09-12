<!--
 * @Description: 报警记录历史报警界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 16:30:44
 -->
<template>
    <div class="public-table">
        <div
            class="loadcover"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
            v-loading="this.$store.state.isShow"
            v-show="this.$store.state.isShow"
            style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"
        ></div>
        <div class="search-container">
            <my-search
                :searchList="searchList"
                :searchData="searchData"
                @setParams="setParams"
                @change="change"
            ></my-search>
        </div>
        <div class="table-container">
            <my-table
                :data="data"
                ref="table"
                :tableHead="tableHead"
                :tip="tip"
                @handleEdit="handleEdit"
                @handleEdit1="handleEdit1"
            ></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>
        <div
            class="look lookq"
            v-show="haschange"
            :style="{ width: 1330 + 'px', height: 730 + 'px' }"
        >
            <div class="looktop"></div>
            <div
                class="lookhead"
                :class="[
                    { colordiv: $store.state.color == 'grey' },
                    { fcolor: $store.state.color == 'grey' }
                ]"
            >
                {{ lang.AlarmRecord_FaultRetrieva_FaultSearch }}
                <img
                    :src="no2"
                    alt
                    class="no1"
                    @click="cancel"
                    v-if="$store.state.color == 'grey'"
                />
                <img :src="no" alt class="no1" @click="cancel" v-else />
            </div>
            <div
                class="lookcontent"
                :style="{ padding: 30 + 'px', paddingBottom: 0 }"
            >
                <div class="search">
                    <input
                        type="text"
                        :placeholder="lang.AlarmRecord_Time_Keyword"
                        v-model="keyword"
                    />
                    <input
                        type="text"
                        :placeholder="
                            lang.AlarmRecord_FaultRetrieva_Description
                        "
                        class="inputname"
                        v-model="AlarmMsg"
                    />
                    <span @click="search">{{
                        lang.AlarmRecord_FaultRetrieva_Select
                    }}</span>
                </div>
                <div class="table atable" :style="{ height: 530 + 'px' }">
                    <el-table
                        :data="tableData"
                        v-loading="this.$store.state.isShow"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        height="100%"
                        border
                        :style="{ width: '100%', fontSize: 14 + 'px' }"
                        :header-cell-style="{
                            background: '#dcf0f9',
                            color: '#5883e7',
                            'border-left': '1px solid #a7d0e2',
                            height: 50 + 'px',
                            padding: '0'
                        }"
                    >
                        <template slot="empty">
                            <span>{{
                                lang.SCMSConsoleWebApiMySql_NoData
                            }}</span>
                        </template>
                        <el-table-column
                            prop="AlarmSource"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_Source
                            "
                            width="“180”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="AlarmTime"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_AlarmTime
                            "
                            width="“180”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="KeyWord"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_KeyWord
                            "
                            width="“180”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="AlarmType"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_Type
                            "
                            width="“180”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="AlarmMsg"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_Description
                            "
                            width="“280”"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <a
                                    href="javascript:void(0);"
                                    @click="getdata(scope.row)"
                                    >{{ scope.row.AlarmMsg }}</a
                                >
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="Reason"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_Cause
                            "
                            width="“280”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="AddPerson"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_User
                            "
                            width="“180”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="DealPerson"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_Processor
                            "
                            width="“180”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="AddTime"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_Addtime
                            "
                            width="“180”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="FaultTreatment"
                            :label="
                                lang.AlarmRecord_FaultRetrieva_DataGrid_Method
                            "
                            width="“260”"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                    </el-table>
                </div>
                <div class="page">
                    <my-page1 :pageData="pageData1" @req="req1"></my-page1>
                </div>
            </div>
        </div>
        <div class="tip" ref="kongtiao3" v-show="tipchange">
            <div class="tiptop">
                <div
                    class="tiphead"
                    style="position:absolute;width: 380px;height: 40px;"
                ></div>
                <img :src="gth" alt />
                <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword" v-if="deltrue">{{ tipword }}</div>
                <div class="w" v-if="w1">{{ w }}</div>
                <div class="tipdetermine" @click="tip2" v-if="deltrue">
                    {{ lang.MessageBox_Confrim }}
                </div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{ lang.MessageBox_NO }}</div>
                    <div class="two" @click="yes1">
                        {{ lang.MessageBox_YES }}
                    </div>
                </div>
            </div>
        </div>
        <div class="cover2" v-if="haschange"></div>
        <div class="cover3" v-if="tipchange"></div>
        <div class="cover4" v-if="error"></div>
        <div class="cover4" v-if="error1"></div>
        <div class="errorsetion errorsetion1" v-show="error" ref="kongtiao4">
            <div class="errortop"></div>
            <div
                class="errorhead"
                :class="[
                    { colordiv: $store.state.color == 'grey' },
                    { fcolor: $store.state.color == 'grey' }
                ]"
            >
                <span
                    :class="[
                        { colordiv: $store.state.color == 'grey' },
                        { fcolor: $store.state.color == 'grey' }
                    ]"
                    >{{ lang.AlarmRecord_FaultlDetail_Details }}</span
                >
                <img
                    :src="no2"
                    alt
                    class="no1"
                    @click="error = false"
                    v-if="$store.state.color == 'grey'"
                />
                <img :src="no" alt class="no1" @click="error = false" v-else />
            </div>
            <div class="errorcontent">
                <div class="first">
                    {{ lang.AlarmRecord_FaultlDetail_Source }}
                    <input
                        type="text"
                        v-model="changedata.AlarmSource"
                        :disabled="disabled"
                    />
                </div>
                <div class="second">
                    <div class="fl">
                        {{ lang.AlarmRecord_FaultlDetail_AlarmTime }}
                        <input
                            type="text"
                            v-model="changedata.AlarmTime"
                            :disabled="disabled"
                        />
                    </div>
                    <div class="fr">
                        {{ lang.AlarmRecord_FaultlDetail_Recoverytime }}
                        <input
                            type="text"
                            v-model="changedata.RecoverTime"
                            :disabled="disabled"
                        />
                    </div>
                </div>
                <div class="second">
                    <div class="fl">
                        {{ lang.AlarmRecord_FaultlDetail_Type }}
                        <input
                            type="text"
                            v-model="changedata.AlarmType"
                            :disabled="disabled"
                        />
                    </div>
                    <div class="fr">
                        {{ lang.AlarmRecord_FaultlDetail_Addtime }}
                        <input
                            type="text"
                            v-model="changedata.AddTime"
                            :disabled="disabled"
                        />
                    </div>
                </div>
                <div class="second">
                    <div class="fl">
                        {{ lang.AlarmRecord_FaultlDetail_User }}
                        <input
                            type="text"
                            v-model="changedata.AddPerson"
                            :disabled="disabled"
                        />
                    </div>
                    <div class="fr">
                        {{ lang.AlarmRecord_FaultlDetail_Processor }}
                        <input
                            type="text"
                            v-model="changedata.DealPerson"
                            :disabled="disabled"
                        />
                    </div>
                </div>
                <div class="third">
                    {{ lang.AlarmRecord_FaultlDetail_KeyWord }}
                    <input
                        type="text"
                        v-model="changedata.KeyWord"
                        :disabled="disabled"
                    />
                </div>
                <div class="third">
                    {{ lang.AlarmRecord_FaultlDetail_Information }}
                    <input
                        type="text"
                        v-model="changedata.AlarmMsg"
                        :disabled="disabled"
                    />
                </div>
                <div class="third">
                    {{ lang.AlarmRecord_FaultlDetail_Cause }}
                    <input
                        type="text"
                        v-model="changedata.Reason"
                        :disabled="disabled"
                    />
                </div>
                <div class="third">
                    {{ lang.AlarmRecord_FaultlDetail_Method }}
                    <input
                        type="text"
                        v-model="changedata.FaultTreatment"
                        :disabled="disabled"
                    />
                </div>
            </div>
        </div>
        <div
            class="errorsetion errorsetion2"
            v-show="error1"
            ref="kongtiao4"
            :style="{ width: '900px', height: '740px' }"
        >
            <div class="errortop"></div>
            <div
                class="errorhead"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <span :class="{ fcolor: $store.state.color == 'grey' }">{{
                    errortitle
                }}</span>
                <img
                    :src="no2"
                    alt
                    class="no1"
                    @click="error2"
                    v-if="$store.state.color == 'grey'"
                />
                <img :src="no" alt class="no1" @click="error2" v-else />
            </div>
            <div class="errorcontent">
                <div class="second">
                    <div class="fl">
                        {{ lang.AlarmRecord_FaultAddAndModify_Source }}
                        <input
                            type="text"
                            v-model="changedata.AlarmTagName"
                            disabled
                        />
                    </div>
                    <div class="fr">
                        {{ lang.AlarmRecord_FaultAddAndModify_AlarmTime }}
                        <input
                            type="text"
                            v-model="changedata.AlarmTime"
                            disabled
                        />
                    </div>
                </div>
                <div class="second">
                    <div class="fl">
                        {{ lang.AlarmRecord_FaultAddAndModify_Type }}
                        <!-- <input type="text" v-model="changedata.OriginalAlarmType" disabled /> -->
                        <input
                            type="text"
                            v-model="changedata.AlarmType"
                            disabled
                        />
                    </div>
                    <div class="fr">
                        {{ lang.AlarmRecord_FaultAddAndModify_Recoverytime }}
                        <input
                            type="text"
                            v-model="changedata.RecoverTime"
                            disabled
                        />
                    </div>
                </div>
                <div class="second">
                    <div class="fl">
                        {{ lang.AlarmRecord_FaultAddAndModify_User }}
                        <input
                            type="text"
                            v-model="changedata.OperatorName"
                            disabled
                        />
                    </div>
                    <div class="fr">
                        {{ lang.AlarmRecord_FaultAddAndModify_Processor }}
                        <input type="text" v-model="changedata.DealPerson" />
                    </div>
                </div>
                <div class="third">
                    {{ lang.AlarmRecord_FaultAddAndModify_KeyWord }}
                    <input type="text" v-model="changedata.KeyWord" />
                </div>
                <div class="third">
                    {{ lang.AlarmRecord_FaultAddAndModify_Information }}
                    <!-- <input type="text" v-model="changedata.OriginalAlarmMsg" disabled /> -->
                    <input type="text" v-model="changedata.AlarmMsg" disabled />
                </div>
                <div class="third">
                    {{ lang.AlarmRecord_FaultAddAndModify_Cause }}
                    <input type="text" v-model="changedata.Reason" />
                </div>
                <div class="third">
                    {{ lang.AlarmRecord_FaultAddAndModify_Method }}
                    <input type="text" v-model="changedata.FaultTreatment" />
                </div>
                <div class="btn">
                    <div class="btn1" @click="error2">
                        {{ lang.AlarmRecord_FaultAddAndModify_Cancel }}
                    </div>

                    <div class="btn2" @click="btn">
                        {{ lang.AlarmRecord_FaultAddAndModify_Confirm }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MySearch from '../public/search06.vue';
import MyTable from '../public/table2.vue';
import MyPage from '../public/Pages.vue';
import MyPage1 from '../public/Pages1.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        MyPage1
    },
    data() {
        return {
            deltrue: true,
            tipword: '',
            errortitle: '',
            tipchange: false,
            gth: require('../../assets/images/gth.png'),
            no: require(`../../assets/images/no.png`),
            no2: require(`../../assets/images/no2.png`),
            tableData: [],
            tip: 'noData',
            searchList: [
                {
                    title: '报警类型：',
                    model: 'argAlarmType',
                    type: 'select',
                    // 3-未确认未恢复 2-已确认未恢复 1-未确认已恢复 0-已确认已恢复
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '报警时间范围：',
                    model: 'argStartTime',
                    type: 'time'
                },
                {
                    title: '-',
                    model: 'argEndTime',
                    type: 'time'
                },
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {
                argAlarmArray: '',
                argDevice: '',
                argAlarmType: '',
                argStartTime: '',
                argEndTime: '',
                argKeyword: ''
            },
            tableHead: {
                AlarmTime: '报警时间',
                AlarmDevice: '报警设备',
                AlarmMsg: '报警内容',
                AlarmState: '报警状态',
                RecoverTime: '恢复时间',
                AlarmDuration: '报警时长',
                AlarmValue: '报警值',
                AlarmGroup: '报警组',
                AlarmType: '报警类别',
                AlarmLevel: '报警等级',
                OperatorName: '报警确认员',
                ConfirmTime: '确认时间',
                AlarmTagAddress: '报警地址',
                AlarmTagName: '报警变量名'
            },
            data: [],
            daochu: '',
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            pageData1: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            AlarmMsg: '',
            haschange: false,
            keyword: '',
            text: '',
            w1: false,
            error: false,
            error1: false,
            changedata: {},
            disabled: false,
            bbb: 1,
            ccc: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        };
    },
    mounted() {
        console.log(this.$refs.table);
    },
    created() {
        this.getLangData();
        let argStartTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        let argEndTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
        );
        Object.assign(this.searchData, {
            argStartTime,
            argEndTime
        });
        this.init();
        this.req(1);
        this.getAlarmType();
        this.getDevice();
    },
    methods: {
        getLangData() {
            this.searchList = [
                {
                    title: this.lang.AlarmRecord_Time_Type,
                    model: 'argAlarmType',
                    type: 'select',
                    // 3-未确认未恢复 2-已确认未恢复 1-未确认已恢复 0-已确认已恢复
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: this.lang.AlarmRecord_History_Time,
                    model: 'argStartTime',
                    type: 'time'
                },
                {
                    title: '-',
                    model: 'argEndTime',
                    type: 'time'
                },
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ];
        },
        error2() {
            this.bbb = 2;
            this.deltrue = false;
            setTimeout(() => {
                this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            this.w1 = true;
            this.w = this.lang.AlarmRecord_HT_FaultAddAndModify_DoYouRealyWantToSave;
        },
        getdata(a) {
            console.log(a);
            this.changedata = a;
            setTimeout(() => {
                this.error = true;
                this.move('errorsetion1', 'errortop');
            });
            this.disabled = true;
        },
        handleEdit1(a, b, c) {
            if (!c) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;

                this.tipword = '';
                this.w = this.lang.NoOperationAuthority;
                return;
            }
            console.log(c);
            this.$axios
                .post(
                    `/api/AlarmRecord/AlarmRecord_GetFaultStatus?argAlarmID=${b.ID}&argTableName=${b.TableName}`
                )
                .then(res => {
                    if (res.data.data == '2') {
                        setTimeout(() => {
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.w = this.lang.AlarmRecord_HT_IsUpdate;
                        this.tipword = '';
                        this.changedata = b;
                        this.w1 = true;
                        this.deltrue = false;
                        this.bbb = 1;
                        this.$axios
                            .post(
                                `/api/AlarmRecord/AlarmRecord_GetFault?argAlarmID=${b.ID}&argTableName=${b.TableName}`
                            )
                            .then(res => {
                                b.KeyWord = res.data.data[0].KeyWord;
                                b.Reason = res.data.data[0].Reason;
                                b.FaultTreatment =
                                    res.data.data[0].FaultTreatment;
                                b.DealPerson = res.data.data[0].DealPerson;
                            });
                    } else {
                        this.changedata = b;
                        setTimeout(() => {
                            this.error1 = true;
                            this.errortitle = this.lang.AlarmRecord_HT_FaultAddAndModify_FaultRepairRecordAdding;
                            this.move('errorsetion2', 'errortop');
                        });
                    }
                });
        },
        overdata() {},
        search() {
            this.getsestion();
        },
        cancel() {
            this.bbb = 2;
            this.haschange = false;
            this.keyword = '';
            this.AlarmMsg = '';
        },
        no1() {
            this.ccc = 1;
            this.bbb = 2;
            this.tipchange = false;
            this.error1 = false;
        },
        btn() {
            this.bbb = 2;
            this.changedata.AddTime = this.getNowTime();
            this.changedata.AddPerson = this.changedata.OperatorName;
            if (!this.changedata.DealPerson) {
                this.w = this.lang.AlarmRecord_HT_FaultAddAndModifyViewModel_PEHandler;
                this.w1 = true;
                this.tipword = '';
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.ccc = 2;
                this.deltrue = true;
            } else {
                console.log(this.changedata);
                this.$axios({
                    method: 'post',
                    url: `/api/AlarmRecord/AlarmRecord_SetFault`,
                    data: this.changedata
                })
                    .then(res => {
                        console.log(res);
                        if (res.data.msg == '请求成功') {
                            if (this.w == this.lang.AlarmRecord_HT_IsUpdate) {
                                this.w = this.lang.AlarmRecord_HT_FaultAddAndModify_UpdateSuccess;
                            } else {
                                this.w = this.lang.AlarmRecord_HT_FaultAddAndModify_SuccessfulEntry;
                            }

                            this.w1 = true;
                            this.tipword = '';
                            setTimeout(() => {
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.deltrue = true;
                            this.error1 = false;
                        } else {
                            this.w = res.data.msg;
                            this.w1 = true;
                            this.tipword = '';
                            setTimeout(() => {
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.deltrue = true;
                        }
                        console.log(this.pageData);
                        this.req(this.pageData.PageIndex);
                        // if (res.data.data) {
                        //     this.tipword = `${res.data.data}`;
                        //     this.deltrue = true;
                        // }
                    })
                    .catch(err => {});
            }
        },
        yes1() {
            // this.tipchange = false;
            // this.searchData.argOperatorName = JSON.parse(
            //     sessionStorage.getItem('userInfo')
            // ).SCMSUserAccount;
            this.ccc = 1;
            if (this.bbb == 1) {
                this.tipchange = false;
                setTimeout(() => {
                    this.error1 = true;
                    this.errortitle = this.lang.AlarmRecord_HT_FaultAddAndModify_FaultRepairRecordUpdate;
                    this.move('errorsetion2', 'errortop');
                });
            } else {
                this.btn();
            }
        },
        tip1() {
            if (
                this.w ==
                    this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect ||
                this.tipword ==
                    this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect ||
                this.tipword == this.lang.NoOperationAuthority ||
                this.w == this.lang.NoOperationAuthority
            ) {
                this.tipchange = false;
                this.searchData.argStartTime = this.$getDate(
                    new Date(new Date().toLocaleDateString()).getTime()
                );
                this.searchData.argEndTime = this.$getDate(
                    new Date(new Date().toLocaleDateString()).getTime() +
                        24 * 60 * 60 * 1000 -
                        1
                );
                return;
            }

            this.bbb = 2;
            this.tipchange = false;
            this.w1 = false;
            this.length = [];
            // this.alldata.GuidList = this.confirmdata;
            // this.alldata.OperatorName = JSON.parse(
            //     sessionStorage.getItem('userInfo')
            // ).SCMSUserAccount;
            // this.$axios({
            //     method: 'post',
            //     url:
            //         '/api/CustomAlarmRecord/CustomAlarmRecord_AlarmConfirmation',
            //     data: this.alldata
            // }).then(res => {
            //     this.req(1);
            // });
        },
        tip2() {
            this.bbb = 2;
            this.tipchange = false;
            this.w1 = false;
            this.length = [];
            if (this.ccc == 1) {
                this.error1 = false;
            }
            this.ccc = 2;
            if (
                this.w ==
                    this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect ||
                this.tipword ==
                    this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect ||
                this.tipword == this.lang.NoOperationAuthority ||
                this.w == this.lang.NoOperationAuthority
            ) {
                this.tipchange = false;
                this.searchData.argStartTime = this.$getDate(
                    new Date(new Date().toLocaleDateString()).getTime()
                );
                this.searchData.argEndTime = this.$getDate(
                    new Date(new Date().toLocaleDateString()).getTime() +
                        24 * 60 * 60 * 1000 -
                        1
                );
                return;
            }
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
        },
        mouseMoveHandleelse3(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao3.style.left = moveLeft;
            this.$refs.kongtiao3.style.top = moveTop;
        },
        mouseUpHandleelse3(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse4(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse4;
        },
        mouseMoveHandleelse4(event) {
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao4.style.left = moveLeft;
            this.$refs.kongtiao4.style.top = moveTop;
        },
        mouseUpHandleelse4(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 665 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = $(`.${name}`).width() / 2 + 'px';
            let top = $(`.${name}`).height() / 2 + 'px';
            console.log('left', left);
            console.log('top', top);
            console.log($(`.${name}`));
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
                console.log(e.target.className.toLocaleLowerCase());
                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center');
                    window.event.stopPropagation();
                    var x = 0;
                    var y = 0;
                    var l = 0;
                    var t = 0;
                    var isDown = false;
                    x = window.event.clientX;
                    y = window.event.clientY;
                    //获取左部和顶部的偏移量
                    l = $(`.${name}`)[0].offsetLeft;
                    t = $(`.${name}`)[0].offsetTop;
                    //开关打开
                    isDown = true;
                    var pdmove = false;

                    //设置样式
                    $('body')[0].style.cursor = 'move';

                    $('body')[0].addEventListener('mousemove', function(e) {
                        pdmove = true;
                        if (isDown == false) {
                            return;
                        }
                        //获取x和y
                        var nx = window.event.clientX;
                        var ny = window.event.clientY;

                        //计算移动后的左偏移量和顶部的偏移量
                        var nl = nx - (x - l);
                        var nt = ny - (y - t);
                        console.log(nx);
                        console.log(x);
                        console.log(l);
                        $(`.${name}`)[0].style.left = nl + 'px';
                        $(`.${name}`)[0].style.top = nt + 'px';
                    });
                    $('body')[0].addEventListener('mouseup', function(e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
        },
        handleEdit(a, b, c) {
            if (!c) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;

                this.tipword = '';
                this.w = this.lang.NoOperationAuthority;
                return;
            }
            setTimeout(() => {
                this.haschange = true;
                this.move('lookq', 'looktop');
            });
            this.AlarmMsg = b.AlarmMsg;
            this.getsestion();
        },
        gettime(val) {
            var date = new Date(
                parseInt(val.replace('/Date(', '').replace(')/', ''), 10)
            );
            let m = date.getMonth() + 1,
                mm = '-' + (m < 10 ? '0' + m : m);
            let d = date.getDate(),
                dd = '-' + (d < 10 ? '0' + d : d);
            let h = date.getHours(),
                hh = h < 10 ? '0' + h : h;
            let i = date.getMinutes(),
                ii = i < 10 ? '0' + i : i;
            let s = date.getSeconds(),
                ss = s < 10 ? '0' + s : s;
            return (
                date.getFullYear() + mm + dd + ' ' + hh + ':' + ii + ':' + ss
            );
        },
        GMTToStr(time) {
            let date = new Date(time);
            let m = date.getMonth() + 1,
                mm = '-' + (m < 10 ? '0' + m : m);
            let d = date.getDate(),
                dd = '-' + (d < 10 ? '0' + d : d);
            let h = date.getHours(),
                hh = h < 10 ? '0' + h : h;
            let i = date.getMinutes(),
                ii = i < 10 ? '0' + i : i;
            let s = date.getSeconds(),
                ss = s < 10 ? '0' + s : s;
            return (
                date.getFullYear() + mm + dd + ' ' + hh + ':' + ii + ':' + ss
            );
        },

        init() {
            // 自来水系统：仪表类型，仪表名称
            // 设备监控系统：车间，设备名称
            // 变配电系统：配电室，控制柜
            let data = '设备';
            this.$axios
                .post(`/api/Main/Main_GetProjectName`)
                .then(res => {
                    // if (res.data.code === 0) {
                    //     let data = res.data.data;
                    //     if (data === 'SCMS自来水监控系统') {
                    //         this.searchList[0].title = '仪表类型：';
                    //         this.searchList[1].title = '仪表名称：';
                    //         this.tableHead = {
                    //             Number: '序号',
                    //             AlarmGroup: '仪表类型',
                    //             AlarmDevice: '仪表名称',
                    //             AlarmTime: '报警时间',
                    //             AlarmTagName: '报警变量名',
                    //             AlarmTagAddress: '报警地址',
                    //             AlarmType: '报警类别',
                    //             AlarmMsg: '报警信息',
                    //             AlarmValue: '报警值',
                    //             AlarmLevel: '报警等级',
                    //             RecoverTime: '恢复时间',
                    //             AckTime: '确认时间',
                    //             OperatorName: '报警确认员',
                    //             AlarmState: '报警状态'
                    //         };
                    //     }
                    //     if (data === 'SCMS设备运行监控系统') {
                    //         this.searchList[0].title = '车间：';
                    //         this.searchList[1].title = '设备名称：';
                    //         this.tableHead = {
                    //             Number: '序号',
                    //             AlarmGroup: '车间',
                    //             AlarmDevice: '设备名称',
                    //             AlarmTime: '报警时间',
                    //             AlarmTagName: '报警变量名',
                    //             AlarmTagAddress: '报警地址',
                    //             AlarmType: '报警类别',
                    //             AlarmMsg: '报警信息',
                    //             AlarmValue: '报警值',
                    //             AlarmLevel: '报警等级',
                    //             RecoverTime: '恢复时间',
                    //             AckTime: '确认时间',
                    //             OperatorName: '报警确认员',
                    //             AlarmState: '报警状态'
                    //         };
                    //     }
                    //     if (data === 'SCMS变配电监控系统') {
                    //         this.searchList[0].title = '配电室：';
                    //         this.searchList[1].title = '控制柜：';
                    //         this.tableHead = {
                    //             Number: '序号',
                    //             AlarmGroup: '配电室',
                    //             AlarmDevice: '控制柜',
                    //             AlarmTime: '报警时间',
                    //             AlarmTagName: '报警变量名',
                    //             AlarmTagAddress: '报警地址',
                    //             AlarmType: '报警类别',
                    //             AlarmMsg: '报警信息',
                    //             AlarmValue: '报警值',
                    //             AlarmLevel: '报警等级',
                    //             RecoverTime: '恢复时间',
                    //             AckTime: '确认时间',
                    //             OperatorName: '报警确认员',
                    //             AlarmState: '报警状态'
                    //         };
                    //     }
                    // }
                })
                .catch(err => {});
        },
        change(e) {
            let data = this.deviceList[e];
            if (data.length > 0) {
                this.searchList[1].optionList = [];
                data.map(item => {
                    this.searchList[1].optionList.push({
                        value: item,
                        label: item
                    });
                });
            }
        },
        getNowTime() {
            let date = new Date();
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
        setParams(params, a) {
            if (!a) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;

                this.tipword = '';
                this.w = this.lang.NoOperationAuthority;
                return;
            }
            this.searchData = params;
            if (
                new Date(params.argStartTime).getTime() >
                new Date(params.argEndTime).getTime()
            ) {
                setTimeout(() => {
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;
                this.tipword = '';
                this.w = this.lang.AlarmRecord_HT_TheQueryDate;
            }
        },
        //获取故障检索信息
        getsestion() {
            console.log(
                `/api/AlarmRecord/AlarmRecord_GstFaultRetrieva?argKeyword=${this.keyword}&argPageSize=50&argPageIndex=1&argDescribe=${this.AlarmMsg}`
            );
            this.$axios
                .post(
                    `/api/AlarmRecord/AlarmRecord_GstFaultRetrieva?argKeyword=${this.keyword}&argPageSize=50&argPageIndex=1&argDescribe=${this.AlarmMsg}`
                )
                .then(res => {
                    console.log(res);
                    this.pageData1 = res.data.data.ParameterList;
                    this.tableData = res.data.data.DataList;
                });
        },
        // 获取仪表
        getDevice() {},
        // 获取报警类型
        getAlarmType() {
            this.$axios
                .post(`/api/AlarmRecord/AlarmRecord_GstAlarmType`)
                .then(res => {
                    if (res.data.code == 0) {
                        this.searchList[0].optionList = [];
                        let data = res.data.data;
                        data.map(item => {
                            this.searchList[0].optionList.push({
                                value: item.Value,
                                label: item.Text
                            });
                        });
                        this.searchList[0].optionList.unshift({
                            value: this.lang.AlarmRecord_HT_Unlimited,
                            label: this.lang.AlarmRecord_HT_Unlimited
                        });

                        this.searchData.argAlarmType = this.searchList[0].optionList[0].value;
                    }
                })
                .catch(err => {});
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            this.deltrue = true;
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    setTimeout(() => {
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.w = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    this.w1 = true;
                    this.tipword = '';
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.pageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.pageData.TotalPage
                        ) {
                            setTimeout(() => {
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.w = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            this.w1 = true;
                            this.tipword = '';
                            return;
                        }
                    }
                }
            }

            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
            this.$axios
                .post(
                    `/api/AlarmRecord/AlarmRecord_GstHistoryAlarmRecord?&argAlarmType=${encodeURIComponent(
                        params.argAlarmType
                    )}&argStartTime=${params.argStartTime}&argEndTime=${
                        params.argEndTime
                    }&argKeyword=${params.argKeyword}&argPageSize=${
                        params.argPageSize
                    }&argPageIndex=${params.argPageIndex}`
                )
                .then(res => {
                    console.log(res);
                    let i = 0;
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    } else {
                        this.w = res.data.msg;
                        this.w1 = true;
                        this.tipword = '';
                        setTimeout(() => {
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                    }
                })

                .catch(err => {});
        },
        req1(pageIndex, s) {
            this.deltrue = true;
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    setTimeout(() => {
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.w = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    this.w1 = true;
                    this.tipword = '';
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.pageData1.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.pageData1.TotalPage
                        ) {
                            setTimeout(() => {
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.w = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            this.w1 = true;
                            this.tipword = '';
                            return;
                        }
                    }
                }
            }

            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData1.PageSize
            });
            this.$axios
                .post(
                    `/api/AlarmRecord/AlarmRecord_GstFaultRetrieva?argKeyword=${this.keyword}&argPageSize=50&argPageIndex=${pageIndex}&argDescribe=${this.AlarmMsg}`
                )
                .then(res => {
                    this.pageData1 = res.data.data.ParameterList;
                    this.tableData = res.data.data.DataList;
                })

                .catch(err => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.look {
    z-index: 10999999;
    width: 1330px;
    top: 120px;
    position: fixed;
    height: 730px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 8px black;
    .lookhead {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: #386df0;
        position: relative;
        color: #ffffff;
        img {
            cursor: pointer;
            z-index: 12999999;
            width: 24px;
            height: 24px;
            position: absolute;
            right: 20px;
            bottom: 15px;
        }
    }
    .looktop {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
    }
    .lookcontent {
        padding: 30px 30px 0px 30px;
        .search {
            height: 50px;
            line-height: 45px;
            border: 1px solid #cccccc;
            padding-left: 20px;
            input {
                height: 30px;
                text-indent: 0.5em;

                border: none;
            }
            .inputname {
                margin: 0px 10px;
                width: 600px;
            }
            span {
                display: inline-block;
                background-color: #ffffff;
                text-align: center;
                line-height: 30px;
                border: 1px solid #6086e6;
                border-radius: 4px;
                width: 120px;
                height: 30px;
                cursor: pointer;
                position: relative;
                top: 3px;
                color: #6086e6;
            }
        }
    }
    .table {
        width: 100%;
        height: 530px;
        border: 1px solid #ccc;
        margin-top: 10px;
    }
}
.public-table {
    display: flex;
    flex-direction: column;
    height: 100%;
    .table-container {
        flex: 1;
        // overflow: auto;
    }
    .page-container {
        height: 60px;
    }
}
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 6999999;
    position: fixed;
    top: 0;
    left: 0;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 50999999;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .tiptop {
        width: 380px;
        height: 40px;
        background-color: #ffbc3d;
        img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
            margin-left: 160px;
        }
        span {
            color: #ffffff;
            position: relative;
            top: -5px;
            margin-left: 7px;
        }
    }
    .tipword {
        width: 100%;
        // padding: 30px;
        padding-bottom: 0;
    }
    .tipcontanin {
        height: calc(100% - 40px);
    }
    .w {
        width: 100%;
        height: 75%;
        // line-height:80px;
        /* margin-top: 20px; */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        position: absolute;
        bottom: 18px;
        width: 310px;
        line-height: 30px;
        text-align: center;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
        margin-left: 25px;
        height: 30px;
        .one {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 49999999;
    position: fixed;
    top: 0;
    left: 0;
}
.errorsetion {
    position: fixed;
    box-shadow: 0px 0px 8px black;
    width: 900px;
    height: 740px;
    background-color: #eeeeee;
    z-index: 30999999;
    top: 180px;
    left: 430px;
    .errortop {
        position: absolute;
        height: 50px;
        line-height: 50px;
        width: 100%;
        z-index: 31999999;
    }
    .errorhead {
        background-color: #386df0;
        height: 50px;
        line-height: 50px;
        width: 100%;
        text-align: center;
        color: #ffffff;
    }
    .no1 {
        width: 24px;
        height: 24px;
        z-index: 32999999;
        position: absolute;
        right: 20px;
        top: 10px;
    }
    .errorcontent {
        padding: 30px 70px 0px 70px;
    }
    .first {
        width: 220px;
        height: 40px;
        margin-bottom: 40px;
    }
    input {
        margin-top: 5px;
        width: 100%;
        height: 40px;
        background-color: #ffffff;
        line-height: 40px;
        text-indent: 1em;
        border: none;
        border: 1px solid #cccccc;
    }
    .second {
        margin-top: 10px;
        overflow: hidden;
        width: 500px;
        .fl {
            float: left;
            width: 220px;
        }
        .fr {
            float: right;
            width: 220px;
        }
    }
    .third {
        margin-top: 10px;
        width: 100%;
        input {
            margin-top: 5px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-indent: 1em;
            border: none;
            border: 1px solid #cccccc;
        }
    }
    .btn {
        margin-top: 20px;
        float: right;
        .btn1 {
            cursor: pointer;
            width: 100px;
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            background-color: #7e7e7e;
            border-radius: 5px;
            text-align: center;
            float: left;
            cursor: pointer;
            margin-right: 20px;
        }
        .btn2 {
            cursor: pointer;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
            background-color: #6086e6;
            width: 100px;

            color: #ffffff;
            height: 40px;
            line-height: 40px;
            float: left;
        }
    }
}
.cover4 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 29999999;
}

.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
.fcolor {
    color: #000 !important;
}
img {
    cursor: pointer;
}
</style>
