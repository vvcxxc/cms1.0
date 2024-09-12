<!--
 * @description: 报警统计页面
 * @since: 2019-11-08 15:00:48
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-11 10:13:58
 -->
<template>
    <div class="tapwater" v-loading="this.$store.state.isShow">
        <div class="bulletin-title">
            {{ formData.WorkName }}
            <div class="bulletin-time">{{ nowTime }}</div>
        </div>
        <div class="bulletin-box">
            <div class="info-box">
                <div class="info-top">
                    <div class="top-item">
                        <div class="item-l">工序名称</div>
                        <div class="item-r">{{ formData.WorkName }}</div>
                    </div>
                    <div class="top-item">
                        <div class="item-l">班组</div>
                        <div class="item-r">{{ formData.Shift }}</div>
                    </div>
                    <div class="top-item">
                        <div class="item-l">生产工单</div>
                        <div class="item-r">{{ formData.OrderNumber }}</div>
                    </div>
                    <div class="top-item">
                        <div class="item-l">产品型号<br />（机组）</div>
                        <div class="item-r">{{ formData.ProductModel }}</div>
                    </div>
                </div>
                <div class="info-mid">
                    <div class="mid-item">
                        <div class="mid-box">
                            <img
                                class="mid-icon"
                                src="../../assets/images/board7.png"
                            />
                            <div class="item-t">计划产量</div>
                            <div class="item-b">{{ formData.PlanNum }}</div>
                        </div>
                    </div>
                    <div class="mid-item">
                        <div class="mid-box">
                            <img
                                class="mid-icon"
                                src="../../assets/images/board8.png"
                            />
                            <div class="item-t">产量</div>
                            <div class="item-b">{{ formData.OutputNum }}</div>
                        </div>
                    </div>
                    <div class="mid-item">
                        <div class="mid-box">
                            <img
                                class="mid-icon"
                                src="../../assets/images/board9.png"
                            />
                            <div class="item-t">合格数</div>
                            <div class="item-b">{{ formData.OkNum }}</div>
                        </div>
                    </div>
                    <div class="mid-item">
                        <div class="mid-box">
                            <img
                                class="mid-icon"
                                src="../../assets/images/board10.png"
                            />
                            <div class="item-t">不合格数</div>
                            <div class="item-b">{{ formData.NgNum }}</div>
                        </div>
                    </div>
                    <div class="mid-item">
                        <div class="mid-box">
                            <img
                                class="mid-icon"
                                src="../../assets/images/board11.png"
                            />
                            <div class="item-t">合格率</div>
                            <div class="item-b">{{ formData.OkRate }}</div>
                        </div>
                    </div>
                    <div class="mid-item">
                        <div class="mid-box">
                            <img
                                class="mid-icon"
                                src="../../assets/images/board12.png"
                            />
                            <div class="item-t">当前节拍</div>
                            <div class="item-b red">{{ formData.Beat }}秒</div>
                        </div>
                    </div>
                </div>
                <div class="info-bottom">
                    <div class="bottom-item" @click="MaintenancePopShow = true">
                        <img src="../../assets/images/board4.png" />最新保养任务
                    </div>
                    <div class="bottom-item" @click="InspectionPopShow = true">
                        <img
                            src="../../assets/images/board5.png"
                        />最新点巡检任务
                    </div>
                </div>
            </div>
            <div class="file-box">
                <div class="file-area">
                    <div class="file-title">
                        <img
                            src="../../assets/images/board6.png"
                        />作业指导书-{{ sopName }}
                    </div>
                    <div
                        class="file-content"
                        v-if="formData.Sops && formData.Sops.length"
                    >
                        <el-carousel
                            ref="myCarousel"
                            :height="screenheight"
                            loop
                            :autoplay="false"
                            pause-on-hover
                            arrow="never"
                        >
                            <el-carousel-item
                                v-for="(item, idx) in formData.Sops"
                                :key="item.Id"
                            >
                                <img
                                    class="carousel-img"
                                    v-if="item.FilePath && item.FileType == 2"
                                    :src="item._filePath"
                                />
                                <video
                                    :class="`carousel-img carouselVideo${idx}`"
                                    v-else-if="
                                        item.FilePath && item.FileType == 3
                                    "
                                    :loop="false"
                                    :autoplay="true"
                                    muted
                                    @ended="videoEnd"
                                    :src="item._filePath"
                                    :preload="true"
                                    :controls="true"
                                ></video>
                                <iframe
                                    v-else-if="
                                        item.FilePath && item.FileType == 1
                                    "
                                    :src="item._filePath"
                                    frameborder="0"
                                    width="100%"
                                    height="100%"
                                ></iframe>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="file-content" v-else>
                        <div class="carousel-nodata">{{ _t('暂无数据') }}</div>
                    </div>
                </div>
            </div>
        </div>
        <TipsPop
            :tipText="tipText"
            :noCancel="noCancel"
            v-if="isPopShow"
            @tipCallBack="tipCallBack"
        ></TipsPop>
        <InspectionPop
            v-if="InspectionPopShow"
            @callback="InspectionPopCallback"
            :WorkName="formData.WorkName"
        />
        <MaintenancePop
            v-if="MaintenancePopShow"
            @callback="MaintenancePopCallback"
            :WorkName="formData.WorkName"
        />
    </div>
</template>
<script>
import TipsPop from '../../components/public/tipPop.vue';
import InspectionPop from './InspectionPop.vue';
import MaintenancePop from './MaintenancePop.vue';
export default {
    name: 'tapwater',
    components: {
        InspectionPop,
        MaintenancePop,
        TipsPop
    },
    data() {
        return {
            curCarouselIdx: 0,
            isPopShow: false,
            tipText: '',
            noCancel: true,
            nowTime: '',
            timeTimer: 0,
            reqTimer: 0,
            carouselTimer: 0,
            MaintenancePopShow: false,
            InspectionPopShow: false,
            formData: {
                WID: 0,
                WorkName: '',
                Shift: '',
                OrderNumber: '',
                ProductModel: '',
                PlanNum: '',
                OutputNum: '',
                OkNum: '',
                NgNum: '',
                OkRate: '',
                Beat: '',
                BeatNg: true,
                SopSwitchRate: 10000,
                screenheight: document.documentElement.clientHeight + 'px',
                Sops: [
                    // {
                    //     Id: 0,
                    //     FID: '00000000-0000-0000-0000-000000000000',
                    //     WID: 0,
                    //     FileName: '',
                    //     FilePath: '',
                    //     FileType: 0,
                    //     Sort: 0,
                    //     CreateTime: '',
                    //     CreateUser: ''
                    // }
                ]
            },
            sopName: ''
        };
    },
    mounted() {
        this.$axios({
            method: 'get',
            url: `/api/Board/Get`
        }).then(res => {
            if (res.data.code === 0) {
                this.formData = {
                    ...this.formData, //后端有可能整个data返回null
                    ...res.data.data,
                    SopSwitchRate: res.data.data.SopSwitchRate
                        ? res.data.data.SopSwitchRate * 1000
                        : 10000,
                    // SopSwitchRate: 5000,
                    Sops:
                        res.data.data.Sops && res.data.data.Sops.length
                            ? res.data.data.Sops.map(item => ({
                                  ...item,
                                  _filePath: `${window.location.origin}/api/FileManage/GetFile?filename=${item.FilePath}\\${item.FileName}`
                              }))
                            : []
                };
                this.curCarouselIdx = 0;
                if (
                    this.formData.Sops.length &&
                    this.formData.Sops[0].FilePath &&
                    this.formData.Sops[0].FileType != 3
                ) {
                    this.carouselTimer = setTimeout(() => {
                        this.switchSop();
                    }, this.formData.SopSwitchRate);
                }
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;
            }
            setTimeout(() => {
                this.getData();
            }, 5000);
        });
        clearInterval(this.timeTimer);
        this.timeTimer = setInterval(() => this.getNowTime(), 1000);
        let _h =
            document.getElementsByClassName('file-content')[0].clientHeight +
            'px';
        this.screenheight = _h;
        $(window).bind('resize', function() {
            let _h =
                document.getElementsByClassName('file-content')[0]
                    .clientHeight + 'px';
            this.screenheight = _h;
        });
    },
    destroyed() {
        clearTimeout(this.carouselTimer);
        clearInterval(this.timeTimer);
        clearTimeout(this.reqTimer);
    },
    beforeDestroy() {
        clearTimeout(this.carouselTimer);
        clearInterval(this.timeTimer);
        clearTimeout(this.reqTimer);
    },
    methods: {
        getData() {
            clearTimeout(this.reqTimer);
            this.$axios({
                method: 'get',
                url: `/api/Board/Get`
            })
                .then(res => {
                    if (res.data.code === 0 && this.formData) {
                        this.formData.WorkName = res.data.data.WorkName;
                        this.formData.Shift = res.data.data.Shift;
                        this.formData.OrderNumber = res.data.data.OrderNumber;
                        this.formData.ProductModel = res.data.data.ProductModel;
                        this.formData.PlanNum = res.data.data.PlanNum;
                        this.formData.OutputNum = res.data.data.OutputNum;
                        this.formData.OkNum = res.data.data.OkNum;
                        this.formData.NgNum = res.data.data.NgNum;
                        this.formData.OkRate = res.data.data.OkRate;
                        this.formData.Beat = res.data.data.Beat;
                    }
                    this.reqTimer = setTimeout(() => {
                        this.getData();
                    }, 5000);
                })
                .catch(() => {
                    this.reqTimer = setTimeout(() => {
                        this.getData();
                    }, 5000);
                });
        },
        videoEnd(e) {
            this.switchSop();
            console.log('videoEnd', e);
        },
        switchSop() {
            console.log('switchSop,SopSwitchRate', this.formData.SopSwitchRate);
            let idx = this.curCarouselIdx;
            clearTimeout(this.carouselTimer);
            let nextIdx = 0;
            if (this.formData.Sops[idx + 1]) {
                nextIdx = idx + 1;
            }
            let nextItem = this.formData.Sops[nextIdx];
            this.sopName = nextItem.FileName;
            this.$refs.myCarousel.setActiveItem(nextIdx);
            this.curCarouselIdx = nextIdx;

            console.log('FileTypeSop', nextItem.FileType, nextIdx);
            this.$nextTick(() => {
                if (nextItem.FilePath && nextItem.FileType != 3) {
                    console.log('111111111');
                    this.carouselTimer = setTimeout(() => {
                        console.log('22222');
                        this.switchSop();
                    }, this.formData.SopSwitchRate);
                } else {
                    document
                        .getElementsByClassName(`carouselVideo${nextIdx}`)[0]
                        .play();
                }
            });
        },
        getNowTime() {
            let _date = new Date();
            this.nowTime = `${_date.getFullYear()}年${_date.getMonth() +
                1}月${_date.getDate()}日 ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`;
        },

        tipCallBack(str) {
            this.noCancel = true;
            if (str == 'yes') {
            }
            this.isPopShow = false;
        },
        MaintenancePopCallback(str) {
            if (str) {
                this.tipText = str;
                this.isPopShow = true;
            }
            this.MaintenancePopShow = false;
        },
        InspectionPopCallback(str) {
            if (str) {
                this.tipText = str;
                this.isPopShow = true;
            }
            this.InspectionPopShow = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.tapwater {
    height: 100%;
    padding: 20px;
    width: 100%;
    background-color: #eeeeee;
    padding: 100px 0 40px;
    box-sizing: border-box;

    .bulletin-title {
        width: 100%;
        height: 70px;
        background-color: #ffffff;
        background-image: url('../../assets/images/board-title2.png');
        background-size: 100% 100%;
        background-position: bottom;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
        font-size: 36px;
        font-weight: bold;
        line-height: 1;
        position: relative;

        .bulletin-time {
            position: absolute;
            right: 10px;
            bottom: 5px;
            font-size: 16px;
        }
    }

    .bulletin-box {
        height: calc(100% - 70px);
        width: 100%;
        background-color: #ffffff;
        overflow: hidden;
        display: flex;

        .info-box {
            height: 100%;
            width: 300px;
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            .info-top {
                width: 100%;
                height: auto;

                .top-item {
                    width: 100%;
                    height: 45px;
                    display: flex;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 10px;

                    .item-l {
                        width: 120px;
                        height: 100%;
                        background: linear-gradient(
                            140deg,
                            #e0e9f6 0%,
                            #c6dbee 100%
                        );
                        color: #000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        line-height: 1;
                    }

                    .item-r {
                        width: calc(100% - 120px);
                        height: 100%;
                        background: #f5f5f5;
                        color: #434343;
                        border: 1px solid #e4e4e4;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }

            .info-mid {
                width: 100%;
                flex: auto;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;

                .mid-item {
                    width: 46%;
                    height: 30%;
                    display: flex;
                    align-items: flex-end;

                    .mid-box {
                        width: 100%;
                        height: 80%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-radius: 5px;
                        background: #f8f8f8;
                        border-radius: 5px;
                        border: 1px solid #d8d8d8;
                        position: relative;
                        padding-top: 30px;
                        box-sizing: border-box;

                        .mid-icon {
                            width: 50px;
                            height: 50px;
                            position: absolute;
                            left: 50%;
                            top: 0;
                            transform: translate(-50%, -50%);
                        }

                        .item-t {
                            color: #292929;
                            font-size: 16px;
                            line-height: 1;
                            margin-bottom: 10px;
                        }

                        .item-b {
                            font-size: 22px;
                            font-weight: bold;
                            color: #6e93b8;
                            line-height: 1;
                        }

                        .red {
                            color: #ff8a30;
                        }
                    }
                }
            }

            .info-bottom {
                width: 100%;
                height: auto;

                .bottom-item {
                    width: 100%;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    margin-top: 20px;
                    box-shadow: 0px 0px 5px #333333;
                    background: linear-gradient(
                        94deg,
                        #4797ff 0%,
                        #2f6eff 100%
                    );
                    color: #fff;

                    img {
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;
                    }
                }
            }
        }

        .file-box {
            height: 100%;
            width: calc(100% - 300px);
            padding: 10px;
            box-sizing: border-box;

            .file-area {
                height: 100%;
                width: 100%;
                border-radius: 8px;
                border: 1px solid #707070;

                .file-title {
                    width: 100%;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    padding-left: 10px;
                    color: #4189ff;
                    font-weight: bold;
                    font-size: 18px;
                    border-bottom: 1px solid #707070;

                    img {
                        width: 25px;
                        margin-right: 10px;
                    }
                }

                .file-content {
                    height: calc(100% - 50px);
                    width: 100%;
                    background-color: #3f3d3d;

                    .carousel-nodata {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .carousel-img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }
        }
    }
}
</style>
