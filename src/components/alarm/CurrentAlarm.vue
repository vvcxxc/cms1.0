<!--
 * @Description: 报警记录实时报警界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-10-12 14:10:23
 -->
<template>
    <div class="public-table">
        <div class="search-container">
            <my-search
                :searchList="searchList"
                :searchData="searchData"
                @setParams="setParams"
                @change="change"
                @exportTable="exportTable"
                @confirm="confirm"
                @allconfirm="allconfirm"
            ></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" @func="getdata" @func1="getdata1"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>
        <div class="tip" ref="kongtiao2" v-if="tipchange">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse2($event)"
                @mouseup="mouseUpHandleelse2($event)"
            >
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword" v-if="deltrue">{{tipword}}</div>
                <div class="w" v-if="!deltrue">{{tipword}}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
                </div>
            </div>
        </div>
        <div class="tip" ref="kongtiao3" v-if="tipchange1">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse3($event)"
                @mouseup="mouseUpHandleelse3($event)"
            >
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{w}}</div>
                <div class="tipdetermine" @click="tip2">{{lang.MessageBox_Confrim}}</div>
            </div>
        </div>
        <div class="cover2" v-if="tipchange"></div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
import MySearch from '../public/Search.vue';
import MyTable from '../public/table06.vue';
import MyPage from '../public/Pages.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage
    },
    data() {
        return {
            deltrue: true,
            tipword: '',
            tipchange: false,
            // gth: require('../../assets/images/icon_gth.png'),
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '车间：',
                    model: 'argAlarmArray',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '设备名称：',
                    model: 'argDevice',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '报警类型：',
                    model: 'argAlarmType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },

                {
                    title: '报警状态：',
                    model: 'argStatus',
                    type: 'select',
                    optionList: [
                        {
                            value: '不限',
                            label: '不限'
                        },
                        {
                            value: '未确认已恢复',
                            label: '未确认已恢复'
                        },
                        {
                            value: '已确认未恢复',
                            label: '已确认未恢复'
                        },
                        {
                            value: '未确认未恢复',
                            label: '未确认未恢复'
                        }
                    ],
                    value: 'value',
                    label: 'label'
                },

                // {
                // 	title: '报警时间范围：',
                // 	model: 'value1',
                // 	type: 'datetimerange'
                // },
                {
                    title: '时间：',
                    model: 'argStartTime',
                    type: 'time'
                },
                {
                    title: '至',
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
                argStatus: '',
                argStartTime: '',
                argEndTime: '',
                argKeyword: '',
                argPageSize: 50,
                argPageIndex: 1
            },
            tableHead: {
                AlarmGroup: '车间',
                AlarmDevice: '设备名称',
                AlarmTime: '报警时间',
                AlarmTagName: '报警变量名',
                AlarmTagAddress: '报警地址',
                AlarmType: '报警类别',
                AlarmMsg: '报警信息',
                AlarmValue: '报警值',
                AlarmLevel: '报警等级',
                RecoverTime: '恢复时间',
                ConfirmTime: '确认时间',
                OperatorName: '报警确认员',
                AlarmState: '报警状态'
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
            deviceList: [],
            confirmdata: '',
            alldata: {},
            length: '',
            length1: '',
            length2: '',
            tipchange1: false,
            w: '',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    created() {
        this.init();
        this.getAlarmType();
        this.getDevice();
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
        this.req(this.pageData.PageIndex);
    },
    methods: {
        no1() {
            this.tipchange = false;
        },
        yes1() {
            this.tipchange = false;
            if (!JSON.parse(sessionStorage.getItem('userInfo'))) {
                this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo')
                ).SCMSUserAccount;
            } else {
                this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('userInfo')
                ).SCMSUserAccount;
            }
            this.$axios({
                method: 'post',
                url: `/api/CustomAlarmRecord/CustomAlarmRecord_AllAlarmConfirmation?argAlarmArray=${this.searchData.argAlarmArray}&argDevice=${this.searchData.argDevice}&argAlarmType=${this.searchData.argAlarmType}&argStatus=${this.searchData.argStatus}&argStartTime=${this.searchData.argStartTime}&argEndTime=${this.searchData.argEndTime}&argKeyword&argOperatorName=${this.searchData.argOperatorName}`
            })
                .then(res => {
                    // this.req(this.pageData.PageIndex);
                    if (res.data.data) {
                        this.tipword = `${res.data.data}`;
                        this.tipchange = true;
                        this.deltrue = true;
                    }
                })

                .catch(err => {});
        },
        tip1() {
            this.tipchange = false;
            this.alldata.GuidList = this.confirmdata;
            if (!JSON.parse(sessionStorage.getItem('userInfo'))) {
                this.alldata.OperatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo')
                ).SCMSUserName;
            } else {
                this.alldata.OperatorName = JSON.parse(
                    sessionStorage.getItem('userInfo')
                ).SCMSUserAccount;
            }
            this.$axios({
                method: 'post',
                url:
                    '/api/CustomAlarmRecord/CustomAlarmRecord_AlarmConfirmation',
                data: this.alldata
            }).then(res => {
               this.req(this.pageData.PageIndex);
            });
        },
        tip2() {
            this.tipchange1 = false;
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseMoveHandleelse3(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao3.style.left = moveLeft;
            this.$refs.kongtiao3.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseUpHandleelse3(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        allconfirm() {
            this.tipchange = true;
            this.deltrue = false;
            this.tipword = this.lang.AlarmRecord_HT_IsAllComfirm;
        },
        getdata(data, data1) {
            this.confirmdata = data;
            this.length = data1;
        },
        getdata1(data, data1) {
            this.confirmdata = data;
            this.length = data1;
        },
        confirm() {
            this.deltrue = true;
            this.tipchange = true;
            if (!this.length) {
                this.tipword = `共选中0条记录，需要确认条数为0，成功确认条数为0`;
            } else {
                this.length1 = [
                    ...this.length.filter(val => {
                        return (
                            val.AlarmStateName === '未确认未恢复' ||
                            val.AlarmStateName === '未确认已恢复'
                        );
                    })
                ];
                this.tipword = `共选中${this.length.length}条记录，需要确认条数为${this.length1.length}，成功确认条数为${this.length1.length}`;
                this.length = [];
            }
        },
        exportTable() {
            this.$axios
                .post(
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstCurrentAlarmRecord?argAlarmArray=${this.searchData.argAlarmArray}&argAlarmType=${this.searchData.argAlarmType}&argDevice=${this.searchData.argDevice}&argEndTime=${this.searchData.argEndTime}&argKeyword=${this.searchData.argKeyword}&argPageIndex=1&argPageSize=${this.pageData.TotalCount}&argStartTime=${this.searchData.argStartTime}&argStatus=${this.searchData.argStatus}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.daochu = res.data.data.DataList;
                    }
                })
                .then(() => {
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../vendor/Export2Excel');
                        const tHeader = [];
                        for (var i in this.tableHead) {
                            tHeader.push(this.tableHead[i]);
                        }
                        tHeader.unshift(this.lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber);
                        const filterVal = [];
                        for (var key in this.tableHead) {
                            if (this.tableHead.hasOwnProperty(key)) {
                                filterVal.push(key);
                            }
                        }
                        filterVal.unshift('Number');
                        let a = 0;
                        for (a in filterVal) {
                            if (filterVal[a] == 'AlarmState') {
                                filterVal[a] = 'AlarmStateName';
                            }
                        }
                        const list = this.daochu;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, this.lang.AlarmRecord_Time);
                    });
                })
                .catch(err => {});
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        init() {
            // 自来水系统：仪表类型，仪表名称
            // 设备监控系统：车间，设备名称
            // 变配电系统：配电室，控制柜
            let data = '设备';
            this.$axios
                .post(`/api/Main/Main_GetProjectName`)
                .then(res => {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        if (data === 'SCMS自来水监控系统') {
                            this.searchList[0].title = '报警组：';
                            this.searchList[1].title = '仪表名称：';
                            this.tableHead = {
                                AlarmGroup: '报警组',
                                AlarmDevice: '仪表名称',
                                AlarmTime: '报警时间',
                                AlarmTagName: '报警变量名',
                                AlarmTagAddress: '报警地址',
                                AlarmType: '报警类别',
                                AlarmMsg: '报警信息',
                                AlarmValue: '报警值',
                                AlarmLevel: '报警等级',
                                RecoverTime: '恢复时间',
                                ConfirmTime: '确认时间',
                                OperatorName: '报警确认员',
                                AlarmState: '报警状态'
                            };
                        }
                        if (data === 'SCMS设备运行监控系统') {
                            this.searchList[0].title = '车间：';
                            this.searchList[1].title = '设备名称：';
                            this.tableHead = {
                                AlarmGroup: '车间',
                                AlarmDevice: '设备名称',
                                AlarmTime: '报警时间',
                                AlarmTagName: '报警变量名',
                                AlarmTagAddress: '报警地址',
                                AlarmType: '报警类别',
                                AlarmMsg: '报警信息',
                                AlarmValue: '报警值',
                                AlarmLevel: '报警等级',
                                RecoverTime: '恢复时间',
                                ConfirmTime: '确认时间',
                                OperatorName: '报警确认员',
                                AlarmState: '报警状态'
                            };
                        }
                        if (data === 'SCMS变配电监控系统') {
                            this.searchList[0].title = '配电室：';
                            this.searchList[1].title = '控制柜：';
                            this.tableHead = {
                                AlarmGroup: '配电室',
                                AlarmDevice: '控制柜',
                                AlarmTime: '报警时间',
                                AlarmTagName: '报警变量名',
                                AlarmTagAddress: '报警地址',
                                AlarmType: '报警类别',
                                AlarmMsg: '报警信息',
                                AlarmValue: '报警值',
                                AlarmLevel: '报警等级',
                                RecoverTime: '恢复时间',
                                ConfirmTime: '确认时间',
                                OperatorName: '报警确认员',
                                AlarmState: '报警状态'
                            };
                        }
                    }
                })
                .catch(err => {});
        },
        change(e, item) {
            if (item.model == 'argAlarmArray') {
                this.searchData.argDevice = '全部';
            }
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
        setParams(params) {
            this.searchData = params;
            if (
                new Date(params.argStartTime).getTime() >
                new Date(params.argEndTime).getTime()
            ) {
                this.tipchange1 = true;
                this.w = this.lang.AlarmRecord_HT_TheQueryDate;
            }
        },
        // 获取仪表
        getDevice() {
            this.$axios
                .post(
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstAlarmGroupAndDevice`
                )
                .then(res => {
                    this.searchData.argAlarmArray = '全部';
                    this.searchData.argAlarmType = '不限';
                    this.searchData.argDevice = '全部';
                    this.searchList[1].optionList = res.data.data[0].Devices;
                    if (res.data.data[0].Devices.length > 0) {
                        this.searchList[1].optionList = [];
                        res.data.data[0].Devices.map(item => {
                            this.searchList[1].optionList.push({
                                value: item,
                                label: item
                            });
                        });
                    }
                    if (res.data.code == 0) {
                        this.searchList[0].optionList = [];
                        let data = res.data.data;
                        this.deviceList = {};
                        data.map(item => {
                            this.deviceList[item.AlarmGroup] = item.Devices;
                        });
                        let alarmGroup = [];
                        data.map(item => {
                            alarmGroup.push({
                                value: item.AlarmGroup,
                                label: item.AlarmGroup
                            });
                        });
                        this.searchList[0].optionList = alarmGroup;
                        if (alarmGroup.length != 0) {
                            this.searchData.argAlarmArray = alarmGroup[0].value;
                            this.searchData.argStatus = this.searchList[3].optionList[0].value;
                            this.searchData.argDevice =
                                res.data.data[0].Devices[0];
                        }
                    }
                })
                .catch(err => {});
        },
        // 获取报警类别
        getAlarmType() {
            this.$axios
                .post(`/api/CustomAlarmRecord/CustomAlarmRecord_GstAlarmType`)
                .then(res => {
                    if (res.data.code == 0) {
                        this.searchList[2].optionList = [];
                        let data = res.data.data;
                        data.map(item => {
                            this.searchList[2].optionList.push({
                                value: item,
                                label: item
                            });
                        });
                        this.searchData.argAlarmType = data[0];
                    }
                })
                .catch(err => {});
        },
        req(pageIndex) {
            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
             
            this.$axios
                .post(
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstCurrentAlarmRecord`,
                    null,
                    {
                        params
                    }
                )
                .then(res => {
                    console.log(res);
                 
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    }
                })
                .catch(err => {});
        }
    }
};
</script>

<style lang="scss" scoped>
.public-table {
    display: flex;
    height: 100%;
    flex-direction: column;

    .table-container {
        flex: 1;
        // height:clac(100%-160px);
        // height: 100%;
        overflow: auto;
    }
    .page-container {
        height: 60px;
    }
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30;
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
        padding: 30px;
        // text-align: center;
        padding-bottom: 0;
    }
    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }
    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        margin-top: 40px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
        margin-top: 40px;
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
.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
