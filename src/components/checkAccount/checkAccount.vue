<!--
 * @Description: 质量管理界面
 * @Date: 2019-11-24 14:31:33
 * @Author: 随风
 * @LastEditors: Tao
 * @LastEditTime: 2020-08-06 18:09:35
 -->
<template>
    <div class="check-account">
        <div class="check-account-content">
            <div class="check-account-title">电子签名验证</div>
            <div class="check-account-area">
                <div class="sign-item" v-if="!doubleSign">
                    <div class="sign-from0">
                        <div class="from-item">
                            用户账号<input v-model="name1" />
                        </div>
                        <div class="from-item">
                            密码<input v-model="pass1" type="password" />
                        </div>
                    </div>
                </div>
                <div class="sign-item" v-if="doubleSign">
                    <div class="sign-title">
                        操作签名
                        <img
                            src="../../assets/images/pass.svg"
                            v-show="passShow1"
                        />
                    </div>
                    <div class="sign-from">
                        <div class="from-item">
                            用户账号<input
                                v-model="name1"
                                @blur="check1"
                                @keydown="keyDown(1, $event)"
                            />
                        </div>
                        <div class="from-item">
                            密码<input
                                v-model="pass1"
                                @blur="check1"
                                @keydown="keyDown(1, $event)"
                                type="password"
                            />
                        </div>
                    </div>
                </div>
                <div class="sign-item" v-if="doubleSign">
                    <div class="sign-title">
                        复核签名
                        <img
                            src="../../assets/images/pass.svg"
                            v-show="passShow2"
                        />
                    </div>
                    <div class="sign-from">
                        <div class="from-item">
                            用户账号<input
                                v-model="name2"
                                @blur="check2"
                                @keydown="keyDown(2, $event)"
                            />
                        </div>
                        <div class="from-item">
                            密码<input
                                v-model="pass2"
                                @blur="check2"
                                @keydown="keyDown(2, $event)"
                                type="password"
                            />
                        </div>
                    </div>
                </div>
                <div class="tip-text">
                    *签名后，有效期限为{{checkAccountSecond}}秒，期间操作认证为本次签名信息，请注意！
                </div>
                <div class="foot-btn">
                    <div class="cancel" @click="cancelFn">取消</div>
                    <div class="sumbit" @click="sumbitFn">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['doubleSign', 'argChildMenuID', 'elementName','checkAccountSecond'],

    data() {
        return {
            name1: '',
            name2: '',
            pass1: '',
            pass2: '',
            passShow1: false,
            passShow2: false,
        };
    },

    methods: {
        cancelFn() {
            this.name1 = '';
            this.name2 = '';
            this.pass1 = '';
            this.pass2 = '';
            this.$emit('cancelFn');
        },
        sumbitFn() {
            //检验完后
            let userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
            let sightseerInfo1 = JSON.parse(
                sessionStorage.getItem('sightseerInfo1')
            );
            let argUserID =
                userinfo != null
                    ? (argUserID = userinfo.SCMSUserID)
                    : (argUserID = sightseerInfo1.SCMSUserID);
            this.$axios({
                method: 'post',
                url: `/api/Login/ValidateSignature`,
                data: {
                    UserID: argUserID,
                    ChildMenuID: this.argChildMenuID,
                    ElementName: this.elementName,
                    OperationUser: {
                        UserName: this.name1,
                        Pwd: this.pass1,
                    },
                    ReviewUser: {
                        UserName: this.name2,
                        Pwd: this.pass2,
                    },
                },
            }).then((res) => {
                if (res.data.code == 0) {
                    if (res.data.data.success == 1) {
                        this.name1 = '';
                        this.name2 = '';
                        this.pass1 = '';
                        this.pass2 = '';
                        this.$emit('sumbitFn');
                    } else {
                        this.tipShow(res.data.data.error);
                    }
                } else {
                    this.tipShow(res.data.msg);
                }
            });
        },
        keyDown(type, e) {
            let code = e.keyCode || e.which || e.charCode;
            if (code == 13) {
                if (type == 1) {
                    this.check1();
                }
                if (type == 2) {
                    this.check2();
                }
            }
        },
        check1() {
            return;
            if (this.name1 && this.pass1) {
                let userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
                let sightseerInfo1 = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                );
                let argUserID =
                    userinfo != null
                        ? (argUserID = userinfo.SCMSUserID)
                        : (argUserID = sightseerInfo1.SCMSUserID);
                this.$axios({
                    method: 'post',
                    url: `/api/Login/ValidateSignature`,
                    data: {
                        UserID: argUserID,
                        ChildMenuID: this.argChildMenuID,
                        ElementName: this.elementName,
                        OperationUser: {
                            UserName: this.name1,
                            Pwd: this.pass1,
                        },
                        ReviewUser: { UserName: '', Pwd: '' },
                    },
                }).then((res) => {
                    if (res.data.code == 0) {
                        if (res.data.data.success == 1) {
                            this.passShow1 = true;
                        } else {
                            this.tipShow(res.data.data.error);
                        }
                    } else {
                        this.tipShow(res.data.msg);
                    }
                });
            }
        },
        check2() {
            return;
            if (this.name2 && this.pass2) {
                let userinfo = JSON.parse(sessionStorage.getItem('userInfo1'));
                let sightseerInfo1 = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                );
                let argUserID =
                    userinfo != null
                        ? (argUserID = userinfo.SCMSUserID)
                        : (argUserID = sightseerInfo1.SCMSUserID);
                this.$axios({
                    method: 'post',
                    url: `/api/Login/ValidateSignature`,
                    data: {
                        UserID: argUserID,
                        ChildMenuID: this.argChildMenuID,
                        ElementName: this.elementName,
                        OperationUser: {
                            UserName: '',
                            Pwd: '',
                        },
                        ReviewUser: {
                            UserName: this.name2,
                            Pwd: this.pass2,
                        },
                    },
                }).then((res) => {
                    if (res.data.code == 0) {
                        if (res.data.data.success == 1) {
                            this.passShow2 = true;
                        } else {
                            this.tipShow(res.data.data.error);
                        }
                    } else {
                        this.tipShow(res.data.msg);
                    }
                });
            }
        },
        tipShow(msg) {
            this.$emit('tipShow', msg);
        },
    },
    created() {},
    mounted() {},
};
</script>

<style lang="scss" scoped>
.check-account {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    .check-account-content {
        width: 400px;
        height: auto;
        background: #f3f3f4;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .check-account-title {
            width: 100%;
            height: 50px;
            color: #fff;
            background: #386df0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .check-account-area {
            width: 100%;
            height: auto;
            padding: 16px 0;
            box-sizing: border-box;
            .sign-item {
                width: 100%;
                padding: 0 32px;
                box-sizing: border-box;
                .sign-title {
                    color: #386df0;
                    position: relative;
                    padding-left: 15px;
                    img {
                        width: 16px;
                        height: 16px;
                        position: absolute;
                        right: 16px;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                }
                .sign-title::before {
                    content: '';
                    height: 100%;
                    width: 2px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: #386df0;
                }
                .sign-from,
                .sign-from0 {
                    width: 100%;
                    height: auto;
                    background: #fff;
                    padding: 16px 32px 16px 0;
                    margin: 16px 0;
                    box-sizing: border-box;
                    .from-item {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        margin-bottom: 16px;
                        input {
                            width: 190px;
                            border: 1px solid #ededed;
                            height: 30px;
                            margin-left: 20px;
                            padding-left: 5px;
                            box-sizing: border-box;
                        }
                    }
                    .from-item:last-child {
                        margin-bottom: 0;
                    }
                }
                .sign-from0 {
                    background: transparent;
                    padding: 0;
                    .from-item input {
                        width: 250px;
                    }
                }
            }
            .tip-text {
                width: 100%;
                font-size: 12px;
                color: #f59a23;
                word-break: keep-all;
                text-align: center;
            }
            .foot-btn {
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px 0;
                box-sizing: border-box;
                .cancel {
                    cursor: pointer;
                    width: 120px;
                    height: 40px;
                    background: #e0e0e0;
                    color: #333333;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 32px;
                }
                .sumbit {
                    cursor: pointer;
                    width: 120px;
                    height: 40px;
                    background: #386df0;
                    color: #fff;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
}
</style>
