<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                设置
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>

            <div class="popContent">
                非生产状态是否允许打印：
                <el-radio-group v-model="AllowPrinting" class="ml-4">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="handleClick('yes')" style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                ">
                    确定
                </el-button>
            </div>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

    </div>
</template>

<script>
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';

export default {
    components: {
        CurrentTitle,
        TipPop,
    },
    data() {
        return {

            isTipShow: false,
            tipText: '',
            noCancel: true,
            AllowPrinting: 0


        };
    },

    mounted() {

        this.$axios({
            url: `/api/PrinterRecords/QuerySettingPrint`,
            method: 'get',
        }).then((res) => {
            if (res.data.code == 0) {
                this.AllowPrinting = res.data.data.IsAllowNonProductionPrint
            } else {
                this.tipText = res.data.msg;
                this.isTipShow = true;
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
                    url: `/api/PrinterRecords/SettingPrint?AllowPrinting=${this.AllowPrinting}`,
                    method: 'get',
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$emit('callback', '设置成功！');
                    } else {
                        this.tipText = res.data.msg;
                        this.isTipShow = true;
                    }
                });
            } else {
                this.$emit('callback');
            }

        },
    },
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
            height: 100px;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;

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
 