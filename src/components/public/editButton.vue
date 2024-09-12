<template>
    <div class="d_Button" @click="handleclick">
        <div :class="{
            'd_btn': true,
            'sumbitButton': type == 'sumbit' || type == 'query',
            'delButton': type == 'del' || type == 'cancel',
        }" v-if="type && (type == 'sumbit' || type == 'del' || type == 'cancel' || type == 'query')">
            {{ text }}
        </div>
        <div class="d_btn editButton" :class="{
            'd_btn': !smallBtn,
            'x_btn': smallBtn,
            'editButton': true,
        }" v-else :style="{
    'color': type == 'fill' ? '#fff' : color,
    'backgroundColor': type != 'fill' ? '#fff' : color,
    'borderColor': color
}">
            {{ text }}
        </div>
    </div>
</template>

<script  >
export default {
    props: ['text',
        'color',
        'type',
        'smallBtn',//sumbit/query|cancel/del|underfind
    ],
    methods: {
        handleclick() {
            this.$emit('callback');
        }
    }
}

</script>

<style lang="scss" scoped>
.d_Button {
    width: fit-content;
    height: auto;
    display: inline-block;

    .d_btn,
    .x_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        min-width: 110px;
        width: fit-content;
        padding: 8px 16px;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
        word-break: keep-all;
    }

    .delButton {
        background-color: #aaaaaa;
        color: #fff;
    }

    .sumbitButton {
        background-color: #4270e4;
        color: #fff;
    }

    .editButton {
        border-width: 2px;
        border-style: solid;
    }

    .x_btn {
        min-width: 60px;
        padding: 3px 8px;
        border-width: 1px;
    }

    .editButton:active {
        background-color: #ededed;
    }
}

.d_Button:last-child {
    .d_btn {
        margin-right: 0;
    }
}
</style>