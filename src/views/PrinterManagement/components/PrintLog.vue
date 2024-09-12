<template>
    <div class="printlogPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                打印日志
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>

            <div class="popContent">

                <el-table highlight-current-row :cell-style="{ borderColor: '#E4E7ED' }"
                    :header-cell-style="{ background: '#5a6c98', color: '#fff' }" :data="dataList" border height="100%">
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                    <el-table-column type="index" label="序号" width="60px"></el-table-column>
                    <el-table-column prop="CreateTime" label="打印时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="CreateUser" label="操作人" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="PrintResult" label="打印结果" :show-overflow-tooltip="true"></el-table-column>
                </el-table>

            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button class="btn" @click="handleClick('yes')" style="
                                                                     background: rgba(56, 109, 240);
                                                                    border: 1px solid #386df0;
                                                                ">
                    确定
                </el-button>
            </div>
        </div>
        <tip-pop v-if="isTipShow" :tipText="tipText" :noCancel="noCancel" @tipCallBack="tipCallBack"></tip-pop>

    </div>
</template>

<script>
import TipPop from '../../../components/public/tipPop.vue';

export default {
    props: ['selectItem'],
    components: {
        TipPop,
    },
    data() {
        return {

            isTipShow: false,
            tipText: '',
            noCancel: true,

            dataList: []


        };
    },

    mounted() {
        this.$axios({
            url: `/api/PrinterRecords/QueryPrintingRecordLogs?SerialNo=${this.selectItem.SerialNo}`,
            method: 'post',
        }).then((res) => {
            if (res.data.code == 0) {
                this.dataList = res.data.data || [];
            } else {
                this.tipText = res.data.msg;
                this.isPopShow = true;
            }
        });

    },
    methods: {

        tipCallBack(str) {
            this.isTipShow = false;
        },
        handleClick(str) {
            this.$emit('callback');
        },
    },
};
</script>

<style lang="scss" scoped>
.printlogPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 850px;
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

        .popContent {
            width: 100%;
            height: 400px;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;





        }


        .popBtn {
            width: 100%;
            height: 60px;
            text-align: center;
            // line-height: 60px;

            .btn {
                width: 100px;
                height: 38px;
                background: rgba(153, 153, 153);
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 20px;
                margin-top: 10px;
                border: 1px solid #999999;
            }
        }
    }


}
</style>
<style lang="scss">
.printlogPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>