<template>
    <div
        class="ProcessParametersKilnReport-Page"
        :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
    >
        <div class="page-center">
            <div class="select">
                <my-select @select="select" @exportTable="exportTable" />
            </div>
            <div class="tables">
                <el-table
                    :data="tableData"
                    :row-class-name="tabRow"
                    style="width: 100%"
                    height="100%"
                    :header-cell-style="{
                        background:
                            $store.state.color == 'grey'
                                ? '#D9DBDE'
                                : $store.state.color === 'blackBlue'
                                ? '#18254E'
                                : '#5a6c98',
                        color: $store.state.color == 'grey' ? '#000' : '#fff',
                        'border-left':
                            $store.state.color === 'blackBlue'
                                ? '1px solid #304171'
                                : '1px solid #cccccc',
                        height: 40 + 'px',
                        'font-size': 16 + 'px',
                        padding: '0',
                        'text-align': 'center',
                    }"
                >
                    <el-table-column
                        width="232"
                        prop="归档时间"
                        label="归档时间"
                    />
                    <el-table-column
                        width="232"
                        prop="T16(冷却1)温度(℃)"
                        label="T16（冷却1）温度（℃）"
                    />
                    <el-table-column
                        width="232"
                        prop="T17(冷却2)温度(℃)"
                        label="T17（冷却2）温度（℃）"
                    />
                    <el-table-column
                        width="232"
                        prop="T18(冷却4)温度(℃)"
                        label="T18（冷却4）温度（℃）"
                    />
                    <el-table-column
                        width="232"
                        prop="T19(冷却4)温度(℃)"
                        label="T19（冷却4）温度（℃）"
                    />
                    <el-table-column
                        width="185"
                        prop="冷却水温度(℃)"
                        label="冷却水温度（℃）"
                    />
                    <el-table-column
                        width="185"
                        prop="排烟风机温度(℃)"
                        label="排烟风机温度（℃）"
                    />
                    <el-table-column
                        width="185"
                        prop="废热温机温度(℃)"
                        label="废热风机温度（℃）"
                    />
                    <el-table-column
                        width="185"
                        prop="处理炉1温度(℃)"
                        label="处理炉1温度（℃）"
                    />
                    <el-table-column
                        width="185"
                        prop="处理炉2温度(℃)"
                        label="处理炉2温度（℃）"
                    />
                    <el-table-column
                        width="125"
                        prop="炉压(pa)"
                        label="炉压（pa）"
                    />
                    <el-table-column
                        width="185"
                        prop="烧成时间(h)"
                        label="烧成时间（h）"
                    />
                    <el-table-column
                        width="232"
                        prop="瞬时氮气流量(Nm3/H)"
                        label="瞬时氮气流量（Nm3/h）"
                    />
                    <el-table-column
                        width="232"
                        prop="累计氮气流量(Nm3)"
                        label="累计氮气流量（Nm3/h）"
                    />
                    <el-table-column
                        width="232"
                        prop="瞬时燃气流量(Nm3/H)"
                        label="瞬时燃气流量（Nm3/h）"
                    />
                    <el-table-column
                        width="232"
                        prop="累计燃气流量(Nm3)"
                        label="累计燃气流量（Nm3/h）"
                    />
                    <el-table-column
                        width="232"
                        prop="瞬时冷却水流量(Nm3/H)"
                        label="瞬时冷却水流量（Nm3/h）"
                    />
                    <el-table-column
                        width="232"
                        prop="累计冷却水流量(Nm3)"
                        label="累计冷却水流量（Nm3/h）"
                    />
                    <el-table-column
                        width="232"
                        prop="累计用电量(NKwh)"
                        label="累计用电量（Kwh）"
                    />
                    <el-table-column
                        width="232"
                        prop="燃气一次侧压力(Mpa)"
                        label="燃气一次侧压力（MPa）"
                    />
                    <el-table-column
                        width="232"
                        prop="燃气二次侧压力(Mpa)"
                        label="燃气二次侧压力（MPa）"
                    />
                    <el-table-column
                        width="232"
                        prop="助燃风压力(Mpa)"
                        label="助燃风压力（MPa）"
                    />
                    <el-table-column
                        width="232"
                        prop="氮气一次侧压力(Mpa)"
                        label="氮气一次侧压力（MPa）"
                    />
                    <el-table-column
                        width="232"
                        prop="氮气二次侧压力(Mpa)"
                        label="氮气二次侧压力（MPa）"
                    />
                    <el-table-column
                        width="232"
                        prop="入口压缩空气压力(Mpa)"
                        label="入口压缩空气压力（MPa）"
                    />
                    <el-table-column
                        width="232"
                        prop="出口压缩空气压力(Mpa)"
                        label="出口压缩空气压力（MPa）"
                    />
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import MySelect from '../../components/Select/Search02.vue';

export default {
    components: {
        MySelect,
    },
    data() {
        let time = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        return {
            tableData: [],
            query: {
                productId: 1,
                time,
            },
        };
    },
    created() {
        this.initData(this.query);
    },
    methods: {
        initData(query) {
            this.$axios({
                method: 'get',
                url: `/api/KilnProcessParameters/GetKilnProcessParamData?productId=${query.productId}&time=${query.time}`,
            }).then((res) => {
                this.tableData = res.data.data.map((item) => {
                    let obj = {};
                    item.forEach((val) => {
                        obj = {
                            ...obj,
                            [val.VName]: val.Value,
                        };
                    });
                    return obj;
                });
            });
        },
        select(data) {
            this.query = {
                productId: data.value,
                time: data.date,
            };
            this.initData(this.query);
        },
        exportTable() {
            require.ensure([], () => {
                const tHeader = [
                    '归档时间',
                    'T16（冷却1）温度（℃）',
                    'T17（冷却2）温度（℃）',
                    'T18（冷却4）温度（℃）',
                    'T19（冷却4）温度（℃）',
                    '冷却水温度（℃）',
                    '排烟风机温度（℃）',
                    '废热风机温度（℃）',
                    '处理炉1温度（℃）',
                    '炉压（pa）',
                    '烧成时间（h）',
                    '瞬时氮气流量（Nm3/h）',
                    '累计氮气流量（Nm3/h）',
                    '瞬时燃气流量（Nm3/h）',
                    '累计燃气流量（Nm3/h）',
                    '瞬时冷却水流量（Nm3/h）',
                    '累计冷却水流量（Nm3/h）',
                    '累计用电量（Kwh）',
                    '燃气一次侧压力（MPa）',
                    '燃气二次侧压力（MPa）',
                    '助燃风压力（MPa）',
                    '氮气一次侧压力（MPa）',
                    '氮气二次侧压力（MPa）',
                    '入口压缩空气压力（MPa）',
                    '出口压缩空气压力（MPa）',
                ];
                const filterVal = [
                    '归档时间',
                    'T16(冷却1)温度(℃)',
                    'T17(冷却2)温度(℃)',
                    'T18(冷却4)温度(℃)',
                    'T19(冷却4)温度(℃)',
                    '冷却水温度(℃)',
                    '排烟风机温度(℃)',
                    '废热温机温度(℃)',
                    '处理炉2温度(℃)',
                    '炉压(pa)',
                    '烧成时间(h)',
                    '瞬时氮气流量(Nm3/H)',
                    '累计氮气流量(Nm3)',
                    '瞬时燃气流量(Nm3/H)',
                    '累计燃气流量(Nm3)',
                    '瞬时冷却水流量(Nm3/H)',
                    '累计冷却水流量(Nm3)',
                    '累计用电量(NKwh)',
                    '燃气一次侧压力(Mpa)',
                    '燃气二次侧压力(Mpa)',
                    '助燃风压力(Mpa)',
                    '氮气一次侧压力(Mpa)',
                    '氮气二次侧压力(Mpa)',
                    '入口压缩空气压力(Mpa)',
                    '出口压缩空气压力(Mpa)',
                ];
                const arr = [...this.tableData];
                const excelDatas = [
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: arr.splice(0, 20000),
                        sheetName: 'sheet1',
                    },
                    {
                        tHeader: tHeader,
                        filterVal: filterVal,
                        tableDatas: arr.splice(0, 1000),
                        sheetName: 'sheet2',
                    },
                ];
                this.json2excel(excelDatas, '工艺参数窑炉表', true, 'xlsx');
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
        tabRow({ row, rowIndex }) {
            let index = rowIndex + 1;
            if (index % 2 == 0) {
                return 'warnning-row';
            } else {
                return 'true-row';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.ProcessParametersKilnReport-Page {
    height: calc(100% - 160px);
    margin: 20px;
    margin-top: 110px;
    background: #fff;

    &.blackBlueBg {
        background-color: #081027;
        box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
    }

    ::v-deep .el-table .warnning-row {
        background: #121c3a !important;
        text-align: center;
    }
    ::v-deep .el-table .true-row {
        background: #0e1732 !important;
    }
    ::v-deep .el-table th,
    .el-table tr {
        background: #18254e !important;
    }
    ::v-deep .el-table td {
        text-align: center !important;
    }

    .page-center {
        width: 100%;
        height: 100%;
        background: #081027;
        border: 2px solid #2a3058;

        .select {
            height: 60px;
            background: #0b1530;
            border-bottom: 1px solid #38415a;
        }
    }

    .tables {
        margin: 22px 20px;
        height: calc(100% - 104px);
    }
}
</style>