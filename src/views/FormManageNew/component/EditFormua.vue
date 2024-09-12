<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                {{ title }}
                <img :src="require('../../../assets/images/no.png')" alt="" @click="handleClick" class="close" />
            </div>

            <div class="popContent">
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">配方模板</div>
                        <el-select style="width: 350px" v-model="formData.TID">
                            <el-option v-for="item in tempList" :key="item.TID" :label="item.Name"
                                :value="item.TID"></el-option>
                        </el-select>
                    </div>

                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">产品型号</div>
                        <el-select style="width: 350px" v-model="formData.ProductTypeCode">
                            <el-option v-for="item in prodList" :key="item.ID" :label="item.ProductTypeCode"
                                :value="item.ProductTypeCode"></el-option>
                        </el-select>
                    </div>

                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">配方名称</div>
                        <el-input type="text" v-model="formData.Name" style="width: 350px" />
                    </div>

                </div>
                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable required">配方号</div>
                        <el-input type="text" v-model="formData.Number" style="width: 350px" />
                    </div>
                </div>

                <div class="content1-line">
                    <div class="content">
                        <div class="contentLable">配方描述</div>
                        <el-input type="textarea" v-model="formData.FormulaDescription" style="width: 350px" />
                    </div>

                </div>

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
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';

export default {
    props: ['title', 'selectItem'],
    components: {
        CurrentTitle,
        TipPop
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: true,
            formData: {
                TID: '',
                FID: '',
                ProductTypeCode: '',
                Name: '',
                Number: '',
                FormulaDescription: '',
                LoginUserName: '',
            },
            tempList: [],
            prodList: [],
        };
    },

    mounted() {



        this.$axios({
            method: 'post',
            url: `api/FormulaManage/QueryFormulaTemplateProjects`
        })
            .then(res => {
                if (res.data.code == 0) {
                    this.tempList = res.data.data;
                    let _url = this.title == '修改配方' ? `api/FormulaManage/QueryNotUseProductType?FormulaId=${this.selectItem.FID}` : 'api/FormulaManage/QueryNotUseProductType'
                    this.$axios({
                        method: 'post',
                        url: _url
                    })
                        .then(res => {
                            if (res.data.code == 0) {
                                this.prodList = res.data.data;
                                if (this.title == '修改配方') {
                                    this.formData = {
                                        ...this.selectItem
                                    }
                                } else if (this.title == '复制配方') {
                                    this.formData = {
                                        ...this.selectItem,
                                        ProductTypeCode: '',
                                        FID: '',
                                        Name: this.selectItem.Name + '_副本',
                                        Number: '',
                                    }
                                }
                            } else {
                                this.isTipShow = true;
                                this.tipText = res.data.msg;
                            }
                        })
                } else {
                    this.isTipShow = true;
                    this.tipText = res.data.msg;
                }
            })



    },
    methods: {
        tipCallBack(str) {
            this.isTipShow = false;
            this.noCancel = true;
            if (str == 'yes') {
                let userid = ''
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    userid = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserName;
                }
                this.$axios({
                    method: 'post',
                    url: `api/FormulaManage/FormulaManage_UpdateFormula?Confire=${true}`,
                    data: {
                        ...this.formData,
                        items: this.formData.TemplateProjects,
                        LoginUserName: userid
                    }
                })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.isTipShow = true;
                            this.$emit('callback', '修改成功！');
                        } else {
                            this.isTipShow = true;
                            this.tipText = res.data.msg;
                        }
                    })
            }
        },
        handleClick(str) {
            if (str == 'yes') {
                let userid = ''
                if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                    userid = JSON.parse(
                        sessionStorage.getItem('sightseerInfo1')
                    ).SCMSUserName;
                } else {
                    userid = JSON.parse(
                        sessionStorage.getItem('userInfo1')
                    ).SCMSUserName;
                }
                if (this.title == '添加配方' || this.title == '复制配方') {
                    this.$axios({
                        method: 'post',
                        url: `api/FormulaManage/FormulaManage_AddFormula`,
                        data: {
                            ...this.formData,
                            items: this.formData.TemplateProjects,
                            LoginUserName: userid
                        }
                    })
                        .then(res => {
                            if (res.data.code == 0) {
                                this.$emit('callback', '新增成功！');
                            } else {
                                this.isTipShow = true;
                                this.tipText = res.data.msg;
                            }
                        })
                } else if (this.title == '修改配方') {
                    this.$axios({
                        method: 'post',
                        url: `api/FormulaManage/FormulaManage_UpdateFormula?Confire=${false}`,
                        data: {
                            ...this.formData,
                            items: this.formData.TemplateProjects,
                            LoginUserName: userid
                        }
                    })
                        .then(res => {
                            if (res.data.code == 0) {
                                this.isTipShow = true;
                                this.$emit('callback', '修改成功！');
                            } else {
                                this.isTipShow = true;
                                this.tipText = res.data.msg;
                                if (res.data.msg == '切换配方模版将会重置配方项目内容，被重置内容不可恢复，是否继续？') {
                                    this.noCancel = false;
                                }
                            }
                        })
                }
            } else {
                this.$emit('callback');
            }

        },
    },
};
</script>

<style lang="scss" scoped>
.zdeditPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 600px;
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
            height: auto;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;



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
.zdeditPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
</style>