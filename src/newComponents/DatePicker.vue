<template>
    <div class="date-picker">
        <el-date-picker v-model="startTime1" :type="type" :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
            :value-format="format" :editable="false" @change="getStartTime"></el-date-picker>
        <span class="demonstration">-</span>
        <el-date-picker v-model="endTime1" :type="type" :placeholder="lang.SCMSConsoleWebApiMySql_PleChooseDate"
            :value-format="format" :editable="false" @change="getEndTime"></el-date-picker>
    </div>
</template>
<script>
export default {
    props: {
        startTime: {
            type: String,
            default: ''
        },
        endTime: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'datetime'
        },
        format: {
            type: String,
            default: 'yyyy-MM-dd HH:mm:ss'
        }

    },
    watch: {
        startTime(n, o) {
            this.startTime1 = n

        },
        endTime(n, o) {
            this.endTime1 = n

        }
    },
    data() {
        return {
            lang: JSON.parse(localStorage.getItem('languages'))[localStorage.getItem('currentLang')],
            startTime1: '',
            endTime1: ''
        }
    },
    methods: {
        getStartTime(val) {
            this.compareTime()
            // console.log(this.startTime1)
            // console.log(this.endTime1)
            this.$emit('getTime', val, 'start')

        },
        getEndTime(val) {
            this.compareTime()
            // console.log(this.compareTime())
            this.$emit('getTime', val, 'end')

        },
        //判断开始时间是否大于结束时间
        compareTime() {
            if (!this.startTime1 || !this.endTime1) return
            let start = new Date(this.startTime1).valueOf();
            let end = new Date(this.endTime1).valueOf();
            if (start > end) {
                this.confirm_Pop2(this, '开始时间必须小于结束时间')
                return true;
            } else {
                return false;
            }
        }

    },
    mounted() {
        // console.log(this.startTime)
        this.startTime1 = this.startTime
        this.endTime1 = this.endTime
        //    this.changeTableHeight()
    }

}
</script>
<style lang="scss" scope>
.date-picker {
    display: inline-block;

    .demonstration {
        margin: 0px 5px;
    }
}
</style>