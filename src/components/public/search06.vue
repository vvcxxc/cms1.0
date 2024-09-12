<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container" :class="{ colordiv: $store.state.color == 'grey' }"
        :style="{ lineHeight: 40 * 1 + 'px', height: 60 * 1 + 'px' }">
        <div class="search-left" :style="[{ fontSize: 16 * zoom + 'px' }]">
            <div class="search-item" v-for="(item, index) in searchList" :key="index">
                <div class="title" :class="{ mr10: item.title == '-' }" v-if="item.type !== 'key'">{{ item.title }}</div>

                <el-select v-if="item.type === 'select'" clearable filterable v-model="searchData[item.model]"
                    class="search-select" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                    @change="change(item, $event)" @focus="getZoom()">
                    <!-- <el-option label="全部" value="全部"></el-option> -->
                    <el-option v-for="(options, optionsIndex) in item.optionList" :key="optionsIndex"
                        :label="item.label ? options[item.label] : options"
                        :value="item.value ? options[item.value] : options"></el-option>
                </el-select>
                <el-date-picker v-if="item.type === 'time'" v-model="searchData[item.model]" type="datetime"
                    @focus="getZoom()" :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    :style="{ width: 220 * zoom + 'px' }" default-time="12:00:00"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                <!-- <span>-</span> -->
                <el-date-picker v-if="item.type === 'datetimerange'" v-model="searchData[item.model]" type="datetimerange"
                    @focus="getZoom()" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                <el-input v-if="item.type === 'key'" v-model="searchData[item.model]"
                    :placeholder="item.placeholder || lang.AlarmRecord_History_Keyword" clearable :style="[{ fontSize: 16 * zoom + 'px' },
                    { width: 217 * zoom + 'px' },
                    ]"></el-input>
            </div>
            <div class="btn pointer importtant" @click="search" :style="[{ fontSize: 16 * zoom + 'px' },
            { height: 40 * zoom + 'px' },
            { width: 100 * zoom + 'px' },
            ]" :id="cxid">{{ lang.AlarmRecord_History_Select }}</div>
        <div class="btn pointer del" @click="delFn" :style="[{ fontSize: 16 * zoom + 'px' },
        { height: 40 * zoom + 'px' },
        { width: 100 * zoom + 'px' },
        ]" :id="scid">{{ lang.APPFormManage_Delete }}</div>
        </div>
        <div class="fr">
            <!-- <div class="import">导入</div>
                    <div class="export">导出</div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['searchList', 'searchData'],
    data() {
        return {
            jurisdiction: [],
            buttonarr: [],
            cxid: "",
            cxshow: true,
            scid: "",
            scshow: true,
            zoom1: 1,
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    watch: {
        VpowerData(val) {
            this.jurisdiction = this.$store.state.btnPowerData
            this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
            this.buttonarr.forEach((item) => {
                if (item.RightName == '历史报警-查询按钮') {
                    this.cxid = item.RightID
                }
                if (item.RightName == '历史报警-删除按钮') {
                    this.scid = item.RightID
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
            }).then(res => {
                this.scshow = res.data.data
            }).catch((err) => {
                console.log('err', err)
            })
        }
    },
    mounted() {
        this.zoom1 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        setTimeout(() => {
            $(".search-item").css({ marginLeft: 10 * this.zoom, height: 40 * this.zoom })
            $(".el-input__icon").css({ lineHeight: 40 * this.zoom + 'px' })
            $(".search-select").css({ width: 150 * this.zoom, height: 40 * this.zoom })
            $(".el-input--suffix").css({ fontSize: 16 * this.zoom, height: 40 * this.zoom })
        })
        this.jurisdiction = this.$store.state.btnPowerData
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children
        console.log(" this.buttonarr", this.buttonarr);

        this.buttonarr.forEach((item) => {
            if (item.RightName == '历史报警-查询按钮') {
                this.cxid = item.RightID
            }
            if (item.RightName == '历史报警-删除按钮') {
                this.scid = item.RightID
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
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
        }).then(res => {
            this.scshow = res.data.data
        }).catch((err) => {
            console.log('err', err)
        })
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    methods: {
        getZoom() {
            let that = this
            setTimeout(() => {
                for (let i = 0; i < $('.el-picker-panel').length; i++) {
                    $('.el-picker-panel')[i].style.zoom = that.zoom1
                }
                for (let i = 0; i < $('.el-select-dropdown').length; i++) {
                    $('.el-select-dropdown')[i].style.zoom = that.zoom1
                }
            })
        },
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
        search() {
            this.$emit('setParams', this.searchData, this.cxshow);
            if (this.cxshow) {
                this.$parent.req(1);
            }
        },
        delFn() {
            this.$emit('delFn', this.scshow);
        },
        change(item, e) {
            if (
                item.model === 'argAlarmArray' ||
                item.model === 'argAlarmGroupId'
            ) {
                this.$emit('change', e);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
%flex {
    display: flex;
    align-items: center;
}

.search-container {
    @extend %flex;
    justify-content: space-between;
    background-color: #ddd;
    width: 100%;
    position: relative;
}

span {
    position: absolute;
    left: 315px;
}

.search-left {
    @extend %flex;
    flex-wrap: wrap;

    .search-item {
        @extend %flex;
        margin-bottom: 0;

        .mr10 {
            margin-right: 10px;
        }
    }

    .btn {
        @extend %flex;
        justify-content: center;
        width: 120px;
        height: 40px;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        // margin-top: 10px;
        font-weight: 600;
        margin-left: 10px;
    }

    .del {
        background: #999999;
        color: #fff;
    }
}

.import {
    border: 1px solid #fda100;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    margin-top: 11px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    float: left;
    color: #fda100;
}

.export {
    position: absolute;
    right: 30px;
    bottom: 10px;
    background-color: #79d088 !important;
}

.fr {
    width: 260px;
    height: 100%;
}

.el-select {
    width: 180px;
}

.colordiv {
    background-color: #D9DBDE;
}
</style>
