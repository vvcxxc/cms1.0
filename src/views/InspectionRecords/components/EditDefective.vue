<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}不良码
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>

            <div class="popContent">
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">不良码</div>
                        <el-input type="text" v-model="PoorBarCode" style="width: 280px" />
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">不良描述</div>
                        <el-input type="text" v-model="PoorMark" style="width: 280px" />
                    </div>
                </div>
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
 import TipPop from '../../../components/public/tipPop.vue';

export default {
    props: ['title', 'selectItem'],
    components: {
         TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,


            Id: 0,
            PoorBarCode: '',
            PoorMark: '',
        };
    },

    mounted() {
        if (this.title == '编辑' && this.selectItem) {
            this.Id = this.selectItem.id;
            this.PoorBarCode = this.selectItem.poorBarCode;
            this.PoorMark = this.selectItem.poorMark;
        }

    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    url: `/api/InspectionRecords/AddOrUpdateDefectiveReason`,
                    method: 'post',
                    data: {
                        Id: this.Id,
                        PoorBarCode: this.PoorBarCode,
                        PoorMark: this.PoorMark,
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$emit('callback', `${this.title}成功！`);
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