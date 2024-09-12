
<!-- 操作记录 -->
<template>
    <div class="page-full">
        <div class="page-contain">
            <div class="search-container">
                <my-search
                    :searchList="searchList"
                    :searchData="searchData"
                    @setParams="setParams"
                />
            </div>
            <div class="view-container flex-column-layout">
                <div class="table-contain full-flex">
                    <my-table
                        :data="tableData"
                        :tableHead="tableHead"
                        style="width: 100%"
                    >
                    </my-table>
                </div>
                <div class="paeg-contain">
                    <div class="pager-contain">
                        <my-page :pageData="pageData" @req="req"/>
                    </div>
                </div>
            </div>
        </div>
        <cms-dialog :tipchange="tipchange" :tipword="tipword" @confirm="confirmDialog"/>
    </div>
</template>
<script>
import MySearch from '@/components/public/searchDiy.vue';
import MyTable from '@/components/public/table0Diy.vue';
import MyPage from '@/components/public/Pages.vue';
import CmsDialog from '@/components/public/cmsDialog.vue';
export default {
    components: {
        MySearch,
        MyTable,
        MyPage,
        CmsDialog,
    },
    data() {
        return {
            tipchange: false,
            tipword: '',
            searchList: [
                {
                    title: '时间范围：',
                    model: 'argStartTime',
                    type: 'date',
                },
                {
                    title: '-',
                    model: 'argEndTime',
                    type: 'date',
                },
                {
                    model: 'classes',
                    type: 'key',
                },
            ],
            searchData: {
                argStartTime: '',
                argEndTime: '',
                classes: '',
            },
            tableData: [],
            tableHead: {
                No: '计划编号',
                DrawingNo: '图号',
                ProductName: '产品名称',
                Desc: '操作描述',
                Operator: '操作人',
                RecordTime: {
                    name: '操作时间',
                    width: 250
                },
            },
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            },
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
        };
    },
    methods: {
        getOperator(key){ // 获取当前信息
            return JSON.parse(sessionStorage.getItem('sightseerInfo1'))[key]
        },
        getList(index = null){
            let { argStartTime, argEndTime, classes } = this.searchData
            let { PageSize, PageIndex } = this.pageData
            this.$axios.get(encodeURI(`/api/ProductionManage/GetOperationRecords?start=${argStartTime}
                &end=${argEndTime}&keyword=${classes}&pageSize=${PageSize}&pageIndex=${index || PageIndex}`)).then(res=>{
                let {code, data} = res.data
                if(code === 0){
                    this.tableData = [...data.DataList]
                    console.log(data.DataList)
                    this.pageData = data.ParameterList
                }
            })
        },
        setParams(params) {
            console.log("查询", params)
            // 开始时间大于结束时间
            if (new Date(params.argStartTime + ' 00:00:00').getTime() > new Date(params.argEndTime + ' 00:00:00').getTime()) {
                this.tipchange = true;
                this.tipword = this.lang.AlarmRecord_HT_TheQueryDate;
                return
            }
            this.getList();
        },
        isPositiveInteger(s) {   
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s){
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
            this.getList(pageIndex)
        },
        getTime(time = 0){
            return this.$getDate(new Date(new Date().toLocaleDateString()).getTime() + time)
        },
        confirmDialog(){
            // 时间格式不正确
            if(this.tipword == this.lang.SCMSConsoleWebApiMySql_TimeFormatIsIncorrect){
                this.tipchange = false;
                this.searchData.argStartTime = this.getTime();
                this.searchData.argEndTime = this.getTime(24 * 60 * 60 * 1000 - 1);
                return;
            }
            this.closeDialog();
        },
        closeDialog(){
            this.tipchange = false;
            this.tipword = '';
            this.showBtnGroup = false
        },
        mGetDate(year, month){
            let d = new Date(year, month, 0);
            return d.getDate();
        }
    },
    created() {
        let date = new Date();
        let argStartTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + '01'
        let argEndTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + this.mGetDate(date.getFullYear(), date.getMonth() + 1)
        Object.assign(this.searchData, {
            argStartTime,
            argEndTime,
        });
    },
    mounted(){
        this.getList()
    },
};
</script>
<style lang="scss" scoped>
.page-full {
    height: 100%;
    overflow: hidden;
    color: #000;
    background-color: #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    .page-contain {
        background: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
    }
    .view-container {
        flex: 1;
    }
    .echart-view {
        height: 45%;
        margin-bottom: 21px;
    }
    .flex-layout {
        display: flex;
    }
    .flex-column-layout {
        display: flex;
        flex-flow: column;
    }
    .full-flex {
        flex: 1;
    }
}
.pane {
    height: 100%;
    background: rgba(255, 255, 255, 0.39);
    border: 1px solid #e5e6e6;

    &:last-child {
        margin-bottom: 0;
    }
}
.opt-btn{
    position: relative;
    background: #fff;
    border-radius: 4px;
    border: 2px solid #ccc;
    width: 60px;
    height: 30px;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;

    &::after{
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &.Issued{
        &::after{
            background: url(~@/assets/images/icon_xiafa_nor.png) no-repeat;
            background-size: 100%;
        }
    }

    &.undo{
        &::after{
            background: url(~@/assets/images/icon_revoke_nor.png) no-repeat;
            background-size: 100%;
        }
        &:disabled{
            &::after{
                background: url(~@/assets/images/icon_revoke_dis.png) no-repeat;
                background-size: 100%;
            }
        }
    }

    &.pause{
        &::after{
            background: url(~@/assets/images/icon_pause_nor.png) no-repeat;
            background-size: 100%;
        }
        &:disabled{
            &::after{
                background: url(~@/assets/images/icon_pause_dis.png) no-repeat;
                background-size: 100%;
            }
        }
    }
    &.stop{
        &::after{
            background: url(~@/assets/images/icon_stop_nor.png) no-repeat;
            background-size: 100%;
        }
        &:disabled{
            &::after{
                background: url(~@/assets/images/icon_stop_dis.png) no-repeat;
                background-size: 100%;
            }
        }
    }
    &.edit{
        &::after{
            background: url(~@/assets/images/icon_pensoil.png) no-repeat;
            background-size: 100%;
        }
    }

    &:disabled{
        background: #ccc;
        cursor: not-allowed;
    }
}
.inpimg1{
    width: 24px;
    height: 24px;
    position: absolute;
    right: 8px;
    top: 8px;
}
</style>
