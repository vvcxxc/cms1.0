<template>
    <div class="zdeditPop">
        <div class="myDialog" id="myDialog">
            <div class="popHeader">
                SOP管理
                <img
                    :src="require('../../../assets/images/no.png')"
                    alt=""
                    @click="handleClick"
                    class="close"
                />
            </div>

            <div class="popContent">
                <div class="title">
                    <span>配方名称: {{ $props.dialogConfig.Name }}</span>
                </div>
                <div class="content">
                    <div class="tableContent">
                        <div class="tableContent--left">
                            <div class="item-header">
                                <div class="item-title">配方工序</div>
                            </div>
                            <el-table
                                ref="leftTableRef"
                                highlight-current-row
                                :cell-style="{ borderColor: '#E4E7ED' }"
                                :header-cell-style="{
                                    background: '#5a6c98',
                                    color: '#fff',
                                }"
                                style="height: 500px; overflow-y: scroll"
                                border
                                :data="leftTable"
                                @current-change="handleCurrentChange"
                            >
                                <el-table-column type="index" label="序号" />
                                <el-table-column
                                    v-for="item in leftColumns"
                                    :key="item.prop"
                                    :prop="item.prop"
                                    :label="item.label"
                                >
                                    <template slot-scope="scope">
                                        {{ scope.row[item.prop] }}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="tableContent--right">
                            <div class="top-header">
                                <div class="item-header">
                                    <div class="item-title">操作指导书</div>
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="支持上传格式为PNG、PDF、AVI、MP4文件"
                                        placement="top"
                                    >
                                        <i class="el-icon-question" />
                                    </el-tooltip>
                                </div>
                                <el-upload
                                    action="#"
                                    accept=".png,.pdf,.avi,.mp4,"
                                    :show-file-list="false"
                                    :http-request="uploadFile"
                                >
                                    <el-button size="mini" type="success"
                                        >添加</el-button
                                    >
                                </el-upload>
                            </div>
                            <el-table
                                ref="rightTableRef"
                                highlight-current-row
                                :cell-style="{ borderColor: '#E4E7ED' }"
                                :header-cell-style="{
                                    background: '#5a6c98',
                                    color: '#fff',
                                }"
                                border
                                style="height: 500px; overflow-y: scroll"
                                :data="rightTable"
                                @current-change="handleRightCurrentChange"
                            >
                                <el-table-column
                                    v-for="item in rightColumns"
                                    :key="item.prop"
                                    :prop="item.prop"
                                    :label="item.label"
                                    show-overflow-tooltip
                                >
                                    <template slot-scope="scope">
                                        {{ scope.row[item.prop] }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="90px">
                                    <template slot-scope="scope">
                                        <div class="icon">
                                            <i
                                                class="el-icon-top"
                                                @click="
                                                    onSortSop(
                                                        scope.row,
                                                        scope.$index,
                                                        1
                                                    )
                                                "
                                            />
                                            <i
                                                class="el-icon-bottom"
                                                @click="
                                                    onSortSop(
                                                        scope.row,
                                                        scope.$index,
                                                        0
                                                    )
                                                "
                                            />
                                            <i
                                                class="el-icon-delete"
                                                @click="onDelSop(scope.row)"
                                            />
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="file">
                        <div class="rate">
                            图片以每&nbsp;&nbsp;
                            <el-input
                                v-model="SopSwitchRate"
                                @input="onChangeInput"
                            />
                            &nbsp;&nbsp;秒循环切换
                        </div>
                        <div class="file-content" v-show="currentRightRow">
                            <iframe
                                v-if="currentRightRow.FileType === 1"
                                :src="sourceUrl"
                                frameborder="0"
                                width="100%"
                                height="100%"
                            />
                            <el-image
                                v-show="currentRightRow.FileType === 2"
                                :src="sourceUrl"
                                :fit="'contain'"
                            >
                            </el-image>
                            <video
                                id="myVideo"
                                v-show="currentRightRow.FileType === 3"
                                :src="sourceUrl"
                                controls
                                style="width: 100%; height: 100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="popBtn">
                <el-button class="search-btn log" @click="handleClick('no')">
                    返回
                </el-button>
            </div>
        </div>
        <tip-pop
            v-if="isTipShow"
            :tipText="tipText"
            :noCancel="noCancel"
            @tipCallBack="tipCallBack"
        ></tip-pop>
    </div>
</template>

<script>
import _ from 'lodash';
import CurrentTitle from '../../../components/public/currentTitle.vue';
import TipPop from '../../../components/public/tipPop.vue';
import { Message } from 'element-ui';
export default {
    props: ['title', 'selectItem', 'dialogConfig'],
    components: {
        CurrentTitle,
        TipPop,
    },
    data() {
        return {
            isTipShow: false,
            tipText: '',
            noCancel: false,
            leftTable: [],
            leftColumns: [{ prop: 'ContentGroup', label: '工序名称' }],
            rightTable: [],
            rightColumns: [{ prop: 'FileName', label: '文件名称' }],
            SopSwitchRate: 0,
            currentLeftRow: {},
            currentRightRow: {},
            sourceUrl: '',
            isDelRow: null,
        };
    },
    created() {
        const { TemplateProjects = [], SopSwitchRate } = this.dialogConfig;

        this.SopSwitchRate = SopSwitchRate;

        const uniqueData = TemplateProjects.reduce((acc, item) => {
            const existingItem = acc.find(
                (el) => el.ContentGroupId === item.ContentGroupId
            );
            if (!existingItem) {
                acc.push(item);
            }
            return acc;
        }, []);

        this.leftTable = uniqueData;
    },
    mounted() {
        const row = _.head(this.leftTable);
        this.$refs.leftTableRef.setCurrentRow(row);
        this.currentLeftRow = row;
    },
    methods: {
        async handleCurrentChange(row) {
            this.currentLeftRow = row;
            // this.currentRightRow = null;
            const { ContentGroupId } = row;
            const { ProductTypeCode } = this.dialogConfig;
            const result = await this.getFileList(
                ContentGroupId,
                ProductTypeCode
            );
            this.rightTable = result.data.data;
            const rightRow = _.head(this.rightTable);
            this.$refs.rightTableRef.setCurrentRow(rightRow);
        },
        handleRightCurrentChange(row) {
            if (!row) {
                this.currentRightRow = {};
                this.sourceUrl = '';
                return;
            }
            this.currentRightRow = row;
            const { FileName, FilePath } = row;
            const apiHref = window.location.host.includes('localhost')
                ? '192.168.2.66:8803'
                : window.location.host;
            let str = `http://${apiHref}/api/FileManage/GetFile?filename=${FilePath}\\${FileName}`;
            str = str.replace(/\\/g, '\\\\');
            this.sourceUrl = str;
        },
        getFileList(id, model) {
            return this.$axios({
                method: 'get',
                url: `/api/Sop/GetSopFromModel/${id}?model=${model}`,
            });
        },
        async onSortSop(row, index, type) {
            let id = row.Id;
            if (type === 0) {
                id = this.rightTable[index + 1].Id;
            }
            const result = await this.$axios({
                method: 'post',
                url: `/api/Sop/UpSop/${id}`,
            });
            const code = result.data.code;
            if (code !== 0) {
                Message.error('排序失败');
                return;
            }
            Message.success('操作成功');
            this.handleCurrentChange(this.currentLeftRow);
        },
        async onDelSop(row) {
            this.isDelRow = row;
            this.tipText = '确认要删除当前内容吗？';
            this.isTipShow = true;
        },
        onChangeInput: _.debounce(function (v) {
            const regex = /^[1-9]\d*$/;
            console.log(regex.test(v));
            if (!regex.test(v)) {
                Message.error('请输入正整数');
                return;
            }
            this.$axios({
                method: 'post',
                url: `/api/Sop/ImgSwitch?fid=${this.dialogConfig.FID}&number=${v}`,
            });
        }, 1000),
        // onChangeInput(v){
        //     console.log(v, 'v vvvvv');
        // },
        uploadFile(file) {
            const { FID } = this.dialogConfig;
            const { ContentGroupId: wid } = this.currentLeftRow;
            let $this = this;
            let formData = new FormData();
            formData.append('file', file.file);
            this.$axios({
                method: 'post',
                url: `/api/Sop/AddSop?fid=${FID}&wid=${wid}&loginUserAccount=SuperAdmin`,
                data: formData,
            }).then((res) => {
                $this.isTipShow = true;
                if (res.data.code === 0) {
                    $this.handleCurrentChange(this.currentLeftRow);
                    $this.tipText = '附件上传成功！';
                } else {
                    $this.tipText = res.data.msg;
                }
            });
        },
        async tipCallBack(str) {
            if (this.isDelRow && str === 'yes') {
                const { Id } = this.isDelRow;
                const result = await this.$axios({
                    method: 'delete',
                    url: `/api/Sop/DeleteSop/${Id}`,
                });
                const code = result.data.code;
                if (code !== 0) {
                    Message.error('删除失败');
                    return;
                }
                this.tipText = '删除成功';
                this.handleCurrentChange(this.currentLeftRow);

                this.isDelRow = null;
                return;
            }
            this.isTipShow = false;
        },
        handleClick(str) {
            this.$emit('callback');
        },
    },
};
</script>

<style lang="scss" scoped>
.zdeditPop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    .myDialog {
        position: relative;
        width: 1200px;
        top: 45%;
        transform: translateY(-50%);
        margin: auto;
        background: rgba(238, 238, 238);
        box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.43);

        .popHeader {
            width: 100%;
            height: 60px;
            background: rgba(56, 109, 240);
            line-height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            position: relative;

            .close {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 18px;
                right: 20px;
                cursor: pointer;
            }
        }

        .popContent {
            width: 100%;
            height: auto;
            overflow-y: auto;
            padding: 20px 40px;
            padding-bottom: 0;
            overflow: hidden;

            .content1-line {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .content {
                    display: flex;
                    width: 100%;
                    line-height: 40px;
                    margin: 10px 0;

                    img {
                        width: 38px;
                        height: 38px;
                        position: absolute;
                        top: 2px;
                        right: 0;
                        cursor: pointer;
                    }

                    .required::before {
                        content: '*';
                        color: #f56c6c;
                        margin-right: 4px;
                    }
                }
            }
        }

        .popBtn {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 60px;
            text-align: center;
            margin-top: 40px;
            // line-height: 60px;

            .btn {
                width: 100px;
                height: 38px;
                background: rgba(153, 153, 153);
                border-radius: 4px;
                font-size: 16px;
                color: #ffffff;
                margin-left: 20px;
                margin-top: 10px;
                border: 1px solid #999999;
            }
        }
    }
    .content {
        display: flex;
        justify-content: space-between;
    }
    .tableContent {
        width: 49%;
        display: flex;
        height: 100%;

        &--left {
            width: 50%;
            margin-right: 10px;
        }
        &--right {
            width: 50%;
        }
    }
    .file {
        width: 49%;
        height: 550px;
        margin-left: 10px;
        flex-shrink: 0;
        border: 1px solid #e4e4e4;
        padding: 10px;

        .rate {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 10px;
            ::v-deep .el-input {
                width: 60px;
            }
        }
    }
    .top-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.search-btn {
    cursor: pointer;
    margin-right: 10px;
    height: 36px;
    width: 100px;
    border-radius: 4px;
    border: 1px solid #fcae38;
    background-color: #fff;
    color: #fcae38;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    a {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;

        input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
}
.log {
    border: 1px solid #5279dd;
    color: #5279dd;
}
</style>
<style lang="scss">
.zdeditPop {
    textarea {
        resize: none !important;
    }

    .el-table tr.light-blue th {
        background-color: #dcf0f9;
        color: #fff;
    }
}
.item-header {
    height: 50px;
    display: flex;
    align-items: center;

    .item-title {
        color: #386df0;
        font-size: 16px;
        border-left: 3px solid #386df0;
        padding-left: 5px;
    }
}
.icon {
    i {
        display: inline-block;
        margin: 0 4px;
        cursor: pointer;

        &:hover {
            color: #386df0;
        }
    }
}
.file-content {
    text-align: center;
    height: 500px;
    line-height: 500px;
}
img {
    max-height: 500px !important;
}
::v-deep .el-image {
    display: inline-flex;
    align-items: center;
}
</style>