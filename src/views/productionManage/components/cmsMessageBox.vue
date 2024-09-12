<template>
    <div class="sestion" ref="kongtiao1" :style="{ width }">
        <div
            class="sestionheader"
            :class="{ colordiv: $store.state.color == 'grey' }"
        >
            <div class="sestionheader1"></div>
            <span
                class="head"
                :class="{ fcolor: $store.state.color == 'grey' }"
                >{{ title }}</span
            >
            <img
                :src="no2"
                alt
                class="no"
                @click.stop="closeMessageBox"
                v-if="$store.state.color == 'grey'"
            />
            <img
                :src="no"
                alt
                class="no"
                @click.stop="closeMessageBox"
                v-else
            />
        </div>
        <div class="sestion-contain">
            <slot></slot>
        </div>
        <div class="sestion-footer">
            <button class="btn cancel" @click="closeMessageBox">
                {{ lang.PopupCommon_Cancel }}
            </button>
            <button class="btn Preservation" @click="confirm">
                {{ lang.PopupCommon_Sure }}
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '690px'
        }
    },
    data() {
        return {
            no: require('@/assets/images/no.png'),
            no2: require('@/assets/images/no2.png'),
            lang: JSON.parse(localStorage.getItem('languages'))[
                localStorage.getItem('currentLang')
            ]
        };
    },
    methods: {
        move(name, namehead) {
            let left = $(`.${name}`).width() / 2 + 'px';
            let top = $(`.${name}`).height() / 2 + 'px';
            $(`.${name}`)[0].style.left = `calc(50% - ${left})`;
            $(`.${name}`)[0].style.top = `calc(50% - ${top})`;
            $(`.${name}`)[0].addEventListener('mousedown', function(e) {
                if (e.target.className.toLocaleLowerCase() == namehead) {
                    $(`.${name}`).removeClass('center');
                    window.event.stopPropagation();
                    let x = 0;
                    let y = 0;
                    let l = 0;
                    let t = 0;
                    let isDown = false;
                    x = window.event.clientX;
                    y = window.event.clientY;
                    //获取左部和顶部的偏移量
                    l = $(`.${name}`)[0].offsetLeft;
                    t = $(`.${name}`)[0].offsetTop;
                    //开关打开
                    isDown = true;
                    //设置样式
                    $('body')[0].style.cursor = 'move';
                    $('body')[0].addEventListener('mousemove', function(e) {
                        if (isDown == false) {
                            return;
                        }
                        //获取x和y
                        let nx = window.event.clientX;
                        let ny = window.event.clientY;

                        //计算移动后的左偏移量和顶部的偏移量
                        let nl = nx - (x - l);
                        let nt = ny - (y - t);
                        $(`.${name}`)[0].style.left = nl + 'px';
                        $(`.${name}`)[0].style.top = nt + 'px';
                    });
                    $('body')[0].addEventListener('mouseup', function(e) {
                        //开关关闭
                        isDown = false;
                        $('body')[0].style.cursor = 'default';
                    });
                }
            });
        },
        closeMessageBox() {
            this.$emit('close');
        },
        confirm() {
            this.$emit('confirm');
        }
    },
    mounted() {
        this.move('sestion', 'sestionheader1');
    }
};
</script>
<style lang="scss" scoped>
.sestionheader1 {
    width: 100%;
    position: absolute;
    height: 50px;
}
.sestion {
    z-index: 10999999;
    box-shadow: 0px 0px 8px black;
    position: fixed;
    top: 50%;
    left: 50%;
    border: 1px solid #ccc;

    &::before {
        position: fixed;
        content: '';
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }

    .sestionheader {
        background-color: #386df0;
        height: 50px;
        color: #ffffff;
        font-weight: 600;
        text-align: center;
        line-height: 50px;
        width: 100%;
        position: relative;
        .head {
            color: #ffffff;
            font-weight: 600;
            font-size: 16px;
        }
        .no {
            position: absolute;
            top: 0;
            z-index: 50999999;
            bottom: 0;
            margin: auto;
            height: 25px;
            width: 25px;
            right: 10px;
        }
    }
    .sestion-contain {
        width: 100%;
        background-color: #eeeeee;
        padding: 35px 0;

        .online {
            display: flex;
            .online-item {
                flex: 1;
                display: flex;
                line-height: 36px;
                margin: 10px 0 10px 30px;
                color: #333;

                &:last-child {
                    margin-right: 30px;
                }

                .item-label {
                    display: inline-block;
                    width: 105px;
                    margin-right: 10px;
                    text-align: right;
                }
                .item-value {
                    flex: 1;
                    position: relative;

                    ::v-deep .el-input.is-disabled {
                        .el-input__inner {
                            color: #999;
                            background: rgba(244, 244, 244, 0.39);
                            border-color: #ddd;
                        }
                    }

                    ::v-deep input {
                        background: #fff;
                        border: 1px solid #e0e0e0;
                        border-radius: 1px;
                    }
                    .el-date-editor {
                        ::v-deep input {
                            padding-left: 15px;
                        }
                    }
                }
            }
        }
    }

    .sestion-footer {
        padding: 10px 32px 17px;
        text-align: right;
        background: #eee;

        .btn {
            width: 100px;
            height: 34px;
            margin-left: 10px;
            border: 0;
            color: #ffffff;
            border-radius: 3px;
            text-align: center;
            cursor: pointer;
        }

        .Preservation {
            background-color: #386df0;
        }
        .cancel {
            background-color: #999999;
        }
    }
}
</style>
