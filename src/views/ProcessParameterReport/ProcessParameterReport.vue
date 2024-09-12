<template>
  <div class="ProcessParameterReport-Page" :class="{ blackBlueBg: $store.state.color === 'blackBlue' }">
    <div class="tip" ref="kongtiao2" v-if="tipchange">
      <div class="tiptop" @mousedown="mouseDownHandleelse2($event)" @mouseup="mouseUpHandleelse2($event)">
        <img src="../../assets/images/gth.png" alt>
        <span>提示</span>
      </div>
      <div class="tipcontanin">
        <div class="tipword">{{tipword}}</div>
        <div class="tipdetermine" @click="tip1">确定</div>
      </div>
    </div>
    <div class="page-center">
      <div class="select">
        <div class="select-l">
          <div class="select-text">查询时间：</div>
          <el-date-picker :key="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'"
            :popper-class="$store.state.color === 'blackBlue' ? 'blackBlueBg' : 'normal'" type="datetime"
            v-model="seleTime" placeholder="查询时间" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-button class="select-btn" @click="GetProcessParamDataByTime">查询</el-button>
        </div>
        <div class="select-print">
          <el-button class="select-btn2" @click="htmlToPdf">打印预览</el-button>
          <el-button class="select-btn2" @click="doPrint">报表打印</el-button>
          <el-button class="select-btn2" v-if="isBSystem" @click="saveTable">报表保存</el-button>
          <el-button class="select-btn3" @click="exportTable">导出</el-button>
        </div>
      </div>
      <div class="content">
        <div class="table-content" id="table-content">
          <el-table :data="tableData" :span-method="objectSpanMethod" :border="true" style="width: 100%"
            :header-cell-style="headFirst">
            <el-table-column prop="LineIndex" label="产线名称" :resizable="false" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.LineIndex.indexOf('记录人')>=0 " class="left white">{{scope.row.LineIndex}}</div>
                <span v-else class="white">{{scope.row.LineIndex}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="LineName" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.LineName.indexOf('确认人')>=0 " class="left white">{{scope.row.LineName}}</div>
                <span v-else class="white">{{scope.row.LineName}}</span>
              </template>
            </el-table-column>
            <el-table-column :prop="item" :label="item" :resizable="false" align="center" width="70"
              v-for="item in ['1U','2U','3U','4U','5U','6U','7U','8U','9U','10U','11U','12U','13U','14U','15U','15U','16U','17U','18U','19U','20U','21U']">
              <template slot-scope="scope">
                <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row[item]" @blur="isNumber">
                <span v-else>{{scope.row[item]}}</span>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-table :data="tableData2" :span-method="objectSpanMethod" :border="true" style="width: 100%"
            :header-cell-style="headFirst">
            <el-table-column prop="LineIndex" label="产线名称" :resizable="false" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.LineIndex.indexOf('记录人')>=0 " class="left white">{{scope.row.LineIndex}}</div>
                <span v-else class="white">{{scope.row.LineIndex}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="LineName" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.LineName.indexOf('确认人')>=0 " class="left white">{{scope.row.LineName}}</div>
                <span v-else class="white">{{scope.row.LineName}}</span>
              </template>
            </el-table-column>
            <el-table-column :prop="item" :label="item" :resizable="false" align="center" width="65"
              v-for="item in ['1U','2U','3U','4U','5U','6U','7U','8U','9U','10U','11U','12U','13U','14U','15U','15U','16U', '17U',   '18U', '19U',  '20U', '21U','22U','23U']">
              <template slot-scope="scope">
                <input type="text" v-if="isBSystem" class="rowInput" v-model="scope.row[item]" @blur="isNumber">
                <span v-else>{{scope.row[item]}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
export default {
  data() {
    return {
      tipword: '',
      tipchange: false,
      isBSystem: false,
      seleTime: '',
      tableData: [],
      tableData2: [],
    };
  },
  methods: {
    exportTable() {
      let filterVal = [...Object.keys(this.tableData[0])];
      let filterVal2 = [...Object.keys(this.tableData2[0])];
      let title1 = [
        '产线名称',
        '',
        '1U',
        '2U',
        '3U',
        '4U',
        '5U',
        '6U',
        '7U',
        '8U',
        '9U',
        '10U',
        '11U',
        '12U',
        '13U',
        '14U',
        '15U',
        '16U',
        '17U',
        '18U',
        '19U',
        '20U',
        '21U',
      ];
      let title2 = title1.concat([
        '22U',
        '23U',
      ]);
      let tableList = [...this.tableData];
      let tableList2 = [...this.tableData2];
      tableList.pop();
      tableList2.pop();
      require.ensure([], () => {
        const {
          expor_json_to_excel
        } = require('../../vendor/Export2Excel');
        let excelDatas = [
          {
            tHeader: title1,
            filterVal: filterVal,
            tableDatas: tableList,
            sheetName: 'A~C'
          },
          {
            tHeader: title2,
            filterVal: filterVal2,
            tableDatas: tableList2,
            sheetName: 'D~F'
          },
          {
            tHeader: title1,
            filterVal: filterVal,
            tableDatas: tableList,
            sheetName: 'A~C'
          },

          //不知道源码为啥删一次，写两次才正常
        ];
        this.json2excel(excelDatas, '工艺参数表', true, 'xlsx');
      });
    },
    json2excel(tableJson, filenames, autowidth, bookTypes) {
      var that = this;
      //这个是引用插件
      import('@/vendor/Export2Excel').then(excel => {
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
          bookType: bookTypes
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    htmlToPdf() {
      let dom = document.getElementsByClassName('table-content')[0];
      html2Canvas(dom, {
        allowTaint: true,
        height: dom.scrollHeight
        // windowHeight: dom.scrollHeight
      }).then(function (canvas) {
        let pageData = canvas.toDataURL('image/jpeg');
        const printWindow = window.open('page.html');
        printWindow.document.write('<img src="' + pageData + '" />');
      });
    },
    doPrint() {
      let dom = document.getElementsByClassName('table-content')[0];
      html2Canvas(dom, {
        allowTaint: true,
        height: dom.scrollHeight
        // windowHeight: dom.scrollHeight
      }).then(function (canvas) {
        let pageData = canvas.toDataURL('image/jpeg');
        const printWindow = window.open('page.html');
        printWindow.document.write('<img src="' + pageData + '" />');
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        });
      });
    },
    headFirst({ row, colunm, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 1) {
        //这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return 'border-left:none;background:#18314e;color:#fff;';
      }
      if (rowIndex === 0 && columnIndex === 0) {
        //这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return 'border-right:none;background:#18314e;color:#fff;';
      }
      return 'background:#18314e;color:#fff;';
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === this.tableData.length - 1) {
          return {
            rowspan: 1,
            colspan: 8
          };
        } else if ((rowIndex + 1) % 2 === 1) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (rowIndex === this.tableData.length - 1) {
        if (columnIndex === 1) {
          return {
            rowspan: 1,
            colspan: 18
          };
        }
      }
    },
    GetProcessParamDataByTime() {
      if (!this.seleTime) {
        this.tipword = '未选择时间';
        this.tipchange = true;
        return;
      }
      this.$axios
        .get(
          `/api/ReportManagement/ProcessParametersReportQuery?time=${this.seleTime}&isBSystem=${this.isBSystem}`
        )
        .then(res => {
          if (res.data.code == 0) {

            const data = res.data.data;
            let temp = [];
            for (let i in data) {
              let t = {
                LineIndex: data[i].LineName.substr(data[i].LineName.length - 1, 1),
                LineName: data[i].LineName,
              };
              for (let j in data[i].Data) {
                t[data[i].Data[j].HeaderName] = data[i].Data[j].Value;
              }
              temp.push(t);
            }
            this.tableData = temp.filter(_ => ['A', 'B', 'C'].includes(_.LineIndex));
            this.tableData2 = temp.filter(_ => ['D', 'E', 'F'].includes(_.LineIndex));

            this.tableData.push({
              LineIndex: '记录人：',
              LineName: '确认人：'
            });
            this.tableData2.push({
              LineIndex: '记录人：',
              LineName: '确认人：'
            });
          } else {
            this.tipword = res.data.msg;
            this.tipchange = true;
          }
        });
    },
    objToArr(obj) {
      var arr = [];
      for (let i in obj) {
        if (
          obj[i].indexOf('记录人') >= 0 ||
          obj[i].indexOf('确认人') >= 0
        ) {
          break; //这种情况别循环了直接退吧
        } else {
          let a = true;
          if (i != 'LineName' && i != 'LineIndex') {
            a = this.isNumber(obj[i], true);
          }
          a &&
            arr.push({
              HeaderName: i,
              Value: obj[i]
            });
          if (!a) {
            return false;
          }
        }
      }
      console.log(arr.find(_ => _.HeaderName == 'LineName'), arr);
      return {
        LineName: arr.find(_ => _.HeaderName == 'LineName') ? arr.find(_ => _.HeaderName == 'LineName').Value : '',
        Data: arr.filter(_ => _.HeaderName != 'LineName' && _.HeaderName != 'LineIndex')
      };
    },
    isNumber(e, sumbit) {
      let s = '';
      if (sumbit) {
        s = e;
      } else {
        s = e.target.value;
      }
      if (s && isNaN(s)) {
        this.tipword = '输入数字格式错误';
        this.tipchange = true;
        return false;
      }
      return true;
    },
    saveTable() {
      if (!this.seleTime) {
        this.tipword = '未选择时间';
        this.tipchange = true;
        return;
      }
      let arr = [];
      let temp = [...this.tableData, ...this.tableData2];
      for (let i in temp) {
        let a = this.objToArr(temp[i]);
        a && a.LineName && arr.push(a);
        if (!a) {
          return;
        }
      }

      this.$axios
        .post(
          `/api/ReportManagement/EditProcessParametersReport?time=${this.seleTime}`,
          arr
        )
        .then(res => {
          //弹窗保存成功
          if (res.data.code == 0) {
            this.tipword = '保存成功';
            this.tipchange = true;
          } else {
            this.tipword = res.data.msg;
            this.tipchange = true;
          }
          this.GetProcessParamDataByTime();
        });
    },
    tip1() {
      this.tipchange = false;
    },
    mouseDownHandleelse2(event) {
      event.currentTarget.style.cursor = 'move';
      window.onmousemove = this.mouseMoveHandleelse2;
    },
    mouseMoveHandleelse2(event) {
      let moveLeft = event.pageX - 100 + 'px';
      let moveTop = event.pageY + 80 + 'px';
      this.$refs.kongtiao2.style.left = moveLeft;
      this.$refs.kongtiao2.style.top = moveTop;
    },
    mouseUpHandleelse2(event) {
      window.onmousemove = null;
      event.currentTarget.style.cursor = 'move';
    },
    getNowTime() {
      let date = new Date();
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      let h = date.getHours();
      h = h < 10 ? '0' + h : h;
      let m = date.getMinutes();
      m = m < 10 ? '0' + m : m;
      let s = date.getSeconds();
      s = s < 10 ? '0' + s : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  mounted() {
    this.seleTime = this.getNowTime();
    this.isBSystem = eval(sessionStorage.getItem('isBSystem')) || false;
    this.GetProcessParamDataByTime();
  }
};
</script>
<style>
.ProcessParameterReport-Page .el-table--border td,
.ProcessParameterReport-Page .el-table--border th,
.ProcessParameterReport-Page .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right: 1px solid #304171;
  background: #121c3a;
}

.ProcessParameterReport-Page .el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #304171;
}

.ProcessParameterReport-Page .el-table--border th.gutter:last-of-type {
  background: #1e304a;
}

.ProcessParameterReport-Page .el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #081027;
}
</style>
<style lang="scss" scoped>
.ProcessParameterReport-Page {
  height: calc(100% - 160px);
  margin: 20px;
  margin-top: 110px;
  background-color: #081027;
  color: #fff;

  &.blackBlueBg {
    background-color: #081027;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
    color: #fff;
  }

  .page-center {
    width: 100%;
    height: 100%;
    background: #081027;
    border: 2px solid #2a3058;

    .select {
      height: 60px;
      background: #0b1530;
      border-bottom: 1px solid #38415a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      box-sizing: border-box;

      .select-l {
        display: flex;
        flex-direction: row;
        align-items: center;

        .select-text {
          font-size: 16px;
          font-weight: 400;
          color: #e4e4e4;
          margin-right: 6px;
        }

        ::v-deep .el-input__inner {
          border-radius: 0;
          height: 36px;
          line-height: 36px;
          width: 100%;
          background: #1d2846;
          border: 1px solid #445992 !important;
          font-size: 16px;
          color: #c6cad8;
        }

        ::v-deep .el-input__icon {
          line-height: 36px;
        }
      }

      .select-btn,
      .select-btn2,
      .select-btn3 {
        width: 120px;
        height: 40px;
        line-height: 0;
        background: #386df0;
        color: #fff;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
        border: 0;
      }

      .select-btn2 {
        background: transparent;
        border: 1px solid #46be05;
        color: #46be05;
        box-sizing: border-box;
      }

      .select-btn3 {
        background: transparent;
        border: 1px solid #fda100;
        color: #fda100;
        box-sizing: border-box;
      }

      .select-print {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
      }
    }

    .content {
      width: 100%;
      height: calc(100% - 60px);
      box-sizing: border-box;
      padding: 22px 20px;
      overflow-y: scroll;

      .table-content {
        width: 100%;
        height: 100%;

        .rowInput {
          width: 100%;
          height: 100%;
          border: none !important;
          background: transparent;
          color: #fff;
          font-size: 16px;
          text-align: center;
        }

        .left {
          width: 100%;
          text-align: left;
        }

        .white {
          color: #fff;
        }
      }
    }

    .content::-webkit-scrollbar {
      width: 0 !important;
    }
  }

  .tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;

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

    .tipword {
      width: 100%;
      margin-top: 40px;
      text-align: center;
    }

    .w {
      width: 100%;
      margin-top: 40px;
      text-align: center;
    }

    .tipdetermine {
      color: #ea9328;
      cursor: pointer;
      width: 310px;
      line-height: 30px;
      text-align: center;
      // margin-top: 40px;
      position: absolute;
      bottom: 20px;
      margin-left: 35px;
      height: 30px;
      background-color: #f3e3ad;
    }

    .delclass {
      width: 330px;
      line-height: 30px;
      margin-top: 40px;
      margin-left: 25px;
      height: 30px;

      .one {
        display: inline-block;
        height: 30px;
        width: 160px;
        text-align: center;
        background-color: #e0e0e0;
        color: #7e7e7e;
      }

      .two {
        display: inline-block;
        height: 30px;
        margin-left: 10px;
        width: 160px;
        background-color: #f3e3ad;
        text-align: center;
        color: #eeb764;
      }
    }
  }
}
</style>