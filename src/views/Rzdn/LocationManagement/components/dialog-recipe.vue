<template>
  <Dialog
    :visible="visible"
    width="600px"
    customClass="common_dialog"
    toBody
    :footer="false"
    :title="title"
    @close="close"
  >
    <div class="container" >
      <div class="header">
        <!-- <el-button class="common_button printBtn" >标签打印</el-button>
        <el-button class="common_button delBtn" >删除</el-button> -->
        <search-form :formData="formData" :config="formConfig" />
      </div>
      <div class="main" >
        <Table
          isSelection
          :tableDataList="tableData"
          :columnList="columnList"
          thColor="#4270E4"
          thBackColor="#DCF0F9"
        />
      </div>
      <div class="footer flex" >
        <Page :pageData="pageData" />
        
        <div class="footer-btn">
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import SearchForm from '@/newComponents/Search-form.vue'
import Table from '@/newComponents/Table.vue'
import Page from '@/newComponents/Page.vue'

export default {
  components: { Dialog, SearchForm, Table, Page },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      formData: {
        keyword: '',
      },
      formConfig: {
        form: [
          {
            type: 'input',
            prop: 'keyword'
          },
          {
            type: 'btn',
            name: '查询'
          }
        ]
      },
      columnList: [
        {
          label: '序号',
          prop: 'index',
          width: '50',
        },
        {
          label: '名称',
          prop: 'recipeName',
        }
      ],
      tableData: [
        {
          index: 1,
          recipeName: '物料1'
        },
        {
          index: 2,
          recipeName: '物料2'
        },
        {
          index: 3,
          recipeName: '物料3'
        }
      ],
      pageData: {
        PageIndex: 1,
        TotalCount: 0,
        PageSize: 50
      },
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 620px;
}
.header {
  height: 50px;
  display: flex;
  align-items: center;
}
.main {
  height: calc(100% - 150px);
  border: 1px solid #E8E8E8;
}
.printBtn {
  border-color: #46BE05;
  color: #46BE05;
}
.delBtn {
  color: #fff;
  border-color: #999999;
  background: #999999;
}
.footer {
  height: 100px;
  .footer-btn {
    margin: 10px 0 0 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .el-button {
      width: 100px;
      height: 30px;
      padding: 0;
      line-height: 30px;
    }
  }
}
.footer ::v-deep .page-container {
    flex-wrap: wrap;
}
</style>