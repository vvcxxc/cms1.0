<!--
 * @Description: 用户管理界面
 * @Date: 2019-11-26 11:09:44
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-26 18:45:06
 -->
<template>
    <div class="public-table">
        <div class="search-container" :style="{ zoom: zoom }">
            <my-search :searchList="searchList" :searchData="searchData" @setParams="setParams" @add="add"></my-search>
            <!-- <input type="text" placeholder="请输入用户名称等关键字查询">
            <div class="search">查询</div>-->
        </div>
        <div class="table-container">
            <my-table :data="data" :zoom='zoom' :tableHead="tableHead" @func="del5" @funcn="change5"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>
        <div class="setdata" ref="kongtiao2" v-show="changemenu" :style="{ zoom: zoom }">
            <div class="setdatahead1"></div>
            <div class="setdatahead" :class="{ colordiv: $store.state.color == 'grey' }">
                <span :class="{ fcolor: $store.state.color == 'grey' }">{{ text }}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color == 'grey'" />
                <img :src="no" alt class="no" @click="cancel" v-else />
            </div>
            <div class="setdatatwo">
                <div class="rolesetion">{{ lang.UserManage_UserInfo }}</div>
                <div class="rolevip">{{ lang.UserManage_UserRights }}</div>
            </div>
            <div class="setdatathree">
                <div class="setdataleft">
                    <div class="coverleft" v-if="pd1" @click="pd"></div>
                    <div class="rolename">
                        <span>{{ lang.UserManage_DateGrid_Account }}</span>
                        <input type="text" v-model="rolenumber" :disabled="IsDomain" />
                    </div>
                    <div class="rolediscrle">
                        <span>{{ lang.UserManage_DateGrid_UserName }}</span>
                        <input type="text" v-model="rolename" />
                    </div>
                    <div class="rolediscrle">
                        <span>{{ lang.UserManage_UserWindow_Password }}</span>
                        <input type="password" v-model="rolepassword" :placeholder="lang.UserManage_UserWindow_PasswordHint"
                            :disabled="IsDomain" />
                    </div>
                    <div class="rolediscrle">
                        <span>{{ lang.UserManage_UserWindow_ConfirmPassword }}</span>
                        <input type="password" v-model="rolesecond"
                            :placeholder="lang.UserManage_UserWindow_ConfirmPasswordHint" :disabled="IsDomain" />
                    </div>
                    <div class="rolediscrle">
                        <span>{{ lang.UserManage_Phone }}</span>
                        <input type="text" v-model="phone" />
                    </div>
                    <div class="rolediscrle">
                        <span>{{ lang.UserManage_Email }}</span>
                        <input type="text" v-model="roleemail" />
                    </div>
                    <div class="rolediscrle">
                        <span>头像</span>


                        <el-upload action="#" accept=".png,.jpg,.jpeg" :show-file-list="false" :http-request="uploadFn">
                            <img class="upload" :src="imageUrl" v-if="imageUrl" />
                            <img class="upload" src="../../assets/images/upload2.svg" v-else />
                        </el-upload>

                    </div>
                </div>
                <div class="setdataright">
                    <div class="treeinput">
                        <span>{{ lang.UserManage_Character }}</span>
                        <select name id v-model="SCMSRoleName" @change="nowchange">
                            <option :value="item.SCMSRoleName" v-for="(item, index) in rolenamedata" :key="index">
                                {{ item.SCMSRoleName }}</option>
                        </select>
                    </div>
                    <div class="tree">
                        <div class="endtree1">
                            <div class="endtree">
                                <el-tree ref="tree1" :data="endmenu" show-checkbox node-key="id" :indent="0" class="tree1"
                                    default-expand-all @check-change="handleNodeClic" @node-click="handleNodeClick"
                                    :default-checked-keys="argRightIDList"></el-tree>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 按钮权限 -->
                <!-- @check-change="handleNodeClic"
                            @node-click="handleNodeClick" -->
                <div class="powerBtn_box">
                    <div class="endtree">
                        <el-tree ref="tree" :data="PowerBtnArr" show-checkbox node-key="id" :indent="0" class="tree1"
                            default-expand-all @check-change="handleNodeClic2" :default-checked-keys="argRightIDList">
                        </el-tree>
                    </div>
                </div>
            </div>
            <div class="btn">
                <div class="cancel" @click="cancel">{{ lang.PopupCommon_Cancel }}</div>
                <div class="over" @click="over">{{ lang.RoleManage_RoleWindow_Save }}</div>
            </div>
        </div>
        <div class="cover" v-if="changemenu"></div>
        <div class="tip" ref="kongtiao" v-show="tipchange" :style="{ zoom: zoom }">
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
        <div v-show="tipchange" class="cover1"></div>
    </div>
</template>

<script>
import MySearch from '../public/search04.vue';
import MyTable from '../public/TableMain.vue';
import MyPage from '../public/Pages.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage
    },
    data() {
        return {
            IsDomain: true,
            SCMSRoleName: '',
            select: 1,
            tipchange: false,
            tipword: '',
            deltrue: true,
            gth: require('../../assets/images/icon_gth.png'),
            no: require('../../assets/images/no.png'),
            no2: require('../../assets/images/no2.png'),
            rolename: '',
            roleemail: '',
            rolenumber: '',
            rolepassword: '',
            rolesecond: '',
            phone: '',
            searchList: [
                {
                    model: 'argKeyword',
                    type: 'key',
                    placeholder: '请输入用户名称等关键字查询'
                }
            ],
            searchData: {
                argKeyword: ''
            },
            tableHead: {
                NO: '序号',
                UserAccount: '用户账号',
                UserName: '用户名称',
                RoleName: '角色名称',
                Phone: '手机',
                Email: '邮箱'
            },
            data: [],
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            pdyd1: true,
            pdyd2: true,
            changemenu: false,
            bigmenu: [],
            smallmenu: '',
            menu: {},
            endmenu: [],
            addmenu: {},
            argRightIDList: [],
            changedata: {},
            data1: '',
            rolenamedata: [],
            deldata: '',
            adddata: '',
            zoom: 1,
            argUserData: {},
            enddata: {},
            argUserId: '',
            text: '',
            pd1: false,
            RoleId: '',
            aaa: 1,
            bbb: 1,
            PowerBtnArr: [],  //权限按钮数据
            AllPowerBtnArr: [],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            imageUrl: '',
            imageUrlName: '',
        };
    },

    created() {
        this.getLangData()
        this.req(1);
        this.bigmnue();
    },
    mounted() {
        this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        this.rolesetion();
    },
    methods: {
        getImageUrl(Image) {
            if (Image) {
                this.imageUrl = `/api/UserManage/GetUserImgPath?argUserID=${this.argUserId}&Image=${Image}`
                this.imageUrlName = Image;
            } else {
                this.imageUrl = ''
                this.imageUrlName = ''
            }

        },
        uploadFn(file) {
            let formData = new FormData()
            formData.append('file', file.file)
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UploadUserImgPath?argUserID=${this.argUserId}`,
                data: formData
            }).then((res) => {
                if (res.data.code == 0) {
                    this.getImageUrl(res.data.data)
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })
        },
        getLangData() {
            this.searchList = [
                {
                    model: 'argKeyword',
                    type: 'key',
                    placeholder: this.lang.UserManage_QueryInfo
                }
            ]
            this.tableHead = {
                NO: this.lang.UserManage_NO,
                UserAccount: this.lang.UserManage_UserAccount,
                UserName: this.lang.UserManage_UserName,
                RoleName: this.lang.UserManage_RoleName,
                Phone: this.lang.UserManage_Phone,
                Email: this.lang.UserManage_Email,
                UserType: this.lang.UserManage_UserType
            }
        },
        nowchange() {
            let i = 0;
            this.bbbb = 1;
            for (i in this.rolenamedata) {
                if (this.SCMSRoleName == this.rolenamedata[i].SCMSRoleName) {
                    this.argUserData.RoleId = this.rolenamedata[i].SCMSRoleID;

                    this.RoleId = this.rolenamedata[i].SCMSRoleID;
                }
            }
            if (this.aaa !== 1) {
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
                this.pdyd2 = true;
                this.deltrue = false;

                let firstL = this.lang.UserManage_HT_UserWindow_MessApplyRole.indexOf('<')
                let firstR = this.lang.UserManage_HT_UserWindow_MessApplyRole.indexOf('>') + 1
                let str1 = this.lang.UserManage_HT_UserWindow_MessApplyRole.slice(firstL, firstR)
                let msg = this.lang.UserManage_HT_UserWindow_MessApplyRole.replace(str1, `<${this.SCMSRoleName}>`)
                this.tipword = msg;
            }
            this.aaa = 2;
        },
        pd() {
            if (this.rolenumber == 'SuperAdmin' || this.rolenumber == 'guest') {
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
                this.pdyd2 = true;

                let firstL = this.lang.UserManage_HT_UserWindow_MessNoModified.indexOf('<')
                let firstR = this.lang.UserManage_HT_UserWindow_MessNoModified.indexOf('>') + 1
                let str1 = this.lang.UserManage_HT_UserWindow_MessNoModified.slice(firstL, firstR)
                let msg = this.lang.UserManage_HT_UserWindow_MessNoModified.replace(str1, `<${this.rolenumber}>`)

                this.tipword = msg;
                this.pd1 = true;
            }
        },
        del5(data, a) {
            var $this = this
            if (!a) {
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
                this.pdyd2 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.bbb = 2;
            this.pdyd2 = true;
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
            this.deltrue = false;
            this.deldata = data.UserID;
            let firstL = ''
            let firstR = ''
            if (localStorage.getItem('currentLang') === 'Main_Language_EN') {
                firstL = $this.lang.UserManage_HT_MessDeleteUser.indexOf('[')
                firstR = $this.lang.UserManage_HT_MessDeleteUser.indexOf(']') + 1
            } else if (localStorage.getItem('currentLang') === 'Main_Language_ZH') {
                firstL = $this.lang.UserManage_HT_MessDeleteUser.indexOf('<')
                firstR = $this.lang.UserManage_HT_MessDeleteUser.indexOf('>') + 1
            }

            let str1 = $this.lang.UserManage_HT_MessDeleteUser.slice(firstL, firstR)
            let msg = $this.lang.UserManage_HT_MessDeleteUser.replace(str1, `<${data.UserName}>`)

            this.tipword = msg;
        },
        change5(data, a) {
            if (!a) {
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
                this.pdyd2 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.PowerBtnArr = []
            this.argUserData.RoleId = data.RoleId;
            this.aaa = 1;
            this.data1 = data;
            this.select = 2;
            if (data.IsDomain) {
                this.text = this.lang.UserManage_HT_UserWindow_TitleNameDomainModify;
            } else {
                this.text = this.lang.UserManage_HT_UserWindow_TitleNameModify;

            }

            this.argUserId = data.UserID;
            this.SCMSRoleName = data.RoleName;
            this.nowchange();
            this.$axios
                .post(
                    `/api/UserManage/UserManage_GstUserRight?argUserID=${this.argUserId}`
                )
                .then(res => {
                    console.log('res==>', res)
                    this.argRightIDList = [];
                    let i = 0;

                    for (i in res.data.data) {
                        this.argRightIDList.push(res.data.data[i].SCMSRightID);
                    }
                    console.log('sss', this.argRightIDList);
                    this.rolenumber = data.UserAccount;
                    this.roleemail = data.Email;
                    this.IsDomain = data.IsDomain
                    this.phone = data.Phone;
                    this.rolename = data.UserName;
                    this.getImageUrl(data.ImagePath)
                    setTimeout(() => {
                        $('.setdata').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.setdata').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.setdata').height() / 2) *
                                this.a11}px)`
                        });
                        this.changemenu = true;
                        this.move('setdata', 'setdatahead1');
                    });

                    this.pdyd1 = true;

                    if (
                        this.rolenumber == 'SuperAdmin' ||
                        this.rolenumber == 'guest'
                    ) {
                        this.pd1 = true;
                    } else {
                        this.pd1 = false;
                    }
                    console.log(res.data.data);
                });
        },
        no1() {
            this.tipchange = false;
            this.deltrue = true;
        },
        yes1() {
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
            this.pdyd2 = true;
            if (this.bbb == 1) {
                this.$axios
                    .post(
                        `/api/UserManage/UserManage_GstRoleRight?argRoleID=${this.argUserData.RoleId}`
                    )
                    .then(res => {
                        console.log(res);

                        let i = 0;
                        this.argRightIDList = [];
                        this.$refs.tree.setCheckedKeys([]);
                        this.$refs.tree1.setCheckedKeys([]);
                        let a = [];
                        for (i in res.data.data) {
                            this.argRightIDList.push(
                                res.data.data[i].SCMSRightID
                            );
                        }
                        console.log(this.argRightIDList);
                        this.argUserData.RoleId = '';
                        this.tipchange = false;
                        this.deltrue = true;
                    })
                    .catch({});
            } else {
                this.$axios({
                    method: 'post',
                    url: `/api/UserManage/UserManage_DeleteUser?argUserId=${this.deldata}`
                })

                    .then(res => {
                        this.tipchange = false;
                        this.deltrue = true;
                        this.req(this.pageData.PageIndex);
                    })
                    .catch(err => { });
            }
        },
        tip1() {
            this.tipchange = false;
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = ($(`.${name}`).width()) / 2 + 'px'
            let top = ($(`.${name}`).height()) / 2 + 'px'
            if (name == 'setdata') {
                $(`.${name}`)[0].style.left = `calc(50%)`;
                $(`.${name}`)[0].style.top = `calc(50%)`;
            } else {
                $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
                $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            }

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
        //按钮权限选择
        handleNodeClic2(data, a) {
            if (a) {
                if (data.SCMSChildMenuID) {
                    this.argRightIDList.push(data.SCMSChildMenuID);
                }
            } else {
                let i = 0;
                for (i in this.argRightIDList) {
                    if (this.argRightIDList[i] == data.SCMSChildMenuID) {
                        this.argRightIDList.splice(i, 1);
                    }
                }
            }



        },

        //页面权限选择
        handleNodeClic(data, a) {
            console.log(data)
            console.log(this.endmenu)

            this.treeFun()
            if (data.SCMSMenuType != undefined) {
                this.PowerBtnArr = []
                this.PowerBtnArr = []
                for (let i = 0; i < this.AllPowerBtnArr.length; i++) {
                    if (this.AllPowerBtnArr[i].children.length) {
                        const childrenArr = this.AllPowerBtnArr[i].children
                        for (let j = 0; j < childrenArr.length; j++) {
                            if (childrenArr[j].id == data.id) {
                                if (childrenArr[j].children.length) {
                                    var menu = {}
                                    menu.label = data.SCMSChildMenuName
                                    menu.id = '';
                                    menu.children = childrenArr[j].children;
                                    this.PowerBtnArr.push(menu)
                                }
                            }
                        }
                    }
                }
            }
            if (a) {
                if (data.SCMSChildMenuID) {

                    if (!this.argRightIDList.includes(data.SCMSChildMenuID)) {
                        this.argRightIDList.push(data.SCMSChildMenuID);
                    }

                }
            } else {
                console.log($(event.path[3]))
                // debugger
                if (data.label == this.lang.UserManage_HT_UserWindow_AllFunctions) {
                    if ($(event.path[3]).find('.el-tree-node__label')[0]) {
                        if ($(event.path[3]).find('.el-tree-node__label')[0].innerText == this.lang.UserManage_HT_UserWindow_AllFunctions) {
                            this.argRightIDList = []
                        }
                    }

                } else {

                    let i = 0;
                    for (i in this.argRightIDList) {
                        if (this.argRightIDList[i] == data.SCMSChildMenuID) {
                            this.argRightIDList.splice(i, 1);
                            //取消按钮权限
                            this.treeFun()
                            //  this.PowerBtnArr = []
                            for (let i = 0; i < this.AllPowerBtnArr.length; i++) {
                                if (this.AllPowerBtnArr[i].children) {
                                    var AllChilden = this.AllPowerBtnArr[i].children
                                    for (let j = 0; j < AllChilden.length; j++) {
                                        if (AllChilden[j].SCMSChildMenuID == data.SCMSChildMenuID) {
                                            if (AllChilden[j].children) {
                                                for (let k = 0; k < AllChilden[j].children.length; k++) {
                                                    let index = this.argRightIDList.indexOf(AllChilden[j].children[k].SCMSChildMenuID)
                                                    if (index != -1) {
                                                        this.argRightIDList.splice(index, 1);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log(this.argRightIDList)
            //    debugger
            if (data.id == 1 && a == true) {
                console.log('true==>', this.bigmenuChild)
                if ($(event.path[3]).find('.el-tree-node__label')[0]) {
                    if ($(event.path[3]).find('.el-tree-node__label')[0].innerText == this.lang.UserManage_HT_UserWindow_AllFunctions) {
                        for (let f = 0; f < this.bigmenuChild.length; f++) {
                            if (!this.argRightIDList.includes(this.bigmenuChild[f].SCMSChildMenuID)) {
                                this.argRightIDList.push(this.bigmenuChild[f].SCMSChildMenuID)
                            }

                        }
                    }
                }

            }


        },
        //三级数据结构
        treeFun() {
            this.AllPowerBtnArr = JSON.parse(JSON.stringify(this.bigmenu))
            for (var k = 0; k < this.AllPowerBtnArr.length; k++) {
                for (var f = 0; f < this.AllPowerBtnArr[k].children.length; f++) {
                    for (var h = 0; h < this.bigmenuChild.length; h++) {
                        this.bigmenuChild[h].children = [];
                        this.bigmenuChild[h].label = this.bigmenuChild[h].ItemName;
                        this.bigmenuChild[h].id = this.bigmenuChild[h].ItemID;
                        this.bigmenuChild[h].SCMSChildMenuID = this.bigmenuChild[h].ItemID;
                        if (this.AllPowerBtnArr[k].children[f].id == this.bigmenuChild[h].ParentID) {
                            this.AllPowerBtnArr[k].children[f].children.push(this.bigmenuChild[h])
                        }
                    }
                }
            }
        },
        //树形页面点击
        handleNodeClick(data) {
            //添加按钮权限
            this.treeFun()

            if (data.SCMSMenuType != undefined) {
                this.PowerBtnArr = []
                this.PowerBtnArr = []
                for (let i = 0; i < this.AllPowerBtnArr.length; i++) {
                    if (this.AllPowerBtnArr[i].children.length) {
                        const childrenArr = this.AllPowerBtnArr[i].children
                        for (let j = 0; j < childrenArr.length; j++) {
                            if (childrenArr[j].id == data.id) {
                                if (childrenArr[j].children.length) {
                                    var menu = {}
                                    menu.label = data.SCMSChildMenuName
                                    menu.id = '';
                                    menu.children = childrenArr[j].children;
                                    this.PowerBtnArr.push(menu)
                                }
                            }
                        }
                    }
                }
            }

        },
        bigmnue() {
            this.$axios
                .post(`/api/RoleManage/RoleManage_GstMainMenu`)
                .then(res => {
                    let i = 0;
                    for (i in res.data.data) {
                        if (res.data.data[i].SCMSIsActivate) {
                            this.bigmenu.push(res.data.data[i]);
                        }
                    }
                })
                .then(res => {
                    this.smallmnue();
                });
        },
        smallmnue() {
            console.log('eeee')
            this.$axios
                .post(`/api/RoleManage/RoleManage_GstChildMenu`)
                .then(res => {

                    this.smallmenu = res.data.data;
                    console.log('user==>res', this.smallmenu)

                    this.$axios
                        .post(`/api/RoleManage/RoleManage_GstAuthorityControl`)
                        .then(res => {
                            this.bigmenuChild = res.data.data;


                            let i = 0;
                            let j = 0;
                            let a = 0;
                            let b = 0;
                            for (a in this.bigmenu) {
                                this.bigmenu[a].children = [];
                                console.log('aaa', this.bigmenu[a].SCMSMainMenuName == '报表')
                                this.bigmenu[a].label = this.bigmenu[a].SCMSMainMenuName;
                                this.bigmenu[a].id = this.bigmenu[a].SCMSMainMenuID;
                            }
                            for (b in this.smallmenu) {
                                this.smallmenu[b].children = [];
                                this.smallmenu[b].label = this.smallmenu[b].SCMSChildMenuName;
                                this.smallmenu[b].id = this.smallmenu[b].SCMSChildMenuID;
                            }
                            for (i in this.bigmenu) {
                                for (j in this.smallmenu) {
                                    if (this.bigmenu[i].SCMSMainMenuID == this.smallmenu[j].SCMSMainMenuID) {
                                        this.bigmenu[i].children.push(this.smallmenu[j]);
                                    }
                                }
                            }


                            //四级
                            // for(var k=0;k<this.bigmenu.length;k++){
                            //     for(var f=0;f<this.bigmenu[k].children.length;f++){
                            //         for(var h=0;h<this.bigmenuChild.length;h++){
                            //              this.bigmenuChild[h].children = [];
                            //             this.bigmenuChild[h].label = this.bigmenuChild[h].ItemName;
                            //             this.bigmenuChild[h].id = this.bigmenuChild[h].ItemID;
                            //             this.bigmenuChild[h].SCMSChildMenuID = this.bigmenuChild[h].ItemID;
                            //             if(this.bigmenu[k].children[f].id == this.bigmenuChild[h].ParentID){
                            //                 this.bigmenu[k].children[f].children.push(this.bigmenuChild[h])
                            //             }
                            //         }
                            //     }
                            // }

                            this.menu.label = this.lang.RoleManage_HT_RoleWindow_AllFunctions;
                            this.menu.id = '1';
                            this.menu.children = this.bigmenu;
                            this.endmenu.push(this.menu);

                            console.log('初始化信息222', this.endmenu)


                        })


                })

        },
        add(a) {
            if (!a) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
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
                    this.move('tip', 'tiphead');
                });

                this.pdyd2 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.aaa = 1;
            this.select = 1;


            setTimeout(() => {
                $('.setdata').css({
                    zoom: this.a11,
                    left: `calc(50% - ${($('.setdata').width() / 2) *
                        this.a11}px)`,
                    top: `calc(50% - ${($('.setdata').height() / 2) *
                        this.a11}px)`
                });
                this.changemenu = true;
                this.move('setdata', 'setdatahead1');
            });
            this.pdyd1 = true;
            this.rolenumber = '';
            this.rolename = '';
            this.rolepassword = '';
            this.rolesecond = '';
            this.roleemail = '';
            this.phone = '';
            this.IsDomain = false
            this.argRightIDList = [];
            this.getImageUrl();
            console.log(this.rolenamedata)
            if (this.rolenamedata.length !== 0) {
                this.SCMSRoleName = this.rolenamedata[0].SCMSRoleName;
                this.argUserData.RoleId = this.rolenamedata[0].SCMSRoleID;
                this.$axios
                    .post(
                        `/api/UserManage/UserManage_GstRoleRight?argRoleID=${this.argUserData.RoleId}`
                    )
                    .then(res => {
                        console.log(res);

                        let i = 0;
                        this.argRightIDList = [];
                        this.$refs.tree.setCheckedKeys([]);
                        this.$refs.tree1.setCheckedKeys([]);
                        let a = [];
                        for (i in res.data.data) {
                            this.argRightIDList.push(res.data.data[i].SCMSRightID);
                        }
                        console.log(this.argRightIDList);
                        this.argUserData.RoleId = '';
                        this.tipchange = false;
                        this.deltrue = true;
                    })
                    .catch({});
            }

            // this.$refs.tree.setCheckedKeys([]);
            this.rolesetion();
            this.text = this.lang.UserManage_HT_UserWindow_TitleNameAdd;
            this.nowchange();
        },
        rolesetion() {
            this.$axios.post(`/api/UserManage/UserManage_GstRole`).then(res => {
                let i = 0;
                let j = 0;
                let k = 0;
                // let a = [];
                // for(i in res.data.data){
                //    a.push(res.data.data[i].Sc)
                // }
                let chineseChars = [];
                //     chars = [],
                //     list = [];

                // chars.sort(
                //     (a, b) =>
                //         a.SCMSRoleName.charCodeAt(0) -
                //         b.SCMSRoleName.charCodeAt(0)
                // );
                // chineseChars.sort((a, b) =>
                //     a.SCMSRoleName.localeCompare(b.SCMSRoleName)
                // );
                // list = chars.concat(chineseChars);
                res.data.data.sort(function (a, b) {
                    return a.SCMSRoleName.localeCompare(b.SCMSRoleName);
                });
                console.log('1111', res.data.data);
                for (j in res.data.data) {
                    if (
                        /^[\u4e00-\u9fa5]*$/.test(
                            res.data.data[j].SCMSRoleName.charAt(0)
                        )
                    ) {
                        console.log(res.data.data[j].SCMSRoleName);
                        chineseChars.push(res.data.data[j]);
                    }
                }
                let a = res.data.data;
                let x = 0;
                for (i in a) {
                    if (
                        /^[\u4e00-\u9fa5]*$/.test(a[i].SCMSRoleName.charAt(0))
                    ) {
                        x = i;
                        break;
                    }
                }
                console.log('2211', res.data.data);
                let y = 0;
                for (i in a) {
                    if (
                        /^[\u4e00-\u9fa5]*$/.test(a[i].SCMSRoleName.charAt(0))
                    ) {
                        y++;
                    }
                }
                //  console.log("4411",res.data.data);
                res.data.data.splice(x, y);
                //  console.log("3311",res.data.data);
                for (k in chineseChars) {
                    res.data.data.push(chineseChars[k]);
                    console.log(chineseChars[k]);
                }

                // this.rolenamedata = list;
                this.rolenamedata = res.data.data;
                this.SCMSRoleName = this.rolenamedata[0].SCMSRoleName;
                // this.SCMSRoleName = this.rolenamedata[0].SCMSRoleName;
                // this.argUserData.RoleId = this.rolenamedata[0].SCMSRoleID;
                // this.RoleId = this.rolenamedata[0].SCMSRoleID;
            });
        },
        over() {
            if (this.select == 1) {
                this.argUserData.RoleId = this.RoleId;
                this.argUserData.UserAccount = this.rolenumber;
                this.argUserData.UserName = this.rolename;
                this.argUserData.PassWord = this.rolepassword;
                this.argUserData.ConfirmPassWord = this.rolesecond;
                this.argUserData.Email = this.roleemail;
                this.argUserData.Phone = this.phone;
                this.argUserData.ImagePath = this.imageUrlName;
                this.enddata.argUserData = this.argUserData;
                this.argRightIDList = [...new Set(this.argRightIDList)];

                this.enddata.argRightIDList = this.argRightIDList;
                console.log('enddata===>', this.enddata);

                console.log('this', this.argRightIDList);
                this.$axios({
                    method: 'post',
                    url: '/api/UserManage/UserManage_AddUser',
                    data: this.enddata
                }).then(res => {
                    console.log(this.enddata);

                    if (!res.data.data) {
                        this.tipword = res.data.msg;
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
                        this.pdyd2 = true;
                    } else {
                        this.changemenu = false;
                        this.rolenumber = '';
                        this.rolename = '';
                        this.rolepassword = '';
                        this.rolesecond = '';
                        this.roleemail = '';
                        this.getImageUrl();
                        this.IsDomain = false;
                        this.phone = '';
                        this.argRightIDList = [];
                        this.$refs.tree.setCheckedKeys([]);
                        this.$refs.tree1.setCheckedKeys([]);
                        this.req(this.pageData.PageIndex);
                    }
                    // this.argRightIDList = [];
                    // this.$refs.tree.setCheckedKeys([]);
                });
            } else if (this.select == 2) {
                this.argUserData.RoleId = this.RoleId;
                this.argUserData.UserAccount = this.rolenumber;
                this.argUserData.UserName = this.rolename;
                this.argUserData.PassWord = this.rolepassword;
                this.argUserData.ConfirmPassWord = this.rolesecond;
                this.argUserData.Email = this.roleemail;
                this.argUserData.Phone = this.phone;
                this.argUserData.ImagePath = this.imageUrlName;
                this.enddata.argUserData = this.argUserData;
                this.argRightIDList = [...new Set(this.argRightIDList)];
                this.enddata.argRightIDList = this.argRightIDList;
                this.enddata.argUserId = this.argUserId;

                console.log('enddata===>', this.enddata);
                this.$axios({
                    method: 'post',
                    url: '/api/UserManage/UserManage_UpdateUser',
                    data: this.enddata
                }).then(res => {
                    console.log(res);
                    console.log(this.enddata);
                    if (!res.data.data) {
                        if (
                            res.data.msg ==
                            '新增用户时用户密码不能为空，操作无效！'
                        ) {
                            this.tipword = this.lang.SCMSConsoleWebApiMySql_PasswordCannotEmpty
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
                            this.pdyd2 = true;
                        } else {
                            this.tipword = res.data.msg;
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
                            this.pdyd2 = true;
                        }
                    } else {
                        this.RoleId = '';
                        this.argUserId = '';
                        this.changemenu = false;
                        this.rolenumber = '';
                        this.rolename = '';
                        this.rolepassword = '';
                        this.rolesecond = '';
                        this.roleemail = '';
                        this.getImageUrl();
                        this.IsDomain = false
                        this.phone = '';
                        this.argRightIDList = [];
                        this.$refs.tree.setCheckedKeys([]);
                        this.$refs.tree1.setCheckedKeys([]);
                        this.req(this.pageData.PageIndex);
                    }
                    // this.argRightIDList = [];
                    // this.$refs.tree.setCheckedKeys([]);
                });
            }
        },
        cancel() {
            this.changemenu = false;
            this.pd1 = false;
            this.argRightIDList = [];
            this.$refs.tree.setCheckedKeys([]);
            this.$refs.tree1.setCheckedKeys([]);
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            this.pdyd1 = false;
            let moveLeft = event.pageX - 450 + 'px';
            let moveTop = event.pageY - 25 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseUpHandleelse2(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        setParams(params, a) {
            if (!a) {
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
                this.pdyd2 = true;
                this.tipword = this.lang.NoOperationAuthority;
                return;
            }
            this.searchData = params;
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
                    this.pdyd2 = true;
                    this.tipword = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.pageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.pageData.TotalPage
                        ) {
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
                            this.pdyd2 = true;
                            this.tipword = this.lang.UserManage_HT_RoleWindow_PageNumberNotExist;
                            return;
                        }
                    }
                }
            }


            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
            console.log(params);
            this.$axios
                .post(`/api/UserManage/UserManage_GstUser`, null, {
                    params
                })
                .then(res => {
                    if (res.data.code == 0) {
                        console.log('1', res);
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    }
                })
                .catch(err => { });
        }
    }
};
</script>

<style lang="scss" scoped>
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30999999;
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
        height: calc(100% - 40px)
    }

    .tipword {
        width: 100%;
        text-align: center;
        height: 75%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
    }

    .tipdetermine {
        cursor: pointer;
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        text-align: center;
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        margin: auto;
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

.cover1 {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 29999999;
}

.cover {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
}

.public-table {
    display: flex;
    flex-direction: column;
    height: 100%;

    .search-container {
        height: 60px;
        background-color: #dddddd;
    }

    .table-container {
        flex: 1;
    }

    .page-container {
        height: 60px;
    }
}

.search-container {
    height: 60px;
    line-height: 60px;
}

.setdata {
    width: 1200px;
    z-index: 10999999;
    height: 650px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 8px black;
    background-color: #eeeeee;

    .setdatatwo {
        padding: 20px 30px 0px 40px;
        overflow: hidden;

        .rolesetion {
            width: 400px;
            margin-right: 10px;
            border-left: 3px solid #4d8def;
            float: left;
            height: 20px;
            line-height: 20px;
            text-indent: 0.5em;
        }

        .rolevip {
            width: 420px;
            border-left: 3px solid #4d8def;
            height: 20px;
            line-height: 20px;
            text-indent: 0.5em;
            float: left;
        }
    }

    .setdatathree {
        padding: 20px 30px 0px 40px;
        overflow: hidden;

        .setdataleft {
            width: 400px;
            margin-right: 10px;
            height: 450px;
            background-color: #e6e6e6;
            border: 1px solid #cccccc;
            float: left;
            position: relative;

            .coverleft {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                background-color: red;
                opacity: 0;
                height: 100%;
            }
        }

        .setdataright {
            height: 450px;
            width: 420px;
            overflow-y: auto;
            float: left;
            background-color: #e6e6e6;
            border: 1px solid #cccccc;
            border-right: none;

            .treeinput {
                width: 100%;
                margin: 10px;

                span {
                    margin-right: 20px;
                    color: #737373;
                }

                select {
                    width: 200px;
                    height: 36px;
                }

                .tree {
                    width: 100%;
                    height: 300px;
                    overflow-y: auto;
                }
            }
        }

        .powerBtn_box {
            float: left;
            width: 285px;
            height: 450px;
            background-color: #e6e6e6;
            border: 1px solid #cccccc;
            border-left: none;
            padding-top: 55px;
            overflow: auto;
        }
    }

    .setdatahead {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #255cc1;
        color: #ffffff;
        position: relative;
        text-align: center;

        img {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 12px;
            right: 20px;
            z-index: 13999999;
            cursor: pointer;
        }
    }

    .setdatahead1 {
        width: 100%;
        height: 50px;
        position: absolute;
        // background: red;
        z-index: 11999999;
        top: 0;
        left: 0;
    }

    span {
        width: 70px;
        text-align: right;
        display: inline-block;
    }

    .rolename {
        margin-top: 30px;
        margin-left: 30px;

        span {
            color: #737373;
            margin-right: 20px;
        }

        input {
            width: 200px;
            height: 40px;
            text-indent: 0.5em;
        }
    }

    .rolediscrle {
        margin-top: 15px;
        margin-left: 30px;
        display: flex;

        span {
            color: #737373;
            margin-right: 20px;
        }

        input {
            width: 200px;
            height: 40px;
            text-indent: 0.5em;
        }

        .upload {
            width: 70px;
            height: 70px;



            input {
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
        }
    }

    .btn {
        padding: 20px 30px 0px 40px;
        overflow: hidden;

        .cancel {
            width: 160px;
            height: 40px;
            float: left;
            background-color: #ffffff;
            text-align: center;
            border: 1px solid #255cc1;
            border-radius: 5px;
            margin-left: 480px;
            margin-right: 10px;
            line-height: 40px;
            cursor: pointer;
        }

        .over {
            width: 160px;
            cursor: pointer;
            height: 40px;
            float: left;
            background-color: #ffffff;
            text-align: center;
            border: 1px solid #255cc1;
            border-radius: 5px;
            line-height: 40px;
        }
    }
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

img {
    cursor: pointer;
}

.setdatahead {
    span {
        width: 100px;
        text-align: center;
    }
}
</style>
