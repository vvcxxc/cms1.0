<template>
    <div class="variableSelect">
        <div class="myDialog">
            <!-- <div v-drag class="myDialog"> -->
            <div class="popHeader">
                选择变量
                <img :src="no" alt="" @click="handleClick('no')" />
            </div>
            <div class="popContent">
                <div class="mySearch">
                    <span class="text">设备：</span>
                    <el-select
                        v-model="oneselect"
                        placeholder=""
                        style="width: 130px; height: 30px"
                        class="space"
                        @change="handleSelect"
                    >
                        <el-option
                            v-for="(item, index) in projectlist"
                            :key="index"
                            :value="item.DeviceName"
                        >
                            {{ item.DisplayDeviceName }}
                        </el-option>
                    </el-select>
                    <span class="text">组名：</span>
                    <el-select
                        v-model="twoselect"
                        placeholder=""
                        style="width: 130px; height: 30px"
                        class="space"
                        @change="handleSelect"
                    >
                        <el-option
                            v-for="(item, index) in projectlist2"
                            :key="index"
                            :value="item.GroupName"
                        >
                            {{ item.GroupName }}
                        </el-option>
                    </el-select>
                    <span class="text">数据类型：</span>
                    <el-select
                        v-model="threeselect"
                        placeholder=""
                        style="width: 130px; height: 30px"
                        class="space"
                        @change="handleSelect"
                    >
                        <el-option
                            v-for="(item, index) in projectlist3"
                            :key="index"
                            :value="item.Value"
                        >
                            {{ item.Text }}
                        </el-option>
                    </el-select>
                    <el-input
                        v-model="projectkeyword"
                        style="width: 130px; height: 30px"
                        placeholder="关键字"
                        class="space"
                        @keyup.enter.native="handleSelect"
                    ></el-input>
                    <el-button class="btn btn2" @click="handleSelect">
                        查询
                    </el-button>
                </div>
                <div class="myTable">
                    <el-table
                        :data="tableData"
                        height="100%"
                        border
                        ref="multipleTable"
                        stripe
                        style="width: 100%"
                        :header-cell-style="{
                            background: '#E1EDFA',
                            color: '#769DE7',
                            'border-left': '1px solid #cccccc',
                            height: '50px',
                            padding: '0',
                        }"
                        @selection-change="handleCurrentChange"
                    >
                        <el-table-column type="selection" width="55" />
                        <el-table-column
                            prop="Device"
                            label="设备名称"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="DateType"
                            label="数据类型"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="Name"
                            label="变量名"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="Descript"
                            label="描述"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="Address"
                            label="变量地址"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                    </el-table>
                </div>
                <div class="pages-container">
                    <my-page :pageData="pageDate" @req="req"></my-page>
                </div>
            </div>
            <div class="popBtn">
                <el-button class="btn" @click="handleClick('no')">
                    取消
                </el-button>
                <el-button
                    class="btn"
                    @click="handleClick('yes')"
                    style="
                        margin-right: 40px;
                        background: rgba(56, 109, 240);
                        border: 1px solid #386df0;
                    "
                >
                    确定
                </el-button>
            </div>
        </div>

        <tip-pop
            v-if="isTipShow"
            tipText="请选择变量"
            :noCancel="true"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>

<script>
import MyPage from '@/components/public/Pages.vue';
import TipPop from '@/components/public/tipPop.vue';

export default {
    components: {
        MyPage,
        TipPop,
    },
    props: ['data'],
    name: 'SelectVariable',
    data() {
        return {
            no: require('@/assets/images/no.png'),
            formQuery: {
                sb: '',
                zm: '',
                sjlx: '',
                key: '',
            },
            pageDate: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false,
            }, // 分页数据
            tableData: [],
            selectData: null,
            isTipShow: false,
            oneselect: '',
            twoselect: '',
            threeselect: '',
            projectlist: [],
            projectlist2: [],
            projectlist3: [],
            projectkeyword: '',
        };
    },
    created() {
        this.$axios({
            url: `/api/ProcessParameterConfigure/GstCondition`,
            method: 'post',
            data: this.data,
        })
            .then((res) => {
                this.projectlist = res.data.data;
                this.projectlist2 = JSON.parse(
                    JSON.stringify(this.projectlist[0].Groups)
                );
                this.projectlist3 = JSON.parse(
                    JSON.stringify(this.projectlist2[0].DataTypes)
                );
                this.oneselect = JSON.parse(
                    JSON.stringify(this.projectlist[0].DeviceName)
                );
                this.twoselect = JSON.parse(
                    JSON.stringify(this.projectlist2[0].GroupName)
                );
                // this.threeselect = this.projectlist3[0].Value;
                this.threeselect = JSON.parse(JSON.stringify('不限'));
            })
            .then(() => {
                this.initData();
            });
    },
    methods: {
        initData() {
            let arr = [];
            if (this.threeselect == '不限') {
                this.projectlist3
                    .filter((f) => f.Value !== '不限')
                    .forEach((item) => {
                        arr.push(item.Value);
                    });
            } else {
                arr.push(this.threeselect);
            }
            this.$axios({
                method: 'post',
                url: `/api/ProcessParameterConfigure/GstVariableList`,
                data: {
                    argDevice: this.oneselect,
                    argGroup: this.twoselect,
                    argDataType: arr.length ? arr : null,
                    argKeyWord: this.projectkeyword,
                    argPageSize: this.pageDate.PageSize,
                    argPageIndex: this.pageDate.PageIndex,
                },
            }).then((res) => {
                this.tableData = res.data.data.DataList;
                this.pageDate = res.data.data.ParameterList;
                this.$nextTick(() => {
                    this.$refs.multipleTable.doLayout();
                });
            });
        },
        // 分页事件
        req(PageIndex, s) {
            this.pageDate = {
                ...this.pageDate,
                PageIndex,
            };
            this.initData();
        },
        handleSelect() {
            this.initData();
        },
        handleCurrentChange(row) {
            this.selectData = row;
        },
        handleClick(str) {
            if (str == 'yes' && !this.selectData) {
                this.isTipShow = true;
                return;
            }
            this.$emit('variableSelectCallBack', str, this.selectData);
        },
        tipCallBack() {
            this.isTipShow = false;
        },
    },
    directives: {
        drag: function (el) {
            let dragBox = el; //获取当前元素
            dragBox.onmousedown = (e) => {
                //算出鼠标相对元素的位置
                let disX = e.clientX - dragBox.offsetLeft;
                let disY = e.clientY - dragBox.offsetTop;
                document.onmousemove = (e) => {
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    //移动当前元素
                    dragBox.style.left = left + 'px';
                    dragBox.style.top = top + 'px';
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.variableSelect {
    position: fixed;
    top: 20%;
    left: calc((100% - 1122px) / 2);
    z-index: 101;

    .myDialog {
        position: relative;
        width: 1122px;
        height: 615px;
        // top: 50%;
        // transform: translateY(-50%);
        // margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 1122px;
            height: 60px;
            background: rgba(56, 109, 240);
            line-height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            position: relative;
            img {
                width: 26px;
                height: 26px;
                position: absolute;
                top: 18px;
                right: 20px;
                cursor: pointer;
            }
        }

        .popContent {
            width: calc(100% - 122px);
            height: calc(100% - 190px);
            margin: 32px 61px;
            border: 1px solid #d0d0d0;
            padding: 10px 24px;

            ::v-deep .el-input__inner {
                height: 30px;
            }

            ::v-deep .el-input__icon {
                line-height: 30px;
            }

            ::v-deep .el-button {
                padding: 0;
            }

            .text {
                font-size: 12px;
                color: #666666;
            }

            .space {
                margin-right: 20px;
            }

            .btn {
                width: 120px;
                height: 30px;
                background: #fff;
                border: 1px solid #386df0;
                opacity: 1;
                border-radius: 4px;
                font-size: 14px;
                color: #386df0;
            }

            .myTable {
                height: calc(100% - 90px);
                width: 100%;
                margin-top: 10px;
                border: 1px solid #d0d0d0;
                padding: 12px;
            }
        }

        .popBtn {
            width: 100%;
            height: 60px;
            text-align: right;
            line-height: 60px;

            .btn {
                width: 100px;
                height: 38px;
                background: rgba(153, 153, 153);
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 20px;
                border: 1px solid #999999;
            }
        }
    }
}
::v-deep .el-form-item.is-error .el-input__inner {
    border-color: transparent;
}
</style>