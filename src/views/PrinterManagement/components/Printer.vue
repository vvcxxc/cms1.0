<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div class="tapwater">
        <div class="linebox" id="linebox">
            <div class="query-table clearfix">
                <div class="fl">

                </div>
                <div class="fr">
                    <div class="setting" @click="openSetting">设置</div>
                    <div class="add" @click="openEditPrinter('新增')">添加</div>
                </div>
            </div>
            <div class="conter">
                <div class="conter-table">
                    <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="PrinterPosition" label="打印机位置" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.PrinterPosition }}</template>
                        </el-table-column>
                        <el-table-column prop="AssociatedPrinter" label="关联打印机" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.AssociatedPrinter }}</template>
                        </el-table-column>
                        <el-table-column prop="PrintRuleName" label="打印规则" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="PrintSignal" label="打印信号" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.PrintSignal }}</template>
                        </el-table-column>
                        <el-table-column prop="PrintResultSignal" label="打印结果信号" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.PrintResultSignal }}</template>
                        </el-table-column>
                        <el-table-column prop="PrintTemplatePath" label="打印模板路径" :show-overflow-tooltip="true">
                            <template slot-scope="scope">{{ scope.row.Data.PrintTemplatePath }}</template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <div class="table-action" @click="openEditPrinter('编辑', scope.row)">
                                    编辑
                                </div>
                                <div class="table-action" @click="delFn(scope.row)">
                                    删除
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="conter-page">
                    <my-page :pageData="pageData" @req="req"></my-page>
                </div>
            </div>
        </div>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></TipsPop>
        <EditPrinter v-if="EditPrinterShow" :title="EditPrinterTitle" :selectItem="EditPrinterSelectItem"
            @callback="EditPrinterCallBack" />
        <EditSetting v-if="EditSettingShow" @callback="EditSettingCallBack" />
    </div>
</template>

<script>
// vue文件中引入echarts工具
import TipsPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/page.vue';
import EditPrinter from './EditPrinter.vue';
import EditSetting from './EditSetting.vue';

export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
        EditPrinter,
        EditSetting
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,
            starttime: new Date(new Date().toLocaleDateString()),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 - 1
            ),
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            EditPrinterShow: false,
            EditPrinterTitle: '',
            EditPrinterSelectItem: null,
            EditSettingShow: false,
            delItem: null,
            jurisdiction: [],
            buttonarr: [],
            xfid: '',
            jsid: '',
            scmsid: '',
            dcid: '',
            xfshow: true,
            jsshow: true,
            scmsshow: true,
            dcshow: true,

        };
    },
    created() {

    },
    watch: {
        '$store.state.btnPowerData': {
            //脚本事件
            deep: true,
            handler: function (n, o) {
                this.getPower()
            }
        },
    },
    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log(this.buttonarr)
            this.buttonarr.forEach(item => {
                if (item.RightName == '打印管理-打印设置') {
                    this.xfid = item.RightID;
                } else if (item.RightName == '打印管理-新建打印机') {
                    this.jsid = item.RightID;
                } else if (item.RightName == '打印管理-编辑打印机') {
                    this.scmsid = item.RightID;
                } else if (item.RightName == '打印管理-删除打印机') {
                    this.dcid = item.RightID;
                }
            });
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xfid}`
            })
                .then(res => {
                    this.xfshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.jsid}`
            })
                .then(res => {
                    this.jsshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scmsid}`
            })
                .then(res => {
                    this.scmsshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`
            })
                .then(res => {
                    this.dcshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });

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
        tipCallBack(str) {
            if (str == 'yes') {

                this.$axios({
                    method: 'post',
                    url: `/api/PrinterRecords/DelPrintManagement/${this.delItem.Id}`,
                }).then(res => {
                    if (res.data.code === 0) {
                        this.req(1);
                        this.tipText = '删除成功！';
                        this.isPopShow = true;
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;
                    }
                })
            }
            this.noCancel = true;
            this.isPopShow = false;
            this.delItem = null;
        },
        delFn(row) {
            if (!this.dcshow) {
                this.isPopShow = true
                this.tipText = '该用户没有权限!';
                return
            }
            this.tipText = '是否删除选中打印机？';
            this.isPopShow = true;
            this.noCancel = false;
            this.delItem = row
        },
        openSetting() {
            if (!this.xfshow) {
                this.isPopShow = true
                this.tipText = '该用户没有权限!';
                return
            }
            this.EditSettingShow = true
        },
        EditSettingCallBack(str) {
            if (str) {
                this.tipText = str;
                this.isPopShow = true;
            }
            this.EditSettingShow = false
            this.req(1)
        },
        openEditPrinter(type, item) {
            if (type == '新增' && !this.jsshow) {
                this.isPopShow = true
                this.tipText = '该用户没有权限!';
                return
            }
            if (type == '编辑' && !this.scmsshow) {
                this.isPopShow = true
                this.tipText = '该用户没有权限!';
                return
            }
            this.EditPrinterShow = true
            this.EditPrinterTitle = type
            this.EditPrinterSelectItem = item
        },
        EditPrinterCallBack(str) {
            if (str) {
                this.tipText = str;
                this.isPopShow = true;
            }
            this.EditPrinterShow = false
            this.req(1)
        },
        req(_index) {
            this.$axios({
                url: `/api/PrinterRecords/QueryPrintManagement?PageSize=${this.pageData.PageSize}&PageIndex=${_index}`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.DataList;
                    this.pageData = res.data.data.ParameterList;

                } else {
                    this.tipText = res.data.msg;
                    this.isPopShow = true;
                }
            });
        },


    },
    //渲染后计算宽度
    mounted() {
        this.getPower()
        this.req(1)
    },
};
</script>

<style lang="scss">
.tapwater {
    .fl .el-input--prefix .el-input__inner {
        padding-left: 25px !important;
    }

    .table input {
        text-indent: 4px;
    }
}
</style>

<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.conter {
    width: 100%;
    height: calc(100% - 60px);


    .conter-table {
        width: 100%;
        height: calc(100% - 50px);

        .table-action {
            float: left;
            margin-left: 15px;
            color: #4270e4;
            cursor: pointer;
        }
    }

    .conter-page {
        width: 100%;
        height: 50%;

    }

}

.fl {
    float: left;
}

.fr {
    float: right;
}

.clearfix::after {
    content: '';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    zoom: 1;
}

.tapwater {
    box-sizing: border-box;
    width: 100%;
    height: 100%;


    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
    }

    .query-table {
        height: 60px;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;

        span {
            margin-left: 18px;
        }

        .tablename {
            height: 40px;
            width: 250px;
        }

        .tabledatetime {
            height: 40px;
            width: 178px;
        }

        .starttime {
            height: 40px;
            width: 210px;
            display: inline-block;
            margin-left: 18px;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }

        .endtime {
            height: 40px;
            width: 210px;
            display: inline-block;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }
    }

    .query,
    .setting,
    .add,
    .getOrder {
        display: inline-block;
        height: 40px;
        width: 118px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }

    .query {
        background-color: #4270e4;
        margin-left: 10px;
    }

    .getOrder {
        background-color: #ffffff;
        color: #4270e4;
        border: 2px solid #4270e4;
        margin-right: 20px;
    }

    .setting {
        background-color: #eeb764;
        color: #fff;
        margin-right: 20px;
    }

    .add {
        background-color: #23d052;
        color: #fff;
        margin-right: 20px;
    }

    .container {
        display: inline-block;
        height: 40px;

        .block {
            display: inline-block;
        }
    }

    .separate {
        position: relative;
        left: 7px;
    }
}
</style>
 