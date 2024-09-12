<!--
 * @Description: 这是添加班组弹窗页面（组件）
 * @Date: 2020-11-18 13:38:07
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 14:12:12
-->
<template>
    <div class="TeamPop">
        <div class="head">
            编辑
            <div @click="cancelFun()" class="headImg"></div>
        </div>
        <div class="middle">
            <div class="middle_1">
                <div class="middle_name">物料图号</div>
                <div class="middle_input">
                    <el-input :disabled="true" v-model="ComponentNo"></el-input>
                </div>
            </div>

            <div class="middle_1">
                <div class="middle_name  ">供应商代号</div>
                <div class="middle_input">
                    <el-input :disabled="true" v-model="SupplierNo"></el-input>
                </div>
            </div>
            <div class="middle_1">
                <div class="middle_name  ">物料总量</div>
                <div class="middle_input">
                    <el-input v-model="Total"></el-input>
                </div>
            </div>
            <div class="middle_3">
                <div @click="confirmFun()" class="confirm">
                    {{ lang.PopupCommon_Sure }}
                </div>
                <div @click="cancelFun()" class="cancel">
                    {{ lang.PopupCommon_Cancel }}
                </div>
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
export default {
    components: {
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            ComponentNo: '',
            SupplierNo: '',
            Total: '',
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        };
    },

    props: ['row'],
    mounted() {
        this.ComponentNo = this.row.ComponentNo;
        this.SupplierNo = this.row.SupplierNo;
        this.Total = this.row.Total;
    },
    methods: {
        confirmFun() {
            this.$axios({
                method: 'post',
                url: `/api/MaterielBom/ChangeTotal?batchId=${this.row.Id}&total=${this.Total}`,
                data: {
                    batchId: this.row.Id,
                    total: this.Total
                }
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.$emit('callback', '修改成功！');
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
                .catch(err => {});
        },
        tipCallBack(str) {
            this.isTipShow = false;
        },
        cancelFun() {
            this.$emit('callback');
        }
    }
};
</script>
<style lang="scss">
.TeamPop {
    .el-textarea {
        height: 100%;
    }
    .el-textarea__inner {
        height: 90px;
    }
}
</style>
<style lang="scss" scoped>
.TeamPop {
    height: 320px;
    width: 520px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 12;
    box-shadow: -7px 7px 50px 0px rgba(51, 51, 51, 0.5);
    background: #eeeeee;
    .head {
        position: relative;
        line-height: 40px;
        text-align: center;
        width: 100%;
        height: 40px;
        background: rgba(56, 109, 240, 1);
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(238, 238, 238, 1);
        user-select: none;
        .headImg {
            position: absolute;
            right: 12px;
            top: 13px;
            width: 16px;
            height: 16px;
            background: url('../../assets/images/no.png');
            background-size: cover;
            cursor: pointer;
        }
    }
    .middle {
        width: calc(100% - 20px);
        height: calc(100% - 50px);
    }
    .tips {
        width: 100%;
        margin-left: 125px;
    }
    .middle_1,
    .middle_2 {
        overflow: hidden;
    }
    .middle_1 {
        height: 42px;
        line-height: 42px;
        margin-top: 20px;
    }
    .middle_2 {
        height: 90px;
        margin-top: 12px;
    }
    .middle_name {
        float: left;
        width: 70px;
        font-size: 16px;
        text-align: right;
        margin-left: 30px;
        margin-right: 20px;
        position: relative;
    }

    .require::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-100%, -50%);
    }
    .middle_textarea {
        float: left;
        width: 350px;
        height: 90px;
    }
    .middle_input {
        float: left;
        width: 350px;
        height: 40px;
    }
    .middle_3 {
        width: 100%;
        height: 40px;
        overflow: hidden;
        margin-top: 20px;
        .confirm,
        .cancel {
            float: right;
            width: 100px;
            height: 40px;
            border-radius: 4px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            user-select: none;
            color: #fff;
        }
        .cancel {
            background: #949bac;
        }
        .confirm {
            background: #4270e4;
            margin-left: 20px;
            margin-right: 20px;
        }
    }
}
</style>
