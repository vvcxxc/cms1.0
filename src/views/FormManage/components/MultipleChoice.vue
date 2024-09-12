<!--
- 多项选择
-->
<template>
    <div class="individual-choice component-content" :class="last ? 'last-compoennt-content' : ''">
      <div class="component-title">
        {{formData.componentAttribute.title}}
        <span class="font-2" v-if="formData.componentAttribute && !formData.componentAttribute.required">({{lang.EquipmentAccount_Optional}})</span>
        <el-tooltip 
          class="item" 
          effect="dark" 
          placement="bottom-start"
          v-if="formData.componentAttribute.tipText !== ''"
        >
          <div slot="content">
            <div class="tooltip-content">{{formData.componentAttribute.tipText}}</div>
          </div>
          <img :src="warning" class="icon-warning" alt=""/>
        </el-tooltip>
      </div>
      <div class="component-value">
          <div class="input-group">
            <div 
              v-for="item in formData.componentAttribute.option" 
              :key="item.key"
              class="select-item"
              :class="dataValue.length && dataValue.find(_=>item.key && _.key==item.key) ? 'select-active' : ''"
              @click="selectChange(item)"
              ref="option"
              :style="{height: maxHeight}"
            >
              {{item.text}}
              <i class="icon el-icon-check"></i>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
export default {
  props:{
    formData: {
      type: Object,
      required: false,
      default: ()=>{
        return {}
      }
    },
    last:{
      type: Boolean,
      default: false
    }
  },
  data() {
    let defaultValue = [...this.formData.value.Value2];
    return {
      maxHeight: 'unset',
      dataValue: defaultValue,
      returnErr: false,
      thresholdFeedback: this.formData.componentAttribute.thresholdFeedback,
      warning: require('../../../assets/images/warning.png'),
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    }
  },
  methods: {
    selectChange(item){
      let i = -1, isChoice = false;
      for(let j=0;j<this.dataValue.length;j++){
        if(this.dataValue[j].key === item.key){
          i = j;
          isChoice = true;
        }
      }
      if(!isChoice){ //没选中
        this.dataValue.push({
          key: item.key,
          value: item.text
        })
      }else{
        this.dataValue.splice(i, 1)
      }
      this.formData.value.Value2 = [...this.dataValue]
      
      this.returnErr = false; //重置
      this.cycleCheck(this.formData.value.Value2)
      
    },
    checkData(val){
      let isErr = false;
      for(let i=0; i<this.thresholdFeedback.length;i++){
        let {condition, value} = this.thresholdFeedback[i]
        if(!isErr && !this.returnErr){
          if(condition === '数值范围'){
            let numberRange = value.split(",")
            if(val !== "" && !isNaN(Number(val)) && val >= Number(numberRange[0]) && val <= Number(numberRange[1])){
              isErr = true
            }
          }else if(condition === '文本序列'){
            let textRange = value.split(",")
            if(!textRange.some(text=> val === text)){
              
            }else{
              isErr = true
            }
          }else{
            if(!isNaN(Number(val))){
              if(val !== "" && eval(`${val}${condition}${value}`)){
                isErr = true
              }
            }else if(isNaN(Number(val)) && condition === "=="){ //文本只对==有效
              if(val !== "" && val === value){
                isErr = true
              }
            }
          }
          console.log("阈值条件：", condition, value)
          console.log("当前值：", val, isErr, this.returnErr)
        }
      }

      if(isErr){
        this.$emit('exception', {
          type: "add", 
          id: this.formData.id
        })
        this.returnErr = true;
      }else{
        this.$emit('exception', {
          type: "del", 
          id: this.formData.id
        })
        this.returnErr = false;
      }
    },
    cycleCheck(list){
      if(list.length === 0){
        this.checkData("")
        return;
      }
      for(let i=0; i<list.length; i++){
        if(this.returnErr){
          return
        }
        this.checkData(list[i].value)
      }
    },
  },
  mounted(){
    this.cycleCheck(this.formData.value.Value2)
    //设置高度
    let heightArr = [];
    this.$refs.option.forEach(item=>{
      heightArr.push(item.clientHeight)
    })
    setTimeout(()=>{
      this.maxHeight = Math.max(...heightArr) + 'px'
    })
    
    //过滤无效的值，以及更新修改后的文本
    let choiceList = []
    this.formData.componentAttribute.option.map(opt=>{
      if(this.dataValue.some(item=>item.key==opt.key)){
        choiceList.push({
          key: opt.key, 
          value: opt.text
        })
      }
    })
    this.dataValue = [...choiceList]
    this.formData.value.Value2 = [...choiceList]
  }
}
</script>
<style lang='scss'>
.individual-choice{
  .el-select{
   .el-input__inner{
      border: 1px solid #dcdfe6;
      border-radius: 4px;

      &:hover{
        border: 1px solid #c0c4cc;
      }

      &:focus{
        border: 1px solid #409EFF;
      }
   }
  }
}
</style>
<style lang='scss' scoped>
  .component-content{
    position: relative;
    padding: 8px 26px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    .component-title{
      line-height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #7C7F8E;
      vertical-align: middle;
      padding: 8px 0;
      box-sizing: border-box;

      .font-2 {
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          color: #7C7F8E;
      }

      .icon-warning{
        margin-left: 2px;
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
    }

    .component-value{
      position: relative;
      min-width: 116px;
      flex: 1;

      .input-group{
        height: auto;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        color: #222;
        // background: #f8f8f8;
        // padding: 6px 9px 6px 0;
        box-sizing: border-box;

        .select-item{
          font-size: 16px;
          line-break: anywhere;
          margin: 0 0 6px 6px;
          width: 112px;
          height: auto;
          min-height: 38px;
          padding: 5px 6px;
          box-sizing: border-box;
          line-height: 1;
          position: relative;
          color: #7C7F8E;
          border: 2px solid #E2E2E2;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          cursor: pointer;

          &.select-active{
            color: #2A7FFE;
            border: 2px solid #2A7FFE;

            .el-icon-check{
              background: #2A7FFE;
            }
          }
          .el-icon-check{
            position: absolute;
            bottom: 0;
            right: 0;
            color: #fff;
            padding: 2px 0 0 2px;
            border-radius: 6px 0 0 0;
          }
        }

        .el-select{
          width: 230px;
          background: #fff;
        }
        input{
          flex: 1;
          min-width: 116px;
          height: auto;
          min-height: 28px;
          background: #F8F8F8;
          border: none;
          padding: 0 6px;
          width: calc(100% - 70px);
          line-height: 1;
          box-sizing: border-box;
          color: #000;
        }
      }
      .unit{
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: #00B2A5;
        max-width: 70px;
        word-break: break-all;
        text-align: left; 
      }
    }

    &::after{
      position: absolute;
      content: "";
      left: 16px;
      right: 16px;
      bottom: 1px;
      height: 1px;
      background: #EBEBEB;
    }
  }
  .tooltip-content{
    max-width: 300px;
  }
</style>