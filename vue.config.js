/*
 * @Description  : 打包配置
 * @Date         : 2019-11-12 17:31:23
 * @Author       : Tao
 * @LastEditors  : conghui li
 * @LastEditTime : 2022-10-24 09:42:22
 */
// http://192.168.1.142:8802/api/Base/PostRediusTest?varNameString=S7_TCP
const webpack = require('webpack');
module.exports = {
    publicPath: './',
    productionSourceMap: false, //生产环境是否生产syourceMap文件,设置为false可减小打包后的体积
    devServer: {
        // 项目运行自动打开浏览器
        open: true,
        proxy: {
            '/api': {
                //这里最好有一个 /
                target: 'http://192.168.4.63:8802/', // 后台接口域名
                ws: true, //如果要代理 websockets，配置这个参数
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': '/api'
                }
            }
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
            .test(/\.(flv|avi|pdf)$/)
            .use('file-loader')
            .loader('file-loader')
            .end();
    },
    configureWebpack: {
        // devtool: 'source-map',
        externals: [
            {
                './cptable': 'var cptable'
            }
        ],
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            })
        ]
    }
};
