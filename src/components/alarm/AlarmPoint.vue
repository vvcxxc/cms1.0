<!--
 * @Description: 报警记录报警点管理界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:54:54
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
                @preservation="preservation"
            ></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" @changedata="changedata" ref="child"></my-table>
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
            </div>
        </div>
        <div class="cover2" v-if="tipchange"></div>
    </div>
</template>

<script>
import MySearch from '../public/search09.vue';
import MyTable from '../public/table04.vue';
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
                    model: 'argAlarmGroupId',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '报警名称：',
                    model: 'argAlarmDevice',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '报警类别：',
                    model: 'argAlarmType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {
                argAlarmGroupId: '',
                argAlarmDevice: '',
                argAlarmType: '',
                argKeyword: ''
            },
            tableHead: {
                // Number: '序号',
                Group: '车间',
                Device: '设备名称',
                Name: '变量名',
                Address: '变量地址',
                DataType: '数据类型',
                Desc: '变量描述',
                AlarmType: '报警类别'
            },
            data: [],
            changedata1: [],
            daochu: '',
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            enddata: '',
            haschange: 1,
            msg: 1,
            msg1: '',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    created() {
        this.init();
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
        this.getAlarmDevice();
        this.getAlarmType();
        this.req(1);
    },

    methods: {
        tip1() {
            this.tipchange = false;
            this.haschange = 1;
        },
        preservation() {
            if (this.haschange == 2) {
                this.$axios({
                    method: 'post',
                    url:
                        '/api/CustomAlarmRecord/CustomAlarmRecord_SaveAlarmPoint',
                    data: this.enddata
                }).then(res => {
                    this.$refs.child.zore();
                    this.req(this.pageData.PageIndex);
                    if (res.data.data.code !== '请求成功') {
                        this.msg1 = res.data.data.msg;
                        this.msg = 2;
                    } else {
                        this.msg = 1;
                    }
                    if (this.msg == 1) {
                        this.tipchange = true;
                        this.tipword = this.lang.AlarmRecord_HT_AlarmPointManageUC_SuccessfullySaved;
                    } else {
                        this.tipchange = true;
                        this.tipword = this.msg1;
                    }
                });
            }
        },
        changedata(data) {
            let i = 0;
            for (i in data) {
                data[i].AlarmID = data[i].ID;
                // data[i].Number = data[i].Number;
                // data[i].DataType = data[i].DataType;
                data[i].TagName = data[i].Name;
                // data[i].Condition = data[i].Condition;
                // data[i].Limit = data[i].Limit;
                // data[i].Text = data[i].Text;
                // data[i].Level = data[i].Level;
            }
            this.enddata = data;
            this.haschange = 2;
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
        exportTable() {
            this.$axios
                .post(
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstAlarmPoint?argAlarmDevice=${this.searchData.argAlarmDevice}&argAlarmGroupId=${this.searchData.argAlarmGroupId}&argAlarmType=${this.searchData.argAlarmType}&argEndTime=${this.searchData.argEndTime}&argKeyword=${this.searchData.argKeyword}&argPageIndex=1&argPageSize=${this.pageData.TotalCount}&argStartTime=${this.searchData.argStartTime}`
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
                        tHeader.push('条件', '限值', '报警文本', '报警级别');
                        const filterVal = [];
                        for (var key in this.tableHead) {
                            if (this.tableHead.hasOwnProperty(key)) {
                                filterVal.push(key);
                            }
                        }
                        filterVal.unshift('Number');
                        filterVal.push('Condition', 'Limit', 'Text', 'Level');
                        const list = this.daochu;
                        const data = this.formatJson(filterVal, list);
                           console.log(tHeader);
                        console.log(filterVal);
                        console.log(list);
                        export_json_to_excel(tHeader, data, '报警点');
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
                                Group: '报警组',
                                Device: '仪表名称',
                                Name: '变量名',
                                Address: '变量地址',
                                DataType: '数据类型',
                                Desc: '变量描述',
                                AlarmType: '报警类别'
                            };
                        }
                        if (data === 'SCMS设备运行监控系统') {
                            this.searchList[0].title = '车间：';
                            this.searchList[1].title = '设备名称：';
                            this.tableHead = {
                                // Number: '序号',
                                Group: '车间',
                                Device: '设备名称',
                                Name: '变量名',
                                Address: '变量地址',
                                DataType: '数据类型',
                                Desc: '变量描述',
                                AlarmType: '报警类别'
                            };
                        }
                        if (data === 'SCMS变配电监控系统') {
                            this.searchList[0].title = '配电室：';
                            this.searchList[1].title = '控制柜：';
                            this.tableHead = {
                                // Number: '序号',
                                Group: '配电室',
                                Device: '控制柜',
                                Name: '变量名',
                                Address: '变量地址',
                                DataType: '数据类型',
                                Desc: '变量描述',
                                AlarmType: '报警类别'
                            };
                        }
                    }
                })
                .catch(err => {});
        },
        change(e, item) {
            if (item.model == 'argAlarmGroupId') {
                this.searchData.argAlarmDevice = '全部';
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
        },
        // 获取仪表
        getAlarmDevice() {
            this.$axios
                .post(
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstAlarmGroupIDAndDevice`
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
                            this.deviceList[item.AlarmGroupID] = item.Devices;
                        });
                        let alarmGroup = [];

                        data.map(item => {
                            alarmGroup.push({
                                value: item.AlarmGroupID,
                                label: item.AlarmGroup
                            });
                        });
                        this.searchList[0].optionList = alarmGroup;
                        if (alarmGroup.length != 0) {
                            this.searchData.argAlarmGroupId =
                                alarmGroup[0].value;
                            this.searchData.argAlarmDevice =
                                res.data.data[0].Devices[0];
                            // this.searchData.argDevice = res.data.data[0].Devices[0];
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
                    `/api/CustomAlarmRecord/CustomAlarmRecord_GstAlarmPoint`,
                    null,
                    {
                        params
                    }
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
        // height: 640px;
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
        margin-top: 40px;
        text-align: center;
    }
    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }
    .tipdetermine {
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 20px;
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
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
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
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>
