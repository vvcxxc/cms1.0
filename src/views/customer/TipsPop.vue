<!--
 * @Description: 这权限失败提示弹窗（组件）
 * @Date: 2020-08-10 17:20:29
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-02-22 14:00:52
-->
<template>
    <div v-if="true" class="deletePop" :class="{blackBlueBg: $store.state.color === 'blackBlue'}">
        <div class="title">
            <span class="title_i el-icon-warning"></span>
            <span class="text">{{lang.HT_MessageBoxCaption_Tips}}</span>
        </div>

        <div class="delete_text">
          <div class="delete_span">{{text}}</div>
        </div>

        <div v-if="deleteShow" class="delete_btn">
            <div @click="deleteBtn('1')" class="no">{{lang.MessageBox_NO}}</div>
            <div @click="deleteBtn('2')" class="yes">{{lang.MessageBox_YES}}</div>
        </div>

          <div v-if="!deleteShow" class="delete_btn">
            <div @click="deleteBtn('1')" class="deleteConfig">{{lang.MessageBox_Confrim}}</div>
        </div>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            deleteShow:false,
            text:'执行下发任务失败',
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    props:["popText"],
    created(){
        this.text = this.popText
    },
    methods:{
         deleteBtn(text){
             if(text == '1'){
                 this.$parent.clonePopFun()
             }
         }
    }

}
</script>
<style lang="scss" scoped>
.deletePop{
        position: fixed;
        left:0;
        right:0;
        bottom:0;
        top:0;
        margin: auto;
        width:385px;
        height:205px;
        background: #fff;
        border:1px solid #eee;
         box-shadow:-7px 7px 50px 0px rgba(51,51,51,0.5);
        z-index: 1000;

        &.blackBlueBg{
            background: #2A3E76;
            border-color: transparent;
            color: #fff;
        }

        .title{
            width:100%;
            height:40px;
            background: #FFBC3D;
            text-align: center;
            line-height: 40px;
            color:#fff;
            .title_i{
                color: #fff;
                margin-right:5px;
            }
        }
        .delete_text{
            width:80%;
            height:120px;
            margin-left:10%;
            .delete_span{
                width:100%;
                height:100%;
                display:flex;
                justify-content:center;
                align-items:center;
            }
        }
        .delete_btn{
            width:100%;
            height:45px;
            .no{
                float: left;
                width:160px;
                height:30px;
                background: #E0E0E0;
                color:#737373;
                text-align: center;
                 line-height: 30px;
                 margin-left:33px;
                 margin-right:5px;
                 cursor: pointer;
            }
            .yes{
                float: left;
                 width:160px;
                height:30px;
                background: #F3E3AD;
                color:#EBA241;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
            }
            .deleteConfig{
                width:315px;
                height:30px;
                background: #F3E3AD;
                color:#EBA241;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
                margin-left:35px;
            }
        }
    }
</style>