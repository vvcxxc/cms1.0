<!--
 * @Description: 这是参数报表导出弹窗页面（组件）!
 * @Date: 2020-10-13 09:42:24
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-10-13 13:55:11
-->
<template>
    <div class="exportTableBox">
        <div class="exportTable_head">
            <span class="title_i el-icon-warning"></span>
            <span class="text">导出格式选择</span>
            <div @click="exportClose()" class="export_img"></div>
        </div>
        <div class="exportTable_conter">
            <div @click="exportPngFun()" class="exportTable_box exportTable_png">
                <div class="exportTable_png_img"></div>
                <div class="exportTable_text">图片(.png)</div>
            </div>
            <div @click="exportXlsxFun()" class="exportTable_box exportTable_xlx">
                <div class="exportTable_xlx_img"></div>
                <div class="exportTable_text">表格(.xlsx)</div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){

    },
    methods:{
        //关闭弹窗
        exportClose(){
            this.$parent.exportClose()
        },
        //导出图片
        exportPngFun(){
            this.$parent.exportPngFun()
        },
        //导出xlsx
        exportXlsxFun(){
            this.$parent.exportXlsxFun()
        }
    }
}
</script>
<style lang="scss" scoped>
.exportTableBox{
    width:404px;
    height:220px;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    margin:150px auto;
    z-index: 1001;
    background: #fff;
    border:1px solid #eee;
    box-shadow:-7px 7px 50px 0px rgba(51,51,51,0.5);

     .exportTable_head{
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
             .export_img{
                width: 20px;
                height: 20px;
                background: url('../../../assets/images/no.png');
                background-size: cover;
                position: absolute;
                right: 7px;
                top: 10px;
                cursor: pointer;
            }
    }
    .exportTable_conter{
        width:100%;
        height: 180px;
        position: relative;

        .exportTable_box{
            width: 96px;
            height: 91px;        
            border: 1px solid #E5E5E5;
            border-radius: 3px;
            padding-top:18px;
            cursor: pointer;
        }
        .exportTable_png{
            position: absolute;
            top:44px;
            left:86px;
        }
        .exportTable_xlx{
            position: absolute;
            top:44px;
            left:222px;
        }
        .exportTable_png_img{
            width:32px;
            height: 36px;
            background: url('../../../assets/images/PNG.png');
            background-size: cover;
            margin-left:calc(50% - 16px)
        }
        .exportTable_xlx_img{
            width:32px;
            height: 36px;
            background: url('../../../assets/images/XLSX.png');
            background-size: cover;
            margin-left:calc(50% - 16px)
        }
        .exportTable_text{
            text-align: center;
            font-size: 12px;
            margin-top:12px;
        }
    }


   
}
</style>
