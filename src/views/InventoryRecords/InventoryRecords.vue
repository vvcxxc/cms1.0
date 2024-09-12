<!--
 * @Description: 报警记录报警点管理界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:54:54
 -->
<template>
    <div class="taskManagement">
        <div class="taskManagement-content">
            <div class="loadcover" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.4)" v-loading="this.$store.state.isShow"
                v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
            <div class="search-container">
                <my-search :searchList="searchList" :searchData="searchData" @exportTable="exportTable"
                    @setParams="setParams" ref="time"></my-search>
            </div>
            <div class="taskManagement-table-container">
                <my-table :data="data" :tableHead="tableHead" ref="child" @handleEdit="handleEdit"></my-table>
            </div>
            <InEdit v-if="isxdEditShow" :title="xdTitle" :data="xdSelectRow" @xdEditPopCallBack="xdEditPopCallBack" />
            <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
        </div>
    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
import MySearch from '../../components/public/search017.vue';
import MyTable from '../../components/public/table015.vue';
import InEdit from './inEdit.vue';

export default {
    components: {
        MySearch,
        MyTable,
        TipPop,
        InEdit
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '巷道类型',
                    model: 'roadwayType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '属性',
                    model: 'carType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '是否允许进入',
                    model: 'allowIn',
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
                carType: '',
                roadwayType: '',
                allowIn: '',
                argKeyword: '',
            },
            tableHead: {
                WarehouseAreaName: '库区名称',
                RoadwayCode: '巷道编码',
                RoadwayName: '巷道名称',
                RoadwayTypeName: '巷道类型',
                PropertyDisplayName: '属性',
                ProductName: '产品类型',
                Count: '库位数量',
                CarCount: '小车数量',
                IsAllowed: '是否允许进入',
            },
            data: [],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            xdSelectRow: null,
            xdTitle: '查看',
            isxdEditShow: false,
            scid: '',
            xgid: '',
            dcid: '',
            cxid: '',
            scshow: true,
            xgshow: true,
            dcshow: true,
            cxshow: true,
            buttonarr: [],
            jurisdiction: [],

        };
    },
    created() {
        this.$axios({
            url: `/api/RoadwayType/GetALlList`,
            method: 'get',

        }).then((res) => {
            if (res.data.code == 0) {
                let temp = res.data.data.map((_) => ({
                    value: _.Id,
                    label: _.Name,
                }))
                temp.unshift({
                    value: '',
                    label: '全部',
                })
                this.searchList[0].optionList = temp
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;

            }
        });

        this.$axios({
            url: `/api/Option/GetCarType`,
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
                this.searchList[1].optionList = temp
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;

            }
        });
        this.searchList[2].optionList = [{
            value: '',
            label: '不限',
        }, {
            value: true,
            label: '是',
        }, {
            value: false,
            label: '否',
        }]
        this.req()
    },
    mounted() {
        this.btnPowerData();
    },
    watch: {
        VpowerData(val) {
            this.btnPowerData();
        }
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    methods: {
        btnPowerData() {
            this.jurisdiction = this.$store.state.btnPowerData
            this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
            this.buttonarr.forEach((item) => {
                if (item.RightName == "导出") {
                    this.dcid = item.RightID
                } else if (item.RightName == "查询") {
                    this.cxid = item.RightID
                } else if (item.RightName == "查看") {
                    this.scid = item.RightID
                } else if (item.RightName == "修改") {
                    this.xgid = item.RightID
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`
            })
                .then(res => {
                    this.cxshow = res.data.data;
                })
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`
            })
                .then(res => {
                    this.dcshow = res.data.data;
                })
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`
            })
                .then(res => {
                    this.scshow = res.data.data;
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
                this.isPopShow = false;
            } else {
                this.isPopShow = false;
            }
        },
        xdEditPopCallBack(str, val) {
            this.isxdEditShow = false;
            this.req()
        },
        handleEdit(type, row) {
            if (!this.scshow && type == '查看') {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            if (!this.xgshow && type == '编辑') {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.xdTitle = type;
            this.xdSelectRow = { ...row }
            this.isxdEditShow = true;
        },

        setParams(params) {
            this.searchData = params;
            console.log("this.cxshow");
            console.log("this.cxshow", this.cxshow);
            if (!this.cxshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.req()
        },
        exportTable() {
            if (!this.dcshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            window.open(`/api/Inventory/ExportData?roadwayTypeId=${this.searchData.roadwayType}&propertyName=${this.searchData.carType}&isAllowed=${this.searchData.allowIn}&filter=${this.searchData.argKeyword}`)
            // let filterVal = [
            //     'Number',
            //     'WarehouseAreaName',
            //     'RoadwayCode',
            //     'RoadwayName',
            //     'RoadwayTypeName',
            //     'PropertyName',
            //     'ProductName',
            //     'Count',
            //     'CarCount',
            //     'IncludeMoveTask',
            // ];
            // let title = [
            //     '序号',
            //     '巷道编码',
            //     '库区名称',
            //     '巷道名称',
            //     '巷道类型',
            //     '属性',
            //     '产品类型',
            //     '库位数量',
            //     '小车数量',
            //     '是否允许进入',
            // ];
            // let tableList = this.data.map((_, ids) => ({
            //     ..._,
            //     Number: Number(ids) + 1,
            // }));
            // require.ensure([], () => {
            //     let excelDatas = [
            //         {
            //             tHeader: title,
            //             filterVal: filterVal,
            //             tableDatas: tableList,
            //             sheetName: 'sheet1',
            //         },
            //         {
            //             tHeader: title,
            //             filterVal: filterVal,
            //             tableDatas: tableList,
            //             sheetName: 'sheet1',
            //         }, //不知道源码为啥删一次，写两次才正常
            //     ];
            //     this.json2excel(
            //         excelDatas,
            //         '任务管理',
            //         true,
            //         'xlsx'
            //     );
            // });
        },
        json2excel(tableJson, filenames, autowidth, bookTypes) {
            var that = this;
            //这个是引用插件
            import('../../vendor/Export2Excel').then((excel) => {
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
        req() {
            this.$axios
                .get(
                    `/api/Inventory/GetInventories?roadwayTypeId=${this.searchData.roadwayType}&propertyName=${this.searchData.carType}&isAllowed=${this.searchData.allowIn}&filter=${this.searchData.argKeyword}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.data = res.data.data.map(_ => ({
                            ..._,
                            ProductName: _.ProductName.join(','),
                            IsAllowed: _.IsAllowed ? '是' : '否'
                        }))
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;

                    }
                })
                .catch(err => { });
        },
    },
};
</script>

<style lang="scss" scoped>
.taskManagement {
    width: 100%;
    height: calc(100% - 30px);
    padding: 110px 20px 20px;
    box-sizing: border-box;
    background-color: #EEEEEE;

    .taskManagement-content {
        width: 100%;
        height: 100%;
        background-color: #fff;

        .taskManagement-table-container {
            width: 100%;
            height: calc(100% - 75px);
            padding: 20px 20px 0;
            box-sizing: border-box;
        }

        .page-container {
            height: 60px;
        }
    }
}
</style>
