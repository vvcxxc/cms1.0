<template>
    <div class="productDelivery">
        <div class="productDelivery-title"> 下料点</div>
        <div class="productDelivery-content">

            <div class="xd-box">
                <div class="xd-label">巷道分配</div>
                <div class="xd-content">
                    <div :class="rengong == 'auto' ? 'xd-item xd-choose' : 'xd-item'" @click="beforechangeRengong('auto')">
                        自动
                    </div>
                    <div :class="rengong == 'manual' ? 'xd-item xd-choose' : 'xd-item'"
                        @click="beforechangeRengong('manual')">
                        人工</div>
                </div>
            </div>

            <div class="productDelivery-box">

                <div class="productDelivery-left">
                    <div class="search-box">
                        <div class="search-area">产品出库</div>
                        <div class="search-item">
                            <div class="search-label">出库类型</div>
                            <div class="search-input">
                                <el-radio-group v-model="xdType" class="ml-4">
                                    <el-radio :label="1" size="large">下线</el-radio>
                                    <el-radio :label="2" size="large">强制下线</el-radio>
                                    <el-radio :label="3" size="large">移库</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="search-item" v-if="xdType == 1">
                            <div class="search-label">巷道类型</div>
                            <div class="search-typeList">
                                <div class="tab-one">
                                    <div :class="roadwayTypeId == item.Id ? 'img-btn choose-btn' : 'img-btn'"
                                        v-for="item in roadwayTypeList" :key="item.Id" @click="changeRoadwayType(item.Id)">
                                        <div class="img-text">{{ item.Name }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="search-item" v-if="xdType == 2">
                            <div class="search-label">巷道名称</div>
                            <div class="search-input long-select">
                                <el-select :popper-append-to-body='false' v-model="roadway1">
                                    <el-option v-for="item in roadwayList" :key="item.Id"
                                        :label="item.Name + item.RoadwayTypeDisplayName" :value="item.Code"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="search-large" v-if="xdType == 3">
                            <div class="search-item">
                                <div class="search-label">移出巷道</div>
                                <div class="search-input yy">
                                    <el-select :popper-append-to-body='false' v-model="roadway2" @change="getMoveInList">
                                        <el-option v-for="item in outRoadwayList" :key="item.Id"
                                            :label="item.Name + item.RoadwayTypeDisplayName" :value="item.Code"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="search-item">
                                <div class="search-label">移入巷道</div>
                                <div class="search-input yy">
                                    <el-select :popper-append-to-body='false' v-model="roadway3">
                                        <el-option v-for="item in inRoadwayList" :key="item.Id"
                                            :label="item.Name + item.RoadwayTypeDisplayName" :value="item.Code"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="greenline-box" v-if="xdType == 2 || xdType == 3">
                            <div class="greenline-btn" @click="leftSumbit">确认</div>
                        </div>
                    </div>

                    <div class="table-box">
                        <div class="table-item">
                            <div class="table-title">
                                <div class="table-key">出库任务</div>
                            </div>
                            <div class="table">
                                <div class="table-title">
                                    <div class="labe1">序号</div>
                                    <div class="labe2">巷道编码</div>
                                    <div class="labe2">巷道名称</div>
                                    <div class="labe2">巷道类型</div>
                                    <div class="labe2">出库类型</div>
                                    <div class="labe3">创建时间</div>
                                    <div class="labe2">操作</div>
                                </div>
                                <div class="table-label" v-for="(item, idx) in tableData">
                                    <div class="labe1">{{ Number(idx) + 1 }}</div>
                                    <div class="labe2">{{ item.RoadwayCode }}</div>
                                    <div class="labe2">{{ item.Roadway }}</div>
                                    <div class="labe2">{{ item.RoadwayType }}</div>
                                    <div class="labe2">{{ item.CreateTypeTypeDisplayName }}</div>
                                    <div class="labe3">{{ item.CreationTime }}</div>
                                    <div class="labe2 blue-text" @click="beforedelRoadWay(item)">
                                        {{ item.CreateType == 2004 ? '' : '删除' }}</div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="productDelivery-right">
                    <div class="search-box s3">
                        <div class="search-area">下料点放行</div>
                        <div class="search-item">
                            <div class="search-label">小车号</div>
                            <div class="right-input">
                                <el-input disabled v-model="carNo1"></el-input>
                            </div>
                        </div>
                        <div class="greenline-box">
                            <div :class="canGo && canGo != '0' ? 'greenline-btn' : 'grey-btn'" @click="release">放行</div>
                        </div>

                    </div>

                    <div class="search-box2">
                        <div class="search-area">入库口巷道分配</div>
                        <div class="search-item">
                            <div class="search-label">小车号</div>
                            <div class="right-input">
                                <el-input disabled v-model="carNo2"></el-input>
                            </div>
                        </div>
                        <div class="search-item">
                            <div class="search-label">入库巷道</div>
                            <div class="right-input">
                                <el-select :popper-append-to-body='false' v-model="Roadway2Id"
                                    :disabled="rengong == 'auto'">
                                    <el-option v-for="item in Roadway2List" :key="item.RoadwayId" :label="item.RoadwayName"
                                        :value="item.RoadwayId"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="greenline-box">
                            <div class="greenline-btn" :class="rengong != 'auto' ? 'greenline-btn' : 'grey-btn'"
                                @click="rightBottomSumbit">确认分配</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="userInfo">
            <div class="userInfo-item">当前用户：{{ SCMSUserName }}</div>
            <div class="userInfo-item">时间：{{ newtime }}</div>
        </div>
        <TipPop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack" />
    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
// import { ElMessage } from 'element-plus'
export default {

    data() {
        return {
            isTipShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            rengong: 'auto',
            xdType: 1,
            roadwayTypeList: [],
            roadwayTypeId: 0,
            roadwayList: [],
            roadway1: '',
            roadway2: '',
            roadway3: '',
            IOVariableKey1: '',
            timer1: 1,
            carNo1: '',
            IOVariableKey2: '',
            timer2: 1,
            carNo2: '',
            tableData: [],
            Roadway2List: [],
            Roadway2Id: '',
            canGo: 1,//0不行1行,
            IOVariableKey3: '',
            timer3: 1,
            timer4: 1,
            scid: '',
            xjid: '',
            qhid: '',
            scshow: true,
            xjshow: true,
            qhshow: true,
            buttonarr: [],
            jurisdiction: [],
            rengongtemptype: '',
            delType: 0,
            delitem: {},
            SCMSUserName: '',
            newtime: '',
            timefoor: 1,
            outRoadwayList: [],
            inRoadwayList: [],
            timer5: 1,
            timer6: 1,
        };
    },
    components: {
        TipPop,
    },
    created() {
        this.timefoor = window.setInterval(() => {
            this.getDate()
        }, 1000);
        if (
            !JSON.parse(sessionStorage.getItem('userInfo1')) ||
            JSON.parse(sessionStorage.getItem('userInfo1')) == null
        ) {
            this.SCMSUserName = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserName;
        } else {
            this.SCMSUserName = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserName;
        }
    },
    mounted() {

        this.$axios({
            url: `/api/OutboundTask/GetCurrentMode`,
            method: 'get',

        }).then((res) => {
            if (res.data.code == 0) {
                this.rengong = res.data.data ? res.data.data.toLowerCase() : 'auto';
            } else {

                this.$message.error(res.data.msg);
            }
        });
        this.$axios({
            url: `/api/RoadwayType/GetALlList`,
            method: 'get',

        }).then((res) => {
            if (res.data.code == 0) {
                this.roadwayTypeList = res.data.data;
                this.roadwayTypeId = res.data.data[0].Id;
            } else {

                this.$message.error(res.data.msg);
            }
        });
        this.$axios({
            url: `/api/Roadway/GetAllList?warehouseAreaId=1`,
            method: 'get',

        }).then((res) => {
            if (res.data.code == 0) {
                this.roadwayList = res.data.data;
            } else {

                this.$message.error(res.data.msg);
            }
        });

        this.$axios({
            method: 'get',
            url: `/api/Station/GetAllList`,
        }).then((res) => {
            if (res.data.code == 0) {
                if (res.data.data.length) {
                    let _obj1 = res.data.data.find(_ => _.Code == '6')
                    if (_obj1) {
                        this.IOVariableKey1 = _obj1.IOVariableKey1;
                        this.getCarCode1();
                        this.IOVariableKey3 = _obj1.IOVariableKey6;
                        this.getDisabledType();
                    }
                }
            } else {

                this.$message.error(res.data.msg);
            }
        });

        this.$axios({
            method: 'get',
            url: `/api/WarehouseArea/GetPagedList?pageIndex=1&pageSize=1`,
        }).then((res) => {
            if (res.data.code == 0) {
                if (res.data.data.DataList && res.data.data.DataList.length) {
                    this.IOVariableKey2 = res.data.data.DataList[0].IOVariableKey1;
                    this.getCarCode2();
                }
            } else {

                this.$message.error(res.data.msg);
            }
        });
        this.getTableData();
        this.refreshList();
        this.btnPowerData();
        this.getMoveOutList();
    },
    beforeRouteLeave(to, from, next) {
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
        clearTimeout(this.timer4);
        clearTimeout(this.timefoor);
        clearTimeout(this.timer5);
        clearTimeout(this.timer6);
        next();
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
        getMoveOutList() {
            clearTimeout(this.timer5);
            this.$axios({
                url: `/api/Roadway/GetMoveOutList`,
                method: 'get',

            }).then((res) => {
                if (res.data.code == 0) {
                    this.outRoadwayList = res.data.data;
                    if (this.roadway2 && !this.outRoadwayList.some(_ => _.Code == this.roadway2)) {
                        this.roadway2 = '';
                        this.inRoadwayList = [];
                        this.roadway3 = '';
                    }
                } else {

                    this.$message.error(res.data.msg);
                }
                this.timer5 = setTimeout(() => this.getMoveOutList(), 1000)
            });
        },
        btnPowerData() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            this.buttonarr.forEach(item => {
                if (item.RightName == "巷道分配") {
                    this.qhid = item.RightID;
                } else if (item.RightName == "确认分配") {
                    this.xjid = item.RightID;
                } else if (item.RightName == "删除") {
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.qhid}`
            })
                .then(res => {
                    this.qhshow = res.data.data;
                })

            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`
            })
                .then(res => {
                    this.scshow = res.data.data;
                })
        },
        getMoveInList() {
            this.roadway3 = "";
            this.inRoadwayList = [];
            this.$axios({
                url: `/api/Roadway/GetMoveInList?fromRoadwayCode=${this.roadway2}`,
                method: 'get',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.inRoadwayList = res.data.data;
                } else {

                    this.$message.error(res.data.msg);
                }
            });
        },
        getDate() {
            var myDate = new Date();
            //获取当前年
            var year = myDate.getFullYear();
            //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month
            //获取当前日
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            // "2019-07-15 10:00:00"
            //获取当前时间
            var now = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se
            this.newtime = now

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
        refreshList() {
            clearTimeout(this.timer4);
            this.$axios({
                method: 'get',
                url: `api/OutboundTask/RefreshList`,
            }).then((res) => {
                if (res.data.code == 0 && res.data.data) {
                    this.getTableData();
                }
                this.timer4 = setTimeout(() => this.refreshList(), 1000)
            });
        },
        getDisabledType() {
            clearTimeout(this.timer3);
            this.$axios({
                method: 'get',
                url: `/api/Polling/GetValue?key=${this.IOVariableKey3}`,
            }).then((res) => {
                if (res.data.code == 0) {
                    this.canGo = res.data.data;
                    this.timer3 = setTimeout(() => this.getDisabledType(), 1000)
                } else {

                    this.$message.error(res.data.msg);
                }
            });
        },
        getTableData() {
            this.$axios({
                method: 'get',
                url: `/api/Mission/GetOutboundList`,
            }).then((res) => {
                if (res.data.code == 0) {
                    this.tableData = res.data.data;
                } else {

                    this.tableData = [];
                    this.$message.error(res.data.msg);
                }
            });
        },
        beforedelRoadWay(item) {
            if (item.CreateType == 2004) {
                return
            }
            if (!this.scshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            this.delitem = item;
            this.tipText = `是否确认删除该${item.CreateTypeTypeDisplayName}任务？`;
            this.isTipShow = true;
            this.noCancel = false;
            this.delType = 2;
        },
        delRoadWay() {
            let item = this.delitem;
            this.$axios({
                url: `/api/OutboundTask/DeleteMission/${item.Id}`,
                method: 'DELETE',
            }).then((res) => {
                if (res.data.code == 0) {

                    this.$message.success('删除成功');
                    this.getTableData();
                } else {

                    this.$message.error(res.data.msg);
                }
            });
        },
        getCarCode1() {
            clearTimeout(this.timer1);
            this.$axios({
                method: 'get',
                url: `/api/Polling/GetValue?key=${this.IOVariableKey1}`,
            }).then((res) => {
                if (res.data.code == 0) {
                    this.carNo1 = res.data.data;
                    this.timer1 = setTimeout(() => this.getCarCode1(), 1000)
                } else {

                    this.$message.error(res.data.msg);
                }
            });
        },
        getCarCode2() {
            clearTimeout(this.timer2);
            if (this.rengong == 'manual') {
                this.$axios({
                    method: 'get',
                    url: `/api/Polling/GetValue?key=${this.IOVariableKey2}`,
                }).then((res) => {
                    if (res.data.code == 0) {
                        if (this.carNo2 != res.data.data) {
                            this.carNo2 = res.data.data;
                            this.$axios({
                                method: 'get',
                                url: `/api/OutboundTask/GetRoadwayList?carNo=${res.data.data}`,
                            }).then((res) => {
                                if (res.data.code == 0) {
                                    this.Roadway2List = res.data.data;
                                    this.Roadway2Id = res.data.data[0].RoadwayId;
                                } else {

                                    this.$message.error(res.data.msg);
                                }
                            });

                        }
                        this.timer2 = setTimeout(() => this.getCarCode2(), 1000)
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            } else {
                this.timer2 = setTimeout(() => this.getCarCode2(), 1000)
            }
        },
        beforechangeRengong(type) {
            if (!this.qhshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            let _obj = {
                auto: '自动',
                manual: '人工'
            }
            this.rengongtemptype = type;
            this.tipText = `当前为${_obj[this.rengong]}模式，是否切换至${_obj[type]}模式？`;
            this.isTipShow = true;
            this.noCancel = false;
            this.delType = 1;
        },
        changeRengong() {
            let type = this.rengongtemptype;
            this.$axios({
                url: `/api/OutboundTask/ToggleMode?mode=${type}`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.rengong = type;
                } else {

                    this.$message.error(res.data.msg);
                }
            });
        },
        release() {
            if (!this.canGo || this.canGo == '0') {
                return;
            }
            this.$axios({
                url: `/api/OutboundTask/Release`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {

                    this.$message.success('放行成功');
                    this.getTableData();
                } else {

                    this.$message.error(res.data.msg);

                }
            });
        },
        changeRoadwayType(_id) {
            this.$axios({
                url: `/api/OutboundTask/Offline?roadwayTypeId=${_id}`,
                method: 'post',
            }).then((res) => {
                if (res.data.code == 0) {
                    this.roadwayTypeId = _id;

                    this.$message.success('创建成功');
                    this.getTableData();
                } else {

                    this.$message.error(res.data.msg);

                }
            });
        },
        rightBottomSumbit() {
            if (this.rengong == 'auto') {
                return
            }
            if (!this.xjshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            let _obj = this.Roadway2List.find(_ => _.RoadwayId == this.Roadway2Id);
            this.$axios({
                url: `/api/OutboundTask/ConfirmRoadway`,
                method: 'post',
                data: {
                    CarNo: this.carNo2,
                    RoadwayCode: _obj.RoadwayCode,
                    RoadwayName: _obj.RoadwayName,
                }
            }).then((res) => {
                if (res.data.code == 0) {

                    this.$message.success('分配成功');
                    this.getTableData();
                } else {

                    this.$message.error(res.data.msg);

                }
            });
        },
        leftSumbit() {
            if (this.xdType == 2) {
                this.$axios({
                    url: `/api/OutboundTask/ForcedOffline?roadwayCode=${this.roadway1}`,
                    method: 'post',
                }).then((res) => {
                    if (res.data.code == 0) {

                        this.$message.success('创建成功');
                        this.getTableData();
                    } else {

                        this.$message.error(res.data.msg);
                    }
                });
            } else if (this.xdType == 3) {
                this.$axios({
                    url: `/api/OutboundTask/Move?fromRoadwayCode=${this.roadway2}&toRoadwayCode=${this.roadway3}`,
                    method: 'post',
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$message.success('创建成功');
                        this.getTableData();
                    } else {

                        this.$message.error(res.data.msg);
                    }
                });
            }

        },
        tipCallBack(str) {
            this.noCancel = true;
            if (str == 'yes') {
                this.isTipShow = false;
                if (this.delType == 1) {
                    this.changeRengong();
                } else if (this.delType == 2) {
                    this.delRoadWay()
                }
                this.delType = 0;
            } else {
                this.isTipShow = false;
            }
        },
    }
};
</script>

<style lang="scss" scoped>
.productDelivery {
    width: 100%;
    height: 100%;
    background: url('../../assets/images/gdz2.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-top: 70px;
    box-sizing: border-box;
    position: relative;

    .userInfo {
        position: absolute;
        left: 15px;
        bottom: 40px;
        width: fit-content;

        .userInfo-item {
            float: left;
            display: flex;
            color: #fff;
            margin-right: 35px;
        }
    }

    .productDelivery-title {
        width: 100%;
        height: 48px;
        background: url('../../assets/images/1057.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-bottom: 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 0px;
        letter-spacing: 16px;
        font-size: 19px;
    }

    .productDelivery-content {
        width: 100%;
        height: calc(100% - 55px);
        padding: 15px 15px 66px;
        box-sizing: border-box;
        position: relative;

        .xd-box {
            width: fit-content;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #fff;
            position: absolute;
            right: 170px;
            top: 0px;

            .xd-label {
                word-break: keep-all;
                margin-right: 17px;
            }

            .xd-content {
                display: flex;
                align-items: center;


                .xd-choose,
                .xd-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 30px;
                    background: linear-gradient(180deg, rgba(94, 204, 238, 0.36) 0%, rgba(9, 84, 138, 0.5) 100%);
                    border: 2px solid rgba(102, 255, 255, 0.3);
                    font-weight: bold;
                    cursor: pointer;
                }

                .xd-choose {
                    background: #66FFFF;
                    color: #000;
                }
            }
        }


        .productDelivery-box {
            width: 100%;
            height: 100%;
            background: url('../../assets/images/1093.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding-top: 80px;

            .productDelivery-left {
                height: 100%;
                flex: 4;
            }

            .productDelivery-right {
                height: 100%;
                flex: 3;
            }

            .search-box,
            .search-box2 {
                width: 100%;
                height: auto;
                padding: 0 50px;
                box-sizing: border-box;
                margin-bottom: 20px;

                .greenline-box {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: center;

                    .greenline-btn {
                        width: 252px;
                        height: 30px;
                        border: 2px solid #2ECAC5;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #2ECAC5;
                        cursor: pointer;
                    }

                    .grey-btn {
                        width: 252px;
                        height: 30px;
                        background: linear-gradient(179deg, #30353E 0%, #454C58 100%);
                        border: 1px solid #707070;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fff;
                        cursor: pointer;
                    }

                }

                .search-area {
                    width: 100%;
                    height: 32px;
                    padding-left: 50px;
                    display: flex;
                    align-items: center;
                    color: #9EECF0;
                    font-size: 14px;
                    position: relative;
                }

                .search-area::before {
                    content: '';
                    width: 17px;
                    height: 17px;
                    background: url('../../assets/images/477.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    position: absolute;
                    top: 50%;
                    left: 25px;
                    transform: translate(0, -50%);
                }

                .search-large {
                    width: 100%;
                    display: flex;
                    align-items: center;

                    .search-item {
                        width: 50%;
                    }
                }

                .search-item {
                    width: 100%;
                    padding-left: 20px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-bottom: 28px;

                    .search-label {
                        width: 70px;
                    }

                    .search-typeList {
                        width: 290px;
                        padding-bottom: 5px;
                        overflow-x: auto;

                        .tab-one {
                            white-space: nowrap;

                            .img-btn,
                            .choose-btn {
                                display: inline-block;
                                width: 92px;
                                height: 32px;
                                background: url('../../assets/images/2btn.png');
                                background-size: 100% 100%;
                                background-repeat: no-repeat;
                                margin-right: 6px;
                                cursor: pointer;

                                .img-text {
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 14px;
                                }
                            }

                            .choose-btn {
                                background: url('../../assets/images/1btn.png');
                                background-size: 100% 100%;
                                background-repeat: no-repeat;
                            }
                        }

                    }

                    .search-typeList::-webkit-scrollbar {
                        height: 8px;
                    }

                    .search-typeList::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                        background: rgba(0, 0, 0, 0.2);
                    }

                    .search-typeList::-webkit-scrollbar-track {
                        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                        border-radius: 0;
                        background: rgba(0, 0, 0, 0.1);

                    }

                    .search-input {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                    }

                    .yy {
                        width: 120px;
                    }

                    .long-select {
                        width: calc(100% - 250px);
                    }

                    .right-input {
                        width: 185px;
                    }

                }
            }

            .s3 {
                margin-bottom: 80px;
            }

            .table-box {
                width: 100%;
                height: 60%;
                padding: 0 0 0 50px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;

                .table-item {
                    height: 100%;
                    flex: 1;
                    background: url('../../assets/images/1059.png');
                    background-size: 322px 125px;
                    background-repeat: no-repeat;
                    color: #fff;
                    font-size: 14px;

                    .table-key {
                        height: 32px;
                        display: flex;
                        align-items: center;
                        padding-left: 80px;
                        color: #9EECF0;
                    }

                    .table {
                        width: 100%;
                        height: 100%;
                        padding-left: 20px;
                        box-sizing: border-box;
                        overflow-y: auto;
                        position: relative;

                        .table-title,
                        .table-label {
                            display: flex;
                            align-items: center;
                            padding-left: 10px;
                            box-sizing: border-box;

                            .labe1 {
                                flex: 2;
                            }

                            .labe2 {
                                flex: 3;
                            }

                            .labe3 {
                                flex: 5;
                            }

                            .blue-text {
                                color: #2ECAC5;
                                cursor: pointer;
                            }
                        }

                        .table-title {
                            background: #1179C8;
                            border: 1px solid rgba(102, 255, 255, 0.3);
                            height: 32px;
                            position: sticky;
                            top: 0;
                        }

                        .table-label {
                            border: 1px solid rgba(102, 255, 255, 0.3);
                            height: 32px;
                            background: #07416B;

                        }


                    }

                }

            }
        }
    }
}
</style>
<style lang="scss" >
.productDelivery {
    .el-input {
        height: 30px;

        .el-input__suffix {
            display: flex;
            align-items: center;
        }

        .el-input__inner {
            //输入框
            background: rgba(115, 115, 115, 0.36);
            border-radius: 3px 3px 3px 3px;
            border: 2px solid rgba(102, 255, 255, 0.3);
            color: #fff;
            font-size: 14px;
        }

        .el-select .el-input .el-select__caret {
            transform-origin: center center;
        }
    }

    .el-select {
        width: 100%;

        .el-input__inner {
            //下拉框
            background: linear-gradient(180deg, rgba(94, 204, 238, 0.36) 0%, rgba(9, 84, 138, 0.5) 100%);
            border-radius: 3px 3px 3px 3px;
            border: 2px solid rgba(102, 255, 255, 0.3);
            color: #fff;
            font-size: 14px;
        }
    }

    .el-radio__input {
        vertical-align: top;
    }

    .el-radio__label {
        color: #fff;
        font-size: 14px;
    }

    .el-radio__inner {
        width: 20px;
        height: 20px;
        border: 1px solid #40B3C4;
        background-color: #07416B;
    }


    .el-radio__input.is-checked .el-radio__inner {
        border-color: #40B3C4;
        background: #07416B;
    }

    .el-radio__input.is-checked+.el-radio__label {
        color: #fff;
    }

    .el-radio__inner::after {
        width: 14px;
        height: 14px;
        background-color: #66FFFF;

    }

    .el-scrollbar {
        background: #031B2B;
        border-radius: 3px 3px 3px 3px;
        border: 2px solid rgba(102, 255, 255, 0.3);
    }

    .el-select-dropdown__item {
        color: #fff;
    }

    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
        background-color: #0C334B;
    }

    .el-select-dropdown__item.selected {
        color: #34F8F7;
    }
}
</style>
