<!--
- 单项选择
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
          <div class="input-group" v-if="formData.componentAttribute.theme==='select'">
            <el-select v-model="formData.value.Value2.value" placeholder="请选择" @change="handleChange" @focus="setMinWidthEmpty">
              <el-option
                v-for="item in formData.componentAttribute.option"
                :key="item.key"
                :value="item.text"
                :style="{width:selectOptionWidth}"
                >
                {{item.text}}
              </el-option>
            </el-select>
          </div>
          <div class="input-group" v-else>
            <span 
              v-for="item in formData.componentAttribute.option" 
              :key="item.key"
              class="select-item"
              :class="formData.value.Value2.key == item.key ? 'select-active' : ''"
              @click="selectChange(item)"
              ref="option"
              :style="{height: maxHeight}"
            >
              {{item.text}}
              <i class="icon el-icon-check"></i>
            </span>
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
    return {
      maxHeight: 'unset',
      selectOptionWidth: 0,
      thresholdFeedback: this.formData.componentAttribute.thresholdFeedback,
      warning: require('../../../assets/images/warning.png'),
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
    }
  },
  methods: {
    setMinWidthEmpty(event){
      this.$nextTick(() => {
        // this.selectOptionWidth = event.srcElement.offsetWidth + "px";
      });
    },
    handleChange(item){
      this.formData.componentAttribute.option.forEach(element => {
        if(element.text === item){
          this.formData.value.Value2 = {
            value: element.text,
            key: element.key + ""
          }
        }
      });
      this.checkData(item)
    },
    checkData(val){
      let isErr = false;
      for(let i=0; i<this.thresholdFeedback.length;i++){
        let {condition, value} = this.thresholdFeedback[i]
        if(!isErr){
          if(condition === '数值范围'){
            let numberRange = value.split(",")
            if(val !== "" && !isNaN(Number(val)) && val >= Number(numberRange[0]) && val <= Number(numberRange[1])){
              isErr = true
            }
          }else if(condition === '文本序列'){
            let textRange = value.split(",")
            if(textRange.some(text=> val === text)){
              isErr = true
            }
          }else{
            //数值
            if(!isNaN(Number(val))){
              if(val !== "" && eval(`${val.toString()}${condition}${value}`)){
                isErr = true
              }
            }else if(isNaN(Number(val)) && condition === "=="){ //文本只对==有效
              if(val !== "" && val === value){
                isErr = true
              }
            }
          }
        }
      }
      if(isErr){
        this.$emit('exception', {
          type: "add", 
          id: this.formData.id
        })
      }else{
        this.$emit('exception', {
          type: "del", 
          id: this.formData.id
        })
      }
    },
    selectChange(item){
      this.formData.value.Value2 = {
        value: item.text,
        key: item.key
      }
      this.checkData(item.text)
    },
  },
  mounted(){
    this.checkData(this.formData.value.Value2.value)
    //设置高度
    let heightArr = [];
    if(Array.isArray(this.$refs.option)){
      this.$refs.option.forEach(item=>{
        heightArr.push(item.clientHeight)
      })
      setTimeout(()=>{
        this.maxHeight = Math.max(...heightArr) + 'px'
      })
    }
  }
}
</script>
<style lang='scss'>
.individual-choice{
  .el-select{
    .el-input__inner{
      color: #333;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
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
.el-select-dropdown__item{
  width: 100%!important;
  height: auto!important;
  color: #333;
  font-size: 14px;
  font-family: 'PingFang-SC-Medium';
  padding: 8px 20px;
  line-height: 26px;
  position: relative;
  white-space: unset;
  overflow: unset;
  text-overflow: unset;
  height: auto;
  box-sizing: border-box;
  cursor: pointer;
  max-width: 580px;
  word-break: break-all;
}
</style>
<style lang='scss' scoped>
  .component-content{
    position: relative;
    padding: 8px 26px;
    flex-wrap: wrap;
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
      max-width: 190px;

      .font-2 {
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          color: #999;
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
          font-family: PingFang SC;
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