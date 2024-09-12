<template>
    <div class="material-management2">
        <div class="material-management2-box">
            <div class="material-content1">
                <div class="material-title">设备管理</div>

                <div class="material-search">
                    <div class="btn greenBtn" @click="openoneworkShow('add1')">
                        新建设备
                    </div>
                    <!-- <div
                        class="btn yellowBtn"
                        @click="openoneworkShow('edit1')"
                    >
                        修改设备
                    </div> -->
                    <div class="btn cancleBtn" @click="beforeDel('del1')">
                        删除设备
                    </div>
                    <!-- <div class="btn blueBtn" @click="openVerificationPopShow">
                        校验设置
                    </div> -->
                </div>
                <div class="material-table">
                    <el-table
                        :data="deviceList"
                        border
                        highlight-current-row
                        header-row-class-name="light-blue"
                        row-class-name="high-light"
                        height="100%"
                        width="100%"
                        :style="{ 'font-size': 14 + 'px' }"
                        ref="leftTable"
                        :header-cell-style="{
                            background:
                                $store.state.color == 'grey'
                                    ? '#D9DBDE'
                                    : '#5a6c98',
                            color:
                                $store.state.color == 'grey' ? '#000' : '#fff',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                        @row-click="selectLeftTemp"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            label="操作"
                            :width="100"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <div
                                    class="img"
                                    @click="UpDeviceList(scope.row)"
                                >
                                    <div class="up">
                                        <img
                                            :src="
                                                require('../../assets/images/icon_up.png')
                                            "
                                            alt
                                        />
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号"
                            prop="Order"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="设备名"
                            prop="Name"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="material-content2">
                <div class="material-title">料仓管理</div>

                <div class="material-search">
                    <div class="btn greenBtn" @click="openoneworkShow('add2')">
                        新建料仓
                    </div>
                    <div
                        class="btn yellowBtn"
                        @click="openoneworkShow('edit2')"
                    >
                        修改料仓
                    </div>
                    <div class="btn cancleBtn" @click="beforeDel('del2')">
                        删除料仓
                    </div>
                </div>
                <div class="material-table">
                    <el-table
                        :data="granaryList"
                        border
                        highlight-current-row
                        header-row-class-name="light-blue"
                        row-class-name="high-light"
                        height="100%"
                        width="100%"
                        :style="{ 'font-size': 14 + 'px' }"
                        ref="rightTable"
                        :header-cell-style="{
                            background:
                                $store.state.color == 'grey'
                                    ? '#D9DBDE'
                                    : '#5a6c98',
                            color:
                                $store.state.color == 'grey' ? '#000' : '#fff',
                            'border-left': '1px solid #cccccc',
                            height: 50 + 'px',
                            'font-size': 14 + 'px',
                            padding: '0'
                        }"
                        @row-click="selectRightTemp"
                    >
                        <template slot="empty">
                            <span>暂无数据</span>
                        </template>
                        <el-table-column
                            label="操作"
                            :width="100"
                            :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <div
                                    class="img"
                                    @click="UpGranaryList(scope.row)"
                                >
                                    <div class="up">
                                        <img
                                            :src="
                                                require('../../assets/images/icon_up.png')
                                            "
                                            alt
                                        />
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号"
                            prop="Order"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="料仓名"
                            prop="Name"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="物料二维码变量"
                            prop="CodeTagName"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="读取二维码信号"
                            prop="SignTagName"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="过关信号"
                            prop="PassTagName"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                            label="物料名称"
                            prop="MaterielName"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                    </el-table>
                </div>
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
            :class="
                oneworkShowType == 'add1' || oneworkShowType == 'edit1'
                    ? 'onework'
                    : 'oneworkR'
            "
            v-show="oneworkShow"
            ref="oneworkref"
        >
            <div
                class="oneworkhead"
                :class="{ colordiv: $store.state.color == 'grey' }"
            >
                <div
                    class="oneworktop"
                    @mousedown="mouseDownHandleelse10($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span
                    v-if="oneworkShowType == 'add1'"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >新建设备</span
                >
                <span
                    v-if="oneworkShowType == 'edit1'"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >修改设备</span
                >
                <span
                    v-if="oneworkShowType == 'add2'"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >新建料仓</span
                >
                <span
                    v-if="oneworkShowType == 'edit2'"
                    :class="{ fcolor: $store.state.color == 'grey' }"
                    >修改料仓</span
                >
                <img
                    src="../../assets/images/close-big-default.png"
                    alt
                    @click="closeoneworkShow"
                    class="no"
                />
            </div>
            <div
                class="oneworkname"
                v-if="oneworkShowType == 'add1' || oneworkShowType == 'edit1'"
            >
                <span>设备</span>
                <el-select
                    v-model="selectKeyObj.equip"
                    :disabled="oneworkShowType == 'edit1'"
                >
                    <el-option
                        v-for="(item, index) in QueryWorkSectionsList"
                        :key="index"
                        :value="item.WID"
                        :label="item.WorkName"
                    >
                    </el-option>
                </el-select>
            </div>

            <div
                class="oneworkname"
                v-if="oneworkShowType == 'add2' || oneworkShowType == 'edit2'"
            >
                <div class="inp7">
                    <span>料仓名称</span>
                    <input
                        type="text"
                        placeholder="请输入"
                        v-model="selectKeyObj.Silo"
                    />
                </div>
            </div>

            <div
                class="oneworkname2"
                v-if="oneworkShowType == 'add2' || oneworkShowType == 'edit2'"
            >
                <div class="inp7">
                    <span>物料名称</span>
                    <input
                        type="text"
                        placeholder="请输入"
                        v-model="selectKeyObj.material"
                    />
                </div>
            </div>

            <div
                class="oneworkname3"
                v-if="oneworkShowType == 'add2' || oneworkShowType == 'edit2'"
            >
                <div class="inp7">
                    <span>物料二维码变量</span>
                    <input
                        type="text"
                        disabled
                        placeholder="请选择"
                        v-model="selectKeyObj.w1"
                    />
                    <span class="select" @click="chooseKeyTypeOpen('w1')"
                        >选择</span
                    >
                </div>
            </div>
            <div
                class="oneworkname4"
                v-if="oneworkShowType == 'add2' || oneworkShowType == 'edit2'"
            >
                <div class="inp7">
                    <span>读取二维码信号</span>
                    <input
                        type="text"
                        disabled
                        placeholder="请选择"
                        v-model="selectKeyObj.w2"
                    />
                    <span class="select" @click="chooseKeyTypeOpen('w2')"
                        >选择</span
                    >
                </div>
            </div>
            <!-- <div
                class="oneworkname5"
                v-if="oneworkShowType == 'add2' || oneworkShowType == 'edit2'"
            >
                <div class="inp7">
                    <span>复位二维码信号</span>
                    <input
                        type="text"
                        disabled
                        placeholder="请选择"
                        v-model="selectKeyObj.w3"
                    />
                    <span class="select" @click="chooseKeyTypeOpen('w3')"
                        >选择</span
                    >
                </div>
            </div> -->

            <div
                class="oneworkname5"
                v-if="oneworkShowType == 'add2' || oneworkShowType == 'edit2'"
            >
                <div class="inp7">
                    <span>过关信号</span>
                    <input
                        type="text"
                        disabled
                        placeholder="请选择"
                        v-model="selectKeyObj.w4"
                    />
                    <span class="select" @click="chooseKeyTypeOpen('w4')"
                        >选择</span
                    >
                </div>
            </div>
            <div
                class="oneworkname6"
                v-if="oneworkShowType == 'add2' || oneworkShowType == 'edit2'"
            >
                <div class="inp7">
                    <span>是否校验</span>
                    <el-checkbox
                        style="display: block"
                        v-model="selectKeyObj.checkBoxSelect"
                    ></el-checkbox>
                </div>
            </div>
            <div class="cancel" @click="closeoneworkShow">取消</div>
            <div class="pre" @click="sumbitoneworkShow">保存</div>
        </div>

        <div class="pickKey" ref="pickKey" v-if="pickKeyShow">
            <div class="poptop">
                <div
                    class="tiptop-drag"
                    @mousedown="mouseDownHandleelse9($event)"
                    @mouseup="mouseUpHandleelse($event)"
                ></div>
                <span>选择变量</span>
                <img
                    @click="closePickKey"
                    class="closeWind"
                    src="../../assets/images/close-big-default.png"
                    alt=""
                />
            </div>
            <div class="PopContent">
                <div class="pickKeyContent">
                    <div class="addOrEditBOM-search">
                        <div>设备：</div>
                        <el-select
                            filterable
                            v-model="oneselect"
                            :style="[
                                { fontSize: '16px' },
                                { width: '120px' },
                                { height: '40px' },
                                { marginLeft: '15px' },
                                { marginRight: '15px' }
                            ]"
                        >
                            <el-option
                                v-for="(item, index) in projectlist"
                                :key="index"
                                :value="item.DeviceName"
                            >
                                {{ item.DisplayDeviceName }}
                            </el-option>
                        </el-select>
                        <div>组名：</div>
                        <el-select
                            filterable
                            v-model="twoselect"
                            :style="[
                                { fontSize: '16px' },
                                { width: '120px' },
                                { height: '40px' },
                                { marginLeft: '15px' },
                                { marginRight: '15px' }
                            ]"
                        >
                            <el-option
                                v-for="(item, index) in projectlist2"
                                :key="index"
                                :value="item.GroupName"
                            >
                                {{ item.GroupName }}
                            </el-option>
                        </el-select>
                        <div>数据类型：</div>
                        <el-select
                            v-model="threeselect"
                            :style="[
                                { fontSize: '16px' },
                                { width: '120px' },
                                { height: '40px' },
                                { marginLeft: '15px' },
                                { marginRight: '15px' }
                            ]"
                        >
                            <el-option
                                v-for="(item, index) in projectlist3"
                                :key="index"
                                :value="item.Value"
                            >
                                {{ item.Value }}
                            </el-option>
                        </el-select>
                        <el-input
                            placeholder="请输入"
                            clearable
                            v-model="projectkeyword"
                            :style="[
                                { fontSize: '16px' },
                                { width: '210px' },
                                { height: '40px' },
                                { marginRight: '15px' }
                            ]"
                        ></el-input>
                        <div class="btn" @click="watchdata">查询</div>
                    </div>
                    <div class="addOrEditBOM-content">
                        <el-table
                            :data="projectlistdata"
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
                            highlight-current-row
                            @current-change="handleCurrentChange"
                        >
                            <template slot="empty">
                                <span>暂无数据</span>
                            </template>
                            <el-table-column
                                label="设备名"
                                prop="Device"
                            ></el-table-column>
                            <el-table-column
                                label="数据类型"
                                prop="DateType"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                label="变量名"
                                prop="Name"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                label="描述"
                                prop="Descript"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                            <el-table-column
                                label="变量地址"
                                prop="Address"
                                :show-overflow-tooltip="true"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pages-container">
                        <my-page
                            :pageData="pickLeyPageData"
                            @req="pickKeyreq"
                        ></my-page>
                    </div>
                </div>
                <div class="addOrEditBOM-footer">
                    <div class="btn cancleBtn" @click="closePickKey">取消</div>
                    <div class="btn" @click="sumbitPickKey">确定</div>
                </div>
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
                    <div class="one" @click="no1">否</div>
                    <div class="two" @click="yes1">是</div>
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
            deltype: '',
            deltrue: true,
            tipword: '',
            tipchange: false,

            addMaterialShow: false,
            verificationPopShow: false,
            jurisdictionPopShow: false,
            jurisdictionRadio: 1,

            oneworkShow: false,
            oneworkShowType: '',
            pickKeyShow: false,
            pickLeyPageData: {
                PageSize: 50,
                TotalCount: 0,
                TotalPage: 0,
                PageIndex: 1,
                LastEnabled: false,
                NextEnabled: false
            },
            oneselect: '',
            twoselect: '',
            threeselect: '',
            projectlist: [],
            projectlist2: [],
            projectlist3: [],
            projectkeyword: '',
            projectlistdata: [],
            chooseKeyType: '',
            tempChooseKey: {},
            selectKeyObj: {
                equip: '',
                Silo: '',
                material: '',
                w1: '',
                w2: '',
                w3: '',
                w4: '',
                checkBoxSelect: false
            },
            initSelectKeyObj: {
                equip: '',
                Silo: '',
                material: '',
                w1: '',
                w2: '',
                w3: '',
                w4: '',
                checkBoxSelect: false
            },
            deviceList: [],
            curSelectDevice: {},
            deviceListPageIndex: 1,
            deviceListTotalCount: 99,
            QueryWorkSectionsList: [], //工序列表

            granaryList: [],
            curSelectGranary: {},
            granaryListPageIndex: 1,
            granaryListTotalCount: 99
        };
    },
    computed: {
        setionchange() {
            return (
                this.verificationPopShow ||
                this.jurisdictionPopShow ||
                this.oneworkShow ||
                this.pickKeyShow
            );
        },
        VpowerData() {
            return this.$store.state.btnPowerData;
        }
    },
    watch: {
        VpowerData(val) {
            this.getPower();
        },
        oneselect(val) {
            let i = 0;
            for (i in this.projectlist) {
                if (val == this.projectlist[i].DeviceName) {
                    this.projectlist2 = this.projectlist[i].Groups;
                    this.twoselect = this.projectlist[i].Groups[0].GroupName;
                }
            }
            this.watchdata();
        },
        twoselect(val) {
            let i = 0;
            console.log('sad');
            for (i in this.projectlist2) {
                if (val == this.projectlist2[i].GroupName) {
                    this.projectlist3 = this.projectlist2[i].DataTypes;
                    // this.threeselect = this.projectlist3[0].Value;
                    this.threeselect = '不限';
                }
            }
            this.watchdata();
        },
        threeselect(val) {
            this.watchdata();
        },
        curSelectDevice(n) {
            if (n) {
                this.getGranaryList(1);
            }
        }
    },
    mounted() {
        this.getPower();

        this.getDeviceList(1);
        this.tableListener();
    },
    destroyed() {
        this.$refs.leftTable.bodyWrapper.removeEventListener('scroll');
        this.$refs.rightTable.bodyWrapper.removeEventListener('scroll');
    },
    methods: {
        getPower() {
            this.jurisdiction = this.$store.state.btnPowerData;
            this.buttonarr = this.findPathByLeafId(
                this.GetUrlParam('id'),
                this.jurisdiction
            )[0].Children;
            console.log('nbbll', this.buttonarr);
        },
        findPathByLeafId(id, node, path) {
            if (!path) {
                path = [];
            }
            for (let i = 0; i < node.length; i++) {
                var temPath = path.concat();

                if (id == node[i].RightID) {
                    temPath.push(node[i]);
                    return temPath;
                }
                if (node[i].Children) {
                    var findResult = this.findPathByLeafId(
                        id,
                        node[i].Children,
                        temPath
                    );
                    if (findResult) {
                        return findResult;
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            let url = document.location.toString();
            let arrObj = url.split('?');
            if (arrObj.length > 1) {
                let arrPara = arrObj[1].split('&');
                let arr;
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split('=');
                    if (arr && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return '';
            } else {
                return '';
            }
        },
        tableListener() {
            let that = this;
            let dom = this.$refs.leftTable.bodyWrapper;
            dom.addEventListener('scroll', function() {
                const scrollDistance =
                    dom.scrollHeight - dom.scrollTop - dom.clientHeight;
                if (scrollDistance <= 0) {
                    //等于0证明已经到底，可以请求接口
                    if (that.deviceList.length < that.deviceListTotalCount) {
                        //当前页数小于总页数就请求
                        that.getDeviceList(
                            Number(that.deviceListPageIndex) + 1
                        );
                    }
                }
            });

            let dom2 = this.$refs.rightTable.bodyWrapper;
            dom2.addEventListener('scroll', function() {
                const scrollDistance =
                    dom2.scrollHeight - dom2.scrollTop - dom2.clientHeight;
                if (scrollDistance <= 0) {
                    if (that.granaryList.length < that.granaryListTotalCount) {
                        that.getGranaryList(
                            Number(that.granaryListPageIndex) + 1
                        );
                    }
                }
            });
        },
        getDeviceList(deviceListPageIndex) {
            if (deviceListPageIndex == 1) {
                this.deviceList = [];
            }
            this.$axios({
                method: 'post',
                url: `/api/MaterielConfigure/DeviceList`,
                data: {
                    PageSize: 10,
                    PageIndex: deviceListPageIndex
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.deviceListPageIndex = deviceListPageIndex;
                    this.deviceListTotalCount = res.data.data.TotalCount;
                    this.deviceList = this.deviceList.concat(
                        res.data.data.MaterielDeviceItems
                    );
                    if (deviceListPageIndex == 1) {
                        if (this.deviceList.length) {
                            this.curSelectDevice = this.deviceList[0];
                            this.$refs.leftTable.setCurrentRow(
                                this.deviceList[0]
                            );
                        } else {
                            this.curSelectDevice = {};
                        }
                    }
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        getGranaryList(granaryListPageIndex) {
            console.log('mmmmmmmmmmmmmmmmmm', this.curSelectDevice.ID);
            if (!this.curSelectDevice || !this.curSelectDevice.ID) {
                this.curSelectGranary = {};
                this.granaryList = [];
                this.granaryListPageIndex = granaryListPageIndex;
                this.granaryListTotalCount = 0;
                return;
            }
            if (granaryListPageIndex == 1) {
                this.granaryList = [];
            }
            this.$axios({
                method: 'post',
                url: `/api/MaterielConfigure/GranaryList`,
                data: {
                    PageSize: 10,
                    PageIndex: granaryListPageIndex,
                    DeviceId: this.curSelectDevice.ID
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.granaryListPageIndex = granaryListPageIndex;
                    this.granaryListTotalCount = res.data.data.TotalCount;
                    this.granaryList = this.granaryList.concat(
                        res.data.data.GranaryItems
                    );
                    if (granaryListPageIndex == 1) {
                        this.curSelectGranary = this.granaryList[0];
                        this.$refs.rightTable.setCurrentRow(
                            this.granaryList[0]
                        );
                    }
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },

        UpDeviceList(item) {
            this.$axios({
                method: 'post',
                url: `/api/MaterielConfigure/UpDevice`,
                data: {
                    ID: item.ID
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.getDeviceList(1);
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        UpGranaryList(item) {
            this.$axios({
                method: 'post',
                url: `/api/MaterielConfigure/UpGranary`,
                data: {
                    ID: item.ID
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.getGranaryList(1);
                } else {
                    this.tipword = res.data.msg;
                    this.tipchange = true;
                }
            });
        },
        chooseKeyTypeOpen(type) {
            this.chooseKeyType = type;
            this.openPickKey();
        },
        selectLeftTemp(selection) {
            this.curSelectDevice = selection;
        },
        selectRightTemp(selection) {
            this.curSelectGranary = selection;
        },
        no1() {
            this.deltrue = true;
            this.deltype = '';
            this.tipchange = false;
        },
        yes1() {
            if (this.deltype == 'del1') {
                setTimeout(() => {
                    this.delEquip();
                });
            }
            if (this.deltype == 'del2') {
                setTimeout(() => {
                    this.delGranary();
                });
            }
            this.no1();
        },
        beforeDel(type) {
            if (type == 'del1') {
                if (!this.curSelectDevice.ID) {
                    this.tipword = '请选择一条设备';
                    this.tipchange = true;
                    return;
                }
                this.tipword = '是否删除此设备？';
            }
            if (type == 'del2') {
                if (!this.curSelectGranary.ID) {
                    this.tipword = '请选择一个料仓';
                    this.tipchange = true;
                    return;
                }
                this.tipword = '是否删除此料仓？';
            }
            this.deltrue = false;
            this.deltype = type;
            this.tipchange = true;
        },
        delEquip() {
            this.$axios
                .post(`/api/MaterielConfigure/DeleteDevice`, {
                    ID: this.curSelectDevice.ID
                })
                .then(res => {
                    if (res.data.code === 0) {
                        this.tipword = '删除成功';
                        this.tipchange = true;
                        this.oneworkShowType = '';
                        this.oneworkShow = false;
                        this.getDeviceList(1);
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        delGranary() {
            this.$axios
                .post(`/api/MaterielConfigure/DeleteGranary`, {
                    ID: this.curSelectGranary.ID
                })
                .then(res => {
                    if (res.data.code === 0) {
                        this.tipword = '删除成功';
                        this.tipchange = true;
                        this.oneworkShowType = '';
                        this.oneworkShow = false;
                        this.getGranaryList(1);
                    } else {
                        this.tipword = res.data.msg;
                        this.tipchange = true;
                    }
                });
        },
        openoneworkShow(type) {
            if (type == 'add1' || type == 'add2') {
                if (type == 'add2' && !this.curSelectDevice.ID) {
                    this.tipword = '请选择一条设备';
                    this.tipchange = true;
                    return;
                }
                this.initSelectKeyObj = {
                    equip: '',
                    Silo: '',
                    material: '',
                    w1: '',
                    w2: '',
                    w3: '',
                    w4: '',
                    checkBoxSelect: false
                };
                this.selectKeyObj = {
                    equip: '',
                    Silo: '',
                    material: '',
                    w1: '',
                    w2: '',
                    w3: '',
                    w4: '',
                    checkBoxSelect: false
                };
            } else {
                //查询，initSelectKeyObj和selectKeyObj赋值
                if (type == 'edit1') {
                    if (!this.curSelectDevice.ID) {
                        this.tipword = '请选择一条设备';
                        this.tipchange = true;
                        return;
                    }
                    this.selectKeyObj.equip = this.curSelectDevice.WId; //现工序
                }
                if (type == 'edit2') {
                    if (!this.curSelectGranary.ID) {
                        this.tipword = '请选择一个料仓';
                        this.tipchange = true;
                        return;
                    }
                    const item = this.curSelectGranary;
                    this.selectKeyObj.Silo = item.Name;
                    this.selectKeyObj.material = item.MaterielName;
                    this.selectKeyObj.w1 = item.CodeTagName;
                    this.selectKeyObj.w2 = item.SignTagName;
                    this.selectKeyObj.w4 = item.PassTagName;
                    this.selectKeyObj.checkBoxSelect = item.Check;
                }
            }
            if (type == 'add1' || type == 'edit1') {
                //查一下最新的工序列表
                this.$axios
                    .post(`/api/ProcessParameterConfigure/QueryWorkSections`)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.QueryWorkSectionsList = res.data.data;
                        } else {
                            this.tipword = res.data.msg;
                            this.tipchange = true;
                        }
                    });
            }
            this.oneworkShowType = type;
            this.oneworkShow = true;
        },
        closeoneworkShow() {
            this.oneworkShowType = '';
            this.oneworkShow = false;
            this.selectKeyObj = { ...this.initSelectKeyObj };
        },
        sumbitoneworkShow() {
            if (
                this.oneworkShowType == 'add1' ||
                this.oneworkShowType == 'edit1'
            ) {
                if (!this.selectKeyObj.equip) {
                    this.tipword = '请选择设备';
                    this.tipchange = true;
                    return;
                }
            }
            if (
                this.oneworkShowType == 'add2' ||
                this.oneworkShowType == 'edit2'
            ) {
                if (!this.selectKeyObj.Silo) {
                    this.tipword = '请输入料仓名称';
                    this.tipchange = true;
                    return;
                }
                if (!this.selectKeyObj.material) {
                    this.tipword = '请输入物料名称';
                    this.tipchange = true;
                    return;
                }
                if (!this.selectKeyObj.w1) {
                    this.tipword = '请选择物料二维码变量';
                    this.tipchange = true;
                    return;
                }
                if (!this.selectKeyObj.w2) {
                    this.tipword = '请选择读取二维码信号';
                    this.tipchange = true;
                    return;
                }
                if (!this.selectKeyObj.w4) {
                    this.tipword = '请选择过关信号';
                    this.tipchange = true;
                    return;
                }
            }
            if (this.oneworkShowType == 'add1') {
                this.$axios
                    .post(`/api/MaterielConfigure/AddDevice`, {
                        WId: this.selectKeyObj.equip
                    })
                    .then(res => {
                        if (res.data.code === 0) {
                            this.tipword = '新增成功';
                            this.tipchange = true;
                            this.oneworkShowType = '';
                            this.oneworkShow = false;
                            this.getDeviceList(1);
                        } else {
                            this.tipword = res.data.msg;
                            this.tipchange = true;
                        }
                    });
            }
            if (this.oneworkShowType == 'edit1') {
                // this.$axios
                //     .post(`/api/MaterielConfigure/UpdateDevice`, {
                //         WId: this.selectKeyObj.equip,//对工序wid
                //         Id: this.curSelectDevice.ID,//对设备id
                //     })
                //     .then((res) => {
                //         if (res.data.code === 0) {
                //             this.tipword = '修改成功';
                //             this.tipchange = true;
                this.oneworkShowType = '';
                this.oneworkShow = false;
                //             this.getDeviceList(1);
                //         } else {
                //             this.tipword = res.data.msg;
                //             this.tipchange = true;
                //         }
                //     });
            }
            if (this.oneworkShowType == 'add2') {
                this.$axios
                    .post(`/api/MaterielConfigure/AddGranary`, {
                        DeviceId: this.curSelectDevice.ID,
                        Name: this.selectKeyObj.Silo,
                        MaterielName: this.selectKeyObj.material,
                        CodeTagName: this.selectKeyObj.w1,
                        SignTagName: this.selectKeyObj.w2,
                        PassTagName: this.selectKeyObj.w4,
                        Check: this.selectKeyObj.checkBoxSelect
                    })
                    .then(res => {
                        if (res.data.code === 0) {
                            this.tipword = '新增成功';
                            this.tipchange = true;
                            this.oneworkShowType = '';
                            this.oneworkShow = false;
                            this.getGranaryList(1);
                        } else {
                            this.tipword = res.data.msg;
                            this.tipchange = true;
                        }
                    });
            }
            if (this.oneworkShowType == 'edit2') {
                this.$axios
                    .post(`/api/MaterielConfigure/UpdateGranary`, {
                        ID: this.curSelectGranary.ID,
                        DeviceId: this.curSelectDevice.ID,
                        Name: this.selectKeyObj.Silo,
                        MaterielName: this.selectKeyObj.material,
                        CodeTagName: this.selectKeyObj.w1,
                        SignTagName: this.selectKeyObj.w2,
                        PassTagName: this.selectKeyObj.w4,
                        Check: this.selectKeyObj.checkBoxSelect
                    })
                    .then(res => {
                        if (res.data.code === 0) {
                            this.tipword = '修改成功';
                            this.tipchange = true;
                            this.oneworkShowType = '';
                            this.oneworkShow = false;
                            this.getGranaryList(1);
                        } else {
                            this.tipword = res.data.msg;
                            this.tipchange = true;
                        }
                    });
            }
        },
        pickKeyreq(pageIndex) {
            this.pickLeyPageData.PageIndex = pageIndex;
            this.watchdata();
        },
        watchdata() {
            let arr = [];
            if (this.threeselect == '不限') {
                this.projectlist3
                    .filter(f => f.Value !== '不限')
                    .forEach(item => {
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
                    argDataType: arr,
                    argKeyWord: this.projectkeyword,
                    argPageSize: this.pickLeyPageData.PageSize,
                    argPageIndex: this.pickLeyPageData.PageIndex
                }
            }).then(res => {
                console.log('ss', res);
                this.projectlistdata = res.data.data.DataList;
                this.pickLeyPageData = res.data.data.ParameterList;
            });
        },
        openPickKey() {
            this.$axios({
                url: `/api/ProcessParameterConfigure/GstCondition`,
                method: 'post'
            })
                .then(res => {
                    console.log(':sadasdsaddas', res);
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
                    this.threeselect = '不限';
                })
                .then(() => {
                    this.watchdata();
                    this.lookforsearch1 = true;
                });

            this.pickKeyShow = true;
        },
        closePickKey() {
            this.pickKeyShow = false;
            this.chooseKeyType = '';
        },
        sumbitPickKey() {
            this.selectKeyObj[this.chooseKeyType] = this.tempChooseKey.Name;
            this.closePickKey();
        },
        handleCurrentChange(val) {
            console.log('handleCurrentChange', val);
            this.tempChooseKey = val;
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

        openJurisdictionPopShow() {
            this.jurisdictionPopShow = true;
        },

        closeJurisdictionPopShow() {
            this.jurisdictionPopShow = false;
        },
        tip1() {
            this.tipchange = false;
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

        mouseDownHandleelse9(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse9;
            event.stopPropagation();
        },

        mouseMoveHandleelse9(event) {
            let moveLeft = event.pageX - 800 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.pickKey.style.left = moveLeft;
            this.$refs.pickKey.style.top = moveTop;
        },
        mouseDownHandleelse10(event) {
            event.currentTarget.style.cursor = 'move';
            window.onmousemove = this.mouseMoveHandleelse10;
            event.stopPropagation();
        },

        mouseMoveHandleelse10(event) {
            let moveLeft = event.pageX - 180 + 'px';
            let moveTop = event.pageY - 20 + 'px';
            this.$refs.oneworkref.style.left = moveLeft;
            this.$refs.oneworkref.style.top = moveTop;
        },
        mouseUpHandleelse(event) {
            window.onmousemove = null;
            event.currentTarget.style.cursor = 'move';
        }
    }
};
</script>

<style lang="scss" scoped>
.material-management2 {
    width: 100%;
    height: calc(100% - 130px);
    color: #000;
    margin-top: 100px;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;

    .material-management2-box {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 20px 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }

    .material-content1,
    .material-content2 {
        width: calc(30% - 8px);
        height: 100%;
        background-color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        border: 1px solid #dddddd;
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
            height: calc(100% - 125px);
            margin-top: 10px;
        }
    }
    .material-content2 {
        width: calc(70% - 8px);
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
        margin-right: 10px;
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
.pickKey {
    position: fixed;
    width: 1230px;
    height: 770px;
    z-index: 6;
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
        .pickKeyContent {
            margin-top: 15px;
            width: 100%;
            height: calc(100% - 60px);
            border: 1px solid #cccccc;
            background: #f4f4f4;
            padding: 0 21px;
            box-sizing: border-box;
        }
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
.pickKey {
    height: 600px;
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
.img {
    cursor: pointer;
}
.up {
    width: 58px;
    height: 27px;
    background-color: #fff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    position: relative;
    margin-left: 10px;
    img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}

.onework,
.oneworkR {
    position: fixed;
    width: 500px;
    overflow: hidden;
    height: 230px;
    z-index: 5;
    box-shadow: 0px 0px 8px black;
    background-color: #eeeeee;
    top: 280px;
    left: 710px;
    .oneworkhead {
        background-color: #386df0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        position: relative;
    }
    .oneworktop {
        position: absolute;
        width: calc(100% - 50px);
        height: 50px;
    }
    .no {
        top: 0;
        position: absolute;
        z-index: 50999999;
        bottom: 0;
        cursor: pointer;
        margin: auto;
        height: 25px;
        width: 25px;
        right: 10px;
    }
    .cancel {
        width: 100px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        position: absolute;
        background-color: #999999;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        left: 210px;
        bottom: 20px;
    }
    .pre {
        width: 100px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        position: absolute;
        background-color: #386df0;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        left: 320px;
        bottom: 20px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .oneworkname,
    .oneworkname2,
    .oneworkname3,
    .oneworkname4,
    .oneworkname5,
    .oneworkname6 {
        position: absolute;
        top: 90px;
        left: 0;
        width: 100%;
        input {
            width: 210px;
            height: 46px;
            border: none;
            border: 1px solid #cccccc;
            text-indent: 1em;
        }
        span {
            display: inline-block;
            width: 130px;
            font-size: 14px;
            text-align: right;
            margin-right: 10px;
        }
        .inp7 {
            display: flex;
            align-items: center;
            position: relative;
            .select {
                position: absolute;
                right: 60px;
                color: #4270e4;
                border: 1px solid #4270e4;
                border-radius: 5px;
                text-align: center;
                line-height: 36px;
                margin-left: 10px;
                cursor: pointer;
                width: 67px;
                display: inline-block;
                height: 36px;
                background-color: #fff;
            }
        }
    }
    .oneworkname2 {
        top: 150px;
    }
    .oneworkname3 {
        top: 210px;
    }
    .oneworkname4 {
        top: 270px;
    }
    .oneworkname5 {
        top: 330px;
    }
    .oneworkname6 {
        top: 390px;
    }
    .oneworknameSelect {
        width: 100%;
        height: 100%;
        padding-left: 150px;
        box-sizing: border-box;
    }
}
.oneworkR {
    height: 500px;
}
</style>
