<!-- 班组配置 -->
<template>
    <div class="flight">
        <div class="flight-header">
            <el-button class="btn1 add" @click="addTeam">+新增</el-button>
        </div>
        <div class="flight-centent">
            <my-table :columnList="columnList" :tableDataList="teamTableList">
                <template #action="{ scope }">
                    <div style="text-align:center">
                        <el-button class="table-btn" @click="editorTeam(scope.row)">
                            <img class="table-img" :src="bianjiImg" />
                        </el-button>
                        <el-button class="table-btn" @click="delTeam(scope.row)">
                            <img class="table-img" :src="delImg" />
                        </el-button>
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
                    <div class="add-title">班组信息</div>
                </div>
                <div class="add-content">
                    <span class="add-text"><span style="color:red">*</span>班组名</span>
                    <el-input class="add-input" v-model="teamName" placeholder="请输入班组名"></el-input>

                </div>
                <div class="add-header">
                    <div class="add-title">班组人员</div>
                    <el-button class="add-btn del1" @click="delPeopleListFun">删除</el-button>
                    <el-button class="add-btn add1" @click="openPeopleDialog">添加</el-button>
                </div>
                <div class="add-content table">
                    <my-table :isSelection="true" :columnList="peopleColumnList" :tableDataList="selectPeopletableList"
                        @select="selectDelPeople" @selectAll="selectDelPeople">
                        <template #ID="{ scope }">
                            <div>
                                {{ scope.$index + 1 }}
                            </div>
                        </template>
                    </my-table>

                </div>
            </div>
        </my-dialog>
        <my-dialog :toBody="true" :visible="peopleDialog" :width="'700px'" :title="'添加班组人员'"
            @close="peopleDialog = false" @ok="peopleOk">
            <div class="add-info">
                <div class="add-header">
                    <span class="add-text">用户名称</span>
                    <el-input class="search-input" v-model="userKey" placeholder="请输入关键字"></el-input>
                    <el-button class="add-btn search1" @click="searchUser">查找</el-button>
                </div>
                <div class="add-content table">
                    <my-table :isSelection="true" refName='people' :columnList="peopleColumnList"
                        :tableDataList="peopleList" @select="selectPeople" @selectAll="selectPeople">
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
import delImg from '@/assets/images/del.png'
import bianjiImg from '@/assets/images/icon_pensoil.png'
import MyDialog from '@/newComponents/Dialog.vue'
import { randomRangeId } from '@/util/tool.js'
export default {
    components: {
        MyTable,
        MyPage,
        MyDialog
    },
    props: ['jurisdictionObj'],
    watch: {
        jurisdictionObj(v) {
            console.log("ccc", v)
        }
    },
    data() {
        return {
            keyword: '',
            peopleDialog: false,
            bianjiImg: bianjiImg,
            delImg: delImg,
            columnList: [],
            peopleColumnList: [],
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            },
            openDialog: false,
            dialogData: {
                width: '700px',
                title: '新增班组',
            },
            peopleList: [],
            selectPeopleList: [],
            userKey: '',
            teamName: '',//班组名称
            delPeopleList: [],
            teamTableList: [],
            editTeamData: '',
            selectPeopletableList: []

        }
    },
    methods: {
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex
            this.getTeamData()
        },
        //删除用户
        delPeopleListFun() {
            console.log(this.delPeopleList)
            if (this.delPeopleList.length <= 0) {
                this.confirm_Pop2(this, '请先选择删除项')
                return
            }
            this.confirm_Pop(this, '是否确定删除选择的班组人员？', () => {
                this.delPeopleList.forEach((item, index) => {
                    console.log(item)
                    let list = JSON.parse(JSON.stringify(this.selectPeopletableList))
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].UserID == item.UserID) {
                            this.selectPeopletableList.splice(i, 1)
                            // this.delPeopleList.splice(index, 1)
                            // break
                        }
                    }
                })
            })

        },
        //删除用户多选
        selectDelPeople(selection) {
            this.delPeopleList = selection

        },
        //弹窗确定
        dialogOk() {
            if (!this.teamName.trim()) {
                this.confirm_Pop2(this, '班组名称不能为空')
                return
            }
            let guid = randomRangeId()
            let teamMember = [
            ]
            if (this.selectPeopletableList.length <= 0) {
                this.confirm_Pop2(this, '班组人员不能为空，请先添加')
                return
            }
            let updateData = {}
            if (this.dialogData.type == 'add') {
                this.selectPeopletableList.forEach((item, index) => {
                    let data = {
                        TeamName: item.UserName,
                        TeamID: item.UserID,
                        TeamsRole: item.RoleName
                    }
                    teamMember.push(data)
                })
                updateData = {
                    TeamName: this.teamName,
                    TeamMember: teamMember
                }

                this.teamOperate(updateData).then(res => {
                    this.getTeamData()
                    this.openDialog = false

                }).catch(err => {
                    this.confirm_Pop2(this, err)
                })


            } else if (this.dialogData.type == 'editor') {
                this.selectPeopletableList.forEach((item, index) => {
                    let data = {
                        TeamName: item.UserName,
                        TeamID: item.UserID,
                        TeamsRole: item.RoleName,
                        Teams: this.editTeamData.Teams,
                        CreateTime: this.editTeamData.CreateTime

                    }
                    teamMember.push(data)
                })
                updateData = {
                    // Table:this.editTeamData.ID,
                    TeamName: this.teamName,
                    Teams: this.editTeamData.Teams,
                    CreateTime: this.editTeamData.CreateTime,
                    TeamMember: teamMember
                }
                this.teamEndit(updateData, this.editTeamData.Teams).then(res => {
                    this.getTeamData()
                    this.openDialog = false

                }).catch(err => {
                    this.confirm_Pop2(this, err)
                })

            }

            // console.log(updateData)

        },
        //选择用户确定
        peopleOk() {
            this.selectPeopleList.forEach(item => {
                this.selectPeopletableList.push(item)
                // let sameList = this.selectPeopletableList.filter(item1 => {
                //     return item1.UserID == item.UserID
                // })
                // if (sameList.length <= 0) {
                //     this.selectPeopletableList.push(item)
                // }
            })

            this.peopleDialog = false
        },
        //选择用户
        selectPeople(selection) {
            this.selectPeopleList = selection
        },
        //查找用户
        searchUser() {
            this.getUserData(this.userKey)
            // console.log(this.userKey)

        },
        //添加班组
        addTeam() {
            if (!this.jurisdictionObj.pzxzidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.dialogData.title = '新增班组'
            this.dialogData.type = 'add'
            this.teamName = ''
            this.selectPeopleList = []
            this.selectPeopletableList = []
            this.openDialog = true
        },
        //编辑班组
        editorTeam(row) {
            if (!this.jurisdictionObj.pzbjidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.editTeamData = row
            this.dialogData.title = '编辑班组'
            this.dialogData.type = 'editor'
            this.teamName = row.TeamName
            let teamsList = row.TeamsList.split(',')
            this.selectPeopleList = []
            this.selectPeopletableList = []
            // console.log(teamsList)
            this.getUserData('').then(res => {
                let list = res
                // console.log(list)
                teamsList.forEach((item, index) => {
                    for (let i = 0; i < list.length; i++) {
                        if (item === list[i].UserName) {
                            this.selectPeopletableList.push(list[i])
                            break
                        }
                    }
                })
                this.openDialog = true
            })

        },
        //删除班组
        delTeam(row) {
            if (!this.jurisdictionObj.pzscidshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.confirm_Pop(this, '删除班组可能会影响该班组的关联生产记录，是否确定删除选中的班组?', () => {
                this.delTeamApi(row.TeamRecordId).then(res => {
                    console.log(res)
                    this.getTeamData()
                }).catch(err => {
                    console.log(err)
                })

            })

        },
        openPeopleDialog() {
            this.getUserData('').then(res => {
                let newList = []
                this.selectPeopletableList.map(item => {
                    newList.push(item.UserID)
                })
                let newList1 = this.peopleList.filter(item => {
                    return newList.indexOf(item.UserID) < 0
                })
                this.peopleList = newList1
                this.peopleDialog = true

            })
        },
        //获取班组数据
        getTeamData() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/Team/QueryTeamOperate?argPageSize=${this.pageData.PageSize}&argPageIndex=${this.pageData.PageIndex}&argKeyword=${this.keyword}`,
                }).then(res => {
                    const data = res.data
                    // console.log(data)
                    if (data.code == 0) {
                        this.teamTableList = data.data.DataList
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
        //获取用户数据
        getUserData(keyword) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'post',
                    url: `/api/Team/QueryTeamInfo?argKeyword=${keyword}`,
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.peopleList = data.data
                        resolve(data.data)
                    } else {
                        reject(data.msg)
                    }
                    // console.log(data)
                }).catch(err => {
                    reject(err)
                })

            })
        },

        //删除班组
        delTeamApi(id) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'DELETE',
                    url: `/api/Team/DeleteTeamOperate?TeamRecordId=${id}`,
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
        //班组配置
        teamOperate(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'post',
                    url: `/api/Team/TeamOperate`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        // this.peopleList = data.data
                        resolve(data.data)
                    } else {
                        reject(data.data)
                    }
                    // console.log(data)
                }).catch(err => {
                    reject(err)
                })

            })
        },

        //编辑班组
        teamEndit(data, Teams) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'post',
                    url: `/api/Team/TeamEndit?Teams=${Teams}`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        // this.peopleList = data.data
                        resolve(data.data)
                    } else {
                        reject(data.data)
                    }
                    // console.log(data)
                }).catch(err => {
                    reject(err)
                })

            })
        }



    },
    mounted() {
        this.getTeamData()
        this.columnList = [{
            label: '序号',
            prop: 'ID',
            width: '300px'
        },
        {
            label: '班组名称',
            prop: 'TeamName',
        },
        {
            label: '班组人员',
            prop: 'TeamsList',
        },
        {
            label: '操作',
            prop: 'action',
            width: '300px'
        },


        ]
        this.peopleColumnList = [{
            label: '序号',
            prop: 'ID'

        },
        {
            label: '用户名称',
            prop: 'UserName'
        },
        {
            label: '工号',
            prop: 'UserAccount'
        },
        {
            label: '角色',
            prop: 'RoleName'

        },]

    }
}
</script>
<style lang="scss" scoped>
@import '../index.scss';
</style>