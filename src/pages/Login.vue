<!--
 * @Description: 这是登录页面（组件）
 * @Date: 2019-11-12 17:31:23
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-01-26 17:57:37
 -->
<template>
    <div class="login" v-loading="this.$store.state.isShow" :style="[{ 'width': '100%' }, { 'height': '100%' }, { zoom: a11 }]">
        <div class="login_box">
            <div class="login_top">
                <i class="bol"></i>
                <span class="text">{{ localData.Login_SystemName }}</span>
            </div>
            <div class="login_middleTop"></div>
            <div class="login_middle">
                <div class="middle_left">
                    <div class="middle_conter">
                        <div class="middle_usrename">
                            <span class="el-icon-user"></span>
                            <input @keyup.enter="loginFun()" class="user" type="username" v-model="userName"
                                :placeholder="localData.Login_UserName" />
                        </div>
                        <div class="middle_password">
                            <span class="el-icon-lock"></span>
                            <input class="pad" :type="passwordState.passwordType" v-model="passWord"
                                :placeholder="localData.Login_Password" @keyup.enter="loginFun()" @keyup="funcFun($event)">
                            <img class="password-eye-icon" @click="showPassword" :src="passwordState.icon" />
                        </div>
                        <div class="errText" style="display:none;margin-top:15px;color:red;font-size:14px;"><span
                                class="errText1">{{ errText }}</span></div>
                        <div class="DAXX"
                            style="display:none;position:absolute;bottom:-23px;left:0;width:150px;height:30px;background:rgba(157,185,252,0.8);">
                            {{ localData.Login_CapitalLockHint }}</div>
                    </div>
                </div>
                <div class="middle_right">
                    <div @click="loginClick()" class="right_login">
                        <span class="el-icon-arrow-right"></span>
                        <div>{{ localData.Login_Login }}</div>
                    </div>
                    <div class="middle_line"></div>

                    <div class="right_retrun" @click="returnc">
                        <div class="el-icon-close"></div>
                        <div>{{ localData.Login_Back }}</div>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div class="lang">
                <el-select v-model="langValue" class="login-lang" @focus="getZoom()" @change="changeLang($event)"
                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                    <el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div class="sycLogo1">
            <div class="sycLogo1Box">
                <img class="sycLogo1Img" src="../assets/images/syclogo.png" />
            </div>
        </div>
        <div class="sycLogo2">
            <div class="sycLogo2Box">
                <img class="sycLogo2Img" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            icon: {
                pwdShow: require('@/assets/images/PwdShow.png'),
                pwdHide: require('@/assets/images/PwdHide.png')
            },
            passwordState: {
                icon: '',
                passwordType: 'password',
            },
            a11: 1,
            userName: '',
            passWord: '',
            errText: '',
            firstTochar: false,
            bigChar: false,
            bl: 2,
            screenwidth: 1920,
            screenheight: 935,
            langValue: '',
            localData: {
                Login_SystemName: 'CMS管控一体化系统·用户登录',
                Login_UserName: '请输入账号',
                Login_Password: '请输入密码',
                Login_Login: '登录',
                Login_Back: '返回',
                Login_CapitalLockHint: '大写锁定已打开',
                Login_HintMessage_Empty: '用户名或者密码不能为空，请重新输入！',
                Login_HintMessage_Error: '用户名不存在或者密码错误，请重新输入！',
                Login_HintMessage_MessReStart: '',
                Login_HintMessage_Hint: '',
            },
            languages: [],
            lang: ''
        }
    },
    methods: {
        //判断是否开启大小写
        funcFun(event) {
            if (this.passWord.length == 0) {
                document.querySelector('.DAXX').style.display = 'none'
            }
            var e = event || window.event;
            var keyvalue = e.keyCode ? e.keyCode : e.which;
            var shifKey = e.shiftKey ? e.shiftKey : ((keyvalue == 16) ? true : false);
            var strlen = this.passWord.length;
            if (strlen) {
                var uniCode = this.passWord.charCodeAt(this.passWord.length - 1);
                if (keyvalue >= 65 && keyvalue <= 90) {     //如果是字母键
                    if (((uniCode >= 65 && uniCode <= 90) && !shifKey) || ((uniCode >= 97 && uniCode <= 122) && shifKey)) {
                        document.querySelector('.DAXX').style.display = 'block'
                        return true;  //开启
                    } else {
                        document.querySelector('.DAXX').style.display = 'none'
                        return false;  //未开启
                    }
                }
            }
        },

        //配置logo和标题文字接口
        initTextLogo() {
            this.$axios({
                method: 'post',
                url: `/api/Main/Main_GetProjectInfo`,
            }).then(res => {
                if (res.data.data.HasConfig == 1) {
                    document.querySelector('.sycLogo1Img').src = `/images/${res.data.data.Config.LoginLeftLogo}`
                    document.querySelector('.sycLogo2Img').src = `/images/${res.data.data.Config.LoginRightLogo}`
                }
            }).catch(err => {
                console.log('err', err);
            });
        },
        getLang() {    // 获取语言
            var $this = this
            this.$axios({
                method: 'post',
                url: `/api/main/Main_GetStaticMultiLanguage`,
            }).then(res => {
                if (res.data.code === 0) {
                    let currentLang = localStorage.getItem('currentLang')
                    let lang = currentLang ? currentLang : 'Main_Language_ZH'
                    this.setlang(res.data.data[lang])
                    localStorage.setItem('languages', JSON.stringify(res.data.data))
                    localStorage.setItem('currentLang', lang)
                    $this.$i18n.locale = lang
                }
            }).catch(err => {
                console.log('err', err);
            });
        },
        // 切换密码框密码是否显示
        showPassword() {
            switch (this.passwordState.passwordType) {
                case 'password':
                    this.passwordState.passwordType = 'text';
                    this.passwordState.icon = this.icon.pwdShow
                    break;
                case 'text':
                    this.passwordState.passwordType = 'password';
                    this.passwordState.icon = this.icon.pwdHide
                    break;
                default:
                    break;
            }
        },

        // 切换语言
        changeLang(value) {
            let langs = JSON.parse(localStorage.getItem('languages'))
            localStorage.setItem('currentLang', value)
            this.setlang(langs[value])
            this.$i18n.locale = value
            $('.errText').css('display', 'none')
        },

        getZoom() {
            var $this = this
            this.$nextTick(() => {
                let drops = [...document.querySelectorAll('.el-select-dropdown.el-popper')]
                drops.forEach(item => {
                    item.style.zoom = $this.a11
                })
            })
        },

        setlang(data) {
            var $this = this
            this.$nextTick(() => {
                $this.localData.Login_SystemName = data.Login_SystemName
                $this.localData.Login_UserName = data.Login_UserName
                $this.localData.Login_Password = data.Login_Password
                $this.localData.Login_Login = data.Login_Login
                $this.localData.Login_Back = data.Login_Back
                $this.localData.Login_CapitalLockHint = data.Login_CapitalLockHint
                $this.localData.Login_HintMessage_Empty = data.Login_HintMessage_Empty
                $this.localData.Login_HintMessage_Error = data.Login_HintMessage_Error
                $this.localData.Login_HintMessage_MessReStart = data.Login_HintMessage_MessReStart
                $this.localData.Login_HintMessage_Hint = data.Login_HintMessage_Hint
            })
        },
        getdropLang() {
            this.$axios({
                method: 'GET',
                url: `/api/main/Main_GetLanguageTypes`,
            }).then(res => {
                this.languages = res.data.data
                let langValue = localStorage.getItem('currentLang')  
                if(!langValue || !res.data.data.find(_=>_.value==langValue)){
                    localStorage.setItem('currentLang', this.languages[0].value )
                }
            })

            this.$axios({
                method: 'post',
                url: `/api/main/Main_GetCustomMultiLanguage`,
            }).then(res => {
                localStorage.setItem('customMultiLanguage', JSON.stringify(res.data.data))
            })
        },


        // 回车
        loginFun() {
            this.axiosLogin()
        },
        //点击登录
        loginClick() {
            this.axiosLogin()
        },
        //请求登录
        axiosLogin() {
            var username = this.userName
            var password = this.passWord
            this.$axios({
                method: "post",
                url: "/api/Login/Login_GstLoginIsSuccess?argUserAccount=" + username + '&argPassword=' + password,
                argUserAccount: username,
                argPassword: password,
            }).then((res) => {
                var user
                if (res.data.data.LoginIsSuccess) {
                    user = {
                        SCMSUserAccount: res.data.data.SCMSUserAccount,
                        SCMSUserID: res.data.data.SCMSUserID,
                        SCMSUserName: res.data.data.SCMSUserName,
                    }
                    var userid = this.$moment().valueOf()

                    // 清除滑块功能的缓存
                    sessionStorage.setItem('userInfo1', JSON.stringify(user));
                    localStorage.setItem('isUser', userid)

                    Object.keys(window.sessionStorage).forEach(item => {
                        if (item.includes('LineChart')) {
                            sessionStorage.removeItem(item)
                        }
                    })
                    this.$store.state.userId = userid
                    this.$router.push('/onePath')
                    //登录记录
                    this.$axios({
                        method: "post",
                        url: "/api/Login/Login_UserLogInOutRecord?UserName=" + res.data.data.SCMSUserName + '&Type=Main_Record_WebLogin',
                        UserName: res.data.data.SCMSUserName,
                        argPassword: '网页登录',
                    }).then((res) => {
                        console.log('sss', res.data.data)
                    })
                } else {
                    user = null
                    sessionStorage.setItem('userInfo', JSON.stringify(user));
                    if (username == '' || password == '') {
                        $('.errText').css('display', 'block')
                        this.errText = this.localData.Login_HintMessage_Empty
                    } else {
                        $('.errText').css('display', 'block')
                        this.errText = this.localData.Login_HintMessage_Error
                    }
                }
            }).catch(function (error) {
                console.log('ss', error);
            })
        },
        //返回上一级
        returnc() {
            this.$router.go(-1);
        },
        login() {
            this.$api.scms.login({})
        },
        init() {
            this.getdropLang();
            this.langValue = localStorage.getItem('currentLang') ? localStorage.getItem('currentLang') : 'Main_Language_ZH'
            this.lang = localStorage.getItem('languages') ? JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')] : 'Main_Language_ZH'
            this.$nextTick(() => {
                this.getLang()
            })
            this.initTextLogo()

            this.a11 = Number(parseFloat(window.screen.width / 1920).toFixed(2));
            if (this.a11 < 1) this.a11 = 0.8;

            this.bl = {
                undefined: 1,
                null: 1,
                one: 1,
                two: 2,
                three: 3,
                four: 4,
            }[JSON.parse(sessionStorage.getItem('screen'))]
            this.passwordState.icon = this.icon.pwdHide
        }
    },
    mounted() {
        this.init();
    },
}
</script>

<style lang="scss">
.login {
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .el-popper[x-placement^=bottom] {
        width: 110px;
    }

    .el-dropdown-menu__item {
        width: 110px;
    }

    .login-lang .el-input__inner {
        border: none !important;
        background: transparent !important;
        border-bottom: 1px solid #ACBAD2 !important;
        border-radius: 0;
    }
}
</style>
<style lang="scss" scoped>
.login {
    position: relative;
    background: url('../assets/images/BigBackground.png');

    .DAXX {
        border-radius: 4px;
        color: rgba(46, 46, 46);
        font-size: 14px;
        text-align: center;
        line-height: 30px;
    }

    .sycLogo1 {
        width: 170px;
        height: 53px;
        position: absolute;
        top: 110px;
        left: 85px;

        .sycLogo1Box {
            width: 100%;
            height: 100%;
            position: relative;

            .sycLogo1Img {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                object-fit: contain;
                max-height: 100%;
                max-width: 100%;
                margin: auto;
            }
        }
    }

    .sycLogo2 {
        width: 170px;
        height: 53px;
        position: absolute;
        top: 110px;
        right: 85px;

        .sycLogo2Box {
            width: 100%;
            height: 100%;
            position: relative;

            .sycLogo2Img {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                object-fit: contain;
                max-height: 100%;
                max-width: 100%;
                margin: auto;
            }
        }
    }

    .login_box {
        position: absolute;
        width: 600px;
        height: 300px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;

        .login_top {
            width: 100%;
            height: 50px;
            color: #06459A;
            font-weight: bold;
            font-size: 16px;
            position: relative;

            .text {
                display: inline-block;
                position: absolute;
                top: 5px;
                left: 15px;
            }

            .bol {
                display: inline-block;
                width: 3px;
                height: 22px;
                background: #06459A;
                position: absolute;
                top: 5px;
                left: 5px;
            }
        }

        .login_middleTop {
            width: 100%;
            height: 50px;
            background: -webkit-linear-gradient(to right, #213193, #2958A8);
            background: linear-gradient(to right, #213193, #2958A8);
        }

        .login_middle {
            width: 100%;
            height: 70%;
            background: -webkit-linear-gradient(to right, #213193, #2958A8);
            background: linear-gradient(to right, #213193, #2958A8);

            .middle_left {
                float: left;
                position: relative;
                width: 80%;
                height: 100%;
                border-right: 1px solid #688AC3;

                .middle_conter {
                    width: 80%;
                    height: 70%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    margin: 0 auto;

                    input::-webkit-input-placeholder {
                        color: #626EB3;
                    }

                    .middle_usrename:hover .el-icon-user {
                        color: #fff;
                    }

                    .middle_usrename:hover {
                        border-color: #7B8CC3;
                    }

                    .middle_password:hover {
                        border-color: #7B8CC3;
                    }

                    .middle_password:hover .el-icon-lock {
                        color: #fff;
                    }

                    .middle_usrename {
                        width: 100%;
                        height: 46%;
                        border-bottom: 1px solid #626EB3;
                        position: relative;

                        .el-icon-user {
                            font-size: 35px;
                            position: absolute;
                            top: 10px;
                            left: 0;
                            color: #626EB3;
                        }

                        .user {
                            position: absolute;
                            top: 5px;
                            left: 30px;
                            width: 70%;
                            height: 40px;
                            border: none;
                            outline: none;
                            margin-left: 20px;
                            color: #fff;
                            background: none;
                            font-size: 24px;
                        }
                    }

                    .middle_password {
                        width: 100%;
                        height: 46%;
                        border-bottom: 1px solid #626EB3;
                        position: relative;

                        .el-icon-lock {
                            position: absolute;
                            top: 15px;
                            left: 0;
                            font-size: 35px;
                            color: #626EB3;
                        }

                        .pad {
                            position: absolute;
                            left: 30px;
                            top: 15px;
                            width: 70%;
                            height: 40px;
                            border: none;
                            outline: none;
                            margin-left: 20px;
                            color: #fff;
                            background: none;
                            font-size: 24px;
                        }

                        .password-eye-icon {
                            position: absolute;
                            width: 28px;
                            margin-top: -12px;
                            right: 24px;
                            top: 50%;
                        }
                    }
                }
            }

            .middle_right {
                float: left;
                width: 19%;
                height: 100%;
                position: relative;

                .middle_line {
                    position: absolute;
                    background: #476DB3;
                    width: 70%;
                    height: 2px;
                    top: 85px;
                    left: 25px;
                }

                .right_retrun:hover {
                    color: #fff;
                    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
                    background: #2151A1;
                }

                .right_retrun:hover .el-icon-close {
                    color: #fff;
                }

                .right_login:hover {
                    color: #fff;
                    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
                    background: #2151A1;
                }

                .right_login:hover .el-icon-arrow-right {
                    color: #fff;
                }

                .right_login {
                    width: 70%;
                    height: 32%;
                    margin-left: 20px;
                    text-align: center;
                    margin-bottom: 30px;
                    color: #688AC3;
                    cursor: pointer;

                    .el-icon-arrow-right {
                        font-size: 45px;
                        color: #688AC3;
                    }
                }

                .right_retrun {
                    margin-top: 10px;
                    width: 70%;
                    height: 32%;
                    cursor: pointer;
                    margin-left: 20px;
                    text-align: center;
                    color: #688AC3;

                    .el-icon-close {
                        font-size: 45px;
                        color: #688AC3;
                    }
                }
            }
        }

        .login_fool {
            margin-top: 20px;

            .lange {
                position: relative;
                width: 110px;
                height: 30px;
                border-bottom: 1px solid #B1BFD7;
            }

            .down {
                position: absolute;
                top: 6px;
                right: 10px;
                margin-left: 70px;
            }
        }
    }

    .lang {
        margin-top: 30px
    }
}</style>