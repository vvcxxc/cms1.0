<!--
 * @Description: 这是***页面（组件）
 * @Date: 2020-08-10 10:59:21
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2020-09-11 17:52:30
-->
<template>
    <div class="popBox">
        <div v-drager class="head">{{typeText}}{{title}}
           <div @click="can()" class="headImg"></div>
        </div>

        <div class="popCenten_box">
            <div class="popCenten">
                <div v-if="type != 6" class="name">
                    <span>{{name}}名称：</span>
                    <input v-model="nameV" class="nameipt" />
                </div>
                  <div v-if="type == 6" class="name">
                    <span>产品名称：</span>
                      <el-select class="apply" v-model="producV" clearable :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option
                        v-for="item in productions"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>

                 <div v-if="type == 7" style="margin-top:20px" class="name">
                    <span>工序名称：</span>
                    <el-select class="apply" v-model="workValue" clearable :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option
                        v-for="item in deviceOptions"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="type == 7" style="margin-top:20px" class="name">
                    <span>线体名称：</span>
                    <el-select class="apply" v-model="lineValue" clearable :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option
                        v-for="item in deviceOptions2"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>

                 <div v-if="type == 4" style="margin-top:10px" class="name">
                    <span>{{name}}编号：</span>
                    <input v-model="numberV" class="nameipt" />
                </div>
                 <div v-if="type == 5" style="margin-top:10px" class="name">
                    <span>{{name}}型号：</span>
                    <input v-model="modelV" class="nameipt" />
                </div>
                 <div v-if="type == 5" style="margin-top:10px" class="name">
                    <span>适用工艺：</span>
                     <el-select :disabled="istech" class="apply" v-model="applyValue" clearable :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                        <el-option
                        v-for="item in technologyOptions"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                 <div v-if="type==2 || type == 1 || type== 4" class="name">
                    <span>{{name}}描述：</span>
                    <textarea v-model="describeV" style="resize:none" class="nametextar" ></textarea>
                </div>
                <div v-if="type == 6" style="margin-top:10px" class="name">
                    <span>{{name}}编号：</span>
                    <input v-model="numberV2" class="nameipt" />
                </div>
                <div v-if="type == 6" class="name2" style="margin:15px auto">
                    <span>订单数量：</span>
                    <input @change="dNumFun()" style="width:460px;height:40px;margin-left:46px" v-model="dNum" type="text"/>
                </div>
                 <div v-if="type == 6" class="name2" style="margin:15px auto">
                    <span style="float:left;display:block">交货日期: </span>
                    <div style="float:left;width:461px;height:40px;margin-left:58px">
                        <el-date-picker
                            v-model="dtatime"
                            type="datetime"
                            :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate">
                        </el-date-picker>
                    </div>
                </div>
                <div v-if="type==3" class="namebtn">
                  <span>选择所包含的工序：</span>
                  <div @click="deleteFun2()" class="delete">
                    <span class="deText">删除</span>
                    <div class="deleteImg"></div>
                </div>
                <div @click="addFun()" class="add">
                    <span class="addText">添加</span>
                    <div class="addImg"></div>
                </div>
                </div>
                <div v-if="type==3" class="conterFool_middle">
                   <el-table
                    border
                    height="250"
                    class="conterFool_middle"
                    ref="multipleTable"
                    :data="tableDataList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <template slot="empty">
                        <span>{{lang.SCMSConsoleWebApiMySql_NoData}}</span>
                    </template>
                    <el-table-column
                        type="selection"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        label="序号"
                        :show-overflow-tooltip="true"
                        prop="number"
                        width="180">
                    </el-table-column>
                     <el-table-column
                        label="工序名称"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-select @change="wordSelectFun(scope.row)" v-model="scope.row.name" :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose">
                                <el-option
                                v-for="item in options"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            </div>
            <div class="btn">
                <div @click="can()" class="cancle">{{lang.PopupCommon_Cancel}}</div>
                <div @click="conserve()" class="add">{{lang.PopupCommon_Save}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
      data() {
        return {
            name:'',
            options: [],
            deviceOptions:[],
            deviceOptions2:[],
            productions:[],
            technologyOptions:[],
            tableDataList:[],
            tableDataListArr:[],
            title:'',
            typeText:'',
            nameV:'',//名称
            producV:'',//产品
            numberV:'',//编号
            numberV2:'',//编号2
            modelV:'',//型号
            describeV:'',//描述
            // num:1, //数量
            dNum:'',//订单数量
            dtatime:'',//交货日期
            applyValue:'',
            workValue:'',
            lineValue:'',
            editDataArr:[],
            istech:false,//适用工艺
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
      },
       directives: {
            drag: function(el) {
                let dragBox = el; //获取当前元素
                dragBox.onmousedown = e => {
                let box = document.querySelector('.popBox')
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - dragBox.offsetLeft;
                    let disY = e.clientY - dragBox.offsetTop;
                    document.onmousemove = e => {
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - (Number(disX));
                        let top = e.clientY - (Number(disY));
                        //移动当前元素
                        box.style.left = left + "px";
                        box.style.top = top + "px";
                    };
                    document.onmouseup = e => {
                          document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        },
      props:['type','typePop','data','tData','tData2'],
      watch:{
          tData(n,o){
              console.log('监听')
               this.init()
          },
          tData2(n,o){
              console.log('监听')
               this.init()
          }
      },
      created(){
          // 1为线体管理 2为工序管理 3为工艺管理 4为物料管理 5为产品管理 6为生产管理 7设备管理
          this.init()
      },
      methods:{
          init(){
              if(this.type == 1){
                    this.name = '线体'
                    this.title = '线体'
                }else if(this.type == 2){
                    this.name = '工序'
                    this.title = '工序'
                }else if(this.type == 3){
                    this.name = '工艺'
                    this.title = '工艺'
                    //工序赋值
                    this.options = []
                    
                  //中英文数字排序
                   var paishunArr = []
                   var arrData = []
                   for(let e=0;e<this.tData.length;e++){
                       paishunArr.push(this.tData[e].Name)
                    }
                    console.log('paishunArr11=>',paishunArr)
                    var bb = this.arrSortMinToMax(paishunArr)
                    console.log('bb==>1',bb)
                    for(let e1=0;e1<bb.length;e1++){
                        for(let e2=0;e2<this.tData.length;e2++){
                            if(bb[e1] == this.tData[e2].Name){
                                arrData.push(this.tData[e2])
                            }
                        }
                    }
                    for(let i=0;i<arrData.length;i++){
                        var value = {
                            id:arrData[i].ID,
                            name:arrData[i].Name
                        }
                        this.options.push(value)
                    }
                    console.log('工序赋值==》',this.options)
                    if(this.typePop == 'edit'){
                        //初始化工艺编辑下的表单
                        let ID = this.data.ID
                        this.editDataArr = []
                        
                         this.$axios({
                            method:"post",
                            url:`/api/Process/Process_WindowQuery?argID=${ID}`,
                        }).then((res)=>{
                            this.tableDataList = []
                                this.editDataArr = res.data.data
                                if(res.data.data.Cells.length != 0){
                                    for(let i=0;i<res.data.data.Cells.length;i++){
                                        var va = {
                                            id:res.data.data.Cells[i].ID,
                                            name:res.data.data.Cells[i].Name,
                                            number:res.data.data.Cells[i].NO
                                        }
                                        this.tableDataList.push(va)
                                    }
                                }
                         
                        }).catch(function(err){
                            console.log('err',err)
                        })
                    }
                }else if(this.type == 4){
                    this.name = '物料'
                    this.title = '物料'
                }else if(this.type == 5){
                    this.name = '产品'
                    this.title = '产品'

                    //中英文数字排序
                   var paishunArr1 = []
                   var arrData1 = []
                   for(let e=0;e<this.tData.length;e++){
                       paishunArr1.push(this.tData[e].Name)
                    }
                    var bb1 = this.arrSortMinToMax(paishunArr1)
                    for(let e1=0;e1<bb1.length;e1++){
                        for(let e2=0;e2<this.tData.length;e2++){
                            if(bb1[e1] == this.tData[e2].Name){
                                arrData1.push(this.tData[e2])
                            }
                        }
                    }

                    //工艺赋值
                      this.technologyOptions = []
                    for(let i2=0;i2<arrData1.length;i2++){
                        var value4 = {
                            id:arrData1[i2].ID,
                            name:arrData1[i2].Name
                        }
                        this.technologyOptions.push(value4)
                    }
                }else if(this.type == 6){
                    this.name = '订单'
                    this.title = "生产计划"
                    
                      //中英文数字排序
                   var paishunArr2 = []
                   var arrData2 = []
                   for(let e=0;e<this.tData.length;e++){
                       paishunArr2.push(this.tData[e].Name)
                    }
                    console.log('paishunArr2',paishunArr2)
                    var bb2 = this.arrSortMinToMax(paishunArr2)
                    console.log('bb2',bb2)
                    for(let e1=0;e1<bb2.length;e1++){
                        for(let e2=0;e2<this.tData.length;e2++){
                            if(bb2[e1] == this.tData[e2].Name){
                                arrData2.push(this.tData[e2])
                            }
                        }
                    }

                     //产品赋值
                      this.productions = []
                    for(let i2=0;i2<arrData2.length;i2++){
                        var value7 = {
                            id:arrData2[i2].ID,
                            name:arrData2[i2].Name,
                            PID:arrData2[i2].PID,
                        }
                        this.productions.push(value7)
                    }
                    this.dtatime = this.$moment().format('YYYY-MM-DD HH:mm:ss')

                }else if(this.type == 7){
                    this.name = '设备'
                    this.title = '设备'
                     //工序赋值
                    this.deviceOptions = []
                   
                    for(let i1=0;i1<this.tData.length;i1++){
                        var value6 = {
                            id:this.tData[i1].ID,
                            name:this.tData[i1].Name
                        }
                        this.deviceOptions.push(value6)
                    }
                     //工yi赋值
                    this.deviceOptions2 = []
                    for(let i2=0;i2<this.tData2.length;i2++){
                        var value5 = {
                            id:this.tData2[i2].ID,
                            name:this.tData2[i2].Name
                        }
                        this.deviceOptions2.push(value5)
                    }
                }

                if(this.typePop == 'add'){
                    this.typeText = '添加'
                }else{
                    this.typeText = '编辑'
                }
                if(this.typePop == 'edit'){
                    //编辑转态
                    this.nameV = this.data.Name
                    this.describeV = this.data.Desc
                    this.workValue = this.data.CellName
                    this.lineValue = this.data.LineName
                    this.numberV = this.data.MID
                    this.modelV = this.data.PID
                    this.applyValue = this.data.ProcessName

                    this.dNum = this.data.Quantity
                    this.numberV2 = this.data.PID
                    this.producV = this.data.ProductName
                    this.dtatime = this.data.DeliveryDt
                    console.log('this==>',this.data)
                }

          },
          //取消关闭弹窗
        can(){
            this.$parent.cancelFun()
        },
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        //保存
        conserve(){
            if(this.typePop == 'add'){
                var guid = this.guid()
                this.edit_Add_dataFun(guid)
                this.$parent.addFun(this.valuedata)
            }else{
                var guid1 = this.data.ID 
                this.edit_Add_dataFun(guid1)
                    if(this.type == '6'){
                        this.valuedata.Status = this.data.Status
                    }
                this.$parent.A_editFun(this.valuedata)
            }
        },
        //保存编辑数据格式
        edit_Add_dataFun(guidd){
            var guid = guidd
            var username
            if(sessionStorage.getItem('userInfo1') == null){
                username = 'Guest'
            }else{
                username = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserAccount
            }
            var newtime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
            this.valuedata = {}
                if(this.type ==1 || this.type==2 || this.type==4){
                   this.valuedata ={
                      Name:this.nameV,
                      Desc:this.describeV
                  }
                  if(this.type==4){
                        this.valuedata.MID = this.numberV
                  }
                }else if(this.type==3){
                     this.valuedata={
                        Name:this.nameV,
                        data:this.tableDataList
                    }
                }else if(this.type==5){
                    console.log('technologyOptions',this.technologyOptions)
                       this.valuedata={
                        Name:this.nameV,
                        PID:this.modelV,
                        ProcessName:this.applyValue
                    }
                    for(let i=0;i<this.technologyOptions.length;i++){
                             if( this.valuedata.ProcessName == this.technologyOptions[i].name){
                                 this.valuedata.ProcessID = this.technologyOptions[i].id
                                  break
                             }else{
                                 this.valuedata.ProcessID = ''
                             }               
                        }
                  
                }else if(this.type==6){
                    var time = this.$moment(this.dtatime).format('YYYY-MM-DD HH:mm:ss')
                     this.valuedata={
                        PID:this.numberV2,
                        Quantity:this.dNum,
                        DeliveryDt:time,
                        Status:1
                    }

                    if(this.tData != 0){
                        for(let i=0;i<this.tData.length;i++){
                            if(this.producV == this.tData[i].Name){
                                this.valuedata.ProductType = this.tData[i].PID
                                this.valuedata.ProductName = this.tData[i].Name
                                this.valuedata.ProductID = this.tData[i].ID
                            }
                        }
                    }else{
                        this.valuedata.ProductType = ''
                        this.valuedata.ProductName = ''
                        this.valuedata.ProductID = ''
                    }
                }else if(this.type==7){
                    this.valuedata = {
                        Name:this.nameV,
                    }
                    this.valuedata.LineName = this.lineValue
                    this.valuedata.CellName = this.workValue
                    if(this.deviceOptions2 !=0){
                        for(let i=0;i<this.deviceOptions2.length;i++){
                             if( this.valuedata.LineName == this.deviceOptions2[i].name){
                                 this.valuedata.LineID = this.deviceOptions2[i].id
                                  break
                             }else{
                                 this.valuedata.LineID = ''
                             }               
                        }
                    }else{
                        this.valuedata.LineID = ''
                    }
                    if(this.deviceOptions.length != 0 ){

                        for(let j=0;j<this.deviceOptions.length;j++){
                             if( this.valuedata.CellName == this.deviceOptions[j].name){
                                 this.valuedata.CellID = this.deviceOptions[j].id
                                 break
                             }else{
                                  this.valuedata.CellID = ''
                             }
                        }
                    }else{
                         this.valuedata.CellID =''
                    }
                }
                 this.valuedata.NO = 1
                 this.valuedata.ID = guid
                 if(this.type != 6){
                     this.valuedata.CreateTime = newtime
                 }
                 this.valuedata.UpdateUserName = username
                 console.log('ee',JSON.stringify(this.valuedata))
        },

        //订单数量
        dNumFun(){
           this.dNum = parseInt(this.dNum)
            if(String(this.dNum) == 'NaN'){
                this.dNum = ''
            }
        },
        //勾选值
        handleSelectionChange(val){
            console.log('val',val)
            this.tableDataListArr = val
        },
        //工艺4选择工序
        wordSelectFun(item){
            for(let i=0;i<this.options.length;i++){
                if(this.options[i].name == item.name){
                    item.id = this.options[i].id
                }
            }
        },
        //工艺4表单添加方法
        addFun(){
             var aa
             var id
            if(this.tData.length!=0){
               aa = this.tData[0].Name
               id = this.tData[0].ID
            }else{
                aa = ''
                id = ''
            }
            var value = {
                    number:1,
                    name:aa,
                    id:id
                }
                if(this.tableDataList.length >0){
                    value.number = this.tableDataList.length + 1
                }
            if(this.typePop != 'edit'){
                this.tableDataList.push(value)
            }else{
                //工艺4编辑转态问是否可添加
                let ID = this.data.ID
                  this.$axios({
                        method:"post",
                        url:`/api/Process/Process_WindowCheckAdd?argID=${ID}`,
                    }).then((res)=>{
                        if(res.data.code != 0){
                            this.$parent.Tips(res.data.msg)
                        }else{
                            this.tableDataList.push(value)
                        }
                    }).catch(function(err){
                        console.log('err',err)
                    })
            }
        },
        //工艺4删除单行或多行
        deFun(){
                for(let i=0;i<this.tableDataListArr.length;i++){
                    for(let j=0;j<this.tableDataList.length;j++){
                        if(this.tableDataListArr[i].number == this.tableDataList[j].number){
                            this.tableDataList.splice(j,1)
                            j--
                        }
                    }
                }
                if(this.tableDataList.length !=0){
                    for(let k=0;k<this.tableDataList.length;k++){
                        this.tableDataList[k].number = k + 1
                    }
                }
        },
        //工艺4表单删除方法
        deleteFun2(){
             if(this.tableDataListArr.length  != 0){
                if(this.typePop != 'edit'){
                this.deFun()
                }else{
                   //工艺4编辑转态问是否可删除
                    let ID = this.data.ID
                    var data = []
                    data.push(ID)
                    this.$axios({
                            method:"post",
                            url:`/api/Process/Process_WindowCheckDelete?argID=${ID}`,
                            data:data
                        }).then((res)=>{
                            if(res.data.code != 0){
                                this.$parent.Tips(res.data.msg)
                            }else{
                                this.deFun()
                            }
                        })
                }
            }
        },
        //关闭适用工艺
        istechFun(){
            this.istech = true
            console.log('调用了')
        },
       
        //排序（升序）
        arrMinNum(arr) {
            var minNum = Infinity,
            index = -1,
            minVul = "";
            for (var i = 0; i < arr.length; i++) {
            if (typeof arr[i] == "string") {
                
                var arrnum = 0
                for(let k=0;k<arr[i].length;k++){
                    arrnum = arrnum + arr[i][k].charCodeAt()
                }

                if (arrnum < minNum) {
                minNum = arrnum;
                minVul = arr[i];
                index = i;
                }
            } else {
                if (arr[i] < minNum) {
                minNum = arr[i];
                minVul = arr[i];
                index = i;
                }
            }
            }
            return { minNum: minVul, index: index };
        },
        arrSortMinToMax(arr) {
            var arrNew = [];
            var arrOld = arr.concat();
            for (var i = 0; i < arr.length; i++) {
            arrNew.push(this.arrMinNum(arrOld).minNum);
            arrOld.splice(this.arrMinNum(arrOld).index, 1);
            }
            return arrNew;
        }
          
      }
}
</script>
<style lang="scss">
.popBox{
  .el-table__header-wrapper{
    background: #5A6C98;
  }
   .el-table th.is-leaf{
     background: #5A6C98;
     color:#fff;
    
  }
  .el-table td, .el-table th.is-leaf{
       text-align: center;
  }
   .el-table--border th{
     border:1px solid #EBEEF5;
   }
   .el-date-editor.el-input, .el-date-editor.el-input__inner{
       width:100%;
   }
}
</style>
<style lang="scss" scoped>
    .popBox{
        width:900px;
        height:684px;
        background:rgba(238,238,238,1);
        box-shadow:-7px 7px 50px 0px rgba(51,51,51,0.5);
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0;
        bottom: 0;
        margin:auto;
        z-index: 10;
        .apply{
            width:460px;
            height: 40px;
            margin-left: 48px;
        }
        .head{
            position: relative;
            line-height: 60px;
            text-align: center;
            width:900px;
            height:60px;
            background:rgba(37,92,193,1);
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(238,238,238,1);
            user-select: none;
        }
        .headImg{
            position: absolute;
            right: 12px;
            top: 12px;
            width:36px;
            height: 36px;
            background:url('../../../assets/images/no.png') ;
            background-size:cover ;
            cursor: pointer;
        }
        .popCenten_box{
            height:601px;
            width:100%;
            background: #EEEEEE;
            .popCenten{
                width:840px;
                height:518px;
                background: #fff;
                margin-top:30px;
                margin-left:30px;
                padding-top:42px;
            }
            .name2{
                width: 70%;
                margin: auto;
                line-height: 40px;
            }
            .name{
                width: 70%;
                // height: 40px;
                margin: auto;
                line-height: 40px;
                overflow: hidden;
                .nameipt{
                    width: 460px;
                    height: 40px;
                    float: right;
                }
                .nametextar{
                     width: 460px;
                     margin-top:10px;
                    height: 60px;
                    float: right;
                }
                
            }
            .namebtn{
                width: 70%;
                height: 40px;
                margin: auto;
                line-height: 40px;
                overflow: hidden;
                margin-top:35px;
                margin-bottom:22px;
            }
            .conterFool_middle{
                width: 70%;
                margin: auto;
                border:1px solid #eee;
            }
        }
        .btn{
            width:100%;
            height: 40px;
            overflow: hidden;
            margin:20px 0 0 280px;
            .cancle{
                width: 160px;
                height: 40px;
                float: left;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                user-select: none;
                background:rgba(255,255,255,1);
                border:1px solid rgba(37,92,193,1);
                border-radius:4px;
                box-sizing: border-box;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-right: 20px;
            }
            .add{
                width: 160px;
                height: 40px;
                float: left;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                user-select: none;
                background:rgba(37,92,193,1);
                border:1px solid rgba(37,92,193,1);
                border-radius:4px;
                box-sizing: border-box;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
        }
        .add{
            float: right;
            line-height: 40px;
            position: relative;
            width:120px;
            height:40px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(70,190,5,1);
            border-radius:4px;
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(70,190,5,1);
            margin-right: 14px;
            cursor: pointer;
            user-select: none;
            .addText{
                margin-left:54px;
            }
        }
        .delete{
            float: right;
            line-height: 40px;
            position: relative;
            width:120px;
            height:40px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(74,191,205,1);
            border-radius:4px;
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(74,191,205,1);
            cursor: pointer;
            user-select: none;
            .deText{
                margin-left:54px;
            }
        }
        .addImg{
        position: absolute;
        width: 20px;
        height: 20px;
        top:10px;
        left:32px;
        background:url("../../../assets/images/icon_addfile.png");
        background-size:cover ;
        }
        .deleteImg{
        position: absolute;
        width: 18px;
        height: 20px;
        top:10px;
        left:32px;
        background: url('../../../assets/images/icon_dell.png');
        background-size:cover ;
        }
    }
</style>