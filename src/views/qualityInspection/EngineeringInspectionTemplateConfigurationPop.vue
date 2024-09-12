<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                工程检查模板配置
                <img
                    :src="require('../../assets/images/no.png')"
                    alt=""
                    @click="handleClick"
                    class="close"
                />
            </div>

            <div class="popContent">
                <div class="table-flex">
                    <div class="table-item">
                        <div class="table-title">
                            <div class="title">
                                <CurrentTitle title="检查项" />
                            </div>

                            <div class="label-add" @click="addLeft">
                                添加
                            </div>
                            <div class="label-edit" @click="delLeft">
                                删除
                            </div>
                        </div>

                        <div class="table">
                            <el-table
                                ref="myTable"
                                :data="dataList"
                                border
                                header-row-class-name="light-blue"
                                :row-class-name="tableRowClassName"
                                height="100%"
                                width="100%"
                                :header-cell-style="{
                                    background: '#5a6c98',
                                    color: '#ffffff',
                                    'border-left': '1px solid #cccccc',
                                    height: '50px',
                                    padding: '0'
                                }"
                                highlight-current-row
                                @row-click="processClick"
                            >
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>

                                <el-table-column
                                    label="序号"
                                    type="index"
                                    width="80"
                                ></el-table-column>
                                <el-table-column label="检查项" prop="Name">
                                    <template slot-scope="scope">
                                        <el-input
                                            @change="haveChangeFn"
                                            v-model="scope.row.Name"
                                            maxLength="300"
                                        />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="table-item2">
                        <div class="table-title">
                            <div class="title">
                                <CurrentTitle title="工程检查配置" />
                            </div>
                        </div>

                        <div class="table">
                            <div class="item-label">
                                <div class="label-add" @click="addPro">
                                    添加项目
                                </div>
                                <div class="label-edit" @click="delPro">
                                    删除项目
                                </div>
                            </div>
                            <el-table
                                ref="myTable2"
                                :data="
                                    dataList[leftIdx]
                                        ? dataList[leftIdx].Items || []
                                        : []
                                "
                                border
                                header-row-class-name="light-blue"
                                :style="{ height: 'auto' }"
                                width="100%"
                                :header-cell-style="{
                                    background: '#5a6c98',
                                    color: '#ffffff',
                                    'border-left': '1px solid #cccccc',
                                    height: '50px',
                                    padding: '0'
                                }"
                                highlight-current-row
                                :row-class-name="tableRowClassName"
                                @row-click="clickPro"
                            >
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>

                                <el-table-column
                                    label="操作"
                                    width="100"
                                    prop="Number"
                                >
                                    <template slot-scope="scope">
                                        <img
                                            v-if="
                                                scope.$index !=
                                                    dataList[leftIdx].Items
                                                        .length -
                                                        1
                                            "
                                            @click="
                                                sortChange(scope.row, 'down')
                                            "
                                            class="action-img"
                                            src="../../assets/images/down.png"
                                        />
                                        <img
                                            v-if="scope.$index != 0"
                                            @click="sortChange(scope.row, 'up')"
                                            class="action-img"
                                            src="../../assets/images/up.png"
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="序号"
                                    type="index"
                                    width="80"
                                ></el-table-column>

                                <el-table-column label="管理项目" width="120">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.ItemName"
                                            maxLength="300"
                                            @change="haveChangeFn"
                                        />
                                    </template>
                                </el-table-column>

                                <el-table-column label="管理内容">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.ItemContent"
                                            maxLength="300"
                                            @change="haveChangeFn"
                                        />
                                    </template>
                                </el-table-column>

                                <el-table-column label="管理值">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.ItemVelue"
                                            maxLength="300"
                                            @change="haveChangeFn"
                                        />
                                    </template>
                                </el-table-column>

                                <el-table-column label="类型" width="120">
                                    <template slot-scope="scope">
                                        <el-select
                                            v-model="scope.row.ItemType"
                                            @change="changeType(scope.row)"
                                        >
                                            <el-option
                                                label="文本"
                                                value="文本"
                                            ></el-option>
                                            <el-option
                                                label="数值"
                                                value="数值"
                                            ></el-option>

                                            <el-option
                                                label="单选"
                                                value="单选"
                                            ></el-option>
                                            <el-option
                                                label="多选"
                                                value="多选"
                                            ></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column label="参考值">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.ReferenceValue"
                                            :disabled="
                                                scope.row.ItemType == '文本' ||
                                                    scope.row.ItemType == '数值'
                                            "
                                            @change="haveChangeFn"
                                        />
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    label="测量（仪器/方法）"
                                    width="150"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.MeasureMethod"
                                            maxLength="300"
                                            @change="haveChangeFn"
                                        />
                                    </template>
                                </el-table-column>

                                <el-table-column label="测量频率">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.MeasureFrequency"
                                            maxLength="300"
                                            @change="haveChangeFn"
                                        />
                                    </template>
                                </el-table-column>

                                <el-table-column label="记录频率" width="120">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.RecordFrequency"
                                            maxLength="300"
                                            @change="haveChangeFn"
                                        />
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
                <el-button
                    class="btn"
                    @click="handleClick('yes')"
                    style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                "
                >
                    确定
                </el-button>
            </div>
        </div>
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
import CurrentTitle from '../../components/public/currentTitle.vue';

export default {
    props: ['title', 'selectItem'],
    components: {
        TipPop,
        CurrentTitle
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            cancleType: 0,
            jumpRow: 0,
            dataList: [],
            leftIdx: 0,
            rightIdx: 0,
            rightName: '',
            haveChange: false
        };
    },

    mounted() {
        this.queryProcessList();
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            row.$index = rowIndex;
        },
        addLeft() {
            this.dataList.push({
                Id: 0,
                Name: '',
                Items: [
                    {
                        Id: 0,
                        SetId: 0,
                        ItemName: '',
                        ItemCode: '',
                        ItemType: '单选',
                        ReferenceValue: '',
                        MeasureMethod: '',
                        MeasureFrequency: '',
                        RecordFrequency: ''
                    }
                ]
            });
            this.haveChangeFn();
        },
        delLeft() {
            this.isTipShow = true;
            this.tipText = `是否确删除该检查项？`;
            this.noCancel = false;
            this.cancleType = 3;
        },
        processClick(row, el) {
            this.leftIdx = row.$index;
        },
        changeType(row) {
            if (row.ItemType == '文本' || row.ItemType == '数值') {
                row.ReferenceValue = '';
            }
            this.haveChangeFn();
        },

        delPro() {
            console.log(
                this.dataList[this.leftIdx].Items[this.rightIdx],
                this.rightIdx
            );
            if (
                !this.dataList[this.leftIdx].Items.length ||
                !this.dataList[this.leftIdx].Items[this.rightIdx]
            ) {
                this.isTipShow = true;
                this.tipText = `请选择配置！`;
                return;
            }
            this.isTipShow = true;
            this.tipText = `是否确删除该配置？`;
            this.noCancel = false;
            this.cancleType = 1;
        },
        addPro() {
            this.dataList[this.leftIdx].Items.push({
                Id: 0,
                SetId: this.dataList[this.leftIdx].Id,
                ItemName: '',
                ItemCode: '',
                ItemType: '单选',
                ReferenceValue: '',
                MeasureMethod: '',
                MeasureFrequency: '',
                RecordFrequency: ''
            });
            this.haveChangeFn();
        },

        clickPro(row) {
            this.rightIdx = row.$index;
        },
        sortChange(row, sortType) {
            let idx = row.$index;
            if (
                (idx == 0 && sortType == 'up') ||
                (this.dataList[this.leftIdx].Items.length - 1 == idx &&
                    sortType == 'down')
            ) {
                return;
            }
            let _obj = this.dataList[this.leftIdx].Items[idx];
            let _obj2;
            if (sortType == 'up') {
                _obj2 = JSON.parse(
                    JSON.stringify(this.dataList[this.leftIdx].Items[idx - 1])
                );
                this.dataList[this.leftIdx].Items[idx - 1] = JSON.parse(
                    JSON.stringify(_obj)
                );
            } else {
                _obj2 = JSON.parse(
                    JSON.stringify(
                        this.dataList[this.leftIdx].Items[Number(idx) + 1]
                    )
                );
                this.dataList[this.leftIdx].Items[idx + 1] = JSON.parse(
                    JSON.stringify(_obj)
                );
            }
            this.dataList[this.leftIdx].Items[idx] = _obj2;

            this.haveChangeFn();
        },

        haveChangeFn() {
            this.haveChange = true;
        },
        queryProcessList() {
            this.$axios
                .get(
                    `/api/InspectionReport/QueryInspectionTemplate?isCreate=${true}&reportId=`
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.dataList =
                            res.data.data.map(item => ({
                                ...item,
                                Items:
                                    item.Items && item.Items.length
                                        ? item.Items
                                        : [
                                              {
                                                  Id: 0,
                                                  ItemName: '',
                                                  ItemCode: '',
                                                  ItemType: '单选',
                                                  ReferenceValue: '',
                                                  MeasureMethod: '',
                                                  MeasureFrequency: '',
                                                  RecordFrequency: ''
                                              }
                                          ]
                            })) || [];
                        if (this.dataList.length) {
                            this.leftIdx = 0;
                            this.$nextTick(() => {
                                this.$refs.myTable.setCurrentRow(
                                    this.dataList[0]
                                );
                            });
                        }
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
        },
        tipCallBack(str) {
            this.isTipShow = false;
            this.noCancel = true;

            if (str == 'yes') {
                if (this.cancleType == 1) {
                    this.dataList[this.leftIdx].Items.splice(this.rightIdx, 1);
                    this.rightIdx = 0;
                    this.haveChangeFn();
                    this.$nextTick(() => {
                        this.$refs.myTable2.setCurrentRow(
                            this.dataList[this.leftIdx][0]
                        );
                    });
                }
                if (this.cancleType == 2) {
                    this.$emit('callback');
                }

                if (this.cancleType == 3) {
                    this.dataList.splice(this.leftIdx, 1);
                    this.leftIdx = 0;
                    this.haveChangeFn();
                    this.$nextTick(() => {
                        this.$refs.myTable.setCurrentRow(this.dataList[0]);
                    });
                }
            }

            this.cancleType = 0;
            this.jumpRow = null;
        },

        handleClick(str) {
            if (str == 'yes') {
                if (this.dataList.some(item => !item.Name)) {
                    this.isTipShow = true;
                    this.tipText = '请填写检查项！';
                    return;
                }
                let b = false;
                this.dataList.forEach(_item => {
                    _item.Items.forEach((element2, idx) => {
                        if (!element2.ItemName) {
                            this.isTipShow = true;
                            this.tipText =
                                _item.Name +
                                '-检查配置第' +
                                (Number(idx) + 1) +
                                '行' +
                                '请输入管理项目';
                            b = true;
                            return;
                        }
                        if (!element2.ItemContent) {
                            this.isTipShow = true;
                            this.tipText =
                                _item.Name +
                                '-检查配置第' +
                                (Number(idx) + 1) +
                                '行' +
                                '请输入管理内容';
                            b = true;
                            return;
                        }
                        if (!element2.ItemVelue) {
                            this.isTipShow = true;
                            this.tipText =
                                _item.Name +
                                '-检查配置第' +
                                (Number(idx) + 1) +
                                '行' +
                                '请输入管理值';
                            b = true;
                            return;
                        }
                        if (
                            (element2.ItemType == '单选' ||
                                element2.ItemType == '多选') &&
                            !element2.ReferenceValue
                        ) {
                            this.isTipShow = true;
                            this.tipText =
                                _item.Name +
                                '-检查配置第' +
                                (Number(idx) + 1) +
                                '行' +
                                '请输入参考值';
                            b = true;
                            return;
                        }
                        if (!element2.MeasureMethod) {
                            this.isTipShow = true;
                            this.tipText =
                                _item.Name +
                                '-检查配置第' +
                                (Number(idx) + 1) +
                                '行' +
                                '请输入测量（仪器/方法）';
                            b = true;
                            return;
                        }
                        if (!element2.MeasureFrequency) {
                            this.isTipShow = true;
                            this.tipText =
                                _item.Name +
                                '-检查配置第' +
                                (Number(idx) + 1) +
                                '行' +
                                '请输入测量频率';
                            b = true;
                            return;
                        }
                        if (!element2.RecordFrequency) {
                            this.isTipShow = true;
                            this.tipText =
                                _item.Name +
                                '-检查配置第' +
                                (Number(idx) + 1) +
                                '行' +
                                '请输入记录频率';
                            b = true;
                            return;
                        }
                    });
                });
                if (b) {
                    return;
                }

                this.$axios({
                    method: 'post',
                    url: `/api/InspectionReport/SaveInspectionTemplate`,
                    data: this.dataList
                }).then(res => {
                    if (res.data.code == 0) {
                        this.isTipShow = true;
                        this.tipText = '保存成功！';
                        this.haveChange = false;
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                });
            } else {
                if (this.haveChange) {
                    this.isTipShow = true;
                    this.tipText = `当前工位内容尚未保存，是否确认关闭？`;
                    this.noCancel = false;
                    this.cancleType = 2;
                    return;
                }
                this.$emit('callback');
            }
        }
    }
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
    ::v-deep .el-input__inner {
        padding-left: 0;
    }
    .myDialog {
        position: relative;
        width: 1500px;
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
            height: 650px;
            overflow-y: auto;
            padding: 20px 40px 40px;
            .mt {
                margin-top: 10px;
                width: 840px;
            }
            .content1-line {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .content {
                    display: flex;
                    width: 100%;
                    line-height: 40px;
                    margin: 10px 0;

                    .contentLable,
                    .contentLable2 {
                        width: 110px;
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
            }

            .table-flex {
                display: flex;
                justify-content: space-between;
                height: 100%;
                width: 100%;

                .table-item,
                .table-item2 {
                    width: 300px;
                    height: auto;
                    .action-img {
                        height: 20px;
                        width: 20px;
                        cursor: pointer;
                        margin-left: 10px;
                        display: inline-block;
                    }

                    .item-label {
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        padding: 0 10px;
                        box-sizing: border-box;
                        background-color: rgba(196, 193, 193, 0.6);
                        border: 1px solid rgba(153, 153, 153, 1);
                    }

                    .table-title {
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .title {
                            width: 250px;
                        }
                        .btn {
                            font-weight: bold;
                            width: 100px;
                            height: 38px;
                            line-height: 38px;
                            margin-left: 10px;
                            border: 2px solid #4270e4;
                            background-color: #fff;
                            color: #4270e4;
                            font-size: var(--fontSize);
                            border-radius: 4px;
                            text-align: center;
                            vertical-align: middle;
                            box-sizing: border-box;
                            cursor: pointer;

                            &.btn-query {
                                background-color: #4270e4;
                                color: #fff;
                            }
                            &.btn-setting {
                                border-color: #ffa629;
                                background-color: #ffa629;
                                color: #fff;
                            }
                            &.btn-add {
                                border-color: #46be05;
                                color: #46be05;
                            }
                        }
                    }
                    .table {
                        width: 100%;
                        height: calc(100% - 50px);
                        overflow-y: auto;
                    }
                }
                .table-item2 {
                    width: calc(100% - 310px);
                    margin-left: 10px;
                }
                .label-add {
                    width: 100px;
                    height: 36px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #37db73;
                    color: #37db73;
                    cursor: pointer;
                    background-color: #fff;
                    margin-left: 20px;
                }

                .label-edit {
                    width: 100px;
                    height: 36px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #a0a3a5;
                    color: #a0a3a5;
                    cursor: pointer;
                    background-color: #fff;
                    margin-left: 15px;
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
