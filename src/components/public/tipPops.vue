<template>
    <div class="tipsPop">
        <div v-drager class="myDialog">
            <div class="popHeader">
                提示
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>
            <div class="popContent">
                {{ tipText }}
            </div>
            <div v-if="noCancel" class="popBtn">
                <div class="myBtn1" @click="handleClick('no')">确认</div>
            </div>
            <div class="popBtn" v-else>
                <div class="myBtn1 myBtn2" @click="handleClick('no')">否</div>
                <div class="myBtn1" @click="handleClick('yes')">是</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['tipText', 'noCancel'],
    data() {
        return {
            no: require('@/assets/images/no.png'),
        };
    },
    methods: {
        handleClick(str) {
            this.$emit('tipCallBack', str);
        },
    },directives: {
            drag: function(el) {
                let dragBox = el; //获取当前元素
                dragBox.onmousedown = e => {
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
    background: rgba(0, 0, 0, 0.3);

    .myDialog {
        position: relative;
        width: 381px;
        height: fit-content;
        min-height: 200px;
        top: 40%;
        transform: translateY(-50%);
        margin: auto;
        // background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);
        background: #c4e0ff;
        border-radius: 8px;

        .popHeader {
            width: 100%;
            height: 36px;
            background: rgba(56, 109, 240);
            line-height: 36px;
            text-align: center;
            color: #ffffff;
            font-size: 18px;
            position: relative;
            border-radius: 8px 8px 0px 0px;
            img {
                width: 18px;
                height: 18px;
                position: absolute;
                top: 9px;
                right: 20px;
                cursor: pointer;
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
            color: #333333;
            text-align: center;
            font-size: 18px;
        }

        .popBtn {
            display: flex;
            justify-content: center;
            height: 70px;
            font-size: 16px;

            .myBtn1 {
                width: 100px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #386df0;
                color: #ffffff;
                font-size: 18px;
                cursor: pointer;
                border-radius: 4px;
            }

            .myBtn1:active {
                opacity: 0.8;
            }

            .myBtn2 {
                background: #84a4dc;
                color: #375486;
                margin-right: 40px;
            }
        }
    }
}
</style>