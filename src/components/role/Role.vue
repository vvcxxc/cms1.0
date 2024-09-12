<!--
 * @Description: 角色管理界面
 * @Date: 2019-11-26 11:10:25
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-26 18:46:22
 -->
<template>
    <div class="public-table" >
        <div class="search-container" :style="{zoom:zoom}">
            <my-search
                :searchList="searchList"
                :searchData="searchData"
                @setParams="setParams"
                @add="add"
            ></my-search>
        </div>
        <div class="table-container">
            <my-table :zoom='zoom' :data="data" :tableHead="tableHead" @func="del5" @funcn="change5"></my-table>
        </div>
        <div class="pages-container" >
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>
        <div class="setdata" ref="kongtiao2" v-show="changemenu" :style="{zoom:zoom}">
            <div
                class="setdatahead1"
              
            ></div>
            <div class="setdatahead"  :class="{colordiv:$store.state.color=='grey'}">
                <span  :class="{fcolor:$store.state.color=='grey'}">{{text}}</span>
                <img :src="no2" alt class="no" @click="cancel" v-if="$store.state.color=='grey'"/>
                <img :src="no" alt class="no" @click="cancel" v-else/>
            </div>
            <div class="setdatatwo">
                <div class="rolesetion">{{lang.RoleManage_RoleWindow_RoleInfo}}</div>
                <div class="rolevip">{{lang.RoleManage_RoleWindow_RoleRight}}</div>
            </div>
            <div class="setdatathree">
                <div class="setdataleft">
                    <div class="rolename">
                        <span>{{lang.RoleManage_RoleWindow_RoleName}}</span>
                        <input type="text" v-model="rolename" />
                    </div>
                    <div class="rolediscrle">
                        <span>{{lang.RoleManage_RoleWindow_Description}}</span>
                        <input type="text" v-model="rolesomething" />
                    </div>
                </div>
                <div class="setdataright">
                    <div class="endtree">
                        <el-tree
                            ref="tree"
                            :data="endmenu"
                            show-checkbox
                            node-key="id"
                            :indent="0"
                            default-expand-all
                            @check-change="handleNodeClic"
                            @node-click="handleNodeClick"
                            :default-checked-keys="argRightIDList"
                        ></el-tree>
                    </div>
                </div>
                   <div class="powerBtn_box">
                       <div class="endtree">
                       <el-tree
                            ref="tree1"
                            :data="PowerBtnArr"
                            show-checkbox
                            node-key="id"
                            :indent="0"
                            class="tree1"
                            default-expand-all
                            @check-change="handleNodeClic2"
                            :default-checked-keys="argRightIDList">
                        </el-tree>
                       </div>
                </div>
            </div>
                <div class="btn">
                    <div class="cancel" @click="cancel">{{lang.RoleManage_RoleWindow_Cancel}}</div>
                    <div class="over" @click="over">{{lang.RoleManage_RoleWindow_Save}}</div>
                </div>
        </div>
        <div class="tip" ref="kongtiao" v-show="tipchange" :style="{zoom:zoom}">
          <div class="tiphead" style="position:absolute;width: 380px;height: 40px;"></div>
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse($event)"
                @mouseup="mouseUpHandleelse($event)"
            >
                <img :src="gth" alt />
                <span>{{lang.RoleManage_HT_Tips}}</span>
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
        <div class="cover" v-if="changemenu"></div>
        <div v-show="tipchange" class="cover1"></div>
    </div>
</template>

<script>
import MySearch from '../public/search04.vue';
import MyTable from '../public/TableMain2.vue';
import MyPage from '../public/Pages.vue';

export default {
    components: {
        MySearch,
        MyTable,
        MyPage
    },
    data() {
        return {
            text: '',
            select: 1,
            zoom:1,
            tipchange: false,
            tipword: '',
            deltrue: true,
              pdyd1:true,
            pdyd2:true,
            gth: require('../../assets/images/icon_gth.png'),
            no: require('../../assets/images/no.png'),
            no2: require('../../assets/images/no2.png'),
            rolename: '',
            rolesomething: '',
            searchList: [
                {
                    model: 'argKeyword',
                    type: 'key',
                    placeholder: '请输入角色名称等关键字查询'
                }
            ],
            searchData: {
                argKeyword: ''
            },
            tableHead: {
                NO: '序号',
                RoleName: '角色名称',
                RoleDesc: '角色描述',
                UpdateUserName: '修改人',
                UpdateTime: '修改时间'
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
            changemenu: false,
            bigmenu: [],
            smallmenu: '',
            menu: {},
            endmenu: [],
            addmenu: {},
            argRightIDList: [],
            changedata: {},
            data1: '',
            deldata: '',
            PowerBtnArr:[],  //权限按钮数据
            AllPowerBtnArr:[],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    created() {
        console.clear();
        this.getLangData()
        this.req(1);
        this.bigmnue();
    },
    mounted(){
        this.zoom = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
    },
    methods: {
        getLangData() {
            this.searchList = [
                {
                    model: 'argKeyword',
                    type: 'key',
                    placeholder: this.lang.RoleManage_QueryInfo
                }
            ]
            this.tableHead = {
                NO: this.lang.RoleManage_NO,
                RoleName: this.lang.RoleManage_RoleName,
                RoleDesc: this.lang.RoleManage_RoleDesc,
                UpdateUserName: this.lang.RoleManage_UpdateUserName,
                UpdateTime: this.lang.RoleManage_UpdateTime
            }
            
        },
        del5(data,a) {
               if(!a){
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
            this.deldata = data.RoleID;
            let $this = this
            this.$axios
                .post(
                    `/api/RoleManage/RoleManage_IsUserRelateRole?argRoleID=${data.RoleID}`
                )
                .then(res => {
                    let firstL = ''
                    let firstR = ''
                    if (localStorage.getItem('currentLang') === 'Main_Language_EN') {
                        firstL = $this.lang.RoleManage_HT_MessDeleteRole.indexOf('[')
                        firstR = $this.lang.RoleManage_HT_MessDeleteRole.indexOf(']') + 1
                    } else if (localStorage.getItem('currentLang') === 'Main_Language_ZH') {
                        firstL = $this.lang.RoleManage_HT_MessDeleteRole.indexOf('<')
                        firstR = $this.lang.RoleManage_HT_MessDeleteRole.indexOf('>') + 1
                    }
                    
                    let str1 = $this.lang.RoleManage_HT_MessDeleteRole.slice(firstL, firstR)
                    let msg = $this.lang.RoleManage_HT_MessDeleteRole.replace(str1, `<${data.RoleName}>`)
                    if (res.data.data) {
                        $this.$axios({
                            method: 'post',
                            url: `/api/RoleManage/RoleManage_DeleteRole?argRoleId=${this.deldata}`
                        })
                            .then(res => {
                                if (res.data.msg == '请求成功') {
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
                        this.tipword = msg;
                                } else if (!res.data.data.msg) {
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
                                // this.req(this.pageData.PageIndex);
                            })
                            .catch(err => {});
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
                          this.pdyd2 = true;
                        this.deltrue = false;
                        this.tipword = msg;
                    }
                });
        },
        change5(data,a) {
                if(!a){
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
            this.text = this.lang.RoleManage_HT_RoleWindow_TitleNameModify;
            this.data1 = data;
            this.select = 2;
            this.$axios.post(`/api/RoleManage/RoleManage_GstRoleRight?argRoleID=${data.RoleID}`)
                .then(res => {
                    // console.log('角色已选权限' ,res.data);
                    let i = 0;
                    for (i in res.data.data) {
                        this.argRightIDList.push(res.data.data[i].SCMSRightID);
                    }
                    this.$refs.tree.setCheckedKeys(this.argRightIDList);
                    this.rolename = data.RoleName;
                    this.rolesomething = data.RoleDesc;
                    this.pdyd1 = true;
                    setTimeout(() => {
                        $('.setdata').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.setdata').width() / 2) * this.a11}px)`,
                            top: `calc(50% - ${($('.setdata').height() / 2) * this.a11}px)`
                        });
                        this.changemenu = true;
                        this.move('setdata', 'setdatahead1');
                    });
                    
                });
        },
        no1() {
            this.tipchange = false;
        },
        yes1() {
            this.tipchange = false;
            this.$axios({
                method: 'post',
                url: `/api/RoleManage/RoleManage_DeleteRole?argRoleId=${this.deldata}`
            })
                .then(res => {
                    if (res.data.msg == '请求成功') {
                        this.tipchange = false;
                    } else if (!res.data.data.msg) {
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

                    // this.deltrue = true;
                    this.req(this.pageData.PageIndex);
                })
                .catch(err => {});
        },
        tip1() {
            this.tipchange = false;
        },

        add(a) {
             if(!a){
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
            this.text = this.lang.RoleManage_HT_RoleWindow_TitleNameAdd;
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
            // this.rolename = '';
            // this.rolesomething = '';
            // this.argRightIDList = '';
        },
        cancel() {
            this.changemenu = false;
            this.rolename = '';
            this.rolesomething = '';
            this.argRightIDList = [];
            this.$refs.tree.setCheckedKeys([]);
            this.$refs.tree1.setCheckedKeys([]);
        },
        //三级数据结构
        treeFun(){
              this.AllPowerBtnArr = JSON.parse(JSON.stringify(this.bigmenu))
              for(var k=0;k<this.AllPowerBtnArr.length;k++){
                        for(var f=0;f<this.AllPowerBtnArr[k].children.length;f++){
                            for(var h=0;h<this.bigmenuChild.length;h++){
                                 this.bigmenuChild[h].children = [];
                                this.bigmenuChild[h].label = this.bigmenuChild[h].ItemName;
                                this.bigmenuChild[h].id = this.bigmenuChild[h].ItemID;
                                this.bigmenuChild[h].SCMSChildMenuID = this.bigmenuChild[h].ItemID;
                                if(this.AllPowerBtnArr[k].children[f].id == this.bigmenuChild[h].ParentID){
                                    this.AllPowerBtnArr[k].children[f].children.push(this.bigmenuChild[h])
                                }
                            }
                        }
                    }
        },

        //树形页面点击
        handleNodeClick(data){
                   //添加按钮权限
                    this.treeFun()
                    if(data.SCMSMenuType !=undefined){
                        this.PowerBtnArr = []
                            this.PowerBtnArr = []
                            for(let i=0;i<this.AllPowerBtnArr.length;i++){
                                if(this.AllPowerBtnArr[i].children.length){
                                    const childrenArr = this.AllPowerBtnArr[i].children
                                    for(let j=0;j<childrenArr.length;j++){
                                        if(childrenArr[j].id == data.id){
                                            if(childrenArr[j].children.length){
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
         //按钮权限选择
         handleNodeClic2(data,a){
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
         //页面选择
        handleNodeClic(data, a) {
            
            this.treeFun()
            if(data.SCMSMenuType !=undefined){
                this.PowerBtnArr = []
                    this.PowerBtnArr = []
                    for(let i=0;i<this.AllPowerBtnArr.length;i++){
                        if(this.AllPowerBtnArr[i].children.length){
                            const childrenArr = this.AllPowerBtnArr[i].children
                            for(let j=0;j<childrenArr.length;j++){
                                if(childrenArr[j].id == data.id){
                                    if(childrenArr[j].children.length){
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
                    this.argRightIDList.push(data.SCMSChildMenuID);
                }
            } else {
                if(data.label == this.lang.RoleManage_HT_RoleWindow_AllFunctions){
                    this.argRightIDList = []
                }else{
                    
                    let i = 0;
                    for (i in this.argRightIDList) {
                        if (this.argRightIDList[i] == data.SCMSChildMenuID) {
                            this.argRightIDList.splice(i, 1);
                            //取消按钮权限
                            this.treeFun()
                            //  this.PowerBtnArr = []
                            for(let i=0;i<this.AllPowerBtnArr.length;i++){
                                if(this.AllPowerBtnArr[i].children){
                                    var AllChilden = this.AllPowerBtnArr[i].children
                                    for(let j=0;j<AllChilden.length;j++){
                                        if(AllChilden[j].SCMSChildMenuID == data.SCMSChildMenuID){
                                            if(AllChilden[j].children){
                                                for(let k=0;k<AllChilden[j].children.length;k++){
                                                    let index = this.argRightIDList.indexOf(AllChilden[j].children[k].SCMSChildMenuID)
                                                    if(index != -1){
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
            if(data.id == 1 && a == true){
                for(let f=0;f<this.bigmenuChild.length;f++){
                    this.argRightIDList.push(this.bigmenuChild[f].SCMSChildMenuID)
                }
            }
        },
        over() {
          
            
            if (this.select == 1) {
                this.addmenu.argRightIDList = this.argRightIDList;
                this.addmenu.argRole = {};
                this.addmenu.argRole.RoleName = this.rolename;
                this.addmenu.argRole.RoleDesc = this.rolesomething;
                this.addmenu.argRightIDList = this.argRightIDList;
              
              if(!JSON.parse(
                sessionStorage.getItem('userInfo1')
            )||(JSON.parse(sessionStorage.getItem('userInfo1')) == null)){
                  this.addmenu.argUserID = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserID; 
            }else{
            
             this.addmenu.argUserID = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserID;
            }

                //   this.addmenu.argRole.argRightIDList = JSON.parse(sessionStorage.getItem('userInfo')).SCMSUserID;
                if (!this.rolename && !this.rolesomething) {
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
                    this.tipword = this.lang.RoleManage_HT_RoleWindow_MessEmpty;
                } else {
                    this.$axios({
                        method: 'post',
                        url: '/api/RoleManage/RoleManage_AddRole',
                        data: this.addmenu
                    }).then(res => {
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
                            this.rolename = '';
                            this.rolesomething = '';
                            this.req(this.pageData.PageIndex);
                        }
                        this.argRightIDList = [];
                          this.$refs.tree.setCheckedKeys([]);
                          this.$refs.tree1.setCheckedKeys([]);
                    });
                }
            } else if (this.select == 2) {
                this.changedata.argRoleId = this.data1.RoleID;
                this.changedata.argRole = {};
                this.changedata.argRole.RoleName = this.rolename;
                this.changedata.argRole.RoleDesc = this.rolesomething;
                this.changedata.argRightIDList = this.argRightIDList;
                 if(!JSON.parse(
                sessionStorage.getItem('userInfo1')
            )||(JSON.parse(sessionStorage.getItem('userInfo1')) == null)){
                    this.changedata.argUserID = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserID; 
            }else{
            
               this.changedata.argUserID = JSON.parse(
                sessionStorage.getItem('userInfo1')
            ).SCMSUserID;
            }


                if (!this.rolename && !this.rolesomething) {
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
                    this.tipword = this.lang.RoleManage_HT_RoleWindow_MessEmpty;
                } else {
                    this.$axios({
                        method: 'post',
                        url: '/api/RoleManage/RoleManage_UpdateRole',
                        data: this.changedata
                    }).then(res => {
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
                            this.rolename = '';
                            this.rolesomething = '';
                            this.req(this.pageData.PageIndex);
                        }
                        this.argRightIDList = [];
                          this.$refs.tree.setCheckedKeys([]);
                          this.$refs.tree1.setCheckedKeys([]);
                    });
                }
            }
        },
        bigmnue() {
            this.$axios
                .post(`/api/UserManage/UserManage_GstMainMenu`)
                .then(res => {
                    let i = 0;
                   for(i in res.data.data){
                        if(res.data.data[i].SCMSIsActivate){
                           this.bigmenu.push(res.data.data[i]);
                        }
                    }
                })
                .then(res => {
                    this.smallmnue();
                });
        },
        smallmnue() {
            this.$axios
                .post(`/api/UserManage/UserManage_GstChildMenu`)
                .then(res => {
                    this.smallmenu = res.data.data;
                    // console.log("权限树", JSON.parse(JSON.stringify(this.smallmenu)));
                     this.$axios
                    .post(`/api/UserManage/UserManage_GstAuthorityControl`)
                    .then(res => {
                        this.bigmenuChild = res.data.data;
                        let i = 0;
                        let j = 0;
                        let a = 0;
                        let b = 0;
                        for (a in this.bigmenu) {
                            this.bigmenu[a].children = [];
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
                                if (
                                    this.bigmenu[i].SCMSMainMenuID === this.smallmenu[j].SCMSMainMenuID
                                ) {
                                    this.bigmenu[i].children.push(this.smallmenu[j]);
                                }
                            }
                        }
                        // // 四级
                        // for(var k=0;k<this.bigmenu.length;k++){
                        //     for(var f=0;f<this.bigmenu[k].children.length;f++){
                        //         for(var h=0;h<this.bigmenuChild.length;h++){
                        //             this.bigmenuChild[h].children = [];
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
                    })
                })
        },
    move(name, namehead) {
          //  $(`.${name}`).addClass('center')
           let left = ($(`.${name}`).width())/2+'px'
           let top = ($(`.${name}`).height())/2+'px'
           if(name == 'setdata'){
  $(`.${name}`)[0].style.left = `calc(50%)`;
           $(`.${name}`)[0].style.top = `calc(50%)`;
           }else{
  $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
           $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
           }
           
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
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
        setParams(params,a) {
            if(!a){
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
        req(pageIndex,s) {
               if(s=='jump'){
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
                if(pageIndex!==1&&pageIndex!==this.pageData.TotalPage){
                        if (pageIndex < 1 || pageIndex > this.pageData.TotalPage) {
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
                    this.tipword = this.lang.RoleManage_HT_PageNumberNotExist;
                    return;
                }
                }
             
            }
               }
           
            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
            this.$axios
                .post(`/api/RoleManage/RoleManage_GstRole?argKeyWord=${params.argKeyword}&argPageSize=${params.argPageSize}&argPageIndex=${params.argPageIndex}`/* , {
                    params
                } */)
                .then(res => {
                    if (res.data.code == 0) {
                        this.data = res.data.data.DataList;
                        this.pageData = res.data.data.ParameterList;
                    }
                })
                .catch(err => {});
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
    .tipword {
        width: 100%;
        height: 75%;
        text-align: center;
        display: flex;
        justify-content: center;
        padding: 12px;
        align-items: center;
    }
    .tipcontanin {
        height: calc(100% - 40px);
    }
    .tipdetermine {
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
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
.cover {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
}
.cover1 {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 29999999;
}
input {
    text-indent: 0.5em;
}
.setdata {
    width: 1200px;
    z-index: 10999999;
    height: 620px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 8px black;
    background-color: #eeeeee;
    .setdatatwo {
        padding: 20px 30px 0px 40px;
        overflow: hidden;
        display: flex;
        align-items: center;
        .rolesetion {
            width: 400px;
            margin-right: 10px;
            border-left: 3px solid #4d8def;
            float: left;
            height: 22px;
            // line-height: 18px;
            text-indent: 0.5em;
        }
        .rolevip {
            width: 420px;
            border-left: 3px solid #4d8def;
            height: 22px;
            // line-height: 18px;
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
            height: 430px;
            background-color: #e6e6e6;
            border: 1px solid #cccccc;
            float: left;
        }
        .setdataright {
            height: 430px;
            width: 420px;
            overflow-y: auto;
            float: left;
            background-color: #e6e6e6;
            border: 1px solid #cccccc;
        }
        .powerBtn_box{
            float: left;
            width:285px;
            height: 430px;
            background-color: #e6e6e6;
            border: 1px solid #cccccc;
            border-left:none;
            overflow: auto;
            // padding-top:55px;
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
            cursor: pointer;
            z-index: 13999999;
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
        }
    }
    .rolename{
          span {
            color: #737373;
            display: inline-block;
            width: 80px;
            margin-right: 20px;
        }
    }
    .rolediscrle {
        margin-top: 15px;
        margin-left: 30px;
        span {
            color: #737373;
            display: inline-block;
            width: 80px;
            margin-right: 20px;
        }
        input {
            width: 200px;
            height: 40px;
            text-indent: 0.5em;
        }
    }
    .btn {
        padding: 20px 30px 0px 40px;
        overflow: hidden;
        .cancel {
            cursor: pointer;
            width: 160px;
            height: 40px;
            float: left;
            background-color: #ffffff;
            text-align: center;
            border: 1px solid #255cc1;
            border-radius: 5px;
            margin-left: 410px;
            margin-right: 10px;
            line-height: 40px;
        }
        .over {
            cursor: pointer;
            width: 160px;
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
.public-table {
    display: flex;
    flex-direction: column;
    height: 100%;
    .search-container {
        height: 60px;
    }
    .table-container {
        // flex: 1;
        height: calc(100% - 1px);
    }
    .page-container {
        height: 60px;
    }
}
.search-container {
    height: 60px;
    line-height: 60px;
    background-color: #dddddd;
    input {
        width: 400px;
        height: 40px;
        text-indent: 0.5em;
        margin-left: 10px;
        border: none;
        border: 1px solid #cccccc;
    }
    .search {
        width: 120px;
        height: 40px;
        display: inline-block;
        margin-left: 10px;
        background-color: #4270e4;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        font-weight: 600;
        border-radius: 4px;
        cursor: pointer;
    }
}
.fcolor{
    color: #000!important;
}
.img{
    cursor: pointer;
}
.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
.yd{
   margin: auto;
     top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;   
}
img{
    cursor: pointer;
}
</style>
