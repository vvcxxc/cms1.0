<!--
 * @Description: 这是排班管理页面模块（组件）
 * @Date: 2020-11-27 10:07:43
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-01 14:37:36
-->
<template>
	<div class="scheduleMange_box float">
        <div class="scheduleMange_left left" ref="left">
            <div @click="pageClick('1',$event)" class="scheduleMange_left_box active">{{lang.ScheduleManage_Scheduling_Management}}</div>
            <div @click="pageClick('2',$event)" class="scheduleMange_left_box">{{lang.ScheduleManage_Team_Management}}</div>
        </div>
        <div class="scheduleMange_right left" ref="right" >
             <scheduling v-if="!scheduling"></scheduling>
             <team v-if="scheduling"></team>
        </div>
	</div>
</template>
<script>
import scheduling from './Scheduling'
import team from './Team'
export default {
    components:{
        scheduling,
        team
    },
	data() {
		return {
			scheduling:false,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            zoomValue: 0,
		};
	},
    created () {
        this.$nextTick(() => {
             this.zoomValue = Number(parseFloat(window.screen.width/1920).toFixed(2)) <= 0.8 ? 0.8 : Number(parseFloat(window.screen.width/1920).toFixed(2))
             this.$refs.left.style.zoom = this.zoomValue
             $('.scheduleMange_right').css({
                 height: $('.scheduleMange_right').height() * this.zoomValue
             })
              $('.scheduleMange_left').css({
                 height: $('.scheduleMange_right').height() * this.zoomValue
             })
        })  
    },
	methods: {
        pageClick(text,e){
            $('.scheduleMange_left_box').removeClass('active')
            $(e.path[0]).addClass('active')
            if(text == '1'){
               this.scheduling = false
            }else if(text == '2'){
                this.scheduling = true
            }
        }
    }
};
</script>
<style lang='scss' scoped>
.scheduleMange_box{
    position: relative;
    width:98%;
    height:calc(100vh - 100px);
    margin: auto;
    margin-top:100px;
    .left{
        float:left;
    }
   .float:after{
      content: "";
      display: block;
      height: 0;
      clear:both;
      visibility: hidden;
    }
    .float{
        zoom: 1;
    }
    .scheduleMange_left{
       width: 210px;
       height: 920px;
       background: #E9EEEF;
       border: 1px solid #E9EEEF;
       .scheduleMange_left_box{
           width:210px;
           height:50px;
           background: #E9EEEE;
           border: 1px solid #E4E4E4;
           border-top:none;
           border-left:none;
           font-size: 18px;
           font-family: Source Han Sans CN;
           font-weight: 400;
           color: #666666;
           padding-left:30px;
           line-height: 50px;
           cursor: pointer;
           user-select: none;
           position: relative;
       }
       .active{
            background: #fff;
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #4270E4;
       }
       .active::before{
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width:5px;
              height: 100%;
              background: #4270E4;

        }
    }
    .scheduleMange_right{
        width:calc(100% - 210px);
        height: 920px;
    }
}
</style>
