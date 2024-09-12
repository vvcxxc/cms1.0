<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}
                <img :src="eye ? require('../../assets/images/eye.svg') :
                    require('../../assets/images/eye-close.svg')" @click="eveFn" />
                <img :src="no" alt="" @click="handleClick" class="close" />
            </div>

            <div class="popContent">
                <div class="content1">
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">订单号</div>
                            <el-input type="text" v-model="formData.Voucher.OrderNo" style="width: 210px" disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">计划号</div>
                            <el-input type="text" v-model="formData.Voucher.PlanNo" style="width: 210px" disabled />
                        </div>

                        <div class="content">
                            <div class="contentLable required">类型</div>
                            <el-input type="text" v-model="formData.Voucher.Type" style="width: 210px" disabled />
                        </div>

                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">产品名称</div>
                            <el-input type="text" v-model="formData.Voucher.ProductName" style="width: 210px" disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">产品编号</div>
                            <el-input type="text" v-model="formData.Voucher.ProductNo" style="width: 210px" disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">生产批次</div>
                            <el-input type="text" v-model="formData.Voucher.BatchNo" style="width: 210px" disabled />
                        </div>
                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">备料完成时间</div>
                            <el-input type="text" v-model="formData.Voucher.CompletedTime" style="width: 210px" disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">称量人</div>
                            <el-input type="text" v-model="formData.Voucher.Weigher" style="width: 210px" disabled />
                        </div>
                    </div>
                    <div v-for="item in formData.GroupedDetails" :key="item.BoilerGroup">

                        <CurrentTitle :title="item.GroupDescription + '备料清单'" line />
                        <!-- <div class="content contentTable">
                            <el-table :data="item.Details" border highlight-current-row header-row-class-name="light-blue"
                                row-class-name="high-light" height="100%" width="100%" :style="{ 'font-size': '14px' }"
                                ref="metable" :header-cell-style="{
                                    background: '#DCF0F9',
                                    color: '#4270E4',
                                    'border-left': '1px solid #cccccc',
                                    height: '50px',
                                    'font-size': '14px',
                                    padding: '0'
                                }">
                                <template slot="empty">
                                    <span>暂无数据</span>
                                </template>
                                <el-table-column label="序号" type="index" width="60"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="原料编号" prop="MaterialNo"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="原料名称" prop="MaterialName" v-if="eye"
                                    :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="所需重量" prop="NeedWeight" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column label="原料批次" prop="MaterialBatchNo" :show-overflow-tooltip="true">
                                    <template slot="header"><span class="red">*</span>原料批次</template>
                                </el-table-column>
                                <el-table-column label="包装数量" prop="PackingQty" :show-overflow-tooltip="true">
                                    <template slot="header"><span class="red">*</span>包装数量</template>
                                    <template slot-scope="scope">
                                        {{ scope.row.PackingQty }}/{{ scope.row.PackingQtyDenom }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="秤选择" prop="ScaleNo" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column label="实际重量（净重）" prop="ActualWeight" width="150"
                                    :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column label="上限值" prop="UpperLimit" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column label="下限值" prop="LowerLimit" :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column label="操作"  :show-overflow-tooltip="true">
                                     <template slot-scope="scope">
                                       <div class="table-btn" @click="doPrint(scope.row)">打印</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div> -->



                        <div class="contentTable" :id="'contentScroll' + _idx0">
                            <div class="title-line">
                                <div class="title-item t1">序号</div>
                                <div class="title-item t2">原料编号</div>
                                <div class="title-item t3" v-if="eye">原料名称</div>
                                <div class="title-item t4">所需重量</div>
                                <div class="title-item t5"><span class="red">*</span>原料批次</div>
                                <div class="title-item t6"><span class="red">*</span>包装数量</div>
                                <div class="title-item t7">秤选择</div>
                                <div class="title-item t8">净重</div>
                                <div class="title-item t9">上限值</div>
                                <div class="title-item t10">下限值</div>
                                <div class="title-item t11">操作</div>
                            </div>
                            <div class="table-line" v-for="( _, _idx ) in  item.Details ">
                                <div class="table-item t1">
                                    {{ Number(_idx) + 1 }}
                                </div>
                                <div :class="'table-item t2 tableItemMaterialNo tableItemMaterialNo' + _idx0">
                                    {{ _.MaterialNo }}</div>
                                <div class="table-item t3" v-if="eye">{{ _.MaterialName }}</div>
                                <div class="table-item t4">{{ _.NeedWeight }}</div>
                                <div class="table-item t5">
                                    <div class="table-item-child" v-for=" _2  in  _.WeighInfo ">
                                        {{ _2.MaterialBatchNo }}
                                    </div>
                                </div>
                                <div class="table-item t6">

                                    {{ _.PackingQty }} /{{ _.PackingQtyDenom }}

                                </div>
                                <div class="table-item t7">
                                    <div class="table-item-child" v-for=" _2  in  _.WeighInfo">
                                        {{ _2.ScaleNo }}
                                    </div>
                                </div>
                                <div class="table-item t8">
                                    <div class="table-item-child" v-for=" _2  in  _.WeighInfo ">
                                        <div v-if="_.IsLarge">
                                            {{ _2.ActualWeight }}kg
                                        </div>
                                        <span v-else>{{ _2.ActualWeight }}</span>
                                    </div>
                                </div>
                                <div class="table-item t9">{{ _.UpperLimit }}</div>
                                <div class="table-item t10">{{ _.LowerLimit }}</div>
                                <div class="table-item t11">
                                    <div :class="_.IsPrint ? 'table-btn disable' : 'table-btn'" @click="doPrint(_)">打印
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>


            </div>

            <div class="popBtn">

                <el-button class="btn" @click="handleClick" style="
                        margin-right: 40px;
                        background: rgba(56, 109, 240);
                        border: 1px solid #386df0;
                    ">
                    返回
                </el-button>
            </div>
        </div>

    </div>
</template>

<script>
import CurrentTitle from '../public/currentTitle.vue';
export default {
    props: ['title', 'data'],
    components: {
        CurrentTitle,
    },
    data() {
        return {
            no: require('@/assets/images/no.png'),
            choose: require('@/assets/images/icon_diji.png'),
            formData: {
                Voucher: {},
                GroupedDetails: []
            },

            BusinessTypeList: [],
            RoadwayTypeList: [],
            eye: false,
            cxid: "",
            cxshow: true,
            jurisdiction: [],
            buttonarr: [],
        };
    },

    mounted() {

        this.formData = {
            ...this.data
        }
        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        console.log("this.buttonarr", this.buttonarr)
        this.buttonarr.forEach((item) => {
            if (item.RightName == "展示/隐藏原料名称") {
                this.cxid = item.RightID
            }
        })
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
    methods: {
        doPrint(row) {
            row.IsPrint = true;
            this.$axios({
                method: 'post',
                url: `http://localhost:8809/PrintData?id=${row.VoucherId}&printType=2&labelId=${row.Id}&materialNo=${row.MaterialNo
                    }&materialName=${encodeURIComponent(encodeURIComponent(row.MaterialName))}&weigher=${encodeURIComponent(encodeURIComponent(this.formData.Voucher.Weigher))}&packingQty=${row.PackingQty
                    }&packingQtyDenom=${row.PackingQtyDenom}&actualWeight=${row.WeighInfo.map(_ => _.ActualWeight).join('|')}&materialBatchNo=${row.WeighInfo.map(_ => _.MaterialBatchNo).join(',')}`,
            })
        },
        handleClick(str) {
            this.$emit('ckEditPopCallBack');
        },
        eveFn() {
            console.log('54545')
            if (!this.cxshow) {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '该账户没有权限！';
                return
            }
            this.eye = !this.eye;
        },
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

    },

};
</script>

<style lang="scss" scoped>
.zdeditPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 1200px;
        height: auto;
        top: 45%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 100%;
            height: 60px;
            background: rgba(56, 109, 240);
            line-height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            position: relative;

            .close {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 18px;
                right: 20px;
                cursor: pointer;
            }
        }

        .popContent {
            width: 100%;
            height: 750px;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;

            .content1 {
                width: 100%;
                height: auto;

                .content1-line {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    .content {
                        width: fit-content;
                    }


                }
            }

            .content2 {
                width: 100%;
                height: 300px;
                display: flex;

                .contentbody {
                    flex: 1;

                    .contentBox {
                        // width: 380px;
                        height: 264px;
                        background: rgba(244, 244, 244, 0.39);
                        border: 1px solid #dddddd;
                        margin-top: 14px;


                    }
                }
            }

            .content {
                display: flex;
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin: 10px 0;

                .contentLable,
                .contentLable2 {
                    width: 110px;
                    text-align: right;
                    font-size: 14px;
                    color: #363636;
                    margin-right: 10px;
                }

                .contentLable2 {
                    width: 120px;
                }

                img {
                    width: 38px;
                    height: 38px;
                    position: absolute;
                    top: 2px;
                    right: 0;
                    cursor: pointer;
                }

                .required::before {
                    content: '*';
                    color: #f56c6c;
                    margin-right: 4px;
                }
            }

            .contentTable {
                max-height: 402px;
                width: 100%;
                overflow-y: auto;
                position: relative;

                .title-line {
                    width: fit-content;
                    height: 50px;
                    background: #DCF0F9;
                    color: #4270E4;
                    display: flex;
                    position: sticky;
                    top: 0;
                    z-index: 10;

                    .title-item {
                        border-right: #cbcaca 1px solid;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .red {
                            color: red;
                        }
                    }
                }

                .table-line {
                    width: fit-content;
                    height: auto;
                    background: #fff;
                    display: flex;


                    .table-item {
                        border-bottom: #ededed 1px solid;
                        border-right: #ededed 1px solid;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 50px;

                        .table-item-child {
                            width: 100%;
                            height: 50px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-bottom: #ededed 1px solid;
                        }

                        .table-btn {
                            cursor: pointer;
                            padding: 8px 5px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            line-height: 1;
                            color: #ffffff;
                            background-color: #4270e4;
                            border-radius: 4px;
                            margin-right: 5px;
                        }

                        .disable {
                            background-color: #7f7f7f;
                        }

                        .n2 {
                            background-color: #70b603;
                        }
                    }
                }



                .t1 {
                    width: 80px;
                }

                .t2 {
                    width: 150px;
                }

                .t3 {
                    width: 150px;
                }

                .t4 {
                    width: 100px;
                }

                .t5 {
                    width: 120px;
                }

                .t6 {
                    width: 100px;
                    display: flex;
                    align-items: center;
                    flex-direction: row !important;
                }

                .t7 {
                    width: 100px;
                }

                .t8 {
                    width: 100px;

                }

                .t9 {
                    width: 90px;
                }

                .t10 {
                    width: 90px;
                }

                .t11 {
                    width: 120px;
                    display: flex;
                    align-items: center;
                }
            }


        }


        .popBtn {
            width: 100%;
            height: 60px;
            text-align: center;
            // line-height: 60px;

            .btn {
                width: 100px;
                height: 38px;
                background: rgba(153, 153, 153);
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 20px;
                margin-top: 10px;
                border: 1px solid #999999;
            }
        }
    }


}
</style>
<style lang="scss">
.zdeditPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>