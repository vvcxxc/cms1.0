<!--
 * @Description: 日志用户登录记录界面
 * @Date: 2019-11-25 19:42:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 18:01:03
 -->
<template>
    <div class="public-table">
        <div class="search-container" :style="[{ height: 60 * a1 + 'px' }]">
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
            <my-page :pageData="pageData" @req="req"></my-page>
        </div>
        <div class="tip" ref="kongtiao3" v-show="tipchange1">
              <div class="tiphead" style="position:absolute;width: 380px;height: 40px;"></div>
            <div class="tiptop">
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
import MySearch from '../public/search03.vue';
import MyTable from '../public/TableMain04.vue';
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
                    placeholder: '请输入用户名'
                }
            ],
            searchData: {
                argStartTime: '',
                argEndTime: '',
                argUserName: ''
            },
            tableHead: {
                Time: '时间',
                UserName: '用户名',
                // Time: '报警设备',
                Type: '操作类型'
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
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
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
        this.a1 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
        if (this.a1 < 1) {
            this.a1 = 0.8;
        }
    },
    methods: {
         getLangData() {
            this.searchList = [
                {
                    title: this.lang.LogManage_LoginRecord_TimeOfOccurrence,
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
                    placeholder: this.lang.LogManage_LoginRecord_UserName
                }
            ]
            this.tableHead =  {
                Time: this.lang.LogManage_LoginRecord_DataGrid_Time,
                UserName: this.lang.LogManage_LoginRecord_DataGrid_UserName,
                // Time: '报警设备',
                Type: this.lang.LogManage_LoginRecord_DataGrid_OperationType
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
        },

        setParams(params, a) {
            if (!a) {
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
                this.w =  this.lang.NoOperationAuthority;
                return;
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
                this.w =  this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect;
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

            // console.log(this.searchData);
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
            console.log(pageIndex);

            let params = Object.assign(this.searchData, {
                argPageIndex: pageIndex,
                argPageSize: this.pageData.PageSize
            });
            if (!params.argUserName) {
                params.argUserName = '';
            }
            this.$axios
                .post(`/api/LogManage/LogManage_GstLoginRecord`, null, {
                    params
                })
                .then(res => {
                    console.log(res);
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
        margin-top: 40px;
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
</style>
