<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}
                <img :src="eye ? require('../../assets/images/eye.svg') :
                    require('../../assets/images/eye-close.svg')" @click="eveFn" />
                <img :src="no" alt="" @click="handleClick('no')" class="close" />
            </div>

            <div class="popContent">
                <div class="content1">
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">订单号</div>
                            <el-input type="text" v-model="formData.Voucher.OrderNo" style="width: calc(100% - 110px)"
                                disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">计划号</div>
                            <el-input type="text" v-model="formData.Voucher.PlanNo" style="width: calc(100% - 110px)"
                                disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">类型</div>
                            <el-input type="text" v-model="formData.Voucher.Type" style="width: calc(100% - 110px)"
                                disabled />
                        </div>

                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">产品名称</div>
                            <el-input type="text" v-model="formData.Voucher.ProductName" style="width: calc(100% - 110px)"
                                disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">产品编号</div>
                            <el-input type="text" v-model="formData.Voucher.ProductNo" style="width: calc(100% - 110px)"
                                disabled />
                        </div>
                        <div class="content">
                            <div class="contentLable required">生产批次</div>
                            <el-input type="text" v-model="formData.Voucher.BatchNo" style="width: calc(100% - 110px)"
                                disabled />
                        </div>
                    </div>
                    <div class="content1-line">
                        <div class="content">
                            <div class="contentLable required">称量人</div>
                            <el-input id="chenliangren" type="text" v-model="formData.Voucher.Weigher"
                                style="width: calc(100% - 110px)" />
                        </div>
                    </div>
                    <div v-for="(item, _idx0) in  formData.GroupedDetails " :key="item.BoilerGroup"
                        class="groupedDetails-list">
                        <div class="groupedDetails-label">
                            <div class="groupedDetails-left">
                                <div class="groupedDetails-title">
                                    <CurrentTitle :title="item.GroupDescription + '备料清单'" />
                                    <div class="groupedDetails-tips">序号列可勾选大件物料</div>
                                </div>
                                <el-input placeholder="请输入添加原料" @keyup.enter.native="jumpFn(item, _idx0)"
                                    v-model="item.filterStr" />
                            </div>
                            <!-- <div class="groupedDetails-right">
                                <img src="../../assets/images/zoom.png" />
                                全屏填写
                            </div> -->
                        </div>

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
                                <div class="table-item t1" @click="checkla">
                                    <el-checkbox v-model="_.IsLarge" :label="Number(_idx) + 1" :disabled="!lashow" />
                                </div>
                                <div :class="'table-item t2 tableItemMaterialNo tableItemMaterialNo' + _idx0">
                                    {{ _.MaterialNo }}</div>
                                <div class="table-item t3" v-if="eye">{{ _.MaterialName }}</div>
                                <div class="table-item t4">{{ _.NeedWeight }}</div>
                                <div class="table-item t5">
                                    <div class="table-item-child" v-for=" _2  in  _.WeighInfo ">
                                        <el-input type="text" v-model="_2.MaterialBatchNo" placeholder="请输入"
                                            @blur="checkBatch(_, _2)" />
                                    </div>
                                </div>
                                <div class="table-item t6">
                                    <el-input type="text" v-model="_.PackingQty" @blur="checkNum('PackingQty')"
                                        style="width: 50px;margin: 0 5px;" />
                                    /
                                    <el-input type="text" v-model="_.PackingQtyDenom" @blur="checkNum('PackingQtyDenom')"
                                        style="width: 50px;margin: 0 5px;" />
                                </div>
                                <div class="table-item t7">
                                    <div class="table-item-child" v-for=" _2  in  _.WeighInfo ">
                                        <el-select v-model="_2.ScaleNo" :disabled="_.IsLarge || _.IsPrint">
                                            <el-option v-for=" item  in  chengList " :key="item.Value" :label="item.Text"
                                                :value="item.Text"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="table-item t8">
                                    <div class="table-item-child" v-for=" _2  in  _.WeighInfo ">
                                        <div v-if="_.IsLarge">
                                            <el-input type="text" v-model="_2.ActualWeight" style="width:150px"
                                                placeholder="请输入" />kg
                                        </div>
                                        <span v-else>{{ _2.ActualWeight }}</span>
                                        <div class="close-circle" @click="delRow2(_, _2)">
                                            <img src="../../assets/images/close.svg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="table-item t9">{{ _.UpperLimit }}</div>
                                <div class="table-item t10">{{ _.LowerLimit }}</div>
                                <div class="table-item t11">
                                    <div :class="_.IsPrint ? 'table-btn disable' : 'table-btn'" @click="doPrint(_)">打印
                                    </div>
                                    <div class="table-btn n2" @click="addRow2(_)">增加</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="stroageFn" style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                ">
                    保存草稿
                </el-button>
                <el-button class="btn" @click="handleClick('yes')" style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                ">
                    确定
                </el-button>
            </div>
        </div>


        <div class="print2" id="print-content2">
            <div class="print-title">原料标签</div>
            <div class="print-content">
                <div class="print-line">
                    <div class="print-item">
                        <div class="print-l">产品名称：</div>
                        <div class="print-r">{{ formData.Voucher.ProductName }}</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">配方编号：</div>
                        <div class="print-r">{{ printrow.FormulaNo }}</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">相别：</div>
                        <div class="print-r">{{ printrow.ProductionGroup }}</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">重量：</div>
                        <div class="print-r">{{ printrow.ActualWeight }}kg</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">称量人：</div>
                        <div class="print-r">{{ formData.Voucher.Weigher }}</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">日期时间：</div>
                        <div class="print-r">{{ nowTime }}</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">包装数量：</div>
                        <div class="print-r"> {{ printrow.PackingQty }}</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">配料单号：</div>
                        <div class="print-r">{{ formData.Voucher.OrderNo }}</div>
                    </div>
                </div>
                <div class="print-line">
                    <div class="print-item">
                        <div class="print-l">生产批次：</div>
                        <div class="print-r">{{ formData.Voucher.BatchNo }}</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">原料名称：</div>
                        <div class="print-r">{{ printrow.MaterialName }}</div>
                    </div>
                    <div class="print-item">
                        <div class="print-l">原料编号：</div>
                        <div class="print-r">{{ printrow.MaterialNo }}</div>
                    </div>
                    <div class="print-img">
                        <div class="print-img-box">
                            <div class="print-qrcode" id="qrcode" ref="qrcode"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import CurrentTitle from '../public/currentTitle.vue';
import html2Canvas from 'html2canvas';
import TipPop from '../public/tipPop.vue';

export default {
    props: ['title', 'data'],
    components: {
        CurrentTitle,
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            no: require('@/assets/images/no.png'),
            choose: require('@/assets/images/icon_diji.png'),
            formData: {
                Voucher: {},
                GroupedDetails: []
            },
            printrow: {},
            BusinessTypeList: [],
            RoadwayTypeList: [],
            chengList: [],
            nowTime: '',
            eye: false,
            cxid: "",
            cxshow: true,
            laid: "",
            lashow: true,
            jurisdiction: [],
            buttonarr: [],
            nowIdx: 1,
            weightTimer: 0
        };
    },
    beforeDestroy() {
        clearTimeout(this.weightTimer);
    },
    destroyed() {
        clearTimeout(this.weightTimer);
    },
    mounted() {
        this.$axios({
            method: 'get',
            url: `/api/PreparationVoucher/GetScales`,
        }).then((res) => {
            if (res.data.code == 0) {
                this.chengList = res.data.data;
                this.formData = {
                    GroupedDetails: this.data.GroupedDetails.map(_ => ({
                        ..._,
                        Details: _.Details.map(_2 => ({
                            ..._2,
                            ScaleNo: this.chengList[0].Text
                        })),
                        filterStr: ''
                    })),
                    Voucher: { ...this.data.Voucher }
                }
                this.timerWeight();
            } else {
                this.tipText = res.data.msg;
                this.isTipShow = true;
            }
        });

        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        this.buttonarr.forEach((item) => {
            if (item.RightName == "展示/隐藏原料名称") {
                this.cxid = item.RightID
            }
            if (item.RightName == "大件物料判定权限") {
                this.laid = item.RightID
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

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.laid}`,
        }).then(res => {
            this.lashow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })


    },
    beforeDestroy() {
        clearTimeout(this.weightTimer)
    },
    destroyed() {
        clearTimeout(this.weightTimer)
    },
    methods: {
        timerWeight() {
            clearTimeout(this.weightTimer)

            this.$axios({
                method: 'get',
                url: `/api/PreparationVoucher/GetScales`,
            }).then((res) => {
                if (res.data.code == 0) {
                    this.chengList = res.data.data;
                    this.formData.GroupedDetails.forEach(_ => {
                        _.Details.forEach(_2 => {
                            _2.WeighInfo.forEach(_3 => {
                                _3.ActualWeight = (_3.ScaleNo && !_2.IsLarge && !_2.IsPrint && this.chengList.some((_) => _.Text == _3.ScaleNo)) ? this.chengList.find((_) => _.Text == _3.ScaleNo).Weight : _3.ActualWeight
                            })
                        })

                    })
                }
                this.weightTimer = setTimeout(() => {
                    this.timerWeight();
                }, 2000)
            });

        },
        checkla(_) {
            if (!this.lashow) {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '该账户没有权限！';
                return
            }
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
        tipCallBack(str) {
            this.isTipShow = false;
        },
        eveFn() {
            if (!this.cxshow) {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '该账户没有权限！';
                return
            }
            this.eye = !this.eye;
        },
        checkNum(row, type) {
            if (row[type] && Number(row[type]) == 0) {
                row[type] = '';
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '包装数量请输入正整数！';

            } else if (row[type] && !this.isPositiveInteger(row[type])) {
                row[type] = '';
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '包装数量请输入正整数！';
            }
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        addRow2(item) {
            this.nowIdx = this.nowIdx + 1;
            item.WeighInfo.push({
                ActualWeight: 0,
                Id: 0,
                MaterialBatchNo: '',
                PackingQty: 0,
                PackingQtyDenom: 0,
                ScaleNo: '',
                VoucherId: item.Id,
                nowIdx: this.nowIdx
            })

        },
        delRow2(item, row) {
            if (item.WeighInfo.length == 1) {
                item.WeighInfo = []
                this.addRow2(item)
            } else {
                if (row.Id) {
                    item.WeighInfo = item.WeighInfo.filter(_ => _.Id != row.Id)
                } else {
                    item.WeighInfo = item.WeighInfo.filter(_ => _.nowIdx != row.nowIdx)
                }
            }
        },
        checkBatch(item, row) {
            let _code = row.MaterialBatchNo;
            if (!_code) {
                return;
            }
            if (_code.indexOf('_') > 0) {
                let arr = _code.split('_');
                if (item.MaterialNo == arr[0]) {
                    row.MaterialBatchNo = arr[1];
                    this.getScaleWeight(row);
                } else {
                    this.isTipShow = true;
                    this.noCancel = true;
                    this.tipText = '该原料批次不属于该原料，请检查';
                    row.MaterialBatchNo = '';
                }
            } else {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '该原料批次不属于该原料，请检查';
                row.MaterialBatchNo = '';

            }
        },
        jumpFn(item, _idx0) {
            if (!item.filterStr) {
                return
            }
            if (item.filterStr.indexOf('_') > 0) {
                let arr = item.filterStr.split('_');
                if (
                    item.Details.some(_ => _.MaterialNo == arr[0])
                ) {
                    let group = document.getElementsByClassName('tableItemMaterialNo');
                    for (let _item of group) {
                        let _prevClass = _item._prevClass.split(' ')
                        if (_prevClass.includes('tableItemMaterialNo' + _idx0) && _item.innerText == arr[0]) {
                            document.getElementById('contentScroll' + _idx0).scrollTop = _item.offsetTop
                            _item.parentNode.style.background = 'yellow'
                            setTimeout(() => {
                                _item.parentNode.style.background = '#fff'
                            }, 2000);
                            item.filterStr = '';


                            this.formData.GroupedDetails[_idx0].Details.forEach(_i => {
                                if (_i.MaterialNo == arr[0]) {
                                    if (_i.WeighInfo.some(_3 => !_3.MaterialBatchNo)) {
                                        let _o = _i.WeighInfo.find(_3 => !_3.MaterialBatchNo);
                                        _o.MaterialBatchNo = arr[1]
                                    } else {
                                        this.isTipShow = true;
                                        this.tipText = '请增加原料批次';
                                        return
                                    }
                                }
                            })
                            return
                        }
                    }
                } else {
                    this.isTipShow = true;
                    this.noCancel = true;
                    this.tipText = '该原料不存在，请检查';
                }
            } else {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '该原料不存在，请检查';
            }

            item.filterStr = '';

        },
        stroageFn() {
            let val = this.formData;
            this.$axios({
                method: 'post',
                url: `/api/PreparationVoucher/SaveDraft`,
                data: {
                    Id: val.Voucher.Id,
                    Weigher: val.Voucher.Weigher,
                    Details: val.GroupedDetails.reduce((cur, next) => cur.concat(next.Details), [])
                },
            }).then((res) => {
                if (res.data.code == 0) {
                    this.$emit('xdEditPopCallBack', 'no', {}, `保存草稿成功`);
                } else {
                    this.tipText = res.data.msg;
                    this.isTipShow = true;
                }
            });
        },
        handleClick(str) {
            this.$emit('xdEditPopCallBack', str, this.formData);
        },
        getNowTime() {
            let date = new Date();
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },

        //加法
        //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
        //调用：accAdd(arg1,arg2) 
        //返回值：arg1加上arg2的精确结果 
        accAdd(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            console.log(arg1, arg2, m)
            return ((arg1 * m + arg2 * m) / m).toFixed(n);
        },

        doPrint(row) {
            //IsPrint为false只做样式改变不做逻辑限制
            if (!this.formData.Voucher.Weigher) {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '称量人为空，请检查！';
                return
            }
            if (row.WeighInfo.some(_ => !_.MaterialBatchNo)) {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '原料批次为空，请检查！';
                return
            }
            if (!row.PackingQty || !row.PackingQtyDenom) {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '包装数量为空，请检查！';
                return
            }
            let _weight = row.WeighInfo.reduce((prev, cur) => {
                return this.accAdd(prev, Number(cur.ActualWeight || 0));
            }, 0)
            if (
                _weight > row.UpperLimit || _weight < row.LowerLimit
            ) {
                this.isTipShow = true;
                this.noCancel = true;
                this.tipText = '重量不一致，请检查称重！';
                return
            }

            // this.nowTime = this.getNowTime()
            // this.printrow = { ...row };
            // let str = `${row.MaterialNo}_${row.ActualWeight}`
            // document.getElementById('qrcode').innerHTML = '';
            // let qrcode = new QRCode('qrcode', {
            //     width: 230,
            //     height: 230
            // });
            // qrcode.clear() //清除二维码 
            // qrcode.makeCode(str)
            // setTimeout(() => {
            //     this.printFn();
            // });

            row.IsPrint = true;
            this.$axios({
                method: 'post',
                url: `http://localhost:8809/PrintData?id=${row.VoucherId}&printType=2&labelId=${row.Id}&materialNo=${row.MaterialNo
                    }&materialName=${encodeURIComponent(encodeURIComponent(row.MaterialName))}&weigher=${encodeURIComponent(encodeURIComponent(this.formData.Voucher.Weigher))}&packingQty=${row.PackingQty
                    }&packingQtyDenom=${row.PackingQtyDenom}&actualWeight=${row.WeighInfo.map(_ => _.ActualWeight).join('|')}&materialBatchNo=${row.WeighInfo.map(_ => _.MaterialBatchNo).join(',')}`,
                // data: {
                //     id: row.Id,
                //     printType: 2,
                //     request: {
                //         Id: row.Id,
                //         VoucherId: row.VoucherId,
                //         MaterialNo: row.MaterialNo,
                //         MaterialName: row.MaterialName,
                //         Weigher: this.formData.Voucher.Weigher,
                //         PackingQty: row.PackingQty,
                //         PackingQtyDenom: row.PackingQtyDenom,
                //         ActualWeight: row.WeighInfo.map(_ => _.ActualWeight).join('|'),
                //         BoilerGroup: row.BoilerGroup
                //     }
                // }
            })
            // this.$axios({
            //     method: 'post',
            //     url: `/api/PreparationVoucher/PrintLabel`,
            //     data: {
            //         Id: row.Id,
            //         VoucherId: row.VoucherId,
            //         MaterialNo: row.MaterialNo,
            //         MaterialName: row.MaterialName,
            //         Weigher: this.formData.Voucher.Weigher,
            //         PackingQty: row.PackingQty,
            //         PackingQtyDenom: row.PackingQtyDenom,
            //         ActualWeight: row.WeighInfo.map(_ => _.ActualWeight).join('|'),
            //         BoilerGroup: row.BoilerGroup
            //     }
            // }).then((res) => {
            //     if (res.data.code == 0) {
            //         row.IsPrint = true;
            //     } else {
            //         this.noCancel = true;
            //         this.tipText = res.data.msg;
            //         this.isTipShow = true;
            //     }
            // });
        },
        printFn() {
            let dom = document.getElementById('print-content2');
            html2Canvas(dom).then(function (canvas) {
                let pageDataHtml = canvas.toDataURL('image/jpeg');
                const printWindow = window.open('page.html');
                printWindow.document.write(
                    '<img src="' + pageDataHtml + '" />'
                );
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                });

                //浏览器有点大病，printWindow点击取消时没问题，点击标签栏x的时候判断不出页面回来了，导致本页面获取不了焦点
                //新开一个页面再关掉让他明白我回来了
                printWindow.onbeforeunload = () => {
                    const win = window.open('data:')
                    win.close()
                }
            });
        }
    },

};
</script>

<style lang="scss" scoped>
.zdeditPop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: fit-content;
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
            width: fit-content;
            height: 700px;
            max-height: calc(100vh - 200px);
            overflow-y: auto;
            padding: 20px;
            padding-bottom: 0;

            .content1 {
                width: 100%;
                height: auto;

                .content1-line {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

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

            .groupedDetails-list {
                .groupedDetails-label {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: 16px;
                    box-sizing: border-box;
                    margin-bottom: 10px;

                    .groupedDetails-left {

                        display: flex;
                        align-items: center;

                        .groupedDetails-title {
                            width: 300px;
                            margin-right: 20px;
                            position: relative;

                            .groupedDetails-tips {
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                transform: translate(0, 100%);
                                color: #AAAAAA;
                            }
                        }
                    }

                    .groupedDetails-right {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 4px;
                        border: 1px solid #000;
                        background: #fff;
                        padding: 3px 5px;
                        cursor: pointer;

                        img {
                            width: 16px;
                            height: 16px;
                            margin-right: 5px;
                        }
                    }
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
                        padding: 0 5px;
                        min-height: 50px;

                        .table-item-child {
                            width: 100%;
                            height: 50px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 0 5px;
                            box-sizing: border-box;
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
                    width: 100px;
                }

                .t3 {
                    width: 100px;
                }

                .t4 {
                    width: 100px;
                }

                .t5 {
                    width: 170px;
                }

                .t6 {
                    width: 200px;
                    display: flex;
                    align-items: center;
                    flex-direction: row !important;
                }

                .t7 {
                    width: 150px;
                }

                .t8 {
                    width: 200px;

                    .table-item-child {
                        position: relative;

                        .close-circle {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 26px;
                            height: 26px;
                            border-radius: 23px;
                            border: #999999 1px solid;
                            background-color: #fff;
                            position: absolute;
                            right: 0;
                            top: 0;
                            z-index: 99;
                            transform: translate(50%, -50%);
                            cursor: pointer;

                            img {
                                width: 16px;
                                height: 16px;

                            }
                        }
                    }
                }


                .t9 {
                    width: 135px;
                }

                .t10 {
                    width: 135px;
                }

                .t11 {
                    width: calc(100% - 1370px);
                    min-width: 150px;
                    display: flex;
                    align-items: center;
                    flex-direction: row !important;
                }
            }

        }


        .popBtn {
            width: 100%;
            height: 60px;
            text-align: center;

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

    .print2 {
        width: 750px;
        height: auto;
        position: fixed;
        right: 0;
        top: 0;
        transform: translate(100%, 0);
        background-color: #f2f2f2;
        border: 2px solid #a8a4a4;
        box-sizing: border-box;
        padding-bottom: 16px;
        font-size: larger;
        text-shadow: 0.15pt 0px 0px black,
            0.25pt 0px 0px black,
            0.35pt 0px 0px black,
            -0.25pt 0px 0px black,
            0px 0.25pt 0px black,
            0px -0.25pt 0px black;

        .print-title {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 100%;
            font-weight: bolder;
        }

        .print-content {
            width: 100%;
            height: auto;
            display: flex;

            .print-line {
                width: 50%;
                height: auto;

                .print-item {
                    height: auto;
                    width: 100%;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    margin-bottom: 5px;

                    .print-l {
                        width: 100px;
                        text-align: right;
                        line-height: 1.2;
                    }

                    .print-r {
                        width: 210px;
                        height: auto;
                        min-height: 36px;
                        line-height: 1;
                        margin-left: 10px;
                        background-color: #fff;
                        border: 2px solid #dddddd;
                        padding: 2px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        word-break: break-all;
                    }
                }

                .print-img {
                    margin-top: 16px;
                    height: auto;
                    width: 100%;
                    display: flex;
                    justify-content: center;

                    .print-img-box {
                        width: 250px;
                        height: 250px;
                        background-color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .print-qrcode {
                            width: 230px;
                            height: 230px;
                        }
                    }

                }

            }
        }
    }

    @media (max-width: 850px) {
        .myDialog {
            width: 100vw;

            .popContent {
                width: 100%;

                .t1 {
                    width: 50px !important;
                }

                .t2 {
                    width: 40px !important;
                    word-break: break-all;
                }

                .t3 {
                    width: 40px !important;
                    word-break: break-all;
                }

                .t4 {
                    width: 40px !important;
                    word-break: break-all;
                }

                .t5 {
                    width: 100px !important;
                    word-break: break-all;
                }

                .t6 {
                    width: 140px !important;
                }

                .t7 {
                    width: 80px !important;
                }

                .t8 {
                    width: 80px !important;
                }

                .t9 {
                    width: 40px !important;
                    word-break: break-all;
                }

                .t10 {
                    width: 40px !important;
                    word-break: break-all;
                }

                .t11 {
                    width: calc(100% - 660px) !important;
                }

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

    .el-table th,
    .el-table tr,
    .el-table tr.high-light:nth-child(even) {
        background-color: #fff;
    }
}
</style>