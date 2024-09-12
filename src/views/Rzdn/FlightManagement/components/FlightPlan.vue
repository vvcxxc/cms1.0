<!-- 班次计划 -->
<template>
    <div class="flight">
        <div ref="contentHeader" class="flight-header">

            <div class="header-item">
                <span class="item-span">班次</span>
                <el-select class="item-input" v-model="flightName">
                    <el-option v-for="item in flightList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </div>
            <div class="header-item">
                <span class="item-span">班组</span>
                <el-select class="item-input" v-model="teamName">
                    <el-option v-for="item in teamsList" :key="item" :label="item" :value="item"></el-option>
                </el-select>

            </div>
            <div class="header-item">
                <span class="item-span">计划状态</span>
                <el-select class="item-input" v-model="status">
                    <el-option v-for="(item, index) in statusList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>
            <div class="header-item">
                <span class="item-span">生效日期</span>
                <my-picker :type="'date'" :format="'yyyy-MM-dd'" :startTime="beginTime" :endTime="endTime"
                    @getTime="getTime"></my-picker>
            </div>
            <!-- <div class="header-item" v-show="showPlan">
                <span class="item-span">开始日期</span>
                <el-date-picker class="add-input1" v-model="beginTime" value-format="yyyy-MM-dd" type="date"
                    placeholder="选择开始日期">
                </el-date-picker>
            </div> -->
            <div class="header-item">
                <el-button class="btn1 search" @click="btnSearch">查询</el-button>
            </div>
            <el-button class="btn1 jian-tuo float-right" @click="showPlanFun"><img :src="jianTuo" /></el-button>
            <el-button class="btn1 add float-right" @click="addPlan" v-show="showPlan">+新增</el-button>
        </div>
        <div class="flight-centent" :style="{ height: tableHeight }">
            <my-table :columnList="columnList" :tableDataList="flightPlanList">
                <template #ID="{ scope }">
                    <div>
                        {{ scope.$index + 1 }}
                    </div>
                </template>
                <template #action="{ scope }">
                    <div style="text-align:center">
                        <el-button class="table-btn" @click="editorPlan(scope.row)">
                            <img class="table-img" :src="bianjiImg" />
                        </el-button>
                        <el-button class="table-btn" @click="delPlan(scope.row)">
                            <img class="table-img" :src="delImg" />
                        </el-button>
                    </div>

                </template>
                <template #Status="{ scope }">
                    <!-- <div class="status-class"> -->
                    <p class="status"
                        :class="{ status1: scope.row.Status == '生效中', status2: scope.row.Status == '待生效', status3: scope.row.Status == '已失效' }">
                        {{ scope.row.Status }}
                    </p>

                    <!-- </div> -->
                </template>
            </my-table>
        </div>
        <div class="flight-footer">
            <my-page :pageData="pageData" @changePage="changePage"></my-page>
        </div>
        <my-dialog :visible="openDialog" :width="dialogData.width" :title="dialogData.title" @close="openDialog = false"
            @ok="dialogOk">
            <div class="add-info">
                <div class="add-header">
                    <div class="add-title">班次计划</div>
                    <el-button class="add-btn add1" @click="addPlanListFun" v-show="dialogData.type == 'add'">添加
                    </el-button>
                </div>
                <div class="add-content1">
                    <div class="add-content2" v-for="(item, index) in addPlanList" :key="index">
                        <div class="content-item">
                            <span class="add-text">生效日期</span>
                            <el-date-picker class="item-input" value-format="yyyy-MM-dd" v-model="item.CreateTime"
                                type="date" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="content-item">
                            <span class="add-text">失效日期</span>
                            <el-date-picker class="item-input" value-format="yyyy-MM-dd" v-model="item.EndTime"
                                type="date" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="content-item">
                            <span class="add-text">选择班次</span>
                            <el-select class="item-input" v-model="item.ShiftName">
                                <el-option v-for="item in flightList1" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="content-item">
                            <span class="add-text">选择班组</span>
                            <el-select class="item-input" v-model="item.TeamName">
                                <el-option v-for="item in teamsList1" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="add-line" v-show="index != addPlanList.length - 1"></div>

                    </div>
                </div>

            </div>
        </my-dialog>

    </div>

</template>
<script>
import MyTable from '@/newComponents/Table.vue'
import MyPage from '@/newComponents/Page.vue'
import MyPicker from '@/newComponents/DatePicker.vue'
import jianTuo from '@/assets/images/jiantuo.png'
import MyDialog from '@/newComponents/Dialog.vue'
import delImg from '@/assets/images/del.png'
import bianjiImg from '@/assets/images/icon_pensoil.png'
export default {
    components: {
        MyTable,
        MyPage,
        MyPicker,
        MyDialog
    },
    props: ['jurisdictionObj'],
    data() {
        return {
            bianjiImg: bianjiImg,
            delImg: delImg,
            jianTuo: jianTuo,
            columnList: [],
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            },
            tableHeight: 'calc(100% - 130px)',
            openDialog: false,
            dialogData: {
                width: '700px',
                title: '新增计划'

            },
            searchData: {
                beginTime: this.$moment().format('YYYY-MM-DD'),
                endTime: this.$moment().add(7, 'days').format('YYYY-MM-DD'),
                ShiftName: '不限',
                TeamName: '不限',
                Status: ''

            },
            flightPlanList: [],
            addPlanList: [{
                ShiftName: '',
                TeamName: '',
                CreateTime: this.$moment().format('YYYY-MM-DD'),
                EndTime: this.$moment().format('YYYY-MM-DD')
            }],
            beginTime: this.$moment().format('YYYY-MM-DD'),
            endTime: this.$moment().add(7, 'days').format('YYYY-MM-DD'),
            showPlan: true,
            flightList: [],
            flightName: '不限',
            teamsList: [],
            teamName: '不限',
            statusList: [
                {
                    label: '不限',
                    value: ''
                },
                {
                    label: '生效中',
                    value: '生效中'
                },
                {
                    label: '待生效',
                    value: '待生效'
                },
                {
                    label: '已失效',
                    value: '已失效'
                }

            ],
            status: ''
        }
    },
    computed: {
        flightList1() {
            return this.flightList.filter(item => {
                return item != '不限'
            })
        },
        teamsList1() {
            return this.teamsList.filter(item => {
                return item != '不限'
            })
        }

    },
    methods: {
        //修改时间
        getTime(val, type) {
            if (type == 'start') {
                this.beginTime = val
            } else {
                this.endTime = val
            }

        },
        //弹窗确定
        dialogOk() {
            // if (this.dialogData.type == 'add') {
            console.log(this.addPlanList)
            // if (!this.addPlanList.ShiftName) {
            //     this.confirm_Pop2(this, '班次不能为空')
            //     return
            // }
            //  if (!this.addPlanList.TeamName) {
            //     this.confirm_Pop2(this, '班组不能为空')
            //     return
            // }
            let list = this.addPlanList
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                if (!item.ShiftName) {
                    this.confirm_Pop2(this, '班次不能为空')
                    return
                }
                if (!item.TeamName) {
                    this.confirm_Pop2(this, '班组不能为空')
                    return
                }
            }


            this.addOrEditShiftPlantInfo(this.addPlanList).then(res => {
                // console.log(res)
                this.openDialog = false
                this.getShiftPlantList()
            }).catch(err => {
                this.confirm_Pop2(this, err)
                // console.log(err)
            })

            // }

        },
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex
            if (this.showPlan) {
                this.getShiftPlantList()


            } else {
                this.switchShiftSchedule()
            }

        },
        //点击查询按钮
        btnSearch() {
            if (!this.jurisdictionObj.jhcxidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.pageData.PageIndex = 1,
                this.searchData = {
                    ShiftName: this.flightName,
                    TeamName: this.teamName,
                    Status: this.status,
                    beginTime: this.beginTime,
                    endTime: this.endTime,
                }
            if (this.showPlan) {
                this.getShiftPlantList()


            } else {
                this.columnList = []
                this.tableDataList = []
                this.switchShiftSchedule()
            }
        },
        //切换图标
        showPlanFun() {
            this.pageData = {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            }
            this.showPlan = !this.showPlan
            this.columnList = []
            if (this.showPlan) {
                this.getShiftPlantList()

            } else {
                // this.columnList = []
                this.switchShiftSchedule()
            }
        },
        //删除计划
        delPlan(row) {
            if (!this.jurisdictionObj.jhscidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.confirm_Pop(this, '是否确认删除此计划？', () => {
                this.delPlanApi(row.ShiftPlantID).then(res => {
                    this.getShiftPlantList()
                }).catch(err => {
                    console.log(err)
                })
            })

        },
        //编辑计划
        editorPlan(row) {
            if (!this.jurisdictionObj.jhbjidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.dialogData.title = '编辑计划'
            this.dialogData.type = 'editor'
            this.addPlanList = [{
                ShiftName: row.ShiftName,
                TeamName: row.TeamName,
                CreateTime: row.CreateTime,
                EndTime: row.EndTime,
                ShiftPlantID: row.ShiftPlantID,
            }]
            this.openDialog = true

        },
        //新增计划
        addPlan() {
            if (!this.jurisdictionObj.jhxzidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.dialogData.title = '新增计划'
            this.dialogData.type = 'add'
            this.openDialog = true
            this.addPlanList = [{
                ShiftName: '',
                TeamName: '',
                CreateTime: this.$moment().format('YYYY-MM-DD'),
                EndTime: this.$moment().format('YYYY-MM-DD')
            }]

        },

        //查询班次计划
        getShiftPlantList() {
            this.columnList = [{
                label: '序号',
                prop: 'ID'
            },
            {
                label: '生效日期',
                prop: 'CreateTime'
            },
            {
                label: '失效日期',
                prop: 'EndTime'
            },
            {
                label: '班次名称',
                prop: 'ShiftName'
            },
            {
                label: '班组名称',
                prop: 'TeamName'
            },
            {
                label: '计划状态',
                prop: 'Status'
            },
            {
                label: '操作',
                prop: 'action'
            },
            ]
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftPlant/QueryShiftPlantOperate?argBegin=${this.searchData.beginTime}&argEnd=${this.searchData.endTime}&argPageSize=${this.pageData.PageSize}&argPageIndex=${this.pageData.PageIndex}&ShiftName=${this.searchData.ShiftName}&TeamName=${this.searchData.TeamName}&Status=${this.searchData.Status}`,
                }).then(res => {
                    const data = res.data
                    // console.log(data)
                    if (data.code == 0) {
                        this.flightPlanList = data.data.DataList
                        let parameterList = data.data.ParameterList
                        this.pageData.TotalCount = parameterList.TotalCount
                        resolve(data.data)
                    } else {
                        reject(data.msg)
                    }

                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })

            })
        },

        //切换班次计划
        switchShiftSchedule() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftPlant/SwitchShiftSchedule?argBegin=${this.searchData.beginTime}&argEnd=${this.searchData.endTime}&argPageSize=${this.pageData.PageSize}&argPageIndex=${this.pageData.PageIndex}&ShiftName=${this.searchData.ShiftName}&TeamName=${this.searchData.TeamName}&Status=${this.searchData.Status}`,
                }).then(res => {
                    const data = res.data
                    // console.log(data)
                    if (data.code == 0) {
                        // console.log(data.data)
                        let DataList = data.data.DataList
                        let columnName = DataList[0].ColumnName
                        let rowData = DataList[0].RowData
                        columnName.forEach((item, index) => {
                            this.columnList.push({
                                label: item,
                                prop: item + index
                            })
                        });
                        let list = []
                        rowData.forEach((item, index) => {
                            let data = {}
                            item.forEach((item1, index1) => {
                                data[columnName[index1] + index1] = item1

                            })
                            list.push(data)
                            // console.log(data)
                        })
                        this.flightPlanList = list
                        // this.flightPlanList = data.data.DataList
                        let parameterList = data.data.ParameterList
                        this.pageData.TotalCount = parameterList.TotalCount
                        resolve(data.data)
                    } else {
                        reject(data.msg)
                    }

                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })

            })
        },

        //添加编辑班次计划
        addOrEditShiftPlantInfo(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftPlant/AddOrEditShiftPlantInfo`,
                    data: data
                }).then(res => {
                    const data = res.data
                    // console.log(data)
                    if (data.code == 0) {

                        resolve(data.data)
                    } else {
                        reject(data.msg)
                    }

                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })

            })

        },

        addPlanListFun() {
            this.addPlanList.push({
                ShiftName: '',
                TeamName: '',
                CreateTime: this.$moment().format('YYYY-MM-DD'),
                EndTime: this.$moment().format('YYYY-MM-DD')
            })

        },
        //获取所有班组
        getAllTeamsInfo() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftPlant/AllTeamsInfo`,
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        // let parameterList = data.data.ParameterList
                        this.teamsList = data.data
                        resolve(data.data)
                    } else {
                        reject(data.msg)
                    }

                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })

            })

        },
        //获取所有班次
        getAllShiftInfo() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftPlant/AllShiftInfo`,
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.flightList = data.data
                        // this.flightName =  this.flightList[0]
                        resolve(data.data)
                    } else {
                        reject(data.msg)
                    }

                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })

            })

        },
        watchResize() {
            let _this = this
            window.onresize = () => {
                return (() => {
                    _this.$nextTick(() => {
                        _this.tableHeight = `calc(100% - ${_this.$refs.contentHeader.clientHeight + 50}px)`
                    })

                })();
            };

        },
        //删除计划
        delPlanApi(id) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'get',
                    url: `/api/ShiftPlant/DeletePlantInfo?ShiftPlantID=${id}`,
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        // console.log(data)
                        resolve(data.data)
                    } else {
                        this.confirm_Pop2(this, data.msg)
                        reject(data.msg)
                    }
                    // console.log(data)
                }).catch(err => {
                    reject(err)
                })

            })
        },
        getData() {
            this.showPlan = true

            this.getAllTeamsInfo().then(res => {
                this.getAllShiftInfo().then(res => {
                    this.getShiftPlantList()
                })
            })
        }

    },
    mounted() {
        setTimeout(() => {
            this.watchResize()
        });
        this.getData()

    }
}
</script>
<style lang="scss" scoped>
@import '../index.scss';

// .status-class {
//     text-align: center;
//     color: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     line-height: 30px;

// }
.item-input {
    width: 220px
}

.status {
    color: #fff;
    line-height: 30px;
    width: 60px;
    border-radius: 4px;
    padding: 0 10px;
}

.status1 {
    background: #67C23A;
    // border:1px solid #67C23A;
    //  color: #67C23A;

}

.status2 {
    background: #E6A23C
}

.status3 {
    background: #909399
}
</style>