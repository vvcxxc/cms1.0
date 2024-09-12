<template>
    <el-button class="button-class" @click="btnClick">
        <slot></slot>
    </el-button>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
      btnClick(){
        this.$emit('btnClick')
      }
    }
}
</script>
<style lang="scss" scope>
.button-class {
    font-weight: bold;
    font-size: 16px ;
    min-width: 120px;
    height: 40px;
    box-sizing: border-box;

    // &:hover {
    //     background: rgba(0, 0, 0, 0);
    //     // border:0
    // }
}
</style>