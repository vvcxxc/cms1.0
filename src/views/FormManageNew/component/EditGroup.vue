<template>
    <div class="groupPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>
            <div class="tips">请勾选{{ }}需要下发配方值的配方组：</div>
            <div class="popContent">
                <el-table ref="myTable" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                    :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="400px"
                    @select="selectLeft" @select-all="selectLeft">
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                    <el-table-column type="selection" width="60px"></el-table-column>
                    <el-table-column prop="ContentGroup" label="设备分组" :show-overflow-tooltip="true"></el-table-column>
                </el-table>

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
            dataList: [],
            selectList: [],

        };
    },

    mounted() {
        if (!this.selectItem) {
            return
        }
        this.$axios({
            method: 'post',
            url: `/api/FormulaManage/FormulaManage_FormulaGrouping?argFId=${this.selectItem.FID}`,
        })
            .then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data || [];
                    this.selectList = this.dataList.filter((item) => item.IsSelectable);
                    this.$nextTick(() => {
                        this.selectList.forEach((item) => {
                            this.$refs.myTable.toggleRowSelection(item, true)
                        })
                    })
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })
    },
    methods: {
        selectLeft(arr) {
            this.selectList = arr;
        },
        tipCallBack(str) {
            this.isTipShow = false;
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `/api/FormulaManage/FormulaManage_SaveGrouping?argFId=${this.selectItem.FID}`,
                    data: this.selectList
                })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$emit('callback', '保存成功！');
                        } else {
                            this.isTipShow = true;
                            this.tipText = res.data.msg;
                        }
                    })
            } else {
                this.$emit('callback');
            }

        },
    },
};
</script>

<style lang="scss" scoped>
.groupPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 600px;
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

        .tips {
            padding-top: 20px;
            padding-left: 40px;
        }

        .popContent {
            width: 100%;
            height: auto;
            overflow-y: auto;
            padding: 0 40px;
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
.groupPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>