<template>
    <el-dialog
        :visible.sync="isVisible"
        :style="{ '--color': color }"
        v-bind="$attrs"
        center
        :show-close="false"
        @open="handleOpen"
        @close="handleClose"
        class="base-dialog"
    >
        <template #title>
            <slot name="header">
                <div class="dialog-header">
                    <span>{{ title }}</span>
                    <img
                        v-if="showClose"
                        src="@/assets/images/pages/icon_close.png"
                        @click="handleClose"
                        class="icon_close"
                    />
                </div>
            </slot>
        </template>
        <slot></slot>
        <slot name="footer">
            <div class="dialog-footer">
                <el-button
                    class="cancel"
                    v-if="showCancelBtn"
                    @click="handleClose"
                    >取 消</el-button
                >
                <el-button
                    v-if="showConfirmBtn"
                    class="confirm"
                    @click="handleConfirm"
                    >确 定</el-button
                >
            </div>
        </slot>
    </el-dialog>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: '#386df0'
        },
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        showClose: {
            type: Boolean,
            default: true
        },
        showCancelBtn: {
            type: Boolean,
            default: true
        },
        showConfirmBtn: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        isVisible: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    },
    methods: {
        handleOpen() {
            this.$emit('open');
        },
        handleClose() {
            this.$emit('close');
            this.isVisible = false;
        },
        handleConfirm() {
            this.$emit('confirm');
            this.isVisible = false;
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep {
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        padding: 30px;
        background: #eeeeee;
    }
}
.base-dialog {
    ::v-deep {
        .el-dialog {
            box-shadow: 0px 0px 21px 1px rgba(45, 46, 46, 0.43);
        }
    }
}
.dialog-header {
    position: relative;
    width: 100%;
    height: 60px;
    background: var(--color);
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    .icon_close {
        position: absolute;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        right: 20px;
        top: 18px;
        cursor: pointer;
    }
}

.dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .cancel {
        width: 100px;
        height: 38px;
        background: #999999;
        border-radius: 4px 4px 4px 4px;
        border: none;
        color: #fff;
    }
    .confirm {
        width: 100px;
        height: 38px;
        background: #386df0;
        border-radius: 4px 4px 4px 4px;
        border: none;
        color: #fff;
        margin-left: 20px;
    }
}
</style>
