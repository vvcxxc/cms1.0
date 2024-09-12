<template>
    <div class="page-contain">
        <div class="stationList">
            <button
                class="station-item"
                v-for="item in stationList"
                :key="item.WID"
                @click="changeStation(item)"
                :class="{ active: activeStation.WID === item.WID }"
            >
                {{ item.Name }}
            </button>
        </div>
        <div class="stationPage">
            <div class="rotation">
                <div class="title">{{ details.WorkSectionName }}</div>
                <div class="region">
                    <img
                        @click="preview"
                        class="large"
                        src="../../assets/images/screen_selected.png"
                        alt
                    />
                    <el-carousel
                        indicator-position="none"
                        arrow="never"
                        :autoplay="autoplay"
                        :interval="interval"
                        @change="changeImg"
                        ref="img"
                    >
                        <el-carousel-item v-for="item in imgArr" :key="item">
                            <el-image fit="fill" :src="item"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="control">
                    <button
                        class="btns"
                        @click="handleRotation"
                        :disabled="activeStation.Available"
                    >
                        轮播
                    </button>
                    <button
                        class="btns btn1"
                        @click="handleStop"
                        :disabled="activeStation.Available"
                    >
                        暂停
                    </button>
                    <div class="pages">
                        共
                        <span>{{ imgArr.length }}</span>
                        页
                    </div>
                    <button
                        class="btns btn2"
                        @click="handlePrev('img')"
                        :disabled="activeStation.Available"
                    >
                        上一页
                    </button>
                    <button
                        class="btns btn2"
                        @click="handleNext('img')"
                        :disabled="activeStation.Available"
                    >
                        下一页
                    </button>
                </div>
            </div>
            <div class="msg">
                <div class="headPic">
                    <img :src="HeadshotURI" alt="" v-if="HeadshotURI" />
                </div>
                <div class="datas">
                    人员编号
                    <div class="datasInput">{{ details.UserNo }}</div>
                </div>
                <div class="datas">
                    姓名
                    <div class="datasInput">{{ details.UserName }}</div>
                </div>
                <div class="datas">
                    当前产量
                    <div class="datasInput">{{ details.CompletedCount }}</div>
                </div>
                <div class="datas">
                    产品型号
                    <div class="datasInput">{{ details.DrawingNo }}</div>
                </div>
                <div class="datas">
                    工时
                    <div class="datasInput">{{ details.WorkingHours }}</div>
                </div>
                <div class="datas">
                    班次
                    <div class="datasInput">{{ details.Shift }}</div>
                </div>
            </div>
        </div>
        <el-dialog
            :visible="dialogVisible"
            title="预览图片"
            width="98vw"
            :style="{ marginTop: '0' }"
            @close="() => (dialogVisible = false)"
            custom-class="review-box"
        >
            <div class="dialog-content">
                <div class="btn-content">
                    <button class="btnsDialog btn2" @click="handlePrev('img2')">
                        上一页
                    </button>
                    <button class="btnsDialog btn2" @click="handleNext('img2')">
                        下一页
                    </button>
                </div>
                <div class="carousel-content">
                    <el-carousel
                        indicator-position="none"
                        arrow="never"
                        :autoplay="false"
                        ref="img2"
                    >
                        <el-carousel-item v-for="item in imgArr" :key="item">
                            <div class="carousel-box">
                                <img :src="item" />
                            </div>

                            <!--图片展示原来的宽高，可以滚动 -->
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <template #footer> </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            stationList: [],
            activeStation: {},
            imgArr: [
                // require('../../assets/images/552cc14536532.png'),
                // require('../../assets/images/adaptive.png'),
                // require('../../assets/images/app.png'),
            ],
            HeadshotURI: '',
            details: {
                UserNo: '',
                UserName: '',
                WorkingHours: '',
                Shift: '', //班次
                DrawingNo: '',
                CompletedCount: '',
                WorkSectionName: ''
            },
            autoplay: true, // 是否自动轮播
            interval: 3000, // 自动切换的时间间隔
            inter: null,
            curimg: 0
        };
    },
    mounted() {
        this.getData();
        this.inter = setInterval(() => {
            this.getData();
        }, 5000);
    },
    beforeDestroy() {
        clearInterval(this.inter);
    },
    methods: {
        changeImg(curimg) {
            this.curimg = curimg;
        },
        preview() {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.img2.setActiveItem(this.curimg);
            });
            console.log(this.dialogVisible);
        },
        getData() {
            this.$axios
                .get('/api/WorkstationDashboard/GetWIDList')
                .then(res => {
                    let data = res.data;
                    this.stationList = [...data];
                    if (data.length > 0) {
                        this.activeStation =
                            this.activeStation === {} ||
                            !data.some(
                                item => item.WID === this.activeStation.WID
                            )
                                ? data[0]
                                : this.activeStation;
                        this.changeStation(this.activeStation);
                    } else {
                        this.details = {
                            UserNo: '',
                            UserName: '',
                            WorkingHours: '',
                            Shift: '', //班次
                            DrawingNo: '',
                            CompletedCount: '',
                            WorkSectionName: ''
                        };
                        this.imgArr = [];
                        this.activeStation = {};
                    }
                });
        },
        changeStation(item) {
            console.log(item);
            this.activeStation = item;
            this.$axios
                .get(
                    `/api/WorkstationDashboard/GetWorkstationDashboard?wid=${item.WID}`
                )
                .then(res => {
                    console.log(res);
                    let data = res.data;
                    if (typeof data === 'object') {
                        this.details = {
                            UserNo: data.UserNo,
                            UserName: data.UserName,
                            WorkingHours: data.WorkingHours,
                            Shift: data.Shift, //班次
                            DrawingNo: data.DrawingNo,
                            CompletedCount: data.CompletedCount,
                            WorkSectionName: data.WorkSectionName
                        };
                        let PimgList = [],
                            GimgList = [];
                        data &&
                            data.CarouselResourceConfigs &&
                            data.CarouselResourceConfigs.length &&
                            data.CarouselResourceConfigs.forEach(item => {
                                item.Type === 0
                                    ? GimgList.push(item.URI)
                                    : PimgList.push(item.URI);
                            });
                        this.imgArr = [...PimgList, ...GimgList];
                        this.HeadshotURI =
                            data.UserInfoConfig &&
                            data.UserInfoConfig.HeadshotURI;
                    } else {
                        this.details = {
                            UserNo: '',
                            UserName: '',
                            WorkingHours: '',
                            Shift: '', //班次
                            DrawingNo: '',
                            CompletedCount: '',
                            WorkSectionName: ''
                        };
                        this.imgArr = [];
                        this.HeadshotURI = '';
                    }
                });
        },
        // 轮播
        handleRotation() {
            this.autoplay = true;
        },

        // 暂停
        handleStop() {
            this.autoplay = false;
        },

        // 上一页
        handlePrev(img) {
            this.$refs[img].prev();
        },

        // 下一页
        handleNext(img) {
            this.$refs[img].next();
        }
    }
};
</script>

<style lang="scss" scoped>
.page-contain {
    height: calc(100% - 120px);
    margin-top: 100px;
    display: flex;
    width: 100%;

    .stationList {
        width: 200px;
        height: 100%;
        padding-top: 2px;
        padding-left: 5px;
        background: #e9eeef;
        overflow: auto;

        .station-item {
            display: block;
            width: 100%;
            text-align: left;
            border: 0;
            line-height: 50px;
            height: 50px;
            padding-left: 15px;
            color: #000;
            opacity: 0.5;
            border-left: 5px solid transparent;
            font-size: 16px;
            text-overflow: ellipsis;
            word-break: keep-all;
            white-space: nowrap;
            cursor: pointer;

            &.active {
                opacity: 1;
                border-left-color: #4270e4;
                color: #4270e4;
                background: #fff;
            }

            &:disabled {
                background: #dfe0e0;
                color: #999;
                cursor: not-allowed;
            }
        }
    }
}
.stationPage {
    flex: 1;
    background: url('../../assets/images/bg.png') 100% 100%;
    padding: 22px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .rotation {
        flex-grow: 5;
        height: 100%;
        margin-right: 44px;
        background: url('../../assets/images/content1.png');
        background-size: 100% 100%;
        padding: 44px 53px 100px 59px;
        position: relative;

        .title {
            position: absolute;
            top: 4px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 26px;
            font-weight: bold;
            color: #ffffff;
        }

        .region {
            width: 100%;
            height: 100%;
            position: relative;
            .large {
                width: 30px;
                height: 30px;
                position: absolute;
                right: 5px;
                top: 5px;
                cursor: pointer;
                z-index: 99;
            }

            ::v-deep .el-image {
                width: 100%;
                height: 100%;
            }
            ::v-deep .el-image__inner {
                object-fit: contain !important;
                width: 100%;
                height: 100%;
            }
            ::v-deep .el-carousel {
                height: 100%;
            }
            ::v-deep .el-carousel__container {
                height: 100%;
            }
        }

        .control {
            width: calc(100% - 112px);
            position: absolute;
            bottom: 13px;
            padding: 0 25px 0 19px;
            display: flex;
            justify-content: space-between;

            .pages {
                height: 43px;
                line-height: 43px;
                font-size: 24px;
                font-weight: 500;
                color: #333333;
                display: flex;
                align-items: center;

                span {
                    display: inline-block;
                    width: 64px;
                    height: 42px;
                    line-height: 42px;
                    text-align: center;
                    background: #ffffff;
                    border: 1px solid #bfbfbf;
                    margin: 0 16px;
                }
            }
        }
    }

    .msg {
        flex-grow: 1;
        height: 100%;
        background: url('../../assets/images/content2.png');
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .headPic {
            height: 215px;
            width: 215px;
            padding: 17px;
            background: url('../../assets/images/head.png');
            background-size: 100% 100%;
            margin-top: 55px;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .datas {
            margin-right: 5px;
            width: calc(100% - 130px);
            font-size: 20px;
            font-weight: 400;
            color: #377fc1;

            .datasInput {
                width: 100%;
                height: 46px;
                line-height: 46px;
                background: url('../../assets/images/text.png');
                background-size: 100% 100%;
                padding: 0 13px;
                font-size: 24px;
                color: #333333;
            }
        }

        .datas:last-child {
            margin-bottom: 90px;
        }
    }
}

.btns {
    width: 155px;
    height: 43px;
    line-height: 43px;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
    border: 0;
    background: url('../../assets/images/btn_green.png');
    background-size: 100% 100%;
    &:active {
        opacity: 0.8;
    }

    &:disabled {
        opacity: 1;
        cursor: not-allowed;
    }
}
.btnsDialog {
    margin-left: 10px;
    width: 100px;
    height: 40px;
    color: #ffffff;
    border: none;
    line-height: 43px;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
}
.btn1 {
    background: url('../../assets/images/btn_pause.png');
    background-size: 100% 100%;
}

.btn2 {
    background: url('../../assets/images/btn_before.png');
    background-size: 100% 100%;
}
.dialog-content {
    width: 100%;
    height: 85vh;
    .btn-content {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .carousel-content {
        width: 100%;
        height: calc(100% - 70px);

        ::v-deep .el-image {
            width: 100%;
            height: 100%;
        }
        ::v-deep .el-image__inner {
            object-fit: contain !important;
            width: 100%;
            height: 100%;
        }
        ::v-deep .el-carousel {
            height: 100%;
        }
        ::v-deep .el-carousel__container {
            height: 100%;
        }
    }
    .carousel-box {
        width: 100%;
        height: 100%;

        overflow: auto;

        img {
            display: block;
            margin: 0 auto;
        }
    }
}
</style>
<style lang="scss">
.review-box {
    margin-top: 2vh !important;
    .el-dialog__body {
        padding: 0 20px;
    }
}
</style>
