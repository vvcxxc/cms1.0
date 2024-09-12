<template>
    <div class="xdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drager>
                {{ title }}巷道
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">


                <div class="content1">
                    <CurrentTitle title="巷道信息" line />
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">巷道编码</div>
                            <el-input type="text" v-model="formData.Code" style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable required">巷道名称</div>
                            <el-input type="text" v-model="formData.Name" style="width: 210px" />
                        </div>

                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">巷道类型</div>
                            <el-select v-model="formData.RoadwayTypeId" style="width: 210px">
                                <el-option v-for="item in xdList" :key="item.Id" :label="item.Name" :value="item.Id" />
                            </el-select>
                        </div>
                        <div class="content">
                            <div class="contentLable required">库位数量</div>
                            <el-input type="text" v-model="formData.Count" style="width: 210px" />
                        </div>

                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">属性</div>
                            <el-input type="text" v-model="PropertyName" style="width: 210px" disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">产品类型</div>
                            <el-input type="text" v-model="ProductName" style="width: 210px" disabled />
                        </div>

                    </div>
                    <div class="content">
                        <div class="contentLable">描述</div>
                        <el-input type="textarea" v-model="formData.Remark" :rows="4" style="width: 670px;" />
                    </div>
                </div>

                <div class="content1">
                    <CurrentTitle title="变量配置" line />

                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">
                                开启信号
                            </div>
                            <el-input type="text" v-model="formData.IOVariableKey1" style="width: 240px"
                                :disabled="true" />
                            <div style="position: relative">
                                <img :src="choose" alt="" @click="
                                    handleChoose('IOVariableKey1')
                                " />
                            </div>
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
    computed: {
        PropertyName() {
            let o = this.xdList.find(_ => _.Id == this.formData.RoadwayTypeId);
            if (o) {
                return o.PropertyName == 1 ? "实车" : "空车"
            } else {
                return '';
            }
        },
        ProductName() {

            let o = this.xdList.find(_ => _.Id == this.formData.RoadwayTypeId);
            console.log('o', o);
            if (o) {
                let str = '';
                o.ProductIds.map(_ => {
                    this.ProductList.map(_2 => {
                        if (o.Id == _2.Id) {
                            str = str + _2.Type + ';'
                        }
                    })
                });
                return str;
            }
            return '';
        }
    },
    data() {
        return {
            no: require('@/assets/images/no3.png'),
            choose: require('@/assets/images/icon_diji.png'),
            formData: {
                Code: '',
                Name: '',
                RoadwayTypeId: '',
                Count: '',
                Remark: '',
                IOVariableKey1: '',
                WarehouseAreaId: '',
            },
            isVariableShow: false, // 选择变量弹窗
            chooseArr: [], // 变量类型
            chooseText: '', // 变量字段
            xdList: [],
            ProductList: []
        };
    },
    created() {
        if (this.title === '修改') {
            this.formData = { ...this.data };
        }
        this.$axios({
            method: 'get',
            url: `/api/RoadwayType/GetALlList`,
        }).then((res) => {
            this.xdList = res.data.data || [];
        });
        this.$axios({
            method: 'get',
            url: `/api/Product/GetAllList`,
        }).then((res) => {
            this.ProductList = res.data.data || [];
        });
    },
    methods: {
        handleClick(str) {
            this.$emit('xdEditPopCallBack', str, this.formData);
        },

        // 选择变量
        handleChoose(val) {
            const obj = {
                IOVariableKey1: 'erjinzhi',
            };
            if (obj[val] == 'int') {
                this.chooseArr = [
                    '有符号8位整型',
                    '无符号8位整型',
                    '有符号16位整型',
                    '无符号16位整型',
                    '有符号32位整型',
                    '无符号32位整型',
                    '有符号64位整型',
                    '无符号64位整型',
                ];
            } else {
                this.chooseArr = ['不限', '二进制变量',];
            }
            this.chooseText = val;
            this.isVariableShow = true;
        },

        // 弹窗回调
        variableSelectCallBack(str, val) {
            this.isVariableShow = false;
            if (str == 'yes') {
                this.formData[this.chooseText] = val.Name;
            }
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
        width: 834px;
        height: 586px;
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
            padding: 20px 40px;
            padding-bottom: 0;

            .content1 {
                width: 100%;
                height: 330px;

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