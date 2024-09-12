cms/src/views/antheralarm/alarm.vue<!--
    * @Description: 报警管理
    * @Date: 2019-11-23 11:54:01
    * @Author: 随风
    * @LastEditors: 随风
    * @LastEditTime: 2019-11-27 14:53:55
    -->
<template>
    <div class="MESApiDataExport">
        <div class="MESApiDataExport-content">
            <currentTitle title="接口数据导出" line />
            <div class="MESApiDataExport-line" v-for="item in dataList" :key="item.idx">
                <el-checkbox v-model="item.checked" :label="item.label" size="large" />
            </div>
            <div class="MESApiDataExport-line">
                <div style="margin:0 10px;">时间范围</div>
                <el-date-picker v-model="startime" type="datetime" placeholder="选择日期时间" style="width:210px;">
                </el-date-picker>
                <div style="margin:0 10px;">-</div>
                <el-date-picker v-model="endtime" type="datetime" placeholder="选择日期时间" style="width:210px;">
                </el-date-picker>
                <div class="query" @click="saveData">导出</div>
            </div>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>
    </div>
</template>
   
<script>
import currentTitle from '../../components/public/currentTitle.vue';
import TipPop from '../../components/public/tipPop.vue';

export default {
    components: {
        currentTitle,
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,

            dataList: [],
            startime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() -
                24 * 60 * 60 * 1000 * 6
            ),
            endtime: new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            ),
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
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
            if (str == 'yes') {
            }
            this.noCancel = true;
            this.isTipShow = false;
        },
        getData() {
            this.$axios({
                method: 'get',
                url: `api/MESApiData/GetMesDataTypeList`,
                data: this.dataList
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.dataList = res.data.data.map((item, idx) => ({
                            idx: idx,
                            checked: false,
                            label: item
                        }));
                    } else {
                        this.isTipShow = true;
                        this.tipText = res.data.msg;
                    }
                })
        },
        saveData() {
            this.$axios({
                method: 'post',
                url: `api/MESApiData/ExportMesApiData?startTime=${this.getDate(this.startime)}&endTime=${this.getDate(this.endtime)}`,
                data: this.dataList.filter(_ => _.checked).map(_ => _.label),
                responseType: 'blob',
            })
                .then(res => {
                    console.log(res)
                    if (res.headers.msg) {
                        this.isTipShow = true;
                        this.tipText = res.headers.msg;
                    } else {
                        this.downloadFile(res.data, `MES接口数据导出${'' + new Date().getFullYear() + Number(new Date().getMonth() + 1) + new Date().getDate() + new Date().getTime()}.xlsx`)
                    }
                })
        },
    }
};
</script>
   
<style lang='scss' scoped>
.MESApiDataExport {
    height: 86vh;
    overflow: hidden;
    color: #000;
    margin-top: 100px;
    display: flex;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;


    .MESApiDataExport-content {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 20px 16px;
        box-sizing: border-box;

        .MESApiDataExport-line {
            margin-top: 10px;
            display: flex;
            align-items: center;
            padding-left: 16px;
            box-sizing: border-box;

            .query {
                height: 40px;
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                font-weight: 600;
                cursor: pointer;
                margin-left: 10px;
                background-color: #4270e4;
                color: #fff;
                margin-right: 20px;
            }
        }
    }
}
</style>
   