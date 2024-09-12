<!--
 * @Description: 报警管理
 * @Date: 2019-11-23 11:54:01
 * @Author: 随风
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-27 14:53:55
 -->
<template>
    <div class="alarm-container" >
        <aside class="left-container" ref="left" :class="{colordiv:$store.state.color=='grey'}" @click="yc">
         <left-nav @tabComponent="tabComponent" @tabledata="tabledata" :class="{colordiv:$store.state.color=='grey'}"></left-nav>
        </aside>
        <section class="content-container" ref="content" @click="yc">
                 <component :is="componentName" :table="table" :d="d" ref="c"></component>
        
        </section>
    </div>
</template>

<script>
import LeftNav from '../../components/leftNav/LeftNav1.vue';
import Agency from '../../components/quality/Agency.vue';
import plan from '../../components/quality/plan.vue';
import Record from '../../components/quality/Record.vue';
export default {
    components: {
        LeftNav,
        Agency,
        plan,
        Record
    },
    data() {
        return {
            componentName: 'Agency',
            table: [],
            d: {},
            jurisdiction:[],
            buttonarr:[],
            glxzid:"",
            glxzshow:true,
            glxgid:'',
            glxgshow:true,
            glscid:'',
            glscshow:true,
            xzid:'',
            xzshow:true,
            xgid:'',
            xgshow:true,
            scid:'',
            scshow:true,
            cpkid:'',
            cpkshow:true,
            zoomValue: 1,
        };
    },
    watch:{
        VpowerData(val){
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
            this.buttonarr.forEach((item)=>{
         if(item.RightName =="检测项目管理-新增"){
          this.glxzid = item.RightID
         }else if(item.RightName == "检测项目管理-修改"){
          this.glxgid = item.RightID
         }else if(item.RightName == "检测项目管理-删除"){
          this.glscid = item.RightID
         }else if(item.RightName == "新增按钮"){
          this.xzid = item.RightID
         }else if(item.RightName == "修改按钮"){
          this.xgid = item.RightID
         }else if(item.RightName == "删除按钮"){
          this.scid = item.RightID
         }else if(item.RightName == "CPK分析"){
          this.cpkid = item.RightID
         }
     })
       var userid = ''
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserID;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserID;
            }
            this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glxzid}`,
              }).then(res => {
                  this.glxzshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glxgid}`,
              }).then(res => {
                  this.glxgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glscid}`,
              }).then(res => {
                  this.glscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`,
              }).then(res => {
                  this.xzshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
              }).then(res => {
                  this.xgid = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
              }).then(res => {
                  this.scshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cpkid}`,
              }).then(res => {
                  this.cpkshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
        }
    },
        computed:{
        VpowerData() {
                    return this.$store.state.btnPowerData;
        },
    },
    created() {
        this.$nextTick(() => {
            let value = 200 * this.zoomValue
            this.$refs.left.style.zoom =  this.zoomValue
            this.$refs.content.style.width =  `calc(100% - ${value}px)`
            let a = 100*this.zoomValue+'px';
            $('.alarm-container').css({
                marginTop:`${a}`
            })
        })
                 this.jurisdiction = this.$store.state.btnPowerData
     this.buttonarr = this.findPathByLeafId(this.GetUrlParam('id'),this.jurisdiction)[0].Children
        console.log("nut",this.buttonarr)
            this.buttonarr.forEach((item)=>{
         if(item.RightName =="检测项目管理-新增"){
          this.glxzid = item.RightID
         }else if(item.RightName == "检测项目管理-修改"){
          this.glxgid = item.RightID
         }else if(item.RightName == "检测项目管理-删除"){
          this.glscid = item.RightID
         }else if(item.RightName == "新增按钮"){
          this.xzid = item.RightID
         }else if(item.RightName == "修改按钮"){
          this.xgid = item.RightID
         }else if(item.RightName == "删除按钮"){
          this.scid = item.RightID
         }else if(item.RightName == "CPK分析"){
          this.cpkid = item.RightID
         }
     })
       var userid = ''
      if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(
                    sessionStorage.getItem('sightseerInfo1')
                ).SCMSUserID;
            } else {
                userid = JSON.parse(
                    sessionStorage.getItem('userInfo1')
                ).SCMSUserID;
            }
            this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glxzid}`,
              }).then(res => {
                  this.glxzshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glxgid}`,
              }).then(res => {
                  this.glxgshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.glscid}`,
              }).then(res => {
                  this.glscshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xzid}`,
              }).then(res => {
                  this.xzshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.xgid}`,
              }).then(res => {
                  this.xgid = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.scid}`,
              }).then(res => {
                  this.scshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
               this.$axios({
                  method: 'post',
                  url: `/api/UserManage/UserManage_CheckAuthority?argUserID=${userid}&argRightID=${this.cpkid}`,
              }).then(res => {
                  this.cpkshow = res.data.data
              
              }).catch((err)=>{
                  console.log('err',err)
              })
    },
    methods: {
          yc(){
          
       this.treeleft = false;
       this.$store.state.treeleft = false;
        },
          findPathByLeafId(id,node,path){
        if(!path){
             path = []
         }
        for(let i=0;i<node.length;i++){
          var temPath = path.concat();
        
          if(id == node[i].RightID){
                temPath.push(node[i])
           return temPath
          }
          if(node[i].Children){
           var findResult = this.findPathByLeafId(id,node[i].Children,temPath)
           if(findResult){
           return findResult
           }
          }
        }
        },
          GetUrlParam(paraName) {
        let url = document.location.toString();
        let arrObj = url.split("?");
        if (arrObj.length > 1) {
            let arrPara = arrObj[1].split("&");
            let arr;
           for(let i=0;i<arrPara.length;i++){
            arr = arrPara[i].split("=");
            if(arr&&arr[0] == paraName){
              
               return arr[1]
            }
           }
           return ''
        }else {
            return ''
        }
          },
        tabledata(a, b) {
            this.table = a;
            this.d = b;
            this.$nextTick(function() {
                this.$refs.c.getonedata1();
            });
        },
        tabComponent(index) {
            let componentObj = {
                0: Agency,
                1: plan,
                2: Record
            };
            this.componentName = componentObj[index];
        }
    }
};
</script>

<style lang='scss' scoped>
.alarm-container {
    // width: 100%;
    // height: 100%;
    // flex: 1;
    height: calc(100% - 130px);
    overflow: hidden;
    color: #000;
    margin-top: 100px;
    display: flex;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
}
aside {
    // width: 20%;
    width: 200px;
    height: 100%;
    background-color: #e9eeef;
    box-sizing: border-box;
    overflow: auto;
    // border: 1px solid #e4e4e4;
}
.content-container {
    flex: 1;
    // width: 80%;
    background-color: #fff;
    border: 1px solid #e4e4e4;
    border-left: none;
}
.fcolor {
    color: #000 !important;
    // position: absolute;
    // top: 0;
    // left: 0;
    // margin: auto;
    // width: 100%;
    // display: inline-block;
}
.colordiv {
    background-color: #d9dbde !important;
}
.colortip {
    background-color: #efeff0 !important;
}
</style>
