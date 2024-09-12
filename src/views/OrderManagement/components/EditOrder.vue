<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}订单
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>

            <div class="popContent">
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">订单号</div>
                        <el-input type="text" v-model="formData.OrderNumber" style="width: 250px"
                            :disabled="title != '添加'" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">产品型号</div>
                        <el-select v-model="formData.FID" style="width: 250px" @change="GetOrderWorkSectionListFn"
                            :disabled="title == '查看'">
                            <el-option v-for="item in typeList" :key="item.FID" :label="item.ProductTypeCode"
                                :value="item.FID">
                            </el-option>
                        </el-select>
                    </div>

                </div>

                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">下单时间</div>
                        <el-date-picker v-model="formData.OrderTime" type="date" placeholder="选择日期"
                            value-format="yyyy-MM-dd" style="width: 250px" :disabled="title == '查看'" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">交货日期</div>
                        <el-date-picker v-model="formData.DeliveryDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                            style="width: 250px" :disabled="title == '查看'" />
                    </div>
                </div>
                <div class="content1-line">

                    <div class="content">
                        <div class="contentLable required">计划数量</div>
                        <el-input type="number" v-model="formData.PlanNumber" style="width: 250px"
                            :disabled="title == '查看'" />
                    </div>
                    <div class="content">

                    </div>
                </div>

                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">备注</div>
                        <el-input type="textarea" v-model="formData.Remarks" style="width: 650px"   :disabled="title == '查看'"/>
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
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';

export default {
    props: ['title', 'selectItem'],
    components: {
        CurrentTitle,
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                OrderNumber: '',
                OrderType: '',
                FID: '',
                PlanNumber: '',
                OrderTime: '',
                DeliveryDate: '',
                Remarks: ''
            },
            curLeftIdx: 0,
            curRightIdx: 0,
            WorkSectionList: [],
            selectionList: [],
            statusList: [],//产品型号
            typeList: [],//订单类型

        };
    },

    mounted() {
         this.GetProductType()
        if (this.title != '添加' && this.selectItem) {
            this.formData = {
                ...this.selectItem.Data
            }
        }


    },

    watch: {


    },
    methods: {

        tipCallBack(str) {
            if (str == 'yes') {

            }
            this.isTipShow = false;
            this.noCancel = true;
        },
        GetProductType() {
            this.$axios({
                url: `/api/Order/GetFormulaProductTypeList`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.typeList = res.data.data 
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },


        handleClick(str) {

            if (str == 'yes') {
                let operatorName = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1')) || (JSON.parse(sessionStorage.getItem('userInfo1')) == null)) {
                    operatorName = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    operatorName = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserName;
                }
                this.$axios({
                    url: `/api/Order/SaveOrder?isAdd=${this.title == '添加' ? true : false}&operatorName=${operatorName}`,
                    method: 'post',
                    data: {
                        OrderInfo: this.formData
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


            .flex-box {
                width: 100%;
                height: 300px;
                display: flex;

                .flex-l {
                    flex: 3;
                    height: 100%;
                    margin-right: 10px;
                }

                .flex-r {
                    flex: 2;
                    height: 100%;
                }

                .table-title {

                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .table-action {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;

                        .action-btn {
                            width: 80px;
                            height: 34px;
                            background: #386df0;
                            border-radius: 4px;
                            font-size: 16px;
                            color: #ffffff;
                            margin-left: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }

                        .cancel {
                            background: #999999;
                        }
                    }

                }

                .table {
                    width: 100%;
                    height: calc(100% - 50px);
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