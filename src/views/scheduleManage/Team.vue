<!--
 * @Description: 这是班组页面（组件）
 * @Date: 2020-08-10 09:10:53
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 11:39:39
-->
<template>
    <div class="Team_box">
        <div class="Team_head" ref="head">
            <div class="head_search">
                <el-input
                    style="width: 217px;"
                    v-model="argKeyWord"
                    :placeholder="lang.ScheduleManage_ClassName_Search_Tag"
                ></el-input>
                <div @click="btnQuery()" class="head_btn">
                    {{ lang.ScheduleManage_ClassName_Search }}
                </div>
            </div>

            <div @click="addFun()" class="head_add">
                <div class="img_add"></div>
                <span class="text_add">{{
                    lang.ScheduleManage_ClassName_New
                }}</span>
            </div>
        </div>
        <div class="Team_middle">
            <div
                class="conterFool_middle"
                style="width:100%;margin:auto;flex:1;"
            >
                <el-table
                    :data="tableData"
                    highlight-current-row
                    header-row-class-name="light-blue"
                    row-class-name="high-light"
                    height="100%"
                    width="100%"
                    border
                    style="font-size: 14px"
                    :header-cell-style="{
                        background:
                            $store.state.color == 'grey'
                                ? '#D9DBDE'
                                : '#5a6c98',
                        color: $store.state.color == 'grey' ? '#000' : '#fff',
                        'border-left': '1px solid #cccccc',
                        height: '50px',
                        'font-size': '14px',
                        padding: '0'
                    }"
                >
                    <template slot="empty">
                        <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
                    </template>

                    <el-table-column
                        :label="lang.UserManage_NO"
                        :show-overflow-tooltip="true"
                        width="80"
                        prop="NO"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="lang.RoleManage_Operation"
                        width="250"
                        show-overflow-tooltip
                    >
                        <template slot-scope="scope">
                            <div
                                class="table_edit"
                                @click="xiangqing(scope.row)"
                            >
                                <div class="xianqing_img"></div>
                            </div>
                            <div class="table_edit" @click="editFun(scope.row)">
                                <div class="edit_img"></div>
                            </div>
                            <div
                                class="table_remove"
                                @click="deleteFun(scope.row)"
                            >
                                <div class="remove_img"></div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="班组编码"
                        :show-overflow-tooltip="true"
                        prop="sCode"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="lang.ScheduleManage_ClassName"
                        :show-overflow-tooltip="true"
                        prop="sName"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="lang.ScheduleManage_ClassName_Remark"
                        :show-overflow-tooltip="true"
                        prop="sRemark"
                    >
                    </el-table-column>
                    <el-table-column
                        label="更新人"
                        :show-overflow-tooltip="true"
                        prop="sStaff"
                    >
                    </el-table-column>
                    <el-table-column
                        label="更时间"
                        :show-overflow-tooltip="true"
                        prop="sCreateDate"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="conterFool_bottom" ref="page">
                <div @click="jump" class="bottom_jump">
                    {{ lang.DataGrid_Reaction_TurnPage }}
                </div>
                <div class="bottom_input">
                    <span>{{ lang.DataGrid_Reaction_The }}</span>
                    <input
                        v-model="num"
                        @input="jumpInp()"
                        class="text"
                        type="text"
                    />
                    <span>{{ lang.DataGrid_Reaction_Page }}</span>
                </div>
                <div @click="end" class="bottom_end">
                    {{ lang.DataGrid_Reaction_EndPage }}
                </div>
                <div ref="next" @click="next" class="bottom_next">
                    {{ lang.DataGrid_Reaction_NextPage }}
                </div>
                <div ref="last" @click="last" class="bottom_last">
                    {{ lang.DataGrid_Reaction_LastPage }}
                </div>
                <div @click="firest" class="bottom_firest">
                    {{ lang.DataGrid_Reaction_FirstPage }}
                </div>
                <div class="bottom_text">
                    <span
                        >{{ lang.DataGrid_Reaction_HT_ATotalOf }}{{ TotalCount
                        }}{{ lang.DataGrid_Reaction_HT_RecordsAndTheCurrent
                        }}{{ PageIndex }}{{ lang.DataGrid_Reaction_HT_Page
                        }}{{ TotalPage
                        }}{{ lang.DataGrid_Reaction_HT_RecordsAnd }}{{ PageSize
                        }}{{ lang.DataGrid_Reaction_HT_PerPage }}</span
                    >
                </div>
            </div>
        </div>
        <!-- 弹窗内容 -->
        <TipsPop
            v-if="tipShow"
            :tipType="tipType"
            :tipValue="tipValue"
            :tipText="tipText2"
        ></TipsPop>
        <addTeamPop
            ref="addPop"
            :itemdata="itemdata"
            :type="type"
            v-if="isTeamPop"
        ></addTeamPop>
        <div v-if="tipShow || isTeamPop" class="box"></div>
        <TipPop
            v-if="isPopShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        />
    </div>
</template>

<script>
import TipPop from '../../components/public/tipPop.vue';
import TipsPop from './component/TisPop';
import addTeamPop from './component/addTeamPop';
export default {
    name: 'team',
    components: {
        TipsPop,
        addTeamPop,
        TipPop
    },
    data() {
        return {
            isPopShow: false, // 是否显示弹窗
            tipText: '', // 弹窗提示语
            noCancel: true, // 弹窗是否带取消按按钮
            tableData: [],
            AllTableData: [],
            num: 1,
            TotalCount: 1,
            PageIndex: 1,
            TotalPage: 1,
            PageSize: 50,
            type: '',
            deleteShow: false,
            popShow: false,
            argKeyWord: '', //查询值
            deletetext: '',
            itemdata: [], //班组弹窗信息
            deleteRowData: [], //删除的弹窗信息
            typeV: '',
            tipShow: false, //提示弹窗是否展示
            tipType: '1', //提示弹窗类型
            tipText2: '', //提示文本
            isTeamPop: false, //增加弹窗
            tipValue: '', //弹窗类型
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            tableHeight: '0px',
            zoomValue: 1,

            jurisdiction: [],
            buttonarr: [],
            ssid: '',
            xzid: '',
            bjid: '',
            scid: '',
            xqid: '',
            ssshow: true,
            xzshow: true,
            bjshow: true,
            scshow: true,
            xqshow: true
        };
    },
    props: [],
    watch: {
        VpowerData(val) {
            this.getPower();
        }
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    created() {
        this.$nextTick(() => {
            this.$refs.head.style.zoom = this.zoomValue;
            this.$refs.page.style.zoom = this.zoomValue;
            let height = document.body.clientHeight * 0.6;
            this.tableHeight = parseInt(height) + 'px';
        });
    },
    mounted() {
        this.getPower();
        this.query();
    },

    methods: {
        tipCallBack(str) {
            this.isPopShow = false;
            this.noCancel = true;
        },
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log(' this.buttonarr', this.buttonarr);
            this.buttonarr.forEach(item => {
                if (item.RightName == '班组管理-搜索按钮') {
                    this.ssid = item.RightID;
                } else if (item.RightName == '班组管理-新增班组') {
                    this.xzid = item.RightID;
                } else if (item.RightName == '班组管理-编辑按钮') {
                    this.bjid = item.RightID;
                } else if (item.RightName == '班组管理-删除按钮') {
                    this.scid = item.RightID;
                } else if (item.RightName == '班组管理-详情') {
                    this.xqid = item.RightID;
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ssid}`
            })
                .then(res => {
                    this.ssshow = res.data.data;
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
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`
            })
                .then(res => {
                    this.bjshow = res.data.data;
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xqid}`
            })
                .then(res => {
                    this.xqshow = res.data.data;
                })
                .catch(err => {
                    console.log('err', err);
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
        btnQuery() {
            if (!this.ssshow) {
                this.isPopShow = true;
                this.tipText = this.lang.NoOperationAuthority;
                return;
            }
            this.query();
        },
        //查询
        query(text) {
            this.$axios({
                method: 'get',
                url: `/api/class/query?key=${this.argKeyWord}`
            })
                .then(res => {
                    if (res.data.data.length != 0) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].NO = i + 1;
                        }
                        this.AllTableData = res.data.data;
                        if (this.AllTableData.length > 50) {
                            this.tableData = this.AllTableData.slice(0, 50);
                        } else {
                            this.tableData = this.AllTableData;
                        }
                        this.TotalCount = this.AllTableData.length;
                        if (text == undefined) {
                            this.PageIndex = 1;
                        } else {
                            this.pageFun(this.PageIndex);
                            this.num = this.PageIndex;
                        }
                        this.TotalPage = Math.ceil(
                            this.AllTableData.length / 50
                        );
                    } else {
                        this.tableData = [];
                        this.TotalCount = 0;
                        if (text == undefined) {
                            this.PageIndex = 1;
                        } else {
                            this.pageFun(this.PageIndex);
                            this.num = this.PageIndex;
                        }
                        this.TotalPage = 1;
                    }
                    console.log('tableData', this.tableData);
                })
                .catch(function(err) {
                    console.log('err', err);
                });
        },
        //查询值
        textFun(text, startTime, endTime) {
            this.argKeyWord = text;
        },
        //添加
        addFun() {
            if (!this.xzshow) {
                this.isPopShow = true;
                this.tipText = this.lang.NoOperationAuthority;
                return;
            }
            this.isTeamPop = true;
            this.type = 'add';
        },

        //删除数据
        deleteData(data) {
            for (let j = 0; j < data.length; j++) {
                for (let i = 0; i < this.AllTableData.length; i++) {
                    if (this.AllTableData[i].sId == data[j].sId) {
                        this.AllTableData.splice(i, 1);
                        i--;
                    }
                }
            }
            this.TotalCount = this.AllTableData.length;
            for (let k = 0; k < this.AllTableData.length; k++) {
                this.AllTableData[k].NO = k + 1;
            }
        },
        //单行删除
        single_deleteFun() {
            if (!this.scshow) {
                this.isPopShow = true;
                this.tipText = this.lang.NoOperationAuthority;
                return;
            }
            var data = [];
            data.push(this.deleteRowData.sId);
            var arr = [];
            arr.push(this.deleteRowData);
            console.log('dearr', arr);
            this.deleteData(arr); //删除数据
            this.pageFun(this.PageIndex); //分页
            this.A_deleteFun(data); //走接口删除
        },

        //删除方法
        A_deleteFun(value) {
            var data = value[0];
            console.log('axis', data, value);
            this.$axios({
                method: 'post',
                url: `/api/class/delete?id=${data}`,
                id: data
            })
                .then(res => {})
                .catch(function(err) {});
        },
        // 分页方法
        pageFun(num) {
            if (num == 1) {
                this.tableData = this.AllTableData.slice(0, 50);
            } else {
                if (this.AllTableData.length / 50 <= num - 1) {
                    this.num = num - 1;
                    this.tableData = this.AllTableData.slice(
                        (num - 2) * this.PageSize,
                        this.PageSize * num
                    );
                } else {
                    this.tableData = this.AllTableData.slice(
                        (num - 1) * this.PageSize,
                        this.PageSize * num
                    );
                }
            }
        },
        //上一页颜色
        lastColor(text) {
            if (text == '1') {
                this.$refs.last.style.color = '#F9D79C';
                this.$refs.last.style.borderColor = '#F8CA7A';
                this.$refs.last.style.background = '#F9F9F9';
            } else {
                this.$refs.last.style.color = '#FDA100';
                this.$refs.last.style.borderColor = '#FDA100';
                this.$refs.last.style.background = '#fff';
            }
        },
        //下一页颜色
        nextColor(text) {
            if (text == '1') {
                this.$refs.next.style.color = '#F9D79C';
                this.$refs.next.style.borderColor = '#F8CA7A';
                this.$refs.next.style.background = '#F9F9F9';
            } else {
                this.$refs.next.style.color = '#FDA100';
                this.$refs.next.style.borderColor = '#FDA100';
                this.$refs.next.style.background = '#fff';
            }
        },

        //跳转
        jump() {
            if (this.PageIndex != this.num) {
                if (this.num > this.TotalPage || this.num < 1) {
                    this.typeV = '3';
                    this.deleteShow = true;
                } else {
                    this.PageIndex = this.num;
                    this.pageFun(this.PageIndex);
                }
                if (this.PageIndex == 1) {
                    this.lastColor('1');
                    this.nextColor('2');
                }
                if (this.PageIndex == this.TotalPage) {
                    this.nextColor('1');
                    this.lastColor('2');
                }
            }
        },
        //末页
        end() {
            this.PageIndex = this.TotalPage;
            this.num = this.PageIndex;
            this.nextColor('1');
            this.lastColor('2');
            this.pageFun(this.PageIndex);
        },
        //下一页
        next() {
            if (this.PageIndex < this.TotalPage) {
                this.nextColor('2');
                this.lastColor('2');
                this.PageIndex = this.PageIndex + 1;
                this.num = this.PageIndex;
                this.pageFun(this.PageIndex);
                if (this.PageIndex == this.TotalPage) {
                    this.nextColor('1');
                }
            }
        },
        //上一页
        last() {
            if (this.PageIndex > 1) {
                this.nextColor('2');
                this.lastColor('2');
                this.PageIndex = this.PageIndex - 1;
                this.num = this.PageIndex;
                this.pageFun(this.PageIndex);
                if (this.PageIndex == 1) {
                    this.lastColor('1');
                }
            }
        },
        //首页
        firest() {
            this.PageIndex = 1;
            this.num = this.PageIndex;
            this.nextColor('2');
            this.lastColor('1');
            this.pageFun(this.PageIndex);
        },

        //详情
        xiangqing(item) {
            if (!this.xqshow) {
                this.isPopShow = true;
                this.tipText = this.lang.NoOperationAuthority;
                return;
            }
            this.isTeamPop = true;
            this.type = 'xiangqin';
            this.itemdata = item;
        },
        //编辑弹窗
        editFun(item) {
            if (!this.bjshow) {
                this.isPopShow = true;
                this.tipText = this.lang.NoOperationAuthority;
                return;
            }
            this.isTeamPop = true;
            this.type = 'edit';
            this.itemdata = item;
        },
        //提示弹窗
        Pshow(text, type, tt) {
            this.tipText2 = text;
            this.tipType = type;
            this.tipShow = true;
            this.tipValue = tt;
        },
        //点击单行删除
        deleteFun(item) {
            let msg = this.lang.ScheduleManage_ClassName_DeleteMessage;
            let firstL = msg.indexOf('{');
            let firstR = msg.indexOf('}') + 1;
            let str1 = msg.slice(firstL, firstR);
            msg = msg.replace(str1, `<${item.sName}>`);
            // this.Pshow('彻底删除后,已编辑相关联的排班计划无法恢复，确认删除当前班组【'+item.sName+'】吗？','2','单行删除')
            this.Pshow(msg, '2', '单行删除');
            this.deleteRowData = item;
        },

        //取消弹窗
        cancelFun(text) {
            if (text == '存在') {
                this.tipShow = false;
            } else {
                this.tipShow = false;
                this.isTeamPop = false;
            }
        },
        //跳转数字
        jumpInp() {
            this.num = parseInt(this.num);
            if (String(this.num) == 'NaN') {
                this.num = '';
            }
        }
    }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
@import '../../assets/style/ScheduleMange/Team';
.Team_box {
    .remove_img {
        background: url('../../assets/images/icon_dell.png');
        background-size: cover;
    }
    .edit_img {
        background: url('../../assets/images/icon_pensoil.png');
        background-size: cover;
    }
    .xianqing_img {
        background: url('../../assets/images/形状 21@2x.png');
        background-size: cover;
    }
    .head_add {
        .img_add {
            background: url('../../assets/images/icon_addfile.png');
            background-size: cover;
        }
    }
}
</style>
