<template>
    <div class="xdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drag>
                选择锅组
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">


                <div class="content1">
                    <CurrentTitle title="巷道信息" line />
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable ">选中订单</div>
                            <el-input type="text" v-model="formData.OrderNo" disabled style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">计划号</div>
                            <el-input type="text" v-model="formData.PlanNo" disabled style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">生产锅组</div>
                            <el-select v-model="formData.BoilerGroup" style="width: 210px">
                                <el-option v-for="item in optionList" :key="item.Value" :label="item.Text"
                                    :value="item.Value" />
                            </el-select>
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
export default {
    props: ['data'],
    components: {
    },

    data() {
        return {
            no: require('@/assets/images/no3.png'),
            choose: require('@/assets/images/icon_diji.png'),
            formData: {
                OrderNo: '',
                PlanNo:'',
                BoilerGroup: '',
                OrderId: '',
            },
            optionList: []

        };
    },
    created() {

        this.$axios
            .get(
                `/api/BoilerVoucher/GetBoilerGroup`,
            )
            .then(res => {
                if (res.data.code == 0) {
                    this.optionList = res.data.data;
                    this.formData.OrderNo = this.data.OrderNo;
                    this.formData.OrderId = this.data.Id;
                    this.formData.PlanNo = this.data.PlanNo;
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })
    },
    methods: {
        handleClick(str) {
             this.$emit('handleClick', str, this.formData,this.optionList);
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
.xdeditPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 400px;
        height: 340px;
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
            height: calc(100% - 120px);
            padding: 20px 40px;
            padding-bottom: 0;

            .content1 {
                width: 100%;
                height: auto;

                .content1-line {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;

                    .content {
                        width: fit-content;
                    }
                }
            }


            .content {
                display: flex;
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin: 10px 0;

                .contentLable {
                    width: 75px;
                    text-align: right;
                    font-size: 14px;
                    color: #363636;
                    margin-right: 10px;
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
.xdeditPop {
    textarea {
        resize: none !important;
    }
}
</style>