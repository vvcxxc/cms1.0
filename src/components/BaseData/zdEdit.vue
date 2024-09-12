<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drager>
                {{ title }}站点
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">


                <div class="content1">
                    <CurrentTitle title="站点信息" line />
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">站点编码</div>
                            <el-input type="text" v-model="formData.Code" style="width: 210px" />
                        </div>
                        <div class="content">
                            <div class="contentLable required">站点名称</div>
                            <el-input type="text" v-model="formData.Name" style="width: 210px" />
                        </div>

                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">业务类型</div>
                            <el-select v-model="formData.BusinessType" style="width: 210px" @change="changeType">
                                <el-option v-for="item in BusinessTypeList" :key="item.Value" :label="item.Text"
                                    :value="item.Value"></el-option>
                            </el-select>
                        </div>
                        <div class="content">
                            <div class="contentLable">备注</div>
                            <el-input type="text" v-model="formData.Remark" style="width: 210px" />
                        </div>

                    </div>
                    <div class="content1-line" v-if="formData.BusinessType == 1">
                        <div class="content">
                            <div class="contentLable required">关联巷道</div>
                            <el-select v-model="formData.RoadwayId" style="width: 210px" @change="changeValue">
                                <el-option v-for="item in RoadwayTypeList" :key="item.Id" :label="item.Name"
                                    :value="item.Id"></el-option>
                            </el-select>
                        </div>

                    </div>
                    <div class="content contentTable" v-if="formData.RoadwayId">
                        <div class="contentLable "></div>
                        <el-table :data="formData.StationProductDetails" border highlight-current-row
                            header-row-class-name="light-blue" row-class-name="high-light" height="100%" width="100%"
                            :style="{ 'font-size': '14px' }" ref="metable" :header-cell-style="{
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
                            <el-table-column label="产品类型" prop="ProductName"
                                :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="上料数量" prop="Count" :show-overflow-tooltip="true">
                                <template slot="header">上料数量
                                    <el-tooltip class="box-item" effect="dark" content="上料面板中产品类型对应需上料的数量"
                                        placement="bottom"><span class="image">
                                        </span> </el-tooltip>
                                </template>
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.Count" />
                                </template>
                            </el-table-column>
                            <el-table-column label="跳过是否补齐" prop="SkipGetNextProduct" :show-overflow-tooltip="true">
                                <template slot="header">跳过是否补齐 <el-tooltip class="box-item" effect="dark"
                                        content="是：上料面板中跳过产品后新产品补齐；否：上料面板中跳过产品后不使用新产品补齐" placement="bottom"><span
                                            class="image">
                                        </span> </el-tooltip></template>
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.SkipGetNextProduct">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="content1" v-if="IOVariableList.length">
                    <CurrentTitle title="变量配置" line />
                    <div class="content1-line">
                        <div class="content" v-if="IOVariableList.length >= 1">
                            <div class="contentLable required">
                                {{ IOVariableList[0].label }}
                            </div>
                            <el-input type="text" disabled v-model="formData[IOVariableList[0].value]"
                                style="width: 240px" />
                            <div style="position: relative">
                                <img :src="choose" alt="" @click="
    handleChoose(IOVariableList[0].value)
" />
                            </div>
                        </div>
                        <div class="content" v-if="IOVariableList.length >= 2">
                            <div class="contentLable2 required">
                                {{ IOVariableList[1].label }}
                            </div>
                            <el-input type="text" disabled v-model="formData[IOVariableList[1].value]"
                                style="width: 240px" />
                            <div style="position: relative">
                                <img :src="choose" alt="" @click="
    handleChoose(IOVariableList[1].value)
" />
                            </div>
                        </div>

                    </div>
                    <div class="content1-line" v-if="IOVariableList.length >= 3">
                        <div class="content">
                            <div class="contentLable required">
                                {{ IOVariableList[2].label }}
                            </div>
                            <el-input type="text" disabled v-model="formData[IOVariableList[2].value]"
                                style="width: 240px" />
                            <div style="position: relative">
                                <img :src="choose" alt="" @click="
    handleChoose(IOVariableList[2].value)
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
    data() {
        return {
            no: require('@/assets/images/no3.png'),
            choose: require('@/assets/images/icon_diji.png'),
            formData: {
                Code: '',
                Name: '',
                BusinessType: '',
                Remark: '',
                RoadwayId: '',
                StationProductDetails: [],
                IOVariableKey1: '',
                IOVariableKey2: '',
                IOVariableKey3: '',
                IOVariableKey4: '',
                IOVariableKey5: '',
                IOVariableKey6: '',
                IOVariableKey7: '',
                IOVariableKey8: ''
            },
            isVariableShow: false, // 选择变量弹窗
            chooseArr: [], // 变量类型
            chooseText: '', // 变量字段
            BusinessTypeList: [],
            RoadwayTypeList: [],
            IOVariableObj: {
                '上料': [{
                    label: '车号',
                    value: 'IOVariableKey1'
                },
                {
                    label: '放行就绪',
                    value: 'IOVariableKey2'
                },
                {
                    label: '放行信号',
                    value: 'IOVariableKey3'
                }],
                '升降机': [{
                    label: '车号',
                    value: 'IOVariableKey1'
                },
                {
                    label: '请求信号',
                    value: 'IOVariableKey7'
                },
                {
                    label: '小车信息',
                    value: 'IOVariableKey4'
                }],
                '入库缓存': [{
                    label: '车号',
                    value: 'IOVariableKey1'
                },
                {
                    label: '入库口排序信号',
                    value: 'IOVariableKey5'
                },
                ],
                '下料': [{
                    label: '车号',
                    value: 'IOVariableKey1'
                },
                {
                    label: '触发信号',
                    value: 'IOVariableKey6'
                },
                {
                    label: '放行信号',
                    value: 'IOVariableKey3'
                }],
                '下料缓存': [{
                    label: '车号',
                    value: 'IOVariableKey1'
                },
                {
                    label: '请求信号',
                    value: 'IOVariableKey7'
                },
                {
                    label: '小车信息',
                    value: 'IOVariableKey4'
                }],
                '空车插队': [{
                    label: '补充空车',
                    value: 'IOVariableKey8'
                }],
            },
            IOVariableList: []
        };
    },

    mounted() {
        console.log("this.data0", this.data);
        this.$axios({
            url: `/api/Option/GetBusinessType`,
            method: 'get',

        }).then((res) => {
            if (res.data.code == 0) {
                this.BusinessTypeList = res.data.data

                this.$axios({
                    url: `/api/RoadwayType/GetALlList`,
                    method: 'get',

                }).then((res) => {
                    if (res.data.code == 0) {

                        this.RoadwayTypeList = res.data.data
                        if (this.title === '修改') {
                            this.formData = {
                                ...this.data,
                                StationProductDetails: this.data.StationProductDetails.map(_ => ({
                                    ..._
                                })),
                                BusinessType: String(this.data.BusinessType)
                            };
                            this.changeType(this.data.BusinessType)
                            // this.changeValue(this.formData.RoadwayId); 不要这个，这个会清空StationProductDetails
                        }

                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;

                    }
                });

            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;

            }
        });
    },
    methods: {
        changeType(a) {
            let _obj = this.BusinessTypeList.find(_ => _.Value == a)
            this.IOVariableList = this.IOVariableObj[_obj.Text];
        },
        changeValue(a) {
            let _obj = this.RoadwayTypeList.find(_ => _.Id == a)
            this.formData.StationProductDetails = _obj.Products.map(_ => ({
                ProductId: _.Id,
                ProductName: _.Type,
                Count: '',
                SkipGetNextProduct: ''
            })) || [];
        },
        handleClick(str) {
            this.$emit('xdEditPopCallBack', str, this.formData);
        },

        // 选择变量
        handleChoose(val) {
            const obj = {
                IOVariableKey1: 'int',
                IOVariableKey2: 'int',
                IOVariableKey3: 'int',
                IOVariableKey4: 'int',
                IOVariableKey5: 'int',
                IOVariableKey6: 'int',
                IOVariableKey7: 'int',
                IOVariableKey8: 'int',
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
                this.chooseArr = ['不限', '二进制变量'];
            }
            this.chooseText = val;
            this.isVariableShow = true;
        },

        // 弹窗回调
        variableSelectCallBack(str, val) {
            console.log("str, val", str, val);
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
.zdeditPop {
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
            padding: 20px 40px;
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

                .required::before {
                    content: '*';
                    color: #f56c6c;
                    margin-right: 4px;
                }
            }

            .contentTable {
                height: 153px;

                .image {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url('../../assets/images/icon_problem.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    vertical-align: middle;
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
.zdeditPop {
    textarea {
        resize: none !important;
    }

    .el-table th,
    .el-table tr,
    .el-table tr.high-light:nth-child(even) {
        background-color: #fff;
    }
}
</style>