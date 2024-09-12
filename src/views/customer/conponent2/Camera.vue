<!--
 * @Author       : conghui li conghui.li@shengyc.com
 * @Date         : 2022-10-11 09:09:51
 * @LastEditors  : conghui li
 * @LastEditTime : 2022-11-21 14:09:53
-->
<template>
    <div style="position: relative; z-index: 10">
        <div
            v-for="(item, index) in dataValue"
            :key="index"
        >
            <div v-if="show">
                <div
                    class="plugin imgVue"
                    name="camera"
                    @contextmenu.prevent
                    :class="item.class"
                    :style="
                        'width:' +
                            item.width +
                            'px; height:' +
                            item.height +
                            'px; opacity:' +
                            item.opacity +
                            '; position:absolute; left:' +
                            item.left +
                            'px; top:' +
                            item.top +
                            'px; transform:rotate(' +
                            item.rotate +
                            'deg);zIndex:' +
                            item.ZIndex
                    "
                >
                    <iframe
                        :src="realTimeVideoSrc"
                        scrolling="no"
                        frameborder="0"
                        :width="item.width"
                        :height="item.height"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true,
            textblockData: [],
            dataValue: [],
            ZIndex: '',
            realTimeVideoSrc: ''
        };
    },
    props: ['dae', 'name', 'dataId'],
    watch: {
        dae: {
            deep: true,
            handler(val) {
                this.data = val;
                if (val) {
                    this.init();
                }
            }
        }
    },
    created() {
        this.data = this.dae;
        this.Name = 'Camera';
        if (this.data) {
            this.init();
        }
    },
    methods: {
        init() {
            this.dataValue = [];
            //数据筛选
            var dataAll = this.data.Controls.ControlList;
            this.textblockData = [];
            for (var i = 0; i < dataAll.length; i++) {
                if (dataAll[i].ControlType == this.Name) {
                    this.textblockData.push(dataAll[i]);
                }
            }
            if (this.textblockData.length > 0) {
                this.show = true;
            } else {
                this.show = false;
            }

            //赋值
            if (this.show) {
                this.getValue();
            }
        },
        //赋值
        getValue() {
            this.$nextTick(function() {
                this.dataValue = [];
                for (let item of this.textblockData) {
                    //加层级zIndex
                    var zIndexData = this.data.Data.zIndexData;
                    if (zIndexData) {
                        for (let i in zIndexData) {
                            if (item.Name == i) {
                                this.ZIndex = zIndexData[i];
                                break;
                            }
                        }
                    } else {
                        this.ZIndex = '';
                    }

                    if (item.ControlType === 'Camera') {
                        let {
                            Width,
                            Height,
                            IP,
                            Port,
                            Pwd,
                            UserName,
                            ChannelID
                        } = item.PropertyList;
                        const queryString = `width=${Width}&height=${Height}&ip=${IP}&port=${Port}&pwd=${encodeURIComponent(
                            Pwd
                        )}&userName=${UserName}&channelID=${ChannelID}`;
                        if (process.env.NODE_ENV === 'production') {
                            this.realTimeVideoSrc = `${location.origin}/webs/real-time-video.html?${queryString}`;
                        } else {
                            this.realTimeVideoSrc = `http://127.0.0.1:5050/real-time-video.html?${queryString}`;
                        }
                    }

                    this.dataValue.push({
                        width: item.PropertyList.Width,
                        height: item.PropertyList.Height,
                        rotate: item.PropertyList.RotateAngle,
                        top: item.PropertyList.Top,
                        left: item.PropertyList.Left,
                        opacity: item.PropertyList.Opacity / 100,
                        W:
                            Number(item.PropertyList.Width) <
                            Number(item.PropertyList.Height)
                                ? '100%'
                                : '',
                        H:
                            Number(item.PropertyList.Height) <
                            Number(item.PropertyList.Width)
                                ? '100%'
                                : '',
                        class: item.Name,
                        ZIndex: this.ZIndex
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.imgVue {
    display: inline-block;
    position: relative;
}
</style>
