<template>
    <div class="tapwater" v-loading="this.$store.state.isShow">
        <div
            class="linebox"
            :class="{ colordiv: $store.state.color == 'grey' }"
        >
            <div class="table clearfix">
                <div class="fll">
                    <span>{{
                        lang.AlarmStatistics_AlarmStatisticsUserControl_StartTime
                    }}</span>
                    <div class="container">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                :placeholder="
                                    lang.SCMSConsoleWebApiMySql_PleChooseDate
                                "
                                value-format="yyyy-MM-dd"
                                :style="[
                                    { height: '40px' },
                                    { fontSize: 16 * 1 + 'px' },
                                    { width: 250 * 1 + 'px' }
                                ]"
                            ></el-date-picker>
                        </div>
                        <span>{{
                            lang.AlarmStatistics_AlarmStatisticsUserControl_EndTime
                        }}</span>
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="value2"
                                type="date"
                                :placeholder="
                                    lang.SCMSConsoleWebApiMySql_PleChooseDate
                                "
                                value-format="yyyy-MM-dd"
                                :style="[
                                    { height: '40px' },
                                    { fontSize: 16 * 1 + 'px' },
                                    { width: 250 * 1 + 'px' }
                                ]"
                            ></el-date-picker>
                        </div>
                    </div>
                </div>
                <div
                    class="query W1"
                    :id="cxid"
                    @click="Search"
                    :style="[
                        { lineHeight: '36px' },
                        { height: '40px' },
                        { fontSize: 16 * 1 + 'px' },
                        { width: 120 * 1 + 'px' }
                    ]"
                >
                    {{ lang.AlarmStatistics_AlarmStatisticsUserControl_Query }}
                </div>
                <div class="fr">
                    <div
                        class="export"
                        :id="dcid"
                        @click="exporData"
                        :style="[
                            { lineHeight: '40px' },
                            { height: '40px' },
                            { fontSize: 16 * 1 + 'px' },
                            { width: 120 * 1 + 'px' }
                        ]"
                    >
                        {{
                            lang.AlarmStatistics_AlarmStatisticsUserControl_Export
                        }}
                    </div>
                </div>
            </div>
            <div class="tabledata-box">
                <div class="table-title">
                    <div class="ski">
                        <div class="title-item">生产日期</div>
                        <div class="title-item">采集时间段</div>
                        <div class="title-item">统计时间点</div>
                        <div class="title-item">机组</div>
                        <div class="title-item">班组</div>
                    </div>
                    <div class="title-item">生产吨</div>
                    <!-- <div class="title-item">一次合格吨</div> -->
                    <div class="title-item">一次合格率</div>
                    <div class="title-item">生产支</div>
                    <div class="title-item">一区温度</div>
                    <div class="title-item">二区温度</div>
                    <div class="title-item">三区温度</div>
                    <div class="title-item">四区温度</div>
                    <div class="title-item">五区温度</div>
                    <div class="title-item">风压</div>
                    <div class="title-item">速度</div>
                    <div class="title-item">风机频率</div>
                    <div class="title-item">排烟温度</div>
                    <div class="title-item">主机耗电量</div>
                    <div class="title-item">副机耗电量</div>
                    <div class="title-item">1线耗电合计</div>
                    <div class="title-item">1线耗电等工耗</div>
                    <div class="title-item">1线耗气量</div>
                    <div class="title-item">1线耗气等工耗</div>
                    <div class="title-item">开机时长</div>
                </div>
                <div v-for="_ in tabledata">
                    <div
                        class="table-label"
                        v-for="item in _.ProductionDayShift"
                    >
                        <div class="ski">
                            <div class="label-item">
                                {{ item.ProductionDate }}
                            </div>
                            <div class="label-item">{{ item.DisplayTime }}</div>
                            <div class="label-item">
                                {{ item.CollectionTimeSpan }}
                            </div>
                            <div class="label-item">
                                {{ item.FWORKSHOPNAME }}
                            </div>
                            <div class="label-item">
                                {{ item.FSHIFTGROUPNAME }}
                            </div>
                        </div>
                        <div class="label-item">{{ item.FRKREALQTY }}</div>
                        <!-- <div class="label-item">{{ item.FRKZT }}</div> -->
                        <div class="label-item">{{ item.PrcentPass }}</div>
                        <div class="label-item">{{ item.FRKZS }}</div>
                        <div class="label-item">{{ item.T1 }}</div>
                        <div class="label-item">{{ item.T2 }}</div>
                        <div class="label-item">{{ item.T3 }}</div>
                        <div class="label-item">{{ item.T4 }}</div>
                        <div class="label-item">{{ item.T5 }}</div>
                        <div class="label-item">{{ item.WindPressure }}</div>
                        <div class="label-item">{{ item.Velocity }}</div>
                        <div class="label-item">{{ item.FrequencyOfFan }}</div>
                        <div class="label-item">
                            {{ item.ExhaustGasTemperature }}
                        </div>
                        <div class="label-item">{{ item.HostElectric }}</div>
                        <div class="label-item">{{ item.DonkeyElectric }}</div>
                        <div class="label-item">
                            {{ item.ElectricTotalLine1 }}
                        </div>
                        <div class="label-item">
                            {{ item.ElectricConsumptionLine1 }}
                        </div>
                        <div class="label-item">{{ item.GasLine1 }}</div>
                        <div class="label-item">
                            {{ item.GasConsumptionLine1 }}
                        </div>
                        <div class="label-item">{{ item.DisplayRunTime }}</div>
                    </div>
                    <div class="table-count">
                        <div class="ski">
                            <div class="count-item">白班合计</div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                        </div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.ProductionTon }}
                        </div>
                        <!-- <div class="count-item">{{ _.DayShiftTotalData.Quantity }}</div> -->
                        <div class="count-item">
                            {{ _.DayShiftTotalData.PrcentPass }}
                        </div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.ProductionCount }}
                        </div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.HostElectric }}
                        </div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.DonkeyElectric }}
                        </div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.ElectricTotalLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.ElectricConsumptionLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.GasLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.GasConsumptionLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.DayShiftTotalData.RunTime }}
                        </div>
                    </div>
                    <div
                        class="table-label"
                        v-for="item in _.ProductionNightShift"
                    >
                        <div class="ski">
                            <div class="label-item">
                                {{ item.ProductionDate }}
                            </div>
                            <div class="label-item">{{ item.DisplayTime }}</div>
                            <div class="label-item">
                                {{ item.CollectionTimeSpan }}
                            </div>
                            <div class="label-item">
                                {{ item.FWORKSHOPNAME }}
                            </div>
                            <div class="label-item">
                                {{ item.FSHIFTGROUPNAME }}
                            </div>
                        </div>
                        <div class="label-item">{{ item.FRKREALQTY }}</div>
                        <!-- <div class="label-item">{{ item.FRKZT }}</div> -->
                        <div class="label-item">{{ item.PrcentPass }}</div>
                        <div class="label-item">{{ item.FRKZS }}</div>
                        <div class="label-item">{{ item.T1 }}</div>
                        <div class="label-item">{{ item.T2 }}</div>
                        <div class="label-item">{{ item.T3 }}</div>
                        <div class="label-item">{{ item.T4 }}</div>
                        <div class="label-item">{{ item.T5 }}</div>
                        <div class="label-item">{{ item.WindPressure }}</div>
                        <div class="label-item">{{ item.Velocity }}</div>
                        <div class="label-item">{{ item.FrequencyOfFan }}</div>
                        <div class="label-item">
                            {{ item.ExhaustGasTemperature }}
                        </div>
                        <div class="label-item">{{ item.HostElectric }}</div>
                        <div class="label-item">{{ item.DonkeyElectric }}</div>
                        <div class="label-item">
                            {{ item.ElectricTotalLine1 }}
                        </div>
                        <div class="label-item">
                            {{ item.ElectricConsumptionLine1 }}
                        </div>
                        <div class="label-item">{{ item.GasLine1 }}</div>
                        <div class="label-item">
                            {{ item.GasConsumptionLine1 }}
                        </div>
                        <div class="label-item">{{ item.DisplayRunTime }}</div>
                    </div>
                    <div class="table-count">
                        <div class="ski">
                            <div class="count-item">夜班合计</div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                        </div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.ProductionTon }}
                        </div>
                        <!-- <div class="count-item">{{ _.NightShiftTotalData.Quantity }}</div> -->
                        <div class="count-item">
                            {{ _.NightShiftTotalData.PrcentPass }}
                        </div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.ProductionCount }}
                        </div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.HostElectric }}
                        </div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.DonkeyElectric }}
                        </div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.ElectricTotalLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.ElectricConsumptionLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.GasLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.GasConsumptionLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.NightShiftTotalData.RunTime }}
                        </div>
                    </div>
                    <div class="table-count">
                        <div class="ski">
                            <div class="count-item">
                                {{
                                    _.ProductionDayShift.length
                                        ? _.ProductionDayShift[0].FWORKSHOPNAME
                                        : _.ProductionNightShift.length
                                        ? _.ProductionNightShift[0]
                                              .FWORKSHOPNAME
                                        : '--'
                                }}合计
                            </div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                            <div class="count-item"></div>
                        </div>
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.ProductionTon }}
                        </div>
                        <!-- <div class="count-item">{{ _.ProdutionLineTotalData.Quantity }}</div> -->
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.PrcentPass }}
                        </div>
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.ProductionCount }}
                        </div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item"></div>
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.HostElectric }}
                        </div>
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.DonkeyElectric }}
                        </div>
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.ElectricTotalLine1 }}
                        </div>
                        <div class="count-item">
                            {{
                                _.ProdutionLineTotalData
                                    .ElectricConsumptionLine1
                            }}
                        </div>
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.GasLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.GasConsumptionLine1 }}
                        </div>
                        <div class="count-item">
                            {{ _.ProdutionLineTotalData.RunTime }}
                        </div>
                    </div>
                </div>
                <div class="table-label">
                    <div class="ski">
                        <div class="label-item">
                            {{ allCountObj.ProductionDate }}
                        </div>
                        <div class="label-item">
                            {{ allCountObj.DisplayTime }}
                        </div>
                        <div class="label-item">
                            {{ allCountObj.CollectionTimeSpan }}
                        </div>
                        <div class="label-item">
                            {{ allCountObj.FWORKSHOPNAME }}
                        </div>
                        <div class="label-item">
                            {{ allCountObj.FSHIFTGROUPNAME }}
                        </div>
                    </div>
                    <div class="label-item">{{ allCountObj.FRKREALQTY }}</div>
                    <!-- <div class="label-item">{{ allCountObj.FRKZT }}</div> -->
                    <div class="label-item">{{ allCountObj.PrcentPass }}</div>
                    <div class="label-item">{{ allCountObj.FRKZS }}</div>
                    <div class="label-item">{{ allCountObj.T1 }}</div>
                    <div class="label-item">{{ allCountObj.T2 }}</div>
                    <div class="label-item">{{ allCountObj.T3 }}</div>
                    <div class="label-item">{{ allCountObj.T4 }}</div>
                    <div class="label-item">{{ allCountObj.T5 }}</div>
                    <div class="label-item">{{ allCountObj.WindPressure }}</div>
                    <div class="label-item">{{ allCountObj.Velocity }}</div>
                    <div class="label-item">
                        {{ allCountObj.FrequencyOfFan }}
                    </div>
                    <div class="label-item">
                        {{ allCountObj.ExhaustGasTemperature }}
                    </div>
                    <div class="label-item">{{ allCountObj.HostElectric }}</div>
                    <div class="label-item">
                        {{ allCountObj.DonkeyElectric }}
                    </div>
                    <div class="label-item">
                        {{ allCountObj.ElectricTotalLine1 }}
                    </div>
                    <div class="label-item">
                        {{ allCountObj.ElectricConsumptionLine1 }}
                    </div>
                    <div class="label-item">{{ allCountObj.GasLine1 }}</div>
                    <div class="label-item">
                        {{ allCountObj.GasConsumptionLine1 }}
                    </div>
                    <div class="label-item">
                        {{ allCountObj.DisplayRunTime }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tip" ref="kongtiao3" v-if="tipchange1">
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{ w }}</div>
                <div class="tipdetermine" @click="tip2">
                    {{ lang.MessageBox_Confrim }}
                </div>
            </div>
        </div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
export default {
    name: 'DailyProductionReport',
    data() {
        return {
            jurisdiction: [],
            buttonarr: [],
            cxid: '',
            dcid: '',
            cxshow: true,
            dcshow: true,

            tipchange1: false,
            tip: 'noData',
            w: '',
            gth: require('../../assets/images/gth.png'),
            value1: '',
            value2: '',
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            tabledata: [],
            exportDataList: [],
            allCountObj: {}
        };
    },

    mounted() {
        let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        let today = new Date();
        this.value1 =
            yesterday.getFullYear() +
            '-' +
            (yesterday.getMonth() + 1) +
            '-' +
            (yesterday.getDate() > 10
                ? yesterday.getDate()
                : '0' + yesterday.getDate());
        this.value2 =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            (today.getDate() > 10 ? today.getDate() : '0' + today.getDate());
        this.Search();
    },
    watch: {},
    methods: {
        countFn(arr, key) {
            return arr.reduce((sum, w) => {
                return w[key] + sum;
            }, 0);
        },
        Search() {
            this.$axios({
                url: `/api/ProductionDayReport/Query?st=${this.value1}&et=${this.value2}`,
                method: 'get'
            }).then(res => {
                console.log(res.data);
                let list = res.data.data;
                this.tabledata = list;
                let alltime = this.tabledata.reduce((sum, w) => {
                    return Number(w.ProdutionLineTotalData.RunTimeSecord) + sum;
                }, 0);
                let FRKREALQTY = this.tabledata
                    .reduce((sum, w) => {
                        return w.ProdutionLineTotalData.ProductionTon + sum;
                    }, 0)
                    .toFixed(2);
                let FHGRKZS = this.tabledata.reduce((sum, w) => {
                    return w.ProdutionLineTotalData.FHGRKZS + sum;
                }, 0);
                let ProductionCount = this.tabledata.reduce((sum, w) => {
                    return w.ProdutionLineTotalData.ProductionCount + sum;
                }, 0);
                this.allCountObj = {
                    ProductionDate: '全产线合计',
                    DisplayTime: '',
                    CollectionTimeSpan: '',
                    FWORKSHOPNAME: '',
                    FSHIFTGROUPNAME: '',
                    FRKREALQTY: FRKREALQTY,
                    FRKZT: '',
                    PrcentPass:
                        ProductionCount >= 0
                            ? ((FHGRKZS / ProductionCount) * 100).toFixed(2) +
                              '%'
                            : '0.00',
                    FRKZS: this.tabledata
                        .reduce((sum, w) => {
                            return (
                                w.ProdutionLineTotalData.ProductionCount + sum
                            );
                        }, 0)
                        .toFixed(2),
                    T1: '',
                    T2: '',
                    T3: '',
                    T4: '',
                    T5: '',
                    WindPressure: '',
                    Velocity: '',
                    FrequencyOfFan: '',
                    ExhaustGasTemperature: '',
                    HostElectric: this.tabledata
                        .reduce((sum, w) => {
                            return w.ProdutionLineTotalData.HostElectric + sum;
                        }, 0)
                        .toFixed(2),
                    DonkeyElectric: this.tabledata
                        .reduce((sum, w) => {
                            return (
                                w.ProdutionLineTotalData.DonkeyElectric + sum
                            );
                        }, 0)
                        .toFixed(2),
                    ElectricTotalLine1: this.tabledata
                        .reduce((sum, w) => {
                            return (
                                w.ProdutionLineTotalData.ElectricTotalLine1 +
                                sum
                            );
                        }, 0)
                        .toFixed(2),
                    ElectricConsumptionLine1:
                        Math.floor(
                            (this.tabledata.reduce((sum, w) => {
                                return (
                                    w.ProdutionLineTotalData
                                        .ElectricTotalLine1 + sum
                                );
                            }, 0) /
                                FRKREALQTY) *
                                100
                        ) / 100,
                    GasLine1: this.tabledata
                        .reduce((sum, w) => {
                            return w.ProdutionLineTotalData.GasLine1 + sum;
                        }, 0)
                        .toFixed(2),
                    GasConsumptionLine1:
                        Math.floor(
                            (this.tabledata.reduce((sum, w) => {
                                return w.ProdutionLineTotalData.GasLine1 + sum;
                            }, 0) /
                                FRKREALQTY) *
                                100
                        ) / 100,
                    DisplayRunTime: this.formatSeconds(alltime)
                };
            });
        },
        formatSeconds(value) {
            var secondTime = parseInt(value); // 秒
            var minuteTime = 0; // 分
            var hourTime = 0; // 小时
            var dayTime = 0; // 天
            var result = '';
            if (value < 60) {
                result = secondTime + '秒';
            } else {
                if (secondTime >= 60) {
                    // 如果秒数大于60，将秒数转换成整数
                    // 获取分钟，除以60取整数，得到整数分钟
                    minuteTime = parseInt(secondTime / 60);
                    // 获取秒数，秒数取佘，得到整数秒数
                    secondTime = parseInt(secondTime % 60);
                    // 如果分钟大于60，将分钟转换成小时
                    if (minuteTime >= 60) {
                        // 获取小时，获取分钟除以60，得到整数小时
                        hourTime = parseInt(minuteTime / 60);
                        // 获取小时后取佘的分，获取分钟除以60取佘的分
                        minuteTime = parseInt(minuteTime % 60);
                        if (hourTime >= 24) {
                            // 获取天数， 获取小时除以24，得到整数天
                            dayTime = parseInt(hourTime / 24);
                            // 获取小时后取余小时，获取分钟除以24取余的分；
                            hourTime = parseInt(hourTime % 24);
                        }
                    }
                }
                if (secondTime > 0) {
                    secondTime =
                        parseInt(secondTime) >= 10
                            ? secondTime
                            : '0' + secondTime;
                    result = '' + secondTime + '秒';
                }
                if (minuteTime > 0) {
                    minuteTime =
                        parseInt(minuteTime) >= 10
                            ? minuteTime
                            : '0' + minuteTime;
                    result = '' + minuteTime + '分' + result;
                }
                if (hourTime > 0) {
                    result = '' + parseInt(hourTime) + '小时' + result;
                }
                if (dayTime > 0) {
                    result = '' + parseInt(dayTime) + '天' + result;
                }
            }
            return result;
        },
        beforeExporData() {
            let temp = [];
            this.tabledata.map(item => {
                temp = temp.concat(item.ProductionDayShift);
                temp.push({
                    ProductionDate: '日班合计',
                    DisplayTime: '',
                    CollectionTimeSpan: '',
                    FWORKSHOPNAME: '',
                    FSHIFTGROUPNAME: '',
                    FRKREALQTY: item.DayShiftTotalData.ProductionTon,
                    FRKZT: '',
                    PrcentPass: '',
                    FRKZS: item.DayShiftTotalData.ProductionCount,
                    T1: '',
                    T2: '',
                    T3: '',
                    T4: '',
                    T5: '',
                    WindPressure: '',
                    Velocity: '',
                    FrequencyOfFan: '',
                    ExhaustGasTemperature: '',
                    HostElectric: item.DayShiftTotalData.HostElectric,
                    DonkeyElectric: item.DayShiftTotalData.DonkeyElectric,
                    ElectricTotalLine1:
                        item.DayShiftTotalData.ElectricTotalLine1,
                    ElectricConsumptionLine1:
                        item.DayShiftTotalData.ElectricConsumptionLine1,
                    GasLine1: item.DayShiftTotalData.GasLine1,
                    GasConsumptionLine1:
                        item.DayShiftTotalData.GasConsumptionLine1,
                    DisplayRunTime: item.DayShiftTotalData.RunTime
                });
                temp = temp.concat(item.ProductionNightShift);
                temp.push({
                    ProductionDate: '夜班合计',
                    DisplayTime: '',
                    CollectionTimeSpan: '',
                    FWORKSHOPNAME: '',
                    FSHIFTGROUPNAME: '',
                    FRKREALQTY: item.NightShiftTotalData.ProductionTon,
                    FRKZT: '',
                    PrcentPass: '',
                    FRKZS: item.NightShiftTotalData.ProductionCount,
                    T1: '',
                    T2: '',
                    T3: '',
                    T4: '',
                    T5: '',
                    WindPressure: '',
                    Velocity: '',
                    FrequencyOfFan: '',
                    ExhaustGasTemperature: '',
                    HostElectric: item.NightShiftTotalData.HostElectric,
                    DonkeyElectric: item.NightShiftTotalData.DonkeyElectric,
                    ElectricTotalLine1:
                        item.NightShiftTotalData.ElectricTotalLine1,
                    ElectricConsumptionLine1:
                        item.NightShiftTotalData.ElectricConsumptionLine1,
                    GasLine1: item.NightShiftTotalData.GasLine1,
                    GasConsumptionLine1:
                        item.NightShiftTotalData.GasConsumptionLine1,
                    DisplayRunTime: item.NightShiftTotalData.RunTime
                });
                temp.push({
                    ProductionDate: item.ProductionDayShift.length
                        ? item.ProductionDayShift[0].FWORKSHOPNAME + '合计'
                        : item.ProductionNightShift.length
                        ? item.ProductionNightShift[0].FWORKSHOPNAME + '合计'
                        : '--合计',
                    DisplayTime: '',
                    CollectionTimeSpan: '',
                    FWORKSHOPNAME: '',
                    FSHIFTGROUPNAME: '',
                    FRKREALQTY: item.ProdutionLineTotalData.ProductionTon,
                    FRKZT: '',
                    PrcentPass: '',
                    FRKZS: item.ProdutionLineTotalData.ProductionCount,
                    T1: '',
                    T2: '',
                    T3: '',
                    T4: '',
                    T5: '',
                    WindPressure: '',
                    Velocity: '',
                    FrequencyOfFan: '',
                    ExhaustGasTemperature: '',
                    HostElectric: item.ProdutionLineTotalData.HostElectric,
                    DonkeyElectric: item.ProdutionLineTotalData.DonkeyElectric,
                    ElectricTotalLine1:
                        item.ProdutionLineTotalData.ElectricTotalLine1,
                    ElectricConsumptionLine1:
                        item.ProdutionLineTotalData.ElectricConsumptionLine1,
                    GasLine1: item.ProdutionLineTotalData.GasLine1,
                    GasConsumptionLine1:
                        item.ProdutionLineTotalData.GasConsumptionLine1,
                    DisplayRunTime: item.ProdutionLineTotalData.RunTime
                });
            });
            temp.push(this.allCountObj);
            this.exportDataList = temp;
        },
        exporData() {
            this.beforeExporData();
            const tHeader = [
                '生产日期',
                '采集时间段',
                '统计时间点',
                '机组',
                '班组',
                '生产吨',
                // '一次合格吨',
                '一次合格率',
                '生产支',
                '一区温度',
                '二区温度',
                '三区温度',
                '四区温度',
                '五区温度',
                '风压',
                '速度',
                '风机频率',
                '排烟温度',
                '主机耗电量',
                '副机耗电量',
                '1线耗电合计',
                '1线耗电等工耗',
                '1线耗气量',
                '1线耗气等工耗',
                '开机时长'
            ];
            const filterVal = [
                'ProductionDate',
                'DisplayTime',
                'CollectionTimeSpan',
                'FWORKSHOPNAME',
                'FSHIFTGROUPNAME',
                'FRKREALQTY',
                // 'FRKZT',
                'PrcentPass',
                'FRKZS',
                'T1',
                'T2',
                'T3',
                'T4',
                'T5',
                'WindPressure',
                'Velocity',
                'FrequencyOfFan',
                'ExhaustGasTemperature',
                'HostElectric',
                'DonkeyElectric',
                'ElectricTotalLine1',
                'ElectricConsumptionLine1',
                'GasLine1',
                'GasConsumptionLine1',
                'DisplayRunTime'
            ];
            const excelDatas = [
                {
                    tHeader: tHeader,
                    filterVal: filterVal,
                    tableDatas: this.exportDataList,
                    sheetName: 'sheet1'
                },
                {
                    tHeader: tHeader,
                    filterVal: filterVal,
                    tableDatas: this.exportDataList,
                    sheetName: 'sheet1'
                }
            ];

            this.json2excel(excelDatas, '生产日报表', true, 'xlsx');
        },

        json2excel(tableJson, filenames, autowidth, bookTypes) {
            var that = this;
            //这个是引用插件
            import('@/vendor/Export2Excel').then(excel => {
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
                    bookType: bookTypes
                });
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        GMTToStr(time) {
            let date = new Date(time);
            let m = date.getMonth() + 1,
                mm = '-' + (m < 10 ? '0' + m : m);
            let d = date.getDate(),
                dd = '-' + (d < 10 ? '0' + d : d);
            let h = date.getHours(),
                hh = h < 10 ? '0' + h : h;
            let i = date.getMinutes(),
                ii = i < 10 ? '0' + i : i;
            let s = date.getSeconds(),
                ss = s < 10 ? '0' + s : s;
            return (
                date.getFullYear() + mm + dd + ' ' + hh + ':' + ii + ':' + ss
            );
        }
    }
};
</script>
<style lang="scss" scoped>
.tabledata-box {
    overflow: auto;
    width: 100%;
    height: calc(100% - 60px);
    position: relative;

    .table-title {
        height: auto;
        width: fit-content;
        display: flex;
        flex-wrap: nowrap;
        position: sticky;
        top: 0;
        z-index: 2;

        .title-item {
            height: 40px;
            width: 160px;
            background-color: #5a6c98;
            color: #fff;
            border: #fff solid 0.5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .table-label {
        height: auto;
        width: fit-content;
        display: flex;
        flex-wrap: nowrap;
        background-color: #fff;

        .label-item {
            height: 40px;
            width: 160px;
            color: #606266;
            border: #d5d5d5 solid 0.5px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
        }
    }

    .table-label:nth-child(2n + 1) .label-item {
        background-color: #d4defb;
    }

    .ski {
        height: auto;
        width: 800px;
        display: flex;
        flex-wrap: nowrap;
        position: sticky;
        left: 0;
    }

    .table-count {
        height: auto;
        width: fit-content;
        display: flex;
        flex-wrap: nowrap;
        background-color: #bac1d8;

        .count-item {
            height: 40px;
            width: 160px;
            color: #000;
            border: #d5d5d5 solid 0.5px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #bac1d8;
        }
    }
}

.sum {
    margin-top: 5px;
    color: #9d9d9d;
}

.fll {
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

.tapwater {
    position: fixed;
    top: 100px;
    height: calc(100% - 130px);
    padding: 20px;
    width: 100%;
    background-color: #eeeeee;

    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
        overflow: hidden;
    }

    .table {
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
    .export {
        display: inline-block;
        text-align: center;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }

    .query {
        background-color: #ffffff;
        border: 2px solid #4270e4;
        color: #4270e4;
        margin-right: 20px;
    }

    .export {
        color: #fd9e00;
        background-color: #ffffff;
        border: 2px solid #fd9e00;
        margin-right: 10px;
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

.tabledata {
    padding: 10px;
    width: calc(100% - 20px);
}

select {
    text-indent: 0.5em;
}

.query:hover {
    cursor: pointer;
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

    .tipword {
        width: 100%;
        padding: 30px;
        // text-align: center;
        padding-bottom: 0;
    }

    .w {
        width: 100%;
        margin-top: 40px;
        overflow-y: auto;
        text-align: center;
    }

    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        margin-top: 40px;
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
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }

        .two {
            cursor: pointer;
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
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}

.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}

input,
textarea,
select,
a:focus {
    outline: none;
}

.headtable {
    color: #000000;
    font-size: 16pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
}

.headtable_td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    border: 0.5pt solid #000000;
}

.headtable_ba {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    border: 0.5pt solid #000000;
    background: #f2f2f2;
}

.headtableinput {
    border: none;
    background-color: #f2f2f2;
    height: 30px;
    width: 50px;
}

.middletablefirst {
    color: #000000;
    font-size: 10pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    border: 0.5pt solid #000000;
}

.middletablesecond {
    color: #000000;
    font-size: 9pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    border: 0.5pt solid #000000;
    background: #f2f2f2;
}

#table2 td {
    color: #000000;
    font-size: 9pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
}

#rule span {
    font-size: 8pt;
}

#table3 td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    width: 100px;
}

#table4 td {
    color: #000000;
    font-size: 12pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    text-align: left;
    vertical-align: middle;
    width: 100px;
    height: 50px;
}

#tabledata {
    font-size: 14pt;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
    text-align: center;
}

#tabledata th {
    background-color: #dcf0f9 !important;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

.W1 {
    margin-left: 10px;
}

#tabledata td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

#subtabledata {
    font-size: 14pt;
    color: #333333;
    border-width: 1px;
    border-color: #000;
    border-style: solid;
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
}

#subtabledata th {
    //  background:#dcf0f9 url('cell-blue.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

#subtabledata td {
    //  background:#ffffff url('cell-grey.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    text-align: center;
}

#tabletemple {
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}

#tabletemple th {
    //  background:#dcf0f9 url('cell-blue.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
}

#tabletemple td {
    //  background:#ffffff url('cell-grey.jpg');
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
}

.colordiv {
    background-color: #d9dbde;
}

table {
}

td {
    white-space: nowrap !important;
    overflow: auto !important;
}

#main,
#main1,
#main3 {
    transform-origin: 0%;
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    margin: auto;
}
</style>
