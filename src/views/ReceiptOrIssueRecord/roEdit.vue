<template>
    <div class="rweditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drager>
                查看
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">


                <div class="content1">
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable ">小车号</div>
                            <el-input type="text" disabled v-model="formData.CarNo" style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">小车类型</div>
                            <el-input type="text" disabled v-model="formData.RoadwayType"
                                style="width: 210px" />
                        </div>

                    </div>

                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable ">状态</div>
                            <el-input type="text" disabled v-model="formData.StatusDisplayName" style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">出入库时间</div>
                            <el-input type="text" disabled v-model="formData.LastModificationTime"
                                style="width: 210px" />
                        </div>

                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable ">出入库类型</div>
                            <el-input type="text" disabled v-model="formData.CreateTypeTypeDisplayName"
                                style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">产品数量</div>
                            <el-input type="text" disabled v-model="formData.ProductCount" style="width: 210px" />
                        </div>

                    </div>
                    <div class="contentTable">
                        <div class="contentTable-table">
                            <el-table :data="tablelist" border highlight-current-row header-row-class-name="light-blue"
                                row-class-name="high-light" height="100%" width="100%" :style="{ 'font-size': '14px' }"
                                ref="metable" :header-cell-style="{
                                    background: '#DCF0F9',
                                    color: '#4270E4',
                                    'border-left': '1px solid #cccccc',
                                    height: '50px',
                                    'font-size': '14px',
                                    padding: '0'
                                }">
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>
                                <el-table-column label="序号" type="index" width="80"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="序列号" prop="SEQ" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="产品类型" prop="ProductType"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="产品状态" prop="StatusDisplayName" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <span :class="scope.row.StatusDisplayName == '已上料' ? 'green' : 'yellow'">{{
                                                scope.row.StatusDisplayName
                                        }}</span>
                                    </template>
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

    </div>
</template>

<script>
import CurrentTitle from '../../components/public/currentTitle.vue';
export default {
    props: ['data'],
    components: {
        CurrentTitle,
    },
    data() {
        return {
            no: require('@/assets/images/no3.png'),
            formData: {},
            tablelist: []
        };
    },

    mounted() {
        this.formData = { ...this.data };
        this.$axios({
            url: `/api/Mission/GetInboundInfos/${this.data.Id}`,
            method: 'get',

        }).then((res) => {
            if (res.data.code == 0) {
                this.tablelist = res.data.data;
            } else {
                this.tablelist = []
            }
        });
    },
    methods: {
        handleClick(str) {
            this.$emit('xdEditPopCallBack', str, this.formData);
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
.rweditPop {
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
                    width: 85px;
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
                padding: 16px;
                box-sizing: border-box;
                background: #F4F4F4;
                border-radius: 1px 1px 1px 1px;
                border: 1px solid #E0E0E0;
                margin-bottom: 16px;

                .contentTable-table {
                    width: 100%;
                    height: 547px;

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
.rweditPop {
    textarea {
        resize: none !important;
    }
}
</style>