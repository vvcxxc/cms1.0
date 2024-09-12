<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}
                <img
                    :src="require('../../../assets/images/no.png')"
                    alt=""
                    @click="handleClick"
                    class="close"
                />
            </div>

            <div class="popContent">
                <CurrentTitle title="切换班次" />
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">日期</div>
                        {{ date }}
                    </div>
                    <div class="content"></div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">选择班次：</div>
                        <el-select
                            style="width: 210px"
                            v-model="formData.ShiftId"
                            :disabled="title == '查看排班'"
                        >
                            <el-option
                                v-for="item in shiftList"
                                :key="item.sId"
                                :label="item.sCode + '-' + item.sCategory"
                                :value="item.sId"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="content">
                        <div class="contentLable required">选择班组：</div>
                        <el-select
                            style="width: 210px"
                            v-model="formData.ClassId"
                            :disabled="title == '查看排班'"
                        >
                            <el-option
                                v-for="item in classList"
                                :key="item.sId"
                                :label="item.sName"
                                :value="item.sId"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">类型：</div>
                        {{ curShift.Type }}
                    </div>
                    <div class="content">
                        <div class="contentLable required">班次时间段：</div>
                        {{ curShift.Time }}
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">工时（h）：</div>
                        {{ curShift.Duration }}
                    </div>

                    <div class="content"></div>
                </div>

                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">班组备注</div>
                        {{ curClass.sRemark }}
                    </div>
                </div>

                <CurrentTitle title="产线配置" />
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable2">产线计划停机时间</div>
                        <el-input
                            :disabled="title == '查看排班'"
                            type="number"
                            v-model="formData.StopTime"
                            style="width: 110px"
                        />
                        <el-select
                            style="width: 100px"
                            v-model="formData.TimeUnits"
                            :disabled="title == '查看排班'"
                        >
                            <el-option label="秒" :value="2"></el-option>
                            <el-option label="分钟" :value="1"></el-option>
                            <el-option label="小时" :value="0"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable2">产线计划节拍数</div>
                        <el-input
                            :disabled="title == '查看排班'"
                            type="number"
                            v-model="formData.Beat"
                            style="width: 210px"
                        />
                    </div>
                </div>
            </div>
            <div class="popBtn" v-if="title != '查看排班'">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button
                    class="btn"
                    @click="handleClick('yes')"
                    style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                "
                >
                    确定
                </el-button>
            </div>
            <div class="popBtn" v-else>
                <el-button class="btn" @click="handleClick('no')">
                    关闭
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
import TipPop from '../../../components/public/tipPop.vue';
import CurrentTitle from '../../../components/public/currentTitle.vue';
import moment from 'moment'; //导入文件

export default {
    props: ['date', 'title', 'selectItem'],
    components: {
        TipPop,
        CurrentTitle
    },

    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                ScheduleId: '',
                StopTime: null,
                ShiftId: '',
                ClassId: '',
                TimeUnits: 0,
                Beat: null
            },
            shiftList: [],
            classList: []
        };
    },
    computed: {
        curShift() {
            let _obj = this.shiftList.find(_ => _.sId == this.formData.ShiftId);
            let Duration;
            if (_obj) {
                let st = _obj.sStartTime.split(':')[0];
                let ed = _obj.sEndTime.split(':')[0];
                if (_obj.sType != 0) {
                    ed = Number(ed) + 24;
                }
                console.log(st, ed);
                let stMin =
                    Number(st) * 60 + Number(_obj.sStartTime.split(':')[1]);
                let edMin =
                    Number(ed) * 60 + Number(_obj.sEndTime.split(':')[1]);
                Duration = ((edMin - stMin) / 60).toFixed(1);
            }

            return _obj
                ? {
                      ..._obj,
                      Type: _obj.sType == 0 ? '当天' : '跨天',
                      Time: `${_obj.sStartTime}-${_obj.sEndTime}`,
                      Duration
                  }
                : {};
        },
        curClass() {
            let _obj = this.classList.find(_ => _.sId == this.formData.ClassId);
            console.log(
                'this.formData.ClassId',
                this.classList,
                this.formData.ClassId
            );
            return _obj || {};
        }
    },
    mounted() {
        this.$axios({
            method: 'get',
            url: `/api/Class/QueryShift?KeyWord=`
        }).then(res => {
            if (res.data.code == 0) {
                this.shiftList = res.data.data;
                this.$axios({
                    method: 'get',
                    url: `/api/class/query?key=`
                }).then(res => {
                    if (res.data.code == 0) {
                        this.classList = res.data.data;
                        if (this.title != '添加排班') {
                            console.log('selectItem', this.selectItem);
                            this.formData = {
                                ...this.selectItem,
                                ShiftId: this.selectItem.Shift.sId,
                                ClassId: this.selectItem.Class.sId,
                                ScheduleId: this.selectItem.Id
                            };
                        } else {
                            this.formData.ScheduleId = '';
                        }
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
            } else {
                this.isTipShow = true;
                this.tipText = res.data.msg;
            }
        });
    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `/api/Class/UpdateClass`,
                    data: {
                        ...this.formData,
                        editDate: this.date
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$emit(
                            'callback',
                            this.title == '添加排班'
                                ? '添加成功！'
                                : '编辑成功！'
                        );
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
            } else {
                this.$emit('callback');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.zdeditPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 850px;
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

            .content1-line {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .content {
                    display: flex;
                    width: 100%;
                    line-height: 40px;
                    margin: 10px 0;

                    .contentLable {
                        width: 95px;
                        text-align: left;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
                    }
                    .contentLable2 {
                        width: 120px;
                        text-align: left;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
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
