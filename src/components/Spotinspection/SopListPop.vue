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
                <div class="equip">
                    设备名称：{{
                        SopListPopItem ? SopListPopItem.DeviceName : ''
                    }}
                </div>
                <CurrentTitle title="上传文件" />
                <div class="tips">说明：支持格式为JPEG、PNG等图片格式</div>
                <el-upload
                    v-if="!hiddenBtn"
                    action="#"
                    accept=".png,.jpg,.jpeg,.pdf"
                    :show-file-list="false"
                    :http-request="uploadFn"
                >
                    <div class="add-btn">新增</div>
                </el-upload>
                <el-table
                    ref="multipleTable"
                    :data="dataList"
                    stripe
                    height="300px"
                    tooltip-effect="dark"
                    border
                    highlight-current-row
                    :header-cell-style="{
                        background:
                            $store.state.color == 'grey'
                                ? '#D9DBDE'
                                : '#5a6c98',
                        color: $store.state.color == 'grey' ? '#000' : '#fff',
                        'border-left': '1px solid #cccccc',
                        height: 50 + 'px',
                        fontSize: 14 + 'px',
                        padding: '0'
                    }"
                >
                    <template slot="empty">
                        <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
                    </template>
                    <el-table-column
                        type="index"
                        label="序号"
                        :width="80"
                    ></el-table-column>
                    <el-table-column
                        label="文件名称"
                        prop="FileName"
                        :show-overflow-tooltip="true"
                    >
                        <template slot-scope="scope">
                            <div
                                @click="openViewSop(scope.row)"
                                v-if="
                                    scope.row.FileName.endsWith('pdf') ||
                                        scope.row.FileName.endsWith('PDF')
                                "
                                :style="{
                                    color: '#4270e4'
                                }"
                            >
                                {{ scope.row.FileName }}
                            </div>
                            <img
                                v-else
                                @click="openViewSop(scope.row)"
                                class="table-img"
                                :src="imgSrc(scope.row.Id)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="UserName"
                        label="上传人"
                    ></el-table-column>
                    <el-table-column prop="LoadTime" label="上传时间"
                        ><template slot-scope="scope">
                            {{ formatTime(scope.row.LoadTime) }}
                        </template>
                    </el-table-column>
                </el-table>
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
        <ViewSop
            v-if="sopShow"
            :defaultSrc="defaultSrc"
            title="查看文件"
            :sopData="sopData"
            @callback="viewSopCallback"
        />
    </div>
</template>

<script>
import TipPop from '../public/tipPop.vue';
import CurrentTitle from '../public/currentTitle.vue';
import moment from 'moment';
import ViewSop from '../Vulnerableparts/ViewSop.vue';

export default {
    props: ['title', 'SopListPopType', 'SopListPopItem', 'hiddenBtn'],
    components: {
        TipPop,
        CurrentTitle,
        ViewSop
    },
    data() {
        return {
            sopData: [],
            sopPopTitle: '',
            sopShow: false,
            defaultSrc: '',
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            isTipShow: false,
            tipText: '',
            noCancel: true,
            dataList: []
        };
    },

    mounted() {
        this.lang = JSON.parse(localStorage.getItem('languages'))[
            localStorage.getItem('currentLang')
        ];
        console.log(this.SopListPopType, this.SopListPopItem);
        this.getList();
    },

    methods: {
        imgSrc(_id) {
            const apiHref = window.location.host.includes('localhost')
                ? '192.168.2.73:8802'
                : window.location.host;
            let str = `http://${apiHref}/api/PointInspectionManage/PointInspectionManage_GetByStandardDeviceFileId?standardDeviceFileId=${_id}`;
            str = str.replace(/\\/g, '\\\\');
            return str;
        },
        openViewSop(item) {
            this.defaultSrc = this.imgSrc(item.Id);
            this.sopData = [this.defaultSrc];
            this.sopShow = true;
        },
        viewSopCallback() {
            this.sopShow = false;
        },
        formatTime(LoadTime) {
            return moment(LoadTime).format('YYYY-MM-DD HH:mm:ss');
        },
        uploadFn(file) {
            if (file.file.size / 1024 / 1024 > 10) {
                console.log(file.file.size);
                this.isTipShow = true;
                this.tipText = `文件超出10M，请重新选择`;
                return;
            }
            let userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserAccount;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserAccount;
            }
            let formData = new FormData();
            console.log('file', file);
            formData.append('file', file.file);
            this.$axios({
                method: 'post',
                url: `/api/PointInspectionManage/PointInspectionManage_AddDeviceFile?StandardDeviceId=${this
                    .SopListPopItem.StandardDeviceId ||
                    this.SopListPopItem.AID}`,
                data: formData
            }).then(res => {
                if (res.data.code == 0) {
                    this.getList();
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        getList() {
            this.$axios({
                method: 'get',
                url: `/api/PointInspectionManage/PointInspectionManage_GetFiles?argStandardDeviceId=${this
                    .SopListPopItem.StandardDeviceId ||
                    this.SopListPopItem.AID}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data || [];
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
        width: 800px;
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
            height: 450px;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;
            .equip {
                margin-bottom: 10px;
            }
            .tips {
                color: #989898;
                font-size: 14px;
                margin: 10px 0;
            }
            .add-btn {
                width: 100px;
                height: 34px;
                cursor: pointer;
                background-color: #386df0;
                color: #ffffff;
                border-radius: 3px;
                text-align: center;
                margin-bottom: 5px;
                line-height: 34px;
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
