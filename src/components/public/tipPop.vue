<template>
    <div class="tipsPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader" v-drag>
                <img :src="gth" alt="" />
                <span>提示</span>
            </div>
            <div class="popContent">
                {{ tipText }}
            </div>
            <div v-if="noCancel" class="popBtn">
                <div class="myBtn1" @click="handleClick('no')">确认</div>
            </div>
            <div class="popBtn" v-else>
                <div class="myBtn1 myBtn2" @click="handleClick('no')">
                    否(NO)
                </div>
                <div class="myBtn1" @click="handleClick('yes')">是(YES)</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['tipText', 'noCancel'],
    data() {
        return {
            gth: require('../../assets/images/gth.png'),
        };
    },
    methods: {
        handleClick(str) {
            this.$emit('tipCallBack', str);
        },
    },
    directives: {
        drag: function (el) {
            let dragBox = document.getElementById('myDialog'); //获取当前元素
            el.onmousedown = e => {
                //算出鼠标相对元素的位置
                let disX = e.clientX - dragBox.offsetLeft;
                let disY = e.clientY - dragBox.offsetTop;
                document.onmousemove = e => {
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    //移动当前元素
                    dragBox.style.left = left + "px";
                    dragBox.style.top = top + "px";
                };
                document.onmouseup = e => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    },
};
</script>

<style lang="scss" scoped>
.tipsPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;

    .myDialog {
        position: relative;
        width: 381px;
        height: fit-content;
        min-height: 200px;
        top: 40%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 381px;
            height: 40px;
            background: rgba(255, 188, 61, 1);

            img {
                width: 20px;
                height: 20px;
                margin-top: 10px;
                margin-left: 160px;
            }

            span {
                color: #ffffff;
                position: relative;
                top: -4px;
                margin-left: 7px;
            }
        }

        .popContent {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: fit-content;
            min-height: 110px;
            padding: 30px;
            word-break: break-word;
            color: #666666;
            text-align: center;
        }

        .popBtn {
            display: flex;
            justify-content: center;
            height: 50px;
            font-size: 16px;

            .myBtn1 {
                width: 154px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: #f3e3ad;
                color: #e98c1c;
                cursor: pointer;
            }

            .myBtn2 {
                background: #e0e0e0;
                color: #666666;
                margin-right: 10px;
            }
        }
    }
}
</style>