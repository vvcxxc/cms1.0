/*
 * @Description: 路由文件
 * @Date: 2019-11-23 11:40:44
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-11 14:07:06

 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
const Index = () =>
    import('@/pages/Index.vue');

const EquipmentOverview = () =>
    import('@/views/overview/equipmentOverview.vue');
const CustomerVue = () =>
    import('@/views/customer/customer.vue');

const cuAll = () =>
    import('@/views/customer/cuAll.vue');

const TendencyVue = () =>
    import('@/views/tendency/tendency.vue');
const tapwater = () =>
    import('@/views/tapwater/tapwater.vue');
const steam = () =>
    import('@/views/tapwater/steam.vue');
const powerdistribution = () =>
    import('@/views/powerdistribution/powerdistribution.vue');
const powerhistory = () =>
    import('@/views/powerdistribution/powerhistory.vue');

const Monitorsurface = () =>
    import('@/views/Monitor/Monitorsurface.vue');
const Monitordiagram = () =>
    import('@/views/Monitor/Monitordiagram.vue');

const Alarm = () =>
    import('@/views/alarm/alarm.vue');
const Alarm1 = () =>
    import('@/views/antheralarm/alarm.vue');
const Spotinspection = () =>
    import('@/views/Spotinspection/Spotinspection.vue');
const maintain = () =>
    import('@/views/maintain/maintain.vue');
const Repair = () =>
    import('@/views/Repair/Repair.vue');
const quality = () =>
    import('@/views/quality/quality.vue');
const cpk = () =>
    import('@/views/cpk/cpk.vue');
const history = () =>
    import('@/views/history/history.vue');
const table = () =>
    import('@/views/table/table.vue');
const File = () =>
    import('@/views/File/File.vue');
const Vulnerableparts = () =>
    import('@/views/Vulnerableparts/Vulnerableparts.vue');
const AlarmAnalysis = () =>
    import('@/views/alarmAnalysis/alarmAnalysis.vue');
const Equipment = () =>
    import('@/views/equipment/equipment.vue');
const Log = () =>
    import('@/views/log/log.vue');
const User = () =>
    import('@/views/user/user.vue');
const Role = () =>
    import('@/views/role/role.vue');
const Login = () =>
    import('../pages/Login.vue');
const SteamMeterRecord = () =>
    import('@/views/record/steamMeterRecord.vue');
const SteamMeterAnalysis = () =>
    import('@/views/record/steamMeterAnalysis.vue');
const WaterAnalysis = () =>
    import('@/views/record/waterAnalysis.vue');
const WaterRecord = () =>
    import('@/views/record/waterRecord.vue');
const Reportform = () =>
    import('@/views/parameter/component/configuration.vue');
const Reportform1 = () =>
    import('@/views/parameter/component/statement.vue');
const sparepart = () =>
    import('@/views/sparepart/sparepart.vue');
const formula = () =>
    import(`@/views/formula/formula.vue`);
const scheduleMange = () =>
    import(`@/views/scheduleManage/scheduleMange2.vue`)
const FormManage = () =>
    import(`@/views/FormManage/FormManage.vue`)
const MainPage = () =>
    import('@/views/MainPage/MainPage.vue');
const TemperatureMonitoring = () =>
    import('@/views/temperatureMonitoring/temperatureMonitoring.vue');
const ProcessParameterReport = () =>
    import('@/views/ProcessParameterReport/ProcessParameterReport.vue');
const ProcessParameterReportGroup = () =>
    import('@/views/ProcessParameterReportGroup/ProcessParameterReportGroup.vue');
const RealTimeKilnParametersStatisticalMoudle = () =>
    import('@/views/ProcessParameterReport/RealTimeKilnParametersStatisticalMoudle.vue');
const KilnParametersStatistical = () =>
    import('@/views/ProcessParameterReportGroup/KilnParametersStatistical.vue');
const WorkshopRollerKilnReport = () =>
    import('@/views/WorkshopRollerKilnReport/WorkshopRollerKilnReport.vue');
const ProductionRealTimeReport = () =>
    import('@/views/ProductionRealTimeReport/ProductionRealTimeReport.vue');
const RealTimeKilnTemperatureStatisticalModelUserControl = () =>
    import('@/views/ProductionRealTimeReport/RealTimeKilnTemperatureStatisticalModelUserControl.vue');
const KilnTemperatureStatistical = () =>
    import('@/views/WorkshopRollerKilnReport/KilnTemperatureStatistical.vue');
const WeightOfInjectionMachine = () =>
    import('@/views/weightOfInjectionMachine/weightOfInjectionMachine.vue');
const weightStatisticsReport = () =>
    import('@/views/weightStatisticsReport/weightStatisticsReport.vue');
const oxygenContentReport = () =>
    import('@/views/oxygenContentReport/oxygenContentReport.vue');
const saggerDamageInquiry = () =>
    import('@/views/saggerDamageInquiry/saggerDamageInquiry.vue');
const SaggerDamageStatistics = () =>
    import('@/views/SaggerDamageStatistics/SaggerDamageStatistics.vue');
const InstrumentMonitoring = () =>
    import('@/views/instrumentMonitoring/instrumentMonitoring.vue');
const KilnOperation = () =>
    import('@/views/kilnOperation/kilnOperation.vue');
const TransmissionSetting = () =>
    import('@/views/transmissionSetting/transmissionSetting.vue');
const OutputStatisticsReport = () =>
    import('@/views/outputStatisticsReport/outputStatisticsReport.vue');
const ProcessParametersKilnReport = () =>
    import('@/views/processParametersKilnReport/processParametersKilnReport.vue')
const DailyConsumptionReport = () =>
    import('@/views/dailyConsumptionReport/dailyConsumptionReport.vue');
const MonthlyConsumptionReport = () =>
    import('@/views/monthlyConsumptionReport/monthlyConsumptionReport.vue');
const DailyKilnFailureAnalysisReport = () =>
    import('@/views/dailyKilnFailureAnalysisReport/dailyKilnFailureAnalysisReport.vue');
const MonthlyKilnFailureAnalysisReport = () =>
    import('@/views/monthlyKilnFailureAnalysisReport/monthlyKilnFailureAnalysisReport.vue');
const shiftManagement = () =>
    import(`@/views/FlightManagement/FlightManagement.vue`)

const workshopFault = () =>
    import(`@/views/workshopFault/index.vue`)
const workshopRecord = () =>
    import(`@/views/workshopRecord/index.vue`)
// const Customreport = () =>
//     import(`@/views/Customreport/Customreport.vue`);




Vue.use(VueRouter);
const routes = [{
    path: '/',
    redirect: '/onePath'
},
{
    path: '/login',
    component: Login
},


{
    path: '/home',
    component: Index,
    children: [{
        path: '/overview',
        component: EquipmentOverview
    },
    {
        path: '/FormManage',
        component: FormManage
    },
    {
        path: '/cpk',
        component: cpk
    },
    {
        path: '/history',
        component: history
    },
    {
        path: '/table',
        component: table
    },
    {
        path: '/NewTrendChart',
        component: TendencyVue
    },
    {
        path: '/跳转画面',
        component: CustomerVue
    },
    {
        path: '/温度监测',
        component: CustomerVue
    },
    {
        path: '/全厂管网图',
        component: CustomerVue
    },
    {
        path: '/监控主画面',
        component: CustomerVue
    },
    {
        path: '/AlarmAnalysis',
        component: AlarmAnalysis
    },
    {
        path: '/AlarmRecord',
        component: Alarm1
    },
    {
        path: '/AlarmRecord1',
        component: Alarm
    },
    {
        path: '/MainPage',
        component: MainPage
    },
    {
        path: '/PointInspectionManage',
        component: Spotinspection
    },
    {
        path: '/MaintenanceManage',
        component: maintain
    },
    {
        path: '/RepairManage',
        component: Repair
    },
    {
        path: '/QualityMain',
        component: quality
    },

    {
        path: '/FileManage',
        component: File
    },

    {
        path: '/VulnerablePartManage',
        component: Vulnerableparts
    },

    {
        path: '/SparePartsManage',
        component: sparepart
    },
    {
        path: '/EquipmentAccount',
        component: Equipment
    },
    {
        path: '/ProcessParaReport',
        component: Reportform
    },
    {
        path: '/ProcessConfigure',
        component: Reportform1
    },
    {
        path: '/Formula',
        component: formula
    },

    {
        path: '/Journal',
        component: Log
    },
    {
        path: '/权限管理',
        redirect: '/user'
    },
    {
        path: '/ReportColumnChart',
        component: Monitordiagram
    },
    {
        path: '/ReportStatistics',
        component: Monitorsurface
    },
    {
        path: '/HistoryReport',
        component: powerhistory
    },
    {
        path: '/TemperatureCurve',
        component: powerdistribution
    },

    {
        path: "/SteamTrendCurve",
        component: steam,
    },
    {
        path: '/TapWaterTrendCurve',
        component: tapwater
    },
    {
        path: '/权限管理',
        redirect: '/user'
    },
    {
        path: '/User',
        component: User
    },
    {
        path: '/Role',
        component: Role
    },
    {
        path: '/TapWaterReportRecord',
        component: WaterRecord
    },
    {
        path: '/SteamReportRecord',
        component: SteamMeterRecord
    },
    {
        path: '/TapWaterMeasureStatistics',
        component: WaterAnalysis
    },
    {
        path: '/SteamMeasureStatistics',
        component: SteamMeterAnalysis
    },
    {
        path: '/ScheduleManage',
        component: scheduleMange
    },
    {
        path: '/TemperatureMonitoring',
        component: TemperatureMonitoring
    },
    {
        path: '/ProcessParameterReport',
        component: ProcessParameterReport
    },
    {
        path: '/RealTimeKilnParametersStatisticalMoudle',
        component: RealTimeKilnParametersStatisticalMoudle
    },
    {
        path: '/KilnParametersStatistical',
        component: KilnParametersStatistical
    },
    {
        path: '/ProcessParamStatisticsReport',
        component: ProcessParameterReportGroup
    },
    {
        path: '/WorkshopRollerKilnReport',
        component: WorkshopRollerKilnReport
    },
    {
        path: '/ProductionRealTimeReport',
        component: ProductionRealTimeReport
    },
    {
        path: '/RealTimeKilnTemperatureStatisticalModelUserControl',
        component: RealTimeKilnTemperatureStatisticalModelUserControl
    },
    {
        path: '/KilnTemperatureStatistical',
        component: KilnTemperatureStatistical
    },
    {
        path: '/FeedMachineWeightQuery',
        component: WeightOfInjectionMachine
    },
    {
        path: '/WeightStatisticsOfFeedingMachine',
        component: weightStatisticsReport
    },
    {
        path: '/KilnContainsOxygen',
        component: oxygenContentReport
    },
    {
        path: '/SaggarDamageQuery',
        component: saggerDamageInquiry
    },
    {
        path: '/SaggerDamageStatistics',
        component: SaggerDamageStatistics
    },
    {
        path: '/InstrumentMonitoring',
        component: InstrumentMonitoring
    },
    {
        path: '/KilnOperation',
        component: KilnOperation
    },
    {
        path: '/ShiftManagement', // 班次管理
        component: shiftManagement
    },
    {
        path: '/TransmissionSetting',
        component: TransmissionSetting
    },
    {
        path: '/OutputStatisticsReport',
        component: OutputStatisticsReport
    },
    {
        path: '/ProcessParametersKilnReport',
        component: ProcessParametersKilnReport
    },
    {
        path: '/DailyConsumptionReport',
        component: DailyConsumptionReport
    },
    {
        path: '/MonthlyConsumptionReport',
        component: MonthlyConsumptionReport
    },
    {
        path: '/DailyKilnFailureAnalysisReport',
        component: DailyKilnFailureAnalysisReport
    },
    {
        path: '/MonthlyKilnFailureAnalysisReport',
        component: MonthlyKilnFailureAnalysisReport
    },
    {
        path: '/WorkshopHandoverFault',
        component: workshopFault
    },
    {
        path: '/WorkshopHandoverRecordModel',
        component: workshopRecord
    },
    // {
    //     path: '/cuAll',
    //     component: cuAll
    // },
    {
        path: '/*',
        component: CustomerVue
    }
    ]
},

];

const router = new VueRouter({
    routes
});

export default router;