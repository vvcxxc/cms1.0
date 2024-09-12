<!-- 工序原料详情 -->
<template>
  <div class="work-material-details">

    <!-- === 工序 ================== -->
    <div class="order-of-work flex">
      <div class="text">工序</div>
      <el-input 
        v-model="editData.ProductionProcedure"
        type="textarea"
        :rows="4"
      ></el-input>
    </div>

    <!-- === 原料 ================== -->
    <div class="head flex">
      <div class="title">原料</div>
      <div class="title">
        <div class="btn-add flex" @click="add()">
          <i class="el-icon-plus"></i>
          <span class="text">添加</span>
        </div>
      </div>
    </div>

    <!-- === 表格 ================== -->
    <el-table
			border
			:data="editData.List"
			:height="250"
		>
		  <el-table-column align="center" label="排序"  type="index" width="50"></el-table-column>
			<el-table-column align="center" label="原料编号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.MaterialNo" size="mini"></el-input>
        </template>
      </el-table-column>
			<el-table-column align="center" label="原料名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.MaterialName" size="mini" align='center'></el-input>
        </template>
      </el-table-column>
			<el-table-column align="center" label="占比" width="120">
        <template slot-scope="scope">
          <span>{{ percentage(scope.row) }}%</span>
        </template>
      </el-table-column>
			<el-table-column align="center" label="配方量(kg)" width="110">
        <template slot-scope="scope">
          <el-input-number 
            v-model="scope.row.FormulaQty" 
            :min="0" 
            :controls="false"
            size="mini"
            style="width: 80px;"
            @change="(currentValue, oldValue)=>{limitDigitLength(currentValue, scope, 'FormulaQty')}"
          ></el-input-number>
        </template>
      </el-table-column>
			<el-table-column align="center" label="上限值" width="120">
        <template slot-scope="scope">
          <div class="flex">
            <el-input-number 
              v-model="scope.row.UpperLimit" 
              :min="0" 
              :max="100"
              :controls="false"
              size="mini"
              style="width: 80px;"
              @change="(currentValue, oldValue)=>{limitDigitLength(currentValue, scope, 'UpperLimit')}"
            ></el-input-number>
            <span style="margin: 0 0 0 5px;">%</span>
          </div>
        </template>
      </el-table-column>
			<el-table-column align="center" label="下限值" width="120">
        <template slot-scope="scope">
          <div class="flex">
            <el-input-number 
              v-model="scope.row.LowerLimit" 
              :min="0" 
              :max="100"
              :controls="false"
              size="mini"
              style="width: 80px;"
              @change="(currentValue, oldValue)=>{limitDigitLength(currentValue, scope, 'LowerLimit')}"
            ></el-input-number>
            <span style="margin: 0 0 0 5px;">%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80">
        <template slot-scope="scope">
          <div class="btn-del" @click="()=>{ editData.List.splice(scope.$index, 1) }">删除</div>
        </template>
      </el-table-column>
		</el-table>
  </div>
</template>
<script>
export default {
  props: {
    editData: {
      type: Object,
      required: false,
      default: () => {
        return {
          ProductionGroup: 'A相',
          ProductionProcedure: '工序',
          List: [{
            MaterialNo: 'A000006',
            MaterialName: '清水',
            FormulaQty: 0, // 配方量
            UpperLimit: 0, // 上限
            LowerLimit: 0 // 下限
          }]
        }
      }
    },
  },
  data() {
    return {
    };
  },
  methods: {
    // 百分比
    percentage(row) {
      let total = 0
      for (const item of this.editData.List) {
        total += item.FormulaQty
      }
      const num = (row.FormulaQty / total) * 100
      // console.log('百分比', JSON.parse(JSON.stringify({
      //   '0所有': this.editData.List,
      //   '1当前': row,
      //   '2总量': total,
      //   '3百分比': num,
      // })));
      if (num.toString().length > 9) return num.toFixed(6)
      return num || 0
    },
    add() {
      this.editData.List.push({
        MaterialNo: '',
        MaterialName: '',
        FormulaQty: 0,
        UpperLimit: 0,
        LowerLimit: 0
      })
    },
    // 限制数字长度
    limitDigitLength(value, scope, key) {
      const len = value.toString().split(".");
      if (len.length >= 2) if (len[1].length > 6) {
        scope.row[key] = value.toString().substr(0, 8)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

::v-deep .el-input {
  .el-input__inner {
    text-align: center;
  }
}

.work-material-details {
  // === 工序 ==================
  & > .order-of-work {
    padding: 6px 0 0 0;
    align-items:flex-start;
    & > .text {
      min-width: 40px;
      line-height: 26px;
    }
  }

  // === 原料 ==================
  & > .head {
    margin: 10px 0 0 0;
    justify-content: space-between;
  }
}
</style>
