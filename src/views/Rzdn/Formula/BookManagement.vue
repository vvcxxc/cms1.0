<!-- 指导书管理 -->
<template>
    <div class="book-management">
        <div ref="contentHeader" class="header">
            <div class="header-item">
                <el-input class="header-input" v-model="keyWord" placeholder="请输入关键字"></el-input>
            </div>
            <div class="header-item">
                <span>上传时间</span>
                <my-picker :startTime="beginTime" :endTime="endTime" @getTime="getTime"></my-picker>
            </div>
            <div class="header-item">
                <el-button class="btn search-btn" @click="searchBtn">查询</el-button>
            </div>
            <div class="header-right">
                <el-upload ref="bookUpload" :disabled="tips == '正在上传' || !canUpload" class="upload-demo" action="/"
                    :show-file-list="false" :on-change="handleChange" accept=".pdf" :limit="20" :auto-upload="false"
                    :multiple="true" :on-exceed="handleExceed">
                    <el-button class="btn add-btn" :loading="tips == '正在上传'" @click="handleUploadSheet">{{ tips }}
                    </el-button>
                </el-upload>
                <el-button class="btn del-btn" @click="delBtn">删除</el-button>
            </div>
        </div>
        <div class="centent" :style="{ height: tableHeight }">
            <my-table :isSelection="true" :columnList="columnList" :tableDataList="tableDataList"
                @selectionChange="selectionChange">
                <template #ID="{ scope }">
                    <div>
                        {{ scope.$index + 1 + pageData.PageSize * (pageData.PageIndex - 1) }}
                    </div>
                </template>
                <template #action="{ scope }">
                    <el-button class="table-btn look-btn" @click="lookPdf(scope.row)">查看</el-button>

                </template>
            </my-table>

        </div>
        <div class="footer">
            <my-page :pageData="pageData" @changePage="changePage"></my-page>

        </div>
        <my-dialog :visible="pdfDialog" :toBody="true" :width="'80%'" :title="'指导书查看'" @close="pdfDialog = false"
            :footer="false">
            <!-- <div class="pdf-class"> -->
            <pdf-book v-if="pdfDialog" :pdfUrl="pdfUrl"></pdf-book>
            <!-- </div> -->


        </my-dialog>
    </div>
</template>
<script>
import MyTable from '@/newComponents/Table.vue'
import MyPage from '@/newComponents/Page.vue'
import MyPicker from '@/newComponents/DatePicker.vue'
import MyDialog from '@/newComponents/Dialog.vue'
import PdfBook from './components/PdfBook.vue'
export default {
    components: {
        MyTable,
        MyPicker,
        MyPage,
        MyDialog,
        PdfBook
    },
    data() {
        return {
            columnList: [],
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            },
            tableHeight: `calc(100% - 130px)`,
            pdfDialog: false,
            searchData: {
                keyWord: '',
                beginTime: '',
                endTime: '',

            },
            beginTime: '',
            endTime: '',
            tableDataList: [],
            keyWord: '',
            selectionList: [],
            pdfUrl: '',
            tips: '上传指导书',
            progressNumber: 0,
            uploadNumber: 0,
            userAccount: '',

            jurisdiction: [],
            buttonarr: [],
            scid: '',
            cxid: '',
            ckid: '',
            delid: '',
            scshow: true,
            cxshow: true,
            ckshow: true,
            delshow: true,
            canUpload: true
        }
    },
    methods: {
        handleExceed(files) {
            // console.log(files)
            this.confirm_Pop2(this, '一次性上传指导书数量不能大于20')

        },
        handleUploadSheet() {
            if (!this.scshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                this.canUpload = false;
            } else {
                this.canUpload = true;
            }
        },
        //导入按钮
        handleChange(file, fileList) {
            // console.log(fileList)
            let formData = new FormData()
            formData.append('', file.raw)
            this.uploadNumber++
            this.tips = '正在上传'
            this.$axios({
                method: 'POST',
                url: `/api/GuidingBook/AddGuidingBookAsync?userAccount=${this.userAccount}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then(res => {
                const data = res.data
                this.$refs.bookUpload.clearFiles();
                if (data.code == 0) {

                    this.progressNumber++
                    if (this.progressNumber == this.uploadNumber) {
                        this.uploadNumber = 0
                        this.progressNumber = 0
                        this.tips = '上传指导书'

                    }
                    this.getGuidingBookList()

                } else {
                    this.tips = '上传指导书'
                    this.uploadNumber = 0
                    this.progressNumber = 0
                    this.confirm_Pop2(this, data.msg)
                }

            }).catch(err => {
                this.tips = '上传指导书'
                this.uploadNumber = 0
                this.progressNumber = 0
                this.$refs.upload.clearFiles();
            })
        },
        //按钮查询
        searchBtn() {
            if (!this.cxshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                return;
            }
            this.searchData = {
                keyWord: this.keyWord,
                beginTime: this.beginTime,
                endTime: this.endTime
            }
            this.pageData.PageIndex = 1
            this.getGuidingBookList()
        },
        //删除按钮
        delBtn() {
            if (!this.delshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                return;
            }
            if (this.selectionList.length <= 0) {
                this.confirm_Pop2(this, '请选择要删除的数据')
                return
            }
            this.confirm_Pop(this, '是否删除选择数据?', () => {
                let data = []
                this.selectionList.forEach(item => {
                    data.push(item.ID)
                })
                this.deleteGuidingBook(data).then(res => {
                    this.getGuidingBookList()
                })
            })

        },
        //多选选择
        selectionChange(selection) {
            this.selectionList = selection

        },
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex
            this.getGuidingBookList()
        },
        //修改时间
        getTime(val, type) {
            if (type == 'start') {
                this.beginTime = val
            } else {
                this.endTime = val
            }

        },
        //  //监听窗口变化
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
        //查看指导书
        lookPdf(row) {
            if (!this.ckshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                return;
            }
            // console.log(row)
            // this.$axios({
            //     method: 'GET',
            //     url: `/api/GuidingBook/GetFileByID/${row.ID}`,
            //     responseType: 'blob'
            // }).then(res => {
            //     var blob = new Blob([res.data], {
            //         type: 'application/pdf;chartset=UTF-8'
            //     })
            //     this.pdfUrl = URL.createObjectURL(blob)
            //     this.pdfDialog = true
            // }).catch(err => {
            //     this.confirm_Pop2(this, err)
            //     // console.log(err)

            // })
            this.pdfUrl = `/api/GuidingBook/GetFileByID/${row.ID}`
            this.pdfDialog = true

        },

        //删除指导书
        deleteGuidingBook(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/GuidingBook/DeleteGuidingBook`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        resolve(data.data)
                    } else {
                        reject(data.msg)
                    }
                    // const data = res.data
                }).catch(err => {
                    reject(err)

                })
            })

        },

        //获取指导书列表
        getGuidingBookList() {
            let data = {
                "KeyWord": this.searchData.keyWord,//null即忽略
                "BeginTime": this.searchData.beginTime,//null即忽略
                "EndTime": this.searchData.endTime,//null即忽略
                "PageIndex": this.pageData.PageIndex,
                "PageSize": this.pageData.PageSize
            }
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/GuidingBook/GetGuidingBookListPage`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.tableDataList = data.data.Data
                        this.pageData.TotalCount = data.data.TotalCount
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
        //获取指导书文件
        getGuidingBookInfo(id) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'GET',
                    url: `/api/GuidingBook/GetFileByID/${id}`,

                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {

                        resolve(data.data)
                    } else {
                        reject(data.msg)
                    }
                }).catch(err => {
                    reject(err)
                })

            })
        },
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = []
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i])
                    return temPath
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(id, node[i].Children, temPath)
                    if (findResult) {
                        return findResult
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split("?");
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split("&");
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");
                    if (arr && arr[0] == paraName) {

                        return arr[1]
                    }
                }
                return ''
            } else {
                return ''
            }
        },
    },
    mounted() {
        this.userAccount = JSON.parse(sessionStorage.getItem('userInfo1'))
            ? JSON.parse(sessionStorage.getItem('userInfo1'))
                .SCMSUserAccount
            : JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                .SCMSUserAccount;
        this.getGuidingBookList()
        setTimeout(() => {
            this.watchResize()
        });

        this.columnList = [{
            label: '序号',
            width: '80px',
            prop: 'ID',

        },
        {
            label: '指导书名称',
            prop: 'Name',

        },
        {
            label: '上传时间',
            prop: 'CreateTime',

        },

        {
            label: '操作人',
            prop: 'CreateUser',

        },
        {
            label: '操作',
            prop: 'action',
            width: '100px'

        },

        ]

        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        console.log("buttom1", this.buttonarr)
        this.buttonarr.forEach((item) => {
            if (item.RightDesc == "指导书管理-上传指导书") {
                this.scid = item.RightID
            } else if (item.RightDesc == "指导书管理-查询指导书") {
                this.cxid = item.RightID
            } else if (item.RightDesc == "指导书管理-查看指导书") {
                this.ckid = item.RightID
            } else if (item.RightDesc == "指导书管理-删除指导书") {
                this.delid = item.RightID
            }
        })
        var userid = ''
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            userid = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserID;
        } else {
            userid = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserID;
        }
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
        }).then(res => {
            this.scshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
        }).then(res => {
            this.cxshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`,
        }).then(res => {
            this.ckshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.delid}`,
        }).then(res => {
            this.delshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
    },

}
</script>
<style lang="scss" scoped>
.book-management {
    margin-top: 90px;
    height: calc(100% - 120px);
    padding-top: 20px;
    background: rgba(238, 238, 238);
    // min-width:1350px;
    // overflow:auto;

    .header {
        overflow: hidden;
        background-color: rgb(221, 221, 221);
        padding: 20px;

        &-item {
            display: inline-block;
            margin-right: 20px;

            span {
                margin-right: 10px
            }
        }

        &-input {
            width: 160px
        }
    }

    .centent {
        background: #fff;
        padding: 20px 20px 0;
        height: calc(100% - 130px)
    }

    .footer {
        padding: 0 20px;
        height: 50px;
        display: flex;
        align-items: center;
        background: #fff;
    }

    .btn {
        height: 40px;
        font-weight: 600;
        font-size: 16px;
        padding: 0 10px;
        // margin: 0 10px;
        min-width: 100px
    }

    .search-btn {
        color: #fff;
        background: #4270E4;

    }

    .add-btn {
        border: 2px solid rgb(110, 202, 60);
        color: rgb(110, 202, 60);
    }

    .btn2 {
        border: 2px solid rgb(252, 174, 56);
        color: rgb(252, 174, 56);
    }

    .del-btn {
        background: #AAAAAA;
        color: #fff
    }

    .header-right {
        float: right
    }

    .table-btn {
        border: 1px solid #E4E4E4;
        height: 30px;
        width: 60px;
        font-size: 14px;
        padding: 0
    }

    .look-btn {
        color: #4270E4
    }

    .upload-demo {
        display: inline-block;
        margin: 0 10px
    }
}
</style>