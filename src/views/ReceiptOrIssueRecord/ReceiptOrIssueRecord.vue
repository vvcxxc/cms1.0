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
            <div class="pages-container">
                <my-page :pageData="pageData" @req="req"></my-page>
            </div>
            <RoEdit v-if="isxdEditShow" :data="xdSelectRow" @xdEditPopCallBack="xdEditPopCallBack" />
            <TipPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
        </div>
    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
import MySearch from '../../components/public/search016.vue';
import MyTable from '../../components/public/table014.vue';
import MyPage from '../../components/public/Pages.vue';
import RoEdit from './roEdit.vue';

export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        TipPop,
        RoEdit
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '记录时间：',
                    model: 'startTime',
                    type: 'time'
                },
                {
                    title: '-',
                    model: 'endTime',
                    type: 'time'
                },
                {
                    title: '状态',
                    model: 'status',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '小车类型',
                    model: 'carType',
                    type: 'select',
                    optionList: [],
                    value: 'value',
                    label: 'label'
                },
                {
                    title: '巷道类型',
                    model: 'roadwayType',
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
                startTime: '',
                endTime: '',
                argKeyword: '',
                status: '',
                carType: '',
                roadwayType: '',
            },
            tableHead: {
                CarNo: '小车号',
                RoadwayType: '小车类型',
                ProductCount: '产品数量',
                // aaa: '库区名称',
                Roadway: '巷道名称',
                ActualRoadwayType: '巷道类型',
                StatusDisplayName: '状态',
                CreateTypeTypeDisplayName: '出入库类型',
                LastModificationTime: '出入库时间',
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
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            xdSelectRow: null,
            xdTitle: '查看',
            isxdEditShow: false,
            scid: '',
            xgid: '',
            ckid: '',
            scshow: true,
            xgshow: true,
            ckshow: true,
            buttonarr: [],
            jurisdiction: [],
        };
    },

    mounted() {
        let startTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() -
            24 * 60 * 60 * 1000 * 6
        );
        let endTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1
        );
        Object.assign(this.searchData, {
            startTime,
            endTime,
        });
        this.$axios({
            url: `/api/Option/GetMissionLogStatus`,
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
                this.searchList[2].optionList = temp
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;

            }
        });

        // this.$axios({
        //     url: `/api/Option/GetCarType`,
        //     method: 'get',

        // }).then((res) => {
        //     if (res.data.code == 0) {
        //         let temp = res.data.data.map((_) => ({
        //             value: _.Value,
        //             label: _.Text,
        //         }))
        //         temp.unshift({
        //             value: '',
        //             label: '全部',
        //         })
        //         this.searchList[3].optionList = temp

        //     } else {
        //         this.tipText = res.data.msg;
        //         this.isPopShow = true;

        //     }
        // });
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
                this.searchList[3].optionList = temp
                this.searchList[4].optionList = temp

            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;

            }
        });
        this.req(1);
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
            console.log("butt", this.buttonarr)
            this.buttonarr.forEach((item) => {
                if (item.RightName == "导出") {
                    this.xgid = item.RightID
                } else if (item.RightName == "查询") {
                    this.scid = item.RightID
                } else if (item.RightName == "查看") {
                    this.ckid = item.RightID
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
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`
            })
                .then(res => {
                    this.ckshow = res.data.data;
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
            this.isPopShow = false;
        },
        xdEditPopCallBack(str, val) {
            this.isxdEditShow = false;
        },
        handleEdit(row) {
            if (!this.ckshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.xdSelectRow = { ...row }
            this.isxdEditShow = true;
        },

        setParams(params) {
            this.searchData = params;
            if (!this.scshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }
            this.req(1)
        },
        exportTable() {
            if (!this.xgshow) {
                this.tipText = '该账户没有权限！';
                this.isPopShow = true;
                return;
            }

            this.$axios
                .get(
                    `/api/Mission/GetFinishPagedList?startTime=${this.searchData.startTime}&endTime=${this.searchData.endTime}&status=${this.searchData.status}&RoadwayTypeId=${this.searchData.carType}&ActualRoadwayTypeId=${this.searchData.roadwayType}&filter=${this.searchData.argKeyword}&pageIndex=1&pageSize=${this.pageData.TotalCount}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        let filterVal = [
                            'Number',
                            'CarNo',
                            'RoadwayType',
                            'ProductCount',
                            'Roadway',
                            'ActualRoadwayType',
                            'StatusDisplayName',
                            'CreateTypeTypeDisplayName',
                            'LastModificationTime',
                        ];
                        let title = [
                            '序号',
                            '小车号',
                            '小车类型',
                            '产品数量',
                            '巷道名称',
                            '巷道类型',
                            '状态',
                            '出入库类型',
                            '出入库时间',
                        ];
                        let tableList = res.data.data.DataList.map((_, ids) => ({
                            ..._,
                            Number: Number(ids) + 1
                        }));
                        require.ensure([], () => {
                            let excelDatas = [
                                {
                                    tHeader: title,
                                    filterVal: filterVal,
                                    tableDatas: tableList,
                                    sheetName: 'sheet1',
                                },
                                {
                                    tHeader: title,
                                    filterVal: filterVal,
                                    tableDatas: tableList,
                                    sheetName: 'sheet1',
                                }, //不知道源码为啥删一次，写两次才正常
                            ];
                            this.json2excel(
                                excelDatas,
                                '出入库记录',
                                true,
                                'xlsx'
                            );
                        });
                    }
                })
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
                    `/api/Mission/GetFinishPagedList?startTime=${this.searchData.startTime}&endTime=${this.searchData.endTime}&status=${this.searchData.status}&RoadwayTypeId=${this.searchData.carType}&ActualRoadwayTypeId=${this.searchData.roadwayType}&filter=${this.searchData.argKeyword}&pageIndex=${pageIndex}&pageSize=${this.pageData.PageSize}`
                    // `/api/Mission/GetPagedList?input.pageIndex=1&input.pageSize=50`//测试用一用，这两返回格式一样
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                        console.log();
                    } else {
                        this.tipText = res.data.msg;
                        this.isPopShow = true;

                    }
                })
                .catch(err => { });
        }
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
            height: calc(100% - 120px);
            padding: 20px 20px 0;
            box-sizing: border-box;
        }

        .page-container {
            height: 60px;
        }
    }
}
</style>
