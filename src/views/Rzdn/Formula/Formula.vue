<!-- 配方管理 -->
<template>
    <div class="formula1">
        <div class="formula" :class="{ colordiv: $store.state.color == 'grey' }">

            <div class="flex-item">
                <div class="title">
                    配方管理
                </div>
                <div class="content">
                    <div class="content-header">
                        <el-button class="btn btn1" @click="addFormula">+新增配方</el-button>
                        <el-upload class="upload-demo" action="" ref="formualUpload" :show-file-list="false"
                            :on-change="handleChange" accept=".xls,.xlsx" :limit="1" :auto-upload="false"
                            :disabled="!canUpload">
                            <el-button class="btn btn2"  @click="handleUploadSheet">导入</el-button>
                        </el-upload>
                        <el-button class="btn btn4" @click="exportFormula">导出</el-button>
                        <el-button class="btn btn3" @click="searchBtn">查询</el-button>
                        <el-input class="header-input" v-model="keyWord" placeholder="请输入关键字"></el-input>
                    </div>
                    <div class="content-content">
                        <my-table :columnList="formulaColumnList" :tableDataList="formulaList"
                            @rowClick="formulaRowClick">
                            <template #ID="{ scope }">
                                <div>
                                    {{ scope.$index + 1 }}
                                </div>
                            </template>
                            <template #material="{ scope }">
                                <div>
                                    <el-button class="table-btn look-btn" @click="materialLook(scope.row)">查看
                                    </el-button>
                                    <el-button class="table-btn look-btn" @click="materialManage(scope.row)">选择
                                    </el-button>
                                </div>
                            </template>
                            <template #action="{ scope }">
                                <div>
                                    <el-button class="table-btn look-btn" @click="updateFormula(scope.row)">
                                        <img class="table-img" :src="bianjiImg" />
                                    </el-button>
                                    <el-button class="table-btn copy-btn" @click="copyFormula(scope.row)">
                                        <img class="table-img" :src="copy" />
                                    </el-button>
                                    <el-button class="table-btn look-btn" @click="delFormula(scope.row)">
                                        <img class="table-img" :src="del1" />
                                    </el-button>
                                </div>
                            </template>
                        </my-table>
                    </div>
                </div>
            </div>

            <div class="flex-item flex-item1">
                <div class="title">
                    工位信息
                </div>
                <div class="content">
                    <div class="content-header"></div>
                    <div class="content-content">
                        <my-table :columnList="stationColumnList" :tableDataList="locationList"
                            @rowClick="locationRowClick">
                            <template #action="{ scope }">
                                <div>
                                    <el-button class="table-btn look-btn" @click="lookBook(scope.row)">查看</el-button>
                                    <el-button class="table-btn look-btn" @click="bookManage(scope.row)">选择</el-button>
                                </div>
                            </template>
                        </my-table>
                    </div>
                </div>
            </div>

            <div class="flex-item flex-item2">
                <div class="title">
                    工艺参数
                </div>
                <div class="content">
                    <div class="content-header">
                        <el-button class="btn btn1" @click="addParameter">+批量新建参数</el-button>

                    </div>
                    <div class="content-content">
                        <my-table :columnList="processColumnList" :tableDataList="formulaParameterList">
                            <template #ID="{ scope }">
                                <div>
                                    {{ scope.$index + 1 }}
                                </div>
                            </template>
                            <template #action="{ scope }">
                                <el-button class="table-btn look-btn" @click="processAction(scope.row)">
                                    <img class="table-img" :src="bianjiImg" />
                                </el-button>
                                <!-- <div class="table-action">
                                <img class="table-img" :src="bianjiImg" @click="processAction(scope)" />
                            </div> -->
                            </template>
                        </my-table>
                    </div>
                </div>
            </div>



        </div>
        <my-dialog :visible="openDialog" :width="dialogData.width" :title="dialogData.title" @close="dialogColse"
            :footer="dialogData.footer" @ok="dialogOk">

            <!-- 新增配方 -->
            <div v-if="dialogData.type == 'addFormula' || dialogData.type == 'updateFormula' || dialogData.type == 'copyFormula'"
                class='add-formula'>
                <div class="add-item">
                    <div class="item-title">配方编号</div>
                    <el-input class="item-input" v-model="addFormulaData.FormularNo" placeholder="请输入配方编号"></el-input>
                </div>
                <div class="add-item">
                    <div class="item-title">配方名称</div>
                    <el-input class="item-input" v-model="addFormulaData.FormularName" placeholder="请输入配方名称"></el-input>
                </div>

            </div>

            <!-- 物料查看 -->
            <div v-if="dialogData.type == 'materialLook' && openDialog" class="material-look">
                <my-table :columnList="materialColumnList" :tableDataList="formulaMaterialList">
                    <template #ID="{ scope }">
                        {{ scope.$index + 1 }}
                    </template>
                    <template #action="{ scope }">
                        <el-button class="table-btn del-btn" @click="delMaterial(scope.row)">删除</el-button>
                        <!-- <div class="table-action">
                                <img class="table-img" :src="bianjiImg" />
                            </div> -->
                    </template>
                </my-table>
            </div>

            <!-- 物料选择 -->
            <!-- <template v-if="dialogData.type == 'materialManage'"> -->
            <material v-if="dialogData.type == 'materialManage' && openDialog" :formulaId="formulaId" @ok="dialogColse"
                @colse="dialogColse">
            </material>
            <!-- <span slot="okBtn">保存</span> -->
            <!-- </template> -->

            <!-- 指导书查看 -->
            <div v-if="dialogData.type == 'lookBook' && openDialog" class="look-book">
                <my-table :columnList="lookBookColumnList" :tableDataList="formulaGuidingBookList">
                    <template #sort="{ scope }">
                        <el-button class="table-btn look-btn" @click="topFormulaGuidingBook(scope.row)">
                            <img class="table-img" :src="iconUp" />
                        </el-button>
                    </template>
                    <template #ID="{ scope }">
                        <div>
                            {{ scope.$index + 1}}
                        </div>
                    </template>
                    <template #action="{ scope }">
                        <el-button class="table-btn look-btn" @click="dialogLookBook(scope.row)">查看</el-button>
                        <el-button class="table-btn del-btn" @click="delBook(scope.row)">删除</el-button>

                    </template>
                </my-table>
            </div>

            <!-- 指导书选择 -->
            <!-- <template v-if="dialogData.type == 'bookManage'"> -->
            <book-manage v-if="dialogData.type == 'bookManage' && openDialog" :workStationId="workStationId"
                :formulaId="formulaId" @ok="dialogColse" @colse="dialogColse"></book-manage>
            <!-- </template> -->

            <!-- 批量新建参数 -->
            <template v-if="dialogData.type == 'addParameter' && openDialog">
                <add-parameter :data="formulaParameterList" :workStationId="workStationId" :formulaId="formulaId"
                    @ok="updateProcess" @colse="dialogColse">
                </add-parameter>
                <!-- <span slot="okBtn">保存</span> -->
            </template>

            <!-- 工艺参数操作 -->
            <!-- <template v-if="dialogData.type == 'processAction'"> -->
            <process-action v-if="dialogData.type == 'processAction' && openDialog" :processData="processData"
                @ok="updateProcess" @colse="dialogColse"></process-action>
            <!-- <span slot="okBtn">保存</span> -->
            <!-- </template> -->


        </my-dialog>
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
import MyDialog from '@/newComponents/Dialog.vue'
import Material from './components/Material.vue'
import BookManage from './components/BookManage.vue'
import AddParameter from './components/AddParameter.vue'
import ProcessAction from './components/ProcessAction.vue'
import PdfBook from './components/PdfBook.vue'
import bianjiImg from '@/assets/images/icon_edit.png'
import iconUp from '@/assets/images/icon_up.png'
import copy from '@/assets/images/icon_copy.png'
import del1 from '@/assets/images/icon_del2.png'
import { importfxx } from '@/util/tool.js'
import { formulaColumnList, stationColumnList, processColumnList, materialColumnList, lookBookColumnList } from './index'
export default {
    components: {
        MyTable,
        MyDialog,
        Material,
        BookManage,
        AddParameter,
        ProcessAction,
        PdfBook
    },
    data() {
        return {
            formulaColumnList: formulaColumnList,
            stationColumnList: stationColumnList,
            processColumnList: processColumnList,
            materialColumnList: materialColumnList,
            lookBookColumnList: lookBookColumnList,
            bianjiImg: bianjiImg,
            pdfDialog: false,
            copy: copy,
            del1: del1,
            iconUp: iconUp,
            openDialog: false,
            dialogFooter: true,
            dialogData: {
                width: '500px',
                title: '',
                type: '',
                footer: true
            },
            addFormulaData: {
                FormularNo: '',
                FormularName: ''
            },
            formulaList: [],
            formulaId: null,
            formulaMaterialList: [],
            keyWord: '',
            locationList: [],

            workStationId: '',
            formulaGuidingBookList: [],
            pdfUrl: '',
            formulaParameterList: [],
            processData: '',
            copyData: '',
            jurisdiction: [],
            buttonarr: [],
            xzpfid: '',
            xzpfshow: true,
            ckwlid: '',
            ckwlshow: true,
            xzwlid: '',
            xzwlshow: true,
            drpfid: '',
            drpfshow: true,
            dcpfid: '',
            dcpfshow: true,
            cxpfid: '',
            cxpfshow: true,
            xgpfid: '',
            xgpfshow: true,
            fzpfid: '',
            fzpfshow: true,
            scpfid: '',
            scpfshow: true,
            ckzdsid: '',
            ckzdsshow: true,
            xzzdsid: '',
            xzzdsshow: true,
            plbjcsid: '',
            plbjcsshow: true,
            bjcsid: '',
            bjcsshow: true,
            canUpload: true
        }
    },
    watch: {
        formulaId(n, o) {
            // console.log(n)
            this.getFormulaParameterList(this.formulaId, this.workStationId)

        },
        workStationId(n, o) {
            this.getFormulaParameterList(this.formulaId, this.workStationId)
            // console.log(n)

        },
    },
    methods: {
        handleUploadSheet() {
            if (!this.drpfshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                this.canUpload = false;
            }else{
                this.canUpload = true;
            }
        },
        //导入按钮
        handleChange(file) {
            // console.log(file)
            let formData = new FormData()
            formData.append('', file.raw)
            this.$axios({
                method: 'POST',
                url: `/api/Formula/ImportFormulaAsync`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then(res => {
                const data = res.data
                this.$refs.formualUpload.clearFiles();

                if (data.code == 0) {
                    this.message_Success(this, data.data)
                    this.formulaId = ''
                    this.getFormulaList(this.keyWord)
                } else {
                    this.confirm_Pop2(this, data.msg)
                }

            }).catch(err => {
                this.$refs.formualUpload.clearFiles();

            })
        },
        //导出配方列表
        exportFormula() {
            if (!this.dcpfshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            let data = {
                "PageIndex": 1,
                "PageSize": 10000
            }
            this.$axios({
                method: 'POST',
                url: `/api/Formula/ExportFormula`,
                data: data,
                responseType: 'arraybuffer'
            }).then(res => {
                this.downloadFile(res.data, `配方列表.xls`)

            }).catch(err => {

            })


        },
        // 上移配方工位指导书项
        topFormulaGuidingBook(row) {
            this.$axios({
                method: 'POST',
                url: `/api/Formula/TopFormulaGuidingBookByWorkStationID?formulaGuidingBooksID=${row.ID}`,
            }).then(res => {
                const data = res.data
                if (data.code == 0) {
                    this.getFormulaGuidingBook(this.workStationId)

                } else {
                    this.confirm_Pop2(this, data.msg)
                }
            }).catch(err => {
                console.log(err)
            })

        },
        //点击工位信息
        locationRowClick(row) {
            this.workStationId = row.WorkStationId
        },
        //点击配方列
        formulaRowClick(row) {
            this.formulaId = row.ID
            if (this.locationList.length > 0) {
                this.workStationId = this.locationList[0].WorkStationId
            } else {
                this.workStationId = null
            }
            // this.workStationId = this.locationList[0].WorkStationId
            // console.log(row)
        },
        //查询
        searchBtn() {
            if (!this.cxpfshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.formulaId = ''
            this.getFormulaList()
        },

        //弹窗指导书查看
        dialogLookBook(row) {
            // this.$axios({
            //     method: 'GET',
            //     url: `/api/GuidingBook/GetFileByID/${row.GuidingBookID}`,
            //     responseType: 'blob'
            // }).then(res => {
            //     var blob = new Blob([res.data], {
            //         type: 'application/pdf;chartset=UTF-8'
            //     })
            //     this.pdfUrl = URL.createObjectURL(blob)
            //     this.pdfDialog = true
            // }).catch(err => {
            //     console.log(err)

            // })
            this.pdfUrl = `/api/GuidingBook/GetFileByID/${row.GuidingBookID}`
            this.pdfDialog = true

        },
        //弹窗关闭
        dialogColse() {
            this.openDialog = false


        },
        //设置弹窗
        setDialogData(title, width, type, footer) {
            this.dialogData = {
                title: title,
                width: width,
                type: type,
                footer: footer
            }

        },
        //弹窗确定
        dialogOk() {
            if (!this.addFormulaData.FormularNo.trim()) {
                this.confirm_Pop2(this, '配方编号不能为空')
                return

            }
            if (!this.addFormulaData.FormularName.trim()) {
                this.confirm_Pop2(this, '配方名称不能为空')
                return

            }
            if (this.dialogData.type == 'addFormula') {
                let data = {
                    "FormularNo": this.addFormulaData.FormularNo,
                    "FormularName": this.addFormulaData.FormularName
                }
                this.addFormulaApi(data).then(res => {
                    // console.log(res)
                    this.openDialog = false
                    this.getFormulaList()
                }).catch(err => {
                    // console.log(err)
                    this.confirm_Pop2(this, err)
                })
            }
            if (this.dialogData.type == 'updateFormula') {
                this.updateFormulaApi(this.addFormulaData).then(res => {
                    // console.log(res)
                    this.openDialog = false
                    this.getFormulaList()
                }).catch(err => {
                    this.confirm_Pop2(this, err)
                    // console.log(err)
                })
            }
            if (this.dialogData.type == 'copyFormula') {
                let data = {
                    "OldItemID": this.copyData.ID,
                    "NewInfo": {
                        "FormularNo": this.addFormulaData.FormularNo,
                        "FormularName": this.addFormulaData.FormularName,
                    }

                }
                this.copyFormulaApi(data).then(res => {
                    this.openDialog = false
                    this.getFormulaList()
                }).catch(err => {
                    this.confirm_Pop2(this, err)
                })

            }

        },
        // 新增配方
        addFormula() {
            if (!this.xzpfshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.setDialogData('新增配方', '600px', 'addFormula', true)
            this.addFormulaData = {
                FormularNo: '',
                FormularName: ''
            },
                this.openDialog = true
        },

        //物料查看
        materialLook(row) {
            if (!this.ckwlshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.setDialogData('物料查看', '750px', 'materialLook', false)
            this.formulaId = row.ID
            this.getFormulaMaterialInfo(row.ID)
            this.dialogFooter = false
            this.openDialog = true
        },

        //物料选择
        materialManage(row) {
            if (!this.xzwlshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.openDialog = true
            this.formulaId = row.ID
            this.setDialogData('物料管理', '750px', 'materialManage', false)
        },

        //修改配方
        updateFormula(row) {
            if (!this.xgpfshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.setDialogData('修改配方', '600px', 'updateFormula', true)
            this.addFormulaData = {
                ID: row.ID,
                FormularNo: row.FormularNo,
                FormularName: row.FormularName
            }
            this.openDialog = true

        },

        //复制配方
        copyFormula(row) {
            if (!this.fzpfshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.copyData = row
            this.addFormulaData = {
                FormularNo: '',
                FormularName: ''
            },
                this.setDialogData('复制配方', '600px', 'copyFormula', true)
            this.openDialog = true

        },

        //删除配方
        delFormula(row) {
            if (!this.scpfshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.confirm_Pop(this, '是否确认删除该配方?', () => {
                let data = [row.ID]
                this.deleteFormulaApi(data).then(res => {
                    this.formulaId = ''
                    this.getFormulaList()
                }).catch(err => {
                    this.confirm_Pop2(this, err)
                })

            })

        },

        //弹窗物料删除
        delMaterial(row) {
            // console.log(row)
            this.confirm_Pop(this, '是否确认删除该物料?', () => {
                let data = [row.ID]
                this.$axios({
                    method: 'POST',
                    url: `/api/Formula/DeleteFormulaMaterialInfo`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.getFormulaMaterialInfo(this.formulaId)
                        console.log('删除成功')
                    }
                    // console.log(data)
                }).catch(err => {
                })

            })
        },

        //指导书删除
        delBook(row) {
            console.log(row)
            this.confirm_Pop(this, '是否确认删除该指导书?', () => {
                let data = [row.ID]
                this.deleteFormulaGuidingBook(data).then(res => {
                    this.getFormulaGuidingBook(this.workStationId)
                })


            })
        },

        //指导书查看
        lookBook(row) {
            if (!this.ckzdsshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            if (!this.formulaId) {
                this.confirm_Pop2(this, '请先选择配方再进行工位指导书查看')
                return
            }
            this.workStationId = row.WorkStationId
            this.getFormulaGuidingBook(row.WorkStationId).then(res => {
                this.setDialogData('指导书查看', '750px', 'lookBook', false)
                this.openDialog = true

            })

        },

        //指导书选择
        bookManage(row) {
            if (!this.xzzdsshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.openDialog = true
            this.workStationId = row.WorkStationId
            this.setDialogData('指导书管理', '750px', 'bookManage', false)
        },

        //批量新增参数
        addParameter() {
            if (!this.plbjcsshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            if (!this.formulaId) {
                this.confirm_Pop2(this, '请先选择配方再新建工艺参数')
                return
            }
            if (!this.workStationId) {
                this.confirm_Pop2(this, '请先选择工位再新建工艺参数')
                return
            }
            this.setDialogData('批量新建参数', '1100px', 'addParameter', false)
            this.openDialog = true

        },

        //工艺参数编辑
        processAction(row) {
            if (!this.bjcsshow) {
                this.confirm_Pop2(this, '该账户无操作权限！')
                return;
            }
            this.openDialog = true
            this.processData = JSON.parse(JSON.stringify(row))
            // console.log(this.processData)
            this.setDialogData('工艺参数', '600px', 'processAction', false)
        },

        //编辑工艺参数成功
        updateProcess() {
            this.openDialog = false
            this.getFormulaParameterList(this.formulaId, this.workStationId)
        },

        //新增配方接口
        addFormulaApi(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/Formula/AddFormula`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
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
        //更新配方接口
        updateFormulaApi(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/Formula/UpdateFormula`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
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
        //删除配方接口
        deleteFormulaApi(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/Formula/DeleteFormula`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
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
        //获取配方列表接口
        getFormulaList() {
            let data = {
                "KeyWord": this.keyWord,
                "PageIndex": 1,
                "PageSize": 10000
            }
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/Formula/GetFormulaListPage`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.formulaList = data.data.Data
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

        //获取配方物料列表
        getFormulaMaterialInfo(ID) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/Formula/GetFormulaMaterialInfo?formularId=${ID}`,
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.formulaMaterialList = data.data.result
                        // console.log(data)
                        resolve(data.data)
                    } else {
                        reject(data)
                    }
                }).catch(err => {
                    reject(err)
                })

            })

        },

        //获取工位列表信息
        getLocationList() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'GET',
                    url: `/api/LocationSetting/GetLocationReport`,
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.locationList = data.data
                        // console.log(data)
                        resolve(data.data)
                    } else {
                        reject(data)
                    }
                }).catch(err => {
                    reject(err)
                })

            })

        },

        //获取配方工位指导书项
        getFormulaGuidingBook(workStationID) {

            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/Formula/GetFormulaGuidingBookByWorkStationID?formularId=${this.formulaId}&workStationID=${workStationID}`,
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        this.formulaGuidingBookList = data.data.result
                        // console.log(data)
                        resolve(data.data)
                    } else {
                        reject(data)
                    }
                }).catch(err => {
                    reject(err)
                })

            })
        },

        //删除配方工位指导书项
        deleteFormulaGuidingBook(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/Formula/DeleteFormulaGuidingBookByWorkStationID`,
                    data: data
                }).then(res => {
                    const data = res.data
                    if (data.code == 0) {
                        // this.formulaGuidingBookList = data.data.result
                        // console.log(data)
                        resolve(data.data)
                    } else {
                        reject(data)
                    }
                }).catch(err => {
                    reject(err)
                })

            })
        },

        //获取配方工位工艺参数列表
        getFormulaParameterList(formularId, workStationID) {
            if (!formularId) return
            if (!workStationID) return
            this.$axios({
                method: 'POST',
                url: `/api/Formula/GetFormulaParameterInfoByWorkStationID?formularId=${formularId}&workStationID=${workStationID}`,
            }).then(res => {
                const data = res.data
                if (data.code == 0) {
                    this.formulaParameterList = data.data.result

                }
            }).catch(err => {

            })

        },
        //复制配方
        copyFormulaApi(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: ` /api/Formula/CopyFormula`,
                    data: data
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

    },
    mounted() {
        this.getFormulaList().then(res => {
            // console.log( this.formulaList)
            if (this.formulaList.length > 0) {
                this.formulaId = this.formulaList[0].ID
            } else {
                this.formulaId = null
            }

        })
        this.getLocationList().then(res => {
            if (this.locationList.length > 0) {
                this.workStationId = this.locationList[0].WorkStationId
            } else {
                this.workStationId = null
            }
        })

        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        console.log("buttom1", this.buttonarr)
        this.buttonarr.forEach((item) => {
            if (item.RightDesc == "配方管理-新增配方") {
                this.xzpfid = item.RightID
            }
            else if (item.RightDesc == "配方管理-查看物料") {
                this.ckwlid = item.RightID
            }
            else if (item.RightDesc == "配方管理-选择物料") {
                this.xzwlid = item.RightID
            }
            else if (item.RightDesc == "配方管理-导入配方") {
                this.drpfid = item.RightID
            }
            else if (item.RightDesc == "配方管理-导出配方") {
                this.dcpfid = item.RightID
            }
            else if (item.RightDesc == "配方管理-查询配方") {
                this.cxpfid = item.RightID
            }
            else if (item.RightDesc == "配方管理-修改配方") {
                this.xgpfid = item.RightID
            }
            else if (item.RightDesc == "配方管理-复制配方") {
                this.fzpfid = item.RightID
            }
            else if (item.RightDesc == "配方管理-删除配方") {
                this.scpfid = item.RightID
            }
            else if (item.RightDesc == "配方管理-查看指导书") {
                this.ckzdsid = item.RightID
            }
            else if (item.RightDesc == "配方管理-选择指导书") {
                this.xzzdsid = item.RightID
            }
            else if (item.RightDesc == "配方管理-批量编辑参数") {
                this.plbjcsid = item.RightID
            }
            else if (item.RightDesc == "配方管理-编辑参数") {
                this.bjcsid = item.RightID
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzpfid}`,
        }).then(res => {
            this.xzpfshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckwlid}`,
        }).then(res => {
            this.ckwlshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzwlid}`,
        }).then(res => {
            this.xzwlshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drpfid}`,
        }).then(res => {
            this.drpfshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcpfid}`,
        }).then(res => {
            this.dcpfshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxpfid}`,
        }).then(res => {
            this.cxpfshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgpfid}`,
        }).then(res => {
            this.xgpfshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.fzpfid}`,
        }).then(res => {
            this.fzpfshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scpfid}`,
        }).then(res => {
            this.scpfshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckzdsid}`,
        }).then(res => {
            this.ckzdsshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzzdsid}`,
        }).then(res => {
            this.xzzdsshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.plbjcsid}`,
        }).then(res => {
            this.plbjcsshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjcsid}`,
        }).then(res => {
            this.bjcsshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })









    }
}
</script>
<style lang="scss" scoped>
.colordiv {
    background-color: rgba(217, 219, 222, 0.5) !important;

}

.formula1 {
    margin-top: 90px;
    height: calc(100% - 120px);
    padding: 20px;
    background: rgba(238, 238, 238);

    .btn {
        height: 40px;
        font-weight: 600;
        font-size: 16px;
        padding: 0 10px;
        margin: 0 10px;
        min-width: 100px;
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

    .check-btn {
        color: rgb(252, 174, 56)
    }

    .copy-btn {
        color: rgb(110, 202, 60)
    }

    .del-btn {
        background: #AAAAAA;
        color: #fff
    }

    .btn1 {
        border: 2px solid rgb(110, 202, 60);
        color: rgb(110, 202, 60);
    }

    .btn2 {
        width: 100px;
        border: 2px solid rgb(252, 174, 56);
        color: rgb(252, 174, 56);
    }

    .btn3 {
        color: #fff;
        background-color: rgb(56, 109, 240);
        float: right;
        // vertical-align: middle;
        margin: 10px 10px;
    }

    .btn4 {
        color: #386DF0;
        border: 2px solid #386DF0;
        // background-color: #386DF0;
    }

    .upload-demo {
        display: inline-block;
    }

}

.formula {
    // margin-top: 100px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: space-between;
    background-color: #fff;

    .flex-item {
        width: calc(40% - 10px);
        height: 100%;

        .title {
            color: rgb(56, 109, 240);
            font-size: 20px;
            font-weight: 600;
            border-left: 3px solid rgb(56, 109, 240);
            padding-left: 5px;
            margin: 10px 0 20px;
        }

        .content {
            box-sizing: border-box;
            border: 2px solid rgba(204, 204, 204, 0.5);
            height: calc(100% - 60px);
            padding: 10px;
            // background-color: #fff;
        }

        .content-header {
            height: 60px;
            overflow: hidden;
            background-color: rgb(221, 221, 221);
            // display: flex;
            // align-items: center;
            width: 100%;
            line-height: 60px;
            // padding: 0 10px;
        }

        .header-input {
            width: 200px;
            float: right;
        }

        .content-content {
            height: calc(100% - 70px);
            background-color: #fff;
            margin-top: 10px;
            border: 1px solid rgba(204, 204, 204, 0.5);
            overflow: auto;
        }

        .table-action {
            text-align: center
        }

    }

    .flex-item1 {
        width: 26%;

    }

    .flex-item2 {
        width: calc(34% - 10px);

    }

    .table-img {

        height: 16px;
        cursor: pointer;

    }




}

.add-formula {
    display: flex;
    justify-content: space-between;

    .add-item {
        width: 48%;

        .item-input {
            width: calc(100% - 70px)
        }

        .item-title {
            width: 70px;
            display: inline-block;
        }

    }

}

.material-look,
.look-book {
    height: 600px
}
</style>