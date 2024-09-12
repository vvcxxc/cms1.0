<template>
    <div
        class="alarm-container"
        :class="{ colordiv: $store.state.color == 'grey' }"
    >
        <el-row :gutter="20" style="width: 100%">
            <el-col :span="14" style="height: 100%">
                <ManageMent ref="manageRef" />
            </el-col>
            <el-col :span="10" style="height: 100%">
                <ManageMentCode ref="codeRef" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ManageMent from './management/index.vue';
import ManageMentCode from './code/index.vue';

export default {
    name: 'MaterialManagement',

    components: {
        ManageMent,
        ManageMentCode,
    },

    provide() {
        return {
            materialParent: this,
        };
    },

    data() {
        return {};
    },
    mounted() {
        this.width = window.screen.width;
        this.zoom = this.width / 1920 < 0.8 ? 0.8 : this.width / 1920;
        setTimeout(() => {
            $('.alarm-container').css({
                marginTop:
                    $('.v-toolbar').height() * $('.v-toolbar')[0].style.zoom +
                    10 +
                    'px',
            });
            let a = 200 * (this.width / 1920) + 'px';
            $('.content-container').css({
                width: `calc(100% - ${a})`,
            });
        });
    },

    created() {},

    methods: {},
};
</script>

<style lang="scss" scoped>
.alarm-container {
    // width: clac(100% -40px);
    // height: 100%;
    height: 86vh;
    color: #000;
    margin-top: 100px;
    display: flex;
    background-color: #eee;
    padding: 20px 10px;
    box-sizing: border-box;
}
</style>
