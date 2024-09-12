<template>
    <div class="addRecordPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader" >
                {{ title }}库区记录
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <div class="content1">
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable ">小车号</div>
                            <el-input type="text" v-model="data.CarNo" style="width: 210px" :disabled="title == '修改'"
                                @blur="searchData" />
                        </div>
                        <div class="content">
                            <div class="contentLable ">小车类型</div>
                            <el-select v-model="data.RoadwayTypeId" style="width: 210px"
                                :disabled="title == '修改' || disabled" @change="SearchTypeList">
                                <el-option v-for="item in RoadwayTypeList" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="content1-line" v-if="title == '新增' && typeList.length">
                        <div class="content">
                            <div class="contentLable ">{{ typeList[0].Type || '产品类型1' }}</div>
                            <el-input type="text" v-model="data.ProductCount1" style="width: 210px"
                                :disabled="disabled" />
                            <div class="unit">件</div>
                        </div>
                        <div class="content">
                            <div class="contentLable ">{{ typeList.length > 1 ? typeList[1].Type : '产品类型2' }}</div>
                            <el-input type="text" v-model="data.ProductCount2" style="width: 210px"
                                :disabled="disabled || typeList.length < 2" />
                            <div class="unit">件</div>
                        </div>
                    </div>
                    <div class="content1-line" v-if="title == '修改'">
                        <div class="content">
                            <div class="contentLable ">产品数量</div>
                            <el-input type="text" v-model="data.ProductCount" style="width: 210px" disabled />

                        </div>
                        <div class="content">
                            <div class="contentLable ">入库时间</div>
                            <el-date-picker popper-class="virtual-cell-time-picker" :popper-append-to-body='false'
                                v-model="data.InboundTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                @change="TimeChange" style="width: 210px"></el-date-picker>
                        </div>
                    </div>
                    <div class="content1-line" v-if="title == '新增'">
                        <div class="content">
                            <div class="contentLable ">入库时间</div>
                            <el-date-picker popper-class="virtual-cell-time-picker" :popper-append-to-body='false'
                                v-model="data.InboundTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                @change="TimeChange" style="width: 210px"></el-date-picker>
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
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />

    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
export default {
    props: ['title', 'seldata', 'formData'],
    components: {
        TipPop,
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),
            data: {
                CarNo: '',
                RoadwayTypeId: '',
                ProductCount1: '',
                ProductCount2: '',
                ProductCount: '',//ProductCount1+ProductCount2，后端只要总数
                InboundTime: ''
            },
            RoadwayTypeList: [],
            initRoadwayTypeList: [],
            disabled: false,
            typeList: [],
        };
    },

    mounted() {
        this.$axios({
            url: `/api/RoadwayType/GetALlList`,
            method: 'get',

        }).then((res) => {
            if (res.data.code == 0) {
                let temp = res.data.data.filter(_ =>
                    _.PropertyName == 2).map((_) => ({
                        value: _.Id,
                        label: _.Name,
                    }))
                    console.log(temp,this.formData.RoadwayTypeId );
                if (!temp.some(_ => _.value == this.formData.RoadwayTypeId)) {
                    temp.push({
                        value: this.formData.RoadwayTypeId,
                        label: this.formData.RoadwayTypeName
                    })
                }
                this.RoadwayTypeList = temp;
                this.initRoadwayTypeList = res.data.data;
                if (this.title == '修改') {
                    this.data.CarNo = this.seldata.CarNo;
                    this.data.RoadwayTypeId = this.seldata.RoadwayTypeId;
                    this.data.ProductCount = this.seldata.ProductCount;
                    this.data.InboundTime = this.seldata.LastModificationTime;
                }
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;
            }
        });
    },

    methods: {
        searchData() {
            this.disabled = false;
            this.data.RoadwayTypeId = '';
            this.data.ProductCount1 = '';
            this.data.ProductCount2 = '';
            this.typeList = [];
            this.$axios({
                url: `/api/Car/Check`,
                method: 'post',
                data: {
                    carNo: this.data.CarNo,
                    RoadwayTypeId: this.formData.RoadwayTypeId
                }

            }).then((res) => {
                if (res.data.code == 0 && res.data.data && res.data.data.RoadwayTypeId) {
                    if (this.RoadwayTypeList.some(_ => _.value == res.data.data.RoadwayTypeId)) {
                        this.data.RoadwayTypeId = res.data.data.RoadwayTypeId;
                        if (res.data.data.Products.length) {
                            this.data.ProductCount1 = res.data.data.Products[0].Count;
                        }
                        if (res.data.data.Products.length > 1) {
                            this.data.ProductCount2 = res.data.data.Products[1].Count;
                        }
                        this.typeList = res.data.data.Products;
                        this.disabled = true;
                    }
                } else if (res.data.code != 0) {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        SearchTypeList() {
            let obj = this.initRoadwayTypeList.find(_ => _.Id == this.data.RoadwayTypeId);
            this.typeList = obj ? (obj.Products || []) : [];
        },
        TimeChange() {
            // if (this.data.InboundTime) {
            //     let arr = this.data.InboundTime.split(':');
            //     if (arr[arr.length - 1] != '00') {
            //         arr[arr.length - 1] = '00';
            //         this.data.InboundTime = arr.join(':')
            //     }
            // }

        },
        tipCallBack(str) {
            if (str == 'yes') {
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        handleClick(str) {
            if (str == 'yes') {
                if (this.title == '新增') {
                    if (!this.data.CarNo) {
                        this.tipText = '请输入小车号';
                        this.isPopShow = true;
                        return;
                    }
                    if (!this.data.RoadwayTypeId) {
                        this.tipText = '请选择小车类型';
                        this.isPopShow = true;
                        return;
                    }
                    if ((this.data.ProductCount1 && !this.isPositiveInteger(this.data.ProductCount1)) || (this.data.ProductCount2 && !this.isPositiveInteger(this.data.ProductCount2))) {
                        this.tipText = '产品数量请输入整数';
                        this.isPopShow = true;
                        return;
                    }
                    if (!this.data.InboundTime) {
                        this.tipText = '入库时间为空！';
                        this.isPopShow = true;
                        return;
                    }
                    if (!this.data.ProductCount1) {
                        this.data.ProductCount1 = 0;
                    }
                    if (!this.data.ProductCount2) {
                        this.data.ProductCount2 = 0;
                    }
                    let _arr = [];
                    if (this.typeList.length) {
                        _arr.push({
                            Id: this.typeList[0].Id,
                            Count: this.data.ProductCount1
                        })
                    }
                    if (this.typeList.length > 1) {
                        _arr.push({
                            Id: this.typeList[1].Id,
                            Count: this.data.ProductCount2
                        })
                    }
                    this.$axios({
                        url: `/api/Mission/Create`,
                        method: 'post',
                        data: {
                            CarNo: this.data.CarNo,
                            RoadwayCode: this.formData.RoadwayCode,
                            RoadwayTypeId: this.data.RoadwayTypeId,
                            ProductItems: _arr,
                            InboundTime: this.data.InboundTime,
                        }
                    }).then((res) => {
                        if (res.data.code == 0) {

                            this.$emit('EditPopCallBack', '新增成功');
                        } else {
                            this.tipText = res.data.msg;
                            this.isPopShow = true;
                        }
                    });
                } else if (this.title == '修改') {
                    this.$axios({
                        url: `/api/Mission/Update/${this.seldata.Id}`,
                        method: 'PUT',
                        data: {
                            InboundTime: this.data.InboundTime,
                        }
                    }).then((res) => {
                        if (res.data.code == 0) {
                            this.$emit('EditPopCallBack', '修改成功');
                        } else {
                            this.tipText = res.data.msg;
                            this.isPopShow = true;
                        }
                    });
                }

            } else {
                this.$emit('EditPopCallBack');
            }
        },


    },
    directives: {
        dragAdd: function (el) {
            el.onmousedown = e => {
                let dragBox = document.getElementById('addDialog');
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
.addRecordPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

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
                        position: relative;

                        .unit {
                            width: 34px;
                            height: 100%;
                            position: absolute;
                            right: 0;
                            top: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #999999;
                            background: #F4F4F4;
                            border: 1px solid #E0E0E0;
                        }
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
// .virtual-cell-time-picker {
//     .el-time-spinner__wrapper {
//         width: 50% !important;
//     }

//     .el-scrollbar:nth-of-type(3) {
//         display: none !important;
//     }
// }
</style>
