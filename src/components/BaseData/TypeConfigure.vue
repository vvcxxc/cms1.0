<template>
    <div class="variableSelect">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drager>
                类型配置
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>
            <div class="popContent">
                <div class="mySearch">

                    <el-button class="btn btn3" @click="addItem">
                        新建
                    </el-button>
                    <el-button class="btn btn4" @click="beforeDel">
                        删除
                    </el-button>
                </div>
                <div class="myTable">
                    <el-table :data="tableData" height="100%" border ref="multipleTable" highlight-current-row stripe
                        tooltip-effect="dark" style="width: 100%" :header-cell-style="{
                            background: '#E1EDFA',
                            color: '#769DE7',
                            'border-left': '1px solid #cccccc',
                            height: '50px',
                            padding: '0',
                        }" @current-change="handleCurrentChange">
                        <el-table-column type="index" label="序号" width="80"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="巷道类型" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.Name"
                                    :style="{ border: !scope.row.Name && issubmit ? 'red 1px solid' : 'none' }" />
                            </template></el-table-column>
                        <el-table-column label="属性" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.PropertyName" @change="changePro(scope.row)">
                                    <el-option label="实车" :value="1"></el-option>
                                    <el-option label="空车" :value="2"></el-option>
                                </el-select> </template>
                        </el-table-column>
                        <el-table-column label="关联产品类型" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.ProductIds" multiple
                                    :disabled="scope.row.PropertyName == 2"
                                    :style="{ border: !scope.row.ProductIds.length && scope.row.PropertyName != 2 && issubmit ? 'red 1px solid' : 'none' }">
                                    <el-option v-for="item in ProductList" :key="item.Id" :label="item.Type"
                                        :value="item.Id" />
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="handleClick('yes')" style="
                        margin-right: 40px;
                        background: rgba(56, 109, 240);
                        border: 1px solid #386df0;
                    ">
                    确定
                </el-button>
            </div>
        </div>
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
    </div>
</template>

<script>
import TipPop from '../public/tipPop.vue';

export default {
    components: {
        TipPop
    },
    props: ['data'],
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),
            tableData: [],
            ProductList: [],
            addTimer: false,
            SelectRow: {},
            issubmit: false
        };
    },
    created() {
        this.$axios({
            method: 'get',
            url: `/api/Product/GetAllList`,
        }).then((res) => {
            this.ProductList = res.data.data || [];
            this.$axios({
                method: 'get',
                url: `/api/RoadwayType/GetALlList`,
            }).then((res) => {
                this.tableData = res.data.data || [];
            });
        });

    },
    methods: {
        handleCurrentChange(row) {
            this.SelectRow = row;
        },
        changePro(row) {
            if (row.PropertyName == 2) {
                row.ProductIds = []
            }
        },
        addItem() {
            if (!this.addTimer) {
                this.addTimer = true;
                this.tableData.push({
                    Id: new Date().getTime(),
                    Name: "",
                    PropertyName: 1,
                    ProductIds: [],
                    isAdd: true
                })
                setTimeout(() => {
                    this.addTimer = false;
                }, 1000)
            }
        },
        beforeDel() {
            this.tipText = `是否确认删除选中行？`;
            this.isPopShow = true;
            this.noCancel = false
        },
        // 提示弹窗回调
        tipCallBack(str) {
            this.isPopShow = false;
            this.noCancel = true;
            if (str == 'yes') {
                this.delItem()
            }
        },
        delItem() {
            if (this.SelectRow.isAdd) {
                let temp = this.tableData.filter(_ => _.Id != this.SelectRow.Id);
                console.log(temp);
                this.tableData = temp
            } else {
                this.$axios({
                    method: 'delete',
                    url: `/api/RoadwayType/Delete/${this.SelectRow.Id}`,
                }).then((res) => {
                    if (res.data.code == 0) {
                        let temp = this.tableData.filter(_ => _.Id != this.SelectRow.Id);
                        this.tableData = temp
                    } else {
                        this.isPopShow = true;
                        this.noCancel = true;
                        this.tipText = res.data.msg;
                    }
                });
            }
        },

        handleClick(str) {
            this.issubmit = false;
            if (str === 'yes') {
                if (this.tableData.some(_ => (!_.Name || (_.PropertyName != 2 && !_.ProductIds.length)))) {
                    this.isPopShow = true;
                    this.tipText = '不允许为空！';
                    this.noCancel = true;
                    this.issubmit = true;
                    return;
                }
                let arr1 = this.tableData.map(_ => _.Name)
                let arr2 = Array.from(new Set(arr1))
                if (arr1.length != arr2.length) {
                    this.isPopShow = true;
                    this.tipText = '巷道类型不能重复';
                    this.noCancel = true;
                    return;
                }
                this.$axios({
                    url: `/api/RoadwayType/Save`,
                    method: 'post',
                    data: this.tableData,
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$emit('zdPopCallBack', str, this.tableData);
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg;
                        this.noCancel = true;
                    }
                });
            }
            this.$emit('zdPopCallBack', str, this.tableData);
        },
    },
    directives: {
        drag: function (el) {
            let dragBox = document.getElementById('myDialog'); //获取当前元素
            el.onmousedown = e => {
                //算出鼠标相对元素的位置
                let disX = e.clientX - dragBox.offsetLeft;
                let disY = e.clientY - dragBox.offsetTop;
                document.onmousemove = e => {
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    //移动当前元素
                    dragBox.style.left = left + "px";
                    dragBox.style.top = top + "px";
                };
                document.onmouseup = e => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    },
};
</script>

<style lang="scss" scoped>
.variableSelect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 1122px;
        height: 615px;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 1122px;
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
            width: calc(100% - 122px);
            height: calc(100% - 190px);
            margin: 32px 61px;
            border: 1px solid #d0d0d0;
            padding: 10px 24px;
            background-color: #F4F4F4;

            .mySearch {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .btn3 {
                    border-color: #46BE05;
                    color: #46BE05;
                }

                .btn4 {
                    border-color: #999999;
                    color: #999999;
                }

            }

            ::v-deep .el-input__inner {
                height: 30px;
            }

            ::v-deep .el-input__icon {
                line-height: 30px;
            }

            ::v-deep .el-button {
                padding: 0;
            }

            .text {
                font-size: 12px;
                color: #666666;
            }

            .space {
                margin-right: 20px;
            }

            .btn {
                width: 120px;
                height: 30px;
                background: #fff;
                border: 1px solid #386df0;
                opacity: 1;
                border-radius: 4px;
                font-size: 14px;
                color: #386df0;
            }

            .myTable {
                height: calc(100% - 50px);
                width: 100%;
                margin-top: 10px;
            }
        }

        .popBtn {
            width: 100%;
            height: 60px;
            text-align: right;
            line-height: 60px;

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