<template>
    <div class="EditWorkStepsPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader">
                过程参数全局设置
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <CurrentTitle title="返修产品数据处理" />
                <div class="content1-line">
                    <el-radio-group
                        class="ml-4"
                        v-model="RefixDataHandleTypeValue"
                    >
                        <el-radio :label="0" size="large"
                            >仅展示最新加工数据（重复产品码旧数据删除）</el-radio
                        >
                        <el-radio :label="1" size="large"
                            >展示所有数据（重复产品码旧数据保留）</el-radio
                        >
                    </el-radio-group>
                </div>

                <CurrentTitle title="漏工序检测时间范围" />
                <div class="content1-line">
                    <div class="content">
                        时间范围：最近
                        <el-input
                            style="width:100px;margin:0 10px;"
                            v-model="MissDay"
                        />天
                    </div>
                </div>
                <CurrentTitle title="订单检测时间范围" />
                <div class="content1-line">
                    <div class="content">
                        时间范围：最近
                        <el-input
                            style="width:100px;margin:0 10px;"
                            v-model="CheckParameterDay"
                        />天
                    </div>
                </div>
            </div>

            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button
                    class="btn"
                    @click="handleClick('yes')"
                    style="margin-right: 40px;background: rgba(56, 109, 240);border: 1px solid #386df0;"
                >
                    保存
                </el-button>
            </div>
        </div>
        <TipPop
            v-if="isPopShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        />
    </div>
</template>

<script>
import TipPop from '../../../components/public/tipPop.vue';
import CurrentTitle from '../../../components/public/currentTitle.vue';

export default {
    props: [],
    components: {
        TipPop,
        CurrentTitle
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),
            RefixDataHandleTypeValue: 0,
            MissDay: '',
            CheckParameterDay: ''
        };
    },

    mounted() {
        this.$axios({
            url: `/api/ProcessParameterConfigure/QueryGloabl`,
            method: 'post',
            data: this.data
        }).then(res => {
            if (res.data.code == 0) {
                this.MissDay = res.data.data.MissDay;
                this.CheckParameterDay = res.data.data.CheckParameterDay;
                this.RefixDataHandleTypeValue =
                    res.data.data.RefixDataHandleTypeValue;
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;
            }
        });
    },

    methods: {
        tipCallBack(str) {
            if (str == 'yes') {
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    url: `/api/ProcessParameterConfigure/SetGloabl?Day=${this.MissDay}&CheckParameterDay=${this.CheckParameterDay}&refixDataHandle=${this.RefixDataHandleTypeValue}`,
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        if (this.title == '添加工步') {
                            this.$emit('callback', '保存成功');
                        } else {
                            this.$emit('callback', '修改成功');
                        }
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
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
.EditWorkStepsPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 500px;
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
            height: calc(100% - 120px);
            padding: 20px 30px;
            padding-bottom: 0;

            .content1-line {
                margin: 20px 0;
            }

            .content {
                display: flex;
                width: 100%;
                line-height: 40px;
                align-items: center;
                position: relative;
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

// .virtual-cell-time-picker {
//     .el-time-spinner__wrapper {
//         width: 50% !important;
//     }

//     .el-scrollbar:nth-of-type(3) {
//         display: none !important;
//     }
// }
</style>
