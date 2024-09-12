<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                查看报警点明细
                <img
                    :src="require('../../assets/images/no.png')"
                    alt=""
                    @click="handleClick"
                    class="close"
                />
            </div>

            <div class="popContent">
                <div class="equip">
                    <div class="item">
                        报警组：{{
                            dataList.length ? dataList[0].AlarmGroup : ''
                        }}
                    </div>
                    <div class="item">报警类别：{{ selectItem.AlarmType }}</div>
                    <div class="item">
                        时间范围： {{ selectItem.StartTime }}至{{
                            selectItem.EndTime
                        }}
                    </div>
                </div>
                <CurrentTitle title="查看报警点明细" />

                <div class="add-btn" @click="exportFn">导出</div>
                <div class="table-container">
                    <el-table
                        ref="multipleTable"
                        :data="dataList"
                        stripe
                        height="100%"
                        tooltip-effect="dark"
                        border
                        highlight-current-row
                        :header-cell-style="{
                            background:
                                $store.state.color == 'grey'
                                    ? '#D9DBDE'
                                    : '#5a6c98',
                            color:
                                $store.state.color == 'grey' ? '#000' : '#fff',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            fontSize: 14 + 'px',
                            padding: '0'
                        }"
                    >
                        <template slot="empty">
                            <span>{{
                                lang.SCMSConsoleWebApiMySql_NoData
                            }}</span>
                        </template>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            type="index"
                            label="序号"
                            :width="80"
                        ></el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            label="报警设备"
                            prop="AlarmDevice"
                        >
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="AlarmMsg"
                            label="报警内容"
                        ></el-table-column>

                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="AlarmCount"
                            label="报警次数"
                            sortable
                        ></el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="AlarmDuration"
                            label="报警时长"
                            sortable
                        ></el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="AlarmGroup"
                            label="报警组"
                        ></el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="AlarmType"
                            label="报警类别"
                        ></el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="AlarmLevel"
                            label="报警等级"
                        ></el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="AlarmTagAddress"
                            label="报警地址"
                        ></el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="AlarmTagName"
                            label="报警变量名"
                        ></el-table-column>
                    </el-table>
                </div>
                <div class="pages-container">
                    <my-page :pageData="pageData" @req="req"></my-page>
                </div>
            </div>

            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    返回
                </el-button>
            </div>
        </div>

        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
import CurrentTitle from '../../components/public/currentTitle.vue';
import moment from 'moment';
import MyPage from '../../components/public/Pages.vue';

export default {
    props: ['title', 'selectItem'],
    components: {
        TipPop,
        CurrentTitle,
        MyPage
    },
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            isTipShow: false,
            tipText: '',
            noCancel: true,
            dataList: [],
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            }
        };
    },

    mounted() {
        this.lang = JSON.parse(localStorage.getItem('languages'))[
            localStorage.getItem('currentLang')
        ];
        this.req(1);
    },

    methods: {
        formatTime(LoadTime) {
            return moment(LoadTime).format('YYYY-MM-DD HH:mm:ss');
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
        exportFn() {
            this.$axios({
                method: 'get',
                url: `/api/AlarmStatistics/ExportAlarmInfoList?AlarmType=${this.selectItem.AlarmType}&DeviceName=${this.selectItem.DeviceName}&StartTime=${this.selectItem.StartTime}&EndTime=${this.selectItem.EndTime}`,
                responseType: 'blob'
            }).then(res => {
                if (res.status === 200) {
                    this.downloadFile(res.data, '报警点明细.xls');
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        req(pageIndex) {
            this.$axios
                .get(
                    `/api/AlarmStatistics/GetAlarmInfoList?AlarmType=${this.selectItem.AlarmType}&DeviceName=${this.selectItem.DeviceName}&argPageIndex=${pageIndex}&argPageSize=${this.pageData.PageSize}&StartTime=${this.selectItem.StartTime}&EndTime=${this.selectItem.EndTime}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.dataList = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
        },
        tipCallBack(str) {
            this.isTipShow = false;
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$emit('callback');
            } else {
                this.$emit('callback');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.zdeditPop {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;

    .myDialog {
        position: relative;
        width: 1100px;
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
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;
            .equip {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                .item {
                    margin-right: 60px;
                }
            }
            .add-btn {
                width: 100px;
                height: 34px;
                cursor: pointer;
                background-color: #386df0;
                color: #ffffff;
                border-radius: 3px;
                text-align: center;
                margin: 10px 0;
                line-height: 34px;
            }

            .table-container {
                width: 100%;
                height: 300px;
            }
            .pages-container {
                width: 100%;
                height: 60px;
                background-color: #ffffff;
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
    .table-img {
        height: 20px;
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
