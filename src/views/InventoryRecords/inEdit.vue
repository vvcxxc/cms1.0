<template>
    <div class="inEdit">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drager>
                {{ title }}库区记录
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <div class="content1">
                    <CurrentTitle title="库区信息" line />
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable ">库区名称</div>
                            <el-input type="text" disabled v-model="formData.WarehouseAreaName" style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">巷道名称</div>
                            <el-input type="text" disabled v-model="formData.RoadwayName" style="width: 210px" />
                        </div>
                    </div>

                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable ">巷道类型</div>
                            <el-input type="text" disabled v-model="formData.RoadwayTypeName" style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">属性</div>
                            <el-input type="text" disabled v-model="formData.PropertyDisplayName"
                                style="width: 210px" />
                        </div>
                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable ">库位数量</div>
                            <el-input type="text" disabled v-model="formData.Count" style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">小车数量</div>
                            <el-input type="text" disabled v-model="formData.CarCount" style="width: 210px" />
                        </div>
                    </div>
                    <CurrentTitle title="小车信息" line />
                    <div class="contentTable">
                        <div class="contentTable-search">
                            <div class="search-left">
                                <el-input type="text" v-model="keyword" placeholder="请输入关键字" style="width: 150px;" />
                                <div class="btn" @click="getTableData">查询</div>
                            </div>
                            <div class="search-right" v-if="title == '编辑'">
                                <div class="btn yellow" @click="handleEdit('修改')">修改</div>
                                <div :class="
                                tablelist.length >= this.formData.Count ? 'disable-btn' : 'btn green'"
                                    @click="handleEdit('新增')">新建</div>
                                <div class="btn grey" @click="handleDel()">删除</div>
                            </div>
                        </div>
                        <div class="contentTable-table">
                            <el-table :data="filterTabledata" border highlight-current-row
                                header-row-class-name="light-blue" row-class-name="high-light" height="100%"
                                width="100%" :style="{ 'font-size': '14px' }" ref="metable" :header-cell-style="{
                                    background: '#DCF0F9',
                                    color: '#4270E4',
                                    'border-left': '1px solid #cccccc',
                                    height: '50px',
                                    'font-size': '14px',
                                    padding: '0'
                                }" @row-click="handleRowClick">
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>
                                <el-table-column label="序号" type="index" width="80"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="小车号" prop="CarNo"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="小车类型" prop="RoadwayType"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="产品数量" prop="ProductCount" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column label="入库时间" prop="LastModificationTime" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column label="状态" prop="StatusDisplayName" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column label="出入库类型" prop="CreateTypeTypeDisplayName"
                                    :show-overflow-tooltip="true">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
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

        <AddRecordPop v-if="isEditShow" :title="Title" :seldata="SelectRow" :formData="formData"
            @EditPopCallBack="EditPopCallBack" />
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />

    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
import CurrentTitle from '../../components/public/currentTitle.vue';
import AddRecordPop from './addRecordPop.vue';
export default {
    props: ['title', 'data'],
    components: {
        CurrentTitle,
        AddRecordPop,
        TipPop,
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),
            formData: {},
            isEditShow: false,
            Title: '新增',
            keyword: '',
            SelectRow: null,
            tablelist: [],
            filterTabledata: []
        };
    },
    mounted() {
        this.formData = { ...this.data };
        this.getTableData()
    },
    methods: {
        tipCallBack(str) {
            if (str == 'yes') {
                this.$axios({
                    url: `/api/Mission/Delete/${this.SelectRow.Id}`,
                    method: 'DELETE',

                }).then((res) => {
                    if (res.data.code == 0) {
                        this.tipText = '删除成功';
                        this.isPopShow = true;
                        this.getTableData();
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
                    }
                });
            } else {
                this.isPopShow = false;
            }
            this.noCancel = true;
        },
        getTableData() {
            this.$axios({
                url: `/api/Mission/GetMissionList?roadwayCode=${this.formData.RoadwayCode}`,
                method: 'get',

            }).then((res) => {
                if (res.data.code == 0) {
                    this.tablelist = res.data.data;
                } else {
                    this.tablelist = []
                }
                this.getFilterData();
            });
        },
        getFilterData() {
            this.filterTabledata = this.tablelist.filter(_ => {
                return ((_.CarNo && _.CarNo.indexOf(this.keyword) >= 0)) ||
                    (_.RoadwayType && _.RoadwayType.indexOf(this.keyword) >= 0) ||
                    (_.StatusDisplayName && _.StatusDisplayName.indexOf(this.keyword) >= 0) ||
                    (_.CreateTypeTypeDisplayName && _.CreateTypeTypeDisplayName.indexOf(this.keyword) >= 0)
            });
            this.SelectRow = null;
        },
        handleClick(str) {
            this.$emit('xdEditPopCallBack', str, this.formData);
        },
        EditPopCallBack(str) {
            if (str) {
                this.tipText = str;
                this.isPopShow = true;
            }
            this.isEditShow = false;
            this.getTableData();
        },
        handleEdit(type) {
            if (this.tablelist.length >= this.formData.Count) {
                return
            }
            if (type == '修改' && !this.SelectRow) {
                this.tipText = '请选择修改项';
                this.isPopShow = true;
                return
            }
            this.Title = type;
            this.isEditShow = true;
        },
        handleDel() {
            if (!this.SelectRow) {
                this.tipText = '请选择删除项';
                this.isPopShow = true;
                return
            }
            this.tipText = `是否删除小车${this.SelectRow.CarNo}已入库信息？`;
            this.isPopShow = true;
            this.noCancel = false;
        },
        handleRowClick(row) {
            console.log("row", row);
            this.SelectRow = { ...row };
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
.inEdit {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 834px;
        height: auto;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 834px;
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

            .content1 {
                width: 100%;
                height: auto;

                .content1-line {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .content {
                        width: fit-content;
                    }


                }
            }

            .content2 {
                width: 100%;
                height: 300px;
                display: flex;

                .contentbody {
                    flex: 1;

                    .contentBox {
                        // width: 380px;
                        height: 264px;
                        background: rgba(244, 244, 244, 0.39);
                        border: 1px solid #dddddd;
                        margin-top: 14px;


                    }
                }
            }

            .content {
                display: flex;
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin: 10px 0;

                .contentLable,
                .contentLable2 {
                    width: 75px;
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


            }

            .contentTable {
                height: auto;
                padding: 0 16px 16px;
                box-sizing: border-box;
                background: #F4F4F4;
                border-radius: 1px;
                border: 1px solid #E0E0E0;
                margin-top: 5px;
                margin-bottom: 16px;

                .contentTable-search {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .search-left {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;


                    }

                    .search-right {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    }

                    .btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100px;
                        height: 30px;
                        background: #FFFFFF;
                        border-radius: 4px 4px 4px 4px;
                        border: 1px solid #4270E4;
                        color: #4270E4;
                        margin-left: 10px;
                        cursor: pointer;
                    }

                    .yellow {
                        border: 1px solid #FDAE22;
                        color: #FDAE22;
                    }

                    .green {
                        border: 1px solid #46BE05;
                        color: #46BE05;
                    }

                    .grey {
                        border: 1px solid #999999;
                        color: #999999;
                    }

                    .disable-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100px;
                        height: 30px;
                        background: #999999;
                        color: #fff;
                        border-radius: 4px 4px 4px 4px;
                        margin-left: 10px;
                    }

                }

                .contentTable-table {
                    width: 100%;
                    height: 494px;

                    .green {
                        color: #46BE05;
                    }

                    .yellow {
                        color: #FDAE22;
                    }
                }
            }

        }


        .popBtn {
            width: 100%;
            height: 60px;
            text-align: right;
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
.inEdit {
    textarea {
        resize: none !important;
    }

    .search-left {
        .el-input__inner {
            width: 150px;
            height: 30px;
            border: 1px solid #CCCCCC;
            border-radius: 0;
        }
    }
}
</style>