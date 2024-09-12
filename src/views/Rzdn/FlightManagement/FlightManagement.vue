<!-- 班次管理 -->
<template>
    <div class="flight-managment">
        <div class="left">
            <left-nav :navList="navList" @activeNavItem="activeNavItem" :defaultIndex="activeIndex"></left-nav>
        </div>
        <div class="order-content">
            <!-- <order ref="order" v-show="activeIndex == 0"></order>
            <history ref="history" v-show="activeIndex == 1"></history> -->
            <team-config ref="teamConfig" v-show="activeIndex == 0" :jurisdictionObj="jurisdictionObj"></team-config>
            <flight-config ref="flightConfig" v-show="activeIndex == 1" :jurisdictionObj="jurisdictionObj">
            </flight-config>
            <flight-plan ref="flightPlan" v-show="activeIndex == 2" :jurisdictionObj="jurisdictionObj"></flight-plan>
            <flight-record ref="flightRecord" v-show="activeIndex == 3" :jurisdictionObj="jurisdictionObj">
            </flight-record>
        </div>

    </div>

</template>
<script>
import LeftNav from '@/newComponents/Leftnav.vue'
import TeamConfig from './components/TeamConfig.vue'
import FlightRecord from './components/FlightRecord.vue'
import FlightConfig from './components/FlightConfig.vue'
import FlightPlan from './components/FlightPlan.vue'

export default {
    components: {
        LeftNav,
        TeamConfig,
        FlightPlan,
        FlightConfig,
        FlightRecord,
    },
    data() {
        return {
            activeIndex: 0,
            navList: [
                {
                    name: '班组配置'
                },
                {
                    name: '班次配置'
                },
                {
                    name: '班次计划'
                },
                {
                    name: '班次记录'
                }
            ],
            jurisdiction: [],
            buttonarr: [],
            jurisdictionObj: {
                pzxzidshow: false,
                pzbjidshow: false,
                pzscidshow: false,
                cpxzidshow: false,
                cpbjidshow: false,
                cpscidshow: false,
                jhxzidshow: false,
                jhcxidshow: false,
                jhbjidshow: false,
                jhscidshow: false,
                bbcxidshow: false,
                jlcxidshow: false,
                jlscidshow: false,
            },
            pzxzid: '',
            pzbjid: '',
            pzscid: '',
            cpxzid: '',
            cpbjid: '',
            cpscid: '',
            jhxzid: '',
            jhcxid: '',
            jhbjid: '',
            jhscid: '',
            bbcxid: '',
            jlcxid: '',
            jlscid: '',


        }
    },
    methods: {
        activeNavItem(item, index) {
            this.activeIndex = index
            this.$nextTick(() => {
                if (index == 0) {
                    this.$refs.teamConfig.getTeamData()
                } else if (index == 1) {
                    this.$refs.flightConfig.getFlightList()
                } else if (index == 2) {
                    this.$refs.flightPlan.getData()
                } else {
                    this.$refs.flightRecord.getData()
                }

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
        queryJurisdiction(_id) {
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argRightID=${this[_id]}&argUserID=${userid}`
            })
                .then(res => {
                    this.jurisdictionObj[`${_id}show`] = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });

        }
    },
    created() {
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        this.buttonarr.forEach(item => {
            if (item.RightName == '班组配置-新增') {
                this.pzxzid = item.RightID;
                this.queryJurisdiction('pzxzid');
            }
            else if (item.RightName == '班组配置-编辑') {
                this.pzbjid = item.RightID;
                this.queryJurisdiction('pzbjid');
            }
            else if (item.RightName == '班组配置-删除') {
                this.pzscid = item.RightID;
                this.queryJurisdiction('pzscid');
            }
            else if (item.RightName == '班次配置-新增') {
                this.cpxzid = item.RightID;
                this.queryJurisdiction('cpxzid');
            }
            else if (item.RightName == '班次配置-编辑') {
                this.cpbjid = item.RightID;
                this.queryJurisdiction('cpbjid');
            }
            else if (item.RightName == '班次配置-删除') {
                this.cpscid = item.RightID;
                this.queryJurisdiction('cpscid');
            }
            else if (item.RightName == '班次计划-新增') {
                this.jhxzid = item.RightID;
                this.queryJurisdiction('jhxzid');
            }
            else if (item.RightName == '班次计划-查询') {
                this.jhcxid = item.RightID;
                this.queryJurisdiction('jhcxid');
            }
            else if (item.RightName == '班次计划-编辑') {
                this.jhbjid = item.RightID;
                this.queryJurisdiction('jhbjid');
            }
            else if (item.RightName == '班次计划-删除') {
                this.jhscid = item.RightID;
                this.queryJurisdiction('jhscid');
            }
            else if (item.RightName == '班次班次表-查询') {
                this.bbcxid = item.RightID;
                this.queryJurisdiction('bbcxid');
            }
            else if (item.RightName == '班次记录-查询') {
                this.jlcxid = item.RightID;
                this.queryJurisdiction('jlcxid');
            }
            else if (item.RightName == '班次记录-删除') {
                this.jlscid = item.RightID;
                this.queryJurisdiction('jlscid');
            }
        });
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';

.flight-managment {
    margin-top: 90px;
    height: calc(100% - 120px);
    overflow: hidden;
    padding: 20px;
    background: rgba(238, 238, 238);

    .left {
        float: left;
        width: 200px;
        height: 100%;
        background-color: #e9eeef;
    }


    .order-content {
        float: left;
        width: calc(100% - 200px);
        height: 100%;
        background: #fff;
    }

}
</style>