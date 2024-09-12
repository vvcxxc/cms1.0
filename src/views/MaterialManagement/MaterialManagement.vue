<template>
    <div class="material-management">
        <div class="material-content">
            <div class="material-title">物料BOM管理</div>

            <div class="material-search">
                <div>图号</div>
                <el-select
                    clearable
                    filterable
                    :style="[
                        { fontSize: '16px' },
                        { width: '120px' },
                        { height: '40px' },
                        { marginLeft: '15px' },
                        { marginRight: '15px' }
                    ]"
                >
                    <el-option label="" :value="11"></el-option>
                </el-select>
                <el-input
                    placeholder="请输入关键字"
                    clearable
                    :style="[
                        { fontSize: '16px' },
                        { width: '210px' },
                        { height: '40px' }
                    ]"
                ></el-input>
                <div class="btn">查询</div>
                <div class="btn greenBtn" @click="openAddOrEditBOM('add')">
                    新建BOM表
                </div>
                <div class="btn yellowBtn" @click="openAddOrEditBOM('edit')">
                    编辑
                </div>
                <div class="btn blueBtn" @click="openVerificationPopShow">
                    校验设置
                </div>
                <div class="btn greenBtn" @click="openSupplierInformationShow">
                    供应商信息
                </div>
                <div class="search-right">
                    <div class="btn ExportBtn">导入</div>
                    <div class="btn ExportBtn">导出</div>
                </div>
            </div>
            <div class="material-table">
                <el-table
                    :data="[]"
                    border
                    highlight-current-row
                    header-row-class-name="light-blue"
                    row-class-name="high-light"
                    height="100%"
                    width="100%"
                    :style="{ 'font-size': 14 + 'px' }"
                    ref="mmtable"
                    :header-cell-style="{
                        background:
                            $store.state.color == 'grey'
                                ? '#D9DBDE'
                                : '#5a6c98',
                        color: $store.state.color == 'grey' ? '#000' : '#fff',
                        'border-left': '1px solid #cccccc',
                        height: 50 + 'px',
                        'font-size': 14 + 'px',
                        padding: '0'
                    }"
                >
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                    <el-table-column
                        label="序号"
                        prop="Number"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        label="添加日期时间"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="物料描述（图号）"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="物料编号"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="供应商代号"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="供应商名称"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="批次号"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="组件描述"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="组件编号"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="组件单位"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="使用量（今日）"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="工序"
                        :width="180"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="pages-container">
                <my-page :pageData="pageData" @req="req"></my-page>
            </div>
        </div>

        <div class="addOrEditBOM" ref="addOrEditBOM" v-if="addOrEditBOMShow">
            <div class="poptop">
                <div
                    class="tiptop-drag"
                    @mousedown="mouseDownHandleelse3($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span v-show="addOrEditBOMType == 'add'">新增</span>
                <span v-show="addOrEditBOMType == 'edit'">编辑</span>
                <img
                    @click="closeAddOrEditBOM"
                    class="closeWind"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="PopContent">
                <div class="addOrEditBOM-search">
                    <div>图号：</div>
                    <el-input
                        placeholder="请输入"
                        clearable
                        :style="[
                            { fontSize: '16px' },
                            { width: '120px' },
                            { height: '40px' },
                            { margin: '0 10px' }
                        ]"
                    ></el-input>
                    <div>产品编号：</div>
                    <el-input
                        placeholder="请输入"
                        clearable
                        :style="[
                            { fontSize: '16px' },
                            { width: '210px' },
                            { height: '40px' }
                        ]"
                    ></el-input>
                    <div class="addOrEditBOM-right">
                        <div class="btn greenBtn" @click="openMaterialShow">
                            添加物料
                        </div>
                        <div class="btn greyBtn">删除</div>
                    </div>
                </div>
                <div class="addOrEditBOM-content">
                    <div class="addOrEditBOM-group">
                        <div class="group-label">111</div>
                        <div class="group-label select-group">222</div>
                    </div>
                    <div class="addOrEditBOM-table">
                        <el-table
                            :data="[]"
                            height="100%"
                            width="100%"
                            ref="mmtable"
                            :header-cell-style="{
                                background: '#DCF0F9',
                                color: '#4270E4',
                                'border-left': '1px solid #cccccc',
                                height: 50 + 'px',
                                'font-size': 14 + 'px',
                                padding: '0'
                            }"
                        >
                            <template slot="empty">
                                <span>暂无数据</span>
                            </template>
                            <el-table-column
                                label="序号"
                                prop="Number"
                                width="100"
                            ></el-table-column>
                            <el-table-column
                                label="组件描述"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                label="组件编号"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                label="单位"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                label="单次使用量"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                label="使用总量"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="addOrEditBOM-footer">
                    <div class="btn cancleBtn" @click="closeAddOrEditBOM">
                        取消
                    </div>
                    <div class="btn">确定</div>
                </div>
            </div>
        </div>

        <div class="addMaterial" ref="addMaterial" v-if="addMaterialShow">
            <div class="Materialtop">
                <div
                    class="material-drag"
                    @mousedown="mouseDownHandleelse4($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>新增</span>
                <img
                    @click="closeMaterialShow"
                    class="closMaterial"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="addMaterial-content">
                <div class="addMaterial-item">
                    <div class="addMaterial-key">组件描述</div>
                    <input class="addMaterial-input" />
                </div>
                <div class="addMaterial-item">
                    <div class="addMaterial-key">组件编号</div>
                    <input class="addMaterial-input" />
                </div>
                <div class="addMaterial-item">
                    <div class="addMaterial-key">单位</div>
                    <input class="addMaterial-input" />
                </div>
                <div class="addMaterial-item">
                    <div class="addMaterial-key">单次使用数量</div>
                    <input class="addMaterial-input" />
                </div>
                <div class="addMaterial-item">
                    <div class="addMaterial-key">使用总量</div>
                    <input class="addMaterial-input" />
                </div>
            </div>
            <div class="addMaterial-footer">
                <div class="btn cancleBtn" @click="closeMaterialShow">取消</div>
                <div class="btn">确定</div>
            </div>
        </div>

        <div
            class="verification"
            ref="verificationPop"
            v-if="verificationPopShow"
        >
            <div class="Materialtop">
                <div
                    class="material-drag"
                    @mousedown="mouseDownHandleelse5($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>验证</span>
                <img
                    @click="closeVerificationPopShow"
                    class="closMaterial"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="addMaterial-content">
                <div class="addMaterial-item">
                    <div class="addMaterial-key">账号</div>
                    <input class="addMaterial-input" />
                </div>
                <div class="addMaterial-item">
                    <div class="addMaterial-key">密码</div>
                    <input class="addMaterial-input" />
                </div>
            </div>
            <div class="addMaterial-footer">
                <div class="btn cancleBtn" @click="closeVerificationPopShow">
                    取消
                </div>
                <div class="btn" @click="sumbitVerification">确定</div>
            </div>
        </div>

        <div
            class="jurisdiction"
            ref="jurisdictionSelectPop"
            v-if="jurisdictionPopShow"
        >
            <div class="Materialtop">
                <div
                    class="material-drag"
                    @mousedown="mouseDownHandleelse6($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>校验设置</span>
                <img
                    @click="closeJurisdictionPopShow"
                    class="closMaterial"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="jurisdiction-content">
                <el-radio-group
                    v-model="jurisdictionRadio"
                    class="ml-4"
                    :style="{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start', //el-radio有paddingright,flexend会对不齐
                        height: '70px',
                        width: '150px'
                    }"
                >
                    <el-radio :label="1" size="large">开启物料校验</el-radio>
                    <el-radio :label="2" size="large">关闭物料校验</el-radio>
                </el-radio-group>
            </div>
            <div class="addMaterial-footer">
                <div class="btn cancleBtn" @click="closeJurisdictionPopShow">
                    取消
                </div>
                <div class="btn">确定</div>
            </div>
        </div>

        <div
            class="SupplierInformation"
            ref="SupplierInformation"
            v-if="SupplierInformationShow"
        >
            <div class="poptop">
                <div
                    class="tiptop-drag"
                    @mousedown="mouseDownHandleelse7($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>供应商信息</span>
                <img
                    class="closeWind"
                    @click="closeSupplierInformationShow"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="PopContent">
                <div class="addOrEditBOM-search">
                    <div class="addOrEditBOM-right">
                        <div
                            class="btn greenBtn"
                            @click="openAddSupplierInformationShow"
                        >
                            添加
                        </div>
                        <div class="btn greyBtn">删除</div>
                    </div>
                </div>
                <div class="addOrEditBOM-content">
                    <el-table
                        :data="[]"
                        height="100%"
                        width="100%"
                        ref="mytable"
                        :header-cell-style="{
                            background: '#DCF0F9',
                            color: '#4270E4',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            type="selection"
                            width="55"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            label="序号"
                            prop="Number"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="供应商代号"
                            prop="Number"
                        ></el-table-column>
                        <el-table-column
                            label="供应商名称"
                            prop="Number"
                        ></el-table-column>
                    </el-table>
                </div>
                <div class="addOrEditBOM-footer">
                    <div
                        class="btn cancleBtn"
                        @click="closeSupplierInformationShow"
                    >
                        取消
                    </div>
                    <div class="btn">确定</div>
                </div>
            </div>
        </div>

        <div
            class="addSupplierInformation"
            ref="addSupplierInformationPop"
            v-if="AddSupplierInformationShow"
        >
            <div class="Materialtop">
                <div
                    class="material-drag"
                    @mousedown="mouseDownHandleelse8($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>添加供应商信息</span>
                <img
                    @click="closeAddSupplierInformationShow"
                    class="closMaterial"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="addMaterial-content">
                <div class="addMaterial-item">
                    <div class="addMaterial-key">供应商代号</div>
                    <input class="addMaterial-input" />
                </div>
                <div class="addMaterial-item">
                    <div class="addMaterial-key">供应商名称</div>
                    <input class="addMaterial-input" />
                </div>
            </div>
            <div class="addMaterial-footer">
                <div
                    class="btn cancleBtn"
                    @click="closeAddSupplierInformationShow"
                >
                    取消
                </div>
                <div class="btn">确定</div>
            </div>
        </div>

        <div class="tip" ref="kongtiao2" v-if="tipchange">
            <div
                class="tiptop"
                @mousedown="mouseDownHandleelse2($event)"
                @mouseup="mouseUpHandleelse($event)"
            >
                <img :src="require('../../assets/images/gth.png')" alt />
                <span>提示</span>
            </div>
            <div class="tipcontanin">
                <div class="tipword" v-if="deltrue">{{ tipword }}</div>
                <div class="w" v-if="!deltrue">{{ tipword }}</div>
                <div class="tipdetermine" @click="tip1" v-if="deltrue">
                    确定
                </div>
                <div class="delclass" v-if="!deltrue">
                    <div class="one">否</div>
                    <div class="two">是</div>
                </div>
            </div>
        </div>
        <div class="cover1" v-if="setionchange"></div>
    </div>
</template>

<script>
import MyPage from '../../components/public/Pages.vue';
export default {
    components: {
        MyPage
    },
    data() {
        return {
            searchData: {
                argType: '',
                argKeyword: ''
            },
            pageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            deltrue: true,
            tipword: '',
            tipchange: false,
            addOrEditBOMShow: false,
            addOrEditBOMType: '',
            addMaterialShow: false,
            verificationPopShow: false,
            jurisdictionPopShow: false,
            jurisdictionRadio: 1,
            SupplierInformationShow: false,
            AddSupplierInformationShow: false
        };
    },
    computed: {
        setionchange() {
            return (
                this.addOrEditBOMShow ||
                this.addMaterialShow ||
                this.verificationPopShow ||
                this.jurisdictionPopShow ||
                this.SupplierInformationShow ||
                this.AddSupplierInformationShow
            );
        }
    },
    mounted() {},
    created() {},
    methods: {
        openAddOrEditBOM(type) {
            this.addOrEditBOMShow = true;
            this.addOrEditBOMType = type;
        },
        closeAddOrEditBOM() {
            this.addOrEditBOMShow = false;
            this.addOrEditBOMType = '';
        },
        openMaterialShow() {
            this.addMaterialShow = true;
        },
        closeMaterialShow() {
            this.addMaterialShow = false;
        },
        openVerificationPopShow() {
            this.verificationPopShow = true;
        },
        closeVerificationPopShow() {
            this.verificationPopShow = false;
        },
        //校验弹窗确认按钮
        sumbitVerification() {
            //校验
            this.openJurisdictionPopShow();
            this.closeVerificationPopShow();
        },
        openSupplierInformationShow() {
            this.SupplierInformationShow = true;
        },
        closeSupplierInformationShow() {
            this.SupplierInformationShow = false;
        },

        openAddSupplierInformationShow() {
            this.AddSupplierInformationShow = true;
        },
        closeAddSupplierInformationShow() {
            this.AddSupplierInformationShow = false;
        },
        openJurisdictionPopShow() {
            this.jurisdictionPopShow = true;
        },

        closeJurisdictionPopShow() {
            this.jurisdictionPopShow = false;
        },
        tip1() {
            this.tipchange = false;
        },
        isPositiveInteger(s) {
            //是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        },
        req(pageIndex, s) {
            if (s == 'jump') {
                if (!this.isPositiveInteger(pageIndex)) {
                    //
                    return;
                } else {
                    if (
                        pageIndex !== 1 &&
                        pageIndex !== this.pageData.TotalPage
                    ) {
                        if (
                            pageIndex < 1 ||
                            pageIndex > this.pageData.TotalPage
                        ) {
                            //
                            return;
                        }
                    }
                }
            }
            //axios
        },
        mouseDownHandleelse2(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse2;
        },
        mouseMoveHandleelse2(event) {
            let moveLeft = event.pageX - 190 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.kongtiao2.style.left = moveLeft;
            this.$refs.kongtiao2.style.top = moveTop;
        },
        mouseDownHandleelse3(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse3;
            event.stopPropagation();
        },

        mouseMoveHandleelse3(event) {
            let moveLeft = event.pageX - 800 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.addOrEditBOM.style.left = moveLeft;
            this.$refs.addOrEditBOM.style.top = moveTop;
        },
        mouseDownHandleelse4(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse4;
            event.stopPropagation();
        },

        mouseMoveHandleelse4(event) {
            let moveLeft = event.pageX - 400 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.addMaterial.style.left = moveLeft;
            this.$refs.addMaterial.style.top = moveTop;
        },
        mouseDownHandleelse5(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse5;
            event.stopPropagation();
        },

        mouseMoveHandleelse5(event) {
            let moveLeft = event.pageX - 400 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.verificationPop.style.left = moveLeft;
            this.$refs.verificationPop.style.top = moveTop;
        },
        mouseDownHandleelse6(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse6;
            event.stopPropagation();
        },
        mouseMoveHandleelse6(event) {
            let moveLeft = event.pageX - 80 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.jurisdictionSelectPop.style.left = moveLeft;
            this.$refs.jurisdictionSelectPop.style.top = moveTop;
        },
        mouseDownHandleelse7(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse7;
            event.stopPropagation();
        },

        mouseMoveHandleelse7(event) {
            let moveLeft = event.pageX - 800 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.SupplierInformation.style.left = moveLeft;
            this.$refs.SupplierInformation.style.top = moveTop;
        },
        mouseDownHandleelse8(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse8;
            event.stopPropagation();
        },

        mouseMoveHandleelse8(event) {
            let moveLeft = event.pageX - 400 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.addSupplierInformationPop.style.left = moveLeft;
            this.$refs.addSupplierInformationPop.style.top = moveTop;
        },
        mouseUpHandleelse(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        }
    }
};
</script>

<style lang="scss" scoped>
.material-management {
    width: 100%;
    height: calc(100% - 130px);
    color: #000;
    margin-top: 100px;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
    .material-content {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        .material-title {
            width: 100%;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #4270e4;
            text-indent: 5px;
            font-size: 18px;
            font-weight: 500;
        }
        .material-title::before {
            content: '';
            height: 21px;
            width: 2px;
            background-color: #4270e4;
        }
        .material-search {
            width: 100%;
            height: 60px;
            background-color: #dddddd;
            display: flex;
            align-items: center;
            padding: 0 16px;
            box-sizing: border-box;
            position: relative;

            .search-right {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(0, -50%);
                height: 100%;
                width: 250px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 15px;
                .ExportBtn {
                    background: #fff;
                    color: #4270e4;
                    border: 1px solid #4270e4;
                }
            }
        }
        .material-table {
            width: 100%;
            height: calc(100% - 175px);
            margin-top: 10px;
        }
        .pages-container {
            width: 100%;
            height: 60px;
        }
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 40px;
        background-color: #4270e4;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        margin-left: 10px;
        cursor: pointer;
    }
    .greenBtn {
        background: #fff;
        color: #46be05;
        border: 1px solid #46be05;
    }
    .yellowBtn {
        background: #fff;
        color: #fda100;
        border: 1px solid #fda100;
    }
    .blueBtn {
        background: #fff;
        color: #00affd;
        border: 1px solid #00affd;
    }
    .greyBtn {
        background: #fff;
        color: #999999;
        border: 1px solid #999999;
    }
    .cancleBtn {
        background: #999999;
        color: #fff;
    }
}
.verification,
.addSupplierInformation,
.jurisdiction,
.addMaterial {
    position: fixed;
    width: 560px;
    height: 465px;
    z-index: 7;
    top: 150px;
    left: 630px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .Materialtop {
        width: 100%;
        height: 40px;
        background-color: #386df0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        position: relative;
        .material-drag {
            width: calc(100% - 50px);
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .closMaterial {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translate(0, -50%);
            width: 25px;
            height: 25px;
            cursor: pointer;
        }
        span {
            color: #ffffff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .addMaterial-content {
        width: 100%;
        height: calc(100% - 100px);
        padding-right: 52px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        .addMaterial-item {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 10px;
            .addMaterial-key {
                margin-right: 10px;
            }
            .addMaterial-input {
                width: 359px;
                height: 45px;
                background: #fff;
                border: 1px solid #dddddd;
                opacity: 1;
            }
        }
    }
    .addMaterial-footer {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 52px;
        box-sizing: border-box;
    }
}
.verification {
    width: 500px;
    height: 260px;
    top: 250px;
    z-index: 8;
}
.addSupplierInformation {
    width: 500px;
    height: 260px;
    top: 250px;
    z-index: 11;
    .addMaterial-input {
        width: 300px !important;
    }
}
.jurisdiction {
    width: 315px;
    height: 260px;
    top: 250px;
    z-index: 9;
    .jurisdiction-content {
        width: 100%;
        height: calc(100% - 100px);
        padding-right: 52px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
    }
}
.SupplierInformation,
.addOrEditBOM {
    position: fixed;
    width: 1230px;
    height: 770px;
    z-index: 5;
    top: 110px;
    left: 330px;
    box-shadow: 0px 0px 8px black;
    background-color: #f3f3f4;
    .poptop {
        width: 100%;
        height: 40px;
        background-color: #386df0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        position: relative;
        .tiptop-drag {
            width: calc(100% - 50px);
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .closeWind {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translate(0, -50%);
            width: 25px;
            height: 25px;
            cursor: pointer;
        }
        span {
            color: #ffffff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .PopContent {
        width: 100%;
        height: calc(100% - 40px);
        background-color: #eeeeee;
        padding: 0 21px;
        box-sizing: border-box;
        .addOrEditBOM-search {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            font-size: 14px;
            .addOrEditBOM-right {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(0, -50%);
                height: 100%;
                width: 250px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 15px;
            }
        }
        .addOrEditBOM-content {
            width: 100%;
            height: calc(100% - 120px);
            display: flex;
            .addOrEditBOM-group {
                width: 180px;
                height: 100%;
                background: #f4f4f4;
                border: 1px solid #dddddd;
                .group-label {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    text-indent: 15px;
                    cursor: pointer;
                }
                .select-group {
                    background: #fff;
                    color: #386df0;
                }
                .select-group::before {
                    content: '';
                    height: 100%;
                    width: 4px;
                    background-color: #4270e4;
                }
            }
            .addOrEditBOM-table {
                width: calc(100% - 180px);
                height: 100%;
                background: #fff;
                border: 1px solid #dddddd;
            }
        }
        .addOrEditBOM-footer {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }
}
.SupplierInformation {
    width: 900px;
    height: 500px;
    left: 450px;
    top: 200px;
    z-index: 10;
}
.tip {
    position: fixed;
    width: 380px;
    height: 200px;
    z-index: 30;
    top: 350px;
    left: 750px;
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
        padding: 30px;
        text-align: center;
        padding-bottom: 0;
    }
    .w {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }
    .tipdetermine {
        color: #ea9328;
        width: 310px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        margin-top: 40px;
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
            cursor: pointer;
            display: inline-block;
            height: 30px;
            width: 160px;
            text-align: center;
            background-color: #e0e0e0;
            color: #7e7e7e;
        }
        .two {
            cursor: pointer;
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
.cover1 {
    width: 100%;
    height: 100%;
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
