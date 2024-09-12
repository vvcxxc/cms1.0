<!-- 物料管理 -->
<template>
    <div class="material-management">
        <div ref="contentHeader" class="header">
            <div class="header-item">
                <el-input class="header-input" v-model="keyWord" placeholder="请输入关键字"></el-input>
            </div>
            <div class="header-item">
                <span>创建时间</span>
                <my-picker :startTime="beginTime" :endTime="endTime" @getTime="getTime"></my-picker>
            </div>
            <div class="header-item">
                <el-button class="btn search-btn" @click="searchBtn">查询</el-button>
            </div>
            <div class="header-right">
                <el-button class="btn add-btn" @click="addMaterial">+新建物料</el-button>
                <el-upload ref="materialUpload0" class="upload-demo" action :show-file-list="false"
                    :on-change="handleChangeBOM" accept=".xls, .xlsx"   :auto-upload="false"
                    :disabled="!canUpload0">
                    <el-button class="btn btn3" @click="handleUploadSheet0">BOM表导入</el-button>
                </el-upload>
                <el-upload ref="materialUpload" class="upload-demo" action :show-file-list="false"
                    :on-change="handleChange" accept=".xls, .xlsx"   :auto-upload="false"
                    :disabled="!canUpload">
                    <el-button class="btn btn2" @click="handleUploadSheet">导入</el-button>
                </el-upload>
                <el-button class="btn btn3" @click="exportMaterialInfo">导出</el-button>
                <!-- <el-button class="btn update-btn">修改</el-button> -->
                <el-button class="btn del-btn" @click="delBtn">删除</el-button>
            </div>
        </div>
        <div class="lower-content">
            <div class="left-content">

                <div v-for="item in MetralTypeList" @click="changeLeft(item)"
                    :class="item.ID == Metral ? 'left-item select' : 'left-item'">{{ item.Name }}</div>
            </div>

            <div class="table-content">
                <div class="centent" :style="{ height: tableHeight }">
                    <my-table :isSelection="true" :columnList="columnList" :tableDataList="tableDataList"
                        @selectionChange="selectionChange">
                        <template #ID="{ scope }">
                            <div>
                                {{
                                        scope.$index +
                                        1 +
                                        pageData.PageSize * (pageData.PageIndex - 1)
                                }}
                            </div>
                        </template>
                        <template #action="{ scope }">
                            <div style="text-align: center">
                                <el-button class="table-btn look-btn" @click="editor(scope.row)">
                                    <img class="table-img" :src="bianjiImg" />
                                </el-button>
                            </div>
                        </template>
                    </my-table>
                </div>
                <div class="footer">
                    <my-page :pageData="pageData" @changePage="changePage"></my-page>
                </div>
            </div>

        </div>
        <my-dialog :visible="openDialog" :width="dialogData.width" :title="dialogData.title" @close="openDialog = false"
            @ok="dialogOk">
            <div class="add-material">
                <div class="add-item">
                    <div class="item-title">物料名称</div>
                    <el-input class="item-input" placeholder="请输入物料名称" v-model="materialInfo.Name"></el-input>
                </div>
                <div class="add-item">
                    <div class="item-title">物料编号</div>
                    <el-input class="item-input" placeholder="请输入物料编号" v-model="materialInfo.No"></el-input>
                </div>

            </div>
        </my-dialog>
    </div>
</template>
<script>
import MyTable from '@/newComponents/Table.vue';
import MyPage from '@/newComponents/Page.vue';
import MyPicker from '@/newComponents/DatePicker.vue';
import bianjiImg from '@/assets/images/icon_pensoil.png';
import MyDialog from '@/newComponents/Dialog.vue';
export default {
    components: {
        MyTable,
        MyPicker,
        MyPage,
        MyDialog
    },
    data() {
        return {
            bianjiImg: bianjiImg,
            columnList: [],
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50
            },
            tableHeight: `calc(100% - 130px)`,
            openDialog: false,
            dialogData: {
                width: '450px',
                title: ''
            },
            searchData: {
                keyWord: '',
                beginTime: '',
                endTime: ''
            },
            beginTime: '',
            endTime: '',
            tableDataList: [],
            keyWord: '',
            MetralTypeList: [],
            Metral: '',
            materialInfo: {
                No: '',
                Name: '',
                Metral: ''
            },
            selectionList: [],
            userAccount: '',
            materialPopShow: false,
            selectlistRow: [],
            rowNum: 0,//计数器


            jurisdiction: [],
            buttonarr: [],
            wlcxid: '',
            wldcid: '',
            wlscid: '',
            wlxgid: '',
            wlxjid: '',
            wldrid: '',
            wllxid: '',
            bomdrid: '',

            wlcxshow: true,
            wldcshow: true,
            wlscshow: true,
            wlxgshow: true,
            wlxjshow: true,
            wldrshow: true,
            wllxshow: true,
            bomdrshow: true,
            canUpload0: true,
            canUpload: true,
        };
    },
    watch: {
        Metral(i) {
            if (i) {
                this.getMaterialInfoList();
            }
        }
    },
    methods: {
        changeLeft(i) {
            this.Metral = i.ID;
        },
        handleUploadSheet0() {
            if (!this.bomdrshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                this.canUpload0 = false;
            } else {
                this.canUpload0 = true;
            }
        },
        handleUploadSheet() {
            if (!this.wldrshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                this.canUpload = false;
            } else {
                this.canUpload = true;
            }
        },
        //BOM导入按钮
        handleChangeBOM(file) {
            console.log('handleChangeBOM')
            let name = this.MetralTypeList.find(_ => _.ID == this.Metral).Name;
            let filename = file.name.split('.')[0];
            console.log(filename, name)
            if (filename != name) {
                this.confirm_Pop2(this, `请导入${name}`);
                return;
            }
            let formData = new FormData();
            formData.append('', file.raw);
            this.$axios({
                method: 'POST',
                url: `/api/MaterialInfo/BOMImportMaterial?userAccount=${this.userAccount}&materialID=${this.Metral}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => {
                    const data = res.data;
                    this.$refs.materialUpload0.clearFiles();

                    if (data.code == 0) {
                        this.confirm_Pop2(this, data.data);
                        this.getMaterialInfoList();
                    } else {
                        this.confirm_Pop2(this, data.msg);
                    }
                })
                .catch(err => {
                    this.$refs.materialUpload0.clearFiles();
                });
        },
        //导入按钮
        handleChange(file) {
            // console.log(file)
            let formData = new FormData();
            formData.append('', file.raw);
            this.$axios({
                method: 'POST',
                url: `/api/MaterialInfo/ImportMaterialInfoAsync?userAccount=${this.userAccount}&materialTypeName=${file.name.split('.')[0]}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => {
                    const data = res.data;
                    this.$refs.materialUpload.clearFiles();

                    if (data.code == 0) {
                        this.confirm_Pop2(this, data.data);
                        this.getMaterialInfoList();
                    } else {
                        this.confirm_Pop2(this, data.msg);
                    }
                })
                .catch(err => {
                    this.$refs.materialUpload.clearFiles();
                });
        },
        //删除按钮
        delBtn() {
            if (!this.wlscshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                return;
            }
            if (this.selectionList.length <= 0) {
                this.confirm_Pop2(this, '请选择要删除的数据');
                return;
            }
            this.confirm_Pop(this, '是否删除选择数据?', () => {
                let data = [];
                this.selectionList.forEach(item => {
                    data.push(item.ID);
                });
                this.deleteMaterialInfo(data).then(res => {
                    this.getMaterialInfoList();
                });
            });
        },
        //删除物料
        deleteMaterialInfo(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/MaterialInfo/DeleteMaterialInfo`,
                    data: data
                })
                    .then(res => {
                        const data = res.data;
                        if (data.code == 0) {
                            resolve(data.data);
                        } else {
                            reject(data.msg);
                        }
                        // console.log(data)
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        //多选选择
        selectionChange(selection) {
            this.selectionList = selection;
        },
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex;
            this.getMaterialInfoList();
        },
        //按钮查询
        searchBtn() {
            if (!this.wlcxshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                return;
            }
            this.searchData = {
                keyWord: this.keyWord,
                beginTime: this.beginTime,
                endTime: this.endTime
            };
            this.pageData.PageIndex = 1;
            this.getMaterialInfoList();
        },
        //修改时间
        getTime(val, type) {
            if (type == 'start') {
                this.beginTime = val;
            } else {
                this.endTime = val;
            }
        },
        //  //监听窗口变化
        watchResize() {
            let _this = this;
            window.onresize = () => {
                return (() => {
                    _this.$nextTick(() => {
                        _this.tableHeight = `calc(100% - ${_this.$refs
                            .contentHeader.clientHeight + 50}px)`;
                    });
                })();
            };
        },
        //弹窗确定
        dialogOk() {
            if (!this.materialInfo.Name.trim()) {
                this.confirm_Pop2(this, '物料名称不能为空');
                return;
            }
            if (!this.materialInfo.No.trim()) {
                this.confirm_Pop2(this, '物料编号不能为空');
                return;
            }
            let data = {
                UserAccount: this.userAccount
            };
            if (this.dialogData.type == 'add') {
                data.MaterialInfoItem = {
                    No: this.materialInfo.No,
                    Name: this.materialInfo.Name,
                    MaterialTypeID: this.Metral
                };
                this.addMaterialInfo(data).then(res => {
                    this.getMaterialInfoList();
                    this.openDialog = false;
                });
            } else if (this.dialogData.type == 'editor') {
                data.MaterialInfoItem = this.materialInfo;
                this.updateMaterialInfo(data).then(res => {
                    this.getMaterialInfoList();
                    this.openDialog = false;
                });
            }
        },

        //添加物料
        addMaterial() {
            if (!this.wlxjshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                return;
            }
            this.dialogData = {
                width: '500px',
                title: '新建物料',
                type: 'add'
            };
            (this.materialInfo = {
                No: '',
                Name: '',
                Metral: this.MetralTypeList.filter(_ => _.ID).length
                    ? this.MetralTypeList.filter(_ => _.ID)[0].ID
                    : ''
            }),
                (this.openDialog = true);
        },
        //修改物料
        editor(row) {
            if (!this.wlxgshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                return;
            }
            this.dialogData = {
                width: '500px',
                title: '修改物料',
                type: 'editor'
            };
            this.materialInfo = {
                ID: row.ID,
                No: row.No,
                Name: row.Name,
                Metral: row.MaterialTypeID
            };
            this.openDialog = true;
        },
        //获取物料列表
        getMaterialInfoList() {
            let data = {
                KeyWord: this.searchData.keyWord, //null即忽略
                BeginTime: this.searchData.beginTime, //null即忽略
                EndTime: this.searchData.endTime, //null即忽略
                PageIndex: this.pageData.PageIndex,
                PageSize: this.pageData.PageSize,
                MaterialTypeID: this.Metral
            };
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/MaterialInfo/GetMaterialInfoListPage`,
                    data: data
                })
                    .then(res => {
                        const data = res.data;
                        if (data.code == 0) {
                            // console.log(data)
                            this.tableDataList = data.data.Data.map(
                                (_, idx) => ({ ..._, order: Number(idx) + 1 })
                            );
                            this.pageData.TotalCount = data.data.TotalCount;
                            resolve(data.data);
                        } else {
                            // this.confirm_Pop2(this, data.msg)
                            reject(data.msg);
                        }
                        // console.log(data)
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        //新增物料
        addMaterialInfo(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/MaterialInfo/AddMaterialInfo`,
                    data: data
                })
                    .then(res => {
                        const data = res.data;
                        if (data.code == 0) {
                            // console.log(data)
                            this.confirm_Pop2(this, '新增成功');
                            resolve(data.data);
                        } else {
                            this.confirm_Pop2(this, data.msg);
                            reject(data.msg);
                        }
                        // console.log(data)
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        //更新物料
        updateMaterialInfo(data) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/MaterialInfo/UpdateMaterialInfo`,
                    data: {
                        ...data,
                        MaterialInfoItem: {
                            ...data.MaterialInfoItem,
                            MaterialTypeID: data.MaterialInfoItem.Metral
                        }
                    }
                })
                    .then(res => {
                        const data = res.data;
                        if (data.code == 0) {
                            // console.log(data)
                            resolve(data.data);
                        } else {
                            this.confirm_Pop2(this, data.msg);
                            reject(data.msg);
                        }
                        // console.log(data)
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        //导出物料列表
        exportMaterialInfo() {
            if (!this.wldcshow) {
                this.confirm_Pop2(this, '该账户无操作权限！');
                return;
            }
            let data = {
                PageIndex: 1,
                PageSize: 65535,
                MaterialTypeID: this.Metral
            };
            this.$axios({
                method: 'POST',
                url: `/api/MaterialInfo/ExportMaterialInfo`,
                data: data,
                responseType: 'arraybuffer'
            })
                .then(res => {
                    this.downloadFile(res.data, `物料管理列表.xlsx`);
                })
                .catch(err => { });
        },
        getMaterialInit() {
            this.$axios({
                method: 'GET',
                url: `/api/LocationSetting/GetMaterialType?keyword=`
            }).then(res => {
                const data = res.data;
                if (data.code == 0) {
                    // data.data.unshift({ ID: '', Name: '不限' });
                    this.MetralTypeList = data.data;
                    if (data.data.length) {
                        this.Metral = data.data[0].ID;
                    }
                    this.getMaterialInfoList();
                } else {
                    this.confirm_Pop2(this, data.msg);
                }
            });
        },


        closeMaterialPop() {
            this.materialPopShow = false;
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

        //请求左侧列表
        this.getMaterialInit();

        setTimeout(() => {
            this.watchResize();
        });

        this.columnList = [
            {
                label: '序号',
                width: '80px',
                prop: 'order'
            },
            {
                label: '物料编号',
                prop: 'No'
            },
            {
                label: '物料名称',
                prop: 'Name'
            },
            {
                label: '创建时间',
                prop: 'CreateTime'
            },
            {
                label: '操作人',
                prop: 'CreateUser'
            },
            {
                label: '操作',
                prop: 'action',
                width: '100px'
            }
        ];

        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        console.log("buttom1", this.buttonarr)
        this.buttonarr.forEach((item) => {
            if (item.RightDesc == "物料管理-查询物料") {
                this.wlcxid = item.RightID
            } else if (item.RightDesc == "物料管理-导出物料") {
                this.wldcid = item.RightID
            } else if (item.RightDesc == "物料管理-删除物料") {
                this.wlscid = item.RightID
            } else if (item.RightDesc == "物料管理-修改物料") {
                this.wlxgid = item.RightID
            } else if (item.RightDesc == "物料管理-新建物料") {
                this.wlxjid = item.RightID
            } else if (item.RightDesc == "物料管理-导入物料") {
                this.wldrid = item.RightID
            } else if (item.RightDesc == "物料管理-BOM表导入") {
                this.bomdrid = item.RightID
            } else if (item.RightDesc == "物料管理-物料类型管理") {
                this.wllxid = item.RightID
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.wlcxid}`,
        }).then(res => {
            this.wlcxshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.wldcid}`,
        }).then(res => {
            this.wldcshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.wlscid}`,
        }).then(res => {
            this.wlscshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.wlxgid}`,
        }).then(res => {
            this.wlxgshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.wlxjid}`,
        }).then(res => {
            this.wlxjshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.wldrid}`,
        }).then(res => {
            this.wldrshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bomdrid}`,
        }).then(res => {
            this.bomdrshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.wllxid}`,
        }).then(res => {
            this.wllxshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })

    }
};
</script>
<style lang="scss" scoped>
.material-management {
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
                margin-right: 10px;
            }
        }

        &-input {
            width: 160px;
        }
    }

    .lower-content {
        height: 100%;
        width: 100%;
        display: flex;

        .left-content {
            height: 100%;
            width: 200px;
            border-right: #e4e4e4 1px solid;
            box-sizing: border-box;

            .left-item {
                height: 50px;
                background-color: #e4e4e4;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                cursor: pointer;
            }

            .select {
                background-color: #fff;

            }

            .select::after {
                content: '';
                position: absolute;
                width: 5px;
                height: 100%;
                right: 0;
                top: 0;
                background-color: #4270e4;
            }
        }

        .table-content {
            height: 100%;
            width: calc(100% - 200px);
        }
    }

    .centent {
        padding: 20px 20px 0;
        height: calc(100% - 130px);
        background: #fff;
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
        min-width: 100px;
    }

    .search-btn {
        color: #fff;
        background: #4270e4;
    }

    .add-btn {
        border: 2px solid rgb(110, 202, 60);
        color: rgb(110, 202, 60);
    }

    .btn2 {
        border: 2px solid rgb(252, 174, 56);
        color: rgb(252, 174, 56);
    }

    .btn3 {
        border: 2px solid #4270e4;
        color: #4270e4;
    }

    .del-btn {
        background: #aaaaaa;
        color: #fff;
    }

    .header-right {
        float: right;
    }

    .table-btn {
        border: 1px solid #e4e4e4;
        height: 30px;
        width: 60px;
        font-size: 14px;
        padding: 0;
    }

    .table-img {
        height: 16px;
        cursor: pointer;
    }

    .upload-demo {
        display: inline-block;
        margin: 0 10px;
    }
}

.materialType-manage {
    .btn-list {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-bottom: 16px;
    }

    .table-list {
        width: 100%;
        height: 500px;

        input {
            border: 1px solid #ededed;
            width: 100%;
            padding: 5px 5px;
        }
    }
}
</style>
<style >
.materialType-dialog0 .dialog-class .el-dialog__header {
    line-height: 55px;
}
</style>