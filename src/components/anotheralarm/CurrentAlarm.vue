<!--
 * @Description: 报警记录实时报警界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:59:40
 -->
<template>
    <div class="public-table">
        <div class="loadcover" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)"
            v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container" :style="{ zoom }">
            <my-search :searchList="searchList" :searchData="searchData" @setParams="setParams" @change="change"
                @confirm="confirm" @allconfirm="allconfirm" @exportFn="exportFn" ref="time"></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" @func="getdata" @func1="getdata1"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>
        <div class="tip" v-show="tipchange" :style="{ zoom }">
            <div class="tiphead" style="position:absolute;width: 380px;height: 40px;"></div>
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword" v-if="!w1">{{ tipword }}</div>
                <div class="w" v-if="w1">{{ w }}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{ lang.MessageBox_Confrim }}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{ lang.MessageBox_NO }}</div>
                    <div class="two" @click="yes1">{{ lang.MessageBox_YES }}</div>
                </div>
            </div>
        </div>
        <div class="cover2" v-if="tipchange" :style="{ zoom }"></div>
    </div>
</template>

<script>
import MySearch from '../public/search05.vue';
import MyTable from '../public/table.vue';
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
            w: '',
            tipchange: false,
            gth: require('../../assets/images/gth.png'),
            searchList: [
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
                            value: '未确认未恢复',
                            label: '未确认未恢复'
                        },
                        {
                            value: '已确认未恢复',
                            label: '已确认未恢复'
                        },
                        {
                            value: '未确认已恢复',
                            label: '未确认已恢复'
                        },

                    ],
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
                // {
                // 	title: '报警时间范围：',
                // 	model: 'value1',
                // 	type: 'datetimerange'
                // },
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
                argStatus: '',
                argStartTime: '',
                argEndTime: '',
                argKeyword: '',
                argPageSize: 50,
                argPageIndex: 1
            },
            tableHead: {
                AlarmTime: '报警时间',
                AlarmTagName: '报警变量名',
                AlarmTagAddress: '报警地址',
                AlarmDevice: '报警设备',
                AlarmType: '报警类别',
                AlarmGroup: '报警组',
                AlarmMsg: '报警信息',
                AlarmValue: '报警值',
                AlarmLevel: '报警等级',
                RecoverTime: '恢复时间',
                ConfirmTime: '确认时间',
                OperatorName: '报警确认员',
                AlarmStateName: '报警状态'
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
            length: [],
            enddata: {},
            time4: '',
            w1: false,
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    created() {

        this.getLangData()
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
        this.time4 = this.getNowTime();
    },
    mounted() {
        this.zoom = window.screen.width / 1920 < 0.71 ? 0.71 : window.screen.width / 1920
    },
    methods: {
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = ($(`.${name}`).width()) / 2 + 'px'
            let top = ($(`.${name}`).height()) / 2 + 'px'
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function (e) {

                console.log(e.target.className.toLocaleLowerCase());
                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center')
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

                    $('body')[0].addEventListener('mousemove', function (e) {
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
                        console.log(nx)
                        console.log(x)
                        console.log(l)
                        $(`.${name}`)[0].style.left = nl + 'px';
                        $(`.${name}`)[0].style.top = nt + 'px';
                    });
                    $('body')[0].addEventListener('mouseup', function (e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
        },
        getLangData() {
            this.searchList = [
                {
                    title: this.lang.AlarmRecord_Time_State,
                    model: 'argStatus',
                    type: 'select',
                    optionList: [
                        {
                            value: this.lang.AlarmRecord_HT_Unlimited,
                            label: this.lang.AlarmRecord_HT_Unlimited
                        },
                        {
                            value: this.lang.AlarmRecord_HT_UnconfirmedUnresumed,
                            label: this.lang.AlarmRecord_HT_UnconfirmedUnresumed
                        },
                        {
                            value: this.lang.AlarmRecord_HT_ConfirmedNoRecovered,
                            label: this.lang.AlarmRecord_HT_ConfirmedNoRecovered
                        },
                        {
                            value: this.lang.AlarmRecord_HT_UnconfirmedResumption,
                            label: this.lang.AlarmRecord_HT_UnconfirmedResumption
                        },

                    ],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: this.lang.AlarmRecord_Time_Type,
                    model: 'argAlarmType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                // {
                // 	title: '报警时间范围：',
                // 	model: 'value1',
                // 	type: 'datetimerange'
                // },
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
            ]
            this.tableHead = {
                AlarmTime: this.lang.AlarmRecord_Time_DataGrid_Time,
                AlarmTagName: this.lang.AlarmRecord_Time_DataGrid_VariableName,
                AlarmTagAddress: this.lang.AlarmRecord_Time_DataGrid_Address,
                AlarmDevice: this.lang.AlarmRecord_Time_DataGrid_Equipment,
                AlarmType: this.lang.AlarmRecord_Time_DataGrid_Type,
                AlarmGroup: this.lang.AlarmRecord_Time_DataGrid_Group,
                AlarmMsg: this.lang.AlarmRecord_Time_DataGrid_Information,
                AlarmValue: this.lang.AlarmRecord_Time_DataGrid_Value,
                AlarmLevel: this.lang.AlarmRecord_Time_DataGrid_Grade,
                RecoverTime: this.lang.AlarmRecord_Time_DataGrid_RecoveryTime,
                ConfirmTime: this.lang.AlarmRecord_Time_DataGrid_ConfirmationTime,
                OperatorName: this.lang.AlarmRecord_Time_DataGrid_ConfirmationPerson,
                AlarmStateName: this.lang.AlarmRecord_Time_DataGrid_State,
            }
        },
        powerBtn() {
            this.jurisdiction = this.$store.state.btnPowerData
            console.log('按钮无权限', this.$store.state.btnPowerData)
        },
        allconfirm(a) {
            console.log(a)
            if (!a) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;
                this.tipword = ''
                // this.w = this.lang.NoOperationAuthority;
                this.w = this.lang.NoOperationAuthority
                return
            }
            setTimeout(() => {
                $('.tip').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.tip').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.tip').height() / 2) *
                        this.a11}px)`
                });
                this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            this.deltrue = false;
            this.w1 = true;
            this.tipword = ''
            this.w = this.lang.AlarmRecord_HT_IsAllComfirm;
        },
        exportFn(a) {
            if (!a) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;
                this.tipword = ''
                this.w = this.lang.NoOperationAuthority
                return
            }
            let _status = 0
            if (this.searchData.argStatus == this.lang.AlarmRecord_HT_UnconfirmedUnresumed) {
                _status = 3;
            } else if (this.searchData.argStatus == this.lang.AlarmRecord_HT_ConfirmedNoRecovered) {
                _status = 2;
            } else if (this.searchData.argStatus == this.lang.AlarmRecord_HT_UnconfirmedResumption) {
                _status = 1;
            }
            this.$axios({
                method: 'post',
                url: `/api/AlarmRecord/ExportCurrent`,
                responseType: 'blob',
                data: {
                    StartTime: this.searchData.argStartTime,
                    EndTime: this.searchData.argEndTime,
                    Alarmstatus: _status,
                    Alarmtype: this.searchData.argAlarmType,
                    Keyword: this.searchData.argKeyword
                }
            }).then(res => {
                 this.downloadFile(res.data, '实时报警.xlsx')
            })
        },
        no1() {
            this.tipchange = false;
            this.deltrue = true;
            this.w1 = false;

        },
        yes1() {
            this.tipchange = false;
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserAccount;
            } else {
                this.searchData.OperatorName = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserAccount;
            }
            this.$axios({
                method: 'post',
                url: `/api/AlarmRecord/AlarmRecord_AllAlarmConfirmation?argAlarmType=${this.searchData.argAlarmType}&argStatus=${this.searchData.argStatus}&argStartTime=${this.searchData.argStartTime}&argEndTime=${this.searchData.argEndTime}&argKeyword&argOperatorName=${this.searchData.OperatorName}`
            }).then(res => {
                this.req(this.pageData.PageIndex);
                if (res.data.data) {
                    this.tipword = `${res.data.data}`;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.deltrue = true;
                    this.w1 = false;

                }
            })

                .catch(err => { });
        },

        tip1() {
            if (this.w == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect || this.tipword == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect || this.w == this.lang.NoOperationAuthority) {
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

            this.tipchange = false;
            this.w1 = false;
            this.length = [];
            this.req(1);

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
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
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
        confirm(a) {
            if (!a) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;
                this.tipword = ''
                // this.w = this.lang.NoOperationAuthority;
                this.w = this.lang.NoOperationAuthority
                return
            }
            // if(this.length.length !== 0){
            this.enddata.AlarmList = [];
            let i = 0;
            // for (i in this.length) {
            //     this.enddata.AlarmConfirmList.push(this.length[i].ID);
            // }
            this.enddata.AlarmList = this.length;
            console.log(this.length)
            if (!JSON.parse(sessionStorage.getItem('userInfo1')) || (JSON.parse(sessionStorage.getItem('userInfo1')) == null)) {
                this.enddata.OperatorName = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                this.enddata.OperatorName = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
            // this.enddata.AlarmList = this.enddata.AlarmConfirmList;

            this.$axios({
                method: 'post',
                url: `/api/AlarmRecord/AlarmRecord_SetAlarmConfirm`,
                data: this.enddata
            }).then(res => {
                console.log(res);
                console.log("ss", this.enddata)
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.tipword = res.data.data;
                this.w1 = false
                this.req(this.pageData.PageIndex);
            });
            /* } else {
                $('.tip').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.tip').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.tip').height() / 2) *
                        this.a11}px)`
                });
                this.tipchange = true;
                this.move('tip', 'tiphead');
                this.w1 = true;
                this.tipword = ''
                this.w = this.lang.AlarmRecord_HT_PCAlarmRecord;
            } */

        },
        getdata(data, data1) {
            this.confirmdata = data;
            this.length = data1;
        },
        getdata1(data, data1) {
            this.confirmdata = data;
            this.length = data1;
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
                    //             ConfirmTime: '确认时间',
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
                    //             ConfirmTime: '确认时间',
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
                    //             ConfirmTime: '确认时间',
                    //             OperatorName: '报警确认员',
                    //             AlarmState: '报警状态'
                    //         };
                    //     }
                    // }
                })
                .catch(err => { });
        },
        change(e, item) {
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
        setParams(params, a) {
            if (!a) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;
                this.tipword = ''
                this.w = this.lang.NoOperationAuthority;
                return
            }
            this.searchData = params;
            if (
                new Date(params.argStartTime).getTime() >
                new Date(params.argEndTime).getTime()
            ) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.w1 = true;
                this.tipword = ''
                this.w = this.lang.AlarmRecord_HT_TheQueryDate;
            }
        },
        // 获取仪表
        getDevice() {
            // this.$axios
            //     .post(
            //         `/api/CustomAlarmRecord/CustomAlarmRecord_GstAlarmGroupAndDevice`
            //     )
            //     .then(res => {})
            //     .catch(err => {});
        },
        // 获取报警类别
        getAlarmType() {
            this.$axios
                .post(`/api/AlarmRecord/AlarmRecord_GstAlarmType`)
                .then(res => {
                    if (res.data.code == 0) {
                        this.searchList[1].optionList = [];
                        let data = res.data.data;
                        data.map(item => {
                            this.searchList[1].optionList.push({
                                value: item.Value,
                                label: item.Text
                            });
                        });
                        this.searchList[1].optionList.unshift({
                            value: this.lang.AlarmRecord_HT_Unlimited,
                            label: this.lang.AlarmRecord_HT_Unlimited
                        });
                        this.searchData.argAlarmType = this.searchList[1].optionList[0].value;
                        this.searchData.argStatus = this.searchList[0].optionList[0].value;
                        this.req(1);
                        console.log(this.searchList)
                    }
                })
                .catch(err => { });
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.w = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    this.tipword = ''
                    this.w1 = true;
                    return;
                } else {
                    if (pageIndex !== 1 && pageIndex !== this.pageData.TotalPage) {
                        if (pageIndex < 1 || pageIndex > this.pageData.TotalPage) {
                            setTimeout(() => {
                                $('.tip').css({
                                    zoom: this.a11,
                                    left: `calc(50% - ${($('.tip').width() / 2) *
                                        this.a11}px)`,
                                    top: `calc(50% - ${($('.tip').height() / 2) *
                                        this.a11}px)`
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.w = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            this.w1 = true;
                            this.tipword = ''
                            return;
                        }
                    }

                }
            }

            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
            // let a = '';
            // if (params.argStatus == '不限') {
            //     a = '';
            // } else if (params.argStatus == '未确认已恢复') {
            //     a = 1;
            // } else if (params.argStatus == '已确认未恢复') {
            //     a = 2;
            // } else if (params.argStatus == '未确认未恢复') {
            //     a = 3;
            // }
            this.$axios
                .post(
                    `/api/AlarmRecord/AlarmRecord_GstCurrentAlarmRecord?argStatus=${params.argStatus}&argAlarmType=${encodeURIComponent(params.argAlarmType)}&argStartTime=${params.argStartTime}&argEndTime=${params.argEndTime}&argKeyword=${encodeURIComponent(params.argKeyword)}&argPageSize=${params.argPageSize}&argPageIndex=${params.argPageIndex}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    } else {
                        this.w = res.data.msg;
                        this.w1 = true;
                        this.tipword = ''
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${($('.tip').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.tip').height() / 2) *
                                    this.a11}px)`
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                    }
                })

                .catch(err => { });
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
        // overflow: auto;
    }

    .page-container {
        height: 60px;
    }
}

.tip {
    position: fixed;
    width: 380px;
    min-height: 200px;
    height: 200px;
    z-index: 30999999;
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

    .tipcontanin {
        height: calc(100% - 40px);
    }

    .tipword {
        width: 100%;
        height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        text-align: center;
    }

    .w {
        width: 100%;
        height: 100px;
        padding: 0 10px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tipdetermine {
        color: #ea9328;
        width: 310px;
        margin-bottom: 18px;
        // position: absolute;
        cursor: pointer;
        line-height: 30px;
        text-align: center;
        // bottom: 18px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        margin: 15px auto 18px;
        // position: absolute;
        // bottom: 20px;
        // left: 25px;
        height: 30px;

        .one {
            display: inline-block;
            height: 30px;
            width: 160px;
            cursor: pointer;
            line-height: 30px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }

        .two {
            line-height: 30px;
            display: inline-block;
            height: 30px;
            cursor: pointer;
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
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
