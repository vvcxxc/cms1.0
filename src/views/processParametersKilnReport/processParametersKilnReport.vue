<template>
    <div class="ProcessParametersKilnReport-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
        <div class="page-center">
            <div class="select">
                <my-select @select="select" @exportTable="exportTable" />
            </div>
            <div class="tables">
                <el-table ref="mytable" :data="tableData" :row-class-name="tabRow" style="width: 100%" height="100%"
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
                    }">
                    <el-table-column v-for="item in tableLabel" :key="item.key" :prop="item.value" :label="item.key"
                        width="150" />
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
            tableLabel: [],
            query: {
                productId: 1,
                time,
                KType: 1
            },
            tHeader: []
        };
    },
    created() {
        this.initData(this.query);
    },
    methods: {
        initData(query) {
            this.$axios({
                method: 'get',
                url: `/api/ReportManagement/KilnProcessParameterReportQuery?kiln=${query.productId}&time=${query.time}`,
            }).then((res) => {
                this.tableLabel = query.KType == 1 ? [
                    { key: '记录时间', value: 'RecordTime' },
                    { key: 'U22冷却温度', value: 'CoolingTemperatureU22' },
                    { key: 'U23冷却温度', value: 'CoolingTemperatureU23' },
                    { key: 'U24冷却温度', value: 'CoolingTemperatureU24' },
                    { key: 'U25冷却温度', value: 'CoolingTemperatureU25' },
                    { key: 'U26冷却温度', value: 'CoolingTemperatureU26' },
                    { key: 'U27冷却温度', value: 'CoolingTemperatureU27' },
                    { key: 'U28冷却温度', value: 'CoolingTemperatureU28' },
                    { key: 'U29冷却温度', value: 'CoolingTemperatureU29' },
                    {
                        key: '排烟温度',
                        value: 'ExhaustGasTemperature'
                    },
                    { key: '进口冷却水温度', value: 'InletCoolingWaterTemperature' },
                    { key: '出口冷却水温度', value: 'OutputCoolingWaterTemperature' },
                    {
                        key: '冷却循环温度',
                        value: 'CoolingCycleTemperature'
                    }, {
                        key: 'T1燃烧温度',
                        value: 'BurningTemperatureT1'
                    }, {
                        key: 'T2燃烧温度',
                        value: 'BurningTemperatureT2'
                    }, {
                        key: '9区窑压力',
                        value: 'FurnacePressure9'
                    }, {
                        key: '19区窑压力',
                        value: 'FurnacePressure19'
                    }, {
                        key: '23区窑压力',
                        value: 'FurnacePressure23'
                    }, {
                        key: '氮气压力',
                        value: 'NitrogenPressure'
                    }, {
                        key: '冷却水压力',
                        value: 'CoolingWaterPressure'
                    }, {
                        key: '助燃压力',
                        value: 'CombustionPressure'
                    }, {
                        key: '氮气累计流量',
                        value: 'NitrogenAdd'
                    }, {
                        key: '氮气瞬时流量',
                        value: 'NitrogenInstant'
                    }, { key: '冷却水累计流量', value: 'CoolingWaterAdd' },
                    { key: '冷却水瞬时流量', value: 'CoolingWaterInstant' },
                    { key: '天然气累计流量', value: 'FulgasAdd' },
                    { key: '天然气瞬时流量', value: 'FulgasInstant' },
                    {
                        key: '烧成时间',
                        value: 'BurningTime'
                    }, {
                        key: '累计用电量',
                        value: 'ElectricityAdd'
                    },] : query.KType == 2 ? [
                        { key: '记录时间', value: 'RecordTime' },
                        {
                            key: '冷却1温度',
                            value: 'CoolingTemperature1'
                        }, {
                            key: '冷却2温度',
                            value: 'CoolingTemperature2'
                        }, {
                            key: '冷却3温度',
                            value: 'CoolingTemperature3'
                        }, {
                            key: '冷却4温度',
                            value: 'CoolingTemperature4'
                        }, {
                            key: '冷却5温度',
                            value: 'CoolingTemperature5'
                        }, {
                            key: '排烟温度',
                            value: 'ExhaustGasTemperature'
                        }, {
                            key: '废热温度',
                            value: 'WasteHeatTemperature'
                        }, {
                            key: '进口冷却水温度',
                            value: 'InletCoolingWaterTemperature'
                        }, {
                            key: '出口冷却水温度',
                            value: 'OutputCoolingWaterTemperature'
                        }, {
                            key: 'T1燃烧温度',
                            value: 'BurningTemperatureT1'
                        }, {
                            key: 'T2燃烧温度',
                            value: 'BurningTemperatureT2'
                        }, {
                            key: '窑炉压力',
                            value: 'FurnacePressure'
                        }, {
                            key: '助燃风机压力',
                            value: 'CombustionPressure'
                        }, { key: '入口压缩空气压力', value: 'InletCompressedAirPressure' },
                        { key: '出口压缩空气压力', value: 'OutputCompressedAirPressure' },
                        { key: '天然气一次侧压力', value: 'NaturalGasPrimarySidePressure' },
                        { key: '天然气二次侧压力', value: 'SecondarySidePressureOfNaturalGas' },
                        {
                            key: '氮气一次侧压力',
                            value: 'NitrogenPrimarySidePressure'
                        }, {
                            key: '氮气二次侧压力',
                            value: 'SecondarySidePressureOfNitrogen'
                        }, {
                            key: '冷却水压力',
                            value: 'CoolingWaterPressure'
                        }, {
                            key: '烧成时间',
                            value: 'BurningTime'
                        }, {
                            key: '累计用电量',
                            value: 'ElectricityAdd'
                            ,
                        }] : []
                this.tableData = res.data.data;
                this.$refs['mytable'].doLayout();
            });
        },
        select(data) {
            this.query = {
                productId: data.value,
                time: data.date,
                KType: data.KType,
            };
            this.initData(this.query);
        },
        exportTable() {
            require.ensure([], () => {
                const tHeader = this.query.KType == 1 ? [
                    '记录时间',
                    'U22冷却温度',
                    'U23冷却温度',
                    'U24冷却温度',
                    'U25冷却温度',
                    'U26冷却温度',
                    'U27冷却温度',
                    'U28冷却温度',
                    'U29冷却温度',
                    '排烟温度',
                    '进口冷却水温度',
                    '出口冷却水温度',
                    '冷却循环温度',
                    'T1燃烧温度',
                    'T2燃烧温度',
                    '9区窑压力',
                    '19区窑压力',
                    '23区窑压力',
                    '氮气压力',
                    '冷却水压力',
                    '助燃压力',
                    '氮气累计流量',
                    '氮气瞬时流量',
                    '冷却水累计流量',
                    '冷却水瞬时流量',
                    '天然气累计流量',
                    '天然气瞬时流量',
                    '烧成时间',
                    '累计用电量',
                ] : this.query.KType == 2 ? [
                    '记录时间',
                    '冷却1温度',
                    '冷却2温度',
                    '冷却3温度',
                    '冷却4温度',
                    '冷却5温度',
                    '排烟温度',
                    '废热温度',
                    '进口冷却水温度',
                    '出口冷却水温度',
                    'T1燃烧温度',
                    'T2燃烧温度',
                    '窑炉压力',
                    '助燃风机压力',
                    '入口压缩空气压力',
                    '出口压缩空气压力',
                    '天然气一次侧压力',
                    '天然气二次侧压力',
                    '氮气一次侧压力',
                    '氮气一次侧压力',
                    '冷却水压力',
                    '烧成时间',
                    '累计用电量',
                ] : []
                const filterVal = this.query.KType == 1 ? [
                    'RecordTime',
                    'CoolingTemperatureU22',
                    'CoolingTemperatureU23',
                    'CoolingTemperatureU24',
                    'CoolingTemperatureU25',
                    'CoolingTemperatureU26',
                    'CoolingTemperatureU27',
                    'CoolingTemperatureU28',
                    'CoolingTemperatureU29',
                    'ExhaustGasTemperature',
                    'InletCoolingWaterTemperature',
                    'OutputCoolingWaterTemperature',
                    'CoolingCycleTemperature',
                    'BurningTemperatureT1',
                    'BurningTemperatureT2',
                    'FurnacePressure9',
                    'FurnacePressure19',
                    'FurnacePressure23',
                    'NitrogenPressure',
                    'CoolingWaterPressure',
                    'CombustionPressure',
                    'NitrogenAdd',
                    'NitrogenInstant',
                    'CoolingWaterAdd',
                    'CoolingWaterInstant',
                    'FulgasAdd',
                    'FulgasInstant',
                    'BurningTime',
                    'ElectricityAdd'
                ] : this.query.KType == 2 ? [
                    'RecordTime',
                    'CoolingTemperature1',
                    'CoolingTemperature2',
                    'CoolingTemperature3',
                    'CoolingTemperature4',
                    'CoolingTemperature5',
                    'ExhaustGasTemperature',
                    'WasteHeatTemperature',
                    'InletCoolingWaterTemperature',
                    'OutputCoolingWaterTemperature',
                    'BurningTemperatureT1',
                    'BurningTemperatureT2',
                    'FurnacePressure',
                    'CombustionPressure',
                    'InletCompressedAirPressure',
                    'OutputCompressedAirPressure',
                    'NaturalGasPrimarySidePressure',
                    'SecondarySidePressureOfNaturalGas',
                    'NitrogenPrimarySidePressure',
                    'SecondarySidePressureOfNitrogen',
                    'CoolingWaterPressure',
                    'BurningTime',
                    'ElectricityAdd',
                ] : [];
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
<style>
.ProcessParametersKilnReport-Page .el-table .el-table__expanded-cell {
    background-color: transparent;
}
</style>
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