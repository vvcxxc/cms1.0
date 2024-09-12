<template>
    <div class="editPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drager>
                {{ title }}产品类型
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <div class="content">
                    <div class="contentLable  ">产品编码</div>
                    <el-input type="text" v-model="formData.Code" style="width: 660px" />
                </div>
                <div class="content">
                    <div class="contentLable  ">产品类型</div>
                    <el-input type="text" v-model="formData.Type" style="width: 660px" />
                </div>
                <div class="content">
                    <div class="contentLable">备注</div>
                    <el-input type="textarea" v-model="formData.Remark" :rows="4" style="width: 660px" />
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

        <variable-select v-if="isVariableShow" :data="chooseArr" @variableSelectCallBack="variableSelectCallBack" />
    </div>
</template>

<script>
import CurrentTitle from '../public/currentTitle.vue';
import VariableSelect from '../public/variableSelect.vue';
export default {
    props: ['title', 'data'],
    components: {
        CurrentTitle,
        VariableSelect,
    },
    data() {
        return {
            no: require('@/assets/images/no3.png'),
            choose: require('@/assets/images/icon_diji.png'),
            formData: {
                Code: '',
                Type: '',
                Remark: '',
                Id: ''
            },
            isVariableShow: false, // 选择变量弹窗
            chooseArr: [], // 变量类型
            chooseText: '', // 变量字段
        };
    },
    created() {
        if (this.title === '修改') {
            this.formData = { ...this.data };
        }
    },
    methods: {
        handleClick(str) {
            this.$emit('xdEditPopCallBack', str, this.formData);
        },
        // 弹窗回调
        variableSelectCallBack(str, val) {
            this.isVariableShow = false;
            if (str == 'yes') {
                this.formData[this.chooseText] = val.Name;
            }
        },
    }, directives: {
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
.editPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 463px;
        height: 448px;
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
            padding: 20px;
            padding-bottom: 0;




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

                img {
                    width: 38px;
                    height: 38px;
                    position: absolute;
                    top: 2px;
                    right: 0;
                    cursor: pointer;
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