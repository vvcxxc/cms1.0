<!--
 * @Description: 左侧导航栏
 * @Date: 2019-11-23 11:50:53
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 19:01:37
 -->
<template>
    <div
        class="left-container"
        :class="{ colordiv: $store.state.color == 'grey' }"
    >
        <div
            class="nav"
            :class="{ active: activeIndex == index }"
            v-for="(item, index) in nav"
            :key="index"
            :style="{
                fontSize: 16 * zoom + 'px',
                paddingTop:
                    zoom < 1 ? languages + 'px' : languages * zoom + 'px',
                paddingBottom:
                    zoom < 1 ? languages + 'px' : languages * zoom + 'px'
            }"
            @click="tabActive(index)"
        >
            <div class="border"></div>
            {{ item.name }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            color: '',
            width: '',
            navList: {
                AlarmRecord: [
                    {
                        name: '实时报警'
                    },
                    {
                        name: '历史报警'
                    },
                    {
                        name: '报警点管理'
                    }
                ],
                AlarmRecord1: [
                    {
                        name: '实时报警'
                    },
                    {
                        name: '历史报警'
                    },
                    {
                        name: '报警点管理'
                    }
                ],
                EquipmentAccount: [
                    {
                        name: '设备台账'
                    },
                    {
                        name: '基本设置'
                    },
                    {
                        name: '操作记录'
                    }
                ],
                SparePartsManage: [
                    {
                        name: '备件台账'
                    },
                    {
                        name: '基本设置'
                    },
                    {
                        name: '操作记录'
                    }
                ],
                Journal: [
                    {
                        name: '用户登录记录'
                    },
                    {
                        name: '用户操作记录'
                    }
                ],
                PointInspectionManage: [
                    {
                        name: '待办点巡检'
                    },
                    {
                        name: '点巡检计划'
                    },
                    {
                        name: '点巡检标准'
                    },
                    {
                        name: '点巡检记录'
                    }
                ],
                DevicePointInspectionManage: [
                    { name: '待办设备点巡检' },
                    { name: '设备点巡检计划' },
                    { name: '设备点巡检标准' },
                    { name: '设备点巡检记录' }
                ],
                QualityPointInspectionManage: [
                    { name: '待办品质点巡检' },
                    { name: '品质点巡检计划' },
                    { name: '品质点巡检标准' },
                    { name: '品质点巡检记录' }
                ],
                MaintenanceManage: [
                    {
                        name: '待办保养'
                    },
                    {
                        name: '保养计划'
                    },
                    {
                        name: '保养记录'
                    }
                ],
                RepairManage: [
                    {
                        name: '待办维修'
                    },
                    {
                        name: '维修计划'
                    },
                    {
                        name: '维修记录'
                    }
                ],
                FileManage: [
                    {
                        name: 'SOP管理'
                    },
                    {
                        name: '设备资料'
                    }
                ],
                VulnerablePartManage: [
                    {
                        name: '易损件台账'
                    },
                    {
                        name: '操作记录'
                    }
                ],
                MsgPush: [
                    {
                        name: '报警消息'
                    },
                    {
                        name: '代办消息'
                    },
                    {
                        name: '推送日志'
                    }
                ],
                OrderManagement: [
                    {
                        name: '工单管理'
                    },
                    {
                        name: '工单记录'
                    }
                ],
                TimeAnalysis: [
                    {
                        name: '产线节拍趋势'
                    },
                    {
                        name: '工序节拍趋势'
                    }
                ],
                UnqualifiedManagement: [
                    {
                        name: '待办不合格品'
                    },
                    {
                        name: '产品判定记录'
                    }
                ]
            },
            nav: [],
            zoom: 1,
            activeIndex: 0,
            languages: 20
        };
    },
    created() {
        this.getLangData();
        let path = this.$route.path.substr(1);
        this.nav = this.navList[path];
    },
    mounted() {
        this.width = window.screen.width;
        this.color = this.$store.state.color;
        this.zoom =
            window.screen.width / 1920 > 1 ? window.screen.width / 1920 : 1;
    },
    methods: {
        getLangData() {
            let languages = JSON.parse(localStorage.getItem('languages'));
            let currentLang = localStorage.getItem('currentLang');

            if (currentLang == 'Main_Language_ZH') {
                this.languages = 20;
            } else {
                if (this.zoom <= 1) {
                    this.languages = 35;
                } else {
                    this.languages = 45;
                }
            }
            this.navList.AlarmRecord = [
                {
                    name: languages[currentLang].AlarmRecord_Time
                },
                {
                    name: languages[currentLang].AlarmRecord_History
                },
                {
                    name:
                        languages[currentLang]
                            .AlarmRecord_HT_AlarmPointManageUC_AlarmPointManagement
                }
            ];
            this.navList.AlarmRecord1 = [
                {
                    name: languages[currentLang].AlarmRecord_Time
                },
                {
                    name: languages[currentLang].AlarmRecord_History
                },
                {
                    name:
                        languages[currentLang]
                            .AlarmRecord_HT_AlarmPointManageUC_AlarmPointManagement
                }
            ];
            this.navList.EquipmentAccount = [
                {
                    name:
                        languages[currentLang].EquipmentAccount_EquipmentAccount
                },
                {
                    name: languages[currentLang].EquipmentAccount_BasicSettings
                },
                {
                    name:
                        languages[currentLang].EquipmentAccount_OperationRecord
                }
            ];
            this.navList.FileManage = [
                {
                    name: languages[currentLang].FileManage_SOPManage
                },
                {
                    name: languages[currentLang].FileManage_EquipmentData
                }
            ];
            this.navList.SparePartsManage = [
                {
                    name:
                        languages[currentLang]
                            .SparePartsManage_SparePartsAccount
                },
                {
                    name: languages[currentLang].EquipmentAccount_BasicSettings
                },
                {
                    name:
                        languages[currentLang].EquipmentAccount_OperationRecord
                }
            ];
            this.navList.Journal = [
                {
                    name: languages[currentLang].LogManage_LoginRecord
                },
                {
                    name: languages[currentLang].LogManage_OperationRecord
                }
            ];
            this.navList.PointInspectionManage = [
                {
                    name:
                        languages[currentLang]
                            .PointInspectionManage_ToDoInspection
                },
                {
                    name:
                        languages[currentLang]
                            .PointInspectionManage_PointInspectionPlan
                },
                {
                    name:
                        languages[currentLang]
                            .PointInspectionManage_PointInspectionStandard
                },
                {
                    name:
                        languages[currentLang]
                            .PointInspectionManage_PointInspectionRecord
                }
            ];
            this.navList.DevicePointInspectionManage = [
                { name: $$t('待办设备点巡检') },
                { name: $$t('设备点巡检计划') },
                { name: $$t('设备点巡检标准') },
                { name: $$t('设备点巡检记录') }
            ];
            this.navList.QualityPointInspectionManage = [
                { name: $$t('待办品质点巡检') },
                { name: $$t('品质点巡检计划') },
                { name: $$t('品质点巡检标准') },
                { name: $$t('品质点巡检记录') }
            ];
            this.navList.MaintenanceManage = [
                {
                    name:
                        languages[currentLang].MaintenanceManage_ToDoMaintenance
                },
                {
                    name:
                        languages[currentLang].MaintenanceManage_MaintenancePlan
                },
                {
                    name:
                        languages[currentLang]
                            .MaintenanceManage_MaintenanceRecord
                }
            ];
            this.navList.RepairManage = [
                {
                    name: languages[currentLang].RepairManage_ToDoRepair
                },
                {
                    name: languages[currentLang].RepairManage_RepairPlan
                },
                {
                    name: languages[currentLang].RepairManage_RepairRecord
                }
            ];
            this.navList.VulnerablePartManage = [
                {
                    name:
                        languages[currentLang]
                            .VulnerablePartManage_VulnerablePartsAccount
                },
                {
                    name:
                        languages[currentLang].EquipmentAccount_OperationRecord
                }
            ];
            this.navList.MsgPush = [
                {
                    name: languages[currentLang].MsgPush_Alarm
                },
                {
                    name: languages[currentLang].PushMessage_ToDoMessage
                },
                {
                    name: languages[currentLang].PushMessage_PushLog
                }
            ];
        },
        tabActive(index) {
            this.$emit('tabComponent', index);
            this.activeIndex = index;
        }
    }
};
</script>

<style lang="scss" scoped>
.left-container {
    width: 100%;
    box-sizing: border-box;
    min-width: 100px;
    .nav {
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        padding-left: 15px;
        opacity: 0.5;
        &.active {
            background-color: #fff;
            opacity: 1;
            color: #4270e4;
            font-weight: 600;
            .border {
                position: absolute;
                left: -5px;
                width: 5px;
                height: 100%;
                background-color: #4270e4;
            }
        }
    }
}
.colordiv {
    background-color: #d9dbde;
}
</style>
