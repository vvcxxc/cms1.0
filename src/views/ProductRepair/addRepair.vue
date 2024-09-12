<template>
    <div class="ChooseProcessPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader">
                新增产品返修
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <div class="content1">
                    <div class="table-title">
                        <div class="table-action">
                            产品ID
                            <el-input
                                style="width: 210px;margin:0 10px;"
                                placeholder="请输入关键字"
                                v-model="ProductId"
                            />
                            产品型号
                            <el-select
                                style="margin-left:5px;width:170px"
                                placeholder="请选择"
                                v-model="ProductModel"
                                @change="getData"
                            >
                                <el-option label="全部" value=""></el-option>
                                <el-option
                                    v-for="item in ProductTypeList"
                                    :key="item.ProductTypeCode"
                                    :label="item.ProductTypeCode"
                                    :value="item.ProductTypeCode"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="content1">
                        <el-table
                            highlight-current-row
                            :cell-style="{ borderColor: '#E4E7ED' }"
                            :header-cell-style="{
                                background: '#5a6c98',
                                color: '#fff'
                            }"
                            :data="dataList"
                            border
                            height="500px"
                            @select="selectFn"
                            @select-all="selectFn"
                        >
                            <template slot="empty">
                                <span>暂无数据</span>
                            </template>
                            <el-table-column
                                type="selection"
                                width="60px"
                            ></el-table-column>
                            <el-table-column
                                type="index"
                                label="序号"
                                width="60px"
                            ></el-table-column>
                            <el-table-column
                                prop="WorkName"
                                label="工序名称"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <!-- <el-table-column prop="WorkCode" label="工序编号" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="OperatingModeName" label="操作方式" width="220px"> 
                            </el-table-column>-->
                        </el-table>
                    </div>
                    <div class="table-title">
                        <div class="table-action">
                            备注
                            <el-input
                                type="textarea"
                                style="width: 490px;margin-left: 10px;"
                                resize="none"
                                v-model="Remark"
                                placeholder="请输入关键字"
                            />
                        </div>
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
import TipPop from '../../components/public/tipPop.vue';

export default {
    props: [],
    components: {
        TipPop
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),
            ProductTypeList: [],
            ProductModel: '',
            ProductId: '',
            Remark: '',
            selectList: [],
            dataList: []
        };
    },

    mounted() {
        this.getProdType();
    },

    methods: {
        getProdType() {
            this.$axios({
                method: 'post',
                url: '/api/FormulaManage/QueryProductType'
            }).then(res => {
                if (res.data.code == 0) {
                    this.ProductTypeList = res.data.data || [];
                    if (this.ProductTypeList.length) {
                        this.ProductModel = this.ProductTypeList[0].ProductTypeCode;
                    }
                    this.getData();
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        getNowTime() {
            let date = new Date();
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d;
        },
        tipCallBack(str) {
            if (str == 'yes') {
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
        },
        handleClick(str) {
            if (str == 'yes') {
                let _name = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    _name = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                        .SCMSUserName;
                } else {
                    _name = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserName;
                }
                this.$axios({
                    url: `/api/ProductRepair/AddProductRepair?ProductId=${this.ProductId}&Remark=${this.Remark}&LoginUserName=${_name}&productTypeCode=${this.ProductModel}`,
                    method: 'post',
                    data: this.selectList.map(_ => _.WID)
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$emit('callback', str, '新增成功！');
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
                    }
                });
            } else {
                this.$emit('callback', str);
            }
        },
        selectFn(arr) {
            this.selectList = arr;
        },
        getData() {
            if (!this.ProductModel) {
                this.dataList = [];
                return;
            }
            this.$axios({
                url: `/api/ProductRepair/QueryWorkSectionsByProductTypeCode?productTypeCode=${this.ProductModel}`,
                method: 'post'
            }).then(res => {
                if (res.data.code == 0) {
                    this.selectList = [];
                    this.dataList = res.data.data || [];
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.ChooseProcessPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 600px;
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
            height: auto;
            padding: 20px 30px;
            padding-bottom: 0;

            .unit {
                width: 36px;
                height: 24px;
                border-radius: 4px;
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translate(0, -50%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #386df0;
                background: #e4eafb;
                cursor: pointer;
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

                    .mult {
                        background: #ea9328;
                    }

                    .cancel {
                        background: #999999;
                    }
                }
            }

            .content1 {
                width: 100%;
                height: auto;
                margin-bottom: 30px;
            }

            .content,
            .content2 {
                display: flex;
                width: 100%;
                line-height: 40px;
                align-items: center;
                position: relative;

                .contentLable {
                    width: 100px;
                    text-align: right;
                    font-size: 14px;
                    color: #363636;
                    margin-right: 10px;

                    .require {
                        color: #d9001b;
                    }
                }

                img {
                    width: 38px;
                    height: 38px;
                    position: absolute;
                    top: 2px;
                    right: 0;
                    cursor: pointer;
                }

                .textarea-box {
                    width: calc(100% - 100px);
                }
            }

            .check-content {
                padding-left: 50px;
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
.ChooseProcessPop .el-input.is-disabled .el-input__inner {
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
