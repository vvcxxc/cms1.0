<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}工单
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>
            <div class="popContent">
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">工单号</div>
                        <el-input type="text" v-model="formData.OrderNumber" style="width: 250px"
                            :disabled="title != '添加'" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">生产型号</div>
                        <el-select v-model="formData.FID" style="width: 250px" :disabled="title == '查看'||formData.OrderStatus===2">
                            <el-option v-for="item in typeList" :key="item.FID" :label="item.ProductTypeCode"
                                :value="item.FID">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">计划开始</div>
                        <el-date-picker v-model="formData.StartTime" type="datetime" placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss" style="width: 250px" :disabled="title == '查看'" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">计划结束</div>
                        <el-date-picker v-model="formData.EndTime" type="datetime" placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm:ss" style="width: 250px" :disabled="title == '查看'" />
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">计划数量</div>
                        <el-input type="number" v-model="formData.PlanNumber" style="width: 250px"
                            :disabled="title == '查看'" />
                    </div>
                    <div class="content">
                        <div class="contentLable required">是否定量生产</div>
                        <el-select v-model="formData.IsQuantify" style="width: 250px" :disabled="title == '查看'||formData.OrderStatus===2">
                            <el-option label="是" :value="1"> </el-option>
                            <el-option label="否" :value="0"> </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">备注</div>
                        <el-input type="textarea" v-model="formData.Remarks" style="width: 650px" />
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
import { MessageBox } from 'element-ui';

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
                IsQuantify: 1,
                FID: '',
                PlanNumber: '',
                StartTime: '',
                EndTime: '',
                Remarks: ''
            },
            typeList: [],//工单类型


        };
    },

    mounted() {
        this.GetProductType()

        if (this.title != '添加') {
            this.formData = { ...this.selectItem.Data }
            console.log(this.formData)
        }

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
                url: `/api/Order/GetProductTypeList`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.typeList = res.data.data.filter(_ => _.FID != '00000000-0000-0000-0000-000000000000')
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
                const cb = (isEnd = 0) => {
                    return new Promise((resolve, reject) => {
                        this.$axios({
                            url: `/api/Order/SaveOrder?isAdd=${this.title == '添加' ? true : false}&operatorName=${operatorName}`,
                            method: 'post',
                            data: {
                                OrderInfo: this.formData,
                                WorkSectionList: this.selectionList
                            }
                        }).then((res) => {
                            if (res.data.code == 0) {
                                !isEnd && this.$emit('callback', `${this.title}成功！`);
                                resolve();
                            } else {
                                this.tipText = res.data.msg;
                                this.isTipShow = true;
                                reject();
                            }
                        });
                    });
                }
                if(this.formData.OrderStatus === 2 && this.formData.PlanNumber <= this.formData.OkNumber) {
                    MessageBox.confirm('计划数小于工单合格数，工单将自动完结，是否确认修改？', '提示', {
                        customClass: 'confirmDialog',
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        cb(1).then(() => {
                            this.endOrder(this.formData.OrderNumber, operatorName)
                        })
                    })
                } else cb()
            } else {
                this.$emit('callback');
            }

        },
        endOrder(OrderNumber, operatorName) {
            this.$axios({
                method: 'post',
                url: `/api/Order/EndOrder?orderNumber=${OrderNumber}&operatorName=${operatorName}`
            }).then(res => {
                if (res.data.code === 0) {
                    this.$emit('callback');
                    this.tipText = '完结成功！';
                    this.isTipShow = true;
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
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