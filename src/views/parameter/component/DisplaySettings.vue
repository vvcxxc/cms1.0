<template>
    <div class="EditWorkStepsPop">
        <div class="myDialog" id="addDialog">
            <div class="popHeader">
                显示设置
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>

            <div class="popContent">

                <div class="table-content">
                    <div class="search-content">
                        <div class="query" @click="openChooseWorkStep">新增</div>
                        <div class="del" @click="delItem">删除</div>
                    </div>
                    <div class="table-box">
                        <el-table ref="myTable" highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                            :header-cell-style="{ 'text-align': 'center', background: '#5a6c98', color: '#fff' }"
                            :data="dataList" border height="100%" :row-class-name="tableRowClassName"
                            @row-click="rowClickFn">
                            <template slot="empty">
                                <span>暂无数据</span>
                            </template>
                            <el-table-column type="index" label="序号" width="60px" align='center'></el-table-column>
                            <el-table-column prop="WorkName" label="工序名称" align='center'
                                :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="StepName" label="合并工位" align='center'
                                :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column label="工位名称">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.ShowStepName" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>

                <el-button class="btn" @click="handleClick('yes')"
                    style="background: rgba(56, 109, 240);border: 1px solid #386df0;">
                    保存
                </el-button>
            </div>
        </div>
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
        <ChooseWorkStep v-if="ChooseWorkStepShow" @callback="ChooseWorkStepCallback" :nowList="dataList" />
    </div>
</template>

<script>
import TipPop from '../../../components/public/tipPop.vue';
import ChooseWorkStep from './ChooseWorkStep'

export default {
    props: [],
    components: {
        TipPop,
        ChooseWorkStep
    },
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            no: require('@/assets/images/no3.png'),
            ChooseWorkStepShow: false,
            dataList: [],
            curIdx: 0,

        };
    },

    mounted() {
        this.getData();
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex
        },
        rowClickFn(row) {
            this.curIdx = row.index
        },
        getData() {
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterReport/QueryProjectStepMergeConfig`,

            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data || [];
                    this.curIdx = 0;
                    if (this.dataList.length) {
                        this.$nextTick(() => {
                            this.$refs.myTable.setCurrentRow(this.dataList[0])
                        })
                    }
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg
                }
            })
        },
        delItem() {
            this.isPopShow = true;
            this.tipText = '是否删除选中项？'
            this.noCancel = false;
        },
        openChooseWorkStep() {
            this.ChooseWorkStepShow = true
        },
        ChooseWorkStepCallback(str, process, workstepsList) {
            if (str == 'yes') {
                if (process && workstepsList && workstepsList.length)
                    this.dataList.push({
                        Items: workstepsList,
                        MId: "00000000-0000-0000-0000-000000000000",
                        WId: process.WID,
                        IsNormal: true,
                        StepName: workstepsList.map(_ => _.StepName).join(';'),
                        WorkName: process.WorkName,
                        ShowStepName: ''
                    })
            }
            this.ChooseWorkStepShow = false
        },
        tipCallBack(str) {
            if (str == 'yes') {
                console.log(this.dataList, this.curIdx)
                this.dataList.splice(this.curIdx, 1)
                console.log(this.dataList)
                this.curIdx = 0;
                if (this.dataList.length) {
                    this.$nextTick(() => {
                        this.$refs.myTable.setCurrentRow(this.dataList[0])
                    })
                }
            }
            this.isPopShow = false;
            this.noCancel = true;
        },

        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `/api/ProcessParameterReport/SaveProjectStepMergeConfig`,
                    data: this.dataList.map(item => ({
                        ...item,
                        Items: item.Items.map(_ => ({
                            ID: _.ID || 0,
                            MId: _.MId || item.MId,
                            SID: _.SID,
                            StepName: _.StepName
                        }))
                    }))
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$emit('callback', str, '保存成功！');
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg
                    }
                })
            } else {
                this.$emit('callback', str);
            }
        },

    }
};
</script>

<style lang="scss" scoped>
.EditWorkStepsPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 1000px;
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
            overflow-y: auto;
            padding: 10px 20px;

            .table-content {
                width: 100%;
                height: 400px;
                border: 1px solid #999999;
                background: #f4f4f4;
                padding: 0 10px 5px;

                .search-content {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    height: 50px;


                    .query,
                    .del {
                        display: inline-block;
                        height: 40px;
                        width: 118px;
                        text-align: center;
                        line-height: 40px;
                        color: #ffffff;
                        border-radius: 5px;
                        font-weight: 600;
                        cursor: pointer;
                        background-color: #4270e4;
                        margin-left: 10px;
                    }

                    .del {
                        background-color: #999999;
                    }
                }

                .table-box {
                    width: 100%;
                    height: calc(100% - 60px);

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
.EditWorkStepsPop .el-input.is-disabled .el-input__inner {
    color: #606266;
}
</style>
