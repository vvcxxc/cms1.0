<template>
    <div class="page-contain">
        <div class="contain">
            <div class="search flex-flow">
                <div class="name">曲线报警实时确认</div>
                <div class="button-list flex-full">
                    <button class="btn btn-successful" @click="alarmConfirm">报警确认</button>
                    <button class="btn btn-error" @click="allConfirm">全部确认</button>
                </div>
            </div>
            <div class="table-contain">
                <my-table
                    :data="tableData"
                    :showSelection="true"
                    :tableHead="tableHead"
                    @func="getdata"
                    @func1="getdata1"
                    style="width: 100%"
                ></my-table>
            </div>
            <div class="pager-contain">
                <my-page :pageData="pageData" @req="req"/>
            </div>
        </div>
        <cms-dialog :tipchange="tipchange" :tipword="tipword" @confirm="confirmDialog" @cancel="closeDialog" :showBtnGroup="showBtnGroup"/>
    </div>
</template>
<script>
import MyTable from '@/components/public/table0Diy.vue';
import MyPage from '@/components/public/Pages.vue';
import CmsDialog from '@/components/public/cmsDialog.vue'
export default {
    components: {
        MyTable,
        MyPage,
        CmsDialog
    },
    data(){
        return {
            selected: [],
            tableData: [],
            tableHead: {
                Content: '曲线报警信息'
            },
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 1,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            },
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            tipchange: false,
            tipword: '',
            showBtnGroup: false
        }
    },
    mounted(){
        this.req(1)
        setInterval(()=>{
            this.req(this.pageData.PageIndex)
        }, 5000)
    },
    methods: {
        isPositiveInteger(s) {   
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            console.log(pageIndex, s)
             if(s=='jump'){
                if (!this.isPositiveInteger(pageIndex)) {
                    this.tipword = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger;
                    this.tipchange = true;
                    return;
                } else {
                    if(pageIndex!==1 && pageIndex!==this.pageData.TotalPage){
                        if (pageIndex < 1 || pageIndex > this.pageData.TotalPage) {
                            this.tipchange = true;
                        }
                        this.tipword = this.lang.DataGrid_Reaction_HT_PEThePageNumber;
                        return;
                    }
                }
             
            }
            this.$axios.post('/api/NewTrendSeriesAlarm/GetDeviceStatusBusinessRecord', {
                PageSize: this.pageData.PageSize,
                PageIndex: pageIndex,
            }).then(res=>{
                if(res.status == 200){
                    let {TotalCount, PageSize, PageIndex, NewTrendSeriesAlarmRecordItems} = res.data
                    this.pageData.TotalCount = TotalCount;
                    this.pageData.PageSize = PageSize;
                    this.pageData.PageIndex = PageIndex;
                    this.tableData = [...NewTrendSeriesAlarmRecordItems];
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg
                }
            })
        },
        getdata(data, data1) {
            console.log(data, data1);
            this.selected = []
            data1.forEach(item=>{
                this.selected.push(item.SID)
            })
        },
        getdata1(data, data1) {
            this.selected = []
            data1.forEach(item=>{
                this.selected.push(item.SID)
            })
        },
        alarmConfirm(){
            if(this.selected.length === 0){
                this.tipchange = true;
                this.tipword = '请选择报警记录！';
                return
            }
            this.$axios({
                method: 'post',
                url: '/api/NewTrendSeriesAlarm/SetAlarmAck',
                data: this.selected
            }).then(res=>{
                if(res.data.code === 0){
                    this.tipchange = true;
                    this.tipword = res.data.data
                    this.req(1)
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg
                }
                console.log('报警确认', res)
            })
        },
        allConfirm(){
            this.$axios.post("/api/NewTrendSeriesAlarm/SetAllAlarmAck").then(res=>{
                console.log('全部确认', res)
                if(res.data.code === 0){
                    this.tipchange = true;
                    this.tipword = res.data.data
                    this.req(1)
                }else{
                    this.tipchange = true;
                    this.tipword = res.data.msg
                }
            })
        },
        confirmDialog(){
            this.closeDialog();
        },
        closeDialog(){
            this.tipchange = false;
            this.tipword = '';
            this.showBtnGroup = false
        }
    }
}
</script>
<style lang="scss" scoped>
.page-contain{
    height: calc(100% - 90px);
    overflow: hidden;
    color: #000;
    margin-top: 100px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #eee;
    padding: 20px 10px 30px 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    .contain{
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 0 0 10px;
        display: flex;
        flex-flow: column;
    }
    .search{
        padding: 0 50px;
        height: 60px;
        line-height: 60px;
        background: #ddd;

        .name{
            font-size: 20px;
            color: #000;
            font-weight: 700;
        }

        .button-list{
            text-align: right;

            .btn{
                width: 100px;
                height: 40px;
                font-weight: 600;
                font-size: 16px;
                margin-left: 10px;
                border: 0;
                color: #fff;
                border-radius: 4px;
                background-color: #4270e4;
                cursor: pointer;

                &.btn-error{
                    background-color: #ff6600;
                }
                &.btn-successful{
                    background-color: #79d088;
                }
            }
        }
    }
    .table-contain{
        flex: 1;
    }
    .pager-contain{
        height: 50px;
    }
}
.flex-flow{
    display: flex;

    .flex-full{
        flex: 1;
    }
}
</style>