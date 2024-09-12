/*
 * @Description: 这是***页面（组件）
 * @Date: 2019-11-12 17:31:23
 * @Author: Tao
 * @LastEditors: Tao
 * @LastEditTime: 2021-03-17 15:09:27
 */
/**
 * @description: vue-cli配置文件
 * @since: 2019-11-07 20:55:55
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-11-07 21:18:34
 */
// http://192.168.1.142:8802/api/Base/PostRediusTest?varNameString=S7_TCP
const webpack = require('webpack')
module.exports = {
    publicPath: './',
    productionSourceMap: false, //生产环境是否生产syourceMap文件,设置为false可减小打包后的体积
    devServer: {
        // 项目运行自动打开浏览器
        open: true,
        proxy: {
            '/api': {
                //这里最好有一个 /
                // 'http://192.168.1.123:8807'
                // 192.168.2.134:8802
                 target: 'http://192.168.2.37:8802/', // 后台接口域名
                  ws: true, //如果要代理 websockets，配置这个参数
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': '/api',
                }
            },
            '/(ISAPI|SDK|webSocketVideoCtrlProxy)': {
                target: 'http://127.0.0.1:5050', // 摄像头nginx接口地址
                ws: true, //如果要代理 websocket
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/ISAPI': '/ISAPI',
                    '^/SDK': '/SDK',
                    '^/webSocketVideoCtrlProxy': '/webSocketVideoCtrlProxy'
                }
            },
        }
    },
    css: {
        // 向 CSS 相关的 loader 传递选项。
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/sass/base_core.scss";`
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('flv')
            .test(/\.(flv|avi)$/)
            .use('file-loader')
            .loader('file-loader')
            .end()
    },
    configureWebpack: {
        devtool: 'source-map',
        externals: [
            {
                './cptable': 'var cptable'
            }
        ],
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    transpileDependencies: []
};