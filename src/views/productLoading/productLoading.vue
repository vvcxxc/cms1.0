<template>
    <div class="productLoading">
        <div class="productLoading-title"> {{ shangliaoItem.Name }} </div>
        <div class="productLoading-content">
            <div class="productLoading-box">
                <div class="search-box">
                    <div class="tempCode">上一次扫码记录：{{ tempCode }}</div>
                    <div class="search-list">
                        <div class="search-item">
                            <div class="search-label">站点</div>
                            <div class="search-input1">
                                <el-select v-model="shangliao" :popper-append-to-body='false'>
                                    <el-option v-for="item in shangliaoList" :label="item.Name"
                                        :value="item.Id"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="search-item">
                            <div class="search-label">小车号</div>
                            <div class="search-input1">
                                <el-input v-model="carNo" disabled></el-input>
                            </div>
                        </div>
                        <div class="search-item">
                            <div class="search-label">上料数量</div>
                            <div class="search-input2">
                                <el-input v-model="count" disabled></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="search-list">
                        <div class="search-item">
                            <div class="search-label">当前产品码</div>
                            <div class="search-input3">
                                <el-input v-model="prodCode" @keyup.enter.native="bindCode"></el-input>
                            </div>
                        </div>
                        <div :class="canGo && canGo != '0' && canGo2 ? 'orange-btn' : 'grey-btn'" @click="Release(1)">
                            空车放行</div>
                        <div :class="canGo && canGo != '0' && canGo3 ? 'green-btn' : 'grey-btn'" @click="Release(2)">放行
                        </div>
                    </div>
                </div>

                <div class="table-box">
                    <div class="table-item" v-for="item in tableList" :key="item.Category">
                        <div class="table-title">
                            <div class="table-key">{{ item.Category }}</div>
                        </div>
                        <div class="table">
                            <div class="table-title">
                                <div class="labe1">序号</div>
                                <div class="labe2">产品码</div>
                                <div class="labe3">操作</div>
                            </div>
                            <div :class="item2.Status == 1 ? 'table-label blue-label' : item2.Status == 3 && !item.SkipGetNextProduct ? 'table-label  yellow-label' : item2.Status == 3 ? 'table-label' : 'table-label green-label'"
                                v-for="(item2, idx2) in item.InboundInfos" :key="item2.Id">
                                <div class="labe1">{{ Number(idx2) + 1 }}</div>
                                <div class="labe2">{{ item2.ProcessBarcode + '_' + item2.SEQ }}</div>
                                <div class="labe3">
                                    <div class="red-btn" v-if="item2.Status == 1"
                                        @click="beforeJump(item2.Id, item.SkipGetNextProduct)">跳过</div>
                                    <div class="grey-btn" v-if="item2.Status == 3" @click="beforeCancleJump(item2.Id)">
                                        取消跳过
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="userInfo">
            <div class="userInfo-item">当前用户：{{ SCMSUserName }}</div>
            <div class="userInfo-item">时间：{{ newtime }}</div>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
    </div>
</template>

<script>

import TipPop from '../../components/public/tipPop.vue';

export default {

    data() {
        return {
            shangliaoList: [],
            shangliao: 1,
            carNo: '',
            prodCode: '',
            isTipShow: false,
            tipText: '',
            noCancel: true,
            tableList: [],
            newtime: '',
            SCMSUserName: '',
            timer1: 1,
            IOVariableKey1: '',
            timer2: 1,
            IOVariableKey2: '',
            canGo: 1,//0不行1行
            searchcarNoTimer: 1,
            tempCode: '',
            scid: '',
            xjid: '',
            xgid: '',
            scshow: true,
            xjshow: true,
            xgshow: true,
            buttonarr: [],
            jurisdiction: [],
            jumpId: '',
            SkipGetNextProduct: true,
            cancleId: '',
            skipType: 0,
            timefoor: 1,
            releaseBool: false,
        };
    },
    components: {
        TipPop
    },
    watch: {
        shangliao(n) {
            if (n) {
                let _obj = this.shangliaoList.find(_ => _.Id == n);
                if (_obj) {
                    this.IOVariableKey1 = _obj.IOVariableKey1;
                    this.IOVariableKey2 = _obj.IOVariableKey2;
                }
                this.getCarNo();
                this.getDisabledType();
            }
        },
        VpowerData(val) {
            this.btnPowerData();
        }
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
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
        shangliaoItem() {
            if (this.shangliaoList.length) {
                return this.shangliaoList.find(_ => _.Id == this.shangliao)
            }
            return {}
        },
        count() {
            return this.tableList.reduce((sum, w) => { return w.InboundInfos.length + sum }, 0)
        },
        canGo2() {
            //空车放行：所有都是1可放行
            let bool = true;
            this.tableList.map((item) => {
                let b = item.InboundInfos.find(_ => _.Status != 1);
                if (b) { bool = false }
            })
            return bool
        },
        canGo3() {
            //放行：所有都不是1可放行
            let bool = true;
            this.tableList.map((item) => {
                let b = item.InboundInfos.find(_ => _.Status == 1);
                if (b) { bool = false }
            })
            return bool
        }
    },
    beforeRouteLeave(to, from, next) {
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.searchcarNoTimer);
        clearTimeout(this.timefoor);
        next();
    },
    mounted() {
        this.$axios({
            method: 'get',
            url: `/api/Station/GetInboundStationList`,
        }).then((res) => {
            if (res.data.code == 0) {
                this.shangliaoList = res.data.data;
                if (res.data.data.length) {
                    this.shangliao = res.data.data[0].Id;
                    this.IOVariableKey1 = res.data.data[0].IOVariableKey1;
                    this.IOVariableKey2 = res.data.data[0].IOVariableKey2;
                    this.getCarNo();
                    this.getDisabledType();
                }
            } else {

                this.$message.error(res.data.msg);
            }
        });
        this.btnPowerData();
    },
    methods: {
        btnPowerData() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            this.buttonarr.forEach(item => {
                if (item.RightName == "空车放行") {
                    this.xjid = item.RightID;
                } else if (item.RightName == "跳过") {
                    this.xgid = item.RightID;
                } else if (item.RightName == "取消跳过") {
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
        getCarNo() {
            clearTimeout(this.timer1);
            this.timer1 = setTimeout(() => {
                this.$axios({
                    method: 'get',
                    url: `/api/Polling/GetValue?key=${this.IOVariableKey1}`,
                }).then((res) => {
                    if (res.data.code == 0) {
                        if (this.carNo != res.data.data) {
                            this.carNo = res.data.data;
                            this.searchcarNo();
                        }
                        this.getCarNo()
                    } else {
                        this.$message.error(res.data.msg);
                        this.tableList = [];
                    }
                });
            }, 1000)
        },
        getDisabledType() {
            clearTimeout(this.timer2);
            this.timer2 = setTimeout(() => {
                this.$axios({
                    method: 'get',
                    url: `/api/Polling/GetValue?key=${this.IOVariableKey2}`,
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.canGo = res.data.data;
                        this.getDisabledType()
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }, 1000)

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
        tipCallBack(str) {
            this.noCancel = true;
            this.isTipShow = false;//后续接口返回提示不用tippop组件
            if (str == 'yes') {
                if (this.skipType == 1) {
                    this.jumpFn()
                } else if (this.skipType == 2) {
                    this.canclejumpFn()
                }
                this.skipType = 0;
            }
        },
        searchcarNo() {
            // if (this.carNo == '0') {
            //     return
            // }
            //这里只是做个防抖，不是轮询
            clearTimeout(this.searchcarNoTimer);
            this.searchcarNoTimer = setTimeout(() => {
                this.$axios({
                    method: 'get',
                    url: `/api/InboundTask/GetInboundInfoList?stationId=${this.shangliao}&carNo=${this.carNo}`,
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.tableList = res.data.data;
                    } else {
                        this.tableList = [];
                        this.$message.error(res.data.msg);
                    }
                });
            })
        },
        bindCode() {
            if (this.prodCode && this.prodCode.indexOf('_') > 0) {
                this.prodCode = this.prodCode.split('_')[0];
            }
            let _code = this.prodCode;
            this.tempCode = _code;
            this.prodCode = '';
            //前置判断，prodCode在不在列表里
            if (!_code) {
                return
            }
            let b = false;
            this.tableList.map(item => {
                item.InboundInfos.map(_ => {
                    if (_.ProcessBarcode.trim() == _code.trim()) {
                        b = true;
                    }
                })
            })
            if (!b) {

                this.$message.error('无对应产品码');
                return
            }
            this.$axios({
                method: 'post',
                url: `/api/InboundTask/BindCardNo `,
                data: {
                    InboundInfoId: _code.trim(),
                    CarNo: this.carNo
                }
            }).then((res) => {
                if (res.data.code == 0) {
                    this.$message.success(`${_code}绑定成功`);
                    this.searchcarNo();
                } else {

                    this.$message.error(res.data.msg);
                }
            });
        },
        beforeJump(Id, SkipGetNextProduct) {
            if (!this.xgshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            this.jumpId = Id;
            this.SkipGetNextProduct = SkipGetNextProduct;
            this.tipText = '是否确认跳过该条码？';
            this.isTipShow = true;
            this.noCancel = false;
            this.skipType = 1;
        },
        jumpFn() {
            let Id = this.jumpId;
            let carno = this.SkipGetNextProduct ? '' : this.carNo
            this.$axios({
                method: 'POST',
                url: `/api/InboundTask/SkipProduct?inboundInfoId=${Id}&carNo=${carno}`,
                data: {
                    inboundInfoId: Id,
                    carNo: carno
                }
            }).then((res) => {
                if (res.data.code == 0) {

                    this.$message.success('跳过成功');
                    this.searchcarNo();
                } else {

                    this.$message.error(res.data.msg);
                }
            });
        },
        beforeCancleJump(Id) {
            if (!this.scshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            this.cancleId = Id;
            this.tipText = '是否确认取消跳过该条码？';
            this.isTipShow = true;
            this.noCancel = false;
            this.skipType = 2;
        },
        canclejumpFn() {
            let Id = this.cancleId;
            this.$axios({
                method: 'POST',
                url: `/api/InboundTask/CancelSkipProduct?inboundInfoId=${Id}`,
            }).then((res) => {
                if (res.data.code == 0) {

                    this.$message.success('取消跳过成功');
                    this.searchcarNo();
                } else {

                    this.$message.error(res.data.msg);
                }
            });
        },
        Release(type) {
            if (this.releaseBool) {
                return;
            }
            this.releaseBool = true;
            setTimeout(() => {
                this.releaseBool = false;
            }, 2000)
            if (!this.canGo || this.canGo == '0') {
                return;
            }
            if (type == 1 && !this.canGo2) {
                return;
            }
            if (type == 2 && !this.canGo3) {
                return;
            }
            if (!this.xjshow) {
                this.tipText = '该账户没有权限！';
                this.isTipShow = true;
                return;
            }
            this.$axios({
                method: 'POST',
                url: `/api/InboundTask/Release`,
                data: {
                    StationId: this.shangliao,
                    CarNo: this.carNo,
                    Count: type == 1 ? 0 : this.count
                }
            }).then((res) => {
                if (res.data.code == 0) {
                    this.$message.success(`${type == 1 ? '空车放行' : '放行'}成功`);
                    this.searchcarNo();
                    this.getCarNo();//小车号变0带动searchcarNo
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.productLoading {
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

    .productLoading-title {
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

    .productLoading-content {
        width: 100%;
        height: calc(100% - 55px);
        padding: 15px 15px 66px;
        box-sizing: border-box;

        .productLoading-box {
            width: 100%;
            height: 100%;
            background: url('../../assets/images/1092.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;

            .search-box {
                width: 100%;
                height: auto;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;

                .tempCode {
                    position: absolute;
                    left: 50px;
                    bottom: 0;
                    color: #fff;
                    font-size: 12px;
                }

                .search-list {
                    width: calc(100% - 300px);
                    height: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;

                    .search-item {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        color: #FFFFFF;

                        .search-label {
                            width: 80px;
                        }

                        .search-input1 {
                            width: 160px;
                        }

                        .search-input2 {
                            width: 85px;
                        }

                        .search-input3 {
                            width: 300px;
                        }

                    }

                    .orange-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 118px;
                        height: 30px;
                        border: 2px solid #FFBD5D;
                        background: #2E3E48;
                        color: #FFBD5D;
                        border-radius: 4px;
                        font-size: 14px;
                        cursor: pointer;
                    }

                    .orange-btn:hover {
                        border: 2px solid #B38441;
                        color: #B38441;
                    }

                    .orange-btn:active {
                        border: 2px solid #805F2E;
                        color: #805F2E;
                    }

                    .green-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 118px;
                        height: 30px;
                        border: 2px solid #2ECAC5;
                        background: #2E3E48;
                        color: #2ECAC5;
                        border-radius: 4px;
                        font-size: 14px;
                        cursor: pointer;
                    }

                    .green-btn:hover {
                        border: 2px solid #24AEAD;
                        color: #24AEAD;
                    }

                    .green-btn:active {
                        border: 2px solid #176563;
                        color: #176563;
                    }

                    .grey-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 118px;
                        height: 30px;
                        background: linear-gradient(179deg, #30353E 0%, #454C58 100%);
                        border: 1px solid #707070;
                        color: #fff;
                        border-radius: 4px;
                        font-size: 14px;
                        cursor: not-allowed;
                    }

                }
            }

            .table-box {
                width: 100%;
                height: calc(100% - 190px);
                padding: 10px 50px 0;
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
                    font-size: 12px;
                    margin-right: 15px;

                    .table-key {
                        height: 34px;
                        display: flex;
                        align-items: center;
                        padding-left: 80px;

                    }

                    .table {
                        width: 100%;
                        height: calc(100% - 30px);
                        padding-left: 20px;
                        box-sizing: border-box;
                        overflow-y: auto;
                        position: relative;
                        font-size: 12px;

                        .table-title,
                        .table-label {
                            display: flex;
                            align-items: center;
                            padding-left: 15px;
                            box-sizing: border-box;

                            .labe1 {
                                flex: 1;
                            }

                            .labe2 {
                                flex: 5;
                            }

                            .labe3 {
                                flex: 3;
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
                            margin-bottom: 2px;


                            .grey-btn,
                            .red-btn {

                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 64px;
                                height: 20px;
                                background: #536B81;
                                border-radius: 3px;
                                cursor: pointer;
                                font-size: 12px;
                            }

                            .red-btn {
                                background: #8A5468;
                            }
                        }

                        .yellow-label {
                            background: #aca90f;
                        }

                        .green-label {
                            background: #0B5960;
                            color: #00EDFF;
                        }

                        .blue-label {
                            background: #07416B;
                        }
                    }

                }

                .table-item:last-child {
                    margin-right: 0;
                }

            }
        }
    }
}
</style>
<style lang="scss" >
.productLoading {
    .el-input {
        height: 30px;

        .el-input__suffix {
            display: flex;
            align-items: center;
        }

        .el-input__inner {
            background: linear-gradient(180deg, rgba(94, 204, 238, 0.36) 0%, rgba(9, 84, 138, 0.5) 100%);
            border-radius: 3px 3px 3px 3px;
            border: 2px solid rgba(102, 255, 255, 0.3);
            color: #fff;
            font-size: 14px;
        }

        .el-input__inner:focus {
            border: 2px solid rgba(102, 255, 255, 0.95);
        }

        .el-select .el-input .el-select__caret {
            transform-origin: center center;
        }

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
