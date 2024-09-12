<!--
 * @Description: 搜索框组件
 * @Date: 2019-11-24 14:57:05
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-29 16:34:35
 -->
 <template>
    <div class="search-container" :class="{ colordiv: $store.state.color == 'grey' }"
        :style="{lineHeight: 40*zoom+'px',height: 60*zoom+'px'}">
        <div class="search-left" :style="[{ fontSize: 16 * zoom + 'px' }]">
            <div class="search-item" v-for="(item, index) in searchList" :key="index">
                <div class="title" :class="{ mr10: true }" v-if="item.type !== 'key'">{{ item.title }}
                </div>
                <el-select v-if="item.type === 'select'" clearable filterable v-model="searchData[item.model]"
                    class="search-select" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                    @change="change(item.model, $event)" @focus="getZoom()">
                    <el-option v-for="(options, optionsIndex) in item.optionList" :key="optionsIndex"
                        :label="item.label ? options[item.label] : options"
                        :value="item.value ? options[item.value] : options"></el-option>
                </el-select>
                <el-date-picker v-if="item.type === 'time'" v-model="searchData[item.model]" type="datetime"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate" default-time="12:00:00"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                <!-- <span>-</span> -->
                <el-date-picker v-if="item.type === 'datetimerange'" v-model="searchData[item.model]"
                    type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                <el-input v-if="item.type === 'key'" v-model="searchData[item.model]"
                    :placeholder="item.placeholder || lang.AlarmRecord_History_Keyword" clearable
                    :style="{ width: 215 * zoom + 'px' }"></el-input>
            </div>
            <div class="btn pointer importtant" @click="search" :style="[{ fontSize: 16 * zoom + 'px' },
{ height: 40 * zoom + 'px' },
{ width: 100 * zoom + 'px' },
{ left: 800 * zoom + 'px' },
{ lineHeight: 40 * zoom + 'px' }
]" :id='cxid'> 查询</div>
        </div>
        <div>
        </div>
        <!-- <div class="fr">
           
        </div>-->
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
            bcid: '',
            dcid: '',
            cxshow: true,
            bcshow: true,
            dcshow: true,
            zoom: 1,
            zoom1: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },
    mounted() {
        this.zoom = 1;
        this.zoom1 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        setTimeout(() => {
            $(".search-item").css({ marginLeft: 10 * this.zoom, height: 40 * this.zoom })
            $(".search-select").css({ width: 160 * this.zoom, height: 40 * this.zoom })
            $(".el-input--suffix").css({ fontSize: 16 * this.zoom, height: 40 * this.zoom })

            if (window.screen.width <= 1280) {
                $(".search-item .title").css({ maxWidth: '80px', lineHeight: 1 })
            }
        })

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

            this.searchData.argAlarmGroupId = this.searchData.aArrayName;
            this.$emit('setParams', this.searchData, this.cxshow);

        },
        clearFn() {
            this.searchData.argKeyword = '';
            this.$emit('clearParams', this.searchData);
            let arr = document.getElementsByTagName('input');
            arr[arr.length - 1].focus();
        },
        exportTable() {
            this.$emit('exportTable', this.dcshow);
        },
        change(item, e) {
            this.searchData.argAlarmGroupId = this.searchData.aArrayName;
            if (
                item.model === 'argAlarmArray' ||
                item.model === 'aArrayName'
            ) {
                this.$emit('change', e);
            }
        },

    },

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

.importtant {
    right: 230px;
    position: absolute;
}

.search-left {
    @extend %flex;
    flex-wrap: wrap;

    .search-item {
        @extend %flex;

        // margin: 10px;
        // margin-bottom: 0;
        .mr10 {
            margin-right: 10px;
        }

        .title {
            line-height: 1;
            // word-break: break-all;
        }
    }

    .btn {
        @extend %flex;
        justify-content: center;
        width: 120px;
        height: 40px;
        line-height: initial;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
    }

    .green {
        background-color: #ffffff;
        color: #46be05;
        border-radius: 5px;
        border: 1px solid #46be05;
    }

    .grey {
        background-color: #ffffff;
        color: #706868;
        border-radius: 5px;
        border: 1px solid #706868;
    }
}

.dc {
    position: absolute;
    border: 1px solid #4270e4;
    background-color: #ffffff;
    width: 120px;
    height: 38px;
    display: block;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    color: #4270e4;
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
