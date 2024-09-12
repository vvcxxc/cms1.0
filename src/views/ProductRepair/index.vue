<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div class="tapwater">
        <div class="linebox" id="linebox">
            <div class="query-table clearfix">
                <div class="fl">
                    <span>时间范围</span>
                    <div class="container">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="starttime"
                                type="datetime"
                                placeholder="请选择"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{ width: '220px' }"
                            ></el-date-picker>
                        </div>
                        <i class="separate">-</i>
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="endtime"
                                type="datetime"
                                placeholder="请选择"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :style="{ width: '220px' }"
                            ></el-date-picker>
                        </div>
                    </div>
                    <span>产品型号</span>
                    <el-select
                        style="margin-left:5px;width:170px"
                        placeholder="请选择"
                        v-model="ProductTypeCode"
                    >
                        <el-option label="全部" value="全部"></el-option>
                        <el-option
                            v-for="item in ProductTypeList"
                            :key="item.ProductTypeCode"
                            :label="item.ProductTypeCode"
                            :value="item.ProductTypeCode"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                        style="margin-left:5px;width:200px"
                        placeholder="请输入"
                        v-model="inputFilter"
                    />
                    <div class="query" @click="getDataBtn()">查询</div>
                </div>
                <div class="fr">
                    <div class="add" @click="openAddRepair">新增</div>
                </div>
            </div>
            <div class="conter">
                <div class="conter-table">
                    <el-table
                        highlight-current-row
                        :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{
                            background: '#5a6c98',
                            color: '#fff'
                        }"
                        :data="dataList"
                        border
                        height="100%"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            type="index"
                            label="序号"
                            width="60px"
                        ></el-table-column>
                        <el-table-column
                            prop="ProductID"
                            label="产品ID"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="ProductModel"
                            label="产品型号"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="ProductOrderNo"
                            label="订单号"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="RepairProcedure"
                            label="返修工序"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="Remark"
                            label="备注"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="AddTime"
                            label="新增时间"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="Address"
                            label="操作"
                            width="220px"
                        >
                            <template slot-scope="scope">
                                <div
                                    class="table_remove"
                                    @click="deleteFun(scope.row)"
                                >
                                    <div class="remove_img"></div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="conter-page">
                    <my-page :pageData="pageData" @req="getData"></my-page>
                </div>
            </div>
        </div>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop
            :tipText="tipText"
            :noCancel="noCancel"
            v-if="isPopShow"
            @tipCallBack="tipCallBack"
        ></TipsPop>
        <AddRepair v-if="AddRepairShow" @callback="AddRepairCallBack" />
    </div>
</template>

<script>
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts');
import TipsPop from '../../components/public/tipPop.vue';
import MyPage from '../../components/public/page.vue';
import AddRepair from './addRepair.vue';
export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
        AddRepair
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,
            AddRepairShow: false,
            starttime: new Date(new Date().toLocaleDateString()),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
            ),
            inputFilter: '',
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            AddRepairShow: false,
            ProductTypeList: [],
            ProductTypeCode: '全部',
            dataList: [],
            delItem: {},
            jurisdiction: [],
            buttonarr: [],

            xzid: '',
            xzshow: true,
            scid: '',
            scshow: true,
            cxid: '',
            cxshow: true
        };
    },
    created() {},
    watch: {
        '$store.state.btnPowerData': {
            //脚本事件
            deep: true,
            handler: function(n, o) {
                this.getPower();
            }
        }
    },
    methods: {
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
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log(
                '666',
                this.buttonarr,
                this.buttonarr.map(_ => _.RightName)
            );
            this.buttonarr.forEach(item => {
                if (item.RightName == '产品返修-删除按钮') {
                    this.scid = item.RightID;
                } else if (item.RightName == '产品返修-新增按钮') {
                    this.xzid = item.RightID;
                } else if (item.RightName == '产品返修-查询按钮') {
                    this.cxid = item.RightID;
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`
            })
                .then(res => {
                    this.cxshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`
            })
                .then(res => {
                    this.scshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });

            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`
            })
                .then(res => {
                    this.xzshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        tipCallBack(str) {
            this.isPopShow = false;
            if (str == 'yes') {
                let _name = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    _name = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                        .SCMSUserName;
                } else {
                    _name = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserName;
                }
                this.$axios({
                    method: 'post',
                    url: `/api/ProductRepair/DelProductRepair/${this.delItem.ID}?LoginUserName=${_name}`
                }).then(res => {
                    if (res.data.code == 0) {
                        this.isPopShow = true;
                        this.tipText = '删除成功！';
                        this.getData(1);
                    } else {
                        this.isPopShow = true;
                        this.tipText = res.data.msg;
                    }
                });
            }
            this.noCancel = true;
            this.delItem = {};
        },
        getDate(val) {
            if (val) {
                let date = new Date(val);
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                let hour = date.getHours();
                hour = hour < 10 ? `0${hour}` : hour;
                let minute = date.getMinutes();
                minute = minute < 10 ? `0${minute}` : minute;
                let second = date.getSeconds();
                second = second < 10 ? `0${second}` : second;
                let str = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
                return str;
            }
            return '';
        },
        getProdType() {
            this.$axios({
                method: 'post',
                url: '/api/FormulaManage/QueryProductType'
            }).then(res => {
                if (res.data.code == 0) {
                    this.ProductTypeList = res.data.data || [];
                    // if (this.ProductTypeList.length) {
                    //     this.ProductTypeCode = this.ProductTypeList[0].ProductTypeCode
                    // }
                    this.getData(1);
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            });
        },
        openAddRepair() {
            if (!this.xzshow) {
                this.tipText = this.lang.NoOperationAuthority;
                this.isPopShow = true;
                return;
            }
            this.AddRepairShow = true;
        },
        AddRepairCallBack(type, str) {
            this.AddRepairShow = false;
            if (type == 'yes') {
                this.getData(1);
            }
            if (str) {
                this.isPopShow = true;
                this.tipText = str;
            }
        },
        deleteFun(row) {
            if (!this.scshow) {
                this.tipText = this.lang.NoOperationAuthority;
                this.isPopShow = true;
                return;
            }
            this.delItem = row;
            this.tipText = `是否确认删除产品${row.ProductID}？`;
            this.noCancel = false;
            this.isPopShow = true;
        },
        getDataBtn() {
            if (!this.cxshow) {
                this.tipText = this.lang.NoOperationAuthority;
                this.isPopShow = true;
                return;
            }
            this.getData(1);
        },
        getData(_index) {
            this.$axios({
                method: 'post',
                url: `/api/ProductRepair/QueryProductRepairs?st=${this.getDate(
                    this.starttime
                )}&et=${this.getDate(this.endtime)}&PageSize=${
                    this.pageData.PageSize
                }&PageIndex=${_index}&ProductModel=${
                    this.ProductTypeCode
                }&KeyWord=${this.inputFilter}`
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.DataList || [];
                    this.pageData = res.data.data.ParameterList;
                } else {
                    this.isPopShow = true;
                    this.tipText = res.data.msg;
                }
            });
        }
    },
    //渲染后计算宽度
    mounted() {
        this.getPower();
        this.getProdType();
    }
};
</script>

<style lang="scss">
.tapwater {
    .fl .el-input--prefix .el-input__inner {
        padding-left: 25px !important;
    }

    .table input {
        text-indent: 4px;
    }
}
</style>

<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.conter {
    width: 100%;
    height: calc(100% - 60px);

    .conter-table {
        width: 100%;
        height: calc(100% - 50px);

        .table_remove {
            width: 60px;
            height: 30px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: #a7a3a4 1px solid;
            cursor: pointer;
            background: #fff;

            .remove_img {
                width: 20px;
                height: 20px;
                background: url('../../assets/images/icon_dell.png');
                background-size: cover;
            }
        }
    }

    .conter-page {
        width: 100%;
        height: 50%;
    }
}

.fl {
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

.clearfix {
    zoom: 1;
}

.tapwater {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    padding: 100px 0 40px;

    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
    }

    .query-table {
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
    .export,
    .add {
        display: inline-block;
        height: 40px;
        width: 118px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }

    .query {
        background-color: #4270e4;
        margin-left: 10px;
    }

    .add {
        background-color: #ffffff;
        color: #23d052;
        border: 2px solid #23d052;
        margin-right: 20px;
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
</style>
