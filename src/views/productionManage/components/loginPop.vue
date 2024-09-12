<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                验证
                <img
                    :src="require('../../../assets/images/no.png')"
                    alt=""
                    @click="handleClick"
                    class="close"
                />
            </div>

            <div class="popContent">
                <div class="content">
                    <div class="contentLable required">账号：</div>
                    <el-input
                        type="text"
                        style="width: 250px"
                        placeholder="请输入"
                        v-model="name"
                    />
                </div>
                <div class="content">
                    <div class="contentLable required">密码：</div>

                    <el-input
                        type="password"
                        style="width: 250px"
                        placeholder="请输入"
                        v-model="pass"
                        autocomplete="new-password"
                    />
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
import TipPop from '../../../components/public/tipPop.vue';

export default {
    components: {
        TipPop
    },
    data() {
        return {
            name: '',
            pass: '',
            isTipShow: false,
            tipText: '',
            noCancel: true
        };
    },
    props: ['isEdit'],
    mounted() {},
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
        },

        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `/api/ProductionManage/RightVerify`,
                    data: {
                        type: this.isEdit ? 1 : 0,
                        Account: this.name,
                        Password: this.pass
                    }
                }).then(res => {
                    if (res.data.code == 0 && res.data.data) {
                        this.$emit('callback', 'yes');
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
    z-index: 11999999;

    .myDialog {
        position: relative;
        width: 450px;
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
