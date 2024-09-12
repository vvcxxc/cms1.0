<!--
 * @Description: 日志用户登录记录界面
 * @Date: 2019-11-25 19:42:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:01:03
 -->
<template>
    <div class="public-table orderManagement">
        <div class="search-container" :style="[{ height: 60 * a1 + 'px' }]">
            <my-search :drshow="drshow" :searchList="searchList" :searchData="searchData" @setParams="setParams" @addfn="addfn"
                @editfn="editfn" @delfn="delfn" @importfn="importfn" @exportfn="exportfn" @showTips="showTips">
            </my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead" @selectTableItem="selectTableItem" @editor="editfn">
            </my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>

        <my-dialog :visible="openDialog" :width="dialogData.width" :title="dialogData.title" @close="openDialog = false"
            @ok="dialogOk">
            <div class="add-material">
                <div class="add-item">
                    <div class="item-title">产品类型</div>
                    <el-input class="item-input" placeholder="请输入产品类型" v-model="dialogData.prodType"></el-input>
                </div>
            </div>
        </my-dialog>

        <div class="tip" ref="kongtiao3" v-show="tipchange1">
            <div class="tiphead" style="position:absolute;width: 380px;height: 40px;"></div>
            <div class="tiptop">
                <img :src="gth" alt />
                <span>{{ lang.HT_MessageBoxCaption_Tips }}</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{ w }}</div>
                <div class="tipdetermine" @click="tip2" v-if="deltrue">
                    {{ lang.MessageBox_Confrim }}
                </div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="tip2">{{ lang.MessageBox_NO }}</div>
                    <div class="two" @click="yes1">
                        {{ lang.MessageBox_YES }}
                    </div>
                </div>
            </div>
        </div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
import MySearch from '../../components/public/search12.vue';
import MyTable from '../../components/public/TableMain04.vue';
import MyPage from '../../components/public/Pages.vue';
import MyDialog from '@/newComponents/Dialog.vue';

export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        MyDialog
    },
    data() {
        return {
            openDialog: false,
            dialogData: {
                width: '450px',
                title: '',
                prodType: '',
                row: {}
            },
            a1: 1,
            selection: [],
            tipchange1: false,
            deltrue: true,
            tip: 'noData',
            w: '',
            nowpage: 1,
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '查询时间范围：',
                    model: 'argStartTime',
                    type: 'time'
                },
                {
                    title: '-',
                    model: 'argEndTime',
                    type: 'time'
                },
                {
                    model: 'argKeyword',
                    type: 'key',
                    placeholder: '请输入关键字'
                }
            ],
            searchData: {
                argStartTime: '',
                argEndTime: '',
                argUserName: ''
            },
            tableHead: {
                Index: '序号',
                Name: '产品类型',
                DisplayCreateTime: '创建时间',
                CreateUser: '操作人',
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
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            jurisdiction: [],
            buttonarr: [],
            cxid: '',
            xzid: '',
            bjid: '',
            scid: '',
            drid: '',
            dcid: '',
            cxshow: true,
            xzshow: true,
            bjshow: true,
            scshow: true,
            drshow: true,
            dcshow: true,
        };
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    created() {
        // let argStartTime = this.$getDate(
        //     new Date(new Date().toLocaleDateString()).getTime()
        // );
        // let argEndTime = this.$getDate(
        //     new Date(new Date().toLocaleDateString()).getTime() +
        //     24 * 60 * 60 * 1000 -
        //     1
        // );
        Object.assign(this.searchData, {
            argStartTime:'',
            argEndTime:''
        });
        this.req(1);
    },
    mounted() {
        this.a1 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a1 < 1) {
            this.a1 = 0.8;
        }




        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        console.log("buttom1", this.buttonarr)
        this.buttonarr.forEach((item) => {
            if (item.RightDesc == "产品类型-查询") {
                this.cxid = item.RightID
            } else if (item.RightDesc == "产品类型-新增产品类型") {
                this.xzid = item.RightID
            } else if (item.RightDesc == "产品类型-编辑") {
                this.bjid = item.RightID
            } else if (item.RightDesc == "产品类型-删除") {
                this.scid = item.RightID
            } else if (item.RightDesc == "产品类型-导入") {
                this.drid = item.RightID
            } else if (item.RightDesc == "产品类型-导出") {
                this.dcid = item.RightID
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`,
        }).then(res => {
            this.xzshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`,
        }).then(res => {
            this.bjshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
        }).then(res => {
            this.scshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.drid}`,
        }).then(res => {
            this.drshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })

        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.dcid}`,
        }).then(res => {
            this.dcshow = res.data.data

        }).catch((err) => {
            console.log('err', err)
        })

    },
    methods: {
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
        showTips(msg) {
            this.tipchange1 = true;
            this.move('tip', 'tiphead');
            this.w = msg;
        },
        exportfn() {
            if (!this.dcshow) {
                this.showTips('该账户无操作权限！')
                return
            }
            let params = Object.assign(this.searchData, {
                argPageIndex: '1',
                argPageSize: String(this.pageData.TotalCount)
            });
            if (!params.argUserName) {
                params.argUserName = '';
            }
            this.$axios({
                method: 'post',
                url: `api/ProdutionType/ExportProdutionType?argKeyword=${params.argUserName}&st=${params.argStartTime}&et=${params.argEndTime}&argPageIndex=${params.argPageIndex}&argPageSize=${params.argPageSize}`,
                responseType: 'arraybuffer'
            }).then(res => {
                this.downloadFile(res.data, `产品类型列表.xlsx`);
            })
        },
        addfn() {
            if (!this.xzshow) {
                this.showTips('该账户无操作权限！')
                return
            }
            this.dialogData.title = '新增';
            this.dialogData.prodType = '';
            this.openDialog = true;
        },
        editfn(row) {
            if (!this.bjshow) {
                this.showTips('该账户无操作权限！')
                return
            }
            this.dialogData.title = '编辑';
            this.dialogData.row = row;
            this.dialogData.prodType = row.Name;
            this.openDialog = true;
        },
        dialogOk() {
            let userAccount = JSON.parse(sessionStorage.getItem('userInfo1'))
                ? JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserAccount
                : JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserAccount;
            if (this.dialogData.title == '新增') {
                this.$axios({
                    method: 'post',
                    url: `api/ProdutionType/AddProductionType?productionName=${this.dialogData.prodType}&userAccount=${userAccount}`,
                }).then(res => {
                    if (res.data.code == 0) {
                        this.openDialog = false;
                        this.w = '添加成功';
                        this.req(1);
                    } else {
                        this.w = res.data.msg;
                    } setTimeout(() => {
                        let a1 = Number(
                            parseFloat(window.screen.width / 1920).toFixed(2)
                        );
                        if (a1 < 1) {
                            a1 = 0.8;
                        }
                        this.a1 = a1;
                        $('.tip').css({
                            zoom: a1,
                            left: `calc(50% - ${($('.tip').width() / 2) * a1}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) * a1}px)`
                        });
                        this.tipchange1 = true;
                        this.move('tip', 'tiphead');
                    });
                })
            } else if (this.dialogData.title == '编辑') {
                this.$axios({
                    method: 'Patch',
                    url: `api/ProdutionType/EditProductionType?id=${this.dialogData.row.ID}&productionName=${this.dialogData.prodType}&userAccount=${userAccount}`,
                }).then(res => {
                    if (res.data.code == 0) {
                        this.openDialog = false;
                        this.w = '修改成功';
                        this.req(1);
                    } else {
                        this.w = res.data.msg;
                    } setTimeout(() => {
                        let a1 = Number(
                            parseFloat(window.screen.width / 1920).toFixed(2)
                        );
                        if (a1 < 1) {
                            a1 = 0.8;
                        }
                        this.a1 = a1;
                        $('.tip').css({
                            zoom: a1,
                            left: `calc(50% - ${($('.tip').width() / 2) * a1}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) * a1}px)`
                        });
                        this.tipchange1 = true;
                        this.move('tip', 'tiphead');
                    });
                })





            }
        },
        delfn() {
            if (!this.scshow) {
                this.showTips('该账户无操作权限！')
                return
            }
            if (!this.selection.length) {
                this.showTips('请选择需要删除的对象')
                return
            }
            let a1 = Number(
                parseFloat(window.screen.width / 1920).toFixed(2)
            );
            $('.tip').css({
                zoom: a1,
                left: `calc(50% - ${($('.tip').width() / 2) * a1}px)`,
                top: `calc(50% - ${($('.tip').height() / 2) * a1}px)`
            });
            this.deltrue = false;
            this.tipchange1 = true;
            this.move('tip', 'tiphead');
            this.w = '是否删除所选项？';

        },
        yes1() {
            this.tipchange1 = false;
            this.deltrue = true;
            this.$axios({
                method: 'Delete',
                url: `api/ProdutionType/DeleteProductionType`,
                data: this.selection.map(_ => _.ID)
            }).then(res => {
                if (res.data.code == 0) {
                    this.openDialog = false;
                    this.w = '删除成功';
                    this.req(1);
                } else {
                    this.w = res.data.msg;
                } setTimeout(() => {
                    let a1 = Number(
                        parseFloat(window.screen.width / 1920).toFixed(2)
                    );
                    if (a1 < 1) {
                        a1 = 0.8;
                    }
                    this.a1 = a1;
                    $('.tip').css({
                        zoom: a1,
                        left: `calc(50% - ${($('.tip').width() / 2) * a1}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) * a1}px)`
                    });
                    this.tipchange1 = true;
                    this.move('tip', 'tiphead');
                });
            })
        },
        selectTableItem(selection) {
            this.selection = selection;
        },
        move(name, namehead) {
            //  $(`.${name}`).addClass('center')
            let left = ($(`.${name}`).width()) / 2 + 'px'
            let top = ($(`.${name}`).height()) / 2 + 'px'
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function (e) {
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
        tip2() {
            if (this.w == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect) {
                this.searchData.argStartTime = new Date(
                    new Date().toLocaleDateString()
                );
                this.searchData.argEndTime = new Date(
                    new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1
                );
            }
            this.tipchange1 = false;
            this.deltrue = true;
        },

        setParams(params, a) {
            if (!this.cxshow) {
                this.showTips('该账户无操作权限！')
                return
            }
            var timeRegex =
                '^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-' +
                '(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})' +
                '(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\\s+' +
                '([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$';
            var Regex = new RegExp(timeRegex);
            if (
                !Regex.test(this.searchData.argStartTime) ||
                !Regex.test(this.searchData.argEndTime)
            ) {
                setTimeout(() => {
                    let a1 = Number(
                        parseFloat(window.screen.width / 1920).toFixed(2)
                    );
                    if (a1 < 1) {
                        a1 = 0.8;
                    }
                    this.a1 = a1;
                    $('.tip').css({
                        zoom: a1,
                        left: `calc(50% - ${($('.tip').width() / 2) * a1}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) * a1}px)`
                    });
                    this.tipchange1 = true;
                    this.move('tip', 'tiphead');
                });
                this.w = this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
                return;
            }
            if (
                new Date(this.searchData.argStartTime).getTime() >
                new Date(this.searchData.argEndTime).getTime()
            ) {
                setTimeout(() => {
                    let a1 = Number(
                        parseFloat(window.screen.width / 1920).toFixed(2)
                    );
                    if (a1 < 1) {
                        a1 = 0.8;
                    }
                    this.a1 = a1;
                    $('.tip').css({
                        zoom: a1,
                        left: `calc(50% - ${($('.tip').width() / 2) * a1}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) * a1}px)`
                    });
                    this.tipchange1 = true;
                    this.move('tip', 'tiphead');
                });
                this.w = this.lang.LogManage_HT_TheQueryDate;
                return;
            }
            this.searchData = params;
            this.searchData.argUserName = params.argKeyword;
            this.req(1);
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
                        let a1 = Number(
                            parseFloat(window.screen.width / 1920).toFixed(2)
                        );
                        if (a1 < 1) {
                            a1 = 0.8;
                        }
                        this.a1 = a1;
                        $('.tip').css({
                            zoom: a1,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                a1}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                a1}px)`
                        });
                        this.tipchange1 = true;
                        this.move('tip', 'tiphead');
                    });
                    this.w = this.lang.RoleManage_HT_PEAPositiveInteger;
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
                                let a1 = Number(
                                    parseFloat(
                                        window.screen.width / 1920
                                    ).toFixed(2)
                                );
                                if (a1 < 1) {
                                    a1 = 0.8;
                                }
                                this.a1 = a1;
                                $('.tip').css({
                                    zoom: a1,
                                    left: `calc(50% - ${($('.tip').width() /
                                        2) *
                                        a1}px)`,
                                    top: `calc(50% - ${($('.tip').height() /
                                        2) *
                                        a1}px)`
                                });
                                this.tipchange1 = true;
                                this.move('tip', 'tiphead');
                            });
                            this.w = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                            return;
                        }
                    }
                }
            }
            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
            if (!params.argUserName) {
                params.argUserName = '';
            }
            this.$axios({
                method: 'post',
                url: `api/ProdutionType/Query?argKeyword=${params.argUserName}&st=${params.argStartTime}&et=${params.argEndTime}&argPageIndex=${params.argPageIndex}&argPageSize=${params.argPageSize}`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.data = res.data.data.DataList;
                    this.pageData = res.data.data.ParameterList;
                }
            })

        }
    }
};
</script>

<style lang="scss" scoped>
.public-table {
    display: flex;

    flex-direction: column;
    height: 100%;

    .search-container {
        height: 60px;
    }

    .table-container {
        flex: 1;
        overflow: auto;
    }

    .page-container {
        height: 60px;
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
        padding: 30px;
        // text-align: center;
        padding-bottom: 0;
    }

    .w {
        width: 100%;
        height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        text-align: center;
    }

    .tipcontanin {
        height: calc(100% - 40px);
    }

    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
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

.cover2 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}

.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29;
    position: fixed;
    top: 0;
    left: 0;
}

.orderManagement {
    padding: 90px 0 30px;
    box-sizing: border-box;
}

.add-material {
    .add-item {
        display: flex;
        align-items: center;

        .item-title {
            width: 100px;
        }
    }
}
</style>
