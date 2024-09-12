<template>
  <Dialog :visible="visible" width="1200px" customClass="common_dialog" toBody :footer="false" :title="title" top="14vh"
    @open="open" @close="close">
    <div class="container">

      <div class="container-btn">
        <div class="btn" @click="exportfn">导出</div>
      </div>
      <div class="container-item" v-for="item in itemDatas">
        <div class="title">{{ item.Name }}</div>
        <div class="item_table">
          <Table :tableDataList="item.Rows"
            :columnList="item.Titles.map(item => ({ label: item.Label, prop: item.Prop }))"
            :maxHeight="itemDatas.langth >= 3 ? '200px' : null" />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/newComponents/Dialog.vue'
import Table from '@/newComponents/Table.vue'

export default {
  components: { Dialog, Table },
  props: {
    title: {
      type: String,
      default: ''
    },
    itemDatas: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
    }
  },
  methods: {
    exportfn() {
      console.log(this.itemDatas);
      let excelDatas = this.itemDatas.map(item => ({
        tHeader: item.Titles.map(_ => _.Label),
        filterVal: item.Titles.map(_ => _.Prop),
        tableDatas: item.Rows,
        sheetName: item.Name,
      }))
      excelDatas.push(excelDatas[0]);//会被删掉一个
      this.json2excel(excelDatas, this.title, true, 'xlsx');
    },
    json2excel(tableJson, filenames, autowidth, bookTypes) {
      var that = this;
      //这个是引用插件
      import('@/vendor/Export2Excel').then((excel) => {
        var tHeader = [];
        var dataArr = [];
        var sheetnames = [];
        for (var i in tableJson) {
          tHeader.push(tableJson[i].tHeader);
          dataArr.push(
            that.formatJson(
              tableJson[i].filterVal,
              tableJson[i].tableDatas
            )
          );
          sheetnames.push(tableJson[i].sheetName);
        }
        excel.export_json_to_excel({
          header: tHeader,
          data: dataArr,
          sheetname: sheetnames,
          filename: filenames,
          autoWidth: autowidth,
          bookType: bookTypes,
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    open() {
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 620px;
  overflow: auto;

  .container-item {
    &+.container-item {
      margin-top: 10px;
    }
  }
}

.container-btn {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .btn {
    border: 1px solid #fda100;
    background-color: #ffffff;
    color: #fda100;
    width: 120px;
    height: 38px;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
    margin-left: 10px;
  }
}

.title {
  position: relative;
  padding: 5px 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 4px;
    left: 0;
    background: #386DF0;
  }
}
</style>