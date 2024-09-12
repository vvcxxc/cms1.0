<!--
 * @Description: 左侧导航栏
 * @Date: 2019-11-23 11:50:53
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 19:01:37
 -->
<template>
    <div
        class="left-container formleft"
        ref="tree"
        @mousemove="updateXY"
        :class="{ colordiv: $store.state.color == 'grey' }"
    >
        <div
            class="cover7"
            v-if="daibang"
            :class="{ cover13: tipchange }"
        ></div>
        <div class="boxsad" ref="kongtiao12" v-show="daibang">
            <div class="tqb"></div>
            <div
                class="tiphead"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <span
                    v-if="leftone == 1"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{
                        lang.QualityManage_HT_ItemEditWindowViewModel_New
                    }}</span
                >
                <span
                    v-else
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >{{
                        lang.QualityManage_HT_ItemEditWindowViewModel_Modify
                    }}</span
                >
                <img
                    :src="no2"
                    alt
                    class="no"
                    @click.stop="cancel"
                    v-if="$store.state.color == 'grey'"
                />
                <img :src="no" alt class="no" @click.stop="cancel" v-else />
            </div>
            <div class="t">
                <div class="margin">
                    <span>{{
                        lang.QualityManage_TreeEditWindow_SuperiorGroup
                    }}</span>
                    <input
                        type="text"
                        v-model="nowdata1.Name1"
                        disabled
                        v-if="leftone == 1"
                    />
                    <input
                        type="text"
                        v-model="nowdata.Name1"
                        disabled
                        v-if="leftone == 2"
                    />
                </div>
                <div class="margin">
                    <span>{{
                        lang.QualityManage_TreeEditWindow_GroupName
                    }}</span>
                    <input
                        type="text"
                        v-model="nowdata1.zhu"
                        v-if="leftone == 1"
                    />
                    <input
                        type="text"
                        v-model="nowdata.OriginalName"
                        v-if="leftone == 2"
                    />
                </div>
                <div class="margin">
                    <span>{{
                        lang.QualityManage_TreeEditWindow_Describe
                    }}</span>
                    <input
                        type="text"
                        v-model="nowdata1.miao"
                        v-if="leftone == 1"
                    />
                    <input
                        type="text"
                        v-model="nowdata.Flag"
                        v-if="leftone == 2"
                    />
                </div>
                <!-- <img :src="gth" alt /> -->

                <!-- <div class="Preservation" @click="gb">{{lang.PopupCommon_Sure}}</div> -->
                <div class="cancel" @click.stop="cancel">
                    {{ lang.PopupCommon_Cancel }}
                </div>
            </div>
        </div>
        <!-- @contextmenu.prevent="rightclick" -->
        <el-tree
            :data="data"
            :props="defaultProps"
            icon-class="el-icon-arrow-up"
            @node-click="handleNodeClick"
            ref="treeBox"
            :highlight-current="false"
            node-key="id"
            :expand-on-click-node="false"
            default-expand-all
        ></el-tree>
        <div class="div" ref="div"></div>
        <div class="div1" ref="div1"></div>
        <div class="newdiv" ref="newdiv" v-show="treeleft">
            <!-- <div class="newadd" v-if="level < 3" @click="newadd">{{lang.QualityManage_SampleChoseUserControl_New}}</div>
            <div class="newchange" v-if="level !== 1" @click="newchange">{{lang.QualityManage_RuleChoseWindow_Modify}}</div>
            <div class="newdel" v-if="level !== 1" @click="newdel">{{lang.QualityManage_SampleChoseUserControl_Delete}}</div> -->
        </div>
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
                <div class="tipword" v-if="deltrue">{{ tipword }}</div>
                <div class="w" v-if="!deltrue">{{ w1 }}</div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one" @click="no1">{{ lang.MessageBox_NO }}</div>
                    <div class="two" @click="yes1">
                        {{ lang.MessageBox_YES }}
                    </div>
                </div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">
                    {{ lang.PopupCommon_Sure }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gth: require('../../../assets/images/gth.png'),
            leftone: 1,
            divchange: false,

            data: [],
            ry: '',
            zid: 0,
            defaultProps: {
                children: 'SCMSAppForms',
                label: 'Name'
            },
            navList: {
                quality: [
                    {
                        name: '检测项目管理',
                        ID: '1'
                    }
                ]
            },
            nowdata1: {
                Name: '',
                Flag: ''
            },
            leftdata: {
                type: '新增',
                prid: 'df2e8fb7-1a3c-4201-9e77-06167f56c852',
                RName: 'wd',
                RuleParam: 'sad',
                NodeFatheId: 'df2e8fb7-1a3c-4201-9e77-06167f56c852',
                NodeType: 'R',
                NodeId: 'df2e8fb7-1a3c-4201-9e77-06167f56c852'
            },
            zoomValue: 1,
            nav: [],
            deltrue: true,
            w1: '',
            activeIndex: 0,
            y: '',
            y1: '',
            nowy: 0,
            endy: 0,
            nowy1: 0,
            endy1: 0,
            pdyd1: true,
            pdyd2: true,
            x: '',
            tipchange: false,
            tipword: '',
            nowdata: '',
            level: 1,
            end: 1,
            trytreedata: '',
            daibang: false,
            treeleft: false,
            no: require('../../../assets/images/no.png'),
            no2: require('../../../assets/images/no2.png'),
            jurisdiction: [],
            buttonarr: [],
            glxzid: '',
            glxzshow: true,
            glxgid: '',
            glxgshow: true,
            glscid: '',
            glscshow: true,
            xzid: '',
            xzshow: true,
            xgid: '',
            xgshow: true,
            scid: '',
            scshow: true,
            cpkid: '',
            cpkshow: true,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        };
    },

    methods: {
        gettreedata() {
            this.$axios.get(`/api/AppForm/SCMSAppFormGroups`).then(res => {
                res.data.data.forEach(item => {
                    item.id = item.SCMSAppGroupID;
                    item.Name = item.SCMSAppGroupName;
                    item.SCMSAppForms.forEach(item1 => {
                        item1.id = item1.SCMSAppFormID;
                        item1.fatherid = item1.SCMSAppGroupID;
                        item1.Name = item1.SCMSAppFormName;
                    });
                });
                if (res.data.data.length !== 0) {
                    let obj = {
                        id: '',
                        Name: ''
                    }
                    obj.SCMSAppForms = res.data.data
                    this.data.push(obj)
                 
                } else {
                    this.data = [];
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

        tip1() {
            this.tipchange = false;
        },
        no1() {
            this.tipchange = false;
            this.deltrue = true;
        },
        move(name, namehead) {
            let left = $(`.${name}`).width() / 2 + 'px';
            let top = $(`.${name}`).height() / 2 + 'px';
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
                console.log(e.target.className.toLocaleLowerCase());
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
                        console.log(nx);
                        console.log(x);
                        console.log(l);
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

        cancel() {
            this.daibang = false;
            this.treeleft = false;
            this.$store.state.treeleft = false;
        },
        treedata() {
            this.$axios.get(`/api/AppForm/SCMSAppFormGroups`).then(res => {
                res.data.data.forEach(item => {
                    item.id = '';
                    item.Name = item.SCMSAppGroupName;
                    item.SCMSAppForms.forEach(item1 => {
                        item1.id = item1.SCMSAppFormID;
                        item1.fatherid = item1.SCMSAppGroupID;
                        item1.Name = item1.SCMSAppFormName;
                    });
                });
                if (res.data.data.length !== 0) {
                    this.data = [
                        {
                            id: '',
                            Name: '',
                            SCMSAppForms: res.data.data
                        }
                    ];
                } else {
                    this.data = [];
                }
            });
        },
        tabActive(index) {
            this.$emit('tabComponent', index);
            this.activeIndex = index;
        },
        updateXY(e) {
            let a = JSON.stringify(e.y * this.zoomValue);
            this.ry = JSON.parse(a);
            this.y = e.y / this.zoomValue;
            this.x = e.x / this.zoomValue;
            this.y1 = e.y / this.zoomValue;
            // console.log(this.y)
        },
        gettime(val) {
            var date = new Date(
                parseInt(val.replace('/Date(', '').replace(')/', ''), 10)
            );
            let m = date.getMonth() + 1,
                mm = '-' + (m < 10 ? '0' + m : m);
            let d = date.getDate(),
                dd = '-' + (d < 10 ? '0' + d : d);
            let h = date.getHours(),
                hh = h < 10 ? '0' + h : h;
            let i = date.getMinutes(),
                ii = i < 10 ? '0' + i : i;
            let s = date.getSeconds(),
                ss = s < 10 ? '0' + s : s;
            return (
                date.getFullYear() + mm + dd + ' ' + hh + ':' + ii + ':' + ss
            );
        },
        handleNodeClick(data, a, b) {
            if (this.end == 1) {
                this.end = 2;
                this.$store.state.treeid = data.ID;
                this.$store.state.treedata = data;
                this.y = this.y - 120;
                this.treeleft = false;
                this.$store.state.treeleft = false;
                setTimeout(() => {
                    this.$refs.div.style.top =
                        $('.is-current').position().top +
                        $('.is-current')
                            .parent()
                            .parent()
                            .position().top +
                        'px';
                });
                this.end = 1;

                if (data.fatherid) {
                    this.$emit('getleftdata', data);
                }else{
                    this.$emit('getleftdata1');
                }
            }
        },
    },
    mounted() {
    
        this.zoomValue =
            Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.8
                ? 0.8
                : Number(parseFloat(window.screen.width / 1920).toFixed(2));
        this.treeleft = this.$store.state.treeleft;
        this.gettreedata();
    }
};
</script>
<style lang="scss" scoped>
.left-container {
    width: 100%;

    position: relative;
    box-sizing: border-box;
    .newdiv {
        position: fixed;
        z-index: 99999999;

        .newdel,
        .newchange,
        .newadd {
            width: 70px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            border: 1px solid #ccc;
            background-color: #eeeeee;
        }
        .newadd:hover {
            background-color: #add6fc;
        }
        .newdel:hover {
            background-color: #add6fc;
        }
        .newchange:hover {
            background-color: #add6fc;
        }
    }
    .nav {
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        padding-left: 15px;
        opacity: 0.5;
        &.active {
            background-color: #fff;
            opacity: 1;
            color: #4270e4;
            font-weight: 600;
            .border {
                position: absolute;
                left: -5px;
                width: 5px;
                height: 100%;
                background-color: #4270e4;
            }
        }
    }
}
.div {
    width: calc(100% + 10px);
    border-left: 15px solid #4270e4;
    height: 40px;
    top: 0px;
    z-index: 1;
    left: -10px;
    position: absolute;
    background-color: #fff;
}
.div1 {
    width: calc(100% + 10px);
    height: 40px;
    top: 0px;
    display: none;
    z-index: 1;
    left: -10px;
    position: absolute;
    background-color: #fff;
}
.boxsad {
    position: fixed;
    box-shadow: 0px 0px 8px black;
    width: 500px;
    height: 350px;
    z-index: 30999999;
    .margin {
        margin: 10px 20px;
        display: flex;
        span {
            display: block;
            float: left;
            height: 40px;
            line-height: 40px;
            flex: 0.8;
            text-align: right;
            margin-right: 20px;
        }
        input {
            width: 260px;
            height: 40px;
            text-indent: 1em;
        }
    }
    .cancel,
    .Preservation {
        width: 100px;
        height: 35px;
        border-radius: 5px;
        line-height: 35px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }
    .cancel {
        background-color: #999999;
        position: absolute;
        bottom: 20px;
        right: 140px;
    }
    .Preservation {
        background-color: #386df0;
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
    background-color: #eeeeee;
    top: 300px;
    left: 700px;
    .t {
        width: 100%;
        height: calc(100% - 60px);
        padding: 20px 20px;
    }
    .w {
        margin-right: 10px;
        position: relative;
        top: -80px;
    }
    .tiphead {
        width: 100%;
        position: relative;
        height: 60px;
        background-color: #4270e4;
        text-align: center;
        line-height: 60px;
        color: #fff;
        .no {
            position: absolute;
            top: 15px;
            width: 25px;
            height: 25px;
            right: 20px;
            cursor: pointer;
            z-index: 50999999;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .tipttop {
        position: absolute;
    }
}
.cover7 {
    width: 100%;
    height: 100%;
    z-index: 29999999;
    position: fixed;
    top: 0;
    left: 0;
}
.cover11 {
    width: 100%;
    height: 100%;
    z-index: 60999999;
    position: fixed;
    top: 0;
    left: 0;
}
.tqb {
    width: 100%;
    position: absolute;
    z-index: 30999999;
    height: 60px;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 100999999;
    top: 350px;
    left: 750px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .tipcontanin {
        height: calc(100% - 40px);
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
        height: 75%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 12px;
    }
    .w2 {
        padding: 30px !important;
        text-align: left !important;
    }
    .tipdetermine {
        color: #ea9328;
        width: 310px;
        cursor: pointer;
        line-height: 30px;
        text-align: center;
        margin-top: 40px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
        margin-left: 25px;
        // height: 30px;
        margin-bottom: 20px;
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
.cover13 {
    // position: fixed;
    // width: 100%;
    // height: 100%;
    // top: 0;
    // left: 0;
    z-index: 55999999;
}
.yd {
    margin: auto;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
.fcolor {
    color: #000 !important;
    // position: absolute;
    // top: 0;
    // left: 0;
    // margin: auto;
    // width: 100%;
    // display: inline-block;
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
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 100999999;
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
        text-align: center;
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
    .tipdetermine {
        color: #ea9328;
        cursor: pointer;
        width: 310px;
        line-height: 30px;
        text-align: center;
        // margin-top: 40px;
        position: absolute;
        bottom: 12px;
        margin-left: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
        margin-left: 25px;
        // height: 30px;
        margin-bottom: 20px;
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
.formleft {
    border: 1px solid #eee;
}
</style>
