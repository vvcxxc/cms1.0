<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div
        class="search-container"
        :class="{ colordiv: $store.state.color == 'grey' }"
    >
        <div class="search-left">
            <div
                class="search-item"
                v-for="(item, index) in searchList"
                :key="index"
            >
                <div
                    class="title"
                    :class="{ mr10: item.title == '-' }"
                    v-if="item.type !== 'key'"
                >
                    {{ item.title }}
                </div>

                <el-select
                    v-if="item.type === 'select'"
                    clearable
                    filterable
                    v-model="searchData[item.model]"
                    class="search-select"
                    popper-class="cms-select-dropdown"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                    style="width: 6.25vw"
                    @change="change(item, $event)"
                >
                    <el-option
                        v-for="(options, optionsIndex) in item.optionList"
                        :key="optionsIndex"
                        :label="item.label ? options[item.label] : options"
                        :value="item.value ? options[item.value] : options"
                    ></el-option>
                </el-select>
                <el-date-picker
                    v-if="item.type === 'date'"
                    v-model="searchData[item.model]"
                    type="date"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    value-format="yyyy-MM-dd"
                    popper-class="cms-picker-panel"
                ></el-date-picker>
                <el-date-picker
                    v-if="item.type === 'time'"
                    v-model="searchData[item.model]"
                    type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                    default-time="12:00:00"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    popper-class="cms-picker-panel"
                ></el-date-picker>
                <el-date-picker
                    v-if="item.type === 'datetimerange'"
                    v-model="searchData[item.model]"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    popper-class="cms-picker-panel"
                ></el-date-picker>
                <el-input
                    v-if="item.type === 'key'"
                    v-model="searchData[item.model]"
                    :placeholder=" item.placeholder || lang.AlarmRecord_History_Keyword "
                    clearable
                    style="width: 217px;"
                ></el-input>
            </div>
            <button
                class="btn importtant"
                @click="search"
                :id="cxid"
            >
                {{ lang.AlarmRecord_History_Select }}
            </button>
            <slot name="btnGroup"></slot>
        </div>
        <div class="fr">
            <slot name="default"></slot>
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
            cxid: '',
            cxshow: true,
            lang: JSON.parse(localStorage.getItem('languages'))[ localStorage.getItem('currentLang')]
        };
    },
    watch: {
        VpowerData(val) {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction).length > 0 ? this.findPathByLeafId( this.GetUrlParam('id'), this.jurisdiction )[0].Children : [];
            this.buttonarr.forEach(item => {
                if (item.RightName == '历史报警-查询按钮') {
                    this.cxid = item.RightID;
                }
            });
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
            }
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`
            }).then(res => {
                this.cxshow = res.data.data;
            }).catch(err => {
                console.log('err', err);
            });
        }
    },
    mounted() {
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction).length > 0 ? this.findPathByLeafId(this.GetUrlParam('id'), this.jurisdiction)[0].Children : [];
        this.buttonarr.forEach(item => {
            if (item.RightName == '历史报警-查询按钮') {
                this.cxid = item.RightID;
            }
        });
        var userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            userid = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
        } else {
            userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cxid}`
        }).then(res => {
            this.cxshow = res.data.data;
        }).catch(err => {
            console.log('err', err);
        });
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    methods: {
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
                    var findResult = this.findPathByLeafId(id, node[i].Children, temPath);
                    if (findResult) {
                        return findResult;
                    }
                }
            }
            return []
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
        search() {
            this.$emit('setParams', this.searchData, this.cxshow);
            if (this.cxshow) {
                this.$parent.req(1);
            }
        },
        change(item, e) {
            if (item.model === 'argAlarmArray' || item.model === 'argAlarmGroupId') {
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
    flex-flow: wrap;
    background-color: #ddd;
    width: 100%;
    min-height: 60px;
    position: relative;
}
span {
    position: absolute;
    left: 315px;
}

.search-left {
    @extend %flex;
    flex-wrap: wrap;
    min-width: 1400px;
    padding: 5px 0;
    .search-item {
        @extend %flex;
        margin-bottom: 0;
        margin-left: 10px;
        .mr10 {
            margin-right: 10px;
        }
        ::v-deep {
            .el-date-editor{
                width: 220px;
                height: 36px;
            }
            .el-input__inner{
                vertical-align: text-bottom;
            }
            .el-input{
                height: 36px;
            }
            .el-select{
                .el-input{
                    width: 100%;
                }
            }
        }
        ::v-deep .el-input__icon{
            line-height: 36px;
            vertical-align: top;
        }
    }
    .btn {
        @extend %flex;
        justify-content: center;
        width: 100px;
        height: 36px;
        background-color: #4270e4;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        margin-left: 10px;
        box-sizing: border-box;
        cursor: pointer;

        &.btn-success{
            border: 2px solid #46BE05;
            background: #fff;
            color: #46BE05;
        }
        &.btn-info{
            border: 1px solid #999;
            background: #999;
            color: #fff;
        }
    }
}
.fr {
    padding: 5px 10px 5px 5px;
    // width: 260px;
    height: 100%;
    text-align: right;

    .btn{
        font-weight: bold;
        width: 100px;
        height: 38px;
        line-height: 38px;
        margin-left: 10px;
        border: 2px solid #4270e4;
        background-color: #fff;
        color: #4270e4;
        font-size: var(--fontSize);
        border-radius: 4px;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        cursor: pointer;

        &.btn-success{
            border-color: #46BE05;
            color: #46BE05;
        }
        &.btn-info{
            border-color: #ddd;
            background: #ddd;
            color: #fff;
        }
    }
}

.el-select {
    width: 180px;
}
.colordiv {
    background-color: #d9dbde;
}
</style>
