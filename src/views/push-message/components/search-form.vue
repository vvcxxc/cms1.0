<template>
  <div class="search_form" >
    <div class="search_form_left" >
      <div v-for="(item, index) in config.form" :key="index" :style="{width: item.width ? item.width: '200px'}">
        <template v-if="item.type === 'select'">
          <span :style="{width: item.labelWidth ? item.labelWidth: '110px'}" >{{item.name}}</span>
          <el-select v-model="formData[item.prop]" class="common_select" placeholder="请选择">
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value">
            </el-option>
          </el-select>
        </template>

        <template v-if="item.type === 'select-tree'">
          <!-- <span :style="{width: item.labelWidth ? item.labelWidth: '110px'}" >{{item.name}}</span>
          <el-select v-model="formData[item.prop]" class="common_select" placeholder="请选择">
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value">
            </el-option>
          </el-select> -->
          <div class="select_tree">
            <span class="title" :style="{width: item.labelWidth ? item.labelWidth: '110px'}" >{{lang.EquipmentAccount_EquipmentType1}}</span>
            <div class="seleword seleword3" :style="{width:`calc(100% - ${item.labelWidth})`}" @click.stop="getDropData" >
              <div class="seleword1">
                    {{Meter}}
                <img :src="xiala" alt />
              </div>
            </div>
            <div class="selectword" v-show="changeselect" >
              <el-tree
                :data="treeData"
                @node-click="handleNodeClic"
                node-key="node.id"
                default-expand-all
                icon-class="el-icon-arrow-up"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>
                    <img v-show="data.file" :src="data.file" alt class="img11" />
                    <i :class="data.icon"></i>
                    {{ node.label }}
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </template>

        <template v-if="item.type === 'input'">
          <el-input v-model="formData[item.prop]" class="common_input" placeholder="请输入关键字" />
        </template>

        <!-- 按钮部分 -->
        <!-- 此处只会有查询按钮，所以查询按钮单独放在左侧，其他按钮放在最右侧 -->
        <template v-if="item.type === 'btn'">
          <el-button class="common_button_search" @click="search">{{item.name}}</el-button>
        </template>

        <template v-if="item.type === 'btn_plain'">
          <el-button class="common_button_plain_search" @click="search">{{item.name}}</el-button>
        </template>
      </div>
    </div>

    <!-- 此处存放按钮组 -->
    <div class="search_form_right" >
      <template v-for="(item, index) in config.buttons">
        <el-button :key="index" class="common_button_search" v-if="item.type === 'add'"  @click="add">新增</el-button>
        <el-button :key="index" class="common_button_edit" v-if="item.type === 'upd'"  @click="upd">修改</el-button>
        <el-button :key="index" class="common_button_delete" v-if="item.type === 'delete'"  @click="del">删除</el-button>
      </template>
    </div>

  </div>
</template>

<script>
import { getDevices } from '@/api/common.js'

export default {
  name: 'SearchForm',
  props: {
    config: {
      type: Object,
      default: () => ({
        form: [], //左侧查询表单数据
        buttons: [],  //右侧按钮数据
      })
    },
    formData: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
      Meter: '',
      xiala: require('@/assets/images/ziyuan4.png'),
      changeselect: false,
      treeData: [],
      selectname: [],
      a1: 1,
      a2: 1,
    }
  },
  methods: {
    search() {
      this.config.form.forEach(item => {
        if (item.type === 'select-tree') {
          this.formData[item.prop] = this.Meter
        }
      })
      this.$emit('searchData', this.formData)
    },
    add () {
      this.$emit('add')
    },
    upd () {
      this.$emit('upd')
    },
    del () {
      this.$emit('del')
    },
    /* 下拉树， 需要改造 */
    async getDropData() {
      await this.getEquipmentType()
      let i = 0;
      let j = 1;
      for (i in this.selectname) {
          if (this.a1 == 1) {
              if (this.selectname[i].NodeName == this.lang.EquipmentAccount_EquipmentType) {
                  this.selectname[i].NID =
                      '11111111-1111-1111-1111-111111111111';
              }
              this.a1 = 2;
          }

          this.selectname[i].id = this.selectname[i].NID;
          this.selectname[i].label = this.selectname[i].NodeName;
          this.selectname[i].children = [];
          for (j in this.selectname) {
              if (this.selectname[i].NID == this.selectname[j].FatherID) {
                  this.selectname[i].children.push(this.selectname[j]);
              }
              if (this.selectname[i].children.length !== 0) {
                  this.selectname[
                      i
                  ].file = require('@/assets/images/icon_file.png');
              }
          }
      }
      this.treeData = []
      this.treeData.push(this.selectname[0])
      this.changeselect = !this.changeselect;
    },
    handleNodeClic(data) {
      this.Meter = data.label;
      this.Meterid = data.NID;
      this.changeselect = false;
    },
    // 获取所有设备类型和安装位置
    async getEquipmentType() {
      await getDevices().then(res => {
        this.a1 = 1;
        this.a2 = 1;
        this.selectname = [
            ...res.data.data.filter(val => {
                return val.NodeType === 1;
            })
        ];
        this.selectname.unshift({
            NodeName: this.lang.EquipmentAccount_EquipmentType
        });
    }).then(() => {
        this.somethingdata();
    }).catch(err => {})
    },
  }
}

</script>

<style lang='scss' scoped>
::v-deep .el-tree-node__content:hover {
  background: transparent;
}

.search_form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right:10px;
  .search_form_left{
    display: flex;
    >div {
      display: flex;
      align-items: center;
    }
    >div+div {
      margin-left: 10px;
    }
  }
}
.keyword_label {
  width: 150px;
}
.select_tree {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  .title{
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
  .sblx{
    display:inline-block;
  }
  .seleword{
    display: inline-block;
    width: 100%;
    height: 40px;
    background: #fff;
    text-indent: 1em;
    line-height: 40px;
    border: 1px solid #DCDFE6;
    .seleword1{
        width: calc(100%);
        position: relative;
        height: 100%;
        padding-right: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        border: 1px solid rgb(244, 244, 244);
        img{
          position: absolute;
          right: 2px;
          width: 20px;
          height: 20px;
          top: 10px;
      }
    }
      // align-content: bottom;
  }
  .img11 {
    width: 25px;
    height: 25px;
    position: relative;
    top: 10px;
  }
}
.selectword {
  position: absolute;
  z-index: 999;
  top: 43px;
  right: 0;
  max-height: 300px;
  max-width: 300px;
  overflow: auto;
  border: 1px solid #ccc;
}
</style>