<!--
 * @Description: 设备台帐操作记录界面
 * @Date: 2019-11-25 19:15:22
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 21:24:17
 -->
<template>
    <div
        class="public-table"
     
    >
      			<div class="loadcover" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"  v-loading="this.$store.state.isShow" v-show="this.$store.state.isShow" style="position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;"></div>
        <div class="search-container" :style="{
                height: 60 * a11 + 'px',
            }">
            <my-search
                :searchList="searchList"
                :searchData="searchData"
                @setParams="setParams"
            ></my-search>
        </div>
        <div class="table-container">
            <my-table :data="data" :tableHead="tableHead"></my-table>
        </div>
        <div class="pages-container">
            <my-page :pageData="PageData" @req="req"></my-page>
        </div>
        <div class="tip" v-show="tipchange1">
            <div class="tiptop">
                <div
                    class="tiphead"
                    style="position:absolute;width: 380px;height: 40px;"
                ></div>
                <img :src="gth" alt />
                <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
            </div>
            <div class="tipcontanin">
                <div class="w">{{ w }}</div>
                <div class="tipdetermine" @click="tip2">{{lang.MessageBox_Confrim}}</div>
            </div>
        </div>
        <div class="cover3" v-if="tipchange1"></div>
    </div>
</template>

<script>
import MySearch from '../public/search10.vue';
import MyTable from '../public/table08.vue';
import MyPage from '../public/Pages.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage
    },
    data() {
        return {
            tipchange1: false,
            tip: 'noData',

            w: '',
            gth: require('../../assets/images/gth.png'),
            searchList: [
                {
                    title: '时间范围：',
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
                    type: 'key'
                }
            ],
            searchData: {
                argStartTime: '2017-03-18',
                argEndTime: '2020-03-18',
                argKeyword: ''
            },
            tableHead: {
                Number: '序号',
                DeviceName: '设备名称',
                DeviceNo: '设备编号',
                OperateDesc: '操作描述',
                Operator: '操作员',
                OperateTime: '操作时间'
            },
            data: [],
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
    created() {
        this.getLangData()
        let argStartTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime()
        );
        let argEndTime = this.$getDate(
            new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
        );
        Object.assign(this.searchData, {
            argStartTime,
            argEndTime
        });
        this.req(1);
    },
    mounted() {
        this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a11 < 1) {
            this.a11 = 0.8;
        }
    },
    methods: {
        getLangData() {
            this.searchList = [
                {
                    title: this.lang.EquipmentAccount_OperatingTimeRange,
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
                    type: 'key'
                }
            ]
            this.tableHead = {
                Number: this.lang.AlarmRecord_HT_AlarmPointManageUC_SerialNumber,
                DeviceName: this.lang.EquipmentAccount_EquipmentName,
                DeviceNo: this.lang.EquipmentAccount_EquipmentNumber,
                OperateDesc: this.lang.LogManage_OperationRecord_DataGrid_Describe,
                Operator: this.lang.EquipmentAccount_Operator,
                OperateTime: this.lang.EquipmentAccount_OperatingTime
            }
        },
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
        tip2() {
            if (this.w == '时间格式不对') {
                let argStartTime = this.$getDate(
                    new Date(new Date().toLocaleDateString()).getTime()
                );
                let argEndTime = this.$getDate(
                    new Date(new Date().toLocaleDateString()).getTime() +
                        24 * 60 * 60 * 1000 -
                        1
                );
                Object.assign(this.searchData, {
                    argStartTime,
                    argEndTime
                });
            }
            this.tipchange1 = false;
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
                    this.tipchange1 = true;
                    this.move('tip', 'tiphead');
                });
                this.w =  this.lang.NoOperationAuthority;
                return;
            }
            this.searchData = params;
            if (
                new Date(params.argStartTime).getTime() >
                new Date(params.argEndTime).getTime()
            ) {
                setTimeout(() => {
                    $('.tip').css({
                        zoom: this.a11,
                        left: `calc(50% - ${($('.tip').width() / 2) *
                            this.a11}px)`,
                        top: `calc(50% - ${($('.tip').height() / 2) *
                            this.a11}px)`
                    });
                    this.tipchange1 = true;
                    this.move('tip', 'tiphead');
                });
                this.w =  this.lang.AlarmRecord_HT_TheQueryDate;
            }
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
                        this.tipchange1 = true;
                        this.move('tip', 'tiphead');
                    });
                    this.w = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
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
                argPageSize: this.PageData.PageSize
            });
            this.$axios
                .post(
                    `/api/EquipmentAccount/EquipmentAccount_GstEquipmentRecord`,
                    null,
                    {
                        params
                    }
                )
                .then(res => {
                    console.log('res', res.data);
                    if (res.data.code == 0) {
                        let i = 0;
                        for (i in res.data.data.DataList) {
                            res.data.data.DataList[i].Number = ++i;
                        }
                        let a = 0;
                        for (a in res.data.data.DataList) {
                            if (res.data.data.DataList[a].OperateDesc == 1) {
                                res.data.data.DataList[a].OperateDesc =
                                    this.lang.EquipmentAccount_AddEquipmentAccount
                            } else if (
                                res.data.data.DataList[a].OperateDesc == 2
                            ) {
                                res.data.data.DataList[a].OperateDesc =
                                    this.lang.EquipmentAccount_EditEquipmentAccount
                            } else if (
                                res.data.data.DataList[a].OperateDesc == 3
                            ) {
                                res.data.data.DataList[a].OperateDesc =
                                    this.lang.EquipmentAccount_DeleteEquipmentAccount
                            }
                        }

                        this.data = res.data.data.DataList;
                        this.PageData = res.data.data.ParameterList;
                    }
                })
                .catch(err => {
                    setTimeout(() => {
                        $('.tip').css({
                            zoom: this.a11,
                            left: `calc(50% - ${($('.tip').width() / 2) *
                                this.a11}px)`,
                            top: `calc(50% - ${($('.tip').height() / 2) *
                                this.a11}px)`
                        });
                        this.tipchange1 = true;
                        this.move('tip', 'tiphead');
                    });
                    this.data = '';
                    this.PageData = {
                        PageSize: 50,
                        TotalCount: 0,
                        TotalPage: 0,
                        PageIndex: 1,
                        LastEnabled: false,
                        NextEnabled: false
                    };
                    this.$store.state.isShow = false;
                    this.w = this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
                });
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
        overflow: hidden;
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
    .tipcontanin{
        height: calc(100% - 40px);
    }
    .w {
        width: 100%;
        height: 75%;
        padding: 12px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
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
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover3 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
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
</style>
