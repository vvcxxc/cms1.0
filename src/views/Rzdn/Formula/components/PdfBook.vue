<template>
    <div class="pdf-class" ref="pdfRefDom" v-loading="loading" @mousewheel="handleScroll">
        <div class="pdf-class1" ref="scrollContainer">
            <div class="pdf-class2" ref="pdfRef">
                <pdf v-for="i in showNum" :key="i" :page="i" :src="pdfUrl" @loaded="loaded" @error="loadedError">
                </pdf>
            </div>
        </div>

        <div class="pdf-zoom">
            <el-select class="pdf-select" v-model="zoom" placeholder="请选择" @change="selectData">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <!-- <el-button class="zoom-btn" @click="narrow">-</el-button>
            <div class="zoom-show">{{ zoom }}%</div>
            <el-button class="zoom-btn" @click="add">+</el-button> -->

        </div>
    </div>

</template>
<script>
import pdf from 'vue-pdf'
export default {
    components: {
        pdf
    },
    props: {
        pdfUrl: {
            type: String,
            default: ''

        }
    },
    data() {
        return {
            // selectValue: 100,
            numPages: 1,
            pdfinfo: {
                src: '',
                numPages: 1,
            },

            oldWidth: 0,
            zoom: 100,
            options: [],
            ctrlKey: false,
            loading: false,
            progressNum: 0,
            scrollTop: 0,
            showNum: undefined

        }
    },
    watch: {
        pdfUrl(newVal) {
            console.log('%c'+ newVal, 'color:#1290E7;');
            if (newVal) {
                this.handelPdf()
            }
        }
    },

    methods: {
        loadedError(error) {
            this.loading = false
            this.confirm_Pop2(this, '找不到该指导书')
        },
        loaded() {
            clearTimeout(this._closeLoadingTimer)
            this._closeLoadingTimer = setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        //改变比例
        selectData(value) {
            this.zoom = value
            let newWidth = this.oldWidth * value / 100
            // console.log(newWidth)
            this.$nextTick(() => {
                this.$refs.pdfRef.style.width = newWidth + 'px'
                if (newWidth < this.oldWidth) {
                    this.$refs.pdfRef.style.marginLeft = (this.oldWidth - newWidth) / 2 + 'px'
                } else {
                    this.$refs.pdfRef.style.marginLeft = 0
                }
            })

        },
        async handelPdf() {
            this.loading = true
            this.pdfinfo["src"] = this.pdfUrl
            this.$refs.scrollContainer.scrollTop = 0
            pdf.createLoadingTask(this.pdfinfo["src"]).promise.then(res => {
                // console.log(res)
                // this.loading = false
                this.pdfinfo["numPages"] = res._pdfInfo.numPages
                // console.log(this.pdfinfo["numPages"])
                if (this.pdfinfo["numPages"] < 10) {
                    this.showNum = this.pdfinfo["numPages"]
                } else {
                    this.showNum = 10
                }
            })
            this.$nextTick(() => {
                this.oldWidth = this.$refs.pdfRef.clientWidth ? this.$refs.pdfRef.clientWidth : 600
            })
            // console.log(this.pdfinfo)
        },
        add() {
            this.$nextTick(() => {
                let oldWidth = this.$refs.pdfRef.clientWidth
                let newWidth = oldWidth + this.oldWidth / 10
                if (oldWidth / this.oldWidth < 5) {
                    this.$refs.pdfRef.style.width = newWidth + 'px'
                    if (newWidth < this.oldWidth) {
                        this.$refs.pdfRef.style.marginLeft = (this.oldWidth - newWidth) / 2 + 'px'
                    } else {
                        this.$refs.pdfRef.style.marginLeft = 0
                    }
                    console.log(newWidth / this.oldWidth)
                    this.zoom = Math.round(newWidth / this.oldWidth * 100)
                } else {
                    console.log('已经最大了')
                }
            })
        },
        narrow() {
            this.$nextTick(() => {
                let oldWidth = this.$refs.pdfRef.clientWidth
                let newWidth = oldWidth - this.oldWidth / 10
                if (oldWidth / this.oldWidth > 0.1) {
                    this.$refs.pdfRef.style.width = newWidth + 'px'
                    if (newWidth < this.oldWidth) {
                        this.$refs.pdfRef.style.marginLeft = (this.oldWidth - newWidth) / 2 + 'px'
                    } else {
                        this.$refs.pdfRef.style.marginLeft = 0
                    }
                    // console.log(newWidth / this.oldWidth)
                    this.zoom = Math.round(newWidth / this.oldWidth * 100)
                } else {
                    console.log('已经最小了')
                }

            })
        },
        keydown(e) {
            if (e.ctrlKey && e.keyCode == 17) {
                this.ctrlKey = true
            }

        },
        keyup(e) {
            // console.log(e)
            if (!e.ctrlKey && e.keyCode == 17) {
                this.ctrlKey = false
                console.log('鼠标弹起了')
            }
        },
        handleScroll(e) {
            if (this.ctrlKey) {
                e.preventDefault()
                let direction = e.deltaY > 0 ? 'down' : 'up'; //deltaY为正则滚轮向下，为负滚轮向上

                if (direction == 'down' && this.zoom > 25) {

                    let value = this.zoom - 25
                    this.selectData(value)

                } else if (direction == 'up' && this.zoom < 400) {
                    let value = this.zoom + 25
                    this.selectData(value)
                }
                console.log(e)
            }
        },
        scrollFun(e) {
            if (this.$refs.pdfRef && this.$refs.pdfRefDom) {
                this.$nextTick(() => {
                    let scrollTop = e.target.scrollTop
                    let pdfRefHeight = this.$refs.pdfRef.clientHeight
                    let pdfRefDomHeight = this.$refs.pdfRefDom.clientHeight
                    let topHeight = scrollTop + pdfRefDomHeight - pdfRefHeight

                    if (scrollTop + pdfRefDomHeight == pdfRefHeight && this.showNum < this.pdfinfo["numPages"]) {
                        // console.log(scrollTop, pdfRefDomHeight,pdfRefHeight)
                        this.loading = true
                        let num = this.pdfinfo["numPages"] - this.showNum
                        if (num < 10) {
                            this.showNum += num
                        } else {
                            this.showNum += 10
                        }
                    }



                })
            }

        }

    },

    mounted() {

        this.options = [
            {
                value: 25,
                label: '25%'
            },
            {
                value: 50,
                label: '50%'
            },
            {
                value: 75,
                label: '75%'
            },
            {
                value: 100,
                label: '100%'
            },
            {
                value: 125,
                label: '125%'
            },
            {
                value: 150,
                label: '150%'
            },
            {
                value: 175,
                label: '175%'
            },
            {
                value: 200,
                label: '200%'
            },
            {
                value: 225,
                label: '225%'
            },
            {
                value: 250,
                label: '250%'
            },
            {
                value: 275,
                label: '275%'
            },
            {
                value: 300,
                label: '300%'
            },
            {
                value: 325,
                label: '325%'
            },
            {
                value: 350,
                label: '350%'
            },
            {
                value: 375,
                label: '375%'
            },
            {
                value: 400,
                label: '400%'
            },
        ]
        document.addEventListener('keydown', this.keydown)
        document.addEventListener('keyup', this.keyup)
        window.addEventListener('scroll', this.scrollFun, true)
        // window.addEventListener('mousewheel', (e) => this.handleScroll(e));

        this.handelPdf()
    },
    beforeDestory() {
        window.removeEventListener('keydown', this.keydown)
        window.removeEventListener('keyup', this.keyup)
        window.removeEventListener('scroll', this.scrollFun)

    }
}
</script>
<style lang="scss" scoped>
.pdf-class {
    min-height: 650px;
    overflow: hidden;
    position: relative;

    .pdf-class1 {
        position: absolute;
        top: 0px;
        left: 0px;

        width: 100%;
        height: 100%;
        overflow: auto;
        // display:flex;
        justify-content: center;

        .pdf-class2 {
            // width: 100%;
            // height: 100%;
        }

    }

    .pdf-zoom {
        position: absolute;
        bottom: 20px;
        right: 20px;
        padding: 10px;
        border-radius: 4px;

        // width: 50px;
        // height: 50px;
        // background: #eee;
        .pdf-select {
            width: 100px;

            ::v-deep .el-input__inner {
                height: 30px;
            }

            ::v-deep .el-input__icon {
                line-height: 30px;
            }

        }
    }

    .zoom-btn {
        margin: 0 10px;
        padding: 0;
        width: 30px;
        height: 30px
    }

    .zoom-show {
        display: inline-block;
    }
}
</style>
