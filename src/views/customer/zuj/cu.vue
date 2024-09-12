<!--
 * @Description: 这是***页面（组件）
 * @Date: 2020-01-09 16:12:44
 * @Author: Tao
 * @LastEditors  : Tao
 * @LastEditTime : 2020-01-09 16:22:35
 -->
<template>
    <div>
        <div @click="cc()" style="margin:10px">子组件</div>
        <div  v-if="show">
            <div>111</div>
            <father></father>
        </div>
    </div>
</template>
<script>
import father from '../cuAll'
export default {
     name:'cuA',
  components: {
    father
  },
  data(){
      return{
          show:false
      }
  },
  methods:{
      cc(){
          this.show = !this.show
      }
  }
}
</script>
<style scoped>

</style>