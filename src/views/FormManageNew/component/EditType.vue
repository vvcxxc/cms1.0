<template>
    <div class="typePop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                型号管理
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick('no')" class="close" />
            </div>
            <div class="item-search">
                <div class="search-left">
                    型号列表
                </div>
                <div class="search-right">
                    <div class="search-btn add" @click="addProj">添加</div>
                    <div class="search-btn del" @click="delProj">删除</div>
                </div>

            </div>
            <div class="popContent">
                <el-table ref="projTable" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                    @row-click="tableRowClick" :row-class-name="tableRowClassName"
                    :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="400px">
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="ProductTypeCode" label="产品型号" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input :maxLength="40" v-model="scope.row.ProductTypeCode" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="ProductTypeName" label="产品名称" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-input :maxLength="10" v-model="scope.row.ProductTypeName" />
                        </template>
                    </el-table-column>
                
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
import TipPop from '../../../components/public/tipPop.vue';

export default {
    components: {
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            dataList: [],
            curIdx: 0,
        };
    },

    mounted() {
        this.$axios({
            method: 'post',
            url: `api/FormulaManage/QueryProductType`
        })
            .then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data;
                    this.curIdx = 0;
                    if (this.dataList.length) {
                        this.$nextTick(() => {
                            this.$refs.projTable.setCurrentRow(this.dataList[0]);
                        })
                    }
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            row.$index = rowIndex
        },
        tableRowClick(row) {
            this.curIdx = row.$index;
        },
        addProj() {
            this.dataList.push({
                ID: "00000000-0000-0000-0000-000000000000",
                ProductTypeName: '',
                ProductTypeCode: ''
            })
        },
        delProj() {
            this.isTipShow = true;
            this.tipText = '是否确认删除选中型号？';
            this.noCancel = false
        },
        tipCallBack(str) {
            if (str == 'yes') {
                 
                let _temp = this.dataList;
                _temp.splice(this.curIdx, 1)
                this.dataList = []
                this.$nextTick(() => {
                    this.dataList = _temp
                })
            }
            this.noCancel = true;
            this.isTipShow = false;
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `api/FormulaManage/AddOrEditProductType`,
                    data: this.dataList
                })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.isTipShow = true;
                            this.tipText = '保存成功！';
                            this.$emit('callback');
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
.typePop {
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

        .item-search {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            box-sizing: border-box;

            .search-left {
                color: #386df0;
                font-size: 16px;
                border-left: 3px solid #386df0;
                padding-left: 5px;
            }

            .search-right {
                display: flex;
                align-items: center;

            }

            .search-btn {
                cursor: pointer;
                margin-right: 10px;
                height: 36px;
                width: 80px;
                border-radius: 4px;
                border: 1px solid #fcae38;
                background-color: #fff;
                color: #fcae38;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                a {
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                }
            }

            .add {
                border: 1px solid #61D731;
                color: #61D731;
            }

            .del {
                background-color: #aaaaaa;
                border: none;
                color: #fff;
            }

            .type {
                background-color: #fcae38;
                border: none;
                color: #fff;
            }

            .log {
                border: 1px solid #5279DD;
                color: #5279DD;
            }
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
.typePop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>