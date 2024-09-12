<!--
 * @Description: 实时报警
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:59:40
 -->
<template>
    <div class="public-table">
        <div class="search-container">
            <my-search
                :searchList="searchList"
                :searchData="searchData"
                @setParams="setParams"
                @change="change"
                @confirm="confirm"
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
                <div class="w" v-if="w1">{{w}}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
                </div>
            </div>
        </div>
        <div class="cover2" v-if="tipchange"></div>
    </div>
</template>

<script>
import MySearch from '../public/plansearch.vue';
import MyTable from '../public/plantable.vue';
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
                    title: '本次开始时间：',
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
                AlarmTime: '计划名称',
                AlarmTagName: '检修周期',
                AlarmTagAddress: '本次开始时间',
                AlarmDevice: '本次结束时间',
                AlarmType: '是否启用',
                AlarmGroup: '下次开始时间',
                AlarmMsg: '下次结束时间',
                AlarmValue: '设备名称',
                AlarmLevel: '维修人员',
                AlarmLevel1: '计划内容',
                RecoverTime: '备注',
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
        this.req(1);
        this.time4 = this.getNowTime();
    },
    methods: {
        no1() {
            this.tipchange = false;
        },
        yes1() {
            this.tipchange = false;
            this.searchData.argOperatorName = JSON.parse(
                sessionStorage.getItem('userInfo')
            ).SCMSUserAccount;
            this.$axios({
                method: 'post',
                url: `/api/CustomAlarmRecord/CustomAlarmRecord_AllAlarmConfirmation?argAlarmArray=${this.searchData.argAlarmArray}&argDevice=${this.searchData.argDevice}&argAlarmType=${this.searchData.argAlarmType}&argStatus=${this.searchData.argStatus}&argStartTime=${this.searchData.argStartTime}&argEndTime=${this.searchData.argEndTime}&argKeyword&argOperatorName=${this.searchData.argOperatorName}`
            })
                .then(res => {
                    this.req(this.pageData.pageIndex);
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
        confirm() {
            this.enddata.AlarmConfirmList = [];
            let i = 0;
            for (i in this.length) {
                this.enddata.AlarmConfirmList.push(this.length[i].ID);
            }
            this.enddata.AlarmConfirmList.push(this.length);
            this.enddata.LoginUserName = 'SuperAdmin';
            this.enddata.NowTime = this.time4;
            this.$axios({
                method: 'post',
                url: `/api/AlarmRecord/AlarmRecord_SetAlarmConfirm`,
                data: this.enddata
            }).then(res => {
                this.tipchange = true;
                this.tipword = `共选中${this.enddata.AlarmConfirmList.length -
                    1}条记录，需要确认条数为${res.data.data},成功确认条数${
                    res.data.data
                }`;
                this.req(this.pageData.PageIndex);
            });
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
                .catch(err => {});
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
        setParams(params) {
            this.searchData = params;
            if (
                new Date(params.argStartTime).getTime() >
                new Date(params.argEndTime).getTime()
            ) {
                this.tipchange = true;
                this.w1 = true;
                this.w = this.lang.HMI_HT_LineChartWindowViewModel_TimeInfo;
            }
        },
        // 获取仪表
        getDevice() {
            this.$axios
                .post(
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstAlarmGroupAndDevice`
                )
                .then(res => {})
                .catch(err => {});
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
                    }
                })
                .catch(err => {});
        },
        req(pageIndex) {
            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
            let a = '';
            if (params.argStatus == this.lang.AlarmRecord_HT_Unlimited) {
                a = '';
            } else if (params.argStatus == this.lang.AlarmRecord_HT_UnconfirmedResumption) {
                a = 1;
            } else if (params.argStatus == this.lang.AlarmRecord_HT_ConfirmedNoRecovered) {
                a = 2;
            } else if (params.argStatus == this.lang.AlarmRecord_HT_UnconfirmedUnresumed) {
                a = 3;
            }
            this.$axios
                .post(
                    `/api/AlarmRecord/AlarmRecord_GstCurrentAlarmRecord?argStatus=${a}&argAlarmType=${params.argAlarmType}&argStartTime=${params.argStartTime}&argEndTime=${params.argEndTime}&argKeyword=${params.argKeyword}&argPageSize=${params.argPageSize}&argPageIndex=${params.argPageSize}`
                )
                .then(res => {
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
        padding-bottom: 0;
    }
    .w {
        width: 100%;
        margin-top: 20px;
        text-align: center;
    }
    .tipdetermine {
        color: #ea9328;
        width: 310px;
        cursor: pointer;
        line-height: 30px;
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
            display: inline-block;
            height: 30px;
            width: 160px;
            cursor: pointer;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
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
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
