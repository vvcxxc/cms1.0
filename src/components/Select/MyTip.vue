<template>
    <div class="pops">
        <div style="position: relative; width: 100%; height: 100%">
            <div class="tip">
                <div
                    class="tiptop"
                    @mousedown="mouseDownHandleelse($event)"
                    @mouseup="mouseUpHandleelse($event)"
                >
                    <img :src="gth" alt />
                    <span>提示</span>
                </div>
                <div class="tipcontanin">
                    <div class="tipword">{{ tipword }}</div>
                    <div
                        class="tipdetermine"
                        @click="tipSure('no')"
                        v-if="deltrue"
                    >
                        确定
                    </div>
                    <div class="delclass" v-else>
                        <div class="one" @click="tipSure('no')">否（NO）</div>
                        <div class="two" @click="tipSure('yes')">是（Yes）</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['tipword', 'deltrue'],
    data() {
        return {
            gth: require('../../assets/images/gth.png'),
        };
    },
    methods: {
        mouseDownHandleelse(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseUpHandleelse(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        },
        tipSure(str) {
            this.$emit('tipSure', str);
        },
    },
};
</script>

<style lang="scss" scoped>
.pops {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 120 !important;
}
.tip {
    position: absolute;
    width: 380px;
    min-height: 200px;
    z-index: 130;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .tiptop {
        width: 380px;
        height: 40px;
        background-color: #ffbc3d;
        img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
            margin-left: 160px;
        }
        span {
            color: #ffffff;
            position: relative;
            top: -5px;
            margin-left: 7px;
        }
    }
    .tipword {
        width: 100%;
        padding: 30px;
        word-wrap: break-word;
        text-align: center;
        padding-bottom: 0;
    }
    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }
    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        margin-top: 40px;
        margin-left: 35px;
        margin-bottom: 35px;
        height: 30px;
        background-color: #f3e3ad;
    }
    .delclass {
        width: 330px;
        line-height: 30px;
        margin-top: 40px;
        margin-left: 25px;
        height: 30px;
        .one {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
            cursor: pointer;
            display: inline-block;
            height: 30px;
            margin-left: 10px;
            width: 160px;
            background-color: #f3e3ad;
            text-align: center;
            color: #eeb764;
        }
    }
}
</style>