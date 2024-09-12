<template>
  <div>
    <div class="tip" v-show="tipchange" ref="tip" :style="{left, top}">
      <div class="tiphead" @mousedown="moveDown"></div>
      <div class="tiptop">
        <img :src="gth" alt />
        <span>{{lang.HT_MessageBoxCaption_Tips}}</span>
      </div>
      <div class="tipcontain">
        <div class="tipword">{{tipword}}</div>
        <div v-if="showBtnGroup" class="btn-group">
            <button class="cancel" @click="cancel">否(NO)</button>
            <button class="tipdetermine" @click="confirm">是(YES)</button>
        </div>
        <div class="tipdetermine" @click="confirm" v-else>{{lang.MessageBox_Confrim}}</div>
      </div>
    </div>
    <div class="cover2" v-if="tipchange"></div>
  </div>
</template>
<script>
export default {
  props: {
    tipchange: {
      type: Boolean,
      default(){
        return false
      }
    },
    tipword: {
      type: String,
      default: ''
    },
    showBtnGroup: {
        type: Boolean,
        default: false
    }
  },
  data(){
    return {
      left: 0,
      top: 0,
      isDown: false,
      dx: 0,
      dy: 0,
      tl: 0,
      tt: 0,
      gth: require('../../assets/images/gth.png'),
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    }
  },
  watch: {
    tipchange: function(val){
      this.$nextTick(()=>{
        let left = this.$refs.tip.clientWidth / 2 +'px'
        let top = this.$refs.tip.clientHeight / 2 +'px'
        this.left = `calc(50% - ${left})`;
        this.top = `calc(50% - ${top})`;
      })
    }
  },
  methods: {
    confirm(){
      this.$emit('confirm')
    },
    cancel(){
        this.$emit('cancel')
    },
    moveDown(){
        console.log("0----")
      this.isDown = true;
      this.dx = window.event.clientX;
      this.dy = window.event.clientY;
      //获取左部和顶部的偏移量
      this.tl = this.$refs.tip.offsetLeft;
      this.tt = this.$refs.tip.offsetTop;
    },
    move(e) {
      if(!this.isDown) return
                
      //设置样式
      $('body')[0].style.cursor = 'move';
      //获取x和y
      let nx = e.clientX;
      let ny = e.clientY;

      //计算移动后的左偏移量和顶部的偏移量
      this.left = nx - (this.dx - this.tl) + 'px';
      this.top = ny - (this.dy - this.tt) + 'px';
      $('body')[0].addEventListener('mouseup', (e) => {
        //开关关闭
        this.isDown = false;
        $('body')[0].style.cursor = 'default';
      });
    },
  },
  mounted(){
    $('body')[0].addEventListener('mousemove', (e)=>{
      this.move(e)
    })
  }
}
</script>
<style lang="scss" scoped>
.tip {
  position: fixed;
  width: 380px;
  min-height: 200px;
  height: 200px;
  z-index: 30999999;
  top: 350px;
  left: 750px;
  box-shadow: 0px 0px 8px black;
  background-color: #f3f3f4;
  user-select: none;

  .tiphead{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 40px;
  }
  .tiptop {
    width: 380px;
    height: 40px;
    background-color: #ffbc3d;
    img {
      width: 20px;
      height: 20px;
      margin-top: 10px;
      margin-left: 160px;
    }
    span {
      color: #ffffff;
      position: relative;
      top: -5px;
      margin-left: 7px;
    }
  }
  .tipcontain {
    height: calc(100% - 40px);
  }
  .tipword {
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    text-align: center;
  }
  .btn-group{
    margin-bottom: 18px;
    text-align: center;

    .tipdetermine{
        width: 154px;
        height: 30px;
        margin-bottom: 0;
        margin-left: 4px;
        border: 0;
    }

    .cancel{
        width: 154px;
        height: 30px;
        color: #666;
        background: #e0e0e0;
        border: 0;
        cursor: pointer;
    }
  }
  .tipdetermine {
    color: #ea9328;
    width: 310px;
    margin-bottom: 18px;
    cursor: pointer;
    line-height: 30px;
    text-align: center;
    margin-left: 35px;
    height: 30px;
    background-color: #f3e3ad;
  }
}
.cover2{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 9999;
}
</style>