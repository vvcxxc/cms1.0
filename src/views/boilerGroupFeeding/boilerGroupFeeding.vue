<!--
 * @Description: 设备台帐操作记录界面
 * @Date: 2019-11-25 19:15:22
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 21:24:17
 -->
<template>
    <div class="boilerGroupFeeding">
        <div class="loadcover" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)"
            v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute; width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>


        <div class="banner-container">
            <div class="banner-item">
                <div class="banner-label">
                    <div class="label-key">批次号:</div>
                    <div class="label-input">
                        <el-input type="text" style="width: 210px" disabled v-model="tabData.BatchNo" />
                    </div>
                </div>
                <div class="banner-label">
                    <div class="label-key">订单号:</div>
                    <div class="label-input">
                        <el-input type="text" style="width: 210px" disabled v-model="tabData.OrderNo" />
                    </div>
                </div>
                <div class="banner-label">
                    <div class="label-key">产品名称:</div>
                    <div class="label-input">
                        <el-input type="text" style="width: 210px" disabled v-model="tabData.ProductName" />
                    </div>
                </div>
                <div class="banner-label">
                    <div class="label-key">产品编号:</div>
                    <div class="label-input">
                        <el-input type="text" style="width: 210px" disabled v-model="tabData.ProductNo" />
                    </div>
                </div>
            </div>
            <div class="banner-item">
                <div class="banner-label2">
                    <div class="label-key">工艺说明:</div>
                    <div class="label-input">
                        <el-input type="textarea" style="width: 600px" disabled v-model="tabData.BomDescription" />
                    </div>
                </div>
                <div class="banner-label2">
                    <div class="label-key">工艺路线:</div>
                    <div class="label-input">
                        <el-input type="textarea" style="width: 600px" disabled v-model="tabData.BomName" />
                    </div>
                </div>

            </div>
        </div>
        <div class="search-container">
            <my-search :searchList="searchList" :searchData="searchData" @setParams="setParams" @clearParams="clearParams"
                @touliao="touliao" ref="time"></my-search>
            <img :src="eye ? require('../../assets/images/eye2.svg') : require('../../assets/images/eye-close2.svg')"
                @click="eveFn" />
        </div>
        <div class="content-scroll">
            <div class="table-container">
                <div class="left-container">
                    <div class="nav" :class="{ active: activeIndex == index }" v-for="(item, index) in dataList"
                        :key="item.Id" @click="tabActive(index)">
                        <div :class="item.Status == 2 ? 'green' : item.Status == 1 ? 'blue' : 'grey'"></div>
                        <div class="group-description">{{ item.GroupDescription }}</div>
                    </div>
                </div>
                <div class="right-container"
                    v-if="dataList[activeIndex] && dataList[activeIndex].Details && dataList[activeIndex].Details.length">

                    <el-table :data="dataList[activeIndex].Details" height="100%" border ref="multipleTable"
                        highlight-current-row stripe tooltip-effect="dark" style="width: 100%" :header-cell-style="{
                            background: '#5a6c98',
                            color: '#fff',
                            'border-left': '1px solid #cccccc',
                            height: '50px',
                            'font-size': '14px',
                            padding: '0'
                        }">
                        <el-table-column type="index" label="序号" width="80" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="MaterialNo" label="原料编号" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="MaterialName" label="原料名称" :show-overflow-tooltip="true"
                            v-if="eye"></el-table-column>
                        <el-table-column prop="RatioDescription" label="占比" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="FormulaQty" label="用量(kg)" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="ActualWeight" label="实际重量(净重)"
                            :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="State" label="原料状态" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span :class="{ greenText: scope.row.State == 2, greyText: scope.row.State != 2 }">{{
                                    scope.row.State == 2 ? '已投料' : scope.row.State == 1 ? '投料中' : '未投料'
                                }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>



        </div>

        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
    </div>
</template>

<script>
import MySearch from '../../components/public/search018.vue';
import TipPop from '../../components/public/tipPop.vue';
export default {
    components: {
        MySearch,
        TipPop,
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            activeIndex: 0,
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '选择锅组：',
                    model: 'boilerGroup',
                    type: 'select',
                    optionList: [],
                    value: 'Value',
                    label: 'Text'
                },
                {
                    title: '扫描条码：',
                    model: 'argKeyword',
                    type: 'key'
                }
            ],
            searchData: {
                boilerGroup: '',
                argKeyword: ''
            },
            tabData: {},
            dataList: [],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            eye: false,
            cxid: "",
            cxshow: true,
            jurisdiction: [],
            buttonarr: []
        };
    },

    mounted() {
        this.$axios
            .get(
                `/api/BoilerVoucher/GetBoilerGroup`,
            )
            .then(res => {
                if (res.data.code == 0) {
                    let temp = res.data.data;
                    this.searchList[0].optionList = temp;
                    if (temp.length) {
                        this.searchData.boilerGroup = temp[0].Value;
                    }
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })

        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        console.log("this.buttonarr", this.buttonarr)
        this.buttonarr.forEach((item) => {
            if (item.RightName == "展示/隐藏原料名称") {
                this.cxid = item.RightID
            }
        })
        console.log("this.cxid", this.cxid)
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`,
        }).then(res => {
            this.cxshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })
    },
    watch: {
        'searchData.boilerGroup': {
            handler(val) {
                this.getTabData(true);
            }
        }
    },
    methods: {
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = []
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i])
                    return temPath
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(id, node[i].Children, temPath)
                    if (findResult) {
                        return findResult
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split("?");
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split("&");
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");
                    if (arr && arr[0] == paraName) {

                        return arr[1]
                    }
                }
                return ''
            } else {
                return ''
            }
        },
        eveFn() {
            if (!this.cxshow) {
                this.isTipShow = true;
                this.tipText = '该账户没有权限！';
                return
            }
            this.eye = !this.eye;
        },
        getTabData(changeTab) {
            this.$axios
                .get(
                    `/api/BoilerVoucher/Query?boilerGroup=${this.searchData.boilerGroup}&pageIndex=1&pageSize=1`,
                )
                .then(res => {
                    if (res.data.code == 0) {
                        if (res.data.data.DataList.length) {
                            this.tabData = res.data.data.DataList[0];
                            this.getTableData(changeTab);
                        } else {
                            this.tabData = {};
                            this.dataList = [];
                        }
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
        },
        getTableData(changeTab) {
            this.$axios
                .get(
                    `/api/BoilerVoucher/GetDetail?boilerGroup=${this.searchData.boilerGroup}&voucherId=${this.tabData.Id}`,
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.dataList = res.data.data || [];
                        if (changeTab) {
                            this.activeIndex = 0;
                        }
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
        },
        setParams(params, a) {
            this.searchData = params;
        },
        isJSON(str) {
            try {
                if (typeof JSON.parse(str) == "object") {
                    return true;
                }
            } catch (e) {
            }
            return false;
        },
        touliao() {

            let _arr = this.searchData.argKeyword.split('_');
            if (_arr.length != 2) {
                this.isTipShow = true;
                this.tipText = '扫码条码无效!';
                return
            }
            let MaterialNo = _arr[0];
            let ActualWeight = _arr[1];
            console.log("tabData", this.tabData);
            this.$axios
                .post(
                    `/api/BoilerVoucher/Feeding?voucherId=${this.tabData.Id}&ActualWeight=${ActualWeight}&MaterialNo=${MaterialNo}&boiler=${this.dataList[this.activeIndex].Boiler}`,
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.isTipShow = true;
                        this.tipText = '投料成功';
                        this.searchData.argKeyword = '';
                        this.getTabData(false);
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
        },
        tipCallBack(str) {
            this.isTipShow = false;
        },
        clearParams(params, a) {
            this.searchData = params;
        },

        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        tabActive(index) {
            this.activeIndex = index;
        }
    }
};
</script>
<style  lang="scss">
.boilerGroupFeeding {
    textarea {
        resize: none;
    }
}
</style>
<style lang="scss" scoped>
.boilerGroupFeeding {
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    .banner-container {
        width: 100%;
        height: 125px;
        padding-bottom: 10px;
        box-sizing: border-box;

        .banner-item {
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            overflow: hidden;

            .banner-label,
            .banner-label2 {
                width: 350px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: auto;
                min-height: 50px;
                padding-top: 10px;
                box-sizing: border-box;

                .label-key {
                    width: 100px;
                }

                .label-input {
                    width: 200px;
                    display: flex;
                }
            }

            .banner-label2 {
                width: 700px;

                .label-input {
                    width: 550px;
                }
            }
        }


    }

    .search-container {
        height: 60px;
        position: relative;

        img {
            width: 25px;
            height: 20px;
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translate(0, -50%);
            cursor: pointer;
        }
    }

    .content-scroll {
        width: 100%;
        height: calc(100% - 215px);
        overflow-y: auto;

    }

    .table-container {
        width: 100%;
        height: 100%;
        display: flex;

        .left-container {
            width: 225px;
            height: auto;
            box-sizing: border-box;
            min-width: 100px;
            box-sizing: border-box;
            border-top: 1px solid #E4E4E4;

            .nav {
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                cursor: pointer;
                padding-left: 15px;
                background-color: #F4F7F7;
                border-bottom: 1px solid #E4E4E4;

                &.active {
                    background-color: #fff;
                    opacity: 1;
                    color: #4270e4;
                    font-weight: 600;
                }

                .group-description {
                    display: inline-block;
                    width: 100px;
                }

                .blue,
                .yellow,
                .green,
                .grey {
                    width: 24px;
                    height: 24px;
                    border-radius: 12px;
                    margin-right: 15px;
                    background-color: #02a7f0;
                }

                .yellow {
                    background-color: #02a7f0;
                }

                .green {
                    background-color: #95f204;
                }

                .grey {
                    background-color: #d7d7d7;
                }
            }
        }


        .right-container {
            width: calc(100% - 225px);
            height: auto;
            box-sizing: border-box;
            background-color: #fff;

            .greenText {
                color: #70b603;
            }

            .greyText {
                color: #aaaaaa;
            }
        }
    }

}

.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 39999990;
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

    .tipcontanin {
        height: calc(100% - 40px);
    }

    .w {
        width: 100%;
        height: 75%;
        padding: 12px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }

    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
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
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}

.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}

.fcolor {
    color: #000 !important;
}

.colordiv {
    background-color: #d9dbde !important;
}

.colortip {
    background-color: #efeff0 !important;
}
</style>
