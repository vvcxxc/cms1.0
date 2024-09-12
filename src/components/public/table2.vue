<!--
 * @Description: 表格组件
 * @Date: 2019-11-24 14:58:56
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-28 16:08:08
 -->
<template>
    <div
        class="table-container table-container1"
        :class="{ blackBlueBg: $store.state.color === 'blackBlue' }"
    >
        <el-table
            :data="data"
            highlight-current-row
            border
            header-row-class-name="light-blue"
            row-class-name="high-light"
            height="100%"
            width="100%"
            :style="{ 'font-size': 14 * zoom + 'px' }"
            :header-cell-style="{
                background:
                    $store.state.color == 'grey'
                        ? '#D9DBDE'
                        : $store.state.color === 'blackBlue'
                        ? '#18254E'
                        : '#5a6c98',
                color: $store.state.color == 'grey' ? '#000' : '#fff',
                'border-left':
                    $store.state.color === 'blackBlue'
                        ? '1px solid #304171'
                        : '1px solid #cccccc',
                height: 50 * zoom + 'px',
                'font-size': 14 * zoom + 'px',
                padding: '0',
            }"
            @selection-change="handleSelectionChange"
        >
            <template slot="empty">
                <!-- <no-data :tip="tip" v-if="!tip"></no-data>
        <span v-else-if="tip === 'nodata'">暂无数据</span>-->
                <span>{{ lang.SCMSConsoleWebApiMySql_NoData }}</span>
            </template>
            <el-table-column
                prop="name"
                :label="lang.AlarmRecord_History_Search"
                :width="200 * zoom"
            >
                <template slot-scope="scope">
                    <!-- <i class="el-icon-share"></i> -->
                    <div
                        class="img look"
                        @click="handleEdit(scope.$index, scope.row)"
                        :style="{ zoom }"
                    >
                        <img :src="look" alt />
                        {{ scope.row.phone }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-for="item in isBSystemList"
                :key="item"
                type="selection"
                width="80"
            />
            <el-table-column
                prop="name"
                :label="lang.AlarmRecord_History_Entry"
                :width="200 * zoom"
            >
                <template slot-scope="scope">
                    <!-- <i class="el-icon-share"></i> -->
                    <div
                        class="img pensoil"
                        @click="handleEdit1(scope.$index, scope.row)"
                        :style="{ zoom }"
                    >
                        <img :src="pensoil" alt />
                        {{ scope.row.phone }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-for="(value, key) in tableHead"
                :key="key"
                :label="value"
                align="left"
                :width="180 * zoom"
                :prop="value"
                :sortable="
                    value == '报警时间' ||
                    value == '报警设备' ||
                    value == '报警类别' ||
                    value == '报警组' ||
                    value == '报警信息'
                "
                :sort-method="(a, b) => sortDevName(a, b, key, value)"
            >
                <template slot-scope="scope">
                    <div class="item">
                        <span class="sad" v-if="scope.row.AlarmState == 3">{{
                            computedData(scope.row[key], key)
                        }}</span>
                        <span v-else>{{
                            computedData(scope.row[key], key)
                        }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                v-for="(item, index) in operation"
                :key="index"
            >
                <!-- <div>safa</div> -->
                <!-- <template slot-scope="scope">
					<div class="btn-container">
						<div v-if="(item.title = 'edit')">修改</div>
					</div>
        </template>-->
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['data', 'tableHead', 'operation', 'tip'],
    data() {
        return {
            isBSystem: false,
            isBSystemList: [],
            look: require('../../assets/images/icon_look.png'),
            pensoil: require('../../assets/images/icon_pensoil.png'),
            jurisdiction: [],
            buttonarr: [],
            ckid: '',
            ckshow: true,
            bjid: '',
            bjshow: true,
            zoom: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
        };
    },
    computed: {
        VpowerData() {
            return this.$store.state.btnPowerData;
        },
    },
    watch: {
        VpowerData(val) {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            this.buttonarr.forEach((item) => {
                if (item.RightName == '历史报警-故障快速检索') {
                    this.ckid = item.RightID;
                } else if (item.RightName == '历史报警-故障处理流程录入') {
                    this.bjid = item.RightID;
                }
            });
            var userid = '';
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
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`,
            })
                .then((res) => {
                    if (res.data.code == 0) {
                        this.ckshow = res.data.data;
                    }
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.$axios({
                method: 'post',
                url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`,
            })
                .then((res) => {
                    if (res.data.code == 0) {
                        this.bjshow = res.data.data;
                    }
                })
                .catch((err) => {
                    console.log('err', err);
                });
        },
    },
    mounted() {
        this.isBSystem = eval(sessionStorage.getItem('isBSystem'));
        this.isBSystemList = eval(sessionStorage.getItem('isBSystem'))
            ? [1]
            : [];
        this.zoom =
            window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920;
        this.jurisdiction = this.$store.state.btnPowerData;
        this.buttonarr = this.findPathByLeafId(
            this.GetUrlParam('id'),
            this.jurisdiction
        )[0].Children;
        this.buttonarr.forEach((item) => {
            if (item.RightName == '历史报警-故障快速检索') {
                this.ckid = item.RightID;
            } else if (item.RightName == '历史报警-故障处理流程录入') {
                this.bjid = item.RightID;
            }
        });
        var userid = '';
        if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
            userid = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            ).SCMSUserID;
        } else {
            userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
        }
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.ckid}`,
        })
            .then((res) => {
                if (res.data.code == 0) {
                    this.ckshow = res.data.data;
                }
            })
            .catch((err) => {
                console.log('err', err);
            });
        this.$axios({
            method: 'post',
            url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.bjid}`,
        })
            .then((res) => {
                if (res.data.code == 0) {
                    this.bjshow = res.data.data;
                }
            })
            .catch((err) => {
                console.log('err', err);
            });
    },
    methods: {
        sortDevName(str1, str2, key, label) {
            console.log('label', label, str1[key], str2[key], key);
            str1 = String(str1[key]);
            str2 = String(str2[key]);
            let res = 0;
            for (let i = 0; ; i++) {
                if (!str1[i] || !str2[i]) {
                    res = str1.length - str2.length;
                    break;
                }
                const char1 = str1[i];
                const char1Type = this.getChartType(char1);
                const char2 = str2[i];
                const char2Type = this.getChartType(char2);
                // 类型相同的逐个比较字符
                if (char1Type[0] === char2Type[0]) {
                    if (char1 === char2) {
                        continue;
                    } else {
                        if (char1Type[0] === 'zh') {
                            res = char1.localeCompare(char2);
                        } else if (char1Type[0] === 'en') {
                            res = char1.charCodeAt(0) - char2.charCodeAt(0);
                        } else {
                            res = char1 - char2;
                        }
                        break;
                    }
                } else {
                    // 类型不同的，直接用返回的数字相减
                    res = char1Type[1] - char2Type[1];
                    break;
                }
            }
            console.log('res', res);
            return res;
        },
        getChartType(char) {
            // 数字可按照排序的要求进行自定义，我这边产品的要求是
            // 数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
            if (/^[\u4e00-\u9fa5]$/.test(char)) {
                return ['zh', 300];
            }
            if (/^[a-zA-Z]$/.test(char)) {
                return ['en', 200];
            }
            if (/^[0-9]$/.test(char)) {
                return ['number', 100];
            }
            return ['others', 999];
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
        handleEdit(a, b) {
            this.$emit('handleEdit', a, b, this.ckshow);
        },
        handleEdit1(a, b) {
            this.$emit('handleEdit1', a, b, this.bjshow);
        },
        handleSelectionChange(..._) {
            this.$emit('handleSelectionChange', ..._);
        },
        computedData(value, key) {
            // if (key === 'AlarmTime' || key === 'RecoverTime') {
            // }
            if (key === 'AlarmState') {
                let stateObj = {
                    0: this.lang.AlarmRecord_HT_ConfirmedRecovery,
                    1: this.lang.AlarmRecord_HT_UnconfirmedResumption,
                    2: this.lang.AlarmRecord_HT_ConfirmedNoRecovered,
                    3: this.lang.AlarmRecord_HT_UnconfirmedUnresumed,
                };
                return stateObj[value] || '--';
            }
            if (key === 'DeviceStatus') {
                let statusObj = {
                    1: this.lang.EquipmentAccount_Used,
                    2: this.lang.EquipmentAccount_Stopped,
                    3: this.lang.EquipmentAccount_Abandoned,
                };
                return statusObj[value] || '--';
            }
            if (key === 'QualityStatus') {
                let statusObj = {
                    1: this.lang.EquipmentAccount_Inside,
                    2: this.lang.EquipmentAccount_Outside,
                };
                return statusObj[value] || '--';
            }
            return value || '--';
        },
    },
};
</script>

<style lang="scss" scoped>
.table-container {
    height: 100%;
    width: 100%;

    &.blackBlueBg {
        .img {
            background-color: transparent;

            &:active {
                background-color: #172240;
            }
        }
    }
}
.table-container .img {
    width: 60px;
    height: 30px;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    margin-left: 35px;
    background-color: #ffffff;
    img {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
}
.look {
    border: 1px solid #4572e4;
}
.pensoil {
    border: 1px solid #47b6c3;
}
// .sad{
//     color: red;
// }
// .sad:hover{
//     color: black;
// }
img {
    cursor: pointer;
}
</style>
