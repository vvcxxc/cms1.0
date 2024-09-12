<!-- 创建订单 -->
<template>
  <div>
    <el-dialog
      :title="voucherId ? '编辑订单' : '新增订单'"
      width="1200px"
      center
      class="create-order flex"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      @close="onSubmit('cancel')"
    >
      <div class="create-order-content">
        <!-- 表单 -->
          <el-form ref="myform" class="from" :model="formData" label-width="130px">
            
            <!-- 订单信息 -->
            <el-row>
              <el-col :span="24" class="title flex">
                <div class="text">订单信息</div>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划号">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>计划号</span>
                    </div>
                  </template>
                  <el-input v-model="formData.PlanNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="订单号">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>订单号</span>
                    </div>
                  </template>
                  <el-input v-model="formData.OrderNo"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="计划产量">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>计划产量</span>
                    </div>
                  </template>
                  <el-input-number 
                    v-model="formData.PlanQty" 
                    :min="0" 
                    :step="1"
                    step-strictly
                    :controls="false"
                    style="text-align: left;"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品名称">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>产品名称</span>
                    </div>
                  </template>
                  <el-input v-model="formData.ProductName"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="产品编号">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>产品编号</span>
                    </div>
                  </template>
                  <el-input v-model="formData.ProductNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="批次号">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>批次号</span>
                    </div>
                  </template>
                  <el-input v-model="formData.BatchNo"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类型">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>类型</span>
                    </div>
                  </template>
                  <el-input v-model="formData.Type"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="opacity: 0;">
                <el-form-item label="类型"></el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="计划开始时间">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>计划开始时间</span>
                    </div>
                  </template>
                  <el-date-picker
                    v-model="formData.PlanStartTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    prefix-icon="prefix-icon"
                    :clearable="false">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划结束时间">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>计划结束时间</span>
                    </div>
                  </template>
                  <el-date-picker
                    v-model="formData.PlanEndTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    prefix-icon="prefix-icon"
                    :clearable="false">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 配方信息 -->
            <el-row>
              <el-col :span="24" class="title flex">
                <div class="text">配方信息</div>
              </el-col>

              <el-col :span="12">
                <el-form-item label="配方编号">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>配方编号</span>
                    </div>
                  </template>
                  <el-input v-model="formData.FormulaNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="版本号">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>版本号</span>
                    </div>
                  </template>
                  <el-input v-model="formData.VersionNo"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="工艺说明">
                  <el-input 
                    v-model="formData.BomDescription"
                    type="textarea"
                    :rows="4"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="工艺路线">
                  <el-input 
                    v-model="formData.BomName"
                    type="textarea"
                    :rows="4"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 原料清单 -->
            <el-row>
              <el-col :span="24" class="title flex" style="justify-content: space-between;">
                <div class="text" @click="() => { configGroupVisible = false }">原料清单</div>
                <div 
                  class="config-group-btn flex"
                  @click="() => { configGroupVisible = true }"
                >
                  <i class="el-icon-s-tools"></i>
                  <span class="text">配置组别</span>
                </div>
              </el-col>

              <el-col :span="24">
                <el-form-item label="生产组别">
                  <template slot="label">
                    <div class="my-form-label">
                      <span>生产组别</span>
                    </div>
                  </template>
                  <el-checkbox-group 
                    v-model="formData.SeletedProductionGroupList"
                    @change="changeSeletedGroup"
                  >
                    <el-checkbox 
                      v-for="(name, i) in formData.ProductionGroupList" :key="i"
                      :label="name"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
    
              <!-- 工序原料详情 -->
              <!-- <template v-if="formData.Materials.length">
                <el-col :span="24" v-for="(item, i) in formData.Materials" :key="i">
                  <el-form-item :label="item.ProductionGroup">
                    <work-material-details :editData="item"></work-material-details>
                  </el-form-item>
                </el-col>
              </template> -->
              <el-col :span="24" v-for="(item, i) in formData.Materials" :key="i">
                <el-form-item :label="item.ProductionGroup">
                  <work-material-details :editData="item"></work-material-details>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="onSubmit('confirm')">保存</el-button>
        <el-button size="mini" @click="onSubmit('cancel')">取消</el-button>
      </span>
    </el-dialog>

    <!-- 配置组别 -->
    <config-group
      :groupList="formData.ProductionGroupList"
      :dialogVisible="configGroupVisible"
      @callback="configGroupCallback"
    ></config-group>
  </div>
</template>
<script>
// 初始化表单
const formInit = {
  // 订单信息
  PlanNo: '', // 计划号
  OrderNo: '', // 订单号
  PlanQty: undefined, // 计划产量
  ProductName: '', // 产品名称
  ProductNo: '', // 产品编号
  BatchNo: '', // 批次号
  Type: '', // 类型
  PlanStartTime: '', // 计划开始时间
  PlanEndTime: '', // 计划结束时间
  
  // 配方信息
  FormulaNo: '', // 配方号
  VersionNo: '', // 版本号
  BomDescription: '', // 工艺说明
  BomName: '', // 工艺路线
  // 原料清单
  // ProductionGroupList: [ 'A相', 'B相', 'C相' ], // 所有组
  ProductionGroupList: [ 'A相', 'B相', 'C相' ],
  SeletedProductionGroupList: ['A相'],
  Materials: [{ // 组-原料
    ProductionGroup: 'A相',
    ProductionProcedure: '', // 工序
    List: [{
      MaterialNo: '',
      MaterialName: '',
      FormulaQty: 0, // 配方量
      UpperLimit: 0, // 上限
      LowerLimit: 0 // 下限
    }]
  }]
}
// TODO 测试数据
const formTest = {
  // 订单信息
  PlanNo: 'A001', // 计划号
  OrderNo: 'A002', // 订单号
  PlanQty: 99, // 计划产量
  ProductName: '产品名称', // 产品名称
  ProductNo: 'B001', // 产品编号
  BatchNo: 'B002', // 批次号
  Type: '类型', // 类型
  PlanStartTime: '2023-01-04 00:00:00', // 计划开始时间
  PlanEndTime: '2023-01-04 23:59:59', // 计划结束时间
  // 配方信息
  FormulaNo: 'P001',
  VersionNo: 'B003',
  // BomDescription: '在2022年中央经济工作会议上，习近平总书记深刻指出：“明年经济工作千头万绪，需要从战略全局出发，抓主要矛盾，从改善社会心理预期、提振发展信心入手，抓住重大关键环节，纲举目张做好工作。”随着优化疫情防控措施不断推出、稳经济一揽子政策落地见效，各地党委政府加快经济全面恢复，广大市场主体紧锣密鼓投入复工复产，社会大众则计划着春节期间的出行安排，展现出昂扬向上的精神风貌、面对未来的正向预期，反映出人们对中国经济发展的坚定信心。',
  BomDescription: '',
  BomName: '工艺路线',
  // 原料清单
  ProductionGroupList: [ 'A相', 'B相', 'C相' ],
  SeletedProductionGroupList: ['A相'],
  Materials: [
    {
      ProductionGroup: 'A相',
      ProductionProcedure: ' 第一步，XXXXXX；第二步，XXXXXXX；第三步，XXXXX；',
      List: [
        {
          MaterialNo: 'A000001',
          MaterialName: '清水',
          FormulaQty: 10,
          UpperLimit: 2,
          LowerLimit: 1
        }, {
          MaterialNo: 'A000002',
          MaterialName: '重油',
          FormulaQty: 20,
          UpperLimit: 6,
          LowerLimit: 4
        }, 
      ]
    }
  ]
}

import ConfigGroup from './config-group.vue';
import WorkMaterialDetails from './work-material-details.vue';
import moment from "moment";
import { getOrder, createOrder, updateOrder } from '@/api/craft-manage'

export default {
  components: { ConfigGroup, WorkMaterialDetails },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    voucherId: {
      type: Number | null,
      required: true,
      default: null
    },
  },
  data() {
    return {
      dialogShow: false,
      oldSeletedGroupList: [], // 已选组(旧)
      formData: {
        // 订单信息
        PlanNo: '', // 计划号
        OrderNo: '', // 订单号
        PlanQty: undefined, // 计划产量
        ProductName: '', // 产品名称
        ProductNo: '', // 产品编号
        BatchNo: '', // 批次号
        Type: '', // 类型
        PlanStartTime: '', // 计划开始时间
        PlanEndTime: '', // 计划结束时间
        
        // 配方信息
        FormulaNo: '', // 配方号
        VersionNo: '', // 版本号
        BomDescription: '', // 工艺说明
        BomName: '', // 工艺路线

        // 原料清单
        // ProductionGroupList: [ 'A相', 'B相', 'C相' ], // 所有组
        ProductionGroupList: [ 'A相', 'B相', 'C相' ],
        SeletedProductionGroupList: ['A相'],
        Materials: [{ // 组-原料
          ProductionGroup: 'A相',
          ProductionProcedure: '', // 工序
          List: [{
            MaterialNo: '',
            MaterialName: '',
            FormulaQty: 0, // 配方量
            UpperLimit: 0, // 上限
            LowerLimit: 0 // 下限
          }]
        }]
      },
      rules: {
        PlanNo: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          // { type: 'date', required: true, message: '请选择日期', trigger: '' },
        ],
      },
      configGroupVisible: false, // 配置组别-可见
    };
  },
  watch: {
    "dialogVisible": {
      handler: function(val) {
        this.dialogShow = val
        if (val) this.init();
      }
    }
  },
  methods: {
    // 配置组别-回调
    configGroupCallback(state, list) {
      // console.log('配置组别-回调', state, list);
      if (state === 'cancel') {
        this.configGroupVisible = false
        return
      }
      if (list.length === 0) {
        this.formData.ProductionGroupList = []
        this.formData.SeletedProductionGroupList = []
        this.formData.Materials = []
        return
      }

      const oldList = this.formData.ProductionGroupList // 所有组(旧)
      const seletedList = this.formData.SeletedProductionGroupList // 已选组
      const materialsList = this.formData.Materials // 组-原料

      for (const item of oldList) {
        let have = false
        for (const element of list) {
          if (item === element) {
            have = true
            break
          }
        }

        if (!have) {
          // 移除 已选组
          for (const [n, element] of seletedList.entries()) {
            if (item === element) {
              seletedList.splice(n, 1)
              break
            }
          }

          // 移除 组-原料
          for (const [n, element] of materialsList.entries()) {
            if (item === element.ProductionGroup) {
              materialsList.splice(n, 1)
              break
            }
          }
        }
      }

      this.formData.ProductionGroupList = list
      this.formData.SeletedProductionGroupList = seletedList
      this.formData.Materials = materialsList
      // console.log(JSON.parse(JSON.stringify({
      //   '0旧list': oldList,
      //   '1新list': list,
      //   '3已选list': seletedList,
      //   '4表单': this.formData,
      // })));

      this.configGroupVisible = false
    },
    // 选择组
    changeSeletedGroup(list) {
      // console.log(JSON.parse(JSON.stringify({
      //   '0旧list': this.oldSeletedGroupList,
      //   '1新list': list,
      // })));
      const oldList = this.oldSeletedGroupList // 所有组(旧)
      const materialsList = this.formData.Materials // 组-原料
      for (const item of oldList) {
        let have = false
        for (const element of list) {
          if (item === element) {
            have = true
            break
          }
        }

        if (!have) {
          // 移除 组-原料
          for (const [n, element] of materialsList.entries()) {
            if (item === element.ProductionGroup) {
              materialsList.splice(n, 1)
              break
            }
          }
        } 
      }

      for (const item of list) {
        let haveGroup = false
        for (const [n, element] of materialsList.entries()) {
          if (item === element.ProductionGroup) {
            haveGroup = true
            break
          }
        }
        if (!haveGroup) {
          // console.log('真的要添加组', item);
          materialsList.push({
            ProductionGroup: item,
            ProductionProcedure: '',
            List: [{
              MaterialNo: '',
              MaterialName: '',
              FormulaQty: 0,
              UpperLimit: 0,
              LowerLimit: 0
            }]
          })
        } else {
          // console.log('已经有了不需要添加', item);
        }
      }

      // 根据全部组别排序
      const materialsListSort = []
      for (const item of this.formData.ProductionGroupList) {
        for (const element of materialsList) {
          if (item === element.ProductionGroup) {
            materialsListSort.push(element)
            break
          }
        }
      }

      // this.formData.Materials = materialsList
      this.formData.Materials = materialsListSort
      this.oldSeletedGroupList = JSON.parse(JSON.stringify(list))

      // console.log(JSON.parse(JSON.stringify({
      //   '0全部list': this.formData.ProductionGroupList,
      //   '1最终list': materialsList,
      //   '2排序list': materialsListSort,
      // })));
    },
    // 文本验证
    textVerification(key, text) {
      const value = this.formData[key]
      let result = true
      if (/[/@/#/&/%/￥/]/.test(value)) result = false
      if (!/^[A-Za-z/0-9]/.test(value[0])) result = false
      if (!result) this.confirm_Pop2(this, `${text}不可输入特殊字符，请重新检查！`, {tips: '提示', yes: '确定' })
      return result
    },
    // 验证表单
    verificationForm() {
      if (!this.formData.PlanNo) {
        this.confirm_Pop2(this, '请输入计划号', {tips: '提示', yes: '确定' })
        return false
      } else {
        if (!this.textVerification('PlanNo', '计划号')) return false
      }
      if (!this.formData.OrderNo) {
        this.confirm_Pop2(this, '请输入订单号', {tips: '提示', yes: '确定' })
        return false
      } else {
        if (!this.textVerification('OrderNo', '订单号')) return false
      }
      if (!this.formData.PlanQty) {
        this.confirm_Pop2(this, '请输入计划产量', {tips: '提示', yes: '确定' })
        return false
      }
      if (!this.formData.ProductName) {
        this.confirm_Pop2(this, '请输入产品名称', {tips: '提示', yes: '确定' })
        return false
      }
      if (!this.formData.ProductNo) {
        this.confirm_Pop2(this, '请输入产品编号', {tips: '提示', yes: '确定' })
        return false
      } else {
        if (!this.textVerification('ProductNo', '产品编号')) return false
      }
      if (!this.formData.BatchNo) {
        this.confirm_Pop2(this, '请输入批次号', {tips: '提示', yes: '确定' })
        return false
      } else {
        if (!this.textVerification('BatchNo', '批次号')) return false
      }
      if (!this.formData.Type) {
        this.confirm_Pop2(this, '请输入类型', {tips: '提示', yes: '确定' })
        return false
      }
      if (!this.formData.PlanStartTime) {
        this.confirm_Pop2(this, '请输入计划开始时间', {tips: '提示', yes: '确定' })
        return false
      }
      if (!this.formData.PlanEndTime) {
        this.confirm_Pop2(this, '请输入计划结束时间', {tips: '提示', yes: '确定' })
        return false
      }
      if (!this.formData.FormulaNo) {
        this.confirm_Pop2(this, '请输入配方号', {tips: '提示', yes: '确定' })
        return false
      } else {
        if (!this.textVerification('FormulaNo', '配方号')) return false
      }
      if (!this.formData.VersionNo) {
        this.confirm_Pop2(this, '请输入版本号', {tips: '提示', yes: '确定' })
        return false
      } else {
        if (!this.textVerification('VersionNo', '版本号')) return false
      }
      if (!this.formData.ProductionGroupList.length) {
        this.confirm_Pop2(this, '请添加生产组别', {tips: '提示', yes: '确定' })
        return false
      }
      if (!this.formData.SeletedProductionGroupList.length) {
        this.confirm_Pop2(this, '请选择生产组别', {tips: '提示', yes: '确定' })
        return false
      }
      if (!this.formData.Materials.length) {
        this.confirm_Pop2(this, '请选择生产组别', {tips: '提示', yes: '确定' })
        return false
      }

      for (const item of this.formData.Materials) {
        for (const element of item.List) {
          if (!element.MaterialNo) {
            this.confirm_Pop2(this, '原料编号不能为空', {tips: '提示', yes: '确定' })
            return false
          }
          if (!element.MaterialName) {
            this.confirm_Pop2(this, '原料名称不能为空', {tips: '提示', yes: '确定' })
            return false
          }
          if (!element.FormulaQty) {
            this.confirm_Pop2(this, '配方量不能为空', {tips: '提示', yes: '确定' })
            return false
          }
          if (!element.UpperLimit) {
            this.confirm_Pop2(this, '上限不能为空', {tips: '提示', yes: '确定' })
            return false
          }
          if (!element.LowerLimit) {
            this.confirm_Pop2(this, '下限不能为空', {tips: '提示', yes: '确定' })
            return false
          }
        }
      }

      return true
    },
    // 获取订单详情
    getOrderDetails() {
      getOrder(this.voucherId).then(res => {
        console.log('订单详情-结果', JSON.parse(JSON.stringify(res.data.data)));
        if (res.data.code !== 0) {
          this.confirm_Pop2(this, res.data.msg, {tips: '提示', yes: '确定' })
          return
        }

        const data = res.data.data
        this.formData = {
          ...data.Voucher,
          PlanStartTime: moment(data.Voucher.PlanStartTime).format('YYYY-MM-DD HH:mm:ss'),
          PlanEndTime: moment(data.Voucher.PlanEndTime).format('YYYY-MM-DD HH:mm:ss'),
          Materials: data.VoucherMaterials,
        }
        console.log('编辑.formData', JSON.parse(JSON.stringify(this.formData)));
      }, err => {
        console.log('失败回调', err);
      })
    },
    onSubmit(state) {// state: confirm-确定 cancel-取消
      if (state === 'cancel') {
        this.$emit('callback', state)
        return
      }
      console.log(JSON.parse(JSON.stringify(this.formData)));
      if (!this.verificationForm()) return
      
      // 创建
      const create = () => {
        createOrder(this.formData).then(res => {
          // console.log('创建-结果', JSON.parse(JSON.stringify(res.data)));
          if (res.data.code !== 0) {
            this.confirm_Pop2(this, res.data.msg, {tips: '提示', yes: '确定' })
            return
          }
          this.$emit('callback', state)
        }, err => {
          console.log('失败回调', err);
        })
      }
      // 编辑
      const update = () => {
        updateOrder(this.formData).then(res => {
          console.log('编辑-结果', JSON.parse(JSON.stringify(res.data)));
          if (res.data.code !== 0) {
            this.confirm_Pop2(this, res.data.msg, {tips: '提示', yes: '确定' })
            return
          }
          this.$emit('callback', state)
        }, err => {
          console.log('失败回调', err);
        })
      }

      if (this.voucherId) {
        update()
      } else {
        create()
      }
    },
    async init() {
      console.log('创建订单-初始化', JSON.parse(JSON.stringify({
        '0订单id': this.voucherId,
      })));
      if (this.voucherId) {
        this.getOrderDetails()
      } else {
        this.formData = JSON.parse(JSON.stringify(formInit)) // 初始化表单
        // this.formData = JSON.parse(JSON.stringify(formTest)) // TODO 测试数据
        this.formData.PlanStartTime = moment().format("YYYY-MM-DD") + ' 00:00:00'
        this.formData.PlanEndTime = moment().format("YYYY-MM-DD") + ' 23:59:59';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../index.scss";

::v-deep .el-input-number {
  width: 100%;
  .el-input {
    .el-input__inner {
      text-align: left;
    }
  }
}

.create-order {
  ::v-deep .el-dialog {
    height: 90%;
    margin-top: 0 !important;
    margin: -20px 0 0 0;
    .el-dialog__body {
      height: calc(100% - 100px);
    }
  }

  .create-order-content {
    height: 100%;
    position: relative;
    overflow-y: auto;
    // 表单
    .from {
      ::v-deep .el-col {
        padding: 0 10px;
        position: relative;
      }
      ::v-deep .el-form-item {
        margin-bottom: 10px;
      }
      .my-form-label {
        position: relative;
        padding: 0 7px 0 0;
        &::after {
          content: "*";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          color: red;
        }
      }

      // 标题
      .title {
        margin: 0 0 10px 0;
        padding: 0;
        justify-content: flex-start;

        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 2px;
          height: 20px;
          background: #386DF0;
        }

        & > .text {
          min-width: 80px;
          margin: 0 0 0 10px;
          font-size: 17px;
          color: #386DF0;
        }

        .config-group-btn {
          margin: 0 10px 0 0;
          color: #386DF0;
          cursor: pointer;
          & > .text {
            margin: 0 0 0 5px;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    // 底部
    .foot {
      justify-content: flex-end;
      .btn {
        width: 100px;
        height: 40px;
        margin: 0 0 0 20px;
        line-height: 40px;
        text-align: center;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }
      .cancel {
        background: #999999;
      }
      .confirm {
        background: #386DF0;
      }
    }

    .masklayer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
}
</style>
