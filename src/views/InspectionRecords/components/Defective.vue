<!--
 * @Description: 这是参数报表页面（组件）
 * @Date: 2019-11-28 10:59:10
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-08 15:25:35
 -->
<template>
    <div class="tapwater">
        <div class="linebox" id="linebox">
            <div class="query-table clearfix">
                <div class="fl">
                    <el-input style="margin-left:5px;width:170px" placeholder="请输入关键词" v-model="inputFilter" />
                    <div class="query" @click="req(1)">查询</div>
                </div>
                <div class="fr">
                    <div class="search-btn add" @click="openEditOrder('新增')">新增</div>
                    <div class="search-btn type" @click="openEditOrder('编辑')">编辑</div>
                    <div class="search-btn del" @click="delOrder">删除</div>
                    <el-upload action="#" accept=".xlsx" :show-file-list="false" :http-request="uploadExcel">
                        <div class="search-btn log">导入</div>
                    </el-upload>


                    <div class="search-btn type" @click="exportFn">导出</div>
                </div>
            </div>
            <div class="conter">
                <div class="conter-table">
                    <el-table ref="myTable" @row-click="handleRowChange" highlight-current-row
                        :cell-style="{ borderColor: '#E4E7ED' }"
                        :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="100%">
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column type="index" label="序号" width="60px"></el-table-column>
                        <el-table-column prop="poorBarCode" label="不良码" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="poorMark" label="不良描述" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="recordTime" label="创建时间" width="220px"
                            :show-overflow-tooltip="true"></el-table-column>
                    </el-table>
                </div>
                <div class="conter-page">
                    <my-page :pageData="pageData" @req="req"></my-page>
                </div>
            </div>
        </div>
        <!-- 提示弹窗和遮罩层 -->
        <TipsPop v-if="isPopShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></TipsPop>
        <EditDefective v-if="EditOrderShow" :selectItem="EditOrderSelectItem" :title="EditTitle" @callback="EditOrderBack">
        </EditDefective>

    </div>
</template>

<script>
// vue文件中引入echarts工具
import TipsPop from '../../../components/public/tipPop.vue';
import MyPage from '../../../components/public/page.vue';
import EditDefective from './EditDefective.vue';

export default {
    name: 'tapwater',
    components: {
        TipsPop,
        MyPage,
        EditDefective
    },
    data() {
        return {
            isPopShow: false,
            tipText: '',
            noCancel: true,


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
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            EditOrderShow: false,
            EditTitle: '',
            EditOrderSelectItem: null,

        };
    },
    //渲染后计算宽度
    mounted() {
        this.req(1)
    },

    methods: {
        handleRowChange(row, event, column) {
            this.EditOrderSelectItem = row;

        },
        delOrder() {
            if (!this.EditOrderSelectItem) {
                this.isPopShow = true
                this.tipText = '请选择不良码！'
                return
            }
            this.isPopShow = true
            this.tipText = '是否确认删除选中不良码？'
            this.noCancel = false;
        },
        openEditOrder(type) {
            if (!this.EditOrderSelectItem && type != '新增') {
                this.isPopShow = true
                this.tipText = '请选择不良码！'
                return
            }
            this.EditTitle = type;
            this.EditOrderShow = true;
            console.log(this.EditTitle)
        },
        EditOrderBack(str) {
            this.EditTitle = '';
            this.EditOrderShow = false;
            this.req(1);
            if (str) {
                this.isPopShow = true
                this.tipText = str
            }
        },
        uploadExcel(file) {
            let _name = ''
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                _name = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                _name = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
            let formData = new FormData()
            formData.append('file', file.file)
            this.$axios({
                method: 'post',
                url: `/api/InspectionRecords/ImportExcel?LoginUserName=${_name}`,
                data: formData
            }).then((res) => {
                if (res.data.code == 0) {
                    this.isPopShow = true
                    this.tipText = '导入成功！'
                    this.req(1)
                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })
        },
        exportFn() {
            let _name = ''
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                _name = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserName;
            } else {
                _name = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserName;
            }
            this.$axios({
                method: 'get',
                url: `/api/InspectionRecords/ExportBomExcel?LoginUserName=${_name}`,
                responseType: 'blob',
            }).then(res => {
                if (res.status === 200) {
                    let _date = new Date().getTime()
                    this.downloadFile(res.data, `不良码管理${_date}.xlsx`)
                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })

        },
        tipCallBack(str) {
            if (str == 'yes') {
                //删除
                let _name = ''
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    _name = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    _name = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserName;
                }
                this.$axios({
                    method: 'post',
                    url: `/api/InspectionRecords/DelDefectiveReason/${this.EditOrderSelectItem.id}?LoginUserName=${_name}`,
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.isPopShow = true
                        this.tipText = '删除成功！'
                        this.req(1)
                    } else {
                        this.isPopShow = true
                        this.tipText = res.data.msg
                    }
                })
            }
            this.noCancel = true;
            this.isPopShow = false;
        },
        req(_index) {
            this.$axios({
                method: 'post',
                url: `/api/InspectionRecords/QueryDefectiveProductsReason?KeyWord=${this.inputFilter}&PageSize=${this.pageData.PageSize}&PageIndex=${_index}`,
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data.dataList || [];
                    this.pageData = {
                        PageSize: res.data.data.parameterList.pageSize,
                        TotalCount: res.data.data.parameterList.totalCount,
                        TotalPage: res.data.data.parameterList.totalPage,
                        PageIndex: res.data.data.parameterList.pageIndex,
                        LastEnabled: res.data.data.parameterList.lastEnabled,
                        NextEnabled: res.data.data.parameterList.nextEnabled,
                    }
                    if (this.dataList.length) {
                        this.EditOrderSelectItem = this.dataList[0]
                        this.$refs.myTable.setCurrentRow(this.dataList[0]);
                    } else {
                        this.EditOrderSelectItem = null
                    }
                } else {
                    this.isPopShow = true
                    this.tipText = res.data.msg
                }
            })
        },


    },

};
</script>

<style lang="scss">
.tapwater {
    .fl .el-input--prefix .el-input__inner {
        padding-left: 25px !important;
    }

    .table input {
        text-indent: 4px;
    }
}
</style>

<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.conter {
    width: 100%;
    height: calc(100% - 60px);


    .conter-table {
        width: 100%;
        height: calc(100% - 50px);
    }

    .conter-page {
        width: 100%;
        height: 50%;

    }

}

.fl {
    float: left;
}

.fr {
    float: right;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .search-btn {
        cursor: pointer;
        margin-right: 10px;
        height: 36px;
        width: 100px;
        border-radius: 4px;
        border: 1px solid #fcae38;
        background-color: #fff;
        color: #fcae38;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        a {
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;

            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
    }

    .add {
        border: 1px solid #61D731;
        color: #61D731;
    }

    .del {
        background-color: #aaaaaa;
        border: none;
        color: #fff;
    }

    .type {
        background-color: #fcae38;
        border: none;
        color: #fff;
    }

    .log {
        border: 1px solid #5279DD;
        color: #5279DD;
    }
}

.clearfix::after {
    content: '';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    zoom: 1;
}

.tapwater {
    box-sizing: border-box;
    width: 100%;
    height: 100%;


    .linebox {
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d5d5d5;
    }

    .query-table {
        height: 60px;
        background-color: #dddddd;
        line-height: 60px;
        overflow: hidden;
        font-size: 14px;
        color: #6b6668;

        span {
            margin-left: 18px;
        }

        .tablename {
            height: 40px;
            width: 250px;
        }

        .tabledatetime {
            height: 40px;
            width: 178px;
        }

        .starttime {
            height: 40px;
            width: 210px;
            display: inline-block;
            margin-left: 18px;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }

        .endtime {
            height: 40px;
            width: 210px;
            display: inline-block;
            background-color: #ffffff;
            line-height: 40px;
            padding-left: 12px;
        }
    }

    .query,
    .add,
    .getOrder {
        display: inline-block;
        height: 40px;
        width: 118px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
    }

    .query {
        background-color: #4270e4;
        margin-left: 10px;
    }

    .getOrder {
        background-color: #ffffff;
        color: #4270e4;
        border: 2px solid #4270e4;
        margin-right: 20px;
    }

    .add {
        background-color: #23d052;
        color: #fff;
    }

    .container {
        display: inline-block;
        height: 40px;

        .block {
            display: inline-block;
        }
    }

    .separate {
        position: relative;
        left: 7px;
    }
}
</style>
 