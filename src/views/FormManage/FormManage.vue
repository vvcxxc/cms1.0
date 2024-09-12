<!--
 * @Description: app表单web界面
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
    <div
        class="alarm-container apptable"
        :style="{ marginTop: zoomValue < 1 ? '100px' : 100 * zoomValue + 'px' }"
    >
        <div class="mediacover" v-if="showmedia"></div>
        <div class="media" v-show="showmedia">
            <div
                class="mediahead"
                :class="[
                    { colordiv: $store.state.color == 'grey' },
                    { fcolor: $store.state.color == 'grey' }
                ]"
            >
                <div class="mediatop"></div>
                <div class="no" @click="nomedia">
                    <img
                        :src="no2"
                        alt
                        class="no"
                        v-if="$store.state.color == 'grey'"
                    />
                    <img :src="no" alt class="no" v-else />
                </div>
            </div>
            <div class="mediacontent">
                <div class="leftimg">
                    <img :src="leftimg" alt v-if="nowmedia.index == 0" />
                    <img :src="leftimg1" alt v-else @click="last" />
                </div>
                <div class="videobox">
                    <my-media
                        v-if="showmedia"
                        :nowmedia="nowmedia"
                        :key="mediakey"
                    ></my-media>
                </div>
                <div class="rightimg">
                    <img
                        :src="rightimg"
                        alt
                        v-if="nowmedia.index == mediaarr.length - 1"
                    />
                    <img :src="rightimg1" alt v-else @click="next" />
                </div>
            </div>
        </div>
        <div class="tipcover" v-if="tipchange"></div>
        <div class="maxbox">
            <div class="tip" ref="kongtiao2" v-show="tipchange">
                <div
                    class="tiphead"
                    style="position:absolute;width: 380px;height: 40px;"
                ></div>
                <div class="tiptop">
                    <img :src="gth" alt />
                    <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
                </div>
                <div class="tipcontanin">
                    <div class="tipword">{{ tipword }}</div>

                    <div class="delclass" v-if="!deltrue">
                        <div class="one" @click="tip1">
                            {{ lang.MessageBox_NO }}
                        </div>
                        <div class="two" @click="yes">
                            {{ lang.MessageBox_YES }}
                        </div>
                    </div>
                    <div class="tipdetermine" v-if="deltrue" @click="tip1">
                        {{ lang.PopupCommon_Sure }}
                    </div>
                </div>
            </div>
            <div
                class="loadcover"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.4)"
                v-loading="this.$store.state.isShow"
                v-show="this.$store.state.isShow"
                style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;"
            ></div>
            <div class="containerbox">
                <aside
                    class="left-container"
                    ref="left"
                    :class="{ colordiv: $store.state.color == 'grey' }"
                    :style="{ zoom: zoomValue }"
                >
                    <left-nav
                        @getleftdata="getleftdata"
                        :class="{ colordiv: $store.state.color == 'grey' }"
                    ></left-nav>
                </aside>
                <section
                    class="content-container"
                    ref="content"
                    :style="{ width: nowwidth }"
                >
                    <div class="topnav" :style="{ zoom }">
                        <top-nav
                            ref="topnav"
                            @search="search"
                            @change="change"
                            @del="del"
                            @exportdata="exportdata"
                        ></top-nav>
                    </div>
                    <div
                        class="eltable table-container"
                        :style="{ height: elwidth }"
                    >
                        <el-table
                            ref="multipleTable"
                            :key="tablekey"
                            :data="tabledata"
                            @row-click="selectRow"
                            @select="select"
                            @select-all="selectall"
                            :row-style="{ height: 50 * zoomValue + 'px' }"
                            stripe
                            height="100%"
                            tooltip-effect="dark"
                            :style="{ fontSize: 14 * zoomValue + 'px' }"
                            border
                            highlight-current-row
                            :header-cell-style="{
                                background:
                                    $store.state.color == 'grey'
                                        ? '#D9DBDE'
                                        : '#5a6c98',
                                color:
                                    $store.state.color == 'grey'
                                        ? '#000'
                                        : '#fff',
                                'border-left': '1px solid #cccccc',
                                height: 50 * zoomValue + 'px',
                                fontSize: 14 * zoomValue + 'px',
                                padding: '0'
                            }"
                        >
                            <template slot="empty">
                                <span>{{
                                    lang.SCMSConsoleWebApiMySql_NoData
                                }}</span>
                            </template>
                            <el-table-column
                                type="selection"
                                :width="60 * zoomValue"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                :label="lang.RoleManage_NO"
                                :width="
                                    ColumnInfos.length > 8
                                        ? 100 * zoomValue + 'px'
                                        : ''
                                "
                                prop="Number"
                                :show-overflow-tooltip="true"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.SCMSAppFormDataID">{{
                                        scope.row.SCMSAppFormDataID.Number
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                v-for="(item, index) in ColumnInfos"
                                :key="index"
                                :label="item.Title"
                                :prop="item.Key"
                                :width="
                                    ColumnInfos.length > 8
                                        ? 170 * zoomValue + 'px'
                                        : ''
                                "
                            >
                                <template slot-scope="scope"
                                    ><span
                                        v-if="scope.row[item.Key]"
                                        :style="{
                                            cursor:
                                                scope.row[item.Key].Type ==
                                                'uploaderFile'
                                                    ? 'pointer'
                                                    : 'default',
                                            color:
                                                scope.row[item.Key].Color ==
                                                'red'
                                                    ? 'red'
                                                    : scope.row[item.Key]
                                                          .Type ==
                                                      'uploaderFile'
                                                    ? 'blue'
                                                    : ''
                                        }"
                                        @click="
                                            getmedia(
                                                scope.row[item.Key],
                                                scope.row
                                            )
                                        "
                                        >{{ scope.row[item.Key].Value }}</span
                                    ></template
                                >
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pages-container" :style="{ zoom }">
                        <my-page :pageData="pageData" @req="req"></my-page>
                    </div>
                </section>
            </div>
            <div class="cover11" v-show="changeData"></div>
            <div class="look lookw" v-show="changeData" :style="{ zoom }">
                <div class="looktop"></div>
                <div
                    class="lookhead"
                    :class="[
                        { colordiv: $store.state.color == 'grey' },
                        { fcolor: $store.state.color == 'grey' }
                    ]"
                >
                    {{ lang.APPFormManage_ModifyData }}
                    <img
                        :src="no2"
                        alt
                        class="no"
                        @click="hideModel"
                        v-if="$store.state.color == 'grey'"
                    />
                    <img :src="no" alt class="no" @click="hideModel" v-else />
                </div>
                <div class="lookcontent" :key="changeData">
                    <div class="lookselect">
                        <template v-for="(item, idx) in editData">
                            <individual-choice
                                :key="item.id"
                                v-if="item.type === 'individualChoice'"
                                :last="
                                    editData[idx + 1] &&
                                        editData[idx + 1].type === 'foldList'
                                "
                                :formData="item"
                                @exception="exception"
                            />
                            <multi-line-text
                                :key="item.id"
                                v-if="item.type === 'multiLineText'"
                                :last="
                                    editData[idx + 1] &&
                                        editData[idx + 1].type === 'foldList'
                                "
                                :formData="item"
                            />
                            <multiple-choice
                                :key="item.id"
                                v-if="item.type === 'multipleChoice'"
                                :last="
                                    editData[idx + 1] &&
                                        editData[idx + 1].type === 'foldList'
                                "
                                :formData="item"
                                @exception="exception"
                            />
                            <select-date
                                :key="item.id"
                                v-if="item.type === 'selectDate'"
                                :last="
                                    editData[idx + 1] &&
                                        editData[idx + 1].type === 'foldList'
                                "
                                :formData="item"
                            />
                            <single-line-text
                                :key="item.id"
                                v-if="
                                    item.type === 'singleLineText' ||
                                        item.type === 'realTimeVariable'
                                "
                                :last="
                                    editData[idx + 1] &&
                                        editData[idx + 1].type === 'foldList'
                                "
                                :formData="item"
                                @exception="exception"
                            />
                            <uploader-file
                                :key="item.id"
                                ref="uploadFile"
                                v-if="item.type === 'uploaderFile'"
                                :last="
                                    editData[idx + 1] &&
                                        editData[idx + 1].type === 'foldList'
                                "
                                :formData="item"
                                :appFormDataId="
                                    selectedRow.SCMSAppFormDataID &&
                                        selectedRow.SCMSAppFormDataID.Value
                                "
                                :appFormId="leftlist.SCMSAppFormID"
                                @uploadErr="uploadErr"
                                @handlePreview="handlePreview"
                            />
                            <fold-list
                                :key="item.id"
                                v-if="item.type === 'foldList'"
                                :formData="item"
                            >
                                <template v-for="child in item.componentList">
                                    <individual-choice
                                        :key="child.id"
                                        v-if="child.type === 'individualChoice'"
                                        :formData="child"
                                        @exception="exception"
                                    />
                                    <multi-line-text
                                        :key="child.id"
                                        v-if="child.type === 'multiLineText'"
                                        :formData="child"
                                    />
                                    <multiple-choice
                                        :key="child.id"
                                        v-if="child.type === 'multipleChoice'"
                                        :formData="child"
                                        @exception="exception"
                                    />
                                    <select-date
                                        :key="child.id"
                                        v-if="child.type === 'selectDate'"
                                        :formData="child"
                                    />
                                    <single-line-text
                                        :key="child.id"
                                        v-if="
                                            child.type === 'singleLineText' ||
                                                child.type ===
                                                    'realTimeVariable'
                                        "
                                        :formData="child"
                                        @exception="exception"
                                    />
                                    <uploader-file
                                        :key="child.id"
                                        ref="uploadFile"
                                        v-if="child.type === 'uploaderFile'"
                                        :formData="child"
                                        :appFormDataId="
                                            selectedRow.SCMSAppFormDataID &&
                                                selectedRow.SCMSAppFormDataID
                                                    .Value
                                        "
                                        :appFormId="leftlist.SCMSAppFormID"
                                        @uploadErr="uploadErr"
                                        @handlePreview="handlePreview"
                                    />
                                </template>
                            </fold-list>
                        </template>
                    </div>
                </div>
                <div class="lookfoot">
                    <div class="cancel" @click="hideModel">
                        {{ lang.PopupCommon_Cancel }}
                    </div>
                    <div class="pre" @click="submitChange">提交</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash';

import LeftNav from './components/Leftnav.vue';
import TopNav from './components/Top.vue';
import MyPage from './components/Page.vue';
import MyMedia from './components/Media';

import FoldList from './components/FoldList.vue';
import IndividualChoice from './components/IndividualChoice';
import MultiLineText from './components/MultiLineText';
import MultipleChoice from './components/MultipleChoice';
import SelectDate from './components/SelectDate';
import SingleLineText from './components/SingleLineText';
import UploaderFile from './components/UploaderFile';

export default {
    components: {
        LeftNav,
        TopNav,
        MyPage,
        FoldList,
        IndividualChoice,
        MultiLineText,
        MultipleChoice,
        SelectDate,
        SingleLineText,
        UploaderFile,
        MyMedia
    },
    data() {
        return {
            elwidth: 'calc(100% - 110px)',
            nowwidth: 'calc(100% - 200px)',
            firstsearch: true,
            qxarr: [],
            qxidarr: [],
            buttonarr: [],
            deltrue: true,
            mediakey: 1,
            rightimg: require('../../assets/images/right.png'),
            rightimg1: require('../../assets/images/right1.png'),
            leftimg: require('../../assets/images/left.png'),
            leftimg1: require('../../assets/images/left1.png'),
            showmedia: false,
            nowmedia: {
                index: 0
            },
            keyarr: [],
            titlearr: [],
            tabledata1: [],
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: true,
                NextEnabled: true
            },
            toplist: {
                IsNormal: ''
            },
            tablekey: true,
            tabledata: [],
            selectedRow: {},
            no: require('../../assets/images/no.png'),
            no2: require('../../assets/images/no2.png'),
            gth: require('../../assets/images/gth.png'),
            changeData: false,
            formID: '',
            editData: [],
            exceptionColumn:[],
            user: '',

            leftlist: '',
            delarr: [],
            tablekey: true,
            tabledata: [],
            AppFormDatas: [],
            ColumnInfos: [],
            mediaarr: [],
            zoomValue: 1,
            zoom: 1,
            tipchange: false,
            tipword: '',
            gth: require('../../assets/images/gth.png'),
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        };
    },
    watch: {
        tabledata(val) {
            this.$nextTick(() => {
                if (val[0]) {
                    this.$refs.multipleTable.setCurrentRow(val[0], true);
                    this.selectRow(val[0]);
                }
            });
        }
    },
    created() {
        this.lang = JSON.parse(localStorage.getItem('languages'))[
            localStorage.getItem('currentLang')
        ];
        // console.log(this.$store.state.btnPowerData);
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.$store.state.btnPowerData
        )[0].Children;
        this.qxidarr = ['', '', '', ''];
        this.qxidarr = [false, false, false, false];
        this.buttonarr.forEach((item, index) => {
            if (item.RightName == 'APP表单管理 -查询按钮') {
                this.qxidarr[0] = item.RightID;
            } else if (item.RightName == 'APP表单管理 -修改表单按钮') {
                this.qxidarr[1] = item.RightID;
            } else if (item.RightName == 'APP表单管理 -删除表单按钮') {
                this.qxidarr[2] = item.RightID;
            } else if (item.RightName == 'APP表单管理 -导出表单按钮') {
                this.qxidarr[3] = item.RightID;
            }
        });
        let userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                .SCMSUserID;
        } else {
            userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        this.qxidarr.forEach((item, index) => {
            if (item) {
                this.$axios({
                    method: 'post',
                    url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${item}`
                })
                    .then(res => {
                        this.qxarr[index] = res.data.data;
                    })
                    .catch(err => {
                        // console.log('err', err);
                    });
            }
        });
        // console.log("权限",this.qxarr)
    },
    mounted() {
        this.zoomValue =
            Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.8
                ? 0.8
                : Number(parseFloat(window.screen.width / 1920).toFixed(2));
        this.zoom =
            Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.7
                ? 0.7
                : Number(parseFloat(window.screen.width / 1920).toFixed(2));
        let width = 200 * this.zoomValue + 'px';
        let width1 = 110 * this.zoomValue + 'px';
        this.nowwidth = `calc(100% - ${width})`;
        this.elwidth = `calc(100% - ${width1})`;
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo1'));
        if (userInfo) {
            this.user = userInfo.SCMSUserAccount;
        } else {
            this.user = 'Guest';
        }
    },
    methods: {
        next() {
            this.nowmedia.index++;
            this.nowmedia.file = this.mediaarr[this.nowmedia.index];
            (this.nowmedia.type =
                this.nowmedia.file.includes('png') ||
                this.nowmedia.file.includes('jpg')
                    ? 'img'
                    : 'video'),
                (this.nowmedia.flv = this.nowmedia.file.includes('flv')
                    ? 'flv'
                    : 'mp4');
            this.mediakey++;
        },
        last() {
            this.nowmedia.index--;
            this.nowmedia.file = this.mediaarr[this.nowmedia.index];
            (this.nowmedia.type =
                this.nowmedia.file.includes('png') ||
                this.nowmedia.file.includes('jpg')
                    ? 'img'
                    : 'video'),
                (this.nowmedia.flv = this.nowmedia.file.includes('flv')
                    ? 'flv'
                    : 'mp4');
            this.mediakey++;
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
        nomedia() {
            this.showmedia = false;
        },
        yes() {
            let data = [];
            this.delarr.forEach(item => {
                data.push(item.SCMSAppFormDataID.Value);
            });
            this.$axios({
                url: `/api/AppForm/SCMSAppFormDatas`,
                method: 'post',
                data: {
                    AppFormId: this.leftlist.SCMSAppFormID,
                    AppFormDataToDelete: data
                }
            }).then(res => {
                this.deltrue = true;
                if (res.data.code !== 0) {
                    setTimeout(() => {
                        this.tipword = this.lang.APPFormManage_DeleteSuccessful;
                        $('.tip').css({
                            zoom: this.zoomValue
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.$refs.topnav.getleftdata(this.leftlist);
                } else {
                    setTimeout(() => {
                        this.tipword = res.data.msg;
                        $('.tip').css({
                            zoom: this.zoomValue
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                }
            });
        },

        tip1() {
            this.tipchange = false;
            this.deltrue = true;
        },
        formatNum(floatNum) {
            var st1 = String(floatNum); // 将浮点数转换为字符串
            var index = st1.indexOf('.'); // 取小数点下标
            var st2 = st1.slice(0, index); // 将小数点前面的字符串截取出来
            var len = st2.length;
            if (len < 3) return st2.concat(st1.slice(index));
            var r = len % 3;
            return (r > 0
                ? st2.slice(0, r) +
                  ',' +
                  st2
                      .slice(r, len)
                      .match(/\d{3}/g)
                      .join()
                : st2
                      .slice(r, len)
                      .match(/\d{3}/g)
                      .join()
            ).concat(st1.slice(index));
        },
        getmedia(data, row) {
            console.log(row)
            if (data.Type == 'uploaderFile') {
                this.$axios({
                    method: 'get',
                    url: `/api/AppForm/GetAttachments?appFormId=${this.leftlist.SCMSAppFormID}&controlId=${data.id}&appFormDataId=${row.SCMSAppFormDataID.Value}`
                }).then(res => {
                    if (res.data.code == 0) {
                        if (res.data.data.Files.length == 0) {
                            setTimeout(() => {
                                this.tipword = this.lang.APPFormManage_NoAttchment;
                                $('.tip').css({
                                    zoom: this.zoomValue
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                        } else {
                            this.mediaarr = res.data.data.Files;
                            this.nowmedia = {
                                index: 0,
                                file: res.data.data.Files[0],
                                type:
                                    res.data.data.Files[0].includes('png') ||
                                    res.data.data.Files[0].includes('jpg')
                                        ? 'img'
                                        : 'video',
                                flv: res.data.data.Files[0].includes('flv')
                                    ? 'flv'
                                    : 'mp4',
                                appFormId: this.leftlist.SCMSAppFormID,
                                controlId: data.id,
                                appFormDataId: row.SCMSAppFormDataID.Value
                            };
                            setTimeout(() => {
                                $('.media').css({
                                    zoom: this.zoomValue
                                });
                                this.showmedia = true;
                                this.move('media', 'mediatop');
                            });
                        }
                    } else {
                        setTimeout(() => {
                            this.tipword = res.data.msg;
                            $('.tip').css({
                                zoom: this.zoomValue
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                    }
                    // console.log('res', res);
                });
            }
            // console.log(data);
            // console.log(row);
            // console.log(this.leftlist);
        },
        move(name, namehead) {
            // console.log(name)

            let left = $(`.${name}`).width() / 2 + 'px';
            let top = $(`.${name}`).height() / 2 + 'px';
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
                // console.log(e.target.className.toLocaleLowerCase());
                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center');
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
                        // console.log(nx);
                        // console.log(x);
                        // console.log(l);
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
        req(data) {
            this.$refs.topnav.changepage(data);
        },
        getleftdata(data) {
            this.$refs.topnav.getleftdata(data);
            this.leftlist = data;
            this.formID = data.SCMSAppFormID;
        },
        selectall(row) {
            this.delarr = JSON.parse(JSON.stringify(row));
        },
        search(data, msg, left) {
            console.log(data);

            if (!data.AppFormId) {
                return;
            }

            this.selectedRow = {};
            if (!this.qxarr[0] && !this.firstsearch && left) {
                setTimeout(() => {
                    this.tipword = this.lang.NoOperationAuthority;
                    $('.tip').css({
                        zoom: this.zoomValue
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                return;
            }
            if (msg) {
                setTimeout(() => {
                    this.tipword = msg;
                    $('.tip').css({
                        zoom: this.zoomValue
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                return;
            }
            this.$axios({
                method: 'post',
                url: `/api/AppForm/GetSCMSAppFormDatas`,
                data: data
            }).then(res => {
                this.firstsearch = false;
                if (res.data.code == 0) {
                    // console.log(res.data.data.AppFormDatas)
                    this.ColumnInfos = res.data.data.ColumnInfos;
                    this.AppFormDatas = res.data.data.AppFormDatas;
                    this.tabledata = [];
                    let uparr = [];
                    this.ColumnInfos.forEach(item => {
                        if (item.Key == 'InsertBy') {
                            item.Title = this.lang.APPFormManage_InsertBy;
                        }
                        if (item.Key == 'InsertAt') {
                            item.Title = this.lang.APPFormManage_InsertAt;
                        }
                        if (item.Type == 'uploaderFile') {
                            uparr.push(item);
                            item.Value = this.lang.APPFormManage_Attchment_Details;
                            item.id = item.Key;
                        }
                    });
                    this.AppFormDatas.forEach(item1 => {
                        item1.push.apply(item1, uparr);
                    });
                    // console.log(this.AppFormDatas);
                    this.delarr = [];
                    this.AppFormDatas.forEach((item1, index1) => {
                        let obj = {};
                        let redwordarr = [];
                        let redwordarr1 = [];
                        item1.forEach((item2, index2) => {
                            if (item2.Key == 'ExceptionColumns') {
                                redwordarr = item2.Value.split(';');
                            }
                              if(item2.Key == 'HasAttchmentColumns'){
                                redwordarr1 = item2.Value.split(';');
                            }
                            if (
                                item2.Type == 'singleLineText' ||
                                item2.Type == 'realTimeVariable'
                            ) {
                                item2.Value = item2.Value.replace(/&&&/, '');
                            }
                            if (item2.Type == 'realTimeVariable') {
                                if (item2.Value) {
                                    let data = JSON.parse(
                                        JSON.stringify(item2.Value)
                                    );
                                    item2.Value = parseFloat(
                                        item2.Value
                                    ).toString();
                                    let data1 = data.replace(item2.Value, '');
                                    if (!isNaN(parseFloat(item2.Value))) {
                                        item2.Value =
                                            this.formatNum(parseFloat(item2.Value)) + data1;
                                    } else {
                                        item2.Value = data1;
                                    }
                                }
                            }
                            if (item2.Type == 'singleLineText') {
                                if (item2.ContentType == 'number') {
                                    if (item2.Value) {
                                        let data = JSON.parse(
                                            JSON.stringify(item2.Value)
                                        );
                                        item2.Value = parseFloat(
                                            item2.Value
                                        ).toString();
                                        let data1 = data.replace(
                                            item2.Value,
                                            ''
                                        );
                                        if (!isNaN(parseFloat(item2.Value))) {
                                            item2.Value =
                                               this.formatNum(parseFloat(item2.Value)) + data1;
                                        } else {
                                            item2.Value = data1;
                                        }
                                    }
                                }
                            }

                            if (item2.Type == 'multipleChoice') {
                                let choice = '';
                                let arr = JSON.parse(item2.Value);
                                // console.log(arr);
                                item2.Value2 = arr;
                                arr.forEach((item3, index3) => {
                                    if (index3 !== 0) {
                                        choice += ',' + item3.value;
                                    } else {
                                        choice += item3.value;
                                    }
                                });
                                item2.Value = choice;
                            }
                            if (item2.Type == 'individualChoice') {
                                if (item2.Value !== '') {
                                    item2.Value2 = JSON.parse(item2.Value);
                                    item2.Value = JSON.parse(item2.Value).value;
                                } else {
                                    item2.Value = '';
                                    item2.Value2 = {};
                                }
                            }
                        });

                        item1.forEach((item2, index2) => {
                            obj[item2.Key] = {
                                Type: item2.Type,
                                Number: index1 + 1,
                                Value:item2.Type!=="uploaderFile"?item2.Value:redwordarr1.includes(item2.Key)
                                    ? item2.Value
                                    : '',
                                Value2: item2.Value2 ? item2.Value2 : '',
                                id: item2.id ? item2.id : '',
                                Color: redwordarr.includes(item2.Key)
                                    ? 'red'
                                    : ''
                            };
                        });
                        this.tabledata.push(JSON.parse(JSON.stringify(obj)));
                    });
                    // console.log(this.pageData);
                    this.tablekey = !this.tablekey;
                    this.pageData.TotalCount = res.data.data.TotalCount;
                    this.pageData.TotalPage = Math.ceil(
                        res.data.data.TotalCount / 50
                    );
                    this.pageData.PageIndex = data.PageIndex;
                    this.pageData.PageSize = data.PageSize;

                    if (
                        this.pageData.TotalPage <= this.pageData.PageIndex ||
                        this.pageData.TotalPage <= 1
                    ) {
                        this.pageData.NextEnabled = true;
                    } else {
                        this.pageData.NextEnabled = false;
                    }
                    if (this.pageData.PageIndex <= 1) {
                        this.pageData.LastEnabled = true;
                    } else {
                        this.pageData.LastEnabled = false;
                    }
                    console.log('查询', this.tabledata);
                } else {
                    setTimeout(() => {
                        this.tipword = res.data.msg;
                        $('.tip').css({
                            zoom: this.zoomValue
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                }
            });
        },

        select(row, event, column) {
            this.delarr = JSON.parse(JSON.stringify(row));
            this.$nextTick(() => {
                this.$refs.multipleTable.setCurrentRow(
                    row[row.length - 1],
                    true
                );
                this.selectRow(row[row.length - 1]);
            });
        },
        selectRow(row, event, column) {
            this.selectedRow = JSON.parse(JSON.stringify(row));

            // console.log(this.selectedRow)
        },
        uploadErr(msg) {
            this.tipchange = true;
            this.tipword = msg;
        },
        handlePreview(item) {
            setTimeout(() => {
                $('.media').css({
                    zoom: this.zoomValue
                });
                this.showmedia = true;
                this.move('media', 'mediatop');
            });
            this.mediaarr = [item.file];
            this.nowmedia = JSON.parse(JSON.stringify(item));
        },
        change(item) {
            if (!this.qxarr[1]) {
                setTimeout(() => {
                    this.tipword = this.lang.NoOperationAuthority;
                    $('.tip').css({
                        zoom: this.zoomValue
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                return;
            }

            if (
                this.selectedRow &&
                this.selectedRow.SCMSAppFormDataID == undefined
            ) {
                this.changeData = false;
                this.tipword = this.lang.APPFormManage_NoModifyData;
                $('.tip').css({
                    zoom: this.zoomValue
                });
                this.tipchange = true;
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/AppForm/GetSCMSFormDesignDatas',
                data: [this.formID]
            }).then(res => {
                if (res.data.code === 0) {
                    console.log(JSON.parse(res.data.data[0].Data))
                    //重置编辑列表数组
                    this.editData = [];
                    this.exceptionColumn = []
                    let componentList = JSON.parse(res.data.data[0].Data)
                        .componentList;

                    //整体数据
                    componentList.forEach(item => {
                        let data = JSON.parse(JSON.stringify(item));
                        if (
                            this.selectedRow[item.id] ||
                            item.type === 'foldList'
                        ) {
                            if (item.componentList) {
                                item.componentList.forEach(com => {
                                    com.value = cloneDeep(
                                        this.selectedRow[com.id]
                                    );
                                });
                                data.componentList = item.componentList;
                            } else {
                                data.value = cloneDeep(
                                    this.selectedRow[item.id]
                                );
                            }
                            this.editData.push(data);
                        }
                    });
                    setTimeout(() => {
                        this.changeData = true;
                        this.move('lookw', 'looktop');
                    });

                } else {
                    this.tipchange = true;
                    this.tipword = res.data.msg;
                    return;
                }
            });
        },
        //关闭编辑表单的弹窗
        hideModel() {
            this.changeData = false;
            this.editData = null;
        },
        //表单验证
        formVerify(item, uploadFile) {
            if (item.type !== 'uploaderFile') {
                let val =
                    item.type === 'individualChoice'
                        ? item.value.Value2.value
                        : item.value.Value;
                val =
                    item.componentAttribute.unit &&
                    item.componentAttribute.unit !== ''
                        ? val.slice(
                              0,
                              val.length - item.componentAttribute.unit.length
                          )
                        : val;
                if (item.type === 'multipleChoice') {
                    if (
                        item.componentAttribute.required &&
                        item.value.Value2.length === 0
                    ) {
                        this.tipchange = true;
                        this.tipword = '必填项不能为空';
                        return false;
                    }
                } else {
                    if (item.componentAttribute.required && val === '') {
                        this.tipchange = true;
                        this.tipword = '必填项不能为空';
                        return false;
                    }
                }
            } else {
                if (item.componentAttribute.required) {
                    if (
                        uploadFile.some(
                            currentFile =>
                                currentFile.controlId === item.id &&
                                currentFile.filelistData.length === 0
                        )
                    ) {
                        this.tipchange = true;
                        this.tipword = '必填项不能为空';
                        return false;
                    }
                }
            }
            return true;
        },
        exception({type, id}){
            if(type === "add"){
                this.exceptionColumn.push(id)
            }else{
                let index = this.exceptionColumn.indexOf(id)
                if(index >= 0){
                    this.exceptionColumn.splice(index, 1)
                }
            }
        },
        //编辑表单提交事件
        submitChange() {
            //获取附件的数据
            let uploadFile = [];
            if (this.$refs.uploadFile && this.$refs.uploadFile.length > 0) {
                this.$refs.uploadFile.forEach(item => {
                    uploadFile.push(item.submitFile());
                });
            }

            for (let j = 0; j < this.editData.length; j++) {
                const item = this.editData[j];
                if (item.type === 'foldList') {
                    for (let k = 0; k < item.componentList.length; k++) {
                        if (
                            !this.formVerify(item.componentList[k], uploadFile)
                        ) {
                            return;
                        }
                    }
                } else {
                    if (!this.formVerify(item, uploadFile)) {
                        return;
                    }
                }
            }

            //初始化数据
            let submitData = {
                AppFormId: this.formID,
                AppFormDataToSave: [
                    [
                        { key: 'InsertBy', Value: this.user },
                        {
                            key: 'SCMSAppFormDataID',
                            Value: this.selectedRow.SCMSAppFormDataID.Value
                        },
                        { key: 'ExceptionColumns', Value: this.exceptionColumn.length === 0 ? "" : Array(...new Set(this.exceptionColumn)).join(";") }
                    ]
                ],
                AppFormDataAttachmentToDelete: []
            };
            this.editData.forEach(item => {
                if (item.type === 'foldList') {
                    item.componentList.forEach(comp => {
                        comp.type !== 'uploaderFile'
                            ? submitData.AppFormDataToSave[0].push({
                                  key: comp.id,
                                  Value:
                                      comp.type === 'multipleChoice' ||
                                      comp.type === 'individualChoice'
                                          ? JSON.stringify(comp.value.Value2)
                                          : comp.value.Value
                              })
                            : null;
                    });
                } else {
                    item.type !== 'uploaderFile'
                        ? submitData.AppFormDataToSave[0].push({
                              key: item.id,
                              Value:
                                  item.type === 'multipleChoice' ||
                                  item.type === 'individualChoice'
                                      ? JSON.stringify(item.value.Value2)
                                      : item.value.Value
                          })
                        : null;
                }
            });

            uploadFile.forEach(item => {
                if (item.delFileList.length > 0) {
                    submitData.AppFormDataAttachmentToDelete.push({
                        ControlId: item.controlId,
                        AppFormDataId: item.appFormDataId,
                        Attachments: item.delFileList
                    });
                }
            });

            this.$axios({
                method: 'post',
                url: '/api/AppForm/SCMSAppFormDatas',
                data: submitData
            }).then(res=>{
                if(res.data.result){
                    let axiosMap = new Array();
                    uploadFile.forEach(item=>{
                        if(item.addFileList.length > 0){
                            item.addFileList.forEach(fileItem=>{
                                // 向 formData 对象中添加文件
                                let formData1 = new FormData();
                                formData1.append('file', fileItem);
                                axiosMap.push(this.$axios({
                                    method: 'post',
                                    url: 'api/AppForm/Upload',
                                    params: {
                                        appFormId: item.appFormId,
                                        appFormDataId: item.appFormDataId,
                                        controlId: item.controlId
                                    },
                                    data: formData1
                                }))
                            })
                        }
                    })
                    if(axiosMap.length > 0){
                        this.$axios.all(axiosMap).then(
                            this.$axios.spread((...arg) => {
                                // 请求现在都执行完成
                                Array.from([...arg]).forEach((element, index) => {
                                    if (element.data.Result && axiosMap.length - 1 === index) {
                                        this.changeData = false;
                                        setTimeout(()=>{
                                            this.tipword = "保存成功";
                                            $('.tip').css({
                                                zoom: this.zoomValue
                                            });
                                            this.tipchange = true;
                                            this.move('tip', 'tiphead');
                                            //更新列表
                                            this.$refs.topnav.search();
                                            this.selectedRow = {};
                                        })
                                    }
                                })
                            })
                        )
                    }else{
                        this.changeData = false;
                        setTimeout(()=>{
                            this.tipword = "保存成功";
                            $('.tip').css({
                                zoom: this.zoomValue
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                            //更新列表
                            this.$refs.topnav.search();
                            this.selectedRow = {};
                        })
                    }
                }else{
                    setTimeout(()=>{
                        this.tipword = res.msg;
                        $('.tip').css({
                            zoom: this.zoomValue
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                };
                })
        },
        del() {
            if (!this.qxarr[2] && !this.firstsearch) {
                setTimeout(() => {
                    this.tipword = this.lang.NoOperationAuthority;
                    $('.tip').css({
                        zoom: this.zoomValue
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                return;
            }
            if (this.delarr.length == 0) {
                setTimeout(() => {
                    this.tipword = this.lang.APPFormManage_NoDeleteData;
                    $('.tip').css({
                        zoom: this.zoomValue
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
            } else {
                this.deltrue = false;
                setTimeout(() => {
                    this.tipword = this.lang.APPFormManage_DeleteData;
                    $('.tip').css({
                        zoom: this.zoomValue
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
            }
            // console.log('删除');
        },
        json2excel(tableJson, filenames, autowidth, bookTypes) {
            var that = this;
            //这个是引用插件
            import('@/vendor/Export4Excel').then(excel => {
                var tHeader = [];
                var dataArr = [];
                var sheetnames = [];
        
                for (var i in tableJson) {
                    tHeader.push(tableJson[i].tHeader);
                    dataArr.push(
                        that.formatJson(
                            tableJson[i].filterVal,
                            tableJson[i].tableDatas
                        )
                    );
                    sheetnames.push(tableJson[i].sheetName);
                }
                // console.log('dataArr', dataArr);
                excel.export_json_to_excel({
                    header: tHeader,
                    data: dataArr,
                    sheetname: sheetnames,
                    filename: filenames,
                    autoWidth: autowidth,
                    bookType: bookTypes
                });
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        exportdata(data) {
            if (!this.qxarr[3]) {
                setTimeout(() => {
                    this.tipword = this.lang.NoOperationAuthority;
                    $('.tip').css({
                        zoom: this.zoomValue
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                return;
            }
            let exportdata = JSON.parse(JSON.stringify(data));
            if (this.ColumnInfos.length == 0) {
                return;
            }
            if (this.pageData.TotalCount >= 150000) {
                setTimeout(() => {
                    this.tipword = this.lang.NoOperationAuthority;
                    $('.tip').css({
                        zoom: this.zoomValue
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
            }
            exportdata.PageSize = 150000;
            this.$axios({
                method: 'post',
                url: `/api/AppForm/GetSCMSAppFormDatas`,
                data: exportdata
            })
                .then(res => {
                    let ColumnInfos = res.data.data.ColumnInfos;
                    let AppFormDatas = res.data.data.AppFormDatas;
                    this.tabledata1 = [];
                    let tabledata1 = [];
                    let uparr = [];
                    ColumnInfos.forEach(item => {
                        if (item.Type == 'uploaderFile') {
                            uparr.push(item);
                            item.Value =  this.lang.APPFormManage_Attchment_Details;
                            item.id = item.Key;
                        }
                        if (item.Key == 'InsertBy') {
                            item.Title = this.lang.APPFormManage_InsertBy;
                        }
                        if (item.Key == 'InsertAt') {
                            item.Title = this.lang.APPFormManage_InsertAt;
                        }
                    });
                    ColumnInfos.unshift({
                        Key: 'Number',
                        Title: this.lang.RoleManage_NO
                    });
                    AppFormDatas.forEach(item1 => {
                        item1.push.apply(item1, uparr);
                    });
                    AppFormDatas.forEach((item1, index1) => {
                        let obj = {};
                        let redwordarr = [];
                        let redwordarr1 = [];
                        item1.forEach((item2, index2) => {
                            if(item2.Key == 'HasAttchmentColumns'){
                                redwordarr1 = item2.Value.split(';');
                            }
                            if (item2.Key == 'ExceptionColumns') {
                                redwordarr = item2.Value.split(';');
                            }
                            if (
                                item2.Type == 'singleLineText' ||
                                item2.Type == 'realTimeVariable'
                            ) {
                                item2.Value = item2.Value.replace(/&&&/, '');
                            }
                            if (item2.Type == 'realTimeVariable') {
                                if (item2.Value) {
                                    let data = JSON.parse(
                                        JSON.stringify(item2.Value)
                                    );
                                    item2.Value = parseFloat(
                                        item2.Value
                                    ).toString();
                                    let data1 = data.replace(item2.Value, '');
                                    if (!isNaN(parseFloat(item2.Value))) {
                                        item2.Value =
                                            this.formatNum(parseFloat(item2.Value)) + data1;
                                    } else {
                                        item2.Value = data1;
                                    }
                                }
                            }
                            if (item2.Type == 'singleLineText') {
                                if (item2.ContentType == 'number') {
                                    if (item2.Value) {
                                        let data = JSON.parse(
                                            JSON.stringify(item2.Value)
                                        );
                                        item2.Value = parseFloat(
                                            item2.Value
                                        ).toString();
                                        let data1 = data.replace(
                                            item2.Value,
                                            ''
                                        );
                                        if (!isNaN(parseFloat(item2.Value))) {
                                            item2.Value =
                                                this.formatNum(parseFloat(item2.Value)) + data1;
                                        } else {
                                            item2.Value = data1;
                                        }
                                    }
                                }
                            }

                            if (item2.Type == 'multipleChoice') {
                                let choice = '';
                                let arr = JSON.parse(item2.Value);
                                // console.log(arr);
                                arr.forEach((item3, index3) => {
                                    if (index3 !== 0) {
                                        choice += ',' + item3.value;
                                    } else {
                                        choice += item3.value;
                                    }
                                });
                                item2.Value = choice;
                            }
                            if (item2.Type == 'individualChoice') {
                                item2.Value = JSON.parse(item2.Value).value;
                            }
                        });

                        item1.forEach((item2, index2) => {
                            obj[item2.Key] = {
                                Type: item2.Type,
                                Number: index1 + 1,
                                Value:item2.Type!=="uploaderFile"?item2.Value:redwordarr1.includes(item2.Key)
                                    ? item2.Value
                                    : '',
                                id: item2.id ? item2.id : '',
                                Color: redwordarr.includes(item2.Key)
                                    ? 'red'
                                    : ''
                            };
                        });

                        tabledata1.push(JSON.parse(JSON.stringify(obj)));
                    });
                    this.keyarr = [];
                    this.titlearr = [];
                    ColumnInfos.forEach(item => {
                        this.keyarr.push(item.Key);
                        this.titlearr.push(item.Title);
                    });
                 
                    tabledata1.forEach((item, index) => {
                        let obj = {};
                        for (let key in item) {
                            obj[key] = {
                                Value: item[key].Value,
                                color: item[key].Color
                            };
                        }
                        obj.Number = index + 1;
                        this.tabledata1.push(obj);
                    });

                    // console.log(this.titlearr);
                    // console.log(this.keyarr);
                    // console.log(this.tabledata1);
                })
                .then(() => {
                    require.ensure([], () => {
                        const {
                            expor_json_to_excel
                        } = require('../../vendor/Export2Excel');
                        let excelDatas = [
                            {
                                tHeader: this.titlearr,
                                filterVal: this.keyarr,
                                tableDatas: this.tabledata1,
                                sheetName: 'sheet1'
                            },
                            {
                                tHeader: this.titlearr,
                                filterVal: this.keyarr,
                                tableDatas: this.tabledata1,
                                sheetName: 'sheet1'
                            }
                        ];
                        this.json2excel(excelDatas, 'app表单', true, 'xlsx');
                    });
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.alarm-container {
    height: 86vh;
    overflow: hidden;
    color: #000;
    margin-top: 100px;
    display: flex;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
}
.maxbox {
    background: #fff;
    padding: 10px;
    width: 100%;
}
aside {
    width: 200px;
    height: 100%;
    min-width: 200px;
    background-color: #e9eeef;
    box-sizing: border-box;
    overflow: auto;
}
.content-container {
    flex: 1;
    width: calc(100% - 200px);
    background-color: #fff;
    border-left: none;
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
.containerbox {
    width: 100%;
    display: flex;
    height: 100%;
    background: #fff;
}
.topnav {
    height: 60px;
    margin-bottom: 10px;
}
.eltable {
    height: calc(100% - 110px);
}
.apptable {
    position: relative;
}
.left-container {
    margin-right: 20px;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30999999;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .tipcontanin {
        height: 120px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .tipword{
             display: flex;
        align-items: center;
        justify-content: center;
        }
    }
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
        text-align: center;
    }
    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        position: absolute;
        bottom: 15px;
        text-align: center;
        height: 30px;
        background-color: #f3e3ad;
    }

    .delclass {
        width: 330px;
        line-height: 30px;
        position: absolute;
        bottom: 20px;
        height: 30px;
        .one {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #666666;
        }
        .two {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #E88511;
        }
    }
}

.look {
    z-index: 30;
    width: 673px;
    height: 710px;
    top: 150px;
    left: 400px;
    position: fixed;
    display: flex;
    flex-flow: column;
    background-color: #eee;
    box-shadow: -7px 7px 50px 0px rgba(51, 51, 51, 0.5);

    .looktop {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
    }
    .lookhead {
        position: relative;
        height: 60px;
        line-height: 60px;
        background: #386df0;
        font-size: 20px;
        font-family: 'Alibaba PuHuiTi';
        font-weight: 400;
        color: #eeeeee;
        text-align: center;

        .no {
            position: absolute;
            top: 0;
            z-index: 50;
            bottom: 0;
            margin: auto;
            height: 25px;
            width: 25px;
            right: 10px;
            cursor: pointer;
        }
    }
    .lookcontent {
        flex: 1;
        padding: 20px 29px 0;
        overflow: hidden;

        .lookselect {
            width: 100%;
            height: 100%;
            overflow: auto;

            .last-compoennt-content {
                border-bottom-left-radius: 6px !important;
                border-bottom-right-radius: 6px !important;

                &::after {
                    content: none !important;
                }
            }

            .component-content {
                background: #fff;
                border-radius: 6px;

                & + .component-content {
                    border-radius: 0;
                }

                & + .fold-component-content {
                    margin-top: 10px;
                }

                & ~ .fold-component-content {
                    border-bottom-left-radius: 6px;
                    border-bottom-right-radius: 6px;
                }

                &:first-child {
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                }

                &:last-child {
                    border-bottom-left-radius: 6px !important;
                    border-bottom-right-radius: 6px !important;

                    &::after {
                        content: none;
                    }
                }
            }
            .fold-component-content {
                & + .component-content {
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                }

                .component-content {
                    &:last-child {
                        &::after {
                            content: none;
                        }
                    }
                }
            }
        }
    }
    .lookfoot {
        padding: 20px 29px;
        text-align: right;
        font-size: 16px;
        color: #fff;

        .cancel {
            display: inline-block;
            width: 100px;
            height: 36px;
            line-height: 36px;
            background: #999;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
        }
        .pre {
            display: inline-block;
            width: 100px;
            height: 36px;
            line-height: 36px;
            background: #386df0;
            border-radius: 4px;
            margin-left: 10px;
            text-align: center;
            cursor: pointer;
        }
    }
}
.tipcover {
    position: fixed;
    z-index: 29999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.media {
    width: 732px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 27999999;
    height: 548px;
    background: #eeeeee;
    box-shadow: -7px 7px 50px 0px rgba(51, 51, 51, 0.5);
}
.mediacover {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 25999999;
}
.mediahead {
    position: relative;
    height: 50px;
    line-height: 50px;
    background: #386df0;
    width: 100%;
    text-align: center;
    color: #eeeeee;
    .no {
        width: 23px;
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
        z-index: 11;
    }
    .mediatop {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
    }
}
.mediacontent {
    width: 100%;
    height: calc(100% - 50px);
    position: relative;
    .videobox {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 552px;
        height: 400px;
        background: #fff;
        margin: auto;
        padding: 20px;
    }
}
.leftimg {
    position: absolute;
    width: 32px;
    height: 100px;
    left: 30px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    img {
        width: 100%;
        height: 100%;
    }
}
.rightimg {
    position: absolute;
    width: 32px;
    height: 100px;
    right: 30px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    img {
        width: 100%;
        height: 100%;
    }
}
img {
    cursor: pointer;
}
.two:active{
    color: #eeb764 !important;
}
.one:active{
    color: #7e7e7e !important;
}
.tipdetermine:active{
    color: #eeb764 !important;
}
</style>
