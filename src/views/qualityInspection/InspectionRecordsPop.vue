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
                <CurrentTitle title="检查项信息" />

                <div class="content1-line">
                    <div class="content">检查项：{{ StepName }}</div>
                    <div class="content"></div>
                    <div class="content"></div>
                </div>

                <CurrentTitle title="检查项目" />

                <div class="content1-line">
                    <div class="content2" :title="curLeft.ItemName">
                        管理项目： {{ curLeft.ItemName }}
                    </div>
                    <div class="content2" :title="curLeft.ItemContent">
                        管理内容： {{ curLeft.ItemContent }}
                    </div>
                    <div class="content2" :title="curLeft.ItemVelue">
                        管理值： {{ curLeft.ItemVelue }}
                    </div>
                    <div class="content2" :title="curLeft.MeasureMethod">
                        测量（仪器/方法）： {{ curLeft.MeasureMethod }}
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content2" :title="curLeft.MeasureFrequency">
                        测量频率：{{ curLeft.MeasureFrequency }}
                    </div>
                    <div class="content2" :title="curLeft.RecordFrequency">
                        记录频率：{{ curLeft.RecordFrequency }}
                    </div>
                    <div class="content2"></div>
                    <div class="content2"></div>
                </div>
                <CurrentTitle title="新增工程检查记录" />

                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">生产机型</div>
                        <el-input
                            style="width: 300px"
                            v-model="formData.Mode"
                        />
                    </div>
                    <div class="content">
                        <div class="contentLable required ">检查结果</div>
                        <el-select
                            v-if="curLeft.ItemType == '单选'"
                            style="width: 800px"
                            v-model="formData.Result"
                        >
                            <el-option
                                v-for="item in selectList"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                        <el-select
                            v-else-if="curLeft.ItemType == '多选'"
                            style="width: 800px"
                            v-model="formData.Result"
                            multiple
                        >
                            <el-option
                                v-for="item in selectList"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                        <el-input
                            v-else
                            style="width: 800px"
                            v-model="formData.Result"
                        />
                    </div>
                    <div class="content"></div>
                    <div class="content"></div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">判定</div>
                        <el-select
                            style="width: 300px"
                            v-model="formData.Decide"
                        >
                            <el-option label="OK" value="OK"></el-option>
                            <el-option label="NG" value="NG"></el-option>
                        </el-select>
                    </div>
                    <div class="content">
                        <div class="contentLable  ">备注</div>
                        <el-input
                            style="width: 800px"
                            v-model="formData.Remark"
                        />
                    </div>
                    <div class="content"></div>
                    <div class="content"></div>
                </div>
            </div>
            <div class="popBtn">
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
export default {
    props: ['title', 'selectItem', 'curLeft', 'StepName', 'WorkName'],
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
                Id: 0,
                ReportId: 0,
                Mode: '',
                Result: '',
                Decide: '',
                Remark: ''
            },
            selectList: []
        };
    },

    mounted() {
        if (this.title == '编辑工程检查记录') {
            this.formData = {
                ...this.selectItem,
                Result:
                    this.curLeft.ItemType == '多选'
                        ? this.selectItem.Result.split(/[;；]/)
                        : this.selectItem.Result
            };
        }
        console.log('this.curLeft', this.curLeft);
        if (
            this.curLeft.ItemType == '单选' ||
            this.curLeft.ItemType == '多选'
        ) {
            this.selectList = this.curLeft.ReferenceValue.split(/[;；]/);
        } else {
            this.selectList = [];
        }
    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
        },
        openEngineeringInspection(t) {
            this.inspectionShow = true;
            this.inspectionTitle = t;
            // this.inspectionSelectItem = r;
        },
        inspectionCallback(t, r) {
            this.inspectionShow = false;
            this.inspectionTitle = '';
            this.inspectionSelectItem = null;
            this.getList();
        },
        handleClick(str) {
            if (str == 'yes') {
                if (!this.formData.Result) {
                    this.isTipShow = true;
                    this.tipText = '请输入检测结果！';
                    return;
                }
                if (!this.formData.Decide) {
                    this.isTipShow = true;
                    this.tipText = '请选择判定！';
                    return;
                }
                let userid = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserName;
                }
                console.log('this.formData.Result', this.formData.Result);
                this.$emit('callback', {
                    ...this.formData,
                    Result:
                        this.curLeft.ItemType == '多选'
                            ? this.formData.Result.join(';')
                            : this.formData.Result
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
        width: 1500px;
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
            max-height: 650px;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;
            .mt {
                margin-top: 10px;
                width: 840px;
            }
            .content1-line {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;

                .content,
                .content2 {
                    display: flex;
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
                .content2 {
                    display: unset;
                    width: 300px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .table-flex {
                display: flex;
                justify-content: space-between;
                height: 400px;
                .table-item {
                    width: calc(50% - 5px);
                    height: 100%;

                    .table-title {
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        .title {
                            width: 100px;
                        }
                        .btn {
                            font-weight: bold;
                            width: 100px;
                            height: 38px;
                            line-height: 38px;
                            margin-left: 10px;
                            border: 2px solid #4270e4;
                            background-color: #fff;
                            color: #4270e4;
                            font-size: var(--fontSize);
                            border-radius: 4px;
                            text-align: center;
                            vertical-align: middle;
                            box-sizing: border-box;
                            cursor: pointer;

                            &.btn-query {
                                background-color: #4270e4;
                                color: #fff;
                            }
                            &.btn-setting {
                                border-color: #ffa629;
                                background-color: #ffa629;
                                color: #fff;
                            }
                            &.btn-add {
                                border-color: #46be05;
                                color: #46be05;
                            }
                        }
                    }
                    .table {
                        width: 100%;
                        height: calc(100% - 50px);
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
