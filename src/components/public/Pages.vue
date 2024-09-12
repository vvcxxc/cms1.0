<!--
 * @Description: 分页组件
 * @Date: 2019-11-24 14:57:49
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 15:55:08
 -->
<template>
    <section class="page-container" :style="{zoom:a}" >
        <div class="page">
  <div class="left" >
            {{localData.DataGrid_Reaction_HT_ATotalOf}}{{ pageData.TotalCount }}{{localData.DataGrid_Reaction_HT_RecordsAndTheCurrent}}{{ pageData.PageIndex }}{{localData.DataGrid_Reaction_Page}},
            {{localData.DataGrid_Reaction_HT_ATotalOf}}{{ pageData.TotalPage }}{{localData.DataGrid_Reaction_HT_RecordsAnd}}{{ pageData.PageSize }}{{localData.DataGrid_Reaction_HT_PerPage}}
        </div>
        <div class="right" :style="{height:30*a+'px'}">
            <span class="btn"  @click="jump('first')" >{{localData.DataGrid_Reaction_FirstPage}}</span>
            <span class="btn"  @click="jump('prev')"  :class="{nopage:!pageData.LastEnabled}" >{{localData.DataGrid_Reaction_LastPage}}</span>
            <span class="btn"  @click="jump('next')"  :class="{nopage:!pageData.NextEnabled}" >{{localData.DataGrid_Reaction_NextPage}}</span>
            <span class="btn"  @click="jump('last')">{{localData.DataGrid_Reaction_EndPage}}</span>
            <span> {{localData.DataGrid_Reaction_The}}</span>
            <div class="input" >
               
                <el-input class="pages" v-model="targetPage"></el-input>
            </div>
             <span class="mright"> {{localData.DataGrid_Reaction_Page}}</span>
            <span  class="btn" @click="jump('jump')">{{localData.DataGrid_Reaction_TurnPage}}</span>
        </div>
        </div>
      
    </section>
</template>

<script>
export default {
    props: ['pageData'],
    data() {
        return {
            a:1,
            targetPage: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            localData: {
                /* 分页 */
                DataGrid_Reaction_FirstPage: '',
                DataGrid_Reaction_LastPage: '',
                DataGrid_Reaction_NextPage: '',
                DataGrid_Reaction_EndPage: '',
                DataGrid_Reaction_The: '',
                DataGrid_Reaction_Page: '',
                DataGrid_Reaction_TurnPage: '',
                DataGrid_Reaction_HT_PEAPositiveInteger: '',
                DataGrid_Reaction_HT_PEThePageNumber: '',
                DataGrid_Reaction_HT_ATotalOf: '',
                DataGrid_Reaction_HT_RecordsAndTheCurrent: '',
                DataGrid_Reaction_HT_Page: '',
                DataGrid_Reaction_HT_RecordsAnd: '',
                DataGrid_Reaction_HT_PerPage: '' 
            }
        };
    },
    created() {
        this.getLocalData()
        this.targetPage = this.pageData.PageIndex;
    },
    mounted(){
    this.a = Number(parseFloat(window.screen.width/1920).toFixed(2))
    if( this.a<1){
         this.a = 0.8
    }
    //      $('.page-container').css({
    //       zoom:(a-0.09)
    //   })
    },
       isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
    methods: {
        getLocalData() {
            this.localData.DataGrid_Reaction_FirstPage = this.lang.DataGrid_Reaction_FirstPage
            this.localData.DataGrid_Reaction_LastPage = this.lang.DataGrid_Reaction_LastPage
            this.localData.DataGrid_Reaction_NextPage = this.lang.DataGrid_Reaction_NextPage
            this.localData.DataGrid_Reaction_EndPage = this.lang.DataGrid_Reaction_EndPage
            this.localData.DataGrid_Reaction_The = this.lang.DataGrid_Reaction_The
            this.localData.DataGrid_Reaction_Page = this.lang.DataGrid_Reaction_Page
            this.localData.DataGrid_Reaction_TurnPage = this.lang.DataGrid_Reaction_TurnPage
            this.localData.DataGrid_Reaction_HT_PEAPositiveInteger = this.lang.DataGrid_Reaction_HT_PEAPositiveInteger
            this.localData.DataGrid_Reaction_HT_PEThePageNumber = this.lang.DataGrid_Reaction_HT_PEThePageNumber
            this.localData.DataGrid_Reaction_HT_ATotalOf = this.lang.DataGrid_Reaction_HT_ATotalOf
            this.localData.DataGrid_Reaction_HT_RecordsAndTheCurrent = this.lang.DataGrid_Reaction_HT_RecordsAndTheCurrent
            this.localData.DataGrid_Reaction_HT_Page = this.lang.DataGrid_Reaction_HT_Page
            this.localData.DataGrid_Reaction_HT_RecordsAnd = this.lang.DataGrid_Reaction_HT_RecordsAnd
            this.localData.DataGrid_Reaction_HT_PerPage = this.lang.DataGrid_Reaction_HT_PerPage
        },
        jump(flag) {
            console.log('sssssssssssss');
            if (flag === 'first') {
                if (this.targetPage == 1) {
                    return;
                }
                this.targetPage = 1;
                this.$emit('req', this.targetPage, flag);
                return;
            }
            if (flag === 'last') {
                console.log(this.targetPage);
                if (this.targetPage == this.pageData.TotalPage) {
                    return;
                }
                this.targetPage = this.pageData.TotalPage;
                this.$emit('req', this.targetPage, flag);
                return;
            }
            if (flag === 'prev') {
                console.log(this.targetPage);
                if (this.targetPage <= 1) {
                    return;
                }
                if (this.pageData.PageIndex == 1) {
                    this.targetPage = this.pageData.PageIndex;
                } else {
                    this.targetPage = --this.pageData.PageIndex;
                }

                this.$emit('req', this.targetPage, flag);
                return;
            }
            if (flag === 'next') {
                console.log((this.targetPage <= 1))
                 if((this.targetPage < 1)||(this.targetPage >= this.pageData.TotalPage)){
                     return
                 }
                   if (this.pageData.PageIndex == this.pageData.TotalPage) {
                    this.targetPage = this.pageData.PageIndex;
                } else {
                    this.targetPage = ++this.pageData.PageIndex;
                }

             

                this.$emit('req', this.targetPage, flag);
                return;
            }
            // this.handlePage();
            // if (this.targetPage == this.pageData.PageIndex) {
            // 	return;
            // }
            this.$emit('req', this.targetPage, flag);
        },
        handlePage() {
            if (
                this.targetPage === '' ||
                !/^\d+$/.test(this.targetPage) ||
                this.targetPage == 0
            ) {
                this.targetPage = this.pageData.PageIndex;
                return;
            }
            if (this.targetPage > this.pageData.TotalPage) {
                if (this.pageData.TotalPage == 0) {
                    this.targetPage = 1;
                    return;
                }
                this.targetPage = this.pageData.TotalPage;
            }
        }
    }
};
</script>

<style lang='scss' scoped>
%flex {
    // display: flex;
    // align-items: center;
}
.page-container {
    height: 100%;
    @extend %flex;
    width: 100%;
    position: relative;
    // justify-content: space-between;
    color: #888;
    // box-sizing: border-box;
}
.left {
    // margin-left: 10px;
    // height: 30px;
    float: left;
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // margin: auto;
}
.right {
    float: right;
    //  position: absolute;
    // top: 0;
    // bottom: 0;
    // margin: auto;
    // height: 30px;
    // right: 0;
    @extend %flex;
    .input {
        @extend %flex;
        margin: 0 10px;
        margin-right: 0px;
    }
    input{
        display: inline-block;
    }
    .btn {
        @extend %flex;
        justify-content: center;
        // width: 80px;
        // height: 28px;
        background-color: #fff;
        border-radius: 4px;
        border: solid 2px #fda100;
        // line-height: 28px;
        // text-align: center;
        padding: 3px 8px;
        color: #fda100;
        margin-right: 10px;
        // display: inline-block;
        cursor: pointer;
        box-sizing: content-box;
    }
}
.mright{
    margin-right: 10px;
}
.input{
      display: inline-block;
}
.page{
      width: 100%;
    height: 60px;
    line-height: 60px;
    color: #ababab;
    padding-left: 10px;
    font-size: 14px;
    overflow: hidden;
}
 .nopage {
        border: 2px solid #fed286 !important;
        color: #fed286;
        // display: inline-block;
    }
</style>
