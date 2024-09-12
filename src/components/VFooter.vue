<!--
 * @description: 页尾组件
 * @since: 2019-11-07 21:49:50
 * @Author: jawnwa22
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-26 14:13:37
 -->
<template>
    <footer class="v-footer">
        <span class="timetext">{{newtime}}</span>
    </footer>
</template>

<script>
export default {
    data(){
        return{
          newtime:'',
          timefoor:''
        }
    },
    created(){
         //实时刷新时间
          this.timefoor = window.setInterval(() => {
                this.getDate()
          },1000)
    },
    destroyed(){
      clearInterval(this.timefoor);
    },
    mounted(){
     if(window.screen.width>1920){
      $('.v-footer').css({
          zoom:Number(parseFloat(window.screen.width/1920).toFixed(2))
      })
     }else{
     $('.v-footer').css({
         zoom:1
     })
     }
    },
    methods:{
            getDate(){
                var myDate = new Date();
                    //获取当前年
                var year = myDate.getFullYear();
                //获取当前月
                var month = myDate.getMonth() + 1;
                var mothe = month > 9 ? month : '0' + month
                    //获取当前日
                    var date = myDate.getDate();
                    var da = date >9 ? date : '0' + date
                    var h = myDate.getHours(); //获取当前小时数(0-23)
                    var he = h > 9 ? h : '0' + h
                    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
                    var me = m > 9 ? m : '0' + m
                    var s = myDate.getSeconds();
                    var se = s > 9 ? s : '0' + s
                // "2019-07-15 10:00:00"
                //获取当前时间
                var now = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' +se
                this.newtime = now
               
            },
    }
}
</script>
<style lang="scss" scoped>
.v-footer {
    // display: none;
     display: block;
    height: 30px;
    width: 100%;
    line-height: 30px;
    background-color: #333333;
    position: fixed;
    bottom: 0;
    z-index: 20001;
    .timetext{
        color:#fff;
        font-size:20px;
        float:right;
        margin-right:20px; 
    }
}
</style>