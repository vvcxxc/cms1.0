
<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <!-- 循环出表头，用英文的逗号拆分字串 -->
          <th v-for="(item,index) in headerList.split(',')" :key="index">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <!-- 循环出有多少行数据，即 list 中有多少条数据，得到 list 中的每个元素 -->
        <tr v-for="(item,index) in bodyInfoList" :key="index">
          <!-- 循环取到元素的每个属性，并展示 -->
          <td v-for="(val,index) in item" :key="index">{{val}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 
<script>
export default {
  name: "one",
  props: {
    headerList: {
      type: String, // 亦可接收 Object 类型参数
      default: "headerList"
    },
    bodyInfoList: {
      type: Array,
    //   default: "bodyInfoList"
    }
  }
};
</script>
