<!--
 * @description: 页面的主体
 * @since: 2019-11-07 20:37:48
 * @LastEditTime: 2021-01-18 14:41:25
 -->
  主体架构
<template>
    <div class="v-application" >
        <v-tool-bar class="v-tool-bar" ></v-tool-bar>
        <main class="v-content">
            <div class="v-content__wrap">
                <router-view></router-view>
            </div>
        </main>
        <v-footer></v-footer>
    </div>
</template>

<script>
import VToolBar from "@/components/VToolBar/VToolBar.vue";
import VFooter from "@/components/VFooter.vue";

export default {
    components: {
        VToolBar,
        VFooter
    },
    data() {
        return {
        bl:1,
        screenwidth:1920,
        screenheight:937
        }
    },
    methods:{
     changescreen(){
         let screen = JSON.parse(sessionStorage.getItem('screen'))
        if(!screen){
         this.bl = 1;
        }else if(screen == 'one'){
        this.bl = 1
        }else if(screen == 'two'){
        this.bl = 2
        }else if(screen == 'three'){
        this.bl = 3
        }else if(screen == 'four'){
        this.bl = 4
        }
     }
    },
    mounted(){
     this.changescreen()
    }
}
</script>

<style lang="scss" scoped>
.v-application {
    width:100%;
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    // min-height: 100vh;
    // transform: scale(0.5);
    // margin-left:-22%;
    .v-content {
        margin-bottom:29px;
        height: 100%;
        flex: 1 0 auto;
         overflow-y: auto;
        display: flex;
        .v-content__wrap {
            flex: 1 1 auto;
        }
    }
}
</style>