<template>
<div>
    <div class="keypress-cover" v-if="showkey"></div>
    <div class="keypress" v-if="showkey">
          <div class="keypresshead" @mousedown="movekey">
              数字键盘
              <div class="keyimg" @click="closeshow">
                  <img :src='img1' alt="">
              </div>
          </div>
          <div class="keybody">
              <div class="keyinputdiv"></div>
                 <input type="text" class="keyinput"  v-model="value"   @keydown="inputpree($event)" @blur="inputpree($event)"/>
           <ul>
               <li @click="inputnum('7')">7</li>
               <li @click="inputnum('8')">8</li>
               <li @click="inputnum('9')">9</li>
               <li class="likeyimg" @click="splitnum()"><img :src="img3" alt=""></li>
               <li @click="inputnum('4')">4</li>
               <li @click="inputnum('5')">5</li>
               <li @click="inputnum('6')">6</li>
               <li class="likeyimg" @click="allsplit()"><img :src="img2" alt=""></li>
               <li @click="inputnum('1')">1</li>
               <li @click="inputnum('2')">2</li>
               <li @click="inputnum('3')">3</li>
               <li class="likeyimg1" @click="inputnum('-')"> <img :src="img4" alt=""></li>
               <li @click="inputnum('0')">0</li>
               <li @click="inputnum('.')">·</li>
               <li class="keyenter" @click="endnum">Enter</li>
           </ul>
          </div>
    </div>
    </div>
</template>
<script>
export default {
    props:['showkey','keytext','keyclass'],
    data(){
        return{
        value:'',
        intonum:1,
        firstpree:0,
        img1:require("../../../assets/images/jp1.png"),
        img2:require("../../../assets/images/jp2.png"),
        img3:require("../../../assets/images/jp3.png"),
        img4:require("../../../assets/images/jp4.png"),
        }
    },
    watch:{
      showkey(val){
         if(val){
             setTimeout(()=>{
$('.keyinput').select()
       
             })
                setTimeout(()=>{
 this.intonum = 1;
         this.firstpree = 0
                },400)
        this.value = this.keytext
         }else{
             this.firstpree = 1
            
         }
      }
    },
    methods:{
        inputinto(){
        
        },
        closeshow(){
          this.$emit('closeshow')
        },
        movekey(){
            var x = 0;
            var y = 0;
            var l = 0;
            var t = 0;
            var isDown = false;
            x = window.event.clientX;
            y = window.event.clientY;
				
					//获取左部和顶部的偏移量
					l = $('.keypress')[0].offsetLeft;
					t = $('.keypress')[0].offsetTop;
					//开关打开
					isDown = true;
					var pdmove = false
					
					//设置样式  
					// $('body')[0].style.cursor = 'move';
					$('body')[0].addEventListener("mousemove", function (e) {
							// $('body')[0].style.cursor = 'move';
						pdmove = true
						if (isDown == false) {
							return;
						}
						//获取x和y
						var nx =window.event.clientX;
						var ny = window.event.clientY;
						//计算移动后的左偏移量和顶部的偏移量
						var nl = nx - (x - l);
						var nt = ny - (y - t);
						$('.keypress')[0].style.left = nl + 'px';
						$('.keypress')[0].style.top = nt + 'px';
						
						
					})
					$('body')[0].addEventListener("mouseup", function (e) {
				//开关关闭
				isDown = false;
				// $('body')[0].style.cursor = 'default';
					})
        },
        endnum(){
          this.$emit('closeshow')
          this.$emit('getnum',this.value,this.keyclass)
        },
        inputpree(e){
            console.log(e.keyCode)
         if(e.keyCode>=37&&e.keyCode<=40){
             e.preventDefault()
         }
            if(this.firstpree == 1){
                
  this.intonum = 0
           this.value = this.value.replace(/[^\-?\d.]/g,'')
            }
              setTimeout(()=>{
    this.firstpree = 1  
              },300)
            
 var value = JSON.parse(JSON.stringify(this.value))
          this.value = ''
             $('.keyinput').val("").focus().val(value); 

           this.value = value
           
        },
        allsplit(){
        this.value = ''
        },
      inputnum(num){
        
         if(this.intonum == 1&&this.firstpree == 0){
          this.value = num
         }else{
           this.value = this.value+num
         }
         this.intonum = 0
      },
      splitnum(){
           console.log("sadsad333")
          if(this.intonum == 1){
              this.value = ''
          }else{
  if(this.value.length!==0){
             this.value =  this.value.substr(0,  this.value.length - 1);  
        }
          }
        this.intonum = 0
      }
    },
    mounted(){
        $('.keyinput').select()
        this.value = this.keytext
     
        this.intonum = 1;
    }
}
</script>
<style scoped lang="scss">
.keypress{
    width: 510px;
height: 500px;
background: #FFFFFF;
box-shadow: 0px 3px 14px 4px rgba(214, 214, 214, 0.53);
position: fixed;
border-radius: 5px;
z-index: 10000;
top: calc(50% - 250px);
left:calc(50% - 260px);
}
input{
    word-break: break-all;
    text-overflow:clip;
    width: 100%;
height: 50px;
background: #F9F9F9;
border: 2px solid #D7D7D7;
border-radius: 5px;
position: static !important;
text-align: right;
padding-right: 10px;
color: #333333;
font-size: 23px;
}
.keybody{
    padding: 10px 50px;
    width: 100%;
    height: 440px;
}
ul{
    width: 100%;
    padding: 10px 0;
    height: calc(100% - 40px);
}
ul li{
    color: #333333;
font-size: 20px;
 margin-left: 0;
    width: 85px;
height: 53px;
text-align: center;
line-height: 50px;
margin-top: 28px;
margin-right: 16px;
background: #E8E8E8;
border-radius: 3px;
  -moz-user-select:none; /* Firefox私有属性 */
    -webkit-user-select:none; /* WebKit内核私有属性 */
    -ms-user-select:none; /* IE私有属性(IE10及以后) */
    -khtml-user-select:none; /* KHTML内核私有属性 */
    -o-user-select:none; /* Opera私有属性 */
    user-select:none; /* CSS3属性 */
}
ul li:active{
   background: #FFA518;
border: 3px solid #FFD798;
color: #fff;
line-height: 44px;
}
.likeyimg:active{
       background: #FFA518;
border: 3px solid #FFD798;
color: #fff;
line-height: 44px;
}
.likeyimg1:active{
       background: #FFA518;
border: 3px solid #FFD798;
color: #fff;
line-height: 44px;
}
.likeyimg{
    width: 107px;
    background: #4891F3;
    margin-right: 0;
    position: relative;
    img{
        position: absolute;
        width: 40px;
        height: 40px;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
    }
}
.likeyimg1{
    background:#FE5C5C;
    width: 107px;
    margin-right: 0;
    position: relative;
    img{
        position: absolute;
        width: 40px;
        height: 40px;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
    }
}
.keypresshead{
 height: 60px;
   -moz-user-select:none; /* Firefox私有属性 */
    -webkit-user-select:none; /* WebKit内核私有属性 */
    -ms-user-select:none; /* IE私有属性(IE10及以后) */
    -khtml-user-select:none; /* KHTML内核私有属性 */
    -o-user-select:none; /* Opera私有属性 */
    user-select:none; /* CSS3属性 */
 line-height: 60px;
 text-align: center;
 font-size: 23px;
 color: #6C6C6C;
 position: relative;
 .keyimg{
     position:absolute;
     width: 25px;
     height: 25px;
     right: 20px;
     top: 18px;
     cursor: pointer;
     img{
         position: relative;
         top: -12px;
     }
 }
 .keyimg:hover{
  background: #BDE5FC;
 }
}
.keyenter{
    margin-right: 0;
    width: 208px;
}
.keypress-cover{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
}
.keyinputdiv{
    position: absolute;
    height: 50px;
    width: 410px;
}
</style>