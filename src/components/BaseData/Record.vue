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
            v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
        width: 100%;
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

        <ZdEdit v-if="isxdEditShow" :title="xdTitle" :data="xdSelectRow" @xdEditPopCallBack="xdEditPopCallBack" />
        <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
    </div>
</template>

<script>
import TipPop from '../public/tipPop.vue';
import MySearch from '../public/search012.vue';
import MyTable from '../public/table013.vue';
import MyPage from '../public/Pages.vue';
import ZdEdit from './zdEdit.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        ZdEdit,
        TipPop,

    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '业务类型',
                    model: 'businessType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {
                businessType: '',
                argKeyword: '',
            },
            tableHead: {
                Code: '站点编号',
                Name: '站点名称',
                BusinessTypeDisplayName: '业务类型',
                Remark: '备注',
            },
            data: [],
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
            xdSelectRow: null, // 巷道table选中项
            xdTitle: '新建', // 巷道弹窗类型
            isxdEditShow: false,
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
        this.$axios({
            url: `/api/Option/GetBusinessType`,
            method: 'get',

        }).then((res) => {
            if (res.data.code == 0) {
                let temp = res.data.data.map((_) => ({
                    value: _.Value,
                    label: _.Text,
                }))
                temp.unshift({
                    value: '',
                    label: '全部',
                })
                this.searchList[0].optionList = temp
                this.req(1);
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;

            }
        });


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
                if (item.RightName == "新建站点") {
                    this.xjid = item.RightID;
                } else if (item.RightName == "修改站点") {
                    this.xgid = item.RightID;
                } else if (item.RightName == "删除站点") {
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
        tipCallBack(str) {
            if (str == 'yes') {
                this.$axios({
                    method: 'delete',
                    url: `/api/Station/Delete/${this.xdSelectRow.Id}`,
                }).then((res) => {
                    this.isPopShow = true;
                    this.noCancel = true;
                    if (res.data.code == 0) {
                        this.tipText = '删除成功';
                        this.kqSelectRow = null;
                        this.req(1);
                    } else {
                        this.tipText = res.data.msg;
                    }
                });
            } else {
                this.isPopShow = false;
            }
        },

        handleRowClick(row) {
            this.xdSelectRow = { ...row };
        },
        xdAddProduct() {
            if (!this.xjshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.xdTitle = '新建';
            this.isxdEditShow = true;
        },
        xdEditProduct() {
            if (!this.xgshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            if (!this.xdSelectRow) {
                this.tipText = '请选择一个产品';
                this.isPopShow = true;
                return;
            }
            this.xdTitle = '修改';
            this.isxdEditShow = true;
        },
        xdDelProduct() {
            if (!this.scshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.isPopShow = true;
            this.tipText = '是否确定要删除？';
            this.noCancel = false;
            if (!this.xdSelectRow) {
                this.noCancel = true;
                this.tipText = '请选择删除项';
            }
        },
        xdEditPopCallBack(str, val) {
            if (str === 'yes') {
                let url =
                    this.xdTitle == '新建'
                        ? '/api/Station/Create' // 新建
                        : `/api/Station/Update/${val.Id}`; // 修改
                let method =
                    this.xdTitle == '新建'
                        ? 'post' // 新建
                        : 'put'; // 修改
                let data = { ...val };
                console.log(data);
                if (!data.Code) {
                    this.isPopShow = true;
                    this.tipText = '站点编码为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.Name) {
                    this.isPopShow = true;
                    this.tipText = '站点名称为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.BusinessType) {
                    this.isPopShow = true;
                    this.tipText = '业务类型为必填项!';
                    this.noCancel = true;
                    return;
                }
                if (!data.RoadwayId && data.BusinessType == 1) {
                    this.isPopShow = true;
                    this.tipText = '关联巷道为必填项!';
                    this.noCancel = true;
                    return;
                }

                console.log(data.BusinessType, data);
                if (data.BusinessType == '1') {
                    //上料
                    if (!data.IOVariableKey1 || !data.IOVariableKey2 || !data.IOVariableKey3) {
                        this.isPopShow = true;
                        this.tipText = '关联变量为必选项!';
                        this.noCancel = true;
                        return;
                    }
                } else if (data.BusinessType == '2') {
                    //下料
                    if (!data.IOVariableKey1 || !data.IOVariableKey6 || !data.IOVariableKey3) {
                        this.isPopShow = true;
                        this.tipText = '关联变量为必选项!';
                        this.noCancel = true;
                        return;
                    }
                } else if (data.BusinessType == '3') {
                    //升降机
                    if (!data.IOVariableKey1 || !data.IOVariableKey7 || !data.IOVariableKey4) {
                        this.isPopShow = true;
                        this.tipText = '关联变量为必选项!';
                        this.noCancel = true;
                        return;
                    }
                } else if (data.BusinessType == '4') {
                    //入库缓存
                    if (!data.IOVariableKey1 || !data.IOVariableKey5) {
                        this.isPopShow = true;
                        this.tipText = '关联变量为必选项!';
                        this.noCancel = true;
                        return;
                    }
                } else if (data.BusinessType == '5') {
                    //下料缓存
                    if (!data.IOVariableKey1 || !data.IOVariableKey7 || !data.IOVariableKey4) {
                        this.isPopShow = true;
                        this.tipText = '关联变量为必选项!';
                        this.noCancel = true;
                        return;
                    }
                } else if (data.BusinessType == '6') {
                    //空车插队
                    if (!data.IOVariableKey8) {
                        this.isPopShow = true;
                        this.tipText = '关联变量为必选项!';
                        this.noCancel = true;
                        return;
                    }
                }
                if (data.StationProductDetails && data.StationProductDetails.length && data.StationProductDetails.find(_ => (!this.isPositiveInteger(_.Count) || Number(_.Count) == 0))) {
                    this.tipText = '上料数量请输入正整数';
                    this.isPopShow = true;
                    return;
                }

                this.$axios({
                    method,
                    url,
                    data,
                }).then((res) => {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                    this.noCancel = true;
                    if (res.data.code == 0) {
                        this.tipText = `${this.xdTitle}站点成功`;
                        this.isxdEditShow = false;
                        this.req(1);
                    }
                });
            } else {
                this.isxdEditShow = false;
            }
        },

        setParams(params, a) {
            if (!a) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.searchData = params;
        },

        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    this.tipText = '请输入正整数';
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
                            this.tipText = '目标页数大于最大页数';
                            this.isPopShow = true;
                            return;
                        }
                    }
                }
            }
            this.$axios
                .get(
                    `/api/Station/GetPagedList?businessType=${this.searchData.businessType}&filter=${this.searchData.argKeyword}&pageIndex=${pageIndex}&pageSize=${this.pageData.PageSize}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;

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
</style>
