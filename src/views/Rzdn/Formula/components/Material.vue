<template>
    <div class="material">
        <div class="material-header">
            <el-input class="header-input" v-model="options" placeholder="请输入关键字"></el-input>
            <span class="material-title">产品类型：</span>
            <el-select v-model="Metral" class="header-input">
                <el-option v-for="options in MetralTypeList" :key="options.Name + options.ID" :label="options.Name"
                    :value="options.ID"></el-option>
            </el-select>

            <el-button class="btn" @click="searchBtn">查询</el-button>
        </div>
        <div class="material-table">
            <my-table :isSelection="true" :columnList="materialColumnList" :tableDataList="tableDataList"
                @selectionChange="selectionChange"></my-table>
        </div>
        <my-page :pageData="pageData" @changePage="changePage"></my-page>

        <div class="footer">
            <my-button class="btn" @btnClick="colse()">取消</my-button>
            <my-button class="btn ok" @btnClick="ok()">保存</my-button>
        </div>
    </div>
</template>

<script>
import MyTable from '@/newComponents/Table.vue';
import MyPage from '@/newComponents/Page.vue';
import MyButton from '@/newComponents/Button.vue';
import { materialManageColumnList } from '../index';
export default {
    props: {
        formulaId: {
            type: String,
            default: null,
        },
    },
    components: {
        MyTable,
        MyPage,
        MyButton,
    },
    data() {
        return {
            materialColumnList: materialManageColumnList,
            pageData: {
                PageIndex: 1,
                TotalCount: 0,
                PageSize: 50,
            },
            tableDataList: [],
            keyWord: '',
            selectionList: [],
            MetralTypeList: [],
            Metral: '',
        };
    },
    methods: {
        colse() {
            this.$emit('colse');
        },
        //保存
        ok() {
            if (this.selectionList.length <= 0) {
                this.confirm_Pop2(this, '请先选择需要保存的物料数据');
                return;
            }
            let t1 = this.selectionList.map(_ => _.No);
            let t2 = Array.from(new Set(t1))
            if (t1.length != t2.length) {
                this.confirm_Pop2(this, '不允许选择相同物料编码的对象');
                return;
            }
            let list = [];
            this.selectionList.forEach((item) => {
                list.push({
                    FormularId: this.formulaId, //配方ID
                    MaterialID: item.ID, //物料ID
                });
            });
            this.$axios({
                method: 'POST',
                url: `/api/Formula/AddFormulaMaterialInfo`,
                data: list,
            })
                .then((res) => {
                    const data = res.data;
                    if (data.code == 0) {
                        this.$emit('ok', data.data);
                        this.message_Success(this, '保存成功');
                    }
                    // console.log(data)
                })
                .catch((err) => { });
        },
        //选择物料
        selectionChange(selection) {
            this.selectionList = selection;
        },
        //查找
        searchBtn() {
            this.pageData.PageIndex = 1;
            this.getMaterialInfoList();
        },
        //changePage分页
        changePage(PageIndex) {
            this.pageData.PageIndex = PageIndex;
            this.getMaterialInfoList();
        },
        getMaterialInit() {
            this.$axios({
                method: 'GET',
                url: `/api/LocationSetting/GetMaterialType?key=`,
            }).then((res) => {
                const data = res.data;
                if (data.code == 0) {
                    data.data.unshift({ ID: '', Name: "不限" })
                    this.MetralTypeList = data.data;
                    if (data.data.length) {
                        this.Metral = data.data[0].ID;
                    }
                    this.getMaterialInfoList();
                } else {
                    this.confirm_Pop2(this, data.msg);
                }
            });
        },
        //获取物料列表
        getMaterialInfoList() {
            let data = {
                KeyWord: this.keyWord, //null即忽略
                PageIndex: this.pageData.PageIndex,
                PageSize: this.pageData.PageSize,
                MaterialTypeID: this.Metral,
            };
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: `/api/MaterialInfo/GetMaterialInfoListPage`,
                    data: data,
                })
                    .then((res) => {
                        const data = res.data;
                        if (data.code == 0) {
                            // console.log(data)
                            this.tableDataList = data.data.Data.map((_, idx) => ({ ..._, order: Number(idx) + 1 }));
                            this.pageData.TotalCount = data.data.TotalCount;
                            resolve(data.data);
                        } else {
                            // this.confirm_Pop2(this, data.msg)
                            reject(data.msg);
                        }
                        // console.log(data)
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
    mounted() {
        // console.log(333)
        // this.getMaterialInfoList();
        this.getMaterialInit()
    },
};
</script>
<style scoped lang="scss">
.material {
    &-header {
        padding-bottom: 10px;

        .header-input {
            width: 200px;
        }

        .btn {
            width: 100px;
            height: 40px;
            font-weight: 600;
            font-size: 16px;
            color: #fff;
            margin-left: 10px;
            background-color: rgb(56, 109, 240);
        }
    }

    &-table {
        height: 450px;
    }

    ::v-deep .page-container {
        flex-wrap: wrap;
    }

    ::v-deep .page-container .left {
        margin: 0;
        padding: 10px 0;
        width: 100%;
    }

    ::v-deep .page-container .right {
        justify-content: end;
        width: 100%;
    }

    .footer {
        text-align: right;
        padding-top: 10px;

        .btn {
            min-width: 100px;
            height: 38px;
            background: #999999;
            border: 0;
            font-size: 16px;
            color: #ffffff;
        }

        .ok {
            background: #386df0;
        }
    }

    .material-title {
        padding: 0 16px;
    }
}
</style>