<template>
    <div class="wmeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drager>
                {{ title }}
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <div class="content">
                    <div class="contentLable required">车身号</div>
                    <el-input type="text" v-model="formData.SEQ" style="width: 312px" :disabled="true" />
                </div>
                <div class="content">
                    <div class="contentLable required">过程条码</div>
                    <el-input type="text" v-model="formData.ProcessBarcode" style="width: 312px" :disabled="true" />
                </div>
                <div class="content">
                    <div class="contentLable required">产品状态</div>
                    <el-select v-model="formData.Status" placeholder="" style="width: 312px">
                        <el-option v-for="item in option" :label="item.Text" :value="item.Value"
                            :key="item.Value"></el-option>
                    </el-select>
                </div>
                <div class="content">
                    <div class="contentLable required">绑定小车</div>
                    <el-input type="text" v-model="formData.CarNo" style="width: 312px" :disabled="true" />
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
    props: ['title', 'data'],
    data() {
        return {
            no: require('@/assets/images/no3.png'),
            formData: {
                SEQ: '',
                ProcessBarcode: '',
                CarNo: '',
                Status: '',
            },
            option: [],
        };
    },
    mounted() {
        this.$axios({
            method: 'get',
            url: '/api/Option/GetProductStatus',
        }).then((res) => {
            if (res.data.code == 0) {
                this.option = res.data.data;
                this.formData = {
                    ...this.data,
                    Status: String(this.data.Status)
                };
            } else {
                this.isPopShow = true;
                this.tipText = res.data.msg;
                this.noCancel = true;
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
.wmeditPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 463px;
        height: 385px;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 463px;
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
            height: calc(100% - 150px);

            .content {
                display: flex;
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin: 20px 0;

                .contentLable {
                    width: 105px;
                    text-align: right;
                    font-size: 14px;
                    color: #363636;
                    margin-right: 10px;
                }

                .required::before {
                    content: '*';
                    color: #f56c6c;
                    margin-right: 4px;
                }
            }

            .content:first-child {
                margin-top: 30px;
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