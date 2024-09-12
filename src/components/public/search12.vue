<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
<template>
    <div class="search-container search-containersb search12" :style="[{ zoom: a1 }]">
        <div class="search-left">
            <div class="search-item" v-for="(item, index) in searchList" :key="index">

                <div class="title" :class="{ mr10: item.title == '-' }" v-if="item.type !== 'key'">{{ item.title }}
                </div>

                <el-select v-if="item.type === 'select'" clearable filterable v-model="searchData[item.model]"
                    class="search-select" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                    @change="change(item, $event)">
                    <!-- <el-option label="全部" value="全部"></el-option> -->
                    <el-option v-for="(options, optionsIndex) in item.optionList" :key="optionsIndex"
                        :label="item.label ? options[item.label] : options"
                        :value="item.value ? options[item.value] : options"></el-option>
                </el-select>
                <el-date-picker v-if="item.type === 'time'" v-model="searchData[item.model]" type="datetime"
                    :style="[{ height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 230 * 1 + 'px' }]"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" default-time="12:00:00" @focus="sx"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                <!-- <span>-</span> -->
                <el-date-picker v-if="item.type === 'datetimerange'" v-model="searchData[item.model]"
                    type="datetimerange"
                    :style="[{ height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 230 * 1 + 'px' }]"
                    range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" @focus="sx"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                <el-input v-if="item.type === 'key'"
                    :style="[{ height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 275 * 1 + 'px' }]"
                    v-model="searchData[item.model]" :placeholder="item.placeholder || lang.AlarmRecord_Time_Keyword"
                    clearable></el-input>
            </div>

            <div class="btn pointer" @click="search"
                :style="[{ height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 120 * 1 + 'px' }]">
                {{ lang.LogManage_LoginRecord_Select }}</div>

            <div class="btn pointer green" @click="addfn"
                :style="[{ height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 120 * 1 + 'px' }]">
                +新建产品类型</div>
            <!-- <div class="btn pointer orange" @click="editfn"
                :style="[{ height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 120 * 1 + 'px' }]">
                修改</div> -->
            <div class="btn pointer grey" @click="delfn"
                :style="[{ height: 40 * 1 + 'px' }, { fontSize: 16 * 1 + 'px' }, { width: 120 * 1 + 'px' }]">
                删除</div>

        </div>
        <!-- <div class="fr">
            <div class="import">
                <el-upload ref="materialUpload" class="upload-demo" action :show-file-list="false"
                    :on-change="handleChangeBOM" accept=".xls, .xlsx" :limit="1" :auto-upload="false"
                    :disabled="!canUpload">
                    <el-button class="btn btn3" @click="handleUploadSheet">导入</el-button>
                </el-upload>
            </div>
            <div class="export" @click="exportfn">{{ lang.FormulaManage_Export }}</div>
        </div> -->
    </div>
</template>

<script>
export default {
    props: ['searchList', 'searchData', 'drshow'],
    data() {
        return {
            jurisdiction: [],
            buttonarr: [],
            cxid: '',
            cxshow: true,
            czid: '',
            czshow: true,
            a1: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
            , canUpload: true,
        };
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    watch: {

    },
    methods: {
        handleUploadSheet() {
            if (!this.drshow) {
                this.$parent.showTips(this.lang.NoOperationAuthority)
                this.canUpload = false;
            } else {
                this.canUpload = true;
            }
        },
        handleChangeBOM(file) {
            let userAccount = JSON.parse(sessionStorage.getItem('userInfo1'))
                ? JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserAccount
                : JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserAccount;

            let formData = new FormData();
            formData.append('', file.raw);
            this.$axios({
                method: 'POST',
                url: `api/ProdutionType/ImportProdutionTypeAsync?userAccount=${userAccount}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => {
                    const data = res.data;
                    this.$refs.materialUpload.clearFiles();
                    if (data.code == 0) {
                        this.$parent.showTips('导入成功');
                        this.$parent.req(1);
                    } else {
                        this.$parent.showTips(res.data.msg)
                    }

                })
                .catch(err => {
                    this.$refs.materialUpload.clearFiles();
                });
        },
        dr(e) {
            if (!this.drshow) {
                this.$parent.showTips(this.lang.NoOperationAuthority)
                e.preventDefault();
                return
            }
        },
        sx() {
            console.log("吃饭")
            let that = this
            setTimeout(() => {
                for (let i = 0; i < $('.el-picker-panel').length; i++) {
                    $('.el-picker-panel')[i].style.zoom = that.a1
                }
            })

        },
        search() {
            this.$emit('setParams', this.searchData, this.cxshow);
        },
        exportfn() {
            this.$emit('exportfn');
        },
        addfn() {
            this.$emit('addfn');
        },
        editfn() {
            this.$emit('editfn');
        },
        delfn() {
            this.$emit('delfn');
        },
        exportTable() {
            this.$emit('exportTable');
        },
        change(item, e) {
            if (
                item.model === 'argAlarmArray' ||
                item.model === 'argAlarmGroupId'
            ) {
                this.$emit('change', e);
            }
        },
        showTips(msg) {
            this.$emit('showTips', msg);
        }
    },
    mounted() {
        this.a1 = Number(parseFloat(window.screen.width / 1920).toFixed(2))
        if (this.a1 < 1) {
            this.a1 = 0.8
        }
        setTimeout(() => {
            $(".el-input__icon").css({ lineHeight: 40 * this.a1 + 'px' })
        })

    }
};
</script>
<style lang="scss">
.search12 {
    .el-upload {
        width: 100%;
        height: 100%;

        .el-button {
            border: none;
            color: #fda100;
            font-size: 16px;
        }

    }
}
</style>
<style lang="scss" scoped>
.outputlist_upload {
    height: 100%;
}

.file {
    position: relative;
    display: inline-block;
    background: #ffffff;
    width: 120px;
    overflow: hidden;
    color: #fda100;
    position: relative;
    top: -10px;
    text-align: center;
    text-indent: 0;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    float: left;
    margin-top: 10px;
    text-decoration: none;
}

.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;

    #upload {
        cursor: pointer;
    }
}

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
    margin-bottom: 10px;

    .search-item {
        @extend %flex;
        margin: 10px;
        margin-bottom: 0;

        .mr10 {
            margin-right: 10px;
        }
    }

    .btn {
        @extend %flex;
        justify-content: center;
        width: 120px;
        // height: 40px;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        margin-top: 10px;
        font-weight: 600;
        margin-left: 10px;

    }


    .green {
        background-color: #fff;
        color: #46BE05;
        border: 1px solid #46BE05;
    }

    .orange {
        background-color: #fff;
        color: #fda100;
        border: 1px solid #fda100;
    }

    .grey {
        background-color: #808080;
        color: #fff;
    }
}



.btn3 {
    width: 100%;
    height: 100%;
}


.import,
.export {
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
    overflow: hidden;
}

.export {
    margin-left: 10px;
}

.fr {
    width: 260px;
    height: 100%;
}

.el-select {
    width: 280px;
}
</style>
