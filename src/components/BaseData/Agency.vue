<!--
 * @Description: 报警记录报警点管理界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:54:54
 -->
<template>
    <div class="public-table">
        <div class="loadcover" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)"
            v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute; width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container" :style="{ zoom }">
            <my-search :searchList="searchList" :searchData="searchData" @setParams="setParams" ref="time"
                @xdAddProduct="xdAddProduct" @xdEditProduct="xdEditProduct" @xdDelProduct="xdDelProduct"></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" ref="child" @handleRowClick="handleRowClick"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>


        <AddType v-if="isxdEditShow" :title="xdTitle" :data="selectRow" @xdEditPopCallBack="xdEditPopCallBack" />
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
    </div>
</template>

<script>
import MySearch from '../public/search14.vue';
import MyTable from '../public/table013.vue';
import MyPage from '../public/Pages.vue';
import AddType from './addType.vue';
import TipPop from '../public/tipPop.vue';

export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        AddType,
        TipPop,
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {

                argKeyword: '',
            },
            tableHead: {
                Code: '产品编码',
                Type: '产品类型',
                Remark: '备注',
            },
            data: [],
            changedata1: [],
            enddata: '',
            a: '',
            b: '',
            haschange: 2,
            daochu: '',
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            isxdEditShow: false,
            xdTableData: [],
            xdTitle: '新建',
            selectRow: null,
            scid: '',
            xjid: '',
            xgid: '',
            scshow: true,
            xjshow: true,
            xgshow: true,
            buttonarr: [],
            jurisdiction: [],
        };
    },
    created() {
        this.req(1);
    },
    mounted() {
        this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
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
            this.buttonarr.forEach(item => {
                if (item.RightName == "删除产品") {
                    this.scid = item.RightID;
                } else if (item.RightName == "新建产品") {
                    this.xjid = item.RightID;
                } else if (item.RightName == "修改产品") {
                    this.xgid = item.RightID;
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`
            })
                .then(res => {
                    this.scshow = res.data.data;
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
                    method: 'delete',
                    url: `/api/Product/Delete/${this.selectRow.Id}`,
                }).then((res) => {
                    this.isTipShow = true;
                    this.noCancel = true;
                    if (res.data.code == 0) {
                        this.tipText = '删除成功';
                        this.selectRow = null;
                        this.req(1);
                    } else {
                        this.tipText = res.data.msg;
                    }
                });
            } else {
                this.isTipShow = false;
            }
        },
        handleRowClick(row) {
            this.selectRow = { ...row };
        },
        xdAddProduct() {
            if (!this.xjshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            this.xdTitle = '新建';
            this.isxdEditShow = true;
        },
        xdEditProduct() {
            if (!this.xgshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            if (!this.selectRow) {
                this.tipText = '请选择修改项';
                this.isTipShow = true;
                return;
            }
            this.xdTitle = '修改';
            this.isxdEditShow = true;
        },
        xdDelProduct() {
            if (!this.scshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            this.isTipShow = true;
            this.tipText = '是否确定要删除？';
            this.noCancel = false;
            if (!this.selectRow) {
                this.noCancel = true;
                this.tipText = '请选择删除项';
            }
        },
        xdEditPopCallBack(str, val) {
            console.log(str, val);
            if (str === 'yes') {
                let url =
                    this.xdTitle == '新建'
                        ? '/api/Product/Create' // 新建
                        : `/api/Product/Update/${val.Id}`; // 修改
                let method =
                    this.xdTitle == '新建'
                        ? 'post' // 新建
                        : 'put'; // 修改
                let data = { ...val };
                if (!data.Code) {
                    this.isTipShow = true;
                    this.tipText = '产品编码为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.Type) {
                    this.isTipShow = true;
                    this.tipText = '产品类型为必填项!';
                    this.noCancel = true;
                    return;
                }
                this.$axios({
                    method,
                    url,
                    data,
                }).then((res) => {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                    this.noCancel = true;
                    if (res.data.code == 0) {
                        this.tipText = `${this.xdTitle}成功`;
                        this.isxdEditShow = false;
                        this.req(1);
                    }
                });
            } else {
                this.isxdEditShow = false;
            }
        },

        setParams(params) {
            this.searchData = params;
            this.req(1);
        },

        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    this.isTipShow = true;
                    this.tipText = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;

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

                            this.isTipShow = true;
                            this.tipText = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            return;
                        }
                    }
                }
            }
            this.$axios
                .get(
                    `/api/Product/GetPagedList?filter=${this.searchData.argKeyword}&pageIndex=${pageIndex}&pageSize=${this.pageData.PageSize} `
                )
                .then(res => {

                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    } else {
                        this.tipText = res.data.msg;
                        this.isxdEditShow = false;
                    }
                })
                .catch(err => { });
        }
    }
};
</script>

<style lang="scss" scoped>
.public-table {
    display: flex;
    flex-direction: column;
    height: 100%;

    .table-container {
        flex: 1;
        // overflow: auto;
    }

    .page-container {
        height: 60px;
    }
}

.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;

    .tiptop {
        width: 380px;
        height: 40px;
        background-color: #ffbc3d;

        img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
            margin-left: 160px;
        }

        span {
            color: #ffffff;
            position: relative;
            top: -5px;
            margin-left: 7px;
        }
    }

    .tipcontanin {
        height: calc(100% - 40px);
    }

    .tipword {
        width: 100%;
        height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        text-align: center;
    }

    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }

    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 20px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
        margin-top: 40px;
        margin-left: 25px;
        height: 30px;

        .one {
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }

        .two {
            display: inline-block;
            height: 30px;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}

.cover2 {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
}
</style>
