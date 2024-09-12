<!--
 * @Description: 备件管理基本设置界面
 * @Date: 2019-11-25 19:14:35
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-25 19:15:48
 -->
<template>
    <div class="base">
        <div class="header" :style="{ zoom: a11 }">
            <div class="equipment" :class="{ change: div == 1 }" @click="equipment">
                {{ lang.SparePartsManage_TypeSpareParts }}
            </div>
            <div class="install" :class="{ change: div == 0 }" @click="install">
                {{ lang.SparePartsManage_WarehouseLocation }}
            </div>
        </div>
        <div class="container">
            <div class="Dendrogram" :style="{ zoom: a11 }">
                <div class="imglist">
                    <div class="img" @click="addnav">
                        <img :src="addfiles" alt />
                    </div>
                    <div class="img" @click="changnav">
                        <img :src="add" alt />
                    </div>
                    <div class="img" @click="delnav">
                        <img :src="del" alt />
                    </div>
                </div>
                <div class="selecttree">
                    <el-tree :data="data5" @node-click="handleNodeClick" default-expand-all ref="treeBox" node-key="NID"
                        :highlight-current="true" icon-class="el-icon-arrow-up" :expand-on-click-node="false">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>
                                <img v-show="data.file" :src="data.file" alt class="img" />
                                <i :class="data.icon"></i>
                                {{ node.label }}
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <div class="data">
                <el-table stripe :data="tableData" height="95%" border :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                    highlight-current-row :row-style="{ height: 50 * a11 + 'px' }" :header-cell-style="{
                        background:
                            $store.state.color == 'grey'
                                ? '#D9DBDE'
                                : '#5a6c98',
                        color: $store.state.color == 'grey' ? '#000' : '#fff',
                        'border-left': '1px solid #cccccc',
                        height: 50 * a11 + 'px',
                        padding: '0'
                    }">
                    <template slot="empty">
                        <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
                    </template>
                    <el-table-column prop="Number" :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber"
                        :width="100 * a11"></el-table-column>
                    <el-table-column prop="NodeName" :label="lang.EquipmentAccount_EquipmentTypeName" v-if="div == 0"
                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="NodeDesc" :label="lang.EquipmentAccount_EquipmentTypeDescribe" v-if="div1 == 0"
                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="NodeName" :label="lang.EquipmentAccount_PositionName" v-if="div == 1"
                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="NodeDesc" :label="lang.EquipmentAccount_PositionDescribe" v-if="div1 == 1"
                        :show-overflow-tooltip="true"></el-table-column>
                </el-table>
                <div class="page">
                    <my-page :pageData="PageData" @req="req"></my-page>
                </div>
            </div>
        </div>
        <div class="add" v-show="write">
            <div class="add1"></div>
            <div class="addtop">
                <span v-if="div == 0">{{ lang.EquipmentAccount_EquipmentTypeEdit }} </span>
                <span v-if="div == 1">{{ lang.EquipmentAccount_PositionEdit }} </span>
                <img :src="no" class="imgno" alt @click="cancel" />
            </div>
            <div class="addcontent">
                <div class="addfather">
                    <span>{{ lang.EquipmentAccount_SubordinateSuperior }}</span>
                    <input type="text" v-model="addfather" disabled />
                </div>
                <div class="addname">
                    <span v-if="div == 0">{{ lang.EquipmentAccount_EquipmentTypeName }}</span>
                    <span v-if="div == 1">{{ lang.EquipmentAccount_PositionName }}</span>
                    <input type="text" v-model="addname" />
                </div>
                <div class="addsomething">
                    <span v-if="div == 0">{{ lang.EquipmentAccount_EquipmentTypeDescribe }}</span>
                    <span v-if="div == 1">{{ lang.EquipmentAccount_PositionDescribe }}</span>
                    <textarea name v-model="describe"></textarea>
                </div>
                <div class="no" @click="cancel">{{ lang.PopupCommon_Cancel }}</div>
                <div class="yes" @click="preservation">{{ lang.PopupCommon_Save }}</div>
            </div>
        </div>
        <div class="tip" v-show="tipchange">
            <div class="tiphead" style="position:absolute;width: 380px;height: 40px;"></div>
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword">{{ tipword }}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{ lang.MessageBox_Confrim }}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{ lang.MessageBox_NO }}</div>
                    <div class="two" @click="yes1">{{ lang.MessageBox_YES }}</div>
                </div>
            </div>
        </div>
        <div v-show="write" class="cover"></div>
        <div v-show="tipchange" class="cover1"></div>
    </div>
</template>

<script>
import MyPage from '../public/Pages11.vue';
export default {
    components: {
        MyPage
    },
    data() {
        return {
            addfiles: require('../../assets/images/icon_addfiles.png'),
            del: require('../../assets/images/icon_del.png'),
            add: require('../../assets/images/icon_add.png'),
            gth: require('../../assets/images/icon_gth.png'),
            no: require('../../assets/images/no.png'),
            div: 0,
            data5: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tableData: [],
            selectname: [],
            selectname1: [],
            addfather: '',
            addname: '',
            write: false,
            data: '',
            describe: '',
            divnum: '',
            depth: '',
            pdyd1: true,
            pdyd2: true,
            operator: '',
            tipchange: false,
            tipword: '',
            deltrue: true,
            or: 0,
            selectname3: '',
            a1: 1,
            a2: 1,
            oldname: '',
            PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            addnavdata: {},
            delnavdata: {},
            xz: 1,
            div1: 0,
            a11: 1,
            tableheight: '',
            jurisdiction: [],
            buttonarr: [],
            sbtjid: '',
            sbbjid: '',
            sbscid: '',
            aztjid: '',
            azbjid: '',
            azscid: '',
            sbtjshow: true,
            sbbjshow: true,
            sbscshow: true,
            aztjshow: true,
            azbjshow: true,
            azscshow: true,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    methods: {
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = ($(`.${name}`).width()) / 2 + 'px'
            let top = ($(`.${name}`).height()) / 2 + 'px'
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function (e) {

                console.log(e.target.className.toLocaleLowerCase());
                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center')
                    window.event.stopPropagation();
                    var x = 0;
                    var y = 0;
                    var l = 0;
                    var t = 0;
                    var isDown = false;
                    x = window.event.clientX;
                    y = window.event.clientY;
                    //获取左部和顶部的偏移量
                    l = $(`.${name}`)[0].offsetLeft;
                    t = $(`.${name}`)[0].offsetTop;
                    //开关打开
                    isDown = true;
                    var pdmove = false;


                    //设置样式
                    $('body')[0].style.cursor = 'move';

                    $('body')[0].addEventListener('mousemove', function (e) {
                        pdmove = true;
                        if (isDown == false) {
                            return;
                        }
                        //获取x和y
                        var nx = window.event.clientX;
                        var ny = window.event.clientY;

                        //计算移动后的左偏移量和顶部的偏移量
                        var nl = nx - (x - l);
                        var nt = ny - (y - t);
                        console.log(nx)
                        console.log(x)
                        console.log(l)
                        $(`.${name}`)[0].style.left = nl + 'px';
                        $(`.${name}`)[0].style.top = nt + 'px';
                    });
                    $('body')[0].addEventListener('mouseup', function (e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
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
        cancel() {
            this.write = false;
            this.describe = '';
            this.addname = '';
        },
        no1() {
            this.tipchange = false;
            this.deltrue = true;
        },
        yes1() {
            setTimeout(() => {
                $('.tip').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`
                });
                this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            this.pdyd1 = true;
            this.$axios({
                method: 'post',
                url: `/api/SparePartsManage/SparePartsManage_DeleteNode?argNodeID=${this.data.NID}`
            })

                .then(res => {
                    this.getEquipmentType();

                    this.tipword = this.lang.FormulaManage_HT_DeletedSuccessfully;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.deltrue = true;
                    this.xz = 1;
                })
                .then(() => {
                    this.tableData = [];
                    this.PageData = {
                        PageSize: 50,
                        TotalCount: 0,
                        TotalPage: 1,
                        PageIndex: 1,
                        LastEnabled: false,
                        NextEnabled: false
                    };

                    //                  this.$axios.post(
                    //     `/api/SparePartsManage/SparePartsManage_GstSubNodes?argNodeId=${this.data.FatherID}&argPageSize=50&argPageIndex=${this.PageData.PageIndex}`
                    // )
                    // .then(res1 => {
                    //     console.log(res1);
                    //     this.PageData = res1.data.data.ParameterList;
                    //     this.tableData = res1.data.data.DataList;
                    //     let i = 0;
                    //     for (i in this.tableData) {
                    //         this.tableData[i].Number = ++i;
                    //     }
                    // });
                    //       this.$nextTick(() => {
                    //                     this.$refs.treeBox.setCurrentKey(
                    //                         this.data.NID
                    //                     );
                    //       })
                })
                .catch(err => { });
        },
        tip1() {
            this.tipchange = false;
        },
        equipment() {
            this.div = 0;
            setTimeout(() => {
                this.div1 = 0;
            });
            this.addnavdata.Type = 1;
            this.data5[0].label = this.lang.SparePartsManage_TypeSpareParts
            this.selectword1();
            this.xz = 1;
        },
        install() {
            this.div = 1;
            setTimeout(() => {
                this.div1 = 1;
            });
            this.addnavdata.Type = 2;
            this.data5[0].label = this.lang.SparePartsManage_WarehouseLocation
            this.selectword();
            this.xz = 1;
        },
        handleNodeClick(data) {
            this.data = data;
            this.xz = 2;
            console.log(data);

            this.addnavdata.FatherID = data.NID;
            if (!data.FatherID) {
                this.delnavdata.FatherID = '';
                this.delnavdata.NodeId = data.NID;
            } else {
                this.delnavdata.FatherID = data.FatherID;
                this.delnavdata.NodeId = data.NID;
                let a = JSON.stringify(data.NodeName);
                this.delnavdata.OldName = JSON.parse(a);
            }
            this.$axios
                .post(
                    `/api/SparePartsManage/SparePartsManage_GstSubNodes?argNodeId=${data.NID}&argPageSize=50&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log(res);
                    this.PageData = res.data.data.ParameterList;
                    this.tableData = res.data.data.DataList;
                    let i = 0;
                    for (i in this.tableData) {
                        this.tableData[i].Number = ++i;
                    }
                });
        },

        addnav() {
            if (this.data5[0].label == this.lang.SparePartsManage_TypeSpareParts) {
                if (!this.sbtjshow) {
                    this.pdyd1 = true;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.NoOperationAuthority
                    return;
                }
            } else if (this.data5[0].label == this.lang.SparePartsManage_WarehouseLocation) {
                if (!this.aztjshow) {
                    this.pdyd1 = true;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.NoOperationAuthority
                    return;
                }
            }
            if (this.xz !== 1) {
                this.$axios
                    .post(
                        `/api/SparePartsManage/SparePartsManage_GstDataById?argNodeId=${this.data.NID}`
                    )
                    .then(res => {
                        if (
                            this.data.NID ==
                            '11111111-1111-1111-1111-111111111111' ||
                            this.data.NID ==
                            '22222222-2222-2222-2222-222222222222'
                        ) {
                            this.addfather = this.data.NodeName;
                        } else {
                            this.addfather = res.data.data.data.NodeName;
                        }

                        if (!this.addfather) {
                            setTimeout(() => {
                                $('.tip').css({
                                    zoom: this.a11,
                                    left: `calc(50% - ${($('.tip').width() /
                                        2) *
                                        this.a11}px)`,
                                    top: `calc(50% - ${($('.tip').height() /
                                        2) *
                                        this.a11}px)`
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd1 = true;
                            this.tipword = this.lang.SparePartsManage_SelectNode
                        } else {
                            if (this.data.NodeDepth !== 4) {
                                setTimeout(() => {
                                    $('.add').css({
                                        zoom: this.a11,
                                        left: `calc(50% - ${($('.add').width() /
                                            2) *
                                            this.a11}px)`,
                                        top: `calc(50% - ${($('.add').height() /
                                            2) *
                                            this.a11}px)`
                                    });
                                    this.write = true;
                                    this.move('add', 'add1');
                                });
                                this.pdyd2 = true;
                            } else if (
                                this.data.NodeDepth == 4 &&
                                this.div == 0
                            ) {
                                setTimeout(() => {
                                    $('.tip').css({
                                        zoom: this.a11,
                                        left: `calc(50% - ${($('.tip').width() /
                                            2) *
                                            this.a11}px)`,
                                        top: `calc(50% - ${($('.tip').height() /
                                            2) *
                                            this.a11}px)`
                                    });
                                    this.tipchange = true;
                                    this.move('tip', 'tiphead');
                                });
                                this.tipword = this.lang.SparePartsManage_NodeOverflow
                                return;
                            } else if (
                                this.data.NodeDepth == 4 &&
                                this.div == 1
                            ) {
                                setTimeout(() => {
                                    $('.tip').css({
                                        zoom: this.a11,
                                        left: `calc(50% - ${($('.tip').width() /
                                            2) *
                                            this.a11}px)`,
                                        top: `calc(50% - ${($('.tip').height() /
                                            2) *
                                            this.a11}px)`
                                    });
                                    this.tipchange = true;
                                    this.move('tip', 'tiphead');
                                });
                                this.tipword = this.lang.SparePartsManage_NodeOverflow
                                return;
                            }
                        }
                    });
                // this.addfather = this.data.label;
            } else {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.tipword = this.lang.SparePartsManage_SelectNode
            }

            this.or = 1;
            this.deltrue = true;

            if (this.data.NodeDepth) {
                this.depth = this.data.NodeDepth + 1;
            } else if (
                this.data.NID == '11111111-1111-1111-1111-111111111111' ||
                this.data.NID == '22222222-2222-2222-2222-222222222222'
            ) {
                this.depth = 2;
            }
            if (this.div == 0) {
                this.divnum = 1;
            } else if (this.div == 1) {
                this.divnum = 2;
            }
        },
        changnav() {
            if (this.data5[0].label == this.lang.SparePartsManage_TypeSpareParts) {
                if (!this.sbbjshow) {
                    this.pdyd1 = true;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.NoOperationAuthority
                    return;
                }
            } else if (this.data5[0].label == this.lang.SparePartsManage_WarehouseLocation) {
                if (!this.azbjshow) {
                    this.pdyd1 = true;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.NoOperationAuthority
                    return;
                }
            }
            if (this.xz !== 1) {
                this.addfather = this.data.label;
                if (!this.addfather) {
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.tipword = this.lang.SparePartsManage_SelectNode
                } else {
                    if (
                        this.data.NodeDepth !== 4 &&
                        this.addfather !== this.lang.SparePartsManage_TypeSpareParts &&
                        this.addfather !== this.lang.SparePartsManage_WarehouseLocation
                    ) {
                        setTimeout(() => {
                            $('.add').css({
                                zoom: this.a11,
                                left: `calc(50% - ${($('.add').width() / 2) *
                                    this.a11}px)`,
                                top: `calc(50% - ${($('.add').height() / 2) *
                                    this.a11}px)`
                            });
                            this.write = true;
                            this.move('add', 'add1');
                        });
                        this.pdyd2 = true;
                    }
                }

                this.deltrue = true;
                this.or = 2;
                if (this.data.NodeDepth) {
                    setTimeout(() => {
                        $('.add').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.add').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.add').height() / 2) *
                                this.a11}px)`
                        });
                        this.write = true;
                        this.move('add', 'add1');
                    });
                    this.pdyd2 = true;
                }

                if (this.data.NodeDepth) {
                    this.depth = this.data.NodeDepth + 1;
                } else if (
                    this.data.NID == '11111111-1111-1111-1111-111111111111' ||
                    this.data.NID == '22222222-2222-2222-2222-222222222222'
                ) {
                    this.depth = 2;
                }
                if (this.div == 0) {
                    this.divnum = 1;
                } else if (this.div == 1) {
                    this.divnum = 2;
                }
                let i = 0;
                for (i in this.selectname3) {
                    if (this.data.FatherID == this.selectname3[i].NID) {
                        this.addfather = this.selectname3[i].NodeName;
                    }
                }
                this.$axios
                    .post(
                        `/api/SparePartsManage/SparePartsManage_GstDataById?argNodeId=${this.data.NID}`
                    )
                    .then(res => {
                        console.log(res);
                        this.addname = res.data.data.data.NodeName;
                        this.oldname = res.data.data.data.NodeName;
                        this.describe = res.data.data.data.NodeDesc;
                    });
            } else {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.tipword = this.lang.SparePartsManage_SelectNode
            }
        },
        delnav() {
            if (this.data5[0].label == this.lang.SparePartsManage_TypeSpareParts) {
                if (!this.sbscshow) {
                    this.pdyd1 = true;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.NoOperationAuthority
                    return;
                }
            } else if (this.data5[0].label == this.lang.SparePartsManage_WarehouseLocation) {
                if (!this.azscshow) {
                    this.pdyd1 = true;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.tipword = this.lang.NoOperationAuthority
                    return;
                }
            }
            if (this.xz !== 1) {
                this.addfather = this.data.label;
                let a = this.data.NID;
                if (!this.addfather) {
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.tipword = this.lang.SparePartsManage_SelectNode
                }
                if (
                    this.data.NodeDepth &&
                    a !== '11111111-1111-1111-1111-111111111111' &&
                    a !== '22222222-2222-2222-2222-222222222222'
                ) {
                    this.deltrue = false;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    if (this.div === 0) {
                        this.tipword = /* '是否删除该类型？'; */this.lang.EquipmentAccount_SureToDeleteThisType
                    } else {
                        this.tipword = this.lang.EquipmentAccount_SureToDeleteThisPosition
                    }
                }
            } else {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd1 = true;
                this.tipword = this.lang.SparePartsManage_SelectNode
            }
        },
        selectword1() {
            let i = 0;
            let j = 1;
            for (i in this.selectname) {
                if (this.a1 == 1) {
                    if (this.selectname[i].NodeName == this.lang.SparePartsManage_TypeSpareParts) {
                        this.selectname[i].NID =
                            '11111111-1111-1111-1111-111111111111';
                    }
                    this.a1 = 2;
                }

                this.selectname[i].id = this.selectname[i].NID;
                this.selectname[i].label = this.selectname[i].NodeName;
                this.selectname[i].children = [];
                for (j in this.selectname) {
                    if (this.selectname[i].NID == this.selectname[j].FatherID) {
                        this.selectname[i].children.push(this.selectname[j]);
                    }
                    if (this.selectname[i].children.length !== 0) {
                        this.selectname[
                            i
                        ].file = require('../../assets/images/icon_file.png');
                    }
                }
            }
            console.log(this.selectname);
            console.log(this.selectname1);
            this.data5 = [];
            this.data5.push(this.selectname[0]);
        },
        selectword() {
            let i = 0;
            let j = 1;
            for (i in this.selectname1) {
                if (this.a2 == 1) {
                    if (this.selectname1[i].NodeName == this.lang.SparePartsManage_WarehouseLocation) {
                        this.selectname1[i].NID =
                            '22222222-2222-2222-2222-222222222222';
                    }
                    this.a2 = 2;
                }

                this.selectname1[i].id = this.selectname1[i].NID;
                this.selectname1[i].label = this.selectname1[i].NodeName;
                this.selectname1[i].children = [];
                for (j in this.selectname1) {
                    if (
                        this.selectname1[i].NID == this.selectname1[j].FatherID
                    ) {
                        this.selectname1[i].children.push(this.selectname1[j]);
                    }
                    if (this.selectname1[i].children.length !== 0) {
                        this.selectname1[
                            i
                        ].file = require('../../assets/images/icon_file.png');
                    }
                }
            }

            this.data5 = [];
            this.data5.push(this.selectname1[0]);
        },
        // 获取所有备件类型和库房位置
        getEquipmentType() {
            this.$axios
                .post(
                    `/api/SparePartsManage/SparePartsManage_GstSparePartsType`
                )
                .then(res => {
                    console.log(res);
                    this.a1 = 1;
                    this.a2 = 1;
                    this.selectname3 = res.data.data;
                    this.selectname1 = [
                        ...res.data.data.filter(val => {
                            return val.NodeType === 2;
                        })
                    ];
                    this.selectname = [
                        ...res.data.data.filter(val => {
                            return val.NodeType === 1;
                        })
                    ];
                    this.selectname.unshift({
                        NodeName: this.lang.SparePartsManage_TypeSpareParts
                    });
                    this.selectname1.unshift({
                        NodeName: this.lang.SparePartsManage_WarehouseLocation
                    });

                    this.selectname3.unshift({
                        NodeName: this.lang.SparePartsManage_TypeSpareParts,
                        NID: '11111111-1111-1111-1111-111111111111'
                    });
                    this.selectname3.unshift({
                        NodeName: this.lang.SparePartsManage_WarehouseLocation,
                        NID: '22222222-2222-2222-2222-222222222222'
                    });
                    console.log(this.selectname);
                    console.log(this.selectname1);

                    console.log(this.data5);
                })
                .then(() => {
                    if (this.div == 0) {
                        this.selectword1();
                    } else {
                        this.selectword();
                    }
                })
                .catch(err => { });
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.PageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.PageData.TotalPage
                        ) {
                            this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            setTimeout(() => {
                                $('.tip').css({
                                    zoom: this.a11,
                                    left: `calc(50% - ${($('.tip').width() /
                                        2) *
                                        this.a11}px)`,
                                    top: `calc(50% - ${($('.tip').height() /
                                        2) *
                                        this.a11}px)`
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd1 = true;
                            return;
                        }
                    }
                }
            }

            this.PageData.PageIndex = pageIndex;
            this.$axios
                .post(
                    `/api/SparePartsManage/SparePartsManage_GstSubNodes?argNodeId=${this.data.NID}&argPageSize=50&argPageIndex=${this.PageData.PageIndex}`
                )
                .then(res => {
                    console.log(res);
                    this.PageData = res.data.data.ParameterList;
                    this.tableData = res.data.data.DataList;
                    let i = 0;
                    for (i in this.tableData) {
                        this.tableData[i].Number = ++i;
                    }
                });
        },
        preservation() {
            if (this.or == 1) {
                this.addnavdata.Name = this.addname;
                this.addnavdata.Descript = this.describe;
                if (this.addfather) {
                    this.$axios({
                        method: 'post',
                        url: `/api/SparePartsManage/SparePartsManage_AddNode`,
                        data: this.addnavdata
                    })
                        .then(res => {
                            if (res.data.msg == '请求成功') {
                                setTimeout(() => {
                                    $('.tip').css({
                                        zoom: this.a11,
                                        left: `calc(50% - ${($('.tip').width() /
                                            2) *
                                            this.a11}px)`,
                                        top: `calc(50% - ${($('.tip').height() /
                                            2) *
                                            this.a11}px)`
                                    });
                                    this.tipchange = true;
                                    this.move('tip', 'tiphead');
                                });
                                this.pdyd1 = true;
                                this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded
                                this.write = false;
                                this.getEquipmentType();
                                this.describe = '';
                                this.addname = '';
                            } else {
                                setTimeout(() => {
                                    $('.tip').css({
                                        zoom: this.a11,
                                        left: `calc(50% - ${($('.tip').width() /
                                            2) *
                                            this.a11}px)`,
                                        top: `calc(50% - ${($('.tip').height() /
                                            2) *
                                            this.a11}px)`
                                    });
                                    this.tipchange = true;
                                    this.move('tip', 'tiphead');
                                });
                                this.pdyd1 = true;
                                this.tipword = res.data.msg;
                            }
                        })
                        .then(res1 => {
                            this.$axios
                                .post(
                                    `/api/SparePartsManage/SparePartsManage_GstSubNodes?argNodeId=${this.data.NID}&argPageSize=50&argPageIndex=${this.PageData.PageIndex}`
                                )
                                .then(res1 => {
                                    console.log(res1);
                                    this.PageData =
                                        res1.data.data.ParameterList;
                                    this.tableData = res1.data.data.DataList;
                                    let i = 0;
                                    for (i in this.tableData) {
                                        this.tableData[i].Number = ++i;
                                    }
                                });
                            this.$nextTick(() => {
                                this.$refs.treeBox.setCurrentKey(this.data.NID);
                            });
                        })
                        .catch(err => { });
                }
            } else {
                this.delnavdata.Name = this.addname;
                this.delnavdata.Descript = this.describe;
                this.$axios({
                    method: 'post',
                    url: `/api/SparePartsManage/SparePartsManage_UpdateNode`,
                    data: this.delnavdata
                })
                    .then(res => {
                        console.log(res);
                        if (res.data.msg == '请求成功') {
                            setTimeout(() => {
                                $('.tip').css({
                                    zoom: this.a11,
                                    left: `calc(50% - ${($('.tip').width() /
                                        2) *
                                        this.a11}px)`,
                                    top: `calc(50% - ${($('.tip').height() /
                                        2) *
                                        this.a11}px)`
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd1 = true;
                            this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully
                            this.write = false;
                            this.getEquipmentType();
                            this.describe = '';
                            this.addname = '';
                        } else {
                            setTimeout(() => {
                                $('.tip').css({
                                    zoom: this.a11,
                                    left: `calc(50% - ${($('.tip').width() /
                                        2) *
                                        this.a11}px)`,
                                    top: `calc(50% - ${($('.tip').height() /
                                        2) *
                                        this.a11}px)`
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd1 = true;
                            this.tipword = res.data.msg;
                        }
                    })
                    .catch(err => { });
            }
        }
    },

    created() {
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        this.buttonarr.forEach(item => {
            if (item.RightName == '基本设置-备件类型-添加按钮') {
                this.sbtjid = item.RightID;
            } else if (item.RightName == '基本设置-备件类型-编辑按钮') {
                this.sbbjid = item.RightID;
            } else if (item.RightName == '基本设置-备件类型-删除按钮') {
                this.sbscid = item.RightID;
            } else if (item.RightName == '基本设置-库房位置-添加按钮') {
                this.aztjiid = item.RightID;
            } else if (item.RightName == '基本设置-库房位置-编辑按钮') {
                this.azbjid = item.RightID;
            } else if (item.RightName == '基本设置-库房位置-删除按钮') {
                this.azscid = item.RightID;
            }
        });
        var userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                .SCMSUserID;
        } else {
            userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.sbtjid}`
        })
            .then(res => {
                this.sbtjshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.sbscid}`
        })
            .then(res => {
                this.sbscshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.sbbjid}`
        })
            .then(res => {
                this.sbbjshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.aztjiid}`
        })
            .then(res => {
                this.aztjshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.azbjid}`
        })
            .then(res => {
                this.azbjshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.azscid}`
        })
            .then(res => {
                this.azscshow = res.data.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        this.getEquipmentType();
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            this.longinnum = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserAccount;
        } else {
            this.longinnum = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserAccount;
        }
    },
    mounted() {
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.8;
        }
        setTimeout(() => {
            let a = this.a11 * 50 + 10 + 'px';
            let b = this.a11 * 630 + 20 + 'px';
            $('.container').css({
                height: `calc(100% - ${a})`
            });
            $('.data').css({
                width: `calc(100% - ${b})`
            });
            let c = $('.page')[0].clientHeight + 'px';
            this.tableheight = `calc(100% - ${c})`;
        });
        this.addnavdata.Type = 1;
    }
};
</script>

<style lang="scss" scoped>
.add1 {
    width: 100%;
    position: absolute;
    height: 50px;
}

.cover {
    width: 100%;
    height: 100%;
    z-index: 11;
    position: fixed;
    top: 0;
    left: 0;
}

.cover1 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}

.header {
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    font-size: 16px;
    color: #7f6f79;
    height: 50px !important;
    line-height: 50px;
    padding: 0px 22px 0px 22px;

    .equipment {
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        background-color: #4270E4;
        color: #ffffff;
        text-align: center;
        display: inline-block;
        padding: 0 20px;
    }

    .install {
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        background-color: #4270E4;
        color: #ffffff;
        text-align: center;
        display: inline-block;
        padding: 0 20px;
    }

    .change {
        color: #555555;
        background-color: #f0f0f0;
    }
}

.add {
    width: 640px;
    height: 400px;
    top: 250px;
    left: 600px;
    position: fixed;
    z-index: 12;

    .addtop {
        height: 60px;
        width: 640px;
        background-color: #386df0;
        color: #ffffff;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        z-index: 11;

        img {
            position: absolute;
            width: 24px;
            height: 24px;
            right: 20px;
            cursor: pointer;
            top: 20px;
            z-index: 13;
        }
    }

    .addcontent {
        padding: 30px 78px 0px 78px;
        width: 640px;
        height: calc(100% - 60px);
        background-color: #eeeeee;
    }

    .addfather {
        margin-bottom: 10px;
        display: flex;

        input {
            width: 400px;
            background-color: #f4f4f4;
            border: none;
            border: 1px solid #cccccc;
            text-indent: 1em;
            height: 35px;
        }

        span {
            display: inline-block;
            width: 120px;
            margin-right: 20px;
        }
    }

    .addname {
        margin-bottom: 10px;
        display: flex;

        input {
            width: 400px;
            border: none;
            text-indent: 1em;
            border: 1px solid #cccccc;
            height: 35px;
        }

        span {
            display: inline-block;
            width: 120px;
            margin-right: 20px;
        }
    }

    .addsomething {
        display: flex;

        span {
            margin-right: 20px;
            width: 120px;
        }

        textarea {
            height: 135px;
            width: 400px;
            text-indent: 1em;
        }
    }

    .no {
        display: inline-block;
        width: 100px;
        height: 35px;
        text-align: center;
        background-color: #999999;
        color: #ffffff;
        border-radius: 5px;
        line-height: 35px;
        margin-top: 20px;
        margin-left: 273px;
        margin-right: 10px;
        cursor: pointer;
    }

    .yes {
        cursor: pointer;
        display: inline-block;
        border-radius: 4px;
        width: 100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background-color: #386df0;
        color: #ffffff;
    }
}

.base {
    height: 100%;
    border: 1px solid #cccccc;

    .container {
        height: calc(100% - 60px);
        padding: 20px 20px 0px 20px;
        width: 100%;
        overflow: hidden;
    }

    .Dendrogram {
        height: 100%;
        width: 630px;
        border: 1px solid #cccccc;
        float: left;

        .imglist {
            width: 628px;
            height: 45px;
            background-color: #f4f4f4;
            border: 1px solid #cccccc;
            border-bottom: none;
            overflow: hidden;

            .img {
                height: 41px;
                margin-top: 2px;
                border: 1px solid #f4f4f4;
                width: 60px;
                float: left;
                background-color: #ffffff;
                margin-right: 2px;
                position: relative;

                img {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }
        }

        .img {
            width: 24px;
            height: 24px;
            vertical-align: bottom;
        }
    }

    .data {
        margin-left: 20px;
        width: calc(100% - 650px);
        height: calc(100% - 10px);
        float: left;
        // border: 1px solid #cccccc;
    }
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

    .tipcontanin {
        height: calc(100% - 40px);
    }

    .tipword {
        width: 100%;
        height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        text-align: center;
    }

    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
        // margin-top: 40px;
        margin-left: 25px;
        height: 30px;

        .one {
            display: inline-block;
            height: 30px;
            width: 160px;
            cursor: pointer;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }

        .two {
            display: inline-block;
            height: 30px;
            cursor: pointer;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}

.page {
    height: 5%;
    width: 100%;
}

.img {
    cursor: pointer;
}

.yd {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}

img {
    cursor: pointer;
}
</style>
