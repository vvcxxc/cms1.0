<!-- 自定义对话框 -->
<template>
    <el-dialog
        v-el-drag-dialog
        :class="{ 'colordiv': $store.state.color == 'grey', 'flex': showFlex }"
        :append-to-body="toBody"
        :custom-class="customClass"
        :title="title"
        :visible="visible"
        :width="width"
        :top="top"
        @open="open"
        @close="close()"
        :close-on-click-modal="closeOnClickModal"
    >
        <slot></slot>
        <div slot="footer" class="dialog-footer" v-show="footer">
            <slot name="common-footer">
                <my-button class="btn" @btnClick="close()">取消</my-button>
                <my-button class="btn ok" @btnClick="ok()">
                    <slot name="okBtn">确认</slot>
                </my-button>
            </slot>
        </div>
    </el-dialog>
</template>
<script>
import MyButton from './Button.vue'

export default {
    components: {
        MyButton,
    },
    props: {
        top: {
            type: String,
            default: '15vh'
        },
        showFlex: { // 适配工位管理页面弹窗，默认居中布局
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: 'dialog-class'
        },
        closeOnClickModal: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '300px'
        },
        footer: {
            type: Boolean,
            default: true
        },
        toBody: {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {

        }
    },
    methods: {
        open() {
            this.$emit('open')
        },
        close() {
            this.$emit('close')

        },
        ok() {
            this.$emit('ok')
        }
    }
}
</script>
<style lang="scss" scope>
.dialog-class {
    background: #fff;
    box-shadow: 0px 0px 21px rgba(45, 46, 46, 0.4300);

    .el-dialog__header {
        height: 50px;
        background: #386DF0;
        text-align: center;
        padding: 0;
        line-height: 50px;

        .el-dialog__title {
            font-size: 20px;
            color: #FFFFFF;
        }

        .el-dialog__close {
            top: 50%;
            margin-top: -15px;
            font-size: 30px;
            color: #FFFFFF;
        }
    }

    .el-dialog__body,
    .el-dialog__footer {
        background: rgba(238, 238, 238, 0.3900);

    }

    .el-dialog__body {
        padding: 20px
    }
}

.el-dialog__footer {
    padding: 0
}

.dialog-footer {
    padding: 0 20px 20px;

    .btn {
        min-width: 100px;
        height: 38px;
        background: #999999;
        border: 0;
        font-size: 16px;
        color: #FFFFFF;

    }

    .ok {
        background: #386DF0;
    }
}

.colordiv {
    .el-dialog__header {
        background-color: #d9dbde !important;

        .el-dialog__title,
        .el-dialog__close {
            color: #666666 !important;
        }


    }

}
</style>