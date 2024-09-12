<template>
    <div class="material">
        <div class="material-header">
            <el-input class="header-input" v-model="keyWord" placeholder="请输入关键字"></el-input>
            <el-button class="btn" @click="searchBtn">查询</el-button>
        </div>
        <div class="material-table">
            <my-table :isSelection="true" :columnList="bookManageColumnList" :tableDataList="tableDataList"
                @selectionChange="selectionChange">
                <template #action="{ scope }">
                    <el-button class="table-btn look-btn" @click="lookPdf(scope.row)">查看</el-button>

                </template>
            </my-table>
        </div>
        <my-page :pageData="pageData"></my-page>
        <div class="footer">
            <my-button class="btn" @btnClick="colse()">取消</my-button>
            <my-button class="btn ok" @btnClick="ok()">保存</my-button>

        </div>
        <my-dialog :visible="pdfDialog" :toBody="true" :width="'80%'" :title="'指导书查看'" @close="pdfDialog = false"
            :footer="false">
            <div class="pdf-class">
                <pdf-book v-if="pdfDialog" :pdfUrl="pdfUrl"></pdf-book>
            </div>


        </my-dialog>


    </div>
</template>

<script>
import MyTable from '@/newComponents/Table.vue'
import MyPage from '@/newComponents/Page.vue'
import MyButton from '@/newComponents/Button.vue'
import PdfBook from './PdfBook.vue'
import MyDialog from '@/newComponents/Dialog.vue'
import { bookManageColumnList } from '../index'
export default {
    components: {
        MyTable,
        MyPage,
        MyButton,
        PdfBook,
        MyDialog
    },
    props: {
        formulaId: {
            type: Number,
            default: null
        },
        workStationId: {
            type: Number,
            default: null
        }

    },
    data() {
        return {
            bookManageColumnList: bookManageColumnList,
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            },
            pdfDialog: false,
            tableDataList: [],
            keyWord: '',
            selectionList: [],
            pdfUrl: ''


        }
    },
    methods: {
         colse(){
            this.$emit('colse')

        },
        //选择指导书
        ok() {
            if (!this.formulaId) {
                this.confirm_Pop2(this, '请先选择配方再进行工位指导书保存')
                return
            }
            if (this.selectionList.length <= 0) {
                this.confirm_Pop2(this, '请先选择需要保存的指导书')
                return
            }
            let list = []
            this.selectionList.forEach(item => {
                list.push({
                    "FormularId": this.formulaId,//配方ID
                    "WorkStationId": this.workStationId,//工位ID
                    "GuidingBookInfoID": item.ID//指导书ID
                })
            })
            this.$axios({
                method: 'POST',
                url: `/api/Formula/AddFormulaGuidingBookByWorkStationID`,
                data: list
            }).then(res => {
                const data = res.data
                if (data.code == 0) {
                    this.$emit('ok', data.data)
                    this.message_Success(this, '保存成功')

                }
                // console.log(data)
            }).catch(err => {

            })

        },
        //选择物料
        selectionChange(selection) {
            this.selectionList = selection
        },
        //查找
        searchBtn() {
            this.pageData.PageIndex = 1
            this.getGuidingBookList(this.keyWord)

        },
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex
            this.getGuidingBookList(this.keyWord)
        },
        //pdf查看
        lookPdf(row) {
            //弹窗指导书查看
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
            //     this.confirm_Pop2(this,err)
            //     console.log(err)

            // })
            this.pdfUrl = `/api/GuidingBook/GetFileByID/${row.ID}`
            this.pdfDialog = true
            // this.pdfDialog = true

        },
        //获取指导书列表
        getGuidingBookList(keyWord) {
            let data = {
                "KeyWord": keyWord,//null即忽略
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
    },
    mounted() {
        this.getGuidingBookList(this.keyWord)
    }
}
</script>
<style scoped lang="scss">
.material {
    &-header {
        padding-bottom: 10px;

        .header-input {
            width: 200px
        }

        .btn {
            width: 100px;
            height: 40px;
            font-weight: 600;
            font-size: 16px;
            color: #fff;
            margin-left: 10px;
            background-color: rgb(56, 109, 240);
        }

    }

    &-table {
        height: 450px
    }

    ::v-deep .page-container {
        flex-wrap: wrap;
    }

    ::v-deep .page-container .left {
        margin: 0;
        padding: 10px 0;
        width: 100%
    }

    ::v-deep .page-container .right {
        justify-content: end;
        width: 100%
    }

    .footer {
        text-align: right;
        padding-top: 10px;

        .btn {
            min-width: 100px;
            height: 38px;
            background: #999999;
            border: 0;
            font-size: 16px;
            color: #FFFFFF;

        }

        .ok {
            background: #386DF0;
        }
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


}
</style>