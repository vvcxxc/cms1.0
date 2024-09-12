<!-- 班次配置 -->
<template>
    <div class="flight">
        <div class="flight-header">
            <el-button class="btn1 add" @click="addFlight">+新增</el-button>
        </div>
        <div class="flight-centent">
            <my-table :columnList="columnList" :tableDataList="flightTableList">
                <template #action="{ scope }">
                    <div style="text-align:center">
                        <el-button class="table-btn" @click="editorFilght(scope.row)">
                            <img class="table-img" :src="bianjiImg" />
                        </el-button>
                        <el-button class="table-btn" @click="delFilght(scope.row)">
                            <img class="table-img" :src="delImg" />
                        </el-button>
                    </div>

                </template>
                <template #ShiftTime="{ scope }">
                    <div>
                        {{ scope.row.ShiftTime =='跨天'?'次日':scope.row.ShiftTime }}
                    </div>
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
                    <div class="add-title">班次信息</div>
                    <el-button class="add-btn add1" @click="addFlightListFun" v-show="dialogData.type == 'add'">添加
                    </el-button>
                </div>
                <div class="add-content1">
                    <div class="add-content2" v-for="(item, index) in addFlightList" :key="index">
                        <div class="content-item">
                            <span class="add-text">班次名称</span>
                            <el-input class="add-input1" v-model="item.ShiftName"></el-input>

                        </div>
                        <div class="content-item">
                            <span class="add-text">时间分布</span>
                            <el-select class="add-input1" v-model="item.ShiftTime">
                                <el-option v-for="(item1, index1) in shiftTimeList" :key="index1" :label="item1.value"
                                    :value="item1.value"></el-option>
                            </el-select>
                        </div>
                        <!-- <div class="tips" v-show="item.tips">请输入班次名称</div> -->
                        <div class="content-item">
                            <span class="add-text">开始时间</span>
                            <el-time-picker class="add-input1" format="HH:mm" value-format="HH:mm"
                                v-model="item.CreateTime" placeholder="请选择开始时间">
                            </el-time-picker>
                        </div>
                        <div class="content-item">
                            <span class="add-text">结束时间</span>
                            <el-time-picker class="add-input1" format="HH:mm" value-format="HH:mm"
                                v-model="item.EndTime" placeholder="请选择结束时间">
                            </el-time-picker>
                        </div>
                        <!-- <div class="tips" v-show="item.timeTips">{{item.timeTips}}</div> -->
                        <div class="add-line" v-show="index != addFlightList.length - 1"></div>

                    </div>
                </div>

            </div>
        </my-dialog>
    </div>

</template>
<script>
import MyTable from '@/newComponents/Table.vue'
import MyPage from '@/newComponents/Page.vue'
import delImg from '@/assets/images/del.png'
import bianjiImg from '@/assets/images/icon_pensoil.png'
import MyDialog from '@/newComponents/Dialog.vue'
export default {
    components: {
        MyTable,
        MyPage,
        MyDialog

    },
    props: ['jurisdictionObj'],
    data() {
        return {
            bianjiImg: bianjiImg,
            delImg: delImg,
            columnList: [],
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            },
            openDialog: false,
            dialogData: {
                width: '700px',
                title: '添加班次'
            },
            addFlightList: [{
                ShiftName: "",
                ShiftTime: "当天",
                CreateTime: "",
                EndTime: "",
                // tips:false,
                // timeTips:''
            }],
            flightTableList: [],
            shiftTimeList: [{
                value: '当天'
            },
            {
                value: '跨天'
            },
            ],
            editorFilghtData: ''

        }
    },
    methods: {
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex
            this.getFlightList()

        },
        //添加，编辑弹窗确定
        dialogOk() {
            let list = this.addFlightList
            for (let i = 0; i < list.length; i++) {
                let name = list[i].ShiftName.trim()
                if (!name) {
                    // console.log(name)
                    // this.addFlightList[i].tips = true
                    this.confirm_Pop2(this, '班次名称不能为空')
                    return
                }
                if (!list[i].CreateTime) {
                    this.confirm_Pop2(this, '班次开始时间不能为空')
                    return
                }
                if (!list[i].EndTime) {
                    this.confirm_Pop2(this, '班次结束时间不能为空')
                    return
                }
            }
            if (this.dialogData.type == 'add') {
                // console.log(this.addFlightList)
                let data = {
                    ShiftsInfo: this.addFlightList
                }
                this.addShiftInfo(data).then(res => {
                    // console.log(res)
                    this.getFlightList()
                    this.openDialog = false

                }).catch(err => {
                    this.confirm_Pop2(this, err)
                    console.log(err)
                })

            } else if (this.dialogData.type == 'editor') {
                // console.log(this.addFlightList)
                // let data1 = this.addFlightList[0]
                let data = {
                    "ShiftsInfo": this.addFlightList
                }
                this.editShiftInfo(this.editorFilghtData.ShiftRecordId, data).then(res => {
                    // console.log(res)
                    this.getFlightList()
                    this.openDialog = false

                }).catch(err => {
                    this.confirm_Pop2(this, err)
                    console.log(err)
                })


            }

        },
        addFlight() {
            if (!this.jurisdictionObj.cpxzidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.dialogData.title = '添加班次'
            this.dialogData.type = 'add'
            this.addFlightList = [{
                ShiftName: "",
                ShiftTime: "当天",
                CreateTime: "",
                EndTime: ""
            }],
                this.openDialog = true

        },
        addFlightListFun() {
            this.addFlightList.push({
                ShiftName: "",
                ShiftTime: "当天",
                CreateTime: "",
                EndTime: ""
            })
        },
        editorFilght(row) {
            if (!this.jurisdictionObj.cpbjidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.dialogData.title = '编辑班次'
            this.dialogData.type = 'editor'
            let timeList = row.CreateEndTime.split('-')
            // console.log(row.CreateEndTime)
            this.editorFilghtData = row
            this.addFlightList = [{
                ShiftName: row.ShiftName,
                ShiftTime: row.ShiftTime,
                CreateTime: timeList[0],
                EndTime: timeList[1]
            }],

                this.openDialog = true
        },
        //删除班次
        delFilght(row) {
            if (!this.jurisdictionObj.cpbjidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.confirm_Pop(this, `是否确定删除班次${row.ShiftName}?`, () => {
                this.$axios({
                    method: 'GET',
                    url: `/api/ShiftConfiguration/DeleteTeamInfo?ShiftRecordId=${row.ShiftRecordId}`,
                }).then(res => {
                    const data = res.data
                    // console.log(data)
                    if (data.code == 0) {
                        this.getFlightList()
                    } else{
                        this.confirm_Pop2(this, data.msg)
                    }
                }).catch(err => {
                    console.log(err)

                })
            })

        },
        //获取班次数据
        getFlightList() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftConfiguration/QueryShiftOperate?argPageSize=${this.pageData.PageSize}&argPageIndex=${this.pageData.PageIndex}`,
                }).then(res => {
                    const data = res.data
                    // console.log(data)
                    if (data.code == 0) {
                        this.flightTableList = data.data.DataList
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

        //添加班次
        addShiftInfo(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftConfiguration/AddShiftInfo`,
                    data: data
                }).then(res => {
                    const data = res.data
                    console.log(res)
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
        //编辑班次
        editShiftInfo(shiftRecordId, data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftConfiguration/EnditShiftInfo?ShiftRecordId=${shiftRecordId}`,
                    data: data
                }).then(res => {
                    const data = res.data
                    console.log(res)
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
        }

    },
    mounted() {
        this.getFlightList()
        this.columnList = [{
            label: '序号',
            prop: 'ID',
        },
        {
            label: '班次名称',
            prop: 'ShiftName',
        },
        {
            label: '时间分布',
            prop: 'ShiftTime',
        },
        {
            label: '开始-结束时间',
            prop: 'CreateEndTime',
        },
        {
            label: '操作',
            prop: 'action',
            width: '150px'
        },


        ]
    }
}
</script>
<style lang="scss" scoped>
@import '../index.scss';

.tips {
    width: 100%;
    color: red;
    font-size: 12px;
    padding-left: 80px;
    padding-bottom: 10px;
}
</style>