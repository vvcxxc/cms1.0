<!-- 班次记录 -->
<template>
    <div class="flight">
        <div class="flight-header">
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
                <span class="item-span">日期</span>
                <my-picker :type="'date'" :format="'yyyy-MM-dd'" :startTime="beginTime" :endTime="endTime"
                    @getTime="getTime"></my-picker>
            </div>
            <div class="header-item">
                <el-button class="btn1 search" @click="btnSearch">查询</el-button>
            </div>
        </div>
        <div class="flight-centent">
            <my-table :columnList="columnList" :tableDataList="tableList">
                
                <template #action="{ scope }">
                    <div style="text-align:center">
                        <el-button class="table-btn look" @click="editorMan(scope.row)">
                            班组人员
                        </el-button>
                        <el-button class="table-btn" @click="delFlight(scope.row)">
                            <img class="table-img" :src="delImg" />
                        </el-button>
                    </div>

                </template>
            </my-table>
        </div>
        <div class="flight-footer">
            <my-page :pageData="pageData" @changePage="changePage"></my-page>
        </div>
        <my-dialog :visible="openDialog" :width="'700px'" :title="'班组人员'" @close="openDialog = false" :footer="false">
            <div class="add-info">
                <div class="add-header">
                    <div class="add-title">班组信息</div>
                </div>
                <div class="add-content">
                    <span class="add-text"><span style="color:red">*</span>班组名</span>
                    <el-input class="add-input" disabled v-model="showData.TeamName" placeholder="请输入班组名"></el-input>
                </div>
                <div class="add-header">
                    <div class="add-title">班组人员</div>

                </div>
                <div class="add-content table">
                    <my-table :columnList="peopleColumnList" :tableDataList="selectPeopleList">
                    <template #ID="{ scope }">
                    <div>
                        {{ scope.$index + 1 }}
                    </div>
                </template>
                    </my-table>

                </div>
            </div>
        </my-dialog>
    </div>

</template>
<script>
import MyTable from '@/newComponents/Table.vue'
import MyPage from '@/newComponents/Page.vue'
import MyPicker from '@/newComponents/DatePicker.vue'
import delImg from '@/assets/images/del.png'
import MyDialog from '@/newComponents/Dialog.vue'
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
            delImg: delImg,
            columnList: [],
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            },
            tableList: [],
            searchData: {
                beginTime: this.$moment().subtract(7, 'days').format('YYYY-MM-DD'),
                endTime:this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
                ShiftName: '',
                TeamName: '',
            },
            flightList: [],
            flightName: '不限',
            teamsList: [],
            teamName: '不限',
            beginTime: this.$moment().subtract(7, 'days').format('YYYY-MM-DD'),
            endTime: this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
            openDialog: false,
            showData: '',
            selectPeopleList: [],
            peopleColumnList: []


        }
    },
    methods: {
        //显示班组人员
        editorMan(row) {
            if (!this.jurisdictionObj.bbcxidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            console.log(row)
            this.getRecordManData(row.TeamRecordId).then(res => {
                console.log(res)
                this.showData = res[0]
                this.selectPeopleList = res[0].TeamMember
                this.openDialog = true
            }).catch(err => {
                console.log(err)
            })
            // this.ShiftRecordID


        },
        //修改时间
        getTime(val, type) {
            if (type == 'start') {
                this.beginTime = val
            } else {
                this.endTime = val
            }

        },
        //点击查询按钮
        btnSearch() {
            if (!this.jurisdictionObj.jlcxidshow) {
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
            this.getRecordData()
        },
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex
            this.getRecordData()

        },
        //删除班次记录
        delFlight(row) {
            if (!this.jurisdictionObj.jlscidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.confirm_Pop(this, `是否确认删除${row.Date}班次${row.ShiftName}的记录？`, () => {
                this.$axios({
                    method: 'get',
                    url: `/api/ShiftRecords/DeletePlantInfo?ShiftRecordID=${row.ShiftRecordID}`,
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.getRecordData()
                    } else {
                        this.confirm_Pop2(this, data.msg)
                    }
                }).catch(err => {
                    console.log(err)

                })

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
        //获取班次记录
        getRecordData() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftRecords/QueryShiftRecordsRecordOperate?argBegin=${this.searchData.beginTime}&argEnd=${this.searchData.endTime}&argPageSize=${this.pageData.PageSize}&argPageIndex=${this.pageData.PageIndex}&ShiftName=${this.searchData.ShiftName}&TeamName=${this.searchData.TeamName}`,
                }).then(res => {
                    const data = res.data
                    // console.log(data)
                    if (data.code == 0) {
                        this.tableList = data.data.DataList
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
        getData() {
            this.getAllTeamsInfo().then(res => {
                this.getAllShiftInfo().then(res => {
                    this.getRecordData()
                })
            })
        },
        //获取班组人员
        getRecordManData(TeamRecordId) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/ShiftRecords/TeamOperate?TeamRecordId=${TeamRecordId}`,
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


    },
    mounted() {
        
        this.getData()
        this.columnList = [{
            label: '序号',
            prop: 'NO'
        },
        {
            label: '班次名称',
            prop: 'ShiftName'
        },
        {
            label: '时间分布',
            prop: 'ShiftTime'
        },
        {
            label: '开始-结束时间',
            prop: 'CreateEndTime'
        },
        {
            label: '班组名称',
            prop: 'TeamName'
        },
        {
            label: '日期',
            prop: 'Date'
        },
        {
            label: '操作',
            prop: 'action'
        },
        ]
        this.peopleColumnList = [{
            label: '序号',
            prop: 'ID'

        },
        {
            label: '用户名称',
            prop: 'TeamName'
        },
        {
            label: '工号',
            prop: 'TeamName'
        },
        {
            label: '角色',
            prop: 'TeamsRole'

        },]

    }
}
</script>
<style lang="scss" scoped>
@import '../index.scss';
</style>