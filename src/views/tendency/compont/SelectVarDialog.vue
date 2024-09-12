<!-- 
    提取自 src/views/parameter/component/statement.vue
    TODO 清理垃圾代码

    $emit('submit', varObj)
    $emit('cancel')
 -->
<template>
    <div class="container">
        <div
            class="look"
            :style="{ width: 1120 * a11 + 'px', height: 600 * a11 + 'px' }"
        >
            <div class="looktop" :style="{ height: 60 * a11 + 'px' }"></div>
            <div
                class="lookhead"
                :style="{
                    height: 60 * a11 + 'px',
                    fontSize: 18 * a11 + 'px',
                    lineHeight: 60 * a11 + 'px',
                }"
                :class="[
                    { colordiv: $store.state.color == 'grey' },
                    { fcolor: $store.state.color == 'grey' },
                ]"
            >
                {{
                    lang.ProcessParameterConfigure_SelectVariable_SelectionVariables
                }}
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click="cancel1"
                    v-if="$store.state.color == 'grey'"
                    :style="{ height: 24 * a11 + 'px', width: 24 * a11 + 'px' }"
                />
                <img
                    :style="{ height: 24 * a11 + 'px', width: 24 * a11 + 'px' }"
                    :src="no"
                    alt
                    class="no"
                    @click="cancel1"
                    v-else
                />
            </div>
            <div class="lookcontent" :style="{ paddingTop: 30 * a11 + 'px' }">
                <div
                    class="lookselect"
                    :style="{
                        width: 1000 * a11 + 'px',
                        height: 436 * a11 + 'px',
                    }"
                >
                    <div class="search" :style="{ zoom: a11 }">
                        <span>{{
                            lang.FormulaManage_AddProject_DeviceName
                        }}</span>
                        <select name id v-model="oneselect">
                            <option
                                v-for="(item, index) in projectlist"
                                :key="index"
                                :value="item.DeviceName"
                            >
                                {{ item.DisplayDeviceName }}
                            </option>
                        </select>
                        <span>{{
                            lang.FormulaManage_AddProject_VariableGroup
                        }}</span>
                        <select name id v-model="twoselect">
                            <option
                                v-for="(item, index) in projectlist2"
                                :key="index"
                                :value="item.GroupName"
                            >
                                {{ item.GroupName }}
                            </option>
                        </select>
                        <span>{{
                            lang.FormulaManage_AddProject_VariableType
                        }}</span>
                        <select name id v-model="threeselect">
                            <option
                                v-for="(item, index) in projectlist3"
                                :key="index"
                                :value="item.Value"
                            >
                                {{ item.Text }}
                            </option>
                        </select>
                        <input
                            type="text"
                            :placeholder="lang.FormulaManage_AddProject_Keyword"
                            v-model="projectkeyword"
                        />
                        <span class="lookfor1" @click="lookforsearch">{{
                            lang.FormulaManage_AddProject_Select
                        }}</span>
                    </div>
                    <div class="table" :style="{ height: 320 * a11 + 'px' }">
                        <el-table
                            :data="projectlistdata"
                            height="100%"
                            border
                            @row-click="handleRowChange5"
                            style="width: 100%"
                            highlight-current-row
                            :style="{
                                fontSize: a11 * 15 + 'px',
                                width: '100%',
                            }"
                            :row-style="{ height: 50 * a11 + 'px' }"
                            :header-cell-style="{
                                background:
                                    $store.state.color == 'grey'
                                        ? '#D9DBDE'
                                        : '#E1EDFA',
                                color:
                                    $store.state.color == 'grey'
                                        ? '#000'
                                        : '#769DE7',
                                'border-left': '1px solid #cccccc',
                                height: 50 * a11 + 'px',
                                padding: '0',
                            }"
                        >
                            <template slot="empty">
                                <span>{{
                                    lang.SCMSConsoleWebApiMySql_NoData
                                }}</span>
                            </template>
                            <el-table-column
                                prop="Device"
                                :label="
                                    lang.FormulaManage_AddProject_DataGrid_DeviceName
                                "
                                :width="180 * a11"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="DateType"
                                :label="
                                    lang.FormulaManage_AddProject_DataGrid_VariableType
                                "
                                :width="180 * a11"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="Name"
                                :label="
                                    lang.FormulaManage_AddProject_DataGrid_Name
                                "
                                :width="180 * a11"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="Descript"
                                :label="
                                    lang.FormulaManage_AddProject_DataGrid_Describe
                                "
                                :width="180 * a11"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="Address"
                                :label="
                                    lang.FormulaManage_AddProject_DataGrid_VariableAddress
                                "
                                :width="280 * a11"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                        </el-table>
                    </div>

                    <!-- <div class="page"> -->
                    <div class="page" :style="{ zoom: a11 }">
                        <div class="pageword" style="text-align: left">
                            {{ lang.DataGrid_Reaction_HT_ATotalOf }}
                            <span>{{ pageDate.TotalCount }}</span
                            >{{
                                lang.DataGrid_Reaction_HT_RecordsAndTheCurrent
                            }}
                            <span>{{ pageDate.PageIndex }}</span
                            >{{ lang.DataGrid_Reaction_HT_Page }}
                            <span>{{ pageDate.TotalPage }}</span
                            >{{ lang.DataGrid_Reaction_HT_RecordsAnd }}
                            <span>{{ pageDate.PageSize }}</span
                            >{{ lang.DataGrid_Reaction_HT_PerPage }}
                        </div>
                        <div class="pageoperation">
                            <span class="btn" @click="start">{{
                                lang.DataGrid_Reaction_FirstPage
                            }}</span>
                            <span
                                class="btn"
                                :class="{ nopage: !pageDate.LastEnabled }"
                                @click="abck"
                                >{{ lang.DataGrid_Reaction_LastPage }}</span
                            >
                            <span
                                class="btn"
                                :class="{ nopage: !pageDate.NextEnabled }"
                                @click="next"
                                >{{ lang.DataGrid_Reaction_NextPage }}</span
                            >
                            <span class="btn" @click="end">{{
                                lang.DataGrid_Reaction_EndPage
                            }}</span>
                            <div class="inputnumber">
                                {{ lang.DataGrid_Reaction_The }}
                                <input type="text" v-model="nowpage" />
                                {{ lang.DataGrid_Reaction_Page }}
                            </div>

                            <span class="btn" @click="jump">{{
                                lang.DataGrid_Reaction_TurnPage
                            }}</span>
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
                <div class="cancel" @click="cancel1" :style="{ zoom: a11 }">
                    {{ lang.PopupCommon_Cancel }}
                </div>
                <div class="pre" @click="blpre" :style="{ zoom: a11 }">
                    {{ lang.PopupCommon_Save }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            oneno: [],
            twono: [],
            twoword: '',
            bbb: false,
            ddd: false,
            one: 1,
            istwo: false,
            deltrue: true,
            tipword: '',
            tipchange: false,
            oneword: '',
            sbint: '',
            a: 1,
            a11: 1,
            pdyd1: true,
            pdyd2: true,
            pdyd3: true,
            pdyd4: true,
            pdyd5: true,
            pdyd6: true,
            // gth: require('../../assets/images/icon_gth.png'),
            gth: require('../../../assets/images/gth.png'),
            radio: '2',
            newblue: false,
            unsixth: false,
            two: 1,
            sbblue: '',
            PID: '',
            oneworkdata: '',
            adata: [],
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            },
            tdone: '',
            tdtwo: '',
            tdtree: '',
            checked1: false,
            checked2: false,
            checked3: false,
            projectchange: false,
            up: require('../../../assets/images/icon_up.png'),
            hao: require('../../../assets/images/hao.png'),
            tableData: [],
            tableData1: [],
            tableData2: [],
            wantdata: '',
            sixData: [],
            onework: false,
            twowork: false,
            someprochange: false,
            oneworkduan: '',
            workproject: '',
            onechange: 1,
            oneworkname: '',
            nowIndex: 1,
            pageDate: {
                PageIndex: 1,
                PageSize: 50,
                TotalPage: 0,
                TotalCount: 0,
            },
            aaa1: false,
            bbb1: false,
            nowpage: 1,
            twoworkdata: {
                WID: '',
                StepName: '无',
                IsAuto: false,
                ProductID: '无',
                IsRelated: false,
                FinishTag1: '无',
                FinishTag2: '无',
                IsAbsolute: true,
                AbsoQualTag: '绝对合格，不需判断',
                IsQualTag: '无',
                SID: '',
            },
            aaa: false,
            ccc: false,

            pd: ['绝对合格，不需判断', '绝对不合格，无需判断'],
            lookchange: !false,
            daiti: '',
            unsixdata: {},
            projectlist: '',
            projectlist2: '',
            projectlistdata: [],
            oneselect: '',
            twoselect: '',
            sbreason: '',
            sbvalue: '',
            threeselect: '',
            projectkeyword: '',
            projectlist3: '',
            projectlistdata1: [],
            projectlistdata2: '',
            projectlistdata3: '',
            projectchangedata: [],
            mewntchangedata: '',
            daiti1: '',
            daiti2: '',
            nowtwo: 0,
            argWorkProjects: '',
            no: require('../../../assets/images/no.png'),
            no2: require('../../../assets/images/no2.png'),
            tjgxid: '',
            tjgxshow: true,
            xggxid: '',
            xggxshow: true,
            scgxid: '',
            scgxshow: true,
            gxsyid: '',
            gxsyshow: true,
            tjgwid: '',
            tjgwshow: true,
            xggwid: '',
            xggwshow: true,
            scgwid: '',
            scgwshow: true,
            bhgid: '',
            bhgshow: true,
            gwsyid: '',
            gwsyshow: true,
            plxjid: '',
            plxjshow: true,
            xmxgid: '',
            xmxgshow: true,
            xmscid: '',
            xmscshow: true,
            xmsyid: '',
            xmsyshow: true,

            oneObj: '',
            oneObjEX: {
                InboundSignalID: '',
                ScanningAddressID: '',
                ClearanceSignalID: '',
                OperID: '',
                checkBoxSelect: false,
            },
            twoObj: {
                WID: '',
                StepName: '',
                IsAuto: false,
                ProductID: '无',
                IsRelated: false,
                FinishTag1: '无',
                FinishTag2: '无',
                IsAbsolute: false,
                AbsoQualTag: '',
                IsQualTag: '无',
                SID: '',
            },
            threeObj: {
                Digit: '',
                Lower: '',
                Number: '',
                OriginalProjectName: '',
                PID: '',
                ProjectName: '',
                ProjectValueTagName: '',
                SID: '',
                Type: '',
                Unit: '',
                Upper: '',
            },

            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
        };
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    watch: {
        tableData(val) {
            this.$refs.multipleTable3.setCurrentRow(val[0], true);
        },
        tableData1(val) {
            this.$refs.multipleTable1.setCurrentRow(val[0], true);
        },
        tableData2(val) {
            this.$refs.multipleTable2.setCurrentRow(val[0], true);
        },
        VpowerData(val) {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log('2312', this.buttonarr);
            this.buttonarr.forEach((item) => {
                if (item.RightName == '工序管理-新建工序按钮') {
                    this.tjgxid = item.RightID;
                } else if (item.RightName == '工序管理-修改按钮') {
                    this.xggxid = item.RightID;
                } else if (item.RightName == '工序管理-删除按钮') {
                    this.scgxid = item.RightID;
                } else if (item.RightName == '工序管理-工序上移按钮') {
                    this.gxsyid = item.RightID;
                } else if (item.RightName == '工位管理-新建工位按钮') {
                    this.tjgwid = item.RightID;
                } else if (item.RightName == '工位管理-修改按钮') {
                    this.xggwid = item.RightID;
                } else if (item.RightName == '工位管理-删除按钮') {
                    this.scgwid = item.RightID;
                } else if (item.RightName == '工位管理-不合格原因配置') {
                    this.bhgid = item.RightID;
                } else if (item.RightName == '工位管理-工位上移按钮') {
                    this.gwsyid = item.RightID;
                } else if (item.RightName == '参数管理-批量新建参数') {
                    this.plxjid = item.RightID;
                } else if (item.RightName == '参数管理-修改按钮') {
                    this.xmxgid = item.RightID;
                } else if (item.RightName == '参数管理-删除按钮') {
                    this.xmscid = item.RightID;
                } else if (item.RightName == '参数管理-参数上移按钮') {
                    this.xmsyid = item.RightID;
                }
            });
            var userid = '';
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjgxid}`,
            })
                .then((res) => {
                    this.tjgxshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xggxid}`,
            })
                .then((res) => {
                    this.xggxshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scgxid}`,
            })
                .then((res) => {
                    this.scgxshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.tjgwid}`,
            })
                .then((res) => {
                    this.tjgwshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xggwid}`,
            })
                .then((res) => {
                    this.xggwshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scgwid}`,
            })
                .then((res) => {
                    this.scgwshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bhgid}`,
            })
                .then((res) => {
                    this.bhgshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gxsyid}`,
            })
                .then((res) => {
                    this.gxsyshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.gwsyid}`,
            })
                .then((res) => {
                    this.gwsyshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.plxjid}`,
            })
                .then((res) => {
                    this.plxjshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmxgid}`,
            })
                .then((res) => {
                    this.xmxgshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmscid}`,
            })
                .then((res) => {
                    this.xmscshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xmsyid}`,
            })
                .then((res) => {
                    this.xmsyshow = res.data.data;
                })
                .catch((err) => {
                    console.log('err', err);
                });
        },
        itemname(newval) {
            this.itemname = newval;
        },

        oneselect(val) {
            let i = 0;
            for (i in this.projectlist) {
                if (val == this.projectlist[i].DeviceName) {
                    this.projectlist2 = this.projectlist[i].Groups;
                    this.twoselect = this.projectlist[i].Groups[0].GroupName;
                }
            }
            this.watchdata();
        },
        twoselect(val) {
            let i = 0;
            console.log('sad');
            for (i in this.projectlist2) {
                if (val == this.projectlist2[i].GroupName) {
                    this.projectlist3 = this.projectlist2[i].DataTypes;
                    // this.threeselect = this.projectlist3[0].Value;
                    this.threeselect = this.lang.AlarmRecord_HT_Unlimited;
                }
            }
            this.watchdata();
        },
        threeselect(val) {
            this.watchdata();
        },
    },
    methods: {
        getLangData() {
            this.twoworkdata = {
                WID: '',
                a11: 1,
                StepName:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsAuto: false,
                ProductID:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsRelated: false,
                FinishTag1:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                FinishTag2:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsAbsolute: true,
                AbsoQualTag:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified,
                IsQualTag:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                SID: '',
            };
            this.twoObj = {
                WID: '',
                StepName: '',
                IsAuto: false,
                ProductID:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsRelated: false,
                FinishTag1:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                FinishTag2:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsAbsolute: false,
                AbsoQualTag: '',
                IsQualTag:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                SID: '',
            };
            this.pd = [
                this.lang
                    .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified,
                this.lang
                    .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified,
            ];
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
        int() {
            this.twono = this.sixData;
            let a = JSON.stringify(this.oneno);
            this.sixData = JSON.parse(a);
            // this.intdata();
            console.log(this.sixData);
            this.mewntchangedata = '';
        },
        bluer() {
            this.oneno = this.sixData;
            let a = JSON.stringify(this.twono);
            this.sixData = JSON.parse(a);
            // this.sixData = [];
            // this.blurdata();
            // console.log(this.sixData);
            this.mewntchangedata = '';
        },
        blurdata() {
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/GstUnQualBoolList?argSId=${this.workproject}`
                )
                .then((res) => {
                    this.sixData = res.data.data;
                    console.log('aaa', res);
                });
        },
        mewant(a) {
            console.log(a);
            this.mewntchangedata = a;
        },
        pre11() {
            console.log(this.workproject);
            this.argWorkProjects = this.projectlistdata1;
            if (this.argWorkProjects.length == 0) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_AddWorkProject1ViewModel_PleaseAddProject;
            } else {
                console.log(this.argWorkProjects, this.workproject);
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/BatchAddProject',
                    data: {
                        argWorkProjects: this.argWorkProjects,
                        argSId: this.workproject,
                    },
                }).then((res) => {
                    this.pdyd5 = true;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${
                                ($('.tip').width() / 2) * this.a11
                            }px)`,
                            top: `calc(50% - ${
                                ($('.tip').height() / 2) * this.a11
                            }px)`,
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    if (res.data.msg == '请求成功') {
                        this.tipword = res.data.data;
                        this.someprochange = false;
                        this.getthreedata();
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            }
        },
        addwantproject() {
            // this.projectlistdata1 = [];
            if (this.adata.length !== 0) {
                let a = JSON.stringify(this.adata);
                let b = JSON.parse(a);
                for (let i = 0; i < b.length; i++) {
                    this.projectlistdata1.push(b[i]);
                }
                for (let j = 0; j < this.projectlistdata1.length; j++) {
                    this.projectlistdata1[j].Number = j;
                }
                this.$refs.multipleTable.clearSelection();
                this.adata = [];
            } else {
                let a = JSON.stringify(this.projectlistdata2);
                let b = JSON.parse(a);
                console.log(b);
                for (let i = 0; i < b.length; i++) {
                    this.projectlistdata1.push(b[i]);
                }
                for (let j = 0; j < this.projectlistdata1.length; j++) {
                    this.projectlistdata1[j].Number = j;
                }
                this.$refs.multipleTable.clearSelection();
                this.projectlistdata2 = [];
            }
        },
        selectall(a) {
            let i = 0;
            for (i in a) {
                a[i].Upper = 100;
                a[i].Lower = 0;
                a[i].ProjectName = a[i].Name;
                a[i].ProjectValueTagName = a[i].Name;
                a[i].Unit = '//';
                a[i].DataType = a[i].DateType;
                // if (
                //     a[i].DateType == this.lang['F64位浮点数IEEE754'] ||
                //     a[i].DateType == this.lang['F32位浮点数IEEE754']
                // ) {
                //     a[i].Digit = 2;
                // } else {
                //     a[i].Digit = '';
                // }
            }
            this.adata = a;
        },
        removeproject() {
            this.projectlistdata1 = this.projectlistdata1.filter((item) => {
                let arrlist = this.projectlistdata3.map((v) => v.Number);
                return !arrlist.includes(item.Number);
            });
        },
        selectall1(a) {
            this.projectlistdata3 = a;
        },
        select1(a) {
            this.projectlistdata3 = a;

            console.log(a);
        },
        select(a) {
            //
            let i = 0;
            for (i in a) {
                a[i].Upper = 100;
                a[i].Lower = 0;
                a[i].ProjectName = a[i].Name;
                a[i].ProjectValueTagName = a[i].Name;
                a[i].Unit = '//';
                a[i].DataType = a[i].DateType;
                // if (
                //     a[i].DateType == this.lang['F64位浮点数IEEE754'] ||
                //     a[i].DateType == this.lang['F32位浮点数IEEE754']
                // ) {
                //     a[i].Digit = 2;
                // } else {
                //     a[i].Digit = '';
                // }
            }
            this.projectlistdata2 = a;
            console.log(a);
        },
        gbgl() {
            // this.twoworkdata.IsRelated = !this.twoworkdata.IsRelated;
            console.log(this.twoworkdata.IsRelated);
        },
        lookforsearch() {
            this.watchdata();
        },
        tip1() {
            this.tipchange = false;
            this.haschange = 1;
        },
        no1() {
            this.a = '';
            this.tipchange = false;
            this.deltrue = true;
        },
        haschange1(a, b) {
            console.log(a);
        },
        yes1() {
            if (this.a == 1) {
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/DelWorkSection?argWId=${this.oneworkduan}`
                    )
                    .then((res) => {
                        this.pdyd5 = true;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            this.onework = false;
                            this.deltrue = true;
                            this.getonedata();
                        } else {
                            this.tipword = res.data.msg;
                            this.deltrue = true;
                        }
                    });
            } else if (this.a == 2) {
                console.log(this.workproject);
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/DelWorkStep?argSId=${this.workproject}`
                    )
                    .then((res) => {
                        this.pdyd5 = true;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            this.onework = false;
                            this.deltrue = true;
                            this.gettwodata();
                        } else {
                            this.tipword = res.data.msg;
                            this.deltrue = true;
                        }
                    });
            } else if (this.a == 3) {
                console.log(this.PID);
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/DelProject?argPId=${this.PID}`
                    )
                    .then((res) => {
                        this.pdyd5 = true;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            this.onework = false;
                            this.deltrue = true;
                            this.getthreedata();
                        } else {
                            this.tipword = res.data.msg;
                            this.deltrue = true;
                        }
                    });
            } else if (this.a == 4) {
                this.tipchange = false;
                //     let a = 0;
                // for(a=0;a<this.sixData.length;a++){
                //     if(this.mewntchangedata.Number == this.sixData[a].Number){
                //         this.sixData.splice(a,1);
                //     }
                // }
                //    for(a=0;a<this.sixData.length;a++){
                //        let b = a+1;
                //        this.sixData[a].Number = b;
                //    }
                if (this.radio == 1) {
                    this.deltrue = true;
                    console.log(this.sixData);
                    console.log(this.mewntchangedata);
                    let i;
                    for (i = 0; i < this.sixData.length; i++) {
                        if (
                            this.sixData[i].Number ==
                            this.mewntchangedata.Number
                        ) {
                            this.sixData.splice(i, 1);
                        }
                    }
                    for (i = 0; i < this.sixData.length; i++) {
                        let j = i + 1;
                        this.sixData[i].Number = j;
                    }
                    for (i = 0; i < this.oneno.length; i++) {
                        if (
                            this.oneno[i].Number == this.mewntchangedata.Number
                        ) {
                            this.oneno.splice(i, 1);
                        }
                    }
                    for (i = 0; i < this.oneno.length; i++) {
                        let j = i + 1;
                        this.oneno[i].Number = j;
                    }
                } else if (this.radio == 2) {
                    this.deltrue = true;

                    let i;
                    for (i = 0; i < this.sixData.length; i++) {
                        if (
                            this.sixData[i].Number ==
                            this.mewntchangedata.Number
                        ) {
                            this.sixData.splice(i, 1);
                        }
                    }
                    for (i = 0; i < this.sixData.length; i++) {
                        let j = i + 1;
                        this.sixData[i].Number = j;
                    }
                    for (i = 0; i < this.twono.length; i++) {
                        if (
                            this.twono[i].Number == this.mewntchangedata.Number
                        ) {
                            this.twono.splice(i, 1);
                        }
                    }
                    for (i = 0; i < this.twono.length; i++) {
                        let j = i + 1;
                        this.twono[i].Number = j;
                    }
                }
            }
        },
        pre1() {},
        onedel() {
            if (!this.scgxshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.a = 1;
            this.pdyd5 = true;
            setTimeout(() => {
                $('.tip').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`,
                });
                this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            this.tipword =
                this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_MessDeleteSection;
            this.deltrue = false;
        },
        delthree() {
            if (!this.xmscshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.a = 3;
            this.pdyd5 = true;
            setTimeout(() => {
                $('.tip').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`,
                });
                this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            if (!this.PID) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProject;
            } else {
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_MessDeleteItem;
                this.deltrue = false;
            }
        },
        deltwo() {
            if (!this.scgwshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            if (this.tableData1.length === 0) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProcess;
                return;
            }
            this.a = 2;
            this.pdyd5 = true;
            setTimeout(() => {
                $('.tip').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.tip').width() / 2) * this.a11}px)`,
                    top: `calc(50% - ${($('.tip').height() / 2) * this.a11}px)`,
                });
                this.tipchange = true;
                this.move('tip', 'tiphead');
            });
            this.tipword =
                this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_MessDeleteProcess;
            this.deltrue = false;
        },
        onepre() {
            if (this.onechange == 2) {
                // this.oneworkduan = '';

                let a = '';
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/AddWorkSection?argWId=${a}&argName=${this.oneObj}&userTagName=${this.oneObjEX.OperID}&manual=${this.oneObjEX.checkBoxSelect}`
                    )
                    .then((res) => {
                        this.pdyd5 = true;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            this.onework = false;
                            this.getonedata();
                        } else {
                            this.tipword = res.data.msg;
                        }
                    });
            } else {
                this.$axios
                    .post(
                        `/api/ProcessParameterConfigure/AddWorkSection?argWId=${this.oneworkduan}&argName=${this.oneObj}&userTagName=${this.oneObjEX.OperID}&manual=${this.oneObjEX.checkBoxSelect}`
                    )
                    .then((res) => {
                        this.pdyd5 = true;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        if (res.data.msg == '请求成功') {
                            this.tipword = res.data.data;
                            console.log('ddddddddddddddddd');
                            this.oneworkname = this.oneObj;
                            this.onework = false;
                            this.getonedata();
                        } else {
                            this.tipword = res.data.msg;
                        }
                    });
            }
        },
        addsomepro() {
            if (!this.plxjshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            if (this.tableData1.length === 0) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProcess;
                return;
            }
            let that = this;
            setTimeout(() => {
                $('.addsomepro').css({
                    left: `calc(50% - ${
                        ($('.addsomepro').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.addsomepro').height() / 2) * this.a11
                    }px)`,
                });
                that.someprochange = true;

                this.move('addsomepro', 'addsomeprotop');
            });
            setTimeout(() => {
                if (that.a11 > 1) {
                    console.log(
                        $('.tablecsbbone').find('.el-table__body-wrapper')[0]
                    );

                    $('.tablecsbbone').find(
                        '.el-table__body-wrapper'
                    )[0].style.height = that.a11 * 156 + 'px';
                    console.log(
                        $('.tablecsbbone').find('.el-table__body-wrapper')[0]
                            .style.height
                    );

                    $('.tablecsbbtwo').find(
                        '.el-table__body-wrapper'
                    )[0].style.height = that.a11 * 150 + 'px';
                }
            }, 1000);
            this.addproject();
            this.watchdata();
            this.projectlistdata1 = [];
        },
        changeproject() {
            if (!this.xmxgshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            if (this.tableData2.length === 0) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProject;
                return;
            }
            let a = JSON.stringify(this.twoworkdata);
            this.daiti1 = JSON.parse(a);
            let a1 = JSON.stringify(this.projectchangedata);
            this.threeObj = { ...this.projectchangedata };
            this.daiti2 = JSON.parse(a1);
            setTimeout(() => {
                $('.changpro').css({
                    zoom: this.a11,
                    left: `calc(50% - ${
                        ($('.changpro').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.changpro').height() / 2) * this.a11
                    }px)`,
                });
                this.projectchange = true;
                this.move('changpro', 'changetop');
            });
        },
        intdata() {
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/GstUnQualIntList?argSId=${this.workproject}`
                )
                .then((res) => {
                    this.sixData = res.data.data;
                    console.log('aaa', this.sixData);
                });
        },
        nosix() {
            if (!this.bhgshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            if (this.workproject === '') {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProcess;
                return;
            }
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/QueryUnqualifiedReason?id=${this.workproject}`
                )
                .then((res) => {
                    this.twono = [];
                    this.oneno = [];
                    this.sbint = '';
                    console.log(res.data.data);
                    this.unsixdata = res.data.data.Step;
                    if (res.data.data.Step.ReasonType == 1) {
                        this.radio = '1';
                        this.$axios
                            .post(
                                `/api/ProcessParameterConfigure/GstUnQualIntList?argSId=${this.workproject}`
                            )
                            .then((res) => {
                                console.log(res);
                                this.sixData = res.data.data.Datas;
                                this.sbint = res.data.data.TagName;
                                setTimeout(() => {
                                    this.unsixth = true;
                                    this.move('Unqualified', 'unqualifiedtop');
                                });
                                this.pdyd4 = true;
                            });
                    } else {
                        this.radio = '2';
                        this.$axios
                            .post(
                                `/api/ProcessParameterConfigure/GstUnQualBoolList?argSId=${this.workproject}`
                            )
                            .then((res) => {
                                console.log(res);
                                this.sixData = res.data.data;
                                // this.sbint = this.sixData[0].Variable;
                                this.pdyd4 = true;
                                setTimeout(() => {
                                    this.unsixth = true;
                                    this.move('Unqualified', 'unqualifiedtop');
                                });
                            });
                    }
                    let a = JSON.stringify(this.twoworkdata);
                    this.daiti1 = JSON.parse(a);
                    let a1 = JSON.stringify(this.projectchangedata);
                    this.daiti2 = JSON.parse(a1);
                    // console.log(res.data);
                    // let i = 0;
                    // for (i in res.data.data.BoolReason) {
                    //     res.data.data.BoolReason[i].Number = ++i;
                    // }
                    // this.sixData = res.data.data.BoolReason;
                    // console.log(this.sixData);
                });
        },
        onetop(a) {
            if (!this.gxsyshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            console.log(a);
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/MoveUpSection?argWId=${a.WID}`
                )
                .then((res) => {
                    console.log(res);
                    this.getonedata();
                });
        },
        twotop(a) {
            if (!this.gwsyshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/MoveUpStep?argSID=${a.SID}`
                )
                .then((res) => {
                    console.log(res);
                    this.gettwodata();
                });
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = $(`.${name}`).width() / 2 + 'px';
            let top = $(`.${name}`).height() / 2 + 'px';
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function (e) {
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
                        // console.log(nx);
                        // console.log(x);
                        // console.log(l);
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
        threetop(a) {
            if (!this.xmsyshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/MoveUpProject?argPID=${a.PID}`
                )
                .then((res) => {
                    console.log(res);
                    this.getthreedata();
                });
        },
        handleEdit() {},
        watchdata() {
            let arr = [];
            if (this.threeselect == this.lang.AlarmRecord_HT_Unlimited) {
                this.projectlist3
                    .filter(
                        (f) => f.Value !== this.lang.AlarmRecord_HT_Unlimited
                    )
                    .forEach((item) => {
                        arr.push(item.Value);
                    });
            } else {
                arr.push(this.threeselect);
            }
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterConfigure/GstVariableList`,
                data: {
                    argDevice: this.oneselect,
                    argGroup: this.twoselect,
                    argDataType: arr,
                    argKeyWord: this.projectkeyword,
                    argPageSize: this.pageDate.PageSize,
                    argPageIndex: this.pageDate.PageIndex,
                },
            }).then((res) => {
                console.log('ss', res);
                this.projectlistdata = res.data.data.DataList;

                this.pageDate = res.data.data.ParameterList;
                this.nowpage = this.pageDate.PageIndex;
                console.log('sss', this.pageDate);
                //     this.pageDate.togesize = this.projectlistdata.length;
                //     this.pageDate.togeIndex = Math.ceil(
                //         this.projectlistdata.length / 50
                //     );
                //     let a = this.nowIndex - 1;
                //     if (this.pageDate.togesize <= 50) {
                //         let b = this.pageDate.togesize;
                //         this.pageDate.pageIndex = this.nowIndex;
                //     } else {
                //         let b = this.nowIndex * 1 + 1;
                //         this.pageDate.pageIndex = this.nowIndex;
                //         this.projectlistdata = this.projectlistdata.splice(
                //             a * 1,
                //             50
                //         );
                //         // let c = 0;
                //         // for(c in this.projectlistdata){
                //         //     let d = (parseInt(c)+1);
                //         //     this.projectlistdata[c].Number = d;
                //         // }
                //     }
                //     if (this.nowIndex >= this.pageDate.togeIndex) {
                //         this.aaa1 = false;
                //     } else {
                //         this.aaa1 = true;
                //     }
                //     if (this.nowIndex < this.pageDate.togeIndex) {
                //         this.bbb1 = false;
                //     } else {
                //         this.bbb1 = true;
                //     }
                //     this.nowpage = 1;
            });
        },
        blpre() {
            this.$emit('submit', this.wantdata)
        },

        addproject(arr) {
            let resarr;
            if (arr) {
                console.log('数组', arr);
                resarr = arr;
            } else {
                resarr = '';
            }

            var $this = this;
            this.pageDate.PageIndex = 1;
            this.$axios({
                url: `/api/ProcessParameterConfigure/GstCondition`,
                method: 'post',
                data: resarr,
            })
                .then((res) => {
                    console.log(':sadasdsaddas', res);
                    $this.projectlist = res.data.data;
                    $this.projectlist2 = JSON.parse(
                        JSON.stringify($this.projectlist[0].Groups)
                    );
                    $this.projectlist3 = JSON.parse(
                        JSON.stringify($this.projectlist2[0].DataTypes)
                    );
                    $this.oneselect = JSON.parse(
                        JSON.stringify($this.projectlist[0].DeviceName)
                    );
                    $this.twoselect = JSON.parse(
                        JSON.stringify($this.projectlist2[0].GroupName)
                    );
                    // this.threeselect = this.projectlist3[0].Value;
                    $this.threeselect = JSON.parse(
                        JSON.stringify($this.lang.AlarmRecord_HT_Unlimited)
                    );
                    console.log(
                        'jjj',
                        $this.projectlist,
                        $this.projectlist2,
                        $this.projectlist3,
                        $this.oneselect,
                        $this.twoselect,
                        $this.threeselect
                    );
                })
                .then(() => {
                    this.watchdata();
                    this.lookforsearch1 = true;
                });
        },
        gxpre() {
            if (this.onechange == 2) {
                console.log('新建');
                this.twoObj.WID = this.oneworkduan;
                delete this.twoObj.SID;
                if (
                    this.twoObj.AbsoQualTag ==
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified
                ) {
                    this.twoObj.AbsoQualTag = 1;
                } else {
                    this.twoObj.AbsoQualTag = 2;
                }
                this.twoObj.StepName = this.twoObj.OriginalStepName;
                console.log(this.twoObj);
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/AddWorkStep',
                    data: this.twoObj,
                }).then((res) => {
                    if (res.data.msg == '请求成功') {
                        this.tipword = res.data.data;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd5 = true;
                        this.twowork = false;
                        this.gettwodata();
                    } else {
                        console.log(res);
                        this.tipword = res.data.msg;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd5 = true;
                        console.log(this.twoworkdata);
                        if (this.twoObj.AbsoQualTag == 1) {
                            this.twoObj.AbsoQualTag =
                                this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified;
                        } else {
                            this.twoObj.AbsoQualTag =
                                this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified;
                        }
                    }
                });
            } else {
                console.log('修改');
                this.twoObj.WID = this.oneworkduan;

                console.log('修改属性', this.twoObj);
                if (
                    this.twoObj.AbsoQualTag ==
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified
                ) {
                    this.twoObj.AbsoQualTag = 1;
                } else {
                    this.twoObj.AbsoQualTag = 2;
                }
                this.twoObj.IsQualTag = this.twoObj.IsQualitiedTagName;
                let xgdata = JSON.parse(JSON.stringify(this.twoObj));
                xgdata.StepName = xgdata.OriginalStepName;
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/AddWorkStep',
                    data: xgdata,
                }).then((res) => {
                    console.log(res);
                    console.log(this.twoObj);
                    if (res.data.msg == '请求成功') {
                        this.tipword = res.data.data;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd5 = true;
                        this.twowork = false;
                        this.gettwodata();
                    } else {
                        this.pdyd5 = true;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.tipword = res.data.msg;
                        if (this.twoObj.AbsoQualTag == 1) {
                            this.twoObj.AbsoQualTag =
                                this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified;
                        } else {
                            this.twoObj.AbsoQualTag =
                                this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified;
                        }
                    }
                    this.twoworkdata = { ...this.twoObj };
                });
            }
            console.log(this.twoObj);
        },
        addnewblue() {
            this.sbblue = '';
            this.ddd = false;
            this.two = 1;
            this.sbvalue = '';
            this.sbreason = '';
            setTimeout(() => {
                this.newblue = true;
                this.move('newblue', 'newbluetop');
            });
            this.oneword =
                this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_NewIntegerReason;
            this.twoword =
                this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_NewBoolreason;
        },
        changenewblue() {
            this.oneword =
                this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_ModifyIntegerReason;
            this.twoword =
                this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_ModifyBoolReason;
            this.two = 2;
            if (!this.mewntchangedata) {
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonViewModel_PSFailureReason;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
            } else {
                setTimeout(() => {
                    this.newblue = true;
                    this.move('newblue', 'newbluetop');
                });
                this.sbreason = this.mewntchangedata.Reason;
                this.sbvalue = this.mewntchangedata.Value;
                this.sbblue = this.mewntchangedata.TagName;
                this.ddd = this.mewntchangedata.IsReset;
            }
        },
        addnewbluepre() {
            if (String(this.sbvalue).trim() === '') {
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_PEIntegerIdentification;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                return;
            }
            if (!/^(\-|\+)?\d+$/.test(this.sbvalue)) {
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedNumbers;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                return;
            }
            if (!this.sbreason) {
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_PEReason;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                return;
            }
            if (this.radio == '1') {
                if (this.two == 1) {
                    let a = {
                        Value: Number(this.sbvalue),
                        Reason: this.sbreason,
                        Number: this.sixData.length + 1,
                    };
                    // let c = JSON.stringify(this.sbvalue);
                    // let cc = JSON.parse(c);
                    var cc = JSON.parse(JSON.stringify(this.sbvalue));
                    if (this.sixData.length !== 0) {
                        var list = [];
                        this.sixData.forEach((item) => {
                            list.push(Number(item.Value));
                        });
                        if (list.includes(Number(this.sbvalue))) {
                            setTimeout(() => {
                                $('.tip').css({
                                    zoom: this.a11,
                                    left: `calc(50% - ${
                                        ($('.tip').width() / 2) * this.a11
                                    }px)`,
                                    top: `calc(50% - ${
                                        ($('.tip').height() / 2) * this.a11
                                    }px)`,
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd5 = true;
                            this.tipword =
                                this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedRepeat;
                            return;
                        } else {
                            this.sixData.push(a);
                            this.newblue = false;
                            return;
                        }
                        // for (let a1 = 0; a1 < this.sixData.length; a1++) {
                        //     if ( a.Value == this.sixData[a1].Value &&a.Value !== cc ) {
                        //     setTimeout(() => {
                        //             $('.tip').css({
                        //                 zoom: this.a11,
                        //                 left: `calc(50% - ${($('.tip').width() / 2) *
                        //                     this.a11}px)`,
                        //                 top: `calc(50% - ${($('.tip').height() / 2) *
                        //                     this.a11}px)`
                        //             });
                        //             this.tipchange = true;
                        //             this.move('tip', 'tiphead');
                        //         });
                        //         this.pdyd5 = true;
                        //         this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedRepeat;
                        //         break;
                        //     } else {
                        //         this.sixData.push(a);
                        //         this.newblue = false;
                        //         break;
                        //     }
                        // }
                    } else {
                        this.sixData.push(a);

                        this.newblue = false;
                    }
                } else if (this.two == 2) {
                    var cc = JSON.parse(JSON.stringify(this.sbvalue));
                    if (this.sixData.length !== 0) {
                        var list = [];
                        this.sixData.forEach((item) => {
                            list.push(Number(item.Value));
                        });

                        if (
                            list.includes(Number(this.sbvalue)) &&
                            Number(this.mewntchangedata.Value) !==
                                Number(this.sbvalue)
                        ) {
                            setTimeout(() => {
                                $('.tip').css({
                                    zoom: this.a11,
                                    left: `calc(50% - ${
                                        ($('.tip').width() / 2) * this.a11
                                    }px)`,
                                    top: `calc(50% - ${
                                        ($('.tip').height() / 2) * this.a11
                                    }px)`,
                                });
                                this.tipchange = true;
                                this.move('tip', 'tiphead');
                            });
                            this.pdyd5 = true;
                            this.tipword =
                                this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedRepeat;
                            return;
                        }
                        // for (var a1 = 0; a1 < this.sixData.length; a1++) {
                        //     if (this.sbvalue == this.sixData[a1].Value && this.sbvalue !== cc) {
                        //         debugger
                        //         setTimeout(() => {
                        //             $('.tip').css({
                        //                 zoom: this.a11,
                        //                 left: `calc(50% - ${($('.tip').width() / 2) *
                        //                     this.a11}px)`,
                        //                 top: `calc(50% - ${($('.tip').height() / 2) *
                        //                     this.a11}px)`
                        //             });
                        //             this.tipchange = true;
                        //             this.move('tip', 'tiphead');
                        //         });
                        //         this.pdyd5 = true;
                        //         this.tipword = this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonIntViewModel_SaveFailedRepeat;
                        //         return;
                        //     }
                        // }
                        for (let a1 = 0; a1 < this.sixData.length; a1++) {
                            if (
                                this.mewntchangedata.Number ==
                                this.sixData[a1].Number
                            ) {
                                this.newblue = false;

                                this.sixData[a1].Value = Number(this.sbvalue);
                                this.sixData[a1].Reason = this.sbreason;
                            }
                        }
                    }
                }
            }
        },
        addnewbluepre1() {
            if (!this.sbblue) {
                // this.tipword = '请选择布尔型识别值!';
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_PSBooleanVariable;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                return;
            }
            if (!this.sbreason) {
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonBoolViewModel_PEReason;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                return;
            }
            if (this.radio == 2) {
                if (this.two == 1) {
                    console.log(this.ddd);
                    let a = {
                        IsReset: this.ddd,
                        Reason: this.sbreason,
                        TagName: this.sbblue,
                        Number: this.sixData.length + 1,
                    };
                    if (this.sixData.length !== 0) {
                        this.sixData.push(a);

                        this.newblue = false;
                    } else {
                        this.sixData.push(a);

                        this.newblue = false;
                    }
                    console.log(this.sixData);
                } else if (this.two == 2) {
                    if (this.sixData.length !== 0) {
                        for (let a1 = 0; a1 < this.sixData.length; a1++) {
                            if (
                                this.mewntchangedata.Number ==
                                this.sixData[a1].Number
                            ) {
                                this.newblue = false;
                                this.sixData[a1].IsReset = this.ddd
                                    ? true
                                    : false;
                                this.sixData[a1].TagName = this.sbblue;
                                this.sixData[a1].Reason = this.sbreason;
                            }
                        }
                    }
                }
            }
        },
        delnewblue() {
            console.log(this.radio);
            this.a = 4;
            if (!this.mewntchangedata) {
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonViewModel_PSFailureReason;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
            } else {
                this.deltrue = false;
                this.pdyd5 = true;
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                if (this.radio == '1') {
                    this.tipword =
                        this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonViewModel_MessDeleteIntReason;
                } else {
                    this.tipword =
                        this.lang.ProcessParameterConfigure_HT_UnQualitiedReasonViewModel_MessDeleteBoolReason;
                }
            }
        },
        look8() {
            this.one = 8;
            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });

            this.pdyd3 = true;
            this.addproject();
        },
        look9() {
            this.one = 9;
            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });

            this.pdyd3 = true;
            this.addproject();
        },
        look10() {
            this.one = 10;
            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });

            this.pdyd3 = true;
            this.addproject();
        },
        look11() {
            this.one = 11;
            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });

            this.pdyd3 = true;
            this.addproject();
        },
        look2() {
            this.one = 1;
            this.istwo = false;
            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });

            this.pdyd3 = true;
            console.log('1', this.bbb);
            this.addproject();
        },

        look3() {
            this.one = 1;
            this.istwo =
                this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_CompletionSignal;
            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });
            this.pdyd3 = true;
            this.addproject();
        },
        look() {
            this.one = 1;
            this.istwo =
                this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_QualifiedSignal;
            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });
            this.pdyd3 = true;
            this.addproject();
        },
        look4() {
            this.one = 2;

            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });
            this.pdyd3 = true;

            this.addproject();
        },
        look6() {
            this.one = 3;

            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });
            this.pdyd3 = true;
            let arr = [
                '有符号8位整型',
                '无符号8位整型',
                '有符号16位整型',
                '无符号16位整型',
                '有符号32位整型',
                '无符号32位整型',
                '有符号64位整型',
                '无符号64位整型',
            ];

            this.addproject(arr);
        },
        look5() {
            this.one = 4;
            this.pdyd3 = true;
            setTimeout(() => {
                $('.look').css({
                    left: `calc(50% - ${
                        ($('.look').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.look').height() / 2) * this.a11
                    }px)`,
                });
                this.lookchange = true;
                this.move('look', 'looktop');
            });
            let arr = ['不限', '二进制变量'];
            this.addproject(arr);
        },
        look1() {
            this.one = 1;
            this.istwo =
                this.lang.ProcessParameterConfigure_ProcessParameterConfigureUserControl_DataGrid_AssociatedSignal;
            if (this.twoObj.IsRelated) {
                this.pdyd3 = true;
                setTimeout(() => {
                    $('.look').css({
                        left: `calc(50% - ${
                            ($('.look').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.look').height() / 2) * this.a11
                        }px)`,
                    });
                    this.lookchange = true;
                    this.move('look', 'looktop');
                });

                this.addproject();
            }
        },
        changeone() {
            if (!this.xggxshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.oneworkname = this.daiti;
            let a = JSON.stringify(this.oneworkname);
            this.daiti = JSON.parse(a);

            this.onechange = 1;
            console.log('----', this.oneworkname);
            this.oneObj = this.oneworkname;

            let obj = this.tableData.find((_) => _.WID == this.oneworkduan);
            console.log(obj);
            this.oneObjEX.OperID = obj.UserTagName;
            this.oneObjEX.checkBoxSelect = obj.Manual;

            // if (this.oneworkname !== '') {
            setTimeout(() => {
                $('.onework').css({
                    zoom: this.a11,
                    left: `calc(50% - ${
                        ($('.onework').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.onework').height() / 2) * this.a11
                    }px)`,
                });
                this.onework = true;
                this.move('onework', 'oneworktop');
            });
            this.pdyd1 = true;
            // }
        },
        changethree() {
            this.threeObj.DataType = this.threeObj.Type;
            console.log(this.projectchangedata);
            let xgdata = JSON.parse(JSON.stringify(this.threeObj));
            xgdata.ProjectName = xgdata.OriginalProjectName;
            this.$axios({
                method: 'post',
                url: '/api/ProcessParameterConfigure/UpdateProject',
                data: xgdata,
            }).then((res) => {
                if (res.data.msg == '请求成功') {
                    this.tipword = res.data.data;
                    this.projectchange = false;
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${
                                ($('.tip').width() / 2) * this.a11
                            }px)`,
                            top: `calc(50% - ${
                                ($('.tip').height() / 2) * this.a11
                            }px)`,
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.projectchangedata = this.threeObj;
                    this.pdyd5 = true;
                    this.twowork = false;
                    this.getthreedata();
                } else {
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${
                                ($('.tip').width() / 2) * this.a11
                            }px)`,
                            top: `calc(50% - ${
                                ($('.tip').height() / 2) * this.a11
                            }px)`,
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd5 = true;
                    this.tipword = res.data.msg;
                }
            });
            // this.$axios({
            //     method:'post',
            //     url:`/api/ProcessParameterConfigure/UpdateProject`,
            //     data:
            // }).then(res => {

            // }
        },
        tableRowClassName(row) {
            return 'row-bg';
        },
        cancel1() {
            this.lookchange = false;
            this.$emit('cancel')
        },
        addone() {
            if (!this.tjgxshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
console.log('add')
            this.onechange = 2;
            this.oneObjEX.OperID = '';
            this.oneObjEX.checkBoxSelect = false;
            setTimeout(() => {
                $('.onework').css({
                    zoom: this.a11,
                    left: `calc(40% - ${
                        ($('.oneworktop').width() / 2) * this.a11
                    }px)`,
                    top: `calc(40% - ${
                        ($('.oneworktop').height() / 2) * this.a11
                    }px)`,
                });
                this.onework = true;
                this.move('onework', 'oneworktop');
            });
            this.pdyd1 = true;
            this.oneObj = '';
            this.oneworkname = '';
        },
        changetwo() {
            if (!this.xggwshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            if (this.tableData1.length === 0) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword =
                    this.lang.ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_SelectProcess;
                return;
            }

            this.onechange = 1;
            setTimeout(() => {
                $('.twowork ').css({
                    zoom: this.a11,
                    left: `calc(50% - ${
                        ($('.twowork ').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.twowork ').height() / 2) * this.a11
                    }px)`,
                });
                this.twowork = true;
                this.move('twowork', 'twoworktop');
            });

            let a = JSON.stringify(this.twoworkdata);
            this.daiti1 = JSON.parse(a);
            let a1 = JSON.stringify(this.projectchangedata);
            this.twoObj = { ...this.twoworkdata };
            this.ccc = this.twoObj.IsAbsolute;
            this.aaa = this.twoObj.IsAuto;
            this.bbb = this.twoObj.IsRelated;

            this.pdyd2 = true;
            this.daiti2 = JSON.parse(a1);
        },
        addtwo() {
            if (!this.tjgwshow) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.aaa = false;
            this.bbb = false;
            this.ccc = false;

            this.onechange = 2;
            setTimeout(() => {
                $('.twowork ').css({
                    zoom: this.a11,
                    left: `calc(50% - ${
                        ($('.twowork ').width() / 2) * this.a11
                    }px)`,
                    top: `calc(50% - ${
                        ($('.twowork ').height() / 2) * this.a11
                    }px)`,
                });
                this.twowork = true;
                this.move('twowork', 'twoworktop');
            });
            this.pdyd2 = true;

            this.twoObj = {
                WID: '',
                StepName: '',
                IsAuto: false,
                ProductID:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsRelated: false,
                FinishTag1:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                FinishTag2:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                IsAbsolute: false,
                AbsoQualTag:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified,
                IsQualTag:
                    this.lang
                        .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null,
                SID: '',
            };
        },
        cancel() {
            console.log(this.daiti, this.twoworkdata);
            this.oneworkname = this.daiti;
            if (!this.onework) {
                this.twoworkdata = this.daiti1;
                // this.twoworkdata.AbsoQualTag = this.daiti1.AbsoQualTag;
                // this.twoworkdata.FinishTag1 = this.daiti1.FinishTag1;
                // this.twoworkdata.FinishTag2 = this.daiti1.FinishTag2;
                // this.twoworkdata.FinishTagName1 = this.daiti1.FinishTagName1;
                // this.twoworkdata.FinishTagName2 = this.daiti1.FinishTagName2;
                // this.twoworkdata.FinishType = this.daiti1.FinishType;
                // this.twoworkdata.IntTypeTagName = this.daiti1.IntTypeTagName;
                // this.twoworkdata.IsAbsolute = this.daiti1.IsAbsolute;
                // this.twoworkdata.IsAuto = this.daiti1.IsAuto;
                // this.twoworkdata.IsQualTag = this.daiti1.IsQualTag;
                // this.twoworkdata.AbsoQualTag = this.daiti1.AbsoQualTag;
                // this.twoworkdata.IsQualitiedTagName = this.daiti1.IsQualitiedTagName;
                // this.twoworkdata.IsRelated = this.daiti1.IsRelated;
                // this.twoworkdata.ProductID = this.daiti1.ProductID;
                // this.twoworkdata.ProductIDTagName = this.daiti1.ProductIDTagName;
                // this.twoworkdata.QualitiedType = this.daiti1.QualitiedType;
                // this.twoworkdata.ReasonType = this.daiti1.ReasonType;
                // this.twoworkdata.StepName = this.daiti1.StepName;
            }
            if (this.projectchangedata && !this.onework) {
                this.projectchangedata = this.daiti2;
                // this.projectchangedata.Type = this.daiti2.Type;
                // this.projectchangedata.Digit = this.daiti2.Digit;
                // this.projectchangedata.Lower = this.daiti2.Lower;
                // this.projectchangedata.ProjectName = this.daiti2.ProjectName;
                // this.projectchangedata.ProjectValueTagName = this.daiti2.ProjectValueTagName;
                // this.projectchangedata.Unit = this.daiti2.Unit;
                // this.projectchangedata.Upper = this.daiti2.Upper;
            }

            this.onework = false;
            this.twowork = false;

            this.unsixth = false;
            this.projectchange = false;
            this.someprochange = false;
        },
        cancel5() {
            this.newblue = false;
        },
        cancel51() {
            this.newblue = false;
        },
        mouseUpHandleelse1(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse1(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse1;
        },
        mouseMoveHandleelse1(event) {
            this.pdyd1 = false;
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao1.style.left = moveLeft;
            this.$refs.kongtiao1.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            this.pdyd2 = false;
            let moveLeft = event.pageX - 350 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse3(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
        },
        mouseMoveHandleelse3(event) {
            this.pdyd3 = false;
            let moveLeft = event.pageX - 550 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao3.style.left = moveLeft;
            this.$refs.kongtiao3.style.top = moveTop;
        },
        mouseUpHandleelse4(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse4(event) {
            console.log('sadasd');
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse4;
        },
        mouseMoveHandleelse4(event) {
            this.pdyd4 = false;
            let moveLeft = event.pageX - 400 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao4.style.left = moveLeft;
            this.$refs.kongtiao4.style.top = moveTop;
        },
        mouseUpHandleelse5(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse5(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse5;
        },
        mouseMoveHandleelse5(event) {
            let moveLeft = event.pageX - 250 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao5.style.left = moveLeft;
            this.$refs.kongtiao5.style.top = moveTop;
        },
        mouseUpHandleelse6(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse6(event) {
            console.log('sadasd');
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse6;
        },

        mouseMoveHandleelse6(event) {
            let moveLeft = event.pageX - 300 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao6.style.left = moveLeft;
            this.$refs.kongtiao6.style.top = moveTop;
        },
        mouseUpHandleelse7(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse7(event) {
            console.log('sadasd');
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse7;
        },
        mouseMoveHandleelse7(event) {
            let moveLeft = event.pageX - 660 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao7.style.left = moveLeft;
            this.$refs.kongtiao7.style.top = moveTop;
        },
        gaipre() {
            if (this.radio == '1') {
                console.log(this.sixData);
                let a = 0;
                for (a in this.sixData) {
                    if (!this.sixData[a].RID) {
                        this.sixData[a].RID =
                            '00000000-0000-0000-0000-000000000000';
                    }
                }
                console.log(this.workproject);
                console.log(this.sbint);
                console.log(this.sixData);
                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/SaveUnQualInt',
                    data: {
                        SID: this.workproject,
                        Variable: this.sbint,
                        UnQualIntList: this.sixData,
                    },
                }).then((res) => {
                    console.log(res);
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${
                                ($('.tip').width() / 2) * this.a11
                            }px)`,
                            top: `calc(50% - ${
                                ($('.tip').height() / 2) * this.a11
                            }px)`,
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd5 = true;
                    if (res.data.code == 0) {
                        this.tipword = res.data.data;
                        this.unsixth = false;
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            } else {
                let a = 0;
                for (a in this.sixData) {
                    if (!this.sixData[a].RID) {
                        this.sixData[a].RID =
                            '00000000-0000-0000-0000-000000000000';
                    }
                    if (
                        this.sixData[a].IsReset ==
                        this.lang
                            .ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_Yes
                    ) {
                        this.sixData[a].IsReset = true;
                    } else if (
                        this.sixData[a].IsReset ==
                        this.lang
                            .ProcessParameterConfigure_HT_ProcessParameterConfigureUserControlViewModel_No
                    ) {
                        this.sixData[a].IsReset = false;
                    }
                }
                console.log(this.sixData);
                console.log(this.workproject);

                this.$axios({
                    method: 'post',
                    url: '/api/ProcessParameterConfigure/SaveUnQualBool',
                    data: {
                        SID: this.workproject,
                        UnQualBoolList: this.sixData,
                    },
                }).then((res) => {
                    console.log(res);
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${
                                ($('.tip').width() / 2) * this.a11
                            }px)`,
                            top: `calc(50% - ${
                                ($('.tip').height() / 2) * this.a11
                            }px)`,
                        });
                        this.tipchange = true;
                        this.move('tip', 'tiphead');
                    });
                    this.pdyd5 = true;
                    if (res.data.code == 0) {
                        this.tipword = res.data.data;
                        this.unsixth = false;
                    } else {
                        this.tipword = res.data.msg;
                    }
                });
            }
        },
        handleRowChange(row, event, column) {
            this.oneworkduan = row.WID;
            this.daiti = row.OriginalWorkName;
            this.oneworkname = row.OriginalWorkName;
            this.gettwodata();
        },
        handleRowChange5(a) {
            this.wantdata = a;
            console.log(a);
            this.projectchangedata.DataType = a.DateType;
        },
        handleRowChange1(row, event, column) {
            this.nowtwo = row.Number - 1;
            this.workproject = row.SID;
            this.getthreedata();
            this.daiti1 = row;
            this.twoworkdata = row;
            this.twoworkdata.ProductID =
                row.ProductIDTagName ===
                this.lang
                    .ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated
                    ? this.lang
                          .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null
                    : row.ProductIDTagName;
            this.twoworkdata.FinishTag1 = row.FinishTagName1;
            this.twoworkdata.FinishTag2 = row.FinishTagName2;
            if (row.FinishType == 1) {
                this.twoworkdata.IsRelated = false;
            } else {
                this.twoworkdata.IsRelated = true;
            }
            this.bbb = this.twoworkdata.IsRelated;
            if (row.QualitiedType == 1) {
                this.twoworkdata.AbsoQualTag =
                    this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified;
                this.twoworkdata.IsAbsolute = true;
            } else if (row.QualitiedType == 2) {
                this.twoworkdata.AbsoQualTag =
                    this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified;
                this.twoworkdata.IsAbsolute = true;
            } else {
                this.twoworkdata.AbsoQualTag =
                    this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified;
                this.twoworkdata.IsAbsolute = false;
            }
            this.ccc = this.twoworkdata.IsAbsolute;

            if (
                row.ProductIDTagName ==
                this.lang
                    .ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated
            ) {
                this.twoworkdata.IsAuto = true;
            } else {
                this.twoworkdata.IsAuto = false;
            }
            this.aaa = this.twoworkdata.IsAuto;
            if (!this.twoworkdata.IsRelated) {
                this.twoworkdata.FinishTag2 = '';
            }
            // this.twoworkdata.IsQualTag = row.IsQualitiedTagName;

            //         this.aaa = this.twoworkdata.IsAuto;
            console.log(this.aaa);
            console.log(row.ProductIDTagName);
            // console.log(this.bbb);
            // console.log(this.twoworkdata.IsAuto);
            // console.log(this.ccc);
        },
        handleRowChange2(row, event, column) {
            this.projectchangedata = { ...row };
            console.log(this.projectchangedata);
            this.PID = row.PID;
            console.log(row);
        },
        mouseUpHandleelse8(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        mouseDownHandleelse8(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse8;
        },
        mouseMoveHandleelse8(event) {
            this.pdyd5 = false;
            let moveLeft = event.pageX - 250 + 'px';
            let moveTop = event.pageY - 30 + 'px';
            this.$refs.kongtiao8.style.left = moveLeft;
            this.$refs.kongtiao8.style.top = moveTop;
        },
        sc() {
            this.twoObj.IsAuto = !this.twoObj.IsAuto;
            this.aaa = this.twoObj.IsAuto;
            console.log(this.twoObj);
        },
        gl() {
            this.twoObj.IsRelated = !this.twoObj.IsRelated;
            this.bbb = this.twoObj.IsRelated;
            console.log(this.twoObj);
        },
        jd() {
            this.twoObj.IsAbsolute = !this.twoObj.IsAbsolute;
            this.ccc = this.twoObj.IsAbsolute;
        },
        getonedata() {
            var $this = this;
            this.$axios
                .post(`/api/ProcessParameterConfigure/QueryWorkSections`)
                .then((res) => {
                    $this.tableData = res.data.data;
                    $this.oneworkduan = $this.tableData[0].WID;
                    $this.tdone = $this.oneworkduan;
                    $this.oneworkname = $this.tableData[0].OriginalWorkName;
                    $this.daiti = res.data.data[0].OriginalWorkName;
                })
                .then(() => {
                    this.gettwodata();
                });
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        jump() {
            if (!this.isPositiveInteger(this.nowpage)) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${
                            ($('.tip').width() / 2) * this.a11
                        }px)`,
                        top: `calc(50% - ${
                            ($('.tip').height() / 2) * this.a11
                        }px)`,
                    });
                    this.tipchange = true;
                    this.move('tip', 'tiphead');
                });
                this.pdyd5 = true;
                this.tipword =
                    this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                return;
            } else {
                if (
                    this.nowpage !== 1 &&
                    this.nowpage !== this.pageDate.TotalPage
                ) {
                    if (
                        this.nowpage < 1 ||
                        this.nowpage > this.pageDate.TotalPage
                    ) {
                        this.tipword =
                            this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                        setTimeout(() => {
                            $('.tip').css({
                                zoom: this.a11,
                                left: `calc(50% - ${
                                    ($('.tip').width() / 2) * this.a11
                                }px)`,
                                top: `calc(50% - ${
                                    ($('.tip').height() / 2) * this.a11
                                }px)`,
                            });
                            this.tipchange = true;
                            this.move('tip', 'tiphead');
                        });
                        this.pdyd5 = true;
                        return;
                    }
                }
            }
            this.pageDate.PageIndex = this.nowpage;
            this.watchdata();
        },
        start() {
            this.pageDate.PageIndex = 1;
            // this.onetable();
            this.watchdata();
        },
        abck() {
            if (this.pageDate.LastEnabled) {
                this.pageDate.PageIndex--;

                this.watchdata();
            }
            console.log(this.pageDate.LastEnabled);
            // this.onetable();
        },
        next() {
            if (this.pageDate.NextEnabled) {
                this.pageDate.PageIndex++;
                this.watchdata();

                // this.onetable();
            }
            console.log('sss', this.pageDate);
        },
        end() {
            this.pageDate.PageIndex = this.pageDate.TotalPage;
            this.watchdata();
            // this.onetable();
        },
        gettwodata() {
            console.log('asd', this.oneworkduan);
            var $this = this;
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/QueryWorkSteps?id=${this.oneworkduan}`
                )
                .then((res) => {
                    console.log('saddsadsa', JSON.parse(JSON.stringify(res)));
                    $this.tableData1 = res.data.data;
                    if (res.data.data.length == 0) {
                        $this.workproject = '';
                    } else {
                        $this.workproject = $this.tableData1[0].SID;
                        $this.twoworkdata = $this.tableData1[0];
                        this.daiti1 = $this.tableData1[0];
                        $this.twoworkdata.ProductID =
                            $this.tableData1[0].ProductIDTagName ===
                            this.lang
                                .ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated
                                ? this.lang
                                      .ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_Null
                                : $this.tableData1[0].ProductIDTagName;
                        $this.twoworkdata.FinishTag1 =
                            $this.tableData1[0].FinishTagName1;
                        $this.twoworkdata.FinishTag2 =
                            $this.tableData1[0].FinishTagName2;
                        if ($this.tableData1[0].FinishType == 1) {
                            $this.twoworkdata.IsRelated = false;
                        } else {
                            $this.twoworkdata.IsRelated = true;
                        }
                        $this.bbb = $this.twoworkdata.IsRelated;
                        if ($this.tableData1[0].QualitiedType == 1) {
                            $this.twoworkdata.AbsoQualTag =
                                $this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyQualified;
                            $this.twoworkdata.IsAbsolute = true;
                        } else {
                            $this.twoworkdata.AbsoQualTag =
                                $this.lang.ProcessParameterConfigure_HT_WorkStepSetting1ViewModel_AbsolutelyUnqualified;
                            $this.twoworkdata.IsAbsolute = false;
                        }

                        if (
                            $this.twoworkdata.ProductIDTagName ==
                                this.lang
                                    .ProcessParameterConfigure_WorkStepSetting1_AutomaticGenerated ||
                            $this.twoworkdata.ProductIDTagName == '' ||
                            $this.twoworkdata.ProductIDTagName ==
                                'Automatic generated'
                        ) {
                            $this.twoworkdata.IsAuto = true;
                        } else {
                            $this.twoworkdata.IsAuto = false;
                        }
                        $this.ccc = $this.twoworkdata.IsAbsolute;
                        $this.aaa = $this.twoworkdata.IsAuto;
                        $this.twoworkdata.IsQualTag =
                            $this.tableData1[0].IsQualitiedTagName;
                        // this.twoworkdata.IsAuto = this.tableData1[0].IsAbsolute;
                        // this.twoworkdata.ProductID = this.tableData1[0].ProductIDTagName;
                        // this.twoworkdata.IsRelated = this.tableData1[0].FinishType;
                    }
                })
                .then(() => {
                    this.getthreedata();
                });
        },
        getthreedata() {
            console.log(this.workproject);
            this.$axios
                .post(
                    `/api/ProcessParameterConfigure/QueryWorkProjects?id=${this.workproject}`
                )
                .then((res) => {
                    console.log('数值', res);
                    this.tableData2 = res.data.data;
                    this.projectchangedata = { ...this.tableData2[0] } || {};
                    this.daiti2 = { ...this.tableData2[0] } || {};
                    this.PID = '';
                    console.log(this.workproject);
                    console.log(this.twoworkdata);
                })
                .catch(() => {
                    this.tableData2 = [];
                });
        },
    },
    mounted() {
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.67;
        }
        this.getLangData();
        this.look11()
    },
};
</script>

<style lang="scss" scoped>
.container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30999999;
}
.lookfor1 {
    display: inline-block;
    background-color: #ffffff;
    text-align: center;
    line-height: 30px;
    border: 1px solid #6086e6;
    border-radius: 4px;
    width: 100px;
    height: 30px;
    cursor: pointer;
    position: relative;
    top: 3px;
    color: #6086e6;
}

.page {
    width: 100%;
    height: 50px;
    // padding: 20px;
}
.look {
    z-index: 30999999;
    width: 1120px;
    top: 150px;
    left: calc((100vw - 1120px) / 2);
    position: fixed;
    height: 600px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 8px black;
    .lookhead {
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 18px;
        background-color: #386df0;
        position: relative;
        color: #ffffff;
        img {
            z-index: 12999999;
            width: 24px;
            height: 24px;
            cursor: pointer;
            position: absolute;
            right: 20px;
            bottom: 0px;
            top: 0px;
            margin: auto;
        }
    }
    .lookselect {
        width: 1000px;
        height: 436px;
        background-color: #f4f4f4;
        overflow: hidden;
        border: 1px solid #cccccc;
    }
    .looktop {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11999999;
    }
    .lookcontent {
        padding: 30px 30px 0px 60px;
        width: 100%;
        .cancel {
            width: 100px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            position: absolute;
            background-color: #999999;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            font-size: 14px;

            right: 180px;
            bottom: 10px;
        }
        .pre {
            width: 100px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            position: absolute;
            background-color: #386df0;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            right: 60px;
            bottom: 10px;
        }
        .search {
            span {
                font-size: 12px;
                margin-right: 10px;
            }
            select {
                width: 130px;
                height: 30px;
                border: none;
                border: 1px solid #cccccc;
                margin-right: 20px;
            }
            padding-left: 23px;
            height: 50px;
            line-height: 45px;
            input {
                height: 30px;
                text-indent: 0.5em;
                width: 130px !important;
                margin-right: 10px;
                border: 1px solid #ccc;
            }
            .inputname {
                margin: 0px 10px;
                width: 600px;
            }
            .lookfor {
                display: inline-block;
                background-color: #ffffff;
                text-align: center;
                line-height: 30px;
                border: 1px solid #6086e6;
                border-radius: 4px;
                width: 120px;
                height: 30px;
                cursor: pointer;
                position: relative;
                top: 3px;
                color: #6086e6;
            }
        }
    }
    .table {
        width: calc(100% - 46px) !important;
        margin-left: 23px;
        border: 1px solid #ccc;
    }
}
select[disabled] {
    background-color: #ebebe4 !important;
}
.page {
    .btn {
        cursor: pointer;
    }
    width: 100%;
    height: 64px;
    // line-height: 20px;
    align-items: center;
    color: #ababab;
    padding: 0 20px;
    font-size: 14px;
    overflow: hidden;
    display: flex;
    .nopage {
        border: 2px solid #fed286 !important;
        color: #fed286;
    }
    .pageword {
        float: left;
        flex: 1.1;
        transform-origin: left top;
    }
    .pageoperation {
        transform-origin: right top !important;
        float: right;
        span {
            border: 2px solid #fda100;
            padding: 3px 8px;
            border-radius: 5px;
            color: #fda100;
            margin-left: 10px;
        }
        .inputnumber {
            display: inline-block;
            margin-left: 10px;
            input {
                width: 66px;
                border: 1px solid #ccc;
                height: 30px;
                text-align: center;
                color: #fda100;
            }
        }
    }
}
</style>