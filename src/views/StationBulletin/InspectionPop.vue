<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                查看点巡检任务内容
                <img :src="require('../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>
            <div class="popContent">
                <CurrentTitle title="点检信息" :line="true" />
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">计划名称</div>
                        <el-tooltip popper-class="atooltip" effect="dark" :content="formData.Name" placement="top-start">
                            <div class="contentVal">{{ formData.Name }}</div>
                        </el-tooltip>
                    </div>
                    <div class="content">
                        <div class="contentLable">巡检人</div>
                        <div class="contentVal">{{ formData.Executor }}</div>
                    </div>
                    <div class="content">
                        <div class="contentLable">开始时间</div>
                        <div class="contentVal">{{ formData.StartTime }}</div>
                    </div>
                    <div class="content">
                        <div class="contentLable">结束时间</div>
                        <div class="contentVal">{{ formData.EndTime }} </div>
                    </div>

                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">任务执行内容</div>
                        <div class="contentAreaVal">{{ formData.Remarks }} </div>
                    </div>

                </div>
                <CurrentTitle title="巡检明细" :line="true" />
                <template v-for="item in formData.Devices">
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable">设备名称</div>
                            <div class="contentVal">{{ item.DeviceName }} </div>
                        </div>
                        <div class="content">
                            <div class="contentLable">巡检项目</div>
                            <div class="contentVal">{{ item.StandardName }} </div>
                        </div>
                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="ul-title">点检项目</div>
                            <div class="contentUl">
                                <template v-for="item2 in item.Projects">
                                    <div class="contentLi" v-if="item2.Type == 1">
                                        <div class="li-title">
                                            <div class="title-icon">{{ item2.Number }}</div>项目名称： {{ item2.ProjectName }}
                                        </div>
                                        <div class="li-content">
                                            <div class="liLable">上限</div>
                                            <div class="liVal">{{ item2.Upper }} </div>
                                            <div class="liLable">下限</div>
                                            <div class="liVal">{{ item2.Lower }} </div>
                                            <div class="liLable">参考值</div>
                                            <div class="liVal">{{ item2.Reference }} </div>
                                            <div class="liLable">实际值</div>
                                            <div class="liVal">{{ item2.Right }} </div>
                                        </div>
                                    </div>

                                    <div class="contentLi" v-if="item2.Type == 2 || item2.Type == 4">
                                        <div class="li-title">
                                            <div class="title-icon">{{ item2.Number }}</div> 项目名称： {{ item2.ProjectName }}
                                        </div>
                                        <div class="li-content">
                                            {{ item2.Remarks }}
                                        </div>
                                        <div class="li-content">
                                          <el-radio-group :disabled="true">   <!-- v-model="item2.Right" 不用显示选啥，只看明细-->
                                                <el-radio v-for="item3 in item2.Reference.split('|')" :label="item3">{{
                                                    item3
                                                }}</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                    <div class="contentLi" v-if="item2.Type == 3">
                                        <div class="li-title">
                                            <div class="title-icon">{{ item2.Number }}</div> 项目名称： {{ item2.ProjectName }}
                                        </div>
                                        <div class="li-content">
                                            <div class="li-contentLable">情况描述</div>
                                            <div class="li-contentVal">{{ item2.Right }} </div>
                                        </div>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="popBtn">
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
import CurrentTitle from '../../components/public/currentTitle.vue';
import TipPop from '../../components/public/tipPop.vue';

export default {
    props: ['WorkName'],
    components: {
        CurrentTitle,
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                ID: '',
                Number: 0,
                Name: '',
                StartTime: '',
                EndTime: '',
                Remarks: '',
                Status: 0,
                Executor: '',
                DevicesStr: '',
                Devices: [
                    // {
                    //     DeviceName: '',
                    //     StandardName: '',
                    //     Projects: [
                    //         {
                    //             PID:'',
                    //             DID:'',
                    //             ProjectName: '',
                    //             Type: 0,
                    //             Upper:'',
                    //             Lower: '',
                    //             Reference: '',
                    //             Right: '',
                    //             Remarks: '',
                    //             Answer: null,
                    //             Number:'',
                    //         }
                    //     ]
                    // }
                ],
                Foreground: '',
                FinishTime: '',
                CloseRemarks: null
            },
        };
    },

    mounted() {
        if (!this.WorkName) {
            this.$emit('callback', '当前无工序');
            return
        }
        this.$axios({
            method: 'post',
            url: `/api/PointInspectionManage/PointInspectionManage_GstLastInfo?deviceName=${this.WorkName}`,
        }).then(res => {
            if (res.data.code === 0) {
                this.formData = {
                    ...res.data.data
                }
                console.log(this.formData)
            } else {
                this.$emit('callback', res.data.msg);
            }
        })

    },

    methods: {
        changeUnit(num) {
            switch (num) {
                case 1:
                    return '小时';
                case 2:
                    return '天';
                case 3:
                    return '周';
                case 4:
                    return '月';
                default:
                    return num;
            }
        },
        tipCallBack(str) {
            if (str == 'yes') {

            }
            this.isTipShow = false;
            this.noCancel = true;
        },


        handleClick() {
            this.$emit('callback');
        },
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
        width: 1200px;
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

        .popContent {
            width: 100%;
            height: auto;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;

            .content1-line {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                .content {
                    display: flex;
                    width: fit-content;
                    line-height: 40px;
                    margin: 5px 0;

                    .contentLable {
                        width: 90px;
                        text-align: right;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
                    }

                    .li-contentLable {
                        width: fit-content;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
                    }

                    .ul-title {
                        width: 90px;
                        text-align: right;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
                        line-height: 1.2;
                    }

                    .contentVal {
                        border: 1px solid #c2c2c2;
                        width: 180px;
                        height: 40px;
                        line-height: 40px;
                        padding-left: 5px;
                        box-sizing: border-box;
                        color: #363636;
                        background: #fdfcfc;
                        white-space: nowrap; //不支持换行
                        overflow: hidden; //隐藏多出部分文字
                        text-overflow: ellipsis; //用省略号代替多出部分文字

                    }

                    .li-contentVal {
                        border: 1px solid #c2c2c2;
                        width: fit-content;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 15px;
                        box-sizing: border-box;
                        color: #363636;
                        background: #fdfcfc;
                    }

                    .contentAreaVal {
                        border: 1px solid #c2c2c2;
                        width: 1020px;
                        min-height: 40px;
                        height: auto;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-left: 5px;
                        box-sizing: border-box;
                        color: #363636;
                        background: #fdfcfc;
                    }

                    .contentUl {

                        .contentLi {
                            padding: 5px 0;
                            border-bottom: 1px solid #c2c2c2;

                            .li-title {
                                height: 20px;
                                display: flex;
                                align-items: center;

                                .title-icon {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 16px;
                                    height: 16px;
                                    font-size: 14px;
                                    border-radius: 8px;
                                    background: #386df0;
                                    color: #ffffff;
                                    margin-right: 10px;
                                }
                            }

                            .li-content {
                                display: flex;
                                align-items: center;

                                .liLable {
                                    font-size: 14px;
                                    color: #363636;
                                    margin-right: 10px;
                                }

                                .liVal {
                                    border: 1px solid #c2c2c2;
                                    width: 80px;
                                    height: 30px;
                                    display: flex;
                                    align-items: center;
                                    padding-left: 5px;
                                    box-sizing: border-box;
                                    color: #363636;
                                    background: #fdfcfc;
                                    margin-right: 10px;
                                }
                            }
                        }

                    }

                }

            }


            .flex-box {
                width: 100%;
                height: 300px;
                display: flex;

                .flex-l {
                    flex: 3;
                    height: 100%;
                    margin-right: 10px;
                }

                .flex-r {
                    flex: 2;
                    height: 100%;
                }

                .table-title {

                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .table-action {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;

                        .action-btn {
                            width: 80px;
                            height: 34px;
                            background: #386df0;
                            border-radius: 4px;
                            font-size: 16px;
                            color: #ffffff;
                            margin-left: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }

                        .cancel {
                            background: #999999;
                        }
                    }

                }

                .table {
                    width: 100%;
                    height: calc(100% - 50px);
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
.zdeditPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>