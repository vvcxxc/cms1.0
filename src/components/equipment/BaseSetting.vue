<!--
 * @Description: 设备台帐基本设置界面
 * @Date: 2019-11-25 19:14:35
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 16:39:22
 -->
<template>
    <div class="base">
        <div class="header" :style="{ zoom: a11 }">
            <div
                class="equipment"
                :class="{ change: div == 1 }"
                @click="equipment"
            >
                {{lang.EquipmentAccount_EquipmentType}}
            </div>
            <div class="install" :class="{ change: div == 0 }" @click="install">
                {{lang.EquipmentAccount_InstallPosition}}
            </div>
        </div>
        <div class="container">
            <div class="Dendrogram" :style="{ zoom: a11 }">
                <div
                    class="imglist"
                    :class="{ colordiv: $store.state.color == 'grey' }"
                >
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
                <div
                    class="ys"
                    :class="{ colortip: $store.state.color == 'grey' }"
                >
                    <el-tree
                        :class="{ colortip: $store.state.color == 'grey' }"
                        :data="data5"
                        ref="treeBox"
                        @node-click="handleNodeClick"
                        node-key="NID"
                        :highlight-current="true"
                        default-expand-all
                        :expand-on-click-node="false"
                        icon-class="el-icon-arrow-up"
                        @keyup.down.native="down"
                        @keyup.up.native="up"
                    >
                        <span
                            class="custom-tree-node"
                            slot-scope="{ node, data }"
                        >
                            <span>
                                <img
                                    v-show="data.file"
                                    :src="data.file"
                                    alt
                                    class="img"
                                />
                                <i :class="data.icon"></i>

                                {{ node.label }}
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>

            <div class="data">
                <el-table
                    stripe
                    :data="tableData"
                    height="95%"
                    border
                    :style="{ fontSize: a11 * 15 + 'px', width: '100%' }"
                    highlight-current-row
                    :row-style="{ height: 50 * a11 + 'px' }"
                    :header-cell-style="{
                        background:
                            $store.state.color == 'grey'
                                ? '#D9DBDE'
                                : '#5a6c98',
                        color: $store.state.color == 'grey' ? '#000' : '#fff',
                        'border-left': '1px solid #cccccc',
                        height: 50 * a11 + 'px',
                        padding: '0'
                    }"
                    tooltip-effect="dark"
                >
                    <template slot="empty">
                        <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                    </template>
                    <el-table-column
                        prop="Number"
                        :label="lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber"
                        :width="100*a11"
                    ></el-table-column>
                    <el-table-column
                        prop="NodeName"
                        :label="lang.EquipmentAccount_EquipmentTypeName"
                        v-if="div == 0"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="NodeDesc"
                        :label="lang.EquipmentAccount_EquipmentTypeDescribe"
                        v-if="div1 == 0"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="NodeName"
                        :label="lang.EquipmentAccount_PositionName"
                        v-if="div == 1"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="NodeDesc"
                        :label="lang.EquipmentAccount_PositionDescribe"
                        v-if="div1 == 1"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                </el-table>
                <div class="page">
                    <my-page :pageData="PageData" @req="req"></my-page>
                </div>
            </div>
        </div>
        <div class="add" v-show="write" :style="{ zoom: a11 }">
            <div class="add1"></div>
            <div
                class="addtop"
                :class="[
                    { colordiv: $store.state.color == 'grey' },
                    { fcolor: $store.state.color == 'grey' }
                ]"
            >
                <span v-if="div == 0">{{lang.EquipmentAccount_EquipmentTypeEdit}} </span>
                <span v-if="div == 1">{{lang.EquipmentAccount_PositionEdit}} </span>
                <img
                    :src="no2"
                    alt
                    v-if="$store.state.color == 'grey'"
                    @click="cancel"
                />
                <img :src="no" alt @click="cancel" v-else />
            </div>
            <div class="addcontent">
                <div class="addfather">
                    <span>{{lang.EquipmentAccount_SubordinateSuperior}}</span>
                    <input type="text" v-model="addfather" disabled />
                </div>
                <div class="addname">
                    <span v-if="div == 0">{{lang.EquipmentAccount_EquipmentTypeName}}</span>
                    <span v-if="div == 1">{{lang.EquipmentAccount_PositionName}}</span>
                    <input type="text" v-model="addname" />
                </div>
                <div class="addsomething">
                    <span v-if="div == 0">{{lang.EquipmentAccount_EquipmentTypeDescribe}}</span>
                    <span v-if="div == 1">{{lang.EquipmentAccount_PositionDescribe}}</span>
                    <textarea name v-model="describe"></textarea>
                </div>
                <div class="no" @click="cancel">{{lang.PopupCommon_Cancel}}</div>
                <div class="yes" @click="preservation">{{lang.PopupCommon_Save}}</div>
            </div>
        </div>
        <div class="tip" v-show="tipchange" :style="{ zoom: a11 }">
            <div
                class="tiphead"
                style="position:absolute;width: 380px;height: 40px;"
            ></div>
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword">{{tipword}}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">{{lang.MessageBox_Confrim}}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{lang.MessageBox_NO}}</div>
                    <div class="two" @click="yes1">{{lang.MessageBox_YES}}</div>
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
            a1: 1,
            pdyd: true,
            pdyd1: true,
            a2: 1,
            addfiles: require('../../assets/images/icon_addfiles.png'),
            del: require('../../assets/images/icon_del.png'),
            add: require('../../assets/images/icon_add.png'),
            gth: require('../../assets/images/icon_gth.png'),
            no: require('../../assets/images/no.png'),
            no2: require('../../assets/images/no2.png'),
            div: 0,
            data5: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            jurisdiction: [],
            buttonarr: [],
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
            operator: '',
            tipchange: false,
            tipword: '',
            deltrue: true,
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
            or: 0,
            div1: 0,
            selectname3: '',
            oldname: '',
            aab: 1,
            a11: 1,
            PageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
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
        });
    },
    methods: {
   move(name, namehead) {
          //  $(`.${name}`).addClass('center')
           let left = ($(`.${name}`).width())/2+'px'
           let top = ($(`.${name}`).height())/2+'px'
             $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
           $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
                
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

                    $('body')[0].addEventListener('mousemove', function(e) {
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
                    $('body')[0].addEventListener('mouseup', function(e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
        },
        up() {},
        down() {
            if (this.data !== '') {
                console.log(this.data);
                if (this.data !== '11111111-1111-1111-1111-111111111111') {
                    this.$axios
                        .post(
                            `/api/EquipmentAccount/EquipmentAccount_GstEquipmentTypeByID?argNID=${this.data.FatherID}`
                        )
                        .then(res => {
                            console.log(res);
                        });
                }
            }
        },
        cancel() {
            this.write = false;
            this.describe = '';
            this.addname = '';
        },
        no1() {
            this.tipchange = false;
        },
        yes1() {
            setTimeout(() => {
                $('.tip').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`
                });
                this.move('tip', 'tiphead');
            });
            this.pdyd1 = true;
            this.$axios({
                method: 'post',
                url: `/api/EquipmentAccount/EquipmentAccount_DeleteSetting?argNodeID=${this.data.NID}`
            })

                .then(res => {
                    this.getEquipmentType();
                })
                .then(() => {
                    this.tipword = this.lang.FormulaManage_HT_DeletedSuccessfully;
                    this.tableData = [];
                    this.PageData = {
                        PageSize: 50,
                        TotalCount: 0,
                        TotalPage: 0,
                        PageIndex: 1,
                        LastEnabled: false,
                        NextEnabled: false
                    };
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd1 = true;
                    this.deltrue = true;
                    this.$axios
                        .post(
                            `/api/EquipmentAccount/EquipmentAccount_GstEquipmentTypeByID?argNID=${this.data.FatherID}`
                        )
                        .then(res => {
                            this.data = res.data.data;

                            if (this.data !== '') {
                                this.$nextTick(() => {
                                    this.$refs.treeBox.setCurrentKey(
                                        this.data.NID
                                    );
                                });
                            }
                        });
                })
                .catch(err => {});
        },
        tip1() {
            this.tipchange = false;
        },
        equipment() {
            this.tableData = [];
            this.PageData = {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            };
            this.div = 0;
            setTimeout(() => {
                this.div1 = 0;
            });
            this.data5[0].label = this.lang.EquipmentAccount_EquipmentType;
            this.selectword1();
            this.abb = 1;
        },
        install() {
            this.tableData = [];
            this.PageData = {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            };
            this.div = 1;
            setTimeout(() => {
                this.div1 = 1;
            });
            this.data5[0].label = this.lang.EquipmentAccount_InstallPosition;
            this.selectword();
            this.abb = 2;
        },
        handleNodeClick(data) {
            console.log(data);
            this.data = data;
            this.$axios
                .post(
                    `/api/EquipmentAccount/EquipmentAccount_GstSubNodes?argNodeId=${this.data.NID}&argPageSize=50&argPageIndex=1`
                )
                .then(res => {
                    console.log(res);
                    this.tableData = res.data.data.DataList;
                    this.PageData = res.data.data.ParameterList;
                });

            let i = 0;
            for (i in this.tableData) {
                this.tableData[i].Number = ++i;
            }
            this.PageData.TotalCount = data.children.length;
            this.PageData.TotalPage = Math.ceil(data.children.length / 50);
            this.abb = 3;
        },
        addnav() {
            if (this.data5[0].label == this.lang.EquipmentAccount_EquipmentType) {
                if (!this.sbtjshow) {
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
            } else if (this.data5[0].label == this.lang.EquipmentAccount_InstallPosition) {
                if (!this.aztjshow) {
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
            this.pdyd = true;
            console.log(this.data);
            this.deltrue = true;
            this.or = 1;

            if (this.abb == 3) {
                if (
                    this.data.NID == '11111111-1111-1111-1111-111111111111' ||
                    this.data.NID == '22222222-2222-2222-2222-222222222222'
                ) {
                    this.addfather = this.data.NodeName;
                    if (
                        this.data.NodeDepth !== 4 &&
                        this.addfather !== undefined
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
                    } else if (this.data.NodeDepth == 4 && this.div == 0) {
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
                        this.tipword = this.lang.EquipmentAccount_NodeLevelCannotBeGreaterThan4Levels;
                        return;
                    } else if (this.data.NodeDepth == 4 && this.div == 1) {
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
                        this.tipword = this.lang.EquipmentAccount_NodeLevelCannotBeGreaterThan4Levels;
                        return;
                    }
                } else {
                    this.$axios
                        .post(
                            `/api/EquipmentAccount/EquipmentAccount_GstEquipmentTypeByID?argNID=${this.data.NID}`
                        )
                        .then(res => {
                            console.log(res);
                            this.addfather = res.data.data.NodeName;
                            console.log(this.data5);

                            if (
                                this.data.NodeDepth !== 4 &&
                                this.addfather !== undefined
                            ) {
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
                                this.tipword = this.lang.EquipmentAccount_NodeLevelCannotBeGreaterThan4Levels;
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
                                this.tipword = this.lang.EquipmentAccount_NodeLevelCannotBeGreaterThan4Levels;
                                return;
                            }
                        });
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
            }
        },
        changnav() {
            if (this.data5[0].label == this.lang.EquipmentAccount_EquipmentType) {
                if (!this.sbbjshow) {
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
            } else if (this.data5[0].label == this.lang.EquipmentAccount_InstallPosition) {
                if (!this.azbjshow) {
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
            this.pdyd = true;
            console.log(this.data);
            this.deltrue = true;
            this.or = 2;

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
                    `/api/EquipmentAccount/EquipmentAccount_GstEquipmentTypeByID?argNID=${this.data.NID}`
                )
                .then(res => {
                    console.log(res);
                    this.addname = res.data.data.NodeName;
                    this.oldname = res.data.data.NodeName;
                    this.describe = res.data.data.NodeDesc;
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
                    }
                });
        },
        delnav() {
            if (this.data5[0].label == this.lang.EquipmentAccount_EquipmentType) {
                if (!this.sbscshow) {
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
            } else if (this.data5[0].label == this.lang.EquipmentAccount_InstallPosition) {
                if (!this.azscshow) {
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
            if (this.data.NodeDepth) {
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
                    this.tipword = this.lang.EquipmentAccount_SureToDeleteThisType;   
                } else {
                    this.tipword = this.lang.EquipmentAccount_SureToDeleteThisPosition; 
                }
                // this.tipword = this.lang.EquipmentAccount_SureToDeleteThisType;
            }
        },
        selectword1() {
            let i = 0;
            let j = 1;
            for (i in this.selectname) {
                if (this.a2 == 1) {
                    if (this.selectname[i].NodeName == this.lang.EquipmentAccount_EquipmentType) {
                        this.selectname[i].NID =
                            '11111111-1111-1111-1111-111111111111';
                    }
                    this.a2 = 2;
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
            this.data5 = [];
            this.data5.push(this.selectname[0]);
            console.log(this.data5);
        },
        selectword() {
            let i = 0;
            let j = 1;
            for (i in this.selectname1) {
                if (this.a1 == 1) {
                    if (this.selectname1[i].NodeName == this.lang.EquipmentAccount_InstallPosition) {
                        this.selectname1[i].NID =
                            '22222222-2222-2222-2222-222222222222';
                    }
                    this.a1 = 2;
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
        // 获取所有设备类型和安装位置
        getEquipmentType() {
            this.$axios
                .post(`/api/EquipmentAccount/EquipmentAccount_GstEquipmentType`)
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
                        NodeName: this.lang.EquipmentAccount_EquipmentType
                    });
                    this.selectname1.unshift({
                        NodeName: this.lang.EquipmentAccount_InstallPosition
                    });

                    this.selectname3.unshift({
                        NodeName: this.lang.EquipmentAccount_EquipmentType,
                        NID: '11111111-1111-1111-1111-111111111111'
                    });
                    this.selectname3.unshift({
                        NodeName: this.lang.EquipmentAccount_InstallPosition,
                        NID: '22222222-2222-2222-2222-222222222222'
                    });
                })
                .then(() => {
                    if (this.div == 0) {
                        this.selectword1();
                    } else {
                        this.selectword();
                    }
                    if (this.data !== '') {
                        this.$nextTick(() => {
                            this.$refs.treeBox.setCurrentKey(this.data.NID);
                            //  this.GetSubJson(this.data5,this.data.NID,this.tableData);/*  */
                        });
                    }
                })
                .catch(err => {});
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

                   this.tipword = this.lang.RoleManage_HT_PEAPositiveInteger;
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
            this.$axios
                .post(
                    `/api/EquipmentAccount/EquipmentAccount_GstSubNodes?argNodeId=${this.data.NID}&argPageSize=50&argPageIndex=${pageIndex}`
                )
                .then(res => {
                    console.log(res);
                    this.tableData = res.data.data.DataList;
                    this.PageData = res.data.data.ParameterList;
                });
            // this.PageData.PageIndex = pageIndex;
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
        preservation() {
           
            // 1为设备信息   2为位置信息。
            let nodeType = this.div === 0 ? 1 : 2
            if (this.or == 1) {
                if (this.addfather) {
                    if (!this.describe) {
                        this.describe = '';
                    }
                    this.$axios
                        .post(
                            `/api/EquipmentAccount/EquipmentAccount_SetEquipmentSetting?argClass={"NID":"${this.data.NID}","FatherID":"${this.data.NID}","NodeName":"${this.addname}","NodeDesc":"${this.describe}","NodeDepth":${this.depth},"NodeType":${this.divnum}}&argOperateType=${this.or}&argOldName=${this.oldname}&argLoginUserName=${this.longinnum}&argFatherID=${this.data.FatherID}&nodeType=${nodeType}`
                        )
                        .then(res => {
                            if (
                                res.data.msg == '该类型名称已存在，请重新输入！'
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
                                this.pdyd1 = true;
                                this.tipword = res.data.msg
                            } else if (!this.addname) {
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
                                this.tipword = res.data.msg
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
                                this.tipword = this.lang.EquipmentAccount_SuccessfullyAdded
                                this.write = false;
                                this.$axios
                                    .post(
                                        `/api/EquipmentAccount/EquipmentAccount_GstSubNodes?argNodeId=${this.data.NID}&argPageSize=50&argPageIndex=1`
                                    )
                                    .then(res => {
                                        console.log(res);
                                        this.tableData = res.data.data.DataList;
                                        this.PageData =
                                            res.data.data.ParameterList;
                                    });
                                console.log('SSS');
                            }
                            this.getEquipmentType();

                            this.describe = '';
                            this.addname = '';
                        })
                        .catch(err => {});
                }
            } else {
                if (!this.describe) {
                    this.describe = '';
                }
                this.$axios
                    .post(
                        `/api/EquipmentAccount/EquipmentAccount_SetEquipmentSetting?argClass={"NID":"${this.data.NID}","FatherID":"${this.data.FatherID}","NodeName":"${this.addname}","NodeDesc":"${this.describe}","NodeDepth":${this.data.NodeDepth},"NodeType":${this.divnum}}&argOperateType=${this.or}&argOldName=${this.data.NodeName}&argLoginUserName=aa&argFatherID=${this.data.FatherID}&nodeType=${nodeType}`
                    )
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            if (
                                res.data.msg == '该类型名称已存在，请重新输入！'
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
                                this.pdyd1 = true;
                                this.tipword = res.data.msg
                            } else if (!this.addname) {
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
                                this.tipword = res.data.msg
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
                                this.write = false;
                                this.tipword = this.lang.FormulaManage_HT_FormulaSetting_ModifiedSuccessfully
                                this.$axios
                                    .post(
                                        `/api/EquipmentAccount/EquipmentAccount_GstEquipmentTypeByID?argNID=${this.data.NID}`
                                    )
                                    .then(res1 => {
                                        this.data = res1.data.data;
                                    });
                                this.$axios
                                    .post(
                                        `/api/EquipmentAccount/EquipmentAccount_GstSubNodes?argNodeId=${this.data.NID}&argPageSize=50&argPageIndex=1`
                                    )
                                    .then(res => {
                                        console.log(res);
                                        this.tableData = res.data.data.DataList;
                                        this.PageData =
                                            res.data.data.ParameterList;
                                    });
                            }
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
                    .catch(err => {});
            }
        }
    },
    watch: {
        VpowerData(val) {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            this.buttonarr.forEach(item => {
                if (item.RightName == '基本设置-设备类型-添加按钮') {
                    this.sbtjid = item.RightID;
                } else if (item.RightName == '基本设置-设备类型-编辑按钮') {
                    this.sbbjid = item.RightID;
                } else if (item.RightName == '基本设置-设备类型-删除按钮') {
                    this.sbscid = item.RightID;
                } else if (item.RightName == '基本设置-安装位置-添加按钮') {
                    this.aztjid = item.RightID;
                } else if (item.RightName == '基本设置-安装位置-编辑按钮') {
                    this.azbjid = item.RightID;
                } else if (item.RightName == '基本设置-安装位置-删除按钮') {
                    this.azscid = item.RightID;
                }
                var userid = '';
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserID;
                } else {
                    userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                        .SCMSUserID;
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
            });
        }
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    created() {
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        this.buttonarr.forEach(item => {
            if (item.RightName == '基本设置-设备类型-添加按钮') {
                this.sbtjid = item.RightID;
            } else if (item.RightName == '基本设置-设备类型-编辑按钮') {
                this.sbbjid = item.RightID;
            } else if (item.RightName == '基本设置-设备类型-删除按钮') {
                this.sbscid = item.RightID;
            } else if (item.RightName == '基本设置-安装位置-添加按钮') {
                this.aztjiid = item.RightID;
            } else if (item.RightName == '基本设置-安装位置-编辑按钮') {
                this.azbjid = item.RightID;
            } else if (item.RightName == '基本设置-安装位置-删除按钮') {
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
        if (
            !JSON.parse(sessionStorage.getItem('userInfo1')) ||
            JSON.parse(sessionStorage.getItem('userInfo1')) == null
        ) {
            this.longinnum = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserName;
        } else {
            this.longinnum = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserName;
        }
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
    z-index: 19999991;
    position: fixed;
    top: 0;
    left: 0;
}
.cover1 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
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
    padding: 2px 22px 0px 22px;
    .equipment {
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        background-color: #ffffff;
        text-align: center;
        display: inline-block;
        padding: 0 10px;
    }
    .install {
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        background-color: #ffffff;
        text-align: center;
        display: inline-block;
        margin-left: 5px;
        padding: 0 10px;
    }
    .change {
        background-color: #f0f0f0;
    }
}
.add {
    width: 640px;
    height: 400px;
    top: 250px;
    left: 600px;
    position: fixed;
    z-index: 19999992;
    .addtop {
        height: 60px;
        width: 640px;
        background-color: #386df0;
        color: #ffffff;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        z-index: 19999991;
        img {
            position: absolute;
            width: 24px;
            height: 24px;
            right: 20px;
            top: 20px;
            cursor: pointer;
            z-index: 19999993;
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
        align-items: center;
        input {
            width: 400px;
            background-color: #f4f4f4;
            border: none;
            border: 1px solid #cccccc;
            text-indent: 1em;
            height: 35px;
        }
        span {
            width: 120px;
            margin-right: 20px;
        }
    }
    .addname {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        input {
            width: 400px;
            border: none;
            text-indent: 1em;
            border: 1px solid #cccccc;
            height: 35px;
        }
        span {
            margin-right: 20px;
            width: 120px;
        }
    }
    .addsomething {
        display: flex;
        align-items: center;
        span {
            width: 120px;
            margin-right: 20px;
            // position: relative;
            // top: -42px;
        }
        textarea {
            height: 135px;
            width: 400px;
            text-indent: 1em;
        }
    }
    .no {
        cursor: pointer;
        display: inline-block;
        width: 100px;
        height: 35px;
        text-align: center;
        background-color: #999999;
        color: #ffffff;
        border-radius: 5px;
        line-height: 35px;
        margin-top: 13px;
        margin-left: 273px;
        margin-right: 10px;
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
        height: 75%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 12px;
    }
    .tipcontanin {
        height: calc(100% - 40px);
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
        text-align: center;
        margin-left: 35px;
        height: 30px;
        line-height: 30px;
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
.page {
    height: 6%;
    width: 100%;
}
.img {
    cursor: pointer;
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
.yd {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
.yd2 {
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
