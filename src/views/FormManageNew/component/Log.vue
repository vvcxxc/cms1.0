<template>
    <div class="logPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                配方监控日志
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>
            <div class="popSearch">
                <div style="marginRight:10px">应用配方</div>
                <el-select v-model="applyType" type="datetime" placeholder="选择日期时间" style="width:150px;">
                    <el-option label="不限" value=""></el-option>
                    <el-option v-for="item in formualList" :key="item.FID" :label="item.Name" :value="item.FID"></el-option>
                </el-select>
                <div style="margin:0 10px;">时间范围</div>
                <el-date-picker v-model="startime" type="datetime" placeholder="选择日期时间" style="width:210px;">
                </el-date-picker>
                <div style="margin:0 10px;">-</div>
                <el-date-picker v-model="endtime" type="datetime" placeholder="选择日期时间" style="width:210px;">
                </el-date-picker>
                <div style="marginLeft:10px;width:210px;">
                    <el-input v-model="inputFilter" placeholder="请输入关键词"></el-input>
                </div>
                <div class="query" @click="getData(1)">
                    查询
                </div>
            </div>
            <div class="popContent">
                <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                    :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="400px">
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                    <el-table-column prop="Time" label="更新时间" :show-overflow-tooltip="true">

                    </el-table-column>
                    <el-table-column prop="FormulaTemp" label="配方名称" :show-overflow-tooltip="true">

                    </el-table-column>
                    <el-table-column prop="Content" label="更新内容" :show-overflow-tooltip="true">

                    </el-table-column>
                </el-table>
            </div>
            <div class="pages-container">
                <my-page :pageData="pageData" @req="getData"></my-page>
            </div>
           
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
    </div>
</template>

<script>
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/Pages.vue';
export default {
    components: {
        CurrentTitle,
        TipPop,
        MyPage
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,

            startime: new Date(
                new Date(new Date().toLocaleDateString()).getTime()
            ),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            ),
            formualList: [],
            applyType: '',
            inputFilter: '',
            dataList: [],
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
        };
    },

    mounted() {

     this.startime=   this.getNowHour()+':00:00'
     this.endtime=   this.getNowHour()+':59:59'
        this.$axios({
            method: 'post',
            url: `api/FormulaManage/QueryFormulas`,
        })
            .then(res => {
                if (res.data.code == 0) {
                    this.formualList = res.data.data;
                    // if (this.formualList.length) {
                    //      this.applyType = this.formualList[0].FID
                    // }
                    this.getData(1)
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })




    },
    methods: {
        getNowHour() {
            let date = new Date();
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d + ' ' + h;
        },
        getDate(val) {
            if (val) {
                let date = new Date(val);
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                let hour = date.getHours();
                hour = hour < 10 ? `0${hour}` : hour;
                let minute = date.getMinutes();
                minute = minute < 10 ? `0${minute}` : minute;
                let second = date.getSeconds();
                second = second < 10 ? `0${second}` : second;
                let str = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
                return str;
            }
            return '';
        },
        tipCallBack(str) {
            this.isTipShow = false;
        },
        handleClick(str) {
            this.$emit('callback');

        },
        getData(_index) {
            this.$axios({
                method: 'post',
                url: `/api/FormulaManage/FormulaManage_FormulaMonitorLogs?st=${this.getDate(this.startime)}&et=${this.getDate(this.endtime)}&PageSize=${this.pageData.PageSize}&PageIndex=${_index}&argFId=${this.applyType}&KeyWord=${this.inputFilter}`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.DataList || [];
                    this.pageData = res.data.data.ParameterList;
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.logPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 1200px;
        height: auto;
        top: 45%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 100%;
            height: 60px;
            background: rgba(56, 109, 240);
            line-height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            position: relative;

            .close {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 18px;
                right: 20px;
                cursor: pointer;
            }
        }

        .tips {
            padding-top: 20px;
            padding-left: 40px;
        }

        .popSearch {
            height: 60px;
            padding-left: 30px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            word-break: keep-all;

            .query {
                width: 100px;
                height: 38px;
                background: #386df0;
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .popContent {
            width: 100%;
            height: auto;
            overflow-y: auto;
            padding: 0 30px;
            padding-bottom: 0;
            box-sizing: border-box;


            .content1-line {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .content {
                    display: flex;
                    width: 100%;
                    line-height: 40px;
                    margin: 10px 0;

                    .contentLable,
                    .contentLable2 {
                        width: 110px;
                        text-align: right;
                        font-size: 14px;
                        color: #363636;
                        margin-right: 10px;
                    }

                    .contentLable2 {
                        width: 120px;
                    }

                    img {
                        width: 38px;
                        height: 38px;
                        position: absolute;
                        top: 2px;
                        right: 0;
                        cursor: pointer;
                    }

                    .required::before {
                        content: '*';
                        color: #f56c6c;
                        margin-right: 4px;
                    }
                }

            }
        }

        .pages-container {
            width: 100%;
            height: 60px;
            padding: 0 40px 40px;
            box-sizing: border-box;
        }

         
    }


}
</style>
<style lang="scss">
.logPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>