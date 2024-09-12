<!--
 * @Description: 这是添加班组弹窗页面（组件）
 * @Date: 2020-11-18 13:38:07
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 14:12:12
-->
<template>
    <div class="TeamPop" :style="{ zoom: zoomValue }">
        <div class="head">
            {{ title }}
            <div @click="cancelFun()" class="headImg"></div>
        </div>
        <div class="middle">
            <div class="middle_1">
                <div class="middle_name require">班组编码</div>
                <div class="middle_input">
                    <el-input
                        :disabled="isShow || this.type == 'edit'"
                        v-model="sCode"
                        :maxLength="2"
                    ></el-input>
                </div>
            </div>

            <div class="middle_1">
                <div class="middle_name require">
                    {{ lang.ScheduleManage_ClassName }}
                </div>
                <div class="middle_input">
                    <el-input
                        :disabled="isShow"
                        v-model="nanvalue"
                        :maxLength="10"
                    ></el-input>
                </div>
            </div>
            <div class="middle_2">
                <div class="middle_name">
                    {{ lang.ScheduleManage_ClassName_Remark }}
                </div>
                <div class="middle_textarea">
                    <el-input
                        :disabled="isShow"
                        type="textarea"
                        v-model="textarea"
                        resize="none"
                    ></el-input>
                </div>
            </div>
            <div class="middle_3">
                <div @click="confirmFun()" class="confirm">
                    {{ lang.PopupCommon_Sure }}
                </div>
                <div @click="cancelFun()" class="cancel">
                    {{ lang.PopupCommon_Cancel }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    data() {
        return {
            sCode: '',
            nanvalue: '',
            textarea: '',
            title: '新增班组',
            isShow: false,
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ],
            zoomValue: 0
        };
    },

    props: ['itemdata', 'type'],
    created() {
        this.$nextTick(() => {
            this.zoomValue =
                Number(parseFloat(window.screen.width / 1920).toFixed(2)) <= 0.8
                    ? 0.8
                    : Number(parseFloat(window.screen.width / 1920).toFixed(2));
        });
        if (this.type == 'add') {
            this.title = this.lang.ScheduleManage_ClassName_New;
            this.isShow = false;
            this.sCode = '';
            this.nanvalue = '';
            this.textarea = '';
        } else if (this.type == 'edit') {
            this.title = this.lang.SCMSConsoleWebApiMySql_EditTeam;
            this.isShow = false;
            this.sCode = this.itemdata.sCode;
            this.nanvalue = this.itemdata.sName;
            this.textarea = this.itemdata.sRemark;
        } else {
            this.title = this.lang.ScheduleManage_ClassName_Edit;
            this.isShow = true;
            this.sCode = this.itemdata.sCode;
            this.nanvalue = this.itemdata.sName;
            this.textarea = this.itemdata.sRemark;
        }
    },
    methods: {
        addFunAxios() {
            //添加班组接口
            let userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserAccount;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserAccount;
            }
            this.$axios({
                method: 'post',
                url: `/api/class/create`,
                data: {
                    sName: this.nanvalue,
                    sRemark: this.textarea,
                    sCode: this.sCode,
                    sStaff: userid
                }
            })
                .then(res => {
                    if (res.data.data == 0) {
                        this.$parent.Pshow(res.data.msg, '1', '存在');
                    } else {
                        this.$parent.query();
                        this.$parent.cancelFun();
                    }
                })
                .catch(err => {
                    console.log('err', err);
                });
        },
        //{{lang.PopupCommon_Sure}}
        confirmFun() {
            let userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1'))
                    .SCMSUserAccount;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1'))
                    .SCMSUserAccount;
            }
            if (this.type == 'add') {
                this.$axios({
                    //校验添加的班组是否是 之前删除过的班组
                    method: 'post',
                    url: `/api/class/CheckClass`,
                    data: {
                        sName: this.nanvalue,
                        sRemark: this.textarea,
                        sCode: this.sCode,
                        sStaff: userid
                    }
                })
                    .then(res => {
                        if (res.data.code == 1) {
                            this.$parent.Pshow(
                                this.lang
                                    .SCMSConsoleWebApiMySql_TeamDeletedWantRestoreIt,
                                '2',
                                '班组恢复'
                            );
                        } else {
                            this.addFunAxios();
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                    });
            } else if (this.type == 'edit') {
                //编辑保存接口
                this.$axios({
                    method: 'post',
                    url: `/api/class/Update/${this.itemdata.sId}?name=${this.nanvalue}&remark=${this.textarea}`
                })
                    .then(res => {
                        if (res.data.data != 0) {
                            this.$parent.query('存在');
                            this.$parent.cancelFun();
                        } else {
                            this.$parent.Pshow(res.data.msg, '1', '存在');
                        }
                    })
                    .catch(err => {});
            } else {
                this.$parent.cancelFun();
            }
        },
        cancelFun() {
            this.$parent.cancelFun();
        }
    }
};
</script>
<style lang="scss">
.TeamPop {
    .el-textarea {
        height: 100%;
    }
    .el-textarea__inner {
        height: 90px;
    }
}
</style>
<style lang="scss" scoped>
.TeamPop {
    height: 350px;
    width: 520px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 12;
    box-shadow: -7px 7px 50px 0px rgba(51, 51, 51, 0.5);
    background: #eeeeee;
    .head {
        position: relative;
        line-height: 40px;
        text-align: center;
        width: 100%;
        height: 40px;
        background: rgba(56, 109, 240, 1);
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(238, 238, 238, 1);
        user-select: none;
        .headImg {
            position: absolute;
            right: 12px;
            top: 13px;
            width: 16px;
            height: 16px;
            background: url('../../../assets/images/no.png');
            background-size: cover;
            cursor: pointer;
        }
    }
    .middle {
        width: calc(100% - 20px);
        height: calc(100% - 50px);
    }
    .tips {
        width: 100%;
        margin-left: 125px;
    }
    .middle_1,
    .middle_2 {
        overflow: hidden;
    }
    .middle_1 {
        height: 42px;
        line-height: 42px;
        margin-top: 20px;
    }
    .middle_2 {
        height: 90px;
        margin-top: 12px;
    }
    .middle_name {
        float: left;
        width: 70px;
        font-size: 16px;
        text-align: right;
        margin-left: 30px;
        margin-right: 20px;
        position: relative;
    }

    .require::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-100%, -50%);
    }
    .middle_textarea {
        float: left;
        width: 350px;
        height: 90px;
    }
    .middle_input {
        float: left;
        width: 350px;
        height: 40px;
    }
    .middle_3 {
        width: 100%;
        height: 40px;
        overflow: hidden;
        margin-top: 20px;
        .confirm,
        .cancel {
            float: right;
            width: 100px;
            height: 40px;
            border-radius: 4px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            user-select: none;
            color: #fff;
        }
        .cancel {
            background: #949bac;
        }
        .confirm {
            background: #4270e4;
            margin-left: 20px;
            margin-right: 20px;
        }
    }
}
</style>
