<!--
 * @Description: 报警记录历史报警界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:57:43
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
            ></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" :tip="tip"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
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
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
import MySearch from '../public/search02.vue';
import MyTable from '../public/table07.vue';
import MyPage from '../public/Pages.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage
    },
    data() {
        return {
            tipchange1: false,
            tip: 'noData',
            w: '',
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
                    // 3-未确认未恢复 2-已确认未恢复 1-未确认已恢复 0-已确认已恢复
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
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
                argStartTime: '',
                argEndTime: '',
                argKeyword: ''
            },
            tableHead: {
                // Number: '序号',
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
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    created() {
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
        tip2() {
            this.tipchange1 = false;
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
        exportTable() {
            this.$axios
                .post(
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstHistoryAlarmRecord?argAlarmArray=${this.searchData.argAlarmArray}&argAlarmType=${this.searchData.argAlarmType}&argDevice=${this.searchData.argDevice}&argEndTime=${this.searchData.argEndTime}&argKeyword=${this.searchData.argKeyword}&argPageIndex=1&argPageSize=${this.pageData.TotalCount}&argStartTime=${this.searchData.argStartTime}`
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
                        console.log(tHeader);
                        const filterVal = [];
                        for (var key in this.tableHead) {
                            if (this.tableHead.hasOwnProperty(key)) {
                                filterVal.push(key);
                            }
                        }
                        filterVal.unshift('Number');
                        let a = 0;
                        for (a in filterVal) {
                            if(filterVal[a] == 'AlarmState'){
                               filterVal[a] = 'AlarmStateName' 
                            }
                        }
                        console.log(filterVal);
                        const list = this.daochu;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, this.lang.AlarmRecord_History);
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
                                // Number: '序号',
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
                                // Number: '序号',
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
                    this.searchList[1].optionList = res.data.data[0].Devices;
                    this.searchData.argAlarmArray = '全部';
                    this.searchData.argAlarmType = '不限';
                    this.searchData.argDevice = '全部';
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
                            this.searchData.argDevice =
                                res.data.data[0].Devices[0];
                        }
                    }
                })
                .catch(err => {});
        },
        // 获取报警类型
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
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstHistoryAlarmRecord`,
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
    flex-direction: column;
    height: 100%;
    .table-container {
        flex: 1;
        //   height: 590px;
        overflow: auto;
        // height: calc(100% - 120px);
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
