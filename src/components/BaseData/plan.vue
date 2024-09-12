<template>
    <div class="tunnelPage">
        <!-- <div class="contents" style="margin-right: 10px">
            <CurrentTitle title="库区管理" />
            <div class="selects">
                <el-button class="btn" @click="kqAddProduct">
                    新建库区
                </el-button>
                <el-button class="btn btn2" @click="kqEditProduct">
                    修改
                </el-button>
                <el-button class="btn btn3" @click="kqDelProduct">
                    删除
                </el-button>
            </div>
            <div class="tables">
                <el-table :data="kqTableData" height="100%" ref="singleTable" border highlight-current-row
                    header-row-class-name="light-blue" stripe tooltip-effect="dark" style="width: 100%"
                    :header-cell-style="{
                        background: '#5a6c98',
                        color: '#ffffff',
                        'border-left': '1px solid #cccccc',
                        height: '50px',
                        padding: '0',
                    }" @current-change="handlekqCurrentChange">
                    <el-table-column type="index" width="60" label="序号"></el-table-column>
                    <el-table-column prop="Code" label="库区编码" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="Name" label="库区名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="Remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
            </div><my-page :pageData="pageData1" @req="req1"></my-page>
        </div> -->
        <div class="kq-content">
            <div class="kq-left">
                <div class="kq-label">库区名称:{{ kqTableData.length ? kqTableData[0].Name : '' }}</div>
                <div class="kq-label">库区编码:{{ kqTableData.length ? kqTableData[0].Code : '' }}</div>
            </div>
            <div class="kq-right">
                <el-button class="btn btn2" @click="editKq">
                    库区配置
                </el-button>
            </div>
        </div>
        <div class="contents">
            <div class="title-box">
                <CurrentTitle title="巷道管理" />
                <div class="selects">
                    <el-button class="btn btn4" @click="openZdPop">
                        类型配置
                    </el-button>
                    <el-button class="btn" @click="xdAddProduct">
                        新建
                    </el-button>
                    <el-button class="btn btn2" @click="xdEditProduct">
                        修改
                    </el-button>
                    <el-button class="btn btn3" @click="xdDelProduct">
                        删除
                    </el-button>

                </div>
            </div>
            <div class="tables">
                <el-table :data="xdTableData" height="100%" border highlight-current-row
                    header-row-class-name="light-blue" stripe tooltip-effect="dark" style="width: 100%"
                    :header-cell-style="{
                        background: '#5a6c98',
                        color: '#ffffff',
                        'border-left': '1px solid #cccccc',
                        height: '50px',
                        padding: '0',
                    }" @current-change="handlexdCurrentChange">
                    <el-table-column type="index" width="60" label="序号"></el-table-column>
                    <el-table-column prop="Code" label="巷道编码" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="Name" label="巷道名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="RoadwayTypeDisplayName" label="巷道类型"
                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="PropertyDisplayName" label="属性"
                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="Count" label="库位数量" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="ProductType" label="产品类型" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="Remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                </el-table>

            </div><my-page :pageData="pageData2" @req="req2"></my-page>
        </div>

        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
        <KqEdit v-if="iskqEditShow" :title="kqTitle" :data="kqSelectRow" @kqEditPopCallBack="kqEditPopCallBack" />
        <xdEdit v-if="isxdEditShow" :title="xdTitle" :data="xdSelectRow" @xdEditPopCallBack="xdEditPopCallBack" />

        <TypeConfigure v-if="TypeConfigureShow" @zdPopCallBack="zdPopCallBack" />

    </div>
</template>

<script>
import CurrentTitle from '../public/currentTitle.vue';
import TipPop from '../public/tipPop.vue';
import KqEdit from './kqEdit.vue';
import xdEdit from './xdEdit.vue';
import TypeConfigure from './TypeConfigure.vue';
import MyPage from '../public/Pages.vue';
export default {
    components: {

        CurrentTitle,
        TipPop,
        KqEdit,
        xdEdit,
        MyPage,
        TypeConfigure,
        TipPop,
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            kqTableData: [], // 库区table数据
            xdTableData: [], // 巷道table数据
            iskqEditShow: false, // 库区新建、编辑弹窗
            isxdEditShow: false, // 巷道新建、编辑弹窗
            kqSelectRow: null, // 库区table选中项
            xdSelectRow: null, // 巷道table选中项
            kqTitle: '新建', // 库区弹窗类型
            xdTitle: '新建', // 巷道弹窗类型
            type: '',
            pageData1: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            pageData2: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            TypeConfigureShow: false,
            kqid: '',
            lxid: '',
            scid: '',
            xjid: '',
            xgid: '',
            kqshow: true,
            lxshow: true,
            scshow: true,
            xjshow: true,
            xgshow: true,
            buttonarr: [],
            jurisdiction: [],
        };
    },
    created() {
        this.req1(1);
    },
    mounted() {
        this.btnPowerData();
    },
    watch: {
        VpowerData(val) {
            this.btnPowerData();
        }
    },
    methods: {
        btnPowerData() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log(' this.buttonarr', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == "库区配置") {
                    this.kqid = item.RightID;
                } else if (item.RightName == "类型配置") {
                    this.lxid = item.RightID;
                } else if (item.RightName == "新建巷道") {
                    this.xjid = item.RightID;
                } else if (item.RightName == "修改巷道") {
                    this.xgid = item.RightID;
                } else if (item.RightName == "删除巷道") {
                    this.scid = item.RightID;
                }
            });
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.kqid}`
            })
                .then(res => {
                    this.kqshow = res.data.data;
                })
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.lxid}`
            })
                .then(res => {
                    this.lxshow = res.data.data;
                })
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xjid}`
            })
                .then(res => {
                    this.xjshow = res.data.data;
                })
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`
            })
                .then(res => {
                    this.xgshow = res.data.data;
                })
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`
            })
                .then(res => {
                    this.scshow = res.data.data;
                })
        },
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = [];
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i]);
                    return temPath;
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(
                        id,
                        node[i].Children,
                        temPath
                    );
                    if (findResult) {
                        return findResult;
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split('?');
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split('&');
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split('=');
                    if (arr && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return '';
            } else {
                return '';
            }
        },
        req1(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    this.tipText = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    this.isPopShow = true;
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.pageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.pageData.TotalPage
                        ) {
                            this.tipText = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            this.isPopShow = true;
                            return;
                        }
                    }
                }
            }
            //查询
            this.$axios({
                method: 'get',
                url: `/api/WarehouseArea/GetPagedList?pageIndex=${pageIndex}&pageSize=${this.pageData1.PageSize}`,
            }).then((res) => {
                this.kqTableData = res.data.data.DataList;
                this.pageData1 = res.data.data.ParameterList
                if (this.kqTableData.length) {
                    if (!this.kqSelectRow) {
                        this.kqSelectRow = this.kqTableData[0];
                    }
                    // 巷道table数据
                    this.req2(1)

                } else {
                    this.xdTableData = [];
                }
            });
        },
        req2(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    this.tipText = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    this.isPopShow = true;
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.pageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.pageData.TotalPage
                        ) {

                            this.tipText = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            this.isPopShow = true;
                            return;
                        }
                    }
                }
            }
            //查询
            this.$axios({
                method: 'get',
                url: `/api/Roadway/GetPagedList?warehouseAreaId=${this.kqSelectRow.Id}&pageIndex=${pageIndex}&pageSize=${this.pageData1.PageSize}`,
            }).then((res) => {
                this.xdTableData = res.data.data.DataList;
                this.pageData2 = res.data.data.ParameterList
                console.log(" this.xdTableData ", this.xdTableData);
            });
        },

        // 新建类型
        kqAddProduct() {
            this.kqTitle = '新建';
            this.iskqEditShow = true;
        },
        xdAddProduct() {
            if (!this.xjshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            if (!this.kqSelectRow) {
                this.isPopShow = true;
                this.noCancel = true;
                this.tipText = '请选择库区';
                return;
            }
            this.xdTitle = '新建';
            this.isxdEditShow = true;
        },
        editKq() {
            if (!this.kqshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            if (this.kqTableData.length) {
                this.kqSelectRow = this.kqTableData[0];
                this.kqEditProduct()
            } else {
                this.kqAddProduct()
            }
        },
        // 修改
        kqEditProduct() {
            if (!this.kqSelectRow) {
                this.isPopShow = true;
                this.noCancel = true;
                this.tipText = '请选择修改项';
                return;
            }
            this.kqTitle = '修改';
            this.iskqEditShow = true;
        },
        xdEditProduct() {
            if (!this.xgshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            if (!this.xdSelectRow) {
                this.isPopShow = true;
                this.noCancel = true;
                this.tipText = '请选择修改项';
                return;
            }
            this.xdTitle = '修改';
            this.isxdEditShow = true;
        },

        // 删除
        kqDelProduct() {
            this.type = 'kq';
            this.isPopShow = true;
            this.tipText = '是否确认删除该库区？';
            this.noCancel = false;
            if (!this.kqSelectRow) {
                this.noCancel = true;
                this.tipText = '请选择删除项';
            }
        },
        xdDelProduct() {
            if (!this.scshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.type = 'xd';
            this.isPopShow = true;
            this.tipText = '是否确认删除该巷道？';
            this.noCancel = false;
            if (!this.xdSelectRow) {
                this.noCancel = true;
                this.tipText = '请选择删除项';
            }
        },
        openZdPop() {
            if (!this.lxshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.TypeConfigureShow = true;

        },
        zdPopCallBack(str, data) {
            console.log('str', str);
            if (str === 'yes') {
                // this.$axios({
                //     url: `/api/RoadwayType/Save`,
                //     method: 'post',
                //     data,
                // }).then((res) => {
                //     this.isPopShow = true;
                //     this.tipText = res.data.msg;
                //     this.noCancel = true;
                //     if (res.data.code == 0) {
                //         this.tipText = `类型配置成功`;
                //         this.TypeConfigureShow = false;
                //         this.req1(1);
                //     }
                // });
                this.isPopShow = true;
                this.noCancel = true;
                this.tipText = `类型配置成功`;
                this.TypeConfigureShow = false;
            } else {
                this.TypeConfigureShow = false;
            }
        },

        // 修改弹窗回调
        kqEditPopCallBack(str, data) {
            if (str === 'yes') {
                if (!data.Code) {
                    this.isPopShow = true;
                    this.tipText = '库区编码为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.Name) {
                    this.isPopShow = true;
                    this.tipText = '库区名称为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.IOVariableKey1) {
                    this.isPopShow = true;
                    this.tipText = '车号为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.IOVariableKey2) {
                    this.isPopShow = true;
                    this.tipText = '入库巷道为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.IOVariableKey3) {
                    this.isPopShow = true;
                    this.tipText = '出库巷道为必填项!';
                    this.noCancel = true;
                    return;
                }

                let url =
                    this.kqTitle == '新建'
                        ? '/api/WarehouseArea/Create' // 新建
                        : `/api/WarehouseArea/Update/${data.Id}`; // 修改
                let method =
                    this.kqTitle == '新建'
                        ? 'post' // 新建
                        : 'put'; // 修改
                this.$axios({
                    method,
                    url,
                    data,
                }).then((res) => {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                    this.noCancel = true;
                    if (res.data.code == 0) {
                        this.tipText = `${this.kqTitle}库区成功`;
                        this.iskqEditShow = false;
                        this.req1(1);
                    }
                });
            } else {
                this.iskqEditShow = false;
            }
        },
        xdEditPopCallBack(str, data) {
            if (str === 'yes') {
                if (!data.Code) {
                    this.isPopShow = true;
                    this.tipText = '巷道编码为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.Name) {
                    this.isPopShow = true;
                    this.tipText = '巷道名称为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.RoadwayTypeId) {
                    this.isPopShow = true;
                    this.tipText = '巷道类型为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.Count) {
                    this.isPopShow = true;
                    this.tipText = '库位数量为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.IOVariableKey1) {
                    this.isPopShow = true;
                    this.tipText = '开启信号为必填项!';
                    this.noCancel = true;
                    return;
                }
                console.log(data);
                let url =
                    this.xdTitle == '新建'
                        ? '/api/Roadway/Create' // 新建
                        : `/api/Roadway/Update/${data.Id}`; // 修改
                let method =
                    this.xdTitle == '新建'
                        ? 'post' // 新建
                        : 'put'; // 修改
                data = {
                    ...data,
                    WarehouseAreaId: this.kqSelectRow.Id,
                };


                this.$axios({
                    method,
                    url,
                    data,
                }).then((res) => {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                    this.noCancel = true;
                    if (res.data.code == 0) {
                        this.tipText = `${this.xdTitle}巷道成功`;
                        this.isxdEditShow = false;
                        this.req1(1);
                    }
                });
            } else {
                this.isxdEditShow = false;
            }
        },

        // table点击事件
        handlekqCurrentChange(row) {
            this.kqSelectRow = row;
            this.xdSelectRow = null;
            // 巷道table数据
            this.req2(1)
        },
        handlexdCurrentChange(row) {
            this.xdSelectRow = row;
        },

        // 提示弹窗回调
        tipCallBack(str) {
            if (str == 'yes') {
                let url =
                    this.type == 'kq'
                        ? `/api/WarehouseArea/Delete/${this.kqSelectRow.Id}`
                        : `/api/Roadway/Delete/${this.xdSelectRow.Id}`;
                this.$axios({
                    method: 'delete',
                    url,
                }).then((res) => {
                    this.isPopShow = true;
                    this.noCancel = true;
                    if (res.data.code == 0) {
                        this.tipText = '删除成功';
                        if (this.type == 'kq') {
                            this.kqSelectRow = null;
                        } else {
                            this.xdSelectRow = null;
                        }
                        this.req1(1);
                    } else {
                        this.tipText = res.data.msg;
                    }
                });
            } else {
                this.isPopShow = false;
            }
        },

        // 导出
        kqExportTable() {
            require.ensure([], () => {
                const tHeader = ['序号', '库区编码', '库区名称', '描述'];
                const filterVal = [
                    'index',
                    'CacheRegionCode',
                    'CacheRegionName',
                    'Describe',
                ];
                const excelDatas = [
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: this.kqTableData.map((item, index) => ({
                            ...item,
                            index: index + 1,
                        })),
                        sheetName: 'sheet1',
                    },
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: this.kqTableData.map((item, index) => ({
                            ...item,
                            index: index + 1,
                        })),
                        sheetName: 'sheet1',
                    },
                ];
                this.json2excel(excelDatas, '库区管理', true, 'xlsx');
            });
        },
        xdExportTable() {
            require.ensure([], () => {
                const tHeader = [
                    '序号',
                    '巷道编码',
                    '巷道名称',
                    '巷道类型',
                    '缓存数量',
                    '产品类型',
                    '描述',
                ];
                const filterVal = [
                    'index',
                    'TunnelCode',
                    'TunnelName',
                    'TunnelType',
                    'CacheNum',
                    'StorageTypeName',
                    'Describe',
                ];
                const excelDatas = [
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: this.xdTableData.map((item, index) => ({
                            ...item,
                            index: index + 1,
                        })),
                        sheetName: 'sheet1',
                    },
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: this.xdTableData.map((item, index) => ({
                            ...item,
                            index: index + 1,
                        })),
                        sheetName: 'sheet1',
                    },
                ];
                this.json2excel(excelDatas, '巷道管理', true, 'xlsx');
            });
        },

        json2excel(tableJson, filenames, autowidth, bookTypes) {
            var that = this;
            //这个是引用插件
            import('@/vendor/Export2Excel').then((excel) => {
                var tHeader = [];
                var dataArr = [];
                var sheetnames = [];
                for (var i in tableJson) {
                    tHeader.push(tableJson[i].tHeader);
                    dataArr.push(
                        that.formatJson(
                            tableJson[i].filterVal,
                            tableJson[i].tableDatas
                        )
                    );
                    sheetnames.push(tableJson[i].sheetName);
                }
                excel.export_json_to_excel({
                    header: tHeader,
                    data: dataArr,
                    sheetname: sheetnames,
                    filename: filenames,
                    autoWidth: autowidth,
                    bookType: bookTypes,
                });
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v) => filterVal.map((j) => v[j]));
        },
    },
};
</script>

<style lang="scss" scoped>
.tunnelPage {
    padding: 15px;
    height: 100%;

    .kq-content {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .kq-left {
            width: fit-content;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .kq-label {
                margin-right: 15px;
            }
        }

        .kq-right {
            width: fit-content;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }

    .contents {
        width: 100%;
        height: 100%;

        .title-box {
            width: 100%;
            height: 60px;
            margin-top: 10px;
            background: #dddddd;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            box-sizing: border-box;


            .selects {
                width: fit-content;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;


            }
        }

        .tables {
            width: 100%;
            height: calc(100% - 160px);
        }
    }

    .btn {
        width: 120px;
        height: 40px;
        background: #fff;
        border: 1px solid #46be05;
        border-radius: 4px;
        font-size: 16px;
        color: #46be05;
    }

    .btn2 {
        border: 1px solid #fdae22;
        color: #fdae22;
    }

    .btn3 {
        background: #aaaaaa;
        border: 1px solid #aaaaaa;
        color: #fff;
    }

    .btn4 {
        border: 1px solid #386df0;
        color: #386df0;
    }
}
</style>