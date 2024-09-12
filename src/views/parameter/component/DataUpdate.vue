<template>
    <div class="EditWorkStepsPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader">
                数据修改
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">

                <div class="table-content">
                    <div class="search-content">
                        <span>工序</span>
                        <el-select style="margin-left:5px;width:170px" placeholder="请选择" @change="getWorkSteps(false)"
                            v-model="process">
                            <el-option v-for="item in processList" :key="item.WID" :label="item.WorkName" :value="item.WID">
                            </el-option>
                        </el-select>
                        <span>工位</span>
                        <el-select style="margin-left:5px;width:170px" placeholder="请选择" v-model="workSteps">
                            <el-option v-for="item in workStepsList" :key="item.SID" :label="item.StepName"
                                :value="item.SID">
                            </el-option>
                        </el-select>
                        <span>产品ID</span>
                        <el-input style="margin-left:5px;width:170px" placeholder="请输入" v-model="keyword" />
                        <div class="query" @click="getConfig">查询</div>
                    </div>
                    <div class="table">

                        <table cellspacing="0" cellpadding="1">
                            <thead>
                                <tr>
                                    <th colspan="1" rowspan="1" class="blue-th no1">序号</th>
                                    <th colspan="1" rowspan="1" class="blue-th no2">产品ID</th>
                                    <th colspan="1" rowspan="1" class="blue-th no2">托盘码</th>
                                    <th colspan="1" rowspan="1" class="blue-th no3">产品型号</th>
                                    <th colspan="1" rowspan="1" class="blue-th no3">工单号</th>
                                    <th colspan="1" rowspan="1" class="blue-th no4">是否合格</th>
                                    <th colspan="1" rowspan="1" class="blue-th no5">不合格原因</th>
                                    <th colspan="1" rowspan="1" class="blue-th no5">上线时间</th>
                                    <th colspan="1" rowspan="1" class="blue-th no5">完工时间</th>
                                    <th colspan="1" rowspan="1" v-for="(item, idx)  in configList"
                                        :key="item.PID + idx + 'P1'">
                                        {{ item.ProjectName }}</th>
                                </tr>

                                <tr>
                                    <th colspan="1" rowspan="1" class="blue-th no1">//</th>
                                    <th colspan="1" rowspan="1" class="blue-th no2">//</th>
                                    <th colspan="1" rowspan="1" class="blue-th no2">//</th>
                                    <th colspan="1" rowspan="1" class="blue-th no3">//</th>
                                    <th colspan="1" rowspan="1" class="blue-th no3">//</th>
                                    <th colspan="1" rowspan="1" class="blue-th no4">//</th>
                                    <th colspan="1" rowspan="1" class="blue-th no5">//</th>
                                    <th colspan="1" rowspan="1" class="blue-th no5">//</th>
                                    <th colspan="1" rowspan="1" class="blue-th no5">//</th>
                                    <th colspan="1" rowspan="1" v-for="(item, idx)  in configList"
                                        :key="item.PID + idx + 'P2'">
                                        {{ item.Unit }}
                                    </th>
                                <tr>
                                </tr>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, _idx) in dataList" :key="item.Number + 'data'">
                                    <td class="no1">{{ Number(_idx) + 1 }}</td>
                                    <td class="no2">{{ item.ProductID }}</td>
                                    <td class="no2">{{ item.PalletID }}</td>
                                    <td class="no3">{{ item.ProductTypeCode }}</td>
                                    <td class="no3">{{ item.OrderNumber }}</td>
                                    <td class="no4">
                                        <el-select placeholder="请选择" v-model="item.IsQualified">
                                            <el-option label="OK" :value="true"> </el-option>
                                            <el-option label="NG" :value="false"> </el-option>
                                        </el-select>
                                    </td>
                                    <td class="no5"> <el-input v-model="item.Reason" /> </td>
                                    <td class="no5"> <el-input v-model="item.GetInTime" /> </td>
                                    <td class="no5"> <el-input v-model="item.RecordTime" /> </td>
                                    <td colspan="1" rowspan="1" v-for="(item, idx)  in item.ProjectDatas"
                                        :key="item.PID + idx + 'P3'">
                                        <el-input v-model="item.Value" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>



                    </div>



                </div>

                <div class="new-tray" v-if="dataList.length && dataList[0].IsQualified">
                    <span>新托盘码</span>
                    <el-input style="margin-left:5px;width:170px" placeholder="请输入" v-model="newTray" />
                </div>

            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>

                <el-button class="btn" @click="handleClick('yes')"
                    style="background: rgba(56, 109, 240);border: 1px solid #386df0;">
                    保存
                </el-button>
            </div>
        </div>
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />

    </div>
</template>

<script>
import TipPop from '../../../components/public/tipPop.vue';

export default {
    props: ['title', 'selectItem', 'WID'],
    components: {
        TipPop,

    },
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),
            processList: [],
            process: '',
            workStepsList: [],
            workSteps: '',
            keyword: '',
            dataList: [],
            configList: [],
            userName: '',
            newTray:''
        };
    },

    mounted() {
        let _name = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            _name = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserName;
        } else {
            _name = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserName;
        }
        this.userName = _name;
        this.getProcess(true)
    },

    methods: {
        getProcess(isFirst) {
            this.$axios({
                url: `/api/ProcessParameterConfigure/QueryWorkSections`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.processList = res.data.data
                    if (this.processList && this.processList.length) {
                        this.process = this.processList[0].WID
                    } else {
                        this.process = '';
                    }
                    this.getWorkSteps(isFirst)
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        getWorkSteps(isFirst) {
            this.$axios({
                url: `/api/ProcessParameterConfigure/QueryWorkSteps/${this.process}`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.workStepsList = res.data.data
                    if (this.workStepsList && this.workStepsList.length) {
                        this.workSteps = this.workStepsList[0].SID
                    } else {
                        this.workSteps = '';
                    }
                    if (isFirst) {
                        this.getConfig()
                    }
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        getConfig() {
            this.$axios({
                url: `/api/ProcessParameterReport/QueryDataModificationConfig?SID=${this.workSteps}`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.configList = res.data.data
                    this.getdata();
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        getdata() {
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterReport/QueryReportData`,
                data: {
                    StartTime: this.getDate(),
                    EndTime: this.getDate(),
                    Code: this.keyword,
                    Accurate: '2',
                    WID: this.process,
                    ProductTypeCode: '',
                    QualitiedType: '',
                    WorkType: '',
                    QueryKeyType: "产品ID",
                    SID: this.workSteps
                }
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.data.map(item => ({ ...item, SID: this.workSteps }))
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg
                }
            })
        },
        getDate() {
            var myDate = new Date();
            //获取当前年
            var year = myDate.getFullYear();
            //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month;
            //获取当前日
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date;
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h;
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m;
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s;
            // "2019-07-15 10:00:00"
            //获取当前时间
            var now =
                year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se;
            return now;
        },
        tipCallBack(str) {
            if (str == 'yes') {
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
        },

        handleClick(str) {
            if (str == 'yes') {
                if (!this.dataList.length) {
                    this.$emit('callback', 'no');
                    return
                }
                let _data = this.dataList[0]
                console.log("_data", _data)
                this.$axios({
                    method: 'post',
                    url: `/api/ProcessParameterReport/SaveParamData`,
                    data: {
                        SID: _data.SID,
                        IsQualified: _data.IsQualified,
                        Reason: _data.Reason,
                        Code: _data.ProductID,
                        LoginUserName: this.userName,
                        Params: _data.ProjectDatas.map(item => ({
                            PID: item.PID,
                            Value: item.Value
                        })),
                        PalletID:newTray
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$emit('callback', str, '保存成功！');
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg
                    }
                })
            } else {
                this.$emit('callback', str);
            }
        },

    }
};
</script>

<style lang="scss" scoped>
.EditWorkStepsPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 1400px;
        height: auto;
        top: 50%;
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

            img {
                width: 60px;
                height: 60px;
                position: absolute;
                top: 0px;
                right: 0px;
                cursor: pointer;
            }
        }

        .popContent {
            width: 100%;
            height: auto;
            overflow-y: auto;
            padding: 10px 20px;

            .table-content {
                width: 100%;
                height: 300px;
                border: 1px solid #999999;
                background: #f4f4f4;

                .search-content {
                    display: flex;
                    align-items: center;
                    height: 50px;

                    span {
                        margin: 0 5px;
                    }

                    .query {
                        display: inline-block;
                        height: 40px;
                        width: 118px;
                        text-align: center;
                        line-height: 40px;
                        color: #ffffff;
                        border-radius: 5px;
                        font-weight: 600;
                        cursor: pointer;
                        background-color: #4270e4;
                        margin-left: 10px;
                    }

                }



                .table {
                    width: 100%;
                    height: calc(100% - 70px);
                    margin-top: 10px;
                    overflow: auto;

                    table {
                        height: 100%;
                        table-layout: fixed;
                        width: 100%;
                        display: block;
                    }

                    table thead tr th {
                        background-color: #7ABD7A;
                        color: #fff;
                        position: sticky;
                        top: 0;
                    }

                    table thead tr:nth-child(2) th {
                        top: 30px;
                    }

                    table thead tr:nth-child(3) th {
                        top: 60px;
                    }

                    table thead tr:nth-child(4) th {
                        top: 90px;
                    }

                    .blue-th {
                        background-color: #4270E4;
                    }

                    th,
                    td {
                        height: 30px;
                        min-width: 100px;
                        word-break: keep-all;
                        border: 1px solid #E2E2E2;
                        box-sizing: border-box;
                        text-align: center;
                        background-color: #fff;
                    }

                    th {
                        border: 1px solid #fff;
                    }

                    .no1 {
                        min-width: 80px;
                    }

                    .no2 {
                        min-width: 110px;
                    }

                    .no3 {
                        min-width: 207px;
                    }

                    .no4 {
                        min-width: 123px;
                    }

                    .no5 {
                        min-width: 190px;
                        max-width: 860px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .no6 {
                        min-width: 160px;
                    }

                    .hover-border:hover {
                        border: 1px solid #326CF3;
                        box-sizing: border-box;
                        cursor: pointer;
                    }

                    .blue-Border {
                        background-color: #F8AD3D;
                    }
                }
            }

            .new-tray {
                margin-top: 10px;
                display: flex;
                align-items: center;
                height: 50px;

                span {
                    margin: 0 5px;
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
                border: 1px solid #999999;
            }
        }
    }


}
</style>
<style lang="scss">
.EditWorkStepsPop .el-input.is-disabled .el-input__inner {
    color: #606266;
}
</style>
