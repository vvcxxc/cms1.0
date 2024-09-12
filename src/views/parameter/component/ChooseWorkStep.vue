<template>
    <div class="ChooseWorkStepPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader">
                新增
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">
                <div class="content1">
                    <div class="table-title">
                        <div class="table-action">
                            工序名称：
                            <el-select style="width:150px" placeholder="请选择" @change="getWorkSteps(false)"
                                v-model="process">
                                <el-option v-for="item in processList" :key="item.WID" :label="item.WorkName"
                                    :value="item.WID">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="table-content">
                        <el-table ref="myTable" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                            :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="workStepsList" border
                            height="100%" @select="selectFn" @select-all="selectFn">
                            <template slot="empty">
                                <span>暂无数据</span>
                            </template>
                            <el-table-column type="selection" width="60px"></el-table-column>
                            <el-table-column type="index" label="序号" width="60px"></el-table-column>
                            <el-table-column prop="StepName" label="工位名称" :show-overflow-tooltip="true"></el-table-column>
                        </el-table>
                    </div>

                </div>
            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="handleClick('yes')"
                    style="margin-right: 40px;background: rgba(56, 109, 240);border: 1px solid #386df0;">
                    保存
                </el-button>
            </div>
        </div>
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
    </div>
</template>

<script>
import TipPop from '../../../components/public/tipPop.vue';

export default {
    props: ['nowList'],
    components: {
        TipPop,
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),

            processList: [],
            process: '',
            workStepsList: [],
            checkList: [],
            filterStr: ''

        };
    },

    mounted() {
        this.getProcess();
    },
    methods: {
        getProcess() {
            this.$axios({
                url: `/api/ProcessParameterConfigure/QueryWorkSections`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.processList = res.data.data
                    if (this.processList && this.processList.length) {
                        this.process = this.processList[0].WID
                    } else {
                        this.process = '';
                    }
                    this.getWorkSteps()
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        getWorkSteps() {
            this.$axios({
                url: `/api/ProcessParameterConfigure/QueryWorkSteps/${this.process}`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    let obj = this.nowList.find(_ => _.WId == this.process)
                    if (obj) {
                        this.workStepsList = res.data.data.filter(_ => !obj.Items.some(_2 => _2.SID == _.SID))
                    } else {
                        this.workStepsList = res.data.data
                    }
                    this.checkList = [];
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },
        tipCallBack(str) {
            if (str == 'yes') {
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
        },
        handleClick(str) {
            let _process = this.processList.find(_ => _.WID == this.process)
            if (str == 'yes' && _process) {
                if (this.checkList.length < 2) {
                    this.tipText = '请勾选两个及以上的工位！';
                    this.isPopShow = true;
                    return
                }
                this.$emit('callback', str, _process, this.checkList);
            } else {
                this.$emit('callback', str);
            }
        },
        selectFn(arr) {
            this.checkList = arr
        },

    }
};
</script>

<style lang="scss" scoped>
.ChooseWorkStepPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 420px;
        height: auto;
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
            height: auto;
            padding: 20px 30px;
            padding-bottom: 0;


            .content1 {
                width: 100%;
                height: auto;
                margin-bottom: 30px;


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

                        .mult {
                            background: #ea9328;
                        }

                        .cancel {
                            background: #999999;
                        }
                    }

                }




                .table-content {
                    width: 100%;
                    height: 300px;
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
                border: 1px solid #999999;
            }
        }
    }

}
</style>
<style lang="scss">
.ChooseWorkStepPop .el-input.is-disabled .el-input__inner {
    color: #606266;
}

// .virtual-cell-time-picker {
//     .el-time-spinner__wrapper {
//         width: 50% !important;
//     }

//     .el-scrollbar:nth-of-type(3) {
//         display: none !important;
//     }
// }
</style>
