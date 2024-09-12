<template>
    <div class="templatePop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                模板管理
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>
            <div class="popContent">
                <div class="template-flex">
                    <div class="template-item">


                        <div class="item-search">
                            <div class="search-left">
                                配方模板
                            </div>
                            <div class="search-right">
                                <div class="search-btn add" @click="addTemp(false)">添加</div>
                                <div class="search-btn" @click="addTemp(true)">复制</div>
                                <div class="search-btn del" @click="delTemp">删除</div>
                            </div>

                        </div>
                        <div class="item-table">
                            <el-table ref="tempTable" @row-click="tableRowClick" highlight-current-row
                                :cell-style="{ borderColor: '#E4E7ED' }"
                                :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="tempList" border
                                height="100%" :row-class-name="tableRowClassName">
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>
                                <el-table-column type="index" label="序号" width="60px"></el-table-column>

                                <el-table-column prop="Address" label="配方模板">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.Name" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

                    </div>

                    <div class="template-item">
                        <div class="item-search">
                            <div class="search-left">
                                配方内容
                            </div>
                            <div class="search-right">
                                <div class="search-btn log" @click="sortProj">排序优化</div>
                                <div class="search-btn add" @click="addProj">添加</div>
                                <div class="search-btn del" @click="delProj">删除</div>
                            </div>

                        </div>

                        <div class="item-table">
                            <el-table ref="projTable" @row-click="tableRowClickRight" highlight-current-row
                                :cell-style="{ borderColor: '#E4E7ED' }"
                                :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="curLeft.Projects"
                                border height="100%" :row-class-name="tableRowClassName">
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>
                                <el-table-column type="index" label="序号" width="60px"></el-table-column>
                                <el-table-column prop="Address" label="操作" width="130px">
                                    <template slot-scope="scope">
                                        <div class="table-action" @click="changeSort(scope.row, false)">
                                            <img src="../../../assets/images/icon_up.png" alt />
                                        </div>
                                        <div class="table-action" @click="changeSort(scope.row, true)">
                                            <img src="../../../assets/images/icon_down.png" alt />
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ContentGroup" label="分组" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <el-select placeholder="请选择" v-model="scope.row.ContentGroup">
                                            <el-option v-for="item in processList" :key="item.WID" :label="item.WorkName"
                                                :value="item.WorkName">
                                            </el-option>
                                        </el-select>
                                    </template></el-table-column>
                                <el-table-column prop="ProjectContent" label="配方项目" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.ProjectContent" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ParameterTypeValue" label="参数类型" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                    <el-select placeholder="请选择" v-model="scope.row.ParameterTypeValue">
                                        <el-option label="监听参数" :value="0"> </el-option>
                                        <el-option label="下发参数" :value="1"> </el-option>
                                    </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ProjectDescription" label="项目描述" :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.ProjectDescription" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="VariableName" label="变量名"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="DataType" label="变量类型"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="Address" label="变量地址"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="VariableDescription" label="变量描述"
                                    :show-overflow-tooltip="true"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>

            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="handleClick('yes')" style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                ">
                    确定
                </el-button>
            </div>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
        <VariableSelect v-if="isVariableShow" :data="chooseArr" @variableSelectCallBack="variableSelectCallBack" />
    </div>
</template>

<script>
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';
import VariableSelect from '../../../components/public/variableSelect.vue';

export default {
    components: {
        CurrentTitle,
        TipPop,
        VariableSelect
    },
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            isTipShow: false,
            tipText: '',
            noCancel: true,
            tempList: [],
            curLeft: {},
            rightIdx: 0,
            isVariableShow: false,
            chooseArr: [],
            processList: [],
        };
    },

    mounted() {
        this.getProcess()
        this.getFormulaTemplates()
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            row.$index = rowIndex
        },
        tipCallBack(str) {
            console.log(str)
            if (str == 'yes') {
                if (this.delType == 1) {
                    this.tempList.splice(this.curLeft.$index, 1)
                } else if (this.delType == 2) {
                    this.curLeft.Projects.splice(this.rightIdx, 1)
                }
            }
            this.isTipShow = false;
            this.noCancel = true;
            this.delType = 0;
        },
        handleClick(str) {
            if (str == 'yes') {
                this.$axios({
                    method: 'post',
                    url: `api/FormulaManage/FormulaManage_UpdateFormulaTemplate`,
                    data: this.tempList.map(_ => ({
                        ..._,
                        Projects: _.Projects.map(_2 => ({
                            ..._2,
                            ContentGroupId: this.processList.find(_3 => _3.WorkName == _2.ContentGroup) ? this.processList.find(_3 => _3.WorkName == _2.ContentGroup).WID : ''
                        }))
                    }))
                })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$emit('callback', '保存成功！');
                        } else {
                            this.isTipShow = true;
                            this.tipText = res.data.msg;
                        }
                    })
            } else {
                this.$emit('callback');
            }

        },
        tableRowClick(row) {
            this.curLeft = row;
            this.rightIdx = 0;
            if (this.curLeft && this.curLeft.Projects && this.curLeft.Projects.length) {
                this.$nextTick(() => {
                    console.log('222')
                    this.$refs.projTable.setCurrentRow(this.curLeft.Projects[0]);
                })
            }
        },
        tableRowClickRight(row) {
            this.rightIdx = row.$index
        },
        addTemp(isCopy) {
            if (isCopy) {
                if (!this.curLeft) {
                    this.isTipShow = true;
                    this.tipText = '请选择需要复制的配方模板！';
                    return;
                }
                let _Projects = JSON.parse(JSON.stringify(this.curLeft.Projects))
                this.tempList.push({
                    TID: "00000000-0000-0000-0000-000000000000",
                    Name: `${this.curLeft.Name}_副本`,
                    Projects: _Projects.map((item) => ({
                        ...item,
                        PID: "00000000-0000-0000-0000-000000000000",
                        CID: "00000000-0000-0000-0000-000000000000",
                    }))
                })
            } else {
                this.tempList.push({
                    TID: "00000000-0000-0000-0000-000000000000",
                    Name: "",
                    Projects: []
                })
            }

        },
        delTemp() {
            this.noCancel = false;
            this.delType = 1;
            this.tipText = `是否删除第${Number(this.curLeft.$index) + 1}行配方模板？`;
            this.isTipShow = true;
        },
        delProj() {

            this.noCancel = false;
            this.delType = 2;
            this.tipText = `是否删除第${Number(this.rightIdx) + 1}行配方内容？`;
            this.isTipShow = true;
        },
        sortProj() {
            let temp = JSON.parse(JSON.stringify(this.curLeft.Projects));
            temp.sort(this.sortby('PIndex'))
            temp.sort(this.sortby('ContentGroup)'))
            console.log('temp', temp)
            this.curLeft.Projects = [];
            this.$nextTick(() => { this.curLeft.Projects = temp })
        },
        sortby(prop, rev = true) {
            // prop 属性名
            // rev  升序降序 默认升序
            return function (a, b) {
                var val1 = a[prop];
                var val2 = b[prop];
                return rev ? val1 - val2 : val2 - val1;
            }
        },
        addProj() {
            if (!this.curLeft) {
                this.isTipShow = true;
                this.tipText = '请选择配方模板！';
                return;
            }
            this.isVariableShow = true;
        },
        variableSelectCallBack(str, val) {
            this.isVariableShow = false;
            console.log(str, val)
            if (str == 'yes') {
                this.curLeft.Projects.push({
                    PID: "00000000-0000-0000-0000-000000000000",//PID是项目id
                    VariableName: val.Name,
                    ProjectContent: "",
                    Unit: "",
                    Digit: "",
                    Rule: 0,
                    ProjectDescription: "",
                    VariableDescription: val.Descript,
                    ContentGroup: "",
                    CID: "00000000-0000-0000-0000-000000000000",//CID没啥用，写上吧
                    Value: "",
                    Address: "",
                    Descript: "",
                    Address: val.Address,
                    DataType: val.DateType,
                })
            }
        },
        getFormulaTemplates() {
            this.$axios({
                method: 'post',
                url: `api/FormulaManage/QueryFormulaTemplateProjects`
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.tempList = res.data.data;
                        if (this.tempList.length) {
                            this.curLeft = this.tempList[0]
                            this.$refs.tempTable.setCurrentRow(this.tempList[0]);
                            this.tableRowClick(this.tempList[0])
                        } else {
                            this.curLeft = {};
                        }
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
        },
        changeSort(row, isUp) {
            let _idx = isUp ? Number(row.$index) + 1 : Number(row.$index) - 1;
            if (_idx >= this.curLeft.Projects.length - 1) {
                _idx = this.curLeft.Projects.length - 1
            }
            if (_idx <= 0) {
                _idx = 0
            }
            let list = JSON.parse(JSON.stringify(this.curLeft.Projects))
            this.curLeft.Projects = [];
            let currRow = list.splice(row.$index, 1)[0]
            list.splice(_idx, 0, currRow)
            this.$nextTick(() => {
                this.curLeft.Projects = list;
                this.tableRowClick(this.curLeft)
            })
        },
        getProcess() {
            this.$axios({
                url: `/api/ProcessParameterConfigure/QueryWorkSections`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.processList = res.data.data
                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },

    },
};
</script>

<style lang="scss" scoped>
.templatePop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

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
            height: 600px;
            overflow-y: auto;
            padding: 20px 20px;
            padding-bottom: 0;
            box-sizing: border-box;

            .template-flex {
                width: 100%;
                height: 100%;
                display: flex;

                .template-item {
                    flex: 2;
                    height: 100%;
                    margin-right: 5px;


                    .item-search {
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .search-left {
                            color: #386df0;
                            font-size: 16px;
                            border-left: 3px solid #386df0;
                            padding-left: 5px;
                        }

                        .search-right {
                            display: flex;
                            align-items: center;

                        }

                        .search-btn {
                            cursor: pointer;
                            margin-right: 10px;
                            height: 36px;
                            width: 80px;
                            border-radius: 4px;
                            border: 1px solid #fcae38;
                            background-color: #fff;
                            color: #fcae38;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;

                            a {
                                opacity: 0;
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                z-index: 2;
                            }
                        }

                        .add {
                            border: 1px solid #61D731;
                            color: #61D731;
                        }

                        .del {
                            background-color: #aaaaaa;
                            border: none;
                            color: #fff;
                        }

                        .type {
                            background-color: #fcae38;
                            border: none;
                            color: #fff;
                        }

                        .log {
                            border: 1px solid #5279DD;
                            color: #5279DD;
                        }
                    }

                    .item-table {
                        width: 100%;
                        height: calc(100% - 50px);
                        border: 1px solid #ddd;

                        .table-action {
                            width: 50px;
                            float: left;
                            height: 25px;
                            border-radius: 4px;
                            background-color: #fff;
                            border: 1px solid #cccccc;
                            position: relative;
                            margin-left: 5px;
                            cursor: pointer;

                            img {
                                position: absolute;
                                top: 0;
                                height: 18px;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                margin: auto;
                            }
                        }
                    }

                }

                .template-item:last-child {
                    flex: 6;
                    margin-right: 0;
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
.templatePop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>