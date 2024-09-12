<!--
 * @Description: 这是趋势曲线页面（组件）
 * @Date: 2019-11-19 13:51:38
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-04-09 15:37:55
 **趋势曲线-建议重构
 -->
     
<template>
    <div class="conterBox1" :style="{ paddingTop: 100 * zoom1 + 'px', height: calcheight }">
        <div
            class="head"
            :class="{ colortip: $store.state.color == 'grey' }"
            :style="{ zoom: zoom1 }"
        >
            <!-- 头部内容 -->
            <div :style="{ width: '100%', height: 70 * zoom + 'px', background: '#DDDDDD' }">
                <div
                    class="head_left"
                    :style="{ width: 17 * zoom + '%', marginTop: 17 * zoom + 'px' }"
                >
                    <span
                        class="head_block"
                        :style="{ backgroundColor: this.color1, marginLeft: 2 * zoom + '%' }"
                    ></span>
                    <div
                        class="head_text"
                        ref="timeText1"
                        :style="'color:' + this.color1 + '; fontSize:' + this.value4 * zoom + 'px;'"
                    >{{ titleText }}</div>
                </div>
                <div
                    class="head_right"
                    :style="{ width: 100 - (17 * zoom) + '%', fontSize: 16 * zoom + 'px' }"
                >
                    <div class="timeStar">
                        <div v-if="oneWindow">
                            <span
                                class="demonstration"
                            >{{ lang.NewTrendChart_NewTrendChartUserControl_StartTime }}</span>
                            <el-date-picker
                                :disabled="showTime"
                                v-model="Stime"
                                type="datetime"
                                @focus="sx"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                default-time="12:00:00"
                            ></el-date-picker>
                        </div>
                    </div>
                    <div class="timeEnd">
                        <div v-if="oneWindow">
                            <span
                                class="demonstration"
                            >{{ lang.NewTrendChart_NewTrendChartUserControl_EndTime }}</span>
                            <el-date-picker
                                :disabled="showTime"
                                @focus="sx"
                                v-model="Etime"
                                type="datetime"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
                                default-time="12:00:00"
                            ></el-date-picker>
                        </div>
                    </div>
                    <div class="buttomQuery" :style="{ marginRight: 1 * zoom + '%' }">
                        <el-button
                            v-if="oneWindow"
                            @click="queryFun()"
                            :disabled="showTime"
                            class="query"
                            type="primary"
                        >{{ lang.NewTrendChart_NewTrendChartUserControl_Query }}</el-button>
                    </div>
                    <div
                        class="show"
                        :style="{ height: 40 * zoom + 'px', fontSize: 16 * zoom + 'px' }"
                    >
                        <div
                            @click="show(0)"
                            class="normal"
                            :style="{ height: 36 * zoom + 'px', fontSize: 16 * zoom + 'px', lineHeight: 38 * zoom + 'px' }"
                        >{{ lang.NewTrendChart_NewTrendChartUserControl_Normal }}</div>
                        <div
                            @click="show(1)"
                            ref="show"
                            class="proport"
                            :style="{ height: 36 * zoom + 'px', fontSize: 16 * zoom + 'px', lineHeight: 38 * zoom + 'px' }"
                        >{{ lang.NewTrendChart_NewTrendChartUserControl_Proportion }}</div>
                    </div>
                    <div
                        class="window"
                        :style="{ height: 40 * zoom + 'px', fontSize: 16 * zoom + 'px' }"
                    >
                        <div
                            @click="windowClick(lang.NewTrendChart_NewTrendChartUserControl_Single)"
                            class="window_one"
                            :style="{ height: 36 * zoom + 'px', fontSize: 16 * zoom + 'px', lineHeight: 38 * zoom + 'px' }"
                        >{{ lang.NewTrendChart_NewTrendChartUserControl_Single }}</div>
                        <div
                            @click="windowClick(lang.NewTrendChart_NewTrendChartUserControl_Double)"
                            class="window_two"
                            :style="{ height: 36 * zoom + 'px', fontSize: 16 * zoom + 'px', lineHeight: 38 * zoom + 'px' }"
                        >{{ lang.NewTrendChart_NewTrendChartUserControl_Double }}</div>
                        <div
                            @click="windowClick(lang.NewTrendChart_NewTrendChartUserControl_Several)"
                            class="window_more"
                            :style="{ height: 36 * zoom + 'px', fontSize: 16 * zoom + 'px', lineHeight: 38 * zoom + 'px' }"
                        >{{ lang.NewTrendChart_NewTrendChartUserControl_Several }}</div>
                    </div>
                    <div
                        class="switch"
                        :style="{ height: 40 * zoom + 'px', fontSize: 16 * zoom + 'px' }"
                    >
                        <div class="switchcover" v-show="oksh" @click="okcover"></div>
                        <el-switch
                            @click.native="sh()"
                            v-model="value"
                            :active-text="swichValue"

                            active-color="#FFA12E"
                            inactive-color="#7E92A2"
                            :style="setStyle()"
                        ></el-switch>
                    </div>
                    <div
                        @click="open()"
                        class="set"
                        :style="{ height: 36 * zoom + 'px', fontSize: 16 * zoom + 'px', lineHeight: 34 * zoom + 'px' }"
                    >
                        <span>{{ lang.NewTrendChart_NewTrendChartUserControl_Settings }}</span>
                    </div>
                </div>
                <!-- 图表设置弹窗 -->
                <div
                    class="Popshow"
                    :style="{ width: 800 * zoom + 'px', height: 760 * zoom + 'px' }"
                >
                    <div
                        v-drag
                        class="head"
                        :class="{ colortip2: $store.state.color == 'grey' }"
                        :style="{ marginTop: 'unset', height: 60 * zoom + 'px', lineHeight: 60 * zoom + 'px' }"
                    >
                        <span
                            class="text"
                            :style="{ fontSize: 24 * zoom + 'px' }"
                        >{{ lang.NewTrendChart_ChartSetting_ChartSetting }}</span>
                        <span
                            @click="cancel"
                            class="i-c el-icon-close"
                            :style="{ fontSize: 30 * zoom + 'px' }"
                        ></span>
                    </div>
                    <div
                        class="conter"
                        :style="{ height: 605 * zoom + 'px', marginTop: 20 * zoom + 'px', marginBottom: 20 * zoom + 'px', }"
                    >
                        <div class="conter_head">
                            <div class="blo"></div>
                            <div
                                class="text"
                                :style="{ fontSize: 20 * zoom + 'px', lineHeight: 24 * zoom + 'px' }"
                            >{{ lang.NewTrendChart_ChartSetting_TitleSetting }}</div>
                            <div class="line"></div>
                        </div>
                        <div
                            class="conter_conter"
                            :style="{ height: 40 * zoom + 'px', marginTop: 20 * zoom + 'px' }"
                        >
                            <div
                                class="text"
                                :style="{ width: 147 * zoom + 'px', marginLeft: 20 * zoom + 'px', lineHeight: 40 * zoom + 'px' }"
                            >{{ lang.NewTrendChart_ChartSetting_TitleContent }}</div>
                            <input
                                ref="timeText"
                                :style="{
                                    fontSize: this.value4 * zoom + 'px',
                                    color: this.color1,
                                    height: 40 * zoom + 'px',
                                }"
                                class="time"
                                v-model="titleText"
                            />
                        </div>
                        <div
                            class="conter_xiala"
                            :style="{ height: 40 * zoom + 'px', marginTop: 15 * zoom + 'px' }"
                        >
                            <div
                                class="empty-title"
                                :style="{ width: 110 * zoom + 'px', minWidth: 110 * zoom + 'px', marginLeft: 20 * zoom + 'px', marginRight: 36 * zoom + 'px' }"
                            ></div>
                            <el-select
                                @focus="sx"
                                @change="textFontSelect"
                                class="text"
                                v-model="value1"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                            <div
                                class="blo"
                                :style="{ marginLeft: 15 * zoom + 'px', marginRight: 15 * zoom + 'px', width: 40 * zoom + 'px', height: 40 * zoom + 'px', }"
                            >
                                <el-color-picker
                                    @change="colorSelect"
                                    v-model="color1"
                                    :predefine="predefineColors"
                                ></el-color-picker>
                            </div>
                            <el-select
                                @focus="sx"
                                class="num"
                                @change="SizeNum"
                                v-model="value4"
                                :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                            >
                                <el-option
                                    v-for="item in optionsNum"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                            <div
                                ref="B"
                                @click="textWeight"
                                class="B"
                                :style="{ width: 70 * zoom + 'px', height: 40 * zoom + 'px', lineHeight: 40 * zoom + 'px' }"
                            >B</div>
                            <div
                                ref="I"
                                @click="textIta"
                                class="I"
                                :style="{ width: 70 * zoom + 'px', height: 40 * zoom + 'px', lineHeight: 40 * zoom + 'px' }"
                            >I</div>
                        </div>
                        <div
                            class="conter_show"
                            :style="{ height: 40 * zoom + 'px', marginTop: 20 * zoom + 'px' }"
                        >
                            <div class="blo"></div>
                            <div
                                class="text"
                                :style="{ fontSize: 20 * zoom + 'px', lineHeight: 24 * zoom + 'px' }"
                            >{{ lang.NewTrendChart_ChartSetting_DisplaySettings }}</div>
                            <div class="line"></div>
                        </div>
                        <div class="showSetting">
                            <div
                                class="conter_back"
                                :style="{ height: 40 * zoom + 'px', marginTop: 15 * zoom + 'px' }"
                            >
                                <div
                                    class="text"
                                    :style="{ fontSize: 16 * zoom + 'px' }"
                                >{{ lang.NewTrendChart_ChartSetting_ChartAreaBackground }}</div>
                                <div
                                    class="back"
                                    :style="{ marginRight: 15 * zoom + 'px', width: 40 * zoom + 'px', height: 40 * zoom + 'px', }"
                                >
                                    <el-color-picker
                                        @change="colorSelect1('2')"
                                        v-model="color2"
                                        :predefine="predefineColors"
                                    ></el-color-picker>
                                </div>
                            </div>
                            <div
                                class="conter_ray"
                                :style="{ height: 40 * zoom + 'px', lineHeight: 40 * zoom + 'px', marginTop: 15 * zoom + 'px' }"
                            >
                                <div
                                    class="text"
                                    :style="{ fontSize: 16 * zoom + 'px' }"
                                >{{ lang.NewTrendChart_ChartSetting_Cursor }}</div>
                                <div
                                    class="ray"
                                    :style="{ marginRight: 15 * zoom + 'px', width: 40 * zoom + 'px', height: 40 * zoom + 'px', }"
                                >
                                    <el-color-picker
                                        @change="colorSelect1('3')"
                                        v-model="color3"
                                        :predefine="predefineColors"
                                    ></el-color-picker>
                                </div>
                            </div>
                            <div
                                class="conter_line"
                                :style="{ height: 40 * zoom + 'px', lineHeight: 40 * zoom + 'px', marginTop: 15 * zoom + 'px' }"
                            >
                                <div
                                    class="text"
                                    :style="{ fontSize: 16 * zoom + 'px' }"
                                >{{ lang.NewTrendChart_ChartSetting_AuxiliaryGridLine }}</div>
                                <div
                                    class="line"
                                    :style="{ marginRight: 15 * zoom + 'px', width: 40 * zoom + 'px', height: 40 * zoom + 'px', }"
                                >
                                    <el-color-picker
                                        @change="colorSelect1('4')"
                                        v-model="color4"
                                        :predefine="predefineColors"
                                    ></el-color-picker>
                                </div>
                            </div>
                            <div
                                class="x_coordinate"
                                :style="{ height: 40 * zoom + 'px', marginTop: 15 * zoom + 'px' }"
                            >
                                <div
                                    class="x_text"
                                    :style="{ fontSize: 16 * zoom + 'px' }"
                                >{{ lang.NewTrendChart_ChartSetting_AbscissaText }}</div>
                                <el-select
                                    @focus="sx"
                                    @change="textFontSelect1('2')"
                                    class="text"
                                    v-model="value2"
                                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                                <div class="blo">
                                    <el-color-picker
                                        @change="colorSelect1('5')"
                                        v-model="color5"
                                        :predefine="predefineColors"
                                    ></el-color-picker>
                                </div>
                                <el-select
                                    @focus="sx"
                                    @change="SizeNum1('5')"
                                    class="num"
                                    v-model="value5"
                                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                                >
                                    <el-option
                                        v-for="item in optionsNum"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                                <div
                                    @click="textWeight1('x')"
                                    ref="Xb"
                                    class="b"
                                    :style="{ height: 40 * zoom + 'px', lineHeight: 40 * zoom + 'px' }"
                                >B</div>
                            </div>
                            <div
                                class="x_coordinate"
                                :style="{ height: 40 * zoom + 'px', marginTop: 15 * zoom + 'px' }"
                            >
                                <div
                                    class="x_text"
                                    :style="{ fontSize: 16 * zoom + 'px' }"
                                >{{ lang.NewTrendChart_ChartSetting_OrdinateText }}</div>
                                <el-select
                                    @focus="sx"
                                    @change="textFontSelect1('3')"
                                    class="text"
                                    v-model="value3"
                                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                                <div class="blo">
                                    <el-color-picker
                                        @change="colorSelect1('6')"
                                        v-model="color6"
                                        :predefine="predefineColors"
                                    ></el-color-picker>
                                </div>
                                <el-select
                                    @focus="sx"
                                    @change="SizeNum1('6')"
                                    class="num"
                                    v-model="value6"
                                    :placeholder="lang.SCMSConsoleWebApiMySql_PleChoose"
                                >
                                    <el-option
                                        v-for="item in optionsNum"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                                <div
                                    @click="textWeight1('y')"
                                    ref="Yb"
                                    class="b"
                                    :style="{ height: 40 * zoom + 'px', lineHeight: 40 * zoom + 'px' }"
                                >B</div>
                            </div>
                            <div class="show_value" :style="{ zoom }">
                                <div class="text">{{ lang.NewTrendChart_ChartSetting_Show }}</div>
                                <input @click="inpClick('Max')" ref="Max" type="checkbox" />
                                <span>{{ lang.NewTrendChart_ChartSetting_Maximum }}</span>
                                <input @click="inpClick('Min')" ref="Min" type="checkbox" />
                                <span>{{ lang.NewTrendChart_ChartSetting_Minimum }}</span>
                                <input @click="inpClick('Mean')" ref="Mean" type="checkbox" />
                                <span>{{ lang.NewTrendChart_ChartSetting_Average }}</span>
                            </div>

                            <div class="show_value" :style="{ zoom }">
                                <div class="text"><!-- 曲线缓存时间 -->{{lang.NewTrendChart_ChartSetting_CurveCacheTime}}</div>
                                <input @click="inpClick('EnableCurveCacheTime')" ref="EnableCurveCacheTime" type="checkbox" />
                                <input ref="timeText" :style="{fontSize: this.value4 * zoom + 'px',height: 40 * zoom + 'px'}"
                                    class="time"
                                    v-model="CurveCacheTime"
                                />
                                <span style="margin: 0 10px;font-size: 24px;" >S</span>
                                <el-tooltip
                                    effect="dark"
                                    :content="lang.NewTrendChart_ClearCurveSetting_CurveCacheTimeToolTip"
                                    placement="top"
                                >
                                    <i class="el-icon-question" style="curson: pointer; font-size: 20px;" ></i>
                                </el-tooltip>
                            </div>

                        </div>
                        <div class="button" :style="{ zoom }">
                            <div @click="keepFun" class="keep">{{ lang.PopupCommon_Save }}</div>
                            <div @click="cancel" class="cancel">{{ lang.PopupCommon_Cancel }}</div>
                        </div>
                    </div>
                    <!-- 弹窗提示 -->
                    <div v-if="confirShow" class="deletePop">
                        <div class="title">
                            <span class="title_i el-icon-warning"></span>
                            <span class="text">{{ lang.HT_MessageBoxCaption_Tips }}</span>
                        </div>
                        <div
                            class="delete_text delete_text11"
                        >{{ lang.QualityManage_HT_SampleChoseUserControlViewModel_SuccessfullySaved }}</div>
                        <div class="delete_btn">
                            <div @click="ConfirFun()" class="confir">{{ lang.MessageBox_Confrim }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="conter" :class="{ colortip: $store.state.color == 'grey' }">
            <!-- 切换单双多窗口 -->
                 <tendencyVue
                    :WindowClick="windowClickValue"
                    class="oneWindow"
                    :qeShow="queryShow1"
                    :Sstime="Stime"
                    :Eetime="Etime"
                    :curveID="curveID"
                    :timeShow="timeShow"
                    :Showtext="Showtext"
                    :dataType ="value"
                    ref="mychild1"
                    v-if="oneWindow"
                ></tendencyVue>
                  <tendencytwo
                    :show="showTime"
                    :curveID="curveID"
                    :timeShow="timeShow"
                    :Showtext="Showtext"
                    :window="window"
                    :windowClick="windowClickValue"
                    :moreWindow="moreWindow"
                    :twoWindow="twoWindow"
                    :oneWindow="oneWindow"
                    ref="mychild2"
                    v-if="twoWindow"
                ></tendencytwo>
                  <tendencyMo
                    :show1="showTime"
                    :curveID1="curveID"
                    :timeShow1="timeShow"
                    :moreWindow1="moreWindow"
                    :Showtext1="Showtext"
                    :windowClickValue1="windowClickValue"
                    ref="mychild3"
                    v-if="moreWindow"
                ></tendencyMo>
             <!-- <tendencyMo
                :show1="showTime"
                :curveID1="curveID"
                :timeShow1="timeShow"
                :moreWindow1="moreWindow"
                :Showtext1="Showtext"
                :windowClickValue1="windowClickValue"
                ref="mychild4"
                class="mychild4"
                v-if="StaWindow"
            ></tendencyMo> -->
            <TipsPop :popText="TipsPopText" v-if="isTipsPop" :style="{ zoom }"></TipsPop>
            <div v-if="isTipsPop" class="mask_box" :style="{ zoom }"></div>
        </div>
    </div>
</template>

<script>
import tendencyVue from './compont/tendencyVue.vue'
import tendencytwo from './compont/tendencytwo.vue'
import tendencyMo from './compont/tendenMo.vue'
import TipsPop from '../customer/TipsPop'
import { getPowerById } from '@/api/common.js'

export default {
    name: 'tendency',
    components: {
        tendencyVue,
        tendencytwo,
        tendencyMo,
        TipsPop
    },
    data() {
        return {
            oksh: false,
            calcheight: '',
            value: true,
            switchtext: true,
            swichValue: '',
            oneWindow: true,
            twoWindow: false,
            moreWindow: false,
            StaWindow: true,
            StaShow: true,
            showTime: true,
            wshow: true,
            Stime: '',
            Etime: '',
            timeShow: true,
            Showtext: '',
            curveID: [],
            queryShow1: true,
            window: true,
            ChartTitle: '',
            ChartFontSize: '',
            ChartForeground: '',
            Showindex: 0,
            windowClickValue: '',
            options: [],
            confirShow: false, //设置弹窗保存
            //弹窗属性
            //选择器
            optionsNum: [{
                value: '14',
                label: '14'
            }, {
                value: '16',
                label: '16'
            }, {
                value: '18',
                label: '18'
            }, {
                value: '20',
                label: '20'
            }, {
                value: '22',
                label: '22'
            },
            {
                value: '24',
                label: '24'
            },
            {
                value: '26',
                label: '26'
            },
            {
                value: '28',
                label: '28'
            },
            {
                value: '30',
                label: '30'
            }],
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            titleText: '',
            ChartFontIsB: '',
            ChartFontIsI: '',
            XFontIsB: '',
            XFontIsI: '',
            YFontIsB: '',
            YFontIsI: '',
            Max: '',
            Min: '',
            Mean: '',
            EnableCurveCacheTime: '',
            CurveCacheTime: '',
            //颜色
            color1: '#fff',
            color2: '#fff',
            color3: "#fff",
            color4: "#fff",
            color5: "#fff",
            color6: "#fff",
            predefineColors: [
                '#000000',
                '#434343',
                '#666666',
                '#cccccc',
                '#d9d9d9',
                '#ffffff',
                '#980000',
                '#ff0000',
                '#ff9900',
                '#ffff00',
                '#00ff00',
                '#00ffff',
                '#4a86e8',
                '#0000ff',
                '#9900ff',
                '#ff00ff',
                '#e6b8af',
                '#f4cccc',
                '#fce5cd',
                '#fff2cc',
                '#d9ead3',
                '#d0e0e3',
                '#c9daf8',
                '#cfe2f3',
                '#d9d2e9',
                '#ead1dc',
                '#dd7e6b',
                '#ea9999',
                '#f9cb9c',
                '#ffe599',
                '#b6d7a8',
                '#a2c4c9',
                '#a4c2f4',
                '#9fc5e8',
                '#b4a7d6',
                '#d5a6bd',
                '#cc4125',
                '#e06666',
                '#f6b26b',
                '#ffd966',
                '#93c47d',
                '#76a5af',
                '#6d9eeb',
                '#6fa8dc',
                '#8e7cc3',
                '#c27ba0',
                '#6aa84f',
                '#45818e',
                '#3c78d8',
                '#3d85c6',
                '#674ea7',
                '#a64d79',
                '#5b0f00',
                '#660000',
                '#783f04',
                '#7f6000',
                '#274e13',
                '#0c343d',
                '#1c4587',
                '#073763',
                '#20124d',
                '#4c1130'
            ],
            //按钮权限
            isTipsPop: false,                  //弹窗show
            TipsPopText: '该用户没有操作权限',  //弹窗提示文本
            queryId: '',                      //单窗口查询id
            queryId2: '',                     //双窗口查询id
            queryId3: '',                     //多窗口查询id
            exportId: '',                     //导出id
            oneWindowId: '',                  //单窗口id
            twoWindowId: '',                  //双窗口id
            moreWindowId: '',                 //多窗口id
            changeTypeId: '',                 //历史实时切换id
            ischangeType: false,              //历史实时是否禁用
            setId: '',                        //设置弹窗id
            editId: '',                       //单窗口编辑id
            deleteId: '',                     //单窗口删除id
            selectId: '',                     //选择曲线
            showTypeId: '',                   //显示类型
            zoom: 1,
            zoom1: 1,
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')]
        }
    },
    watch: {
        Stime(n, o) {   //开始时间传给子组件
            if (typeof (n) == 'object') {
                this.Stime = this.getTime(this.Stime)
            }
        },
        Etime(n, o) {  //结束时间给子组件
            if (typeof (n) == 'object') {
                this.Etime = this.getTime(this.Etime)
            }
        },
        VpowerData(n, o) {
            this.powerBtn()
        }
    },
    destroyed() {   //退出组件清除定时器
        clearInterval(this.time2);
    },
    created() {
        this.$store.state.showTime = true
        this.getLangData()
        this.getDate2()
        this.getDate()
        this.axiosId()
        this.axiosSet()
        this.powerBtn()
    },

    mounted() {
        this.zoom1 = window.screen.width / 1920 < 0.8 ? 0.8 : window.screen.width / 1920
        let a = this.zoom1 * 30 + 'px'
        this.calcheight = `calc(100% - ${a})`
        setTimeout(() => {
            $(".el-date-editor--datetime>.el-input__inner").css({ height: 40 + 'px' })
            $(".el-switch__label *").css({ height: 38 + "px", lineHeight: 1, top: '-2px' })
            $(".el-input__inner").css({ height: 40 + 'px' })
            $(".el-switch__core").css({ height: 40 + 'px', width: 120 + 'px' })
            $(".el-select.text").css({ height: 40 + 'px', width: 200 + 'px' })
            $(".el-select.num").css({ height: 40 + 'px', width: 90 + 'px' })
            $(".el-color-picker__trigger").css({ height: 40 + 'px', width: 40 + 'px' })
            if (window.screen.width <= 1280) {
                $(".el-switch__label *").css({ height: 38 + "px", lineHeight: 1, top: 0 })
            }
        })
    },
    computed: {
        VpowerData() { //按钮权限
            return this.$store.state.btnPowerData;
        },
    },
    directives: {   //拖动弹窗
        drag: function (el) {
            let dragBox = el; //获取当前元素
            dragBox.onmousedown = e => {
                let disX = e.clientX;  //算出鼠标相对元素的位置
                let disY = e.clientY;
                document.onmousemove = e => {
                    let left = e.clientX - disX; //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let top = e.clientY - disY;
                    $(el).parents('.Popshow')[0].style.left = left + "px"; //移动当前元素
                    $(el).parents('.Popshow')[0].style.top = top + "px";
                };
                document.onmouseup = e => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    },
    methods: {
        setStyle() {
            return {
                $width: 32 * this.zoom + 'px'
            }
        },
        getLangData() {
            this.swichValue = this.lang.NewTrendChart_NewTrendChartUserControl_Current
        },
        //关闭弹窗提示
        clonePopFun() {
            this.isTipsPop = false
        },
        //开启弹窗提示
        openPopFun() {
            this.isTipsPop = true
        },
        //筛选按钮数据
        powerBtn() {
            var powerData = this.$store.state.btnPowerData
            var btnList = [] // 按钮数据列表
            var btnObj = {} // 按钮对象是为了能根据key快速查询对应的按钮数据

            // 获取按钮权限ID
            for (let i = 0, iLen = powerData.length; i < iLen; i++) {
                const Children = powerData[i].Children;
                for (let n = 0, nLen = Children.length; n < nLen; n++) {
                    const item = Children[n];
                    if (item.RightID === this.$route.query.id) {
                        btnList = item.Children;
                        break
                    }
                }
                if (btnList.length) break;
            }
            btnList.forEach((item) => {
                btnObj[item.RightDesc] = item
            });
            this.queryId = btnObj['趋势曲线-单窗口-查询按钮'].RightID
            this.oneWindowId = btnObj['趋势曲线-单窗口'].RightID
            this.twoWindowId = btnObj['趋势曲线-双窗口'].RightID
            this.moreWindowId = btnObj['趋势曲线-多窗口'].RightID
            this.changeTypeId = btnObj['趋势曲线-实时历史切换按钮'].RightID
            this.setId = btnObj['趋势曲线-设置按钮'].RightID
            this.editId = btnObj['趋势曲线-单窗口-编辑按钮'].RightID
            this.deleteId = btnObj['趋势曲线-单窗口-删除按钮'].RightID
            this.exportId = btnObj['趋势曲线-单窗口-导出按钮'].RightID
            this.queryId2 = btnObj['趋势曲线-双窗口-查询按钮'].RightID
            this.queryId3 = btnObj['趋势曲线-多窗口-查询按钮'].RightID
            this.selectId = btnObj['趋势曲线-单窗口-选择曲线'].RightID
            this.showTypeId = btnObj['趋势曲线-单窗口-正常显示/按比例'].RightID
            
            //历史实时开发是否有权限
            var userid = '';
            if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
                userid = JSON.parse(sessionStorage.getItem('sightseerInfo1')).SCMSUserID;
            } else {
                userid = JSON.parse(sessionStorage.getItem('userInfo1')).SCMSUserID;
            }
            getPowerById(userid, this.changeTypeId).then(res => {
                this.oksh = !res.data.data
            })
            // this.isPower(this.changeTypeId).then(val => {
            //      this.oksh = true
            //     this.ischangeType = val 
            // })
        },
        //该用户是否有权限
        isPower(id, name) {
            return new Promise((resolve, reject) => {
                var userInfo1 = JSON.parse(sessionStorage.getItem('userInfo1'));
                var sightseerInfo1 = JSON.parse(sessionStorage.getItem('sightseerInfo1'));
                var argUserID = (userInfo1 != null) ? userInfo1.SCMSUserID : sightseerInfo1.SCMSUserID;
                var argRightID = id;
                switch (name) {
                    case '编辑':
                        argRightID = this.editId
                        break;
                    case '删除':
                        argRightID = this.editId
                        break;
                    case '导出':
                        argRightID = this.editId
                        break;
                    case '双窗口查询':
                        argRightID = this.editId
                        break;
                    case '多窗口查询':
                        argRightID = this.editId
                        break;
                    case '选择曲线':
                        argRightID = this.editId
                        break;
                    default:
                        break;
                }
                // 权限配置请求接口
                this.$axios.post(`/api/UserManage/UserManage_CheckAuthority?argUserID=${argUserID}&argRightID=${argRightID}`)
                .then(res => {
                    resolve(res.data.data) // 是否权限
                }, err => {
                    reject(err)
                })
            })
        },

        //更改开始结束时间
        SetTime2(Stime, Etime) {
            this.Etime = Etime
            this.Stime = Stime
        },
        //设置保存
        keepFun() {
            if(this.EnableCurveCacheTime) {
                if(!this.CurveCacheTime) {
                    this.confirm_Pop2(this, this.lang.NewTrendChart_ChartSetting_CurveCacheTimeSaveError)
                    return
                }

                if(this.CurveCacheTime <= 0 || this.CurveCacheTime > 1800) {
                    this.confirm_Pop2(this, this.lang.NewTrendChart_ChartSetting_CurveCacheTimeSaveError)
                    return
                }
            }

            var arr = {
                ChartTitle: this.titleText,
                ChartFontFamily: this.value1,
                ChartForeground: '#FF' + this.color1.slice(1),
                ChartFontSize: this.value4,
                ChartFontIsB: this.ChartFontIsB,
                ChartFontIsI: this.ChartFontIsI,
                ChartBackground: '#FF' + this.color2.slice(1),
                CursorColor: '#FF' + this.color3.slice(1),
                LineColor: '#FF' + this.color4.slice(1),
                XFontFamily: this.value2,
                XForeground: '#FF' + this.color5.slice(1),
                XFontSize: this.value5,
                XFontIsB: this.XFontIsB,
                XFontIsI: false,
                YFontFamily: this.value3,
                YForeground: '#FF' + this.color6.slice(1),
                YFontSize: this.value6,
                YFontIsB: this.YFontIsB,
                YFontIsI: false,
                Max: this.Max,
                Min: this.Min,
                Mean: this.Mean,
                EnableCurveCacheTime: this.EnableCurveCacheTime,
                CurveCacheTime: this.CurveCacheTime,
            }
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/UpdateChartSetting",
                data: arr
            }).then((res) => {
                this.lang.QualityManage_HT_SampleChoseUserControlViewModel_SuccessfullySaved = res.data.data
                //   if(res.data.data== '保存成功！'){
                this.confirShow = true
                if (this.$refs.mychild1 != undefined) {
                    this.$refs.mychild1.axiosSet()
                }
                if (this.$refs.mychild2 != undefined) {
                    this.$refs.mychild2.axiosSet2()
                }
                if (this.$refs.mychild3 != undefined) {
                    this.$refs.mychild3.axiosSet2()
                }
                this.axiosSet()
                //   }
            })
        },
        //保存弹框确认
        ConfirFun() {
            this.confirShow = false
            if (document.querySelector('.Popshow')) {
                document.querySelector('.Popshow').style.display = 'none'
            }
        },
        //设置字体大小
        SizeNum() {
            if (this.$refs.timeText) {
                this.$refs.timeText.style.fontSize = this.value4 + 'px'
            }
        },
        //字体粗细
        textWeight() {
            if (!this.ChartFontIsB) {
                if (this.$refs.timeText) {
                    this.$refs.timeText.style.fontWeight = 'bold'
                }
                if (this.$refs.timeText1) {
                    this.$refs.timeText1.style.fontWeight = 'bold'
                }
                if (this.$refs.B) {
                    this.$refs.B.style.backgroundColor = '#cccccc'
                }
                this.ChartFontIsB = !this.ChartFontIsB
            } else {
                if (this.$refs.timeText) {
                    this.$refs.timeText.style.fontWeight = 'normal'
                }
                if (this.$refs.timeText1) {
                    this.$refs.timeText1.style.fontWeight = 'normal'
                }
                if (this.$refs.B) {
                    this.$refs.B.style.backgroundColor = '#fff'
                }
                this.ChartFontIsB = !this.ChartFontIsB
            }
        },
        //字体倾斜
        textIta() {
            if (!this.ChartFontIsI) {
                if (this.$refs.timeText) {
                    this.$refs.timeText.style.fontStyle = 'italic'
                }
                if (this.$refs.timeText1) {
                    this.$refs.timeText1.style.fontStyle = 'italic'
                }
                if (this.$refs.I) {
                    this.$refs.I.style.backgroundColor = '#cccccc'
                }
                this.ChartFontIsI = !this.ChartFontIsI
            } else {
                if (this.$refs.timeText) {
                    this.$refs.timeText.style.fontStyle = 'normal'
                }
                if (this.$refs.timeText1) {
                    this.$refs.timeText1.style.fontStyle = 'normal'
                }
                if (this.$refs.I) {
                    this.$refs.I.style.backgroundColor = '#fff'
                }
                this.ChartFontIsI = !this.ChartFontIsI
            }
        },
        //字体颜色选择
        colorSelect() {
            this.color1 = this.colorRGBtoHex(this.color1)
            if (this.$refs.timeText) {
                this.$refs.timeText.style.color = this.color1
            }
        },
        //字体类型选择
        textFontSelect() {
            if (this.$refs.timeText) {
                this.$refs.timeText.style.fontFamily = this.value1
            }
            if (this.$refs.timeText1) {
                this.$refs.timeText1.style.fontFamily = this.value1
            }
        },
        //最大最小值
        inpClick(text) {
            if (text == 'Max') {
                if (this.$refs.Max) {
                    this.Max = this.$refs.Max.checked
                }
            } else if (text == "Min") {
                if (this.$refs.Min) {
                    this.Min = this.$refs.Min.checked
                }
            } else if (text == "Mean") {
                if (this.$refs.Mean) {
                    this.Mean = this.$refs.Mean.checked
                }
            } else if (text === 'EnableCurveCacheTime') {
                if (this.$refs.EnableCurveCacheTime) {
                    this.EnableCurveCacheTime = this.$refs.EnableCurveCacheTime.checked
                }
            }
        },
        //其他颜色选择器
        colorSelect1(text) {
            if (text == '2') {
                this.color2 = this.colorRGBtoHex(this.color2)
            } else if (text == '3') {
                this.color3 = this.colorRGBtoHex(this.color3)
            } else if (text == '4') {
                this.color4 = this.colorRGBtoHex(this.color4)
            } else if (text == '5') {
                this.color5 = this.colorRGBtoHex(this.color5)
            } else if (text == '6') {
                this.color6 = this.colorRGBtoHex(this.color6)
            }
        },
        //其他字体类型选择
        textFontSelect1(text) {
            if (text == '2') {
                this.value2 = this.value2
            } else if (text == '3') {
                this.value3 = this.value3
            }
        },
        //其他字体大小
        SizeNum1(text) {
            if (text == '5') {
                this.value5 = this.value5
            } else if (text == '6') {
                this.value6 = this.value6
            }
        },
        //其他粗细
        textWeight1(text) {
            if (text == 'x') {
                if (!this.XFontIsB) {
                    if (this.$refs.Xb) {
                        this.$refs.Xb.style.backgroundColor = '#cccccc'
                    }
                    this.XFontIsB = !this.XFontIsB
                } else {
                    if (this.$refs.Xb) {
                        this.$refs.Xb.style.backgroundColor = '#fff'
                    }
                    this.XFontIsB = !this.XFontIsB
                }
            } else if (text == 'y') {
                if (!this.YFontIsB) {
                    if (this.$refs.Yb) {
                        this.$refs.Yb.style.backgroundColor = '#cccccc'
                    }
                    this.YFontIsB = !this.YFontIsB
                } else {
                    if (this.$refs.Yb) {
                        this.$refs.Yb.style.backgroundColor = '#fff'
                    }
                    this.YFontIsB = !this.YFontIsB
                }
            }
        },
        //请求曲线图表设置
        axiosSet() {
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/QueryChartSetting",
            }).then((res) => {
                this.$nextTick(() => {
                    if (this.$refs.timeText) {
                        this.$refs.timeText.style.color = '#' + res.data.data.ChartForeground.slice(3)
                    }
                    if (res.data.data) {
                        this.titleText = res.data.data.ChartTitle
                        this.value1 = res.data.data.ChartFontFamily
                        this.value2 = res.data.data.XFontFamily
                        this.value3 = res.data.data.YFontFamily
                        this.value4 = res.data.data.ChartFontSize
                        this.value5 = res.data.data.XFontSize
                        this.value6 = res.data.data.YFontSize
                        this.color1 = '#' + res.data.data.ChartForeground.slice(3)
                        this.color2 = '#' + res.data.data.ChartBackground.slice(3)
                        this.color3 = '#' + res.data.data.CursorColor.slice(3)
                        this.color4 = '#' + res.data.data.LineColor.slice(3)
                        this.color5 = '#' + res.data.data.XForeground.slice(3)
                        this.color6 = '#' + res.data.data.YForeground.slice(3)
                        this.ChartFontIsB = res.data.data.ChartFontIsB
                        this.ChartFontIsI = res.data.data.ChartFontIsI
                        this.Max = res.data.data.Max
                        this.Min = res.data.data.Min
                        this.Mean = res.data.data.Mean
                        this.EnableCurveCacheTime = res.data.data.EnableCurveCacheTime
                        this.CurveCacheTime = res.data.data.CurveCacheTime
                        this.XFontIsB = res.data.data.XFontIsB
                        this.XFontIsI = res.data.data.XFontIsI
                        this.YFontIsB = res.data.data.YFontIsB
                        this.YFontIsI = res.data.data.YFontIsI
                    }
                    if (document.querySelector('.head_text')) {
                        document.querySelector('.head_text').style.fontWeight = this.ChartFontIsB == true ? 'bold' : 'normal'
                    }
                    if (document.querySelector('.head_text')) {
                        document.querySelector('.head_text').style.fontStyle = this.ChartFontIsI == true ? 'italic' : 'normal'
                    }
                    if (document.querySelector('.head_text')) {
                        document.querySelector('.head_text').style.fontFamily = this.value1
                    }
                    //标题字体是否加粗/倾斜
                    this.ChartFontFun(this.ChartFontIsB, this.ChartFontIsI, this.$refs.timeText, this.$refs.B, this.$refs.I)
                    //X字体是否加粗/倾斜
                    this.XYFontIsB(this.XFontIsB, this.XFontIsI, this.$refs.Xb)
                    //Y字体是否加粗/倾斜
                    this.XYFontIsB(this.YFontIsB, this.YFontIsI, this.$refs.Yb)
                    //表格是否显示最大小值
                    if (this.Max) {
                        if (this.$refs.Max) {
                            this.$refs.Max.checked = true
                        }
                    }
                    if (this.Min) {
                        if (this.$refs.Min) {
                            this.$refs.Min.checked = true
                        }
                    }
                    if (this.Mean) {
                        if (this.$refs.Mean) {
                            this.$refs.Mean.checked = true
                        }
                    }
                    if (this.EnableCurveCacheTime) {
                        if(this.$refs.EnableCurveCacheTime) {
                            this.$refs.EnableCurveCacheTime.checked = true
                        }
                    }
                    this.axiosSizeType()

                })
            })
        },
        //粗细/倾斜
        ChartFontFun(BShow, IShow, dom2, dom3, dom4) {
            if (BShow) {
                if (dom2) {
                    dom2.style.fontWeight = 'bold'
                }
                if (dom3) {
                    dom3.style.backgroundColor = '#cccccc'
                }
            } else {
                if (dom2) {
                    dom2.style.fontWeight = 'normal'
                }
                if (dom3) {
                    dom3.style.backgroundColor = '#ffffff'
                }
            }
            if (IShow) {
                if (dom2) {
                    dom2.style.fontStyle = 'italic'
                }
                if (dom4) {
                    dom4.style.backgroundColor = '#cccccc'
                }
            } else {
                if (dom2) {
                    dom2.style.fontStyle = 'normal'
                }
                if (dom4) {
                    dom4.style.backgroundColor = '#ffffff'
                }
            }
        },
        XYFontIsB(BShow, IShow, dom3) {
            if (BShow) {
                if (dom3) {
                    dom3.style.backgroundColor = '#cccccc'
                }
            } else {
                if (dom3) {
                    dom3.style.backgroundColor = '#ffffff'
                }
            }
        },
        //查询字体类型集合
        axiosSizeType() {
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/QueryFontFamilies",
            }).then((res) => {
                this.options = []
                for (var i = 0; i < res.data.data.length; i++) {
                    var value = {
                        value: res.data.data[i],
                        label: res.data.data[i]
                    }
                    this.options.push(value)
                }
            })
        },
        //请求曲线ID
        axiosId() {
            this.$axios({
                method: "post",
                url: "/api/NewTrendChart/QuerySeriesGroups",
            }).then((res) => {
                this.curveID = res.data.data
            })
        },
        sx() {

            let that = this
            setTimeout(() => {
                for (let i = 0; i < $('.el-picker-panel').length; i++) {
                    $('.el-picker-panel')[i].style.zoom = that.zoom1
                }
                for (let i = 0; i < $('.el-select-dropdown').length; i++) {
                    $('.el-select-dropdown')[i].style.zoom = that.zoom1
                }
            })

        },
        //查询
        queryFun() {
            this.isPower(this.queryId).then(val => {  //按钮权限
                if (val) {
                    this.queryShow1 = !this.queryShow1  //true\false变化子组件监听 TODO：应该做成调用子组件方法
                } else {
                    this.isTipsPop = true
                }
            })
        },
        //时间格式化
        getTime(dt) {                     //TODO：应该用monen插件
            var year = dt.getFullYear();        //获取当前月
            var month = dt.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = dt.getDate();
            var da = date > 9 ? date : '0' + date
            var h = dt.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = dt.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = dt.getSeconds();
            var se = s > 9 ? s : '0' + s
            var str = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se         //获取当前时间
            return str;
        },
        //初始化时间
        getDate() {          //TODO：应该用monen插件
            var myDate = new Date(); //获取当前年
            var year = myDate.getFullYear();        //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var now = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se         //获取当前时间
            this.Etime = year + '-' + mothe + '-' + da + ' ' + '23:' + '59: 59'
        },
        //初始化时间
        getDate2() {        //TODO：应该用monen插件
            var myDate = new Date(); //获取当前年
            var year = myDate.getFullYear();        //获取当前月
            var month = myDate.getMonth() + 1;
            var mothe = month > 9 ? month : '0' + month            //获取当前日
            var date = myDate.getDate();
            var da = date > 9 ? date : '0' + date
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var he = h > 9 ? h : '0' + h
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var me = m > 9 ? m : '0' + m
            var s = myDate.getSeconds();
            var se = s > 9 ? s : '0' + s
            var now = year + '-' + mothe + '-' + da + ' ' + he + ':' + me + ':' + se         //获取当前时间
            this.Stime = year + '-' + mothe + '-' + da + ' 00:00:00'
        },
        //正常比例显示
        show(text) {

            this.isPower(this.showTypeId).then(val => {//按钮权限
                if (val) {
                    let show = document.querySelectorAll('.show > div')
                    this.Showtext = text
                    this.$store.state.Showtext = text
                    //颜色
                    for (var i = 0; i < show.length; i++) {
                        show[i].style.backgroundColor = "#fff";
                        show[i].style.color = "#4270E4";
                        if (text == 0) {
                            show[0].style.backgroundColor = "#4270E4";
                            show[0].style.color = "#fff";
                        } else {
                            show[1].style.backgroundColor = "#4270E4";
                            show[1].style.color = "#fff";
                        }
                    }
                } else {
                    this.isTipsPop = true
                }
                if (!this.showTime) {
                    let formatter = "{value}"
                    if (text == 0) {
                        formatter = "{value}"
                    } else {
                        formatter = "{value}%"
                    }
                    if (document.getElementById('qscxchart1')) {
                        let chart1 = this.$echarts.init(document.getElementById('qscxchart1'))
                        let data = chart1.getOption()
                        data.yAxis[0].axisLabel.formatter = formatter
                        chart1.setOption(data, true)
                    }
                    if (document.getElementById('qscxchart2')) {
                        let chart1 = this.$echarts.init(document.getElementById('qscxchart2'))
                        let data = chart1.getOption()
                        data.yAxis[0].axisLabel.formatter = formatter
                        chart1.setOption(data, true)
                    }
                    if (document.getElementById('qscxchart3')) {
                        let chart1 = this.$echarts.init(document.getElementById('qscxchart3'))
                        let data = chart1.getOption()
                        data.yAxis[0].axisLabel.formatter = formatter
                        chart1.setOption(data, true)
                    }
                    if (document.getElementById('qscxchart4')) {
                        let chart1 = this.$echarts.init(document.getElementById('qscxchart4'))
                        let data = chart1.getOption()
                        data.yAxis[0].axisLabel.formatter = formatter
                        chart1.setOption(data, true)
                    }
                    if (document.getElementById('qscxcharttwo')) {
                        let chart1 = this.$echarts.init(document.getElementById('qscxcharttwo'))
                        let data = chart1.getOption()
                        data.yAxis[0].axisLabel.formatter = formatter
                        chart1.setOption(data, true)
                    }
                    if (document.getElementById('qscxcharttree')) {
                        let chart1 = this.$echarts.init(document.getElementById('qscxcharttree'))
                        let data = chart1.getOption()
                        data.yAxis[0].axisLabel.formatter = formatter
                        chart1.setOption(data, true)
                    }
                    if (document.getElementById('qscxchartone')) {

                        let chart1 = this.$echarts.init(document.getElementById('qscxchartone'))
                        let data = chart1.getOption()
                        data.yAxis[0].axisLabel.formatter = formatter
                        chart1.setOption(data, true)
                    }

                }
            })

        },
        okcover() {
            if(!this.ischangeType){
                this.isTipsPop = true
                // this.oksh = true
                return
            }
            // if (document.getElementById('qscxchartone')) {
            //     if (this.$refs.mychild1.curveLineValue.length !== 0) {
            //         this.oksh = false
            //     }
            // }
            // if (document.getElementById('qscxcharttwo')) {
            //     if (this.$refs.mychild2.$refs.mychild22.curveLineValue.length !== 0 && this.$refs.mychild2.$refs.mychild23.curveLineValue.length !== 0) {
            //         this.oksh = false
            //     }
            // }
            // if (document.getElementById('qscxchart1')) {
            //     if (this.moreWindow) {
            //         if (this.$refs.mychild3.$refs.mychild4.curveLineValue.length !== 0 && this.$refs.mychild3.$refs.mychild5.curveLineValue.length !== 0 && this.$refs.mychild3.$refs.mychild6.curveLineValue.length !== 0 && this.$refs.mychild3.$refs.mychild32.curveLineValue.length !== 0) {
            //             this.oksh = false
            //         }
            //     }
            //     if (this.StaWindow) {
            //         if (this.$refs.mychild4.$refs.mychild4.curveLineValue.length !== 0 && this.$refs.mychild4.$refs.mychild5.curveLineValue.length !== 0 && this.$refs.mychild4.$refs.mychild6.curveLineValue.length !== 0 && this.$refs.mychild4.$refs.mychild32.curveLineValue.length !== 0) {
            //             this.oksh = false
            //         }
            //     }

            // }
        },
        //开关历史
        sh() {
            // if(this.ischangeType){
            //     this.isTipsPop = true
            //     this.oksh = true
            // }    
                        //TODO：应该做成调用子组件方法
            this.isPower(this.changeTypeId).then(val => {//按钮权限

                // this.oksh = true
                this.$store.state.oksh = true
                if (val) {
                    this.showTime = !this.showTime
                    this.$store.state.showTime = this.showTime
                    let that = this
                    setTimeout(() => {
                        if (this.showTime) {
                            if (document.getElementById('qscxchart1')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxchart1'))
                                let data = chart1.getOption()
                                data.toolbox = {}
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxchart2')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxchart2'))
                                let data = chart1.getOption()
                                data.toolbox = {}
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxchart3')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxchart3'))
                                let data = chart1.getOption()
                                data.toolbox = {}
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxchart4')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxchart4'))
                                let data = chart1.getOption()
                                data.toolbox = {}
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxcharttwo')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxcharttwo'))
                                chart1.resize()
                            }


                            if (document.getElementById('qscxcharttree')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxcharttree'))
                                let data = chart1.getOption()
                                data.toolbox = {}
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxchartone')) {

                                let chart1 = that.$echarts.init(document.getElementById('qscxchartone'))
                                let data = chart1.getOption()
                                data.toolbox = {}
                                chart1.setOption(data, true)
                            }
                        } else {
                            if (document.getElementById('qscxchart1')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxchart1'))
                                let data = chart1.getOption()
                                data.toolbox = {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none',
                                            title: {
                                                zoom: this.lang.NewTrendChart_Actions_Zoom,
                                                back: this.lang.NewTrendChart_Actions_ZoomReset
                                            }
                                        },
                                        restore: {
                                            title: this.lang.NewTrendChart_Actions_Reset
                                        },
                                    }
                                }
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxchart2')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxchart2'))
                                let data = chart1.getOption()
                                data.toolbox = {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none',
                                            title: {
                                                zoom: this.lang.NewTrendChart_Actions_Zoom,
                                                back: this.lang.NewTrendChart_Actions_ZoomReset
                                            }
                                        },
                                        restore: {
                                            title: this.lang.NewTrendChart_Actions_Reset
                                        },
                                    }
                                }
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxchart3')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxchart3'))
                                let data = chart1.getOption()
                                data.toolbox = {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none',
                                            title: {
                                                zoom: this.lang.NewTrendChart_Actions_Zoom,
                                                back: this.lang.NewTrendChart_Actions_ZoomReset
                                            }
                                        },
                                        restore: {
                                            title: this.lang.NewTrendChart_Actions_Reset
                                        },
                                    }
                                }
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxchart4')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxchart4'))
                                let data = chart1.getOption()
                                data.toolbox = {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none',
                                            title: {
                                                zoom: this.lang.NewTrendChart_Actions_Zoom,
                                                back: this.lang.NewTrendChart_Actions_ZoomReset
                                            }
                                        },
                                        restore: {
                                            title: this.lang.NewTrendChart_Actions_Reset
                                        },
                                    }
                                }
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxcharttwo')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxcharttwo'))
                                let data = chart1.getOption()
                                data.toolbox = {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none',
                                            title: {
                                                zoom: this.lang.NewTrendChart_Actions_Zoom,
                                                back: this.lang.NewTrendChart_Actions_ZoomReset
                                            }
                                        },
                                        restore: {
                                            title: this.lang.NewTrendChart_Actions_Reset
                                        },
                                    }
                                }
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxcharttree')) {
                                let chart1 = that.$echarts.init(document.getElementById('qscxcharttree'))
                                let data = chart1.getOption()
                                data.toolbox = {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none',
                                            title: {
                                                zoom: this.lang.NewTrendChart_Actions_Zoom,
                                                back: this.lang.NewTrendChart_Actions_ZoomReset
                                            }
                                        },
                                        restore: {
                                            title: this.lang.NewTrendChart_Actions_Reset
                                        },
                                    }
                                }
                                chart1.setOption(data, true)
                            }
                            if (document.getElementById('qscxchartone')) {

                                let chart1 = that.$echarts.init(document.getElementById('qscxchartone'))
                                let data = chart1.getOption()
                                data.toolbox = {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none',
                                            title: {
                                                zoom: this.lang.NewTrendChart_Actions_Zoom,
                                                back: this.lang.NewTrendChart_Actions_ZoomReset
                                            }
                                        },
                                        restore: {
                                            title: this.lang.NewTrendChart_Actions_Reset
                                        },
                                    }
                                }
                                chart1.setOption(data, true)
                            }
                        }

                    })

                    this.switchtext = !this.switchtext
                    var d = document.querySelector('.el-switch__label *')
                    if (!this.switchtext) {
                        d.style.left = 53 * this.zoom + "px"
                        this.swichValue = this.lang.NewTrendChart_NewTrendChartUserControl_History
                        this.timeShow = false
                        clearInterval(this.time2);
                    } else {
                        d.style.left = 15 * this.zoom + "px"
                        this.swichValue = this.lang.NewTrendChart_NewTrendChartUserControl_Current
                        this.timeShow = true
                    }


                } else {
                    this.isTipsPop = true
                }
            })

        },
        //窗口显示
        windowClick(text, index, stime, etime) {

            if (!this.showTime) {
                if (stime && etime) {
                    this.Stime = stime
                    this.Etime = etime
                    let that = this
                    setTimeout(() => {
                        that.queryFun()
                    }, 500);

                }
            }
            var that = this
            setTimeout(() => {

                let formatter = "{value}"
                if (this.$store.state.Showtext == 1) {
                    formatter = "{value}%"
                } else {
                    formatter = "{value}"

                }
                if (document.getElementById('qscxchart1')) {
                    let chart1 = this.$echarts.init(document.getElementById('qscxchart1'))
                    let data = chart1.getOption()
                    data.yAxis[0].axisLabel.formatter = formatter
                    chart1.setOption(data, true)
                }
                if (document.getElementById('qscxchart2')) {
                    let chart1 = this.$echarts.init(document.getElementById('qscxchart2'))
                    let data = chart1.getOption()
                    data.yAxis[0].axisLabel.formatter = formatter
                    chart1.setOption(data, true)
                }
                if (document.getElementById('qscxchart3')) {
                    let chart1 = this.$echarts.init(document.getElementById('qscxchart3'))
                    let data = chart1.getOption()
                    data.yAxis[0].axisLabel.formatter = formatter
                    chart1.setOption(data, true)
                }
                if (document.getElementById('qscxchart4')) {
                    let chart1 = this.$echarts.init(document.getElementById('qscxchart4'))
                    let data = chart1.getOption()
                    data.yAxis[0].axisLabel.formatter = formatter
                    chart1.setOption(data, true)
                }
                if (document.getElementById('qscxcharttwo')) {
                    let chart1 = this.$echarts.init(document.getElementById('qscxcharttwo'))
                    let data = chart1.getOption()
                    data.yAxis[0].axisLabel.formatter = formatter
                    chart1.setOption(data, true)
                }
                if (document.getElementById('qscxcharttree')) {
                    let chart1 = this.$echarts.init(document.getElementById('qscxcharttree'))
                    let data = chart1.getOption()
                    data.yAxis[0].axisLabel.formatter = formatter
                    chart1.setOption(data, true)
                }
                if (document.getElementById('qscxchartone')) {
                    let chart1 = that.$echarts.init(document.getElementById('qscxchartone'))
                    let data = chart1.getOption()
                    data.yAxis[0].axisLabel.formatter = formatter
                    chart1.setOption(data, true)
                }

            }, 500);

            var windowId
            if (text == this.lang.NewTrendChart_NewTrendChartUserControl_Single) {
                windowId = this.oneWindowId
            } else if (text == this.lang.NewTrendChart_NewTrendChartUserControl_Double) {
                windowId = this.twoWindowId
            } else {
                windowId = this.moreWindowId
            }
            this.isPower(windowId).then(val => {   //按钮权限
                if (!val) {
                    this.isTipsPop = true
                    return
                }
                let window = document.querySelectorAll('.window > div')
                //颜色
                for (var i = 0; i < window.length; i++) {
                    window[i].style.backgroundColor = "#fff";
                    window[i].style.color = "#4270E4";
                    if (window[i].innerHTML == text) {
                        window[i].style.backgroundColor = "#4270E4";
                        window[i].style.color = "#fff";
                    }
                }
                //切换组件
                if (text == this.lang.NewTrendChart_NewTrendChartUserControl_Single) {
                   
                    this.oneWindow = true
                    this.twoWindow = false
                    this.moreWindow = false
                    this.StaWindow = false
                    this.StaShow = false
                    
                    
                    let _id=this.curveID ;
                    this.curveID ='';
                    this.curveID =_id;
                    if (!this.timeShow) {
                        this.$nextTick(function () {
                            if (this.$refs.mychild1) {
                                // this.$refs.mychild1.curveName() 
                                //重新绘画图表大小
                                this.$refs.mychild1.echartsResize()
                                let Chart = this.$echarts.init(document.getElementById('qscxchartone'))
                                let data = Chart.getOption()
                                let formatter = "{value}"
                                if (this.$store.state.Showtext == 1) {
                                    formatter = "{value}%"
                                } else {
                                    formatter = "{value}"

                                }
                                data.formatter = formatter
                                Chart.clear()
                                Chart.setOption(data, true)
                                Chart.resize();
                            }
                        })
                    }
                    this.$nextTick(function () {

                        this.$refs.mychild1.axiosSet()
                        // //重新绘画图表大小
                        this.$refs.mychild1.echartsResize()
                        //   if(!this.showTime){
                        //       let that = this
                        //       setTimeout(() => {
                        //              if(that.$store.state.tendencyoption){
                        //           let Chart = that.$echarts.init(document.getElementById('qscxchartone'))
                        //           Chart.setOption(that.$store.state.tendencyoption)
                        //           that.$store.state.tendencyoption = ''
                        //       }
                        //       }, 500);

                        // }
                    })
                    if (index != undefined) {  //跳转到单窗口
                        this.$nextTick(function () {
                            this.$refs.mychild1.curveName(index, 1)
                        })
                    }
                } else if (text == this.lang.NewTrendChart_NewTrendChartUserControl_Double) {
                    this.window = !this.window
                    this.oneWindow = false
                    this.twoWindow = true
                    this.moreWindow = false
                    this.StaWindow = false
                    this.StaShow = false
                    if (!this.timeShow) {
                        this.$nextTick(function () {
                            if (this.$refs.mychild2) {
                                this.$refs.mychild2.child2()
                                this.$refs.mychild2.axiosSet2()
                                //重新绘画图表大小
                                var aa = this.$refs.mychild2
                                if (aa.$refs.mychild22) {
                                    aa.$refs.mychild22.echartsResize()
                                }
                                if (aa.$refs.mychild23) {
                                    aa.$refs.mychild23.echartsResize()
                                }

                            }
                        })
                    }
                    this.$nextTick(function () {
                        if (this.$refs.mychild2) {
                            this.$refs.mychild2.axiosSet2()
                            //重新绘画图表大小
                            var aa = this.$refs.mychild2
                            if (aa.$refs.mychild22) {
                                aa.$refs.mychild22.echartsResize()
                            }
                            if (aa.$refs.mychild23) {
                                aa.$refs.mychild23.echartsResize()
                            }
                        }
                    })
                } else if (text == this.lang.NewTrendChart_NewTrendChartUserControl_Several) {
                    this.windowClickValue = 'dd'
                    this.oneWindow = false
                    this.twoWindow = false
                    this.moreWindow = true
                    this.StaWindow = false
                    this.StaShow = false
                    if (!this.timeShow) {
                        this.$nextTick(function () {
                            if (this.$refs.mychild3) {
                                this.$refs.mychild3.child2()
                                //重新绘画图表大小
                                var aa = this.$refs.mychild3
                                if (aa.$refs.mychild32) {
                                    aa.$refs.mychild32.echartsResize()
                                }
                                if (aa.$refs.mychild4) {
                                    aa.$refs.mychild4.echartsResize()
                                }
                                if (aa.$refs.mychild5) {
                                    aa.$refs.mychild5.echartsResize()
                                }
                                if (aa.$refs.mychild6) {
                                    aa.$refs.mychild6.echartsResize()
                                }
                            }
                        })
                    }
                    this.$nextTick(function () {
                        if (this.$refs.mychild3) {
                            this.$refs.mychild3.axiosSet2()
                            //重新绘画图表大小
                            var aa = this.$refs.mychild3
                            if (aa.$refs.mychild32) {
                                aa.$refs.mychild32.echartsResize()
                            }
                            if (aa.$refs.mychild4) {
                                aa.$refs.mychild4.echartsResize()
                            }
                            if (aa.$refs.mychild5) {
                                aa.$refs.mychild5.echartsResize()
                            }
                            if (aa.$refs.mychild6) {
                                aa.$refs.mychild6.echartsResize()
                            }
                        }
                    })
                }
            })
        },
        //设置弹框开关
        open() {
            this.isPower(this.setId).then(val => {//按钮权限
                if (val) {
                    if (document.querySelector('.Popshow')) {
                        document.querySelector('.Popshow').style.display = 'block'
                    }
                    this.axiosSet()
                } else {
                    this.isTipsPop = true
                }
            })


        },
        cancel() {
            if (document.querySelector('.Popshow')) {
                document.querySelector('.Popshow').style.display = 'none'
            }
            this.axiosSet()
        },
        //RGB转16进制
        colorRGBtoHex(color) {
            var rgb = color.split(',');
            var r = parseInt(rgb[0].split('(')[1]);
            var g = parseInt(rgb[1]);
            var b = parseInt(rgb[2].split(')')[0]);
            var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            return hex;
        },
    }
}
</script>
<style lang='scss'>
.conterBox1 {
    .conterbox2 .conter_head .xl .caret[data-v-7061b7b7] {
        float: right;
        margin: 0;
        line-height: inherit;
    }
    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .el-switch__core {
        height: 40px;
        width: 120px;
        top: 6px;
        border-radius: 18px;
    }
    .el-switch__core:after {
        width: 32px;
        height: calc(100% - 4px);
    }
    .el-switch.is-checked .el-switch__core::after {
        margin-left: -37px;
        margin-top: 2px;
        background: #ff7e00;
        border: 1px solid #fff;
    }
    .el-switch__core:after {
        background: #a6baca;
        border: 1px solid #fff;
        margin-top: 2px;
        margin-left: 3px;
    }
    .el-message-box {
        width: 800px;
        height: 600px;
    }
    .el-switch__label * {
        position: absolute;
        width: calc(100% - 59px);
        left: 15px;
        top: 0;
        display: flex;
        align-items: center;
        color: #fff;
        word-break: break-all;
    }
    .el-switch__label el-switch__label--right {
        position: absolute;
    }
    .el-date-editor.el-input {
        width: 62% !important;
    }
    .el-button {
        padding: 0px !important;
        text-align: center;
    }
    .el-input--suffix .el-input__inner {
        padding-right: 12px !important;
    }
}
</style>
<style lang="scss" scoped>
.mask_box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.colortip {
    background-color: #efeff0 !important;
}
.colortip2 {
    background-color: #ddd !important;
    color: #000 !important;
}
.conterBox1 {
    overflow: auto;
    background-color: #eeeeee;
    width: 100%;
    min-width: 1280px;
    height: calc(100% - 40px);
    padding-top: 100px;
    display: flex;
    flex-flow: column;
    .mychild4 {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .Popshow {
        display: none;
        width: 800px;
        height: 700px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
        background: #eee;
        z-index: 98;
        box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.6);
        z-index: 100;
        .conter {
            width: 85%;
            margin: 20px auto;
            height: 605px;
            background: #eee;
            .conter_head {
                width: 100%;
                height: 24px;
                overflow: hidden;
                position: relative;
                .blo {
                    float: left;
                    width: 3px;
                    height: 24px;
                    background: #386df0;
                    margin: 0 10px;
                }
                .text {
                    float: left;
                    color: #386df0;
                    font-size: 20px;
                    font-weight: bold;
                    padding-right: 10px;
                    position: relative;
                    z-index: 9;
                    background: #eee;
                }
                .line {
                    width: 95%;
                    height: 2px;
                    background: #d4d4d4;
                    line-height: 24px;
                    margin-top: 10px;
                    position: absolute;
                    right: 0;
                }
            }
            .conter_show {
                width: 100%;
                height: 24px;
                overflow: hidden;
                margin-top: 15px;
                position: relative;
                .blo {
                    float: left;
                    width: 3px;
                    height: 24px;
                    background: #386df0;
                    margin: 0 10px;
                }
                .text {
                    float: left;
                    color: #386df0;
                    font-size: 20px;
                    font-weight: bold;
                    padding-right: 10px;
                    position: relative;
                    z-index: 9;
                    background: #eee;
                }
                .line {
                    width: 95%;
                    height: 2px;
                    background: #d4d4d4;
                    line-height: 24px;
                    margin-top: 10px;
                    position: absolute;
                    right: 0;
                }
            }
            .conter_conter {
                width: 100%;
                height: 40px;
                overflow: hidden;
                margin-top: 20px;
                display: flex;
                .text {
                    width: 150px;
                    font-size: 16px;
                    line-height: 40px;
                    text-align: right;
                    box-sizing: border-box;
                    padding-right: 20px;
                }
                .time {
                    width: 73%;
                    height: 40px;
                    padding-left: 15px;
                    color: red;
                }
            }
            .conter_xiala {
                width: 100%;
                height: 40px;
                margin-top: 15px;
                display: flex;
                .empty-title {
                    width: 110px;
                    min-width: 110px;
                    margin-left: 20px;
                    margin-right: 36px;
                }
                .blo {
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    margin-right: 15px;
                    margin-left: 15px;
                }
                .B {
                    cursor: pointer;
                    width: 70px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #fff;
                    margin-right: 15px;
                }
                .text {
                    background: #eee;
                }
                .num {
                    background: #eee;
                    margin-right: 15px;
                    width: 90px;
                }
                .I {
                    cursor: pointer;
                    width: 70px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #fff;
                    margin-right: 15px;
                }
            }
            .showSetting {
                padding-left: 20px;
            }
            .conter_back {
                width: 100%;
                height: 40px;
                margin-top: 15px;
                .text {
                    float: left;
                    font-size: 16px;
                    width: 150px;
                    height: 100%;
                    box-sizing: border-box;
                    text-align: right;
                    padding-right: 20px;
                }
                .back {
                    float: left;
                    width: 70px;
                    height: 40px;
                    text-align: center;
                }
            }
            .conter_ray {
                width: 100%;
                height: 40px;
                overflow: hidden;
                line-height: 40px;
                margin-top: 15px;
                display: flex;
                .text {
                    float: left;
                    font-size: 16px;
                    text-align: left;
                    width: 150px;
                    box-sizing: border-box;
                    text-align: right;
                    padding-right: 20px;
                }
                .ray {
                    float: left;
                    width: 70px;
                    height: 40px;
                    text-align: center;
                }
            }
            .conter_line {
                width: 100%;
                height: 40px;
                margin-top: 15px;
                overflow: hidden;
                line-height: 40px;
                .text {
                    float: left;
                    font-size: 16px;
                    width: 150px;
                    // box-sizing: border-box;
                    text-align: right;
                    padding-right: 20px;
                }
                .line {
                    float: left;
                    width: 70px;
                    height: 40px;
                    text-align: center;
                }
            }
            .x_coordinate {
                width: 100%;
                height: 40px;
                margin-top: 15px;
                // overflow: hidden;
                // line-height:40px;
                .x_text {
                    float: left;
                    font-size: 16px;
                    width: 150px;
                    height: 100%;
                    box-sizing: border-box;
                    text-align: right;
                    padding-right: 20px;
                }
                .text {
                    float: left;
                    background: #eee;
                }
                .num {
                    float: left;
                    width: 120px;
                    margin-right: 15px;
                }
                .blo {
                    float: left;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    margin: 0 10px;
                }
                .b {
                    float: left;
                    width: 70px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #fff;
                    margin-right: 15px;
                }
            }

            .show_value {
                width: 100%;
                height: 42px;
                margin-top: 15px;
                overflow: hidden;
                line-height: 38px;
                .text {
                    font-size: 16px;
                    float: left;
                    width: 150px;
                    box-sizing: border-box;
                    text-align: right;
                    padding-right: 20px;
                }
                input[type="checkbox"] {
                    margin: 0 10px 0 0px;
                    top: -1px;
                    left: 0;
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    text-align: center;
                    vertical-align: middle;
                    line-height: 24px;
                    z-index: 11;
                    position: relative;
                    outline: none;
                    -webkit-appearance: none;
                    border: 1px solid #b0b0b0;
                    color: #fff;
                }
                input[type="checkbox"]:after {
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    top: -1px;
                    left: -1px;
                    content: " ";
                    display: inline-block;
                    visibility: visible;
                    text-align: center;
                    line-height: 24px;
                }
                input[type="checkbox"]:checked:after {
                    content: "✓";
                    font-size: 14px;
                    background-color: #fff;
                    border: none;
                    font-weight: bold;
                    color: #99d276;
                }
            }
            .button {
                width: 100%;
                height: 40px;
                overflow: hidden;
                margin-top: 20px;
                .keep {
                    cursor: pointer;
                    float: right;
                    width: 70px;
                    height: 40px;
                    background: #386def;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 40px;
                    color: #fff;
                    margin-left: 10px;
                }
                .cancel {
                    cursor: pointer;
                    float: right;
                    width: 70px;
                    height: 40px;
                    background: #999;
                    border-radius: 6px;
                    color: #fff;
                    text-align: center;
                    line-height: 40px;
                }
            }
        }
        .head {
            width: 100%;
            height: 60px;
            background: #386df0;
            text-align: center;
            line-height: 60px;
            color: #fff;
            .text {
                font-size: 24px;
            }
            .i-c {
                font-size: 30px;
                float: right;
                margin-top: 12px;
                margin-right: 10px;
            }
        }
        .deletePop {
            position: absolute;
            left: 0;
            right: -40px;
            z-index: 888;
            bottom: 0;
            top: 0;
            margin: auto;
            width: 385px;
            height: 205px;
            background: #fff;
            .title {
                width: 100%;
                height: 40px;
                background: #ffbc3d;
                text-align: center;
                line-height: 40px;
                color: #fff;
                .title_i {
                    color: #fff;
                    margin-right: 5px;
                }
            }
            .delete_text {
                width: 280px;
                height: 120px;
                margin: auto;
                // word-break: break-all;
                // word-wrap: break-word;
                padding-top: 40px;
            }
            .delete_text11 {
                text-align: center;
            }
            .delete_btn {
                width: 100%;
                height: 45px;
                margin: auto;
                .confir {
                    width: 280px;
                    height: 30px;
                    background: #f3e3ad;
                    color: #eba241;
                    text-align: center;
                    line-height: 30px;
                    margin: auto;
                    cursor: pointer;
                }
            }
        }
    }
    .head {
        //   overflow-x: hidden;
        width: 97%;
        margin: 20px auto 0;
        padding-bottom: 15px;
        background-color: #fff;
        .head_left {
            float: left;
            overflow: hidden;
            width: 17%;
            margin-top: 17px;
            .head_block {
                float: left;
                width: 4px;
                height: 28px;
                margin-left: 2%;
            }
            .head_text {
                float: left;
                font-size: 20px;
                margin-left: 3%;
                height: 40px;
                width: 93%;
                word-break: keep-all;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .head_right {
            float: right;
            overflow: hidden;
            width: 83%;
            margin-top: 11px;
            .timeStar {
                float: left;
                width: 19%;
                height: 40px;
                .demonstration {
                    margin-right: 3px;
                    color: #2d5beb;
                }
            }
            .timeEnd {
                float: left;
                width: 19%;
                height: 40px;
                .demonstration {
                    //  margin-left:6px;
                    margin-right: 3px;
                    color: #2d5beb;
                }
            }
            .buttomQuery {
                float: left;
                width: 6%;
                height: 40px;
                margin-right: 1%;
                .query {
                    width: 90%;
                    height: 40px;
                    font-size: 16px;
                    float: left;
                    margin: 0 5%;
                    color: #fff;
                    background: #4270e4;
                }
            }

            .show {
                cursor: pointer;
                float: left;
                overflow: hidden;
                width: 12.9%;
                height: 40px;
                border-radius: 4px;
                border: 2px solid #4270e4;
                .normal {
                    cursor: pointer;
                    float: left;
                    width: 50%;
                    height: 36px;
                    text-align: center;
                    line-height: 38px;
                    background-color: #4270e4;
                    color: #fff;
                }
                .proport {
                    float: left;
                    width: 50%;
                    height: 36px;
                    text-align: center;
                    line-height: 38px;
                    color: #4270e4;
                    background-color: #fff;
                }
            }
            .window {
                float: left;
                overflow: hidden;
                width: 23.1%;
                height: 40px;
                border-radius: 4px;
                border: 2px solid #4270e4;
                margin-left: 1%;
                .window_one {
                    cursor: pointer;
                    float: left;
                    width: 33.33%;
                    height: 40px;
                    text-align: center;
                    line-height: 38px;
                    background-color: #4270e4;
                    color: #fff;
                }
                .window_two {
                    cursor: pointer;
                    float: left;
                    float: left;
                    width: 33.33%;
                    height: 40px;
                    text-align: center;
                    line-height: 38px;
                    border-left: 2px solid #4270e4;
                    background-color: #fff;
                    color: #4270e4;
                }
                .window_more {
                    cursor: pointer;
                    float: left;
                    float: left;
                    width: 33.33%;
                    height: 40px;
                    text-align: center;
                    line-height: 38px;
                    border-left: 2px solid #4270e4;
                    background-color: #fff;
                    color: #4270e4;
                }
            }
            .switch {
                position: relative;
                float: left;
                height: 45px;
                margin-left: 0.5%;
                //  margin-top:-3px;
                .history {
                    position: absolute;
                    float: left;
                }
                .s_time {
                    float: left;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                }
            }
            .set {
                cursor: pointer;
                float: left;
                width: 6%;
                height: 40px;
                text-align: center;
                line-height: 38px;
                border: 2px solid #4270e4;
                background-color: #fff;
                color: #4270e4;
                font-size: 17px;
                font-weight: bold;
            }
        }
    }
    .conter {
        width: 97%;
        flex: 1;
        margin: 0 auto;
        background-color: #fff;
    }
}
.switchcover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
}
</style>