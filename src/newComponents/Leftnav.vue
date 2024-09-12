<!--
 * @Description: 左侧导航栏
 * @Date: 2019-11-23 11:50:53
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-12-01 19:01:37
 -->
<template>
    <div class="left-container" :class="{ colordiv: $store.state.color == 'grey' }">
        <div @click="activeNav(item, index)" class="nav" v-for="(item, index) in navList" :key="index"
            :class="{ isActive: activeIndex == index }">
            <!-- {{ item.name }} -->
            <span >{{ item.name }}</span>
            <div class="right" v-show="item.showRight" >{{item.rightText}}</div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        navList: {//导航标题列表
            type: Array,
            default: () => {
                return []
            }
        },
        defaultIndex: {
            type: Number,
            default: 0
        }
    },
    watch: {
        defaultIndex(n, o) {
            // console.log(n)
            this.activeIndex = n

        }
    },
    data() {
        return {
            activeIndex: 0,
            // navList: [],
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        };
    },

    methods: {
        activeNav(item, index) {
            this.activeIndex = index
            this.$emit('activeNavItem', item, index)
            // console.log('hahahah')
        }

    },
    mounted() {
        // this.activeIndex = this.defaultIndex
    }
};
</script>
<style lang="scss" scoped>
.left-container {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    // text-align: center;
    background: rgba(233, 238, 239, 0.39);
    border: 1px solid #E4E4E4;

    .nav {
        cursor: pointer;
        padding-left: 20px;
        background: rgba(244, 247, 247, 0.39);
        line-height: 50px;
        height: 50px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #666666;
        overflow:hidden;
        .right{
            float:right;
            padding-right:10px

        }
    }

    .isActive {
        border-left: 5px solid #4270E4;
        color: #4270E4;
        font-weight: bold;
        background: #fff
    }

}

.colordiv {
    background-color: #d9dbde !important;
}
</style>
